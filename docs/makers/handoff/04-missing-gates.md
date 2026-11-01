# 04 — The missing gates of the maker suite (task 4, Fable 5.1, 2026-11-01)

Five new gates under `scripts/makers/gates/` + `gates/lib/{maker-pages,guess-maker}.js` (the shared harness: built makers,
the settings space a teacher can reach, the page builder, a puppeteer mounter). All read `out/makers` only (no build).
Each is poisoned both ways on every run and has a non-vacuity check. Run time per gate (all built makers): settings-space
quick 2m41 (full en+fi ≈ 10 min) · collision full (en+fi, keys) 5m48 · screen-geometry quick 1m07 · own-input 2 makers 1m ·
pdf-parity 4 worksheets ≈ 1 min. Stopped at the coordinator's 20-minute cut; what is not finished is listed below.

## The gates (gate loop: add after `screen-from-marks.js`)

- **`settings-space.js`** — guessability + answer position over level · pictures (colour + B&W) · word · copy · language,
  per template × level, on every answer the screen grades (marks screens via `screen.derive`; declared screens via the type's
  `interactive` spec). Strategies: qa/guessability's (slot, rotation, number rank, length, shared tokens) + biggest box / most
  pictures (choice), halves / alternation (select), constant / box index / card index / previous+1 / echo (type), item k ↔
  target k / same row / nearest (pair), bin k / alternate / nearest (place). Same constants as qa/guessability (never moved).
  Each locale is an INDEPENDENT sample (other themes, words, copies); a tell must REPLICATE (memory 2026-10-06) — a FAIL in
  one sample with a PASS in the other is reported "once". Poisons: K-002 right chip always first, K-006 answer = card number,
  pair k↔k, place always bin 0 — all FAIL; the real K-002 / K-006 pools PASS.
- **`collision.js`** — two rendered things overlapping, measured by INK (glyph ink from canvas metrics, a picture's opaque
  pixels, drawn svg geometry; rotation undone), ≥ 1 px both ways; pages and keys (`--keys`). Exemptions with reasons: key
  samples, crossed-out pictures, a label box on its number-line tick, the odd/even house outline, the teacher's drawing.
  The first (layout-box) version accused big digits and transparent picture margins — fixed WHAT is measured, not the floor.
- **`screen-geometry.js`** — every marks screen at 360 and 1024: controls ≥ 44 px, items ≥ 34 px at 1024, nothing cut off,
  no overlapping targets at 1024, every target's centre on page content; 360 items/overlaps REPORTED (phone layout = the
  operator's open decision, handoff 01). Poisons: 20 px item, item off the page, two items on one spot, 30 px control, item on
  the bare page.
- **`own-input.js`** — typed title/instruction through the real dialogs (80-glyph word, "Free printable…", HTML/onerror in
  the title, 220-char instruction, whitespace, a fitting 3-line instruction) + library swaps through the maker's `generate()`
  for every slot role × level (12 keys per role; duplicate / out-of-pool refused), with an INDEPENDENT Node-side lint.
- **`pdf-parity.js`** — real Print click → the print document: DOM parity page by page (order-aware), visual parity under
  print media (≤ 0.5 %), the PDF (page count, exact Letter/A4, fonts embedded, pdftotext words ≥ 98 %, key answers in text).

## Real defects found (for the main session; type files untouched)

1. **K-243 family (K-243, K-273, K-277, K-414–K-417) level 3 refuses the third copy**: `K-243: level 3 has 2 copies (no plan
   for copy 3)`; `copiesDiffer` lists L3 (build-bundles catches the throw and keeps the level), so "New version" twice at L3
   REFUSES the page in the maker (the retry ladder keeps `ctx.variant`=3). Fix: cycle the plans (`plans[(sv-1) % plans.length]`)
   or drop L3 from copiesDiffer.
2. **Print order ≠ shown order** (pdf-parity): the preview shows each key after its page; `printAll` prints every page then
   every key (`allDocs`). Shown 1,2,3,4 prints as 1,3,2,4. Decide which is right and make the other follow.
3. **K-458 rainbow pairs screen (L1–L3)**: the per-numeral hit boxes OVERLAP each other at 1024 (109×45 px at L1, 36 pairs at
   L3) — an ambiguous tap — and their centres hit nothing (invisible rects). **G3-406** L1: a tap target outside the page box.
   G2-399 / G2-410 L3 / G3-408 L3: targets whose centre sits on nothing at 360 (overlay vs scaled page drift — read them).
4. **Collision, hairline class (every overlap ≤ 3 px, one cause)**: the 30-px card badge covers the first pixels of the content
   whose card padding is thinner than the badge — K-002 key (badge × picture), K-243/K-277/K-417 L3 (badge × bond ring 2.9×10),
   G1-215 L2, G3-358 L3 (badge × answer box 5 px), G3-311/312/313/314 (badge × picture / array svg); doubles-halves
   G1-247/270/287/296: the divider line touches a picture by 1.2–2.5 px. Fix once: card padding-left ≥ badge width + 4 px.
5. **settings-space, read before acting** (quick run, en only, 3 copies — NOT replicated): real-looking tells — **G2-225
   num-mid 97–100 %** (the middle number is right), **G2-223 / G1-133 most-shared ≈ 80 %** (the option sharing most tokens),
   **K-027 L2 num-mid 81 %**, K-002 L3 num-mid 67 % (distractors always one below and one above). Instrument artefacts to
   exempt before the type FAILs mean anything: K-008/K-009 "most/fewest pictures" (that IS the compare skill), G1-455 / G2-228
   alternation (the stripes ARE the task), type boxes whose answer is a set placeholder "-" / empty (G1-351, G1-456, G3-387 →
   const 100 %), `same-as-prev` on pages that legitimately repeat an answer (G1-369, G2-351, G3-409). 48 of 74 tells are type-kind.
6. **own-input**: all 12 typed-text cases behave (refusals with the sentence, HTML shown as text, nothing injected,
   originals restored); 290 of 296 swaps accepted with content (meta) unchanged.

## NOT done (honest)

- settings-space full en+fi replicate run and the exemptions in 5 (the gate's verdict today is "74 tells, unreplicated").
- own-input's independent lint mounts the browser-built page over `file://`, so its `/makers-assets/` pictures read as
  broken (361 false "broken image" FAILs) — serve it through serve.js instead; the typed-text half is sound.
- pdf-parity scenarios S2–S4 (de A4 border/numbers, de K-388 words, fi key) ran once before the order fix; re-run after it.
- collision on key pages is measured; the "label ≥ 4 px below its picture" rule of ARCHITECTURE §15 #14 is not.
- Declared (non-marks) screens are not in screen-geometry (task 2's play page draws them); `tap-spell/paint/trace` kinds
  have no position instrument in settings-space (reported, not measured).
- No strings added (nothing for the native review). No shell / engine hooks needed.

## Traps paid for

- Boxes are not ink: line boxes of 40-px digits overlap, picture webps carry transparent margins — measure glyph/alpha/geometry.
- The seed does not know the locale: a fi pool over the same themes re-measures the same numbers — vary the themes and copies.
- A key sample is a WRAPPER: exempt `[data-lcs-key-sample] *`, not the attribute alone.
- `elementFromPoint` through the overlay needs `pointer-events:none` on the overlay first.
- Python `io.open(...,'w')` without `newline=''` turns a CRLF repo file into mixed endings; a `|` inside a sed `s|…|` body breaks it.
- A print document can be byte-right and ORDER-wrong: compare by identity first, then the order as its own finding.
