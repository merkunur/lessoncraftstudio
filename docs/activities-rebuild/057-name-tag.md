# #57 — Read the Word, Tap the Picture → THE STICKY NAME TAG (RF.K.3, all 11 locales)

ORDER row 57 · id `choice-board.read-cvc-word.rf-k-3` (kept).

- **Files**
  - Added: `name-tag-core.js`, `name-tag-activity.js` and `name-tag-activity.html` (Andika school print, single-storey a and g).
  - The row moved out of `choice-board-activities.json` (removed as text; the other 9 rows are byte-identical) into `name-tag-activities.json`, which is registered in `MANIFEST_FILES`.
  - `choice-board-core.js` is untouched (its `read-cvc-word` template is now unused). 0 shared-core lines.
- **Locales**
  - en, de, es, pt, it and nl keep their frozen slug, title and intro. fr, sv, da, no and fi get new ones.
  - The prose is rewritten in all 11 locales; every example in it is a real round, checked by the prose script.
  - The page shows grade 1 in fr, sv, da, no and fi, joining de, es, pt, it and nl: decoding whole printed words is CP / åk 1 / 1. klasse / 1. trinn / 1. luokka work.
- **Design:** `designs/057-choice-board.md`. CSS prefix `ntg-`.
- **Retired gates:** `verify-choice-board-readcvc.js` and `local-test-choice-board-readcvc.js` now carry a RETIRED guard. `verify-choice-board-lettercase.js` had been failing since #41 moved that row to the Type Case; it now carries the same guard.

## The apparatus and its invention: A NAME TAG THAT STICKS LETTER BY LETTER AND PEELS AT THE FIRST DIFFERENT LETTER
- **The board.** A cork wall carries four library pictures in a 2 × 2 grid, each frame with a brass hook. The word is printed on a cream luggage tag with a punched hole and a string.
- **Hanging.** Drag the tag onto a picture, or tap the tag and then the picture. Tapping a hanging tag takes it back. Enter does both from the keyboard.
- **Check.** The tag presses down letter by letter from the left: each stuck letter darkens to full ink, 120 ms apart, with a rising *tk*.
  - **Wrong picture:** pressing stops at the first different letter. The tag curls, peels off and falls back to the tray with that letter ringed in coral. The stuck letters stay faintly on the frame as a glue mark for 2 s. The hint names how far it stuck ("The first 2 letters stuck. Look at the next letter: “t”.").
  - **Second miss:** the reading finger lights the tag's letters one by one, and each picture's own name appears faintly under it, so the child compares print with print.
  - **Right picture:** every letter presses, a bow ties, the frame glows, and the note spells the word out ("c-a-t: cat. You read it to the end!").
- **Four levels**, each with ≥ 7 rounds in every locale:
  - **Read the word:** one tag. The "Look-alike words" setting makes the wall *close* (names share more letters) or *far* (at most one).
  - **Rhyming words:** 2–3 rhyming tags and one or two pictures outside the rhyme. Tags that stick lock in place; wrong ones peel. When all are on, the wall weaves its carpet.
  - **Words in syllables:** the pieces arrive out of order and clip on in the order tapped. A tag in the wrong order peels at its first part. On the look-alike partner it sticks the first part and peels at the second.
  - **Memory pairs:** six face-down cards. A picture and its own tag stay up with the tag stuck on. Any other two turn back after 1.2 s, and a tag on the wrong picture shows where it would peel.
- **Answer position (measured):**
  - The target sits in each frame a quarter of the time (± 1).
  - The nearest look-alike sits beside it (row or column) in exactly half the rounds.
  - On memory boards a picture and its tag are adjacent about half the time (between 25 % and 75 %, never always or never).

## Deviations from the design (each measured or ruled)
- **The tag never speaks its word before it sticks.** §5 offered "tap the tag → TTS says the word". That would let a child match by ear and skip reading, and decoding is the whole task, so it is not built. Tapping a picture still says the picture's name where TTS exists.
- **"Word families" are "Rhyming words" in every locale.** German *Wortfamilie* and Dutch *woordfamilie* mean words sharing a stem (fahren, Fahrrad), not a rhyme. Every family is a rime set and must rhyme in speech. The gate checks the shared rime from the vowel, and the note prints that rime (*«-eis»*, not *«-reis»*). Danish *bus* (short vowel) and *ben/pen* are kept out of Danish families.
- **en Level 1 walls rebuilt to the design's own rule.** The design table carried distractors that share no letter with the word (*hat*: bat, sun; *jam*: bus, pig). The gate rule:
  - *close* walls share more leading letters with the word than *far* walls (so the setting really changes the difficulty);
  - at least one *close* picture shares the first letter;
  - every *far* picture shares at most one letter;
  - walls are prefix-free, and no two pictures on a wall could be named with each other's word (cup/mug, Huhn/Hahn and so on).
- **en `bud` out:** a child says "flower" for that drawing. The bus and bun walls use bag, bed, bat and bee instead.
- **en memory boards rebuilt** so that every board shares its first letter, as the design itself says: {hat, ham, hand}, {jam, jar, jug}, {dog, duck, door}, {bus, bun, bed}.
- **en syllables `car·rot / car·pet` → `rain·bow / rain·coat`.** The first syllables of carrot and carpet do not sound the same (/kær/ vs /kɑr/).
- **Pictures out:**
  - *Refused or misread drawings:* the truncated geometric "cone" (es/it *cono*, de *Kegel*, sv *kon*, en *cone*), the ox (pt *boi*), the Easter egg (fi *muna*), the decorated sun (`weather/sun`), the empty clothing/pants file (de *Hose*).
  - *No vocabulary entry:* sv *läpp*, it *mento* and *rapa*, pt *chuva*, fi *poro*.
- **Two recorded name exceptions:**
  - de *Hase* (the label is *Kaninchen*; children say *Hase*);
  - pt *sapo* (the label is *rã*; Brazilian children say *sapo*).
- **Syllable splits come only from `approved-words-<loc>.json`** (TeX-agreed, ≥ 3 sources, not policy-managed). Danish reaches 7 rounds with a single extra *ka·jak → ka·nin* round.

## Reviewer fixes (one native + pedagogy reviewer over all 11 locales, applied at the source)
- **en:** `hintPeel` reworded ("The first {k} letters stuck"). The *jam* wall's jar was checked: it is an empty jar, so there is not a second right answer.
- **de:** the *Auto* wall rebuilt (Auge, Apfel, Affe / far Apfel, Affe, Ameise). The rime is printed as *-eis*. *Kegel* is out.
- **nl:** *mus* (children say "vogel") and *bol* (they say "bal") are out. *le·pel / le·lie* is replaced by *pan·da / pan·nen·koek*.
- **da:** *ko·bra / ko·li·bri* is out. The rime is printed as *-o*.
- **sv:** *gi·raff / gi·tarr* is replaced by *pa·pe·go·ja / pa·ra·ply* (first syllables /ɧi/ vs /ji/). *hök* is out. The rime is printed as *-ål*. `ariaCardDown` → «med baksidan upp».
- **es:** *col* is out (Spain usage; Mexican children say *repollo*). The rime is printed as *-obo*.
- **it:** *scale* is out: next to *scala* it would give two right answers.
- **pt:** the rime is printed as *-obo*.
- **fr:**
  - `hintTray` → «sur le plateau»;
  - the new intro now reads «Les noms des images commencent pareil»;
  - *louche* is out.
- **fi:** *gekko* and *lava* are out. `ariaApart` → «Pura lappu taas osiin».

## FROZEN-NOTEs (frozen metadata untouched, mismatches reported)
- **en:** the title says "Tap the Picture" and "Decoding CVC Words". The child now hangs a tag, and the syllables level is not CVC.
- **nl:** the title names "Oscar de uil", but there is no owl in the activity any more.
- **de, es, pt:** the intros name the old owls (Emil die Eule, Lola la lechuza, Cora a coruja) and "tap the picture".

## Gates
- **`verify-name-tag-core.js` (13,492 / 0)** has its own oracle, so nothing is read off the core's answers. It checks:
  - the grapheme stick test, with marks counted as their own letters;
  - one right picture per tag;
  - close / far / prefix-free / confusable walls;
  - rimes that rhyme;
  - approved syllable splits;
  - memory boards that share their first letter;
  - the state machine;
  - deal balance;
  - every hint key reachable;
  - the manifest mirrors the core;
  - frozen metadata from git;
  - only this row removed from choice-board.
- **`mutate-name-tag.js`:** 18 / 18 mutations killed.
- **`local-test-name-tag.js`:** a real pointer plays every round of every level in 11 locales at 704, plus the keyboard path. The 320–1366 sweep covers rest and miss states.
- **Other checks:**
  - `visual-qa-activity.js` passes in en, de, fi, fr and sv (72 renders each);
  - `audit-activity-hierarchy.js` 398 / 0;
  - `audit-settings-efficacy --tool=name-tag-activity`: both settings change the board;
  - `preflight-activity-routes`, `preflight-indexable-routes` and the 11 `verify-activity-content-*` gates are green.

## Deploy (2026-10-20)
- Commit `21150cd1`. Copied the files, the preview and the trimmed `choice-board-activities.json` to `/var/www/lcs-media/mini-tools/`, then ran `deploy.sh`: EXIT 0, payment canary clean, server 133 GB free.
- `live-verify-name-tag.js`: 75 / 0 on production (en, de, sv, fi at 1366 + 390). The first run raced the page cache (35 / 5 "page embeds"); the re-run was clean.
- Variety probe (en): 12 distinct, pass 2 reshuffled.
- All 11 locale pages return 200.
