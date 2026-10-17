# Row 113 — Domino's Two-Part Words → THE FREEZING FLOES (RF.1.3.e)

## 0. Identity
- **id** `domino-two-part.two-syllable.rf-1-3-e` (KEPT; slugs, titles and intros frozen en/de/es/pt/it/nl) · grade 1 · Common Core **RF.1.3.e** (decode two-syllable words following basic patterns by breaking the words into syllables) · strand Reading: Foundational Skills.
- **files (key `freezing-floes`)** `mini tools/freezing-floes-core.js`, `freezing-floes-activity.js`, `freezing-floes-activity.html`, `freezing-floes-activities.json` (the row moves out of `domino-two-part-activities.json`, which is emptied to `[]`; `domino-two-part-activity.js` keeps no users). New metadata (slug, title, intro) for fr, sv, da, no, fi.
- **worksheets it covers:** G1-305 Syllable Division · G1-313 Syllables and Sounds · G1-324 Syllable Cards · G1-325 Write the Word in Syllables · G1-326 Missing Syllable · G1-327 Syllable Scramble · G1-328 Two or Three Syllables · G1-306 / G1-330 / G1-332 Word Families (read and write, circle, carpet) · G1-331 Join the Syllables and Write the Word · G1-333 Word Families with Blends · G1-334 Read the Syllables, Find the Picture.
- **what the old activity did:** a word split into two syllables (rab·bit), "blend, then tap the picture" among three; hand-drawn penguin; en + de/es/pt/it/nl. **Kept:** the read-then-find round (now Clue "Read and find"), the de/es/pt/it/nl word lists, and Domino the penguin — now the library `animals/penguin`. **Changed because it was wrong:** the EN splits *ti·ger*, *ro·bot*, *rock·et*, *lem·on* were never gated: the gate's approved list has *tig·er*, *rob·ot*, *roc·ket* with only two sources and no TeX agreement — those words leave the split clues (they may stay as un-split distractor PICTURES); `accessories/ribbon` is drawn as a BOW (picture ruling 2026-10-17) — gone; the de round "Hase" names `animals/rabbit`, whose de label is *Kaninchen* — re-authored; reading one split word and tapping a picture was the whole activity — now the child BUILDS words from loose syllables.

## 1. The pitch
"Every syllable is a little ice floe drifting on the pond: push two floes together and wait for the cold snap — they only freeze into one piece if they really make the picture's word, in the right order."

## 2. Why a child will want it again (the fun)
- **Floes that bob.** The pond is blue water with cream ice floes drifting slowly, each carrying one syllable in big letters. Grab one and it rocks under your finger with a little splash; nudge it against another and they bump and rest side by side, a thin line of dark water still between them.
- **The cold snap.** Press Check: a frost glitters across the whole pond from left to right. Where two floes really make a word, the water line between them freezes white with a crackle — they are ONE piece now — and the picture slides down and freezes INTO the ice under the word, like a fish under a frozen lake. Where they do not, the frost reaches the seam and it CRACKS: the floes jolt apart and drift away a little.
- **Domino crosses.** When every word on the shelf is frozen, Domino the penguin (library `animals/penguin`, 96 px) waddles across the frozen words from one end of the shelf to the other, hops at each picture, and slides on its belly down the last one. Every round ends with that walk.
- **The two shelves.** Finished words line up on two ice shelves marked with two little floe-squares and three little floe-squares (geometry) — two-part words and three-part words; after a pass the child has sorted every word by its syllables without being asked to.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.1.3.e + worksheets):** read a long word in parts — each part (syllable) has one vowel sound — blend the parts in order into the word, and connect it to its meaning; join two (or three) syllables into a word; find a missing syllable; unscramble syllables; say whether a word has two or three syllables; read a syllable-split word and find its picture.
- **Misconception 1 — reading only the first part and guessing** (*pen…* → pencil? penguin? pepper?). A round's three words share their first parts (pen·cil, pen·guin, pep·per; ham·mer, ham·ster, lad·der; car·rot, par·rot): the first floe does not decide — the child must read the second.
- **Misconception 2 — order does not matter** (*bit·rab*). Reversed floes never freeze (the seam cracks), so order is physical.
- **Misconception 3 — any two parts make a word** (*mon·dow*, *win·key*). Nonsense joins crack, and in Read-and-find the frozen word's picture is the meaning check.
- **Misconception 4 — counting letters for syllables** (*strawberry* is long but has three parts; *pizza* is short with two). The shelves sort by floes, not by length.
- **How the material pushes back:** the frost: a seam freezes or cracks. The picture freezing into the ice is the meaning arriving.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 504 × 480):
- **The ice shelf** (top, 504 × 170): three picture places in a row, each a library picture **112 × 112** standing on the shelf edge, and in front of each an **inlet** — a slot cut into the shelf, **3 floes long** for EVERY picture (so the inlet never tells how many syllables). In single-picture clues: one picture **150 × 150** and one inlet.
- **The pond** (y 190–390): water `#BFE3EE` with soft ripple lines; the floes: cream rounded slabs **96 × 64** (syllable in Baloo 2, 30 px, ink), each with a 3 px darker underside edge so it reads as floating. 6–9 floes drift in slow Lissajous paths (amplitude 6 px, period 6–9 s), never overlapping, never leaving the pond.
- **Domino:** the library `animals/penguin` at **96 px** stands at the shelf's left end.
- **The two shelves** (a thin strip under the pond, 504 × 40): "two-floe" and "three-floe" shelves marked only with 2 or 3 tiny squares (geometry); finished words sit there as small frozen word tags.
- **Task line** above (Nunito 22 px, ≤ 2 lines). Bubble right, Check under it.

**At 360 px** (stacked): shelf 360 × 150 with three pictures **96 px** (gaps 12) and inlets 112 × 40 under each (floes in an inlet shrink to 36 × 36 seats; the floe's syllable stays ≥ 16 px); pond 360 × 200 with floes **78 × 52** (syllable 24 px); Domino **72 px**; bottom shelves 360 × 32; bubble under; Check bottom ≤ 690 at 360 × 740. **At 320 × 640:** pictures **88 px** (3 × 88 + 2 × 8 = 280), floes 72 × 48, Check bottom ≤ 620.

No words on the apparatus besides the syllables (the content) and frozen word tags.

## 5. The hand
- **Grab and steer:** drag a floe; it follows the finger with a little water lag (60 ms) and leaves a short wake. Release in open water: it keeps drifting.
- **Dock:** release a floe touching another floe's left or right edge: they bump, align and rest side by side (160 ms, a wooden *tok*), a dark water line between them. A docked group moves as one when either floe is dragged. Drag a floe firmly away from a group to undock it.
- **Into an inlet:** drag a floe or a docked group into a picture's inlet: it slides in and seats from the left (200 ms). An inlet holds up to 3 floes. A floe can be dragged back out.
- **Cold snap = Check** (§7): frost sweeps left to right across the shelf (600 ms); each seam freezes (white, *crk*) or cracks (*crack*, the floes jolt 12 px apart).
- **Free play:** between rounds Domino can be dragged across the pond, hopping floe to floe (a floe dips under it); floes can be docked into silly words that will never freeze.
- **Undo:** everything until Check; after a miss the frozen seams stay frozen, only cracked floes drift free.

## 6. The rounds
Pass = 9 rounds. Two EN sets (A, B, alternating; order reshuffled every pass, never the same order twice). **Every EN split comes from `approved-words-en.json` with all three sources agreeing (TeX + rule + vocab).** Where a word's picture is also needed elsewhere (distractor) it may be any library word; where its SPLIT is shown, it must be gated.

**Clue "Join the floes" (default — G1-331, G1-334, G1-328, RF.1.3.e).** Three pictures, their words' floes (6–9) drift in the pond. Rounds deliberately share first or second parts.

| set | word 1 (picture) | word 2 | word 3 |
|---|---|---|---|
| A1 | rab·bit (animals/rabbit) | bas·ket (at-the-supermarket/basket) | muf·fin (at-the-supermarket/muffin) |
| A2 | pen·cil (around-the-house/pencil) | pen·guin (animals/penguin — Domino steps aside for this round) | pep·per (at-the-supermarket/pepper) |
| A3 | mon·key (zoo-animals/monkey) | don·key (animals/donkey) | win·dow (around-the-house/window) |
| A4 | ham·mer (tools/hammer) | ham·ster (pets/hamster) | lad·der (tools/ladder) |
| A5 | car·rot (at-the-supermarket/carrot) | par·rot (birds/parrot) | pil·low (around-the-house/pillow) |
| A6 | pop·corn (at-the-supermarket/popcorn) | cup·cake (bakery/cupcake) | pan·cake (breakfast/pancake) |
| A7 | snow·man (winter/snowman) | rain·bow (spring/rainbow) | rain·coat (clothing/raincoat) |
| A8 | dol·phin (ocean-life/dolphin) | wal·rus (winter/walrus) | but·ter·fly (insects-and-bugs/butterfly) |
| A9 | mit·ten (accessories/mitten) | trum·pet (music/trumpet) | um·brel·la (accessories/umbrella) |
| B1 | pan·da (animals/panda) | piz·za (at-the-supermarket/pizza) | can·dy (at-the-supermarket/candy) |
| B2 | mel·on (at-the-supermarket/melon) | cook·ie (at-the-supermarket/cookie) | ot·ter (zoo-animals/otter) |
| B3 | trac·tor (vehicles/tractor) | pret·zel (bakery/pretzel) | rac·coon (forest-creatures/raccoon) |
| B4 | squir·rel (forest-creatures/squirrel) | sail·boat (beach/sailboat) | mail·box (post-office/mailbox) |
| B5 | let·tuce (at-the-supermarket/lettuce) | ham·mock (camping/hammock) | com·put·er (classroom/computer) |
| B6 | scoot·er (toys/scooter) | shov·el (around-the-house/shovel) | straw·ber·ry (at-the-supermarket/strawberry) |
| B7 | os·trich (birds/ostrich) | ban·dage (hospital/bandage) | drag·on·fly (forest-creatures/dragonfly) |
| B8 | doc·tor (occupations/doctor) | bak·er (occupations/baker) | gin·ger·bread (christmas/gingerbread) |
| B9 | car·pen·ter (occupations/carpenter) | gar·den·er (occupations/gardener) | screw·driv·er (tools/screwdriver) |

Set A: 25 two-part + 2 three-part words; set B: 21 two-part + 6 three-part, ending on an all-three-part round. Floes with the same text (*pen* in pencil and penguin, *key*, *ham*, *rot*, *cake*, *rain*) are interchangeable — either copy freezes. Every other cross-join was checked for accidental real words (*rainman*, *snowcoat*, *pancorn*, *mailboat* are not pictures and do not freeze). Refused: *tiger*, *robot*, *rocket*, *lemon*, *camel*, *bucket*, *jacket*, *spider*, *zebra*, *igloo*, *pumpkin*, *giraffe* (2-source splits); *ribbon* (bow picture); *puffin* (reads as a penguin beside Domino); *falcon* (unrecognisable); *beetle* (reads as a ladybug).

**Clue "Missing piece" (G1-326, G1-325).** One picture; one floe already frozen into its inlet; the gap before or after it; three floes drift (the right one + two that make nonsense in that place, chosen from the same set's floes). 9 rounds (right floe first, then the two that crack): ∅·bit (rabbit: rab / bas / muf) · pen·∅ (pencil: cil / guin / per — *guin* makes a real word, penguin, but not the word of THIS picture, so it cracks) · ∅·key (monkey: mon/don/win — *don* cracks here, because the shelf holds the monkey, not the donkey) · ham·∅ (hammer: mer/ster/der) · ∅·rot (carrot: car/par/pil) · rain·∅ (rainbow: bow/coat/man) · ∅·phin (dolphin: dol/wal/mit) · um·∅·la (umbrella: brel/ter/pet) · but·ter·∅ (butterfly: fly/la/er). Gap first 4 / middle 1 / last 4.

**Clue "Mixed-up word" (G1-327).** One picture; its three floes arrive docked in the inlet in a wrong order; slide them into order (drag a floe left/right inside the inlet: they swap). 9 rounds: butterfly, umbrella, computer, strawberry, dragonfly, gingerbread, screwdriver, carpenter, gardener. The starting order is never the right one and never the full reverse twice in a row.

**Clue "Read and find" (G1-324, G1-334 — the old activity, kept and fixed).** A frozen two-floe word slides onto the pond; three pictures stand on the shelf; push the frozen word into the inlet of the picture it names.

| # | frozen word | pictures |
|---|---|---|
| 1 | rab·bit | rabbit · radish (vegetables/radish) · robot (toys/robot) |
| 2 | bas·ket | bucket (beach/bucket) · basket · muffin |
| 3 | pen·cil | pizza · panda · pencil |
| 4 | trac·tor | tractor · turtle (animals/turtle) · trumpet |
| 5 | car·rot | camel (animals/camel) · carrot · rabbit |
| 6 | mon·key | donkey · muffin · monkey |
| 7 | pen·guin | penguin · pencil · pepper |
| 8 | mel·on | melon · lemon (at-the-supermarket/lemon) · mitten |
| 9 | but·ter·fly | butterfly · ladybug (insects-and-bugs/ladybug) · dragonfly |

**Word families with blends (G1-306/330/332/333):** in set A's rounds A4 (ham·mer / ham·ster) and A6/A7 (cup·cake / pan·cake, rain·bow / rain·coat) the shared part IS a family — the shelf groups their tags side by side.

**Answer position.** Join: the three pictures' order and the floes' starting positions are reshuffled each pass; no floe starts docked to its partner; the two parts of a word never start within one floe-width of each other in reading order (gate). Missing piece: the right floe's starting position cycles through the pond's three drift lanes 3/3/3. Read and find: right picture slot 3/3/3 per pass (fixed Latin square; the table order is not the display order).

**Order:** order-only reshuffle per pass.

**Other locales** (every split from that locale's `approved-words-<loc>.json`; the build authors each list; one native + pedagogy reviewer checks every word and every picture label). The existing de/es/pt/it/nl Read-and-find rounds are kept after re-checking each split against the gate (de *Hase* → re-authored, the picture's label is *Kaninchen*, Ka·nin·chen).
- **de** (Silben): Ap·fel, Bie·ne, Glo·cke, Kat·ze, Kro·ne, Trom·mel, Pup·pe, Tas·se, Ker·ze, Wür·fel, Ad·ler, Bä·cker, Ei·mer; three-part Ba·na·ne, Schmet·ter·ling, Ka·rot·te, Fle·der·maus. German nouns are capitalised: the first floe carries the capital.
- **nl** (klankgroepen): ap·pel, bak·ker, vo·gel, bal·lon, dol·fijn, kus·sen, trom·mel, ka·meel, vlin·der, ke·ver, em·mer; three-part bas·ket·bal, com·pu·ter, kom·kom·mer (*kalender* has no picture — critic).
- **es / it / pt** (open CV syllables, the easiest decoding in the program): es ga·to, pa·to, ca·sa, me·sa, va·ca, ra·na, pe·ra, lu·na, bo·ca; it gat·to, ca·ne, lu·na, me·la, na·so, pe·ra, ra·na, pal·la; pt ga·to, ga·lo, bo·la, ca·sa, ca·ma, bo·ca, bo·lo. Three-part rounds: es pe·lo·ta, it ba·na·na, pt ba·na·na — each gated.
- **fr** (syllabes écrites): the pipeline counts the final mute e (*lu·ne*), the established convention across every fr activity; the open fr mute-e review (CLAUDE.md §20.9) applies here too and is not decided in this design.
- **sv:** ba·nan, ka·mel, del·fin, mo·rot, krab·ba, trum·ma, klock·a, dock·a, kyr·ka, fjä·ril; three-part go·ril·la, pa·pri·ka, ba·ga·re, lä·ka·re (*kaktus*, *kalender*, *kamera* have no picture — critic).
- **no:** ba·nan, ka·mel, del·fin, bøt·te, krab·be, trom·me, klok·ke, duk·ke, kir·ke, ham·mer, gi·tar; three-part som·mer·fugl, go·ril·la, ham·bur·ger (*kaktus* has no picture).
- **da:** only `policy_managed:false` words: ba·nan, ka·mel, del·fin, krab·be, trom·me, klok·ke, duk·ke, pan·da, ping·vin, me·lon, ci·tron, ka·nin; three-part go·ril·la, pe·li·kan, ko·li·bri (*kaktus* has no picture).
- **fi** (tavut): pal·lo, kis·sa, koi·ra, ka·la, kup·pi, kel·lo, rum·pu, au·to, juus·to, kak·ku; three-part ba·naa·ni, o·me·na, per·ho·nen, ka·me·li, ma·ja·va. Long vowels stay inside one floe (*ba·naa·ni*).
Each locale needs ≥ 9 Join rounds per set (gate refuses < 7) and shared-part groupings where its words allow.

## 7. Check, the misses, the success
- **Check with an empty inlet** (any picture's inlet holds nothing): hint, no miss — the empty inlet glints — "Push the pieces of each picture's word into its slot."
- **Miss 1:** the cold snap runs; good seams freeze white and stay; each bad seam cracks, its floes jolt apart and the wrong floe drifts out of the inlet into open water, leaving the right part (if any) frozen in place; the cracked picture stays unfrozen. · "Some words cracked. Read each piece out loud. Which pieces make the picture's name?"
- **Miss 2:** in each unfrozen inlet, a frost ring appears on the pond around the floe that BEGINS that picture's word (it bobs a little brighter); in Mixed-up, the first seat of the inlet frosts with the outline of the first floe's width. · "Start with the piece that begins {the picture's} name — then find what comes next."
- **Miss 3+:** every floe of that word wears the frost ring, one after another in order.
- **A new move takes the help away** until the next cold snap.
- **Success:** every seam freezes, each picture slides into the ice under its word, Domino waddles across all three words (hops at each picture, belly-slides off the end); the tags fly to the two-floe / three-floe shelves. · Join: "{rab}–{bit}, {bas}–{ket}, {muf}–{fin}: all frozen!" · Missing piece: "{rab} + {bit} = {rabbit}!" · Mixed-up: "{but}–{ter}–{fly}: {butterfly}, three parts in order!" · Read and find: "{pen}–{guin} is the {penguin}!"

## 8. Settings
1. **Clue:** Join the floes (default) · Missing piece · Mixed-up word · Read and find — visibly different at rest (three pictures and a pond of loose floes / one picture with one frozen floe / one picture with three docked floes / one frozen word and three pictures).
2. **Word length:** Two-part words (one pool of the 11 all-two-part rounds A1–A7 and B1–B4; 9 per pass, a different 9 and a different order each pass) · Two and three parts (default: the full sets) — visible at rest: 6 floes in the pond vs up to 9, and the three-floe shelf hidden or shown.

## 9. Words (EN source)
- title (shell, frozen): **Domino's Two-Part Words** · instruction: "Read each piece. Push the pieces together to make each picture's word, then wait for the frost."
- task lines: join — "Push the pieces together to make each picture's word." · missing — "Which piece is missing?" · mixed-up — "Slide the pieces into the right order." · read and find — "Read the frozen word. Push it to its picture."
- hints / celebrations: §7 exactly. First-time nudge (once per visit): "Drag a piece of ice onto another one."
- settings: "Clue", "Join the floes", "Missing piece", "Mixed-up word", "Read and find", "Word length", "Two-part words", "Two and three parts". aria: "Picture: {name}", "Ice piece: {syllable}", "{a} and {b} side by side", "Slot for {name}: {pieces|empty}", "Frozen: {word}", "Cracked between {a} and {b}".

**Locale traps:** every split from the locale's gate (never hand-split); de capitals on the first floe; fr written syllables with the mute-e convention recorded; fi long vowels never split; da `policy_managed:false` only; es/it/pt words chosen so a round's floes do NOT accidentally form a different real word with a picture on the shelf (gate checks every cross-join against the locale's picture labels); picture labels from `image-vocabulary.js` only (the de rabbit is *Kaninchen*). Sound off: floes, frost, cracks and the frozen picture carry every verdict; TTS reads a frozen word where reliable.

## 10. Sound off, access, phones
- **Silent legibility:** syllables are printed; freeze vs crack is visible; the picture freezing into the ice confirms meaning; Domino's walk is the celebration.
- **Keyboard:** Tab through floes (reading order of the pond), Enter picks up, arrow keys move it, Enter docks to the nearest floe edge or drops into the focused inlet (Tab moves to inlets); Delete pulls the last floe out of an inlet; Space = cold snap; Mixed-up: Left/Right swaps the focused floe.
- **aria-live:** "rab and bit frozen: rabbit." / "Cracked between mon and dow." / "All frozen!"
- **Taps:** floes ≥ 72 × 48, inlet seats ≥ 44 px; pictures 112 / 96 / 88 px (single-picture clues 150 / 112 / 104).
- **Phone layout:** stacked; pond shorter, floes smaller but syllables ≥ 16 px in inlets and ≥ 24 px floating; Check above the 360 × 740 and 320 × 640 folds (measured on every round, including three-part rounds).

## 11. Distinct from
- **Row 44 The Clay Snake** (chop clay per klankgroep, press back; only true neighbours stick): one word, chopping and re-pressing; here many syllables float FREE on water, the child finds which belong together, and a meaning check (the picture freezing in) closes it.
- **Row 51 The Syllable-Family Lock** (wheels of ga/ge/gi…): selecting syllables on wheels; no free joining.
- **New 215 The Bead Rail** (squash per beat, beads): counting beats; no reading of syllables.
- **Row 71 The Domino Track** (facts on toppling dominoes): the name "Domino" is the penguin's, not a domino mechanic — nothing topples here.
- **Premium `syllable-splitter`** (drum + arcs): segmenting heard words; no joining, no water, no frost.
- **Built registry:** no ice, no freezing, no floating pieces exist.

## 12. Build plan
- **Core state** `{locale, clue, length, set, round:{pics:[{pic, word, syl:[s]}], floes:[{id, s, owner}], given|null, scramble|null}, inlets:[[floeId]], groups:[[floeId]], frozen:[bool per seam], misses, help}`.
- **Functions:** `dock(a, b, side)`, `undock(id)`, `seat(groupOrFloe, inletIdx)`, `unseat(inletIdx)`, `swap(inletIdx, i, j)`, `coldSnap()` → per inlet `{ok, seams:[ok|crack], wrongFloes:[id]}` (a seam freezes only if the inlet's floes, in order, are a prefix-consistent split of THAT picture's word and the full inlet equals it on Check), `helpFor(result, misses)`.
- **Gate's own ground truth** (`verify-freezing-floes-core.js`): reads each locale's `approved-words-<loc>.json` itself and asserts every displayed split equals the gate entry (EN: `total_agreed ≥ 3`; da: `policy_managed:false`); asserts that any cross-join of a round's floes spelling a word whose picture is on that shelf uses floes identical in text to that word's own floes (identical floes — *pen*, *key*, *ham*, *rot*, *cake*, *rain* — are interchangeable and freeze either way); inlets are all 3 seats; Missing-piece gap positions 4/1/4; Mixed-up start ≠ answer; Read-and-find slots 3/3/3; every picture exists, is a colour theme, label = word (de rabbit = Kaninchen); `ribbon`, `puffin`, `beetle`, `falcon`, and the 2-source EN splits never shown split.
- **Mutations (one per rule):** freeze reversed floes · freeze a nonsense join · size inlets by syllable count · seat floes from the right · un-freeze correct seams on a miss · Read-and-find right picture always slot 2 · accept *tig·er* as a shown split · help kept after a new move · count a three-part word on the two-floe shelf · let floes start docked to their partner.
- **Pictures:** seen 2026-10-17 (`work-23/s113.png`, `s113b.png`): rabbit, ribbon (a BOW — refused), robot, bucket, basket, muffin, pizza, panda, pencil, tiger, table, turtle, carrot, camel, monkey, donkey, rocket, jacket, lemon, mitten, hammer, ladder, window, pillow, pumpkin, dolphin, walrus, igloo, spider, zebra, lion, banana, hamburger, elephant, tomato, potato, kangaroo, dinosaur, octopus, umbrella, computer, butterfly, ladybug, pineapple, strawberry, candle, bandage (a plaster), scooter, ostrich, puffin (reads as a penguin — refused), falcon (refused), hammock, lettuce, pepper (a red bell pepper), candy, cookie, otter, raccoon, parrot, squirrel, tractor, trumpet, screwdriver, gingerbread, carpenter, gardener, basketball, dragonfly, rainbow, raincoat, snowman, pancake, cupcake, popcorn, penguin ×2, radish. Still to view: occupations/doctor, occupations/baker, pets/hamster, bakery/pretzel, beach/sailboat (seen in s112), post-office/mailbox (seen), and every non-EN picture.
- **Risks:** drifting floes must never drift under a finger mid-drag or over the Check button (pond bounds); 9 floes at 320 px (pond packing measured); a docked group dragged near an inlet must seat whole.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — ice floes that bob, a frost that sweeps the pond, seams that freeze or crack, a picture that freezes into the ice and a penguin that waddles across and belly-slides off the end.
2. **Would a teacher put it on the board?** Yes — "read each part, push the parts together, the word only holds if it really is the word" is decoding by syllables; the shared first parts (pen·cil, pen·guin, pep·per) force the second part to be read; the shelves sort two- and three-part words.
3. **Would a parent trust it?** Yes — every split comes from the gated syllable lists, library pictures, the child's own language's syllable rules, calm, nothing sold.
4. **The invention:** syllables are ice floes that only freeze together when they really make the picture's word, in the right order.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Verified all 54 EN splits against `approved-words-en.json`: every one TeX + rule + vocab (`work-c23/c113.js`); all pictures exist.
- Missing-piece round 1 offered three SECOND syllables for a first-syllable gap — now rab / bas / muf; pen·∅ explains why *guin* (penguin) cracks.
- Locale lists checked against the gates and the picture index: *kaktus*, *kalender*, *kamera* have no picture — replaced by gated three-part words with pictures (sv go·ril·la, pa·pri·ka, ba·ga·re, lä·ka·re; no som·mer·fugl, go·ril·la, ham·bur·ger; da go·ril·la, pe·li·kan, ko·li·bri; nl com·pu·ter, kom·kom·mer).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
