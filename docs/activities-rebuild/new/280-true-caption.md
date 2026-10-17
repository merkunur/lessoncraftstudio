# New 280 — The Full-Stop Shutter (W.2.2)

## 0. Identity
- id `true-caption.play.w-2-2` · grade 2 · Common Core W.2.2 (write informative texts: introduce a topic, use facts, provide a concluding statement) — here the G2 "write about the picture" form of it: complete, true sentences that tell what is in a picture · strand Writing · files `mini tools/true-caption-core.js`, `true-caption-activity.js`, `true-caption-activity.html`, `true-caption-activities.json`. Title: **"The Full-Stop Shutter — Write About the Picture"**.
- worksheets it covers: **G2-278** Write About the Picture (word bank helps) · **G2-299** … What You See (starters + word bank) · **G2-300** … Your Own Words (no starters). The screen composes from tiles (the free-writing of G2-300 is not reproduced, as the dossier rules); what it keeps from all three is the act: look, choose what to say, say it as a whole sentence that is TRUE, and write two or three different ones.
- new instrument (no old activity). Grammar comes from the shared `LCSGrammar` (`REFERENCE TRANSLATIONS/lcs-grammar.js`, §14.3b of CLAUDE.md): its `PREP_FORMS` and `prepSentence` landmark frames for *on top of / under / next to* in all 11 locales (fi postposition + genitive, de dative via its refuse-guarded tables).

## 1. The pitch
"Build a sentence about the room and press its full stop — the full stop is the camera's shutter: the camera frames exactly the things your sentence names and only takes the photo if what you wrote is true; three true, different photos fill the album page with your captions."

## 2. Why a child will want it again (the fun)
- **A camera that only believes true sentences.** Above the room hangs a drawn camera viewfinder (four corner brackets). The child's sentence decides where it looks: the brackets glide to frame the two things the sentence names (the cat and the table), zoom in a little, and *click-flash* — the photo slides out like an instant photo, develops from grey to colour (600 ms) and flies into the album with the child's sentence printed under it as its caption.
- **The full stop is the button.** The full-stop tile is a round red shutter button. It will only seat at the end of a whole sentence; once seated, pressing it takes the picture. A child quickly learns that a sentence "isn't finished" until it can take a photo.
- **Tiles that change to fit.** When a noun tile clicks into the place after *under*, it re-dresses itself into the form that place needs (en "a table" stays; de "ein Tisch" becomes "einem Tisch"; fi "pöytä" becomes "pöydän" and the postposition moves after it) — the room for meaning, the machine for grammar.
- **End-of-round show:** with the album page full, the page lifts, the room behind it fades, and the album reads like a little book: the photos with their captions, one under the other — the child's text about the picture. Then the page turns to a new room.
- **Free play:** between rounds the camera can be aimed at anything by tapping it (a free snapshot with no caption, not kept).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** look at a picture and write complete sentences that state true facts about it (what is there and where), each sentence different, each ending with an end mark — the sentence-level heart of G2 informative writing.
- **Misconception 1 — a list of words is a sentence** ("cat table"). Pushback: the shutter (full stop) will not seat until the frame has a who/what, the position word and the thing it is placed by; a half sentence has no button — nothing can be photographed.
- **Misconception 2 — writing something that is not in the picture.** Pushback (setting *Trap word*): the bank holds one thing that is not in the room; a sentence naming it sends the viewfinder sweeping the whole room and coming back empty — the photo develops blank. A false position ("A cat is under a table" when it is on it) frames the cat and the table, and the photo shows the truth: the cat wobbles where it really is and the wrong position tile lifts out.
- **Misconception 3 — writing the same thing three times.** The album refuses a photo it already has, and a page may not say one place over and over (album 2: two different position words; album 3: none more than twice) — so the child has to look at a different part of the room.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px**
- **The room** (stage 470 × 330): drawn wall (cream) and floor (sand band, 1.5 px ink line). One piece of library furniture stands in the centre, scaled to 240 px wide (the table, chair, bench, stool or bed/sofa — §6), with its top surface and the space beneath it clearly free. Library objects: one on top of the furniture (or two side by side on the bed/sofa), one under it (when it has legs), one on the floor at each side. Every object 96 × 96 (the under-space of a 240-wide table/chair/bench/stool is ≥ 110 px, measured from the art's ink box at build). Objects are identical-scale and stand on visible surfaces (a 6 px drawn contact shadow).
- **Viewfinder:** four teal corner brackets (2.5 px), resting round the whole room.
- **The sentence strip** (below the room, 470 × 64): slots drawn as dotted boxes: [who/what] [is] [position] [by what] [ • ] — "is" is pre-printed (the copula comes from the frame); slot widths grow with their tile. In fi the strip is [who/what] [on] [by what] [position] [ • ], as the frame orders it.
- **Word bank** (below the strip, 470 wide): noun tiles 120 × 48 (Nunito 20 px, the noun with its indefinite article from the per-locale table, e.g. "a cat"), position tiles 140 × 48 (coral outline: "on top of", "under", "next to"), the shutter tile (a red disc 48 px with a white dot — the full stop).
- **Album page** (bubble column, 200 × 330): two or three photo slots (180 × 110, drawn white frame) each with a caption line beneath; feedback bubble; Check is the shutter itself (no separate Check button; an aria-equivalent "Take the photo" button is the shutter tile).
- **Task line (≤ 24 px):** "Build a true sentence about the room. Press its full stop to take the photo."

**At 360 px** (stacked): room 340 × 260 (furniture 170 wide, objects 64 × 64; the under-space is ≥ 76 px); strip 340 × 56 (tiles shrink to 18 px text, the strip wraps to two lines in long locales); bank 2–3 rows of 104 × 44 tiles; album as a strip of three thumbnail frames (100 × 64) under the bank. Shutter bottom at 360 × 740: header 56 + task 52 + room 260 + strip 64 + bank 3 × 52 + album 80 → 668 ≤ 740; 320 × 640: room 300 × 230, bank 3 columns → 628.
- Library pictures: furniture and objects only. Viewfinder, strip, tiles, album frames, shutter are drawn geometry; the only words on the apparatus are the tiles (content).

## 5. The hand
- **Drag a tile** into a slot (or tap tile, tap slot). Noun tiles fit either noun slot (who/what, by what) — WHICH noun is the subject is the child's meaning choice; position tiles fit only the position slot; the shutter only the end slot and only when the three slots before it are filled (otherwise it hovers, wobbles and floats back: "not a whole sentence yet"). A noun placed in *by what* re-dresses into the frame form (200 ms cross-fade). Constraint (critic, one rule for every room so the dimming never leaks a fact): the furniture tile fits ONLY the *by what* slot, and *by what* takes ONLY the furniture — every sentence is about where a thing is in relation to the one piece of furniture. This removes the undecidable sentences a child would argue with: "a ball (under the table) is next to a dog (on the floor beside it)" or "a cat (on a low stool) is next to a dog" have no honest yes/no, so they cannot be built.
- **Press the shutter** (tap the seated full stop, or Enter on it) = Check.
- **Take a tile out:** drag it back to the bank or tap it in the strip.
- Keyboard: Tab through bank tiles, Enter picks, Left/Right choose a slot, Enter drops; the seated shutter is a button.
- Sounds: soft card *tick* on snap, camera *click-whirr* on a photo, a soft *pff* on a blank photo.

## 6. The rounds
One **round = one room**: fill the album with 2 (or 3) different true sentences. 9 rooms; order-only reshuffle per pass (never the previous order, never the same furniture twice running).

| # | furniture (centre) | on top | under | left floor | right floor | trap (setting) |
|---|---|---|---|---|---|---|
| 1 | furniture/table | pets/cat | toys/ball | pets/dog | toys/robot | classroom/book |
| 2 | furniture/chair | classroom/book | pets/cat | toys/ball | toys/car | pets/dog |
| 3 | furniture/bench | toys/robot + classroom/book (side by side) | — | pets/cat | pets/dog | toys/ball |
| 4 | furniture/stool | pets/cat | pets/dog | toys/car | toys/ball | toys/robot |
| 5 | furniture/table | toys/car | toys/robot | classroom/book | pets/cat | pets/dog |
| 6 | furniture/bed | pets/cat + toys/robot (side by side) | — | toys/ball | pets/dog | toys/car |
| 7 | furniture/chair | pets/dog | toys/ball | toys/robot | classroom/book | toys/car |
| 8 | furniture/bench | toys/ball + pets/dog (side by side) | — | toys/car | pets/cat | toys/robot |
| 9 | furniture/sofa | pets/dog + toys/ball (side by side) | — | toys/robot | classroom/book | pets/cat |

**True photos per room** (computed by the model from the layout, not stored): room 1: a cat is on top of a table · a ball is under a table · a dog is next to a table · a robot is next to a table (4); every room has exactly 4 (benches, bed and sofa: two on top + two floor neighbours — the contact sheet shows the bench's legs are too short for a 96/64 px object underneath, so benches carry no under-object). The album (2 or 3) never runs out, and no single sentence can be "the answer to copy". **Variety rule:** the photos on one page may not all use the same position word (album 2: two different words; album 3: no word more than twice) — so "X is next to a table" twice never fills a page; a third same-word sentence is refused like a repeat (no miss) with the hint `samePlace`.
**Measured (critic, `work-c36/c280.js`, the revised one-landmark rule):** a room builds 12 sentences (15 with the trap) of which 4 are true — 33.3 % (26.7 % with the trap). This is higher than the designer's 16.6 %, honestly: those extra "false" sentences were mostly the undecidable next-to pairs removed above. Random building is still checked on every false press (the photo shows the truth), and the variety rule stops the one cheap pattern ("always next to").
**Placement detail:** the furniture is always centred, but WHICH object sits in which of the four places varies, the furniture kind varies (table/chair/bench/stool/bed/sofa), and the bank's tile order is shuffled every round (nouns, then positions, never in the order of the room left-to-right).
**Pictures** (verified labelled ×11; seen on furniture, pets, toys, classroom sheets): furniture/table (round, legs), chair, bench, stool, bed, sofa; pets/cat, pets/dog; toys/ball (a black-and-white football — never called "red"), toys/car, toys/robot; classroom/book. Refused: toys/blocks (plural label), furniture/desk (lamp, laptop and plant already drawn on top), around-the-house/brush, pillow+cushion together (one word in 7 locales).

## 7. Check (the shutter), the misses, the success
- **Shutter pressed with slots empty** — impossible by construction (it does not seat); a tap on the bank's shutter tile when the strip is incomplete → hint, no miss: "Finish the sentence first — then it can take a photo."
- **A repeat** → no miss: the matching album photo pulses; hint: "That photo is already in your album. Write something different."
- **Miss 1 — false sentence:** the viewfinder frames the two named things and flashes; the photo develops showing them; the subject object wobbles where it really is and the position tile lifts back to the bank. Hint: "Look at the {noun} in the photo. Where is it?" — **absent noun** (trap): the viewfinder sweeps the whole room and returns empty; the photo develops blank; the trap tile turns grey (stays in the bank). Hint: "The camera can't find {noun} in this room."
- **Miss 2 — the same sentence false again:** the subject object gets a 3 px outline and the true position for it pulses in the bank (e.g. *on top of* glows if the cat is on the table). For a trap: the grey tile leaves the bank. Hint: "The glowing word tells where the {noun} is."
- A new move clears the help until the next shutter.
- **Success:** click-flash; the framed photo develops in colour and flies to the album with the caption "A cat is on top of a table." (the child's sentence, sentence-cased, full stop shown); when the page is full: the reading show (§2) and the line "Your page tells about the room."

## 8. Settings (each visibly changes the board at rest)
1. **Album:** *2 sentences* (two photo frames) / *3 sentences* (three). Default: 2.
2. **Trap word:** *Off* (the bank holds only what is in the room) / *On* (one extra noun that is not there). Default: off.

## 9. Words (EN source)
- Title "The Full-Stop Shutter" · instruction "Look at the room. Build true sentences about it, and press each full stop to take a photo for your album."
- Task line (§4). Hints: `notWhole` "Finish the sentence first — then it can take a photo." · `samePlace` "Your page already says that place. Tell where something else is." · `repeat` "That photo is already in your album. Write something different." · `false1` "Look at the {noun} in the photo. Where is it?" · `absent1` "The camera can't find {noun} in this room." · `false2` "The glowing word tells where the {noun} is."
- Success: the caption itself; page end "Your page tells about the room."
- Tiles: nouns from image-vocabulary with the locale's indefinite article (§ traps); positions from LCSGrammar `PREP_FORMS` (en *on top of / under / next to*).
- Settings: "Album" — "2 sentences" / "3 sentences"; "Trap word" — "Off" / "On".
- **Locale traps.** (1) **Frame grammar** is LCSGrammar's: `prepSentence(loc, key, landmark)` returns the landmark half with the right case/article (de dative "unter einem Tisch", nl "onder een tafel", fr frame B "à côté d'une table" — the "de/d'" lives in the frame, so the *next to* tile shows "à côté"; es/pt/it "debajo de una mesa", "accanto a un tavolo"; sv/da/no "under ett bord / under et bord / under et bord"; fi postposition + genitive "pöydän alla"). Where it returns null for a noun (refusals), that noun is not used in that locale's rooms — the gate lists them. (2) **The subject half** (indefinite nominative) is not in LCSGrammar: a small per-locale table — en a/an, de ein/eine/ein (from the vocab gender), fr un/une, es un/una, pt um/uma, it un/uno/una/un', nl een, sv en/ett, da en/et, no en/ei/et (bokmål ei optional; author chooses en), fi none — reviewed by the native panel; words with two genders (de *Iglu*) excluded. (3) **Copula**: es/pt *está* (location → *estar*), it *è*, fi *on* — from LCSGrammar `COPULA`. (4) **Word order** fi "Kissa on pöydän päällä." (postposition after the genitive) — the strip's slot order is per locale. (5) toys/ball and toys/balloon are both fr "Ballon" — the balloon is never in a room. (6) Sentence case: the subject tile is sentence-cased only when it starts the strip (German nouns stay capitalised everywhere).

## 10. Sound off, access, phones
- Everything is shown: viewfinder framing, the photo, the wobble, the grey tile; TTS (optional) reads the built sentence when a tile is placed.
- Keyboard §5; aria: room objects "{noun}, on top of the table / under the table / on the floor left of the table"; strip slots "who or what", "position", "by what", "full stop — take the photo".
- Taps: tiles 44–48 px tall; shutter 48 px disc.
- Pictures: 96 px at 704, 64 px at 360/320.
- Phone §4.

## 11. Distinct from
- **New 256 The Instruction Paintbox — the sentence that reads your picture back (RF.1.4.a):** the child changes the PICTURE to match a given sentence, and the sentence's words light as it is read. Here the picture is fixed and the child WRITES the sentence; the camera frames the named things and takes a photo only of a whole, true sentence; three different photos make a text.
- **Row 128 The Sentence Stage** (each word acts on a stage), **New #278 The Sentence Railway** (capital = engine, full stop = caboose: sentence boundaries) — here the end mark is a shutter that only arms on a complete sentence; the instrument is about truth and difference, not boundaries.
- **Prepositions app / K position activities:** choosing a position word for a given picture-and-frame; here the child also chooses WHAT to write about and which thing is the subject.

## 12. Build plan
- **Model (core):** `room = {F, U:boolean, top:[...], under, L, R, trap}`; `places(room)` → noun → place; `truth(subject, prep, landmark)`: on = subject ∈ top & landmark = F; under = subject = under & landmark = F; next = subject ∈ {L, R} and landmark = F (the landmark is always F); `photoKey` = (subject, prep) — the landmark is always F; `canSeatShutter(strip)`; `shutter() → {ok, reason:'false'|'absent'|'repeat'|null, frame:[bboxes]}`; `album`.
- **Gate (own ground truth, `verify-true-caption-core.js`):** an independent truth oracle written from the room table (not the core) agrees with `truth` on every buildable sentence of every room; every room has ≥ 4 distinct true photos and ≥ albumSize; random-sentence truth rate per room ≤ 25 %; a shutter never seats on an incomplete strip; `under`/`on top of` never accept a non-furniture landmark; repeats refused; the variety rule (album 2 two position words, album 3 none thrice) enforced; LCSGrammar `prepSentence` checked non-null for all 6 furniture × 3 positions × 11 locales (critic ran it: 0 nulls; fi genitives pöydän/tuolin/penkin/jakkaran/sängyn/sohvan come from FI_GENITIVES); the trap noun never appears in the room; LCSGrammar returns non-null for every (locale, prep, landmark) used, and the per-locale subject-article table covers every noun (refusals reported); bank order never equals the room's left-to-right order.
- **Mutations:** shutter seats on 3 tiles · accept "under a cat" · landmark slot accepts a non-furniture noun · page filled with one position word only · accept a repeat · accept the trap noun · variety rule skipped · photo kept on a false sentence · tile re-dressing skipped (de nominative after unter) · bank in room order · miss 2 shows without a miss.
- **Pictures to verify:** furniture table, chair, bench, stool, bed, sofa; pets cat, dog; toys ball, car, robot; classroom book (labels ×11 present). Build measures each furniture's free top surface and under-space from the art's ink box (`scripts/worksheet-gen/data/art-extents.json` method) and fails if a 96/64 px object does not fit under it.
- **Risks:** the under-space of furniture/stool at 240 px wide (measure; if < 100 px the stool is used for *on top of* and *next to* only); long noun phrases in fi/de on phones (the strip wraps).
- Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Taking photos is a joy, the full-stop shutter is a small surprise, the blank photo when the camera "can't find a dog" makes them laugh, and the album page is something they made.
2. **Would a teacher put it on the board?** Yes — complete sentence, end mark, true to the picture and different each time: the exact success criteria of G2 "write about the picture", with grammar handled by a reviewed engine so the child's attention is on meaning.
3. **Would a parent trust it?** Calm room scenes, library pictures, no score, grammar right in every language.
4. **The invention in one sentence:** the full stop is the camera's shutter — it only arms on a whole sentence, and the camera only takes the photo if the sentence is true.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- Looked at the furniture contact sheet: furniture/bench is a park bench with short legs — a 96/64 px object cannot stand under it. Rooms 3 and 8 moved their under-objects onto the bench (two side by side on top); only table, chair and stool carry an under-object.
- Removed every undecidable sentence: with "next to" between any two objects, "a ball (under the table) is next to a dog (beside the table)" or "a cat on a low stool is next to a dog" had no honest yes/no and the model would have refused what a child sees as true. One rule now: the *by what* slot takes only the furniture (no dimming that depends on the room, so nothing leaks).
- Re-measured with my own oracle (`work-c36/c280.js`): 4 true of 12 buildable (33 %; 27 % with the trap) in every room — honestly higher than the designer's 16.6 %, which counted those ambiguous pairs as false. Added the variety rule (two position words on a 2-photo page; none thrice on a 3-photo page, hint `samePlace`) so "X is next to a table" twice can never fill a page.
- Ran LCSGrammar `prepSentence` for the 6 furniture nouns × on top of / under / next to × 11 locales: 0 refusals (de dative einem/einer, fr frame B "à côté d'un", fi genitive + postposition).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
