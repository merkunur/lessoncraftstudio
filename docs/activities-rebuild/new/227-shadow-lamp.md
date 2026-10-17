# New 227 — The Shadow Lamp (READINESS · shadows-and-parts)

## 0. Identity
- **id** `shadow-lamp.play.shadows-and-parts` · **grade** K · **framework** readiness — visual discrimination and visual closure (`alignment.framework` from `frontend/lib/frameworks.ts`) · **strand** Logic & Visual Thinking · **files** `mini tools/shadow-lamp-core.js`, `shadow-lamp-activity.js`, `shadow-lamp-activity.html`, `shadow-lamp-activities.json` · **key** `shadow-lamp`
- **worksheets covered:** K-057 Match the Shadow (picture → its silhouette) · K-069 What Is It? (only part showing → circle the whole picture).
- All 11 locales; wordless apparatus.

## 1. The pitch
"Aim the lamp at a shadow on the wall: the picture's real shadow slides across and either sinks into it exactly — or two shadows show on the wall, and you can see exactly where they part."

## 2. Why a child will want it again (the fun)
- **A lamp you steer.** A desk lamp stands on the left; one library picture sits on a little turntable in front of it. Grab the lamp's shade and swing it (or tap a shadow on the wall) and the beam sweeps across the wall like a torch in a dark room, the picture's shadow riding in it. It is the oldest toy there is — hand shadows — made into an instrument.
- **The sink.** Land on the right silhouette and the cast shadow settles into it so exactly that its edges vanish ("fffp", a soft descending whoosh); then the silhouette *fills with colour* from the bottom up — the shadow comes alive as the picture.
- **Two shadows, honestly.** Land on the wrong one and the wall shows what real shadows do: where the cast shadow and the silhouette overlap the wall goes deepest black; where the cast shadow sticks out past the silhouette it lies as a soft grey shadow on the bare plaster; where the silhouette is left uncovered its own indigo shows through, with a thin warm rim of lamplight round it. No coloured overlay, no glow mask — just light and shadow, so the difference is read the way a child reads hand shadows. The child sees "the ears stick out", "that one has a tail I didn't cover". Children aim at every silhouette on purpose to watch the shadows part — exploring *is* the lesson.
- **The part peephole.** In part mode the wall is a dark curtain with one round window of light showing a piece of a hidden picture (a trunk, a spout, a comb). Pull a candidate into the beam and its picture is projected behind the window: if it is the same thing, the piece lines up crisply and the curtain rolls up to reveal the whole picture; if not, the window shows a blurry double image.
- **The earned show.** Each right round adds the coloured picture to a "shadow theatre" strip at the bottom; at the end of a pass the nine pictures stand in a row and the lamp sweeps over them once, each casting its shadow on the strip's back wall as the beam passes.

## 3. The skill and the misconception
- **Skill.** Match a picture to its outline by the whole shape (K-057); recognise a whole picture from a part of it (K-069).
- **Misconception 1: matching by colour.** Impossible here: silhouettes carry no colour, and the cast shadow is shape only.
- **Misconception 2: matching by one feature** (any four-legged animal for any four-legged shadow; any bird for a bird shadow). Pushback: in "close" rounds a same-family look-alike always stands on the wall (cat–dog–fox, duck–goose–swan, cow–goat–ox…). Aimed at it, the mismatch is shown as glowing edge regions — exactly the parts that differ (the fox's pointed ears, the goose's long neck). The material shows *where* to look.
- **Misconception 3 (part mode): guessing from a fragment's colour.** Close part rounds pair candidates that share colour (cat and tiger are both orange; hen and rooster both white-red) so only the shape of the part decides; the double image in the window shows the shapes not lining up.

## 4. The stage
Apparatus geometry: the lamp (cone shade, two-segment arm, round base — flat shapes in teal/cream, 2.5 px ink), the turntable, the wall (#E9DFCC plaster), the beam (a soft warm cone, #FFF4D6 at 55 %), the curtain (#3E3A55 with a round window). Silhouettes and cast shadows are derived at runtime from each library picture's **alpha channel** (every library webp is transparent — measured 40–72 % transparent pixels on the nouns used here); no new art.

**704 px (content ≈ 656):**
- **Task line** (20 px).
- **Lamp + turntable** (left column, 200 wide): the picture on the turntable at **120 px**; the lamp 150 tall beside it.
- **Wall** (right, 440×300): 3 silhouette frames in a row, each **136 px** box (silhouette fitted to the box by its ink extent, keeping its aspect), on the plaster.
- **Part mode:** the wall becomes the curtain with a round window **150 px** across (the hidden picture behind it at 220 px box); the three candidates stand on the lamp table in a column of 3 × **104 px**.
- **Shadow theatre strip** (bottom, 72 tall): nine 56 px slots.
- No Check button — aiming is the act. Bubble under the wall.

**360 px (content ≈ 328):**
- Stacked: wall on top (3 silhouette frames × **100 px**, 328×132), the lamp + turntable below it (picture **96 px**, lamp 110 tall) — the beam shines **upward** to the wall.
- Part mode: curtain window **120 px** (hidden picture box 180), candidates in a row of 3 × **96 px** below.
- Fold: task 40 + wall 132 + lamp row 140 + theatre 48 = **360 px**; part mode 40 + 200 + 104 + 48 = **392 px** (far above 640 at 320, where frames are 92 px).

**Words on the apparatus:** none.

## 5. The hand
- **Aim the lamp:** drag the shade (rotates the lamp about its arm joint; the beam follows the pointer angle continuously, < 16 ms) or **tap a silhouette** (the lamp swings to it, 350 ms ease). The cast shadow rides inside the beam, scaled to the target frame as it approaches. Releasing (or the tap) commits: the shadow settles onto the silhouette the beam points at (nearest frame centre).
- **The comparison** (computed on a canvas at commit, < 50 ms): shadow mask S, silhouette mask T, both fitted to the frame by ink extent. Right (S = T): edges vanish, colour fills up (600 ms). Wrong: S∩T renders deepest black, S∖T as a soft grey shadow (#000 at 35 %, 3 px blur) on the plaster, T∖S keeps the silhouette's indigo (#3E3A55) with a 2 px warm lamplight rim (#FFD98A) — the two shadows breathe apart and together twice (1.4 s), then the shadow slides back into the beam (300 ms).
- **Part mode:** drag a candidate from the table into the beam (or tap it). It is projected behind the window at the hidden picture's pose; inside the window the projection and the hidden piece blend: right → crisp single image, the curtain rolls up (700 ms) revealing the whole picture; wrong → a doubled, offset image inside the window for 1.4 s, then the candidate returns.
- **Keyboard:** Left/Right aim at the previous/next silhouette (or candidate in part mode), Enter commits; aria-live announces "it fits" / "different here: top, left".
- **Free play** (after a right round): the lamp can be aimed at any silhouette freely, and in whole mode the child may drag any theatre-strip picture onto the turntable to cast it on the wall (no misses).

## 6. The rounds
One picture, three silhouettes (or one part, three candidates); one right answer. The right silhouette/candidate stands in each of the 3 slots exactly 3 times per 9-round pass (33 % ≤ 40 %). Look-alike similarity is **measured**: IoU of the two alpha masks, each fitted to a square by its ink extent (64×64). **Easy:** every distractor IoU ≤ 0.55 with the target. **Close:** at least one distractor in 0.60–0.78 (same family), none above 0.80 (indistinguishable). Pictures seen on contact sheets (farm-animals, animals, kitchen-tools, vehicles, toys, fruits).

**Whole shadow — easy**

| # | picture (turntable) | other silhouettes (IoU with target) |
|---|---|---|
| 1 | farm-animals/horse | animals/fish (0.41) · kitchen-tools/teapot (0.45) |
| 2 | animals/elephant | toys/kite (0.32) · vehicles/bicycle (0.18) |
| 3 | animals/giraffe | farm-animals/pig (0.41) · toys/rocket (0.41) |
| 4 | kitchen-tools/teapot | animals/rabbit (0.44) · toys/kite |
| 5 | farm-animals/duck | vehicles/bus (0.52) · toys/kite (0.30) |
| 6 | toys/rocket | farm-animals/sheep (0.47) · kitchen-tools/spoon (0.17) |
| 7 | vehicles/bicycle | animals/penguin (0.23) · fruits/pineapple (0.18) |
| 8 | animals/zebra | kitchen-tools/mug (0.40) · toys/ball (0.42) |
| 9 | fruits/pineapple | animals/camel (0.33) · vehicles/helicopter (0.31) |

**Whole shadow — close (same family)**

| # | picture | other silhouettes (IoU) |
|---|---|---|
| 1 | animals/cat | animals/dog (0.64) · animals/fox (0.70) |
| 2 | farm-animals/duck | farm-animals/goose (0.65) · animals/swan (0.52) |
| 3 | farm-animals/cow | farm-animals/goat (0.67) · farm-animals/ox (0.64) |
| 4 | farm-animals/hen | farm-animals/rooster (0.65) · farm-animals/turkey (0.63) |
| 5 | kitchen-tools/teapot | kitchen-tools/kettle (0.69) · kitchen-tools/pot (0.65) |
| 6 | kitchen-tools/mug | kitchen-tools/jug (0.72) · kitchen-tools/cup (0.55) |
| 7 | vehicles/taxi | vehicles/jeep (0.72) · vehicles/van (0.72) |
| 8 | animals/tiger | animals/cat (0.75) · animals/dog (0.67) |
| 9 | toys/car | vehicles/bus (0.64) · toys/truck (0.74) |

(Excluded after measuring: tiger–leopard 0.79 and toys/car–jeep 0.82 — too close to tell apart as shadows. Excluded by the picture rulings: farm-animals/chick beside farm-animals/duck (too close at small sizes — critic swap to animals/swan, measured 0.52 with the duck, 0.45 with the goose); farm-animals/calf beside farm-animals/cow (the calf is drawn as a small horned cow — a child would call both "cow"; critic swap to farm-animals/ox, measured 0.64). IoUs re-measured by the critic with `des/mask.js`: duck–goose 0.65, cow–goat 0.67, cow–ox 0.64 — they match the table.)

**Part only — easy** (window = a circle of radius 30 % of the picture box over the authored feature point; the visible area 35–45 % of the ink box)

| # | hidden picture (window on) | other candidates |
|---|---|---|
| 1 | animals/elephant (trunk and ear) | animals/giraffe · vehicles/bus |
| 2 | animals/giraffe (head and horns) | farm-animals/pig · toys/kite |
| 3 | kitchen-tools/teapot (spout) | farm-animals/duck · toys/ball |
| 4 | fruits/pineapple (leafy crown) | animals/penguin · toys/car |
| 5 | animals/zebra (striped legs) | kitchen-tools/teapot · toys/rocket |
| 6 | toys/rocket (round window and fin) | farm-animals/sheep · kitchen-tools/mug |
| 7 | vehicles/bicycle (one wheel and pedal) | animals/elephant · animals/fish |
| 8 | accessories/umbrella (hooked handle) | fruits/apple · farm-animals/horse |
| 9 | farm-animals/rooster (comb and beak) | vehicles/bus · fruits/pear |

**Part only — close** (the window shows the deciding detail; candidates share colour or family. Critic changes: the hen's window moved from its head (the library hen HAS a red comb, so "no tall comb" did not decide against the rooster) to its pale fan tail, which the rooster's dark sickle tail cannot match; the hen's lure duck → goose (no chick/duck-style near-twins); the cow's calf → ox (calf = small cow); the mug's window moved off the handle and rim, which the cup shares, onto the straight side, which the round cup and the spouted jug do not have)

| # | hidden picture (window on) | other candidates |
|---|---|---|
| 1 | animals/cat (face and whiskers) | animals/tiger · animals/fox |
| 2 | farm-animals/hen (the pale fan tail and back) | farm-animals/rooster · farm-animals/goose |
| 3 | farm-animals/cow (red-spotted side and udder) | farm-animals/ox · farm-animals/goat |
| 4 | vehicles/taxi (roof sign) | toys/car · vehicles/van |
| 5 | fruits/strawberry (seeded tip) | fruits/raspberry · fruits/pomegranate |
| 6 | kitchen-tools/mug (the straight tall side and the top of the handle) | kitchen-tools/cup · kitchen-tools/jug |
| 7 | farm-animals/donkey (long ears) | farm-animals/horse · farm-animals/foal |
| 8 | animals/penguin (beak and white belly) | animals/seagull · animals/owl |
| 9 | farm-animals/dog (floppy ear and face) | animals/fox · animals/cat |

The build opens every part window on a contact sheet (the window crop beside the three wholes) and confirms the crop decides the answer for a sighted adult in one look and does not name it by colour alone.

**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
There is no Check button: committing the aim is the try.
- **Nothing for 10 s** → the lamp gives a small flicker and the beam brushes across all three silhouettes once. "Point the lamp at the shadow that fits."
- **Miss 1** → the two shadows (grey = your shadow sticks out, indigo with a light rim = the wall's shadow not covered), then the shadow returns. Hint: "Look where the two shadows don't match — that part is different."
- **Miss 2** → the two shadows show again, then the lamp narrows to a **spotlight** on the turntable picture over the region where it differs most from the silhouette just tried (the centroid of the larger XOR blob), holding 1.5 s: the child is shown *what to look at* on their own picture (the ears, the tail, the handle). Hint: "Look at this part of your picture. Which shadow has it?" · part mode: the window **widens by 40 %** (more of the hidden picture shows). Hint: "Now you can see more. Which picture is it?"
- A new aim clears the spotlight (help taken away until the next try).
- **Success** → sink and colour-fill (whole) / curtain rises (part); the picture slides into the shadow theatre strip. Bubble: whole "It fits exactly — every edge!" · part "You knew it from just a piece!" Pass end: the lamp sweeps the theatre strip and each picture casts its shadow.

## 8. Settings
1. **Mode:** whole shadow / part only — the wall shows three silhouettes or the curtain with a window.
2. **Look-alikes:** easy (different kinds) / close (same family) — the silhouettes or candidates visibly change at rest.

## 9. Words (EN source)
- title "The Shadow Lamp" · instruction "Point the lamp at the shadow that belongs to the picture."
- task: whole "Which shadow belongs to this picture? Point the lamp at it." · part "Only a piece is showing. Which picture is it? Put it in the light."
- hints: hintIdle "Point the lamp at the shadow that fits." · hintMiss1 "Look where the two shadows don't match — that part is different." · hintMiss2 "Look at this part of your picture. Which shadow has it?" · hintPart2 "Now you can see more. Which picture is it?"
- celebrate: whole "It fits exactly — every edge!" · part "You knew it from just a piece!" · pass "Nine shadows found!"
- aria: wallLabel "wall with 3 shadows" · shadowLabel "shadow {i} of 3" (silhouettes are never named — naming would give the answer) · pictureLabel "{picture}" · differLabel "different at the {regions}" (regions from the XOR: top / bottom / left / right / middle) · candidateLabel "{picture}".
- settings: "Mode" — "Whole shadow" / "Only a piece" · "Look-alikes" — "Easy" / "Close".
- **Locale traps:** none on the apparatus. Region words (aria only) per locale; picture names from `image-vocabulary.js` singular. "Shadow" vs "silhouette": use the everyday word children say (de *Schatten*, fr *ombre*, sv *skugga*, fi *varjo*).

## 10. Sound off, access, phones
- Sound off: the sink, the colour fill, the parted shadows and the spotlight are visual.
- Keyboard: Left/Right/Enter (§5); screen reader gets the region of difference in words.
- Taps: silhouette frames ≥ 92 px (tap to aim); candidates ≥ 96 px; the lamp shade grab area 64×64.
- Pictures: turntable 120 px / silhouettes 136 px at 704; 96 / 100 px at 360.
- Colour-blind safety: the difference is carried by lightness (grey on cream vs dark indigo with a light rim), not hue.
- Phone layout: wall on top, lamp below shining upward.

## 11. Distinct from
- **#274 The Shadow Table** (G2 tangram shadows): composing a shape from pieces to fill a shadow — not matching a picture's outline. **#228 Fold Mirror** (batch sibling): reflection; the lamp is projection (no flip). **Sock & Shadow** (ORDER row 80): a speaking/listening puppet activity, nothing to do with silhouettes. **#229 The Blink Viewer** (another batch) lays picture on picture and paints a coloured glow over the differing pixels; **#224 Tile Twin** checks a copy row by row with a shuttle. To stay clear of both, the lamp's wrong landing is shown only as real shadow physics — overlap deepest, the cast shadow's overhang grey on the plaster, the uncovered silhouette indigo with a lamplight rim — never a coloured diff overlay. The task is also different in kind: a picture against outlines (shape constancy without colour) and a part against wholes (visual closure), not two coloured pictures compared. Registry #1–#22: no shadow or projection mechanic.

## 12. Build plan
- **Core state:** `{ mode, alike, rounds, r, picture, slots:[noun], aim:null|i, misses, theatre }`. Functions: `masks(noun)` (alpha → 64×64 fitted mask, cached), `compare(a, b)` → `{equal, extra:mask, missing:mask, iou}`, `aimAt(i)`, `commit()`, `spotRegion(a, b)` (centroid of the largest XOR blob), `partWindow(noun)` (authored feature point + radius), `nextRound()`.
- **Gate's own truth (`verify-shadow-lamp-core.js`):** recomputes every mask from the cached library webp alpha with its own code; asserts each round's IoU band (easy ≤ 0.55; close: one in 0.60–0.78, none > 0.80); the target is in each slot exactly 3 times per pass; `compare(target, target)` is equal and `compare(target, distractor)` is not, for every round; every picture has a real alpha channel (≥ 30 % transparent pixels — a white-background webp is refused); part windows show 35–45 % of the ink box; colour themes only (localized B&W markers rejected).
- **Mutations:** match by colour histogram instead of mask · a close round with a 0.85 distractor · target always in slot 1 · XOR shows only S∖T · spotlight on the silhouette instead of the picture · part window covering 90 % · accept a white-background picture.
- **local-test:** real drags of the lamp shade and taps on silhouettes in every round of both modes × both look-alike levels, 7 widths; screenshots of two parted shadows at 704 and 360.
- **Pictures:** every noun in the four tables on one contact sheet with their derived silhouettes side by side; the 18 part windows as crops. **Risk:** a picture whose alpha includes a faint drop shadow would cast a "fat" silhouette — the mask threshold is alpha > 40 (the same as the measurement here). **Nothing blocked.**

## 13. The four questions
1. **Choose it again?** Yes — a lamp you swing like a torch, shadows that sink and come alive in colour, and two shadows that part exactly where the pictures differ.
2. **Teacher on the board?** Yes — the K shadow-match and visual-closure tasks, with the classic error (matching one feature) answered by the material showing where the shapes disagree.
3. **Parent trust?** Wordless, library pictures (their own shadows), no score, calm.
4. **The invention:** aim the lamp and the picture's real shadow lands on the wall — it sinks into the right silhouette edge-for-edge, and on a wrong one the two shadows part exactly where the shapes disagree.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 4→5 · reality 3→5
What changed:
- Reality: close round 2 put farm-animals/chick beside farm-animals/duck (picture ruling: never both) — chick → animals/swan (IoU 0.52 with the duck, re-measured). The calf is drawn as a small horned cow (a child calls both "cow") — calf → farm-animals/ox in the whole and the part tables (0.64). The hen part window was on its head, but the library hen HAS a red comb, so it did not decide against the rooster — moved to its pale fan tail; the mug window was on the handle and rim the cup shares — moved to its straight side. IoUs in the table re-measured with mask.js and confirmed (duck–goose 0.65, cow–goat 0.67).
- Distinctness: the wrong landing glowed coral/teal over the differing pixels — the #229 Blink Viewer's diff glow. Now shown only as real shadow physics: overlap deepest black, the cast shadow's overhang a soft grey shadow on the plaster, the uncovered silhouette indigo with a lamplight rim (lightness, not hue — colour-blind safe by construction). Pitch, hints, §10, §11, §13 updated.
