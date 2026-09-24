---
name: project_workspace_redesign
description: "The /[locale]/workspace visual system — 'desk & cards' (2026-08-22, supersedes the 2026-08-07 'marking pile' single sheet), its hexes, the rail, and the gate contract"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1e7deabd-9220-4cff-940a-a1f95f52d85d
  modified: 2026-08-22T11:13:04.690Z
---

**2026-08-22 — `/[locale]/workspace` redesigned AGAIN ("desk & cards"), commit `fb729c6e`.**
Operator verdict on the 2026-08-07 "marking pile" was "very tiring for the eye". Root causes:
(1) NO LANDMARKS — five same-weight 17px sections inside ONE ~1700px sheet; (2) six identical
filled teal Share pills repeating down the right edge; (3) all surfaces within 1.24:1 of each
other. The single-sheet system is DEAD; do not restore it.

**The system now:**

| layer | hex | notes |
|---|---|---|
| desk | `#DDD4C2` | warm stone ground; desk→card 1.43:1 (the load-bearing step) |
| card | `#FFFDF8` | ONE CARD PER SECTION, `[data-workspace-card]`, solid border `#CFC5AE`, warm-umber shadow, radius 16, `overflow-hidden` per card |
| well | `#F5F1E6` | ALWAYS with solid border `#E3DCC9` (value step alone is sub-threshold by design) |

Solid tones replace ink-alpha everywhere (alpha hairlines go greenish over stone): dividers
`#EFE9DA`, hover wash `#FAF6EC`, toolbar track `#F0EADB`, desk rule under tabs `#CBC0A9`.
Cards HUG content — no min-heights; sparseness = composed negative space.

**Layout:** max-w-6xl; lg = 12-col grid, main column (8 cols, follows the tab) + persistent
STATUS RAIL (4 cols): "plan & usage" card (old billing strip + BOTH quota meters merged —
meters no longer sit in section headers) then recent-activity card. Mobile order
plan → materials → recent via a `display:contents` rail wrapper + `order-*`. ⚠ A
`row-span-2` grid shape for the rail stranded the recent card ~500px down — don't revisit it.

**Hierarchy:** h1 32/36; card headings **20px Baloo** + 32px icon disc (well fill + INK stroke
glyph — teal stays interaction-only, coral identity-only); row titles 16px; meta bumped
`#5E706A`→`#3D4F49`. **`#5E706A` is BANNED on the desk** (3.6:1) — card/well surfaces only.

**Actions:** Share = GHOST button (`ROW_SHARE_BUTTON` in WorkspaceRow.tsx; 1.5px `#B8D1CA`
border, teal text, fills teal on hover/focus). ZERO filled controls per row at rest; the
page's ONE filled control is the coral CTA. **All coral buttons on this surface carry INK
`#14322D` text (4.97:1) — white-on-coral is 2.73:1, a WCAG FAILURE; never reintroduce it
here.** Signature = inline-SVG crayon stroke under the h1 (replaces the geometric pill).
⋯ trigger stays ALWAYS VISIBLE (unchanged lock). Collection tiles are objects: `#F7F1E1`
fill, 1px `#E0D7C0` + 2px bottom "deck edge" `#D3C8AC`.

**First-run:** when EVERY material slice is ready-and-empty the overview renders each section
card with its existing empty-state copy (`showEmptyPreview` prop) instead of a blank main
column; "See all (0)" suppressed globally (WorkspaceSection requires totalCount > 0).

**Overlay layer migrated** (was the gate-invisible debt): `components/ui/Modal.tsx` (warm
scrim `#14322D/55` + paper card), `ConfirmDialog` (ink text ramp; danger = brick `#B3392B`,
terracotta deleted), `PromptDialog` (well input, brick errors), `ActivityShareModal`
(scrim/card only — ALSO reaches public activity pages via ActivityShareButton).

**Gate contract** (`scripts/visual-qa-workspace.js`, poison matrix documented in
`scripts/visual-qa-workspace.poison.md`): A = desk hex + EVERY `[data-workspace-card]` paper
(non-vacuous ≥2); G = zero-filled-per-row + ≥2 controls per row + exactly-one-coral-CTA per
view; NEW H = in-dialog assertions (paper card / no terracotta / no teal text / brick
confirm) with 3 dialog poisons — the dialogs portal OUTSIDE `[data-workspace-root]`, which is
how the old overlay debt survived. 13/13 poisons verified failing.
⭐ **Poison lesson: a poison that MUTATES a transitioned property must set `transition:none`
first** — the confirm-brick poison survived its first run because `transition-all` meant the
computed color was still mid-transition (near-brick) when measured. Append-node poisons are
immune. ⚠ **Pipeline exit codes lie:** `node gate | tail` reports tail's exit 0 even when the
gate failed — check the FAIL lines or run without a pipe.

Zero new i18n strings (86 × 11 verified). Data layer/APIs/tabs untouched.
i18n leak arc: [[project_workspace_i18n_english_leak]] · gate scoping:
[[feedback_scope_a_qa_harness_to_its_own_surface]].
