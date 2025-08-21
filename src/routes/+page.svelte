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
				image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop'
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

		// Simulate loading
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	});

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

			colors.push(Math.random() * 0.3 + 0.7);
			colors.push(Math.random() * 0.3 + 0.7);
			colors.push(Math.random() * 0.3 + 0.7);
		}

		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 3,
			vertexColors: true,
			opacity: 0.6,
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
		particles.rotation.x += 0.0008;
		particles.rotation.y += 0.0012;
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
			<a href="#landing" class="text-lg font-medium hover:text-[#0736fe] transition-colors">cy</a>
			<div class="flex space-x-8">
				<a href="#about" class="transition-colors hover:text-[#0736fe]">about</a>
				<a href="#work" class="transition-colors hover:text-[#0736fe]">work</a>
				<a href="#footer" class="transition-colors hover:text-[#0736fe]">contact</a>
			</div>
		</div>
	</div>
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
				<div class="flex justify-end space-x-4">
					<a
						href="#work"
						class="border border-current px-8 py-3 transition-all hover:border-[#0736fe] hover:bg-[#0736fe] hover:text-white"
					>
						view work
					</a>
					<a
						href="#footer"
						class="bg-[#0736fe] px-8 py-3 text-white transition-colors hover:bg-[#0736fe]/90"
					>
						get in touch
					</a>
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
		<div class="animate-in grid grid-cols-1 gap-16 md:grid-cols-2">
			{#each filteredWorks as work}
				<div class="work-item group">
					{#if work.image}
						<div
							class="relative mb-8 aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 hover:scale-105 transition-transform duration-500"
						>
							<img
								src={work.image}
								alt={work.title}
								class="h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
								loading="lazy"
								onerror={(e) => {
									const target = e.target as HTMLImageElement;
									target.src =
										'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
								}}
							/>
							<div
								class="absolute inset-0 bg-[#0736fe]/0 hover:bg-[#0736fe]/20 transition-all duration-500 flex items-center justify-center"
							>
								<span
									class="text-2xl font-light text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									>{work.title.toLowerCase()}</span
								>
							</div>
						</div>
					{/if}

					<h3 class="mb-4 text-3xl font-light hover:text-[#0736fe] transition-colors duration-300">
						{work.title}
					</h3>
					<p class="mb-6 text-lg text-gray-600 dark:text-gray-400">{work.desc}</p>

					{#if work.type === 'app' && work.link}
						<a
							href={work.link}
							target="_blank"
							class="inline-block border border-current px-6 py-2 transition-all hover:border-[#0736fe] hover:bg-[#0736fe] hover:text-white"
						>
							view project
						</a>
					{:else if work.type === 'photo'}
						<button
							onclick={() => openModal(work, 'image')}
							class="inline-block border border-current px-6 py-2 transition-all hover:border-[#0736fe] hover:bg-[#0736fe] hover:text-white"
						>
							look closer
						</button>
					{:else if work.type === 'video' && work.url}
						<button
							onclick={() => openModal(work, 'video')}
							class="inline-block border border-current px-6 py-2 transition-all hover:border-[#0736fe] hover:bg-[#0736fe] hover:text-white"
						>
							play video
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Footer -->
<footer id="footer" class="section relative z-10 px-8 py-24">
	<div class="container mx-auto max-w-7xl">
		<div class="text-center mb-16">
			<div class="mb-16">
				<div class="text-[20vw] md:text-[15vw] lg:text-[12vw] font-light leading-none outline-text mb-8">
					CZY
				</div>
			</div>
			<div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
				<a
					href="mailto:cornelius@example.com"
					class="bg-[#0736fe] text-white px-8 py-4 text-lg transition-all hover:bg-[#0736fe]/90 hover:scale-105"
				>
					Let's Get Started →
				</a>
				<div class="flex space-x-6">
					<a href="mailto:cornelius@example.com" class="text-gray-600 dark:text-gray-400 hover:text-[#0736fe] underline">Email</a>
					<a href="https://instagram.com/corneliusyoga" class="text-gray-600 dark:text-gray-400 hover:text-[#0736fe] underline">Instagram</a>
					<a href="https://linkedin.com/in/corneliusyoga" class="text-gray-600 dark:text-gray-400 hover:text-[#0736fe] underline">LinkedIn</a>
					<a href="https://dribbble.com/corneliusyoga" class="text-gray-600 dark:text-gray-400 hover:text-[#0736fe] underline">Dribbble</a>
				</div>
			</div>
		</div>
		
		<div class="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
			<p class="animate-in text-gray-600 dark:text-gray-400">
				created by cornelius ardhani yoga pratama
			</p>
		</div>
	</div>
</footer>