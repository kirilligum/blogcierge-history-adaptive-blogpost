import fs from 'fs';
import path from 'path';

const filesToDelete = [
  'src/pages/about.js',
  'src/pages/blog.js',
  'src/pages/index.js',
  'src/pages/rss.xml.js',
  'src/pages/_image.js',
  'src/pages/blog/admin.js',
  'src/pages/blog/admin/analytics.js',
  'src/pages/blog/admin/list.js',
  'src/pages/blog/admin/login.js',
  'src/pages/blog/admin/setup.js',
  'src/pages/blog/[...slug].js',
  'src/pages/api/admin/commit-qa-data.js',
  'src/pages/api/admin/forget-qa-job.js',
  'src/pages/api/admin/generate-qa-dataset.js',
  'src/pages/api/admin/login.js',
  'src/pages/api/admin/logout.js',
  'src/pages/api/admin/qa-dataset-status.js',
  'src/pages/api/admin/setup.js',
  'src/pages/api/analytics-query.js',
  'src/pages/api/ask.js',
  'src/pages/api/auth/github/callback.js',
  'src/pages/api/auth/github/login.js',
  'src/pages/api/auth/github/status.js',
  'src/pages/api/feedback.js',
  'src/pages/api/get-read-status.js',
  'src/pages/api/list-device-messages.js',
  'src/pages/api/track-interaction.js'
];

function main() {
  console.log('Cleaning up bad wrapper files...');
  let deletedCount = 0;
  let notFoundCount = 0;

  for (const file of filesToDelete) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`  Deleted: ${file}`);
        deletedCount++;
      } catch (err) {
        console.error(`  Error deleting ${file}:`, err);
      }
    } else {
      // This is expected if the script has been run before or the file was already removed.
      // console.log(`  Skipped (not found): ${file}`);
      notFoundCount++;
    }
  }
  console.log(`\nCleanup complete. Deleted ${deletedCount} files. ${notFoundCount} files were not found (which is normal).`);
}

main();
