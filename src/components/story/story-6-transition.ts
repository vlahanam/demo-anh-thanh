export type Direction = "left" | "right" | "up" | "down";

export function getRandomDirection(prev: Direction | null): Direction {
  const dirs: Direction[] = ["left", "right", "up", "down"];
  const filtered = prev ? dirs.filter((d) => d !== prev) : dirs;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function makeVariants(dir: Direction) {
  const offset = "110%";
  const enter =
    dir === "left"  ? { x: offset,   y: 0 } :
    dir === "right" ? { x: `-${offset}`, y: 0 } :
    dir === "up"    ? { x: 0, y: offset } :
                     { x: 0, y: `-${offset}` };

  const exit =
    dir === "left"  ? { x: `-${offset}`, y: 0 } :
    dir === "right" ? { x: offset,   y: 0 } :
    dir === "up"    ? { x: 0, y: `-${offset}` } :
                     { x: 0, y: offset };

  return {
    enter:  { ...enter,  scale: 0.96, opacity: 0 },
    center: { x: 0, y: 0, scale: 1,  opacity: 1 },
    exit:   { ...exit,   scale: 0.96, opacity: 0 },
  };
}
