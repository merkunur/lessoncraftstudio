# Lessons from the 33 old apps: what the new makers must not get wrong again

Operator, 2026-10-31: *"They were fixed tens of times to become what they are now… analyze them thoroughly so that you will not make the same mistakes."*

**Sources:**
- 392 commits touching `REFERENCE APPS/` (2025-10 → 2026-10), of which about 280 are fixes or features: `git log -- "REFERENCE APPS"`;
- about 1,090 explanatory comments in the 33 files;
- the operator rulings recorded in memory.

Every rule below cites the commit (or file) that paid for it. **The new makers keep every rule, structurally (by construction, or as a gate), not by remembering.** Rules that are only about the old Fabric editor, the catalog export or the deck SEO plumbing are left out. The new makers do not reuse that plumbing.

## A. Content rules (pedagogy and correctness)

| # | Rule | Paid for by |
|---|---|---|
| A1 | **No exercise repeats on one page.** The same operation (2+3) or the same (minuend, subtrahend) never appears twice. 2+3 and 3+2 may both appear (operator decision). When the range is too small for the requested count, say so instead of silently repeating. | `c93059730` addition, `9b9c8de16` subtraction, code-addition "DO NOT silently reuse - this causes duplicate exercises!" |
| A2 | **No picture repeats across exercises on one page.** Draw without replacement from a unique pool; halt with a message when the pool is short. A picture repeats *within* an exercise only when the task is about that (the same object at three sizes). | `c78ffac9c` big-small |
| A3 | **Every answer position must be unguessable.** No fixed slot, no rotation, never always the smallest, middle or longest; balanced across pages. | `223d43e05` guessability audit (qa/guessability.js) |
| A4 | **One correct answer, or every equally correct answer accepted.** With duplicate letters (Circle / Cube / Cylinder all start with C), any C cell is correct. | `4aeba65e3` matching |
| A5 | **The instruction always matches the task actually on the page:** per mode, per question type, in every language. Never one generic sentence for five task kinds. | `41bfed1e8` big-small (5 types × 11), `e30405adb` fleet-wide 33 apps |
| A6 | **Sentences come from a grammar engine that refuses, never from suffix-guessing.** Plurals, articles, cases and word order go through `lcs-grammar.js`; unresolvable input gets a hand-verified fallback, never an invented form. | `bb285cb75` (find-and-count, prepositions), find-and-count comments "incorrect instructions must be structurally impossible" |
| A7 | **Word order is per language, from frames, never English order filled with words.** "Gehe nach Westen 1 Feld." shipped in 9 locales. | `e30405adb` treasure-hunt moveFrame table |
| A8 | **Lists join with the language's own conjunction** (`Intl.ListFormat`), never a hard-coded "and". | `8f4f9685f` |
| A9 | **Letters are Unicode letters.** Inputs, grids and filters accept å ä ö æ ø ü ß ñ ç œ (`/\p{L}/u`). Grid fillers and the word list strip characters the same way, so a word is never in the grid and missing from the list. | `864cd10ba`, `8f0f8dcba`, `e30405adb` (wordsearch Œ) |
| A10 | **Each language's own alphabet, vowels and letter set** (cipher letters, vowel colouring, alphabet trains). | `59ac5fffc` cryptogram accented letters, `fd011d8ae` word-scramble vowels per locale, code-addition "locale-appropriate alphabet to avoid confusing kids with foreign letters" |
| A11 | **Multi-word picture names** ("ice cream") are handled (spaces stripped for grids, kept for labels) or excluded. They must never break a puzzle. | `237058fec` crossword, `f5626e8e5` word-scramble / word-guess |
| A12 | **Bilingual mixes are exact:** the grid language, the clue language and the instruction language are each the right one. When both languages are the same, use the single-language wording (not "find these words in English" in English). Language names for children use the K-3 word (es *holandés*, *finlandés*). | `6ea48c3c2` wordsearch, `507afe0f5` crossword, `3d2e34fc2` matching |
| A13 | **A literacy task never shows the answer.** No pre-highlighting of the matching chip and no picture name where the child must read it. Hints are an explicit easier mode (alphabet-train "letter hints"). | `8ebaaa92e` bingo, `0a1bcf73f` alphabet-train |
| A14 | **Sorting is strictly scored** when the bins are named; a sort into labelled bins is never "either way". | `1b3aa91ae` picture-sort |
| A15 | **The theme the teacher picked is the theme on the page.** Off-theme pictures are dropped with a visible notice; the page title and metadata name the real theme. | `44cbdda12` and `05d0940e9` (10 apps), the Shape A sweep, `5ec75a467` (628 of 1,264 ZIPs had a null theme) |
| A16 | **Counts never include 0** (standing rule); ranges start at 1. | memory `feedback_counting_never_zero` |
| A17 | **Odd-one-out density:** use the whole theme but scale the pictures to fit, with a floor of 50 px and a cap of 15 pairs, so the page is neither crowded nor empty. Two wrong attempts preceded this. | `87d7f0f5b` → `7bd6befc8` → `01053291d` find-objects |
| A18 | **Picture names come from the reviewed vocabulary**, never from a file name. Uploaded file names carry `-<timestamp>-<hash>` suffixes, which must never reach a label ("Pig 1769386108662 4e690fc7"). | `eb510be4d`, `57c6494fb`, `25ee48e56` |

## B. Layout rules (the page)

| # | Rule | Paid for by |
|---|---|---|
| B1 | **Text never overlaps a picture;** labels sit below their picture with a measured gap. | `d88cb32bd` wordsearch |
| B2 | **No wasted band at the bottom of the page:** row heights come from the actual content stack, so the page is filled. | `d88cb32bd`, `65e6b161f` wordsearch; the b7 "fill the body" rule |
| B3 | **Picture clues keep a constant readable size** when the grid or the word count changes; reserve their band first, then fit the grid. | `8ba434a4b` wordsearch |
| B4 | **Answer boxes are big enough for a child's handwriting:** 2.5× the printed answer width, never the bare digit width. | `6026c3941` math-worksheet |
| B5 | **The worksheet and the answer key share identical geometry:** same card size, same positions, with only the answers added. | `53758de9b` math-worksheet; key-on-row rule |
| B6 | **Pictures stand on a common baseline** in size comparisons, and badges never overlap pictures. | `f8c0496c0` big-small |
| B7 | **Answer-key marks are placed exactly** (order numbers at the picture's top-right corner, connector lines drawn from the current item positions). | `2d5aff4ee` big-small, `7e8eef64c` matching |
| B8 | **Picture art must be used at the right scale.** A crop computed on the 800 px source and applied to the 1536 px variant zoomed every tile. Always crop in the space of the image actually drawn. | `aee1ba352` grid-match |
| B9 | **Train / template art with built-in slots** (the alphabet train wagons) needs per-slot offsets measured on the art, shared by the worksheet and the key. | `52fae10de`, `0a042027c` |
| B10 | **Landscape and portrait both work,** and paper size follows the teacher's choice in every output. | `02646a4b9` find-and-count |
| B11 | **The theme name heading** appears when a single theme was chosen, sits above the instruction, and is regenerated, never stacked. | `9a44dc038`, `24082e164`, `3902b0b92` |
| B12 | **Name / Date fields** are in the content language. | `e30405adb` |

## C. Generation and state rules

| # | Rule | Paid for by |
|---|---|---|
| C1 | **Regenerating never leaks the previous page:** no stacked headers, no restored stale text, no transforms re-applied to the wrong object. The old apps fixed this class six times. In the new makers, a page is a pure function of the recipe; nothing carries over except explicit teacher edits keyed by stable ids. | `24082e164`, `5b5f6c6ee`, `bececc832`, `7e8eef64c`, picture-sort label refresh |
| C2 | **Changing the language changes everything:** content, labels, instruction, key, and the global locale state the export reads. | `877522bc0` chart-count, `fd4c957b1` prepositions |
| C3 | **One source of truth per setting.** Wordsearch, crossword and big-small each had TWO theme selectors, and the code read the wrong one three times. | `0b854c24e`, `3902b0b92`, `5ec75a467` |
| C4 | **A mechanical change across many apps must be checked per app** (parse, run, one generation each). Pasted fixes broke code-addition, bingo, grid-match and matching. In the new makers this means one shared engine and contract-tested templates instead of 33 copies. | `15982d405`, `b6544cc5a`, `d2fcf4182` (matching broken in production for 2 months) |
| C5 | **Deterministic from the seed,** across runs and machines, including difficulty and jitter. | `c9996eed3`, `b67d447a2` |
| C6 | **Failed image loads must never shift the data;** align by id, never by array index. | `23662ce48` pattern-worksheet |
| C7 | **Teacher-uploaded images** have no vocabulary entry and no CDN variants, so every consumer must handle "no name, no variant" without a broken image or a garbage label. | `aae3f83b7`, `cf4d141cc`, `eb510be4d` |
| C8 | **A white background is forced in exports** (otherwise transparent becomes black in JPEG). | `c877db4a0`, `9172a4590`, `f52020f83` |
| C9 | **Print-size budget:** JPEG quality 0.85, 4× multiplier (≈290 DPI A4), WebP sources; PDFs became 5× smaller with no visible loss. | `c35c7b5ab`, `708015e56` |

## D. Screen-version (interactive) rules

| # | Rule | Paid for by |
|---|---|---|
| D1 | **Feedback is deferred until Check:** the child may place pieces anywhere, wrong ones included, and fix them; right and wrong appear only on Check. | `886c4233a`, `05ac8de35` grid-match, `ce5ccabc4` bingo |
| D2 | **Tap targets are positioned in % of the page with no pixel floors**, which overlapped neighbours on phones. | `5de1e3736` |
| D3 | **Routes that revisit a cell are legal** where the clue allows it. | `15c3c4e05` treasure-hunt |
| D4 | **Every interaction the printed instruction promises exists on the screen** ("check the group that is more and cross the one that is less" needed ✓/✗ buttons). | `1e85382d4` more-less |
| D5 | **The screen respects every display filter the page used.** | the wordsearch-class bug, §14.7 |
| D6 | **A page where the child writes gets a screen where the child writes** (keypad / typing), not three options. | `76a9f372c`, standing rule |

## E. What teachers had in the old apps that the new makers must not lose

- **A custom word list** (wordsearch, crossword, word-scramble, word-guess, picture-sort Custom Words, bingo custom callouts), within the 11 languages.
- **Manual picture choice** per exercise, not only a random pick from the theme.
- **Language mix:** grid vs clues, left column vs right column.
- **Mode switches the teacher understands:** big-small's five question types, more-less image ↔ number ↔ check-cross, shadow ↔ make-whole, alphabet-train letter hints ↔ standard, pattern-worksheet all-blank / all-options / mixed.
- **Word count, grid size, difficulty, number of cards** (bingo makes N unique cards plus caller cards).
- **Category labels** above sort bins, editable.
- **Name and date fields; exercise numbers.**
- **Decoration** (borders, backgrounds, design elements).
- **Grayscale output for printing.**

## F. What went wrong with the old apps' design (do not repeat)

1. **Free-form canvas editing let teachers break pages.** Moving or scaling an element invalidated drop targets, keys and layout; about 15 commits exist only to "honor operator edits". The new makers edit *content and settings*, not geometry, unless a layout-safe edit model is proven.
2. **33 copies of the same plumbing** (header, decoration, download, translations, undo). Every cross-app change was a 29× paste that broke some apps. One shell and one engine instead.
3. **Too many controls on screen** (addition alone has about 70 labelled controls). The operator's verdict: not user friendly, not self-evident.
4. **Translations loaded from many files** with race conditions and stale caches (fixed by baking STRINGS_ALL). Strings must be bundled with the maker version.
5. **Silent fallbacks** (themes null, words dropped, images duplicated, wrong language) shipped as visible defects in hundreds of decks before a gate caught them. Every fallback must be visible to the teacher or refused.
