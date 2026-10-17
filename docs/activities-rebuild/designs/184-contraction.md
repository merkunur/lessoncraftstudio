# Row 184 — The Saved Seat (L.2.2.c)

## 0. Identity
- id `contraction.apostrophe.l-2-2-c` (KEPT) · grade 2 · Common Core L.2.2.c (use an apostrophe to form contractions) · strand Language · page title (frozen) "Nib's Apostrophe Seat — Contractions (Grade 2)" · own files `mini tools/saved-seat-core.js`, `saved-seat-activity.js`, `saved-seat-activity.html`; manifest row stays in `contraction-activities.json` (id, slugs en de fr es pt it nl, titles, intros unchanged), `tool` repointed.
- worksheets it covers: none mapped.
- what the old activity did: two words → pick the contraction among three spellings (en: apostrophe index vs a "wrong index"); de Verschmelzung (im/am/zum…), fr élision, es al/del, pt contrações, it preposizioni articolate, nl 's morgens — each a 3-way pick. **Kept:** every word pair in every locale (en do not, is not, did not, it is, you are, you will, I am, will not, can not; de in dem … an das; fr le ami … la heure; es a el parque … de el árbol; pt ao parque … na casa; it in il parco … di i fiori; nl 's morgens … 's zondags, with their meaning glosses "in de ochtend" …), the old foils as the misconceptions the bench must push back on (do'nt, s' morgens, ins/am swaps). **Changed:** the child BUILDS the short form on a bench of letters instead of picking a spelling. **Fixed:** nl rounds now show the real long form ("des morgens" → "'s morgens"); the old "in de ochtend" glosses stay as the meaning line under the bench.

## 1. The pitch
"When letters leave a word, they leave their seat behind — and the apostrophe can only sit in a saved seat. The space between the two words is not a seat: it closes up when the words squeeze together."

## 2. Why a child will want it again (the fun)
- **A bench full of letters.** The two words sit side by side on a long park bench, one letter per cushion, a gap between the words. The letters that leave hop off the bench — a little bounce, a puff — into Nib's pocket, a drawn basket at the bench end.
- **The squeeze.** A big wooden handle at the bench's right end: drag it left and the second word slides along the bench, the gaps close, the space between the words vanishes — *pfft* — and the two words become one. It is pure toy; children pump it back and forth.
- **Nib the apostrophe** is a big coral apostrophe glyph (drawn content mark, no face) that the child picks up and sets down between two letters. On Check a soft cushion-glow wakes under the spot where letters left: if Nib is there he sinks into the cushion with a happy wobble and the word stands up as a finished word card.
- **End-of-round show:** the finished card unfolds like a paper fan — "don't" opens to show "do n**o**t" with the hidden letter glowing in Nib's seat — then folds shut and files onto Nib's word rail along the top. After the set, the rail plays back: every card opens and closes in a ripple.
- **Free play:** on any finished card, tapping Nib opens and closes the seat at will (the letters slide back out and in).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** a contraction joins two words; letters are left out; the apostrophe stands exactly where letters were left out — not where the two words met. Knowing which letters leave (the ones you don't say) and recognising when a word has no missing letters at all (its, were, well, shell).
- **Misconception 1 — the apostrophe goes where the words join** (do'nt, is'nt, did'nt — the most common contraction error). Pushback: the join closes during the squeeze; there is no seat there. At Check, Nib — placed at the join — slides along the bench to the saved seat one letter on.
- **Misconception 2 — no apostrophe** (dont). Pushback: the saved seat glows empty at Check; the word cannot stand up with a hole in it.
- **Misconception 3 — the wrong letters leave** (removing n from "not": do'ot). Pushback: Nib's pocket has exactly as many slots as letters that leave (visible), and the word the child built is spelled out letter by letter beside the bench to be read back ("do'ot").
- **Misconception 4 — every word that looks short has an apostrophe** (it's for its, we're for were). Pushback (Level 3): the seat test — Nib is opened in the sentence: "The dog wags it is tail."
- **Misconception 5 (fr) — élision everywhere** ("l'chat"); **(de) apostrophe in a fusion** ("in's", "zum's"); **(es) contracting the pronoun** ("al" for "a él"). Each is pushed back by the same bench (§9).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The bench** (centre, 450 × 120, drawn: two cream planks, teal legs, 2 px ink): one **letter tile** per cushion — 46 × 58, Nunito 34 px bold, ink `#2A2A2A` on cream cushions; the space between words is an empty plank stretch 36 px wide (no cushion). Max word pair 11 letters (shouldn't, couldn't) fits at 46 px; above 9 letters tiles shrink to 40 × 52.
- **The squeeze handle** (bench right end, 56 × 96, drawn wooden grip) and **Nib's pocket** (bench left end, a drawn basket 80 × 60 with N slot-dots on its rim = the number of letters that will leave; Level 1: hidden because the round removes them itself).
- **Nib** in his dish below the bench (72 × 72 dish; the apostrophe glyph 48 px, coral `#F2784B`).
- **Meaning line** under the bench (Nunito 18 px, muted): the sentence the pair comes from with the pair in bold — "I **do not** like rain." (Level 3: the sentence with the gap.)
- **Nib's word rail** (top, 450 × 48): finished cards 64 × 40, Nunito 16 px.
- **Task line** (above, ≤ 24 px): L1 "Squeeze the words. Then sit Nib where the letters left." · L2 "Tap the letters that leave. Squeeze. Then sit Nib in their seat." · L3 "Does this word need Nib? Sit him down — or leave him out."

**At 360 px** (stacked): bench 340 wide; tiles 30 × 44 (Nunito 24 px) with a 44 px tall hit area per tile and per between-letter gap (gap hit 44 × 44 overlapping tile halves); 11-letter pairs fit (11 × 30 + 24 space = 354 → tiles 28 px, hit areas unchanged); handle 44 × 72; pocket 60 × 48; Nib's dish 60 × 60; rail cards 56 × 36 in a scrolling strip; meaning line 16 px. Check bottom ≤ 680 at 360 × 740 and ≤ 610 at 320 × 640 (at 320, 11-letter pairs use 26 px tiles; the gate measures every round at 320).

No library pictures (a contraction has nothing to picture; a 40 px decoration would break the floor). Everything on the stage is apparatus geometry or the content letters themselves.

## 5. The hand
- **Tap a letter** (Level 2): it hops off (180 ms arc) into the next free slot of Nib's pocket; tap it in the pocket to send it back to its cushion. When the pocket is full, further letters wiggle and stay (the pocket shows the count, never which letters).
- **Squeeze** (drag the handle left ≥ 60 % of its travel, or tap it, or Enter): the right word slides left; every emptied cushion folds away; the space closes; 500 ms, a soft *pfft*. Dragging it back right (or tapping again) un-squeezes (letters return to their places if Level 1; in Level 2 the pocket keeps its letters).
- **Seat Nib:** drag him from the dish to any gap between two letters of the squeezed word (or the gap before its first letter); he stands there upright, 60 ms snap. Drag him elsewhere or back to the dish freely. Nothing glows before Check — the seat is not shown.
- **Level 1 replay:** a small rewind arrow (44 × 44) under the handle replays the squeeze slowly (2 s) once per press, as many times as wanted — the child may watch where the letters leave as often as they like.
- **Check:** the true seat glows (250 ms). Right → Nib sinks in, the word stands up as a card, fan-open show. Wrong → §7.

## 6. The rounds
One round = one pair (Levels 1–2) or one sentence (Level 3). One right short form; one right seat.

**Level 1 — Sit Nib (the letters leave by themselves), EN, 10 rounds:**
| # | pair → contraction | letters that leave | join position | seat position |
|---|---|---|---|---|
| 1 | do not → don't | o | after "do" | after "don" |
| 2 | is not → isn't | o | after "is" | after "isn" |
| 3 | did not → didn't | o | after "did" | after "didn" |
| 4 | was not → wasn't | o | after "was" | after "wasn" |
| 5 | are not → aren't | o | after "are" | after "aren" |
| 6 | you are → you're | a | after "you" | after "you" |
| 7 | we are → we're | a | after "we" | after "we" |
| 8 | you will → you'll | w i | after "you" | after "you" |
| 9 | I will → I'll | w i | after "I" | after "I" |
| 10 | I have → I've | h a | after "I" | after "I" |

**Level 2 — Who leaves? (the child taps the letters; pocket slots show how many), EN, 10 rounds:** has not → hasn't (o; 1 slot) · does not → doesn't (o) · could not → couldn't (o) · were not → weren't (o) · should not → shouldn't (o) · they are → they're (a) · we will → we'll (w i; 2 slots) · you have → you've (h a) · we have → we've (h a) · she will → she'll (w i).

**Level 3 — Seat or no seat? (the letters stand closed; the child seats Nib or leaves him out), EN, 10 rounds** — the bench holds the closed letters, the sentence has the gap:
| # | sentence | bench letters | right |
|---|---|---|---|
| 1 | I think ___ raining. | i t s | it's (seat after "it") |
| 2 | The dog wags ___ tail. | i t s | its (no Nib) |
| 3 | ___ time for lunch! | I t s | It's |
| 4 | ___ nest is high in the tree. | I t s | Its (no Nib) |
| 5 | Mom says ___ going to the zoo. | w e r e | we're (seat after "we") |
| 6 | ___ you at the zoo yesterday? | W e r e | Were (no Nib) |
| 7 | ___ see you after school! | W e l l | We'll (seat after "We") |
| 8 | I feel ___ today. | w e l l | well (no Nib) |
| 9 | Mom says ___ bring the cake. | s h e l l | she'll (seat after "she") |
| 10 | A ___ was lying on the sand. | s h e l l | shell (no Nib) |
(Critic fix: the first draft put every seat word at the START of its sentence and every no-seat word in the middle, so "a capital on the first tile means Nib" solved 10/10 without reading. Now seat words start the sentence in 2 of 5 rounds and no-seat words in 2 of 5 — the capital bot scores 5/10, chance; measured `work-c28/m.js`. The gate re-measures this "capital tells" bot per locale, ≤ 6/10.)
Irregular forms (won't, can't) live in the free-play rail only: tapping a finished "won't" card shows "will not" with the changed letters marked — "This one changes its letters" — never as a graded round (one right seat cannot be defined for won't).

**Answer position (measured):**
- Level 1: the seat equals the join in 5/10 (the 're/'ll/'ve rounds) and is one letter past it in 5/10 (the n't rounds) — so "always at the join" scores 5/10 and "always before the last letter" scores 5/10 (n't only; 're/'ll/'ve have two letters after the seat). No single heuristic beats 50 %, which is the floor the rule itself allows (the seat is either at the join or inside word 2). The gate asserts both bots ≤ 50 % per locale.
- Level 2: letter removal — "remove word 2's first vowel" gets o/a right but fails wi/ha: 6/10; "remove word 2's first letter" 1/10 (they're only). Seat bots as Level 1: join 5/10, before-last 5/10.
- Level 3: Nib needed 5/10 and not needed 5/10, alternating pairs of the same letters (so the letters on the bench never tell); "always seat Nib" and "never seat Nib" each 5/10.
- **Order:** order-only reshuffle per pass; Level 3 never shows the two members of a pair back to back.

## 7. Check, the misses, the success
- **Check before squeezing** (Levels 1–2): hint, no miss — the handle pulses: "Squeeze the two words together first."
- **Check with Nib still in the dish** (Levels 1–2): hint, no miss only the first time — the saved seat glows EMPTY and the word sags at the hole: "Letters left this word. Who sits in their seat?" (a second Check without Nib counts as a miss).
- **Miss 1:**
  - Nib in the wrong gap (L1/L2, right letters removed): the bench rewinds and replays the squeeze slowly with **dashed outlines left where the letters were**, then closes them; Nib stays where the child put him. Hint: "Watch where the {letters} leaves. That is Nib's seat."
  - wrong letters removed (L2): the word the child built is spelled out beside the bench, letter by letter, tile by tile ("d o ' o t"), and the pocket shows the letters taken. Hint: "Read what you made: {made}. Which letter do you NOT say in {contraction-sound}?" — {contraction-sound} is the pair said fast ("don't"), written in the hint only after miss 1, never on the board before Check.
  - Level 3, Nib seated in a no-seat word: the seat opens in the sentence — "The dog wags **it is** tail." — Hint: "Read it with the seat open. Does it make sense?" · Nib left out of a seat word: the sentence shows the word with a hollow cushion where a letter is missing — "**it·s** raining" with the hollow pulsing. Hint: "It is raining — a letter is missing here."
- **Miss 2:** Nib slides from where he stands along the bench and stops over the seat, waiting (he does not sit); in L2 the letter(s) that must leave shake on the bench. The child confirms by pressing Check. Hint: "Nib sits where the letter left — right here."
- **A new move takes the help away** until the next Check.
- **Success:** Nib sinks in, the card stands, fans open to show the long form with the hidden letters in the seat, then files to the rail. Bubble: "{pair} → {contraction}: Nib sits where the {letters} left!" · Level 3 with Nib: "{word}: {long} — a letter left, so Nib sits there." · without: "{word}: no letters left, so no Nib."

## 8. Settings
1. **Seat outlines:** off (default) · on (practice). On: emptied cushions stay as dashed outlines after the squeeze (the word closes with visible hollows) — for a first go. Visible at rest: after a squeeze the closed word has dashed hollows or none.
2. **Pocket count:** shown (default) · hidden (Level 2 only — the pocket's slot-dots disappear; the child decides how many letters leave). Visible at rest: the pocket rim with or without dots.

## 9. Words (EN source)
- title "Nib's Apostrophe Seat".
- instruction "When letters leave a word, they leave their seat. Squeeze the two words together and sit Nib, the apostrophe, in the seat the letters left."
- task lines §4 · hints and celebrations §7 · labels "Squeeze", "Replay", settings names.
- aria: "Letter {l}, cushion {n}" · "{l} left the bench" · "The words squeezed into {word}" · "Nib between {a} and {b}" · "Seat after {a}: Nib sits here".

**Locale traps — each locale keeps its own frozen teaching point (from its slug) on the same bench:**
- **fr — élision (seat stays):** "le ami → l'ami". The removed letter is always the last vowel of word 1, so the seat is ALWAYS at the join — seat placement teaches nothing in fr. The fr Level 1 is therefore **"L'élision ou pas ?"**: le chat / le ami, la table / la école, je joue / je aime, le hibou (h aspiré: no élision) / l'heure (h muet: élision) — the e/a either leaves (→ squeeze, Nib at the join, "l'ami") or stays (no squeeze: the words stay two, "le chat"); 10 rounds, élision 5/10. fr Level 2 = who leaves, with the kept old pairs (le ami, la école, je aime, de eau, ce est, me appelle, que il, ne a, la heure); Level 3 hidden. The misconception "l' ami" (space kept) cannot be built: the squeeze always closes the space.
- **The squeeze closes the space only for a JOIN** (data flag `join`): en, fr, it elision and the de/es/pt/it fusions are joins (two words become one); nl "des morgens", "mijn", "zijn", "het" are NOT — there the squeeze only folds the emptied cushions inside the first word and the space to the next word stays, so "'smorgens" cannot be built and "'s morgens" keeps its space.
- **nl — 's morgens (seat stays):** long form "des morgens": d and e leave, the seat is BEFORE the s (the gap before the word's first letter) → "'s morgens" (the old foils "s' morgens" / "'smorgens" are exactly the seat-after-s and no-space errors). Kept: morgens, avonds, nachts, middags, zomers, winters, maandags, zondags (Level 1, the meaning line keeps "in de ochtend …"); Level 2 adds the other everyday weglatingen: zo een → zo'n, mijn → m'n, zijn → z'n, het → 't (native reviewer confirms the grade). Level 3 nl (≥ 7 or hidden): zon / zo'n ("De ___ schijnt." / "Ik wil ___ ijsje.") plus reviewer-authored pairs; hidden if fewer than 7 honest pairs.
- **de — Verschmelzung (the seat CLOSES, no apostrophe):** in dem → im (n, d, e leave: 3 slots), an dem → am, zu dem → zum, zu der → zur, in das → ins, bei dem → beim, von dem → vom, an das → ans (all kept). Nib waits in his dish every round and the right move is to leave him out — the German trap "in's / auf's / zum's" (Duden: ins, aufs, zum without apostrophe). Placing Nib → at Check the seat closes under him and he is gently pushed back to the dish: "Im Deutschen schließt sich der Platz: ins." de ships Level 2 only (as "Wer geht weg?", 10 rounds with aufs, fürs added by the reviewer); Levels 1 and 3 hidden.
- **es — al / del (the seat closes):** a el parque → al parque (e leaves), de el gato → del gato … (8 kept). Level 3 es = **"¿Se juntan?"**: "a el parque / a él" and "de el gato / de él" — él with its written accent is a pronoun and never contracts ("El libro es de él."); 10 rounds, contract 5/10. The tilde is the visible cue; native reviewer checks grade fit (2.º–3.º).
- **pt-BR — contrações:** de o → do, de a → da, de os → dos, de ele → dele (deletion, seat closes); a o → ao (nothing leaves — the space just closes; the pocket has 0 slots, a lovely surprise); a a → à — **crase: one a leaves and its saved seat lands ON the remaining a as the grave accent** (the same "mark where letters left" idea); em o → no, em a → na (e leaves, and the m turns into n — shown as a visible letter change during the squeeze, never a child decision). Kept: ao parque, à escola, no mercado, na piscina, ao cinema, à praia, no quintal, na casa.
- **it — preposizioni articolate (slug) + elisione:** pure joins/deletions on the bench — a il → al, da il → dal, su il → sul (i leaves), a i → ai, da i → dai (nothing leaves); elisione with a real apostrophe (seat stays): lo albero → l'albero, la amica → l'amica, una ape → un'ape, a l'albero → all'albero (kept). The changing forms (in il → nel, di il → del, in la → nella, di lo → dello, di i → dei — all kept) show the letter change during the squeeze like pt "no", in a Level 2 where the child picks which letters leave and the change animates itself.
- **sv / da / no / fi — refused** (no slug today): none of the four forms school contractions with an apostrophe at this grade (sv/da/no use the apostrophe for genitive after -s, which is possessive, row 122's territory; fi's k-gradation apostrophe "ruo'an" is grade 3–4). Recorded refusal; the reviewer may propose a native teaching point.
- **Capitals:** a sentence-start contraction is built with its capital (It's, We're); the bench shows the capital on the first tile.

## 10. Sound off, access, phones
- Silent legibility: hopping letters, the closing space, the seat glow and Nib's slide carry every meaning; TTS (the pair, then the contraction) is a bonus.
- Keyboard: Tab to the bench; Left/Right move a cursor over letters and gaps; Enter taps a letter (L2) or seats Nib in the cursor gap; S squeezes; Enter on Check.
- aria-live per §9. Taps ≥ 44 px (tile and gap hit areas 44 tall; handle 44 × 72+; Nib 48+).
- Phone: Nib's dish moves beside the handle; the rail becomes a scroll strip above the bench.

## 11. Distinct from
- **Row 122 The Hook Tile (L.1.1.b)** — the apostrophe-s hook hangs a thing on its owner (possession); here the apostrophe marks letters that LEFT (omission). The bench and the saved seat are a different physics from a hook.
- **Row 61 The Word Keys** — letters as key teeth for sight words; nothing leaves.
- **Row 75 The Ending That Arrives With the Second Plate** — endings appear and disappear with quantity; here letters leave and a mark replaces them.
- Not a reused invention: no registered design keeps an empty seat where letters left and lets the mark sit only there.

## 12. Build plan
- **Data** `saved-seat-rounds.json` per locale: `pairs:[{id, w1, w2, leave:[indices in "w1 w2"], result, mark:"'"|"`"|null, change:{from,to}|null, sentence}]`, `seatOrNot:[{sentence, letters, needsMark}]`, `levels`, `elisionDecision` (fr: `[{w1, w2, elide:bool}]`).
- **Core state** `{level, round, removed:Set, squeezed:bool, nibAt:gap|null, misses}` (pair data carries `join:bool` — the squeeze removes the inter-word space only when true); functions `remove(i)`, `restore(i)`, `squeeze()` → `{letters, seatGap|null}` (seat = the gap where the first removed run was; null when the locale's mark is null), `seat(g)`, `check()` → `{lettersRight, seatRight, made}`.
- **Gate's own ground truth** (`verify-saved-seat-core.js`): the gate computes each contraction itself from the pair and its own leave-list and asserts `result` equals it; the seat gap is the removed run's position, never the join, for every n't round; removed letters are one contiguous run per round (else the round is refused); pocket slots = leave-list length; de/es rounds have no seat and Nib is always rejected; pt crase puts the accent on the remaining a; fr elision rounds elide iff word 2 starts with a vowel or a listed h muet; Level 3 pairs: the same letters appear once with and once without a mark; the §6 bots ≤ 50 %.
- **Mutations:** the seat placed at the join · the squeeze closes the space on a non-join (nl "'smorgens") · Level 3 sentence-start always a seat word · a squeeze that keeps the space · Nib accepted anywhere · pocket accepts more letters than slots · de accepts Nib · fr elides before a consonant · Level 3 marks "its" as needing Nib · the long form shown on the board before Check.
- **Pictures:** none.
- **Risks:** 11-letter pairs at 320 px (tile 26 px; measured at every width); TTS of contractions in locales without voices (silent path designed first).
- **Blocked:** none (sv/da/no/fi refused, §9).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — letters hopping off a bench, a squeeze handle, an apostrophe that sinks into a cushion with a wobble: it's a toy before it's a lesson.
2. **Would a teacher put it on the board?** Yes — the bench answers "why is it don't and not do'nt?" in one squeeze, the most common contraction error in Grade 2, and its/it's lives in the same apparatus.
3. **Would a parent trust it?** Yes — no pictures to doubt, no scores, every language's own rule on the same bench (German fusions close the seat, French elision keeps it).
4. **The invention:** letters that leave a word leave their seat behind, and the apostrophe can only sit in a saved seat — never in the space where the words met.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- Level 3 answer tell removed: every seat word started its sentence (capital first tile) and every no-seat word did not — "capital = Nib" solved 10/10. Rewritten table: capital bot 5/10 (measured), gate bound added.
- nl: the squeeze closed the space between "'s" and "morgens", building the very error ("'smorgens") the old foils targeted. New `join` flag: the space closes only for real joins; mutation added.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
