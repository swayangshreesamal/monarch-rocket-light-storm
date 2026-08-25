import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { getDashboard, seedSample, type Review } from "@/lib/server/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/")({ component: Dashboard });

function Dashboard() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getDashboard>> | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    getDashboard()
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Failed to load"));
  }

  useEffect(() => {
    load();
  }, []);

  if (error) return <p className="text-sm text-danger">{error}</p>;
  if (!data) return <p className="text-sm text-muted">Loading desk…</p>;

  const { stats, recent, agency } = data;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-subtle">{agency.agency_name || "Agency"}</p>
          <h1 className="font-display mt-1 text-4xl tracking-tight">Today’s desk</h1>
          <p className="mt-1 text-sm text-muted">
            {stats.clients}
            {stats.clientLimit == null ? " clients" : ` / ${stats.clientLimit} clients`} · {agency.plan} plan
          </p>
        </div>
        {stats.clients === 0 ? (
          <Button
            variant="accent"
            onClick={() => {
              void seedSample().then(() => load());
            }}
          >
            Load sample client
          </Button>
        ) : (
          <Link to="/app/clients" className="text-sm text-muted hover:text-fg">
            Manage clients
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Clients" value={String(stats.clients)} />
        <Stat label="Pending reviews" value={String(stats.pending)} />
        <Stat label="Average rating" value={stats.avgRating == null ? "—" : stats.avgRating.toFixed(1)} />
        <Stat label="Response rate" value={`${stats.responseRate}%`} />
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-medium text-muted">Recent activity</h2>
        {recent.length === 0 ? (
          <p className="mt-4 max-w-md text-sm text-muted">
            No reviews yet. Add a client, then paste a Google review to generate replies.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-lg border border-border">
            {recent.map((r) => (
              <li key={r.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{r.client_name}</span>
                    <span className="text-muted"> · {r.rating}★ from {r.reviewer_name || "a customer"}</span>
                  </p>
                  <p className="line-clamp-1 text-sm text-muted">{r.review_text}</p>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs text-subtle">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums tracking-tight">{value}</p>
    </div>
  );
}

export function StatusBadge({ status }: { status: Review["status"] }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] ${
        status === "pending" ? "bg-elevated text-muted" : "bg-accent/15 text-accent"
      }`}
    >
      {status === "pending" ? "Pending" : "Responded"}
    </span>
  );
}
