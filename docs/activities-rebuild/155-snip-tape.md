# #155 — Span's Length Gap → THE SNIP-OUT TAPE (2.MD.A.4; all 11 locales)

ORDER row 155 · id `span-length-gap.how-much-longer.2-md-a-4` (kept). Design: `designs/155-span-length-gap.md`. Covers worksheet G2-236 (How Much Longer?).

## The invention
- **The board:** two real things lie on two lanes against a wooden zero wall, with one tape measure between them.
- **Clipping:** the child puts the orange clip where the top thing ends and the green clip where the bottom thing ends, by dragging a clip or tapping the tape (upper half = orange, lower half = green). A dashed plumb line drops from each clip to its thing. When both clips are on, the stretch of tape between them glows.
- **Answering:** the child types the gap on the activity's own keypad (digits, delete, Check). A readout box in the tray shows "N cm".
- **Check, in this order:**
  1. **Loose things off the wall:** "push each thing against the wall" (no miss).
  2. **A clip missing:** "put a clip where each thing ends" (no miss).
  3. **A clip in the wrong place:** a miss. The part it missed is shaded and the real end gets a notch.
  4. **Nothing typed:** "now type" (no miss).
  5. **A wrong number:** the piece between the clips is snipped out into the tray, leaving a hole with zig-zag cuts. A dashed strip as long as the child's own number is laid from the tray's zero, so the longer length or the sum sticks out far past the piece; a sum longer than the tray buckles at the wall.
  6. **Miss 2:** one dot in each centimetre space of the piece.
- **Success:**
  - the piece counts itself from 0, one soft pop per cm;
  - the longer thing's overhang past the shorter one's end glows, the same length as the piece;
  - the bubble says "The top one is 7 cm, the bottom one is 5 cm: 7 − 5 = 2. The top one is 2 cm longer!" (or the bottom-one version);
  - the keypad goes away.

## Deviations from the design
- **The rounds were rebuilt after review.** The design's tables drew real full-size things at small lengths, which would have taught false sizes one row after #154 taught real sizes: a canoe 8 cm, a skateboard 16, a tie 17/20, a shovel 19, leek/celery/hammer 9–15, a loafer 6 cm shorter than a crayon, a desk stapler 6.
  - **Now every length is believable for the real thing** (toys at toy sizes), and each picture has one length per ruler set. The gate asserts both, against its own table of real ranges.
  - **0–12:** caterpillar 5 / centipede 7 · key 7 / glue 10 · toy plane 11 / toy car 6 · snail 4 / goldfish 5 · pinecone 9 / grasshopper 5 · stapler 12 / frog 7 · wand 10 / toy truck 6 · toy train 5 / teaspoon 12 · lizard 7 / fish 8.
  - **0–20:** corn 18 / paintbrush 16 · stapler 15 / pinecone 10 · tablespoon 16 / caterpillar 6 · goldfish 6 / parsnip 17 · centipede 9 / wand 16 · grasshopper 7 / lizard 9 · frog 8 / toy truck 12 · toy plane 14 / fish 10 · toy car 9 / glue 12.
  - **What the gate checks on the tables:**
    - the gap is never either length, and never 0;
    - the longer thing is on top in 4/9 rounds per set;
    - no "always type N" bot wins more than 2 rounds;
    - in loose starts, the longer thing starts nearer the wall in 5/9 rounds.
- **The activity has its own keypad and Check** (as every rebuilt row does), not the shell keypad.
- **Check order:** the wall is checked before the clips. The reviewer showed that "clip first" was untrue in loose mode: clipping a loose thing and then pushing it to the wall breaks the clips.
- **Picture floors use the MEASURED stage widths.** The stage is 328 px at 360 and 288 px at 320; the design assumed 340. The gate's floors for a picture's short side are ≥ 96 px on desktop (as designed), ≥ 50 at 360 and ≥ 44 at 320. 64 px at 360 is not reachable at a 328-px stage once the clips need parking room.
- **Layout:**
  - the clips are called orange and green (not coral/teal);
  - the board shortens for phones, and the solved screen drops the keypad and the empty hint line so Next stays above the fold;
  - tape numerals are spaced every 2 cm when a centimetre is narrow;
  - on phones "cm" sits above the tape's end.
- **Kept the activity name** "Span's Length Gap" in en (the frozen page title and slug carry it). it's in-activity title is now "Quanti centimetri in più?", because *spanna* means a hand-span, a non-standard unit.
- **da / no / fi pages are NEW** (slug, title, intro written in this build and native-reviewed). The frozen metadata of the other eight locales is untouched.

## Review (one native + pedagogy reviewer, all 11 locales)
- **Pedagogy and logic:**
  - the real sizes (above);
  - the check order;
  - "the long one" → the comparative ("the longer one", das längere, la más larga, a mais comprida, quella più lunga, het langste, den længste/lengste);
  - hintClips puts the clip "where each thing ends", not "on the end of the thing".
- **Per-locale wording:**
  - fi: one peg per thing ("kumpikin pyykkipoika … sen esine");
  - no: "tingen den hører til" instead of the wrong reflexive *sin*;
  - fr: « pointillés », « décalés » instead of « en vrac », plus a clearer instruction; it «spostate»; fi «erillään seinästä»;
  - es "tira de rayitas" (a dashed strip; "punteada" clashed with the dots hint); es/pt curly quotes;
  - "push EACH thing against the wall".

## Gates
- **Logic:**
  - `verify-snip-tape-core.js` 35,661/0 — own tables plus real-size ranges; ink boxes re-measured with sharp; exhaustive grading over every clip × typed answer; loose starts; bots; plan; strings ×11; drawing rules; geometry at the measured stage widths;
  - `mutate-snip-tape.js` 38/38 killed, control passes.
- **Browser:**
  - `local-test-snip-tape.js` — 11 locales; real taps and drags; picture ink measured against the tape; plumb lines on the ends; glow; snip; dashed strip; dots; shading; loose push by drag and by tap; keyboard; 0–20 spacing; 7 states × 6 widths. Poisoned: a 10 % short picture fails 3 checks.
  - `visual-qa-activity.js` 378/378 (driver `scripts/visual-qa-phases/span-length-gap.how-much-longer.2-md-a-4.js`);
  - hierarchy 488/0; settings efficacy 2 live.
- **Content:** content gates ×11, prose claims, SERP copy, preflight routes.
