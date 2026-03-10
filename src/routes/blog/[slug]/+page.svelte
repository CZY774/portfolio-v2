<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { initThreeJS } from '$lib/utils/threejs';
	import { RAFThrottle } from '$lib/utils/perf';
	import SEO from '$lib/components/SEO.svelte';
	import WebGLBackground from '$lib/components/WebGLBackground.svelte';
	import ImageModal from '$lib/components/ImageModal.svelte';

	let { data }: { data: PageData } = $props();
	const { post } = data;
	let canvas = $state<HTMLCanvasElement>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let scene: any, camera: any, renderer: any, particles: any;
	let mouse = $state({ x: 0, y: 0 });

	let modalOpen = $state(false);
	let modalSrc = $state('');
	let modalAlt = $state('');

	function openImageModal(src: string, alt: string) {
		modalSrc = src;
		modalAlt = alt;
		modalOpen = true;
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
	}

	// Placeholder image URL - dynamic based on post slug
	const heroImage =
		post.slug === 'building-czmoney-offline-first'
			? `https://placehold.co/1200x600/0736fe/white?text=CZMoney`
			: post.slug === 'why-sveltekit-my-go-to'
				? `https://placehold.co/1200x600/0736fe/white?text=SvelteKit`
				: `https://placehold.co/1200x600/0736fe/white?text=TanyaBuah+ML`;

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

		// Three.js initialization
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!prefersReducedMotion) {
			requestIdleCallback(
				() => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const THREE = (window as any).THREE;
					if (THREE && canvas) {
						try {
							const threeScene = initThreeJS(canvas, THREE);
							if (threeScene) {
								scene = threeScene.scene;
								camera = threeScene.camera;
								renderer = threeScene.renderer;
								particles = threeScene.particles;
								animate();
							}
						} catch {
							console.warn('WebGL not supported');
						}
					}
				},
				{ timeout: 2000 }
			);
		}
	});

	let rafThrottle: { run: (callback: (delta: number) => void) => void; stop: () => void } | null =
		null;

	function animate() {
		if (!particles || !renderer || !scene || !camera) return;

		if (!rafThrottle) {
			rafThrottle = new RAFThrottle(60);
			rafThrottle.run(() => {
				if (!particles || !renderer || !scene || !camera) return;
				particles.rotation.x += 0.0003 + mouse.y * 0.0001;
				particles.rotation.y += 0.0005 + mouse.x * 0.0001;
				const scale = 1 + (mouse.x * 0.02 + mouse.y * 0.02) * 0.1;
				particles.scale.set(scale, scale, scale);
				renderer.render(scene, camera);
			});
		}
	}
</script>

<SEO />

<WebGLBackground bind:canvas />

<article class="min-h-screen bg-white dark:bg-gray-950">
	<div class="mx-auto max-w-4xl px-6 py-32 md:px-12">
		<!-- Back to Blog (Top) -->
		<a
			href="/blog"
			class="mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#0736fe] dark:text-gray-500"
		>
			<svg
				class="h-4 w-4"
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
				width="1200"
				height="600"
			/>
		</div>

		<!-- Content -->
		{#if post.slug === 'building-czmoney-offline-first'}
			<div class="prose prose-lg max-w-none">
				<p class="lead">
					back in my first year of college, i started tracking every rupiah i spent in google
					sheets. simple, accessible, cross-platform—it worked. until it didn't.
				</p>

				<h2>the spreadsheet struggle</h2>
				<p>
					the setup was straightforward: one column for the month, rows for income, more rows for
					expenses, and a total at the bottom. worked great for january through march. but by
					december? i was scrolling endlessly, hunting for the right cell, losing track of where i
					was.
				</p>

				<p>
					i tried a horizontal layout—six months across, then six more below. better, but not by
					much. june and december still meant awkward scrolling and squinting at tiny cells on my
					phone. the breaking point came mid-month when i checked my balance and realized i was
					almost broke. again. the spreadsheet wasn't helping me stay aware; it was just recording
					my mistakes.
				</p>

				<p>
					that's when the idea hit: why not build an app? i had the time, the curiosity, and a real
					problem to solve. czmoney was born from that frustration.
				</p>

				<h2>starting simple, thinking big</h2>
				<p>
					the first version was bare-bones: authentication, basic crud operations, and a pwa setup
					so it could work offline. nothing fancy. but as i used it daily, i kept noticing friction
					points. syncing across devices was clunky. i wanted insights, not just data. i needed it
					to work seamlessly whether i had internet or not.
				</p>

				<p>
					so i kept iterating. over 600+ commits, czmoney evolved from a simple tracker into a
					full-stack progressive web app with features i genuinely needed:
				</p>

				<ul>
					<li>
						<strong>offline-first architecture</strong> with indexeddb—transactions save locally first,
						sync when online
					</li>
					<li>
						<strong>ai-powered insights</strong> using google gemini 2.5 flash—monthly summaries, spending
						patterns, budget alerts
					</li>
					<li>
						<strong>real-time sync</strong> via supabase realtime—changes reflect instantly across devices
					</li>
					<li>
						<strong>smart categorization</strong>—auto-categorizes expenses based on description
						patterns
					</li>
					<li>
						<strong>comprehensive security</strong>—rate limiting with upstash redis, input
						validation, xss protection
					</li>
				</ul>

				<h2>system architecture</h2>
				<p>
					the architecture follows a layered approach with clear separation between client state,
					application logic, and external services. the client layer handles ui rendering and
					offline persistence, while the application layer manages synchronization and real-time
					updates. api routes provide a security boundary with authentication and rate limiting
					before reaching external services.
				</p>

				<div class="my-12 overflow-x-auto">
					<button
						onclick={() =>
							openImageModal('/diagrams/czmoney-architecture.svg', 'CZMoney System Architecture')}
						class="group mx-auto block cursor-zoom-in transition-all hover:scale-[1.01]"
					>
						<img
							src="/diagrams/czmoney-architecture.svg"
							alt="CZMoney System Architecture"
							class="mx-auto h-auto w-full rounded-lg bg-white p-8 shadow-lg transition-shadow group-hover:shadow-xl dark:border dark:border-gray-800"
						/>
					</button>
				</div>

				<h2>offline-first data flow</h2>
				<p>
					when users create transactions offline, the system immediately saves to indexeddb and
					updates the ui optimistically. once connectivity returns, the sync service processes the
					queue with idempotency guarantees to prevent duplicates. supabase realtime broadcasts
					changes across all connected clients, ensuring consistency without manual refreshes.
				</p>

				<div class="my-12 overflow-x-auto">
					<button
						onclick={() =>
							openImageModal('/diagrams/czmoney-dataflow.svg', 'CZMoney Offline-First Data Flow')}
						class="group mx-auto block cursor-zoom-in transition-all hover:scale-[1.01]"
					>
						<img
							src="/diagrams/czmoney-dataflow.svg"
							alt="CZMoney Offline-First Data Flow"
							class="mx-auto h-auto w-full rounded-lg bg-white p-8 shadow-lg transition-shadow group-hover:shadow-xl dark:border dark:border-gray-800"
						/>
					</button>
				</div>

				<h2>the technical journey</h2>
				<p>
					building czmoney taught me more than any tutorial ever could. here are the key challenges
					i tackled:
				</p>

				<h3>1. offline-first is harder than it sounds</h3>
				<p>
					making an app work offline isn't just about caching. it's about handling conflicts,
					managing sync queues, and ensuring data consistency. i implemented an optimistic ui
					pattern where changes appear instantly, then sync in the background. if something fails,
					it rolls back gracefully.
				</p>

				<pre><code class="language-typescript"
						>{`// Simplified sync queue logic
const syncQueue = {
  pending: [],
  async process() {
    while (this.pending.length > 0) {
      const transaction = this.pending[0];
      try {
        await api.sync(transaction);
        this.pending.shift(); // Remove on success
      } catch (error) {
        if (error.status === 409) {
          // Handle conflict
          await this.resolveConflict(transaction);
        } else {
          break; // Retry later
        }
      }
    }
  }
};`}</code
					></pre>

				<h3>2. ai integration without breaking the bank</h3>
				<p>
					i wanted ai-powered insights, but as a student, budget was tight. then i discovered
					google's student program—free gemini 2.5 flash for a year. perfect timing. the api was
					fast, the streaming responses made the ux feel snappy, and i didn't have to worry about
					costs piling up. i added rate limiting (3 requests per minute for ai endpoints) to keep
					things reasonable, but honestly, the free tier was more than enough for my needs.
				</p>

				<h3>3. security from day one</h3>
				<p>
					as a student project, it's tempting to skip security. but i wanted this to be
					production-ready. i implemented:
				</p>

				<ul>
					<li>multi-tier rate limiting (10 req/10s standard, 3 req/min for ai)</li>
					<li>comprehensive input validation with zod schemas</li>
					<li>xss protection using dompurify</li>
					<li>row-level security in supabase</li>
					<li>csrf protection and secure headers</li>
				</ul>

				<h3>4. performance obsession</h3>
				<p>
					i didn't want czmoney to feel like a "student project." so i focused on perceived
					performance:
				</p>

				<ul>
					<li>skeleton loaders instead of spinners</li>
					<li>debounced search (300ms delay)</li>
					<li>lazy-loaded components</li>
					<li>prefetch navigation on hover</li>
					<li>optimistic ui updates</li>
				</ul>

				<p>
					the result? the app feels instant, even on slow connections. users see their changes
					immediately, and syncing happens invisibly in the background.
				</p>

				<h2>lessons learned</h2>

				<h3>start with a real problem</h3>
				<p>
					czmoney wasn't built to pad my resume. it solved my actual problem. that kept me motivated
					through 600+ commits and countless debugging sessions. when you're solving your own pain
					point, you naturally build something useful.
				</p>

				<h3>iterate based on usage</h3>
				<p>
					the best features came from using the app daily. the ai insights? added after manually
					analyzing my spending for the third time. the smart categorization? born from typing
					"makan" for the hundredth time. real usage reveals real needs.
				</p>

				<h3>production-ready means thinking ahead</h3>
				<p>
					i could've skipped rate limiting, proper error handling, and security measures. but
					building it right from the start taught me how production systems actually work. it's the
					difference between a portfolio piece and something you'd actually deploy.
				</p>

				<h3>documentation matters</h3>
				<p>
					i wrote comprehensive readme documentation not just for others, but for future me. six
					months later, i can still understand why i made certain architectural decisions. good docs
					are a gift to your future self.
				</p>

				<h2>the stack</h2>
				<p>here's what powers czmoney:</p>

				<ul>
					<li><strong>frontend:</strong> sveltekit 5, typescript, tailwindcss 4, apexcharts</li>
					<li>
						<strong>backend:</strong> supabase (postgresql), restful api with auth middleware
					</li>
					<li>
						<strong>ai:</strong> google gemini 2.5 flash with streaming responses
					</li>
					<li>
						<strong>caching:</strong> upstash redis for rate limiting
					</li>
					<li>
						<strong>deployment:</strong> vercel with 99.9% uptime
					</li>
					<li>
						<strong>offline:</strong> indexeddb, service workers, background sync
					</li>
				</ul>

				<h2>what's next</h2>
				<p>
					czmoney is live at <a
						href="https://czmoney.vercel.app"
						target="_blank"
						rel="noopener noreferrer">czmoney.vercel.app</a
					>. i use it every day, and it's saved me from more "wait, where did my money go?" moments
					than i can count.
				</p>

				<p>
					but i'm not done. upcoming features include budget forecasting, recurring transaction
					support, and multi-currency handling. the codebase is on
					<a href="https://github.com/CZY774/czmoney" target="_blank" rel="noopener noreferrer"
						>github</a
					>
					if you want to dive deeper.
				</p>

				<h2>final thoughts</h2>
				<p>
					building czmoney taught me that the best projects come from scratching your own itch. it's
					not about using the trendiest tech or building something massive. it's about solving a
					real problem well, iterating based on feedback (even if that feedback is just you using
					it), and caring enough to make it production-ready.
				</p>

				<p>
					from a frustrated spreadsheet user to shipping a full-stack pwa—that's the journey. and
					honestly? i'm just getting started.
				</p>
			</div>
		{:else if post.slug === 'why-sveltekit-my-go-to'}
			<div class="prose prose-lg max-w-none">
				<p class="lead">
					after experimenting with a dozen frameworks during college, i found one that consistently
					delivered the best developer experience. here's why sveltekit became my default choice for
					fullstack development.
				</p>

				<h2>the framework exploration phase</h2>

				<p>
					in my third year of college, i started systematically testing different frameworks and
					stacks. react, vue, svelte, next.js, springboot, express, django, jetpack compose—each
					with their own philosophies and trade-offs. i wasn't looking for the most popular or the
					most hyped. i was looking for what actually made me productive.
				</p>

				<p>
					svelte stood out immediately. not because of its ecosystem—react dominates there. not
					because of its community size—vue has more resources. but because of something more
					fundamental: it removed friction from the development process.
				</p>

				<h2>what makes sveltekit different</h2>

				<p>
					the first thing you notice is the simplicity. no jsx/tsx mixing concerns. no virtual dom
					overhead. no complex state management boilerplate. just clean separation of html, css, and
					javascript with reactive primitives built in.
				</p>

				<pre><code
						>// React approach
const [count, setCount] = useState(0);

function increment() &#123;
  setCount(count + 1);
&#125;

// Svelte approach
let count = $state(0);

function increment() &#123;
  count++;
&#125;</code
					></pre>

				<p>
					this isn't just syntactic sugar. it's a fundamental difference in how you think about
					reactivity. svelte compiles to vanilla javascript, eliminating the runtime overhead of
					virtual dom diffing. the result? smaller bundles and faster runtime performance by
					default.
				</p>

				<h2>fullstack capabilities out of the box</h2>

				<p>
					sveltekit extends this philosophy to fullstack development. file-based routing,
					server-side rendering, api routes, form actions, and load functions—all integrated without
					configuration hell.
				</p>

				<p>
					when i built czmoney, i needed server-side authentication, api endpoints for supabase
					integration, and optimistic ui updates. sveltekit's form actions and load functions made
					this straightforward. no separate backend setup. no api route configuration. just
					+page.server.ts files that handle both data loading and mutations.
				</p>

				<h2>technical advantages in practice</h2>

				<p>here's what matters in production:</p>

				<ul>
					<li>
						<strong>smaller bundle sizes</strong> - no runtime framework overhead. czmoney's initial
						bundle is 40% smaller than equivalent react apps
					</li>
					<li>
						<strong>built-in transitions</strong> - no framer-motion or react-spring needed. native transition
						directives handle 90% of animation needs
					</li>
					<li>
						<strong>scoped styles by default</strong> - no css-in-js libraries. styles are scoped to
						components automatically
					</li>
					<li>
						<strong>typescript integration</strong> - first-class support with automatic type generation
						for load functions and form actions
					</li>
					<li>
						<strong>progressive enhancement</strong> - forms work without javascript. critical for accessibility
						and resilience
					</li>
				</ul>

				<h2>real-world performance impact</h2>

				<p>
					in czmoney, i implemented optimistic ui updates for transaction creation. with sveltekit's
					reactive stores and form actions, the entire flow—client update, server validation,
					database write, rollback on error—took under 100 lines of code.
				</p>

				<p>
					the equivalent implementation in next.js would require react query or swr, custom hooks
					for optimistic updates, and careful state synchronization. sveltekit's stores and
					invalidation system handle this natively.
				</p>

				<h2>the ecosystem trade-off</h2>

				<p>
					yes, svelte's ecosystem is smaller. fewer third-party libraries. fewer stack overflow
					answers. but this hasn't been a limitation in practice.
				</p>

				<p>
					the framework's simplicity means you rarely need external libraries. built-in transitions,
					stores, and context api cover most use cases. when you do need something specific, the
					official documentation and discord community are responsive and helpful.
				</p>

				<p>
					more importantly, a smaller community means less churn. no weekly "you're doing it wrong"
					blog posts. no paradigm shifts every quarter. just stable, well-documented patterns that
					work.
				</p>

				<h2>why it matters for production</h2>

				<p>
					choosing a framework isn't about popularity or job market trends. it's about what lets you
					ship quality software efficiently.
				</p>

				<p>
					sveltekit delivers on this. faster development cycles. smaller bundles. better
					performance. less boilerplate. these aren't abstract benefits—they translate directly to
					better user experience and faster iteration speed.
				</p>

				<p>
					for personal projects and production applications alike, sveltekit has proven to be the
					most pragmatic choice. not because it's trendy, but because it consistently gets out of
					the way and lets me focus on solving actual problems.
				</p>
			</div>
		{:else if post.slug === 'building-tanyabuah-production-ml'}
			<div class="prose prose-lg max-w-none">
				<p class="lead">
					deploying machine learning models to mobile devices requires more than just training
					accuracy. here's how i built an educational android app that detects 21 types of fruit
					with 96% accuracy while running smoothly on mid-range devices.
				</p>

				<h2>the problem space</h2>

				<p>
					during my final year research project, i identified a gap in educational technology for
					elementary students. traditional methods of teaching fruit recognition—picture books and
					flashcards—lacked the interactivity that digital-native children expect. meanwhile, most
					educational apps were either too simple (static images) or too complex (requiring constant
					internet connectivity).
				</p>

				<p>
					the challenge was clear: build a mobile app that could recognize fruit in real-time,
					offline, on devices that elementary schools and parents could actually afford. this meant
					optimizing for constraints that academic papers often ignore—battery life, storage space,
					inference speed, and user experience for 7-year-olds.
				</p>

				<h2>architecture decisions</h2>

				<p>
					the first critical decision was choosing the right model architecture. i evaluated three
					candidates: resnet50, efficientnet-b0, and mobilenetv2. while resnet and efficientnet
					offered higher theoretical accuracy, mobilenetv2 provided the optimal balance for mobile
					deployment.
				</p>

				<p>here's why mobilenetv2 won:</p>

				<ul>
					<li>
						<strong>model size</strong> - 3.5mb after int8 quantization vs. 25mb+ for alternatives
					</li>
					<li>
						<strong>inference speed</strong> - 500ms per frame on mid-range android devices
					</li>
					<li>
						<strong>accuracy trade-off</strong> - 96.28% validation accuracy, only 2-3% lower than heavier
						models
					</li>
					<li>
						<strong>tensorflow lite support</strong> - first-class optimization for mobile deployment
					</li>
					<li>
						<strong>depthwise separable convolutions</strong> - reduced computational overhead without
						sacrificing feature extraction quality
					</li>
				</ul>

				<p>
					for an educational app where response time directly impacts user engagement, the 2-3%
					accuracy trade-off was worth the 5x speed improvement and 7x size reduction.
				</p>

				<h2>system architecture overview</h2>

				<p>
					the complete pipeline from dataset to android deployment involves multiple stages, each
					with specific optimization decisions. the architecture prioritizes mobile constraints at
					every stage—from dataset augmentation strategies to quantization for deployment. each
					decision trades theoretical accuracy for practical usability on resource-constrained
					devices.
				</p>

				<div class="my-12 overflow-x-auto">
					<button
						onclick={() =>
							openImageModal(
								'/diagrams/tanyabuah-pipeline.svg',
								'TanyaBuah ML Pipeline Architecture'
							)}
						class="group mx-auto block cursor-zoom-in transition-all hover:scale-[1.01]"
					>
						<img
							src="/diagrams/tanyabuah-pipeline.svg"
							alt="TanyaBuah ML Pipeline Architecture"
							class="mx-auto h-auto w-full rounded-lg bg-white p-8 shadow-lg transition-shadow group-hover:shadow-xl dark:border dark:border-gray-800"
						/>
					</button>
				</div>

				<p>
					the data pipeline begins with 126k images split 80/20 for training and validation.
					training data flows through imagedatagenerator with rotation, shift, zoom, and brightness
					augmentation, while validation data receives only normalization to [-1, 1] range. both
					streams feed into the mobilenetv2 base model with frozen imagenet weights, followed by
					global average pooling, batch normalization, and two dense layers (512 and 256 neurons)
					with dropout regularization before the final 21-class softmax output.
				</p>

				<p>
					training employs adam optimizer with gradient clipping and multiple callbacks—early
					stopping, learning rate reduction, model checkpointing, and tensorboard logging. after
					initial training converges at 27 epochs, fine-tuning unfreezes the last 30 mobilenetv2
					layers with reduced learning rate for additional refinement. the resulting 14mb keras
					model undergoes int8 quantization using a representative dataset, compressing to 3.5mb
					(75% reduction) while maintaining 96.28% validation accuracy.
				</p>

				<p>
					deployment to android integrates the tflite model with camerax for real-time capture,
					preprocessing (resize + normalize), and inference running at ~500ms per frame. predictions
					exceeding 70% confidence threshold trigger ui display via jetpack compose, completing the
					end-to-end pipeline from raw camera input to educational content delivery.
				</p>

				<h2>dataset engineering</h2>

				<p>
					model performance starts with data quality. i curated a dataset of 126,219 images across
					21 fruit classes—apples, bananas, mangoes, dragon fruit, and 17 others common in
					indonesia.
				</p>

				<p>
					the dataset distribution was intentionally imbalanced to reflect real-world usage. apples
					(22,529 images) and pears (16,623 images) received more samples because they have higher
					visual variance—different colors, sizes, and varieties. meanwhile, durian (1,026 images)
					needed fewer samples due to its distinctive spiky texture that's easy to recognize.
				</p>

				<p>key dataset decisions:</p>

				<ul>
					<li>
						<strong>80/20 train-validation split</strong> - 100,920 training images, 25,299 validation
						images
					</li>
					<li>
						<strong>augmentation strategy</strong> - rotation, brightness adjustment, horizontal flip.
						deliberately avoided vertical flip since fruit orientation matters
					</li>
					<li>
						<strong>preprocessing pipeline</strong> - resize to 224x224, normalize pixels to [-1, 1]
						range
					</li>
					<li>
						<strong>class weighting</strong> - applied inverse frequency weighting to prevent model bias
						toward overrepresented classes
					</li>
				</ul>

				<h2>training and optimization</h2>

				<p>
					training took 27 epochs with early stopping based on validation loss. the model converged
					smoothly—training accuracy increased from 62.93% (epoch 1) to 95.65% (epoch 27), while
					validation accuracy peaked at 96.28% on epoch 26.
				</p>

				<p>
					the minimal gap between training and validation accuracy (95.65% vs 96.28%) indicated good
					generalization without overfitting. top-3 accuracy reached 99.14%, meaning the correct
					fruit appeared in the top 3 predictions 99% of the time—critical for building user
					confidence even when the top prediction isn't perfect.
				</p>

				<p>
					post-training optimization involved int8 quantization, which reduced model size from 14mb
					to 3.5mb (75% reduction) with only 0.3% accuracy loss. this compression was essential for
					app distribution—users won't download a 50mb+ app for a simple educational tool.
				</p>

				<h2>mobile implementation challenges</h2>

				<p>
					deploying the model to android revealed constraints that don't show up in jupyter
					notebooks. the app needed to handle camera permissions, real-time inference, ui
					responsiveness, and battery efficiency simultaneously.
				</p>

				<p>technical implementation stack:</p>

				<ul>
					<li>
						<strong>jetpack compose</strong> - modern declarative ui for building child-friendly interfaces
					</li>
					<li>
						<strong>camerax</strong> - consistent camera api across android versions and manufacturers
					</li>
					<li>
						<strong>tensorflow lite interpreter</strong> - optimized ml runtime for mobile devices
					</li>
					<li>
						<strong>kotlin coroutines</strong> - non-blocking inference to prevent ui freezing
					</li>
				</ul>

				<p>
					the inference pipeline runs on a background thread with 500ms throttling to prevent
					excessive battery drain. when confidence score exceeds 70%, the app displays a modal with
					the fruit name, confidence percentage, and educational content (vitamin content, fun
					facts, health benefits).
				</p>

				<h2>real-world validation</h2>

				<p>
					lab accuracy means nothing if the app fails in actual use. i conducted field testing at
					two retail locations—midifresh alfa tower and aeon mall alam sutera—to validate
					performance under real lighting conditions and fruit variations.
				</p>

				<p>results from 16 fruit types tested:</p>

				<ul>
					<li>
						<strong>perfect detection (100%)</strong> - banana, pear, pineapple, melon, salak. distinctive
						textures and shapes
					</li>
					<li>
						<strong>high confidence (95-99%)</strong> - orange (97%), strawberry (98%), durian (98%),
						tomato (97%)
					</li>
					<li>
						<strong>moderate confidence (78-90%)</strong> - mango (78%), papaya (78%), avocado (80%),
						apple (82%)
					</li>
				</ul>

				<p>
					the lower scores for mango, papaya, and avocado revealed an important limitation: smooth,
					reflective surfaces with similar green-to-orange gradients confused the model. this makes
					sense—even humans struggle to distinguish unripe mango from avocado at a glance.
				</p>

				<p>
					viewpoint sensitivity was another discovery. detection accuracy dropped significantly when
					photographing fruit from the side rather than top-down. this is a known challenge in
					computer vision—viewpoint invariance requires either multi-view training data or 3d
					augmentation techniques.
				</p>

				<h2>designing for children</h2>

				<p>
					technical performance is only half the equation. the app needed to be usable by
					7-year-olds with minimal reading ability and short attention spans.
				</p>

				<p>ux decisions based on child development research:</p>

				<ul>
					<li>
						<strong>single-screen interface</strong> - no complex navigation. camera preview fills the
						entire screen
					</li>
					<li>
						<strong>instant feedback</strong> - detection results appear within 500ms to maintain engagement
					</li>
					<li>
						<strong>large fonts (18sp+)</strong> - readable without squinting on small screens
					</li>
					<li>
						<strong>high contrast colors</strong> - bright, saturated colors that appeal to children
					</li>
					<li>
						<strong>auto-hide modals</strong> - result cards disappear after 3 seconds to prevent confusion
					</li>
					<li>
						<strong>fun facts</strong> - "apples float in water because they contain air!" keeps learning
						playful
					</li>
				</ul>

				<p>
					user acceptance testing with 14 second-grade students at sd kristen 04 eben haezer
					salatiga validated these decisions. 100% found the app enjoyable, 92.8% found it easy to
					use, and 100% said they learned fruit names and benefits. more importantly, observing
					children use the app revealed unexpected behaviors—they got excited when detecting manggis
					(mangosteen) after learning it's called "queen of fruits," and associated pineapple
					texture with spongebob squarepants.
				</p>

				<h2>intellectual property protection</h2>

				<p>
					beyond technical implementation, i registered the app with indonesia's directorate general
					of intellectual property (hki). this wasn't just bureaucratic paperwork—it demonstrated
					understanding that software is intellectual property with commercial potential.
				</p>

				<p>
					the hki registration process required comprehensive documentation: technical architecture,
					source code samples, user manual, and copyright transfer agreements. completing this
					process taught me how to position software as a product, not just a project.
				</p>

				<h2>lessons learned</h2>

				<p>
					building production ml systems for mobile devices requires different thinking than
					academic research or web applications. here's what mattered most:
				</p>

				<ul>
					<li>
						<strong>constraints drive architecture</strong> - mobilenetv2 wasn't the most accurate model,
						but it was the right model for the constraints
					</li>
					<li>
						<strong>quantization is non-negotiable</strong> - 75% size reduction with minimal accuracy
						loss makes deployment feasible
					</li>
					<li>
						<strong>field testing reveals truth</strong> - lab accuracy doesn't predict real-world performance
						under varied lighting and viewpoints
					</li>
					<li>
						<strong>ux matters as much as accuracy</strong> - 96% accuracy means nothing if children
						can't figure out how to use the app
					</li>
					<li>
						<strong>domain knowledge is critical</strong> - understanding child cognitive development
						shaped every design decision
					</li>
				</ul>

				<h2>future improvements</h2>

				<p>
					if i were to iterate on this project, three areas would get priority. first, multi-view
					training with 3d augmentation to handle viewpoint variance. second, implementing
					efficientformer architecture which recent research shows achieves mobilenet-level speed
					with higher accuracy. third, adding voice feedback for pre-readers and gamification
					elements (point systems, achievement badges) to increase long-term engagement.
				</p>

				<p>
					the technical foundation is solid. the model generalizes well, the app runs smoothly, and
					users find it valuable. these improvements would push it from "functional educational
					tool" to "production-ready commercial product."
				</p>

				<h2>why this matters</h2>

				<p>
					this project taught me that building ml systems isn't just about maximizing accuracy
					metrics. it's about understanding constraints, making informed trade-offs, validating with
					real users, and shipping software that actually works in the real world.
				</p>

				<p>
					the gap between "96% validation accuracy" and "children successfully learning fruit names"
					is filled with engineering decisions that academic papers rarely discuss. that's the work
					that matters.
				</p>
			</div>
		{/if}

		<!-- Back to Blog -->
		<div class="mt-24 border-t border-gray-200 pt-12 dark:border-gray-800">
			<a
				href="/blog"
				class="inline-flex items-center gap-2 text-lg text-gray-600 transition-colors hover:text-[#0736fe] dark:text-gray-400"
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

<ImageModal bind:open={modalOpen} src={modalSrc} alt={modalAlt} />

<ImageModal bind:open={modalOpen} src={modalSrc} alt={modalAlt} />

<style>
	.prose {
		color: rgb(107 114 128);
	}

	:global(.dark) .prose {
		color: rgb(209 213 219);
	}

	.prose h2 {
		font-size: 2rem;
		font-weight: 700;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		text-transform: lowercase;
		color: rgb(17 24 39);
		word-break: break-word;
	}

	.prose h3 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 0.75rem;
		text-transform: lowercase;
		color: rgb(17 24 39);
		word-break: break-word;
	}

	:global(.dark) .prose h2,
	:global(.dark) .prose h3 {
		color: rgb(255 255 255) !important;
	}

	.prose p {
		margin-bottom: 1.5rem;
		line-height: 1.75;
		word-break: break-word;
	}

	.prose strong {
		font-weight: 600;
		color: rgb(17 24 39);
	}

	:global(.dark) .prose strong {
		color: rgb(255 255 255);
	}

	.prose .lead {
		font-size: 1.25rem;
		font-weight: 300;
		margin-bottom: 2rem;
		color: rgb(55 65 81);
		word-break: break-word;
	}

	:global(.dark) .prose .lead {
		color: rgb(229 231 235);
	}

	.prose pre {
		background: rgb(249 250 251);
		border: 1px solid rgb(229 231 235);
		border-radius: 0.5rem;
		padding: 1.5rem;
		overflow-x: auto;
		margin: 2rem 0;
	}

	:global(.dark) .prose pre {
		background: rgb(17 24 39);
		border-color: rgb(55 65 81);
	}

	.prose code {
		font-family: 'Courier New', monospace;
		font-size: 0.875rem;
		line-height: 1.7;
		color: rgb(17 24 39);
	}

	:global(.dark) .prose code {
		color: rgb(229 231 235);
	}

	.prose a {
		color: rgb(7 54 254);
		text-decoration: underline;
		transition: color 0.2s;
	}

	.prose a:hover {
		color: rgb(29 78 216);
	}

	:global(.dark) .prose a {
		color: rgb(96 165 250);
	}

	:global(.dark) .prose a:hover {
		color: rgb(147 197 253);
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
