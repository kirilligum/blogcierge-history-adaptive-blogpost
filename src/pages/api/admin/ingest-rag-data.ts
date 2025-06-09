import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import type { D1Database, VectorizeIndex } from "@cloudflare/workers-types";

const BATCH_SIZE = 100; // For inserting into D1 and Vectorize
const DELETE_BATCH_SIZE = 1000; // For deleting from Vectorize
const EMBEDDING_MODEL = '@cf/baai/bge-base-en-v1.5';

async function ingest(locals: App.Locals) {
    const db = locals.runtime.env.BLGC_RAG_DB;
    const vectorIndex = locals.runtime.env.BLGC_RAG_VECTORS;
    const ai = locals.runtime.env.AI;

    // Safeguard: This function runs in the background. If Vectorize is somehow
    // unavailable, we log it and stop to prevent a crash.
    if (!vectorIndex) {
        console.error("[RAG INGESTION ERROR] Vectorize is not available in the current environment. Ingestion cannot proceed.");
        return;
    }

    console.log("Starting RAG ingestion process...");

    // 1. Clear existing data
    console.log("Clearing existing data from D1 and Vectorize...");

    // Step 1a: Get all existing vector IDs from D1
    const { results: existingChunks } = await db.prepare("SELECT id FROM content_chunks").all<{ id: number }>();
    if (existingChunks && existingChunks.length > 0) {
        const idsToDelete = existingChunks.map(chunk => chunk.id.toString());
        console.log(`Found ${idsToDelete.length} existing vectors to delete from Vectorize.`);
        
        // Step 1b: Delete from Vectorize in batches
        for (let i = 0; i < idsToDelete.length; i += DELETE_BATCH_SIZE) {
            const batchIds = idsToDelete.slice(i, i + DELETE_BATCH_SIZE);
            await vectorIndex.deleteByIds(batchIds);
            console.log(`Deleted batch of ${batchIds.length} vectors.`);
        }
    }

    // Step 1c: Delete all records from D1 table
    await db.prepare("DELETE FROM content_chunks").run();
    
    console.log("Existing data cleared.");

    // 2. Get all blog posts
    const allPosts = await getCollection("blog");
    console.log(`Found ${allPosts.length} posts to process.`);

    // 3. Process each post
    for (const entry of allPosts) {
        console.log(`Processing post: ${entry.slug}`);
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const chunks = await splitter.splitText(entry.body);
        console.log(`Split post ${entry.slug} into ${chunks.length} chunks.`);

        // 4. Insert chunks into D1 and get their IDs
        let allChunksForPost: { id: number; text: string }[] = [];
        for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
            const batchChunks = chunks.slice(i, i + BATCH_SIZE);
            let stmt = db.prepare("INSERT INTO content_chunks (slug, text) VALUES (?, ?) RETURNING id, text");
            const batchStmts = batchChunks.map(chunk => stmt.bind(entry.slug, chunk));
            const results = await db.batch<{ id: number; text: string }>(batchStmts);
            
            const successfulResults = results.flatMap(r => r.results || []);
            allChunksForPost.push(...successfulResults);
        }
        console.log(`Inserted ${allChunksForPost.length} chunks into D1 for post ${entry.slug}.`);

        // 5. Generate embeddings and insert into Vectorize
        for (let i = 0; i < allChunksForPost.length; i += BATCH_SIZE) {
            const batchOfChunks = allChunksForPost.slice(i, i + BATCH_SIZE);
            const textsToEmbed = batchOfChunks.map(chunk => chunk.text);
            
            const embeddingsResponse = await ai.run(EMBEDDING_MODEL, { text: textsToEmbed });
            const vectors = embeddingsResponse.data;

            if (!vectors || vectors.length !== batchOfChunks.length) {
                console.error(`Embedding generation failed for a batch in post ${entry.slug}.`);
                continue;
            }

            const vectorsToInsert = batchOfChunks.map((chunk, index) => ({
                id: chunk.id.toString(),
                values: vectors[index],
            }));

            await vectorIndex.upsert(vectorsToInsert);
            console.log(`Inserted ${vectorsToInsert.length} vectors into Vectorize for post ${entry.slug}.`);
        }
    }
    console.log("RAG ingestion process completed successfully.");
}

export const POST: APIRoute = async ({ locals }) => {
    const vectorIndex = locals.runtime.env.BLGC_RAG_VECTORS;
    if (!vectorIndex) {
        const errorMessage = "RAG ingestion is not supported in the local development environment because Vectorize is not available. Please use a deployed environment (e.g., a preview deployment) to build the RAG index.";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 501 }); // 501 Not Implemented
    }

    try {
        // Run ingestion in the background
        locals.runtime.ctx.waitUntil(ingest(locals));
        return new Response(JSON.stringify({ message: "RAG data ingestion process started in the background." }), { status: 202 });
    } catch (e) {
        console.error("Failed to start RAG ingestion:", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return new Response(JSON.stringify({ error: `Failed to start ingestion: ${errorMessage}` }), { status: 500 });
    }
};
