# Portfolio v2

A modern, typography-focused portfolio website built with SvelteKit, featuring WebGL animations, smooth scrolling, and responsive design.

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

### User Experience

- 🧭 **Smooth navigation** - Animated scrolling between sections
- 🎨 **Typography grid** - Big, bold, beautiful text layouts
- 🔄 **Infinite marquee** - Tech stack showcase
- 📑 **Work filtering** - Apps, Photos, Videos categories
- ♿ **Accessibility focused** - Proper contrast and focus states

## 🏗️ Project Structure

```
src/
├── routes/
│   ├── +layout.svelte    # Global layout with theme detection
│   └── +page.svelte      # Main portfolio page
├── lib/
│   └── assets/
│       └── favicon.svg
├── app.css               # Global styles with Tailwind
├── app.html              # HTML template
└── app.d.ts              # Type definitions
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
