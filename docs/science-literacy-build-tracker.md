# Science + Literacy Verticals — Build Progress Tracker

Durable state for the two-vertical commission (plan: `~/.claude/plans/two-new-worksheet-verticals-polymorphic-axolotl.md`). Resume from here.

## ✅ SCIENCE VERTICAL CLOSED — 231 decks LIVE in production (2026-06-13)
21 K-2 science types × 11 locales published to the live catalog (batch-20260613210657, 231 INSERT, 0 fail). DB confirms 231 published (21/locale). Commits fbfec84e (build) + dc5b03ed (skill-sentences) pushed.
- **Verified live** (origin + Cloudflare 200): localized title/desc (skill-sentence in-band for terse locales), single h1, OG 14-tag set, 12 hreflang (11+x-default), LearningResource JSON-LD, www canonical, og:image, rich auto-alt ("…featuring Zebra, Pig, and Woodpecker…"), img width/height (CLS), loading=lazy ×6, embed-hide, 20 deckend links. ALL baked at worksheet-gen emit — no scoped rewrites needed.
- OG images regenerated scoped (`--slugs-file` + `--locales=all-11`; 231, 0 fail — NOTE: regenerate-og-images defaults to en,es,pt without --locales, must pass all 11). hreflang catalog-wide (231 DB updates, 5925 sibling rewrites, 0 fail).
- **Transient 308 post-publish**: Cloudflare briefly cached origin-308s thrown during the atomic OG/hreflang rewrites + symlink creation; self-healed via the 300s TTL (no purge-API §15.8). Now DYNAMIC 200.
- Publish path used (efficient, avoids the §50-min catalog-wide OG): `publish-bulk --confirm` → `regenerate-og-images --slugs-file --locales=all11` → `populate-and-inject-hreflang --confirm --locales=all11`. NOT full publish-wave (its OG step is catalog-wide).

### TOPIC HUBS LIVE (deploy.sh rebuilt 2026-06-13, smoke tests passed)
All 3 exercise-type hubs render per locale: `/en/topic/science-sort` (26 decks) · `/en/topic/science-sequence` "Sequencing & Life Cycles" (9) · `/en/topic/science-match` "Science Matching" (10) · `/de/topic/sachunterricht-sortieren` (26). Deck end-links now resolve (308→200, Next trailingSlash normalization). it slugs: classifichiamo-le-scienze / sequenze-e-cicli-di-vita / abbinamenti-di-scienze. **SCIENCE FULLY CLOSED.**

### FOLLOW-UP (non-blocking, flagged)
- Deck end-links carry a trailing slash → 308→200 hop (scoped publish path skipped publish-wave STEP 5b topic-slash rewrite). Negligible SEO; clean in a future pass via rewrite-deck-html-topic-slash.
- sv/da/no/fi NSR native-speaker review of the localizations (flagged in commits).
- audit-deck-html OOMs at catalog scale (40k decks, no --slugs-file) — verified via live curl instead (§A.13.28).

## Status (build phase): SCIENCE — Gate 2 APPROVED — fanned EN then 11-locale

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

## PUBLISH-GATE LEARNING (dry-run #1 → fix) — IMPORTANT for literacy too
Dry-run #1: 231 ZIPs, theme_halts=0, exercise_mode_halts=0, collisions=0 (the predicted-risky gates PASSED — unknown family keys = UNKNOWN/degraded-trust-CLEAN per slug.js:140), but **32 errored = DESCRIPTION_LENGTH_TOO_SHORT** (es/it/de/fi — terse locales).
- ROOT CAUSE: themeless decks have no theme word to pad the SEO description; without a per-family skill-sentence the description fell <120 floor. preband SKIPS printable_only decks (they're emit-time banded), so the band is built at GENERATE by `build-seo-head.js bandedDescription` (middle pool = [diff, instruction, skillSentence, skillSentenceShort], picks the richest whole sentence in 120-170).
- FIX (commit dc5b03ed): added {full,short} skill-sentences for science-sort/sequence/match ×11 → `skill-sentences.<locale>.json`. bandedDescription pulls the SHORT one into band (it/g1201: 112→153). Required REGENERATE (skill-sentence baked at emit) + re-SCP.
- GOTCHA: the regen `--force` overlapped the re-SCP (race) → first SCP copied stale ZIPs; did a clean re-SCP after regen fully done. Also: monitor on a PRE-EXISTING `_summary.txt` fires immediately — guard regen-done checks against staleness.

## BUILD COMPLETE + COMMITTED (commit fbfec84e + dc5b03ed, pushed 2026-06-13)
231 decks generated `out/staging/wave-sci-all/` (11 locales × 21 types × d2, 0 fail). EN + de spot-checked live-correct. 61 files committed (3 factories, 21 specs, 21 curated data [force-added past gitignore], 11 locale strings, taxonomy, 2 waves, render-exemplar, tracker). Cores untouched.

## PRODUCTION PUBLISH — PENDING (the remaining science-close steps; commands ready)
1. **Deploy taxonomy to Hetzner**: `git pull` in /opt/lessoncraftstudio (publish-cli reads taxonomy file fresh → no full build needed for the deck publish; topic-page rendering of the new science family keys needs a later `npm run build`).
2. **SCP** `out/staging/wave-sci-all/*.zip` → a Hetzner staging dir.
3. **publish-wave DRY-RUN** (no --confirm, non-mutating): `cd frontend && set -a && source .env.production && set +a && node ../scripts/publish-cli/publish-wave.js <dir> --locales=en,de,es,fr,it,pt,nl,sv,da,no,fi` — verify §15.16 (themeless-ok) + §17.8.17 gates pass for the NEW family keys (WATCH: science-sort/sequence/match not in EXERCISE_MODE_APP_CLASSIFICATION → possible MODE_NULL_FROM_HARDCODED_APP; the worksheet-gen family keys pass so likely fine, but confirm on dry-run).
4. **--confirm** if dry-run clean → 231 live decks.
5. **VERIFY**: `audit-deck-html.js --locales=<all>` + live curl a sample (mind Cloudflare 5-min TTL).

## PUBLISH PLAN (superseded by the section above)
- `waves/wave-sci-all.json`: 11 locales × 21 types × **difficulty [2] only** (one difficulty/type avoids the TITLE_NON_UNIQUE HALT — wave-001 precedent) × variant 1 = **231 decks**. Generating now (`out/staging/wave-sci-all/`).
- NEXT: spot-check a non-EN render → SCP ZIPs to Hetzner → `publish-wave.js <dir> --locales=<all 11>` **DRY-RUN first** (verify §15.16 theme gate [themeless-ok] + §17.8.17 SEO gates pass for the NEW science family keys — they're not in EXERCISE_MODE_APP_CLASSIFICATION, watch for MODE_NULL_FROM_HARDCODED_APP) → `--confirm` → landing → `audit-deck-html.js` + live curl.
- Production publish is outward-facing but operator-authorized ("drive to close"). Use dry-run-then-confirm for safety.

## HEAVY PHASES remaining (science close)
1. `strings.en.json` + `skill-sentences.en.json`: add the 14+ types' EN strings + 3 family-key skill sentences (SEO desc banding) — currently using spec fallback.
2. Science strand label per locale → `frontend/lib/seo/strand-names.ts` (native, no calque; e.g. de Sachunterricht / fr Questionner le monde / fi Ympäristöoppi — native-ensemble confirm).
3. 11-locale i18n (native ensembles §A.13.48, plan-mode per locale): per-type title+instruction + bin labels (the `extras` mechanism — factory reads `ctx.binLabels`; thread from resolveStrings) + taxonomy non-EN slug/name for the 3 family keys + skill-sentences per locale.
4. publish-wave (publish to catalog) + deck-landing + verify (`audit-deck-html.js`, live curl). Note default_subject `science` is the 5th subject (§16.4 doctrine-review flag — authorized by this commission).
5. Fan-time content checks: per-pair baby-art distinguishability (calf vs cow §A.13.29); per-sort separability on rendered evidence.

## ▶▶ LITERACY (VERTICAL 2) — START HERE (new session) ◀◀
**Read first:** the plan file `~/.claude/plans/two-new-worksheet-verticals-polymorphic-axolotl.md` (full Literacy scope + the Gate-1 rulings) + the resumed plan `~/.claude/plans/continue-the-two-new-worksheet-verticals-floofy-glacier.md` + this tracker. Science is DONE; this is the second, higher-cost vertical (NATIVE per language, not design-once).

### ✅ LITERACY PROGRESS — EN foundation proven (session 2026-06-13/14)
**Committed:** `b1ecf1b6` (EN pool) · `60156407` (4 factories) · `d5d762aa` (EN pipeline). 5 protected cores byte-untouched throughout.
- **EN phonics pool DONE** (`b1ecf1b6`): `rule-syllabifiers/en.js` (careful English COUNTER: silent-e, final-Cle, -gue/-que, hiatus, intervocalic-y) + `en` classified **GREEN** in `gate.js` (operator-ratified, reversing the plan's STRICT premise — TeX en-us is typographic, disagrees on 32%+ of nouns; no literacy printable renders a syllable SPLIT, only counts/words/graphemes, so GREEN is safe + the count is R+S cross-validated). `output/approved-words-en.json` = **910 approved / 353 quarantined**. All 20 E7 CVC pass; vocab-phonics count-defect words (table/candle/lion/apple/turtle/eagle/tongue) correctly QUARANTINE (a wrong count is structurally barred). Snapshots `.before-gue-que-fix` out-of-tree (§A.13.44).
- **4 factories DONE** (`60156407`, Gate-2 APPROVED — both the flagship + the batched 4 new shapes): `lit-sound-match` (picture+write-box; beginning/ending/middle/first-letter; de multigraph onsets Sch/St/Sp render) · `lit-letter-knowledge` (upper↔lower match + missing-alphabet; per-locale alphabets incl. äöü/ñ/åäö/æøå/it-21) · `lit-word-build` (CVC missing-letter) · `lit-vocab-match` (word↔picture). New text-tile renders (science was image-only). `qa/lints.js` extended with a `[data-lit-content]` marker (QA infra, not a core). Gallery: `out/exemplars/literacy-gallery.html`.
- **EN pipeline PROVEN** (`d5d762aa`): 4 family keys registered in `topics-taxonomy.json` (EN slug/name; `default_subject:"letters"` — no new subject) · 5 type specs **K-221..K-225** (one per render shape) · `skill-sentences.en.json` +4 keys · `waves/wave-lit-en.json` → `cli generate` = 5 ZIPs, 0 fail. deck.html: 5 distinct unique titles, descs all in the 120-170 band, single h1. **Cannibalization gate PASS** (all max 0.000 vs overlap apps matching/alphabet-train/word-scramble/word-guess — decisive distinct query face).

**NEXT (Phase 3 cont., NOT yet started):** (a) expand the EN type list — remaining modes need factory work: ending-sound + middle-sound + sort-by-first-sound + which-starts-with-X (lit-sound-match data only), find-letter-grid + vowel/consonant-sort (new lit-letter-knowledge modes), build-the-word (new lit-word-build mode), opposites + category-sort + syllable-count + syllable-sort + rhyming (new lit-vocab-match modes; maybe a 5th family key `phonological-awareness`/`syllables-and-rhymes`); gate each overlap. (b) **native 11-locale fan** — per (type,locale) word content from each gated `approved-words-<locale>.json` pool + taxonomy non-EN slug/name + skill-sentences ×10, via 3-agent native ensembles (§A.13.48); letter-knowledge fans from the alphabet alone (no pool words). (c) scoped publish (publish-bulk → og `--slugs-file --locales=all11` → hreflang all-11 → deploy.sh hubs); difficulty [2] only. **No push to production yet** (commits are local on `pivot/printable-business-toolkit`).

### Gate-1 rulings already LOCKED (do NOT re-ask)
- Output = **printable worksheet-gen decks** (same pipeline as science).
- Dedupe = **distinct-query-face, build most**: build the ~12 genuinely-new types PLUS app-overlapping types where the printable holds a distinct query face (the apps word-guess/matching/wordsearch/find-and-count/alphabet-train have NO landing pages → query space open). **Gate every overlap at lock with `scripts/seo-landing/gate.js` similarity.**
- EN = **full EN + commission an EN phonics pool** (build `scripts/v2-data/verify-syllable-boundaries/rule-syllabifiers/en.js` + run the gate → `approved-words-en.json`; the 10 non-EN locales already have live pools). §A.13.44 before-snapshots; `git add` the new rule file (§A.13.57).

### Production model (DIFFERENT from science)
Each literacy type's WORD CONTENT is authored NATIVELY per locale from that locale's own phonics inventory (the gated `approved-words-<locale>.json` pools under `scripts/v2-data/verify-syllable-boundaries/`), NEVER EN text-swapped. Same engine/render/publish; only word-sourcing differs.

### 4 new factories to build (mirror the science factory pattern exactly)
`scripts/worksheet-gen/types/_shared/`: `lit-sound-match.js` (picture→target grapheme; from the pool) · `lit-letter-knowledge.js` (uppercase↔lowercase, missing-letter, find-letter-grid, vowel/consonant sort; locale alphabet incl. ä/ö/å/ñ/ç/ß) · `lit-word-build.js` (CVC/missing-letter/build-from-letters) · `lit-vocab-match.js` (word↔picture, opposites, synonyms, category-vocab, sight-word; reuse science-category-sort for syllable/sound sorts).

### Framework classifier (per type): answer in PICTURE domain → readiness/no-CCSS; answer in GRAPHEME/TEXT domain → CARRIES locale framework (`strand-names.ts`). Type list + classification in the plan file §Scope/Vertical 2.

### REUSE the science blueprint (proven this session — same steps)
1. Thin grade-prefixed type specs in a collision-free id block (science used K-201+/G1-201+; literacy use the NEXT free block e.g. K-221+/G1-221+ — check `loadAllTypes` first). **id prefix drives age_range (manifest.js protected core) — MUST be K/G1/G2.**
2. Curated data JSON per type (force-add past the `data/` gitignore: `git add -f`).
3. Register family keys in `topics-taxonomy.json axes['exercise-type']` (+`apps.*`) — round-trip-safe node script (file is `JSON.stringify(,2)+'\n'`). REQUIRED or deck-html throws.
4. **skill-sentences ×11** for each family key (themeless decks need them for the 120-char desc floor — the science gotcha; `skill-sentences.<locale>.json`).
5. strings.<locale>.json (merge, don't overwrite ~204 existing keys). EN resolves from spec i18n.en fallback for gen.
6. Local render-verify via `tools/render-exemplar.js` + `cli.js generate --wave`; eyeball PNGs; build a gallery (`out/science-gallery.html` was the model).
7. Per-type hardest-phonics-locale exemplar = **Gate 2** (surface before the 11-way fan). Native ensembles (§A.13.48, general-purpose agents not Explore) per locale; NSR-flag sv/da/no/fi.
8. Publish: SCP ZIPs → Hetzner `/tmp/<wave>` → `git pull` taxonomy on Hetzner → `publish-bulk --confirm` → `regenerate-og-images --slugs-file --locales=<all 11>` (defaults to en,es,pt without --locales!) → `populate-and-inject-hreflang --confirm --locales=<all 11>` → live-curl verify (audit-deck-html OOMs at scale) → deploy.sh for topic hubs.
9. **difficulty [2] only** per type/locale (one difficulty avoids TITLE_NON_UNIQUE).

### Credentials/paths
Hetzner root@65.108.5.250 (plink/pscp `-pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU`). Repo /opt/lessoncraftstudio (branch pivot/printable-business-toolkit). Local cache: 52 themes pulled; `out/noun-inventory.txt` = curation ground truth. Phonics pools: `scripts/v2-data/verify-syllable-boundaries/output/approved-words-<locale>.json`.

### Sequence within Literacy: EN phonics pool FIRST (unblocks EN gated types) → then per-type Gate-2 exemplar (hardest-phonics locale: de Anlaut / fi agglutinative) → native ×11 fan.
