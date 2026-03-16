# Code Standards & Codebase Structure

**Last Updated**: 2026-03-17
**Project**: Hòn Đá Bạc — Portfolio 3D

## Overview

Coding standards, file organization, and conventions for the demo-portfolio-3d project. A Next.js 16 / React 19 / TypeScript application with Framer Motion animations and Swiper carousel.

## Core Principles

- **KISS**: Simple, focused components. Each component does one thing well.
- **DRY**: Shared data in `src/data/`, shared utilities in `src/lib/`.
- **File Size**: Keep components under 500 lines. Split if needed.
- **Type Safety**: TypeScript strict mode. Define interfaces for data models.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + Tailwind
│   └── [route]/
│       └── page.tsx        # Route page
├── components/
│   └── [feature]/          # Feature-grouped components
│       └── ComponentName.tsx
├── data/
│   └── slides.ts           # Static data + interfaces
└── lib/
    └── fonts.ts            # Utilities and config
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ExpoSlider.tsx`, `GridGallery.tsx` |
| Directories | kebab-case | `src/components/expo/` |
| Data files | kebab-case | `slides.ts` |
| Utility files | kebab-case | `fonts.ts` |
| Interfaces | PascalCase | `Slide` |
| CSS variables | kebab-case | `--font-serif`, `--background` |

## Component Standards

### Client Components
- Mark with `"use client"` directive at top
- Used for: animations, event handlers, browser APIs, Swiper/Framer Motion

### Component Structure
```tsx
"use client";

import { ... } from "react";
import { ... } from "framer-motion";
// Other imports

// Types/interfaces (or import from data/)
interface Props { ... }

// Constants
const ANIMATION_CONFIG = { ... };

// Component
export default function ComponentName() {
  // State
  // Effects
  // Handlers
  // Render
}
```

### Animation Patterns
- **Framer Motion**: Use `motion.*` components, `AnimatePresence`, `useAnimate`
- **Swiper**: Custom transforms via `setTranslate` callback
- **CSS**: Use Tailwind `transition-*` utilities for simple transitions
- **Reduced motion**: Always check `prefers-reduced-motion`

## TypeScript Standards

- **Strict mode** enabled
- Define data interfaces in `src/data/` alongside data
- Use path alias `@/*` for imports from `src/`
- Prefer `interface` over `type` for object shapes
- Export types alongside data

```typescript
// src/data/slides.ts
export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  accent: string;
}

export const SLIDES: Slide[] = [ ... ];
```

## Styling Standards

### Tailwind CSS v4
- Utility-first approach
- Inline theme overrides in `globals.css`
- Custom CSS variables for theme tokens

### CSS Variables
```css
--background: #050510;
--foreground: #ffffff;
--font-serif: Playfair Display;
--font-sans: Be Vietnam Pro;
```

### Typography Hierarchy
- Headings: `font-serif` (Playfair Display)
- Body text: `font-sans` (Be Vietnam Pro)
- Both support Vietnamese subsets

### Color System
- Dark gradient backgrounds
- Per-slide accent colors (8 unique)
- White foreground text

## Image Standards

- External images from Unsplash with size parameters
- SVG for decorative elements (trongdong.svg)
- PNG for app icons
- Use Next.js `<Image>` when applicable

## Responsive Design

- Mobile-first approach
- Breakpoint: 768px (md) for layout switches
- Carousel: vertical (mobile) → horizontal (desktop)
- Grid: CSS Grid with named areas, responsive via media queries
- Touch/swipe support via Swiper modules

## Accessibility

- Keyboard navigation (arrow keys, Escape)
- `prefers-reduced-motion` support
- Semantic HTML structure
- Vietnamese language attribute (`lang="vi"`)

## Git Standards

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
- No secrets in commits
- Keep `.env` gitignored

## Development Workflow

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint check
```

## Related Documentation

- [Project Overview & PDR](./project-overview-pdr.md)
- [Codebase Summary](./codebase-summary.md)
- [System Architecture](./system-architecture.md)
- [Project Roadmap](./project-roadmap.md)
