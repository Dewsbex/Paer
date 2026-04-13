/**
 * paer-poll-feeds — Cloudflare Worker
 *
 * Role: cadence-keeper. On a cron trigger, POST to the Supabase `poll-feeds`
 * Edge Function. The Edge Function owns all feed selection, fetching, and
 * database writes. This worker only drives the schedule and records the
 * outcome.
 *
 * Manual triggering: POST / with header `x-trigger-secret: $WORKER_TRIGGER_SECRET`.
 */

export interface Env {
  // Vars (wrangler.toml)
  SUPABASE_FUNCTIONS_URL: string;
  POLL_FUNCTION_SLUG: string;
  // Secrets (`wrangler secret put`)
  CRON_SECRET: string;
  WORKER_TRIGGER_SECRET: string;
}

interface PollResult {
  ok: boolean;
  total?: number;
  polled?: number;
  message?: string;
  errors?: string[];
  error?: string;
}

async function invokePollFeeds(env: Env, source: "cron" | "manual"): Promise<PollResult> {
  const url = `${env.SUPABASE_FUNCTIONS_URL}/${env.POLL_FUNCTION_SLUG}`;
  const started = Date.now();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cron-secret": env.CRON_SECRET,
      "x-invoker": `paer-poll-feeds-worker/${source}`,
    },
    body: JSON.stringify({ source }),
  });

  const elapsed = Date.now() - started;
  const text = await res.text();
  let parsed: PollResult;
  try {
    parsed = JSON.parse(text) as PollResult;
  } catch {
    parsed = { ok: false, error: `non-JSON response: ${text.slice(0, 200)}` };
  }

  // Structured log — shows up in `wrangler tail`.
  console.log(
    JSON.stringify({
      event: "poll_feeds_invoked",
      source,
      status: res.status,
      elapsed_ms: elapsed,
      result: parsed,
    }),
  );

  if (!res.ok) {
    throw new Error(`poll-feeds returned ${res.status}: ${text.slice(0, 200)}`);
  }
  return parsed;
}

export default {
  /** Cron trigger (every 15 min per wrangler.toml). */
  async scheduled(
    event: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    ctx.waitUntil(
      invokePollFeeds(env, "cron").catch((err: unknown) => {
        console.error(
          JSON.stringify({
            event: "poll_feeds_failed",
            cron: event.cron,
            scheduled_time: event.scheduledTime,
            error: err instanceof Error ? err.message : String(err),
          }),
        );
      }),
    );
  },

  /** Manual trigger for testing. Protected by WORKER_TRIGGER_SECRET. */
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "paer-poll-feeds" });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const provided = request.headers.get("x-trigger-secret");
    if (!env.WORKER_TRIGGER_SECRET || provided !== env.WORKER_TRIGGER_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const result = await invokePollFeeds(env, "manual");
      return Response.json(result);
    } catch (err: unknown) {
      return Response.json(
        { ok: false, error: err instanceof Error ? err.message : String(err) },
        { status: 502 },
      );
    }
  },
} satisfies ExportedHandler<Env>;
