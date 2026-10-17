# Row 176 — Dr. Plume's Sentence Clinic → THE LISTENING LINE (L.2.1 · L.2.2)

## 0. Identity
- id `sentence-clinic.fix-it.l-2-1` (frozen) · grade 2 · Common Core L.2.1 (+ L.1.2.b / L.2.2 end marks) · strand Language · own files `sentence-clinic-core.js` (new, replaces the use of `fix-it-core.js`), `sentence-clinic-activity.js`, `sentence-clinic-activity.html`, `sentence-clinic-activities.json` (row kept, params rewritten). Page title / intro / slugs en..sv frozen; da/no/fi get new slug, title, intro at build.
- worksheets it covers: **G2-274** Fix the Sentence · **G2-281** Capital and End Mark (the END-MARK half) · **G2-282** Choose the End Mark · **G2-307** Where Does It End? · **G2-311** Two Sentences: Full Stop or Question Mark?
- **Split with row 182 (orchestrator ruling, binding): THIS instrument owns END MARKS (`.` `?` `!`) and RUN-ONS (where one sentence stops and the next begins), plus the L3 sentence-grammar repairs. Row 182 (Wally) owns EVERY capital-letter rule — the sentence-start capital, I, names, places, days, brands, German nouns.** Here capitals are never graded and never a tool: every sentence start that is printed is already correct, and when the child closes a sentence inside a run-on, the next word's first letter rises to its capital BY ITSELF as a consequence of the stop (shown, not asked). The frozen page intro still lists "a missing capital" among the troubles — that half of the old deck now lives in row 182 (noted for the metadata owner; the intro stays frozen).
- old activity: 7 rounds, one per repair action (capitalize, insert-punct, swap, insert-word, reorder, delete, split), diagnose-then-repair, an owl SVG placeholder. **Kept:** the en rounds swap / insert-word / reorder / delete / split and their 8-locale translations (they become level 3 + level-2 round seeds), the "giggle and undo, never a red X" tone. **Moved to row 182:** the `capitalize` round (*my dog is happy*) of every locale and the sv *bella* name round. **Fixed:** en `swap-agree` offered *ran* in an older version ("She ran to school." is a correct sentence — two right answers) and es `swap-agree` offered *comía* — the live deck already replaced both (runned / comes now); the rule "no past form is ever offered where the subject would accept it" is written into the gate (§12). The old en reorder round *fast runs dog The* is kept; a new one-answer reorder round replaces the would-be *is big The bus* (which also reads as the question "Is the bus big?").

## 1. The pitch
"Dr. Plume listens to the sentence: a line draws the voice word by word — a full stop lets it come down and rest, a question mark lifts it and holds it open, two sentences with no stop between them tie a knot, and wherever the sentence is still muddled the line stumbles, so you can SEE where it hurts."

## 2. Why a child will want it again
- The **Listening Line** is a living pen: on Check it races along under the sentence one soft bump per word (a heartbeat made of words), and the end of each sentence *does* something you can feel — it sinks onto a flat rest with a little sigh-curl, or swoops up into an open hook and holds, waiting. Children watch it like a marble run.
- Mistakes are funny, not shameful: a missing full stop makes the line run off the card and keep going, dotted, as if the sentence can't stop talking; a run-on ties the line into a knot at the seam; a question with a full stop makes the line try to rise and get squashed — a little zigzag "ow".
- The tools are toys: three **mark drops** (`.` `?` and at L3 `!`) that plop into place, **scissors** that snip a run-on in two with a satisfying paper-split — and the moment a stop lands inside a run-on, the next word stands up straight (its first letter grows into a capital by itself: the new sentence wakes up).
- The earned show: a clean line plays, every thought draws its own arc, every arc lands; the sentence card that was lying flat on the clinic bed **sits up**, the line settles into a slow calm pulse and the whole fixed sentence is read out (sound on) or highlighted word by word (sound off). Next patient slides in.

## 3. The skill and the misconception
- Skill: a sentence ends with the mark that matches what it does (tells `.` / asks `?` / L3: exclaims `!`); two complete thoughts are two sentences (find the seam); and at L3 a sentence needs its verb, no doubled subject, words in an order that makes sense, and a verb that agrees with its subject.
- Misconceptions and how the material pushes back (all on Check, never before):
  - *"A sentence ends when the line of text ends"* → no mark = no rest: the line runs past the last word, off the card, dotted and fading.
  - *"Any mark will do"* / *"? is for long sentences"* → every sentence carries its own **tune** (data: `tell` / `ask` / `exclaim`). The tune is drawn only during the listen: an ask-sentence's line climbs over its last words; a full stop forces it down → a sharp zigzag **kink** exactly at the mark. A tell-sentence with `?` → the line wants to sink, the hook yanks it up → the same kink. The right mark lets the tune finish smoothly.
  - *"Put the full stop where it looks long enough / at the end of the line"* (run-ons) → each complete thought draws one **arc** (data: `units`). Two arcs with no rest between them collide: the second arc starts inside the end of the first and the line ties a **knot** at the seam. Stop in the wrong gap and the arcs split at the cut but one arc is left without its verb-hump — it **sags** below the baseline because "it is not a whole thought".
  - Grammar (L3): the line beats over each word; a missing verb leaves a **flat gap** between two beats; an extra word makes a **double beat**; wrong order makes the bumps go **backwards** (they point left); a non-agreeing verb gives an **off-key** jagged bump on that word.
  - (Capitals are NOT judged here — row 182. The auto-capital after a stop is a consequence the child sees, never a decision.)

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At 704 (stacked layout: apparatus left 440 px, bubble under the stage); stacked at 360 too.
- **The bed** (drawn apparatus): a long cream card 420 × 190 px at 704 (328 × 210 at 360) with a teal 3 px outline, lying slightly tilted (−2°) on two short teal legs; when cured it rotates upright to 0° and lifts 6 px.
- **The sentence** on the bed: word tiles, Nunito 800, 30 px at 704 / 24 px at 360, cream tiles with a 2 px ink outline, 10 px gaps. Lines wrap inside the bed (max 3 lines; L1 cards of three short sentences and L2 runs up to 13 words wrap to 2–3 lines at 360). Gaps between tiles are 22 px wide tap zones (44 px tall), invisible until a tool is held.
- **The Listening Line strip**: a 56 px band under the words inside the bed; a teal 4 px pen line, coral where it kinks/knots. Empty at rest (a faint dotted baseline only).
- **The tool tray** (under the bed at 704, 380 × 64; at 360 full width, 2 rows at L3): rounded slots 56 × 56: **.** drop, **?** drop, **scissors** (L2), and at L3 the **!** drop plus the four grammar tools: **caret ∧** (insert), **lift-out** (an upward arrow out of a slot — no hand drawing), **turn arrows ⟲** (reorder), **wheel ◎** (verb forms). Tools carry only their glyph — no words. There is no capital tool (row 182).
- **The bubble column** (704 right / 360 below the tray): Dr. Plume's notes — hint text 18 px, the celebration sentence. Dr. Plume is not drawn; the column shows a small round clinic badge (a plain teal circle with a white pulse squiggle, 40 px) as the speaker mark.
- **No library picture is needed**; the sentences come from the 11-locale sentence bank (`scripts/worksheet-gen/data/b2/sentences.js`) and the tables below — pictures would steal size from the words, which are the content.
- Task line (≤ 2 lines, 22 px): L1 **"Listen with Dr. Plume: give every sentence the mark it needs."** · L2 **"Listen with Dr. Plume: where does the first sentence stop?"** · L3 **"Listen with Dr. Plume: make the sentence sound right."**

## 5. The hand
- **Pick a tool**: tap a tray slot → it lifts 8 px with a soft click (60 ms) and the valid targets glow: `. ? !` → the gaps and the end of the last tile; scissors → the gaps; caret → gaps; lift → tiles; ⟲ → tiles (drag mode); ◎ → verb tiles. Tap the tool again = put it down.
- **Mark drops**: tap a gap or an end → the mark falls from 40 px above with a 140 ms plop; a mark already there is replaced; drag a mark off the bed to remove it. A mark in a middle gap **opens the gap** (the bed shows a wider 30 px pause there) and the next word's first letter grows into its capital in 180 ms (es: `¿`/`¡` appear at that start too, see §9) — removing the mark shrinks it back. Scissors are the same split for children who think "cut": a paper-snip (120 ms), the gap widens to a 30 px pause with no mark yet (the child still has to choose the mark; the letter rises when the mark lands).
- **L3 grammar tools** (kept from the old engine, now physical):
  - caret ∧ → tap a gap → a 3-tile word drawer pops up from that gap (the round's options); tap one → it slides in.
  - lift → tap a tile → it floats up and off the bed (undo: tap the empty ghost slot).
  - ⟲ → drag tiles into a new order; they shuffle aside with a 120 ms spring.
  - ◎ → tap a verb tile → its form wheel (3 forms) spins around it; tap one.
- **Check** (shell button) → the listen plays (see §7). Nothing is graded before Check; the tune and arcs are never shown before Check (so the child must read).
- **Free play between rounds**: after a cure, the child can tap any tile of the cured sentence and the Listening Line replays from that word (a gentle "read it again" toy); tapping a rest-curl makes it sigh again.

## 6. The rounds
One round = one patient card. Three levels (setting "What to fix"). Every level ≥ 7 rounds; order-only reshuffle per pass (never the same order twice in a row). All balance numbers below were measured with `work-c27/measure.js` (critic, 2026-10-17).

**Level 1 — Which mark?** (G2-281 end-mark half, G2-282). A card of THREE short sentences, each already starting with its capital, each with an empty end gap. The child drops `.` or `?` at each end (3 decisions per round — a blind guess cures 1 round in 8).
| # | card (cured) | tunes |
|---|---|---|
| 1 | The sun is hot. We swim in the pool. The water is cold. | T T T |
| 2 | My kite is red. It flies very high. Do you want a turn? | T T A |
| 3 | Ben has a new puppy. What is its name? It is called Spot. | T A T |
| 4 | Where is my hat? It was on the bed. Now it is gone. | A T T |
| 5 | Can you help me? Where are the cups? I want some milk. | A A T |
| 6 | Is this your bag? It has a fox on it. Can I hold it? | A T A |
| 7 | We baked a cake. Do you like cake? Who wants a piece? | T A A |
| 8 | Who is at the door? Is it Grandma? Did she bring the dog? | A A A |
The eight cards use all eight tell/ask patterns once: each of the three positions is an ask in exactly 4 of 8 cards; 12 asks / 12 tells in total; "always a full stop" cures only card 1, "always a question mark" only card 8, and no pattern repeats. A question is recognisable by its grammar (a question word or the verb first — *Where, What, Who, Can, Do, Is, Did*), which IS the grade-2 skill; no tell sentence starts with an auxiliary or a question word.

**Level 2 — Where does it end?** (G2-307, G2-311). Two sentences run together: the card's first letter is a capital, there is no other capital and no mark. The child puts the right mark in the right gap AND at the end (the next word's capital rises by itself).
| # | broken (as shown) | cured | words: 1st / total | tunes |
|---|---|---|---|---|
| 1 | I am hungry can we eat now | I am hungry. Can we eat now? | 3 / 7 | tell + ask |
| 2 | The dog is wet it jumped in the pond | The dog is wet. It jumped in the pond. | 4 / 9 | tell + tell |
| 3 | Look at the big red bus it is full of people | Look at the big red bus. It is full of people. | 6 / 11 | tell + tell |
| 4 | Where is my hat it was on the bed | Where is my hat? It was on the bed. | 4 / 9 | ask + tell |
| 5 | Two little ducks swim in the pond they are yellow | Two little ducks swim in the pond. They are yellow. | 7 / 10 | tell + tell |
| 6 | Do you like green frogs we have two at home | Do you like green frogs? We have two at home. | 5 / 10 | ask + tell |
| 7 | The sun is very hot the pool is cold | The sun is very hot. The pool is cold. | 5 / 9 | tell + tell |
| 8 | My kite is stuck in the tall tree can you get it down | My kite is stuck in the tall tree. Can you get it down? | 8 / 13 | tell + ask |
| 9 | It rained the grass is wet | It rained. The grass is wet. | 2 / 6 | tell + tell |
| 10 | Are you cold you can have my coat | Are you cold? You can have my coat. | 3 / 8 | ask + tell |
Measured: first-sentence length 2·3·3·4·4·5·5·6·7·8 — no length in more than 2 of 10 rounds; "cut after word N" wins at most 2 of 10; "cut at the middle gap" 3 of 10; "cut before the first pronoun" 4 of 10; "cut before *it*" 3 of 10. **No second sentence starts with *I* or a name** (they would arrive already capitalised in the run and give the seam away). 5 of 10 rounds need a `?`, so "always a full stop" cures only 5.

**Level 3 — Does it sound right?** (G2-274 + the old deck). One trouble each; capitals and marks already correct unless the trouble is a mark.
| # | broken | tool | options (shuffled) | cured |
|---|---|---|---|---|
| 1 | She run to school. | ◎ | runs · running · to run | She runs to school. |
| 2 | The cat milk. | ∧ (gap 2) | drinks · green · under | The cat drinks milk. |
| 3 | fast runs dog The | ⟲ (+ mark) | — | The dog runs fast. |
| 4 | My mom she cooks. | lift | — | My mom cooks. |
| 5 | The birds sings in the tree. | ◎ | sing · singing · to sing | The birds sing in the tree. |
| 6 | I a red kite. | ∧ (gap 1) | have · blue · over | I have a red kite. |
| 7 | We we went to the park. | lift | — | We went to the park. |
| 8 | ball the kicks Sam | ⟲ (+ mark) | — | Sam kicks the ball. |
| 9 | Mia and Ben is at school. | ◎ | are · be · being | Mia and Ben are at school. |
| 10 | What a funny frog | `!` | — | What a funny frog! |
Reorder rounds have exactly one sensible order (round 8 replaces *is big The bus*, which also makes the correct question "Is the bus big?"; *The ball kicks Sam.* is refused as not making sense — the native whitelist holds only the one sentence; the tokens carry their capitals so the start word is printed). Distractors are chosen so exactly one fills the sentence (no past form is ever offered where the subject would accept it). Option length rank measured: the right option is the unique shortest in 2 of 5 option rounds (runs, sing — 40 %, exactly the gate limit), unique longest in 1 (drinks), strict middle in 1 (are), tied in 1 (have); the locale authors must not push any rank past 40 %.

Answer position: L1/L2 have no options — the answers are places and marks, balanced above. L3 options render in random order each round.

## 7. Check, the misses, the success
- **Check with nothing done** → no listen, no miss; bubble: **"Pick a tool first — Dr. Plume needs to hear a change."**
- **The listen (every Check)**: the pen runs under the words at 260 ms per word (sound on: TTS reads at the same pace in the 5 reliable locales; sound off the active word lifts 3 px). Over each thought it draws that thought's arc (from the data). At each end gap it performs what is there against the tune: rest-curl / open hook / spike, a coral kink if the mark fights the tune, a run-off if there is no mark; a stop in the wrong gap leaves a sagging arc; two thoughts with no stop between them knot.
- **Miss 1** → the listen leaves its marks frozen on the strip: every kink, knot, sag, run-off, flat gap, double beat or backward bump stays drawn in coral with a small pulsing ring around it; nothing else is told. Bubble: **"Listen again: the line stumbles where the sentence still hurts."** (L2 knot: **"Two thoughts are squashed together here. Where does the first one end?"**)
- **Miss 2** → the listen replays at half speed and stops at the first trouble; the trouble zone is spotlit (the rest of the bed dims to 60 %) and the one tool that fixes it wiggles in the tray (for a kink: the right mark drop; for a knot: scissors; for a run-off: the mark the tune wants). Bubble: **"Try the tool that is wiggling, right here."**
- Any new tool move removes the frozen marks and the spotlight until the next Check.
- **Success** → the clean listen: smooth arcs, each landing on its rest-curl or open hook (an ask-sentence's hook releases a soft "waiting" shimmer); the bed rotates upright, the line settles into a slow pulse (three calm bumps, 600 ms apart). Bubble: **"Now it sounds right: “{sentence}”"** — the cured text in full. L2 adds: **"Two thoughts, two sentences."**

## 8. Settings
1. **What to fix**: Which mark? (L1) · Where does it end? (L2, default) · Does it sound right? (L3). The tray and the bed visibly change (L1 two drops and a three-sentence card; L2 adds scissors and a run-on card; L3 shows the grammar tools and `!`).
2. **The line**: plays at Check (default) · also shows the tune before Check (scaffold for children who cannot yet hear a question) — the tune arcs are drawn faintly from the start, without arcs' rest positions, so the child still places the marks.

## 9. Words (EN source)
- title: **Dr. Plume's Sentence Clinic** · task lines L1 **Listen with Dr. Plume: give every sentence the mark it needs.** · L2 **Listen with Dr. Plume: where does the first sentence stop?** · L3 **Listen with Dr. Plume: make the sentence sound right.**
- hints: empty **Pick a tool first — Dr. Plume needs to hear a change.** · miss 1 **Listen again: the line stumbles where the sentence still hurts.** · miss 1 (knot) **Two thoughts are squashed together here. Where does the first one end?** · miss 2 **Try the tool that is wiggling, right here.**
- celebration: **Now it sounds right: “{sentence}”** · L2 extra **Two thoughts, two sentences.**
- settings: **What to fix** — **Which mark?** · **Where does it end?** · **Does it sound right?** · **The line** — **Plays when I check** · **Shows the tune first**
- aria: tools **Full stop**, **Question mark**, **Exclamation mark**, **Scissors**, **Add a word**, **Take a word out**, **Change the order**, **Change the verb**; the line **Listening line: {state}** (e.g., "rests after hot", "knot between hot and the").
- Locale traps:
  - **es**: a question is marked at BOTH ends — `¿…?` (and `¡…!`). The `?` drop is a PAIR in es: dropping `?` at a sentence end places `¿` at the start of that same sentence automatically (the start is derived from the unit), and the tune hook opens at both ends. The child decides WHICH end gets `?` (and, in L2, where the first sentence stops); the opening sign is a consequence, exactly like the auto-capital. The cured string the gate expects carries both signs.
  - **fr**: a thin no-break space before `?` `!` (« Où est le ballon ? »); the drop inserts U+202F automatically — the child never places spaces. Questions without inversion ("Tu viens ?") exist: the tune comes from the data, never from word order, so they are fine — but L1 cards keep at least one fr question with *Est-ce que* or a question word per card so the mark is decidable from the page, not from intonation the child cannot hear.
  - **de**: every noun is printed with its capital (only the stop is the task) — row 182 teaches the Nomen rule; the auto-capital after a stop also capitalises a following noun-initial word correctly (it is already capital). `ß`/umlauts in tiles.
  - **sv/da/no/fi/nl/it/pt**: questions with no question word ("Har du en katt", "Onko sinulla kissa") — the verb-first order (and fi's question clitic *-ko/-kö*) is the real cue and the native author makes sure every L1 ask sentence carries it; tune from data.
  - **L2 seams per locale**: no second sentence may start with a word that is capitalised anyway (en *I*, names, de nouns!) — in de that means the second sentence starts with a pronoun, article-lowercase word or verb (*es, er, wir, dann*), never with a noun. The native author re-measures cut lengths per locale (no first-sentence length in more than 30 % of a locale's rounds).
  - L3 agreement rounds per locale use person/number mismatch only (de *rennen*→*rennt* with *rennst*, *rannten*; never a past form that would also be grammatical).
  - The Swedish existing rounds: *bella* (a name) moves to row 182; *å→och* and *kan att simma* stay as L3 swap/lift rounds (real Swedish child errors); the sv reorder round *Imorgon ska jag läsa.* keeps its capital on *Imorgon* (so the start word is printed and only V2 order is judged).

## 10. Sound off, access, phones
- Sound off: the line is the whole feedback; the word under the pen lifts; marks are big (the drops render `?` at 34 px). TTS is a bonus reader only.
- Keyboard: Tab through tray slots → Enter picks a tool → arrow keys move a focus ring across valid targets (tiles/gaps) → Enter applies; Esc puts the tool down; Check on Ctrl+Enter / the shell button.
- Taps: tray slots 56 px, gap zones 22 × 44 (extended invisibly to 44 × 44 by overlapping the tile edges when a gap tool is held); tiles ≥ 44 px tall.
- Phones: 360 — bed 328 × 210, words 24 px, tray 2 rows × 4 slots (L3), bubble below the tray; Check stays above the 740 fold (bed top 110, tray ends at 560, bubble 560–640, Check 650). 320 — words 22 px, bed 296 wide, max 3 lines; L2 round 8 (13 words) wraps to 3 lines and stays inside.

## 11. Distinct from
- **Row 182 Wally** (this batch) — **ruling: 182 owns capitals, 176 owns end marks and run-ons.** Wally's Reason Hooks decide every capital (sentence start, I, names, places, days, brands, de nouns); here capitals are never a tool and never graded — the only capital that moves is the automatic one after a stop.
- **Row 128 Sentence Stage** (a capital opens a curtain, the stage acts the sentence, stops at a misfit word): there the sentence is ACTED; here it is LISTENED to — the evidence is the voice-line's shape (rest / hook / kink / knot / sag), and the core teaching is the end mark and the run-on seam, which the stage does not touch.
- **Row 129 Divider Case** (commas drop walls): no containers here; the split is in the voice, not in space.
- The old clinic (diagnose-then-repair menus) — replaced by tools you hold and a line you watch.
- No premium tool listens to sentences (reading-easel scoops phrases for fluency — no punctuation, no judgment).

## 12. Build plan
- **Core** `sentence-clinic-core.js` (pure): `round = { id, level, tokens[], units:[{from,to,tune}], trouble?:{kind, at, options?, answer?} }`; state `{ marks:Map(gapIndex|'end' → '.'|'?'|'!'), cuts:Set(gap), order:[…], inserted:{gap,word}, lifted:Set, formAt:{i,form} }`; functions `applyTool(state, tool, target)`, `render(state) → text` (auto-capitalises the first letter after every placed stop with `toLocaleUpperCase(loc)`; es adds `¿`/`¡` at the start of the unit that ends in `?`/`!`; fr adds U+202F), `listen(round, state) → events[]` (beat|flatgap|doublebeat|backbeat|offkey, arc(from,to), end(rest|hook|spike|kink|runoff|knot|sag)), `isCured(round,state)` = the rendered text equals the derived clean text. The clean text is DERIVED from `units` + `tune` (+ es `¿`, fr U+202F, auto-capital), never stored.
- **Gate** `verify-sentence-clinic-core.js` (own oracle): for every round ×11 locales — the derived clean text equals the native author's cured sentence (an independent whitelist, one string per round, two only where the author lists a genuine second reading); `listen()` on the untouched round contains ≥ 1 trouble event; `listen()` on the cured state contains none; each wrong single action produces its specific event (no mark → runoff; wrong mark → kink at that end; stop in a wrong gap → sag; no stop at the seam → knot); **no round expects the child to make a capital** (the only capital changes are the auto-capitals after stops); no L2 second sentence starts with a word that is capitalised mid-sentence in that locale; L1 cards: ask share 50 % ± 10 per position, no tell/ask pattern repeated more than twice per locale; L2 first-sentence-length spread (no length > 30 % of a locale's rounds) and "cut after word N" ≤ 30 %; L3 options: exactly one option yields a whitelisted cured state; length-rank tell ≤ 40 %; reorder rounds: exactly one whitelisted order (copula reorders that also make a question are refused); es questions carry `¿`; fr marks carry U+202F.
- **Mutations** (one per rule): accept any mark · let a stop in any gap cure · store clean text instead of deriving · drop the auto-capital after a stop (the cured text would then mismatch) · grade a capital the child "should" have made · show the tune before Check by default · omit `¿` in es · let L3 options include a second valid form · accept *Is the bus big?*-type reorders · grade before Check · keep frozen miss marks after a new move · same order twice in a row.
- **Data**: L1 cards and L2 runs authored per locale from `data/b2/sentences.js` frames (11 locales) to the measured rules above; L3 = the old swap/insert/reorder/delete/split rounds ×8 locales + the new ones, da/no/fi authored new.
- **Risks**: the Listening Line must read as a voice, not a heart monitor with alarms — no beeps, no red; coral only for kinks. Long German/Finnish words: tiles shrink to 22 px before wrapping to a 4th line (never).
- Pictures: none. BLOCKED: nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — the line is a marble run you set up with mark drops and scissors, and its knots and run-offs are funny.
2. **Would a teacher put it on the board?** Yes — "read it aloud and listen where your voice stops" is exactly how teachers teach end marks and run-ons; now the whole class can see the voice.
3. **Would a parent trust it?** Calm clinic, no scores, no red crosses, nothing drawn but tiles and a line; legible with the sound off.
4. **The invention:** the Listening Line — a pen that draws the sentence's voice, resting at a full stop, holding open at a question mark, and kinking or knotting exactly where a mark is missing or wrong.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 4→5 · correctness 2→5 · distinctness 3→5 · reality 5→5
What changed:
- Applied the orchestrator ruling: 176 owns end marks and run-ons, 182 owns capitals. Removed the capital stamp, the "no capital = stumble" event and the *i → I* round; capitals are never graded here — the next word's capital rises BY ITSELF when a stop lands (es `¿` likewise). §0, §3, §11, gate and mutations say so.
- L1 was a single mark per round (a 50 % guess) and its claim "tells open with five different words" was false (*the* twice). Rebuilt L1 as three-sentence cards covering all eight tell/ask patterns once (each position ask in 4/8; blind guess 1/8).
- L2's own spread rule failed on its own table (first-sentence length 4 in 5 of 10 rounds; round 8 was 13 words, not 12; "where is my hat" counted 3, it is 4). Rebuilt and MEASURED (`work-c27/measure.js`): lengths 2–8, max 2 per length, every shortcut bot ≤ 4/10; removed seams starting with *I* (capitalised in the run = a seam tell).
- L3 round 8 *is big The bus* had two right answers ("The bus is big." / "Is the bus big?") → *ball the kicks Sam*. Length-rank claim re-measured (40 %, at the limit, recorded).
- Fixed the es contradiction (auto `¿` vs "a missing `¿` is a miss"): the `¿` is a consequence of the `?`, the decision is which end; added the de seam trap (a noun-initial second sentence arrives capitalised and gives the seam away).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
