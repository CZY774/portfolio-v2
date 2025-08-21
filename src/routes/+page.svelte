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
		if (typeof gsap !== 'undefined') {
			gsap.registerPlugin(ScrollTrigger);

			// Page transition effect
			gsap.from('body', {
				opacity: 0,
				duration: 1,
				ease: 'power2.out'
			});

			// Parallax effects for background elements
			gsap.utils.toArray('.parallax').forEach((element) => {
				gsap.to(element, {
					yPercent: -30,
					ease: 'none',
					scrollTrigger: {
						trigger: element.parentElement,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1
					}
				});
			});

			// Smooth scroll enhancement
			ScrollTrigger.scrollerProxy(document.body, {
				scrollTop(value) {
					if (arguments.length) {
						document.documentElement.scrollTop = document.body.scrollTop = value;
					}
					return document.documentElement.scrollTop || document.body.scrollTop;
				}
			});

			// Milestone navigation setup
			const sections = ['landing', 'about', 'work', 'footer'];
			sections.forEach((sectionId, index) => {
				const element = document.getElementById(sectionId);
				if (element) {
					ScrollTrigger.create({
						trigger: element,
						start: 'top center',
						end: 'bottom center',
						onEnter: () => updateMilestone(index),
						onEnterBack: () => updateMilestone(index)
					});
				}
			});
		}

		// Handle scroll events for custom effects
		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					// Custom scroll effects can be added here
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (typeof ScrollTrigger !== 'undefined') {
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			}
		};
	});

	function updateMilestone(index) {
		// Update navigation milestone indicator
		console.log('Current section:', index);
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="relative min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden">
	<WebGL />
	<Navigation />
	
	<div class="relative z-10">
		<div id="landing">
			<Landing />
		</div>
		<div id="about">
			<About />
		</div>
		<div id="work">
			<Work />
		</div>
		<div id="footer">
			<Footer />
		</div>
	</div>
</div>