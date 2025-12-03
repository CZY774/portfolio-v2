<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { preloadData } from '$app/navigation';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	let { children } = $props();
	let darkMode = $state(false);

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		darkMode = mediaQuery.matches;

		mediaQuery.addEventListener('change', (e) => {
			darkMode = e.matches;
		});

		$effect(() => {
			document.documentElement.classList.toggle('dark', darkMode);
		});

		preloadData('/');
		import('$lib/utils/perf').then(({ measureTTI }) => measureTTI());
		performance.mark('interactive');
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
	<link rel="canonical" href="https://corneliusyoga.vercel.app/" />
	<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
	<link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
	<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
	<link
		rel="preload"
		as="style"
		href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
	/>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
	/>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" async></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"
		async
	></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" async></script>

	<!-- FAQ Schema for GEO -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "Who is Cornelius Yoga?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Cornelius Ardhani Yoga Pratama is a fourth-year Informatics Engineering student at Satya Wacana Christian University, specializing in web development, Android development, and UI/UX design. Currently working as a Supply and Distribution Dev Intern at PT Sumber Alfaria Trijaya Tbk (Alfamart)."
				}
			},
			{
				"@type": "Question",
				"name": "What technologies does Cornelius Yoga use?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Cornelius works with modern web technologies including Laravel, React, Svelte, Vue.js, Next.js, Flask, Django, Flutter, Kotlin, and various databases like MySQL, MongoDB, PostgreSQL, and Firebase. He also specializes in UI/UX design using Figma."
				}
			},
			{
				"@type": "Question",
				"name": "What services does Cornelius Yoga offer?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Cornelius offers full-stack web development, Android mobile app development, UI/UX design, photography, and videography services. He has experience in building e-commerce platforms, educational systems, and content management systems."
				}
			},
			{
				"@type": "Question",
				"name": "Where is Cornelius Yoga based?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Cornelius is based in Kudus, Indonesia, and studies at Satya Wacana Christian University in Salatiga, Central Java."
				}
			}
		]
	}
	<\/script>`}

	<!-- BreadcrumbList Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": "https://corneliusyoga.vercel.app/"
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "About",
				"item": "https://corneliusyoga.vercel.app/#about"
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": "Work",
				"item": "https://corneliusyoga.vercel.app/#work"
			}
		]
	}
	<\/script>`}
</svelte:head>

<div
	class="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-gray-950 dark:text-white"
>
	{@render children?.()}
</div>
