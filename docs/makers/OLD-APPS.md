# The 33 old worksheet apps → the new makers

The old apps (`REFERENCE APPS/*.html`) are Fabric.js page editors built in 2024-25. Operator ruling: every one is rebuilt as a new maker, far better than the original, and **retired from teacher view only once its replacement is proven**. It then stays as an operator-only tool for regenerating the app decks, and is never deleted. Existing hosted worksheets saved from the old apps keep working.

Measured from the controls in each file (`data-translate` keys), 2026-10-31.

## What every old app does today

The new makers must keep these features, or replace them with something better on purpose:

- **Page editor.** A free canvas: select, move and resize any element; bring forward / send back; align selected or to page; lock / unlock; delete. Text tools: add text, font (Arial, Baloo, Fredoka, Lexend, Nunito, Quicksand, Verdana), size, colour, outline colour and width.
- **Page setup.** Letter or A4, portrait or landscape, custom width and height; page colour.
- **Decoration.** Background themes and border themes with opacity. The design-element library: banners, frames, badges, corners, dividers, footers, title banners, scatter, textures, patterns, palettes, accents (81+ SVGs in `/var/www/lcs-media/design-elements`).
- **Pictures.** The image library by theme with search; individual picture selection; **upload own images** (session only); grayscale.
- **Content language.** Any of the 11, separate from the interface language.
- **Outputs.** Worksheet PDF / JPEG; answer key PDF / JPEG; Interactive Worksheet (HTML); Export to catalog (operator only).
- **Classroom helpers.** Name and date fields; exercise numbers.

What teachers complain about, from the operator: the apps are crowded, hard to learn, and not self-evident. The free canvas lets a teacher break the layout (overlaps, text off the writing lines, items cut off), and none of the quality gates the printable decks pass run on a teacher-edited page.

## Per app: what is special, and where it goes

| old app | special features to keep | new maker |
|---|---|---|
| addition | modes image+image / image+number / find addend / mixed; min–max items per group; plus sign between groups; child-friendly answer box | `addition-subtraction` |
| subtraction | modes cross out / image−number / find subtrahend / mixed; max minuend | `addition-subtraction` |
| math-worksheet | operations, min/max value, allow negative results, easy/medium/hard, picture-coded puzzles, puzzle numbering, show answers | `addition-subtraction` |
| code-addition | pictures stand for numbers; addends per question; secret word reveal | `logic-puzzles` |
| math-puzzle | picture grid puzzle with row/column sums; addition/subtraction/both | `logic-puzzles` |
| sudoku | picture sudoku; easy/medium/hard; blanks | `logic-puzzles` |
| alphabet-train | train template; letter → picture assignment; letter-hint mode; number of clues | `alphabet` |
| big-small | identical vs different pictures; big/medium/small; ascending/descending; images per exercise; numbers | `measurement` |
| more-less | image-to-image / image-to-number / check-cross mode; symbols < > =; relations | `compare-numbers` |
| chart-count | count the pictures, fill the bar chart | `graphs-data` |
| bingo | rows × columns; number of unique cards; callout cards; word or picture cells; chip fill | `bingo` |
| crossword | words + clues; picture clues; **grid language vs clue language (bilingual mix)**; manual edit of pictures | `crossword` |
| wordsearch | grid size; diagonal and reverse words; picture or word list; **grid vs clue language mix**; custom word list | `word-search` |
| cryptogram | phrases; picture code per letter; letters revealed; max lines | `secret-code` |
| word-scramble | custom words; letter case; vowel/consonant colour coding; no-clue mode; difficulty | `spelling` |
| word-guess | custom words; exclude letters; letter case; difficulty; clues on/off | `spelling` |
| writing | row editor (add / delete rows), per-row type: trace / fading trace / guided copy / empty; print / print with arrows / cursive; zigzag and line strokes; beginning-letter rows; custom text | `letter-tracing` + `word-writing` |
| drawing-lines | drawing templates between picture pairs; auto-fill pictures | `pre-writing` |
| coloring | colouring page designer with **brush drawing tools**; flip; handwriting lines; name field | `coloring-pages` |
| draw-and-color | picture on a grid to copy; mirror clue (horizontal / vertical); part reveal; clue cells | `symmetry-grids` |
| find-and-count | grid of pictures; hidden-object questions; letter spotting | `counting` |
| find-objects | I spy and odd-one-out modes; decorations | `counting` |
| grid-match | picture cut into a grid; place the pieces; header | `same-different` |
| missing-pieces | piece shape (circle / ellipse / rectangle / square); missing count; solution options | `same-different` |
| odd-one-out | identical vs similar; two themes (A and B); exercises 5–10 | `same-different` |
| shadow-match | shadow mode / make-whole mode; cut direction | `same-different` |
| matching | image–word / image–image / beginning letter / custom word; **left language vs right language**; bullets | `same-different` |
| pattern-train | train with AB/AAB/ABB/ABC/AABB; clue count | `patterns` |
| pattern-worksheet | pattern types; blank box or options; mixed | `patterns` |
| picture-path | grid path through pictures; collectibles; distractors; end picture; copies min–max; game modes | `mazes` |
| picture-sort | left and right category themes; auto generation | `sorting` |
| prepositions | fill-in / multiple choice; select prepositions; shape replacement; grammar engine (lcs-grammar) | `position-words` |
| treasure-hunt | basic vs cardinal directions; grid of pictures | `maps-grids` |

## Notes for the build

- **Bilingual mixes (crossword, wordsearch, matching).** A grid in one language with clues in another stays allowed under the language rule, because both sides are among our 11. The new `picture-cards` bilingual cards (K-350) use the same idea.
- **The brush tool (coloring) and the row editor (writing)** are the two editing features no worksheet-gen type has. They need a decision in the architecture (FABLE-BRIEF G3).
- **"Make your own" links** on deck pages (`scripts/lib/deck-actions.js`) point at the old apps today. They are repointed per maker as each one is proven.
