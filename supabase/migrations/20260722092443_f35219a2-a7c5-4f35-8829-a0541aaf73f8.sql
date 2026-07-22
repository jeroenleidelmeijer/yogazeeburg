DROP TABLE IF EXISTS public._migb_test_results;
CREATE TABLE public._migb_test_results(run_at timestamptz default now(), result text);
GRANT ALL ON public._migb_test_results TO service_role;
ALTER TABLE public._migb_test_results ENABLE ROW LEVEL SECURITY;
INSERT INTO public._migb_test_results(result) SELECT public._run_migb_tests_capture();