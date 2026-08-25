import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "Paste the review",
    body: "Drop in a Google review and the star rating. That’s the whole input.",
    hint: "Inbox",
  },
  {
    n: "02",
    title: "Pick a tone",
    body: "AI writes three replies: friendly, professional, recovery. Edit one line if you want.",
    hint: "Drafts",
  },
  {
    n: "03",
    title: "Copy and post",
    body: "Copy the reply back to Google. Mark it posted. Next client.",
    hint: "Done",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = nodes.indexOf(visible.target as HTMLElement);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.25, 0.6] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">How it works</p>
          <h2 className="clip-reveal font-display mt-3 text-4xl tracking-tight">
            Three steps. Then you’re done.
          </h2>
          <ol className="mt-8 hidden space-y-2 lg:block">
            {STEPS.map((s, i) => (
              <li key={s.n}>
                <a
                  href={`#step-${s.n}`}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors duration-200",
                    active === i ? "bg-elevated text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  <span className="font-mono text-[11px] text-accent">{s.n}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-6 hidden h-16 w-px overflow-hidden bg-border lg:block">
            <div
              className="w-full bg-accent transition-[height] duration-300"
              style={{ height: `${((active + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-12 space-y-8 lg:mt-0">
          {STEPS.map((s, i) => (
            <article
              key={s.n}
              id={`step-${s.n}`}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="view-rise hud-panel hud-corners min-h-[52vh] p-6 sm:p-10"
            >
              <p className="font-mono text-[11px] text-accent">{s.n} · {s.hint}</p>
              <h3 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">{s.title}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{s.body}</p>
              <StepVisual index={i} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mt-8 rounded-lg border border-border bg-bg p-4 text-sm">
        <p className="text-xs text-subtle">Maya Chen · 5.0</p>
        <p className="mt-2 text-fg">They showed up on time. The house is cool again.</p>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="mt-8 grid gap-2 sm:grid-cols-3">
        {["Friendly", "Professional", "Recovery"].map((t, i) => (
          <div
            key={t}
            className={cn(
              "rounded-lg border p-3 text-sm",
              i === 0 ? "border-accent/40 bg-elevated" : "border-border bg-bg",
            )}
          >
            <p className="font-mono text-[10px] text-subtle">{t}</p>
            <p className="mt-2 text-muted">Maya — this made our day.</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-8 flex items-center justify-between rounded-lg border border-border bg-bg p-4 text-sm">
      <p className="text-muted">Reply copied</p>
      <p className="font-mono text-[11px] text-accent">posted</p>
    </div>
  );
}
