<script lang="ts">
	import { clickOutside } from '$lib/actions';
	import { blur } from '$lib/transitions';

	let { open = $bindable(false), src = '', alt = '' } = $props();

	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);
	let isDragging = $state(false);
	let startX = $state(0);
	let startY = $state(0);

	function zoomIn() {
		scale = Math.min(scale + 0.25, 3);
	}

	function zoomOut() {
		scale = Math.max(scale - 0.25, 0.5);
	}

	function resetZoom() {
		scale = 1;
		translateX = 0;
		translateY = 0;
	}

	function handleMouseDown(e: MouseEvent) {
		if (scale > 1) {
			isDragging = true;
			startX = e.clientX - translateX;
			startY = e.clientY - translateY;
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (isDragging) {
			translateX = e.clientX - startX;
			translateY = e.clientY - startY;
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') {
			open = false;
			resetZoom();
		} else if (e.key === '+' || e.key === '=') {
			zoomIn();
		} else if (e.key === '-') {
			zoomOut();
		} else if (e.key === '0') {
			resetZoom();
		}
	}

	$effect(() => {
		if (open) {
			// Prevent body scroll when modal is open
			document.body.style.overflow = 'hidden';

			document.addEventListener('keydown', handleKeydown);
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
			return () => {
				// Restore body scroll when modal closes
				document.body.style.overflow = '';

				document.removeEventListener('keydown', handleKeydown);
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
		transition:blur={{ amount: 5 }}
		use:clickOutside={() => {
			open = false;
			resetZoom();
		}}
	>
		<!-- Close button -->
		<button
			onclick={() => {
				open = false;
				resetZoom();
			}}
			class="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/10"
			aria-label="Close modal"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				></path>
			</svg>
		</button>

		<!-- Zoom controls -->
		<div
			class="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/5 p-1 backdrop-blur-md"
		>
			<button
				onclick={zoomOut}
				class="flex h-10 w-10 items-center justify-center rounded-full text-white transition-all hover:bg-white/10"
				aria-label="Zoom out"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
				</svg>
			</button>

			<button
				onclick={resetZoom}
				class="min-w-[60px] rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
				aria-label="Reset zoom"
			>
				{Math.round(scale * 100)}%
			</button>

			<button
				onclick={zoomIn}
				class="flex h-10 w-10 items-center justify-center rounded-full text-white transition-all hover:bg-white/10"
				aria-label="Zoom in"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
					></path>
				</svg>
			</button>
		</div>

		<!-- Image container -->
		<div class="flex h-full w-full items-center justify-center p-4">
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<img
				{src}
				{alt}
				class="max-h-[85vh] max-w-full object-contain select-none"
				style="transform: translate({translateX}px, {translateY}px) scale({scale}); cursor: {scale >
				1
					? isDragging
						? 'grabbing'
						: 'grab'
					: 'zoom-in'}; transition: {isDragging ? 'none' : 'transform 0.2s ease-out'};"
				onmousedown={handleMouseDown}
				draggable="false"
			/>
		</div>
	</div>
{/if}
