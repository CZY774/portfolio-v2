<script lang="ts">
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
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', handleKeydown);
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
			return () => {
				document.body.style.overflow = '';
				document.removeEventListener('keydown', handleKeydown);
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}
	});
</script>

{#if open}
	<div class="fixed inset-0 z-50 bg-black/95" transition:blur={{ amount: 5 }}>
		<!-- Close button -->
		<div class="absolute top-6 right-6 z-50 rounded-full bg-black/50 p-2">
			<button
				onclick={(e) => {
					e.stopPropagation();
					open = false;
					resetZoom();
				}}
				class="flex h-8 w-8 items-center justify-center text-white transition-opacity hover:opacity-70"
				aria-label="Close modal"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>
		</div>

		<!-- Zoom controls -->
		<div
			class="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-3 py-2"
		>
			<button
				onclick={(e) => {
					e.stopPropagation();
					zoomOut();
				}}
				class="flex h-8 w-8 items-center justify-center text-white transition-opacity hover:opacity-70"
				aria-label="Zoom out"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
				</svg>
			</button>

			<button
				onclick={(e) => {
					e.stopPropagation();
					resetZoom();
				}}
				class="min-w-[50px] px-2 text-sm font-light text-white transition-opacity hover:opacity-70"
				aria-label="Reset zoom"
			>
				{Math.round(scale * 100)}%
			</button>

			<button
				onclick={(e) => {
					e.stopPropagation();
					zoomIn();
				}}
				class="flex h-8 w-8 items-center justify-center text-white transition-opacity hover:opacity-70"
				aria-label="Zoom in"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
					></path>
				</svg>
			</button>
		</div>

		<!-- Image container - click to close -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="flex h-full w-full items-center justify-center p-4"
			role="button"
			tabindex="0"
			onclick={(e) => {
				if (e.target === e.currentTarget) {
					open = false;
					resetZoom();
				}
			}}
		>
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
