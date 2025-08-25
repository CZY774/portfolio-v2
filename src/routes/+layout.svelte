<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/CZY logo-03.svg';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	// Inject Vercel Analytics and Speed Insights
	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	let { children } = $props();
	let darkMode = $state(false);

	onMount(() => {
		// Auto detect system theme
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		darkMode = mediaQuery.matches;

		mediaQuery.addEventListener('change', (e) => {
			darkMode = e.matches;
		});

		// Apply theme to document
		$effect(() => {
			if (darkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>

	<link
		rel="stylesheet"
		type="text/css"
		href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
	/>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
	<title>cornelius yoga - creative developer & designer</title>
	<meta
		name="description"
		content="creative developer & designer crafting digital experiences that blend aesthetic beauty with functional innovation. based in kudus, indonesia."
	/>
	<meta
		name="keywords"
		content="cornelius yoga, web developer, android developer, ui/ux designer, frontend developer, fullstack developer, kudus, salatiga, semarang, tangerang, jakarta, universitas kristen satya wacana, uksw, fti, fakultas teknologi informasi, scwu, satya wacana christian university, indonesia"
	/>
</svelte:head>

<div
	class="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-gray-950 dark:text-white"
>
	{@render children?.()}
</div>
