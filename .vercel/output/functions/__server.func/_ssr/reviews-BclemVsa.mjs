import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as listReviews } from "./data-DdNxWNbJ.mjs";
import { i as StatusBadge } from "./router-es8Y-Hn8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-BclemVsa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReviewsInbox() {
	const [rows, setRows] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("all");
	const [rating, setRating] = (0, import_react.useState)("all");
	(0, import_react.useEffect)(() => {
		listReviews().then(setRows).catch(() => setRows([]));
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		if (!rows) return [];
		return rows.filter((r) => {
			if (status !== "all" && r.status !== status) return false;
			if (rating !== "all" && String(r.rating) !== rating) return false;
			return true;
		});
	}, [
		rows,
		status,
		rating
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl tracking-tight",
			children: "Inbox"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Every review across your clients."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap gap-2",
			children: [[
				"all",
				"pending",
				"responded"
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setStatus(s),
				className: `h-9 rounded-md px-3 text-sm capitalize ${status === s ? "bg-elevated text-fg" : "text-muted hover:text-fg"}`,
				children: s
			}, s)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: rating,
				onChange: (e) => setRating(e.target.value),
				className: "h-9 rounded-md border border-border bg-surface px-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "all",
					children: "All ratings"
				}), [
					5,
					4,
					3,
					2,
					1
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: String(n),
					children: [n, " stars"]
				}, n))]
			})]
		}),
		rows === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-muted",
			children: "Loading…"
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-muted",
			children: "Nothing in this filter."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-border rounded-lg border border-border",
			children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/clients/$clientId",
				params: { clientId: String(r.client_id) },
				className: "block px-4 py-4 hover:bg-elevated/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [
							r.client_name,
							" · ",
							r.rating,
							"★"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-sm text-muted",
					children: r.review_text
				})]
			}) }, r.id))
		})
	] });
}
//#endregion
export { ReviewsInbox as component };
