# New 259 — The Same-Way Machine (READINESS analogies)

## 0. Identity
- id `same-way-machine.play.analogies` · grade 1 · READINESS analogies (framework from `frontend/lib/frameworks.ts`, readiness strand) · strand Logic & Visual Thinking · key `same-way-machine` (files `same-way-machine-core.js`, `same-way-machine-activity.js`, `same-way-machine-activity.html`, `same-way-machine-activities.json`).
- worksheets covered: **G1-157 Picture Puzzles** ("Look at the first pair. Circle what completes the second pair the same way.").
- new instrument (no old activity). From the coverage sketch it keeps the machine, the two chutes, the gear window and the output tray. It adds three things the sketch did not have: the **relation dial** (the window is a disc of four drawn emblems that STOPS on the relation and stays there, so the rule is visible for the whole round), the **try-every-candidate** showing at miss 2 (the dial names the relation each wrong picture really has with the new picture — so "the nest goes with the chick too, but a different way" is shown, not said), and **free play** (the child can feed any two pictures through and watch what the machine finds).

## 1. The pitch
"Watch the first pair go through the machine and see which way the dial stops — then feed the new picture in, choose what comes out, and pull the lever: the machine only rings if it worked the same way twice."

## 2. Why a child will want it again
- It is a machine with a lever. Pictures drop down chutes with a soft thunk, a gear disc spins and clicks onto a picture-sign, a track lights up, and a bell rings — every part moves.
- The dial stopping is a small drama: it spins, slows, ticks past the signs and lands — a child watches it like a wheel of fortune, except it is never luck.
- Pulling the lever is the commitment moment, and it is physical: drag the lever handle down (or tap it) and the machine runs.
- On success the two pairs light along the same coloured track, the disc does a happy double click, and both pairs slide forward and stand side by side under the sign, like two cards in a matching game that finally match.
- Free play: after a round, any picture on the shelf can be dropped into the lower chute with any other picture in the lower tray, and the dial shows what the machine thinks of the pair — or wobbles and shrugs (stops on the blank). Children try silly pairs on purpose ("chick and toothpaste!") and laugh when the dial shrugs.
- No score, no timer, no lives; the progress chip in the header only counts rounds.

## 3. The skill and the misconception
- Skill (G1-157): picture analogies A : B :: C : ? — find the relation that links A to B, then find the picture that is linked to C **in the same way**. Four relations a Grade 1 child already knows from life: **grows up** (young → adult), **part of** (whole → part), **goes inside** (thing → what it goes into), **goes with** (two things you use together).
- Misconception 1 (the one the worksheet exists for): **picking by theme association** — "the lamb lives on the farm, so the haystack" — instead of by the same relation.
- Misconception 2: **copying the example** — picking the first pair's own answer (the hen) because it is "the answer to this kind of puzzle".
- Misconception 3: **any picture of the right kind** — any grown-up animal will do (lamb → horse).
- Push-back by the material, not a message:
  - The dial is the relation, made into a thing. It stops on one sign for the first pair and stays there all round, so the child always knows what "the same way" means here.
  - A wrong output makes the machine grind: the lower track does not light in the same colour, and at miss 2 the machine tries every candidate in turn and the dial shows **that pair's own relation** — the haystack lands on no sign (it shrugs), the goat shrugs, the right picture lands on the same sign as the first pair and clicks. Theme association is visibly "a different way".

## 4. The stage
At 704 (stacked layout, stage ≈ 660 × 500):
- **The machine** (drawn apparatus, top, 620 × 300): a cream body (#FBF3E4, 3 px ink #0F4A40, radius 18) with:
  - **Two input chutes** on the left: rounded funnels 120 wide; each ends in a **seat** 112 × 112 (white card, 3 px ink, radius 14) holding the input picture at 96 × 96 (fitted by its ink box). Top seat = A, bottom seat = C.
  - **The relation dial** in the middle: a round window 150 px across with a 3 px teal rim (#146B5E) and a small brass pointer at 12 o'clock. Behind the glass a disc carries **four emblems** at 12/3/6/9 o'clock plus a **blank** (a plain circle) at the half-way slot between 9 and 12. Emblems (each 54 px, drawn geometry, one colour each, 3 px ink outline):
    - **GROWS UP** (green #4FA85A): a small circle, an arrow, a big circle.
    - **PART OF** (orange #E8913A): a whole circle with one wedge slid out of it.
    - **GOES INSIDE** (blue #4A86C8): an open box (U shape) with a small circle dropping into it.
    - **GOES WITH** (purple #8B6BB5): two puzzle-edge pieces, a peg and a socket, meeting.
    - **BLANK**: an empty grey circle (#C9C2B5) — "no way I know".
  - **Two tracks**: a 14 px channel from each seat through the dial edge to the output; unlit = grey #E6D8BF; lit = the emblem's colour.
  - **Two output trays** on the right: top tray (112 × 112 card) holds B; bottom tray is a **dashed** 112 × 112 outline, empty, with a soft "?"-free dotted floor (no character).
  - **The lever** on the machine's right side: a 22 px rail with a round knob 52 px (coral #F2784B), resting UP.
- **The shelf** below the machine (620 × 140): a drawn plank; **three candidate cards** 120 × 120 (picture 96 × 96), pitch 150, centred.
- **Second example** (setting "Examples: two pairs"): a third, smaller track above the top track with A2 → B2 at 72 × 72 cards; the dial points at the same sign for both.
- Task line above the machine (≤ 24 px, ≤ 2 lines); feedback bubble under the shelf.

At 360 (stage ≈ 336 wide), the machine keeps its left → right reading:
- seats 76 × 76 (pictures 64), dial 104 px (emblems 38 px), output trays 76 × 76, lever on the right edge at 44 px knob; machine 336 × 220.
- shelf: candidates 92 × 92 (pictures 72), pitch 104 → 312 wide.
- second example (if on): 52 px thumbnails in a strip above the machine (decoration of the rule only; still ≥ 48 px).
- Total stage ≈ 220 + 12 + 104 = 336 px; with header (56), task line (2 × 22) and bubble (48) the whole board and the lever sit above the 360 × 740 and 320 × 640 folds (at 320: seats 68 / pictures 64 exactly, dial 92).

Library pictures (each checked in `mini tools/pictures/<theme>.json` and LOOKED AT on a contact sheet by the critic, 2026-10-17):
- farm-animals: chick, hen, lamb, sheep, foal, horse · spring: bud, tulip, caterpillar, butterfly, bird, nest, birdhouse, leaf, bee, worm, garden, flower
- body-parts: face, nose, eye, mouth, tooth, head, ear, arm, hand, finger, foot
- around-the-house: toothbrush, toothpaste, broom, dustpan, fork, knife, plate, sink, mirror, toolbox, hammer, vase · clothing: shoe, glove, hat · beach: bucket, spade, sandcastle · tools: nail · toys: ball · thanksgivinng: haystack

Contact-sheet rulings (critic, from the sheets — every one is gated in §12 rule 7):
- **farm-animals/calf is drawn as a small horned cow and duckling ≈ duck** (PICTURE-RULINGS) — calf, duckling and duck are NOT used anywhere (the designer's calf→cow and duckling→duck rounds are gone). Grows-up comes from the pairs that read young→adult at a glance: chick→hen, caterpillar→butterfly, bud→tulip (a red tulip bud → the red tulip), lamb→sheep, foal→horse (the last two are close drawings; they never appear as the round's ONLY grows-up evidence — the second example is always a clear pair).
- farm-animals/hen and /chicken are the same drawing — only hen. farm-animals/chick and farm-animals/duck are never on one board.
- **body-parts/face and body-parts/head are near-identical drawings (a boy's face showing ears)** — never both on one board (A, B, C, shelf, second example).
- **body-parts/finger is a hand with the index finger raised** — used only as the answer to hand → ?, with the second example always face → nose so "a part" is seen on a non-hand first.
- body-parts pictures with a pink pointing arrow (toe, nail, chin, wrist, ankle, heel, neck, shoulder, cheeks, eyebrow, forehead, hair, eyelashes) are never used. body-parts/thumb is not in the JSON — not used.
- spring/bird and spring/robin are near-twins — only bird. spring/nest already holds two chicks — used only as a goes-inside verdict/answer for bird or chick.
- clothing/glove and clothing/mitten: never both on one board (two goes-inside answers). spring/flower is never on a bud round's shelf (bud → flower would also be grows-up).
- around-the-house/key + lock are NOT used: a key goes INTO a lock and is also "used with" it, so the relation would be two-way ambiguous. around-the-house/toaster shows bread inside — not used. around-the-house/garage shows a car inside — not used.
- around-the-house/spoon is never on a fork round's shelf (fork → spoon would also be goes-with).

Drawn apparatus: machine body, chutes, seats, dial, emblems, tracks, trays, lever, shelf. No words, no question mark, no character on the apparatus.

Task line (EN): "Watch the first pair. Then choose what comes out the same way." · after the first pair has run: unchanged (the task line never changes).

## 5. The hand
- **Round start (automatic, 2.4 s, skippable by any tap):** A drops into the top chute (fall 260 ms, thunk 180 Hz) → the disc spins (2 turns, ease-out 1.2 s, soft ticks at each slot) and stops on the relation's emblem, pointer click (1.4 kHz) → B slides out into the top tray (220 ms) → the top track fills with the emblem's colour from seat to tray (300 ms). Then C drops into the bottom chute (260 ms). The bottom track stays grey.
- **Drag a candidate** from the shelf → it lifts (scale 1.06, shadow, 80 ms) and follows the finger; over the bottom tray the dashed outline turns solid teal (hover). Release on the tray → it settles (120 ms bounce). Release elsewhere → it glides back (200 ms). A second candidate dropped on a filled tray swaps them (the old one glides back to its shelf slot).
- **Tap path** (fine motor / keyboard): tap a candidate (ringed, lifted), tap the bottom tray → it moves there.
- **Pull the lever**: drag the knob down (the rail follows the finger; past 60 % it latches with a clack) or simply tap the knob (it animates down, 200 ms). The lever IS the Check.
- **Undo**: drag the candidate out of the tray, or tap it → it returns to the shelf.
- **Replay**: tap the dial → the first pair runs again (A slides back to its seat, the track empties and fills, B pops out, 1.6 s). Always allowed, never counted as a miss — it is the "look again" move.
- **Free play** (any time after a round is solved, and on the solved board): drop any shelf picture into the **bottom seat** (C can be swapped out) and any into the bottom tray, then pull the lever: the dial spins and shows the relation the machine finds for that pair (from the relation table in §12) or lands on the blank with a little side-to-side wobble ("no way I know"). Nothing is marked.
- Optional TTS: long-press (600 ms) on any picture speaks its noun. Nothing depends on hearing.

## 6. The rounds
One round = A → B shown, C given, three candidates, one right. Every candidate set holds exactly: the **answer**, one **theme distractor** (belongs with C by place or story, but not by the round's relation), and one **trap** (either the example's own answer B, or a "right kind, wrong one" picture). The relation each pair actually has is fixed in the data (§12) and gated: only the answer has the round's relation with C.

**Level "Two ways" (grows up · part of) — 9 rounds** (rebuilt by the critic: calf, duck, duckling and the face+head boards are gone; every verdict below is what the gate's own table returns for (C, candidate))

| # | example A → B (relation) | C | answer | theme distractor (its relation with C) | trap (its relation with C) | 2nd example |
|---|---|---|---|---|---|---|
| A1 | chick → hen (grows up) | lamb | sheep | haystack (blank) | horse (blank) | caterpillar → butterfly |
| A2 | caterpillar → butterfly (grows up) | foal | horse | haystack (blank) | butterfly (blank, copy-the-example) | chick → hen |
| A3 | face → nose (part of) | arm | hand | glove (blank) | nose (blank, copy) | mouth → tooth |
| A4 | arm → hand (part of) | face | eye | mirror (blank) | foot (blank) | mouth → tooth |
| A5 | lamb → sheep (grows up) | chick | hen | nest (goes inside) | sheep (blank, copy) | bud → tulip |
| A6 | foal → horse (grows up) | caterpillar | butterfly | leaf (blank) | bee (blank) | chick → hen |
| A7 | head → ear (part of) | mouth | tooth | toothbrush (goes with) | nose (blank) | arm → hand |
| A8 | chick → hen (grows up) | bud | tulip | garden (blank) | hen (blank, copy) | caterpillar → butterfly |
| A9 | mouth → tooth (part of) | hand | finger | glove (goes inside) | ear (blank) | face → nose |

Gated: no candidate other than the answer has the round's relation with C — this is why A4 (face) carries no nose/mouth/ear, A8 (bud) carries no flower, A9 (hand) carries no other hand part. 5 grows-up rounds, 4 part-of rounds.

**Level "Four ways" (all four relations) — 9 rounds**

| # | example A → B (relation) | C | answer | theme distractor (relation with C) | trap (relation with C) | 2nd example |
|---|---|---|---|---|---|---|
| B1 | bird → nest (goes inside) | foot | shoe | ball (blank) | hat (blank) | hand → glove |
| B2 | hammer → nail (goes with) | toothbrush | toothpaste | sink (blank) | nail (blank, copy) | broom → dustpan |
| B3 | broom → dustpan (goes with) | fork | knife | plate (blank) | dustpan (blank, copy) | bucket → spade |
| B4 | foot → shoe (goes inside) | bird | birdhouse | worm (blank) | shoe (blank, copy) | hammer → toolbox |
| B5 | chick → hen (grows up) | caterpillar | butterfly | leaf (blank) | hen (blank, copy) | lamb → sheep |
| B6 | face → eye (part of) | mouth | tooth | toothbrush (goes with) | ear (blank) | arm → hand |
| B7 | lamb → sheep (grows up) | bud | tulip | garden (blank) | sheep (blank, copy) | chick → hen |
| B8 | hand → glove (goes inside) | flower | vase | bee (blank) | glove (blank, copy) | foot → shoe |
| B9 | arm → hand (part of) | face | nose | mirror (blank) | hand (blank, copy) | mouth → tooth |

Coverage: goes inside 3 (B1, B4, B8) · goes with 2 (B2, B3) · grows up 2 (B5, B7) · part of 2 (B6, B9). The "different way" showing at miss 2 lands on a real sign in A5 (nest: goes inside), A7/B6 (toothbrush: goes with), A9 (glove: goes inside) — so theme association is SEEN to be a different relation, not just "wrong". B1 and B4 use goes-inside in both directions of the child's life (the bird's home, the foot's shoe) with two different examples.

Data rules (gated in `verify-same-way-machine-core.js` against its own relation table, §12):
- exactly one candidate has the round's relation with C;
- the trap is either the example's B (the copy-the-example trap: A2, A3, A5, A8, B2, B3, B4, B5, B7, B8, B9) or an "other one of the same kind" (an adult animal, a body part, a garment);
- no noun appears twice on one board except the listed copy traps; never face+head, chick+duck, glove+mitten, bird+robin on one board; never spring/flower on a bud round, spoon on a fork round;
- relations are never reversed: "part of" always runs whole → part, "grows up" young → adult, "goes inside" thing → what it goes into, "goes with" first → second as in the example.
**Answer position**: the three candidate slots are reshuffled at every showing so that, gated over 300 seeded passes, the answer sits in each slot 30–37 % of the time and never in the same slot more than 2 rounds running; the theme distractor is likewise balanced (it must not always sit next to the answer — adjacency ≤ 60 %).

**Order**: order-only reshuffle per pass via `nextTask` (a pass is never the same order as the previous pass); within a pass the relation never repeats more than twice in a row (Four ways: each of the four relations appears at least twice in the 9).

## 7. Check, the misses, the success
- **Lever pulled with the tray empty** → the lever springs back up, the empty tray's dashed outline pulses twice; bubble "Choose a picture and put it in the empty tray first." (no miss)
- **Miss 1** (wrong candidate): the machine runs the bottom track — the track fills half way, then the gears **grind** (the disc judders ±6° three times, low 140 Hz buzz, 400 ms), the track drains back to grey and the candidate is **popped out** of the tray back onto the shelf (arc, 300 ms). Then the **first pair re-runs slowly** (1.6 s): A slides into its seat again, the emblem animates its own little story (the small circle grows into the big one / the wedge slides out of the circle / the dot drops into the box / the peg clicks into the socket), and the top track refills. Bubble: "The machine works the same way both times. Look at the first pair again — then try another picture."
- **Miss 2**: **the machine tries every picture.** One after another (1.4 s each) each shelf candidate rides into the bottom tray by itself, the disc spins and stops on **that pair's own relation** — or lands on the blank and wobbles. The one that stops on the **same emblem as the first pair** clicks, its track lights in the emblem's colour, and it rides back to the shelf with a soft glow ring that stays on. The child still has to put it in the tray and pull the lever. Bubble: "Only one picture makes the dial stop on the same sign. Put it in and pull the lever."
- A new drag or tap takes the glow ring away until the next lever pull.
- **Success**: the bottom track fills in the emblem's colour, the disc does a double click, both tracks pulse together twice, a two-note bell (C6–E6) rings, and the two pairs slide forward out of the machine to stand side by side on the shelf under a copy of the emblem (A B · C D) for 2 s. Bubble (noun-free, so it never needs a case ending):
  - grows up: "The same way: the little one grows up!"
  - part of: "The same way: it is a part of the whole!"
  - goes inside: "The same way: it goes inside!"
  - goes with: "The same way: you use them together!"
  The pictures in the bubble row carry their noun captions (singular label from `image-vocabulary.js`).

## 8. Settings
1. **Ways**: "Two ways" (grows up, part of — rounds A1–A9) / "Four ways" (all four — rounds B1–B9). At rest the dial disc visibly changes: in Two ways the GOES INSIDE and GOES WITH emblems are greyed (they still exist, so the miss-2 showing can land on them, e.g. A5's nest, A7's toothbrush).
2. **Examples**: "One pair" / "Two pairs" — Two pairs adds the second example track above the first (A2 → B2 from the tables), both lighting the same emblem. The board changes at rest (an extra lit track and two more pictures).

## 9. Words (EN source)
- title: "The Same-Way Machine"
- instruction: "Watch the first pair go through the machine. Choose what comes out of the new picture the same way, then pull the lever."
- task line: "Watch the first pair. Then choose what comes out the same way."
- hints: "Choose a picture and put it in the empty tray first." · "The machine works the same way both times. Look at the first pair again — then try another picture." · "Only one picture makes the dial stop on the same sign. Put it in and pull the lever."
- celebrations: "The same way: the little one grows up!" · "The same way: it is a part of the whole!" · "The same way: it goes inside!" · "The same way: you use them together!"
- free play (bubble when a free pair lands on the blank): "Hmm — the machine doesn't know a way for these two."
- settings: "Ways" — "Two ways" / "Four ways" · "Examples" — "One pair" / "Two pairs"
- aria: seats "First picture: {noun}" / "New picture: {noun}"; top tray "Comes out: {noun}"; bottom tray "Empty tray" / "Comes out: {noun}"; dial "The machine's sign: grows up | part of | goes inside | goes with | no sign"; lever "Pull the lever".

Locale traps:
- **No noun is ever inflected in a sentence.** Every sentence that mentions a relation is noun-free; nouns only appear as captions under pictures (nominative singular from `image-vocabulary.js`). This is the design's answer to de case after prepositions (in die Garage / zum Gesicht), fi case endings (kasvojen osa, autotalliin), nl/sv/da/no definite suffixes, and fr/es/pt/it article gender.
- **"grows up"**: natural noun-free forms per locale — de "das Kleine wird groß" · fr "le petit devient grand" · es "el pequeño crece" · pt "o filhote cresce" · it "il piccolo diventa grande" · nl "het jong wordt groot" · sv "ungen växer upp" · da "ungen vokser op" · no "ungen vokser opp" · fi "pienestä kasvaa iso". The reviewer checks that "the little one" never reads as a person.
- **"part of the whole"**: de "ein Teil vom Ganzen" · fr "une partie du tout" · es "una parte del todo" · fi "osa kokonaisuutta" — each authored, never translated word by word.
- **Body-part labels**: de "Finger" (m) vs nl "vinger" vs fi "sormi" are straightforward; **face** is plural-shaped in fi ("kasvot") — captions use the vocab singular slot as stored, which for fi is "Kasvot"; fine as a caption, would be wrong in a sentence (another reason no sentence carries nouns).
- **Shoe/glove** are pair-nouns in some locales' everyday speech (sv "skor", fi "kengät") — the library singular is used.
- "the machine doesn't know a way" — avoid the word "rule" in every locale (it implies a single answer key the child must memorise).
- The emblems are language-free; the relation names appear only in the aria label and the success bubble.

## 10. Sound off, access, phones
- Every outcome is visible: the dial's stop, the lit track colour, the grind + pop-out, the try-every-picture walk with the dial's verdict for each, the double click and the two pairs standing together. Sounds are decoration.
- Keyboard: Tab order = dial (Enter replays the first pair) → candidates (Enter lifts) → bottom tray (Enter drops) → lever (Enter pulls). Escape cancels a lift. Focus ring 3 px #146B5E.
- aria-live polite on the bubble; the dial's aria-label announces the emblem name after each stop.
- Taps ≥ 44 px (candidates 92 at 360, 84 at 320; lever knob 52/44). Pictures 96 px at 704, ≥ 64 px on phones (seats 64, candidates 72).
- prefers-reduced-motion: the dial jumps to its stop (no spin), the grind is a single colour flash, the try-every-picture walk shows each verdict as a still for 1 s.
- Phone: the machine keeps its left → right flow (inputs left, dial centre, outputs right) because the left-to-right reading IS the analogy's direction; the shelf sits below; the lever is part of the machine, so "Check" is always above the fold.

## 11. Distinct from
- **#225 The Sorting Cabinet** (matrix reasoning): a drawer completes a row/column pattern of attributes; here the link is a meaningful relation between two named things, and the dial names it.
- **Odd-one-out / category activities**: category membership ("which is an animal") vs. a directed relation between a pair.
- **#233 Mother and Baby** (if built with young/adult pairs): matching a baby to its mother is one relation and a pairing; here grows-up is only one of four, and the task is to carry a relation across, not to pair.
- **`sorting-hoops` tool**: hidden attribute rule over many objects; here a relation between two objects, applied to a third.
- **#229 The Blink Viewer / #224 The Tile Twin**: sameness of pictures (blinked in one window / copied on tracing paper); here sameness of a relationship between different pictures.
- Registry: no built or designed activity uses a relation dial, a two-track machine or a "try every candidate" showing.

## 12. Build plan
- **Core state**: `{round, level, examples:1|2, tray:null|noun, shelf:[noun,noun,noun] (slot order), misses, glow:null|noun, free:false, dialAt:'grows'|'part'|'inside'|'with'|'blank'}`.
- **Core functions**: `relationOf(x, y)` → one of the five dial stops, looked up in the core's `RELATIONS` table (pairs listed explicitly, the COMPLETE table, written once in the core and typed again independently in the gate: grows — chick→hen, caterpillar→butterfly, bud→tulip, bud→flower, lamb→sheep, foal→horse · part — face→nose, face→eye, face→mouth, face→ear, head→ear, head→nose, head→eye, head→mouth, mouth→tooth, arm→hand, arm→finger, hand→finger · inside — bird→nest, bird→birdhouse, chick→nest, foot→shoe, hand→glove, hammer→toolbox, flower→vase, tulip→vase · with — hammer→nail, toothbrush→toothpaste, mouth→toothbrush, tooth→toothbrush, broom→dustpan, fork→knife, fork→spoon, knife→fork, bucket→spade, spade→bucket; anything not listed = `'blank'`. Free play may only ever stop on a sign this table lists — the machine never invents a relation); `place(noun)`, `unplace()`, `pull()` → `{ok, verdict:relationOf(C, tray)}`; `tryAll()` → `[{noun, verdict}]` in slot order; `hintLevel()`; `nextTask` with the slot-balance shuffle; `freePull(c, d)`.
- **Gate's own ground truth** (`verify-same-way-machine-core.js`): it carries its OWN relation table, typed literally from §6 (not imported from the core), and asserts:
  1. every round's answer has the round's relation with C, and no other candidate does (also against the core's table: both tables must agree on every listed pair);
  2. every theme distractor's verdict equals the value written in §6;
  3. relation directions (grows: young → adult per a literal list of young nouns; part: whole → part);
  4. Four ways covers each relation ≥ 2 times; Two ways only grows/part;
  5. the six nouns on a board are distinct except the listed copy-the-example traps;
  6. slot balance over 300 passes (30–37 % per slot, ≤ 2 in a row);
  7. every noun exists in `mini tools/pictures/<theme>.json` and is not in the refusal list (chicken, calf, duck, duckling, robin, key, lock, toaster, garage, arrow body parts, thumb, any B&W theme) and the board-pair bans of §4 (face+head, chick+duck, glove+mitten, flower on a bud board, spoon on a fork board).
- **Mutations** (one per rule): `pull` accepts any candidate with a non-blank verdict · `pull` accepts the theme distractor · `relationOf` ignores direction (finger → hand counts as part) · a round where the mouth sits on A4's face shelf · a board that shows face and head together · `tryAll` marks every candidate · the glow ring survives a new drag · the lever passes with an empty tray · slot shuffle pins the answer to slot 0 · Two ways shows a goes-with round · the success bubble uses the wrong relation's sentence · the dial stops on a different emblem for the second example · aria-label leaks the answer ("correct").
- **Pictures to re-verify on a contact sheet at build**: the critic has looked at farm-animals, spring, body-parts, around-the-house, clothing, tools, beach and thanksgivinng; the builder re-checks spring/bud (it must read as a tulip bud beside spring/tulip at 96 px — if not, A8/B7 swap C to lamb with answer sheep, removing sheep from the trap) and beach/spade vs beach/shovel (only spade is used).
- **Risks**: emblem legibility without words (the reviewer reads the four emblems on a contact sheet and names them before seeing the captions; GOES WITH is the weakest — if the reviewer cannot name it, it becomes two gear wheels whose teeth mesh); lamb/sheep and foal/horse similarity (mitigated: they are never a round's only grows-up evidence — the second example is always chick→hen, caterpillar→butterfly or bud→tulip).
- **BLOCKED**: nothing. (A bigger "goes inside" pool — beehive, kennel, fish bowl — would need new art; recorded as nice-to-have, not needed.)

## 13. The four questions (answered, honestly)
1. **Would a 5–8-year-old choose it again?** Yes: a lever, a spinning dial that lands, a grinding gear when it's wrong, a bell when it's right, and a free-play mode where silly pairs make the dial shrug.
2. **Would a teacher put it on the board?** Yes: it is the G1-157 worksheet with the hidden part made visible — the relation is a sign on a dial, the classic theme-association error is shown as "a different way" by the machine itself, and every round has exactly one candidate with the relation (gated).
3. **Would a parent trust it?** Yes: real library pictures, calm motion, no words to read on the apparatus, nothing sold, nothing scored.
4. **The invention in one sentence:** the relation between the first pair becomes a sign on a dial, and the machine only rings when the new pair makes the dial stop on the same sign.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 2→5
What changed:
- Both round tables rebuilt from the contact sheets. The designer's rounds rested on pictures that do not show what they say: calf (drawn as a small cow), duckling ≈ duck, chick beside duck, face beside head (the same boy's face) and a hand round whose own example (A3) put the hand on the shelf. Key → lock was filed as "goes with" although the key goes INTO the lock — a two-way-ambiguous relation the machine would have had to refuse; it is gone.
- New, unambiguous pairs: bud → tulip (grows up), arm → hand (part of), flower → vase (goes inside), broom → dustpan, fork → knife, bucket → spade (goes with). Every board re-checked so exactly one candidate has the round's relation; the miss-2 "different way" now lands on a real sign in four rounds (nest, toothbrush ×2, glove).
- The complete relation table is written out in §12 (both core and gate type it independently), so free play can never stop on an invented sign.
- Board-pair bans (face+head, chick+duck, glove+mitten, bird+robin, flower on a bud board, spoon on a fork board) added to the rulings and the gate; Four ways now covers every relation ≥ 2.
