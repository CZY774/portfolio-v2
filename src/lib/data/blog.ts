export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	readTime: string;
	published: boolean;
}

export const posts: BlogPost[] = [
	{
		slug: 'building-czmoney-offline-first',
		title: 'building czmoney: from spreadsheet pain to personal finance pwa',
		description:
			'how a spreadsheet frustration became a SvelteKit finance app with offline-first decisions, Supabase-backed data, and AI-assisted summaries.',
		date: '2026-02-23',
		readTime: '12 min',
		published: true
	},
	{
		slug: 'why-sveltekit-my-go-to',
		title: 'why sveltekit became my go-to fullstack framework',
		description:
			'systematic framework evaluation led to one clear winner. how sveltekit delivers better dx, smaller bundles, and faster iteration without the ecosystem bloat.',
		date: '2026-02-21',
		readTime: '7 min',
		published: true
	},
	{
		slug: 'building-tanyabuah-production-ml',
		title: 'building mobile fruit recognition for an educational app',
		description:
			'notes on using MobileNetV2 for Android fruit recognition, with emphasis on mobile constraints, learning context, and user-centered design.',
		date: '2026-02-18',
		readTime: '10 min',
		published: true
	}
];

export function getAllPosts(): BlogPost[] {
	return posts
		.filter((post) => post.published)
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
}

export function getPostBySlug(slug: string): BlogPost | undefined {
	return posts.find((post) => post.slug === slug && post.published);
}
