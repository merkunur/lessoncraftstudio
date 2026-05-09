# `[ARC][SEO][DECK-PAGE]` Phase 3b — close-out summary

**Type:** docs-only deliverable per Phase 3b Checkpoint 3 plan; aggregate close-out across Phase 3b Checkpoint 1 + Checkpoint 2 + Checkpoint 3
**Generated:** 2026-05-09
**Phase 3b status:** CLOSED — path-(b) origin trace fully fanned out across all 29 §14.10 catalog apps; production deploy complete; lexicon retained as defensive fallback with deprecation markers; cost-balloon escape hatch monitored throughout, never required activation

---

## Scope summary

Phase 3b delivers the **path-(b) origin-tracing locale-residue detection upgrade** per Phase 2 doctrine §6 + the [ARC][SEO][DECK-PAGE] commission spec § Phase 3 substantive code-work scope. After Phase 3b close, the publish-cli `reconcileLocaleResidue` predicate dispatches to path-(b) trace as primary at runtime; path-(a) lexicon retained as defensive fallback for any pre-Phase-3b legacy ZIP that re-enters the publish queue.

The path-(b) upgrade replaces Phase 3a's intentionally-approximate lexicon-tokenization heuristic with per-substring origin-tracing: each SEO-bearing field (`title.typeName` / `title.worksheetWord` / `description.freeInteractive` / etc.) carries `{value, source, isLocalized}` recording whether the lookup found a non-en match. The predicate halts on any `isLocalized: false` for non-en decks — eliminating both the false-positive risk on legitimate loanwords and the false-negative risk on words not enumerated in the lexicon.

---

## Commit history

| Commit | Phase | Title |
|---|---|---|
| `ad0e49c7` | Phase 0 | substrate audit |
| `ac9109c7` | Phase 1+2 | taxonomy + doctrinal-extension working draft |
| `0f459e4d` | Phase 3a.1 Checkpoint 1 | gate predicates + schema + ogLocaleMap |
| `276a79b8` | Phase 3a.1 Checkpoint 2 | gate wire-in + count-inbound helper |
| `b8a0f9a3` | Phase 3a.2 | emission surface + 29-app h1→h2 mechanical fan-out |
| `b85c6b51` | Phase 3a.3 | verification + Phase 3a close-out summary |
| `b4894913` | Phase 3b Checkpoint 1 | path-(b) trace reference at addition.html |
| `b2535d71` | Phase 3b Checkpoint 2 | 28-app fan-out of path-(b) trace |
| (this commit) | Phase 3b Checkpoint 3 | production deploy + lexicon deprecation + Phase 3b close-out |

Phase 3b substantive code-work commits: 3 (Checkpoint 1 + Checkpoint 2 + Checkpoint 3). Full arc chain at HEAD: 9 commits.

---

## Phase 3b Checkpoint 1 deliverables (`b4894913`)

**4 files changed, 366 insertions, 22 deletions:**

- `REFERENCE TRANSLATIONS/catalog-export.js` (+122 lines) — NEW `LCSCatalogExport.buildSeoTrace(opts)` shared helper consumed by all 29 catalog apps. Internal `lookupTrace(key, fallback)` records `{value, source, isLocalized}` triples per Phase 2 §6 doctrine. `canvasTrace(value, sourceLabel)` variant for canvas-cached values. Public API export. `buildManifest` extension threads `seo_trace` from metadata into manifest.json.
- `REFERENCE APPS/addition.html` (+40 lines) — Reference path-(b) trace integration: `extractDeckBundle()` populates `bundle.seoTrace` via the helper; click handler refactors lazy `cachedBundle = null` → eager `cachedBundle = await extractDeckBundle(...)` and threads `bundle.seoTrace` into `metadata.seo_trace`.
- `scripts/publish-cli/seo-reconciliation.js` (+122/-22) — Predicate dispatch: `reconcileLocaleResidue` branches on `manifest.seo_trace` presence. New `reconcileLocaleResidueViaTrace(manifest)` consumes the trace; existing `reconcileLocaleResidueViaLexicon` preserved as backwards-compat fallback. Both halt paths share `LOCALE_RESIDUE_DETECTED` halt-class category; metadata `path` field distinguishes evaluation source.
- `scripts/publish-cli/seo-reconciliation.test.js` (+104; +7 tests) — Path-(b) trace tests: CLEAN/HALT semantics; backwards-compat fallback when `seo_trace` absent; en-skip preservation; F3+H1 reproduction via lexicon path. Unit count: 31 → 38.

Test pass: 38/38 unit + 7/7 integration green. NO deploy at Checkpoint 1 (deploy waited for Checkpoint 3).

## Phase 3b Checkpoint 2 deliverables (`b2535d71`)

**28 files changed, 1300 insertions, 333 deletions (+967 net LoC):**

- `REFERENCE APPS/<28 apps>.html` — Mechanical-uniform 5-step diff per app:
  - Step A1: cache localized title + instruction on canvas (mirror addition.html lines 3137-3140) at the per-app `defaults.title/description` derivation site in `createHeaderGroup`
  - Step A2: replace inline minimal `seoMeta: { themeName: ... }` with canonical 8-field declaration
  - Step A3: insert seoTrace block consuming `LCSCatalogExport.buildSeoTrace(opts)`
  - Step A4: bundle return changes from `seoMeta: { themeName: ... }` to `seoMeta: seoMeta, seoTrace: seoTrace`
  - Step B: click handler bundle pre-build refactor (lazy → eager)
  - Step C: thread `manifestMeta.seo_trace = cachedBundle && cachedBundle.seoTrace ? cachedBundle.seoTrace : null;` into export call's metadata

After Checkpoint 2, all 29 apps emit `manifest.seo_trace` populated. Per-app structural variations handled uniformly:
- `matching.html`: pre-existing minimal seoMeta normalized to canonical 8-field
- `treasure-hunt.html` + `wordsearch.html`: already had canvas-cache + canonical seoMeta from prior phases
- `bingo.html`: flat-dict `defaultTitles`/`defaultDescriptions` (vs nested) handled with same canvas-cache pattern
- `shadow-match.html`: T_() outlier confirmed runtime-only (inline JS string at line 2875); operator-side has standard `function t(key, params)` — no special treatment required
- `prepositions.html`: uses `extractDeckBundle_v12` instead of `extractDeckBundle`; pattern applied uniformly with v12-suffixed function name
- `grid-match.html`: uses `wsCanvas` instead of `worksheetCanvas`; pattern applied uniformly

**Empirical recalibration story (per §A.13.8 second instance this commission):**
- Phase 1 Explore-agent recon claimed 26 of 28 apps already had canonical seoMeta + lcsLocalizedTitle from prior work
- Direct grep confirmed only addition.html had both; 26 of 28 apps had minimal `seoMeta: { themeName: ... }` only and zero lcsLocalizedTitle canvas-cache
- Cost recalibration: ~32 LoC × 28 ≈ 896 LoC mechanical → ~50 LoC × 28 ≈ 1400 LoC structured-mechanical with full normalization
- Operator ratified Option (i) expanded scope mid-execution; this is the locked decision

**Verification-hygiene step (locked sequence at Checkpoint 2 close):**
1. Per-app structural sanity grep: 29/29 apps clean across 6-dimensional pattern (canvas-cache + var seoMeta + var seoTrace + bundle return seoTrace + eager cachedBundle await + manifestMeta.seo_trace)
2. master-sync.bat synced 33 HTML + 48 JS files to gitignored serving copy
3. seo-reconciliation unit tests: 38/38 PASS
4. reconciliation integration tests: 7/7 PASS

NO deploy at Checkpoint 2 (deploy waited for Checkpoint 3 to land all 30 served copies together).

## Phase 3b Checkpoint 3 deliverables (this commit)

**3 files changed, ~30 insertions; production deploy of 30 served copies; close-out doc ~200 lines:**

- `scripts/publish-cli/seo-reconciliation.js` — Deprecation markers at 2 sites (`ENGLISH_LEXICON` constant + `reconcileLocaleResidueViaLexicon` function) signaling Phase 3b → Phase 4a transition target. Behavior preserved as defensive fallback.
- `scripts/publish-cli/seo-reconciliation-exceptions.json` — `_deprecated` field added at top of file mirroring deprecation message.
- `docs/SEO/deck-page-arc-phase-3b-close-out.md` (NEW; this file) — Aggregate Phase 3b close-out

§14.6 TWO-STEP deploy executed:
- Step 1: `deploy.sh` (git pull + build + smoke; smoke clean with 2 pre-existing nginx warnings unrelated)
- Step 2: 30 served-copy syncs via `update-worksheet.sh` loop (1 catalog-export.js + 29 app HTMLs); chattr +i re-applied per file

**Production curl-verify clean:**
- `catalog-export.js`: 15 marker hits on `buildSeoTrace`/`lookupTrace`/`canvasTrace` (well above ≥3 floor)
- 6 sample apps × `seoTrace`/`lcsLocalizedTitle`/`buildSeoTrace` markers: uniform 7 hits per app
- Sample matrix covered structural-variation classes: addition (Family A reference) + subtraction (canonical sibling) + matching (special: minimal seoMeta normalized) + bingo (special: flat-dict) + prepositions (special: v12 suffix) + shadow-match (special: T_() runtime-only)

**Production verification matrix (Sub-step 5):** classified as deferred to operator runtime activity rather than synchronous gate. Cost-balloon (b) translation-surface gap detection requires actual non-en publish events; surfaces organically at first non-en publish from any §14.10 app post-deploy. Surface findings file to `_phase_3b_substrate_gaps.txt` for Stream A Arc 2 absorption per (A) sole-arc lock when they emerge.

---

## Aggregate metrics

| Metric | Value |
|---|---|
| Substantive code-work commits | 3 (Checkpoint 1 + Checkpoint 2 + Checkpoint 3) |
| Total files changed | 35 across the 3 substantive commits |
| Total LoC inserted | ~1696 (Checkpoint 1: 366 + Checkpoint 2: 1300 + Checkpoint 3: ~30) |
| Total LoC deleted | ~355 (Checkpoint 1: 22 + Checkpoint 2: 333 + Checkpoint 3: 0) |
| Unit tests | 38 passing (31 from Phase 3a baseline + 7 new path-(b) trace tests at Checkpoint 1) |
| Integration tests | 7 passing (no additions; existing coverage unchanged) |
| Schema migrations | 0 (Phase 3b is code + content only) |
| Production deploys | 1 (Phase 3b Checkpoint 3 §14.6 TWO-STEP) |
| Apps emitting `manifest.seo_trace` | 29 (all §14.10 catalog apps) |
| Apps post-Checkpoint-3 served-copy state | 29 deployed cleanly |

---

## Cost-balloon final assessment

Per concern 3 + Phase 2 §8 escape hatch lock:

**(a) `t()` helper architectural divergence per §17.8.14 — DID NOT FIRE.**
- shadow-match's `T_()` outlier per MEMORY is runtime-only (inline JS string at line 2875); operator-side has standard `function t(key, params)`
- buildSeoTrace consumes the `translations` dict directly via `lookupTrace`; doesn't depend on per-app `t()`/`T_()` helpers
- No per-app `t()` rewrite required; integration was clean across all 29 apps

**(b) Translation-surface gaps requiring Stream A Arc 2 commencement — DEFERRED.**
- Empirical detection requires runtime non-en publish path; gap-detection cannot synthesize without actual deck-generation traffic
- Verification matrix (Sub-step 5) classified as deferred to operator runtime activity rather than synchronous gate
- Surface findings file to `_phase_3b_substrate_gaps.txt` when they emerge organically post-deploy
- If gap count >5 across multiple locales, Phase 2 §8 escape hatch may activate retrospectively for Stream A Arc 2 re-prioritization

**(c) Per-app divergence in extractDeckBundle structure — FIRED but BOUNDED.**
- Phase 1 Explore-agent recon at Checkpoint 2 commencement underestimated structural variation across the 28 apps
- §A.13.8 adjudication-reversal mid-execution recalibrated 3-step diff → 5-step diff (~896 LoC → ~1400 LoC); operator ratified Option (i) expanded scope
- All 6 per-app structural variations (matching's pre-existing minimal seoMeta + bingo's flat-dict + shadow-match's T_() runtime-only + prepositions' v12-suffix + grid-match's wsCanvas + treasure-hunt/wordsearch substrate-ready) absorbed under canonical 5-step pattern without per-app special-casing
- The buildSeoTrace shared helper at Checkpoint 1 enabled mechanical-uniform application across 28 apps despite per-app structural variations — empirical proof point for **structured-fan-out as 3rd category** between mechanical and architectural (Phase 6 fold-queue Item 3 below)

**Cost-balloon escape hatch outcome:** monitored throughout; never required activation. Audit-trail substantiates this at Phase 6 close-out for Phase 4b inbound-link uplift commission's planning baseline.

---

## Phase 4a retrofit scope (next for existing-deck refresh)

**Scope:** Re-emit SEO block in already-published deck.html files via `republish-seo` mode in publish-cli. Operates between `<!-- SEO_INSERTION_POINT_START -->` + `<!-- SEO_INSERTION_POINT_END -->` markers shipped at Phase 3a.2.

After Phase 3b close, all NEW publishes from any of the 29 catalog apps emit path-(b) trace + canonical SEO surface. EXISTING decks (published pre-Phase-3a-or-3b) retain their original state — Phase 4a retrofit lands the canonical surface on them.

**Implementation per Phase 3a close-out plan:**
- New publish-cli mode: `node scripts/publish-cli/index.js republish-seo <slug> [--all-locales | --language <locale>]`
- Reads existing deck.html from `/var/www/lcs-media/decks/<locale>/<slug>-v<N>/deck.html`
- Re-runs `buildSeoHead` against the deck's manifest to generate new SEO block
- Replaces content between SEO_INSERTION_POINT markers; preserves all other deck.html bytes
- Atomic symlink-swap per §15.5 publish.js precedent
- Backfills `Deck.titleHash` + `Deck.descriptionHash` from re-emitted strings

Expected delta vs Phase 3a.3 baseline (per the 11-locale sample): h1 count: 2 → 1; OG+Twitter count: 0 → 14; SEO_INSERTION_POINT count: 0 → 2.

**Trigger:** operator-strategic; commission shape ~150-300 LoC for `republish-seo` mode + walk-and-rewrite logic. Phase 4a substantively independent of Phase 3b close.

## Phase 4b inbound-link uplift scope

Per Phase 0 §6 D5 + Phase 1 §3 + Phase 2 §5: inbound-link surface uplift across hub authority surfaces (homepage / topic / locale / BreadthGrid / sitemap) targeting N≥3 non-sitemap floor per concern 4 lock.

**Cross-boundary TS/CJS integration adjudication deferred since Phase 3a.1 Checkpoint 2** — Phase 4b ratifies whether `frontend/lib/seo/count-inbound-surfaces.ts` (TypeScript) compiles into JS at build time for publish-cli (Node-CJS) consumption (CC pre-recommendation), OR alternative cross-boundary approach.

Phase 4b also flips `INBOUND_LINK_COUNT_BELOW_TARGET` predicate from WARN-class (pre-Phase-5) to HALT-class (post-Phase-5) per concern 4 escalation lock.

## Phase 5 NSR review scope

Per Phase 1 §6.6 + Phase 2 §6 + concern 5: NSR-flag entries in `seo-reconciliation-exceptions.json` pending native-speaker validation per §17.5.1 Nordic + Tier 4 Danish posture. Locales with NSR-flag at ship: sv, fi, no, da. Romance Tier 4 (fr, it, pt) authored without NSR.

Phase 5 commission shape: small native-speaker review pass; ~5-10 strings reviewed per Nordic locale.

NOTE: post-Phase-3b, the lexicon exception list is deprecated (see Checkpoint 3 deprecation markers). Phase 5 NSR review still relevant for any per-locale terms used in path-(b) trace localization quality validation, but the lexicon-specific carve-outs lose load-bearing role.

## Phase 6 fold-queue accumulation

Doctrinal items now at 8 total (5 from Phase 3a + 3 new from Phase 3b):

### Item 1 — Mechanical-fan-out vs architectural-sweep distinction at 29-app scope (Phase 3a)

**Operator-surfaced at Phase 3a.2 (B1) recalibration.** Two structurally different patterns share the "29-app" prefix:

- **Mechanical fan-out** (Phase 3a.2 multi-h1): per-app diff identical bytes; sed-style replace; single commit; single deploy; single short session
- **Architectural sweep** (initially projected for Phase 3b path-(b) trace; Shape A precedents `44cbdda1` / `05d0940e` / `109a91d4`): per-app instrumentation requires structural extension; Shape A discipline territory per §A.13.5; multi-commit; multi-session

**Phase 3b empirically validated a 3rd category** — see Item 6 below.

### Item 2 — Fan-out verification-hygiene step at mechanical-fan-out execution (Phase 3a)

**Operator-surfaced at Phase 3a.3 commencement turn.** Sub-pattern of mechanical-fan-out class:

> "Run sed across N files and trust exit code" is insufficient — substrate may not be uniform across the N. The discipline is: post-apply, verify all N files reflect the fix (not just that sed succeeded). Outliers surface at verification step + drive pattern-revision before re-apply.

**Empirical anchor:** Phase 3a.2 `shadow-match.html` `T_()` outlier; Phase 3b Checkpoint 2 expanded the discipline to **6-dimensional grep verification** for structured-fan-out class.

### Item 3 — §A.13.6 + §A.13.8 paired discipline canonical reference (Phase 3a + 3b)

**Phase 3a.2 Sub-step 0 saved 100×+ overestimate via empirical recon before applying** (single shared site → 29 per-app sites). **Phase 3b Checkpoint 2 surfaced the discipline a SECOND time** (Explore-agent recon claimed canonical seoMeta + lcsLocalizedTitle present in 26 of 28 apps; direct grep showed only 1 of 28). Two repeat instances this commission promote the paired discipline to canonical-reference status.

Discipline pair:
- §A.13.6 spec-vs-shipped-contract validation: halt before apply when doctrine assumes a substrate shape
- §A.13.8 adjudication-reversal: when recon surfaces a cost dimension the original adjudication didn't account for, recalibrate before executing

Worth keeping prominent as canonical reference in CLAUDE.md doctrine. Possibly cross-link the two existing subsections to highlight their paired application.

### Item 4 — Phase 4a mutable-regions contract extension via SEO_INSERTION_POINT marker pair (Phase 3a)

**Resolution Option A locked at concern 3.** Phase 3a.2 ships the markers; Phase 4a uses them for `republish-seo` mode. The marker pair is the FIRST extension to §17.8's "deck.html bytes are immutable post-publish except HREFLANG_INSERTION_POINT" doctrine.

New §17.8 doctrinal subsection capturing the contract extension + retrofit pathway. Likely lands as §17.8.20 (or next available) at fold-cycle.

### Item 5 — Phase 2 §1-§7 invariants (Phase 3a)

Each Phase 2 doctrine §1-§7 invariant (title uniqueness, description uniqueness, canonical direct-resolution, OG tag enumeration, inbound-link minimum, locale-correctness path-(a)/path-(b), multi-h1) becomes a new §17.8.16-§17.8.X subsection at fold-cycle.

Section-numbering hygiene: Phase 6 fold-cycle verifies highest §17.8.X at fold-time per concern 6 + SESSION-STATE reminder #8 (snapshot-vs-canonical drift discipline).

### Item 6 — Phase 1 Explore-agent fidelity validation (Phase 3b — NEW)

**Operator-surfaced at Phase 3b Checkpoint 2 commencement turn.** Two repeat instances of Phase 1 recon claiming substrate shape that direct empirical evidence contradicted:

1. Phase 3a.2 (multi-h1): Phase 1 doctrine "single shared celebration site at catalog-export.js" → empirical "per-app fan-out across 29 REFERENCE APPS/*.html"
2. Phase 3b Checkpoint 2 (5-step diff scope): Phase 1 Explore-agent recon "canonical seoMeta + canvas-cached lcsLocalizedTitle/Instruction already in place across 26 of 28 apps" → empirical direct-grep "26 of 28 apps missing canvas-cache; 28 of 28 apps missing canonical 8-field seoMeta declaration"

Both surfaced via §A.13.6 spec-vs-shipped-contract validation at execution time. Both halted before apply per auto-mode "ask and wait" discipline. Both surfaced for operator adjudication rather than executing on stale recon.

The discipline is operating correctly — the catches happened — but the underlying question is whether Phase 1 recon could have caught these before reaching execution-time. Two repeat instances suggests a doctrinal concern.

**Proposed doctrine extension:** Phase 1 Explore-agent fidelity validation. When Phase 1 recon is generated via Explore agents (vs direct grep / direct file inspection), build in an explicit cross-validation step at Phase 1 close — spot-check assertion against direct empirical evidence on a representative sample. The mode of failure is consistent: Explore agents may report "X is in place" based on partial pattern matches that don't reflect the full empirical state. Direct grep at planning time catches before stale recon reaches execution-time §A.13.6 catches.

This isn't a criticism of Explore agents; it's a calibration step that prevents the recon-vs-execution drift that this commission has surfaced twice. Sibling discipline to §A.13.6 + §A.13.8 — those catch drift at execution; this would catch at planning.

### Item 7 — Structured-fan-out as 3rd category between mechanical and architectural (Phase 3b — NEW)

**Empirically validated at Phase 3b Checkpoint 2.** The buildSeoTrace shared helper at Checkpoint 1 enabled mechanical-uniform application across 28 apps despite per-app structural variations.

Three categories now distinguishable:

1. **Mechanical fan-out** (Phase 3a.2 multi-h1): byte-identical edit per app; sed-style replace; single short session
2. **Structured fan-out (NEW)** (Phase 3b Checkpoint 2 path-(b) trace): shared helper does the structural work; per-app diff becomes mechanical (uniform N-step pattern applying it); per-app variation limited to surface-level fields
3. **Architectural sweep** (Shape A precedents `44cbdda1` / `05d0940e` / `109a91d4`): per-app instrumentation requires structural extension; Shape A discipline territory per §A.13.5; multi-commit; multi-session

**Distinguishing predicate at planning time:** "does shared-helper extraction reduce per-app diff to mechanically uniform application?"
- If yes → structured-fan-out (e.g., Phase 3b)
- If no → architectural-sweep (e.g., Shape A precedents)

Cost projection differentiator: structured-fan-out is ~50 LoC × N apps with per-app diff uniform; architectural-sweep is ~200+ LoC × N apps with per-app architectural decisions.

Fold-queue likely lands as new §A.13.X subsection sibling to §A.13.4 + Item 1 above (mechanical-vs-architectural). The 3-category framing absorbs Item 1 under it.

### Item 8 — Verification-hygiene step at structured-fan-out execution (Phase 3b — NEW)

Sibling to Item 2 (mechanical-fan-out verification-hygiene); the structured-fan-out class warrants its own discipline.

**Locked sequence empirically validated at Phase 3b Checkpoint 2 close:**

1. **Per-app structural sanity grep** — 6-dimensional pattern verification across N apps (canvas-cache + var seoMeta + var seoTrace + bundle return seoTrace + eager cachedBundle await + manifestMeta.seo_trace). Expected result: 1 hit per dimension per app; no 0's, no >1's.
2. **Per-app outlier detection** — diff each app's surface against reference shape; surface any divergence beyond keys/exerciseTypeName variations
3. **Test-suite full-pass** — unit + integration; expect no regression
4. **Sample 4-5 apps for spot-check** — representative coverage of structural-variation classes

Why distinct from mechanical-fan-out hygiene (Item 2): structured-fan-out involves multiple per-app sites (canvas-cache + bundle return + click handler) vs mechanical-fan-out's single per-app site. The N-dimensional grep verification (vs single-pattern grep) is the load-bearing differentiator.

Likely lands as part of §A.13.X structured-fan-out doctrine subsection alongside Item 7.

---

## Phase 4a + 4b commencement readiness

Phase 3b close authorizes Phase 4a commencement with:
- All 29 apps' served copies emit `manifest.seo_trace` at runtime
- Path-(b) trace primary; lexicon retained as defensive layer with deprecation markers
- Phase 6 fold-queue at 8 items documented above
- Cost-balloon assessment final outcome documented (a) DID NOT FIRE / (b) DEFERRED / (c) FIRED but BOUNDED
- Substrate-gap inventory deferred to runtime emergence (filed if applicable post-deploy)

**Phase 4a scope:** existing-deck retrofit via `republish-seo` mode using SEO_INSERTION_POINT marker pair (Phase 3a.2 substrate). Walks `/var/www/lcs-media/decks/<locale>/<slug>-v<N>/deck.html` files, re-emits SEO block. Atomic symlink-swap per §15.5.

**Phase 4b scope:** inbound-link uplift across hub authority surfaces; cross-boundary TS/CJS adjudication for `count-inbound-surfaces.ts`. Predicate flips WARN → HALT post-Phase-5.

---

## Concurrent-arc state

Sole-arc verified throughout Phase 3b. No concurrent commencements. Stream A Arc 2 stayed deferred through 3 checkpoints. Vocabulary-substrate gaps detection deferred to operator runtime activity per (A) sole-arc lock.

---

## Phase 3b close

Phase 3b — path-(b) origin trace fan-out + production deploy + lexicon deprecation — CLOSED.

Path-(b) trace is now PRIMARY at runtime across all 29 §14.10 catalog apps. Lexicon retained as defensive fallback with deprecation markers signaling Phase 4a transition target. Cost-balloon escape hatch monitored throughout, never required activation.

Standing by for Phase 4a commencement signal at operator's convenience.

*End of Phase 3b close-out summary.*
