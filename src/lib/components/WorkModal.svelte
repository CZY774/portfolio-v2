<script lang="ts">
	import type { WorkItem } from '$lib/data/portfolio';

	let {
		isOpen = $bindable(false),
		content = $bindable<WorkItem | null>(null),
		type = $bindable<'image' | 'video' | null>(null)
	} = $props();

	function close() {
		isOpen = false;
		content = null;
		type = null;
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
		onclick={close}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		onkeydown={(e) => {
			if (e.key === 'Escape') close();
		}}
	>
		<div
			class="relative max-h-full w-full max-w-4xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="presentation"
		>
			<button
				class="absolute -top-12 right-0 text-2xl text-white transition-colors hover:text-[#0736fe]"
				onclick={close}
				aria-label="Close modal">✕</button
			>
			{#if content}
				{#if type === 'image'}
					<img
						src={content.image}
						alt={content.title}
						class="h-auto max-h-[80vh] w-full object-contain"
					/>
				{:else if type === 'video'}
					<iframe
						src={content.url}
						class="aspect-video w-full"
						title={content.title}
						frameborder="0"
						allowfullscreen
					></iframe>
				{/if}
				<div class="mt-4 text-center text-white">
					<h3 class="text-xl font-medium">{content.title}</h3>
					<p class="text-gray-300">{content.desc}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
