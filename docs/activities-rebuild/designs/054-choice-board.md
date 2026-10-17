# Row 54 — The Blending Magnets: the gap is the pause (RF.K.2.c)

## 0. Identity
- id `choice-board.onset-rime-blend.rf-k-2-c` (KEPT) · grade K · Common Core RF.K.2.c (blend and segment onsets and rimes of single-syllable spoken words) · strand Reading: Foundational Skills · page title (frozen, en) "Blend Onset and Rime — Listen and Find the Word"; intro frozen in en/nl/da/de; es/fr/it/pt/sv/no/fi slug, title and intro are new at build (grade K / förskoleklass etc. per locale).
- own files `mini tools/blend-magnets-core.js`, `blend-magnets-activity.js`, `blend-magnets-activity.html`; the manifest row moves to `blend-magnets-activities.json` (id, slugs, titles, intros frozen) and is removed from `choice-board-activities.json` in the same commit (+ `MANIFEST_FILES` registration, §21.5). `choice-board-core.js` untouched.
- worksheets it covers: **G1-314 "Blend the Sounds"** (Level 2: blend three or four single sounds — this row is its blending home), **G1-312 "Sound Strip: How Many Sounds?"** (secondary: Level 2's magnets are a sound strip, one magnet per sound, counted on the success line; the COUNTING act itself is owned by New 214 Bumpy Slide, also 058 / 109).
- what the old activity did: showed onset letter + rime, the child tapped one of four pictures (one rhymes). **Kept:** the frozen promise ("hear the ending, see the first letter, blend them, tap the picture; one picture rhymes, so the first letter is the clue"), the de/nl/da/en round data (re-checked), the rhyme distractor in every round. **Fixed:** the en rounds `b+ee`/`tr+ee` used `christmas/tree`, which does not exist — both replaced; the de/nl/da broken references are listed in §6.

## 1. The pitch
"The first sound and the rest of the word are two magnets on a rail — the gap between them is the pause, and when you push them close enough they snap into one word."

## 2. Why a child will want it again (the fun)
- **Magnets are irresistible.** The onset is a red-and-silver bar magnet with its letter on it; the rime is a blue one. Drag the red one along the rail and you can *feel* the pull: within 40 px it jumps the last bit by itself — *clack!* — and the two become one bar.
- **Stretchy speech.** The gap is drawn as a dotted stretchy line between the magnets: far apart it reads "c · · · · at", nearer "c · · at", touching "cat". Where TTS works, releasing the magnet says it exactly that slowly — children make long silly "ccccc……at" sounds and then snap.
- **Magnets test the pictures.** On Check the joined word bar flies to the chosen picture; the picture's own name rises up out of its frame as two magnets. Matching halves pull together (*clink*); different ones push apart and spin away. Picking the rhyming picture makes the "at" halves grab each other — and the onsets repel. It is a little magic trick every time.
- **The fridge door.** Every word you finish sticks onto a fridge-door panel at the top as a word magnet — the word itself in the red-and-blue magnet colours, onset red, rime blue (a drawn record; no shrunken picture). At the end of a pass the panel is full; tapping a magnet makes it wobble, say its word, and pull apart into its two halves for a second.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** blend an onset and a rime (RF.K.2.c) — and, at Level 2, blend three or four single sounds into a word (G1-314), with one magnet per sound (G1-312).
- **Misconception 1 — the rime alone decides** (child hears "at" and grabs the first rhyming picture). The rhyme distractor's magnets show it: the rime halves attract, but the onsets repel — "the end is right, the start is not".
- **Misconception 2 — blending is saying the parts with a pause.** The pause is visible and physical: it only becomes a word when the gap closes; the child must push the parts together.
- **Misconception 3 — the first letter alone decides.** Each round also has a picture with the same onset and a different rime; its onsets attract, its rimes repel.
- **How the material pushes back:** attraction and repulsion, part by part — never a red cross.

## 4. The stage
**Stacked** at every width (the rail needs the full width); the bubble sits under the rail.

**At 704 px (stage 704 × 470):**
- **The fridge panel** (top band 704 × 44): a white enamel strip with collected word magnets (the word at 16 px, onset red / rime blue — a record in content letters, never a picture below the 96/64 px floor).
- **The gallery** (y 56–216): three picture frames side by side, each 150 × 150 (white card, 2 px ink, rounded 12), **library picture at 128 px**; frame gaps 40 px; centred.
- **The rail** (y 236–316): a steel rail 600 × 22 with end stops, centred, on a grey-blue base `#5E7C78`. **The onset magnet** (red `#D94B3A` body with a silver end, 96 × 64, the letter(s) at **40 px** white Baloo 2) starts at the left stop; **the rime magnet** (blue `#2F6FB0` with silver end, 128 × 64, letters at 40 px) is fixed at the right stop. Between them the **stretch line**: dotted, dot spacing proportional to the gap.
- **The pause strip** (y 322–346): under the rail, a row of soft dots (one dot per 60 px of gap) — the same pause, readable without sound.
- **The bubble** (y 360–440).
- **Task line** above the stage (≤ 24 px). No words on the apparatus except the letters on the magnets (content).

**At 360 px (stage 360 × 640):** fridge 360 × 32; gallery three frames **104 × 104**, pictures **88 px** (≥ 64), gaps 12 px; rail 340; onset magnet 76 × 52 (32 px letter), rime 100 × 52; pause strip; bubble; Check. Check bottom ≤ 700 at 360 × 740, ≤ 620 at 320 × 640 (320: frames 94, pictures 78, magnets 68/88 × 48).

**Level 2 (single sounds):** three or four magnets, alternating red/blue/red/blue, each 72 × 64 (32 px letter) at 704 and 58 × 50 at 360; the right-most magnet is fixed; a small row of sound dots (one per magnet) sits under the rail (the "sound strip").

## 5. The hand
- **Drag a magnet** along the rail (x only, follows the finger 1:1). The stretch line and pause dots update every frame. Within 40 px of its neighbour the magnet is pulled the rest of the way (90 ms ease-in) and **snaps** (*clack*, a 2 px bounce); the two become one bar with the letters closing up (120 ms).
- **Pull apart:** drag the onset end of a joined bar leftwards with a firm pull (≥ 30 px) and it separates again (*shhk*) — free play.
- **Hear it (bonus):** on every release, TTS (where available) speaks the onset, a pause of `gap / 200` seconds (capped 1.2 s), and the rime; when snapped, the whole word. Without TTS nothing is lost: the stretch line and dots show the pause.
- **Choose:** tap a picture frame — it lifts 6 px and gets a coral ring (one choice at a time; tap another to change).
- **Check (§7)** runs the magnet test on the chosen picture.
- **Level 2:** any two neighbouring magnets can be pushed together (left one slides right); a joined pair moves as one; the word is blended when all magnets are one bar.
- **Free play:** between rounds the magnets stay live; snapping and un-snapping is always allowed.

## 6. The rounds
One round = one onset + rime (or a sound strip) + three pictures: the target, a **rhyme** distractor (same rime, other onset) and a **same-onset** distractor (same first sound, other rime) — or, where the language lacks one, an unrelated word. A pass = a level's table, order-only reshuffled per pass.

**Level 1 — Onset + rime (EN).**

| # | onset + rime | target (themeDir/noun) | rhyme distractor | same-onset distractor |
|---|---|---|---|---|
| 1 | c + at | cat (animals/cat) | bat (animals/bat) | cup (around the house/cup) |
| 2 | h + at | hat (accessories/hat) | cat (animals/cat) | ham (At the Supermarket/ham) |
| 3 | b + ag | bag (At the Supermarket/bag) | flag (4th of July/flag) | bus (vehicles/bus) |
| 4 | b + ed | bed (around the house/bed) | sled (winter/sled) | bun (bakery/bun) |
| 5 | p + ig | pig (animals/pig) | fig (fruits/fig) | pen (classroom/pen) |
| 6 | c + ar | car (toys/car) | jar (kitchen tools/jar) | cat (animals/cat) |
| 7 | j + ar | jar (kitchen tools/jar) | car (toys/car) | jam (At the Supermarket/jam) |
| 8 | f + an | fan (around the house/fan) | van (vehicles/van) | fox (animals/fox) |
| 9 | h + en | hen (farm animals/hen) | pen (classroom/pen) | hat (accessories/hat) |
| 10 | b + un | bun (bakery/bun) | sun (beach/sun) | bed (around the house/bed) |
| 11 | m + ug | mug (kitchen tools/mug) | jug (kitchen tools/jug) | map (camping/map) |
| 12 | s + un | sun (beach/sun) | bun (bakery/bun) | sock (accessories/sock) |
| 13 | fl + ag | flag (4th of July/flag) | bag (At the Supermarket/bag) | flower (spring/flower) — same onset *fl* |
| 14 | sl + ed | sled (winter/sled) | bed (around the house/bed) | slide (toys/slide) — same onset *sl* |
| 15 | st + ar | star (christmas/star) | car (toys/car) | stool (furniture/stool) — same onset *st* |

(Rows 13–15 carry a two-letter onset magnet, so their same-onset picture must share the WHOLE onset — *flower, slide, stool* — or the magnet test would repel the onset and file the round under the wrong hint. The earlier *cup / sock / sun* fillers shared only one letter and are gone.)

**Level 2 — Blend the sounds (EN; one magnet per sound).** Distractors differ from the target by one sound where possible.

| # | sounds | target | distractor A | distractor B |
|---|---|---|---|---|
| 1 | c · a · t | cat (animals) | cap (accessories) | bat (animals) |
| 2 | p · i · g | pig (animals) | fig (fruits) | pen (classroom) |
| 3 | s · u · n | sun (beach) | bun (bakery) | sock (accessories) |
| 4 | d · o · g | dog (animals) | log (camping) | duck (animals) |
| 5 | b · u · s | bus (vehicles) | bun (bakery) | cup (around the house) |
| 6 | h · e · n | hen (farm animals) | pen (classroom) | ham (At the Supermarket) |
| 7 | m · o · p | mop (around the house) | map (camping) | mug (kitchen tools) |
| 8 | f · r · o · g | frog (camping) | flag (4th of July) | dog (animals) |
| 9 | c · r · a · b | crab (beach) | cap (accessories) | car (toys) |
| 10 | d · r · u · m | drum (music) | duck (animals) | dog (animals) |
| 11 | f · l · a · g | flag (4th of July) | fan (around the house) | bag (At the Supermarket) |

(Magnets carry letters for sounds: *ck* in duck is never a magnet here; *sh/ch* words are excluded from Level 2 — those are New 214's two-letters-one-sound lesson.)

**Other locales.** de, nl, da keep their eight existing rounds — re-checked against `mini tools/pictures/*.json` on 2026-10-17, which found broken picture references to fix at build: de `weather/sun` ×2 (→ `beach/sun`); nl `clothing/pants` (*Broek* — no pants picture: the nl panel picks another pictured rhyme or same-onset noun), nl `body parts/lip` (*Lip* — none: replace), nl `around the house/glass` (→ `kitchen tools/glass`), nl `christmas/tree` (*Boom* — none: replace); da `colors/red` (*Rød* — not a library theme: replace the rhyme distractor for *Brød*). The other nouns (`Haus/Maus/Hund/Mund/Bein/Zahn/Fisch/Schwein`, `boek/maan/bus/sok/kip/jas/pot/vaas`, `Hund/Bus/Kat/Gris/Stol/Brød/Hest/Gås`) exist and each native panel adds ≥ 2 rounds to reach 10 plus a Level 2 table of ≥ 8. sv/no/da build monosyllable onset-rime rounds the same way. **es, it, pt, fr, fi have few one-syllable picture nouns**; their panels use **first sound + rest of the word** (*g + ato → gato*) — the honest adaptation of "onset + rime" in syllable-timed languages, where K phonological work is *rima* (words that end alike) and *primer sonido* (es *conciencia fonológica*, it *consapevolezza fonologica*, pt *consciência fonológica*, fr *conscience phonologique*, fi *äännetietoisuus*). It is NOT RF.K.2.c in the strict sense (the "rest" can be two syllables); the page says so honestly: the rest of the word is one magnet, whatever its length.

**Seed rhyme pairs, measured 2026-10-17 from `mini tools/pictures/*.json` (both words pictured, labels in the locale, same rest after the first consonant(s)) — the rhyme distractor of every non-en round comes from this list or the panel's own measured additions; each panel strikes any pair whose picture does not read as the word and adds the same-onset picture:**
- **es** gato/pato/plato · capa/mapa/papa · roca/boca/foca · loro/toro · luna/cuna · cono/mono · lobo/globo · bollo/pollo · tarta/carta · bote/brote · charco/barco · cama/llama (≥ 12 rounds)
- **it** cane/pane · torta/porta · vaso/naso · zucca/mucca · riso/viso · bocca/brocca · lago/drago · tenda/benda · sacco/pacco · tavolo/cavolo · pera/sfera (≥ 11; *gatto/matto* is struck — *matto* has no picture)
- **pt** gato/pato/rato/prato/jato · faca/vaca/maca · pente/dente · porta/torta · boca/foca · cola/bola · panela/janela · pão/mão · capa/mapa · lobo/globo · saia/praia (≥ 11)
- **fr** sac/lac · pain/main/train · jus/bus · tarte/carte · prune/lune · bouche/louche · gâteau/râteau · chaise/fraise · coussin/poussin · gilet/filet · robe/globe · luge/juge (≥ 12; *œuf/bœuf* struck — painted Easter egg, ox reads as a bull)
- **fi** sukka/kukka · lammas/hammas · lukko/kukko · suu/kuu · hana/kana · pannu/kannu · tussi/bussi · mekko/gekko · lokki/kokki · liivi/kiivi · grilli/pilli · makkara/jakkara · paketti/raketti · solmio/kolmio (≥ 14 — Finnish turns out RICH in picture rhymes; no unrelated filler is needed)
- **sv** hatt/katt · gris/ris · stol/sol/kjol · kopp/mopp/knopp · kök/lök · lås/gås · ljus/mus/hus · väst/häst · skål/kål · hand/tand/sand (≥ 10)
- **no** hatt/katt · sokk/kokk · vest/hest · lås/gås · kopp/mopp/sopp · mus/hus · kam/lam · gris/ris · stol/sol · kurv/spurv (≥ 10)
- **da** (beyond the 8 kept rounds) hat/kat · sok/kok · vest/hest · hund/mund · lås/gås · mus/hus/bus · pen/ben · kam/lam (⚠ *dør/smør* struck — the butter picture reads as cheese)
- **de / nl** (beyond the kept rounds) de Hund/Mund · Maus/Haus · Fisch/Tisch · Topf/Kopf · Vase/Nase · Hahn/Zahn · Schuh/Kuh · Dose/Hose/Rose · Kamm/Lamm; nl sok/rok/mok · kam/ham/jam/lam · pan/kan · pen/hen · tas/jas/das · mand/hand/tand · huis/muis · mus/bus · vaas/kaas · peer/beer

**Answer position (measured):** the target's gallery slot (left/middle/right) is drawn so each slot holds the target in ⅓ of a pass (± 1 round); the rhyme distractor sits next to the target in exactly half the rounds (so "pick the one beside the rhyme" fails). The gate counts both over each level and fails beyond ± 1.

## 7. Check, the misses, the success
- **Check before the magnets are snapped** → hint, no miss: "Push the two magnets together first." (Level 2: "Push all the magnets together first.")
- **Check snapped but no picture chosen** → hint, no miss: "Now tap the picture that matches the word."
- **Miss 1 — the magnet test:** the joined word bar flies (300 ms) under the chosen picture; the picture's own name rises out of the frame as its own magnets (onset + rime, letters visible); part by part, **matching parts attract** (slide together, *clink*, a soft glow) and **different parts repel** (the picture's part pushes away 30 px, spins once and falls back into the frame, *thup*). The bar then returns to the rail, still snapped. Hint:
  - rhyme chosen: "The ends stick together — but the first sounds push apart. Listen to the first sound."
  - same-onset chosen: "The first sounds stick — but the ends push apart. Listen to the end of the word."
  - (Level 2: "{n} sounds stick, {m} push apart.")
- **Miss 2 — the slow pull:** the word bar splits again and the onset magnet slides from the far left to the rime by itself, slowly (1.6 s), the pause dots disappearing one by one, the TTS (where available) stretching and closing the word; meanwhile each picture shows its *onset* letter on a tiny magnet at its frame's corner (only the onset — the rime is the child's to hear). Hint: "Watch the magnets close the gap. Which picture starts with {onset}?"
- **A new move takes the help away** until the next Check.
- **Success:** both halves attract under the right picture, the picture's magnets and the word bar lock into one glowing bar, the picture frame flashes white and the other two pictures fade to 40 %; the bar shrinks into a fridge magnet and flies to the panel. TTS: "c — at — cat!". Bubble: "c + at = cat!" (Level 2: "c-a-t: 3 sounds, one word — cat!").

## 8. Settings
1. **Level:** Onset + rime · Single sounds — the rail shows two magnets / three-four magnets with the sound dots, at rest.
2. **Magnet pull:** strong (snaps within 40 px, default) · gentle (snaps only at 12 px, so the child must close the gap themselves) — the stretch line shows a small pull zone mark at rest.

## 9. Words (EN source; the build authors the other 10 locales by hand, then one native ×11 + pedagogy reviewer)
- title (frozen en) "Blend Onset and Rime — Listen and Find the Word" · instruction: "Push the first sound into the rest of the word until they snap. Then tap the picture of the word."
- task lines: L1 "Push {onset} into {rime}, then find the picture." · L2 "Push the sounds together, then find the picture."
- hints / celebrations: §7. Settings: "Level", "Onset and rime", "Single sounds", "Magnet pull", "Strong", "Gentle".
- aria: "Onset magnet {onset}, {distance} from the rime magnet {rime}." · "Snapped: {word}." · "Picture {n} of 3." · "The ends stick, the first sounds push apart." · "Fridge: {count} words."

**Locale traps:**
- **Onset-rime is a Germanic notion**; Romance and Finnish use first sound + rest (above, with the measured pair lists). Never force a one-syllable "rime" that is not a word part. In fi the long vowel and the doubled consonant stay inside the rest (*s + ukka*, *k + uu*) — the first magnet is only ever the first consonant.
- **Multi-letter onsets and rimes** are one magnet: de *Schw+ein*, *Sch*, da *Gr+is*, *Br+ød*, nl *sch*; never split *sch* or *ij*.
- **Capital letters:** de nouns are capitalised (the old data shows *H + aus*); the magnet keeps the capital on the onset and lower case on the rime — the panel decides whether to show lower case for blending (recommended: lower case on magnets, the capital only in the success bubble).
- **Letters ≠ sounds:** en *c* and *k* are the same sound — no round uses them as different onsets; *ck*, *sh*, *th* never split across magnets.
- **Same-onset distractor** must share the first *sound*, not just the first letter (es *g* before *e/i* is not /g/).
- **Picture names:** the distractor's name must be the vocabulary noun in the locale (`image-vocabulary.js`), and the rhyme must hold in that word (e.g. de *Maus/Haus*), checked by the native reviewer.
- **Sound off:** letters on magnets + the pause line carry the blend; TTS reliable in about 5 locales.

## 10. Sound off, access, phones
- Silent legibility: the stretch line, pause dots, the snap, and attraction/repulsion show everything.
- Keyboard: Tab to the onset magnet, ←/→ move it 20 px per press (snaps at the pull zone); Tab to the gallery, ←/→ pick, Space choose; Enter = Check.
- aria-live: "Gap: {k} dots." … "Snapped: cat." / the magnet-test result.
- Taps: magnets ≥ 58 × 48, picture frames ≥ 94 px.
- Pictures 128 px at 704, 88 px at 360, 78 px at 320.
- Phone: gallery → rail → dots → bubble → Check.

## 11. Distinct from
- **Row 55 Sound Boxes (this batch)** — lids pop where two words share a sound at a position; **row 56 Pepper** — a flip card turns into the word a swap makes; **row 57** — a name tag that sticks letter by letter. None slides magnets or makes a pause visible.
- **Premium `blending-board`** — flick letter cards and sweep to blend; no rail, no magnets, no attraction test.
- **New 214 Sound Slide** — segmentation (tokens grow walls); this is blending.
- **Built registry:** nothing magnetic.

## 12. Build plan
- **Core state:** `{level, round:{parts:[str], target, pictures:[{key, theme, parts:[str]}]}, magnets:[{text, x}], joined:[[i..j]], chosen, misses}`. Functions: `move(i, x)` → applies pull (`pullZone` 40 or 12 px) and returns `{snapped}`; `separate(i)`; `isWhole()`; `gapDots()`; `test(pictureIdx)` → `[{part, attract:boolean}]` comparing the target's parts with the picture's parts **by sound key** (the round data stores `parts` per picture, authored).
- **Gate's own ground truth (`verify-blend-magnets-core.js`):** for every round, the target's parts concatenate to its spelled word; the rhyme distractor's last part equals the target's last part and its first differs; the same-onset distractor's first part (sound key) equals the target's and its rime differs (or it is marked unrelated); exactly one picture attracts on every part; every picture exists and is colour; slot balance and rhyme-adjacency balance per level; Level 2 parts are one sound each from a hand list (no *sh, ch, th, ck* as a part).
- **Mutations:** Check accepted without snapping · rhyme distractor accepted · same-onset distractor accepted · attraction decided by letters for an en c/k pair · pull zone ignored in gentle mode · target always in the middle slot · rhyme always beside the target · help onset letters shown at miss 1 · help kept after a move · pass 2 order = pass 1 · *sh* allowed as one Level 2 magnet split into two.
- **Pictures to verify on a contact sheet:** spring flower; toys slide; furniture stool; animals cat, bat, pig, fox, dog, duck; accessories hat, cap, sock; around the house cup, bed, fan, mop; At the Supermarket ham, bag, jam; 4th of July flag; vehicles bus, van; winter sled; bakery bun; fruits fig; classroom pen; toys car; kitchen tools jar, mug, jug; farm animals hen; beach sun, crab; camping map, log, frog; christmas star; music drum. Seen 2026-10-17: animals, around-the-house (cup is a teacup — reads as "cup"), at-the-supermarket (ham is a cut ham — fine), kitchen-tools (jar, mug, jug clean).
- **Risks:** a child taps a picture without blending — Check refuses until snapped (hint, not a miss). The `fl+ag`/`sl+ed`/`st+ar` rounds require onset magnets with two letters — width 96 px fits two letters at 40 px.
- **BLOCKED:** nothing (the tree rounds are replaced).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — magnets that snap, stretchy speech, pictures whose names jump out and push back, a fridge to fill.
2. **Would a teacher put it on the board?** Yes — blending is literally closing the gap; the rhyme trap is answered part by part by attraction and repulsion.
3. **Would a parent trust it?** Yes — library pictures, no score, no timer, legible with the sound off.
4. **The invention:** the first sound and the rest of the word are magnets on a rail — the gap is the pause, and pushing them together snaps them into one word.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- Level 1 rows 13–15 were wrong: a two-letter onset magnet (*fl, sl, st*) against a "same-onset" picture sharing one letter would repel and file the round under the wrong hint. Now *flower, slide, stool* — true same-onset pictures (all exist, labels checked).
- The non-English adaptation was vague and partly fictional (*matto* has no picture; fi "no rhymes"). Replaced by rhyme-pair lists MEASURED from the picture library for es/it/pt/fr/fi/sv/no/da/de/nl — Finnish turns out rich (14 pairs). Two struck pairs recorded (*œuf/bœuf*, *dør/smør*) with the picture reason. The "first sound + rest" adaptation is now named honestly as not strict RF.K.2.c.
- Fridge magnets with 28 px pictures → word magnets (onset red, rime blue).
- G1-312 marked secondary (the counting act is New 214's); G1-314 is this row's.
