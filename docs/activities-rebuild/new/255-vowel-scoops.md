# New 255 — The Vowel Scoops → THE LETTER BARGES (RF.1.3.d)

## 0. Identity
- **id** `vowel-scoops.play.rf-1-3-d` · grade 1 · CCSS RF.1.3.d ("use knowledge that every syllable must have a vowel sound to determine the number of syllables in a printed word") · strand Reading: Foundational Skills · key `vowel-scoops` (planned key kept so the scaffold, manifest row and route stay as planned) → own files `vowel-scoops-core.js`, `vowel-scoops-activity.js`, `vowel-scoops-activity.html`, `vowel-scoops-activities.json`. Stage title (EN): **"The Letter Barges"**.
- **Worksheets covered:** G1-329 "Vowel King" (every syllable has one vowel; put a dot on the vowel inside each syllable arc) → the **Floats** task (§5 step 1); the split-the-word half of the same sheet family → the **Unhook** task (§5 step 2).
- New instrument; nothing to keep. The coverage review's "scoops under the word" is replaced: a scoop is an arc under a syllable, which is exactly what the premium **syllable-splitter** tool draws ("draw an arc under each syllable"). The barges keep the review's best idea — *a part with no vowel cannot hold up* — and turn it into physics.

## 1. The pitch
"Every letter is a crate on a barge, and only a vowel can hold a float — unhook the barges and one with no vowel sinks, one with two vowels rocks like a see-saw, and one with exactly one vowel rides level: count the level barges and you have counted the syllables."

## 2. Why a child will want it again
- **A canal you can play with.** The word floats on a strip of teal water as a little train of wooden crates, one letter per crate, joined by brass couplings. The water ripples gently under it (a 3 s sine on the crates' y, ±1.5 px).
- **Couplings that unhook with a clunk.** Tap a coupling and it pops open (90 ms), the two halves drift 18 px apart, and the water decides what happens next — instantly, by buoyancy, not by a message.
- **The three behaviours are funny.** A float-less barge sinks to its rim with three bubbles and a low "bloop", then swims back and re-hooks itself (900 ms). A two-float barge rocks ±6° like a see-saw, each float bobbing on its own beat. A one-float barge settles level with a soft wooden knock and a flag pops up on a mooring post.
- **The earned show.** When every barge rides level, the barges sail off along the canal one after another, each tooting once on a drum-like note (one toot per syllable — the child *hears and sees* the count), a beat-dot drops under each, and the library picture above gives a happy hop. Then the barges glide back and re-couple for the record row.
- **Free play:** between rounds the child can splash the water (tap it: a ring ripple) and nudge the finished barges with a finger; they bump and bob.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.1.3.d + G1-329):** in a printed word, find the vowel sounds; every syllable has exactly one vowel sound; so the number of vowel sounds is the number of syllables, and the word splits so each part keeps one vowel.
- **Misconception 1 — chunks of equal length / counting letters.** A child who cuts *blocks* into *blo|cks* or *church* into *chu|rch* sees one barge sink at once (*cks*, *rch* have no float). Long one-syllable words in the mix level are there to make this fail visibly.
- **Misconception 2 — too few parts.** A child who makes *umbrella* into *um|brella* sees *brella* rock: it carries two floats, so it needs another unhook between them.
- **Misconception 3 — every vowel LETTER is a syllable** (team setting). *rain* has two vowel letters and one vowel sound: in the team setting a vowel team is ONE wide float spanning two crates, and the coupling inside it is welded — it does not open, it only shines.
- **The material pushes back by buoyancy alone.** "One vowel sound per part" is the canal's physics; no text ever says "wrong".
- **Silent letters, resolved honestly (the "cake" question).** The canal's law is "one vowel SOUND per barge", but a child places floats under vowel LETTERS. Where a letter is a vowel on paper and silent in speech, the physics would lie: *cake* floated under *a* and *e* rocks, and *ca|ke* would then ride level as two barges — two "syllables" for a one-beat word. So such words are never in the pool, by rule, not by luck: (a) en drops every word ending in a silent *e* (and *-es*, *-ed*, *-le*); (b) a medial silent *e* (*fireman*, *lifeboat*) is caught because its gated part *fire* holds two vowel groups — rule 4 rejects it; (c) fr drops every word ending in mute *e/es/ent* (the fr oral-vs-written mute-e ruling is open — the premium syllable-splitter shows the split: *pomme* = 1 oral arc, 2 written cards — so the barges stay out of that fight entirely); (d) the gate also requires the number of gated parts to equal the multi-source syllable `count`. Silent *e* is RF.1.3.c (final-e) — another activity's job; the teacher prose names it. **y:** a vowel letter in sv/da/no/fi (and in fr, *stylo*, *pyjama*) — it gets a float there; en/de/nl/es/it/pt words containing *y* are excluded (vowel or consonant by position/loanword).
- **Honest scope.** RF.1.3.d is about *how many* syllables. Every split that leaves exactly one vowel sound in each part floats and is accepted (*rab|bit*, *ra|bbit*, *rabb|it*). The activity never shows a "correct boundary": the gated pool's boundaries are typographic in places (en *bak|er*, *riv|er*), and boundary rules are RF.1.3.e — another activity's job. The teacher prose says so plainly.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (canal column ≈ 470 px):**
- **Picture card** (top-centre of the canal column): the round's library picture, 132 × 132 px, on a cream card with a 3 px ink outline. Tap = TTS of the word where a voice exists.
- **The canal:** a teal water band 456 × 170 px with a darker wave line; a wooden bollard at each end (drawn geometry).
- **The barge train:** one crate per letter, crate 46 × 58 px (letter 34 px Baloo 2, ink on wood), 4 px brass couplings between crates. Pool cap 10 letters: 10 × 42 + 9 × 4 = 456 px (crate shrinks to 42 px only for 10-letter words).
- **The float basket** (Floats task only): a shallow tray (drawn geometry, 96 × 56) at the canal's lower right holding yellow ring floats.
- **The beat row:** a strip under the canal where beat-dots land on success (one 18 px dot per barge).
- **Task line (EN, 22 px, ≤ 2 lines):** Floats "Put a float under every vowel." · Unhook "Unhook the barges so each one floats level."
- **Bubble column (right, 200 px):** the hint bubble, and the **barge counter**: a row of mooring posts (2 or 3 per the Words setting) that raise a flag as each barge rides level — a picture of the count, never a written answer before Check.

**At 360 px:** single column. Picture 84 × 84 px top-left with the task line to its right (18 px, 2 lines). Canal full width 328 × 128 px; crates 32 × 44 px, letters 26 px (10 letters → 10 × 29 + 9 × 3 = 317 px). Each coupling has an invisible tap zone 32 × 44 px centred on the joint (never over a letter's centre). Counter posts sit under the canal. Check ≈ 560 px (above the 360 × 740 fold). **At 320:** crates 27 × 42, letters 23 px, canal 300 px, Check ≈ 540 px (above 640).
- No words on the apparatus except the word's own letters.

## 5. The hand
**Step 1 — Floats** (Task "Find the vowels", or the first half of "Find the vowels and unhook"):
- Tap a crate → a yellow ring float slides out of the basket and clips under it (160 ms, a soft "plip"). Tap again → it slides back (undo).
- Child-placed floats are **inert until Check** (no live truth): the water does not react to them, so tapping every crate gives nothing away.
- **Check** → right floats glow and stay; floats under consonants pop and roll home; when every vowel is floated, the whole train visibly rises 8 px (it is afloat) and Step 2 unlocks if the task includes it.

**Step 2 — Unhook** (Task "Find the vowels and unhook" after Step 1, or at once when the task is "Unhook (floats already on)"):
- Tap a coupling → it opens with a clunk (90 ms), the pieces drift 18 px apart, and **the canal reacts within 100 ms**:
  - piece with **no** float → sinks to its rim (220 ms), three bubbles, letters dim to 55 %; after 900 ms it swims back and the coupling re-closes itself (physics undoes it; not a miss);
  - piece with **two or more** floats → rocks ±6° at 0.9 Hz, floats bobbing out of phase;
  - piece with **exactly one** float → settles level with a knock; the next mooring post raises a flag.
- Tap an open coupling → it re-hooks (undo).
- A **welded** coupling (inside a vowel team) never opens: it shines once and shivers.
- Tap-only everywhere (phone safe, no drags required).
- **Keyboard:** Tab moves crate → crate (Floats) or coupling → coupling (Unhook); Enter toggles; C = Check.
- **Free play:** tap the water → ripple; drag a finished barge → it slides and bumps its neighbours.

## 6. The rounds
A round = one picture word: place floats (if asked), unhook, Check. **9 rounds per pass; order-only reshuffle per pass, never the same order twice in a row (§A.13.60 `nextTask`).**

**Word-pool rules** (the build applies them to `approved-words-<locale>.json`; the gate re-applies them independently):
1. the word, its `split` and its `count` come ONLY from `scripts/v2-data/verify-syllable-boundaries/output/approved-words-<locale>.json` (never re-split, never a hand list); `sources_agreed` includes `TeX` (the G1-329 rule `pool:'tex'`); `split.length === count`; da additionally `policy_managed:false` (the K-1 orthographic pool);
2. the key is a colour library picture (B&W refused by the localized marker);
3. letters only, length ≤ 10; en/de/nl/es/it/pt: no *y* anywhere in the word;
4. every gated part has **exactly one vowel group**, and no vowel group straddles a part boundary (no hiatus);
5. **core** pool: every vowel group is one letter; **team** pool: at least one group is a team from the locale's team list;
6. exclusions: en words with *y*, a final silent *e*, *-le/-les*, *-ed*, *qu/gu* + vowel, the w-teams *ow/aw/ew*; fr any word ending in a mute *e/es/ent* (the fr mute-e ruling is open, so the pool avoids it) and *qu/gu*; nl *ij*, de *ie/ei/au/eu*, es/pt/it diphthongs and fi long vowels/diphthongs only in the team pool.
- **Vowel letters:** en aeiou · de aeiouäöü · fr aeiouy éèêàâîôûëïüœ · es aeiouáéíóú · it aeiouàèéìòù · pt aeiouáéíóúâêôãõà · nl aeiou · sv aeiouyåäö · da/no aeiouyæøå · fi aeiouyäö.
- **Measured candidate pools** (critic re-measure 2026-10-17 with ALL rules above incl. the y-rule and `split.length === count`; script `scratchpad/des/work-c24/vow.js`, core = every vowel group one letter) — one-part (of which ≥ 5 letters) / two-part / three-part / four-part:
  en 121 (30) / 70 / 6 / 0 · de 97 (33) / 230 / 76 / 16 · fr 30 (3) / 61 / 26 / 4 · es 12 (0) / 125 / 171 / 58 · it 4 (0) / 109 / 173 / 79 · pt 12 (0) / 112 / 150 / 49 · nl 125 (15) / 132 / 40 / 14 · sv 158 (24) / 257 / 95 / 16 · da 79 (12) / 107 / 44 / 10 · no 142 (33) / 228 / 74 / 13 · fi 0 / 137 / 95 / 51.
  Team pool (two-part): en 28 · de 50 · fr 58 · es 33 · it 46 · pt 30 · nl 98 · fi 74 · da 3 · no 6 · sv 0 (so sv/da/no never list the team setting).
- **Bot measurement per part-count** (same script `bots.js`): the *halves* bot beats ~90 % of two-part words and 0 % of three- and four-part words; the *equal-chunk* (3-letter) bot beats 0 % of long one-part words, 60–85 % of three-part words, 0–20 % of four-part words; the *do-nothing* bot beats every one-part word and nothing else. So a mix level defeats all three only if it carries ≥ 3 long one-part words OR four-part words, and its three-part words are picked from those the chunk bot fails.

**EN Level "Two parts" (core, 9):**
| # | word | syllables | picture |
|---|---|---|---|
| 1 | rabbit | 2 | animals/rabbit |
| 2 | carrot | 2 | at-the-supermarket/carrot |
| 3 | panda | 2 | animals/panda |
| 4 | mitten | 2 | accessories/mitten |
| 5 | tractor | 2 | vehicles/tractor |
| 6 | hammer | 2 | around-the-house/hammer |
| 7 | walrus | 2 | winter/walrus |
| 8 | ladder | 2 | tools/ladder |
| 9 | trumpet | 2 | music/trumpet |

**EN Level "Mixed lengths" (core, 9) — the discriminating level:**
| # | word | syllables | picture | why it is here |
|---|---|---|---|---|
| 1 | blocks | 1 | toys/blocks | 6 letters, one vowel: equal-chunk cutters sink |
| 2 | church | 1 | christmas/church | 6 letters, one vowel |
| 3 | crab | 1 | beach/crab | a short one-part word: no unhook at all |
| 4 | dolphin | 2 | animals/dolphin | |
| 5 | popcorn | 2 | at-the-supermarket/popcorn | |
| 6 | umbrella | 3 | accessories/umbrella | a two-part cut leaves *brella* rocking |
| 7 | basketball | 3 | activities/basketball | 10 letters |
| 8 | carpenter | 3 | occupations/carpenter | |
| 9 | computer | 3 | around-the-house/computer | |

**EN team setting (Level "Two parts", 9):** balloon (things-that-fly/balloon) · raincoat (clothing/raincoat) · sailboat (beach/sailboat) · mailbox (around-the-house/mailbox) · oatmeal (breakfast/oatmeal) · beetroot (vegetables/beetroot) · scooter (toys/scooter) · reading (activities/reading) · raccoon (animals/raccoon). Removed from the measured team list by the rules: *seag|ull* (wrong split), *pen|guin*, *bis|cuit*, *squir|rel* (u after q/g or silent), *rain|bow* (w-team).

**Other locales — the mix level's exact shape (measured, not hoped):**
- **de · nl · sv · da · no · fr** (long one-part words exist): 3 one-part of ≥ 5 letters (fr has exactly 3) · 2 two-part (chosen among those the chunk bot fails) · 4 three-part (at most 1 the chunk bot beats). Posts: 3.
- **es · it · pt · fi** (no one-part word of ≥ 5 letters; fi none at all — Finnish one-syllable nouns are long vowels/diphthongs, team-only): 2 two-part (chunk-bot failures) · 4 three-part (≤ 1 chunk-bot success) · 3 four-part (chunk bot beats ≤ 20 % of them). Posts: 4. The setting label stays "Mixed lengths" in every locale; only the post count differs.
- en table above: do-nothing 3/9 (blocks, church, crab) · halves 2/9 (dolphin, popcorn) · chunk 3/9 (umbrella, carpenter, computer) — critic-measured.
de nouns keep their capital (*Hase* → crates *H a s e*; the capital is not a vowel — the gate tests it). The native reviewer checks every locale's 18 words for a picture that shows exactly that word.

**Answer position / guessability** (measured by the gate on every locale's sets):
- **Equal-chunk bot** (pieces of 3 letters), **halves bot** (one cut at the middle) and **do-nothing bot** (Check with no unhook) each succeed in **≤ 3 of 9** rounds of the mix level, in every locale (the shapes above are built to make this true; the gate computes it on the shipped sets).
- **Count bot** (always the most common part-count) ≤ 4 of 9 in the mix level (no count used more than 4 times). Note the child never *states* a count — the count bot is a design check on the set, not a guess path.
- In the "Two parts" level the middle usually lies between the two vowels — that is the rule working, not a tell; the setting names the level honestly.

## 7. Check, the misses, the success
**Floats step**
- Check with no float → no miss; the basket jiggles. Hint: "Find the vowels first. Put a float under each one."
- **Miss 1:** wrong floats pop and roll home; dashed float outlines appear under the vowels the child missed for 1.2 s, then fade. Hint: "Some floats were under letters that are not vowels. Try again."
- **Miss 2:** every vowel crate glows yellow along its top edge until the next move. Hint: "The glowing crates are vowels. Give each one a float."
- (Team setting) two floats under a real team fuse into one long float at Check with a click — one sound.

**Unhook step**
- Check with nothing unhooked on a one-part word → **success** (one level barge is the answer).
- **Miss 1** (a barge is rocking — too few unhooks): it rocks harder (±10°) for 1.2 s and the couplings between its floats pulse. Hint: "One barge has two vowels. It needs another unhook between them."
- (A sinking barge cannot exist at Check — it re-hooks itself — so a too-many-cuts child is taught by the water before Check, without a miss.)
- **Miss 2:** every legal coupling (one between two floats of the same rocking barge) shows a small brass pin; the others stay plain. Hint: "Unhook at one of the shining pins. Every barge needs exactly one float."
- A new move clears the pins and pulses until the next Check.
- **Success:** every barge level → they sail off left to right, one toot each, a beat-dot drops under each, the picture hops, then they glide back. Bubble: "{word}: {n} vowels, {n} parts, {n} beats!" e.g. "rabbit: 2 vowels, 2 parts, 2 beats!"; one-part: "crab: 1 vowel, 1 part, 1 beat!".

## 8. Settings
1. **Words:** Two parts / Mixed lengths / Vowel teams — at rest the counter shows 2, 3 (or 4 in es/it/pt/fi) mooring posts; "Vowel teams" swaps to the team pool (Two-parts shape); two floats under a real team fuse into one wide float at Check (one sound), and the coupling inside a team is welded only in the Unhook step. Offered only where the team pool has ≥ 9 words (en de fr es it pt nl fi); sv/da/no list two options.
2. **Task:** Find the vowels / Find the vowels and unhook / Unhook (floats already on) — at rest the float basket is visible (first two) or every vowel already floats (third).

## 9. Words (EN source)
- title "The Letter Barges" · instruction (floats) "Put a float under every vowel." · instruction (unhook) "Unhook the barges so each one floats level."
- hints: floatsEmpty "Find the vowels first. Put a float under each one." · floatsMiss1 "Some floats were under letters that are not vowels. Try again." · floatsMiss2 "The glowing crates are vowels. Give each one a float." · unhookMiss1 "One barge has two vowels. It needs another unhook between them." · unhookMiss2 "Unhook at one of the shining pins. Every barge needs exactly one float." · welded "These two letters make one vowel sound. They stay together."
- celebration "{word}: {n} vowels, {n} parts, {n} beats!" · one "{word}: 1 vowel, 1 part, 1 beat!"
- settings: "Words" — "Two parts" / "Mixed lengths" / "Vowel teams" · "Task" — "Find the vowels" / "Find the vowels and unhook" / "Unhook (floats already on)"
- aria: crate "{letter}, letter {i} of {len}" · float "float under {letter}" · coupling "joint between {a} and {b}, {open|closed}" · barge "barge {letters}, {level|rocking|sinking}"
- **Locale traps.** (1) School words for *syllable* and *vowel*: de "Silbe" + "Selbstlaut", fr "syllabe" + "voyelle", es "sílaba" + "vocal", nl "klankgroep" (Veilig Leren Lezen) + "klinker", sv "stavelse" + "vokal", fi "tavu" + "vokaali" — the native author uses the classroom term. (2) fi long vowels and diphthongs (*aa, ai*) are one nucleus — team pool only. (3) nl *ij* is a vowel unit — team only. (4) en *y* is excluded entirely (vowel or consonant by position). (5) fr mute *e* avoided (open ruling). (6) da only `policy_managed:false` words. (7) Plurals: "1 vowel / 2 vowels" by each locale's plural rule; fi partitive after a number ("2 vokaalia, 2 tavua"). (8) Numerals only, never number words. (9) de nouns keep the capital letter on the first crate. (10) The picture's spoken label comes from `image-vocabulary.js`; the crates spell the gated `word`.

## 10. Sound off, access, phones
- Legible with the sound off: picture, letters, floats and water carry everything; TTS (tap the picture) and the toots are a bonus.
- Keyboard path §5; a live region announces each barge's state after a move.
- Taps: crates ≥ 44 px tall (58 at 704, 44 at 360); coupling zones 44 px tall; Check 48 px.
- Picture 132 px at 704, 84 px at 360, 76 px at 320.
- Check above the fold at 360 × 740 (≈ 560) and 320 × 640 (≈ 540). Phone: picture beside the task line, counter posts under the canal.

## 11. Distinct from
- **syllable-splitter (premium tool) — read and fenced (critic 2026-10-17):** its child-facing acts are a drum tapped once per CLAP with the word hidden, beat markers that become syllable ARCS under the revealed word, syllable CARDS to scramble and rebuild, and clap-count PENS for sorting; it never grades and never speaks a syllable. Its one between-letter control is the TEACHER's own-words editor ("every seam opens closed and she taps the breaks she hears", ungraded). The barges copy none of these: no drum, no arcs, no cards, no pens, no hidden word; the word is printed from the start because RF.1.3.d is a *printed-word* standard, the vowel letters carry floats, and the water — not a teacher or a count — judges each part. **Do not add** a drum, a clap counter, arcs under the word, or scramble-the-syllables cards to this design: each would make it a copy of the paid tool.
- **Row 44 The Clay Snake:** chop a clay snake per *heard* klankgroep (oral, kindergarten, no vowel rule).
- **Row 51 Syllable-Family Lock** (pick syllables per wheel) and **Row 58 Word Elastic** (sounds of CVC words) — different acts.
- **New 216 Vowel Keystone** (vowel sounds) — no buoyancy, no splitting.
- Built registry: no float or buoyancy mechanic exists.

## 12. Build plan
- **Core** `VowelBargesCore`: `vowelGroups(word, locale, teams)` → `[{start,end}]`; `pieces(word, openJoints)` → `[{from,to,floats}]`; `state(piece)` → `'sink'|'level'|'rock'`; `checkFloats(round, placed)` → `{ok, wrongAt[], missing[]}`; `checkUnhook(round, open)` → `{ok, rocking[], parts}`; `legalJoints(round)`; `weldedJoints(round)`; `pool(locale, opts)` applying §6; `shuffledOrder` + `nextTask`.
- **The gate's own truth** (`verify-vowel-scoops-core.js`): its own per-locale vowel and team tables (not read from the core); for every round in every locale: each gated part has exactly one vowel group (re-derived), `count` equals the number of groups, the core accepts the gated split, rejects every split with a 0- or 2-group part, accepts every split with one group per part; one-part words succeed with nothing open; welded joints never open; the three bots ≤ 3/9 in the mix level; ≥ 9 rounds per offered level and locale; every picture file exists and is a colour theme.
- **Mutations (each killed):** count letters instead of vowel groups · accept a part with no vowel · accept a part with two vowels · treat a team as two vowels · let a welded joint open · floats react live before Check · accept a float under a consonant · nothing unhooked on a two-part word = success · same order every pass · team setting ignored · da pool admits a policy-managed word · en/de/nl/es/it/pt pool admits a *y* word · sv/da/no/fi or fr treats *y* as a consonant · en pool admits a final-silent-e word · fr pool admits a mute-e word · a word whose gated split length ≠ its count enters · a mix level where any bot (halves / chunk / do-nothing) beats > 3 of 9.
- **Pictures to verify on contact sheets:** toys/blocks, christmas/church, accessories/umbrella, activities/basketball (check it is a ball, not a game scene), occupations/carpenter, around-the-house/computer, vehicles/tractor, winter/walrus, tools/ladder, music/trumpet, things-that-fly/balloon, clothing/raincoat, around-the-house/mailbox, breakfast/oatmeal, vegetables/beetroot, toys/scooter, activities/reading, animals/raccoon.
- **Risks:** fr has exactly 3 long one-part words after the mute-e and y rules (measured) — if the reviewer refuses one picture, the fr mix level switches to the es/it/pt/fi shape (fr has 4 four-part words); nl team words need the reviewer's check that each team is one sound (*eu, ui, ou*). Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — unhooking couplings and watching a barge sink, rock or float is a toy, and the barges toot off down the canal.
2. **Teacher on the board?** Yes — "every syllable has one vowel sound" is the canal's physics; the class can predict which barge will sink before the tap.
3. **Parent trust?** Library pictures, gated words, no scores, no "wrong" messages — the water shows it.
4. **Invention:** vowels are floats — unhook the word into barges and only a barge with exactly one vowel rides level, so the level barges count the syllables.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 4→5
What changed:
- **The y bug** (would have shipped wrong physics): the de/nl/es/it/pt vowel tables lacked *y*, so de *Pony* or nl *baby* would cut as *po|ny* with a sinking *ny*. Now *y* is a vowel in sv/da/no/fi and fr (with a float), and every en/de/nl/es/it/pt word containing *y* is excluded; the gate's own tables carry the same rule.
- **"cake", answered honestly:** a new §3 paragraph shows why silent-e words would make the water lie (*ca|ke* would float as two barges) and how they are kept out by rule (final silent e/es/ed/le in en; mute e/es/ent in fr; medial silent e caught by the one-vowel-group-per-gated-part rule; plus `split.length === count` against the multi-source syllable count).
- **Data source pinned:** word, split and count come only from `approved-words-<locale>.json` (all 27 EN words re-checked there: TeX + rule + vocab-phonics-syl agree on every one).
- **Re-measured pools and bots per locale** (`work-c24/vow.js`, `bots.js`): es/it/pt have NO one-part word of ≥ 5 letters and fi has no one-part word at all, so the old "3 long one-part words" mix shape was impossible there; the mix level now has an exact per-locale shape (four-part words in es/it/pt/fi, 4 posts) that holds every bot ≤ 3/9. EN mix table measured: do-nothing 3, halves 2, chunk 3.
- **Settings cut to two** (Words: Two parts / Mixed lengths / Vowel teams · Task), and the team setting no longer pre-outlines the teams (that gave the answer away).
- **Distinct from the premium syllable-splitter, verified in its source:** listed what it does (drum, arcs, cards, pens, teacher seam editor) and fenced those out of this design explicitly.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
