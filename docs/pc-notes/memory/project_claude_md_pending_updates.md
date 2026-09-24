---
name: Pending CLAUDE.md updates queued for next-session application
description: Operator-side queue of CLAUDE.md amendments accumulated during prior sessions. Read at session start; apply to CLAUDE.md as a batch; remove the entry once the batch lands and is committed per feedback_claude_md_commit_in_session.md.
type: project
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
**Reading rule:** Read this entry at session start. If items are listed, apply them to CLAUDE.md as a batch in the early part of the session, commit the changes (per feedback_claude_md_commit_in_session.md), and remove the applied items from this file. If empty (no pending items), no action needed.

**Writing rule:** When the operator says "queue this for next-session CLAUDE-MD-UPDATES" or similar, append a new pending item below with: (a) target section heading or specific anchor, (b) what content to add/modify, (c) originating commit/discussion reference, (d) the operator's exact framing (paraphrase risks intent loss).

---

## Pending items

### Tier 2 i18n Track A — structural extension shipped (`cbabd7e5`, 2026-05-02)

**Target site:** §19 (Language launch sequence) — Tier 2 sub-stage now actively in progress.

**Suggested amendment:** §19 Tier 2 sub-section gains a "structural enabler shipped" date-markered note for `cbabd7e5`. Specifically:

> Tier 2 (Spanish, Dutch) — structural extension shipped 2026-05-02 (`cbabd7e5`): TOPIC_LOCALES extended at topic route + sitemap; topics-taxonomy.json populated with 152 es+nl axis-key entries; auth/register email subject extended for nl; Footer per-locale entries gated on per-locale first-deck publish (Section 2 Option D stagger pattern). Track B (subscriber-feature i18n) and Track C (per-locale catalog rollout) follow.

**Companion amendments under §16.5:** Locale coverage line gains note that es+nl are now authored at Tier-2 launch time (was: "Tier 2 (es, nl) folds in at Tier 2 launch"; now: "Tier 2 (es, nl) authored 2026-05-02 at `cbabd7e5`").

**Originating commit:** `cbabd7e5`. Recon `memory/project_tier2_i18n_recon.md`. Section 2 Option D stagger pattern locked at recon; 3-track decoupled arc structure (Track A structural / Track B subscriber-i18n / Track C catalog rollout).

**Out of scope for the §19 amendment:** the bundled audit-confirmed deletions (dashboard.* + 2 schema fns) are codebase hygiene; no doctrine update required. The remaining-9-locales dashboard.* + Arbeitsblatt-Generatoren residuals deferred entries are filed in `project_deferred_items_queue.md`; no doctrine impact.

### Tier 2 i18n Track C Batch 1 — first es deck publish event (`035852c3`, 2026-05-03)

**Target site:** §19 (Language launch sequence) — Tier 2 catalog rollout actively in progress.

**Suggested amendment:** §19 Tier 2 sub-section gains "first es deck publish shipped 2026-05-03 (`035852c3`): es catalog 0→4 rows; Footer Column 1 'Español' surfacing; Section 2 grid composition 3-en/3-de/2-es. Track C continues per-batch."

**Originating commit:** `035852c3`. Tracker `memory/project_tier2_track_c_progress.md`.

### Tier 2 i18n Track C Batch 2 — es math cluster × mixed-level (`5a3e6988`, 2026-05-03)

**Target site:** §19 (Language launch sequence) — folds into the same Tier 2 Track C history sub-block as Batch 1 amendment.

**Suggested amendment:** §19 Tier 2 sub-block extends with: "Track C Batch 2 shipped 2026-05-03 (`5a3e6988`): es math cluster × mixed-level (subtraction-cross-out, code-addition, more-less, math-puzzle × es). es catalog 4→8 (28% C-1 coverage). 2 new es educational-level axis-keys surfaced per F4 honesty: preescolar (3-5, from more-less-es) + grado-1 (6-8, from math-puzzle-es). Footer Column 2: 2→4 axes; Column 3: 4→8 axes. No Section 2 grid stagger this batch (Option D ~50% threshold; next trigger at ≈Batch 4-5)."

**Originating commit:** `5a3e6988`. Tracker `memory/project_tier2_track_c_progress.md`.

**Out of scope for the §19 amendment:** publish-inbound archival hygiene pattern (mirror to Phase-3a `.phase3a-batch-N-*` precedent applied this batch); operational artifact, not doctrine. phase2-real-zips/ residue carry-over remains an operator-side cleanup deferral (filed at Batch 1).

### Tier 2 i18n Track C Batch 3 — es literacy cluster × kindergarten dominant (`305ec681`, 2026-05-03)

**Target site:** §19 (Language launch sequence) — folds into the same Tier 2 Track C history sub-block as Batches 1+2 amendments.

**Suggested amendment:** §19 Tier 2 sub-block extends with: "Track C Batch 3 shipped 2026-05-03 (`305ec681`): es literacy cluster × kindergarten dominant (alphabet-train, prepositions-fillin, word-guess, wordsearch × es). es catalog 8→12 (41% C-1 coverage). All 4 rows land on already-surfaced edu-level axes (no new edu-level surfacings this batch); Footer Column 2 unchanged. Footer Column 3: 8→12 axes. No Section 2 grid stagger this batch. Three Tier 2 batches same-day cadence — matches Phase-3a peak rhythm."

**Originating commit:** `305ec681`. Tracker `memory/project_tier2_track_c_progress.md`.

**Out of scope for the §19 amendment:** publish-inbound archival hygiene pattern carries forward (Batch 2 → `.tier2-trackc-batch-2-math-es/`) — operational artifact, not doctrine. Tier 2 same-day three-batch cadence is observed pattern, not codified rule; documented in Track C tracker, not §19.

### Tier 2 i18n Track B Wave 1 (es) — homepage + footer + topicPage authoring (`4e61c24d`, 2026-05-03)

**Target site:** §19 Tier 2 sub-block — folds in alongside Track A + Track C history entries.

**Suggested amendment:** §19 Tier 2 sub-block extends with: "Track B Wave 1 (es) shipped 2026-05-03 (`4e61c24d`): 88 leaf keys across homepage + footer + topicPage namespaces. Native ES authoring per Section 3 thesis. Address-form locked at formal usted (mirrors DE Sie lock from `078501a6`). Replaces pre-pivot seller-era es.json homepage + footer schema. Footer reconciled to en+de full pattern; cross-locale footer.tagline + extended copyright dropped per Wave 1 scope discipline."

**Originating commit:** `4e61c24d`. Tracker `memory/project_tier2_track_b_progress.md`.

### ES address-form lock — §17 doctrine amendment (parallel to DE Sie lock from `078501a6`)

**Target site:** §17 (public site rebuild and SEO) — most likely a new sub-section §17.X codifying per-locale address-form locks for the public surface, OR §17.4 ("SEO as a structural design principle") with an address-form note.

**Suggested amendment:** Codify the per-locale address-form lock pattern that's now in force across Tier 1 (DE Sie) + Tier 2 (ES usted):

> **Address-form lock per locale.** Each locale's public surface (home page + footer + topic pages + future subscriber-feature surfaces in that locale) commits to a single second-person register at first-shipping. Subsequent authoring within the locale must mirror that register — switching mid-surface reads as inconsistency to native readers and undercuts the platform's professional positioning. Current locked registers:
> - **DE:** formal `Sie` (locked at `078501a6` Home Page Copy v1; mirrored across Footer + Section 2 + Section 3 + Section 4 + Section 5 + topicPage chrome)
> - **ES:** formal `usted` (locked at `4e61c24d` Track B Wave 1; same scope coverage; chosen per K-3-educator-respecting professional register; lands across both Latin American and Peninsular Spanish)
> - **NL** (when Wave 1 nl ships): TBD at first-shipping; recommend formal `u` to mirror DE/ES discipline.
> - **Tier 3-4 locales:** address-form decision is part of the first-shipping commission for that locale.

The §17 lock makes the precedent explicit so future locale-launch sessions don't drift toward informal `tú` / `du` / `je` register out of casual translation reflex.

**Originating commit:** `4e61c24d`. Tracker `memory/project_tier2_track_b_progress.md`.

### Cross-locale footer.tagline + extended copyright add (deferred queue entry)

**Target site:** N/A doctrine — this is a candidate cross-locale footer add that should go to `memory/project_deferred_items_queue.md` not CLAUDE.md amendment queue. Adding here for traceability since it surfaced at Wave 1.

Operator framing at HALT POINT 1: "If the tagline is worth adding, that's a separate cross-locale Footer pass that would touch en + de + es in one commit with proper review. Folding it into Wave 1 would expand scope and create the kind of unilateral cross-locale change that should go through its own adjudication. Drop. File for deferred queue if anyone wants to pursue it later."

Will file in deferred-items-queue alongside the Tier 2 Track A "Arbeitsblatt-Generatoren residuals" entry post-this-session if not already.

### Theme-string storage convention codification — §15 doctrine reinforcement (operator's Amendment 5 instruction)

**Target site:** §15 (catalog data pipeline). Most likely §15.1 (three-layer manifest) or new §15.X subsection on storage-vs-rendering separation for content classifiers.

**Suggested amendment:** Codify the storage-vs-rendering split for `theme` (and any future content-classifier columns) so future copilot prompts don't drift back to the wrong framing that conflated theme (locale-agnostic) with slug (locale-asymmetric per §16.5 / Batch 5b). Specifically:

> **Theme (and content-classifier columns generally) store locale-agnostic English-canonical keys at the DB layer.** Localization happens at the rendering layer via `topics-taxonomy.json`'s `theme.<axis-key>.name.<locale>` and `slug.<locale>` lookup. Example: `subject_tags={animals}` in DB renders as `/en/topic/animals/` (English), `/de/topic/tiere/` (German native slug), `/es/topic/animales/` (Spanish native slug) — all from the same canonical tag.
>
> **Slug (URL-bearing field) is locale-asymmetric** per §16.5 + the Batch 5b precedent (picture-path/picture-trail). The two fields look superficially similar but serve different architectural roles:
> - **Theme** = content classifier; cross-locale filtering requires locale-agnostic tags; localization is presentation-layer.
> - **Slug** = URL component; per-locale URL identity matters; locale-asymmetric source-edit at the apps' generation code is the correct pattern (see Batch 5b-1 commit `67d5d99d`).
>
> Conflating these produces the false-premise halt-trigger pattern that surfaced at Tier 2 first-row event (`035852c3`): the prompt asserted DE rows store `{Tiere}`; production proves DE rows store `{animals}`. CC's halt-and-surface caught the conflation against actual production state.

**Canonical example for the doctrine entry:** Tier 2 first-row event (`035852c3`). 24 existing en+de themed rows store `{animals}`; 2 new es themed rows from Batch 1 store `{animals}`; locale-rendering produces `/en/topic/animals/`, `/de/topic/tiere/`, `/es/topic/animales/` from the same canonical tag.

**Originating commit:** `035852c3` (Track C Batch 1) + recon at `memory/project_tier2_i18n_recon.md`.

**Operator's exact framing** (preserve intent): "This conflation is worth filing for CLAUDE.md amendment-queue. Add to memory/project_claude_md_pending_updates.md: a §15 amendment item codifying the storage-vs-rendering split for theme tags, with the Tier 2 first-row event as the canonical example. CC was the one who caught the conflation; the doctrine deserves to be explicit so future copilot prompts don't drift back to the wrong framing."

---

## Applied items log

### ~~Phase 6 close-out batch (19 items, 2 coherent commits)~~ — APPLIED 2026-04-30 in commits `ec85a594` + `7a73092c`

Two-commit split per established CLAUDE.md amendment cadence. Single CLAUDE.md file across both commits per `b03ff5c9` / `388dd7d6` / `86a3b9be` precedent for "many items, one commit when coherent." MEMORY-side artifacts (deferred-queue strike-through, queue close-out, phase-status update, 5 new methodology files) executed as out-of-tree filesystem edits per §10.4 hygiene clarification — no git commits required.

**Pre-state:** Cloudflare onboarding RESOLVED-BY-ACTION 2026-04-30 (deferred-queue Cloudflare entry struck through; 28 → 27 active dormant entries). CLAUDE-MD-UPDATES.md re-queue authorized: 8 items + 11 §15.x carry-forward = 19 pending items. Section F decisions: §15.3 (AI service) unchanged; nginx 301 lives at §A.10; all 3 optionals bundled; methodology entry `feedback_prisma_migrations_through_deploy.md` deferred until Drift Y closes; 5 separate methodology files per `feedback_*` precedent.

**Commit 1 (`ec85a594`) — §15.x publish-flow expansion + §3.5 infrastructure correction.** CLAUDE.md +133 / -2.

| Site | Change |
|---|---|
| §3.5 Cloudflare CDN bullet | Date-markered amendment (activated 2026-04-30; Free plan; orange-cloud proxy; Full (strict) SSL; AI crawlers allowed; selah/sevki nameservers). Pre/post state contrast. |
| §15.2 closing pointer | One-line pointer to §15.4–§15.14. |
| §15.4 strict-arg-parsing contract | Schema-driven parser at `strict-args.js`; unknown-flag error before side-effect; Levenshtein suggestion; `--confirm` for real bulk-publish. Origin `772a3375`. |
| §15.5 edit-in-place contract | Atomicity via `fs.symlinkSync` + `fs.renameSync` (NOT `ln -sfn`); DB-asset-inconsistency failure-mode policy; slug-stable-on-update; `--update-slug` is sole update flag. |
| §15.6 slugify divergence | catalog-export.js v1 hyphenates non-ASCII; publish-cli ASCII-folds per §17.8.5; not load-bearing in v1. |
| §15.7 catalog deck route | nginx location-block resolution; symlink atomic swap; canonical URLs are `www.lessoncraftstudio.com`; cross-ref to §A.10 nginx 301. |
| §15.8 Cloudflare cache-invalidation policy | 5-min short-TTL via origin `Cache-Control`; CF honors origin; NOW load-bearing post-2026-04-30. |
| §15.9 `_collisions.txt` differentiation | Published vs archived row collision recommendations; closes loop with §15.10. Origin `0ad626cb`. |
| §15.10 block-on-archived UPDATE | `publish.js` rejects `--update-slug` on non-published rows; structured rejection text; compound unique constraint mechanism. Origin `0ad626cb`. |
| §15.11 unpublish handler | Single-deck-only CLI; FS-first DB-last pipeline; `unpublishAssets` symlink-removed-first ordering. Origin `0ad626cb`. |
| §15.12 archive folder structure | `<slug>-pruned-<utc>/` + `<slug>-unpublished-<utc>/` namespace coexistence in `.archived/<locale>/`. Cleanup-cron deferred to trigger. |
| §15.13 dry-run-vs-real parity | Per-deck staging byte-identical via `diff -r`; `_summary.txt` diverges by design; `_results.txt` + `_failures/` real-mode-only. Origin Sub-phase 5.7. |
| §15.14 asset placement / OG / pruning | `lcs-media:lcs-media` 755/644 ownership; `ensureLocaleDir` chown; OG image via Sharp 1200×630 composite; KEEP_VERSIONS=3 pruning to `.archived/`. |
| §17.8.5 | ASCII-fold spec implementation confirmation paragraph. |
| §17.8.6 | Per-tier i18n coverage status paragraph. |
| §17.8.7 | v2-forward-compatibility paragraph for sibling-list parameter. |
| §A.10 NEW | nginx www-canonicalization 301 mechanism. Existing §A.10 (More detail) renumbered to §A.11. |

**Commit 2 (`7a73092c`) — §8.1 / §14.10 / §10 / §17.5 / §11 corrections + queue close-out.** CLAUDE.md +18 / -1.

| Site | Change |
|---|---|
| §8.1 D1 (`contentFamilyId`) | Field added to Deck model sample between `version` and `createdAt`; sample matches Phase 1 `4b91adc0` shipped reality. |
| §8.1 D2 slug field | `slug String @unique` → `slug String` (`@unique` removed). |
| §8.1 D2 compound unique | `@@unique([language, slug])` added to model index/unique block; sample matches `4b91adc0` shipped reality. |
| §10.4 commit hygiene | Out-of-tree files clarification (MEMORY directory + CLAUDE-MD-UPDATES.md + CONVERSATION-HANDOFF.md persist at filesystem level without commits). |
| §11 queued-post-Brief-B | Catalog-page-share revival; topic destination pages; eleven-deck dry-run; **taxonomy expansion brief NEW**; Group C; §19 longer-arc items. |
| §14.10 D4 canonical-emission | `generator.app` MUST match §14.10 canonical name verbatim; verified at `59a0cde9`. |
| §17.5 NSR cross-ref | 57-key two-population framing (17 organic + 40 bulk-i18n-tier); cross-reference `project_k3_phrasing_native_speaker_review.md`. |

**Methodology MEMORY entries authored (out-of-tree; not committed per §10.4 hygiene):**

- `feedback_documentation_against_real_emitter.md` — D3 §16.5 placeholder names + D4 `topics-taxonomy.json` `picture-sudoku` key. Generalized: documentation/config authored against real emitter, not mental model.
- `feedback_brief_review_against_explicit_rules.md` — 5 instances cited (Phase 3 v2 §A.3; Phase 3 v3 atomicity; Phase 3 v3 ship-only-what's-verified; pre-Phase-4 cheerio; addition-image-image-2 strict-arg). Generalized: brief review against real underlying constraints.
- `feedback_decision_premise_verification.md` — Phase 5 v1→v2 brief lockdown (operator-supplied Q2 reasoning had wrong schema-cost claim; substantive direction held). Generalized: decision premises verified against real codebase state.
- `feedback_infrastructure_claim_verification.md` — Sub-phase 5.8 Cloudflare-CDN aspirational claim. Generalized: infrastructure claims verified against actual production state. Promoted from candidate to confirmed.
- `feedback_queue_writeback_discipline.md` — Phase 5 sealing queue-vs-mental-model drift. Generalized: at end of every session, items mentioned in handoff-rhetoric must be written back to canonical queue files. Promoted from candidate to confirmed.

**`feedback_prisma_migrations_through_deploy.md` DEFERRED** per Section E.4 — prescriptive methodology lands on weaker ground while Drift Y (`20251122011743_add_language_to_blog_pdfs` folder-missing) is open. Queued under prisma-migration-history-drift family in `project_deferred_items_queue.md` for draft when Drift Y resolves at next migration touch.

**Drift caught and corrected inline during application:**
- §A.10 numbering: existing "More detail" subsection at §A.10 had to be renumbered to §A.11 to make room for nginx 301 at §A.10. Inline fix.
- Queue file Pending-items section had to be replaced atomically (couldn't do as separate edits because the 19-item block spanned ~65 lines); achieved via single Edit replacement + this Applied-items entry.

**Cross-reference verification at apply-time (all PASS):** §15.7 → §A.10 (nginx 301) ✓; §15.8 → §3.5 ✓; §15.10 → §17.8.5 ✓; §A.10 → §15.7 + §15.8 + §3.5 ✓; §11 → §15.7 ✓; §17.5 → `project_k3_phrasing_native_speaker_review.md` ✓; §14.10 canonical-emission → 29 apps verified at `59a0cde9` ✓.

**MEMORY-side artifacts updated 2026-04-30 (out-of-tree, no commit):**
- `project_deferred_items_queue.md` — Cloudflare entry struck through with 2026-04-30 resolution; E.4 deferred-methodology entry appended to prisma-migration-history-drift family Drift Y.
- `project_brief_b_phase_status.md` — Phase 6 status flipped blocked → in-progress with full pre-state and commit-split documentation.
- `project_claude_md_pending_updates.md` — this entry; Pending items reset to empty.

**Pending-updates queue cleared.**

---

### ~~Social-share-v1 Sub-phase E close-out batch~~ — APPLIED 2026-04-28 in commit `388dd7d6`

Single focused commit applying the social-share-v1 Sub-phase E queue at brief seal. Per the established `b03ff5c9` precedent for "many items, one commit when coherent."

**§14.3a addition:**
- New `buildShareAffordance({canonicalURL?, locale, title})` bullet between `buildSrPuzzleSummary` and `vocabKeyFromImage` in the public API list. Resolution order documented (canonicalURL-as-is → locale+title-via-`slugify` → defensive skip per §17.8.11). Self-contained constraint per §14.1: helper returns snippet baked at generation time; deck.html does NOT load catalog-export.js at runtime. **String resolution uses bare-`translations` identifier per §17.8.14 convention** (Sub-phase A.1 hotfix `bbcb444c` corrected initial `global.translations` typo). Originating commits cited: Sub-phase A (helper) → Sub-phase A.1 (`bbcb444c`) → Sub-phase C (`ea8e006a`, DE keys).

**§17.8.15 new subsection:**
- In-deck share affordance: placement (top-right of `lcs-bar` after `.lcs-mute`, 40×40 `.lcs-share`), Web Share API progressive-enhancement contract (mobile/capable → OS-native sheet in OS display language not under helper control; non-capable → self-contained 5-platform overlay in deck content-locale), v1 platform set locked (FB / WhatsApp / Pinterest / email / copy-link; skipping X / LinkedIn / Reddit / Threads / Bluesky), pre-filled captions empty (locked), no platform JS SDKs (locked), share-intent URL templates documented per platform, defensive-skip cross-reference §17.8.11, second-consumer note for §17.8.14 srLang-keyed lookup convention, v1 Option A predicted-slug-fallback constraint with two deferred-queue trade-offs cross-referenced (collision-suffix; English-title-derived slug regardless of content locale), out-of-scope cross-reference to deferred catalog-page-share work post-Brief-B, tier-neutral + SEO-neutral parallel to attribution (§14.3).

**§15.2 cross-reference:**
- New "Note on `bundle.canonicalURL`" paragraph after step 5: v1 does NOT promote canonicalURL to a proper bundle field; in-deck affordance uses predicted-slug fallback per Option A; proper bundle field arrives when publish-cli ships AND catalog deck route exists. Cross-references §17.8.15 and the two filed trade-offs.

**Cache-buster cross-check at apply-time** (curl-verified on production):
- `catalog-export.js?v=9` ✓ (Sub-phase A bumped to v8, Sub-phase A.1 hotfix bumped to v9)
- `translations-shared.js?v=4` ✓ (Sub-phase A bumped to v3, Sub-phase C bumped to v4)
- §14.3a opening paragraph reference `?v=7` updated to `?v=9` to match served state.

**Cross-reference verification:** all internal cross-references (§14.3a → §17.8.15; §17.8.15 → §17.8.11 / §17.8.14 / §17.8.5 / §17.4 / §14.3 / §4.4 / §14.1; §15.2 → §17.8.15) verified pointing to real existing sections.

**Drift caught and corrected inline (per index-content-coherence audit):**
- `MEMORY.md` index entry on `project_deferred_items_queue.md` said "Active (12)" but the file actually had 13 active items at session start (the existing `Social-share v1: predicted-slug vs publish-cli collision-suffixing` entry was missing from the inline summary). Pre-existing drift unrelated to this batch.
- `CLAUDE-MD-UPDATES.md` queue's "Deferred-queue cross-references (filed during execution)" section claimed two items had been "Filed in `project_deferred_items_queue.md` under social-share-v1 family" — but the actual file had no such entries. Drift between rhetoric and reality. The two items (`404 user-experience trade-off` filed at Sub-phase B PASS; `Catalog-page share work deferred` filed at Phase 0 reconnaissance) are written into `project_deferred_items_queue.md` as part of this Sub-phase E close-out batch.

**Deferred queue additions** (5 entries: 2 drift-fix + 3 new from operator's brief items 5/6/7):
1. (drift-fix) `Social-share v1: 404 user-experience trade-off (catalog deck route absent)` — claimed-filed at Sub-phase B PASS but not actually in the file; written now.
2. (drift-fix) `Social-share v1: catalog-page-side share work deferred (post-Brief-B)` — claimed-filed at Phase 0 reconnaissance but not actually in the file; written now.
3. (new, brief item 5) `Social-share v1: apps hardcode English title literal in bundle.title` → predicted slug is English-letter regardless of content locale. Resolves when apps propagate localized title AND publish-cli ASCII-folds.
4. (new, brief item 6) `Social-share v1: slugify converts non-ASCII to hyphens` at `catalog-export.js:90`, not ASCII-folds (§17.8.5 spec mismatch). Bounded for v1 (apps' bundle.title is currently ASCII-only).
5. (new, brief item 7) `Social-share v1: deck.html runtime STRINGS table has only en block` — cross-cuts all interactive-HTML decks; pre-dates social-share-v1; revisit when a future translation-debt brief drafts.

Index updated `Active (12)` → `Active (18)` (one drift fix from 12→13 to include existing predicted-slug + 5 new entries = +6 from indexed perspective; net +5 to file).

**Pending-updates queue cleared.**

---

### ~~Add `vocabKeyFromImage(img)` to §14.3a's helper list~~ — APPLIED 2026-04-28 in commit `0c3e8ffe`

- New §14.3a section landed between §14.3 (attribution module) and §14.4 (porting recipe), enumerating all 6 public-API entries on `window.LCSCatalogExport`: `buildSeoHead`, `buildEndDeckLinks`, `buildSrRows`, `buildSrPuzzleSummary`, `vocabKeyFromImage` (the new addition with three-image-source dispatch documentation), `HREFLANG_MARKER`, plus the `export()` entry point.
- Cross-references to §17.8.x and Brief A §4 / §5.4 / §5.5 / §14.10 verified to point at existing sections.
- Originating commit (helper itself): `1ebf4b78` (eb510be4.2).
- Pending-updates queue cleared.

### ~~Group B Phase 1-4 close-out batch (9 items)~~ — APPLIED 2026-04-28 in commit `b03ff5c9`

Single focused commit applying the 9-item queue accumulated across Group B Phase 1, Phase 2, hotfixes, and Phase 3. Per the established discipline at Phase 4 close.

**§14.3a additions (2 items):**
- §14.3a.1 Bundle-shape contract extensions (Phase 1) — sudoku `uniqueImageKeys` (28.3.0, `9b54ae4b`); cryptogram `cipherMap` with legendSlots-filtered minimum-needed shape (16.2.1, `ac573fe4` → `5775b9c1`); picture-path `startCellImage` / `endCellImage` / `endpointCount` / `legend.items[].vocabKey` with mode-asymmetric population (29.4.2, `5bfa496c` → `8fc9f522` → `a3697abe`). Cross-references the structural-vs-identity coverage dimension (dimension 6) in `feedback_coverage_dimensions_emerge_from_postmortems.md`.
- §14.3a.2 Number-word lookup convention for small-cardinality counts (Phase 2) — per-app per-locale lookup tables for K-3-natural rendering. Originating commits: picture-path Phase 2 `75d4a27c` (EN) + Phase 3 `263c67f2` (DE).

**§17.8.4 extension (1 item):**
- Multi-template-variant pattern (Phase 2) — picture-path establishes the 4-key dispatch on `bundle.mode` + secondary discriminators. Originating commit `75d4a27c`.

**§17.8.x new subsections (5 items + 1 placeholder):**
- §17.8.9 Answer-bearing-field hygiene (Phase 0 / Phase 2) — canonical comment pattern at construction sites; Group B Phase 0 inventory of answer-bearing fields including cryptogram's misleadingly-named `cipherLetter`.
- §17.8.10 Row+col 1-indexed indexing convention (Phase 2) — bundle stays 0-indexed; per-app code converts at template-fill time. Verified across 12 Phase 4 Gate 1 decks.
- §17.8.11 Defensive-skip discipline (Phase 2) — sr-only emission skipped entirely on invariant violation; per-app invariant inventory. Originating commits `37cbec62` + `9c9b1b55` + `75d4a27c`.
- §17.8.12 Mode-conditional dispatch with sub-variants (Phase 2) — extension of §17.8.4. picture-path `75d4a27c` + `a3697abe`.
- §17.8.13 List-joiner convention placeholder (Hotfix) — `Intl.ListFormat` with defensive fallback at 3 call sites; promote to `LCSCatalogExport.formatList(items, locale)` at 4th-consumer threshold. Originating hotfix `8f4f9685`.
- §17.8.14 Sr-only-emission srLang-keyed lookup convention (Phase 3) — bypass per-app `t()` helper; use `translations[srLang][key]` directly with three-level fallback. Underlying root-cause documented in deferred-queue. Originating hotfix `573f69e0`.

**Cross-reference verification at apply-time:** all 9 internal cross-references (§14.3a → §17.8.x; §17.8.x → §14.3a / §17.8.2 / §17.8.4 / §17.8.11 / §17.8.12) verified pointing to existing sections.

**Cache-buster cross-check at apply-time:** `catalog-export.js?v=7`, `image-vocabulary.js?v=3`, `translations-shared.js?v=2`, per-app `translations-<app>.js?v=de-i18n-3` for sudoku/cryptogram/picture-pathway. All verified via curl.

**§14.10 canonical 29-app list verified:** 4 PDF-only out (coloring/writing/draw-and-color/drawing-lines); 33 total worksheet apps. No drift.

**Bundle-version cross-check matches deployed:** sudoku 28.3.0 / cryptogram 16.2.1 / picture-path 29.4.2.

**§17.8.x sequencing fixed at apply-time:** initial edit placed §17.8.9-14 before §17.8.8 inadvertently; corrected to §17.8.1 → §17.8.8 → §17.8.9-14 with §17.8.8 ("What this section does NOT change") preserved as the closing-summary entry of the original 8 subsections. Sequencing-fix surfaced and resolved within the same commit.

**Index-content-coherence audit caught one drift:** MEMORY.md `project_deferred_items_queue.md` index entry said "Active (11)" but the file has 12 active entries. Inline-corrected as part of this batch.

**Pending-updates queue cleared.**


---

## Phase-3a arc-closure entries (queued 2026-05-02 post-arc-close at `9b2c608e`)

Phase-3a deck-creation arc closed 2026-05-02 across 5 batches (with Reshape A split: 5a + 5b-1 source-edit + 5b-2 publish). 58/58 = 100% C-1 endpoint reached. Phase-3.0 W-1 forward-fix verified across 7 consecutive deck-creation batches with zero regressions. Four amendment items queued for next CLAUDE.md amendment cycle:

### §14.10 amendment — locale-conditional emission cross-reference

Append note: picture-path is the canonical app name with first shipped instance of locale-conditional `exercise_type` emission for the same canonical app. en emits `exerciseType='picture-trail'` (slug substitution per §15.10 block-on-reuse recovery); de + future locales emit `exerciseType='picture-path'` (canonical). `generator.app` stays `'picture-path'` literal across all locales per the canonical-name-vs-emission contract — only the slug-bearing exerciseType field is locale-forked. Reference Batch 5b-1 commit `67d5d99d` for source-edit shape; Batch 5b-2 commit `9b2c608e` for ship.

### §15.10 amendment — canonical archived-slug recovery pattern

Append worked example: picture-path-en → picture-trail substitution as the canonical pattern for archived-slug recovery. The pattern:

1. **Source-edit at app's catalog-export emission site** — single locale-conditional fork on `exerciseType` (covers both deck_id + exercise_type slug-bearing layers because deck_id is composed downstream from exerciseType inside `catalog-export.js buildDeckId` at line 102). `generator.app` stays canonical per §14.10. app_version minor-bump for behavior change.
2. **`topics-taxonomy.json axes.exercise-type` amendment** — register the new axis-key per affected locale only (other locales continue under canonical slug). Missing-locale-skip per §16.5 doctrine handles non-affected-locale emission of canonical slug.
3. **Footer Column 3 update** — only non-empty axis-keys link out per locale, per Pass 7b F4 honesty discipline. Locale-asymmetric: new-slug entry in affected locale only; canonical-slug entry preserved in unaffected locales.
4. **Operator re-authors ZIP using modified app** — emission produces new slug pattern automatically.
5. **publish-cli pipeline** ships normally (1 INSERT, no slug collision against archived row).
6. **§15.10 seal verification post-deploy** — original archived-slug route stays non-200; new-slug route 200; canonical-slug routes in unaffected locales stay 200.

Reference: Batch 5b-1 source-edit `67d5d99d` + Batch 5b-2 ship `9b2c608e`.

### §15.7 routing-contract amendment — locale-asymmetric routing invariants

Append concrete invariants codified by Batch 5b-2 verification:

- `/en/topic/picture-path/` MUST return non-200 (404) — the (en, picture-path) row is archived per §15.10; archived rows must never leak into the public surface.
- `/de/topic/bildpfad/` MUST return 200 — the (de, picture-path) row is published; canonical-slug routes in unaffected locales stay live.
- `/en/topic/picture-trail/` MUST return 200 — the (en, picture-trail) row is the canonical recovery substitute.
- `/de/topic/picture-trail/` MUST return non-200 (404) — picture-trail axis-key registered en-only in `topics-taxonomy.json`; missing-locale-skip per §16.5 doctrine.

These invariants demonstrate locale-asymmetric routing as a doctrinal pattern, not an edge case. Future CLAUDE.md amendments to §15.7 should cross-reference these as the canonical worked-example.

### Project history entry (§11 status table or project-history section)

Phase-3a deck-creation arc closure entry:
- **5 batches** across 1 calendar day (2026-05-02), with Reshape A split at Batch 5 (5a math-worksheet + 5b-1 source-edit + 5b-2 picture-trail-en).
- **58/58 (29 apps × 2 locales) = 100% C-1 endpoint reached.**
- **9 git commits** (Batches 1+2+3 footers + chart-count locale-fix `877522bc` + Batch 4a + 4b + 5a footers + 5b-1 source-edit + 5b-2 footer) plus **7 publish-cli runtime batches** (no git artifact).
- **6 operator-coordinated handoff cycles** (5 ZIP-author cycles + 1 source-edit-then-reauthor cycle for 5b).
- **Phase-3.0 W-1 propagation closure verified across 7 consecutive deck-creation batches with zero regressions.**
- **Locale-conditional emission established as canonical archived-slug recovery pattern (§15.10).**
- **Side-effect bug-fix during arc:** chart-count locale-fix `877522bc` (closure-mismatch on `window.currentLocale`) — same-session surfaced + shipped + verified live by chart-count-de in Batch 4a.

---

## Home page copy v1 ship (queued 2026-05-02 at `078501a6`)

Home page copy revision shipped Sections 3 + 4 + 5 + page meta against HOMEPAGE-COPY-DRAFT-v1.md. Two amendment items queued for next CLAUDE.md amendment cycle:

### Project history entry (§11 status table or project-history section)

Home page copy v1 ship event:
- Commit `078501a6`. en + de locale parity. DE authored natively (not auto-translated) per the Section-3 thesis applied recursively. 3 operator-adjudicated DE register revisions.
- DE address-form convention LOCKED at formal Sie throughout home page surface (no prior CLAUDE.md doctrine; established by this ship per the educator-respecting-register HOMEPAGE-SAVE-STATE.md mandate).
- Section 3 Option-C scaffold: 12 new leftAnnotation* keys + LEFT-column annotation rendering paired with strikethrough wrong-tokens. Preserves a06cd835's shipped inline-token visual + draft's "they say wrong; we say right" rhetorical pairing.
- Section 5 pillars render in both Notify-me + Subscribe modes (Implementation Note 6 Option B); flag-mode switch is on CTA block only.

### §17.5 amendment — DE address-form convention

Append note: home page DE copy locks at formal Sie throughout per the educator-respecting register HOMEPAGE-SAVE-STATE.md mandates. No prior CLAUDE.md doctrine on this; established by `078501a6`. Future DE-authoring on subscriber surfaces (workspace, collections, lesson-plan content) defaults to formal Sie. Informal du is reserved for edge cases not yet identified.

### Note on Section 3 worked-example asset deferral

Implementation Note 3 of HOMEPAGE-COPY-DRAFT-v1.md proposed image-based worked-example assets with positioned annotation callouts. Per Option C adjudication, the existing inline-token text-based scaffold from `a06cd835` was preserved + extended with leftAnnotation* keys; the rendered worksheet images are NOT a Section-3 prerequisite. If a future editorial/designer pass authors the images, the scaffold can be upgraded to image-based callouts as a follow-on; not blocked on it. Filed as deferred-queue candidate, NOT a pending CLAUDE.md amendment.

---

## Section 2 featured-deck curation v1 ship (queued 2026-05-02 at `e1ef7248`)

Section 2 featured-deck curation v1 shipped against `frontend/config/homepage-featured-decks.json`. Two amendment items queued for next CLAUDE.md amendment cycle:

### Project history entry (§11 status table or project-history section)

Section 2 featured-deck curation v1 ship event:
- Commit `e1ef7248`. 8 picks (4 en + 4 de) populated against post-Phase-3a 58-row catalog.
- Spec amendment locked at SECTION-2-CURATION-v1.md: 4-language grid (en+de+fr+es) per HOMEPAGE-SAVE-STATE.md is deferred to Tier 2-3 launches; v1 ships en+de only.
- Coverage: 4 subjects (math 3, letters 2, logic 2, spatial-reasoning 1), 8 distinct mechanics, 4 themed + 4 themeless, 3 educational levels (preschool 1, kindergarten 5, grade-1 2).
- DB title heterogeneity preserved verbatim — operator-authored DE-native titles coexist with English-language titles on DE rows post-Phase-3a; do NOT auto-translate at config layer. `_known_state_notes` framing in JSON refreshed to reflect this.

### HOMEPAGE-SAVE-STATE.md spec amendment note

For any future home-page-spec source-of-truth update: Section 2's "4 languages visible (en + de + fr + es)" requirement is amended to "all-Tier-1-locales-with-substantive-catalog" effective `e1ef7248`. v1 = en + de. Tier 2 launch swap-in pattern: drop 1 en + 1 de, add 2 es picks. Tier 3 launch: drop 1 en + 1 de, add 2 nl picks (nl is Tier 2 actually per §19 — recheck order at amendment time). Tier 4 launch: drop 1 + 1, add fr picks. The grid grows honestly with the catalog rather than authoring sample fr/es picks against empty per-language catalogs (which would create a surface the rest of the page — Footer Column 1 by-language — couldn't deliver on).
