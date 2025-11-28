# Portfolio v2

A modern, typography-focused portfolio website built with SvelteKit, featuring WebGL animations, smooth scrolling, and advanced performance optimizations.

## 🎨 Design Philosophy

This portfolio embraces **typography as the hero** with a minimalist approach:

- Clean sans-serif typography (Inter)
- Enormous title sizes for maximum impact
- Abundant white space for breathing room
- Lowercase aesthetic throughout
- Blue accent color (#0736fe) for highlights
- Images revealed only on hover to maintain typography focus

## ✨ Features

### Core Technologies

- **SvelteKit** - Modern web framework with SSR
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling (no config needed)
- **GSAP** - Professional animations and smooth scrolling
- **Three.js** - WebGL particle background effects
- **Vercel** - Optimized deployment platform

### Visual & Interactive

- 🌓 **Auto dark/light mode** - Respects system preferences
- ✨ **WebGL particle background** - Subtle animated particles
- 🎭 **Smooth scroll animations** - GSAP-powered section transitions
- 📱 **Fully responsive** - Mobile-first design approach
- ⚡ **Loading animations** - Elegant loading states
- 🎯 **Scroll-triggered animations** - Content reveals on scroll
- 🖼️ **Hover-reveal images** - Typography-first with image overlays

### Performance Optimizations

#### Core Web Vitals

- 📐 **CLS Prevention** - Aspect ratio reservations & space allocation
- ⏱️ **TTI Measurement** - Time to Interactive tracking with PerformanceObserver
- 🖼️ **Lazy Loading** - IntersectionObserver-based image loading
- 🚀 **FCP Optimization** - Inline critical CSS & resource hints

#### Advanced Performance

- 🎯 **Debounce/Throttle** - Event handler optimization utilities
- 🎬 **RAF Throttling** - 60fps capped animations with frame skipping
- 🔄 **Service Worker** - Cache-first PWA strategy
- 👷 **Web Workers** - Background thread processing
- ⚡ **Rate Limiter** - 100 req/min per IP protection
- 🔮 **Prefetch Routes** - Hover & viewport-based preloading
- 🎨 **Optimistic UI** - Instant feedback with rollback

#### Resource Loading

- 🌐 **DNS-Prefetch** - Early DNS resolution for CDNs
- 🔗 **Preconnect** - Pre-establish connections
- 📦 **Preload** - Critical resource prioritization
- 🎯 **Priority Loading** - Eager vs lazy loading strategies
- 📊 **Route Priority** - High/medium/low route classification

#### Svelte-Specific

- 🎭 **Actions** - `clickOutside`, `lazyLoad`, `viewport` directives
- ✨ **Transitions** - `slideScale`, `blur` custom transitions
- 🔄 **Built-in Animations** - Svelte's native animation system

#### Code Quality

- 💀 **Skeleton Loaders** - Smooth content placeholders
- 🗜️ **Client Compression** - gzip for data transfer
- 📦 **Chunked Downloads** - Parallel asset loading
- 🔒 **Code Obfuscation** - Basic string protection
- ⏱️ **Deferred Work** - requestIdleCallback for non-critical tasks
- 🌳 **Tree Shaking** - Automatic dead code elimination
- 📦 **Code Splitting** - Route-based automatic chunking

#### Monitoring

- 📊 **Vercel Analytics** - Real User Monitoring (RUM)
- ⚡ **Speed Insights** - Core Web Vitals tracking
- 🎯 **APM Metrics** - Application Performance Monitoring

### User Experience

- 🧭 **Smooth navigation** - Animated scrolling between sections
- 🎨 **Typography grid** - Big, bold, beautiful text layouts
- 🔄 **Infinite marquee** - Tech stack showcase
- 📑 **Work filtering** - Apps, Photos, Videos categories
- ♿ **Accessibility focused** - Proper contrast and focus states
- 🍪 **Cookie consent** - GDPR-compliant analytics consent banner

### Security

- 🔒 **Content Security Policy** - XSS protection via CSP headers
- 🛡️ **Security headers** - X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- 🔐 **Permissions policy** - Restricts unnecessary browser features
- 🚦 **Rate limiting** - DDoS protection at application level

## 🏗️ Project Structure

```
src/
├── routes/
│   ├── +layout.svelte    # Global layout with theme & prefetch
│   ├── +page.svelte      # Main portfolio page
│   └── +error.svelte     # Custom error page
├── lib/
│   ├── components/
│   │   ├── Skeleton.svelte          # Loading placeholder
│   │   ├── OptimizedImage.svelte    # Lazy + CLS prevention
│   │   ├── MotionLoader.svelte      # Animated loader
│   │   └── Modal.svelte             # Modal with actions/transitions
│   ├── actions/
│   │   └── index.ts                 # Svelte actions (clickOutside, lazyLoad, viewport)
│   ├── transitions/
│   │   └── index.ts                 # Custom transitions (slideScale, blur)
│   ├── stores/
│   │   └── optimistic.ts            # Optimistic UI store
│   ├── utils/
│   │   ├── perf.ts                  # Debounce, throttle, RAF throttling, TTI
│   │   ├── image.ts                 # Progressive loading
│   │   ├── defer.ts                 # Deferred execution
│   │   ├── compress.ts              # Client compression
│   │   ├── download.ts              # Chunked fetch
│   │   ├── obfuscate.ts             # String obfuscation
│   │   ├── cls.ts                   # CLS prevention
│   │   ├── worker.ts                # Web Worker utility
│   │   └── priority.ts              # Resource priority loading
│   └── assets/
│       └── favicon.svg
├── hooks.server.ts       # Security headers + rate limiter
├── app.css               # Global styles with Tailwind
├── app.html              # HTML template with inline CSS
└── app.d.ts              # Type definitions
static/
├── sw.js                 # Service Worker (PWA)
└── worker.js             # Web Worker for background tasks
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio-v2.git
   cd portfolio-v2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build locally
npm run preview
```

## 🎯 Performance Features Usage

### Debounce & Throttle

```typescript
import { debounce, throttle } from '$lib/utils/perf';

// Debounce - waits for pause in events
const search = debounce((query: string) => {
	fetch(`/api?q=${query}`);
}, 300);

// Throttle - limits execution rate
const scroll = throttle(() => {
	console.log('Scrolling...');
}, 100);
```

### RAF Throttling

```typescript
import { RAFThrottle } from '$lib/utils/perf';

const raf = new RAFThrottle(60); // 60fps cap
raf.run((delta) => {
	// Your animation code
	animate(delta);
});

// Stop when done
raf.stop();
```

### Svelte Actions

```svelte
<script>
	import { clickOutside, lazyLoad, viewport } from '$lib/actions';
</script>

<!-- Click outside detection -->
<div use:clickOutside={() => closeModal()}>Modal content</div>

<!-- Lazy load images -->
<img use:lazyLoad data-src="/image.jpg" alt="Lazy" />

<!-- Viewport intersection -->
<div use:viewport={() => console.log('In view!')}>Content</div>
```

### Custom Transitions

```svelte
<script>
	import { slideScale, blur } from '$lib/transitions';
	let show = $state(false);
</script>

{#if show}
	<div transition:slideScale>Smooth entry/exit</div>
	<div transition:blur={{ amount: 10 }}>Blur effect</div>
{/if}
```

### Web Workers

```typescript
import { createWorker } from '$lib/utils/worker';

const worker = createWorker('/worker.js');
worker.post('process', { data: 'heavy computation' });
worker.on((e) => {
	console.log('Result:', e.data);
});
worker.terminate(); // Clean up
```

### Priority Loading

```typescript
import { loadPriority } from '$lib/utils/priority';

// Eager load critical images
loadPriority.eager('/hero-image.jpg');

// Lazy load non-critical
loadPriority.lazy('/background.jpg', (url) => {
	img.src = url;
});
```

### Optimized Image Component

```svelte
<OptimizedImage src="/images/photo.jpg" alt="Description" width={800} height={600} />
```

### Optimistic UI

```svelte
<script>
	import { createOptimistic } from '$lib/stores/optimistic';
	const count = createOptimistic(0);
	const action = $count.optimistic((n) => n + 1);
	// action.rollback() if fails
</script>
```

### Deferred Work

```svelte
<script>
	import { defer, deferHeavy } from '$lib/utils/defer';
	defer(() => console.log('runs when idle'));
	deferHeavy(() => console.log('runs on powerful devices'));
</script>
```

### Client Compression

```typescript
import { compressText, decompressText } from '$lib/utils/compress';
const blob = await compressText('large text');
const text = await decompressText(blob);
```

### Obfuscation

```typescript
import { obfuscate, protectEmail } from '$lib/utils/obfuscate';
const hidden = obfuscate('sensitive');
const email = protectEmail('user@example.com');
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel --prod
   ```

2. **Or use GitHub integration**
   - Push to GitHub
   - Connect repository to Vercel
   - Auto-deploy on push

### Other Platforms

The static build works on any hosting platform:

- Netlify
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting

## 📄 Content Sections

### 1. Landing Section

- **Hero title** with highlighted name
- **Brief description** and location
- **Social links** (Instagram, GitHub, LinkedIn, YouTube)
- **Call-to-action buttons** for navigation

### 2. About Section

- **Infinite tech marquee** with development icons
- **Career timeline** with institutions, roles, and achievements
- **Clean typography layout**

### 3. Work Section

- **Filterable portfolio** (All, Apps, Photos, Videos)
- **Typography-first design** with hover-reveal images
- **Different interaction patterns**:
  - Apps: "View Project" → External links
  - Photos: "Look Closer" → Modal/lightbox
  - Videos: "Play Video" → Video embed

### 4. Footer Section

- **Simple attribution** and contact information

## 🔒 Security Features

### Rate Limiting

In-memory rate limiter (100 requests/minute per IP):

```typescript
// hooks.server.ts
const rateLimits = new Map<string, { count: number; reset: number }>();
```

### Content Security Policy (CSP)

Configured in `svelte.config.js` to prevent XSS attacks:

- Restricts script sources to self and trusted CDNs (GSAP, Three.js)
- Controls style sources and inline styles
- Allows YouTube and Figma embeds for portfolio content
- Blocks unauthorized resource loading

### HTTP Security Headers

Implemented in `hooks.server.ts`:

- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Referrer-Policy**: Controls referrer information leakage
- **Permissions-Policy**: Disables unnecessary browser features (geolocation, microphone, camera)

### Cookie Consent

GDPR-compliant cookie consent banner:

- Appears on first visit
- Stores user preference in localStorage
- Required for Vercel Analytics tracking
- Accept/Decline options with clear messaging

## 🎨 Customization

### Colors

The primary accent color is defined as a CSS custom property:

```css
/* Blue accent used throughout */
--accent: #0736fe;
```

### Typography

The site uses Inter font with specific weights:

- Light (300) - Body text
- Regular (400) - Standard text
- Medium (500) - Navigation
- Bold (700-900) - Headings

### Content Updates

Update content in `src/routes/+page.svelte`:

```javascript
// Work portfolio
const works = {
  apps: [...],
  photo: [...],
  videos: [...]
};

// Career timeline
const career = [...];
```

## 🔧 Technical Details

### Performance Optimizations

- **Lazy loading** for images and heavy content
- **Code splitting** via SvelteKit's automatic optimization
- **Tree shaking** for minimal bundle size
- **CDN delivery** for external libraries (GSAP, Three.js)
- **Preload critical resources** (fonts, core styles)
- **Inline critical CSS** for instant FCP
- **Aspect ratio** reservations to prevent CLS
- **requestIdleCallback** for deferred work
- **Viewport prefetching** for instant navigation

### Browser Support

- **Modern browsers** (Chrome 90+, Firefox 90+, Safari 14+)
- **WebGL support** required for particle effects
- **Graceful degradation** for unsupported features

### Accessibility Features

- **Semantic HTML** structure
- **Keyboard navigation** support
- **Screen reader** optimized
- **High contrast** mode support
- **Reduced motion** respect
- **Focus management** for navigation

### SEO Optimizations

- **Server-side rendering** via SvelteKit
- **Meta tags** configuration
- **Semantic markup** structure
- **Clean URLs** with proper routing
- **Image alt texts** and descriptions

## 🛠️ Development Scripts

```bash
# Development with hot reload
npm run dev

# Type checking
npm run check
npm run check:watch

# Code formatting
npm run format

# Linting
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

## 📦 Dependencies

### Core Framework

- `@sveltejs/kit` - Web application framework
- `svelte` - Component framework
- `typescript` - Type safety
- `vite` - Build tool

### Styling

- `tailwindcss` - CSS framework
- `@tailwindcss/typography` - Typography plugin
- `@tailwindcss/forms` - Form styling

### Animation & Effects

- GSAP (CDN) - Animation library
- Three.js (CDN) - WebGL graphics
- DevIcons (CDN) - Technology icons

### Development Tools

- `prettier` - Code formatting
- `eslint` - Code linting
- `svelte-check` - Type checking

## 🙏 Acknowledgments

- [SvelteKit](https://kit.svelte.dev/) for the amazing framework
- [GSAP](https://greensock.com/gsap/) for professional animations
- [Three.js](https://threejs.org/) for WebGL capabilities
- [Tailwind CSS](https://tailwindcss.com/) for rapid styling
- [Vercel](https://vercel.com/) for seamless deployment
- [Inter Font](https://rsms.me/inter/) for beautiful typography

## <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="25px" alt="waving hand"> Get In Touch

<div align="center">
  <a href="https://www.instagram.com/corneliusyoga" target="_blank"><img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram"></a>&nbsp;
  <a href="https://www.linkedin.com/in/cornelius-yoga-783b6a291" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>&nbsp;
  <a href="https://www.youtube.com/channel/UCj0TlW5vLO6r_Nlwc8oFBpw" target="_blank"><img src="https://img.shields.io/badge/YouTube-%23FF0000.svg?&style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"></a>&nbsp;
  <a href="https://czy.digital" target="_blank"><img src="https://img.shields.io/badge/Portfolio-%23000000.svg?&style=for-the-badge&logo=react&logoColor=white" alt="Portfolio"></a>
  <br/><br/>
  <img src="https://komarev.com/ghpvc/?username=CZY774&style=flat-square&color=0366D6" alt="Profile Views" />
  <br/>
  <sub>Made by Cornelius Ardhani Yoga Pratama</sub>
</div>
