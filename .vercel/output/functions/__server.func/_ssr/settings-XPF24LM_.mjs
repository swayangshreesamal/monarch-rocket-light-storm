import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { d as updateAgency, o as getDashboard } from "./data-DdNxWNbJ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as Label, s as Input, u as Button } from "./router-es8Y-Hn8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-XPF24LM_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const [name, setName] = (0, import_react.useState)("");
	const [plan, setPlan] = (0, import_react.useState)("starter");
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getDashboard().then((d) => {
			setName(d.agency.agency_name);
			setPlan(d.agency.plan || "starter");
			setLoaded(true);
		});
	}, []);
	if (!loaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl tracking-tight",
			children: "Settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 space-y-5",
			onSubmit: (e) => {
				e.preventDefault();
				updateAgency({ data: {
					agency_name: name,
					plan
				} }).then(() => toast.success("Saved"));
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "an",
					children: "Agency name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "an",
					value: name,
					onChange: (e) => setName(e.target.value),
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "plan",
					children: "Plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					id: "plan",
					value: plan,
					onChange: (e) => setPlan(e.target.value),
					className: "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "starter",
							children: "Starter · $49"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "pro",
							children: "Pro · $79"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "agency",
							children: "Agency · $149"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "accent",
					children: "Save"
				})
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
