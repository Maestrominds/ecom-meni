// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare module '$env/dynamic/public' {
	export const env: Record<string, string>;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
