export const debounce = <T extends (...args: never[]) => unknown>(fn: T, ms: number) => {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), ms);
	};
};

export const throttle = <T extends (...args: never[]) => unknown>(fn: T, ms: number) => {
	let inThrottle = false;
	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			fn(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), ms);
		}
	};
};

export class RAFThrottle {
	private lastTime = 0;
	private frameTime: number;
	private rafId: number | null = null;

	constructor(targetFPS = 60) {
		this.frameTime = 1000 / targetFPS;
	}

	run(callback: (delta: number) => void) {
		const animate = (currentTime: number) => {
			this.rafId = requestAnimationFrame(animate);
			const delta = currentTime - this.lastTime;
			if (delta < this.frameTime) return;
			this.lastTime = currentTime - (delta % this.frameTime);
			callback(delta);
		};
		this.rafId = requestAnimationFrame(animate);
	}

	stop() {
		if (this.rafId) cancelAnimationFrame(this.rafId);
	}
}

export const measureTTI = () => {
	if ('PerformanceObserver' in window) {
		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.entryType === 'measure' && entry.name === 'tti') {
					console.log('TTI:', entry.duration);
				}
			}
		});
		observer.observe({ entryTypes: ['measure'] });
	}
};
