---
name: project-lids-tool
description: "Premium tool #39 The Lids — shipped 2026-08-01, closing v4 wave 1; the fence rewrote it, and three design laws were refuted by measurement"
metadata: 
  node_type: memory
  type: project
  originSessionId: 40be7efc-72bc-433d-b569-0af2eb202c5e
  modified: 2026-07-31T22:09:52.894Z
---

**#39 `lids` — The Lids — LIVE 2026-08-01, 11 locales. Closes v4 wave 1.**
Commits `239d8cee` (build) · `494c5cf2` (live-verify) · `e7f13789` (docs).

Counters on a table; circular lids dragged onto it; **every lid of the same colour hides exactly
the same number**. Drop another and they all re-settle. What will not share stays in plain sight.
The question is *"what ONE number fits under ALL of them?"* — equal groups with a remainder, at
K-2, with no notation.

## What this build is worth remembering for

**⭐⭐ MEASURE A "LAW" BEFORE YOU GATE IT.** Two invariants I wrote INTO THE DESIGN were refuted by
the gate's own data — *"adding a lid shrinks the others"* (50 shrank, 77 held, **35 GREW**) and
*"the largest lid never grows"* (28/81). Only two responses are honest: **fix the design so the law
becomes true, or delete the law.** Softening a percentage until it passes leaves a gate that has
stopped meaning anything. The final design made the monotonic form true, so it is now gated; the
non-monotonic claim was deleted and the code comment corrected to say so. See
[[feedback-next-tool-build-recipe]].

**⭐ HONEST IS NOT THE SAME AS LEGIBLE.** Three drafts of the lid's size:
1. fixed 132px — a picture a child can catch out (three small circles "covering" 30 scattered
   counters);
2. sized to REACH its farthest claimed counter — truthful and unreadable, three circles a third of
   a table wide overlapping into one orange mass;
3. **shipped:** sized to HOLD its share in hexagonal rings, and on the lift the counters are shown
   sitting inside it in exactly that packing. Every lid is therefore the SAME SIZE — the value lock
   seen rather than asserted.
**When a faithful rendering is unreadable, change what the apparatus DOES, not what it draws.**

**⭐ A HARNESS'S SILENT NO-OP HOLLOWS OUT THE NEXT ASSERTION.** `clickFoot` returned `false` quietly
when it hit a legitimately-disabled control, and the very next check — *"the toggle is not
swapped"* — passed because nothing had been toggled. Every scripted interaction must fail loudly.

**The settle was rewritten twice.** Serving lids in placement order hands the LAST lid whatever is
scattered everywhere; its claim is not a region, it is the leftovers. Now every counter ranks the
lids by **regret** (how much closer its first choice is than its second), then a bounded swap pass
tightens the clusters. Counts are untouched by construction — a swap is one-for-one.

## ⭐ THE OPERATOR'S FIRST REPORT, and what it taught (2026-08-01, `fdfcab12`)

**"The numbers under the board has no function."** Correct, and worse than the report. Of five
reads of `s.guess` in 1067 lines, four were the numeral strip's own highlight and its own
`aria-pressed`; the fifth was a **presence** test in the hint ladder — so parking the marker on `0`
advanced the tool exactly as parking it on the right answer did. It was never once brought into
contact with `share()`.

**⭐⭐ A LIVENESS GATE CANNOT SEE A CONSEQUENCE-FREE CONTROL.** `audit-tool-control-liveness` asks
*did the DOM change?* — and a control that highlights **itself** changes the DOM. It scored this
strip **84/84**. "The control acts" and "the control has a consequence" are different questions,
and only the second matters to a teacher. Strengthening the shared gate across 42 tools is a
separate, un-started decision.

**⭐ A SOURCE SCAN CANNOT TELL "EXISTS" FROM "IS REACHED".** `hintMark` — *"Park the marker on the
number you think it is."* — was authored in all eleven locales and never referenced, so the tool
never told the class what the strip was for. My first V17 was a regex over the source; **mutation
showed it is defeated by making the BRANCH unreachable while the `t('key')` call still sits in the
file.** V17 now drives every builder over eight real states with a recording `t()`.

**⭐ AND IT CONDEMNED CORRECT CODE FIRST** — the `Zufallsbeutel` lesson in a third dress. V17's
first run failed `title`, `instruction` (consumed by the **shell**) and `liftBtn` (reached through
a ternary a non-greedy regex walked past). Poison-test both directions; exemptions are an auditable
list with a line reference each, never a loosened pattern.

**THE FIX, operator-ruled: the truth lands on the strip.** At the lift the true share is marked on
the same numeral strip the class committed on — one scale, both values, nothing said about the gap.
House precedent is `estimation-jar.js` (guesses and truth through one formula onto one number line;
its own `compare()` never called in the render path). **The two treatments differ in KIND, not
HUE:** a coral-vs-teal pair was designed and rejected because orange reads as "wrong" and green as
"right" to a six-year-old — and backwards here, since the marker is the teal one. Marker FILLS,
truth RINGS + bold. The `.lid-reveal` dot row was deleted (a second, worse rendering of what the
table already seats, and silent to a screen reader).

Also: the strip **refuses below two lids in the MODEL**, a lid change **voids the commitment**, and
focus survives the re-render. A repo-wide check found the prediction-control gap is **consistent**:
`draw-bag`, `number-sieve`, `measurement-bench` and `estimation-jar` all guard the REVEAL correctly
and leave the PREDICTION live over an empty apparatus.

⚠ The layout audit caught Italian at **903px against the 900px desktop budget** — the two-line hint
costs 22px. The threshold did not move; 10px came off the inter-block gap, 2px off the hint's own
reservation.

⚠ **I walked into a recorded trap:** editing repo files through Python text mode turned `lids.js`
CRLF and silently broke eleven multi-line mutation needles at once. Pass `newline=''`, or use node.

Gates after the fix: **verify V1–V17 · mutate 63/63 · local-test 66 (new L10 block drives the whole
complaint) · smoke 263 across 11 locales · locale-layout 66 renders · liveness 84/84 ·
live-verify 96 driven on production.**

## Traps
- `[\w.]*` **backtracks across a dot** (`self.lower(` captured as `r`) → a swapped-toggle check
  condemned a CORRECT tool. Use `(?:\w+\.)*` and poison-test on a correct AND a broken synthetic.
- **A gate that measures nothing reports "measured nothing", not FAIL** — the canvas-floor poison
  ran on a table whose counters were all hidden.
- **Fixed-px inside a percentage layout collapses at narrow widths** — 34px counters spaced as a %
  of the table overlapped into a blob at 320px. Size both in the same unit.
- **Check the PATH:** the registration's thumbnail check pointed one directory too high
  (`frontend/public/tool-previews` vs `frontend/public/mini-tools/tool-previews`) and could never
  confirm. A check that cannot pass is as useless as one that cannot fail.
- **The thumbnail seeds the LIFTED state** — lids-down is the one state where the tool has hidden
  everything it has, so the card was three plain circles on empty cream. This is the #38 defect's
  cousin: the file existed, and still said nothing.
- **The lids answer Enter/Space as well as arrows** — added because `audit-tool-control-liveness`
  condemned every lid as dead and was RIGHT to: a drag handle that answers neither key is unusable
  to anyone who cannot drag. It is a MOVE, not a toggle, because the gate presses both keys in one
  tick and a toggle would flip back and report itself dead.

## The fence subtracted two of three claims
`part-whole-frame` (3 free cloths) · `number-balance` (cloth over a pan, literal string) ·
`rekenrek` (**owns "How many are hiding?" BY NAME** + authored round `q_hiding`) ·
`number-talk-easel` (flash-hide-reveal over this exact canvas) · plus 3 engines at 1.OA.D.8. Only
**the value lock** survived. ⚠ **A6 The Grouping Dial (wave 4) must fence this tool by name** —
they are inverses.

## ⚠ Deviation from the approved plan, stated not buried
The plan sold PAID as *a second and third lid colour* (two simultaneous locks). Multi-colour needs
a real balanced-allocation solver — greedy by placement order degenerates, the first colour eats
everything. **v1 ships ONE colour**; paid is totals to 30 + the 76-setup table book + saved +
print. The second colour is a legitimate future increment, not a dropped feature.

## Locales — four panels rejected the obvious word
es `Las tapas`→**`Las tapaderas`** (tapas = bar food) · fr `la table`→**`le plateau`** (*table de
multiplication*, the very concept the tool builds toward) · nl `de tafel`→**`het blad`** (same
trap; and renamed **`Onder de deksels`** — the question, not the object) · fi `Kannet`→**`Kannen
alla`** (bare Kannet = book covers) · pt rejected `tampinhas` (a bottle cap IS the classic
improvised counter). Strings SoT = `scripts/_lids-strings.js`; landing = `scripts/_lids-content.js`.

## Gates
`verify-lids` V1–V15 exhaustive, oracle implemented independently · `mutate-lids` **48/48 killed** ·
`local-test-lids` 47 assertions over 6 widths × 4 lid counts × 2 states, poison-tested ·
`smoke-lids-locales` 219 assertions, **fresh browser per locale** · `audit-lids-locale-layout` 66
renders · `audit-tool-control-liveness --tool=lids --depth=2` 84/84 · `live-verify-lids`
**92 assertions DRIVEN on production**. 0 lines to `lcs-shell.*` or any protected core.

Related: [[project-premium-tools-v4-catalog]] · [[project-draw-bag-tool]] ·
[[feedback-next-tool-build-recipe]] · [[project-arrow-strip-tool]]
