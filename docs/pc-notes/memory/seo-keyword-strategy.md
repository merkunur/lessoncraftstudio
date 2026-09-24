# SEO Keyword Strategy

> **REWRITTEN 2026-06-14.** The prior content was the pre-pivot **seller-era** strategy ("100% seller-focused", Etsy/KDP/TPT, "never teacher keywords") — fully obsolete since the 2026-05-17 pivot to free multilingual K-3. Kept only as a note that it existed. Current reality below.

## Current positioning (post-pivot)
Free, no-login, multilingual K-3 classroom resources. Audience = teachers/parents of 3-7-year-olds. NO seller/Etsy/KDP/"sell printables" language anywhere. Two indexable surfaces carry the keyword load:
1. **Worksheet-maker pages** (`/[locale]/tools/<native-slug>`) — the GSC-proven organic-traffic surface (cryptogram maker, sudoku maker, i-spy/word-search generator). "maker/generator" intent. Catalog-independent.
2. **Landing pages** (`/[locale]/worksheets/<slug>`) — per-deck demand-keyed titles (§22.4 rekey: es/en/de done; grade-led es/en, range-led de).

## Per-locale demand patterns (harvested)
- **de:** head term + `… erstellen` / `… Generator`; modifier `kostenlos` / `zum Ausdrucken`. Range-led for landings (`bis N`).
- **sv:** `skapa …` (verb) + head term; modifier `gratis` + `att skriva ut`; word-search = **ordsök** (NOT ordletare).
- **nl:** `… maken` BEATS `… generator` (verb-led); modifier `gratis` + `printen`; grade frame `groep 1-4`; maze = **doolhof** (not plaatjespad).
- **it:** `generatore di …` / head term + `da stampare` + `gratis`; word-search = **crucipuzzle**, scramble = **anagrammi**, bingo = **tombola**, maze = **labirinti**, patterns = **sequenze logiche**. **LANDING harvest 2026-06-15 (google.it: PianetaBambini/PortaleBambini/Fantavolando):** RANGE-LED `Schede di [op] entro il [N] [senza cambio] – [Tema] | da stampare PDF` (arithmetic; N from band 10/20/100); readiness Pattern-B `[Token] – [Tema] | schede da stampare PDF gratis`. Head noun **`Schede di addizioni`** dominant; no-carry = **`senza cambio`** (NOT `senza riporto`, which didn't surface); print tail **`da stampare PDF`**. Applied in `rekey-it-titles.js` (it Part 1, 2026-06-15).

## W2 maker-title rekey — SHIPPED 2026-06-14 (commit `00716081`)
Re-keyed the 12 generator-intent maker titles in de/sv/nl/it to lead with the harvested head term (data-only: metaTitle/metaDescription/name/tagline; body/slug/route untouched). Key corrections: de cryptogram→**Geheimschrift** (Kryptogramm = near-zero K-3 demand), wordsearch+**Suchsel**, find-objects→**Wimmelbild**, picture-path→**Labyrinth**, pattern-train→**"Muster fortsetzen"**; it/nl/sv per the patterns above. Note: "Buchstabensalat" is the de **word-scramble** term (single-word letter-scramble), NOT word-search — keep them distinct. sv `[NSR-FLAG]`. Verify: `node scripts/audit-maker-pages.js --locales=de,sv,nl,it`. Full detail → CLAUDE.md §22.4 + the SEO-rescue plan file `~/.claude/plans/the-seo-of-the-mossy-hippo.md` (PART W2).

## Rules (current)
- Honest-fit gating: "kostenlos/gratis/da stampare/printen" only where true (all maker tools ARE free + printable → allowed).
- metaTitle keyword-first, keep `| LessonCraftStudio` suffix, ~≤60 chars before brand (display budget).
- metaDescription 120-170 chars (catalog band §21.2).
- Each new rollout locale needs its OWN regional-Google autocomplete harvest BEFORE build (born keyword-correct, no retrofit — the es/en/de lesson).
- Native ensembles (§A.13.48) for new TYPE/LOCALE; not for ordinary rekeys of existing strings.
