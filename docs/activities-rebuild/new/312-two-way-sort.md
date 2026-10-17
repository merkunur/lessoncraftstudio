# New 312 — The Crossroads Sort: THE LASSO HOOPS (READINESS · two-attribute sorting)

## 0. Identity
- id `two-way-sort.play.two-attribute-sorting` · grade 3 · READINESS two-attribute sorting (framework via `frontend/lib/frameworks.ts`, logic & visual thinking) · strand Logic & Visual Thinking · key `two-way-sort` → `mini tools/two-way-sort-core.js`, `two-way-sort-activity.js`, `two-way-sort-activity.html`, `two-way-sort-activities.json`. 0 lines to `lcs-shell.*` or shared cores.
- worksheets it covers: **G3-353 "Two-Circle Sort"** ("Left circle: this kind. Right circle: BIG ones. Middle: both! Draw a line from each picture to its place") — the kind + size setting is exactly that sheet: one kind on the left, size on the right, the same picture at two sizes, every region filled.
- new instrument. New metadata ×11 at build. Working title kept: "The Crossroads Sort".

## 1. The pitch
"Two rope hoops, each with its own rule: put every picture where you think it goes, then the ropes tighten — a rope bends out to lasso a picture that belongs inside it, and pinches in to push out one that doesn't."

## 2. Why a child will want it again
- **Ropes that move by themselves.** Each hoop is a thick braided rope lying on a green mat (teal rope on the left, coral rope on the right), knotted to a wooden post that holds its rule. On Check both ropes *creak* tight at once. If something is in the wrong place the rope visibly reaches for it: a loop bulges out across the mat and curls round a picture it wants, or a rope pinches inward around a picture that does not belong and nudges it out. It looks alive — children laugh at a rope stretching out to grab a big dinosaur that was "forgotten" outside.
- **The lasso twirl.** When every picture is right, both ropes lift a few pixels, spin their braid pattern once round the circle (a lasso twirl), and drop with a soft *thwap*; the pictures in the middle bounce twice — they were caught by both ropes.
- **One picture at a time from the basket**, like dealing cards: the next picture pops up out of the basket mouth with a little hop. Children like guessing what comes next.
- **Free play:** after a round, the ropes stay tight and the child can drag any picture across them and watch the ropes reshape around it live (ropes follow their true members) — a sandbox for "what happens if I put the big lion outside?".
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** classify objects by two attributes at once in a two-circle diagram: left only (has the first, not the second), right only, BOTH (the overlap), and NEITHER (outside both circles).
- **Misconceptions and how the material pushes back:**
  1. *Seeing one attribute only* — a big pig put in "pigs" (left only). The coral "big" rope bulges across into the left crescent and wraps the pig: it is a member of the big rope too. The only place inside both ropes is the overlap.
  2. *The overlap means "neither"* — a small cow put in the middle. Both ropes pinch in around it from both sides and push it out to the mat: neither rope wants it.
  3. *Outside means "I don't know"* — a big cow left outside. The coral rope reaches out of its circle to lasso it: it has the big rule, so it belongs inside the big rope (right only).
  4. *The kind + kind traps* (setting 2): a penguin and an ostrich are animals that cannot fly (left only); a bat is an animal that flies (overlap); a kite and an airplane fly but are not animals (right only). The ropes treat each by its rules, not by "birds go in the middle".

## 4. The stage
Stacked at every width (the hoops need the full width).

**At 704.**
- **Task line** (20 px, ≤ 2 lines): "Put each picture where it belongs. Then press Check."
- **Rule row** (672 × 170): left post (teal, 150 × 160) — a wooden post with a teal sign holding the rule; centre basket (drawn wicker-pattern rectangle 180 × 150) whose mouth holds the next picture; right post (coral, 150 × 160).
  - kind + size: left sign = the round's kind picture at 112 px (e.g. farm-animals/pig) in a teal frame — "this kind"; right sign = a drawn size glyph: the two picture frames of this activity drawn to scale side by side, the small one outlined, the big one filled coral (at 704: 48 and 66 px, i.e. the 96 : 132 ratio halved) — "big ones". The basket mouth holds the same two frames as dashed cradles; the dealt picture always sits in the cradle of its own size, so "big" is read against a fixed reference, never against whatever happens to be on the mat.
  - kind + kind: left sign = the word for "animals" (the rule word is content) + forest-creatures/fox at 96 px (fox appears in no round); right sign = the word for "can fly" + a drawn glyph of two curved wing strokes over a short upward arrow.
- **The mat** (672 × 584): two rope circles r = 224 px (rope 8 px), centres 198 px apart → hoops 646 × 448, lens 250 wide; under them a 120 px outside band (plus the four corners). Regions: left crescent, overlap lens, right crescent, outside. **Every placed picture lies WHOLLY inside its region** (a picture spilling across a rope is unreadable in a Venn diagram): slots are packed by the gate (a square of the picture's size, 8 px clear of every rope, 6 px apart) — at these sizes the lens holds 2 big or 3 small, each crescent 2 big or 3 small, the band 6 small. Measured in `work-c37/venn.js` (the designer's 190/220 circles put a 140 px picture across both crescents: the lens is 37 px wide 70 px above its centre). Reference slot centres (px from the midpoint between the circle centres, y down): lens 2 × big (−3,−69) (1,71); lens 3–4 × small (−1,−107) (−61,−3) (43,−3) (−9,101); left crescent 2 × big (−199,−69) (−199,71); left 3 × small (−165,−135) (−249,−31) (−229,73); the right crescent mirrors (x → −x).
- **Picture sizes:** kind + size — small = 96 px, big = 132 px (same drawing, scale only; ratio 1.375 at every width); kind + kind — all 96 px.
- **Bubble** (below the mat, 672 × 60): the feedback sentence. No mascot — the ropes do the talking.
- **Check** button (shell), right of the bubble.

**At 360.**
- Rule row 328 × 96: posts 92 × 92 (kind picture at 66 px — ≥ 64 ✓), basket 120 × 92 with the dealt picture in its cradle; directly under it the bubble + Check bar (328 × 52), so Check sits at y ≈ 245 — above every fold — and the mat runs below it.
- **Mat turned upright:** circles r = 154 (rope 6 px), centres stacked 136 px apart vertically (top circle = left rule, teal; bottom = right rule, coral) → hoops 320 × 444, lens 172 tall; outside = a 72 px band under the hoops. Mat 328 × 524, ending at y ≈ 770 at 360 × 740: the outside band's top half is above the fold; the page scrolls a little at 320 × 640 (Check is never below the fold because it sits above the mat). Packed capacity (same rule): lens 2 big or 4 small, each crescent 2 big or 3 small, band 4 small.
- Sizes: small 64 px, big 88 px (1.375); kind + kind all 64 px. (The designer's 128/150 circles could not hold two 96 px pictures side by side in a lens that is 19 px tall 96 px from its centre.)
- At 320 × 640 (content 288 wide): r = 139 / d = 124, big 80 / small 60 — the only width where the pictures go under 64 px, because two big pictures must still fit the lens (packed: lens 2 big / 3 small, crescents 2 big / 3 small); Check at ≈ 235.

**Pictures (all verified in `mini tools/pictures/*.json`, labels present in all 11 locales):** farm-animals/pig, cow, sheep · fruits/apple, banana, strawberry, lemon, pineapple · at-the-supermarket/pear (the green pear — fruits/pear has a red blush) · vehicles/car, bus, tractor, truck, bicycle, helicopter, airplane, jet · zoo-animals/lion, zebra, panda, elephant, kangaroo, giraffe · toys/ball, robot, dinosaur, boat, kite, blocks · pets/dog, cat, rabbit, tortoise · space/rocket · things-that-fly/eagle, owl, parrot, flamingo, bat, butterfly, pigeon, swan, hummingbird, toucan, kite · winter/penguin · birds/ostrich · ocean-life/crab · furniture/chair · forest-creatures/fox (sign only). Refused: every duck picture (drawn as ducklings that do not fly), things-that-fly/beetle (reads as a ladybug), birds-2/puffin (reads as a penguin), things-that-fly/balloon everywhere (it is a red PARTY balloon on a string — whether it "can fly" is arguable, so it would make a two-right-answer picture; it is also fr *Ballon* like toys/ball). There is no hot-air balloon or paper plane in the index (both cache-only).

## 5. The hand
- **Deal:** the next picture hops up in the basket mouth (150 ms). The waiting ones show only as drawn dots under the basket (one dot each — tokens, not shrunken pictures).
- **Drag a picture** onto the mat: it follows the finger; the region under it gets a faint fill (teal / coral / both / mat-grey) within 50 ms; drop → snaps to the nearest free slot of that region (120 ms), soft *pat*. The next picture deals.
- **Move a placed picture:** drag it anywhere else (or back to the basket mouth to return it to the deck).
- **Check:** both ropes tighten (400 ms creak). Then the physics in §7.
- **Keyboard:** Tab focuses the dealt picture; keys 1 (left only), 2 (both), 3 (right only), 4 (outside) place it; Tab through placed pictures, same keys move them.
- **Free play after success:** drag any picture; ropes reshape live to wrap their true members.

## 6. The rounds
One round = one deck of 6–8 pictures dealt one at a time, every region non-empty, overlap ≥ 1 and outside ≥ 1. Counts per region vary from round to round, so "the middle must have two" is never a strategy.

**Setting "kind + size" (9 rounds; O = kind & big → both · A = kind & small → left only · B = other & big → right only · N = other & small → outside):**

| # | kind (left sign) | both (big kind) | left only (small kind) | right only (big others) | outside (small others) |
|---|---|---|---|---|---|
| 1 | pig | pig, pig | pig, pig | cow, sheep | sheep |
| 2 | apple | apple | apple, apple | banana | pear, banana |
| 3 | car | car, car | car | bus, tractor | tractor, bus, bus |
| 4 | lion | lion | lion | zebra, panda | zebra, panda |
| 5 | ball | ball, ball | ball, ball | robot | robot, rocket |
| 6 | strawberry | strawberry | strawberry ×3 | lemon, pineapple | lemon, pineapple |
| 7 | dog | dog, dog | dog | cat | cat, rabbit |
| 8 | truck | truck | truck, truck | bicycle, helicopter | bicycle, helicopter |
| 9 | dinosaur | dinosaur, dinosaur | dinosaur, dinosaur | boat, kite | boat, kite |

Totals (measured, `work-37/lasso.js`): both 14 · left only 16 · right only 15 · outside 18 (63 pictures). The SAME drawing appears big and small in every round (scale transform only), and most "other" kinds appear at both sizes in their round (cow, pear, rocket and rabbit appear at one size only), so the picture never tells its region — only its kind AND its size do.

**Setting "kind + kind" (animals · can fly; 9 rounds; both = animals that fly · left only = animals that cannot fly · right only = flying things that are not animals · outside = neither):**

| # | both | left only | right only | outside |
|---|---|---|---|---|
| 1 | eagle, owl | penguin, cow | airplane, kite | ball |
| 2 | bat | elephant, ostrich | helicopter | car, apple |
| 3 | parrot, flamingo | kangaroo | jet, rocket, helicopter | chair, bus |
| 4 | butterfly | tortoise | airplane, kite | blocks, banana |
| 5 | pigeon, swan, hummingbird | crab | helicopter | ball, car |
| 6 | toucan | penguin, giraffe, pig | jet, rocket | chair, apple |
| 7 | owl, bat | ostrich | airplane | bus, blocks |
| 8 | eagle | elephant, kangaroo | airplane, helicopter | car, banana |
| 9 | flamingo, butterfly | tortoise, crab | kite | ball, blocks, chair |

Totals: 15 · 15 · 15 · 18. Traps placed twice each: penguin (bird, cannot fly), ostrich (bird, cannot fly), bat (animal, not a bird, flies). No balloon (refused above). Per-region maximum in any round: 2 big / 3 small — inside the packed capacity at both widths.

**Answer position.** The answer is a region per picture. Balanced by totals above; per round the deal order is a fresh shuffle each pass, so "the next one goes in the middle" cannot be learned. Shortcut bots (measured): "kind only" (kind → left, others → outside) places 54% of pictures right and finishes **0 of 9** rounds; "size only" 52%, 0 of 9; "everything in the middle" 22%, 0 of 9.

**Order:** order-only reshuffle per pass (round order and deal order), never the same twice.

## 7. Check, the misses, the success
- **Check with pictures still in the basket:** the basket wobbles; hint "Place every picture first — the basket isn't empty." No miss.
- **Miss 1 (the ropes act):** for every picture in the wrong place —
  - a rope whose rule the picture HAS but which it sits outside sends out a lobe (an outward rope loop, 300 ms) that curls round the picture;
  - a rope whose rule the picture does NOT have but which it sits inside pinches in (an inward dent) around it and nudges it 14 px toward the outside of that rope.
  - Pictures in the right place get nothing. Lobes and dents stay until the picture is moved.
  - Hint: "A rope that reaches out wants that picture inside it. A rope that pinches in wants it out."
- **Miss 2:** each still-wrong picture shows two small drawn chips under it: a teal chip with ✓ or ✗ (left rule) and a coral chip with ✓ or ✗ (right rule) — and the region where the two chips agree glows softly. Hint: "Check both rules for each picture. Two ✓ means the middle; two ✗ means outside both."
- Moving a picture removes its lobe/dent and chips until the next Check.
- **Success:** the lasso twirl (§2), the overlap pictures bounce. Sentence: kind + size — "Yes! The big {kindPlural} are in both hoops." · kind + kind — "Yes! The animals that fly are in both hoops." (+ when a trap was in the round: "The penguin is an animal that can't fly." authored per trap).

## 8. Settings
1. **Rules:** *kind + size* (left sign = a kind picture, right sign = the size glyph; two picture sizes) / *kind + kind* (left = animals, right = can fly; one picture size). Visible at rest on the signs.
2. **Help chips:** *only after a second try* / *always* — "always" shows the two ✓/✗ chips under each placed picture as soon as it lands (for children who need the decision scaffolded). Visible at rest: placed pictures carry chips.

## 9. Words (EN source)
- title: "The Crossroads Sort"
- task line: "Put each picture where it belongs. Then press Check."
- signs (kind + kind only): "animals" · "can fly"
- hints and success: as §7. `{kindPlural}` = the image-vocabulary plural of the round's kind (pigs, apples, cars, lions, balls, strawberries, dogs, trucks, dinosaurs).
- settings: "Rules" — "kind + size" / "kind + kind"; "Help chips" — "only after a second try" / "always".
- aria: regions "left hoop only" / "in both hoops" / "right hoop only" / "outside both hoops"; pictures by vocab name + "big"/"small".

**Locale traps.**
- Plurals in the success line come from `image-vocabulary.js` (de *Schweine*, fr *cochons*, fi partitive after "the big…" — fi line authored as *Isot possut ovat molemmissa renkaissa* with the nominative plural; reviewer checks every kind in every locale).
- "Big" must be the everyday size word, not a measurement: de *groß*, fr *grand* (agreement: *les grands cochons / les grandes fraises* — gender from the vocab entry's gender field; the fr success line is authored per gender: m / f), es *grande(s)*, it *grande/grandi*, pt *grande(s)*, nl *groot/grote* (inflected before a noun: *de grote varkens*), sv *stor/stora* (*de stora grisarna*), da *store*, no *store*, fi *iso/isot*.
- "Can fly": de *kann fliegen*, fr *vole* / *peut voler*, sv *kan flyga*, fi *osaa lentää* (not *voi lentää*, which reads "may fly").
- "Animals" includes insects and birds in every school tradition here; the butterfly round's optional line "A butterfly is an animal too." is authored per locale.
- fr toys/ball and things-that-fly/balloon are both *Ballon* → never in one round (built into the table). The kite's word means "dragon" too in de *Drachen*, sv *drake*, da/no *drage* — harmless here because no dragon picture is ever used (things-that-fly/dragon is refused: an imaginary animal would break the animal rule).

## 10. Sound off, access, phones
- Sound off: rules are pictures/glyphs (kind + size) or words + picture/glyph (kind + kind); rope lobes, dents and chips are drawn; nothing depends on hearing.
- Keyboard path in §5; aria-live reads each rope's verdict: "The big rope reaches for the big pig."
- Taps: pictures ≥ 64 px on phones (they are the drag handles), basket mouth ≥ 104 px, regions are large.
- Picture floors: small 96 / 64, big 132 / 88 ✓; waiting pictures are drawn dots, never shrunken pictures (ruling).
- Phone layout: hoops stacked vertically, outside band under them, Check above the fold (§4).

## 11. Distinct from
- **Premium tool Sorting Hoops:** a hidden rule, teacher-led; the hoop accepts or releases each thing at the moment it is dropped (its whole thesis: "the hoop decides"). Here nothing is ever accepted or released on the drop — a drop is a silent prediction, the rules are printed on the posts, the "outside" region is a placement the child must choose, and the hoops never move except on Check, when they reshape (lobes and dents) to wrap their true members. No hidden rule, no teacher-led reveal, no per-drop feedback: it shares only the Venn layout, which the worksheet itself prescribes. Here both rules are given, the child commits a full prediction for every picture (including "outside"), and only on Check do the ropes act on the whole set, reshaping themselves to show where each picture truly belongs.
- **Row 68 Story Zipper** (things in both stories zip shut in the middle — a two-set comparison of events, by sentence); **New 225 Sorting Cabinet** (rows × columns matrix drawers); **Row 35 Sorting Chutes** (one attribute, graph); **Row 59 Letter Magnet** (one magnet, one attribute, things jump up). None has two attribute ropes that bend to their members.
- **New 308 Shape Sieve** (this batch): a vertical test cascade for nested shape categories; no ropes, no pictures.
- Not in REGISTRY-BUILT.

## 12. Build plan
- **Core state:** `{ rules:'kindSize'|'kindKind', round, deck:[items], placed:{itemId→region}, misses, chips }`; item = `{id, pic:'theme/noun', size:'big'|'small', attrs:{L:bool, R:bool}}`.
- **Core functions:** `regionFor(item)` → `'L'|'both'|'R'|'out'`; `ropeTargets(placed)` → for each rope the list of members outside it (lobes) and non-members inside it (dents); `grade(placed)`; `deal(pass)` (shuffled order, never repeats the previous pass's order); `ropePath(rope, lobes, dents)` → SVG path (pure function — the renderer only draws it).
- **verify gate (own oracle):** recomputes every item's attributes from the round table with its own code (kind equality; size flag; animal/flies lists written in the gate) and asserts: 6–8 items, all four regions non-empty, both ≥ 1, outside ≥ 1 per round; totals per setting as §6; every kind + size round shows the kind at BOTH sizes; no balloon; no refused picture; every round's per-region count fits the packed slot capacity at 704 AND 360 (pictures wholly inside their region, 8/6 px clear of the ropes, 6 px apart); every picture key exists in its theme JSON with all 11 labels; the three bots finish 0 of 9; `ropeTargets` is empty iff the placement equals the oracle; lobes only for members outside, dents only for non-members inside.
- **Mutations:** overlap accepted for a one-attribute item · outside accepted for a member of the right rope · size read from the picture key instead of the scale flag · lobes drawn for non-members · rope ignores items outside its circle (no lobe) · bat classified as not-an-animal · penguin classified as flying · deal order repeats the previous pass · help-chips setting shows nothing when "always".
- **Local test:** real drags of every item into every region at all widths; snap slots never overlap > 10%; ropes' lobes stay inside the stage (a lobe for a picture in a far corner may not leave the mat — clamp); Check above fold at 360 × 740 and 320 × 640.
- **Pictures to verify on contact sheets:** farm-animals (pig, cow, sheep), fruits, at-the-supermarket (pear), vehicles, zoo-animals, toys, pets, things-that-fly (seen: bat, eagle, owl, parrot, flamingo, butterfly, pigeon, swan, hummingbird, toucan, kite are clear), winter/penguin, birds/ostrich, ocean-life/crab, space/rocket, furniture/chair.
- **Risks:** a rope lobe reaching a picture in the opposite corner can cross the other rope — draw lobes under pictures and over the mat; dents for a picture deep inside both ropes come from both ropes at once (the "neither in the middle" case) — test that both dents read.
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — ropes that stretch out to lasso a forgotten dinosaur, and a twirl when you get it all right.
2. **Would a teacher put it on the board?** Yes — the overlap stops being a mystery: the class sees two ropes both holding the big pig, and the penguin/bat/kite traps start real arguments about rules.
3. **Would a parent trust it?** Library pictures only, calm motion, both rules visible, no score.
4. **The invention:** two rule ropes that tighten on Check and bend out to lasso every picture that belongs inside them and pinch in to push out every one that doesn't — so the overlap is simply where both ropes hold on.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 3→5 · correctness 3→5 · distinctness 4→5 · reality 3→5
What changed:
- The hoop geometry did not hold its own pictures: at 704 a 140 px picture in the 160 px lens spilled into both crescents; at 360 the lens could not hold even one 96 px picture beside another. Re-solved with a packing script (`work-c37/venn.js`): r 224 / d 198 at 704 (big 132, small 96), r 154 / d 136 at 360 (big 88, small 64), every picture wholly inside its region, slot capacities written down and gated; Check moved above the mat on phones.
- Big vs small is now read against fixed cradles in the basket and the to-scale size glyph, not against the mat.
- things-that-fly/balloon removed (a party balloon makes "can fly" arguable — two right answers); replaced by helicopter / airplane, totals unchanged (15/15/15/18).
- Re-measured the bots with my own oracle (`work-c37/lasso.js`): kind-only 54%, size-only 52%, middle 22%, and the cleverer one-attribute bots 71–76% — all finish 0 of 9 rounds. Penguin/ostrich (cannot fly), bat (animal that flies), butterfly (an animal), kite/airplane (fly, not animals) are all true.
- Distinctness from the premium Sorting Hoops tool spelled out: no per-drop accept/release, no hidden rule.
