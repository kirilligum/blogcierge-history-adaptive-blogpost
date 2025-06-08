import { default as page } from './[...slug].astro';
export const onRequest = page.onRequest;
export default page;
