/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHTML(html: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'/': '&#x2F;'
	};
	return html.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Sanitize URL to prevent javascript: and data: protocols
 */
export function sanitizeURL(url: string): string {
	const trimmed = url.trim().toLowerCase();
	if (
		trimmed.startsWith('javascript:') ||
		trimmed.startsWith('data:') ||
		trimmed.startsWith('vbscript:')
	) {
		return '';
	}
	return url;
}
