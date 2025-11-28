<script lang="ts">
	import { clickOutside } from '$lib/actions';
	import { slideScale } from '$lib/transitions';

	let { open = $bindable(false), children } = $props();
</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" transition:slideScale>
		<div class="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-2xl w-full" use:clickOutside={() => open = false}>
			{@render children?.()}
		</div>
	</div>
{/if}
