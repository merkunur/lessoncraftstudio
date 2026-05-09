# `[ARC][SEO][SLUG-RATIONALIZATION]` — commission-spec stub

**Type:** commission-spec stub for next-session priority queue
**Status:** FILED (not active); operator picks at next-session start per CONVERSATION-HANDOFF §0 framework
**Generated:** 2026-05-09
**Source:** Phase 4a Checkpoint 2.5 (θ) retrofit verification empirical finding (Adjudication 4 (ι))

---

## 1. Summary

Slug-vs-title-shape redundancy at the catalog data layer: multiple DB rows with distinct slugs produce identical SEO surface (title + description text) because manifest fields (`theme`, `exercise_mode`) overlap across slug variants. Phase 2 §1 uniqueness invariant (`@@unique([language, titleHash])`) catches the redundancy at INSERT/UPDATE time but cannot enforce uniqueness on the existing 36.7% en NULL hash subset because the title shape doesn't admit unique enforcement when multiple slugs share content axes.

This commission would address the **structural slug-rationalization** at the catalog data layer — distinct from the §17.8.5 slug-derivation logic + §17.8.X title-shape doctrine, which both work correctly post-(θ) but cannot resolve pre-existing slug redundancy on the existing catalog.

---

## 2. Surfacing context

Phase 4a Checkpoint 2.5 (θ) title-shape adjustment closed at 63.3% en + 100% non-en DB hash backfill rate. Improvement of +28 points over pre-(θ) baseline (35.1%). Residual 36.7% en (980 rows) failed P2002 unique-constraint with the new title shape.

Per operator's framing at Adjudication 4 (ι) lock: "(θ) success criterion was structural — title shape includes mode discriminator — and that achieved as designed. The residual 36.7% is in **different territory** than (θ) was scoped to address; pursuing it via (κ/λ/μ) crosses into catalog-rationalization commission scope."

Title-shape doctrine work is COMPLETE post-(θ). Slug-level rationalization is the next frontier.

---

## 3. Empirical breakdown

980 residual en NULL hashes by exercise_type (top 10 from Phase 4a verification):

| Exercise type | NULL count | Likely cause |
|---|---:|---|
| picture-sort | 244 | default-mode + slug-with-vs-without-theme convergence |
| math-worksheet | 154 | default-mode + (operationSelect-driven mode field overlap) |
| grid-match | 105 | default-mode + theme variants sharing title |
| more-less | 104 | default-mode + theme variants sharing title |
| cryptogram | 99 | default-mode + theme variants sharing title |
| math-puzzle | 99 | default-mode + theme variants sharing title |
| shadow-match | 92 | default-mode + theme variants sharing title |
| code-addition | 52 | non-default-mode but theme variants sharing |
| bingo | 18 | default-mode + theme variants sharing |
| pattern-train | 8 | non-default-mode + theme variants sharing |

The pattern: most affected exercise-types have default exercise_mode = null AND multiple slug variants where manifest.theme overlaps. Less affected: pattern-train + code-addition (both have rich exercise_mode discrimination).

---

## 4. Root-cause hypothesis (three categories)

### Category A — Multiple slugs at same (type, theme, mode) tuple

Example from Phase 4a verification: DB row `(en, picture-sort)` and DB row `(en, picture-sort-animals)` both have `manifest.theme = 'animals'`. Both slugs produce identical title `picture-sort Worksheet — Animals — Kindergarten | LessonCraftStudio` post-(θ). Even with mode discriminator, these collide.

Likely cause: early-catalog publishes used the bare slug (`picture-sort`); later publishes used theme-aware slug derivation (`picture-sort-animals`). Both slugs' DB rows persist; manifest data for the bare slug points at the same content axes as the theme-aware variant.

### Category B — Default-mode + no-theme decks at same exerciseType

Example: `bingo Worksheet — Kindergarten | LessonCraftStudio` (no theme segment per buildSeoHead omits-when-null logic; no mode segment per default-mode contract). Multiple DB rows at slug=`bingo` (versioned)? No — slug is unique-per-language. But multiple bingo decks across slug variants (`bingo`, `bingo-no-theme`, etc.) might all have manifest.theme=null + manifest.exercise_mode=null → same title.

### Category C — Possible interaction with §A.10 canonical-host migration cleanup

Some legacy slugs may date back to pre-`6fb6ee3d` apex-form canonical state. The retrofit's www-form canonical replacement at Phase 4a Checkpoint 2 (first-pass) addressed canonical URLs; but slug renames during the canonical migration (if any) could have left orphan DB rows pointing at deck.html files no longer in fs at the original slug location.

Further investigation needed at commission ratification time.

---

## 5. Scope characteristics

Substantial data migration:

- **DB-side reconciliation:** for each pair/group of redundant DB rows, decide which is canonical; archive the others via §15.10 unpublish handler. Likely 980 rows × ~2-3 redundancy groups = ~300-500 archives.
- **deck.html re-emission:** for archived rows, deck.html files become reachable only via .archived/ path; no further retrofit needed (per §15.12 archive folder structure).
- **Sitemap regen:** sitemap.xml shards rebuild post-archive (per §17.10.1 hash-partitioning).
- **Canonical-host re-verification:** sample sweep across remaining 36.7% surface to confirm www-form canonical persists post-archive.
- **Verification:** post-rationalization, DB hash backfill should reach 100% en (because remaining decks have unique titles).

Operator decision-points:
- Which row in each redundancy group is canonical? (Most-recent-published wins? Highest-traffic wins? Manual review?)
- Are there marketing-surface implications? (i.e., do any redundant slugs have inbound links in marketing collateral, blog posts, social media that would 404 post-archive?)
- Does this happen now (in-arc Phase 5 or Phase 6 territory) or post-launch (Condition 3 path or post-launch consideration)?

---

## 6. Operator-strategic question

**Is slug rationalization in launch-trigger Condition 3 (NSR-flag clearance) path, or post-launch consideration?**

Per CONVERSATION-HANDOFF + SUBSCRIPTION-SCOPE Conditions:

- **Condition 3 (NSR-flag clearance):** Phase 5 NSR review on Nordic + Tier 4 Danish + (per Adjudication 2 (γ)) seo.words.* 44-entry + (per Adjudication 4 (λ)) taxonomy capitalization. NOT in scope today.
- **Condition 5 (free-tier surface):** affected if free-tier candidate decks fall in the slug-redundant set. If launch's free-tier deck candidates are all in the 63.3% backfilled set, Condition 5 isn't blocked. If candidates fall in the residual 36.7%, slug rationalization moves toward Condition 3 path.

Empirical answer depends on:
- Which 980 en decks are non-backfilled vs which decks are launch-trigger-relevant
- Whether 36.7% non-unique-title state on en is acceptable for marketing-surface state at Subscribe-flip
- Whether the residual 980 fall predominantly in default-mode + no-theme decks (= the catalog's "starter" decks) or in non-default-mode variants (= power-user content)

CC at commission ratification time should run a query intersecting `decks WHERE language='en' AND title_hash IS NULL` against any launch-trigger candidate-list to surface affected-deck count.

---

## 7. Cross-references

- SUBSCRIPTION-SCOPE Conditions 3 + 5 (launch-trigger gating)
- Phase 0 §6 — F2 + F3 findings (description not unique + title not unique)
- F3 finding's deeper layer: title-shape doctrine fixed shape pathology; slug-level redundancy is the catalog data hygiene layer
- §17.8.5 slug-derivation logic (works correctly; this commission addresses CATALOG STATE not derivation logic)
- §A.10 origin nginx www-canonicalization (potential interaction — pre-`6fb6ee3d` state may correlate with slug redundancy)
- §15.10 block-on-archived UPDATE contract + §15.12 archive folder structure (rationalization mechanism: archive redundant rows)

---

## 8. Trigger conditions for ratification

Operator picks at next-session start. Trigger conditions include:

- **Condition-driven trigger:** if operator strategic decision routes slug rationalization into launch-trigger Condition 3 path
- **Empirical trigger:** if launch-trigger candidate-list intersection reveals significant overlap with the 980 non-backfilled en residual
- **Doctrine-driven trigger:** if Phase 6 fold-cycle absorption of Item 10 (slug-vs-title-shape redundancy as separate doctrine class) surfaces additional patterns warranting structural fix
- **Operator-strategic trigger:** at next-session priority queue, operator may pick this commission alongside the 4 carry-forward draft-specs (Arc 14 / Pillar 2 Arc 3 / Stream A Arc 2 / Pillar 4 Arc 2) per CONVERSATION-HANDOFF §0 framework

NOT active until operator ratifies. Phase 4a closes with this stub filed.

---

*End of (μ) slug-rationalization commission-spec stub. Operator-strategic call required for ratification.*
