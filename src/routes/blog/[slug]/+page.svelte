<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import SEO from '$lib/components/SEO.svelte';
	import WebGLBackground from '$lib/components/WebGLBackground.svelte';

	let { data }: { data: PageData } = $props();
	const { post } = data;

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
	}

	// Placeholder image URL
	const heroImage = `https://placehold.co/800x400/0736fe/white?text=${encodeURIComponent(post.title.split(':')[0])}`;

	onMount(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const gsap = (window as any).gsap;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const ScrollTrigger = (window as any).ScrollTrigger;

		if (!gsap || !ScrollTrigger) return;

		gsap.registerPlugin(ScrollTrigger);

		// Hero title animation
		gsap.from('.post-title', {
			duration: 1.2,
			y: 120,
			opacity: 0,
			ease: 'power3.out',
			delay: 0.2
		});

		gsap.from('.post-meta', {
			duration: 1,
			y: 40,
			opacity: 0,
			ease: 'power3.out',
			delay: 0.5
		});

		gsap.from('.post-hero-image', {
			duration: 1,
			y: 60,
			opacity: 0,
			ease: 'power3.out',
			delay: 0.7
		});

		// Content sections animation
		gsap.from('.prose > *', {
			scrollTrigger: {
				trigger: '.prose',
				start: 'top 80%'
			},
			duration: 0.8,
			y: 40,
			opacity: 0,
			stagger: 0.1,
			ease: 'power3.out'
		});
	});
</script>

<SEO />

<WebGLBackground />

<article class="min-h-screen bg-white dark:bg-gray-950">
	<div class="mx-auto max-w-4xl px-6 py-32 md:px-12">
		<!-- Header -->
		<header class="mb-16">
			<h1 class="post-title mb-6 text-6xl font-bold tracking-tight lowercase md:text-8xl">
				{post.title}
			</h1>
			<div class="post-meta flex items-center gap-3 text-sm text-gray-500 dark:text-gray-500">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<span>·</span>
				<span>cornelius yoga</span>
				<span>·</span>
				<span>{post.readTime} read</span>
			</div>
		</header>

		<!-- Hero Image -->
		<div class="post-hero-image mb-16">
			<img
				src={heroImage}
				alt={post.title}
				class="w-full rounded-lg"
				loading="lazy"
				width="800"
				height="400"
			/>
		</div>

		<!-- Content -->
		<div class="prose prose-lg max-w-none dark:prose-invert">
			<p class="lead">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat.
			</p>

			<h2>the problem</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
				occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
				laborum.
			</p>

			<p>
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
				laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
				architecto beatae vitae dicta sunt explicabo.
			</p>

			<h2>the solution</h2>
			<p>
				Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
				consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
			</p>

			<pre><code class="language-typescript"
					>{`// Example code block
const db = new IndexedDB();
await db.open('czmoney');

const transaction = db.transaction(['transactions'], 'readwrite');
const store = transaction.objectStore('transactions');
await store.add({ amount: 1000, category: 'food' });`}</code
				></pre>

			<p>
				Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
				velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
				quaerat voluptatem.
			</p>

			<h2>the results</h2>
			<p>
				Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
				nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
				voluptate velit esse quam nihil molestiae consequatur.
			</p>

			<ul>
				<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
				<li>Sed do eiusmod tempor incididunt ut labore et dolore</li>
				<li>Ut enim ad minim veniam, quis nostrud exercitation</li>
				<li>Duis aute irure dolor in reprehenderit in voluptate</li>
			</ul>

			<h2>lessons learned</h2>
			<p>
				At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
				voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
				cupiditate non provident.
			</p>

			<p>
				Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
				Et harum quidem rerum facilis est et expedita distinctio.
			</p>
		</div>

		<!-- Back to Blog -->
		<div class="mt-24 border-t border-gray-200 pt-12 dark:border-gray-800">
			<a
				href="/blog"
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
				back to blog
			</a>
		</div>
	</div>
</article>

<style>
	.prose {
		color: rgb(75 85 99);
	}

	.dark .prose {
		color: rgb(156 163 175);
	}

	.prose h2 {
		font-size: 2rem;
		font-weight: 700;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		text-transform: lowercase;
		color: rgb(17 24 39);
	}

	.dark .prose h2 {
		color: rgb(243 244 246);
	}

	.prose p {
		margin-bottom: 1.5rem;
		line-height: 1.75;
	}

	.prose .lead {
		font-size: 1.25rem;
		font-weight: 300;
		margin-bottom: 2rem;
		color: rgb(55 65 81);
	}

	.dark .prose .lead {
		color: rgb(209 213 219);
	}

	.prose pre {
		background: rgb(249 250 251);
		border: 1px solid rgb(229 231 235);
		border-radius: 0.5rem;
		padding: 1.5rem;
		overflow-x: auto;
		margin: 2rem 0;
	}

	.dark .prose pre {
		background: rgb(17 24 39);
		border-color: rgb(55 65 81);
	}

	.prose code {
		font-family: 'Courier New', monospace;
		font-size: 0.875rem;
		line-height: 1.7;
		color: rgb(17 24 39);
	}

	.dark .prose code {
		color: rgb(229 231 235);
	}

	.prose ul {
		list-style: disc;
		padding-left: 1.5rem;
		margin: 1.5rem 0;
	}

	.prose li {
		margin-bottom: 0.5rem;
	}
</style>
