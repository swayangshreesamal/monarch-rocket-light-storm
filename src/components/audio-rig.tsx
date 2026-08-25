import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  bindAudioUnlock,
  isMuted,
  playSfx,
  setMuted,
  subscribeAudio,
  unlockAudio,
} from "@/lib/audio";

export function AudioRig() {
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    setMutedState(isMuted());
    const unsub = subscribeAudio(() => setMutedState(isMuted()));
    const unvis = bindAudioUnlock();
    const onDown = (e: PointerEvent) => {
      unlockAudio();
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (el.closest("[data-no-sfx]")) return;
      if (el.closest("button, a, [role='button'], input, select, summary, label")) {
        playSfx("click");
      }
    };
    window.addEventListener("pointerdown", onDown);
    return () => {
      unsub();
      unvis();
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={muted ? "Unmute" : "Mute"}
      onClick={() => {
        unlockAudio();
        setMuted(!isMuted());
      }}
      data-no-sfx
      className="hud-btn fixed bottom-4 right-4 z-[75] grid size-11 place-items-center rounded-md"
    >
      {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
    </button>
  );
}
