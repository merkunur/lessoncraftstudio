# The new worksheet makers — engines (run F2a)

Answers the per-maker questions of `docs/makers/FABLE-BRIEF.md` (§"Per-maker questions") **inside** `docs/makers/ARCHITECTURE.md` (run F1), gives one engineering card per maker (Part 2, in the §14 build order) and designs the five engines no worksheet-gen type has yet (Part 3). Written 2026-10-31 from the code as it is; every factual claim cites `file:line` (paths relative to `scripts/worksheet-gen/` unless they start with `REFERENCE`, `mini tools/`, `frontend/` or `docs/`). The six picture-engine makers (find-the-differences, dot-to-dot, color-by-number, how-to-draw, picture-tracing, mazes) and the coloring-pages photo→line-art question are **F2-art's**; here they get only a short card. New templates are **F2b's**; where a maker clearly lacks something it is named, not designed.

Vocabulary used below: *template* = a worksheet-gen type module exposed in a maker; *control* = one of the ≤ 7 visible controls (ARCHITECTURE §4.1a: Level · Pictures · How many + ≤ 4 template controls); *gallery card* = a template or a template variant shown as its own thumbnail; *bank* = per-locale reviewed data under `data/`; *refuse* = the template is not offered in that locale (gate 2 `refused`); *F2-art* = the picture-engine run.

---

## Part 1 — answers to the per-maker questions

> **F3 (2026-10-31), two standing corrections for every card below.** (1) Wherever this document says "native panel" / "the panel confirms" / "native-panel pass", the mechanism is **ONE reviewer agent reading the compact 11-locale dump in one sequential pass** (CLAUDE.md #1 rule: no per-locale fan-outs, ≤ 1–2 agents per task; #2 rule: the native + pedagogy check is never skipped) — never eleven panels. (2) Three code defects this run found were **fixed the same day**: G2-211 and G3-328 now use `mulGlyph` (commit `e934eb54a`), G3-349 gained `uniquelySolvable` (commit `9f7ec9973`); G3-358's duplicate `DOT_LOCALES` table is still open. Details at the items.

### [counting-Q1] I-spy scenes with the teacher's own pictures

**What the engine does today.** `types/_shared/scene-count.js` (K-013 legend mode, K-060 I spy, K-059 find-and-circle) samples `d.nouns` nouns from the theme (`:31`), gives each a count `n` in `[minN,maxN]` (`:32`; level 3 = 4 nouns × 4–9), and calls `mixedScatter({w:600, h:sceneH-20, iconPx:58})` (`:37`). `templates/components.js:68-92` places the `total` icons on a **shuffled grid of cells** (`cols = ceil(sqrt(total·w/h))`, `rows = ceil(total/cols)`, `:70-75`) with a jitter bounded to `(cell − icon)/2 − 2` (`:79-84`) and a ±8° rotation (`:85`). Non-overlap is therefore **by construction** as long as `iconPx ≤ min(cellW, cellH)`: at the worst case (36 icons, 600×500) cols = 7, rows = 6, cells 85.7 × 83 px > 58 px. `verify()` recounts `[data-lcs-scatter]` per `vocabKey` against the legend's `data-lcs-answer` (`scene-count.js:66-89`), so a count can never be printed wrong.

**Rule for the maker (no new layout engine):**

| step | mechanism |
|---|---|
| the teacher's choice | the scene has `d.nouns` *kind slots* (`K-060#kind1…kind4`); each slot is a picture — a theme noun by default, or a picture the teacher picked (library noun from any theme via `lib/b3-picture-index.js`, or an own photo `{fp}`). Stored as `edits[{op:'picture', slot}]` / `own[{slot, fp}]` (ARCHITECTURE §4.3, §7.2) |
| counts stay exact | the swap is applied **inside** `build()` through `ctx.overrides` before `mixedScatter` runs: the item keeps its `n`, its cells and its jitter (same seed), only `src` changes; the scatter key becomes the slot's stable key (`data-lcs-scatter="own:<fp8>"` for photos), so `verify()` keeps counting the same way. Nothing moves; nothing is recounted by hand |
| no two kinds alike | library picks: `lib/distinct-pictures.js` by picture signature (`data/picture-signatures.json`, see §"Found in ARCHITECTURE" on its `fs`/`crypto` use); own photos: two photos with the same `fp` or a perceptual-hash distance < 8 (a 64-bit dHash computed at upload, stored in `own[]`) are refused with "Choose two different pictures" |
| picture shape | own photos are square-fit 512 px with their background kept (ARCHITECTURE §7.2); the scatter draws them with `border-radius: 12px` so a photo reads as a card, never as a floating cut-out; the legend shows the same card. No label is ever printed (A18: `own[]` carries no name) |
| capacity | `kinds ≤ 4` (the level-3 ceiling) and `Σn ≤ 36` are template limits in `templates.json`; the "How many" control adjusts `maxN`, never the scene size, so the cell test above always holds. If a teacher asks for 5 kinds she gets "This sheet holds up to 4 kinds of pictures" (§6.2 step 2) |
| screen version | the I-spy legend is a `type-number` screen per kind (the child types the count); the scene is the live render, not a screenshot (ARCHITECTURE §3) |

Controls: Level · Pictures (theme chips + per-kind picker on tap) · How many (2–4 kinds) · *Count range* (1–5 / 1–9) = 4 of 7. The old `find-objects` odd-one-out mode is not this maker's (it lives in same-different); the old `find-and-count` "letter spotting" is a letter hunt (alphabet maker, K-229/K-327).

### [addition-subtraction-Q1] National written methods in columns without forking the engine

**Today.** `types/_shared/column-arithmetic.js` renders digit cells, an equals bar and per-digit answer cells (`:55-103`). Addition with regrouping gets a dashed **carry mini-row above the top addend** (`:79-85`); subtraction gets **20 px of empty headroom and no scaffold**, deliberately, because "algorithms differ by country — de Ergänzungsverfahren writes below, fr uses compensation on both rows" (`:8-11`, `:86-87`). The screen version (`lib/column-screen.js`, `:117-126`) types one digit per answer cell and never grades scaffold rows.

**Decision: the written method is DATA, the factory gains one scaffold renderer with three shapes, and the teacher sees a control only where her country teaches more than one method.**

`data/column-method/methods.js` — one row per locale, authored by the native panel from the country's textbooks (my table below is the brief for that panel, **not** a ruling; every cell must be confirmed):

| locale | addition carry mark | subtraction method the school teaches first | scaffold shape |
|---|---|---|---|
| en-US | small digit above the top addend's next column | decomposition ("borrowing": cross out, write the new digit above the minuend) | `carry-above` + `borrow-above` |
| de | small digit **below** the second addend (Übertrag row above the answer line) | Ergänzungsverfahren / Austrian: "7 + ? = 12", the 1 written small under the subtrahend's next column (some Länder teach Abziehen with Entbündeln — a per-Land choice → both offered) | `carry-below` + `add-below` / `borrow-above` |
| fr | retenue small above the top row | compensation (Méthode par cassage vs par compensation — the programmes leave the choice; compensation is the classic) | `carry-above` + `compensate` |
| es-MX | "llevamos 1" small above | decomposition ("pedir prestado") | `carry-above` + `borrow-above` |
| pt-BR | "vai um" small above | decomposition ("emprestar") | `carry-above` + `borrow-above` |
| it | riporto small above | prestito (decomposition) | `carry-above` + `borrow-above` |
| nl | onthouden small above (also "1" under the line in some methods) | decomposition with the kolomsgewijs variant (whole-number partial differences) as a second method | `carry-above` + `borrow-above` / `partial` |
| sv / da / no | minnessiffra / huskeren small above | låna (decomposition, marks above the minuend); da also teaches "lige tillæg" in some books | `carry-above` + `borrow-above` |
| fi | muistinumero small above | lainaaminen above the minuend | `carry-above` + `borrow-above` |

Scaffold shapes (the only code that changes, all in `column-arithmetic.js problemCard`): `carry-above` (today's), `carry-below` (the mini-row moves between the second addend and the equals bar), `borrow-above` (a 24 px dashed mini-row above the minuend — pre-printed empty cells the child writes the regrouped digits in), `add-below` (the Austrian row under the subtrahend), `compensate` (small cells on both rows), `partial` (two extra answer rows for partial differences), `none` (today's headroom). The scaffold is **always empty cells** — a page never pre-fills a carry or borrow (that would hand over the answer; A13). `verify()` is untouched: it only checks the answer digits (`:165-197`). Screen: unchanged (`column-screen.js`) — scaffold cells are inert on screen.

Controls: a *Written method* select appears **only** for locales whose row lists two methods (de, nl, da) and defaults to the first; everywhere else the locale's method is applied silently and the control slot stays free. The teacher can never pick a foreign method. The level-set options `d.digits / sameDigits / maxCarries / minCarries / acrossZero` (`:143-153`) become the template's *Regrouping* control (none / some / always / across zeros) — a 1:1 map onto existing knobs.

Cost: ≈ 0.5 session code + one native-panel pass on the 11-row table (part of the maker's 4 sessions). Risk: a locale ruling that needs a fourth shape; refuse that method until drawn, never approximate.

### [multiplication-division-Q1] Does `_shared/notation.js` cover every template and the screen?

**No — not yet.** `types/_shared/notation.js:16-22` is the one table: `·` for de/sv/da/no/fi else `×`; `/` for sv (the file's header: `÷` is **forbidden** in Swedish, it meant minus), `:` for de/it/nl/da/no/fi, `÷` for en/fr/es/pt — which corrects the brief's premise ("fr/es/pt ÷ or :"; sv `/`). Its consumers are `G3-369`, `G3-370`, `G3-377`, `_shared/array-tasks.js`, `_shared/number-line-tasks.js`, `lib/division-remainder-screen.js`, `lib/fact-families-screen.js` (grep). Three places still carry their own sign:

| file | defect | fix (mechanical) |
|---|---|---|
| `types/g2/G2-211-array-multiplication.js:62,64` | literal `OP('×')` in every locale | **F3: FIXED** — `:63` reads `OP(mulGlyph(locale))` (commit `e934eb54a`, 2026-10-31) |
| `types/g3/G3-358-times-tables.js:90` | a **second table** `DOT_LOCALES` (same content today, will drift) | import `mulGlyph`; delete the set — **F3: still open at `:25` + `:90`** |
| `types/g3/G3-328-input-output-table.js:20,32` | `'×' → 'x'` printed as a letter x in the machine rule | **F3: FIXED** — `:12` imports `mulGlyph`, `:46` uses it (commit `e934eb54a`); the `OPQ` map at `:21` still carries `'×': 'x'` as a key alias only |

`lib/times-tables-screen.js:27-35,69` already takes `glyph` as a parameter — the screen prints whatever the page passes, so fixing the page fixes the screen. G3-377's verify already asserts the sign per locale and bans `÷` from every Swedish text node (`:447,527,681,891`); that assertion is promoted to **gate 15** for the whole maker (`no-foreign-sign`: every `[data-lcs-op]` and every text node of a multiplication/division page carries only the locale's glyphs). Add the gate before the first new template.

What the table does **not** cover and the new templates will need: (1) the *remainder word* — `data/b3/division-with-remainder.js:51 restWord` exists per locale (bank ×10), reuse it; (2) the *written division layout* (en-US long-division bracket, de/nl `:` with the result on the right, fr "potence", es-MX/pt-BR "casa"/"chave") — **no primitive exists**; a G3 "long division" template is out of the K-3 core and must be designed by F2b with a per-locale layout table or refused; (3) the multiplication *fact family* ordering (de reads `3 · 4` as "3 mal 4" = 3 groups of 4; en-US "3 times 4" = 3 groups of 4 too; but pt-BR/es textbooks write the multiplier first as well) — no change needed, but every picture-equation template must stamp which factor is the number of groups (`data-lcs-groups`) so the native reviewer (gate 10) can check the instruction against the picture.

### [word-problems-Q1] The class's own names in stories, in all 11

**Today.** Frames are native per locale with slots `{name} {n1} {n2} {noun}` only (`data/word-problems/frames.js:3`); the fr frame set has one `{il}` pronoun slot (`:109`), pt/it have a `{Q}` ("Quantos/Quantas") slot that agrees with the **noun's** gender (`:140-142, :167-169`; `lib/word-problems-levelset.js:16-17, 102-106`). The fr pronoun is resolved from `LS.fr.nameGender`, a 16-name table; a name without an entry **throws** (`:118, :197`). Only fr carries a `nameGender` table (`data/word-problems/word-problems-levelset.json`: fr 16, every other locale 0). Names are drawn from 8 per locale (`frames.js:14-23`, `namesFor :93-96`).

**Can own names be inserted safely?** Yes, with two rules, because the frames were written for it:

1. **A name is a proper noun in the nominative and nothing agrees with it** in 10 of 11 frame sets: no article, no adjective, no pronoun, no case ending refers to `{name}` (de "{name} hat … Wie viele … hat {name} jetzt?" `:53`; fi "{name} saa … Kuinka monta … {name} saa yhteensä?" `:74` — the name is the subject in every slot, never in a case that inflects it). The only agreement in the whole bank is fr `{il}` (one frame). So in en, de, es, pt, it, nl, sv, da, no, fi a typed name drops in **unchanged** and the sentence stays grammatical by construction. (es/pt/it `{Q}` agrees with the noun, not the name.)
2. **fr:** a frame containing `{il}` is used with an own name only if the teacher has given the name's gender. The shell's *Names* control is a list of `{name, gender?}` chips; for fr the chip asks "il / elle" once per name (two radio glyphs, no text); for the other ten the gender field is hidden. A fr name without gender simply excludes the `{il}` frames (3 of 4 add-frames remain, `:107-110`) — never a guess.

Refusals and limits (gate 9 `own-input`): a name is 2–14 letters of the locale's letter set (`\p{L}`, hyphen, apostrophe — "Jean-Luc", "D'Angelo"), printed as typed (never case-folded; the frame never sentence-cases a name, `sentence-bank.js:7` "it never inflects, capitalises or re-orders a word"); ≥ 2 names per page when a frame has `{name2}` (`word-problems-levelset.js:16-17` — F3: the earlier `:226-230` is past the file's 203 lines); duplicates collapse; a name that equals a noun of the bank in that locale (fr "Rose", en "Daisy") is allowed — it is capitalised and a proper noun. The recipe stores the list in `words[]` with `kind:'name'` (ARCHITECTURE §5.1). Pictures: a name never gets a picture (no `own[]`); the story's picture is the noun's.

What stays bank-only: the *nouns* (plural forms from `image-vocabulary.js`; fi from the curated partitive table `frames.js:290-350` — an own noun is refused in every locale because the frame's number agreement is on the noun), and the frame text itself.

### [number-of-the-day-Q1] Number words to 100 and 1000 in all 11

**Today.** `lib/number-words.js` is 0..100 only — `guard()` throws outside (`:20-22`), with every school-register trap encoded and panel-verified (`:1-16`: fr hyphenated rectified spelling, da vigesimal, de/nl unit-first, no post-reform, it elision, es fused 16–29, pt-BR dezesseis, fi `-toista`/`kymmentä`, sv `ett`). Consumers: `G1-210` (ranges 3–20 / 13–100, `:59-61`, plus the nl `één` override `:35`), `G1-243` (`:29,107`), the doubles/halves family (grep). So **to 100 is covered in all 11; to 1000 is not covered in any.**

**Decision.** Extend the same module (never a second table) with hundreds and thousands, per locale, as a `wordTo1000(n, locale)` that composes `hundreds + joiner + numberWord(rest)`; the composition rules are small but every one is a trap the native panel must confirm:

| locale | 100 / 200 | joiner to the rest | 1000 |
|---|---|---|---|
| en-US | one hundred / two hundred | space, **no "and"** in US school register ("three hundred five"; the brief's en-US rule) | one thousand |
| de | hundert / zweihundert | solid word (dreihundertfünf; einhundert vs hundert: school writes *hundert*) | tausend / eintausend |
| fr | cent / deux cents (s only when final) | space (trois cent cinq; cent un) — rectified 1990 spelling hyphenates *all* (trois-cent-cinq) — the bank already chose rectified (`:5-7`) → hyphens | mille (invariable) |
| es-MX | cien / doscientos | space (trescientos cinco; ciento uno, **ciento** before a remainder; quinientos/setecientos/novecientos irregular) | mil |
| pt-BR | cem / duzentos | " e " (trezentos e cinco; cento e um, **cento** before a remainder; quinhentos) | mil |
| it | cento / duecento | solid (trecentocinque; centouno) | mille |
| nl | honderd / tweehonderd | solid (driehonderdvijf; honderdeen) | duizend |
| sv | hundra / tvåhundra | solid, 101 = hundraett | tusen / ettusen |
| da | hundrede / to hundrede | " og " only before the final unit (tre hundrede og fem; hundrede og et) | tusind |
| no | hundre / to hundre | " og " (tre hundre og fem) | tusen |
| fi | sata / kaksisataa | solid (kolmesataaviisi; satayksi) | tuhat |

Gate: a snapshot test of 1..1000 ×11 reviewed by the native panel (as the 0..100 table was); `G1-210`'s *Zahlendreher* distractor (`:48`) extends to 3-digit swaps. The maker's *Range* control offers to 20 / 50 / 100 / 1000 and the 1000 value is **refused** in a locale until its panel sign-off lands (per-locale `refused` in `templates.json`). Ordinal words come from `data/b3/ordinals.js` (×11, `:15-18` gender/capital rules) — reuse, do not re-author.

### [number-tracing-Q1] Per-locale numeral forms

**Confirmed, and the brief's premise is partly wrong.** `data/tracing/digit-strokes.js` carries three forms and a per-locale map (`:37-77`): `plain` (bare 1, uncrossed 7) for **en, es, pt**; `dutch` (short-flag 1, **uncrossed** 7) for **nl, sv, no, da, fi** — the native panels ruled that the crossed 7 is adult handwriting there, not the school model (`:72-75`); `continental` (flagged 1, crossed 7) for **de, fr, it**. es and pt-BR were ruled plain by their panels (`:65-71`). `K-237` already picks the form from the content locale (`K-237-number-tracing.js:23,34`, fallback `continental`).

**How the maker picks:** from `recipe.lang`, through the same `FORM_BY_LOCALE` — never a teacher control (a teacher in Hamburg never needs an American 1). One exception the panels left open: bilingual classrooms. If the operator wants it, a *Numeral style* drawer option (plain / flag / crossed) could be offered; I recommend **not** (it is exactly the kind of control F3 removes) — list it in "For the operator" only if asked. The maker's new "trace the number word" template uses `lib/number-words.js` + `lib/letter-pad.js` (`:9-10`, per-locale letter set) and the word tracing lanes of `primitives/trace-path.js` — all existing. Gate 2 asserts the rendered 1 and 7 paths equal the locale's form (`data-lcs-form` stamp).

### [money-Q1] Coin pictures, and the es-MX / pt-BR sets

**Rule (confirm, already in code):** coins are **stylised tokens, never replicas**. `primitives/coins.js:2-5`: "Deliberately GENERIC, never a legal-tender replica: a circle with a ring treatment, the value printed large ON the coin … differentiated by SIZE + RING, never by hue". Keep it — for three reasons that hold in every one of the 11 markets: (1) reproduction of currency is restricted or licence-bound (US 18 U.S.C. §504 allows only size/colour-constrained illustrations; the ECB's euro-coin design is protected and reproduction requires the ECB's conditions; Banxico and the BCB restrict reproductions; the Nordic central banks publish image-use conditions) — a K-3 product should never carry that risk; (2) a photo-realistic coin at 44 px prints as a grey disc on a classroom copier — the B&W-by-size rule (`coins.js:4-5`, `currencies.js:21-22`) is the reason the tokens exist; (3) the deck catalogue already ships them, and a maker must reproduce the deck ("Make your own").

**Denominations (`data/money/currencies.js:32-44`):** es = **MXN**, whole pesos, coins $1 / $2 / $5 / $10 (`:36`; 50¢ exists but K-2 counts in pesos, `:11-12`); pt = **BRL** centavos 5 / 10 / 25 / 50 (`:38`; the 25-centavo coin is the quarter-like strategy, `:9`). Both match circulation; the es-MX $20 coin and pt-BR R$ 1 coin are the "coins + notes" step: add `{v:20}` (MXN) and `{v:100, note:false}` (BRL R$1 coin) to the sets for the G2 shopping band, after the panel confirms. en-US `¢` 1/5/10/25 (`:33`).

**What the maker adds (small):** (1) a `lib/money-format.js` for the first time money is written with a decimal — today G1/G2 keep every total in the smallest unit (`currencies.js:14-16`, `G2-276:9`): en `$1.25`, es-MX `$1.25` (dot), pt-BR `R$ 1,25` (space after R$), de/fr/it/nl/fi `1,25 €` (fr/de space before €; nl `€ 1,25` — nl writes the sign first) , sv/da/no `1,25 kr` — a 12-row table the native panel confirms; (2) **notes** as flat stylised rectangles with the value, same honesty rule; (3) the "coins only / coins + notes" and "max amount" controls map onto `sub` / `subMax` and the new `notes` list. Nothing realistic, ever.

### [telling-time-Q1] Where the native time words live, and reuse

**Finding.** The activities' `mini tools/clock-core.js` holds worded times as a **table of 16 canonical clock times × 11 locales** (F3: 8 hour/half-hour rows + 8 five-minute rows, `strings.timeExpr`, `:61-82`; "3:00", "7:30" = de "halb 8" / nl "half 8" / sv "halv 8" / fi "puoli 8"; "9:20" = nl "tien voor half tien", da "ti i halv ti", fi "kymmentä vaille puoli kymmenen"), native-owned and ensemble-verified (`:46-51`). It is **not an engine**: `clock-read-core.js:35,100` has `wordFor` for English only. Nothing in worksheet-gen prints a time word (grep for halb/halv/puoli over types/lib/data: no clock type). So the brief's "the activities clock-core has it" is true for 16 times only (F3).

**Decision: one new `lib/time-words.js`, data-driven, ×11, seeded from the 16 verified rows, covering every 5-minute time.** A worded time is `frame[minuteSlot](hourWord(h), hourWord(h+1))` with 12 minute slots (0,5,…,55) per locale and a per-locale hour-word table (en/sv/da/no/fi numerals "3"/"8"; de "3 Uhr" vs bare "halb 8"; es/pt/fr/it hour words with gender/number: es "la una" / "las dos", fr "une heure" / "deux heures", it "l'una" / "le due", pt "uma hora" / "duas horas", plus noon/midnight words). The frames encode the idioms already proven in the 8 rows: toward-the-next-hour "half" for de/nl/sv/da/no/fi; current-hour-plus-half for es/pt/fr/it/en; the half-relative 20/25/35/40 forms for nl/da/no/fi (and de "fünf vor halb"), subtractive "menos" / "moins" / "para as" for es/fr/pt after :30. **Every frame row is authored and signed by the native reviewer; the 16 clock-core rows are the regression fixtures** (the module must reproduce them byte-for-byte — gate 15). Until a locale's 12 slots are signed, the templates that print words are refused there; the 16 canonical times are available everywhere from day one (a "Hour and half-hour words" template needs only slots 0 and 30, both fully covered).

Also reuse: the analog clock primitive `primitives/clock.js` and `types/_shared/clock-tasks.js` (15 templates), the `set-clock` screen kind (`emit/interactive-set-clock.js`), a.m./p.m. and 12/24 h from `G3-355` (en-US is the only 12-hour-first locale; the *Clock style* control hides 24 h for en level 1). Do **not** import `clock-core.js` into the bundle (it is an activity core, 0-line rule); import its `timeExpr` table as data into `time-words.js`'s fixture.

### [measurement-Q1] Unit systems per locale; customary primitives for en-US

**Today, metric only:** `primitives/ruler.js` is parameterised in cm (`:3,18`, 44 px per cm), `jug.js` in ml (`:2,15`), `balance.js` in g/kg (`:3,46`), `thermometer.js` has **no unit label** at all (numbers only; `measurement-tasks.js:112,237-250` levels 0–60 by 10 / 0–40 by 5 / 0–40 by 1). The G1 types measure in "unit squares" (unit-neutral, `measurement-tasks.js:3-5,73-76`). en-US copy says "units" / "how many units long" — honest, but CCSS 2.MD.A.1 names inches and feet, 2.MD.C.7 is time, 3.MD.A.2 grams/kilograms/litres (metric is fine), and temperature is not a CCSS K-3 standard.

**Decision:**

| locale | length | capacity | mass | temperature |
|---|---|---|---|---|
| en-US | **inches** (G1–G2: whole inches; G3: half inches) **and** cm as a second template, both offered; feet in a "which unit" template only | cups / pints only in a *which unit* choice template; jugs stay **ml/l** (3.MD.A.2) | **pounds** in compare/estimate templates; grams/kg on balances (3.MD.A.2) | **°F** on the thermometer (and °C as a second template) |
| the other 10 | cm (m in choice templates) | ml / l | g / kg | °C |

Primitives: `ruler.js` gains `unit: 'cm' | 'in'` with `pxPerUnit` (1 in = 2.54 × 44 ≈ 112 px → a 6-inch ruler is 670 px, the card's full width; so inch rulers hold ≤ 6 in and the objects are longer art) and `ticks: 1 | 2 | 4` (halves/quarters for 3.MD.B.4); `thermometer.js` gains a `unitLabel` ("°C" / "°F") and the existing `min/max/step` already cover 0–100 °F; `balance.js`/`jug.js` only need their `unit` label passed per locale (already a parameter). The measured-ruler types register the ART, not the padded box, by `artExtentSync` (`image-cache/silhouette.js:117-122`, data `data/art-extents.json`) — this holds for inches unchanged. Unit words (inch/inches, cm) are strings ×11 — en only for customary.

Control: a *Units* control appears **only in en-US** (inches / centimetres); for the other 10 the slot is free (metric is silent). Never "customary" in a non-US locale — the locale rule, not a toggle. Risk: the physical print scale — an inch ruler is only honest if the PDF prints at 100 %; the page carries a 1-inch / 2-cm check square in the footer margin on every measuring template ("Check: this square is one inch wide"), a two-line native string.

### [symmetry-grids-Q1] Grid drawing from library art

**Today.** `K-286` copies **pixel figures** (`data/b2/figures.js`, 4 figures per size 6/7/8, asymmetric by construction, `K-286:5-8,37-38`), mono teal cells (`primitives/grid-copy.js:5-7`). The how-to-draw family already draws **library line art on a grid**: `K-396` mode `grid` renders the drawing's vector `S` on `C7.htdGrid({cells, cellPx, model:S})` next to an empty grid (`K-396-how-to-draw.js:246-250`; `templates/components-b7/how-to-draw.js:112`), cells 3–5 (`:60`). The lesson data is `data/htd/<slug>.json` (steps derived from ink, `lib/htd-steps.js`) and the 23 hand-drawn vector lessons in `data/htdv` (`lib/htd-vector.js:1-25`, laws 1–4).

**Decision — reuse the htd grid, choose the grid from the art's complexity, never simplify art live:**

1. **Source** = the how-to-draw lesson set (precomputed, reviewed, F2-art owns growth), not arbitrary library pictures: a picture is "grid-copyable" only if its ink has been reduced to a step lesson, because step 1–2 ink (`S.steps[0..1]`, the outline + big parts) *is* the simplified drawing a child can copy. The grid-copy template draws `steps ≤ k` where `k` is the level: L1 outline only, L2 outline + big parts, L3 the whole drawing.
2. **Grid density from measured detail:** `cells = clamp(3, 8, round(sqrt(segments(S, k) / 6)))` where `segments` counts the drawn path segments after RDP at ε = cell/8 — ~6 strokes per cell is the copyability ceiling the b7 pages already use (3×3 at 96 px for L1, 5×5 at 60 px for L3, `K-396:60`). Stamped `data-lcs-cells`, gate 15 asserts the per-cell segment count ≤ 8 and that no cell holds > 40 % ink (a black cell cannot be copied square by square).
3. **Mirror drawing** (G2-253 family on art): the vertical-axis half of a *symmetric* lesson (`data/symmetry-review.js` / `data/symmetry` already list reviewed symmetric figures for G2-247/248) — asymmetric drawings are refused for the mirror face by the same review flag.
4. **Own photos:** refused (no ink skeleton in the browser — F2-art's picture-tracing ruling applies); library colour pictures without a lesson: refused in the grid-copy face (the picker shows only lesson pictures).

Templates: the existing 10 stay (pixel figures); the "rooster" new template is the htd grid face moved into this maker's gallery (one type file, `templates/components-b7/how-to-draw.js htdGrid` reused, ≈ 0.5 session once F2-art fixes the lesson format).

### [logic-puzzles-Q1] One solution, proven, fast enough in the browser

| engine | uniqueness proof today | browser cost (measured shape) | action |
|---|---|---|---|
| 4×4 picture sudoku `G1-158` | brute-force `countSolutions` while removing clues; refuses to remove a cell that breaks uniqueness (`:4,10-28,66-74`); `verify` recounts (`:131-150`); clues 10/8/6 (`:44-46`) | 4×4 search space is tiny: < 1 ms | none |
| 6×6 `G3-348` | same with `limit 2` early exit (`:10-28,90`; `verify :163`); clues 24/20/17 (`:71-73`) | solver with early exit over a 6×6 from 17 clues: tens of ms worst case; fine | none; add `number` variant = same engine with numerals (the new template) |
| logic grids `G2-319` family (G1-349, G2-344/345, G3-378/379) | exhaustive: `solutionsOf = permutations(n).filter(holds)` must be exactly 1, every clue necessary, propagation reaches the full solution (`:40-53,115-130,184-218`); two-attribute: `states2 = P×P` (`:366-376`) | n ≤ 4 → 24 permutations (576 states for two-attribute): microseconds | none |
| number walls `G1-246` family | propagation solver, build refuses, verify re-implements (`:6-8,247-258`) | trivial | none |
| **magic squares `G3-349`** | **F3: FIXED in code the same day** (commit `9f7ec9973`): `uniquelySolvable(blanks)` (`:19`) requires the rank of the six sum equations over the blank cells to equal the number of blanks (the rectangle +1/−1 trade that left a second filling — measured 11 % of level-2 and 21 % of level-3 squares); `build` redraws until it holds (`:81-82`). Was: no proof, `verify` checked sums only | trivial (3×3 rank test) | **remaining under the standing rule: confirm the published G3-349 decks were republished** (the fix reaches new pages; a republish in place of the live decks is what the rule demands — not re-verified by F3, which edits documents only); make `verify` re-run `uniquelySolvable` on the rendered blanks so gate 15 `unique-solution` covers it |
| balance `G3-350` | one unknown per equation → unique by construction | — | none |
| code addition (old `code-addition.html`) | the old app assigns distinct values to symbols, picks sums for the unique letters + 3 distractors and refuses when the combination space is too small (`:1529-1614`) — but symbols-with-values + a sum table is uniquely decodable only if **every symbol appears in at least one equation whose other symbols are already known** (a chain). The old app does not prove that | new type: build the equation set as a *chain* (first equation uses one symbol twice or a symbol + a known digit; each later equation adds exactly one new symbol); uniqueness is then by construction; `verify` re-solves greedily | design in F2b, engine note here |
| picture matrix `G3-351`, analogy `G1-157`, missing piece `K-068` | one correct chip by construction + distinct distractors | — | none |

**Browser budget:** the heaviest is the 6×6 sudoku; a `countSolutions` with early exit from 17 clues is bounded by the 6×6 backtracking (≈ 10³–10⁴ nodes) — well under the 150 ms gate budget (ARCHITECTURE §6.2). Every solver runs twice (build + verify) and both bundle unchanged (pure JS, no `fs`). Gate 15 `unique-solution` makes the counter mandatory for any template that declares `puzzle: true`: a type without a `countSolutions` in its `verify` fails the build.

### [same-different-Q1] Silhouettes from teacher photos in the browser

**Today.** `image-cache/silhouette.js:15-31` makes a shadow by taking the library PNG/WebP's **alpha channel** and filling it with ink; shape distinctness is a 24×24 alpha-mask IoU < 0.72 (`:41-84`). Library art has alpha (`cache/manifest.json` entries carry `alpha:true`; the 512 px set keeps alpha, `image-cache/derive.js:35 alphaQuality`). In the browser this exact step is a canvas `getImageData` → alpha → fill: trivial, deterministic, identical output. The spot-the-difference (`K-061`), closure (`K-069`, a CSS clip `:37-40`) and odd-one-out factories need no raster at all.

**Teacher photos: NO silhouettes.** A photo has no alpha; background removal needs either a model (forbidden: no AI, no model in the product) or a chroma/edge heuristic that fails on most classroom photos (busy backgrounds, shadows, hair) and would produce a blob the child cannot match — a wrong picture by the brief's own definition. Rule: in same-different, own photos are allowed only in templates where the picture is used **whole and unmodified** — find the twins (K-062), find the pairs (K-058), odd-one-out by category (K-043: the teacher supplies the categories), memory pairs; they are refused in shadow (K-057), closure (K-069), mirror (K-063 — a mirrored photo is legitimate only if the photo has no text; refuse) and spot-the-difference (needs a scene). The refusal sentence names the template that accepts photos. If a photo already has alpha (a PNG cut-out exported from another tool) the shadow path works — the uploader detects alpha (`> 2 % transparent pixels`) and unlocks the shadow template for that picture; this is the only "maybe" and it costs one check.

### [position-words-Q1] lcs-grammar for every printed sentence

**Finding.** worksheet-gen does **not** use `lcs-grammar.js` anywhere (grep over types/lib/data: only `qa/verify-b3-read-and-do.js` mentions it). The four position types (`types/_shared/position-words.js`, K-064..067) print no sentence at all: "The arrangement IS the answer; only the one-line instruction localizes" (`:9-10`). The old `prepositions.html` is the consumer: `LCSGrammar.prepSentence(locale, prepKey, landmark)` (`:1181, :3242`), `prepDistractorLabels` for multiple choice (`:4311`), `shapeLandmark` for the default shapes (`:1159`), `fiGenitive` (`:1170`).

**Rule (confirmed and made structural):** the maker's new sentence templates ("Read and draw: put the ball under the table", "Where is it? write the word") print **only** what `prepSentence` returns — `{prefix, expected, suffix}` or `null` (`REFERENCE TRANSLATIONS/lcs-grammar.js:404-429`: the worksheet is `prefix + ____ + suffix`, the key `prefix + expected + suffix`; `null` = "a guaranteed-correct sentence cannot be built"). A `null` is a **refusal of that (preposition, landmark, locale) triple**, never a fallback string; the build draws another landmark from the theme (same seed stream) and refuses the template when the theme cannot supply the per-level count (`themeAxis.minNouns`). The landmark object comes from the per-locale vocab slice (`{key, singular, plural, gender}` — `image-vocabulary.js` header `:12-17`) plus `FI_GENITIVES` for fi (`:1768`); own photos cannot be landmarks (no vocab entry), own typed words cannot either (the de dative-plural and fi genitive tables are keyed by vocab key, `:447-452`, `:1768`). Distractors for the choice face come from `prepDistractorLabels` (`:520`) — frame-valid by construction, A4 safe. `lcs-grammar.js` (80 KB) is bundled unchanged in the shared chunk (ARCHITECTURE §7.1); gate 1 bans any string concatenation of a preposition in type code (`no-handmade-sentence`: a type that prints a `PREP_FORMS` value outside `prepSentence` fails). The prep keys available ×11 are `PREP_FORMS` (`:374-377`: on, under, behind, between, … — the old app's selectable set); "left/right of" and "in front of" exist only where the table has a row; a key missing in a locale is refused there, which is what the table already encodes.

### [sorting-Q1] What "sort anything" may offer before the attribute review completes

**Today.** Three kinds of sort data exist: (a) `types/_shared/sort-to-bins.js` sorts **by picture kind** — the bins are nouns and the items are the same noun repeated (`:28-29`): no category knowledge needed; (b) per-sheet reviewed lists (`data/science/*.json`, `data/literacy/category-vocab.json` with ×11 bin labels: Animals / Fruits / Vehicles …) — pedagogically reviewed per page; (c) `mini tools/object-attributes.json` — 933 keys × 6 attributes (`living`, `natural`, `edible`, `moves`, `size_band`, `habitat`; `$fields`), **456 reviewed of 933** (`count`/`reviewed`), consumed by the sorting-hoops activity.

**Decision — offer in three tiers; the tier is a property of the template, not a toggle:**

| tier | templates | source | available now |
|---|---|---|---|
| 1 | *by kind* (K-042, G1-160, K-240/K-264 cut-and-paste, Venn by two picture kinds) | theme nouns — the bin **is** the picture | all 11, every theme (`minNouns` = bins + 2) |
| 2 | *named categories* (K-235 category-vocab bins, K-203 foods, K-206/K-210 transport, K-212 wants/needs, K-213 helpers, G1-207 food groups) | the per-sheet reviewed lists, unchanged | all 11 (labels ×11 exist in `category-vocab.json`) |
| 3 | *sort by an attribute* (**F3: edible / not, moves by itself / is moved — the two NON-science attributes; `living` and `natural` are the excluded science domain and are never offered**) | `object-attributes.json`, **reviewed entries only**. **F3 — a build prerequisite, not a toggle: the file records the review as a COUNT only (top level `count: 933, reviewed: 456`); a key is `{living, natural, edible, moves, size_band, habitat}` with NO per-key `reviewed` flag, so "the 456" cannot be selected from the file as it stands. Tier 3 ships only after a per-key `reviewed: true` flag (or a sibling list of the 456 keys) is recorded by the review's owner; until then tier 3 is refused in every locale** | after the flag lands — a theme whose reviewed keys cannot fill both bins at the level's `perBin` is refused for that attribute; the unreviewed 477 are never drawn (they do not exist to the maker) |
| own labels | *sort by the teacher's own two labels* (the new template) | the teacher types the two labels and **assigns every picture to a bin herself** in the picker (drag chips into A or B); the maker verifies only structure (≥ 2 per bin, no picture in both) | all 11; the page carries the "teacher-made" chip; strict scoring (A14) because the teacher defined the truth |

What is **not** offered: any automatic category for an unreviewed key; "edible" for anything with `reviewed:false`; size_band as a sort criterion before a native panel confirms the three bands read the same in every locale (hand / person / bigger is culture-neutral, but the labels are strings ×11 that do not exist yet). The review backlog (477 keys) is an offline task that grows tier 3 without a code change (re-bundle the slice).

### [letter-tracing-Q1] Per-locale letter models and name tracing

**Today.** One letterform table: `data/tracing/letter-strokes.js` consumes `mini tools/alphabet-trace-core.js` (52 glyphs A–Z a–z, US-style print with "counter-clockwise round forms, stem-first b/p vs bowl-first d/q, single-storey school a and g", `letter-strokes.js:13-20`) and adds composed accents (Ä Ö Ü Å É È Ê Ñ … and lowercase, `:176-191`), Æ, Ø, Ç, ß (`:215-271`); unknown glyph → throw (`:38-39`). Per-locale sets: `data/tracing/letter-sets.js:14-31` (de ÄÖÜ+ß, es Ñ in position, it 21 letters, nl IJ, sv ÅÄÖ, da/no ÆØÅ, fi ÅÄÖ, pt K W Y featured, fr É È Ê). Cursive is a separate maker with vendored school scripts per locale (see cursive-Q1).

**Decision — one print model per locale FAMILY, three models in all, data not code:**

| model | locales | what differs from the current table | source |
|---|---|---|---|
| `print-us` (current) | en-US, es-MX, pt-BR | — (the "Zaner-Bloser-like" manuscript the table encodes; es/pt school print models are the same simple forms, panel-confirmed for digits already) | `alphabet-trace-core.js` |
| `print-eu` | de (Grundschrift / Druckschrift Nord), nl (blokschrift), it (stampato), fr (capitales + script d'imprimerie before cursive) | **lowercase a and g**: EU school print uses the single-storey a (already) but the *two-storey g is not used* — same; **l, t, f, q**: de Grundschrift hooks the l and t at the baseline (a small turn), q has a tick; **k**: open vs closed; **7/1** differ already in digits | a per-locale **override table**: the same 100×100 point format, only the glyphs that differ (≈ 6–10 per locale), authored from the published school models and panel-checked. Everything else inherits `print-us` |
| `print-nordic` | sv, da, no, fi | the Swedish/Norwegian school print (sv *Skolverket* reference, no *Trykkskrift*) hooks l/t/j like Grundschrift; Danish *Skrift* likewise; fi print similar | same override mechanism |

So the per-locale model = `print-us` glyphs + the locale's override file `data/tracing/overrides/<loc>.js` (glyph → strokes). This keeps ONE source of truth for the 40+ shared glyphs (the §10.4 rule the file cites, `:13-20`) and makes a locale's model a ≤ 10-glyph data file. Gate: the existing `verify-alphabet-trace-core.js` oracle (`alphabet-trace-core.js` header) runs on every override glyph; `data-lcs-model` is stamped; the native panel signs each override file (letters are the most opinion-laden content in K; the panel must see renders).

**Name tracing (any typed name):** yes — a name is a word in the locale's letter set; `letter-strokes.js` already lays words out letter by letter (advance widths, `:22-28`) with arrows derived from the stroke data (`:24-26`) and throws on an unknown glyph (`:38`), which becomes the refusal "The letter *ł* is not in the {language} alphabet". Rules: ≤ 14 letters per row (measured fit at the level's glyph height, or the name wraps to a second row — never shrinks below the age floor); capital + lowercase as typed (a name is never case-folded); hyphen and apostrophe are glyphs in the table (`-` `'`) or must be added (2 trivial strokes); diacritics limited to `COMPOSED` (`:176-191`) — a name with a letter outside (e.g. Polish ł, Turkish ş) is refused with the one sentence, because the alphabet rule of the brief says content lives in one of the 11. The row editor of the old writing app maps to the `rows` setting (ARCHITECTURE §4.2): `{kind: 'trace'|'fade'|'guided'|'empty', text}` per row — the four old row types verbatim.

### [word-writing-Q1] Matching a typed word to a library picture, all 11

**Today.** The word-tracing/write-the-word types read words only from the vocabulary joined to the theme (`G1-244:48-53` pool from `entriesFor(theme, loc)`, `lib/b2-common.js:44`), filtered by `traceable()` (`:57`) and length, with a native review exclusion list `lib/picture-word-review.js WORD_EXCLUDE` and picture refusals `lib/picture-refusals.js`. Labels come from `image-cache/resolve.js labels(noun, locale)` (`:50-55`) → `image-vocabulary.js` `[singular, plural, gender]` (header `:12-17`). The cross-theme index `lib/b3-picture-index.js pictureIndex()` maps a vocab key to every colour picture of it (BW excluded, `:9-22`).

**Rule — exact match only, against the locale's vocabulary, with these exact steps (gate 9 feeds every case):**

1. Normalise the typed word: NFC, trim, collapse inner spaces, `toLocaleLowerCase(lang)` for comparison only (de capitals are kept for printing: `displayWord` + `KEEP_CASE`, `b2-common.js:17,73`).
2. Match against **singular** forms of the locale's slice first; a hit yields the vocab key and its pictures (`pictureIndex()[key]`, colour only, never a `bw` theme — the localized BW marker rule).
3. Match against **plural** forms: a hit yields a picture **only in templates declared `pluralAware`** (singular-plural K-287 family, picture cards "one and many"); in a template that shows one picture with one word (trace "cats" under a single cat) the plural match gives **no picture** (the picture would show one, the word says many — a wrong picture by the brief's rule). The teacher may still pick a picture manually; the page then carries the "your own changes" chip.
4. Articles: "the cat" / "der Hund" / "el gato" / "en katt" are **not** matched (the typed string must be the bare noun) — the field hint says "type the word without *the*"; de nouns are matched case-insensitively so "hund" finds "Hund" but prints as the teacher typed it.
5. Homonyms inside one locale (two vocab keys with the same singular: en "bat") → the picker shows all candidates and the teacher chooses; the recipe stores the chosen `{theme, noun}`, never the word alone.
6. `WORD_EXCLUDE` and `picture-refusals.js` apply to typed words too (a typed "comet" gets no picture: the review found the picture unreadable for children).
7. No match → the word prints without a picture; a template that needs a picture refuses it ("No picture for *Fahrrad* — choose a word from the list or a template without pictures", ARCHITECTURE §7.1). **Never** fuzzy, never stemming, never cross-locale (an en word typed in a de list is simply "no picture").
8. Multi-word entries (vocab keys like `french-fries`, `ice-cream`): matched on the display form with the space ("ice cream"); for letter-box templates the space is a box gap, for grids the word is excluded (A11, per template `wordFilter`).

Own photos get the typed word as their label **only** because the teacher typed it — the page carries the chip, and syllable/phonics templates never accept the pair (phonics-Q1).

### [cursive-Q1] Trace guides, joins and ruling aligned on every OS

**Today.** `G2-377` prints every model/trace string as **one HTML text node** in exactly one vendored Playwrite unit, "shaping untouched, letter-spacing 0, no per-letter span; fs = X / xHeight" (`G2-377-cursive-writing.js:18-21`); the ruling is drawn by `primitives/school-ruling.js` from **per-em ratios** in `primitives/cursive-metrics.json` (`_measuredBy`: Chromium canvas TextMetrics over the vendored fonts; `school-ruling.js:8-16`: baseline = 6 + ascender·fs, x-line = baseline − X) — not from pixels; the units per locale are data (`data/b6/locales/cursive-writing.<loc>.json`: de de-va + de-la on lin4, fr fr-trad on seyes, es mx on doble, pt br, it it-trad, nl, da dk-uloopet, no; **sv and fi refused**, no joined school script). The raster half of `verify()` measures ink on its lines ±1 px (`:41-43`).

**Why it stays aligned in the browser:** the only quantities that place the ruling are the font's **em-relative metrics** (ascender, x-height, descender, cap) — properties of the font file, identical on every OS because the font is self-hosted woff2 (ARCHITECTURE §16). What differs per OS/browser is rasterisation (hinting, anti-aliasing, subpixel positioning), which moves ink by < 1 px, and horizontal advance rounding, which does not affect vertical alignment. Joins are glyph-internal in Playwrite (contextual alternates) — no engine draws a join, so there is nothing to misalign. The 1–2 px Linux difference the brief mentions is the *raster gate* reading, not a layout difference.

**Decisions:** (1) the raster half of `verify()` (ink-on-line ±1 px) stays **build-time only** (it needs a screenshot; one of the 4 raster verifies ARCHITECTURE §6.1 lists); live the page runs the DOM half (stamps, stack ≤ budget, one text node per chain); (2) spike S3 (ARCHITECTURE §16) includes a cursive page on Windows/mac/iPad/Chromebook and asserts the text node's `getBoundingClientRect()` top/bottom against the ruling's `data-lcs-y` lines within **1.5 px** — if iPad Safari's CoreText places the ink differently, the fix is a per-unit `yAdjust` in `cursive-metrics.json` measured on that platform, applied by `platform.fontAdjust(unit)` at mount (a data patch, never a per-browser branch in a type); (3) `font-display: block` + `document.fonts.ready` before any measurement (already the rule); (4) `font-synthesis: none` and `text-rendering: geometricPrecision` on `[data-lcs-cursive]` so no browser synthesises weight or alters shaping; (5) the *own words / own sentences in cursive* template uses the same one-text-node rule with the locale's letter set, and refuses glyphs the unit's font lacks (`document.fonts.check` + a per-unit coverage table built offline, e.g. no ß in `mx`). sv/fi stay refused (the data already says so).

### [alphabet-Q1] A picture for every letter that starts with that SOUND

**Today.** `K-317` letter-of-the-week banks are per locale with a `level: 'letter' | 'sound'` rule (hit = `word[0] === L` vs `graphemes[0] === L`, `data/b3/letter-of-the-week.js:11`) and cover only a few letters each: en **m s t b** (level letter), de m s t (sound), fr l a r t (letter), es l, pt a, it a, nl k m s p, sv m s b t l, da s m (letter), no 12 letters, fi n t (`data/b3/locales/letter-of-the-week.<loc>.json`). The approved-words pipeline (`scripts/v2-data/verify-syllable-boundaries/output/approved-words-<loc>.json`, 794–1,120 entries per locale) carries `chunks` (graphemes) everywhere and `wiktionary_ipa` for de 821 / nl 848 / sv 332 / no 131 entries, **0 for en, fr, es** — so the brief's "knife" case cannot be caught by IPA in English today. The en approved set contains 17 silent-onset words: knee, knife, knitting, pharmacist, phlox, photographer, photography, whale, wheelbarrow, wheelchair, whisk, white, whiteboard, wreath, wrench, wrist, writing (measured).

**Is the vocab good enough?** For the common letters yes (hundreds of initial words per locale); for the rare letters **no**, in every locale: en Q X Y Z (x: no library word *starts* with /ks/ or /z/ — "xylophone" starts with /z/), fr X Y W K, es K W X, pt K W Y, it J K W X Y (not in its 21-letter alphabet anyway), nl C Q X Y, sv C Q W X Z Å (initial Å: "ål" — one), da C Q W X Z Æ (initial Æ: "æble", "æg" — two), no C Q W X Z Æ Ø, fi B C D F G Q W X Z Å Ö Ä (Finnish native words rarely start with b/d/g).

**Refusal rule (structural, per letter × locale, computed at bundle time, native panel signs the exceptions):**

1. A letter is **offered** in a sound task iff the locale's approved words contain ≥ `hits + 4` items whose initial *sound* equals the letter's sound and ≥ 4 foils, after the deny rules; else the letter is greyed in the control (not offered), and the "alphabet chart" template is refused for that locale unless the chart table (3) exists.
2. **Initial-sound rule per locale**: `level:'sound'` locales use `graphemes[0]` from the approved file (de/nl/sv/no also IPA-checked where present: the first IPA segment must be in the letter's phoneme set `data/alphabet/phonemes.<loc>.json`, a 26–30-row table ×11 the panel authors). `level:'letter'` locales (en, fr, da today) add a **deny-onset list** per locale: en `kn- wr- ps- pn- gn- ph- wh- (as /w/ it is a hit for W, a foil for H) ce-/ci- (soft c is /s/) ge-/gi-/gy- (soft g) one/once/ou-` …; fr silent `h-` (heure, hibou — an H page in French is letter-only, flagged in the instruction), `ph-`, `ch-` (a digraph, excluded from C), `ou-/oi-/au-/eau-`; es silent `h-` (hora), `ch-`/`ll-` are digraphs excluded from C/L, `g+e/i` soft, `c+e/i` = /s/ in es-MX; pt silent `h-`, `ch-/lh-/nh-`, `c+e/i`, `g+e/i`; it `gn-/gl-/sc+e/i`, `c+e/i` (/tʃ/), `g+e/i`; da `hv-` (hvid: silent h), `hj-`; nl `ch-/sch-`, `ij-`; sv `sj-/skj-/stj-/sk+e,i,y,ä,ö/kj-/tj-/k+e,i,y,ä,ö` (the Swedish soft-k/sj cases), `hj-/dj-/gj-/lj-`; no `hj-/kj-/skj-/sj-/gj-/hv-`, `k/g + i,y,ei` soft; fi `ng` never initial. The list is a per-locale JSON and a panel deliverable; every entry is poisoned both ways in gate 9.
3. **Alphabet chart** (one picture per letter, every letter): a hand-curated `data/alphabet/chart.<loc>.json` {letter → vocabKey} authored and signed by the panel, with explicit **conventions per locale** for the letters rule 1 refuses (en X → "x-ray" or "box" with the x highlighted — the panel's call; da Æ → æble; sv Å → ål; fi B → banaani (a loanword, standard in Finnish ABC books)); a locale may leave a letter **empty with a reason** and the chart prints the letter alone — never a wrong-sound picture. This is the only place a "letter-level" picture is allowed for a rare letter, and the chart's instruction says "A is for…" style in the native register (not "starts with the sound").

### [phonics-Q1] Reviewed banks only, no custom words

**Yes.** Every sound claim on a page (beginning / middle / ending sound, digraph, sound boxes, blending, syllable count) is drawn from the approved-words pipeline's output through `lib/b3-common.js approvedByKey(loc)` (`:9-11, 40-43`: throws when the file or its entries are missing) or the per-sheet reviewed JSONs (`data/literacy/beginning-sounds.json`, `ending-sounds.json`, `middle-sounds.json`, `syllable-count.json`, …). A teacher-typed word has no `graphemes`, no `split`, no IPA — the maker cannot verify any phonological statement about it, so `bankPolicy: 'reviewed-only'` on every phonics template (ARCHITECTURE §7.1; the Words control is hidden and the gallery card says "reviewed words"). The one allowed own-word path is **orthographic**: templates that ask about *letters* (circle the letter in the word, count the letter, letter-level sorting into alphabet-order) may take typed words because the page's claim is about spelling, which is verifiable by code (`\p{L}` match in the locale's letter set); they are declared `own-allowed` with `claim: 'letters'` and their instruction uses the word "letter", never "sound" (gate 10 checks the instruction against the claim). Digraph templates (sh/ch/th; de sch/ch/ei/au; nl oe/ij/ui; …, the `units` in each locale's letter-of-the-week bank) are sound claims → reviewed only. The Danish K-1 strict pool (`policy_managed:false`, 402 of 794 entries — measured 392 policy_managed) applies to every da sound page (`strictPool` in `data/b3/syllable-split.js` header) — the maker reads the same flag.

### [syllables-Q1] No teacher words in syllable templates — with one safe open path

**Confirmed: never a teacher word where a split or a count is printed, implied by a layout (boxes, arcs, columns) or graded.** `data/b3/syllable-split.js:4-8`: "Words are NEVER listed here — build() joins entriesFor(theme, loc) to the phonics pipeline's approved-words file on vocabKey at render, so the split and the count always come from the gated source and never from a hand copy." The gate stack (≥ 3 sources agreeing, quarantine, the Nordic school carve-out, da policy pool) cannot run in the browser and must not be approximated (CLAUDE.md §20.7/§A.13.57). All 12 syllable templates + G1-324 syllable cards + the picture-cards "with syllables" option: `reviewed-only`, Words control hidden.

**The one safe path** (optional, F2b decides whether to add it): an *open clapping sheet* where the teacher types words and the page prints the word and the picture (if exact-matched) with an **empty** clap line — no boxes, no arcs, no count, no key, no screen; the child claps and writes the number herself; the page title says "Clap the syllables" and the footer chip says "Your own words — the sheet has no answer key". It makes no syllable claim, so it is `own-allowed` with `claim:'none'`. Everything else: refuse. Growing the banks (more words per locale) is the offline pipeline + native review, never the maker.

### [sentences-Q1] Own sentences: what is allowed

**Today** every sentence template draws from frames authored to have "exactly one natural order; no movable adverbials" (`G1-249-unscramble-sentence.js:6-8`), stored literals that are never inflected or re-ordered (`lib/sentence-bank.js:4-9`), 19–23 frames per locale (`data/b2/sentences.js`). The uniqueness of an unscramble is a **property the author guaranteed**, not something the code checks (the shuffle only avoids the canonical order and the true first word, `G1-249:130-133`).

**Rule per template kind** (no grammar oracle exists and none is allowed — "no AI in the product"):

| template | own sentence? | why |
|---|---|---|
| sentence strips / trace the sentence / copy the sentence / sentence tracing (word-writing) | **allowed** | no puzzle; the teacher's text is the content; only length/letter-set/fit refusals (gate 9) |
| fix the sentence (capital + end mark, G2-274 family) | **allowed** | the corruption is deterministic (`sentence-bank.js corrupt()`, `:8-9`) and the teacher's text is the one right answer by definition; the maker shows the restored sentence as the key; the teacher must end it with `. ? !` (else refused) |
| unscramble (G1-249 family) | **refused** | "one right order" cannot be verified; a two-order sentence is a defect (brief §1.6, A4). A warning does not make it correct |
| cloze with word bank / choose the word (G1-350/367) | **refused** | the distractors would have to be *grammatically impossible* in the gap, which only the frame author guarantees today |
| open cloze (the teacher marks one word as the gap; no bank, no options) | **allowed with the chip** | an open answer line; the key prints the teacher's word; the page says "teacher-made"; the screen version is `type-word` with the teacher's word as the one accepted answer (she may add alternatives as a comma list → `data-lcs-alts`, A4) |
| question words / match question to answer | **refused** | the highlighted-answer logic is frame-bound |

So the Sentences control for own text is present on 3 of the gallery's faces and absent on the rest; the gallery card states it. Punctuation/typography per locale is applied by the shell (fr NNBSP before `?`/`!`, es `¿…?`) from `sentence-bank.js tokenize` rules (`:32-40`) — the teacher types plain text.

### [word-search-Q1] Fillers, own letters, blocklist, no duplicate word

Answered in full in **Part 3 §A** (the engine). Summary: fillers are drawn from a **per-locale letter-frequency table** over the locale's full letter set (å ä ö æ ø ü ñ ç ß are letters in their own right — the old app's weighted strings `REFERENCE APPS/wordsearch.html:1475-1489` are the seed, re-authored per locale as `data/puzzles/letter-freq.<loc>.json` with the measured frequencies of the approved-words corpus); the grid is scanned in all 8 directions after filling against a **per-locale blocklist** (NFD-folded, native-authored, poison-tested) and any hit is refilled; a word that would appear twice (as a placed word *or* by accident in fillers) is detected by the same scan over the word list and refilled; the proof is the scan itself, run both in build and in `verify`.

### [crossword-Q1] Layout in < 1 s, failure rule

Answered in full in **Part 3 §B**. Summary: the old app's first-word-centred, shuffled-intersection greedy placement on a fixed 15×15 (`crossword.html:3728-3730`) is kept as the inner step but run as a **seeded multi-start search** (≤ 64 starts, each ≤ 1 ms for 15 words) scored by connectivity, compactness and crossing count; words that cannot cross any placed letter are **dropped and reported by name** ("*Giraffe* shares no letter with the other words — change it or remove it"); a layout is accepted only if all remaining words are connected (one component) and fit the page's cell size floor (≥ 26 px cells for G1); otherwise the maker says which word to change. Deterministic from the seed; < 100 ms measured shape.

---

## Found in ARCHITECTURE.md and the brief (for F3)

> **F3: every row below was verified against the code and resolved IN PLACE in `ARCHITECTURE.md` (marked "F3" there): batches (B1 +fractions, B3 +sorting, B7 "(8)"), `distinct-pictures.js` + `letter-strokes.js` platform rows and the `new Function` lint ban, the `controls` allowlist, the pilot note (§14.2 / §18-G → OPEN-DECISIONS #2). The G3-349 and notation rows are now code fixes (see the Part 1 header).**

| where | finding | consequence |
|---|---|---|
| ARCHITECTURE §14.3 | the batches list 58 makers: **fractions** and **sorting** appear in no batch (B1 names 9, B3 names 9 under "(8)") | Part 2 puts fractions in B1 (after place-value) and sorting in B3 (with same-different, it retires picture-sort); totals unchanged |
| ARCHITECTURE §15.1 A2 / §2.2 | `lib/distinct-pictures.js` is cited as "by construction", but it **md5-hashes picture FILES with `fs` + `crypto`** at build (`distinct-pictures.js:7,21`) — a Node-only path the §2.2 table does not list | add `platform.pictureHash(theme, noun)` → Node: md5 of the file; browser: a lookup in the per-theme slice of `data/picture-signatures.json` (718 KB today, split per theme ≈ 7 KB) |
| ARCHITECTURE §2.2 | `data/tracing/letter-strokes.js:42-45,75-83` loads `mini tools/alphabet-trace-core.js` with `fs.readFileSync` + `new Function` at module load | bundle `alphabet-trace-core.js` as a module (esbuild alias from the string path), not via `platform.readText` + eval — `lint-browser-safe` must also ban `new Function(`/`eval(` |
| ARCHITECTURE §11.1 | "`controls` come from the type's `difficulty` keys and `params`" — but `params` = `Object.keys(difficulty[2])` (`scripts/makers/extract-type-inventory.js:78`) and holds layout internals (`cols, rows, glyphH, rulingW, pic`, e.g. G1-244) | `build-templates.js` needs a **per-type allowlist** of teacher-facing params (`controls:` declared in the module, default = none); Part 2 names them per maker |
| ARCHITECTURE §14.2 pilot | "spelling retires word-scramble + word-guess" — both replacements are **new templates** (topics/spelling.md "to add"), so the pilot builds two small new engines (scramble, guess) before the chain is proven | +1 session on the pilot, or retire the two apps in B5 instead (operator choice, §"For the operator" G) |
| brief telling-time-Q1 | "the activities clock-core has it" — it has a table of 8 times (`mini tools/clock-core.js:61-82`), not an engine | a new `lib/time-words.js` is needed (above) |
| brief number-tracing-Q1 | "the 1 with a flag in de/fr/nl/Nordic; crossed 7" — the panels ruled nl/sv/no/da/fi **uncrossed** 7 and es/pt plain (`digit-strokes.js:63-77`) | answered from the code |
| brief multiplication-division-Q1 | "de/nl ':' ; fr/es/pt '÷' or ':'" — the table is sv `/` (÷ forbidden), de/it/nl/da/no/fi `:`, en/fr/es/pt `÷` (`notation.js:4-7,16-22`) | three types still bypass the table (fixes above) |
| brief position-words-Q1 | worksheet-gen prints **no** position sentence today; `lcs-grammar` is used by the old app only | the rule is adopted, not "confirmed" |
| brief §3 | "verify() … 169 types" and the §14 count 831 types: not re-measured here | — |
| G3-349 magic squares | **no uniqueness proof** (above) | content fix under the standing rule: solver + re-audit of the live decks |
| notation | `G2-211:62`, `G3-358:90`, `G3-328:20` bypass `notation.js` | mechanical fixes + gate 15 `no-foreign-sign` |


---

## Part 2 — the 60 maker cards, in the ARCHITECTURE §14 build order

Conventions. **bundles** = the type modules (by family key from `scripts/makers/topic-map.js`) and the shared code they pull in (first-level `uses` from `docs/makers/inventory/types.json`). **data ×11** = the reviewed banks the templates read, and what is missing per locale (**refuse** that template there / **author** the data in the batch / **adapt** an existing template). **controls** = the ≤ 7 visible controls: the 3 common (Level · Pictures · How many; Pictures only where `themed`) + the ≤ 4 template controls named; everything else is a *gallery card* or lives in the advanced drawer (paper · answer key · decoration). **screens** = the `emit/interactive-runtime.js:60` kinds the maker emits (`tap-order tap-choice tap-edit tap-select tap-spell tap-paint trace-path type-number type-word set-clock mark-grid`); "printable" = no screen, the student link shows the page. **keep** = old-app features (OLD-APPS.md table, OLD-APP-LESSONS §E) and where each lands. **effort** = ARCHITECTURE §14.3 rule (none 2 · little 3 · bound 4, incl. ≥ 5 new templates; +2 section-H picture engine; +1 per retired app) + the adjustment this run adds, stated.

Shared across every card and not repeated: the common libs (`templates/layouts/card-grid.js`, `templates/components*.js`, `image-cache/resolve.js`, `lib/rng.js`, `lib/page-fill.js`, `qa/lints.js`), the title/instruction strings in `i18n/strings.<loc>.json` ×11 (exist for every shipped type), name/date chrome from `page/shell.js`, decoration + ink layers (ARCHITECTURE §4.1), grayscale export (§3 rule 7), the recipe fields (§5.1).

### Pilot

#### 1. Ten Frames, Tally Marks & Quick Look (`ten-frames`) — pilot · none · 10 templates

| | |
|---|---|
| bundles | `counting-frames` (K-004, K-005, K-024, G1-105, G1-106), `tally-counting` (K-014, K-015, K-025), K-017/K-018 subitizing; `types/_shared/frame-counting.js`; primitives `ten-frame.js`, `tally.js`, `dot-figure.js`, `dice.js`, `domino.js` |
| data ×11 | none beyond strings (all 11 exist). New templates (double ten-frame, rekenrek, dice/domino quick look) need no words — a `rekenrek` primitive is new |
| controls | Level · Pictures (K-004/K-014/K-018 only) · How many · *Frame* (five / ten / double) · *Range* (to 5 / 10 / 20) · *Dots or pictures* = 6. Gallery cards: count / fill / match / tally / quick look / make 10 |
| screens | none today (all printable); add `type-number` on count/tally/make-10 and `tap-choice` on quick look (write-screen rule for the write-in boxes) |
| keep | — (no old app) |
| risks | smallest surface by design; the only risk is the pilot itself (gallery → PDF → screen chain) |
| effort | 2 (rule) |

#### 2. Counting (`counting`) — pilot · little · 14 templates · retires `find-and-count`, `find-objects`

| | |
|---|---|
| bundles | `counting-pictures` (K-002, K-006, K-007, K-011, K-012, K-013, K-016, K-028, K-029, K-030, K-031, K-059, K-060, K-070); `types/_shared/scene-count.js`, `components.js mixedScatter/chipRow/answerBox/distractorsFor`; `lib/distinct-pictures.js` (→ `platform.pictureHash`) |
| data ×11 | vocab labels only where the instruction names the theme; ordinal chips from `data/b3/ordinals.js` ×11 (K-030/031). New "count and colour the number word" needs `lib/number-words.js` (0..20 ×11 exists). No gaps |
| controls | Level · Pictures (theme chips + per-kind picker, counting-Q1) · How many (cards) · *Count range* (1–5 / 1–10 / 1–20) · *Answer* (circle / write / match — K-002/K-006/K-007 collapse into one card with this control) = 5 |
| screens | add `tap-choice` (circle), `type-number` (write, I-spy legend, K-013), `tap-order`? no — match stays printable or becomes `tap-edit`; the find-and-circle K-059/K-070 → `tap-select` |
| keep | find-and-count: grid of pictures + hidden-object questions → K-060 I spy with own pictures; letter spotting → alphabet maker (K-229/K-327, cross-link card). find-objects: I spy → K-060/K-059; odd-one-out mode → same-different maker (cross-link card); decorations → `decor` |
| risks | own-photo scenes (counting-Q1) are the first `own[]` consumer; the per-kind picker is the first picture-edit UI |
| effort | 3 (little) + 1 + 1 (two retired apps) = **5** |

#### 3. Spelling & Word Building (`spelling`) — pilot · bound · 8 templates · retires `word-scramble`, `word-guess`

| | |
|---|---|
| bundles | `word-building` (K-224, K-231; `_shared/lit-word-build.js`), `spelling-rules` (G2-315, G2-324–328; `data/b3/spelling-rules.js` + `data/b3/locales/spelling-rules.<loc>.json` ×10); `lib/spelling-rules-screen.js`; `data/literacy/build-word.json`, `word-build.json`; `lib/letter-pad.js`; `data/b2/collation.js` |
| data ×11 | spelling-rules banks exist ×11 (unit axis = the rule); build-word JSONs per locale; own words via word-writing-Q1 matching. **New engines** for the two old apps: *word scramble* (letters of one word shuffled; A10 vowel colouring per locale from `collation.js`/`letter-pad.js OWN`; the shuffle must differ from the word and from any other real word — check against the locale's approved-words + vocab list) and *word guess* (blanks per letter + picture clue; exclude-letters option). Both are own-allowed (claim: letters) |
| controls | Level · Pictures · How many · *Words* (theme / own list) · *Letter case* (small / CAPITALS) · *Clue* (picture / first letter / none) = 6 |
| screens | `tap-spell` (build the word, scramble), `type-word` (guess, missing letter), G2 rules already `type-*`/`tap-choice` |
| keep | word-scramble: custom words ✓, letter case ✓, vowel/consonant colour coding → *Colour the vowels* drawer option, no-clue mode ✓, difficulty = level; word-guess: custom words ✓, exclude letters → drawer, clues on/off ✓ |
| risks | the two new engines in the pilot (see "For the operator" G); A11 multi-word entries excluded from scramble/guess (`wordFilter: exclude`) |
| effort | 4 (bound) + 1 + 1 (retired) + 1 (two new small engines) = **7** |

### B1 — numbers

#### 4. Number Charts & Counting Sequences (`number-sequences`) — B1 · none · 27 templates

| | |
|---|---|
| bundles | `number-charts` (K-019–023, G1-123–126, G1-129–132, G2-207/208/218/226, G3-326–329), `hundreds-chart-puzzles` (G1-310, G1-347/348, G2-321–323); `_shared/number-strip.js`, `_shared/neighbors.js`; primitives `hundreds-chart.js`, `chart-fragment.js`; `lib/number-charts-screen.js`, `lib/hundreds-screen.js`; `data/b3/hundreds-chart-puzzles.js` ×11 |
| data ×11 | none missing. New: 120 chart (extend `hundreds-chart.js` rows), riddle colouring, blank chart — no words |
| controls | Level · Pictures (strips with icons) · How many (blanks) · *Start / End* · *Step* (1 2 3 4 5 10 100) · *Direction* (forward / backward) = 6; chart kind = gallery cards (strip / chart / pieces / jumps) |
| screens | `type-number` everywhere (all 27 have screens today) |
| keep | — |
| risks | the "any rule" step from the topic doc is a free number → gate 15 `min ≥ 1`; keep steps to the listed set |
| effort | 2 |

#### 5. Number Lines (`number-lines`) — B1 · none · 21 templates

| | |
|---|---|
| bundles | `number-lines` (G1-116–119, G1-138, G1-248, G1-274–281, G1-295, G2-221, G2-305/310, G3-308/310/323); `_shared/number-line-tasks.js` (reads `notation.js` ✓); primitive `number-line.js`; `lib/number-lines-screen.js` |
| data ×11 | none. New: open number line (no numbers = language-free), fraction line (shares `primitives/fraction.js`), vertical line (a `vertical` flag on `number-line.js`) |
| controls | Level · How many · *Start / End* · *Tick step* · *Labels* (all / every 5 / every 10 / ends only) · *Task* collapses into gallery cards (locate / hop / round / multiply) = 5 |
| screens | `type-number` (21/21 today); open number line → **`type-number` for the written result** (F3: the page has an answer box, so D6 requires a write screen — the drawn jumps stay the child's work; NEW-TEMPLATES 5-T1) |
| keep | — |
| risks | label density vs page width at step 1 to 120 — the type's `withLayoutFit` handles it (§6.2 step 1) |
| effort | 2 |

#### 6. Number Bonds & Fact Families (`number-bonds`) — B1 · none · 16 templates

| | |
|---|---|
| bundles | `number-bonds` (K-243, K-273–277, K-414–417), `fact-families` (G1-209, G1-219–222, G3-369 — reads `notation.js` ✓); primitives `number-bond.js`, `frame-tree.js`; `lib/number-bonds-screen.js`, `lib/fact-families-screen.js` |
| data ×11 | none. New: number triangle / Zahlenhaus (a `shape` option of `number-bond.js`), bonds to 100 in tens, make-ten bridge — numbers only |
| controls | Level · How many · *Whole* (fixed 5…20 or range) · *Missing part* (part / whole / mixed) · *Dots or numerals* · *Shape* (circle bond / house / triangle) = 6 |
| screens | `type-number` (16/16) |
| keep | — |
| risks | de/nl "Zahlenhaus / splitshuis" orientation (whole on top) differs from the US bond; make it the `shape` option, default per locale (data) |
| effort | 2 |

#### 7. Addition & Subtraction (`addition-subtraction`) — B1 · none · 25 templates · retires `addition`, `subtraction`, `math-worksheet`

| | |
|---|---|
| bundles | `picture-arithmetic` (G1-101–104, G1-112, G1-113, G1-115; `_shared/picture-equation.js`), `mental-math` (G1-208, G1-214–218; `lib/mental-math-screen.js`), `column-arithmetic` (G2-251, 255–259, G3-357, 359–363; `_shared/column-arithmetic.js`, `lib/column-screen.js`) + the new `data/column-method/methods.js` (Q1) |
| data ×11 | numbers only; the written-method table ×11 (Q1) is the one native deliverable. New: vertical facts drill (the classic 60-fact page = a `cardGrid` of `problemCard` without scaffold), three addends, mental 2-digit, error-finding (mark the wrong answers: needs `sameAs` on `(a,b)` so 2+3 ≠ 3+2 stays allowed, A1) |
| controls | Level · Pictures (picture templates only) · How many · *Operation* (+ / − / mixed) · *Range* (to 5 / 10 / 20 / 100 / 1000) · *Regrouping* (none / some / always / across zeros) · *Missing number* (answer / addend / mixed) = 7 (the cap); *Written method* only appears for de/nl/da (Q1) and takes the slot of *Missing number* on column templates (which have none) |
| screens | `type-number` (column: per-digit cells; mental: one box); picture templates: `type-number` |
| keep | addition: modes image+image / image+number / find addend / mixed → *Missing number* + gallery cards; min–max items per group → *Range*; plus sign between groups ✓; child-friendly answer box (B4, `answerBox` 2.5×). subtraction: cross out / image−number / find subtrahend ✓ (G1-103/104/115). math-worksheet: operations, min/max, easy/medium/hard → Level; **allow negative results → dropped** (K-3 ceiling; needs operator yes, §F); picture-coded puzzles → logic-puzzles code addition; numbering ✓ (`.ws-card-badge`); show answers = answer key |
| risks | the 7-control cap is hit — any further knob is a gallery card; the method table needs 11 native confirmations |
| effort | 2 (none) + 3 (retired) + 1 (method scaffolds + native table) = **6** |

#### 8. Doubles & Halves (`doubles-halves`) — B1 · none · 10 templates

| | |
|---|---|
| bundles | `doubles-halves` (G1-247, G1-270/271, G1-286–288, G1-296–299); `lib/doubles-halves-screen.js`; reads `lib/number-words.js` (grep) |
| data ×11 | none. New: near doubles (6+7 = 6+6+1) — numbers only |
| controls | Level · Pictures · How many · *Task* (doubles / halves / mixed) · *Range* (to 10 / 20) = 5 |
| screens | `type-number` (10/10) |
| keep | — |
| risks | halves only of even numbers (A16 / one answer) — already in the types; new template must declare `sameAs` |
| effort | 2 |

#### 9. Compare Numbers & Groups (`compare-numbers`) — B1 · little · 10 templates · retires `more-less`

| | |
|---|---|
| bundles | `comparing-groups` (K-008–010, G1-114; `_shared/compare-groups.js`), `comparing-numbers` (G1-135–137, G2-219/220, G3-325; `_shared/compare-order.js`) |
| data ×11 | instruction strings only. New: alligator mouth (a `<`/`>` glyph primitive with the mouth drawn — language-free), compare sums |
| controls | Level · Pictures · How many · *Compare* (pictures / numbers) · *Range* (to 10 / 100 / 1000 / 10000) · *Task* collapses to gallery cards (more-fewer-equal / symbols / order 3–4 / check-cross) = 5 |
| screens | none today → `tap-choice` (circle the group / symbol), `type-number` (order 1-2-3 = `tap-order`) — write-screen rule |
| keep | more-less: image↔image / image↔number / check-cross mode (D4: ✓/✗ buttons on the screen) → three gallery cards; symbols < > = ✓; relations ✓ |
| risks | A3: the "more" group must not always sit on one side — `settings-space` gate over the new `side` balance |
| effort | 3 + 1 (retired) = **4** |

#### 10. Odd & Even (`odd-even`) — B1 · little · 6 templates

| | |
|---|---|
| bundles | `odd-and-even` (G1-351, G1-369/370, G2-351/352, G3-386; `data/b4/odd-and-even.js` + `data/b4/locales/*` ×10) |
| data ×11 | bank ×11 exists (b4). New: odd/even colour-the-path maze → F2-art's maze engine (`lib/hm-rules.js` rule mazes) — out of this maker's build until mazes ships; name the cross-link |
| controls | Level · Pictures (G1-369/370) · How many · *Range* (to 20 / 100) · *Show* (pictures / dots / numbers) = 5; task = gallery cards |
| screens | `type-number` / `tap-choice` / `tap-select` (6/6 today) |
| keep | — |
| risks | CLAUDE.md §26 trap 2: the answer-position tell measured on G1-369/G2-348 — `settings-space` gate must run over the new range values |
| effort | 3 |

#### 11. Place Value & Rounding (`place-value`) — B1 · little · 18 templates

| | |
|---|---|
| bundles | `base-ten` (G1-120–122, G1-133, G2-203/205/206, G2-222–225, G2-227; `_shared/base-ten-tasks.js`; primitive `base-ten.js`), `rounding` (G2-346, G3-387–391; `data/b4/rounding.js` ×10) |
| data ×11 | rounding bank ×11 (b4). New: place-value chart with digit cards to cut (cut-line primitive from K-240 cut-and-paste), expanded form both ways — numbers only; **expanded form words** (de "3 Hunderter 4 Zehner 5 Einer") are strings ×11 the bank already carries for G2-224 (check at build) |
| controls | Level · How many · *Digits* (2 / 3 / 4) · *Show* (blocks / chart / expanded) · *Round to* (10 / 100) = 5 |
| screens | `type-number`, `tap-choice` (rounding has screens; base-ten G1/G2 printable today → add `type-number`) |
| keep | — |
| risks | the base-ten block art at 4 digits (thousand cube) is a new primitive case in `base-ten.js` |
| effort | 3 |

#### 12. Fractions (`fractions`) — B1 (added; ARCHITECTURE lists it in no batch) · little · 16 templates

| | |
|---|---|
| bundles | `fractions` (G2-228–234, G3-315–322, G3-343; `_shared/fraction-tasks.js`; primitive `fraction.js`; `lib/fractions-screen.js`) |
| data ×11 | fraction words only in instructions ×11 (exist). New: fraction strips/wall to cut, equal-fraction distractor sheet — shapes only |
| controls | Level · Pictures (G2-233/G3-320 sets) · How many · *Denominators* (2 3 4 6 8, multi) · *Shape* (circle / bar / rectangle / set) = 5; task = gallery cards |
| screens | `tap-paint` (shade), `tap-choice`, `type-number` (16/16 today) |
| keep | — |
| risks | thirds of a circle vs a bar — `fraction.js` must keep exact equal-area constructions (the §A.13.60 rule); never a free denominator |
| effort | 3 |

#### 13. Multiplication & Division (`multiplication-division`) — B1 · little · 33 templates

| | |
|---|---|
| bundles | `arrays-multiplication` (K-027, G1-110/111, G2-209–213, G2-216/217, G3-301/302, G3-309, G3-311–314; `_shared/array-tasks.js` ✓ notation), `multiplication-tables` (G3-358, G3-364–368, G3-402–405; `lib/times-tables-screen.js`), `division-with-remainder` (G3-377, G3-380–384; `data/b3/division-with-remainder.js` ×11; `lib/division-remainder-screen.js`); fixes to G2-211 / G3-358 / G3-328 (Q1) |
| data ×11 | remainder word ×11 ✓ (`restWord`). New: times-table grid (numbers), multiplication colour-by-number (→ color-by-number maker's engine; cross-link), division facts drill (mirror of G3-358 with `divGlyph`) |
| controls | Level · Pictures (array/group templates) · How many · *Tables* (multi-select 1–10 chips) · *Operation* (× / ÷ / mixed) · *Model* (groups / arrays / hops / facts) · *Remainders* (never / sometimes / always) = 7 |
| screens | `type-number` (33/33) |
| keep | — |
| risks | the per-locale sign gate (Q1) must land before the first new template; long division is **not** offered (no primitive) |
| effort | 3 |

### B2 — measure & shapes

#### 14. Money (`money`) — B2 · little · 14 templates

| | |
|---|---|
| bundles | `money` (G1-211, G1-228–232, G2-276, G2-289–295); `data/money/currencies.js`; primitive `coins.js`; `data/b2/shop-frames.js` ×11; `lib/money-screen.js`; new `lib/money-format.js` (Q1) |
| data ×11 | currency sets ×11 ✓ (es-MX pesos, pt-BR centavos); shop frames ×11 ✓. New: make the amount (draw coins), fewest coins, price tags to cut — the formatter table ×11 and the **notes** list per currency are the native deliverables |
| controls | Level · Pictures (shop templates) · How many · *Coins / Coins + notes* · *Up to* (subMax / 1 unit / 5 / 10 / 20 whole units) · task = gallery cards (count / compare / shop / change / make / fewest) = 5 |
| screens | `type-number` (14/14) |
| keep | — |
| risks | decimals appear for the first time (G2 "up to 20 €"): the formatter must be panel-confirmed before the control exposes amounts ≥ 1 whole unit; never realistic coins (Q1) |
| effort | 3 + 1 (formatter + notes, native) = **4** |

#### 15. Telling Time (`telling-time`) — B2 · little · 15 templates

| | |
|---|---|
| bundles | `telling-time` (G1-148–150, G1-212, G1-233–237, G2-249/250, G3-344, G3-354–356; `_shared/clock-tasks.js`; primitive `clock.js`; `emit/interactive-set-clock.js`); new `lib/time-words.js` (Q1) seeded from `mini tools/clock-core.js timeExpr` |
| data ×11 | digital times are language-free ✓; **worded times: 8 canonical rows ×11 exist; the 12-slot frames ×11 must be authored** (Q1) → the "written times" template is refused per locale until signed; daily routine timeline needs routine words ×11 (new strings, ~12) |
| controls | Level · How many · *Time to* (hour / half / quarter / 5 min / minute) · *Clock* (analog / digital / both) · *Clock face* (numbers / ticks / minute numbers) · *12 h / 24 h* (hidden for en-US L1) = 6; task = gallery cards |
| screens | `set-clock` (draw hands), `tap-choice` (read), `type-number` (elapsed) — 15/15 today |
| keep | — |
| risks | time idioms are the most locale-divergent text in the catalogue; the 8 fixture rows are the regression; never derive a worded time by string concatenation outside `time-words.js` |
| effort | 3 + 1 (time-words ×11) = **4** |

#### 16. Measurement & Size (`measurement`) — B2 · little · 20 templates · retires `big-small`

| | |
|---|---|
| bundles | `comparing-sizes` (K-032–040, K-079; `_shared/size-compare.js`), `measurement` (G1-139/140, G2-235/236, G2-252, G2-260–263, G3-345/346; `_shared/measurement-tasks.js`; primitives `ruler.js`, `jug.js`, `balance.js`, `thermometer.js`, `unit-cubes.js`; `image-cache/silhouette.js artExtentSync` + `data/art-extents.json`); `lib/measurement-screen.js`; `lib/mass-rank.js`, `data/light-objects.js` (heavier) |
| data ×11 | metric ×11 ✓; **en-US customary** (Q1): `ruler.js unit:'in'`, `thermometer.js unitLabel '°F'`, unit strings en only; `data/mass-rank` heavier/lighter facts are language-free. New: boxed 6-row size order (`size-compare.js` layout option), paper-clip units (non-standard = `unit-cubes.js` with a clip icon), ruler to cut |
| controls | Level · Pictures · How many · *Attribute* (size / height / length / weight / capacity / temperature → actually gallery rows) · *Units* (en-US only: inches / cm) · *Compare or order* = 5 |
| screens | `tap-choice` (K-038, compare), `type-number` (measure, jugs, scales, thermometer), `tap-order` (order) |
| keep | big-small: identical vs different pictures → *Same picture / different pictures* drawer option (`size-compare.js` same-noun default); big/medium/small ✓ (K-033); ascending/descending ✓ (K-034/036 + a flag); images per exercise → *How many*; numbers (write 1..N) ✓ |
| risks | print scale honesty for inch rulers (footer check square); B6 common baseline — `size-compare.js` already aligns ("baseline-aligned so the size relation reads truthfully") |
| effort | 3 + 1 (retired) + 1 (customary primitives) = **5** |

#### 17. Graphs & Data (`graphs-data`) — B2 · little · 14 templates · retires `chart-count`

| | |
|---|---|
| bundles | `graphing-data` (G1-141–144, G1-146/147, G2-237–240, G3-332–335; `_shared/graph-tasks.js`; primitives `bar-graph.js`, `pictograph.js`, `line-plot.js`, `tally.js`; `lib/graph-screen.js`) |
| data ×11 | category labels = vocab plurals ✓ (A6: plural from vocab, never suffixed). New: class survey blank graph (teacher types category words → exact-match pictures or words only), count the scene then graph (= `scene-count` + `bar-graph`) |
| controls | Level · Pictures · How many (categories 2–5) · *Graph* (pictograph / bar / tally / line plot) · *Scale* (1 / 2 / 5 / 10) · *Task* (read / build / answer) = 6 |
| screens | `type-number`, `tap-paint` (colour the bars), `tap-choice` (14/14) |
| keep | chart-count: count the pictures, fill the bar chart → G1-147 + the new scene→graph template |
| risks | A3 on "most/least" questions — the gate over the `scale` values |
| effort | 3 + 1 (retired) = **4** |

#### 18. Shapes & Geometry (`shapes-geometry`) — B2 · little · 22 templates

| | |
|---|---|
| bundles | `geometry` (K-075/076, G2-241–248, G3-337–342; `_shared/geometry-tasks.js`; primitive `flat-shape.js`; `lib/geometry-screen.js`), `2d-shapes` (K-368, K-371/372, G1-381–383; `data/b5/2d-shapes*` ×10; `lib/2d-shapes-screen.js`); `data/geometry-words.js`, `lib/shape-data.js` |
| data ×11 | shape names ×11 ✓ (geometry-words); 2d-shapes bank ×11 ✓ (b5). New: shape hunt in a picture (library art tagged with its shapes — a small reviewed table `data/shape-in-picture.json`, author), rectangles of given area on grid paper (numbers), 3D nets to cut (new `net.js` primitive, language-free) |
| controls | Level · Pictures (K-371, G2-243) · How many · *Shapes* (multi-select chips) · *2D / 3D* · *Turned and stretched* (on/off) = 6; task = gallery cards |
| screens | `tap-choice`, `type-number`, `tap-select` (21/22; K-372 draw-on-dots printable) |
| keep | — |
| risks | A4 "squares are rectangles" — the classify template's accepted-set logic exists (G3-340); keep `data-lcs-alts` |
| effort | 3 |

#### 19. Patterns (`patterns`) — B2 · none · 9 templates · retires `pattern-train`, `pattern-worksheet`

| | |
|---|---|
| bundles | `patterns` (K-046–050, K-052/053, K-077, G1-155; `_shared/pattern-next.js`) |
| data ×11 | none. New: number patterns (numbers), make-your-own blank train (train art slots: B9 measured offsets, `data/art-extents.json` precedent), pattern train to cut |
| controls | Level · Pictures · How many · *Pattern* (AB / ABB / ABC / AABB / growing) · *By* (picture / colour / size / shape / number) · *Answer* (circle options / fill blank / mixed) = 6 |
| screens | none today → `tap-choice` (options) and `tap-edit`/`tap-select` for "all blank" (D6: a blank-box page gets a pick-from-palette screen, the Family F pattern) |
| keep | pattern-train: AB/AAB/ABB/ABC/AABB ✓ + train art; clue count → *How many*; pattern-worksheet: pattern types ✓, blank box or options or mixed → *Answer* |
| risks | A3: the correct option position balanced — gate 8 |
| effort | 2 + 2 (retired) = **4** |

#### 20. Number Tracing (`number-tracing`) — B2 · none · 6 templates

| | |
|---|---|
| bundles | `number-tracing` (K-237, K-249–253); `data/tracing/digit-strokes.js` (3 forms, `FORM_BY_LOCALE`); primitive `trace-path.js`; new: `lib/number-words.js` + `letter-strokes.js` for "trace the number word" |
| data ×11 | digit forms ×11 ✓; number words to 20 ×11 ✓. New: tracing with counting pictures beside (vocab-free), trace the number word (word strokes need the locale's letter model — letter-tracing-Q1 override files; en ready now) |
| controls | Level · Pictures (new picture template) · *Numbers* (chips 0–20, multi) · *Rows* (trace / trace + write) · *Size* (large / standard) · *Arrows and dots* (on/off) = 6 |
| screens | printable (K-252/253 use raster verify → build-time only) |
| keep | — |
| risks | none; the raster verify stays build-time (ARCHITECTURE §6.1) |
| effort | 2 |

#### 21. Symmetry & Grid Copy (`symmetry-grids`) — B2 · none · 10 templates · retires `draw-and-color`

| | |
|---|---|
| bundles | `grid-copy` (K-286, K-298–300; primitive `grid-copy.js`; `data/b2/figures.js` pixel figures), `symmetry` (G2-253, G2-264–268; primitive `sym-grid.js`; `data/symmetry*`); new face: `templates/components-b7/how-to-draw.js htdGrid` over htd lessons (Q1) |
| data ×11 | language-free. Pixel figures: 4 per size (6/7/8) — **thin**: the maker's "New version" would repeat within 4 presses → author ≥ 12 figures per size (offline, the asymmetry gate of K-286 `:5-8`) in the batch; the art-grid face waits for F2-art's lesson format |
| controls | Level · How many · *Grid* (6 / 7 / 8 / 10) · *Axis* (vertical / horizontal / both) · *Labels* (A-H / 1-8 on/off) · *Picture* (pixel figure / drawing) = 6 |
| screens | printable today → `tap-paint` on the empty grid (cells as regions) for pixel copies |
| keep | draw-and-color: picture on a grid to copy ✓ (htd grid face), mirror clue horizontal/vertical ✓, part reveal → Level (fraction of cells given), clue cells ✓ |
| risks | figure pool depth (above); the drawing face depends on F2-art |
| effort | 2 + 1 (retired) + 1 (figure authoring) = **4** |

### S6 — the picture-engine spike slot (ARCHITECTURE §17.4) — 3 sessions, F2-art's measurements

### B3 — picture engines and visual makers

#### 22. Logic & Math Puzzles (`logic-puzzles`) — B3 · little · 20 templates · retires `sudoku`, `math-puzzle`, `code-addition`

| | |
|---|---|
| bundles | `visual-logic` (K-068, G1-157, G1-158, G3-348–351, G3-353), `number-walls` (G1-246, G1-266–268, G1-289, G2-313; primitive `number-wall.js`), `logic-puzzles` (G1-349, G2-319, G2-344/345, G3-378/379; primitive `logic-grid.js`; `data/b3/logic-puzzles.js` ×11); G3-349 **gains a solver** (Q1) |
| data ×11 | logic-puzzle names/frames ×11 ✓. New: code addition (chain construction, Q1), number sudoku 4×4/6×6 (same engines, numerals), KenKen-style cages (needs its own `countSolutions`; G2-3) |
| controls | Level · Pictures · How many · *Puzzle size* (4×4 / 6×6; 3×3 / 4×4 grids) · *Pictures or numbers* · *Clues given* (more / fewer, maps onto `clues`) = 6; puzzle kind = gallery cards |
| screens | `type-number` (walls, magic, balance), `mark-grid` (logic grids), sudoku → `tap-edit` with a picture palette (new wiring, the runtime kind exists) |
| keep | sudoku: picture sudoku ✓, easy/medium/hard = Level, blanks = *Clues given*; math-puzzle: picture grid with row/column sums (the old app's `generateData` `math-puzzle.html:3119-3147` builds N distinct numbers 2..N+1 and one equation per cell — a **cut-and-rebuild picture puzzle**, which is a `same-different` jigsaw with arithmetic labels; keep as a new template *solve to rebuild the picture*: pieces are library art tiles labelled with answers, placed on a grid of equations — pure arithmetic + tile shuffle, uniqueness by distinct answers); code-addition: pictures stand for numbers ✓, addends per question ✓, secret word reveal ✓ (letters only from the locale alphabet, A10) |
| risks | G3-349 live-deck re-audit (standing rule); code-addition secret word is an own word → letters-only claim, exact letter set |
| effort | 3 + 3 (retired) = **6** |

#### 23. Same & Different, Shadows & Pairs (`same-different`) — B3 · none · 11 templates · retires `odd-one-out`, `shadow-match`, `missing-pieces`, `grid-match`, `matching`

| | |
|---|---|
| bundles | `visual-discrimination` (K-039, K-043/044, K-061–063, K-080; `_shared/odd-one-out.js`), `visual-matching` (K-057/058, K-069, K-078; `image-cache/silhouette.js` → canvas alpha in the browser (Q1); `data/picture-signatures.json`) |
| data ×11 | language-free except K-225-style word matching (→ picture-cards). New: missing piece of the picture (grid-match / missing-pieces: a tile cut of library art = CSS `background-position` crops of the 512 px picture — B8: crop in the drawn image's space), match the close-up (K-069 generalised). *matching* old app: image–word / image–image / beginning letter / custom word / left-vs-right language → image–image here; image–word + bilingual → picture-cards (K-225, K-350); beginning letter → phonics |
| controls | Level · Pictures (theme A / theme B for odd-one-out) · How many · *Distractors* (very different / similar / same kind) · *Piece shape* (circle / ellipse / rectangle / square, missing-pieces) · *Cut* (2×2 … 4×4 / horizontal / vertical) = 6 |
| screens | none today → `tap-choice` (odd one, closure, mirror), `tap-select` (spot the difference), `tap-edit` with palette (place the pieces — Family F deferred feedback D1), `tap-order` for pairs (draw a line = tap A then B, the Family E pattern) |
| keep | odd-one-out: identical vs similar → *Distractors*, two themes ✓, 5–10 exercises → *How many*; shadow-match: shadow / make-whole ✓, cut direction ✓; missing-pieces: piece shape ✓, missing count → Level, solution options ✓; grid-match: picture cut into a grid, header ✓; matching: bullets → drawer |
| risks | five retirements in one maker = the longest feature-mapping; own photos only whole (Q1); A17 density (K-043 with the whole theme: `cardFill` + collision gate) |
| effort | 2 + 5 (retired) = **7** |

#### 24. Sorting & Categories (`sorting`) — B3 (added; ARCHITECTURE lists it in no batch) · little · 11 templates · retires `picture-sort`

| | |
|---|---|
| bundles | `sorting-categories` (K-042, K-240, K-264, G1-160; `_shared/sort-to-bins.js`), `science-sort`/`science-match` non-science survivors (K-203, K-206, K-210, K-212, K-213, G1-207; `_shared/science-category-sort.js`, `science-pair-match.js`), K-235 (`data/literacy/category-vocab.json` ×11); `cutting-practice` (none in scope today); `mini tools/object-attributes.json` reviewed slice (Q1); primitive `bin.js` |
| data ×11 | bin labels ×11 ✓ (category-vocab); attribute labels ×11 **author** (6 attributes × 2–3 values ≈ 15 strings); own labels = teacher text. New: sort by own two labels (teacher assigns), Venn sort (G3-353 exists in logic — reuse `venn-sort`) |
| controls | Level · Pictures · How many (per bin) · *Bins* (2 / 3 / 4) · *Sort by* (kind / named category / attribute / my labels) · *Answer* (draw lines / cut and paste / write) = 6 |
| screens | none today → `tap-select` strict scoring per bin (A14) |
| keep | picture-sort: left/right category themes ✓ (kind sort with two themes), auto generation ✓, Custom Words → *my labels* with the teacher's assignment, editable category labels ✓ (`edits[op:'word']` on bin labels) |
| risks | the 456/933 review boundary is enforced by the bundle slice, not by code at run time — re-bundle when the review grows. **F3: the file has no per-key `reviewed` flag (only a count), so tier 3 cannot be built until the review state is recorded per key — see [sorting-Q1]; tier 1/2 and "my labels" are unaffected** |
| effort | 3 + 1 (retired) = **4** |

#### 25. Dot to Dot (`dot-to-dot`) — B3 · little · 10 templates · **F2-art**

| | |
|---|---|
| bundles | `dot-to-dot` (K-285, K-294–296, K-308/309, G1-285, G1-294, G2-304, G2-314); `data/d2d/` 30 MB raw = **4.3 MB gz, 10 KB per scene (F3, per ENGINES-ART §1.1)** precomputed figures; primitives `dot-figure.js`, `scene-dot-figure.js` |
| data ×11 | figures language-free; the ABC face uses `data/b2/collation.js` alphabets (å ä ö / æ ø å after z) — the new "alphabet of the chosen language" template is a data switch. Sums face: numbers |
| controls | Level · *Picture* (figure picker) · *Sequence* (1–10 / 1–20 / 11–30 / back / by 2 / 5 / 10 / letters) · *Dots* (how many) = 4 |
| screens | `tap-order` (tap the dots in order; the kind exists, new wiring — ENGINES-ART §4.2) |
| keep | — |
| risks | F2-art: the alphabet yield (29 letters → 5 scenes today, ENGINES-ART §4.3 / operator E); the precomputed placeability index replaces a 200-file run-time scan |
| effort | 3 + 2 (section H) = **5** (unchanged by ENGINES-ART) |

#### 26. Color by Number & Code (`color-by-number`) — B3 · little · 8 templates · **F2-art**

| | |
|---|---|
| bundles | `color-by-number` (K-241, K-265–269, K-393/394); `data/cbn/` 47 MB regions + keys; `lib/cbn-render.js`, `cbn-type.js`, `cbn-lineart.js` (offline); `tap-paint` screen reads `path[data-lcs-region]` |
| data ×11 | colour words ×11 (`data/color-words.js`) ✓; sight-word / letter-sound keys need the sight-words and letter-of-the-week banks (exist) |
| controls | Level · *Picture* · *Key* (numbers / sums / differences / shapes / letters / words) · *Range* (arithmetic keys) = 4 — **F3: *Colours* is NOT a knob; the colour count is the design's level (`LEVEL_CAPS`, `lib/cbn-render.js:31`; `cbn-type.js:96` refuses a design at another level), per ENGINES-ART §5** |
| screens | `tap-paint` (K-393/394 today) |
| keep | — |
| risks | code keys (sums/differences/×) fit only ≈ 20 of 200 designs (`r ≥ 15` units — ENGINES-ART §5.1); a wider set needs offline review (operator F); own photos refused |
| effort | 3 + 2 + 1 (code keys on art + the live labeller path) = **6** (F3: per ENGINES-ART) |

#### 27. Coloring Pages (`coloring-pages`) — B3 · little · 0 templates · retires `coloring` · **photo→line-art question is F2-art's**

| | |
|---|---|
| bundles | none today. Engine: **Part 3 §E** — a BW-library page composer (1 / 2 / 4 pictures from the 50 `bw` themes, 1,325 nouns measured in `cache/manifest.json`; the localized BW-marker rule), caption word from vocab, trace-the-word lane (`primitives/trace-path.js`), the shell's `ink` layer for the brush (ARCHITECTURE §4.2) |
| data ×11 | vocab captions ×11 ✓; own key (teacher writes the key) is teacher text |
| controls | Level · *Pictures* (BW picker, 1–4) · *Layout* (1 big / 2 / 4) · *Caption* (none / word / trace the word) · *Lines for writing* (on/off) = 5 |
| screens | `tap-paint` only for pictures that have cbn regions (F2-art); otherwise printable |
| keep | coloring: brush tools ✓ (`ink`), flip → a `mirror` flag on the picture slot (horizontal only, art without text), handwriting lines ✓, name field ✓ (chrome) |
| risks | never mix BW and colour (gate); own photos "as is" only unless F2-art proves otherwise |
| effort | 3 + 1 (retired) + 1 (new composer) = **5** |

#### 28. Mazes (`mazes`) — B3 · little · 24 templates · retires `picture-path` · **F2-art**

| | |
|---|---|
| bundles | `mazes` (K-242, K-270–272; `lib/maze.js` grid mazes), `maze-puzzles` (K-405–413, G1-420–428, G2-392/393; `lib/hm-*.js`, `data/hm`, `hmx`; raster oracle `hm-verify.js`) |
| data ×11 | rule-maze banks (letters/numbers/sounds) ×11 via `data/hmx/text/<loc>.js` (an explicit index per ARCHITECTURE §2.2); **F3: `hm/pins.json` — pinned fast seeds per (scene, level[, locale]), because the hand-made generator is a retry search measured at 0.4–30 s per page (ENGINES-ART §8.2); grid mazes stay live** |
| controls | Level · Pictures (start / goal) · *Maze* (grid / scene / rule) · *Scene* · *Rule* (letters / numbers / sums / sounds) = 5 (size = the Level presets, never a free knob) |
| screens | `trace-path` (all maze-puzzles; grid mazes gain it over the cell graph) |
| keep | picture-path: grid path through pictures, collectibles, distractors, end picture, copies min–max, game modes → "step only on pictures of a kind" rule maze (new template) |
| risks | the retry tail (settled by pins); label faces × 11 pins; the oracle port (class B) must be poisoned with `hm-scene-poison.js`'s five cases |
| effort | 3 + 2 + 1 (retired) + 1 (pins + oracle port) = **7** (F3: per ENGINES-ART) |

#### 29. Find the Differences (`find-the-differences`) — B3 · little · 11 templates · **F2-art**

| | |
|---|---|
| bundles | `find-the-differences` (K-395, K-397–400, G1-412–415, G2-388/389); `data/fd/` 427 MB scenes; `lib/fd-*.js`; `fd-browser-diff.js` (canvas, in-page) |
| data ×11 | change-word strips ×11 (G1-414, G2-389) in the b7 banks ✓ |
| controls | Level · *Scene* · *Differences* (3 / 5 / 7 / 10) · *Colour / B&W* · *Kinds of change* = 5 |
| screens | `tap-select` (tap the differences) |
| keep | — |
| risks | F2-art: shipped scenes, per-scene size, live diff gate |
| effort | 3 + 2 = **5** |

#### 30. How to Draw (`how-to-draw`) — B3 · little · 11 templates · **F2-art**

| | |
|---|---|
| bundles | `how-to-draw` (K-396, K-401–404, G1-416–419, G2-390/391); `data/htd` 53 MB, `htdx` 127 MB, `htdv` 23 vector lessons; `lib/htd-steps.js`, `htd-vector.js`; `templates/components-b7/how-to-draw.js` |
| data ×11 | `{L}` article+noun tokens ×11 from the b7 bank ✓; sentence starters ×11 (G2-390) ✓ |
| controls | Level · *Picture* · *Steps* (4–6, only the counts built AND read per lesson) · *Hide a step* (finish face; only steps with a shipped `keep` variant) = 3–4; task = gallery cards. **F3: free toggle/reorder is NOT offered — toggle = a shipped `keep` lookup, reorder = inner steps only, gated live by the greyscale law (ENGINES-ART §6.1, operator H)** |
| screens | printable |
| keep | — |
| risks | the "editable layers" expectation vs the structural rule; htdx file size without the `keep` split; own image refused |
| effort | 3 + 2 + 1 (layer toggle/reorder with its live greyscale gate) = **6** (F3: per ENGINES-ART) |

#### 31. Picture Tracing (`picture-tracing`) — B3 (moved from B4) · little · 20 templates · **F2-art**

| | |
|---|---|
| bundles | `picture-tracing` (K-418–432, G1-429–433); `data/pt`, `ptx` (~1 MB scenes); `lib/pt-*.js`. **F3: the tracer runs LIVE at build today (`lib/pt-scene.js:24-28 traceOf`, 0.13–0.34 s per drawing) and `data/pt` holds no traces; the maker needs the NEW trace store `pt/<theme>/<noun>.json` for the 1,302 traceable drawings (≈ 13 MB gz, built offline by `tools/pt-trace-all.js`, ENGINES-ART §7.2)**; `pt-verify.js` (sharp) stays offline for the store |
| data ×11 | the word face (G1-430) uses vocab ✓ |
| controls | Level · *Picture / scene* · *Line* (dashed / dotted) · *Thickness* (by age) = 4 |
| screens | printable |
| keep | — |
| risks | the trace store is new (build + contact-sheet review ≈ 1 session); the composer's dash alignment must stay byte-identical (gate 3 on the 220 published) |
| effort | 3 + 2 + 1 (trace store + the canvas law port for the gate suite) = **6** (F3: per ENGINES-ART) |

### B4 — writing

#### 32. Pencil Control Lines (`pre-writing`) — B4 · none · 9 templates · retires `drawing-lines`

| | |
|---|---|
| bundles | `pre-writing` (K-236, K-244–248, K-385–387); primitive `trace-path.js` (strokes), `scene-dot-figure.js` |
| data ×11 | language-free. New: cutting lines (a `cut-line` dashed primitive + scissors glyph), trace the path in a scene (→ picture-tracing's scenes, cross-link) |
| controls | Level · Pictures (picture-to-picture) · How many (rows) · *Strokes* (multi-select: straight / zigzag / waves / loops / spirals / shapes) · *Line* (width · fade) = 5 |
| screens | printable (a `trace-path` screen is possible on picture-to-picture: the path is declared — optional) |
| keep | drawing-lines: templates between picture pairs ✓ (K-387), auto-fill pictures ✓ |
| risks | none |
| effort | 2 + 1 = **3** |

#### 33. Letter Tracing (`letter-tracing`) — B4 · bound · 12 templates · retires `writing` (with word-writing)

| | |
|---|---|
| bundles | `letter-tracing` (K-238, K-254–258), `lowercase-letter-tracing` (K-278–283); `data/tracing/letter-sets.js`, `letter-strokes.js` (+ `mini tools/alphabet-trace-core.js` bundled as a module), new `data/tracing/overrides/<loc>.js` (Q1); primitive `trace-path.js` |
| data ×11 | letter sets ×11 ✓; **per-locale print models**: `print-us` ready (en, es, pt); `print-eu` overrides for de/fr/it/nl and `print-nordic` for sv/da/no/fi are **native-panel deliverables** (≈ 6–10 glyphs each) — until signed, those locales render `print-us` **only if the panel accepts it as a valid Druckschrift**; otherwise refuse the maker in that locale (gate 2 `refused`). New: letter + picture that starts with it (→ alphabet-Q1 refusal rule), name tracing (Q1) |
| controls | Level · *Letters* (chips of the locale alphabet, multi) · *Case* (capital / small / both) · *Rows* (the row editor: trace / fade / guided / empty) · *Arrows and dots* · *Name* (text field, name tracing card) = 6 |
| screens | printable (tracing); a `trace-path` letter screen exists in the activity — not reused (0-line rule) |
| keep | writing: row editor ✓ (`settings.rows`), per-row type trace / fading / guided copy / empty ✓, print / print with arrows ✓, cursive → cursive maker, zigzag and line strokes → pre-writing, beginning-letter rows (letter + word) ✓, custom text ✓ |
| risks | the glyph override files are opinion-laden; render review per locale is mandatory (gate 10 sees renders) |
| effort | 4 + 0.5 (shared retirement) + 1 (override files ×10, native) = **6** (rounded) |

#### 34. Word Tracing & Writing (`word-writing`) — B4 · bound · 15 templates · retires `writing` (with letter-tracing)

| | |
|---|---|
| bundles | `word-tracing` (K-284, K-289–291, K-310/311, K-315), `write-the-word` (G1-244, G1-258–260, G1-291, G1-301, G1-303/304); `lib/b2-common.js` (vocab, displayWord, traceable), `lib/picture-word-review.js`, `lib/picture-refusals.js`, `lib/b3-picture-index.js`, `data/b2/collation.js`, `primitives/bankword-width.js` (measured widths), `trace-path.js`, `letter-strokes.js` |
| data ×11 | vocab ×11 ✓ (997 distinct keys with pictures measured); exact-match rule (Q1). New: own-sentence tracing (sentences-Q1: allowed), look-cover-write-check spelling list (own words, letters claim) |
| controls | Level · Pictures · How many · *Words* (theme / my list) · *Task* (trace / copy / write with bank / letter boxes / first letter → collapses to gallery cards; keep one *Help* control: bank / first letter / boxes / none) · *Case* (small / CAPITALS) · *Repeats* (1 / 2 / 3) = 6 |
| screens | printable today → `type-word` for write-the-word (D6), with `letter-pad.js` keys ×11 |
| keep | writing (shared): custom text ✓, row types ✓ |
| risks | the typed-word → picture match is the first `words[]` consumer with pictures; A11 multi-word entries; de capitalisation preserved |
| effort | 4 + 0.5 = **5** (rounded) |

#### 35. Cursive Handwriting (`cursive`) — B4 · bound · 6 templates

| | |
|---|---|
| bundles | `cursive-writing` (G2-377, G2-384–387, G3-401); `primitives/school-ruling.js`, `cursive-metrics.json`, `assets/fonts/cursive-fonts.css` (15 vendored Playwrite units), `data/b6/cursive-writing.js` + `locales/*.json` (9 locales; sv/fi refused) |
| data ×11 | 9 locales ✓, sv + fi **refused by data** (no joined school script) — the maker shows the gallery in 9 locales only. New: own words/sentences in cursive (one text node per chain; font-coverage refusal) |
| controls | Level · *Script* (de: VA / LA; it: it-trad / it-moderna if shipped; others fixed) · *Content* (letters / joins / words / sentences / names → gallery cards) · *Rows* (trace + copy counts) · *Words* (my list) = 4–5 |
| screens | printable |
| keep | — |
| risks | cross-OS ink placement (Q1 spike S3 cursive page; `yAdjust` data patch); the raster verify stays build-time |
| effort | 4 + 1 (spike + coverage table) = **5** |

#### 36. Tangram (`tangram`) — B4 · none · 6 templates

| | |
|---|---|
| bundles | `tangram` (K-353, K-358/359, G1-354/355, G2-347); primitive `tangram.js`; `data/b4/tangram.js`, `tangram-figures.js` |
| data ×11 | language-free (piece legend colours ×11 from `color-words.js`). New: make-your-own blank board |
| controls | Level · *Figure* (picker) · *Pieces* (coloured / plain) · *Task* = gallery cards = 3 |
| screens | printable (a `tap-edit` build screen would need rotation — out of scope) |
| keep | — |
| risks | G2-347 "turned or flipped ones do not match" — the figure data must keep orientation flags |
| effort | 2 |

### B5 — literacy A

#### 37. Alphabet & Letters (`alphabet`) — B5 · bound · 14 templates · retires `alphabet-train`

| | |
|---|---|
| bundles | `letter-knowledge` (K-222/223, K-229/230; `_shared/lit-letter-knowledge.js`; `data/literacy/letter-knowledge.json`), `letter-of-the-week` (K-317, K-325–328, G1-311; `data/b3/letter-of-the-week.js` + locales ×10), `alphabetical-order` (G1-245, G1-262–264; `data/b2/collation.js`); the refusal tables of alphabet-Q1 (`data/alphabet/phonemes.<loc>.json`, deny-onset lists, `chart.<loc>.json`) |
| data ×11 | letter-of-the-week covers 1–12 letters per locale → the *letter* control offers only letters with enough reviewed items (Q1); the alphabet chart needs the ×11 chart tables (author, native panel); the train template (old app) = letter → picture assignment with the same refusal rule, letter-hint mode = a control |
| controls | Level · Pictures (where pictures appear) · How many · *Letter / letters* (chips, greyed where refused) · *Case* (capital / small / both) · *Hints* (letter hints on/off, A13 explicit mode) = 6 |
| screens | `tap-order` / `type-word` (G1-245 family today); letter hunt → `tap-select` |
| keep | alphabet-train: train template ✓ (art with measured slots, B9), letter→picture assignment ✓, letter-hint mode ✓, number of clues → *How many* |
| risks | the rare-letter problem (Q1) — gallery honesty: the chart card says which letters are empty |
| effort | 4 + 1 (retired) + 1 (phoneme/deny/chart tables ×11) = **6** |

#### 38. Phonics & Sounds (`phonics`) — B5 · bound · 18 templates

| | |
|---|---|
| bundles | `beginning-sounds` (K-221, K-228; `_shared/lit-sound-match.js`), `phonological-awareness` (K-226/227, K-233/234; `data/literacy/*-sounds.json`, `syllable-count.json`, `syllable-sort.json`), `sound-boxes` (K-318, K-329/330, G1-312–314; `data/b3/sound-boxes.js` + locales ×10; `lib/sound-boxes.js`), `digraphs` (K-378, G1-380, G1-392–394, G2-372; `data/b5/digraphs*` — **refused whole-family in es/it/sv/da/no, F4 pt + nl** per CLAUDE.md §27) |
| data ×11 | approved words ×11 ✓ (794–1,120); digraph refusals as above (the gallery hides them per locale); `reviewed-only` everywhere (phonics-Q1). New: clip cards to cut (same banks), blends per language (needs per-locale blend tables — author with the panel; en bl/st/tr…, de bl/br/kn/schw…, es bl/br/cl…, pt br/cr/fl…, Nordic sk/st/str…) |
| controls | Level · Pictures · How many · *Sound* (beginning / middle / ending → gallery cards) · *Letters or teams* (chips) · *Pictures only / with words* = 5 |
| screens | `type-word`/`tap-choice` (sound boxes family), `tap-select` (sort) |
| keep | — (matching's "beginning letter" mode lands here as K-228) |
| risks | da strict pool; en IPA absence (letter-level deny lists only) |
| effort | 4 + 0.5 (blend tables) = **5** (rounded) |

#### 39. Rhyming Words (`rhyming`) — B5 · bound · 7 templates

| | |
|---|---|
| bundles | `rhyming-words` (K-352, G1-309, G1-343–346; `data/b3/rhyming-words.js` + locales ×10), K-232 (`data/literacy/rhyming-pairs.json`); `lib/rhyming-words-screen.js` |
| data ×11 | banks ×11 ✓; `reviewed-only` (a rhyme is a sound claim). New: rhyme memory cards (same pairs) |
| controls | Level · Pictures · How many · *Pictures or words* = 4; task = gallery cards |
| screens | `tap-choice` / `type-word` (6/7) |
| keep | — |
| risks | the Rhyming Words episode (CLAUDE.md #1 rule) — ONE reviewer over the compact dump, never a fan-out |
| effort | 4 |

#### 40. Syllables (`syllables`) — B5 · bound · 12 templates

| | |
|---|---|
| bundles | `syllable-split` (G1-305, G1-325–329; `data/b3/syllable-split.js` + locales ×10; `primitives/syllable-arcs.js`), `syllable-reading` (G1-306, G1-330–334; `data/b3/syllable-reading.js` ×10); `lib/b3-common.js approvedByKey` |
| data ×11 | approved words ×11 ✓ with per-locale refusals already in the banks (en Vowel King refused, fr mute-e, da strict pool); `reviewed-only` (syllables-Q1) |
| controls | Level · Pictures · How many · *Syllables* (2 / 3 / mixed) · *Mark* (arcs / bars — locale default from the bank) = 5 |
| screens | `type-word`, `tap-select`, `tap-choice` (12/12) |
| keep | — |
| risks | none new; the open clapping sheet is optional (Q1) |
| effort | 4 |

#### 41. Sight Words (`sight-words`) — B5 · bound · 11 templates

| | |
|---|---|
| bundles | `sight-words` (K-239, K-259–263, K-388–392; `data/literacy/sight-words.js` 24 per locale ×11, `sight-levelset`, `lib/sight-words-levelset.js`) |
| data ×11 | per-locale frequency lists ✓ (24 words — **thin** for a maker: author ≥ 60 per locale in the batch, from the national lists: Dolch/Fry en; de Grundwortschatz; fr mots-outils; es-MX palabras de uso frecuente; pt-BR; it; nl "hoogfrequente woorden"; sv "100 vanligaste orden"; da "120 ord"; no; fi — native panel). Own words allowed (letters claim) |
| controls | Level · How many · *Words* (list / my list) · *Task* (read-trace-write / in sentences / find / trace sentence → gallery cards) · *Case* = 4 |
| screens | printable today → `type-word` (write), `tap-select` (find) |
| keep | — |
| risks | sight-word *sentences* with own words cannot be generated (sentences-Q1) — the sentence faces stay bank-only |
| effort | 4 + 1 (list authoring ×11) = **5** |

#### 42. One & Many, Articles (`nouns-articles`) — B5 · bound · 10 templates

| | |
|---|---|
| bundles | `singular-plural` (K-287, K-302/303, K-313/314, K-316; `lib/singular-plural-screen.js`), `articles` (K-288, K-306/307, G1-292; `data/b2/articles.js`, `articles-overrides.js`) |
| data ×11 | vocab singular/plural/gender ×11 ✓ (image-vocabulary.js); article tables ×11 ✓. New: article + plural together (de/nl/sv) — data exists. Own words: **refused** (plural and gender are vocab facts; A6) |
| controls | Level · Pictures · How many · *Direction* (one → many / many → one) · *Answer* (trace / write / circle / sort) = 5 |
| screens | `type-word`, `tap-choice` (10/10) |
| keep | — |
| risks | the §A.13.58 per-locale gender authority — never cross-apply codes |
| effort | 4 |

#### 43. Picture Word Cards & Vocabulary (`picture-cards`) — B5 · bound · 7 templates

| | |
|---|---|
| bundles | `picture-word-cards` (K-324, K-347–350, G1-324; `data/b3/picture-word-cards.js` ×11), `picture-vocabulary` (K-225; `_shared/lit-vocab-match.js`, `data/literacy/vocab-match.json`) |
| data ×11 | vocab ×11 ✓; bilingual pairs = any two of the 11 (K-350 `{U}` unit axis). New: memory cards, word-wall labels. Own words: allowed on word cards (exact-match pictures or no picture) |
| controls | Level · Pictures · How many · *Words* (theme / my list) · *On the card* (word / word + article / plural / syllables → syllables and article from banks only) · *Second language* (any of the 11, bilingual) · *Card size* = 7 |
| screens | printable (cards); K-225 → `tap-order` pairs |
| keep | matching: image–word ✓, left-vs-right language ✓ (K-350), custom word ✓ |
| risks | bilingual mixes exact (A12): the instruction key `same` vs `mixed` |
| effort | 4 |

#### 44. Position Words (`position-words`) — B5 · bound · 4 templates · retires `prepositions`

| | |
|---|---|
| bundles | `position-words` (K-064–067; `_shared/position-words.js`); new sentence templates on `REFERENCE TRANSLATIONS/lcs-grammar.js` (`prepSentence`, `prepDistractorLabels`, `shapeLandmark`, `FI_GENITIVES`) + the vocab slice `{key, singular, plural, gender}` |
| data ×11 | `PREP_FORMS` ×11 ✓ for the table's keys; de dative plurals + fi genitives ✓ in the module; landmark nouns from vocab. Own words/photos as landmarks: refused (Q1) |
| controls | Level · Pictures · How many · *Words* (preposition chips from `PREP_FORMS`, multi) · *Answer* (circle / draw / write the word / choose) = 5 |
| screens | `tap-choice` (circle), `type-word` (write the word), `tap-select` |
| keep | prepositions: fill-in / multiple choice ✓, select prepositions ✓, shape replacement ✓ (`shapeLandmark`), grammar engine ✓ |
| risks | a `null` from `prepSentence` must be a refusal path with a fresh landmark, never a string |
| effort | 4 + 1 (retired) = **5** |

### B6 — literacy B

#### 45. Grammar: Word Classes, Pronouns & Verbs (`grammar`) — B6 · bound · 18 templates

| | |
|---|---|
| bundles | `word-classes` (G1-293, G1-300, G2-275, G2-285–287; `data/b2/word-classes.js`; `lib/word-classes-screen.js`), `pronouns` (G1-352, G1-371/372, G2-353–355; `data/b4/pronouns.js` ×10 — **F3 refused es + fi**), `verb-forms` (G2-317, G2-334–338; `data/b3/verb-forms.js` ×10) |
| data ×11 | banks ×11 with the recorded refusals. New: adjective comparison (big / bigger / biggest — per-locale irregulars: author ~20 triples ×11). Own words: refused (word class and inflection are language facts) |
| controls | Level · Pictures (where chips have pictures) · How many · *Skill* = gallery cards · *Answer* (sort / circle / replace / write) = 4 |
| screens | `tap-select`, `type-word`, `tap-choice` (18/18) |
| keep | — |
| risks | pronoun gender (he/she/they vs de er/sie, fi hän — the es/fi refusals exist for a reason) |
| effort | 4 |

#### 46. Vocabulary: Opposites, Synonyms & Word Parts (`word-meaning`) — B6 · bound · 24 templates

| | |
|---|---|
| bundles | `opposites` (K-351, G1-307, G1-335–337; `data/b3/opposites.js` ×11), `synonyms` (G1-395/396, G2-358, G2-373/374, G3-397; `data/b5/synonyms*` ×10), `compound-words` (G2-316, G2-329–333; `data/b3/compound-words.js` ×11), `word-parts` (G1-397, G2-320, G2-359, G2-375/376, G3-398/399; `data/b5/word-parts*` — **refused F1 it, F3 fi, F4 es/fr**) |
| data ×11 | banks ×11 with recorded refusals ✓. New: compound puzzle cards (same bank). Own words: refused (meaning claims) |
| controls | Level · Pictures · How many · *Skill* = gallery cards · *Answer* (match / write / circle / sort) · *Pictures on/off* = 4 |
| screens | `type-word`, `tap-order`, `tap-choice` (23/24) |
| keep | — |
| risks | none new |
| effort | 4 |

#### 47. Sentences (`sentences`) — B6 · bound · 21 templates

| | |
|---|---|
| bundles | `sentence-building` (G1-249, G1-282/283, G1-302; `lib/sentence-bank.js`, `data/b2/sentences.js` 19–23 frames ×11), `capitals-punctuation` (G2-274, G2-281/282, G2-307/311), `cloze` (G1-350, G1-366–368, G2-349/350; `data/b4/cloze.js` ×10 — **refused F3 da**), `question-words` (G1-353, G1-373–375, G2-356/357; `data/b4/question-words.js` ×10) |
| data ×11 | frames ×11 ✓. Own sentences per sentences-Q1 (strips / fix / open cloze allowed; unscramble, bank cloze, question words refused) |
| controls | Level · Pictures · How many · *Sentences* (bank / my sentences — visible only on the three allowed faces) · *Clues* (capital + end mark / end mark only / none) = 5 |
| screens | `tap-order` (unscramble), `type-word` (cloze, fix), `tap-choice` (21/21) |
| keep | — |
| risks | a teacher sentence longer than the tile row → fit refusal (measured widths) |
| effort | 4 |

#### 48. Reading Comprehension (`reading`) — B6 · bound · 18 templates

| | |
|---|---|
| bundles | `reading-comprehension` (G2-254, G2-269–273; `data/literacy/reading-passages.js` 8 per locale ×11; `lib/reading-comprehension-screen.js`), `read-and-do` (G1-308, G1-338–341; `lib/read-and-do-screen.js`), `read-and-color` (G1-242, G1-251/252, G1-342, G1-409–411; `lib/read-and-color.js`, `data/color-words.js`) |
| data ×11 | passages 8 ×11 (**thin**: author ≥ 24 per locale over time — a content programme, not this maker's build); read-and-do frames ×11 ✓. New: teacher's own passage + own questions (layout only, no generated questions — "no AI") |
| controls | Level · Pictures (read-and-do / colour) · How many (sentences / questions) · *Passage* (bank picker / my text) · *Question type* (multiple choice / write) = 5 |
| screens | `tap-choice` (comprehension), `tap-select`/`tap-paint` (read and do / colour) |
| keep | — |
| risks | own passage fit (3-line title rule analogue: a passage is refused past the measured body budget, offered a second page) |
| effort | 4 |

#### 49. Stories & Writing (`stories-writing`) — B6 · bound · 15 templates

| | |
|---|---|
| bundles | `story-sequencing` (K-379, K-381, G1-400–402; `primitives/story-panel.js`, `story-art.js`; `lib/story-sequencing-screen.js`), `picture-writing` (G2-278, G2-299/300, G2-378), `animal-fact-file` (G2-318, G2-339–343; `data/b3/animal-fact-file.js`, `animal-facts.json` ×11) |
| data ×11 | story art + sentences ×11 ✓; animal facts ×11 ✓. New: story map blank, comic frames with own pictures (own photos allowed: whole, no label) |
| controls | Level · Pictures · How many (frames / lines) · *Story* (picker) · *Starters* (on/off) · *Word bank* (on/off) = 5 |
| screens | `tap-order` (sequence), `tap-choice`; writing faces printable |
| keep | — |
| risks | none new |
| effort | 4 |

#### 50. Word Problems (`word-problems`) — B6 · bound · 12 templates

| | |
|---|---|
| bundles | `word-problems` (G1-213, G1-238–241, G3-370–376; `data/word-problems/frames.js`, `data/b2/wp-muldiv-frames.js`, `word-problems-levelset.json`; `lib/word-problems-levelset.js` (names, `{Q}`, `{il}`); reads `notation.js` ✓ (G3-370)) |
| data ×11 | frames ×11 ✓, names 8 ×11 ✓, fr `nameGender` 16 ✓. Own names per Q1 (fr gender chip). New: two-step problems (new frames ×11 — author), write your own story for 7 + 5 (open, printable), compare problems ("how many more" — the `compare` kind exists in the level set, `word-problems-levelset.js:137` (the kind), `:165` (the two-row compare strip) — F3: the file is 203 lines; the earlier `:230,241` did not exist) |
| controls | Level · Pictures · How many · *Operation* (+ / − / × / ÷ / mixed) · *Range* · *Story kinds* (join / take away / compare / groups / sharing chips) · *Names* (my class) = 7 |
| screens | `type-number` (12/12) |
| keep | — |
| risks | nouns stay bank-only (fi partitive table) |
| effort | 4 |

#### 51. Number of the Day & Number Words (`number-of-the-day`) — B6 · bound · 10 templates

| | |
|---|---|
| bundles | `number-of-the-day` (G1-243, G1-255–257; `data/b2/labels.js`, `number-of-the-day-levelset.json`), `number-words` (G1-210, G1-223–227); `lib/number-words.js` (0..100) + the 100..1000 extension (Q1); `lib/letter-pad.js` |
| data ×11 | words to 100 ×11 ✓; 101–1000 **author + panel** (refused per locale until signed). New: number-word word search (→ word-search engine, Part 3 §A, with the number words as the list), number-word cards |
| controls | Level · How many · *Number* (one number or a range) · *Range* (to 20 / 50 / 100 / 1000) · *Boxes* (frame / tally / words / tens-ones / ±1 / ±10 chips) = 5 |
| screens | `type-word` with letter pad (number words), `type-number` |
| keep | — |
| risks | the 1000 table is the one native authoring item |
| effort | 4 |

#### 52. Ordinal Numbers (`ordinal-numbers`) — B6 · bound · 6 templates

| | |
|---|---|
| bundles | `ordinal-numbers` (K-320, K-336, G1-315–318; `data/b3/ordinals.js` ×11, `lib/ordinal-numbers-screen.js`, `lib/letter-pad.js`) |
| data ×11 | ordinals ×11 ✓ (gender/capital rules in the bank). New: ordinal words to 20 / dates (needs 11th–31st forms ×11 — author; de "der 21." vs words) |
| controls | Level · Pictures · How many · *Places* (to 5 / 10 / 20) · *Flag* (left / right / either) · *Numerals or words* = 6 |
| screens | `tap-select`, `type-word` (6/6) |
| keep | — |
| risks | none new |
| effort | 4 |

### B7 — social and puzzles

#### 53. Calendar, Days & Months (`calendar`) — B7 · bound · 11 templates

| | |
|---|---|
| bundles | `days-and-months` (K-321, K-337, G1-319–322; `data/b3/days-and-months.js` ×11), `calendar` (G2-277, G2-296–298, G2-312; `primitives/calendar.js` with `weekStart` — en and pt-BR Sunday, the other nine Monday, `:7-8`; `data/b2/calendar.js`, `calendar-frames.js`) |
| data ×11 | day/month names + abbreviations ×11 ✓; capitalisation per locale in the bank ✓. New: blank monthly calendar (any month/year — the primitive takes `{year, month}`), birthday graph (→ graphs-data primitive with month labels) |
| controls | Level · How many · *Month / Year* · *Task* = gallery cards · *Week starts* fixed per locale (no control) = 3 |
| screens | `tap-order`, `type-word`, `type-number` (11/11) |
| keep | — |
| risks | note the brief's topic doc says "all other 10 start Monday" — the code (and reality) has pt-BR Sunday-first (`calendar.js:7-8`) |
| effort | 4 |

#### 54. Maps & Coordinates (`maps-grids`) — B7 · bound · 10 templates · retires `treasure-hunt`

| | |
|---|---|
| bundles | `maps` (K-377, G1-379, G2-369–371, G3-396; `data/b5/maps*` ×10; primitives `island-map.js`, `map-symbol.js`, `compass-rose.js`, `world-map.js`, `top-side-view.js`), `grid-coordinates` (G2-279, G2-302/303, G2-308; primitive `coord-grid.js`) |
| data ×11 | continent/ocean names ×11 ✓ (b5); direction words ×11 ✓. New: treasure hunt (follow the steps — move frames **per locale** as in the old app's `moveFrame` table, A7; author ×11), draw your own map (blank with key) |
| controls | Level · Pictures · How many · *Grid* (5 / 6 / 8 / 10) · *Compass* (on/off; basic / cardinal) · *Task* = gallery cards = 5 |
| screens | `tap-paint` (colour by coordinate), `type-word` (codes), `trace-path` (treasure hunt) |
| keep | treasure-hunt: basic vs cardinal directions ✓, grid of pictures ✓; revisit legal where the clue allows (D3) |
| risks | the per-locale move frames are the A7 lesson ("Gehe nach Westen 1 Feld" shipped in 9 locales) — native-authored, never filled English order |
| effort | 4 + 1 (retired) = **5** |

#### 55. Me, My Family & Feelings (`me-family-feelings`) — B7 · bound · 17 templates

| | |
|---|---|
| bundles | `feelings` (K-319, K-331–335; `data/b3/feelings.js` ×11), `all-about-me` (K-323, K-342/343, K-345/346; `data/b3/all-about-me.js` ×11), `family` (K-370, K-375, G1-385–387, G2-362; `primitives/family-figure.js`, `family-tree.js`; the operator's portraits, memory `project_family_portraits_2026_10`) |
| data ×11 | banks ×11 ✓ (family words per language, feeling words). New: weekly feelings check-in (strings ×11, ~10) |
| controls | Level · How many · *Family words* (chips) · *Feeling words* (chips) · *Task* = gallery cards = 4 |
| screens | `tap-choice`, `type-word`, `tap-order` (where marked) |
| keep | — |
| risks | family words are culture-bound (no "stepmother" etc. without the panel) |
| effort | 4 |

#### 56. Healthy Habits & Road Safety (`health-safety`) — B7 · bound · 12 templates

| | |
|---|---|
| bundles | `healthy-habits` (K-380, K-382, G1-403–405, G2-379; `data/b6/*healthy*` ×10; primitive `habit-pictogram.js`), `road-safety` (K-369, K-373/374, G1-384, G2-360/361; `data/b5/road-safety*` ×10; primitives `road-sign.js` (MUTCD for en-US, Vienna for the other 10), `traffic-light.js`, `road-pictogram.js`) |
| data ×11 | banks ×11 ✓; sign sets per convention ✓. New: my safe way to school (draw + label: open, strings ×11) |
| controls | Level · How many · *Topic* (habits / road) · *Task* = gallery cards = 2–3 |
| screens | printable (`tap-choice` possible on the choice faces) |
| keep | — |
| risks | es-MX signs: MUTCD-derived in Mexico (SCT norms) — the b5 panel ruled; keep |
| effort | 4 |

#### 57. Word Search (`word-search`) — B7 · bound · 0 templates · retires `wordsearch` · **engine Part 3 §A**

| | |
|---|---|
| bundles | new `types/_shared/word-search.js` factory + `lib/puzzles/grid-fill.js`, `data/puzzles/letter-freq.<loc>.json`, `data/puzzles/blocklist.<loc>.json`; vocab + `pictureIndex` for picture clues; `data/b2/collation.js` |
| data ×11 | letter frequencies ×11 (derive from the approved-words corpus, panel-checked); blocklists ×11 (native-authored, poison-tested); own words allowed (letters claim). New: picture clues, hidden message, shape grid |
| controls | Level · Pictures (picture clues) · How many (words) · *Words* (theme / my list) · *Grid* (8 / 10 / 12 / 15) · *Directions* (across+down / + backwards / + diagonal) · *Case* = 7 |
| screens | `mark-grid` (drag along the word — the kind exists, `emit/interactive-mark-grid.js`) |
| keep | wordsearch: grid size ✓, diagonal and reverse ✓, picture or word list ✓, grid-vs-clue language mix ✓ (A12 two language controls — takes the *Case* slot when mixed), custom word list ✓ |
| risks | the blocklist is the one content item that must be complete before launch per locale |
| effort | 4 + 1 (retired) + 2 (new engine + ×11 data) = **7** |

#### 58. Crossword (`crossword`) — B7 · bound · 0 templates · retires `crossword` · **engine Part 3 §B**

| | |
|---|---|
| bundles | new `types/_shared/crossword.js` + `lib/puzzles/crossword-layout.js`; vocab + `pictureIndex`; clue sentences from the sentence frames **only** (own clue text allowed as teacher text) |
| data ×11 | own words allowed; word clues (definitions) are **not generated** (no AI) — clue kinds: picture / the teacher's own clue / first letter. New: picture crossword, word bank |
| controls | Level · Pictures · How many (6–15) · *Words* (theme / my list + clues) · *Clues* (pictures / my clues / word bank) · *Size* (auto / 10 / 13 / 15) = 6 |
| screens | `type-word` per entry (the runtime's `type-*` plus the crossword cell layout — new wiring on an existing kind) |
| keep | crossword: words + clues ✓, picture clues ✓, bilingual grid vs clue language ✓, manual edit of pictures ✓ (`edits[op:'picture']`) |
| risks | words that do not cross (failure rule); A11 multi-word entries (spaces stripped in the grid, kept in the clue) |
| effort | 4 + 1 + 2 = **7** |

#### 59. Secret Code (Cryptogram) (`secret-code`) — B7 · bound · 0 templates · retires `cryptogram` · **engine Part 3 §C**

| | |
|---|---|
| bundles | new `types/_shared/cryptogram.js`; `data/b2/collation.js` alphabets (the old app's per-locale cipher alphabets `cryptogram.html:1435-1449` map 1:1); `pictureIndex` for picture codes; message bank = the sentence frames + a short-phrase bank ×11 (author) |
| data ×11 | alphabets ×11 ✓; messages: own text allowed (letters claim), bank phrases ×11 to author (~20 each). New: number code (A = 1), picture code |
| controls | Level · Pictures (picture code) · *Message* (bank / my text) · *Code* (pictures / numbers / symbols) · *Letters given* (0–5) · *Lines per puzzle* = 6 |
| screens | `type-word` per word (letters typed into the cells) |
| keep | cryptogram: phrases ✓, picture code per letter ✓, letters revealed ✓, max lines ✓ |
| risks | the cipher must map every letter the message uses (ñ, å, ß) — unknown glyph = refusal, never dropped (A9) |
| effort | 4 + 1 + 1 = **6** |

#### 60. Bingo (`bingo`) — B7 · little · 0 templates · retires `bingo` · **engine Part 3 §D**

| | |
|---|---|
| bundles | new `types/_shared/bingo.js` (card set + caller cards as extra pages); vocab / number / sum / letter / sight-word item sources from the other makers' banks |
| data ×11 | items language-free or from banks ✓; letter-sound bingo = reviewed words only. New: sum bingo, letter-sound bingo |
| controls | Level · Pictures · *Content* (pictures / words / numbers / sums / letters) · *Grid* (3×3 / 4×4 / 5×5) · *Cards* (how many unique) · *Caller cards* (on/off) = 6 |
| screens | `tap-select` (mark the called item — announce-only caller, the bingo Family F precedent) |
| keep | bingo: rows × columns ✓, number of unique cards ✓, callout cards ✓, word or picture cells ✓, chip fill → drawer |
| risks | the old app silently reused items when the pool was short (`bingo.html:2380-2386` "reusing from main pool") — the new engine refuses with the count (F5) |
| effort | 3 + 1 + 1 = **5** |

### Effort total (Part 2)

Pilot 14 · B1 30 · B2 30 · S6 3 · B3 53 · B4 21 · B5 37 · B6 32 · B7 42 = **262 maker sessions**, against ARCHITECTURE's 182 + 12 pilot + 3 spike = 197. The difference (≈ 65) is the retirement count applied per app (33 retired apps land in 20 makers — several makers carry 3–5), the five new engines (+7), and the per-maker native data items this run found (written methods, time words, customary units, letter models, 1000 words, sight lists, blocklists, figure pools). With the 25 platform sessions: ≈ 287 sessions. **F3 — the ONE reconciled figure (also written into ARCHITECTURE §0/§14.3): 25 platform + 266 makers (this Part 2's 262 + ENGINES-ART's +4 on #26/#28/#30/#31) + ≈ 160 for the 297 new templates of NEW-TEMPLATES (≈ 0.5 each on an existing factory, +1 for each of the ≈ 10 new primitives — rekenrek, bar-model, compare-mouth, net, letter-heights, room-plan, cut-line, code-addition chain, KenKen cages, riddle solver) ≈ 450 sessions.** Neither this run's 287 nor ARCHITECTURE's 230 counted the new templates; ARCHITECTURE's per-maker rule claimed to include them, which was impossible at 2–4 sessions per maker.

---

## Part 3 — the five engines with no worksheet-gen type yet

All five are **type factories** under `types/_shared/` with the standard contract (`{id, slug, gradeBand, exerciseType, themeAxis, difficulty, i18n, interactive, build(), verify()}`), pure functions of `(settings, seed, locale, data)`, no DOM in `build()`, `verify()` through the Page shim, bundled per maker as lazy chunks (ARCHITECTURE §2.3). Shared helpers live in `lib/puzzles/`. Letters are Unicode letters throughout: every character class is `\p{L}` with the locale's letter set from `data/b2/collation.js` (alphabet + fold) and `lib/letter-pad.js OWN` (å ä ö æ ø ü ß ñ ç are letters, A9/A10); case changes use `toLocaleUpperCase(lang)` / `toLocaleLowerCase(lang)`; comparisons for duplicates and the blocklist use a **fold** = NFD → strip combining marks → the locale's `fold` table (de ß → ss) → lower. Multi-word vocab entries (`french-fries`, `ice cream`) are handled per A11: `gridForm(word)` removes spaces, hyphens and apostrophes for cells; `displayForm` keeps them for lists and clues; a word whose `gridForm` is empty or < 3 letters is refused.

### Shared data (new, `data/puzzles/`)

| file | content | author | size |
|---|---|---|---|
| `letter-freq.<loc>.json` ×11 | relative frequency of every letter of the locale's set, **measured** over the approved-words corpus for that locale (`scripts/v2-data/…/approved-words-<loc>.json entries[].word`, 794–1,120 words) plus the vocab singular/plural forms; the old app's hand-weighted strings (`REFERENCE APPS/wordsearch.html:1475-1489`) are the sanity reference, not the source | a tool `tools/puzzles/measure-letter-freq.js`; panel glance | ≈ 1 KB each |
| `blocklist.<loc>.json` ×11 | folded forms of words a K-3 teacher must never find in a grid: slurs, sexual and scatological words, the schoolyard insults, plus the locale's common offensive abbreviations; **≥ 80 entries per locale**; never displayed anywhere | native panel per locale (one pass, with a two-direction poison set: 5 must-fire, 5 must-pass innocents per locale that contain rude substrings — en "assassin", "cockpit", "Scunthorpe"-class) | ≈ 2 KB each |
| `phrases.<loc>.json` ×11 | 20–40 short child-safe phrases for the cryptogram bank (proverb-free, culture-neutral: "the sun is warm", "I like to read") | native panel | ≈ 2 KB |
| `bingo-callers.json` | caller-card strings ×11 ("Bingo!", "Caller cards", "Cut out the cards") | native panel | tiny |

### A. Word search — `types/_shared/word-search.js` + `lib/puzzles/grid-fill.js`

**Inputs** (settings): `words[]` (3–20 entries from a theme's vocab slice or the teacher's `words[]`, `lang`), `n` ∈ {8, 10, 12, 15} or `auto`, `dirs` ⊆ {E, S, SE, NE, W, N, NW, SW} as three steps (across + down / + backwards / + diagonals), `case` (small / CAPITALS), `clues` (word list / pictures / both), `gridLang` + `clueLang` (A12; both from the 11; words are vocab keys so the clue language renders the same key's word), `shape` (none / heart / star / circle / tree — built-in cell masks), `hiddenMessage` (optional text).

**Normalisation and refusals (gate 9 feeds every row):**

| check | rule | sentence |
|---|---|---|
| letters | every char of `gridForm` ∈ locale letter set ∪ accented letters present in the vocab of that locale; anything else (digits, emoji, foreign letters) | "*{w}* has a letter that is not in {language}" |
| length | 3 ≤ len ≤ n (auto: n grows) | "*{w}* is longer than the grid — choose a bigger grid or a shorter word" |
| duplicates | two words with the same fold; or one word's fold inside another's fold (cat / cats) — the second would be found twice | "*cat* is inside *cats* — remove one" |
| case | CAPITALS: `toLocaleUpperCase(lang)`; de ß → SS in **both** grid and list (A9: list and grid strip the same way); fr/es/pt/it accents kept on capitals (É) | — |
| count | ≤ 20 words; ≤ ⌊n²·0.45⌋ letters in total so fillers remain ≥ 55 % (a denser grid is unreadable at K-3) | "Too many words for a {n}×{n} grid — remove {k} or choose a bigger grid" |
| blocklist | a *word in the list* that is itself on the union blocklist | "*{w}* cannot be used" (no explanation printed) |

**Placement (seeded, deterministic, `lib/puzzles/grid-fill.js placeWords`):** sort by `gridForm` length desc (ties by seed shuffle); for each word, up to 200 attempts (the old app's budget, `wordsearch.html:2739`): draw a direction from `dirs` and a start cell such that the word fits the mask; accept if every cell is empty or holds the same letter (shared letters are allowed and desirable — count them as `overlaps`); among the first 8 valid candidates keep the one with the most overlaps (denser, more natural grids); on failure after 200 attempts: in `auto` grow `n` to the next size and restart; at n = 15 refuse the word by name. Direction balance: at ≥ 6 words no direction may carry more than 60 % of the words (A3 for puzzles — a grid where every word reads across is a tell); the placer rejects a candidate that would break the balance when another direction is still possible.

**Fill:** every empty mask cell gets a letter drawn from `letter-freq.<loc>.json` by cumulative weight from the rng stream. Letters of the locale's set that have frequency 0 in the corpus (fi b, c, f …) are never drawn — a Finnish grid never shows a q. For the **hidden message** template the free cells are filled with the message letters in reading order instead; the engine requires `free === message.length` and, when the count differs after placement, tries up to 32 re-placements (overlaps change the free count) before refusing with "Make the message {k} letters longer/shorter".

**The two scans (build AND verify, same code):** after filling, `occurrences(grid, folded, dirs8)` counts, for every list word, every blocklist entry (the **union of the 11 lists** — a Danish grid must not spell a Swedish slur either; a Swedish teacher's class may hold a Danish child), in **all 8 directions regardless of the enabled set** (a rude word reads backwards just as well). Rules: every list word occurs **exactly once**; every blocklist entry occurs **zero** times. A violation whose cells are all fillers → redraw those filler cells (different letters from the stream) and rescan, up to 50 passes; a violation that involves a placed-word cell (two words crossing form a rude word, or a word appearing a second time through another word's letters) → the whole placement is retried with the next seed draw (up to 8 placements); then refuse ("These words cannot be placed together — change *{w}*"). `verify()` re-runs the same two scans over the rendered `[data-lcs-cell]` letters and additionally asserts: cell ≥ 26 px (L1: 36 px), the clue band present when `clues` includes pictures, the key highlights exactly the placed cells (`data-lcs-word`), and no English on a non-English page.

**Layout (B2/B3):** the picture-clue band is reserved first at a constant icon size (56 px), wrapping to ≤ 2 rows; the grid takes `cell = min(660 / n, (availH − band) / n)`, cells square, floor 26 px → at n = 15 with two clue rows the floor binds and the engine offers n = 12 or "word list instead of pictures". Word list: 2–3 columns, `displayForm`, same case as the grid. Answer key: identical grid with the placed cells tinted (B5). Shape masks: the placer and filler only use mask cells; outside cells render white.

**Screen:** `mark-grid` (`emit/interactive-mark-grid.js` — the kind exists): drag from the first to the last cell of a word, both directions accepted; Check reveals; the word list ticks off. Print of the screen = the same page.

**Old-app features kept:** grid size · diagonal and reverse · picture or word list · grid-vs-clue language mix (two language controls; when equal, the single-language instruction key) · custom word list. Dropped: the free-text "title" box (shell title covers it).

**Cost:** ≈ 1.5 sessions engine + gates; data ×11 (freq tool 0.2, blocklists one native pass per locale). Browser time: placement ≤ 200 × 20 × 15 cell checks = 6·10⁴ ops; scans 8 × 225 cells × (20 + ~1,000 blocklist) folded substring checks ≈ 2·10⁶ char ops — ≈ 10–40 ms. Well under the 150 ms gate budget.

### B. Crossword — `types/_shared/crossword.js` + `lib/puzzles/crossword-layout.js`

**Inputs:** `words[]` (6–15; `gridForm` 3–12 letters; from a theme's vocab or the teacher's list), `clueKind` per word (picture / own clue text / word bank — no generated definitions, "no AI"), `gridLang` / `clueLang` (A12), `size` (auto / 10 / 13 / 15), `case` (CAPITALS default — the school crossword).

**Algorithm (deterministic multi-start greedy, the old app's placement rules kept as the inner step):**

1. Normalise + refuse as in §A (letters, length, duplicates, blocklist); a word with **no letter in common with any other** is refused *before* layout with the sentence "*Giraffe* shares no letter with the other words — change it or remove it" (the only pair-wise pre-check: ∃ j ≠ i with `letters(w_i) ∩ letters(w_j) ≠ ∅`).
2. For `start = 0 … 63` (seeded): order = words by length desc, ties shuffled by the seed; place word 1 across at the origin of an **unbounded coordinate map** (no fixed 15×15 — the old app's `N = 15` wall, `crossword.html:3728-3730`, is the reason it dropped words); for each next word enumerate every intersection with a placed letter (the old `findIntersections`), test `canPlace` with the old adjacency rules (no parallel neighbour cells except at the crossing; the cells before and after the word empty; `crossword.html:3730`), score each legal candidate `(crossings, −newBboxArea, −|dx|+|dy| from the centre)` and take the best; a word with no legal candidate goes to a retry queue; after the pass the queue is retried once (later words create new crossings).
3. Score the layout `(placed, crossings, −bboxArea, aspect close to the page's 660 × availH)`; keep the best; stop early when all words are placed and the bbox fits the cell floor.
4. **Fit:** `cell = min(660 / cols, availH / rows)`, floor 26 px (G1 templates 32 px); clue area below (picture clues in two numbered rows, or the numbered across/down lists in two columns). If the best full layout breaks the floor, the engine prefers the most compact start among those that placed all words; if none fits → "Fewer or shorter words fit this page — remove {k}".
5. **Failure rule:** if after 64 starts any word is unplaced → the maker shows the unplaced words by name and a one-tap "remove" per word; **nothing is generated with an island**: connectivity is by construction (every placed word crosses a placed word), and `verify()` re-derives connectivity by flood-fill over `[data-lcs-cell]`.

**Numbering and clues:** standard numbering by reading order of start cells; across/down lists; picture clues = the number + the picture (56 px) in the clue band; own clues = the teacher's text per word (letters claim; A12 the clue language is `clueLang`); word bank = `displayForm` list shuffled. Bilingual: grid in `gridLang` (vocab word of that language), clue picture or the same key's word in `clueLang`; same-language → single-language instruction (A12).

**Correctness:** one solution by construction (cell lengths + clues identify the words; a picture clue is exact-match vocab, so a homonym picture is never used as a clue for the other reading); `verify()` checks each entry's cells against `data-lcs-answer` letters, crossing cells equal in both words, numbering monotone, no two entries share a start cell and direction, cell floor, no island.

**Screen:** `type-word` extended to **shared cells**: a new runtime variant `type-cross` on `emit/interactive-type-plus.js` (the 12th kind — the one addition to the ARCHITECTURE §11.2 menu): tapping a numbered clue selects the entry, the pad types into its cells, crossing cells update both entries; Check grades per entry. ≈ 0.5 session of runtime work, gated like the other kinds.

**Old-app features kept:** words + clues · picture clues · grid vs clue language · manual edit of pictures (`edits[op:'picture']` on a clue slot). Dropped: the fixed 15×15 canvas.

**Cost:** ≈ 1.5 sessions engine + `type-cross` 0.5 + gates. Browser time: ≤ 64 starts × 15 words × ≤ 180 intersections × ≤ 12-cell checks ≈ 2·10⁶ ops → 10–30 ms; the old app's single pass with shuffles had no retry and no size search.

### C. Secret code (cryptogram) — `types/_shared/cryptogram.js`

**Inputs:** `message` (a bank phrase from `phrases.<loc>.json`, or the teacher's text ≤ 60 letters / 3 lines), `code` (pictures from a theme / numbers / symbols), `given` (0–5 letters revealed), `maxLines` (1–3), `lang`.

**Cipher alphabet:** the locale's collation alphabet (`data/b2/collation.js` — the old app's per-locale orders `cryptogram.html:1435-1449` agree: es Ñ after N, sv/fi ÅÄÖ after Z, da/no ÆØÅ) **plus every accented letter the message actually uses** (fr é, pt ã, …) as its own symbol — the old app's `normalizeToAlphabet` stripped accents (`:1454-1457`), which printed a wrong answer ("école" → "ecole"); the new engine never does. Cap 30 distinct letters per message; more → refuse. A letter outside the locale's set → refuse by name (A9/A10).

**Code assignment (seeded):** a bijection letters-in-message → symbols; pictures: `pictureIndex` nouns of the chosen theme, distinct by signature, as many as distinct letters (a theme with too few → refuse with the count, never reuse a picture for two letters); numbers: A = 1 in the locale's alphabet order (es Ñ = 15, de Ä/Ö/Ü after Z = 27–29 — the key prints the mapping so nothing is assumed); symbols: a fixed set of 30 language-free glyphs. **Uniqueness is by construction**: the key (letter ↔ symbol) is printed on the page, so decoding is a lookup, not cryptanalysis; `given` reveals letters by writing them into their cells (never a letter that makes a word fully readable with nothing left to decode — the engine picks given letters so every word keeps ≥ 1 hidden letter).

**Layout:** words never split across lines; a line holds ≤ 12 cells at the level's cell size; the key legend above or below (gallery variants); punctuation printed in place (not encoded); capitals: the child writes capitals (school convention for codes) in all locales. Answer key = message in the cells.

**verify():** every cell's symbol maps through the printed key to `data-lcs-answer`; the key is a bijection; given-letter rule; cell floor; no unmapped letter.

**Screen:** `type-word` per word (letter pad ×11 from `letter-pad.js`), the key legend visible; Check per word.

**Old-app features kept:** phrases · picture code per letter · letters revealed · max lines per puzzle. **Cost:** ≈ 1 session + the phrase bank ×11.

### D. Bingo — `types/_shared/bingo.js`

**Inputs:** `content` (pictures of a theme / words / numbers in a range / sums with answers in a range / letters of the alphabet / sight words / letter-sounds), `g` (3 / 4 / 5), `cards` (2–30 unique), `callers` (on/off), `freeCentre` (5×5 only), `lang`.

**Pool:** pictures = theme nouns distinct by signature (`pictureHash`); words = the same nouns' words (vocab, exact); numbers = the range; sums = every distinct answer in the range with ≥ 1 sum generating it (the caller shows a sum, the card shows the answer; several sums per answer are fine — the caller deck holds one sum per answer, drawn by seed); letters = the locale alphabet (`collation.js`); sight words = the sight-words bank; letter-sounds = letters with ≥ 1 reviewed initial-sound picture (alphabet-Q1 rule; the caller shows the picture, the card the letter). **Refusal:** `|pool| < g² + 2` → "This theme has {p} pictures; a {g}×{g} card needs at least {g²+2}" (the old app silently reused items, `bingo.html:2380-2386` — F5).

**Cards (seeded):** each card = a `g²`-subset of the pool laid out by seed; accept a card only if its item set differs from every previous card **and** shares ≤ g² − 2 items with each (two cards must not be the same card in a different order, and must not "win together" on every call); retry up to 100 draws per card, then refuse with "{c} different cards are not possible with {p} items — fewer cards or a bigger theme". Free centre on 5×5 as a star cell. Cards per page: 3×3 → 4, 4×4 → 2, 5×5 → 1 (cell floor 64 px for pictures); each card numbered.

**Caller cards:** one per pool item (or per sum), shuffled by seed, as extra pages of cut-out cards with cut lines (the K-240 cut-line component), with the caller strings ×11. Answer key: not applicable (every card is valid); the key page lists the pool.

**verify():** card uniqueness and overlap rule, every cell item ∈ pool, no item twice on a card, caller deck = pool (one each), cell floor, page count.

**Screen:** `tap-select` with an **announce-only caller** (the old bingo Family F precedent, CLAUDE.md §14.2: the caller bar does not grade; the child marks cells; Check compares marks to the called set). One card per screen.

**Old-app features kept:** rows × columns · number of unique cards · callout cards · word or picture cells; chip-fill style → drawer. **Cost:** ≈ 1 session.

### E. Coloring pages — `types/_shared/coloring-page.js` (the composer; photo → line art is F2-art's)

**Inputs:** `pictures[]` (1 / 2 / 4 BW library pictures — only the 50 `bw` themes, 1,325 nouns in `cache/manifest.json`; the colour library is hidden in this maker so BW and colour are never mixed), `layout` (1 big / 2 / 4), `caption` (none / the word / trace the word), `lines` (writing lines on/off), `mirror` per picture (horizontal flip; refused for pictures whose vocab key is on a small "has text or asymmetric meaning" list — clocks, signs, letters, numbers), `ownKey` (a legend box of up to 6 colour swatches the teacher labels — printed, not graded), own photos (placed **as is**, square-fit, no caption, chip "your picture" — unless F2-art rules a line-art conversion in).

**Layout:** fixed frames per layout (1: 600 × 600 centred; 2: two 300-tall rows; 4: a 2×2 of 290 px) inside the 660 × 740 body; the caption lane (vocab word in the locale, `displayWord`) and the trace lane (`primitives/trace-path.js strokeWordLane`, `letter-strokes.js`) under each frame; writing lines from `trace-path.js rulingBlock`. The "colour the scene" template composes several BW pictures with `mixedScatter` at large icons (iconPx ≤ cell, no overlap by construction) — a scene, not a page of frames. No answer key (an open page). **verify():** every `<img>` resolves from a `bw` theme (the localized marker test `bw(\s+\d+)?$`), captions equal the vocab word, trace lane text equals the caption, frames inside the body, pageFill.

**Screen:** `tap-paint` only where a picture has cbn regions (F2-art); otherwise the student link shows the printable with "Print". The brush (`ink` layer) is the shell's, printed and shown on screen, never gated (ARCHITECTURE §4.2).

**Old-app features kept:** brush tools · flip · handwriting lines · name field. **Cost:** ≈ 1 session (the composer; the brush is platform work in P2).

---

## For the operator

Each item: the options, my recommendation, the cost of each. Nothing here blocks the platform or the pilot except item 2.

1. **Coins: tokens or realistic?** (A) keep the stylised tokens (`primitives/coins.js`) — *recommended*: no licence risk in any of the 11 markets, B&W-safe, matches the published decks; cost 0. (B) realistic coin art per currency: licence review per central bank (ECB conditions, Banxico, BCB, US size/colour rules), 11 art sets, grey discs on copiers; cost ≈ 3 sessions + legal review. I am not a lawyer; (A) avoids the question.
2. **The spelling pilot carries two new engines** (word scramble, word guess) before the chain is proven. (A) keep spelling in the pilot with both — *acceptable*: +1 session (already in the card); (B) swap the pilot's bound maker to **sight-words** (bank-only, own words as letters, no new engine) and retire word-scramble/word-guess in B5 — *recommended*: the pilot proves the chain one session sooner; cost: the two old apps stay reachable two batches longer.
3. **The written-method control**: shown only in de/nl/da (where two school methods exist) — *recommended*; or shown everywhere with the locale's method preselected: cost = one more control on 25 templates against the 7-cap, and a teacher can pick a foreign method by mistake.
4. **en-US customary units**: (A) inches/°F as the **default** for en-US length/temperature templates with metric as a second gallery card — *recommended* (CCSS 2.MD.A.1 names inches); (B) metric default everywhere: cost = US teachers see cm first. Either way the other 10 locales never see customary.
5. **Blocklists in the repository**: the word-search gate needs the rude words as data (`data/puzzles/blocklist.<loc>.json`, never displayed). (A) plain folded word lists in the repo — *recommended*: reviewable, poison-testable, diffable; (B) hashed lists: cannot be reviewed by the native panel, and a scan over hashes needs every substring hashed (slower, opaque). Scan against the **union of the 11** (a Danish slur in a Swedish grid is still a slur) — *recommended*; locale-only scanning costs nothing but misses that case.
6. **Sorting by the teacher's own labels**: the teacher assigns every picture to a bin herself (A14 strict scoring on her truth). *Recommended* yes with the "teacher-made" chip; the alternative (no own labels until the 933-key review is complete) delays the most-requested sort by months. Finishing the review (477 keys) is an offline content task ≈ 2 sessions of native panel work and grows tier 3 without code.
7. **Own sentences**: allowed on strips / fix-the-sentence / open cloze; refused on unscramble / bank cloze / question words (sentences-Q1). The alternative "allow unscramble with a warning" prints two-answer puzzles — against the brief's own rule; *not recommended*.
8. **Syllables: the open clapping sheet** (own words, no split, no count, no key) — optional template; *recommend* adding it in F2b only if teachers ask; cost ≈ 0.4 session.
9. **A numeral-style control for bilingual classes** (plain / flag / crossed) — *recommend no*: the locale's school form is applied silently (`FORM_BY_LOCALE`); a control invites a wrong form. Cost of yes: one control + one gate case.
10. **Dropped old-app features** (need your yes, with ARCHITECTURE §18-F): math-worksheet "allow negative results" (above the K-3 ceiling); bingo "chip fill" style → drawer; wordsearch/crossword free text box; the old apps' 7-font text tool. Cost of keeping any: a free layer the gates cannot judge.
11. **G3-349 Magic Squares has no uniqueness proof** — **F3: DONE in code** (commit `9f7ec9973`, 2026-10-31: `uniquelySolvable`, rank test). What remains under the standing rule is the republish-in-place of the live G3-349 decks, which F3 did not verify (documents only).
12. **Thin banks the makers will expose faster than the catalogue did** — sight words (24 per locale → ≥ 60), reading passages (8 per locale), pixel figures (4 per size), cryptogram phrases (0). *Recommend* authoring sight words + figures inside their maker's batch (already counted), passages as a separate content programme (not counted; ≈ 0.3 session per 8 passages per locale with native review).
13. **The 1000-range number words** (number-of-the-day): offered per locale only after its 101–1000 table is panel-signed (≈ 0.1 session per locale). Alternative: cap the maker at 100 — cost: the "to 1000" control is missing in all 11.
14. **Long division / written division layout**: not in this programme (no primitive, differs per country, above K-3 core). *Recommend* leaving it out; cost of including: ≈ 2 sessions + an 11-locale layout table.
15. **Effort**: this run's maker total is ≈ 262 sessions (+25 platform ≈ 287) against ARCHITECTURE's ≈ 230. The gap is the per-app retirement work and the native data items listed per card; no single item is optional without dropping a feature the brief asked for. **F3: the reconciled programme figure, including the 297 new templates, is ≈ 450 sessions (OPEN-DECISIONS #1).**
