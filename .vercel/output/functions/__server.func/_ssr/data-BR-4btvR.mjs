import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { Bt as _enum, Jt as object, Zt as string, qt as number } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-D6HOVuOc.mjs";
import { n as clientLimitFor } from "./plans-JjWlUX6S.mjs";
import { r as getSql } from "./db-DkhjTIz8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-BR-4btvR.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
async function ensureAgency(userId, displayName) {
	const sql = await getSql();
	const existing = await sql`select user_id, agency_name, brand_color, plan from agencies where user_id = ${userId}`;
	if (existing[0]) return existing[0];
	await sql`insert into agencies (user_id, agency_name) values (${userId}, ${displayName?.trim() || "Your agency"})`;
	return (await sql`select user_id, agency_name, brand_color, plan from agencies where user_id = ${userId}`)[0];
}
var getDashboard_createServerFn_handler = createServerRpc({
	id: "0a7bfabc2a4d74c4a1c67ccd14170a2e2f913c6d6b06331a7b2dc8b4a78886b1",
	name: "getDashboard",
	filename: "src/lib/server/data.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDashboard_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const agency = await ensureAgency(context.userId);
	const clients = await sql`select count(*)::int as count from clients where user_id = ${context.userId}`;
	const pending = await sql`select count(*)::int as count from reviews where user_id = ${context.userId} and status = 'pending'`;
	const avg = await sql`select avg(rating)::text as avg from reviews where user_id = ${context.userId}`;
	const responded = await sql`select count(*)::int as count from reviews where user_id = ${context.userId} and status = 'responded'`;
	const totalReviews = await sql`select count(*)::int as count from reviews where user_id = ${context.userId}`;
	const recent = await sql`
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
			responseRate: total === 0 ? 0 : Math.round(done / total * 100),
			clientLimit: limit
		},
		recent
	};
});
var listClients_createServerFn_handler = createServerRpc({
	id: "7b26e53db89c3edba343080465407ac3a205f7af15ece276106dc4d5aba671cb",
	name: "listClients",
	filename: "src/lib/server/data.ts"
}, (opts) => listClients.__executeServer(opts));
var listClients = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listClients_createServerFn_handler, async ({ context }) => {
	return (await getSql())`
      select c.id, c.user_id, c.name, c.industry, c.location, c.gbp_url, c.notes, c.status, c.created_at::text as created_at,
        (select count(*)::int from reviews r where r.client_id = c.id and r.status = 'pending') as pending_count,
        (select avg(r.rating) from reviews r where r.client_id = c.id) as avg_rating
      from clients c
      where c.user_id = ${context.userId}
      order by c.created_at desc
    `;
});
var clientInput = object({
	name: string().min(1).max(120),
	industry: string().max(60).default("Other"),
	location: string().max(120).default(""),
	gbp_url: string().max(400).default(""),
	notes: string().max(2e3).default("")
});
var addClient_createServerFn_handler = createServerRpc({
	id: "9858456a7a80fd10e3cdfc5498f8ebd73c98ca3084680c72232c8f7554aed230",
	name: "addClient",
	filename: "src/lib/server/data.ts"
}, (opts) => addClient.__executeServer(opts));
var addClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => clientInput.parse(input)).handler(addClient_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const agency = await ensureAgency(context.userId);
	const counted = await sql`select count(*)::int as count from clients where user_id = ${context.userId}`;
	const limit = clientLimitFor(agency.plan);
	if (limit != null && (counted[0]?.count ?? 0) >= limit) throw new Error(`Your ${agency.plan} plan allows ${limit} clients. Upgrade in Billing.`);
	return { id: (await sql`
      insert into clients (user_id, name, industry, location, gbp_url, notes)
      values (${context.userId}, ${data.name}, ${data.industry}, ${data.location}, ${data.gbp_url}, ${data.notes})
      returning id
    `)[0].id };
});
var updateClient_createServerFn_handler = createServerRpc({
	id: "9cfac98198ff64d4b1811f7192fb47b045b3f9ad6facf470f5463d46a5543a73",
	name: "updateClient",
	filename: "src/lib/server/data.ts"
}, (opts) => updateClient.__executeServer(opts));
var updateClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => clientInput.extend({ id: number() }).parse(input)).handler(updateClient_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      update clients set name = ${data.name}, industry = ${data.industry}, location = ${data.location}, gbp_url = ${data.gbp_url}, notes = ${data.notes}
      where id = ${data.id} and user_id = ${context.userId}
    `;
	return { ok: true };
});
var deleteClient_createServerFn_handler = createServerRpc({
	id: "da01426a5848941a781fd625857aea7477c299a085f94c9e8ddfbed13b907aed",
	name: "deleteClient",
	filename: "src/lib/server/data.ts"
}, (opts) => deleteClient.__executeServer(opts));
var deleteClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ id: number() }).parse(input)).handler(deleteClient_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await sql`delete from reviews where client_id = ${data.id} and user_id = ${context.userId}`;
	await sql`delete from clients where id = ${data.id} and user_id = ${context.userId}`;
	return { ok: true };
});
var getClient_createServerFn_handler = createServerRpc({
	id: "0e18451490cacbee3f49d723b58335139370c6e7c7c5f3af1392fb8d401d9625",
	name: "getClient",
	filename: "src/lib/server/data.ts"
}, (opts) => getClient.__executeServer(opts));
var getClient = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => object({ id: number() }).parse(input)).handler(getClient_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const client = (await sql`
      select id, user_id, name, industry, location, gbp_url, notes, status, created_at::text as created_at
      from clients where id = ${data.id} and user_id = ${context.userId}
    `)[0];
	if (!client) return {
		client: null,
		reviews: []
	};
	return {
		client,
		reviews: await sql`
      select id, user_id, client_id, reviewer_name, rating, review_text, ai_response, status, created_at::text as created_at
      from reviews where client_id = ${data.id} and user_id = ${context.userId}
      order by created_at desc
    `
	};
});
var reviewInput = object({
	client_id: number(),
	reviewer_name: string().max(80).default(""),
	rating: number().int().min(1).max(5),
	review_text: string().min(1).max(4e3)
});
var addReview_createServerFn_handler = createServerRpc({
	id: "20277424a01a3046c09b32442a320a36ee3c49415da148b5c9bbebf635acb7b6",
	name: "addReview",
	filename: "src/lib/server/data.ts"
}, (opts) => addReview.__executeServer(opts));
var addReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => reviewInput.parse(input)).handler(addReview_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (!(await sql`select id from clients where id = ${data.client_id} and user_id = ${context.userId}`)[0]) throw new Error("Client not found");
	return { id: (await sql`
      insert into reviews (user_id, client_id, reviewer_name, rating, review_text)
      values (${context.userId}, ${data.client_id}, ${data.reviewer_name}, ${data.rating}, ${data.review_text})
      returning id
    `)[0].id };
});
var listReviews_createServerFn_handler = createServerRpc({
	id: "2974f492a1a6a5977f46eee646a629feac264d2eed4bc93b9344c53a444c0a8e",
	name: "listReviews",
	filename: "src/lib/server/data.ts"
}, (opts) => listReviews.__executeServer(opts));
var listReviews = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listReviews_createServerFn_handler, async ({ context }) => {
	return (await getSql())`
      select r.id, r.user_id, r.client_id, r.reviewer_name, r.rating, r.review_text, r.ai_response, r.status, r.created_at::text as created_at, c.name as client_name
      from reviews r
      join clients c on c.id = r.client_id
      where r.user_id = ${context.userId}
      order by r.created_at desc
    `;
});
var markResponded_createServerFn_handler = createServerRpc({
	id: "0149c3c69193decbeef85ec8d75a079bd690b523ab976d1a50d4ef8f13f49f37",
	name: "markResponded",
	filename: "src/lib/server/data.ts"
}, (opts) => markResponded.__executeServer(opts));
var markResponded = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	id: number(),
	ai_response: string().max(2e3)
}).parse(input)).handler(markResponded_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      update reviews set status = 'responded', ai_response = ${data.ai_response}
      where id = ${data.id} and user_id = ${context.userId}
    `;
	return { ok: true };
});
var updateAgency_createServerFn_handler = createServerRpc({
	id: "12f2ca377674bbbe926d7ddb5f716e22550f9cdc07ff33c339e79c0cb13913c8",
	name: "updateAgency",
	filename: "src/lib/server/data.ts"
}, (opts) => updateAgency.__executeServer(opts));
var updateAgency = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	agency_name: string().min(1).max(80),
	brand_color: string().max(20).optional(),
	plan: _enum([
		"starter",
		"pro",
		"agency"
	]).optional()
}).parse(input)).handler(updateAgency_createServerFn_handler, async ({ context, data }) => {
	await ensureAgency(context.userId);
	const sql = await getSql();
	if (data.plan) await sql`update agencies set agency_name = ${data.agency_name}, brand_color = ${data.brand_color ?? "#7dcea0"}, plan = ${data.plan} where user_id = ${context.userId}`;
	else await sql`update agencies set agency_name = ${data.agency_name}, brand_color = ${data.brand_color ?? "#7dcea0"} where user_id = ${context.userId}`;
	return { ok: true };
});
var seedSample_createServerFn_handler = createServerRpc({
	id: "8f53f12beac58428391a909b238222ce9e6e3edf5db55a304e3c19c6e7b128db",
	name: "seedSample",
	filename: "src/lib/server/data.ts"
}, (opts) => seedSample.__executeServer(opts));
var seedSample = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(seedSample_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureAgency(context.userId, "Northline Agency");
	if (((await sql`select count(*)::int as count from clients where user_id = ${context.userId}`)[0]?.count ?? 0) > 0) return {
		ok: true,
		skipped: true
	};
	const id = (await sql`
      insert into clients (user_id, name, industry, location, notes)
      values (${context.userId}, 'Harbor HVAC', 'HVAC', 'Austin, TX', 'Respond in a calm, local voice.')
      returning id
    `)[0].id;
	await sql`
      insert into reviews (user_id, client_id, reviewer_name, rating, review_text) values
      (${context.userId}, ${id}, 'Maya Chen', 5, 'They showed up on time, explained the issue clearly, and the house is cool again. Highly recommend.'),
      (${context.userId}, ${id}, 'James Ortiz', 2, 'Waited three days for a callback. The repair was fine once they arrived, but the delay was frustrating.')
    `;
	return {
		ok: true,
		skipped: false,
		clientId: id
	};
});
var generateReplies_createServerFn_handler = createServerRpc({
	id: "78b40c55f9f777c159fc8b3e371bc56bcbcb92fba15c7631fd7d7bc98b0da612",
	name: "generateReplies",
	filename: "src/lib/server/data.ts"
}, (opts) => generateReplies.__executeServer(opts));
var generateReplies = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ review_id: number() }).parse(input)).handler(generateReplies_createServerFn_handler, async ({ context, data }) => {
	const review = (await (await getSql())`
      select r.id, r.user_id, r.client_id, r.reviewer_name, r.rating, r.review_text, r.ai_response, r.status, r.created_at::text as created_at, c.name as client_name, c.industry
      from reviews r
      join clients c on c.id = r.client_id
      where r.id = ${data.review_id} and r.user_id = ${context.userId}
    `)[0];
	if (!review) throw new Error("Review not found");
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment",
		options: fallbackReplies(review)
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 700,
			temperature: .6,
			messages: [{
				role: "system",
				content: "You write Google Business Profile review replies for local service businesses. Keep each reply 40–90 words. Warm, human, never robotic. Thank the reviewer by name if given. Never defensive. Never offer discounts. First person as the business. Return ONLY valid JSON: {\"friendly\":\"...\",\"professional\":\"...\",\"third\":\"...\"}. The third key is Recovery for 1–3 stars and Warm for 4–5 stars."
			}, {
				role: "user",
				content: `Business: ${review.client_name}\nIndustry: ${review.industry}\nRating: ${review.rating}/5\nReviewer: ${review.reviewer_name || "a customer"}\nReview: ${review.review_text}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`,
		options: fallbackReplies(review)
	};
	return {
		ok: true,
		options: parseOptions((await res.json()).choices[0]?.message.content ?? "") ?? fallbackReplies(review)
	};
});
function parseOptions(text) {
	const match = text.match(/\{[\s\S]*\}/);
	if (!match) return null;
	try {
		const obj = JSON.parse(match[0]);
		if (obj.friendly && obj.professional && obj.third) return {
			friendly: obj.friendly,
			professional: obj.professional,
			third: obj.third
		};
	} catch {
		return null;
	}
	return null;
}
function fallbackReplies(review) {
	const name = review.reviewer_name || "there";
	const biz = review.client_name;
	if (review.rating >= 4) return {
		friendly: `Thank you, ${name} — this made our day. We're glad the visit felt easy. If you ever need us again, ${biz} is right here.`,
		professional: `${name}, thank you for taking the time to share this. The team at ${biz} is proud of the work, and we look forward to serving you again.`,
		third: `${name}, we're grateful. Reviews like yours help neighbors find us. We'll keep showing up the same way.`
	};
	return {
		friendly: `${name}, we're sorry this fell short. We want to make it right — please call ${biz} and ask for the owner so we can sort this out.`,
		professional: `${name}, thank you for the honest note. We take this seriously and would like a chance to review what happened. Reach ${biz} directly and we'll follow up.`,
		third: `${name}, this isn't the standard we hold. We'll look into the delay and the visit. Contact ${biz} and we'll take it from there.`
	};
}
//#endregion
export { addClient_createServerFn_handler, addReview_createServerFn_handler, deleteClient_createServerFn_handler, generateReplies_createServerFn_handler, getClient_createServerFn_handler, getDashboard_createServerFn_handler, listClients_createServerFn_handler, listReviews_createServerFn_handler, markResponded_createServerFn_handler, seedSample_createServerFn_handler, updateAgency_createServerFn_handler, updateClient_createServerFn_handler };
