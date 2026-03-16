# Project Roadmap

**Last Updated**: 2026-03-17
**Project**: Hòn Đá Bạc — Portfolio 3D

## Current Status

Two gallery interfaces implemented and functional:
- **ExpoSlider** (home `/`): 3D perspective carousel — complete
- **GridGallery** (`/grid`): Asymmetric animated grid — complete (uncommitted)

---

## Completed Work

### v1 — Initial Setup
- ✅ Next.js 16 project scaffolding
- ✅ TypeScript strict mode configuration
- ✅ Tailwind CSS 4 integration
- ✅ Vietnamese font system (Playfair Display + Be Vietnam Pro)

### v2 — ExpoSlider Carousel
- ✅ Swiper integration with 3D perspective transforms
- ✅ Responsive layout (horizontal/vertical)
- ✅ Keyboard navigation with hold-repeat acceleration
- ✅ Animated background (bronze drum SVG, dot grid, accent glow)
- ✅ Per-slide accent color system
- ✅ Pagination, slide counter, info panel
- ✅ Mousewheel + autoplay + FreeMode
- ✅ Mobile scroll hint animation

### Grid Gallery Feature
- ✅ CSS Grid with named areas (4×3 layout)
- ✅ Directional fly-in animations (Framer Motion)
- ✅ FLIP-style fullscreen expansion
- ✅ AnimatePresence transitions
- ✅ Escape key to close overlay

### Infrastructure
- ✅ 8 Vietnamese landmark slides data
- ✅ Bronze drum SVG asset
- ✅ App icons (favicon, apple-icon)
- ✅ Global dark theme with CSS variables
- ✅ Development plans structure

---

## In Progress

### Grid Gallery Polish
- 🔄 Commit grid gallery files
- 🔄 Mobile responsiveness testing
- 🔄 Touch gesture improvements

---

## Planned Features

### Short Term
- 📋 Image optimization (Next.js Image component, blur placeholders)
- 📋 Loading states and skeleton screens
- 📋 Page transitions between routes
- 📋 SEO metadata per page
- 📋 Open Graph images

### Medium Term
- 📋 Additional gallery layouts (masonry, timeline)
- 📋 Slide detail pages with more content
- 📋 Smooth page transitions (shared layout animations)
- 📋 Sound/audio integration
- 📋 More Vietnamese landmark content

### Long Term
- 📋 3D WebGL elements (Three.js integration)
- 📋 Interactive map of Vietnamese landmarks
- 📋 Content management system
- 📋 Multi-language support (Vietnamese/English)
- 📋 Analytics integration

---

## Technical Improvements

### Performance
- 📋 Image lazy loading optimization
- 📋 Bundle size analysis and reduction
- 📋 Lighthouse score optimization
- 📋 Core Web Vitals monitoring

### Quality
- 📋 Accessibility audit (WCAG 2.1)
- 📋 Cross-browser testing
- 📋 Mobile device testing matrix
- 📋 Animation performance profiling

---

## Development Plans Archive

Plans documented in `plans/` directory:
| Plan | Date | Status |
|------|------|--------|
| grid-gallery-animation | 2026-03-17 | Active |
| swiper-poc-3-styles | 2026-03-16 | Completed |
| visual-overhaul-and-episode-completion | 2026-03-16 | Completed |
| hon-da-bac-3d-museum-poc | 2026-03-16 | Completed |
| improve-slide-visuals | 2026-03-16 | Completed |

---

## Related Documentation

- [Project Overview & PDR](./project-overview-pdr.md)
- [Codebase Summary](./codebase-summary.md)
- [Code Standards](./code-standards.md)
- [System Architecture](./system-architecture.md)
