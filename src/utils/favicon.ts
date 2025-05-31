import sharp from 'sharp';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const sizes = {
  favicon32: 32,
  favicon192: 192,
  favicon512: 512,
  appleTouch: 180
};

export async function generateFavicons(sourceFile: string, publicDir: string) {
  const source = sharp(sourceFile);
  
  // Generate PNGs
  await Promise.all([
    source.clone().resize(sizes.favicon32).png().toFile(join(publicDir, 'favicon-32.png')),
    source.clone().resize(sizes.favicon192).png().toFile(join(publicDir, 'favicon-192.png')),
    source.clone().resize(sizes.favicon512).png().toFile(join(publicDir, 'favicon.png')),
    source.clone().resize(sizes.appleTouch).png().toFile(join(publicDir, 'favicon-180.png'))
  ]);
}
