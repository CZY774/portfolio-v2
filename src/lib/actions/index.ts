import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
	const handleClick = (e: MouseEvent) => {
		if (!node.contains(e.target as Node)) callback?.();
	};
	document.addEventListener('click', handleClick, true);
	return { destroy: () => document.removeEventListener('click', handleClick, true) };
};

export const lazyLoad: Action<HTMLImageElement> = (node) => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target as HTMLImageElement;
					img.src = img.dataset.src || '';
					observer.unobserve(img);
				}
			});
		},
		{ rootMargin: '50px' }
	);
	observer.observe(node);
	return { destroy: () => observer.disconnect() };
};

export const viewport: Action<HTMLElement, () => void> = (node, callback) => {
	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) callback?.();
		},
		{ threshold: 0.1 }
	);
	observer.observe(node);
	return { destroy: () => observer.disconnect() };
};
