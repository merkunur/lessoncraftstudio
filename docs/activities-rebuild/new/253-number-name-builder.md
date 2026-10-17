# New 253 — The Name Rail: word tiles that pour their blocks, where "-teen" adds a ten and "-ty" turns the ones into tens (2.NBT.A.3)

## 0. Identity
- **id** `number-name-builder.play.2-nbt-a-3` · grade 1 (CCSS 2.NBT.A.3, read and write numbers using number names; 1.NBT.B.2 underneath) · strand Number & Operations in Base Ten · key `number-name-builder` → `number-name-builder-core.js`, `number-name-builder-activity.js`, `number-name-builder-activity.html`, `number-name-builder-activities.json`. Start with `node scripts/new-activity.js --num=253`.
- **Worksheets covered:** G1-210 Number Words · G1-223 Number Words to 20 · G1-224 Tens in Words: 10 to 100 · G1-225 Match Numbers to Words · G1-226 Number Words to 50 · G1-227 Write the Number Words.

## 1. The pitch
"A number casts a shadow of its tens and ones under an empty name rail; every word tile you snap into the rail pours its blocks into that shadow — 'six' pours six cubes, '-teen' adds a ten-rod, '-ty' stretches the six cubes into six rods — and the name is right only when the blocks fill the shadow exactly."

## 2. Why a child will want it again
- **Tiles that do things.** A word tile is not a label: "six" tips and pours six little cubes, *tik-tik-tik*. Snap "-ty" on behind it and the six cubes *stretch* — each one grows into a long rod with a rubbery *boing* (300 ms). Snap "-teen" instead and one rod rolls in beside the cubes. It is a toy made of words.
- **The shadow puzzle.** The numeral's quantity lies under the rail as dashed outlines (rod-shaped and cube-shaped holes). Blocks that fit drop into their outlines with a click; blocks that do not fit lie on top, tilted, overhanging — the mismatch is a picture, not a sentence.
- **Sixty for sixteen looks wrong at a glance:** six rods sprawl over a shadow with room for one rod and six cubes. Children start *predicting* the stretch before they snap the tile.
- **The read-out.** When the shadow is filled, the rail glows, the tiles slide together into one written word (or the locale's spaced/hyphenated form), and the numeral and the word light together; the word is spoken where TTS works.
- **Free play:** the tile tray stays open after each round; the child can build any name and watch what it pours (no shadow, just the blocks and the numeral they make appearing above the rail).

## 3. The skill and the misconception
- **Skill:** read and write number names to 20, the decade names to 100, and two-digit names to 50 (2.NBT.A.3; G1-210/223–227), understanding that the parts of a number name say how many tens and how many ones.
- **Misconception 1 — "-teen" vs "-ty"** (sixteen ↔ sixty; de *sechzehn ↔ sechzig*, nl *zestien ↔ zestig*, sv *sexton ↔ sextio*, fi *kuusitoista ↔ kuusikymmentä*). **Pushback:** the suffix tiles are transformers with opposite effects: "-teen" *adds one ten* to the ones; "-ty" *turns the ones into tens*. Built wrong, the blocks overflow the shadow immediately.
- **Misconception 2 — ones-first languages make children write the digits backwards** (de *sechsundzwanzig* → "62"; nl *zesentwintig*, da *seksogtyve*). **Pushback:** the tiles are snapped in spoken order (sechs, und, zwanzig) and the blocks still fall where they belong — the six cubes into the ones shadow, the two rods into the tens shadow — so spoken order and written order are visibly different things without anyone saying "the digits are swapped".
- **Misconception 2b — the over-regular name** ("oneteen", "twoteen", "fiveteen", "fourty"; de "zweizig", nl "driedertig"). **Pushback:** the blocks of "one · -teen" really are 1 rod and 1 cube, so the shadow *fills* — but the rail does **not** light: the tiles refuse to slide together into a word, they stay apart with a visible seam, and the whole tile *eleven* (or the stem *for*) in the tray rises and glows. The quantity was right; the language has its own name. This is the one case where the blocks agree and the word still fails, and the apparatus shows exactly that — full shadow, broken rail.
- **Misconception 3 — vigesimal and irregular names are decomposed wrongly** (fr *soixante-dix* read as 60 + 10 = 610; da *halvtreds*). **Pushback:** *soixante* pours 6 rods and *dix* pours 1 more rod into the same tens shadow — 7 rods; *quatre-vingts* pours 4 bundles of 2 rods (a multiplier tile); da *halvtreds* is one tile that pours 5 rods (never decomposed — Danish children learn it whole).

## 4. The stage
**At 704 px (stacked):**
- **The numeral** (top centre, 72 px Baloo 2) on a small card, or — in "read" direction — the word on the rail and an empty numeral card.
- **The name rail** (620 × 72): a wooden rail with 1–4 sockets that grow as tiles snap in; tiles join edge to edge and render as one word (en "sixteen", "twenty-six" with its hyphen appearing between "twen-ty" and "six" automatically; fr hyphens; pt/it/es spaces and *e/y*).
- **The shadow** (under the rail, 620 × 200): dashed outlines — rod outlines (26 × 130) on the left half, cube outlines (26 × 26, rows of five) on the right half; the numeral's quantity, no more.
- **The tile tray** (bottom, 620 × 120): 6–8 tiles (each ≥ 64 × 48, words 22 px Nunito), always including the round's confusable partner tile. Tile colours by role, never by correctness: ones words cream, tens words honey, suffix tiles teal (with a small rod/arrow glyph: "+▮" for -teen, "▪→▮" for -ty), joiners (and/und/og/en/y/e) grey and narrow.
- **Task line** (≤ 24 px), EN: **"Build the name of the number."** (read: **"Read the name. What number is it?"**)
- **Words on the apparatus** are only number-name parts — they *are* the content.

**At 360 px:** numeral card 56 px; rail 336 × 60 (tiles 56 × 44, text 18 px; long names wrap the rail onto two rows); shadow 336 × 150 (rods 18 × 90, cubes 18 × 18); tray in two rows (44 px tall tiles). Check above the 740 fold. At 320: tiles 52 × 44, shadow 300 × 140.

## 5. The hand
- **Snap a tile:** drag a tile from the tray to the rail (or tap it — it joins the end of the rail). It clicks into the next socket (≤ 100 ms) and then *acts* (150 ms later): a ones word pours k cubes toward the shadow (70 ms each); a tens word pours k rods (110 ms each); "-teen" rolls one rod in; "-ty" stretches the cubes poured by the tile before it into rods (300 ms); a multiplier tile (fr *vingts* after *quatre*) turns the k cubes of the tile before it into k bundles of 2 rods; a joiner pours nothing (it is the glue the name needs).
- **Blocks land:** each block slides to a free outline of its own shape (rods to rod outlines, cubes to cube outlines) and clicks in. With no free outline left, it lands tilted on top of the shadow, overhanging, glowing faintly coral.
- **Reorder / remove:** drag a tile within the rail to move it; drag it out to the tray (its blocks fly back into it). A suffix tile with no ones tile before it cannot act: it sits in the rail greyed (nothing to add to / stretch).
- **Read direction:** the name is on the rail; its tiles are closed (they do not pour). Two buttons under the shadow, **+▮** and **+▪** (64 × 48), add a rod or a cube to the child's own build in the shadow; tap a block to remove it; the keypad writes the numeral. On Check, the rail's tiles open and pour their blocks beside the child's.
- **Undo:** everything returns to the tray by dragging out; "Clear" (curved arrow) empties the rail.

## 6. The rounds
**Setting "Numbers: to 20"** (G1-223, G1-210), 9 per pass, each with its confusable partner tile in the tray:
| # | numeral | EN tiles (rail) | partner tile in tray |
|---|---|---|---|
| 1 | 16 | six · -teen | -ty |
| 2 | 13 | thir · -teen | -ty |
| 3 | 19 | nine · -teen | -ty |
| 4 | 11 | eleven | one, -teen |
| 5 | 15 | fif · -teen | -ty |
| 6 | 12 | twelve | two, -teen, twen, -ty |
| 7 | 18 | eigh · -teen | -ty |
| 8 | 14 | four · -teen | for, -ty |
| 9 | 17 | seven · -teen | -ty |
**Setting "Numbers: tens to 100"** (G1-224): 60 (six · -ty | -teen) · 30 (thir · -ty | -teen) · 90 (nine · -ty | -teen) · 40 (for · -ty | four, -teen) · 80 (eigh · -ty | -teen) · 50 (fif · -ty | -teen) · 70 (seven · -ty | -teen) · 20 (twen · -ty | two, twelve) · 10 (ten | one, -teen) · **100** (one hundred — one whole tile that pours ten rods already bundled as one flat; partner tile *ten*, which pours one rod). The 100 tile per locale is the shared table's word: en *one hundred*, de *hundert*, fr *cent*, es *cien*, pt *cem*, it *cento*, nl *honderd*, sv *hundra*, da *hundrede*, no *hundre*, fi *sata*. 10 rounds per pass.
**Setting "Numbers: to 50"** (G1-226): 26 (twen · -ty · six) · 41 (for · -ty · one) · 35 (thir · -ty · five) · 14 (four · -teen) · 48 (for · -ty · eight) · 33 (thir · -ty · three) · 29 (twen · -ty · nine) · 40 (for · -ty) · 17 (seven · -teen). Two teen/ty confusables per pass (14/40 here; 16/60 and 17/70 in the other passes — 70 as a partner tile is buildable but its shadow never matches in a to-50 round).
**Direction:** numeral → name (default) / name → numeral — the same round lists; in name → numeral the tray is replaced by the +▮ / +▪ buttons and keypad.
- **Tray contents:** the round's tiles + the confusable partner + 2–3 neighbours (e.g. for 16: six, -teen, -ty, five, seven, sixty is never a single tile in en). Tray order reshuffled each round; the gate measures that the first-needed tile is not in a fixed tray slot (each slot ≤ 30 % over a pass). Stem tiles (en *thir, fif, eigh, for, twen*; de *sech, sieb*) pour their cubes but never light the rail on their own.
- **The over-regular rounds:** in every to-20 pass, 11 and 12 carry *one* / *two* in the tray (so "oneteen"/"twoteen" can be built), 14 carries *for*, and in tens-to-100 the 40 round carries *four* (so "fourty" can be built) — each is a full-shadow, broken-rail case (§3, 2b), the exact spelling traps of G1-227 "Write the Number Words".
- **Order:** order-only reshuffle per pass; numerals distinct within a pass; never 0.

**Per-locale tile tables (authored by the build with a native panel; the rule below is binding):** a name may be split into tiles **only where the written word is exactly the concatenation of the tiles** (plus the locale's automatic hyphen/space); otherwise the part is one whole tile carrying its full quantity. Suffix tiles exist only where the language's school books teach the chunk.
| locale | teen chunk (adds a ten) | ty chunk (ones → tens) | joiner | whole tiles (examples) | confusable pair to include |
|---|---|---|---|---|---|
| en | -teen | -ty | (auto hyphen) | eleven, twelve, ten | sixteen / sixty |
| de | -zehn (stems *sech*, *sieb* as the book chunks) | -zig (*vier-zig, fünf-zig, sech-zig, sieb-zig, acht-zig, neun-zig*) | und | elf, zwölf, zwanzig, dreißig, *ein* (before und) | sechzehn / sechzig |
| nl | -tien | -tig | en (→ *ën* after e: *tweeëntwintig* — a whole tile "ën" variant) | elf, twaalf, dertien, veertien, dertig, veertig, tachtig, twintig | zestien / zestig |
| sv | -ton (sex, fem only) | -tio (sex, fem only) | — | elva, tolv, tretton, fjorton, sjutton, arton, nitton, tjugo, trettio, fyrtio, sjuttio, åttio, nittio | sexton / sextio |
| no | -ten (seks, fem) | -ti (seks, fem) | — | elleve, tolv, tretten, fjorten, sytten, atten, nitten, tjue, tretti, førti, sytti, åtti, nitti | seksten / seksti |
| da | -ten (seks, fem) | — | og | elleve, tolv, tretten, fjorten, sytten, atten, nitten, tyve, tredive, fyrre, **halvtreds, tres, halvfjerds, firs, halvfems** (whole, 5–9 rods) | seksten / tres |
| fi | -toista | -kymmentä | — | (fully transparent: *kuusi·toista*, *kuusi·kymmentä*, *kaksi·kymmentä·kuusi*; *kymmenen* = 10 whole) | kuusitoista / kuusikymmentä |
| fr (France) | — (17–19: *dix* + ones, auto hyphen: *dix-sept*) | — | auto hyphen everywhere, *et* as a joiner tile in 21/31/41/51/61/71 (*vingt-et-un*, *quarante-et-un*, *soixante-et-onze* — the 1990 spelling the 2016 programmes and the shared table use) | onze … seize (whole, 1 rod + k), dix (1 rod), vingt, trente, quarante, cinquante, soixante (whole); multiplier tiles **vingts** (80: *quatre-vingts*) and **vingt** (81–99: *quatre-vingt-dix*), each turning the 4 cubes of *quatre* into 4 bundles of 2 rods | seize / soixante |
| es | *dieci* (1 rod) + ones for 17–19 | — | y | once … quince, dieciséis, veinte, *veinti* (2 rods) with whole *veintidós, veintitrés, veintiséis* (accents break concatenation) | dieciséis / sesenta |
| pt | — | — | e | onze … dezenove (whole), vinte, trinta … | dezesseis / sessenta |
| it | — | — | — | undici … diciannove (whole), venti, trenta … (whole), *ventuno, ventotto, trentuno, trentotto* (whole — vowel drop) | sedici / sessanta |
In the Romance languages without teen/ty chunks the shadow still carries the lesson: *sedici* is one tile that pours 1 rod + 6 cubes, *sessanta* pours 6 rods — the confusable partner overflows just the same.

## 7. Check, the misses, the success
- **Check with an empty rail** → bubble "Snap a word tile onto the rail." (no miss).
- **Miss 1:** the overhanging blocks glow and the tile that poured them lifts and wobbles; empty outlines pulse. EN **"These blocks don't fit. Which tile made them?"**
- **Miss 2:** the numeral's own blocks ghost into the shadow (filled outlines) next to the child's, and the right suffix/partner tile in the tray glows. EN **"{n} is {t} ten and {o} ones."** (plural/singular frame per locale; decade: **"{n} is {t} tens."**)
- A new move takes the help away until the next Check.
- **Success:** the rail glows, the tiles slide into one written word, the numeral and the word light together; the shadow's blocks hop once in place. EN **"16 — six and a ten: sixteen!"** · **"60 — six tens: sixty!"** · **"26 — twenty-six: two tens and six ones!"** · read direction: **"sixteen — 16!"**

## 8. Settings
1. **Numbers:** to 20 (default) / tens to 100 / to 50 — changes the shadow sizes and the tray at rest.
2. **Direction:** numeral → name (default) / name → numeral — changes the tray to block buttons + keypad.

## 9. Words (EN source)
- title: **"The Number Name Builder"**
- instruction: **"Build the name of the number."** · read: **"Read the name. What number is it?"**
- hints: **"Snap a word tile onto the rail."** · **"These blocks don't fit. Which tile made them?"** · **"{n} is 1 ten and {o} ones."** · **"{n} is {t} tens."** · **"{n} is {t} tens and {o} ones."**
- celebrations: **"{n} — {ones} and a ten: {word}!"** · **"{n} — {t} tens: {word}!"** · **"{n} — {word}: {t} tens and {o} ones!"** · **"{word} — {n}!"** · **"100 — ten tens: {word}!"**
- over-regular hint (shadow full, rail broken): **"The blocks are right! This number has its own name."** (en *fourty*: **"The blocks are right! This name is spelled without the u."** — per locale the reviewer writes the matching spelling hint or uses the first form)
- settings: **"Numbers"**: "to 20" / "tens to 100" / "to 50" · **"Direction"**: "number → name" / "name → number"
- tile strings: the per-locale tile tables (§6), each tile a literal string authored by the native panel; the *assembled* word must equal `scripts/worksheet-gen/lib/number-words.js` `numberWord(n, locale)` (the gate checks it).
- **Locale traps:** (a) **Concatenation must be exact** — de *sechs → sech-zehn*, *eins → einund-*, nl *twee + en → tweeëntwintig*, it *venti + uno → ventuno*, es accented *veintidós*, sv/no irregular teens — handled by the whole-tile rule. (b) **no**: the shared table gives *tjueseks* (modern counting); the old *seksogtyve* is not used. (c) **pt (Brazil)** *dezesseis/dezessete/dezenove* (not European *dezasseis*). (d) **fr = France French — DECIDED:** *soixante-dix* (70), *quatre-vingts* (80), *quatre-vingt-dix* (90), exactly as `lib/number-words.js` gives; the Belgian/Swiss *septante/nonante* (and Swiss *huitante*) are not used, because the fr locale is the France school register (programmes 2016). They never appear as tiles or partners. (e) **da** decade names are vigesimal and opaque — whole tiles; the hint "is 5 tens" is the true quantity even though *halvtreds* is "half-third times twenty". (f) **fi** case: tiles are nominative (*kaksi·kymmentä* — *kymmentä* is already the partitive the compound uses). (g) Capitalisation: tiles lowercase; de nouns do not apply (number words are lowercase). (h) **Hyphens:** en "twenty-six", fr "vingt-six" / "soixante-dix" / **"vingt-et-un"** (the shared table hyphenates every fr compound, 1990 spelling — the old "vingt et un" with spaces is wrong here), es/pt spaces with *y*/*e*, it/sv/no/da/fi/de/nl closed compounds — all exactly as the shared table gives.

## 10. Sound off, access, phones
- Legible with sound off: pouring, stretching, overhanging blocks, the joined word — all visual. TTS reads the word as a bonus (5 locales).
- Keyboard: Tab to the tray; ←/→ choose a tile; Enter snaps it to the end of the rail; in the rail, Shift+←/→ moves a tile, Delete removes it; in read mode R / C add a rod / a cube.
- aria: rail `aria-label="six, -teen: sixteen"`; shadow `aria-label="room for 1 rod and 6 cubes; filled 1 rod, 6 cubes"`.
- Taps: tiles ≥ 64 × 48 at 704, ≥ 52 × 44 on phones; block buttons 64 × 48. Check above the fold at 360×740 and 320×640.

## 11. Distinct from
- **place-value-lab (tool):** the number word lights up as blocks are placed — the word is a read-out. Here the word's *parts* are the movable things and each part's quantity is shown.
- **Row 98 Zero-Swallowing Cards (this batch):** builds the written numeral from 40 and 7; here the spoken/written *name* is built, and ones-first languages are the point.
- **#7 Jar Label (built), #13 Roll Book (built):** writing numerals / reading a count; no number names.
- **heart-words / syllable-splitter (tools):** word mapping for reading, not number names.

## 12. Build plan
- **Core state:** `{ range, dir, n, tiles:[{id, text, kind:'ones'|'tens'|'teen'|'ty'|'mult'|'join'|'whole', qty:{rods,cubes}}], rail:[tileId…], shadow:{rods:t, cubes:o}, poured:{rods, cubes, overflowRods, overflowCubes}, own:{rods, cubes}, typed }`.
- **Functions:** `snap(id, at?)`, `remove(at)`, `pour()` → recomputes the blocks from the rail left to right (ones → cubes; teen → +1 rod; ty → convert the preceding ones tile's cubes to rods; mult → k cubes → 2k rods; tens → rods; whole → its qty; join → nothing), `fit()` → `{filled, overflow}` against the shadow, `word()` → assembled string, `check()` → ok iff `fit` exact **and** `word() === numberWord(n, locale)`.
- **Gate's truth (`verify-number-name-builder-core.js`):** for every round in every locale, the rail tiles assemble to exactly `numberWord(n, locale)` and pour exactly ⌊n/10⌋ rods and n mod 10 cubes (computed independently); the confusable partner, if snapped in place of the right tile, never fills the shadow; every tile split obeys the exact-concatenation rule (string test); each pass has ≥ 2 teen/ty confusable rounds; tray slots balanced; numerals distinct; read direction accepts only n.
- **Mutations:** "-teen" stretches instead of adding · "-ty" adds one rod · joiner pours a cube · overflow blocks allowed into wrong-shape outlines · `check` accepts a full shadow with a misspelled word (de "sechszehn", en "oneteen", "fourty") · the rail lights on a full shadow with an over-regular name · partner tile missing from the tray · da *halvtreds* split into tiles · fr *vingt-et-un* assembled without hyphens · fr *septante* present in any tray · same order twice · read direction accepts the reversed digits (62 for 26) · right tile always first in the tray.
- **Pictures:** none. **Risks:** high native load — one tile table per locale, built from `number-words.js` and reviewed by a native + pedagogy reviewer; the gate's exact-concatenation test catches every tile-table typo mechanically. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — words that pour blocks and stretch cubes into rods are a genuinely new toy.
2. **Teacher on the board?** Yes — sixteen/sixty and the German/Dutch/Danish ones-first names are the classic number-name traps, and here the blocks show the truth without a lecture.
3. **Parent trust?** Calm, wordless apparatus apart from the number words themselves, native tile tables per language.
4. **Invention:** word tiles pour their own blocks into the number's shadow — "-teen" adds a ten, "-ty" turns the ones into tens — and the name is right only when the shadow is filled exactly.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- **Every assembled word checked against `scripts/worksheet-gen/lib/number-words.js`** for all 11 locales (10–20, the decades, 26/29/33/35/41/47/48, 100). Found: the fr row followed the *old* spelling (*vingt et un*), but the shared table uses the 1990 spelling (*vingt-et-un*, *quarante-et-un*) — corrected, with *et* as a joiner tile; fr 90 needs a *vingt* (no s) multiplier beside 80's *vingts*.
- **Open question decided:** fr is France French — *soixante-dix / quatre-vingts / quatre-vingt-dix*; no *septante/nonante*.
- **A real gap closed:** "one · -teen" (oneteen), "two · -teen" and "for/four · -ty" fill the shadow exactly, so the blocks cannot catch them; the design's check would reject them silently with the "blocks don't fit" hint — false. Now a named case: full shadow, broken rail, the whole tile glows, its own hint. These are exactly the G1-227 spelling traps.
- G1-224 says "10 to 100" but the round list stopped at 90: 100 added (one whole tile pouring a flat) in every locale's word.
- Stem tiles (thir, fif, eigh, for, twen; sech, sieb) never light the rail alone.
