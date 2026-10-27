# #133 — Jasper's Just-Right Bag → THE WHAT-FOR TAGS (L.1.5.c; all 11 locales)

ORDER row 133 · id `jasper-just-right.real-life.l-1-5-c` (kept). Design: `designs/133-jasper-just-right.md`.

## The invention
A day is a row of windows: moments with a picture and a sentence ("It is raining outside."), each with an empty hook. Below sits a bag of everyday things, each wearing a **tag folded shut**. The child hangs a thing under each moment and presses Go. The sun crosses the sky, the right things click in, and a wrong thing comes back to the bag **with its tag flipped open** ("for digging"). A miss teaches what the thing is *for* instead of saying "wrong". After a second miss, the untried things hop, with the still-wanted ones among them.

## Files and wiring
- **New files:**
  - `mini tools/what-for-tags-core.js` (`WhatForTagsCore`) holds the model:
    - **Three levels, 8 rounds each:**
      - 1 pack the day: 4 moments, a bag of 6 or 8 things;
      - 2 more than one use: one thing, 5 moments, hang a copy on every moment where it helps;
      - 3 what is it like?: 3 describing words, 6 things, 2 under each word.
    - **Go:**
      - an empty hook (level 2: no copy) is a hint, not a miss;
      - wrong things go home with their tags open, right ones lock;
      - level 2 also counts the moments still missing;
      - miss 2: the untried things hop together with the still-wanted ones (level 2: the moments it still belongs to glow).
    - **Success lines:**
      - level 1: "Just right! beanie – for snow on your head · …";
      - level 2: "Pencil: for writing, for drawing.";
      - level 3: "Soft: pillow and beanie. …".
      - fr uses a narrow no-break space before the colon.
    - **The plan:** a fresh order every pass. Level 1 shuffles the bag with the extras' slots spread over the pass; levels 2 and 3 shuffle the windows and the bag.
    - DATA is written by `wt-build.js` from `wt-src.js`. Labels come from the committed picture files. The build refuses:
      - a moment with two accepted things in its bag;
      - a sentence that names its answer;
      - an umbrella and a raincoat together;
      - a level 3 thing that fits two of its round's words.
  - `what-for-tags-activity.js` draws the parts:
    - the board of windows under a sky with a travelling sun;
    - the hooks;
    - the bag;
    - level 2's single thing card;
    - the hint and Go row.

    Tap or drag. CSS prefix `wt-`, `apparatusClasses: ['wt-art']`.
  - **Phones:**
    - windows two by two;
    - the bag is one sideways-scrolling row (a sideways swipe scrolls; a pull up lifts the thing);
    - a tried thing shows its tag in place of its label;
    - pictures are 56 px only below 310 px of stage (a 320 phone), 64 px from 360.
    - A solved day hides the spent bag and Go at every width, so the result and Next fit.
  - `what-for-tags-activity.html` loads core and activity at `?v=1`.
  - The old jasper files stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `jasper-just-right-activities.json`.
  - `tool` → `what-for-tags-activity`.
  - `params` = `{level: [1–3], bag: [6, 8], words: [text, pic], rounds: 8/8/8}`.
  - en–nl slug, title and intro are frozen; sv, da, no and fi are authored new.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.877 → 9.878.
- **Prose ×11:** en–nl replaced, sv/da/no/fi added. Each quotes the locale's own rain sentence and drink tag, and the gate checks every quote is on the board.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source (`wt-src.js`, `wt-strings.js`, prose).
- **Two right answers.** A spoon mixes batter, so the mix moment became whipped cream. A lamp lights a tent, so it left the tent day. A scarf goes outside, so it left the going-out day. A hammer is loud, so it never hangs beside "loud".
- **Level 3 rebuilt.** Cold and wet never share a round, because an icicle, a snowman and a puddle are all both.
- **Answer-giving words removed.**
  - "The sun is very bright" gave away *sun*glasses / *Sonnen*brille / *aurinko*lasit. It is now "The light outside hurts your eyes" in every locale.
  - fr "brosser" and pt "escovar" gave away the toothbrush; it "occhi" gave away occhiali.
  - nl and da no longer swap to the raincoat (regen → regenjas).
- **The cup.** It now holds hot cocoa: in de, fr, es, pt, it and nl a cup is not for water.
- **Wrong meanings.** fr "chambre noire" (a photographic darkroom), it "ghiacciolo" (an ice lolly), da "paletkniv", the Dutch hard/zacht loud/quiet clash, three Finnish tags that did not parse, de "Für mehr als eins".
- **"Feel" did not fit "loud".** The level is now "What is it like?" in every locale.
- **Many should-fixes:**
  - es feminine agreement with *cosa*;
  - the no bag is now *sekk*;
  - sv jacka, öppen spis, bullrigt;
  - pt maiô; es pico de hielo; nl cornflakes;
  - the level 2 success line is capitalised;
  - and more.

## Gates
- **`verify-what-for-tags-core.js`:** 24,003 checks, 0 fail. Its own tables:
  - ACCEPT: everything a Grade 1 teacher would accept for each moment, which is wider than the core's tags;
  - FEEL: what each thing is like;
  - the label overrides, read against the committed labels.

  It checks:
  - level 1: exactly one accepted thing per moment in the 6- and 8-thing bags; no sentence names its answer or gives it away by its root (an auditable `TELL_OK` list holds five compounds whose root is the body part or activity itself);
  - level 2: yes/no against ACCEPT;
  - level 3: one word per thing; the hammer only under "hard";
  - the model, the plan and its bots, strings ×11, prose quotes and the manifest.
- **`mutate-what-for-tags.js`:** 20/20 killed, control passes. Two first-run survivors were explained, not loosened:
  - level 2 derives "fits" from the use table, so that mutation now targets the table;
  - the hammer rule was added to the gate.
- **`local-test-what-for-tags.js`:** 11,638 pass, 0 fail. Real pointer, 11 locales. (The sweep waits until the board has re-rendered for its new width before measuring; without that wait, one jump from 1024 to 320 measured the old layout.)
  - At 1024: every hint, the tag that flips, the hop, Next 0.5 s after the result, a real drag, tap-to-return, picture-only mode, the 8-thing bag.
  - Then every round × level (plus bag 8 and picture-only) at rest / miss 2 / solved through 320…1366.
- **`visual-qa-activity`:** 192 renders pass. Phase driver `visual-qa-phases/jasper-just-right.real-life.l-1-5-c.js`.
- **`audit-activity-hierarchy`:** 818 / 0.
- **`audit-settings-efficacy`:** level, bag and words all live.
- **`audit-activity-next-delay`:** pass. Content ×11, prose claims, SERP copy, content tells and route preflight: pass.
- **0 lines** in shared cores or `lcs-shell`.
