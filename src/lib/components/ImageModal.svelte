<script lang="ts">
	import { SvelteMap } from 'svelte/reactivity';
	import { blur } from '$lib/transitions';

	type Point = { x: number; y: number };
	type PointerPoint = Point & { pointerType: string };
	type PanStart = Point & { translateX: number; translateY: number };
	type PinchStart = {
		distance: number;
		scale: number;
		localX: number;
		localY: number;
	};

	const MIN_SCALE = 1;
	const MAX_SCALE = 4;

	let { open = $bindable(false), src = '', alt = '' } = $props();

	let viewportElement = $state<HTMLDivElement>();
	let imageElement = $state<HTMLImageElement>();
	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);
	let isPanning = $state(false);
	let isPinching = $state(false);

	const activePointers = new SvelteMap<number, PointerPoint>();
	let panStart: PanStart | null = null;
	let pinchStart: PinchStart | null = null;

	function clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max);
	}

	function getBounds(nextScale = scale) {
		if (!viewportElement || !imageElement) return { maxX: 0, maxY: 0 };

		const viewportWidth = viewportElement.clientWidth;
		const viewportHeight = viewportElement.clientHeight;
		const imageWidth = imageElement.offsetWidth;
		const imageHeight = imageElement.offsetHeight;

		return {
			maxX: Math.max((imageWidth * nextScale - viewportWidth) / 2, 0),
			maxY: Math.max((imageHeight * nextScale - viewportHeight) / 2, 0)
		};
	}

	function clampTranslate(x: number, y: number, nextScale = scale) {
		const { maxX, maxY } = getBounds(nextScale);
		return {
			x: clamp(x, -maxX, maxX),
			y: clamp(y, -maxY, maxY)
		};
	}

	function resetTransform() {
		scale = 1;
		translateX = 0;
		translateY = 0;
		isPanning = false;
		isPinching = false;
		panStart = null;
		pinchStart = null;
		activePointers.clear();
	}

	function closeModal() {
		open = false;
		resetTransform();
	}

	function getViewportCenter() {
		const rect = viewportElement?.getBoundingClientRect();
		if (!rect) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };

		return {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2
		};
	}

	function applyScale(nextScale: number, focalPoint: Point) {
		const clampedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);

		if (clampedScale <= MIN_SCALE) {
			resetTransform();
			return;
		}

		const viewportCenter = getViewportCenter();
		const localX = (focalPoint.x - viewportCenter.x - translateX) / scale;
		const localY = (focalPoint.y - viewportCenter.y - translateY) / scale;
		const nextTranslateX = focalPoint.x - viewportCenter.x - localX * clampedScale;
		const nextTranslateY = focalPoint.y - viewportCenter.y - localY * clampedScale;
		const clampedTranslate = clampTranslate(nextTranslateX, nextTranslateY, clampedScale);

		scale = clampedScale;
		translateX = clampedTranslate.x;
		translateY = clampedTranslate.y;
	}

	function getDistance(first: PointerPoint, second: PointerPoint) {
		return Math.hypot(second.x - first.x, second.y - first.y);
	}

	function getCenter(first: PointerPoint, second: PointerPoint) {
		return {
			x: (first.x + second.x) / 2,
			y: (first.y + second.y) / 2
		};
	}

	function startPinch() {
		const pointers = [...activePointers.values()];
		if (pointers.length < 2) return;

		const [first, second] = pointers;
		const center = getCenter(first, second);
		const viewportCenter = getViewportCenter();
		const distance = getDistance(first, second);

		pinchStart = {
			distance,
			scale,
			localX: (center.x - viewportCenter.x - translateX) / scale,
			localY: (center.y - viewportCenter.y - translateY) / scale
		};
		panStart = null;
		isPanning = false;
		isPinching = true;
	}

	function updatePinch() {
		const pointers = [...activePointers.values()];
		if (pointers.length < 2 || !pinchStart) return;

		const [first, second] = pointers;
		const center = getCenter(first, second);
		const viewportCenter = getViewportCenter();
		const distance = getDistance(first, second);
		const nextScale = clamp(
			pinchStart.scale * (distance / Math.max(pinchStart.distance, 1)),
			MIN_SCALE,
			MAX_SCALE
		);

		if (nextScale <= MIN_SCALE) {
			resetTransform();
			return;
		}

		const nextTranslateX = center.x - viewportCenter.x - pinchStart.localX * nextScale;
		const nextTranslateY = center.y - viewportCenter.y - pinchStart.localY * nextScale;
		const clampedTranslate = clampTranslate(nextTranslateX, nextTranslateY, nextScale);

		scale = nextScale;
		translateX = clampedTranslate.x;
		translateY = clampedTranslate.y;
	}

	function startPan(point: Point) {
		if (scale <= MIN_SCALE) return;

		panStart = {
			x: point.x,
			y: point.y,
			translateX,
			translateY
		};
		isPanning = true;
	}

	function handlePointerDown(e: PointerEvent) {
		e.preventDefault();
		e.stopPropagation();

		activePointers.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY,
			pointerType: e.pointerType
		});
		imageElement?.setPointerCapture(e.pointerId);

		if (activePointers.size >= 2) {
			startPinch();
			return;
		}

		startPan({ x: e.clientX, y: e.clientY });
	}

	function handlePointerMove(e: PointerEvent) {
		if (!activePointers.has(e.pointerId)) return;

		e.preventDefault();
		activePointers.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY,
			pointerType: e.pointerType
		});

		if (activePointers.size >= 2) {
			if (!pinchStart) startPinch();
			updatePinch();
			return;
		}

		if (!isPanning || !panStart || scale <= MIN_SCALE) return;

		const nextTranslate = clampTranslate(
			panStart.translateX + e.clientX - panStart.x,
			panStart.translateY + e.clientY - panStart.y
		);
		translateX = nextTranslate.x;
		translateY = nextTranslate.y;
	}

	function handlePointerEnd(e: PointerEvent) {
		activePointers.delete(e.pointerId);

		if (imageElement?.hasPointerCapture(e.pointerId)) {
			imageElement.releasePointerCapture(e.pointerId);
		}

		if (activePointers.size >= 2) {
			startPinch();
			return;
		}

		pinchStart = null;
		isPinching = false;

		if (activePointers.size === 1 && scale > MIN_SCALE) {
			const [remainingPointer] = activePointers.values();
			startPan(remainingPointer);
			return;
		}

		panStart = null;
		isPanning = false;
	}

	function handleHoverMove(e: MouseEvent) {
		if (
			scale <= MIN_SCALE ||
			isPanning ||
			isPinching ||
			activePointers.size > 0 ||
			e.buttons !== 0
		) {
			return;
		}

		const rect = viewportElement?.getBoundingClientRect();
		if (!rect) return;

		const { maxX, maxY } = getBounds();
		const pointerX = clamp((e.clientX - rect.left) / rect.width, 0, 1);
		const pointerY = clamp((e.clientY - rect.top) / rect.height, 0, 1);
		translateX = (0.5 - pointerX) * 2 * maxX;
		translateY = (0.5 - pointerY) * 2 * maxY;
	}

	function handleWheel(e: WheelEvent) {
		if (!e.ctrlKey) return;

		e.preventDefault();
		e.stopPropagation();
		const zoomFactor = Math.exp(-e.deltaY * 0.01);
		applyScale(scale * zoomFactor, { x: e.clientX, y: e.clientY });
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') {
			closeModal();
		}
	}

	$effect(() => {
		if (open) {
			const previousOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', handleKeydown);

			return () => {
				document.body.style.overflow = previousOverflow;
				document.removeEventListener('keydown', handleKeydown);
				resetTransform();
			};
		}
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 bg-black/95"
		role="dialog"
		aria-modal="true"
		aria-label={alt || 'Image preview'}
		transition:blur={{ amount: 5 }}
	>
		<div class="absolute top-6 right-6 z-50 rounded-full bg-black/50 p-2">
			<button
				onclick={(e) => {
					e.stopPropagation();
					closeModal();
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

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			bind:this={viewportElement}
			class="flex h-full w-full touch-none items-center justify-center overflow-hidden overscroll-contain p-4"
			onclick={(e) => {
				if (e.target === e.currentTarget) {
					closeModal();
				}
			}}
			onmousemove={handleHoverMove}
			onwheel={handleWheel}
		>
			<img
				bind:this={imageElement}
				{src}
				{alt}
				class="max-h-[85vh] max-w-full touch-none object-contain select-none"
				style="transform: translate3d({translateX}px, {translateY}px, 0) scale({scale}); transition: {isPanning ||
				isPinching
					? 'none'
					: 'transform 0.16s ease-out'}; will-change: transform;"
				onpointerdown={handlePointerDown}
				onpointermove={handlePointerMove}
				onpointerup={handlePointerEnd}
				onpointercancel={handlePointerEnd}
				draggable="false"
			/>
		</div>
	</div>
{/if}
