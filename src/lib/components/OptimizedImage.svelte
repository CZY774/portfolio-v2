<script lang="ts">
	import { onMount } from 'svelte';
	import { defer } from '$lib/utils/defer';
	import Skeleton from './Skeleton.svelte';

	export let src: string;
	export let alt: string;
	export let width: number;
	export let height: number;

	let loaded = false;
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
		<img
			{src}
			{alt}
			{width}
			{height}
			loading="lazy"
			decoding="async"
			style="aspect-ratio: {aspectRatio};"
		/>
	{/if}
</div>

<style>
	img {
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
