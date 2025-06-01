import QRCode from 'qrcode';
import { dirname } from 'path';
import { mkdir } from 'fs/promises';

/**
 * Generates a QR code image for the given URL and saves it to the outputPath.
 * @param {string} url The URL to encode in the QR code.
 * @param {string} outputPath The file path to save the generated PNG image.
 */
async function generateQRCode(url, outputPath) {
  try {
    // Ensure the output directory exists
    const outputDir = dirname(outputPath);
    await mkdir(outputDir, { recursive: true });

    // Generate QR code and save to file
    await QRCode.toFile(outputPath, url, {
      type: 'png',
      errorCorrectionLevel: 'H', // High error correction for better scannability
      margin: 2, // Margin around the QR code (number of modules)
      scale: 8,  // Size of each module/pixel
      color: {
        dark: '#000000FF', // Black dots
        light: '#FFFFFFFF', // White background
      },
    });
    console.log(`QR code successfully generated for "${url}" and saved to ${outputPath}`);
  } catch (err) {
    console.error(`Error generating QR code: ${err.message}`);
    process.exit(1); // Exit with error status
  }
}

/**
 * Prints usage instructions for the script.
 */
function printUsage() {
  console.log('\nUsage: node scripts/generate-qr-code.js <URL> <outputFilePath.png>\n');
  console.log('Example:');
  console.log('  node scripts/generate-qr-code.js "https://www.example.com" "public/images/qr-code.png"\n');
}

/**
 * Main function to parse arguments and initiate QR code generation.
 */
async function main() {
  const args = process.argv.slice(2); // Get command line arguments, excluding node and script path

  if (args.length !== 2) {
    console.error('Error: Incorrect number of arguments. URL and output file path are required.');
    printUsage();
    process.exit(1);
  }

  const [url, outputPath] = args;

  if (!url || !outputPath) {
    // This case should be caught by args.length check, but as a safeguard
    console.error('Error: URL and output file path must be provided.');
    printUsage();
    process.exit(1);
  }

  // Basic URL validation
  try {
    new URL(url); // This will throw an error if the URL is invalid
  } catch (_) {
    console.error(`Error: Invalid URL provided: "${url}"`);
    printUsage();
    process.exit(1);
  }

  if (!outputPath.endsWith('.png')) {
    console.error('Error: Output file path must end with .png');
    printUsage();
    process.exit(1);
  }

  await generateQRCode(url, outputPath);
}

// Execute the main function
main();
