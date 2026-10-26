# #118 — Bea's Two Bookshelves → THE SHAKER SHELF AND THE RIBBON SHELF (RL.1.5; all 11 locales)

ORDER row 118 · id `bea-two-bookshelves.story-or-fact.rl-1-5` (kept). Design: `designs/118-bea-two-bookshelves.md`.

## Files and wiring
- **Files:**
  - `mini tools/bea-two-bookshelves-core.js` is new (`BeaShelvesCore`) and holds the model:
    - fifteen books per locale (eight stories, seven all-about fact books), each with a title, a blurb and three inside pages;
    - the three levels; the shelves' tests; the hints; the help from miss 2; the plan (a balanced slot table per level, moved by one each pass).
    - DATA is written by a build script that checks every story for a beginning and an ending and every fact page for a heading and no sequence word.
  - `bea-two-bookshelves-activity.js` is rewritten. It draws Bea and her ask, the desk of covers, the open book with its shake knob, the two shelves and Check (CSS prefix `bs-`, `apparatusClasses: ['bs-shelfart']`).
  - `bea-two-bookshelves-activity.html` loads the new core in place of `story-fact-core.js`. That file has a 0-line diff and is no longer loaded by any page (removing it is an operator step). The html drops its `#lcs-root{height:100%}` pin.
- **Manifest:** the row stays in `bea-two-bookshelves-activities.json`.
  - `params` = `{books: [ask, topic, fill], pages: [closed, open], rounds: 8}`; the old rounds are retired (in git).
  - en, de, fr, es, pt, it and nl slug, title and intro are frozen.
  - **sv, da, no and fi slug, title and intro are authored new.**
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.862.
- **Prose:** en, de, fr, es, pt, it and nl replaced; sv, da, no and fi added. Every quoted title and page is in the data.
- **Strings:** 40 keys × 11.
- **Sources** (scratchpad):
  - `bs-src.js` (every locale's books) → `bs-build.js` (the text checks, the Fill sets, then DATA);
  - `bs-strings.json` → `bs-apply.js`;
  - `bs-prose.js`, `bs-manifest.js`, `bs-dump.js` (the review dump), `bs-qcheck.js` (prose quotes), `bs-e-*.js` (edits), `bs-probe.js` (renders), `bs-sheet.js` (contact sheet).

## The invention
**Two shelves that test a book the way the book is built.**
- **The ribbon shelf** threads a ribbon through the pages from the first to the last. A story's pages light one after another and the ribbon ties a bow. A fact book's pages light all at once (no beginning, no end), and the ribbon slips off.
- **The shaker shelf** shakes the pages into a new order. A fact book stays upright: every page still makes sense. A story comes out ending first ("At last she found it on her own front step." on top), its time words underlined with dots; it slumps and hops back to the desk.
- **Free play:** any book can be opened and shaken at any time with the knob on its spine; closing it puts the pages back in order.
- From miss 2 the right book (in Fill, the one that just came back) opens by itself with its tell-tale words underlined: a story's beginning words, name and ending words; a fact book's three headings. A new move takes the help away.

## The three levels
- **Bea asks** (the kept rounds): three books; Bea asks for the story or the fact book; only the asked shelf takes a book.
- **Same topic:** two books share a topic, one of each kind (a bee story and a bee fact book), so the topic can never decide.
- **Fill both shelves:** four books, two of each kind, at least one same-topic pair, no ask. A book that passes its shelf's test stays; the ones that fail come back.

## Deviations from the design (each measured or ruled)
- **Tap a book, then tap a shelf**; no drag. The open book sits over the desk (the design's overlay), so a shelf tap always means "the open book goes here". A book on a shelf tapped with another book open sends the open one to that shelf, because the tap meant the shelf (found by the local test: the centre of a shelf is where its books stand).
- **On phones the open book shows its three pages stacked**, not one page at a time with dots: reading all three is the point, and the stack fits.
- **Below 340 px Bea steps aside** (her ask stays, full width), the #115 / #117 precedent. A 360 phone gives the card 328 px, so this includes 360.
- **"Open on the desk"** lays each book out as a row: its cover, then its three pages; a tapped cover gets the shake knob, which shakes only that book.
- **Titles retitled after measuring the title-word shortcut** (a child who does not read picks the fact book by "How / All About / Real"):
  - **The bee story became "How Buzz Got to the Moon"** in every locale (*Wie Summsi zum Mond kam*, *Miten Surri pääsi kuuhun*…): a story whose title sounds like a fact book, so the title can never decide.
  - **"Boats That Float"** and **"Diggers and Cranes"** lost their give-away words where a locale had them (*Boote, die schwimmen*, *Excavadoras y grúas*…).
  - The bot now expects 2.8–4.7 of 8 (≤ 5) in every locale and level.
- **Review retitles:** "All About Real Bugs" → **"All About Insects"** (a bug is not always an insect, and page two says every insect has six legs); "How Tall Trees Grow" → **"All About Trees"** (no page is about growing, and a growth book would go in order).
- **One cover per book** (the design's Bea is `insects and bugs/worm`). The Brave Red Boat uses `beach/sailboat`, whose hull is red; `vehicles/boat` (a motor boat) is the fact book's, which talks about engines.
- **Blurbs:** the trees blurb no longer describes a process ("A seed becomes a tree over many years" → "Real facts about roots, leaves and bark."); de/nl "How many bones do you really have?" blurbs (the pages give no number) now describe the book.
- **Fact books are all-about books.** The prose names the honest scope: how-to and life-cycle books do go in order.
- **Kept, with reason:** the shelf hints name the kind of the book that just bounced ("A book that has to go in order is a story."). The shelf's test has already shown it, so the hint gives away nothing the child has not seen.

## Pictures
13 pictures, all checked by eye on the contact sheet: worm (Bea), dragon, ladybug, excavator, x-ray, mitten (one yellow mitten — every Bunny story says yellow), apple tree, bee, sailboat (red hull), motor boat, sock (green striped), acorn, rabbit. The same picture sits on both books of a topic pair (bee, tree, excavator) so a picture never decides.

## Review
ONE native + Grade-1 reading reviewer over all 11 locales. No round or picture defects.
- **MUST, applied:**
  - **fr:** "un documentaire apprend de vraies choses" reads as *learns*, not *teaches* → *donne une vraie info à chaque page*.
  - **es:** the honey book's title had no subject → *¿Cómo hacen miel las abejas?*
- **SHOULD, applied:**
  - **"page by page"** in the fact book's success line and prose implied an order, the opposite of the lesson → "a true fact on every page" (×11).
  - The Fill bubble named the shelves by their tests; the hints named them by kind → both names now ("the story shelf, with the ribbon").
  - "Big diggers roll on tracks" overgeneralised → "Many big diggers…" (×11); "dug a hole, then a hill" → "dug a hole, piled up a hill" (×10).
  - en insects and trees titles (above); de *gestreifte Socke*, *gräbt mit seiner Schaufel*; fr *Où vivent les insectes ?*, *en sautillant*, *ver qui adore lire*, *Les petits dragons qui avaient sommeil*; es / pt / it headings name the insects; pt *mercadinho*; it *Le ossa del tuo corpo*, *vermetto* (not *bruco*, a caterpillar), *Chiuse finché non apri il libro*; nl word order and *De twee boekenplanken van Bea* (the strings say *plank*); da *rystet rundt* (*rystet sammen* means bonded); no word order, *begynnelse, midt og slutt*, *Kaniner som lever fritt*; fi *tosiasioita*, *hyllyyn* everywhere.
- **Open (frozen metadata, not edited):** the it page intro still calls Bea *il bruco dei libri*; the en..nl intros describe the old covers-and-blurbs task.

## Gates
- **`verify-bea-two-bookshelves-core.js`:** 24,251 checks with its own ground truth (which books are stories, the topic pairs, every locale's beginning / ending words, case-blind sequence words, character names and fact-sounding title words written in the gate). It covers:
  - the books ×11: three pages; a story opens with a beginning and its third page with an ending; fact pages have headings, no sequence word, no name; pictures exist in colour themes;
  - the rounds; for EVERY book of EVERY round, level, slot and locale: the shelves' tests, the empty Check, the miss, the help from miss 2 and its removal; every 2+2 Fill arrangement; one book at a time; shake never leaves the order as it was, close restores it;
  - the slot table ≤ 3/8; the title-word bot ≤ 5/8; the plan; strings ×11 and the manifest.
- **`mutate-bea-two-bookshelves.js`:** 17 of 17 mutations killed, and the control survived. Two survived on the first run and each fixed the gate or the harness: a page starting "Then…" got past a case-sensitive sequence list (now case-blind), and the shake mutation was rescued by a fallback line (the needle now covers both).
- **`local-test-bea-two-bookshelves.js`:** real pointer, 11 locales.
  - The scenarios: the settings; an empty Check; a shelf with no book open; the other shelf resting; a cover opening in order; the knob shaking; close and reopen in order; a book onto the shelf and back; the wrong book's test → the shelf's own hint; miss 2 → the asked book opens with its marks; the close tab removes the help; the right book → the success line and the spine band; Same topic's twin; Fill's swapped pair (two back, two stay); pages open on the desk (the knob shakes only that book); the animated ribbon test.
  - Then every round of every level at rest / miss 2 / solved, resized through 320–1366: no sideways scroll; Check above the fold at rest; Check and hint in view at miss 2; the success line in view; controls ≥ 44; cover pictures and Bea ≥ 64 / covers ≥ 96 from 704; everything inside the card; no overlapping bands; no word cut off; books inside their shelves.
  - **29,359 pass, 0 fail** (then 13,519 / 0 at 600–1366 after Bea went to 96 px wide).
  - It found: a shelf tap landing on a book already standing there (now it means the shelf); the 320 fold (Bea steps aside, tighter shelves); fr / nl Fill bubbles too long at 320 (shortened, both shelf names kept).
- **`visual-qa-activity`:** PASSED, 48 renders. **`audit-activity-hierarchy`:** 562 / 0 (the shelves declared as the apparatus; Bea raised from 84 to 96 px on wide screens to clear the picture floor). **`audit-settings-efficacy`:** "books" and "pages" both change the board.
- **Content:** `verify-activity-content-<loc>` ×11, `verify-activity-prose-claims`, `verify-activity-serp-copy`, `audit-activity-content-tells` and `preflight-activity-routes` all pass.
- **Renders read** at 360, 704 and 1024 (en, de, sv, fi). They found the empty-box shelves (redrawn as shelves with a spool and springs), a phone-shaped shaker symbol (now a book with shake lines), the open-book animation replaying on every repaint, and mid-word breaks in German titles (titles now wrap only at spaces).

## Live
`live-verify-bea-two-bookshelves.js` on production: **60 pass, 0 fail**. All 11 pages return 200 with wrapper 9.862. Real pointer in en, de, sv and fi at 1366 and 390: a wrong book opens to its pages in order, fails the asked shelf's test with the locale's hint and returns to the desk; the right book passes with the success line naming it and the spine band. The iframe grows with the card. The first run fell inside the deploy window (the fi pages still served the old embed) and was rerun once.
