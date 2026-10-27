# #131 — Ziggy's Odd One Out → THE GROUP PHOTO (L.1.5.a; all 11 locales)

ORDER row 131 · id `ziggy-odd-one-out.category.l-1-5-a` (kept). Design: `designs/131-ziggy-odd-one-out.md`.

## Files and wiring
- **New files:**
  - `mini tools/group-photo-core.js` (`GroupPhotoCore`) holds the model:
    - **Five levels:** 1 odd one out (4 seats, 8 rounds), 2 trickier groups (5 seats, 9 rounds), 3 what is it made of (4 seats, 8 rounds), 4 word groups (5 word cards, 8 rounds), 5 the seat plan (8 puzzles).
    - **The shutter:**
      - an empty step gives a hint and no miss;
      - miss 1 gives a cloudy photo with no name;
      - miss 2 makes the members sharp, pencils in the kind word and leaves the odd one blurred;
      - the odd one on the step gives a sharp photo with its name.
    - **"I name it":** three name tags, and a wrong tag is never true of every member.
    - **The seat plan:** tap cycles empty → X → ✓. A ✓ pushes Xs into its row and column and moves any other ✓ there. Lifting it lifts only the Xs it pushed.
    - **Seat-plan check:**
      - miss 1 marks the wrong ticks and lights the clues they break;
      - miss 2 glows a cell the clues make certain;
      - after that come two true/false sentences.
    - **The plan:** a fresh order every pass, the odd one's seat balanced (which seats take the extra rounds is drawn afresh), and the name tags shuffled.
    - DATA is written by `gp-build.js` from `gp-src.js`. Labels come from the committed picture files, with overrides where the vocab word names the contents (water bottle, jam jar).
  - `group-photo-activity.js` draws the parts:
    - the camera (a drawn body, lens and slot, with the red shutter as the check);
    - the viewfinder with a two-tier class-photo bench;
    - the step;
    - the photo card, which slides out and develops;
    - the photo wall;
    - the seat-plan grid with its clue cards and true/false lamps.

    The CSS prefix is `gp-`, `apparatusClasses: ['gp-art']`.
  - `group-photo-activity.html` loads core and activity at `?v=1`.
  - The old ziggy files stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `ziggy-odd-one-out-activities.json`.
  - `tool` → `group-photo-activity`.
  - `params` = `{level: [1–5], cap: [show, name], rounds}`.
  - **en–sv slug, title and intro are frozen; da, no and fi are authored new.**
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.876.
- **Prose:** en–sv replaced, da/no/fi added.
- **Strings:** 44 keys × 11.
- **Visual-QA driver:** `scripts/visual-qa-phases/ziggy-odd-one-out.category.l-1-5-a.js` (rewritten):
  - picked: a seat on the step, with no photo and no hint;
  - missed: a cloudy photo and the hint;
  - resolved: a sharp photo, then Next 0.5 s later.
- **Sources** (scratchpad): `gp-src.js` → `gp-build.js`, `gp-strings.js` → `gp-apply.js`, `gp-prose.js`, `gp-manifest.js`, `gp-dump.js`, `gp-probe.js`, `gp-fix1.py`.

## The invention
**The camera only takes a sharp group photo when everyone on the bench is one kind of thing.** The child sends the one that doesn't belong to the step and presses the shutter. A sharp photo gets the group's name written under it.

Choosing by look gives a cloudy photo, because the camera sorts by kind:
- the yellow banana does not go with the bee;
- the bat flies but is not a bird;
- the kite flies but is not a vehicle;
- the lollipop is a round top on a stick but is not a flower.

From the second miss the photo shows who DOES share a name, with the kind word in pencil. The odd one stays blurred.

## Deviations from the design (each measured or ruled)
- **No "Seats 4 / 5" setting.** The levels already split them (1 and 3 have four seats; 2 and 4 have five). The second setting is the design's caption setting ("the camera writes it / I name it"). At rest it shows an empty name line on the bench, so it changes the board (settings-efficacy LIVE).
- **No drag-to-swap seats.** Taps carry the hand. After a miss, the photo IS the bench: tapping anyone in the cloudy photo sends them to the step instead.
- **Phones:**
  - the step stands at the end of the bench's front row, and beside the photo after a snap;
  - word cards go two to a row;
  - the hint sits right under the camera;
  - the wall is hidden (the counter shows the count);
  - once solved, the spent camera steps aside and the photo's pictures sit at the phone floor, so the shell's Next stays above the fold;
  - the seat-plan photo shrinks to the puzzle-grid floor (40 px, cells no longer take taps), and the clues give their room to the two sentences.
- **Wide screens:** the two sentences take the clue column's place once the plan is photographed.
- **The success line** lives in the shell's celebration bubble; the activity's own copy is kept only for screen readers.
- **The pinned seat plan** is a record (not reopenable); pinned group photos open big again.

## Review
ONE native + early-primary pedagogy reviewer covered all 11 locales from a compact dump: every round, tag, clue, true/false sentence, string, the prose and the new metadata. The report had 6 must-fix and 30 should-fix findings. **All were applied at the source.**

**Must-fix:**
- The shoe is not "clothes" in most school vocabularies (Kleidung, vêtements, ropa, kläder…). It is now the scarf, in L1.4 and L2.5.
- en "Send the one that doesn't belong to the step" read as "doesn't belong to the step". It is now "Put the odd one out on the step". es and sv had the same garden path and were rewritten.
- da «kikke» beside «kigge» read alike. «kikke» is now «titte».

**Should-fix:**
- **Level 3 rebuilt:**
  - the cardboard box captioned "paper" is gone;
  - each material now has varied members (glass: jar/glass/bottle and jam jar/oil bottle/milk bottle; paper: envelope/notebook/bag and book/notebook/envelope; plastic: water/shampoo/juice bottles and spoon/toothbrush/shampoo bottle);
  - the plastic round's odd one is the glass bottle, not the tumbler labelled "glass".
- **Words:**
  - fr «fixer» → «admirer»;
  - es «contemplar» → «admirar», «manopla» → «guante»;
  - pt «mitene» → «luva», «tora» → «tronco»;
  - it «muffola» → «manopola», «automobile» → «macchina», «ceppo» → «tronco»;
  - nl «tas» → «zak»;
  - fi «kassi» → «pussi»;
  - sv/da/no «glo» → «kolla»/«spejde»/«speide»;
  - sv «köksgrejer» → «köksaker».
- **Strings:**
  - the en title is now "Odd One Out: The Group Photo";
  - de «Ich wähle ihn»; sv «Jag väljer namnet»; da «Jeg vælger navnet»;
  - miss 2 now says "the sharp PICTURES" in de, nl and fi;
  - da gridMiss2; fr l3.
- **Prose:** en no longer names Ziggy; fi wording fixes.

**My own render reads found:** the success line shown twice (note + bubble) and the phone layouts above.

## Gates
- **`verify-group-photo-core.js`:** 20,162 checks, 0 fail. Its own tables are its own scan of what every picture IS and is MADE OF, its own reading of the committed labels with its own override list, its own word fields per locale, and its own brute-force seat-plan solver. It checks:
  - exactly one odd one per round, with a caption true of every member and not of the odd one;
  - wrong name tags never true of every member;
  - every puzzle has one solution and every clue is needed;
  - true/false balance 8/8, with the true sentence first in 4;
  - the shutter, the misses, "I name it", the ticks and Xs, and the plan check and glow;
  - seat balance and the seat-1 bot ≤ chance;
  - strings × 11 (no digit in a hint, never "free", fr/it typography, every key reached), prose and the manifest.
- **`mutate-group-photo.js`:** 20 of 20 killed, control survived.
  - Two survivors on the first run were real gate holes: the caption was never compared with the right tag, and the child's own X was never placed in the tick's row. Both were closed.
  - A third mutation was killed only by a syntax error. It was rewritten so its kill is real.
- **`local-test-group-photo.js`:** real pointer, 11 locales, 320–1366, pictures served case-exactly. Five levels, the functional scenarios (shutter, the misses, a seat tapped in the photo, "I name it", the seat plan's ticks, misses, glow and lamps), then every round of every level at rest, at miss 2 and solved (seat plan: also the sentences), resized through 320–1366: **12,848 pass, 0 fail.** The two failures on the way were German level 4 at 320 (long verbs pushing the photo into the step), fixed by letting word-card rows wrap; the first fix wrapped picture rows too and visual-qa caught the regression at 320.
- **`visual-qa-activity`:** PASSED, 192 renders.
- **`audit-activity-hierarchy`:** 338 / 0.
- **`audit-settings-efficacy`:** "level" and "cap" both change the board.
- **`audit-activity-next-delay`:** pass. Content × 11, prose claims, SERP copy, content tells and route preflight: pass.

## Live
<LIVE>
