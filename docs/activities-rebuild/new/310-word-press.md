# New 310 — The Word Press → THE MEANING RIBBON: every stamp carries its meaning on a ribbon, so the word you print unrolls into what it means — read it in the sentence and you can see whether it fits (L.3.4.b)

## 0. Identity
- **id** `word-press.play.l-3-4-b` · grade 3 · CCSS L.3.4.b (determine the meaning of a new word formed when a known affix is added to a known word) · strand Vocabulary Acquisition and Use · key `word-press` → `word-press-core.js`, `word-press-activity.js`, `word-press-activity.html`, `word-press-activities.json`. Scaffold: `node scripts/new-activity.js --num=310`.
- **Worksheets covered:** G3-398 "Who Does It? The Person Word" (a person picture, a root word, write the person word — L1 regular endings only, L3 ≥ 4 with another ending or a spelling change) · G3-399 "Root Words in Sentences" (four words from one root, four sentences, one word per gap). Banks reused: `scripts/worksheet-gen/data/b5/word-parts.js` + `data/b5/locales/word-parts.<loc>.json` (`agents`, `sentences`, already native-reviewed — "every member a whole literal, the code never builds a word").
- New instrument; no old activity.

## 1. The pitch
"Put a root word in the press, pull a stamp down, and out comes a new word with a ribbon hanging from it that says what it means — *baker*: someone who bakes, *replay*: play again, *playful*: full of play — so when you slide the word into a sentence, you can read its meaning in place and see if the sentence still makes sense."

## 2. Why a child will want it again
- **A real little printing press.** Brass frame, a type bed holding the root's letters as wooden type blocks (each 40 × 48, the letter in Baloo 2), stamps hanging on hooks above, a long lever on the right. Pull the lever: the stamp drops with a satisfying *ka-chunk*, the type bed rolls, a paper strip slides out with the new word printed in ink — and a coloured ribbon unrolls beneath it.
- **The spelling changes are mechanical and visible.** When *bake* meets *-er*, the press's seam closes and the root's **e** is squeezed out and pops into a little "spare letters" cup; when *run* meets *-er*, a second **n** is cast from the mould and slides in; when *sleepy* meets *-ly*, the **y** tile flips over to an **i**; in German the umlaut dots drop onto the *a* of *backen → Bäcker*. Children run the lever again just to watch the e pop out.
- **Stamps stack.** Some words need two stamps: *play* + *-ful* + *-ness* → *playfulness*, the ribbon growing a second piece ("being" + "full of play"). Building a long word in two pulls is a small triumph.
- **A wrong stamp jams.** A stamp that would not make a word of this root's family (*bakeful*, *unsleep*, *teached*, *readed*) won't come down: the lever springs back with a clunk and the stamp shudders on its hook. The press only prints the family's own words, read from the bank's member list — so the child learns which affixes a root accepts by feel. Irregular pasts jam honestly: *sing* + -ed does not print *singed* (a different word — to burn), *read* + -ed does not print *readed*; no -ed frame ever uses a root whose past is irregular (sing, read, run, write, teach), so a jam is never the answer.
- **The end-of-round show — the family tree.** When the sentences are right, the four printed words fly up and hang from the root like a mobile, each with its ribbon fluttering, and the root's block glows: one root, four meanings.
- **Free play:** between rounds any stamp can be pulled on any root in the bed (jams included), and every print shows its ribbon.

## 3. The skill and the misconception
- **Skill:** a known affix changes a known word's meaning in a predictable way (-er = someone who; re- = again; -ful = full of; -less = without; -ly = in a … way; un- = not; -ness = being …; -er on an adjective = more), and the spelling at the seam sometimes changes (drop the e, double the last consonant, y → i). Choose the form the sentence needs.
- **Misconception 1 — adding the ending without the spelling change** (*bakeer*, *runer*, *sleepyly*). **Pushback:** in the "with spelling changes" level the press stops at the seam and shows the raw join (*bake|er*); the child fixes it by tapping letters (§5). If they print it unfixed, the printed strip comes out with an **ink blot over exactly the letters that are wrong** (aligned against the reviewed literal), and the ribbon doesn't unroll — a misspelled word has no meaning ribbon.
- **Misconception 2 — choosing the root (or any family member) regardless of the sentence's job** (*"The best play on our team kicked the ball"*). **Pushback:** on Check, each gap's printed word unrolls its ribbon *into the sentence* in place of the word: "The best **[full of play]** on our team kicked the ball" reads as nonsense, while "The best **[someone who plays]** on our team kicked the ball" reads true. The meaning, read in place, is the test — legible with the sound off.
- **Misconception 3 — "-er always means a person".** The *kind* family includes *kinder* ("more kind"): the same two letters, a different ribbon. The press makes the difference visible.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked: the press left 420 px, the task card right 260 px):**
- **Task line:** person words **"Print the word that fits. Pull a stamp, then slide the word into the gap."** · families **"Print four words from the root, one for each sentence."**
- **The press** (drawn apparatus: brass frame 400 × 300, 3 px ink): **stamp rack** on top — 3 stamps (person words) or 6 stamps (families) hanging on hooks, each a block 72 × 48 showing its affix as content text ("-er", "re-", "-ful"); a **type bed** in the middle holding the root's letter blocks (40 × 48, Baloo 2 700 28 px); the **lever** on the right (44 × 140 grip); the **spare-letters cup** (48 × 40) at the bed's left end; the **output tray** at the bottom where the printed strip (white paper, word 28 px) and its **ribbon** (teal, 16 px Nunito 700, white text, up to 2 lines) appear.
- **Task card (person words):** the **picture** (library, 128 px in a cream frame) above the **frame sentence** with its gap (a dashed slot 150 × 44) — e.g. picture `occupations/baker`, "This is a ___." The root word is printed small under the picture ("bake") so the child knows what went into the press.
- **Task card (families):** four **sentences** (18 px, each with a gap slot 150 × 40), stacked, and a **root stone** at the top showing the root ("play").
- **Printed words tray:** printed strips park in a column (families: up to 4) ready to drag into gaps.

**At 360 px (stacked):** task card first (picture 96 px + frame sentence; or the four sentences at 16 px with 136 × 40 slots) → the press 328 × 250 (letter blocks 34 × 42, stamps 64 × 44 in one row of 3 or two rows of 3, lever 44 × 110 at the right) → Check full width. **Fold budget 360 × 740:** person: 56 + 52 + card 190 + press 250 + Check 48 + gaps 30 = 626. Families: 56 + 52 + card 220 + press 250 + Check 48 = 626 (the four sentences scroll? no: 4 × 46 + root 36 = 220). **320 × 640:** press 296 × 230, card 200 → 600. Check above both folds.

## 5. The hand
- **Choose a stamp:** tap a stamp (or drag it onto the bed): it slides down its hook onto the bed's left or right end (prefixes left, suffixes right) and waits there, glowing.
- **The seam ("with spelling changes" level only):** when a suffix stamp meets the root the press opens a 300 ms gap and shows the raw join with a blinking seam line. The child may: **tap a letter at the seam** → it pops into the spare cup (drop the e; drop German *-en*); **press and hold a letter** → it casts a twin beside it (double the n); **tap a vowel** → it cycles through the locale's marked forms (a → ä in de/sv/fi; y → i in en). Every action is undoable by tapping the spare cup (the letter jumps back). In the "none" level the seam closes by itself, correctly and visibly (the e still pops into the cup) — in both modes, so the meaning is the only decision; in the "with" level the child closes every seam, in both modes (families include *sleepily*, *playfulness*, *usefully*).
- **Pull the lever:** a 44 px grip, drag down ≥ 60 px or tap: *ka-chunk* (250 ms), the strip slides into the tray (200 ms), the ribbon unrolls (300 ms). A non-word jams: lever springs back (180 ms) and the stamp shudders; nothing prints and no miss is counted.
- **Second stamp:** with a printed word in the bed (it stays there as the new root), another stamp can be added → stacked words.
- **Slide into a gap:** drag the printed strip to a gap; it seats (80 ms). Drag it back to the tray or to another gap. A strip can be reprinted any number of times.
- **Keyboard:** Tab: stamps → bed letters (seam tools: Delete drops, D doubles, U cycles marked forms) → lever (Enter) → strips → gaps (Enter seats) → Check.
- **Sound (bonus):** ka-chunk, the pop of a dropped letter, a metallic ting when a twin is cast, a paper rustle; TTS reads word and ribbon in voiced locales.

## 6. The rounds
**Person words (G3-398)** — one round = one picture, one root, one frame sentence; stamps -er / -ing / -ed (en; §9 for other locales) in a shuffled rack. The frames balance the answers (4 person / 3 happening now / 3 already happened), so "-er always" fails. Measured (`work-42/press.js`):

*No spelling change*

| # | picture | root | frame | answer | rack (slot of answer) |
|---|---|---|---|---|---|
| 1 | occupations/teacher | teach | This is our ___. | teacher | -ing · **-er** · -ed (2) |
| 2 | occupations/singer | sing | He is ___ a song. | singing | **-ing** · -ed · -er (1) |
| 3 | occupations/farmer | farm | This is a ___. | farmer | -ed · -ing · **-er** (3) |
| 4 | occupations/artist | paint | Yesterday Sam ___ this picture. | painted | -er · **-ed** · -ing (2) |
| 5 | activities/reading | read | She is ___ a book. | reading | -er · -ed · **-ing** (3) |
| 6 | occupations/janitor | clean | He is the ___ at our school. | cleaner | **-er** · -ing · -ed (1) |
| 7 | occupations/mechanic | fix | This morning he ___ the red car. | fixed | -ing · -er · **-ed** (3) |
| 8 | occupations/gardener | garden | This is a ___. | gardener | -ed · **-er** · -ing (2) |
| 9 | occupations/teacher | teach | She is ___ the class to count. | teaching | -ed · **-ing** · -er (2) |
| 10 | occupations/janitor | clean | Last night he ___ every room. | cleaned | **-ed** · -er · -ing (1) |

*With spelling changes*

| # | picture | root | frame | answer | seam | rack (slot) |
|---|---|---|---|---|---|---|
| 1 | occupations/baker | bake | This is a ___. | baker | drop e | **-er** · -ed · -ing (1) |
| 2 | activities/baking | bake | She is ___ a pie. | baking | drop e | -ed · **-ing** · -er (2) |
| 3 | occupations/athlete | run | This ___ is very fast. | runner | double n | -ing · **-er** · -ed (2) |
| 4 | activities/running | run | She is ___ to school. | running | double n | -er · -ed · **-ing** (3) |
| 5 | occupations/ballerina | dance | Yesterday she ___ on the big stage. | danced | drop e | **-ed** · -ing · -er (1) |
| 6 | activities/writing | write | This ___ makes books for children. | writer | drop e | -ed · **-er** · -ing (2) |
| 7 | activities/hiking | hike | Last week she ___ up a big hill. | hiked | drop e | -er · -ing · **-ed** (3) |
| 8 | occupations/singer | sing | The ___ has a guitar. | singer | none | -ing · -ed · **-er** (3) |
| 9 | occupations/artist | paint | Sam is ___ a big picture. | painting | none | **-ing** · -er · -ed (1) |
| 10 | occupations/baker | bake | Yesterday he ___ ten loaves. | baked | drop e | **-ed** · -er · -ing (1) |

- **Measured (re-run by the critic, `work-c42/c-press.js`, after the picture swaps):** answers 4 / 3 / 3 in both levels; the right stamp's rack slot 1/2/3 = 3/4/3 and 4/3/3; "pull the first stamp" bot 3/10 and 4/10; "person picture → -er, action picture → -ing" bot 5/10 in both levels (it is broken by the -ing rounds that show a person — no-change 2 and 9, change 9 —, by the -er round that shows an action — change 6 — and by every -ed round). Seams in the change level: drop e ×6, double ×2, none ×2 (so the child must decide *whether* to change, not always change). *write* and *run* never appear in -ed frames (irregular *wrote*, *ran*).
- **Ribbons (person words, generic per stamp, one literal each per locale):** -er **"a person who does it"** · -ing **"is doing it right now"** · -ed **"did it before now"**.

**Root families (G3-399)** — one round = one root, four sentences, four members; the rack holds the needed stamps plus two decoys that jam on this root. Eight families (en; 5 from the reviewed bank, 3 authored, marked *):

| # | root | members (gap order as printed) · ribbons |
|---|---|---|
| 1 | play | replay "play again" · player "someone who plays" · playfulness "being full of play" · playful "full of play" |
| 2 | act | react "act back to something" · actor "someone who acts" · action "something being done" · active "always doing things" |
| 3 | use | reuse "use again" · user "someone who uses it" · useful "good for doing something" · usefully "in a useful way" |
| 4 | sleep | sleeper "someone who sleeps" · sleepy "ready to sleep" · sleepily "in a sleepy way" · sleepiness "being sleepy" |
| 5 | joy | enjoy "find joy in" · joyful "full of joy" · joyfully "in a joyful way" · enjoyment "the joy you find in something" |
| 6* | help | helper "someone who helps" · helpful "full of help" · helpless "without help" · helpfully "in a helpful way" |
| 7* | care | careful "full of care" · careless "without care" · carefully "with care" · carelessly "without any care" |
| 8* | kind | unkind "not kind" · kindness "being kind" · kindly "in a kind way" · kinder "more kind" |

- **Authored frames** (*): help — "The ___ carried the heavy box for Grandma." · "Thank you, that map was very ___." · "The tiny bird felt ___ when it fell out of its nest." · "Sam ___ held the door open for us." · care — "Be ___ with the hot soup!" · "A ___ mistake made Ben drop the eggs." · "Mia ___ carried the full glass so nothing spilled." · "Leo threw his coat ___ on the floor." · kind — "It is ___ to laugh at a friend who falls." · "Thank you for your ___." · "The old man ___ showed us the way." · "My sister is ___ than the grumpy cat." The five bank families use their reviewed frames.
- **One arrangement only:** for every family, each member fits exactly one of its four sentences (the gate reads a hand-written fit table, §12) — e.g. *helpful* cannot go in "felt ___ when it fell", *carefully* cannot go in "threw his coat ___ on the floor".
- **Gap order:** the four sentences of a family are re-dealt in a new order every pass, so no member type (the person word, the adverb …) owns a gap position; the six-stamp rack is shuffled per round.
- **Order:** order-only reshuffle per pass (rounds and, within a family, sentence order).

## 7. Check, the misses, the success
- **Check with the gap empty** → **"Pull a stamp to print a word, then slide it into the gap."** (no miss). **A strip still in the tray** (families) → **"Every sentence needs a word."** (no miss).
- **Miss 1 — the ribbon reads itself in place:** each seated strip unrolls its ribbon over the gap for 3 s, so the sentence reads with the meaning in it; gaps that read true glow teal, the others coral. A misspelled strip shows its ink blot instead. Hints EN: **"Read the sentence with the ribbon in the gap. Does it make sense?"** · misspelled → **"The ink smudged where the spelling changes. Look at the end of the root."**
- **Miss 2 — the stamp's meaning tag:** every stamp in the rack shows, under it, the ribbon it would give **on this root** (so the same "-er" says "someone who plays" on *play* and "more kind" on *kind*), and the wrong gaps show a faint dotted outline of the *meaning they need* (not the word) — e.g. "someone who …". Seam errors: the right seam shows as a ghost for 3 s (the e greyed out, the twin n dotted). Hints EN: **"Each stamp adds a meaning. Which meaning does the sentence need?"** · **"Watch the ghost letters at the seam."**
- A new stamp, lever pull or drag takes the help away until the next Check.
- **Success:** person words — the picture's frame glows, the ribbon stays under the word: **"{word} — {ribbon}!"** e.g. "baker — a person who bakes!" (the ribbon literal joined to the word, per locale a whole literal). Families — the family mobile show: **"One root, four words: {w1}, {w2}, {w3}, {w4}!"**

## 8. Settings
1. **Mode:** person words (default) / root families in sentences — changes the task card (one picture + frame vs four sentences) and the rack (3 vs 6 stamps) at rest. In **fr** and **es** the person-words mode is hidden (the G3-398 bank is refused in those locales — agent nouns there are mostly not built from a usable verb root: *boulanger*, *panadero*); only families show.
2. **Spelling changes:** none (default) / with drop-the-e and doubling — changes the roots on the bed at rest (none: teach, sing, farm, paint, read, clean, fix, garden; with: bake, run, dance, write, hike + two no-change roots).

## 9. Words (EN source)
- title **"The Word Press"**
- instructions **"Print the word that fits. Pull a stamp, then slide the word into the gap."** · **"Print four words from the root, one for each sentence."**
- hints and celebrations as §7; ribbons as §6 (content, whole literals).
- settings **"Mode"**: "person words" / "root families in sentences" · **"Spelling changes"**: "none" / "with drop-the-e and doubling"
- aria: press `"printing press: root {root}, stamps {list}"`; strip `"printed word {word}, meaning: {ribbon}"`; gap `"sentence {i}: {sentence with blank}"`.
- **Locale traps (the big ones — agent-noun morphology differs sharply):**
  - **Person words per locale come from `word-parts.<loc>.json → agents`** (de 9, pt 8, it 8, nl 8, sv 8, da 9, no 8, fi 9; **fr and es refused** → mode hidden). The stamp rack in each locale = the locale's agent endings (`agentSuffixes`: de *-er / -erin*; pt *-eiro / -eira / -or / -ora …*; it *-iere / -ista / -ante / -tore …*; nl *-er / -ster / -es*; sv *-are*; da *-er / -ske*; no *-er*; fi *-ja / -jä / -uri*) **plus** the other two derivations the native panel picks so that the 4 / 3 / 3 balance holds (the -ing / -ed pair is English; e.g. de *backen*: **Bäcker** person · **Bäckerei** "the place where it is done" · **gebacken** "done before now"). Each ribbon is authored.
  - **Gender must match the picture** in de/pt/it/nl/da: the data's `depicted` gender (teacher, athlete, ballerina are drawn as women → de *Lehrerin*, *Läuferin*, *Tänzerin*; it *insegnante* is invariable). The frame's article agrees (de "Das ist **eine** Lehrerin."); the gate asserts the answer form = `answer[depicted]`.
  - **Seams are locale-specific:** de umlaut + dropping *-en* (*backen → Bäck-er*, *singen → Säng-er*), sv dropping the final *-a* (*städa → städ-are*), fi stem changes (*laulaa → laula-ja*), pt/it ending replacement. The seam tools (drop / double / mark) cover all of them; the native panel lists, per root, which tool(s) the seam needs, and the gate checks the literal is reachable from the root with those tools.
  - **Families per locale** from `word-parts.<loc>.json → sentences` (de *spiel, zauber*; fr *mont, saut, grand*; es *sal, flor, color*; pt *flor, motor, sal*; it *fiore, pesce, gioco, dente*; nl *zorg, brand*; sv *hjälp, lär*; da *hjælp, mal*; no *hjelp, venn*; fi *kala, ilo*) — **each locale needs 8**: the panel authors the rest, with a member fit table and ribbons; compounds (de *Zauberstab*, fi *kalastaja*) are allowed where the bank already uses them — the press then has a "word stamp" (a whole root word as a stamp) as well as affix stamps.
  - **Honest fallback for the thin banks (critic):** each locale's `families`/`rootFamilies` already list 7–8 roots with their members; only the four sentence frames per extra family are missing (the bank has 2–4 framed families per locale). A locale ships **families mode only with ≥ 7 families whose frames and fit table pass the native + pedagogy reviewer**, and **person mode only with ≥ 7 reviewed rounds holding at least 2 rounds of each stamp**. Below that the mode is hidden in that locale — never filled with a repeated family, a near-twin root or an English-pattern word. If both modes fall below 7 the activity is refused in that locale and the refusal is recorded (fr/es are the likely case: person mode is already refused there, so they ship only if 7 French / Spanish families pass).
  - **Ribbons must read in place** in the locale's word order (V2 in de/nl/sv/da/no; fi case endings) — authored as whole phrases per member, never composed.

## 10. Sound off, access, phones
- Sound off: the stamp drop, popping letters, the twin, the ink blot, ribbons unrolling into sentences, the jam's shudder are all visible.
- Keyboard path §5; focus 3 px teal; aria-live polite on the bubble.
- Taps: stamps 64 × 44 min, letter blocks 34 × 42 (hit area 44 × 44 via padding), lever 44, strips 150 × 44.
- Pictures: occupations and activities 128 px at 704, 96 px at 360 (floors met).
- Check above both folds (§4).

## 11. Distinct from
- **Row 180 Rusty's Yesterday Machine** (three doors for the past tense: -ed press, vowel dial, drawer): only the past tense, and the door choice is the skill. Here the affix's *meaning* is the skill and the ribbon is the test.
- **Row 114 The Root Stencil** (find the root inside a long word) and **Row 186 The Root Bulb** (the leftover must be a real part): decomposition. Here the child *composes*, and the meaning travels into a sentence.
- **Row 178 The Tail Plugs** (plural endings fit sockets by the word's end sound): plurals, spelling by sound shape.
- **Row 111 The Reach-Back e** (magic e changes the vowel): phonics; here the e is dropped at a suffix seam.
- **New 258 The Unchanging Picture** (a picture draws the sentence): synonyms; nothing is built.
- No reuse of a built invention.

## 12. Build plan
- **Core state:** `{ mode, level, root, bed:[letters], stamps:[{affix, side, ribbon}], seam:{dropped:[i], doubled:[i], marked:{i:ch}}, prints:[{word, ribbon, literalOk}], gaps:[{frame, fits:{word:true}, seated}], checks, help }`.
- **Functions:** `canStamp(root, affix)` → word literal | null (from the bank's fit table, never built by code); `rawJoin(root, affix)` (for the seam display only); `seamOps(root, literal)` (the drop/double/mark steps that turn the raw join into the literal — for the ghost); `print()` → `{word, ribbon}` or `{blot:[i]}`; `seat(print, gap)`; `check()` reads each gap's fit table.
- **Gate's own truth (`verify-word-press-core.js`, its own fit tables typed from §6):** every round has exactly one answer; per family the member↔sentence fit is a perfect matching (exactly one arrangement); rack slots balanced as measured; decoy stamps jam on their root in every family; the 4 / 3 / 3 split per person level; e-drop/double/none counts as tabled; *write*/*run* never in -ed frames; every literal is reachable from its root with the declared seam ops; a raw unfixed join (*bakeer*) yields a blot on exactly the differing letters; in gendered locales the person answer = `answer[depicted]`.
- **Mutations (each killed):** sing + -ed printing *singed* · an -ed frame on an irregular root · a he/she pronoun in a frame for the artist picture · the press auto-fixes the seam in the change level · a misspelled print still unrolls a ribbon · a non-word prints instead of jamming · a decoy stamp that is a real word on this root · the ribbon shown at rest (before Check) in the gaps · the right stamp always in slot 1 · mode 1 shown in fr/es · a family with two valid arrangements · kinder's ribbon "a person who is kind" · same pass order twice.
- **Pictures to verify (seen on the contact sheets):** occupations/teacher (woman, red folder), singer (boy with guitar and microphone), farmer (boy, pitchfork), artist (a child at an easel, **gender not readable** — so its frames use the name "Sam", never he/she; in gendered locales the panel picks a name and agreement that fit any child), janitor (broom), mechanic (man with a spanner beside a RED car — the frame names the red car the picture shows; replaces the photographer, whose camera reads as binoculars on the contact sheet), gardener (man, shovel), baker (man, bread), athlete (girl running), ballerina; activities/reading (girl), baking (girl), running (girl), writing (man at a desk), hiking (girl). All labelled. **Rulings honoured:** the occupation pictures hold their own tools (no frame asks for a tool); *activities/painting/singing/swimming* are NOT labelled and are not used; the teacher picture is a woman → feminine forms in gendered locales.
- **Risks:** the per-locale rebuild of the person-word stamp sets and 8 families with ribbons (one native + pedagogy reviewer per the #2 rule). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — a lever, a ka-chunk, letters that pop out and twins that are cast, long words built in two pulls.
2. **Teacher on the board?** Yes — it teaches exactly what L.3.4.b asks: an affix adds a meaning; the ribbon read in the sentence is the classroom strategy ("say the meaning instead of the word — does it still make sense?") made visible, and the seam makes the spelling rules mechanical.
3. **Parent trust?** Calm, real words only (the press jams on non-words), library pictures, no timer.
4. **Invention:** a printing press whose stamps each carry a meaning ribbon, so every printed word unrolls into what it means and can be read in place inside the sentence.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 4→5
What changed:
- **Pictures checked on the contact sheet:** occupations/photographer holds what reads as binoculars — replaced by occupations/mechanic (man, spanner, red car; "This morning he fixed the red car."); occupations/artist's gender is not readable, so its two frames now say "Sam" instead of "she", and "a red house" (not in the picture) became "a big picture". All other pictures exist and match their frames.
- **Jam rule made honest:** "only real words print" was false for *sing* + -ed (*singed* is a real, different word). The press prints only the root family's own members; irregular pasts jam and are never an -ed answer (gated).
- **Thin banks — honest fallback, no padding:** locales have 2–4 framed families against 8 needed. Each mode ships per locale only at ≥ 7 reviewed rounds (person: ≥ 2 per stamp); otherwise hidden; both below 7 → refused and recorded (fr/es the likely case).
- Re-measured the person tables after the swaps: 4/3/3 answers, slots 3/4/3 and 4/3/3, first-stamp bot 3–4/10, picture bot 5/10. (A child who reads the frame's job word — "is", "Yesterday", "This is a" — solves every round: that IS the skill, sentence role, not a tell.)
- Distinct from designs/114 (lay a root stencil over a long word: decomposition), designs/186 (the Root Bulb also lists G3-398/399, but there the child *decomposes* a given word; here the child *composes* it and carries its meaning into a sentence) and new/279 (spelling-rule stencil at a gap: no affix meaning). No shared mechanic.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
