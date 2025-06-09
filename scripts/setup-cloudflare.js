import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const BINDINGS = {
  kv: [
    'BLGC_ADMIN_KV',
    'BLGC_BLOGPOST_AI_CACHE',
    'BLGC_SITE_CONTENT_CACHE',
    'BLGC_USER_INTERACTIONS_KV',
  ],
  r2: ['BLGC_AI_LOGS_BUCKET'],
  d1: ['BLGC_RAG_DB'],
  vectorize: ['BLGC_RAG_VECTORS'],
};

/**
 * Runs a wrangler command.
 * @param {string} command The command to run.
 * @param {object} options
 * @param {boolean} [options.ignoreExistError=false] - If true, ignores "already exists" errors.
 * @param {boolean} [options.parseJson=true] - If true, parses the output as JSON.
 * @returns {any} Parsed JSON object or raw string output.
 */
function runCommand(command, { ignoreExistError = false, parseJson = true } = {}) {
  try {
    console.log(`\n> Executing: ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    if (parseJson) {
      const parsedOutput = JSON.parse(output);
      console.log(`✅ Success!`);
      return parsedOutput;
    }
    console.log(output); // Log raw output for non-json commands
    return output;
  } catch (error) {
    // Combine stdout and stderr from the error object to ensure we catch the message
    const output = (error.stdout || '') + (error.stderr || '');
    if (ignoreExistError && (output.includes('already exists') || output.includes('already has a binding') || output.includes('duplicate_name'))) {
      console.log(`   -> Resource already exists. Skipping creation.`);
      return null;
    }
    
    console.error(`\n❌ Error executing command: ${command}`);
    try {
        // Try to parse JSON from stderr for structured wrangler errors
        const errorJson = JSON.parse(error.stderr);
        console.error(`   Error Code: ${errorJson.code}`);
        console.error(`   Error Message: ${errorJson.message || (errorJson.errors && errorJson.errors[0]?.message)}`);
    } catch (e) {
        // Fallback to printing the raw output if it's not JSON
        console.error(output);
    }
    process.exit(1);
  }
}

function main() {
  console.log('🚀 Starting Cloudflare resource setup...');
  console.log('This script will create the necessary KV, R2, D1, and Vectorize resources for BlogCierge.');
  console.log('Please ensure you are logged into wrangler (`npx wrangler login`).');

  const wranglerTomlPath = path.join(process.cwd(), 'wrangler.toml');
  let wranglerTomlContent = fs.readFileSync(wranglerTomlPath, 'utf8');

  // Create KV Namespaces
  console.log('\n--- Creating KV Namespaces ---');
  for (const name of BINDINGS.kv) {
    // Step 1: Create the namespace. This command does not support --json.
    runCommand(`npx wrangler kv namespace create ${name}`, { ignoreExistError: true, parseJson: false });
    
    // Step 2: List all namespaces to find the ID of the one we just created/ensured exists.
    // This command outputs JSON by default to stdout when not a TTY.
    const namespacesList = runCommand(`npx wrangler kv namespace list`, { parseJson: true });
    const namespace = namespacesList.find(ns => ns.title === name);
    
    if (namespace && namespace.id) {
      const placeholder = `placeholder_id_for_${name.toLowerCase()}`;
      if (wranglerTomlContent.includes(placeholder)) {
        wranglerTomlContent = wranglerTomlContent.replace(placeholder, namespace.id);
        console.log(`   -> Updated binding for ${name} in wrangler.toml`);
      }
    } else {
      const placeholder = `placeholder_id_for_${name.toLowerCase()}`;
      if (wranglerTomlContent.includes(placeholder)) {
        console.error(`\n❌ FATAL: Could not find ID for KV namespace ${name}. Please check your Cloudflare account.`);
        process.exit(1);
      } else {
        console.log(`   -> Binding for ${name} already seems to be set. Skipping update.`);
      }
    }
  }

  // Create R2 Bucket
  console.log('\n--- Creating R2 Bucket ---');
  for (const name of BINDINGS.r2) {
    const validBucketName = name.toLowerCase().replace(/_/g, '-');
    runCommand(`npx wrangler r2 bucket create ${validBucketName}`, { ignoreExistError: true, parseJson: false });
    const placeholder = `placeholder-for-${validBucketName}`;
    if (wranglerTomlContent.includes(placeholder)) {
        wranglerTomlContent = wranglerTomlContent.replace(placeholder, validBucketName);
        console.log(`   -> Updated binding for ${name} in wrangler.toml`);
    }
  }

  // Create D1 Database for RAG
  console.log('\n--- Creating D1 Database for RAG ---');
  for (const name of BINDINGS.d1) {
    const dbName = name.toLowerCase().replace(/_/g, '-');
    // Step 1: Create the database. This command does not support --json.
    runCommand(`npx wrangler d1 create ${dbName}`, { ignoreExistError: true, parseJson: false });

    // Step 2: List all databases to find the UUID of the one we just created/ensured exists.
    const d1List = runCommand(`npx wrangler d1 list --json`, { parseJson: true });
    const database = d1List.find(db => db.name === dbName);

    if (database && database.uuid) {
        const placeholder = `placeholder_id_for_${name.toLowerCase()}`;
        if (wranglerTomlContent.includes(placeholder)) {
            wranglerTomlContent = wranglerTomlContent.replace(placeholder, database.uuid);
            console.log(`   -> Updated binding for ${name} in wrangler.toml`);
        }
        // ALWAYS ensure the table exists in the remote DB. The command is idempotent.
        console.log(`   -> Ensuring table 'content_chunks' exists in remote database ${dbName}...`);
        runCommand(`npx wrangler d1 execute ${dbName} --remote --command "CREATE TABLE IF NOT EXISTS content_chunks (id INTEGER PRIMARY KEY, slug TEXT NOT NULL, text TEXT NOT NULL);"`, { parseJson: false });
    } else {
        // This block is now only for the case where the database truly doesn't exist after trying to create it.
        // This should be a rare failure case.
        console.error(`\n❌ FATAL: Could not find D1 database ${dbName} after attempting creation. Please check your Cloudflare account.`);
        process.exit(1);
    }
  }

  // Create Vectorize Index for RAG
  console.log('\n--- Creating Vectorize Index for RAG ---');
  for (const name of BINDINGS.vectorize) {
    const indexName = name.toLowerCase().replace(/_/g, '-');
    // This command does not support --json, but it prints the binding info we need.
    // We don't need to parse it, just ensure it runs.
    runCommand(`npx wrangler vectorize create ${indexName} --dimensions=768 --metric=cosine`, { ignoreExistError: true, parseJson: false });
    console.log(`   -> Binding for Vectorize index '${indexName}' in wrangler.toml is correct.`);
  }

  // Write back the updated wrangler.toml
  fs.writeFileSync(wranglerTomlPath, wranglerTomlContent);
  console.log(`\n✅ Successfully updated ${wranglerTomlPath}.`);

  // Create .dev.vars file if it doesn't exist, for API keys
  const devVarsPath = path.join(process.cwd(), '.dev.vars');
  if (!fs.existsSync(devVarsPath)) {
    console.log(`\n--- Creating ${path.basename(devVarsPath)} for API keys ---`);
    const devVarsContent = [
      '# This file contains secrets for local development.',
      '# It is used by `wrangler` automatically during `yarn preview`.',
      '# This file should NOT be committed to version control.',
      '#',
      '# Add your secret API keys below.',
      'LLAMA_API_KEY=""',
      '#',
      '# GitHub OAuth App credentials',
      'GITHUB_CLIENT_ID=""',
      'GITHUB_CLIENT_SECRET=""',
      '#',
      '# GitHub Repository details',
      'GITHUB_REPO_OWNER="your-github-username"',
      'GITHUB_REPO_NAME="your-repo-name"',
    ].join('\n');
    fs.writeFileSync(devVarsPath, devVarsContent);
    console.log(`✅ Successfully created ${devVarsPath}. Please add your API keys.`);
  } else {
    console.log(`\n--- .dev.vars file already exists ---`);
    console.log('Skipping creation. Please ensure your API keys are present in this file.');
  }

  // Print instructions for local dev and production
  console.log('\n\n✅✅✅ Setup Complete! ✅✅✅');

  console.log('\n--- Next Steps ---');
  console.log('`wrangler.toml` has been updated with your new resource IDs.');
  console.log('IMPORTANT: You must now commit the updated `wrangler.toml` file to your repository.');
  console.log('  git add wrangler.toml');
  console.log('  git commit -m "feat: configure Cloudflare resources"');
  console.log('\nAfter committing, push your changes to trigger a new deployment with the correct bindings.');

  console.log('\n--- Production Deployment ---');
  console.log('For your deployed application to work, you must also add your API keys as secrets in your Cloudflare Pages project dashboard.');
  console.log('Go to your Pages Project > Settings > Environment variables > Production > Add secret.');
}

main();
