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

function runCommand(command) {
  try {
    console.log(`\n> Executing: ${command}`);
    // We add --json flag to get predictable output
    const output = execSync(`${command} --json`, { encoding: 'utf8' });
    const parsedOutput = JSON.parse(output);
    console.log(`✅ Success!`);
    return parsedOutput;
  } catch (error) {
    console.error(`\n❌ Error executing command: ${command}`);
    // Try to parse JSON from stderr for more specific wrangler errors
    try {
        const errorJson = JSON.parse(error.stderr);
        console.error(`   Error Code: ${errorJson.code}`);
        console.error(`   Error Message: ${errorJson.message}`);
    } catch (e) {
        console.error(error.stderr || error.stdout || error.message);
    }
    process.exit(1);
  }
}

function main() {
  console.log('🚀 Starting Cloudflare resource setup...');
  console.log('This script will create the necessary KV namespaces and R2 bucket for BlogCierge.');
  console.log('Please ensure you are logged into wrangler (`npx wrangler login`).');

  const wranglerTomlPath = path.join(process.cwd(), 'wrangler.toml');
  let wranglerTomlContent = fs.readFileSync(wranglerTomlPath, 'utf8');

  // Create KV Namespaces
  console.log('\n--- Creating KV Namespaces ---');
  for (const name of BINDINGS.kv) {
    const output = runCommand(`npx wrangler kv:namespace create ${name}`);
    const placeholder = `placeholder_id_for_${name.toLowerCase()}`;
    wranglerTomlContent = wranglerTomlContent.replace(placeholder, output.id);
    console.log(`   -> Updated binding for ${name} in wrangler.toml`);
  }

  // Create R2 Bucket
  console.log('\n--- Creating R2 Bucket ---');
  for (const name of BINDINGS.r2) {
    runCommand(`npx wrangler r2 bucket create ${name}`);
    const validBucketName = name.toLowerCase().replace(/_/g, '-');
    const placeholder = `placeholder-for-${validBucketName}`;
    wranglerTomlContent = wranglerTomlContent.replace(placeholder, validBucketName);
    console.log(`   -> Updated binding for ${name} in wrangler.toml`);
  }

  // Create D1 Database for RAG
  console.log('\n--- Creating D1 Database for RAG ---');
  for (const name of BINDINGS.d1) {
    const dbName = name.toLowerCase().replace(/_/g, '-');
    const output = runCommand(`npx wrangler d1 create ${dbName}`);
    const placeholder = `placeholder_id_for_${name.toLowerCase()}`;
    wranglerTomlContent = wranglerTomlContent.replace(placeholder, output.uuid);
    console.log(`   -> Updated binding for ${name} in wrangler.toml`);
    console.log(`   -> Creating table 'content_chunks' in ${dbName}...`);
    runCommand(`npx wrangler d1 execute ${dbName} --remote --command "CREATE TABLE IF NOT EXISTS content_chunks (id INTEGER PRIMARY KEY, slug TEXT NOT NULL, text TEXT NOT NULL);"`);
  }

  // Create Vectorize Index for RAG
  console.log('\n--- Creating Vectorize Index for RAG ---');
  for (const name of BINDINGS.vectorize) {
    const indexName = name.toLowerCase().replace(/_/g, '-');
    // The embedding model has 768 dimensions
    runCommand(`npx wrangler vectorize create ${indexName} --dimensions=768 --metric=cosine`);
    // No ID to replace in wrangler.toml for vectorize, name is sufficient
    console.log(`   -> Created Vectorize index ${indexName}. Binding in wrangler.toml is correct.`);
  }

  // Write back the updated wrangler.toml
  fs.writeFileSync(wranglerTomlPath, wranglerTomlContent);
  console.log(`\n✅ Successfully updated ${wranglerTomlPath} with new resource IDs.`);

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
      'OPENROUTER_API_KEY=""',
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
