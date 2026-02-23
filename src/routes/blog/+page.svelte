<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllPosts } from '$lib/data/blog';
	import SEO from '$lib/components/SEO.svelte';
	import WebGLBackground from '$lib/components/WebGLBackground.svelte';

	const posts = getAllPosts();

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
	}

	onMount(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const gsap = (window as any).gsap;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const ScrollTrigger = (window as any).ScrollTrigger;

		if (!gsap || !ScrollTrigger) return;

		gsap.registerPlugin(ScrollTrigger);

		// Hero title animation
		gsap.from('.blog-title', {
			duration: 1.2,
			y: 120,
			opacity: 0,
			ease: 'power3.out',
			delay: 0.2
		});

		gsap.from('.blog-subtitle', {
			duration: 1,
			y: 40,
			opacity: 0,
			ease: 'power3.out',
			delay: 0.5
		});

		// Post items animation
		gsap.from('.blog-post', {
			scrollTrigger: {
				trigger: '.blog-posts',
				start: 'top 80%'
			},
			duration: 0.8,
			y: 60,
			opacity: 0,
			stagger: 0.2,
			ease: 'power3.out'
		});
	});
</script>

<SEO />

<WebGLBackground />

<div class="min-h-screen bg-white dark:bg-gray-950">
	<div class="mx-auto max-w-5xl px-6 py-32 md:px-12">
		<!-- Header -->
		<div class="mb-24">
			<h1 class="blog-title mb-6 text-7xl font-bold tracking-tight lowercase md:text-9xl">blog</h1>
			<p class="blog-subtitle text-2xl font-light text-gray-600 lowercase dark:text-gray-400">
				thoughts on code, design, and building things that matter.
			</p>
		</div>

		<!-- Posts List -->
		<div class="blog-posts space-y-16">
			{#each posts as post (post.slug)}
				<article class="blog-post group border-t border-gray-200 pt-12 dark:border-gray-800">
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
