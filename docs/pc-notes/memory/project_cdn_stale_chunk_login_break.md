---
name: cdn-stale-chunk-login-break
description: Why admin/login (and any interactive page) breaks after redeploys — Cloudflare cached a Next.js _next/static 404; nginx fix applied 2026-05-29
metadata: 
  node_type: memory
  type: project
  originSessionId: e4b760bb-58dc-4c1a-bec8-4e52ec784979
---

**Symptom:** after a redeploy, a user (esp. the operator, who is repeatedly trying) sees a page where the
"Sign in" button / interactive JS does nothing. Browser console on `/<locale>/auth/signin` shows
`404` for `_next/static/chunks/app/[locale]/layout-<hash>.js` + `Refused to execute script … MIME type
('text/html') is not executable`. The login API itself SUCCEEDS (server out-log shows repeated
`Signin attempt …` from `app/api/auth/signin/route.ts:124`, which is AFTER all rejection checks; no 500s).
The break is purely the page's client JS failing to load a hashed chunk → no hydration → no redirect.

**Root cause:** Next.js standalone prunes old hashed chunks on each deploy. During the deploy window a
request for a momentarily-missing hash returns a Next 404 HTML page. nginx `location /_next/static` did
`proxy_hide_header Cache-Control;` + a plain `add_header Cache-Control "...immutable";` (NO `always`) — so on
a 404 it stripped Next's `no-store` and added nothing (plain add_header skips non-200) → the 404 reached
Cloudflare with no cache directive → CF cached the negative response and served the stale 404 for its TTL.
Frequent redeploys (e.g. the thin-page program's per-batch deploys) churn chunk hashes and strand users.
**Self-heals** once CF revalidates, so it looks intermittent. HTML docs are already `no-store`/`DYNAMIC`
(not the problem); the post-login redirect is `/<locale>/workspace` not `/admin` (`signin-client.tsx:200,297`).

**Fix applied 2026-05-29 (nginx, server-side, NOT in git per §15.7):** in `/etc/nginx/sites-enabled/lessoncraftstudio`
`/_next/static` block added `proxy_intercept_errors on;` + `error_page 404 = @next_static_miss;` and a named
`location @next_static_miss { add_header Cache-Control "no-store" always; return 404; }`. Verified: missing
chunk via CF → `404 + Cache-Control: no-store + cf-cache-status: BYPASS` (uncacheable); real chunks still 200.
Config backups in `/root/nginx-backups/` (NEVER leave a `.bak` inside `sites-enabled/` — nginx loads it and
errors `duplicate upstream "nextjs"`).

**Immediate unblock for a stranded user:** one hard refresh (Ctrl+Shift+R) / clear site data — edge is healthy
once all current chunks are 200/HIT.

**Layer 2 SHIPPED 2026-05-29 (commit `8914b180`; LOCATION BUG fixed in follow-up):** `deploy.sh` RETAINS the last
5 builds' chunks so the 404 never happens at all. After the atomic swap it snapshots the build's pristine chunks
to `.next-static-archive/<BUILD_ID>/`, merges the previous KEEP-1 generations into live
`.next/standalone/.next/static/` (`cp -rn`, current build wins), prunes to KEEP=5. Plus a WARN-only post-deploy
step that curls `/en/auth/signin` + `/en` and checks every `_next/static` chunk is 200 (verified: 45/45 200).
**BUG + FIX:** first shipped as `.next/static-archive` (INSIDE `.next/`) → `next build` defaults `cleanDistDir:true`
and wipes all of `.next/` every build, so the archive was destroyed each deploy and retention silently showed
"0 previous" (a no-op). Fixed to a SIBLING `.next-static-archive/` (survives the wipe) + `frontend/.gitignore
/.next-static-archive/`. **Anything that must survive across deploys cannot live under `.next/`.** Proof: retention
should show "current + N previous" (N≥1) from the 2nd deploy after the fix. Doctrine: CLAUDE.md §A.14.11.
NOTE: `[locale]/layout` chunk hash is stable across builds when its source is unchanged (content-hashing) — the
chunks that churn are those whose content changed; retention covers those.

**Optional future hardening (NOT shipped):** no Cloudflare API token exists on the server. If the operator
provisions one, add a CF cache-purge step to `deploy.sh` and/or a CF Cache Rule "don't cache 404 on
`/_next/static/*`". Not required — nginx no-store + deploy.sh retention resolve it creds-free.

**Note:** the earlier `[FIX][ADMIN]` commit `36366e88` (admin dashboard SSR `systemMetrics` null-deref) was a
real but DIFFERENT latent bug — keep it; it was never the login blocker.
