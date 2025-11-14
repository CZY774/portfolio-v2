<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		// Three.js particle background (same as main page)
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

			const particlesGeometry = new THREE.BufferGeometry();
			const particlesCount = 1500;
			const posArray = new Float32Array(particlesCount * 3);

			for (let i = 0; i < particlesCount * 3; i++) {
				posArray[i] = (Math.random() - 0.5) * 1000;
			}

			particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

			const particlesMaterial = new THREE.PointsMaterial({
				size: 2,
				color: 0x0736fe,
				transparent: true,
				opacity: 0.6
			});

			const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
			scene.add(particlesMesh);
			camera.position.z = 400;

			const animate = () => {
				requestAnimationFrame(animate);
				particlesMesh.rotation.x += 0.0005;
				particlesMesh.rotation.y += 0.0007;
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
	});
</script>

<canvas bind:this={canvas} class="fixed top-0 left-0 -z-10 h-full w-full"></canvas>

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
		<a href="/" class="back-home custom-button">return home</a>
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
		background: linear-gradient(135deg, #0736fe 0%, #00c6ff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.02em;
	}

	.error-title {
		font-size: clamp(2rem, 4vw, 3rem);
		margin: 2rem 0 1rem;
		font-weight: 300;
		letter-spacing: -0.01em;
		color: #0736fe;
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
		color: #0736fe;
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

	/* Custom cursor */
	:global(*, *::before, *::after) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjYiLz4KPC9zdmc+')
				16 16,
			auto !important;
	}

	:global(button, a, [role='button']) {
		cursor:
			url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDczNmZlIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA3MzZmZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==')
				16 16,
			pointer !important;
	}

	@media (max-width: 640px) {
		.error-container {
			padding: 1rem;
		}
	}
</style>
