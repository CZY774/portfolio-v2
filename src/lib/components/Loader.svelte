<script lang="ts">
	let { isLoading = $bindable(false) } = $props();
</script>

{#if isLoading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950">
		<div class="text-center">
			<div class="mb-12">
				<div class="mb-4 text-6xl font-light">
					<span class="animate-fade-in-up inline-block" style="animation-delay: 0.2s;">c</span>
					<span class="animate-fade-in-up inline-block" style="animation-delay: 0.4s;">z</span>
					<span class="animate-fade-in-up inline-block" style="animation-delay: 0.6s;">y</span>
				</div>
				<div class="mx-auto h-0.5 w-32 overflow-hidden bg-gray-200 dark:bg-gray-800">
					<div class="animate-loading-bar h-full bg-[#0736fe]"></div>
				</div>
			</div>
			<p
				class="animate-fade-in text-lg font-light tracking-wider opacity-0"
				style="animation-delay: 1s;"
			>
				loading portfolio
			</p>
		</div>
	</div>
{/if}

<style>
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

	@keyframes loading-bar {
		0% {
			width: 0%;
		}
		50% {
			width: 70%;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
		opacity: 0;
	}

	.animate-loading-bar {
		animation: loading-bar 2.5s ease-in-out forwards;
		width: 0%;
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out forwards;
		opacity: 0;
	}
</style>
