import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { clientLimitFor } from "@/lib/plans";
import { z } from "zod";

export type Agency = {
  user_id: string;
  agency_name: string;
  brand_color: string;
  plan: string;
};

export type Client = {
  id: number;
  user_id: string;
  name: string;
  industry: string;
  location: string;
  gbp_url: string;
  notes: string;
  status: string;
  created_at: string;
  pending_count?: number;
  avg_rating?: number | null;
};

export type Review = {
  id: number;
  user_id: string;
  client_id: number;
  reviewer_name: string;
  rating: number;
  review_text: string;
  ai_response: string;
  status: string;
  created_at: string;
  client_name?: string;
};

async function ensureAgency(userId: string, displayName?: string | null) {
  const sql = await getSql();
  const existing = await sql<Agency>`select user_id, agency_name, brand_color, plan from agencies where user_id = ${userId}`;
  if (existing[0]) return existing[0];
  const name = displayName?.trim() || "Your agency";
  await sql`insert into agencies (user_id, agency_name) values (${userId}, ${name})`;
  const created = await sql<Agency>`select user_id, agency_name, brand_color, plan from agencies where user_id = ${userId}`;
  return created[0];
}

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const agency = await ensureAgency(context.userId);
    const clients = await sql<{ count: number }>`select count(*)::int as count from clients where user_id = ${context.userId}`;
    const pending = await sql<{ count: number }>`select count(*)::int as count from reviews where user_id = ${context.userId} and status = 'pending'`;
    const avg = await sql<{ avg: string | null }>`select avg(rating)::text as avg from reviews where user_id = ${context.userId}`;
    const responded = await sql<{ count: number }>`select count(*)::int as count from reviews where user_id = ${context.userId} and status = 'responded'`;
    const totalReviews = await sql<{ count: number }>`select count(*)::int as count from reviews where user_id = ${context.userId}`;
    const recent = await sql<Review>`
      select r.id, r.user_id, r.client_id, r.reviewer_name, r.rating, r.review_text, r.ai_response, r.status, r.created_at::text as created_at, c.name as client_name
      from reviews r
      join clients c on c.id = r.client_id
      where r.user_id = ${context.userId}
      order by r.created_at desc
      limit 8
    `;
    const total = totalReviews[0]?.count ?? 0;
    const done = responded[0]?.count ?? 0;
    const clientCount = clients[0]?.count ?? 0;
    const limit = clientLimitFor(agency.plan);
    return {
      agency,
      stats: {
        clients: clientCount,
        pending: pending[0]?.count ?? 0,
        avgRating: avg[0]?.avg ? Number(Number(avg[0].avg).toFixed(2)) : null,
        responseRate: total === 0 ? 0 : Math.round((done / total) * 100),
        clientLimit: limit,
      },
      recent,
    };
  });

export const listClients = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<Client>`
      select c.id, c.user_id, c.name, c.industry, c.location, c.gbp_url, c.notes, c.status, c.created_at::text as created_at,
        (select count(*)::int from reviews r where r.client_id = c.id and r.status = 'pending') as pending_count,
        (select avg(r.rating) from reviews r where r.client_id = c.id) as avg_rating
      from clients c
      where c.user_id = ${context.userId}
      order by c.created_at desc
    `;
  });

const clientInput = z.object({
  name: z.string().min(1).max(120),
  industry: z.string().max(60).default("Other"),
  location: z.string().max(120).default(""),
  gbp_url: z.string().max(400).default(""),
  notes: z.string().max(2000).default(""),
});

export const addClient = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => clientInput.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const agency = await ensureAgency(context.userId);
    const counted = await sql<{ count: number }>`select count(*)::int as count from clients where user_id = ${context.userId}`;
    const limit = clientLimitFor(agency.plan);
    if (limit != null && (counted[0]?.count ?? 0) >= limit) {
      throw new Error(`Your ${agency.plan} plan allows ${limit} clients. Upgrade in Billing.`);
    }
    const rows = await sql<{ id: number }>`
      insert into clients (user_id, name, industry, location, gbp_url, notes)
      values (${context.userId}, ${data.name}, ${data.industry}, ${data.location}, ${data.gbp_url}, ${data.notes})
      returning id
    `;
    return { id: rows[0].id };
  });

export const updateClient = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => clientInput.extend({ id: z.number() }).parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      update clients set name = ${data.name}, industry = ${data.industry}, location = ${data.location}, gbp_url = ${data.gbp_url}, notes = ${data.notes}
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true };
  });

export const deleteClient = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ id: z.number() }).parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`delete from reviews where client_id = ${data.id} and user_id = ${context.userId}`;
    await sql`delete from clients where id = ${data.id} and user_id = ${context.userId}`;
    return { ok: true };
  });

export const getClient = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ id: z.number() }).parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const clients = await sql<Client>`
      select id, user_id, name, industry, location, gbp_url, notes, status, created_at::text as created_at
      from clients where id = ${data.id} and user_id = ${context.userId}
    `;
    const client = clients[0];
    if (!client) return { client: null, reviews: [] as Review[] };
    const reviews = await sql<Review>`
      select id, user_id, client_id, reviewer_name, rating, review_text, ai_response, status, created_at::text as created_at
      from reviews where client_id = ${data.id} and user_id = ${context.userId}
      order by created_at desc
    `;
    return { client, reviews };
  });

const reviewInput = z.object({
  client_id: z.number(),
  reviewer_name: z.string().max(80).default(""),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().min(1).max(4000),
});

export const addReview = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => reviewInput.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const owned = await sql<{ id: number }>`select id from clients where id = ${data.client_id} and user_id = ${context.userId}`;
    if (!owned[0]) throw new Error("Client not found");
    const rows = await sql<{ id: number }>`
      insert into reviews (user_id, client_id, reviewer_name, rating, review_text)
      values (${context.userId}, ${data.client_id}, ${data.reviewer_name}, ${data.rating}, ${data.review_text})
      returning id
    `;
    return { id: rows[0].id };
  });

export const listReviews = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<Review>`
      select r.id, r.user_id, r.client_id, r.reviewer_name, r.rating, r.review_text, r.ai_response, r.status, r.created_at::text as created_at, c.name as client_name
      from reviews r
      join clients c on c.id = r.client_id
      where r.user_id = ${context.userId}
      order by r.created_at desc
    `;
  });

export const markResponded = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ id: z.number(), ai_response: z.string().max(2000) }).parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      update reviews set status = 'responded', ai_response = ${data.ai_response}
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true };
  });

export const updateAgency = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z.object({
      agency_name: z.string().min(1).max(80),
      brand_color: z.string().max(20).optional(),
      plan: z.enum(["starter", "pro", "agency"]).optional(),
    }).parse(input),
  )
  .handler(async ({ context, data }) => {
    await ensureAgency(context.userId);
    const sql = await getSql();
    if (data.plan) {
      await sql`update agencies set agency_name = ${data.agency_name}, brand_color = ${data.brand_color ?? "#7dcea0"}, plan = ${data.plan} where user_id = ${context.userId}`;
    } else {
      await sql`update agencies set agency_name = ${data.agency_name}, brand_color = ${data.brand_color ?? "#7dcea0"} where user_id = ${context.userId}`;
    }
    return { ok: true };
  });

export const seedSample = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureAgency(context.userId, "Northline Agency");
    const existing = await sql<{ count: number }>`select count(*)::int as count from clients where user_id = ${context.userId}`;
    if ((existing[0]?.count ?? 0) > 0) return { ok: true, skipped: true };
    const c = await sql<{ id: number }>`
      insert into clients (user_id, name, industry, location, notes)
      values (${context.userId}, 'Harbor HVAC', 'HVAC', 'Austin, TX', 'Respond in a calm, local voice.')
      returning id
    `;
    const id = c[0].id;
    await sql`
      insert into reviews (user_id, client_id, reviewer_name, rating, review_text) values
      (${context.userId}, ${id}, 'Maya Chen', 5, 'They showed up on time, explained the issue clearly, and the house is cool again. Highly recommend.'),
      (${context.userId}, ${id}, 'James Ortiz', 2, 'Waited three days for a callback. The repair was fine once they arrived, but the delay was frustrating.')
    `;
    return { ok: true, skipped: false, clientId: id };
  });

export const generateReplies = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z.object({
      review_id: z.number(),
    }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<Review & { client_name: string; industry: string }>`
      select r.id, r.user_id, r.client_id, r.reviewer_name, r.rating, r.review_text, r.ai_response, r.status, r.created_at::text as created_at, c.name as client_name, c.industry
      from reviews r
      join clients c on c.id = r.client_id
      where r.id = ${data.review_id} and r.user_id = ${context.userId}
    `;
    const review = rows[0];
    if (!review) throw new Error("Review not found");

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI is not available in this environment", options: fallbackReplies(review) };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content:
              "You write Google Business Profile review replies for local service businesses. Keep each reply 40–90 words. Warm, human, never robotic. Thank the reviewer by name if given. Never defensive. Never offer discounts. First person as the business. Return ONLY valid JSON: {\"friendly\":\"...\",\"professional\":\"...\",\"third\":\"...\"}. The third key is Recovery for 1–3 stars and Warm for 4–5 stars.",
          },
          {
            role: "user",
            content: `Business: ${review.client_name}\nIndustry: ${review.industry}\nRating: ${review.rating}/5\nReviewer: ${review.reviewer_name || "a customer"}\nReview: ${review.review_text}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `xAI API error ${res.status}`, options: fallbackReplies(review) };
    }
    const body = (await res.json()) as { choices: { message: { content: string } }[] };
    const text = body.choices[0]?.message.content ?? "";
    const parsed = parseOptions(text);
    return { ok: true as const, options: parsed ?? fallbackReplies(review) };
  });

function parseOptions(text: string): { friendly: string; professional: string; third: string } | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const obj = JSON.parse(match[0]) as Record<string, string>;
    if (obj.friendly && obj.professional && obj.third) {
      return { friendly: obj.friendly, professional: obj.professional, third: obj.third };
    }
  } catch {
    return null;
  }
  return null;
}

function fallbackReplies(review: { reviewer_name: string; rating: number; client_name: string }) {
  const name = review.reviewer_name || "there";
  const biz = review.client_name;
  if (review.rating >= 4) {
    return {
      friendly: `Thank you, ${name} — this made our day. We're glad the visit felt easy. If you ever need us again, ${biz} is right here.`,
      professional: `${name}, thank you for taking the time to share this. The team at ${biz} is proud of the work, and we look forward to serving you again.`,
      third: `${name}, we're grateful. Reviews like yours help neighbors find us. We'll keep showing up the same way.`,
    };
  }
  return {
    friendly: `${name}, we're sorry this fell short. We want to make it right — please call ${biz} and ask for the owner so we can sort this out.`,
    professional: `${name}, thank you for the honest note. We take this seriously and would like a chance to review what happened. Reach ${biz} directly and we'll follow up.`,
    third: `${name}, this isn't the standard we hold. We'll look into the delay and the visit. Contact ${biz} and we'll take it from there.`,
  };
}
