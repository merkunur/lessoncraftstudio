# #122 — Hattie's Whose-Is-It → THE HOOK TILE (L.1.1.b; all 11 locales)

ORDER row 122 · id `hattie-whose-is-it.possessive.l-1-1-b` (kept). Design: `designs/122-hattie-whose-is-it.md`.

## Files and wiring
- **Files (new):**
  - `mini tools/hook-tile-core.js` (`HookTileCore`) holds the model:
    - every locale's three levels of nine rounds (owner, lost thing, the words with a slot, the right tile, the tray);
    - the effect of a seated tile (the thing hangs, slips, more owners, a hook dangling empty), Check and its reasons, the hints, the glow from miss 2, the clue at miss 1;
    - the plan: a fresh order, never three rounds in a row with the same right tile, the right tile spread over the tray slots.
    - DATA is written by a build script that checks every picture with its exact case.
  - `hook-tile-activity.js` draws the peg wall (a tag for every returned thing), the owner shelf (a library picture or a name card, the brass peg, the dashed hanging place), the basket, the word bar with its slot, the tray of tiles (a brass hook drawn on every hook tile), Check (CSS prefix `hk-`, `apparatusClasses: ['hk-art']`).
  - `hook-tile-activity.html` loads core `?v=1` and activity `?v=1`.
  - The old `hattie-whose-is-it-activity.{js,html}` stay on disk, unreferenced.
- **Manifest:** the row stays in `hattie-whose-is-it-activities.json`.
  - `tool` is repointed to `hook-tile-activity`.
  - `params` = `{level: [1, 2, 3], hook: [show, plain], rounds: {1: 9, 2: 9, 3: 9}}`; the old rounds are retired (in git).
  - en, de, pt and nl slug, title and intro are frozen.
  - **fr, es, it, sv, da, no and fi slug, title and intro are authored new.**
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.867.
- **Prose:** en, de, pt and nl replaced; fr, es, it, sv, da, no and fi added. Every quoted phrase is a finished bar of that locale (gate-checked).
- **Strings:** 32 keys × 11, plus each locale's two rule hints in DATA.
- **Sources** (scratchpad): `hk-src.js` (every locale's rounds and rule hints) → `hk-build.js` (pictures, DATA); `hk-strings.json` → `hk-apply.js`; `hk-prose.js`, `hk-manifest.js`, `hk-dump.js` (the review dump), `hk-e-rev.js` (the review's fixes), `hk-probe.js`.

## The invention
**A possessive ending is a hook.** Seat the right form in the slot and the lost thing swings up out of the basket onto its owner's peg. The plain plural s (en; fi t) catches nothing: a second owner pops up beside the first, because that is what *dogs* means, and the ball stays in the basket. Where two or three owners already stand on the shelf and nothing waits in the basket, the plural is right and a hook dangles empty. In the other locales every tile is a hook and only the form the language really uses catches; a wrong one slips and the thing drops back.

## The levels (per locale)
- **en:** 1 things and owners (5 possessions, 4 plurals read from the stage) · 2 short sentences, one owner or more · 3 names on name cards mixed with plural sentences.
- **de:** 1 names (*Annas*, *Max'*) · 2 *vom / von der* by the article · 3 both mixed.
- **nl:** 1 names after a vowel (*Anna's*) or consonant (*Bens*) · 2 adds names ending in an s-sound (*Thomas'*) · 3 *van de / van het*.
- **sv:** 1 names (*Annas*; *Jonas* takes nothing) · 2 definite nouns (*hundens*) mixed with s-names · 3 both mixed.
- **da / no:** as sv, with the apostrophe after s/x/z (*Jonas'*).
- **fi:** 1 genitive *-n* or plural *-t* read from the stage · 2 sentences · 3 names with a third, empty tile.
- **fr:** 1 *de / d'* with names · 2 *du / de la / de l'* · 3 mixed.
- **es:** 1 *de* with names, *del* with masculine nouns · 2 *del / de la* · 3 mixed.
- **it:** 1 *di* with names, *del* with masculine nouns · 2 *del / della / dello / dell'* · 3 mixed.
- **pt:** 1 *da / do* with names · 2 with animals and people · 3 mixed.

## Deviations from the design (each measured or ruled)
- **Every level mixes its right tiles.** The design left a constant right tile in seven levels (de, sv, da, no and fi level 1, fi level 2, es and it level 1: every name took `s`, or `de`, or `di`), so "always tap the same tile" won 9 of 9. Each is now a real decision: names that take s against names ending in s/x/z (de, sv, da, no); names (`de`/`di`) against masculine nouns (`del`) in es/it; the genitive `-n` against the plural `-t` in fi, as in en. No tile is right more than 5 of 9 times, except 6 of 9 in en and fi level 3, where the design accepts it because the plural's consequence is visible.
- **Tap, then tap** (a tile into the slot; tap the slot to take it out) instead of a drag.
- **The wall holds drawn tags**, not 40 px pictures (the picture-size ruling). **No decoy things** in the basket (64 px would break the 96 px floor at 1024).
- **The string, the swing and the slip are short CSS motions**, not an animated string shooting across the stage.
- **The success line is the finished words plus one fixed line per locale** ("Yes! Dog's ball — back with its owner!"), not a per-round sentence: the fixed lines carry no agreement with the thing, so no locale needs 27 hand-agreed celebrations.
- **On phones a plural round's empty basket is left out**, so three owners fit on the shelf.
- **Pictures avoided:** the doll (a near-twin of the girl), the donkey (zebra-striped legs), the duck (a duckling).
- **Names swapped:** nl *Lotte* (an unstressed -e takes *Lottes*, not *Lotte's*) → *Eva*; fi *Veeti* → *Eino* (no possible gradation); fr *Hugo* → *Enzo* (the review).

## Pictures
Checked by eye on the contact sheet: pets dog, rabbit, cat; forest creatures squirrel, mouse, snail; spring bird, nest (with two chicks), leaf, caterpillar; camping frog, log; farm animals pig, cow, horse, sheep; toys girl, kite, baby, balloon (green), ball (a football), car (green), boat, robot, train, scooter (a motor scooter), bicycle, bucket (blue pail), dinosaur; vegetables carrot; miscellaneous acorn; At the Supermarket cheese (the folder's capital letters checked against the server's case-sensitive file system); classroom book; accessories backpack, beanie, hat, umbrella.

## Review
ONE native + Grade-1 grammar reviewer over all 11 locales (every round's finished phrase, every tray, the rule hints, the strings, the prose). No wrong right-form, gender or definite form, and no picture mismatch.
- **MUST, applied:**
  - **fr:** *de Hugo* is also accepted ("les poèmes de Hugo"), so the Hugo rounds had two right tiles → *Enzo* (*la voiture d'Enzo*); the h-muet clause left the name hint.
  - **en:** the prose named the activity by a name the page does not use.
- **SHOULD, applied:**
  - en: the twin hint says "the 's tile" (the hooks can be switched off).
  - de: *Apostroph* instead of *Strich* everywhere; a *das* example (*vom Baby*) in the article hint.
  - nl: the vowel rule names a, i, o, u, y (an unstressed -e takes s).
  - es / pt / sv / da / no: the instruction hangs the thing on the owner's *peg*, not on the owner.
  - es: *primer grado de primaria*. pt: level 2 *Bichos e pessoas*. no: *Hvem sin er det?*
  - fi: *Oikein!*, *Hattie hoitaa löytötavaroita*, *Lehmät syövät heinää*.
  - fr: *de l’ ?* with French spacing.
- **Kept, with reason:** the shell title *Hattie's Whose-Is-It* (the design freezes it, and it matches the frozen page title); es-MX *Comprobar* (the Check label of every es activity).
- **Open (frozen metadata, not edited):** the en intro speaks of "the dog's bone" and tapping words; the de / pt / nl titles and intros name Klasse 2 / 2º ano / groep 5 for a grade-1 standard.

## Gates
- **`verify-hook-tile-core.js`:** 18,955 checks, 0 fail, with its own rule table per locale and its own owner genders (every right tile is DERIVED from the owner word). It covers:
  - every picture (exact case, colour theme, never a creature as the lost thing);
  - the model for every round and tile; the mix per level;
  - the plan (fresh order, no three alike in a row, the right tile spread over the slots); the bots (first slot, longest tile);
  - strings ×11, the prose quotes, the manifest.
- **`mutate-hook-tile.js`:** 22 of 22 mutations killed (wrong forms in de, nl, sv, fr, it, pt and es; the plural hanging the thing; a creature as the thing; a fi name with gradation; the right tile always first…), and the control survived.
- **`local-test-hook-tile.js`:** real pointer, 11 locales, 320–1366.
  - The scenarios: the settings; an empty Check (no miss); en/fi the plural in a possession round (one more owner, the thing stays, the twin hint) and a hook in a plural round (it dangles; the plural solves); elsewhere a wrong hook (the thing slips, the rule hint, the clue: the owner's article, or the letter the rule looks at — the first in fr, the last in de/nl/sv/da/no; es/it/pt names have none), miss 2 (the right tile glows), the slot tapped (the tile comes out); the right hook (the thing hangs, the success line, a tag on the wall); name cards; plain tiles; the swing.
  - Then every round of all three levels at rest / miss 2 / solved, resized through 320–1366: no sideways scroll, Check above the fold, the hint and the success line in view, controls ≥ 44, pictures ≥ 64 (≥ 96 wide), everything inside the card, owners on the shelf, no text cut off.
  - **32,836 pass, 0 fail.** It found: three owners spilling off the shelf on phones (the empty basket now gives way); the name clue looking only before the slot, where fr/es/it/pt names come after it — and for those names the rule looks at the first letter (fr) or at no letter at all.
- **`visual-qa-activity`:** PASSED, 54 renders. **`audit-activity-hierarchy`:** 338 / 0. **`audit-settings-efficacy`:** "level" and "hook" both change the board. **`audit-activity-next-delay`:** pass (Next 0.5 s after the result).
- **Preview:** a seed in `generate-activity-previews.js` opens the first round with the ball hanging on the dog's peg.
- **Renders read** at 320, 360, 704, 768 and 1024 (en, de, fr, es, it). They found: the hooks nearly invisible above the tiles; the scene jumping when the thing hung (the space is now reserved, with a dashed hanging place); *de la* running into *chien*; four Italian tiles wrapping below Check at 320; the hook covering the text on the narrowest tiles.
- **Content:** `verify-activity-content-<loc>` ×11, `verify-activity-prose-claims`, `verify-activity-serp-copy`, `audit-activity-content-tells` and `preflight-activity-routes` all pass.

## Live
`live-verify-hook-tile.js` on production, 2026-10-26: **52 pass, 0 fail.** All 11 pages return 200; en, de, sv and fi at 1366 and 390 embed hook-tile-activity.html at wrapper 9.867; with a real pointer, a wrong tile gives its hint and the right tile hangs the thing on its owner's peg with the success line; the iframe grows with the card. The first run fell inside the Cloudflare window (the old iframe was still cached); the rerun was clean.
