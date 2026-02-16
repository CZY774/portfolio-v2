<script lang="ts">
	import { works, type Works, type WorkItem as WorkItemType } from '$lib/data/portfolio';
	import WorkItem from '$lib/components/WorkItem.svelte';

	let { openModal } = $props<{
		openModal: (content: WorkItemType, type: 'image' | 'video') => void;
	}>();

	let currentFilter = $state('all');

	let filteredWorks = $derived.by(() => {
		if (currentFilter === 'all') {
			return [...works.apps, ...works.photo, ...works.videos];
		}
		return works[currentFilter as keyof Works] || [];
	});
</script>

<section id="work" class="section relative z-10 px-8 py-32">
	<div class="container mx-auto max-w-7xl">
		<h2 class="animate-in mb-24 text-6xl font-light md:text-8xl">selected work</h2>

		<div class="animate-in mb-16 flex flex-wrap gap-4">
			{#each ['all', 'apps', 'photo', 'videos'] as filter (filter)}
				<button
					onclick={() => (currentFilter = filter)}
					class="custom-button border border-current px-6 py-2 transition-all {currentFilter ===
					filter
						? 'border-[#0736fe] bg-[#0736fe] dark:text-white'
						: 'hover:border-[#0736fe] hover:text-[#0736fe]'}"
				>
					{filter}
				</button>
			{/each}
		</div>

		<div class="animate-in space-y-24">
			{#each filteredWorks as work, index (work.title)}
				<WorkItem {work} {index} {openModal} />
			{/each}
		</div>
	</div>
</section>
