export const defer = (fn: () => void) => {
	if ('requestIdleCallback' in window) {
		requestIdleCallback(fn);
	} else {
		setTimeout(fn, 1);
	}
};

export const deferHeavy = (fn: () => void) => {
	defer(() => {
		if (navigator.hardwareConcurrency > 2) {
			fn();
		} else {
			setTimeout(fn, 100);
		}
	});
};
