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
					'https://cdn.jsdelivr.net',
					'https://va.vercel-scripts.com'
				],
				'style-src': [
					'self',
					'unsafe-inline',
					'https://cdn.jsdelivr.net',
					'https://fonts.googleapis.com'
				],
				'img-src': ['self', 'data:', 'https:'],
				'font-src': ['self', 'data:', 'https://fonts.gstatic.com', 'https://cdn.jsdelivr.net'],
				'connect-src': ['self', 'https://vitals.vercel-insights.com'],
				'frame-src': ['https://www.youtube.com', 'https://www.figma.com']
			}
		}
	}
};

export default config;
