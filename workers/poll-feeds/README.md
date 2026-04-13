# paer-poll-feeds — Cloudflare Worker

Cadence-keeper for Paer's RSS ingestion pipeline. On a Cron Trigger, this worker
invokes the Supabase Edge Function `poll-feeds`, which is responsible for
selecting stale feeds, calling `parse-feed` for each, and writing results.

Architecture reference: [ADR-007](../../DECISIONS.md) — serverless stack
(Cloudflare Pages + Supabase + Cloudflare Workers).

## Topology

```
Cron (*/15 * * * *)
        │
        ▼
  paer-poll-feeds  ──POST── https://<project>.supabase.co/functions/v1/poll-feeds
   (this worker)                        │
                                        ├──► selects feeds where last_fetched_at is null
                                        │    or older than 30 min
                                        └──► POST /functions/v1/parse-feed per feed
                                             (writes to `articles` table)
```

The worker deliberately does no database work of its own — the edge function
holds the service-role key and owns all writes.

## Configuration

Non-secret vars live in `wrangler.toml`:

| Var | Purpose |
|-----|---------|
| `SUPABASE_FUNCTIONS_URL` | Base URL for edge functions |
| `POLL_FUNCTION_SLUG` | Name of the poll function (`poll-feeds`) |

Secrets (set with `wrangler secret put <NAME>` before the first deploy):

| Secret | Purpose |
|--------|---------|
| `CRON_SECRET` | Shared secret sent as `x-cron-secret`; must match the `CRON_SECRET` env var on the `poll-feeds` edge function. |
| `WORKER_TRIGGER_SECRET` | Secret required on manual POST `/` invocations. Keep distinct from `CRON_SECRET`. |

## Local dev

```bash
cd workers/poll-feeds
npm install
npm run typecheck
# Dry-run the scheduled handler
npm run dev -- --test-scheduled
```

In a separate terminal:

```bash
curl "http://localhost:8787/__scheduled?cron=*/15+*+*+*+*"
```

## Deploy

```bash
wrangler secret put CRON_SECRET
wrangler secret put WORKER_TRIGGER_SECRET
npm run deploy
```

## Manual trigger (prod)

```bash
curl -X POST https://paer-poll-feeds.<subdomain>.workers.dev/ \
  -H "x-trigger-secret: $WORKER_TRIGGER_SECRET"
```

## Health check

```bash
curl https://paer-poll-feeds.<subdomain>.workers.dev/health
```

## Observability

`npm run tail` streams structured JSON logs. Each run emits a
`poll_feeds_invoked` event with `status`, `elapsed_ms`, and the edge-function
result (`total`, `polled`, `errors`). Failures emit `poll_feeds_failed`.
