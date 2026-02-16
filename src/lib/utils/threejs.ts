// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initThreeJS(canvas: HTMLCanvasElement, THREE: any) {
	if (!THREE || !canvas) return null;

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	const geometry = new THREE.BufferGeometry();
	const vertices = [];
	const colors = [];

	for (let i = 0; i < 800; i++) {
		vertices.push((Math.random() - 0.5) * 2000);
		vertices.push((Math.random() - 0.5) * 2000);
		vertices.push((Math.random() - 0.5) * 2000);

		const isDark = document.documentElement.classList.contains('dark');
		if (isDark) {
			colors.push(0.6);
			colors.push(0.6);
			colors.push(0.9);
		} else {
			colors.push(0.1);
			colors.push(0.2);
			colors.push(0.3);
		}
	}

	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

	const material = new THREE.PointsMaterial({
		size: 2,
		vertexColors: true,
		opacity: 0.6,
		transparent: true,
		blending: THREE.AdditiveBlending
	});
	const particles = new THREE.Points(geometry, material);
	scene.add(particles);

	camera.position.z = 1000;

	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});

	return { scene, camera, renderer, particles };
}
