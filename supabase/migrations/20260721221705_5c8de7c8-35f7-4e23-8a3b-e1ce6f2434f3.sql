
REVOKE EXECUTE ON FUNCTION public.claim_next_publication_run(text, publication_trigger_type, publication_scheduler_slot, integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.heartbeat_publication_run(uuid,uuid,uuid,integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.advance_publication_run(uuid,uuid,uuid,publication_article_status,publication_article_status,text,jsonb) FROM anon;
REVOKE EXECUTE ON FUNCTION public.complete_publication_success(uuid,uuid,uuid,text,text,text,text,text,timestamptz) FROM anon;
REVOKE EXECUTE ON FUNCTION public.complete_publication_failure(uuid,uuid,uuid,text,text,text,text,text,jsonb,integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.mark_notification_result(uuid,text,publication_notification_status,text,text) FROM anon;
REVOKE EXECUTE ON FUNCTION public._pub_lock_run(uuid,uuid,uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public._pub_require_admin(uuid) FROM anon;
