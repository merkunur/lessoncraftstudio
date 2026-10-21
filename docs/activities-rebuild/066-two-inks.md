# #66 — Inky's Book Workshop → THE TWO INKS (RL.K.6, all 11 locales)

ORDER row 66 · id `inky-book-workshop.author-illustrator.rl-k-6` (kept).
- **Files:** a new `inky-workshop-core.js`; `inky-book-workshop-activity.js` and its html are rewritten. The html no longer loads `author-illustrator-core.js` (left untouched) and no longer pins `#lcs-root` to 100 % height.
- **Manifest:** in `inky-book-workshop-activities.json`, edited as text. The old rounds/roundsL10n are replaced by a mirror of the core: books per Jobs setting, per locale.
- **Metadata:** slugs, titles and intros stay frozen in en, de, fr, es, pt, it and nl (gate hash `812c0880…`). sv, da, no and fi are new: slug, title, intro, and GRADE_OVERRIDE '1'.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Legacy gate:** `verify-author-illustrator-core.js` exits 0 with a pointer. `local-test-inky-book-workshop.js` is rewritten.
- **Design:** `designs/066-inky-book-workshop.md`. CSS prefix `iw-`.

## The apparatus and its invention: each maker can only make their own mark
- **The press:** Inky (the library octopus; pt Tinoco, it Nino, kept from earlier rulings) prints a page with one half missing. Each page is one library picture in a framed box above three ruled lines with one sentence. Finished pages stack beside the press.
- **The desks:**
  - **AUTHOR:** `activities/writing`, a man writing at a desk, with a ruled-lines tool mark.
  - **ILLUSTRATOR:** `occupations/artist`, a child at an easel, with a frame mark.
  - **READER:** `activities/reading`, a girl reading, with an open-book mark.
  - **Plates:** each desk shows its role name on a plate, using the FORMAL book-cover words kept from §A.13.61 (es Autor/Ilustrador/Lector, nl Schrijver, sv Författare/Illustratör/Läsare, fi Kirjailija/Kuvittaja/Lukija …).
  - **Seats:** the seat order rotates per book.
- **Delivering a page:** tap a desk or drag the page onto it.
  - **The right maker** finishes the page: the sentence types itself onto the lines, or a brush-sweep reveals the picture. The reader underlines the words while a light passes over the picture, and the sentence is read aloud where TTS exists.
  - **The wrong maker** still makes their mark, in the wrong place: the author crams tiny words into the empty picture box, the illustrator paints a squashed picture on the word lines, and the reader stops at the gap with a blinking caret. Then the ink drips and the page comes back.
  - **A finished page** given to the author or illustrator: their mark hovers and wiggles, because there is nothing to do.
- **The cover:** the book's picture and two credit slots, one marked by ruled lines (words) and one by a frame (pictures); they swap sides per book. The author's portrait goes on the words slot and the illustrator's on the picture slot. A wrong slot gets a smear (letters or paint) and the portrait slides back. Both stamped → the cover flips, Inky rocks, and the book is done.
- **Settings:**
  - **Jobs:** author and illustrator (2 pages a book), or + reader (3 pages; page 3 is finished and goes to the reader).
  - **Desks:** open, or name plates only. Closed doors hide the people and their marks, so only the WORDS decide. Miss 2 opens them.
- **Misses:**
  - Miss 1: the hint names the wrong person's job ("The author writes the words. This page needs a picture.").
  - Miss 2: "Look at what is missing: words or a picture?", the empty half pulses, and the doors open.
- **Balance:** per pass the author finishes 8 pages and the illustrator 8. The person for page 1 sits in each seat equally often (4/4, or 3/3/2), never three books running.

## Content decisions (beyond the design)
- **K1 storm page:** `weather/stormy` is a red cloud (RULINGS), so page 2 is `weather/rainy`, "Then it began to rain." Every page-3 sentence names its own picture: "The lighthouse showed the way home.", "Dragon’s bed was ready.", "It landed on a house.", "A sunflower grew tall."
- **Pass length:** a pass is all 8 books in a fresh order, not 4 of 8, so a pass has ≥ 7 different rounds.
- **The cover:** it is completed by the stamps themselves, not by a separate Check. The shell Check stays hidden and is pressed on success.
- **Reader pronouns:** the reader picture is a girl, so no text gives the reader a male pronoun (fixed in the de/pt/fr prose).

## Native + pedagogy review (one reviewer over every sentence, string and the prose of 11 locales)
- **MUST, fixed in all 11 locales:** the moon book switched tense (page 1 present, pages 2–3 past). Page 1 is now past.
- **MUST, fi:**
  - «Pöllö katsoi ylös kuuhun»;
  - «Tälle sivulle tarvitaan …» in two hints;
  - «oma musteensa» in the new intro.
- **SHOULD, applied:**
  - the moon book's page 3 shows ONE star, so the sentence is singular in all 11 locales;
  - de/nl/da/sv/no: the task line ends "bring it to that person";
  - de: «neben die Linien / den Rahmen»; «Die Krabbe klopfte den Takt»;
  - nl: «De uil keek omhoog naar de maan»; «haalde hem naar beneden»;
  - sv/no: «slog/slo takten»;
  - it: «ha preso il largo»; «in un albero»; «Senza cronometro»;
  - pt: «na prensa»; «Sem cronômetro»;
  - fr: «Seulement les plaques»;
  - fi: «kasvoi korkeaksi»; quoted plate words in the prose.

## FROZEN-NOTEs
- **Intros:** the en, de, fr, es, pt, it and nl intros still describe the old tap-a-card game («Toca al autor o al ilustrador», «tik je: schrijver, illustrator of lezer»). es also says «sin registro».

## Gates (local, all green)
- **verify-inky-workshop-core:** 9724 pass, 0 fail. It covers:
  - every page × every person against the gate's own ink table;
  - the books and their balance;
  - the cover (including a stamped portrait that cannot be moved);
  - the deals over 800 seeds a setting;
  - the round;
  - texts and strings ×11, the manifest mirror, the frozen hash.
- **mutate-inky-workshop:** 17/17 killed. "A portrait stamped twice" survived the first run, so the gate gained a test.
- **local-test-inky-book-workshop:** 3624 pass, 0 fail. Real pointer, every book in both Jobs × Desks combinations in all 11 locales, plus a width sweep at 320–1366 with rest, wrong ink, miss 2 and cover. The first sweep found the cover picture at 94 px (58 on a phone); it was fixed to its floor.
- **Other audits:**
  - visual-qa: en and fi, 48 renders each, passed;
  - audit-activity-hierarchy: 266/0;
  - audit-settings-efficacy: 2 settings live;
  - both preflights: pass;
  - verify-activity-content: ×11 pass.
- **My own read:** the 360, 704 and 1024 renders (closed doors at 360, miss 2 with the pulsing frame at 704, the cover with the stamped author at 1024). I also read the probe renders of the author's tiny words in the picture box and the illustrator's squashed dragon on the lines.

## Live (2026-10-21, commit `b1cc52ac`)
- **Deploy:** git pull, cp the 4 mini-tools files, chown, deploy.sh exit 0. The preview webp was uploaded first.
- **live-verify-inky-book-workshop:** 75 pass, 0 fail. The first run raced the page cache. It covers:
  - all 11 pages return 200;
  - en/de/sv/fi at 1366 and 390: real pointer, wrapper 9.805;
  - the wrong maker gives its hint;
  - both pages finished;
  - the author on the picture slot slides back;
  - both stamped gives the success text;
  - the iframe grows with the card.
- **Variety probe** (en/sv/fi): 8 distinct books, and pass 2 is reshuffled.
