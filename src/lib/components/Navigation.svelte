<script lang="ts">
	import { scrollToSection } from '$lib/utils/animations';

	let { mobileMenuOpen = $bindable(false) } = $props();

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function navigate(section: string) {
		scrollToSection(section);
		mobileMenuOpen = false;
	}
</script>

<nav class="fixed top-0 right-0 left-0 z-40 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90">
	<div class="container mx-auto px-8 py-6">
		<div class="flex items-center justify-between">
			<button
				onclick={() => navigate('landing')}
				class="text-lg font-medium transition-colors hover:text-[#0736fe]"
			>
				czy
			</button>

			<div class="hidden space-x-8 md:flex">
				<button onclick={() => navigate('about')} class="transition-colors hover:text-[#0736fe]"
					>about</button
				>
				<button onclick={() => navigate('work')} class="transition-colors hover:text-[#0736fe]"
					>work</button
				>
			</div>

			<button
				onclick={toggleMobileMenu}
				class="relative z-50 p-2 md:hidden"
				aria-label="Toggle menu"
			>
				<div class="hamburger {mobileMenuOpen ? 'active' : ''}">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div
			class="mobile-menu fixed top-0 left-0 flex h-screen w-full items-center justify-center bg-white/95 backdrop-blur-md dark:bg-gray-950/95"
		>
			<div class="space-y-8 text-center">
				<button
					onclick={() => navigate('landing')}
					class="block transform text-4xl font-light transition-colors hover:scale-105 hover:text-[#0736fe]"
					>home</button
				>
				<button
					onclick={() => navigate('about')}
					class="block transform text-4xl font-light transition-colors hover:scale-105 hover:text-[#0736fe]"
					>about</button
				>
				<button
					onclick={() => navigate('work')}
					class="block transform text-4xl font-light transition-colors hover:scale-105 hover:text-[#0736fe]"
					>work</button
				>
			</div>
		</div>
	{/if}
</nav>

<style>
	.hamburger {
		width: 24px;
		height: 20px;
		position: relative;
		transform: rotate(0deg);
		transition: 0.3s ease-in-out;
		cursor: pointer;
	}

	.hamburger span {
		display: block;
		position: absolute;
		height: 2px;
		width: 100%;
		background: currentColor;
		border-radius: 1px;
		opacity: 1;
		left: 0;
		transform: rotate(0deg);
		transition: 0.3s ease-in-out;
	}

	.hamburger span:nth-child(1) {
		top: 0px;
	}

	.hamburger span:nth-child(2) {
		top: 9px;
	}

	.hamburger span:nth-child(3) {
		top: 18px;
	}

	.hamburger.active span:nth-child(1) {
		top: 9px;
		transform: rotate(135deg);
	}

	.hamburger.active span:nth-child(2) {
		opacity: 0;
		left: -60px;
	}

	.hamburger.active span:nth-child(3) {
		top: 9px;
		transform: rotate(-135deg);
	}

	.mobile-menu {
		animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(-10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@media (max-width: 640px) {
		.hamburger {
			width: 20px;
			height: 16px;
		}

		.hamburger span {
			height: 2px;
		}

		.hamburger span:nth-child(2) {
			top: 7px;
		}

		.hamburger span:nth-child(3) {
			top: 14px;
		}

		.hamburger.active span:nth-child(1) {
			top: 7px;
		}

		.hamburger.active span:nth-child(3) {
			top: 7px;
		}
	}
</style>
