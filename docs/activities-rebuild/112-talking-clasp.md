# #112 — Build Vowel-Team Words → THE TALKING CLASP (RF.1.3; en de nl fr)

ORDER row 112 · id `syllable-builder.build-vowel-teams.rf-1-3` (kept). Design: `designs/112-syllable-builder.md`.

## Files and wiring
- **New files:**
  - `mini tools/pinch-teams-core.js` holds the model:
    - the words, typed in a small notation (`b[oa]t`: a team in brackets; `l[ou](p)`: a quiet letter in parentheses);
    - the per-locale lock lists, the tray, the pinch, Check, the hints, the badge, the dimming, the ghosts and the plan.
  - `pinch-teams-activity.js` draws the team board, the picture with its sound badge (en), the wooden rail (seated letters, quiet letters, wide team sockets), the clasp, the talker light, the tray and the spelling card. It owns taps, drags and keys (CSS prefix `pt-`).
  - `pinch-teams-activity.html`.
- **Manifest:** the row stays in `syllable-builder-activities.json` (beside build-endings; the file is CRLF), edited surgically inside this row only; the other row is proven unchanged.
  - `tool` is now `pinch-teams-activity`, `task_template` is `pinch-teams`, and the params are `clue` / `rounds`.
  - en slug, title and intro are frozen.
  - **de / nl / fr slug, title and intro are authored new** (the activity was en-only) and were reviewed.
  - `word-builder-core.js` and `syllable-builder-activity.*` have a 0-line diff (build-endings still uses them).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.856.
- **Prose:** en replaced; de / nl / fr added.
- **Strings:** en de nl fr (30 keys); the shell falls back to en.
- **Sources** (scratchpad): `pt-strings.js` → `pt-apply.js`; `pt-prose.js`; `pt-meta.js` → `pt-manifest.js`; `pt-review-fix.js`; `pt-sheet.js`.

## The invention
**Vowels you pinch together that only lock when they are a real team.**
- The word's consonants are seated on a rail, with a wide socket where the team goes.
- Tap (or drag) a vowel in, then a second:
  - a real team of the language, **in that order**, slides beside the first and a brass clasp snaps over both;
  - any other vowel bumps and goes back to the tray (oa locks, ao does not).
- **English:** the first vowel of oa / ai / ee / ea lights gold (it says its name) and its partner goes quiet.
- **German, Dutch, French:** the whole team lights as one sound.
- Tap a locked socket to open the clasp.
- Finished words pin under their team on the team board.

**Clues:**
- Build the word (all four).
- **Same sound?** (en): ee or ea for the long-E words. The right sound with the other spelling turns the word's own spelling card over and sends the team back, gently, instead of counting as a plain wrong answer.

## Deviations from the design (each measured or ruled)
- **The pinch happens in the socket**, not tile-onto-tile in the tray, so tap, drag and keyboard share one mechanic. The order is reading order (first in, first letter).
- **The English lock list includes the real teams oo, ie, ue, oe, ou, au, oi, ei, ui**, not only the four taught ones. A clasp that refused oo would teach that oo is not a team. Only the four taught teams have a talker.
- **No bank additions** (the sound-boxes banks are read by five shipped tools):
  - words that are bank rows are checked against the bank by the gate;
  - the rest (train, seal, jeep, nail, the set-B two-syllable words, cheese, peacock) were read by the reviewer.
  - en *rain* stays out (the design's ruling).
- **Locales:**
  - de ships 11 words in one set (*Reis* dropped: its rice picture is a closed bag, the #109 ruling);
  - nl ships two sets of 7 (the bank now has 14 rows);
  - fr ships 9 (ou ×7, oi ×2). With seven ou words, "the same team never three running" is impossible, so the plan allows the shortest run the set can have.
  - no stays hidden (one bank row); fi / es / it / pt / sv / da are refused per the design.
- **Pictures:** all 44 were checked by eye on contact sheets; none was refused.
- **Not built:** the "More teams" setting, free play, the tray-to-tray pinch, the left-to-right marquee and the picture moves.

## Review
ONE native + phonics reviewer over en / de / nl / fr.
- **Confirmed:**
  - every bracketed team is correct and taught as one sound at grade 1;
  - the lock lists hold no false team and miss no common one that can be built from a e i o u;
  - every answer is unique (other locking teams that make real words — loaf, boot, Beet, mees — do not name the picture);
  - the talker rule holds for every en word;
  - no digits, no "free", no false features.
- **Applied:**
  - en: hintWrong2 "You hear {N} in this word…" (a picture does not speak); tSame "Both say long E".
  - de: renamed **Die Laut-Klammer** (German has no "says its name" rule); the about text no longer says the socket is "in the middle" (Auto, Eule start with it); colon.
  - nl: renamed **De klankklem**; "op de plek van de klankgroep"; the SLO line (kerndoelen are not set per groep); "die je hebt gebouwd"; colon.
  - fr: « ou » / « oi » quoted.
- **Checked on the render:** de *Auto* / *Eule* are pinched from capital tiles.
- **Kept, with reason:**
  - en okTalkSame is used for ee only, so "the first e … the second" is right (the reviewer read it as covering ea);
  - fr keeps "Le fermoir des sons";
  - nl keeps "Controleer" (house wording).
- **Frozen EN landing intro (not editable):** it still describes tapping ready-made chunks and a "Hear it" button.

## Gates
- `verify-pinch-teams-core.js` — 5,751 checks against its own hand-typed lock lists and word table. It covers:
  - the words (display and teams; bank agreement; pictures in colour themes; refused words; only en de nl fr);
  - every ordered vowel pair locking exactly as listed, capitals alike;
  - the talker (en four teams, first letter; nothing elsewhere);
  - the tray: every needed letter, capitals for a capitalised team-initial word, never a team's letters in order;
  - Check for every locking pair in every word (ok / wrong / spelling / refused), the lone vowel, the miss-2 badge and dimming, help removed by a new move;
  - Same sound?;
  - the plan (incl. the fr run rule);
  - the strings.
- `mutate-pinch-teams.js` — 16 / 16 killed, control survived.
- `local-test-pinch-teams.js` — real taps, drags and keys in en / de / nl / fr:
  - the scenarios above;
  - every clue × round of every set at rest, at miss 2 and solved, through 320…1366;
  - a locked team's letters measured inside its socket.
  - Count: 6,782 checks, 0 fail.
- `visual-qa-activity` 54 / 54 · `audit-activity-hierarchy` 164 / 0 · `audit-settings-efficacy` (clue live) · preflight-activity-routes · prose-claims · SERP copy · activity-content × 4 — all green. 0 lines to shared cores or lcs-shell.

LIVEVERIFY
