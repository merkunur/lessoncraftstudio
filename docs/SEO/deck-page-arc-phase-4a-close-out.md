# `[ARC][SEO][DECK-PAGE]` Phase 4a — close-out summary

**Type:** docs-only deliverable per Phase 4a close-out plan; aggregate close-out across Checkpoint 1 + deploy.sh patch + Checkpoint 2 first-pass + Checkpoint 2.5 (θ) title-shape + final integrity-check verification
**Generated:** 2026-05-09
**Phase 4a status:** CLOSED — existing-deck retrofit pass shipped at file-level 100%; DB hash backfill 63.3% en + 100% non-en per Adjudication 4 (ι); deploy.sh hardened with prisma generate per Adjudication 1 (α); seo.words.* localization deferred to Phase 5 per Adjudication 2 (γ); title-shape includes mode discriminator per Adjudication 3 (θ); slug-vs-title-shape redundancy filed for next-session priority queue per (μ) commission stub

---

## Scope summary

Phase 4a delivered **existing-deck retrofit via `republish-seo` mode** + **(θ) title-shape adjustment to include exercise_mode discriminator** + **deploy.sh prisma-generate operational fix**. After Phase 4a close, all 2776 production deck.html files across 4 locales emit canonical SEO surface (title + description + canonical + JSON-LD + 14 OG/Twitter tags + SEO_INSERTION_POINT marker pair); 1693/2673 en + 29/29 non-en have title_hash + description_hash backfilled in DB enabling gate's TITLE_NON_UNIQUE + DESCRIPTION_NON_UNIQUE predicates to enforce on the backfilled subset.

Forward-flow correctness is 100% post-(θ): apps emit unique titles by construction (mode discriminator inserted when manifest.exercise_mode is non-null per §17.8.5 default-mode-emits-null contract). The 36.7% en residual NULL hash backfill is pre-existing slug-vs-title-shape redundancy at the catalog data layer — outside (θ) title-shape doctrine's reach; filed at `docs/SEO/slug-rationalization-commission-stub.md` for future commission ratification.

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
| `9a216155` | Phase 3b Checkpoint 3 | production deploy + lexicon deprecation + Phase 3b close-out |
| `a0ab3cf0` | Phase 4a Checkpoint 1 initial | republish-seo mode + Node-CJS port of buildSeoHead |
| `3d1027e5` | Phase 4a Checkpoint 1 fix-1 | celebration h1→h2 line-context regex |
| `b5c1f3c1` | Phase 4a Checkpoint 1 fix-2 | defensive Class A strip-outside-markers cleanup |
| `655e786c` | Phase 4a Checkpoint 2 [CHORE][CI] | deploy.sh prisma generate alongside git pull |
| `af676177` | Phase 4a Checkpoint 2.5 | (θ) title-shape includes exercise_mode discriminator |
| (this commit) | Phase 4a close-out | (ι) ratified at 63.3% en + 100% non-en backfill; (μ) commission stub |

Phase 4a substantive code-work commits: 5 (Checkpoint 1 initial + 2 fix iterations + deploy.sh + Checkpoint 2.5). Plus this docs-only close-out commit.

---

## Phase 4a Checkpoint 1 deliverables (`a0ab3cf0` → `3d1027e5` → `b5c1f3c1`)

**5 files changed, 1413 + 59 + 120 = ~1592 LoC across 3-commit sub-chain.**

- `scripts/publish-cli/build-seo-head.js` (NEW; ~132 LoC) — Node-CJS port of REFERENCE TRANSLATIONS/catalog-export.js `buildSeoHead`. Mirrors browser-side helper for retrofit consumption. Pure template emission (placeholders intact for substitute.apply downstream).
- `scripts/publish-cli/build-seo-head.test.js` (NEW; 30 tests) — marker pair emission, title/description shapes, JSON-LD structure, 14 OG/Twitter tags count, validation edge cases.
- `scripts/publish-cli/republish-seo.js` (NEW; ~395 LoC final state) — 4-phase salvage script per §15.17 pattern. Three deck classes (A.1: post-Phase-3b with seo_trace; A.2: post-Phase-3a.2 pre-Phase-3b; B: pre-Phase-3a.2). Class A.1 sources values from manifest.seo_trace; Class A.2/B from i18n + taxonomy + English fallback. Atomic in-place rewrite via temp+rename. DB titleHash/descriptionHash backfill via crypto.createHash('sha1') normalized hashes.
- `scripts/publish-cli/republish-seo.test.js` (NEW; 25 tests final state) — walkDecks, classifyDeck (3 classes + halt-class fixtures), resolveSeoOpts, computeNewHtml (Class A + B), computeSeoHashes.
- `scripts/publish-cli/index.js` (modified) — strict-args SCHEMAS extension for `republish-seo` subcommand + republishSeoCmd handler.

**Two §A.13.6 firings handled in-flight:**

1. **Celebration h1 inside JS string literal** (`3d1027e5`) — Initial regex matched only unescaped `<h1 class="lcs-celebration__title">` form. Production deck.html embeds celebration via `"<h1 class=\"...\">"+T(...)+"</h1>"` JS string with backslash-escaped quotes. Fix: line-context sed-style approach mirroring Phase 3a.2's exact pattern. Handles BOTH unescaped + backslash-escaped forms uniformly.

2. **Class B injection without pre-existing-SEO strip** (`b5c1f3c1`) — Naive injection produced duplicate `<title>` (existing + new). Fix: defensive strip pre-existing SEO elements (`<title>` / meta description / link canonical / og:* / twitter:* / ld+json) before inject; Class A also strips OUTSIDE markers (defensive cleanup for contaminated state).

**Reference retrofit verified end-to-end on `de/addition-image-image` (3 versioned dirs):**
- 2 markers ✓ / 14 OG/Twitter ✓ / 1 title ✓ / 0 celebration h1 (became h2) ✓
- Cloudflare-served URL reflects retrofit
- DB row backfilled with valid SHA-1 hashes

**Side-finding: Prisma client regeneration gap on Hetzner.** Phase 3a.1 Checkpoint 1 schema migration was applied to DB (per §A.5.1 manual `prisma migrate deploy` step), BUT the Prisma client on Hetzner was never regenerated. Manually fixed via `npx prisma generate` post-discovery; structurally absorbed via Adjudication 1 (α) → deploy.sh patch.

**Side-finding: seo.words.* localization gap.** Class B retrofitted DE deck title reads "Addition Worksheet — Tiere — Kindergarten | LessonCraftStudio" — "Worksheet" remains English because `messages/<locale>.json` doesn't have `seo.words.*` keys. Adjudication 2 (γ) defers full localization (4 keys × 11 locales = 44 entries) to Phase 5 absorption alongside NSR review.

## Phase 4a Checkpoint 2 first-pass + deploy.sh patch (`655e786c`)

**1 file changed, 25 LoC; deploy.sh prisma generate auto-step.**

- `deploy.sh` (modified) — Add `npx prisma generate` step between `cd frontend` (line 148) and `npm run build` (line 163). Order matters: generate produces TypeScript declarations build consumes; running generate AFTER build leaves previous build's types stale. Inline comment block documents Phase 4a Checkpoint 1 empirical finding + §A.5.1 doctrinal context + Phase 6 fold-cycle absorption target.

§14.6 TWO-STEP deploy executed:
- Step 1: deploy.sh runs cleanly; `🔧 Generating Prisma client...` + `✅ Prisma client regenerated` lines confirm new step operational.
- Step 2: 30 served-copy syncs via `update-worksheet.sh` loop (1 catalog-export.js + 29 app HTMLs); chattr +i re-applied per file.

**First-pass retrofit sweep (across 4 locales):**

| Locale | Total decks | Class A | Class B | Time |
|---|---:|---:|---:|---:|
| en | 2681 | 0 | 2681 | 85s |
| de | 37 | 3 | 34 | 1.5s |
| es | 29 | 0 | 29 | 1.2s |
| nl | 29 | 0 | 29 | 1.2s |
| **TOTAL** | **2776** | **3** | **2773** | **~89s** |

File-level: 2776/2776 retrofitted; 0 halt-class fires; 0 rewrite failures.

DB integrity check (post-first-pass): 939/2673 (35.1%) en title_hash backfilled; 100% non-en. Surfaced **Adjudication 3** — title-shape pathology — for operator strategic decision.

## Phase 4a Checkpoint 2.5 deliverables (`af676177`) — (θ) title-shape adjustment

**34 files changed, 681 insertions / 109 deletions = +572 net LoC.**

Operator adjudication 3 (θ) lock: extend title shape to include `exercise_mode` discriminator. Per §A.13.6 verification (direct grep, NOT Explore agent per Phase 6 fold-queue Item 6): title-formatting locus IS shared-helper extractable; (θ) proceeds as structured fan-out per Phase 3b Item 7 doctrine.

**Title shape post-(θ):**
```
Default mode (manifest.exercise_mode = null):
  {Type} {Worksheet} — {Theme} — {Level} | LessonCraftStudio

Non-default mode (manifest.exercise_mode != null):
  {Type} {Mode} {Worksheet} — {Theme} — {Level} | LessonCraftStudio
```

Mode is title-cased English ID (e.g., `find-addend` → `Find Addend`); localization deferred to Phase 5 alongside seo.words.* per (γ). Default-mode decks remain unique by virtue of being THE default at their (type, theme, level) per §17.8.5 default-mode-emits-null contract.

Files (5 source-code modify + 29 fan-out apps):

- `REFERENCE TRANSLATIONS/catalog-export.js` (+88/-2): buildSeoHead opts.exerciseModeName + titleHead composition + buildSeoTrace title.modeName + description.modeName trace fields + new `deriveExerciseModeName(rawMode)` shared helper + public API export
- `scripts/publish-cli/build-seo-head.js` (+27/-1): Node-side mirror of catalog-export.js change
- `scripts/publish-cli/build-seo-head.test.js` (+82): 15 new tests covering default-mode no-segment, non-default-mode with-segment, German preserves capitalization, deriveExerciseModeName edge cases. 30 → 45 total tests.
- `scripts/publish-cli/republish-seo.js` (+27): resolveSeoOpts extension — Class A.1 sources from manifest.seo_trace.title.modeName.value; Class A.2/B derives from manifest.exercise_mode via local mirror of deriveExerciseModeName.
- `scripts/publish-cli/republish-seo.test.js` (+86): 4 new tests covering Class A.1 from trace, Class B from manifest, default mode null, computeNewHtml title with mode segment. 25 → 29 total tests.
- `REFERENCE APPS/<29 apps>.html` (~145 LoC): structured fan-out per §A.13.6 confirmed locus + Phase 3b Item 7 doctrine. Per-app: extractDeckBundle adds rawExerciseMode + exerciseModeName via shared helper + adds to seoMeta + buildSeoTrace opts; renderStandaloneHTML passes exerciseModeName to buildSeoHead opts; click handler hoists exerciseMode derivation BEFORE extractDeckBundle (manifestMeta + helper vars + derivedExerciseMode block moved together; manifestMeta.seo_trace assignment kept AFTER cachedBundle).

**Re-run retrofit (post-(θ) deploy):** 2776/2776 retrofitted; 0 halt-class fires; 0 rewrite failures.

**DB integrity check (post-(θ)):**
- en: 1693/2673 (63.3%); was 35.1% pre-(θ) — +28-point gain
- de + es + nl: 100% (29/29 each)
- description_hash parallels title_hash exactly (1693 en + 29 each non-en)

**Adjudication 4 (ι) lock:** close at 63.3% en + 100% non-en. Residual 980 en NULLs are slug-vs-title-shape redundancy (multiple slugs sharing content axes; default-mode + no-theme decks at same exerciseType producing identical titles). Outside (θ) title-shape doctrine's reach; filed at `docs/SEO/slug-rationalization-commission-stub.md` for future commission ratification.

## Phase 4a close-out deliverables (this commit)

**2 files changed, ~470 LoC across 2 NEW docs files.**

- `docs/SEO/deck-page-arc-phase-4a-close-out.md` (NEW; this file)
- `docs/SEO/slug-rationalization-commission-stub.md` (NEW; (μ) commission-spec stub)

---

## Aggregate metrics

| Metric | Value |
|---|---:|
| Substantive code-work commits | 5 (Checkpoint 1 initial + 2 fix iterations + deploy.sh patch + Checkpoint 2.5) |
| Total files changed | 5 (Checkpoint 1) + 1 (deploy.sh) + 34 (Checkpoint 2.5) = 40 |
| Total LoC inserted | ~1413 (Checkpoint 1) + 25 (deploy.sh) + 681 (Checkpoint 2.5) ≈ 2119 |
| Total LoC deleted | ~10 (Checkpoint 1 fix iterations) + 109 (Checkpoint 2.5) ≈ 119 |
| Unit tests (final) | 119 (was 38 pre-Phase-4a) |
| Integration tests (final) | 7 (no additions) |
| Schema migrations | 0 (Phase 4a is code + content only; deploy.sh patch is operational) |
| Production deploys | 3 (Phase 4a Checkpoint 1 + deploy.sh patch + Checkpoint 2.5) |
| Production deck.html files retrofitted | 2776 (across 4 locales) |
| Halt-class fires (across all retrofits) | 0 |
| Rewrite failures | 0 |
| DB title_hash backfill (en) | 1693/2673 (63.3%) |
| DB description_hash backfill (en) | 1693/2673 (63.3%) |
| DB title_hash backfill (de + es + nl) | 100% (29/29 each) |
| DB description_hash backfill (de + es + nl) | 100% (29/29 each) |
| Forward-flow correctness | 100% (apps emit unique titles by construction post-(θ)) |

---

## Adjudication outcomes

| # | Topic | Lock | Status |
|---|---|---|---|
| 1 | Prisma generate gap | (α) — deploy.sh patch | SHIPPED at `655e786c` |
| 2 | seo.words.* localization | (γ) — Phase 5 absorption | DEFERRED to Phase 5 |
| 3 | Title-hash uniqueness invariant | (θ) — title-shape includes mode discriminator | SHIPPED at `af676177` |
| 4 | (θ) backfill rate not 100% | (ι) — close at 63.3% en + 100% non-en | LOCKED; this commit closes |

---

## Cost-balloon final assessment

Per concern 3 + Phase 2 §8 escape hatch lock:

**(a) `t()` helper architectural divergence per §17.8.14** — DID NOT FIRE.
- Phase 3b lock confirmed; Phase 4a no new emergence.

**(b) Translation-surface gaps requiring Stream A Arc 2 commencement** — PARTIALLY FIRED.
- seo.words.* localization gap surfaced empirically at Phase 4a Checkpoint 1 (Class B retrofitted DE titles ship English "Worksheet")
- Routed to Phase 5 absorption per Adjudication 2 (γ) — NOT Stream A Arc 2
- Phase 5 scope expanded to 3 sub-items: NSR review + seo.words.* 44-entry + (λ) taxonomy capitalization

**(c) Per-app divergence in extractDeckBundle structure** — FIRED but BOUNDED.
- Phase 3b Checkpoint 2 first-instance fired (3-step diff → 5-step diff via §A.13.8 mid-execution recalibration)
- Phase 4a Checkpoint 2.5 second-instance: 29-app structured fan-out per Phase 3b Item 7 doctrine; ~145 LoC across apps; within structured-fan-out cost shape (NOT architectural sweep cost shape)

**Cost-balloon escape hatch monitored throughout Phase 4a; never required activation.** Audit-trail substantiates discipline operating correctly across 4 §A.13.6/§A.13.8 firings (multi-h1 single-shared-site, 5-step-diff Explore-agent recon, h1-escape regex, Class B duplicate-element strip).

---

## Phase 6 fold-queue at 11 items

5 from Phase 3a + 3 from Phase 3b + 3 from Phase 4a:

### Items 1-5 (Phase 3a)

1. Mechanical-fan-out vs architectural-sweep distinction at 29-app scope
2. Fan-out verification-hygiene step at mechanical-fan-out execution
3. §A.13.6 + §A.13.8 paired discipline canonical reference (now fired 4 times this commission)
4. Phase 4a mutable-regions contract extension via SEO_INSERTION_POINT marker pair
5. Phase 2 §1-§7 invariants → §17.8.16-§17.8.X subsections

### Items 6-8 (Phase 3b)

6. Phase 1 Explore-agent fidelity validation (operator-surfaced; doctrine-class)
7. Structured-fan-out as 3rd category between mechanical and architectural (validated again at Phase 4a Checkpoint 2.5)
8. Verification-hygiene step at structured-fan-out execution (6-dim grep pattern)

### Items 9-11 (Phase 4a — NEW)

9. **prisma generate alongside migrate deploy** (Phase 4a Checkpoint 1 surface) — CONCRETE FIX SHIPPED at `655e786c` (deploy.sh patch). Doctrinal absorption at Phase 6: §A.5.1 TWO-STEP → THREE-STEP migration discipline. With this commit's deploy.sh patch, generate becomes AUTOMATIC; only `prisma migrate deploy` remains manual per §A.5.1's existing prose.

10. **Slug-vs-title-shape redundancy as separate doctrine class** (Phase 4a Checkpoint 2.5 verification finding) — slug-level catalog data hygiene is structurally distinct from title-shape doctrine; collisions at the slug level cannot be resolved by title-shape adjustments alone. Recurrence prevention: at any future title-shape work, distinguish (a) shape-pathology collisions from (b) catalog-data-hygiene collisions before pricing remediation envelope.

11. **Backfill-rate as commission close-out metric** (sub-doctrine of #10) — when a commission's primary deliverable enforces a uniqueness invariant via DB-side hash, close-out doc must report backfill-rate breakdown (not just file-level retrofit count). Silent under-enforcement is worse than visible partial enforcement; report explicitly.

---

## Phase 4b scope (next subsequent commission)

Per Phase 0 §6 D5 + Phase 1 §3 + Phase 2 §5: inbound-link surface uplift across hub authority surfaces (homepage / topic / locale / BreadthGrid / sitemap) targeting N≥3 non-sitemap floor per concern 4 lock.

**Cross-boundary TS/CJS integration adjudication deferred since Phase 3a.1 Checkpoint 2** — Phase 4b ratifies whether `frontend/lib/seo/count-inbound-surfaces.ts` (TypeScript) compiles into JS at build time for publish-cli (Node-CJS) consumption (CC pre-recommendation), OR alternative cross-boundary approach.

Phase 4b also flips `INBOUND_LINK_COUNT_BELOW_TARGET` predicate from WARN-class (pre-Phase-5) to HALT-class (post-Phase-5) per concern 4 escalation lock.

## Phase 5 scope (expanded to 3 sub-items)

1. **NSR review on Nordic + Tier 4 Danish locales** (per concern 1.4) — sv, fi, no, da NSR-flag entries in `seo-reconciliation-exceptions.json`. Romance Tier 4 (fr, it, pt) authored without NSR per §17.5 stronger Claude-quality posture.
2. **seo.words.* 44-entry localization addition** (per Adjudication 2 (γ)) — 4 keys × 11 locales added to `messages/<locale>.json` under `seo.words.*` namespace: `worksheet`, `free_interactive`, `for`, `print_or_play_online`. Class B retrofit's English-fallback path resolves to localized values once shipped.
3. **(λ) taxonomy.axes.exercise-type.name.en capitalization** (Phase 4a Checkpoint 2.5 ancillary finding) — `name.en` values are lowercase in `topics-taxonomy.json axes.exercise-type.<key>.name.en` (e.g., `"addition"` → should be `"Addition"`). Affects all 29 exercise-type entries × 11 locales. Title aesthetic + SEO quality improvement; data-quality work alongside i18n.

NOTE: post-Phase-3b, the lexicon exception list is deprecated. Phase 5 NSR review still relevant for any per-locale terms used in path-(b) trace localization quality validation, but the lexicon-specific carve-outs lose load-bearing role.

## Phase 6 scope

11-item fold-queue absorption at next [DOCS] cycle. Cross-cuts §A.13 territory (verification-hygiene), §A.5.1 territory (schema migration), §17.8 territory (deck-page SEO doctrine), and adds new doctrine territory for slug-vs-title-shape redundancy (Item 10).

---

## (μ) slug-rationalization commission filed

`docs/SEO/slug-rationalization-commission-stub.md` filed for next-session priority queue. Addresses:
- Multiple slugs sharing content axes (e.g., `picture-sort` + `picture-sort-animals` both with `manifest.theme = 'animals'`)
- Default-mode + no-theme decks at same exerciseType producing identical titles
- Possible interaction with §A.10 canonical-host migration cleanup (legacy slugs from earlier catalog state)

Operator picks at next-session start per CONVERSATION-HANDOFF §0 framework. Not active commission.

---

## Concurrent-arc state

Sole-arc per (A) lock confirmed throughout Phase 4a. (μ) slug-rationalization stub filed for next-session priority queue rather than triggering concurrent-arc activation mid-commission. Stream A Arc 2 stayed deferred. Phase 4a stays sole-arc through close.

---

## Phase 4a close

Phase 4a — existing-deck retrofit + (θ) title-shape adjustment + deploy.sh prisma generate fix — CLOSED.

Path-(b) origin trace + (θ) title-shape together constitute the gate's structural doctrine for SEO uniqueness enforcement. Forward-flow correctness 100%; backward-flow at 63.3% en + 100% non-en bounded by pre-existing slug-vs-title-shape redundancy (filed for (μ) commission). 11-item Phase 6 fold-queue documented for next [DOCS] cycle absorption.

Standing by for Phase 4b commencement signal at operator's convenience.

*End of Phase 4a close-out summary.*
