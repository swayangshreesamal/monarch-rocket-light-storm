import { i as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { f as useRouterState, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as UserButton, n as RedirectToSignIn, o as useCurrentUserState, t as Mark } from "./site-header-B2U_98ah.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as Settings, c as CreditCard, i as Store, o as MessageSquare, s as LayoutDashboard } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-BOsNzLkC.js
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/app",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/app/clients",
		label: "Clients",
		icon: Store,
		exact: false
	},
	{
		to: "/app/reviews",
		label: "Reviews",
		icon: MessageSquare,
		exact: false
	},
	{
		to: "/app/billing",
		label: "Billing",
		icon: CreditCard,
		exact: false
	},
	{
		to: "/app/settings",
		label: "Settings",
		icon: Settings,
		exact: false
	}
];
function AppLayout() {
	const { user, isPending } = useCurrentUserState();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-40 animate-pulse rounded-md bg-elevated" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg lg:grid lg:grid-cols-[220px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "border-b border-border lg:border-b-0 lg:border-r",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-14 items-center gap-2 px-4 lg:h-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "ClientBoost"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-6",
				children: NAV.map((item) => {
					const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm whitespace-nowrap", active ? "hud-chip text-fg" : "text-muted hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
							className: "size-4",
							strokeWidth: 1.7
						}), item.label]
					}, item.to);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "flex h-14 items-center justify-end border-b border-border px-4 lg:h-16 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 px-4 py-6 lg:px-8 lg:py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AppLayout as component };
