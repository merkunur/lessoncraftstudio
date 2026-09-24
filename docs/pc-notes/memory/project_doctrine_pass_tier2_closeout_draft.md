---
name: Tier 2 closeout doctrine pass — CLAUDE.md + SUBSCRIPTION-SCOPE.md amendments + SESSION-STATE.md full rewrite
description: Three-deliverable doctrine pass at Tier 2 closeout (`d3b4f962`). v1 draft for operator review before apply commission.
type: project
originSessionId: de342ceb-c0c5-463a-8cea-62f861933fc9
---
# Tier 2 Closeout Doctrine Pass — DRAFT v1

**Status:** ⏸ AWAITING OPERATOR REVIEW. No commits yet.
**Apply:** in follow-up commission prompt after operator approves/revises.
**Bundling:** single commit recommended; split optional if Path Discrimination distinguishes.

---

## Recon findings (1.x)

### 1.1-1.4 — TOC + git timeline + baseline check

- **CLAUDE.md** in-tree (1991 lines, 184KB). Last touched `9ba9fa2d` (2026-05-02 Schema commissioning). Matches `important/` upload baseline.
- **docs/SUBSCRIPTION-SCOPE.md** in-tree (279 lines, 18KB). Last touched `fbff3466` (2026-05-02 6 open decisions resolved). Matches upload baseline.
- **memory/SESSION-STATE.md** absent on disk; canonical target for full rewrite. Upload baseline at `important/SESSION-STATE.md` (94KB, 2026-05-02 snapshot post-`4e61c24d`).

**14 commits between `4e61c24d` and HEAD `d3b4f962`:**

| # | Commit | Summary |
|---|---|---|
| 1 | `b18b8654` | Tier 2 Track C Batch 4 (es) — visual+puzzle + Section 2 grid Option D stagger 41→55% |
| 2 | `a24b582a` | Tier 2 Track C Batch 5 (es) — puzzle+search residuals |
| 3 | `1be13b8a` | Tier 2 Track C Batch 6 (es) — math-worksheet + picture-path closeout (cross-locale-OK case) |
| 4 | `eefced25` | Tier 2 Track C Batch 7 (es) — closeout 7 apps; **es 29/29 = 100%** |
| 5 | `e5679d69` | Tier 2 Track B Wave 1 (nl) — homepage + footer + topicPage NL message keys |
| 6 | `78d5d737` | Tier 2 Track B Wave 2 (es) — collections + workspace + bulk + share es message keys |
| 7 | `8bc53301` | Tier 2 Track B Wave 2 (nl) — collections + workspace + bulk + share nl message keys |
| 8 | `d361a03e` | Tier 2 Track C Batch 1 (nl) — matching cluster + Section 2 first-nl-publish stagger (4-locale) + Footer nl surfacing |
| 9 | `3a61c452` | Tier 2 Track C Batch 2 (nl) — math cluster + Footer educational-level surfacings |
| 10 | `8ce112b5` | Tier 2 Track C Batch 3 (nl) — literacy cluster |
| 11 | `0bb02030` | Tier 2 Track C Batch 4 (nl) — visual+puzzle + Section 2 theme-refresh swap (Option D extended) |
| 12 | `9266130b` | Tier 2 Track C Batch 5 (nl) — puzzle+search residuals |
| 13 | `645ca7ff` | Tier 2 Track C Batch 6 (nl) — math-worksheet + picture-path closeout (4-locale cross-locale-OK matrix) |
| 14 | `d3b4f962` | Tier 2 Track C Batch 7 (nl) — closeout 7 apps + retroactive grado-2/groep-4 Footer Col 2 fix; **nl 29/29 = 100%; all 4 locales at 100% C-1 simultaneously** |

**Production state at HEAD:** 116 published / 1 archived; en+de+es+nl all 29/29 C-1 = 100%.

---

## Item 1 — CLAUDE.md amendments

### 2.1 — Section 2 three-equilibrium doctrine (proposed §18.4 — NEW subsection)

**Landing zone:** new subsection at end of §18 (Sample decks embedded on every public page). The breadth grid IS the §18 home-page sample area; doctrine extension fits naturally as §18.4.

**Proposed amendment text:**

> ### 18.4 Section 2 breadth-grid curation: three load-bearing equilibria
>
> The home page Section 2 grid (8 deck thumbnails + 1 featured inline-play tile) is curated against three independently-load-bearing equilibria, all three of which must hold post any stagger event:
>
> 1. **Locale balance.** Distribution of picks across the active production locales. Established at 2-en/2-de/2-es/2-nl 4-locale grid at NL Track C Batch 1 (`d361a03e`). Future locale launches (Tier 3+) will extend per SECTION-2-CURATION-v1.md spec.
> 2. **Theme/themeless balance.** 4 themed (in canonical-English `subject_tags` set: `{animals|vehicles|food|fruit}`) / 4 themeless. Locked since Track C Batch 1 ES (`035852c3`).
> 3. **Mechanic-diversity.** 8 distinct mechanics across 8 picks (no app duplication beyond cross-locale demonstration of same-mechanic). The featured slot (currently `sudoku-en`) counts as one mechanic.
>
> All three are load-bearing. Locale + theme alone underspecify the grid: a 2/2/2/2 grid with 4-themed/4-themeless can still cluster picks on a single mechanic and feel visually monotonic (NL Batch 1 at `d361a03e` shipped `matching-letter-nl` + `shadow-match-nl` which both rendered as matching-mechanic, thinning visual diversity even though locale + theme equilibria were preserved).
>
> **Mid-arc theme-refresh swap pattern** is the right move when a prior batch's pair clustered on a single mechanic. Worked example: NL Batch 4 at `0bb02030` dropped `matching-letter-nl` + `shadow-match-nl` (both matching-mechanic) and added `missing-pieces-nl` + `chart-count-nl` (visual-completion + Family-D bar-chart, restoring 8 distinct mechanics). Locale balance held at 2/2/2/2; theme balance held at 4/4. The swap is mid-arc-correct because:
> - It does not shift locale weighting (which would reset SECTION-2-CURATION-v1.md spec assumptions)
> - It introduces fresher catalog content from the recent batch
> - It restores mechanic-diversity without operator-strategic locale rebalancing
>
> **When NOT to apply theme-refresh swap:** at first-publish events (which establish locale baseline) or at closeout milestones (which can hold the post-arc composition or refresh per operator strategic call). At Tier-2 closeout (NL Batch 7 `d3b4f962`), operator chose hold-2/2/2/2 because the Batch 4 mechanic-diversity restoration still held and there was no clustered-mechanic to address.
>
> **Cross-reference to SECTION-2-CURATION-v1.md:** that document is the canonical curation spec and houses per-pick rationale + thumbnail-quality criteria. This subsection extends the spec with the three-equilibrium framing surfaced through the ES + NL Track C arcs.

---

### 2.2 — Footer Col 2 closeout-batch surfacing discipline (proposed §16.6 — NEW subsection)

**Landing zone:** new subsection after §16.5 (URL pattern and α-granular topic-page axes). §16.5 defines the axes; §16.6 covers Footer rendering of those axes.

**Proposed amendment text:**

> ### 16.6 Footer rendering doctrine
>
> The Footer surfaces topic-page links across three columns per `frontend/components/layout/Footer.tsx`:
> - **Column 1 — `byLanguage`:** locales with published catalog content (`FOOTER_LANGUAGES` array; per Pass 7b F4 honesty, only locales where catalog decks exist link out)
> - **Column 2 — `byTopic`:** theme + educational-level axis-keys merged into a single `FOOTER_TOPICS_BY_LOCALE` map (no separate `FOOTER_EDUCATIONAL_LEVELS_BY_LOCALE` map exists; the Footer's "by topic" column merges both subject-matter axes per §16.5 schema)
> - **Column 3 — `byExerciseType`:** exercise-type axis-keys per `FOOTER_EXERCISE_TYPES_BY_LOCALE` map
>
> **Pass 7b F4 honesty discipline:** array membership IS the gate — only axis-keys with at least 1 published deck row link out. Fabricating links to empty topic pages erodes trust and produces 404s on click.
>
> **Closeout-batch surfacing discipline (added 2026-05-03 post NL Batch 7 `d3b4f962`):**
> Closeout batches that introduce a new educational-level age range (typically 7-9 from `crossword`, less commonly 8-10 from no current §14.10 app) require Footer Col 2 update alongside the more obvious Col 3 (+N exercise-type) update. This is easy-to-miss because the closeout focus is mechanically on Col 3 (1:1 per §14.10 app shipped). The retroactive `grado-2` (es) fix at `d3b4f962` was the precedent that surfaced this discipline — `crossword-es` shipped at `eefced25` (ES Batch 7 closeout) but `grado-2` was not added to `FOOTER_TOPICS_BY_LOCALE.es` until `d3b4f962` caught the gap during NL Batch 7 audit.
>
> **Audit rule:** at every closeout batch, before commit, query the DB for distinct `age_range` values per locale + reconcile against current `FOOTER_TOPICS_BY_LOCALE.<locale>` array. Any new `age_range` mapping per §17.8.6 to an axis-key absent from the array requires an entry. Per `topics-taxonomy.json` Track A `cbabd7e5` mapping:
> - 3-5 → preschool (en `preschool`, de `vorschule`, es `preescolar`, nl `peuterklas`)
> - 5-7 → kindergarten (en `kindergarten`, de `kindergarten`, es `jardin-infantil`, nl `kleuterklas`)
> - 6-8 → grade-1 (en `grade-1`, de `1-klasse`, es `grado-1`, nl `groep-3`)
> - 7-9 → grade-2 (en `grade-2`, de `2-klasse`, es `grado-2`, nl `groep-4`)
> - 8-10 → grade-3 (currently zero §14.10 apps fall here; defined-but-unused per §17.8.6)

---

### 2.3a — publish-bulk per-locale isolation contract (proposed §15.15 — NEW subsection)

**Landing zone:** new subsection after §15.14 (Asset placement, ownership, OG image derivation, pruning).

**Proposed amendment text:**

> ### 15.15 publish-bulk per-locale isolation contract
>
> `publish-bulk` does not have a `--language` flag. The strict-args schema at `scripts/publish-cli/strict-args.js` declares only `--dry-run`, `--confirm`, `--updates-manifest`, `--batch-id`, `--staging-dir` for the `publish-bulk` subcommand. Per-locale isolation is therefore enforced **at the folder-content layer**, not via CLI argument:
>
> - `bulk.js` scans the input folder via `fs.readdirSync(folder)` and filters to `.zip` extension only (top-level non-recursive)
> - Dot-prefixed subdirectories (e.g., `.tier2-trackc-batch-N-{cluster}-{locale}/`) are naturally skipped because `readdirSync` non-recursive + `.zip` filter excludes directories regardless of name
>
> **Operational pattern (locked across 14 ES + NL Track C batches):**
>
> 1. Before SCP'ing a new batch's ZIPs to `/opt/lessoncraftstudio/publish-inbound/`, archive the prior batch's residue: `mkdir -p .tier2-trackc-batch-N-{cluster}-{locale}/ && mv *.zip .tier2-trackc-batch-N-{cluster}-{locale}/`
> 2. SCP the new batch's ZIPs to the top level of `publish-inbound/`
> 3. Run `publish-bulk publish-inbound/ --dry-run` then `--confirm`
> 4. The dot-prefixed archive subdirs accumulate as a chronological history of all prior batches at this folder level
>
> **Why this matters:** premise drift surfaced at NL Batch 4 (`b18b8654`) when an early brief assumed a `--language=<locale>` filter existed. It does not. Folder-content control IS the per-locale safeguard. New briefs should reference this section rather than imagine a CLI flag.
>
> **Audit at session-state authoring time:** any brief that says "filter ZIPs by locale via X" must reference folder-content control, not a phantom CLI flag.

---

### 2.3b — Fast-forward push default policy (proposed §A.12 — NEW appendix subsection)

**Landing zone:** new subsection at end of Appendix A (Production safety rules).

**Proposed amendment text:**

> ### A.12 Fast-forward push default policy
>
> Plain `git push` is the default for fast-forward cases (local just ahead of remote with no diverging history). `git push --force-with-lease` is reserved for genuine history rewrites (rebase + push of an already-pushed branch).
>
> **Why this is policy-locked (added 2026-05-03 post Batch 4 ES drift correction at `b18b8654`):** the Claude Code agent safety policy blocks `--force-with-lease` even on non-destructive cases (e.g., when local is just ahead of remote and no history rewrite is needed). When a brief specifies `--force-with-lease` for a fast-forward case, the safety block fires and force-with-lease is unnecessary anyway. Plain `git push` succeeds without any flag.
>
> **Briefs that mention `--force-with-lease`:** check whether the case is a genuine history rewrite (commit amends, rebases, etc.) or a fast-forward. Default to plain `git push` for fast-forwards. If the safety policy blocks the force-with-lease attempt, don't escalate — just use plain push.

---

### 2.4 — §15.10 archive-and-reuse contract extension (cross-locale-OK worked example)

**Landing zone:** extend existing §15.10 (block-on-archived UPDATE contract) with new paragraphs after the current contract text.

**Proposed amendment text** (append after the existing §15.10 paragraphs ending with "...Origin: Brief B Phase 5 commit `0ad626cb` (`publish.js` extension)."):

> **Cross-locale-OK worked example (added 2026-05-03):** §15.10 same-locale block applies only to `(language, slug)` UPDATE attempts within the same locale. Cross-locale INSERTs of an archived slug are clean because the `Deck` table compound unique constraint is `(language, slug)`, not `slug`-alone. The (en, picture-path) row archived at `0ad626cb` does NOT block subsequent (de, picture-path) + (es, picture-path) + (nl, picture-path) INSERTs in different locales.
>
> **Worked instances:**
> - (de, picture-path) — pre-Phase-3a, published before en archive
> - (es, picture-path) — `1be13b8a` ES Batch 6 closeout
> - (nl, picture-path) — `645ca7ff` NL Batch 6 closeout
>
> **Locale-conditional emission at apps-side** (Phase-3a 5b-1 source-edit `67d5d99d`) handles the SAME-LOCALE case where an archived slug must be replaced. The pattern: `en` context emits `picture-trail` slug; `de` + `es` + `nl` contexts emit canonical `picture-path` slug. This is checked at app-side, not at publish-cli.
>
> **Routing matrix at NL Batch 6 closeout** (`645ca7ff`):
>
> | URL | Status | Source |
> |---|---|---|
> | /en/decks/picture-trail/ | 200 | `9b2c608e` (en-only canonical) |
> | /en/decks/picture-path/ | 404 | `0ad626cb` (archive contract holds) |
> | /de/decks/picture-path/ | 200 | pre-Phase-3a |
> | /es/decks/picture-path/ | 200 | `1be13b8a` |
> | /nl/decks/picture-path/ | 200 | `645ca7ff` |
> | /nl/decks/picture-trail/ | 404 | no nl deck at this slug |

---

### 2.5 — §13 one-sentence summary update

**Landing zone:** §13 — direct edit (single-paragraph section).

**Current text** (lines 645-651):
> ## 13. The one sentence summary for every future session
>
> Build a multilingual K-3 educator platform on the existing LessonCraftStudio technical foundation: rebuild the public site from scratch around teachers in international, bilingual, and immersion early-childhood programs; produce a catalog of interactive worksheets and printable PDFs in 11 languages with consistent quality; make every public page embed a working sample deck; gate lesson plans, themed bundles, and workspace tooling behind a $69/year subscription per `docs/SUBSCRIPTION-SCOPE.md`; bake SEO into every structural decision; launch with content depth in 4-5 priority languages and grow from there; ship within 12 months without destabilizing the existing Hetzner server, Lemon Squeezy integration, image library, or apps.

**Proposed amendment** (replace existing paragraph):
> Build a multilingual K-3 educator platform on the existing LessonCraftStudio technical foundation: rebuild the public site from scratch around teachers in international, bilingual, and immersion early-childhood programs; produce a catalog of interactive worksheets and printable PDFs in 11 languages with consistent quality; **post Tier-2 closeout at `d3b4f962` (2026-05-03), 116 decks published across en+de+es+nl with all 4 locales at 100% C-1 catalog coverage; Wave 1 + Wave 2 i18n chrome shipped per locale; 4-locale Section 2 breadth grid balanced per §18.4 three-equilibria doctrine**; make every public page embed a working sample deck; gate lesson plans, themed bundles, and workspace tooling behind a $69/year subscription per `docs/SUBSCRIPTION-SCOPE.md`; bake SEO into every structural decision; **next-arc options post-Tier-2-closeout: Wave 3 chrome (support/billing/auth/legal long-tail), Tier 3 launch (sv/fi/no), or Pillar 1 lesson-plan authoring (launch-trigger-gating)**; ship within 12 months without destabilizing the existing Hetzner server, Lemon Squeezy integration, image library, or apps.

---

## Item 2 — SUBSCRIPTION-SCOPE.md amendment

### 3.1 — Launch readiness arithmetic update + bundle-scope adjudication

**Current state (post-`fbff3466`):** Decision 2 locked bundle scope at "7 bundles × 2 locales = 14 paired bundle/lesson-plan units". Clause (a) lesson-plan-per-deck scope was forecast at 58 (Tier 1 en+de) or 116 (with Tier 2 es+nl). Tier 2 is now realized at 116 published decks (29 × 4).

**Lesson-plan scope (clause a):** mechanically follows catalog scope — 1 lesson plan per deck per locale = 116 plans. No strategic adjudication; just arithmetic.

**Bundle scope (clause b) — STRATEGIC ADJUDICATION:**

> The current scope says "7 bundles × 2 locales = 14 paired bundle/lesson-plan units" (Tier 1 en+de canonical). Tier 2 closeout at `d3b4f962` brings Tier 2 (es+nl) to catalog parity with Tier 1. **Does Tier 2 closeout expand bundle scope to 7 × 4 = 28, OR does bundle scope hold at 7 × 2 = 14 with es+nl bundles deferred?**

**Surfaced as adjudication for operator review:**

- **Option A (Recommended):** Hold bundle scope at **7 × 2 = 14** (Tier 1 canonical). Rationale: bundles ship with paired lesson plans (per scope spec); lesson-plan localization is per-locale-rows (not auto-translated); per-locale bundle authoring is independent labor (not free arithmetic from Tier 1 work). Filing es + nl bundles for follow-up after Tier 1 bundle library closes preserves the launch-trigger threshold at a manageable scope. Concrete launch-trigger arithmetic: 14 paired-bundle/lesson-plan units (Tier 1 canonical) + 116 standalone lesson plans (one per deck per locale) = 130 total content units to author for launch.
- **Option B:** Expand bundle scope to **7 × 4 = 28** to match Tier 2 catalog parity. Tier 2 closeout milestone (all 4 locales at 100% C-1) creates symmetry pressure for bundle scope to follow. Concrete launch-trigger arithmetic: 28 paired-bundle/lesson-plan units + 116 standalone lesson plans = 144 total content units to author for launch.
- **Option C:** Some other bundle-scope shape (operator-strategic). Open-ended.

This is genuinely a business call about Tier 2 commitment depth for bundles specifically; not technical-architecture. Default in surfacing is Option A (hold) because bundles are content-authored not arithmetic-derived from Tier 1.

**Proposed amendment text** (assuming Option A; revise per operator pick):

> Append to existing "Launch readiness" section, after the existing clause (b) text:
>
> > **Tier 2 closeout post-`d3b4f962` arithmetic (2026-05-03):**
> > - Clause (a) lesson-plan-per-deck-per-locale: **116 plans** (29 §14.10 apps × 4 locales en+de+es+nl). Realized at Tier 2 closeout. Authoring scope.
> > - Clause (b) bundle scope: **7 bundles × 2 locales = 14 paired bundle/lesson-plan units** (Tier 1 en+de canonical; locked at `fbff3466` Decision 2). Tier 2 (es+nl) bundle authoring is **filed for follow-up** post-Tier-1-bundle-library-close — bundles ship with paired lesson plans and per-locale bundle authoring is not arithmetic-derived from Tier 1 work.
> > - Total launch-trigger authoring scope: **130 content units** (14 paired-bundle units + 116 standalone lesson plans).

---

## Item 3 — SESSION-STATE.md full rewrite

### 4.x — Full canonical replacement at memory/SESSION-STATE.md

**Path:** `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\SESSION-STATE.md` (canonical target per brief 4.x; file is currently absent on disk — fresh write)

**Format:** mirror current 2026-05-02 upload baseline. Authoring date 2026-05-03.

**Surfacing approach:** the full rewrite is ~95-100KB; surfacing inline would be size-prohibitive. **I will write the full canonical SESSION-STATE.md to the canonical path as part of the apply commission**, but operator can preview structure here:

**Proposed structure (sections + section-by-section summary):**

- **Header** — date 2026-05-03; one-line "single working-memory file. Reload from here at any point. Replaces all prior versions."
- **§1 My role** — unchanged from upload baseline (Copilot strategic-thinking partner authoring briefs for Claude Code)
- **§2 Operator behavior patterns learned** — unchanged from upload baseline (no new patterns surfaced this arc)
- **§3 Project-in-one-paragraph** — extend with Tier 2 closeout milestone (`d3b4f962`); 116 decks across 4 locales at 100% C-1; chrome Wave 1+2 shipped per locale; 4-locale Section 2 grid established + balanced per three-equilibria doctrine
- **§4 Current production state** — full table refresh:
  - Decks: 116 published (29 × 4 locales) + 1 archived (en/picture-path)
  - Locales at 100% C-1: en, de, es, nl
  - Chrome shipped: Wave 1 + Wave 2 per locale
  - FOOTER_LANGUAGES: en, de, es, nl (4 entries)
  - FOOTER_TOPICS_BY_LOCALE: en=5, de=5, es=5, nl=5 (post-`d3b4f962` retroactive grado-2/groep-4 fix; parity across all 4 locales)
  - FOOTER_EXERCISE_TYPES_BY_LOCALE: en=29, de=29, es=29, nl=29 (full §14.10 coverage all 4 locales)
  - Section 2 grid: 2-en/2-de/2-es/2-nl (sudoku-en featured + shadow-match-en + addition-image-image-de + wordsearch-de + grid-match-es + picture-sort-es + missing-pieces-nl + chart-count-nl); 4-themed/4-themeless; 8 distinct mechanics
  - Phase-3.0 W-1 propagation closure: 20-for-20 zero-regression across the entire ES + NL Track C arc
  - MISSING_MESSAGE: en/de/es/nl all at Wave 2 closure (zero-residual on Wave 1+2 namespaces); Tier 3+4 locales at pre-existing 121 each (unchanged)
- **§5 Locked decisions** — extend with:
  - Section 2 three-equilibrium doctrine (locale + theme + mechanic; mid-arc theme-refresh swap pattern)
  - Footer Col 2 closeout-batch surfacing discipline (audit Col 2 against age-range distribution at every closeout batch)
  - Tier-2-bundle-scope adjudication (per operator decision in this commission)
  - Cross-locale-OK §15.10 worked-example doctrine
  - publish-bulk per-locale isolation via folder-content control (no `--language` flag)
  - Fast-forward push default; `--force-with-lease` reserved for genuine history rewrites
- **§6 Complete commit timeline** — append all 14 commits since `4e61c24d` (full table per recon 1.4 above)
- **§7 Persistent dirty working tree** — carry forward (947+ pre-existing items per session-state)
- **§8 Reference uploads** — no change
- **§9 Operational patterns learned this arc** — append:
  - (a) Cadence-pattern across mirrored locale arcs (ES → NL Track C structurally identical 7-batch arcs at zero regressions)
  - (b) Operator-strategic boundary at mid-arc Section 2 stagger decisions (Batch 4 + Batch 7 are the operator-strategic moments; Batches 1, 2, 3, 5, 6 are mechanical)
  - (c) Brief-premise-drift recording discipline matured (folder-content-control vs `--language` flag; FOOTER_EDUCATIONAL_LEVELS_BY_LOCALE map nonexistence; fast-forward-push default; `_growth_plan` arithmetic in homepage-featured-decks.json)
  - (d) Two-phase commission pattern for i18n waves (recon+draft+halt → apply) — used at NL Wave 1, ES Wave 2, NL Wave 2, this doctrine pass
  - (e) "Strategic arc-sequencing is copilot call" — operator confirmed across multiple direct corrections; session-end report shape includes "next-arc options" for operator selection
  - (f) Closeout-milestone cross-check discipline (NL Batch 7 audit caught the retroactive ES `grado-2` Footer Col 2 omission from `eefced25` because the symmetric situation at NL Batch 7 made it visible)
- **§10 What comes next** — replace with current arc-pick options post-Tier-2-closeout:
  - Wave 3 chrome (support/billing/auth/legal long-tail across 4 locales) — operationally-large but unblocking nothing strategic
  - Tier 3 launch (sv/fi/no) — green-field locales per CLAUDE.md §19; would be a 4-batch+ Wave 1+2 arc per locale
  - Pillar 1 lesson-plan authoring (launch-trigger-gating clause a; 116 plans per Tier 2 closeout arithmetic)
  - Pillar 2 themed-bundle authoring (launch-trigger-gating clause b; 14 or 28 paired bundle/lesson-plan units per `fbff3466` Decision 2 + this commission's adjudication)
  - OG image / SEO content depth (quality polish on completed Tier 2 catalog)
  - Mac Studio AI service enrichment generation (architecturally ready; no blocking dependency)
  - Operator picks per business-priority weighting
- **§11 Anti-patterns to avoid** — carry forward + append:
  - Don't reference `FOOTER_EDUCATIONAL_LEVELS_BY_LOCALE` — that map doesn't exist; educational-levels share `FOOTER_TOPICS_BY_LOCALE` map with themes
  - Don't propose `--language=<locale>` flag for publish-bulk — folder-content control is the safeguard
  - Don't default to `--force-with-lease` for fast-forward pushes — agent safety policy blocks; plain `git push` works
  - Don't skip Footer Col 2 audit at closeout batches — `crossword`-shipping batches surface new educational-level axis-keys (grade-2)
- **§12 End of state + resume point** — this doctrine commit; next-arc undecided per §10 options

**Total estimated size:** 95-100KB (mirror upload baseline ~94KB + 14-commit timeline + doctrine extensions).

---

## Apply checklist (for follow-up commission)

Do NOT execute now. For the apply commission:

1. **CLAUDE.md edits (in-tree):**
   - §13 paragraph replacement (item 2.5)
   - §15.10 paragraph append (item 2.4)
   - NEW §15.15 — publish-bulk per-locale isolation (item 2.3a)
   - NEW §16.6 — Footer rendering doctrine (items 2.2 + 2.3 third-bullet FOOTER_EDUCATIONAL_LEVELS_BY_LOCALE map note)
   - NEW §18.4 — Section 2 breadth-grid curation (item 2.1)
   - NEW §A.12 — Fast-forward push default policy (item 2.3b)

2. **docs/SUBSCRIPTION-SCOPE.md edits (in-tree):**
   - Append to "Launch readiness" section per item 3.1 with operator-locked bundle-scope choice

3. **memory/SESSION-STATE.md write (out-of-tree):**
   - Full canonical rewrite per item 4.x

4. **Single commit (default per brief):**
   - Stage CLAUDE.md + docs/SUBSCRIPTION-SCOPE.md only
   - SESSION-STATE.md does NOT commit (out-of-tree per CLAUDE.md §10.4)
   - Pre-commit hook: bracket-tag bypass `[DOCS]` per session-state §11 hygiene
   - Message: `[DOCS] Tier 2 closeout doctrine pass — Section 2 three-equilibrium + Footer Col 2 closeout-batch surfacing + publish-bulk per-locale + fast-forward push + cross-locale-OK §15.10 + Tier 2 launch-trigger arithmetic`

5. **No production touch.** No deploy. No git push of working-tree noise.

---

## Halt-and-surface to operator

**Artifact path:** `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\project_doctrine_pass_tier2_closeout_draft.md` (this file)

**Operator review questions:**

1. **Landing zones** — confirm or revise:
   - 2.1 Section 2 doctrine → §18.4 (new)
   - 2.2 Footer rendering doctrine → §16.6 (new)
   - 2.3a publish-bulk per-locale isolation → §15.15 (new)
   - 2.3b Fast-forward push default → §A.12 (new)
   - 2.4 §15.10 cross-locale-OK extension → append to existing §15.10
   - 2.5 §13 one-sentence summary update → direct edit

2. **Bundle-scope adjudication** — pick A/B/C per item 3.1:
   - A (Recommended) — hold 7×2=14 (Tier 1 canonical; es+nl bundles filed for follow-up)
   - B — expand to 7×4=28 (Tier 2 catalog parity)
   - C — other shape (operator-defined)

3. **Amendment text drafts** — per item, accept or revise

4. **SESSION-STATE.md rewrite** — proposed structure surfaced; full text written at apply commission time; signal go-ahead vs draft-first

**Operator response options:**
- "Approve" → next prompt commissions apply (single commit; SESSION-STATE.md write)
- "Approve with: bundle=B, 2.1 lands at HOMEPAGE-SAVE-STATE.md not CLAUDE.md, …" → CC applies revised choices directly without v2 re-halt
- "Revise: <substantive>" → CC produces v2 draft, re-halts
- "Pause" → hold v1 artifact
