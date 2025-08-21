<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

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
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
	<title>cornelius yoga - creative developer & designer</title>
  <meta name="description" content="creative developer & designer crafting digital experiences that blend aesthetic beauty with functional innovation. based in jakarta, indonesia." />
  <meta name="keywords" content="cornelius yoga, web developer, ui/ux designer, frontend developer, fullstack developer, jakarta, indonesia" />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
	{@render children?.()}
</div>