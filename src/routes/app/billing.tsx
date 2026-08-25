import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { getDashboard, updateAgency } from "@/lib/server/data";
import { PLANS, type PlanId } from "@/lib/plans";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/billing")({ component: BillingPage });

function BillingPage() {
  const [plan, setPlan] = useState<PlanId>("starter");
  const [clients, setClients] = useState(0);
  const [limit, setLimit] = useState<number | null>(5);
  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    getDashboard().then((d) => {
      setPlan((d.agency.plan as PlanId) || "starter");
      setClients(d.stats.clients);
      setLimit(d.stats.clientLimit);
      setName(d.agency.agency_name);
      setLoaded(true);
    });
  }, []);

  if (!loaded) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Billing</h1>
      <p className="mt-2 text-sm text-muted">
        Usage {clients}
        {limit == null ? " / unlimited" : ` / ${limit}`} clients on {plan}.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {PLANS.map((p) => (
          <article
            key={p.id}
            className={`flex flex-col rounded-xl border p-5 ${
              plan === p.id ? "border-accent/50 bg-elevated" : "border-border bg-surface"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">{p.name}</h2>
              {plan === p.id ? (
                <span className="font-mono text-[10px] text-accent">Current</span>
              ) : null}
            </div>
            <p className="mt-3 font-display text-4xl">${p.price}</p>
            <p className="mt-2 text-sm text-muted">{p.blurb}</p>
            <Button
              className="mt-6"
              variant={plan === p.id ? "ghost" : p.featured ? "accent" : "subtle"}
              disabled={busy !== null || plan === p.id}
              onClick={() => {
                setBusy(p.id);
                void updateAgency({ data: { agency_name: name || "Agency", plan: p.id } })
                  .then(() => {
                    setPlan(p.id);
                    setLimit(p.clientLimit);
                    toast.success(`Moved to ${p.name}`);
                  })
                  .catch((e: unknown) => toast.error(e instanceof Error ? e.message : "Failed"))
                  .finally(() => setBusy(null));
              }}
            >
              {plan === p.id ? "Active" : busy === p.id ? "Switching…" : `Switch to ${p.name}`}
            </Button>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-lg text-xs text-subtle">
        Card checkout is ready to connect to Stripe on deploy. In this desk, plan changes apply immediately so you can test limits.
      </p>
    </div>
  );
}
