<script lang="ts">
	import { getAllPosts } from '$lib/data/blog';
	import SEO from '$lib/components/SEO.svelte';

	const posts = getAllPosts();

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
	}
</script>

<SEO />

<div class="min-h-screen bg-white dark:bg-gray-950">
	<div class="mx-auto max-w-5xl px-6 py-32 md:px-12">
		<!-- Header -->
		<div class="mb-24">
			<h1 class="mb-6 text-7xl font-bold tracking-tight lowercase md:text-9xl">blog</h1>
			<p class="text-2xl font-light text-gray-600 lowercase dark:text-gray-400">
				thoughts on code, design, and building things that matter.
			</p>
		</div>

		<!-- Posts List -->
		<div class="space-y-16">
			{#each posts as post (post.slug)}
				<article class="group border-t border-gray-200 pt-12 dark:border-gray-800">
					<a href="/blog/{post.slug}" class="block">
						<h2
							class="mb-4 text-4xl font-bold tracking-tight lowercase transition-colors group-hover:text-[#0736fe] md:text-5xl"
						>
							{post.title}
						</h2>
						<div class="mb-6 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-500">
							<time datetime={post.date}>{formatDate(post.date)}</time>
							<span>·</span>
							<span>{post.readTime} read</span>
						</div>
						<p class="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
							{post.description}
						</p>
						<span
							class="inline-flex items-center gap-2 text-[#0736fe] transition-transform group-hover:translate-x-2"
						>
							read more
							<svg
								class="h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								></path>
							</svg>
						</span>
					</a>
				</article>
			{/each}
		</div>

		<!-- Back to Home -->
		<div class="mt-24 border-t border-gray-200 pt-12 dark:border-gray-800">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-[#0736fe] dark:text-gray-400"
			>
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16l-4-4m0 0l4-4m-4 4h18"
					></path>
				</svg>
				back to home
			</a>
		</div>
	</div>
</div>
