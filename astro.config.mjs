// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'http://thanktoanf.online',
	output: 'server',
	adapter: vercel({}),
	integrations: [mdx(), sitemap()],
	// Using output: "server" to enable SSR for pages with prerender = false
	// Pages without prerender = false will still be statically generated during build
});
