import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Crystal, Ring } from "@/components/studio/crystal";

export function HeroOrbs() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOk(true);
  }, []);
  if (!ok) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block" aria-hidden>
      <div className="absolute left-3 top-16 size-36">
        <Mini>
          <Crystal scale={1.15} speed={0.28} />
        </Mini>
      </div>
      <div className="absolute bottom-8 right-4 size-40">
        <Mini>
          <Ring scale={1.05} speed={0.2} />
          <Crystal position={[0.15, -0.1, 0]} scale={0.45} speed={0.45} />
        </Mini>
      </div>
    </div>
  );
}

function Mini({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Canvas
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 3.4], fov: 32 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 3]} intensity={10} color="#7dcea0" />
        {children}
      </Canvas>
    </Suspense>
  );
}
