// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		THREE: typeof import('three');
		gsap: {
			registerPlugin: (plugin: unknown) => void;
			to: (target: unknown, vars: unknown) => void;
			timeline: () => unknown;
		};
		ScrollTrigger: unknown;
	}
}

export {};
