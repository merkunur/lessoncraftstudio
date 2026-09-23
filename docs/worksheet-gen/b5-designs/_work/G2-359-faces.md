# G2-359 `word-parts`: the five faces (Phase E, 2026-09-23)

Contract: `G2-359-word-parts.md` §3 (faces) + §5 (gates); rules `_FACE-BRIEF.md` + `_BUILD-BRIEF.md`.
All five are **CODE faces on the base's one knob `mode`**. The base config says `mode: 'base'` and composes byte-identically. A face config goes to `buildFace()` in the base spec; `verify()` reads the page's `data-lcs-mode` and hands a face page to `verifyFace()`. Every face guard keys on the face's OWN keys: `need()` throws on a missing one, and never falls back to the base keys that ride along from the row spread (base poison PR8 now proves exactly that).

## Files
| file | change |
|---|---|
| `tools/b5var-rows/word-parts.js` | NEW: 5 rows (titles and instructions read from the bank), extra `gradeBand` G1 / G2 / G2 / G3 / G3 |
| `types/g2/G2-359-prefixes-suffixes-and-root-words.js` | `buildFace` / `verifyFace`, `REFUSED_FACES`, `FACE_KEYS`, a gate-only `ctx.facePlan` poison seam; the base path is untouched |
| `templates/components-b5/word-parts.js` | appended `wordPartGrid`, `wordPartFlexStone`, `wordPartPicCard`, `wordPartRootCard`, `wordPartPrefixKey`, `wordPartPrefixRow`, `wordPartPersonCard`, `wordPartFamilyBlock`, `wordPartSocketJoin` |
| `data/b5/word-parts.js` (gitignored, force-add) | `picFamilies` (12, F1), `rootFamilies` (cheer, power, rest; F2 only), F5 sentences for help / care / joy, `exemplar.F1` / F2 / F5, face strings |
| `qa/verify-b5-word-parts.js` | validateBank covers rootFamilies and picFamilies and adds rule 14b; PR8 was re-aimed; calls the face gate |
| `qa/b5-word-parts-faces.js` | NEW face gate |
| generated `types/{g1,g2,g3}/G1-397 G2-375 G2-376 G3-398 G3-399-*.js` | emitted by `tools/gen-b5var-specs.js` |

## Faces

### F1 G1-397 `root-words-with-pictures`: CODE `mode:'picture-family'`
- **Knob:** `{cards:6, bricks:3, foils:2, picPx:72, brickH:44, px:20, cols:3, rows:2, stoneMinH:88, picMax:150}`.
- **The child:** names the picture on the stone and circles the one brick of three that is built from that word.
- **Owns:**
  - verify re-derives the member: exactly one brick CONTAINS the card's picture word, and it must equal the hidden role stamp.
  - foils share 2 initial letters with the root; the root word is never in visible text.
  - slots stay ≤ 2 per slot and are not a staircase, measured on the SHIPPED page.
  - G1 floors: brick 44, text 20, drawn picture 72.
  - node check: the pinned picture, each member signed, each foil a signed look-alike that belongs to no family.
  - poisons: PR3 (staircase 012012), SL1 (all members in slot 0), FLR1 (picture 60), P20 (look-alike "sunk"), P21 (member "sunflower"), AP1, SP1.
- **PNG:** `out/dev/G1-397-null-d2-en.png`.
- **Deviations (measured):**
  - (1) §3 sets no family size for F1, and the build record showed the base floor of ≥ 7 members is unreachable. F1 therefore reads its own `picFamilies`: ≥ 1 derived member that CONTAINS the root, and ≥ 3 look-alikes. Twelve roots: sun, cloud, hair, hand, tooth, drum, book, fish, flower, rock, star, leaf.
  - (2) **A foil may NOT contain the root.** The design's example foil "sunk" was rejected: a G1 child who circles "sunk" (it has "sun" in it) has broken no rule they can apply. The rule gives exactly one answer by construction and lets verify re-derive it.
  - (3) Every picture was OPENED (`scratchpad/wp-f1-sheet.png`):
    - refused `spring/rain` (a raining cloud: a child names "cloud");
    - refused `At the Supermarket/milk` (reads as a bottle);
    - refused `At the Supermarket/salt` (the jar prints SALT);
    - dropped `At the Supermarket/cheese` (cheesy drops the e);
    - used `camping/rock` over `beach/rock` (the beach rock is purple);
    - used `christmas/star`;
    - cloud pins `spring/cloud` (a plain pale-blue cloud). `weather/cloud` is the "pink faced blob" nt10-D refused, and is now in `F1_REFUSED`, so validateBank fails if it is pinned. `weather/cloudy` was rejected because its vocab word is the answer `cloudy`.
    - `sleepover`, `restroom`, `cheerleader`, `caregiver`, `helpline` and `playtime` are in no locale's compound-words bank (checked).
  - (4) FILL: a fixed 88 px stone left about 110 px of blank per card at 814. The stone is now `wordPartFlexStone`, which GROWS and takes the picture from 72 up to 150. It is an HTML body plus two tab SVGs drawn at the primitive's exact dovetail (base 12, tip 18, depth 8, stroke 3; zoom-checked).

### F2 G2-375 `find-the-root-word`: CODE `mode:'root-word'`
- **Knob:** `{cards:9, worked:1, members:3, memberPx:18, stoneGlyphH:24, cols:3, rows:3, brickH:36, stoneH:44}`.
- **The child:** sees three members as a small wall, circles the part they share, and writes the root in the empty stem socket. Card 1 is the worked example: its stone is printed in inkSoft, and a coral 2.5 px ring (an HTML span, so it hugs the real glyphs) circles the stem in each member.
- **Owns:**
  - verify re-derives the root as the longest string ALL three members contain, and it must equal the stamp;
  - each open stone is an empty lined socket-stem; the root is not in any open card's visible text;
  - only the worked card rings (3 rings); no two cards share a family;
  - node check: the worked stem shares no 3-letter string with any card, and every word is a signed member.
  - poisons: PR2 (open stone printing its root), WR1 (two cards of one family), AP2, SP2.
- **PNG:** `out/dev/G2-375-null-d2-en.png`.
- **Deviations:**
  - (1) 9 distinct families are needed, and the base bank holds 8. `rootFamilies` (cheer, power, rest) is kept apart from `families` so the base's seeded draw stays byte-identical. validateBank caught `powerhouse` containing "use" and it was replaced with `powerlessness`.
  - (2) The composer requires the three members' longest common part to equal the stem. Without that, careful / carefully / carefulness would share "careful".
  - (3) The minimum card height is 210, not the design's 214. At 214, the fi677 fixture overflowed by 3 px (measured); the three gaps are 4 px and space-between grows them.

### F3 G2-376 `prefixes-re-pre-mis`: CODE `mode:'prefix-key'`
- **Knob:** `{keySize:3, rows:8, eachPrefixUsed:2, rowH:60, rowGap:6, keyPx:24, glossPx:17, basePx:20, socketH:44, glyphH:24}`.
- **The child:** reads the meaning, picks the prefix from the key (re-/again, pre-/before, mis-/wrongly) and writes it in the empty socket-prefix snapped onto the base stem brick.
- **Owns:**
  - the socket is bound to its row and empty; the base brick is ≤ 140 px;
  - the joint overlap is measured (10.75 px: socket stroke 2.5 + stem 3);
  - no key prefix appears as a token in the rows;
  - node check: exactly one key prefix fits each row's crossCheck, and `prefix + base === word`;
  - each prefix answers ≥ 2 rows;
  - answer tells on the shipped page: no 3 in a row, not grouped, no period-3 cycle.
  - poisons: PX1 (a gloss printing "re"), AT1 (grouped), AT2 (cycle), FL2 (rows 80 px at 677), AP3, SP3.
- **PNG:** `out/dev/G2-376-null-d2-en.png`.
- **Deviations:**
  - (1) The row badge is the face's own 28 px teal disc: the shared `countBadge` is `position:absolute` and stacked all eight badges in the page corner (read on the first render).
  - (2) The joints share one column (fixed jointW), so the empty pieces line up.
  - (3) SP3's first version (rows spread by space-between) measured about 38 px at 814 and was SILENT. The face holds little slack, so the poison now drops every row away from the key.

### F4 G3-398 `who-does-it-person-words`: CODE `mode:'who-does-it'`
- **Knob:** `{cards:8, cols:2, rows:4, picPx:96, basePx:18, brickH:36, socketW:200, socketH:52, glyphH:26}`.
- **The child:** looks at a portrait from the pronouns bank, reads the base word beside it (bake, run, music, cash…) and writes the person word (baker, runner, musician, cashier) in an empty flat word socket. No suffix piece is drawn.
- **Owns:**
  - portrait loads at ≥ picPx; base brick ≥ 36 / text ≥ 17; the socket is empty, lined and glyphH ≥ 26;
  - singer and musician are never on one page;
  - node check: `depicted` comes from the pronouns bank; the answer is `answer[depicted] || any`; the base is contained in the answer; the answer is never printed; the occupation label is never printed.
  - poisons: SM1, AN1 (a base brick printing "baker"), FL1 (cards packed at 814), AP4, SP4.
- **PNG:** `out/dev/G3-398-null-d2-en.png`.
- **Deviations:**
  - (1) The title is "Who Does It? The Person Word", not the bank's earlier "Suffix -er". musician and cashier are not -er words, so the old title was false on some pages.
  - (2) The portrait box grows from 96 to 150 and the socket from 52 to 104 (FILL).
- **Refusals:** es and fr THROW (RF1, RF2).

### F5 G3-399 `root-words-in-sentences`: CODE `mode:'family-in-sentence'`
- **Knob:** `{blocks:2, perBlock:4, coursePx:18, brickH:40, stoneH:36, stonePx:22, sentPx:18, rowH:48, gapH:40, glyphH:24}`.
- **The child:** takes the four members on the course above a narrow root stone and writes each into the one sentence its word class fits.
- **Owns:**
  - exactly one gap per sentence, all the same width and empty;
  - no "a"/"an" before a gap (en);
  - course bricks ≤ 147 px;
  - node check: each gap's slot is carried by exactly one course word; every member is used once; the course is a derangement of the sentence order; every sentence equals its bank frame; each member is printed once.
  - poisons: PR9 ("an {gap}"), DR1 (course in sentence order), AP5, SP5.
- **PNG:** `out/dev/G3-399-null-d2-en.png`.
- **Deviations:**
  - (1) The pool is 5 families (play, act, help, care, joy; exemplar.F5 is now a pool, not a pair). With only play + act, every page would print the same two blocks.
  - (2) Sentence text is a `<div>`. A `<p>` cannot hold the socket's `<div>`: the parser closed it, and verify crashed on the first render.
  - (3) The title stays "Root Words in Sentences" (the allocation's "One Family…" was dropped: no "famil…" head in any en string).

## Rules added to validateBank
- rootFamilies get every per-family rule, plus the cross-stem check.
- picFamilies:
  - opened, resolving, not B&W, not a refused picture;
  - ≥ 1 derived member that contains the root;
  - ≥ 3 look-alikes that share 2 initial letters, do not contain the root, and belong to no family;
  - rules 3 / 8 / 11 apply; G1 brick fit.
- exemplar.F2 ids exist.
- **Rule 14b:** an en instruction may name only the apparatus nouns drawn on that face (`APP_PRESENT`). Poisons AP1-AP5.
- Rule 13 still bans "word famil" in every string, and the face gate re-asserts it on every face title / instruction / strings.en.json entry.

## Refusals (lower `hub-expectations.json` in Phase 4)
- **es F4, fr F4** (G2-316 already builds the agent nouns) and **fi F3** (Finnish derivation is suffixal; `epä-` is G2-320's). The spec THROWS via `REFUSED_FACES`.
- Contingent per design §3:
  - sv F3 needs keySize 3 × ≥ 2 transparent rows;
  - da F4 needs ≥ 8 opened, transparent pairs.
- New from the bank shape: every locale needs ≥ 6 `picFamilies` whose member CONTAINS the root (the vocab word of the picture). Locales whose derivation changes the root's spelling (fi gradation, de umlaut) may fall short of 6 containing members. Their panels must either author enough, or F1 refuses that locale (the composer throws on fewer than 6 cards).

## Open items for the panels
- F1: EN look-alikes are simple words; a panel must keep every look-alike free of the root string. `hair` shows a girl with an arrow at the hair, allowed by the pedagogy; watch for children naming "girl".
- F4: the portraits' webp padding makes the figures read smaller than their 96-150 px boxes. They still read, but a panel reviewing at print size should confirm.
- F3: the socket-prefix writing row is about 58 px wide (fits "mis" at glyphH 24). Longer key prefixes (fr `sous`, it `sotto`, no `gjen`) take the 110 px ceiling. Check at print.
- F5 frames in non-en locales: the article-before-gap check is en-only in verify; the per-locale agreeing determiners need the panels' list.

## Gate lines
- `node qa/verify-b5-word-parts.js` → **PASS (1441 assertions, 53/53 poisons killed)** (quick: PASS 1154, 53/53).
- Face renders: all 5 faces × own / 814 / 722 / 677 are clean. Worst ink band 32 px (F5 at 811); fill 100 % at 814; nothing past the body at 667.
- `node tools/gate-variation-distinct.js --batch=b5 --diffs=2 --family=word-parts` → `every variation differs from the deck its base publishes and from its siblings`.
- `node tools/b3-baseline.js --check --quick` → `checked build 3880 + enum 277: 4 drifted`. All four drifts are other families' base FILL work, announced by the lead: G1-376, G1-377, G1-379, and G1-380 (accepted). **No G2-359 drift**: the base is byte-identical.
- `node i18n/build-en.js` → 718 types, title lint clean.
- PNGs read, in colour and greyscale (`out/dev/G2-359-gate/*-gate-own-grey.png`). No clipping and nothing under the footer. Silhouettes carry the roles in grey. Each face does what its title says.
