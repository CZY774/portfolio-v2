export const preventCLS = (element: HTMLElement, aspectRatio: string) => {
	element.style.aspectRatio = aspectRatio;
	element.style.width = '100%';
};

export const reserveSpace = (width: number, height: number) => ({
	width: `${width}px`,
	height: `${height}px`,
	minHeight: `${height}px`
});
