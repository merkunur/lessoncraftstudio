# (μ) slug-rationalization diagnostic — Phase 0+1 inventory + root-cause classification

**Type:** `[DOCS][PILLAR-4]` (μ) diagnostic sub-commission per operator Item D (4) ratification
**Branch:** `pivot/printable-business-toolkit`
**Authored:** 2026-05-11
**Status:** Phase 0+1 CLOSED. Phase 2 path ratification surfaces at next-session commencement.

## 0. Trigger context

Pillar 4 Arc 2 close adjudication batch (Item D) surfaced trajectory signal: **en title_hash backfill rate DROPPED 74.7% → 69.2% (5.5pp)** between Phase 0 substrate audit (this commission's commencement) and Pillar 4 Arc 2 close. 1,288 en NULL + 195 Tier 3+4 NULL = **1,483 total NULL title_hash entries** at production DB inventory.

Per [ARC][SEO][DECK-PAGE] Phase 4a Adjudication 3 ((θ) ratification): "Apps emit structurally-unique titles by construction post-(θ); future publishes structurally cannot ship with title collisions." That claim is empirically broken.

Operator Item D (4) reframed CC's 3-option absolute-residual framing → diagnostic-first commission identifying structural-regression class before any retrofit/commission lock.

## 1. Phase 0 — Sample inventory + classification

### 1.1 Per-app title_hash distribution (en locale, all decks)

| App (sorted asc by backfill rate) | Total | With hash | Pct |
|---|---:|---:|---:|
| picture-path | 1 | 0 | **0.0%** |
| picture-sort | 245 | 1 | **0.4%** |
| cryptogram | 100 | 1 | **1.0%** |
| math-worksheet | 413 | 53 | **12.8%** |
| grid-match | 152 | 47 | **30.9%** |
| math-puzzle | 148 | 49 | **33.1%** |
| more-less | 158 | 54 | **34.2%** |
| shadow-match | 140 | 48 | **34.3%** |
| bingo | 36 | 18 | **50.0%** |
| prepositions | 203 | 102 | **50.2%** |
| code-addition | 154 | 102 | **66.2%** |
| pattern-train | 257 | 249 | 96.9% |
| alphabet-train | 39 | 38 | 97.4% |
| word-guess | 49 | 48 | 98.0% |
| wordsearch | 93 | 92 | 98.9% |
| subtraction | 212 | 211 | 99.5% |
| addition | 231 | 230 | 99.6% |
| (13 apps at 100% backfill) | 1,853 | 1,853 | 100.0% |

**10 apps below 70% backfill account for ~99% of en NULL universe.**

### 1.2 NULL title patterns by (app, en_title)

Sample of top NULL patterns:

| App | en_title (the IDENTICAL string emitted for ALL decks) | NULL count |
|---|---|---:|
| math-worksheet | "Math Worksheet Practice" | 360 |
| picture-sort | "Picture Sort" | 244 |
| grid-match | "Grid Match" | 105 |
| more-less | "More or Less Practice" | 104 |
| prepositions | "Prepositions Practice" | 101 |
| math-puzzle | "Math Puzzle Practice" | 99 |
| cryptogram | "Cryptogram Practice" | 99 |
| code-addition | "Code Addition Practice" | 52 |
| shadow-match | "Shadow Match" | 49 + "Make It Whole" 43 |
| bingo | "Picture Bingo" | 18 |
| (singletons) | various; 1 NULL each in addition + word-guess + picture-path + wordsearch + alphabet-train + subtraction + pattern-train (8 NULL) | 14 |

**Total NULL accounted by identical-title pattern: ~1,274 / 1,288 = 99% of en NULL universe.**

### 1.3 Sample manifest inspection

Sample picture-sort NULL deck:
- `id: cmoxiah6w006rgxmkp7s1o3iz`
- `slug: picture-sort-bakery-vs-camping`
- `title: {"en": "Picture Sort"}` ← **GENERIC; not unique per-deck**
- `created_at: 2026-05-08 22:48:11.913`

Sample picture-sort success-state deck (only 1 of 245):
- `id: cmoxia2xn0000gxmkdq4w6cz2`
- `slug: picture-sort-4th-of-july-vs-accessories`
- `title: {"en": "Picture Sort"}` ← **same generic title**
- `title_hash: 65f2d8d...` ← FIRST insertion got hashed
- `created_at: 2026-05-08 22:43:xx` (earliest picture-sort insert)

### 1.4 Tier 3+4 NULL pattern (separate sub-class)

Tier 3+4 (da/fi/fr/it/no/pt/sv): 195 total NULL decks; 1 per (locale, exercise_type). All native_title variants observed — some titles localized correctly ("Sjov Addition" da; "Hauska Yhteenlasku" fi), some apps still emit English titles in non-en locales ("Code Addition Practice" in da).

**Tier 3+4 sub-class characteristics:**
- 1 deck per (locale, app); NO within-locale title-collision possible
- All NULL despite being FIRST-publish-per-locale
- Distinct from en sub-class (which is collision-driven)

This suggests Tier 3+4 NULL is a SEPARATE failure mode — possibly:
- Single-publish code path skipping title_hash assignment
- Tier 3+4 publishes routing through legacy CLI path without seo-reconciliation gate
- (Or both)

## 2. Phase 1 — Root cause classification

### 2.1 en NULL universe (~1,288 decks, 10 apps): **AUTHORING-SIDE REGRESSION**

**Class:** Authoring-side emit-site regression at 10 §14.10 catalog apps.

**Root cause:** The 10 affected apps emit `manifest.json.title` as a GENERIC app-name string (e.g., "Picture Sort", "Math Worksheet Practice") — IDENTICAL across all decks regardless of theme/mode/variant. The DB schema enforces `@@unique([language, title_hash])` on `decks` table; identical-title decks within the same locale produce hash-collision → only FIRST insertion gets `title_hash`; subsequent inserts NULL'd to avoid constraint violation.

The 10 affected apps and their generic-title patterns confirm this is structural at the app emit-site, not in publish-cli or DB layer.

**The Phase 4a Adjudication 3 ((θ)) claim — "Apps emit structurally-unique titles by construction post-(θ)" — is empirically broken for 10 apps.** Either the (θ) ratification specifically addressed a subset of apps + the 10 affected apps were never fixed, OR all 10 regressed post-(θ).

### 2.2 Tier 3+4 NULL universe (195 decks across 7 locales): **PUBLISH-PATH REGRESSION**

**Class:** Publish-cli code-path divergence — Tier 3+4 publish path doesn't propagate title_hash to insertDeck.

**Root cause hypotheses (Phase 2 investigation needed):**
- §15.18.1 bulk.js wire-in gap may affect Tier 3+4 publishes specifically
- Tier 3+4 publishes may route through single-publish path with different seoRecon options
- Tier 3+4 publishes may pre-date Phase 3a.1 schema migration timing
- publish.js + bulk.js codepath inspection at Phase 2 should identify divergence point

### 2.3 Bounded class (~14 singletons): post-launch deferral acceptable

Singletons across addition + word-guess + picture-path + wordsearch + alphabet-train + subtraction + pattern-train (8 NULL across the 7 apps).

**Class:** Bounded edge-case publish failures (e.g., first-publish race conditions; pre-(θ) residue; isolated manifest issues).

**Root cause:** Various; bounded blast radius. Post-launch deferral defensible per operator Item D framing.

## 3. Phase 2 path recommendation

Per operator's diagnostic-output table at Item D framing + empirical classification above:

### 3.1 Recommended Phase 2 path

**Combined targeted [FIX] + light retrofit:**

1. **Apply Shape A discipline at title emit-site for 10 affected apps** — modify each app's `manifest.json` generation to construct per-deck-unique title incorporating theme/mode/variant info. Examples:
   - `picture-sort`: "Picture Sort: bakery vs camping" instead of just "Picture Sort"
   - `math-worksheet`: "Math Worksheet: addition through 10" instead of just "Math Worksheet Practice"
   - 8 more apps following similar pattern
2. **Investigate Tier 3+4 publish-path divergence** — root-cause why first-publish-per-locale skips title_hash; likely §15.18.1 wire-in extension to cover non-en publishes
3. **Authoring-side retrofit script** — `scripts/publish-cli/rewrite-deck-html-title.js`-style salvage script (per §15.17 pattern) that:
   - Loads all en NULL decks from the 10 affected apps
   - Reconstructs per-deck-unique title from theme/mode/variant fields
   - Updates `decks.title` + computes `title_hash` + writes both
   - Updates corresponding `deck.html` if it carries the title in `<title>` / `<meta name="description">` surface
4. **Tier 3+4 retrofit** — separate retrofit pass once publish-path divergence root-caused; covers 195 NULL Tier 3+4 decks

### 3.2 Phase 2 scope estimate

| Sub-deliverable | Sessions | LoC |
|---|---|---|
| 10-app title emit-site Shape A fix | 1-2 | ~300-500 (10 apps × small fix) |
| Tier 3+4 publish-path root-cause + fix | 0.5-1 | ~100-200 |
| Retrofit script + DB backfill | 1 | ~300-500 |
| Verification + spot-check | 0.5 | n/a |
| **Total Phase 2 scope** | **3-4 sessions** | **~700-1,200 LoC** |

Within Pillar 4 Arc 2 commission cycle precedent.

### 3.3 Phase 2 entry surface

CC: at next-session commencement, operator ratifies Phase 2 commencement scope:
- **(2a)** Full Phase 2 per recommendation above — 10-app fix + Tier 3+4 root-cause + retrofit + verification
- **(2b)** Phased commit per sub-deliverable — operator-strategic batching across multiple sessions
- **(2c)** Defer Tier 3+4 sub-deliverable; ship 10-app fix + en retrofit only; Tier 3+4 surfaces post-launch
- **(2d)** Continue post-launch deferral on all — ratify "bounded class" framing despite trajectory signal

CC default-recommendation: **(2a) Full Phase 2** — root-cause identified; structural fix at 10 app emit-sites + Tier 3+4 publish-path investigation closes (μ) substrate. Single-arc commission shape.

## 4. Operator-strategic surface points

At Phase 2 entry surface:
- **(2a) vs (2b) vs (2c) vs (2d) ratification** — which Phase 2 path commences
- **Concurrent-arc compatibility** — Phase 2 (μ) sub-commission paired with Pillar 2 Arc 7 Phase 2+ + Stream A Arc 2 + Pillar 4 Arc 3 (ζ) per (P3) β shape continuation
- **Sequencing priority** — (μ) Phase 2 may need filesystem-territory clarification vs Stream A Arc 2 (image library substrate) since title emit-sites at 10 §14.10 apps touch app HTML/JS files

## 5. Cross-references

- [ARC][SEO][DECK-PAGE] Phase 4a Adjudication 3 ((θ) ratification): forward-flow correctness claim now empirically broken
- §15.18.1 bulk.js wire-in gap: structural antecedent of Tier 3+4 sub-class regression
- §A.13.6 + §A.13.8 paired discipline: operator Item D (4) ratification embodies cost-recalibration at planning-step boundary
- §A.13.5 Shape A discipline: 10-app title emit-site fix follows Shape A authoring-app pattern
- §15.17 salvage scripts pattern: retrofit script class for ~1,288 en + 195 Tier 3+4 NULL backfill
- `docs/lesson-plans/flashcard-arc-2-recon.md` — Pillar 4 Arc 2 commission close audit-trail

## 6. Phase 0+1 close — Phase 2 ready

**Phase 0+1 CLOSED at this commit.** Phase 2 ratification surfaces at next-session commencement per operator strategic-input on (2a)/(2b)/(2c)/(2d).

**Item 21 fold-queue candidate extension confirmed:** trajectory-check at planning-step (the 5.5pp drop detection via psql query) is a legitimate extension of the Item 21 "mass-run partial-failure rate as commission close-out metric" doctrine beyond mass-run boundary. Discipline applies at any trajectory-check surface.

---

*End of (μ) diagnostic Phase 0+1. Status: Phase 2 ready per operator ratification.*
