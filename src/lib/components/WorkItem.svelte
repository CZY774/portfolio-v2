<script lang="ts">
	import type { WorkItem } from '$lib/data/portfolio';

	let { work, index, openModal } = $props<{
		work: WorkItem;
		index: number;
		openModal: (content: WorkItem, type: 'image' | 'video') => void;
	}>();
</script>

<div
	class="work-item group {index % 2 === 0
		? 'md:flex-row'
		: 'md:flex-row-reverse'} flex flex-col items-center gap-16 md:flex"
>
	<div class="w-full md:w-1/2">
		<div
			class="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-gradient-to-br from-[#0736fe]/20 to-[#0736fe]/40 transition-all duration-700 hover:from-[#0736fe]/10 hover:to-[#0736fe]/20"
		>
			<div
				class="absolute inset-0 flex items-center justify-center bg-[#0736fe]/60 transition-all duration-700 group-hover:bg-[#0736fe]/20"
			>
				<span
					class="text-8xl font-light text-white/40 transition-all duration-700 group-hover:text-white/20"
				>
					{String(index + 1).padStart(2, '0')}
				</span>
			</div>

			{#if work.image}
				<img
					src={work.image}
					alt="{work.title} - Cornelius Yoga Web Developer Kudus"
					class="h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
					loading="lazy"
					onerror={(e) => {
						const target = e.target as HTMLImageElement;
						target.src =
							'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzA3MzZmZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
					}}
				/>
			{/if}
		</div>
	</div>

	<div class="w-full space-y-6 md:w-1/2 {index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}">
		<div class="space-y-2">
			<span class="text-sm font-medium tracking-wider text-[#0736fe]">{work.type}</span>
			<h3
				class="text-4xl leading-tight font-light transition-colors duration-300 hover:text-[#0736fe]"
			>
				{work.title}
			</h3>
		</div>

		<p class="text-xl leading-relaxed text-gray-600 dark:text-gray-400">{work.desc}</p>

		<div class="pt-4">
			{#if work.type === 'app' && work.link}
				<a
					href={work.link}
					target="_blank"
					rel="noopener noreferrer"
					class="group inline-flex items-center space-x-2 text-[#0736fe] hover:underline"
				>
					<span class="text-lg">view project</span>
					<svg
						class="h-5 w-5 transition-transform group-hover:translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						></path>
					</svg>
				</a>
			{:else if work.type === 'photo'}
				<button
					onclick={() => openModal(work, 'image')}
					class="group inline-flex items-center space-x-2 text-[#0736fe] hover:underline"
				>
					<span class="text-lg">look closer</span>
					<svg
						class="h-5 w-5 transition-transform group-hover:scale-110"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</button>
			{:else if work.type === 'video' && work.url}
				<button
					onclick={() => openModal(work, 'video')}
					class="group inline-flex items-center space-x-2 text-[#0736fe] hover:underline"
				>
					<span class="text-lg">play video</span>
					<svg
						class="h-5 w-5 transition-transform group-hover:scale-110"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.work-item {
		transition:
			transform 0.3s ease,
			filter 0.3s ease;
	}

	.work-item:hover {
		transform: translateY(-5px);
		filter: brightness(1.05);
	}
</style>
