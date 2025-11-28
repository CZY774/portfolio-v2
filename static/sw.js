const CACHE = 'v1';
const ASSETS = ['/favicon.svg', '/images/'];

self.addEventListener('install', (e) => {
	e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
	if (e.request.method !== 'GET') return;
	e.respondWith(
		caches.match(e.request).then((cached) => {
			const fresh = fetch(e.request).then((res) => {
				caches.open(CACHE).then((cache) => cache.put(e.request, res.clone()));
				return res;
			});
			return cached || fresh;
		})
	);
});

self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
	);
});
