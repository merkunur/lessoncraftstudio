# #64 — Wake Up, Pip! → THE FLIPBOOK (RL.K.2, all 11 locales)

ORDER row 64 · id `wake-up-pip.retell-story.rl-k-2` (kept).
- **Files:** new `wake-up-pip-core.js`; `wake-up-pip-activity.js` and the html rewritten. The html no longer loads the shared `retell-story-core.js` (left untouched) and no longer pins `#lcs-root` to 100% height.
- **Manifest:** `wake-up-pip-activities.json`, edited as text. The params (the old retell rounds and 6 translations) are replaced by a mirror of the core: rounds per game and book size, per locale.
- **Metadata:** slugs, titles and intros are frozen in en, de, fr, es, pt, it and nl (gate hash). sv, da, no and fi are new: slug, title, intro, and GRADE_OVERRIDE '1'. That matches fr CP; the other locales keep the frozen grade-2 rulings made for the old design.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Legacy:** `verify-retell-core.js` exits 0 with a pointer, because the row no longer carries retell rounds. `local-test-wake-up-pip.js` is rewritten.
- **Design:** `designs/064-wake-up-pip.md`. CSS prefix `wup-`.

## The apparatus and its invention: A FLIPBOOK ONLY MOVES IN STORY ORDER
- **WATCH.** The story plays in a ring-bound flipbook, page by page with its caption. Then the pages fall out into the loose pages; the slots are hidden during the watch, which keeps the no-copy invariant. "Watch again" is always available in the 3-page book, once per round in the 4-page book, and glows at miss 2.
- **The slots.** Four (or three) page slots with rings and dot tabs. Each page card shows its library pictures side by side at their floor size (96 at 704, 64 on a phone), each at its height in the story, with drawn cues: water level and pebbles in the glass, the sunbeam, "3 · 2 · 1", the duckling's call, the seed and the wave.
  - Tap or drag a loose page into a slot. A page dropped on a filled slot swaps with it.
  - Number keys 1–4 drop the picked page into that slot.
  - Tapping a locked page opens the flipbook to it.
- **Flip!** plays the stack in the big viewer. Library pictures glide between pages (keyed per picture, 300 ms).
  - **Wrong order:** the story runs backwards and the flip stops there; the two pages jiggle (miss).
  - **A trivial page** is a dead frame: its main picture stays exactly where the neighbour page has it, and a grey pause bar shows.
  - **A foreign page** brings a stranger in.
  - **Miss 2:** the right page ghosts into the first wrong slot, and Watch again glows.
- **Success.** Pip, the library hedgehog lying under a drawn blanket, sits up. The retell ribbon puts a STARTER label (First / Next / Then / At the end; in 3 pages First / Next / At the end) over each page's own sentence. They are never glued into one sentence, which keeps word order correct in de/nl/sv/da/no.
- **Games:**
  - **Story order:** 8 books; the loose pages never arrive in order or reversed.
  - **The missing page:** 8 books; all but one page are locked; the choice is key / trivial / foreign; the key's tray slot is 3/3/2 per pass; the empty slot is first/middle/end 2/4/2.
  - **Fix the flipbook:** 8 books; two pages swapped or one foreign page; the faults touch every slot.
- **Settings:** Game · Book (3 / 4 pages) · Sentences (Match the sentences: after the right order, the captions arrive as strips, never in page order, to lay under the pictures; wrong strips slide back).

## Content decisions (beyond the design)
- **Picture size:** two overlapping 96 px pictures in a 156 × 140 card would be unreadable, so cards show their pictures side by side.
- **Distinct cards:** cards that looked alike were made distinct (the duckling's last page, the rebuilt sandcastle).
- **Mother Duck:** the library duck is the duckling drawing, so Mother Duck keeps her 1.3× size on every card, overlapping a little rather than shrinking.
- **Seed story:** `spring/bud` is a red bud, so the caption says "a little bud", not green.
- **Crow story:** it uses a glass, not the design's jar, which has a lid.
- **3-page books (from the review):** the sandcastle book drops the bucket page and keeps the building page; the duckling book drops "lost" and keeps the call that Mother Duck hears.

## Native + pedagogy review (one reviewer; every caption, sentence, starter, string and the prose of 11 locales)
- **MUST**, fixed at the source:
  - 3-page sandcastle gap (all 11 locales);
  - no «padler bort» (= paddles away);
  - pt «soltinho» (= loose);
  - nl «verteltlint» typo, and «vliegt over»;
  - fi «Kai» (= probably) → Kaapo; «ui luo» → «ui sen luo»; «puhkeaa kukkaan» → «Kaunis kukka aukeaa!».
- **SHOULD**, applied:
  - the sun's trivial bee no longer "buzzes past Pip" (it could read as the thing that wakes him);
  - prose: "all the pages but one are already in the book" (was "three", false in the 3-page book); no "Flip!." double stop; en "presses Flip!";
  - captions: da, sv, no, es, it, pt, fr and fi wording.

## FROZEN-NOTEs
- **Grades:** de "Klasse 2", es "2.º grado", pt "2.º ano", nl "groep 4" and it "classe seconda" were set for the old design; the new one is a K-1 retell.
- **it intro:** it says "film in quattro scene" and "lettura ad alta voce 🔊".
- **Sign-up wording:** fr «sans inscription» and it «senza registrazione».

## Gates (local, all green)
- **verify-wake-up-pip-core:** 11321 pass, 0 fail. It checks the stories, the drops, every level's deal and order rules, the dead frame, the ghost, and the retell.
- **mutate-wake-up-pip:** 21/21 mutations killed. One of them, "miss 2 ghosts the wrong page", needed a new stack test (1 3 2 4).
- **local-test-wake-up-pip:** every round × 11 locales, real pointer, at 320·360·412·704·768·1024·1366. The narrow re-sweep after the 320 fix is 672/0. At tiny widths "Watch again" shows its icon only and keeps its full aria-label.
- **visual-qa:** en 48 renders green; fi green.
- **Other audits:**
  - audit-activity-hierarchy: 242/0;
  - audit-settings-efficacy: 3 settings live;
  - both preflights pass;
  - verify-activity-content: ×11.
- **My own read:** the 360, 704 and 1024 renders (order with a picked page, missing at miss 2 with the ghost, fix at success with the ribbon).
