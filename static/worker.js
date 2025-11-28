self.onmessage = (e) => {
	const { type, data } = e.data;
	
	switch (type) {
		case 'compress':
			self.postMessage({ type: 'compressed', data: compress(data) });
			break;
		case 'process':
			self.postMessage({ type: 'processed', data: process(data) });
			break;
	}
};

const compress = (data) => data;
const process = (data) => data;
