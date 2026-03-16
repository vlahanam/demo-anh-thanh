# Hòn Đá Bạc — Portfolio 3D

Interactive portfolio/museum presentation site showcasing Vietnamese landmarks and cultural heritage through immersive 3D gallery experiences.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI**: React 19.2.3, TypeScript 5.x
- **Animation**: Framer Motion 12.36.0
- **Carousel**: Swiper 12.1.2
- **Styling**: Tailwind CSS 4.x
- **Fonts**: Playfair Display (serif) + Be Vietnam Pro (sans)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (vi lang, fonts, metadata)
│   ├── page.tsx            # Home — ExpoSlider carousel
│   ├── globals.css         # Tailwind v4, CSS variables, theme
│   └── grid/
│       └── page.tsx        # Grid gallery page
├── components/
│   ├── expo/
│   │   └── ExpoSlider.tsx  # 3D perspective carousel (Swiper)
│   └── grid/
│       └── GridGallery.tsx # Asymmetric grid with FLIP animations
├── data/
│   └── slides.ts           # 8 Vietnamese landmark slides
└── lib/
    └── fonts.ts            # Vietnamese-optimized font config
```

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | ExpoSlider | 3D perspective carousel with keyboard nav, autoplay, responsive layout |
| `/grid` | GridGallery | Asymmetric CSS Grid with directional fly-in animations, fullscreen overlay |

## Features

- **3D Carousel**: Swiper-based slider with perspective transforms, rotateY, translateZ effects
- **Grid Gallery**: CSS Grid named areas layout with Framer Motion directional animations
- **Responsive**: Horizontal (desktop) / Vertical (mobile) carousel; adaptive grid
- **Keyboard Navigation**: Arrow keys with hold-repeat acceleration
- **Dark Theme**: Gradient background (#1a0e0a → #080810) with per-slide accent colors
- **Vietnamese Typography**: Playfair Display headings + Be Vietnam Pro body text
- **Animated Background**: Rotating bronze drum SVG (trống đồng), dot grid, accent glow
- **Fullscreen Overlay**: FLIP-style expansion with AnimatePresence transitions

## Slides Data

8 curated Vietnamese landmarks with unique accent colors:
1. Vịnh Hạ Long (#3ec9d1)
2. Phố Cổ Hội An (#e6a855)
3. Ruộng Bậc Thang (#a8c44a)
4. Sapa (#6aab73)
5. Ninh Bình (#7aaa8a)
6. Đà Lạt (#c97bb5)
7. Phong Nha (#5b9fc9)
8. Phú Quốc (#e07345)

## Public Assets

- `trongdong.svg` — Animated bronze drum background element
- `icon.png`, `apple-icon.png`, `favicon.ico` — App icons

## Scripts

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

## Documentation

- [Project Overview & PDR](docs/project-overview-pdr.md)
- [Codebase Summary](docs/codebase-summary.md)
- [Code Standards](docs/code-standards.md)
- [System Architecture](docs/system-architecture.md)
- [Project Roadmap](docs/project-roadmap.md)

## License

Private project.
