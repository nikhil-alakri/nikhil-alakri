/** Maps a keyboard key to the target slide index for a looping carousel, or null if the key is not handled. */
export function carouselKeyTarget(key: string, current: number, count: number): number | null {
  if (count <= 0) return null;
  switch (key) {
    case "ArrowRight": case "PageDown": return (current + 1) % count;
    case "ArrowLeft": case "PageUp": return (current - 1 + count) % count;
    case "Home": return 0;
    case "End": return count - 1;
    default: return null;
  }
}
