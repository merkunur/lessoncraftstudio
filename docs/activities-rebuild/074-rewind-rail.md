# #74 — Snippy's Letter Trace → THE REWIND RAIL (L.K.1.a, all 11 locales)

ORDER row 74 · id `snippy.letter-formation.l-k-1-a` (kept). Design: `designs/074-snippy.md`.

## Files and wiring
- **New files:** `mini tools/rewind-rail-core.js`, `rewind-rail-activity.js`, `rewind-rail-activity.html`. CSS prefix `rr-`.
- **Shared code, read-only (0 lines changed):**
  - the glyphs of `alphabet-trace-core.js`;
  - the locale letters (Ä Ö Ü ß Ñ Å Æ Ø, with the mark written LAST) and the per-country ruling, both from `writing-carriage-core.js`, the #73 sibling, so the two rows draw the same letters on the same lines;
  - the live tracer `stroke-trace-core.js`;
  - the library pictures, through `lcs-pictures.js`.
- **Manifest:** the row stays in `snippy-activities.json`.
  - `tool` is repointed;
  - `params` became a mirror of the core;
  - en/fr slug, title and intro are frozen (gate hash `bb18fe03…`);
  - de/es/pt/it/nl/sv/da/no/fi slug, title and intro are new.
- **Route:**
  - `GRADE_OVERRIDE` '1' for the nine new locales, the same as the sibling #73;
  - fr stays GS, because its frozen title says (GS);
  - `STRAND_OVERRIDE` gets the sibling's handwriting strands;
  - `ACTIVITY_WRAPPER_VERSION` 9.815.
- **Legacy gates:**
  - `verify-snippy-core.js` still proves the old core's letters, from its own glyph table;
  - `local-test-snippy.js` exits 0 with a pointer.

## The invention: your letter has a replay
- **The recording:** the child's letter is recorded as it is written. On Check it plays back beside Snippy's model.
- **The knob:** the library snail on a brass rail drives both replays. Dragging it scrubs both letters in step, and tapping it plays.
- **The rail:** it fills with one colour band per stroke, the child's on top and Snippy's below. A child's stroke wears the colour of the model stroke it lies on. A backwards stroke carries white chevrons, and strokes written in another order show their colours in another order.
- **The steps:** guided (road, numbered green dot, arrow) → with the road (road, the next dot) → on my own (no road; every start dot shown, unnumbered).
  - The first two steps are judged by the live tracer and end with the rewind as a showing.
  - Only "on my own" is graded, by the alignment. Each recorded stroke is matched to the model stroke it lies on, by mean distance ≤ 14 units. Its direction is the arc length it walked along that stroke, unwrapped on a ring. It must start within 12 units of its own start and cover ≥ 75 % of its stroke, and the order is the drawing order. The first disagreement in time is the one named.
- **Misses:**
  - Empty Check: a hint, no miss.
  - Miss 1: the rewind stops inside the offending stroke, with a flag on the rail and rings on the two starts (start) or on the sparks (direction). The bubble names start / direction / order (with the colour of Snippy's first line) / shape.
  - Miss 2: the road step is put back before "on my own", with a moving spark on the road.
  - A new stroke after a miss starts a clean page.
  - Rub out keeps the try count, so it never dodges the second-miss help.
- **Phones (< 520 px):** one pad, with tabs Yours / Snippy's / Both after a rewind. The picture, word and print letter sit above the pad.
- **Free play:** on a wide card, a tap on a letter tile shows Snippy writing it. The tile of the letter being written on one's own is disabled.

## Departures from the design (recorded)
- **Levels 3–4 (words, sentences) are not built.** RULINGS: #73 owns the letters and #218 Word Ribbon owns words, sentences and spacing. Level 5 joins stay BLOCKED (no cursive stroke data).
- **One glyph source for all 52 letters (+ locale letters):** the sibling's, not the 10 hand-skewed Snippy glyphs. The design's "nearest-dot-first fails ≥ 60 %" cannot hold with honest print glyphs, because top-left-first is the right order for most letters. The homer's fail counts per set are MEASURED and frozen as a ratchet (en s1 4/9 …).
- **A locale letter joins the set of its base letter** (ä/å/æ/ß → Snippy's letters, ö/ø/ü → round and down, Ñ → straight lines, Ä/Å/Æ → slants, Ö/Ø/Ü → curves). The design put them in ball-and-stick.
- **No sentence frame "the letter that starts {word}".** The picture's word is shown with the round's letter marked where it stands (de lowercase: inside the noun), which avoids the German capital-noun trap.
- **Ball-and-stick renamed "Capitals: the right way round".** J, N and Z have no ball; the set holds the most-reversed capitals (reviewer).

## Native + pedagogy review (one reviewer over every string, word, title and paragraph of 11 locales)
- **MUST, en source inherited ×10:** hWrongEnd said "the way the arrow points", but it also fires in the road step, which has no arrow → "go along the road the right way" ×11.
- **MUST, en source ×10:** the set name "ball and stick" (above) → renamed ×11. pt "pau e barriga" carried a vulgar sense. da "pind og bue" clashed with "buer".
- **MUST, other strings:**
  - de ariaTile ungrammatical;
  - it "linee storte" (= wrong lines) → "oblique";
  - es "yo solo" in third-person prose;
  - nl reflexive "schrijft zich" (intro + prose).
- **SHOULD, applied:**
  - de «gefahren / Fahr»;
  - fr «Tout seul uniquement», «Lettres miroirs», «Rondes et descentes»;
  - es «Presiona», «Yo solo», «primer grado»;
  - pt «Somente sozinho», «Letras espelhadas», «Lembre onde começar»;
  - it «Soltanto da solo»;
  - nl «Deze haal», «zonder tijdsdruk»;
  - fi «kirjaimen {g}», «epätasainen».
- **Pictures — no picture where the first letter is not heard as itself, or the picture cannot be named:**
  - de c/h/S (in "Sch"), Ö (Öl); de e → Delfin, V → Vogel;
  - fr c/C (Chat), u/U (a shirt labelled uniforme);
  - pt h/H (Hamster said "râmster"), D → Dragão (the "Dados" picture is one die);
  - sv/da/no y/Y (Yacht = "jått");
  - sv/no/fi z/Z (Zinnia), fi ö/Ö (Öljy);
  - es u/U (the "magpie" picture is not a magpie); it u/U → Uccello;
  - da/no å/Å (the "åre" is a canoe paddle); fi m/M → Mansikka (the mango reads as a peach).
  - Every picture was opened on a contact sheet.
- **Letters without a picture (a ratchet, may only shrink):** de cqhYÄSÖÜ · nl qyYQ · da åqwyWYÅQ · sv qwyzWYZQ · no åæqwyzWYZÅÆQ · es uñÑU · pt hyHY · fr cquwWCQU · fi åqöwxzWXZÅQÖ.

## FROZEN-NOTEs (for the operator; not changed)
- **en intro:** describes "Snippy the snail forming letters"; still true, since Snippy is the rail knob.
- **fr intro:** «Online, sans inscription.» is a no-sign-up claim. Its title says (GS) while the sibling #73 is CP.

## Gates (local)
- verify-rewind-rail-core 10651/0 · mutate-rewind-rail 22/22.
- local-test-rewind-rail: every letter of every set × 11 locales through all three steps, every miss path, rail drag/tap/keys, tiles, settings, the width sweep.
- live-verify-rewind-rail 67/0 on production (en/de/sv/fi × 1366/390, real pointer: empty Check, the order slip with the flag, the win; every locale 200) · live variety ≥ 7 + reshuffle.
- visual-qa all 11 locales · hierarchy 419/0 · settings-efficacy 2 live · preflight routes · prose claims · serp copy · content ×11 · answer-rank.

## Traps paid for
- **A count that a "help taken away" also resets loses the second-miss ladder.** Keep `tries` separate from the visible `help`, and through Rub out.
- **A listener added inside a paint function on an element that survives the paint piles up.** Attach it once in the render.
- **Never repaint the pad on pointerdown.** Rebuild its contents in place, and keep the svg element under the finger.
- **A floor I invented (85 % pictures, 76 px x-height at 320) is not a measurement.** The honest refusals and the fi 320 fold replaced them with a measured ratchet and #73's measured floor.
