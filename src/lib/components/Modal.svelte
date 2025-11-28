<script lang="ts">
	import { clickOutside } from '$lib/actions';
	import { slideScale } from '$lib/transitions';

	let { open = $bindable(false), children } = $props();
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		transition:slideScale
	>
		<div
			class="w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-gray-900"
			use:clickOutside={() => (open = false)}
		>
			{@render children?.()}
		</div>
	</div>
{/if}
