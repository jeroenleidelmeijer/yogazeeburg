import { createFileRoute, useNavigate, useServerFn, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  getPublicationOverview,
  bootstrapFirstAdmin,
  importPlanning,
  backfillPilots,
  adminReleaseLock,
  adminMarkArticle,
  adminSetAutomation,
  adminStopPublication,
  type PublicationArticleRow,
} from "@/lib/publications/publications.functions";

export const Route = createFileRoute("/admin/kennisbank-publicaties")({
  head: () => ({
    meta: [
      { title: "Publicatiebeheer — Yoga Zeeburg" },
      { name: "description", content: "Beheer van de 180-artikelen publicatieregistratie." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ? "in" : "out"));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s ? "in" : "out"));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === "out") navigate({ to: "/auth" });
  }, [session, navigate]);

  if (session !== "in") {
    return (
      <main className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Sessie controleren…
      </main>
    );
  }
  return <AdminDashboard />;
}

function AdminDashboard() {
  const qc = useQueryClient();
  const overviewFn = useServerFn(getPublicationOverview);
  const query = useQuery({ queryKey: ["publication-overview"], queryFn: () => overviewFn() });

  const bootstrapFn = useServerFn(bootstrapFirstAdmin);
  const importFn = useServerFn(importPlanning);
  const backfillFn = useServerFn(backfillPilots);
  const releaseLockFn = useServerFn(adminReleaseLock);
  const markFn = useServerFn(adminMarkArticle);
  const automationFn = useServerFn(adminSetAutomation);
  const stopFn = useServerFn(adminStopPublication);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["publication-overview"] });

  const bootstrap = useMutation({ mutationFn: () => bootstrapFn(), onSuccess: invalidate });
  const importMut = useMutation({
    mutationFn: (dryRun: boolean) => importFn({ data: { dryRun } }),
    onSuccess: invalidate,
  });
  const backfill = useMutation({ mutationFn: () => backfillFn(), onSuccess: invalidate });
  const releaseLock = useMutation({
    mutationFn: (articleId: string) => releaseLockFn({ data: { articleId } }),
    onSuccess: invalidate,
  });
  const mark = useMutation({
    mutationFn: (v: { articleId: string; newStatus: "planned" | "failed" | "blocked" | "retry_pending"; reason?: string }) =>
      markFn({ data: v }),
    onSuccess: invalidate,
  });
  const automation = useMutation({
    mutationFn: (enabled: boolean) => automationFn({ data: { enabled } }),
    onSuccess: invalidate,
  });
  const stopMut = useMutation({
    mutationFn: (reason: string) => stopFn({ data: { reason } }),
    onSuccess: invalidate,
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  if (query.isLoading) {
    return <main className="min-h-screen p-8 text-sm text-muted-foreground">Laden…</main>;
  }
  if (query.error) {
    return <main className="min-h-screen p-8 text-sm text-destructive">Fout: {(query.error as Error).message}</main>;
  }

  const data = query.data!;

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <header className="mx-auto max-w-6xl flex items-center justify-between">
        <div>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Site</Link>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">Publicatiebeheer</h1>
          <p className="text-sm text-muted-foreground">Yoga Zeeburg Yoga Gids — centrale registratie</p>
        </div>
        <button onClick={signOut} className="text-sm text-muted-foreground hover:text-foreground">
          Uitloggen
        </button>
      </header>

      <div className="mx-auto max-w-6xl mt-8 space-y-8">
        {!data.isAdmin && (
          <section className="rounded-lg border border-border p-6 bg-card">
            <h2 className="text-lg font-semibold text-foreground">Geen beheerdersrechten</h2>
            {data.canBootstrap ? (
              <>
                <p className="mt-1 text-sm text-muted-foreground">
                  Er is nog geen beheerder. Registreer jezelf als eerste beheerder van dit project. Vervolgens werkt deze knop niet meer.
                </p>
                <button
                  onClick={() => bootstrap.mutate()}
                  disabled={bootstrap.isPending}
                  className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                >
                  {bootstrap.isPending ? "Bezig…" : "Word eerste beheerder"}
                </button>
                {bootstrap.error && <p className="mt-2 text-sm text-destructive">{(bootstrap.error as Error).message}</p>}
              </>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">
                Er is al een beheerder. Vraag een bestaande beheerder om je te machtigen.
              </p>
            )}
          </section>
        )}

        {data.isAdmin && data.project && data.summary && (
          <>
            <section className="rounded-lg border border-border p-6 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{data.project.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Automatisering:{" "}
                    <span className={data.project.automation_enabled ? "text-primary" : "text-muted-foreground"}>
                      {data.project.automation_enabled ? "AAN" : "UIT"}
                    </span>
                    {data.project.publication_stopped && (
                      <span className="ml-3 text-destructive">Gestopt: {data.project.stopped_reason}</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => automation.mutate(!data.project!.automation_enabled)}
                    disabled={automation.isPending}
                    className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
                  >
                    {data.project.automation_enabled ? "Zet automatisering UIT" : "Zet automatisering AAN"}
                  </button>
                  {!data.project.publication_stopped && (
                    <button
                      onClick={() => {
                        const r = prompt("Reden voor stoppen?");
                        if (r) stopMut.mutate(r);
                      }}
                      className="rounded-md border border-destructive text-destructive px-3 py-1.5 text-sm hover:bg-destructive/10"
                    >
                      Stop publicatie
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
                <Stat label="Totaal" value={data.summary.total} />
                <Stat label="Gepubliceerd" value={data.summary.published} tone="ok" />
                <Stat label="Gepland" value={data.summary.planned} />
                <Stat label="Bezig" value={data.summary.inProgress} />
                <Stat label="Vergrendeld" value={data.summary.locked} />
                <Stat label="Fout/geblokt" value={data.summary.failed + data.summary.blocked} tone="err" />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => importMut.mutate(true)}
                  disabled={importMut.isPending}
                  className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
                >
                  Importer dry-run
                </button>
                <button
                  onClick={() => {
                    if (confirm("180 records importeren of bijwerken?")) importMut.mutate(false);
                  }}
                  disabled={importMut.isPending}
                  className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground disabled:opacity-50"
                >
                  Importer uitvoeren
                </button>
                <button
                  onClick={() => backfill.mutate()}
                  disabled={backfill.isPending}
                  className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
                >
                  Backfill pilotartikelen 1–3
                </button>
              </div>
              {importMut.data && (
                <pre className="mt-3 rounded bg-muted p-3 text-xs overflow-auto max-h-40">
                  {JSON.stringify({ dryRun: importMut.data.dryRun, counts: importMut.data.counts }, null, 2)}
                </pre>
              )}
              {(importMut.error || backfill.error || automation.error || stopMut.error) && (
                <p className="mt-2 text-sm text-destructive">
                  {(importMut.error || backfill.error || automation.error || stopMut.error)?.message}
                </p>
              )}
            </section>

            <section className="rounded-lg border border-border bg-card overflow-hidden">
              <h2 className="p-4 text-lg font-semibold text-foreground border-b border-border">Artikelen (180)</h2>
              <div className="overflow-auto max-h-[600px]">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-muted text-left">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Titel</th>
                      <th className="p-2">Fase</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Live</th>
                      <th className="p-2 text-right">Acties</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.articles.map((a) => (
                      <ArticleRow
                        key={a.id}
                        row={a}
                        onReleaseLock={() => releaseLock.mutate(a.id)}
                        onMark={(newStatus, reason) => mark.mutate({ articleId: a.id, newStatus, reason })}
                      />
                    ))}
                    {data.articles.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-muted-foreground">
                          Geen artikelen. Draai de importer.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground">Laatste runs</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {data.recentRuns.map((r) => (
                    <li key={r.id} className="flex justify-between gap-2">
                      <span className="truncate">
                        <span className="text-muted-foreground">{new Date(r.started_at).toLocaleString("nl-NL")}</span> —{" "}
                        {r.current_step}
                      </span>
                      <span className="text-xs shrink-0">{r.final_status}</span>
                    </li>
                  ))}
                  {data.recentRuns.length === 0 && <li className="text-muted-foreground">Nog geen runs.</li>}
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground">Recente gebeurtenissen</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {data.recentEvents.map((e) => (
                    <li key={e.id}>
                      <span className="text-muted-foreground">{new Date(e.created_at).toLocaleString("nl-NL")}</span> —{" "}
                      <span>{e.event_type}</span>
                      {e.reason && <span className="text-muted-foreground"> ({e.reason})</span>}
                    </li>
                  ))}
                  {data.recentEvents.length === 0 && <li className="text-muted-foreground">Nog geen gebeurtenissen.</li>}
                </ul>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: "ok" | "err" }) {
  return (
    <div className="rounded border border-border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={`mt-1 text-2xl font-semibold ${
          tone === "ok" ? "text-primary" : tone === "err" ? "text-destructive" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ArticleRow({
  row,
  onReleaseLock,
  onMark,
}: {
  row: PublicationArticleRow;
  onReleaseLock: () => void;
  onMark: (s: "planned" | "failed" | "blocked" | "retry_pending", reason?: string) => void;
}) {
  const statusColor =
    row.status === "published"
      ? "text-primary"
      : row.status === "failed" || row.status === "blocked"
        ? "text-destructive"
        : "text-foreground";
  return (
    <tr className="border-t border-border">
      <td className="p-2 text-muted-foreground">{row.planning_number}</td>
      <td className="p-2">
        <div className="truncate max-w-md" title={row.original_title}>
          {row.final_title ?? row.original_title}
        </div>
        {row.last_error_summary && <div className="text-xs text-destructive">{row.last_error_summary}</div>}
      </td>
      <td className="p-2 text-xs text-muted-foreground">{row.phase.replace("phase_", "")}</td>
      <td className={`p-2 text-xs ${statusColor}`}>{row.status}</td>
      <td className="p-2">
        {row.live_url ? (
          <a href={row.live_url} target="_blank" rel="noreferrer" className="text-xs text-primary underline">
            open
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </td>
      <td className="p-2 text-right">
        <div className="inline-flex gap-1">
          {row.status === "locked" && (
            <button
              onClick={onReleaseLock}
              className="rounded border border-border px-2 py-0.5 text-xs hover:bg-accent"
              title="Vergrendeling opheffen"
            >
              unlock
            </button>
          )}
          {(row.status === "failed" || row.status === "blocked") && (
            <button
              onClick={() => onMark("planned", "admin_reset")}
              className="rounded border border-border px-2 py-0.5 text-xs hover:bg-accent"
            >
              reset
            </button>
          )}
          {row.status === "planned" && (
            <button
              onClick={() => {
                const r = prompt("Reden om te blokkeren?");
                if (r) onMark("blocked", r);
              }}
              className="rounded border border-border px-2 py-0.5 text-xs hover:bg-accent"
            >
              blokkeer
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
