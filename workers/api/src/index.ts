const json = (data: unknown, init: ResponseInit = {}) =>
	new Response(JSON.stringify(data), {
		...init,
		headers: {
			"content-type": "application/json; charset=utf-8",
			...(init.headers ?? {}),
		},
	});

type Env = {
	database: D1Database;
};

function withCors(req: Request, res: Response): Response {
	const origin = req.headers.get("origin") ?? "*";
	const headers = new Headers(res.headers);
	headers.set("access-control-allow-origin", origin);
	headers.set("access-control-allow-methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
	headers.set("access-control-allow-headers", "content-type,authorization");
	headers.set("access-control-max-age", "86400");
	headers.set("vary", "origin");
	return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === "OPTIONS") return withCors(request, new Response(null, { status: 204 }));

		const url = new URL(request.url);

		if (url.pathname === "/" && request.method === "GET") {
			return withCors(
				request,
				json({
					ok: true,
					service: "project-one-api",
					routes: ["GET /api/test"],
				}),
			);
		}

		if (url.pathname === "/api/test" && request.method === "GET") {
			const { results } = await env.database.prepare("SELECT 1 AS ok").all();
			return withCors(request, json({ ok: true, results }));
		}

		return withCors(request, json({ error: "Not found" }, { status: 404 }));
	},
};

