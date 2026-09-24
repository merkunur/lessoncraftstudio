---
name: project_shape_stretcher_tool
description: "TOOL #57 The Shape Stretcher — live 11 locales; all three panels ruled DO NOT BUILD and their objections built it, and a printable answer key was found marking correct children wrong"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-11T05:06:02.468Z
---

**LIVE 2026-08-11, all 11 locales.** `shape-stretcher` · prefix `shp-` · category **`measurement`**
(there is no `'geometry'` in the union) · `TOOL_KEYS` 60 · wrapper 7.92 · free-play (no `tasks`).
Gates: **verify 4,589,926 · mutate 100/100 · probe 7,849 · smoke 505 (31 keys ×11) · preflight 60
tools · tsc 0 new · live-verify 41/41 driven by KEYBOARD on production.**

**What it is.** A pane holding a polygon. Three tracks over ONE INTEGER LADDER — **Stretch** (`k`),
**Lean** (`theta`, the skew, the PRIMARY track) and **Turn** (`rot`) — reachable by drag, by
click-to-jump, and by keyboard. Two **tags**: a tick across every mid-edge when all sides are equal,
the standard little square inside a right angle. A **kept** copy stands beside the live shape.

⭐⭐ **ALL THREE PANELS RULED DO NOT BUILD, AND THEIR OBJECTIONS BUILT IT.**
- **The remainder the fence missed:** everything shipped **DEALS** a shape already transformed and
  asks the child to CLASSIFY it (`sort-bins` 1.G.A.1 in the pitch's own words, `pip-museum` K.G.A.2
  with tilted/stretched exhibits, `curate-wing-core` computing equal-sides on a live vertex array).
  **Nothing lets the child PERFORM the transformation and CROSS a category boundary.**
- ⭐⭐ **Christie & Gentner CHANGED THE MACHINE:** sequential presentation of two exemplars taught **no
  better than showing one** (.13 vs .14, **p=.37**); simultaneous gave **η² .30–.37**, with 98%
  recall — *"a failure to compare."* **A morph is a sequence**, so the pane holds TWO shapes at once.
  No gate would have asked for that.
- **Hannibal & Clements: skewness > aspect ratio > orientation.** The pitch's tilt/spin hit the
  WEAKEST driver. **Lean is primary; Turn is the control that demonstrably does nothing.**

⭐⭐ **THE DIAL HAS NO NOTCHES, AS A THEOREM.** Detents = the values where crossing flips a tag; `rot`
enters no predicate, so that set is **empty**. The apparatus states the lesson in its own furniture
before anyone touches it. ⚠ A home notch at rot=0 would assert upright is special — the misconception
itself. **Verified on production by twelve keyboard presses.**

## Defects found by READING, not by gates
- ⭐⭐ **The little square drew on the 30° corner.** `cornerRight` had `i===1`/`i===2` swapped.
  **`anyCornerRight` unions over `i`, so the TAG was right and only the MARK was wrong** — invisible
  to any tag-checking gate. Only per-index re-derivation from vertex geometry found it.
- ⭐⭐ **The theorem was accidentally true, not structurally true.** `detentsFor` pushed every rung
  where a tag merely HELD (all 165 notches at θ=90), and `turn` came back empty only because an
  `if/else-if` **had no branch for it** — a SPECIAL CASE, which the tool's own first invention
  forbids.
- ⭐⭐ **The motion system was entirely inert** — `--shp-dur` read by 0 rules, 0 transitions — so
  `T_POP === T_SEAT` held **only because both were zero**. The no-verdict-by-symmetry argument was
  unrendered while a comment asserted otherwise.
- ⭐⭐ **`ease-out` passed both endpoint assertions and was still asymmetric**: mid-flight the pop was
  **9.6px** of 14 and the seat **4.4** — the pop leapt, the seat crept. **The verdict delivered by
  production values**, surviving a gate that only looked at the ends. Fixed to `ease-in-out`
  (`f(1−t) ≡ 1−f(t)`); mid-flight matrices now byte-identical.
- ⭐ **THE BANNED NUMERAL SURVIVED IN A SECOND CHANNEL** — `aria-valuenow` on the turn rail, after it
  was struck from every string.
- ⚠ **`ariaTags*` were the only VISIBLE caption** (`_say.textContent`); the prefix I chose **misled
  all ten panels about register**. Renamed `sayTags*` during the fold, with the gates that named the
  key in a CALL SITE (not a comment) renamed in the same pass.
- ⚠ Three more dead constants (`T_POP`/`T_SEAT`/`T_DETENT`), **third consecutive tool**.

## ⚠⚠ MY OWN REPAIR CREATED A WORSE DEFECT — found by SEVEN panels independently
Removing the banned degree numeral I wrote *"A four-sided shape, **leaning**"* — a **constant**, keyed
on side count alone. At `k=0, θ=90, rot=0` — **the upright square, the destination of the tool's own
printed routine, the misconception's own emblem** — it announced the shape was leaning, to the one
child who cannot see it. And *leaning* is `skewLabel`'s own word, so it asserted the SKEW using the
name of the skew track. ⭐ Swedish gave it the general form: **a POSE claim in a string keyed only on
FORM**, in a tool whose second invention is that pose enters no predicate.

## ⭐⭐ THE COMMISSION'S OTHER DELIVERABLE: a printable that marked correct children wrong
`image library/shapes/diamond.png` measures **90.0/90.06/89.94/90.0°, sides within 0.21%** — a square
rotated 45°. `geometry-tasks.js` shipped `SYMMETRY_COUNT.diamond = 2` (**a child answering 4 is marked
WRONG**) and `QUAD_CLASS.diamond = 'other'` (**teaches a tilted square is not a square**). The
verifier **re-declared the same tables**, so the gate certified the misconception.
⚠ **TEN OF ELEVEN LOCALES CALL IT *RHOMBUS*** — so the original keys were right FOR A RHOMBUS and the
defect is in the BITMAP. Keys changed anyway (interim, stops the wrong-marking today) with a header
note to **REVERT to 2 / 'other' when the art is redrawn** per the `draw-bag.js:917` precedent
(w/h 0.70). `choice-board.shape-id.k-g-a-2` and `pip-museum` still inherit it.

## Process
⭐ **The register agent invented ten locale names, then found eight panel files on disk** — and turned
the agreement into a **gate**, which immediately caught `fr` matching as TEXT but not as BYTES
(U+2019 vs ASCII). ⚠ **The Dutch acutes in `Eén` are load-bearing** — strip them and the numeral
becomes an indefinite article. ⚠ **`--fit=auto` top-cropped the card while logging "ok"** — third time.
⚠ **The fold broke three gates that carried a copy of the file's FORMATTING**; the worst keyed
"have the locales landed" on a sidecar file that was never going to exist — **so folding correctly
would have silently SKIPPED every per-locale assertion while printing PASS.**

See [[feedback_a_model_gate_says_nothing_about_whether_it_renders]] ·
[[feedback_relay_the_strings_not_the_reasoning]] · [[project_the_gap_tool]]
