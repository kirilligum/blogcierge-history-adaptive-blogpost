import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://blogcierge.com', // Updated to your production domain
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [tailwind(), sitemap()],
  // Add Squoosh for Cloudflare-compatible image processing
  image: {
    service: {
      entrypoint: 'astro/assets/services/squoosh'
    }
  },
  vite: {
    ssr: {
      external: ['@opentelemetry/context-cloudflare-workers'],
    },
  },
});
