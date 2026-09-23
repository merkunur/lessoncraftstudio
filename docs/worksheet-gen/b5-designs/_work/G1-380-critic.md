# G1-380 `digraphs` : EDITOR-CRITIC record (2026-09-23)

Inputs: `G1-380-pedagogy.md`, `G1-380-design-A.md` ("The Sound Bar", Team Table), `G1-380-design-B.md` ("the Sound Bead", Sound Abacus, built in the real shell). Output: `../G1-380-digraphs.md`. Rule: measured buildability > preference; the brief > both. Scratch (all `G1-380-` prefixed, session scratchpad): `owned.js` / `owned2.js` (spelling-rules, syllable-reading, letter-of-the-week bank keys per locale), `hunt.js` (approved + pictured words by regex per locale), `vocab2.js` (whole vocab incl. unapproved), `sheet.js` (contact sheets `crit-no.png`, `crit-fi.png`, opened with the Read tool). The editor also opened B's renders `B-base_fi4.png`, `B-f1.png`, `B-f2_de.png`. No em-dashes.

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base: 8 cards x 3 chips | A: Team Table (captain tiles + rows of quiet tiles). B: Sound Abacus (key beads on a wire, 8 wires between rails) | **B's abacus** | measured in `page/shell.js` at 677 with 0 overflow (m B; I opened `base_fi4.png`: one calm object, columns read at a glance); A is unmeasured in the shell; the card grid looks like G2-325 / K-326 / G1-311 |
| 2 | circle the chip | A: circle. B: colour in the bead | **circle** | pencil-only (brief); no bead noun needed in 11 languages (B's own pt "conta" = a sum problem); faster for 8 decisions; 92 px air measured holds a pencil ring |
| 3 | chips (unspecified mark) | A: capsule + coral sound bar under every tile. B: bead in three states (given / choice / blank) | **B's bead, no bar; A's "never coral letters" kept** | one shape carries the idea on every face and survives greyscale by fill + dash; a bar under a bead says "one sound" twice |
| 4 | F1 picture strip over two bins | A: two team houses, pictures in a centre column, dots both sides. B: hanging necklace, 3 pictures down each side, near/far 2/2 rule | **A's geometry with B's given bead as the house crown** | A is proximity-neutral by construction; B creates a proximity cue and patches it; B's opened render shows ~250 px of empty page above and below a 600 px stage |
| 5 | F2 per-letter dashed cells padded to the longest team | A: `gapWord` cells + a bar under the gap. B: ONE blank bead | **B's bead, one size per page (96x50, 116x50 with a 3-letter team)** | leak-proof by construction and teaches the team as one unit; `gapWord` is G2-315's visual signature |
| 6 | - | B: "S" + bead + "af" for de Schaf; bank in a dashed-coral banner; wire stubs beside the bead | **A's capital rule (`gapInitialCapital:false`); no bank frame; no stubs in a word** | opened `B-f2_de.png`: 5 of 8 rows are capital-initial sch words; the S + bead split teaches `ch` in Schaf; the dashed-coral bank reads as a place to write; stubs read as hyphens (B named it and its mock still drew them) |
| 7 | - | B: bead writing lines at 0.72 h / 0.42 h | **lines from `font-metrics.json` baloo2-700 of the word beside it** | brief: text on a writing row is sized from MEASURED metrics, never a derived factor; family gate measures baseline and mid +-1 |
| 8 | F3 coral underline | A: coral underline. B: inline tealSoft bead | **B** | the underline is this site's "write here" mark; keeps one family symbol |
| 9 | F4 positionCard with the team chip | A: tile over positionKey + dashed coral square boxes. B: team bead + three blank sockets on a wire | **B** | A's boxes are K-326's picture; B is visibly a different apparatus |
| 10 | F4 on `sets.exemplar` everywhere | A + B: same | **`sets.position` per locale (data)**; nl = oo oe ui | measured nl exemplar has 2 usable beginnings (uil; oester opened = reads as a shell; ui onion is whole-word) |
| 11 | F5 Nunito 22 / 44 | A: 24 / 48, 3 lines. B: 26 / 52, <= 2 lines | **26 / 52, <= 3 lines** | B's size (G2 22 floor with margin); a third line gives de / fi headroom and still stacks 642 <= 677 |
| 12 | uniqueness: "no other page team occurs even as a letter substring" on every item | A + B: copied it | **ear faces: exactly one team ELEMENT + no foil SOUND (`snd[]`); letter-substring rule only on print faces; F5 target never a proper substring of a token grapheme** | the pedagogy's own de exemplar sch / ch / au fails its own rule (every sch word contains c-h); and it missed the real ear defect: a foil's SOUND spelled otherwise (de `Stern` = /ʃ/ on a sch page, pt `caminhão` = /k/ on a qu page) |
| 13 | seg only | - | **`snd[]` per seg element + closed `phonemes` list** | the only data that can prove rule (b); the pedagogy already demands fr phoneme tags and silent tags |
| 14 | letter-of-the-week / sound-boxes fence moves only (flagged for the critic) | A + B: agree | **CONFIRMED** | m: G1-311 hunts one fixed unit (`graphemes.includes(unit)`), live landings ship one exemplar unit; K-318 boxes phonemes. An inventory reading refuses en and pt and protects no move. Consequences added: no trace, no single-unit hunt, no box-per-sound, and no title with the G1-311 phrasing (live h1s in en es pt sv da no, m) |
| 15 | da REFUSED: hv 5 | - | **REFUSED, with a second reason** | re-measured hv 6 incl. `hvid`; opened `colors/white` = a white paint drop ("dråbe") → 5; and silent-letter teams are not ear-unique (`hval` holds /l/, ld's sound), so the foil-sound rule leaves hv 1 |
| 16 | no REFUSED: kj 6 is the only team | - | **REFUSED, re-measured wider** | kj 6 incl. `kjegle`; opened `shapes/cone` = a frustum / lampshade → 5; diphthongs (not examined by the pedagogy) ei 11 · øy 6 · au 5 → 2 teams >= 6 |
| 17 | es REFUSED (owned) | - | **REFUSED** | bank keys verified (c-qu g-gu r-rr ll-y); only b-v ships live, but the fence must stay the bank or en ck/ee, de ie/ck, nl ei/ij, pt ch all reopen |
| 18 | it, sv REFUSED | - | **REFUSED** | re-measured (critic §3) |
| 19 | fi F4 ships, thin | - | **CONDITIONAL** | beginnings are exactly aasi / aalto / uuni; `around the house/oven` opened = a whole cooker a Finnish child may call "liesi" |
| 20 | B: `farm animals/donkey` banned (zebra legs) | - | **allowed** | opened both donkeys: long ears, reads donkey |
| 21 | - | B: d3 680 px | noted, unpublished | 3 px over 677; key row 52 if ever published |
| 22 | apps.digraphs "to register" | A + B | **already registered (en)** | Phase C `83556185` added `apps.digraphs` + en slug / name (m); ten locales remain |
| 23 | en strand "no new row" not stated | - | **reuse `'Reading: Foundational Skills'`** | exists with 11 literals (`strand-names.ts:129`, m) |

## 2 Claims removed or downgraded as unverified

- Pedagogy fr counts (ou 54, on ~45 …) stay *est.* drafts; the fr panel's phoneme tags decide.
- Pedagogy "da hv 5 (… narhval)" was correct without `hvid`; its "needs ONE more pictured word" is now "needs one more AND is the wrong category".
- Pedagogy "no kj 6": depends on `shapes/cone`, which does not show a cone.
- A's tile widths and 682 px stack: not measured in the shell; superseded by B's measured abacus.
- B's "no wire stubs" on F2: its own render drew them; now a render assertion (PR3).
- B's `rowLetters:false` option: dropped.
- The pedagogy's 0.20 F4 / K-326 Jaccard stays *est.*; the gate measures.
- Every item still needs its panel's `picOpened`; the pictures opened here cover the specimens and the refusal re-checks only.

## 3 Numbers re-measured (which won)

| number | pedagogy | design | editor (m) | won |
|---|---|---|---|---|
| en sh / ch / th raw pictured approved | 30 / 28 / 17 (screened) | - | 33 / 42 / 21 raw | pedagogy's screened (raw includes chef, tch, compounds) |
| de sch / ch / au / ei / eu / pf raw | 87 / 60 / 48 / 38 / 8 / 16 | - | 101 / 165 / 57 / 40 / 9 / 21 | both (screening explains the gap) |
| pt nh / lh / que-qui / gue-gui | 28 / 23 / 15 / 7 | - | 31 / 24 / 20 / 9 | editor; qu clean of nh / lh / c: >= 10 (basquete jaqueta mosquito panqueca caqui piquenique esqueleto esquilo banqueta aquecedor) |
| nl oe / ui / eu | 55 / 29 / 9 | - | 61 / 32 / 16 raw | pedagogy's screened |
| fi aa / uu / ää | 48 / 29 / 17 | - | 53 / 30 / 18 raw | pedagogy's screened |
| es ch / ll / rr / qu / gue-gui | 28 / 53 / 26 / 15 / 19 | - | 29 / 53 / 26 / 15 / 8 | editor (19 included gua) |
| it gn / gl / sc / ch / gh / qu | 12 / 22 / 40 / 36 / 11 / 8 | - | 12 / 22 / 13 (sce, sci) / 36 / 11 / 8 | editor for sc |
| sv tj / kj / dj / gj / hj / lj | 1 / 1 / 1 / 0 / 3 / 2 | - | same | agree |
| da hv / hj / ld / rd | 5 / 4 / 8 / 6 | - | 6 raw → 5 opened / 4 / 6 by ear (bold panel) / 6 | editor |
| no kj / hv / hj / gj | 6 / 4 / 3 / 1 | - | 6 raw → 5 opened / 5 / 3 / 1; ei 11 · øy 6 · au 5 | editor |
| pt F4 end position | 0 | - | 0 (no word ends in nh lh qu) | agree |
| nl F4 beginnings (exemplar) | not measured | - | 2 usable | editor → `sets.position` |
| fi F4 beginnings | 3 | - | 3 (aasi aalto uuni) | agree, conditional |
| base stack | - | A 636 floor / B 656 | B 656 (m B) | B |
| F2 stack | - | A 658 / B 580 | 591 with separators | editor arithmetic on B |
| F5 stack | - | A 656 / B 498 | 642 at 3 lines | editor |
| taxonomy `digraphs` | absent | absent | apps + en present (Phase C) | editor |

## 4 OPEN items

1. Native phoneme lists and `snd[]` signatures for en de pt fr nl fi (the load-bearing new data); fr is the heaviest.
2. de rail name "Buchstabengruppen" vs a "Wörter mit sch" head (Germanic panel said the de genre needs a re-probe); de `bold` / `fodbold`-type questions do not arise (da refused), but de `st` / `sp` foil exclusions need the panel's list.
3. fi `uuni` picture sign-off (F4 fi ships or falls to 5).
4. pt: whether qu belongs in a 1º ano set with nh / lh (BNCC lists it; the lock uses it).
5. nl `sets.position` = oo oe ui is the editor's proposal from measured beginnings; the nl panel signs or substitutes.
6. The bead writing lines in F2 at 116 px: whether a G1 hand fits "sch" (writable width ~63 px at 96, ~83 at 116, *est.*); the engineer measures and the de panel looks at a print.
7. da ("stumt h / stumt d") and no (kj-lyden, diftonger, stum d) belong to a future `spelling-rules` rule fan or a vocab commission that adds one approved pictured kj word and one au word; recorded, not built.

## 5 Quality verdict

I would print the base and hand it to my grade 1 class on a Monday: eight pictures, three beads that never change place, and I can mark the whole pile by running my eye down three columns. The bead does real work, a six-year-old sees that "sch" sits in one shape because it is one sound, and the long-vowel version is the best Finnish page of the set for the same reason. What would have embarrassed me is exactly what this merge took out: a German sheet asking a child to write "ch" into "S_af" under a lower-case bank, a page where "Stern" hides the very sound of the foil team, a Portuguese "caminhão" sitting on a qu page, a Norwegian "kjegle" that is a lampshade, and a Danish silent-h page where "hval" gives away the l of the next chip. I am less happy that five languages get nothing; I checked each by hand and every one fails on a number or on the ear, not on a hunch, and I would rather ship 35 honest pages than 66 with fillers. The one sheet I will look at on paper before trusting it is the German F2: the bead has to be wide enough for a real child's "sch".
