export const runtime = "edge";

export async function GET(req: Request, ctx: any) {
  try {
    const db = ctx?.env?.database ?? ctx?.env?.DB;

    if (!db) {
      return Response.json(
        {
          ok: false,
          error:
            "D1 binding is not available. In Cloudflare runtime it should be available as `env.database` (see wrangler.jsonc). In Next dev it will be missing; use `npm run preview`.",
        },
        { status: 500 },
      );
    }

    const { results } = await db.prepare("SELECT 1").all();

    return Response.json({ ok: true, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;

    return Response.json(
      {
        ok: false,
        error: message,
        stack,
      },
      { status: 500 },
    );
  }
}
