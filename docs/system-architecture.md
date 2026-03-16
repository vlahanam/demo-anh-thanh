# System Architecture

**Last Updated**: 2026-03-17
**Project**: Hòn Đá Bạc — Portfolio 3D

## Overview

Static Next.js 16 application with client-side animations. No backend, no database, no authentication. All data is embedded in TypeScript files. The architecture prioritizes visual performance and animation smoothness.

## Architecture Pattern

**Pattern**: Static Site with Client-Side Interactivity
- Server-rendered pages (Next.js App Router)
- Client components for interactive galleries
- Static data embedded in source code
- No API routes or server actions

## System Diagram

```
┌─────────────────────────────────────────┐
│                Browser                   │
│                                         │
│  ┌──────────┐  ┌────────────────────┐   │
│  │ / (Home) │  │ /grid (Gallery)    │   │
│  │          │  │                    │   │
│  │ ExpoSlider │ GridGallery         │   │
│  │ (Swiper)  │ (Framer Motion)     │   │
│  └─────┬────┘  └──────┬───────────┘   │
│        │               │               │
│        └───────┬───────┘               │
│                │                        │
│         ┌──────▼──────┐                │
│         │  SLIDES[]   │                │
│         │  (8 items)  │                │
│         └─────────────┘                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           Next.js 16 Server             │
│                                         │
│  ┌─────────┐  ┌────────┐  ┌─────────┐ │
│  │ Layout  │  │ Fonts  │  │ Assets  │ │
│  │ (SSR)   │  │ (WOFF) │  │ (SVG)   │ │
│  └─────────┘  └────────┘  └─────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          External Resources             │
│                                         │
│  ┌──────────────┐  ┌────────────────┐  │
│  │ Unsplash CDN │  │ Google Fonts   │  │
│  │ (Images)     │  │ (WOFF2)       │  │
│  └──────────────┘  └────────────────┘  │
└─────────────────────────────────────────┘
```

## Component Architecture

### Page Components (Server)

```
RootLayout (server)
├── metadata (title, description, icons)
├── font variables (--font-serif, --font-sans)
├── globals.css import
└── children
    ├── HomePage (server) → renders ExpoSlider
    └── GridPage (server) → renders GridGallery
```

### Interactive Components (Client)

**ExpoSlider** — 3D Carousel
```
ExpoSlider ("use client")
├── State: activeIndex, isMobile, isLoaded
├── Swiper instance
│   ├── SwiperSlide × 8
│   │   └── Image + gradient overlay + info
│   ├── Modules: Mousewheel, Autoplay, FreeMode
│   └── Custom setTranslate (3D transforms)
├── Background layer
│   ├── Rotating trongdong.svg
│   ├── Dot grid pattern
│   └── Accent glow (radial gradient)
├── UI overlays
│   ├── Slide counter (top-left)
│   ├── Slide info panel (bottom)
│   └── Pagination dots
└── Keyboard handler (arrow keys + repeat)
```

**GridGallery** — Animated Grid
```
GridGallery ("use client")
├── State: selectedId, isVisible
├── CSS Grid container (4×3 named areas)
│   └── motion.div × 8
│       ├── Directional fly-in animation
│       ├── Click → select (layoutId)
│       └── Image + gradient + title
├── AnimatePresence
│   └── Fullscreen overlay (selected item)
│       ├── Backdrop blur
│       ├── Expanded image
│       └── Title + subtitle
└── Escape key handler
```

## Data Flow

```
src/data/slides.ts (static)
    │
    ├── SLIDES[] (8 items)
    │   ├── id: number
    │   ├── image: string (Unsplash URL)
    │   ├── title: string
    │   ├── subtitle: string
    │   └── accent: string (hex)
    │
    ├──→ ExpoSlider
    │   └── Maps to SwiperSlide components
    │       └── Uses accent for glow, pagination, hover bars
    │
    └──→ GridGallery
        └── Maps to grid items with layoutId
            └── Uses accent for overlay gradient
```

## Animation Architecture

### ExpoSlider Transforms
```
Swiper onSetTranslate callback:
  For each slide:
    progress = slide.progress (distance from center)
    ├── translateZ: -abs(progress) × 300px
    ├── rotateY: progress × 30deg
    ├── scale: 1 - abs(progress) × 0.15
    └── opacity: 1 - abs(progress) × 0.3
```

### GridGallery Animations
```
Entry animation (staggered):
  Each item has pre-defined direction:
    ├── from-left: x: -200, opacity: 0
    ├── from-right: x: 200, opacity: 0
    ├── from-top: y: -200, opacity: 0
    └── from-bottom: y: 200, opacity: 0

Fullscreen expansion:
  layoutId transition (Framer Motion FLIP)
    ├── Item → fullscreen overlay
    ├── AnimatePresence for mount/unmount
    └── Backdrop fade + blur
```

## Styling Architecture

```
globals.css
├── @import "tailwindcss"
├── @theme (CSS variable overrides)
│   ├── --background: #050510
│   └── --foreground: #ffffff
├── Base resets (*, html, body)
├── Typography rules
│   ├── h1-h6: font-serif
│   └── body, p: font-sans
├── Animation utilities
│   └── @media (prefers-reduced-motion)
└── Swiper overrides
    └── .swiper-pagination-bullet styles
```

## Rendering Strategy

| Component | Rendering | Reason |
|-----------|-----------|--------|
| RootLayout | Server (SSR) | Static metadata, fonts |
| HomePage | Server | Simple wrapper |
| GridPage | Server | Simple wrapper |
| ExpoSlider | Client (CSR) | Swiper, keyboard events, resize |
| GridGallery | Client (CSR) | Framer Motion, click events |

## External Dependencies

| Service | Purpose | Failure Impact |
|---------|---------|----------------|
| Unsplash CDN | Slide images | Images won't load |
| Google Fonts | Typography | Fallback system fonts |

## Performance Considerations

- **Font loading**: `display: "swap"` prevents invisible text
- **Image loading**: Unsplash URL params control size/quality
- **Animation**: CSS transforms (GPU-accelerated) for carousel
- **Bundle**: Only Swiper modules used are imported
- **Reduced motion**: Animations disabled when user prefers

## Security

- No user input handling (static site)
- No API endpoints
- No sensitive data
- External images only from Unsplash CDN
- `.env` gitignored

## Related Documentation

- [Project Overview & PDR](./project-overview-pdr.md)
- [Codebase Summary](./codebase-summary.md)
- [Code Standards](./code-standards.md)
- [Project Roadmap](./project-roadmap.md)
