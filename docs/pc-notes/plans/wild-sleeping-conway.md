# Worksheets hub rebuild — `/[locale]/worksheets` (implementation)

## Context

The design is approved on the canvas. This plan is the production build.

What is wrong with the live page: new worksheets were bolted on as two card
strips *above* the grid; three "Browse by …" chip walls are stacked below it
instead of being one browse control; a three-way sort control offers orderings
nobody asked for; an "Interactive" button sits in the site's top nav instead of
being a tab on this page; **print-only worksheets advertise a "Play interactive"
button, a play overlay, a live iframe and an "Answer key" that 404s**; and the
~1,057 worksheets per locale with no landing page expose no download at all.

The strips and the dishonest cards are one defect seen from two ends. The code
says so itself at `page.tsx:352-361`: the variety interleave orders type buckets
by **descending size**, so page 1 is one row from each of the 24 largest of 71
types, and the newest families — 2-5 rows each, ranked ~46-71 — can never reach
it. Those newest families are exactly the **print-only** mechanics. Fix the
ordering, delete the patch, make the card tell the truth.

**Operator constraints, all binding:**
- SEO is not traded for aesthetics. Every link that exists today still exists.
- `<title>` and meta description stay **byte-identical**.
- **Nothing is described as free.** The free tier is a trial hook, not the
  product. No price or free claim appears anywhere on the page.
- PDF downloads go through the **metered proxy** (3/month, account required).

---

## Measured facts this plan rests on (all verified, not assumed)

**Format classification is exact.** Production `groupBy(exerciseType)` over
**44,981 published monolingual decks**: 95 exercise types, 30 where *every* deck
has an answer key, 65 where *no* deck has one, and **0 mixed**. The 30 are
exactly the 29 canonical apps (§14.10) plus the `picture-trail` en alias of
`picture-path`. So "has an answer key" and "is an interactive type" are the same
fact, from two independent signals, with zero disagreement. 9,933 decks (22%)
are print-only.

**The ordering works.** Simulated over the real landing corpus: **0
row-constraint violations across both tabs, all 11 locales, all 1,471 pages** —
no worksheet type repeats inside any row at 2, 3 or 4 columns. Today's algorithm
produces 88 adjacent duplicates and 553 same-row repeats in en alone, and its
last ~3.7 pages are 89 consecutive `find-and-count` cards.

| | rows | interactive | print-only | pages |
|---|---|---|---|---|
| en | 3,695 | 3,139 | 556 | 154 |
| de / es / fr / it / pt / nl / sv / da / no / fi | 2,519-3,529 | — | 556 each | 105-148 |

---

## A. Ordering — `frontend/lib/worksheets-catalog.ts`

A 4-column row is the window `[4k … 4k+3]`, so "no type repeated on a row" is a
**distance-≤3** constraint, not adjacency: items at offsets 0 and 2 sit on the
same row and are not adjacent. `|i−j| ≥ 4` is sufficient for 2, 3 *and* 4
columns simultaneously, and because `PAGE_SIZE = 24` is divisible by all three,
**rows never cross a page boundary — the whole constraint is local to one page.**

Replace `interleaveByAxis` / `sortLandings` with four pure stages:

1. **Seed** — slug sort (the existing deterministic seed).
2. **Secondary spread** — spread by theme first (level when the primary axis is
   already theme). Without this, page 1 came back **16 of 24 cards themed
   "Fourth of July"**, because the slug seed clusters themes. Measured fix:
   themes per page 13.1 → 16.1 average, and page 1 now runs Activities, Weather,
   Trees, Fruits, Colors, Household.
3. **Primary spread** — bucket by axis; order buckets by a **√-weighted
   stratified deal** (`GAMMA = 0.5`, one exported constant) so page 1 is a fair
   cross-section rather than the 24 biggest types; then sort by the rational
   rank `j / n_b` compared as **integer cross-products** (`j₁·n₂ − j₂·n₁`) —
   never floats, never `localeCompare`, so the build host and the ISR worker
   cannot diverge. All `j = 0` tie at rank 0, so every bucket appears once
   before any appears twice, and every bucket finishes at rank 1.0 — **there is
   no tail**.
4. **Per-page arrangement** — within each page of 24, emit
   most-remaining-first under a D=4 cooldown, deterministic tie-break, soft
   preference for a different theme and then a different format. Measured: on
   **every feasible page, zero same-key pairs within distance 4** (3,960
   repeated-key instances, 0 violations). 892 pages are provably infeasible —
   one key holds more than a quarter of the page — and no arrangement can fix
   those; the gate asserts against that bound, never against zero.

**Axis selection.** Unfiltered → `type`. Type-filtered → the first *usable* axis
of `[mode, theme, level]`, where usable means ≥2 distinct values **and** the
feasibility bound `(nmax−1)·D + ties ≤ N` is within one defect per page. Mode is
preferred because that is the operator's rule, but it is often impossible: **53
of 71 types have exactly one mode (46% of rows)**, and `find-and-count` is an
88%-dominant two-mode split. Measured picks across 776 filtered views: mode 233,
theme 311, level 67, degenerate 165. `mode: null` is its own first-class bucket
(a real 5th class on `pattern-train`), never a wildcard.

**Trade-off accepted:** proportional representation of row mass. A 3-sheet
family gets a page-1 slot a 379-sheet family also gets. Total exposure per family
is unchanged; only *when* changes.

## B. Two tabs, no sort control

`?format=interactive`; **All** is the default and strips the param. Add `format`
to `clearFilters` and the page-reset list in `components/catalog/filterUrl.ts`.
A full-width underline tab bar sits between the header and the 12-col shell,
outside the grid column, because it governs the rail too: facet counts are
computed over the tab-filtered set, so under Interactive a type with no
interactive sheets disappears rather than offering a dead end. Not a segmented
pill — that is the exact visual of the `CatalogSortControl` being removed.

`?sort=` and `?themes=all` **stop being read but must keep returning 200** —
they are indexed URLs; ignore them, never `notFound()`. Canonical already
ignores searchParams, so no metadata change and no new crawl space.

**New file** `components/catalog/CatalogTabs.tsx`.

## C. Format signal — one mark, one slot

`frontend/config/interactive-exercise-types.ts`: the 30-key set +
`isInteractiveType(key)`. Type-level, so it needs **no DB** — the detail page
and the tab filter both work when the database is unreachable, and an unknown
type falls back to print-only (a missing Play button is a small loss; a Play
button onto a static page is the defect being fixed).

Every thumbnail carries exactly one **format mark, bottom-right**:
- interactive → the site's existing play button (teal circle, cream triangle);
- print-only → a **"PDF only"** chip (printer glyph + label, solid hairline —
  *not* dashed: dashed already means "standard coming soon" in this system).

Same slot, same size, opposite meaning. Nothing is added to the card; the mark
that would have lied is replaced by one that tells the truth. Play therefore
leaves the text row, which also fixes the row wrapping onto two lines at 187px.

## D. Card — `components/worksheets/WorksheetCatalogCard.tsx`

**Do not use a stretched link.** `styles/catalog-cards.css:35-38` sets
`.actcat-card > * { position: relative }`, so a `::before{inset:0}` inside the
title would size to the `<h3>`, not the card — a silent, invisible failure.
Instead the card root is a `<div class="actcat-card">` with exactly two
children: an `<a>` wrapping thumbnail + title + level pill + type sublabel, and
a sibling `<div>` action row. Valid HTML, no nested anchors, no client JS, hover
lift unchanged.

Action row: **PDF** always; **Answer key** only when the deck's `answerKeyUrl`
is non-null (the guard `DeckGridClient.tsx:353` already uses). Both link to
`/api/quota/{pdf,answer-key}/<deckId>` with `rel="nofollow"` and
`target="_blank"` — `lib/quota-proxy.ts` 302s subscribers and **bots** straight
to the slug-derived file, meters free accounts, and sends anonymous visitors to
signup. It works as a plain href, unlike `DeckGridClient`'s click interception.
If the deck row is missing (DB read failed) fall back to the direct file URL so
the card never ships a dead link.

This is what finally gives the ~1,057 landing-less sheets per locale a download.

Grid gains `md:grid-cols-3` so tablet is 3-up (today 768px gets 2).

## E. Browse structure — every link kept, three sections become one

| Today | After | Links lost |
|---|---|---|
| rail: 5 levels | unchanged | 0 |
| rail: 71 types flat | 71 types in 5 server-rendered `<details>` grouped by taxonomy subject, the active one `open` | 0 |
| rail: top-12 themes + `?themes=all` round trip | top-12 + the rest inside a `<details>` — **always in the HTML** | **+96 links always present** |
| "Browse by exercise type" wall → `/topic/<slug>/` | a balanced **A–Z index** at the foot, 4 columns, always visible | 0 |
| "Browse by theme" wall → `?theme=` | deleted — the rail now carries all of them permanently | 0 |
| "Browse by level" wall → `?level=` | deleted — all 5 were always in the rail | 0 |

Net crawlable link count **goes up**. The index is A–Z rather than
subject-grouped because subject groups of 31 / 22 / 9 / 9 produce ragged columns
two-thirds empty — the defect the operator flagged; 71 items flow into four even
columns of 18. Subject grouping still exists in the rail, where it is a browse
control rather than a wall. The topic-page links keep a real headed section
because they are different URLs from the rail's `?type=` filters, with their own
prose, FAQ and OG image.

`FacetGroupVM` gains an optional `subgroups`; `/[locale]/activities` passes none
and its output stays byte-identical.

**Two traps in the shared component, both silent:**
- `FacetGroups` hard-filters `g.items.length > 0` (`CatalogFilters.tsx:61`). A
  group carrying only `subgroups` with an empty `items` array would be **dropped
  with no error**. The predicate must widen to
  `g.items.length > 0 || (g.subgroups?.length ?? 0) > 0`.
- `details[open] .actcat-caret` (`catalog-cards.css:58`) is **not** scoped with
  `>`. `CatalogMobileFilters` is itself a `<details>`, so a nested subgroup caret
  reusing `.actcat-caret` would flip whenever the *outer* mobile drawer opens.
  Subgroup carets get their own class.

`CatalogFilters.tsx` is deliberately **i18n-context-free** (header comment): every
string is a prop. Subgroup headings and the `primaryAction` label are built in
`page.tsx` and passed in — putting `getTranslations` inside the shared component
would force the activities page to satisfy a namespace it does not use.
`primaryAction` as `{ href, label }` (not a callback) matches the existing
`footer` precedent; `WorkspaceEmptyState.tsx:5-14` records why a callback prop
was rejected for this component.

**New file** `components/catalog/CatalogTypeIndex.tsx`.

## F. Deleted

Both highlight strips · `config/worksheets-new-highlights.ts` and
`scripts/seo-landing/gen-var-highlights.js` (**verified: `page.tsx` is their
only importer**) · the three chip-wall sections and their
`dirThemes`/`dirLevels`/`facetHref` builders · `CatalogSortControl` *usage* here
(keep the export, `/activities` still uses it) · `WsSortKey` · the now-vacuous
`newHighlightGroups.length === 0` conjunct in the `eager` prop · message keys
`newHeading`, `moreTypesHeading`, `tileCta`, `tileCtaSheet`, `tileAlt`,
`browse.sortVariety`, `browse.showAllThemes`, `browse.topicLinksHeading`,
`browse.browseByTheme`, `browse.browseByLevel` across 11 files.

**Verified: no committed script asserts the current hub structure**, and no
test, preflight gate, `deploy.sh` step or `package.json` script references
either dead file — so nothing else breaks. **Order matters:** deleting
`worksheets-new-highlights.ts` before removing the `page.tsx:48` import fails
`npm run build`, which aborts `deploy.sh` at the build step. Remove the import
and its two usages first, then delete.

## G. Detail page — and the file that actually serves it

This is the screenshot the operator sent, and it has a trap in it.

⚠️ **`app/[locale]/worksheets/[slug]/page.tsx` is `force-dynamic` and
FALLBACK-ONLY** (its own header comment, lines 168-177). The page users and
Googlebot see is **static HTML written by
`scripts/seo-landing/render-landing-html.js`** into `/var/www/lcs-media/landings/`
— **32,773 files on disk today**, regenerated by `deploy.sh:182` on every deploy.
That renderer carries the *same* dishonest hero (`:1235-1251`), the *same* "Try
it — interactive" play poster (`:1266-1267`), the *same* unguarded answer-key
link (`:1251`), and a **duplicated copy of the `UI_STRINGS` table**
(`:511-615`, mirroring the route's `:56-166`). **Fixing only the Next route
changes nothing live.** Both files change together, and the static renderer is
the primary target.

**266 print-only landings per locale × 11 = ~2,926 dishonest pages.** For a
tracing sheet, three of the four hero affordances are false.

For a print-only type (`isInteractiveType(l.coordinate.type) === false`):
**Download PDF** becomes the primary solid-teal button; drop the play button and
the hero play overlay; drop the answer-key link; **omit the iframe / play-poster
section entirely** (the renderer already applies exactly this discipline to the
carousel — never a heading over a dead frame); drop the embed snippet, whose
whole payload is an iframe of a static page; add the *PDF only* chip to the
existing chip row.

**No DB query is needed or wanted here.** The route runs zero Prisma queries
today and the static renderer runs at deploy time — the type-level constant
answers both with no database dependency at all. That is the second reason C is
a committed constant rather than a per-deck lookup.

**The JSON-LD is already honest** — verified, not assumed: `Quiz` is the only
node that could imply an answer key, it is gated on `practiceProblems`, and
across all 29,697 monolingual landings **367 carry a Quiz node and 0 of those
are a print-only type**. `learningResourceType: 'Worksheet'` and the `encoding`
MediaObject (`application/pdf`) are true for print-only. Nothing to change.

## H. Nav — the "Interactive" button becomes the tab

Delete the `interactive` entry from `cats` in `lib/category-nav-data.ts:384-390`.
All four renderers (desktop `CategoryNav`, `CategoryNavMesh` crawl mesh, mobile
accordion, footer dropdowns) iterate that array, so one removal propagates.

**Zero site-wide link loss:** merge `INTERACTIVE_ANCHOR_CANDIDATES` into the
Worksheets dropdown's items so those topic pages keep their site-wide links, and
add an "Interactive worksheets" item pointing at `?format=interactive`.

## I. Copy — nothing is free

`<title>` and meta description **unchanged**. New h1 + intro only, keeping the
existing `HUNDREDS_THRESHOLD` split:

- h1: **Thousands of worksheets to print or play** / **Worksheets to print or play**
- intro: **Filter by level, worksheet type or theme. Every worksheet comes as a printable PDF; many also play in the browser.**
- tabs **All** · **Interactive**, nav aria **Worksheet format**
- card: **PDF** · **Answer key** · badge **PDF only** (≤12 chars — "Print only"
  is 19 in German and blows the 160px phone card)
- index: **All worksheet types** + **{count} types, each with its own page**
- empty: **No worksheets match** / **Not every worksheet has an interactive
  version. Try All, or remove a filter.** + **Show all worksheets**
  (`CatalogEmptyState` gains an optional `primaryAction`)

These are statements about what a worksheet *is*, never what it costs.

**Locale authoring — operator-ruled: native panel per language.** Most labels
already exist as shipped, native-reviewed copy: `downloadPdf` / `answerKey` /
`playInteractive` in all 11 in the `[slug]` route's `UI_STRINGS`, and
`nav.categories.interactive` in all 11 message files. **Lift those verbatim.**
Genuinely new: the h1, the intro, "PDF only", the index heading and the
empty-state line — 5 × 11 = 55 strings, so per §A.13.48 each locale gets a
**three-expert native panel** (linguist + K-3 educator + marketing), and each
panel is handed the English as a **source to audit**, not a target to translate.
Every previous round found real defects in the English that no gate could.

⚠️ New landing strings must land in **both** `UI_STRINGS` tables — the route's
(`[slug]/page.tsx:56-166`) and the static renderer's duplicate
(`render-landing-html.js:511-615`). The Record value type is a closed object, so
TypeScript fails the build if any of the 11 blocks is missed — a real guard.

All 11 message files carry an identical 26-key `worksheetsPage` namespace today;
they must stay identical (a key-parity gate enforces it).

**Two honesty fixes on copy the hub itself renders — not optional.**

1. **`pageUsage.fallback.hub`, all 11 locales.** The block at the very bottom of
   this page currently says *"Each one is **free** to print and to play online,
   **comes with an answer key**"* — a price claim the operator has just
   forbidden, and a claim that is false for 9,933 decks. Verified present in all
   11 (`kostenlos` de, `gratuite` fr). Rewrite to: *"…Every worksheet prints as a
   PDF, many also play in the browser, and the catalogue runs across all 11
   languages we publish in — handy for dual-language and international
   classrooms."* While in the same file, `fallback.topic` and
   `fallback.intersection` (10 locales each) claim *"Every worksheet includes /
   ships with an answer key"* — same false claim, same component, 33 strings
   total. `pageUsage.overrides` is empty, so these three keys are the whole fix.
2. **`content/subject-hub-copy/en.json` (2) and
   `content/topic-seo-overrides/en.json` (23)** assert *"every worksheet exists
   as both a printable PDF … and a playable browser exercise"*. English-only, 25
   strings — audit each against the print-only set and correct only the
   genuinely false ones.

Shipping a "PDF only" badge while the surrounding prose says everything is
playable and free would be **worse than today**, because it makes the
contradiction legible.

**Also delete the three dead keys** `tileAlt`, `browse.heading`, `browse.all` —
present in all 11, referenced by nothing.

### ⚠ Out of scope by operator ruling — measured and reported, not touched

A sweep of every namespace the site renders found the same two false claims well
beyond this page: **16 `topicPage.*` keys across ~10 locales each** carry a
"free" and/or "answer key" claim — `topicPage.intro.{theme,exerciseType,
educationalLevel}`, `topicPage.intersection.intro` + `introByPair.*`, and
**`topicPage.meta.description` + the six `intersection.meta.*` keys, which are
indexed SERP copy**. Those render on `/topic/*`, never on this hub (verified:
the hub imports only `topicPage.{facets,sort,activeFilters,emptyState,
breadcrumb}`, none of which make a claim). Rewriting ~190 strings of indexed
meta description is a §21.5a-class churn decision on a different surface and
would restart Google's evaluation of ~24,000 topic URLs while crawl budget is
still recovering. **Operator ruling: report, do not touch.** Deliverable at
close: the written key list, so it can be commissioned on its own.

---

## Data plumbing

One Prisma query replaces the narrower one at `page.tsx:253`: widen from
`{slug: {in: sheetSlugs}} → {slug,title}` to **all published monolingual decks
for the locale → `{id, slug, title, answerKeyUrl}`** (~4,090 rows, once per ISR
hour; topic pages' `getFacetCounts` already does a full-locale `findMany` at ~4ms
p95). It feeds the sheet titles already needed, the `deckId` for the metered
links, and the answer-key guard. Thread `deckId` / `answerKeyUrl` onto `HubRow`
in `lib/worksheets-sheets.ts`; `printOnly` comes from the type constant, not the
DB, so a failed read degrades to "no answer key link" rather than "everything is
print-only".

Keep deriving every asset URL from the slug via `deckAssets` /
`canonicalDeckAssets` (§8.1 — never read the mutable URL columns for live
rendering); the column is used only for its **null-ness**, which
`fix-deck-url-columns.js:118` explicitly preserves.

---

## Files

| File | Change |
|---|---|
| `frontend/lib/worksheets-catalog.ts` | axis selection + spread + per-page arrangement; `GAMMA`; feasibility helper; `format` in `WsFilters`; drop `sort`/`showAllThemes` |
| `frontend/app/[locale]/worksheets/page.tsx` | six-section rewrite; widened query; strips, walls and sort deleted |
| `frontend/components/worksheets/WorksheetCatalogCard.tsx` | two-child card, format mark, action row |
| `frontend/components/catalog/CatalogTabs.tsx` · `CatalogTypeIndex.tsx` | new |
| `frontend/components/catalog/CatalogFilters.tsx` | `subgroups` on `FacetGroupVM`; `primaryAction` on `CatalogEmptyState` |
| `frontend/components/catalog/filterUrl.ts` | `format` in `clearFilters` + page-reset |
| `frontend/config/interactive-exercise-types.ts` | new — the 30-key set |
| `frontend/lib/worksheets-sheets.ts` | carry `deckId` / `answerKeyUrl` |
| `scripts/seo-landing/render-landing-html.js` | **the file users actually see** — print-only honesty pass + its `UI_STRINGS` copy |
| `frontend/app/[locale]/worksheets/[slug]/page.tsx` | the same pass on the fallback route, kept in sync |
| `frontend/lib/category-nav-data.ts` | drop the `interactive` category, merge its anchors |
| `frontend/messages/*.json` × 11 | new keys, deleted keys |
| `content/{subject-hub-copy,topic-seo-overrides}/en.json` | 25 false playability claims |

---

## Sequence

1. `config/interactive-exercise-types.ts` + `scripts/audit-worksheet-formats.js`
   (the reconciliation query above, as a committed ratchet).
2. Ordering + `scripts/verify-worksheets-hub-order.js`, poison-tested, before
   any pixel depends on it.
3. Data plumbing → `WorksheetCatalogCard` → `CatalogTabs` / `CatalogTypeIndex`
   → `CatalogFilters` additions → the page body.
4. Honesty pass on **`render-landing-html.js` first** (the file users see), then
   the fallback route in sync; the 3 `pageUsage` keys × 11; the 25 English
   `subject-hub-copy` / `topic-seo-overrides` claims.
5. Nav change; 11-locale strings — lift the shipped wording, run the native
   panels on the 5 new strings; remove the highlights import and its two usages,
   **then** delete the config + generator (that order, or the build fails).
6. Local render QA → commit by explicit path → deploy → verify the **static
   landing**, not the route.

---

## Verification

**`scripts/verify-worksheets-hub-order.js`** reproduces the ordering offline
across **11 locales × {All, Interactive} × {unfiltered, each type} × every
page** (~1,600 views, ~35,000 pages, seconds of pure JS) and asserts:

1. Aligned row windows: for `cols ∈ {2,3,4}`, every window has
   `distinct == min(cols, distinctKeys)` — the assertion a human can check
   against a screenshot.
2. Distance-≤3 violations `== 0` on every **feasible** page, where feasibility
   is `(m−1)·4 + ties ≤ pageLen` computed per page — **equality against the
   bound, never `== 0` globally**. `find-and-count` by mode has a hard lower
   bound of ~284; a `== 0` gate forces an allowlist, and an allowlist is where
   gates go to die.
3. Determinism: same process twice, a fresh process, and a pre-shuffled
   then re-seeded input → byte-identical slug sequences; hash pinned per view.
4. **Partition**: `concat(pages)` equals the filtered set as a multiset. The
   only assertion that catches an arrangement bug that duplicates one row and
   drops another — every adjacency metric stays green through that.
5. Page-1 fairness: the size-rank vector pinned as a snapshot.
6. Coverage: every type appears within the first `ceil(types/24)` pages.
7. Assertion 1 re-run against rendered **display labels**, not raw keys — two
   type keys can render one localized label, and the complaint is about the
   rendered card.
8. Page-1 `hasPart` JSON-LD equals the first 24 slugs of the same computation.

**Poison tests, each must FAIL the gate** (a gate is not trusted until proven to
fail, and a poison stopped upstream tests nothing): identity ordering · today's
`interleaveByAxis` (must fail *on the last pages*, not page 1) · pure size-desc
deal (must fail assertion 5 — the operator's actual complaint) · `mode: null`
sentinel changed to `''` · one input row duplicated · corpus truncated to
`24k + 1` (pt is exactly `147·24 + 1`, and a naive `min(distinct) ≥ 20` check
fails on pt, nl, da and it purely because of the short final page) · every row
given the same type (must **pass** with `violations == bound`, proving the bound
is computed not hardcoded) · `PAGE_SIZE` 24 → 25 without touching the strata code.

**Other gates.** `scripts/audit-worksheet-formats.js` — re-runs the production
reconciliation and fails if any type is mixed or the committed 30-key set drifts
· a before/after **link-parity** script proving the rendered hub HTML still
contains every `/topic/`, `?type=`, `?theme=` and `?level=` link it contained
before, per locale — this is the proof SEO was not traded · a **claim sweep**
re-running the free/answer-key regex over every namespace the hub renders,
asserting zero hits · an **11-locale key-parity** check (all files must stay at
one identical `worksheetsPage` count; they are at 26/26 today) · a print-only
landing verifier asserting no play CTA, no overlay, no iframe and no answer-key
link on print-only landings, and byte-unchanged output on interactive ones.

**`deploy.sh` runs these and aborts on any of them** (read from the script):
`hreflang-codes.test.js` · `site-chrome.test.js` (guards ~40k baked links
against a renamed route — this rebuild renames none) ·
`preflight-indexable-routes.js` · `preflight-tool-registration.js` ·
`preflight-activity-routes.js` · `audit-font-shorthand.js` · the payment env
guard. The indexability gate checks `public/**/*.html` and `app/**/page.tsx`
only, so the two new components are outside its scope and the hub route already
resolves `alternates.canonical`.

**`npx tsc --noEmit` baseline measured, not assumed: exactly 7 errors**, all in
`__tests__/blog/*` and `e2e/blog.spec.ts`, none in app code. It must still be 7.

**Render QA.** The hub queries Prisma and local has **no DB**, so pull the real
titles + ids + answerKeyUrl from production as a fixture and feed the page from
it — the method that caught the duplicate-title defect last time. (The landing
route needs no DB; it renders locally as-is.) Point the existing puppeteer
harness at a running dev server — `node scripts/audit-homepage-responsive.js
--base=http://localhost:3000 --path=/{locale}/worksheets --locales=en,de,fi`
is the established shape; no script starts the server itself. Render
360 / 768 / 1024 / 1280, both tabs, filtered and unfiltered, plus one print-only
landing and one interactive landing; **I read the 360, 768 and 1024 renders
myself** before anything deploys. Rendering the canvas already caught three
artboards that would have clipped and an action row wrapping to two lines — this
step is not a formality. Note `deploy.sh:307` records that **Hetzner has no
Chromium**, so every puppeteer check is a local step, never a deploy gate.

**Verify the STATIC landing, not the route.** After deploy, `curl` a print-only
landing from `/var/www/lcs-media/landings/` (or its public URL) and assert the
play poster, the iframe and the answer-key link are gone — checking the Next
route would pass while every real visitor still sees the old page.

⚠ **`npm run dev` is blocked** by the pre-existing route conflict until
`frontend/app/sitemap.xml/route.ts` is renamed `.DISABLED-FOR-DEV` (§14.5).
**It must be renamed back before any push or the live sitemap breaks** — the
pre-push check is `test -f frontend/app/sitemap.xml/route.ts`.

**Commit + deploy.** The working tree carries 3,352 modified audit PNGs;
**verified 0 non-PNG tracked modifications**, so commit by explicit path only —
never `git add .` (§A.3). Then `deploy.sh > log 2>&1; echo EXIT=$?`, never
`| tail`. Cloudflare edge-caches the hub 300s: verify the **origin**
(`curl 127.0.0.1:3000` with a Host header) before believing a correct deploy
looks broken.

---

## Risks

- **Metered PDF links on cards are stricter than the landing pages**, which link
  the raw file unmetered. That inconsistency predates this work; flagged as a
  follow-up rather than changing ~43,000 landing pages inside a redesign.
- **Page 1 loses its "biggest families first" gradient** — deliberate (see A),
  and the reason C and D ship in the same change.
- **Deleting the strips removes ~28 cards and ~130 chip anchors from page 1.**
  Acceptable only because the ordering now puts those families on page 1-2 by
  construction; the link-parity gate measures it rather than assuming it.
- **Print-only thumbnails are white-heavy** in the 4:5 crop (the sheets
  genuinely have a lot of white space). Real, visible in the render, and *not*
  caused by this work — raised separately rather than papered over.
