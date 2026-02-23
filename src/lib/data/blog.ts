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
		title: 'building czmoney: offline-first architecture',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		date: '2026-02-23',
		readTime: '8 min',
		published: true
	},
	{
		slug: 'lighthouse-optimization',
		title: 'optimizing lighthouse scores: from 62 to 96 in one afternoon',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
		date: '2026-02-21',
		readTime: '5 min',
		published: true
	},
	{
		slug: 'sveltekit-performance',
		title: 'sveltekit performance patterns: what actually matters',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.',
		date: '2026-02-18',
		readTime: '12 min',
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
