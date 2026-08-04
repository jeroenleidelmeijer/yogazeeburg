/**
 * Reusable 16:9 article image. Used for the optional hero image (rendered by
 * the article route between header and TOC) and for in-body content images.
 * Explicit width/height prevent layout shift; no crop, no overlay, no caption.
 */
export type ArticleImageRef = {
  /** Site-relative CDN path, e.g. /__l5e/assets-v1/... */
  url: string;
  alt: string;
  width: number;
  height: number;
};

export function ArticleFigure({
  image,
  priority = false,
  className = "",
}: {
  image: ArticleImageRef;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-2xl ${className}`}>
      <img
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className="aspect-video h-auto w-full object-cover"
      />
    </figure>
  );
}
