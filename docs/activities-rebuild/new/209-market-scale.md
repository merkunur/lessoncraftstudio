# New 209 — The Market Scale → THE BET PAN (K.MD.A.2)

## 0. Identity
- id `market-scale.play.k-md-a-2` · grade K · CCSS K.MD.A.2 · Measurement & Data · files `market-scale-core.js`, `market-scale-activity.js`, `market-scale-activity.html`, `market-scale-activities.json` (scaffold `node scripts/new-activity.js --num=209`).
- worksheets covered: **K-038** "Heavy or Light?" (Think about real life! Circle the HEAVIER one.) — the heavier rounds are K-038 exactly; the lighter rounds are its mirror.
- new instrument; nothing is kept from an old activity. The weight truth is shared with the worksheet family: the build adds a gram table `MARKET_WEIGHTS` (§6) that the gate checks against `scripts/worksheet-gen/lib/mass-rank.js` wherever a noun appears in both (no contradiction allowed).

## 1. The pitch
"You bet with your hand: put the thing you think is heavier on the pan with the down-arrow, pull the pin, and the scale tells you whether the big one was fooling you."

## 2. Why a child will want it again (the fun)
- **The bet is physical.** The child does not tap an answer; they carry a thing onto a pan. The pan dips 4 px while a thing hovers over it (the same dip for every object — a "ready" cue, never a weight cue) and catches it with a soft wobble.
- **The pin.** Until Check, the beam is held level by a little coral pin through the pivot. Check pulls the pin. A breath (300 ms), then the beam swings — overshoots, swings back, settles — a damped pendulum of 3 half-swings over 1.4 s. A huge weight difference tips hard; a 3:1 pair tips gently. The scale has a personality.
- **The THUNK.** When the heavy pan bottoms out on its stop, the counter shivers 2 px and three tiny grey circles puff from under the pan. The light thing on the high pan gives a hop (12 px, 220 ms) — the balloon hops highest.
- **The big-but-light surprise.** A huge pillow riding the high pan above a little iron is funny. That picture is the lesson.
- **The stall fills.** Under the counter is the market stall: a low wooden crate (a down-arrow stencilled on its side) and a hanging net (an up-arrow on its tag). After every round the heavy thing drops into the crate and the light thing floats up into the net. By the end of a pass the net holds the pillow, the balloon, the popcorn, the feather — big, light things — and the crate holds the key, the iron, the can. The whole pass sorts itself: *big things can be light*. The pass ends with the net bobbing and the crate settling (1.2 s).
- **Free play:** "Weigh anything" — a shelf of 12 things; any two on the pans, no pin, no question; the scale tips by the gram table.

## 3. The skill and the misconception
- **Skill (K.MD.A.2):** directly compare two objects by weight and say which is heavier and which is lighter. The worksheet tells the child to use real life ("Think about real life!"); here the child bets from real life and the scale confirms.
- **Misconception: bigger means heavier.** On the counter both things are drawn in **size classes that follow their real size** (pillow big, iron small), so size is visible and is the lure. In 4–5 rounds per pass the bigger-looking thing is the lighter one; in 2 more both look the same size.
- **How the material pushes back:** the bet goes on the arrow pan (▼ for heavier, ▲ for lighter). A wrong bet makes the beam tip **against the arrow** — the down-arrow pan rises in the air. No message is needed; the scale contradicts the hand. The child then swaps the two things, and the round always ends with the truth on the scale and the arrow agreeing.
- **Second push:** children who turn "lighter" into "smaller" are caught by the same physics in the ▲ rounds.

## 4. The stage
Layout `split` at ≥ 700 px (apparatus left, bubble column right); stacked below.

**At 704 px (content ≈ 672 px):**
- Apparatus column 452 × 470 px; bubble column 196 px.
- **Task line** above the apparatus, 22 px, one line.
- **The scale** (drawn geometry, teal #146B5E 3 px outlines, cream #FBF3E4 fills): central post 14 × 190 px on a base 120 × 22 px; beam 380 px long, 10 px thick, pivot cap 22 px; two pans on straight 2 px chains, each pan a dish 150 px wide × 26 px deep with a flat floor. Beam tilt ±18° max. The coral pin: a 10 × 26 px peg through the pivot cap.
- **Arrow badge:** a 40 px round badge on the LEFT pan's chain top: a bold coral (#F2784B) down-arrow (heavier) or up-arrow (lighter). The right pan has a plain dot badge so they look like a pair. The side is not the answer because the CHILD decides what goes on the arrow pan.
- **The counter** below the scale: a wooden strip 452 × 18 px; two dashed resting spots at x = 120 and x = 332.
- **Size classes** (short side of the picture box): XL 150 px (pillow, cushion, watermelon, pumpkin, popcorn, balloon, kite, pineapple), L 124 px (pot, milk, feather), M 108 px (iron, hammer, can, apple, potato, sponge), S 96 px (key, strawberry). On a pan every picture keeps its class, so it still looks big or small up there.
- **Market stall** under the counter, 452 × 92 px: the crate (180 × 70) left, the net (2 px mesh loop, 160 × 70 on a hook) right. Collected things show as 44 px thumbnails — a record, not a play target.
- **Bubble column:** feedback bubble (≤ 3 lines, 18 px), speaker 36 px, and the round's arrow repeated large (64 px).

**At 360 px:** stacked. Task line (≤ 2 lines, 20 px) → scale 328 px wide (beam 280, pans 112, post 150) → counter (classes XL 112 / L 96 / M 80 / S 68 — never under 64) → bubble → Check → stall 328 × 70 (32 px thumbnails). Check bottom ≈ 640 px, above the 360×740 fold. At 320×640 the stall hides behind a chevron so Check sits at ≈ 600 px.

**Pictures (verified in the theme JSONs and seen on contact sheets 2026-10-17):** around-the-house/pillow, cushion, iron, key, hammer; toys/balloon, kite; easter/feather; kitchen-tools/sponge, pot; At the Supermarket/can, milk, popcorn, apple, potato; fruits/watermelon, pineapple, strawberry; vegetables/pumpkin. Seen: pillow and cushion are soft pillows; the iron is a steam iron; the can is a tin; the milk is a bottle; popcorn is a big striped bag; the sponge is a kitchen sponge; the feather is one long feather; the pot is a lidded cooking pot. **Ruled out by the labels (critic 2026-10-17):** beach/rock is labelled de *Felsen*, fr *Rocher*, it *Roccia*, sv *Klippa* — a boulder or a cliff, which a child knows is heavy, so it is no lure and the sentence would read "the cliff is heavier"; around-the-house/lock is fr *Serrure* (a door lock) under a padlock picture. **Label twins:** pillow and cushion carry the SAME word in de/it/nl/sv/da/no/fi (*Kissen, Cuscino, Kussen, Kudde, Pude, Pute, Tyyny*) — they never meet in a task round, only in free play. Labels from `image-vocabulary.js` in the page locale.

**No words on the apparatus.** Arrows are icons.

## 5. The hand
- **Pick up** (pointerdown on a counter thing): within 60 ms the picture lifts (scale 1.06, soft shadow) and follows the finger 1:1. Tone: C5, 60 ms.
- **Hover a pan:** rim glows teal, pan dips 4 px.
- **Drop on a pan:** snap to centre (140 ms ease-out), wobble ±2° twice (240 ms). The OTHER thing then slides along the counter and arcs onto the other pan by itself (520 ms). The pin stays in; the beam stays level.
- **Drop elsewhere:** glides back to its spot (200 ms). No miss.
- **Undo before Check:** drag the thing off the pan; both return to the counter.
- **Check** = pull the pin: the peg slides out 20 px (120 ms), 300 ms stillness, the beam swings to its truth angle. Sounds: a wooden "tock" when the heavy pan hits its stop; a light "pip" when the light pan peaks.
- **Swap after weighing:** drag either thing to the other pan — both trade places on crossing arcs (420 ms) and the beam re-swings.
- **Tap without drag:** says the name (TTS where available); the bubble shows the word for 1.5 s.
- **Free play ("Weigh anything",** offered in the bubble column after a finished round): a shelf of 12 things above the scale; no pin; the beam swings on drop; a circle-arrow icon tips everything back. No judging.

## 6. The rounds
One round = one pair + one ask (▼ heavier or ▲ lighter). Place the bet, pull the pin, see the truth; if wrong, swap until the arrow agrees. The stall collects the pair.

**`MARKET_WEIGHTS` (everyday grams, hand-checked; one reviewer pass at build):**
feather 1 · balloon 3 · sponge 15 · strawberry 15 · key 20 · popcorn (bag) 60 · apple 180 · potato 200 · kite 200 · cushion 400 · can 400 · pillow 500 · hammer 600 · milk (bottle) 1000 · iron 1500 · pineapple 1500 · pot 2000 · pumpkin 4000 · watermelon 5000.
Every task pair has ratio ≥ 3 : 1. Beam angle = 6° + 12° × min(1, log10(ratio) / 2): 3:1 ≈ 8.9°, 10:1 = 12°, ≥ 100:1 = 18°.

Pair kinds: **LURE** (the heavier is drawn in the smaller class), **TRUE** (the heavier is also bigger), **EVEN** (same class — size says nothing).

**Level "Some surprises" (default) — 9 rounds:**
| # | left spot | right spot | heavier | kind | ask (right answer) |
|---|---|---|---|---|---|
| 1 | watermelon XL | apple M | watermelon | TRUE | ▼ watermelon |
| 2 | balloon XL | hammer M | hammer | LURE | ▲ balloon |
| 3 | can M | popcorn XL | can | LURE | ▼ can |
| 4 | pumpkin XL | strawberry S | pumpkin | TRUE | ▲ strawberry |
| 5 | pillow XL | iron M | iron | LURE | ▼ iron |
| 6 | sponge M | potato M | potato | EVEN | ▲ sponge |
| 7 | feather L | pot L | pot | EVEN | ▼ pot |
| 8 | pineapple XL | key S | pineapple | TRUE | ▲ key |
| 9 | kite XL | milk L | milk | LURE | ▼ milk |

**Level "Many surprises" — 9 rounds:**
| # | left spot | right spot | heavier | kind | ask (right answer) |
|---|---|---|---|---|---|
| 1 | cushion XL | iron M | iron | LURE | ▼ iron |
| 2 | hammer M | balloon XL | hammer | LURE | ▲ balloon |
| 3 | popcorn XL | milk L | milk | LURE | ▼ milk |
| 4 | key S | feather L | key | LURE | ▲ feather |
| 5 | pot L | pillow XL | pot | LURE | ▼ pot |
| 6 | sponge M | can M | can | EVEN | ▲ sponge |
| 7 | kite XL | pineapple XL | pineapple | EVEN | ▲ kite |
| 8 | watermelon XL | potato M | watermelon | TRUE | ▼ watermelon |
| 9 | pumpkin XL | strawberry S | pumpkin | TRUE | ▲ strawberry |

Every noun appears ONCE per level (18 distinct nouns in each table — so the stall at the pass end holds each thing once and no thing is heavy in one round and light in the next of the same pass). Right thing in the left spot before the coin flip: Some rounds 1, 2, 3, 6 (4/9) · Many rounds 5, 6, 7, 8 (4/9). Lures: Some 4 of 9 · Many 5 of 9. Small-but-heavy rounds ≥ 2 in both. Many is not "all lures" on purpose: if the big one were always light, "pick the big one for lighter" would become a new shortcut.

**Ask setting:** "Heavier" makes every ask ▼, "Lighter" every ask ▲ (the right answer becomes the other thing), "Both" uses the table.

**Answer position, measured:** per level and per ask setting the gate computes from the data (never from this text): (a) right thing in the LEFT counter spot 40–60 % of rounds; (b) **no size shortcut** — the naive rule "the bigger one is heavier" gives the right answer in ≤ 60 % of rounds (it is right exactly on TRUE pairs: Some 3/9, Many 2/9) AND the reverse rule "the bigger one is lighter" is right in ≤ 60 % (exactly the LURE pairs: Some 4/9, Many 5/9); EVEN rounds defeat both; (c) after the shuffle, no run of 3 identical (side, bigger/smaller/even) answers. Each pass flips each pair's left/right with a coin, re-balanced to keep (a); the permutation is rejection-sampled for (c) (max 200 tries; the gate proves it never fails over 10 000 seeds).

**Free play pairs** may be near-equal (pillow–cushion, apple–potato): no question is asked, the 6° floor keeps a visible tip, and discovering "nearly the same" is good play.

**Order:** order-only reshuffle per pass (`nextTask`), never the same order twice in a row. No numbers appear anywhere.

## 7. Check, the misses, the success
- **Check with the arrow pan empty:** no miss. The empty arrow pan pulses; bubble: "Put the one you think is {heavier|lighter} on the arrow pan."
- **Right bet:** the pin pulls, the arrow pan sinks (▼) or rises (▲) — the arrow agrees. THUNK + puff low, hop high. Bubble: **"Yes! The {iron} is heavier than the {pillow}."** (▲: "Yes! The {balloon} is lighter than the {hammer}."). If the right thing was the smaller-drawn one, a second line: **"Small, but heavy!"** (▼) or **"Big, but light!"** (▲) — the earned surprise. Then the stall collects: heavy into the crate (500 ms), light up into the net (700 ms, sway).
- **Miss 1 (wrong bet):** the beam swings honestly against the arrow; the arrow badge, now on the wrong-going pan, gives one slow shake (±6°, 400 ms); the big light thing stays up in the air — that is the showing. Bubble: **"The scale went the other way. Swap them and look again."** The child drags either thing across; they trade; the beam re-swings; the arrow agrees; bubble: **"Now you know — the {iron} is heavier than the {pillow}."** The round ends with the truth (the stall still collects); one miss is logged.
- **Miss 2 (the child drags them back to the wrong pans and pulls the pin again):** the LOWER pan glows coral and a dotted arc shows the swap path; bubble: **"The low pan holds the heavier one. Move it to the arrow pan."** (▲: "The high pan holds the lighter one. Move it to the arrow pan.")
- **A new move takes the help away** until the next Check.
- **Pass end:** the net bobs, the crate settles, and the big things in the net (the XL/L ones that were the lighter of their pair: balloon, popcorn, pillow, kite, feather in Some) lift 8 px and glow one after another while the small heavy ones in the crate (iron, can, key… whichever were lures) glow back — the pass's whole lesson as one picture; bubble: **"Look in the net: big things can be light."**

## 8. Settings
1. **Ask:** Heavier / Lighter / Both (default Both) — the arrow badge at rest changes (▼, ▲, or the round's own).
2. **Surprises:** Some / Many (default Some) — swaps the round table; the first pair on the counter changes.

## 9. Words (EN source)
- title: **The Market Scale**
- instruction: **Put the one you think is heavier (or lighter) on the arrow pan. Then pull the pin and watch.**
- prompt ▼: **Which is heavier? Put it on the arrow pan.** · prompt ▲: **Which is lighter? Put it on the arrow pan.**
- hint empty: **Put the one you think is {heavier|lighter} on the arrow pan.**
- miss 1: **The scale went the other way. Swap them and look again.**
- miss 2 ▼: **The low pan holds the heavier one. Move it to the arrow pan.** · ▲: **The high pan holds the lighter one. Move it to the arrow pan.**
- success ▼: **Yes! The {a} is heavier than the {b}.** · ▲: **Yes! The {a} is lighter than the {b}.** · after a swap: **Now you know — the {a} is heavier than the {b}.** (▲ likewise)
- surprises: **Small, but heavy!** · **Big, but light!**
- pass end: **Look in the net: big things can be light.**
- free play: **Weigh anything** · aria for clear: **Take everything off**
- settings: **Ask** — **Heavier** / **Lighter** / **Both** · **Surprises** — **Some** / **Many**

**Locale traps and how the design survives them:**
- **Article + gender + adjective agreement** in the success sentence: de "Das Bügeleisen ist schwerer als das Kissen" (article by gender); fr "Le fer à repasser est plus lourd que l'oreiller" (elision); es/pt/it adjective agrees with the subject ("La sandía es más pesada" / "El martillo es más pesado"; pt "mais pesado/pesada"; it "più pesante" invariable but the article agrees). Each locale stores the sentence as a frame keyed by the subject's gender (third field in `image-vocabulary.js`: m/f/n, nl d/h, sv/da/no n/t-style codes per §A.13.58 — never cross-applied).
- **sv/da/no definite suffixes** cannot be generated from the vocab. Those three locales use a **caption frame** in which the noun stands in its dictionary form, never inflected in running text — e.g. sv "Ja! Tyngst av de två: {a}." / "Ja! Lättast av de två: {a}." The native reviewer writes the da/no equivalents. fi needs only nominatives ("{A} on painavampi kuin {b}." / "kevyempi kuin") and is safe.
- Comparatives exist in all 11; fr/es/it/pt build them with plus/más/più/mais.
- **Mass-noun labels:** popcorn and milk are mass nouns in several locales; each locale's pool may drop a noun whose label reads badly as one object (swap in cushion). The gate checks every locale pool still meets the lure counts.
- Sound off: the arrow and the beam carry the whole round; the sentence is a bonus (TTS reliable in 5 of 11).

## 10. Sound off, access, phones
- Legible silent: the arrow icon is the question; the tipping beam is the answer.
- Keyboard: Tab to a thing → Enter lifts → Left/Right choose a pan → Enter drops; Check by the shell button; swap = select a pan's thing, Enter, arrow, Enter.
- aria: "{noun}, on the counter"; "Arrow pan, heavier|lighter" / "Other pan"; a live region reads the success sentence.
- Taps: draggables ≥ 96 px at 704, ≥ 68 px at 360; pictures ≥ 96 / ≥ 64.
- Check above the 360×740 and 320×640 folds (§4).
- Reduced motion: the beam goes straight to its angle (one 300 ms ease), no puff, no hop.

## 11. Distinct from
- **measurement-bench (premium tool)** weighs animals on a balance, estimate-first, open-ended. The Market Scale's inventions are the **bet pan + pin** (the prediction IS the placement, judged by the arrow), the **size-class lure** and the **stall** that sorts a pass into big-but-light vs small-but-heavy.
- **number-balance (tool)** balances numbers for equality — a different concept.
- Comparing Length (E2) and Bramble (capacity) cover the other K.MD.A.2 attributes. Nothing in #1–#22 weighs.
- Siblings in this batch use no balance.

## 12. Build plan
- **Core state:** `{ level, ask, order[], idx, pair:{left,right,leftFirst}, pans:{arrow:null|noun, other:null|noun}, pinned:true, weighed:false, misses:0, stall:{crate:[], net:[]} }`.
- **Functions:** `heavier(a,b)`, `angle(a,b)`, `place(noun, pan)`, `swap()`, `check()` → `{ok, lowPan, sentenceKey, surprise}`, `nextTask(index)` (order-only, rejection-sampled), `collect()`.
- **Gate `verify-market-scale-core.js` (own oracle):** (1) every task pair ratio ≥ 3; (2) every noun exists in its theme JSON, colour theme only; (3) agreement with `mass-rank.js` where both list a noun; (4) angle monotone in ratio, 6° floor, 18° cap; (5) after Check the arrow pan's direction agrees with the ask iff the right thing is on it; (6) lure counts per level and per locale pool; left-spot share 40–60 %; each naive size rule (bigger = heavier, bigger = lighter) right in ≤ 60 %; no 3-run over 10 000 seeds; (7) the ask setting flips the right answer; (8) ▼ sentences name the heavier first, ▲ the lighter first; (9) the "surprise" line appears exactly when the right thing is the smaller-drawn one.
- **Mutations (one per rule):** swap two weights; drop the ratio floor; invert the beam sign; put the arrow on the right pan; let size class decide weight; remove the left/right flip; accept the DOWN pan in a ▲ round; collect into the wrong basket; let the beam swing on drop in task mode (no pin); remove rejection sampling; show the surprise line on a TRUE pair.
- **Local test:** real pointer drags, every round, widths 320·360·412·704·768·1024·1366; assert the beam sign after Check; assert the stall contents at pass end.
- **Risks:** the per-locale sentence frames (reviewer); the popcorn/milk labels; the pillow/cushion label twins (never paired in a task — the gate asserts no task pair shares a label in any locale). Nothing BLOCKED.
- **Gate additions (critic):** (10) every noun occurs at most once per level table; (11) no task pair has the same label in any of the 11 locales; (12) no noun from the ruled-out list (beach/rock, around-the-house/lock) appears.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — carrying a thing onto a pan, pulling the pin and watching a little iron fling a giant pillow into the air is a toy, and the stall filling up is a collection.
2. **Would a teacher put it on the board?** Yes — the class bets aloud, one child places, the pin comes out, and "bigger is heavier" is refuted by physics in front of everyone.
3. **Would a parent trust it?** Library pictures only, real weights, calm motion, no score, no words on the apparatus.
4. **The invention:** the bet pan — your guess is where you put it, and when the pin comes out the scale either agrees with your arrow or throws it up in the air.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- **beach/rock removed.** Its labels are *Felsen / Rocher / Roccia / Klippa* (boulder, cliff) in four locales — a thing every child knows is heavy, so the "small but heavy" lure collapsed and the success sentence would have said "the cliff is heavier". around-the-house/lock also ruled out (fr *Serrure* under a padlock).
- **Both round tables rebuilt** so every noun appears once per level (Many had the hammer twice, heavy both times): Some 6 sponge–potato (EVEN), Some 8 pineapple–key (TRUE); Many 5 pot–pillow (LURE, 4:1), Many 7 kite–pineapple (EVEN, both XL). Lure/TRUE/EVEN counts, ratio ≥ 3:1, left-spot share 4/9 and both size rules ≤ 60 % re-checked by hand.
- **Label-twin trap named and gated:** pillow and cushion share one word in seven locales — never paired in a task.
- **Pass end made the lesson visible:** the big-but-light things in the net and the small-but-heavy things in the crate glow in turn.
- Gate rules 10–12 added (once per level, no shared-label pair, ruled-out nouns absent).
