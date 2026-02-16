<script lang="ts">
	import { onMount } from 'svelte';
	import { defer } from '$lib/utils/defer';
	import Skeleton from './Skeleton.svelte';

	let { src, alt, width, height }: { src: string; alt: string; width: number; height: number } =
		$props();

	let loaded = $state(false);
	const aspectRatio = `${width}/${height}`;

	onMount(() => {
		defer(() => {
			const img = new Image();
			img.onload = () => (loaded = true);
			img.src = src;
		});
	});
</script>

<div style="aspect-ratio: {aspectRatio}; width: 100%;">
	{#if !loaded}
		<Skeleton width="100%" height="100%" />
	{:else}
		<enhanced:img
			{src}
			{alt}
			sizes="(min-width: 1024px) 800px, (min-width: 768px) 600px, 100vw"
			loading="lazy"
			decoding="async"
			style="aspect-ratio: {aspectRatio};"
		/>
	{/if}
</div>

<style>
	:global(enhanced-img img) {
		width: 100%;
		height: auto;
		display: block;
		opacity: 0;
		animation: fadeIn 0.3s forwards;
	}
	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}
</style>
