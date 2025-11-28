export const createWorker = (path: string) => {
	if (typeof Worker === 'undefined') return null;
	const worker = new Worker(path);
	return {
		post: (type: string, data: any) => worker.postMessage({ type, data }),
		on: (callback: (e: MessageEvent) => void) => (worker.onmessage = callback),
		terminate: () => worker.terminate()
	};
};
