<script lang="ts">
	import { works, type Works, type WorkItem as WorkItemType } from '$lib/data/portfolio';
	import { track } from '@vercel/analytics';
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

	function handleFilterChange(filter: string) {
		currentFilter = filter;
		track('filter_change', { filter });
	}
</script>

<section id="work" class="section relative z-10 px-8 py-32">
	<div class="container mx-auto max-w-7xl">
		<h2 class="animate-in section-title mb-24">selected work</h2>

		<div class="animate-in mb-16 flex flex-wrap gap-4">
			{#each [{ key: 'all', label: 'all' }, { key: 'apps', label: 'apps' }, { key: 'photo', label: 'personal creative work' }, { key: 'videos', label: 'videos' }] as filter (filter.key)}
				<button
					onclick={() => handleFilterChange(filter.key)}
					class="px-6 py-2 transition-all {currentFilter === filter.key
						? 'border-2 border-[#0736fe]'
						: 'border border-current hover:border-[#0736fe] hover:text-[#0736fe]'}"
					aria-pressed={currentFilter === filter.key}
					aria-label="Filter by {filter.label}"
				>
					{filter.label}
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
