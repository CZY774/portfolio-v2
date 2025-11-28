export const loadPriority = {
	eager: (src: string) => {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'image';
		link.href = src;
		document.head.appendChild(link);
	},
	lazy: (src: string, callback: (url: string) => void) => {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(() => callback(src));
		} else {
			setTimeout(() => callback(src), 1);
		}
	}
};

export const routePriority = {
	high: ['/', '/about'],
	medium: ['/work', '/contact'],
	low: ['/blog']
};
