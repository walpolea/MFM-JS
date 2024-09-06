import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  redirects: {
    // '/v1': '/v1/index.html',
    // '/v1/game': '/v1/game/index.html',
    // '/v1/game/maker': '/v1/game/maker.html'
  },
  integrations: [vue()]
});