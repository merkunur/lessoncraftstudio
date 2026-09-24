---
name: project-worksheets-like-topic-levers
description: "Why Google favors /topic hubs over /worksheets landings, and the Lever A+B (hub facet directory + densified landing mesh + ItemList) built 2026-07-22 to close the gap"
metadata: 
  node_type: memory
  type: project
  originSessionId: 003ce08f-1812-43ce-acc3-c297a0316fb9
  modified: 2026-07-22T12:25:10.398Z
---

# Making /worksheets landings behave like /topic pages (2026-07-22)

Operator asked why Google prioritizes /topic pages over /worksheets landings and how to make
worksheets behave the same. Comparative diagnosis (two code audits + prior crawl evidence):

**WHY topic wins on all 4 crawl→index→rank properties, landings lose on all 4:**
1. Crawl-graph position — topic = HUB linked from home/footer/nav/breadcrumbs/sibling+cross-axis
   strips (~6 surfaces, depth 1-2). Landing = LEAF, ZERO home/footer/nav links (those reach the
   /worksheets HUB, never a landing), only topic-hub `TopicLandingLinks` + ~8-10 lateral mesh.
2. Content shape — topic = unique AGGREGATION (CollectionPage+ItemList, deck grid). Landing =
   WRAPPER around ONE deck (iframe + 3 paras, LearningResource) = a duplicate-twin of the already-
   indexed deck.html + PDFs → Google keeps the atomic originals, treats the wrapper as redundant.
3. Text uniqueness — aggregation is unique; landing text was theme-swap boilerplate (now 71% carry
   unique content). 4. Crawl history/authority — topic established; landings June-2026, and the
   total crawl budget collapsed ~94% post-10-12-Jul churn → the 30K thin-leaf tier gets ~0 fetches.
Sharpest: a topic page ranks because it has NO duplicate; a landing struggles because it IS a
wrapper-twin of URLs Google already has.

**Constraints:** §21.5a churn freeze (no title/meta/canonical/slug rewrites until ~2026-09-01) +
the sequencing law (build landing crawl+content FIRST, retire deck.html SECOND, PDFs LAST — reversing
it caused the 2026-05-31 crash). Operator chose "ship next safe lever now" (Lever A+B), NOT the
gated decisive move (Lever D = deck.html noindex).

## LIVE 2026-07-22 (commit `13e3cb18`, deployed + verified) — Lever A + Lever B, all additive/§21.5a-safe
Deploy: staged EXACTLY the 15 files (rest of working tree = pre-existing churn) → commit → push →
`deploy.sh` (smoke+payment-canary green) → `render-landing-html.js --locales=<all11>` (30,078 pages,
21s). Verified live cache-busted: hub en "Browse by theme/level" + de "Nach Thema stöbern" + crawlable
`?theme=`/`?level=` links; landing en+de carry the `ItemList` JSON-LD + 16 visible mesh anchors.
- **Lever B — densify landing↔landing mesh + ItemList signal.** `getRelatedLandings` caps 4/4/2 →
  6/8/4 in BOTH copies: `frontend/lib/seo/landing-content.ts` (Next fallback route) AND
  `scripts/seo-landing/render-landing-html.js` (the LIVE static surface — the Next /worksheets/[slug]
  route is `force-dynamic` fallback-only; served pages are static HTML from this renderer). Added a
  related-worksheets `ItemList` JSON-LD (from the VISIBLE carousel+sameTheme+sameLevel, deduped, ≥2)
  in the static renderer AND `worksheets/[slug]/page.tsx`. Verified render: 12 visible mesh anchors +
  4 carousel + 16-item ItemList mirroring visible links.
- **Lever A — complete crawlable facet directory on the /worksheets hub.**
  `frontend/app/[locale]/worksheets/page.tsx` now renders always-visible "Browse by theme" (ALL
  themes, not gated behind the sidebar's JS "show all") + "Browse by level" `<a>` directories linking
  `/worksheets?theme=X` / `?level=Y` filtered views → every facet 1-hop off the hub, every landing
  ≤2 hops. New i18n keys `worksheetsPage.browse.browseByTheme|browseByLevel` in all 11 messages/*.json.
- Note: the hub pagination (`Pagination.tsx`) + cards (`WorksheetCatalogCard`, Next `<Link
  prefetch={false}>`) already emit REAL crawlable `<a>` — the gap was crawl DEPTH (windowed 5-page
  pagination) + thin lateral mesh, NOT non-crawlability.

## PIVOT (2026-07-22) — PRUNE REJECTED, ENRICHMENT SHIPPED (`42938d65`)
Three expert agents recommended PRUNING (noindex 21K "thin/scaled-content" landings). **Operator
REJECTED it — hard: "Every time I ask for an SEO solution you treat the content as garbage. They are
valuable and product of years of hard work."** He was RIGHT, and the prune framing was wrong:
- **Lesson (feedback): the worksheets are NOT garbage.** The value is real; it was just locked in the
  worksheet IMAGE/PDF and the HTML didn't expose it as text. The fix is ENRICH (surface the value), never
  delete/noindex. Do NOT propose pruning the catalog again.
- Measurement corrected my own framing: my first census used `imageNouns>=3` and UNDERCOUNTED (augment
  emits at `>=2`; pattern-train's 2-element A/B patterns are covered). TRUE coverage was 70.6%, not the
  28.9% the prune-`v1` filter implied. The "keep iff has-CCSS-standard" filter was invented, not a quality
  signal — it would have buried ~12.7K already-unique pages.
- **Shipped enrichment (extractor branches, all pages stay indexable, additive/§21.5a-safe):**
  shadow-match `bundle.pairs[].topImageKey` → real object list (+922); picture-path (non-EN name for
  picture-trail) + treasure-hunt legend branch (maze-only `legend:null` variants → grid fact); word-guess/
  word-scramble get NO count (their `slots` are LETTER slots → would falsely read "35 words"). Files:
  `scripts/seo-landing/augment-landings-real-content.js` (bundleFallback + wantsBundle). Answer-hygiene
  (`HIDE_WORD_TYPES`) untouched. Ship = `augment --locales=all` + `render-landing-html --locales=all11`
  (landing-only, NO Next build). **Result LIVE: STRONG content 70.6%→74.6%; structured (strong+answer-safe
  facts) 91.7%; only 8.3% genuinely image-native prose-only** (missing-pieces single-image, answer-leak
  word-guess/scramble, vocab-gated find-objects/more-less/odd-one-out).
- Diagnostic tool: `scripts/seo-landing/compute-landing-keepset.js` (UNTRACKED, ran via /tmp) = per-type
  content-coverage census; `--criterion=content` is the honest coverage measure.
- **Residual enrichment (NOT done, honest):** find-objects/more-less/odd-one-out non-EN vocab gaps
  (~1,795) = operator-gated `image-vocabulary.js` §10.3 extension; printable families (~231) need the
  `gen-printable-*.js` generators to emit a data source; missing-pieces (923) is a single composite image.
- **HELD (offered, NOT applied — operator sensitive to de-indexing):** Track D = deck.html `noindex`
  (dedup 4→2 URLs, keeps deck 200/playable) + topic-link trailing-slash 308 crawl-waste fix. Surface as
  next step; do not apply unilaterally.
- **Honest ceiling (unchanged, stated to operator):** unique content is NECESSARY but NOT sufficient —
  domain authority/age gates ranking (months); English head terms unwinnable near-term; winnable = long-tail
  + non-English. Content makes pages DESERVE to rank; authority LETS them.

## SINGLE-CANONICAL-SURFACE — Phase 1 LIVE + Phase 2 CANARY LIVE (2026-07-22, `28d58648`+`c5ac163a`)
Operator mandate: "/worksheets is THE page Google should index/show. noindex the PDFs / decks if needed.
Do it the best possible way, crystal clear to Google." 2 SEO expert agents → single-canonical-surface arch.
**Two hard rules the experts surfaced:** (1) `noindex` + `rel=canonical` on ONE url CANCEL (noindex wins,
signal destroyed) = the mechanism of the May 80→15 crash — never combine. (2) `indexifembedded` (paired
with noindex) lets an iframed deck index AS PART OF the landing instead of competing; a noindexed iframe
does NOT deindex the parent (Mueller).
- **Phase 1 LIVE (safe, zero-risk):** deck.html → nginx `X-Robots-Tag: noindex, indexifembedded` (keep 200
  — the landing iframes it; a 301 would break the embed) via `scripts/publish-cli/patch-nginx-deck-noindex.py`
  (targets ONLY the `try_files /deck.html` block). Landing JSON-LD → added the printable PDF as an `encoding`
  MediaObject (application/pdf) so the LANDING owns the "printable pdf" resource (`render-landing-html.js` +
  `[slug]` route; re-rendered all 30,078). Verified: worksheets **consistency triangle byte-perfect**
  (self-canonical == sitemap == hreflang, no-slash www); topic hub funnels 101 landing links.
- **Phase 2 CANARY LIVE (the crash-safe PDF handling):** `patch-nginx-pdf-noindex-canary.py` — http-context
  `map $uri $pdf_canary_robots` (noindex for the slice, "" else) + `add_header X-Robots-Tag $pdf_canary_robots
  always` on the printable serve blocks. **Slice = EN addition+subtraction printable PDFs** (deck slugs are
  NATIVE-language → a type-prefix slice is per-locale; the `(en|de)…(addition|subtraction)` first try MISSED
  de because de uses `subtraktion-`). Verified: en addition/subtraction printable.pdf → 200+noindex; wordsearch
  + de/fr + all landings unchanged/indexable. `--revert` + timestamped backups; idempotent.
- ⚠ **KILL-SWITCH is GSC-ONLY, not origin logs:** printable PDFs have `max-age=2592000` (30d) → clicks are
  Cloudflare-edge-served and NEVER hit origin nginx (baseline measured 0 PDF clicks in origin logs = a caching
  artifact, NOT proof of safety). Operator must watch **GSC Performance → clicks by page** for the en
  addition/subtraction PDFs + landings; revert (`--revert`) if combined clicks fall ≥25% below the 14-day
  baseline for 3 straight days. **EXPAND corpus-wide only if the canary HOLDS** (widen SLICE_RE, or the existing
  full-corpus `patch-nginx-pdf-noindex.py` — but that is the crash tool, gated on canary evidence).
- **nginx maps live at cfg lines 8-48 (http ctx, before server{})**; `$deck_redirect` is the anchor. Map source
  MUST be `$uri` not `$request_uri` (the latter includes `?query` → breaks `…\.pdf$` anchor + cache-bust tests).

## Deploy + measure (next session)
- hub/route/messages ride normal `deploy.sh`; the LIVE landing HTML needs `render-landing-html.js
  --locales=<all> --out=/var/www/lcs-media/landings` (§22.5 flow, no Next build) for Lever B to show.
- Stage ONLY the 15 touched files (2 routes + landing-content.ts + render-landing-html.js + 11
  messages); the big image/vocab/gate working-tree churn is PRE-EXISTING, not this work — do not sweep in.
- MEASURE 2-3 wk (GSC coverage + nginx googlebot /worksheets/ fetch trend + `site:`). THEN, gated on
  landings crawling+indexing: Lever D (deck.html `X-Robots-Tag: noindex`, model on
  `patch-nginx-answerkey-noindex.py`, cover collapseSiblings) — the decisive de-duplication move.
Plan file: `C:\Users\rkgen\.claude\plans\analyze-thoroughly-and-find-elegant-allen.md`.
Related: [[project-landing-unique-content-pilot]], [[project-crawl-focus-landings-over-pdfs]],
[[project-crawl-budget-collapse-2026-07]].

## Two framings relocated from the MEMORY.md index (2026-07-30)

⚠ **IndexNow reaches Bing and Yandex ONLY — it is not a Google signal.** `deploy.sh` submits to
IndexNow on every deploy and reports `HTTP 200`; that 200 says nothing about Google. Never cite an
IndexNow submission as evidence that Google has been told anything. Google gets URLs via sitemaps,
crawl, and Request-Indexing.

⚠ **The 0-impressions shape is a DUPLICATE-WRAPPER migration, not a content problem.** Each
worksheet exists as 3-4 URLs — `deck.html` + `printable.pdf` + `answer-key.pdf` + the `/worksheets/`
landing. Google keeps the **atomic originals** it already has crawl history for and skips the
wrapper, and because `deck.html` != the landing, the `rel=canonical` pointing at the landing is not
honoured. The operator's ruling stands: **`/worksheets/` is THE surface**, so the levers work by
making the wrapper the only indexable member of each group rather than by adding content.
