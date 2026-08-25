import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { getDashboard, updateAgency } from "@/lib/server/data";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

function SettingsPage() {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<"starter" | "pro" | "agency">("starter");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getDashboard().then((d) => {
      setName(d.agency.agency_name);
      setPlan((d.agency.plan as typeof plan) || "starter");
      setLoaded(true);
    });
  }, []);

  if (!loaded) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-4xl tracking-tight">Settings</h1>
      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          void updateAgency({ data: { agency_name: name, plan } }).then(() =>
            toast.success("Saved"),
          );
        }}
      >
        <div>
          <Label htmlFor="an">Agency name</Label>
          <Input id="an" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="plan">Plan</Label>
          <select
            id="plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value as typeof plan)}
            className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
          >
            <option value="starter">Starter · $49</option>
            <option value="pro">Pro · $79</option>
            <option value="agency">Agency · $149</option>
          </select>
        </div>
        <Button type="submit" variant="accent">
          Save
        </Button>
      </form>
    </div>
  );
}
