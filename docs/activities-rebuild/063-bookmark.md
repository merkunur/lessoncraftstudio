# #63 — Fable's Picture Stories → THE BOOKMARK (RL.K.1, all 11 locales)

ORDER row 63 · id `picture-story.read.rl-k-1` (kept).
- **Files:** `picture-story-core.js`, `picture-story-activity.js` and the html, all rewritten.
- **Manifest:** `picture-story-activities.json`, edited as text. The tool and template are kept. The params (the old stories and their 6 translations) are replaced by a mirror of the core: rounds per game and book size, per locale.
- **Metadata:** slugs, titles and intros are frozen in en, de, fr, es, pt, it and nl (gate hash). sv, da, no and fi are new: slug, title, intro, and GRADE_OVERRIDE '1' to match the six siblings, because the answer surface is reading.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Prose:** rewritten in 11 locales; the quoted example is a real round. The html no longer pins `#lcs-root` to 100% height.
- **Design:** `designs/063-picture-story.md`. CSS prefix `pst-`.

## The apparatus and its invention: THE ANSWER IS IN THE BOOK
- **The book.** Seven little picture books of 3 or 4 pages (setting). Each page is a scene of library pictures on a drawn sky and ground with a caption underneath, and it is shown one page at a time with arrows. Every library picture is at its floor: ≥ 96 px at 704 and ≥ 64 on a phone.
- **The page edge.** The page's number is shown as dots, never numerals. A tap on the scene plays the page's own action and reads its caption aloud.
- **Ask the book.** The question is on a ribbon bookmark. The child taps or drags the bookmark onto one of three kinds of answer:
  - a picture, for who questions: the right thing counts on ANY page;
  - a caption phrase, for where, when, why, how-felt and what-were-they-doing: page-exact; for "where", the place picture on that page also counts;
  - a whole page (its edge), for first, middle, last and after.
- **Check:**
  - The answer line shows what was marked: its name, its words, or its dots.
  - **Miss:** the bookmark comes back and Fable shrugs.
  - **Miss 2:** the book turns to the proving page, which lifts. The caption words of four or more letters that repeat the question light up; when none do, a page hint is given instead.
  - **Right:** the answer line fills, the proving words are underlined in gold, Fable hops, and the bubble reads "{question} — {answer}. It's right there in the story!"
- **Caption the pages.** The bookmark carries one caption sentence, never in the book's own order. The child slips it into the page it tells about.
  - A wrong page plays its OWN action (a miss). At miss 2 every page plays in turn and the right page pulses.
  - The pages of a book never act alike, so there is one solution.
- **Answer pages.** In the 3-page book: 6/6/6, and even within each half of the pass. The order never repeats a book back to back and never repeats the previous order.

## Content decisions (beyond the design)
- **Answer balance:** the design's table claimed 6/6/6 but measured 6/7/5. Mitten "What slipped off?" became "Who found the mitten?" (the robin, page 3).
- **4-page book:**
  - "middle" exists only in the 3-page book, because two pages are in the middle;
  - "last" moves to page 4;
  - "after the moon came up" exists only in the 3-page book (the reviewer found that page 4 also comes after);
  - the picnic feeling question asks about "under the umbrella", not "at the end".
- **Names:** sv/da/no name the bear Bruno (Ben means leg or bone); sv names the hedgehog Hugo (hal = slippery); pt/it/nl call the fox Fábio/Fabio/Fabel to match their frozen metadata.
- **Pictures (contact sheet):** all 29 are colour library pictures. The worn beanie is anchored to the bear's head. Decorations under the floor (snowflakes) were dropped.

## Native + pedagogy review (one reviewer, the whole book text of 11 locales in one dump)
- **MUST** (both structural, fixed in every locale):
  - **Rolling Ball page 2:** the direction phrase ("rolled away" and its equivalents) also answered "where", so it is no longer a target.
  - **Owl "after the moon came up":** it had two right pages in the 4-page book, so it is now 3-page only.
- **SHOULD, applied:**
  - instrCap "the page it tells about" in 7 locales; en "the carrot popped out";
  - de okAsk and instrAsk; nl "gooiden de bal naar elkaar";
  - da/sv/no: pigs "vælter / vältrar / velter sig"; sv picnic phrase; sv ariaEdge; no "trillet … hen"; no titles;
  - es/pt picnic phrases; it "diede un calcio"; fi okAsk;
  - prose: "who questions with a picture; what-were-they-doing with the words"; the it/fi/da wording; Danish, Swedish and Norwegian name order "Ræven / Räven / Reven Fable".
- **SHOULD, not applied:** da/sv/no caption name order ("kaninen Bo"). Changing it would touch every who-answer; it is noted for a later pass.

## FROZEN-NOTEs
- **Old activity described:** the en intro still describes the old activity (three-picture story, "answer questions"). nl («Fabel leest het verhaal voor»), pt (🔊) and it («tre scene … una domanda») describe the old audio or three-panel version.
- **Sign-up wording:** de, fr, es, pt and it intros say "ohne Anmeldung / sans inscription / sin registro / sem cadastro / senza registrazione". Not touched.

## Gates
- **`verify-picture-story-core.js` — 9,973 / 0.** It uses its own answer table, and checks:
  - every locale's 7 books × 4 captions and 20 questions;
  - each phrase answer once on its page, and the answer repeats the phrase;
  - the right-target set computed by the gate equals the core's, and right() agrees on every target;
  - a synthetic second rock proves the place picture is page-exact;
  - pictures (exist, colour, labelled, not refused, never the fox); decoys on ≥ 2 pages; distinct page actions; things inside the scene at 4 layouts;
  - 6/6/6 and the order (half-balance, no repeated book, never the previous order with the same random stream replayed); Caption sentence order;
  - the round and Caption state machines; strings × 11, fr typography, no 0, Bruno;
  - the manifest mirror, the frozen hash, and the sv/da/no/fi metadata.
- **`mutate-picture-story.js` — 21 / 21 killed.** Two survived on the first run (the place picture on another page, and the previous order); the tests were added.
- **`local-test-picture-story.js` — 4,980 / 0:**
  - every Ask round × 11 locales at 704 with a real pointer: tap, drag, miss 1, miss 2 turning to the lifted page, the right thing on another page;
  - the 4-page rounds; every Caption book;
  - scene tap plays; Enter on a phrase; phone arrows;
  - the sweep 320–1366: controls ≥ 44, phrases ≥ 44 tall, every picture ≥ 96 / 64, Check above the fold.
  - **Real bugs found:**
    - miss 2 pinned the book to the lifted page;
    - pt «guarda-chuva» was split by the core but lit whole on the page, so hyphenated words now stay whole everywhere.
  - **From my own read of the renders:** in Caption mode pages 1 and 2 of a book look alike at rest, and only the action tells them apart. Picking a page now plays its action (silently, since its caption is the answer).
- **Other audits:**
  - `visual-qa-activity.js` (en, fi): 108/108 each. It forced wider phrase padding and a tighter 320 layout.
  - `audit-activity-hierarchy.js`: 388 / 0. It forced the one-page book; three pages side by side shrank props to 36–60 px.
  - `audit-settings-efficacy --tool=picture-story-activity`: Game and Book both change the board.
  - Route and indexable preflights, and `verify-activity-content` × 11: green.
- **Wrapper:** ACTIVITY_WRAPPER_VERSION 9.802; html core v=2, activity v=9.

## Live (2026-10-21)
- Commit `e2c06218`; deployed with `deploy.sh`; the preview webp was copied to the server's `previews/`.
- **`live-verify-picture-story.js` — 83 / 0** on production. en, de, sv and fi were driven at 1366 and 390:
  - Ask: Check with no mark asks; a wrong phrase is a miss shown on the answer line; the answer phrase on page 2 wins, with the success text filled.
  - Caption: a wrong page is a miss; every sentence placed wins.
  - The iframe grows with the card (measured after the bubble settles), and all 11 pages return 200.
- **Variety probe on production:** 18 distinct rounds, and pass 2 is reshuffled.
