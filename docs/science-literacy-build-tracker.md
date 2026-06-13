# Science + Literacy Verticals — Build Progress Tracker

Durable state for the two-vertical commission (plan: `~/.claude/plans/two-new-worksheet-verticals-polymorphic-axolotl.md`). Resume from here.

## Status: SCIENCE — Gate 2 APPROVED — fanning (EN catalog in progress)

### EN pipeline PROVEN end-to-end (wave `wave-sci-en`, 16 ZIPs, 0 fail)
`node cli.js generate --wave waves/wave-sci-en.json` runs render→QA→manifest→deck.html→ZIP clean. 8 types live in `out/staging/wave-sci-en/`:
K-201 living/non-living · K-202 fruits/vegetables · K-203 healthy food · K-204 pets/wild · K-205 animal-babies(match) · G1-201 animal-classification · G1-202 where-animals-live(3-bin) · G1-203 chicken-life-cycle(sequence). Spot-checked PNGs: correct cross-theme imagery + sort logic.

### Conventions locked (IMPORTANT for resume)
- **Type ids MUST be grade-prefixed** (K-/G1-/G2-) — `ageRangeForSpec` (emit/manifest.js, a protected core) derives age from the id prefix and THROWS on others. Science uses the collision-free **200-block** (K-201+, G1-201+).
- **Family keys MUST be registered** in `topics-taxonomy.json axes['exercise-type']` (slug+name) or `deck-html.js` throws. Registered (EN): `science-sort`, `science-sequence`, `science-match` + matching `apps.*` (default_subject `science`, age 5-7). Non-EN slug/name added at the i18n ensemble step. Insert via round-trip-safe node script (file is canonical `JSON.stringify(,2)+'\n'`).
- EN strings resolve from spec `i18n.en` fallback (no strings.en.json edit needed for EN gen). For the published catalog, add to `strings.en.json` + skill-sentences for the 3 family keys (SEO desc banding).
- Factory bin labels read `data.bins[].label.en` (EN); 11-locale labels via the i18n `extras` mechanism at the fan.

## Status (prior): SCIENCE — Gate 2 (design exemplars) — APPROVED

### Gate-1 (scope) — RATIFIED
Operator rulings locked: printable worksheet-gen both · Science buildable-now-only · Literacy distinct-query-face build-most · Literacy EN full + commission pool.

### New additive factories (cores untouched — verified no edits to lib/rng, page/shell, page/page.css, templates/components, primitives/*, emit/manifest)
- `types/_shared/science-category-sort.js` — concept sort (word-labeled bins + curated noun→bin). themeAxis OFF. Scoped inline CSS; reuses `.ws-bin`/`.ws-icon`.
- `types/_shared/science-sequence.js` — ordered stages, write-in number boxes. Reuses `.ws-card-stage`.
- `types/_shared/science-pair-match.js` — curated cross-noun pairs, 2-col line-draw + derangement. Reuses `.ws-match*`.

### Tooling added
- `tools/render-exemplar.js` — renders ONE exemplar to `out/exemplars/<key>-d<n>-<loc>.png` (bypasses wave/manifest/taxonomy). Registry of exemplars inline.
- Curated data: `data/science/{animal-classification,chicken-life-cycle,baby-animals}.json`.

### Local image cache (pull-themes.js → derive.js)
Cached themes: animals, animals bw, fruits, fruits bw, shapes, toys, vehicles (pre-existing) + **farm animals**, **At the Supermarket** (pulled this session). Full 50-theme pull still needed before the fan.

### Gate-2 exemplars — RENDERED, QA-clean (0 lints, 0 verify)
| Shape | Exemplar | PNG | Notes |
|---|---|---|---|
| concept-sort | animal-classification (Mammals/Birds/Reptiles) | `out/exemplars/animal-classification-d1-en.png` | tidy 6-item row, word-bins, draw-to-bin |
| sequence | chicken-life-cycle (egg→chick→hen) | `out/exemplars/chicken-life-cycle-d2-en.png` | scrambled cards + write-in number boxes |
| pair-match | baby-animals (adult↔baby) | `out/exemplars/baby-animals-d2-en.png` | 2-col deranged line-draw |

## EN SCIENCE CATALOG — 14 types built + generated + spot-checked (wave-sci-en, 28 ZIPs, 0 fail)
Full library cached (52 themes). Cores untouched (git diff empty on the 5). `out/noun-inventory.txt` = curation ground truth.
Sorts: K-201 living/non-living · K-202 fruits/veg · K-203 healthy food · K-204 pets/wild · K-206 things-that-fly · K-207 summer/winter clothes · K-208 day/night · K-209 farm/wild · K-210 transportation(land/water/air) · G1-201 animal-class(3-bin) · G1-202 where-animals-live(3-bin) · G1-204 sink/float. Sequence: G1-203 chicken-life-cycle. Match: K-205 animal-babies.

## EN SCIENCE CATALOG COMPLETE — 21 types (18 sort + 1 sequence + 2 match), all generated + spot-checked (wave-sci-en, 42 ZIPs, 0 fail)
Added beyond the first 14: K-211 hot/cold · K-212 wants/needs · K-213 community-helper↔tool(match) · K-214 natural/man-made · G1-205 animal-coverings(3-bin fur/feathers/scales) · G1-206 what-animals-eat · G1-207 four-food-groups(4-bin). Layouts 2/3/4-bin all clean. Spot-checked: helper-tool, animal-coverings, food-groups all correct + professional.

**Honest buildable count = ~21, NOT the catalog's 48.** Under the buildable-now ruling + non-cannibalization + separability + available imagery, ~21 is the real number. The plan's "~36" was optimistic.

### HONEST DROPS (rendered/asset evidence)
- Asset-blocked (ruling 2): butterfly/frog/plant life-cycles (no chrysalis/tadpole/sprout art); plant/tree/animal part-label diagrams (no labeled-diagram art + no label-diagram engine); habitat/animal-home matches (no habitat scenes); landforms; recycling-to-bin (no labeled recyclables).
- Needs design/labels (deferred): five-senses (no sense icons/labels), emotions match (needs situation imagery), materials sort (no material-property tagging), what-to-wear-per-season (no season icons), helper↔workplace (workplace imagery thin).
- Cannibalization SKIPs: 2D-vs-3D shapes (geometry), big/small (big-small app), things-that-grow (redundant with living/non-living).

## 11-LOCALE LOCALIZATION DONE (2026-06-13) — applied via 10 native-ensemble agents
Each agent (de/es/fr/it/pt/nl/sv/da/no/fi) wrote `i18n/.sci-loc-<locale>.json` (title+instruction+bin-labels+3 family names/slugs+strand). Applied via `/tmp/apply-sci-loc.js`:
- bin labels → `label.<locale>` merged into the 18 sort data files (factory reads `data.bins[].label[locale]` — ZERO code change).
- titles/instructions → merged into `i18n/strings.<locale>.json` (the 21 keys added to the existing ~204; EN added too).
- taxonomy `axes['exercise-type'].{science-sort,science-sequence,science-match}.slug.<locale>/name.<locale>` added (round-trip-safe).
- Native forks logged (all sound): "community helpers" → Berufe/profesiones/métiers/Beroepen (no native calque); herbivore/carnivore terms; man-made phrasing; pt "Legumes e Verduras"; fi grammar (Tarpeet ja toiveet). sv/da/no/fi = NSR-flag at commit.
- Strand names collected per locale (de Sachunterricht / fr Questionner le monde / fi Ympäristöoppi …) — stored in the .sci-loc files; NOT yet wired to strand-names.ts (deferred — worksheet deck.html uses the localized exercise-type axis name, not a CCSS strand; wire only if science decks get landing pages).
- DEFERRED (logged, non-blocking): per-family science skill-sentences ×11 (skillSentenceFor returns {} gracefully → desc bands without it; adding EN-only would risk a locale-residue HALT, so defer to a native round). 

## PUBLISH PLAN (in progress)
- `waves/wave-sci-all.json`: 11 locales × 21 types × **difficulty [2] only** (one difficulty/type avoids the TITLE_NON_UNIQUE HALT — wave-001 precedent) × variant 1 = **231 decks**. Generating now (`out/staging/wave-sci-all/`).
- NEXT: spot-check a non-EN render → SCP ZIPs to Hetzner → `publish-wave.js <dir> --locales=<all 11>` **DRY-RUN first** (verify §15.16 theme gate [themeless-ok] + §17.8.17 SEO gates pass for the NEW science family keys — they're not in EXERCISE_MODE_APP_CLASSIFICATION, watch for MODE_NULL_FROM_HARDCODED_APP) → `--confirm` → landing → `audit-deck-html.js` + live curl.
- Production publish is outward-facing but operator-authorized ("drive to close"). Use dry-run-then-confirm for safety.

## HEAVY PHASES remaining (science close)
1. `strings.en.json` + `skill-sentences.en.json`: add the 14+ types' EN strings + 3 family-key skill sentences (SEO desc banding) — currently using spec fallback.
2. Science strand label per locale → `frontend/lib/seo/strand-names.ts` (native, no calque; e.g. de Sachunterricht / fr Questionner le monde / fi Ympäristöoppi — native-ensemble confirm).
3. 11-locale i18n (native ensembles §A.13.48, plan-mode per locale): per-type title+instruction + bin labels (the `extras` mechanism — factory reads `ctx.binLabels`; thread from resolveStrings) + taxonomy non-EN slug/name for the 3 family keys + skill-sentences per locale.
4. publish-wave (publish to catalog) + deck-landing + verify (`audit-deck-html.js`, live curl). Note default_subject `science` is the 5th subject (§16.4 doctrine-review flag — authorized by this commission).
5. Fan-time content checks: per-pair baby-art distinguishability (calf vs cow §A.13.29); per-sort separability on rendered evidence.

## LITERACY (task #5) — NOT STARTED (after Science close)
EN phonics pool commission first; 4 factories; per-type hardest-locale exemplar (Gate 2) → native ×11 with similarity-gate dedupe + honest per-locale drops.
