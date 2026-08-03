# SEO Audit — Part 1: Technical Foundation & Crawlability

**Date:** 2026-05-30
**Site:** LessonCraftStudio (https://www.lessoncraftstudio.com) — multilingual K-3 educator platform, Next.js 14 App Router, 11 locales.
**Method:** Read-only. Two senior-SEO expert agents (crawlability/indexation + sitemap/canonical) read the infrastructure code and curl-verified live production; Critical + High findings re-verified directly. Zero changes to code, config, server, or DB.
**Part of:** the 6-part exhaustive SEO audit (master plan: `.claude/plans/emloy-expert-agents-and-nifty-stardust.md`).

---

## 1. State of the world (what's working)

The technical foundation is, broadly, in **strong health**. Verified live (2026-05-30):

- **410 teardown** — `/en/apps`, `/en/lesson-plans` → HTTP 410 + `x-robots-tag: noindex` + `Cache-Control: public, max-age=86400`. The retired seller-era + teaching-packages prefixes are correctly gone.
- **Tool carve-outs** — `/en/tools/ten-frame` + `/de/tools/zehnerfeld` → 200; `/en/tools/bogus-slug` → 410. The auto-derived `LIVE_TOOL_SLUGS` allowlist (`frontend/config/live-tool-slugs.ts`) works exactly as designed.
- **Canonical host** — apex (`http://` and `https://lessoncraftstudio.com/en`) → 301 → www. `trailingSlash:false` 308-normalizes Next.js routes. Canonicals are www-form everywhere.
- **Auth surfaces** — `/en/auth/signin` → 200 + `noindex,nofollow` (via `app/[locale]/auth/layout.tsx`).
- **Homepage** — `/en` → robots meta `index,follow,max-image-preview:large,max-snippet:-1`, self-canonical, 11 hreflang + x-default.
- **Sitemap architecture** — `/sitemap.xml` index lists all **4 shards** [0,1,2,3], absolute www-form, `lastmod` present. Shards 0/1 are custom image-enriched deck shards; 2/3 are Next.js-generated (intersections; static+topic+activity+tool+standards).
  - **9,847 + 9,690 = 19,537 unique deck URLs, ZERO full-URL overlap** between shards — clean ~50/50 partition by `Deck.id` last-char parity (`sitemap.ts:69-71`, `0.xml/route.ts:39-41`).
  - Shard 0 carries **19,694 `<image:image>` entries** (og-image.png + thumbnail.png, 2/url) with `xmlns:image` namespace declared.
  - Shard 2: 8,780 intersection URLs with rich cross-locale hreflang. Shard 3: 1,136 URLs (100 topic, 18 activities, 15 standards, 4 tools, static pages).
  - **Parity perfect:** every sampled URL across all 4 shards returns **200 with no redirect chain**, and a self-referential canonical that matches the sitemap URL exactly (deck URLs with trailing slash per nginx-strict §15.7; Next.js routes without).

---

## 2. Findings (ranked)

Severity × Effort. Each is live-verified.

### 🔴 CRITICAL

**P1-01 — `/admin` is publicly indexable.** *(Effort: S)*
Live: `https://www.lessoncraftstudio.com/admin` → **HTTP 200** with `<meta name="robots" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"/>`. Contrast `/en/member` → `noindex, nofollow` (correct).
**Root cause:** the middleware `X-Robots-Tag: noindex` block (`frontend/middleware.ts:246-256`) is **dead code** — the middleware matcher (`middleware.ts:288`) *excludes* `admin|settings|notifications|collaboration|testing|search|member`, so middleware never executes on `/admin`. `/admin` then renders with **no page-level `robots` override** and inherits the global `index:true, follow:true` from `frontend/app/layout.tsx:54-60`. `/member` and `/en/dashboard` are safe only because they carry their *own* page-level `noindex` meta; `/admin` does not.
**Fix:** add `export const metadata = { robots: { index:false, follow:false } }` (or a route-group layout) to the `/admin` route — mirror `app/[locale]/auth/layout.tsx`. Audit all matcher-excluded prefixes for the same gap.

### 🟠 HIGH

**P1-02 — Live robots.txt blocks AI crawlers, contradicting CLAUDE.md §3.5.** *(Effort: M — operator decision, not an in-repo edit)*
Live `/robots.txt` carries a **Cloudflare-Managed block injected at the edge**: `Disallow: /` for `GPTBot`, `CCBot`, `ClaudeBot`, `Google-Extended`, `Bytespider`, `Amazonbot`, `Applebot-Extended`, `meta-externalagent`, plus `Content-Signal: search=yes, ai-train=no`. This **contradicts** both the repo file `frontend/public/robots.txt` (explicit `Allow: /` for those bots) and CLAUDE.md §3.5 ("AI crawler bot policy = Do not block"). The origin file is *not* what AI bots actually see.
**Why it matters:** if the operator's intent is AI-discoverability (the §3.5 doctrine), the live edge policy is silently doing the opposite — relevant as AI answer engines become a discovery channel. If the intent has changed to *block* AI training, then CLAUDE.md §3.5 and the repo robots.txt are stale.
**Fix:** operator decision at the Cloudflare dashboard (AI Audit / robots.txt management) — either disable the managed block OR amend §3.5 + repo robots.txt to match. Reconcile the three sources.

**P1-03 — pt vs pt-BR hreflang drift between deck.html and the Next.js side.** *(Effort: S code + M re-injection)*
The Next.js side (sitemap shards 2/3, topic + deck-page metadata) emits `hreflang="pt-BR"` via the SoT `getHreflangCode` (`frontend/lib/seo/hreflang.ts:27`). But **deck.html** (hreflang injected by publish-cli's *separate inline CJS copy* of the map) emits bare `hreflang="pt"` — confirmed live on `/pt/decks/picture-path/`. Secondary: the deck.html block's `x-default` points at `da`, and `en` is **omitted** from the deck's alternate set entirely (live deck emits da/de/es/fi/fr/it/nl/pt/sv + x-default — no `en`).
**Why it matters:** for the same Portuguese deck cluster, Google sees `pt-BR` from the sitemap/catalog and `pt` from the page — an inconsistent return-tag that weakens or voids the cluster; a missing `en` alternate + non-en x-default compounds it. This is *exactly* the divergence the SoT docstring warns about (`hreflang.ts:16-18`: "update the publish-cli copy too").
**Fix:** sync the publish-cli inline hreflang map to `pt-BR`, prefer `en` for x-default, include `en` as an alternate; re-inject hreflang into existing pt sibling clusters (existing tooling: `scripts/publish-cli/populate-and-inject-hreflang.js`). *Deep hreflang reciprocity/coverage across all 11 locales is Part 2's focus.*

### 🟡 MEDIUM

**P1-04 — Stale + unauthenticated admin robots API.** *(Effort: S)*
`frontend/app/api/admin/seo/robots/route.ts:24,54` emits `sitemap_index.xml` (live → 307; that path doesn't exist — the real one is `sitemap.xml`). The route is **orphaned** (it does NOT serve the live robots.txt — the static `public/robots.txt` does) **and reachable unauthenticated** (`GET /api/admin/seo/robots` → 200). Fix the string and auth-gate `/api/admin/*` (or delete the route).

**P1-05 — Deck-shard sitemap hreflang is self-only.** *(Effort: M — do after P1-03)*
Each deck `<url>` in shards 0/1 carries exactly ONE self-referential `<xhtml:link>` (9,847 urls == 9,847 xhtml:link, hardcoded at `frontend/app/sitemap/0.xml/route.ts:120`), while the deck.html *page* emits the full sibling cluster and shards 2/3 emit full sibling alternates. Self-referential hreflang is valid, but it's a missed cross-locale signal and inconsistent with the rest of the sitemap. Emit full sibling alternates per deck (requires P1-03 fixed first so the codes agree).

**P1-06 — Dead `X-Robots-Tag` middleware block.** *(Effort: S)*
`middleware.ts:246-256` is a no-op (matcher-excluded — same root cause as P1-01). It gives a false sense of header-level protection for `/member`, `/dashboard`, etc. (no `x-robots-tag` header is actually emitted live). Either remove it, or move enforcement to nginx / Cloudflare for the matcher-excluded prefixes so it actually runs.

### 🟢 LOW / INFO

**P1-07 — `/api/revalidate-sitemap` references phantom shards.** *(Effort: S — cosmetic)*
`frontend/app/api/revalidate-sitemap/route.ts` calls `revalidatePath` on `/sitemap/4.xml`–`7.xml` + `/image-sitemap/*` + `/video-sitemap/*`, none of which exist post-pivot. **This REFUTES the prior worry that it's an active bug:** `revalidatePath` on a nonexistent path is a silent no-op; real shards 0-3 are in the list and revalidate fine (live sitemaps serve fresh content). Dead leftover from the 8-shard era; prune to `[0,1,2,3]` and drop the misleading comment.

**P1-08 — Sitemap Content-Type charset inconsistency.** *(Effort: S — cosmetic)*
Shards 0/1 return `application/xml; charset=UTF-8`; shards 2/3 return `application/xml`. Both valid; no crawler impact. Normalize for tidiness.

**P1-09 — [WATCH] Shard 0 payload >10MB.** *(Effort: monitor)*
Image-enriched deck shard is well under Google's 50MB/50K caps today, but image entries roughly triple per-URL bytes. At the 55,000-deck target (~28K URLs/shard) the payload could approach the 50MB limit. Not a defect — a scaling watch-item; consider a 4-way deck partition before that point.

---

## 3. Scorecard

| Dimension | Status | Evidence |
|---|---|---|
| Crawl-control (410 / carve-outs) | 🟡 | Teardown + carve-outs clean; but dead header block (P1-06) + AI-block drift (P1-02) |
| Indexation control | 🔴 | `/admin` indexable (P1-01) |
| Sitemap integrity | 🟢 | 4 shards live, clean 50/50 partition, zero overlap, parity perfect |
| Canonical integrity | 🟢 | apex→www 301, self-canonical, exact trailing-slash agreement, no redirect chains |
| Image sitemap | 🟢 | 19,694 `<image:image>` entries on shard 0 |
| hreflang (technical, deck-side) | 🟡 | pt-BR drift + self-only deck shards (P1-03, P1-05); full coverage → Part 2 |
| AI-crawler doctrine alignment | 🟡 | live edge policy contradicts §3.5 (P1-02) |

---

## 4. Remediation order

1. **🔴 P1-01** — noindex `/admin` (S). *Ship first — a live indexable admin surface is the only Critical.*
2. **🟠 P1-02** — reconcile AI-crawler policy (operator/Cloudflare decision).
3. **🟠 P1-03** — sync publish-cli hreflang map to `pt-BR` + x-default→en + include `en`; re-inject pt clusters.
4. **🟡 P1-04** — fix + auth-gate (or delete) the admin robots API.
5. **🟡 P1-05** — full sibling alternates in deck shards (after P1-03).
6. **🟡 P1-06** — remove / relocate the dead X-Robots-Tag block.
7. **🟢 P1-07 / P1-08** — prune revalidate-sitemap; normalize Content-Type.
8. **🟢 P1-09** — monitor shard-0 payload toward the 55K-deck target.

---

## 5. Notes for the master roadmap

- **Net-new vs known:** P1-01 (admin indexable), P1-02 (AI-block drift), P1-04 (stale/unauth admin API) appear net-new — not in `docs/audit-results/MASTER-DIAGNOSIS.md` or the `seo-100pct-*` deck reports.
- **Hands off to Part 2:** P1-03 + P1-05 are the deck-side symptoms of a broader hreflang question (reciprocity, x-default policy, the publish-cli ↔ `hreflang.ts` sync surface). Part 2 will own the full 11-locale hreflang + locale-residue analysis.
- **Read-only confirmation:** no code/config/server/DB changes were made. The only file written is this report under `docs/audit-results/`.
