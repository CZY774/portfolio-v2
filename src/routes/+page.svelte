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
		'devicon-c-original',
		'devicon-cplusplus-plain',
		'devicon-html5-plain',
		'devicon-css3-plain',
		'devicon-css3-plain',
		'devicon-javascript-plain',
		'devicon-python-plain',
		'devicon-r-plain',
		'devicon-php-plain',
		'devicon-java-plain',
		'devicon-kotlin-plain',
		'devicon-typescript-plain',
		'devicon-csharp-plain',
		'devicon-bootstrap-plain',
		'devicon-laravel-plain',
		'devicon-flask-plain',
		'devicon-tailwindcss-plain',
		'devicon-feathersjs-original',
		'devicon-jetpackcompose-plain',
		'devicon-spring-plain',
		'devicon-opengl-plain',
		'devicon-dotnetcore-plain',
		'devicon-react-plain',
		'devicon-axios-plain',
		'devicon-alpinejs-plain',
		'devicon-vuejs-plain',
		'devicon-ktor-plain',
		'devicon-svelte-plain',
		'devicon-chartjs-plain',
		'devicon-expo-plain',
		'devicon-nextjs-plain',
		'devicon-prisma-plain',
		'devicon-express-original',
		'devicon-flutter-plain',
		'devicon-threejs-original',
		'devicon-nodejs-plain',
		'devicon-socketio-original',
		'devicon-fastapi-plain',
		'devicon-django-plain',
		'devicon-djangorest-plain',
		'devicon-materialui-plain',
		'devicon-dart-plain',
		'devicon-rust-plain',
		'devicon-go-plain',
		'devicon-zig-plain',
		'devicon-sqlite-plain',
		'devicon-mysql-plain',
		'devicon-oracle-plain',
		'devicon-mongodb-plain',
		'devicon-redis-plain',
		'devicon-postgresql-plain',
		'devicon-firebase-plain',
		'devicon-cassandra-plain',
		'devicon-googlecloud-plain',
		'devicon-docker-plain',
		'devicon-gradle-plain',
		'devicon-vitejs-plain',
		'devicon-graphql-plain',
		'devicon-grafana-plain',
		'devicon-grpc-plain'
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
				title: 'Muncul River Tubing',
				desc: 'Business website built with Laravel & Bootstrap',
				link: 'https://munculrivertubing.com',
				image: '/images/website-1.png'
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

		// Initialize scroll navigation with better implementation
		initSmoothScrolling();

		// Mouse tracking for interactive background
		document.addEventListener('mousemove', (e) => {
			mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

			// Update CSS custom properties for background interaction
			const mouseX = (e.clientX / window.innerWidth) * 100;
			const mouseY = (e.clientY / window.innerHeight) * 100;
			document.body.style.setProperty('--mouse-x', `${mouseX}%`);
			document.body.style.setProperty('--mouse-y', `${mouseY}%`);
		});

		// Enhanced loading animation
		setTimeout(() => {
			isLoading = false;
		}, 3000);
	});

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			const headerOffset = 80;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
		// Close mobile menu if open
		mobileMenuOpen = false;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function initSmoothScrolling() {
		// Enhanced smooth scrolling implementation
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();
				const targetId = this.getAttribute('href')?.substring(1);
				if (targetId) {
					scrollToSection(targetId);
				}
			});
		});

		// Handle URL hash on load
		if (window.location.hash) {
			const targetId = window.location.hash.substring(1);
			setTimeout(() => scrollToSection(targetId), 100);
		}
	}

	function initThreeJS() {
		if (!THREE || !canvas) return;

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Create particles with better colors
		const geometry = new THREE.BufferGeometry();
		const vertices = [];
		const colors = [];

		for (let i = 0; i < 800; i++) {
			vertices.push((Math.random() - 0.5) * 2000);
			vertices.push((Math.random() - 0.5) * 2000);
			vertices.push((Math.random() - 0.5) * 2000);

			// Dynamic colors based on theme or better contrast
			const isDark = document.documentElement.classList.contains('dark');
			if (isDark) {
				// Dark mode - lighter particles
				colors.push(0.6); // R
				colors.push(0.6); // G
				colors.push(0.9); // B - blue tint
			} else {
				// Light mode - darker particles for visibility
				colors.push(0.1); // R - darker
				colors.push(0.2); // G - darker
				colors.push(0.3); // B - visible blue
			}
		}

		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 2,
			vertexColors: true,
			opacity: 0.6, // Increased from 0.3 to 0.6
			transparent: true,
			blending: THREE.AdditiveBlending
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
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		});
	}

	function animate() {
		if (!particles || !renderer || !scene || !camera) return;
		requestAnimationFrame(animate);

		// Enhanced interactive rotation with background distortion effect
		particles.rotation.x += 0.0003 + mouse.y * 0.0001;
		particles.rotation.y += 0.0005 + mouse.x * 0.0001;

		// Add subtle scaling based on mouse position for distortion effect
		const scale = 1 + (mouse.x * 0.02 + mouse.y * 0.02) * 0.1;
		particles.scale.set(scale, scale, scale);

		renderer.render(scene, camera);
	}

	function initGSAP() {
		if (!window.gsap || !window.ScrollTrigger) return;

		window.gsap.registerPlugin(window.ScrollTrigger);

		// Landing animations with stagger
		window.gsap.from('.hero-title .word', {
			duration: 1.2,
			y: 120,
			opacity: 0,
			stagger: 0.15,
			ease: 'power3.out',
			delay: 3.2
		});

		window.gsap.from('.hero-desc', {
			duration: 1,
			y: 60,
			opacity: 0,
			delay: 3.8
		});

		// Section animations
		window.gsap.utils.toArray('.section').forEach((section: any) => {
			window.gsap.from(section.querySelectorAll('.animate-in'), {
				y: 80,
				opacity: 0,
				duration: 1,
				stagger: 0.1,
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

<!-- Enhanced Loader -->
{#if isLoading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950">
		<div class="text-center">
			<!-- Animated Logo -->
			<div class="mb-12">
				<div class="mb-4 text-6xl font-light">
					<span class="animate-fade-in-up inline-block" style="animation-delay: 0.2s;">c</span>
					<span class="animate-fade-in-up inline-block" style="animation-delay: 0.4s;">z</span>
					<span class="animate-fade-in-up inline-block" style="animation-delay: 0.6s;">y</span>
				</div>
				<!-- Progress Bar -->
				<div class="mx-auto h-0.5 w-32 overflow-hidden bg-gray-200 dark:bg-gray-800">
					<div class="animate-loading-bar h-full bg-[#0736fe]"></div>
				</div>
			</div>
			<p
				class="animate-fade-in text-lg font-light tracking-wider opacity-0"
				style="animation-delay: 1s;"
			>
				loading portfolio
			</p>
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
				class="absolute -top-12 right-0 text-2xl text-white transition-colors hover:text-[#0736fe]"
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
<canvas bind:this={canvas} class="pointer-events-none fixed inset-0 z-0"></canvas>

<!-- Navigation -->
<nav class="fixed top-0 right-0 left-0 z-40 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90">
	<div class="container mx-auto px-8 py-6">
		<div class="flex items-center justify-between">
			<button
				onclick={() => scrollToSection('landing')}
				class="text-lg font-medium transition-colors hover:text-[#0736fe]"
			>
				czy
			</button>

			<!-- Desktop Navigation -->
			<div class="hidden space-x-8 md:flex">
				<button
					onclick={() => scrollToSection('about')}
					class="transition-colors hover:text-[#0736fe]">about</button
				>
				<button
					onclick={() => scrollToSection('work')}
					class="transition-colors hover:text-[#0736fe]">work</button
				>
			</div>

			<!-- Mobile Menu Button -->
			<button onclick={toggleMobileMenu} class="relative z-50 p-2 md:hidden">
				<div class="hamburger {mobileMenuOpen ? 'active' : ''}">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
		</div>
	</div>

	<!-- Enhanced Mobile Menu -->
	{#if mobileMenuOpen}
		<div
			class="mobile-menu fixed top-0 left-0 flex h-screen w-full items-center justify-center bg-white/95 backdrop-blur-md dark:bg-gray-950/95"
		>
			<div class="space-y-8 text-center">
				<button
					onclick={() => scrollToSection('landing')}
					class="block transform text-4xl font-light transition-colors hover:scale-105 hover:text-[#0736fe]"
					>home</button
				>
				<button
					onclick={() => scrollToSection('about')}
					class="block transform text-4xl font-light transition-colors hover:scale-105 hover:text-[#0736fe]"
					>about</button
				>
				<button
					onclick={() => scrollToSection('work')}
					class="block transform text-4xl font-light transition-colors hover:scale-105 hover:text-[#0736fe]"
					>work</button
				>
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
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<div>
				<h1 class="hero-title mb-12 text-7xl leading-none font-light md:text-8xl lg:text-9xl">
					<span class="word inline-block">cornelius</span>
					<span class="word inline-block text-[#0736fe]">yoga</span>
				</h1>
				<div class="hero-desc">
					<p class="mb-12 text-2xl leading-relaxed font-light text-gray-600 dark:text-gray-400">
						digital designer & developer<br />
						based in kudus, indonesia
					</p>
				</div>
			</div>
			<div class="hero-desc text-right">
				<div class="mb-12">
					<div class="mb-8 flex justify-end space-x-6">
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
						class="custom-button border border-current px-8 py-3 transition-all hover:border-[#0736fe] hover:bg-[#0736fe] hover:text-[#0736fe]"
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
		<div class="animate-in relative mb-32 overflow-hidden">
			<div class="marquee-container">
				<div class="marquee-track">
					{#each techStack as tech}
						<i class="{tech} tech-icon"></i>
					{/each}
					{#each techStack as tech}
						<i class="{tech} tech-icon"></i>
					{/each}
				</div>
			</div>
		</div>

		<!-- Career Summary -->
		<div class="animate-in">
			<h3 class="mb-16 text-4xl font-light">career journey</h3>
			<div class="space-y-12">
				{#each career as item}
					<div
						class="border-b border-gray-200 pb-12 transition-colors duration-300 hover:border-[#0736fe] dark:border-gray-800"
					>
						<div class="mb-4 flex flex-col justify-between md:flex-row md:items-center">
							<h4 class="text-2xl font-medium transition-colors duration-300 hover:text-[#0736fe]">
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
					class="custom-button border border-current px-6 py-2 transition-all {currentFilter ===
					filter
						? 'border-[#0736fe] bg-[#0736fe] text-white'
						: 'hover:border-[#0736fe] hover:text-[#0736fe]'}"
				>
					{filter}
				</button>
			{/each}
		</div>

		<!-- Work Grid -->
		<div class="animate-in space-y-24">
			{#each filteredWorks as work, index}
				<div
					class="work-item group {index % 2 === 0
						? 'md:flex-row'
						: 'md:flex-row-reverse'} flex flex-col items-center gap-16 md:flex"
				>
					<!-- Image Container -->
					<div class="w-full md:w-1/2">
						<div
							class="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-gradient-to-br from-[#0736fe]/20 to-[#0736fe]/40 transition-all duration-700 hover:from-[#0736fe]/10 hover:to-[#0736fe]/20"
						>
							<!-- Default overlay with number -->
							<div
								class="absolute inset-0 flex items-center justify-center bg-[#0736fe]/60 transition-all duration-700 group-hover:bg-[#0736fe]/20"
							>
								<span
									class="text-8xl font-light text-white/40 transition-all duration-700 group-hover:text-white/20"
								>
									{String(index + 1).padStart(2, '0')}
								</span>
							</div>

							<!-- Actual image that appears on hover -->
							{#if work.image}
								<img
									src={work.image}
									alt={work.title}
									class="h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
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
					<div class="w-full space-y-6 md:w-1/2 {index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}">
						<div class="space-y-2">
							<span class="text-sm font-medium tracking-wider text-[#0736fe] uppercase"
								>{work.type}</span
							>
							<h3
								class="text-4xl leading-tight font-light transition-colors duration-300 hover:text-[#0736fe]"
							>
								{work.title}
							</h3>
						</div>

						<p class="text-xl leading-relaxed text-gray-600 dark:text-gray-400">{work.desc}</p>

						<div class="pt-4">
							{#if work.type === 'app' && work.link}
								<a
									href={work.link}
									target="_blank"
									class="custom-button group inline-flex items-center space-x-2 text-[#0736fe] hover:underline"
								>
									<span class="text-lg">view project</span>
									<svg
										class="h-5 w-5 transition-transform group-hover:translate-x-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17 8l4 4m0 0l-4 4m4-4H3"
										></path>
									</svg>
								</a>
							{:else if work.type === 'photo'}
								<button
									onclick={() => openModal(work, 'image')}
									class="custom-button group inline-flex items-center space-x-2 text-[#0736fe] hover:underline"
								>
									<span class="text-lg">look closer</span>
									<svg
										class="h-5 w-5 transition-transform group-hover:scale-110"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										></path>
									</svg>
								</button>
							{:else if work.type === 'video' && work.url}
								<button
									onclick={() => openModal(work, 'video')}
									class="custom-button group inline-flex items-center space-x-2 text-[#0736fe] hover:underline"
								>
									<span class="text-lg">play video</span>
									<svg
										class="h-5 w-5 transition-transform group-hover:scale-110"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										></path>
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

<!-- Footer - Layout inspired by landing section -->
<footer id="footer" class="section relative z-10 bg-black px-8 py-32 text-white">
	<div class="container mx-auto max-w-7xl">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<div>
				<p class="mb-1 text-lg font-light tracking-wider text-gray-500">vibecoded by</p>
				<h2 class="text-7xl leading-none font-light md:text-8xl lg:text-9xl">
					<span class="block text-white/90">cornelius</span>
					<span class="block text-white/90">ardhani</span>
					<span class="block text-[#0736fe]">yoga</span>
					<span class="block text-white/90">pratama</span>
				</h2>
			</div>
			<div class="text-right">
				<div class="space-y-8">
					<p class="text-xl leading-relaxed font-light text-gray-400">
						idk how many coffee<br />
						i've been drinking,<br />
						<span class="text-[#0736fe]">good design needs time</span>
					</p>
					<div class="text-sm font-light text-gray-600">kudus, indonesia — 2025</div>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	/* Enhanced cursor styles with better visibility */
	:global(*, *::before, *::after) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjYiLz4KPC9zdmc+')
				16 16,
			auto !important;
	}

	/* Dark mode cursor */
	:global(.dark *, .dark *::before, .dark *::after) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNCIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjYiLz4KPC9zdmc+')
				16 16,
			auto !important;
	}

	/* Hover cursor for interactive elements */
	:global(button, a, [role='button'], input, textarea, select) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDczNmZlIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA3MzZmZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==')
				16 16,
			pointer !important;
	}

	/* Dark mode hover cursor */
	:global(.dark button, .dark a, .dark [role='button'], .dark input, .dark textarea, .dark select) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjMDczNmZlIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA3MzZmZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==')
				16 16,
			pointer !important;
	}

	/* Remove button pulse effects */
	:global(.custom-button) {
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.custom-button:focus) {
		outline: 2px solid #0736fe !important;
		outline-offset: 2px !important;
		box-shadow: none !important;
	}

	:global(.custom-button:active) {
		transform: none !important;
		box-shadow: none !important;
	}

	/* Hide scrollbar */
	:global(::-webkit-scrollbar) {
		display: none;
	}
	:global(html) {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	/* Enhanced loading animations */
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes loading-bar {
		0% {
			width: 0%;
		}
		50% {
			width: 70%;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
		opacity: 0;
	}

	.animate-loading-bar {
		animation: loading-bar 2.5s ease-in-out forwards;
		width: 0%;
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out forwards;
		opacity: 0;
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

	/* Enhanced Mobile Menu Animation */
	.mobile-menu {
		animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(-10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	/* Outline text effect for footer */
	.outline-text-white {
		-webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	/* Enhanced background interaction */
	:global(body) {
		transition: background 0.1s ease;
		--mouse-x: 50%;
		--mouse-y: 50%;
	}

	:global(body:hover) {
		background: radial-gradient(
			circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
			rgba(7, 54, 254, 0.02) 0%,
			transparent 40%
		);
	}

	:global(.dark body:hover) {
		background: radial-gradient(
			circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
			rgba(7, 54, 254, 0.06) 0%,
			transparent 40%
		);
	}

	/* Work item hover effects */
	.work-item {
		transition:
			transform 0.3s ease,
			filter 0.3s ease;
	}

	.work-item:hover {
		transform: translateY(-5px);
		filter: brightness(1.05);
	}

	/* Better mobile responsiveness */
	@media (max-width: 640px) {
		.hamburger {
			width: 20px;
			height: 16px;
		}

		.hamburger span {
			height: 2px;
		}

		.hamburger span:nth-child(2) {
			top: 7px;
		}

		.hamburger span:nth-child(3) {
			top: 14px;
		}

		.hamburger.active span:nth-child(1) {
			top: 7px;
		}

		.hamburger.active span:nth-child(3) {
			top: 7px;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}

		.track {
			animation: none;
		}

		canvas {
			display: none !important;
		}
	}

	/* Print styles */
	@media print {
		* {
			background: transparent !important;
			color: black !important;
			text-shadow: none !important;
			filter: none !important;
		}

		canvas,
		.mobile-menu {
			display: none !important;
		}

		.fixed {
			position: static !important;
		}
	}

	/* Enhanced focus states for accessibility */
	:global(button:focus, a:focus) {
		outline: 2px solid #0736fe !important;
		outline-offset: 4px !important;
	}
</style>
