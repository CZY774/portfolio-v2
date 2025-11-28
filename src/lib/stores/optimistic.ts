import { writable } from 'svelte/store';

export const createOptimistic = <T>(initial: T) => {
	const { subscribe, set, update } = writable(initial);

	return {
		subscribe,
		optimistic: (fn: (val: T) => T, revert?: () => void) => {
			const prev = initial;
			update(fn);
			return {
				confirm: () => {},
				rollback: () => {
					set(prev);
					revert?.();
				}
			};
		}
	};
};
