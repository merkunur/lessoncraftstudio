---
name: feedback-panels-read-the-code-not-just-the-copy
description: "Native locale panels find bugs in code written minutes earlier — brief them to audit the implementation, not only their own strings, and never lift a product name without measuring the tool's own lexicon"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 86b3dad3-29a2-44c7-87a1-9eea5a232d02
  modified: 2026-08-04T16:53:06.241Z
---

**Rule:** when running the §A.13.48 native-panel round, give each panel **the
English as a SOURCE TO AUDIT and the code as something to READ** — then verify
every finding yourself. On Fraction Kitchen's print sheet (2026-08-04) eleven
panels found **six real bugs in code I had written that hour**, plus two live
shipped ones. Every single one reproduced.

**What they found that no gate could:**

| finding | why no gate saw it |
|---|---|
| `p2Note` called, never authored | `i18n.t` returns the RAW KEY on a miss, so a worksheet prints the literal text `p2Note` in 11 locales. Nothing compared call sites to the strings block. |
| Free users got the paid sheet via **Ctrl+P** | only the CHIP was gated; the sheet was in the DOM and the `@media print` rules were unconditional. **Gating the chip is not gating the feature.** |
| `['bar', 4]` printed as "fourths" | `MENU.bar` is `[2,3,6]`; `pieces('bar',4)` measured **6** strips. Off-repertoire, silently. |
| page 1 printed the rectangle twice | `_wholeD` is shape-aware and bar and cake are the same rectangle → 3 of 6 cells byte-identical. |
| smallest piece 6.2 mm | narrower than a pencil, for K-2 scissors. Nothing measured the printed millimetres. |
| dashed box round each cut-out | on a worksheet a dashed rectangle **means "cut here"** — it told the child to cut the box, not the shape. |

Plus two **live** bugs: the tray placed `_slotIdx[equivFilled]` rather than the
piece actually dragged (visible on every pizza task, reachable free), and
`_traysRow` hardcoded a circle for the whole regardless of food.

⭐⭐ **The "zero authoring" shortcut WAS the defect.** I planned to lift
`gatePrint` verbatim from a sibling. Four panels objected; the measurement
settled it: **24 tools say "Premium", 21 say "Teacher plan", ZERO use both.**
Lifting would have made this the first tool in the catalogue naming two plans
for one paywall. I had compared against the wrong population (sibling
`gatePrint`s) instead of **the tool's own shipped gates**. For a PRODUCT NAME the
scope is the tool, not the sibling string.

⭐ **A panel can refuse another panel's fix, and be right.** Swedish reported its
`fracWhole: 'en hel'` should be `det hela`. Danish ruled AGAINST porting it —
Danish *det hele* means "everything", turning a correct question into a false
one — and Norwegian independently confirmed. I was one step from fanning it
across all three. This is §A.13.58's per-locale authority, earned again.

⭐ **Changing the design after the panels write copy invalidates the copy.** I
added set-letters and a spare piece; the French panel flagged that its `p3Note`
was now stale. Re-ask, don't patch native copy mechanically.

**How to apply.**
- Brief: "audit this English as a source; read the model; flag any bug with the
  line" — not "translate these strings".
- Add a gate for the reached-but-never-authored class: scan every `t('x')` /
  `fmt('x')` **and positional call shapes like `head(host,'a','b')`** against the
  strings block. Poison-test it by deleting a key that is genuinely called.
- Measure a product-name lexicon before reusing it: `grep -l` both candidate
  names, and check whether any single tool uses both.
- Related: [[feedback-the-english-source-is-the-locale-nobody-reads]],
  [[feedback_native_panels_audit_the_source]].
