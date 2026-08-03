# SEO Audit — Part 2: International SEO (hreflang & Multilingual Integrity)

**Date:** 2026-05-30
**Site:** LessonCraftStudio — 11 locales (en/de/es/pt/it/nl/sv/da/no/fi/fr), Next.js 14 App Router + nginx-served static deck.html.
**Method:** Read-only. Three senior-SEO expert agents (hreflang/reciprocity · locale-residue/language-leakage · native-slug/register) read code + curl-verified live across all 11 locales; Critical + headline findings re-verified directly. Zero changes.
**Part of:** the 6-part exhaustive SEO audit. Builds on Part 1 (which flagged the deck-side pt/pt-BR drift; Part 2 owns the full multilingual picture).

---

## 1. State of the world (what's working)

For an 11-locale site this dimension is the highest-leverage and highest-risk — and the **Next.js side is in genuinely good shape**:

- **hreflang reciprocity is intact.** Homepage emits a byte-identical 11-locale set + `x-default→en`, reciprocal across all locales. Topic/activity/tool pages are reciprocal too. **No non-reciprocal hreflang found anywhere** — that's the most damaging class (it voids clusters) and it's absent. No sampled hreflang target returned a 404 or redirect.
- **Substrate-honesty is real, not aspirational.** Topic alternates are gated on `decks.length > 0` (`getTopicSiblings:94`); activity/tool on slug presence. Verified empirically: `no` is omitted from the `addition` topic's hreflang set **and** `/no/topic/addition` returns 404 — the declaration matches reality (neither over- nor under-declaring).
- **Native-slug architecture is correct end-to-end.** `/de/topic/tiere/` 200 + `/de/topic/animals/` 404; the §15.10 locale-conditional contract is exact (`/en/decks/picture-trail/` 200, `/de/decks/picture-trail/` 404, `/de/decks/picture-path/` 200); educational-level terms match the §17.4.3 matrix verbatim incl. Nordic (sv Förskoleklass, fi Esiopetus, no 1. trinn); themes 100/100 keys localized in all 11 locales.
- **Register quality is high.** Titles + meta descriptions read idiomatically across all 11 locales, including the NSR-flagged Nordic ones — no machine-translation tells in the sample.
- **Deck + tool SEO chrome is clean of residue** in every sampled non-EN locale — the `_seoT` content-locale-direct discipline (§A.13.46) is doing its job there.

The defects below are concentrated in three places: the **publish-cli deck.html emitter**, the **activity page strand-name rendering**, and **taxonomy slug completeness for `exercise-mode`**.

---

## 2. Findings (ranked)

### 🔴 CRITICAL

**P2-01 — English CCSS strand name leaks into non-EN activity pages (indexable).** *(Effort: M)*
Confirmed live on `/de/activities/bis-10-zaehlen-mit-tieren`: **8 occurrences of "Counting & Cardinality"** in German content — the visible Common-Core chip (`Common-Core-Bereich: Counting & Cardinality`), interpolated body/FAQ prose (`…für Vorschule, mit Schwerpunkt auf Counting & Cardinality`), AND JSON-LD `teaches` + `educationalAlignment.targetDescription`. Reproduces on es/it (and by construction every non-EN activity page × every strand).
**Why Critical:** unlike the §20.8 note (filed as a minor UI-hint bug), this leaks English into *indexable* structured data + body prose on a whole page type — exactly the locale-residue class the platform treats as a publish HALT for decks. Code: `activities/[slug]/page.tsx:244-246` carries an explicit deferred-fix comment; rendered raw at `:211/:218/:324/:482`; interpolated via `activity-content.ts:199`.
**Guardrail gap:** reconciliation invariant 6 (`LOCALE_RESIDUE_DETECTED`) covers decks, not activities; `scripts/audit-activity-pages.js` passes 187/187 because it never checks for strand leakage.
**Fix:** add a localized strand-name table (~6 CCSS domain names × 10 non-EN locales) and render it everywhere the strand surfaces (chip + prose interpolation + JSON-LD); add a strand-leak assertion to `audit-activity-pages.js`.

### 🟠 HIGH

**P2-02 — deck.html hreflang + `<html lang>` emit bare `pt`, not `pt-BR`.** *(Effort: M)*
Live `/pt/decks/picture-path/` and `/it/decks/picture-path/` emit `hreflang="pt"` and `<html lang="pt">`, while every Next.js page type emits `pt-BR` via the SoT `getHreflangCode` (`hreflang.ts:27`). The same deck.html also self-contradicts: `og:locale=pt_BR` (correct) but `hreflang=pt` (wrong). Root cause: publish-cli is a separate CJS world that emits `s.language` directly (`substitute.js:268`, `populate-and-inject-hreflang.js:79`) instead of the mapped code — the exact drift the SoT docstring warned about (`hreflang.ts:16-18`). Affects the largest URL class (~16k decks).
**Fix:** route publish-cli hreflang + html-lang through `getHreflangCode`; re-inject into existing deck.html (existing tooling: `populate-and-inject-hreflang.js`).

**P2-03 — deck x-default falls back to `da` for clusters with no `en` member.** *(Effort: S — same retrofit pass as P2-02)*
Live `/pt/decks/picture-path/` and `/it/...` emit `x-default → /da/decks/picture-path/` (picture-path has no en deck). Cause: `substitute.js:270` picks the alpha-first sibling when no en exists; alpha-first = `da`. Wrong x-default target for every non-en deck cluster. en-bearing clusters correctly resolve x-default→en.
**Fix:** fallback order en → oldest/first-published, never alpha-first.

**P2-04 — English `exercise-mode` token baked into non-EN deck slugs.** *(Effort: M forward + L retrofit)*
Confirmed: `/de/decks/addition-find-addend-bauernhoftiere-9dab/` (title "Addition Arbeitsblatt — Bauernhoftiere"), `/es/decks/adivina-la-palabra-easy-4-de-julio-c653/`. `frontend/config/topics-taxonomy.json axes.exercise-mode` has **37 of 50 keys with zero non-EN slugs**; `slug.js:62 localizeAxisKey` falls back to `slug.en`, baking `find-addend`/`easy`/`image-image`/`i-spy`/`cross-out`/`findbig` into native URLs. Shard-0 sampling implies **~8,000–15,000 URLs** catalog-wide.
**Why HIGH not Critical:** routing works and titles are native — it's an in-URL English-keyword leak that weakens native-language relevance and per-§17.4 doctrine, not a broken page.
**Fix:** fill `axes.exercise-mode.<key>.slug.<locale>` natively (stops all future waves; NSR for sv/da/no/fi); optionally retrofit published de/es/fr/it/pt via the ES-wave unpublish-republish precedent.

**P2-05 — "Browse All Apps" English nav CTA on every non-EN page.** *(Effort: S)*
Confirmed de+es topic/activity/tool pages carry the English label in the CategoryNav RSC payload, while sibling nav chrome IS localized (Sortieren nach / Ordenar por / Neueste). Sibling to the `69d7cfdb` `browseAllHref` fix — one label missed.
**Fix:** route the label through the existing nav i18n namespace.

### 🟡 MEDIUM

**P2-06 — Standards page og:locale is bare + emits no og:locale:alternate.** *(Effort: S)*
`standards/[code]/page.tsx:119` uses `locale: params.locale` (not `ogLocaleMap`) and sets no `alternateLocale`. Live `/pt/standards/2.OA.C.3` → `og:locale="pt"` (should be `pt_BR`), zero alternates. The only Next.js page type that drifts here; its hreflang itself is fine. Fix: `ogLocaleMap[locale]` + add the 11-locale alternate set.

**P2-07 — Tool `<title>` double-brands.** *(Effort: S)*
All tool pages × 11 locales render `… | LessonCraftStudio · LessonCraftStudio` — brand appended twice (page title already brand-suffixed, then the root template appends again). Fix the tool page title construction.

**P2-08 — sv/da/no/fi/nl pre-native-slug residue decks ship fully-English slugs.** *(Effort: S–M)*
`/sv/decks/bingo/`, `/da/decks/crossword/`, `/fi/decks/cryptogram/`, `/nl/decks/prepositions-fillin/` — the thin-locale baseline (~44–72 decks/locale; no=1) predates native slug derivation. Titles are native; slug-only defect. Republish with the now-native derivation (folds well into each locale's first Track-C wave).

**P2-09 — Stale fi meta connector "varten".** *(Effort: S)*
Live fi decks render "…(Eläimet) **varten** Esiopetus" (wrong register); canonical is already fixed (`translations-shared.js:591 seoFor="tasolle"`). Live decks predate it; regeneration fixes (fold with P2-08-fi).

**P2-10 — `reconcileLocaleResidue` gate weakness (latent).** *(Effort: M)*
The trace path sets `isLocalized = nonEmpty` for canvas-cached fields (typeName/instruction/themeName at `catalog-export.js:316,329`) — an English-baked-but-non-empty value would pass the publish gate. No live deck residue found, but this is structurally why the §A.13.46 bugs surfaced post-publish rather than at the gate. Harden the predicate to compare against a localized reference, not just non-emptiness.

### 🟢 LOW / INFO

- **P2-11** — deck.html emits no `og:locale:alternate` (weak/legacy signal). *(LOW)*
- **P2-12** — activity JSON-LD `inLanguage` is bare locale, not the hreflang code (`activities/[slug]/page.tsx:207`). *(LOW)*
- **P2-13** — `axes.exercise-type.matching.slug.no = "matching"` — English left in Norwegian (sv/da use "matchning"). *(LOW)*
- **P2-14** — DE topic "Filter" sidebar heading (German loanword — borderline acceptable). *(LOW)*
- **P2-15** — taxonomy key typo `thanksgivinng` (renders correctly; cosmetic) + documented `household_bw` es/it slug collision (§16.5.1 Option A; data fix tracked in §A.7.1). *(INFO)*

### ↪ Routed to Part 3
- **P2-16** — DE preschool decks: title "Vorschule" vs JSON-LD `educationalLevel:"Kindergarten"` (different age bands). This is a §17.8.6 level-mapping data bug, not language leakage — handed to Part 3 (structured-data) to assess scope.

---

## 3. Scorecard

| Dimension | Status | Evidence |
|---|---|---|
| hreflang reciprocity (Next.js) | 🟢 | byte-identical reciprocal sets; no non-reciprocal cluster found |
| substrate-honesty | 🟢 | deck-gated/slug-gated alternates; `no` omitted ⇄ 404 |
| native-slug architecture | 🟢 | native topic/deck slugs; exact §15.10 404 contract |
| per-locale register quality | 🟢 | idiomatic titles/meta incl. Nordic (minor stale fi connector) |
| deck/tool SEO chrome residue | 🟢 | `_seoT` clean across sampled non-EN |
| hreflang code correctness (deck-side) | 🟠 | bare `pt` not `pt-BR`; x-default=`da` (P2-02/03) |
| native-slug completeness | 🟠 | English exercise-mode tokens in ~8–15k URLs (P2-04) |
| shared-nav residue | 🟠 | "Browse All Apps" English on non-EN (P2-05) |
| og:locale completeness | 🟡 | standards bare + no alternates; deck no alternates (P2-06/11) |
| `<html lang>` / Content-Language | 🟡 | deck-side bare `pt` (P2-02) |
| **activity strand residue** | 🔴 | English "Counting & Cardinality" in non-EN prose + JSON-LD (P2-01) |

---

## 4. Remediation order

1. **🔴 P2-01** — localize CCSS strand names on activity pages + add the strand-leak guardrail to `audit-activity-pages.js`. *(Only Critical; touches indexable JSON-LD across a whole page type.)*
2. **🟠 P2-02 + P2-03** — one publish-cli fix (`getHreflangCode` for hreflang + html-lang; en-first x-default) + a deck.html re-injection pass. *(Closes Part 1 P1-03 too.)*
3. **🟠 P2-04** — fill `axes.exercise-mode` native slugs (forward-fix); schedule the published-deck retrofit.
4. **🟠 P2-05** — localize the "Browse All Apps" nav label.
5. **🟡 P2-06 / P2-07** — standards og:locale + alternates; fix tool title double-brand.
6. **🟡 P2-08 / P2-09** — republish sv/da/no/fi/nl English-slug residue (fi also clears the "varten" connector).
7. **🟡 P2-10** — harden `reconcileLocaleResidue` against non-empty-≠-localized.
8. **🟢 P2-11…P2-15** — opportunistic.

---

## 5. Notes for the master roadmap

- **Net-new vs known:** P2-01 (activity strand leak as an *indexable* defect, not just a UI hint), P2-04 (exercise-mode slug leak at 8–15k-URL scale), P2-05 (nav label), P2-07 (tool double-brand) are net-new. P2-02/03 are the deck-side continuation of Part 1's P1-03.
- **Two guardrail gaps worth fixing structurally:** the activity-page audit doesn't check locale residue (P2-01), and the deck publish gate can pass non-empty English (P2-10). Both mean "100% pass" understates real residue risk.
- **Cross-system root cause theme:** the deck-side defects (P2-02/03, and Part 1 P1-03) all stem from publish-cli re-inlining locale logic instead of consuming the `hreflang.ts` SoT. A single "make publish-cli consume the SoT" effort closes several findings at once.
- **Read-only confirmation:** no code/config/server/DB changes. Only this report was written, under `docs/audit-results/`.
