<script lang="ts">
	import { onMount } from 'svelte';
	import { throttle, RAFThrottle } from '$lib/utils/perf';
	import { initGSAP, initSmoothScrolling } from '$lib/utils/animations';
	import { initThreeJS } from '$lib/utils/threejs';
	import type { WorkItem } from '$lib/data/portfolio';
	import { track } from '@vercel/analytics';
	import SEO from '$lib/components/SEO.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import WebGLBackground from '$lib/components/WebGLBackground.svelte';
	import WorkModal from '$lib/components/WorkModal.svelte';
	import LandingSection from '$lib/components/sections/LandingSection.svelte';
	import AboutSection from '$lib/components/sections/AboutSection.svelte';
	import WorkSection from '$lib/components/sections/WorkSection.svelte';
	import FooterSection from '$lib/components/sections/FooterSection.svelte';

	let canvas = $state<HTMLCanvasElement>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let scene: any, camera: any, renderer: any, particles: any;
	let isLoading = $state(true);
	let isModalOpen = $state(false);
	let modalContent = $state<WorkItem | null>(null);
	let modalType = $state<'image' | 'video' | null>(null);
	let mobileMenuOpen = $state(false);
	let mouse = $state({ x: 0, y: 0 });

	onMount(async () => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js').catch(() => {});
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const THREE = (window as any).THREE;
		if (THREE && canvas) {
			try {
				const threeScene = initThreeJS(canvas, THREE);
				if (threeScene) {
					scene = threeScene.scene;
					camera = threeScene.camera;
					renderer = threeScene.renderer;
					particles = threeScene.particles;
					animate();
				}
			} catch {
				console.warn('WebGL not supported, falling back to static background');
			}
		}

		initGSAP();
		initSmoothScrolling();

		const handleMouse = throttle((e: MouseEvent) => {
			mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
			const mouseX = (e.clientX / window.innerWidth) * 100;
			const mouseY = (e.clientY / window.innerHeight) * 100;
			document.body.style.setProperty('--mouse-x', `${mouseX}%`);
			document.body.style.setProperty('--mouse-y', `${mouseY}%`);
		}, 16);
		document.addEventListener('mousemove', handleMouse);

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	});

	let rafThrottle: { run: (callback: (delta: number) => void) => void; stop: () => void } | null =
		null;

	async function animate() {
		if (!particles || !renderer || !scene || !camera) return;

		if (!rafThrottle) {
			rafThrottle = new RAFThrottle(60);
			rafThrottle.run(() => {
				if (!particles || !renderer || !scene || !camera) return;
				particles.rotation.x += 0.0003 + mouse.y * 0.0001;
				particles.rotation.y += 0.0005 + mouse.x * 0.0001;
				const scale = 1 + (mouse.x * 0.02 + mouse.y * 0.02) * 0.1;
				particles.scale.set(scale, scale, scale);
				renderer.render(scene, camera);
			});
		}
	}

	function openModal(content: WorkItem, type: 'image' | 'video') {
		modalContent = content;
		modalType = type;
		isModalOpen = true;
		track('modal_open', { title: content.title, type });
	}
</script>

<SEO />

<Loader bind:isLoading />

<WorkModal bind:isOpen={isModalOpen} bind:content={modalContent} bind:type={modalType} />

<WebGLBackground bind:canvas />

<Navigation bind:mobileMenuOpen />

<LandingSection />

<AboutSection />

<WorkSection {openModal} />

<FooterSection />

<style>
	:global(*, *::before, *::after) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjYiLz4KPC9zdmc+')
				16 16,
			auto !important;
	}

	:global(.dark *, .dark *::before, .dark *::after) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNCIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjYiLz4KPC9zdmc+')
				16 16,
			auto !important;
	}

	:global(button, a, [role='button'], input, textarea, select) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDczNmZlIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA3MzZmZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==')
				16 16,
			pointer !important;
	}

	:global(.dark button, .dark a, .dark [role='button'], .dark input, .dark textarea, .dark select) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjMDczNmZlIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA3MzZmZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==')
				16 16,
			pointer !important;
	}

	:global(::-webkit-scrollbar) {
		display: none;
	}
	:global(html) {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

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
</style>
