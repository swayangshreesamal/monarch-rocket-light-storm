import { i as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SiteHeader, r as SiteFooter } from "./site-header-B2U_98ah.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BwiuBalT.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-5 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-subtle",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-4 text-5xl leading-[1.08] tracking-tight sm:text-6xl",
						children: "Software for the hour after the review lands."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 space-y-6 text-[17px] leading-relaxed text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Agencies already know reviews move local search. The work that actually fails is the reply: too slow, too generic, or never written at all." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ClientBoost is a quiet desk for that work. Paste a review, generate three tones, edit in your client’s voice, copy it back to Google. One inbox for every plumber, clinic, and studio you manage." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We built it for operators who bill for reputation, not for founders collecting screenshots. No marketplace. No bloated suite. Just the loop you already run, finished in minutes." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-3",
						children: [
							{
								k: "Who",
								v: "Agencies and freelance marketers"
							},
							{
								k: "What",
								v: "AI replies + a shared review inbox"
							},
							{
								k: "Why",
								v: "Local businesses pay for speed and tone"
							}
						].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-subtle",
							children: row.k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-fg",
							children: row.v
						})] }, row.k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "mt-12 inline-flex h-11 items-center rounded-md bg-fg px-5 text-sm font-medium text-bg hover:bg-fg/90",
						children: "Start free trial"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { About as component };
