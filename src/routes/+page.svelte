<script lang="ts">
	import { onMount } from 'svelte';
	
	let canvas: HTMLCanvasElement;
	let scene: any, camera: any, renderer: any, particles: any;
	let currentFilter = $state('all');
	let isLoading = $state(true);
	
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

	const works = {
		apps: [
			{
				title: 'E-Commerce Platform',
				desc: 'Modern shopping experience with Next.js',
				link: 'https://github.com/username/project1',
				image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
			},
			{
				title: 'Task Management App',
				desc: 'Productivity tool built with React & TypeScript',
				link: 'https://github.com/username/project2',
				image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop'
			}
		],
		photo: [
			{
				title: 'Urban Architecture',
				desc: 'Street photography series from Jakarta',
				image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'
			},
			{
				title: 'Digital Portraits',
				desc: 'Contemporary portrait photography',
				image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
			}
		],
		videos: [
			{
				title: 'Motion Graphics Reel',
				desc: 'Creative animations and transitions',
				url: 'https://www.youtube.com/embed/TXQzKo2j-ok'
			},
			{
				title: 'Brand Identity Video',
				desc: 'Logo animation and brand presentation',
				url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
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

	let filteredWorks = $derived(() => {
		if (currentFilter === 'all') {
			return [...works.apps, ...works.photo, ...works.videos];
		}
		return works[currentFilter as keyof typeof works] || [];
	});

	onMount(() => {
		// Initialize Three.js scene
		initThreeJS();
		
		// Initialize GSAP animations
		initGSAP();
		
		// Simulate loading
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	});

	function initThreeJS() {
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
		gsap.to(window, {duration: 2, scrollTo: 0});
		
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
		// Modal implementation would go here
		console.log('Opening modal:', content, type);
	}
</script>

<!-- Loader -->
{#if isLoading}
	<div class="fixed inset-0 bg-white dark:bg-gray-950 z-50 flex items-center justify-center">
		<div class="text-center">
			<div class="w-16 h-16 border-4 border-[#0736fe] border-t-transparent rounded-full animate-spin mb-8"></div>
			<h2 class="text-2xl font-light tracking-wide">loading portfolio</h2>
		</div>
	</div>
{/if}

<!-- WebGL Background -->
<canvas bind:this={canvas} class="fixed inset-0 z-0 opacity-30"></canvas>

<!-- Navigation -->
<nav class="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
	<div class="container mx-auto px-8 py-6">
		<div class="flex justify-between items-center">
			<button onclick={() => scrollToSection('landing')} class="text-lg font-medium">cy</button>
			<div class="flex space-x-8">
				<button onclick={() => scrollToSection('about')} class="hover:text-[#0736fe] transition-colors">about</button>
				<button onclick={() => scrollToSection('work')} class="hover:text-[#0736fe] transition-colors">work</button>
				<button onclick={() => scrollToSection('footer')} class="hover:text-[#0736fe] transition-colors">contact</button>
			</div>
		</div>
	</div>
</nav>

<!-- Landing Section -->
<section id="landing" class="section min-h-screen flex items-center justify-center relative z-10 px-8">
	<div class="text-center max-w-6xl mx-auto">
		<h1 class="hero-title text-8xl md:text-9xl lg:text-[12rem] font-light leading-none mb-8">
			cornelius <span class="text-[#0736fe]">yoga</span>
		</h1>
		<p class="hero-desc text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto">
			digital designer & developer crafting meaningful experiences through clean code and thoughtful design
		</p>
		<div class="hero-desc flex flex-wrap justify-center items-center gap-8 mb-16 text-lg">
			<span>jakarta, indonesia</span>
			<div class="flex space-x-6">
				<a href="https://instagram.com/corneliusyoga" class="hover:text-[#0736fe] transition-colors">ig</a>
				<a href="https://github.com/corneliusyoga" class="hover:text-[#0736fe] transition-colors">github</a>
				<a href="https://linkedin.com/in/corneliusyoga" class="hover:text-[#0736fe] transition-colors">linkedin</a>
				<a href="https://youtube.com/@corneliusyoga" class="hover:text-[#0736fe] transition-colors">youtube</a>
			</div>
		</div>
		<div class="hero-desc flex justify-center space-x-8">
			<button onclick={() => scrollToSection('work')} class="border border-current px-8 py-3 hover:bg-[#0736fe] hover:border-[#0736fe] hover:text-white transition-all">
				view work
			</button>
			<button onclick={() => scrollToSection('footer')} class="bg-[#0736fe] text-white px-8 py-3 hover:bg-[#0736fe]/90 transition-colors">
				get in touch
			</button>
		</div>
	</div>
</section>

<!-- About Section -->
<section id="about" class="section py-32 relative z-10 px-8">
	<div class="container mx-auto max-w-7xl">
		<h2 class="animate-in text-6xl md:text-8xl font-light mb-24">about me</h2>
		
		<!-- Tech Stack Marquee -->
		<div class="animate-in overflow-hidden mb-32">
			<div class="flex space-x-16 animate-marquee">
				{#each [...techStack, ...techStack] as tech}
					<i class="{tech} text-6xl opacity-60"></i>
				{/each}
			</div>
		</div>

		<!-- Career Summary -->
		<div class="animate-in">
			<h3 class="text-4xl font-light mb-16">career journey</h3>
			<div class="space-y-12">
				{#each career as item}
					<div class="border-b border-gray-200 dark:border-gray-800 pb-12">
						<div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
							<h4 class="text-2xl font-medium">{item.institution}</h4>
							<span class="text-gray-600 dark:text-gray-400">{item.date}</span>
						</div>
						<p class="text-xl text-[#0736fe] mb-4">{item.role}</p>
						<p class="text-lg text-gray-600 dark:text-gray-400">{item.achievement}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Work Section -->
<section id="work" class="section py-32 relative z-10 px-8">
	<div class="container mx-auto max-w-7xl">
		<h2 class="animate-in text-6xl md:text-8xl font-light mb-24">selected work</h2>
		
		<!-- Filter Buttons -->
		<div class="animate-in flex flex-wrap gap-4 mb-16">
			{#each ['all', 'apps', 'photo', 'videos'] as filter}
				<button 
					onclick={() => currentFilter = filter}
					class="px-6 py-2 border border-current transition-all {currentFilter === filter ? 'bg-[#0736fe] text-white border-[#0736fe]' : 'hover:text-[#0736fe]'}"
				>
					{filter}
				</button>
			{/each}
		</div>

		<!-- Work Grid -->
		<div class="animate-in grid grid-cols-1 md:grid-cols-2 gap-16">
			{#each filteredWorks as work, i}
				<div class="work-item group">
					{#if work.image}
						<div class="relative mb-8 overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-[4/3]">
							<img 
								src={work.image} 
								alt={work.title}
								class="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							/>
							<div class="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
								<span class="text-2xl font-light">{work.title.toLowerCase()}</span>
							</div>
						</div>
					{/if}
					
					<h3 class="text-3xl font-light mb-4">{work.title}</h3>
					<p class="text-lg text-gray-600 dark:text-gray-400 mb-6">{work.desc}</p>
					
					{#if work.link}
						<a href={work.link} target="_blank" class="inline-block border border-current px-6 py-2 hover:bg-[#0736fe] hover:border-[#0736fe] hover:text-white transition-all">
							view project
						</a>
					{:else if work.image && currentFilter === 'photo'}
						<button onclick={() => openModal(work, 'image')} class="inline-block border border-current px-6 py-2 hover:bg-[#0736fe] hover:border-[#0736fe] hover:text-white transition-all">
							look closer
						</button>
					{:else if work.url}
						<button onclick={() => openModal(work, 'video')} class="inline-block border border-current px-6 py-2 hover:bg-[#0736fe] hover:border-[#0736fe] hover:text-white transition-all">
							play video
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Footer -->
<footer id="footer" class="section py-24 relative z-10 px-8">
	<div class="container mx-auto max-w-7xl text-center">
		<p class="animate-in text-lg text-gray-600 dark:text-gray-400">
			created by Cornelius Ardhani Yoga Pratama
		</p>
	</div>
</footer>

<style>
	@keyframes marquee {
		0% { transform: translateX(0%); }
		100% { transform: translateX(-50%); }
	}
	
	.animate-marquee {
		animation: marquee 30s linear infinite;
	}
</style>