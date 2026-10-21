# #60 — Read Common Sight Words → THE BLINK CAMERA (RF.K.3.c, all 11 locales)

ORDER row 60 · id `choice-board.read-sight-word.rf-k-3-c` (kept).
- **Files:** new `blink-camera-core.js`, `blink-camera-activity.js` and `blink-camera-activity.html`.
- **Manifest:** the row stays in `choice-board-activities.json`, edited as text. Its `tool` is repointed, and its params became a mirror of the core (games × rounds per locale). Every other row is byte-identical.
- **Metadata:** slugs, titles and intros are frozen in the 10 locales that had them; the gate checks them by hash. fi is new: slug `lue-yleisia-pikkusanoja-esiopetus`, a title and an intro. Grade stays K, strand Reading: Foundational Skills.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Prose:** rewritten in all 11 locales. Every example is a real round, checked against the core.
- **Design:** `designs/060-choice-board.md`. CSS prefix `bcm-`.
- **Legacy:** `verify-sight-word.js` filters on the old template, so it now checks row 61 only. `local-test-sight-word.js` dropped this row with a pointer.

## The apparatus and its invention: A CAMERA THAT SHOWS THE WORD FOR ONE BLINK
- **The camera.** It has a teal body, a coral shutter button, and a lens with a six-blade iris that slides open and shut. A three-dot blink dial (long 2.0 s · medium 1.2 s · short 0.7 s) is the same value as the Blink setting; the dial writes it. A photo slot runs along the bottom. On a phone, the album dot strip sits beside the camera and the help photo replaces it there.
- **The blink:** while the shutter is open the board lies face down. When it shuts, the cards flip up, staggered 60 ms apart, and only then. Snapping again hides the board again and is never a miss.
- **The games** (the Game setting):
  - **Snap and find:** four cards, the word and its three look-alikes. The word sits in each slot twice a pass.
  - **Find every one:** 12 tiles hold the word 3, 4 or 5 times. The child brackets each copy with camera corners, then answers how many (tiles 1–6). The copies spread over the slots (2–4 per slot a pass), and no row or column holds them all, at 4 wide or 3 wide.
  - **In the story:** one library picture and 2–3 sentences. Capitals count; an elided l’ / d’ never does.
- **Misses:**
  - Snap and find: miss 1 flips the card back and the camera looks again by itself, one step longer. Miss 2 sets the photo beside the cards and glows the differing letters, the extra letters (dashed) and the missing ones.
  - Hunts: brackets on look-alikes fall off. At miss 1 a missed capital copy glows; at miss 2 the photo appears and dashed frames mark the copies still to find. A wrong count numbers the brackets. A found grid asking for the count is not a miss.
- **Success:** the photo develops and lands in the album (8 frames per pass); a full album ripples and takes a group picture. Album photos re-flash in the lens.

## Words (11 locales × 8, the old targets kept)
- **Look-alikes:** every one is a real word on the gate's reviewed list and shares a letter with the target (base letters, so pt é / e counts). One of them starts with the target's first letter, so the first letter alone never gives the answer. The old rhyme sets broke that rule (de ein / sein / kein / nein, auf / Lauf / Kauf, fr pour / cour / jour …) and were fixed.
- **The no-reading bot** ("the card that shares the most letters with the others") wins at most 3 of 8 rounds per locale, ties split. The old sets scored up to 5.3 / 8, because a look-alike built from the target makes the target the most "typical" card. Swaps include: en and / hand / band, go / good / dog; nl het / heet / heeft; sv det / detta; da med / mod / dem; es con / cono.
- **Three look-alikes shared no letter with their word** (nl op / en, sv är / en, fi ja / ne). The gate found them and they were replaced.
- **Stories:** the word appears 2–3 times, in at least two sentence positions (first · middle · last), with a look-alike in every story, a capital copy in at least 4 of 8, and the picture named by its library name.

## Native + pedagogy review (one reviewer, all 11 locales): every fix applied at the source
- **MUST:**
  - sv: the instruction was ungrammatical, and «Hunden är rund som en boll» was silly and false.
  - pt: the prose said the word reappears «mais devagar» (more slowly); it stays up longer.
  - fr: the story spaces before «!» are now U+202F (the renderer keeps the written space).
  - fi: esiopetus follows «Esiopetuksen opetussuunnitelman perusteet 2014», not OPS 2014. The intro and prose are fixed.
- **SHOULD:**
  - Look-alikes: en liked → lime (an inflection the child may take for the same word), de Mist → isst and eine → Bein, sv ned → mer.
  - Story fixes: en «bit off a big piece», nl, da (×3), sv (×2), no, it and pt; fi «Ota sinä tämä».
  - Hint wording: de, da, sv, no, it, fr, fi. ariaDown in da, no and fi.
  - Settings and prose: nl Middellang, es «Toma la foto y encuentra», fr «Clique et trouve», sv «på ett ögonblick», es prose.
- **Not taken:**
  - de Henne → Huhn: the vocabulary names this drawing «Henne», and «Huhn» is the identical chicken drawing (RULINGS: use one).
  - Two suggested stories (da horse, fi apple) would have put both copies first in their sentences, so the gate's two-positions rule kept my own wording.

## FROZEN-NOTEs
- The frozen intros in all 10 locales still describe the old audio game («hear a word, tap it»). The de intro says «ohne Anmeldung» and the fr intro «sans inscription».
- de / fr / nl / sv / da / no titles name grade 1 (Klasse 1, CP, groep 3, åk 1, 1. klasse, 2. trinn); the chip follows K. Not touched.

## Gates
- **`verify-blink-camera-core.js` — 95,251 / 0.** The gate keeps its own ground truth:
  - its own tokenizer and copy counter, and the reviewed word list per locale;
  - the first-letter rule and the no-reading bot;
  - the deal rules over 60 seeds;
  - the state machine;
  - strings ×11 (placeholders, nothing "free", fr narrow spaces);
  - the manifest mirror, the frozen-metadata hash and the fi metadata.
- **`mutate-blink-camera.js` — 21 / 21 killed.** Two survived the first run (the second-snap hiding, the capital glow at miss 2); the tests were strengthened.
- **`local-test-blink-camera.js`:**
  - every round of all three games in 11 locales at 704, with a real pointer;
  - the dial (tap and the D key) and the setting reset;
  - album re-flash and the phone album;
  - the sweep 320–1366 (en) and 320 · 704 · 1366 (all) at rest / up / help / count / won;
  - the longest word in the lens.
  The first full run found the dial / drawer mismatch: turning the dial and then choosing the same drawer value left the dial wrong. The dial now writes the setting.
- **`visual-qa-activity.js`** (en, fi): 48 renders each, green.
- **`audit-activity-hierarchy.js`:** 146 / 0.
- **`audit-settings-efficacy.js --tool=blink-camera-activity`:** Game and Blink both change the board.
- **Preflights and content:** `preflight-activity-routes`, `preflight-indexable-routes` and `verify-activity-content-<loc>` ×11 green.
- **My own read of the renders** found:
  - every tap re-flipped the whole board (fixed: the flip plays only when the shutter shuts);
  - the story lost its spaces («bus .Do»; a heredoc ate `\s`);
  - the gappy short words;
  - the shutter overhang clipped in the thumbnail;
  - Check below the fold on phones (fixed: the dots and photo sit beside the camera, the count fits one row, and the story picture floats).

## Deploy
- `a342405e` deployed 2026-10-21: the preview webp scp'd; git pull; the three files + `choice-board-activities.json` copied to `/var/www/lcs-media/mini-tools/` before the build; `deploy.sh` exit 0; payment canary clean; server 133 GB free of 436 GB.
- `live-verify-blink-camera.js` — 99 / 0:
  - all 11 pages 200 (fi new);
  - en / de / sv / fi at 1366 and 390: Check before snapping asks, the shutter hides the cards, a wrong card → miss, the right one → right with the filled success text, a full hunt with the count, every copy in a story;
  - the iframe grows with the card.
  - The first run raced the page cache (old iframe); the rerun is the record.
- Variety probe on production: 8 distinct, pass 2 reshuffled.
