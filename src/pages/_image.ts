import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';

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
