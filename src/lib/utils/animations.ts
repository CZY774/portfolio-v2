export function initGSAP() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const gsap = (window as any).gsap;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ScrollTrigger = (window as any).ScrollTrigger;

	if (!gsap || !ScrollTrigger) return;

	gsap.registerPlugin(ScrollTrigger);

	gsap.from('.hero-title .word', {
		duration: 1.2,
		y: 120,
		opacity: 0,
		stagger: 0.15,
		ease: 'power3.out',
		delay: 0.4
	});

	gsap.from('.hero-desc', {
		duration: 1,
		y: 60,
		opacity: 0,
		delay: 3.8
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	gsap.utils.toArray('.section').forEach((section: any) => {
		gsap.from(section.querySelectorAll('.animate-in'), {
			y: 80,
			opacity: 0,
			duration: 1,
			stagger: 0.1,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: section,
				start: 'top 80%'
			}
		});
	});
}

export function scrollToSection(sectionId: string) {
	const element = document.getElementById(sectionId);
	if (element) {
		const headerOffset = 80;
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
}

export function initSmoothScrolling() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
			e.preventDefault();
			const targetId = this.getAttribute('href')?.substring(1);
			if (targetId) {
				scrollToSection(targetId);
			}
		});
	});

	if (window.location.hash) {
		const targetId = window.location.hash.substring(1);
		setTimeout(() => scrollToSection(targetId), 100);
	}
}
