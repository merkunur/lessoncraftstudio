# K-368 `2d-shapes`: editor-critic record (2026-09-23)

Inputs: `K-368-pedagogy.md`, `K-368-design-A.md` (lens + tag cards), `K-368-design-B.md` (the "shape picture": robot / rocket / house with leader callouts). Output: `../K-368-2d-shapes.md`. Measurements by read-only node in the session scratchpad (`K-368-measure.js`: Baloo 2 / Nunito woff2 from `assets/fonts/fonts.css` over `file://`, `document.fonts.check` true for both; `K-368-geo.js`, `K-368-geo2.js`: caliper widths and lattice completions) and by opening pictures (`K-368-f2-objects.png`, `K-368-f2-more.png`, contact sheets built with sharp from `cache/themes`). No em-dashes.

## Concept ruling (per face)

| face | taken from | why |
|---|---|---|
| base | **A** (lens + 3 tags, 2 x 3) | The base must be the cleanest single-answer instance of the bare head "name the shape". A's axis-free lens encodes K.G.A.2 in the apparatus; every item is one isolated exact figure, so the referent of every answer is unambiguous. B's shape picture loses on four counts: (1) **Boundary**: a picture composed of flat shapes is the tangram / de "Formen legen" genre (K-353 owns composing a picture from shapes; the Germanic panel named "Formen legen" as tangram's head) and a centred figure with leader lines to callouts is K-354's visual signature; (2) **referent ambiguity**: the robot's body ring sits in a 28 px strip beside a 45 degree square button and the head ring would sit between the decorative eyes; a five-year-old can read the ring as pointing at the button, and no gate sees that; (3) **prototypes dominate**: 4 of B's 6 valid d2 sets point the axis-aligned head, body and a leg; only the button (45) and one arm (30) are turned; (4) **buildability**: a leader overlay, a ring-point search and a crossing re-selector against a `cardGrid`. B's creativity is recorded; the shape picture is not a face in this family (it would be a compose move). |
| F1 | **A** (named lanes of 4 lenses d 132) | B's 108 px square tiles reintroduce the axis frame on the one face where a turned square competes with a rhombus near-miss; A's figures are larger (lens 132 vs tile 108). A's teal given-pill as the row head (read, not circled) keeps the family grammar. |
| F2 | **merge**: per-card choice (both A and B, against the pedagogy's bins) + A's "colour the shape" verb + A's object bank + editor floors | Both designers independently rejected 8 lines into 2 bins (crossing lines over pictures at K, ungradable). Colour (A) over circle (B): the base already owns circling a tag, and colouring avoids the en "circle the circle" and de "Kreise den Kreis" echo that B itself flagged. |
| F3 | **A** (bank + full-width lanes, 547 px writing row) | B re-used the shape picture (rocket) with numbered discs and a 287 px writing column; rejected with the base concept (same inset-part ambiguity: the rocket's windows sit inside its body) and because a G1 child writing `suorakulmio` needs the width. |
| F4 | **merge**: A's tealSoft bubble + "?" disc + B's 44 px G1 targets + editor's measured 3-line budget | A's 36 px tags were under the G1 44 px floor; B's 44 px chips fixed that. Stack re-derived at 677 (182 <= 188.3). |
| F5 | **A** (triangle free, square free, square on (1,2), rectangle on its long side (2,4)) | Measured: the (2,4) side admits no square completion on a 6 x 6 lattice, so the rectangle card cannot be finished as a square. B's recipe (square, rectangle, triangle, triangle; givens on the square and a triangle) repeats the pedagogy's two-triangle duplication and gives a triangle a slanted side, which constrains nothing (any third point finishes a triangle). |

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base: figure over a vertical chip stack, 3 x 2 grid | A: lens left + tags right, 2 x 3; B: one shape picture with 6 callouts | A | concept table above; the brief's Boundary-first rule and single-answer-by-construction |
| 2 | "sizes vary >= 1.8x" AND "K figure long side 104-128" | A: they cannot both hold (128/104 = 1.23); use area ratio >= 2.0 | size spread measured as circumradius ratio R_max / R_min >= 1.375 (one R <= 48, one >= 66); the pedagogy's 1.8x linear is impossible inside a 156 lens under the floors (R >= 36 for a 72 px extent) | measured buildability > preference; area across different kinds is not comparable, R is |
| 3 | "chord >= 25 % of diameter" | A: 66 % chord, sagitta 0.25 R; B: chord 0.5 d | A | (m) a 25 % chord has a 3.2 % sagitta = 1.9 px at R 60, invisible; B's 0.5 d chord gives 0.134 R = 5.9 px at R 44, marginal |
| 4 | F5 d2 kinds [square, rectangle, triangle, triangle], givenSide 2 | A: triangle free, square free, square (1,2), rectangle (2,4) | A | (m) lattice completions; two free triangles are the same item twice |
| 5 | F2 "draw a line to its shape" into 2 bins | A: colour the glyph; B: circle the chip | per-card tiles, colour | both designs; verb echo; the base owns circling |
| 6 | F2 bank keeps `classroom/notebook` | A: drop it (rounded page corner, 3D), add `classroom/tablet`; B keeps notebook | drop notebook, add tablet | editor OPENED both: notebook shows thickness, a rounded top corner and coloured index tabs, contradicting F1's rounded-corner near-miss; tablet is a flat, slightly turned rectangle with small outer corner radius (*est.* ~5 % of the short side, far below F1's 25 %) |
| 7 | base tags / chips (pedagogy "chips", A 132 x 40, B 150 x 36) | | 132 x **48** at K | K ring target raised to the 48 px `pillChoice` K precedent; the figure itself carries the 56 px element floor (max extent >= 72) |
| 8 | F4 A tags 132 x 36 | B chips 44 | 44 | G1 element floor 44 (brief) |
| 9 | F1 "row label is a name pill only" | A given-pill above the lens row; B a tealSoft tab left | A | lens width; family grammar (teal = read) |
| 10 | skinny floor "short >= 30" per bbox | A: K long >= 80, short >= 30 per bbox; B: per part bbox | floors on the ROTATION-INVARIANT minimum caliper width (>= 30) and maximum extent (>= 72 K / >= 45 G1), with per-kind minimum R exported by the primitive | (m) a bbox floor changes with rotation; A's obtuse triangle (2.9,1) has minWidth 0.425 R, needing R >= 70.5 > the lens maximum 69: it could never meet a 30 px floor; re-shaped to (2.7,1.4) (minWidth 0.607 R, 116.6 deg). A's skinny triangle needs R >= 54.1 (at A's R 44 it is 24.4 px wide) |
| 11 | F3 d2 `skinny:1` | A: aspect 2.0 max so the short side stays >= 31 | F3 carries `turnedMin:2` + one elongated rectangle (aspect 2.0), NOT "skinny" | aspect 2.0 is below the 2.2 skinny threshold; the >= 1 skinny rule binds the RECOGNITION faces (base, F1); F3 is production |
| 12 | F3 lane: A inline padding 6 x 12, row h 78 | | padding 4 x 12, row h 70, lens 78 | (m) at 677 A's 78 + ~6 wrapper = 84 > 78.7 inner; mine 76 <= 86.7 |
| 13 | F3 d2 bank "core4 (+hexagon if inventory.hexagon)" | A: each answer name once | 4 core names, no hexagon at d2 | hexagon is d3-only everywhere; a d2 bank word no card uses is an unmotivated distractor on a spelling-support box |
| 14 | F2 pictures read via `b3-picture-index` | both | pinned `{theme, noun}` rendered with `fileUri(theme, noun)`; `pictureFor` banned | (m) `pictureFor` rng-picks among themes: `clock` -> 2 candidates incl. the 3D `around the house/clock` both A and the pedagogy rejected; `cookie` -> 4 (incl. christmas); `plate` -> 2 (unopened kitchen tools/plate) |
| 15 | turnedSquare dispute: "that card becomes d3-only for that locale, a data flag" (pedagogy, A) | | never a per-locale page variant; if a panel objects, the card becomes a 30 degree square in ALL locales (OPEN 2) | the seed is locale-neutral (brief); a per-locale geometry change silently forks the deck |
| 16 | base title "2D Shapes: Name the Shape" (pedagogy) | | base = the bare compound head, except de "Geometrische Formen benennen" | brief: the base owns the bare genre head; (m) the live de geometry K landing title already leads with "Geometrische Formen", so de adds the naming verb |
| 17 | fr type head "Les figures planes" | | type name `Figures planes`, K titles register left to the panel | fr maternelle says "formes" / "rond"; "figures planes" is the CE1 term; the fr geometry landing "Formes géométriques – exercices" holds the formes head (m) |
| 18 | F1 CCSS 1.G.A.1 + K.G.A.2; F3 K.G.A.2 on a G1 page | | kept, F3 prose says it reviews the kindergarten naming standard | honest: no G1 code covers writing a shape name; claiming 1.G.A.1 for F3 would be false |

## 2 Claims removed or downgraded as unverified

- Germanic panel: "no existing landing TITLE uses the search head" is FALSE for de (m: `formen-vorschule-seiten-ecken` "Geometrische Formen – Arbeitsblätter Kindergarten"); fr ("Formes géométriques – exercices") and sv ("Arbetsblad geometri förskola – former, sidor & hörn") are adjacent. Added to the non-cannibalisation table.
- Substrate: "shapes 21/19 (circle square triangle hexagon ... ; no rectangle)" is incomplete: `shapes/rectangle@3x.webp` exists and every core name has a vocab singular x11 (m). Irrelevant to the render (no library shape art is used) but the names are read from the vocab for the validator.
- Pedagogy F2: `classroom/notebook` "slight tilt; aspect ~0.72" as a clean rectangle: downgraded after opening (3D, rounded corner, tabs).
- A: tag text widths "*est.* 11 x ~9.4 = 104": replaced by the measured 101.3 px (fi `suorakulmio`, Baloo 2 700 18 px, shell fonts, m).
- A: "riddle ~39 chars/line at 16 px in 278 px": measured 7.48-7.65 px/char (m) -> ~36-37 chars per 282 px; the 3-line reserve holds at the 90-char cap only with a render-level line check, now in the gate.
- A and B: obtuse / skinny triangles "meet the floors" at the lens minimum: false (m, contradiction 10).
- B: every figure / gap number of the robot, rocket and house was measured by B's own scratch scripts; not re-measured by the editor because the concept is not adopted.
- `picture_frame` as an F2 rectangle (editor candidate): removed, no vocab key (m).

## 3 Numbers re-measured (which won)

| quantity | pedagogy | A | B | measured (editor) | won |
|---|---|---|---|---|---|
| widest name, Baloo 2 700 18 px | *est.* | ~104 *est.* | ~103 *est.* | fi `suorakulmio` **101.3**; `kuusikulmio` 99.0; sv `sexhörning` 91.2; es `rectángulo` 88.2 | measured; A's 132 tag (inner 112) holds |
| Nunito 800 16 px per char | | ~7.1 | | 7.48 (fi) / 7.58 (en) / 7.65 (de) | measured |
| skinny triangle min caliper / R | | | | 0.554 (R >= 54.1 for 30 px) | measured |
| A obtuse (2.9,1) min caliper / R | | | | 0.425 (R >= 70.5: impossible) -> re-shaped (2.7,1.4): 0.607 | editor |
| rect 2.6 / 2.2 / 2.0 min caliper / R | | | | 0.718 / 0.828 / 0.894 | measured |
| lattice (2,4): square completion | | none fits | | none; rectangle (2,-1) fits at start (0,1) or (2,0) | A (confirmed) |
| lattice (1,2): square completion | | fits | fits | fits at (0,1) / (2,0) | confirmed |
| base card inner at 722 / 677 | | 302.5 x 203.3 / 188.3 | | same (card-grid gap 14, card border 2 + padding 12, m) | A |
| F1 stack | | 648 | 444 (B tiles) | 648 <= 677 | A |
| F2 card inner at 677 | | 130.8 | 131 | 130.75; tiles 2 x 56 + 10 = 122 | editor (tiles raised to 56) |
| F3 lane inner at 677 | | 78.7 (padding 6) | | 86.7 (padding 4); row 70 + 6 | editor |
| F4 stack at 677 | | 192 (4-line) / 172 | 191 | 80 + 8 + 94 = 182 <= 188.3 | editor |
| F5 card inner at 677 | | 303 | 303 | 303.5; 294 used | A |
| chord sagitta (25 % chord) | 25 % | | | 3.2 % of R: invisible | A |
| picture candidates per vocab key | | | | clock 2, plate 2, cookie 4, the rest 1 | editor (pin the file) |

## 4 OPEN items

1. The engineer measures in `render/one.js`: F2 tile name at 16 px in 156 px beside a 56 px glyph (scaled estimate 90.0 px for `suorakulmio`); F4 3-line bubble with a 90-char de / fi riddle; F3 `rulingBlock` wrapper height at h 70 (substrate says ~6); tablet corner radius vs the gate's rounded-corner threshold (the gate never classifies pictures, so this is a human check).
2. Native panels: whether any locale's teachers dispute the 45 degree square at K as a "rhombus" (Raute / losange / ruit / rombo). If yes, the ruling is global (a 30 degree square in all 11), never per-locale.
3. Native panels: fr K `rond` vs `cercle` (an `overrides.circle` with a reason); pt EI vs fundamental register for the K titles; nl "vlakke figuren" vs "vormen" per band; `inventory.hexagon` per locale (d3 only, no row depends on it).
4. Native panels: the lollipop (a circle on a stick) as a circle object; drop costs 0 rows (4 circles remain).
5. `picture_frame` would give F2 a fifth clean rectangle and real d2 variety on the rectangle side (today d2 shows all four rectangles every time); needs an operator-approved vocab entry (§10.3), not this design.

## 5 Quality verdict

I would print the base and F1 for my kindergarten and first-grade classes without hesitation: six big, exact, turned shapes on plain discs, three names to circle, and a row of "real or not?" figures where the rounded, gapped and bulging impostors are drawn large enough that a child can SEE why they fail. That is the Clements-Sarama misconception set done properly, and it is something the free pages my colleagues download do not do (their triangles all point up). F2 is honest because it refuses the square and triangle bins no real picture could fill, and F5's slanted rectangle side that cannot be finished as a square is the kind of detail a maths coordinator notices. What would embarrass me: a K child who cannot yet read facing three written names on the base (the teacher must read the tags aloud; the landing should say so), a lollipop a child calls "a stick", and a German landing that looks like our own geometry page on the results page if the panel drops "benennen". I rejected Designer B's robot with some regret: it is the more charming page, but charm on a naming sheet must not come at the price of a ring whose target a five-year-old can misread, and a picture built from shapes is what our tangram pages already sell.
