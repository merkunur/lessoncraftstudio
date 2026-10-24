# #97 — Ten More, Ten Less → THE NINE-STOP TUBES (1.NBT.C.5, all 11 locales)

ORDER row 97 · id `choice-board.ten-more-less.1-nbt-c-5` (kept). Design: `designs/097-choice-board.md`.

## Files and wiring
- **New files:**
  - `mini tools/nine-stop-core.js`: the round tables of the four faces, the tubes (up / down with the lid at nine and the empty floor), the arrow cards, the jump counts and their run, Check / hint / stepNow, the order rules and the plan.
  - `nine-stop-activity.js`
  - `nine-stop-activity.html`
  - CSS prefix `ns-`.
- **Manifest:**
  - The row stays in `choice-board-activities.json`. Only its own text was cut and replaced, so every sibling row is byte-identical.
  - `tool` → `nine-stop-activity`, `task_template` → `nine-stop`, and `params` = `{faces, glass, rounds}`.
  - Metadata is frozen in all 11 locales (sha1 `a1c2c43e`, checked).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.838.
- **Legacy gates:** `verify-choice-board-tenmoreless.js` and `local-test-choice-board-tenmoreless.js` step aside with a pointer once the row runs `nine-stop-activity`.
- **Number words** for the number-of-the-day face come from `scripts/worksheet-gen/lib/number-words.js` (1–99 × 11 locales, baked into the wrapper).
- **Sources** (all in the scratchpad):
  - `ns-strings.json` + `ns-apply-strings.js`, `ns-words.js`, `ns-manifest.js`
  - `ns-prose.json` + `ns-fr.js`
  - `ns-desc.txt` + `ns-dump.js` → `ns-dump.md` (the reviewer's text)
  - `ns-review-fix.js`, `ns-probe.js`, `ns-dbg.js`

## The invention
**A two-digit number is two glass tubes, and each tube holds at most nine.**
- **The tubes:**
  - The tens tube holds rods and the ones tube holds cubes.
  - ▲ adds one piece and ▼ takes one out.
  - A plate under each tube shows its digit.
- **The lid is the lesson.**
  - A tenth cube will not go in: the lid bumps.
  - So "1 more than 39" cannot be done in the ones tube alone. The child has to put one more rod in the tens and take all the ones out.
  - Going down, the empty ones tube sends the child to the tens.
- **Ten more never touches the ones tube.** The child sees that only the tens digit changes; the reward line says it.
- **Faces:**
  - **10 more / 10 less:** the question card asks, and the child builds the answer in the tubes.
  - **1 more / 1 less:** includes five trade rounds (39 + 1, 29 + 1, 70 − 1, 61 − 1, 80 − 1).
  - **Arrow trips** (the hundred-chart moves):
    - ↓ is 10 more, ↑ is 10 less, → is 1 more, ← is 1 less.
    - A card is tapped (it plays on its own tube) or dragged onto a tube.
    - Mystery rounds: two trips must land on one number; the first landing stays secret until the end.
    - Count rounds "23 → 57": the child types how many jumps of ten and of one, then watches the tubes run.
  - **Number of the day:** the child builds its four neighbours. They fill a cross, and the number lights up as dots in ten frames plus its number word.
- **Frosted glass** (setting): the rods and cubes are hidden, so the child works from the digits alone. Check clears the frost.

## Rounds
| Face | Rounds |
|---|---|
| 10 more / 10 less | 10 (the plan never puts three of one direction in a row) |
| 1 more / 1 less | 9, five of them trades |
| Arrow trips | 8 follow + 4 mystery + 5 count (never two count rounds in a row) |
| Number of the day | 10 numbers (11–89) |

- No round starts at 0 and no answer is 0 or 100.
- The plan is an order-only reshuffle and never repeats the previous pass.

## Feedback
- **Check before anything moved:** hintMove, or hintTypeCounts in a count round. No miss.
- **The lid:**
  - The glass bumps.
  - The note says hintLid, or hintLidOnes ("put one more rod in the tens and take all the ones out") for the ones tube outside the 10 more / 10 less face.
- **▼ on an empty tube:** nothing moves, and a soft low sound plays.
- **A wrong number:**
  - **Miss 1:**
    - The tube that should change glows.
    - A see-through block shows the step to come, or a dashed block shows the one that leaves.
    - The note says hintTenMore / hintTenLess / hintOneMore / hintOneLess.
    - In a trade round, the tens tube glows with no ghost block, and the note gives the trade at once (hintTradeUp / hintTradeDown).
  - **Miss 2:** hintOnlyTens / hintOnlyOnes, or the trade again.
- **Count rounds:** a wrong count lands the tubes where those jumps really go (a pencil plate), then hintCount1 / hintCount2.
- **No hint prints the answer.**
  - The reward board (cross, ten frames, tally, word) stays empty until the round is solved.
  - The mystery's first landing appears only at the end.

## Review (one reviewer, all 11 locales; every finding fixed at the source)
- **MUST:**
  - The mystery plate showed trip 2's answer while trip 2 was still being played. It now shows only once solved.
  - In trade rounds, miss 1 drew ten cubes and pointed at the ones tube. Now the tens tube glows, there is no ghost, and the trade hint comes at miss 1.
  - The lid on the ones tube said only "the tube is full". hintLidOnes now names the move.
  - The reward lines read like a sum without its start. They now say "10 more than {start} is {answer}"; the count lines say "{d} jumps of ten and {r} jumps of one".
- **Native fixes:**
  - instrCount "Work it out first, then watch" in all 11 locales.
  - en: "cube", "neighbors".
  - fr: "Construis".
  - es: «¿A dónde llegan las flechas?».
  - Prose:
    - every locale: "rods and cubes hidden";
    - de: "Stange oder Würfel";
    - no: "tellerundene" and "hundreruta";
    - pt: "dois algarismos";
    - fi: "laskussa 39 + 1".
  - The about text now says the glow and the step block come in the rounds where the child builds a number.
- **My own fixes (render reads and the local test):**
  - The reward board showed the answer dimmed before it was solved. It is now empty.
  - The page was too tall: the handles went side by side, the tubes are shorter, and the count face is compact.
  - The drag flag swallowed the next tap. It is now a 300 ms window.
  - Typing a count now sends the tubes back to the start.
  - At 320 px the mystery label wrapped under the number and pushed Check below the fold. The number now sits beside the label.
  - At 320 px nine cubes did not fit the count-round tubes. The tubes are taller there now.

## Gates
- `verify-nine-stop-core.js` 756/0 (its own oracle: every round, lid / floor exhaustive, the hint ladder, never the answer).
- `mutate-nine-stop.js` 14/14 killed, control survived.
- `local-test-nine-stop.js`: real clicks and drags in 11 locales, every round at rest / miss 2 / solved, resized 320–1366.
- `visual-qa-activity.js` 60/60.
- `audit-activity-hierarchy.js` 422/0.
- `audit-settings-efficacy.js --tool=nine-stop-activity`: 2 live (task, glass).
- `preflight-activity-routes`, `verify-activity-prose-claims` and `verify-activity-serp-copy` all pass.
- `live-verify-nine-stop.js` 59/0 on production (2026-10-24): all 11 locale pages 200; en, de, sv, fi × 1366 and 390 played by real pointer (35 → miss + hintTenMore with the tens tube lit, then 44 → okTenMore); wrapper 9.838; the iframe grows with the card.

## Frozen metadata flags (not edited — landing / metadata rule)
- Every page intro describes choosing among four numbers and covers only 10 more / 10 less.
- fr intro: "qui change tout seul".
- Titles: de capitalisation, and English-style title case in other locales.
- nl intro has no "tientalovergang".
