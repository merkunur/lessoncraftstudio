# #115 — Granny's Mending Basket → THE THREAD THAT SNAPS BETWEEN TWO WORDS (RF.1.4.a; all 11 locales)

ORDER row 115 · id `mending-basket.mend-page.rf-1-4-a` (kept). Design: `designs/115-mending-basket.md`.

## Files and wiring
- **Files:**
  - `mini tools/mending-basket-core.js` is new and holds the model:
    - six clues, the keystone, the snap (what the thread broke between);
    - Do operations judged per instruction word;
    - the hints, the help from miss 2, and the plan;
    - DATA is written by a build script from authored text and shared structure, and checks every keystone and cue against its sentence.
  - `mending-basket-activity.js` is rewritten. It draws the torn page, the hole, the SVG thread (held, or two frayed halves), the picture panel, the Do scenes (crayon rings, sticker places), the basket and Granny's book (CSS prefix `mb-`).
  - `mending-basket-activity.html` loads the new core in place of `mend-page-core.js`. That file has a 0-line diff and is no longer loaded by any page (removing it is an operator step). The html also drops its `#lcs-root{height:100%}` pin, so the iframe follows the card.
- **Manifest:** the row stays in `mending-basket-activities.json`.
  - `tool` and `task_template` are unchanged; `params` mirror the core.
  - en slug, title and intro are frozen.
  - **de, nl, fr, es, it, pt, sv, da, no and fi slug, title and intro are authored new** and were reviewed.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.859.
- **Prose:** en replaced; the ten other locales added.
- **Strings:** 54 keys × 11.
- **Sources** (scratchpad):
  - `mb-src.js` (the text of every locale) and `mb-shared.js` (pictures, scenes, operations, truth, proof) → `mb-build.js` (checks, the length bots, then DATA);
  - `mb-strings.json` → `mb-apply.js`;
  - `mb-prose.js`, `mb-manifest.js`;
  - `mb-fix1.js`, `mb-review-fix.js`;
  - `mb-sheet.js` (contact sheet), `mb-dump.js` (the review dump).

## The invention
**A sewing thread that only holds where the words agree.**
- Every round names its keystone, the word the meaning hangs on.
- Check sews: the long red stitch runs from the mended piece to the keystone.
  - It holds: the page turns from grey to colour and a leaf is bound into Granny's book.
  - Or it snaps exactly between the two words that disagree: both glow, and the frayed ends hang there.
- **Fix:** a right word "fixed" snaps between that word and the keystone.
- **Do:** the thread snaps at the instruction word that was not obeyed (the count, the colour, the ordinal, the place).
- **True or not:** the deciding word.
- **Story:** the thread looks for the proof sentence, which is shaded from miss 2.

## The six clues
- **Fill the gap:** includes the soup minimal pair (same pieces, opposite keystone).
- **Fix the word:** tap the word that does not fit (the needle unpicks it), then mend the hole.
- **Who is it?:** the nearest noun is always among the wrong pieces.
- **Do what it says:**
  - a crayon, then ring pictures (a coloured halo; the library picture is never recoloured);
  - or lift a sticker and tap its place: on, under, beside, above or in front.
- **True or not?:** the needle sews a true sentence in, the scissors cut a wrong one out (5 true / 4 not).
- **Story questions:** three four-sentence stories with three questions each, in story order.

## Deviations from the design (each measured or ruled)
- **No Help setting.** Letter boxes, Longer pages and Two pictures are not built; the six clues carry the worksheets' skills. Recorded for the operator.
- **Do: "then" is not graded as an order.** Two placements are judged by the end state, which is the same either way.
- **Placing is tap the sticker, then tap the place.** The five places show as faint rings while a sticker is lifted; there is no drag.
- **True or not:** round 9 is "the cat is by the door" (the cat-with-a-bow composite needs art that does not exist).
- **No free play** with the needle between rounds.
- **Story at the narrowest width:** the page turns between the story and its question (the design's page turn). Below 560 px the story's decoration pictures are dropped. Text stays ≥ 18 px.
- **The library balloon is green.** The crayon rings the picture, so "color two balloons red" is answered by red rings.
- **Rebuilt per locale, not translated.** Scenes and truth are shared; every sentence was authored natively. Gendered languages keep the three pieces in one gender and case. fr keeps the subject of the Who rounds a full noun phrase.

## Pictures
All 42 pictures were checked by eye on the contact sheet. The lamp (Fill 4) and the coat (Fill 6) sit under a torn paper patch until the page heals, because they would show the answer.

## Review
ONE native + Grade-1 reading reviewer over all 11 locales. Truth values, proofs, cue words and the minimal pairs were confirmed.
- **MUST, applied:**
  - **Second right answers** in the Fix candle and fire rounds: sv / da / no / fi *blött / vådt / vått / märkää* made a sensible sentence. They are now *runt / rundt / pyöreää*, and the fire rounds use a causal "så / joten" frame. fr's fire round uses the same frame.
  - **es / it / pt last Do round:** *arriba* / *sopra* / *acima* collided with "on". The bird is now "flying above, without touching it".
  - **nl:** *eruitgeknipt*.
- **SHOULD, applied:**
  - the hintTrue2 template works with any word ("Think about {w} …");
  - aRinged reads naturally;
  - Nordic and fi swimsuit → swim trunks (a boy);
  - en *lively* → *awake*;
  - de "Worum ging es …", "ans Regal herankam", "Genau so, wie …";
  - nl *Oma's* with ’;
  - fr *la balle* for the ball, "jusqu'à la maison", "au mot {w}";
  - es *chamarra*;
  - it "sulla parola {w}";
  - pt "Tem …";
  - sv *korv* (not Ben / ben), "vinkade åt", "den fisk som är mellan …";
  - da "for tung til at bære", the keystone *spist*, "den fisk, der er mellem …";
  - no *spist*, "den fisken som er mellom …";
  - fi *äänekkäästi*, *kannettavaksi*, "Kuvassa on …", "Lue sana {w}", *sanojen*.
- **Kept, with reason:** es "Comprobar" is the house wording across shipped es activities. The fr / it apostrophe finding was in the review dump only: the shipped strings carry ’ and narrow spaces, which the gate checks.
- **Open (frozen metadata, not edited):** the en intro still describes the old activity ("put the pictures in order", UK spelling). The operator decides.

## Gates
- `verify-mending-basket-core.js` — 10,634 checks with its own ground truth (the en answers, keystones, wrong words, truth values, Do operations and story proofs written in the gate; the picture index re-read). It covers:
  - every keystone and cue is a word of its sentence;
  - the minimal pair;
  - enumerating EVERY ring / placement, each Do round passes in exactly the expected number of ways (index rounds once, "two balloons" in C(5,2) ways), and the gate's own solution passes;
  - every wrong piece snaps at the keystone and the hole; a right word "fixed" snaps; only the right tool;
  - help only from miss 2, gone after a new move;
  - the length bots ≤ 4 of 9;
  - the plan (slots 3 / 3 / 3, never twice running; True never four running; story order);
  - strings × 11;
  - the manifest.
- `mutate-mending-basket.js` — 15 / 15 killed, control survived. Two mutations survived at first (ordinals counted from the right; the right piece always in the middle); the gate gained its own Do solution and every slot.
- `local-test-mending-basket.js` — real taps in all 11 locales:
  - the scenarios;
  - every clue × round at rest, at miss 2 and solved, through 320…1366 (at 320 the story page is turned by a real tap).
  - Count: 65,604 checks, 0 fail.
- `visual-qa-activity` 54 / 54 · `audit-activity-hierarchy` 302 / 0 · `audit-settings-efficacy` (clue live).
- preflight-activity-routes · prose-claims · SERP copy · content-tells · activity-content × 11 — all green.
- 0 lines to shared cores or lcs-shell.

## Live
LIVEVERIFY
