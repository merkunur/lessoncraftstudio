# nt20-B — synthesized design specs (the brief every panel is given)

The three studio documents in `b2-studio/` (`design-A.md` apparatus pages · `design-B.md` picture-word pages · `design-C.md` sentence pages) are the full designs; `critic-pedagogy.md` is the pedagogue review. **This file records the amendments that OVERRIDE the studio text.** Where this file is silent, the studio spec stands. Every locale panel, landing panel and engineer reads the studio spec for their type PLUS this amendment list — brief panels from the generator, never from prose (nt20 lesson).

## Cross-cutting rulings
- **K pages carry NO CCSS code above K.** K-284 L.K.1.a · K-285 K.CC.A.1 (d1/d2) + K.CC.A.2 (d3 counting-on window) · K-286 readiness · K-287 L.K.1.c · K-288 readiness (no code; en a/an is "readiness for L.1.1.h").
- **G1 pages carry G1 codes only.** G1-244 L.1.2.d · G1-245 readiness (alphabetising has no CCSS code; "L.2.2.e" is a G2 reference-materials code) · G1-248 1.NBT.A.1 only · G2-274 L.1.2.b (+ L.2.2 general) — the page is initial capital + names + end mark, not L.2.2.a proper-noun classes.
- **Sentence writing rows at G2/G3 use glyphH ≥ 24** (≈ 3.6 mm x-height): G2-274 5 lanes at glyphH 26 · G2-278 d2 5 rows × glyphH 24 (h 62), d3 6 rows × glyphH 24 (h 58) · G3-370 answer-sentence row glyphH 24 (h 44). Full-word rows at K stay ≥ glyphH 40; letter caps K-284 d2 ≤ 9 letters, d3 ≤ 11.
- **`codeColors` = 8** (`codeOrange #D9661C · codePurple #7A4E9C · codeBrown #8C5A2B · codePink #D66A8E`, in `_tokens.js`); `data/color-words.js` = 8 words × 11 (panels audit the 4 new words).
- **Trace lanes:** `strokeWordLane({stack:true, modelless, emptyLast, padLeft, align})` shipped (additive; side-by-side lane byte-identical). Glyphs `' ' '-' '\'' '’' 'ç' 'Ç'` added to `letter-strokes.js` — no vocab noun is refused for those characters any more; specs still filter with a `traceable()` guard that throws-or-skips on any other unknown glyph.
- **Number line:** `numberLine({pointers:[{value}]})` shipped (additive). Pointer min gap = 3 ticks when a line carries 3 pointers.
- **Wave theme order for the article page (K-288):** put `fruits`/`vehicles`/`toys` before `animals` in every wave (sv/da/no animals are 36:1 gender-degenerate and refuse).

## Per-type amendments (numbers = studio type numbers)
- **#2 K-285 Dot-to-Dot.** d3 = **counting-on window**: 20 dots numbered 11…30 (strip shows 11…30), NOT skip-counting by 2 (Kl. 1 content). d1 = window 1…10 with the remainder pre-printed; d2 = 1…20. `dotFigure({figure, count, step:1, startAt, window})`.
- **#4 K-287 Singular and Plural.** **Regular (prefix) plurals ONLY at every level** (`plural.startsWith(singular)` after case-fold; nouns with plural === singular excluded). d3 difficulty = longer words / the locale's second regular class (en -es, de -en vs -e, fi -t on stems ending in a consonant…) — never irregulars. d3 = 4 rows (not 5). A locale whose theme has < rows regular plurals → throw (the wave picks the next theme).
- **#5 K-288 Articles.** No CCSS code. **it:** chips `il/la` at d1/d2 (nouns needing `lo`/`l'` are refused via `keyFor → null`), `il/lo/la/l'` allowed only at d3 with 4 chips of 66 px. **fi = yksikkö / monikko**: two chips per card (`kissa` / `kissat`), keyed by the picture count on the card (1 picture → singular, 3 pictures → plural) — a genuine Finnish K noun-form staple with exactly one correct chip; the fi panel authors the title (*Yksi vai monta?*). **en** = `a / an` with a panel-authored exceptions list (unicorn→a, hour→an, one→a, …) — readiness.
- **#7 G1-243 Number of the Day.** d1 N ∈ 11..19 excluding 15 (labels every 5 on the 0-20 line); d2 N ∈ 21..49 **excluding multiples of 5** (labels every 5 on 0-50); d3 N ∈ 21..99 excluding multiples of 10 (labels every 10 on 0-100). The number word gets **one full-width writing row** (never split a de/fi compound across two rows). Replace the odd/even cell (2.OA.C.3 = G2) with **count back** (`N → [ ] → [ ] → [ ]`, N−1, N−2, N−3) at d1/d2 and **count on by tens** at d3.
- **#8 G1-244 Write the Word.** Word bank at **d1 only**. d2 = **letter-count boxes** (one dashed box per letter of the word, under the picture, no bank) — the *dictée muette* exactly. d3 = plain ruling, no boxes, no bank. Titles must not promise a bank.
- **#9 G1-245 Alphabetical Order.** No CCSS code (readiness). Cap card words at 12 letters (never shrink below 15 px).
- **#11 G1-247 Doubles and Halves.** Halves strip reads **`12 = ▢ + ▢`** (1.OA.D.8-honest; drop `→`). verify: neither box printed; both answers = N.
- **#12 G1-248 Number Line.** Code 1.NBT.A.1 only; min gap 3 ticks with 3 pointers.
- **#13 G1-249 Unscramble.** Bank rule (a): **identical fungible tiles are allowed** (two `the` tiles) — verify compares MULTISETS and drops the "no repeated token" rule; (b) validator BANS frames with a movable adverbial (panel rule: no time/place adverb phrase that can front — "every day", "heute", "hier"); (c) de criterion = the ONE **unmarked** order (V2 with subject first), never "only grammatical order".
- **#14 G2-274 Fix the Sentence.** **5 lanes** at glyphH 26 (d1 4 lanes glyphH 28). Code L.1.2.b + L.2.2 (general). `!` frames only when the bank flags them `exclaimStrict` (interjective: "Wie schön!" / "Quelle surprise!"); otherwise d3 mixes `.` and `?` only. de shows the Nomen chip at d1 too.
- **#15 G2-275 Word Classes.** d3 (no pictures) requires a per-locale **`nounExclude`** list: the validator lists every verb/adjective that is homographic with a vocab word in that locale (en duck/fly/fish/bear/bat/seal/orange/light, fr orange, it pesca…) and refuses the draft until each is either dropped or listed. de `chipCase:'lower'` at d3 by default.
- **#16 G2-276 Shopping Math.** Pay-with may include the **unit coin** (1 €/1 $/10 kr) from `CURRENCIES[loc]` when the currency ships it; en unit follows the nt20 ruling (`¢`), never "ct". Panels are briefed with the **repeat-the-name rule** (no pronouns) — the studio's "she" sketch is not the contract.
- **#17 G2-277 Calendar.** **weekStart per locale**: en 0 · **pt 0 (pt-BR)** · es 1 (Spain/ISO; the es panel may rule 0) · de/fr/it/nl/sv/da/no/fi 1. Row count computed from `(firstCol, days)`; en and Monday locales may differ in rows for the same month (accepted). d3 `between` becomes **"How many days after [A] is [B]?"** (B − A, B > A, both stickers).
- **#18 G2-278 Write About the Picture.** Rows: d1 3 × glyphH 28 · d2 5 × glyphH 24 · d3 6 × glyphH 24. Starters are **narrative** at d2/d3 rows 1 and 3 ("One day, …" / "Then …" class — panel-authored) so W.2.3 is honest; d1 starters descriptive ("I see a …").
- **#20 G3-370 ×/÷ Word Problems.** Answer-sentence row glyphH 24 (h 44). d3 keeps products ≤ 36 (the picture stays; pedagogue's ≤ 50 idea is a future variation).
- **#1 #3 #6 #10 #19** ship as designed (studio text stands), with the cross-cutting rulings above.

## Data contracts (final)
- `data/b2/figures.js` (DOT_FIGURES 16 · PIXEL_FIGURES 12) — gate `qa/verify-b2-figures.js`.
- `data/b2/collation.js` ×11 (hand-authored): `{ alphabet[], strip[], fold{} , stripCase }`.
- `data/b2/articles.js` — per-locale `{ mode:'article'|'form', chips[], chipsD3?, keyFor(entry, ctx) → index|null, chipDots? }`; fi `mode:'form'` keyed by picture count.
- `data/b2/sentences.js` ×11 (GENERATED): the design-C §0 contract with amendment #13 (fungible tiles) and #14 (`exclaimStrict`).
- `data/b2/word-classes.js` ×11 (GENERATED): `{ terms, chipCase, chipCaseD3, verbs[{w,tier}], adjectives[{w,tier}], nounExclude[] }`.
- `data/b2/shop-frames.js` ×11 (GENERATED): `{ yes, no, frames:{ total[], change[], canBuy[], diff[] } }` with `{name}{item1}{item2}{item3}{coins}{money}` slots.
- `data/b2/wp-muldiv-frames.js` ×11 (GENERATED): `{ nounForm, nounCase, nounForms?, names[], frames:{ mul[], share[], group[] } }` with `{name}{n1}{n2}{noun}`.
- `data/b2/calendar.js` ×11 (GENERATED): `{ weekStart, dayNames[7], dayAbbr[7], dayPlural[7], monthNames[12], ordinal(n) → string (as a pattern), frames{…} }`.
- `data/b2/labels.js` ×11 (GENERATED): the small label tables — number-of-the-day cells, doubles/halves pills, singular/plural pills, picture-writing starters, fix-checklist chips, word-bank/legend chrome.
- `data/b2/figure-names.js` ×11 (GENERATED): names for the 16 dot figures + 12 pixel figures (meta/landing only).
