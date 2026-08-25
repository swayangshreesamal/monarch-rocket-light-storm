const MUTE_KEY = "cb-mute";

type Kind = "click" | "hover" | "confirm" | "boot";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfxBus: GainNode | null = null;
let musicBus: GainNode | null = null;
let pad: OscillatorNode | null = null;
let padGain: GainNode | null = null;
let muted = false;
let unlocked = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribeAudio(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function isMuted() {
  return muted;
}

export function isUnlocked() {
  return unlocked;
}

function ensureGraph() {
  if (ctx) return;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC({ latencyHint: "interactive" });
  master = ctx.createGain();
  sfxBus = ctx.createGain();
  musicBus = ctx.createGain();
  sfxBus.gain.value = 0.55;
  musicBus.gain.value = 0.22;
  sfxBus.connect(master);
  musicBus.connect(master);
  master.connect(ctx.destination);
  try {
    muted = localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    muted = false;
  }
  master.gain.value = muted ? 0 : 1;
}

export function unlockAudio() {
  ensureGraph();
  if (!ctx || !master) return;
  if (ctx.state === "suspended") void ctx.resume();
  unlocked = true;
  if (!muted) startPad();
  notify();
}

export function setMuted(next: boolean) {
  ensureGraph();
  muted = next;
  try {
    localStorage.setItem(MUTE_KEY, next ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (!master || !ctx) return;
  master.gain.setTargetAtTime(next ? 0 : 1, ctx.currentTime, 0.03);
  if (next) stopPad();
  else if (unlocked) startPad();
  notify();
}

export function toggleMute() {
  setMuted(!muted);
}

function startPad() {
  if (!ctx || !musicBus || pad) return;
  const t = ctx.currentTime;
  padGain = ctx.createGain();
  padGain.gain.setValueAtTime(0.0001, t);
  padGain.gain.setTargetAtTime(0.045, t, 0.4);
  pad = ctx.createOscillator();
  pad.type = "sine";
  pad.frequency.value = 110;
  const fifth = ctx.createOscillator();
  fifth.type = "sine";
  fifth.frequency.value = 164.81;
  const g2 = ctx.createGain();
  g2.gain.value = 0.5;
  pad.connect(padGain);
  fifth.connect(g2);
  g2.connect(padGain);
  padGain.connect(musicBus);
  pad.start(t);
  fifth.start(t);
  pad.onended = () => {
    fifth.disconnect();
    g2.disconnect();
  };
  (pad as OscillatorNode & { _fifth?: OscillatorNode })._fifth = fifth;
}

function stopPad() {
  if (!ctx || !pad || !padGain) {
    pad = null;
    padGain = null;
    return;
  }
  const t = ctx.currentTime;
  padGain.gain.setTargetAtTime(0.0001, t, 0.08);
  const extra = (pad as OscillatorNode & { _fifth?: OscillatorNode })._fifth;
  try {
    pad.stop(t + 0.3);
    extra?.stop(t + 0.3);
  } catch {
    /* already stopped */
  }
  pad = null;
  padGain = null;
}

function envGain(bus: GainNode, peak: number, attack: number, release: number) {
  if (!ctx) return null;
  const g = ctx.createGain();
  const t = ctx.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  g.connect(bus);
  return g;
}

export function playSfx(kind: Kind) {
  if (muted) return;
  ensureGraph();
  if (!ctx || !sfxBus || !musicBus) return;
  if (ctx.state === "suspended") return;
  const t = ctx.currentTime;
  const rate = 1 + (Math.random() * 2 - 1) * 0.06;

  if (kind === "click") {
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.setValueAtTime(920 * rate, t);
    o.frequency.exponentialRampToValueAtTime(180, t + 0.05);
    const g = envGain(sfxBus, 0.09, 0.004, 0.05);
    if (!g) return;
    o.connect(g);
    o.start(t);
    o.stop(t + 0.07);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
    };
    return;
  }

  if (kind === "hover") {
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = 1400 * rate;
    const g = envGain(sfxBus, 0.03, 0.003, 0.03);
    if (!g) return;
    o.connect(g);
    o.start(t);
    o.stop(t + 0.04);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
    };
    return;
  }

  if (kind === "confirm") {
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((f, i) => {
      const o = ctx!.createOscillator();
      o.type = "triangle";
      o.frequency.value = f;
      const g = ctx!.createGain();
      const start = t + i * 0.055;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.08, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
      o.connect(g);
      g.connect(sfxBus!);
      o.start(start);
      o.stop(start + 0.2);
      o.onended = () => {
        o.disconnect();
        g.disconnect();
      };
    });
    return;
  }

  const melody = [261.63, 329.63, 392.0, 523.25, 392.0, 659.25];
  melody.forEach((f, i) => {
    const o = ctx!.createOscillator();
    o.type = "triangle";
    o.frequency.value = f;
    const g = ctx!.createGain();
    const start = t + i * 0.09;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.1, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
    o.connect(g);
    g.connect(musicBus!);
    o.start(start);
    o.stop(start + 0.24);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
    };
  });
}

export function bindAudioUnlock() {
  const onVis = () => {
    if (document.visibilityState === "visible" && ctx?.state === "suspended") {
      void ctx.resume();
    }
  };
  document.addEventListener("visibilitychange", onVis);
  return () => document.removeEventListener("visibilitychange", onVis);
}
