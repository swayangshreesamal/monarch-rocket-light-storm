import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <div className="min-h-dvh bg-bg">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">About</p>
        <h1 className="font-display mt-4 text-5xl leading-[1.08] tracking-tight sm:text-6xl">
          Software for the hour after the review lands.
        </h1>
        <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-muted">
          <p>
            Agencies already know reviews move local search. The work that actually fails is the reply: too slow, too generic, or never written at all.
          </p>
          <p>
            ClientBoost is a quiet desk for that work. Paste a review, generate three tones, edit in your client’s voice, copy it back to Google. One inbox for every plumber, clinic, and studio you manage.
          </p>
          <p>
            We built it for operators who bill for reputation, not for founders collecting screenshots. No marketplace. No bloated suite. Just the loop you already run, finished in minutes.
          </p>
        </div>
        <div className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
          {[
            { k: "Who", v: "Agencies and freelance marketers" },
            { k: "What", v: "AI replies + a shared review inbox" },
            { k: "Why", v: "Local businesses pay for speed and tone" },
          ].map((row) => (
            <div key={row.k}>
              <p className="text-xs uppercase tracking-wider text-subtle">{row.k}</p>
              <p className="mt-2 text-sm text-fg">{row.v}</p>
            </div>
          ))}
        </div>
        <Link
          to="/login"
          className="mt-12 inline-flex h-11 items-center rounded-md bg-fg px-5 text-sm font-medium text-bg hover:bg-fg/90"
        >
          Start free trial
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
