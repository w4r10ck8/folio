import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://muggleborn.dev',
  integrations: [
    tailwind(),
    react(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
});
