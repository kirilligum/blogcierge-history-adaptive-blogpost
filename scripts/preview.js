import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function parseDevVars() {
  try {
    const devVarsPath = join(projectRoot, '.dev.vars');
    const content = readFileSync(devVarsPath, 'utf8');
    const lines = content.split('\n');
    const vars = {};
    for (const line of lines) {
      if (line.trim() === '' || line.startsWith('#')) {
        continue;
      }
      const eqIndex = line.indexOf('=');
      if (eqIndex === -1) continue;

      const key = line.substring(0, eqIndex).trim();
      let value = line.substring(eqIndex + 1).trim();
      
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      if (key && value) {
        vars[key] = value;
      }
    }
    return vars;
  } catch (error) {
    console.error('Error: .dev.vars file not found or could not be read.');
    console.error('Please run `yarn setup:cloudflare` to generate it, and ensure it contains your resource IDs.');
    process.exit(1);
  }
}

function main() {
  const vars = parseDevVars();

  // Check if necessary IDs are present
  const requiredKeys = ['BLGC_ADMIN_KV_ID', 'BLGC_BLOGPOST_AI_CACHE_ID', 'BLGC_SITE_CONTENT_CACHE_ID', 'BLGC_USER_INTERACTIONS_KV_ID', 'BLGC_AI_LOGS_BUCKET_NAME'];
  for (const key of requiredKeys) {
    if (!vars[key]) {
      console.error(`Error: Missing required key "${key}" in .dev.vars file.`);
      process.exit(1);
    }
  }

  const kvBindings = [
    `--kv=BLGC_ADMIN_KV=${vars.BLGC_ADMIN_KV_ID}`,
    `--kv=BLGC_BLOGPOST_AI_CACHE=${vars.BLGC_BLOGPOST_AI_CACHE_ID}`,
    `--kv=BLGC_SITE_CONTENT_CACHE=${vars.BLGC_SITE_CONTENT_CACHE_ID}`,
    `--kv=BLGC_USER_INTERACTIONS_KV=${vars.BLGC_USER_INTERACTIONS_KV_ID}`,
  ];

  const r2Bindings = [
    `--r2=BLGC_AI_LOGS_BUCKET=${vars.BLGC_AI_LOGS_BUCKET_NAME}`,
  ];

  const command = [
    'wrangler',
    'pages',
    'dev',
    './dist', // Point to the build output directory
    ...kvBindings,
    ...r2Bindings,
  ].join(' ');

  console.log(`> Building project...`);
  const buildProcess = exec('astro build', { cwd: projectRoot });

  buildProcess.stdout.pipe(process.stdout);
  buildProcess.stderr.pipe(process.stderr);

  buildProcess.on('exit', (code) => {
    if (code === 0) {
      console.log(`> Build complete. Starting dev server...`);
      console.log(`> Executing: ${command}`);
      const previewProcess = exec(command, { cwd: projectRoot });
      previewProcess.stdout.pipe(process.stdout);
      previewProcess.stderr.pipe(process.stderr);
      previewProcess.on('exit', (previewCode) => {
        if (previewCode !== null) {
          process.exit(previewCode);
        }
      });
    } else {
      console.error(`> Build failed with code ${code}.`);
      process.exit(code);
    }
  });
}

main();
