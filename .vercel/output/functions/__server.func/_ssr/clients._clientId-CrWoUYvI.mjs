import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getClient, f as updateClient, i as generateReplies, l as markResponded, n as addReview, r as deleteClient } from "./data-DdNxWNbJ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as Label, i as StatusBadge, l as Textarea, n as Route, r as ClientForm, s as Input, u as Button } from "./router-es8Y-Hn8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients._clientId-CrWoUYvI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientDetail() {
	const { clientId } = Route.useParams();
	const id = Number(clientId);
	const navigate = useNavigate();
	const [pack, setPack] = (0, import_react.useState)(null);
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	function load() {
		getClient({ data: { id } }).then(setPack);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [id]);
	if (!pack) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading…"
	});
	if (!pack.client) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Client not found."
	});
	const client = pack.client;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/app/clients",
			className: "text-sm text-muted hover:text-fg",
			children: "← Clients"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: client.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [client.industry, client.location ? ` · ${client.location}` : ""]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setEdit(true),
					children: "Edit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					size: "sm",
					onClick: () => {
						if (!confirm("Delete this client and their reviews?")) return;
						deleteClient({ data: { id } }).then(() => navigate({ to: "/app/clients" }));
					},
					children: "Delete"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: "Reviews"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "accent",
				size: "sm",
				onClick: () => setAddOpen(true),
				children: "Add review"
			})]
		}),
		pack.reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted",
			children: "Paste a Google review to generate replies."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-4",
			children: pack.reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewCard, {
				review: r,
				onChanged: load
			}, r.id))
		}),
		edit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientForm, {
			initial: client,
			onClose: () => setEdit(false),
			onSave: async (payload) => {
				await updateClient({ data: {
					id,
					...payload
				} });
				setEdit(false);
				load();
			}
		}) : null,
		addOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddReviewForm, {
			onClose: () => setAddOpen(false),
			onSave: async (payload) => {
				await addReview({ data: {
					client_id: id,
					...payload
				} });
				setAddOpen(false);
				load();
			}
		}) : null
	] });
}
function AddReviewForm({ onClose, onSave }) {
	const [reviewer_name, setName] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(5);
	const [review_text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-end bg-black/50 sm:place-items-center sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "w-full max-w-md rounded-t-xl border border-border bg-surface p-6 sm:rounded-xl",
			onSubmit: (e) => {
				e.preventDefault();
				setBusy(true);
				onSave({
					reviewer_name,
					rating,
					review_text
				}).finally(() => setBusy(false));
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Add review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Reviewer name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: reviewer_name,
							onChange: (e) => setName(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Rating" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: rating,
							onChange: (e) => setRating(Number(e.target.value)),
							className: "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
							children: [
								5,
								4,
								3,
								2,
								1
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: n,
								children: [n, " stars"]
							}, n))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Review text" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							required: true,
							value: review_text,
							onChange: (e) => setText(e.target.value)
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
function ReviewCard({ review, onChanged }) {
	const [options, setOptions] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(review.ai_response);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium",
					children: [
						review.reviewer_name || "Customer",
						" · ",
						review.rating,
						"★"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: review.status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: review.review_text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "accent",
					disabled: busy,
					onClick: () => {
						setBusy(true);
						generateReplies({ data: { review_id: review.id } }).then((res) => {
							setOptions(res.options);
							setDraft(res.options.friendly);
						}).catch((e) => toast.error(e instanceof Error ? e.message : "AI failed")).finally(() => setBusy(false));
					},
					children: busy ? "Writing…" : "Generate AI replies"
				})
			}),
			options ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [
					[
						["Friendly", options.friendly],
						["Professional", options.professional],
						[review.rating <= 3 ? "Recovery" : "Warm", options.third]
					].map(([label, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setDraft(text),
						className: `w-full rounded-md border p-3 text-left text-sm ${draft === text ? "border-accent/50 bg-elevated" : "border-border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] uppercase tracking-wider text-subtle",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-fg",
							children: text
						})]
					}, label)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: draft,
						onChange: (e) => setDraft(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => {
								navigator.clipboard.writeText(draft);
								toast.success("Copied");
							},
							children: "Copy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => {
								markResponded({ data: {
									id: review.id,
									ai_response: draft
								} }).then(() => {
									toast.success("Marked as responded");
									onChanged();
								});
							},
							children: "Mark as responded"
						})]
					})
				]
			}) : review.ai_response ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-fg",
				children: review.ai_response
			}) : null
		]
	});
}
//#endregion
export { ClientDetail as component };
