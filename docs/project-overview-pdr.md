# Project Overview & Product Development Requirements (PDR)

**Project Name**: Hòn Đá Bạc — Portfolio 3D
**Last Updated**: 2026-03-17
**Status**: Active Development

## Executive Summary

Interactive portfolio/museum presentation site showcasing Vietnamese landmarks and cultural heritage through immersive 3D gallery experiences. Built with Next.js 16, React 19, Framer Motion, and Swiper to deliver cinematic visual storytelling with smooth animations and responsive design.

## Project Purpose

### Vision
Create an immersive digital experience that presents Vietnamese cultural heritage and landmarks through cutting-edge web animations and 3D visual effects.

### Goals
- Showcase Vietnamese landmarks with cinematic presentation
- Demonstrate modern web animation techniques (3D transforms, FLIP, Framer Motion)
- Provide responsive, accessible gallery experiences across devices
- Support Vietnamese typography and cultural aesthetic

## Target Users

1. **Visitors**: Exploring Vietnamese cultural heritage content
2. **Portfolio Viewers**: Evaluating frontend development capabilities
3. **Designers/Developers**: Seeking animation and UI inspiration

## Key Features

### 1. ExpoSlider — 3D Perspective Carousel
- Swiper-based carousel with custom 3D transforms (perspective, rotateY, translateZ, scale)
- Horizontal layout (desktop) / Vertical layout (mobile < 768px)
- Keyboard navigation with hold-repeat acceleration
- Mousewheel support, autoplay, FreeMode
- Animated background: rotating bronze drum SVG, dot grid, accent glow
- Per-slide accent colors, pagination dots
- Mobile scroll hint animation
- Slide-on-hover effect with accent color bars

### 2. GridGallery — Asymmetric Grid with Animations
- CSS Grid with named areas (a-h) for 4x3 responsive layout
- Directional fly-in/out animations on 8 items (Framer Motion)
- FLIP-style fullscreen expansion on click
- AnimatePresence for smooth mount/unmount transitions
- Escape key to deselect, gradient overlay with slide info

### 3. Shared Features
- Dark gradient theme (#1a0e0a → #080810)
- Vietnamese-optimized typography (Playfair Display + Be Vietnam Pro)
- 8 curated Vietnamese landmark slides with Unsplash images
- Responsive mobile-first design
- Per-slide accent color system

## Technical Requirements

### Functional Requirements

**FR1: Gallery Presentation**
- Display 8 Vietnamese landmark slides with images, titles, subtitles, and accent colors
- Support two distinct gallery modes: carousel and grid

**FR2: Animation System**
- 3D perspective transforms on carousel slides
- Directional fly-in animations on grid items
- FLIP-style fullscreen expansion
- Smooth transitions between states

**FR3: Responsive Design**
- Carousel: horizontal (desktop) → vertical (mobile)
- Grid: adaptive layout with CSS Grid named areas
- Touch/swipe support on mobile devices

**FR4: Keyboard Navigation**
- Arrow key navigation with hold-repeat acceleration
- Escape key to close fullscreen overlay

**FR5: Typography**
- Vietnamese language support (lang="vi")
- Playfair Display (serif) for headings
- Be Vietnam Pro (sans) for body text
- Font display swap for optimal LCP

### Non-Functional Requirements

**NFR1: Performance**
- Optimized image loading (Unsplash parameters)
- CSS-based animations where possible
- Reduced motion support via `prefers-reduced-motion`
- Next.js Image optimization

**NFR2: Accessibility**
- Keyboard navigation support
- Reduced motion preferences respected
- Semantic HTML structure

**NFR3: Browser Support**
- Modern browsers with CSS Grid support
- WebKit/Blink transform-style: preserve-3d

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Animation | Framer Motion | 12.36.0 |
| Carousel | Swiper | 12.1.2 |
| Styling | Tailwind CSS | 4.x |
| Fonts | Google Fonts (next/font) | — |
| Linting | ESLint | 9.x |

## Data Model

### Slide Interface
```typescript
interface Slide {
  id: number;
  image: string;    // Unsplash URL
  title: string;    // Vietnamese landmark name
  subtitle: string; // Description
  accent: string;   // Hex color
}
```

### Slides Collection
8 curated Vietnamese landmarks: Hạ Long, Hội An, Ruộng Bậc Thang, Sapa, Ninh Bình, Đà Lạt, Phong Nha, Phú Quốc.

## Page Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | ExpoSlider | Home — 3D perspective carousel |
| `/grid` | GridGallery | Asymmetric animated grid gallery |

## Design System

### Colors
- **Background**: #050510 (CSS variable)
- **Foreground**: #ffffff
- **Gradient**: #1a0e0a → #080810
- **Accent colors**: Per-slide (8 unique colors)

### Typography
- **Headings**: Playfair Display (serif), 400-900 weights
- **Body**: Be Vietnam Pro (sans), 300-700 weights
- **Subsets**: Vietnamese, Latin

### Theme
- Dark aesthetic with warm accent highlights
- Glassmorphism elements (backdrop-blur)
- Smooth CSS transitions and Framer Motion animations

## Constraints

- Images sourced from Unsplash (external dependency)
- Vietnamese-only content
- No backend/API — static data in `src/data/slides.ts`
- No authentication or user accounts

## Related Documentation

- [Codebase Summary](./codebase-summary.md)
- [Code Standards](./code-standards.md)
- [System Architecture](./system-architecture.md)
- [Project Roadmap](./project-roadmap.md)
