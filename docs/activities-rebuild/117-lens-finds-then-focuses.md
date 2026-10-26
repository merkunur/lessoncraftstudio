# #117 — Marlo's Magnifier → THE LENS THAT FINDS, THEN FOCUSES (RL.1.3; all 11 locales)

ORDER row 117 · id `marlo-magnifier.trait-evidence.rl-1-3` (kept). Design: `designs/117-marlo-magnifier.md`.

## Files and wiring
- **Files:**
  - `mini tools/marlo-magnifier-core.js` is new (`MarloLensCore`) and holds the model:
    - eight stories per locale, each with a claim and a question (the ringed word marked), a proof, two clues that did not happen, an in-story clue that proves nothing, an answer and two in-story wrong answers, each with the sentence it comes from;
    - the three cases;
    - the check (the sweep, then the focus), the hints, the help from miss 2, the sweep path, and the plan (a balanced slot table per case, moved by one each pass).
    - DATA is written by a build script that checks every clue against its sentence and measures the bots.
  - `marlo-magnifier-activity.js` is rewritten. It draws the claim card with its ringed word, Marlo (library raccoon), the lens and its dock, the story card with its picture, the clue tray, Check and the case board (CSS prefix `mm-`).
  - `marlo-magnifier-activity.html` loads the new core in place of `trait-evidence-core.js`. That file has a 0-line diff and is no longer loaded by any page (removing it is an operator step). The html drops its `#lcs-root{height:100%}` pin.
- **Manifest:** the row stays in `marlo-magnifier-activities.json`.
  - `params` = `{case: [proof, detail, questions], stories: 8}`; the old rounds are retired (in git).
  - en, de, fr, es, pt, it and nl slug, title and intro are frozen.
  - **sv, da, no and fi slug, title and intro are authored new.**
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.861.
- **Prose:** en, de, fr, es, pt, it and nl replaced; sv, da, no and fi added. Every quoted card is in the data.
- **Strings:** 31 keys × 11.
- **Sources** (scratchpad):
  - `mm-src.js` (every locale's text) → `mm-build.js` (clue-from-sentence checks, the overlap and length bots per case, then DATA);
  - `mm-e-*.js` (every edit, applied by `mm-edit.js`, which refuses a needle found other than once);
  - `mm-strings.json` → `mm-apply.js`;
  - `mm-prose.js`, `mm-manifest.js`, `mm-dump.js` (the review dump), `mm-sheet.js` (contact sheet), `mm-qcheck.js` (prose quotes).

## The invention
**A magnifier that checks a clue twice, in the order a good reader does.**
- **Sweep:** on Check the lens hops along the story sentence by sentence.
  - A clue that did not happen is found nowhere: the lens fogs, even when the card reuses the story's own words.
  - A clue that is there lights its own sentence.
- **Focus:** then the lens swings to the claim (or the question). Only a real proof, or the real answer, snaps the ring around the key word into gold, with a seal; Marlo nods and a case goes on the board.
- **A detail that proves nothing:** the lens finds it, but the ring wobbles. Being in the text is not yet proof.
- From miss 2 the sentence that holds the answer is underlined and the ringed word pulses. A new move takes the help away.

## The three cases
- **Proof:** the proof + two clues that did not happen (both reuse the story's words).
- **Proof or just a detail?:** the proof + an in-story clue that proves nothing + one that did not happen.
- **Questions:** who / what / where / when / why / how long / how many; every card is in the story; one answers the question.

## Deviations from the design (each measured or ruled)
- **The key word is ringed, not blurred.** A child cannot test evidence for a claim it cannot read: with "brave" or "When" blurred, the claim and the question were unreadable (seen on the render). The word stays readable in a dashed focus ring that snaps to solid gold.
- **The lens rests in its dock beside the claim and travels only while it sweeps.** Parked on the story, it covered the words a child has to read (seen at 320 and 704). The miss-2 help underlines the key sentence instead, and the hint says "the underlined sentence".
- **No "Story picture on/off" setting.** 3 of 8 en rounds (and up to 5 in fr) have no true library picture, so the setting would be dead there. Pictures show whenever a true one exists.
- **No free play** with the lens, and **no long-press read-aloud**.
- **Below 340 px** the story picture and Marlo are dropped (the #115 precedent). Below 300 px text and spacing tighten. Text stays ≥ 15 px.
- **Rebuilt per locale, not translated:**
  - en, sv, da, no and fi share the en stories;
  - de, fr, es, pt, it and nl keep their own shipped stories, with new clues written natively.
  - Proofs are paraphrases, and at least one did-not-happen card reuses more of the story's words, so matching words cannot solve a round. The builder measures this per case and locale (≤ 3 of 8).
- **Questions about Max's raking ask "How long…?"** (the answer is a duration).

## Pictures
19 pictures, all checked by eye on the contact sheet.
- **Rounds without a picture:**
  - the shoe-tying stories (de, nl, fr, pt): the library shoe is a loafer with no laces;
  - fr round 5: a biscuit in a pocket, not a cake.
- **es round 4** uses the glass, not the teacup ("vasos").

## Review
ONE native + Grade-1 reading reviewer over all 11 locales.
- **MUST, applied:**
  - **The "curious" proof in es / sv / da / no / fi** said the child asked where the stone came from; the story says how it was formed. A careful reader would reject it. It now says what the story says.
  - **fi:** an ungrammatical adessive (*Pienellä siemenellä kesti…*) → *Pienen siemenen itämiseen meni viikkoja*; *Milloin* + a duration → *Kuinka kauan*.
  - **it:** "Quanti pastelli? → metà" (the story gave no number) → *dieci* / *cinque*. "Played in the sun all afternoon" was true of building a sandcastle (a second right answer) → *fare il bagno in mare*.
  - **fr:** a proof that added a detail the story does not give.
- **SHOULD, applied:**
  - "How long" questions in all locales but de / nl;
  - de *habe*;
  - **fr:** *au bord d'une route*, a wrong card that read as a when-answer, *Qu'est-ce que…*, *le lui*;
  - **es:** *la afirmación*, a shorter wrong card;
  - **pt:** Beto's drawing *para a professora*, the prose wording;
  - **it:** *Luca*, *in soffitta*, *instancabile*, *l'affermazione*;
  - **nl:** *naar de donkere grot*, *Ze* for *Zij*, *de bewering*;
  - **da:** *knurren*, *løbet ud*;
  - **no:** *Hvor gikk Mira hen?*, *kaste bort*;
  - **fi:** *Hänen ystävänsä*.
- **Kept, with reason:**
  - the fr strings carry ’ and narrow spaces (the dump showed the source before the apply step);
  - es "Comprobar" is the house word.
- **Open (frozen metadata, not edited):** the de / fr / es / it / nl page titles name the grade they shipped with (e.g. *Klasse 3*). The operator decides.

## Gates
- **`verify-marlo-magnifier-core.js`:** 10,585 checks with its own ground truth (the en proofs, answers and their sentences written in the gate; its own tokenizer and function-word lists). It covers:
  - eight rounds × 11; one ringed word in every claim and question; no proof names the trait;
  - every story clue shares a word with its sentence; no did-not-happen card is a story sentence;
  - EVERY card of EVERY case: did-not-happen → fog; in-story → its own sentence; only the right card → focus and solved; the sweep path; the help only from miss 2 and gone after a new move; one card at a time; an empty Check is no miss;
  - the bots ≤ 3 of 8 per case and locale;
  - the plan;
  - strings ×11 and the manifest.
- **`mutate-marlo-magnifier.js`:** 13 of 13 mutations killed, and the control survived. The mutations:
  - a did-not-happen card lights a sentence; an in-story card brings focus; a detail accepted as proof;
  - Questions accepts another answer; the detail case loses its in-story card; the right card always first;
  - the lens finds before Check; the first card stays; help before miss 2; the sweep jumps;
  - the same order every pass; the slot table frozen; a digit in a hint.
- **`local-test-marlo-magnifier.js`:** real pointer, 11 locales.
  - The scenarios: empty Check, card in, swap and out; fog; detail → its sentence, no gold; miss-2 underline and its removal; the proof → gold ring, seal, board; the Questions answer; the animated sweep.
  - Then every round of every case at rest / miss 2 / solved, resized through 320–1366:
    - no sideways scroll; Check above the fold at rest; Check and hint in view at miss 2; the success line in view;
    - controls ≥ 44, pictures ≥ 64 / ≥ 96 from 704;
    - the lens and every part inside the card, no overlapping bands, no text cut off.
  - **29,249 pass, 0 fail.**
- **`visual-qa-activity`:** PASSED, 48 renders. **`audit-activity-hierarchy`:** 250 / 0 (the lens declared as the apparatus). **`audit-settings-efficacy`:** "case" changes the board.
- **Content:** `verify-activity-content-<loc>` ×11, `verify-activity-prose-claims`, `verify-activity-serp-copy`, `audit-activity-content-tells` and `preflight-activity-routes` all pass.
- **Renders read** at 360, 704 / 768 and 1024. They found the blur defect, the parked lens covering the story, the "found" light in the fog state, and the laceless shoe.

## Live
`live-verify-marlo-magnifier.js` on production: **52 pass, 0 fail**. All 11 pages return 200 with wrapper 9.861. Real pointer in en, de, sv and fi at 1366 and 390: the in-story detail lights only its own sentence with the locale's hint, then the proof turns the ring gold with the seal. The iframe grows with the card. The first run fell inside the deploy window (the edge still served the old page) and was rerun once.
