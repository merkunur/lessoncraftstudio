---
name: project-deploy-standalone-rm-race
description: "deploy.sh can briefly break the site — rm -rf .next/standalone races the live ISR writer → \"Directory not empty\" → set -e abort → half-gutted standalone → MODULE_NOT_FOUND 500s"
metadata: 
  node_type: memory
  type: project
  originSessionId: 2ff15fac-5829-4835-baf3-77455f99432b
---

`deploy.sh` line ~183 runs `rm -rf .next/server .next/standalone` BEFORE `npm run build`, while the live pm2 server is still running and writing into `.next/standalone/.next/cache` (ISR revalidation). That live writer can re-create a dir entry mid-delete, so `rm -rf` aborts with **`rm: cannot remove '.next/standalone': Directory not empty'`**. Because `deploy.sh` has `set -e`, it **exits right there** — no rebuild, no swap, no restart — leaving `.next/standalone` **partially gutted** (only `.next/cache` left, no `server.js`). The running Next server then throws **`MODULE_NOT_FOUND`** and routes start returning **500** (homepage may stay 200 if prerendered, but `/worksheet-generators/*.html` and other routes 500). Empirically hit 2026-06-04 during the admin-button-gate deploy.

**Recovery (worked):** the standalone was already gutted, so manually `rm -rf .next/standalone` (now clean, the race window passed), then **re-run `bash deploy.sh`** — it rebuilds, swaps, `pm2 restart`, and smoke-tests pass. Confirm with `curl localhost:3000/worksheet-generators/addition.html` → 200 and pm2 error log shows no `MODULE_NOT_FOUND`. The 2 smoke WARNs (hero image / sample thumbnail `000000`) are pre-existing, not this.

**Why it's intermittent:** only fires when the ISR writer touches the cache dir during the ~ms `rm` scan. Frequent under load. A re-run usually succeeds because the broken server no longer writes valid cache. **If it recurs, `pm2 stop lessoncraftstudio` before re-running deploy.sh** to remove the writer entirely (full downtime during build, but deterministic).

Related but distinct from [[project-cdn-stale-chunk-login-break]] (that's CDN caching transient 404s on `_next/static`; this is the build-swap step itself aborting). Both live in the CLAUDE.md §A.14.11 deploy-mechanics area; neither failure mode is explicitly fixed in `deploy.sh` yet — candidate hardening: stop the writer or build-into-RELEASE-without-pre-rm.
