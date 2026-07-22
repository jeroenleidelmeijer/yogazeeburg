CREATE OR REPLACE FUNCTION public._run_migb_tests_capture() RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE msg text;
BEGIN
  BEGIN PERFORM public._run_migb_tests();
  EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS msg = MESSAGE_TEXT; RETURN msg;
  END;
  RETURN 'NO_EXCEPTION';
END $$;