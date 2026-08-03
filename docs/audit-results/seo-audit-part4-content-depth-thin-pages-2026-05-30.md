# SEO Audit — Part 4: Content Depth & Thin-Page Analysis

**Date:** 2026-05-30
**Site:** LessonCraftStudio — 11 locales; ~16,551 decks (5 full markets en/de/es/it/pt + thin starter baselines nl/sv/da/no/fi/fr); 9,432 live topic pages; 187 activity + 33 tool landing pages.
**Method:** Read-only. Three senior content-SEO expert agents (thin-page bands · topic-prose coverage · cannibalization/duplicate) inspected the existing thin-page instrument + queue output and spot-verified live; pivotal claims re-verified directly. Zero changes.
**Part of:** the 6-part exhaustive SEO audit. **This part substantially revises the priors.**

---

## 1. State of the world (what's working)

The headline going in was the "8,144-page thin-page queue." That figure is **stale** — it was the *initial* Part-1 baseline, and a thin-page remediation program subsequently ran to completion. Verified state today:

- **Word-count thin pages: 242, zero CRITICAL_THIN** (current authoritative queue `docs/audit-results/thin-page-authoring-queue-20260529-080257.md`, against the 16,551-deck baseline). Band progression across the program's runs: 8,144 → 1,547 → 45 → 400 → **242**.
- **Single-axis topic pages are essentially solved.** 93-100% render bespoke RICH prose; `topicMeta` (purpose-built 120-170 descriptions) coverage is ~100% (en = 135/135 keys; other full-market locales 134 each). Live: `/en/topic/addition/` 308w, `/de/topic/kindergarten/` 254w.
- **Non-EN activity editorial bodies are COMPLETE in all 11 locales** (de/es/it/sv verified fully localized: About / What's Inside / How to Play / Practices / Learning Goals / FAQ). The CLAUDE.md "Phase 3 EN-only" caveat and the `activity-content.ts:21` comment are **stale**.
- **Deck titles are genuinely differentiated** by a content-derived noun phrase (`composeTitle` differentiator: "…Elephant & Dog — Kindergarten" vs "…Vulture & Raccoon…"), not "Set NNN" stubs.
- **Hash-uniqueness HALT predicates enforced** (`seo-reconciliation.js:226,294`) — no exact-duplicate titles/descriptions can publish.
- **Cross-surface is a by-design query ladder**, not cannibalization: a deck, its exercise-type topic, its theme topic, and their intersection carry distinct titles + intents.

**Tooling note:** `page-content.js` is the word-count SoT — it counts only the editorial region (`<h1>` + `.topic-prose` + `.topic-faq` + `.page-usage`), excluding deck-grid/filters/nav/footer, with a per-locale RICH floor (Romance/en 200, Germanic 175, Finnic 150; CRITICAL absolute 50). Live banding matches observation.

The remaining content-depth gaps are about **differentiation of the long-tail, not raw word count or crawl-blocking thinness.**

---

## 2. Findings (ranked)

### 🟡 MEDIUM

**P4-01 — Intersection-page content depth is the real remaining gap.** *(Effort: HIGH if hand-authored; LOW–MEDIUM via template enrichment)*
Of the **8,780 live topic-intersection pages (~88% of the 9,432-page topic surface)**, only ~440 (~5%) carry bespoke authored prose — clustered on the `animals` + `kindergarten` hubs. The rest render a composed ICU template with a one-variable-swap skeleton ("This page brings together N X worksheets for Y. Each is a free printable PDF…"). `topicMeta.<a1>__<a2>` = **0 keys in every locale**, so intersections never get purpose-built meta descriptions (they inherit the prose first-sentence or the composed template).
**Nuance (verified live):** authored-hub intersections DO get distinct bespoke meta — `/en/topic/animals/kindergarten` ("…the most loved picture set…"), `/vehicles/kindergarten` ("…cars, buses, trucks, trains, and planes…"), `/toys/kindergarten` ("…balls, blocks, dolls, cars, and teddy bears…") are genuinely different copy. And the structural ICU floor keeps most intersections above the word-count THIN band. So this is **weak long-tail differentiation, NOT word-count-thin and NOT doorway-class** duplication.
**Pragmatic path:** (i) enrich the intersection prose *template* with more axis-aware/pedagogical variation — lifts the whole long-tail floor at bounded cost; (ii) author bespoke prose for the next hub set beyond animals/kindergarten; (iii) add `topicMeta.<a1>__<a2>` for high-traffic cohorts to break meta sameness where it matters.

**P4-02 — Deck meta-description middle sentence shared verbatim across siblings.** *(Effort: M)*
`addition-find-addend-{animals,farm-animals,zoo-animals}` share the instruction sentence "Count the groups and solve simple sums." verbatim; only the theme parenthetical + `(Set 00N)` vary. Titles carry the differentiator but descriptions don't → a scaled-content *smell* at 16,551 decks. Not cannibalization (hash-distinct; titles/H1/JSON-LD differentiated) and not failing any gate, but the description is the weakest-differentiated SEO surface on the largest URL class.
**Fix:** inject the title's content noun-phrase (the same differentiator) into the description core (`build-seo-head.js:260-307,386-402`).

### 🟡 LOW–MEDIUM

**P4-03 — 242 word-count THIN pages remain.** *(Effort: S)*
Down from 8,144. Composition: mostly topic-intersections at 150-199w sitting just under the per-locale RICH floor (e.g. `/en/topic/kindergarten/addition/` 176w, `/en/topic/preschool/find-and-count/` 184w), plus the **worksheets hub** (190w — ties to Part 3 P3-05's missing JSON-LD), plus a few starter-locale (no/fi/sv/da) hubs with ~no deck volume. Not empty stubs (median 168w; only 2 pages <100w, both the `no` hub starter-locale). Lift opportunistically. **Use the `…-080257.json` 242-row queue, not the stale 8,144 queue.**

### 🟢 LOW / INFO

- **P4-04 (S)** — fr single-axis `topicProse` only 41% authored (~49 fr keys unwritten; fr `topicMeta` already 100%, so descriptions are fine — only the on-page prose body is template on those 49). *(LOW)*
- **P4-05 (S)** — **Stale tooling:** `scripts/audit-{da,nl,sv,no}-cannibalization.js` are seller-era artifacts that audit the pivot-era `frontend/content/themes` tree (not the live deck/topic corpus), cover only 4 of 11 locales, and mutate files. They give false comfort; retire/replace with a check against the live corpus.
- **P4-06 (INFO)** — **Doc drift:** CLAUDE.md §4.3/§19 "decks only in en/es/pt" understates reality (now 5 full markets en/de/es/it/pt); `activity-content.ts:21` "Phase 3 EN-only" comment is stale (all 11 locales complete). Cleanup only.
- **P4-07 (S)** — Add a `topicMeta` 100%-coverage CI assert so a newly-introduced axis-key can't silently fall back to the shared generic template (preserves the current healthy single-axis state).

---

## 3. Scorecard

| Dimension | Status | Evidence |
|---|---|---|
| Word-count thin pages | 🟢 | 242, 0 CRITICAL_THIN (down from 8,144) |
| Single-axis topic prose | 🟢 | 93-100% rich (fr 41% the only gap) |
| Single-axis topicMeta | 🟢 | ~100% purpose-built (en 135/135) |
| Non-EN activity body completeness | 🟢 | complete in all 11 locales |
| Cross-surface cannibalization | 🟢 | by-design query ladder, distinct intents |
| Duplicate content / hash uniqueness | 🟢 | HALT predicates enforced; titles differentiated |
| Topic-intersection differentiation | 🟡 | ~5% bespoke; ~88% of topic surface is templated long-tail (P4-01) |
| Deck-description differentiation | 🟡 | shared middle sentence across siblings (P4-02) |
| Tooling currency | 🟡 | stale 8,144 queue + seller-era cannibalization scripts |

---

## 4. Remediation order

1. **🟡 P4-01** — enrich the intersection prose template (cheap, lifts the long-tail floor site-wide) + author the next hub set + add `topicMeta` for high-traffic intersection cohorts. *(Biggest surface, but low-traffic long-tail — template enrichment is the high-ROI move, not 8,000 hand-authored pages.)*
2. **🟡 P4-02** — inject the title differentiator into deck descriptions.
3. **🟡 P4-03** — opportunistically lift the 242 just-under-floor pages (the worksheets hub overlaps Part 3 P3-05).
4. **🟢 P4-04…P4-07** — fr prose gap; retire seller-era scripts; doc cleanup; topicMeta coverage assert.

---

## 5. Notes for the master roadmap

- **Prior correction:** the audit's framing treated the 8,144-page thin queue as open. It is not — a remediation program closed it to 242. Future planning should anchor on the `20260529-080257` queue and the "5 full markets" reality, not the stale baselines in CLAUDE.md §4.3/§19.
- **Where the content effort actually belongs:** not raw word count (solved) but (a) intersection-page *differentiation* via smarter templates + next-hub authoring, and (b) deck-description differentiation. Both are MEDIUM and template-level — neither requires per-page hand-authoring at scale.
- **Two stale guardrails worth retiring/replacing** (P4-05): the seller-era cannibalization scripts mask the fact that the live corpus has no automated cannibalization check of its own.
- **Read-only confirmation:** no code/config/server/DB changes. Only this report was written, under `docs/audit-results/`.
