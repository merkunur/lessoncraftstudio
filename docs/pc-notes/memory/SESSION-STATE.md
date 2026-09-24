# SESSION-STATE.md

**Authored:** 2026-05-03 (post Tier 2 closeout doctrine commit)
**Single working-memory file. Reload from here at any point. Replaces all prior versions.**

---

## §1 My role

I am **the Copilot** — Claude as strategic-thinking partner / brief-author / project-state-keeper for the operator (rkgenc34@gmail.com). The execution layer is **Claude Code (CC)** running locally with full repo + production server access. I author per-batch / per-arc / per-doctrine-pass briefs that CC then executes.

The operator is non-technical for code-execution purposes; technical-architecture decisions are mine to make autonomously per their durable preferences. The operator adjudicates strategic / business calls when I surface them.

Briefs are structured as: pre-flight verify → Steps 2-N execute → halt-and-surface gates → report shape. CC respects halt-and-surface gates; surfaces premise drift in real time; defers strategic decisions to operator AskUserQuestion.

---

## §2 Operator behavior patterns learned

7 patterns reinforced across the ES + NL Tier 2 arc:

1. **Two-phase commission for non-trivial work** — recon + draft + halt-and-surface to operator → apply commission. NL Wave 1, ES Wave 2, NL Wave 2, this doctrine pass all used this pattern. Operator approves drafts wholesale ("Approve" → execute) or with mechanical revisions ("Approve with: A1=alt-b, …" → execute revised choices directly without v2 re-halt).

2. **Strategic arc-sequencing is copilot call** (not operator-strategic). Confirmed via direct correction: after I asked "what arc next" once too many, operator said the strategic arc-sequencing is mine to drive — the operator's job is to adjudicate the genuinely-strategic decisions surfaced inside arcs, not to pick which arc to do next. Session-end report shape includes "next-arc options" as forecast, not as ask.

3. **Operator-strategic boundary** is at mid-arc Section 2 stagger decisions (Batch 4 + Batch 7 in each Track C arc) and at scope-decisions like bundle-scope-A vs scope-B (resolved at this doctrine pass). Other batches (1, 2, 3, 5, 6 in each Track C arc) are mechanical / forecasted.

4. **Brief-premise-drift recording in real time** — when a brief assumes something the recon contradicts (phantom `--language` flag, FOOTER_EDUCATIONAL_LEVELS_BY_LOCALE map nonexistence, fast-forward-push default-policy block, `_growth_plan` arithmetic in homepage-featured-decks.json), I surface the drift in the report shape so the next brief / next session-state authoring incorporates the correction. Doctrine-pass commits at major milestones (this one) fold the recordings into CLAUDE.md.

5. **Closeout-batch cross-check discipline** — closeout milestones surface gaps that mid-arc batches miss. NL Batch 7 audit caught the ES Batch 7 retroactive `grado-2` Footer Col 2 omission because the symmetric situation (`groep-4` for nl) made the ES gap visible. Now codified at CLAUDE.md §16.6.

6. **Halt-and-wait at ZIP authoring** — every Track C / Wave brief has a Step 1.1 halt-and-wait when ZIPs are absent. Operator authoring is in flight; CC does not guess. Re-resume on operator "I added them" confirmation.

7. **No deploy on documentation commits** — bracket-tag bypass `[DOCS]` per session-state §11 hygiene; commit + push only; production state unchanged.

---

## §3 Project-in-one-paragraph

LessonCraftStudio is a multilingual K-3 educator catalog platform built on a 29-app worksheet generator foundation, rebuilt from scratch around teachers in international, bilingual, and immersion early-childhood programs. **Post Tier 2 closeout at `d3b4f962` (2026-05-03), 116 decks published across en+de+es+nl with all 4 locales at 100% C-1 catalog coverage simultaneously.** Wave 1 (homepage + footer + topicPage) + Wave 2 (collections + workspace + bulk + share) i18n chrome shipped per Tier 2 locale. Section 2 home-page breadth grid balanced at 4-locale 2/2/2/2 with three-equilibria doctrine (locale + theme + mechanic) per CLAUDE.md §18.4. Free deck catalog is the platform's core; $69/year subscription gates lesson plans + premium themed bundles + workspace tooling per `docs/SUBSCRIPTION-SCOPE.md`. Launch trigger requires 130 content units (116 lesson plans + 14 bundles) per Tier 2 closeout arithmetic — currently zero authored.

Production infrastructure: Hetzner dedicated server, Cloudflare CDN edge, Mac Studio M3 Ultra (headless, on Tailscale) for AI enrichment work, Lemon Squeezy billing.

---

## §4 Current production state (2026-05-03 post `d3b4f962`)

### Catalog
| Locale | C-1 status | Wave 1 chrome | Wave 2 chrome | Footer Col 1 entry |
|---|---|---|---|---|
| en | 29/29 = 100% | n/a (canonical) | n/a (canonical) | ✓ |
| de | 29/29 = 100% | shipped | shipped | ✓ |
| es | 29/29 = 100% | `4e61c24d` | `78d5d737` | ✓ |
| nl | 29/29 = 100% | `e5679d69` | `8bc53301` | ✓ |

**Total decks:** 116 published (29 × 4 locales) + 1 archived (en/picture-path per `0ad626cb`).

### Footer (post `d3b4f962`)
| Locale | Col 1 (byLanguage) | Col 2 (byTopic = themes + educational-levels) | Col 3 (byExerciseType) |
|---|---|---|---|
| en | n/a (own page) | 5 entries | 29 entries |
| de | n/a (own page) | 5 entries | 29 entries |
| es | n/a (own page) | 5 entries (post `d3b4f962` retro fix added grado-2) | 29 entries |
| nl | n/a (own page) | 5 entries (post `d3b4f962` added groep-4 first-time) | 29 entries |

`FOOTER_LANGUAGES` contains 4 entries (en/de/es/nl), all Tier 2 surfaced.

### Section 2 home-page breadth grid
Locale balance: **2-en / 2-de / 2-es / 2-nl** (4-locale)
Theme balance: **4-themed (`{animals}`) / 4-themeless**
Mechanic-diversity: **8 distinct mechanics** (sudoku, shadow-match, addition, wordsearch, grid-match, picture-sort, missing-pieces, chart-count)
Featured (inline-play): `sudoku-en`

Composition (post NL Batch 4 theme-refresh swap at `0bb02030`, held through closeout):
- en: sudoku (FEATURED, themeless), shadow-match (themed/animals)
- de: addition-image-image (themed/animals), wordsearch (themeless)
- es: grid-match (themed/animals), picture-sort (themeless)
- nl: missing-pieces (themed/animals), chart-count (themeless)

### Phase-3.0 W-1 propagation closure
**20-for-20 zero-regression** across the entire ES + NL Track C deck-creation arc. Theme storage convention (locale-agnostic English-canonical at DB; per-locale rendering via topics-taxonomy.json) held cleanly across all 14 commits.

### Build state
- 0 MISSING_MESSAGE warnings on Wave 1+2 namespaces for en/de/es/nl
- 121 MISSING_MESSAGE per-locale on Tier 3+4 (sv/fi/no/it/fr/da/pt) — pre-existing baseline; deferred to Wave 3 + Tier 3 launches per CLAUDE.md §19

### picture-path / picture-trail cross-locale matrix (post `645ca7ff`)
| URL | Status | Source |
|---|---|---|
| /en/decks/picture-trail/ | 200 | `9b2c608e` (en-only canonical) |
| /en/decks/picture-path/ | 404 | `0ad626cb` archive contract holds |
| /de/decks/picture-path/ | 200 | pre-Phase-3a |
| /es/decks/picture-path/ | 200 | `1be13b8a` ES Batch 6 closeout |
| /nl/decks/picture-path/ | 200 | `645ca7ff` NL Batch 6 closeout |
| /nl/decks/picture-trail/ | 404 | no nl deck at this slug |

CLAUDE.md §15.10 cross-locale-OK doctrine documents this pattern.

---

## §5 Locked decisions (carry-forward + new at this doctrine pass)

### Strategic decisions (operator-locked)
1. **Tier 2 = es + nl** (not fr; not other Tier 1.5 candidates). Realized at `d3b4f962`.
2. **Section 2 grid 4-locale 2/2/2/2 baseline** established at NL Batch 1 `d361a03e`. Per SECTION-2-CURATION-v1.md amendment substituting nl for fr at Tier 2 close.
3. **Section 2 grid theme-refresh swap pattern** locked at NL Batch 4 `0bb02030`. Used when prior batch's pair clustered on a single mechanic. Doctrine codified at CLAUDE.md §18.4 (this doctrine pass).
4. **Tier 2 closeout = no Section 2 stagger** — chosen at NL Batch 7 `d3b4f962` with operator pick of Option A. Same shape as ES Batch 7 closeout choice at `eefced25`.
5. **Bundle scope held at 7 × 2 = 14** (en+de canonical) post-Tier-2-closeout per Option A.
6. **Pillar 3 Tools 1+2+5 functional** per Wave 2 chrome shipped (collections + workspace + bulk operations).
7. **CLIL pedagogy lock** for lesson-plan authoring (resolution #1 per `fbff3466` strategic-decisions session).
8. **Per-locale-rows lesson-plan localization** (resolution #5 per `fbff3466`; schema-resolved at `9ba9fa2d`).
9. **Clause (a) interpretation: Path A locked** (axis-keys × locales bound; NOT deck count) — schema-true reading per `LessonPlan @@unique([topicSlug, language])`. Tier 1+2 (4 locales) = 156 plans; +14 bundles = 170 launch-trigger units. Path B reading from prior doctrine pass (130 units assuming 116 plans) superseded post-`project_mass_publish_recon.md` finding + this 2026-05-04 doctrine pass.
10. **Cooperation-pattern locked through clause (a) closure (Q2 final).** Lesson-plan production = CC drafts + copilot reviews + CC revises. Mac Studio AI-assist arc removed from Pillar 1 dependency chain; reframed as candidate for OTHER content pipelines (Topic embeddings, deck enrichment, OG image generation, alt-text/meta enrichment). Established at `e912b805` Phase 1c apply.
11. **Theme axis-key registration: Path X 1:1 with image-library locked at 100 axis-keys** (50 color + 50 BW; backgrounds + borders excluded per content-vs-decoration distinction). Established at `134614dc` (color) + `947ad260` (BW). Auto-derivation rule from `image_themes.displayNames` per locale; Option A fallback for `household_bw` es displayName collision.
12. **`pt = BR canonical`** — single-locale registration (no European Portuguese variant). Established at `589fd554` (PT-BR Track A + Wave 1). Cross-system-boundary parentheticals reflect platform age-ranges, not BR-specific school-system boundaries.
13. **`no = bokmål canonical`** — single-locale registration (no nynorsk variant). Established at `a47ea021` (Nordic 4-locale Track A + Wave 1). Norwegian descriptor-differentiation pattern parallel to it/fr/pt despite Germanic family.
14. **Full 11-locale platform substrate complete at `a47ea021`.** Track A + Wave 1 shipped for all 11 locales (en/de/es/nl/it/fr/pt/sv/da/no/fi). Deck-publish unblocked for any (axis-key × locale) combination. Track C deck-creation per locale = open commission post-substrate-complete (not §19-sequence-gated).

### Doctrine extensions (CLAUDE.md amendments at the `b57e26f7` doctrine pass + 2026-05-04 doctrine pass + a47ea021-arc doctrine pass)
- **§13 one-sentence summary** updated for Tier 2 closeout state + next-arc options (`b57e26f7`)
- **§15.10 cross-locale-OK extension** — archived (en, slug) doesn't block cross-locale INSERTs; routing matrix per `1be13b8a` + `645ca7ff` precedents (`b57e26f7`)
- **§15.15 NEW** — publish-bulk per-locale isolation via folder-content control (no `--language` flag exists) (`b57e26f7`)
- **§16.6 NEW** — Footer rendering doctrine: Pass 7b F4 honesty + closeout-batch Col 2 surfacing discipline + age-range-to-axis-key mapping + FOOTER_TOPICS_BY_LOCALE-merges-axes (no separate FOOTER_EDUCATIONAL_LEVELS_BY_LOCALE map exists) (`b57e26f7`)
- **§18.4 NEW** — Section 2 breadth-grid three-equilibria doctrine (locale + theme + mechanic; mid-arc theme-refresh swap pattern) (`b57e26f7`)
- **§A.12 NEW** — Fast-forward push default policy (plain `git push` for fast-forward; `--force-with-lease` reserved for genuine history rewrites) (`b57e26f7`)
- **§3.4 EXTENDED** — Pillar 1 cooperation-pattern locked; Mac Studio removed from Pillar 1 dependency chain (2026-05-04)
- **§11 EXTENDED** — Mac Studio reframed as deterministic-AI candidate for OTHER content pipelines (2026-05-04)
- **§16.5.1 NEW** — Theme axis-key registration Path X 1:1 with image-library `type='images'`; 100 axis-keys; backgrounds + borders excluded (2026-05-04)
- **§17.4.1 NEW** — Dual-slug convention: topic-page URL (native-language) vs LessonPlan.topicSlug (English-canonical) (2026-05-04)
- **§17.8.5 EXTENDED** — ASCII-fold edge case examples from theme registration (2026-05-04)
- **§17.9 NEW** — Pillar 1 lesson-plan production discipline (schema-authority, voice register, closure forward-pointer, fix-tool-not-content, dry-run gate, formal-register, illustrative-example framing) (2026-05-04)
- **§A.5.1 NEW** — Schema migrations require two-step deploy + `prisma migrate diff` for no-DB generation path (2026-05-04)
- **§A.7.1 NEW** — image_themes Spanish-displayName data-quality issue (home_bw + household_bw collision) (2026-05-04)
- **§A.8.1 NEW** — Pre-commit hook bypass exception for [SCHEMA] commits (2026-05-04)
- **§6 EXTENDED** — Full 11-locale platform substrate complete milestone marker at `a47ea021` (a47ea021-arc)
- **§17.4.2 NEW** — Per-locale name parentheticals reflect platform age-range (4-of-11 descriptor-differentiate at preschool/kindergarten boundary) (a47ea021-arc)
- **§17.4.3 NEW** — Descriptor-differentiation pattern is structural, not Romance/Germanic divide; cross-locale audit table inline (11 rows × 6 cols transposed) (a47ea021-arc)
- **§17.4.4 NEW** — Cross-system-boundary parentheticals as acceptable trade-off (platform age-range frame at axis-key abstraction layer) (a47ea021-arc)
- **§17.4.5 NEW** — Class 2 collision per-locale variance: es+it collide (Hogar BN/Casa BN); 9 others distinct; Option A fallback per-locale (a47ea021-arc)
- **§17.5.1 NEW** — NSR-flag pattern for Nordic / non-Romance commissions; deferred-review identification in commit messages (a47ea021-arc)
- **§A.7.2 NEW** — image_themes accent-data-quality cycle multi-locale (pt+it+sv+da+no+fi findings; sweep when prioritized) (a47ea021-arc)
- **§A.7.3 NEW** — fr Class 2 documentation correction from `9ea577fe` (audit-trail completeness) (a47ea021-arc)
- **§19.5 NEW** — Launch-state update post-substrate-complete: Tier 1+2 catalog complete; Tier 3+4 substrate complete; Track C remaining as open per-locale commissions (a47ea021-arc)

### docs/SUBSCRIPTION-SCOPE.md amendment at the `b57e26f7` doctrine pass + 2026-05-04 doctrine pass
- **Launch readiness arithmetic at `b57e26f7`** — clause (a) realized at 116 plans (Path B reading); clause (b) held at 7×2=14 per Option A; total launch-trigger scope = 130 content units
- **Path A clarification at 2026-05-04** — clause (a) rewritten to schema-true reading: 156 plans Tier 1+2 (axis-keys × locales bound); +14 bundles = 170 launch-trigger units. Supersedes Path B framing.

### Operational decisions (carry-forward)
- **Folder-content control** = per-locale safeguard; archive prior batch ZIPs to `.tier2-trackc-batch-N-{cluster}-{locale}/` before SCP
- **Plain `git push`** = fast-forward default; `--force-with-lease` blocked by agent safety policy and unnecessary for fast-forwards
- **Theme storage** = locale-agnostic English-canonical at DB layer (`{animals|vehicles|food|fruit}`); per-locale rendering via topics-taxonomy.json
- **Two-step deploy** required only for chattr-immutable source-edits; not required for nl.json / es.json / Footer.tsx / homepage-featured-decks.json edits
- **Out-of-tree handoff artifacts** per CLAUDE.md §10.4: `MEMORY.md` index + `memory/` directory + `CONVERSATION-HANDOFF.md` + `CLAUDE-MD-UPDATES.md` + this `memory/SESSION-STATE.md`

---

## §6 Complete commit timeline

### Pre-arc baseline (state at upload 2026-05-02)
- `4e61c24d` — Tier 2 i18n Track B Wave 1 (es) — homepage + footer + topicPage es message keys
- `305ec681` — Tier 2 i18n Track C Batch 3 (es) — literacy cluster
- `5a3e6988` — Tier 2 i18n Track C Batch 2 (es) — math cluster
- `035852c3` — Tier 2 i18n Track C Batch 1 (es) — matching cluster (first-es Section 2 stagger)
- `cbabd7e5` — Tier 2 i18n Track A — registers es + nl in TOPIC_LOCALES + topics-taxonomy.json (38 standard axis-keys × es + nl)
- `9ba9fa2d` — Catalog-side §8.1 models commissioned (9 tables across 3 migrations; per-locale-rows lesson-plan localization schema)
- `fbff3466` — Subscription-scope amendment (6 open decisions resolved)
- `e7a055cc` — docs/SUBSCRIPTION-SCOPE.md check-in

### Arc commits since `4e61c24d` (14 commits to HEAD `d3b4f962`)
| # | Commit | Summary |
|---|---|---|
| 1 | `b18b8654` | Tier 2 Track C Batch 4 (es) — visual+puzzle + Section 2 grid Option D stagger 41→55% |
| 2 | `a24b582a` | Tier 2 Track C Batch 5 (es) — puzzle+search residuals |
| 3 | `1be13b8a` | Tier 2 Track C Batch 6 (es) — math-worksheet + picture-path closeout (cross-locale-OK case) |
| 4 | `eefced25` | Tier 2 Track C Batch 7 (es) — closeout 7 apps; **es 29/29 = 100%** |
| 5 | `e5679d69` | Tier 2 Track B Wave 1 (nl) — homepage + footer + topicPage NL message keys |
| 6 | `78d5d737` | Tier 2 Track B Wave 2 (es) — collections + workspace + bulk + share es message keys |
| 7 | `8bc53301` | Tier 2 Track B Wave 2 (nl) — collections + workspace + bulk + share nl message keys |
| 8 | `d361a03e` | Tier 2 Track C Batch 1 (nl) — matching cluster + Section 2 first-nl-publish stagger (4-locale establishment) + Footer nl surfacing |
| 9 | `3a61c452` | Tier 2 Track C Batch 2 (nl) — math cluster + Footer educational-level surfacings (peuterklas + groep-3) |
| 10 | `8ce112b5` | Tier 2 Track C Batch 3 (nl) — literacy cluster |
| 11 | `0bb02030` | Tier 2 Track C Batch 4 (nl) — visual+puzzle + Section 2 theme-refresh swap (Option D extended) |
| 12 | `9266130b` | Tier 2 Track C Batch 5 (nl) — puzzle+search residuals |
| 13 | `645ca7ff` | Tier 2 Track C Batch 6 (nl) — math-worksheet + picture-path closeout (4-locale cross-locale-OK matrix) |
| 14 | `d3b4f962` | Tier 2 Track C Batch 7 (nl) — closeout 7 apps + retroactive grado-2 (es) + groep-4 (nl) Footer Col 2 fix; **nl 29/29 = 100%; all 4 locales at 100% C-1 simultaneously** |

### This doctrine pass commit (HEAD post-apply, TBD SHA)
- `[DOCS]` Doctrine pass — Tier 2 closeout cycle (CLAUDE.md §13/§15.10/§15.15/§16.6/§18.4/§A.12; SUBSCRIPTION-SCOPE.md launch-trigger arithmetic + bundle scope A)

---

## §7 Persistent dirty working tree

`git status` carries forward ~947 pre-existing items (deleted images / sample regenerations / etc.) that predate the arc. Do not touch. Filed in deferred-items queue. Does not affect commit hygiene because per-commit staging is explicit (only the touched file paths added).

---

## §8 Reference uploads

The `important/` folder at the root holds operator-curated reference uploads:
- CLAUDE.md (in-tree at root; this file is the source of truth, the upload is a snapshot)
- CONVERSATION-HANDOFF.md (out-of-tree; eighth handoff 2026-04-30; stale post-Tier-2-closeout — supersedes itself with this SESSION-STATE.md)
- HOMEPAGE-SAVE-STATE.md (out-of-tree; positioning + page-architecture lock)
- SESSION-STATE.md (the upload baseline 2026-05-02; superseded by THIS file post-doctrine-pass)
- SUBSCRIPTION-SCOPE.md (in-tree at `docs/`; this file is the source of truth)

The canonical session-state is now `memory/SESSION-STATE.md` (this file). The `important/SESSION-STATE.md` upload baseline is preserved for diff reference but should not be re-loaded as authoritative.

---

## §9 Operational patterns this arc

Six patterns matured across 14 ES + NL Track C commits + 3 Wave commits + this doctrine pass:

1. **Cadence-pattern across mirrored locale arcs.** ES Track C 7-batch arc (`b18b8654`–`eefced25`) and NL Track C 7-batch arc (`d361a03e`–`d3b4f962`) are structurally identical: 4-4-4-4-4-2-7 ZIP cadence (matching / math / literacy / visual+puzzle / puzzle+search / math-worksheet+picture-path / closeout). 14 batches total at zero Phase-3.0 W-1 regressions.

2. **Operator-strategic boundary.** Mid-arc Section 2 stagger decisions (Batch 4 + Batch 7) are operator-strategic. Batches 1-3 + 5-6 are mechanical / forecasted. Brief tail notes at Batch 3 + 6 reserve "next batch may need stagger decision" for the next batch's commission.

3. **Brief-premise-drift recording in real time.** Each batch report's "any new premise drifts" section captures CLI-flag / Footer-map-name / push-flag / metadata-claim drifts as they surface. Doctrine-pass commits fold accumulated drifts into CLAUDE.md (this commit folds 4 such drifts).

4. **Two-phase commission for non-trivial work.** NL Wave 1 + ES Wave 2 + NL Wave 2 + this doctrine pass all used recon+draft+halt → apply pattern. Operator approves drafts wholesale or with mechanical revisions.

5. **Strategic arc-sequencing is copilot call.** Operator confirmed via direct correction. Session-end report shape includes "next-arc options" as forecast, not as ask.

6. **Closeout-cross-check discipline.** NL Batch 7 audit caught the ES Batch 7 retroactive `grado-2` Footer Col 2 omission — symmetric situation made the gap visible. Now codified at CLAUDE.md §16.6.

---

## §10 What comes next — current arc-pick options post-Tier-2-closeout

The Tier 2 catalog is fully sealed. No technical-architecture obligation forces a particular next arc. Operator weights per business priority:

### Pillar 1 — Lesson-plan authoring (launch-trigger-gating clause a)
- Scope: **156 lesson plans** at Tier 1+2 (Path A: 39 axis-keys × 4 locales) per `LessonPlan @@unique([topicSlug, language])` schema; locked at 2026-05-04 doctrine pass. Supersedes prior 116-plan Path B framing.
- Pedagogy: CLIL (locked at `fbff3466`)
- Localization: per-locale rows (locked at `fbff3466` + schema-resolved at `9ba9fa2d`)
- **Production pattern: cooperation-pattern locked** (CC drafts + copilot reviews + CC revises). Mac Studio AI-assist arc removed from Pillar 1 dependency chain post-`e912b805` Phase 1c apply. Q2 final resolution per CLAUDE.md §3.4.
- 4 reference plans authored at `e912b805` (en/de × addition+sudoku); 152 remaining.
- Largest single commitment toward launch trigger

### Pillar 2 — Themed-bundle authoring (launch-trigger-gating clause b)
- Scope: 14 paired bundle/lesson-plan units (7 bundles × 2 Tier 1 locales) per bundle-scope-A this commission
- 7-bundle launch list locked per `fbff3466` resolution #3
- Filed for follow-on commission
- Smaller scope than Pillar 1; could ship before Pillar 1 or in parallel

### Tier 3 launch (sv / fi / no)
- 4-batch+ Wave 1+2 chrome arc per locale + 7-batch Track C arc per locale = ~33 commits per locale
- Mirror ES + NL arc structure
- No business-blocking dependency; opens new market reach
- Per CLAUDE.md §19 launch sequence
- **Track A + Wave 1 substrate complete at `a47ea021` (Nordic 4-locale arc).** Tier 3 launch reduces to: Wave 2 advanced chrome + Track C deck-creation per locale. Substrate-complete state means publish-capacity is unblocked; commission shape simpler than ES/NL Tier 2 arc.

### Track C deck-creation (post-substrate-complete, per CLAUDE.md §19.5)
- Substrate-complete locales available for deck-publish: `it`, `fr`, `pt`, `sv`, `da`, `no`, `fi` (continuation in `es`/`nl` post-Tier-2-closeout also in scope)
- No §19-sequence gate post-substrate-complete; operator picks per strategic priority
- Track C arc shape mirrors Tier-2 precedent (cluster batches × locale × dominant-level)
- Open commission; not pre-prioritized at this doctrine pass

### Wave 3 chrome (support + billing + auth + legal long-tail)
- ~120-200 keys per locale across 4 namespaces
- Operationally large but unblocks nothing strategic
- Could ship per-locale incrementally
- Status quo: pre-existing 121-warning baseline on Tier 3+4 locales

### Tool 2B Favorites surface (engineering closeout)
- DeckFavorite affordance + widget
- Quality-of-life addition to Pillar 3
- Filed at session-state row 583; not yet shipped
- Could ship as small standalone commit

### OG image / SEO content depth
- 1200×630 OG comparison crops for /es + /nl Wave 1 per `78d5d737` + `e5679d69` deferrals
- Section 3 image-based worked-example upgrade
- Quality polish on completed Tier 2 catalog

### Mac Studio deterministic-AI candidates (NOT Pillar 1)

Per CLAUDE.md §3.4 + §11 (2026-05-04 doctrine pass), Mac Studio is reframed as the deterministic-AI workhorse for content-pipelines OTHER THAN lesson plans (Pillar 1 is on cooperation-pattern; locked). Strategic-fit candidates:
- **Topic.embedding generation** per §16.1 (catalog-side embedding-similarity for topic resolution)
- **Deck enrichment** per §4.5 (descriptions, learning objectives, AI-suggested tags)
- **OG image generation** for catalog-deck-route social-share metadata
- **Alt-text + structured-data + meta enrichment** at scale across 11 locales

Architecturally ready per CLAUDE.md §15.3. No blocking dependency. Could backfill enrichment on the 116-deck catalog. Operator gates per Mac Studio operational availability.

Operator-strategic call as to which arc starts next. Recommend operator weights: launch-trigger Pillar work (1 or 2) advances toward `HOMEPAGE_SUBSCRIBE_MODE=subscribe` flip; Tier 3 launch advances multilingual reach; everything else is parallel-track polish.

---

## §11 Anti-patterns to avoid

Carry-forward + arc additions:

1. **Don't reference `FOOTER_EDUCATIONAL_LEVELS_BY_LOCALE`** — that map doesn't exist. Educational-levels share `FOOTER_TOPICS_BY_LOCALE` map with themes per CLAUDE.md §16.6.

2. **Don't propose `--language=<locale>` flag for publish-bulk** — folder-content control is the safeguard per CLAUDE.md §15.15.

3. **Don't default to `--force-with-lease` for fast-forward pushes** — agent safety policy blocks; plain `git push` works per CLAUDE.md §A.12.

4. **Don't skip Footer Col 2 audit at closeout batches** — `crossword`-shipping batches surface new educational-level axis-keys (grade-2). Audit Col 2 vs DB age_range distribution per CLAUDE.md §16.6.

5. **Don't bundle multiple operator-strategic decisions in a single AskUserQuestion** when each warrants independent framing. Mid-arc Section 2 stagger + retroactive Footer fix at NL Batch 7 worked because both were grid/Footer concerns; would not work to bundle e.g. Section 2 stagger + bundle-scope-A in same question.

6. **Don't pick the next arc autonomously** when multiple arcs have business-priority-equivalent merit. Surface forecast in §10 of session-state; let operator weight.

7. **Don't commit handoff artifacts in git** — `memory/`, `MEMORY.md`, `CONVERSATION-HANDOFF.md`, `CLAUDE-MD-UPDATES.md`, `SESSION-STATE.md` are out-of-tree per CLAUDE.md §10.4.

8. **Don't deploy on documentation-only commits** — `[DOCS]` bracket-tag bypass; production state unchanged; no `/opt/lessoncraftstudio/deploy.sh` invocation.

---

## §12 End of state + resume point

**Resume point:** the doctrine pass commit at HEAD (TBD SHA post-apply). All Tier 2 work fully sealed. Operator picks next arc per §10 options.

**Next session can:** read this file end-to-end + the Tier-2 doctrine extensions in CLAUDE.md (§13, §15.10, §15.15, §16.6, §18.4, §A.12) + the Launch-readiness arithmetic in `docs/SUBSCRIPTION-SCOPE.md`. From there, the next arc is operator-pick.

**No outstanding halt-and-surface conditions.** No premise drifts left unrecorded. No unverified production state. Production at 116 / 1 archived; chrome at Wave 1+2 per Tier 2 locale; Footer + Section 2 grid balanced + audited.

This file is the canonical session-state. Replaces all prior versions including `important/SESSION-STATE.md` upload baseline 2026-05-02.

*End of SESSION-STATE.md.*
