<script>
	import { onMount } from 'svelte';
	import Landing from '$lib/components/Landing.svelte';
	import About from '$lib/components/About.svelte';
	import Work from '$lib/components/Work.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import WebGL from '$lib/components/WebGL.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	let scrollY = 0;
	let innerHeight = 0;

	onMount(() => {
		// Initialize GSAP ScrollTrigger
		gsap.registerPlugin(ScrollTrigger);

		// Smooth scroll with inertia
		let velocity = 0;
		let targetScrollY = 0;

		const smoothScroll = () => {
			velocity += (targetScrollY - scrollY) * 0.1;
			velocity *= 0.8;
			scrollY += velocity;

			if (Math.abs(velocity) > 0.1) {
				requestAnimationFrame(smoothScroll);
			}
		};

		const handleWheel = (e) => {
			e.preventDefault();
			targetScrollY += e.deltaY * 0.5;
			targetScrollY = Math.max(
				0,
				Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight)
			);
			smoothScroll();
		};

		window.addEventListener('wheel', handleWheel, { passive: false });

		// Parallax effects
		gsap.utils.toArray('.parallax').forEach((element, i) => {
			gsap.to(element, {
				yPercent: -50,
				ease: 'none',
				scrollTrigger: {
					trigger: element,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		});

		// Milestone navigation
		const sections = gsap.utils.toArray('section');
		sections.forEach((section, i) => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top center',
				end: 'bottom center',
				onEnter: () => updateActiveSection(i),
				onEnterBack: () => updateActiveSection(i)
			});
		});

		return () => {
			window.removeEventListener('wheel', handleWheel);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});

	function updateActiveSection(index) {
		// Update navigation state if needed
		console.log('Active section:', index);
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div
	class="relative min-h-screen bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white"
>
	<WebGL />

	<div class="relative z-10">
		<Landing />
		<About />
		<Work />
		<Footer />
	</div>
</div>
