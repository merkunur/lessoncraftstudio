# Content graph — what building it measured (2026-11-11)

Numbers from `bash scripts/teaching-graph/pull-decks.sh` (every published page, with a look into the page for a Check button) and `node scripts/teaching-graph/build-assets.js`.

## 1. The catalogue, counted

- **172,996 published pages** in 11 languages (15,428 in Finnish to 16,532 in English).
- **1,190 worksheet types** in the registry; all sit under one of **306 teaching points**. 193 of them were made after the activities programme's map was written and were placed for the graph (`type-additions.json`).
- Per language about **820 types have a published page**, about **437 have a page with an on-screen version**, about **680 form a Level Set** (two or more pages), and about **1,100 are offered by a maker**. So roughly 370 types exist only as maker templates: nothing of them is published as a page.
- 61 classroom tools (60 in Finnish: Heart Words has no Finnish page), 49 of which model at least one teaching point. 204 activities; 164 (da, fi) to 194 (en) have a page in a language.

## 2. The rule "can this page be played on screen" against the pages themselves

The site decides this with a hand-kept list (`frontend/config/interactive-level-set-types.ts`, read through `frontend/lib/level-sets.ts` `pageIsInteractive`). The pull looked into every page.

- **The list is right.** On 172,853 of 172,996 pages the rule and the page agree, among them all 48,552 indexable pages.
- **143 pages disagree, and all for one reason.** They are the pages of the rhyming-words face `g1346` ("Write Your Own Rhymes", open answers, print-only by the list) whose address carries a word-family after the type code (`rhyming-words-easy-g1346-10-at`), 13 in each language. The site's reader of the type code (`variationCodeOf`) expects the code at the END of the address, finds none, and the rule then falls back to "this family is playable". With the code read from the whole address the rule is right on all 143.
- **What this meant for class links (Part 9).** A teacher who pasted the address of one of these 143 pages as a single worksheet would have been allowed to assign it by the first version of the lookup, and a child would have opened a page with no Check button. The lookup now reads the page itself (`db.ts` `pageHasScreen`, commit `cc0b953a4`), which refuses them. The commit message of `cc0b953a4` names the wrong page as its example (`number-lines-g1116`, which the old lookup already refused); `PART-9-DESIGN.md` §8 carries the correction. The repair is real, the example was not.

## 3. An open finding about Level Sets on the live site (not changed here)

**23,949 published pages carry a unit after their type code** (a word family, a letter, a sight word, a picture: `…-g1309-10-og`, `…-k393-10-forestrabbit`), about 2,150 per language: sight words 1,500, letter of the week 227, colour by number 200, letter tracing 78, rhyming words 65, spelling rules 45, syllable reading 16, picture word cards 15.

The Level Set code builds a set from the pages whose address ENDS in the type code or the code plus a copy number, so these pages are in no set. Measured on the live site for one face: the set of rhyming-words `g1309` shows 3 pages (`…-g1309`, `…-easy-g1309-7`, `…-hard-g1309-12`) while 16 are published for it; the 13 with a word-family suffix are missing from their own set.

Whether that is a defect or intended differs by family, and I could not settle it from the code: colour by number and sight words have their own entry pages, rhyming words apparently does not. It was not changed in this programme because the change would alter the content of several hundred indexed set pages at once and belongs to the Level Set programme's own gates. **It needs a decision per family** (the content graph already counts these pages under their type, so units will use them either way).

## 4. Points with nothing published

In English 16 of the 158 mathematics points and 2 of the 71 literacy points have no published page at all: their worksheet types exist only as maker templates. The full list per language is in `out/teaching-graph/unit-could-use.<loc>.md` (lines marked NOTHING HERE). A unit can still serve those points through the maker; a "download the whole unit" bundle cannot include a page that was never published. Part 3 has to say which of the two a unit lesson links.

## 5. What the reviewers said about the points

See `REVIEW-NOTES.md` (grade placements against the Common Core, pairs that are one skill at two grades, descriptions that fit English only, and that literacy grade 3 holds four points).
