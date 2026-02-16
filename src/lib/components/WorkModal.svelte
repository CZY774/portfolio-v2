<script lang="ts">
	import { onMount } from 'svelte';
	import type { WorkItem } from '$lib/data/portfolio';
	import { sanitizeHTML, sanitizeURL } from '$lib/utils/security';

	let {
		isOpen = $bindable(false),
		content = $bindable<WorkItem | null>(null),
		type = $bindable<'image' | 'video' | null>(null)
	} = $props();

	let modalElement: HTMLDivElement;
	let closeButton: HTMLButtonElement;

	function close() {
		isOpen = false;
		content = null;
		type = null;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			close();
		} else if (e.key === 'Tab' && modalElement) {
			// Focus trap
			const focusableElements = modalElement.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			const firstElement = focusableElements[0] as HTMLElement;
			const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

			if (e.shiftKey && document.activeElement === firstElement) {
				e.preventDefault();
				lastElement?.focus();
			} else if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement?.focus();
			}
		}
	}

	onMount(() => {
		if (isOpen && closeButton) {
			closeButton.focus();
		}
	});
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
		onclick={close}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		onkeydown={handleKeydown}
	>
		<div
			bind:this={modalElement}
			class="relative max-h-full w-full max-w-4xl"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<button
				bind:this={closeButton}
				class="absolute -top-12 right-0 text-2xl text-white transition-colors hover:text-[#0736fe]"
				onclick={close}
				aria-label="Close modal">✕</button
			>
			{#if content}
				{#if type === 'image'}
					<enhanced:img
						src={sanitizeURL(content.image)}
						alt={sanitizeHTML(content.title)}
						class="h-auto max-h-[80vh] w-full object-contain"
						sizes="(min-width: 1024px) 1024px, 100vw"
					/>
				{:else if type === 'video'}
					<iframe
						src={sanitizeURL(content.url)}
						class="aspect-video w-full"
						title={sanitizeHTML(content.title)}
						frameborder="0"
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				{/if}
				<div class="mt-4 text-center text-white">
					<h3 class="text-xl font-medium">{sanitizeHTML(content.title)}</h3>
					<p class="text-gray-300">{sanitizeHTML(content.desc)}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
