import { onNavigate } from '$app/navigation';
import { browser } from '$app/environment';

export function setupPageTransitions() {
	if (!browser) return;

	onNavigate((navigation) => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		// Check if dark mode
		const isDark = document.documentElement.classList.contains('dark');
		const bgColor = isDark ? 'rgb(3, 7, 18)' : 'white';

		document.documentElement.style.backgroundColor = bgColor;
		document.body.style.backgroundColor = bgColor;

		// Prefer the native View Transitions API when available.
		if (document.startViewTransition) {
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
