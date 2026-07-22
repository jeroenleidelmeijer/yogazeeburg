# External Pre-Activation Tests

These harnesses live outside the sandbox because they need capabilities the
sandbox cannot provide safely:

1. **runtime-rls-matrix** — needs real Supabase-issued JWTs for `anon`,
   `authenticated` (non-admin), `authenticated` (admin), and a raw
   `service_role` key. The sandbox `psql` connects as a bypass-RLS role
   and cannot `SET ROLE` to `anon`/`authenticated`, so RLS enforcement
   can only be observed over the PostgREST HTTP API using real keys.

2. **concurrency-claim** — needs two truly parallel client sessions
   holding open transactions simultaneously with a rendezvous barrier.
   A single `psql` session cannot prove `FOR UPDATE` serialisation of
   `claim_next_publication_run`.

## Hard preconditions before running

- `automation_enabled = false` and `publication_stopped = false`
  (invariant; tests must not change this).
- Articles 1–180 untouched. Both harnesses operate on an **isolated
  test project** they create and clean up themselves; production rows
  are never touched.
- Runner code, scheduler, deployment, e-mail sender are NOT active.
- Secrets required (see each harness) are supplied by the operator at
  run time — never committed.

## Not to be executed yet

Do **not** run these harnesses until the operator has:
- provisioned the JWTs / service role key,
- confirmed the two parallel-connection endpoints,
- given explicit go-ahead.

Running them requires no privilege-escalation migration; they rely on
existing RLS + `GRANT EXECUTE` posture established by Migrations A + B.
