# Row 189 — The Echo Canyon (L.2.5.b)

## 0. Identity
- id `roary-roar-meter.shades.l-2-5-b` (KEPT) · grade 2 · Common Core L.2.5.b (distinguish shades of meaning among closely related verbs and adjectives) · strand Language · page title (frozen) "Roary's Roar Meter — Strongest & Weakest Words (Grade 2)" · own files `mini tools/echo-canyon-core.js`, `echo-canyon-activity.js`, `echo-canyon-activity.html`; manifest row stays in `roary-roar-meter-activities.json` (id, slugs en de fr es pt it nl sv, titles, intros unchanged), `tool` repointed. da/no/fi get new slug/title/intro at build.
- worksheets it covers: **G1-396** Shades of Meaning: From a Little to a Lot · **G2-358** Synonyms: Circle the Word That Means the Same · **G2-373** Synonym Pairs: Match the Words That Mean the Same · **G3-397** Word Fields: Words for Go and Look.
- what the old activity did: three related words; tap the strongest (or the weakest). **Kept:** the frozen premise (Roary's roar can be soft or mighty; strongest and weakest), the ask-strongest / ask-weakest balance, and the sets that rank cleanly: en heat (warm · hot · boiling), cold (cool · cold · freezing), good (good · great · amazing), love (like · love · adore); every locale's clean sets (de flüstern · sprechen · schreien, kühl · kalt · eiskalt, feucht · nass · klatschnass, sauer · wütend · rasend …; fr chuchoter · parler · crier …; es, pt, it, nl, sv likewise). **Fixed (pedagogical defects in the live data):** en "big · large · huge" ranked *large* stronger than *big* — they are synonyms (now a twin pair in Level 3); en "tired · sleepy · exhausted" and "sad · upset · miserable" put two words of contested strength side by side (sleepy vs tired, sad vs upset) — replaced; de "lächeln · lachen · brüllen" — *brüllen* is to roar/bellow, not a stronger laugh; de "gehen · laufen · rennen" — in southern German *laufen* means *gehen*, so the ladder has two right weakest words; pt "chuviscar · chover · despencar" — *despencar* alone does not mean heavy rain; each goes to its native author for a clean replacement. **Also fixed:** in the en data the strongest word was the longest word in most rounds (boiling, freezing, amazing, exhausted, miserable, scream), so "tap the longest" nearly always won; the new sets are chosen to break that (§6).

## 1. The pitch
"Roary roars a word into the canyon and its echo travels exactly as far as the word is strong — a whisper rings the near bell, a yell rings the far one — and two words that mean the same send one echo that rings one bell."

## 2. Why a child will want it again (the fun)
- **A lion on a rock, a canyon of bells.** Roary (library lion) stands on a ledge at the left; across a drawn canyon, three cliff posts at near, middle and far distance, each with a bell (library bell). The child drags a word to Roary's ledge and he roars it: drawn echo rings ripple out across the canyon, fading — and stop exactly at the distance of the word's strength. If a bell is there, it swings and rings (*ding* near, *dong* far).
- **Right word, right bell.** "Ring the FAR bell" — pick *huge*, and the echo sails the whole canyon. Pick *big* and the echo dies at the middle cliff, the far bell still. The echo shows the child where their word really lives.
- **The chord.** In the ordering level the child hangs the three words on the three posts, then Roary roars them all at once: if each word hangs where its echo lands, the three bells ring together in a little chord and the canyon glows; a word on the wrong post sends an echo that stops short of its bell or overshoots it.
- **Twins merge.** In the synonym level Roary roars *big*, the child roars a second word: if it's a twin (*large*), the two echoes overlap perfectly and merge into one bright ring — one bell, one clean note. A stronger shade (*huge*) races on past; an opposite (*small*) sends its echo backwards out of the canyon. Children try the wrong ones just to watch.
- **End-of-round show:** each solved round leaves a notch on Roary's roar meter (a drawn vertical meter beside the ledge, one notch per round); a full set makes Roary roar once, every bell rings in turn near to far.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** close words differ in strength (warm < hot < boiling; whisper < talk < yell); some close words mean the SAME (big = large: synonyms); verbs of going and looking form fields and differ by how fast / how long (stroll, dash; glance, stare).
- **Misconception 1 — close words all mean the same** (warm = hot = boiling). Pushback: their echoes stop at different cliffs.
- **Misconception 2 — the longest or most unusual word is the strongest** (*drizzle* stronger than *pour*). Pushback: echoes follow meaning, not letters — the short *pour* crosses the canyon, the long *drizzle* barely leaves the ledge. The data makes length useless (§6).
- **Misconception 3 — synonyms are any related words** (big = huge). Pushback: twins merge into one echo; a shade separates and rings a different bell.
- **Misconception 4 — opposites are a shade** (small as a weak *big*). Pushback: an opposite's echo leaves the canyon backwards — it isn't on this canyon at all.
- **Misconception 5 — going and looking words are one pile.** Pushback (Level 4): a look-word hung on the trail cliffs sends its echo up the lookout arm instead, and the trail bell stays silent.

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (470 × 430), bubble column right (200 px).

**At 704 px:**
- **The canyon** (450 × 260, drawn: two sandstone walls as soft bands top and bottom, the floor a lighter band; geometry only). **Roary** — library **zoo-animals/lion**, 96 px — on a drawn ledge at the left (100 × 120). **Three cliff posts** at 40 %, 65 % and 92 % of the canyon width, each a drawn post 16 × 130 topped by the library **christmas/bell** at 96 px. Below the canyon's mouth a drawn **crevice** (a dark cleft 120 × 40 at the canyon floor's left, beside the ledge) takes words that do not belong to this canyon at all (the Stray-word setting, §8).
- **Word hooks** (Levels 2 and 4): a drawn hook-tag 110 × 48 hangs under each bell where a word card can hang.
- **Word cards** (shelf under the canyon, 3–6 cards, 110 × 52, cream, Nunito 22 px).
- **The roar meter** (right of the ledge, drawn vertical bar 24 × 200 with notches).
- **Level 4:** the canyon forks — a lower trail arm and an upper lookout arm, three posts each (bells 96 px; the Level-4 canyon is 450 × 330), the arm names as content words on drawn signs at the fork: "go" · "look" (the two field words the worksheet names).
- **Task line** (≤ 24 px): L1 "Ring the FAR bell: give Roary the strongest word." / "Ring the NEAR bell: give Roary the weakest word." · L2 "Hang each word on the bell its echo will reach, from a little to a lot." · L3 "Roary says {word}. Find the word that means the SAME — one echo, one bell." · L4 "Hang the going words on the trail and the looking words on the lookout, from a little to a lot."

**At 360 px** (stacked): canyon 340 × 220; Roary 64 px; posts at the same percentages; bells 64 px; hooks 92 × 44 (Nunito 18 px); Level 4's two arms stack (lookout over trail) with three bells each at 64 px; cards 100 × 48 in two rows; meter 16 × 140. Check bottom ≤ 690 at 360 × 740 and ≤ 620 at 320 × 640 (at 320 hooks 84 × 44, cards 92 × 48, bells 64 px — the floor holds).

Pictures (library, colour): zoo-animals/lion (Roary), christmas/bell. Nothing else — the words need no pictures, and a 40 px icon would break the size floor.

## 5. The hand
- **Level 1 / 3 — drag a word card to Roary's ledge** (or tap card, then Roar; keyboard Tab/Enter). The drop IS the commit: Roary's picture leans forward (120 ms), the echo rings ripple (600–1200 ms, speed constant, distance = strength), the bell at that distance rings. Level 3: Roary first roars the given word (its echo rings its bell and its rings hold, translucent); the child's word then roars along the same canyon.
- **Level 2 / 4 — drag cards onto hooks** (drop on an occupied hook swaps; drag back to the shelf to remove). No roaring while placing (unless Practice is on, §8). **Roar** (= Check) roars every hung word at once, near to far.
- **Free play:** after any round, cards can be dropped on the ledge freely; Roary roars each one and its echo shows where it lives (nothing recorded).

## 6. The rounds
One right answer per round; strengths are the gate's own native-ranked tables. Card positions FIXED per round (balanced); the pass reshuffle permutes round order only.

**Level 1 — Strongest / weakest, EN, 10 rounds** (cards in display order A · B · C):
| # | set (weak → strong) | ask | A · B · C | right |
|---|---|---|---|---|
| 1 | tap · knock · bang | strongest | bang · tap · knock | A |
| 2 | nibble · eat · gobble | strongest | eat · gobble · nibble | B |
| 3 | drizzle · rain · pour | weakest | rain · pour · drizzle | C |
| 4 | sip · drink · gulp | strongest | gulp · sip · drink | A |
| 5 | good · great · amazing | weakest | great · good · amazing | B |
| 6 | cool · cold · freezing | strongest | cold · freezing · cool | B |
| 7 | like · love · adore | weakest | adore · love · like | C |
| 8 | annoyed · mad · furious | weakest | mad · furious · annoyed | C |
| 9 | pretty · beautiful · gorgeous | strongest | gorgeous · pretty · beautiful | A |
| 10 | warm · hot · boiling | weakest | boiling · warm · hot | B |
**Critic rewrite:** the draft's "little · big · huge" put an OPPOSITE (little) on a ladder of big — exactly misconception 4 the canyon exists to refute — and "breeze · wind · storm" are nouns, outside L.2.5.b (verbs and adjectives). Sets also moved away from row 134's ladders where a clean alternative exists (tap/knock/bang, nibble/eat/gobble, sip/drink/gulp, pretty/beautiful/gorgeous are not in 134).
**Measured (critic, `work-c28/m.js`):** positions A/B/C = 3/4/3; strongest 5 / weakest 5; "take the unique longest word" right 2/10; "take the unique shortest" 1/10; ask-aware (strongest → longest, weakest → shortest) 2/10; its inverse 1/10. The gate re-measures every locale and requires each ≤ 4/10.

**Level 2 — From a little to a lot (G1-396), EN, 8 rounds** (hang three words on near / middle / far): tap · knock · bang · sip · drink · gulp · nibble · eat · gobble · whisper · talk · yell · drizzle · rain · pour · damp · wet · soaked · cool · cold · freezing · warm · hot · boiling. Exact shelves (left → right; critic): knock · bang · tap / gulp · sip · drink / talk · yell · whisper / soaked · damp · wet / rain · pour · drizzle / boiling · warm · hot / eat · gobble · nibble / furious · annoyed · mad. **Measured:** never sorted (0/8), never reversed (0/8), "shortest first" 0/8, "the unique longest card goes far" 2/8. (The draft's 4-word ladders are DROPPED: tiny · small · big · huge runs through an opposite, shout/yell and shower/rain do not rank — the 4-bell setting is replaced, §8.)

**Level 3 — Twins (G2-358, G2-373), EN, 8 rounds** (Roary roars the given word; candidates: the twin, a shade, an opposite or unrelated word):
| # | Roary says | A · B · C | right | the others' echoes |
|---|---|---|---|---|
| 1 | large | big · huge · small | A | huge races past · small flies backwards |
| 2 | shut | slam · close · open | B | slam (stronger) races past · open backwards |
| 3 | fast | slow · yellow · quick | C | slow backwards · yellow fizzles (another canyon) |
| 4 | smart | clever · noisy · tall | A | noisy and tall both fizzle (other canyons) |
| 5 | fix | break · repair · decorate | B | break backwards · decorate fizzles |
| 6 | shouted | whispered · said · yelled | C | both stop short (weaker shades of saying) |
| 7 | happy | glad · thrilled · grumpy | A | thrilled races past · grumpy backwards |
| 8 | little | tiny · small · big | B | tiny races past (a stronger shade of little) · big backwards |
Positions 3/3/2. **Measured:** the twin is the unique longest card in 3/8 rounds, the unique shortest in 2/8 and the middle length in 3/8 — so "longest", "shortest" and "middle" bots score 3/8, 2/8 and 3/8; the gate bounds each at ≤ 3/8. Every locale's twins come from the signed synonym bank (`scripts/worksheet-gen/data/b5/locales/synonyms.<loc>.json` + `synonyms-levelset.js`, the bank row 134 also reads) — TRUE twins only (swappable in a child's sentence with no change of strength); near-synonyms are refused, and a locale ships fewer rounds (minimum 7) rather than a near-synonym.

**Level 4 — Go and look (G3-397), EN, 7 rounds** — six cards: three going words (by speed) and glance · look · stare (by how long). Going triples, one per round: walk · run · dash / creep · walk · run / stroll · run · dash / creep · run · dash / stroll · walk · dash / creep · walk · dash / stroll · walk · run. *creep* and *stroll* (both slow — their order is a matter of opinion) are never in one round; *tiptoe* is left out (it is a manner — quiet — not a speed). The six cards are dealt so no field's three cards sit together on the shelf.

**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Roar in Level 2/4 with an empty hook:** hint, no miss — the empty hook swings: "Every bell needs a word."
- **Miss 1** — the echo IS the showing. Level 1: the echo stops at the bell its word really reaches, that bell rings, the asked bell stays still. Hint: "{word}'s echo only reached the {near/middle/far} bell. Which word is {stronger/weaker}?" · Level 2: each wrongly hung word's echo stops short of its hook's bell (hint "{word} doesn't reach that far") or flies past it (hint "{word} is stronger than that"); right ones ring. · Level 3: the shade races past or stops short; the opposite flies backwards; the unrelated fizzles. Hint: "Twins send the same echo. {word} went {further/less far/the other way}." · Level 4: a word on the wrong arm sends its echo up the other arm.
- **Miss 2** — the stronger showing: Level 1 and 2 — faint footprints of every card's echo distance appear along the canyon floor (drawn dots at each word's distance, unlabelled), so the child matches words to distances; Level 3 — the twin's card gets a faint ring the same size as Roary's held echo; Level 4 — the arm signs glow and each misplaced card shows a small arrow to its arm. Hint: "Watch where each echo stops."
- **A new move takes the help away** until the next roar.
- **Success:** the bell rings (Level 2/4: the chord), a notch fills on the roar meter. Bubble: L1 "{word} is the strongest: its roar reaches the far bell!" / "{word} is the weakest: the softest roar of all!" · L2 "From a little to a lot: {a}, {b}, {c}!" · L3 "{a} and {b} mean the same — one echo, one bell!" · L4 "Going: {a}, {b}, {c}. Looking: glance, look, stare."

## 8. Settings
1. **Stray word:** off (default) · on — every Level 1/2 round adds a fourth card from ANOTHER canyon (yellow, chair, sleepy…, never an opposite); roared, its echo fizzles at the ledge, and in Level 2 it must be dropped into the crevice instead of on a hook. Visible at rest: three or four cards, and the crevice glows open. (Replaces the draft's 4-bell setting, whose ladders could not be ranked honestly.)
2. **Practice echoes:** off (default) · on — in Levels 2 and 4 each card on the shelf shows a small "try" notch, and tapping it lets Roary roar that one word before it is hung (for a first go or a pre-reader with an adult). Off, the order must come from reading; the echoes appear only on the final roar. Visible at rest: the try notches on the cards or none.

## 9. Words (EN source)
- title "Roary's Roar Meter".
- instruction "Some words are strong and some are soft. Give Roary a word: its echo goes as far as the word is strong. Twins — words that mean the same — send the same echo."
- task lines §4 · hints and celebrations §7 · labels "Roar", settings names.
- aria: "{word}: the echo reached the {near/middle/far} bell" · "{a} and {b}: one echo — they mean the same" · "{word}: the echo went the other way — the opposite" · "Bell {n}: {word}".

**Locale traps:**
- **Every ladder is native-ranked, never translated.** Strength order is a native judgement per locale (nl splits warm/heet differently from en; fr *tiède · chaud · brûlant*; fi *haalea · lämmin · kuuma*); the gate only checks distinct ranks and that no two adjacent words are listed as twins.
- **The length rule applies to every locale:** the strongest word may be the unique longest in at most 4 of 10 Level-1 rounds; native authors pick sets with short strong words (de *nieseln · regnen · schütten*, sv *duggregn … ösregn* checked for length) — the gate re-measures.
- **Verbs appear in the dictionary form** of each locale (de/nl/sv/da/no infinitives, fr/es/it/pt infinitives, fi basic -a/-ä form); adjectives in the masculine/common singular — the words are never inserted into sentences, so no agreement is generated.
- **The live defects named in §0 are fixed at source:** de brüllen (laugh ladder) and laufen (speed ladder), pt despencar, en large/sleepy/upset.
- **Twins (Level 3) from the signed synonym bank, TRUE twins only** (as settled for row 134: de anfangen/beginnen, schließen/zumachen, klug/schlau, sprechen/reden, schmutzig/dreckig; groß/riesig and klein/winzig refused — those are shades). The "said" round uses each locale's natural speech verbs (de *schreien/rufen*? — the native author decides whether a true twin of *schrie* exists; if not, that round is dropped for de).
- **Go / look fields** per locale (de gehen · rennen · flitzen / kurz hinsehen · schauen · starren; fr marcher · courir · foncer / jeter un coup d'œil · regarder · fixer — multi-word cards are fine).

## 10. Sound off, access, phones
- Silent legibility: echo rings, the stopping distance and the swinging bell carry the meaning; the bell sounds and TTS are bonuses.
- Keyboard: Tab to cards; Enter picks; Tab to the ledge or a hook; Enter places; R roars.
- aria-live per §9. Taps ≥ 44 px (cards 92 × 48+, hooks 84 × 44+). Pictures: Roary and every bell 96 px at 704 and 64 px at 360/320, in every level and setting (measured by the gate).

## 11. Distinct from
- **Row 134 The Stove Knob (L.1.5.d)** — covers the same worksheets with a knob whose flame (position) and soup (meaning) must rise together; here a single word's strength becomes a DISTANCE an echo travels, synonyms are echoes that MERGE, and opposites leave the canyon. No knob, no scale positions to turn through.
- **Row 72 The Two-Ended Rod** — opposites at the ends of one rod; here opposites are not on the canyon at all.
- **Hush Owl (premium tool)** — the room's real noise wakes an owl; here no microphone, no sleeper, the echo is a word's meaning.
- Not a reused invention: no registered design makes a word's meaning-strength a travel distance and synonyms a merged echo.

## 12. Build plan
- **Data** `echo-canyon-rounds.json` per locale: `ladders:{id:{words:[{text, rank}], four:[…]?}}`, `pick:[{ladder, ask, order:[…]}]`, `order:[{ladder, shelf:[…]}]`, `twins:[{given, cards:[{text, kind:"twin"|"stronger"|"weaker"|"opposite"|"unrelated"}]}]`, `fields:[{go:[3], look:[3], shelf:[6]}]`.
- **Core state** `{level, round, hooks:[…], ledge:null, misses}`; functions `echo(word)` → `{distance:rank|"back"|"fizzle"}`, `roar(hooks)` → `[{hook, word, hits:bool, over:bool}]`, `merge(given, word)` → bool, `check()`.
- **Gate's own ground truth** (`verify-echo-canyon-core.js`): its own rank tables per locale; asserts each L1 round has exactly one strongest/weakest, positions ≤ 4/10 in any slot, the length bots ≤ 4/10; L2 shelves never ordered or reversed, its bots ≤ 2/8; L3 each round has exactly one twin (same rank, listed as a bank twin), the other two are not twins; L4 every card belongs to one field, creep and stroll never together; the live-defect words (de brüllen in a laugh ladder, de laufen beside gehen, pt despencar alone, en large ranked above big) never appear.
- **Mutations:** echo distance by word length · twins allowed on different ranks · an opposite echoes as a weak shade · L2 accepts a reversed shelf · a ladder with tied ranks passes · Practice echoes on by default · bells ring for the wrong hook · a near-synonym admitted as a twin.
- **Pictures to confirm on contact sheets:** zoo-animals/lion, christmas/bell.
- **Risks:** the echo animation must read on a phone (rings thick enough at 340 px); four cards on the 320 px shelf (2 × 2, 92 × 48 each — measured).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a lion roaring words into a canyon and bells ringing near or far is pure play; making the opposite's echo fly backwards is a joke they'll repeat.
2. **Would a teacher put it on the board?** Yes — "how far does *drizzle* go?" turns shades of meaning into a distance the class can argue about, synonyms become one echo, and the length trick that solved the old rounds is gone.
3. **Would a parent trust it?** Yes — calm, no scores, ladders ranked by native speakers, the old ranking mistakes fixed.
4. **The invention:** a word's echo travels as far as the word is strong — and two words that mean the same send one echo to one bell.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 4→5 · reality 5→5
What changed:
- Level 1 had "little · big · huge" — an opposite on a shade ladder, the misconception the canyon is built to refute — and "breeze · wind · storm" (nouns, outside L.2.5.b). Rewritten with verbs/adjectives, half of them not in row 134's ladders; positions 3/4/3, length bots ≤ 2/10 (measured).
- The 4-bell setting's ladders could not be ranked (tiny·small·big·huge crosses an opposite; shout/yell, shower/rain tie) → replaced by a Stray-word setting (a word from another canyon must go to the crevice).
- Level 2 shelves written out and measured (never sorted/reversed, shortest-first 0/8); a corrupted, half-deleted sentence in §6 Level 3 repaired with the real synonym-bank path.
