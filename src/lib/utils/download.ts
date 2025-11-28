export const chunkedFetch = async (url: string, chunkSize = 1024 * 1024) => {
	const response = await fetch(url, { method: 'HEAD' });
	const size = parseInt(response.headers.get('content-length') || '0');
	const chunks = Math.ceil(size / chunkSize);

	const promises = Array.from({ length: chunks }, (_, i) => {
		const start = i * chunkSize;
		const end = Math.min(start + chunkSize - 1, size - 1);
		return fetch(url, { headers: { Range: `bytes=${start}-${end}` } }).then((r) => r.arrayBuffer());
	});

	const buffers = await Promise.all(promises);
	return new Blob(buffers);
};

export const parallelLoad = async (urls: string[]) => {
	return Promise.all(urls.map((url) => fetch(url).then((r) => r.blob())));
};
