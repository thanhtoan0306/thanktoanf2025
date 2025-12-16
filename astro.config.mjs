// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'http://thanktoanf.online',
	output: 'static',
	adapter: vercel({}),
	integrations: [mdx(), sitemap()],
	// In Astro 5, output: "hybrid" is removed. Use output: "static" (default) 
	// and set prerender = false on pages that need SSR (already done for i18n pages)
});
