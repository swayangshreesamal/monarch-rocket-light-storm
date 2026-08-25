import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { S as useRouter, _ as createFileRoute, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { Gt as literal, Jt as object, Qt as union, Zt as string, qt as number } from "../_libs/@better-auth/core+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as Volume2, r as TriangleAlert, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as auth } from "./server-BIM5dk-C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CEe5Gsir.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("hud-btn inline-flex items-center justify-center gap-2 font-medium disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", {
	variants: {
		variant: {
			primary: "hud-btn-light",
			accent: "hud-btn-accent",
			ghost: "bg-transparent text-fg",
			subtle: "",
			danger: "border-danger/40 text-danger"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-md",
			md: "h-11 px-5 text-sm rounded-md",
			lg: "h-12 px-6 text-[15px] rounded-lg"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/input-Bbty5DIk.js
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-muted", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-28 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-muted", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-xs font-medium text-muted", className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-es8Y-Hn8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var MUTE_KEY = "cb-mute";
var ctx = null;
var master = null;
var sfxBus = null;
var musicBus = null;
var pad = null;
var padGain = null;
var muted = false;
var unlocked = false;
var listeners = /* @__PURE__ */ new Set();
function notify() {
	listeners.forEach((fn) => fn());
}
function subscribeAudio(fn) {
	listeners.add(fn);
	return () => listeners.delete(fn);
}
function isMuted() {
	return muted;
}
function ensureGraph() {
	if (ctx) return;
	ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
	master = ctx.createGain();
	sfxBus = ctx.createGain();
	musicBus = ctx.createGain();
	sfxBus.gain.value = .55;
	musicBus.gain.value = .22;
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
function unlockAudio() {
	ensureGraph();
	if (!ctx || !master) return;
	if (ctx.state === "suspended") ctx.resume();
	unlocked = true;
	if (!muted) startPad();
	notify();
}
function setMuted(next) {
	ensureGraph();
	muted = next;
	try {
		localStorage.setItem(MUTE_KEY, next ? "1" : "0");
	} catch {}
	if (!master || !ctx) return;
	master.gain.setTargetAtTime(next ? 0 : 1, ctx.currentTime, .03);
	if (next) stopPad();
	else if (unlocked) startPad();
	notify();
}
function startPad() {
	if (!ctx || !musicBus || pad) return;
	const t = ctx.currentTime;
	padGain = ctx.createGain();
	padGain.gain.setValueAtTime(1e-4, t);
	padGain.gain.setTargetAtTime(.045, t, .4);
	pad = ctx.createOscillator();
	pad.type = "sine";
	pad.frequency.value = 110;
	const fifth = ctx.createOscillator();
	fifth.type = "sine";
	fifth.frequency.value = 164.81;
	const g2 = ctx.createGain();
	g2.gain.value = .5;
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
	pad._fifth = fifth;
}
function stopPad() {
	if (!ctx || !pad || !padGain) {
		pad = null;
		padGain = null;
		return;
	}
	const t = ctx.currentTime;
	padGain.gain.setTargetAtTime(1e-4, t, .08);
	const extra = pad._fifth;
	try {
		pad.stop(t + .3);
		extra?.stop(t + .3);
	} catch {}
	pad = null;
	padGain = null;
}
function envGain(bus, peak, attack, release) {
	if (!ctx) return null;
	const g = ctx.createGain();
	const t = ctx.currentTime;
	g.gain.setValueAtTime(1e-4, t);
	g.gain.exponentialRampToValueAtTime(peak, t + attack);
	g.gain.exponentialRampToValueAtTime(1e-4, t + attack + release);
	g.connect(bus);
	return g;
}
function playSfx(kind) {
	if (muted) return;
	ensureGraph();
	if (!ctx || !sfxBus || !musicBus) return;
	if (ctx.state === "suspended") return;
	const t = ctx.currentTime;
	const rate = 1 + (Math.random() * 2 - 1) * .06;
	if (kind === "click") {
		const o = ctx.createOscillator();
		o.type = "square";
		o.frequency.setValueAtTime(920 * rate, t);
		o.frequency.exponentialRampToValueAtTime(180, t + .05);
		const g = envGain(sfxBus, .09, .004, .05);
		if (!g) return;
		o.connect(g);
		o.start(t);
		o.stop(t + .07);
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
		const g = envGain(sfxBus, .03, .003, .03);
		if (!g) return;
		o.connect(g);
		o.start(t);
		o.stop(t + .04);
		o.onended = () => {
			o.disconnect();
			g.disconnect();
		};
		return;
	}
	if (kind === "confirm") {
		[
			523.25,
			659.25,
			783.99
		].forEach((f, i) => {
			const o = ctx.createOscillator();
			o.type = "triangle";
			o.frequency.value = f;
			const g = ctx.createGain();
			const start = t + i * .055;
			g.gain.setValueAtTime(1e-4, start);
			g.gain.exponentialRampToValueAtTime(.08, start + .02);
			g.gain.exponentialRampToValueAtTime(1e-4, start + .18);
			o.connect(g);
			g.connect(sfxBus);
			o.start(start);
			o.stop(start + .2);
			o.onended = () => {
				o.disconnect();
				g.disconnect();
			};
		});
		return;
	}
	[
		261.63,
		329.63,
		392,
		523.25,
		392,
		659.25
	].forEach((f, i) => {
		const o = ctx.createOscillator();
		o.type = "triangle";
		o.frequency.value = f;
		const g = ctx.createGain();
		const start = t + i * .09;
		g.gain.setValueAtTime(1e-4, start);
		g.gain.exponentialRampToValueAtTime(.1, start + .02);
		g.gain.exponentialRampToValueAtTime(1e-4, start + .22);
		o.connect(g);
		g.connect(musicBus);
		o.start(start);
		o.stop(start + .24);
		o.onended = () => {
			o.disconnect();
			g.disconnect();
		};
	});
}
function bindAudioUnlock() {
	const onVis = () => {
		if (document.visibilityState === "visible" && ctx?.state === "suspended") ctx.resume();
	};
	document.addEventListener("visibilitychange", onVis);
	return () => document.removeEventListener("visibilitychange", onVis);
}
function AudioRig() {
	const [muted, setMutedState] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMutedState(isMuted());
		const unsub = subscribeAudio(() => setMutedState(isMuted()));
		const unvis = bindAudioUnlock();
		const onDown = (e) => {
			unlockAudio();
			const el = e.target;
			if (!el) return;
			if (el.closest("[data-no-sfx]")) return;
			if (el.closest("button, a, [role='button'], input, select, summary, label")) playSfx("click");
		};
		window.addEventListener("pointerdown", onDown);
		return () => {
			unsub();
			unvis();
			window.removeEventListener("pointerdown", onDown);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": muted ? "Unmute" : "Mute",
		onClick: () => {
			unlockAudio();
			setMuted(!isMuted());
		},
		"data-no-sfx": true,
		className: "hud-btn fixed bottom-4 right-4 z-[75] grid size-11 place-items-center rounded-md",
		children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
	});
}
var styles_default = "/assets/styles-BPyO0Ojf.css";
var APP_NAME = "ClientBoost";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "White-label review management for agencies. AI writes three ready-to-post replies for every Google review."
			},
			{
				name: "theme-color",
				content: "#08090b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg min-h-dvh",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioRig, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-right",
					toastOptions: { style: {
						background: "#171a1e",
						border: "1px solid #23282e",
						color: "#eef1f4"
					} }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-DQ-hg3in.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./about-BwiuBalT.mjs");
var Route$9 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./app-BOsNzLkC.mjs");
var Route$8 = createFileRoute("/app")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./login-B0eA9-1X.mjs");
var Route$7 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./app-CALyd18U.mjs");
var Route$6 = createFileRoute("/app/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex rounded-full px-2 py-0.5 text-[11px] ${status === "pending" ? "bg-elevated text-muted" : "bg-accent/15 text-accent"}`,
		children: status === "pending" ? "Pending" : "Responded"
	});
}
var $$splitComponentImporter$4 = () => import("./billing-6tEkk2OC.mjs");
var Route$5 = createFileRoute("/app/billing")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./clients-CSHtbUpo.mjs");
var Route$4 = createFileRoute("/app/clients")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var INDUSTRIES = [
	"HVAC",
	"Dental",
	"Restaurant",
	"Roofing",
	"Salon",
	"Law Firm",
	"Gym",
	"Real Estate",
	"Other"
];
function ClientForm({ initial, onClose, onSave }) {
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [industry, setIndustry] = (0, import_react.useState)(initial?.industry ?? "HVAC");
	const [location, setLocation] = (0, import_react.useState)(initial?.location ?? "");
	const [gbp_url, setGbp] = (0, import_react.useState)(initial?.gbp_url ?? "");
	const [notes, setNotes] = (0, import_react.useState)(initial?.notes ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-end bg-black/50 p-0 sm:place-items-center sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "w-full max-w-md rounded-t-xl border border-border bg-surface p-6 sm:rounded-xl",
			onSubmit: (e) => {
				e.preventDefault();
				setBusy(true);
				onSave({
					name,
					industry,
					location,
					gbp_url,
					notes
				}).finally(() => setBusy(false));
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: initial?.id ? "Edit client" : "New client"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cname",
							children: "Business name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cname",
							required: true,
							value: name,
							onChange: (e) => setName(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "ind",
							children: "Industry"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "ind",
							value: industry,
							onChange: (e) => setIndustry(e.target.value),
							className: "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
							children: INDUSTRIES.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: i }, i))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "loc",
							children: "City"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "loc",
							value: location,
							onChange: (e) => setLocation(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "gbp",
							children: "Google Business URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "gbp",
							value: gbp_url,
							onChange: (e) => setGbp(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: onClose,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "accent",
						disabled: busy,
						children: "Save"
					})]
				})
			]
		})
	});
}
var $$splitComponentImporter$2 = () => import("./reviews-BclemVsa.mjs");
var Route$3 = createFileRoute("/app/reviews")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./settings-XPF24LM_.mjs");
var Route$2 = createFileRoute("/app/settings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var Route$1 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var $$splitComponentImporter = () => import("./clients._clientId-CrWoUYvI.mjs");
var Route = createFileRoute("/app/clients/$clientId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var AboutRoute = Route$9.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$11
});
var AppRoute = Route$8.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$11
});
var LoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$11
});
var AppIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppBillingRoute = Route$5.update({
	id: "/billing",
	path: "/billing",
	getParentRoute: () => AppRoute
});
var AppClientsRoute = Route$4.update({
	id: "/clients",
	path: "/clients",
	getParentRoute: () => AppRoute
});
var AppReviewsRoute = Route$3.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var ApiAuthSplatRoute = Route$1.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$11
});
var AppClientsRouteChildren = { AppClientsClientIdRoute: Route.update({
	id: "/$clientId",
	path: "/$clientId",
	getParentRoute: () => AppClientsRoute
}) };
var AppRouteChildren = {
	AppBillingRoute,
	AppClientsRoute: AppClientsRoute._addFileChildren(AppClientsRouteChildren),
	AppReviewsRoute,
	AppSettingsRoute,
	AppIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-6xl text-fg",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "That page isn’t here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-6 inline-block text-sm text-accent hover:underline",
				children: "Go home"
			})
		] })
	});
}
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound
	});
}
//#endregion
export { playSfx as a, Label as c, StatusBadge as i, Textarea as l, Route as n, unlockAudio as o, ClientForm as r, Input as s, router_exports as t, Button as u };
