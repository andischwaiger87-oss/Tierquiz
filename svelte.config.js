import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocessors erlauben uns die Nutzung von TypeScript und Tailwind
	preprocess: vitePreprocess(),

	kit: {
		// Hier binden wir den Cloudflare-Adapter ein
		adapter: adapter()
	}
};

export default config;