import { useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Mark } from "@/components/site-header";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0],
        });
        if (res.error) throw new Error(res.error.message || "Could not create account");
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message || "Could not sign in");
      }
      window.location.assign("/app");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-5 py-16">
      <div className="hud-panel hud-corners w-full max-w-sm p-6 sm:p-8">
        <Link to="/" className="mb-10 flex items-center gap-2">
          <Mark />
          <span className="text-sm font-medium">ClientBoost</span>
        </Link>
        <h1 className="font-display text-4xl tracking-tight">
          {mode === "in" ? "Welcome back." : "Open an agency desk."}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {mode === "in" ? "Sign in to your review inbox." : "Seven days free. No card."}
        </p>

        {!authEnabled ? (
          <p className="mt-8 text-sm text-muted">Sign-in is disabled.</p>
        ) : (
          <>
            <div className="mt-8 grid gap-2">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: "/app" })}
                  className="hud-btn h-11 rounded-md text-sm font-medium"
                >
                  Continue with {p.label}
                </button>
              ))}
            </div>
            <div className="my-6 flex items-center gap-3 text-xs text-subtle">
              <span className="h-px flex-1 bg-border" />
              or email
              <span className="h-px flex-1 bg-border" />
            </div>
            <form onSubmit={onEmail} className="space-y-3">
              {mode === "up" ? (
                <div>
                  <Label htmlFor="name">Agency name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Northline" />
                </div>
              ) : null}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Working…" : mode === "in" ? "Sign in" : "Create account"}
              </Button>
            </form>
            <button
              type="button"
              className="mt-5 text-sm text-muted hover:text-fg"
              onClick={() => {
                setMode(mode === "in" ? "up" : "in");
                setError(null);
              }}
            >
              {mode === "in" ? "Need an account? Create one" : "Already have an account? Sign in"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
