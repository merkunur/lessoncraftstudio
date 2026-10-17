# Row 45 — The Kite Tail (RF.K.2.B, en)

## 0. Identity
- id `syllable-builder.build-words-from-syllables.rf-k-2-b` (KEPT) · grade K (with Grade 1 extension levels for the mapped G1 worksheets) · Common Core RF.K.2.B · strand Reading: Foundational Skills · **locale-scoped row: ships in en only** (slug `build-words-from-syllables`; page title "Build Words from Syllables — Kindergarten Phonics" and intro frozen).
- own files: `mini tools/kite-tail-core.js`, `kite-tail-activity.js`, `kite-tail-activity.html`. Manifest row stays in `syllable-builder-activities.json` (id, slug, title, intro, alignment unchanged), `tool` → `kite-tail-activity`, `params` → the level tables of §6. 0 lines to `word-builder-core.js`, the old facade (still serving other rows) or `lcs-shell.*`.
- worksheets it covers: **K-233** Count the Syllables (L1) · **K-234** Sort by Syllables (L4) · **G1-324** Syllable Cards: Read the Word in Parts (L2 — every bow is one card, read one at a time as the wind lights it, then the kite reads the whole word) · **G1-326** Missing Syllable (L3a) · **G1-327** Syllable Scramble (L3b) · **G1-328** Two or Three Syllables? Split and Sort (L4 with the "Two or three" setting + word cards) · **G1-325** Write the Word in Syllables and **G1-305** Syllable Division (L2 with the "Write" setting) · **G1-313** Syllables and Sounds (L5, the tassels).
- what the old activity did: tap scrambled syllable tiles into slots for 30 pictures. **Kept:** the pool words whose gated split is TeX-agreed AND is the split a child says (rab-bit, lad-der, muf-fin, car-rot, bal-loon, pen-cil, pen-guin, trac-tor, pan-da, rain-bow, cup-cake, snow-man, air-plane, dol-phin, um-brel-la, but-ter-fly, fish), the blend task (L2). **Removed, with the reason recorded:** apple, turtle, candle, crayon, bicycle are not in `approved-words-en.json`; pumpkin, tiger, zebra, backpack, elephant, helicopter are approved only with a dictionary split no child says (`pum-pkin`, `tig-er`, `zeb-ra`, `bac-kpack`, `el-ep-hant`, `hel-ic-op-ter`); **starfish, sunglasses, woodpecker, hamburger are approved by the rule syllabifier only (TeX disagrees)** — the brief allows en only TeX-agreed splits, so they are out (critic 2026-10-17). **Rule for this row:** a word may SHOW its split only if (a) its gated entry lists TeX in `sources_agreed` and (b) the split equals the spoken split (doubled consonant, compound, clear VC|CV). §6 is that whitelist, typed into the gate. **Gone:** the tile tray.

## 1. The pitch
"Every word is a kite, and its tail needs one bow for every beat — with the right bows in the right order the kite climbs and flies steady; too few and it spins, too many and it sags into the grass."

## 2. Why a child will want it again (the fun)
- **A kite is the best toy in the sky.** The picture rides on a big diamond kite against a soft blue sky; a gust ripples the grass and the tail flutters. Tying a bow is a little flick: the bow swings onto the tail string, bobs twice and settles.
- **Flight is the verdict, and it is funny.** Press Check and a gust comes: with the right tail the kite climbs and hangs steady while the bows flutter one after another, each lighting its syllable — *rab … bit* — and then the word reads along the tail. Too short a tail and the kite loop-the-loops twice and dips (children laugh and add a bow); too long and the kite sags until the empty bow drags in the grass.
- **The tangle.** A wrong order ties the tail in a knot at the first wrong bow: everything from there twists into a spiral while the bows before it fly straight. The child sees exactly where it went wrong.
- **The earned show:** the kite shoots up through a cloud with a *whoosh*, a rainbow streamer of the word unrolls along the tail, and a little drawn kite token with the word written on it pins itself to **the kite line** across the top of the stage. Across a pass the line fills with a fleet of kites.
- **Free play:** between rounds the child may drag the string reel to swoop the last kite around the sky (it follows the finger, the tail swishing behind) and tap a cloud for a gust; tapping a token on the kite line replays its word bow by bow.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** count syllables (K-233), sort words by syllable count (K-234, G1-328), blend syllables read one at a time into a word (RF.K.2.B, G1-324), find a missing syllable (G1-326), put scrambled syllables in order (G1-327), write a word in syllables at the right division point (G1-325, G1-305), and count the sounds inside each syllable (G1-313).
- **Misconception 1 — counting letters or sounds instead of beats** ("fish" has four, "train" is long). Pushback: the tail must match the beats; extra bows stay blank and drag the kite down. The tail starts with one bow every round and the bows are all the same size, so nothing on the screen tells the count. Word cards (L4) include long one-beat words (train, frog) and short two-beat words (pizza, otter).
- **Misconception 2 — "the syllables can go in any order"** (bit-rab). Pushback: the wind reads the tail from the kite outward; the tail knots at the first bow out of order.
- **Misconception 3 — the missing part is always at the end.** Pushback: the bare place on the tail is first, middle or last, balanced.
- **Misconception 4 — splitting at the wrong place** (ra|bbit, sn|owman). Pushback (Write): a typed bow that is not one of the word's beats will not hold the wind — it flaps loose and the kite tilts toward it; the hint shows the boundary opening between the two middle consonants.
- **Misconception 5 (G1-313) — "a syllable is one sound."** Pushback: each bow hangs tassels, one per sound (drum = 4, da = 2); a bow with the wrong number of tassels pulls the kite lopsided.

## 4. The stage
`layout:'split'` at ≥ 700 px: the sky stage left (480), bubble column right (200).

**At 704 px** (stage 480 × 440):
- **The sky** — a rounded panel 480 × 300, pale blue `#DCEFF5`, two drawn clouds (white rounded blobs, 3 px ink outline) top-right; a grass strip 480 × 40 at the bottom `#CFE8B8` with a 3 px ink edge.
- **The kite** — a drawn diamond 150 × 180 (cream `#FBF3E4` sail, coral `#F2784B` cross-spars 4 px, 3 px ink outline) in the upper-left of the sky, holding the **library picture at 112 px** in its centre; a string line (2 px ink) runs from the kite's lower-left corner down to the **reel** (a drawn wooden spool 44 × 44, 48 × 48 hit area) on the grass at the left.
- **The tail** — a 3 px coral cord from the kite's bottom tip that streams out to the right with a gentle wave; knot points every 96 px (4 at most: centres at x 120, 216, 312, 408).
- **Bows** — drawn ribbon bows 84 × 56: two teal loops `#146B5E` and a cream centre tag 56 × 40 carrying the syllable (Nunito ExtraBold 28 px, ink). All bows are the same size. A blank bow has an empty tag.
- **The ribbon box** (L1 spare bows; L2/L3a loose syllable bows) — a drawn wooden box 470 × 100 under the sky; bows lie in it in a row, shuffled.
- **The kite line** — a thin string 470 × 30 across the top of the stage where finished words hang as drawn kite tokens (24 × 28 diamonds, the word written beside each in 14 px — no picture is shrunk: §orchestrator record ruling).
- **Task line** above (≤ 24 px); **bubble** in the right column; **Check** under the bubble.
- **L4 kite fence:** three kites (100 × 120 sails, empty frames 80 px) tethered to fence posts along the grass, with tails of 1, 2 and 3 blank bows (56 × 38); under them a card stack (picture card 112 × 132, picture 96 px; with the *Word cards* setting the card shows the word 26 px under the picture).
- **L5 tassels:** under each syllable bow a tassel rail (84 × 64) with 5 hooks; a hung tassel is a drawn coral strand 10 × 44 with a knot.

**At 360 px** (stacked): kite line hidden behind a 32 px strip of tokens · sky 336 × 240 (kite 110 × 132 with **picture 80 px**, bows 66 × 46 with syllable 22 px, knot points every 72 px from x 80 → last bow right edge 329) · ribbon box 336 × 84 · bubble · Check. L4 at 360: three kites 100 × 96 in one row (sail frames hold no picture until a card is clipped), cards 92 × 108 with picture 72 px. Check bottom ≤ 690 at 360 × 740; at 320 × 640 the kite line hides, bows 60 × 42, knot points every 64 px → Check ≤ 612.

**Library pictures** (each checked by script in the theme JSON with the en label equal to the word, and the word's gated split TeX-agreed; contact sheets seen: animals, camping, music, around the house, toys, weather, beach, breakfast, christmas): animals/fish, rabbit, penguin, dolphin, panda, raccoon · easter/butterfly · music/drum · weather/umbrella, rainbow · winter/snowman · fruits/strawberry · vehicles/bus, tractor, airplane, sailboat · breakfast/muffin · vegetables/carrot · toys/balloon, ball, train · classroom/pencil · bakery/cupcake · christmas/gingerbread · insects and bugs/dragonfly · tools/ladder · accessories/mitten · At the Supermarket/basket, popcorn, pizza · around the house/hammer · activities/basketball · camping/frog · zoo animals/otter, monkey. **Not toys/kite** (a kite picture on a kite apparatus would confuse which thing is the word).

## 5. The hand
- **Tie a bow (L1):** tap the ribbon box (or drag a spare bow onto the tail) → a blank bow flies to the next knot point (200 ms arc, a soft *flick*), bobs twice (squash 0.95 → 1, 160 ms). Tap a tied bow → it unties and drops back into the box (the bows beyond it shuffle in). 1–4 bows. Keyboard: + / −.
- **Tie a syllable bow (L2, L3a):** drag a bow from the box to a knot point; it snaps to the nearest free knot (140 ms). Drag a tied bow back to the box to untie it, or onto another tied bow to swap (220 ms arc). Keyboard: Tab through box bows, Enter ties at the first free knot, Backspace unties the last.
- **Swap bows (L3b):** drag a tied bow onto another → they trade places. Keyboard: Enter selects, ←/→ moves, Enter drops.
- **Check = the gust** (shell button, labelled "Check" by the shell): clouds slide 20 px, the grass ripples, and the kite answers (§7).
- **Sort (L4):** drag the top card onto a kite's sail. The kite tries it at once (no Check button in L4): the card's syllables blow onto its bows. Fits → the card clips into the sail and the kite rises 60 px on its string and stays there holding it. Does not fit → the kite spins or sags (§7) for 900 ms and the card slides back to the top of the stack.
- **Hang tassels (L5):** tap a tassel rail → one tassel drops onto the next hook (one per sound); tap a hung tassel → it falls off. Up to 5 per bow.
- **Write (setting, L2):** each knot point holds a blank bow; tap a bow to focus it and type its syllable on the on-screen letter keys (44 px keys, a–z) or a physical keyboard; Backspace erases.
- **Tap the picture** → the word is spoken (TTS bonus); **tap a bow** → its syllable is spoken and it flutters.
- **Free play:** drag the reel → the kite swoops after the finger (eases 120 ms, tail follows with 80 ms lag per bow); tap a cloud → a gust.

## 6. The rounds
Level picker: How many bows? · Tie the word · Fix the tail · The kite fence · The tassels. Order-only reshuffle per pass within a level, never the same order twice in a row.

**L1 — How many bows? (K-233), 10 rounds.** Blank bows; one bow on the tail at the start of every round (so the start never tells).

| # | picture | word | beats (revealed on the bows) | count |
|---|---|---|---|---|
| 1 | animals/fish | fish | fish | 1 |
| 2 | animals/rabbit | rabbit | rab·bit | 2 |
| 3 | easter/butterfly | butterfly | but·ter·fly | 3 |
| 4 | music/drum | drum | drum | 1 |
| 5 | animals/penguin | penguin | pen·guin | 2 |
| 6 | weather/umbrella | umbrella | um·brel·la | 3 |
| 7 | winter/snowman | snowman | snow·man | 2 |
| 8 | fruits/strawberry | strawberry | straw·ber·ry | 3 |
| 9 | vehicles/bus | bus | bus | 1 |
| 10 | animals/dolphin | dolphin | dol·phin | 2 |

Counts: 1 ×3, 2 ×4, 3 ×3. "Never add a bow (1)" solves 3/10; "always 2" 4/10 — both below a pass (≥ 8/10).

**L2 — Tie the word (RF.K.2.B, G1-324), 10 rounds.** The tail has as many knot points as the word has beats (marked by small open loops); the box holds the word's syllable bows plus one foreign bow, in a per-render shuffle never equal to word order.

| # | picture | word | bows in the box |
|---|---|---|---|
| 1 | breakfast/muffin | muf·fin | muf, fin, car |
| 2 | vegetables/carrot | car·rot | car, rot, fin |
| 3 | toys/balloon | bal·loon | bal, loon, pen |
| 4 | classroom/pencil | pen·cil | pen, cil, bal |
| 5 | vehicles/tractor | trac·tor | trac, tor, rain |
| 6 | weather/rainbow | rain·bow | rain, bow, cup |
| 7 | bakery/cupcake | cup·cake | cup, cake, air |
| 8 | vehicles/airplane | air·plane | air, plane, trac |
| 9 | christmas/gingerbread | gin·ger·bread | gin, ger, bread, cake |
| 10 | insects and bugs/dragonfly | drag·on·fly | drag, on, fly, bow |

Foreign bows are taken from other rounds and never make a real word with the others on screen (gate-checked: "cupbow", "carfin" are non-words). `drag·on·fly` is the gated TeX split and the closed-syllable split US K–1 teaches (drag|on); the reviewer confirms.

**L3 — Fix the tail (G1-326 / G1-327), 10 rounds, alternating a/b.**
- **a — Missing syllable:** the tail is tied except one bare knot (an open loop that flaps); the box holds 4 bows: the answer, another syllable of the same word, two foreign.

| # | picture | shown | bows in the box |
|---|---|---|---|
| 1 | tools/ladder | lad · _ | der, lad, ten, cil |
| 3 | accessories/mitten | _ · ten | mit, ten, rab, bow |
| 5 | At the Supermarket/basket | bas · _ | ket, bas, man, loon |
| 7 | vehicles/sailboat | _ · boat | sail, boat, pop, der |
| 9 | fruits/strawberry | straw · _ · ry | ber, ry, straw, cil |

Bare-knot position across a pass: last, first, last, first, middle (3 positions all used).
- **b — Scramble:** all the word's bows are on the tail, in a wrong order; swap them.

| # | picture | starting order | right |
|---|---|---|---|
| 2 | around the house/hammer | mer · ham | ham · mer |
| 4 | At the Supermarket/popcorn | corn · pop | pop · corn |
| 6 | weather/umbrella | la · um · brel | um · brel · la |
| 8 | activities/basketball | ball · bas · ket | bas · ket · ball |
| 10 | easter/butterfly | fly · but · ter | but · ter · fly |

Three-bow starts are derangements (no bow already in place).

**L4 — The kite fence (K-234; G1-328 with the setting), 9 cards per pass.** Kites fixed left to right: 1, 2 and 3 bows (the count IS the content, so the order is fixed and never tells which card goes where).

| beats | cards |
|---|---|
| 1 | toys/ball (ball) · camping/frog (frog) · toys/train (train) |
| 2 | animals/panda (pan·da) · animals/raccoon (rac·coon) · At the Supermarket/pizza (piz·za) |
| 3 | activities/basketball (bas·ket·ball) · insects and bugs/dragonfly (drag·on·fly) · fruits/strawberry (straw·ber·ry) |

*Two or three* setting (G1-328): only the 2- and 3-bow kites, 8 cards: panda, raccoon, pizza, zoo animals/monkey (mon·key) | basketball, dragonfly, strawberry, weather/umbrella (um·brel·la). With *Word cards* on, the words are shown — and the length lures are live: train (5 letters, 1 beat) vs pizza (5 letters, 2), frog vs otter.

**L5 — The tassels (G1-313), 9 rounds.** The right bows, syllables shown; hang one tassel per sound under each bow; Check drops the letters onto the tassels (one grapheme per tassel).

| # | picture | syllables | tassels per bow | graphemes on the tassels |
|---|---|---|---|---|
| 1 | music/drum | drum | 4 | d · r · u · m |
| 2 | animals/panda | pan · da | 3 · 2 | p a n · d a |
| 3 | zoo animals/otter | ot · ter | 2 · 2 | o t · t er |
| 4 | vehicles/tractor | trac · tor | 4 · 2 | t r a c · t or |
| 5 | animals/rabbit | rab · bit | 3 · 3 | r a b · b i t |
| 6 | tools/ladder | lad · der | 3 · 2 | l a d · d er |
| 7 | camping/frog | frog | 4 | f r o g |
| 8 | At the Supermarket/pizza | piz · za | 3 · 2 | p i z · z a |
| 9 | accessories/mitten | mit · ten | 3 · 3 | m i t · t e n |

"Always 3 tassels" solves 2/9; r-controlled "er/or" count as one sound (the US phonics convention; reviewer confirms).

**Write setting (L2 words, G1-325 / G1-305):** same 10 words; the child types each bow. Accepted = the gated split only. Division hints are rule-shaped: doubled consonant → split between them (muf|fin); compound → split between the two small words (cup|cake); other → "say it slowly".

**Answer position.** L1: no position. L2: box order shuffled per render, never word order; gate: "tie the box left to right" ≤ 0.25, "first box bow is the first syllable" ≤ 0.35 over 2,000 renders. L3a: the answer's slot in the box balanced across the pass. L3b: derangement starts. L4: card order shuffled; bot "always the 2-bow kite" ≤ 3/9. L5: bots "always 3", "always 2" ≤ 2/9.

## 7. Check, the misses, the success
- **Check with nothing done:** L1 "Tie a bow for every beat you hear, then let the wind blow." · L2/L3a "Tie the bows on the tail to spell the word." · L3b "Swap the bows into the right order." · L5 "Hang one tassel for every sound." (no miss)
- **L1 miss 1** — the gust blows the word's syllables onto the bows, one per bow:
  - too few: the last bow carries two syllables squashed side by side (`ter·fly`); the kite loop-the-loops twice (600 ms) and dips 30 px; a ghost bow outline pulses at the next knot. "One bow has two beats on it. Tie another bow!"
  - too many: the extra bow stays blank, the kite sags until the blank bow drags in the grass (500 ms), then lifts back. "This bow has no beat. Take it off!"
- **L1 miss 2** — the kite bobs once per beat while each syllable lights on the tail in turn (500 ms apart); TTS reads the word in syllables; ghost bows appear at the right knots. "Watch the kite bob: one bow for each bob."
- **L2 / L3a miss 1** — the gust: bows in their right place flutter level and glow softly and stay (they can still be moved); from the first wrong bow the tail twists into a knot (300 ms) and those bows hang crooked; a foreign bow flutters off and drifts back into the box. "The glowing bows are right. Fix the others." · foreign: "That bow is not part of this word." · L3a same-word bow in the gap: it slides to its own place, glows there 800 ms, then returns to the box — "That beat is in the word, but not here."
- **L2 / L3a miss 2** — the next right bow in the box glows and pulses; TTS says the word in syllables, pausing before it. "The glowing bow comes next."
- **L3b miss 1** — bows already in their place glow and stay; the rest twist. "The glowing bows are in place. Swap the others."
- **L3b miss 2** — the first wrong bow swings to its right knot by itself (swapping with whatever was there).
- **L4 (no Check):** a misfit is shown at once — word has more beats than the kite has bows: two syllables crowd the last bow and the kite spins; fewer: a blank bow drags and the kite sags. Card returns. After two misfits of the same card, the card shows one dot per beat under the picture. Hints: "This kite has too many bows for that word." / "This kite has too few bows for that word."
- **L5 miss 1** — the letters drop onto the hung tassels: a sound with no tassel hovers under its bow, glowing; an extra tassel stays bare and the bow tips lopsided toward it. "This sound has no tassel." / "This tassel has no sound."
- **L5 miss 2** — the syllable is said slowly (TTS) and each grapheme lights in turn, a tassel outline under each.
- **Write miss 1** — wrong split: the typed bows flap loose and the kite tilts; the gated boundary shows as a gap opening in the right place. "Split between the two {c}'s: {a} | {b}." (doubled) / "Split between the two small words: {a} | {b}." (compound) / other: "Say it slowly: {a} … {b}."
- **A new move takes the help away** until the next Check.
- **Success:** the kite climbs and holds steady, the bows flutter left to right lighting each syllable, the syllables slide together into the word along the tail, then the kite whooshes up through the cloud and its token pins to the kite line. Bubble: L1 "{word} has {n} beats: {s1} · {s2} · {s3}!" (n = 1: "{word} has one beat!") · L2/L3 "{s1} + {s2} = {word}!" · L4 (each card) "{word}: {n} beats!" and at the end "Every kite is flying!" · L5 "{s1}: {k1} sounds. {s2}: {k2} sounds." · Write "{word} = {s1}-{s2}". End of pass: the whole kite line flutters.

## 8. Settings
1. **Bows** (L2): Pick (default) / Write — loose syllable bows in the box, or blank bows on the tail with a letter keyboard under the sky. Visible at rest.
2. **Cards** (L4): Pictures (default) / Word cards — and **Kites**: One, two or three / Two or three (G1-328). Visible at rest (card face; number of kites on the fence).

## 9. Words (EN source; this row ships in en — one native en + pedagogy reviewer)
- Title (frozen): "Build Words from Syllables — Kindergarten Phonics"; instrument name in aria: "The kite tail".
- Instruction: "Every picture is a kite. Tie one bow on its tail for every beat, in the right order, and the kite will fly."
- Task lines: L1 "How many bows does this kite need?" · L2 "Tie the bows to spell the word." · L3a "Find the missing beat." · L3b "Put the bows in the right order." · L4 "Give each picture the kite that fits." · L5 "Hang one tassel for every sound."
- Hints, celebrations: §7 exactly. Settings: "Bows", "Pick", "Write", "Cards", "Pictures", "Word cards", "Kites", "One, two or three", "Two or three". Level names: "How many bows?", "Tie the word", "Fix the tail", "The kite fence", "The tassels".
- aria: "Kite with {n} bows on its tail" · "Bow {i}: {syllable|empty}" · "Spare bow" · "Kite with {n} bows on the fence" · "Picture: {word}" · "{k} tassels under bow {i}" · "The kite is flying" · "The kite is spinning" · "The kite is sagging".
- **Vocabulary note:** the task lines say "beat" and the instruction and intro say "syllable", so kindergarten children have a word they can feel and the teacher the term; the reviewer decides between "beats" and "parts" for US K.

**Locale traps (en):** English syllable boundaries are contested; the row only shows splits that are TeX-agreed in the gate AND spoken that way (doubled consonants, compounds, clear VC|CV); the gate fails the build if a shown split differs from `approved-words-en.json` or lacks TeX in `sources_agreed`. Four-beat words (helicopter, watermelon, caterpillar) are left out until the en gate trusts their split — recorded, not forgotten. r-controlled vowels (er, or) are one tassel. US spelling and vocabulary (airplane, not aeroplane).

## 10. Sound off, access, phones
- **Sound off:** L1 and L4 need no reading and no sound (the child names the picture); the spinning kite, the sagging kite with its blank bow in the grass, the twisted tail and the bobbing kite at miss 2 are visual. TTS is a bonus.
- **Keyboard:** §5; the kite, reel, every bow and the box are buttons with aria labels; aria-live reports "Bow {i} shows {syllable}", "The kite is flying", "Too few bows", "Too many bows", "The tail is tangled at bow {i}".
- **Taps ≥ 44 px:** bows 84 × 56 / 66 × 46 / 60 × 42 (hit areas padded to 48 high); reel 48 × 48; cards 92 × 108; tassel rails 84 × 64.
- **Pictures:** 112 px on the kite at 704, 80 px at 360 (L4 cards 96 / 72 px); the kite-line tokens carry words, never pictures.
- **Reduced motion:** loops, sags and swoops become 200 ms tilts; the order reading stays one bow at a time.
- **Phone:** stacked; the fence's three kites sit in one row; the kite line hides at 320.

## 11. Distinct from
- **Row 51 The Syllable-Family Lock (pt)** — rolling wheels and a keyring; this row had a combination lock with dials and a key ring until the 2026-10-17 critic pass and was rebuilt as the kite so the two never share an invention. No dials, no lock, no keyring here.
- **Rows 44, 46–50 (this batch):** chop a clay snake, pull a telescope, lace buttons, lay stepping stones, hook a picture chain, topple dominoes — the kite is the only one whose verdict is BALANCE in the air (spin / steady / sag), and it carries all nine worksheet routines in one apparatus.
- **Row 47 The Lacing Board** — both have a cord, but there the child threads a path through scattered buttons and the lace keeps the right prefix; here bows are tied on a tail of fixed knot points and the verdict is flight.
- **Rows 52 (photo) / 53 (marble run)** — no picture strips, no rolling track.
- **Rows 29 / 109 (music box, punched roll)** — no crank, no holes, no melody.
- **New #215 The Bead Rail** — beads per beat-pad tap; here the count is a kite tail that has to balance.
- **Premium syllable-splitter** — drum and arcs; none here.

## 12. Build plan
- **Data:** `params.levels.{count,tie,fix,fence,tassels}` as §6; per word `{noun, themeDir, word, split, foreign?, blankIndex?, start?, tassels?}`. A build script copies `split` from `approved-words-en.json` by key and refuses any word not in the whitelist typed into the gate or whose entry lacks TeX.
- **Core state** `{level, round, tail:[{syl|null, fixed}], box:[…], order:[…], fence:{kites:[1,2,3], placed:{…}}, tassels:[[…]], typed:[…], misses}`; functions `tie()`, `untie(i)`, `tieBow(id, knot)`, `swap(i, j)`, `gust()` → `{flight:'steady'|'spin'|'sag'|'tangle', printed:[[syl…]], rightIdx:[…], tangleAt:i|null, foreignOff:[…]}`, `tryCard(cardId, kiteIdx)` → `fit|spin|sag`, `tasselCheck()` → `{perBow:[{missing:[…], extra:n}]}`, `writeCheck()` → `{ok, boundaryHint}`.
- **Gate's own ground truth** (`verify-kite-tail-core.js`): the whitelist of 35 words with their splits typed into the gate, each asserted TeX-agreed in `approved-words-en.json`; every shown split equals the gated split; L1 steady iff bows = beats for k = 1…4, short puts all leftover syllables on the last bow, long leaves exactly k − beats blank; tail starts at one bow every round; L2 steady only on the word order; tangleAt = first out-of-place index; the box never starts in word order; no on-screen bow combination forms another whitelist word; L3a bare-knot index distribution covers first/middle/last; L3b starts are derangements; L4 fit iff kite bows = beats for all 9×3 pairs; L5 tassel counts equal the typed grapheme lists; write accepts only the gated split. Bots as §6.
- **Mutations:** steady with an extra blank bow · steady with two syllables on one bow · short case spreads syllables over all bows · tail starts at the word's count · box starts in word order · tangle ignores order (any order steady) · foreign bow accepted · bare knot always last · scramble start leaves a bow in place · L4 accepts any kite · L4 fixed card order · tassel check ignores extra tassels · r-controlled counted as two · write accepts any split that concatenates to the word · a non-TeX split shown (`star·fish`) · toys/kite used as a word picture · reshuffle repeats an order.
- **Pictures to verify on contact sheets at build:** insects and bugs/dragonfly, vehicles/sailboat, toys/train, zoo animals/otter and monkey, At the Supermarket/pizza, popcorn, basket, christmas/gingerbread, classroom/pencil (drawn diagonally — PICTURE-RULINGS: give it the lie-flat rotation on the kite), activities/basketball.
- **Risks:** a 4-bow tail is never right in this row (no trusted 4-beat words) — the box still allows 4 so "too many" is reachable on 3-beat words.
- **Blocked:** four-beat counting (K-233 up to 4) waits on a fixed en syllable gate — recorded as a limitation, not filled with hand splits.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — tying bows and flying a kite is pure toy; the loop-the-loop and the sag are funny, and the kite line fills with a fleet.
2. **Would a teacher put it on the board?** Yes — one apparatus runs every syllable routine on the worksheet list (count, sort, blend, missing, scramble, write, sounds), and each misconception has a physical answer the whole class can see: the spin, the sag, the knotted tail, the lopsided tassels.
3. **Would a parent trust it?** Yes — library pictures, only TeX-agreed spoken splits, no score.
4. **The invention:** a kite whose tail needs exactly one bow per beat in the right order — only then does it fly steady.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 2→5 · reality 3→5
What changed:
- **New invention.** The Word Lock (combination lock + key ring) was a twin of row 51 The Syllable-Family Lock (combination lock + keyring); rebuilt as THE KITE TAIL — the verdict is flight balance (steady / spin / sag / tangle), which no other syllable row uses. Every worksheet routine (K-233, K-234, G1-305, G1-313, G1-324–328) kept, mapped to a kite level.
- **Removed four non-TeX splits** the brief forbids for en (starfish, sunglasses, woodpecker, hamburger — rule-only in the gate) and replaced them with TeX-agreed spoken splits: sailboat (L3a), dragonfly (L2, L4), umbrella and butterfly scrambles (L3b), strawberry missing-middle (L3a); the gate now asserts TeX on every shown word.
- **Dropped occupations/carpenter** (a person who may not read as "carpenter") and the 28-px picture tags on the key ring (record ruling: records are drawn tokens + words, never shrunken pictures).
- Every word re-verified by script: picture exists, en label = word, gated split TeX-agreed.
