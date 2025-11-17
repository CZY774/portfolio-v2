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

<div class="error-container">
	<div class="error-content">
		<h1 class="error-code">{$page.status}</h1>
		<p class="error-title">
			{#if $page.status === 404}
				page not found
			{:else if $page.status >= 500}
				server error
			{:else}
				something went wrong
			{/if}
		</p>
		<p class="error-message">
			{$page.error?.message || 'an unexpected error occurred'}
		</p>
		<a href="/" class="back-home">return home</a>
	</div>
</div>

<style>
	.error-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		position: relative;
		z-index: 10;
	}

	.error-content {
		text-align: center;
		max-width: 800px;
		animation: fade-in-up 0.8s ease-out;
	}

	.error-code {
		font-size: clamp(8rem, 20vw, 18rem);
		font-weight: 300;
		margin: 0;
		line-height: 1;
		color: #0736fe;
		letter-spacing: -0.02em;
	}

	.error-title {
		font-size: clamp(2rem, 4vw, 3rem);
		margin: 2rem 0 1rem;
		font-weight: 300;
		letter-spacing: -0.01em;
	}

	.error-message {
		font-size: clamp(1rem, 2vw, 1.25rem);
		margin: 1.5rem 0 3rem;
		font-weight: 300;
		color: #666;
		letter-spacing: -0.01em;
	}

	:global(.dark) .error-message {
		color: #999;
	}

	.back-home {
		display: inline-block;
		padding: 1rem 2.5rem;
		border: 1px solid currentColor;
		color: inherit;
		text-decoration: none;
		font-weight: 300;
		font-size: 1.125rem;
		letter-spacing: -0.01em;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.back-home::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 100%;
		background: #0736fe;
		transition: width 0.3s ease;
		z-index: -1;
	}

	.back-home:hover::before {
		width: 100%;
	}

	.back-home:hover {
		color: white;
		border-color: #0736fe;
	}

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

	@media (max-width: 640px) {
		.error-container {
			padding: 1rem;
		}
	}
</style>
