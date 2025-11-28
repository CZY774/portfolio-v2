<script lang="ts">
	import { fade } from 'svelte/transition';

	let { loading = $bindable(false) } = $props();
</script>

{#if loading}
	<div class="loader" transition:fade={{ duration: 200 }}>
		<div class="spinner"></div>
	</div>
{/if}

<style>
	.loader {
		position: fixed;
		inset: 0;
		display: grid;
		place-items: center;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		z-index: 9999;
	}
	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
