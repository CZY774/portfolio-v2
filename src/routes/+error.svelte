<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import WebGLBackground from '$lib/components/WebGLBackground.svelte';
	import { RAFThrottle } from '$lib/utils/perf';
	import { initThreeJS } from '$lib/utils/threejs';

	let canvas = $state<HTMLCanvasElement>();
	let mouse = $state({ x: 0, y: 0 });

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let scene: any, camera: any, renderer: any, particles: any;
	let rafThrottle: { run: (callback: (delta: number) => void) => void; stop: () => void } | null =
		null;
	let cleanupThree: (() => void) | null = null;

	function animate() {
		if (!particles || !renderer || !scene || !camera || rafThrottle) return;

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

	onMount(() => {
		let disposed = false;
		let retryHandle: ReturnType<typeof setTimeout> | undefined;
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const handleMouseMove = (e: MouseEvent) => {
			mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
			document.body.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
			document.body.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
		};

		const initBackground = (attempt = 0) => {
			if (disposed || prefersReducedMotion || cleanupThree) return;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const THREE = (window as any).THREE;
			if (!THREE || !canvas) {
				if (attempt < 20) {
					retryHandle = window.setTimeout(() => initBackground(attempt + 1), 100);
				}
				return;
			}

			try {
				const threeScene = initThreeJS(canvas, THREE);
				if (threeScene) {
					scene = threeScene.scene;
					camera = threeScene.camera;
					renderer = threeScene.renderer;
					particles = threeScene.particles;
					cleanupThree = threeScene.cleanup;
					animate();
				}
			} catch {
				console.warn('WebGL not supported');
			}
		};

		document.addEventListener('mousemove', handleMouseMove);
		initBackground();

		return () => {
			disposed = true;
			document.removeEventListener('mousemove', handleMouseMove);
			if (retryHandle) window.clearTimeout(retryHandle);
			rafThrottle?.stop();
			cleanupThree?.();
		};
	});
</script>

<WebGLBackground bind:canvas />

<section class="relative z-10 flex min-h-screen items-center justify-center px-8 py-24">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 items-center gap-20 lg:grid-cols-2 lg:gap-32">
			<div>
				<h1
					class="error-status mb-12 text-9xl leading-none font-light md:text-[12rem] lg:text-[16rem]"
				>
					<span class="inline-block text-[#0736fe]">{$page.status}</span>
				</h1>
				<p
					class="error-copy mb-12 text-2xl leading-relaxed font-light text-gray-600 dark:text-gray-400"
				>
					{#if $page.status === 404}
						page not found
					{:else if $page.status >= 500}
						server error
					{:else}
						something went wrong
					{/if}
				</p>
			</div>
			<div class="error-action text-left lg:text-right">
				<p class="mb-12 text-2xl font-light text-gray-600 dark:text-gray-400">
					{$page.error?.message || 'an unexpected error occurred'}
				</p>
				<a href="/" class="text-lg font-light text-[#0736fe] transition-opacity hover:opacity-70">
					← return home
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.error-status,
	.error-copy,
	.error-action {
		animation: error-reveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
		opacity: 0;
		transform: translateY(64px);
	}

	.error-copy {
		animation-delay: 0.16s;
		transform: translateY(40px);
	}

	.error-action {
		animation-delay: 0.28s;
		transform: translateY(40px);
	}

	@keyframes error-reveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.error-status,
		.error-copy,
		.error-action {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
