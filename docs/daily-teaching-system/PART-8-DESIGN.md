# Part 8 — Readers: the design as built (8.1, English pilot)

Written 2026-11-13 with the pilot. The plan's text for Part 8 stands (PLAN.md); this file records what was decided
while building and where everything lives.

## 1. What a book is

One sheet of paper folded twice: a cover and three pages. The fold is the one of the Mini Coloring Booklet (K-516),
already published: top left page 3 and top right page 2 print upside down, bottom left page 4, bottom right the cover.
Every book has a second sheet, **Read and Talk**: the whole text again in large type, the book's words by kind, two or
three questions for the adult, one line for the teacher.

| Series | What the child can read | Pictures | Types |
|---|---|---|---|
| First reading ("decodable") | every word, with the letter sounds taught up to the book's stage and the heart words taught by then | none on the text pages: the child reads the sentence and draws it (no picture can give a word away; the drawing shows whether the sentence was understood) | K-628 |
| Theme readers (guided reading levels A to C) | the level's sight words and what is decodable by then; the picture carries the one word the child cannot read; three new words at most are read with the adult first | one library picture a page | K-629 in colour, K-630 as line art to colour (only where every picture of the book has its line-art drawing) |
| Read and Talk | | | K-631 (every book) |

A book is a unit of its type (`unitAxis`): the title of the page is the book's title. A language without books of a
series has no unit, and the type refuses to build in it: every language gets its own books.

## 2. Where things are

| | |
|---|---|
| The reading scope: eight stages, heart words per stage | `scripts/readers/scope.en.js` |
| The word list (regular words only) and the names | `scripts/readers/words.en.js` |
| The recorded parse of every word (written by the gate, read by a reviewer) | `scripts/readers/lexicon.en.json` |
| The books | `scripts/readers/books.en.js` |
| The gate, with its poison tests | `scripts/readers/gate.js` (`--write`, `--poison`, `--list`) |
| The book engine | `scripts/worksheet-gen/types/_shared/reader-book.js` |

## 3. The gate (a book that fails does not build)

`build()` of the engine runs the gate on the book it prints and throws. Rules: F1 to F4 for first-reading books (every
word in the list at its stage or a heart word of the stage; nothing outside the list except the ending s on a listed
word, with the sound English gives it; no two consonant sounds side by side before the blend stage; a title and three
pages of 2 to 9 words), T1 to T3 for theme readers (every word a sight word of the level, decodable by the level's
stage, carried by its page's picture, or a new word; the picture's word stands in the text; length per level), L1 to L3
for the word list (the JSON is what the list writes; every correspondence is in the scope and the parse spells the
word; one vowel sound). 17 poison cases, each caught by its rule.

English spelling cannot be parsed by rule. The list is therefore the authority: a word is in it only when it is
regular for the scope, and its parse is recorded. "was", "of", "put" are not in the list; they enter a book only as
heart words of their stage.

## 4. The ramp

Pilot 12 (5 first-reading books, stages 2 to 6; 7 theme readers, levels A to C) → 60 with hubs (8.2) → 150 → 300.
The pilot's pages are published as lesson pages (not for search engines, no hub yet); the hubs per stage and per theme
come with the 60. One early-reading reviewer reads every book of a batch with the printed pages.

## 5. Open after the pilot

- The fold was not printed and folded by hand in this session: it is the layout of a page that is live (K-516), and
  the page check asserts the order of the four panels. A printed copy should be folded once before the 60.
- A screen version (page turns, so class results can record "read") is not built yet.
- Stages 7 and 8 are in the scope; no book of the pilot uses them, and the word list ends at stage 6.
