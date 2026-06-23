# Portfolio v2

Personal portfolio for Cornelius Ardhani Yoga Pratama, built with SvelteKit and deployed on Vercel.

Live site: [corneliusyoga.vercel.app](https://corneliusyoga.vercel.app)

This README is intentionally conservative. Do not add Lighthouse scores, accessibility compliance labels, uptime percentages, competition numbers, model accuracy, or business impact metrics unless they are backed by dated evidence that can be shown during review.

## Stack

Core portfolio stack:

- SvelteKit
- TypeScript
- Tailwind CSS
- Vite
- GSAP through CDN
- Three.js through CDN
- Vercel

Selected project-specific stack shown in the portfolio:

- CZMoney: SvelteKit, TypeScript, Supabase, PostgreSQL, Redis, Google Gemini API
- TanyaBuah: Kotlin, Jetpack Compose, MobileNetV2 image classification
- Muncul River Tubing and Maison Etoile: Laravel, PHP, MySQL, Tailwind CSS
- UI/UX work: Figma

The tech marquee is curated to technologies that are visible in recent portfolio work or defensible from linked projects. Avoid using the marquee as a keyword dump. A recruiter or engineering reviewer may read every icon as a claim of practical working ability.

## Repository Structure

```text
src/
  lib/
    components/        Reusable UI and interaction components
    data/              Portfolio, career, and blog source data
    utils/             Performance, image, worker, and browser helpers
  routes/
    +layout.svelte     Global layout, metadata, analytics, and navigation behavior
    +page.svelte       Main portfolio page
    blog/              Blog listing and slug pages
static/
  images/              Portfolio images and thumbnails
  sw.js                Service worker
```

Primary content files:

- `src/lib/data/portfolio.ts` controls tech icons, work items, and career entries.
- `src/lib/data/blog.ts` controls blog metadata.
- `src/routes/blog/[slug]/+page.svelte` contains long-form blog content.

## Features

- Responsive portfolio landing page.
- Dual-track positioning for software/IT and management trainee review.
- Filtered work section for software/product and media/storytelling evidence.
- Hover-reveal project media on desktop, with project images still visible on mobile.
- Career timeline and project summaries.
- Blog listing and detailed blog pages.
- SEO metadata and structured data components.
- Vercel Analytics and Speed Insights integration.

## Claim Discipline

Safe claims for this repository:

- Built with SvelteKit, TypeScript, Tailwind CSS, GSAP, and Three.js.
- Deployed to Vercel.
- Contains public portfolio projects, project summaries, blog content, and social links.
- Uses structured data and metadata components for search visibility.

Claims that need evidence before being published:

- Exact Lighthouse or Core Web Vitals scores.
- WCAG compliance labels.
- Uptime percentages.
- "Enterprise-grade" or "production-ready" labels without explaining the specific production behavior.
- Exact model accuracy, grade averages, participant counts, or business impact numbers.
- GDPR compliance or cookie-consent claims unless the implementation actually exists and has been reviewed.

When a claim is useful but not yet proven, write it as an implementation detail instead of a result. For example, "uses Supabase Row Level Security" is stronger and safer than "secure enterprise architecture" if no audit exists.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Check the project before deployment:

```bash
npm run check
npm run lint
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The intended deployment target is Vercel. Before relying on the live site as proof of this repository, verify that the Vercel project is connected to this repository and the expected branch. If the live site diverges from local source, resolve the source-of-truth mismatch first.

## Known Review Items

- Replace `static/favicon.ico` if it is still a placeholder.
- Recheck long-form blog post bodies for unsupported numeric claims before using them as hiring material.
- Run `npm run check`, `npm run lint`, and `npm run build` in a working Node environment before deployment.

## Links

- Portfolio: [corneliusyoga.vercel.app](https://corneliusyoga.vercel.app)
- GitHub: [github.com/CZY774](https://github.com/CZY774)
- LinkedIn: [linkedin.com/in/cornelius-yoga-783b6a291](https://www.linkedin.com/in/cornelius-yoga-783b6a291)
- Instagram: [instagram.com/corneliusyoga](https://www.instagram.com/corneliusyoga)
- YouTube: [youtube.com/@corneliusyoga](https://www.youtube.com/@corneliusyoga)
