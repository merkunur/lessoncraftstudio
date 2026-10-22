# Picture Tracing Level Set (`ptl`) — studio brief (pedagogue + two designers)

## What we are making
The flagship Picture Tracing family (20 faces, live since 2026-10-22) gets its Level Set expansion: per face, **15 NEW
worksheets** — 5 easier (level 1), 5 core (level 2, same difficulty as the published page), 5 harder (level 3) — every one on
its **own ORIGINAL scene or picture set**, not similar to the face's other 15 pages nor to the published page. 20 × 15 = 300
per language, 3,300 in 11 languages. PDF only, printed A4, children 3-7. Teachers use a face's 16 pages as a ladder: start at
core, step up or down.

Read first (all paths absolute under C:\Users\rkgen\lessoncraftstudio\):
- `docs\worksheet-gen\b9-designs\METHOD-picture-tracing.md` — what a page is, the tracer, band rules (§4), the twenty faces
  (§6 table), traps (§11). **Read §4, §6, §11 carefully.**
- `docs\worksheet-gen\b9-designs\K-418-picture-tracing.md` — the face contract: what each face teaches and its traps.
- `scripts\worksheet-gen\data\b9\face-scenes.js` — the published scene of every face (placements, sizes, the reasons).
- the published pages: `scripts\worksheet-gen\out\b9\en\<ID>.png` (K-418 … K-432, G1-429 … G1-433) and the sheet
  `scripts\worksheet-gen\out\b9\en\_sheet.png` — use the Read tool on the PNGs (it shows images).
- `docs\worksheet-gen\b9-designs\_SUBSTRATE-POOL.md` — every traceable B&W library drawing by theme with its band
  (1 = PreK-simple, 2 = K, 3 = detailed/G1) and shape (wide/tall).
- `scripts\worksheet-gen\data\pt\index.json` — the measured index (paths = traced lines, density, band P1/P2/P3/X).
- `scripts\worksheet-gen\data\pt\symmetry.json` — measured symmetry (`max` px between halves; lower = more symmetric).

**Open the pictures you choose.** A filename is not a picture (the b9 panels found an "orange" that reads as a tomato, a
leaning ladder, a 3/4-view bell). Make contact sheets and Read them:
`node scripts\worksheet-gen\tools\contact-sheet.js <C:\...\scratchpad-or-out\pt\your-sheet.png> "theme/noun" "theme/noun" …`
(run from C:\Users\rkgen\lessoncraftstudio). Write your sheets under `scripts\worksheet-gen\out\pt\` named `studio-*.png`.

## Fixed rules
- **The face's structure stays** (its frames, shelves, porthole, staircase, three direction columns, rows, open book + arches,
  postcard frame, word lanes, pond + count box, trailer…); a copy changes the CAST, the SETTING and the drawn background.
- **The face's rule and its instruction stay TRUE on every copy** (levels never contradict the face): a "round" page holds
  round pictures traced from a start dot like o; a "zigzag" page is zigzags; "finish the picture" dashes ONE nameable missing
  part per picture; "other half" uses pictures that are truly mirror-symmetric (symmetry.json max ≤ ~10 px); "count" has ONE
  kind of animal to count (3-10) plus solid distractors; "big-middle-small" is the same picture at three sizes per row;
  "picture-and-word" uses four pictures a 5-year-old names with a 2-7 letter word in every language; "hidden animals" hides
  exactly 5; "where to start" uses few-stroke pictures; "seasonal" faces stay in their season (K-429 winter/Christmas,
  K-431 summer seaside).
- **Only B&W library drawings** (themes ending "bw", with a number or not) — never colour pictures. Where the library has no
  clean drawing, a **drawn element** in the same line style is allowed (simple single-line shapes: buildings, furniture,
  fences, a tent, a bench, gifts, a lollipop, boats, kites, flags, hills, sun, clouds, waves, rain, snow, stars, moon…).
  Name the drawn elements you want; I draw them.
- **Readability:** no picture whose double lines / hatching / tiny details would fuse into a smudge when dashed (prefer
  band 1-2 for K, 1 for PreK; band 3 only on G1 faces or level 3), nothing touching or crossing another picture or a frame,
  nothing that reads as a letter or digit.
- **Not similar:** within a face no two copies share a setting or a hero picture; avoid repeating the published page's
  hero/setting; across the whole set vary settings (farm, park, forest, beach, city, kitchen, classroom, bedroom, garden,
  winter, space, underwater, jungle, desert, mountains, river, playground, market, zoo, harbour, airport, camping,
  library, bakery, castle, train station, pond, orchard, night sky, rainy day …).
- Cultural neutrality for 11 European/Latin-American locales: no religious symbols as heroes, no pork as food, no flags of
  countries, no text inside pictures.

## Levels (the pedagogue defines them per face; designers place 5 scenes in each)
Level 1 = easier than the published page: fewer and bigger pictures, simpler drawings (band 1), longer smoother lines.
Level 2 = core: the published page's difficulty. Level 3 = harder: more pictures, more detail (band 2-3), smaller pictures,
finer dashes or dots. The page always fills its body (stack 620-740 px in the 675-wide page body).

## Outputs
**Pedagogue** → `docs\worksheet-gen\b9-designs\_work\ptl-levels.md`: per face (20), a table L1 / L2 / L3: number of pictures,
picture size range (px on a 675×716 body), band of drawings, dash style (P1 thick dashes · P2 standard · P3 fine · P4 dots),
traced-length budget (published: PreK ≤ 4,500 · K ≤ 11,000 · G1 ≤ 15,000 px), scaffold (start dots / arrows / solid parts),
what must NOT change, and the grade fit (PreK 3-4 / K 5-6 / G1 6-7). Plus any face where 3 levels are not honest (say so).

**Designer A** (faces K-418 … K-427, 10 faces) and **Designer B** (faces K-428 … K-432 + G1-429 … G1-433, 10 faces) → one
JSON each: `docs\worksheet-gen\b9-designs\_work\ptl-scenes-A.json` / `-B.json`:
```
{ "<face id>": [ { "id": "ptx-<face>-<short-slug>", "level": 1|2|3, "setting": "<en, 2-5 words>",
    "name_en": "<the title tail, 2-5 words, e.g. 'A Day at the Farm' or for single-picture faces the picture's name>",
    "cast": [ { "src": "<theme bw…/noun>", "role": "hero|pair|row|count|distractor|prop|hidden|…", "note": "" } ],
    "drawn": [ "<drawn element and where>" ],
    "layout": "<one or two sentences: where things go inside the face's structure>",
    "why_distinct": "<what makes it unlike the other 14 copies and the published page>" } × 15 ] }
```
15 per face (5 per level). Every `src` must exist in `_SUBSTRATE-POOL.md` / `index.json`, be B&W, and be a picture you
OPENED on a contact sheet. Report back briefly: anything you could not fill honestly (with the reason), and your contact
sheet paths.
