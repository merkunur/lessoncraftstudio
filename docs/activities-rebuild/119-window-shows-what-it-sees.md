# #119 — Lumen's Lighthouse Windows → THE WINDOW THAT SHOWS WHAT IT SEES (RL.1.6; all 11 locales)

ORDER row 119 · id `point-of-view.who-told.rl-1-6` (kept). Design: `designs/119-point-of-view.md`.

## Files and wiring
- **Files:**
  - `mini tools/point-of-view-core.js` is rewritten in place (`LumenWindowsCore`; the old core was this activity's own and is loaded by no other page). It holds the model:
    - Level 1: twelve rounds (event, the storyteller's line, its view, who sits at which window), one per locale;
    - Level 2: eight three-line stories (each line's teller; a part line or a view line);
    - the checks, the hints, the help from miss 2, the plan (never one window three rounds in a row).
    - DATA is written by a build script that checks every mark against its line.
  - `point-of-view-activity.js` is rewritten. It draws the story card, the lighthouse (a drawn tower, the lamp, three framed windows), the view panel or three view strips, the Level 2 rails, Check and Lumen's logbook (CSS prefix `pv-`, `apparatusClasses: ['pv-towerart', 'pv-viewart']`).
  - `point-of-view-activity.html` loads core `?v=2` and activity `?v=10`, and drops its `#lcs-root{height:100%}` pin.
- **Manifest:** the row stays in `point-of-view-activities.json`.
  - `params` = `{task: [window, tellers], views: [after, all], rounds: {window: 12, tellers: 8}}`; the old rounds are retired (in git).
  - en, de, fr, es, pt, it and nl slug, title and intro are frozen.
  - **sv, da, no and fi slug, title and intro are authored new.**
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.863.
- **Prose:** en, de, fr, es, pt, it and nl replaced; sv, da, no and fi added. Every quoted line is in the data.
- **Strings:** 39 keys × 11.
- **Sources** (scratchpad): `pv-src.js` (every locale's text) → `pv-build.js` (round meta, marks, DATA); `pv-strings.json` → `pv-apply.js`; `pv-prose.js`, `pv-manifest.js`, `pv-dump.js` (the review dump), `pv-qcheck.js`, `pv-e-*.js` (edits), `pv-probe.js`.

## The invention
**Each window shows the harbor exactly as its creature sees it.**
- **High:** the horizon near the top, wide water, the object a drawn dot far below (never a shrunken picture).
- **Middle:** the object straight across, on the horizon, inside the frame.
- **Low:** the object so huge it rises out of the bottom and is cut off by the frame.
- The storyteller is the one whose view matches the words: "The boat looked like a tiny dot, far below me." On Check, Lumen's lamp shines on the chosen window; the right one waves and a page goes into Lumen's logbook.
- **Level 2:** three lines of one story hang on the windows of their tellers. Each line names a body part only its teller has (wings and beak; a long thin tail and squeaking; long ears and big back feet; pincers, a shell, walking sideways) or a view only its window gives. One creature may tell two parts.

## The two tasks
- **From which window?** — 12 rounds, views 4 / 4 / 4, the answer creature 3 / 3 / 3 / 3, never one window three rounds in a row.
- **Who tells each part?** — 8 stories; a creature tells two parts in two of them; part 1 belongs to the high window in three.

## Deviations from the design (each measured or ruled)
- **One story card** (the event picture, the event, the storyteller's words in a speech bubble) in place of separate event and line cards: on a phone the two cards pushed Check below the fold.
- **The views lie beside the windows they belong to** when all three show (miss 2, or the "always all three" setting): each window's strip is on its own row, so the child compares view and window at a glance.
- **Level 2 miss 2 lists each creature's parts** under its window ("wings · beak") instead of marker dots on the picture: library pictures carry no part coordinates.
- **Lumen sits beside the lamp on wide screens only**, and on the smallest phones (under 300 px) the lamp steps aside too; the windows are 70 px there (pictures 64).
- **The pelican waddles onto the rocks** instead of swooping (review: the library pelican is standing).
- **The success line for Level 2** says every part went to its teller instead of listing three names (two stories repeat a teller).
- **No long-press read-aloud.**

## Pictures
18 pictures, all checked by eye on the contact sheet: seagull, mouse (long thin tail visible), rabbit (long ears), crab, owl (Lumen), boat, sailboat, fish, whale, jellyfish, dolphin, pelican (standing), kite, balloon, helicopter, butterfly. The crab round has no crab at a window.

## Review
ONE native + Grade-1 reading reviewer over all 11 locales.
- **MUST, applied:**
  - **The pelican (×11):** every line had it swooping; the picture stands. Now it lands on the rocks and stands right under the low window.
  - **fr:** "il m'a éclaboussé" agreed with the teller and gave away a masculine storyteller → "il a envoyé de l'eau sur ma figure".
  - **no:** "alt bitteliten" → "alt bitte lite" (agreement), in the view description and the page intro.
  - **fi:** "lasken" (descend / count) → "laskeudun"; "Töminöin" → "Tömistän maata"; an ungrammatical flying line rewritten; "minkin" → "minkäkin" (string and prose).
  - **en:** a broken skills line in the prose.
- **SHOULD, applied:**
  - **Sail and whale (×11)** said only "tiny, far away" — true from any window out to sea — so each now says *below* as well.
  - en "came into the harbor" (a motor boat does not sail), "not higher, not lower", no "too" on a teller's first line.
  - de *geradeaus … genau gegenüber*, a clearer miss-2 hint; fr four Level 2 lines; es, pt, it flying and stamping lines; nl *zeilboot* (not white), *huppel*, *het hek* (not a ship's *reling*), *recht vooruit*; sv / da / no crab lines (a crab cannot pull itself into its shell → presses its shell against the stone), *Här uppifrån / Her oppefra*, *rakt fram / lige ud / rett fram*; fi *juustoa*, *kantaa minua*, the low view description.
- **Kept, with reason:** the creature names stay the shipped ones (de *Ben*, nl *Bas*…; the crab's name implies no other animal).
- **Open (frozen metadata, not edited):** the de page title names Klasse 2 and the fr title CE1; the en..nl intros describe tapping the window only.

## Gates
- **`verify-point-of-view-core.js`:** 11,397 checks with its own ground truth (the en answer table, each locale's view words per window and each creature's body-part list with the shared parts banned, written in the gate). It covers:
  - Level 1: views 4 / 4 / 4, answer creature 3 / 3 / 3 / 3, no event object at a window, every line holds its own view's words and none of the other two;
  - Level 2: every part line names a part of its teller only, no banned part, every view line holds only its window's words, two stories with a repeated teller, part 1 high ≤ 3;
  - every window of every round; all 27 ways to hang every story (only the right one solves, the right parts stay, the hint names the creature at the wrong window and the part it lacks);
  - the plan; strings ×11 and the manifest.
- **`mutate-point-of-view.js`:** 14 of 14 mutations killed, and the control survived.
- **`local-test-point-of-view.js`:** real pointer, 11 locales.
  - The scenarios: the settings; the panel empty before a choice; an empty Check; the high window → a drawn dot and never a picture; the middle → the object inside the frame; the low → the object cut off by the frame; a wrong window → the view hint and the underlined view words; miss 2 → three views side by side; a new choice removes them; the right window → the success line naming the creature, the wave, a logbook page; all three views as a setting; Level 2 nudge, empty Check, a part on and off its window, every part wrong → the hint naming the creature at the wrong window, miss 2 → each creature's parts listed, the right windows → success; the animated beam.
  - Then every round of both tasks at rest / miss 2 / solved, resized through 320–1366: no sideways scroll; Check above the fold at rest; Check and hint in view at miss 2; the success line in view; controls ≥ 44; pictures ≥ 64 / window creatures and the event ≥ 96 from 704; everything inside the card; no overlapping bands; no word cut off; parts inside their rails.
  - **24,486 pass, 0 fail.** It found: two parts on one window spilling out of the row (rows now grow); the 320 fold (lamp steps aside, tighter windows); three lines 1–13 px over the fold at 320 / 1024 (fr task line, es butterfly and nl helicopter lines shortened, Level 2 spacing tightened).
- **`visual-qa-activity`:** PASSED, 72 renders. **`audit-activity-hierarchy`:** 706 / 0 (the tower, the views and the lamp declared as the apparatus). **`audit-settings-efficacy`:** "task" and "views" both change the board.
- **Preview:** a seed in `generate-activity-previews.js` opens the low window, so the card shows the invention.
- **Renders read** at 360, 704 and 1024 (en, fi): they found the oval glow in the resting panel (now a CSS glow).
- **Content:** `verify-activity-content-<loc>` ×11, `verify-activity-prose-claims`, `verify-activity-serp-copy`, `audit-activity-content-tells` and `preflight-activity-routes` all pass.

## Live
LIVEVERIFY: pending.
