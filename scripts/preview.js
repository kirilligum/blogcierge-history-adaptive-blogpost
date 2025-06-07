import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// A helper function to run a command and stream its output.
// Returns a promise that resolves when the process exits successfully.
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit', // This pipes the child's stdio to the parent, including stdin for Ctrl+C
      shell: true, // Helps find commands in PATH and handles .cmd on Windows
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  try {
    console.log(`> Building project...`);
    await runCommand('astro', ['build']);

    console.log(`> Build complete. Starting dev server...`);
    const command = 'wrangler';
    const args = ['pages', 'dev', './dist'];
    console.log(`> Executing: ${command} ${args.join(' ')}`);
    console.log('> Wrangler will automatically use `wrangler.toml` for bindings and `.dev.vars` for secrets.');
    await runCommand(command, args);
  } catch (error) {
    console.error(`\n> Script failed: ${error.message}`);
    process.exit(1);
  }
}

main();
