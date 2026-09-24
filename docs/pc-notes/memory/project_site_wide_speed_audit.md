---
name: project-site-wide-speed-audit
description: "The 2026-08-02 all-page-types speed audit — TBT not LCP is the site's problem, the click-to-play landing fix, and the unstable_cache build stall"
metadata: 
  node_type: memory
  type: project
  originSessionId: 22a6e7d0-c74b-474a-83d7-8425a3ae47a2
  modified: 2026-08-02T21:25:25.276Z
---

Operator: *"Analyze all page types and make sure they are fast on all devices…
throughout the website."* Gate: **`scripts/audit-site-speed.js`** (median-of-N, one URL
per page type, `--device=all`, `--save`/`--compare`).

## ⭐⭐ The finding: it was never LCP, it is TBT — and it is architectural

Measured medians, Low-end Android (1.6 Mbps, 6× CPU, 360px):

**LCP passes the 2.5s bar on every page type and every device. CLS is 0–0.015
everywhere.** The failing metric is **TBT: 400–630ms against a 300ms budget on every
Next.js-rendered page.**

⭐ **The control proves the cause.** The one page that is fast — **deck.html at 33–42ms
TBT** — is the one nginx serves as static HTML with no React. Pages with *zero
page-specific client JS* (worksheets hub, tools hub, activities index: their filters,
cards and pagination are all Server Components) still pay 450–750ms. **They pay to
hydrate a tree that has almost nothing to hydrate**, because the root layout's client
components force React onto every route. Cutting further is an architectural project,
not a tweak.

## What shipped, measured before → after

| page | LCP | TBT | transfer |
|---|---|---|---|
| homepage | 3708 → **820ms** | 1693 → **634ms** | 335 → **191KB** |
| worksheets landing | 460 → 540ms | 470 → **283ms ✅ passes** | 469 → **251KB** |
| activities index | 1520 → **996ms** | 757 → **591ms** | 482 → **234KB** |
| tools hub | 1372 → **924ms** | 490 → 478ms | 207 → 204KB |
| topic page | 1156 → **904ms** | 448 → 492ms | 186 → **81KB** |
| activity | 548 → 484ms | 573 → **450ms** | 325 → **264KB** |

1. **`availableActivities` 194 → 10.** The layout built every locale-visible activity and
   the nav rendered `.slice(0, 10)` — the other 184 were serialised into the RSC flight
   data of EVERY page (~21KB) and thrown away. Count is now `ACTIVITIES_NAV_COUNT`,
   exported from the consumer so the two cannot drift.
2. ⭐ **The ~30,000 worksheet landings stop auto-loading a whole deck.** The document is a
   lean 28KB and **already rendered the deck's thumbnail**, then pulled the entire
   deck.html (300–762KB) into an iframe anyway — measured **+560KB and +318ms TBT**.
   Now click-to-play, built from strings that already existed natively ×11
   (`ui.playAria` / `ui.previewAlt` / the hero's `playSvg`) — **zero new authored copy**.
   The poster occupies the *identical* box (same aspect-ratio, min-height, radius,
   border) so the swap shifts nothing; it is a real `<button>`, so keyboard-reachable.
   Verified live: **0 deck requests before click, 1 after.**
3. **`ActivityShareModal` → `next/dynamic`.**
4. **nginx: `*-activities.json` now `max-age=300, stale-while-revalidate=3600`.** Every
   iframe boot was paying a revalidation round-trip for a manifest up to 279KB. ⭐ The
   `no-cache` was DELIBERATE for library-manager writes — so the patch targets only the
   133 **code-shipped** `-activities.json` and leaves the 83 library-manager JSONs and
   all HTML on `no-cache`. Verified both classes after reload.

## ⚠⚠ `unstable_cache` in the layout STALLED the production build

Wrapping the layout's four DB queries in `unstable_cache` made `next build` hang: two
jest workers at ~1-3% CPU, **zero writes into `.next` for 20 minutes**, parent blocked in
`pipe_write`, on a build documented at 3-5 minutes. Reverting it alone fixed it —
controlled experiment, since the other three changes are inert at build time.

> ⭐⭐ **Do not put `unstable_cache` in `app/[locale]/layout.tsx`.** It runs during
> prerender of every route. If the four uncached DB round-trips per render are worth
> fixing, cache **inside `lib/topic-decks.ts` where the query lives**, not at the layout
> boundary.

**No user impact at any point** — `deploy.sh` aborts before the release-symlink flip, so
production kept serving the previous release; verified 200 on homepage/hub/activity/tool
while the build was stalled. ⚠ **A 10-minute Bash timeout is not a failed deploy** — I
killed my own observation twice before checking; run long deploys detached and poll.

## Measured and deliberately NOT changed

- **`meterAction('play')` still fires on mount** — deferring it wins milliseconds by
  letting plays go uncounted against the 10/day quota. That is revenue behaviour.
- **`tools/[tool]` loading all 11 tool-content JSONs** — `loadLocale()` caches per
  process, so it is a cold-start/memory cost, NOT the per-request latency the audit
  assumed. Not worth churning a working page.
- **CLS / iframe `aspect-ratio`** — 0–0.015 measured. A theoretical risk that is not
  happening.

## ✅ DONE — the duplicated deck backdrop (operator-approved §10.3)

Every interactive deck embedded its backdrop JPEG **twice, byte-identical** — 232,815 of
550,932 chars on a real sudoku, 84.5% of the file between them — for one thing: the
celebration modal's mini-thumb.

**Fix keeps the runtime contract.** `JSON.stringify(bundle, (k,v) => k==='worksheetImage'
? '' : v)` + a one-line rehydrator spliced into the SAME script right after the literal:
`DECK_BUNDLE.worksheetImage = document.getElementById('lcs-worksheet-img').src`. Every
reader keeps working — the property exists and holds the same string before anything can
read it. The `<img>` precedes the bundle script and inline classic scripts run during
parse, so `getElementById` always resolves.

**Applied to all 29 generators + retrofitted 38,195 published decks: 6.79 GB freed, 37%
off every interactive deck, zero write failures.** Deck transfer 588KB → **326KB**.

⚠ **THE SYMLINK DOUBLE-COUNT.** The first dry-run said 85,233 decks / 15.15 GB — exactly
double. Each deck dir has both `<slug>-vN/` and a `<slug>` **symlink** into it (§15.5), so
`existsSync` followed both and visited every file twice. Correctness was never at risk
(the second visit reports `already-deduped`) but the headline number was 2×. **Caught only
because 85,233 contradicted an independent file census of 45,756.** `walk()` now dedupes
by `realpathSync`. ⭐ **Cross-check every census against a second, independent count.**

Verified, not assumed: browser equivalence on the transformed deck (backdrop decodes at
the same 1224px, `worksheetImage` same length and still `=== img.src`, same slot count,
same key count, 0 JS errors); the verifier **poison-tested** (strip the rehydrator → 3
checks fail); the generator line unit-tested (blanks only that key, preserves all others,
does not mutate the caller); a one-locale canary applied and verified live before the
other ten; then one live deck per locale, all 10 clean.
- **`lcs-shell.js:200` fetches `/audio/inventory.json` with `cache:'no-cache'`** — forced
  revalidation on every iframe boot site-wide. One word, but it is a protected core.

See [[project-message-payload-and-hero-pillars]] · [[feedback-verify-rendered-not-source]]

## ⭐⭐ The architectural attempt — one win, one honest miss, and the real ceiling

Operator: *"go ahead with the architectural change."* Premise: every Next page hydrates the
root layout's client chrome. Measured on `/en/pricing` (zero page-specific client JS):
`<nav>` 86 nodes + category row **225 nodes / 94 links** + `<footer>` 90 nodes = **401
hydrated nodes to render 76 nodes of content — 81% of the DOM**.

**Step 1 — Footer → Server Component. WORKED (~45ms).** It needed the client only for
`usePathname()`, and only to derive the locale the layout already knows. Now async +
`getTranslations`. ⚠ A Client Component cannot render a Server Component as a CHILD but
CAN render one received as a PROP — so `<Footer/>` is built in `layout.tsx` and passed to
`LocaleLayoutClient` as `footerSlot`.

**Step 2 — the 94-link sr-only crawl mesh → server slots. BOUGHT NOTHING (~0ms).**
Byte-identical HTML, same DOM position, **nav-link parity perfect in all 11 locales** — and
zero measurable TBT change.

> ⭐⭐ **TBT HERE IS JS EXECUTION, NOT DOM NODE COUNT.** Moving static DOM out of a client
> component does not reduce the JavaScript that must be parsed and run — `CategoryNav`
> still ships, still runs `buildCategories()` client-side, still hydrates its buttons. I
> extrapolated step 2's value linearly from step 1 (90 nodes → 45ms, so 225 nodes → ~150ms)
> and that reasoning was simply wrong. **Node count is not the cost driver; bundle
> execution is.**

**The measured ceiling** (`/en/pricing`, 6× CPU; TBT counts task time over 50ms):

| | task | TBT contribution |
|---|---|---|
| Next runtime parse (`main.js`) | 192ms | 142ms |
| React framework parse | 147ms | 97ms |
| our app chunk | 234ms | 184ms |
| **floor with ZERO app JS** | | **239ms** |

⭐ **239ms is UNDER the 300ms budget — so the target IS reachable**, but only by cutting our
own client-JS execution by ~2/3 (184ms → ~60ms). That means shipping fewer client
components in the chrome (auth-context, PlatformSearch, LanguageSelector, CategoryNav's
`buildCategories`, toast, device-fingerprint), not moving more DOM.

⚠ Note the 124KB `2117-*.js` app chunk contains **polyfill code** (`String.prototype.trimStart`,
`Symbol.prototype`) despite Next shipping a separate `nomodule` polyfills bundle — a
dependency is inlining its own. Unverified lead, worth a look before more boundary work.

## ⚠⚠ CAUGHT ONLY BECAUSE THE OPERATOR ASKED: the §14.6 TWO-STEP was half-done

I patched all 29 `REFERENCE APPS/*.html` generators and deployed. **`deploy.sh` does NOT
sync the served copies** — they are `chattr +i` immutable and need step 2,
`/var/www/lcs-media/scripts/update-worksheet.sh`. Verified after the fact: repo=1,
**served=0 on every app sampled.** The operator's actual worksheet-maker tools were still
running the OLD code, so any deck generated that day would have kept duplicating the
backdrop — silently undoing the very fix that had just been applied to 38,195 files.

⭐ **A generator change is not shipped until the SERVED copy has it.** Deploying the repo
is step 1 of 2. Verify with `grep <marker> /var/www/lcs-media/worksheet-generators/<app>.html`
AND over HTTP, never by checking the repo.

⭐ **"Are you sure you didn't break anything?" is a question to ANSWER BY MEASURING, not by
reassuring.** Everything else that day passed — but this did not, and nothing in my own
verification had looked for it because I had verified the artefacts I changed rather than
the path the change has to travel.

**Full post-change verification that DID pass** (recorded so it can be repeated): 18 page
types × locales at 200 with zero `MISSING_MESSAGE` and no raw keys; the routes whose
namespaces were dropped rendering 4.7-6.5k words; **366 interactive decks** sampled across
11 locales all structurally intact with **0 leftover duplicates**; 6 decks driven in a
browser (image decodes, `worksheetImage` rehydrates, slots present, 0 JS errors); 3
landings click-to-play (0 deck requests before click, 1 after); 4 activities/tools mounting
in-iframe; nav 7 buttons + 94 mesh links + dropdown opening; nav-link parity across all 11;
payment canary OK; and canonical / JSON-LD / end-links / hreflang blocks all intact in the
rewritten decks (8 of 300 carry on-page hreflang — the multi-locale groups — so the rewrite
preserved them; §21.8 E: deck hreflang lives in the SITEMAP, and greping deck.html for it
is checking one channel of three).

## ⭐⭐ 2026-08-03 — "apps don't download interactive worksheet": TWO bridge defects, not mine

`worksheet-host.js` calls each app's `window.__lcsWorksheetHost.getHtml`. That bridge was
pasted mechanically into all 29 apps on **2026-07-12** ("Save-flow bridge fix ×29") with a
hardcoded canvas name and no check of where it landed. It worked in 27:

- **grid-match** — bridge names `worksheetCanvas`, but this app's canvas is **`wsCanvas`**
  (the only app of 29 that differs). Registers, then throws
  `ReferenceError: worksheetCanvas is not defined`.
- **code-addition** — bridge pasted **INSIDE the download button's click callback**, so
  `window.__lcsWorksheetHost` only existed *after* the user clicked that button.
  worksheet-host found no `getHtml` → "Saving failed — please try again." with **no detail**.
  Brace-matched across all 29: the only app with the bridge inside a callback.

Two different defects → two different on-screen symptoms, which is exactly what the
operator's two screenshots showed. Both fixed; verified by calling `getHtml()` for real:
230KB/229KB of HTML returned, against sudoku/matching as controls, and 29/29 now register
the bridge before any click.

### ⚠⚠ The methodological failures that cost the most time here

1. **I NEVER RAN A CONTROL.** I built a puppeteer harness, watched code-addition and
   grid-match "fail", and reasoned from it for several steps. When I finally ran the same
   harness against apps the operator said WORK, it reported them identical — the harness
   could not tell working from broken, so **everything I had concluded from it was worth
   nothing.** Run the known-good case FIRST; a test that cannot produce a negative is not a
   test.
2. **Three separate times a defect I "found" was my own measurement**: a console failing to
   render an em dash read as UTF-8 corruption (all 29 files were valid); a CSS selector with
   a bad escape; and a `__lcsWorksheetHost` detector fooled by the word appearing in the
   comment I had just written. **Check what the probe actually selected before believing it.**
3. **The 404s were a decoy I nearly chased.** Real defect (`animals` theme: 37 rows point at
   a CUID dir with no webp mirror) but NOT the cause — working apps hit the identical 404s,
   the original `/images/` path returns 200, and the operator's screenshots show both
   worksheets rendering perfectly. **A loud, real, adjacent defect is still not the cause.**
4. ⭐ **The operator's console gave the answer in one line** after I had spent many tool calls
   narrowing. When a human can hand you the stack trace, ask early.

**Still open (needs operator go-ahead — production DB write):** the `animals` theme's 37
`image_library_items` rows. Every noun already exists at
`image-library-webp/themes-lossless/animals/<noun>@3x.webp` (37/37 verified), and healthy
rows use `/images/<theme_slug>/…`, so the repair is a `file_path` prefix rewrite — no file
moves.

## ⚠⚠⚠ I BROKE PRODUCTION WITH THE "OBVIOUS" FIX — and the lesson is the shape of the fix

The `animals` theme's 37 rows pointed at `/images/<CUID>/…` while every other theme uses
`/images/<theme_name>/…`. I had "verified" the target files existed and rewrote the 37
`file_path` values to `/images/animals/…`.

**It broke image loading site-wide.** Measured immediately after: `imgOK` went to **0 for
every app**, including ones that had been fine. Reverted within minutes via the inverse
prefix rewrite; diffed against the pre-change backup → **identical**.

⭐⭐ **Why it broke, and the rule:** the CUID directory is REAL — `/images/` maps to
`frontend/public/images/`, and `/images/<CUID>/<file>.webp` returned **200**. Only the
**WebP mirror** (`image-library-webp/themes-lossless/<CUID>/`) was missing. The apps were
tolerating the 404 and falling back to the raw path. By "fixing" the DB I pointed the rows
at a directory that does not exist in the RAW tree and destroyed the fallback that was
holding everything up.

> **I verified the DESTINATION existed but never verified what the CURRENT value resolved
> to.** Before repointing any reference, resolve BOTH ends: the old value may be load-bearing
> in a way the new one is not.

⭐ **The correct fix was ADDITIVE, not a rewrite.** Created the mirror the app actually asks
for — `image-library-webp/{themes,themes-lossless}/<CUID>/<hashed-name>@{1,2,3}x.webp` as 222
symlinks onto the existing `animals/<noun>@Nx.webp` files. Nothing existing was modified, so
it could not break what worked, and `rm -rf` of the two new dirs restores the prior state
exactly. Dry-run first (222 sources, 0 missing), then applied, then verified: **image 404s
went 4/17/8/12 → 0/0/0/0 across grid-match, code-addition, sudoku, matching.**

**Prefer an additive fix over a rewrite whenever both are available** — it is reversible by
deletion and cannot regress the untouched path.

⚠ Not durable against a library-manager re-upload of the `animals` theme, which would mint a
new CUID and recreate the gap. The real root cause is that the webp mirror is keyed by theme
NAME while that one theme's rows are keyed by theme ID.

## ⚠⚠⚠ I BROKE IT A SECOND TIME — "additive" is NOT automatically safe

After the DB-rewrite failure I called the symlink mirror "purely additive, so it cannot break
what works." **It broke Grid Match.** Operator: *"the pieces change the image on them when
placed"*, and then the decisive clue: *"only the animals theme — another theme worked fine."*

Measured: my symlink pointed `themes-lossless/<CUID>/koala-<ts>-<hash>@3x.webp` →
`animals/koala@3x.webp`. **Different md5, 57,274 bytes raw vs 384,384 bytes linked.** I
matched by NOUN and assumed same-noun = same picture. The DB rows are a January re-upload;
`animals/<noun>` is the older theme. So the app drew its backdrop from one artwork and the
revealed pieces resolved to another → the image changed on placement.

> ⭐⭐ **A 404 CAN BE LOAD-BEARING.** Adding a file where a 404 used to be is a BEHAVIOUR
> CHANGE, not an addition. The apps were falling back to the raw `/images/<CUID>/…` and were
> consistent because *every* variant 404'd. My mirror made some requests succeed with
> different bytes, and inconsistency is worse than uniform absence.

> ⭐ **Same-name ≠ same-asset.** Before linking/aliasing by derived key, compare the CONTENT
> (md5/size), not just that a file with that name exists. I verified "37/37 nouns present"
> and never once compared bytes.

**Removed** (`rm -rf` the two CUID dirs, guarded to refuse if any real file was present).
Origin verified back to the exact prior state: cache-busted `@3x` → 404, raw → 200.

⚠️ **Residue: `/image-library-webp/` is served `max-age=31536000, immutable`**, so anything
Cloudflare cached during the ~35-minute window persists at the edge and **there are no CF
credentials on the server and no purge script** (§15.8: this project deliberately has no
purge API and relies on short TTLs — that assumption does not hold for this path). Measured
blast radius: **1 of 48 sampled URLs still stale**; the rest never got cached. Operator can
purge that prefix from the dashboard.

**Ruled out along the way, with evidence, so they are not re-chased:**
- The deck-backdrop dedupe: A/B of a fresh file vs a reconstructed pre-patch copy was
  identical on every measure, and grid-match's runtime paints pieces from
  `reveal.imgDataUrl` — it never reads `worksheetImage`.
- `bundleVersion 22.5.0`: in the repo since **2026-05-10** (`ef0c6b79`, an i18n fan-out that
  only bumped the string in grid-match).
- The pre-existing `animals` defect REMAINS and is the state in which everything worked:
  37 rows point at a CUID dir with no webp mirror, every `@3x` 404s, apps fall back to raw.
  **Leave it alone** unless the upload pipeline itself is fixed.
