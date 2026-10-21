# #65 — Dot's Story Spine → THE BOOK THAT CRACKS AND MENDS (RL.K.3, all 11 locales)

ORDER row 65 · id `story-spine.role.rl-k-3` (kept).
- **Files:** a new `story-spine-book-core.js`; `story-spine-activity.js` and its html are rewritten. The html no longer loads the old `story-spine-core.js` (left untouched) and no longer pins `#lcs-root` to 100 % height.
- **Manifest:** in `story-spine-activities.json`, edited as text. The old stories, rounds and l10n params are replaced by a mirror of the core: rounds per task, per locale.
- **Metadata:** slugs, titles and intros stay frozen in en, de, fr, es, pt, it and nl (gate hash `51e26a59…`). sv, da, no and fi are new: slug, title, intro, and GRADE_OVERRIDE '1', the same step as #63 and #64.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Legacy gate:** `verify-story-spine-core.js` exits 0 with a pointer. `local-test-story-spine.js` is rewritten.
- **Design:** `designs/065-story-spine.md`. CSS prefix `ssb-`.

## The apparatus and its invention: a story is a book that cracks and mends
- **The book:** a hard cover in the story's colour with three page places, numbered 1 2 3 once pages are bound. Each page is a scene of library pictures (actor, thing, place) with drawn cues (pond, night, rain sky, indoor floor), plus its caption when Words is shown.
- **The stud ("Read the book"):** the book reads itself.
  - The START page plants a green pennant.
  - The TROUBLE page cracks: a coral zigzag tears it, the page jolts, and its thing gets a coral ring.
  - The FIX page sends the library bandage across the crack. If the fix mends THAT trouble, the crack seals and the ring turns teal.
  - A calm page in the trouble place lies flat (no crack). In Find the trouble the bandage then slides across a whole page and drops.
  - A different trouble cracks, but the bandage peels off and flutters down.
  - A something-else page's bandage peels off too.
  - A nothing-changed page sends nothing; its bandage stays idle in the corner.
  - A page that is not the start in place 1 makes the pennant tip over.
- **Success:** the book closes and stands on the shelf (one spine per story, in the story's colour), and the retell ribbon puts each STARTER as a label over its page's own sentence (First / Then / At the end). The two are never glued together, so word order stays right in every locale. Tapping the shelf reopens the finished books one by one.
- **Tasks:**
  - **Name the parts** (9 rounds). The three pages lie loose and never in story order. Each arrangement keeps one page in place and swaps the other two, so every table place holds every part 3/3/3 per pass. The tab tray cycles through its six orders. Nothing is judged on drop. At the stud the tabbed pages fly into the book in tab order.
  - **Find the trouble** (9 rounds). The child chooses the middle page from the true trouble, a calm page and a different trouble. The right page's table place is 3/3/3 and never three times running.
  - **Find the fix** (9 rounds). The child chooses the end page from the true fix, a something-else page and a nothing-changed page.
  - **Match the sentences** (9 rounds). The strips are always dealt off their own pictures. A wrong strip's KEY WORD is underlined and a dashed search circle looks over the picture. At miss 2, the page that strip belongs to flashes.
- **Misses:**
  - Name: the hint names the first wrong tab, and the pages drop back to the table with their tabs on. At miss 2 the real page shows that part's faint mark.
  - Trouble / Fix: miss 1 gets a hint by kind. Miss 2 gets the story's own hint («Find the page where the nest falls down.»), the right candidate glows, and the other bound page's thing is ringed.
- **Settings:** Task · Words (shown / hidden).

## Content decisions (beyond the design)
- **Layout:**
  - Three page columns at every width; the stacked phone rows of §4 do not fit 320×640 under the shell header.
  - Pictures stay at their floor (96 at 704, 64 on a phone), and a picture never loses more than a sliver off the top of a short page.
  - The Name book is a slim strip until pages bind.
  - The shelf is ONE ≥ 44 px button, because spines of 16 px cannot be tapped.
  - Captions hyphenate where the browser has a dictionary.
- **Picture rulings** (RULINGS.md):
  - `weather/stormy` is a red cloud, so the boat's trouble is "the boat floated away", not a storm.
  - `toys/ball` and `toys/balloon` are both fr "Ballon", so the balloon story's something-else page is a kite.
  - `camping/lake` is a landscape a hat cannot float on, so the hat falls into a drawn pond.
  - The ball cannot fit under the 64–96 px sofa, so it rolls BEHIND the sofa and peeks out.
  - `farm-animals/duck` is a duckling, so the caption says duckling.
- **Story changes:**
  - **Rainy Picnic:** one rabbit, not two friends, so three pictures fit a page.
  - **Key story:** Raccoon, not a second mouse.
  - **Actor on every page:** every page of a story shows the story's own actor (the nest story's actor is the tree). This is why the key story's fix page dropped the flashlight to make room for the raccoon; without it, the fix was the only candidate with no raccoon (a tell).
  - **Picnic different-trouble page:** the crow takes the basket, and its thing is the basket.

## Native + pedagogy review (one reviewer over every caption, key word, hint, string and the prose of 11 locales)
- **MUST, fixed in all 11 locales:**
  - The nest story's TROUBLE key word was "nest", which the start picture also shows. It is now the word for *down* (down, herunter, beneden, ned, ner, ned, tiró, cadere, derrubou, tomber, maahan).
- **SHOULD, applied:**
  - The hat and key TROUBLE key words are now the verb (fell / dropped …), because the pond and the night are also on the fix page.
  - hintStart no longer promises a "where" (most start pages name none): «START is where the story begins: who is in it.» ×11.
  - nl: Match task named «Zinnen bij de plaatjes»; «verhaallint»; «Afgemaakte boeken»; «achteraan».
  - da: Match task named «Sætninger til billederne»; «Hendes hat»; «Han tabte»; «til ham»; «kom svømmende tilbage med den».
  - no: Match task named «Setninger til bildene».
  - es: «La curita no pegó».
  - it: «l’ha riportata indietro».
  - fr: «Deux oisillons».
  - fi: «Kaksi linnunpoikasta»; «yhä jäljellä».
- **Kept:**
  - pt title «Fabo», the pt mascot name; the frozen pt intro also uses it.
  - de «zum Haus», which is shorter for the 320 px page.

## FROZEN-NOTEs
- The intros of en, de, fr, it, nl and pt still describe "Dot the dragon" / «Fabo» and a tap-the-part game. fr also mentions read-aloud for pre-readers, and it 🔊 plus «senza registrazione».
- The grade-1 overrides of de, es, pt, it and nl (from the old design) still fit, since the child reads the captions.

## Gates (local, all green)
- **verify-story-spine-book-core:** 15896 pass, 0 fail. It covers:
  - all 343 ways to fill each story's book against the gate's own crack/bandage table;
  - all 6 tab placements;
  - every candidate;
  - pictures, the actor on every page, distinct pages;
  - deals over 600 seeds a task;
  - the round;
  - texts and strings ×11, the manifest mirror, the frozen hash.
- **mutate-story-spine-book:** 22/22 mutations killed.
- **local-test-story-spine:** 5504 pass, 0 fail. Real pointer, every story of every task in all 11 locales, plus a width sweep at 320–1366 with each task at rest, picked, miss 2 and won.
- **visual-qa:** en and fi, 54 renders each, passed. Its first run found the Name book's empty places were 16 px buttons; they are no longer buttons in that task.
- **Other audits:**
  - audit-activity-hierarchy: 530/0;
  - audit-settings-efficacy: 2 settings live;
  - preflight-activity-routes and preflight-indexable-routes: pass;
  - verify-activity-content: ×11 pass.
- **My own read:** the 360, 704 and 1024 renders (Name miss 2 with the faint crack mark, Trouble miss 2 with the rings and glow, Match miss 2 with the underlined key words, Fix won with the pennant, sealed crack and ribbon).
