import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { Bt as _enum, Jt as object, Zt as string, qt as number } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-D6HOVuOc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-DdNxWNbJ.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("0a7bfabc2a4d74c4a1c67ccd14170a2e2f913c6d6b06331a7b2dc8b4a78886b1"));
var listClients = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7b26e53db89c3edba343080465407ac3a205f7af15ece276106dc4d5aba671cb"));
var clientInput = object({
	name: string().min(1).max(120),
	industry: string().max(60).default("Other"),
	location: string().max(120).default(""),
	gbp_url: string().max(400).default(""),
	notes: string().max(2e3).default("")
});
var addClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => clientInput.parse(input)).handler(createSsrRpc("9858456a7a80fd10e3cdfc5498f8ebd73c98ca3084680c72232c8f7554aed230"));
var updateClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => clientInput.extend({ id: number() }).parse(input)).handler(createSsrRpc("9cfac98198ff64d4b1811f7192fb47b045b3f9ad6facf470f5463d46a5543a73"));
var deleteClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ id: number() }).parse(input)).handler(createSsrRpc("da01426a5848941a781fd625857aea7477c299a085f94c9e8ddfbed13b907aed"));
var getClient = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => object({ id: number() }).parse(input)).handler(createSsrRpc("0e18451490cacbee3f49d723b58335139370c6e7c7c5f3af1392fb8d401d9625"));
var reviewInput = object({
	client_id: number(),
	reviewer_name: string().max(80).default(""),
	rating: number().int().min(1).max(5),
	review_text: string().min(1).max(4e3)
});
var addReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => reviewInput.parse(input)).handler(createSsrRpc("20277424a01a3046c09b32442a320a36ee3c49415da148b5c9bbebf635acb7b6"));
var listReviews = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2974f492a1a6a5977f46eee646a629feac264d2eed4bc93b9344c53a444c0a8e"));
var markResponded = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	id: number(),
	ai_response: string().max(2e3)
}).parse(input)).handler(createSsrRpc("0149c3c69193decbeef85ec8d75a079bd690b523ab976d1a50d4ef8f13f49f37"));
var updateAgency = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	agency_name: string().min(1).max(80),
	brand_color: string().max(20).optional(),
	plan: _enum([
		"starter",
		"pro",
		"agency"
	]).optional()
}).parse(input)).handler(createSsrRpc("12f2ca377674bbbe926d7ddb5f716e22550f9cdc07ff33c339e79c0cb13913c8"));
var seedSample = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("8f53f12beac58428391a909b238222ce9e6e3edf5db55a304e3c19c6e7b128db"));
var generateReplies = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ review_id: number() }).parse(input)).handler(createSsrRpc("78b40c55f9f777c159fc8b3e371bc56bcbcb92fba15c7631fd7d7bc98b0da612"));
//#endregion
export { getClient as a, listReviews as c, updateAgency as d, updateClient as f, generateReplies as i, markResponded as l, addReview as n, getDashboard as o, deleteClient as r, listClients as s, addClient as t, seedSample as u };
