# #132 — Olive's Kind-Of Tree → THE CLIMBING TREE (L.1.5.b; all 11 locales)

ORDER row 132 · id `olive-kind-of.category-attribute.l-1-5-b` (kept). Design: `designs/132-olive-kind-of.md`.

## Files and wiring
- **New files:**
  - `mini tools/climbing-tree-core.js` (`ClimbingTreeCore`) holds the model:
    - **Three levels:**
      - 1 what kind is it? (10 rounds: picture + clue → one of three or four branches);
      - 2 three groups (8 rounds: nine pictures onto three branches);
      - 3 climb to the definition (10 rounds: the branch, then one of its three twigs).
    - **The leaf:** the sentence for wherever the picture sits, assembled from authored pieces (subject + kind phrase + twig phrase, e.g. "A duck is" + "a bird" + "that swims"). Nothing is inflected at runtime.
    - **Check:**
      - at the roots: a hint, no miss;
      - level 3 with no twig: a hint, no miss;
      - a wrong branch: slides back to the roots;
      - a wrong twig: the branch stays open;
      - miss 2: the right branch (or twig) glows;
      - level 2: the right pictures lock and the rest come home.
    - **The plan:** a fresh order every pass, with the right branch's and the right twig's positions balanced. `_start` never shows an unplanned round.
    - DATA is written by `ct-build.js` from `ct-src.js`. Labels come from the committed picture files.
  - `climbing-tree-activity.js` draws the parts:
    - the tree: perches with wooden signs and a family member, the limbs, the trunk carrying the leaf, and the nest at the roots holding the picture and its clue;
    - level 3's opened branch (its sign, the way back down, three twigs with residents);
    - level 2's fanned stacks;
    - tap or drag.

    The CSS prefix is `ct-`, `apparatusClasses: ['ct-art']`.
  - `climbing-tree-activity.html` loads core and activity at `?v=1`.
  - The old olive files stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `olive-kind-of-activities.json`.
  - `tool` → `climbing-tree-activity`.
  - `params` = `{level: [1–3], clue: [pic, text], branches: [3, 4], rounds}`.
  - en–sv slug, title and intro are frozen; da, no and fi are authored new.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.877.
- **Prose:** en–sv replaced, da/no/fi added. Each prose quotes the locale's own leaf for the duck, and the gate checks that every quote is a leaf the tree writes.
- **Strings:** 31 keys × 11.
- **Visual-QA driver:** `scripts/visual-qa-phases/olive-kind-of.category-attribute.l-1-5-b.js` (rewritten):
  - picked: a wrong branch, the leaf reads it, no hint;
  - missed: back at the roots, with the hint;
  - resolved: the gold leaf, then Next 0.5 s later.
- **Sources** (scratchpad): `ct-src.js` → `ct-build.js`, `ct-strings.js` → `ct-apply.js`, `ct-prose.js`, `ct-manifest.js`, `ct-dump.js`, `ct-probe.js`, `ct-fix1.py` / `ct-fix1b.py`.

## The invention
**A tree whose branches are kinds and whose twigs are kinds of that kind: the path the picture climbs reads out its definition.**
- The leaf shows the sentence for wherever the picture now sits, wrong places included. "A banana is an animal." is a sentence a child can see is false before pressing Check.
- At Check, a branch that is not its kind cannot hold the picture, and it slides back to the roots.
- In level 3, "floats" grows on the vehicle branch and "swims" on the bird branch. The same idea lives on different kinds, so the kind has to come first.

## Deviations from the design (each measured or ruled)
- **Every branch opens its own three twigs in level 3.** In the design only the right branch opened, which would have told the answer before Check. Now a wrong branch zooms too, and its leaf reads the false definition ("A duck is a vehicle that floats.").
- **The leaf shows wrong placements** (composed from the same authored pieces), not only the right one.
- **No end-of-pass tree sway or owl tone.** The gold leaf and the shell's celebration carry the success.
- **Level 2's fanned stacks** show the top card's label only.
- **Phones:**
  - the hint sits at the top of the stage;
  - the clue sits beside the picture in the nest;
  - a solved round hides the spent nest and Check, so the shell's Next fits 320 × 640;
  - with four branches at 320 the signs drop to 13 px;
  - long compound signs carry authored soft hyphens (Verkehrs-mittel, kulku-neuvot, transport-midler).

## Review
ONE native + early-primary pedagogy reviewer covered all 11 locales from a compact dump: every round, every leaf right and wrong, the twigs, strings, prose and the new metadata. The report had 4 must-fix and 26 should-fix findings, applied at the source.
- **Must-fix:**
  - **es "Un camión es"** → "Un camión de carga es", matching the label. In Mexico "camión" alone means a bus. My gate found the same thing on its own.
  - **da:** "billedet" is neuter, so dens → dets and den → det across seven strings.
  - **no:** "slaget" (also "the battle") → "sorten" throughout.
  - **Branch position:** the dump showed the unplanned order. The plan was already balanced and gated; `_start` now always plans.
- **Should-fix:**
  - **Data:**
    - the L1.2 animals member is no longer the chick, which L1.9 sends to the birds;
    - the dress gives way to the scarf in L2.6, since "Kleid" under "Kleidung" told the answer;
    - en sign "clothing" now matches the leaf; da "et stykke tøj";
    - fr woodpecker twig, it owl twig;
    - fi clothes twigs ", joka pannaan päähän / jalkaan / käteen", and baked "jota";
    - pt mitten "luva de dedão".
  - **Strings:**
    - fr: "catégorie", not "famille" (a CP "famille de mots" is a word family), with la/le agreement;
    - pt: the picture's pronoun is "a", and "segurá-la";
    - it instruction; nl twig wording; de/nl/sv/da/no missGroup;
    - da "ledetråd"; no "grein" and "det".
  - **Prose:** "spells out" / "can tell", not "reads out" / "hear" (the leaf is text); the en example rewritten; da/no/fi intros.

## Gates
- **`verify-climbing-tree-core.js`:** 31,157 checks, 0 fail. Its own tables are what every picture IS and what sets it apart, the kinds that may never share a tree, and its own reading of the committed labels. It checks:
  - exactly one branch holds the newcomer, and no two branches clash;
  - every member, resident and level-2 picture belongs only to its branch;
  - exactly one twig fits, and every resident has its twig;
  - every leaf is subject + kind (+ twig), and the subject names the picture;
  - a clue never says the kind;
  - the model;
  - position balance, and the bots ≤ chance;
  - strings × 11, the prose quotes (each a real leaf) and the manifest.
- **`mutate-climbing-tree.js`:** 19 of 19 killed, control survived.
- **`local-test-climbing-tree.js`:** real pointer and one real drag, 11 locales, 320–1366, pictures served case-exactly; levels 1–3, plus levels 1 and 3 with four branches. The full run: **13,935 pass, 2 fail.** Both fails were level 2 at 320 in es and da: labels wrapping to two lines put Check 10 px below the fold. Level 2's tiny spacing was tightened, and the rerun of level 2 at 320/360 in all 11 locales gave **759 pass, 0 fail**. Earlier full runs found the fi/da signs clipped at 320/360 with four branches (now soft hyphens and 13 px signs), Check 2 px past the 320 fold in nl/da/pt, and a measurement taken before a picture had loaded (the test now waits for pictures).
- **`visual-qa-activity`:** PASSED, 240 renders.
- **`audit-activity-hierarchy`:** 482 / 0.
- **`audit-settings-efficacy`:** level, clue and branches all change the board.
- **`audit-activity-next-delay`:** pass. Content × 11, prose claims, SERP copy, content tells and route preflight: pass.

## Live
<LIVE>
