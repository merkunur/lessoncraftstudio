# 005 — Digby's Number Trace (K.CC.A.3) — the Fading Line

Replaces `digby-number-trace.numeral-formation.k-cc-a-3` (a dashed numeral with a dog mascot, a loose checkpoint tracer that autocompleted, 7 locales, sv/da/no/fi missing). Same manifest id; the seven existing slugs, page titles and intros frozen; sv/da/no/fi authored new. New tool `writing-line-activity`, own core `writing-line-core.js`, own manifest `writing-line-activities.json`; `digby-number-trace-activities.json` is emptied. Two shipped cores are LOADED UNCHANGED as instruments (0 lines): `number-trace-core.js` (the ten digit glyphs constructed from arcs and lines, the per-locale barred seven) and `stroke-trace-core.js` (the live-ink judge that credits only arc length the finger actually swept — the measured fix for "it autocompletes").

## The four questions

1. **Would a 5–8-year-old choose it again?** A writing line with three boxes. Box 1 carries the full road and a green start dot; box 2 only a faint ghost and the dot; box 3 is empty. The child writes the numeral in each box in turn with a finger: the ink appears only where the finger has been, a glowing walker can show the strokes on request, each finished stroke chimes, and when the third box is done the three numerals the child wrote stand on the line and the number is spoken. On a phone one big box at a time, with the line so far above it.
2. **Would a teacher put it on the board?** K.CC.A.3 is writing numerals 0–9. The apparatus is the handwriting-book method — model, trace, copy — with the scaffold fading inside one line, so the last numeral is the child's own. Stroke order and direction are enforced by the judge (a stroke only inks when swept from its start), and the slips K teachers name are named here, measured from the finger's path: *started at the wrong end* (the path matches the stroke backwards), *flipped* (the path matches the mirrored numeral — the 3 / 7 / 2 reversals), *the wrong way round* (a 0 or 8 drawn clockwise), *stopped short*. After three stalls in a box the guide steps back in (blank → ghost → full), silently. Settings: Guide fading / full / by yourself; Lines three-line house / baseline. No timer, no score. Check fires itself when the line is full.
3. **Would a parent trust it?** No mascot. A paper box, writing lines, a road, a hairline, a green dot, numerals for the stroke order, the child's own red-brown ink — the palette Letter Studio measured for contrast. Works at 320 px; legible with the sound off.
4. **Is it creative?** The invention: **the fading line — three boxes on one writing line whose guide fades box by box, so the third numeral is written unaided, and the box only passes when the finger has swept the stroke from its start.**

## Apparatus

- **The line** (`.wl-line`): ≥ 480 px three boxes in a row (box = min(220, (W − 24)/3)); < 480 px one box (min(320, 0.82 W)) and a strip of three thumbnails above it (`.wl-thumbs`) showing the boxes done.
- **A box** (`.wl-box` → `svg.wl-paper`, viewBox 0 0 100 100; top line 16, mid 50 dashed in *house*, baseline 84): road 7 u teal .30, hairline 1.6 u teal .85, start dot (`.wl-start`), stroke numerals (`.wl-pip`, only where ≥ 2 strokes), ink 5.4 u #C64A22 (`.wl-ink`), live ink (`.wl-ink-live`), the walker (`.wl-walker`).
- **Guide levels:** full (road + hairline + dot + pips) · ghost (hairline .28 + dot) · blank (lines only). Corridor 8 / 12 / 16 units.
- **The strip** (`.wl-strip`): Show me (walker) · a one-line note · Rub out (clears the active box).
- Settings drawer: Guide (fading / full / by yourself), Lines (house / baseline).

## Rounds

Digits 0–9 (10 rounds; order-only reshuffle). Per round three boxes by the plan: fading = full, ghost, blank · full = full ×3 · by yourself = ghost, blank, blank. One right formation per stroke (the glyph's stroke, swept from its start within the corridor). Slip table from the last drag's raw path: progress ≥ 0.5 → short; path completes the REVERSED stroke → reversed; path completes the MIRRORED stroke → direction (symmetric glyph: 0, 8) else mirror; otherwise off. Help: every third stall in a box raises its guide one level.

## Layout

Stacked. No `vh`. The seven glyphs' barred/flagged forms follow `number-trace-core.glyphFor(d, lang)`.

## Strings (×11, one reviewer)

title · instruction · promptFading/promptFull/promptAlone ("Write {d} three times — the last one by yourself.") · hintStart · hintUnfinished · noteFull/noteGhost/noteBlank · noteStroke · noteReversed · noteMirror · noteDirection · noteShort · noteOff · noteHelp · noteDone · celebrateFading/celebrateFull/celebrateAlone · boxLabel ("box {i} of 3") · boxDone · showMe · rubOut · lineLabel · setGuide/guideFading/guideFull/guideAlone · setLine/lineHouse/linePlain.

## Refuse-list

No dog. No checkpoint tracer (the judge is arc-length, contiguous, never a terminal snap). No red mark on a stall — the ink stays, the note names the slip, the guide steps back in. No numeral drawn FOR the child. No timer.

## Gates

`verify-writing-line-core.js` (own oracle: plans, corridors, every digit × every box solved by the flattened ideal path, reversed / mirrored / half / scribble paths classified, help escalation, layout floors, symmetric set = {0, 8}) · `mutate-writing-line.js` · `local-test-writing-line.js` (real pointer drags along the glyph, every digit, 11 locales, widths 320…1366) · `visual-qa-activity.js` · `audit-activity-hierarchy.js` · `audit-settings-efficacy.js --tool=writing-line-activity` · `preflight-activity-routes.js` · `verify-activity-prose-claims.js` · preview · one reviewer · `live-verify-writing-line.js`.
