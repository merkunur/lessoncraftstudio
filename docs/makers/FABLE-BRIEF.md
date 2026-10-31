# Brief for Fable 5.1: the new worksheet makers

You are designing the **architecture, the strategy and the hard engines** for LessonCraftStudio's new worksheet makers, before any of them is built.

- Opus 5.5 (the main Claude Code session) wrote this brief and will build everything you specify.
- Your answers must be concrete enough to build from without asking you again.
- The operator reads your output; write for a non-technical owner where you address him and for an engineer where you specify.

## 1. The operator's requirements (verbatim where quoted)

1. **One maker per topic** (60 makers). A topic's existing worksheet types become its templates, plus new templates. Every non-science worksheet type gets a maker: 755 types. The 76 science types are excluded.
2. **"Much better than the existing 33 worksheet generators. They were built when the AI was very primitive… much better in all senses, especially much more user friendly, simple to use, self evident."** A teacher with no training must make a good worksheet in under a minute.
3. **"Optimized for scaling… when these worksheet generators go viral, they should still perform well."** He will upgrade the server when needed, but the design must not need it.
4. **Only our 11 languages:** American English, German, French, Mexican Spanish, Brazilian Portuguese, Italian, Dutch, Danish, Swedish, Norwegian and Finnish. Not language-neutral, no other languages, no other scripts, no right-to-left.
   - **en is always en-US, es is always es-MX, pt is always pt-BR**, in every word, unit, coin, date and convention.
   - Teachers may type their own words, but only within one of the 11.
5. **The 33 old apps are rebuilt as new makers** (`docs/makers/OLD-APPS.md`). Each one is retired from teacher view only once its replacement is proven.
6. **Quality bar for content:** every worksheet is pedagogically correct and native in each language. A wrong picture, a two-answer question or an answer that can be guessed from where it sits counts as a defect, not a style choice. The repo's gates encode this (§4).
7. The operator's screenshots of a competitor are **inspiration only, not a spec**:
   - left: a template gallery grouped by sub-topic with thumbnails and "view more", and a filter by subtype;
   - centre: a live page where you select a block and change its font or size;
   - one regenerate button; add / duplicate / delete pages; an image-library panel by theme; "upload your own";
   - for how-to-draw, library art split into step layers you can toggle and reorder.

   Take the good ideas and do better. Do not copy their dark admin look.

## 2. Decisions already made (do not reopen)

- **Save the recipe, never the rendered output.** A recipe is maker id + maker VERSION + settings + word list + library picture ids, a few KB in the account database.
  - Reopening a saved worksheet and following a student link both rebuild it in the browser.
  - Old maker versions stay as static files, so a saved recipe always rebuilds identically.
  - A recipe is never a user-downloaded file: it lives in the account, and colleagues get a share link.
- **Generation happens in the teacher's browser.**
  - Word banks and pictures are versioned, cacheable static files behind Cloudflare.
  - The server only checks access, so a viral spike costs CDN bandwidth, not server CPU.
  - The server is one Hetzner machine with Next.js 14 + Postgres, behind the Cloudflare free tier.
- **Downloads are built in the browser:** PDF, image and the interactive (screen) version.
- **Every published deck links to its maker** ("Make your own"), preset to that deck's settings.
- **Hosted (rendered) worksheets** stay a small legacy store, capped at 200 MB per subscriber.
- **No AI in the product.** No local or self-hosted model and no API calls at generation time. Anything "smart" is deterministic code plus reviewed data.
- **Access** follows `frontend/lib/quota.ts`:
  - anonymous / free: 3 downloads per month (generator exports count as downloads) and 10 plays per day;
  - subscribers: unlimited.
  - Making and previewing a worksheet must stay free and unmetered: only the download or export is metered.
- **Teachers' own photos never go into a recipe and never onto the server disk.** A browser cannot remember a file path.
  - **Recommended:** keep the photo in the browser (IndexedDB) on that device, with a fingerprint in the recipe; another device asks for it again.
  - **Optional later:** subscriber photo storage on Hetzner Object Storage with a cap.
  - You decide how student links behave when a worksheet uses an own photo.

## 3. Facts measured in the repo (2026-10-31)

- **Inventory:**
  - `docs/makers/inventory/types.json`: 831 types; `node scripts/makers/extract-type-inventory.js` regenerates it.
  - The maker map: `scripts/makers/topic-map.js`, checked by `node scripts/makers/build-topic-docs.js --check` (every in-scope type belongs to exactly one maker; every old app is mapped).
  - One document per maker: `docs/makers/topics/<id>.md`, with templates, settings, new templates and per-maker questions. Index: `docs/makers/MAKERS.md`.
- **The worksheet engine** (`scripts/worksheet-gen/`) runs in **Node + Puppeteer** today:
  - Each type module is CommonJS: `{ id, slug, gradeBand, exerciseType, themeAxis, difficulty: {1,2,3}, i18n, interactive?, build(), verify()? }`.
  - `build({theme, difficulty, locale, unit}, {rng})` returns `{ bodyHtml, meta, tokens? }`. These are HTML/SVG strings, deterministic from a seeded rng (`lib/rng.js`, `instanceSeed`).
  - `render/render-instance.js`:
    1. `page/shell.js buildPage()` wraps the body (title, instruction, `page/page.css`, Letter for en / A4 for others);
    2. the HTML is written to disk and Puppeteer loads it;
    3. `qa/lints.js` runs;
    4. the type's `verify(page)` runs (169 types have one; it uses `page.evaluate`, so these are already browser-side checks);
    5. then the PDF and the PNG are produced.
  - The **screen version + answer key** are rebuilt from the same seed and asserted identical (`meta`). The screen is `emit/interactive-runtime.js`: the rendered page as a backdrop image with a tap layer positioned in %. Kinds: tap-order, tap-choice, tap-select, tap-spell, tap-paint, type-number, type-word, mark-grid, set-clock, trace-path, …
  - **Node-only dependencies:** 44 files under types/lib/templates/primitives use `fs`/`path`, mostly data loading. Images resolve to `file://` URIs through `image-cache/resolve.js`; the cache is 346 MB; it prefers 512 px derived copies.
  - **Data size:** `data/` is 705 MB. Most of it is precomputed art: find-the-differences 427 MB, how-to-draw htdx 127 MB and htd 53 MB, colour-by-number 47 MB, dot-to-dot 30 MB. Word and sentence banks are small (literacy 1.8 MB, b2–b5 a few MB each). i18n is 27 MB (`i18n/strings.<loc>.json` plus panels).
  - **Several engines verify on the RENDERED page:** the maze raster oracle (`lib/hm-verify.js`), the find-the-differences diff gate (`lib/fd-browser-diff.js`), the key text measure (`qa/key-text-measure.js`), page fill (`lib/page-fill.js`) and text seated on writing lines (`lib/key-on-row.js`).
- **The old apps** (`REFERENCE APPS/*.html`, 180–360 KB each) are Fabric.js 5.3.1 free-canvas editors (`docs/makers/OLD-APPS.md`). They are served from nginx under `/worksheet-generators/` and wrapped by `/[locale]/tools/<maker-slug>` pages (slugs in `frontend/messages/maker-content/<locale>.json`).
- **Shared grammar:** `REFERENCE TRANSLATIONS/lcs-grammar.js`. It never produces an ungrammatical sentence: it refuses instead.
- **Vocabulary:** `REFERENCE TRANSLATIONS/image-vocabulary.js`, 1,246 nouns × 11 languages with singular, plural and gender. The phonics safety pipeline outputs approved words per locale.
- **Rules the content has paid for** (CLAUDE.md, memory), each with a gate:
  - a page fills its body (stack 620–740 px of 766);
  - text on writing lines is seated and measured;
  - the answer position must not give the answer away;
  - every picture shows what its word says;
  - never mix black-and-white and colour pictures;
  - a coloured picture is fully painted;
  - counting never includes 0;
  - a page where the child writes gets a screen where the child writes;
  - Next appears 0.5 s after the result.

## 4. What you deliver

Write **`docs/makers/ARCHITECTURE.md`** (run F1) and **`docs/makers/ENGINES.md`** (run F2). Run F3 reviews both and writes **`docs/makers/OPEN-DECISIONS.md`**. Each document must be buildable: name files, modules, data formats and order of work. Prefer reusing the existing engine over rewriting it, and say exactly what changes.

### G — Architecture questions (F1 answers all of them)

- **G1 Browser runtime.**
  - How today's type modules run in the browser unchanged or nearly so: bundling CommonJS, replacing `fs`/`path` data loading, and swapping the image resolver to versioned CDN URLs.
  - Per-maker code splitting, so a maker loads only its templates and data.
  - Where the bundles are built (CI/deploy) and served (nginx static vs Next).
  - Measure or estimate the bundle size per maker.
- **G2 Output in the browser.**
  - PDF that matches today's Puppeteer quality (vector text and SVG, embedded fonts, Letter / A4, multi-page, answer key pages).
  - Options: `window.print()` with `@page` CSS, a JS PDF library, or a hybrid. Decide.
  - Cover iPad Safari and Chromebooks.
  - PNG / JPEG export.
  - The interactive screen version (today it needs a screenshot of the page as its backdrop; in the browser?).
- **G3 The editor model, and how simple it is.**
  - Today's types generate fixed, gate-checked layouts; the old apps let teachers drag anything and break the page. Define what a teacher can change and how:
    - settings in a side panel that regenerate the page;
    - direct edits on the page: retype a word, swap a picture, change the title or instruction, font size?;
    - add / duplicate / delete pages;
    - decoration: borders, backgrounds, the design-element library;
    - the old writing app's row editor;
    - the old colouring app's brush.
  - Every edit must keep the page correct (gates) or be clearly marked "your own changes".
  - Design the screen flow for a first-time teacher in under a minute, and describe it so the build can follow it.
- **G4 Recipe schema and versioning.**
  - The exact JSON: maker, version, template id, seed, settings, word list, picture ids, page edits, own-photo fingerprints.
  - How a version is frozen: static versioned bundles, and what is kept forever.
  - Migration when a template is fixed for a pedagogical mistake. Fixing is mandatory and must also reach saved recipes: the operator's rule is that a pedagogical mistake is fixed everywhere at once.
- **G5 Gates in the browser.**
  - Which of today's lints and `verify()` checks run live on every generation, and which only at build time.
  - What the maker does when a teacher's setting or own words make a page fail: refuse, adjust automatically, or warn.
- **G6 Own words and own pictures.**
  - The safety rules: grammar refusal; no syllable or phonics claims about unverified words; never a wrong picture for a typed word.
  - Own-photo storage (see §2) and its behaviour on student links.
- **G7 Sharing.** Student links rebuild from the recipe. Specify the URL, the server storage (a recipe row) and the caching. Also the share-with-colleague link.
- **G8 Access and metering** with `quota.ts`, without metering the making, only the download or export. Anti-scraping: the value is the maker itself, not its pages.
- **G9 Scale.**
  - What costs what under a viral spike: static bundles and data via Cloudflare (cache headers, immutable versioned paths), and the server work per action (save recipe, share link, metering).
  - Postgres load estimates at 10k and 100k teachers.
  - What to measure.
- **G10 Templates.**
  - How an existing type becomes a template.
  - How a NEW template is added cheaply: a new type module with the same contract.
  - The gallery: thumbnails, generated how?
  - Grouping by sub-topic.
- **G11 i18n.**
  - The maker UI strings ×11: where they live and who authors them (a native reviewer per locale is mandatory before publish).
  - The per-template strings (existing `i18n/strings.<loc>.json`).
- **G12 Replacing the old apps.** The order, the proof criteria, the repointing of "Make your own" (`scripts/lib/deck-actions.js`) and the `/tools/<slug>` pages.
- **G13 Build order and batching** of the 60 makers:
  - a pilot of one maker per language group (none / little / bound);
  - then the batches;
  - with an effort estimate per maker in sessions.
- **G14 The gate suite every maker passes before it ships:**
  - 11-locale render;
  - visual QA at the real viewports;
  - native + pedagogy review of every template's text;
  - recipe round-trip (save → reopen → byte-identical page);
  - PDF parity with today's output;
  - scale smoke.
- **G15 Determinism across browsers.** The same recipe must give the same page on Windows, Mac, iPad and Chromebook: fonts, text measurement, layout-fit code that measures text today.

### Per-maker questions (F2 answers all of them, inside the F1 architecture)

- **[counting-Q1]** (Counting, see docs/makers/topics/counting.md) Scene layout for "I spy" sheets with the teacher's own pictures: how to place N mixed pictures without overlap and keep every count exactly right when the teacher swaps pictures after generation.
- **[addition-subtraction-Q1]** (Addition & Subtraction, see docs/makers/topics/addition-subtraction.md) Column layout conventions differ by country (carry digit position, borrow notation, the de/da/sv subtraction "Ergänzungsverfahren"/borrowing styles). The existing column type follows one convention; decide how the maker offers the national written method per locale without forking the engine.
- **[multiplication-division-Q1]** (Multiplication & Division, see docs/makers/topics/multiplication-division.md) The ÷ glyph and division notation differ (en-US ÷, de/nl ":" , fr/es/pt "÷" or ":"); the _shared/notation.js layer exists — confirm it covers every new template and the screen version.
- **[word-problems-Q1]** (Word Problems, see docs/makers/topics/word-problems.md) Story frames are native per locale (data/word-problems/frames.js) with grammar for numbers, plurals and names. Teachers will want their class's names in stories: can names be inserted safely in all 11 (gendered pronouns and agreement in de/fr/es/pt/it)?
- **[number-of-the-day-Q1]** (Number of the Day & Number Words, see docs/makers/topics/number-of-the-day.md) Number words above 20 differ structurally (de/nl/da units-before-tens, da vigesimal halvtreds, fr soixante-dix, fi agglutination). lib/number-words.js covers today's range — confirm it covers every range the maker offers (to 100 and 1000) in all 11.
- **[number-tracing-Q1]** (Number Tracing, see docs/makers/topics/number-tracing.md) Numeral formation differs by country (the crossed 7 and the 1 with a flag in de/fr/nl/Nordic; the en-US 1 is a single stroke). Confirm data/tracing/digit-strokes.js has per-locale forms; decide how the maker picks them.
- **[money-Q1]** (Money, see docs/makers/topics/money.md) Coin pictures: are realistic coin images per currency allowed (copyright / counterfeit rules for $ , R$, MX$, €, kr) or must they stay drawn tokens? data/money/currencies.js and primitives/coins.js decide today — confirm the rule and the es-MX and pt-BR denominations.
- **[telling-time-Q1]** (Telling Time, see docs/makers/topics/telling-time.md) Half-hour idioms invert across locales (de/nl/sv/da/no/fi "half four" = 3:30; en-US "half past three"). The time-words engine must be native per locale — confirm where it lives today (the activities clock-core has it) and reuse it rather than re-author.
- **[measurement-Q1]** (Measurement & Size, see docs/makers/topics/measurement.md) en-US needs customary units (inches, pounds, °F) while the existing generator is metric. Decide unit systems per locale and whether rulers/scales/thermometers need a customary variant in the primitives.
- **[symmetry-grids-Q1]** (Symmetry & Grid Copy, see docs/makers/topics/symmetry-grids.md) Grid drawing from LIBRARY art (screenshot 6): how to turn a line-art picture into a gridded copy task that a child can actually copy square by square (simplify the art? choose grid density from the art's detail?).
- **[logic-puzzles-Q1]** (Logic & Math Puzzles, see docs/makers/topics/logic-puzzles.md) Puzzle generators must guarantee ONE solution (sudoku, logic grids, magic squares, code addition) for any teacher setting — confirm each existing engine proves uniqueness and that the browser can do it fast enough.
- **[dot-to-dot-Q1]** (Dot to Dot, see docs/makers/topics/dot-to-dot.md) Dot-to-dot figures are precomputed (data/d2d, 30 MB). Can a dot-to-dot be made from ANY library picture (or the teacher's photo) in the browser, with numbers placed legibly and no crossing confusion? If not, define the precomputed set and how it grows.
- **[color-by-number-Q1]** (Color by Number & Code, see docs/makers/topics/color-by-number.md) Colour-by-number line art is precomputed (data/cbn, 47 MB, regions + keys). Can any library picture become a colour-by-code page in the browser (region detection, label placement in small regions, the fully-painted rule)?
- **[coloring-pages-Q1]** (Coloring Pages, see docs/makers/topics/coloring-pages.md) A colouring page of a teacher's own photo needs line art: is a browser edge-to-line-art conversion good enough for K-3, or do own uploads stay "as is" only?
- **[same-different-Q1]** (Same & Different, Shadows & Pairs, see docs/makers/topics/same-different.md) Shadows/silhouettes and "find the different one" are generated from library art (image-cache/silhouette.js). For teacher photos: can silhouettes be made reliably in the browser (background removal)?
- **[position-words-Q1]** (Position Words, see docs/makers/topics/position-words.md) The prepositions app uses lcs-grammar (indefinite frames, de dative n-declination, fi postposition+genitive). Confirm the maker reuses REFERENCE TRANSLATIONS/lcs-grammar.js unchanged for every sentence it prints.
- **[sorting-Q1]** (Sorting & Categories, see docs/makers/topics/sorting.md) Category membership for pictures: today per-sheet JSON lists (data/science/*.json, category-vocab). A general "sort anything" maker needs a reviewed attribute table for library pictures (object-attributes.json is partly reviewed: 456/933). Decide what may be offered before review completes.
- **[mazes-Q1]** (Mazes, see docs/makers/topics/mazes.md) The handmade maze engine (lib/hm-*) verifies solvability with a raster oracle on the rendered page (Puppeteer). Can that oracle run in the browser per generation, and how fast?
- **[find-the-differences-Q1]** (Find the Differences, see docs/makers/topics/find-the-differences.md) FD scenes are 427 MB precomputed and every difference passes a raster diff gate. In the browser: ship which scenes, how big, and can the diff gate run client-side (lib/fd-browser-diff.js suggests yes)?
- **[how-to-draw-Q1]** (How to Draw, see docs/makers/topics/how-to-draw.md) Screenshot 7 shows library art split into editable step LAYERS. Today lib/htd-steps.js derives steps from the ink automatically (data/htd 53 MB, htdx 127 MB). Decide: precomputed layers per picture + an editor to toggle/reorder them, or live derivation in the browser — and what happens with a teacher's own image.
- **[picture-tracing-Q1]** (Picture Tracing, see docs/makers/topics/picture-tracing.md) Tracing guides come from each drawing's own ink skeleton (lib/pt-*), heavy CPU, with measured band rules. Precompute for the whole B&W library (≈1,500 pictures?) or run in the browser? Own uploads?
- **[letter-tracing-Q1]** (Letter Tracing, see docs/makers/topics/letter-tracing.md) School handwriting models differ by country (US manuscript; de Grundschrift/Schulausgangsschrift; fr cursive from CP; nl/sv/da/no/fi own print models). data/tracing/letter-strokes.js has one model + extra letters. Decide the per-locale letter model and whether name tracing (any typed name) can be rendered with strokes and arrows for every letter.
- **[word-writing-Q1]** (Word Tracing & Writing, see docs/makers/topics/word-writing.md) Own words with pictures: when a teacher types a word, the maker must not show a wrong picture. Rule for matching typed words to library pictures (exact vocab match only?) in all 11 languages incl. plurals/gender.
- **[cursive-Q1]** (Cursive Handwriting, see docs/makers/topics/cursive.md) Cursive uses vendored Playwrite fonts measured on the PC (Linux renders 1-2 px differently). In the browser every OS/browser renders differently — how to keep the trace guides, joins and ruling aligned on Windows/Mac/iPad/Chromebook?
- **[alphabet-Q1]** (Alphabet & Letters, see docs/makers/topics/alphabet.md) A picture for every letter in every alphabet (incl. Q, X, Y, Å, Æ, Ø, Ä, Ö, Ü, ß-free) that truly starts with that SOUND, not just the letter (en "knife" fails). Is the vocab good enough, and what is the refusal rule?
- **[phonics-Q1]** (Phonics & Sounds, see docs/makers/topics/phonics.md) Phonics data is per locale and sound-based (vocabulary-phonics.json, the approved-words safety pipeline). Teacher-typed words cannot be verified for sounds. Decide: phonics makers use reviewed banks only, with no custom words?
- **[syllables-Q1]** (Syllables, see docs/makers/topics/syllables.md) Syllable splits must be safety-gated (≥3 sources, quarantine, Nordic school carve-out). Confirm: no teacher words in syllable templates, ever — or define a safe path.
- **[sentences-Q1]** (Sentences, see docs/makers/topics/sentences.md) Own sentences: unscramble / fix / cloze from a teacher's sentence is easy mechanically, but "one right order" and "one right word" cannot be guaranteed. Rule for own sentences (allow with a warning? check single solution?).
- **[word-search-Q1]** (Word Search, see docs/makers/topics/word-search.md) Filler letters per language (letter frequency; å ä ö æ ø ü ñ ç treated as own letters), never accidentally spelling rude words in any of the 11 — a per-language blocklist; and the same word must not appear twice.
- **[crossword-Q1]** (Crossword, see docs/makers/topics/crossword.md) Crossword layout algorithm: fit 6-15 words densely and readably, all connected, in the browser in < 1 s; failure rule when words do not cross.

Also answer for every maker: which templates need data that is missing in some locale (refuse that template in that locale, author the data, or adapt?), and the effort per maker.

## 5. How to work

- Read whatever you need in the repo; the files above are the starting points. Verify a claim in code before you build on it, and cite file:line for every factual claim.
- Do not edit any file other than your output documents. Do not run deploys or touch production.
- Where the operator must decide, do not decide for him: list it in OPEN-DECISIONS.md with your recommendation and the cost of each option.
- Be precise and buildable, not long. Tables over prose where possible.
