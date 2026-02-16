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
			desc: 'UI/UX winner for a desktop based educational platform for junior high school students',
			link: 'https://www.figma.com/proto/iADoy42ojxwFJrOPRwKbAi/EduVerse-by-Belum-Ada-Ide?page-id=0%3A1&node-id=15-404&p=f&viewport=22%2C1366%2C0.04&t=pA0UioQrdVVisDYT-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=26%3A472',
			image: '/images/website-7.png'
		},
		{
			type: 'app',
			title: 'Maison Étoile by K-Mentality',
			desc: '8-hour livecode winner: Laravel-based e-restaurant with ordering, menu management, and RBAC for 3 roles',
			link: 'https://github.com/RafflesSupit/Next-Gen-K-MENTALITY/',
			image: '/images/website-9.png'
		},
		{
			type: 'app',
			title: 'Personal Portfolio Prototype',
			desc: 'A prototype design for a personal portfolio website, showcasing skills and projects',
			link: 'https://www.figma.com/proto/sfsRHIHF9RIqKK28RfIbLB/Prototype-Portfolio?page-id=58%3A110&node-id=58-260&p=f&viewport=714%2C-1868%2C0.65&t=T1XFOcaTmdvAG88S-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=58%3A260',
			image: '/images/website-8.png'
		},
		{
			type: 'app',
			title: 'CornelVHub',
			desc: 'VMS platform built with Flask, MongoDB, Redis, & deployed on GCP',
			link: 'https://yoga-672022204-service-975615093796.asia-southeast2.run.app/',
			image: '/images/website-2.png'
		},
		{
			type: 'app',
			title: 'Supermarket & Warehouse Management System',
			desc: 'A system built in Java using NetBeans IDE and MySQL, featuring OOP principles and real-time time tracking.',
			link: 'https://github.com/CZY774/gudang-supermarket-java-netbeans',
			image: '/images/website-6.png'
		},
		{
			type: 'app',
			title: 'Muncul River Tubing',
			desc: 'Business website built with Laravel & Bootstrap',
			link: 'https://munculrivertubing.com',
			image: '/images/website-1.png'
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
			title: 'SMASA MMXXII Last Ceremony',
			desc: 'Senior High School 1 Kudus Batch 2022 Last Ceremony',
			url: 'https://www.youtube.com/embed/TXQzKo2j-ok',
			image: '/images/video-1.jpg'
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
			title: 'Company Visit 2024 Aftermovie',
			desc: 'Informatics Engineering goes to Jakarta',
			url: 'https://www.youtube.com/embed/BAlP_WjAJGc',
			image: '/images/video-4.jpg'
		},
		{
			type: 'video',
			title: 'FIT Competition 2023 Aftermovie',
			desc: '12 hours live coding competition recap',
			url: 'https://www.youtube.com/embed/28RYBWVHs1I',
			image: '/images/video-6.png'
		},
		{
			type: 'video',
			title: 'Youthful Enthusiasm in Pandemic',
			desc: 'Smasa Euforia 2021 Aftermovie',
			url: 'https://www.youtube.com/embed/Iqdgfxyt6Nw',
			image: '/images/video-5.jpg'
		},
		{
			type: 'video',
			title: 'Berbalik',
			desc: 'Metanoia Youth 43rd Anniversary 2020 Shortmovie',
			url: 'https://www.youtube.com/embed/PKvTvR8fGYA',
			image: '/images/video-3.jpg'
		},
		{
			type: 'video',
			title: 'Please Him',
			desc: 'Metanoia Youth 42nd Anniversary 2019 Shortmovie',
			url: 'https://www.youtube.com/embed/PcezxGYzLS8',
			image: '/images/video-7.jpg'
		},
		{
			type: 'video',
			title: 'Step Up',
			desc: 'Metanoia Youth 45th Anniversary 2022 Shortmovie',
			url: 'https://www.youtube.com/embed/8gnwVo94eoo',
			image: '/images/video-8.jpg'
		},
		{
			type: 'video',
			title: 'Step Up Aftermovie',
			desc: 'Metanoia Youth 45th Anniversary 2022 Aftermovie',
			url: 'https://www.youtube.com/embed/sADc8-UGbxo',
			image: '/images/video-11.jpg'
		},
		{
			type: 'video',
			title: 'Recall',
			desc: 'Youth Leadership Camp 2019 Shortmovie',
			url: 'https://www.youtube.com/embed/LmP06VfOcHo',
			image: '/images/video-9.jpg'
		},
		{
			type: 'video',
			title: 'School From Home',
			desc: 'Won the 2nd Place in High School shortmovie competition',
			url: 'https://www.youtube.com/embed/67zLTv-aCM8',
			image: '/images/video-10.png'
		}
	]
};

export const career = [
	{
		institution: 'PT Sumber Alfaria Trijaya Tbk (Alfamart)',
		date: '2025 - Present',
		role: 'Supply and Distribution Dev Intern',
		achievement: 'Migrated legacy systems to modern web applications, improving efficiency by 10%'
	},
	{
		institution: 'Satya Wacana Christian University',
		date: '2022 - Present',
		role: 'Committee Chairman, Steering Committee, Teaching Assistant',
		achievement:
			'Led 50+ team members in international events and increased its registrants by 254%'
	},
	{
		institution: 'Metanoia Youth Commission GKMI Kudus',
		date: '2017 - 2022',
		role: 'Committee Chairman & Media Production Head',
		achievement: 'Produced 5+ shortmovies, 3 aftermovies, reached 1000+ views'
	},
	{
		institution: 'Senior High School 1 Kudus',
		date: '2020 - 2022',
		role: 'Head of Section 9 OSIS: ICT & Media Production Head',
		achievement: 'Managed 3 social media platforms with 8K+ followers'
	}
];
