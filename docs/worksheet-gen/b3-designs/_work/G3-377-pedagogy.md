# G3-377 `division-with-remainder` - pedagogy + native-rebuild design (nt20-C studio, 2026-09-14)

Numbers are MEASURED 2026-09-14 unless marked *est.* (files named inline; no scratch script, every number is a count, a grep or page arithmetic from `_tokens.js` / `page.css`).

**Boundary (load-bearing).** G3-309 = exact sharing (`total % bins === 0` is ASSERTED in `array-tasks.js verify`). G2-217 = exact rings. G3-310 = hops to ZERO, hops PRINTED, exact (`number-line-tasks.js:87-95`). G3-311/312 = fact families / missing factor. G3-372..374 = division STORIES. **This type is the LEFTOVER**: every item is `n = q*d + r` with `0 < r < d` (F3 admits `r = 0` as the decision), and the child writes q AND r in the locale's own notation. Nothing is exact by construction, nothing is a story.

**Six load-bearing measurements.**
1. **No landing in any locale claims the remainder.** en title/h1 grep "remainder" = 0 (the 21 en JSON hits are subtraction prose "counting the remainder" + 2 dot-to-dot); de/es/pt/fr/nl/sv/da/no/fi title/h1 hits for Rest/resto/reste/residuo/jaa = 0; it = 2, both money "resto" (change). The bare head is free in 11 locales.
2. **The house already renders `÷` in Swedish.** `array-tasks.js` hardcodes `OP('÷')` (share-bins, group-rings, fact-family), `number-line-tasks.js:95` too; `G3-369`, `G1-243` also. So G2-216/217, G3-309/310/311/369 ship `÷` in sv today. This type reads the operator glyph from data (`notation.op`) and its gate bans `÷` in sv (section D); the sibling defect is section F item 2.
3. **`qa/lints.js` does NOT assert `density.minElement`** (receives `density`, checks only font >= 9 px, overflow, footer, images, palette). The G23 floors 36 / 22 / 8-16 (`_tokens.js`) are this type's own gate assertions.
4. **Theme pool:** 50 colour themes, all with >= 8 label-safe nouns; 47 have >= 6 COUNTABLE entries in every locale (`entriesFor` + `countable`); below: colors 3, emotions 0, post office 5. `minNouns:4` + `countable` excludes those three.
5. **Body 722 px** (README ruling), inner width 675 (`.ws-page` padding 0 14), `.ws-card` padding 12 + border 2 -> inner = card - 28. `cardGrid` rows `minmax(0,1fr)`: 4 rows = (722 - 42)/4 = **170** (inner 142); 6 rows = **108** (inner 80); 2 cols = 330 wide (inner 302).
6. **`equalGroups({op:'share'})` lays the strip in rows of TEN** (`components-b2.js:196-204`, "ten is neutral, the row count never restates the quotient") with `data-lcs-slot` boxes; `iconRows({perRow})` (`components.js:10`) does the same with +-4 deg rotation. Both reused verbatim.

## A. IDENTITY

| field | value |
|---|---|
| family key | `division-with-remainder` (NEW; grep `topics-taxonomy.json` = 0; register `apps[key] = {default_subject:'math', default_age_range:'8-10', exercise_type_axis_key:key}` + `axes['exercise-type']` slug/name x11 before the wave). `assetClass:'icon-placement'`. |
| band | G3 every face (`G3-378+ TBD` by the emitter). Locale level keys per `LEVEL_KEYS` (`gen-b2var-landings.js:112`); de/it panels may key one band lower (both legal for the hub gate). |
| theme axis | **ON for F0, F1** (`{applicable:true, minNouns:4, excludeBw:true}`). **OFF for F2..F5** (numbers only; landings carry `coordinate.theme:''`, K-317 precedent): a picture on a numbers row reads as a clue. |
| fan lever | the DIVISOR SET via `unitAxis`: `2-5` (exemplar), `6-9`, `2-9`. A divisor range is NOT a face. `{U}` resolves to "durch 2 bis 5" / "by 2 to 5"; `deckIdFor` appends `-u2-5`. |
| CCSS (en, honest) | **4.NBT.B.6** on every face (quotients AND remainders); 3.OA.A.2 in prose only for F0/F1. The en landing says "a Grade 4 standard, often begun in Grade 3"; `coordinate.level:'grade-3'` (no grade-4 key exists; section F). Non-EN names the framework only. |
| data | `data/b3/division.js` (section D): per locale `notation` + `strings` x6; numbers are code, locale-neutral. |

| loc | genre head | ASCII slug | level key (honest) | notation (convention; status) | strand (name only) |
|---|---|---|---|---|---|
| en | Division with Remainders | `division-with-remainders` | `grade-3` (Grade 4 in prose) | `13 ÷ 4 = 3 R1` (US "R"; confident) | Number and Operations in Base Ten |
| de | Teilen mit Rest (meta: Division mit Rest) | `teilen-mit-rest` | `2-klasse` (LehrplanPLUS Kl. 2; other Lander Kl. 3: panel) | `13 : 4 = 3 R 1` (Zahlenbuch / Flex und Flo "R"; some "Rest": panel) | Zahlen und Operationen |
| es (MX) | Divisiones con residuo | `divisiones-con-residuo` | `tercer-grado` | **casita**: dividend left, divisor right under the bracket, cociente under the divisor, residuo under the dividend (confident for MX; any inline form UNKNOWN) | Numero, algebra y variacion |
| pt (BR) | Divisao com resto | `divisao-com-resto` | `3o-ano` (EF03MA08) | **chave**: same geometry, "resto" (confident) | Numeros |
| fr | Division avec reste | `division-avec-reste` | `ce2` (posee = CM1, excluded) | `13 = (4 × 3) + 1`, "reste 1" (programmes cycle 2; parentheses: panel) | Nombres et calculs |
| it | Divisioni con il resto | `divisioni-con-il-resto` | `classe-seconda` (in riga; colonna = terza) | inline `13 : 4 = 3 r. 1` ("r." vs "resto": panel); `boxStyle:'casita'` = the classe-terza re-target, a data switch | Numeri |
| nl | Delen met rest | `delen-met-rest` | `groep-5` | `13 : 4 = 3 rest 1` (confident) | Getallen en bewerkingen (panel confirms the `strand-names.ts` row) |
| sv | Division med rest | `division-med-rest` | `ak-3` | `13/4 = 3 rest 1` (`/` only; `÷` BANNED) | Taluppfattning och tals anvandning |
| da | Division med rest | `division-med-rest` | `3-klasse` | `13 : 4 = 3 rest 1` | Tal og algebra |
| no | Divisjon med rest | `divisjon-med-rest` | `4-trinn` (Nordic +1) | `13 : 4 = 3, rest 1` (LK20 `:`; comma: panel) | Tal og talforstaing |
| fi | Jakojaannos (meta: jakolasku jakojaannoksella) | `jakojaannos` | `3-luokka` | `13 : 4 = 3, jaa 1` ("jaa" vs "j.": panel) | Luvut ja laskutoimitukset |

## B. THE SIX FACES

**Shared model.** Item `{n, d, q, r}`, `n = q*d + r`, `1 <= r < d` (F3: `0 <= r < d`), `d` from the unit set, `n <= nMax`. Every item root stamps `data-lcs-item data-lcs-n data-lcs-d data-lcs-q data-lcs-r`; q and r are `answerBox({w,h,answer})` slots (`components.js:105`), never text. ONE renderer `divisionLine({n, d, notation, boxW, boxH})` in `templates/components-b3.js` (NEW): `boxStyle:'inline'` splits `notation.template` on `{q}`/`{r}` and emits numerals (Baloo 2 700 26 px), the op glyph and the remainder WORD (Nunito 800 18) as text; `boxStyle:'casita'` calls the NEW `primitives/division-box.js` `divisionBox({n, d, boxW, boxH})` (dividend left, teal 3 px vertical + horizontal bracket, divisor right; quotient box under the divisor, remainder box under the dividend; es/pt/it colonna share this geometry). No other drawing is new.

| # | id / slug | EN title (<=70) | teaching move | what the child does at d2 |
|---|---|---|---|---|
| F0 | G3-377 `division-with-remainder` | Division with Remainders: Ring the Groups | QUOTATIVE division: how many groups of d fit, what is left | 4 cards; pile of n icons in rows of ten; rings groups of d; writes q and r in the notation |
| F1 | G3-3xx `sharing-with-a-remainder` | Share It Out: What Is Left Over? | PARTITIVE division: deal n into d boxes, what cannot be dealt is the remainder (sv delningsdivision, no delingsdivisjon, de Verteilen) | 4 cards; strip of n + d empty boxes + a leftover box; draws tallies into the boxes; writes q (each) and r |
| F2 | G3-3xx `division-with-remainder-practice` | Division with Remainders: Practice Rows | FLUENCY in the notation, every row leaves a remainder | 12 rows `n : d = [q] R [r]` (2x6) |
| F3 | G3-3xx `exact-or-remainder` | Exact or Not? Divisions With and Without a Remainder | DECISION: does d go into n exactly; half the rows are exact (pt "exata e nao exata", de "geht auf") | 10 rows (2x5); circles one of two pills (exact / remainder), writes r (0 allowed) |
| F4 | G3-3xx `division-with-remainder-find-the-error` | Find the Error: The Remainder Is Too Big | CHECKING `r < d`: a worked division with a wrong remainder; correct it | 8 worked items (2x4), each wrong in exactly one way; rewrites q and r |
| F5 | G3-3xx `division-with-remainder-number-line` | Hop Back on the Number Line: What Is Left? | MEASUREMENT division as motion: hop back in d's until a hop no longer fits; the landing is r | 4 lines 0..30 with n marked, NO hops printed; draws the hops; writes q and r |

### d-levels, PARAM vs CODE (guards key on `d.mode` / `d.layout`, never the level index; `data-lcs-mode` stamped only when declared)

| face | d1 | d2 (ships) | d3 | knob | type |
|---|---|---|---|---|---|
| F0 | 4 cards, rings PRINTED (`[data-lcs-ring]` = q, loose = r), n <= 20 | 4 cards, rows of ten, no rings, n 7..30, d 2..5 | 4 cards, `iconScatter`, n <= 24 at 34 px, d 2..9 | `layout:'ringed'|'rows'|'scatter'`, `nMax`, `divisors` | base |
| F1 | 3 cards, n <= 15 | 4 cards, n 7..20, d 2..5 | 3 cards, n 21..30, d 2..6 | `mode:'share'` | CODE |
| F2 | 8 rows, n <= 30 | 12 rows, d 2..5, n <= 50 | 12 rows, d 2..9, n <= 90 | `mode:'rows'`, `items`, `nMax` | CODE |
| F3 | 8 rows, exact 4 | 10 rows, exact 5, d 2..5, n <= 50 | 10 rows, exact 3, d 2..9 | `mode:'exact'`, `exactCount` | CODE |
| F4 | 6 items, kind `rBig` only | 8 items, `rBig` 6 + `sum` 2, no clean item | 8 items, one CORRECT item to tick (`clean:1`) | `mode:'error'`, `errorKinds[]`, `clean` | CODE |
| F5 | 4 lines 0..20, d 2..3 | 4 lines 0..30, d 2..5, n 10..30 | 4 lines 0..50, d 3..9, labelEvery 10 | `mode:'line'`, `lineMax` | CODE |

F0's d1 (rings printed = a READ page) and d3 (scatter = the same act on a harder pile) are scaffolds, not faces. `gate-variation-distinct.js` sees five distinct d2 configs (a different `mode` each).

### Layout at the 722 px body (engineer re-measures; every stage stamps `[data-ws-content]`)
- **F0** `cardGrid({cols:1, rows:4})`: inner 142 x 647, stage padding 6 -> 130 tall. Pile `iconRows({perRow:10, iconPx:36, gapX:6, gapY:6})` = 10*36 + 54 = **414** wide, 3 rows = 120 <= 130 (36 = the G23 element floor; 6 px gaps are the pencil lane; a loop may cross a row break, the classroom norm). Notation right = 647 - 414 - 14 = **219**: `13 : 4 = [q] rest [r]` = 30 + 14 + 16 + 14 + 16 + 44 + 36 (word) + 44 + gaps 6 = **214** with boxes 44 x 44; fr `13 = (4 × [q]) + [r]` 198; casita 120 x 96.
- **F1** 4 rows: `equalGroups({op:'share', a:n, b:d, iconSrc, iconPx:34, w:376, slotH:44})` -> strip 2 rows of ten (376 wide, 72 tall) + d slots ((376 - 40)/5 = 67 wide at d = 5) = 72 + 8 + 44 = 124 <= 130; a `[data-lcs-leftover]` dashed coral box (44 tall, labelled with the remainder WORD) after the slots; notation right in 647 - 376 - 14 = 257.
- **F2/F3** `cardGrid({cols:2, rows:6})` card 108, inner 80 x 302: inline line at 24 px, boxes 44 x 40 = 206 wide; casita 2 lines + bracket = 70 <= 80. F3 adds two `ws-pill` chips (20 px) under the line: 40 + 8 + 40 = 88 > 80, so **F3 = 2x5** (card 133, inner 105).
- **F4** 2x4, inner 142 x 302: printed line 24 px (the wrong r in coral) + tick pill row + rewrite line with boxes 44 x 40: 30 + 8 + 28 + 8 + 44 = 118.
- **F5** 1x4: `numberLine({min:0, max:30, tickStep:1, labelEvery:5, width:380, marks:[n]})` (`number-line.js`: H = 14 + 56 = 70, W = 432; 12.7 px/unit, a hop of 2 = 25 px); notation right in 201 with boxes 40 x 40 (198).
- Numerals >= 22 px everywhere; nothing under 9 px.

### verify() rules (browser; every value re-derived from stamps, never from text)
- Common: per `[data-lcs-item]` `n === q*d + r`, `0 <= r < d`, `r >= d.minR` (1 except F3); `d` in the unit set; the two `[data-lcs-answer]` equal q then r (casita: `data-lcs-slot="q"|"r"` under divisor / dividend); **no text node inside the item equals `String(q)` or `String(r)` unless it also equals n or d**; distinct `(n, d)` per page; item count === config; `body.textContent` contains `notation.op` and, for sv, **no `÷` anywhere** (P3).
- F0: `.ws-icon` count === n per card, icons >= 36 px; `[data-lcs-ring]` === 0 unless `layout === 'ringed'` (then === q, each ring d icons, loose === r).
- F1: `[data-lcs-slot]` === d, `[data-lcs-leftover]` === 1, strip icons === n, slots empty.
- F2: every r >= 1. F3: `data-lcs-exact === (r === 0)`; exact count === `exactCount`; pills `data-lcs-pill="exact"|"rest"`, exactly one `data-lcs-correct`.
- F4: item stamps the PRINTED pair `data-lcs-shown-q/-r`; `(shownQ, shownR) !== (q, r)`; `kind` in `errorKinds`; `rBig`: `shownR >= d && shownQ*d + shownR === n`; `sum`: `shownR < d && shownQ*d + shownR !== n`; clean items === `clean`; the true pair printed nowhere.
- F5: `[data-lcs-mark]` === n; `[data-lcs-hop]` === 0; `n <= lineMax`; `r >= 1`; hop width `d * width/lineMax >= 24 px`.

**Refusal per locale.** Numbers refuse nowhere. F3 needs `notation.exactWord` (de "geht auf", nl "gaat op", sv "gar jamnt ut", fi "menee tasan", fr "tombe juste", es "es exacta", pt "e exata", it "e esatta", da "gar op", no "gar opp", en "exact"): absent -> F3 refused, 5 faces ship, the hub gate expects 5. Casita locales (es, pt; it if re-targeted) need `division-box.js` before their first render; `boxStyle:'inline'` is a legal fallback the panel may reject.

**Fan lever.** `unitAxis` divisor set: `2-5` exemplar (all faces), `6-9` (F2..F5 at their d3 bounds; F0/F1 at n <= 30 / 20 give q <= 5 / 3, honest), `2-9`. F5 `lineMax` follows the unit (30 / 50). Until the mechanism lands (README item 3) the exemplar ships.

**Query face per market.** F0 bare head + "pictures / Bilder / bilder / imagenes / kuvat" · F1 "share / verteilen / dela lika / repartir / partager / verdelen" + the remainder word · F2 "practice / Ubungen / oefeningen / ejercicios / exercices / harjoituksia" · F3 "exact or not / geht auf / gaat op / exata e nao exata / tombe juste / jamnt ut" · F4 "find the error / Fehler finden / zoek de fout / hitta felet / trouve l'erreur / etsi virhe" · F5 "number line / Zahlenstrahl / getallenlijn / tallinje / droite numerique / recta numerica / lukusuora".

**Rejected non-moves (explicit).** Divisor range ÷2..5 vs ÷6..9, larger dividends, two-digit divisors: RANGES, the `unitAxis` fan · exact sharing into bins: G3-309 (its verify asserts divisibility) · exact rings: G2-217 · hops to zero, printed: G3-310 · word problems with a remainder ("how many boxes are needed?"): the `word-problems` family owns stories; `wp-muldiv-frames.js` has no `{rest}` clause in any locale, the round-up / leave-over interpretation needs 2 new frame kinds x11 + fi partitive forms, two stories make a thin page: a future G3-370 variation, not a face here · the long-division ALGORITHM (schriftlich / posee / in colonna / long division): CM1 / Klasse 4 / Grade 4, above the ceiling except it classe 3 (a data switch) · divisibility rules (4.OA.B.4): Grade 4, not a remainder move · pre-ringed pile: F0 d1 · scattered pile: F0 d3 · "make your own": no verify · remainder as fraction / decimal: Grade 5.

## C. NATIVE REBUILD x11

The panel authors 6 titles (head + ONE element, <= 70, no worksheet-word, unique in band), 6 instructions (<= 150, the child's imperative), the `notation` block (op glyph, template, remainderWord, exactWord, the two F3 pill words, F1's leftover label) and the two division-KIND names where the locale teaches them. Numerals are plain Baloo 2 x11. EN is handed over as a SOURCE TO AUDIT.

| loc | template `{n}{d}{q}{r}` · remainder word | `÷` | faces the panel may re-target | traps |
|---|---|---|---|---|
| en | `{n} ÷ {d} = {q} R{r}` · R | allowed | F1 "fair share"; kinds unnamed | Grade 4 (4.NBT.B.6) said plainly; "R1" not "r 1" |
| de | `{n} : {d} = {q} R {r}` · R / Rest | never | F0 "Aufteilen mit Rest", F1 "Verteilen mit Rest" (both kinds taught); F2 "Division mit Rest Ubungen" | Kl. 2 vs 3 per Land; nouns keep the capital in the leftover label |
| es (MX) | casita · residuo | UNKNOWN | F1 "repartir con residuo"; F5 "en la recta numerica" | never "resto" as the MX head; "casita / galera": panel names it; labels are bare words, never a sentence with the noun |
| pt (BR) | chave · resto | common | F3 head = "divisao exata e nao exata" (the BNCC phrase) | "resto" also = change: meta says "resto da divisao" |
| fr | `{n} = ({d} × {q}) + {r}` · reste | appears | F3 "tombe juste ou pas"; F0/F1 "groupement / partage" (programmes) | never "division posee" (CM1); "fiche" banned |
| it | `{n} : {d} = {q} r. {r}` · r. / resto | never | classe 3 `boxStyle:'casita'` (in colonna); F0 "contenenza", F1 "ripartizione" (the shipped G3-372/373 landings use both) | "resto" also = change; one form of r. / resto everywhere |
| nl | `{n} : {d} = {q} rest {r}` · rest | never | F2 "deelsommen met rest" (the head query) | "staartdeling" (groep 6+) never |
| sv | `{n}/{d} = {q} rest {r}` · rest | **BANNED** | F0 "innehallsdivision med rest", F1 "delningsdivision med rest" (Lgr22 names both; the shipped sv G3-374 is "division pa tva satt") | `÷` in ANY string fails the gate; "kort division" is a G4 algorithm; `[NSR-FLAG]` |
| da | `{n} : {d} = {q} rest {r}` · rest | never | F5 "pa tallinjen" | the shipped da stories say "del ligeligt": F1 must not reuse it |
| no | `{n} : {d} = {q}, rest {r}` · rest | never | F0 "malingsdivisjon", F1 "delingsdivisjon" (LK20 names both) | bokmal; 4. trinn key; comma: panel |
| fi | `{n} : {d} = {q}, jaa {r}` · jaa | never | F3 "meneeko tasan"; F5 "lukusuoralla" | nominative numerals only, no case slot; "jaa" vs "j.": one form; `[NSR-FLAG]` |

## D. DATA + GATES

`data/b3/division.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` (the `apply-b2-locale.js` pattern; `data/` gitignored, force-add):
```
DIV[loc] = {
  notation: { op: ':' | '÷' | '/', template: '{n} : {d} = {q} R {r}',   // inline only; casita ignores template
              remainderWord: 'R', exactWord: 'geht auf', restPill: 'Rest',
              boxStyle: 'inline' | 'casita',                              // pt "chave", it "in colonna" = casita geometry
              kinds: { quotative: 'Aufteilen', partitive: 'Verteilen' } | null },
  strings: { 'G3-377': {title, instruction}, F1..F5: {title, instruction} }
}
```
Numbers are code: `pickItem(rng, {divisors, nMax, minR})` draws `d`, then `q >= 1`, then `r` in `minR..d-1`, sets `n = q*d + r`, rejects `n > nMax` and duplicate `(n, d)`; F3 draws `r = 0` for `exactCount` items and shuffles; F4 derives the shown pair from the true pair by kind.

**`tools/validate-b3-draft.js` (division block; exit 1 on any):** (1) `template` contains each of `{n}{d}{q}{r}` exactly once, no digit, and contains `op`; (2) `op` in `{':', '÷', '/'}`; **(3) sv: `op !== '÷'` and no string in the block contains `÷`**; (4) `remainderWord` 1..8 chars; `restPill` + `exactWord` present or F3 flagged refused; (5) `boxStyle` in the enum; (6) 6 titles <= 70, worksheet-word guard, unique in band, each = head + one element (a title equal to the family head or to a shipped G3-309 / G3-372..374 title FAILS); instructions <= 150 with an end mark; (7) `kinds` null or both keys.

**`qa/verify-b3-division.js`:** renders face x 11 locales at d2; `verify()` empty; `qa/lints.js` clean; floors asserted (icons >= 36, numerals >= 22, boxes >= 40 tall, F5 hop >= 24 px); 20-seed sweep: F0/F1 >= 3 distinct divisors per page, F2 remainders not constant, F3 exact items not all first or last, F4 error positions vary, F5 landings take >= 3 values. **Poison cases (each must FAIL; the unpoisoned build is the control and a poison that does not flip its assertion fails the gate itself):** P1 item stamped `r = d` (`13 : 4 = 2 R 4`) · P2 the quotient printed as text inside its item · **P3 the sv page rendered with `op:'÷'`** · P4 `n !== q*d + r` (q one too big) · P5 F3 `data-lcs-exact="1"` with `r = 2` · P6 F4 shown pair equals the true pair · P7 F5 with a printed `[data-lcs-hop]` at d2 · P8 F0 d2 with `[data-lcs-ring]` present.

**`tools/gate-variation-distinct.js`** needs the b3 wave file + rows; expected 5 distinct d2 configs (poison: F2 with `mode` removed -> equals the base -> FAIL). The page reads `DIV[loc]` only: never `number-words.js`, never a frame bank.

## E. SEO

| face | title pattern (de / es / sv / fi examples) | meta MIDDLE (the instruction; description 120-170) | coordinate |
|---|---|---|---|
| F0 | head + ring: "Teilen mit Rest: Gruppen einkreisen" / "Divisiones con residuo: encierra los grupos" / "Division med rest: ringa in grupperna" / "Jakojaannos: ympyroi ryhmat" | Ring groups of the same size in each pile, then write how many groups and how many are left over | `{type:key, mode:null, theme:<t>, level:<G3 key>}` |
| F1 | head + share: "Verteilen mit Rest" / "Repartir con residuo" / "Dela lika med rest" / "Jaa tasan, mika jaa yli" | Deal the pile into the boxes one at a time; write how many each box gets and how many cannot be shared | theme `<t>` |
| F2 | head + practice: "Division mit Rest Ubungen" / "Ejercicios de division con residuo" / "Division med rest: ovningar" / "Jakojaannos: harjoituksia" | Twelve divisions, every one leaves something over; write the answer and the remainder in each row | theme `''` |
| F3 | head + exact: "Geht die Division auf?" / "Division exacta o con residuo" / "Gar det jamnt ut?" / "Meneeko jako tasan?" | Decide whether each division comes out exactly; circle your choice and write the remainder, 0 if there is none | theme `''` |
| F4 | head + error: "Teilen mit Rest: Fehler finden" / "Encuentra el error en la division" / "Hitta felet: resten ar for stor" / "Etsi virhe jakolaskusta" | Each division has been worked out wrongly; find what is wrong and write it correctly underneath | theme `''` |
| F5 | head + line: "Teilen mit Rest am Zahlenstrahl" / "Division con residuo en la recta numerica" / "Division med rest pa tallinjen" / "Jakojaannos lukusuoralla" | Start at the marked number and hop back in equal jumps until a whole jump no longer fits; write the jumps and the landing | theme `''` |

h1 = title; eyebrow = the level label (en: "Grade 4 standard, Grade 3 practice"); strand per section A via the `strand-names.ts` NBT row; JSON-LD `educationalAlignment` en only, `targetName:'4.NBT.B.6'`, no `targetUrl`; `topicMeta[key]` + `skill-sentences.<loc>.json[key]` registered x11.

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*, the gate measures): F0 vs G3-309 (`division-equal-groups`; copy says "left over" in every sentence, never "share equally") 0.20 · **F1 vs G3-309 (same picture idiom; the remainder box + leftover home are the difference) 0.35, the pair to measure first** · F0/F1 vs G3-372/373 stories 0.10 · F2 vs the `arrays-multiplication` G3 hub landing 0.10 · F5 vs G3-310 (copy says "no longer fits", never "to zero") 0.30 · F3 vs G3-311 0.05 · any face vs the it/pt money "resto" 0.05. Boundary sentence on every landing: "Every division on this page leaves something over; nothing comes out exactly" (F3: "half of them do, and deciding which is the task").

## F. OPEN QUESTIONS + summary

1. **en level key.** No `grade-4` key exists (`LEVEL_KEYS`, LEVELS map, hub gate); the design keys `grade-3` with honest Grade 4 prose + 4.NBT.B.6. Adding `grade-4` is a route-map + hub decision outside this type; the operator rules.
2. **`÷` already ships in Swedish** on G2-216/217, G3-309/310/311/369 (measurement 2). A one-line sibling `[FIX]` (`OP(loc === 'sv' ? '/' : '÷')`) should ride the same wave; this type's P3 guards only itself.
3. **es/pt casita at d2.** Both locales' school form is the box; the inline fallback is legal data the panel will likely reject, so `primitives/division-box.js` is on the critical path for es/pt (it optional). One render before any copy claims a level.
4. **de band** (`2-klasse` vs `3-klasse`) and **it band** (seconda in riga vs terza in colonna) are panel calls; both keys are legal for `verify-hub-type-rows.js`.
5. **F1 vs G3-309** (*est.* 0.35): if the gate reads higher, F1's copy leads with the leftover home ("the box that gets nothing"), never with sharing.
6. **F0 loops across a row break.** If the operator's render dislikes them, d2 switches to `layout:'scatter'` at n <= 24 (config only) and d3 takes n <= 30.

**Summary.** G3-377 is the LEFTOVER: ring groups of d on a pile and write quotient and remainder (F0), deal into d boxes with a home for what cannot be shared (F1), twelve notation rows (F2), exact-or-not with r = 0 admitted (F3), a worked division whose remainder is too big (F4), and hops back on a number line that stop above zero (F5). Every item is `n = q*d + r`, `0 <= r < d`, re-derived from stamps, no answer printed, and the notation is a per-locale template (de `R`, fr `= (d × q) + r`, es/pt casita, sv `/` with `÷` banned by gate). Divisor sets are the `unitAxis` fan; exact sharing (G3-309), printed hops (G3-310), stories, the long-division algorithm and divisibility rules are rejected as owned or above the ceiling. Register the key + slugs x11; the hub gate expects 6 rows per locale (5 where F3's exact-word is refused).
