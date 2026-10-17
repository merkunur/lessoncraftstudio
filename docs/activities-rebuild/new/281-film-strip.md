# New 281 — The Splicing Bench (W.2.3)

## 0. Identity
- id `film-strip.play.w-2-3` · grade 2 · Common Core W.2.3 (write narratives that recount a short sequence of events, include details, use temporal words to signal event order, and provide a sense of closure) · strand Writing · files `mini tools/film-strip-core.js`, `film-strip-activity.js`, `film-strip-activity.html`, `film-strip-activities.json`. Title: **"The Splicing Bench — Retell with First, Next, Then"**.
- worksheet it covers: **G2-378** Retell the Story with Starters (four pictures; write what happens in each, starting with the printed word). The screen keeps the four pictures, the starter words and the per-picture sentence; the child COMPOSES each frame's sentence from a starter + a caption chosen from two.
- new instrument (no old activity). The premium *story-line* tool's card sets are NOT reused (several of its cards are drawn glyphs, and five point at pictures that are cache-only — not in the labelled `mini tools/pictures` index: spring/sun, clothing/pajamas, winter/boots, spring/watering_can, vegetables/turnip); every frame here is a verified library picture.

## 1. The pitch
"A time word is the tape that joins two frames of film: *First* has nothing before it, *Next* and *Then* grip the frame before them, *At the end* closes the reel — so put a time word in the wrong place and the film comes apart right there."

## 2. Why a child will want it again (the fun)
- **A real film bench.** A strip of film with sprocket holes runs across a drawn editing bench; above it a little projector with a reel on each side. Frames are slides the child drags off a loose pile (the reel came apart!) into the empty frames of the strip.
- **Tape you can feel.** Each time word is a piece of splicing tape with ONLY its word printed on it — in the tray all four tapes are the same plain cream strip, so the WORD is the only thing that tells them apart (the child must read it). Pressing a tape onto a frame's left edge makes a satisfying *zzzip*. The tape's hidden joint shape shows itself only when the film runs: *First* turns out to be a flat-ended leader, *Next/Then* grow a grip-tooth on their left end that bites the frame before with a little *tk*, *At the end* grows a round end-cap like a reel's last turn.
- **The film runs.** Press the crank and the projector pulls the strip through: if every joint holds, each frame grows big on the screen with its sentence underneath, sprockets rattling, the frames sliding left; at the end the tail cap spins the reel shut and a drawn "film ends" iris closes (a circle shrinking, no words). If a joint is broken, the strip stops exactly there and the two ends flap apart.
- **End-of-round show:** the finished retell plays once more as a little film, and the sentences collect under the screen as one paragraph — the child's retelling, written.
- **Free play:** between rounds the crank can be turned backwards to rewind (the frames play in reverse — the snowman un-melts — a joke, not a check), and frames can be pulled off and re-spliced.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** retell a short four-event story (three in the shorter setting) in order, starting each sentence with a fitting time-order word — one opener (*First*), middle words (*Next*, *Then*), one closer (*At the end*) — and choosing the detail sentence that says what happens in each picture.
- **Misconception 1 — "Then" (or "Next") for the first event.** Pushback by mechanism: a middle tape has a tooth on its left end that must bite into the frame before it; on frame 1 there is no frame before it, so when the film runs the tooth bites air, the tape curls up and the frame hangs loose from the leader — the crank stops there. (The shape appears only when the film runs, never in the tray, so the choice is made by reading the word, not by matching a shape.)
- **Misconception 2 — "First" twice / "First" in the middle.** A *First* leader has a flat left end with no tooth: placed on frame 3 it cannot grip frame 2, and the strip parts between 2 and 3 (a gap of light shows through).
- **Misconception 3 — "At the end" too early.** The tail tape's round end-cap closes the reel: placed on frame 2, frame 3 cannot be joined after it (the cap blocks the sprocket path; frame 3's left edge shows a red-free grey "no join" notch).
- **Misconception 4 — ordering by where the pictures lie in the pile.** The pile is shuffled and never in story order; picture order is checked by the projector (a frame that happens before the one on its left makes a *jump cut*: at Check the joint between them flickers and the strip stops there).
- *Next* and *Then* are interchangeable middles — both are accepted in either middle frame (there is no "two right answers" problem: both orders of the middles are right by design).

## 4. The stage
`layout:'split'` at ≥ 700 px.

**At 704 px**
- **Projector screen** (top of the stage, 300 × 190, a drawn white screen with a soft frame): shows the frame being played, large (library picture 150 × 150) with its sentence underneath (Nunito 20 px).
- **The film strip** (470 × 190, centre): a dark film band with sprocket holes top and bottom; 4 frame windows (106 × 150, gaps 12 px) — each window holds a library picture 96 × 96 at its centre top and a caption bar (106 × 40) under it. On each window's LEFT edge is a joint socket (the place a tape goes). Leader end (left of frame 1) and tail end (right of frame 4) drawn as film tails.
- **Pile** (below the strip): the 4 loose frames, slightly overlapping and rotated ±6°, each 106 × 120 with its picture 96 × 96.
- **Tapes**: 4 tapes (130 × 40, Baloo 2 18 px): *First*, *Next*, *Then*, *At the end* — identical cream strips with a teal border and the word; their joint shapes (flat leader / left grip-tooth / tooth + round end-cap) are drawn only while the film runs and in the miss-2 help, so the tray never shows which tape goes where.
- **Caption pair** for the frame selected (bubble column, 200 wide): two caption cards (190 × 60, Nunito 17 px), one true for that picture, one true for ANOTHER frame of the same story.
- **Crank** (Check): a drawn crank handle on the projector, 56 × 56, with an aria-labelled button "Run the film".
- **Task line (≤ 24 px):** "Put the pictures in order, give each one a time word and a sentence, then run the film."

**At 360 px** (stacked): screen 340 × 150; strip as two rows of two frames joined by a drawn film loop at the right ("the film bends round a roller") — windows 150 × 160, pictures 96 × 96 (they fit at full size); pile 4 frames in a row at 76 × 96 with pictures 64 × 64; tapes 2 × 2 grid of 160 × 44; caption pair stacked 340 × 52 under the strip. Crank bottom at 360 × 740: header 56 + task 52 + screen 150 + strip 2 × 168 + pile 104 → the pile and the caption pair scroll? No — the screen collapses to a 340 × 60 "film counter" bar until the crank is turned (the big screen then opens over the pile), giving: 56 + 52 + 60 + 336 + 104 + 52 (crank) = 660 ≤ 740; at 320 × 640 windows 136 × 150, pile pictures 64 → 628.
- Library pictures only in frames; bench, film, projector, tapes, crank are drawn geometry; the only words on the apparatus are the time words and captions (content).

## 5. The hand
- **Drag a frame** from the pile into a window (it snaps, a soft film *clack*); drag it out or onto another window (they swap). Keyboard: Tab to the pile, Enter, arrows choose a window, Enter.
- **Tap a placed frame** → its caption pair appears in the bubble column; tap a caption → it slides into the frame's caption bar. Captions can be changed until Check.
- **Drag a tape** onto a frame's joint socket: *zzzip*; the tape simply seats (no hint of right or wrong before the crank — an instant curl would let a child find the place by trial and never read the word); when the film runs, a middle tape on frame 1 curls (its tooth has nothing to bite), a *First* on frames 2–4 leaves a light gap at that joint, an *At the end* before frame 4 shows the end-cap blocking the next joint. Two tapes cannot share a socket; a tape can be pulled off.
- **Turn the crank** = Check (§7). Turning it backwards in free play rewinds.
- *Starters: shown in order* setting — the tapes are already pressed onto frames 1–4 in order; the child places pictures and captions only.

## 6. The rounds
One **round = one story**. 8 stories; each has 4 frames (the 3-frame setting drops the frame named in the last column). The pile order is dealt so it is NEVER the story order and never the reverse order; per pass the true picture's caption card sits on the left in exactly half the frames (16 of 32; 12 of 24 in 3-frame) — dealt, not random. Order-only reshuffle of the stories per pass.

| # | story | frame 1 | frame 2 | frame 3 | frame 4 | 3-frame drops |
|---|---|---|---|---|---|---|
| 1 | Snow day | winter/snowflake — "snow fell all night" | winter/snowman — "we built a snowman" | beach/sun — "the sun came out" | spring/puddle — "the snowman melted into a puddle" | 3 |
| 2 | Muffins | at-the-supermarket/cart (an empty trolley) — "we went shopping for eggs and flour" | kitchen-tools/bowl — "we mixed everything in a bowl" | kitchen-tools/oven — "the muffins baked in the oven" | bakery/muffin — "we ate a warm muffin" | 1 |
| 3 | Camping | camping/backpack — "we packed our bags" | camping/tent — "we put up the tent" | camping/moon — "we slept under the moon" | beach/sun — "the sun woke us up" | 1 |
| 4 | A letter | activities/writing — "I wrote a letter to Gran" | post-office/envelope — "I put it in an envelope" | post-office/mailbox — "I dropped it in the mailbox" | post-office/letter — "Gran opened it and read it" | 2 |
| 5 | The tulip | spring/shovel — "we planted a bulb in the soil" | spring/bud — "a little bud came up" | spring/tulip — "the tulip opened" | spring/bee — "a bee came to visit it" | 4 |
| 6 | The storm | weather/cloudy — "grey clouds filled the sky" | weather/rainy — "rain poured down" | weather/puddle — "big puddles filled the street" | weather/rainbow — "the sun came back and made a rainbow" | 3 |
| 7 | Fishing | camping/canoe — "we paddled out on the lake" | camping/fish — "we caught a fish" | camping/campfire — "we cooked it on the fire" | kitchen-tools/plate — "our plates were empty" | 1 |
| 8 | Apple pie | tree/apple — "we picked apples from the tree" | kitchen-tools/knife — "we cut the apples into pieces" | kitchen-tools/oven — "we baked a pie in the oven" | bakery/pie — "we each ate a slice" | 2 |

**Why each order is visible** (the reviewer refuses any story whose order a 7-year-old cannot SEE): every adjacent pair is cause → effect or a fixed routine (snow → snowman → sun → melt; buy → mix → bake → eat; pack → tent → night → morning; write → envelope → post → open; plant → bud → flower → bee on the open flower; clouds → rain → puddles → rainbow after rain; paddle → catch → cook → empty plates; pick → cut → bake → slice). Refused candidates: rain → raincoat → puddle → rainbow (puddle-jumping can follow the rainbow), bath → teeth → bed (bath/teeth order varies by home), caterpillar → butterfly (no chrysalis picture), any story needing a made state that is not a separate library picture.
**Caption decoys:** each frame's second caption is the caption of a different frame of the same story — a NON-adjacent one wherever one exists (4 frames: always; 3 frames: the middle frame takes the last frame's caption), so the decoy is clearly about another moment, e.g. frame "snowman" offers "we built a snowman" / "snow fell all night". A child who has the pictures in order and reads the captions always has exactly one fit.
**Pictures** (labelled ×11; seen on winter, beach, spring, kitchen-tools, supermarket, bakery, camping, post-office, activities, weather, tree sheets): winter/snowflake, winter/snowman, beach/sun (weather/sun has no label), spring/puddle, weather/puddle, at-the-supermarket/cart, kitchen-tools/bowl, kitchen-tools/oven, bakery/muffin, camping/backpack, camping/tent, camping/moon, activities/writing (a boy writing at a desk), post-office/envelope (closed), post-office/mailbox, post-office/letter (an opened envelope with the letter out — the "after" picture), spring/shovel, spring/bud (red tulip bud), spring/tulip (red), spring/bee, weather/cloudy, weather/rainy, weather/rainbow, camping/canoe, camping/fish, camping/campfire, kitchen-tools/plate (empty), tree/apple (an apple TREE — its label says "apple", so no label is shown), kitchen-tools/knife (a kitchen knife), bakery/pie (a slice). Refused: at-the-supermarket/basket (drawn FULL of groceries — not a basket of apples). Labels are never shown on frames (pictures are named by the captions).

## 7. Check (the crank), the misses, the success
- **Crank with frames, captions or tapes missing** → no miss; the projector rattles and stops at the first empty window, which pulses. Hint: "Every frame needs a picture, a time word and a sentence."
- **Miss 1:** the film runs up to the FIRST fault and stops there, showing it: a broken joint flaps open (wrong time word) with its tape lifting; a jump cut flickers twice between two frames in the wrong order; a caption that belongs to another frame slides out of its bar onto the frame it describes, then back to the pair. Only the first fault is shown. Hints: joint — "This time word can't join here. Which word can come {first / after something / at the end}?" (the word chosen from the joint's kind); jump cut — "The film jumps here: what happened before this?"; caption — "That sentence tells about a different picture."
- **Miss 2 (the same fault again):** joint — the tape kinds glow in the tape tray where they can go (the flat *First* outline appears on frame 1's socket, the end-cap outline on frame 4's); jump cut — the frame that belongs earlier gets a faint arrow pointing left along the strip; caption — the right caption's card pulses.
- A new move clears the help until the next crank.
- **Success:** the film plays through (§2) and the retell paragraph assembles under the screen: "First, snow fell all night. Next, we built a snowman. Then the sun came out. At the end, the snowman melted into a puddle." Bubble: "Your film tells the story in order!"

## 8. Settings (each visibly changes the board at rest)
1. **Frames:** *3* (three windows, tapes First · Then · At the end) / *4* (four windows, First · Next · Then · At the end). Default: 4.
2. **Time words:** *Shown in order* (tapes already on frames 1–4) / *You choose* (tapes in the tray). Default: you choose.

## 9. Words (EN source)
- Title "The Splicing Bench" · instruction "Put the story's pictures in order, join them with time words, choose a sentence for each, and run your film."
- Tapes: **First · Next · Then · At the end** (3-frame: First · Then · At the end).
- Task line (§4). Hints: `notFull` "Every frame needs a picture, a time word and a sentence." · `joint1` "This time word can't join here. Which word can come {kind}?" (kind ∈ "first", "after something", "at the end") · `cut1` "The film jumps here: what happened before this?" · `cap1` "That sentence tells about a different picture." · `joint2`/`cut2`/`cap2` "Look at the glowing place."
- Success: the paragraph + "Your film tells the story in order!"
- Captions per story (§6), authored per locale.
- Settings "Frames" — "3" / "4"; "Time words" — "Shown in order" / "You choose".
- **Locale traps.** (1) **Time words per locale (native panel):** de *Zuerst · Dann · Danach · Zum Schluss*; fr *D'abord · Ensuite · Puis · À la fin*; es *Primero · Después · Luego · Al final*; pt *Primeiro · Depois · Em seguida · No final*; it *Prima · Poi · Dopo · Alla fine*; nl *Eerst · Daarna · Toen · Aan het eind*; sv *Först · Sedan · Därefter · Till sist*; da *Først · Så · Derefter · Til sidst*; no *Først · Så · Deretter · Til slutt*; fi *Ensin · Sitten · Sen jälkeen · Lopuksi*. (2) **V2 word order:** in de, nl, sv, da, no a sentence that starts with a time word puts the verb second ("Zuerst fiel die ganze Nacht Schnee", "Eerst viel er de hele nacht sneeuw") — so captions are authored in the AFTER-THE-TIME-WORD order (verb first), never as stand-alone sentences, and the assembled paragraph reads correctly; fi/fr/es/pt/it/en need no inversion (en adds the comma "First, …", fr "D'abord, …"). (3) The paragraph joins starter + caption with the locale's comma rule (en/fr/es/it/pt comma after the starter; de/nl/sv/da/no/fi no comma). (4) Past tense throughout (a retell); es/pt/it/fr choose preterite/passé composé per the author. (5) "Gran" becomes a local grandma word (Oma, Mamie, abuela, vovó, nonna, oma, mormor/farmor — the author picks one, mummo in fi).

## 10. Sound off, access, phones
- Every fault is shown on the film (curl, gap, end-cap block, flicker, sliding caption); sounds are film sounds; TTS (optional) reads the paragraph.
- Keyboard §5; aria for tapes includes their joint kind ("Then — joins after a frame"); frames "picture {n} of 4: {caption or 'no sentence yet'}".
- Taps: frames ≥ 76 × 96; tapes 44 tall; caption cards 52–60 tall; crank 56.
- Pictures: 96 px in the strip at 704 and 360, 64 px in the pile on phones.
- Phone §4.

## 11. Distinct from
- **Row 65 Dot's Story Spine — The Book That Cracks and Mends (RL.K.3)** also lists G2-378: there the pages carry story ROLES (start / trouble / fix) and the fix page's bandage mends the crack. Here nothing is about roles: the pieces are the time WORDS and their joint grammar (opener / middle / closer), and the product is a written four-sentence retell.
- **Row 64 Wake Up, Pip! — The Flipbook (RL.K.2):** pages in story order make the flipbook play; wrong order plays backwards. Here the check is the JOINTS: the time words are physical splices whose shapes say what they can follow, and a wrong word breaks the film at that joint — the time-word grammar is the invention; picture order is only one of three things the film tests.
- **Premium tool story-line:** pegging story beats on a clothesline with narrated sequence words (the tool says the words; the child does not choose them). **Row 82 The Story Film (1.OA.A.1)**: an x-ray film of a number story — a different skill.
- **New #278 The Sentence Railway:** capital = engine, full stop = caboose (sentence boundaries). Here the pieces are time words across sentences, and the middle pieces' tooth (must follow something) is the distinct idea.

## 12. Build plan
- **Model (core):** `state = {story, frames:[picId|null ×N], captions:[capIdx|null ×N], tapes:[kind|null ×N]}` with kinds `open` (First), `mid` (Next/Then), `close` (At the end); `jointOk(i) = (i===0 ? tapes[0]==='open' : tapes[i]==='mid' || (tapes[i]==='close' && i===N-1))`; `firstFault() → {type:'empty'|'joint'|'cut'|'caption', at}` scanning left to right (joint before cut before caption at the same frame); `run()`; `dealPile()` (never in order, never reversed); `dealCaptionSides(pass)`.
- **Gate (`verify-film-strip-core.js`):** an independent truth table: for N = 3 and 4, enumerate all 4^N tape assignments → exactly the assignments open, mid…mid, close pass (both middle orders in N = 4); enumerate all frame orders → only the story order passes; captions: exactly one card per frame fits; pile never in or reverse of story order; caption true-card side exactly half per pass; the decoy caption is non-adjacent wherever one exists; the 3-frame drop keeps a visible order (reviewer list); first fault found left-to-right; crank with an empty window is not a miss; V2 locales' captions are flagged "post-starter order" in data and the paragraph join adds no comma there.
- **Mutations:** accept Then on frame 1 · accept First twice · accept At the end on frame 3 of 4 · reject Then-Next middle order · accept a reversed picture order · accept a caption from another frame · show all faults at once (only the first) · pile dealt in story order · caption true card always left · comma added in a V2 locale · tray tapes show their joint shape at rest (the word stops mattering) · the joint state shown before the crank.
- **Pictures to verify:** the 29 listed (story 8's basket replaced by kitchen-tools/knife — the basket is drawn full of groceries) in §6 (labels ×11 checked; art seen). Note: two stories share kitchen-tools/oven and two share beach/sun — never in consecutive rounds (deal rule).
- **Risks:** story supply is fixed at 8 per locale; locales may swap a story whose captions cannot be made natural (the reviewer may replace "muffins" by a local bake with the same pictures). Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Splicing tape that zips, a crank, a projector, a film that plays your story — and rewinding the melted snowman back into a snowman is a laugh worth coming back for.
2. **Would a teacher put it on the board?** Yes — the meaning of time words (opener, middle, closer) is built into the shapes of the tapes, so "Then" first and "First" twice break the film exactly where the mistake is; order is checked by visible causality; the paragraph at the end is a real retell.
3. **Would a parent trust it?** Calm, library pictures, no score, correct word order in every language.
4. **The invention in one sentence:** time words are the splicing tape between film frames — *First* has nothing to grip, *Next* and *Then* must grip the frame before, *At the end* caps the reel — so a misplaced word breaks the film right where it is.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 4→5
What changed:
- The invention was beatable without reading: the tapes wore their joint shapes in the tray (flat / tooth / end-cap) and the joints showed their state the instant a tape was pressed, so a child could match shapes or try each socket until nothing curled — the time WORD never mattered. Now all four tapes are identical plain strips with only the word; the joint shape appears only when the film runs (and as the miss-2 help). The misconception ("Then" first, "First" twice) is now caught where it lives: in the word.
- Story 8 used at-the-supermarket/basket for "we put the apples in a basket" — the contact sheet shows it full of groceries; replaced by kitchen-tools/knife ("we cut the apples into pieces": pick → cut → bake → slice). Story 2's cart is an EMPTY trolley, so its caption became "we went shopping for eggs and flour". Checked the rest on the weather, camping, kitchen-tools and supermarket sheets (weather/cloudy is a plain grey cloud with no face, camping/moon a full moon, kitchen-tools/plate empty, bowl empty).
- §11 now names Row 65 (which also lists G2-378, but by story roles) and says why the joint grammar of time words is a different act. Time words ×11 and the V2 caption order checked (de Zuerst/Dann/Danach/Zum Schluss, nl Eerst/Daarna/Toen/Aan het eind, sv Först/Sedan/Därefter/Till sist, da Først/Så/Derefter/Til sidst, no Først/Så/Deretter/Til slutt, fi Ensin/Sitten/Sen jälkeen/Lopuksi).
