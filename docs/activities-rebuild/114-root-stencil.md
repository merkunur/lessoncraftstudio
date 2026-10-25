# #114 — Build Words with Endings → THE ROOT STENCIL (RF.1.3.f; en de nl fr es pt sv da no fi)

ORDER row 114 · id `syllable-builder.build-endings.rf-1-3-f` (kept). Design: `designs/114-syllable-builder.md`.

## Files and wiring
- **New files:**
  - `mini tools/root-stencil-core.js` holds the model:
    - the stencil (one window per root letter, and the leftover);
    - Find (lay a card), Peel (the line between letters), Add (a sleeve on the root);
    - Check, the hints, the miss-2 reveal and the plan;
    - the DATA block is written by a build script from authored tables and checked against the picture index.
  - `root-stencil-activity.js` draws the ending hooks, the picture, the wooden frame with the word and the stencil, the cards, the sleeves and the sentence (CSS prefix `rs-`).
  - `root-stencil-activity.html`.
- **Manifest:** the row STAYS in `syllable-builder-activities.json`, and only this row's text is replaced (the sibling row is hand-formatted).
  - `tool` is now `root-stencil-activity`, `task_template` is `root-stencil`, and `params` mirror the core.
  - en slug, title and intro are frozen.
  - **de, nl, fr, es, pt, sv, da, no and fi slug, title and intro are authored new** and were reviewed.
  - **it is refused** (see Deviations).
  - `syllable-builder-activity.*` and `word-builder-core.js` have a 0-line diff.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.858.
- **Prose:** en replaced; de, nl, fr, es, pt, sv, da, no and fi added.
- **Strings:** 39 keys × 10.
- **Sources** (scratchpad):
  - `rs-src.js` (the word tables) → `rs-build.js` (checks, then writes DATA);
  - `rs-strings.json` → `rs-apply.js`;
  - `rs-prose.js`, `rs-manifest.js`, `rs-fix1.js` / `rs-fix1b.js` (review fixes);
  - `rs-sheet.js` (contact sheets), `rs-dump.js` (the review dump).

## The invention
**The root word is a stencil with its letters cut out as windows.**
- Lay a word card in the frame and press Check: the stencil drops onto it.
  - On a word built from the root, every window frames its own letter. The stencil lies flat and the leftover slides into a gold ending sleeve.
  - On a look-alike, a window shows a wrong letter: it turns coral and the stencil rocks.
  - On a trap (en Tricky: *catch* under a cat), every window fits but the leftover finds no sleeve and droops.
- From miss 2 the stencil hovers above the word with its letters showing, so the child compares them letter by letter. A new move takes the help away.
- Every word made hangs on its ending's hook at the top.

**Clues:**
- **Find the root:** four cards.
- **Peel the ending:** tap between the letters where the root ends; Arrow keys move the line.
- **Add the ending:** a sentence's signal word decides the sleeve. A wrong sleeve pops off and the signal lights; at miss 2 a line names the signal.

## Endings per locale (each root survives the ending letter for letter)
| locale | Find / Peel sleeves | Add sleeves (signal) |
|---|---|---|
| en | -s, -ing, -ed | -s (two), -ing (now), -ed (yesterday) |
| de | -e, -en, -s (noun plurals) | -e (ich), -st (du), -t (er / a name) |
| nl | -en, -s | -t (kijk … nu), -en (wij / jullie), -te (gisteren) |
| fr | -s, -x | -s (deux / des), -e (feminine: ma sœur, la fleur, elle), -nt (ils / elles) |
| es, pt | -s, -es | -s / -es after a plural word; the root's last letter (vowel / consonant) decides |
| sv | -ar, -er | -ar (två), -r (titta! nu), -de (igår) |
| da | -e, -er | -er (to), -r (se! nu), -de (i går) |
| no | -er, -en | -er (to), -r (se! nå), -t (i går) |
| fi | -t | -t (kaikki), -ssa / -ssä (missä?; vowel harmony decides) |

## Deviations from the design (each measured or ruled)
- **it is refused:** Italian endings replace the root's final vowel (*gatto → gatti*), so there is no unchanged root to lay a stencil on.
- **Tricky look-alikes are en only.** The design's set B is English. The setting is offered only where a Tricky set exists, set in `init` (the `word-elastic` precedent), and the settings gate shows it live.
- **The other locales' tables** are authored: pictured roots from the library index, plurals and forms where root + ending is plain concatenation, and look-alikes sharing the first two letters. Every table was then checked by the native reviewer.
- **The bots shaped the data.** In nl, es, sv, da and no the answer was the longest card, or (sv, no) the only card with a sleeve ending. Longer look-alikes and other root + ending cards were swapped in until every locale passes: ending-spotting ≤ 4.5 of 9 and longest / shortest ≤ 2.5.
- **Mechanic simplifications:**
  - Peel is a tap between letters (plus Arrow keys), not a drag handle;
  - no free play with the stencil between rounds;
  - no "Hear" button (a laid card and each success are spoken through `LCSAudio` where it is available);
  - after a Find miss the card stays in the frame.
- **Add pictures:** en "two cats", "three dogs" and "all the books" show that many copies. On a phone they wrap at the 64 px floor (96 px at 704 and up).
- **The miss-2 hint never gives the ending.** It names the signal word ("“two” means more than one"), or in es/pt the root's last letter, or in fi the vowels.

## Pictures
All 51 pictures were checked by eye on contact sheets. Every picture shows its word.

## Review
ONE native + Grade-1 reading reviewer over all ten locales.
- **MUST, applied:**
  - **Second right answers.** In nl "Hij ___ in de tuin", sv/da "Varje dag / Hver dag …" and no "Hver dag …", the past tense also fitted. These rounds are now anchored to *now* ("Kijk! … nu", "Titta! Nu", "Se! Nu / Nå"). The narrative-past risk on the other Nordic *nu* rounds got the same anchor.
  - **es/pt hintAdd** pointed to a word in the sentence. It now points to the word's last letter (vowel or consonant).
  - **da:** the prose quoted *huske* (in no round), now *huse*; *toge* is not a word, now *toget*.
- **SHOULD, applied:**
  - en: "every letter from the picture's word"; *jumbo* → *jug*.
  - de: one imperative register (Tipp …), and the nudge no longer says "dann" twice.
  - nl: *kader* for the frame everywhere; "één voor één"; "Woorden die erop lijken"; prose "(-en)", "tik … aan"; the level is groep 3–4 (verb spelling).
  - fr: one name, "Le mot et sa terminaison"; ’ throughout; CP–CE1 (plural -x).
  - es: *sol* → *collar* (many suns is odd); "¡Mira cuántos …!".
  - pt: "caixa de lápis de cor".
  - sv/no prose "(-ar)" / "(-er)"; no "Ord som ligner"; the no definite -en is named in the goals.
  - fi: hintAdd asks "how many, or where" and points to the vowels.
  - da: "I sidste uge".
- **Open (frozen metadata, not edited):** the en intro still describes the old activity ("Read the base word, listen with Hear it, and tap the right ending"). It is frozen landing metadata, so the operator decides.

## Gates
- `verify-root-stencil-core.js` — 8,647 checks with its own ground truth (the locale endings written out in the gate, and the picture index re-read). It covers:
  - every built word = root + a sleeve;
  - the look-alikes (two shared letters, not root + any real ending, plain sets never start with the whole root);
  - another root + ending card in every round, decomposed;
  - the traps (no relatives);
  - the bots;
  - every card → its verdict;
  - every Peel gap;
  - every Add sleeve, popping, and the miss-2 signal;
  - help leaves with a new move;
  - the plan (fresh order, balanced slots, no repeats);
  - strings × 10 (French typography, no digit in a hint, never "free");
  - the setting per locale;
  - the manifest (it absent, en frozen).
- `mutate-root-stencil.js` — 14 / 14 killed, control survived.
- `local-test-root-stencil.js` — real taps, gap taps, Arrow keys and sleeves in all ten locales:
  - the scenarios;
  - every clue × round (en: both look-alike sets) at rest, at miss 2 and solved, through 320…1366.
  - Count: 30,952 checks, 0 fail (the miss-2 state lays the two shortest wrong cards — the worst case for the stencil's width; that case found the stencil overshooting a card shorter than its root at 320 / 360, fixed by reserving the root's width in the letter row).
- `visual-qa-activity` 54 / 54 · `audit-activity-hierarchy` 218 / 0 · `audit-settings-efficacy` (clue and look live).
- preflight-activity-routes · prose-claims · SERP copy · content-tells · activity-content × 10 — all green.
- 0 lines to shared cores or lcs-shell.

## Live
LIVEVERIFY
