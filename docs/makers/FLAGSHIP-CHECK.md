# The flagship visual check: every picture in every template

Operator, 2026-11-08: "when you were building these worksheet makers you had made a lot of mistakes. For example, you had
missed a lot of sections in color by number templates and when the user played interactive worksheets there were some
uncolored spots. So, you should have a very serious and thorough visual check for every single image in every single
template of these worksheet makers. We cannot afford losing the trust of the users." Then: all six makers, not only Color
by Number; and all their pictures, not only the new drawings.

Nothing deploys until this check is complete and green for all six makers.

## Scope (measured 2026-11-08, `node scripts/makers/flagship/pools.js` → out/flagship-check/pools.json)

122 templates: Dot to Dot 20, Color by Number 19, Coloring Pages 12, Find the Differences 21, How to Draw 21, Picture
Tracing 29. About 155,000 template x level x picture combinations from the library pools, plus the templates with their
own content (Level Set scenes, designs, lessons), which are enumerated by copy.

## Method

1. Measure every combination for each defect class below (print page, answer key, interactive screen played to the end).
2. Read every picture of every engine on contact sheets (each picture once per engine, large enough to judge).
3. Read sample sheets of every template and level, and every render a measurement flags.
4. Fix at the source (engine, store, colour rules); a picture that cannot be made right is refused for that engine in
   data/fl/review.js (it stays in the library for the other makers).
5. Re-run everything after the new drawings are installed, and again before deploy.

## Defect classes

Color by Number (and Code): a section coloured in the key with no number on the page ("silent section"); a piece left
white in the key (tools/cbn-unpainted.js, now also --library); a spot still white after the screen is fully coloured
(scripts/makers/flagship/cbn-screen.js); colours a child would find wrong (paired parts in two colours, a cow with green
legs, a person with a blue face); a number on ink or too small.
Dot to Dot: dots out of order, numbers overlapping each other or the ink, dots too close to tell apart, a picture that
does not read from its dots, a key line that misses its dots.
Coloring Pages: broken or open outlines, crumbs too small to colour, a picture clipped or tiny on the page.
Find the Differences: a difference that cannot be seen, the wrong count, a key ring off its difference, unpainted cells in
colour pages.
How to Draw: a step that adds nothing or too much, new lines not marked, the last step not equal to the picture, guide
pages off the drawing.
Picture Tracing: guides off the ink, solid fragments, start dots wrong, a picture that does not read as dashes.
Every template: anything clipped, overlapping, or outside the page; empty slots; the screen and the page disagreeing.

## Status

- Color by Number, 200 designs: answer keys clean of unpainted pieces (cbn-unpainted.js, 0 of 200).
- Color by Number, library (1,616 pictures that passed their gates): 36 pictures with unpainted pieces (ground-oval pockets,
  outline-gap specks); 580 pictures with silent sections of 150 units² or more (1,954 sections); about one in five
  animals and people coloured wrongly (sample of 36 read 2026-11-08). Screen check: works, poisoned; first 26 pictures clean.
- 2026-11-08, later. Numbers now go into every section down to radius 3.6 (font 8, `MIN_R_TINY`; 1,296 new numbers on
  194 of the 200 designs). The library's colours were rebuilt after reading every animal key, in five rounds, each read:
  - animals: main colour; parts shaped like a big part and everything at foot level are main (a bird's feet excepted);
    enclosed small parts (spots, inner ears, a nose) share ONE accent; small parts touching the paper (ears, horns, a beak,
    a tail tip) share ONE second accent; `crayons.js NOUN_ACCENT` fixes a few (black legs on a sheep, a pink face; pink on a
    pig; black on a black cat). Faults that each round removed: a strict "all main" rule that dropped animals 420 → 64;
    a box test that made a paw at the body's edge a pink "marking"; far legs half hidden behind near ones coming out pink
    (elephants, hippos, koalas) or brown (a pig); one ear yellow and the other orange.
  - objects: a part shaped like an earlier part takes its colour (mittens with two cuff colours, then two body colours).
  - colour table: birds defaulted to blue (blue chickens, vultures, a pigeon) and the kiwi BIRD took the kiwi fruit's
    green; sea otter, treasure chest, ostrich, porcupine were blue/orange.
  - refused for Color by Number (`data/fl/review.js`): what is white or black-and-white in nature (swans, snowmen,
    penguins, pandas, zebras), open outlines (a white head, hair, a mane), the mostly-black sweatshirt.
  - sums and multiplication keys print two-digit codes: they take only pictures where every number has room for two digits
    (radius ≥ 5.5; index field `cbnR`). 581 library pictures qualify, 6 of the 200 designs.
  - eye whites: designs.js left white any piece next to pupil-thick ink, so a piece beside a heavy junction (a duck's foot,
    a lion's mane tuft) stayed white in key and screen, and cbn-unpainted.js agreed. Library pieces now carry a measured
    verdict (`tools/fl-cbn.js eyeFlags`, the depth of the ink they touch: pupils 9.4-11.2, false eyes 5.4-7.4, line 7.5):
    6,168 pieces painted, 4,148 real eye whites and shines kept white.
  - people never reach Color by Number (`tools/fl-index.js isPerson`): no skin part is known, the rules gave children blue faces.
  - animals in any theme take the animal rule (an Easter sheep had pink legs under the object rule).
  - every key that reaches the makers was READ (2026-11-08): 114 animal keys large, 750 object keys; refusals in data/fl/review.js.
- Silent sections after all this (`cbn-silent.js --all`, 1,140 pictures): 3,487, all but 6 THIN (inscribed radius under
  3.6 units, ~1 mm on paper: slivers between two lines). Ruled acceptable: each is painted with the part it is attached to,
  so the crayon that colours that part covers it, and on screen it fills with that part's tap (cbn-screen.js confirms).
  The 6 wide ones were refused.
- Index after the check: 807 → 804 library pictures reach Color by Number.
- Screens (`cbn-screen.js`, poison caught): all 804 library screens played to the end by real taps, 0 white spots.
- The coded keys (K-587 addition, K-588 letters, G3-479 multiplication): every library pick's screen built and played by
  the catalogue robot (`declared-screens.js --pool`, poisons 4/4): 1,015 screens, 0 failed.
- Printed text (all engines, 2026-11-08): the 184 pictures whose noun could carry text were read. Digits beside the page's
  own numbers (clocks, stopwatches, an 8-ball, a dated calendar: 8) leave Dot to Dot and Color by Number; English words
  (MILK, Toothpaste, TAXI ×2) leave every engine.

### Dot to Dot
- Gates the engine already had: dots ≥ 22 px apart, numbers never on a number or a dot, numbers on free paper (else a white
  backing over a line), the outline within DEV of the joined dots.
- New: `scripts/makers/flagship/d2d-lookalikes.js` (poison caught): numbered dots among the drawing's own REPEATED small
  dots and circles (sprinkles, snow, spots, eyelets, a row of circles; eyes excluded — a pair beside a dotted head never
  read as dots). 133 flagged, every one read, 37 refused (data/fl/review.js).
- The 999 library pages at level 2 read on contact sheets (sheets.js --library), all 2026-11-08: 62 more pages whose dots
  sit among sprinkles, seeds, spots or holes the measure missed (donuts, burgers, cheese, strawberries, watermelon,
  jellyfish, a colander, a dart board, a cruise ship's portholes), and 7 that print numerals or letters of their own (a
  compass, dials, an alarm clock, a keyboard, a tape measure, a dated page) — refused. Dot to Dot keeps 1,291 pictures.

### Coloring Pages
- Color and Count (K-582): every animal pick got the same two companions (a sheep and a kangaroo) because the companions
  were shuffled by the copy alone; and two drawings of one noun (two chairs) counted as two kinds. `flagship-new.js kin()`
  now shuffles by copy AND picture and takes one drawing per noun (shared by the Picture Tracing new faces too).
- `sheets.js` showed every picture broken: Node builds file:// picture links and the frame sits on the maker server's
  origin, where file:// is blocked. The sheet tool rewrites them to /makers-assets/ (the maker in the browser already uses
  those), so what is read is what a teacher sees.

### How to Draw
- `scripts/makers/flagship/htd-doubled.js` (poison caught): a step whose new ink lies ≥ 85 % within 7 units of earlier
  ink only draws a second line along an earlier one (read: a spoon's bowl, a bread crust, a candy cane's outline) —
  73 refused. Pictures 1.8 or more times as wide as tall draw thin and small in the tall boxes (a train, a race car, a
  skateboard) — refused. How to Draw keeps 971 library pictures.
- All 753 library pages read on contact sheets (trace-then-draw K-402, level 2), 2026-11-08. Also refused for How to Draw:
  clock and dial faces of digits (alarm clocks, a stopwatch, a telephone, a tape measure, a sewing machine), a computer's
  keyboard, a durian's spikes, a tree under a snowfall of dots, an anatomy drawing, a written letter; and "food bw 2/egg",
  which is half an avocado, refused in every engine (a false name). How to Draw keeps 958 library pictures.

### Find the Differences
- Which One Faces the Other Way? (K-593): the flip pool kept front-facing pictures (a duck's face, a sheep, an alpaca)
  whose flipped copy a child cannot find. `tools/fl-flip.js` now scores the blurred shape (16 px, blur 3) and the band
  where the score cannot decide was read on contact sheets (data/fl/flip-review.json keep 72 / drop 22): 954 → 580.
- The library templates read on their answer keys (level 2, 10 each): K-488 the ringed picture is the different one in all;
  K-489 the counts of each kind match the rings in all; K-490 four rings for four differences; K-491 the page shows dashed
  places where the parts are missing and the key rings them; K-492 the two outlined pictures are the same pair; K-594 size
  steps 66 / 76 / 84 % by level (clear at 1-2, deliberately subtle at 3); G1-548 six cells ringed where the grids differ.

- Every library pick of the base faces (K-395 three big, K-397 colour, K-398 seven in two pairs) built as the teacher's
  pick and its screen played by the catalogue robot (`declared-screens.js --pool`, poisons 4/4): 32 tap screens had no
  answer marks because the scene carried too few things for its differences; `K-395 first()` now refuses a scene whose
  screen cannot be built and a pick tries 8 more seeds, and `more` keeps only scenes with room (items >= count + 2).
  Pools 28-68 / 167-196 / 62-92 by level; 840 screens, 0 failed.
- What Changed? Tick the Words (G1-414): a teacher's jellyfish built a scene of a jellyfish, a starfish and a fish with three
  differences, so every listed word changed and the word screen had nothing to leave (no seed can change that). The picker
  offers only scenes that name more things than the face changes (K-395 `listableNouns`, `minUnticked`), and `screenable`
  now checks the word list; 438 screens, 0 failed. Write What Is Different (G2-389) and the other faces: 852 screens, 0 failed.
- Look, Fold and Find (K-490): the marks replay found level-3 picks (a jellyfish, a cupcake, a dog) whose five changes took
  every drawing of the scene, so the screen had no decoy. The composition now refuses that (an fd-faces error), so the face's
  pins (tools/build-fd-face-pins.js, now part of fl-integrate.sh) leave those scenes out and a page walks on.

### Picture Tracing
- These faces (K-498, K-499, K-500, K-599) read data/pt/index.json directly, so pictures the flagship review refused
  (the printed-word TAXI, the "egg" that is an avocado) still reached them. `lib/pt-faces.js allowed()` skips them at
  selection time; the lists keep their order so a saved copy keeps its picture.
- The porthole (first-tracing, every scene a round frame): a long diagonal picture (a ladle) crossed the rim on scenes
  whose big square slot puts its corners outside the circle. `tools/build-pt-fit.js` maps each picture's measured ink
  into every scene's slot and a scene where it crosses is not a fit.

### Templates with their own content (the coloring alphabet and numbers, letters, frames, rolls, mosaics)
Read every unit (letter, number) or 12 copies of each, 2026-11-08 (`sheets.js --units` / `--copies`):
- Coloring Alphabet / Numbers (K-579, K-580): every letter A-Z and every language's own letters (ÄÖÜ ÉÈÊÇ Ñ ÅÆØ) read;
  every number page shows exactly its number of stars (1-20, all three levels, counted).
- Letter / Number Dot-to-Dot (K-584, K-585): joined letters did not read (an M without its inner V, an S without its turns,
  an E without its middle arm) because dots were spread evenly and snapped to a corner only when one lay near the spacing.
  `lib/color-glyphs.js outlineDots` now puts a dot on EVERY corner (close corners keep the sharper one) and shares the rest
  by run length. Marks (Ä Å É) were cut off by the frame (the letter was fitted to its body only) and numbers sat inside
  them: the whole character is fitted and its marks are the figure's ink. A level-3 I had no room for 34 numbers: a
  narrow character takes down to half the count. 906 + 297 builds in 11 languages × 3 levels, 0 failed.
- Giant Letter / Number Tracing (K-602, K-609): a giant W ran off both sides of the page: wide characters are scaled to the
  width (`dashed` maxW).
- Trace a Frame (K-601): the zigzag, wave and castle sides crossed at every corner: each side's first and last piece is
  straight.
- Trace the Way (K-600), Roll and Draw (K-595-597), Color Your Name (K-581), the pixel pictures (G1-555): read, right.
- Odd-number mosaic (G1-553): the odd cells form the letter for all 26 (printed as text and read).

### Every picture the picker offers must make a page (`scripts/makers/flagship/picks.js`)
For every template, level and language, every picture of the template's picker pool is built as the teacher's pick, the
way the maker builds it (overrides.art). The maker never retries an edited page, so a pick that throws is a refused
page in front of a teacher. Found 2026-11-08 and fixed at the source:
- Dot to Dot: 41,976 of 113,550 picture × figure-setting pairs leave a number no free place or crowd the dots under the
  setting's minimum gap. `tools/build-d2d-index.js` now measures every setting a library page asks for (K-285 figureOf)
  and stores the refusals compactly in data/d2d/index.json `libRefused` (one sorted slug list + a base64 bitset per
  setting, 133 KB); K-285 `pageScene` leaves them out of the picker. Published 200-scene settings unchanged (92/92).
- Dot-to-Dot, Then Write the Word (G1-547): offered two-word pictures ("no picture with one word to write") and fr
  "œuf" (no stroke data for "œ"): `pageScene(..., keep)` narrows the picker to one traceable word.
- Odd-and-even Dot to Dot (K-506): a calendar, a page and a puzzle leave no paper for decoys: refused (data/fl/review.js).
- Picture Tracing first-tracing / look-then-trace (K-419, K-420): a pick that could not stand in the copy's scene was
  refused. `tools/build-pt-fit.js` → data/fl/pt-fit.json (80,620 compositions): pictures that fit no scene leave the
  picker (75); a pick goes to the next scene of the face it fits. Two Pictures to Trace (K-599): the partner picture is
  tried until one fits; pictures too small for the level on half a page leave the picker.
- Find the Differences new faces (K-488–K-492): the picker offered every library hero though most scenes cannot carry
  the face: it now offers the face's pinned scenes only (data/b7/fd-face-pins.json) and New version goes round them.
  3,002 failed picks → 0. Picture Pairs (K-400): the scene loop treated "K-395 pairs: cannot place windows" as fatal, and
  an own pick never got another seed: both fixed (the page writes its own seed, so the screen's replay matches).

### The 435 redrawn drawings, installed (2026-11-09, tools/fl-integrate.sh)
- Installed into every engine: d2d / htd / cbn 435 each (0 failed), 435 traced for Picture Tracing (3 unusable), 163 Find the
  Differences scenes rebuilt, the face pins of K-488..K-492 rebuilt too (build-fd-face-pins.js, now in fl-integrate.sh).
- The refusals written against the REJECTED drawings were re-read on the new ones (data/fl/review.js): the pegasus now
  reads as a winged horse and reaches Dot to Dot, How to Draw and Picture Tracing; its Color by Number key is still wrong
  (far wing blue and green, far legs blue), as are the apple tree (trunk green) and the jump rope (the paper inside the
  loop coloured): refused there with the new reason. Nature rules (skunk, penguin, panda, zebra, snowman) stand.
- How to Draw: lib/htd-steps.js split the new drawings' thin inner lines down their middle between two steps (a faint
  hairline, then the same line again: 41 of 159 flagged, the rest showed it too). tools/htd-drawn.js cuts their lessons
  from their own shapes: each ink pixel to the shape drawn on top, then grown back to the earliest step whose shape
  continues the line (no gaps, no stubs); people and animals follow the artist's construction-sheet steps. Read on large
  step strips (a cup, cheese, a puppy, broccoli, an alien). The jack-o'-lantern cannot make 4 steps: out of How to Draw.
- Dot to Dot: 22 new drawings flagged by d2d-lookalikes.js, every page read: 7 refused (sprinkler holes, skateboard bolts,
  panda toe pads, jelly bubbles, the diamond's crowded fingers, pretzel salt, strawberry seeds), 9 kept, 6 not offered.
  sheets.js now leaves out a listed picture the template does not offer (it had printed a fallback food truck under
  "safari friends bw/cheetah").
- Color by Number: two library keys with a white piece inside a thick ring (a belt buckle, a wheel hub) refused;
  cbn-unpainted.js --library now skips pictures already refused; every wide silent section is on a refused picture.
- Every new drawing read on one template per engine (scripts sheets in $TEMP/fl/newsheets, 2026-11-09):
  - Color by Number: all 219 new keys (K-394 levels 1-2) read by me; 41 refused for Color by Number in data/fl/review.js:
    white in nature coloured (snowy owl, polar bear, clouds, a santa hat's trim, a clownfish's stripes, a soccer ball),
    one subject on the same colour as its ground (a puppy on its cushion, a frog on its rock, a mole on its earth, a fish
    in orange water), parts of one thing in two colours (far legs and arms, two legs, two arms), wrong colours (a green
    trunk, brown segments of an orange, a brown yolk, purple pages, purple trees, a red ambulance hiding its red cross),
    the paper inside a loop coloured. 178 kept.
  - Find the Differences: K-488 (78 new scenes) and K-397 (26) keys read by me: every ring on its change, one picture
    different on each K-488 page. No fault.
  - How to Draw (347 lessons, strips in $TEMP/fl/htdstrips) and Dot to Dot (383) + Picture Tracing (423) pages: read by
    two reviewers; findings below.
  - Dot to Dot (K-294, 383 new pages, reviewer): 48 refused (data/fl/review.js d2d): marks that look like dots beside the
    numbered ones (spots, kernels, suckers, coin and hole circles, bubbles, seeds), dots crowded onto a small or thin part, a
    dotted part that reads as nothing, and five whose dots only add a ground line.
  - Picture Tracing (K-498, 423 new pages, reviewer): the template put the picture into the look-model frame on 71 pages
    (centred x 420, box 490: its left edge reached x 175, the frame ends at 186) — fixed for every picture (centred x 435,
    box 460). 15 refused for tracing: solid black marks that look like start dots, too many tiny shapes, a cheetah without
    its spots, a fox whose eyes became blobs.
  - How to Draw: read in full three times (340, 351, then 304 lessons). Each read changed the cutter at its source
    (tools/htd-drawn.js): shapes sized by the area they cover, not their box (thin legs came first); scraps moved to the step
    they join; a part that touches nothing drawn brings forward what it hangs on (a leaf with its stem, a flag with its
    pole). A tool that pulled every hiding part forward collapsed lessons (a xylophone into one step) and was removed.
    304 new lessons meet the store rule; the last read reports only faults a child could not follow, refused at the source.
  - The last How to Draw read (304 lessons) found 9 a child could not follow (a head missing until the end, feet before the
    body, a first step that does not read): refused for How to Draw. Final store 2026-11-09: Dot to Dot 1,221 pictures,
    Picture Tracing 1,645, How to Draw 990, Color by Number 781 (of 1,690 in the index).

### The full maker build after the install (2026-11-09, `build-bundles.js`)
The one full build refused 55 gallery thumbnails and one whole template; all three faults were mine from 2026-11-08:
- Color by Number (K-393, K-394, K-587, K-588, G3-479, every language): the tiny sections' numbers were font 8, under the
  page floor (qa/lints.js: text under 9 px). Measured in Chromium with Baloo 2 over 30 pictures (red numbers over the art,
  pixels landing on the outline): a font-9 digit in a tiny section 0.02 %, a two-digit code 6.5 %, plain capitals
  0.2-0.7 %, Ø 0.3 %, W 3.1 %, Æ 3.4 %, accented capitals (Å Ä Ö Ü É Ç Ñ) 2-5 %; two-digit codes in the next size up 0 %;
  the probe shows 13.5 % at font 16 (it sees overlap). So: tiny numbers are font 9; the letters key uses plain capitals
  and Ø only; sums and products keys take only pictures with no tiny section — and since only one level-3 design is that
  roomy, their level 3 also takes level-2 pictures (the key carries the level there: sums to 20, the harder tables). A
  coded page with no picture named (the thumbnail sample) now starts on a roomy picture of its level.
- K-501 Trace, Then Color by Number built no page in any language: the refusal check added to pt-faces.js on 2026-11-08
  reads a library drawing path, and K-501's list holds Color by Number design names. K-501 now passes its own check: a
  design is offered when every drawing in it is one the tracing review keeps, or one refused only for pages that NAME a
  picture (the plain sun of 41 designs). All 15 / 17 / 37 designs are back.
- K-501 read on its own pages: the numbers were the Color by Number page's, but the tracing store draws every line of a
  drawing, so a small shell's number sat on its traced ridges and a starfish's on its dots (15 of 69 designs had a number
  over a traced line, up to 34 % of its pixels; the font-16 numbers of the tiny parts added more). `tools/k501-labels.js`
  now numbers each design on its own traced page (the region map with the traced lines drawn over it: a part is what the
  child sees between lines) → data/cbn/k501-labels.json; a design whose key colour finds no part is not offered (69 of 69
  are). The shell has a 6 in each strip; the starfish's 1 sits between its dots. After: 6 designs with a small font-9
  number touching a texture dash of its own part (3-8 % of its pixels, read at 4x: legible, inside the right part). Big
  parts keep the 16-24 tracing-page numbers; parts under MIN_R take the Color by Number sizes.
- Screen replays (sharded, 2026-11-09): Mystery Grid Picture (G1-555) level 3 printed an 18 × 18 grid at 34 px, the screen's
  tap floor, and sub-pixel layout left cells at 33.99 px (8 screens failed at 768 and 1024 px). The page had no height to
  grow them (the grid and a two-row key used ~730 of 733 px), so a picture of 16 cells or more is printed without its
  blank margin (data/fl/pixel-art.js grid): 16 × 16 at 37 px. 152 Color by Number marks screens pass.
- Landing previews: build-previews.js never redraws a preview that exists, so the 2026-11-07 previews would have shipped
  for every changed page. Rebuilt from an empty folder (870 redrawn, 11,060 from the content cache); app.webp re-taken for
  the six flagship makers (their panel now has theme tiles and the picture picker); og.jpg / ribbon.webp kept.
- Gallery cards (read on the new app screenshots): a card names the template TYPE by deleting the title's word slot, and
  where the slot sat mid-sentence the card read "Finish the {N} Drawing", "Circle the in the Words and Count", "Where Is
  the?", "Une los puntos: letra", ": marca los datos correctos" — 250 labels in 36 templates of 8 makers, live since
  2026-11-06. Each now has its own native label (scripts/makers/card-titles.json, written by one native + K-3 reviewer,
  read by me), carried into the strings as cardTitle; build-bundles.js fails a maker whose card would keep a slot or read
  around a missing word (poison: one label removed → the build names it).
- Gate suite (parity): Two Pictures to Trace (K-599) put a different second picture on the browser's page than on Node's
  (4 of 174 cases). Its partner loop caught every error, and in the maker a partner's trace not yet fetched throws
  PlatformMissing (the runtime fetches it and builds again): the loop walked on to a partner that happened to be loaded.
  It now rethrows anything that is not a fit failure, as lib/pt-faces.js firstThatFits does; the page names its partner
  (data-lcs-pt-src2). Parity on Picture Tracing: 174 cases, 0 failing.
- Gate suite (answer keys): Color the Letter in Its Place (K-626) set its letter boxes 2 px apart, and the key's ring
  (4 px outside the right box) was covered by the next box's white on every key page (12 of 5,094). The boxes are 10 px
  apart now, the row keeps its 500 px; the ordinal-numbers keys pass (48 pages).
- Gate suite (full run, 30 gates six at a time, 205 min, 2026-11-09): 25 passed. The five that failed:
  - collision — Trace the Path (K-600) level 1: the start dot (radius 10.5 at x 130) reached 2.5 px into the left
    picture's box (it ends at 122). Every path now starts at 140 and ends at 520: the dot clears the box by 7.5-12 px.
  - settings-space — Color the Tens Digit (G1-551) level 3 printed only three-digit numbers, so every answer sat in the
    middle tile. Level 3 now mixes four two-digit and four three-digit numbers (measured over 200 pages: 800 left, 800
    middle); levels 1-2 keep two-digit numbers, whose tens digit IS the left one (gate exemption, as K-064). Color the
    Multiples (G2-499): multiples on a chart in counting order keep a rhythm — that is skip counting (exemption, as G1-455).
  - slots + own-input — Color by Addition / Multiplication (K-587, G3-479): with no picture named, a page falls back to
    the level's first roomy picture (level 1: a book) AFTER the picker had been told "no picture", so the book was not
    marked as on the page and choosing it changed nothing. The picker is now told after the fallback. (own-input also
    timed out once under the six-way load.)
  - slots — K-498 / K-501 build differently from HEAD: the two fixes above (the look-model frame, the traced numbers).
    Both are maker-only templates (born 2026-11-03), never published as decks.
  - controls-budget — (a) the gate counted the word list of the Color by Number picture templates, which the shell hides
    (hideUnits): the gate now counts what the shell shows (poison added). (b) A real shell race: buildControls added the
    Pictures control when the page result arrived, even after another template had been clicked, so a slow page put its
    picker on the next template (K-500, which has no pictures, showed K-499's). A result now answers only the latest build
    of the controls.
- Read after the rebuild (the K-600 preview, then every new template's preview measured for empty bands —
  scratchpad fill-check: the largest blank band inside the body):
  - The 435 new drawings are rendered on opaque white; every library picture before them is transparent (measured over
    all 1,760 B&W pictures: exactly the 435 are opaque). Where flagship-new.js places a picture as an image on a cream
    card or an answer key's painted cell (K-582, K-583, G1-548, K-593, K-594, K-600), a new drawing showed as a white
    square. Its image helper now draws with mix-blend-mode: multiply (the card shows through the white; the lines stay
    black). Coloring-page.js, glyph-tasks.js and the shell's picker set pictures on white, where nothing shows.
  - Coloring Numbers (K-580) asked the child to count the stars while the number itself could wear the stars pattern
    (1 star on the page, 5 more inside the 1): two answers. The number never takes the stars pattern now.
  - Pages that left a quarter to half of the body empty: K-580 (the number 340 → 460 at level 2, 400 → 500 at level 1,
    260 → 340 at level 3), K-582 Color and Count (fixed 5 columns made the pictures width-bound: the column count is now
    the one that gives the biggest pictures, 109-170 px instead of 97-149), K-610 Color and Trace (320 → 380), K-611 My
    Number Poster (300 → 400, 320 with two frames), K-613 Color the Days (day numbers 74 → 86). Coloring Alphabet level 2
    (K-579) keeps its pair: "Aa" side by side already fills the page width.
- Read after the next rebuild (2026-11-10: all 616 new-template previews redrawn, measured, the changed ones read):
  - Color the Days (K-613): the bigger day numbers (86, width up to 88 in a 92 px column) left 4 px between two numbers
    side by side, so a row of two-digit days read as one long number ("23242526…"). A day number is now at most 76 wide:
    measured over 231 pages (11 languages × 3 levels × 7 month starts, 6,853 numbers) the smallest gap is 16 px (4 px with
    the old width — the check was run against it).
  - Still a fifth to a quarter of the body empty: K-580, K-610, K-611. Each number now takes what the rest of its page
    leaves of a 720 px stack (under the tallest chrome): K-580 counts its star rows (levels 1-2 up to 600, level 3 up to
    480), K-610 380 → 430 (two 130 px lanes), K-611 400 → 450 (356 with two frames). The maker's own page checks pass on
    all 693 pages tried (11 languages × 3 levels × the units where the star rows change); at most 82 px of the 811 px
    body is left over.
  - Which One Faces the Other Way (K-593): the turkey row was read beside its mirror — all three turkeys in the pool face
    one way clearly; it stays.
- Read after the rebuild of 2026-11-10 (build 7; its thumbnails stopped on one screenshot that stalled for 3 min — the
  same page draws in 2 s alone; the last ten makers' thumbnails were drawn by build-thumbs.js on its own, 11,930 present):
  - K-580 / K-610 / K-611 still showed a blank strip under every big number: CG.word() keeps a whole line's height (room
    above the capitals and for descenders) and digits have neither, so a third of the number's box stayed empty. word()
    takes `tight: true` (the box hugs the text's own ink, as glyph() does); the three big numbers use it. Same boxes, so
    the page checks still pass on all 693 pages; a 600 px box now holds a ~560 px number.
  - A capital and its small letter were each drawn by glyph(), which scales a letter to its own height: a was as tall as A,
    and O o, C c, S s, U u, V v, W w, X x, Z z printed as two identical letters on pages that teach the pair. K-579 (levels
    2-3), K-617, K-624 (levels 2-3) and K-616's key (level 3) now draw the pair as one word on one baseline (capLow in
    glyph-tasks.js). Checked on 2,883 pages (every letter of every language, every level, every card copy): the page
    checks pass and in all 714 same-shape pairs the capital is clearly the taller letter (the check fails all 184 when the
    pair is poisoned to two capitals). K-579 level 2 still leaves space above and below: the pair is as wide as the page.
  - Find and Color (K-616) level 3 mixes capitals and small letters, and in these bubble letters a capital I and a small l
    are the same bar (measured: the closest pair of different letters, closer than O and o). On an I or L page the other
    letter was a second right answer — 173 such cells in 440 pages (11 languages × 20 versions × I and L). It no longer
    stands in that grid: 0 cells. Not live yet: the templates were never deployed.
- Read after the rebuild of 2026-11-10 (build 8: identical to build 7 except the stalled thumbnail, gone; 11,930
  thumbnails, 0 refused; the 77 previews of the seven changed templates redrawn, 66 drawn, 11 unchanged pages reused):
  - Coloring Alphabet (K-579) level 2 still filled only about half the body: side by side, "Aa" is bound by the page's
    width. The capital now stands ABOVE its small letter, both at one scale (capOverLow in glyph-tasks.js; word() returns
    its box in glyph units, uw / uh, so two words can share a scale), filling a 680 px stack. Level 3 is level 2 with the
    letter's pictures under it (stack 681-724); a letter with no picture (no Æ) keeps the full pair instead of a small
    pair on an empty page. Level 1's lone capital went 540 → 680, bound by the page width only for M, W and Æ (23 of 302
    pages, 511-584 px: those letters fill the 640 px width). The pair check now also measures the stacked pairs: 2,883
    pages, 0 failing, 714 same-shape pairs (604 stacked pages), the capital clearly the taller in every one; every level
    of K-617, K-616 and K-624 stacks 663-712 px.
  - Every other new template's preview fills at least ~82 % of the real body (≥ ~650 px): the fill check's window runs
    from under the title band to the footer, wider than the body the shell leaves, so its percentages read low.
  - Color and Trace (K-610): the row's last guide is a lone start dot by design (model, trace, trace, start dot, empty).
- The rendered gates after build 9 (2026-11-10), 30 gates, 3 at a time:
  - Find the Differences G1-412 (7 differences) and G1-415 (mirror pictures) showed NO picture picker in the browser,
    and every other Find the Differences face offered only the scenes the browser had already fetched. The picker's list
    keeps a scene when it has room for the differences, and it opened each scene file to count; in the browser most scene
    files are fetched only when a page draws them, so the open threw "not preloaded" into the list's own try and the
    scene dropped out (two-scene faces: every scene). The counts now travel in data/fl/fd-pins.json (`scenes`: drawings
    and nameable nouns of each of the 430 pinned scenes, tools/fl-fd-pins.js --facts) and the list reads them there.
    Node builds of all 189 Find the Differences pages × copies give the same list and the same page with and without
    the counts. Not live yet.
  - Picture Tracing K-420 level 1 copy 1 (a garden pond whose main drawing is a duck) told the picker it showed no
    picture, so the picker offered the duck as a change that changes nothing. A Level Set copy with no picture chosen
    now reports its scene's main drawing when the picker offers it (lib/ptx.js heroSrc); the pages are byte-identical.
  - The controls-budget gate counted the controls 300 ms after the page frame appeared; the picture control is added
    when the first page result arrives, 0.5-3 s later under load, so 13 templates read as missing it. The gate now counts
    once the tap hint (added with it) is there.
  - The slots gate's "catalogue unchanged" check flagged K-498 and K-501: the two deliberate fixes of 2026-11-09 (the
    picture clear of the model's frame; the numbers off the traced lines). Each of the 6 seeds draws the same picture
    or design as the committed version; only that layout differs.
  - unique-solution ran on no puzzle template (the run's maker list had none): a run artefact, re-run on its makers.
  - own-input swept every template of a maker in ONE browser call; on Find the Differences that call outlasted the
    30-minute protocol limit, so every full run since 2026-11-09 died there and the picture swaps had never reached
    the 32 makers after it (Find the Differences to Sentences). It now makes one call per template and logs any
    template over 2 minutes (none was); re-run in two parts after build 10: makers 1-27 and 28-59.
