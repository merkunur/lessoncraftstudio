---
name: feedback-tier-truth-before-marketing-copy
description: "NEVER write pricing/free-tier marketing copy without verifying the entitlement code first — the operator was enraged by \"every tool is free, unlimited\""
metadata: 
  node_type: memory
  type: feedback
  originSessionId: db802b44-8a35-4a83-a213-df384528d8d3
  modified: 2026-08-01T18:25:37.556Z
---

# Tier truth before marketing copy (operator rage, 2026-08-01)

I shipped homepage copy claiming "Every tool is free, no login / unlimited" without checking entitlements. Operator: "Tools are not free... free only to try with limited features. Free users can also download 3 pdf files in a month. You should fucking check and understand the tiers before you write such strategical text."

**Why:** Marketing copy IS a claim about code behavior. §A.13.29 (behavior-describing content must cite source) applies to marketing exactly as to activity prose. Worse: `docs/SUBSCRIPTION-SCOPE.md` and CLAUDE.md §7 both still say "free for everyone, no tiers" — STALE; the live code disagrees (§21.8F: a doc is not a fact, least of all our own).

**How to apply:** Before ANY tier/free/pricing claim on any surface, verify against the entitlement SoT and cite it:
- Meter: `frontend/lib/quota.ts` — `PLAYS_PER_DAY=10` (shared by tools+activities+interactive decks, anon=free-acct), `DOWNLOADS_PER_MONTH=3` (free ACCOUNT only; anonymous downloads = 0), subscriber unlimited via `isSubscriptionUsable`. `METERING_ENABLED=1` verified live on Hetzner (env var exists ONLY there — check the server, not the repo).
- In-tool depth: 44 of 47 tools gate repertoire/capacity/print/save behind Teacher (per-tool `_fetchEntitlement` block, `class-graph.js:423-449` pattern; only ten-frame/number-line/ruler ungated). "Free apparatus, paid depth + record" (§23.1) is accurate.
- Teacher-only: share links/QR, collections, workspace, hosted maker saves (`requireActiveSubscriber` on every route). Makers: generate free; exports consume the 3/month.
- The pricing page (`pricingPage` namespace, native ×11) is the marketing SoT — homepage claims must not exceed it.

## Round 2 — operator rage again, 2026-09-03 ("Nothing is free. Fuck you!")

Same defect, four more surfaces. Operator: *"It is only limited free usage for free
subscribers to give the opportunity to try."* Fixed in `6ebbfe96`, all 11 locales:
activities-hub pageTitle+pageIntro (incl. the whole "Free, no signup, in 11
languages." sentence) · tools-hub EN pageTitle+pageIntro · the activity FAQ
(`topicFaq.fallback.activity`: deleted the "Is {title} free to use? / completely
free, no signup, no paywall" pair outright, renumbered q3/a3→q2/a2, dropped the
leftover "a free interactive activity" from a1) · maker `labels.launchCta`.

⚠ **The FAQ is ONE ICU template per locale, not per-activity** — `resolveActivityFaq`
→ `fallbackItems` in `lib/seo/topic-faq.ts`. Editing 11 keys clears every activity
page at once, visible `<dl>` AND FAQPage JSON-LD (built from one array). But
`fallbackItems` hard-coded `[1,2,3]`, so deleting a pair would have rendered the
literal key path on every page — the count is now per-variant
(`FALLBACK_ITEM_COUNT`) and the two must move together.

⭐ **A deleted string can make a GATE vacuous.** `audit-maker-pages.js` listed
`Open the free` in `EN_LEAK_MARKERS`; after the fix that string existed nowhere and
the check silently tested nothing. Retargeted to `Open the ` and poison-tested both
directions. **Grep for your removed string in scripts/ before shipping a copy change.**

⭐ **Localised ≠ price claim.** The tools hub reads "Free-play" in EN but "freien
Erkunden / explorar libremente / utforska fritt" in the other 10 — *explore FREELY*,
pedagogy, not price. Measure per locale; a blanket regex over ~2,500 hits would
strip correct pedagogical copy.

**STILL CLAIMING FREE (operator scoped round 2 to visible copy; flagged, unfixed):**
the two hubs' `metaTitle`/`metaDescription` (what Google shows) ·
`topicFaq.fallback.standards.a1` · maker `labels.samplesIntroDefault` · ~1,300
price-word hits in `messages/maker-content/*.json` + ~1,200 in `tool-content/*.json`
(titles, meta, body prose) — native rewriting per locale, its own commission.

## Round 3 — the metadata carve-out (operator ruling 2026-09-14)

Verbatim: *"Because free tier allows 3 pdf download monthly, 'free printable' meta data is right but it shouldn't be anywhere the user can see."* So the rule has two halves: **SEO metadata** (`<title>`, `<meta description>`, OG/twitter, JSON-LD — what Google shows) MAY say "free printable", because the free account really does get 3 PDF downloads a month; **visible page copy** (h1, eyebrow, body prose, FAQ, cards, chips, the printed sheet itself, deck.html `<h1>`/instruction) MAY NOT claim free. This resolves the "STILL CLAIMING FREE" metaTitle/metaDescription entries above as CORRECT-by-ruling; the visible-copy entries (`topicFaq.fallback.standards.a1`, maker `samplesIntroDefault`, maker/tool body prose) stay open. Any free-claim lint must therefore be scoped to visible fields only — a lint over metadata would condemn the ruled-correct lead. Recorded for nt20-C in `docs/worksheet-gen/b3-designs/README.md` open item 1.

**Known open siblings of this defect (surfaced to operator, unfixed):** `aboutPage.intro`/`teamBody` claim "free to print, share... no signup" ×11; `docs/SUBSCRIPTION-SCOPE.md` says the quota infra is deleted (it's live); the 44-tool in-tool premium predicate diverges from `entitlements.ts` (past_due window, canceled-but-paid-through); deliberate unmetered PDF bypasses (right-click-save, raw nginx URLs).

Cross-ref: [[project-homepage-v6-lesson-line]] · [[feedback-verify-rendered-not-source]]

### Two verification lessons bought in round 2

⭐ **A DELETED STRING CAN MAKE A GATE VACUOUS — grep `scripts/` for any string you
remove.** `audit-maker-pages.js` watched for the literal `Open the free`; once the
copy fix landed, that string existed nowhere and the EN-locale-leak check silently
tested nothing forever. Retarget the marker in the SAME commit and poison-test both
directions (must fire on a synthetic leak, must not fire on any real localised page).

⭐ **A COMMENT BESIDE A MARKER ARRAY IS PROSE THE PARSER WILL READ.** My replacement
comment contained quoted sample CTAs, and my own verifier's `/'([^']+)'/` picked the
comment up as a sixth marker. The gate is fine at runtime — the trap is anything that
parses the source. Strip `//` lines before matching, and keep quote characters out of
comments inside literal arrays (fixed in `ec2781d7`).

⚠ **TWO LIVE AUDITS RUN CONCURRENTLY RATE-LIMIT THE SITE AND THEN REPORT FAIL.**
`audit-maker-pages.js` (363 pages, concurrency 8) + `audit-activity-pages.js` (1163)
produced 285/363 and **1163/1163 HTTP 429** — zero pages measured, printed as
failures. **A gate that measures nothing must say so, not FAIL.** Run live audits ONE
at a time, and prefer a gentle serial walk with `?cb=` cache-busting (~2.5-4s apart)
plus an explicit "measured N of M, INCONCLUSIVE if short" line. Edge caching also
serves stale 429s for a while after — cache-bust or you re-read your own rate limit.
