# Runtime RLS Matrix Test

Verifies row-level security posture of Migration A + B tables via the
Supabase PostgREST HTTP API using real JWTs — the one path the sandbox
cannot cover.

## What it proves

For each role × table × verb, that the observed outcome matches the
expected policy:

| Role                        | JWT source                                   |
| --------------------------- | -------------------------------------------- |
| `anon`                      | Project anon key                             |
| `authenticated` (non-admin) | Signed-in test user, NOT in `publication_admins` |
| `authenticated` (admin)     | Signed-in test user present in `publication_admins` |
| `service_role`              | Project service role key (never in browser)  |

Tables covered (all read-only for non-service roles per current policy):
- `publication_projects`
- `publication_articles`
- `publication_admins`
- `publication_runs`
- `publication_run_step_attempts`
- `publication_events`
- `publication_notifications`
- `publication_qa_checks`
- `publication_required_qa_checks`
- `publication_error_categories`
- `publication_run_reason_codes`

Verbs per table: `GET` (list, filtered), `POST`, `PATCH`, `DELETE`.

RPCs covered (POST `/rest/v1/rpc/<fn>` — expected `401/403` for anon):
- `claim_next_publication_run`
- `advance_publication_run`
- `heartbeat_publication_run`
- `complete_publication_success`
- `complete_publication_failure`
- `mark_notification_result`

## Expected matrix (summary)

- `anon`: all table verbs → `401` (grants revoked in Migration B). RPCs → `401`.
- `authenticated` non-admin: `GET` → `200` with **0 rows** for admin-scoped tables;
  `POST/PATCH/DELETE` → `403/401`. RPCs → error inside RPC (`admin required` /
  `unauthorized`) because `_pub_require_admin` fails for non-admin JWTs.
- `authenticated` admin: `GET` → `200` with rows; RPCs → contract responses
  against the isolated test project only.
- `service_role`: full access (used only for setup/teardown of the isolated
  test project, never against production rows).

## Layout

```
tests/external/runtime-rls-matrix/
├── README.md                 (this file)
├── .env.example              (required env vars — never commit real values)
├── package.json              (bun + zod + a tiny fetch client)
├── src/
│   ├── config.ts             (loads env, refuses to run against prod project without ISOLATION_OK=1)
│   ├── fixtures.ts           (creates isolated TEST-rls-<uuid> project via service_role)
│   ├── matrix.ts             (declarative table×role×verb expectations)
│   ├── rpc.ts                (declarative RPC×role expectations)
│   ├── run.ts                (executes matrix, prints PASS/FAIL table)
│   └── cleanup.ts            (drops the isolated test project + related rows)
└── expected-matrix.md        (human-readable expected outcomes, source-referenced)
```

## Required env

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # operator supplies; never committed
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
TEST_ADMIN_EMAIL=
TEST_ADMIN_PASSWORD=
ISOLATION_OK=1                      # must be set to acknowledge test creates isolated project
```

## Invariants the harness enforces

- Refuses to run if `automation_enabled=true` OR `publication_stopped=true`.
- Refuses to run if any planning_number 1..180 row is modified during the
  test (checksum captured before/after).
- All writes go to `project_key = 'TEST-rls-<uuid>'`; cleanup deletes only
  that project and its cascade.

## Not to be executed yet

Do not run until operator provides secrets and explicit go-ahead.
