export const obfuscate = (str: string): string => {
	return btoa(encodeURIComponent(str));
};

export const deobfuscate = (str: string): string => {
	return decodeURIComponent(atob(str));
};

export const protectEmail = (email: string): string => {
	return email
		.split('')
		.map((c) => `&#${c.charCodeAt(0)};`)
		.join('');
};
