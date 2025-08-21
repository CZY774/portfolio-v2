<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let scene: any, camera: any, renderer: any, particles: any;
	let currentFilter = $state('all');
	let isLoading = $state(true);
	let isModalOpen = $state(false);
	let modalContent = $state<any>(null);
	let modalType = $state<'image' | 'video' | null>(null);

	// Declare THREE as global
	declare global {
		interface Window {
			THREE: any;
		}
	}

	let THREE: any;

	const techStack = [
		'devicon-javascript-plain',
		'devicon-typescript-plain',
		'devicon-react-original',
		'devicon-svelte-plain',
		'devicon-nextjs-original',
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
				image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
			},
			{
				type: 'app',
				title: 'Task Management App',
				desc: 'Productivity tool built with React & TypeScript',
				link: 'https://github.com/username/project2',
				image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop'
			}
		],
		photo: [
			{
				type: 'photo',
				title: 'Urban Architecture',
				desc: 'Street photography series from Jakarta',
				image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'
			},
			{
				type: 'photo',
				title: 'Digital Portraits',
				desc: 'Contemporary portrait photography',
				image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
			}
		],
		videos: [
			{
				type: 'video',
				title: 'Motion Graphics Reel',
				desc: 'Creative animations and transitions',
				url: 'https://www.youtube.com/embed/TXQzKo2j-ok',
				image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop'
			},
			{
				type: 'video',
				title: 'Brand Identity Video',
				desc: 'Logo animation and brand presentation',
				url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
				image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop'
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

		// Simulate loading
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	});

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

		for (let i = 0; i < 1000; i++) {
			vertices.push((Math.random() - 0.5) * 2000);
			vertices.push((Math.random() - 0.5) * 2000);
			vertices.push((Math.random() - 0.5) * 2000);

			colors.push(Math.random());
			colors.push(Math.random());
			colors.push(Math.random());
		}

		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({ size: 2, vertexColors: true });
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
		particles.rotation.x += 0.0005;
		particles.rotation.y += 0.001;
		renderer.render(scene, camera);
	}

	function initGSAP() {
		// @ts-ignore
		gsap.registerPlugin(ScrollTrigger);

		// Smooth scroll
		// @ts-ignore
		gsap.to(window, { duration: 2, scrollTo: 0 });

		// Landing animations
		// @ts-ignore
		gsap.from('.hero-title', {
			duration: 1.5,
			y: 100,
			opacity: 0,
			stagger: 0.3,
			ease: 'power3.out',
			delay: 2.2
		});

		// @ts-ignore
		gsap.from('.hero-desc', {
			duration: 1,
			y: 50,
			opacity: 0,
			delay: 3
		});

		// Parallax effect
		// @ts-ignore
		gsap.to('.parallax-bg', {
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
		// @ts-ignore
		gsap.utils.toArray('.section').forEach((section: any) => {
			gsap.from(section.querySelectorAll('.animate-in'), {
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

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			// @ts-ignore
			gsap.to(window, {
				duration: 1.5,
				scrollTo: element,
				ease: 'power2.inOut'
			});
		}
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
	>
		<div class="relative max-h-full w-full max-w-4xl" onclick={(e) => e.stopPropagation()}>
			<button class="absolute -top-12 right-0 text-2xl text-white" onclick={closeModal}>×</button>
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
<canvas bind:this={canvas} class="fixed inset-0 z-0 opacity-30"></canvas>

<!-- Navigation -->
<nav class="fixed top-0 right-0 left-0 z-40 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
	<div class="container mx-auto px-8 py-6">
		<div class="flex items-center justify-between">
			<button onclick={() => scrollToSection('landing')} class="text-lg font-medium">cy</button>
			<div class="flex space-x-8">
				<button
					onclick={() => scrollToSection('about')}
					class="transition-colors hover:text-[#0736fe]">about</button
				>
				<button
					onclick={() => scrollToSection('work')}
					class="transition-colors hover:text-[#0736fe]">work</button
				>
				<button
					onclick={() => scrollToSection('footer')}
					class="transition-colors hover:text-[#0736fe]">contact</button
				>
			</div>
		</div>
	</div>
</nav>

<!-- Landing Section -->
<section
	id="landing"
	class="section relative z-10 flex min-h-screen items-center justify-center px-8"
>
	<div class="mx-auto max-w-6xl text-center">
		<h1 class="hero-title mb-8 text-8xl leading-none font-light md:text-9xl lg:text-[12rem]">
			cornelius <span class="text-[#0736fe]">yoga</span>
		</h1>
		<p class="hero-desc mx-auto mb-12 max-w-3xl text-xl font-light md:text-2xl">
			digital designer & developer crafting meaningful experiences through clean code and thoughtful
			design
		</p>
		<div class="hero-desc mb-16 flex flex-wrap items-center justify-center gap-8 text-lg">
			<span>jakarta, indonesia</span>
			<div class="flex space-x-6">
				<a href="https://instagram.com/corneliusyoga" class="transition-colors hover:text-[#0736fe]"
					>ig</a
				>
				<a href="https://github.com/corneliusyoga" class="transition-colors hover:text-[#0736fe]"
					>github</a
				>
				<a
					href="https://linkedin.com/in/corneliusyoga"
					class="transition-colors hover:text-[#0736fe]">linkedin</a
				>
				<a href="https://youtube.com/@corneliusyoga" class="transition-colors hover:text-[#0736fe]"
					>youtube</a
				>
			</div>
		</div>
		<div class="hero-desc flex justify-center space-x-8">
			<button
				onclick={() => scrollToSection('work')}
				class="border border-current px-8 py-3 transition-all hover:border-[#0736fe] hover:bg-[#0736fe] hover:text-white"
			>
				view work
			</button>
			<button
				onclick={() => scrollToSection('footer')}
				class="bg-[#0736fe] px-8 py-3 text-white transition-colors hover:bg-[#0736fe]/90"
			>
				get in touch
			</button>
		</div>
	</div>
</section>

<!-- About Section -->
<section id="about" class="section relative z-10 px-8 py-32">
	<div class="container mx-auto max-w-7xl">
		<h2 class="animate-in mb-24 text-6xl font-light md:text-8xl">about me</h2>

		<!-- Tech Stack Marquee -->
		<div class="animate-in mb-32 overflow-hidden">
			<div class="animate-marquee flex space-x-16">
				{#each [...techStack, ...techStack] as tech}
					<i class="{tech} text-6xl opacity-60"></i>
				{/each}
			</div>
		</div>

		<!-- Career Summary -->
		<div class="animate-in">
			<h3 class="mb-16 text-4xl font-light">career journey</h3>
			<div class="space-y-12">
				{#each career as item}
					<div class="border-b border-gray-200 pb-12 dark:border-gray-800">
						<div class="mb-4 flex flex-col justify-between md:flex-row md:items-center">
							<h4 class="text-2xl font-medium">{item.institution}</h4>
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
						: 'hover:text-[#0736fe]'}"
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
						<div class="relative mb-8 aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900">
							<img
								src={work.image}
								alt={work.title}
								class="h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0"
							>
								<span class="text-2xl font-light">{work.title.toLowerCase()}</span>
							</div>
						</div>
					{/if}

					<h3 class="mb-4 text-3xl font-light">{work.title}</h3>
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
	<div class="container mx-auto max-w-7xl text-center">
		<p class="animate-in text-lg text-gray-600 dark:text-gray-400">
			created by Cornelius Ardhani Yoga Pratama
		</p>
	</div>
</footer>

<style>
	@keyframes marquee {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.animate-marquee {
		animation: marquee 30s linear infinite;
	}
</style>
