import Image, { type ImageProps } from "next/image";
import { isOptimizableImage } from "@/lib/image";

export default function SafeImage({ alt, ...props }: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const unoptimized = props.unoptimized ?? (src ? !isOptimizableImage(src) : false);
  return <Image {...props} alt={alt ?? ""} unoptimized={unoptimized} />;
}
