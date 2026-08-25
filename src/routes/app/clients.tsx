import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { addClient, listClients, type Client } from "@/lib/server/data";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/app/clients")({ component: ClientsPage });

const INDUSTRIES = [
  "HVAC",
  "Dental",
  "Restaurant",
  "Roofing",
  "Salon",
  "Law Firm",
  "Gym",
  "Real Estate",
  "Other",
];

function ClientsPage() {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [open, setOpen] = useState(false);

  function load() {
    listClients().then(setClients).catch(() => setClients([]));
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-tight">Clients</h1>
          <p className="mt-1 text-sm text-muted">Every location you reply for.</p>
        </div>
        <Button variant="accent" onClick={() => setOpen(true)}>
          Add client
        </Button>
      </div>

      {clients === null ? (
        <p className="mt-8 text-sm text-muted">Loading…</p>
      ) : clients.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted">No clients yet. Add the first location you manage.</p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-border rounded-lg border border-border">
          {clients.map((c) => (
            <li key={c.id}>
              <Link
                to="/app/clients/$clientId"
                params={{ clientId: String(c.id) }}
                className="flex flex-col gap-1 px-4 py-4 hover:bg-elevated/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted">
                    {c.industry}
                    {c.location ? ` · ${c.location}` : ""}
                  </p>
                </div>
                <p className="text-sm tabular-nums text-muted">
                  {c.pending_count ?? 0} pending
                  {c.avg_rating != null ? ` · ${Number(c.avg_rating).toFixed(1)}★` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {open ? (
        <ClientForm
          onClose={() => setOpen(false)}
          onSave={async (payload) => {
            try {
              await addClient({ data: payload });
              setOpen(false);
              load();
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "Could not add client");
            }
          }}
        />
      ) : null}
    </div>
  );
}

export function ClientForm({
  initial,
  onClose,
  onSave,
}: {
  initial?: Partial<Client>;
  onClose: () => void;
  onSave: (payload: {
    name: string;
    industry: string;
    location: string;
    gbp_url: string;
    notes: string;
  }) => Promise<void>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [industry, setIndustry] = useState(initial?.industry ?? "HVAC");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [gbp_url, setGbp] = useState(initial?.gbp_url ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [busy, setBusy] = useState(false);

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 p-0 sm:place-items-center sm:p-6">
      <form
        className="w-full max-w-md rounded-t-xl border border-border bg-surface p-6 sm:rounded-xl"
        onSubmit={(e) => {
          e.preventDefault();
          setBusy(true);
          void onSave({ name, industry, location, gbp_url, notes }).finally(() => setBusy(false));
        }}
      >
        <h2 className="text-lg font-medium">{initial?.id ? "Edit client" : "New client"}</h2>
        <div className="mt-5 space-y-3">
          <div>
            <Label htmlFor="cname">Business name</Label>
            <Input id="cname" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="ind">Industry</Label>
            <select
              id="ind"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
            >
              {INDUSTRIES.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="loc">City</Label>
            <Input id="loc" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="gbp">Google Business URL</Label>
            <Input id="gbp" value={gbp_url} onChange={(e) => setGbp(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" disabled={busy}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
