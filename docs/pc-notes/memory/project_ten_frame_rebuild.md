---
name: project_ten_frame_rebuild
description: "Ten Frame rebuilt to the v4 bar (2026-08-04) — the bounded-complement thesis, the Zwanzigerfeld correction, and the defects the gates, the renders and ten native panels each found that the others could not"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1a6ba3a2-5287-4a79-a0f7-ceabefec220c
  modified: 2026-08-04T03:02:17.694Z
---

# Ten Frame → a v4 instrument (2026-08-04, 4 commits, HELD at commit — not deployed)

`de5ac178` engine+gates · `d589a4aa` carry/print/paid + the core a11y leak ·
`e492d7fe` ten native panels · `238df34a` landing copy + wide re-baseline.
**3,940 → ~99,000 bytes.** Was the smallest tool in a 47-key catalogue (median
~55,000) and `TOOL_KEYS[0]`. Same job as `number-line` (#1): oldest tool brought
to the v4 bar, **not a new slot**, key and all eleven native slugs UNCHANGED.

## The design
**Thesis — THE BOUNDED COMPLEMENT.** Unfilled cells draw as ghost rings *in
place*; a tray holds exactly `cap − count` real counters. Both DERIVED, neither
stored. **The counters run out**, so over-filling is unrepresentable. Five
fields (1×5, 2×5, 1×10 w/ break, **2×10 Zwanzigerfeld**, two 2×5).
⭐ **The catalog directive was right about the market, wrong about the
geometry**: on a 2×5 each ROW is five, so nothing was missing there — the break
belongs on the TWENTY, and the shipped twenty was the American double frame.
⭐ **The five-structure NAME is taken twice** (`number-talk-easel-strings.json:63`,
`rekenrek-seqs.json:154`); **the geometry was free.** Take the free half.
Per-locale field is `default` until a native panel rules: de (operator), **nl +
it (their own panels)**; fr ruled the other way (Picbille is five-and-five).

## ⭐⭐ THE DURABLE LESSONS — each layer found what the others could not

**Gates found:** a 12-cell field could enter `GEOM` unseen (every check iterated
the ORACLE's keys, never the tool's table) · a clamp nobody exercised · a
negative mask reading as a FULL frame · **`\b` IS ASCII-ONLY**, so the verdict
bans were one non-ASCII initial letter from being born dead.

**Reading the renders found:** ⭐⭐ **`--tnf-u` was defined on the FRAME, and
custom properties inherit DOWNWARDS ONLY — so the tray and numeral, its
SIBLINGS, silently used the 44px fallback at every size.** Every floor passed.
Now gated as a RATIO so one viewport cannot fake it. Also: the instruction
rendered twice; arrow keys dead-ended at a row end.

**The native panels found (none visible from English):** the PAID GATE
ADVERTISED THE FREE PRINT (6 panels) · `trayAria` read "1 counters left", and
one-left is the LAST BEAT of the routine (4 panels, by reading the CALL SITE) ·
**tap on a filled cell deleted every counter above it**, wrecking the scatter
the Tidy routine exists to collapse (it) · **`st.split` was vestigial while the
header described it as shipped** — the same defect the whole rebuild exists to
correct (no) · **my Danish read "THIEF FIELD"** (`tyve-` = thief as a compound
first element) · Swedish refused a bare "Full" (reads as DRUNK) · **you CANNOT
SCATTER BY TAPPING** — tap fills a run, so my own new copy told teachers to do
something impossible (nl+it+sv, independently) · my hub card named FOUR fields
for a FIVE-field tool · **my noun census was WRONG and ten panels were handed it
as fact** (`counter`/`tray` both taken).

## ⚠ TRAPS BOUGHT HERE
- ⭐⭐ **A CHARACTER CLASS WRITTEN WITH LITERAL CONTROL BYTES CAN BE SILENTLY
  REWRITTEN IN TRANSIT.** My invisible-char ban became `[\u0020-\u002D]` — SPACE
  through HYPHEN — in one of three copies, condemning every string in every
  locale, while the other two kept their bytes and were fine. **Build such
  classes from ESCAPES, never literal bytes**, and poison BOTH directions.
- ⭐⭐ **I MADE A GATE WEAKER BY LETTING IT READ THE PANEL FILES** — the tool
  could then justify itself, and a mutation handing Finnish an unruled
  school-system fact SURVIVED. **The ruled set is an ORACLE, written in the gate.**
- ⭐ **TWO SURVIVING MUTATIONS WERE SHADOWED, NOT GATE HOLES** (a redundant tray
  guard; a no-op `move`). Removed as bad mutations, and the equivalence asserted.
- ⭐ **`saidBoard` WAS DEAD BY STATE** — "nothing left" and "not full" cannot both
  hold. A source scan sees a live `t()`; only driving states finds it.
- ⚠ Backticks inside `node -e`/heredoc are command substitution; `\n` inside a
  heredoc'd JS string becomes a real newline. **Write the script to a FILE.**
- ⚠ Git Bash `/tmp` ≠ Node `C:\tmp`.
- ⚠ da: **a `\b`-anchored ban cannot see a term inside a compound**
  (`\babonnement\b` never matches `Lærerabonnementet`) — applies to de/nl/sv/no/fi.

## Also fixed: a LIVE a11y defect in the shared core
`hideReadout` hid the answer visually and announced it anyway (K.CC.B.5,
K.CC.A.3). ⭐ **It was in TWO files** — `ten-frame-activity.js` replaces `paint()`
for the image-theme activities, and `how-many.animals` IS one, so the sibling's
copy mattered most. `verify-ten-frame-noleak.js` walks braces, poison-tested 3
ways incl. a guard that CLOSES before the announce. All 4 activity gates re-green.

## Gates (all new; the tool had none)
verify 271 (own oracle, 2,099,232 subsets) · mutate 63/63 · noleak 13 ·
local-test 291 (6 widths × 5 fields, real pointer drags) · smoke ×11 55 ·
locale-layout 66 cells 330 · **liveness 63/0 in all three entitlement states —
it could not RUN before** (`prefixOf` greps the tool file for the `-wrap` call
and the DOM was in the core) · print-sheet contract · wide-viewport 30/0.
**18.6% → 52.7% of a 2560 board.**

## ⚠ NOT DONE — deliberately held (operator ruled "commits only")
Not pushed, not deployed; production still serves the old tool. To ship:
`git push` → scp `ten-frame.{js,html}` + the regenerated `.webp` → **cp BEFORE
`deploy.sh`** (§20.4) → `deploy.sh` → write + run `live-verify-ten-frame.js`.
**Open, for the operator:** `number-talk-easel.js:63` calls its double frame
`Zwanzigerfeld` in German while `_drawTenFrame` builds two separate ten-frames —
the American arrangement wearing the German material's name (found by the de panel).

Related: [[feedback_next_tool_build_recipe]] · [[project_premium_tools_v4_catalog]] ·
[[feedback_native_panels_audit_the_source]] · CLAUDE.md §23.
