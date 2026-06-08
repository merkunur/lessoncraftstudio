# §14/§16/§17/§18 reference detail (relocated from CLAUDE.md)

> Full text for the porting recipe, topic-taxonomy theme registration, the cross-locale educational-level matrix, the keyword/content-marketing workflows, and the breadth-grid/variety-strip curation. CLAUDE.md keeps the terse rule + pointer. Relocated 2026-06-08 — nothing deleted.

## §14.4 Recipe to port a new app

### 14.4 Recipe to port a new app

**Step A — Decide family.** Fixed answer positions → Family A. Spatial selection/drawing → Family B. See §14.2 references.

**Step B — Metadata patches** (additive, no visual change):
1. `worksheetCanvas.problemsData = <data>;` in `generateWorksheet()`.
2. Tag interactive elements per feature (`isAnswerLine`, `isBlankLetterCell`, `isWordsearchGrid`, etc.).
3. Carry operator choices needed for validation (`worksheetCanvas.letterCaseValue`, `<rowGroup>.resolvedMode`).

**Step C — Download button + wiring** (4 edits): button in dropdown; const declaration; un-disable in `generateWorksheet`/disable in clear; click listener `downloadInteractiveHtml(worksheetCanvas, '<app>_interactive.html')`.

**Step D — Copy closest reference block and adapt:**
- Bump `bundleVersion`; change `appType`, `title`.
- Rewrite `extractDeckBundle` for new slot shape; reuse `_captureWorksheetImage` + `_worldRectBounds`.
- Extend `renderSlots`/`renderGrid`, `checkAll`, `resetAll` for app-specific interaction.
- 7 attribution edits per §14.3.

**Step E — Validate, sync, commit, deploy** (§14.5–§14.6).


---

## §16.5.1 Theme axis-key registration: Path X 1:1 with image-library

#### 16.5.1 Theme axis-key registration: Path X 1:1 with image-library
`axes.theme` registered 1:1 with `image_themes` table `type='images'` rows. **50 color + 50 BW = 100 axis-keys** (post-`947ad260`). Auto-derivation: for each (theme, locale), `slug = slugify(image_themes.displayNames.<locale>)` per §17.8.5; `name = passthrough`.

**Decoration assets** (`type='backgrounds'` 12 rows; `type='borders'` 5 rows) NOT registered — generation-time visual inputs, not catalog-browsing classifications. Registering them produced 27 of 28 surfaced collisions during `947ad260` recon with zero combinatorial gain.

**Drops + renames at `134614dc`:** `food` axis-key DROPPED (no DB theme matched, 0 decks ever). Food-adjacent (`bakery`, `breakfast`, `desserts_and_sweets`, `kitchen_tools`, `at_the_supermarket`) registered separately. `fruit` (singular) RENAMED to `fruits` to match DB.

**`name` field semantic shift at `134614dc`:** from operator-curated singular ("animal") to DB-derived plural-capitalized ("Animals"). 116 published decks pre-`134614dc` keep singular form on end-of-deck links (manifest-baked); new publishes use plural via `__LINK_TEXT_MORE_THEME__`. Coexistence correct; no migration.

**Slug-collision Option A fallback** (`947ad260`): when `image_themes` data has Spanish-displayName collision (e.g., `home_bw` + `household_bw` both `"Hogar BN"`), demoted axis-key uses `slugify(image_themes.name)` for the colliding locale only; `name` passthrough preserved. §A.7.1 documents underlying data fix needed; once renamed Option A removed.


---

## §17.4.3 Cross-locale educational-level matrix (canonical)

#### 17.4.3 Cross-locale educational-level matrix (canonical)

| Locale | preschool | kindergarten | grade-1 | grade-2 | grade-3 |
|---|---|---|---|---|---|
| `en` | preschool | kindergarten | grade 1 | grade 2 | grade 3 |
| `de` | Vorschule | Kindergarten | 1. Klasse | 2. Klasse | 3. Klasse |
| `es` | preescolar | jardín infantil | grado 1 | grado 2 | grado 3 |
| `nl` | peuterklas | kleuterklas | groep 3 | groep 4 | groep 5 |
| `it` | Scuola dell'infanzia (3-5 anni) | Scuola dell'infanzia (5-7 anni) | Scuola primaria classe prima | Scuola primaria classe seconda | Scuola primaria classe terza |
| `fr` | École maternelle (petite/moyenne section, 3-5 ans) | École maternelle (grande section, 5-7 ans) | CP (cours préparatoire) | CE1 (cours élémentaire 1) | CE2 (cours élémentaire 2) |
| `pt` | Educação infantil (creche, 3-5 anos) | Educação infantil (pré-escola, 5-7 anos) | 1º ano do ensino fundamental | 2º ano do ensino fundamental | 3º ano do ensino fundamental |
| `sv` | Förskola | Förskoleklass | Årskurs 1 | Årskurs 2 | Årskurs 3 |
| `da` | Børnehave | Børnehaveklasse | 1. klasse | 2. klasse | 3. klasse |
| `no` | Barnehage (3-5 år) | Barnehage (5-7 år) | 1. trinn | 2. trinn | 3. trinn |
| `fi` | Varhaiskasvatus | Esiopetus | 1. luokka | 2. luokka | 3. luokka |

**Descriptor-differentiation pattern.** Where locale's school-system UNIFIES multiple platform axis-keys under single term, per-locale name maps differentiate via parenthetical descriptor. 4 of 11 apply: `it`/`fr`/`pt`/`no`. 7 with discrete per-axis-key terminology: `en`/`de`/`es`/`nl`/`sv`/`da`/`fi`. Pattern structural to each locale's school system, NOT Romance/Germanic family divide. Cross-system-boundary parentheticals acceptable trade-offs.

**Class 2 collision pattern.** `home_bw` + `household_bw` `image_themes` pair has identical Spanish + Italian displayNames (`Hogar BN` / `Casa BN`) — Class 2 slug collision; resolved via §16.5.1 Option A fallback. Other 9 of 11 locales have distinct translations. State: collision in `es` (`947ad260`) + `it` (`b3f0d1f3`); distinct elsewhere. Underlying §A.7.1 data fix resolves long-term.

**IT retroactive fix (`9ea577fe`).** Italian preschool/kindergarten parentheticals corrected during fr Track A commission. Pre-fix shipped `b3f0d1f3` with age-representative parentheticals; post-fix per §17.4.3 matrix. Safe at fix-time: 0 it decks published. Future retroactive corrections after Track C deck-publish require deck-rewrite + URL-redirect commission.


---

## §17.5 Keyword research workflow

### 17.5 Keyword research workflow

Claude (Anthropic's chat) performs keyword research on demand. When new content is commissioned, Claude is asked to research keyword space for that topic + language. Uses web search to evaluate what currently ranks, competing content, gaps, natural URL slug in target language. Output informs Claude Code's content production.

Working doc `seo-strategy.md` accumulates findings.

For Swedish/Danish/Norwegian/Finnish, native-speaker review recommended before publishing.

Claude's research is strategic, not tactical — can assess "this query has thin competition in Swedish" but cannot produce precise monthly search volumes (requires Ahrefs/SEMrush which operator hasn't adopted).

**Phase 6 NSR-flag list:** 57 keys flagged across 2 populations: 17 organic-phrasing (4 EN + 13 DE) + 40 bulk-i18n-tier (`seo.educational_level.*` + `endDeck.*` × 4 NSR-flagged tiers sv/fi/no/da). Romance Tier 4 (fr, it, pt) authored without NSR per stronger Claude quality assessment. See `project_k3_phrasing_native_speaker_review.md`.

#### 17.5.1 NSR-flag pattern for Nordic + non-Romance commissions
Claude's Nordic quality is weaker than Romance/Germanic. Track A + Wave 1 commissions ship at correct-enough state: auto-derived theme axis-key entries mechanical; topicPage authoring mirrors structural shape; per-locale chrome reaches functional state via cross-locale precedent mirroring. NSR-flag in commit message identifies deferred review. Applies to Nordic + future non-Romance commissions. Does NOT apply where chrome shipped via cross-locale-precedent with native-equivalent confidence.


---

## §17.6 Content marketing surface

### 17.6 Content marketing surface
Practical name TBD ("Blog" / "Guides" / "Resources"). Minimum cadence: one substantive article per week in strongest content language, translated/adapted into priority languages over time.

Article topics specific to multilingual K-3 educators:
- "Five ways to support Spanish-speaking children in English-medium kindergarten"
- "How to choose age-appropriate math activities for multilingual learners ages 4-6"
- "Working with multilingual parents in early childhood programs"
- "Integrating home languages into classroom instruction without disrupting curriculum"
- "Lesson planning for international school early years"

Every guide article embeds a sample deck (§18).


---

## §18.4.1 + §18.4.2 Variety-strip + BreadthGrid curation (canonical spec: SECTION-2-CURATION-v1.md)

#### 18.4.1 Variety-strip composition rules at scale
Cross-reference §16.2 for canonical strip-composition spec.

**Cardinality caps as variety-shape signals.** Each strip's cap encodes the variety SHAPE:
- Strip 1's max-1-per-locale spreads (cross-locale demonstration)
- Strip 2's max-2-per-axis-key allows mild clustering but prevents single-axis-key dominance
- Strip 3's max-1-per-educational-level + per-page-axis self-skip
- Strip 4's max-1-per-topicSlug + max-1-per-locale forces catalog-overview operation

**Self-skip threshold (cardinality < 2).** Single-tile reads broken; minimum 2 signals genuine variety. Per-strip. Locked at 2.

**Cross-locale variety ON during substrate-only-locale period.** Decks from en/de/es/nl surface on it/fr/pt/sv/da/no/fi until Track C lands.

**ISR per-page revalidation.** `revalidate=3600`. No module-scoped global memoization at this scale.

**Worked example: Catalog Variety Arc 1 ship at `55ac5687`.** Canonical reference for future variety-surface commissions.

#### 18.4.2 BreadthGrid 4-family hybrid + 9-cell composition + day-of-week rotation

Shipped at `e5bb3cb4`.

**4-family canonical locale-family map:**
- **Germanic:** en, de, nl
- **Nordic:** sv, da, no
- **Romance:** es, fr, it, pt
- **Finnic singleton:** fi (with Nordic-as-sibling-proxy)

Sibling pools: `en→[de,nl]`, `de→[en,nl]`, `nl→[de,en]`, `sv→[da,no]`, `da→[no,sv]`, `no→[sv,da]`, `es→[fr,it,pt]`, `fr→[es,it,pt]`, `it→[es,fr,pt]`, `pt→[es,fr,it]`, `fi→[sv,da,no]`.

**Visitor-recognition vs linguistic-typology.** 4-family map prefers visitor-recognition over scholarly-typology. Finnic fi grouped with Nordic because Finnish teachers searching for Nordic-language K-3 recognize sv/da/no as adjacent-market peers — even though Finnish is Uralic. nl with Germanic en/de (visitor-natural) not Romance.

**9-cell composition (6+2+1):** 6 visiting-locale tiles + 2 cross-locale tiles (one per sibling rotated) + 1 featured tile (operator-curated; currently `sudoku-en`).

**Day-of-week rotation rhythm:**
```js
function dayOfWeekRotation(): number {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % 7;
}
```
UTC-anchored; within-day stable; varies across days. Preserves ISR-cache (1-hour revalidate). Anti-pattern: per-request randomization (fragments ISR cache).

Origin: `e5bb3cb4`.

---


---

## §16.5 topics-taxonomy.json schema (full)

**`topics-taxonomy.json` schema:**
```json
{
  "$schema_version": "1.0",
  "apps": {
    "<app-name>": {
      "default_subject": "math|letters|logic|spatial-reasoning",
      "default_age_range": "3-5|5-7|6-8|7-9|8-10",
      "exercise_type_axis_key": "<key>"
    }
  },
  "axes": {
    "exercise-type":     {"<axis-key>": {"slug": {"<locale>": "<native-slug>"}}},
    "theme":             {"<axis-key>": {"slug": {"<locale>": "<native-slug>"}}},
    "educational-level": {"<axis-key>": {"slug": {"<locale>": "<native-slug>"}}},
    "exercise-mode":     {"<axis-key>": {"slug": {"<locale>": "<native-slug>"}}}
  }
}
```
