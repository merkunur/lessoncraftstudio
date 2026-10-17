# Row 74 — The Rewind Rail (L.K.1.a)

## 0. Identity
- id `snippy.letter-formation.l-k-1-a` (KEPT) · grade K · Common Core L.K.1.a · strand Language · page title (frozen) "Snippy's Letter Trace — Form Upper- & Lowercase Letters" · own files `mini tools/rewind-rail-core.js`, `rewind-rail-activity.js`, `rewind-rail-activity.html`; manifest row stays in `snippy-activities.json` (id, slugs, title, intro frozen), `tool` repointed. Read-only reuse (0 lines changed): `snippy-core.js` glyphs + its three-level pass and anti-cheat certify deck; `stroke-trace-core.js` for credited sweep.
- worksheets it covers (shared with row 73, different invention): K-238, K-254–K-258, K-278–K-283 (capital and lowercase sets) · K-311 Copy the Word, K-315 Copy the Capitals, K-289 Trace Your First Words (Level 3 short words) · K-239, K-259–K-263, K-388 (sight words as Level 3 word rounds) · K-284, K-290, K-291, K-310, K-391 (Level 3 words / Level 4 one-line sentences) · G2-377, G2-384, G2-385, G2-386 (Level 5 joins — BLOCKED on cursive stroke data, §12).
- what the old activity did: Snippy the snail; per letter a guided → checkpointed → certify pass (path hidden, unordered start dots); 10 letters (c s i t a d j b f S) each tied to a word ("the letter that starts cat"); en + fr rounds. **Kept:** the 10 letters and their words as Set 1, the three-step pass (the frozen intro: "first the easy way with the path shown, then on your own with the path hidden"), the anti-cheat certify (unordered start dots, a skewed deck where formation order ≠ proximity order), the fr round texts as the panel's seed, Snippy's name. **New:** the recording, the rewind rail, the side-by-side replay, all 52 letters, words and sentences.

## 1. The pitch
"After you write a letter, it writes itself again next to Snippy's — and the snail on the rail lets you rewind both, so you can see where you started, which way you went, and what you did first."

## 2. Why a child will want it again (the fun)
- **Your letter has a replay.** Children love watching their own movement played back. Under the two pads sits a rail, and the knob on it is Snippy — the library snail. Drag Snippy back and forth and both letters un-write and re-write themselves, in step, like a video.
- **The rail is a picture of how you wrote.** It fills with coloured bands — one colour per stroke — your strokes on the top track, Snippy's on the bottom. When they match, the two tracks look like one ribbon; when you did the strokes in a different order, the colours are in a different order and you can *see* it, like a barcode that does not match.
- **The shiny trail.** When the tracks match, Snippy glides the whole rail on its own leaving a glossy trail, both letters glow together, and the letter's picture word slides in (c — cat). Collecting a whole family (round letters, stick letters…) lights a family badge strip under the pads.
- No timer, score, streak or lives. A wobbly letter with the right start, order and direction is a perfect letter here.

## 3. The skill and the misconception
- **Skill:** form each letter with the correct start point, stroke order and direction (L.K.1.a; formation, not recognition), first with the path, then from memory with the path hidden.
- **Misconception 1 — "if it looks right, it is right."** The end shape can be perfect while the formation is wrong (an o drawn clockwise from the bottom, a t with the cross first, a d as a stick and then a ball). Only a replay shows it, so the apparatus *records the movement* and plays it next to the model.
- **Misconception 2 — wrong start.** At rewind time 0 the two sparks start in different places; a ring marks both starts.
- **Misconception 3 — wrong direction.** The sparks move opposite ways along the same stroke; the child's band on the rail carries backward-pointing chevrons.
- **Misconception 4 — wrong order** (dot before the stick in i, cross before the down-stroke in t, b/d made "ball first"). The rail's colour sequence differs from Snippy's.
- **Misconception 5 — b/d and p/q reversal.** The Mirror-twins set (Set 4) puts the reversible letters together; the replay shows at once that the ball went on the wrong side of the stick, because the two sparks travel to opposite sides.

## 4. The stage
**At 704 px** (stage 704 × 520; the bubble sits under the rail):
- **Two pads** side by side, each 320 × 300 (gap 24): left = **your pad** (cream `#FFFEFB`, the locale's ruling as data, same ruling table as row 73), right = **Snippy's pad** (same ruling, a faint teal tint at 6 %). The letter body: x-height 96 px, cap height 180 px.
- Before Check, Snippy's pad shows only the round picture (library, 120 px, centred) and the letter in print (Baloo 2, 64 px, teal) — the target, never the movement.
- **Guide on your pad** by step: *guided* — the road + hairline (Letter Studio palette), start dots numbered 1, 2, 3 with arrows; *checkpointed* — the road, start dots without numbers or arrows; *on my own* (certify) — no road; all start dots shown, unnumbered and unordered (the old anti-cheat).
- **The rail** under the pads: 664 × 44 px, two tracks of 18 px (yours on top, Snippy's below) on a brass bar; tick marks at stroke boundaries. **Snippy** — library picture insects-and-bugs/snail, 64 px — sits on the rail as its knob.
- **Step pips** (3 dots, 14 px) above your pad: guided · checkpointed · on my own.
- **Family strip** under the bubble: the set's letters as small tiles (28 px), done ones filled.
- **Task line** above (≤ 24 px).

**At 360 px** (stacked): pads stacked? No — side by side at 168 × 160 each would be too small to write in, so at < 520 px the pads **overlap in one 320 × 300 pad**: your ink in coral, Snippy's replay in teal on the same ruling, with a two-tab switch (Yours · Snippy's · Both, default Both) above the pad. Rail 320 × 40; Snippy 52 px on it (the knob's hit area 48 px). Picture 64 px in the pad corner before Check. Check bottom ≤ 690 at 360 × 740, ≤ 610 at 320 × 640 (320: pad 288 × 270).

No words on the apparatus except the letter being formed and the round word under the picture (content).

## 5. The hand
- **Writing** (your pad): pointer down on a start dot begins a stroke; ink under the finger within 16 ms; every point is recorded with its time `{x,y,t,stroke}`. A lift keeps the ink. Starting on a wrong start dot in *on my own* is allowed (it is recorded — the rewind will show it); in guided/checkpointed only the next start dot accepts a stroke (the old behaviour).
- **Rub out:** eraser button (44 px) clears your pad and the recording.
- **Check** → the **rewind plays once automatically** (both letters re-write in step, 0.8× speed, 1.6–3 s) while the rail's tracks fill with colour.
- **Snippy (rail knob):** drag along the rail; both pads scrub to that moment within 16 ms (sparks 14 px: coral on yours, teal on Snippy's; strokes not yet reached are hidden, the current stroke is thick). Release leaves the moment frozen; tapping Snippy plays from there.
- **Alignment of the two timelines:** the model's timeline is its strokes in order, each stroke's length in equal time; yours is your recorded strokes in the order you drew them, each matched to the model stroke it lies on (nearest by path distance) and coloured with that model stroke's colour (stroke 1 teal `#146B5E`, 2 coral `#F2784B`, 3 gold `#E8A53A`, 4 plum `#8E5BA8`). A reversed stroke gets chevrons pointing back.
- **Free play:** after a round, the child can write anything on the pad and rewind it (it is just recorded and played back — no grading), and scrub Snippy's model of any letter in the family strip by tapping its tile.

## 6. The rounds
One round = one letter (or one short word): guided → checkpointed → on my own (setting *Steps* can drop the middle step). Only *on my own* is graded for the round; the first two always end with the rewind as a showing.

**Level 1 — lowercase** (four sets; each ≥ 7; all 26 covered):
- *Set 1 — Snippy's letters (kept):* c (cat), s (sun), i (iguana — the old "ink" has no library picture), t (turtle), a (apple), d (dog), j (jar), b (ball), f (fox). (The old round 10, capital S, moves to Level 2.)
- *Set 2 — round and down:* o (orange), g (goat), q (quail), e (elephant — the picture json has no egg), u (umbrella), l (lamp), h (hen).
- *Set 3 — bumps and slants:* n (nest), m (mouse), r (rabbit), p (pig), k (kite), v (violin), w (window).
- *Set 4 — mirror twins and zigzags:* b (ball), d (dog), p (pear), q (quail), x (xylophone), y (yacht), z (zebra).
Pictures: pets/cat, beach/sun (weather/sun has no lcs-pictures label), pets/iguana, pets/turtle, fruits/apple, pets/dog, kitchen-tools/jar, toys/ball, animals/fox, fruits/orange, farm-animals/goat, birds-2/quail, animals/elephant, accessories/umbrella, around-the-house/lamp, farm-animals/hen, spring/nest, pets/mouse, pets/rabbit, farm-animals/pig, toys/kite, music/violin, around-the-house/window, fruits/pear, music/xylophone, vehicles/yacht, animals/zebra.
**Level 2 — capitals** (four sets, all 26 + the locale extras): *straight lines* L T I E F H N · *slants* A K M V W X Y Z (8) · *curves* C O Q G S U J (7, S is the old round 10 "the BIG one for Sun") · *ball-and-stick* B D P R + the locale extras (Ä Ö Ü / Ñ / Å Ä Ö / Æ Ø Å) padded to 7 with the most-reversed capitals J, N, Z.
**Level 3 — short words** (K-289, K-311, K-315, sight words): 8 per set, three or four letters, written left to right on one pad (the pad widens to 560 × 240 at 704; at 360 the word round uses a 320-wide pad with letters at x-height 48). The rail spans the whole word, one band group per letter, so a letter skipped or written out of order shows as a gap or a swap. EN sets: *first words* cat, dog, sun, hen, pig, fox, cup, bus · *capitals* CAT, DOG, SUN, BUS, HEN, PIG, FOX, CUP · *sight words* the, and, see, can, my, we, go, is (sets 2–6 as listed in row 73, one set per pass).
**Level 4 — one-line sentence** (K-391): 7 rounds, each short enough for one 320-px pad line: "I see it." · "We can go." · "I am up." · "Go to bed." · "It is red." · "Look at me." · "I see a cat.". The rail shows word groups separated by a gap band (the space) — a missing space shows as no gap.
**Level 5 — joins** (G2-385 two-letter joins, G2-377 i t u w, G2-384 capitals in names, G2-386 words): the rewind compares the join stroke too (the exit of one letter into the entry of the next, one continuous band). BLOCKED on cursive stroke data (§12); refused in sv and fi.

**Answer position:** in *on my own* the start dots are unordered; the certify deck stays SKEWED as in the old core (formation order ≠ proximity order for the majority: i, j, t, f, a, d, s, the b/d reversal) so a "nearest dot first" tracer fails — the gate measures it (§12).
**Order:** each pass reshuffles the set order (order-only, never twice in a row).

## 7. Check, the misses, the success
- **Check with nothing drawn:** hint, no miss — "Start at a dot and write the letter. Then we'll play it back."
- **On Check the rewind always plays.** Grading (on my own step): every model stroke covered (swept arc ≥ threshold), each started at its own start (within 0.12 of the box), in the model's direction, in the model's order.
- **Miss 1:** the rewind plays and **Snippy stops at the first disagreement**; a small flag pops up on the rail there; both pads freeze at that moment with the two sparks ringed. The bubble names what the pictures show:
  - start: "Look where the two sparks begin. Start where Snippy starts."
  - direction: "Your spark went the other way. Follow Snippy's way."
  - order: "Snippy did the {stroke-colour} line first. Look at the colours on the rail."
  - shape (a stroke not covered): "One line is missing. Look at Snippy's letter."
- **Miss 2:** Snippy's replay is drawn *on your pad* as a faint moving teal spark ahead of your finger for the next try (a ghost guide for one try only), and the step drops back to checkpointed for that letter · "Follow the teal spark, then try on your own again."
- **A new stroke takes the help away** until the next Check.
- **Success:** the two tracks match; Snippy glides the full rail leaving a glossy trail (600 ms), both letters glow, the picture word slides in under Snippy's pad · "{letter}: the right start, the right way, in the right order — like Snippy!" (word rounds: "You wrote “{word}” letter by letter, left to right!")

## 8. Settings
1. **Letters:** Level-1/2 set picker (Set 1–4 · Straight · Slants · Curves · Ball-and-stick). The family strip shows the chosen set at rest.
2. **Steps:** Path, then on my own (guided → on my own) · All three steps (default) · On my own only. The step pips change at rest.

## 9. Words (EN source)
- title (shell): **Snippy's Letter Trace** (frozen) · instruction: "Write the letter, then rewind it with Snippy to see how you wrote it."
- task lines: guided "Start at dot 1 and follow the arrows." · checkpointed "Follow the path — remember where to start." · on my own "Now on your own: start at the right dot." · words "Write the word, one letter after another." · sentences "Write the sentence. Leave a space between words."
- round prompts (kept shape from the old rounds): "The letter that starts {word}: {letter}." e.g. "The letter that starts cat: c." (the old per-letter tips — "Start at the top dot, curve around." — become the guided step's hint line).
- hints/celebrations: §7. Settings labels: "Letters", "Steps", "Path, then on my own", "All three steps", "On my own only". aria: "Your pad", "Snippy's pad", "Rewind rail — drag Snippy to rewind", "Stroke {k}: started {here|elsewhere}, went the {same|other} way".

**Locale traps:**
- **"The letter that starts {word}" must be true in spelling.** Each locale's word per letter is chosen from the vocab label whose first letter is that letter; the panel rejects words where the first letter is silent or a digraph that misleads (fr "huit" for h is allowed in spelling but the panel may prefer another). **German nouns are capitalised**: a lowercase round cannot honestly say "the letter that starts Hund: h". In de the lowercase rounds use the frame "the letter in {word}" with the letter highlighted inside the word (a in "Hase"), and the capital rounds use "the letter that starts {word}".
- **Alphabets/extras, rulings, letterforms and stroke orders differ** — exactly as in row 73 §9 (Ä Ö Ü ß, Ñ, Å Ä Ö, Æ Ø Å; it's foreign letters; national rulings from data; per-locale `GLYPH_OVERRIDES` ruled by each native panel; diacritic marks are always the LAST stroke).
- **fr seed kept:** the old fr rounds (canard, soleil, île…) are the starting point of the fr panel.
- **Cursive**: national scripts; sv and fi refused.
- Sound off: the replay, the colours and the flag tell the whole story; TTS reads only the round word.

## 10. Sound off, access, phones
- Legible silently: start rings, chevrons, the colour order on the rail, the flag.
- Keyboard: ← / → move Snippy along the rail in 5 % steps; Space plays/pauses the rewind; Tab reaches the eraser and Check. Writing itself needs a pointer; the shell's switch-access flag (off by default) lets a stroke be credited by Enter on its start dot for children who cannot trace (documented).
- aria-live after the rewind: "Your start was the same as Snippy's. Your second line went the other way."
- Taps: start dots 22 px drawn, 48 px hit; Snippy 64/52 px knob, 48 px hit; eraser 44 px; the overlap-mode tabs 44 px high.
- Pictures: 120 px at 704, 64 px at 360.
- Phone: one overlapping pad with the Yours / Snippy's / Both tabs; the rail full width.

## 11. Distinct from
- **Row 73 Penny (this batch)** — the moving-paper carriage lays letters into lines; Snippy records and replays one letter against the model. Same worksheets, different question: Penny = "where does the letter go on the line?", Snippy = "did you make it the right way?"
- **Built #5 Fading Line** — a guide that fades; here the guide's job is replaced by a replay of the child's own movement.
- **Letter Studio (premium)** — a firefly demonstrates before tracing; nothing records the child or compares two movements.
- **#283 Cursive Ribbon, #218 Word Ribbon** — cursive ink ribbon and the space stone; no record/replay.
- No built activity or tool has a scrubbable timeline of the child's own work.

## 12. Build plan
- **Core state** `{level, set, round:{letter|word, step}, rec:[{x,y,t,stroke}], model:{strokes}, align:[{childStroke, modelStroke, reversed, startOk}], firstDiff:{t, kind}, misses}`; functions `startStroke(pt)`, `addPoint(pt)`, `endStroke()`, `align()` (match each recorded stroke to the nearest model stroke by mean path distance; direction by comparing start/end distances; order by sequence), `grade()` → `{ok, firstDiff}`, `scrub(u)` → `{childPt, modelPt, currentStroke}`.
- **Gate's own ground truth** (`verify-rewind-rail-core.js`): its own oracle draws every glyph correctly (100 % pass), plus four broken writers built from the gate's own copy of the glyph data: *reversed* (each stroke backwards) → firstDiff kind 'direction' at that stroke; *wrong start* → 'start'; *swapped order* (strokes 2 and 1) → 'order' at t = 0; *nearest-dot-first homer* in on-my-own → fails on ≥ 60 % of the skewed deck (the old anti-cheat proof, kept); *scribbler* → 'shape'. Every round's word exists as a vocab label starting with (or, in de lowercase, containing) the letter; every picture exists and is colour; Level-3 word rounds' units equal the word.
- **Mutations:** accept reversed stroke · accept wrong start · ignore order · align by drawing order instead of path (hides order errors) · firstDiff reported at the last difference · certify deck un-skewed · ghost spark left on after one try · de lowercase frame "starts" used · diacritic stroke allowed first.
- **Pictures to verify on contact sheets:** pets cat, iguana, turtle, dog, mouse, rabbit; beach/sun; fruits apple, orange, pear; kitchen-tools/jar; toys ball, kite; animals fox, elephant, zebra; farm-animals goat, hen, pig; birds-2/quail; accessories/umbrella; around-the-house lamp, window; spring/nest; music violin, xylophone; vehicles/yacht; insects-and-bugs/snail (the knob). Seen 2026-10-17: pets, kitchen-tools, around-the-house, vehicles, farm-animals sheets. Check at build: the quail, xylophone and yacht read clearly at 64 px; if not, the panel picks another word for q/x/y.
- **Risks:** stroke matching on very wobbly input — the match uses mean distance over resampled points (32 per stroke) and falls back to "shape" (not "order") when a stroke matches nothing; the overlapped phone pad must keep the two inks distinguishable (coral vs teal, and Snippy's at 60 % opacity).
- **BLOCKED:** cursive stroke data (same list as row 73) → Level 5 hidden until it exists; sv/fi refused. Per-locale `GLYPH_OVERRIDES` are a panel deliverable.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — rewinding your own writing with a snail on a rail is irresistible, and the matching ribbon is a clear, earned win.
2. **Would a teacher put it on the board?** Yes — it shows the class the thing teachers cannot see on paper: where a letter started, which way it went, what came first.
3. **Would a parent trust it?** Yes — no scores, wobbly is fine, the right school lines, and the feedback is a replay, not a red mark.
4. **The invention:** your letter is recorded and replayed beside Snippy's, and a snail on a rail rewinds both — so formation becomes something you can see.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 5→5 · reality 4→5
What changed:
- Reality: weather/sun is in the cache but has no lcs-pictures label → beach/sun for "s (sun)". Every other picture (iguana, quail, xylophone, yacht, violin, umbrella, nest, snail knob…) checked present in the theme JSONs.
- Kept as is otherwise: the recorded-movement replay with a scrubbable rail is the strongest formation invention in the batch, clearly separate from Penny's carriage (where the letter goes on the line) — Snippy answers "did you make it the right way?". The skewed anti-cheat deck, the de "the letter in {word}" frame and the overlapped phone pad are all correct and complete.
