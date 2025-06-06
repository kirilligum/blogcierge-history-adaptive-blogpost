import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function main() {
  const command = 'wrangler pages dev ./dist';

  console.log(`> Building project...`);
  const buildProcess = exec('astro build', { cwd: projectRoot });

  buildProcess.stdout.pipe(process.stdout);
  buildProcess.stderr.pipe(process.stderr);

  buildProcess.on('exit', (code) => {
    if (code === 0) {
      console.log(`> Build complete. Starting dev server...`);
      console.log(`> Executing: ${command}`);
      console.log('> Wrangler will automatically use `wrangler.toml` for bindings and `.dev.vars` for secrets.');
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
