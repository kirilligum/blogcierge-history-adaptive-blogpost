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
      'GITHUB_CLIENT_ID=""',
      'GITHUB_CLIENT_SECRET=""',
    ].join('\n');
    fs.writeFileSync(devVarsPath, devVarsContent);
    console.log(`✅ Successfully created ${devVarsPath}. Please add your API keys.`);
  } else {
    console.log(`\n--- .dev.vars file already exists ---`);
    console.log('Skipping creation. Please ensure your API keys are present in this file.');
  }

  // Print instructions for local dev and production
  console.log('\n\n✅✅✅ Setup Complete! ✅✅✅');

  console.log('\n--- Local Development ---');
  console.log('`wrangler.toml` has been updated with your new resource IDs.');
  console.log('IMPORTANT: Remember to add your API keys to the `.dev.vars` file for local testing.');
  console.log('You can now run `yarn preview` to start the local development server.');

  console.log('\n--- Production Deployment ---');
  console.log('For your deployed application to work, you must add your API keys as secrets in your Cloudflare Pages project dashboard.');
  console.log('Go to your Pages Project > Settings > Environment variables > Production > Add secret.');
  console.log('Bindings are now managed by `wrangler.toml` and will be deployed automatically.');
  console.log('\nAfter adding secrets, commit and push your changes to deploy!');
  console.log('NOTE: Do NOT commit the changes made to `wrangler.toml` by this script.');
}

main();
