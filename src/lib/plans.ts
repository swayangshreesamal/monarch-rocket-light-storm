export const PLANS = [
  {
    id: "starter" as const,
    name: "Starter",
    price: 49,
    clientLimit: 5,
    blurb: "For freelancers with a handful of local accounts.",
    features: ["Up to 5 clients", "AI replies in three tones", "Manual review inbox", "Email support"],
    featured: false,
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: 79,
    clientLimit: 25,
    blurb: "The desk most agencies actually live in.",
    features: ["Up to 25 clients", "White-label voice", "Shared inbox", "Priority support"],
    featured: true,
  },
  {
    id: "agency" as const,
    name: "Agency",
    price: 149,
    clientLimit: null,
    blurb: "Unlimited locations, one operating system.",
    features: ["Unlimited clients", "Everything in Pro", "Priority onboarding", "Early access features"],
    featured: false,
  },
];

export type PlanId = (typeof PLANS)[number]["id"];

export function clientLimitFor(plan: string): number | null {
  return PLANS.find((p) => p.id === plan)?.clientLimit ?? 5;
}
