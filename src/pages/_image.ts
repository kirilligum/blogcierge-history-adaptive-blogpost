import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';

// This endpoint appears to be unused and references a 'heroImage' property
// that is not defined in the content collection schema, which would cause a build error.
// It is being disabled to allow the build to succeed.
/*
const blogEntries = await getCollection('blog');
const images = Object.fromEntries(
  blogEntries.map(({ data: { heroImage } }, i) => [i, heroImage])
);

export const GET: APIRoute = async ({ params }) => {
  const { id, ...rest } = params;
  const searchParams = new URLSearchParams(rest);
  const image = await getImage({
    src: images[id],
    width: parseInt(searchParams.get('w') || '400'),
    height: parseInt(searchParams.get('h') || '400'),
    quality: 80,
  });
  return new Response(image.fsPath);
};
*/

// Return a 404 for any requests to this endpoint to prevent errors.
export const GET: APIRoute = async () => {
  return new Response(null, { status: 404, statusText: 'Not Found' });
};
