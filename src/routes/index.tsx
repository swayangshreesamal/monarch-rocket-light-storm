import { Link, createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { StudioHero } from "@/components/studio/studio-hero";
import { HowItWorks } from "@/components/studio/how-it-works";
import { BootLoader } from "@/components/studio/boot-loader";
import { PLANS } from "@/lib/plans";

export const Route = createFileRoute("/")({ component: Home });

const TICKER = [
  "HVAC",
  "Dental",
  "Roofing",
  "Clinics",
  "Salons",
  "Law",
  "Gyms",
  "Restaurants",
  "Real estate",
];

function Home() {
  return (
    <div className="min-h-dvh bg-bg">
      <div className="scroll-progress" />
      <BootLoader />
      <SiteHeader />
      <main>
        <StudioHero />
        <Ticker />
        <HowItWorks />
        <Features />
        <Pricing />
      </main>
      <SiteFooter />
    </div>
  );
}

function Ticker() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden border-b border-border py-4">
      <div className="marquee-track gap-10 px-5 font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
        {row.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const items = [
    {
      k: "01",
      title: "Three tones, one click",
      body: "Friendly, professional, and recovery drafts that match the star rating — then you edit and copy.",
    },
    {
      k: "02",
      title: "A desk, not a pile of tabs",
      body: "Every client, every pending review, one inbox. Agencies stop living in Google Business Profile.",
    },
    {
      k: "03",
      title: "White-label by default",
      body: "Your agency name, your voice. Clients never need to know the software underneath.",
    },
  ];
  return (
    <section id="product" className="mx-auto max-w-6xl px-5 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Product</p>
      <h2 className="clip-reveal font-display mt-3 max-w-xl text-4xl tracking-tight sm:text-5xl">
        The hour after a review lands, finished.
      </h2>
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.k} className="view-rise bg-bg p-8">
            <p className="font-mono text-[11px] text-subtle">{item.k}</p>
            <h3 className="mt-4 text-lg font-medium tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 pb-28">
      <div className="mb-12 max-w-xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Pricing</p>
        <h2 className="clip-reveal font-display mt-3 text-4xl tracking-tight sm:text-5xl">
          Charge clients two hundred. Keep most of it.
        </h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <article
            key={plan.id}
            className={`view-rise hud-panel hud-corners flex flex-col p-6 transition-transform duration-300 hover:-translate-y-1 ${
              plan.featured ? "border-accent/40" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{plan.name}</h3>
              {plan.featured ? (
                <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] text-accent">
                  Popular
                </span>
              ) : null}
            </div>
            <p className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-5xl tracking-tight">${plan.price}</span>
              <span className="text-sm text-subtle">/mo</span>
            </p>
            <p className="mt-3 min-h-10 text-sm text-muted">{plan.blurb}</p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-fg">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/login"
              className={`mt-8 inline-flex h-12 items-center justify-center rounded-md text-sm font-semibold ${
                plan.featured ? "hud-btn hud-btn-accent" : "hud-btn"
              }`}
            >
              Start free trial
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
