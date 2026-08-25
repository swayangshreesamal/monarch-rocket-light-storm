import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Crystal, Ring } from "@/components/studio/crystal";
import { playSfx, unlockAudio } from "@/lib/audio";

const KEY = "cb-boot";

export function BootLoader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(KEY) === "1") return;
    setShow(true);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1800);
      setPct(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function enter() {
    unlockAudio();
    playSfx("boot");
    sessionStorage.setItem(KEY, "1");
    setLeaving(true);
    window.setTimeout(() => setShow(false), 520);
  }

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[80] flex flex-col items-center justify-center bg-bg ${
        leaving ? "boot-leave" : ""
      }`}
    >
      <div className="hud-corners pointer-events-none absolute inset-6" />
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">System online</p>
      <div className="mt-6 h-44 w-44">
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            camera={{ position: [0, 0, 4.2], fov: 32 }}
          >
            <color attach="background" args={["#070708"]} />
            <ambientLight intensity={0.35} />
            <pointLight position={[2, 2, 3]} intensity={18} color="#7dcea0" />
            <pointLight position={[-3, -1, 2]} intensity={8} color="#ececec" />
            <Crystal scale={1.05} speed={0.55} />
            <Ring scale={1.05} speed={0.25} />
          </Canvas>
        </Suspense>
      </div>
      <p className="mt-8 font-display text-4xl tracking-tight">ClientBoost</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Press to enter the desk</p>
      <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-sm border border-border bg-elevated">
        <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 font-mono text-[11px] tabular-nums text-muted">LOAD {pct}%</p>
      <button type="button" onClick={enter} className="hud-btn hud-btn-accent mt-8 h-12 min-w-44 px-8 text-sm font-semibold tracking-wide">
        ENTER
      </button>
    </div>
  );
}
