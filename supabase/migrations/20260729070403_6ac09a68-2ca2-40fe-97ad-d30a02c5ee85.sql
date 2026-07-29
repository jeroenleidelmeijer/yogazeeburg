UPDATE public.publication_articles
SET
  status = 'published'::publication_article_status,
  final_title = 'Wat kost yoga in Amsterdam en waar betaal je voor?',
  slug = 'wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor',
  primary_keyword = 'wat kost yoga in Amsterdam',
  published_at = '2026-07-29T00:00:00Z',
  live_url = 'https://www.yogazeeburg.com/nl/kennisbank/wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor',
  content_hash = '831eaaa0edd695267764cff0d60574e107092e95d59bfab98388642fa756fda5',
  deployment_id = 'manual-placement-7',
  active_run_id = NULL,
  lock_token = NULL,
  locked_at = NULL,
  lock_expires_at = NULL,
  locked_by = NULL,
  notification_status = 'not_required'::publication_notification_status,
  updated_at = now()
WHERE planning_number = 7;

INSERT INTO public.kennisbank_placements (
  article_id, slug, content_hash, placement_status, package, published_at
) VALUES (
  'f9bc9f49-7441-4544-bb48-9730de074e5d',
  'wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor',
  '831eaaa0edd695267764cff0d60574e107092e95d59bfab98388642fa756fda5',
  'published'::kennisbank_placement_status,
  jsonb_build_object(
    'authoredBy', 'chatgpt-external',
    'planningNumber', 7,
    'slug', 'wat-kost-yoga-in-amsterdam-en-waar-betaal-je-voor',
    'title', 'Wat kost yoga in Amsterdam en waar betaal je voor?',
    'publishedAt', '2026-07-29',
    'placedBy', 'manual-placement-7'
  ),
  '2026-07-29T00:00:00Z'
)
ON CONFLICT (article_id) DO UPDATE SET
  slug = EXCLUDED.slug,
  content_hash = EXCLUDED.content_hash,
  placement_status = EXCLUDED.placement_status,
  package = EXCLUDED.package,
  published_at = EXCLUDED.published_at,
  updated_at = now();