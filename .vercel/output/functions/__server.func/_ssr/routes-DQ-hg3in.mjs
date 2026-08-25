import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, n as useFrame, t as Canvas } from "../_libs/@react-three/fiber+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SiteHeader, r as SiteFooter } from "./site-header-B2U_98ah.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { l as Check, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as PLANS } from "./plans-JjWlUX6S.mjs";
import { a as playSfx, o as unlockAudio } from "./router-es8Y-Hn8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DQ-hg3in.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Crystal({ position = [
	0,
	0,
	0
], scale = 1, speed = .35 }) {
	const ref = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		const g = ref.current;
		if (!g) return;
		g.rotation.y += d * speed;
		g.rotation.x += d * speed * .28;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#7dcea0",
			emissive: "#7dcea0",
			emissiveIntensity: .28,
			metalness: .45,
			roughness: .22
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			scale: 1.04,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#7dcea0",
				wireframe: true,
				transparent: true,
				opacity: .32
			})]
		})]
	});
}
function Ring({ position = [
	0,
	0,
	0
], scale = 1, speed = .2 }) {
	const ref = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		const g = ref.current;
		if (!g) return;
		g.rotation.z += d * speed;
		g.rotation.y -= d * speed * .4;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		position,
		scale,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				1.15,
				.035,
				12,
				64
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#ececec",
				emissive: "#7dcea0",
				emissiveIntensity: .12,
				metalness: .7,
				roughness: .3
			})]
		})
	});
}
function HeroOrbs() {
	const [ok, setOk] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		setOk(true);
	}, []);
	if (!ok) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-0 hidden lg:block",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-3 top-16 size-36",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
				scale: 1.15,
				speed: .28
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-8 right-4 size-40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mini, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
				scale: 1.05,
				speed: .2
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
				position: [
					.15,
					-.1,
					0
				],
				scale: .45,
				speed: .45
			})] })
		})]
	});
}
function Mini({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
			dpr: [1, 1.25],
			gl: {
				antialias: true,
				alpha: true
			},
			camera: {
				position: [
					0,
					0,
					3.4
				],
				fov: 32
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .3 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					position: [
						2,
						2,
						3
					],
					intensity: 10,
					color: "#7dcea0"
				}),
				children
			]
		})
	});
}
var SCRIPT = [
	{
		at: 0,
		role: "user",
		text: "Write three Google replies for Harbor HVAC. Five stars from Maya, two stars from James."
	},
	{
		at: 1,
		role: "trace",
		text: "Reading inbox · Harbor HVAC · 2 pending"
	},
	{
		at: 2,
		role: "agent",
		text: "Maya’s note is warm. I’ll keep the friendly draft short and local. James waited three days — recovery tone, no excuses, invite a call."
	},
	{
		at: 3,
		role: "trace",
		text: "Drafting friendly / professional / recovery"
	},
	{
		at: 4,
		role: "agent",
		text: "Three replies are on the canvas. Copy, edit, mark as posted. Nothing leaves this desk until you say so."
	},
	{
		at: 5,
		role: "trace",
		text: "Posted · Maya · pending · James"
	}
];
function StudioHero() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [bp, setBp] = (0, import_react.useState)("LG");
	const [reduce, setReduce] = (0, import_react.useState)(false);
	const stageRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduce(mq.matches);
		if (mq.matches) {
			setStep(6);
			return;
		}
		let s = 0;
		const id = window.setInterval(() => {
			s = s >= 6 ? 0 : s + 1;
			setStep(s);
		}, 1600);
		return () => window.clearInterval(id);
	}, []);
	function onMove(e) {
		const el = stageRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width * 100;
		const y = (e.clientY - r.top) / r.height * 100;
		el.style.setProperty("--mx", `${x}%`);
		el.style.setProperty("--my", `${y}%`);
	}
	const visible = SCRIPT.filter((m) => m.at <= step);
	const status = step >= 5 ? "deployed" : step >= 3 ? "writing" : "idle";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: stageRef,
		onPointerMove: onMove,
		className: "relative isolate min-h-[calc(100dvh-3.5rem)] overflow-hidden border-b border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 studio-grid opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "studio-spot pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid min-h-[calc(100dvh-3.5rem)] lg:grid-cols-[minmax(280px,380px)_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "flex max-h-[42vh] flex-col border-b border-border bg-bg/80 lg:max-h-none lg:border-b-0 lg:border-r",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-[0.16em] text-subtle",
								children: "Desk session"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Harbor HVAC · live"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted",
								children: "v1"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-3 overflow-y-auto px-4 py-4",
							children: [visible.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("stagger-in max-w-[95%] text-[13px] leading-relaxed", m.role === "user" && "ml-auto rounded-lg border border-border bg-elevated px-3 py-2", m.role === "agent" && "rounded-lg border border-border bg-surface px-3 py-2", m.role === "trace" && "font-mono text-[11px] text-subtle"),
								children: m.role === "trace" ? `› ${m.text}` : m.text
							}, `${m.at}-${i}`)), step < 6 && !reduce ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shimmer",
									children: "thinking"
								})
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-3xl leading-none tracking-tight",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "word-in",
											children: "Open"
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "word-in",
											children: "the"
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "word-in italic text-accent",
											children: "desk."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "One canvas for every client review. Three tones. You ship the reply."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/login",
									className: "hud-btn hud-btn-accent mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold",
									children: ["Start free trial", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-center text-[11px] text-subtle",
									children: "7-day trial · no card"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-[52vh] lg:min-h-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroOrbs, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute left-4 top-4 z-10 flex items-center gap-2",
							children: [[
								"SM",
								"MD",
								"LG"
							].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setBp(k),
								className: cn("h-8 rounded-md px-2.5 font-mono text-[11px] transition-[background-color,color,transform] duration-150 active:scale-[0.96]", bp === k ? "bg-elevated text-fg" : "text-subtle hover:text-fg"),
								children: k
							}, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative ml-2 h-4 overflow-hidden font-mono text-[11px] text-subtle",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("status-swap inline-block", status === "idle" ? "opacity-100" : "pointer-events-none absolute opacity-0 blur-[4px] scale-[0.25]"),
										children: "idle"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("status-swap inline-block", status === "writing" ? "opacity-100" : "pointer-events-none absolute opacity-0 blur-[4px] scale-[0.25]"),
										children: "writing"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("status-swap inline-block text-accent", status === "deployed" ? "opacity-100" : "pointer-events-none absolute opacity-0 blur-[4px] scale-[0.25]"),
										children: "deployed"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "studio-stage absolute inset-0 z-[1] flex items-center justify-center overflow-hidden p-6 pt-16",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("studio-bp", reduce && "transition-none"),
								style: { transform: bp === "SM" ? "scale(0.72)" : bp === "MD" ? "scale(0.86)" : "scale(1)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("studio-zoom relative w-[min(560px,88vw)]", reduce && "animate-none"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scan absolute inset-x-0 top-0 z-10 h-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasFrame, { step })]
								})
							})
						})
					]
				})]
			})
		]
	});
}
function CanvasFrame({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-lg border border-border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 border-b border-border px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 font-mono text-[10px] text-subtle",
					children: "inbox · Harbor HVAC"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[88px_1fr] sm:grid-cols-[120px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1 border-r border-border p-2 text-[11px] text-muted",
				children: [
					"Desk",
					"Clients",
					"Inbox",
					"Billing"
				].map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("rounded px-2 py-1", i === 2 && "bg-elevated text-fg"),
					children: n
				}, n))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
					name: "Maya Chen",
					rating: 5,
					body: "On time. House is cool again.",
					active: step >= 2,
					reply: step >= 4 ? "Maya — this made our day. Harbor HVAC is here whenever you need us." : null,
					posted: step >= 5
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
					name: "James Ortiz",
					rating: 2,
					body: "Waited three days for a callback.",
					active: step >= 2,
					reply: step >= 4 ? "James, we’re sorry this fell short. Call and ask for the owner — we’ll make it right." : null,
					posted: false
				})]
			})]
		})]
	});
}
function ReviewRow({ name, rating, body, reply, active, posted }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-md border p-2.5 transition-[background-color,border-color,transform] duration-300", active ? "border-border bg-elevated/70" : "border-border/60"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-medium",
					children: [
						name,
						" · ",
						rating,
						"★"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-mono", posted ? "text-accent" : "text-subtle"),
					children: posted ? "posted" : reply ? "ready" : "pending"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[12px] text-muted",
				children: body
			}),
			reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "stagger-in mt-2 border-t border-border pt-2 text-[12px] text-fg",
				children: reply
			}) : null
		]
	});
}
var STEPS = [
	{
		n: "01",
		title: "Paste the review",
		body: "Drop in a Google review and the star rating. That’s the whole input.",
		hint: "Inbox"
	},
	{
		n: "02",
		title: "Pick a tone",
		body: "AI writes three replies: friendly, professional, recovery. Edit one line if you want.",
		hint: "Drafts"
	},
	{
		n: "03",
		title: "Copy and post",
		body: "Copy the reply back to Google. Mark it posted. Next client.",
		hint: "Done"
	}
];
function HowItWorks() {
	const [active, setActive] = (0, import_react.useState)(0);
	const refs = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		const nodes = refs.current.filter(Boolean);
		const io = new IntersectionObserver((entries) => {
			const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (!visible) return;
			const i = nodes.indexOf(visible.target);
			if (i >= 0) setActive(i);
		}, {
			rootMargin: "-35% 0px -45% 0px",
			threshold: [.25, .6]
		});
		nodes.forEach((n) => io.observe(n));
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how",
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 py-20 lg:grid lg:grid-cols-[240px_1fr] lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:sticky lg:top-24 lg:self-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-subtle",
						children: "How it works"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "clip-reveal font-display mt-3 text-4xl tracking-tight",
						children: "Three steps. Then you’re done."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 hidden space-y-2 lg:block",
						children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `#step-${s.n}`,
							className: cn("flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors duration-200", active === i ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] text-accent",
								children: s.n
							}), s.title]
						}) }, s.n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 hidden h-16 w-px overflow-hidden bg-border lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full bg-accent transition-[height] duration-300",
							style: { height: `${(active + 1) / STEPS.length * 100}%` }
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 space-y-8 lg:mt-0",
				children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					id: `step-${s.n}`,
					ref: (el) => {
						refs.current[i] = el;
					},
					className: "view-rise hud-panel hud-corners min-h-[52vh] p-6 sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-accent",
							children: [
								s.n,
								" · ",
								s.hint
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-3xl tracking-tight sm:text-4xl",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-base leading-relaxed text-muted",
							children: s.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepVisual, { index: i })
					]
				}, s.n))
			})]
		})
	});
}
function StepVisual({ index }) {
	if (index === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 rounded-lg border border-border bg-bg p-4 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-subtle",
			children: "Maya Chen · 5.0"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-fg",
			children: "They showed up on time. The house is cool again."
		})]
	});
	if (index === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8 grid gap-2 sm:grid-cols-3",
		children: [
			"Friendly",
			"Professional",
			"Recovery"
		].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("rounded-lg border p-3 text-sm", i === 0 ? "border-accent/40 bg-elevated" : "border-border bg-bg"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] text-subtle",
				children: t
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Maya — this made our day."
			})]
		}, t))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 flex items-center justify-between rounded-lg border border-border bg-bg p-4 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Reply copied"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[11px] text-accent",
			children: "posted"
		})]
	});
}
var KEY = "cb-boot";
function BootLoader() {
	const [show, setShow] = (0, import_react.useState)(false);
	const [leaving, setLeaving] = (0, import_react.useState)(false);
	const [pct, setPct] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem(KEY) === "1") return;
		setShow(true);
		const start = performance.now();
		let raf = 0;
		const tick = (now) => {
			const t = Math.min(1, (now - start) / 1800);
			setPct(Math.round(t * 100));
			if (t < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);
	function enter() {
		unlockAudio();
		playSfx("boot");
		sessionStorage.setItem(KEY, "1");
		setLeaving(true);
		window.setTimeout(() => setShow(false), 520);
	}
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `fixed inset-0 z-[80] flex flex-col items-center justify-center bg-bg ${leaving ? "boot-leave" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hud-corners pointer-events-none absolute inset-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.28em] text-accent",
				children: "System online"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 h-44 w-44",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
						dpr: [1, 1.5],
						gl: {
							antialias: true,
							alpha: true
						},
						camera: {
							position: [
								0,
								0,
								4.2
							],
							fov: 32
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
								attach: "background",
								args: ["#070708"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .35 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
								position: [
									2,
									2,
									3
								],
								intensity: 18,
								color: "#7dcea0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
								position: [
									-3,
									-1,
									2
								],
								intensity: 8,
								color: "#ececec"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
								scale: 1.05,
								speed: .55
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
								scale: 1.05,
								speed: .25
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 font-display text-4xl tracking-tight",
				children: "ClientBoost"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle",
				children: "Press to enter the desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 h-1.5 w-48 overflow-hidden rounded-sm border border-border bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent transition-[width] duration-150",
					style: { width: `${pct}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-[11px] tabular-nums text-muted",
				children: [
					"LOAD ",
					pct,
					"%"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: enter,
				className: "hud-btn hud-btn-accent mt-8 h-12 min-w-44 px-8 text-sm font-semibold tracking-wide",
				children: "ENTER"
			})
		]
	});
}
var TICKER = [
	"HVAC",
	"Dental",
	"Roofing",
	"Clinics",
	"Salons",
	"Law",
	"Gyms",
	"Restaurants",
	"Real estate"
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scroll-progress" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootLoader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioHero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Ticker() {
	const row = [...TICKER, ...TICKER];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden border-b border-border py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee-track gap-10 px-5 font-mono text-[11px] uppercase tracking-[0.22em] text-subtle",
			children: row.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item }, `${item}-${i}`))
		})
	});
}
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "product",
		className: "mx-auto max-w-6xl px-5 py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.18em] text-subtle",
				children: "Product"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "clip-reveal font-display mt-3 max-w-xl text-4xl tracking-tight sm:text-5xl",
				children: "The hour after a review lands, finished."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3",
				children: [
					{
						k: "01",
						title: "Three tones, one click",
						body: "Friendly, professional, and recovery drafts that match the star rating — then you edit and copy."
					},
					{
						k: "02",
						title: "A desk, not a pile of tabs",
						body: "Every client, every pending review, one inbox. Agencies stop living in Google Business Profile."
					},
					{
						k: "03",
						title: "White-label by default",
						body: "Your agency name, your voice. Clients never need to know the software underneath."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "view-rise bg-bg p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: item.k
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-lg font-medium tracking-tight",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: item.body
						})
					]
				}, item.k))
			})
		]
	});
}
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "pricing",
		className: "mx-auto max-w-6xl px-5 pb-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-12 max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.18em] text-subtle",
				children: "Pricing"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "clip-reveal font-display mt-3 text-4xl tracking-tight sm:text-5xl",
				children: "Charge clients two hundred. Keep most of it."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 lg:grid-cols-3",
			children: PLANS.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: `view-rise hud-panel hud-corners flex flex-col p-6 transition-transform duration-300 hover:-translate-y-1 ${plan.featured ? "border-accent/40" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: plan.name
						}), plan.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] text-accent",
							children: "Popular"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 flex items-baseline gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-5xl tracking-tight",
							children: ["$", plan.price]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-subtle",
							children: "/mo"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 min-h-10 text-sm text-muted",
						children: plan.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 flex-1 space-y-2.5",
						children: plan.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2 text-sm text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-accent" }), f]
						}, f))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: `mt-8 inline-flex h-12 items-center justify-center rounded-md text-sm font-semibold ${plan.featured ? "hud-btn hud-btn-accent" : "hud-btn"}`,
						children: "Start free trial"
					})
				]
			}, plan.id))
		})]
	});
}
//#endregion
export { Home as component };
