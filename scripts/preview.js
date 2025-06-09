import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const isWindows = process.platform === 'win32';

/**
 * Runs a command and streams its output.
 * @param {string} command The command to run.
 * @param {string[]} args The arguments for the command.
 * @param {boolean} isDevServer If true, non-zero exit codes (like from Ctrl+C) are not treated as errors.
 * @returns {Promise<void>} A promise that resolves when the process exits.
 */
function runCommand(command, args, isDevServer = false) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: isWindows,
    });

    // Gracefully shut down the child process on script termination
    const onSignal = (signal) => {
      child.kill(signal);
    };

    process.on('SIGINT', onSignal);
    process.on('SIGTERM', onSignal);

    child.on('close', (code) => {
      // Clean up listeners once the child process is closed
      process.removeListener('SIGINT', onSignal);
      process.removeListener('SIGTERM', onSignal);

      if (code === 0) {
        resolve();
      } else if (isDevServer) {
        // For a dev server, a non-zero exit code (e.g., from Ctrl+C) is not a failure.
        console.log('\n> Dev server stopped.');
        resolve();
      } else {
        // For build steps, a non-zero code is a failure.
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

    console.log(`> Initializing local D1 database for RAG...`);
    const d1SetupCommand = 'wrangler';
    const d1SetupArgs = ['d1', 'execute', 'blgc-rag-db', '--local', '--command', 'CREATE TABLE IF NOT EXISTS content_chunks (id INTEGER PRIMARY KEY, slug TEXT NOT NULL, text TEXT NOT NULL);'];
    await runCommand(d1SetupCommand, d1SetupArgs);

    console.log(`> Build complete. Starting dev server...`);
    const command = 'wrangler';
    const args = ['pages', 'dev', './dist', '--port=8789'];
    console.log(`> Executing: ${command} ${args.join(' ')}`);
    console.log('> Wrangler will automatically use `wrangler.toml` for bindings and `.dev.vars` for secrets.');
    await runCommand(command, args, true); // Pass true for isDevServer
  } catch (error) {
    console.error(`\n> Script failed: ${error.message}`);
    process.exit(1);
  }
}

main();
