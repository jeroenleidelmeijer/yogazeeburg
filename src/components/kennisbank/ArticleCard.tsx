import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { ArticleRef } from "@/lib/kennisbank/types";

/**
 * Card used everywhere in the Yoga Gids (hub, category pages, alle-artikelen,
 * related). Consumes the fully-serializable `ArticleRef` so it can be fed
 * from a loader's DB read without dragging Lucide icons or JSX bodies
 * through the wire.
 */
export function ArticleCard({ article: a }: { article: ArticleRef }) {
  return (
    <li>
      <Link
        to="/kennisbank/$slug"
        params={{ slug: a.slug }}
        className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <p className="font-sans text-xs font-medium uppercase tracking-widest text-primary">
          {a.category.title}
        </p>
        <h3 className="mt-3 font-display text-xl font-medium leading-snug text-foreground">
          {a.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {a.description}
        </p>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {a.readingTimeMin} min lezen
          </span>
          <span className="font-medium text-primary group-hover:underline">
            Lees artikel →
          </span>
        </div>
      </Link>
    </li>
  );
}
