import type { Handle } from '@sveltejs/kit';

const rateLimits = new Map<string, { count: number; reset: number }>();

export const handle: Handle = async ({ event, resolve }) => {
	const ip = event.getClientAddress();
	const now = Date.now();
	const limit = rateLimits.get(ip);

	if (limit && now < limit.reset) {
		if (limit.count >= 100) {
			return new Response('Too Many Requests', { status: 429 });
		}
		limit.count++;
	} else {
		rateLimits.set(ip, { count: 1, reset: now + 60000 });
	}

	const response = await resolve(event);

	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

	return response;
};
