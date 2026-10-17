# New 246 — The Face Dial → THE FACE YOU SHAPE BY HAND (feelings)

## 0. Identity
- id `face-dial.play.self-awareness` · grade K · framework SEL (CASEL self-awareness; `alignment.framework` from `frontend/lib/frameworks.ts`) · strand Social-Emotional Learning · files `face-dial-core.js`, `face-dial-activity.js`, `face-dial-activity.html`, `face-dial-activities.json` (scaffold `--num=246`).
- Worksheets covered: **K-319** Feelings: Match the Face to the Word (Name mode: face → word, and Shape mode: word → face) · **K-334** Which Face Shows the Feeling? (Name mode + Shape mode) · **K-332** Draw the Feeling Face (Shape mode — the child BUILDS the face instead of drawing it) · **K-331** How Do You Feel? Circle the Face (Situation mode) · **K-333** Feels Good or Feels Bad? (Good-or-hard mode, worded "feels hard") · **K-335** How Do I Feel Today? (Today mode, open-ended, nothing checked). Feeling words and the situation scenes come from the panel-reviewed K-319 bank `scripts/worksheet-gen/data/b3/feelings.js` (11 locales).
- New instrument (no old activity). **Orchestrator ruling 2026-10-17: allowed as apparatus** — a plain geometric face whose parts ARE the controls. It must stay geometry and never become a character: a circle, two plain dots (no catch-light, no lashes), two short round-capped lines, one mouth path, two eyelid arcs — **no** nose, hair, ears, blush, skin tone, body, name, voice, idle blinking or "reacting" to the child; it changes only when a grip moves.

## 1. The pitch
"A plain round face with little grips on its eyebrows, eyelids and mouth — pull them and the face changes its feeling under your finger; shape the feeling the word or the picture asks for, and the real feelings face slides over to see if they match."

## 2. Why a child will want it again
- **It is a face you can squish.** Four tiny teal grips sit on the face: pull the inner eyebrow down and the face frowns crossly; push it up and it worries; push higher and the brows shoot up in surprise. Drag the mouth corner up — a smile spreads; drag the lower lip down — the mouth opens; pull the eyelid down — the face gets sleepy. Every change is continuous and instant (the face redraws on every pointer move). Children make faces back at it.
- **The match moment.** On Check, the library feelings face (the bright yellow face from the picture library) slides across and lays itself over the child's face. When they match, both outlines glow and they settle together as one; the word appears under them in large letters.
- **Today mode** has no right answer: shape how you feel, and the matching library face fades in with "It's OK to feel {feeling}." Children love "finding" every feeling by sculpting.

## 3. The skill and the misconception
- **Skill:** recognise feelings from faces (happy, sad, angry, scared, surprised, tired), name them, connect a situation to a feeling, and know that some feelings feel good and some feel hard — and that all of them are OK to have.
- **Misconceptions and how the dial pushes back:**
  1. *Reading only the mouth* ("a smile is happy, everything else is sad"). Angry and sad both have a turned-down mouth; scared and surprised both have an open mouth. The dial only reaches angry when the BROWS go down, and only reaches scared (not surprised) when the mouth corners go down too. A child who sets only the mouth gets, on Check, the library face beside theirs with the brows pulsing on both — the difference is shown exactly where it is.
  2. *"Some feelings are bad."* Good-or-hard mode never says "bad": hard feelings land in a soft blue tray and a drawn blanket folds over them — hard feelings are looked after, not thrown away. Today mode answers every feeling with "It's OK to feel {feeling}."
  3. *Neighbouring feelings are the same* (happy/excited, sad/tired). Each feeling is a measured REGION of grip space with gaps between them; neighbours never overlap, so "sleepy eyes" (tired) and "worried brows + frown" (sad) are different places the hand must go.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 640 × 520):
- **The dial** (left, 380 × 420): a big drawn face circle 320 px (cream-yellow `#FFE9A8` fill, 3 px ink outline). Features, all drawn geometry in ink:
  - two **eyes**: plain ink dots 26 px (no catch-light — a highlight gives it a character's life); an **eyelid** = a cream arc that lowers over each eye (E = 1 open … 0 closed, at 0 the eye is a curved line).
  - two **eyebrows**: short 6 px round-capped lines 60 px long, above each eye.
  - the **mouth**: a closed path — upper lip curve + lower lip curve; corners move with C, the lower lip drops with O (inside fill dark-coral when open).
  - **grips** (teal dots 18 px drawn, 48 px touch target): at the RIGHT brow's inner end (B), the top of the RIGHT eyelid (E), the RIGHT mouth corner (C), and the middle of the lower lip (O). The face is mirrored — moving a right-side grip moves both sides. Each grip moves only vertically along a short faint track (dotted, 80–120 px).
- **The prompt card** (right column, 240 × 200): Shape mode — the feeling WORD (Baloo 2 34 px) on a cream card; Situation mode — a vignette of 1–2 library pictures (96–120 px) on a drawn card with a small motion (§6).
- **The reveal slot** (right column, 240 × 200, under the card): where the library face waits (hidden, outline only) and from which it slides over the dial on Check.
- **Good-or-hard mode:** the dial is replaced by two trays: **feels good** (warm yellow drawn tray 280 × 200 with a drawn sun corner) and **feels hard** (soft blue drawn tray 280 × 200 with a drawn folded blanket at its edge); a stack of library faces (120 px) waits above.

**At 360 px** (stage 336 × 700): prompt card 336 × 140 on top (vignette pictures 80 px; word 30 px); dial 270 px face (grips 44 px targets, tracks 70–100 px); reveal slot = the library face slides in from the right edge over the dial (no separate slot). Good-or-hard: stack on top (faces 80 px), trays 160 × 170 side by side. At 320: face 250 px.

**Library pictures** (contact sheet `emotions.png` opened): emotions/happy (open smile, flat brows), sad (worried brows, open dark eyes, frown), angry (V brows, teeth), scared (raised brows, wide eyes, open downturned mouth), surprised (raised brows, round eyes, O mouth), tired (closed lids, small open mouth); Good-or-hard adds emotions/excited, content. Situations (contact sheets `b14-misc.png`, `christmas.png`, `toys.png`, `desserts-and-sweets.png`): christmas/present, accessories/medal, toys/balloon, toys/kite, weather/thunderstorm, weather/stormy, furniture/bed + space/moon, around-the-house/pillow + space/moon, desserts-and-sweets/popsicle. (clothing/pajamas does NOT exist in the library — checked against `clothing.json`; the pillow replaces it.)
**Refused:** emotions/capricious, disgusted, bored, merry, confused, sceptical, shy (not in the K-319 matchable set; several read differently across cultures); hospital/syringe (the bank marks it vetoable — fear of injections is real, not a game); a dog or any animal as a situation (it can carry any feeling); miscellaneous/ghost (cute or scary — no one right answer).

**Task lines** (≤ 24 px): Shape "Make the face look {feeling}." — the word is ALSO on the card · Situation "How would you feel? Make your face." · Good-or-hard "Does this feeling feel good, or does it feel hard?" · Today "How do you feel today? Make your face."

No words on the dial.

## 5. The hand
- **Grips:** pointerdown on a grip (or anywhere within 30 px of it) captures it; vertical motion maps to its parameter linearly along its track, clamped; the face redraws within one frame (< 16 ms). Release: no snapping (the face is continuous). Double-tap a grip = back to its rest value.
  - Brow B (−1 … 1): track from 50 px below rest to 70 px above. B < 0 rotates both inner ends down (V, up to 28°); 0 < B ≤ 0.5 raises the inner ends (worry tilt up to 20°); B > 0.5 also lifts the whole brow (up to 30 px).
  - Eyelid E (0 … 1): lid arc lowers over the eye; E ≥ 0.85 also enlarges the eye dot 15 % and shows more white (wide eyes).
  - Mouth corner C (−1 … 1): corners move ±24 px; both lip curves bend with them.
  - Lower lip O (0 … 1): lower lip drops up to 50 px; near C ≈ 0 and O > 0.5 the mouth rounds into an O.
- **Live label (Today mode only):** whenever the face is inside a feeling's region, the matching library face fades in small (64 px) beside the dial.
- **Good-or-hard:** drag the top face of the stack onto a tray. It settles in; on the hard tray the drawn blanket edge folds over its lower half (300 ms) — never hiding the face. Nothing is judged until Check.
- **Situation vignettes play once on round start and on tap** (≤ 2 s, gentle): present → its lid lifts and a drawn sparkle pops; medal → it swings on its ribbon and a shine sweeps; balloon (happy) → bobs on its string tied to a drawn peg; balloon (sad) → the string end slips off the peg and the balloon drifts up out of the card, the string tail dangling last; kite → rises and swoops; popsicle → tips off a drawn table edge and lands on the drawn floor with a drawn drip; thunderstorm/stormy → the card's background flickers lighter twice (slow, no flashing faster than 2 Hz — photosensitivity safe); bed + moon / pillow + moon → the moon rises and the card dims.
- **Sound (optional):** a soft rubbery squeak while stretching, a chime on a match; TTS reads the word or the task line. Never a scream or thunder sound.
- **Free play:** Today mode at any time; after each success the dial stays live until Next.

## 6. The rounds
**Regions** (the gate's ground truth — a face is in a feeling when ALL its conditions hold; regions are disjoint on at least one parameter, with gaps between them; the rest face B = 0, E = 0.7, C = 0, O = 0.1 is in NO region):
| feeling | brow B | eyes E | corners C | open O |
|---|---|---|---|---|
| happy | −0.3 … 0.35 | ≥ 0.4 | ≥ 0.4 | any |
| sad | 0.3 … 0.75 | ≥ 0.4 | ≤ −0.3 | ≤ 0.35 |
| angry | ≤ −0.5 | ≥ 0.4 | ≤ 0 | any |
| scared | ≥ 0.6 | ≥ 0.75 | ≤ −0.35 | ≥ 0.55 |
| surprised | ≥ 0.75 | ≥ 0.75 | −0.2 … 0.25 | ≥ 0.55 |
| tired | −0.3 … 0.6 | ≤ 0.3 | −0.5 … 0.3 | any |
Each region's centre is drawn to look like its library face (verified side by side by the reviewer at 704 and 360).

**Shape mode — 9 rounds per pass:** 6 feelings: happy, sad, angry, scared, surprised, tired, angry, surprised, sad (the brow-dependent ones twice). 4 feelings (happy, sad, angry, scared): happy, sad, angry, scared, sad, angry, scared, happy, angry.

**Name mode (K-319 face → word, K-334) — 9 rounds per pass:** the prompt card shows a LIBRARY face (no word); 3 word chips (4-feelings) or 4 (6-feelings) wait under it; the dial starts at rest. The child drags a word chip onto the dial: the dial MORPHS to that word's face (its region centre, 400 ms) right beside the library face — the word builds its own face, and that IS the commit (one try = one Check). Round table (6 feelings; chips = answer + the neighbours a mouth-only reader confuses):
| # | library face | chips (answer first here; shuffled on screen) |
|---|---|---|
| 1 | sad | sad · angry · tired · happy |
| 2 | surprised | surprised · scared · happy · sad |
| 3 | angry | angry · sad · scared · tired |
| 4 | tired | tired · sad · happy · surprised |
| 5 | scared | scared · surprised · sad · angry |
| 6 | happy | happy · surprised · tired · angry |
| 7 | angry | angry · sad · surprised · happy |
| 8 | scared | scared · surprised · angry · tired |
| 9 | sad | sad · tired · angry · scared |
4-feelings setting: faces happy, sad, angry, scared (sad, angry, scared twice; happy ×3) with 3 chips drawn from those four. **Answer position:** chip order shuffled per round; the gate measures over 1,000 passes that the answer chip is in each slot 25 ± 4 % (3 chips: 33 ± 4 %) and never in the same slot 3 rounds running.

**Situation mode — 9 rounds per pass** (one right feeling each, from the K-319 bank's scenes plus three motion vignettes the reviewer confirms are unambiguous in all 11 locales):
| # | vignette | feeling |
|---|---|---|
| 1 | present (lid lifts, sparkle) | happy |
| 2 | balloon slips off its peg and floats away | sad |
| 3 | thunderstorm flickers | scared |
| 4 | bed, the moon rises | tired |
| 5 | medal swings and shines | happy |
| 6 | popsicle falls to the floor | sad |
| 7 | stormy cloud flickers | scared |
| 8 | pillow, the moon rises | tired |
| 9 | kite rises and swoops | happy |
4-feelings setting: rounds 4 and 8 become balloon-bobbing (happy) and popsicle (sad) variants — tired is not in the set. Angry and surprised are never asked in Situation mode (no library situation reads as only angry or only surprised in all 11 locales); the K-331 worksheet makes the same choice.
- A situation's `alsoPlausible` feeling from the bank (present → surprised; storm → surprised) is answered on Check with the reveal of the bank's primary face beside the child's and the hint "That can happen too! Most people would feel {feeling}." — counted as a miss only from the second time (so a thoughtful alternative is honoured once).

**Good-or-hard — 9 rounds per pass,** 4 faces per round (2 feel good, 2 feel hard) from good = happy, excited, content · hard = sad, angry, scared: 1 happy, excited · sad, angry · 2 content, happy · scared, sad · 3 excited, content · angry, scared · 4 happy, content · sad, scared · 5 excited, happy · angry, sad · 6 content, excited · scared, angry · 7 happy, excited · scared, sad · 8 content, happy · angry, scared · 9 excited, content · sad, angry. Surprised and tired never appear here (neither good nor hard for everyone).

**Today mode:** no rounds; the dial and the live label only.

- **Answer position:** Shape and Situation modes have no positions — the answer is a region of continuous space. The gate measures that each region occupies < 12 % of the 4-D grip space (so random fiddling rarely lands in it) and that the rest face is in no region; every round starts from the rest face. Good-or-hard: the stack order is shuffled; good is on top ≤ 50 ± 5 % across a pass.
- **Order:** order-only reshuffle per pass (`nextTask`), pass 2 ≠ pass 1.

## 7. Check, the misses, the success
- **Check with the rest face** (nothing moved) → hint, no miss: "Pull the little dots to change the face."
- **Name mode:** the drop is the Check. Wrong word → the morphed dial and the library face sit side by side and the feature where they differ most pulses on BOTH (miss 1, hint by feature as below); the chip returns and the dial springs back to rest (300 ms). Second wrong word → the right chip breathes once (miss 2). Hint: "Look at the eyebrows and the mouth together." Right word → the library face slides over the morphed dial, they coincide, glow teal: "That face looks {feeling}!"
- **Miss 1:** the library face of the asked feeling slides in and sits SIDE BY SIDE with the dial (same size); the one feature that is farthest from the region (largest normalised distance — brows, eyes, corners or open) pulses on BOTH faces. Hint by feature: "Look at the eyebrows." / "Look at the eyes." / "Look at the corners of the mouth." / "Look at how open the mouth is."
- **Miss 2:** that feature's grip shows a faint dotted ghost grip at the region's centre on its track; the library face stays beside the dial. Hint: "Move the dot to its shadow."
- A grip move takes the help away until the next Check (the library face slides back to its slot).
- **Success:** the library face slides over the dial and the two lay together; both outlines glow teal and the word appears under them (36 px). Shape: "That face looks {feeling}!" · Situation: "Yes — {situation-line}. You might feel {feeling}." (situation-lines: "a present to open", "the balloon flew away", "a big storm", "time for bed", "a medal for you", "the popsicle fell down", "a dark storm cloud", "a soft pillow, time to sleep", "the kite is flying") · Good-or-hard: the good tray's sun shines, the hard tray's blanket tucks in: "Some feelings feel good and some feel hard. All feelings are OK."
- Good-or-hard misses: Check with faces still on the stack → hint, no miss "Put every face on a tray." Miss 1: a face on the wrong tray wobbles. Hint "Think: would this feeling feel nice, or hard?" Miss 2: the wobbling face lifts and its right tray glows. Hint "This one goes over here."

## 8. Settings
1. **Mode:** name the face / shape the face / how would you feel? / good or hard / today — at rest: a library face + word chips + dial · a word card + dial · a picture card + dial · a face stack + two trays · a dial alone with no card.
2. **Feelings:** 4 (happy, sad, angry, scared) / 6 (+ surprised, tired) — at rest the reveal slot shows the outline row of the 4 or 6 library faces available this pass (tiny, 40 px, grey), so the setting visibly changes the board.

## 9. Words (EN source)
- title "The Face Dial" · instruction "Shape a face with your fingers to show a feeling."
- promptName "Which word makes this face? Drop it on the dial." · promptShape "Make the face look {feeling}." · promptSituation "How would you feel? Make your face." · promptGoodHard "Does this feeling feel good, or does it feel hard?" · promptToday "How do you feel today? Make your face."
- hints: hintStart "Pull the little dots to change the face." · hintBrows "Look at the eyebrows." · hintEyes "Look at the eyes." · hintCorners "Look at the corners of the mouth." · hintOpen "Look at how open the mouth is." · hintGhost "Move the dot to its shadow." · hintNameBoth "Look at the eyebrows and the mouth together." · hintAlso "That can happen too! Most people would feel {feeling}." · hintTrayStart "Put every face on a tray." · hintTray1 "Think: would this feeling feel nice, or hard?" · hintTray2 "This one goes over here."
- celebrations: celebrateShape "That face looks {feeling}!" · celebrateSituation "Yes — {situationLine}. You might feel {feeling}." · celebrateTrays "Some feelings feel good and some feel hard. All feelings are OK." · today "It's OK to feel {feeling}."
- situation lines: as §7 (9 strings).
- feeling words: from the K-319 bank per locale (word + wordF) — never re-invented.
- aria: ariaFace "The face: eyebrows {down|flat|worried|up}, eyes {closed|sleepy|open|wide}, mouth {frown|flat|smile}, {closed|open}." · ariaMatch "It matches: {feeling}." · ariaTray "{feeling} on feels {good|hard}."
- settings: setMode "Mode" · modeName "Name the face" · modeShape "Shape the face" · modeSituation "How would you feel?" · modeGoodHard "Good or hard" · modeToday "Today" · setFeelings "Feelings" · feel4 "4" · feel6 "6".
- **Locale traps:** feeling adjectives AGREE in fr/es/it/pt — the frames are written with a fixed noun so the form is fixed: es "Esta cara se ve {contenta}" (cara is feminine → the bank's wordF), it "Questa faccia sembra {felice}/{arrabbiata}" (faccia f → wordF), pt "Este rosto parece {feliz}/{bravo}" (rosto m → word), fr "Ce visage a l'air {content}" (visage m → word) — the gate asserts each locale's frame uses the form matching its frame noun's gender (the §A.13.54 fixed-noun anchor). Situation celebrations address the child ("you might feel …") — in fr/es/it/pt that adjective agrees with the CHILD, whose gender is unknown: those locales use a noun phrase instead ("tu pourrais ressentir de la tristesse / de la joie", es "podrías sentir alegría / tristeza / miedo / sueño", it "potresti provare gioia / tristezza / paura", pt "você pode sentir alegria / tristeza / medo / sono") — the reviewer authors the noun forms. "Feels hard": de "fühlt sich schwer an", fr "c'est difficile", es "se siente difícil", sv "känns jobbigt", da "føles svært", no "kjennes vanskelig", fi "tuntuu vaikealta", nl "voelt moeilijk", it "è difficile" / "è pesante" — the reviewer picks a gentle "hard/heavy" word in every locale and refuses any word meaning "bad" (it "fa stare male", de "schlecht", fr "mauvais"). "Tired" vs "sleepy" (fi väsynyt/uninen; sv trött) follows the bank. "pillow" and "cushion" share one word in 7 locales (PICTURE-RULINGS) — no cushion is ever on a card. Faces are culture-neutral yellow faces; no skin tone.

## 10. Sound off, access, phones
- Legible with sound off: the face itself, the pulsing feature, the ghost grip, the match overlay, the word.
- Keyboard: Tab cycles the four grips (focus ring around the grip); ↑/↓ moves the grip by 0.1 of its range; Enter = Check. Good-or-hard: ←/→ chooses a tray, Enter places.
- aria-live: the face description after each grip move (debounced 400 ms), and the match result.
- Taps ≥ 44 (grip targets 48 / 44 on phones; grips ≥ 56 px apart — the eyelid and brow grips are offset to opposite sides of the eye's centre line if the face is under 300 px).
- Pictures: library faces 200 px at the match (704) / 270 at 360 (they match the dial size); vignette pictures ≥ 96 at 704, ≥ 64 at 360.
- Fold at 360 × 740: header 56 + task 52 + card 140 + dial 290 + Check 56 ≈ 594. At 320 × 640 ≈ 560.
- Photosensitivity: storm flicker ≤ 2 Hz, low contrast change.

## 11. Distinct from
- Tool **feelings-check-in** (tap a face on a chart, hear a kind reply, see what could help): there the child chooses a ready face; here the child BUILDS the face, and the features are the content.
- **#232 Sense Face** (planned): senses via body-part sockets — a different face and skill. **#219 Body Map** (designed): naming parts.
- Registry: no built or designed activity uses continuous direct manipulation of facial features as the answer space.

## 12. Build plan
- **Core state** `{mode, feelings:4|6, roundIdx, face:{B,E,C,O}, prompt:{feeling|scene}, trays:{good:[],hard:[]}, stack:[…], alsoUsed:boolean, help}`.
- **Functions:** `regionOf(face)` → feeling | null (table §6); `distance(face, feeling)` → per-parameter normalised distance outside the region; `worstFeature(face, feeling)`; `ghost(feature, feeling)` = region centre on that track; `drawFace(face, size)` (activity) — pure geometry; `check()`; `helpLevel()`; `hintKey()`; `layout(width)`.
- **Gate's own truth (verify):** the region table re-implemented independently; regions pairwise disjoint (exhaustive 21⁴ grid sweep → no point in two regions); the rest face in no region; each region < 12 % of the grid; each region's centre lies inside it; the six library faces' feature readings (hand-recorded from the contact sheet: brows/eyes/corners/open per face) lie inside their regions — a design-time cross-check; Situation answers = the K-319 bank's `feeling` for the bank scenes; refused keys never appear; Good-or-hard rounds 2 + 2 by bank valence; every frame in every locale uses the gender form its frame noun requires (from a per-locale noun-gender table in the gate).
- **Mutations:** Name mode accepts a wrong chip · Name-mode answer chip stuck in slot 1 · a catch-light or blush added to the dial · happy accepted with a frown · angry accepted with flat brows (mouth-only reading) · surprised accepted with a frown (scared/surprised merged) · tired accepted with open eyes · rest face counted as a feeling · a region widened into its neighbour · ghost grip placed outside its region · Check at rest counts a miss · help kept after a grip move · alsoPlausible counted as a miss the first time · "bad" appears in any string (regex, poisoned both ways) · a surprised face in Good-or-hard.
- **Pictures to verify** (opened): emotions/happy, sad, angry, scared, surprised, tired, excited, content; the situation pictures in §4.
- **Ruled (orchestrator, 2026-10-17):** the drawn face is apparatus geometry under rule 5 because its parts ARE the controls; the build keeps it to the geometry listed in §0 (gate: the dial SVG contains only circle/line/path elements in the ink + face-fill colours, no element ids or classes named nose/hair/cheek/blush/lash, and no animation not driven by a grip). **Not blocked.**

## 13. The four questions
1. **Would a child choose it again?** Yes — a face you can squish into every feeling, a real feelings face that flies over to check, and a Today mode with no right answer.
2. **Would a teacher put it on the board?** Yes — "what do the eyebrows do when you're cross?" is the conversation the dial forces; it beats "smile = happy" in front of the class.
3. **Would a parent trust it?** Calm, no shaming words ("hard", never "bad"), nothing frightening (no injections, gentle storms), nothing stored about how the child feels.
4. **The invention:** a plain face with four grips on its brows, lids and mouth — every feeling is a place your fingers have to find, and the real face slides over to show which part is different.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Orchestrator ruling applied: the geometric face is apparatus because its parts are the controls; the design now pins it to pure geometry (plain dots — the catch-light removed — no nose/hair/blush/lashes, no idle animation) with a gate on the dial's SVG and a mutation.
- Added NAME mode (K-319's face → word direction and K-334, which Shape mode only covered word → face): a library face is shown, and the word chip the child drops onto the dial BUILDS its own face beside it — a wrong word visibly makes a different face, with the differing feature pulsing on both. 9-round table with mouth-alike distractors, answer slot measured.
- clothing/pajamas does not exist in the library (`clothing.json` checked) — Situation round 8 now uses around-the-house/pillow + moon. Region table re-checked: the six regions are pairwise disjoint and the rest face is in none.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
