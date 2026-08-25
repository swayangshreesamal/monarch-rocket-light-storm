import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getDashboard, u as seedSample } from "./data-DdNxWNbJ.mjs";
import { u as Button } from "./router-es8Y-Hn8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-CALyd18U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	function load() {
		getDashboard().then(setData).catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-danger",
		children: error
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading desk…"
	});
	const { stats, recent, agency } = data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.16em] text-subtle",
					children: agency.agency_name || "Agency"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-4xl tracking-tight",
					children: "Today’s desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						stats.clients,
						stats.clientLimit == null ? " clients" : ` / ${stats.clientLimit} clients`,
						" · ",
						agency.plan,
						" plan"
					]
				})
			] }), stats.clients === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "accent",
				onClick: () => {
					seedSample().then(() => load());
				},
				children: "Load sample client"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/clients",
				className: "text-sm text-muted hover:text-fg",
				children: "Manage clients"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Clients",
					value: String(stats.clients)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Pending reviews",
					value: String(stats.pending)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Average rating",
					value: stats.avgRating == null ? "—" : stats.avgRating.toFixed(1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Response rate",
					value: `${stats.responseRate}%`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium text-muted",
				children: "Recent activity"
			}), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm text-muted",
				children: "No reviews yet. Add a client, then paste a Google review to generate replies."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-border rounded-lg border border-border",
				children: recent.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: r.client_name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								" · ",
								r.rating,
								"★ from ",
								r.reviewer_name || "a customer"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-1 text-sm text-muted",
						children: r.review_text
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
				}, r.id))
			})]
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl tabular-nums tracking-tight",
			children: value
		})]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex rounded-full px-2 py-0.5 text-[11px] ${status === "pending" ? "bg-elevated text-muted" : "bg-accent/15 text-accent"}`,
		children: status === "pending" ? "Pending" : "Responded"
	});
}
//#endregion
export { StatusBadge, Dashboard as component };
