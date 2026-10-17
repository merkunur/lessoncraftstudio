# New 286 — The Turntable Map (Social Studies · compass directions)

## 0. Identity
- id `compass-walker.play.compass-directions` · grade 2 · Social Studies — maps: the four cardinal directions on a compass rose (framework entry `compass-directions` via `frontend/lib/frameworks.ts`) · strand Social Studies · files `mini tools/compass-walker-core.js`, `compass-walker-activity.js`, `compass-walker-activity.html`, `compass-walker-activities.json`. Title: **"The Turntable Map — North, East, South, West"**.
- worksheets it covers: **G2-369** North, East, South, West: Label the Four Directions (the rose with three missing letters, orange tip = north, some roses turned) → *Label the rose* mode; **G2-371** Cardinal Directions on a Map (start at a picture, look the way the word says, circle the one picture of three/four that lies that way) → *Directions on the map* mode.
- new instrument (no old activity). It reuses the shipped printable geometry and data: `scripts/worksheet-gen/primitives/compass-rose.js` (four split kites, the coral north marker that rotates with the rose, letters always upright) and the native-signed `dirLetters`/`dirWords` in `data/b5/locales/maps.<loc>.json`.

## 1. The pitch
"The map sits on a turntable, so north is wherever the orange tip points — turn the map, read the rose, and when you choose a picture a sight line runs to it and lands on the rose letter of the way you really looked."

## 2. Why a child will want it again (the fun)
- **A map you can spin.** The square map board stands on a round wooden turntable. Grab its edge and turn: it lifts a few pixels (shadow grows), rotates under the finger, and on release clicks down into the nearest quarter turn with a satisfying ratchet *k-k-klack*. The library pictures pinned on it ride round with it but always stay upright, like pins on a real map. Spinning it is pure fiddle-toy.
- **The walker that turns to look.** On the start picture stands the walker: a drawn teal token shaped like a teardrop, its point = the way it faces. Tap a picture and the walker swivels to face it (150 ms) — the child *aims*.
- **The sight line.** At Check a dotted line shoots from the walker to the chosen picture; at the same instant a twin arrow appears inside the rose, pointing the same way, and its arm's letter flips up big (E!). Right: the picture gets a little bounce and a drawn flag pops on it. Wrong: the letter that flips up is a different one — the child SEES "you looked West".
- **End-of-round show.** After the 8th round the walker walks a little four-stop tour: it steps to the north picture, back, east, back, south, back, west, back, and at each stop the rose's arm lights and the direction word appears under the board ("north · east · south · west"), the turntable doing one slow victory spin at the end.
- **Label-the-rose show.** When the three letters are right the walker stands on the rose's centre, faces the orange tip, and turns clockwise in four clicks, its little coral "right hand" dot sweeping N → E → S → W while each letter brightens in turn.
- **Free play.** Between rounds every picture can be tapped to throw a sight line (the rose names the direction), and the turntable spins freely.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (G2 maps):** know the four cardinal directions and their order on a compass rose (clockwise N–E–S–W, so east is to the RIGHT when you face north); find north on a map from the rose's marked tip; use the rose to say what lies north, east, south or west of a place.
- **Misconception 1 — east and west swapped.** Pushback: (a) in rose mode the walker's coral right-hand dot is the physical rule: facing the orange tip, the dot points at the box that must hold E; a W dropped there shakes off when the dot reaches it; (b) on the map, choosing the west picture for "east" makes the sight line land on W in the rose — the swap is shown, not told.
- **Misconception 2 — north always means up the page.** Pushback: in *Rose: turned* the map arrives rotated 90°, 180° or 270° (the rose rotates with it — its coral north kite marks north). A child who taps the top picture for "north" sees the sight line land on W, E or S. The turntable gives the real strategy: *turn the map until the orange tip points up*, and the miss-1 help does exactly that turn, slowly, in front of the child.
- **Misconception 3 — the rose letters are decoration.** The rose is the only source of truth on the board; the board has no up-is-north frame, no arrows, no words.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px — Directions on the map**
- **Turntable** (drawn: a wooden disc 470 px, 3 px ink rim, a soft grain stroke) carrying the **map board**: a rounded square 400 × 400 (cream paper, a faint 3 × 3 grid in light teal 1.5 px). The grid's middle row and column are "streets" (a soft sand band 26 px wide through the centre, so the four arm cells visibly line up with the start).
- **Pictures:** the start picture in the centre cell and one landmark in each of the four arm cells (N/E/S/W of the start); library pictures 112 × 112 inside 133 px cells. The start cell has a 4 px teal glow ring.
- **The rose** sits in one corner cell of the map (the corner is given per board), drawn with `compassRose({reference:true, px:120, rotation})`: four split kites, coral north kite, the four locale letters in white discs (letters 18 px, always upright). The rose turns with the board because it IS on the board.
- **Walker** token: teal teardrop 38 × 48 with a 2 px ink edge, standing at the lower right of the start picture.
- **Task line (≤ 24 px, 2 lines max):** "Look {dirWord} ({L}) from the glowing picture. Tap the first picture you see." e.g. "Look east (E) from the glowing picture. Tap the first picture you see."
- **Bubble column:** feedback text + Check button.

**At 704 px — Label the rose**
- The rose drawn big (`compassRose({px:300, rotation, given})`): one box shows its letter, three boxes dashed coral (empty). Walker token on the rose centre (38 × 48).
- **Letter tray** under the rose: three letter tiles 64 × 64 (Baloo 2, 36 px), the locale's three missing letters, shuffled (order dealt so the tray order never equals the clockwise order).
- Task line: "The orange tip points north. Put the other three letters on the rose."

**At 360 px**
- Map: turntable 340 px, board 300 × 300, cells 100 px, pictures 96 × 96 (the floor holds at 96 even on phones); the rose in its corner 96 px (letters 14.4 px — the primitive's own floor). At 320: board 280, cells 93, pictures 80 (≥ 64).
- Rose mode: rose 260 px (boxes 52 px, letters 34 px), tray tiles 56 × 56.
- Check: map mode — header 56 + task 52 + turntable 340 + bubble 60 + Check 52 = 560 ≤ 740 (≤ 640 at 320).
- Library pictures only for the landmarks; turntable, board, streets, rose, walker, flags, sight line are drawn geometry. The only letters on the apparatus are the rose letters (the content).

## 5. The hand
- **Turn the map:** pointerdown on the turntable rim or any empty board area → drag around the centre; the board follows the angle (atan2), lifts (shadow 4 → 10 px) and on release snaps to the nearest 90° with a 3-click ratchet sound over 220 ms. Pictures counter-rotate so they stay upright. Keyboard: `[` / `]` turn a quarter left/right. Turning never counts as a move for misses and never resets a chosen picture.
- **Choose a picture:** tap a landmark → the walker swivels to face it (150 ms) and the picture gets a 3 px ink outline. Tap another to change. Tapping the start picture does nothing (it wiggles). Keyboard: arrow keys move the walker's aim between the four landmarks in SCREEN directions (aria announces the picture name), Enter selects.
- **Label the rose:** drag a letter tile onto a box (or tap tile, then tap box). It snaps (80 ms, *tick*); a box can be emptied by dragging its tile back to the tray. The given letter is fixed. Keyboard: Tab to a tile, Enter, arrows to a box, Enter.
- **Check** → §7. Sound: soft woodblock for snaps, a bright two-note chime on success (no voice needed).
- **Free play** §2.

## 6. The rounds
**Mode A — Directions on the map, Rose: always up (rotation 0)** — 8 rounds. Board columns are the pictures in MAP directions (N = north of the start). Rose corner rotates TL, TR, BR, BL by round.
| # | start (glowing) | north | east | south | west | asked | answer |
|---|---|---|---|---|---|---|---|
| 1 | miscellaneous/house | camping/tent | vehicles/bus | camping/lake | christmas/church | E | bus |
| 2 | camping/tent | camping/mountain | camping/campfire | vehicles/car | beach/lighthouse | W | lighthouse |
| 3 | christmas/church | activities/playground | miscellaneous/house | vehicles/sailboat | camping/cabin | S | sailboat |
| 4 | vehicles/bus | beach/sandcastle | spring/birdhouse | camping/forest | around-the-house/mailbox | N | sandcastle |
| 5 | camping/cabin | camping/lake | christmas/church | camping/mountain | vehicles/car | W | car |
| 6 | beach/lighthouse | vehicles/sailboat | camping/tent | beach/sandcastle | activities/playground | N | sailboat |
| 7 | camping/forest | miscellaneous/house | camping/cabin | spring/birdhouse | camping/campfire | E | cabin |
| 8 | activities/playground | vehicles/bus | around-the-house/mailbox | beach/lighthouse | camping/forest | S | lighthouse |
Asked N/E/S/W = 2/2/2/2; the answer's screen place up/right/down/left = 2/2/2/2 (measured, `work-36/d286.js`). Every board shows all four directions, so every round has exactly one right picture and three distractors, one of which is always the OPPOSITE direction (the E/W or N/S swap).

**Mode A — Rose: turned** — 8 rounds on the same boards, the map (and its rose) arriving rotated:
| # | board | rotation | asked | answer (map arm) | where it shows on screen |
|---|---|---|---|---|---|
| T1 | 3 | 90° | N | playground | right |
| T2 | 6 | 180° | E | tent | left |
| T3 | 1 | 270° | S | lake | right |
| T4 | 8 | 0° | W | forest | left |
| T5 | 5 | 180° | N | lake | down |
| T6 | 2 | 270° | E | campfire | up |
| T7 | 7 | 0° | S | birdhouse | down |
| T8 | 4 | 90° | W | mailbox | up |
Measured: asked N/E/S/W 2/2/2/2; rotations 0/90/180/270 2/2/2/2; screen place up/right/down/left 2/2/2/2. A "north is up" bot is right in 2 of 8 (only the two 0° rounds); an "east/west swapped" bot is right in 0 of the 4 east/west rounds.

**Mode B — Label the rose** — 8 rounds each setting. *Rose: always up*: given letter N, E, S, W, N, S, E, W (rotation 0). *Rose: turned*: (given, rotation) = (N, 90°) (E, 180°) (S, 270°) (W, 0°) (N, 180°) (E, 270°) (S, 0°) (W, 90°) — given letters 2/2/2/2, rotations 2/2/2/2, the given box's screen place up/right/down/left 2/2/2/2 (same Latin pairing as above). The tray order is dealt so it never matches the clockwise order of the empty boxes (a "drop the tiles in tray order" bot scores 0 rounds fully right).

**Order:** order-only reshuffle per pass (rounds permuted; never the previous pass's order; never two boards with the same start picture back to back).

**Pictures** (all verified labelled in 11 locales in `mini tools/pictures/*.json`; seen on contact sheets): miscellaneous/house, camping/tent, vehicles/bus, camping/lake, christmas/church (white chapel with a cross — fine as a landmark), camping/mountain, camping/campfire, vehicles/car, beach/lighthouse, activities/playground, vehicles/sailboat, camping/cabin, beach/sandcastle, spring/birdhouse, camping/forest (a labelled grove), around-the-house/mailbox. Refused: camping/compass (English N E S W printed in it), tree/<fruit> (labels name the fruit, not the tree), vehicles/taxi / school_bus / police_car (printed English), post-office/* (printed "post office"/"POST"). Labels appear only in aria and in the success line; the board shows pictures alone.

## 7. Check, the misses, the success
- **Check with nothing chosen** → hint, no miss: map "Tap the picture you would see if you looked {dirWord}." · rose "Drag the letters onto the empty boxes."
- **Rose with a box still empty** → hint, no miss: "Every box needs a letter."
- **Map — Miss 1:** the sight line runs from the walker to the chosen picture and the rose's twin arrow lights the letter of where the child really looked; then the board slowly turns (500 ms) until the orange tip points up (if it was not already) and stays turned that way. Hint (board was turned): "You looked {chosenWord} ({C}). Now north is at the top — look {dirWord} ({L})." · Hint (board was already north-up, key `map1Up`): "You looked {chosenWord} ({C}). Find {L} on the rose and look that way." (E.g. "You looked west (W). Now north is at the top — look east (E).")
- **Map — Miss 2:** the rose's {L} arm pulses and a faint dotted ray in the same direction runs from the walker across the board (it stops at the board edge, NOT at the picture — the child still taps). Hint: "Follow the dotted line from the glowing picture."
- **Rose — Miss 1:** the walker on the centre faces the orange tip and turns clockwise one click at a time; its coral right-hand dot points at each box in turn. A box holding the right letter lights; the first box with a wrong letter shakes and its tile drops back to the tray; the sweep stops there. Hint: "Face the orange tip: east is on your right hand. Then keep turning the same way."
- **Rose — Miss 2:** the sweep runs again and the correct letter appears faintly (outline only, 30 % ink) in the FIRST wrong box. Hint: "The faint letter shows what goes here."
- A new move (choosing, placing a tile, turning the map) clears the help until the next Check.
- **Success (map):** sight line + rose letter + a flag pops on the picture; bubble: "{Label} is {dirWord} of the glowing picture." (e.g. "The bus is east of the glowing picture." — see §9 for the locale frame).
- **Success (rose):** the clockwise sweep with all four letters brightening; bubble: "{N}, {E}, {S}, {W} — all the way round!" built from the locale letters (en "N, E, S, W — all the way round!").

## 8. Settings (each visibly changes the board at rest)
1. **Mode:** *Directions on the map* (turntable board) / *Label the rose* (big rose + letter tray). Default: map.
2. **Rose:** *Always up* (the orange tip at the top) / *Turned* (the board arrives rotated). Default: always up.

## 9. Words (EN source)
- Title "The Turntable Map" · instruction "Find north from the orange tip of the rose, then use the rose to find what lies north, east, south and west."
- Task lines: map "Look {dirWord} ({L}) from the glowing picture. Tap the first picture you see." · rose "The orange tip points north. Put the other three letters on the rose."
- Hints (§7 keys): `pickFirst`, `fillBoxes`, `everyBox`, `map1` "You looked {chosenWord} ({C}). Now north is at the top — look {dirWord} ({L}).", `map2` "Follow the dotted line from the glowing picture.", `rose1` "Face the orange tip: east is on your right hand. Then keep turning the same way.", `rose2` "The faint letter shows what goes here."
- Success: `mapOk` "{Label} is {dirWord} of the glowing picture." · `roseOk` "{N}, {E}, {S}, {W} — all the way round!" · end of set "You can read a compass rose!"
- Settings: "Mode" — "Directions on the map" / "Label the rose"; "Rose" — "Always up" / "Turned".
- **Locale traps.** Letters and words come ONLY from `scripts/worksheet-gen/data/b5/locales/maps.<loc>.json` (native-signed, ten files — there is NO `maps.en.json`: en N E S W / north east south west is the wrapper's own EN table, and the gate asserts it explicitly rather than reading a file that does not exist): en N E S W; de N O S W (*Osten*); fr N E S O (*ouest*); es N E S O; pt N L S O (*leste*); it N E S O (*ovest*); nl N O Z W (*oost, zuid*); sv N Ö S V; da N Ø S V; no N Ø S V (*sør*); fi P I E L (*pohjoinen, itä, etelä, länsi*). Consequences: (1) O means WEST in fr/es/pt/it but EAST in de/nl — the tray never offers a letter outside the locale set; (2) the "right hand = east" rule is letter-independent, so the rose hint works in Finnish where nothing starts with N; (3) direction words take case/prepositions: the task "look {dirWord}" is a per-locale whole sentence, never a template: de "Schau nach Osten (O) …", fr "Regarde vers l'est (E) …", es "Mira hacia el este (E) …", pt "Olhe para o leste (L) …", it "Guarda verso est (E) …", nl "Kijk naar het oosten (O) …", sv "Titta åt öster (Ö) …", da "Kig mod øst (Ø) …", no "Se mot øst (Ø) …", fi "Katso itään (I) …" (illative itään, länteen, etelään, pohjoiseen — four authored strings, not a stem). The success line "{Label} is east of …" needs the label's article/case: authored per locale as a frame with the landmark in nominative and the direction phrase fixed (de "Der Bus liegt östlich vom leuchtenden Bild." is avoided — the frame uses "Im Osten: der Bus." style chosen by the native author so no article declension of the start picture is needed). The fi mnemonic in the printable data ("…Eskimo…") is NOT used here (no mnemonics on screen).

## 10. Sound off, access, phones
- Every outcome is drawn (sight line, rose letter, turn, sweep, faint letter); TTS optional on the task line.
- Keyboard: `[`/`]` turn; arrows aim; Enter select; Tab through tiles/boxes; aria-live bubble. aria for a landmark: "{label}, {screen side}"; the rose is described as "compass rose, orange tip points {up/right/down/left}".
- Taps: pictures 96–112 px; tiles 56–64; turntable rim ring 40 px wide grab zone.
- Pictures ≥ 96 at 704 and at 360 (80 at 320).
- Phone: §4; the rotation lift-animation scales the board to 0.72 at mid-turn so the corners never leave the card.

## 11. Distinct from
- **Premium tool arrow-strip** (a plan of forward/back/quarter-turn cards drives a beetle): relative turning commands, a program run. Here there is no plan and no movement program: absolute compass directions read from a rose that rotates with the map; the child chooses a place.
- **New 244 The Camera That Climbs** (points of view), **New 266 The Map Key** (symbols): other map skills, other mechanics. **New 205 Hopscotch** (hopper turns to face before hopping, number line) — a facing token but a number task.
- **Batch siblings:** #287 is a globe↔map world (continents); this is a local map and a rose.
- Not a reused invention: no registry entry uses a rotating map board or a sight line transferred onto a rose.

## 12. Build plan
- **Model (core):** `state = {mode, rot (0|90|180|270, the board's current rotation), arriveRot, board:{start,N,E,S,W}, asked, chosen:'N'|'E'|'S'|'W'|null, rose:{given, boxes:{N,E,S,W}}, missStage}`. Pure functions: `screenArm(mapDir, rot) = (DIRS.indexOf(mapDir) + rot/90) % 4`, `mapDirAt(screenArm, rot)`, `turn(delta)`, `choose(mapDir)`, `check()`, `roseCheck() → {firstWrong, sweep:[…]}` (clockwise from N), `dealTray(missing)` (never clockwise order).
- **Gate (`verify-compass-walker-core.js`, own oracle):** for every round the answer = board[asked] independent of rot; turning the map never changes correctness; `screenArm` table checked against an independently written rotation matrix; balance counts of §6 (asked, rotation, screen place, given letter) exact; north-up bot = 2/8, E/W-swap bot = 0/4 on turned rounds; tray never in clockwise order; letters per locale equal `maps.<loc>.json` dirLetters (and each equals the first grapheme of its word, upper-cased); the rose sweep stops at the first wrong box; Check with nothing chosen is not a miss.
- **Mutations:** answer = screen-up for N (ignores rot) · rose does not rotate with the board · pictures rotate (not upright) · sight-line letter computed from screen arm instead of map arm · sweep goes anticlockwise · tray dealt in clockwise order · miss-1 does not turn the map north-up · a turn counts as a move that clears the selection · fi letters fall back to N E S W · miss-2 ray reaches the picture (gives the answer).
- **Pictures to verify:** the 16 above (done: labels present ×11; landmark art seen on camping, christmas, activities, around-the-house sheets).
- **Risks:** a rotated square board needs room — the lift-and-shrink turn animation solves it; letter discs at 96 px rose are 14.4 px (the primitive's measured floor) — at 360 the corner rose is drawn at 100 px.
- Nothing blocked (the compass rose is apparatus; the picture compass is refused).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a spinning map that clicks into place, a walker that swivels to look, and a sight line that lands on a letter are all toys before they are a task.
2. **Would a teacher put it on the board?** Yes — it teaches the real map routine (find the north tip, orient the map), it catches the E/W swap and the north-is-up error with the child's own choice drawn as a line, and every round is balanced and measured.
3. **Would a parent trust it?** Calm, picture landmarks, no score, works in all 11 rose alphabets including Finnish P I E L.
4. **The invention in one sentence:** the map turns on a turntable with its rose, and every picture you choose throws a sight line that lands on the rose letter of the way you really looked.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-measured every table with my own parser (`work-c36/c286.js`): 8 boards, each answer = board[asked], five distinct pictures a board; turned rounds asked 2/2/2/2, rotations 2/2/2/2, screen place 2/2/2/2, recomputed screen arms all match; north-is-up bot 2/8, E/W-swap bot 0/4. Rose-mode turned pairs re-derived: given box on screen 2/2/2/2.
- Read every locale's `maps.<loc>.json` dirLetters: de N O S W · fr/es/it N E S O · pt N L S O · nl N O Z W · sv N Ö S V · da/no N Ø S V · fi P I E L — all as the design says. Fixed the false claim that EN reads a maps file (there is no `maps.en.json`); EN is now an explicit wrapper table the gate asserts.
- Miss-1 hint no longer says "Now north is at the top" as news when the board never turned (`map1Up` key added).
- All 16 landmark pictures re-checked labelled in 11 locales; the refusal list (camping/compass English letters, post-office printed text, taxi/school_bus/police_car) stands.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
