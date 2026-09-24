---
name: project-wodb-rebuild
description: "WODB rebuilt to the v4 bar 2026-08-05 — the board rendered at 112px on every desktop, and eleven native panels found what no gate could"
metadata: 
  node_type: memory
  type: project
  originSessionId: 24d4d1b5-23c5-4fe1-b4d5-eb54f99b5639
  modified: 2026-08-05T19:59:33.365Z
---

**LIVE 2026-08-05.** `wodb` ("Which One Doesn't Belong?") rebuilt to the v4 bar.
`live-verify-wodb.js` = **77 assertions driven on production, 11/11 locales**.

## The operator asked for a "next grid" button. It was the smallest defect.

⭐⭐ **THE BOARD WAS 112px ON EVERY DESKTOP.** Measured before any fix
(`scripts/repro-wodb-iframe-height.js`, kept as a permanent gate): the iframe was
**422px at BOTH 1440 and 2560**, board 234px, **cells 112px** — against the 740px
the wide-viewport programme had measured against `wodb.html` standalone.
`#lcs-root{height:100%}` bound `.lcs-app` to the iframe viewport;
`lcs-shell.js:940` reported that height back to the parent, which had set it from
`ActivityIframe`'s `INITIAL_HEIGHT = 420`. **A fixed point.** Phones escaped via
the 560px rule — which is why it survived: it bit only at projector widths, and
every QA render ever taken was against the `.html` directly, never through
`/[locale]/tools/`. Now width-driven (the build-plan pattern); **cells 274px live**.

⭐⭐ **THE CONTROL SAID MORE THAN IT WAS ASKED.** `build-plan`'s iframe is 859px
against its own `min-height:880px` tiers — so **that gating is dead across ~46
tools on the production page**. Reported, not fixed. Five sibling tools share the
root binding (`fraction-kitchen`, `measurement-bench`, `part-whole-frame`,
`picture-word-wall`, `story-line`).

⭐⭐ **RELEASING THE BOARD CLIPPED THE DOCUMENT** — app 877px inside a 635px
`<html>{overflow:hidden}`, so the dock and Next grid were unreachable on the
standalone page. Found by READING the render.

## What eleven native panels found, that no gate could

Briefed to treat the English as a **SOURCE TO AUDIT** and to **read the MODEL**.
Sixteen real defects; the worst were things I had written that hour.

- **The answer channel was inaudible, three times over.** Colour was removed as an
  answer (one boy in twelve), and `_cellName` then spoke only `fillOutline` — so
  fill, rotation AND size were mute. Five panels found fill; the follow-up round
  found size still mute after that. **When the answer moves to a new channel, ask
  what the screen reader hears.**
- **`_showReason` wrote into a destroyed node** — `_ribbonEl` only exists while
  <2 cards are out, so the spoken reason stopped after the first. Invisible to
  gates because the reveal still *worked*.
- **Label and behaviour were different functions** — `_dock` chose the chip label
  from `_deckHasNext()`, `_advance` also branched on `premium`.
- **Four turns are the identity**, so the 4th press announced "new corners".
- **`api.t` returns the RAW KEY on a miss and a raw key is truthy** → `|| fk`
  never fired; a chip was aria-labelled `"fillSolid"` in 11 locales.
- **It drew a LOUDSPEAKER and every surface called it an ear.** Six panels wrote
  "tap the ear". The drawing was the outlier → drew an ear.
- **The data still said "the only purple one"** in 11 locales after the ink was
  unified. Fixed by **reusing native strings already in the file** for the same
  attribute — `fix-wodb-colour-reasons.js` refuses a partial fix and refused mine
  at 10/11 (Spanish joins with an ellipsis, not an em-dash).

## Gates
`verify-wodb.js` (NEW — 14 sections; the tool had none because it was not
`require`-able in Node) · `mutate-wodb.js` **36/36** · `audit-wodb-palette.js`
poisoned on all 4 laws + control · print probe 10/10 · consequence 7/7 · smoke
11/11 · `live-verify-wodb.js` 77 on production.

⭐ The mutation harness paid for itself twice: **a needle matching TWICE** mutated
the mini clock branch, which had no coverage at all; and it surfaced `_isoWeek`
duplicated byte-for-byte beside `isoWeek`.
⭐ **My own gates condemned correct code first**, three times: the dead-string
check flagged 20 LIVE keys before it could see a ternary; the verdict ban was too
WIDE (Finnish `pisteet` is simply *dots*) and too NARROW (Italian `giusto` could
not fire on `giusta`, the form that agrees with `risposta`).

## Locked decisions
- **Colour is not an answer.** `audit-wodb-palette.js` swept 15,190 inks and proved
  **no four stay ≥1.9:1 apart under all three dichromacies**. One ink + FILL
  TEXTURE. An art panel's prescribed plum measured **1.03:1** vs teal — worse than
  what it replaced. **The gate is authoritative over any proposed hex.**
- **Free gets a real control, never a paywalled primary button** — `[Turn it]`.
- **The weekly rotation is band-scoped** (it ignored band: a reception teacher's
  free grid was age-appropriate 8 weeks in 21) and **every grid given is KEPT**.
- Keyboard `→/←/PageDown/PageUp/R/Esc` — the user is a teacher with a clicker.

## Still open
21 grids is four weeks deep; `premium-tools-v4.md` names **wodb's 21 by name** as
the moat counter-example ("200+ per instrument"). The plan's attribute-key
architecture (reasons become verifiable predicates, `object-attributes.json` +
`sorting-hoops.js`'s 11-locale phrase table as substrate) is designed and NOT
built. Pedagogy panel delivered **30 new grids fully specified**.

Plan file: `C:\Users\rkgen\.claude\plans\you-should-analyze-the-optimized-summit.md`
