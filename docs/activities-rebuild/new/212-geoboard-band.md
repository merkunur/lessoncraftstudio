# New 212 — The Geoboard Band (K.G.B.5)

## 0. Identity
- id `geoboard-band.play.k-g-b-5` · grade K · CCSS K.G.B.5 · strand Geometry · files `geoboard-band-core.js`, `geoboard-band-activity.js`, `geoboard-band-activity.html`, `geoboard-band-activities.json` (scaffold `--num=212`).
- Worksheet covered: K-372 Draw 2D Shapes on Dot Paper (read the name, join the dots, start from the thick line where there is one) — the dot paper is the pegboard; the thick line is the **starter side**.
- New instrument.

## 1. The pitch
"A rubber band and a pegboard: stretch it peg to peg, close it, and the board reads your shape back to you — its corners, its matching sides, its square corners."

## 2. Why a child will want it again
A geoboard is one of the most loved objects in a kindergarten — and here the band behaves like a real one. Tap a peg and the band hooks round it; tap the next and it stretches, thinning a little, with a soft *twang* whose pitch drops as the side gets longer. Close the loop on the first peg and the band snaps taut, the inside floods with colour like jelly (a wobble), and the board **reads the shape back**: a dot at every real corner, sides of equal length wearing the same colour, a tiny square-corner mark in every right angle. If it is the shape the task asked for, the coloured shape peels off the board like a sticker and flies onto a little shelf above, so the round's shapes collect in a row — a turned square next to a flat one, a tall triangle next to a lying one. Free play is endless: any shape the child makes is read back, so children start inventing ("I made one with 7 corners!").

## 3. The skill and the misconception
- **Skill (K.G.B.5):** model shapes by building them from components — straight sides joined at corners — and name what you built: triangle, square, rectangle (and pentagon, hexagon at the harder setting).
- **Misconceptions and how the board pushes back:**
  1. *A shape is defined by its look* ("a triangle points up", "a turned square is a diamond"). "A different way" rounds refuse a shape **congruent** to one already on the shelf (any turn or flip), so the child must build a triangle that lies on its side, a skinny one, a tilted square. When a tilted square is closed in a square round, the board reads it back — four same-colour sides, four square-corner marks — and accepts it.
  2. *Corners are where the pegs are.* A corner only lights where the band really turns: band through three pegs in a straight line makes ONE side, the middle peg shows a small open ring ("passes straight"), never a corner dot. A child who taps four pegs for a triangle with one in a line sees three dots.
  3. *Leaving shapes open.* The band only becomes a shape when it returns to the first peg; until then it hangs from the last peg with a slack loop, nothing fills, nothing is read.
  4. *Square vs rectangle.* For "square" the board shows side colours: a long rectangle shows two colours (two long, two short) — not a square. For "rectangle" a square is accepted (it is one) — the prose says so.
  5. *Crossing bands.* A band that would cross itself snags: a small knot appears at the crossing and the peg tap is refused — a shape's sides only meet at corners.

## 4. The stage
Layout `split` at ≥ 700 px (board left, readout column right with the bubble); stacked below.

**At 704 px:**
- **The shelf** (above the board, 440 × 70): a wooden ledge; finished shapes sit on it as 56 px stickers, newest on the right, scrolling left after 6.
- **The board** 360 × 360: a teal-grey board with rounded corners and a soft inner shadow; 4 × 4 pegs (spacing 96 px, outer margin 36) or 5 × 5 (spacing 72, margin 36). Pegs are 16 px cream discs with a 2 px ink ring and a darker cap; hit zone 60 px (4 × 4) / 56 px (5 × 5).
- **The band:** a 6 px coral rubber line with a lighter inner highlight; it thins to 4 px on long stretches; colour changes per round (coral, teal, plum, mustard).
- **The starter side** (starter rounds): a thick 10 px band already stretched between two pegs, darker shade, with a small dot on its end peg — "start from the thick line".
- **The readout column** (240 px wide): the task glyph (the asked shape's corner count as N dots inside a little frame; N is the content), and after a close: a **corner chip** (a numeral = corners lit) and a **side chip** (a numeral = sides), plus the bubble.
- Controls under the board: **Undo** (last peg), **Let go** (the band springs off — a twang and it drops away), both 48 px.

**At 360 px:** shelf 336 × 56 (stickers 44 px); board 316 × 316: 4 × 4 spacing 84 px, 5 × 5 spacing 62 px (peg hit zone 56 / 48 px — ≥ 44 everywhere); readout chips sit in a row above the board; bubble under the controls. At 320: board 296, 5 × 5 spacing 58 (hit 48).

All drawn apparatus geometry; no library pictures. Numerals only on the chips; no words on the board.

**Task line** (≤ 24 px): "Make a {shape}." / "Make a {shape} a different way." / "Make a {shape}. Start from the thick band."

## 5. The hand
- **Tap a peg (first):** the band hooks round it (a small loop drawn round the peg, 80 ms) and a short slack curl hangs from it.
- **Tap the next peg:** the band stretches to it in 120 ms (ease-out, a 2 % overshoot and settle), *twang* (pitch ∝ 1/length). If the new side continues an earlier side in a straight line, the previous peg's corner dot turns into a "passes straight" ring.
- **Drag** also works: press a peg and drag the band to another peg; it snaps to the nearest peg within the hit zone on release.
- **Tap the first peg again:** closes — the band snaps taut (100 ms), the inside fills with translucent colour and wobbles (300 ms), then the board reads it back (corner dots pop one by one, 80 ms each, side colours fade in, square-corner marks appear).
- **Refusals:** a peg that would make a crossing side → the band stretches half way, a knot mark flashes at the crossing (400 ms) and the band springs back; a peg already in the band (not the first) → the same knot. Tapping the current peg again does nothing.
- **Undo** removes the last peg (the band slides back); **Let go** clears the band (twang, it hops off the board).
- **Free play:** at any time outside a round's check, any closed band is read back; after success the board stays free for play until "Next".
- Sound (optional): twang, a jelly "blup" on fill, a soft pop as the sticker leaves.

## 6. The rounds
One round = make one asked shape. Many right constructions, one right property: the closed band has the asked number of corners (and for square/rectangle the right angles and lengths), and in "a different way" rounds it is not congruent to any shape already on the shelf for this pass.

**Set "3 shapes", 4 × 4 board** (pegs (0,0)…(3,3)):
| # | ask | kind |
|---|---|---|
| 1 | triangle | starter side (0,3)–(3,3) |
| 2 | square | free |
| 3 | rectangle | free |
| 4 | triangle | a different way |
| 5 | square | a different way |
| 6 | rectangle | starter side (0,0)–(0,2) |
| 7 | triangle | free |
| 8 | rectangle | a different way |
| 9 | square | starter side (1,0)–(2,1) — a TILTED start, so only a turned square fits |

**Set "5 shapes", 5 × 5 board** (pegs (0,0)…(4,4)):
| # | ask | kind |
|---|---|---|
| 1 | triangle | free |
| 2 | pentagon | free |
| 3 | square | free |
| 4 | hexagon | free |
| 5 | rectangle | starter side (1,4)–(4,4) |
| 6 | pentagon | a different way |
| 7 | triangle | starter side (0,0)–(2,4) — a slanted start |
| 8 | hexagon | a different way |
| 9 | square | starter side (2,0)–(4,1) — a tilted (2,1) start |

- The asked shape never repeats twice in a row; ≥ 2 "a different way" rounds per pass (3 in each set); ≥ 2 starter rounds.
- Acceptance: triangle = 3 corners; square = 4 corners, 4 equal sides (squared lengths equal), 4 right angles; rectangle = 4 corners, 4 right angles (a square is accepted); pentagon = 5 corners; hexagon = 6 corners. Concave pentagons/hexagons are accepted (they are pentagons/hexagons); the band must be simple (no crossing).
- Starter rounds: the starter side must be one of the closed shape's sides (or lie along one).
- **Congruence ("a different way"):** a shape is reduced to its canonical form — translate the corner list to the origin and take the lexicographically smallest of the 8 lattice symmetries (4 turns × flip) × every starting corner × both directions; equal canonical forms = the same shape.
- **Answer position:** there is no position to guess — any correct construction anywhere on the board is right. The gate asserts every round is solvable (for "different way" rounds: ≥ 2 non-congruent valid shapes exist on that board, so a second way always exists after the first), and that a starter round's starter side admits ≥ 1 valid completion.
- **Order:** order-only reshuffle per pass via `nextTask`, under the constraint "never the same shape twice in a row" and "a different-way round comes after at least one round of the same shape" (the shuffler re-draws until both hold).

## 7. Check, the misses, the success
Closing the band IS the Check (the board reads the shape back at once).
- **Check with nothing / an open band** (the child presses the Check button without closing) → hint, no miss: "Go back to the first peg to close the band."
- **A closed band in free play or after success is never a miss.** In a round, the close counts as the Check.
- **miss 1** (a closed shape that is not the asked one): the band stays put with its read-back (corner dots, colours, square-corner marks); the corner chip shows the made count next to the task glyph's dots, so "4" stands beside "• • •" · hint: "You made {n} corners. A {shape} has {m}." For square/rectangle failures: "Look at the side colours and the square corners." For a congruent repeat: the matching sticker on the shelf lifts and glows · "That one is already on the shelf. Turn it, stretch it, or make it a new size."
- **miss 2** (never a suggested shape — that would build it for the child): the task glyph's dots grow to 14 px and each one pops in turn with a tick (a count of the corners to make), and every corner dot of the made shape that is one too many or one too few shows a hollow ring beside the chip; for square, a faint 1 × 1 square-step grid appears on the board so equal steps are visible · hint: "Use {m} pegs that are not in a line." (square: "Count the steps along each side — all four the same.")
- **A congruent repeat never counts as a miss** — only a wrong shape does.
- A new peg takes the help away until the next close.
- **Success:** the band twangs one high note, the fill turns solid, the shape peels off the board (a 300 ms lift with a curl at one corner) and flies onto the shelf; the corner chip and side chip ring their numerals. Bubble: "A {shape}! {m} sides and {m} corners." (square: "A square! 4 sides, all the same length, and 4 square corners." rectangle: "A rectangle! 4 sides and 4 square corners.")

## 8. Settings
1. **Shapes:** triangle · square · rectangle / + pentagon · hexagon — the "+" set switches the board to 5 × 5 at once (pentagon and hexagon need the room); visible at rest (16 → 25 pegs).
2. **Board** (only in the 3-shapes set): 4 × 4 / 5 × 5 — more room makes "a different way" easier to find and invites bigger shapes. ⚠ In the 5-shapes set the Board control is HIDDEN, not shown disabled or left live: a live control that changes nothing is a dead setting (`audit-settings-efficacy.js`). Starter coordinates are lattice coordinates from the top-left peg, so every 4 × 4 starter is also valid on 5 × 5 (the gate re-checks solvability on both boards).

## 9. Words (EN source)
- title "The Geoboard Band" · instruction "Stretch the band from peg to peg to make the shape. Go back to the first peg to close it."
- prompts (full sentence per shape per locale, never assembled): "Make a triangle." · "Make a square." · "Make a rectangle." · "Make a pentagon." · "Make a hexagon." · "Make a {shape} a different way." · "Make a {shape}. Start from the thick band."
- hints: hintClose "Go back to the first peg to close the band." · hintCorners "You made {n} corners. A {shape} has {m}." · hintSquareParts "Look at the side colours and the square corners." · hintSame "That one is already on the shelf. Turn it, stretch it, or make it a new size." · hintMore "Use {m} pegs that are not in a line." · hintSquareSteps "Count the steps along each side — all four the same." · hintStarter "Start from the thick band."
- celebrations: "A triangle! 3 sides and 3 corners." · "A square! 4 sides, all the same length, and 4 square corners." · "A rectangle! 4 sides and 4 square corners." · "A pentagon! 5 sides and 5 corners." · "A hexagon! 6 sides and 6 corners."
- settings: setShapes "Shapes" · shapes3 "Triangle, square, rectangle" · shapes5 "Add pentagon and hexagon" · setBoard "Board" · board4 "4 by 4 pegs" · board5 "5 by 5 pegs" · undo "Undo" · letGo "Let go".
- aria: peg "Peg, row {r}, column {c}" (+ ", in the band"), band "Band with {k} pegs", chips "{n} corners", "{n} sides".
- **Locale traps:** articles/gender in "Make a …" — de "Mach ein Dreieck / ein Quadrat / ein Rechteck / ein Fünfeck / ein Sechseck" (all neuter, but the sentence per shape is stored whole anyway); fr "Fais un triangle / un carré / un rectangle / un pentagone / un hexagone"; es "Haz un triángulo / un cuadrado …"; it "Fai un triangolo / un quadrato / un rettangolo / un pentagono / un esagono"; pt "Faça um triângulo …"; nl "Maak een driehoek / een vierkant"; sv "Gör en triangel / en kvadrat / en rektangel / en femhörning / en sexhörning"; da "Lav en trekant / et kvadrat / et rektangel" (never *firkant* for square — *firkant* is any four-sided shape); no "Lag en trekant / et kvadrat / et rektangel / en femkant / en sekskant"; fi "Tee kolmio / neliö / suorakulmio / viisikulmio / kuusikulmio" (no article; partitive after numerals: "3 sivua ja 3 kulmaa"). The word "corner": de *Ecke*, fr *sommet* is the school term but K uses *coin* — reviewer decides per locale; fi *kulma*. "Square corner": de *rechte Ecke*, fr *angle droit*, sv *rät vinkel*, fi *suora kulma*. "Rubber band" in the title/prose: de *Gummiband*, fr *élastique*, es *goma elástica* (es-ES) / *liga* — the es catalogue is neutral: *elástico*; pt-BR *elástico*; it *elastico*; nl *elastiekje*; sv *gummiband*; da *elastik*; no *strikk*; fi *kuminauha*. The geoboard itself: de *Geobrett*, fr *géoplan*, es *geoplano*, it *geopiano*, pt *geoplano*, nl *geobord*, sv *geobräde*, da/no *geobræt / geobrett*, fi *geolauta*.

## 10. Sound off, access, phones
- Legible with sound off: band, fill, corner dots, side colours, square-corner marks, knot mark and chips are all visual.
- Keyboard: arrow keys move a peg cursor (a ring), Enter adds that peg to the band, Backspace = Undo, Esc = Let go; reaching the first peg and pressing Enter closes.
- Colour is never the only signal for equal sides: equal sides also carry the same number of tick marks (1, 2) — the classic geometry convention — for colour-blind children.
- Taps: peg hit zones ≥ 48 px at 360 and 320 (5 × 5), 56 px (4 × 4); controls 48 px.
- Check above the fold: at 360, header 56 + task 52 + chips 40 + shelf 56 + board 316 + controls 56 → 576 px (fold 740); at 320 × 640: board 296 → 556 px.

## 11. Distinct from
- Row 40 The Number Post Box (same batch) analyses given shapes; this one builds them.
- Tool `shape-stretcher` (one shape on a pane with two attribute tags, dragging corners) — it transforms a given shape; here the child makes a shape from nothing, and the board's read-back and the "different way" shelf are new. Tool `folding-sheet` and `build-plan` are unrelated.
- No registry mechanic reused.

## 12. Build plan
- **Core state** `{set, board:4|5, roundIdx, band:[peg…], closed, starter:[p,q]|null, shelf:[canonicalForm…], help}`. Functions: `addPeg(p)` → ok | 'cross' | 'used'; `segmentsCross(a,b,c,d)` (proper intersection or overlap); `corners(band)` (drop collinear vertices: cross product 0); `readBack(band)` → `{corners, sides, lengthsSq[], rightAngles[], equalGroups}`; `classify(readBack)` → triangle|square|rectangle|pentagon|hexagon|other; `canonical(corners)`; `accept(round, band)`; `close()`; `undo()`; `letGo()`; `helpLevel`, `hintKey`, `layout(width)`.
- **Gate's own truth (verify):** an independent enumerator lists every simple lattice polygon with 3–6 corners on 4 × 4 and 5 × 5 (bounded) and classifies it by its own routine; assert: (a) every round's ask has ≥ 1 solution, every different-way round ≥ 2 congruence classes, every starter round ≥ 1 completion through its starter; (b) collinear pegs never count as corners; (c) the tilted square (1,0)(2,1)(1,2)(0,1) is a square; a 3 × 1 rectangle is not a square; a square is a rectangle; (d) canonical form is invariant under all 8 symmetries and all start points / directions, and differs for a 1 × 2 and a 1 × 3 rectangle; (e) crossing bands are refused; (f) peg hit zone ≥ 44 px at 320/360 for 5 × 5; (g) no round repeats the previous shape.
- **Mutations:** Board control live in the 5-shapes set · a 4 × 4 starter round unsolvable on 5 × 5 · collinear peg counted as a corner · open band accepted · rectangle accepted as square · square refused as rectangle · tilted square refused · congruent repeat accepted in a different-way round · reflection not treated as congruent · crossing band allowed · starter side ignored · help kept after a new peg · congruent repeat counted as a miss · 5-shapes set left on a 4 × 4 board.
- **Pictures:** none.
- **Risks:** the enumerator for 5 × 5 hexagons is large but bounded (C(25,6) subsets × orderings is too many — enumerate by search with pruning; only used in the gate, not the runtime). Not blocked.

## 13. The four questions
1. **Would a child choose it again?** Yes — a rubber band that twangs, a shape that fills like jelly and peels off as a sticker, and free play that reads back anything they invent.
2. **Would a teacher put it on the board?** Yes — shapes are built from sides and corners; the read-back makes attributes visible (corners only at real turns, equal sides, square corners); "a different way" kills "a triangle points up"; a turned square is accepted because it IS a square.
3. **Would a parent trust it?** A classic classroom manipulative, drawn cleanly, no score, no timer, no words on the board.
4. **The invention:** a geoboard that reads your shape back — corners only where the band turns, matching sides in matching colours — and a shelf that refuses the same shape twice.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 5→5 · reality 5→5
What changed:
- Verified the round tables by hand. Every tilted starter has a valid completion on its board: (1,0)–(2,1) gives the square (1,0)(2,1)(1,2)(0,1) on 4 × 4, and (2,0)–(4,1) gives (2,0)(4,1)(3,3)(1,2) on 5 × 5. Every "a different way" ask has ≥ 2 congruence classes. A square is accepted as a rectangle, which is true, and the miss for a congruent repeat costs nothing. No change was needed.
- The Board setting is now HIDDEN in the 5-shapes set; before, it would have been a dead control there. Starter coordinates are anchored to the top-left peg, so 4 × 4 rounds stay solvable on 5 × 5. Two mutations were added.
- Made explicit that a close in free play is never a miss.
- Distinct from Row 40 in the same batch: the Post Box ANALYSES given shapes stick-to-side, while the Band BUILDS them peg to peg. They share the square-corner mark only as geometry notation, not as a mechanic.
