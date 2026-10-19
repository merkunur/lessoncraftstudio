# #24 — Solve the Story → THE STORY STAGE (K.OA.A.2)

ORDER row 24 · id `ten-frame.solve-the-story.k-oa-a-2` (kept) · own files `story-stage-core.js`, `story-stage-activity.js`, `story-stage-activity.html`, `story-stage-activities.json`. The row left `ten-frame-activities.json` (round-tripped in the file's own 1-space format). Metadata was frozen; all 11 locales already had slug, title and intro. Design: `designs/024-ten-frame.md`.

## The skill
K.OA.A.2: solve add-to, take-from and put-together word problems within 10 by modelling them with objects. Within 5 and within 20 are teacher settings.

## The apparatus and its invention: EVERY SENTENCE IS A STAGE DIRECTION
- A story card with three lines: the narrator's line (▸), the child's line (✋) and the question (?). The lit line is underlined; numbers are bold numerals.
- The stage is a ten-frame (2 × 5 places) on a scene colour (sky, pond, grass, table). Pictures come from the library: spring/bird, bunny, tulip; At the Supermarket/apple, pear; farm animals/duck (drawn as a duckling, so every locale says ducklings); toys/balloon; bakery/cookie; pets/goldfish.
- The narrator's line acts itself out: after a reading pause (1.2 s, longer while it is read aloud), its things arrive one by one.
- The child's line:
  - add-to and put-together: a pile at the top right of the stage. A tap brings one to the next place; a drag drops it on the place the finger chooses. A tap on a brought one sends it back. The narrator's things cannot be removed.
  - take-from: no pile at all. A tap makes a thing leave (balloon pops, cookie is eaten, fish swims off, tulip is picked) and it stays as a pale crossed outline; a tap on the outline brings it back.
- The main button reads **Next** during the child's line. It wakes (teal, nudging) only after at least one move. Pressed earlier, it gives "Act out this line first." — never a miss.
- Then the question lights, the keys wake (1–10 as whole numbers within 5/10; digits with 0 refused first within 20), and the button becomes **Check**.
- Check:
  - empty box → "Count what is on the stage…" (take-from: "Count what is still on the stage…"), no miss;
  - miss 1 → THE REPLAY: the stage empties and the story re-acts itself at its TRUE numbers, each arriving or leaving thing with a numeral chip (the change in coral), then the stage is left telling the true story (the child's moves kept where they fit). If the child acted a different amount, the note adds "The story says 2, not 3.";
  - miss 2 → the things still there are numbered 1 … n−1 and "?" on the last (the help never writes the answer); outlines stay unnumbered;
  - right → the question line completes ("There are 5 birds now!"), the things bow in turn, the box turns gold, the shell celebrates with the sum ("3 and 2 more make 5." / "7 take away 3 leaves 4." / "4 and 3 make 7.").
- Within 20: two ten-frames of drawn counters (one colour per picture), with the picture shown beside them as the label (the pile shows the second picture in add and put-together stories).
- "Tell your own" (free play): one frame, a pile, the first line "There are 4." live; Next freezes it; then "1 more comes." / "1 goes away." / "Now there are 4." write themselves ("Now there are none." — never 0).

## Rounds (no 0 anywhere; the answer is never a number in the story)
- Within 5 (9): 2+2 birds · 1+3 ducklings · 3+2 apples · 2+1 bunnies · 5−2 balloons · 4−1 cookies · 5−4 fish · 3−2 tulips · 2 birds and 3 bunnies.
- Within 10 (10, default): 3+2 birds · 4+3 apples · 2+4 ducklings · 5+4 bunnies · 7−3 balloons · 8−2 cookies · 6−4 fish · 9−5 tulips · 4 birds and 3 bunnies · 5 apples and 3 pears.
- Within 20 (9): 8+5 · 9+6 · 7+7 · 12−4 · 15−6 · 13−5 · 18−7 · 10+6 · 6 apples and 8 pears.
- Order-only reshuffle per pass: no equal answers side by side, at most 2 of one story type in a row, never the same order twice, a pass never opens on the story the last one closed on (DFS with random picks; gated over 10 000 seeds per level plus a fixed random source).
- Stories are stored as whole sentences per locale and kind, with a `_1` form wherever a 1 changes the grammar (1 duckling, 1 more bunny, you eat 1 cookie, 1 fish / 1 tulip is left). Settings: Numbers 5/10/20 · Read aloud On/Off.

## Layout
- Stacked at every width: card → stage (band: picture label · note · pile, above the frame) → keys + box + delete + main button.
- Wide (≥ 560): places ≤ 106, pictures place − 8 (98 on the 648 stage), pile 104 with a 96 picture; two frames side by side ≤ 60.
- Narrow: the frame edge to edge, pictures fill the place (64 at 360); two frames stacked ≤ 44 (within 20 on a phone scrolls below the fold, as the design anticipated); card tools on their own row; below 300 px only the lit line shows, with a chevron for the whole story.
- Departures from the design sheet: the in-line Next button became the main button (Next → Check) — it saved the phone fold and reads as one path; the note sits in the stage band beside the pile instead of under the stage.

## Gates
- `verify-story-stage-core.js` 11 213 (own oracle: answers recomputed from the type; numerals parsed back out of every sentence in every locale; the `_1` forms; pictures in the colour-theme index and on disk; the order rules; the replay ends on the true story whatever the child acted; layout floors).
- `mutate-story-stage.js` 34/34.
- `local-test-story-stage.js` 2 461 / 0: real taps and one real drag, every Within 10 story × 11 locales, Next before acting, the empty Check, miss 1 replay, miss 2 numbering, success + the shell bubble, acting one too many, Within 5 singulars, Within 20 digits, free play, width sweep 320–1366.
- `visual-qa-activity.js` 60 renders · `audit-activity-hierarchy.js` 518/0 · `audit-settings-efficacy --tool=story-stage-activity` 2 live · preflight routes PASS · content ×11, prose-claims, SERP, tells, answer-rank PASS.
- The old `verify-ten-frame-storyproblem.js` exits "retired"; `local-test-ten-frame.js` dropped the row.

## Review (one agent, native ×11 + pedagogy) — applied
- MUST: the prose claimed the story "cannot be skipped by adding the numbers it mentions" — untrue (one move wakes Next). Rewritten ×11: the story is played, not just read.
- MUST: de "Von 4 gehen 1 weg" → a `sumTakeB1` line for b = 1 in every locale.
- MUST: it "altri {b}" broke gender and "altri 1" → "ancora {b}" (also free play).
- MUST: fi/de/nl "the story says {b}" read as a total in take-from stories → "Tarinassa luku on", "In der Geschichte steht", "In het verhaal staat".
- MUST: fr/es/pt/it hints used masculine pronouns for tulipes/manzanas/maçãs/mele → "les images", "los dibujos", "as figuras", "le figure".
- SHOULD (all applied): a take-from ask that counts only what is still there (`hintAskLeft`), and howToPlay step 3 "the pictures still on the stage" ×11; de free-play "noch"/"keiner"; fr "Il en arrive encore"; fr "le message"; es "Cortas", "¿Todavía no?"; nl "verkeerd"; fi prose genitive; no "LK20 i matematikk".

## Traps
- An edit script that REPLACED a CSS rule instead of appending after it silently dropped the phone rule for the card tools, squeezing the story beside three buttons — seen only by reading the 320 render. Append with the anchor kept.
- The bash tool's heredoc broke on a long python edit again ("unexpected EOF") — write edit scripts with the file tool.
- Identical consecutive orders are too rare for random seeds to catch; a fixed random source (always 0) is what makes the "never the same order twice" mutation die.
