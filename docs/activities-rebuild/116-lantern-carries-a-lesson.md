# #116 — Juniper's Story Lantern → THE LANTERN THAT CARRIES A LESSON (RL.1.2; all 11 locales)

ORDER row 116 · id `juniper-story-lantern.central-message.rl-1-2` (kept). Design: `designs/116-juniper-story-lantern.md`.

## Files and wiring
- **Files:**
  - `mini tools/juniper-story-lantern-core.js` is new and holds the model:
    - ten fables per locale, each with its lesson, detail (and the pane it comes from), wrong lesson, another fable's lesson, pictures and a new story;
    - the light table (which panes glow, the ending, how far the beam goes);
    - Retell (two taps swap panes), the hints, the help from miss 2, and the plan (balanced lesson slot, moved by one each pass).
    - DATA is written by a build script that checks every detail against the pane it came from. A tie between two panes is an error.
  - `juniper-story-lantern-activity.js` is rewritten. It draws:
    - the story window and its three panes;
    - Juniper, the SVG lantern and the firefly jar;
    - the beam and the new story's window;
    - the card tray.
    - CSS prefix `jl-`.
  - `juniper-story-lantern-activity.html` loads the new core in place of `central-message-core.js`. That file has a 0-line diff and no page loads it any more (removing it is an operator step).
- **Manifest:** the row stays in `juniper-story-lantern-activities.json`.
  - `params` = `{task: [lesson, retell], cards: [3, 4], fables: 10}`.
  - en, de, fr, es, pt, it and nl slug, title and intro are frozen.
  - **sv, da, no and fi slug, title and intro are authored new.**
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.860.
- **Prose:** en, de, fr, es, pt, it and nl replaced; sv, da, no and fi added. Non-en prose names the national framework only.
- **Strings:** 34 keys × 11.
- **Sources** (scratchpad):
  - `jl-kept.json` (the shipped fables) and `jl-src.js` (FIX, the new fables, the Nordic and Finnish text, pictures, the next stories) → `jl-rev.js` (the review fixes) → `jl-build.js` (checks, the length bots, then DATA);
  - `jl-strings.json` → `jl-apply.js`;
  - `jl-prose.js`, `jl-manifest.js`, `jl-dump.js` (the review dump), `jl-sheet.js` (contact sheet), `jl-qcheck.js` (every prose quote is in the data).

## The invention
**A lantern whose light shows what a card really is, and carries a lesson into a new story.**
- A lesson lights all three panes, the ending glows warm, and the beam reaches a new everyday story (Ana practicing the piano), which opens: a lesson is something you can take with you.
- A detail lights only its own pane, and the beam fizzles halfway.
- A wrong lesson leaves the ending pane cold, and the beam stops.
- Another fable's lesson (four cards) lights nothing, and the new story stays behind glass.
- Nothing lights before Check. One card sits in the lantern at a time.
- From miss 2 the ending glows and the new story brightens. Any new move takes the help away.
- **Retell:** the three panes start shuffled (never in order). Tap two to swap them. The right order joins the panes and opens the lantern. Miss 2 lights the first part.
- Each lesson found puts a firefly in the jar.

## Deviations from the design (each measured or ruled)
- **No free play** (dimming the lantern, tapping fireflies to re-read lessons). The jar counts the pass.
- **Retell is tap-to-swap only.** There is no drag.
- **The lantern shows no card text.** The card glows in the tray instead, so the lantern stays a picture of light.
- **The wind fable's fourth card is the wolf's lesson, not the crow's** (reviewer): "A clever idea solves a problem" also fits the Sun.
- **Layout is stacked** (RULINGS):
  - from 560 px: story window, then Juniper, the lantern and the jar beside the new story, then the cards;
  - below 560: story, lantern row, cards, Check, hint, then the new story;
  - on the 320 phone (card under 300 px): the lantern and the jar stand beside Check, and panes and cards are tighter. Text stays ≥ 15 px, pane buttons ≥ 44 px.
- **No cicada or cricket picture exists.** Every locale's ant fable now names the grasshopper the picture shows: sauterelle / chapulín (es-MX) / gafanhoto / cavalletta / Heuschrecke / sprinkhaan. The grasshopper is also Aesop's own version.
- **fr lion fable:** *souris* (the picture is a mouse). **pt goose fable:** *a galinha dos ovos de ouro* with the hen picture (the Brazilian telling; fr / es / it already used the hen).

## Pictures
All 28 pictures were checked by eye on the contact sheet. Juniper is the library hedgehog.

## Review
ONE native + Grade-1 reading reviewer over all 11 locales (stories, cards, next stories, strings, prose).
- **MUST, applied:**
  - **Bear fable, all 11 locales:** the ending did not disprove "Save yourself and forget your friend" (the selfish friend got away safe; it even said the reverse). Pane 3 now gives the friend left behind the last word ("You ran off. I won't walk with you again.").
  - **Wind fable's fourth card** could also be right → the wolf's lesson.
  - **Crow detail in de / es / da** lit the wrong pane. My gate found da first; the builder's new tie check then found de and es. All now come from pane 3.
  - **Ant fable fr / pt / it** had two possible retell orders. These are now summer → winter → hunger. it no longer copies the lesson's words.
  - **it** ant lesson comma; **fi** wolf lesson *siihen* → *häneen*.
  - **Pictures:** the grasshopper / mouse / hen changes above.
- **SHOULD, applied:**
  - **en:** "The Grasshopper", "Wolf!" in quotes, "Telling a fib for fun never hurts", "Three times Max said …", "lose it all", *practicing*.
  - **de:** *Der Schnellste gewinnt immer*, "es fiel kalter Schnee", "kam an ihn heran", *Freundlichkeit*, *schubsten und schubsten sie*, "Juniper, der Igel,".
  - **fr:** *Le vent*, "C'est dans le danger qu'on voit ses vrais amis", "Si tu mens, on ne te croit plus", "il peut boire", "Quand un vrai loup …", *trop pressé*, "il n'a plus d'œufs", "chacun leur tour".
  - **es:** "presumía de ser", "se agarró fuerte el abrigo", *presiona*, the Retell label "Ordenar el cuento y luego la enseñanza".
  - **pt:** "deixou o ratinho", "conseguiu pegar a bola", "e bebeu", "se revezaram", "no riacho", okLesson.
  - **it:** *morse*, *dei lacci*, "poterono andare sull'altalena", hintWrong, "Ginepro, il riccio,".
  - **nl:** "'Wolf!', en …", "Een grapje kan nooit kwaad", "De boer wilde al het goud in één keer", "Meer pakken is altijd beter".
  - **sv:** *Sakta men säkert kommer man fram*, "det föll kall snö", "släppte ner småstenar i kannan", "ett löv till den", prose sentences.
  - **da:** *Langsomt, men sikkert når man frem*, *rigtig syg*, "der kom ikke flere æg", *blive tilbage*, prose.
  - **no:** *Sakte, men sikkert kommer man fram*, "det falt kald snø", prose.
  - **fi:** "kulki ja kulki ja", *leijonan*, *luudalla*.
- **Re-measured after the fixes:**
  - the length bots;
  - fr needed a longer wrong card in the ant, wind and crow fables. The crow card is now "give up when it's hard" (the pt card), which the ending disproves.
- **Kept, with reason:** es "Comprobar" is the house word across shipped es activities.
- **Open (frozen metadata, not edited):** the de / fr / es / pt / it / nl page titles name the grade as it was shipped. The operator decides.

## Gates
- **`verify-juniper-story-lantern-core.js`:** 11,824 checks with its own ground truth (the en lessons and detail panes, and the light table, written in the gate). It covers:
  - ten fables in the same order ×11; the detail shares words with its own pane, and more than with any other pane;
  - wrong and lesson cards are not story sentences; the other card is another fable's lesson; four different cards ≤ 60 characters; every picture exists in a colour theme;
  - every slot, every card: the light after Check, only the lesson finishes, one card at a time, nothing lit before Check, help only from miss 2 and gone after a new move;
  - Retell: every start order, never starting solved, real swaps, the latch;
  - the length bots ≤ 4/10 for 3 and 4 cards in every locale;
  - the plan: a fresh order each pass, the slot balanced and moved by one, retell starts never in order and never the same twice running;
  - strings ×11 and the manifest.
- **`mutate-juniper-story-lantern.js`:** 13 of 13 mutations killed, and the control survived. The mutations:
  - a detail lights all panes; a wrong lesson lights the ending; the beam reaches on a detail;
  - another fable's lesson accepted; retell accepts a wrong order; retell may start in order;
  - the lesson always first; light before Check; the same order every pass;
  - the first card stays; help before miss 2; the slot table frozen; a digit in a hint.
- **`local-test-juniper-story-lantern.js`:** real pointer, 11 locales.
  - The scenarios: empty Check, card in and out, detail / wrong / lesson lights, miss-2 help and its removal, four cards with another lesson, Retell miss 1 / miss 2, the swap, the latch, then the lesson.
  - Then every round of Lesson × 3 and × 4 cards at rest / miss 2 / solved, and Retell at rest / solved, resized through 320–1366:
    - no sideways scroll; Check above the fold at rest; Check and hint in view at miss 2; the success line in view;
    - controls ≥ 44, pictures ≥ 64 / ≥ 96 from 704;
    - nothing outside the card, no overlapping bands, no text cut off.
  - **32,483 pass, 0 fail.**
- **`visual-qa-activity`:** PASSED, 60 renders. **`audit-activity-hierarchy`:** 450 / 0. **`audit-settings-efficacy`:** task and cards both change the board.
- **Content:** `verify-activity-content-<loc>` ×11, `verify-activity-prose-claims`, `verify-activity-serp-copy`, `audit-activity-content-tells` and `preflight-activity-routes` all pass.
- **Renders read** at 360, 768 and 1024. The resting new-story window was too dim to read (opacity .55). It is now .82, white on slate.

## Live
LIVEVERIFY
