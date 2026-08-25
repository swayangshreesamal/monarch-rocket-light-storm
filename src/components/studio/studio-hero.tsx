import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroOrbs } from "@/components/studio/hero-orbs";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const SCRIPT: { role: "user" | "agent" | "trace"; text: string; at: Step }[] = [
  { at: 0, role: "user", text: "Write three Google replies for Harbor HVAC. Five stars from Maya, two stars from James." },
  { at: 1, role: "trace", text: "Reading inbox · Harbor HVAC · 2 pending" },
  { at: 2, role: "agent", text: "Maya’s note is warm. I’ll keep the friendly draft short and local. James waited three days — recovery tone, no excuses, invite a call." },
  { at: 3, role: "trace", text: "Drafting friendly / professional / recovery" },
  { at: 4, role: "agent", text: "Three replies are on the canvas. Copy, edit, mark as posted. Nothing leaves this desk until you say so." },
  { at: 5, role: "trace", text: "Posted · Maya · pending · James" },
];

export function StudioHero() {
  const [step, setStep] = useState<Step>(0);
  const [bp, setBp] = useState<"SM" | "MD" | "LG">("LG");
  const [reduce, setReduce] = useState(false);
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) {
      setStep(6);
      return;
    }
    let s: Step = 0;
    const id = window.setInterval(() => {
      s = (s >= 6 ? 0 : ((s + 1) as Step));
      setStep(s);
    }, 1600);
    return () => window.clearInterval(id);
  }, []);

  function onMove(e: PointerEvent<HTMLElement>) {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }

  const visible = SCRIPT.filter((m) => m.at <= step);
  const status = step >= 5 ? "deployed" : step >= 3 ? "writing" : "idle";

  return (
    <section
      ref={stageRef}
      onPointerMove={onMove}
      className="relative isolate min-h-[calc(100dvh-3.5rem)] overflow-hidden border-b border-border"
    >
      <div className="pointer-events-none absolute inset-0 studio-grid opacity-40" />
      <div className="studio-spot pointer-events-none absolute inset-0" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      <div className="relative grid min-h-[calc(100dvh-3.5rem)] lg:grid-cols-[minmax(280px,380px)_1fr]">
        <aside className="flex max-h-[42vh] flex-col border-b border-border bg-bg/80 lg:max-h-none lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-subtle">Desk session</p>
              <p className="text-sm font-medium">Harbor HVAC · live</p>
            </div>
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
              v1
            </span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {visible.map((m, i) => (
              <div
                key={`${m.at}-${i}`}
                className={cn(
                  "stagger-in max-w-[95%] text-[13px] leading-relaxed",
                  m.role === "user" && "ml-auto rounded-lg border border-border bg-elevated px-3 py-2",
                  m.role === "agent" && "rounded-lg border border-border bg-surface px-3 py-2",
                  m.role === "trace" && "font-mono text-[11px] text-subtle",
                )}
              >
                {m.role === "trace" ? `› ${m.text}` : m.text}
              </div>
            ))}
            {step < 6 && !reduce ? (
              <p className="font-mono text-[11px]">
                <span className="shimmer">thinking</span>
              </p>
            ) : null}
          </div>
          <div className="border-t border-border p-4">
            <p className="font-display text-3xl leading-none tracking-tight">
              <span className="word-in">Open</span>{" "}
              <span className="word-in">the</span>{" "}
              <span className="word-in italic text-accent">desk.</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              One canvas for every client review. Three tones. You ship the reply.
            </p>
            <Link
              to="/login"
              className="hud-btn hud-btn-accent mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold"
            >
              Start free trial
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-2 text-center text-[11px] text-subtle">7-day trial · no card</p>
          </div>
        </aside>

        <div className="relative min-h-[52vh] lg:min-h-0">
          <HeroOrbs />
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
            {(["SM", "MD", "LG"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setBp(k)}
                className={cn(
                  "h-8 rounded-md px-2.5 font-mono text-[11px] transition-[background-color,color,transform] duration-150 active:scale-[0.96]",
                  bp === k ? "bg-elevated text-fg" : "text-subtle hover:text-fg",
                )}
              >
                {k}
              </button>
            ))}
            <span className="relative ml-2 h-4 overflow-hidden font-mono text-[11px] text-subtle">
              <span
                className={cn(
                  "status-swap inline-block",
                  status === "idle" ? "opacity-100" : "pointer-events-none absolute opacity-0 blur-[4px] scale-[0.25]",
                )}
              >
                idle
              </span>
              <span
                className={cn(
                  "status-swap inline-block",
                  status === "writing" ? "opacity-100" : "pointer-events-none absolute opacity-0 blur-[4px] scale-[0.25]",
                )}
              >
                writing
              </span>
              <span
                className={cn(
                  "status-swap inline-block text-accent",
                  status === "deployed" ? "opacity-100" : "pointer-events-none absolute opacity-0 blur-[4px] scale-[0.25]",
                )}
              >
                deployed
              </span>
            </span>
          </div>

          <div className="studio-stage absolute inset-0 z-[1] flex items-center justify-center overflow-hidden p-6 pt-16">
            <div
              className={cn("studio-bp", reduce && "transition-none")}
              style={{
                transform: bp === "SM" ? "scale(0.72)" : bp === "MD" ? "scale(0.86)" : "scale(1)",
              }}
            >
              <div className={cn("studio-zoom relative w-[min(560px,88vw)]", reduce && "animate-none")}>
                <div className="scan absolute inset-x-0 top-0 z-10 h-16" />
                <CanvasFrame step={step} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CanvasFrame({ step }: { step: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-2 font-mono text-[10px] text-subtle">inbox · Harbor HVAC</span>
      </div>
      <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[120px_1fr]">
        <div className="space-y-1 border-r border-border p-2 text-[11px] text-muted">
          {["Desk", "Clients", "Inbox", "Billing"].map((n, i) => (
            <div key={n} className={cn("rounded px-2 py-1", i === 2 && "bg-elevated text-fg")}>
              {n}
            </div>
          ))}
        </div>
        <div className="space-y-2 p-3">
          <ReviewRow
            name="Maya Chen"
            rating={5}
            body="On time. House is cool again."
            active={step >= 2}
            reply={step >= 4 ? "Maya — this made our day. Harbor HVAC is here whenever you need us." : null}
            posted={step >= 5}
          />
          <ReviewRow
            name="James Ortiz"
            rating={2}
            body="Waited three days for a callback."
            active={step >= 2}
            reply={
              step >= 4
                ? "James, we’re sorry this fell short. Call and ask for the owner — we’ll make it right."
                : null
            }
            posted={false}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewRow({
  name,
  rating,
  body,
  reply,
  active,
  posted,
}: {
  name: string;
  rating: number;
  body: string;
  reply: string | null;
  active: boolean;
  posted: boolean;
}) {
  return (
    <article
      className={cn(
        "rounded-md border p-2.5 transition-[background-color,border-color,transform] duration-300",
        active ? "border-border bg-elevated/70" : "border-border/60",
      )}
    >
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-medium">
          {name} · {rating}★
        </span>
        <span className={cn("font-mono", posted ? "text-accent" : "text-subtle")}>
          {posted ? "posted" : reply ? "ready" : "pending"}
        </span>
      </div>
      <p className="mt-1 text-[12px] text-muted">{body}</p>
      {reply ? (
        <p className="stagger-in mt-2 border-t border-border pt-2 text-[12px] text-fg">{reply}</p>
      ) : null}
    </article>
  );
}
