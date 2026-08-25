import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { d as updateAgency, o as getDashboard } from "./data-DdNxWNbJ.mjs";
import { t as PLANS } from "./plans-JjWlUX6S.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { u as Button } from "./router-es8Y-Hn8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/billing-6tEkk2OC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BillingPage() {
	const [plan, setPlan] = (0, import_react.useState)("starter");
	const [clients, setClients] = (0, import_react.useState)(0);
	const [limit, setLimit] = (0, import_react.useState)(5);
	const [name, setName] = (0, import_react.useState)("");
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getDashboard().then((d) => {
			setPlan(d.agency.plan || "starter");
			setClients(d.stats.clients);
			setLimit(d.stats.clientLimit);
			setName(d.agency.agency_name);
			setLoaded(true);
		});
	}, []);
	if (!loaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl tracking-tight",
			children: "Billing"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [
				"Usage ",
				clients,
				limit == null ? " / unlimited" : ` / ${limit}`,
				" clients on ",
				plan,
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 lg:grid-cols-3",
			children: PLANS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: `flex flex-col rounded-xl border p-5 ${plan === p.id ? "border-accent/50 bg-elevated" : "border-border bg-surface"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: p.name
						}), plan === p.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-accent",
							children: "Current"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-display text-4xl",
						children: ["$", p.price]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: p.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						variant: plan === p.id ? "ghost" : p.featured ? "accent" : "subtle",
						disabled: busy !== null || plan === p.id,
						onClick: () => {
							setBusy(p.id);
							updateAgency({ data: {
								agency_name: name || "Agency",
								plan: p.id
							} }).then(() => {
								setPlan(p.id);
								setLimit(p.clientLimit);
								toast.success(`Moved to ${p.name}`);
							}).catch((e) => toast.error(e instanceof Error ? e.message : "Failed")).finally(() => setBusy(null));
						},
						children: plan === p.id ? "Active" : busy === p.id ? "Switching…" : `Switch to ${p.name}`
					})
				]
			}, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-lg text-xs text-subtle",
			children: "Card checkout is ready to connect to Stripe on deploy. In this desk, plan changes apply immediately so you can test limits."
		})
	] });
}
//#endregion
export { BillingPage as component };
