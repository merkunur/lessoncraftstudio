# Row 71 — Linc's Fact Chain → THE DOMINO TRACK (RI.K.3)

## 0. Identity
- **id** `linc-fact-chain.connect.ri-k-3` (KEPT; slugs/metadata frozen en..nl; sv da no fi new at build) · grade K · CCSS RI.K.3 (with prompting, describe the connection between two individuals, events, ideas, or pieces of information in a text) · strand Reading: Informational Text · own files `linc-fact-chain-core.js` (new; `fact-connect-core.js` untouched), `linc-fact-chain-activity.js` (rewritten), html, `linc-fact-chain-activities.json`.
- **Worksheets covered:** none mapped.
- **Old activity:** read a stem fact, tap the one of three facts that connects (what happens next / what it makes happen). **Kept:** all 8 EN rounds (4 sequence, 4 cause) and their 6 translations. **Added:** "what made it happen?" rounds (the connection read backwards) and three-domino chains. **Gone:** the tap-a-card quiz and the hand-drawn SVG lizard (Linc is now the library `forest-creatures/lizard`).

## 1. The pitch
"Facts are dominoes: stand the fact that connects in the gap, Linc gives the first one a push — and only a real connection keeps the chain falling."

## 2. Why a child will want it again
- **Dominoes.** Tall cream tiles (drawn geometry, rounded, a 3 px ink edge, a thin centre line) each carrying one fact. They stand on a wooden track with gaps between them. Standing a tile in a gap makes a satisfying "tock" and it wobbles once.
- **The push.** On Check, Linc (the library lizard) scurries along the track and nudges the first domino with its nose. It tips (a real rotation about its bottom edge, 380 ms) and strikes the next.
  - **Connected:** the next domino tips too, and the next, clack-clack-clack, and as each falls the two facts JOIN into one sentence on the track's rail with the connecting word glowing between them: *First, you plant a seed. **Then** a plant grows.* / *The hot sun shines on the snow, **so** the snow melts.*
  - **Not connected:** the struck domino rocks but stays standing — the falling one stops leaning on it with a dull "thud", and the joined sentence appears dimmed with a broken link: *The hot sun shines on the snow, so … a drum plays.*
- **The finale.** When the whole chain falls, the last domino tips onto a little bell at the end of the track (drawn), it rings, and Linc does a happy tail-flick (the picture flips horizontally twice).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** describe how two facts in an informational text connect — what comes next (sequence), what one thing makes happen (cause → effect), and what made something happen (effect ← cause) (RI.K.3).
- **Misconception 1 — any true fact can follow** ("A dog barks" is true, but it does not connect to planting a seed). The domino stays standing. Truth is not connection.
- **Misconception 2 — the same thing mentioned = connected** ("The snow falls" after "The hot sun shines on the snow" — it names snow, but the sun does not make snow fall). The chain stops at a fact that shares a word but not a link.
- **Misconception 3 — direction.** In "what made it happen?" rounds the gap is BEFORE the given fact, and the tray holds a real *result* of the given fact (the direction lure). A child who stands the result there sees the push go the wrong way: the sentence reads *It drips on the floor, so the ice cream melts.* — and the dominoes do not fall. In Level 1 the same lesson runs through time: the order lure happened before, so it cannot come next.
- The pushback is physical (fall / no fall) plus the joined sentence, which lets the child read whether it makes sense.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The track** across the stage (440 × 40 px wooden plank) with **2 or 3 domino places**. The given fact's domino stands in its place; the gap place shows a dashed domino outline. Dominoes are 120 × 176 px (portrait), fact text 18 px centred, max 5 lines; text only (no pictures on dominoes — §6).
- **Linc** — library `forest-creatures/lizard`, 96 px, at the left end of the track.
- **The bell** at the right end (geometry, 40 px).
- **The joining rail** under the track (440 × 56 px): empty until Check; the joined sentence appears here in 20 px.
- **The tray** below: 3 candidate dominoes lying flat (tilted 0°, 120 × 150 px), shuffled.
- **Question tab** above the track: "What happens next?" / "So what happens?" / "What made it happen?" (22 px; the arrow on the tab points toward the gap — geometry).
- **Task line (EN):** "Stand the fact that connects in the gap. Linc will give it a push."

**At 360 px:** dominoes 96 × 140 (text 15 px), track 328 px; 3-domino chains shrink to 88 × 132; tray as a row of 3 at 100 × 120; Linc 64 px; Check at ≈ 650 px (above 740); at 320 × 640: dominoes 84 × 124, text 14 px, Check ≈ 600.

## 5. The hand
- **Drag a tray domino** into the gap: it rises upright as it enters the gap's outline (200 ms) and stands with one wobble ("tock"). Dropped anywhere else, it slides back.
- **Drag a standing domino** out of the gap back to the tray; dragging another domino into an occupied gap swaps them.
- **Tap a domino:** TTS reads its fact where a voice exists; the domino glows while read.
- **Keyboard:** Tab to a tray domino, Enter stands it in the (first empty) gap; Delete returns it.
- **Free play:** after success, tap any fallen domino to stand the whole row back up (they flip up in sequence) and tap Linc to push again — children love re-running it.

## 6. The rounds
Three levels, each ≥ 7 rounds; order-only reshuffle per pass; the gap's side and the right domino's tray slot are balanced.

### Level 1 — What happens next? (sequence; gap AFTER the given fact) · 7 rounds
| # | given (EN) | right | tray distractors | pictures |
|---|---|---|---|---|
| 1 | First, you plant a seed. | A plant grows. | A dog barks. · You buy a bag of seeds. (before) | — |
| 2 | First, a bird lays an egg. | A chick hatches. | A fish swims. · The bird builds a nest. (before) | — |
| 3 | First, you wash your hands. | You dry them off. | The cat takes a nap. · You turn on the tap. (before) | — |
| 4 | First, you feel sleepy. | You go to bed. | You paint a big wall. · You play all day long. (before) | — |
| 5 | First, a caterpillar eats leaves. (NEW) | It makes a chrysalis. | A frog swims. · It hatches from a tiny egg. (before) | — |
| 6 | First, you fill the tub with water. (NEW) | You climb into the bath. | A bird sings. · You put in the plug. (before) | — |
| 7 | First, the snow falls all night. (NEW) | You build a snowman. | The grass grows tall. · Dark clouds fill the sky. (before) | — |
Every Level-1 round has an **unrelated lure** and an **order lure** — a fact from the same little story that happens BEFORE the given one. The order lure is the sequence version of the same-thing trap: it truly belongs to the story, so only reading the order rules it out, and the joined sentence shows why (*First, you plant a seed. Then you buy a bag of seeds.*). The first draft's lures ("It starts to rain" after planting, "The sun sets" after an egg is laid) could honestly happen next — they were not wrong answers, so they were replaced. The kept rounds 1–4 keep their stems and answers; their lures are re-authored in the six shipped locales. *Cocoon* became *chrysalis*: butterflies make a chrysalis (moths spin cocoons); de *Puppe*, fr *chrysalide*, es *crisálida*, pt *crisálida*, it *crisalide*, nl *pop*, sv *puppa*, da *puppe*, no *puppe*, fi *kotelo*.

### Level 2 — So what happens? / What made it happen? (cause–effect; gap after OR before) · 8 rounds
| # | direction | given | right | distractors |
|---|---|---|---|---|
| 1 | so → | The hot sun shines on the snow. | The snow melts. | A drum plays. · The snow falls. |
| 2 | so → | It rains on the dry grass. | The grass gets wet. | The grass gets dry. · The bell gets loud. |
| 3 | so → | You push the swing hard. | The swing goes high. | The swing stays still. · The lamp turns on. |
| 4 | so → | You leave juice in the freezer. | The juice freezes. | The juice gets warm. · A dog runs fast. |
| 5 | ← because (NEW) | The ice cream melts. | The day is very hot. | The day is very cold. · It drips on the floor. (effect) |
| 6 | ← because (NEW) | The puppy is all wet. | The puppy jumped in a puddle. | The puppy had a nap. · The puppy shakes off the water. (effect) |
| 7 | ← because (NEW) | The plant grows tall. | We water the plant every day. | We put the plant in the dark. · It needs a bigger pot. (effect) |
| 8 | ← because (NEW) | The kite flies high. | The wind blows hard. | The wind stops. · Everyone looks up at it. (effect) |
In ← rounds the gap is LEFT of the given domino and Linc pushes the gap domino first; the joined sentence reads "{right}, so {given}" (*The day is very hot, so the ice cream melts.*). → rounds carry a **same-thing lure** (snow falls, grass gets dry, swing stays still, juice gets warm) and an **unrelated lure**. ← rounds carry a **same-thing lure** (day is cold, puppy had a nap, plant in the dark, wind stops) and a **direction lure** — a real EFFECT of the given fact, which is truly connected but on the wrong side: standing it in the gap reads *It drips on the floor, so the ice cream melts.* and the chain stops. This is what makes misconception 3 testable; the first draft had no fact that could be put on the wrong side. (Round 7's cause was "We gave the plant water", which joins as "We gave the plant water, so the plant grows tall" — tense now matches.)

### Level 3 — Three in a chain (sequence + cause) · 7 rounds
Given: the FIRST domino; two gaps; the tray holds the 2 right dominoes + 2 lures.
| # | first | second | third | lures |
|---|---|---|---|---|
| 1 | You plant a seed. | You water it every day. | A flower grows. | The seed flies away. · You eat a cake. |
| 2 | A bird builds a nest. | It lays an egg in it. | A chick hatches. | The nest falls in a lake. · A cow eats grass. |
| 3 | Dark clouds come. | Rain falls. | Puddles fill up. | The sun shines bright. · A bell rings. |
| 4 | You mix the dough. | You bake it in the oven. | The bread is ready. | You put it in the freezer. · A frog jumps. |
| 5 | It snows all night. | You roll a big snowball. | You build a snowman. | You go swimming. · A bee buzzes. |
| 6 | You blow up a balloon. | You let it go. | It zooms around the room. | You put it in a box. · A duck quacks. |
| 7 | A caterpillar eats leaves. | It makes a chrysalis. | A butterfly comes out. | It turns into a fish. · The moon shines. |
(Round 6 was "The wind blows hard → The kite goes up → The kite flies high": the last two say almost the same thing, so their order was arguable. Replaced.) Each lure fits NO gap: the gate tries every lure in every gap with every other card and asserts exactly one completion per round.
Order inside the chain matters: putting the right dominoes in swapped gaps stops the chain at the first swap (*You water it every day. Then … you plant a seed.* — the link breaks). **Dominoes are text only, in every level.** The first draft put pictures on some rounds (snowflake → snowman, cloud → puddle): a child can then match snow to snowman without reading a word, which turns RI.K.3 into a picture match. Linc and the bell are the only pictures; TTS on tap is the help for a child who cannot yet read a card.

**Answer position.** The right domino's tray slot is balanced (each of 3 slots 2–3 times per 7–8 rounds); in Level 2 the gap side alternates (4 →, 4 ←, never 3 same in a row); the right domino is not reliably the longest (gate: longest-text = right in ≤ 40 % of rounds; the same-thing lure is ≥ as long as the right fact in ≥ half the rounds).

## 7. Check, the misses, the success
- **Check with an empty gap** → no miss; the dashed outline pulses. Hint: "Stand one fact in the gap first."
- **Miss 1:** Linc pushes; the chain falls up to the wrong domino, which rocks and stays standing; the joined sentence appears dimmed with a broken-link icon (geometry) in place of the glowing link word. 1.6 s later the falling domino stands back up and the wrong one lies back in the tray. Hint: "Read it together: {joined}. Does the first fact make that happen?"
- **Miss 2:** the link word (Then / So / Because) appears in the gap itself, written on the track, and each tray domino, when dragged over the gap, previews its joined sentence on the rail. Hint: "Try each fact after '{link}' and read it."
- A new drag removes miss-2 previews until the next Check.
- **Success:** the chain clacks down, the last domino rings the bell, Linc flicks its tail; the joined sentence(s) glow on the rail and the bubble reads them: "{joined} — the facts connect!" e.g. "The hot sun shines on the snow, so the snow melts — the facts connect!"; Level 3: "You plant a seed, then you water it every day, so a flower grows!"

## 8. Settings
1. **Level:** What happens next? / So what happens? / Three in a chain — the track shows 2 or 3 places and the tab changes.
2. **Choices:** 2 / 3 dominoes in the tray (Level 3: 3 / 4) — 2 removes the unrelated lure and keeps the one that teaches (Level 1: the order lure; → rounds: the same-thing lure; ← rounds: the direction lure).

## 9. Words (EN source)
- stage title "Linc's Fact Chain" · instruction "Stand the fact that connects in the gap. Linc will give it a push."
- tabs: "What happens next?" · "So what happens?" · "What made it happen?" · "What happens next, and next?"
- link words: "Then" · "so" · "because" (← rounds read with "so" forward on the rail: "{cause}, so {effect}").
- hints: empty "Stand one fact in the gap first." · miss1 "Read it together: {joined}. Does the first fact make that happen?" (sequence variant: "Does that come next?") · miss2 "Try each fact after '{link}' and read it."
- celebration "{joined} — the facts connect!"
- aria: domino "Fact: {text}" · gap "Empty place {before|after} {given}" · Linc "Linc the lizard — pushes the dominoes".
- **Locale traps.** The joined sentence must be authored, not concatenated: each round carries `joined.<loc>` written by hand, because agreement, capitalisation and word order change (de "Die heiße Sonne scheint auf den Schnee, also schmilzt der Schnee." — verb-second after *also*; fr "…, alors la neige fond."; fi "…, joten lumi sulaa."; sv "…, så smälter snön."). The fact on the domino keeps its own capital and full stop. "First," in Level 1 stems: keep the locale's school sequence word (de *Zuerst*, fr *D'abord*, es *Primero*, nl *Eerst*, sv *Först*, da *Først*, no *Først*, fi *Ensin*). The six shipped translations stay; Level 2 ← and Level 3 rounds are written natively per locale. Seasons: snow rounds are fine in every locale (pt-BR children know snow from stories; keep — the pt reviewer may swap snow for "sorvete" rounds).

## 10. Sound off, access, phones
- Legible with sound off: facts are written; the fall and the joined sentence show the result. TTS reads dominoes on tap.
- Keyboard: §5; result announced ("The chain fell all the way" / "The chain stopped at: A drum plays").
- Taps ≥ 44 px (dominoes ≥ 84 px wide). Pictures (when used) 80 px at 704, 64 px at 360; Linc 96 / 64.
- Check above the fold at 360 × 740 and 320 × 640 (§4). Phone: tray under the rail, bubble under Check.

## 11. Distinct from
- **#25 Spring Switch** (crates roll the way the points are set) — a split mechanic for numbers; here falling dominoes test a *link between ideas*.
- **#064 Wake Up, Pip! (Flipbook)** orders a whole story's pictures by playback continuity; Linc connects two or three informational facts by cause and sequence with the link word made visible.
- **story-line tool** (pegging beats on a clothesline) — no physics, no cause; Linc's chain falls only on real links.

## 12. Build plan
- **Core** `LincFactChainCore`: `newRound(round, setting)` → places, gap side(s), tray (shuffled); `stand(state, dominoId, gap)`; `push(state)` → `{fallsTo: index, brokenAt: gap|null, joined: [strings]}`; `ok(state)`.
- **Gate's truth** (`verify-linc-fact-chain-core.js`): its own answer table per round (not read from the manifest's answer field); for every locale: the right domino is in the tray; exactly one domino per gap completes the chain; in Level 3 swapping the two right dominoes breaks it; every Level-1 round has one order lure (authored as happening before the given fact) and one unrelated lure; every → round has one same-thing lure (shares a content word with the given fact) and one unrelated lure; every ← round has one same-thing lure and one direction lure (authored as an effect of the given fact); no domino carries a picture; `joined.<loc>` exists for the right answer; gap-side balance and tray-slot balance per pass; longest-text-right ≤ 40 %.
- **Mutations:** accept any domino · accept the same-thing lure · ignore gap direction in ← rounds · Level 3 accepts swapped order · joined sentence built by concatenation (gate compares to authored) · tray order fixed · all gaps on the right in Level 2 · the direction lure accepted in a ← gap · a picture on a domino. All killed.
- **Pictures:** forest-creatures/lizard (Linc) — opened by the critic 2026-10-17: an orange side-view lizard with a long tail, reads clearly; the green `pets/lizard` is the fallback if the reviewer finds the orange one too gecko-like. No other pictures (spring/rain and spring/sun do not exist anyway).
- **Risks:** text length on a 320 px domino — facts ≤ 7 words EN; locales longer (fi/de) may need 14 px; the gate asserts every domino text fits 5 lines at the phone size. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — dominoes falling is irresistible; children re-stand and re-push them just to watch.
2. **Teacher on the board?** Yes — "does this make that happen?" becomes a visible test, and the link word (then / so / because) is the language of RI.K.3.
3. **Parent trust?** Plain true facts, a real lizard picture, nothing flashy or sold.
4. **Invention:** facts are dominoes — the chain only keeps falling across a real connection, and as it falls the two facts join into one sentence.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- **Level-1 lures could honestly happen next** ("It starts to rain" after planting a seed, "The sun sets" after an egg is laid) — not wrong answers. Each round now has an unrelated lure and an **order lure** (a fact from the same story that happens BEFORE), which only reading the order rules out.
- **Misconception 3 (direction) had nothing to test it:** no tray card was a result that could be stood on the wrong side. Every ← round now carries a **direction lure** (a real effect of the given fact: *It drips on the floor, so the ice cream melts.*).
- Level 3 round 6 (kite goes up / kite flies high — order arguable) replaced; *cocoon* → *chrysalis* (butterflies) in Level 1 and Level 3; a ← cause re-tensed ("We water the plant every day").
- **Pictures removed from all dominoes:** snowflake→snowman and cloud→puddle made rounds solvable without reading (and spring/rain, spring/sun do not exist). Linc (forest-creatures/lizard) opened and confirmed.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
