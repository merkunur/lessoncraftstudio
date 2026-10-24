# #94 — Bundle Bot → THE TEN-POCKET BAND (1.NBT.B.2.a, all 11 locales)

ORDER row 94 · id `bundle-bot.bundle-machine.1-nbt-b-2-a` (kept). Design: `designs/094-bundle-bot.md`.

## Files and wiring
- **New files:**
  - `mini tools/ten-band-core.js`: the round tables (to 49: 11 rounds; to 99: 10 rounds), the press plate (a 10 × 5 grid of cells with jitter), the hopper (clumps cycle 1–3, or 3 in overfill rounds), take-out, the lever (`pull`: fewer than ten springs and makes no ten; ten or more takes the first ten in band order and keeps the extras; a full rack is stiff), the snip, the keypad (read) and slots (tens), check / hint / goal, and the plan. It replaces the old `bundle-machine-core.js`, which only the old Bundle Bot used.
  - `ten-band-activity.js`
  - `ten-band-activity.html`, which loads `lcs-pictures.js`.
  - CSS prefix `tbd-`.
- **Pictures:** Bolt is toys/robot, at 120 / 72 px. Everything else is drawn apparatus: the cubes, the plate, the band and the rack of tens.
- **Manifest:**
  - The row stays in `bundle-bot-activities.json`. `tool` is repointed.
  - en..sv slug, title and intro are frozen (sha1 `ad45da18…`, checked).
  - da/no/fi are new: Bolts bundtemaskine, Bolts buntemaskin, Boltin nippukone.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.835. The existing grade overrides are kept.
- **Legacy gates step aside:** `verify-bundle-machine-core.js` and `local-test-bundle-bot.js` exit 0 with a pointer while the row runs the Ten-Pocket Band.
- **Sources:** scratchpad `tb-manifest.js`, `tb-meta.json`, `tb-strings.json` + `tb-apply-strings.js` + `tb-review-fix.js`, `tb-prose.json` + `tb-prose-fix.js`, `tb-dump.md` (the reviewer's text), `tb-fr.js`, `tb-probe.js`, `tb-aside.js`.

## The invention
**The band has exactly ten pockets.**
- A pull with fewer than ten cubes cannot make a ten. The band springs open and, by default, shows its empty pockets first. The **gaps** setting can make it simply spring open.
- With ten or more cubes, the band takes ten, clasps them into one ten that rolls onto the rack, and pushes the extras back.
- **The impostor round** starts with nine cubes laid out like a ten. The lever shows one empty pocket.
- **The ✂ snip** works the other way: the last ten rides back under the press and the same band lets its ten cubes go, so the number stays the same.
- **Ten loose cubes left on the plate are a ten still hiding.** It is not right even when the total matches: ten cubes are outlined gold, and the hint is hintHiding.

## Rounds
- **build:** make *n*.
- **decade:** make *n* with no ones.
- **overfill:** the cubes drop in threes, so they overshoot ten.
- **impostor:** described above.
- **unbundle:** "Bolt needs exactly *k* loose cubes. Keep the number *n*." Snip one ten. Snipping two is a ten to bundle back up (hintHiding), not "snip one".
- **read:** how many cubes? Answered on the keypad. A read round has no lever and no ✂, so the board stays the one the success line names.
- **tens:** all the cubes start on the plate. Bundle every ten, then fill the Tens and Ones slots. The right digits with ten or more still loose is a ten hiding.

No 0 is ever typed or counted: `type()` refuses a leading 0, and decade rounds involve no typing. The rounds are reshuffled each pass (order only, never the previous order, no two neighbours of the same type).

## Feedback
- **A first miss:**
  - the rods are labelled 10, 20, 30 (in read rounds, each rod is labelled 10);
  - an extra ten is coral and a missing ten is a dashed slot;
  - wrong ones are numbered;
  - in an unbundle round, the ten to snip is dashed.
- **A second miss:**
  - hintStrong ("Count the tens by tens, then add the loose cubes.");
  - the loose cubes are numbered 1..n;
  - in the rounds where the child makes a number, the number card splits into a teal tens digit and a coral ones digit. It does not split in unbundle rounds, where the goal is 2 tens and 12 ones rather than 3 and 2.

## Review (one reviewer, all 11 locales; every finding fixed at the source)
- **Pedagogy:**
  - "exactly" was added to every locale's unbundle prompt.
  - A double snip now gets the re-bundle hint.
  - The dead `hintKeep` branch was deleted.
  - The card no longer splits in unbundle rounds.
  - Read rounds lose the lever and the ✂, so okRead stays true.
  - hintStrong was reworded so it no longer says "count on" next to the 1..n numbering.
  - Three prose claims were corrected: the labels appear at the FIRST miss; the card splits only in make-a-number rounds; the gaps setting is described.
- **aria:** the rack and plate labels are now label: count forms, so they no longer read "1 tens" or "1 loose cubes".
- **Native fixes:**
  - sv: «i stället» changed to «på hyllan», «stället» to «hyllan».
  - da: «ti ad gangen», «spring op», «lukke sig», and the intro without «igen».
  - no: «sprett opp», «ruller over», the LK20 line, and the intro without «igjen».
  - fi: okDecade «ilman ykkösiä», «kymmenittäin», the gSpring frame, and the new intro.
  - fr: «d'exactement», «faire sortir».
  - es: the ¡ placement and the ellipsis spacing.
  - pt: «saírem / caírem», «se abre de uma vez».
  - de: «hat zehn Würfel», and the round naming in about[1].
- **My own read of the renders found an answer tell.** On the second miss in a tens round where every cube was still loose, the cubes were numbered 1..46, which printed the answer on the last cube. A tens round with ten or more loose cubes now outlines the first ten in gold instead, and the local test asserts it (poison-checked).
- **The snip control changed during the build.** Tapping a rack rod and then the plate gave 16 px targets, so it became the ✂ button and the rods are display-only. The prose in all 11 locales says "tap the scissors button".
- **Frozen metadata, flagged only (not edited):**
  - en intro: "Build numbers up to forty-nine" ignores the 99 range.
  - nl intro: the cubes lie "op de band" (they lie on the plate), and "tot ongeveer 49".
  - sv intro: the old one-at-a-time mechanic, and "tryck på ett tiotal".
  - es intro: "sin registro" and "de 20 a 49".
  - it intro: "una alla volta", "senza registrazione" and "da 20 a 49".
  - fr intro: "de 20 à 49".

## Gates
- `verify-ten-band-core.js`: 2,231 / 0, including the review's rules: a read round refuses the lever and the snip; two snips lead to hintHiding; every hint key is authored.
- `mutate-ten-band.js`: 19 / 19 killed, and the control survives.
- `local-test-ten-band.js` (real clicks on every control and the keyboard, 11 locales, both ranges × rest / miss 2 / solved, resized 320–1366): 25,696 / 0; two poison checks run (dropping the smallest-phone rack rule fails at 320; restoring the 1..n numbering in tens rounds fails the tell assertion).
- visual-qa: 66 renders PASS.
- hierarchy: 266 / 0.
- settings: 2 live (numbers, gaps).
- preflight, prose-claims and SERP: PASS.
- `live-verify-ten-band.js`: 67 / 0, en / de / sv / fi × 1366 / 390 on production (2026-10-24, commit `7aea9829`; the first run fell in the deploy window and the rerun was clean).
