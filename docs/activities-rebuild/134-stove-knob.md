# #134 — Pesto's Soup Stall → THE STOVE KNOB (L.1.5.d; all 11 locales)

ORDER row 134 · id `shades.pick.l-1-5-d` (kept). Design: `designs/134-shades.md`.

## The invention
A stove knob with a word on every click. The FLAME follows the click: one more tongue per click. The SOUP in Pesto's pot follows the WORD on that click: its colour deepens with the word's real strength.

The child puts the words on the clicks (low at the bottom, a lot at the top) and presses **Turn it up**. The knob climbs click by click. When the order is right, flame and soup rise together. A word out of place makes the soup jump: the pot shakes and the window marks itself.

With "soup colours only when I turn it up" (the default), the soup stays plain while the child places words, so the order has to come from reading, not from testing colours.

## Files and wiring
- **New files:**
  - `mini tools/stove-knob-core.js` (`StoveKnobCore`) holds the model, with four levels:
    - 1 order the ladder: 8 ladders, namely heat, cold, wet, voice, said, size, speed and time. There are 3 words each, or 4 in the setting where a locale has a clear 4-word ladder;
    - 2 pick the strength: 17 order tickets, where the knob holds the 3-word ladder and the child turns it to the word the ticket needs, then serves. There are also 4 "between" rounds: the low and high words are fixed, and the child places the middle word next to a decoy. The answer ranks are 7/7/7 of 21 and the knob starts at click 1, so "don't turn" is chance;
    - 3 twin words: the twin joins the first word on its click, and a trap word is refused;
    - 4 go and look: two knobs. Going words are ordered by speed (creep and stroll are never together), looking words by time.
  - **Check:**
    - an empty click gives a hint, not a miss;
    - a wrong order makes the soup jump at exactly the wrong clicks, and the hint names the first one;
    - miss 2 shows the stronger help: an unlabelled pale-to-deep colour strip beside the flame, and a soup dot on every word;
    - a move takes the help away.
  - **The plan:** a fresh order every pass. The shelf is never already in order or reversed, and the twin's place on the shelf is balanced.
  - DATA is written by `sk-build.js` from `sk-src.js`. heat, cold, wet and voice start from the signed synonym bank (`b5/locales/synonyms.<loc>.json` scales); the rest is authored per locale. The build refuses a ticket that holds a word of its own ladder in either direction: a stem of the ladder word in the ticket, or a ticket word that begins a ladder word (sv "pytte" → pytteliten).
  - `stove-knob-activity.js` draws the parts:
    - the library pot (kitchen tools/pot), with the soup laid into its measured rim (x 168–854, y 224–371 of the 1024 source) and a cream rim line so the deepest heat soup still reads against the red pot;
    - drawn flame tongues and a drawn knob that you tap, drag round, or turn with the arrow keys;
    - click windows (high at the top) and the shelf;
    - the order ticket with the served bowl (kitchen tools/bowl).

    The **Turn it up / Serve** button lives on the stove, under the knob (level 4: under the pot). Level 4 is one stove row: the going knob, the pot, the looking knob, with each knob's words under it. CSS prefix `sk-`, `apparatusClasses: ['sk-art']`.
  - `stove-knob-activity.html` loads core and activity at `?v=1`.
  - The old shades files stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `shades-activities.json`.
  - `tool` → `stove-knob-activity`.
  - `params` = `{level: [1–4], words: [3, 4], peek: [off, on], rounds: 8/21/8/7}`.
  - The en slug, title and intro are frozen; de–fi are authored new. The row was en-only before; it now ships in all 11 locales.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.878 → 9.879.
- **Prose ×11:** en replaced, the other ten added. Each names its own heat ladder, read from the data.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source (`sk-src.js`, `sk-strings.js`, prose).
- **The 4-word voice ladder.** The "call" verb means calling by name in the Romance languages and in Danish. It became `crier < hurler` in fr, `gritar < berrar` in pt and `råbe < skrige` in da; es and it keep three words; en uses `shout < scream`.
- **The first heat ticket.** In eight locales it held a root of a ladder word (erhitzt, calentita, intiepidita, opgewarmd…). In fr and fi it also fit "hot". It now reads "can drink it right away without blowing on it".
- **Twins of different strength.** joli/beau, bonito/hermoso, bonito/belo, triste/tristonho, bello/grazioso and schnell/flink were replaced. The en traps tiny/huge (true small/big words) became big/small.
- **The en 4-word heat ladder.** toasty/scalding became `lukewarm < warm < hot < boiling`. de speed `flitzen` became `rasen`, pt `sair em disparada`, fi `syöksyä`.
- **Field labels.** The level 4 field labels repeated a word that sits on the knob, so they are now words that never do (Bewegen/Sehen, avancer/voir…).
- **Smaller fixes.** nl `gepruttelt`, no `overalt`, fr spacing in the go/look line, and natural tickets in de, fr, es, it and sv.
- **My own render reading caught:**
  - the between rounds' task line said "turn the knob", so they now have their own line ("put the word that goes between them…"), and their second-miss hint was the turn-the-knob line;
  - a German twin hint opened its sentence with a lowercase verb (now capitalised).

## Gates
- **`verify-stove-knob-core.js`:** 50,095 checks, 0 fail. Its own ground truth is the English anchor ladders and answers plus its own grading rule for every kind of round, applied to random placements. It checks:
  - the soup follows the WORD's rank, never the click;
  - every ticket is free of its own ladder in both directions;
  - level 2 answer ranks are 7/7/7;
  - creep and stroll never share a knob;
  - bots ≤ chance;
  - strings ×11, prose and the manifest.
- **`mutate-stove-knob.js`:** 20/20 killed, control passes. The mutations include "the soup follows the click" and "quiet back on the voice ladder".
- **`local-test-stove-knob.js`:** 15,087 pass in the full run. The 16 fails were all one cause: at 320 the Finnish twin slots shrank to 39 px beside the wide button. Those slots now stack on phones, and the level 3 rerun ×11 is 2,332/0. Real pointer, 11 locales.
  - At 1024: every hint, the jump, the miss-2 strip and dots, the take-back, Next 0.5 s after the result, the soup plain vs. "all the time", the 4-word knob, a real word drag, a real turn of the knob by hand, level 2 serve and between, the level 3 trap, and the level 4 field hint.
  - Then every round × level (plus the 4-word setting) at rest, at miss 2 and solved, through 320…1366.
  - The drag fix it forced: every click repaints the dial, so the knob's centre is fixed when the hand goes down.
- **`visual-qa-activity`:** 192 renders pass. Phase driver `visual-qa-phases/shades.pick.l-1-5-d.js`.
- **`audit-activity-hierarchy`:** 338 / 0. It caught the undeclared soup overlay.
- **`audit-settings-efficacy`:** level, words and peek are all live.
- **`audit-activity-next-delay`:** pass. Content ×11, prose claims, SERP copy, content tells and route preflight: pass.
- **0 lines** in shared cores or `lcs-shell`.

## Live
`live-verify-stove-knob.js` on production, 2026-10-27: **52 pass, 0 fail.** All 11 pages return 200 (ten of them new locales for this row), and en, de, sv and fi at 1366 and 390 embed stove-knob-activity.html at wrapper 9.879. With a real pointer, the strongest and the weakest heat word swapped + Turn it up make the soup jump at both clicks, with the hint naming the strongest word. Putting them right + Turn it up gives "From a little to a lot: …" in the locale's own ladder, and the iframe grows with the card. The first run fell in the cache window (some new-locale pages still served without the embed); the second run was clean.
