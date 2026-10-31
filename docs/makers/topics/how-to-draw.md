# Maker: How to Draw (`how-to-draw`)

Group **art** · language need **little** · 11 existing templates + 2 new · replaces old app(s): —

## Settings a teacher sets

- picture
- steps 4-6
- task: steps / trace / finish / grid / scene / order / memory / write
- step layers editable (screenshot 7)
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Templates from today's worksheet types

**Draw a picture step by step (simple shapes, trace then draw, finish the drawing, draw and write)**

- `K-396` How to Draw {L} Step by Step — Look at the four numbered steps and draw the cat on the big paper: first the outline, then the new lines you see in each step. (scripts/worksheet-gen/types/k/K-396-how-to-draw.js)
- `K-401` Draw {L} with Simple Shapes — Go over the dotted shapes already on the paper, then draw the dog's outline around them and finish it with the steps. (scripts/worksheet-gen/types/k/K-401-draw-with-simple-shapes.js)
- `K-402` Trace, Then Draw {L} — Trace the grey rabbit with your pencil, then draw the rabbit yourself in the empty box beside it. (scripts/worksheet-gen/types/k/K-402-trace-then-draw.js)
- `K-403` Finish the {N} Drawing — Look at the whole horse, draw the lines that are missing on the second horse, then draw a horse of your own below. (scripts/worksheet-gen/types/k/K-403-finish-the-drawing.js)
- `K-404` Draw {L} and Write the Word — Follow the steps to draw the fish on the paper, then trace the word under it and write it once more. (scripts/worksheet-gen/types/k/K-404-draw-and-write-the-word.js)

**Copy a picture square by square onto an empty grid (visual-spatial, row/column tracking)**

- `G1-416` Draw {L} with the Grid — Look at the dinosaur on the grid and draw it on the empty grid one square at a time, then once more without the grid. (scripts/worksheet-gen/types/g1/G1-416-draw-with-the-grid.js)

**Follow drawing steps, draw a figure in a scene, order drawing steps, copy each step**

- `G1-417` Draw {L} at the Pond — Follow the steps, then draw the frog on the empty pond in the picture. (scripts/worksheet-gen/types/g1/G1-417-draw-it-in-the-scene.js)
- `G1-418` Order the Steps: Drawing {L} — The steps are mixed up: write 1 to 5 in the boxes beside them in the right order, then draw the owl. (scripts/worksheet-gen/types/g1/G1-418-order-the-drawing-steps.js)
- `G1-419` Copy Each Step: Draw {L} — Draw what you see in each step in the box under it, adding the new lines as you go, then the whole bird, bigger, on the paper below. (scripts/worksheet-gen/types/g1/G1-419-copy-each-step.js)

**Draw by steps then write about it; draw from memory**

- `G2-390` Draw {L}, Then Write About It — Draw the bear with the steps, then write three sentences about your bear on the lines, starting with the printed words. (scripts/worksheet-gen/types/g2/G2-390-draw-then-write-about-it.js)
- `G2-391` Draw {L} from Memory — Look at the butterfly, fold the page back on the dotted line so you cannot see it, and draw it from memory on the big paper. (scripts/worksheet-gen/types/g2/G2-391-draw-from-memory.js)

## New templates to add

- **Directed drawing with shapes only (circle + triangle animals)** — the youngest level
- **Draw it bigger on the grid (enlarge)** — scaling

## FABLE-QUESTIONS (answered before the build)

1. [how-to-draw-Q1] Screenshot 7 shows library art split into editable step LAYERS. Today lib/htd-steps.js derives steps from the ink automatically (data/htd 53 MB, htdx 127 MB). Decide: precomputed layers per picture + an editor to toggle/reorder them, or live derivation in the browser — and what happens with a teacher's own image.
