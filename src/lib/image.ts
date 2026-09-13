const OPTIMIZABLE_HOSTS = [
  "img.youtube.com",
  "firebasestorage.googleapis.com",
  "res.cloudinary.com",
];

export function isOptimizableImage(src: string): boolean {
  if (!src) return false;
  if (src.startsWith("/")) return true;
  try {
    const u = new URL(src);
    return (
      OPTIMIZABLE_HOSTS.includes(u.hostname) ||
      u.hostname.endsWith(".firebasestorage.app")
    );
  } catch {
    return false;
  }
}

export function isLikelyImageUrl(src: string): boolean {
  if (!src) return false;
  if (src.startsWith("/")) return true;
  try {
    const u = new URL(src);
    if (isOptimizableImage(src)) return true;
    return /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(u.pathname);
  } catch {
    return false;
  }
}
