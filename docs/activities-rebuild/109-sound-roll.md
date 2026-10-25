# #109 — Stretch the Giraffe → THE SOUND ROLL (RF.1.2.a; en de nl sv da no fi)

ORDER row 109 · id `stretch-giraffe.long-short-vowel.rf-1-2-a` (kept). Design: `designs/109-stretch-giraffe.md`.

## Files and wiring
- **New files:**
  - `mini tools/sound-roll-core.js` holds the model:
    - the three clues, the punch (450 ms stretch mark), the word's own roll from its bank boxes, Check, kinds, hints and the plan;
    - the DATA block is generated from the sound-boxes banks by a build script, never hand-split.
  - `sound-roll-activity.js` draws the pictures, the paper rolls (round holes, long slots with a stretch mark, letters, the hole-less e), the punch keys, the music box with the library giraffe, the crank and the song book, and owns tap / hold punching, holes tapped shut, playback and the keyboard (CSS prefix `sr-`).
  - `sound-roll-activity.html`.
- **Manifest:** the row stays in `stretch-giraffe-activities.json` (its only row), edited surgically because the file is hand-formatted.
  - `tool` is now `sound-roll-activity`, `task_template` is `sound-roll`, and the params are `clue` / `letters` / `rounds` / `sets`.
  - en / de / nl slug, title and intro are frozen.
  - **sv / da / no / fi slug, title and intro are authored new** — the activity never shipped there; reviewed.
  - `vowel-length-core.js` and `stretch-giraffe-activity.*` have a 0-line diff.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.852.
- **Prose:** en / de / nl replaced; sv / da / no / fi added.
- **Pictures:** library pictures of the bank rows plus `zoo animals/giraffe`. All 105 pictures were checked by eye on contact sheets (see Deviations).
- **Sources** (scratchpad):
  - `sr-build.js` (data from the banks) and `sr-strings.js` → `sr-apply.js` (36 keys × 11);
  - `sr-prose-src.js` → `sr-prose-apply.js`; `sr-manifest.js`;
  - `sr-review-fix*.js`; `sr-sheet.js` (picture contact sheets).

## The invention
**A music-box roll you punch one hole per sound.**
- A tap on the punch makes a round hole; HOLD it and the hole grows under your finger into a long slot, which clicks at the stretch mark.
- Crank the box (or press Check): it plays your roll — a plink for each round hole, a held note for each slot, the giraffe on the lid on tiptoe for every long one.
- The word's own roll then slides up under yours: gold where they agree, coral where they don't.
- Finished words go to a song book as little punched cards.

**Clues:**
- **Long or short?** (en de nl sv da no) — three pictures, each roll with its other sounds pre-punched; punch only the vowel. Two sets of nine rounds per locale, patterns LLL · SSS ×2 · LSL · SLL · LSS ×2 · SLS · SSL.
- **Count the sounds** (en de nl da no fi) — one picture, a blank roll; one hole per sound, not per letter; length is never judged.
- **Blend** (all seven) — a lettered roll (a long vowel is a slot; cake shows a hole-less e): crank it, read the sounds, tap the picture.
- **Letters under the holes:** a setting (hidden by default; a listening task).

## Deviations from the design (each measured or ruled)
- **Pictures checked by eye:** all 105 pictures were rendered on contact sheets and looked at, because a word review cannot see a picture. Four were removed:
  - de *Nest* (the picture shows chicks);
  - da *sø* (a lake landscape);
  - da *salt* (the jar prints SALT, which hands over the spelling);
  - *ris* (sv / da / no; a closed bag).
- **Clues per locale, from the banks:**
  - **fi has no Long or short.** Finnish writes length as a doubled letter, which its bank splits into two sounds, and only two long-vowel phoneme rows exist (kuu, suu).
  - **sv has no Count.** The sv bank holds only 2- and 3-sound words, so punching three holes every time would pass 7 of 9.
  - The settings menu offers only a locale's clues.
- **The bank's picture folders are used** where they differ from the design's (e.g. `bakery/cake`, a slice of cake), because the source rule makes the bank row the authority.
- **The roll stays the same length in Count but holes are laid out by length;** the roll holds ten holes.
- **Miss 2** keeps the word's roll up and names what to look at (the hint), instead of replaying the two notes side by side.
- **Not built:**
  - **No drag on a slot's end, no endless free-play roll, no first-visit nudge.** A hole is fixed by tapping it shut and punching again; the keyboard (Enter / Shift+Enter) covers held presses.
  - **No letter-by-letter TTS in Blend** — the crank lights the holes in turn.
- **The en "Long or short" sets are the design's, typed.** de / nl / sv / da / no sets are dealt from each locale's long and short bank lists, in the same nine patterns. Where a locale has few long words (nl: six), a word appears twice in a set, never twice in a round and never in two rounds running (the plan checks this every pass).

## Review
ONE native + phonics reviewer over the compact dump: every word with its split and its long/short mark per locale, the strings, the prose and the new metadata.
- **Confirmed:**
  - all en / de / nl / sv / no long/short marks;
  - every Count word's number of sounds (nl sch = 2, ng / ui = 1; de sch / ch / uh = 1; no hund = 3);
  - every Long-or-short word is one syllable;
  - every Blend round has one right picture;
  - no digit or answer in any hint; "says its name" only in en; no "free".
- **MUST, applied:**
  - da *lås* is short and da *sol* is long (both re-marked; the gate's own table updated);
  - the fi Count hints claimed "not every letter", but in Finnish every letter is a sound — rewritten (a long vowel and a double consonant are two holes);
  - fi about: "kuussa on kolme reikää" read "in the moon …";
  - "say each picture" is not idiomatic outside English — "say what each picture is" in de / sv / da / no / nl / fi, and in the new intros;
  - nl "klaargemaakte" / "klare woorden" → "afgemaakte".
- **SHOULD, applied:**
  - fi *lävistää* is body piercing → *rei'itin*, "tee reikä";
  - da / no *hullemaskine* / *hullemaskin*; da / no "slå hul for vokalen" (not "hit the vowel"); nl "pons een gaatje voor de klinker"; sv hintEmpty;
  - no "giraffen"; de / nl hintPick; fi okBlend;
  - sv double-consonant claims hold only when letters are shown — reworded.
- **Pictures a child names otherwise left the lists:** sv *lamm* (vs *får*), nl *mok* (children say *beker*), da *pen* (*kuglepen*). en coat / van / rose stay (the design's checked pictures; tapping speaks the name).

## Gates
- `verify-sound-roll-core.js` — 4,446 checks, its own ground truth: a long/short table typed by hand per locale, the banks re-read from disk, and every picture checked on disk. It covers:
  - the source rule (bank boxes, picture, word);
  - refused words and pictures;
  - every Long-or-short set (9 rounds, three distinct one-vowel words, long share 35–60 %, no pattern more than twice, guessers solve ≤ 2 / ≤ 1, no diphthong);
  - the word's own roll (slot under a long vowel only, the hole-less e);
  - Count (holes = bank boxes, length never judged, "always 3/4" loses, letters ≠ sounds where the spelling allows);
  - Blend (three pictures, the right one in its slot);
  - the punch (449 / 450 ms), Check kinds and hints;
  - the plan: sets alternate, no word repeated in adjacent rounds, no count three times running, Blend 3/3/3 and never three running;
  - the strings × 11 ("says its name" only in en, checked both ways).
- `mutate-sound-roll.js` — 14 / 14 killed, control survived.
- `local-test-sound-roll.js` — 19,005 checks in 7 locales (wide widths re-run after the giraffe grew to 96 px: 2,297 more, all green):
  - real taps and HELD presses on the punch, holes tapped shut, the crank, the pictures, the keyboard, the clue list per locale;
  - every clue × round at rest, at miss 2 and solved, through 320…1366.
- `visual-qa-activity` 54 / 54 · `audit-activity-hierarchy` 596 / 0 · `audit-settings-efficacy` (clue, letters live) · preflight-activity-routes · prose-claims · SERP copy (incl. the new sv / da / no / fi metadata) · activity-content × 7 — all green.
- `live-verify-sound-roll.js` on production: 56 / 0 on 9.852. All 7 shipped pages return 200 (sv / da / no / fi new). In en / de / sv at 1366 and 390, Long or short with real presses: three vowels punched wrong (held for a slot, tapped for a hole) → Check gives the locale's hint and three word rolls with coral holes; punched right → the success line and three song-book cards. In fi, Count: one hole too many → hintCount; a hole tapped shut → the line. The iframe grows with the card. The first run, inside the deploy window, saw no iframe on the new sv / fi pages; the rerun passed.
