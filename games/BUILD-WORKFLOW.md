# BUILD WORKFLOW — "build the next game" (the source of truth)

Version 1.0 — 2026-09-05. Operator rulings baked in: I (Claude Code) build the games, one per trigger; each game goes through **plan mode** first, where an expert ensemble transforms the approved design into a top-quality game; the operator approves; then I build to the gates below; every game ships in **all 11 languages**; every build is **local** and ends with the operator receiving a **local link**; **nothing deploys** until all 200 exist.

## 0. Triggers — do not confuse these

| Operator says | Program | Source of truth |
|---|---|---|
| **"build the next game"** / "build game NNN" / "build <slug>" | THIS program | `games/BUILD-WORKFLOW.md` (this file) + `games/BUILD-LOG.md` (NEXT pointer) |
| "build the next tool" | Premium Tools v4 (CLAUDE.md §23) | `docs/claude-md/premium-tools-v4.md` |
| "continue" (in plan mode) | the pt-BR activity fan-out (CLAUDE.md §20.9) | `memory/project_pt_secondbatch_fanout.md` |

The old "there will never be games" ruling is superseded (2026-09-05), and **no local AI is involved anywhere** — Claude Code is the only builder (operator ruling 2026-09-05). Never offer or use the old premium `game-shell.js` scaffold or the old `game-designs/` folder; the designs live in `games/design/specs/`.

## 1. Where everything is

```
lessoncraftstudio/games/               ← the deploy-shaped root (git-tracked)
  _lib/    theme.js · ui-strings.js · art.js · phaser-3.90.0.min.js · game-core.js
  _test/   demo.html · run-tests.js          _tools/  serve.js · build-hub.js · check-build.js · qa-game.js · lint-specs.js …
  _qa/<slug>/   screenshots (gitignored)     design/  GAME-DESIGN-BRIEF.md · research/ · catalogue/ · specs/ · FINAL-REPORT.md
  <slug>/index.html   one folder per BUILT game     index.html  the local hub
  ART-BIBLE.md · BUILD-WORKFLOW.md · BUILD-LOG.md
```
Read on every trigger: `BUILD-LOG.md` (NEXT), the spec `design/specs/NNN-slug.md`, `design/catalogue/BUILD-CONVENTIONS.md` (§1 skeleton, §4 ART incl. `svg`, §16 test hook, §17 locale completeness), `ART-BIBLE.md`, and the FINDINGS the spec cites (`design/research/FINDINGS.md`, by F-id).

## 2. The routine, step by step

### Step 1 — Resolve the game
`NEXT:` in `BUILD-LOG.md` → spec number → read the spec end to end. The spec is the **basis, not the ceiling**: keep its objective, band, pattern, misconception responses and no-punish/no-timer rules; everything else (item pools, art, motion, feel, extra polish) may be raised.

### Step 2 — EnterPlanMode and run the transformation ensemble
Launch `general-purpose` agents, ≤ 4 concurrently, round 1 then round 2. Every prompt hands the agent: the spec path, `BUILD-CONVENTIONS.md`, `ART-BIBLE.md`, the cited F-ids, and the instruction to write its output to `games/_qa/<slug>/plan-<role>.md` (never to the spec, never to a game file). Canonical prompts (parameterised by `<slug>`):

**Round 1 (parallel)**
- **Expert pedagogue (K-3, multilingual classrooms):** "Audit `design/specs/<NNN-slug>.md` against the research it cites. For each misconception response, judge whether the enacted feedback actually teaches (F-43) and propose the stronger version. Check the adaptive rule and item pools against F-46 (80-90% first-try) and F-41 (re-queue/interleave). Verify the band discipline (5-6: no instruction sentence; F-31 levelling). State the ONE observable objective and the 'learning is the game' test (F-63) — if any step is a toll gate to fun, say so. Output: a numbered list of changes with the F-id that justifies each, and the final item counts."
- **Expert educational content creator (11 languages):** "Author the complete content for `<slug>`: the item pools per level (more and better than the spec where the pedagogue's audit allows), the game-specific STRINGS for all eleven locales (en de fr it es pt nl sv da no fi — informal 'you', child register, ≤ 1.6× English length), and every `LOCALE_DATA` list the spec marked 'en pilot' as native-correct per-locale content (word lists, minimal pairs, sentences with each locale's word order, digraph sets, number words, coin sets). Mark sv/da/no/fi rows [NSR-FLAG] where a native review is still advisable. Check every picture cue: is the pictured object's name unambiguous in EVERY locale (no audio exists)? Replace any that is not. Output: the CONTENT, STRINGS and LOCALE_DATA blocks as final JavaScript, plus the picture-cue audit."
- **Expert game developer (Phaser 3.90, iframe games):** "Design the implementation of `<slug>` on `_lib/game-core.js` (`makeTile`, `playAnim`, `tone`, `preloadArt`/`drawArt`, `makeStartScreen`, `reportHeight`): scene structure, state machine per item (attempt ladder, re-queue), the `window.LCS_TEST` hook per BUILD-CONVENTIONS §16, keyboard order, the layout maths for every level's layout on the 720×560 stage, performance (texture reuse), and everything the static gate (`_tools/check-build.js`) and runtime gate (`_tools/qa-game.js`) will check. Flag any spec rule that will not hold up in code and propose the fix. Output: the file's section plan with function names and the data shapes."
- **Expert art director:** "Define the visual concept of `<slug>` inside `ART-BIBLE.md`: composition per zone at 704 px, the mascot and its pose set, which ART entries are shared library assets (list `_lib/art.js` names to reuse or add) and which are game-specific, how each tile/prompt/feedback state looks, the ONE coral highlight, scenery wash, and the acceptance rubric the artist must meet. Output: the ART entry list with a one-line visual brief each, plus the critic checklist for this game."

**Round 2 (parallel, after round 1)**
- **Expert artist (character & object illustration in SVG):** "Draw every ART entry the art director listed for `<slug>` as inline SVG strings to `ART-BIBLE.md` §3-§4 (1:1 viewBox, 3-px ink outline, flat fills + the allowed tints, tokens by `var(--name)`, no external refs, ≤ 6 KB per entry). Reuse existing `_lib/art.js` entries; register new SHARED ones in `_lib/art.js` (update the §7 index) and keep game-specific ones for the game's ART block. Output: the JavaScript to paste, one entry per asset, plus a contact sheet HTML in `_qa/<slug>/art-sheet.html` showing every asset at 48/96/192 px."
- **Expert graphic designer (layout, iconography, typography):** "Design the tiles, cards, bins, rails, badges, icons and the finish-screen summary for `<slug>` as Phaser-shape ART entries and icon SVGs per `ART-BIBLE.md` §4-§5; set exact sizes/gaps for every level's layout at 720×560 so the 5-6 floor (80 px) or 6-9 floor (56 px) holds and German/Finnish strings fit. Output: the shape ART entries and the per-level coordinate tables."
- **Expert animation agent:** "Write the ANIM registry for `<slug>` as real motion design per `ART-BIBLE.md` §6: every trigger in the spec's How-it-plays and Rules mapped to a tween (duration, ease, yoyo/repeat, anticipation/settle), the enacted-feedback sequences with their timings, the celebration, and any SVG part animation (an ear, a lid). No idle loops in play, no flash, ≤ 1.5 s celebrations. Output: the ANIM block as JavaScript plus a timing table."

**Synthesis:** I write the game's plan into the plan file — the transformed design (what changed from the spec and why, with F-ids), the asset list, locale status, the QA plan — and **ExitPlanMode**. The operator approves (or redirects). Nothing is built before approval.

### Step 3 — Build
`games/<slug>/index.html`, one file, the BUILD-CONVENTIONS §1 skeleton, the five `_lib` scripts in order, the registries at the top (`ART` with `kind: "svg"` entries via `LCSArt.get` or inline SVG, `ANIM`, `STRINGS` ×11, `LOCALE_DATA` ×11 where used, `CONTENT`), `preloadArt` in the Play scene's `preload`, `drawArt` for every picture, `makeTile`/`makeButton` for every tappable thing, `tone` for every sound, `window.LCS_TEST` per §16, `reportHeight` after every layout. New shared art goes into `_lib/art.js` with the §7 index line. Tests: `node _test/run-tests.js` still passes if `_lib` changed.

### Step 4 — Gates, in this order, none skippable, never a threshold moved
1. `node games/_tools/check-build.js <slug>` → PASS.
2. `node games/_tools/qa-game.js <slug>` → PASS (11 locales boot, never auto-start, ≥ 7 distinct Start labels, a full en session with a wrong answer on every item reaches Finish, targets ≥ 44 px real at 704, no console errors; screenshots in `_qa/<slug>/`).
3. **ART CONTACT SHEET — render every NEW `_lib/art.js` entry on its own, LARGE, and look at it.**
   All five poses at **48 / 96 / 192 / 384 px** on the `#FBF3E4` stage, written to
   `_qa/<slug>/art-sheet.png`, and **I read it myself** before the critic runs.
   ⭐⭐ **This step is in the artist's brief and was SKIPPED on 001, and it is the whole reason a
   badly-drawn fox shipped.** Every gate renders a mascot at ~104 logical px, and the visual critic
   grades those same frames — so *nobody ever looked at the art itself*. At full size the fox had two
   mismatched dangling legs (one thick, one thin and grey-socked), a muzzle that read as a lolling
   tongue, and ears that read as hollow horns. The operator saw it in one glance. A game screenshot
   is not an art review: **the character must be judged at the size a person can actually see it.**
4. **Visual-critic pass:** the art-director agent reads EVERY screenshot in `_qa/<slug>/` against `ART-BIBLE.md` §8 (14 points) and the game's own checklist; every miss is fixed and the sweep re-run. Output `_qa/<slug>/critic.md`.
5. **I read the 704 and 1024 renders myself** (start, item 1, wrong state, finish) and at least two non-English start screens.
6. **Pedagogue sign-off** on the BUILT item pools and feedback (the agent plays through `LCS_TEST` transcripts or reads the code): objective held, every misconception response present, no toll gate.
7. `node games/_tools/build-hub.js`.
If any gate fails, fix WHAT is measured or the game — never the gate's number (CLAUDE.md §A.13.62 discipline).

### Step 5 — Close out and hand over
- Append the `BUILD-LOG.md` entry (format in that file) and move `NEXT:` to the next number in the build order.
- Update memory: `memory/project_games_build_200.md` state line (built count, NEXT) and any new lesson.
- Commit with explicit paths (`git add games/<slug> games/_lib games/index.html games/BUILD-LOG.md games/ART-BIBLE.md`), never `git add .`; never `git add` anything under `games/_qa/` or any `.png`. No push unless asked.
- Start the local server if it is not running: `node games/_tools/serve.js` (port 8480; `run_in_background`), and give the operator:
  - `http://localhost:8480/` (the hub)
  - `http://localhost:8480/<slug>/index.html?lang=en` and the same URL for de, fr, it, es, pt, nl, sv, da, no, fi.
  The operator tests with children and requests corrections; a correction goes back through Steps 3-5 (no plan mode unless the design changes).

## 2.5 What game 002 cost, and what every later build must therefore do

Eight defects reached the operator on the first game. Every one of them passed
the full gate suite. They are grouped by what let them through.

**The gates proved the game's LOGIC and never proved it could be TOUCHED.**
- ⭐⭐⭐ **Drive a real pointer, every game.** A synthetic `emit()` skips hit-testing;
  nothing was clickable in any game and the suite was green. `qa-game` now has
  POINTER (callable hit area + a real `page.mouse.click` that must enter Play) and
  ALIGNMENT (four interior points of every control must hit-test back to it).
- ⭐⭐ **Sample the box, not the centre.** The first POINTER check clicked the
  middle of the button, which sat exactly on the corner of a half-displaced hit
  rectangle - so it passed while three quarters of the button was dead.

**I never rendered what the operator sees.**
- ⭐⭐⭐ **Screenshot at DESKTOP width and DPR 2 before saying it is done.** All my
  QA ran at DPR 1 in a 704-900px window. The operator's screen magnified the
  720x560 canvas ~3.6x (Phaser has no resolution option; the skeleton now renders
  at 3x with a camera zoom) and showed a layout I had never seen.
- ⭐⭐ **After ANY change to shared drawing code, re-render and LOOK.** I changed
  hit rectangles, verified the geometry with a probe, and shipped without a single
  screenshot - so a regression that moved every shape by half its size went
  straight to the operator.

**I broke working code with a careless edit.**
- ⭐⭐⭐ **Never run a global regex over `_lib`.** `-w / 2, -h / 2, w, h` appears in
  two `setInteractive` calls AND in `drawRoundedRect`, `makeTile`'s painter and
  the whole of `drawArt`'s shape branch. A global replace rewrote all the drawing
  code and every centred shape drew from its corner. Patch by line number with an
  assertion on the surrounding context, then diff.

**Art must fit the object, not its bounding box.**
- ⭐⭐ **The nest's bowl CURVES UP toward the rim** - floor at y 146 in the middle,
  128.7 at 112 units out. Ten eggs that fit the box hung out of the nest. Check
  countable objects against the container's real silhouette, at every count.

**A check that models the thing it checks repeats its bug.**
- ⭐⭐ My first ALIGNMENT check reimplemented Phaser's hit-area transform and
  assumed every control is drawn centred - the same assumption that caused the
  bug - so it condemned a correct control. Measure with the real API instead.
- ⭐ **Verify the measurement before the defect.** Three false alarms in one
  session: `pointerover` only fires on entry (so a grid scan reports one hit);
  `wrong()` ENQUEUES, so timing from the call measures the wrong interval; and a
  Phaser Container has no `displayWidth`, so a clearance check read 0 and passed
  vacuously.

## 3. Standing rules (each bought once)
- **Spec is the basis, not the ceiling** — but the objective, band, pattern, misconception responses, no-punish and no-timer rules are invariant; the pedagogue may ADD, never remove.
- **All 11 locales or it is not built.** "en pilot" is a spec-time state; a built game has STRINGS ×11 and LOCALE_DATA ×11 (BUILD-CONVENTIONS §17).
- **No emoji on the play surface** of a built game; emoji exist only as declared fallbacks in ART entries.
- **Shared art is drawn once** (`_lib/art.js`); a game never redraws a library character.
- **The gate proves the FILE, the critic proves the PICTURE, I prove it with my own eyes** — three different instruments; none substitutes for another.
- **Relaunch prompts are generated from the catalogue row / spec, never written from memory** (rows were renamed during the rebalance; twice a prompt described a dead row — the writers followed the catalogue, which is binding).
- **Session limits kill all agents at once** — ≤ 4 agents in flight, and on any restart check `_qa/<slug>/plan-*.md` on disk before relaunching a role.
- **The definition of done includes a desktop-width, DPR-2 screenshot that I have looked at**, plus a real-pointer assertion. Neither the static gate nor a synthetic session can see the classes above.
- **No deploy** until all 200 are built; deployment is a separate commission (nginx `/games/` root + a Next wrapper page that bills a play on mount).
