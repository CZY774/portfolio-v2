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
	'devicon-c-original',
	'devicon-cplusplus-plain',
	'devicon-html5-plain',
	'devicon-css3-plain',
	'devicon-javascript-plain',
	'devicon-python-plain',
	'devicon-r-plain',
	'devicon-php-plain',
	'devicon-java-plain',
	'devicon-kotlin-plain',
	'devicon-typescript-plain',
	'devicon-csharp-plain',
	'devicon-bootstrap-plain',
	'devicon-laravel-plain',
	'devicon-flask-plain',
	'devicon-tailwindcss-plain',
	'devicon-feathersjs-original',
	'devicon-jetpackcompose-plain',
	'devicon-spring-plain',
	'devicon-opengl-plain',
	'devicon-dotnetcore-plain',
	'devicon-react-plain',
	'devicon-axios-plain',
	'devicon-alpinejs-plain',
	'devicon-vuejs-plain',
	'devicon-ktor-plain',
	'devicon-svelte-plain',
	'devicon-chartjs-plain',
	'devicon-expo-plain',
	'devicon-nextjs-plain',
	'devicon-prisma-plain',
	'devicon-express-original',
	'devicon-flutter-plain',
	'devicon-threejs-original',
	'devicon-nodejs-plain',
	'devicon-socketio-original',
	'devicon-fastapi-plain',
	'devicon-django-plain',
	'devicon-djangorest-plain',
	'devicon-materialui-plain',
	'devicon-dart-plain',
	'devicon-rust-plain',
	'devicon-go-plain',
	'devicon-zig-plain',
	'devicon-jquery-plain',
	'devicon-sqlite-plain',
	'devicon-mysql-plain',
	'devicon-oracle-plain',
	'devicon-mongodb-plain',
	'devicon-redis-plain',
	'devicon-postgresql-plain',
	'devicon-firebase-plain',
	'devicon-cassandra-plain',
	'devicon-supabase-plain',
	'devicon-googlecloud-plain',
	'devicon-docker-plain',
	'devicon-gradle-plain',
	'devicon-vitejs-plain',
	'devicon-vercel-original',
	'devicon-graphql-plain',
	'devicon-grafana-plain',
	'devicon-grpc-plain',
	'devicon-uwsgi-plain'
];

export const works: Works = {
	apps: [
		{
			type: 'app',
			title: 'EduVerse by Belum Ada Ide',
			desc: '1st Place UI/UX Winner - Desktop educational platform for junior high school with AI-powered video summarization and geo-location attendance',
			link: 'https://www.figma.com/proto/iADoy42ojxwFJrOPRwKbAi/EduVerse-by-Belum-Ada-Ide?page-id=0%3A1&node-id=15-404&p=f&viewport=22%2C1366%2C0.04&t=pA0UioQrdVVisDYT-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=26%3A472',
			image: '/images/website-7.png'
		},
		{
			type: 'app',
			title: 'Maison Étoile by K-Mentality',
			desc: '1st Place 8-Hour Live Coding Winner - Laravel e-restaurant with RBAC for 3 roles, MySQL database, and Tailwind CSS',
			link: 'https://github.com/RafflesSupit/Next-Gen-K-MENTALITY/',
			image: '/images/website-9.png'
		},
		{
			type: 'app',
			title: 'Muncul River Tubing',
			desc: 'Production tourism website built with Laravel & MySQL. Deployed on Niagahoster and maintained for 1+ year by local stakeholders',
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
	photo: [
		{
			type: 'photo',
			title: 'Shutter Bliss',
			desc: 'Photography series exploring campus life at dusk',
			image: '/images/photo-1.jpg'
		},
		{
			type: 'photo',
			title: 'Street Snapshot',
			desc: 'Candid moments captured in urban settings',
			image: '/images/photo-2.jpg'
		},
		{
			type: 'photo',
			title: 'Blue Sky, Blue Sea',
			desc: 'A serene landscape capturing the essence of beach',
			image: '/images/photo-5.jpg'
		}
	],
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
			'Migrated legacy systems to modern web applications, improving maintainability by 10%'
	},
	{
		institution: 'Satya Wacana Christian University',
		date: 'Aug 2023 - Jul 2025',
		role: 'Teaching Assistant - 8 Core CS Courses',
		achievement:
			'Mentored 100+ students per semester with 85-90% average final grades across Data Structures, Algorithms, Web Programming, and AI'
	},
	{
		institution: 'FIT Competition 2024 & 2025',
		date: 'Mar 2024 - Aug 2025',
		role: 'Chairman (2024) & Steering Committee (2025)',
		achievement:
			'Led 40+ committee members and 10 technical support staff, organizing international coding competition with 117 teams (including Malaysia & Philippines) and 317 seminar attendees'
	},
	{
		institution: 'HMPTI UKSW',
		date: 'Jan 2024 - Dec 2024',
		role: 'Publication & Documentation Coordinator',
		achievement: 'Managed digital publication strategies and branding consistency across events'
	}
];
