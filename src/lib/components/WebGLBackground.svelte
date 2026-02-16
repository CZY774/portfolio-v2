<script lang="ts">
	let { canvas = $bindable<HTMLCanvasElement>() } = $props();
</script>

<canvas bind:this={canvas} class="pointer-events-none fixed inset-0 z-0"></canvas>
