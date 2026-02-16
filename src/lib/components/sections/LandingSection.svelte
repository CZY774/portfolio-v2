<script lang="ts">
	import { scrollToSection } from '$lib/utils/animations';
	import { track } from '@vercel/analytics';
</script>

<section
	id="landing"
	class="section relative z-10 flex min-h-screen items-center justify-center px-8 py-24"
>
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<div>
				<h1 class="hero-title mb-12 text-7xl leading-none font-light md:text-8xl lg:text-9xl">
					<span class="word inline-block">cornelius</span>
					<span class="word inline-block text-[#0736fe]">yoga</span>
				</h1>
				<div class="hero-desc">
					<p class="mb-12 text-2xl leading-relaxed font-light text-gray-600 dark:text-gray-400">
						fullstack developer | 3.92 gpa<br />
						it dev intern at alfamart · kudus, indonesia
					</p>
				</div>
			</div>
			<div class="hero-desc text-right">
				<div class="mb-12">
					<div class="mb-8 flex justify-end space-x-6">
						<a
							href="https://instagram.com/corneliusyoga"
							class="link-hover"
							aria-label="Visit Instagram profile"
							onclick={() => track?.('social_click', { platform: 'instagram' })}>ig</a
						>
						<a
							href="https://github.com/CZY774"
							class="link-hover"
							aria-label="Visit GitHub profile"
							onclick={() => track?.('social_click', { platform: 'github' })}>github</a
						>
						<a
							href="https://www.linkedin.com/in/cornelius-yoga-783b6a291/"
							class="link-hover"
							aria-label="Visit LinkedIn profile"
							onclick={() => track?.('social_click', { platform: 'linkedin' })}>linkedin</a
						>
						<a
							href="https://youtube.com/@CZY774"
							class="link-hover"
							aria-label="Visit YouTube channel"
							onclick={() => track?.('social_click', { platform: 'youtube' })}>yt</a
						>
						<a
							href="/cv.pdf"
							download
							class="link-hover"
							aria-label="Download CV"
							onclick={() => track?.('cv_download')}>cv</a
						>
					</div>
				</div>
				<div class="flex justify-end gap-4">
					<button onclick={() => scrollToSection('work')} class="btn-primary"> view work </button>
				</div>
			</div>
		</div>
	</div>
</section>
