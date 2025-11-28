import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export const slideScale = (
	node: Element,
	{ duration = 300, delay = 0 } = {}
): TransitionConfig => ({
	duration,
	delay,
	css: (t) => {
		const eased = cubicOut(t);
		return `transform: scale(${eased}) translateY(${(1 - eased) * 20}px); opacity: ${eased};`;
	}
});

export const blur = (node: Element, { duration = 300, amount = 5 } = {}): TransitionConfig => ({
	duration,
	css: (t) => `filter: blur(${(1 - t) * amount}px); opacity: ${t};`
});
