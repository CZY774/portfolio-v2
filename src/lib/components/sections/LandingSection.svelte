<script lang="ts">
	import { scrollToSection } from '$lib/utils/animations';
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
						a fourth-year informatics engineering student<br />
						based in kudus, indonesia
					</p>
				</div>
			</div>
			<div class="hero-desc text-right">
				<div class="mb-12">
					<div class="mb-8 flex justify-end space-x-6">
						<a
							href="https://instagram.com/corneliusyoga"
							class="transition-colors hover:text-[#0736fe]">ig</a
						>
						<a href="https://github.com/CZY774" class="transition-colors hover:text-[#0736fe]"
							>github</a
						>
						<a
							href="https://www.linkedin.com/in/cornelius-yoga-783b6a291/"
							class="transition-colors hover:text-[#0736fe]">linkedin</a
						>
						<a href="https://youtube.com/@CZY774" class="transition-colors hover:text-[#0736fe]"
							>youtube</a
						>
					</div>
				</div>
				<div class="flex justify-end">
					<button
						onclick={() => scrollToSection('work')}
						class="custom-button border border-current px-8 py-3 transition-all hover:border-[#0736fe] hover:bg-[#0736fe] hover:text-[#0736fe]"
					>
						view work
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
