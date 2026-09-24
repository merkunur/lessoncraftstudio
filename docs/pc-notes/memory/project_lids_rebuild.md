---
name: project-lids-rebuild
description: "The Lids (#39) rebuilt to the v4 bar 2026-08-05 — the operator's 'a bit confusing' had a one-line cause, and eight more defects sat under it"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0b29e699-aa33-42c3-add9-9e8db6e4d764
  modified: 2026-08-05T07:01:04.107Z
---

**#39 `lids` — REBUILT + LIVE 2026-08-05.** Commits `3687c546` (build) · `cc9b546a`
(live-verify). Live-verify **95 assertions driven on www**, eleven locales.

Trigger: *"It requires clear explanation what to do in the beginning. Was a bit confusing."*
Three expert panels employed (pedagogy · interaction design · art direction) plus eleven
native locale panels.

## ⭐⭐ The findings that matter

**THE TOOL'S ONLY EXPLANATION WAS `display:none` IN THE ONLY PLACE A TEACHER MEETS IT.**
`strings.instruction` is authored ×11 and rendered by the shell — but the production tool
page embeds with `embed=1` and `lcs-shell.css:261` hides `.lcs-instruction` in embeds.
**Every tool on this platform has this property.** Whatever explains a tool must live INSIDE
the stage. Verified with curl before acting. → [display-none instruction](feedback_the_shell_instruction_is_hidden_in_every_embed.md)

**THE COUNTERS OVERLAPPED ON THE DEFAULT TABLE, PAST EVERY GATE.** `scatter` was a seeded
hash with no separation constraint: **19 of 27 totals** had an overlapping pair, including
the default 12; at total 17 two counters sat 4.5u apart on a 56u disc. V15 proved at length
that counters UNDER A LID never overlap — the part that is correct by construction — and
nobody checked the part that is random. **The check was written where the geometry was easy
to reason about rather than where it could fail.**

**THE SIGNATURE MOMENT DID NOT HAPPEN, AND THE GATE PRINTED THE NUMBER AND PASSED.**
`lidRadius` collapsed 15 shares onto 3 radii, so the default move (12 counters, 2→3 lids)
changed nothing. The gate said *"it shrinks them in 38/81"* inside a **green** run, because
the law had been softened to non-vacuity. Now 12 distinct radii, −19% on the default move,
69/81 gated as a floor.

**A GATE'S ORACLE CAN BE WRONG IN THE DANGEROUS DIRECTION.** V15 computed the expected lid
radius with `Math.round`, which permits a lid up to half a unit SMALLER than its own
contents. I had just fixed the same bug in the tool (`ceil`, and `- 1e-9` to kill float dust
— six counters reach exactly 56 and compute as 56.000000000000014).

**AN INERT MUTATION IS THE HARNESS NAMING DEAD CODE.** Two "survivors" mutated (a) a
`centre` flag that was redundant — a ring of ONE is a centre, reached via `counts=[1,6]` —
and (b) a fallback the search can never take. The answer is to delete the code, not to write
an assertion for an unreachable branch. Final: **80/80 killed.**

## Other defects, each measured first
- **The strip could not hold its own answer**: 0..12 while paid totals reach 30 (share 15).
  `floor(n/2)` is NOT the fix — that IS the share at two lids, the opening configuration.
  Rule: next multiple of 5 strictly greater than `floor(n/2)`, **depends on n alone, never
  on k** (a strip that tightens when a lid lands leaks the answer). Starts at 1, not 0.
- **The generator had been bent around the defect** (`admit()` refused share > 12), costing
  the paid tier every two-lid table above 25. Book 76 → 81. ⚠ A poison case *pinned* the
  defect: sort each example by what it MEANS, not by whether it currently passes.
- **The first click emptied the table** — one lid took `floor(n/1)=n`. Reachable set is now
  `{0,2,3,4}`; the model still answers at k=1 so the oracle sweep measures something.
- **An ordinary drag made the reveal lie** — the clamp bounded the lid's CENTRE, so a corner
  drag put 6 of 10 seated counters outside `overflow:hidden`.
- **The lift painted the lid OVER its own answer** (1.17:1 veiled-vs-unveiled). Fixed by
  paint order — and **reading a render caught the same blend surviving in the ANIMATION**,
  because the counters faded in while the lid faded out.
- **A free visitor's Ctrl+P printed the paid sheet** — chip gated, `@media print` not.

## The panels
⭐⭐ **Eleven native panels found eleven defects in MY ENGLISH**, several introduced that
hour while fixing others — including my own `markStrip` "fix" christening a FOURTH named
part in a three-part tool. `"of the same colour"` was a **false claim shipping in eleven
locales** (one lid colour has ever existed). ⭐ The **Finnish panel MEASURED that `\b` is
ASCII-only even under `/u`** — `/\bpöytä\b/` is false on "pöytä" and true on "pöytäliina" —
so the gate's Finnish verdict ban worked only by luck and its poison example could never
reveal it. Bans are now `(?<!\p{L})…(?!\p{L})` with must-fire examples **in the language
they police**. → [panels audit the source](feedback_native_panels_audit_the_source.md)

## Design rulings worth reusing
- **No control goes grey in silence.** `disabled` is reserved for "the effect IS the state";
  everything else keeps `aria-disabled`, stays focusable/clickable and **refuses out loud**
  (announce + the hint band). `title` cannot do this — a disabled button is unfocusable and
  **there is no hover on a projector**. ⚠ Dispatch by REASON, never by "the reducer returned
  null" — `setTotal` refuses for three different reasons.
- **The ghosts.** Two dashed circles where a lid would land, at `MIN_R` (never the share's
  radius, which would pre-announce the re-settle). The tool DRAWS the instruction.
- **Focus: one `data-fk` sandwich in `render()`**, not five bespoke restores.
- **One row of numerals per card.** A SETUP scale and an ANSWER scale 400px apart with
  nothing distinguishing them is what made a teacher unable to tell which row to point at.
- **The drawer is for booleans that can never be refused** — `renderField` flips
  `aria-checked` itself and never rebuilds, so a refusable value desyncs permanently.

Gates: verify V1–V22 · mutate **80/80** · local-test 69 over 80 configs · smoke 263 ×11 ·
locale-layout 99 renders · print-sheet 10/10 · liveness 27 controls/53 paths · wide-viewport
30 · live-verify **95 on production**. 0 lines to `lcs-shell.*` or any protected core.

Related: [[project-lids-tool]] · [[project-premium-tools-v4-catalog]] ·
[[feedback-next-tool-build-recipe]]
