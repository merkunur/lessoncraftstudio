# New 216 — The Vowel Keystone (RF.K.3.b)

## 0. Identity
- **id** `vowel-keystone.play.rf-k-3-b` · grade K · CCSS RF.K.3.b (associate the long and short sounds with the common spellings for the five major vowels — here its foundation: know which letters ARE vowels and that every word needs one) · strand Reading: Foundational Skills · key `vowel-keystone` → `mini tools/vowel-keystone-core.js`, `vowel-keystone-activity.js`, `vowel-keystone-activity.html`, `vowel-keystone-activities.json`. Scaffold: `node scripts/new-activity.js --num=216`.
- **Worksheet covered:** K-230 "Vowels and Consonants" (sort each letter into the vowels or the consonants) → LOAD mode; FIX mode adds the "a word needs its vowel" half.
- New instrument.

## 1. The pitch
"An arch only stands if its keystone is a vowel — so sorting the letter stones is building the bridge: vowels go up top as keystones, consonants go into the walls."

## 2. Why a child will want it again
- **Stones you can lift.** Chunky grey-blue river stones (drawn geometry, rounded, a lighter top face), each with one big lowercase letter. They clack when dropped into a cart.
- **The arch test.** On Check the carts roll onto the bridge one after another. Each stone from the keystone cart is lifted by a little crane hook and lowered into the gap at the top of the next arch. A vowel: the arch *locks* with a deep "clunk", rises 6 px and the water under it starts to sparkle. A consonant: the arch *sags* in the middle, groans, and the stone slips out and plops back onto the bank (with a splash ring).
- **The walls.** The wall-cart stones are laid as flat wall blocks on the bridge's piers — consonants hold walls, not arches. A vowel hidden in the wall cart *pops up* out of the wall and glows (it wants to be a keystone).
- **The crossing.** When every arch stands, a library animal walks across the bridge (slides with a hop per arch, 1.8 s), the water ripples, and the letters in the arches light one by one as it passes over them.
- **FIX mode:** a picture sits on top of each arch; the wrong vowel still holds the arch (it IS a vowel) but the picture stays grey — only the right vowel lights the picture. Children try every vowel just to see which hold — and that IS learning that every vowel holds.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** sort letters into vowels and consonants (K-230), and see that every word has a vowel in it.
- **Misconception 1 — "any letter can go anywhere".** The arch is a word frame with its vowel missing (c _ t). A consonant there makes *cmt* — no vowel — and the arch physically cannot stand. The child sees why vowels are special: a word falls down without one.
- **Misconception 2 — not knowing which letters are vowels**, especially the locale's own: y in sv/da/no/fi, å ä ö in sv/fi, æ ø å in da/no, ä ö ü in de, accented vowels in fr/es/pt/it. The arch accepts them all — a stone with *ä* locks an arch exactly like *a*.
- **Misconception 3 — the cart's side is the cue.** The carts swap sides every other round; only their SHAPE tells them apart (arched lid = keystone cart, flat lid = wall cart).
- Pushback is physics: the arch holds or sags; nothing says "wrong".

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stage ≈ 450 px):**
- **The stream and bridge** across the top half: a river band (soft blue, 3 px outline) with **2–4 stone arches** (as many as the round has vowels), each arch 96 px wide × 86 px high. Each arch is built from letter-stones spelling a short word with its vowel missing: e.g. **c ▢ t**. Arch letters are 26 px bold on stones 34 px. The gap stone outline at the crown is dashed.
- **The bank** below: 6 or 8 loose letter stones scattered (not in a row) on a sandy band, each 56 × 50 px with a 30 px lowercase letter.
- **Two carts** at the bank's ends, 120 × 84 px: the **keystone cart** has an arched lid outline (the shape of the arch crown); the **wall cart** has a flat lid outline with a brick pattern. No labels. They swap sides every second round.
- **Check** under the carts.
- **Task line (EN):** "Load the stones. Arch stones on top need a vowel." (LOAD) · "Pick the stone that makes the word in the picture." (FIX)

**At 360 px:** arches 72 × 66 px (max 4 across = 300 px), arch letters 20 px; bank stones 48 × 44 px with 26 px letters in a 4 × 2 grid; carts 110 × 76 side by side below the bank; Check at ≈ 600 px. At 320 × 640: arches 64 px, stones 44 px, Check ≈ 570 px.

**Library pictures:** FIX mode — one picture per arch word, 96 px at 704 / 64 px at 360, sitting on the arch's top. LOAD mode — the crossing animal (one per round): farm-animals/duck, forest-creatures/fox, farm-animals/goat, forest-creatures/hedgehog, farm-animals/pig, forest-creatures/rabbit, forest-creatures/squirrel, farm-animals/sheep, forest-creatures/turtle (seen on contact sheets). The animal waits on the left bank (80 px at 704, 64 at 360).

The only text on the apparatus is letters (content).

## 5. The hand
- **Drag a bank stone** into a cart (pointer events; the stone lifts 4 px with a shadow within 16 ms). Dropped in a cart: it clacks and stacks visibly inside (up to 8). Dropped elsewhere: slides back (150 ms).
- **Tap a stone in a cart:** it hops back to the bank.
- **Tap a bank stone:** it wiggles and (TTS where present) says the letter's NAME — never required.
- **Keyboard:** Tab to a stone, `K` = keystone cart, `W` = wall cart (also arrows Left/Right to choose a cart, Enter to drop).
- **FIX mode:** drag ONE stone up into the dashed gap of an arch; it snaps in; dragging another replaces it (the first returns to the bank). Each arch is filled independently.
- **Free play between rounds:** after the crossing, tapping any arch stone makes the arch ring; tapping the animal makes it cross again.

## 6. The rounds
**LOAD round:** 6 or 8 stones with 2–4 vowels; arches = the number of vowels; the child sorts every stone; Check. 9 rounds per pass, order-only reshuffle every pass; stone positions on the bank shuffled each time; carts swap sides on rounds 2, 4, 6, 8.

**EN, LOAD, 6 stones (core vowels a e i o u; y and w never appear in en):**
| # | stones on the bank | vowels | arch frames |
|---|---|---|---|
| 1 | a m o t s r | a o | c▢t · d▢g |
| 2 | e b i k l n | e i | h▢n · p▢g |
| 3 | u d a f p g | u a | s▢n · h▢t |
| 4 | o c e h j m | o e | f▢x · b▢d |
| 5 | i t u v s b | i u | f▢g · b▢s |
| 6 | a e o r n l | a e o | c▢p · n▢t · l▢g |
| 7 | u i k f m d | u i | m▢g · j▢g |
| 8 | e a o u p t | e a o u | j▢t · v▢n · p▢t · c▢p |
| 9 | i o g s b z | i o | p▢n · m▢p |
**EN, LOAD, 8 stones:** the same nine with two extra consonants each (b, c, d, f, g, h, j, k, l, m, n, p, r, s, t, v, z spread so each consonant appears ≥ 2 times per pass) and round 6 / 8 keep 3 / 4 vowels.
Arch frames come from the gated CVC picture words (cat dog hen pig sun hat fox bed fig bus cup net log mug jug jet van pot cap pen mop). A frame is legal if its gap held a vowel in the real word.

**EN, FIX round:** one to three arches, each with a picture; the bank holds, per arch, the right vowel + 2 other vowels + 1 consonant.
| # | picture | frame | right | other stones |
|---|---|---|---|---|
| 1 | animals/cat | c▢t | a | o u m |
| 2 | animals/dog | d▢g | o | a i s |
| 3 | animals/pig | p▢g | i | e a t |
| 4 | beach/sun | s▢n | u | a i r |
| 5 | farm-animals/hen | h▢n | e | o u p |
| 6 | vehicles/bus | b▢s | u | a i n |
| 7 | forest-creatures/fox | f▢x | o | i e l |
| 8 | around-the-house/cup | c▢p | u | a o d |
| 9 | around-the-house/bed | b▢d | e | a i m |
(FIX shows 1 arch per round at the "6 stones" setting, 2 arches at "8 stones" — rounds paired 1+2, 3+4, … so the bank then holds 8 stones.)

**Per-locale vowel sets** (stones use only these + consonants of the locale alphabet):
| locale | vowels | notes |
|---|---|---|
| en | a e i o u | y/w excluded entirely |
| de | a e i o u + ä ö ü (8-stone setting) | no ß stone |
| fr | a e i o u + é è (8-stone) | y excluded; accented counts as a vowel |
| es | a e i o u + á é í ó ú (8-stone) | ñ is a consonant stone (allowed) |
| pt | a e i o u + á é â ê ô ã (8-stone) | ç is a consonant stone |
| it | a e i o u + à è ò (8-stone) | |
| nl | a e i o u | y and ij excluded; no frames with *ij* |
| sv | a e i o u y å ä ö | all nine in both settings (Swedish school teaches nine) |
| da / no | a e i o u y æ ø å | all nine |
| fi | a e i o u y ä ö | all eight |
**Arch-frame law per locale:** a frame comes from a gated picture word (`approved-words-<locale>.json`) whose vowel letter count is exactly 1 (en de nl sv da no fr: *Hund, Bus, Zug, Kuh, Tür* · *kat, vis, vos, pet* · *katt, räv, sol, hus* · *bil, ræv, sol, hus* · *bil, rev, båt, hus* · *chat, lit, nid, bus*) — the gap is that vowel. es pt it fi have almost no such words, so frames are **CVCV** picture words with the FIRST vowel missing (es *g▢to, p▢to, l▢na, m▢no*; pt *g▢to, b▢la, c▢sa, p▢to*; it *c▢ne, r▢na, l▢na, n▢so*; fi *k▢ttu, s▢ka, t▢lo, s▢si* — never *k▢la*, whose visible second vowel IS the answer). In FIX mode the visible second vowel never equals the answer (no copy tell), and in LOAD mode no frame shows a vowel at all except in the CVCV locales, where the visible vowel is never the one the round's own stones contain. de: a frame whose gap is an umlaut (*T▢r* → *Tür*) appears only in the 8-stone setting, where ü is a stone.

**Answer position.** LOAD: there is no answer position — every stone has one right cart; the cart sides alternate. FIX: the right stone's bank position is balanced over the 4 (or 8) slots — each slot holds the answer 2–3 times per 9 rounds; the gate measures position frequency and that the right vowel is not always the one most often seen in the frames.

## 7. Check, the misses, the success
- **Check with stones still on the bank** → no miss; the bank stones bob once. Hint: "Put every stone in a cart first."
- **Miss 1:** the carts roll on. Keystone-cart stones go into the arches one by one: vowels lock their arch, each consonant sags its arch and drops back to the bank. Then wall-cart vowels pop up and roll back to the bank, glowing. Arches that still have no keystone stay open. ONLY the wrong stones return; the right ones stay in their carts. Hint: "Some stones came back. A keystone has to be a vowel."
- **Miss 2:** while a returned stone is held over an open arch, a vowel makes the arch's dashed gap shimmer gold; a consonant makes nothing happen. Hint: "Hold a stone over the arch — a vowel makes it shine."
- A new move takes the shimmer away until the next Check.
- **Success (LOAD):** every arch stands; walls are laid; the animal crosses with a hop on each arch; each arch's letters light as it passes; the vowels in the keystones glow. Bubble: "Every arch has a vowel: {vowels}! Every word needs one."
- **FIX miss 1:** a consonant sags the arch and drops; a wrong vowel holds the arch but the picture stays grey and the arch word shows under it (e.g. *cot* under the cat) — then the stone goes back. Hint: "That vowel holds the arch, but say the word: does it match the picture?" **FIX miss 2:** the picture's word is spoken (TTS) and its vowel stone on the bank lifts 4 px. **FIX success:** the picture lights in colour; "c-a-t — the a makes cat!"

## 8. Settings
1. **Mode:** Load the carts / Fix the arches.
2. **Stones:** 6 stones / 8 stones — the bank gets busier; in de/fr/es/pt/it the 8-stone setting adds the accented/umlaut vowels; in FIX it shows two arches.

## 9. Words (EN source)
- title "The Vowel Keystone" · instruction (LOAD) "Load the stones. Arch stones on top need a vowel." · instruction (FIX) "Pick the stone that makes the word in the picture."
- hints: empty "Put every stone in a cart first." · miss1 "Some stones came back. A keystone has to be a vowel." · miss2 "Hold a stone over the arch — a vowel makes it shine." · fixMiss1 "That vowel holds the arch, but say the word: does it match the picture?" · fixMiss2 "Listen to the word, and find its vowel."
- celebration (LOAD) "Every arch has a vowel: {vowels}! Every word needs one." · (FIX) "{spelled} — the {vowel} makes {word}!"
- aria: stone "Letter {letter}" · keystone cart "Keystone cart — for vowels" · wall cart "Wall cart — for consonants" · arch "Arch {i}: {frame}".
- settings "Mode": "Load the carts" / "Fix the arches"; "Stones": "6 stones" / "8 stones".
- **Locale traps.** *Vowel/consonant* school terms: de *Selbstlaut/Mitlaut* (Grundschule; *Vokal/Konsonant* in brackets only if the shipped de decks use them), fr *voyelle/consonne*, es/pt *vocal/consoante*, it *vocale/consonante*, nl *klinker/medeklinker*, sv *vokal/konsonant*, da/no *vokal/konsonant*, fi *vokaali/konsonantti*. Letter NAMES in TTS differ per locale (never spell aloud in English). sv/da/no/fi y is a vowel — never write a string implying "a e i o u are the vowels" outside en/nl/de/fr/es/pt/it. Lowercase only; de nouns would be capitalised, so de frames are shown lowercase as *letters*, and the FIX celebration writes the noun capitalised (*Hund*). The word "keystone" is not needed in other locales — "the top stone of the arch" is fine. fi frames: two vowels visible must not include y/ä/ö as the answer twice in a row.

## 10. Sound off, access, phones
- Legible with sound off: everything is letters and arches; TTS only names letters and words.
- Keyboard path in §5; aria labels in §9; the arch result announced ("Arch 2 stands", "Arch 3 fell — the stone was not a vowel").
- Taps ≥ 44 px (stones 44–56, carts ≥ 76). FIX pictures 96 px at 704, 64 at 360.
- Check above the fold at 360 × 740 and 320 × 640 (§4). Phone: carts under the bank, bubble under Check.

## 11. Distinct from
- **CVC Builder (E7)** spells whole words from sounds; it never names vowels as a class and never shows a word failing without one.
- **#225 Sorting Cabinet** (drawers that jam on matrix reasoning) — a logic sort; here the sort is tested by an arch's physics, one letter at a time.
- **#217 Article Caps** (caps that only sit on the right word) — that is grammar; this is letter class.
- **letter-tiles / blending-board tools** build words freely; neither has a vowel-only structure.

## 12. Build plan
- **Core** `VowelKeystoneCore`: `isVowel(locale, setting, ch)` (from the per-locale table; NFC-normalised); `newRound(locale, setting, entry)`; `place(stone, cart)`; `grade(state)` → `{arches:[{stone, holds}], returned:[ids], popped:[ids], ok}`; `fixGrade(arch, stone)` → `{holds, makesWord}`.
- **Gate's truth** (`verify-vowel-keystone-core.js`) keeps its OWN vowel table per locale (copied by hand from §6, not imported) and asserts: every round's arch count == vowels on the bank; every frame comes from a gated picture word and its gap held a vowel in that word; FIX right stone recreates the picture word exactly; FIX "other" stones never recreate it; frames' visible letters never contain the answer letter (CVCV locales); en rounds contain no y/w; nl no ij; accented vowels only in the 8-stone setting for de/fr/es/pt/it; carts swap on even rounds; FIX answer slot frequency 2–3 per slot per pass.
- **Mutations:** treat y as a vowel in en · treat y as a consonant in sv · drop ä from fi vowels · let an arch hold a consonant · return ALL stones on miss (not just wrong ones) · fixed cart sides · FIX: any vowel lights the picture · frame visible letters include the answer · arch count ≠ vowel count · stones in the same bank order every pass. All killed.
- **Pictures to check:** `beach/sun` (has a face — acceptable as "sun"; `spring/sun` does not exist and `weather/sun` has no label), `around-the-house/cup`, `around-the-house/bed`, plus each locale's FIX picture set on a contact sheet. Verified 2026-10-17 by the critic: every EN FIX noun (cat dog pig sun hen bus fox cup bed) and every EN LOAD frame word (hat fig net log mug jug jet van pot cap pen mop) is in `approved-words-en.json`, and every FIX picture exists in its theme JSON.
- **Risks:** de has only 9 one-vowel CVC words but 60 one-vowel short words (Hund, Fisch, Zelt…) — frames may be 4–5 letters; arch width grows to 120 px at 704 (still fits 3; 4-vowel rounds in de use ≤ 4-letter frames). Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — stones that clack, arches that groan and sag or lock with a clunk, and an animal that walks over the bridge you built.
2. **Teacher on the board?** Yes — "every word needs a vowel" is shown, not told; the class can predict which arches will fall.
3. **Parent trust?** Letters and library pictures only; the locale's real vowel set; calm, no scores.
4. **Invention:** an arch only stands on a vowel keystone — so sorting letters is building a bridge that tests itself.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- `spring/sun` does not exist → `beach/sun` (FIX round 4).
- fi frame *k▢la* broke the design's own no-copy rule (its visible vowel IS the answer) → *k▢ttu*. Verified the es/pt/it/fi CVCV frame words (gato, pato, luna, mano, bola, casa, cane, rana, naso, kettu, sika, talo, susi) are gated approved words, and every EN FIX/LOAD frame word is in `approved-words-en.json`.
- de umlaut-gap frames (*T▢r*) restricted to the 8-stone setting, where ü exists as a stone.
- The invention (an arch that only stands on a vowel keystone) is the skill itself and needed no change.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
