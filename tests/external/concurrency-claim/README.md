# Concurrency Claim Test (two parallel connections)

Proves that `claim_next_publication_run` serialises correctly under real
concurrent access: two simultaneous callers targeting the same sequence
head must produce exactly one `claimed` and one `lock_conflict` (or
equivalent contract response), never two claims of the same article.

## Why external

The sandbox `psql` gives one connection at a time; a single session can
open a transaction but cannot prove `FOR UPDATE` blocking without a
second, truly parallel client. This harness uses two independent
`node-postgres` (`pg`) clients with an in-process barrier.

## Design

1. **Setup (service_role)**
   - Create isolated `TEST-conc-<uuid>` project + 3 planned articles.
   - Ensure `automation_enabled=true` on that isolated project only.
2. **Barrier**
   - Two async tasks each open a dedicated connection, call
     `claim_next_publication_run(project_key,'manual',NULL,300)`.
   - A `Promise.all` + shared `await barrier()` synchronises the two
     calls so both attempts hit within the same tick.
3. **Assertions**
   - Exactly one of the two responses has `disposition='claimed'`.
   - The other has `disposition='lock_conflict'` (article was locked
     by the winner) OR blocks until the winner commits and then
     returns `lock_conflict` (also acceptable).
   - Only ONE `publication_articles` row transitions to `locked`.
   - Exactly ONE `publication_runs` row has `disposition='claimed'`
     and non-null `lock_token` for the winning article.
4. **Repeat cycle**
   - Winner: `complete_publication_failure(..., 'retry', ...)` → run
     released, article back to `retry_pending`.
   - Re-run barrier. Expected: same outcome, next attempt increments
     `attempt_number` cumulatively per `(article_id, step_key)`.
5. **Exhaustion under contention**
   - Drive 3 cumulative failures on the same `step_key` via alternating
     winners. After the third, article status = `failed`, and a 4th
     parallel-barrier claim must return `sequence_blocked`.
6. **Teardown (service_role)**
   - Delete isolated project cascade; verify articles 1..180 checksum
     unchanged.

## Layout

```
tests/external/concurrency-claim/
├── README.md
├── .env.example
├── package.json          (bun + pg)
├── src/
│   ├── config.ts         (env, isolation guard)
│   ├── barrier.ts        (Promise-based rendezvous helper)
│   ├── fixtures.ts       (isolated project + articles, service_role)
│   ├── claim-race.ts     (test 1: single-round race)
│   ├── retry-race.ts     (test 2: retry cycle under contention)
│   ├── exhaustion.ts     (test 3: cumulative exhaustion under contention)
│   ├── invariants.ts     (before/after checksum of 1..180 rows)
│   └── run.ts            (orchestrates + prints PASS/FAIL)
```

## Required env

```
PGHOST=
PGPORT=5432
PGDATABASE=postgres
PGUSER=postgres                    # operator supplies service-role-equivalent
PGPASSWORD=                        # operator supplies; never committed
PGSSLMODE=require
ISOLATION_OK=1
```

## Invariants the harness enforces

- Aborts before setup if `publication_stopped` OR `automation_enabled`
  is true on the production project.
- Captures a checksum of `publication_articles` where `planning_number
  BETWEEN 1 AND 180` before and after; refuses to report PASS unless
  the checksum is identical.
- All writes scoped to `project_key = 'TEST-conc-<uuid>'`; teardown
  drops that project. No global config is touched.

## Not to be executed yet

Do not run until operator supplies DB credentials and explicit
go-ahead. No privilege-escalation migration is required to run this
harness — it uses the existing `service_role` credentials the operator
already holds.
