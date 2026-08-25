# ClientBoost

White-label review desk for marketing agencies.

Paste a Google review, generate three ready-to-post replies (friendly, professional, recovery), edit, copy, mark as posted. One inbox for every plumber, clinic, and studio you manage.

## Product

- **Landing** — cinematic studio: live desk session, 3D crystal, scroll-driven how-it-works, pricing
- **Auth** — Google, X, or email
- **Dashboard** — clients, pending reviews, response rate
- **Inbox** — filter by client / status / rating, AI drafts, copy, mark posted
- **Billing** — Starter $49 (5 clients) · Pro $79 (25) · Agency $149 (unlimited)
- **Sound** — boot sting + click SFX (mute in the corner)

## Stack

React 19 · TanStack Start · Tailwind v4 · Better Auth · Postgres / PGLite · Three.js (R3F) · Web Audio

## Plans

| Plan    | Price | Clients   |
|---------|-------|-----------|
| Starter | $49/mo | 5        |
| Pro     | $79/mo | 25       |
| Agency  | $149/mo | Unlimited |

## Setup

```bash
npm install
npm run dev
```

App runs on port `8080`.

```bash
npm run build      # production build
npm run typecheck
npm run preview    # serve the built app
```

### Environment

On deploy, set:

- `DATABASE_URL` — Postgres connection string (local/dev falls back to PGLite)
- Auth secrets used by Better Auth (injected on the Grok / Vercel deploy)

Optional: `XAI_API_KEY` for live AI reply generation. Without it, the desk still drafts from built-in fallbacks.

## App routes

| Path | What |
|------|------|
| `/` | Marketing studio |
| `/about` | About |
| `/login` | Sign in / sign up |
| `/app` | Dashboard |
| `/app/clients` | Client list |
| `/app/reviews` | Review inbox |
| `/app/billing` | Plan switch |
| `/app/settings` | Agency profile |

## License

Private. All rights reserved.
