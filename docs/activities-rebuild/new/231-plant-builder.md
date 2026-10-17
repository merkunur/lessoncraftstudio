# New 231 — The Plant Builder → THE THIRSTY PLANT (NGSS 1-LS1-1)

## 0. Identity
- id `plant-builder.play.1-ls1-1` · grade K (settings to grade 3) · NGSS 1-LS1-1 (structure and function), framework via `alignment.framework` (`frontend/lib/frameworks.ts`) · strand Science · files `plant-builder-core.js`, `plant-builder-activity.js`, `plant-builder-activity.html`, `plant-builder-activities.json`. Scaffold `node scripts/new-activity.js --num=231`.
- worksheets covered: G1-376 Parts of a Plant · G2-363 Parts of a Plant We Eat · G2-364 Parts and Their Functions · G3-392 Parts of a Flower · K-202 Fruits and Vegetables. Merged: grade 2 "Root-to-Fruit Ladder" (food rungs + function cards + the water path) → the *What we eat* and *Jobs* tasks; grade K "Grow-Where Garden" (fruit = holds seeds; vegetables are other parts) → the *What we eat* task with its seed check; grade 3 "Flower Press" → the *Flower parts* task.

## 1. The pitch
"Build the plant, then give it a drink: the water goes in at the roots and climbs the stem to the leaves — leave out a part and you can see exactly where the water gets stuck."

## 2. Why a child will want it again
- A plant you assemble like a toy: roots clip under the soil, the stem clicks onto the roots, leaves snap onto the stem's nodes, the flower crowns the top. Each click has its own sound.
- Then the drop: the child drags a fat library raindrop onto the soil and watches it sink, get sipped up by the roots, rise as a blue column through the stem and spread into every leaf vein. The sun comes out, the leaves shimmer, the flower opens with a bounce — and (6-part setting) the flower drops its petals and swells into a fruit with seeds inside. A plant grows because the child completed it.
- The cheeky test everyone tries: drop the water on a LEAF. It beads up, rolls off the edge, drips to the soil — and only then does the plant drink it, from the bottom. Children laugh and try again on the flower. That is the misconception, refuted by the toy itself.
- Earned show per round: the finished plant gets a small numeral tag on its pot (the round number, 1–8, content of nothing — decoration) and slides into a window-sill row at the top of the stage; after a pass the sill is a row of 8 plants, each grown by the child.
- Free play: between rounds the child can water any sill plant, drag the sun across the sky (leaves shimmer only while the sun shines on them), or pull a leaf off and watch the water stop short of where it was.

## 3. The skill and the misconception
- **Skill:** a plant has parts that each do a job (roots take up water and hold the plant in the soil; the stem holds the plant up and carries water; leaves make food from sunlight; the flower makes seeds; the fruit holds the seeds; a seed grows into a new plant); the foods we eat are different plant parts; a fruit is the part that holds seeds; grade 3: a flower has petals, sepals, stamens and a pistil.
- **Misconception 1 — "plants drink through their leaves" / "you water the leaves".** **Pushback:** water dropped on a leaf runs off and drips to the soil; the plant only takes water in at the roots, and the column visibly climbs from the bottom.
- **Misconception 2 — "roots are just the bottom / an anchor".** **Pushback:** remove the roots and the drop soaks into the soil and stays there — the stem stays empty and the leaves stay dull; the gap where the roots should be glows. With the roots on, the sip starts there. And roots only click in **below** the soil line (held above it, they drift back down).
- **Misconception 3 — "a fruit is something sweet; a tomato is a vegetable".** **Pushback (What we eat):** a food is hung on the part it is; when it lands on the fruit position, the plant's pod opens to show seeds inside — fruits hold seeds. The honesty line is kept for cooks: "a fruit of the plant, cooked like a vegetable".
- **Misconception 4 — "the flower is just for looking pretty".** **Pushback (Jobs / 6 parts):** a bee visits the open flower, the petals fall and the flower becomes the fruit — the flower's job is making seeds.

## 4. The stage
**Art decision (measured, not assumed).** The coverage review marked this row BLOCKED for lack of separable plant-part and flower-part pictures. Measured 2026-10-17: the repository already contains `scripts/worksheet-gen/primitives/plant-figure.js` — the reviewed plant drawing of the printed worksheets G1-376 / G2-363 / G2-364 / G3-392 (teal 3 px line art, soil line, roots with laterals, a stem, four leaves on nodes, a 5-petal flower with sepals, a pod with a seed window, plus `flowerSection` with petal / sepal / stamen / pistil anchors and `plantStage` seed→fruiting). It is apparatus-style line art in the tool palette (no characters, no shading), already on five published worksheets. **This design uses that drawing, split into its part groups** (§12). If the operator rules it out under rule 5, the fallback in §12 applies.
**Critic check (2026-10-17, rendered and looked at, not assumed):** `plantFigure({stage:'full', h:600, tags})`, `flowerSection({h:418, tags})` and `plantStage({stage:'fruiting'})` were written to PNG with sharp (`scratchpad/des/work-c12/render-plant.js`; note: the primitive emits valueless `data-lcs-*` attributes, which a strict XML rasteriser rejects — the activity inlines the SVG into HTML, where they are valid). Verdict: the full plant and the flower section read as **science diagrams of tool grade** — even 3 px teal outlines, flat tealSoft leaves, a clean soil box with pebbles, coral numbered tags on threads, the same line language as the Place Value Lab — not a hand drawing of an object, and nothing a parent would call crude. They are used **only as the diagram the child assembles and labels** (the apparatus), never as a character or a food. The small `plantStage('fruiting')` pot is plainer; it is used only for the 40 px sprout beside the pot (`plantStage('sprout')`), never as a round's main picture. Primary design = plant-figure; the pipe-plant fallback (§12) stays only for an operator veto.

**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At **704 px** (stacked: stage 440 px left, tray + bubble 244 px right):
- **Window sill** (top, 704 × 40): drawn shelf; finished plants stand on it as 36 × 40 thumbnails.
- **The pot and soil** (stage bottom, 300 × 150): the plant-figure soil box (cream, pebbles, glints) with the **soil line** marked by a slightly darker edge.
- **The plant frame** (stage, 300 × 420; plant-figure scaled 0.7): empty sockets shown as faint dashed outlines of each missing part in its true place (root laterals below the soil, stem from soil to top, leaf nodes N1/N2/N4/N5, the flower crown, the pod position in 6-part mode). The faint outlines follow the Parts setting: shown with 4 parts (K), hidden with 6 parts (grade 1+), where the child must know where each part goes.
- **The sky** (behind the top of the plant): the library `beach/sun` (96 px) the child can drag left/right (`weather/sun` is cache-only with no label — not used; `weather/sunny` is a different drawing and is kept for weather content).
- **The water drop:** library `weather/raindrop` (80 px) in a little drawn well beside the pot — always available.
- **Tray** (right column, 244 × 300): the loose parts (each part drawn from the same figure, 96–140 px) plus one decoy (a library picture that is not a plant part: `easter/feather`, `beach/seashell`, `toys/ball`, `kitchen-tools/spoon`, `accessories/ribbon`). Order shuffled.
- **Task lines (≤ 24 px):** Build "Build the plant, then give it water." · Name "Put each name on its part." · Eat "Which part of the plant do we eat? Hang the food on it." · Jobs "Which part does this job? Drag the card to it." · Flower "Name the parts of the flower. One word is not a flower part."
- No words on the apparatus except the part names, job cards and food names that ARE the content (Name, Jobs, Flower tasks).

At **360 px** (stacked): sill 344 × 28; plant frame 280 × 340 (scale 0.567; leaves ≈ 100 px long, flower ≈ 64 px wide); tray as one horizontal row under the pot (parts 72–96 px, horizontally scrollable with `justify-content: safe center` if more than 4); raindrop well 64 px at the pot's right. Height: 28 + 30 + 340 + 96 = 494 — Check above both folds (320: plant 250 × 300).

## 5. The hand
- **Drag a part** (lifts within 50 ms, a soft leaf-rustle): near its true socket (within 40 px) it **snaps** with a click and the dashed outline fills. Anywhere else it drifts back to the tray (250 ms). Physics rules: roots only snap below the soil line; the stem only snaps once roots are in (it grows up out of them in 300 ms); leaves only on stem nodes; the flower only on the stem top; the fruit only on the pod stalk (the figure's side stalk at y ≈ 230–330, where `plantFigure` draws its pod), and only once a flower is on the plant — the bee visits the open flower, then the pod swells on its stalk (6-part mode; 500 ms); the seed card only into the pod's window. The decoy never snaps: it bumps against the plant, bounces off and returns.
- **The drop:** drag the raindrop onto the soil → it sinks in (300 ms), roots glow and the blue column climbs the stem (60 px per 100 ms) into each leaf's veins (leaves deepen in colour). Dropped on a leaf → beads, rolls off its tip, drips to the soil, then the root path starts. Dropped on the flower → same run-off. If a part is missing, the water stops at the gap, a small blue pool forms there and the gap's outline glows coral.
- **The sun:** drag it over the plant → leaves that have water shimmer (a light sweep) and a tiny sugar sparkle runs from the leaves down the stem (food made from light). Leaves without water stay dull even in sun.
- **Name tags (Name, Flower):** drag a word card onto a numbered tag disc on its thread; the right word docks and the part performs its action (root sips, stem carries, leaf shimmers, flower opens, fruit opens, seed sprouts a 40 px `plantStage` sprout beside the pot). Wrong word → the card's own part outline lights where that part really is, then the card slides back.
- **Food (Eat):** drag a library food onto a part; that part fills with the food's colour (roots turn orange for a carrot, the stem pale green for celery, leaves bright for lettuce, the flower head white for cauliflower). On the fruit position the pod opens and its seeds show.
- **Job card (Jobs):** drag the card onto a part; the part acts out the job; wrong part → it tries and cannot (the leaf "tries to drink": the drop runs off it; the flower "tries to hold the plant up": the plant sags until the card is lifted away).

## 6. The rounds
### Build & water (G1-376) — 8 rounds; Parts setting 4 (root, stem, leaf, flower) or 6 (+ fruit, seed)
| # | missing parts (in the tray) | decoy | 6-part extra |
|---|---|---|---|
| B1 | root, stem, 2 leaves, flower (all) | easter/feather | + fruit |
| B2 | 2 leaves, flower | beach/seashell | + fruit, seed |
| B3 | root | toys/ball | + fruit |
| B4 | stem, flower | accessories/ribbon | + seed |
| B5 | root, 2 leaves | kitchen-tools/spoon | + fruit, seed |
| B6 | flower | easter/feather | + fruit |
| B7 | root, flower | beach/seashell | + seed |
| B8 | stem, 1 leaf | toys/ball | + fruit, seed |
A round = place every tray part, then water (the drop is the round's Check; the shell Check does the same). Missing sets differ so the gap is never in the same place twice running.

### Name the parts (G1-376) — 8 rounds; 4 or 6 numbered tags
Tag numerals 1–4 (or 1–6) are assigned to parts by a fresh shuffle each round (tag 1 is the root in at most 2 of 8 rounds); the cards (root, stem, leaf, flower[, fruit, seed]) are shuffled in the tray. Each round uses either tag pick 0 or pick 1 of plant-figure's two anchor slots per part, so the threads come from different sides.

### What we eat (G2-363, K-202, Grow-Where) — 8 foods per pass from 14
| food (library) | part we eat | note |
|---|---|---|
| vegetables/carrot | root | |
| vegetables/radish | root | |
| vegetables/beetroot | root | |
| vegetables/celery | stem | |
| vegetables/asparagus | stem | |
| vegetables/lettuce | leaf | |
| vegetables/cabbage | leaf | |
| vegetables/broccoli | flower | |
| vegetables/cauliflower | flower | |
| fruits/apple | fruit | |
| fruits/pear | fruit | |
| vegetables/tomato | fruit | honesty line: "a fruit of the plant, cooked like a vegetable" |
| vegetables/cucumber | fruit | honesty line |
| vegetables/corn | seed | "the kernels are seeds" |
Each pass draws 8 foods covering every part at least once and no part more than twice; the right part is never the same 3 times running. **Potato, onion, garlic are refused** (a potato is a stem tuber, onion/garlic are bulbs — honest but not K-teachable). **K-202 fruit/vegetable step (setting "Then sort: on/off", default on at K):** after a food is hung correctly, two drawn crates appear — "Fruits" / "Vegetables" (bin words from the K-202 data, content) — and the child drops the food in. Only foods with no culinary conflict ever reach the crates (apple, pear → Fruits; carrot, radish, beetroot, celery, asparagus, lettuce, cabbage, broccoli, cauliflower → Vegetables); tomato, cucumber and corn rounds skip the crates and show the honesty line, so the activity never contradicts the K-202 culinary key (which files tomato under vegetables).

### Jobs (G2-364, Root-to-Fruit Ladder) — 8 cards
| card | part | what the part shows when right |
|---|---|---|
| "takes up water from the soil" | root | the drop sinks, roots glow, the column starts |
| "holds the plant in the ground" | root | a drawn gust bends the plant; the roots grip, the plant springs back |
| "carries water up the plant" | stem | the column rises |
| "holds the plant up tall" | stem | the stem straightens from a slight droop |
| "makes food from sunlight" | leaf | the sun's light sweep + the sugar sparkle |
| "makes the seeds" | flower | a library `insects-and-bugs/bee` lands, petals fall, the pod grows |
| "holds and protects the seeds" | fruit | the pod's window opens on the seeds |
| "grows into a new plant" | seed | a seed rolls out and a `plantStage` sprout rises beside the pot |
4-part setting uses the first 5 cards plus "makes the seeds" (6 rounds) plus a repeat of the two root cards in new order = 8 rounds; 6-part uses all 8.

### Flower parts (G3-392, Flower Press) — 7 rounds; the `flowerSection` cut-away flower (h 340 at 704)
Each round tags the four flower parts the worksheet asks for — petal, sepal, stamen, pistil (`FLOWER_ANCHORS`; the section has no leaf anchor, and "stalk"/"ovary" are not asked at grade 3) — with numerals 1–4 freshly shuffled (each numeral sits on each part ≤ 2 of 7 rounds), and a bank of those 4 names + 1 word that is not a flower part, to drop in a drawn cross-out tray. Decoys, nearest first so the cross-out is a real decision: round 1 root (the G3-392 worksheet's own decoy), 2 leaf, 3 bark, 4 thorn, 5 branch, 6 wing, 7 feather. Bank order is a fresh shuffle; the decoy's bank slot is ≤ 2 of 7 in any slot. The right name makes its part act: petals open, a sepal folds back, stamens dust a little pollen (dots), the pistil glows.

**Answer position (all tasks):** tray order is a fresh shuffle; tag numerals are reshuffled; the gate asserts no tray slot holds the right first part > 40 % and no tag numeral maps to the same part > 2 of 8.
**Order:** order-only reshuffle per pass for every table.

## 7. Check, the misses, the success
- **Check / water with nothing placed** → the drop waits in its well; bubble "Put the parts on the plant first." (Name/Flower: "Put a name on a tag." · Eat: "Hang the food on a part." · Jobs: "Drag the card to a part.") — no miss.
- **Build, miss 1** (watered with a part missing, or the tray not empty): the water stops at the first gap, pools, and the gap's outline glows coral. Hint: "The water got stuck. Which part is missing here?" **Miss 2:** the missing part in the tray lifts and wiggles. Hint: "This part carries the water on."
- **Name / Flower, miss 1:** the card's own part lights where that part really is, then the card returns. Hint: "That word is for the part that lights up." **Miss 2:** the right card in the bank glows. (Cross-out word dropped on a tag → the card turns grey and hops into the cross-out tray by itself: "That one is not a flower part.")
- **Eat, miss 1:** the food lands, the part fills — and does not match (the carrot's orange inside a leaf looks wrong); the food drops back. Hint: "Look at the food. Is it a root, a stem, a leaf, a flower, a fruit or a seed?" **Miss 2:** the right part's outline pulses. Hint: "Fruits hold seeds. Roots grow under the soil." (only the clause for the food's true part).
- **Jobs, miss 1:** the wrong part tries the job and cannot (run-off, sag, no sparkle). Hint: "That part can't do this job. Watch what happens." **Miss 2:** the right part pulses.
- A new action clears the showing until the next Check.
- **Success:**
  - Build: water climbs to every leaf, the sun shimmer, the flower opens (6 parts: petals fall, the fruit grows, seeds show); the plant moves to the sill. Bubble: "Roots drink, the stem carries, the leaves make food — your plant is growing!"
  - Name: every part acts in turn. "Root, stem, leaf, flower{, fruit, seed} — you named them all!"
  - Eat: "We eat the {part} of the {food}!" (+ the honesty line for tomato/cucumber, + "Into the {Fruits|Vegetables} crate!")
  - Jobs: "The {part} {job}!"
  - Flower: "Petal, sepal, stamen, pistil — and {decoy} is not a flower part!"

## 8. Settings
1. **Task:** Build & water · Name the parts · What we eat · Jobs · Flower parts (default Build). At rest: tray of parts / tags and name cards / a food / a job card / the cut-away flower.
2. **Parts:** 4 (root, stem, leaf, flower) · 6 (+ fruit, seed) (default 4). At rest: the flower crown alone, or the flower + pod outline + seed window. (Flower parts ignores this setting and says so in the drawer — it always uses the cut-away flower.)
Grade guidance in the drawer text (K: Build/4; G1: Name/6; G2: Eat, Jobs; G3: Flower).

## 9. Words (EN source)
- title: "The Plant Builder — Parts of a Plant"
- instruction: "Build the plant and give it a drink. Watch where the water goes."
- task lines: §4. Part names: "root" · "stem" · "leaf" · "flower" · "fruit" · "seed" · flower: "petal" · "sepal" · "stamen" · "pistil" · flower-task decoys: "root" · "leaf" · "bark" · "thorn" · "branch" · "wing" · "feather" (each authored per locale as the plain school noun; fi *juuri / lehti / kaarna / piikki / oksa / siipi / sulka*).
- job cards: §6. Bins: "Fruits" · "Vegetables" (from the K-202 data, already 11-locale).
- hints / celebrations: §7. Honesty line: "A {food} is a fruit of the plant — we cook it like a vegetable." Corn: "The kernels are seeds."
- settings: "Task" — "Build & water" / "Name the parts" / "What we eat" / "Jobs" / "Flower parts" · "Parts" — "4 parts" / "6 parts" (ghost outlines follow Parts: on at 4, off at 6 — no third toggle).
- **Locale traps:**
  - "Fruit" botanical vs culinary: de *Frucht* (botanical) vs *Obst* (food) — the part name must be *Frucht*, the K-202 bin is *Obst*; fr *fruit* both; sv *frukt* both but the botanical part is often *frukt* too; fi *hedelmä* (food) vs botanical *hedelmä* too; nl *vrucht* (botanical) vs *fruit* (bin). The part label and the bin label are separate keys per locale.
  - Vegetable bin: pt "Legumes e Verduras" (kept from the K-202 data).
  - Root vegetables per locale: beetroot is "beet" (US) — library label from image-vocabulary.js per locale.
  - Flower-part terms at grade 3 per national curriculum: de *Blütenblatt / Kelchblatt / Staubblatt / Stempel*, fr *pétale / sépale / étamine / pistil*, sv *kronblad / foderblad / ståndare / pistill*, fi *terälehti / verholehti / hede / emi* — native reviewer confirms.
  - Job sentences need verb agreement with the part name's gender/number (fr "Les racines absorbent…" if the part is plural) — the card text and the success sentence are authored per locale per job, never templated.

## 10. Sound off, access, phones
- Sound off: water column, pools, glowing gaps, run-off, shimmer, falling petals are all visual.
- Keyboard: Tab through tray items; Space picks; arrows move among sockets/tags/parts (socket focus ring); Space places. W = water (drops on the soil), S = sun across.
- aria: sockets "Empty place for the {part}"; live region "The water stopped at the stem — the stem is missing."
- Taps ≥ 44 px (parts ≥ 72 px, tags 44 px discs). Library pictures (foods, decoys, raindrop, sun, bee) ≥ 96 px at 704, ≥ 64 at 360. Plant parts are apparatus, sized by the figure (leaves ≥ 100 px at 360).
- Phone layout §4.

## 11. Distinct from
- **#219 Body Map** (pins with lenses on a body doll — names of body parts): here the parts are assembled and tested by water; naming is one task among five.
- **#221 Everyday Plate** (food groups balance a plate): foods here are classified by the plant part they are.
- **#225 Sorting Cabinet**, **#35 Sorting Chutes**: no conveyor, no grid.
- Batch siblings: #232 Sense Face (organs and senses), #233 Mother and Baby (offspring) — different science, different mechanics.

## 12. Build plan
- **Model:** `{task, partsN, placed:{root,stem,leaf:[N1..N5],flower,fruit,seed}, tray:[…], water:{state:'idle'|'flowing'|'stuck', at}, sun:x, tags:{n:part}, food, card, miss}`; `place(part, socket)` (rules: soil line, prerequisites, node list); `water()` → path root→stem→leaves, returns first missing link; `hangFood(food, part)`; `giveJob(card, part)`; `nameTag(n, word)`; `check()`.
- **Gate (own oracle):** the water path stops at exactly the first missing link for every subset of placed parts (exhaustive over 2^6 subsets); roots never snap above SOIL_Y; fruit never snaps without the flower having been there; every food's part comes from the table and potato/onion/garlic never appear; crates only receive no-conflict foods; tag numerals ≤ 2/8 per part; tray first-slot ≤ 40 %; every library picture labelled, no BW (localized markers); every string in 11 locales; the ported geometry equals plant-figure.js output (a byte-compare of the part paths at scale 1).
- **Mutations:** water flows past a missing stem; roots accepted above the soil line; water on a leaf feeds the leaf directly; tomato dropped into the Fruits crate; tag 1 always the root; decoy snaps; a flower-part decoy accepted on a tag; card "makes food from sunlight" accepted on the root.
- **Port, not draw:** `plant-builder-core.js` carries the plant-figure geometry (STEM_D, LEAVES, FLOWER, root laterals, pod, flowerSection, plantStage sprout) as data, generated by a small script `tools/port-plant-figure.js` that requires the primitive and emits per-part SVG groups (`data-part`) — no geometry is re-authored by hand. 0 lines to the primitive itself.
- **Pictures to verify:** beach/sun, weather/raindrop, insects-and-bugs/bee, easter/feather, beach/seashell, toys/ball, kitchen-tools/spoon, accessories/ribbon, vegetables/{carrot, radish, beetroot, celery, asparagus, lettuce, cabbage, broccoli, cauliflower, tomato, cucumber, corn}, fruits/{apple, pear}.
- **BLOCKED status — narrowed, with fallback:** not blocked if the operator accepts the plant-figure line art (already printed on five worksheets) as apparatus. **If refused:** the "pipe plant" fallback — roots as brown branching pipes, the stem as a green tube (both pure geometry, like rails), with library pictures clipped on as parts: `spring/leaf` on the stem nodes, a library flower at the top (8 rounds rotate `flowers/{sunflower, tulip, zinnia, rose, lily, crocus, dahlia, peony}` — the "8+ plants from different library flowers" note), `spring/bud` before it opens, a library fruit for the fruit (tomato/apple), `miscellaneous/acorn` as "a seed". In the fallback the *Flower parts* task is **disabled** (no library petal/sepal/stamen/pistil art exists) and G3-392 stays uncovered until the operator commissions a flower-parts set (petal, sepal, stamen, pistil as separate pictures, colour, same style). Everything else in this design works unchanged on the fallback.

## 13. The four questions
1. **Choose it again?** Yes — a plant you click together and then make drink; dropping water on the leaf "to see what happens" is the best kind of mischief.
2. **Teacher on the board?** Yes — the water path is the lesson: in at the roots, up the stem, out to the leaves; a gap shows itself.
3. **Parent trust?** Calm, honest about tomatoes, no score, library pictures and the same plant drawing as the school worksheets.
4. **The invention:** the plant is a drinking path — water goes in at the roots and climbs to the leaves, so a missing part shows itself as the place the water gets stuck, and water poured on a leaf just runs off.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- **Rendered plant-figure.js and looked at it** (`scratchpad/des/work-c12/pf-full.png`, `pf-section.png`): the full plant and the cut-away flower are clean tool-grade science diagrams in the shell palette — kept as the PRIMARY design, used only as the diagram the child assembles and labels; the plainer `plantStage` pot is limited to the 40 px sprout. The pipe-plant fallback stays only for an operator veto.
- `weather/sun` is cache-only → `beach/sun`.
- Flower parts: the section has no leaf anchor (the draft tagged "leaf"); rounds now tag exactly petal, sepal, stamen, pistil (the G3-392 set) with near decoys first (root — the worksheet's own — leaf, bark, thorn, branch, wing, feather) and balanced numerals.
- The fruit socket is the figure's own pod stalk (the draft had the pod grow "in the flower's place", which the drawing does not do).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
