# Row 111 — Add the Magic e → THE REACH-BACK e (RF.1.3)

## 0. Identity
- **id** `cvc-builder.build-magic-e.rf-1-3-silent-e` (KEPT; slug `add-the-magic-e`, title and intro frozen en) · grade 1 · Common Core **RF.1.3** (know the final -e convention for representing long vowel sounds; decode and spell VCe words) · strand Reading: Foundational Skills.
- **files (key `reach-back-e`)** `mini tools/reach-back-e-core.js`, `reach-back-e-activity.js`, `reach-back-e-activity.html`. The manifest row STAYS in `cvc-builder-activities.json`; only its `tool` is repointed. When row 110 and this row are both rebuilt, `cvc-builder-activity.js`/`cvc-builder-core.js` have no users left (removal is a separate operator-approved step).
- **worksheets it covers:** none mapped. (It teaches what the long-vowel worksheets assume: Row 109's minimal pair *cap/cape* is built here.)
- **what the old activity did:** a picture; the base word already typed (k-i-t); tap the e (three vowel distractors); EN, 8 words. **Kept:** the EN words that have true pictures (kite, cake, rose, cube, gate, nose) and the idea that the base is started. **Changed because it was wrong:** `cone` is `shapes/cone`, drawn as a TRUNCATED cone (picture ruling) — gone; `vase` is long a only in American English — gone; every round needed the e, so "tap the e" was always right without listening — now four rounds in nine must NOT take an e, and the child chooses the vowel too.

## 1. The pitch
"The e at the end can't make a sound — but it can reach: drop it on the end and its arm swings back over exactly one letter and taps the vowel, and the vowel turns round and says its name."

## 2. Why a child will want it again (the fun)
- **The quiet e has an arm.** In the tray the magic e is a pale silver tile with a folded wire arm and a little round hand. Drop it in the end socket and the arm unfolds with a *zing*, swings back in an arc over the letter before it, and taps the vowel with its hand — *tink!*
- **The vowel turns round.** Every vowel tile has two faces. Its front face is the short sound (teal, the lowercase letter). Tapped by the e's hand, the tile flips like a coin to its NAME face: gold, the same letter with a small crown of light — the vowel now says its name. Children flip *kit* to *kite* and back by dragging the e on and off, over and over. That is free play.
- **The arm can only reach ONE letter back.** Put the e where there are two letters between it and the vowel and the arm swings, falls short, and bonks a consonant (which just wobbles — consonants have no name face to show). Put it straight after the vowel and the arm has nothing to swing over: it flops. The arm's reach IS the rule.
- **The picture answers.** When the word is right, the picture's caption tag clips on and the picture does its little happy move; the word joins a **washing line** of word tags along the top, short words and long words hanging side by side — *cap* next to *cape*, both earned.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.1.3):** a final e is silent and makes the vowel before the last consonant long (says its name): *cap → cape, kit → kite, rob → robe*; a word without the final e keeps a short vowel; read VCe words and choose the picture; spell VCe words with the right vowel.
- **Misconception 1 — every long vowel needs the e / every word gets one.** Four rounds in nine are short-vowel pictures (*cap, hat, pig, mop* / *pot, cup, van, pen*). An e dropped there flips the vowel to its name and the word no longer names the picture: the picture card stays untagged and its own vowel badge (§4) shows "short".
- **Misconception 2 — the e itself makes a sound** (*kit-eh*). The e has no sound face at all: it has no front, only its silver arm. In Read mode the speaker sounds the word with no final vowel.
- **Misconception 3 — any e anywhere works** (*keit*, *kitte*). The arm reaches exactly one letter back — never zero, never two — so the VCe shape is something the child can SEE the arm do.
- **Misconception 4 — the wrong vowel** (*cuke* for cake). The tray always holds two vowels; the wrong one flips to the wrong name (gold U where the picture's badge shows A).
- **How the material pushes back:** the arm's reach and the coin-flip. The verdict is the picture tag clipping on or not.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 504 × 460):
- **Washing line** (top, 504 × 48): a string with nine pegs; finished word tags hang there (geometry; words are the content).
- **The picture** (y 60): library picture **160 × 160** on a cream card (`#FFF8EC`, 3 px ink rim, radius 18). In its lower-right corner a small round **vowel badge** (36 px, geometry) that is EMPTY at rest; it fills only as help (§7: teal ring = "short", gold ring = "says its name") — never at rest, or it would answer the round. Speaker 36 px.
- **The word rail** (y 250): a wooden rail 440 × 96 with sockets **80 × 88** for the base letters (consonants already seated, ink on cream, Baloo 2 48 px), ONE empty **vowel socket** (dashed outline), and at the end ONE **end socket** with a faint arc-shaped groove above it (always present, in every round — its presence never hints).
- **The tray** (y 372): tiles **72 × 80**: two vowels (the right one + one other; teal front faces) and ONE magic e (silver, the folded arm drawn on it). 3 tiles, centred.
- **Task line** above (Nunito 22 px, ≤ 2 lines). Bubble right, Check under it.

**At 360 px** (stacked): line 360 × 36 (tags smaller); picture **120 px**; rail 344 × 76 with sockets **62 × 70** (5 sockets fit for *plate/globe/slide/whale*: 5 × 62 + 4 × 6 = 334); tray tiles 64 × 72; Check bottom ≤ 680 at 360 × 740. **At 320 × 640:** picture 104 px, sockets 56 × 64 (5 × 56 + 4 × 4 = 296), tiles 58 × 66; Check bottom ≤ 620.

No words on the apparatus besides the letters (the content) and finished word tags.

## 5. The hand
- **Place a vowel:** drag a vowel tile to the vowel socket (or tap it — it flies there, 200 ms, a wooden *tok*). A second vowel replaces the first (the first flies home).
- **Drop the e:** drag the e onto the end socket (or tap it). The arm unfolds (180 ms, *zing*) and swings back on a 260 ms arc. Its geometry is fixed: the hand lands on the socket TWO places to the left of the end socket, passing over exactly one letter in between. If that socket holds a vowel, *tink*: the vowel flips to its name face (240 ms coin flip, gold). If it holds a consonant (because the child's word has two consonants at the end — only possible in Free play's open rail), the consonant wobbles and the arm retracts. If the vowel socket is still empty, the hand taps the empty socket, which glows "waiting" — the flip happens the moment a vowel arrives.
- **Take the e away:** tap the e or drag it off: the arm folds back, and the vowel flips back to its short face (*tonk*). On and off as many times as the child likes.
- **Check:** the speaker sounds the word (TTS where reliable) and the picture tag either clips on or not (§7).
- **Read mode:** the rail arrives fully built (with or without the e); the child taps the e to watch its arm (if there is one) and reads, then taps one of three pictures.
- **Free play:** between rounds the rail opens with a seven-socket "open rail" and a full tray (all five vowels, ten consonants, one e) — build anything and watch the arm reach or fall short.
- **Undo:** everything until Check; after a miss, tiles stay.

## 6. The rounds
Pass = 9 rounds; two EN sets (A, B, alternating; order reshuffled each pass, never the same order twice).

**Clue "Finish the word" (default).** The consonants are seated; the child adds a vowel and decides whether the e belongs. Tray = right vowel + one other vowel + e.

| set | picture (theme/noun) | rail (□ = vowel socket, ◇ = end socket) | answer | other vowel |
|---|---|---|---|---|
| A | kite (beach/kite) | k □ t ◇ | i + e | a |
| A | cake (4th-of-july/cake) | c □ k ◇ | a + e | u |
| A | rose (flowers/rose) | r □ s ◇ | o + e | i |
| A | cap (accessories/cap) | c □ p ◇ | a, NO e | u |
| A | cube (shapes/cube) | c □ b ◇ | u + e | a |
| A | hat (accessories/hat) | h □ t ◇ | a, NO e | i |
| A | pig (animals/pig) | p □ g ◇ | i, NO e | a |
| A | mop (around-the-house/mop) | m □ p ◇ | o, NO e | a |
| A | nose (body-parts/nose) | n □ s ◇ | o + e | u |
| B | cape (accessories/cape) | c □ p ◇ | a + e | o |
| B | plate (kitchen-tools/plate) | p l □ t ◇ | a + e | i |
| B | pot (around-the-house/pot) | p □ t ◇ | o, NO e | a |
| B | globe (classroom/globe) | g l □ b ◇ | o + e | a |
| B | slide (toys/slide) | s l □ d ◇ | i + e | o |
| B | cup (around-the-house/cup) | c □ p ◇ | u, NO e | a |
| B | van (vehicles/van) | v □ n ◇ | a, NO e | e |
| B | pen (around-the-house/pen) | p □ n ◇ | e, NO e | i |
| B | whale (beach/whale) | w h □ l ◇ | a + e | o |

Searched and refused, so the build does not re-try: no *bone*, *pine*, *robe*, *tube*, *kit* or *skate* picture exists; *flute* (/uː/ is not u's name) and *dice* (the e also softens c) are refused; *cone* is a truncated cone.

**One socket per letter** — the rail spells; it makes no sound-split claim (the *w h* of *whale* and *p l* of *plate* are separate seated letters), so no word here depends on the sound-boxes bank. Set A: 5 need e, 4 do not; set B: 5 need e, 4 do not (**measured**, `work-c23/m111.js`: an "always add the e" child is right on the e-question 5 of 9 times, "never" 4 of 9 — the old 6/3 let "always" win two thirds). Vowels needing e: A — i, a, o, u, o; B — a, a, o, i, a. Short rounds sit on a, a, o, i (A) and o, u, e, a (B), so "a always takes e" fails in both sets; *gate* and *tape* left the sets to make room (gate stays in Read and find). The **pair rounds** — *cap* (set A) and *cape* (set B) — use the SAME rail c □ p ◇ — and so does *cup* (set B) — so only the picture decides between a, u, with or without the e; the washing line keeps every finished tag across passes, so after two passes *cap* and *cape* hang side by side.

**Clue "Read and find"** — the rail arrives built; three pictures; tap the one the word names:

| # | built word | pictures (one right) |
|---|---|---|
| 1 | cape | cap · **cape** · cake |
| 2 | cap | **cap** · cape · cat (animals/cat) |
| 3 | cake | cape · **cake** · gate |
| 4 | kite | **kite** · slide · tie (accessories/tie) |
| 5 | rose | nose · globe · **rose** |
| 6 | nose | **nose** · rose · net (beach/net) |
| 7 | cube | cup · **cube** · cake |
| 8 | cup | **cup** · cube · cap |
| 9 | plate | **plate** · gate · slide | Every round has a short/long or one-letter neighbour where the library allows (cap/cape, cup/cube, rose/nose, cake/cape).

**Answer position.** Finish: no position — the vowel tray order alternates per pass (right vowel left 50 %), and the e tile's slot rotates through left/middle/right 3/3/3. Read: the right picture's slot is 3/3/3 per pass (fixed Latin square; the listed order above is NOT the display order).

**Order:** order-only reshuffle per pass.

**Other locales: EN only — refusal recorded for the other ten, with the reason.** The final silent e that lengthens the vowel is an English spelling convention. de has a *Dehnungs-h* (Kuh, Zahn, Stuhl) and *ie*, but whether the h is written is a spelling to remember, not a rule a child applies, and the reading version of it fits Row 112's vowel teams better; nl and fi mark long vowels by DOUBLING (Row 112 teaches those as teams); sv, da and no mark a SHORT vowel with a doubled consonant (the opposite direction); fr's final e is mute but lengthens nothing; es, it and pt have no long vowels. A false "magic e" in any of them would teach something untrue. The page has an EN slug only; none is created.

## 7. Check, the misses, the success
- **Check with the vowel socket empty:** hint, no miss — the socket pulses — "Pick a vowel for the middle."
- **Miss 1:** the speaker reads the built word (TTS where reliable) and the picture card stays untagged; the tile that is wrong lifts 6 px and rings coral: the e (if it should not be there), the empty end socket (if the e is missing — it glows with the faint arc groove), or the vowel (if wrong). · e that should not be there: "Listen to the picture's name. Does the vowel say its name?" · e missing: "Say the picture's name. Does the vowel say its name?" · wrong vowel: "Say the picture's name slowly. Which vowel do you hear?"
- **Miss 2:** the picture's **vowel badge** fills: a gold ring with the vowel letter ("this vowel says its name") or a teal ring with the vowel letter ("short sound") — the real answer to the e question shown, not said; for a wrong vowel, the tray dims all but the right vowel and the chosen one. · "Look at the badge: gold means the vowel says its name — that needs the e." / "Teal means a short sound — no e."
- **A new move takes the help away** (badge empties) until the next Check.
- **Success:** the vowel shows its right face, the word slides together (gaps close, 160 ms), the tag clips onto the picture (*click*), the picture hops; the tag flies to the washing line. · with e: "{kit} + e = {kite}! The e reached back and the {i} said its name." · without: "{cap} — a short {a}, no e needed!" · Read: "{c}{a}{p}{e} says {cape}!"

## 8. Settings
1. **Clue:** Finish the word (default) · Read and find — visibly different at rest (a rail with an empty vowel socket and a 3-tile tray / a built rail over three pictures).
2. **Vowel:** Pick the vowel (default — tray of two vowels) · Vowel given (the vowel is seated; the only question is the e — for children meeting the rule for the first time; tray = the e plus a decoy consonant tile, so the tray is never a single "tap me" tile). Visible at rest.

## 9. Words (EN source)
- title (shell, frozen): **Add the Magic e** · instruction: "Pick the vowel. If the vowel says its name, add the magic e."
- task lines: finish — "Build the word for the picture. Does it need the magic e?" · read — "Read the word. Which picture is it?"
- hints / celebrations: §7 exactly. First-time nudge (once per visit): "Drop the e on the end and watch its arm!"
- settings: "Clue", "Finish the word", "Read and find", "Vowel", "Pick the vowel", "Vowel given". aria: "Picture: {name}", "Rail: {letters}", "Vowel socket: {letter|empty}", "End socket: {magic e|empty}", "The e reached the {vowel}: it says its name", "The e could not reach a vowel".

**Locale traps:** EN only (§6). Inside EN: US/UK vowel differences (*vase*, *tomato*) are avoided; soft *c* words (*dice*, *rice*) are avoided because the e also softens c — a second rule the arm does not show; *cap/cape* and *cup/cube* are the only true picture pairs in the library and are used as such.

## 10. Sound off, access, phones
- **Silent legibility:** the coin-flip (teal short face ↔ gold name face), the arm's reach, the picture tag and the badge carry everything; TTS reads words where reliable.
- **Keyboard:** Tab through tray tiles; Enter seats a vowel / drops the e; Delete removes the selected tile; Space = Check; Read mode: Tab to pictures, Enter.
- **aria-live:** "The e reached the i: it says its name." / "No e needed: a short a."
- **Taps:** tiles ≥ 58 × 66, sockets ≥ 56 × 64, pictures 160 / 120 / 104 px, read-mode pictures 112 / 88 / 80 px.
- **Phone layout:** stacked; 5-socket rails measured at 320; Check above the 360 × 740 and 320 × 640 folds.

## 11. Distinct from
- **Row 109 The Sound Roll (this batch):** hears vowel length and punches it; here a SPELLING convention is a physical reach.
- **Row 112 The Talking Clasp (this batch):** two vowels clasped side by side; here a silent letter at the END acts at a distance over a consonant.
- **Row 75 The Ending That Arrives With the Second Plate** (an ending appears when a second plate lands): a trigger outside the word; here a letter INSIDE the word acts on another letter.
- **Row 130 The Mirror Chart** (spelled word shows its picture): no letter acts on another letter; no reach.
- **Built registry:** no arm, no coin-flip vowels exist.

## 12. Build plan
- **Core state** `{clue, vowelMode, set, round:{pic, consonants:[c], vowelIdx, answerVowel, needsE, otherVowel, choices|null}, vowel:null|'a'..'u', e:bool, misses, help}`.
- **Functions:** `setVowel(v)`, `dropE()`, `removeE()`, `armTarget()` (pure: index = endIdx − 2), `vowelFace()` (`'name'` iff e && vowel present at armTarget, else `'short'`), `check()` → `{ok, wrong:'vowel'|'eExtra'|'eMissing'|null}`, `readPick(i)`, `helpFor(result, misses)`.
- **Gate's own ground truth** (`verify-reach-back-e-core.js`): its OWN table of the 18 EN words with a hand-marked "long by final e" flag and vowel; asserts 5/4 e/no-e per set, the e's tray slot 3/3/3, right-vowel tray position balanced, Read slots 3/3/3; armTarget always lands on the vowel socket in every Finish rail; for each Read round exactly one picture's EN label equals the built word; no `cone`, `vase`, `dice`, `flute` reference; no non-EN rows; every picture exists in a colour theme.
- **Mutations (one per rule):** every round needs the e · arm reaches two letters back · a consonant flips to a name face · vowel stays gold after the e is removed · badge visible at rest · e tile always in the same tray slot · Read right picture always slot 1 · accept *cuke* for cake · help kept after a new move · a non-EN row shipped.
- **Pictures:** seen 2026-10-17 (`work-23/s109.png`): kite, cake, rose, cube, gate, nose, slide, plate, globe, whale, tie. Also seen (`work-23/s111.png`): cap (green baseball cap), cape (purple cape), hat, mop, pot (a lidded pot), cup (a teacup), pen, cat, net (a hand net), tape (a roll of red tape — reads as tape).
- **Risks:** the arm animation must not hide the vowel tile (the hand stops 12 px above it); every rail is one socket per letter (*whale* = w h □ l ◇, five sockets).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a silent letter with an arm that swings back and taps a vowel, which flips like a coin to gold; children drop the e on and off just to watch.
2. **Would a teacher put it on the board?** Yes — "the e reaches back over one letter and makes the vowel say its name" is exactly the rule, made visible, and four rounds in nine catch the child who puts an e on everything.
3. **Would a parent trust it?** Yes — real pictures, an honest English-only rule (not forced onto languages where it is false), calm, nothing sold.
4. **The invention:** the silent e has an arm that reaches back over exactly one letter and flips the vowel to its name face — the arm's reach is the rule.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- e / no-e balance 6/3 → 5/4 per set (pig, van replace gate, tape): an "always add the e" child now wins the e-question 5/9, not 6/9 (measured, `work-c23/m111.js`).
- The rail is one socket per letter (the old two-letter *wh* tile was an unsourced sound split); whale = w h □ l ◇ fits five sockets at 320.
- EN-only refusal checked and kept: no other locale has a final-e lengthening rule.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
