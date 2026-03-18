import type { Story6Slide } from "@/data/story-6-slides";

interface Props {
  slide: Story6Slide;
  maxWidth: string;
}

export default function Story6TextContent({ slide, maxWidth }: Props) {
  return (
    <div style={{ maxWidth }}>
      <span
        className="inline-block text-xs md:text-sm tracking-[0.3em] uppercase font-mono mb-4"
        style={{ color: slide.accent }}
      >
        {slide.label}
      </span>
      <div className="h-px mb-5 w-12" style={{ background: slide.accent }} />
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-4"
        style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          textShadow: "0 2px 20px rgba(0,0,0,0.8)",
        }}
      >
        {slide.title}
      </h2>
      <p
        className="text-sm md:text-base text-white/80 leading-relaxed"
        style={{ fontFamily: "var(--font-sans), sans-serif" }}
      >
        {slide.description}
      </p>
    </div>
  );
}
