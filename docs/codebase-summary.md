# Codebase Summary

**Last Updated**: 2026-03-17
**Project**: Hòn Đá Bạc — Portfolio 3D

## Overview

Next.js 16 portfolio site showcasing Vietnamese landmarks through two immersive gallery interfaces: a 3D perspective carousel and an asymmetric animated grid. Built with React 19, Framer Motion, Swiper, and Tailwind CSS 4.

## Project Structure

```
demo-portfolio-3d/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (vi, fonts, metadata)
│   │   ├── page.tsx                # Home → ExpoSlider
│   │   ├── globals.css             # Tailwind v4, theme, animations
│   │   └── grid/
│   │       └── page.tsx            # Grid → GridGallery
│   ├── components/
│   │   ├── expo/
│   │   │   └── ExpoSlider.tsx      # 3D carousel (~336 lines)
│   │   └── grid/
│   │       └── GridGallery.tsx     # Animated grid (~176 lines)
│   ├── data/
│   │   └── slides.ts              # 8 slides data + Slide interface
│   └── lib/
│       └── fonts.ts               # Font configuration
├── public/
│   ├── trongdong.svg              # Bronze drum SVG (462KB)
│   ├── icon.png                   # App icon
│   ├── apple-icon.png             # Apple touch icon
│   └── favicon.ico                # Favicon
├── docs/                          # Project documentation
├── plans/                         # Development plans
├── .claude/                       # AI agent framework
├── next.config.ts                 # Next.js config (minimal)
├── tsconfig.json                  # TypeScript (strict, ES2017)
├── postcss.config.mjs             # PostCSS + Tailwind v4
├── eslint.config.mjs              # ESLint 9
├── tailwind.config.ts             # Tailwind config
└── package.json                   # Dependencies & scripts
```

## Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.6 | App Router, SSR, routing |
| React | 19.2.3 | UI components |
| TypeScript | 5.x | Type safety (strict mode) |
| Framer Motion | 12.36.0 | Animations, AnimatePresence |
| Swiper | 12.1.2 | Carousel/slider |
| Tailwind CSS | 4.x | Utility-first styling |
| ESLint | 9.x | Code linting |

## Key Components

### ExpoSlider (`src/components/expo/ExpoSlider.tsx`)
- **Type**: Client component ("use client")
- **Lines**: ~336
- **Purpose**: 3D perspective carousel with Swiper
- **Features**:
  - Custom `setTranslate` for perspective/rotateY/translateZ/scale transforms
  - Responsive: horizontal (desktop) / vertical (mobile < 768px)
  - Keyboard nav with hold-repeat acceleration (ArrowLeft/Right/Up/Down)
  - Mousewheel, autoplay, FreeMode modules
  - Animated background: rotating trongdong.svg, dot grid, accent glow
  - Pagination dots, slide counter (01/08), slide info panel
  - Hover effect with accent color bars
  - Mobile scroll hint

### GridGallery (`src/components/grid/GridGallery.tsx`)
- **Type**: Client component ("use client")
- **Lines**: ~176
- **Purpose**: Asymmetric grid with directional animations
- **Features**:
  - CSS Grid with named areas (a-h) on 4-col × 3-row layout
  - Directional fly-in/out per item (left/right/top/bottom offsets)
  - FLIP-style fullscreen expansion on click
  - AnimatePresence for smooth transitions
  - Escape key to deselect
  - Gradient overlay with title/subtitle

## Data Layer

### Slides (`src/data/slides.ts`)
- **Exports**: `SLIDES` array, `Slide` interface
- **Count**: 8 items
- **Fields**: id, image (Unsplash URL), title, subtitle, accent (hex color)
- **Content**: Vietnamese landmarks (Hạ Long, Hội An, Sapa, Ninh Bình, Đà Lạt, Phong Nha, Phú Quốc, Ruộng Bậc Thang)

## Utility Files

### Fonts (`src/lib/fonts.ts`)
- `fontSerif`: Playfair Display (400-900, Vietnamese+Latin)
- `fontSans`: Be Vietnam Pro (300-700, Vietnamese+Latin)
- CSS variables: `--font-serif`, `--font-sans`
- Display: "swap" for optimal LCP

## Styling

### Global CSS (`src/app/globals.css`)
- Tailwind v4 with inline theme override
- CSS variables: `--background` (#050510), `--foreground` (#fff)
- Box-sizing reset, smooth scroll
- Typography hierarchy: serif headings, sans body
- Reduced motion support (`prefers-reduced-motion`)
- Custom Swiper pagination bullet styles

### Design Tokens
- **Background gradient**: #1a0e0a → #080810
- **8 accent colors**: per-slide unique (#3ec9d1, #e6a855, #a8c44a, etc.)
- **Font stack**: Playfair Display → Be Vietnam Pro

## Page Routes

| Route | File | Component | Description |
|-------|------|-----------|-------------|
| `/` | `src/app/page.tsx` | ExpoSlider | 3D carousel home |
| `/grid` | `src/app/grid/page.tsx` | GridGallery | Animated grid gallery |

## Configuration

- **TypeScript**: Strict mode, ES2017 target, path alias `@/*` → `./src/*`
- **Next.js**: Minimal config, no custom image domains
- **PostCSS**: `@tailwindcss/postcss` plugin
- **ESLint**: Next.js core-web-vitals + TypeScript rules

## Development Plans

Active plans in `plans/` directory:
- `260317-0007-grid-gallery-animation` — Grid page with FLIP animations
- `260316-2245-swiper-poc-3-styles` — Swiper card effect POC
- `260316-2207-visual-overhaul-and-episode-completion` — Visual redesign
- `260316-1731-hon-da-bac-3d-museum-poc` — 3D museum POC
- `260316-1643-improve-slide-visuals` — Slide visual improvements

## Git Status

- **Branch**: main
- **Commits**: 2 (first commit, v2)
- **Uncommitted**: Grid gallery files (src/app/grid/, src/components/grid/)

## Metrics

- **Components**: 2 (ExpoSlider, GridGallery)
- **Pages**: 2 (/, /grid)
- **Data sources**: 1 (slides.ts, 8 items)
- **Total source lines**: ~700
- **Dependencies**: 5 production + 6 dev

## Related Documentation

- [Project Overview & PDR](./project-overview-pdr.md)
- [Code Standards](./code-standards.md)
- [System Architecture](./system-architecture.md)
- [Project Roadmap](./project-roadmap.md)
