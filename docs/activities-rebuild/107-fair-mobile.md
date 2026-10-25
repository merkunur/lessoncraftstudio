# #107 — Equal Halves and Fourths → THE FAIR MOBILE (1.G.A.3, all 11 locales)

ORDER row 107 · id `choice-board.fraction-equal-shares.1-g-a-3` (kept). Design: `designs/107-choice-board.md`.

## Files and wiring
- **New files:**
  - `mini tools/fair-mobile-core.js` holds the model:
    - the cards: five shapes in a 100 box (circle as a 360-gon, so equal sectors are exactly equal), cut by full lines or by rays from a centre; pieces are clipped polygons whose weight is their area fraction, sorted left to right by centroid;
    - the mobiles (massless bars): halves = one bar; fourths = a top bar carrying two sub-bars; thirds = a bar pivoted at a third, one hook on the long arm and a two-hook sub-bar on the short arm. `tan θ = torque / (load · h)`, clamped ±28°; level = every bar under 0.5°;
    - the round tables, the deal, Check, kinds, hints and the plan.
  - `fair-mobile-activity.js` draws the mobile(s), springs, spirit level, pin, spare tray, name plates and the card shelf, and owns tap / drag / keyboard (CSS prefix `fm-`).
  - `fair-mobile-activity.html`.
- **Manifest:** the row moved out of `choice-board-activities.json` into its own `fair-mobile-activities.json`.
  - The removal was surgical (the file is hand-formatted); the other 7 rows were proved deep-equal.
  - `tool` is now `fair-mobile-activity`, `task_template` is `fair-mobile`, and the params are `level` / `bubble` / `rounds`.
  - Slug, title and intro are byte-equal in all 11 locales.
- **Route:** `fair-mobile-activities.json` registered in `MANIFEST_FILES`; `ACTIVITY_WRAPPER_VERSION` 9.850.
- **Prose:** replaced in all 11 locales.
- **Pictures:** none — cards, mobiles, springs and plates are drawn geometry.
- **Sources** (scratchpad): `fm-strings.js` → `fm-apply.js` (44 keys × 11); `fm-prose-src.js` → `fm-prose-apply.js`; `fm-manifest.js`; `fm-review-fix.js`.

## The invention
**Hang the cut-up card on a mobile with one hook per share.** Cardboard weighs by its area, so the mobile measures "equal":
- fair shares hang perfectly level;
- an unfair cut tips the bar;
- too many pieces drop into the spare tray, too few leave a hook bare.

A pin holds the bar level until Check pulls it out and the mobile swings to its true tilt; a spirit level on the bar shows it.

**Level 1, Halves and fourths** — twelve rounds of circles, squares and rectangles; distractors are an unequal cut, the wrong number of shares, or a whole card.

**Level 2, Thirds and fair shares** — eight rounds: thirds on the ⅓ mobile, and fair shares that look different (corner-to-corner fourths, a triangle cut from its centre, a hexagon in three rhombi) against the misconception cards (a triangle in three horizontal bands, a Y-cut square).

**Level 3, Name the share** — eight rounds: one card with one shaded share, three mobiles with name plates (stacked fraction + word); hang the card on the mobile it belongs to.

**After a Check:**
- **Miss 1:** the mobile swings to the truth; the heaviest share glows coral, the lightest teal; the hint names what the mobile shows (tips / spare pieces / bare hooks / wrong mobile).
- **Miss 2:** the pin holds the bar level again and every spring is measured against a dashed fair line — a too-big share's extra length marked coral, a too-small one's teal. A wrong-count card gets "count the shares, then the hooks"; in level 3 the right mobile bobs.
- **Success:** level, every spring on the fair line, a stacked unit fraction on each share, the success line ("each share is one fourth, or one quarter"). Then any card can be hung and watched.

## Deviations from the design (each measured or ruled)
- **No "fourths / quarters" setting.** It could not change the board at rest (the settings-efficacy rule); the en success lines teach both words instead.
- **Hints carry no digits** (the design's "{extra} pieces have no hook — this card has {k} shares, not {n}" would print the count); they name what the mobile shows.
- **The drawn arms keep the model's proportions but not its lengths** (the angles come from the model): at the model's 140 / 60 the fourths mobile did not fit a 460 px stage. The ⅓ bar is still drawn 2 : 1.
- **A drawn spring stops at 1.8 fair lengths** (fully stretched). Every unequal share in the tables is below that (the largest is 1.79 × fair), so the clamp only touches wrong-count cards, where the springs are not the lesson.
- **Cards are 4 in a row on phones (≥ 64 px)**, not the design's 128–140 px two-by-two, which pushed Check below the fold at 360 × 740.
- **Level 3 plates drop the word on narrow panels** (the stacked fraction stays; the success line says the word).
- **The design's "ghost of the right number of hooks flickers on the bar" for a wrong-count card at miss 2** is the bare-hook / spare-tray picture plus the count hint; nothing new is drawn.
- **es "móvil"** is the toy (móvil de cuna), standard in Mexico; the es content gate bans the PHONE sense, so this one activity is on an auditable exemption list in `verify-activity-content-es.js` (poisoned: removing the entry fails the gate).

## Review
ONE native + pedagogy reviewer over the compact dump (all strings × 11, the prose).
- **Confirmed:** no digit or answer in any hint; no "free"; the aria label never says "equal"; the mobile word in every locale (it `giostrina` — `mobile` is furniture; es-MX `móvil`); gender agreement of the shape words.
- **MUST, applied:**
  - a whole card read "cut into 1 pieces" in every locale → new `aCard1` ("not cut");
  - learning goal 1 said "partition" — the child never cuts → "recognize … cut into equal shares";
  - en cited only 1.G.A.3 while level 2 teaches thirds → "with thirds from 2.G.A.3";
  - it "diviso in metà" → "a metà"; pt success lines now carry the BNCC words "a terça parte / a quarta parte".
- **SHOULD, applied:** en US spelling; de "ans Mobile", hintSprings, goal 3; nl "Hij hangt recht!", hintUneq; no "fjæren sin"; es/pt toggle words; it "Appendi lì"; fr "en deux moitiés"; fi "tälle mobilelle", "viivan kohdalle", "Pois päältä".

## Gates
- `verify-fair-mobile-core.js` — 2,373 checks, its own ground truth: the cards and tables typed from the design; every shape an analytic inside-test, every cut its own line-side / ray-sector classifier, weights measured on a 0.25 grid; its own statics. It covers:
  - every card's pieces (count, weight ± 0.006, left-to-right order); the named weights (25/75 chord, 25/37.5/37.5 Y, 1/9 3/9 5/9 bands, 90/120/150° sectors);
  - the mobiles are honest: the core's angles equal the gate's moments, and over 10,000 random weight sets each mobile is level exactly when every share is equal; the empty mobile is level; the symmetric-bar and pairs-only traps tip;
  - every L1/L2 round has exactly one fair card (the first); unequal distractors ≥ 1.25 largest/smallest and tip ≥ 6°; wrong-count cards leave spares or bare hooks; springs: fair shares on the line, unequal ones ≥ 8 px off;
  - L3: equal shares, exactly one matching mobile;
  - the deal, Check kinds, misses and hints; the plan (#1 opens, never the previous order, slots balanced, the L3 leftover P = 2/3 ± 0.04);
  - the strings × 11.
- `mutate-fair-mobile.js` — 20 / 20 killed, control survived.
- `local-test-fair-mobile.js` — 34,265 checks in 11 locales; real taps and drags, Check, the keyboard, the settings; every round of every level at rest, at miss 2 and solved, through 320…1366.
- `visual-qa-activity` · `audit-activity-hierarchy` · `audit-settings-efficacy` (level, bubble live) · preflight-activity-routes · prose-claims · SERP copy · activity-content × 11 — all green.
- LIVEVERIFY
