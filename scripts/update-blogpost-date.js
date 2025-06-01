import { promises as fs } from 'fs';
import path from 'path';

/**
 * Updates the 'date' field in a Markdown file's frontmatter to the current UTC date and time.
 * The date format will be YYYY-MM-DDTHH:mm:ssZ.
 *
 * @param {string} filePath The path to the Markdown file.
 */
async function updateBlogpostDate(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');

        // Split the content by the frontmatter delimiters '---'
        const parts = content.split('---');

        // A valid Markdown file with frontmatter should have at least 3 parts:
        // parts[0] (empty or comments before first ---)
        // parts[1] (the frontmatter content)
        // parts[2] (the main Markdown content)
        if (parts.length < 3) {
            console.error('Error: Invalid Markdown file format. Frontmatter delimiters (---) not found or incomplete.');
            return;
        }

        const frontmatterBlock = parts[1]; // The content between the first two '---'
        const markdownContent = parts.slice(2).join('---'); // The rest of the markdown content

        // Get the current UTC date and time and format it as YYYY-MM-DDTHH:mm:ssZ
        // toISOString() returns YYYY-MM-DDTHH:mm:ss.sssZ, so we truncate milliseconds.
        const now = new Date();
        const formattedDate = now.toISOString().split('.')[0] + 'Z';

        // Regular expression to find the 'date' field in the frontmatter.
        // It looks for 'date:' followed by optional spaces, then a quoted string.
        // The 'm' flag ensures it works across multiple lines.
        const dateRegex = /^date:\s*".*?"$/m;
        let updatedFrontmatterBlock;

        if (dateRegex.test(frontmatterBlock)) {
            // Replace the existing date line with the new formatted date
            updatedFrontmatterBlock = frontmatterBlock.replace(dateRegex, `date: "${formattedDate}"`);
        } else {
            console.error(`Error: 'date' field not found in the frontmatter of ${filePath}. Please ensure it exists.`);
            return;
        }

        // Reconstruct the file content with the updated frontmatter
        // We preserve the initial part (parts[0]) in case there are leading newlines or comments.
        const newContent = `${parts[0]}---\n${updatedFrontmatterBlock}---\n${markdownContent}`;

        await fs.writeFile(filePath, newContent, 'utf8');
        console.log(`Successfully updated date in ${filePath} to ${formattedDate}`);

    } catch (error) {
        console.error(`Failed to update blogpost date for ${filePath}:`, error);
    }
}

// Get the file path from the command line arguments
const filePath = process.argv[2];

if (!filePath) {
    console.error('Usage: node scripts/update-blogpost-date.js <path/to/blogpost.md>');
    process.exit(1);
}

// Call the function to update the date
updateBlogpostDate(filePath);
