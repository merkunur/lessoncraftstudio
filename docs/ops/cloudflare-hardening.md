# Cloudflare hardening — bot rules + edge cache (commission #1, 2026-07-03)

Operator-applied dashboard steps (no API token exists; §A.14.11). Origin-side
counterparts (nginx rate-limit + fleet-429 + placeholder-410) ship separately via
`scripts/publish-cli/patch-nginx-*.py`. Apply in the order below; each step is
independently reversible from the same dashboard screen.

**Measured motivation (14-day origin logs, 2026-06-19→07-03):** GPTBot 522k
requests; a rotating-UA scraper fleet (stale Chrome 103–149, ~266k `?_rsc=`
walks); Cloudflare cache rate 4.4% because extension-less HTML is never cached
by default on Free; ~30k deploy-window 502s reached clients unshielded.

---

## 1. Bot Fight Mode (2 minutes)

**Security → Bots → Bot Fight Mode → ON.**
Free-tier feature: challenges *definitively automated* non-verified bots.
Verified crawlers (Googlebot, Bingbot) are never touched. AI crawlers we
deliberately allow (per CLAUDE.md §3.5 + robots.txt) identify themselves and
are governed by robots.txt, not by this toggle — GPTBot etc. remain allowed.

## 2. WAF custom rule — challenge the stale-Chrome fleet (5 minutes)

**Security → WAF → Custom rules → Create rule:**
- **Name:** `Challenge stale-Chrome scraper fleet`
- **Expression** — click **Edit expression** (the raw editor) and paste ONE line,
  WITHOUT any backticks/code-fence characters. The `matches` regex operator is
  Business-plan-only, so this is the Free-plan enumerated form (Chrome majors
  90–138, each with a trailing dot so e.g. "Chrome/13" can never match Chrome/139):

  (http.user_agent contains "Chrome/9" or http.user_agent contains "Chrome/10" or http.user_agent contains "Chrome/11" or http.user_agent contains "Chrome/12" or http.user_agent contains "Chrome/130." or http.user_agent contains "Chrome/131." or http.user_agent contains "Chrome/132." or http.user_agent contains "Chrome/133." or http.user_agent contains "Chrome/134." or http.user_agent contains "Chrome/135." or http.user_agent contains "Chrome/136." or http.user_agent contains "Chrome/137." or http.user_agent contains "Chrome/138.") and not cf.client.bot

  (Why this is safe: "Chrome/10"/"Chrome/11"/"Chrome/12" cover majors 100-129
  as substrings; current Chrome 139+ starts "Chrome/13"/"Chrome/14"/"Chrome/15",
  which none of the coarse prefixes match — 13x is enumerated per-major with a
  trailing dot precisely so Chrome/139+ is NEVER matched.)

- **Action:** Managed Challenge
- Notes: `cf.client.bot` exempts all *verified* bots (incl. evergreen Googlebot,
  whose UA carries a Chrome token — this is why the raw UA match alone would be
  wrong). "Chrome/9" safely covers 90–99 (Chrome 139+ starts "Chrome/1", never
  "Chrome/9"). Real humans on ≤138 are a rounding error in mid-2026 and see one
  interstitial challenge, not a block.

## 3. Cache Rules (10 minutes) — Caching → Cache Rules → Create rule

Create the three rules below IN THIS ORDER (first match wins top-down; use
"Place at: Last" default order as listed).

### Rule 1 — `Cache deck pages`
- **If:** Custom filter expression — use **Edit expression** and paste the bare
  line (no backticks; `matches` is Business-only, these are Free-plan forms):

  http.request.uri.path contains "/decks/"

- **Then:** Eligible for cache · Edge TTL: **Use cache-control header if present,
  bypass cache if not** · Browser TTL: Respect origin.
- Origin already sends `Cache-Control: public, max-age=300` on deck pages/assets
  (§15.8) — the 5-minute freshness contract is preserved; this just makes the
  extension-less deck HTML actually eligible at the edge.

### Rule 2 — `Cache anonymous SSR HTML`
- **If:** Custom filter expression (Edit expression, paste as one line):

  (http.request.uri.path contains "/worksheets" or http.request.uri.path contains "/topic" or http.request.uri.path contains "/activities" or http.request.uri.path contains "/learn" or http.request.uri.path contains "/standards" or http.request.uri.path contains "/tools" or http.request.uri.path contains "/worksheet-makers" or http.request.uri.path in {"/en" "/de" "/fr" "/es" "/pt" "/it" "/nl" "/sv" "/da" "/no" "/fi"}) and not http.cookie contains "refreshToken" and not http.request.uri.path contains "/api/"

- **Then:** Eligible for cache · Edge TTL: **Ignore cache-control header and use
  this TTL → 10 minutes** · Browser TTL: Respect origin.
  (CORRECTED after live verification 2026-07-03: the origin sends
  `private, no-cache, no-store` on these SSR routes — they render dynamically,
  not ISR — so "respect origin" yields permanent BYPASS. The explicit 10-minute
  edge TTL override is required; it applies ONLY to cookie-less requests per the
  expression, and Cloudflare still never caches responses that carry Set-Cookie.)
- Why safe: `refreshToken` is the session cookie (httpOnly, set at signin) — any
  signed-in browser bypasses the cache entirely via the expression; responses
  carrying `Set-Cookie` are never cached; auth state on these pages renders
  client-side anyway; the pages contain no per-visitor server-rendered content.
  `/api`, `/auth`, `/admin`, `/workspace`, `/collections` are NOT in the path
  allowlist.

### Rule 3 — `Cache static long-tail`
- **If:** Custom filter expression (Edit expression, one line):

  http.request.uri.path contains "/image-library" or http.request.uri.path contains "/mini-tools/" or http.request.uri.path contains "/audio/" or http.request.uri.path contains "/design-elements/" or http.request.uri.path contains "/worksheet-samples/"

- **Then:** Eligible for cache · Edge TTL: Use cache-control header if present,
  bypass if not · Browser TTL: Respect origin.
- Origin sends long/immutable TTLs on these already; `/audio/inventory.json`
  sends `no-cache` at origin and therefore stays fresh by design.

## 4. Verification (I run these from outside once you say the rules are live)

```
curl -sI https://www.lessoncraftstudio.com/en/decks/<any-live-slug>/   ×2  → 2nd response: cf-cache-status: HIT
curl -sI https://www.lessoncraftstudio.com/en/worksheets/<slug>        ×2  → 2nd: HIT
curl -sI -H "Cookie: refreshToken=x" same URL                              → BYPASS/DYNAMIC (never HIT)
curl -sI -A "Mozilla/5.0 ... Chrome/112.0.0.0 ..." https://www.lessoncraftstudio.com/en   → cf-mitigated: challenge (managed challenge page)
Googlebot UA fetch (via Search Console URL-inspection live test)           → 200, no challenge
```
Dashboard: Caching → Overview cache-rate should climb from ~4% toward 40–80%
over the following days; Security → Events shows the challenge rule firing.

## Rollback
Each piece is one toggle/rule: disable Bot Fight Mode; disable/delete the WAF
rule; disable any cache rule. Origin behavior is unchanged by all of this.

## 5. Origin PDF cache TTL — reclaim crawl budget (2026-07-21)

**Change.** In `/etc/nginx/sites-enabled/lessoncraftstudio` the four deck **PDF**
location blocks had `add_header Cache-Control "public, max-age=300"` raised to
`max-age=2592000` (30 d): lines **257** (`printable.pdf`), **268**
(`answer-key.pdf`), **296** (`.+-printable.pdf`), **309** (`.+-answer-key.pdf`).
The deck-dir/html block (240) and the PNG/asset catch-all (321) were **left at
300s** on purpose.

**Why.** GSC crawl stats showed **PDFs = 48%** of a collapsed crawl budget (HTML
only 33%): the static, versioned, immutable PDFs were being told to expire every
5 min, so Googlebot + Cloudflare re-fetched them constantly (only 3% of responses
were 304). Long-caching them cuts the re-fetch frequency and hands the budget to
the starved HTML landings — **without** de-indexing the PDFs (they keep the
"printable … pdf" clicks; re-noindexing them crashed clicks before, §17.8.20).
HTML stays at 300s for edit propagation (§15.8); PNGs stay at 300s because they
get in-place metadata retrofits (e.g. the licensable-image XMP pass) and are only
1% of crawl.

**Safety/verify.** `nginx -t` passed; reloaded. Origin (via `--resolve`):
PDF → `cache-control: public, max-age=2592000`, conditional GET → `304`;
deck.html + thumbnail.png still `max-age=300`. Backup of the pre-change config:
`/root/lcs-nginx-backup-20260721-084043.conf`.

**Revert.** `sed -i "257s/2592000/300/; 268s/…/; 296s/…/; 309s/…/"` the config (or
restore the backup) → `nginx -t` → `systemctl reload nginx`. Reversible; touches
no page identity (churn-freeze safe). Rare in-place PDF change → stale ≤30 d at
edge (no CF purge API); PDFs are versioned so this effectively never happens.

## 6. Answer-key PDF noindex — shrink the "PDF replaces the deck" surface (2026-07-21)

**Change.** `X-Robots-Tag: noindex` added to the **two answer-key PDF** nginx blocks
only (`~ …/answer-key\.pdf$` + `~ …/(.+-answer-key\.pdf)$`) via idempotent
`scripts/publish-cli/patch-nginx-answerkey-noindex.py`. **Printable PDFs, deck.html,
and the PNG catch-all are untouched.**

**Why.** Each worksheet has 4 indexable URLs (deck.html, /worksheets/ landing,
printable.pdf, answer-key.pdf). Googlebot crawls the PDFs ~6.5× the landings and
never the deck.html (measured 387 vs 59 vs 0 /10d), so the PDF is what gets indexed —
it "replaces" the deck. The **answer-key** is a redundant competing PDF surface that
earns ≈0 clicks (nobody searches for an answer key), so noindexing it removes one
competitor per worksheet + frees ~35% of PDF crawl for the landings — **without**
touching the **printable**, which earns the site's "printable … pdf" clicks
(noindexing ALL PDFs crashed clicks in May, §17.8.20; this is the surgical subset).
`noindex` only — NOT robots.txt Disallow (Disallow blocks the crawl so Google never
sees the noindex → the URL stays indexed).

**Verify.** answer-key.pdf → `200` + `x-robots-tag: noindex` + `max-age=2592000`;
printable.pdf → `200`, **no** X-Robots-Tag; deck.html unchanged. Idempotent re-run →
"0 to patch, 2 already". Backup `/root/lcs-nginx-backup-answerkey-20260721-090514.conf`.
**Do NOT run `patch-nginx-pdf-noindex.py`** (that noindexes ALL PDFs incl. printables).
Over 2-4 weeks GSC "Excluded by noindex" should rise ~the answer-key count while
**printable clicks stay flat**; if printable clicks drop, revert (remove the header).

**Revert.** re-run the patcher after deleting the header, or restore the backup →
`nginx -t` → reload. Reversible; no page identity touched.
