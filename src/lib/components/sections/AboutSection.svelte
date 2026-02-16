<script lang="ts">
	import { techStack, career } from '$lib/data/portfolio';
</script>

<section id="about" class="section relative z-10 px-8 py-32">
	<div class="container mx-auto max-w-7xl">
		<h2 class="animate-in mb-24 text-6xl font-light md:text-8xl">about me</h2>

		<div class="animate-in mb-32 grid grid-cols-1 items-center gap-16 lg:grid-cols-5">
			<div class="lg:col-span-3">
				<p class="text-xl font-light leading-relaxed text-gray-600 dark:text-gray-400">
					I am an Informatics Engineering student with a strong passion for solving real-world
					problems through code, currently maintaining a 3.92 GPA while working as an IT Development
					Intern at Alfamart. My journey isn't just about writing syntax; it's about building
					systems that work.
				</p>
			</div>
			<div class="relative overflow-hidden lg:col-span-2">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white dark:from-gray-950"
				></div>
				<div class="marquee-container">
					<div class="marquee-track">
						{#each techStack as tech (tech + '-1')}
							<i class="{tech} tech-icon"></i>
						{/each}
						{#each techStack as tech (tech + '-2')}
							<i class="{tech} tech-icon"></i>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="animate-in">
			<h3 class="mb-16 text-4xl font-light">career journey</h3>
			<div class="space-y-12">
				{#each career as item (item.institution + item.date)}
					<div
						class="border-b border-gray-200 pb-12 transition-colors duration-300 hover:border-[#0736fe] dark:border-gray-800"
					>
						<div class="mb-4 flex flex-col justify-between md:flex-row md:items-center">
							<h4 class="text-2xl font-medium transition-colors duration-300 hover:text-[#0736fe]">
								{item.institution}
							</h4>
							<span class="text-gray-600 dark:text-gray-400">{item.date}</span>
						</div>
						<p class="mb-4 text-xl text-[#0736fe]">{item.role}</p>
						<p class="text-lg text-gray-600 dark:text-gray-400">{item.achievement}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
