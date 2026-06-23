const CACHE = 'portfolio-v2-v2';
const PRECACHE_URLS = ['/favicon.svg', '/favicon-192.png', '/favicon-512.png'];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(PRECACHE_URLS))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
			)
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	const { request } = event;

	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	if (url.origin !== self.location.origin) return;

	const isStaticAsset =
		request.destination === 'image' ||
		request.destination === 'font' ||
		url.pathname.startsWith('/images/') ||
		url.pathname.startsWith('/favicon');

	if (!isStaticAsset) return;

	event.respondWith(
		caches.match(request).then((cached) => {
			const fresh = fetch(request)
				.then((response) => {
					if (response.ok) {
						caches.open(CACHE).then((cache) => cache.put(request, response.clone()));
					}

					return response;
				})
				.catch(() => cached || Response.error());

			return cached || fresh;
		})
	);
});
