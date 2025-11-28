export const compressText = async (text: string): Promise<Blob> => {
	const stream = new Blob([text]).stream();
	const compressed = stream.pipeThrough(new CompressionStream('gzip'));
	return new Response(compressed).blob();
};

export const decompressText = async (blob: Blob): Promise<string> => {
	const stream = blob.stream();
	const decompressed = stream.pipeThrough(new DecompressionStream('gzip'));
	return new Response(decompressed).text();
};
