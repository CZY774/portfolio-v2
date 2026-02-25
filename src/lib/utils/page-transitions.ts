import { onNavigate } from '$app/navigation';

export function setupPageTransitions() {
	onNavigate((navigation) => {
		// Check if dark mode
		const isDark = document.documentElement.classList.contains('dark');

		// Try View Transitions API only in light mode
		if (document.startViewTransition && !isDark) {
			return new Promise((resolve) => {
				document.startViewTransition(async () => {
					resolve();
					await navigation.complete;
				});
			});
		}

		// Fallback to GSAP (always in dark mode)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const gsap = (window as any).gsap;
		if (!gsap) return;

		return new Promise((resolve) => {
			// Force body background immediately
			const bgColor = isDark ? 'rgb(3, 7, 18)' : 'white';
			document.body.style.backgroundColor = bgColor;
			document.documentElement.style.backgroundColor = bgColor;

			// Animate out
			gsap.to('body', {
				opacity: 0,
				y: -50,
				duration: 0.3,
				ease: 'power2.in',
				onComplete: async () => {
					resolve();
					await navigation.complete;

					// Wait longer for home page assets
					await new Promise((r) => setTimeout(r, 100));

					// Ensure background persists
					document.body.style.backgroundColor = bgColor;
					document.documentElement.style.backgroundColor = bgColor;

					// Animate in
					gsap.fromTo(
						'body',
						{ opacity: 0, y: 50 },
						{ opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
					);
				}
			});
		});
	});
}
