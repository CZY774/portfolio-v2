export const createLowResPreview = (src: string) => {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const img = new Image();

	return new Promise<string>((resolve) => {
		img.onload = () => {
			canvas.width = 20;
			canvas.height = (img.height / img.width) * 20;
			ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
			resolve(canvas.toDataURL('image/jpeg', 0.1));
		};
		img.src = src;
	});
};

export const progressiveLoad = (img: HTMLImageElement, lowRes: string, highRes: string) => {
	img.src = lowRes;
	img.style.filter = 'blur(10px)';

	const highResImg = new Image();
	highResImg.onload = () => {
		img.src = highRes;
		img.style.filter = 'none';
	};
	highResImg.src = highRes;
};
