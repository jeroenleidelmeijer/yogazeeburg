
-- Migration E: Knowledge base placement layer
-- Stores validated GeneratedArticlePackage records for future website rendering.

CREATE TYPE public.kennisbank_placement_status AS ENUM ('draft', 'preview', 'published');

CREATE TABLE public.kennisbank_placements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL UNIQUE REFERENCES public.publication_articles(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  content_hash text NOT NULL,
  placement_status public.kennisbank_placement_status NOT NULL DEFAULT 'draft',
  package jsonb NOT NULL,
  preview_url text,
  preview_token text UNIQUE,
  published_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT kennisbank_placements_slug_format CHECK (slug ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$')
);

CREATE INDEX kennisbank_placements_status_idx
  ON public.kennisbank_placements (placement_status);
CREATE INDEX kennisbank_placements_published_updated_idx
  ON public.kennisbank_placements (updated_at DESC)
  WHERE placement_status = 'published';

-- No writes from anon/authenticated; only anon may read published rows.
GRANT SELECT ON public.kennisbank_placements TO anon;
GRANT ALL ON public.kennisbank_placements TO service_role;

ALTER TABLE public.kennisbank_placements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "kennisbank_placements_public_read_published"
  ON public.kennisbank_placements
  FOR SELECT
  TO anon
  USING (placement_status = 'published');

-- updated_at trigger reuses standard helper if present; otherwise create minimal one.
CREATE OR REPLACE FUNCTION public.kennisbank_placements_touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER kennisbank_placements_set_updated_at
  BEFORE UPDATE ON public.kennisbank_placements
  FOR EACH ROW EXECUTE FUNCTION public.kennisbank_placements_touch_updated_at();
