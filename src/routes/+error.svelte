<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let mouse = { x: 0, y: 0 };

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
		script.onload = () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const THREE = (window as any).THREE;
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);
			const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

			const geometry = new THREE.BufferGeometry();
			const vertices = [];
			const colors = [];

			for (let i = 0; i < 800; i++) {
				vertices.push((Math.random() - 0.5) * 2000);
				vertices.push((Math.random() - 0.5) * 2000);
				vertices.push((Math.random() - 0.5) * 2000);

				const isDark = document.documentElement.classList.contains('dark');
				if (isDark) {
					colors.push(0.6, 0.6, 0.9);
				} else {
					colors.push(0.1, 0.2, 0.3);
				}
			}

			geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
			geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

			const material = new THREE.PointsMaterial({
				size: 2,
				vertexColors: true,
				opacity: 0.6,
				transparent: true,
				blending: THREE.AdditiveBlending
			});

			const particles = new THREE.Points(geometry, material);
			scene.add(particles);
			camera.position.z = 1000;

			const animate = () => {
				requestAnimationFrame(animate);
				particles.rotation.x += 0.0003 + mouse.y * 0.0001;
				particles.rotation.y += 0.0005 + mouse.x * 0.0001;
				const scale = 1 + (mouse.x * 0.02 + mouse.y * 0.02) * 0.1;
				particles.scale.set(scale, scale, scale);
				renderer.render(scene, camera);
			};

			animate();

			window.addEventListener('resize', () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			});
		};
		document.head.appendChild(script);

		document.addEventListener('mousemove', (e) => {
			mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
		});
	});
</script>

<canvas bind:this={canvas} class="pointer-events-none fixed inset-0 z-0"></canvas>

<section class="relative z-10 flex min-h-screen items-center justify-center px-8 py-24">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<div>
				<h1 class="mb-12 text-7xl font-light leading-none md:text-8xl lg:text-9xl">
					<span class="inline-block text-[#0736fe]">{$page.status}</span>
				</h1>
				<div>
					<p class="mb-12 text-2xl font-light leading-relaxed text-gray-600 dark:text-gray-400">
						{#if $page.status === 404}
							page not found
						{:else if $page.status >= 500}
							server error
						{:else}
							something went wrong
						{/if}
					</p>
				</div>
			</div>
			<div class="text-right">
				<p class="mb-12 text-xl font-light text-gray-600 dark:text-gray-400">
					{$page.error?.message || 'an unexpected error occurred'}
				</p>
				<a
					href="/"
					class="inline-block border border-current px-10 py-4 text-lg font-light transition-all hover:border-[#0736fe] hover:bg-[#0736fe] hover:text-white"
				>
					return home
				</a>
			</div>
		</div>
	</div>
</section>

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

	:global(button, a, [role='button']) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDczNmZlIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA3MzZmZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==')
				16 16,
			pointer !important;
	}

	:global(.dark button, .dark a, .dark [role='button']) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjMDczNmZlIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA3MzZmZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==')
				16 16,
			pointer !important;
	}
</style>
