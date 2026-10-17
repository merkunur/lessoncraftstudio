# Row 177 — Mango's Animal Groups → THE FORMATION WORDS (L.2.1.a)

## 0. Identity
- id `mango-animal-groups.collective-nouns.l-2-1-a` (frozen) · grade 2 · Common Core L.2.1.a · strand Language · own files `mango-groups-core.js` (new), `mango-animal-groups-activity.js`, `.html`, `mango-animal-groups-activities.json` (row kept, params rewritten). Title / intro / slugs en..nl frozen; sv/da/no/fi get new slug, title, intro at build.
- worksheets: none mapped.
- old activity: one library animal + three word chips, tap the group word. **Kept:** every animal–word pair of the 7 old locales that survives the validity check (§12), the library pictures, the per-render chip shuffle. **Fixed:** en *sheep* offered *herd* (a herd of sheep is also correct English — two right answers); de *Bienen → Volk* offered *Schwarm* (ein Bienenschwarm is correct German — two right answers); en *grapes → bunch* is not an animal group and its picture has no library label (dropped); it *formiche → formicaio* is the ant HILL, not the group (→ *colonia*).

## 1. The pitch
"A group word is not just a name — it tells the animals how to move together: say *school* and the fish swim off in one curving band, say *flock* and the birds rise into a V — and if you give cows the word *school*, they try, lift a little, and flop back down."

## 2. Why a child will want it again
- Every word is a little piece of choreography the child unlocks: **herd** (a slow bunch grazing across the meadow), **flock** (birds rise into a V; sheep huddle and trot), **school** (a ribbon of fish curving together), **pack** (wolves trot nose to tail in one line), **swarm** (bees jiggle in a buzzing cloud), **pride** (lions settle in a lazy ring), **colony** (ants or penguins pack into tidy rows), **pod** (dolphins or whales leap in a wave, one after another), **troop** (monkeys bounce along in a bobbing line).
- Wrong words are comedy, not failure: cows asked to be a *school* float up into a wave, wobble, and thump down onto the grass one by one; wolves asked to *swarm* jiggle for a second and then sit and look at you.
- The earned show: the right word throws a rope around the whole crowd — six animals become ONE group with one tag; the counter under the meadow reads **1 herd · 6 cows** and the crowd performs its formation right across the stage and back.
- Between rounds the child can drag any animal out of the group and watch it hurry back to its place in the formation (the group pulls it back) — the "group is one thing" idea as a toy.

## 3. The skill and the misconception
- Skill (L.2.1.a): use collective nouns — a word that names a whole group as ONE thing (*a herd of cows*), and the right group word for the right animals.
- Misconceptions and the push-back:
  - *"A group word is just another word for 'lots'"* → the rope makes the crowd one object; the counter shows **1** group of **6**, and a dragged animal is pulled back into it.
  - *"Any group word fits any animal"* → each word carries a way of moving (from the data's validity table); animals that do not belong to that word cannot perform it — the formation visibly fails (lift-and-flop, jiggle-and-sit, line-up-and-scatter).
  - *"Flock is only for birds"* → sheep perform *flock* on the ground (huddle and trot) and birds perform it in the air — same word, two animals, both succeed.
  - L3 (word → animals): *"I recognise the word, so I'll guess"* → two crowds stand in the meadow; only the crowd that can perform the word goes with it.

## 4. The stage
- **The meadow** (drawn apparatus): one rounded field 456 × 300 px at 704 (left column of the split layout; bubble column 200 px right) / 328 × 240 at 360. A soft cream ground with three bands drawn as plain shapes: sky (pale teal, top 35 %), ground (cream), water (a pale blue strip at the bottom 22 %). The bands are ALWAYS all three — the background never tells which word is right.
- **The crowd**: 6 identical copies of one library animal (5 at 360), each 96 px at 704 / 64 px at 360, scattered on the ground band (fish and dolphins/whales float in the water strip, birds stand on the ground — they only fly if the word makes them). Copies are mirrored only if the picture's facing is irrelevant; facing per PICTURE-RULINGS (formations move LEFT for left-facing pictures; zebra and truck-style right-facers move right).
- **The word chips**: 3 tags (L1/L2) on a wooden rail above the meadow at 704 (rail 456 × 64, chips 140 × 52, Baloo 2 700 26 px) / below the meadow at 360 (chips 100 × 48, 22 px). Each tag is a luggage-tag shape with a rope loop — the rope is what lassoes the crowd.
- **The tally** under the meadow: drawn as `1 [rope icon] · 6 [mini outline of the animal as a dot]` until the cure, then the words **1 herd · 6 cows** appear (content words, so allowed).
- **Library pictures (verified on the contact sheets, all in `mini tools/pictures/*.json`)**: farm-animals/cow, farm-animals/sheep, farm-animals/horse, ocean-life/fish, zoo-animals/wolf, insects-and-bugs/bee, things-that-fly/bird, zoo-animals/zebra, zoo-animals/lion, insects-and-bugs/ant, animals/penguin, ocean-life/dolphin, ocean-life/whale, zoo-animals/monkey, zoo-animals/elephant (chibi, sitting — still clearly elephants), farm-animals/goose. Not used: any duck (every duck picture is a duckling — it cannot fly a V), the grapes picture (no label).
- Task line (22 px): **"Which word makes these animals one group? Give them their group word."** L3: **"Which crowd does this group word belong to?"**

## 5. The hand
- **Drag a tag** (or tap a tag, then tap the meadow) → the tag's rope uncurls toward the crowd (150 ms) and lies around them as a loose loop; the animals look up (a 6 px hop, staggered 40 ms). Nothing is judged yet; drop another tag → the first flies back to the rail.
- **Check** → the rope tightens (200 ms) and the crowd tries the word's formation (1.4 s): success = the full formation, then the rope tag reads the word, the tally fills. Failure = the formation's first move, then the word's specific "can't" (lift-and-flop for flock/school/pod on walkers; scatter for pack on bees/fish; jiggle-and-sit for swarm on mammals; ring-and-roll-away for pride on non-lions), and the tag drops back to the rail.
- **L3**: one tag hangs on the rail, two crowds stand left and right of the meadow (3 animals each at 704, 96 px; 3 each at 360, 64 px); the child drags the tag onto one crowd → Check.
- **Free play** after a cure: drag any animal out; it runs/flies/swims back to its slot in the formation (spring 300 ms). Tap the tag → the formation replays.
- Sound: soft per-formation sound (hooves pattering, wings, water whoosh, buzz) at low volume; TTS reads "a herd of cows" on success where available.

## 6. The rounds
One round = one crowd (L3: two crowds) and its tags. Order-only reshuffle per pass; chips shuffled per render; L3 crowd sides fixed per round so each pass is 4 left / 4 right.

**Level 1 — Field groups (en)**
| # | animals (picture) | right | other tags |
|---|---|---|---|
| 1 | cows (farm-animals/cow) | herd | flock · pack |
| 2 | fish (ocean-life/fish) | school | herd · flock |
| 3 | wolves (zoo-animals/wolf) | pack | herd · flock |
| 4 | bees (insects-and-bugs/bee) | swarm | herd · flock |
| 5 | birds (things-that-fly/bird) | flock | herd · school |
| 6 | sheep (farm-animals/sheep) | flock | pack · swarm |
| 7 | horses (farm-animals/horse) | herd | school · swarm |
| 8 | zebras (zoo-animals/zebra) | herd | pack · flock |

**Level 2 — More group words (en)**
| # | animals | right | other tags |
|---|---|---|---|
| 1 | lions (zoo-animals/lion) | pride | colony · pod |
| 2 | ants (insects-and-bugs/ant) | colony | pride · troop |
| 3 | penguins (animals/penguin) | colony | pod · pride |
| 4 | dolphins (ocean-life/dolphin) | pod | troop · colony |
| 5 | whales (ocean-life/whale) | pod | pride · troop |
| 6 | monkeys (zoo-animals/monkey) | troop | pod · pride |
| 7 | elephants (zoo-animals/elephant) | herd | troop · pod |
| 8 | geese (farm-animals/goose) | flock | colony · pod |

**Level 3 — Which crowd? (en)** — tag · crowd A · crowd B (right crowd in **bold**; side): school · **fish** · cows (L) · flock · wolves · **sheep** (R) · pack · **wolves** · bees (L) · swarm · horses · **bees** (R) · herd · **zebras** · fish (L) · pride · geese · **lions** (R) · pod · **dolphins** · ants (L) · colony · zebras · **ants** (R).

Measured by the critic (`work-c27/measure.js`, 2026-10-17): the right tag is the unique longest in 1/8 (L1) and 2/8 (L2), the unique shortest in 1/8 and 2/8. The old L1 rail failed a frequency bot — *herd* (right 3 times) was shown only once as a wrong tag, so "tap herd whenever you see it, else flock" solved 5 of 8; the rail above shows *herd* as a WRONG tag in 4 rounds and *flock* in 4, and the same bot now solves 4 of 8 (the three herd rounds + sheep), L2 2 of 8. Every group word that is ever right also appears as a wrong tag. Every pair is checked against the validity table (no wrong tag is a real group word for those animals: no *herd* for sheep, no *pack* for lions, no *herd* for whales, no *colony* for monkeys).

## 7. Check, the misses, the success
- **Check with no tag on the meadow** → bubble **"Put a word tag on the animals first."** (no miss)
- **Miss 1** → the failed formation plays, then two faint tracks stay drawn on the meadow for 3 s and then remain as dotted ghosts: the TRIED word's track (e.g., *school* = a wavy band in the water strip) and the crowd's own way of moving (cows = a row of hoof dots across the ground band). The two tracks are in different bands — visibly not the same. Bubble **"These animals can't move like that. Look where they really go."**
- **Miss 2** → the crowd's own track is redrawn bold and all three tags show a tiny track icon on their tag (wave, V, line, cloud, bunch, ring, rows, leaps, bobbing line); the child matches the crowd's track to a tag's icon. Bubble **"Find the tag that moves the way these animals move."**
- A new tag drop clears the ghosts until the next Check.
- **Success** → rope tightens, full formation across the stage and back, tally **1 herd · 6 cows**. Bubble **"A {group} of {animals}! Six {animals}, one {group}."** (en "A herd of cows! Six cows, one herd.")

## 8. Settings
1. **Level**: Field groups (L1, default) · More group words (L2) · Which crowd? (L3) — the rail shows 3 tags vs 1 tag and two crowds.
2. **Tracks**: only as a help (default) · always — every tag carries its track icon from the start (scaffold for EAL children who do not yet know the words).

## 9. Words (EN source)
- title **Mango's Animal Groups** · task L1/L2 **Which word makes these animals one group? Give them their group word.** · L3 **Which crowd does this group word belong to?**
- hints **Put a word tag on the animals first.** · **These animals can't move like that. Look where they really go.** · **Find the tag that moves the way these animals move.**
- celebration **A {group} of {animals}! Six {animals}, one {group}.** (the number word follows the crowd size: six at 704, five at 360 — via `number-words.js`)
- settings **Level** — **Field groups** · **More group words** · **Which crowd?** · **Tracks** — **Only as a help** · **Always**
- Locale traps (the build authors each locale's own validity table; never translate en words):
  - **de**: Herde (Kühe, Schafe, Pferde, Zebras, Elefanten), Rudel (Wölfe, Löwen), Schwarm (Fische, Vögel, Bienen in flight), Kolonie (Ameisen, Pinguine), Schule is NOT German for fish. *Bienen* takes *Schwarm* OR *Volk* → never offer both in one round. Article in the celebration: "Eine Herde Kühe!" (no "von").
  - **fr**: troupeau, meute, banc, essaim, volée/nuée, troupe (singes), colonie, harde; "un troupeau de vaches", elision "d'éléphants/d'abeilles" (the old `elideDe`).
  - **es (MX)**: manada (vacas, lobos, leones, elefantes — one word for many!), rebaño (ovejas; also vacas), cardumen, enjambre, parvada (MX for birds; *bandada* also), colonia. RAE defines *manada* first as a herd of LIVESTOCK, so *manada de vacas* and *manada de ovejas* are correct: a round never offers *manada* as a wrong tag for any mammal group (⚠ the LIVE es deck does exactly that for *vacas* and *ovejas* — two right answers; reported as a live defect). es cows/sheep rounds accept *rebaño* only if *manada* is not on the rail.
  - **pt (BR)**: manada, rebanho, alcateia, cardume, enxame, bando, colônia.
  - **it**: mandria, gregge, branco, banco, sciame, stormo, colonia.
  - **nl**: kudde, roedel, school (fish — the same word as en!), zwerm, vlucht/zwerm (birds), troep (leeuwen/apen), kolonie.
  - **sv**: *flock* is generic (vargflock, fågelflock, fårflock, also *en flock kor*) and *hjord* fits cows AND sheep (fårhjord) — so the sv rail never offers *flock* as a wrong tag for ANY land mammal or bird, and never *hjord* as a wrong tag for sheep, cows, horses or elephants; the sv contrasts that stay one-answer are land vs water vs air vs insects: flock/hjord · stim (fish) · svärm (bees) · koloni (ants). **da/no**: *flok/flokk* is even wider (*en flok køer*, *en flokk sauer*, *ulveflok*, *fugleflok*) — it may be wrong ONLY for fish (stime/stim) and insects (sværm/sverm); da/no rounds are therefore built as "flok vs stime vs sværm vs koloni", with *hjord* never on a rail beside *flok*. The Nordic native author signs off each rail against this rule.
  - **fi**: essentially *lauma* (mammals on land), *parvi* (birds, fish, insects in the air or water) and *yhdyskunta* (ants): the fi deck is a two-word-plus-one deck where the formation idea is the whole lesson (walks vs swirls); 3 tags = lauma · parvi · yhdyskunta every round. ⚠ fi has NO bee round (*mehiläisparvi* AND *mehiläisyhdyskunta* are both right) and NO penguin round (*pingviiniyhdyskunta* and *pingviiniparvi* both occur); yhdyskunta is right for ants only, so the fi deck carries ≥ 3 lauma and ≥ 3 parvi rounds plus the ant round.
  - **en validity table** must also list the second right words a child may know: *school* of whales/dolphins, *colony* of bees, *gaggle* of geese, *herd* of sheep — so none of them is ever a wrong tag for those animals (the rails above respect this).
  - Plurals and number words come from the picture labels (`labels[loc][1]`) and `number-words.js`; Swedish *får* plural *får*, en *sheep/fish* unchanged.

## 10. Sound off, access, phones
- Sound off: the formation and the tally say everything; tag words are the only text on the apparatus.
- Keyboard: Tab to a tag → Enter picks it up → Enter on the meadow (L3: arrow to a crowd) drops it; Check.
- Taps: tags ≥ 48 px tall; L3 crowds are 150 px tap areas.
- Phones: 360 — meadow 328 × 240 at top, rail of 3 tags (100 × 48) under it, bubble under the rail, Check above the 740 fold (meadow 100–340, rail 352–400, bubble 410–480). 320 — pictures stay 64 px and the crowd drops to 4 animals (the celebration number follows); L3 crowds become 2 + 2.

## 11. Distinct from
- **Row 131 Group Photo** (send the odd one off the bench) and **Row 132 Climbing Tree** (categories): those classify things; here a WORD acts on a group and the crowd becomes one object.
- **Row 78 Cousin Rain** (same-kind grouping): no group words there.
- No built invention moves a crowd by a word; no premium tool does collective nouns.

## 12. Build plan
- **Core** `mango-groups-core.js`: `round = { id, level, animal:{theme,noun}, count, right, tags[] }` or L3 `{ tag, crowds:[{theme,noun},{theme,noun}], rightSide }`; per-locale **validity table** `valid[loc][animalKey] = [groupWords…]` and `track[loc][groupWord] = 'bunch'|'v'|'band'|'line'|'cloud'|'ring'|'rows'|'leaps'|'bob'` plus `ground`/`air`/`water` per animal. `isRight(round, tag) = valid[loc][animal].includes(tag)`. Formation success = isRight; failure animation = the tried word's track kind vs the animal's band.
- **Gate** `verify-mango-groups-core.js`: every round ×11 — exactly one tag valid for the animals (the oracle reads the validity table authored independently of the round list); L3 — the tag valid for exactly one crowd; every picture key exists in its theme json; no B&W theme; no duck/duckling picture used as a flier; length-rank of the right tag: no locale where the right tag is unique-longest or unique-shortest in > 40 % of rounds; each group word appears as a wrong tag at least once per locale where it is ever right; L3 sides 50 % ± 13 per pass; two passes never share an order.
- **Mutations**: validity read from `round.right` instead of the table · offer a second valid tag (de Schwarm+Volk) · grade on drop instead of Check · keep ghosts after a new drop · L3 always left · mirror a right-facing picture against its formation direction · celebration number not equal to crowd size · show track icons by default.
- Pictures to verify (done on the contact sheets for this design; recheck at build): cow, sheep, horse, fish, wolf, bee, bird, zebra, lion, ant, penguin, dolphin, whale, monkey, elephant, goose. Risk: the elephant is a sitting chibi baby (no tusks) — it reads as an elephant; its herd walk uses a gentle slide, not a stride.
- BLOCKED: nothing.

## 13. The four questions
1. **Choose it again?** Yes — every word is a dance to unlock and every wrong word is a joke the animals play.
2. **Teacher on the board?** Yes — "a collective noun names many as one" is shown by the rope and the 1 · 6 tally, and the formations make the word–animal pairing memorable.
3. **Parent trust?** Library animals only, gentle motion, no scores, legible without sound.
4. **The invention:** the Formation Words — a group word tells the animals how to move together, and only the right animals can do it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- L1 rail rebuilt: a "tap herd if it is there, else flock" bot solved 5 of 8 (herd right 3×, shown wrong only once). Now herd and flock are each a wrong tag in 4 rounds; the same bot solves 4/8 (measured, `work-c27/measure.js`); length-rank tells 1/8 longest, 1/8 shortest.
- Locale validity traps that would have produced two right answers: es *manada* is correct for cows and sheep (the live es deck offers it as a wrong tag — reported); sv *flock* fits every land herd and *hjord* fits sheep; da/no *flok/flokk* fits nearly everything on land and in the air; fi bees take *parvi* and *yhdyskunta* (bee and penguin rounds removed in fi). en table now lists school-of-whales, colony-of-bees, gaggle, herd-of-sheep.
- Pictures re-checked on the contact sheets (zoo-animals/wolf is a dark adult wolf — usable, unlike animals/ and forest-creatures/wolf; things-that-fly/bird, goose, ocean-life fish/dolphin/whale all read correctly).
