import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as listClients, t as addClient } from "./data-DdNxWNbJ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as Label, l as Textarea, s as Input, u as Button } from "./router-es8Y-Hn8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients-CSHtbUpo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function ClientsPage() {
	const [clients, setClients] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	function load() {
		listClients().then(setClients).catch(() => setClients([]));
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "Clients"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Every location you reply for."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "accent",
				onClick: () => setOpen(true),
				children: "Add client"
			})]
		}),
		clients === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-muted",
			children: "Loading…"
		}) : clients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 rounded-lg border border-dashed border-border p-10 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No clients yet. Add the first location you manage."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 divide-y divide-border rounded-lg border border-border",
			children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/clients/$clientId",
				params: { clientId: String(c.id) },
				className: "flex flex-col gap-1 px-4 py-4 hover:bg-elevated/50 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: c.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [c.industry, c.location ? ` · ${c.location}` : ""]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm tabular-nums text-muted",
					children: [
						c.pending_count ?? 0,
						" pending",
						c.avg_rating != null ? ` · ${Number(c.avg_rating).toFixed(1)}★` : ""
					]
				})]
			}) }, c.id))
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientForm, {
			onClose: () => setOpen(false),
			onSave: async (payload) => {
				try {
					await addClient({ data: payload });
					setOpen(false);
					load();
				} catch (e) {
					toast.error(e instanceof Error ? e.message : "Could not add client");
				}
			}
		}) : null
	] });
}
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
//#endregion
export { ClientForm, ClientsPage as component };
