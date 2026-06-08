# §A.13 Verification Hygiene — full detail (relocated from CLAUDE.md)

> Full text + empirical anchors (commit hashes, worked examples, before/after counts) for the §A.13 sub-doctrines. CLAUDE.md keeps the terse forward-rule + a pointer per sub-doctrine; this file holds the justification. Relocated 2026-06-08 to halve the always-loaded doctrine file — nothing deleted.

### A.13 Verification hygiene

Operational discipline applied at Phase 4 verification of any commission. Each sub-doctrine: doctrine statement + empirical anchor (commit hash) + cross-refs as needed.

#### A.13.1 Phase 4 zoom-in label-readability discipline
Spot-checks must include zoom-in inspection of UI labels in narrow-column contexts (mobile 375px; faceted-sidebar/filter-strip). UX-truncation defects surface only on close inspection. Status-200 + structural-presence smoke tests verify routing + render, NOT label-readability. Origin: `91ae41a7` FilterSidebar truncation (operator screenshot revealed).

#### A.13.2 Gap-fold-in-same-commit doctrine
When an arc surfaces a latent bug fixable with ≤10 short strings OR ≤1 component edit at zero strategic cost AND at same fold-target → FOLD into arc's commit; otherwise surface as separate [FIX]. Origin: Arc 6c→6d intersection.intro precedent `c03fdb8e`.

#### A.13.3 Refactor-during-already-opened-surface principle
When a [FIX] opens a code surface, audit for adjacent refactor opportunities of same shape. ≥3 instances + imminent 4th consumer per §14.3a → fold refactor. Origin: `785d63f6` slug-derivation refactor (bulk.js + publish.js + index.js → `slug.js: deriveSeedFromManifest`).

#### A.13.4 DERIVED vs HARDCODED-NULL emit-site classification
App emit-sites for SEO-bearing manifest fields classify via `EXERCISE_MODE_APP_CLASSIFICATION` in `slug.js`: **DERIVED** (reads operator UI signal; null legitimate per §17.8.5) vs **HARDCODED-NULL** (literal `null` at static call site; defect class). §15.16 gate halts HARDCODED-NULL+null (`MODE_NULL_FROM_HARDCODED_APP`); DERIVED+null CLEAN. Post Commission ε at `109a91d4` all 29 apps DERIVED; gate stays as backstop. Constant IS live taxonomy gate consumes at runtime; pattern: recon → adjudication → locked taxonomy → code-constant → predicate input. Origin: `2b555b57` + `109a91d4`.

#### A.13.5 Shape A canonical authoring pattern + reconciliation gate as structural complement
§15.16 gate is publish-time backstop; **Shape A** is canonical authoring-app pattern: at `prepareExerciseImages()` boundary, filter `selectedImages` against active theme before downstream pool-construction. Off-theme dropped with UI warning. Existing emit-site `theme: themeSelect.value` becomes correct once pool theme-constrained. Per-app scoping varies: verbatim (addition, subtraction); branch-scoped (bingo's `customCalloutsCheckbox.checked`; word-scramble + word-guess fallback else); decoupling-deferred (treasure-hunt path-A `worksheetThemeValue`-driven; gate-protected). Translation-key convention: each app ships `<app>.msg.offtheme.dropped` × 11 locales; promote to `shared.msg.offtheme.dropped` at 4th consumer. Origin: `44cbdda1` (code-addition) + `05d0940e` (10 sibling apps).

#### A.13.6 Spec-vs-shipped-contract validation discipline
When commission spec classifies a code surface with shipped contracts, validate spec's rules against shipped contract empirically BEFORE commit. Halt + surface to operator on conflict. Commission δ Phase 3 caught strict-DERIVED rule conflicting with code-addition's null-for-standard (`5078f491`); 104 of 153 decks would have halted. Operator adjudicated Interpretation Y pre-commit. Paired with §A.13.8 — `[ARC][SEO][DECK-PAGE]` Phases 3a-5 fired paired discipline 5 times (Phase 3b multi-h1; Phase 4a CP2 5-step Explore recon; Phase 4a CP2 DB backfill silent-swallow; Phase 4a CP2.5 (θ) close-at-63.3%; Phase 4b Sub-step 0 TS→CJS path). Origin: `2b555b57`.

#### A.13.7 Per-app first-publish verification cadence
When a publish-cli gate covers N apps, per-app first-publish verification folds into Track C cadence rather than separate audit commission. Gate IS verification mechanism. Document gate's coverage in commit body; track per-app first-publish events; gate fires (or doesn't) — empirical verification by construction; firing → follow-on `[FIX][AUTHORING]`. Empirical: `580b0ca2` §15.16 theme gate covered 27 unverified apps; caught code-addition's defect at first-publish (153 ZIPs); §15.17 salvage handled recovery.

#### A.13.8 Adjudication-reversal discipline
When recon surfaces cost dimension original adjudication didn't account for, recalibrate before executing. Initial adjudication on manifest.theme arc proposed operator-side regeneration of 153 ZIPs; operator pushed back; correct fix was downstream rewrite (`9051b43d` salvage). Cost-modeled "rebuild from scratch"; empirical cost was "operator's generation hours vs CC's code change." Apply: when Phase 1 surfaces a fix path not in original adjudication's option set AND materially cheaper on dimension operator pays, surface recalibration as Phase 2 batched review. Paired with §A.13.6. Origin: `44cbdda1` + `9051b43d`.

#### A.13.9 Two-defect pattern recon
When one emit-defect surfaces at a wave boundary, recon for additional emit-defects in same app at same wave before declaring fixable. For every OTHER emit-site class, run §15.16 gate on sample; second surfaces → fold both into single Shape-A-style fix. Empirical: code-addition (`5078f491` exerciseMode + `9051b43d` theme) — both surfaced at same wave; Commission ε `109a91d4` closed exerciseMode across 16 apps.

#### A.13.10 Manifest-as-schema-contract discipline
Manifest is contract between authoring app + publish-cli. Defects fix at emit-side; do NOT introduce downstream content-vs-metadata reconciliation when avoidable. §15.16 gate is backstop, not primary fix. Salvage-script territory (§15.17) is for already-staged waves only. Anti-pattern: adding reconciliation to publish-cli when authoring-side fix available.

#### A.13.11 Operator-strategic adjudication batching at recon-completion
Phase 1 recon surfaces multiple operator-strategic adjudications → batch into single consolidated review at recon-completion. Do NOT surface mid-stream. N adjudications batched cost ~one context-switch; N separate cost ~N. Empirical: Arc 2 Phase 1 (`a93ebb7c` predecessor) surfaced four (flag iconography source, exercise-type icons, theme thumbnails, EmbedViralityCTA target URL) in one batch; operator locked all four in one round-trip.

#### A.13.12 Mechanical-fan-out vs architectural-sweep distinction at 29-app scope
**Mechanical fan-out** — sed-replaceable single-line per app; identical at line-level (e.g., `<h1>` → `<h2>` Phase 3a.2). ~30-90 LoC; no per-app reasoning. **Architectural sweep** — 2+ files per app OR shape-level variance (Phase 3b multi-h1; ~300-500+ LoC). Empirical: Phase 3a.2 (29 × 1 LoC, ~30 min); Phase 3b (29 × 5-step diff ≈ 145 LoC, ~2 hours + 4 §A.13.6 firings).

#### A.13.13 Fan-out verification-hygiene at mechanical-fan-out execution
**6 grep dimensions:** (1) open-tag canonical form `<h1 ` — expected 0; (2) close-tag `</h1>` — expected 0; (3) JS-string-escaped open `"<h1` or `\"<h1` — expected 0; (4) JS-string-escaped close — expected 0; (5) line-context match (e.g., `lcs-celebration__title` confirms class wraps `<h2>`); (6) cross-locale spread matches expected locale set. Phase 3a.2 + Phase 4a Checkpoint 1 surfaced JS-string-literal escape variants; single-dim missed, 6-dim caught. Origin: `3d1027e5`.

#### A.13.14 Phase 1 Explore-agent fidelity validation
Explore agents are for breadth-survey ("what's surface area of X?"); fidelity-critical claims ("does X have shape Y at line N?") use direct `Grep` + `Read`. Anti-pattern: trusting Explore output for line-precise claims — Explore reads excerpts, doesn't guarantee whole-file fidelity. Empirical: Phase 3b Checkpoint 2 operator-surfaced when Explore claimed 3-step-diff per app; direct grep verified 5-step-diff.

#### A.13.15 Structured-fan-out as 3rd category between mechanical and architectural
**Per-app structural diff > 1 file BUT not pure architectural touch**: multi-line additions per app; identical structural shape across 29; same metadata-threading; no per-app conditional logic. Cost: 5-step-diff per app; 5 × 28 ≈ 145 LoC; 1-2 hours; 0-2 §A.13.6 firings expected. Empirical: Phase 3b Checkpoint 2 (28 apps; ~145 LoC); Phase 4a Checkpoint 2.5 (θ) rawExerciseMode + exerciseModeName threading.

#### A.13.16 Verification-hygiene at structured-fan-out execution
6 dimensions: (1) per-app structural-shape match (grep anchor across 29; expected 1 per app); (2) per-app diff-line consistency (sample 3-5); (3) cross-app naming-pattern verification; (4) post-deploy curl-spot-check (3 apps × 2 locales × 1 deck = 6 production decks); (5) test-suite full-pass; (6) per-app metadata threading audit (extractDeckBundle → renderStandaloneHTML → buildSeoHead → deck.html). Empirical: Phase 4a Checkpoint 2.5 (θ) caught var-hoisting bug at fanout-theta-handler.js before commit.

#### A.13.17 Slug-vs-title-shape redundancy as separate doctrine class
Slug-level catalog data hygiene structurally distinct from title-shape; slug-level collisions not resolvable by title-shape alone. **(a) Shape-pathology collisions** — same (locale, shape) → identical title-hash; resolvable via title-shape adjustment. **(b) Catalog-data-hygiene collisions** — same (locale, slug) due to operator workflow OR legacy renames; requires operator-strategic catalog rationalization commission. Phase 4a CP2.5 (ι) close: (ε) → (θ) → (ι) at 63.3% surfaced (b) requiring (μ) slug-rationalization stub.

**(μ) CLOSED 2026-05-19 SEO-100pct commission via algorithmic disambiguation:** `scripts/publish-cli/disambiguate-titles-mu.js` groups all published en+es decks by ACTUAL RENDERED TITLE (extracted from deck.html, not by structural manifest axes — catches off-taxonomy themes that collapse onto generic titles via republish-seo's taxonomy fallback). For each rendered-title-collision group sorted by createdAt ASC: first member keeps canonical title (no variant_id); members 2..N get sequential ordinal variant_id ('002', '003', ...). Pairs with `disambiguate-titles-finalize.js` (slug-derived sha1(slug)[:6] for cross-slug residue after ordinal assignment). Re-running republish-seo emits new titles with variantLabel suffix ('Set 002' / 'Conjunto 002'); SHA-1 normalized hashes update successfully in DB; @@unique([language, titleHash]) constraint enforces forward. Final state: 9191/9191 unique titleHash + descriptionHash across en/es/pt.

#### A.13.18 Backfill-rate as commission close-out metric
When primary deliverable enforces uniqueness invariant via DB-side hash, close-out reports **two metrics**: file-level retrofit rate + DB-level invariant-enforcement rate. Silent under-enforcement ("100%" file-level) worse than visible partial enforcement. Phase 4a precedent: file-level 2776/2776 (100%); DB-level 1693/2673 (63.3% en) + 29/29 (100% non-en).

#### A.13.19 Capitalization "small word" handling under uniform title-case
Default to **uniform title-case** (every word capitalized: "More Or Less"); deterministic, locale-independent. AP-style (small words lowercase except sentence-start) is operator-strategic refinement; locale-dependent. Phase 5 Q1 locked uniform across 11 locales; "More Or Less" / "Tren Del Abecedario" grammatically valid. Phase 5 Item 14 carries small-word refinement as future-arc.

#### A.13.20 Retrofit-rerun decision: per-locale need-vs-no-need classification
Changes affecting retrofit output for SOME locales not others → per-locale rerun classification, NOT uniform all-or-nothing. Document in close-out (skip-locales explicit). Phase 5 Sub-step 7: de+es+nl 95 decks rerun (seo.words.* changed); en 2681 NOT rerun (English defaults; no string change). Anti-pattern: reflexively retrofit-all.

#### A.13.21 Operator-pre-recommendation substrate verification at theme/category selection
When operator pre-recommendation involves theme/category/package selection, verify candidates against canonical-state at planning step before locking scope. Identify substrate dependencies; empirically query before responding; surface divergence as §A.13.6 firing. Empirical: Pillar 2 Arc 6 Phase 1 themeAxisKey (3 of 4 unverified per `image_themes`; 10th firing); Arc 7 Phase 2 saturation (48/50 canonical-color; only `birds_2` + `miscellaneous` unbundled; 16th firing).

#### A.13.22 Audit-doc-vs-canonical-state divergence at commencement-time
Audit documents become stale during commission cycles. At commencement of work derived from audit doc, re-verify against canonical-state; surface divergence as §A.13.6 firing. Empirical: Stream A Arc 2 Phase 1 `e87c464c` — audit doc claimed 5 packages had theme-dir absence; re-verification revealed only 3 had `themeName: foods` OR `school-objects`; 2 prepositions used `themeName: animals` (separate class). 15th firing. Distinction from §A.13.21: §A.13.21 at plan step; §A.13.22 at commencement step.

#### A.13.23 Empirical-saturation as commission-cycle close-point signal
When commission work consumes finite substrate space, saturation signals natural close-point. Query consumption + availability; below-threshold → saturation signal; surface as natural close-point via AskUserQuestion. Empirical: Pillar 2 Arc 7 Phase 2 (16th firing) — 100 axes.theme keys; 50 canonical-color; 48 bundled; only `birds_2` + `miscellaneous` unbundled. Pillar 2 CLOSED (P2-close-pillar2).

#### A.13.24 Double-close-out paired commission CLOSED as multi-pillar trajectory milestone
When two commission cycles close at same paired moment, the paired-close is itself a structural milestone — convergence + natural strategic-input window. Empirical: consolidation cycle close 2026-05-11: Pillar 4 Arc 3 (ζ) close at `6e2b17fa` + Pillar 2 close at `957eb8ff` same session. First multi-pillar trajectory milestone. Subscribe-flip readiness review at `ba9e55c8` codified + surfaced 3-surface adjudication batch.

#### A.13.25 Bundle cluster taxonomy sub-pattern emergence at scale
At ~14+ clusters / ~48+ bundles, sub-patterns emerge: **paired-cluster** (two clusters composing pillar via sub-axis, e.g., cultural-arts = music + activities) and **crossover-bundle** (bundles bridging two clusters). Audit for sub-pattern emergence at scale; resist premature authoring before scale-emergence. Empirical: Pillar 2 Arc 6 + Arc 7 cultural-arts paired-cluster (music + activities; activities-bundle thematicCoherence references "2nd cultural-arts cluster bundle").

#### A.13.26 Schema migration timestamp-stratification doctrine
DB column added via schema migration → pre-migration rows have NULL by definition. Post-migration rows populate via emit-time logic. **Pre-migration NULL residue is structural, not regression.** Stratify by `createdAt` against migration timestamp; pre-migration cohort NULL expected (retrofit per §15.17 if recovery warranted); post-migration NULL indicates emit-time regression (Shape A §A.13.5). Empirical: (μ) Phase 1 revised diagnostic (`0e51ba8d`). Original Phase 1 (`f6f8ea38`) misclassified 1,288 en NULL title_hash as "authoring-side regression at 10 apps." Revised stratification: pre-2026-05-09 1,483 NULL (pre-migration per `20260509083000_add_seo_hash_columns`); post-2026-05-09 1,202 new publishes 100% correct. 5.5pp drop was statistical artifact. Recalibration via §A.13.8 saved ~3 sessions.

#### A.13.27 Trajectory-vs-static-state pricing inspection
When classifying trajectory-state change as regression vs natural-progression, inspect denominator AND numerator separately. **Same numerator + growing denominator produces declining percentage that LOOKS like regression but is statistical artifact.** Empirical: (μ) Phase 1. 5.5pp en backfill drop wrong-priced as structural-regression. Numerator (NULL count) fixed at 1,483; denominator (total en) grew 3,870 → 4,183. Same NULL + growing total = lower percentage, NOT regression.

#### A.13.28 Phase 4 production-canonical-path verification at deploy boundary
At Phase 4 production-ship, verify actual production-canonical-path via curl-spot-check BEFORE declaring Phase 4 complete. Sample 3-5 representative URLs; `curl -I` each post-deploy (expected HTTP 200 + correct content-type); verify content via curl + grep for representative markers. Catches gaps smoke tests miss: nginx config divergence + symlink-swap timing + Cloudflare cache-invalidation latency + DB-state-vs-FS-state divergence. Empirical: Pillar 4 Arc 2 Phase 4 (`e9e4d04a`); Brief B Phase 1 catalog deck route (`4b91adc0`); (μ) 308 404 class verification.

#### A.13.29 Ground-truth source-citation discipline for behavior-describing content
Content describing BEHAVIOR of external component author hasn't directly observed MUST cite source code verified against. Mental-model-alone is defect class equivalent to TypeScript `any`. Phase 1 launches Explore against `REFERENCE APPS/<app>.html` (mode dispatch; kid interaction; answer shape; visual feedback; correctness criteria). Cite per entry: `// Verified against: REFERENCE APPS/<app>.html lines X-Y` block with mode dispatch + kid interaction + audit date. Empty-citation = defect; reviewer rejects on sight. Re-verify on source change. Sub-Phase 2.4 `7eac8f50` (25th firing): 4 of 10 templates DRIFTED — find-and-count (assumed per-row; actual category-counting), more-less (assumed circle; actual tap symbol button), word-guess (wrong param "clue-density"; actual `difficulty`), odd-one-out (assumed circle; actual choice-tap one of 4 image buttons). Applies to per-(appName, exerciseMode) prose templates, parent-letter/take-home prose claiming exercise mechanics, sentence-strips guidance claiming UI layouts, future material-generator copy describing kid interactions, admin/marketing/support copy. File-level preamble: `frontend/scripts/lib/exercise-answer-templates.ts` lines 1-50.

#### A.13.30 Audience-perspective discipline for user-facing content
All user-facing content MUST be from reader's perspective — what they get, what they do — never how the system produces it internally. **Forbidden in teacher/parent-facing copy:** internal taxonomy (`composedExercises`, `materialSlug`, `framePreset`, `package metadata`, `pedagogical framing`); implementation primitives (`IMAGE_VOCABULARY`, `auto-resolved`, `gender data`, `target language` — use "the language your kids are learning"); architectural concepts (`packages`, `decks`, `generators`, `mass-run`); aesthetic-meta descriptors. Describe what reader gets + what they DO ("Print, cut along the dashed lines, use the cards for counting" — NOT "Image-only cards for cut-and-handle classroom work"). **Third-party brand stamps in private external communications forbidden** — parent letters, take-home content, family-facing materials teachers send home are private teacher-parent communication; never stamp with platform branding. Classroom-internal (flashcards, worksheets, answer keys) MAY carry §14.3 attribution; private external MAY NOT. Sub-Phase 2.5: 7 teaching-package section descriptions × 4 Tier 1+2 locales = 28 entries engineering-perspective; parent-letter PDF shipped with `LessonCraftStudio` brand at letters teachers send home.

#### A.13.31 Per-instance content-awareness discipline
Commission whose scope NAMES a specific package/deck/topic/lesson-plan/material → Phase 1 MUST read canonical artifact BEFORE Phase 2. NAME is a label; YAML/manifest/data file is truth. Paths: package → `docs/lesson-plans/packages/<slug>/package.yaml`; topic → `frontend/config/topics-taxonomy.json` + grep composing packages; deck → manifest JSON + bundle; lesson plan → `docs/lesson-plans/packages/<slug>/lessons/<lesson>.yaml`; material → package.yaml's `materials:` entry. No inference from name. Cite paths in close-out. **Applies to operator's IDE-open signals** — package YAML open alongside commission = read it. Sub-Phase 2.4 find-and-count drift was per-instance content-blindness — described `find-and-count|unified` without reading `count-objects-1-to-10/package.yaml` (`themeSelect: animals` triggers object-counting, not letter-spotting). **Family of three substrate-verification-by-content (§A.13.29 BEHAVIOR + §A.13.30 READER perspective + §A.13.31 per-instance INSTANCE).**

#### A.13.32 Canonical-artifact-grounding-at-composition-time discipline
Commission specs naming canonical artifacts MUST ground composition against canonical SoT at spec authoring step — NOT prior-session close-out summaries, carried-forward prompts, or assumed inventory state. Anti-pattern: naming-from-memory, drafting-from-prior-close-out, drafting-from-training-fluency. Canonical SoT paths: taxonomy slugs → `learning-targets.json`; per-package YAML → `docs/lesson-plans/packages/<slug>/package.yaml`; generator inventory → canonical generator code paths + §A.13.35 canonical-mode tables.

**Six sub-doctrines:** (1) **Slug-grounding** — verify against `learning-targets.json` BEFORE locking. (2) **Generator-inventory completeness** — verify at composition time. (3) **Per-package × per-generator matrix as mass-run scope** — mass-run IS full (package, generator) matrix, NOT materials-yaml union. (4) **Generator-executability verification** — YAML-reference-existence insufficient; verify actual code path. (5) **Strand-state baseline grounding** — counts drift across arcs; verify against canonical BEFORE locking. (6) **Commission-spec drafting from prior-close-out text** — ground against prior commit's actual close-out scope + body, NOT memory of earlier projections.

**Empirical anchors:**
- Arc 17 firings (1-4): Phase 1.3 slug-grounding; P2 numeral-cards generator-inventory; P2 identify-community-places matrix-scope; Phase 1.4 clock-mat generator-executability
- Arc 18-19 firings (5): Arc 17 P1.3 + Arc 18 P1.3 vocabulary-class-strand-start + Arc 19 P1.3 phonological-awareness + Arc 19 P1.4 spelling-and-encoding baseline drift (`bc128f4b` firing #1)
- Arc 19 + currency-removal (6): Arc 19 P2.3 (`22338d69` firing #6) drafted from P2.1 close-out text without grounding against P2.2's actual close-out. Currency-removal Phase 1c (`0d56e025`) — presumed `money` sub-track wrapper in `learning-targets.json` did not exist; entries are flat siblings within `measurement` `targets[]`.

#### A.13.33 Phase 0 explicit-methodology reporting at substrate audit
Phase 0 outputs reference counts that could diverge by methodology. Every count states: (1) **denominator** (what's being divided into); (2) **locale scope** (en-only / en+pt / all-locales / per-locale); (3) **status filter** (published-only / all-status); (4) **temporal anchor** (pre-arc / post-arc / at-commencement); (5) **parent-class vs sub-track layer** — strand-state reporting distinguishes parent-class (e.g., "measurement", used for C4 saturation) from sub-tracks (e.g., "money" within "measurement"). Empirical: Arc 17 Phase 1.3 → 1.4 → 1.5 baseline shifts. en-baseline 154 → 157 (Phase 1.2 → 1.3, denominator widened); pt-baseline 79 → 66 (Phase 1.3 → 1.4, narrowed); reconciliation cost operator-attention. Dimension 5: currency-removal `0d56e025` dropped 2 packages from measurement's money sub-track; C1 SATISFIED rebaselined 203/203 → 201/201 at parent-class layer; report disclosed "money sub-track ceases; measurement parent-class remains SAT."

#### A.13.34 Parallel-strand-framing pattern for cross-strand content overlap
Existing package covers content overlapping canonical fill at observable-activity layer → default to surfacing parallel framing distinction in `compositionalRationale`. Observable activity ("the kid reads the clock") can be surface for content authored under multiple strands' pedagogy; both have legitimate strand-canonical pedagogy; both ship; `compositionalRationale` MUST name distinction explicitly (structural requirement, not optional). Anti-pattern: defer-or-skip on observable-activity overlap. Empirical: Arc 17 Phase 1.4 read-time-vs-tell-time (measurement clock-mat manipulative-first vs telling-time-productive-vocabulary); Arc 19 Phase 1.4 phonological-awareness vs phonics-decoding strand-boundary (oral phoneme manipulation vs letter-symbol-decoding; `bc128f4b`).

#### A.13.34.1 FULL-OVERRIDE threshold-class enumeration
Locale variants of canonical packages diverge from en at one of three threshold classes:
- **Materials-level** — pedagogical content preserved; only linguistic surface translates. Sparse-override per-material linguistic adjustments. ~80% of pt variants.
- **Pedagogy-level** — package's underlying pedagogy locale-specific (e.g., pt-BR has no r-controlled vowels; pt-BR digraph inventory `LH/NH/RR/SS/CH/Ç` vs en `CH/SH/TH/WH/PH`). Sparse-override REFRAMED with extensive `compositionalRationale.<locale>` citing locale's canonical-curriculum SoT per §A.13.34.2. Empirical `bc128f4b` firing #5: Arc 19 P1.4 read-r-controlled-vowels pt + read-vowel-teams pt + spell-words-with-digraphs pt + write-a-simple-sentence pt.
- **No-equivalent** — package's content has no equivalent in locale's canonical curriculum (USD currency had no canonical pt-BR equivalent). Disposition: substrate-fill OR pkg-removal (currency-removal `0d56e025`). Sparse-override NOT viable.

Apply: at Phase 1 of locale-variant commission, classify each variant BEFORE locking format.

#### A.13.34.2 Locale-canonical-curriculum-divergence sub-class
Pedagogy-level reframing MUST anchor to locale's canonical-curriculum SoT (CCSS for en; BNCC for pt-BR), NOT en CCSS. `compositionalRationale.<locale>` cites locale-canonical-curriculum reference (BNCC `EF01LP*` for pt-BR Year-1 literacy; `EF02MA*` for pt-BR Year-2 math). Citation is structural — without it, reframing reads as ad-hoc deviation. Empirical: Arc 19 P1.4 read-r-controlled-vowels pt (R-positioning per BNCC, 4 positions) + read-vowel-teams + spell-words-with-digraphs (pt-BR digraph inventory per BNCC); Arc 19 P1.5 write-a-simple-sentence pt (pro-drop, adjective-post-noun, gender-agreement, ser/estar per BNCC); Arc 18 P1.2 currency pt FULL-OVERRIDE retired at `0d56e025`.

#### A.13.35 Canonical generator-mode-verification at extension boundaries
Extending a generator with new modes OR referencing modes from spec → verify against canonical mode enumeration at source code AND maintain versioned canonical-mode list in CLAUDE.md per generator. Amend table BEFORE shipping any generator-extension.

**Canonical state of record (Arc 18 Phase 0 audit; corrected post-Phase-6-fold-Round-1 training-fluency defect):**

| Generator | Canonical modes | Source-of-truth |
|---|---|---|
| `manipulative-cut-outs` | `single-repeat`, `variety` | `frontend/scripts/lib/manipulative-cut-outs-package-loader.ts:30` (`CutOutMode` type); originating spec at `materials-catalog.json` lines 215-244 |

Per source: `single-repeat` = one image × itemCount tiles (counting); `variety` = one image per vocabKey × itemCount copies each (sorting). 2 modes entire canonical set. Source-of-truth column is load-bearing per §A.13.32.

**Forward scope:** generalizes to ANY mode-parameter generator (`countMode` `fixed`/`varying`/`explicit + countList`; `tone × locale × strand` axis; `MATERIAL_COUNT_FIELD` lookup). Apply: Phase 1 reads table AND grep-verifies against source; stale table → §A.13.6 firing.

**Self-firing-as-validation footnote.** Round 1 fold `2bf7723b` introduced this table with 5 modes (`single-repeat`, `base-ten-blocks`, `3d-shape-nets`, `counters`, `clock-pieces`) authored from training-fluency. 4 non-canonical were likely `themeName` confusions. Round 2 `6a6f69b0` preserved defect. Arc 18 Phase 0 audit per §A.13.32 caught at next commencement. Discipline designed to prevent training-fluency canonical-naming fired at its own instance. Corrected at `694f9823` before Arc 18 P1.1.

#### A.13.36 CC↔assistant cooperation cadence within commission
Per-package pedagogical-judgment + class-conditional adjudication resolves between CC + assistant within commission, NOT through operator routing. Operator routing reserved for (a) phase-boundary ratification, (b) strategic-direction adjudication, (c) explicit-delegation moments.

**Cadence:** per-package pedagogical-judgment (strand framing; class-template; materials; canonical-fill ordering) — CC drafts, assistant reviews, CC revises; operator does not route. Class-conditional adjudication per §A.13.37 — CC reads table; applies; surfaces deviations to assistant. Phase-boundary ratification (arc-close; commission spec lock; Phase N → N+1) → operator. Strategic-direction adjudication (Pillar 5 mass-run scope; launch-envelope lock; cross-pillar prioritization) → operator. Explicit-delegation moments ("you choose"/"make the call") → adjudicator-forward per §3.4.

**Cross-session-boundary.** "Within commission" is **per-conversation-session**, NOT transitive. New session via working-memory upload → operator routing re-enters at new commission's recommendation boundary (per §A.13.21). Anti-pattern: per-package routing "I drafted X for package Y; please confirm" scales operator-attention with N; cooperation-cadence bounded by phase count. Empirical: 5 Arc 17 phases + Arc 14/15/16 — resolved without operator routing.

#### A.13.37 Class-conditional disposition pattern as canonical materials composition gate
Materials composition dictated by package class per fixed canonical table. Table IS the gate; deviations require explicit `compositionalRationale` rationale + assistant ratification at Phase 1 close.

| Package class | Materials count | Composition |
|---|---:|---|
| Numeracy | 7 | flashcards, picture-cards, place-value-mat, vocabulary-tracing-strips, manipulative-cut-outs, parent-take-home-letter, answer-key |
| Literacy | 8 | class-template per Arc 16 patterns; canonical YAMLs at `docs/lesson-plans/packages/identify-letter-sounds-vowels/` + siblings |
| Vocabulary | 8 | class-template per Arc 16 patterns |
| World-knowledge | 7 | class-template per Arc 17 patterns; canonical YAMLs at `docs/lesson-plans/packages/identify-living-vs-nonliving/` + siblings |
| SEL | case-by-case | strand-specific; default to PSED-class-template when applicable |
| Logic | 8 | Arc 17 Phase 1.1: standard 7 + matching-mat |

Apply (Phase 1): identify class per strand assignment; read row; compose against class-template (default: identical); surface deviations at Phase 1 close with rationale. Empirical: 3-package basis at Arc 16 close + Arc 17 5-phase cross-class generalization (logic-class established Phase 1.1 via complete-analogy-image-pair).

#### A.13.38 Decoupled-ship pattern across arc-close empirical reliability
Multi-pillar commission cycles ship in decoupled cadence preserving rollback granularity + absorbing unplanned-failure-mode:
1. **Phase P1** — package authoring at filesystem level. Write `package.yaml` + asset trees BEFORE git-stage. PC-power-loss / crash leave work recoverable from filesystem.
2. **Arc-close commit** — single commit captures recoverable filesystem state atomically.
3. **Phase P2 close-out cycle** — absorbs downstream-deploy dimensions: materials regen (PDFs) + CDN deploy + cross-bundle updates + scope-doc amendments. Ships separately so per-dimension failure-modes don't entangle with arc-authoring rollback.

Primary empirical: Arc 17 P2 PC-power-loss recovery. Filesystem state preserved across unplanned power-loss; arc-close commit re-ran cleanly without re-authoring loss.

**Three-tier commit discipline:**

| Tier | Scope | Trigger | Git |
|---|---|---|---|
| (a) Arc-close | Master packages + arc-doc | Phase P1 complete | In-tree |
| (b) P2 close-out | PDFs + cross-bundle + scope-doc amendments | Phase P2 complete | In-tree |
| (c) Working-memory | SESSION-STATE.md / CONVERSATION-HANDOFF.md / commission-resolved markers | Within/between commissions | Out-of-tree per §A.8.3; NOT committed |

Tier-confusion (committing tier-c OR coupling tier-a + tier-b) is canonical anti-pattern. Supporting: Arc 14/15/16/17 — 4-arc empirical reliability. Anti-pattern: coupled-ship at arc-authoring boundary trades rollback granularity for atomicity.

#### A.13.39 Fold-cycle doctrine-content empirical-grounding at Round 1 + Round 2 review
[DOCS] fold-cycle Round 1 + Round 2 review MUST include empirical-content verification of every doctrine-table cell, canonical-mode list, canonical-artifact path, cited line range against canonical source. Authoring from training-fluency/memory/prior-session-text produces doctrine-table defects shipping into canonical that propagate downstream.

Round 1 dimensions (existing): structural-shape; cross-reference completeness; anti-pattern pole sharpness; when-to-apply trigger; empirical-anchor commit-hash citation; origin line.

Round 2 **adds 6th dimension: empirical-content verification.** For each doctrine cell introduced by Round 1: Read canonical SoT directly; compare claim against source; flag divergence as §A.13.6 firing BEFORE Round 2 surgical-fixes commit.

Empirical: §A.13.35 self-firing correction at `694f9823` (Arc 18 Phase 0). Round 1 fold `2bf7723b` shipped 5-mode `manipulative-cut-outs` table from training-fluency; Round 2 `6a6f69b0` preserved via surgical-fixes pass without empirical-content verification. Arc 18 Phase 0 audit per §A.13.32 caught: source defines only 2 modes. Discipline caught its own substrate violation; canonical example of §A.13.39's necessity.

#### A.13.40 Operational-tooling canonical-patterns
Production scripts composing shell tools have toolchain-specific failure modes recurring across commissions when undocumented.

**Canonical patterns (as of `22338d69` + `1bdc2789`):**
1. **Puppeteer `browser.close()` + chained-bash `| tail -N` pipes hang.** Subprocess cleanup doesn't release pipe stdin/stdout. Use single-generator-per-job. Anti-pattern: `node scripts/gen-A.js ... | tail -20 && node scripts/gen-B.js ...` — hangs at first browser.close(). Surfaced: Arc 18 P2 (`1bdc2789`).
2. **pscp CLI syntax on Windows requires `-l user host:path`.** PuTTY's `pscp` requires `-l user host:path`; POSIX `user@host:path` silently fails on Windows — file not uploaded, exit code 0. Use: `pscp -pw <pw> -l root <local> <host>:<remote-path>`. Surfaced: Arc 18 P2 deploy when ~590-PDF tarball appeared to upload but Hetzner `ls` showed no file.
3. **tar -C extract path ordering preserves entry-relative paths.** Use `tar -C frontend/.scratch/<gen> en es` producing entries `en/*` + `es/*`; extract `tar -C materials/<gen>` produces clean. Anti-pattern: archive `tar -C frontend/.scratch <gen>/en <gen>/es` produces nested `materials/<gen>/<gen>/en/*`. Surfaced: Arc 19 P2.3 numeral-cards (`22338d69`).
4. **Curl-verification at 6-dimension grep pattern** — cross-refs §A.13.13 + §A.13.28.

Maintenance: new patterns added at commission empirically surfacing them — NOT separate [DOCS] fold.

#### A.13.41 Authoring-drift recognition discipline — class (a)/(b)/(c) framework
When canonical-state-vs-shipped-state divergence surfaces at Phase 0, classify into three structural classes BEFORE locking remediation:

- **Class (a) Authoring drift** — shipped diverges due to authoring error. Canonical correct. Remediation: retrofit shipped via [FIX][LESSON-PLANS] / [FIX][SCHEMA] / [FIX][AUTHORING].
- **Class (b) Doctrine drift** — doctrine/canonical empirically wrong; shipped reflects correct reality. Remediation: amend doctrine via [FIX][DOCS] AND audit prior commissions locked against wrong doctrine.
- **Class (c) Parallel framing** — distinct strands/packages/framings legitimately at same observable activity. Both correct under different framings. Remediation: ratify both with explicit `compositionalRationale` distinction per §A.13.34.

Anti-pattern: reflexive Class (b) (amend doctrine) when actually Class (a). Symmetric: reflexive Class (a) locks against wrong canonical.

**Apply (Phase 0):** identify divergence; quote both with SoT paths; verify canonical is current per §A.13.32. **Test for (c) first** per §A.13.34 (observable-activity overlap ≠ duplicate). **Test for (b) second** per §A.13.39 (empirical-content verification). **Default to (a).**

Canonical reclassification empirical: §A.13.37 literacy 8-vs-7 material reversal at Arc 19 P2.2 (`f41d4146`). Arc 19 P1.4 close (`bc128f4b`) initially Class (b); P2.2 re-read Phase 1.1-1.3 packages (8 materials WITH sentence-strips); identified Phase 1.4-1.5 6 packages as drift; reclassified to Class (a). Doctrine table correct at 8; 6 packages need sentence-strips retrofit.

**Other empirical anchors:**
- §A.13.35 `manipulative-cut-outs`: Class (b) — doctrine wrong (training-fluency Round 1); corrected `694f9823`
- §A.13.34 read-time-vs-tell-time (Arc 17 P1.4): Class (c)
- §A.13.35 `word-cards` mode-drift in 3 Arc 14 packages (`bc128f4b` firing #4): Class (a) — 3 packages need retrofit; no doctrine amendment per Arc 19 P2.1 verification (`7c86233d`)
- §A.13.34 pt FULL-OVERRIDE pedagogy-level (Arc 19 P1.4-1.5; `bc128f4b` firing #5): Class (c) — pt-BR phonics canon (BNCC) legitimately diverges from en CCSS

#### A.13.42 Cache-buster discipline on mini-tools .js changes
Every change to a `*-core.js` or `*-activity.js` in `mini tools/` MUST bump the `?v=N` query in the html wrapper's `<script src>` tag. Same commit; don't split. Without the bump, browsers that visited any earlier version of the URL continue serving the stale local copy and miss new locale strings / task params. CDN edges + service workers compound the staleness.

Mini-tool wrapper html files carry an inline comment near the script tags documenting the rule as a reminder.

**Empirical anchor:** FI E8 fan-out commit `92d0a136` modified `syllable-builder-activity.js` without bumping `?v=1` → operator's browser served cached pre-fan-out JS → in-card title rendered Spanish on FI page. Corrective commit `f59a7ad2` bumped to `?v=2` and force-refreshed. Current state post commit `693b3e86`: `syllable-builder-activity.html` at `?v=3`.

Long-term cleanup candidate: content-hash cache-busters (`?h=<sha1-of-file>`) eliminate the manual discipline. Defer until volume of mini-tool changes makes manual bumps error-prone.

#### A.13.43 Programmatic textContent assertions for chrome i18n
For shared-chrome i18n changes (header nav, activity chip, in-iframe title, breadcrumb, footer crawl-bait), the verification artifact MUST include programmatic `textContent` assertions via Puppeteer's `$eval` with `setCacheEnabled(false)`, not just visual eyeball of the screenshot. Eyeball PNGs from fresh-state Chromium can show correct rendering while user-side cache shows broken state — the assertion is the load-bearing check.

**Empirical anchor:** FI E8 fan-out commission's report said "I eyeballed the PNG; title is 'Sanan rakentaja'" — the PNG WAS correct, but operator's browser cache served pre-fan-out JS rendering Spanish. The cache-buster commit `f59a7ad2` added textContent assertions on `.lcs-title` across PT/FI/ES + cache-disabled fetch, catching this class loudly on first run thereafter. The PT E8 fan-out (commit `693b3e86`) USED the new pattern; 3 textContent assertions across PT/FI/ES passed cleanly.

Cross-reference §A.13.42 (cache-buster bump discipline).

#### A.13.44 Pipeline regression-snapshot discipline
For ANY change to `scripts/v2-data/verify-syllable-boundaries/` (gate.js, cli.js, rule-syllabifiers/*.js), snapshot the existing `output/approved-words-<locale>.json` for every affected locale + aggregated `output/quarantine-report.json` to `.before-<arc>.json` siblings BEFORE re-running the pipeline. Convention: `<filename>.before-<short-arc-name>.json`.

The diff against the snapshot is the only auditable evidence that (a) the target class shifted as expected, (b) no other class regressed, (c) counts in untouched locales stayed byte-identical (modulo `generated_at` timestamp).

**Empirical anchor:** gate v1.1 commission (commit `6bc6e804`) introduced the pattern. Río fix (`b84113f7`) + PT first-run (`e6f979cf`) + iã+o fix (`ad4924da`) all reused it. Snapshot files NOT staged (out-of-tree audit artifacts per §A.8.3).

#### A.13.45 Pre-flight hand-trace encoding fidelity
When tracing rule-syllabifier behavior by hand (typical Phase 1 diagnostic), keep accented characters as their canonical Unicode codepoints throughout the trace. `ã` is U+00E3 (single codepoint, in `NASAL_VOWELS`); `pão` is `p`+`ã`+`o`, NOT `p`+`a`+`o`. Trace via direct Read of the actual file, not via mental-model reasoning that may strip diacritics.

**Empirical anchor:** PT first-run commission Phase 1 (commit `e6f979cf`) — Explore agent traced `pão` as `p`+`a`+`o` and concluded a "BLOCKING ISSUE" in pt.js nasal handling. Direct read of pt.js + correct codepoint tracing showed `pão`→`[pão]` (1 syllable, nasal diphthong via `NASAL_VOWELS.has('ã')`) is correct. Powering through the agent's false-alarm hypothesis would have wasted a commission. Note: the GENUINE iã+o defect (avião → [a,viã,o]) was a different, real bug — surfaced empirically when the pipeline ran on the real corpus, NOT predicted by the agent. That's the correct fault-detection mode: hand-traces predict; empirical runs validate.

Cross-reference §A.13.14 (Phase 1 Explore-agent fidelity validation — Grep+Read for fidelity-critical claims).

#### A.13.46 Content-locale-direct SEO chrome lookup (anti-`_t()`-locale-binding-drift)

App-side SEO chrome emission (`seoMeta.{worksheetWord,freeInteractive,forWord,printOrPlay}` per §17.8.4) MUST use a content-locale-direct lookup against `window.translations` (the `translations-shared.js` merged dict), NOT the per-app `t()` function. Two recurring bug classes break SEO emission when SEO calls route through per-app `t()`:

- **Class 1 — `t()` returns the key string on miss.** Per-app `t()` implementations that end with `|| key` (instead of `|| null`) defeat the JS short-circuit `_t('x') || 'Fallback'` because the lowercase/literal key string is truthy. Result: deck.html ships with literal i18n key names (`seoFreeInteractive`, `seoFor`) instead of localized values. Empirical: chart-count Italian wave 2026-05-22 (49 ZIPs halted by §17.8.17 invariant 6).
- **Class 2 — `t()` uses `uiLocale` (operator's UI language) instead of content locale.** When operator generates Italian content with English UI (`uiLocale='en'`, `currentLocale='it'`), `_t('worksheet')` returns "Worksheet" (English) while the seo_trace builder (which uses content locale via `buildSeoTrace`) records "Scheda" (Italian). The seoMeta + deck.html title diverge from seo_trace. Empirical: bingo Italian wave 2026-05-22 (69 ZIPs; slipped the publish-time gate but caught by post-publish `audit-deck-html.js`).

**Canonical fix — `_seoT` helper at the SEO emission boundary:**
```js
var _seoT = function(key) {
  var loc = (window.currentLocale ||
             (typeof DECK_BUNDLE !== 'undefined' && DECK_BUNDLE.contentLanguage) ||
             'en');
  var s = (window.translations) || {};
  return (s[loc] && s[loc][key]) ||
         (s.en && s.en[key]) ||
         null;
};
```
Bind `loc` to content locale (NOT uiLocale). Read directly from `window.translations` (the shared dict; `translations-shared.js` line ~64-540 carries the 4 SEO chrome keys × 11 locales). Return `null` (NOT the key string) on miss so `_seoT('x') || 'Fallback'` short-circuits correctly.

**Empirical anchor:** Italian first-publish wave 2026-05-22 surfaced 4 apps in the same bug class: chart-count (Class 1, 49 ZIPs), bingo (Class 2, 69 ZIPs), cryptogram (Class 1+2, 99 pre-existing decks), shadow-match/find-shadow (Class 1+2, 1 deck). Structural fix applied at `REFERENCE APPS/{chart-count,bingo,cryptogram,shadow-match}.html` at the SEO emission boundary (~line 2772, 3116, 4457, 2560 respectively): added `_seoT` helper alongside the existing `_t` and swapped the 4 SEO `_t(...)` calls per app. Per-app `t()` left intact for non-SEO UI text.

**Cross-references:**
- §17.8.14 (sr-only srLang-keyed lookup convention — same discipline applied to sr-only emission; this doctrine extends it to SEO chrome).
- §A.14.8 step 2b (bundle-vs-current-app reconciliation — `_seoT` removes the gen-time emit-side defect class that produced the chart-count residue; salvage script per §15.17 remains the recovery path for already-staged wave ZIPs).
- §17.8.17 invariant 6 (`LOCALE_RESIDUE_DETECTED` gate — caught chart-count at publish-time but missed bingo due to seo_trace/template divergence; `_seoT` closes the divergence at emit-time).

**When to apply:** future app authoring (29-app maintenance) MUST use `_seoT` for SEO chrome emission, never `_t`. Existing apps' SEO emission audited for this pattern; the 4 named are the empirical-failure set; remaining 25 apps continue to work because their `t()` either returns `null` on miss OR their app-specific table happens to carry the SEO keys for all 11 locales (incidental). At any new-app port + at any existing-app SEO emission refactor, apply the `_seoT` shape verbatim.

#### A.13.47 Activity-page CSS pitfalls (compiled from v7.1→v7.13 polish session, 2026-05-22)

Hard-won rules. Re-discovering any of these wastes hours. Apply at every `/[locale]/activities/[slug]/` + `mini tools/*-activity.html` edit.

1. **iframe `vh`/`vmin` is iframe-relative, NOT viewport-relative.** Content that grows the iframe via ActivityIframe postMessage auto-resize creates a circular dependency: bigger iframe → bigger `vh`/`vmin` basis → bigger clamp values → more content growth → more iframe growth. Empirical: v7.5 `prompt { font-size: clamp(22, 6vh, 48) }` ran away to 48px ceiling on mobile when prompt wrapped; card grew 1070-1228px. **Fix**: use `vw` (viewport-stable) for content font sizes that mustn't grow with iframe height.

2. **`display: flex` defaults to `flex-direction: row`.** `justify-content: flex-start` on a flex-row LEFT-aligns horizontally, not top-aligns vertically. Empirical: v7.4 `.lcs-stage { justify-content: flex-start }` intended "top-align engine vertically" but actually left-aligned engine horizontally (engine wraps off-center -19 to -57px). **Fix**: set `flex-direction: column` explicitly when you want column behaviour.

3. **CSS Grid items with `max-width` fall back to `start` (left) when stretch fails.** Adding `max-width: X` to a grid item without `justify-self: center` produces left-aligned items. Default `justify-self: auto` inherits parent `justify-items: stretch`, but max-width prevents stretching → falls back to `start`. Empirical: v7.10 added `max-width: 76/246` on cb-tile → tiles left-shifted in their columns. **Fix**: always pair max-width with `place-self: center`.

4. **`grid-template-columns: repeat(N, 1fr)` with content-sized items creates HUGE inter-item gaps.** Each column = board-width/N regardless of item content. If items smaller than 1fr, empty space appears between them. Empirical: v7.11 desktop cb-cols-2 → inter-tile gap = 320px (column 351, tile 49). **Fix**: use `repeat(N, auto) + justify-content: center` for content-sized columns with only the explicit `gap` between items.

5. **`width: X` ≠ `max-width: X`.** For UNIFORM sizing across content variations (e.g., tiles with different image counts), use `width: X` (forces exact size). `max-width: X` is a cap — items can still vary smaller based on intrinsic content. Empirical: v7.11 Which-group-has-more 3-item tile was 170×170, 5-item tile was 241×241; v7.12 `width: 220px` made both 220×220.

6. **Engine-injected CSS at runtime wins on same-specificity ties.** Engines (cb/tf/cvc/wb-core.js) call `appendStyles()` AFTER DOM parses → engine rules come later in cascade than wrapper inline `<style>`. Empirical: v7.2 wrapper rules without `!important` were defeated; verify-mobile.js found tf-frames-area still `row` despite wrapper saying `column`. **Fix**: use `!important` on every engine-overriding rule.

7. **Card `overflow: hidden` + fixed height clips engine content → visually reads as "elements overlapping each other".** Stage child with `min-height: 0` (shell default) shrinks below content height; engine content overflows DOWN past stage into actions area; card clips bottom. Empirical: v7.7 cvc-builder engine overflow 171px → 141px overlap with Check button. **Fix**: `.lcs-app.activity { height: auto; overflow-y: visible }` universal; iframe `min-height: 66.67vh` (floor only) so postMessage auto-resize handles growth.

8. **Tablet (768) is its own breakpoint, NOT a "wide mobile" or "small desktop".** Desktop grid layouts (`minmax(0, 1fr) auto minmax(0, 1fr)`) with fr-columns shrink to 0 on tablet → controls overflow into title area. Empirical: v7.7 grid worked desktop, broke iPad-mini 768 (title-controls overlap 71px). **Fix**: extend mobile flex-stack header to `≤1023`; grid only at `≥1024`. Always test desktop AND tablet AND mobile separately.

9. **iframe-src cache-buster `?v=N` is REQUIRED, not optional.** Browser bfcache + iOS Safari/Android WebView ignore `Cache-Control: max-age=0` under back-forward restoration. Empirical: v7.5 prompt-runaway fix not visible on operator's phone until v7.3-era added `?v=N`. **Fix**: `ACTIVITY_WRAPPER_VERSION` constant in `frontend/app/[locale]/activities/[slug]/page.tsx`; bump on every wrapper change.

10. **Tests passing ≠ visual approval.** Programmatic assertions catch overlap/gap/padding/font-size but miss "looks unprofessional". Empirical: v7.5 reported 109/109 PASS while operator saw cramped + off-center layout; v7.7 reported 125/125 PASS while operator saw tiles left-shifted. **Fix**: capture screenshots at desktop (1920) + tablet (768) + mobile (375/390) and EYEBALL them before declaring shipped. Cross-reference CLAUDE.md §A.13.43 approval cadence.

**Bonus operator-collaboration rules:**
- When operator gives precise deltas (+30%/-30%), apply literally. Don't second-guess; declare side-effects but don't pre-adjust. v7.10 was first-try success because operator specified exact deltas.
- Engine has content-aware classes already (`cb-cols-2`/`cb-cols-4`, `cb-tile--text`/`cb-tile--group`, `tf-double`, etc.) — use them for per-variant CSS. Don't try to detect activity ID from CSS.
- Cache-busting cascade per §A.13.42: `lcs-shell.css?v=N` bumps in ALL 7 wrappers same-commit when shell changes; `ACTIVITY_WRAPPER_VERSION` in page.tsx bumps independently when only wrapper HTML changes.
- If operator hits frustration breaking point, STOP and offer rollback (`git revert <commit>`) rather than power through more iterations. v7.9 → v7.8 rollback was the right move.

Origin: 13-iteration polish session 2026-05-22 (v7.1→v7.13, commits `2149e1a8` through `d333f3c8`). Each rule represents a real iteration that could have been saved.

#### A.13.48 11-locale i18n recreation discipline via 3-agent native ensemble

Standing rule (operator-locked across the 10-commission homepageV3 arc 2026-05-23/24): when a commission requires **recreating** (not translating) a content namespace across all 11 supported locales, the workflow is plan-mode-per-locale + 3-agent ensemble per locale:

1. **Enter plan mode** for each non-EN locale individually. Never batch all 10 non-EN locales in one execution.
2. **Launch a 3-agent ensemble in parallel** (single message, multiple Agent tool calls):
   - One native **linguist** of the target locale.
   - One native **marketing expert** of the target locale (B2C K-3 EdTech).
   - One native **K-3 educational content expert** of the target locale.
3. **Synthesize** their three reports. Surface convergences + divergences explicitly. Document which expert you weighed heaviest on each disputed decision.
4. **Use AskUserQuestion** for the highest-impact operator-strategic decisions — typically: squiggle/curriculum-framework target (per §A.13.49 taxonomy), mock panel demo language, register choice (formal vs informal), card/image swap requirements.
5. **Write the recreated copy** into the plan file as a string-by-string table (KEY | EN baseline | RECREATED | Synthesis rationale).
6. **Call ExitPlanMode** for operator approval per locale.
7. **Apply** after approval — write the locale's namespace into `frontend/messages/<locale>.json`, plus any component-side changes (e.g., per-locale image/tile map).
8. **Commit** with locale tag: `[FEATURE][PROTOTYPE] <Namespace> <LANG> recreation`. Nordic+Finnic (sv/da/no/fi) MUST add `[NSR-FLAG][<LOCALE>]` per §17.5.1.
9. **Push + deploy** per locale.
10. **Verify** via curl spot-check (~15-17 representative strings per locale + raw-i18n-key leak check + DOM audit for image/tile changes).

**Why structural**: prior batched-translation attempts missed strings, used wrong register, made wrong squiggle-target calls. The plan-mode-per-locale + 3-agent discipline catches these BEFORE shipping by forcing explicit synthesis + operator approval per locale. Empirical anchor: 11-locale homepageV3 arc (10 commits across 2026-05-23/24, ~15-45K tokens per locale Phase 1).

**Hybrid acceptable for small namespaces**: when a namespace is ≤10 short strings (e.g., the worksheetsPage 10-key namespace at commit `3dc57dfe`), batch-fanout using vocabulary patterns established from prior plan-mode commissions is acceptable. The 3-agent ensemble per locale is the rule for ≥50 substantive strings.

**When NOT to apply**: single-string edits (typo fix), bug-fix CSS/layout changes (not content recreation), cleanup/refactor of existing i18n without content change.

Origin: this session's 10 homepageV3 commissions (DE/FR/ES/PT/IT/NL/SV/DA/NO/FI).

#### A.13.49 Locale-credible curriculum-framework squiggle taxonomy

Per-locale credible squiggle targets for any K-3 EdTech credibility surface (homepage hero, pillar01, ABout pages, parent-facing pedagogical claims). Locked from the 10-commission homepageV3 arc. Use as canonical reference; do NOT re-derive via fresh agent ensemble at every new commission.

| Locale | Squiggle target | Source / authority |
|---|---|---|
| `en` | Common Core | US K-3 standard (CCSS State Standards) |
| `de` | Lehrplan | KMK / Länder primary curriculum framework |
| `fr` | programmes officiels | Éducation nationale Bulletin officiel |
| `es` | los planes de estudio | LOMLOE 2020 / regional curricula |
| `pt` | BNCC | Base Nacional Comum Curricular (Brazil 2017-) |
| `it` | Indicazioni nazionali | MIUR 2012/2018 framework |
| `nl` | SLO Kerndoelen | Stichting Leerplanontwikkeling primary curriculum |
| `sv` | Lgr22 | Skolverket current K-9 framework (post-2022) |
| `da` | Fælles Mål | Børne- og Undervisningsministeriet (lit. "Common Goals" — happy semantic near-cognate to Common Core) |
| `no` | LK20 | Læreplanverket 2020 / Fagfornyelsen (Udir) |
| `fi` | OPS 2014 | Perusopetuksen opetussuunnitelman perusteet 2014 (Opetushallitus / EDUFI) |

**Apply**: at any new commission requiring per-locale credibility framing, use the table above directly. Pedagogical agent verification required only if extending to a NEW credibility surface that's structurally different from K-3 curriculum framing (e.g., teacher-credential surfacing, professional-development claims). Body-copy supplementary phrasing for "aligned to <framework>" is locale-specific — see homepageV3 namespace in `frontend/messages/<locale>.json` for established collocations ("Anpassad till Lgr22", "Tilpasset Fælles Mål", "Yhteensopiva OPS 2014:n kanssa", etc.).

**Pair with**: §A.13.48 (recreation discipline) — the table above is the OUTPUT of the discipline applied to 10 locales; future commissions consuming this table avoid 10x agent-ensemble cost.

Origin: 10-commission homepageV3 arc 2026-05-23/24.

#### A.13.50 Client-component dropdown SSR verification gotcha

When verifying client-rendered dropdown menu items via curl, content WON'T appear in SSR HTML — the dropdown is gated by `{isOpen && (...)}` and renders only when user clicks to open. False-negative verification trap: a successful CSS-side change shows 0 hits in curl despite being correctly deployed.

**Diagnostic alternatives**:
1. **Trust source diff + build success** (simplest): if the source change is correct + `deploy.sh` runs clean + git status shows commit pushed, the dropdown change IS live. Curl just can't see it.
2. **Puppeteer headless test**: click the dropdown trigger, assert `.textContent` on the rendered menu items per §A.13.43 textContent-assertion discipline. Most robust for production verification.
3. **Operator visual eyeball** at desktop/tablet/mobile breakpoints. Required anyway per §A.13.43 for UI changes.

**Surface area**: any client component with `'use client'` directive that conditionally renders content via `{state && (...)}`. CategoryNav.tsx is the canonical example (line 114 in `frontend/components/layout/CategoryNav.tsx`). Other suspects: modals, hover popovers, tabs (some implementations), conditional sidebars.

**Cross-ref**: §A.13.43 (textContent-assertion discipline). §A.13.13 (fan-out verification 6-grep-dimension discipline) — this is the 7th dimension for client-component dropdowns: "if conditionally rendered, source-diff verification + Puppeteer over curl".

Origin: CategoryNav `browseAllHref` change 2026-05-24 commit `69d7cfdb` — fix shipped + live + verified via source diff, but initial curl verification returned 0 hits because dropdown content is `{isOpen && (...)}`-gated.

#### A.13.51 Homepage-v3 hardcoded card1 tile pattern

`frontend/components/homepage-v3/PillarActivities.tsx` hardcodes card1 tiles as `['gat', 'to']` (Italian "gat-to" syllabification of "gatto"). All 11 locales' homepageV3 namespace recreates card1Title/Prompt/CheckLabel/GradeLabel but `card1SubjectAlt` is alt-text-only (describes IMAGE = cat) WITHOUT affecting the visible Italian tiles.

**Per-locale card1SubjectAlt values shipped**:
- en/de/fr/es/pt/it/nl/sv/da/no: cat-equivalent in respective language (kat / Katze / chat / gato / gato / gatto / kat / katt / kat / katt — 1 syll most locales, doesn't match 2-tile mockup; alt-text only)
- fi: **kissa** (kis-sa, 2 syll) — uniquely matches the hardcoded 2-tile syllable count. The Italian tiles still visually render "gat" + "to", but the FI alt accurately describes the cat image with a syllable-count-matching word.

**Card3 (different from card1)** uses per-locale `card3ByLocale` image+tiles map at PillarActivities.tsx — 9 locales reuse elephant image; 1 (FI) swaps to giraffe because "elefantti" is 4 syll. Card3 is fully per-locale; card1 is NOT.

**Per-locale card1 tile recreation deferred** to separate component commission. Design decision needed: does each locale get its own card1 tile triple, or do all locales keep the Italian tiles as a "demonstration of multilingual platform" feature? Operator-strategic.

**Cross-ref**: `card3ByLocale` map in PillarActivities.tsx serves as the precedent pattern if/when card1 is per-localized.

Origin: 10-commission homepageV3 arc 2026-05-23/24 + homepage-v3 promotion 2026-05-24 commit `bc215a5c`.

#### A.13.52 Rule-syllabifier WORD_BLACKLIST — R abstains, never overrides T

Per the locked safety invariant ("a wrong split NEVER reaches an activity; quarantine ALWAYS beats publishing a wrong split"), rule-syllabifier R is an ADDITIONAL agreeing source under the strict gate — never authoritative. Empirically confirmed at `gate.js:226-238`: `split_source_disagreement` check fires BEFORE count-agreement check; T+R disagreement → quarantine regardless of N+S+W. SV STEP 2 evidence: 964/964 SV-approved have BOTH `TeX` AND `rule` in `sources_agreed`; zero R-overrides-T recoveries.

**When R's principled K-1 convention conflicts with TeX's empirically-inconsistent choice for specific words AND the word is native (not loanword), R RETURNS NULL for those words.** Effect: gate sees only T as split source → no split-disagreement → word recovers via T+N+S count agreement. The locked safety invariant is preserved as "R abstains" rather than "R overrides."

**Implementation:** in `rule-syllabifiers/<locale>.js`, add a `WORD_BLACKLIST = new Set([...])` const + early-return in `syllabify(word)`:
```js
function syllabify(word) {
  if (!word || typeof word !== 'string') return null;
  if (word.length <= 1) return [word];
  if (WORD_BLACKLIST.has(word.toLowerCase())) return null;
  return syllabifyCompound(word);
}
```

**Canonical example: NO STEP 2 (`rule-syllabifiers/no.js`).** 9 words blacklisted: `kjegle / kongle / kringle` (Norwegian native -gle ending where TeX picks closed-syl; R's gl-INSEPARABLE would mismatch), `sykling / tøfler` (TeX-inconsistent on stop+liquid/fl in specific words), `gjøkur` (compound where second element 'ur' is too short for compound-suffix match), `oppvaskmaskin / symaskin` (TeX-inconsistent on sk inside maskin element), `forstørrelsesglass` (Norwegian compound with internal st-cluster handled differently by TeX in compound context). All 9 entries are Norwegian-native; loanword regressions remain (acceptable per operator). Final NO STEP 2 result: 829/1263 approved (65.6%); 29 residual regressions all foreign loanwords.

**When NOT to use:** loanwords (acceptable regressions per operator); words where R's principled convention is correct AND TeX is wrong (those quarantine appropriately; that IS the safety mechanism working).

**When to use:** native-locale word where (a) TeX's split is what operator expects K-1 children to see, (b) R's principled convention produces a different split, (c) N+S agree with TeX's count, (d) blacklisting R would let the word recover via T+N+S without R contributing a contradicting split.

Cross-references:
- §20.7 — phonics safety pipeline; per-language verdicts
- [[project-phonics-safety-pipeline]] memory — full WORD_BLACKLIST + ng-rule doctrine
- gate.js:226-238 — empirical safety mechanism this discipline honors

Origin: NO STEP 2 commission 2026-05-25 commits leading to `f834efd1` (no.js + WORD_BLACKLIST shipped; 5 iteration rounds; final +58 net to 829 approved).

#### A.13.53 Cognate-aware locale-leakage verify discipline at sequential per-locale fan-outs

When a commission ships ONE activity across all 11 locales as N sequential per-locale commissions (operator approves each before next), apply this doctrine from commission 1 — NOT commission N. **Distinct from §A.13.48 parallel-agent recreation** (different commission shape: §A.13.48 = 3-agent native ensemble for namespace recreation; THIS = sequential per-locale fan-out of one activity instance using PVC-locked cardinal tables + cognate-aware verify).

**Discipline:**

1. **Single-row-multi-locale manifest pattern.** One row id in `<engine>-activities.json` with per-locale `slug`/`page_title`/`page_intro` maps. `resolveActivitySlug` disambiguates by locale. Avoids per-locale row proliferation + hreflang fragility. NEVER add a new row per locale.

2. **Per-locale Puppeteer verify script** at `mini tools/.verify-<slug>.js` with `FORBIDDEN_SUBSTR` array listing OTHER locales' distinctive tokens. Each locale's verify greps its own iframe DOM body for those tokens; expects 0 matches at all 3 viewports (375/768/1920).

3. **Cognate-drop calibration when shared roots exist.** Drop genuine shared cognates from the FORBIDDEN list of the OTHER locale at the CURRENT shipping locale's verify. Empirical progression at E4 match-pairs K.OA.A.3 rollout:
   - SV first Nordic — no prior Nordic; no drops needed
   - DA verify: drops `Mål`, `Kort ` from FORBIDDEN_SV (Nordic-trio cognates)
   - NO verify: drops `Mål`, `Kort ` from FORBIDDEN_{SV,DA}; drops `makker`, `Tryk`, `Prøv` from FORBIDDEN_DA
   - FI verify: ZERO drops (Uralic distinctness; FI shares no cognates with the 9 Indo-European prior locales)

4. **Full-phrase forbidden tokens, NEVER bare root fragments.** A 4-char substring of locale A is often a substring of locale B's longer word. Use full phrases (e.g., `Alla par blir`, `Alle par bliver`) NOT bare roots (e.g., bare `blir` would false-positive on DA `bliver` ⊃ `blir`).

5. **Substring-trap empirical catalog:**

| Substring trap | Class | Drop discipline |
|---|---|---|
| `blir` (SV+NO copula, 4 ch) ⊂ `bliver` (DA copula, 6 ch) | bare ⊂ longer | drop bare `blir`; use full-phrase `Alla par blir`/`Alle par blir` |
| `Tryk` (DA "tap", 4 ch) ⊂ `Trykk` (NO "tap", 5 ch) | bare ⊂ longer | drop bare `Tryk` from FORBIDDEN_DA in NO verify |
| `Kort ` (Nordic "card" + space, 5 ch) ⊄ `Kortti ` (FI "card", 7 ch) | NOT a trap (trailing space @position-4 differs from `t` @position-4) | SAFE to keep `Kort ` in FORBIDDEN_{SV,DA,NO} for FI verify |
| `en` (DA cardinal-1 bare) vs `én` (NO cardinal-1 acute) | distinct codepoints | NOT a substring trap; cards aren't in FORBIDDEN anyway (internal data) |

6. **Forward-looking cognate documentation.** At each locale's commission close, the operator report MUST document which cognates the NEXT locale's verify will need to drop. Knowledge accumulates across commissions.

7. **Pre-commit gate** at `mini tools/.gate-<locale>-<engine>.js` asserts: current locale strings populated; ALL prior locales byte-untouched (regression floor); manifest row keys preserved for priors; per-task pair-validity probes (typically × 6); spoken summary text exact-match per target (via sandbox `LCSAudio.speak` stub capturing `sandbox.__lastSpeak.text`); cross-locale byte-distinctness sanity.

8. **PVC-locked cardinal tables, NO PVC import.** Cardinals (0-10 for K.OA.A.3 range) value-verified against `PlaceValueCore._NUMBER_WORD_HELPERS.<locale>(n, 'cardinal')` for inline storage; confirm 0 PVC imports in shipped wrapper HTML via curl-grep.

9. **Operator-strategic register adjudications per locale.** Cardinal-1 disambiguation (NL `één`, SV `ett`, NO `én`, DA bare `en`, FI `yksi`), copula choice for "pairs make N" (SV/NO `blir`, DA `bliver` per operator-authorized deviation from E12 `er`, FI `on` singular distributive `Jokainen pari on {n}!`). PVC source comment or operator commission text is the lock.

**Empirical anchor:** E4 match-pairs K.OA.A.3 "Make the Number" 11-locale rollout, 2026-05-26 session (10 sequential commissions DE→ES→IT→FR→PT→NL→SV→DA→NO→FI on top of EN baseline). Key commits: SV `3a24e3a8` → DA `61944985` → NO `a61b9977` → FI `4bf56943` (rollout closed 11/11). Engine `match-pairs-core.js` shipped untouched mechanically across all 10 commissions.

**Cross-references:** §A.13.48 (parallel-agent recreation pattern, distinct shape); §A.13.42 (cache-buster bump per ship); §A.13.36 (CC↔assistant cooperation cadence — per-locale routing rhythm); [[feedback-cognate-aware-verify-discipline]] memory file (full doctrine write-up).

#### A.13.54 Activity-layer i18n fan-out — gender-safe prompt anchoring + per-locale definiteness + 0-line engine bar

Doctrine for building a new distinct-skill activity (EN base) and fanning it out to all 11 locales without touching shared engine code. Empirical anchor: E2 "Comparing Length" (K.MD.A.2) EN build + 11-locale fan-out, 2026-06 (`a5e37bdf` EN → `41232bdb` NO; hreflang chain 12; wrapper `choice-board-activity.js?v=13` / `ACTIVITY_WRAPPER_VERSION='7.73'`).

1. **0-line engine bar via the activity layer.** A new activity + its fan-out touch ONLY: the engine's **activity wrapper** (`<engine>-activity.js` — a new `task_template` branch + a wrapper-injected `<style>` for any new visual treatment), the `*-activities.json` manifest row (per-locale slug/page_title/page_intro), `frontend/messages/activity-content/<locale>.json` (the strand byStrand block), `frontend/lib/seo/strand-names.ts`, and `page.tsx` (`ACTIVITY_WRAPPER_VERSION` constant). The shared **cores** (`choice-board-core.js`, `place-value-core.js`, `match-pairs-core.js`) + `lcs-shell.{css,js}` + Direction A CSS stay **byte-identical**. The definitive regression proof at fan-out end is `git diff <pre-arc>..HEAD --name-only` over those protected files = **0 changes** — which makes per-instance re-verification of the byte-identical engines redundant-by-construction (sample one instance per engine for overflow/caption/speech; the audit + git-diff cover the rest).

2. **Gender-safe prompt anchoring (locked precedent).** When a "tap the {comparative} one" prompt must agree across objects of mixed grammatical gender, anchor agreement to a FIXED noun, not the varying object: fr/es/it/pt → feminine *image* (l'image / la imagen / l'immagine / a imagem); nl → neuter *het plaatje*; sv → common *bilden*; de → neuter substantivized *das höhere*; fi → partitive comparative (no anchor noun). **Per-locale definiteness is a real trap — confirm with a native expert:** Danish uses **single** definiteness (free article + adjective + BARE noun: "det højere billede", enclitic dropped) while Norwegian/Swedish use **double** definiteness (enclitic kept: no "det høyere bildet", sv "den högre bilden"). These are mirror-image and trivially gotten backwards — the linguist must explicitly confirm.

3. **Wrapper prompt strings pre-seeded all-11, validated/corrected per locale.** Author the prompt-string dict for all 11 at EN-build time (Nordic NSR-flagged). Per locale, a native-expert linguist validates; edit the wrapper string ONLY on a correction → then bump BOTH cache-busters (`?v=N` on the `.html` script tag + `ACTIVITY_WRAPPER_VERSION` in `page.tsx`, §A.13.42) and **re-verify every prior locale renders byte-identical post-bump** (the wrapper is shared). The tile aria-label keeps the raw-English-noun house pattern (invisible; consistent with the other E2 activities).

4. **Strand localization is the leak-guard.** A new CCSS strand MUST be added to `strand-names.ts STRAND_NAMES` (all locales) or non-EN pages leak the English strand into the teacher chip + JSON-LD + `whatsInsideStrand` (audit `noStrandLeak`). The byStrand prose cites the **locale's national framework** (never "Common Core"), references the strand only via the `{strand}` placeholder (auto-localized by `localizeStrand`), and is **aligned verbatim to each `<locale>.json`'s house voice** (device-list clause, no-timer phrase, framework clause, task-term [opgaven/uppgift/consigna/comando], bare-infinitive-vs-"At" bullet style). Read the locale file's existing Geometry block and match.

5. **Known staleness classes at the cumulative sweep (NOT regressions).** (a) audit `noStrandLeak` on pre-existing activities whose `<locale>.json` byStrand prose embeds the English strand name (es/it/pt localize → clean; de/fr/nl/sv/da/no/fi historically embed → ~13 fails each); (b) `.verify-*.js` chip-strand regexes hard-coding a strand spelling that differs from the correctly-rendered localized chip ("Number **and**…" vs rendered "Number **&**…"; English vs localized). Both are pre-existing harness staleness. Confirm via the **load-bearing grep** (`h1 / slug / framework / leak / overflow / caption / speech` = 0 FAIL) before reporting clean; a hard-coded-hreflang-count fail only materializes if a verify asserts a chain length that the fan-out superseded.

**Cross-refs:** §A.13.53 (cognate-aware verify, sequential per-locale fan-out), §A.13.48 (native-ensemble recreation), §A.13.42 (cache-buster bump), §A.13.46 (content-locale-direct SEO), §20.10 (national-framework localization), [[feedback-activity-i18n-fanout-gender-anchor]] memory file.

#### A.13.55 Mobile-layout audit is mandatory for every activity ship

Activities render in an iframe with `scrolling="no"`, and the activity card is `overflow-x:hidden` — so ANY content wider than the iframe is **clipped/cut off** (the recurring "broken on Galaxy" class; same failure mode as the homepage embed §A.10/Galaxy fix). Pre-existing QA only checked a single 375px width on a handful of activities, so narrow-Android widths (≤360) kept slipping through.

**The gate — `scripts/audit-activity-mobile.js`** (Node + puppeteer at repo root). Enumerates EVERY activity from `frontend/public/mini-tools/*-activities.json`, loads each real `/<locale>/activities/<slug>/` page, and measures geometry INSIDE the iframe across widths **280, 320, 360, 375, 390, 412, 430, 768** (realistic per-width device heights so `vh` sizing is faithful) in **empty + best-effort-filled** states. **Hard-fail** (gate): horizontal overflow/clip (`scrollWidth>clientWidth` OR any element `right>iframe width`), off-screen interactive control, vertical content clip, **sibling-box overlap** (two boxes in a group — keypad keys, tiles, cards, cells, add-buttons — overlapping each other by >2px on both axes; catches the keypad-keys-spill-into-neighbours class where the grid fits the iframe but fixed-width keys overlap internally), console/page error (LIVE only — localhost dev console noise is auto-ignored). **Soft warn** (eyeball signal, not a fail): tap target <36px, empty band >150px below the card. Emits `docs/audit-results/mobile/mobile-activity-audit.{json,md}` + screenshots at 360/412/768. Flags: `--base` (default LIVE; `=http://localhost:3000` for local verify), `--activities=<id-substr>`, `--locales`, `--widths`, `--concurrency`. npm: `npm run audit:activity-mobile`.

**MANDATORY before shipping any new/changed activity** (this is the standing rule — do not re-litigate per activity, and do not rely on "tests pass + HTTP 200" per §20.4):
1. Local-verify during fixes (`--base=http://localhost:3000 --activities=<id>`; start dev per §14.5 sitemap rename). The harness sets `setCacheEnabled(false)`.
2. Reach **0 hard fails at every width, both states**, AND eyeball the screenshots (§A.13.43 — tests pass ≠ visual approval).
3. Bump cache-busters (§A.13.42): `lcs-shell.css?v=` in all 9 wrappers if the shell changed; the engine `*-core.js?v=` in its wrapper(s) if the engine changed; `ACTIVITY_WRAPPER_VERSION` in `frontend/app/[locale]/activities/[slug]/page.tsx`.
4. Edit source under **`mini tools/`** (git-tracked). `frontend/public/mini-tools/` is the gitignored local-dev mirror (server symlink → `/var/www/lcs-media/mini-tools/`). On Hetzner after push: `git pull` → `cp "mini tools"/*.css "mini tools"/*.js "mini tools"/*.html /var/www/lcs-media/mini-tools/ && chown lcs-media:lcs-media /var/www/lcs-media/mini-tools/*` (files are NOT chattr+i — plain cp; `deploy.sh` does NOT sync mini-tools, it only verifies the symlink) → `bash deploy.sh` (rebuilds the Next app for page.tsx/ACTIVITY_WRAPPER_VERSION).
5. Re-run the harness against **LIVE** → all-PASS (Cloudflare 5-min TTL §15.8; the `?v` bumps + the harness `?_=` page query bust the edge).

**Empirical anchor (2026-06-02, commit `64f21f7e`):** the first full sweep of all 33 activities found **27 hard fails + a systemic empty-band**; root causes were the iframe `min-height:85vh` (page.tsx) exceeding the card's `min-height:66.67vh` (~28% blank band), place-value fixed-width trays overflowing at ≤320px, and ten-frame chrome controls + single-frame cells overflowing at 280px. Fixes (lcs-shell.css mobile `min-height:0`+`flex-wrap` controls, page.tsx iframe mobile floor 85vh→360px, place-value ≤359 shrink + tray-tighten + 38px button tap-height, ten-frame ≤339 single-cell shrink) → **376/376 pass**. Cross-refs: §A.13.47 (activity CSS pitfalls), §A.13.42 (cache-busters), §A.13.43 (textContent/screenshot verification), §20.4 (approval cadence), §21.4 (verification table), [[feedback-activity-mobile-qa-standard]] memory.

#### A.13.56 Activity i18n fan-out — 3-agent native ensemble + the fixed-token-apposition rule

Extends §A.13.48 (native-ensemble recreation) and §A.13.54 (activity-layer i18n fan-out). Locked from the E2 "Sort and Count" (K.MD.B.3) 11-locale fan-out (2026-06-03; EN `c6db46f5` → NO `60927c7a`).

1. **A fixed-nominative i18n token used as an inline apposition is locale-dependent grammar.** A shared token like `{strand}` (renders a FIXED nominative — `localizeStrand` → "Mätning och data" etc., never inflected) sits cleanly as an apposition after a head noun in Germanic/Romance: "im Bereich {strand}" (de), "dans le domaine {strand}" (fr), "en el área {strand}" (es), "nell'ambito {strand}" (it), "no eixo {strand}" (pt), "binnen het domein {strand}" (nl), "inom området {strand}" (sv), "inden for området {strand}" (da), "innenfor området {strand}" (no). It is **ungrammatical in case-heavy Finnish** — `osa-alueella {strand}` renders "osa-alueella Mittaaminen ja tieto" (locative head + nominative label = wrong). **Fix in case-heavy locales: drop the token and write the area name in the correct inflected form literally** ("mittaamisen ja tiedon osa-alueella"). The single-agent draft asserted this was a valid apposition; only the native LINGUIST in the ensemble caught it. Apply the same scrutiny to any future case-heavy locale (Uralic, Baltic, Slavic) for any fixed-nominative token dropped into a case-marked slot.

2. **Ensemble discipline.** Per locale: 3-agent native ensemble (linguist + K-3 educator + B2C/SEO marketing) → synthesize (linguist is authority on grammar; surface divergences) → apply native corrections → commit → publish → verify → core byte-identity sweep → next. **Ship-on-ensemble-clear**; surface to the operator via AskUserQuestion only on a genuine register/word-choice/strategy fork (not routine APPROVEs). **Strict one-at-a-time, authorship-inclusive** — no look-ahead authoring; never hold accumulated uncommitted shared-wrapper edits across locales (a shared-layer touch could silently move a live locale; the 0-line bar depends on never being in that state). **Use `general-purpose` agents for the ensemble, NOT `Explore`** — Explore agents intermittently refuse creative authoring ("I'm a read-only code explorer"); the linguist role tolerated it but educator/marketing balked.

3. **Recurring ensemble catches** (build these into the per-locale specs to get it right first time): meta-description (`page_intro`) must be **≤~165 chars** or it truncates in mobile SERPs — a per-locale length check (fr/es first drafts ran 220/206 → tightened to ~150); neutral aria nouns (`labelObjects`) should use the locale's **"pictures" word for K-3 picture-tiles** (fr `images`, sv/no `bilder`, da `billeder`), not the clinical "objects" word; guard against **register-bleed from the sibling activity's reference block** (the es `about` draft copied compare-length's "comparar"); for a multi-gender category set, prefer **per-category FULL prompt strings** over a `{noun}` template (es/pt gendered cuántos/cuántas, fr elision, fi partitive) so each is authored correct with no fragile inflection.

4. **0-core-line activity-layer patterns** (the 3 cores + lcs-shell.* + Direction A CSS stayed byte-identical across EN base + all 10 fan-out commits, git-proven): a **flag-guarded `render()` override in the wrapper** swaps the homogeneous core subject-group img srcs to a heterogeneous pile (runs synchronously right after core render — no rAF; no-op when the per-task flag is unset); **per-category prompt-key dispatch** (`promptCount<Category>`); and **`activity-content.ts prose[id]` accepting a full StrandTemplate object** (overrides all four sections) when the byStrand prose is wrong-flavoured for a sibling sharing the same strand (MD's byStrand is length-specific from compare-length). One fold: `'Measurement & Data'` added to `EN_STRAND_NAMES` in `scripts/audit-activity-pages.js`.

Cross-refs: §A.13.48, §A.13.54, §A.13.55, §20.10; [[project-activities-live-inventory]].

#### A.13.57 Syllabifier reviewer-dispute triage vs the multi-source gate

When a native reviewer disputes a rule-syllabifier's split (the recurring outcome of any per-locale syllable fan-out), do NOT assume it's an engine bug to fix. Triage it against the gate's OTHER independent sources first — this is a one-read decision, not a per-word stop-and-rule round-trip.

A syllabifier reviewer-dispute is only a **gate-viable rule fix** when **(a)** the gate's other independent sources already agree with the reviewer (e.g. pt `ss`/`rr`: TeX + vocab-phonics already give the correct split), **AND (b)** the change is **count-preserving** (`gi-ra-ssol` and `gi-ras-sol` are both 3 syllables). When both hold, fixing the rule makes it agree with the sources that were already right, and re-gating lands clean (zero new quarantine).

- **If TeX backs the current split**, it's USUALLY a **convention difference, not a defect** — leave it. The reviewer's preference is a valid alternative the gate doesn't endorse; flipping the rule makes rule≠TeX → `split_source_disagreement` (`gate.js`) → the gate **quarantines** the words rather than fixing them. **EXCEPTION — the Nordic K-literacy sound-out carve-out** (sv `ck`=`klock-a`, muta-cum-liquida `se-bra`, seam `hand-ske`): for a *sound-out* product TeX (typographic line-break) is **wrong-for-purpose**, so the school split wins — implemented as SURGICAL pattern-matched rule-authority within the strict gate (NOT GREEN). See the §A.13.57 Nordic amendment below.
- **If the contested split requires a syllable-COUNT change**, the read-only `vocabulary-phonics.json` (§10.3, never edited without approval) carries the **same** count, so a rule-only fix makes rule≠vocab-phonics → the gate **quarantines** the word instead of fixing it. Defer to an explicit, operator-approved vocab-phonics correction. (pt-hiatus `frio→fri-o` / `melancia→me-lan-ci-a`; fi `lumiukko→lu-mi-uk-ko`.)
- **Never override the multi-source gate for a convention preference** — that breaks the very invariant that caught the real bug. The gate quarantining a "fixed" word is the safety mechanism working, not a failure.

Practical triage: drive `sources/hyphenation.js` (TeX) + check `vocabulary-phonics.json` counts for the disputed words BEFORE touching the rule; the answer tells you fix-now / leave-as-convention / defer-to-protected-edit without any code change. Empirical: PT `ss`/`rr` was the one gate-viable fix of three disputes (`fed6838b`); pt-hiatus/fi-seam (vocab-phonics-backed count change) were correctly deferred to §10.3 edits; **sv was initially left as "TeX-backed convention" but is now the Nordic school-convention carve-out (amendment below) — for a SOUND-OUT product TeX is wrong-for-purpose, a distinct case from a mere reviewer convention-preference.** Cross-refs: §A.13.44 (snapshot before re-gate), §A.13.52 (no.js abstention), §20.7 (gate source stack), `gate.js` (`split_source_disagreement` + `isRegisteredSchoolDivergence`).

**[AMENDMENT — Nordic K-literacy school-convention carve-out (sv pilot, 2026-06-04)]**

The "TeX-backed = leave it" rule has a CARVE-OUT for the Nordic K-literacy **sound-out** product (klappa stavelser / Lgr22 ljudmetoden), where the SCHOOL split is task-correct and TeX (avstavning / typographic line-break) is **wrong-for-purpose** where they diverge:
- **TeX-backed AND task-appropriate** → leave it (typographic split that also matches the sound-out; any non-Nordic locale).
- **TeX-backed BUT wrong-for-purpose** (Nordic sound-out: ck, muta-cum-liquida, morpheme seam, short-vowel) → the school split wins.

**Mechanism — SURGICAL, NOT GREEN.** Implemented as pattern-matched rule-authority WITHIN the strict multi-source gate, NOT by moving the locale to GREEN. Full GREEN was REJECTED for sv: it globally relaxes `split_source_disagreement` for ALL words, admitting ~192 previously-quarantined words — including ~14 compound-seam rule ERRORS (`bus-schauf-för`, `juls-trum-pa`, `pås-klil-ja`) the strict gate was correctly catching — breaching the locked safety invariant. Instead, `gate.js isRegisteredSchoolDivergence()` + the per-locale `SCHOOL_DIVERGENCE` config accept the rule's split over a disagreeing TeX ONLY for the registered patterns; every OTHER rule≠TeX disagreement still quarantines. **Accepted divergences still pass FULL multi-source agreement** — the count sources (S/N/W) independently verify the syllable count; only the BOUNDARY comes from the reviewer-validated rule. No relaxation.

**Registered divergence patterns (portable per-locale; no/da inherit this corrected spec):**
- **ck-coda** (PATTERN, always safe, any word): ck is a single /k/ coda unit; TeX splits c|k, school keeps it whole (`kloc-ka` → `klock-a`).
- **muta-cum-liquida onset** (reviewer-validated word allowlist): a STOP+liquid stays as the next onset (`se-bra`, `mus-kler`). **Corrected class definition — the literal "add stop+liquid" spec was too blunt and regressed 13 words; the portable rule is:**
  - **stop+liquid ONLY** — `v` is a FRICATIVE not a stop → EXCLUDED (`hav-re` NOT `ha-vre`); `fl`/`fr` kept (conventional onsets).
  - **geminate-onset kept whole** — a doubled consonant before the liquid is NOT a muta onset (`äpp-le` NOT `äp-ple`; `ugg-la`, `toff-lor`).
  - **ng-coda kept whole** — /ŋ/ before a liquid is a coda (`kring-la` NOT `krin-gla`; `häng-lås`).
  - **vowel length matters** — open-syllable muta holds only after a LONG vowel; a SHORT vowel closes on the stop (`käg-la` NOT `kä-gla`; native-reviewer SETTLED).
  - a consonant-before-stop muta (`mus-kler`, s+kl) is phonotactically INDISTINGUISHABLE from a compound-seam rule error (`pås-klil-ja`, also s+kl), so muta is an EXPLICIT reviewer-validated allowlist, NOT a blind pattern (a pattern would admit the errors).
- **registered seams + short-vowel exceptions** (per-word rule overrides): `hand-ske` (seam); `käg-la` (short-vowel, `SHORT_VOWEL_MUTA_EXCEPTIONS`); `påsk-lil-ja` (seam restoring the split the muta change would regress).

**Backlog — INVESTIGATED + PARTIALLY CLOSED (2026-06-04 seam-recovery commission).** The rule's compound-seam UNDER-GRAB (`busschaufför`→`bus-schauf-för`, `julstrumpa`→`juls-trum-pa`, `blåskrika`, `höstack`, …) was root-caused: it is **ONE mechanism** (`sv.js`'s compound layer can't locate the seam, so the phonotactic layer leaks a stem-internal rule — s-closes-preceding / `sch`-trigraph / `ss`-collapse — across it). Split each word at its true seam first and every one is correct. **Crucially, seam location is INHERENTLY LEXICAL, not rule-tractable** — the `muskler` (`mus-kler`, monomorphemic) vs `påsklilja` (`påsk‖lilja`, a real seam) `V s k l V` ambiguity, plus the unpredictable linking-`s` (`havs`+`snäcka`→`havssnäcka`), proves no phonotactic rule can separate a stem-internal cluster from a seam without a free-morpheme dictionary. So a "root rule fix" does not exist; the only safety-compatible fix is the surgical exact-match per-word override (`SCHOOL_COMPOUND_SEAMS` + gate `mutaSeamWords` — the `handske` mechanism), because over-matching ships a wrong split (forbidden) while the exact-match override's only failure mode is leaving a correct word quarantined (acceptable). Lexicon expansion (`MORPHEME_SUFFIXES`) was REJECTED (unbounded substring over-match — `hav`/`jul`/`sko`; the `maskin`→`ma-skin` mis-fire is the existing instance). A SALDO decompounder is the only *principled* long-term answer but only ever gated behind strict agreement (recover-not-override), not now.

**CORRECTED FRAME (operator-ratified 2026-06-04) — the "seam-fix as GREEN prerequisite" framing was WRONG and is RETIRED.** Because seam detection is inherently lexical and PERMANENTLY incomplete, fixing the known seam errors does NOT make GREEN safe: GREEN trusts the rule's split *wholesale* on count-agreement, so it would auto-publish wrong seam splits for the unverified remainder of the +192 admission set AND for all future corpus additions. The correct policy is **strict gate + surgical per-word recovery, NEVER wholesale R-authority (never GREEN for Nordic)** — the carve-out's entire safety value is that it never trusts the rule wholesale. The ~178 typographically-divergent-but-correct words are a SEPARATE optional incremental `mutaSeamWords`/registered-divergence enumeration, NOT a GREEN candidate; with an ample pool they stay quarantined as the right call. The seam fix and GREEN are decoupled.

**Seam-recovery shipped (2026-06-04, `[NSR-FLAG][sv]`):** **8 words** surgically recovered (sv pool 984→993 entries; +8 unique words, `julstrumpa` double-keyed `christmas-stocking`+`stocking`): Class-1 `havssköldpadda` (TeX already correct, sv.js-only); Class-3 `havssnäcka` (differs from TeX only by `ck` → `codaDigraphs` auto-accept, sv.js-only); Class-2 `julstrumpa`/`blåskrika`/`höstack`/`ljusslingor`/`sjukhusarmband`/`förlängningssladd` (TeX also wrong → sv.js override + gate `mutaSeamWords` entry). All count-guarded (N/S back the school count); native-sv-reviewed (0 split disputes). Anti-regression locked in `sv-seam-recovery.test.js` (`muskler`/`påsklilja`/`fiska`/`borste` untouched). **3 deliberate drops:** `busschaufför` (not a sv corpus member); `skridskoåkning` (vocab-phonics `S=3` backs the wrong count vs school 4 → count-mismatch quarantine; needs a separate §10.3 `syl` 3→4 correction); `samtalshjärta` (split correct but the WORD is an English Valentine-candy calque `conversation-heart`, not natural K-3 Swedish — native-sv flagged; filed as a separate §A.7 cross-locale calque-scan backlog, sv/de/fr). The residual seam errors beyond these 8 (and the ~178 typographic-divergence words) stay quarantined as acceptable — NOT a GREEN trigger.

**Empirical (sv pilot, 2026-06-04):** `policial.pt` 3→4 (`po-li-ci-al`; pt 890→891). sv pool **964 → 984**: the 36-class school re-splits (23 ck + 11 muta + `hand-ske`, all native-reviewer-confirmed) stay in place (count-preserving); **+20 words RECOVERED via the muta-cum-liquida rule CORRECTION at full strict R==T agreement** (`ci-tron`, `ko-li-bri`, `fo-to-graf`, … — the rule got more correct and the gate did its normal job; **NOT gate relaxation** — distinct from the rejected GREEN +192). 0 wrong splits admitted; the ~14 seam errors stay quarantined. 12 sv `vocabulary-phonics.json` `syl` entries added (§10.3: `mamma`=2/`pappa`=2/`bror`=1/`gå`=1/…) to hold the count under the carve-out. Live sv deck (`bygg-ordet-av-stavelser`): `klocka` `kloc-ka`→`klock-a` (the only affected deck word). **sv-only; no/da unchanged this commit.** `de`/`nl`/`no`/`sv.js` were already untracked working-tree files (only es/fi/fr/it/pt rule-syllabifiers are git-tracked) — this commit ADDS `sv.js`; the others remain untracked (out of scope).

**[no FAN-OUT 2026-06-04] Norwegian — NO carve-out needed; `no.js` tracked.** Native-no (Bokmål / lydmetoden, LK20) reviewer ruled `no.js` is **ALREADY school-correct** — it agrees with TeX on 100% of its 829-word pool. Decisive determinations (all SETTLED): **Norwegian SPLITS medial geminates** (`klok-ke`, `som-mer`, `syk-kel`) per the explicit pedagogy "del mellom de to like konsonantene" — the **OPPOSITE of sv's ck-coda (`klock-a`); do NOT import it** (sv `ck` is a single-grapheme /kː/ digraph; no spells the geminate `kk` and splits it). ng SPLITS (`en-gel`, not sv's `äng-el` coda). `vr` IS a valid Norwegian onset → `ha-vre` (UNLIKE sv, where `v` was excluded as a fricative → `hav-re`). `hanske` = `hans-ke` (not a live seam, unlike sv `hand-ske`). muta-onset / diphthongs / sj-skj-kj / st all already correct; no short-vowel exceptions. **So `no` gets NO `SCHOOL_DIVERGENCE` entry** (its divergence set is EMPTY; the carve-out never fires for no — verified: synthetic no R≠T still strict-quarantines). The only action was **git-tracking `no.js`** (it was untracked like sv.js — only es/fi/fr/it/pt tracked; the rule file MUST land in the commit). Pool unchanged 829→829; 0 rule/config/deck/vocab change. **Refines the portable framing: the carve-out MECHANISM is portable, but each locale's divergence set is empirically reviewer-determined — sv's is {ck-coda, muta allowlist, seams, short-vowel}; no's is ∅; ng and the geminate convention are per-locale OPPOSITE between sv and no.** **da — DELIBERATE DETERMINATION (no `da.js`):** Danish has no rule syllabifier (prior operator decision; only `da-quarantine.js` Q-decoration + `da-grapheme-phoneme.json` + the policy doc). The carve-out compares TeX vs the rule's split, so with no rule there is nothing to carve out — da's deck (`byg-ordet-af-stavelser`, 28 words) ships on **TeX-aligned splits accepted as-is** (the strict gate uses T with no R). Recorded as a **deliberate determination, not an oversight**: da is TeX-accepted; building a `da.js` would be a separate structural project (carrying the policy-managed/stød complexity of §20.7), not commissioned.

**[Rule-file git-tracking — standing flag.]** `sv.js` + `no.js` were UNTRACKED working-tree files until this Nordic arc git-tracked them (only `es/fi/fr/it/pt` were tracked before). `de.js` + `nl.js` remain **UNTRACKED**, and `da.js` is **ABSENT** (per above). **Future flag: any commit touching a rule-syllabifier MUST `git add` it** — an untracked rule file is one `git checkout`/clean away from losing an edit the way `sv.js` nearly did. (`gate.js` + `vocabulary-phonics.json` ARE tracked. The `approved-words-<locale>.json` pools are git-tracked ONLY for **es/fi/fr/it/pt/sv**; **de/nl/da/no pools are UNTRACKED** working-tree files (`en` has none). **Consequence:** a commission editing a de/nl/da/no pool MUST confirm `git ls-files` shows it staged, or the change lives only on disk and is lost — observed directly during the calque arc's `nl` re-gate. NB: da HAS a pool (untracked) but no rule-syllabifier per the determination above — the two are distinct.)

**[Oral-vs-written / typographic-vs-sound-out — known-deferred through-line.]** The syllable engine's "deepen on the proven method" repeatedly meets the same fault line: a locale's *established* split convention vs the *oral sound-out* convention the activity's clapping pedagogy actually uses. **sv RESOLVED** (school-convention carve-out over TeX-typographic); **fr FLAGGED** (the shipped *syllabes écrites* convention counts the final mute-e, but CP oral-clapping does not — filed for a separate fr-convention review, §20.9); **da TeX-ACCEPTED**. Not every locale's established convention has been audited against the oral-clapping pedagogy. A deliberate **cross-locale oral-syllable-pedagogy convention audit** is a candidate standalone initiative — recorded here as known, deliberately-deferred territory so a future session reads it as a decision, not an oversight.

#### A.13.58 Catalog-wide / cross-locale data-quality fixes: the layered-gate stack + per-locale gender authority

Doctrine from the Nordic gender-code arc (2026-06, **242 corrections** across sv/da/no, 7 commits `c8c16d11`→`cedb564e`) + the conversation-heart calque scan (9 locales). For any **catalog-wide or cross-locale data-quality fix** to a canonical multi-locale data file (`REFERENCE TRANSLATIONS/image-vocabulary.js` §6 is the type case — gender/plural codes; applies to any head-noun-keyed or per-locale-validated correction), agent/audit output is a **baseline, not a complete list**. Run the gate stack in order; **each layer catches what the prior structurally cannot**:

1. **Same-head-noun consistency sweep.** For any defect keyed on a head noun (gender code, plural class, …), sweep the FULL vocabulary for every entry sharing a flagged head noun — not just the audit's hits. (Caught **+41** across the Nordic arc that the native-agent audits missed; da's audit alone was ~38% incomplete.)
2. **Dictionary-plural re-verify.** When a fix can drag a plural (a gender change usually does), verify every affected plural against a dictionary source — INCLUDING already-approved ones; a first-pass plural can be wrong even after native sign-off. (Empirical: da `Strygebrætter`→`Strygebrædder`; `Videnskab`→`Videnskaber`.)
3. **Cross-locale probe (backstop).** The same-head-noun sweep is itself bounded by its head-noun list; the probe — "is concept X, fixed in locale A, consistent in B and C per each locale's own convention?" — catches what the sweep's list missed. (Caught **+20**, incl. `badge`, which a hand-narrowed candidate set had dismissed.)
4. **Exhaustive native confirm of the bounded set — never a hand-picked subset.** Eyeball-narrowing the candidates reintroduces the hole one layer up: confirm EVERY common-coded (or every flagged) entry in the bounded set, not the ones that "look" wrong. (Two misfires proved it: `padlock` wrongly INCLUDED via cross-apply intuition; the 23-candidate filter that DISMISSED `badge`.)

**Per-locale gender authority (never cross-apply a code).** Each locale's gender code resolves against **its own base-noun convention**; a code is never copied across locales even for the identical concept. Conventions, explicit: **sv/da `t`=neuter, `n`=common; no `n`=neuter, `m`=common; de `m`/`f`/`n`=der/die/das (3-gender); nl `d`=de/common, `h`=het/neuter (2-gender)** (no is 2-gender — feminine collapsed into masculine; the legacy `f` code is retired to `m` per the standardization ruling). Note the **code-letter inversion**: no `n`=neuter vs sv/da `t`=neuter. Canonical divergence proofs (same concept, gender differs per locale, so the code MUST differ): **`lås`/padlock is COMMON in da/no but NEUTER in sv** (the false-alarm that proved the rule — do not infer da/no from sv); `bräda`/board, `toalett`/toilet, `handled`/wrist are common in sv where the da/no cognates are neuter; `-gram` borrowings are neuter across the set (sv `ett parallellogram`). **DE↔NL non-cross-apply proof: `rectangle` = `das Rechteck` (de=`n`/neuter) but `de rechthoek` (nl=`d`/common) — same shape, opposite gender systems (3-gender vs 2-gender).** Resolving every entry against its own locale — never propagating one locale's reading into another — is what kept the arc from "fixing" correct entries into errors.

**Mechanics that held throughout:** `image-vocabulary.js`-only (gender lives ONLY there — DB/raw-mirrors/seed/phonics carry no gender → no DB/seed/re-gate); per-key node rewrite targeting only the changed locale field; scripted per-line diff discipline asserting exactly-N keys changed, only the intended locale field, every other locale byte-identical, no cross-applied code.

**DE+NL doctrine extensions (2026-06):**
- **Commit-shape tracks defect-DIRECTION-family, not size.** When a locale's gender defects span multiple error-directions, split commits by direction (each a homogeneous "is this X, not Y?" re-confirm question), not by size. DE → 3 commits (default-to-m wave / masculine-coded-f reverse / scatter residual); NL → 2 (d→het wave / het→d reverse). A 2-entry off-direction residual ships as its OWN explicit "third-direction residual" micro-commit — never buried in a wave (muddies its homogeneous re-confirm) nor fabricated into a fake family.
- **Held-as-carry-forward classes (never auto-fixed inside a gender pass):** (a) genuine der/das or de/het **twijfel** (DE golf, NL sports); (b) **lemma-defect-not-gender** (DE pretzels: singular field holds a plural + duplicates `pretzel` → needs a lemma rebuild, not a gender flip); (c) **plural-does-more** — a plural correction beyond what the gender requires (irregular -eren / umlaut / geminate spelling / different-lemma / mass-noun) → ship gender, HOLD + flag the plural. Only plain same-lemma plural fixes ride on the gender line.
- **Homonym vigilance before flipping a gender:** confirm the intended sense IS the one being flipped. het pad=path vs de pad=toad (trail flipped to het; the separate `toad` key correctly stayed de); het bot=bone vs de bot=flounder; het vest=cardigan vs de vest=moat.
- **The same-head-noun sweep catches misses in BOTH directions AND refuses suffix-collision false-matches:** DE wave +3 das-neuters via `-seil`/`-skop` (Springseil/Mikroskop/Teleskop) while rejecting der Verband/Bruder/Speck/Flugbegleiter; NL confirmed `het trapezium` stays het while the `-hoek` shapes are de.

**Arc status (2026-06):** **three closed** — calque scan (9 locales) + Nordic gender-code (242, sv/da/no, `c8c16d11`→`cedb564e`) + **DE+NL gender-code (136 corrections, 5 commits: DE 58 `7bef6173`+`3735199c`+`7aa69cde` three-directional; NL 78 `5310b329`+`c7de1a40` two-directional — full neuter-bearing-locale discharge; see `[[project-de-nl-gender-audit-complete]]`)**. Live carry-forward (NOT in flight): (1) deploy `.next/standalone` rm-race permanent root-cause fix; (2) standalone-plural / vocab-key sweep (distinct defect class — sneaker plural, lights-singular, the `juniper-tree`/enebær vocab-key semantic mismatch where the key names a berry not a tree); (3) flagged-contestable held as-is (dino-genus deinonychus/parasaurolophus, planet mercury, hemlock-tree, librarian, bull, lemur, sv bacon/badminton/basketball; **DE golf-twijfel + pretzels-lemma + driftwood/diamond/grasshopper does-more plurals + diamond rhombus/gem art-Q; NL sports-twijfel + tape/apron/plesiosaurus/grapefruit + 8 does-more plurals**).

#### A.13.59 Recognition-standard activity + two-sentence anchor+comparison per-locale fan-out

Doctrine from the E14 fractions series (#1 1.G.A.3 + #2 2.G.A.3 non-congruence, both 11/11 LIVE on the E2 choice-board engine; #2 fan-out `fee21a3b`→`c2bb562c`). Extends §A.13.48 (native-ensemble recreation) / §A.13.53 (cognate-aware verify) / §A.13.54 (gender-anchor fan-out) / §A.13.56 (3-agent ensemble) / §20.10 (national-framework localization). Full record: [[project-e14-fractions-series]].

1. **Claim a multi-clause CC standard via its RECOGNITION clause on a 0-core engine; defer the active-verb clause.** A standard whose text has multiple clauses (e.g. 2.G.A.3 = "partition … AND recognize that equal shares need not have the same shape") can be honestly claimed by instantiating its **recognition** clause on an existing 0-core engine (E2 choice-board) — the child *recognizes*, never performs the active verb. The active-verb facet becomes a deferred future activity with a new core (E14 #3 tap-to-partition → `fractions-core.js`). Per §A.13.X scope-of-claim: the activity must INSTANTIATE the clause it claims; the prompt's count-phrase stays cardinal+"equal parts" and an explicit **guardrail** ("the child does NOT divide, but recognizes…") fences the scope; 0 active-partition-verb at the child.

2. **The two-sentence anchor+comparison construction has a per-locale grammar-trap taxonomy** — validate each locale with a native ensemble before it ships. Construction = anchor declarative ("This shape is split into N equal parts.") + instruction ("Tap another shape that is ALSO split into N equal parts."), reusing the locale's #1 share-verb. The load-bearing per-locale traps (each ruled by the linguist): the **also-adverb** scope+placement (FI myös / DE auch-before-predicate / FR aussi-after-conjugated-verb / ES también-before-verb-phrase / IT anche-between-è-and-participle / PT também / NL ook / SV+DA+NO subordinate-adverb-before-finite-verb i.e. SV BIFF); the **relativizer** (DA der+comma vs SV/NO/most som/que/che/die, NO/SV no-comma); **definiteness** (DA single "Denne form" vs NO double "Denne formen" — the mirror); **elision** (IT un'altra); **preposition** (PT "Toque em" indefinite, no contraction); **gender/agreement** (feminine participle; en-word "another"); **V2 vs verb-final** (NL anchor V2 / relative "verdeeld is"). The new fraction noun (thirds: tiers/Drittel/terços/tredjedele…) is PROSE-only.

3. **§20.10 framework-name + content-vs-discovery split, applied per-locale.** Prose cites the national framework NAME only (never "Common Core"/CCSS code in prose; the code is retained ONLY as JSON-LD `targetName` + chip + `/standards/<code>`). The **content-vs-discovery split**: the educator's pedagogical term in prose+prompt, the shorter generic SEO term in title/intro/slug — **normalize the discovery term across a locale cluster** for consistency (e.g. SV "lika delar"/DA "lige dele"/NO "like deler" in slug+title even when prose uses "…stora/store delar/dele/deler"); the size/concept signal rides in the title phrase, not duplicated into the slug. Match each locale's #1 title-case + tail structure. hreflang on BOTH the head `<link>` chain AND the body anchor strip (pt→pt-BR via `getHreflangCode`, `fda70f19`).

4. **Multi-sibling full-phrase cognate clearance (Scandinavian).** When ≥2 near-cognate locales are live, each one's verify FORBIDS the OTHERS' **full anchor phrases, never bare tokens** — real substring trap **Tryk(DA) ⊂ Trykk(NO)** (and ⊃-family with SV Tryck), near-twins lika/lige/like, stora/store, här/her, delad/delt, annan/anden/annen (anden(DA) also = "the duck/spirit"). The base locale (SV) registers its distinct anchors; each subsequent sibling clears ALL prior ones (DA cleared SV; NO cleared BOTH SV+DA — live-verified 0 each). Distinguishers are whole-phrase (relativizer + definiteness + spelling), since bare tokens (delt/også/er/form) are shared.

Verify per locale: `node scripts/audit-activity-mobile.js` 8/8 (§A.13.55) + rendered hreflang chain (12 = 11+x-default) on head AND body strip + 3-viewport screenshots + 0-protected-core git diff + the §20.10 leak grep (no CCSS code / no "motsvarar"-as-citation in prose; the on-page machine-anchor code occurrences are expected). The 0-line protected-core bar (the 5 cores) held git-definitive across all 11 E14 #2 commits.

