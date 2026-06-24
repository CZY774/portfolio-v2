export type WorkItem = {
	type: string;
	title: string;
	desc: string;
	image?: string;
	link?: string;
	url?: string;
};

export type Works = {
	apps: WorkItem[];
	photo: WorkItem[];
	videos: WorkItem[];
};

export const techStack = [
	'devicon-javascript-plain',
	'devicon-typescript-plain',
	'devicon-svelte-plain',
	'devicon-tailwindcss-plain',
	'devicon-threejs-original',
	'devicon-nextjs-plain',
	'devicon-python-plain',
	'devicon-fastapi-plain',
	'devicon-postgresql-plain',
	'devicon-supabase-plain',
	'devicon-redis-plain',
	'devicon-kotlin-plain',
	'devicon-jetpackcompose-plain',
	'devicon-tensorflow-original',
	'devicon-php-plain',
	'devicon-laravel-plain',
	'devicon-mysql-plain',
	'devicon-docker-plain',
	'devicon-vercel-original',
	'devicon-vitejs-plain',
	'devicon-gradle-plain',
	'devicon-figma-plain',
	'devicon-git-plain'
];

export const works: Works = {
	apps: [
		{
			type: 'app',
			title: 'CZMoney - Personal Finance Tracker',
			desc: 'Live full-stack SvelteKit personal finance app with Supabase, rate limiting, forgot password, and AI-powered expense summaries',
			link: 'https://czmoney.vercel.app',
			image: '/images/website-16.png'
		},
		{
			type: 'app',
			title: 'TanyaBuah - AI Fruit Recognition',
			desc: 'Educational Android app using MobileNetV2 and TensorFlow Lite for fruit recognition. HKI registered in Indonesia',
			link: 'https://github.com/CZY774/TTU',
			image: '/images/TanyaBuah.png'
		},
		{
			type: 'app',
			title: 'EduVerse by Belum Ada Ide',
			desc: '1st Place UI/UX concept for a desktop educational platform with video summarization and geo-location attendance workflows',
			link: 'https://www.figma.com/proto/iADoy42ojxwFJrOPRwKbAi/EduVerse-by-Belum-Ada-Ide?page-id=0%3A1&node-id=15-404&p=f&viewport=22%2C1366%2C0.04&t=pA0UioQrdVVisDYT-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=26%3A472',
			image: '/images/website-7.png'
		},
		{
			type: 'app',
			title: 'Maison Étoile by K-Mentality',
			desc: '1st Place 8-Hour Live Coding project: Laravel e-restaurant with role-based access, MySQL, and Tailwind CSS',
			link: 'https://next-gen-k-mentality.fly.dev/',
			image: '/images/website-9.png'
		},
		{
			type: 'app',
			title: 'Muncul River Tubing',
			desc: 'Laravel and MySQL tourism information website for a local river-tubing destination, deployed for stakeholder use',
			link: 'https://munculrivertubing.com',
			image: '/images/website-1.png'
		},
		{
			type: 'app',
			title: 'CornelVHub',
			desc: 'VMS platform built with Flask, MongoDB, Redis, & deployed on GCP',
			link: 'https://yoga-672022204-service-975615093796.asia-southeast2.run.app/',
			image: '/images/website-2.png'
		}
	],
	photo: [],
	videos: [
		{
			type: 'video',
			title: 'FIT Competition 2023 Aftermovie',
			desc: '12 hours live coding competition recap',
			url: 'https://www.youtube.com/embed/28RYBWVHs1I',
			image: '/images/video-6.png'
		},
		{
			type: 'video',
			title: 'Company Visit 2024 Aftermovie',
			desc: 'Informatics Engineering goes to Jakarta',
			url: 'https://www.youtube.com/embed/BAlP_WjAJGc',
			image: '/images/video-4.jpg'
		},
		{
			type: 'video',
			title: 'Kita Satu Rumah',
			desc: 'Youth Leadership Camp 2022 Shortmovie',
			url: 'https://www.youtube.com/embed/qjXdFmMGn84',
			image: '/images/video-2.jpg'
		},
		{
			type: 'video',
			title: 'SMASA MMXXII Last Ceremony',
			desc: 'Senior High School 1 Kudus Batch 2022 Last Ceremony',
			url: 'https://www.youtube.com/embed/TXQzKo2j-ok',
			image: '/images/video-1.jpg'
		}
	]
};

export const career = [
	{
		institution: 'PT Sumber Alfaria Trijaya Tbk (Alfamart)',
		date: 'Sep 2025 - Present',
		role: 'Development Intern - Supply & Distribution',
		achievement:
			'Supported warehouse workflow digitalization across stock opname, picking, and supplier-return systems'
	},
	{
		institution: 'Satya Wacana Christian University',
		date: 'Aug 2023 - Jul 2025',
		role: 'Teaching Assistant - 8 Core CS Courses',
		achievement:
			'Mentored 100+ students per semester across Data Structures, Algorithms, Web Programming, Database Systems, and AI'
	},
	{
		institution: 'FIT Competition 2024 & 2025',
		date: 'Mar 2024 - Aug 2025',
		role: 'Chairman (2024) & Steering Committee (2025)',
		achievement:
			'Coordinated committee divisions, judges, sponsors, participants, and event execution for seminar and coding competition programs'
	},
	{
		institution: 'HMPTI UKSW',
		date: 'Jan 2024 - Dec 2024',
		role: 'Publication & Documentation Coordinator',
		achievement: 'Managed digital publication strategies and branding consistency across events'
	}
];
