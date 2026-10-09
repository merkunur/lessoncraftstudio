# METHOD — How to Draw (the template for every future expansion)

Operator OBS (2026-10-09): *"document the methods you use for creating these worksheets in detail because they will also serve as templates for future expansions."* This file is that record for `how-to-draw` (K-396 + 10 faces). Sections 1–4 are final (the engine); 5–9 are completed as the batch ships.

## 1 What a page is
A drawing lesson for ONE library drawing: a strip of 4–6 steps (each step adds lines in coral over the earlier lines in ink; the last panel is the finished drawing), plus the face's practice apparatus (a big empty box, a trace, a grid, a scene frame, a shuffled strip, ruled rows, a fold mark). PDF only: no answer key, no screen (the pencil is the point). Every face names its animal; the animal is the UNIT (`unitAxis`), so a future expansion adds animals, never faces.

## 2 Where the drawing comes from — and only from
One B&W library drawing (`cache/themes/<dir>/<noun>@3x.webp`), composed alone at `fit [520, 480]` units. The reviewed pool = the 200 heroes of the Color by Number scenes (`tools/htd-build.js` builds all of them); any other drawing is added with `--src="<dir>/<noun>"` after it was OPENED. Nothing is redrawn: every step is a subset of the drawing's own lines, and the union of the steps IS the drawing (gated pixel-exact: `stats.missing = extra = 0`).

## 3 The engine (how a lesson is derived) — `lib/htd-steps.js buildSteps(src, {steps})`
1. **Ink → parts.** `lib/cbn-lineart.js segmentInk` finds every closed part of the drawing; `silhouette` finds its body.
2. **Step 1 = the outer line**: the ink within 11 px of the paper (the silhouette's outline) — what a child draws first. Measured shares 0.25–0.63 of the ink.
3. **Inner lines → OWNERSHIP by part.** Every inner ink pixel belongs to the SMALLEST part within 14 px of it (a bounded BFS from each part through the ink and the unlabelled ring round it, smallest parts first); a part owns a line only if it is round enough to hold a 2.5-unit disc or ≥ 0.1 % of the body (a sliver — the gap an arm leaves — never owns). Unreached specks join the outline. This replaced connected-component "strokes": a dinosaur's spikes, legs and face lines are ONE connected ink component, which no component grouping can split.
4. **Classes per part:** structure (a part ≥ 3 % of the body: head/body dividers, legs, wings, ears) · features (≥ 0.4 %, not texture: eye rings, markings, paws) · details-thick (a blob thicker than 1.6 × the line: pupils, nostrils) · details-thin (whiskers, fur, hatching: a thin mark under 0.5 % of the ink).
5. **Order:** structure by part size (big first), then everything else top to bottom in 40-unit bands (so a face — eyes, pupils, nose, mouth — is one step), left to right.
6. **Groups:** `steps − 1` groups of roughly equal ink; the structure group closes when the first non-structure line arrives (if it carries ≥ ¼ of a target); a group may close at a change of part or band once it holds 70 % of its target; lines at one height are never split; too many groups → the smallest adjacent pair merges, never the face into the structure step while another pair exists.
7. **Shapes guide:** for the 4 biggest parts, the ellipse of inertia (coverage ≥ 0.75 both ways → ellipse) or the rounded box (fill ≥ 0.72 → box), else none.
8. `stepSvg(S, k, {width, shapes, outline:false, upTo, lastInInk})`, `fullSvg(S, {width, fill, without:[steps]})` render the panels; `stats` carries `outerShare`, `missing`, `extra`, `nSteps`.

`tools/htd-build.js` → `data/htd/<slug>.json` for all 200 heroes (plus `--src`), reading `data/htd/review.js` (`REFUSED[slug]`, `OVERRIDES[slug].steps`). Measured 2026-10-09: 200 built, 0 failed, 0 missing pixels, 4–5 steps each.

## 4 The human read (never skipped)
`node tools/htd-sheets.js --out=<dir>` → one row per drawing (every step, the full drawing, the shapes guide), four drawings per sheet. Read EVERY sheet of the pool a face may pin; a drawing whose strip does not read as a lesson (a step of one speck, a face split across steps, a filled blob counted as outline) gets `OVERRIDES[slug].steps` tried at 4 / 5 / 6, then `REFUSED[slug]` with the reason. The read of 2026-10-09 (sheets 02–05, 07, 08, 10, 13, 17, 25, 29 after the ownership rewrite): cat, dog, rabbit, dinosaur, elephant, owl, frog, fish, bear, hummingbird, pony, unicorn, butterfly all read as lessons; the panda's black ears count as outline (accepted); the bee's wings come late (accepted).

## 5 The eleven faces (build)
(the final `K-396-how-to-draw.md` §3 is the contract; this section records what shipped: unit slug per face and locale, steps override, box sizes)

## 6 Native text (build)
(titles ×11 naming the animal in the locale's form via `unitAxis.tokens`; the F5 noun = the vocab word, traceable; the F9 starters; the fold word)

## 7 Gates before publish (build)
`qa/verify-b7-how-to-draw.js` (+ poisons: a step removed → union ≠ drawing; the order face in true order; a solid trace; a 3×4 grid; a hero inside the scene frame; a refused slug rendered) · `seo-landing/gate.js` · `verify-hub-type-rows.js`

## 8 SEO (build)
(per-animal heads per locale; "directed drawing" in EN; the landing audit; IndexNow; what was measured after 90 days)

## 9 Traps paid for (running list)
- Connected components cannot split connected inner lines — own the pixels per part.
- Tiny eye whites fall under an area-only sliver threshold and the head claims the eye lines; the sliver test must be about SHAPE (inscribed radius), not area.
- Merging "the smallest adjacent groups" folds the face into the structure step; protect the structure boundary.
- A short line that separates a big part (a leg) is structure however short it is — a texture rule keyed on stroke length alone demotes legs.
