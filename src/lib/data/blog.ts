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
		title: 'building czmoney: from google sheets to production-ready pwa',
		description:
			'how a simple spreadsheet frustration turned into a full-stack progressive web app with offline-first architecture, ai insights, and real-time sync.',
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
		title: 'building production ml for mobile: lessons from educational computer vision',
		description:
			'deploying a 96% accurate fruit detection model to android. how mobilenetv2, quantization, and user-centered design solved real-world constraints.',
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
