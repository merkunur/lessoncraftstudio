# G1-380 `digraphs`: DESIGN B (2026-09-23)

Designer B. Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (lock row 8 + the digraphs ruling), the `digraphs` sections of the four `_work/_selection-*.md`, `_work/G1-380-pedagogy.md` (content, faces, validator: taken as given except where §1/§7 argue a visual change), `templates/components-b3/letter-of-the-week.js` (`positionKey`, `positionCard`, `letterChips`), `templates/components-b3/sound-boxes.js` (`soundBoxes` wide box + tie arc, `hakDots`), `templates/components-b3/spelling-rules.js` (header), `templates/components-b3/ordinal-numbers.js:151` (`blankNumeralBox`), `primitives/_svg.js` (exports `esc attrs el svgRoot roundedRect line circle label tickRow`), `primitives/_tokens.js`, `page/page.css` (`.ws-match` :354, `.ws-blankbox` :445), `page/shell.js` (`buildPage`). Renders LOOKED at: `out/b3-sweep/en/` G2-315, G2-325, G2-326, G1-306, G1-333, G1-311, K-318, K-326.

**Everything in §2 was DRAWN and LOOKED AT.** A throwaway mock (`scratchpad/G1-380-B-mock.js`) builds each body with `page/shell.js buildPage` (the shell's Baloo 2 / Nunito woff2 loaded from `file://`, puppeteer 703×945, DPR 1) and measures body height, overflow and glyph widths; renders `scratchpad/G1-380-B-{base,base_de,base_fi,base_fi4,base_stress,f1,f2,f2_de,f3,f4,f5,grey}.png`. (m) = measured in that mock; *est.* = the engineer re-measures in `render/one.js`. Two defects found by looking are fixed below (F2 wire stubs read as hyphens "S-( )-af"; F4 sockets under the G1 44 px floor). No em-dashes.

## Boundary

NOT G2-315/G2-324..328 `spelling-rules` (coral round rule chips in a dashed rule box, a spaced-out word with dashed letter boxes: one sound, which SPELLING). NOT G1-306/G1-330..334 `syllable-reading` (the teal-framed word CARPET of tiles with a coral rime, blends as two-sound units). NOT K-318 `sound-boxes` (one dashed box per sound; a 1.5×-wide box with a teal TIE ARC under it for a multigraph; nl hak-stippen dots): this family draws no box row, no arc, no dot per sound. NOT G1-311 `letter-of-the-week` (trace one unit, circle 4 of 8 cream picture cards, write a row). NOT K-326 position of a single letter (three tiny squares over three dashed square boxes). Visual signature: **the SOUND BEAD.** A letter team is always printed inside ONE capsule-shaped bead (a stadium, fully round ends); two or three letters, or a Finnish long vowel, share one bead because they make one sound. On the base the beads hang on horizontal wires between two teal rails: the page is a **Sound Abacus**. One shape, three states, used identically on all six faces: **tealSoft-filled bead = given**, **white bead with a teal ring = a choice**, **dashed coral bead = your pencil goes here**. A teacher across the room reads "an abacus of letter beads" and cannot mistake it for a card grid of chips (spelling-rules / letter-of-the-week), a tile carpet (syllable-reading) or a row of boxes (sound-boxes).

## 1 Page concept (base)

**"Digraphs sh, ch, th: Which Letter Team?" = the Sound Abacus.** One teal-framed abacus fills the body. Across its top wire hang the three KEY beads, big and tealSoft (the page's three sounds, "sh · ch · th"). Below, eight wires run between a left and a right teal rail. At the left end of each wire, outside the rail, sits one picture in a small cream cap; on each wire the same three beads are threaded in the SAME columns as the key. The child says the picture's name and colours in the one bead on that wire whose letters make the sound they hear. Nothing else is on the page: no word, no box, no line to write on.

Why this is the top-quality concept:
1. **The shape carries the idea.** "Two letters, one sound" is the whole lesson (RF.1.3.a; Lautgruppe; dígrafo; son complexe; tweetekenklank; pitkä vokaali). A bead is one object; putting `sh` or `sch` or `eau` inside ONE bead says "one sound" without a word of language, and a Finnish `aa` in a bead is literally a LONG bead: the fi re-target (long vowel = one sound written with two letters) gets the metaphor for free.
2. **One focal apparatus, calm.** One frame, eight parallel wires, beads in three straight columns: the eye reads a grid of choices without a single card border or badge. Whitespace sits between beads on the wires, not in dead card corners. The mock (base, base_fi4) shows the page reading as one object at both 766 and 677 px bodies.
3. **The answer mark is the unit itself.** Colouring a bead = choosing a sound; a teacher checks eight rows by column in five seconds (a coloured bead in the wrong column, or two coloured beads on one wire, is visible from the doorway).
4. **Language-free apparatus.** The only characters on the body are the team letters (data, identical in every page of a locale) and the row numerals. A long locale cannot grow the body; only the chrome grows (budgeted at 677).
5. **Pencil-first:** colouring a 76×44 capsule is a K/G1 fine-motor task, easier than circling a 48 px chip in a crowded card.

**Child's sentence (en source, 80 chars):** "Say the name of each picture. Colour in the bead with the letter team you hear." Names only apparatus on the page (pictures, beads, letter teams). The panel authors one literal for BEAD per locale (§6); never "circle", "box", "tick", "write", "line".

## 2 Layout (d2, 722 body)

Body budget 722 (three-line title + three-line instruction) and checked at **677** (four-line fi title): the mock `base_fi4` (4-line title, 3-line instruction) renders body 677, content 677, **0 overflowing nodes (m)**. `.ws-body` flex column; the abacus is `flex:1 1 auto`; rows are `minmax(68px, 1fr)` so slack goes into row height, never into empty bands. Lane 639 at the default padding (no override).

```
abacus frame 639 wide (data-ws-content), border 3 teal, r 16, fill white, padding 8 / 12 / 10 / 12
content width 639 - 6 - 24 = 609
x (content):  0    20        88   104                                         609
              | #  | cap 68  | 16 |<----------------- wire zone 505 --------------->|
                                   rail L (teal 3)                        rail R (teal 3)
key row  h 60:                     ===( sh )=========( ch )=========( th )===        key wire teal 3 @ y 30
                                      92x52 tealSoft, Baloo 2 700 32 ink
row 1  minmax(68,1fr):  1 [pic60] |----( sh )-------( ch )-------( th )----|         wire grid 2 @ bead mid
                                      76x44 white, teal 2.5, Baloo 2 700 26 ink
 ...   gap 4
row 8                   8 [pic60] |----( sh )-------( ch )-------( th )----|
column centres (from wire-zone left): 505 x 1/6, 3/6, 5/6 = 84.2 / 252.5 / 420.8
vertical at the minimum: 3 + 8 + 60 + 8 x 68 + 7 x 4 + 10 + 3 = 656 <= 677 <= 722
at 722: rows grow to 76.25; at 766 (two-line chrome, en mock) to 81.8
```

- **Row numerals** Nunito 800 14 `inkSoft`, left-aligned in the 20 px column (≥ 9 px floor). **Picture cap** 68×68, fill cream, 2 px `creamDeep`, r 12, icon 60×60 `object-fit:contain` (≥ G1 `minElement` 44). Rotation 0 (a rotated picture on a wire looks broken).
- **Rails**: two vertical teal 3 px bars, r 2, at wire-zone x 0 and x 505, from the key wire (y 30 of the key row) to the bottom of row 8. Every wire spans rail to rail exactly (the mock drew them 10 px past the left rail: fix in the build; verify asserts wire x1/x2 = rail x ±0.5).
- **Key row**: teal 3 px wire across the wire zone at y 30; three key beads `teamBead({text, w:92, h:52, mode:'given', fontPx:32})` centred on the column centres.
- **Row beads**: `teamBead({text, w:76, h:44, mode:'choice', fontPx:26})`, centred on the column centres and on the row's wire (grid 2 px). Bead 44 high = the G1 44 px floor; team text 26 px = the G1 answer floor 26. Air between neighbouring beads 168.3 − 76 = 92 px; outer beads 46 px from the rails.
- **Glyph fit (m, Baloo 2 700, shell woff2):** at 26 px `sh` 27.5 · `ch` 27.6 · `th` 25.2 · `ph` 30.0 · `ng` 29.5 · `sch` 40.3 · `au` 28.8 · `ei` 21.2 · `eu` 29.0 · `pf` 26.0 · `nh` 30.0 · `lh` 22.2 · `qu` 29.9 · `ou` 30.0 · `on` 30.0 · `oi` 22.1 · **`eau` 42.9 (widest)** · `gn` 29.5 · `oe` 29.1 · `ui` 22.0 · `aa` 27.7 · `uu` 29.9 · `ää` 27.7 · `ii` 14.2 · `yy` 28.1 · `oo` 30.1 · `ee` 28.2; at 32 px `sch` 49.6, `eau` 52.8; at 64 px `sch` 99.1, `eau` 105.5. Rule (asserted by the primitive): measured text width ≤ `w − 24`; the widest team `eau` leaves 16.5 px each side in a 76 bead, 19.6 in a 92 key bead.
- **Chrome budget:** body text is team letters + numerals only; no locale-dependent body height.

## 3 Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `wires` (items) | 6 | **8** | 10 |
| `teams` | 2 (`sets.exemplar[0..1]`) | **3** (`sets.exemplar`) | 3 |
| `perTeam` | [3, 3] | **[2, 3]** | [3, 4] |
| `maxRun` (same answer column on consecutive wires) | 2 | **2** | 2 |
| `iconPx` / cap | 64 / 72 | **60 / 68** | 48 / 54 |
| `rowMin` | 80 | **68** | 56 |
| `bead` (w×h, font) | 88×48, 28 | **76×44, 26** | 76×44, 26 |
| `keyRow` | true | **true** | true |
| column centres | 505 × 1/4, 3/4 | **505 × 1/6, 3/6, 5/6** | 1/6, 3/6, 5/6 |
| `requireFoilLetterInWord` | false | **false** | true (a foil team's single letter occurs in the word: en `thumb` holds the `h` of `sh`/`ch`) |
| `showWord` | false | **false** | false |

d3 at the minimum: 3 + 8 + 60 + 10 × 56 + 9 × 4 + 13 = 680: **3 px over 677**, fine at 722; d3 is unpublished, and if it is ever published its key row drops to 52 (`keyRow` h 52, key bead 84×46). d2 is the best page: three sounds, eight decisions, the biggest pictures that fit 677. Guards key on the config (`d.teams`, `d.requireFoilLetterInWord`), never the level index.

## 4 Answer-hiding + uniqueness

- **Nothing on the page prints the answer.** No word, no first letter, no letter count: all three beads on a wire are identical in size (76×44) whatever the team's length, so bead width cannot tell `sch` from `ch`. Columns are in ONE fixed page order (`sets.exemplar` order), identical on every wire and under the key.
- **Order is not a cue.** The seed places answers so that each column answers `perTeam` 2-3 of 8 wires, no column wins more than `maxRun` 2 consecutive wires, and (measured on the SHIPPED seed, which ships to the locale's page) column-by-row is not monotone (reject a staircase 0,1,2,0,1,2…: verify rejects any page where the answer column sequence equals `i mod 3` or its reverse for ≥ 6 consecutive wires).
- **Uniqueness (pedagogy rule, verbatim):** on every wire exactly one page team is an ELEMENT of the word's signed `seg`, and no other page team occurs in the word even as a letter substring (en `toothbrush` with `th`+`sh` on one page FAILS). d3's `requireFoilLetterInWord` (unpublished) requires a foil team's single LETTER to occur in the word (en `thumb` holds the `h` of `sh` and `ch`), never the foil TEAM.
- **The child marks:** colours in one bead per wire. **A wrong answer is visible:** a coloured bead outside the answer column, two coloured beads on one wire, or a coloured key bead (tealSoft already reads as "done"; verify does not need to police the child).
- **Stamps:** root `data-lcs-face="base" data-lcs-teams="sh|ch|th"` + `data-ws-content`; each wire `data-lcs-wire="<i>" data-lcs-key="<vocabKey>" data-lcs-seg="sh|i|p"` (`|`-joined signed segmentation) `data-lcs-answer-col="<j>"`; each row bead `data-lcs-bead="<team>" data-lcs-col="<j>"`; each key bead `data-lcs-keybead="<team>"`. No `<text>` of the word anywhere.
- **verify(page):** re-derive each wire's answer = the unique page team ∈ `seg`; FAIL on 0 or ≥ 2; `data-lcs-answer-col` equals it; per-column counts within `perTeam`; `maxRun` and the staircase check; every wire carries the page's teams in page order; **geometry measured on the render:** every row bead of column j has its centre x within ±0.5 px of key bead j; all row beads have identical w/h; each bead's measured text width ≤ w − 24; wires start/end at the rails ±0.5; body ≤ available height; pictures resolve (throw, never blank).

## 5 Primitives / components

**Reused (exact).** `positionKey({idx, cell})` (`templates/components-b3/letter-of-the-week.js`, F4, cell 12) · `blankNumeralBox({w, h, answer, attrs})` (`templates/components-b3/ordinal-numbers.js:151`, F5) · `.ws-match` / `.ws-match-col` / `.ws-match-item(--plain)` / `.ws-match-dot(--left/--right)` (`page/page.css:354-391`, F3) · `svgRoot el roundedRect line label` (`primitives/_svg.js`) · tokens `cream creamDeep teal tealSoft coral white ink inkSoft grid`, stroke `primitive 3 / grid 1.5 / accent 4`, density `K 56/30`, `G1 44/26`, `G23 36/22` · `lib/b3-picture-index.js pictureFor/hasPicture` (themeless) · `lib/b5-common.js bank('digraphs', loc)` (pedagogy §D).

**NOT used.** `soundBoxes` / tie arc / `hakDots` (K-318's signature; a digraph page that looks like sound boxes invites the "count the sounds" move that K-318 owns) · `letterChips` (square Baloo chips = letter-of-the-week face 6 look) · `positionCard` (its square boxes are K-326; F4 keeps only `positionKey`) · spelling-rules `gapWord`/`ruleBox` (the spaced-letter-plus-dashed-boxes word is G2-315's picture) · `cardGrid` on the base (every neighbour is a card grid; the abacus is the point) · `answerBox` (stamps `undefined` without an answer) · `unitAxis` / theme axis (themeless, pedagogy §A).

**NEW primitive `primitives/team-bead.js`** (pure SVG, token palette, px geometry, no scaling of stroke):
```
teamBead({ text = '', w, h, mode = 'choice' | 'given' | 'blank', fontPx, lines = false, stubL = 0, stubR = 0, wire = 'grid', data = {} })
  -> { svg, width: w + stubL + stubR, height: h, textW }
viewBox 0 0 (w + stubL + stubR) h ; sw = 2.5 ; rx = (h - sw) / 2 ; capsule rect x = stubL + sw/2, y = sw/2, w - sw, h - sw
  mode 'choice' : fill white,    stroke teal  2.5 solid          (a choice)
  mode 'given'  : fill tealSoft, stroke teal  2.5 solid          (key / bank / target / F3 inline)
  mode 'blank'  : fill white,    stroke coral 2.5 dash '6 5'     (pencil here; F2 gap, F4 socket)
  text          : Baloo 2 700 fontPx, fill ink, x = centre, dominant-baseline central (+1 px optical drop)
  lines         : (blank only) baseline grid 1.5 at y = round(0.72 h), dotted midline grid 1.5 dash '3 4' at y = round(0.42 h),
                  both from x = stubL + 0.7 rx to stubL + w - 0.7 rx
  stubL/stubR   : wire segment 0..stubL and (stubL+w)..end at y = h/2, stroke grid 2 (only where a wire exists; never in a word)
throws: h < 34 ; w < h ; text && textW > w - 24 (textW measured with the shell font metrics table the family ships,
        primitives/team-bead.widths.json, generated by tools/measure-team-beads.js from the woff2 like measure-font-metrics.js)
stamps: data-lcs-bead-mode, data-lcs-bead-text (choice/given only), plus `data`
```
Minimum sizes by band: K bead h ≥ 56 (F1 uses 128), G1 h ≥ 44, G2 h ≥ 36. Letters never below the band's answer floor (K 30, G1 26, G2 22).

**NEW components `templates/components-b5/digraphs.js`** (behind the `components-b5.js` barrel):
- `soundAbacus({teams, wires:[{src, vocabKey, seg, answerCol}], iconPx, rowMin, bead:{w,h,fontPx}, key:{w:92,h:52,fontPx:32}})` → the §2 frame (base).
- `beadNecklace({teams:[a,b], left:[3], right:[3], iconPx:100, bead:{w:200,h:128,fontPx:64}})` → F1 stage.
- `beadBank({teams, bead:{w:90,h:52,fontPx:32}, gap:20})` → a short teal-3 wire with given beads (F2).
- `gapWordRow({src, pre, post, bead:{w:96,h:50}, wordPx:32, n})` → F2 row: numeral, cap, word letters with ONE blank bead inline, **no stubs** (§9).
- `beadWord({pre, team, post, px:32})` → HTML inline word: `pre` + `<span class="dg-bead">team</span>` + `post` (F3); `.dg-bead`: inline-flex, height 42, padding 0 7, margin 0 2, border 2.5 teal, radius 21, background tealSoft, same font as the word.
- `socketWire({team, bead:{w:70,h:40}, socket:{w:56,h:44}, keyCell:12})` → F4 right column: the given team bead, then three positionKey-topped blank sockets threaded on one grid-2 wire.
- CSS: one additive class `.dg-bead` in `page/page.css` (palette tokens only) or inline style (engineer's choice; inline avoids touching page.css).

## 6 Locale slot structure

- **Body text surfaces:** team letters inside beads (data: `sets.*`, never translated, Baloo 2 700); row numerals (Nunito 800 14 inkSoft); F2 printed word letters (Baloo 2 700 32, the locale's approved word, de nouns keep the capital: "S" + bead + "af", "Schildkröte" row prints capital-initial words whole); F3 words (Baloo 2 700 32); F5 sentences (Nunito 800 26/52). **No label pills, no bank words, no body prose** on base/F1/F2/F3/F4.
- **Longest-locale reserve:** body is length-neutral except F2/F3 word width and F5 sentence lines. F2 (m): "Schildkröte" 165, "Eichhörnchen" 198, "Schneebesen" 192, "Fledermaus" 169, "chaussette" 160, "jääkaappi" 140 at Baloo 32 (whole words); the gap row has 501 px of lane, the widest de word with `sch` in a 96+6 bead ≈ 280 *est.* (≥ 40 % reserve for every 12-letter word: `maxLetters:12` ≈ 210 + 102). F3 item 250 wide: 11-letter words ≈ 184 incl. the bead (m "Schildkröte" 165 + 19). F5: text lane 501 px, ≤ 2 lines at 26 px, so a sentence is capped by RENDERED line count (verify), not by characters; the en draft "She has a shell and a shiny shoe in her bag." = 473 px at 23 px (m) ≈ 535 at 26 = 2 lines; de/fi sentences run ~35 % longer and the panel writes shorter sentences (4-7 words), never a smaller font.
- **The BEAD noun** is one literal per locale, authored by the panel inside each instruction (no slot, no inflection by code): en bead · de Perle (fem.: "die Perle", "Male die Perle aus") · fr perle (fem.) · nl kraal (de) · fi helmi (object case written out: "Väritä helmi", partitive "helmeä" where the sentence needs it) · pt: **panel call**, "conta" is the standard BR word but is ALSO the maths word for a sum ("conta de somar") on a page next to maths pages; "miçanga" is unambiguous but colloquial. If a panel rejects any bead noun, the fallback instruction names the letter team only ("Colour in the letter team you hear"), which stays true because the team IS inside the bead.
- **Fonts:** Baloo 2 700 for every letter a child decodes (beads, F2/F3 words): the display face reads as "letters to look at". Nunito 800 for numerals and F5 connected text (reading font, as every sentence page in the house). Font floor: smallest body text 14 px (row numerals); lint floor 9.
- **Glyph coverage:** all team strings in the shipping locales (a-z, ä, ö, ü, é, è) render in the shell Baloo 2 subset (m: `ää` drawn cleanly at 26 and 32, base_fi). `œ` never appears (fr `œu` excluded by the pedagogy inventory; it would need a measured render).

## 7 Five variation faces (b c d e f)

All five are CODE faces (a new `mode` branch in `build()` + `verify()`), per the pedagogy; each changes what the child DOES and the resolved d2 config (`mode`, item count, apparatus) differs from the base on every key the gate compares. Ids from `tools/alloc-b5var-ids.js`: F1 K-3xx (TBD by the emitter, K-371+), F2/F3/F4 G1-3xx (G1-381+), F5 G2-3xx (G2-360+).

**b · F1 "Sort by Letter Team" (K, `mode:'sort-two'`): the Hanging Necklace.** Delta: no abacus; one vertical string (grid 3 px) hangs down the centre of a 639×600 stage (x 319.5, y 8..592, teal knots r 6 at both ends) with TWO giant choice beads threaded on it (`teamBead` 200×128, Baloo 64, centres y 150 and 430). Three picture caps 120×120 (icon 100, K floor 56) stand down each side (x 8 and 511, centres y 100 / 290 / 480), each with a 12 px coral start dot 10 px inside its inner edge; the child draws a line from each picture to its bead. 600 ≤ 677 (m). The middle pair sits exactly between the beads (y 290 = (150+430)/2); the top and bottom pictures are NEAR one bead, so **proximity must not answer**: of the four non-middle pictures exactly two go to their near bead and two to their far bead, and each side carries both teams (verify both). d2 `{pictures:6, bins:2, split:[3,3], iconPx:100, bead:{w:200,h:128,fontPx:64}, nearFar:[2,2]}`. Specimen (all opened): left ship·chair·fish, right cheese·sheep·chick, beads sh (top) / ch (bottom): ship near, fish far, cheese far, chick near. Verify: `data-lcs-bin-of` per picture = the K-set team ∈ seg; bins === `sets.k`; split 3/3; nearFar 2/2. Query face: "+ kindergarten/Vorschule/maternelle/educação infantil/kleuters/esikoulu" + sort.

**c · F2 "Write the Missing Letter Team" (G1, `mode:'gap'`): the Empty Bead.** Delta: a `beadBank` on top (teal-3 wire 360 wide, three given beads 90×52, Baloo 32, centres 75/180/285, 56 high + 12 margin, no frame); below, 8 rows `minmax(64,1fr)` with a 1.5 px dashed `creamDeep` separator: numeral 22 · cap 64 (icon 54) · 28 air · the word in Baloo 2 700 32 ink, letter-spacing 1, with the team replaced by ONE blank bead 96×50 (`lines:true`: baseline at 36, dotted midline at 21, so the child writes on a mini school line; writing height top-to-baseline ≈ 28 ≥ G1 26), 3 px air each side, **no wire stubs**. **Change vs the pedagogy (argued):** the pedagogy asked for per-letter dashed boxes padded to the longest bank team so the count does not leak; one bead per team is leak-proof by construction (identical 96×50 on every row, `sch` and `ch` alike) AND teaches the point (the team is written as one unit), where three boxes teach "three letters". Min height 56 + 12 + 8 × 64 = 580 ≤ 677. d2 `{rows:8, bankTeams:3, perTeam:[2,3], gapBead:{w:96,h:50,lines:true}, wordPx:32, maxLetters:12}`. Verify: `data-lcs-gap-from/len` = the team's seg span; every gap bead identical w/h (±0.5, measured); frame uniqueness `pre + t + post` for every other bank team is not an approved word (pedagogy); the team letters never printed in the row. Query face: missing digraph / fehlende Buchstaben / complète avec le son / vul de klank in / puuttuva pitkä vokaali.

**d · F3 "Read and Match" (G1, `mode:'match'`): Beads in Words.** Delta: `.ws-match` two columns (padding 6 30): left 6 plain items 250×92 printing a word in Baloo 2 700 32 with the team inside an inline given bead (`beadWord`, height 42, tealSoft) instead of the pedagogy's coral underline (an underline is the one mark a child already reads as "write here" on this site; the bead keeps the family's one symbol); right 6 cream items 120×92, icon 80; `.ws-match-dot` coral dots. Min 6 × 92 + 5 × 12 + 12 = 624 ≤ 677. d2 `{pairs:6, teams:3, perTeam:2, wordPx:32, iconPx:80}`. Verify: `data-lcs-pair` both sides; derangement (no word in its picture's row); 2 words per team; ≤ 10 letters; each word's bead text === its team ∈ seg. Query face: read digraph words / Wörter mit sch lesen / lire des mots / leia palavras com dígrafos / lees en koppel.

**e · F4 "Where Is the Letter Team?" (G1, `mode:'position'`): the Three-Socket Wire.** Delta: `cardGrid`-shaped 2 × 4 cards 313×150 (the one face that stays in cards, because each item has its own team): picture 92 at left; right column 185: the item's team as a given bead 70×40 (Baloo 26), then three blank sockets 56×44 (G1 floor 44) threaded 8 px apart on one grid-2 wire (184 wide), each under a `positionKey` (cell 12: first / middle / last square filled). The child colours the socket where the team is heard. Heights 40 + 10 + 12 + 4 + 44 = 110 ≤ 134 inner; 4 × 150 + 3 × 12 = 636 ≤ 677. vs K-326: capsule sockets on a wire + a team bead, never square boxes and never a trace model. d2 `{cards:8, posSplit:[[2,3],[2,3],[2,3]], iconPx:92, socket:{w:56,h:44}}`. Verify: `data-lcs-pos` re-derived from seg minus `silent` tags; each position 2-3 times; one given bead per card === a team of `sets.exemplar`. **pt REFUSED** (pedagogy: no word-final nh/lh). Query face: beginning, middle or end digraph / Wo hörst du sch? / où entends-tu le son / waar hoor je de klank / missä kohdassa.

**f · F5 "Letter Teams in Sentences" (G2, `mode:'text'`): Make the Beads.** Delta: no pictures. A header shows the ONE target team as a big given bead 104×58 (Baloo 36), centred; below, three sentence lanes (cream, 2 px `creamDeep`, r 14, padding 10 14): numeral 14 · the sentence in Nunito 800 26 px on a 52 px line (13 px of air above and below each line so a pencil ring never crosses the next line), ≤ 2 lines · `blankNumeralBox({w:56, h:52})` at the right. The child rings every instance of the team: each ring they draw makes a bead like the one in the header (the family symbol becomes the child's own mark). Min 58 + 16 + 3 × 128 + 2 × 20 = 498 ≤ 677, `space-evenly`. d2 `{sentences:3, target:sets.exemplar[0], hitsPerSentence:[1,4], total:[5,8], textPx:26, lineH:52, maxLines:2}`. Verify: count per sentence = the target's elements in the signed token seg (never `split`); the numerals never printed; every sentence renders ≤ 2 lines (measured). Query face: digraphs in sentences / sch in Sätzen / le son ou dans un texte / tweetekenklanken in zinnen / pitkät vokaalit lauseissa.

**Why these five:** they are the pedagogy's five moves (categorise by ear at K, produce, read, locate, find in connected text), each a different verb on the SAME unit, so the family looks like one family and every page teaches "one bead, one sound". **First to cut: F4** (the highest cannibalisation pair, ~0.20 with K-326; refused in pt; its position question is the least specific to letter TEAMS).

**Hub contract (restated).** Each face appears under `digraphs` on `/[locale]/worksheets` only if `apps.digraphs` + `axes['exercise-type'].digraphs` (slug + name ×11) exist, exactly one landing per face per shipping locale has `coordinate.type === 'digraphs'`, `coordinate.theme: ''`, the face's `mode` (`base` · `sort-two` · `gap` · `match` · `position` · `text`), the band's level key and `canonicalDeckSlug`, and the landing JSON is committed + deployed. Expected rows (pedagogy): en de fr nl fi 6 each, pt 5 (F4 refused), es it sv da no 0 = **35**; gate `scripts/verify-hub-type-rows.js` reading `hub-expectations.json`.

## 8 Two alternatives + recommendation

**Alt 1: "Team Jerseys".** Each letter team printed on one T-shirt silhouette (a team wears one shirt), eight picture cards with three shirts each. Rejected: a shirt reads as a PICTURE on a page whose items are pictures (the library draws clothing: `clothing/shirt`, opened); a 3-letter team stretches the shirt into an odd shape; the Finnish long vowel gets no "long" reading; and the page is still a card grid.

**Alt 2: "Sound Buttons" (the UK phonics convention: a dot under each single-letter sound, a bar under a digraph) under the whole printed word.** Pedagogically strong and a real classroom convention, rejected for three reasons: it prints the word (the base must not); it needs a signed PHONEME segmentation of every grapheme of every word, silent letters and vowel teams owned elsewhere included (en `cheese` = ch|ee|s|e-silent, fr `loup` p silent), a data surface the pedagogy does not have and a panel cannot sign at 35 × 8 items; and dots-plus-bar under a word is visually one step from K-318's boxes-plus-tie-arc and nl hak-stippen.

(Also considered: the pedagogy's literal layout, 8 cards × 3 chips; it is the house default and from across the room is indistinguishable from G2-325, K-326 and G1-311.)

**Recommendation: the Sound Bead / Sound Abacus.** One capsule does all six jobs in three states (given / choice / blank), its geometry encodes the lesson (one bead = one sound, whether 2 or 3 letters; a long vowel is a long bead), it needs no language on the body, it survives a black-and-white printer because the states differ by FILL and DASH, not hue, and the abacus gives the family a signature no neighbour shares. Measured to fit 677 with the pictures at 60 px.

## 9 Risks, mitigations, print check

- **Monotony of 24 identical row beads.** Mitigated by the tealSoft key row (the only filled beads), wide 92 px air between beads, and wires in light `grid` (the beads carry the contrast). If the critic judges it heavy, a CODE knob `rowLetters:false` (empty choice beads under the key) exists as an option but is NOT recommended: at wire 8 a G1 child would have to track 400 px up to read a column.
- **Child colours a key bead.** The key beads are pre-filled tealSoft ("already done"); the instruction says each picture's bead. Harmless to scoring.
- **Colouring over letters.** Pencil shading over Baloo 26 ink stays readable (the letters are darker than any pencil fill); the teacher reads the COLUMN, not the letters.
- **Wire stubs misread as hyphens** (found in the F2 mock: "S-( )-af"): stubs exist only on wires, never inside a word (the primitive's `stubL/stubR` default 0; `gapWordRow` never sets them).
- **Proximity cue on F1** (top picture near top bead): the 2 near / 2 far rule + both teams per side; verify measures it on the shipped seed.
- **F4 vs K-326 look-alike:** capsule sockets on a wire + a team bead, square boxes and trace models absent; still the first face to cut.
- **Greyscale (m, `G1-380-B-grey.png`):** teal rings and ink letters stay near-black; tealSoft fill becomes a light grey that still separates "given" from white "choice"; dashed coral becomes a mid-light grey dash (the house `.ws-blankbox` convention, legible). No state depends on hue. `positionKey`'s tealSoft fill is faint in grey but its teal stroke vs grid stroke differs (inherited from K-326).
- **Pencil space:** base bead 76×44 to colour; F2 bead 96×50 with a mini school line; F4 socket 56×44; F5 52 px lines + 56×52 box.
- **Cut lines:** none on any face.
- **Pictures (OPENED 2026-09-23, `scratchpad/G1-380-B-pics{1,2}.png`):** usable: `vehicles/ship`, `animals/sheep` and `farm animals/sheep`, `pets/fish`, `furniture/chair`, `breakfast/cheese`, `body parts/thumb` (a thumbs-up hand), `body parts/tooth`, `easter/chick`, `furniture/bench`, `pets/mouse`, `classroom/book`, `around the house/key`, `forest creatures/frog`, `pets/turtle`, `clothing/shoe` (a loafer), `clothing/shirt`, `zoo animals/sloth`, `vegetables/tomato`, `around the house/oven` (a cooker; fi uuni), `beach/wave`, `around the house/pillow`, `fruits/pear`, `accessories/cape`, `vehicles/car`, `body parts/mouth`. **Do NOT use:** `fruits/peach` (reads "apple"), `fruits/cherry` (a single red fruit that reads "apple"), `christmas/chimney` (draws a FIREPLACE: en ch item fails), `farm animals/donkey` (zebra-striped legs: fi `aasi` risks "seepra"). Every bank item still needs `picOpened:true` from the panel.
- **What lint catches:** overflow, font floor 9, palette, blank page (`data-ws-content`). **What only the family verify catches:** bead sizes/alignment, answer distribution, uniqueness, F1 near/far, F2 uniform gap bead, F5 line count. **What only a human eye catches:** whether each picture says ONE word in the locale, whether 24 beads feel calm, whether the bead noun reads naturally.

## 10 Summary

1. Signature: the SOUND BEAD, one capsule holding a letter team (2-3 letters or a fi long vowel) because it is ONE sound; three states given (tealSoft) / choice (white, teal ring) / blank (dashed coral).
2. Base = the Sound Abacus: key beads on the top wire, 8 picture wires with the same 3 beads in fixed columns, colour one bead per wire; fits 677 (m), pictures 60, beads 76×44 / 26 px.
3. Faces: F1 Hanging Necklace (K, 2 giant beads, lines, 2 near/2 far), F2 Empty Bead (one leak-proof write-in bead, not letter boxes), F3 Beads in Words (read & match), F4 Three-Socket Wire (position; first to cut; pt refused), F5 Make the Beads (ring every team in 3 sentences, count).
4. New code: `primitives/team-bead.js` + `templates/components-b5/digraphs.js` (soundAbacus, beadNecklace, beadBank, gapWordRow, beadWord, socketWire); reuses positionKey, blankNumeralBox, .ws-match.
5. Hub 35 rows (en de fr nl fi ×6, pt ×5); four opened pictures banned (peach, cherry, chimney, donkey).
