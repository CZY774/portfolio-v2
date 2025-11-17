import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': [
					'self',
					'unsafe-inline',
					'https://cdnjs.cloudflare.com',
					'https://cdn.jsdelivr.net'
				],
				'style-src': ['self', 'unsafe-inline', 'https://cdn.jsdelivr.net'],
				'img-src': ['self', 'data:', 'https:'],
				'font-src': ['self', 'data:', 'https://fonts.gstatic.com'],
				'connect-src': ['self'],
				'frame-src': ['https://www.youtube.com', 'https://www.figma.com']
			}
		}
	}
};

export default config;
