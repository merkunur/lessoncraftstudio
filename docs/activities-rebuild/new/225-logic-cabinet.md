# New 225 — The Echo Cabinet (READINESS · matrix-reasoning)

## 0. Identity
- **id** `logic-cabinet.play.matrix-reasoning` · **grade** K (rows only); the rows-and-columns rule stretches to the G3-351 face · **framework** readiness — visual reasoning / matrix completion (`alignment.framework` from `frontend/lib/frameworks.ts`) · **strand** Logic & Visual Thinking · **files** `mini tools/logic-cabinet-core.js`, `logic-cabinet-activity.js`, `logic-cabinet-activity.html`, `logic-cabinet-activities.json` · **key** `logic-cabinet` · page title **"The Echo Cabinet"** (was "The Sorting Cabinet" — renamed because the invention changed)
- **worksheets covered:** **K-068** "What Fits the Gap?" (each row shows one kind; circle the piece that fits the empty box) → the *Rows* rule, both tray sizes · **G3-351** "What Completes the Puzzle?" (rows share a picture, columns share a size; circle what fits the empty cell) → the *Rows and columns* rule, both tray sizes. Dossier: `scratchpad/des/batches/batch-04.md` (NEW #225).
- All 11 locales; the apparatus carries no words. Round tables and every number below are produced and checked by `scratchpad/des/work-s225/rounds.js` (rounds + strategy bots), `sizes.js` (layout floors and folds) and `poison.js` (the checker is poisoned, control clean).

## 1. The pitch
"Drop a piece in the open drawer and it **sends echoes out along its own lines**: a see-through copy of its picture slides along the row and must land on a twin in every drawer, and a brass copy of its card's frame slides up and down the column and must fit every card there — the drawer only shuts when every echo lands, so the row and the column themselves are what accept or refuse the piece."

## 2. Why a child will want it again (the fun)
- **A real cabinet with real cards.** Nine honey-wood drawers with brass knobs; every drawer holds a cream picture card. The open drawer is pulled out, its card slot empty. Pick a card from the tray, it rides on the finger, drop it in — and the cabinet answers by itself.
- **The echoes fly.** Out of the dropped card come its echoes: a pale copy of its picture glides left and right along the row rail (growing or shrinking to each drawer's card on the way), and a thin brass frame — exactly the outline of the dropped card — slides up and down the column rail. When a picture-echo meets a twin it sinks into it and the twin gives a little hop; when a frame meets a card of its own size it clicks round it snugly with four corner ticks.
- **The surprise: the frame that will not go on.** Drop a big card in a column of small ones and its frame arrives *too big* — it hangs loose round each small card with a gap of wood showing and wobbles. Drop a small card in a column of big ones and the frame arrives *too small* — it bumps against the front of the big card and cannot get round it; the big card sticks out past it on all four sides. Children try the wrong size on purpose just to see the frame bump, and that is exactly the column rule being felt.
- **The ghost that lands on a stranger.** A wrong kind sends a pale pig gliding onto each cow — and it does not sink in: a pig face sits over a cow, both visible, rocking twice. It is funny, and it is plain why it does not belong.
- **The earned show — the cabinet proves itself.** When the drawer shuts (wooden *clack*, knob lights amber), all nine drawers send their echoes at once: in every row the picture-echoes cross and sink into their twins (one rising three-note run per row, top to bottom), then in the two-rule setting every column's frames slide and click round every card (three clicks per column, left to right). Eighteen echoes landing everywhere — the table showing it is one table.
- **Free play — where does every piece belong?** After a right round, any tray card can be dragged onto *any* drawer (as a test only — the drawer does not change): its echoes fly from there. Every wrong card from the shared kinds turns out to have a home somewhere else in the cabinet (its echoes all land on one particular drawer, whose card hops "that's me"), and a card of an outside kind never lands anywhere — "not from this cabinet". Children hunt for the homes.

## 3. The skill and the misconception
- **Skill (K-068, Rows).** Every row holds one kind; the open drawer needs the kind of its own row. **Skill (G3-351, Rows and columns).** Every row holds one kind and every column one size; the open drawer needs its row's kind *and* its column's size, both at once.
- **Misconception 1 — copying the nearest neighbour** (the picture just above or below the gap; the child scans vertically, not along the row). The tray always holds that kind (role N / WR). Pushback is the material: its picture-echo travels *along the row*, lands on the two row-mates and does not sink into either — two visible strangers on the row that was meant to be its family.
- **Misconception 2 — one rule only** (reading the row and ignoring the column, or the reverse). The two-rule tray always holds a right-kind-wrong-size card (RW — literally a copy of a drawer beside the gap) and a right-size-wrong-kind card (O1 / WR). Pushback: the two echoes are *different objects travelling on different rails*, so each rule answers separately and visibly. Right kind, wrong size: the picture-echoes sink in (the row is happy) but the frames bump or hang loose (the column refuses). Right size, wrong kind: the frames click (the column is happy) but the picture-echoes sit on strangers (the row refuses). The child sees that one line accepted the card and the other did not — the definition of "both rules must hold" in motion.
- **Misconception 3 — "size" means "the picture looks big"** (a tall balloon reads bigger than a round ball of the same card size). Size lives on the **card** (big / middle / small cream squares), and the frame-echo measures the card, never the drawing, so a skinny picture on a big card is still big.
- No message carries the diagnosis; the echoes do. The hint bubble only names where to look.

## 4. The stage
Apparatus (inline SVG, shell palette, 2–3 px ink): the cabinet carcase, nine drawer fronts with knobs, the row rails and column rails (thin brass grooves running through the drawers — visible at rest, they are where echoes travel), the cream cards (size = the column attribute), the brass frame-echoes, the tray. Library pictures only (identical instances per row; a card shows one picture scaled to its card, never different art). All drawer fronts the same honey wood (#E9C48F, edge #C9A06A), cards cream (#FFF6E6, 2 px #D9B98A edge), rails brass (#B8893B at 60 %), so colour never hints.

**704 px (content 656), `layout:'split'`:**
- **Task line** (20 px, one line) above everything.
- **The cabinet** (left, 470 × 470): frame 10 px (#B98B57), 3 × 3 cells **146 px**, 6 px gaps. Cards: **L 144 · M 120 · S 100** (pictures **140 · 116 · 96**, 2 px inset). Rows-only rounds: every card L. The open drawer: front dropped 10 px, a dark well (#6B4B2A at 55 %) where the card will sit, a faint brass ring on its rails.
- **Hint bubble column** (right of the cabinet, 170 wide): the bubble and the two-test lamps (§7) live here, never on the cabinet.
- **The tray** (full width under the cabinet): a recessed board, slots **146 px**, 4 per row. 3 or 4 cards = one row; 6 cards = two rows of 3. Cards sit in the tray **at their true card size** (an S card is visibly small), centred in their slot.
- **6-card tray at 704:** cells shrink to **134 px** (cards **L 132 · M 114 · S 100**, pictures 128 · 110 · 96) so the stage is **779 px** instead of 839 (sizes.js).
- Stage height (task 48 + cabinet + 16 + tray): **680 px** (3 or 4 cards) · **779 px** (6 cards). No empty band: cabinet + bubble fill the width, tray fills the row under it.

**360 px (content 328), stacked:** cells **102**, gaps 6, frame 4 → cabinet **326 × 326**. Cards **L 100 · M 84 · S 68**, pictures **96 · 80 · 64** (the smallest stays ≥ 64). Tray slots 102, 3 per row. Bubble under the tray (it never pushes the tray down: it overlays the space under it). Stage: **484 px** (3 cards) · **597 px** (4 or 6 cards) — under the 740 fold.

**320 px (content 288):** cells **92**, gaps 4, frame 2 → cabinet **288**. Cards **L 90 · M 78 · S 68**, pictures **86 · 74 · 64**. Tray 3 per row. Stage **434** (3) · **532** (4 or 6) — under the 640 fold. (Frame slack is only 5–6 px a side here, so the frame's *motion* — bump vs loose wobble, §5 — carries the size verdict on the smallest phone.)

**Words on the apparatus:** none. No letters, no L/M/S marks on cards.

## 5. The hand
- **Pick a card** (pointerdown in the tray, ≤ 16 ms response): it lifts (scale 1.06, soft shadow) and follows the finger; its slot shows a dashed outline.
- **Over the open drawer:** the well brightens and the row rail and column rail of that drawer glow faintly (where the echoes will run). Over a full drawer during the task: nothing.
- **Drop in the open drawer:** the card seats into the well (150 ms, soft *tock*). At 150 ms the echoes launch together:
  - **picture-echoes** (55 % opacity copy of the card's picture, no card) glide along the row rail to each row-mate, 420 ms ease-out, re-scaling on the way to the destination card's picture box;
  - **frame-echoes** (2.5 px brass square = the dropped card's exact outline) glide up/down the column rail to each column-mate, 420 ms. *(Rows rule: the cards are all one size, so no frames are sent — only the row is tested.)*
  - **Landing (at ~600 ms), per echo:** picture-echo on a twin → fades into it over 160 ms, the twin hops 4 px (100 ms), a soft high tick (G5); on a stranger → it stays at 55 %, rocks ±3° twice (2 × 90 ms), a dull *dub* (150 Hz). Frame on an equal card → snaps flush, four corner ticks flash, wooden click (330 Hz); frame larger → settles loose, the wood gap shows all round, it wobbles ±2 px twice, a hollow *tonk*; frame smaller → stops against the card's face (it cannot pass over), the card's edge shows beyond it on all four sides, it bumps back 3 px twice, a *knock*.
  - **All echoes land** → the drawer slides home (220 ms), *clack*, knob lights amber, then the earned show (§2).
  - **Any echo fails** → the echoes hold for 1.4 s, then glide back into the card (300 ms), the card lifts out and returns to its tray slot (300 ms). The drawer stays open.
- **Drop elsewhere:** the card glides back to its slot (250 ms).
- **Keyboard / tap-tap:** Tab to the tray, arrow keys between cards, Enter lifts the focused card (thick outline), Enter again (or a tap on the open drawer) drops it; Esc puts it back. Every echo result is announced in aria-live (§10).
- **Undo:** nothing to undo — a refused card always returns to the tray by itself.
- **Free play (after each right round):** drag any tray card onto any drawer → that card's echoes fly from that drawer (test only, nothing changes); a drawer whose row and column both accept it hops. Tap any drawer → its own echoes fly and always land (every card in a finished cabinet belongs). The "next" arrow starts the next round.

## 6. The rounds
One open drawer per round, one right card. The open drawer visits **all nine positions** once per pass in each setting. Rows only: all cards size L. Rows and columns: each column holds one size (L / M / S) and the column order is shuffled per round — all **6 column orders** are used, and the answer's size is **L 3 · M 3 · S 3** per pass. Tray roles:

- **Rows · 3 cards:** **R** right kind · **N** kind of the row directly above/below the open drawer (for a middle-row drawer alternately the top or the bottom row) · **O** a kind that is not in the cabinet. **Rows · 4 cards:** + **F** the far row's kind.
- **Rows and columns · 4 cards:** **R** · **RW** right kind at the size of the drawer *beside* the open one (a copy of that row-mate) · **O1** outside kind at the right size · **O2** outside kind at RW's size. This 2 × 2 (two kinds × two sizes) is chosen because every tray-only heuristic then ties (measured below).
- **Rows and columns · 6 cards:** **R** · **RW** · **WR** kind of the drawer above/below at the right size (a copy of the nearest-neighbour row, resized) · **WW** that kind at the third size · **O1** outside kind at RW's size · **O2** outside kind at the third size — three kinds × two sizes each, again every heuristic ties.

Order: order-only reshuffle of the nine rounds per pass (Fisher–Yates on the round list; a new pass never repeats the previous order); the tray slots are fixed per round as tabled (they are what the balance below measures).

Pictures (seen on a contact sheet, `scratchpad/des/work-s225/sheet.png`): fruits apple · banana · strawberry · pineapple · lemon · watermelon (a slice — used only as "watermelon") · kiwi; farm-animals cow · pig · sheep · horse · goat · rabbit · turkey; vehicles car · tractor · helicopter · sailboat; toys ball · kite · robot · rocket · dinosaur · balloon · blocks · car; animals elephant (chibi, used only as "elephant") · zebra · penguin · turtle · tiger · panda · whale · camel. Kept apart (never in one round): toys/car + vehicles/car (both green cars), sheep + goat (both white), toys/ball + toys/balloon (fr "Ballon" both). Refused: fruits/cherry, plum, peach, apricot, mango, persimmon (drawn as apples/other fruit), farm duck/duckling, hen/chicken (one drawing), toys/train + vehicles/train.

#### Rows only · tray 3 (R right · N nearest-row kind · O kind not in the cabinet)
| # | cabinet rows (top / middle / bottom) | open drawer (row,col) | tray slots 1…3 → answer |
|---|---|---|---|
| 1 | fruits: apple · banana · strawberry | (1,1) | banana N · **apple** R · pineapple O → slot 2 |
| 2 | farm-animals: cow · pig · sheep | (2,2) | **pig** R · horse O · sheep N → slot 1 |
| 3 | vehicles: car · tractor · helicopter | (3,3) | sailboat O · tractor N · **helicopter** R → slot 3 |
| 4 | toys: ball · kite · robot | (1,3) | rocket O · **ball** R · kite N → slot 2 |
| 5 | animals: elephant · zebra · penguin | (3,1) | zebra N · turtle O · **penguin** R → slot 3 |
| 6 | fruits: lemon · pineapple · watermelon | (2,1) | **pineapple** R · watermelon N · kiwi O → slot 1 |
| 7 | farm-animals: horse · goat · rabbit | (1,2) | **horse** R · turkey O · goat N → slot 1 |
| 8 | toys: dinosaur · balloon · blocks | (2,3) | blocks N · car O · **balloon** R → slot 3 |
| 9 | animals: tiger · panda · whale | (3,2) | camel O · **whale** R · panda N → slot 2 |

answer slot counts 3 / 3 / 3 of 9 (best fixed-slot guess 33 %, chance 33 %) · open drawer visits 9/9 positions
role → slot counts: N 3/2/4 · R 3/3/3 · O 3/4/2
strategy bots (expected success):
- shared attributes (the piece most like the other tray pieces): 33 %
- novelty (a piece not already in the cabinet): 0 %
- already in the cabinet: 50 %
- novelty, then most shared: 0 %
- copy the neighbour above/below: 11 %
- copy the neighbour beside: 100 %
- row only (right kind, any size): 100 %
- column only (right size, any kind): 33 %
- biggest card: 33 %
- smallest card: 33 %
- kind most common in tray: 33 %
- size most common in tray: 33 %

#### Rows only · tray 4 (+ F far-row kind)
| # | cabinet rows (top / middle / bottom) | open drawer (row,col) | tray slots 1…4 → answer |
|---|---|---|---|
| 1 | fruits: apple · banana · strawberry | (1,1) | banana N · **apple** R · pineapple O · strawberry F → slot 2 |
| 2 | farm-animals: cow · pig · sheep | (2,2) | cow F · horse O · sheep N · **pig** R → slot 4 |
| 3 | vehicles: car · tractor · helicopter | (3,3) | **helicopter** R · car F · sailboat O · tractor N → slot 1 |
| 4 | toys: ball · kite · robot | (1,3) | rocket O · kite N · **ball** R · robot F → slot 3 |
| 5 | animals: elephant · zebra · penguin | (3,1) | zebra N · turtle O · elephant F · **penguin** R → slot 4 |
| 6 | fruits: lemon · pineapple · watermelon | (2,1) | **pineapple** R · lemon F · watermelon N · kiwi O → slot 1 |
| 7 | farm-animals: horse · goat · rabbit | (1,2) | turkey O · **horse** R · rabbit F · goat N → slot 2 |
| 8 | toys: dinosaur · balloon · blocks | (2,3) | dinosaur F · blocks N · **balloon** R · car O → slot 3 |
| 9 | animals: tiger · panda · whale | (3,2) | panda N · **whale** R · tiger F · camel O → slot 2 |

answer slot counts 2 / 3 / 2 / 2 of 9 (best fixed-slot guess 33 %, chance 25 %) · open drawer visits 9/9 positions
role → slot counts: N 3/2/2/2 · R 2/3/2/2 · O 2/2/2/3 · F 2/2/3/2
strategy bots (expected success):
- shared attributes (the piece most like the other tray pieces): 25 %
- novelty (a piece not already in the cabinet): 0 %
- already in the cabinet: 33 %
- novelty, then most shared: 0 %
- copy the neighbour above/below: 0 %
- copy the neighbour beside: 100 %
- row only (right kind, any size): 100 %
- column only (right size, any kind): 25 %
- biggest card: 25 %
- smallest card: 25 %
- kind most common in tray: 25 %
- size most common in tray: 25 %

#### Rows and columns · tray 4 (R · RW right kind, size of the drawer beside · O1 outside kind, right size · O2 outside kind, RW size)
| # | cabinet rows (top / middle / bottom) · column sizes L→R | open drawer (row,col) | tray slots 1…4 → answer |
|---|---|---|---|
| 1 | fruits: apple · banana · strawberry · L M S | (2,3) | banana M RW · pineapple M O2 · **banana S** R · pineapple S O1 → slot 3 |
| 2 | farm-animals: cow · pig · sheep · L S M | (1,1) | **cow L** R · horse L O1 · horse S O2 · cow S RW → slot 1 |
| 3 | vehicles: car · tractor · helicopter · S M L | (3,2) | sailboat M O1 · **helicopter M** R · helicopter S RW · sailboat S O2 → slot 2 |
| 4 | toys: ball · kite · robot · S L M | (1,3) | rocket L O2 · ball L RW · rocket M O1 · **ball M** R → slot 4 |
| 5 | animals: elephant · zebra · penguin · S M L | (3,1) | **penguin S** R · turtle M O2 · penguin M RW · turtle S O1 → slot 1 |
| 6 | fruits: lemon · pineapple · watermelon · M L S | (2,2) | kiwi L O1 · **pineapple L** R · kiwi S O2 · pineapple S RW → slot 2 |
| 7 | farm-animals: horse · goat · rabbit · S L M | (1,2) | horse S RW · turkey L O1 · turkey S O2 · **horse L** R → slot 4 |
| 8 | toys: dinosaur · balloon · blocks · M S L | (2,1) | car S O2 · balloon S RW · **balloon M** R · car M O1 → slot 3 |
| 9 | animals: tiger · panda · whale · M L S | (3,3) | camel L O2 · **whale S** R · camel S O1 · whale L RW → slot 2 |

answer slot counts 2 / 3 / 2 / 2 of 9 (best fixed-slot guess 33 %, chance 25 %) · open drawer visits 9/9 positions
answer size L 3 · M 3 · S 3; column orders used 6/6
role → slot counts: RW 2/2/2/3 · O2 3/2/3/1 · R 2/3/2/2 · O1 2/2/2/3
strategy bots (expected success):
- shared attributes (the piece most like the other tray pieces): 25 %
- novelty (a piece not already in the cabinet): 33 %
- already in the cabinet: 0 %
- novelty, then most shared: 33 %
- copy the neighbour above/below: 50 %
- copy the neighbour beside: 6 %
- row only (right kind, any size): 50 %
- column only (right size, any kind): 50 %
- biggest card: 28 %
- smallest card: 22 %
- kind most common in tray: 25 %
- size most common in tray: 25 %

#### Rows and columns · tray 6 (R · RW · WR kind of the drawer above/below, right size · WW that kind, third size · O1 · O2 outside kind)
| # | cabinet rows (top / middle / bottom) · column sizes L→R | open drawer (row,col) | tray slots 1…6 → answer |
|---|---|---|---|
| 1 | fruits: apple · banana · strawberry · L M S | (2,3) | banana M RW · pineapple M O1 · **banana S** R · pineapple L O2 · apple S WR · apple L WW → slot 3 |
| 2 | farm-animals: cow · pig · sheep · L S M | (1,1) | pig L WR · pig M WW · horse M O2 · horse S O1 · **cow L** R · cow S RW → slot 5 |
| 3 | vehicles: car · tractor · helicopter · S M L | (3,2) | **helicopter M** R · sailboat L O2 · tractor L WW · helicopter S RW · sailboat S O1 · tractor M WR → slot 1 |
| 4 | toys: ball · kite · robot · S L M | (1,3) | kite S WW · ball L RW · kite M WR · rocket L O1 · rocket S O2 · **ball M** R → slot 6 |
| 5 | animals: elephant · zebra · penguin · S M L | (3,1) | turtle L O2 · **penguin S** R · turtle M O1 · zebra S WR · penguin M RW · zebra L WW → slot 2 |
| 6 | fruits: lemon · pineapple · watermelon · M L S | (2,2) | kiwi S O1 · watermelon L WR · pineapple S RW · **pineapple L** R · watermelon M WW · kiwi M O2 → slot 4 |
| 7 | farm-animals: horse · goat · rabbit · S L M | (1,2) | **horse L** R · goat M WW · turkey S O1 · goat L WR · turkey M O2 · horse S RW → slot 1 |
| 8 | toys: dinosaur · balloon · blocks · M S L | (2,1) | blocks M WR · **balloon M** R · balloon S RW · car L O2 · blocks L WW · car S O1 → slot 2 |
| 9 | animals: tiger · panda · whale · M L S | (3,3) | camel M O2 · camel L O1 · panda M WW · whale L RW · panda S WR · **whale S** R → slot 6 |

answer slot counts 2 / 2 / 1 / 1 / 1 / 2 of 9 (best fixed-slot guess 22 %, chance 17 %) · open drawer visits 9/9 positions
answer size L 3 · M 3 · S 3; column orders used 6/6
role → slot counts: RW 1/1/2/2/1/2 · O1 1/2/2/2/1/1 · R 2/2/1/1/1/2 · O2 2/1/1/2/2/1 · WR 2/1/1/2/2/1 · WW 1/2/2/0/2/2
strategy bots (expected success):
- shared attributes (the piece most like the other tray pieces): 17 %
- novelty (a piece not already in the cabinet): 33 %
- already in the cabinet: 0 %
- novelty, then most shared: 33 %
- copy the neighbour above/below: 11 %
- copy the neighbour beside: 3 %
- row only (right kind, any size): 50 %
- column only (right size, any kind): 50 %
- biggest card: 17 %
- smallest card: 17 %
- kind most common in tray: 17 %
- size most common in tray: 17 %

**What the bots say.** In every setting the best fixed-slot guess is the slot-balance ceiling (33 % / 33 % / 33 % / 22 %), and no tray-only trick beats chance: "the piece most like the others", "the biggest / smallest card", "the commonest kind / size in the tray" all sit at chance; "a piece not already in the cabinet" scores 0 % in Rows (the right kind is always visible on its row-mates) and 33 % in Rows and columns (two outside-kind lures are just as new). The only strategies above chance are the two the design *wants* to expose: **row only** and **column only** each score exactly **50 %** in Rows and columns — a one-rule child is right half the time and the failing echo shows them which half. In Rows, "copy the neighbour beside" = "row only" = 100 % because that *is* the skill (the row-mates are the answer's twins); "copy the neighbour above/below" scores 11 % / 0 %. In Rows and columns the same bot scores 11 % with 6 cards and 50 % with 4 (that tray holds no copy of the drawer above/below, so the bot falls back on matching size — it becomes the column-only strategy).

## 7. Check, the misses, the success
There is no Check button: the drop *is* the check (each drop counts as one try); the echoes are the verdict.
- **Nothing dropped for 10 s** → the open drawer's two rails glow once, slowly, outward from the drawer (the paths the echoes will take). Bubble: Rows "Look along the row with the open drawer." · Rows and columns "Look along its row, then down its column." (not a miss)
- **Miss 1** → the failing echoes themselves (§5) are the showing, held 1.4 s; the rail that refused glows coral (18 % band, 2 px coral edge across its three drawers), a rail that accepted glows teal. Two small **test lamps** in the bubble column — a row-rail icon and a column-rail icon (drawn geometry, no words) — light teal (passed) or coral (refused). Hints (EN):
  - Rows: **hintRow** "The picture did not find its twins in this row. Which kind lives in this row?"
  - Rows and columns, row refused, column passed: **hintRowOnly** "The frame fits — the size is right. But the row did not find twins."
  - column refused, row passed: **hintColOnly** "The row found its twins — the kind is right. But the frame does not fit this column."
  - both refused: **hintBoth** "Neither the row nor the column took it. Look both ways."
- **Miss 2** (same round) → the stronger showing: when the card returns to the tray, the open drawer's line-mates on the refusing line **step out and stand together**: the two row-mates slide 24 px toward the open drawer and stay there side by side, the two column-mates likewise, for the rest of the try — so the child sees the pair that must agree, touching the gap. The line that already accepted the child's last card keeps its teal rail ("this test you passed — keep it"). Hint: **hintCompare** "Look at the two standing next to the drawer. Which piece matches them?" (Rows) · **hintCompareTwo** "Keep what passed. Look at the two standing next to the drawer." (Rows and columns)
- **Miss 3+** → miss 2's showing again (no answer is ever revealed).
- **A new pick-up** takes the help away: rails and lamps go back to rest, line-mates step back home, until the next drop.
- **Success** → the drawer shuts (*clack*), its knob lights, the earned show (§2) runs: every row's picture-echoes cross and sink in (three rising notes per row), then — Rows and columns only — every column's frames click round every card (three clicks per column). Bubble: Rows **celebrateRows** "Every drawer in the row has its twin!" · Rows and columns **celebrateTwo** "Its row found its twins and its column frames fit!"

## 8. Settings
1. **Rule:** *Rows* / *Rows and columns* — at rest the cabinet visibly changes: every card the same big size vs three card sizes, one per column (and the column rails gain their brass grooves).
2. **Tray:** *Fewer pieces* / *More pieces* — Rows 3 → 4 cards; Rows and columns 4 → 6 cards. The tray visibly holds more cards (and a second tray row on phones).

## 9. Words (EN source; the build authors the other 10 locales by hand, then one native + pedagogy reviewer)
- **title** "The Echo Cabinet" · **instruction** "Drop a piece in the open drawer. Its row and its column will test it."
- **task:** taskRows "Which piece belongs in the open drawer?" · taskTwo "Which piece belongs to its row and to its column?"
- **hints:** hintIdleRows "Look along the row with the open drawer." · hintIdleTwo "Look along its row, then down its column." · hintRow "The picture did not find its twins in this row. Which kind lives in this row?" · hintRowOnly "The frame fits — the size is right. But the row did not find twins." · hintColOnly "The row found its twins — the kind is right. But the frame does not fit this column." · hintBoth "Neither the row nor the column took it. Look both ways." · hintCompare "Look at the two standing next to the drawer. Which piece matches them?" · hintCompareTwo "Keep what passed. Look at the two standing next to the drawer." · hintFree "Try a piece on any drawer. Where do its echoes land?"
- **celebrate:** celebrateRows "Every drawer in the row has its twin!" · celebrateTwo "Its row found its twins and its column frames fit!"
- **aria:** cabinetLabel "cabinet with 9 drawers" · drawerLabel "row {r}, column {c}: {picture}, {size} card" · drawerOpen "row {r}, column {c}: open and empty" · pieceLabel "piece: {picture}, {size} card" · sizeBig "big" · sizeMiddle "middle" · sizeSmall "small" · liveRowYes "The row found twins." · liveRowNo "The row did not find twins." · liveColYes "The frame fits the column." · liveColNo "The frame does not fit the column." · liveShut "The drawer shut." · liveHome "This piece belongs in row {r}, column {c}." (free play) · liveNoHome "This piece does not belong anywhere in this cabinet."
- **settings:** "Rule" — "Rows" / "Rows and columns" · "Tray" — "Fewer pieces" / "More pieces"
- **Locale traps:**
  - *Row / column* in each locale's K classroom words, not the spreadsheet term: de *Reihe / Spalte*, fr *ligne / colonne*, es *fila / columna*, pt *linha / coluna*, it *riga / colonna*, nl *rij / kolom*, sv *rad / kolumn*, da *række / kolonne*, no *rad / kolonne*, fi *vaakarivi / pystyrivi* (Finnish K teachers say "horizontal row / vertical row"; *sarake* is the spreadsheet word) — the reviewer confirms each.
  - *Twin* is a person word in several locales (de *Zwilling*, fr *jumeau*, fi *kaksonen*); where it reads oddly for a picture, the locale author uses "the same picture" (de *das gleiche Bild*, fr *la même image*, fi *sama kuva*) — meaning, not the word, is the source. Gender: fr *image* is feminine, so "la même image".
  - *Kind* (de *Sorte*, fr *sorte*, es/pt/it *tipo*, nl *soort*, sv/no *sort*, da *slags*, fi *laji*) — never *Art/espèce*, which read as biology.
  - Size words are standalone adjectives in their own field ("{picture}, big card" pattern) — Romance/Germanic agreement with *card*: author "{size} card" as one whole phrase per size per locale (de *große Karte / mittlere Karte / kleine Karte*, fr *grande carte / carte moyenne / petite carte*, sv *stort kort / mellanstort kort / litet kort* — neuter *kort*), never `{size}` + noun concatenation.
  - Picture names in aria come from the lcs-pictures labels (`image-vocabulary.js`), singular; lower-cased mid-sentence in every locale except de, where nouns keep their capital. sv/da/no use the indefinite form ("ko", not "kon").
  - Watermelon is a slice; its label stays "watermelon" (the kind, not the shape). fr *ballon* (ball) and *ballon de baudruche* (balloon) are never in one round (C4 vs C8). Toys car and vehicles car share a word — never in one round.
  - Hints never name a picture, so no article/case work inside hints.

## 10. Sound off, access, phones
- **Sound off:** every verdict is motion and geometry — echoes sink vs sit on strangers, frames click flush vs hang loose vs bump against the card, rails glow teal/coral, the drawer shuts or stays out, line-mates step together. Sounds (ticks, clicks, clack, the knob notes) only double it. TTS reads the task line and hints when available (bonus).
- **Keyboard:** §5 path; Tab order: speaker → task → tray cards (arrows) → open drawer → next. Free play: arrow keys move a "test cursor" over drawers, Enter tests the held card there.
- **aria:** cabinet `role="grid"` with nine `gridcell`s labelled drawerLabel; the open drawer is the drop target `role="button"`; every echo outcome is one aria-live sentence (liveRow…/liveCol…/liveShut), so a screen-reader child gets both tests separately.
- **Taps:** tray cards ≥ 68 px (S at 320) inside ≥ 92 px slots; the open drawer target ≥ 92 px. All shell controls ≥ 44 px.
- **Pictures:** S 96 px at 704, S 64 px at 360 and 320 (sizes.js asserts both floors); L/S card ratio 1.44 at 704, 1.47 at 360, 1.32 at 320.
- **Folds:** 360 × 740: 484 / 597 px; 320 × 640: 434 / 532 px — the whole tray is above the fold in every setting.
- **Phone layout:** stacked; bubble overlays the space under the tray; frame-echoes keep their bump/wobble motion so 5–6 px of slack at 320 still reads.

## 11. Distinct from
- **Its own previous design** (the drawer jams and the broken line glows): that was a verdict *about* the lines; here the lines **do the testing** — two different echo objects travel along them, and what they physically do (sink / sit, click / hang / bump) is the verdict.
- **#227 The Shadow Lamp** (a shadow slides onto a wall shadow and coincides or not) and **#229 The Blink Viewer** (flip two pictures in one window): both compare ONE picture against ONE target in place. Here one card sends **two kinds of echo in two directions**, each carrying a different attribute (picture along rows, card-frame along columns), and is tested against four line-mates at once — the matrix structure is the mechanism, not a single overlay.
- **#284 The Crossing Lights** (beams from the column and row headers cross to paint a coordinate): information flows *from headers inward* to locate a cell. Here it flows *from the cell outward* along its lines to test a candidate; there are no headers.
- **#260 The Clue Table** (latch rods shut windows from yes/no clues): deduction from statements, not visual completion.
- **#226 The Bunting Line** (finished units fold under each other to align): a one-dimensional repeat; the cabinet reads two axes.
- **Row 38 museum clasps / Row 40 number post box / #274 sinking inlay / Row 39 letterbox**: a hole or clasp shaped like the answer. The Echo Cabinet never shows the answer's outline — nothing is cut to fit; the echoes are copies of the *child's* card.
- **Tools** (cov/tools.txt): **WODB** (no wrong answer), **Sorting Hoops** (hidden rule, two hoops), **Pattern Bench** (repeating units), **Folding Sheet** (mirror fold) — none is a two-axis table with a missing cell; none tests a candidate by sending copies along its lines.

## 12. Build plan
- **Core model (`logic-cabinet-core.js`):** state `{ rule:'rows'|'two', tray:'few'|'more', pass, order, i, grid:[[{k,s}]] (3×3), gap:{r,c}, tray:[{k,s,role}], misses, free:false, lastEcho:null }`. Pure functions: `belongs(card)` → bool; `echoes(card, at={r,c})` → `{ row:[{to:{r,c}, lands:bool}], col:[{to, lands, fit:'flush'|'loose'|'bump'}] }` (frames: `flush` equal, `loose` card larger than target, `bump` card smaller than target; `col` empty in rule 'rows'); `drop(slot)` → `{shut:bool, echoes}`; `hintFor(echoes, misses, rule)` → string key (hintRow / hintRowOnly / hintColOnly / hintBoth / hintCompare / hintCompareTwo); `home(card)` → `{r,c}|null` (free play: the one drawer where both echoes land); `nextRound()` (order-only reshuffle per pass, never equal to the previous pass's order). Round data = the four tables above, frozen in `logic-cabinet-activities.json`.
- **The gate's own truth (`verify-logic-cabinet-core.js`, its own copy of the cabinets and roles, never reading expectations off the tool):** for every round of all four settings: rows are one noun, columns one size, the three column sizes distinct; exactly one tray card belongs; the tool's `echoes()` agrees with the gate's oracle for **every** tray card at the open drawer (row lands ⇔ same kind; frame fit ⇔ same size; flush/loose/bump correct by size order); two-rule trays hold ≥ 1 right-kind-wrong-size and ≥ 1 right-size-wrong-kind card; the open drawer visits 9/9 positions per pass; answer slot counts ≤ ⌈9/N⌉; answer size L/M/S 3/3/3; all 6 column orders used; strategy bots as tabled (shared-attributes, biggest, smallest, commonest kind/size ≤ chance + 1 round; row-only and column-only ≤ 50 % in two-rule); `home()` returns the matching drawer for RW/WR/WW/N/F cards and null for O cards; `hintFor` returns the right key for every (row, col) outcome × misses ∈ {1,2}; every picture exists in a colour theme and none of the refused pairs share a round; card picture boxes ≥ 96 px at 704 and ≥ 64 px at 360/320; reachability: every authored string key is asked for over the state matrix (recording `t()` proxy).
- **Mutations (`mutate-logic-cabinet.js`, every one must be killed):** (1) `belongs` ignores size · (2) frame fit compares the *picture's* ink box instead of the card · (3) frame `loose`/`bump` swapped · (4) picture-echo lands on any card of the same size (kind ignored) · (5) column echoes sent in rule 'rows' · (6) open drawer stuck in one position · (7) answer always in slot 1 · (8) two-rule tray without RW · (9) a row with two different nouns · (10) S card drawn at 50 % (below the floor) · (11) hintRowOnly and hintColOnly swapped · (12) miss 2 steps the *accepting* line's mates out instead of the refusing line's · (13) reshuffle repeats the previous pass · (14) `home()` returns the open drawer for an outside-kind card · (15) the earned show skips the column frames in two-rule.
- **local-test (`local-test-logic-cabinet.js`):** real pointer drags of every tray card into the open drawer in every round, all four settings, widths 320 · 360 · 412 · 704 · 768 · 1024 · 1366; assert the rendered echo outcome per card (picture-echo opacity/position over each row-mate, frame rect vs card rect within 1 px for flush, ≥ 4 px slack for loose, frame inside card for bump) — rendered, not model; assert the tray order on screen equals the table; screenshots of: a frame bump (small card, big column), a loose frame, a stranger ghost, the earned show mid-flight, free play "no home". `smoke-logic-cabinet-locales` × 11 (fresh browser per locale, full string dump); `visual-qa-activity.js` + `audit-activity-hierarchy.js`; `audit-activity-variety.js` (9 rounds ≥ 7, pass-2 ≠ pass-1).
- **Pictures:** contact sheet already read (`sheet.png`, 34 pictures). Before build: a second sheet of every card at S size (64 px) on cream to confirm the thin pictures (balloon, robot, pineapple, kite) still read — the card, not the ink, carries size, so thinness is fine. **Nothing blocked.**
- **Risks:** (a) frame slack at 320 is 5–6 px — motion carries it; local-test asserts the bump/loose animation states, not only the final rect. (b) 18-echo show must stay ≤ 2.4 s and skippable by any tap. (c) Overlapping picture-echo on a stranger must stay legible: 55 % opacity, and the stranger's own picture keeps 100 % underneath.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — cards that send flying echoes, a frame that bumps against a too-big card, ghosts that land on strangers, a cabinet that checks itself in an eighteen-echo show, and a free-play hunt for every piece's home.
2. **Would a teacher put it on the board?** Yes — the two classic matrix errors (copy the neighbour, use one rule) each get a *different* physical answer from a *different* line, and the class can see which line refused; hints point, never scold; no score.
3. **Would a parent trust it?** Calm wood, brass and cream; library pictures only; nothing hand-drawn; wordless apparatus; works sound-off and on a phone.
4. **The invention:** the dropped card sends its picture along its row and its frame down its column, and only a card whose picture finds twins in the row *and* whose frame fits every card in the column lets the drawer shut.

## 14. Critic review (2026-10-17)
Scores before → after: **invention 4 → 5 · fun 5 → 5 · completeness 5 → 5 · correctness 5 → 5 · distinctness 5 → 5** (reality 5 → 5)

What changed and why:
- **Invention (4 → 5).** The old drawer jammed and *a glow named the broken rule* — a verdict about the lines. Now the lines themselves test the card: two different echo objects (the picture along the row, the card's frame down the column) physically sink or sit, click or hang loose or bump. Each attribute has its own carrier on its own axis, so "row = kind, column = size" is literally how the cabinet works, and the one-rule error produces one accepting line and one refusing line on screen. The frame that cannot get over a bigger card is a genuine surprise, and the earned show (all eighteen echoes landing) proves the whole table.
- **Rows-only is no longer "the worksheet with a click".** The picture-echo makes the row the agent (a nearest-neighbour copy sends two strangers along the row), and free play adds a real second task — find each piece's home, or discover it has none.
- **Measured, not asserted.** `rounds.js` builds every table and runs twelve strategy bots; `poison.js` proves the checker catches nine broken builds with a clean control. A structural tell in the old two-rule tray of 3 was found and removed: with {right, right-row-wrong-size, right-size-wrong-row} the right card is always the only one sharing an attribute with *both* others ("most like the others" bot = 100 %). The new trays (2 kinds × 2 sizes; 3 kinds × 2 sizes) tie that bot at 25 % / 17 %, and the novelty bot ("a card not already in the cabinet") is held to 0 % / 33 % by outside-kind lures.
- **Correctness fixes.** Rule 4 floor now honoured at 704 (the old S picture was 70 px; now 96), and size lives on the card so thin pictures (balloon, robot) are never misread as small. The answer's size is balanced L/M/S 3/3/3 (the first draft was L 1 · M 4 · S 4 and let a "smallest card" bot reach 39 % — caught by the script and fixed).

Honest residue (kept, not hidden):
- In Rows, "copy the drawer beside" is 100 % because it *is* the skill; K-068 is a simple task and the design does not pretend otherwise — the echo and the free-play hunt are what lift it.
- At 320 px the frame slack is only 5–6 px a side; the bump/wobble motion carries the verdict and the local-test asserts the motion states.
- The 6-card tray at 704 needs smaller cells (134 px) to keep the stage at 779 px; the size steps there are L/S 1.32 rather than 1.44.
- The two-rule 4-card tray carries no copy of the drawer above/below (it would re-open the "most like the others" tell); that misconception is exercised by the Rows rule and by the 6-card tray.
