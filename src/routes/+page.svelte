<script lang="ts">
	import { onMount } from 'svelte';

	// Declare global interfaces
	declare global {
		interface Window {
			THREE: any;
			gsap: any;
			ScrollTrigger: any;
		}
	}

	let canvas: HTMLCanvasElement;
	let scene: any, camera: any, renderer: any, particles: any;
	let currentFilter = $state('all');
	let isLoading = $state(true);
	let isModalOpen = $state(false);
	let modalContent = $state<any>(null);
	let modalType = $state<'image' | 'video' | null>(null);
	let mobileMenuOpen = $state(false);
	let mouse = $state({ x: 0, y: 0 });

	let THREE: any;

	const techStack = [
		'devicon-javascript-plain',
		'devicon-typescript-plain',
		'devicon-react-original',
		'devicon-svelte-plain',
		'devicon-nextjs-plain',
		'devicon-nodejs-plain',
		'devicon-python-plain',
		'devicon-docker-plain',
		'devicon-postgresql-plain',
		'devicon-mongodb-plain',
		'devicon-figma-plain',
		'devicon-photoshop-plain',
		'devicon-git-plain',
		'devicon-github-original'
	];

	// Define proper types for works
	type WorkItem = {
		type: string;
		title: string;
		desc: string;
		image?: string;
		link?: string;
		url?: string;
	};

	type Works = {
		apps: WorkItem[];
		photo: WorkItem[];
		videos: WorkItem[];
	};

	const works: Works = {
		apps: [
			{
				type: 'app',
				title: 'E-Commerce Platform',
				desc: 'Modern shopping experience with Next.js',
				link: 'https://github.com/username/project1',
				image: '/images/project1.jpg'
			},
			{
				type: 'app',
				title: 'Task Management App',
				desc: 'Productivity tool built with React & TypeScript',
				link: 'https://github.com/username/project2',
				image: '/images/project2.jpg'
			}
		],
		photo: [
			{
				type: 'photo',
				title: 'Urban Architecture',
				desc: 'Street photography series from Jakarta',
				image: '/images/photo1.jpg'
			},
			{
				type: 'photo',
				title: 'Digital Portraits',
				desc: 'Contemporary portrait photography',
				image: '/images/photo2.jpg'
			}
		],
		videos: [
			{
				type: 'video',
				title: 'Motion Graphics Reel',
				desc: 'Creative animations and transitions',
				url: 'https://www.youtube.com/embed/TXQzKo2j-ok',
				image: '/images/video1.jpg'
			},
			{
				type: 'video',
				title: 'Brand Identity Video',
				desc: 'Logo animation and brand presentation',
				url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
				image: '/images/video2.jpg'
			}
		]
	};

	const career = [
		{
			institution: 'Tech Startup Inc.',
			date: '2023 - Present',
			role: 'Frontend Developer',
			achievement: 'Led UI/UX redesign increasing user engagement by 40%'
		},
		{
			institution: 'Digital Agency Co.',
			date: '2022 - 2023',
			role: 'Web Developer',
			achievement: 'Delivered 15+ client projects with 100% satisfaction rate'
		},
		{
			institution: 'University of Technology',
			date: '2019 - 2023',
			role: 'Computer Science Student',
			achievement: 'Graduated Cum Laude, GPA 3.8/4.0'
		}
	];

	// Fix the type issue with filteredWorks
	let filteredWorks = $derived.by(() => {
		if (currentFilter === 'all') {
			return [...works.apps, ...works.photo, ...works.videos];
		}
		return works[currentFilter as keyof Works] || [];
	});

	onMount(() => {
		// Get THREE from global scope
		THREE = window.THREE;

		// Initialize Three.js scene after THREE is available
		if (THREE) {
			initThreeJS();
		}

		// Initialize GSAP animations
		initGSAP();

		// Initialize scroll navigation
		initScrollNavigation();

		// Mouse tracking for interactive background
		document.addEventListener('mousemove', (e) => {
			mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
		});

		// Simulate loading
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	});

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			if (window.gsap) {
				window.gsap.to(window, { 
					scrollTo: { y: element, offsetY: 80 }, 
					duration: 1.5, 
					ease: 'power2.inOut' 
				});
			} else {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
		// Close mobile menu if open
		mobileMenuOpen = false;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function initScrollNavigation() {
		// Detect if a link's href goes to the current page
		function getSamePageAnchor(link: HTMLAnchorElement) {
			if (
				link.protocol !== window.location.protocol ||
				link.host !== window.location.host ||
				link.pathname !== window.location.pathname ||
				link.search !== window.location.search
			) {
				return false;
			}
			return link.hash;
		}

		// Scroll to a given hash, preventing the event given if there is one
		function scrollToHash(hash: string, e?: Event) {
			const elem = hash ? document.querySelector(hash) : false;
			if (elem) {
				if (e) e.preventDefault();
				if (window.gsap) {
					window.gsap.to(window, { scrollTo: elem, duration: 1.5, ease: 'power2.inOut' });
				} else {
					elem.scrollIntoView({ behavior: 'smooth' });
				}
			}
		}

		// If a link's href is within the current page, scroll to it instead
		document.querySelectorAll('a[href]').forEach((a) => {
			a.addEventListener('click', (e) => {
				const anchor = getSamePageAnchor(a as HTMLAnchorElement);
				if (anchor) {
					scrollToHash(anchor, e);
				}
			});
		});

		// Scroll to the element in the URL's hash on load
		scrollToHash(window.location.hash);
	}

	function initThreeJS() {
		if (!THREE || !canvas) return;

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);

		// Create particles
		const geometry = new THREE.BufferGeometry();
		const vertices = [];
		const colors = [];

		for (let i = 0; i < 1500; i++) {
			vertices.push((Math.random() - 0.5) * 2000);
			vertices.push((Math.random() - 0.5) * 2000);
			vertices.push((Math.random() - 0.5) * 2000);

			// Better colors for both light and dark mode
			colors.push(0.03); // R - blue tint
			colors.push(0.21); // G - blue tint  
			colors.push(0.99); // B - blue (#0736fe)
		}

		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 4,
			vertexColors: true,
			opacity: 0.8,
			transparent: true
		});
		particles = new THREE.Points(geometry, material);
		scene.add(particles);

		camera.position.z = 1000;

		animate();

		// Handle resize
		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});
	}

	function animate() {
		if (!particles || !renderer || !scene || !camera) return;
		requestAnimationFrame(animate);
		
		// Interactive rotation based on mouse position
		particles.rotation.x += 0.0008 + (mouse.y * 0.0002);
		particles.rotation.y += 0.0012 + (mouse.x * 0.0002);
		
		renderer.render(scene, camera);
	}

	function initGSAP() {
		if (!window.gsap || !window.ScrollTrigger) return;

		window.gsap.registerPlugin(window.ScrollTrigger);

		// Landing animations
		window.gsap.from('.hero-title', {
			duration: 1.5,
			y: 100,
			opacity: 0,
			stagger: 0.3,
			ease: 'power3.out',
			delay: 2.2
		});

		window.gsap.from('.hero-desc', {
			duration: 1,
			y: 50,
			opacity: 0,
			delay: 3
		});

		// Parallax effect
		window.gsap.to('.parallax-bg', {
			yPercent: -50,
			ease: 'none',
			scrollTrigger: {
				trigger: '.parallax-bg',
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		});

		// Section animations
		window.gsap.utils.toArray('.section').forEach((section: any) => {
			window.gsap.from(section.querySelectorAll('.animate-in'), {
				y: 100,
				opacity: 0,
				duration: 1,
				stagger: 0.2,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: section,
					start: 'top 80%'
				}
			});
		});
	}

	function openModal(content: any, type: 'image' | 'video') {
		modalContent = content;
		modalType = type;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		modalContent = null;
		modalType = null;
	}
</script>

<svelte:head>
	<title>cornelius yoga - creative developer & designer</title>
</svelte:head>

<!-- Loader -->
{#if isLoading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950">
		<div class="text-center">
			<div
				class="mb-8 h-16 w-16 animate-spin rounded-full border-4 border-[#0736fe] border-t-transparent"
			></div>
			<h2 class="text-2xl font-light tracking-wide">loading portfolio</h2>
		</div>
	</div>
{/if}

<!-- Modal -->
{#if isModalOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
		onclick={closeModal}
		role="dialog"
		aria-modal="true"
		onkeydown={(e) => {
			if (e.key === 'Escape') closeModal();
		}}
	>
		<div class="relative max-h-full w-full max-w-4xl" onclick={(e) => e.stopPropagation()}>
			<button
				class="absolute -top-12 right-0 text-2xl text-white hover:text-[#0736fe] transition-colors"
				onclick={closeModal}>✕</button
			>
			{#if modalType === 'image'}
				<img
					src={modalContent.image}
					alt={modalContent.title}
					class="h-auto max-h-[80vh] w-full object-contain"
				/>
			{:else if modalType === 'video'}
				<iframe
					src={modalContent.url}
					class="aspect-video w-full"
					title={modalContent.title}
					frameborder="0"
					allowfullscreen
				></iframe>
			{/if}
			<div class="mt-4 text-center text-white">
				<h3 class="text-xl font-medium">{modalContent.title}</h3>
				<p class="text-gray-300">{modalContent.desc}</p>
			</div>
		</div>
	</div>
{/if}

<!-- WebGL Background -->
<canvas bind:this={canvas} class="fixed inset-0 z-0 opacity-60 pointer-events-none"></canvas>

<!-- Navigation -->
<nav class="fixed top-0 right-0 left-0 z-40 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90">
	<div class="container mx-auto px-8 py-6">
		<div class="flex items-center justify-between">
			<button 
				onclick={() => scrollToSection('landing')} 
				class="text-lg font-medium hover:text-[#0736fe] transition-colors"
			>
				cy
			</button>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:flex space-x-8">
				<button onclick={() => scrollToSection('about')} class="transition-colors hover:text-[#0736fe]">about</button>
				<button onclick={() => scrollToSection('work')} class="transition-colors hover:text-[#0736fe]">work</button>
				<button onclick={() => scrollToSection('footer')} class="transition-colors hover:text-[#0736fe]">contact</button>
			</div>

			<!-- Mobile Menu Button -->
			<button onclick={toggleMobileMenu} class="md:hidden relative z-50 p-2">
				<div class="hamburger {mobileMenuOpen ? 'active' : ''}">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="mobile-menu fixed inset-0 bg-white dark:bg-gray-950 flex items-center justify-center">
			<div class="text-center space-y-8">
				<button onclick={() => scrollToSection('landing')} class="block text-4xl font-light hover:text-[#0736fe] transition-colors">home</button>
				<button onclick={() => scrollToSection('about')} class="block text-4xl font-light hover:text-[#0736fe] transition-colors">about</button>
				<button onclick={() => scrollToSection('work')} class="block text-4xl font-light hover:text-[#0736fe] transition-colors">work</button>
				<button onclick={() => scrollToSection('footer')} class="block text-4xl font-light hover:text-[#0736fe] transition-colors">contact</button>
			</div>
		</div>
	{/if}
</nav>

<!-- Landing Section -->
<section
	id="landing"
	class="section relative z-10 flex min-h-screen items-center justify-center px-8 py-24"
>
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div>
				<h1 class="hero-title mb-12 text-7xl leading-none font-light md:text-8xl lg:text-9xl">
					cornelius <span class="text-[#0736fe]">yoga</span>
				</h1>
				<div class="hero-desc">
					<p class="text-2xl font-light text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
						digital designer & developer<br />
						based in kudus, indonesia
					</p>
				</div>
			</div>
			<div class="hero-desc text-right">
				<div class="mb-12">
					<div class="flex justify-end space-x-6 mb-8">
						<a
							href="https://instagram.com/corneliusyoga"
							class="transition-colors hover:text-[#0736fe]">ig</a
						>
						<a
							href="https://github.com/corneliusyoga"
							class="transition-colors hover:text-[#0736fe]">github</a
						>
						<a
							href="https://linkedin.com/in/corneliusyoga"
							class="transition-colors hover:text-[#0736fe]">linkedin</a
						>
						<a
							href="https://youtube.com/@corneliusyoga"
							class="transition-colors hover:text-[#0736fe]">youtube</a
						>
					</div>
				</div>
				<div class="flex justify-end">
					<button
						onclick={() => scrollToSection('work')}
						class="border border-current px-8 py-3 transition-all hover:border-[#0736fe] hover:bg-[#0736fe] hover:text-white"
					>
						view work
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- About Section -->
<section id="about" class="section relative z-10 px-8 py-32">
	<div class="container mx-auto max-w-7xl">
		<h2 class="animate-in mb-24 text-6xl font-light md:text-8xl">about me</h2>

		<!-- Tech Stack Marquee -->
		<div class="animate-in mb-32 overflow-hidden relative">
			<div class="marquee">
				<div class="track">
					<div class="content">
						{#each [...techStack, ...techStack] as tech}
							<i
								class="{tech} text-6xl opacity-60 hover:opacity-100 hover:text-[#0736fe] transition-all duration-300 mr-16"
							></i>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Career Summary -->
		<div class="animate-in">
			<h3 class="mb-16 text-4xl font-light">career journey</h3>
			<div class="space-y-12">
				{#each career as item}
					<div
						class="border-b border-gray-200 pb-12 dark:border-gray-800 hover:border-[#0736fe] transition-colors duration-300"
					>
						<div class="mb-4 flex flex-col justify-between md:flex-row md:items-center">
							<h4 class="text-2xl font-medium hover:text-[#0736fe] transition-colors duration-300">
								{item.institution}
							</h4>
							<span class="text-gray-600 dark:text-gray-400">{item.date}</span>
						</div>
						<p class="mb-4 text-xl text-[#0736fe]">{item.role}</p>
						<p class="text-lg text-gray-600 dark:text-gray-400">{item.achievement}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Work Section -->
<section id="work" class="section relative z-10 px-8 py-32">
	<div class="container mx-auto max-w-7xl">
		<h2 class="animate-in mb-24 text-6xl font-light md:text-8xl">selected work</h2>

		<!-- Filter Buttons -->
		<div class="animate-in mb-16 flex flex-wrap gap-4">
			{#each ['all', 'apps', 'photo', 'videos'] as filter}
				<button
					onclick={() => (currentFilter = filter)}
					class="border border-current px-6 py-2 transition-all {currentFilter === filter
						? 'border-[#0736fe] bg-[#0736fe] text-white'
						: 'hover:text-[#0736fe] hover:border-[#0736fe]'}"
				>
					{filter}
				</button>
			{/each}
		</div>

		<!-- Work Grid -->
		<div class="animate-in space-y-24">
			{#each filteredWorks as work, index}
				<div class="work-item group {index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col md:flex gap-16 items-center">
					<!-- Image Container -->
					<div class="w-full md:w-1/2">
						<div
							class="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#0736fe]/20 to-[#0736fe]/40 hover:from-[#0736fe]/10 hover:to-[#0736fe]/20 transition-all duration-700 group cursor-pointer"
						>
							<!-- Default overlay with number -->
							<div class="absolute inset-0 flex items-center justify-center bg-[#0736fe]/60 group-hover:bg-[#0736fe]/20 transition-all duration-700">
								<span class="text-8xl font-light text-white/40 group-hover:text-white/20 transition-all duration-700">
									{String(index + 1).padStart(2, '0')}
								</span>
							</div>
							
							<!-- Actual image that appears on hover -->
							{#if work.image}
								<img
									src={work.image}
									alt={work.title}
									class="h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
									loading="lazy"
									onerror={(e) => {
										const target = e.target as HTMLImageElement;
										target.src =
											'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzA3MzZmZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
									}}
								/>
							{/if}
						</div>
					</div>

					<!-- Content -->
					<div class="w-full md:w-1/2 space-y-6 {index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}">
						<div class="space-y-2">
							<span class="text-sm uppercase tracking-wider text-[#0736fe] font-medium">{work.type}</span>
							<h3 class="text-4xl font-light leading-tight hover:text-[#0736fe] transition-colors duration-300">
								{work.title}
							</h3>
						</div>
						
						<p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{work.desc}</p>

						<div class="pt-4">
							{#if work.type === 'app' && work.link}
								<a
									href={work.link}
									target="_blank"
									class="inline-flex items-center space-x-2 text-[#0736fe] hover:underline group"
								>
									<span class="text-lg">view project</span>
									<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
									</svg>
								</a>
							{:else if work.type === 'photo'}
								<button
									onclick={() => openModal(work, 'image')}
									class="inline-flex items-center space-x-2 text-[#0736fe] hover:underline group"
								>
									<span class="text-lg">look closer</span>
									<svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
									</svg>
								</button>
							{:else if work.type === 'video' && work.url}
								<button
									onclick={() => openModal(work, 'video')}
									class="inline-flex items-center space-x-2 text-[#0736fe] hover:underline group"
								>
									<span class="text-lg">play video</span>
									<svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
									</svg>
								</button>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Footer -->
<footer id="footer" class="section relative z-10 px-8 py-32">
	<div class="container mx-auto max-w-7xl text-center">
		<!-- Large Typography -->
		<div class="mb-20">
			<div class="text-[15vw] md:text-[12vw] lg:text-[10vw] font-light leading-none mb-8 tracking-tight">
				<div class="outline-text">cornelius</div>
				<div class="outline-text">ardhani</div>
				<div class="text-[#0736fe]">yoga</div>
				<div class="outline-text">pratama</div>
			</div>
		</div>

		<!-- Contact Info -->
		<div class="mb-16 space-y-6">
			<a 
				href="mailto:cornelius@example.com" 
				class="block text-2xl md:text-3xl font-light hover:text-[#0736fe] transition-colors duration-300"
			>
				cornelius@example.com
			</a>
			<a 
				href="tel:+6281234567890" 
				class="block text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 hover:text-[#0736fe] transition-colors duration-300"
			>
				+62 812-3456-7890
			</a>
			<p class="text-lg text-gray-600 dark:text-gray-400">
				jakarta, indonesia
			</p>
		</div>

		<!-- Divider -->
		<div class="h-px bg-gray-200 dark:bg-gray-800 mb-8"></div>

		<!-- Copyright -->
		<p class="text-gray-600 dark:text-gray-400">
			created by cornelius ardhani yoga pratama
		</p>
	</div>
</footer>

<style>
	/* Enhanced cursor styles */
	:global(*, *::before, *::after) {
		cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iNiIgZmlsbD0iIzA3MzZmZSIgZmlsbC1vcGFjaXR5PSIwLjgiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA3MzZmZSIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjQiLz4KPC9zdmc+') 20 20, auto !important;
	}

	/* Hover cursor for interactive elements */
	:global(button, a, [role="button"], input, textarea, select) {
		cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iOCIgZmlsbD0iIzA3MzZmZSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDczNmZlIiBzdHJva2Utd2lkdGg9IjMiLz4KPC9zdmc+') 20 20, pointer !important;
	}

	/* Hide scrollbar */
	:global(::-webkit-scrollbar) {
		display: none;
	}
	:global(html) {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	/* Hamburger Menu Animation */
	.hamburger {
		width: 24px;
		height: 20px;
		position: relative;
		transform: rotate(0deg);
		transition: 0.3s ease-in-out;
		cursor: pointer;
	}

	.hamburger span {
		display: block;
		position: absolute;
		height: 2px;
		width: 100%;
		background: currentColor;
		border-radius: 1px;
		opacity: 1;
		left: 0;
		transform: rotate(0deg);
		transition: 0.3s ease-in-out;
	}

	.hamburger span:nth-child(1) {
		top: 0px;
	}

	.hamburger span:nth-child(2) {
		top: 9px;
	}

	.hamburger span:nth-child(3) {
		top: 18px;
	}

	.hamburger.active span:nth-child(1) {
		top: 9px;
		transform: rotate(135deg);
	}

	.hamburger.active span:nth-child(2) {
		opacity: 0;
		left: -60px;
	}

	.hamburger.active span:nth-child(3) {
		top: 9px;
		transform: rotate(-135deg);
	}

	/* Mobile Menu Animation */
	.mobile-menu {
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Outline text effect */
	.outline-text {
		-webkit-text-stroke: 2px currentColor;
		-webkit-text-fill-color: transparent;
		color: currentColor;
	}

	/* Work item hover effects */
	.work-item {
		transition: transform 0.3s ease;
	}

	.work-item:hover {
		transform: translateY(-5px);
	}
</style>