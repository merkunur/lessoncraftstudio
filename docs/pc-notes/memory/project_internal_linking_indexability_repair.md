---
name: project-internal-linking-indexability-repair
description: "The 2026-07-30 nav/homepage/tool linking fix + the landing-less-deck noindex contradiction, and the nginx try_files/$uri trap that made the first fix inert"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0e541150-c64f-4766-b2ed-fd98f26cec0f
  modified: 2026-07-30T22:55:05.222Z
---

Commits `906d4302` (the fix) + the follow-up `$deck_uri` correction. Triggered by an
external SEO audit whose two claims were **one already-fixed and one mis-diagnosed** —
verifying them surfaced a third, worse problem neither mentioned.

## ⚠ THE REUSABLE TRAP: `map $uri` is USELESS in a block that uses `try_files`

`try_files /deck.html` **REWRITES `$uri` to `/deck.html`**. `add_header` evaluates its
value lazily in the header filter — i.e. AFTER try_files — so `map $uri $deck_robots`
was handed `/deck.html`, missed all 19,504 keys, and silently fell through to the
default. It **parsed, passed `nginx -t`, and reloaded cleanly while doing nothing.**

Fix: `set $deck_uri $uri;` in the location (`set` is REWRITE phase → runs before
try_files, wherever it sits textually), then key the map on `$deck_uri`.

**Why it was easy to miss:** the neighbouring `map $uri $deck_redirect` in the SAME
block works — it is read inside an `if` at the TOP, before try_files. Same file, same
variable, different phase.

**Diagnostic that settled it in one round trip:** temporarily add
`add_header X-Debug-Uri "[$uri]" always;`, reload, curl, restore. It returned
`[/deck.html]`. Measure the variable; don't reason about it.

⚠ Also: **an nginx change is not verified until you test at ORIGIN** —
`curl -sIk --resolve www.lessoncraftstudio.com:443:127.0.0.1 https://www...` (needs
correct SNI; plain `http://127.0.0.1` 301s away before reaching the block). Through
Cloudflare you cannot tell a broken config from a 5-min cached response.

## The severe finding: ~13.2k decks were dark

Two individually-correct changes contradicted each other:
- **2026-06-20** narrowed sitemap shards 0/1 to emit ONLY landing-less decks, because
  such a deck is self-canonical and "the ONLY indexable surface for its content".
- **2026-07-22** `patch-nginx-deck-noindex.py` applied `noindex, indexifembedded` to
  THE deck location block — which serves *every* deck.

Net: **9,752 sitemapped URLs noindexed; 29% of the catalogue with no indexable surface
anywhere.** Operator signed off on exempting the landing-less set (§21.5a churn freeze
requires explicit sign-off for metadata changes to existing indexed pages).

Mechanism: `gen-deck-noindex-exempt-map.js` (FS symlinks = what nginx actually serves;
unpublish removes the symlink, so FS beats the DB here) + `patch-nginx-deck-noindex-exempt.py`.
**The map lists what to EXEMPT and the default stays noindex → fails SAFE.** Listing the
with-landing set instead would fail the dangerous way. Wired into `publish-wave.js` as a
non-fatal STEP 7b — publishing moves the boundary BOTH ways.
Live: 45,309 served decks = 35,557 with landing + 9,752 exempt. **The 9,752 matched the
live sitemap count (4,905 + 4,847) exactly** — a free independent cross-check.

## The two audit claims, corrected

- **"internal links point at non-canonical /decks/"** — already fixed everywhere except
  the live homepage. `/en/topic/addition` measured 142 `/worksheets/` vs 18 `/decks/`,
  and those 18 were decks with no landing (correct fallback, not a bug).
  `TryItBandV4.tsx` was the last un-repointed surface (9→2 deck links, 0→7 worksheets).
- **"39 tools have no URLs"** — REFUTED: all 38 return 200 and all 780 tool URLs are in
  sitemap shard 3. The real bug was `category-nav-data.ts:206` mapping all 38 to ONE
  constant href, on every page. Now 38/38/37 distinct (fi omits `heart-words`, which has
  no fi slug by design — omit, never English-fallback, or it 410s).

⚠ `category-nav-data.ts` is consumed by CLIENT components → it must NEVER import
tool-content JSON (~1.4 MB × 11 locales). Resolve server-side in `layout.tsx`
(`getToolSlugMap`) and thread down as a prop, like `availableActivities`.

## Local verification limits (don't mistake these for failures)

- `npm run build` **cannot pass locally** — no Postgres. All 374 prerender failures are
  `PrismaClientInitializationError` on DB-backed maker (33×11=363) and `/learn` (11)
  pages. Tell: `/learn` fails too and is usually untouched. Zero manipulative tool pages
  failed, which is the real signal that new tool-page code renders.
- `audit-tool-pages.js` / `audit-activity-pages.js` **cannot run FROM Hetzner**: through
  Cloudflare the server's own requests get **403** (bot rule) or **429** (lcsperip
  rate-limit). Same URL is 200 from a normal client. Run paced checks from the PC.
- "Common Core" appearing on non-EN activity pages is **legitimate**, not a §20.10 leak:
  it is the homepage framework list ("Lehrplan · Common Core · Programmes officiels ·
  BNCC…") in NextIntl's serialized flight data.

## Tool→worksheet pairing

`TOOL_WORKSHEET_TYPES` in `lib/seo/tool-content.ts` is **hand-authored on purpose**: the
derivation (tool → activities → CCSS code → landings) covers only **1 of 38** tools,
because just 2 manipulatives have activities. 27 tools mapped (all resolve in en/de/sv);
**11 omitted deliberately** — class-timer, name-sticks, hush-owl, center-board, our-day,
feelings-check-in, home-language-bridge, story-line, reading-easel, calendar-wall,
money-mat have no honest worksheet pairing. **Do not pad the map to raise coverage.**
Activity pages key on the **CCSS code, never the strand** — the strand is localized per
§20.10, so strand-matching finds nothing outside EN. Only 47 of 194 EN activities have a
code with landings; the rest self-skip correctly.

Related: [[project-worksheets-like-topic-levers]], [[project-activities-indexation-arc]],
[[project-crawl-focus-landings-over-pdfs]]
