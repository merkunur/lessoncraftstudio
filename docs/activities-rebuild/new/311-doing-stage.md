# New 311 — The Doing Stage → THE THREE RECORDERS: the sand path keeps footprints, the window keeps looks, the speech board keeps voices — a doing-word only leaves its mark where its field lives (L.3.5.c · word fields)

## 0. Identity
- **id** `doing-stage.play.l-3-5-c` · grade 3 · CCSS L.3.5.c — **read exactly (critic): "distinguish shades of meaning among related words that describe states of mind or degrees of certainty (e.g., knew, believed, suspected, heard, wondered)"**. Go/look/say fields alone are L.2.5.b / L.1.5.d content, so the code was only honest once a fourth recorder for *think* words (how sure) was added — §4–§9 below. Go/look/say stay because the two worksheets need them · strand Vocabulary Acquisition and Use · key `doing-stage` → `doing-stage-core.js`, `doing-stage-activity.js`, `doing-stage-activity.html`, `doing-stage-activities.json`. Scaffold: `node scripts/new-activity.js --num=311`.
- **Worksheets covered:** G3-397 "Word Fields: Words for Go and Look" (write each word in the field it belongs to; L1 6 words, L3 12) · G2-374 "Synonyms for Said: Pick the Word That Fits" (a direct-speech sentence; pick the word from the bubble that fits instead of *said*). Banks reused: `scripts/worksheet-gen/data/b5/synonyms.js` + `data/b5/locales/synonyms.<loc>.json → fields.{go, look, say}` (native-reviewed; go 8, look 8, say 6 words + 8 say sentences per locale).
- New instrument; no old activity.

## 1. The pitch
"Drop a doing-word on the stage and a little animal acts it — but only the right place can *keep* what it did: the sand path keeps footprints (dash leaves long gaps, tiptoe tiny dots), the window keeps a look (a glance is a blink of light, a stare a long beam), the speech board keeps a voice (a whisper is a small dotted bubble, a shout a big jagged one) — put a word in the wrong place and the animal still acts, but nothing is kept."

## 2. Why a child will want it again
- **Every word is a little performance.** The actor (a library animal, a new one each round) strolls, dashes, tiptoes, hops; turns to the window and glances or stares; steps up to the speech board and whispers or shouts. The motion IS the meaning — and it is funny: *crawl* flattens the hedgehog into a slow shuffle, *dash* sends the rabbit across in half a second with speed streaks, *wander* makes the squirrel drift up and down the path and stop twice to sniff.
- **The traces are beautiful records.** Footprints stay printed in the sand — even pairs for *walk*, a straight bold double line for *march*, toe-dots for *tiptoe*, wide gaps for *dash*, a meandering line for *wander*. The window sill has a light meter that keeps each look as a glowing bar (short for *glance*, long for *stare*). The speech board keeps each voice as a pinned bubble shape. After a round the child has made a little gallery of meanings.
- **The wrong place stays empty — visibly.** A whisper dropped on the path: the rabbit walks onto the sand and whispers there — a tiny dotted bubble floats up and fades — and the sand stays perfectly smooth. *No footprints.* The child sees that a say-word cannot leave a go-word's mark.
- **Side-by-side twins (nuance mode).** Two close words play at the same time in two lanes — *strolled* and *dashed*: one animal is still on the first stone while the other is already across. The difference is a race you watch.
- **The end-of-round show:** the three recorders light up in turn — footprints glow along the path, the meter's bars pulse, the bubbles bob — and the round's cards slide onto the three field shelves under their places.
- **Free play:** any card can be dropped anywhere between rounds; the actor performs everything.

## 3. The skill and the misconception
- **Skill:** group verbs into word fields by *meaning* — ways to go (move from place to place), ways to look, ways to say, **and ways to think (states of mind, graded by how sure: wonder < doubt < guess < suspect ≈ think < believe < know)** — and tell close words in one field apart by what they show (speed and manner of moving; length and manner of looking; loudness and purpose of speaking), choosing the one a sentence needs.
- **Misconception 1 — grouping by spelling or sound** (*stare* with *stroll*, *whisper* with *wander*). **Pushback:** cards that share a first letter are deliberately split across fields in most rounds (measured, §6); the recorder keeps a trace only for the meaning — the sand does not care that *stare* starts like *stroll*.
- **Misconception 2 — all words in a field are the same** (*glance* = *stare*, *whisper* = *shout*). **Pushback:** in sort mode the kept traces differ inside one field (a short bar and a long bar on the meter); in nuance mode two words act side by side and the sentence's cue (*for just a second*, *as fast as we could*) matches only one trace — the miss shows the cue next to both traces.

## 4. The stage
**At 704 px (the stage is the hero, 660 × 360):**
- **Task line:** sort **"Drop each word where it leaves its mark: the path, the window or the speech board."** · nuance **"Which word fits the sentence? Watch both, then drag one into the gap."**
- **The stage (drawn apparatus, tool colours, no words):** a wooden stage floor; on the left the **sand path** (a 300 × 70 strip of pale sand with a fine grain, 3 px outline, a small start stone and end stone); on the right the **window** (a 180 × 150 frame with a shutter that can open a crack) with a library picture outside it (the thing to look at, 96 px — a bird, a boat, a kite; §6) and a **light meter** on its sill (a 160 × 18 slot that keeps glowing bars); at the front centre the **speech board** (a 220 × 110 cream board on two posts where bubbles get pinned); and — only with the "+ think" Fields option — the **thought cloud** high above centre stage (a 200 × 90 cloud outline, 3 px teal, with a fill gauge inside it that rises from the bottom; it keeps one thought per think-word as a stacked small cloud token beside it). At 360 the thought cloud sits above the stage strip (150 × 70), and the stage grows by 70 px (fold re-checked: 584 + 70 = 654 ≤ 740; at 320 × 640 the window shrinks to 120 × 100 and the cloud to 130 × 60 → 610 ≤ 640).
- **The actor:** one library animal, 96 px, starting at centre stage (§6 list). It walks to whichever place it is sent.
- **Card tray** (under the stage, 660 × 64): 4 word cards (sort) — each 140 × 52, the word in 20 px Nunito 800 — or the **sentence card** (nuance): the sentence in 18 px with a gap slot 140 × 40, and the two **twin cards** with a small ▶ play tab each.
- **Field shelves** (sort, under each place): a thin brass rail where correctly placed cards come to rest (the field groups, built by the child).
- **Check** 140 × 52 right of the tray.

**At 360 px (stacked):** stage 328 × 300 — the path along the top (300 × 56), the window below-right (140 × 120, picture 64 px) with its meter, the speech board below-left (150 × 90); actor 64 px. Cards: two rows of two (156 × 48). Nuance: sentence 16 px full width, twin cards side by side, the two-lane race uses the path drawn as two 300 × 40 lanes. Check full width. **Fold budget 360 × 740:** 56 + 52 + 300 + 108 + 48 + gaps 20 = 584. **320 × 640:** stage 296 × 270, cards 140 × 46 → 548. Check above both folds.

## 5. The hand
- **Sort mode:** drag a card onto a place (path, window or speech board; each place's drop zone is its whole area); the card sits in that place's little card pocket (it does not act yet). Cards can be moved freely. **Check** = "Action!": the actor performs each placed card in turn (place order: path → window → board), ~1–3 s each:
  - right place → the trace is **kept** (footprints stay, the meter keeps a bar, the bubble is pinned) and the card slides to that place's shelf;
  - wrong place → the actor performs the word *there* (a whisper on the path: it stands on the sand and a dotted bubble floats up and fades) and **nothing is kept**; the card floats back to the tray.
- **Nuance mode:** tap a twin card's ▶: the two lanes appear and **both** twins perform at once (go: two actors race; look: two beams in two windows; say: two bubbles side by side), repeatable. Drag one twin into the sentence's gap; Check.
- **Motion specs (go — path 300 px at 704):** *walk* 1.6 s, prints in even pairs every 40 px · *march* 1.8 s, bold prints in a straight double line every 40 px, sharp 10 px bob · *crawl* 3.0 s, actor squashed to 80 % height, a dotted smear every 10 px · *hurry* 0.9 s, prints every 60 px · *stroll* 2.6 s, gentle sway, prints every 36 px on a softly waving line · *wander* 3.2 s, the path line drifts ±30 px, two 0.4 s stops · *creep* 3.4 s, low, tiny prints every 16 px, three pauses · *dash* 0.5 s, prints every 100 px, speed streaks · *tiptoe* 2.8 s, toe-dots only every 22 px, slow 8 px bob · *hop* 1.4 s, 60 px arcs, paired prints at each landing · *jog* 1.2 s, prints every 55 px · *rush* 0.7 s, prints every 80 px, streaks · *skip* 1.5 s, hop-step rhythm, prints in a long-short pattern · *sneak* 3.0 s, low, prints along the path's edge.
- **Motion specs (look — the beam is a translucent cone from the actor to the picture):** *glance* 0.3 s thin flash, meter bar 10 % · *stare* 3.0 s thick unwavering beam, bar 100 % · *peek* the shutter opens a 20 % crack for 0.6 s, the beam squeezes through, bar 20 % · *watch* 2.0 s steady beam that follows the picture as it drifts across the window, bar 70 % · *peer* actor leans forward, a long narrow beam, the picture enlarges ×1.2, bar 60 % · *gaze* 3.0 s wide soft beam with sparkles, bar 100 % (softer colour than stare) · *observe* 2.5 s beam that visits the picture's top, middle and bottom in turn, bar 80 % · *squint* a slit-thin beam 1.5 s, bar 50 % · *spot* 0.4 s beam ending in a starburst on the picture, bar 15 % · *scan* the beam sweeps left–right across the window twice, bar 60 % · *view* a steady medium beam over the whole window, bar 70 % · *inspect* a magnifier ring travels over the picture, bar 90 %.
- **Motion specs (say — bubbles carry no words, only shape, plus "?" or numerals where they are the meaning):** *whisper* small dotted bubble close to the actor · *shout* big jagged bubble · *yell* the biggest jagged bubble, two lines of jag · *ask* a bubble whose tail curls into a "?" · *answer* / *reply* a bubble whose tail points back at a small grey "?" bubble from offstage · *explain* a bubble with three numbered dots 1 · 2 · 3 · *promise* a bubble tied with a little knot at its tail · *mumble* a wobbly outline with scribble lines inside · *call* a bubble with a long tail reaching across the stage · *chat* two small bubbles back and forth · *repeat* a bubble followed by an identical second one.
- **Motion specs (think — the actor stops and a small cloud of dots rises from its head into the thought cloud; the cloud's fill is HOW SURE, the only meaning shown):** *wonder* fill 0 % and a "?" inside, the actor tilts its head · *doubt* fill 15 %, the "?" stays · *guess* fill 25 %, the fill wobbles before it settles · *suspect* fill 45 % · *think* fill 50 % · *believe* fill 75 % · *know* fill 100 %, a solid outline and a "!" (the "?" and "!" are the meaning, like the say bubble's "?"). A think-word dropped anywhere else: the actor stops and its little dot-cloud rises and pops — nothing is kept (no fill).
- **Keyboard:** Tab: cards → places (Enter drops the held card) → Check; nuance: Tab to ▶ (Enter plays), to a twin (Enter seats it in the gap).
- **Sound (bonus):** soft footstep sounds matched to the motion, a shutter click, a hum for the beam, mouth sounds for bubbles (a "psst", a "hey!") — never needed.

## 6. The rounds
**Sort · go + look + say** (4 cards per round, 12 per field; tray order as listed):

| # | cards (field) |
|---|---|
| 1 | stroll (go) · whisper (say) · stare (look) · walk (go) |
| 2 | squint (look) · hop (go) · peek (look) · shout (say) |
| 3 | glance (look) · call (say) · crawl (go) · gaze (look) |
| 4 | chat (say) · spot (look) · ask (say) · creep (go) |
| 5 | march (go) · wander (go) · mumble (say) · watch (look) |
| 6 | reply (say) · promise (say) · peer (look) · tiptoe (go) |
| 7 | dash (go) · scan (look) · jog (go) · yell (say) |
| 8 | answer (say) · hurry (go) · rush (go) · observe (look) |
| 9 | inspect (look) · view (look) · explain (say) · repeat (say) |

**Sort · go + look** (critic: the old table was 2 + 2 in every round, so the fourth card was always forced by counting; now 2+2 ×5, 3+1 ×2, 1+3 ×2):

| # | cards (field) |
|---|---|
| 1 | walk (go) · spot (look) · stroll (go) · stare (look) |
| 2 | hurry (go) · peek (look) · hop (go) · peer (look) |
| 3 | glance (look) · crawl (go) · gaze (look) · jog (go) |
| 4 | squint (look) · march (go) · scan (look) · sneak (go) |
| 5 | dash (go) · watch (look) · wander (go) · tiptoe (go) |
| 6 | inspect (look) · rush (go) · observe (look) · view (look) |
| 7 | stare (look) · glance (look) · skip (go) · peek (look) |
| 8 | peer (look) · spot (look) · creep (go) · hurry (go) |
| 9 | skip (go) · sneak (go) · squint (look) · jog (go) |

  Measured (critic, `work-c42/c-stage3.js`): go 18 / look 18; per tray slot go 4/4/5/5, look 5/5/4/4; first-letter split rounds 5/9; the "assume 2 + 2" bot fails 4 of 9 rounds.

**Sort · go + look + say + think** (third Fields option; 3 fields per round in a 2-1-1 mix, so no card is forced by elimination):

| # | cards (field) |
|---|---|
| 1 | stroll (go) · know (think) · wonder (think) · stare (look) |
| 2 | shout (say) · hop (go) · squint (look) · peek (look) |
| 3 | whisper (say) · ask (say) · dash (go) · guess (think) |
| 4 | gaze (look) · glance (look) · believe (think) · crawl (go) |
| 5 | march (go) · think (think) · call (say) · tiptoe (go) |
| 6 | yell (say) · mumble (say) · scan (look) · suspect (think) |
| 7 | know (think) · hurry (go) · jog (go) · watch (look) |
| 8 | peer (look) · view (look) · doubt (think) · reply (say) |
| 9 | wonder (think) · walk (go) · answer (say) · repeat (say) |

  Measured (critic, `work-c42/c-think3.js`): 9 / 9 / 9 / 9; every slot holds each field 2–3 times; every round 2-1-1; first-letter split rounds 5/9 (stroll/stare, shout/squint, tiptoe/think, scan/suspect, wonder/walk). The think field has 7 words (know, believe, think, suspect, guess, doubt, wonder) — know, wonder and guess appear twice, never in neighbouring rounds.

- **Measured (`work-42/stage2.js`, re-run `work-c42/c-stage.js`):** three fields 12 / 12 / 12; each tray slot 1–4 holds each field exactly 3 times (3/3/3 in every slot). **Spelling trap:** rounds with two cards sharing a first letter in *different* fields: 6/9 (three fields), 5/9 (two fields); the "sort by first letter" bot scores 13/36 in the three-field set (chance 12/36; it never completes a round) and 16–19/36 in the two-field set depending on how ties are broken — chance (18/36), never better. 36 distinct words in the three-field set (*say*: whisper, shout, ask, answer, explain, promise from the reviewed bank + call, yell, reply, chat, mumble, repeat; *go* and *look*: the bank's 8 each + tiptoe, hop, jog, rush / spot, scan, view, inspect; the two-field set adds skip, sneak).

**Nuance** (one sentence, two twins of one field, one fits; the gap stands for the word *in its form*):

*go + look (10)*

| # | sentence | twins (left · right) | fits |
|---|---|---|---|
| G1 | Lena ___ slowly and quietly past the sleeping cat. | tiptoed · dashed | tiptoed |
| G2 | The rain started, so we ___ home as fast as we could. | strolled · dashed | dashed |
| G3 | It was a sunny Sunday, so Grandpa ___ slowly through the park. | hurried · strolled | strolled |
| G4 | The baby ___ on her hands and knees to the ball. | crawled · marched | crawled |
| G5 | The band ___ down the street: left, right, left, right. | tiptoed · marched | marched |
| L1 | Tom ___ at the clock for just a second and kept writing. | glanced · observed | glanced |
| L2 | The owl ___ at us for a long time without blinking. | peeked · stared | stared |
| L3 | Mia ___ quickly through the gap in the door so nobody would see her. | observed · peeked | peeked |
| L4 | The sun was so bright that Leo ___ to see the boat. | squinted · stared | squinted |
| L5 | We lay on the grass and ___ at the stars for a long time. | gazed · squinted | gazed |

*think — how sure (4; critic, L.3.5.c):* both twins always fit the grammar, so only the meaning decides; the thought-cloud gauge (how full) is the trace.

| # | sentence | twins (left · right) | fits |
|---|---|---|---|
| T1 | Mia ___ where the key was, so she went straight to the drawer and got it. | wondered · knew | knew |
| T2 | There was no clock, so Tom ___ that it was about three o'clock. | guessed · knew | guessed |
| T3 | Ana ___ who had left the flower on her desk; she had no idea at all, so she asked everyone. | wondered · guessed | wondered |
| T4 | Grandpa ___ it would rain, but he took his umbrella just in case. | thought · knew | thought |

*go + look + say + think (10):* G2, G4, L2, L4, S1, S3, T1–T4 — fitting twin left 5 (G4, L4, T2, T3, T4) / right 5 (G2, L2, S1, S3, T1); no pair repeats; cues *as fast as*, *hands and knees*, *without blinking*, *so bright*, *Shh*, *after the question*, *went straight to*, *no clock … about*, *no idea at all*, *just in case*.

*go + look + say (10):* G1, G2, G5, L1, L2, L5 and the four say rounds from the reviewed bank (G2-374 frames):

| # | sentence | twins (left · right) | fits |
|---|---|---|---|
| S1 | "Shh, the baby is sleeping," Mia ___ very softly. | shouted · whispered | whispered |
| S2 | "Where is my red hat?" Ben ___. | asked · promised | asked |
| S3 | "Ten," Ana ___ right after the teacher's question. | asked · answered | answered |
| S4 | "First dig a hole, then drop in the seed," Sam ___ step by step. | explained · whispered | explained |

- **Measured:** the fitting twin is on the left / right 5 / 5 in both levels; **no twin pair repeats** (as unordered pairs); the **option-length** bots: in go + look, "the longer word" is right 3 times, "the shorter" 4 times, 3 ties; in go + look + say, longer 4, shorter 4, 2 ties — length tells nothing. Every sentence carries one explicit cue (*slowly and quietly*, *as fast as*, *for just a second*, *without blinking*, *so nobody would see*, *so bright*, *Shh*, *?*, *after the question*, *step by step*) that rules the other twin out — the one-right-answer rule.
- **Actors and windows (one per round, rotating):** actors `forest-creatures/rabbit`, `squirrel`, `hedgehog`, `deer`, `mouse` (side views — critic: the beaver on the contact sheet stands FRONT-facing and cannot show a walking direction, so it is replaced by the side-view deer; rabbit, squirrel, hedgehog and deer face LEFT and are mirrored to walk right, the mouse faces RIGHT and is mirrored to walk left); window pictures `things-that-fly/goose`, `beach/sailboat`, `toys/kite`, `forest-creatures/butterfly`, `forest-creatures/owl` (only when the actor is not the owl's rival — the owl is a window picture, never an actor).
- **Order:** order-only reshuffle per pass (rounds; and the four cards' tray order re-dealt with the 3/3/3 slot balance kept by choosing among the measured balanced deals).

## 7. Check, the misses, the success
- **Check with no card placed** → **"Drag each word to the path, the window or the speech board."** · **cards left in the tray** → **"Every word needs a place."** · nuance gap empty → **"Watch both words, then drag one into the gap."** (no miss).
- **Sort — miss 1 (the recorders tell):** "Action!" plays; right places keep their traces; wrong ones play their act with nothing kept and float back. Hint EN: **"The words that floated back left no mark there. Where would they leave one?"**
- **Sort — miss 2 (the places show their kind of mark):** each place shows a faint sample of what it keeps — two footprints on the sand, a small bar on the meter, an empty bubble on the board — and a returning card shows its trace in a small preview above it (footprints / beam / bubble) before it lands. Hint EN: **"Feet leave footprints, eyes leave a look, a voice leaves a bubble."**
- **Nuance — miss 1:** the sentence's cue words underline in coral, and both twins replay side by side with their trace's gauge drawn — speed (a dial: slow … fast), look length (a bar: short … long), voice (bubble size: soft … loud; or the bubble's shape "?" / 1·2·3). Hint EN: **"Read the underlined words. Which way do they point on the gauge?"**
- **Nuance — miss 2:** an arrow from the cue words to the gauge end the sentence needs. Hint EN: **"{cue} means {end}. Which word is {end}?"** ({end} = "slow" / "fast" / "short" / "long" / "quiet" / "loud" / "a question" / "an answer" / "step by step" / "sure" / "not sure" — authored per sentence). Think rounds' gauge is the thought cloud's fill: miss 1 replays both twins as two clouds side by side, one full with "!", one low with "?".
- A new drag takes the help away until the next Check.
- **Success:** sort — the recorders glow in turn and the shelves fill: **"Go: {a}. Look: {b}. Say: {c}."** (four fields: **"Go: {a}. Look: {b}. Say: {c}. Think: {d}."**) · nuance — the chosen twin performs once more inside the sentence's scene, the sentence reads complete: **"{sentence with the word}"** followed by **"— just right!"**

## 8. Settings
1. **Fields:** go + look (default) / go + look + say / go + look + say + think — removes or adds the speech board and the **thought cloud** at rest.
2. **Mode:** sort into fields (default) / pick the closer word — changes the tray (4 cards vs a sentence and two twins) at rest.

## 9. Words (EN source)
- title **"The Doing Stage"**
- instructions **"Drop each word where it leaves its mark: the path, the window or the speech board."** (two fields: **"…: the path or the window."**; four fields: **"…: the path, the window, the speech board or the thought cloud."**) · **"Which word fits the sentence? Watch both, then drag one into the gap."**
- hints, celebrations as §7; gauge ends (bubble only).
- settings **"Fields"**: "go + look" / "go + look + say" / "+ think (how sure)" · **"Mode"**: "sort into fields" / "pick the closer word"
- aria: places `"sand path"`, `"window with a {picture} outside"`, `"speech board"`, `"thought cloud: how sure"`; result `"{word}: footprints kept on the path"` / `"{word}: no mark on the path"`.
- **Locale traps:** (a) **Word forms per field and mode:** sort cards use the dictionary form (en base, de infinitive *schlendern*, fr infinitive *flâner*, fi 1st infinitive *kävellä*); nuance and say sentences use the form the bank's `fields.say.form` declares (en past, **de present 3rd person** *flüstert*, …) — the gap takes exactly that form; the native panel authors the go/look nuance sentences in the same form as the locale's say frames. (b) **Word order:** de/nl/sv/da/no put the verb second, so the speech-verb gap often comes *before* the name ("„Pst, das Baby schläft", {gap} {name} ganz leise.") — sentences are whole literals from the bank, never assembled. (c) **Quotation marks** per locale (de „…", fr « … » with no-break spaces, sv/fi ”…”, da »…« or „…") from the bank's `quotes`. (d) **The field heads** (go, look, say) are content: the head words from the bank (`head`: de *gehen / schauen / sagen*, fr *aller / regarder / dire* …); the shelves show no head words (no words on the apparatus) — the celebration names them. (e) **Bank depth:** the reviewed bank has go 8 / look 8 / say 6 per locale; the panel authors the extra 4–6 per field to reach the tables above, each confirmed to belong to exactly one field (e.g. de *rufen* is say, not go; fi *katsella* vs *tuijottaa* both look). **Honest fallback (critic):** where a locale cannot honestly reach 12 clear members of a field (thin go/look/say banks, or a candidate that sits in two fields), it ships fewer distinct words, not fake ones: each mode keeps ≥ 7 rounds, a word may appear in at most two rounds and never in neighbouring rounds, and a field that cannot reach 7 clear members drops out of that locale's Fields options (the say field first — the bank has only 6). Never pad with a near-synonym that also fits another field. (g) **Think words (new, authored per locale, reviewer-checked):** de *wissen / glauben / denken / vermuten / raten / bezweifeln / sich fragen*, fr *savoir / croire / penser / soupçonner / deviner / douter / se demander*, fi *tietää / uskoa / ajatella / epäillä (= suspect AND doubt — fi gets one card, never both) / arvata / ihmetellä*; the reviewer confirms the how-sure order per locale and that every T-sentence's other twin really fails there. Reflexive or two-word forms (*sich fragen*, *se demander*) are one card. (f) **Close-word pairs must have one right answer in each locale** — the cue words are authored per locale and the reviewer checks the other twin really fails (fr *chuchoter* vs *crier*, not *murmurer*, which also fits "softly").

## 10. Sound off, access, phones
- Sound off: every act, footprint, beam, meter bar, bubble shape and the empty sand of a wrong place are visible; gauges are drawn.
- Keyboard path §5; focus 3 px teal; aria-live polite.
- Taps: cards 140 × 48 min; places are large zones; ▶ tabs 44 × 44.
- Pictures: actors and window pictures 96 px at 704 / 64 px at 360 (floors met); footprints, beams, bubbles are drawn traces (records), never pictures.
- Check above both folds (§4).

## 11. Distinct from
- **Row 128 The Sentence Stage** (the stage acts a whole sentence word by word, capital opens the curtain): grammar of a sentence. Here single verbs are *sorted by the mark they leave*, and the pushback is a recorder that keeps nothing in the wrong place.
- **Row 177 The Formation Words** (group nouns tell animals how to move together): collective nouns. **Row 189 The Echo Canyon** (a word's strength sets how far its echo carries): one scale of strength. Here three fields and many manners (speed, length, loudness, purpose).
- **New 258 The Unchanging Picture** (a picture draws what the sentence says): synonyms that keep the picture; here close words are shown to *differ*.
- **sorting-hoops tool** (two hoops, a hidden rule): the rule here is never hidden; the places are the fields.
- No reuse of a built invention.

## 12. Build plan
- **Core state:** sort `{ fields, cards:[{word, field}], placed:{word:place}, kept:[{word, trace}], checks, help }` · nuance `{ sentence, twins:[w, w], fits, cue, end, seated }`.
- **Functions:** `fieldOf(word)` (the locale bank, never guessed); `perform(word, place)` → `{trace, kept: fieldOf(word) === place}`; `MOTION[word]` (the §5 specs as data: duration, spacing, bob, beam %, bubble shape); `check()`.
- **Gate's own truth (`verify-doing-stage-core.js`, its own field table typed from §6):** every card belongs to exactly one field; 12/12/12 and 18/18 counts; slot balance 3/3/3; ≥ 5 split-first-letter rounds per set; the first-letter bot ≤ 13/36 and ≤ 16/36; nuance: fits left/right 5/5, no repeated pair, longer/shorter bots ≤ 4 each; every MOTION entry exists for every word used and the go traces' print spacing orders *dash > rush > hurry > jog > walk > stroll > tiptoe > creep > crawl* (so a slower word always prints closer steps); look bars order *glance < spot < peek < squint < peer = scan < watch = view < observe < inspect < stare = gaze*; thought-cloud fill order *wonder < doubt < guess < suspect < think < believe < know* (0 / 15 / 25 / 45 / 50 / 75 / 100 %), and every T-round's fitting twin sits on the side of the gauge its cue names (knew full; guessed, wondered, thought below believe).
- **Mutations (each killed):** the thought cloud filling the same for *know* and *wonder* · a think card kept on the path · every two-field round 2 + 2 · the front-facing beaver as an actor · a wrong-place act still keeps its trace · footprints for *dash* closer than for *stroll* · glance's bar longer than stare's · the say board present in the two-field setting · a nuance twin pair repeated · the fitting twin always on the left · a card from the go field accepted by the window · sentence assembled by code instead of the bank literal · same pass order twice · the actor's picture smaller than 64 px at 360.
- **Pictures to verify:** forest-creatures/rabbit, squirrel, hedgehog, deer, mouse (looked at by the critic: rabbit/squirrel/hedgehog/deer face LEFT, mouse faces RIGHT; forest-creatures/beaver is front-facing and NOT used), things-that-fly/goose (a goose, not a duck — every duck picture is a duckling), beach/sailboat, toys/kite (red and yellow), forest-creatures/butterfly, forest-creatures/owl (ear tufts; window picture only). Seen on the contact sheets.
- **Risks:** 30+ motion specs (data, one function); per-locale extra words and cues (one native + pedagogy reviewer). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — an animal that dashes, tiptoes, stares and shouts on command, footprints and beams you collect, and two-lane races between close words.
2. **Teacher on the board?** Yes — fields by meaning made physical (only feet leave footprints), the spelling trap built into every round, and shades of meaning shown as speed, length and loudness the class can see; G3-397 and G2-374 are covered word for word from the reviewed bank.
3. **Parent trust?** Calm, library animals, no words on the apparatus, no timer.
4. **Invention:** three recorders on a stage — a sand path, a window meter, a speech board — that keep a doing-word's mark only when the word is put where its field lives.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 4→5
What changed:
- **The code did not match the content.** L.3.5.c is "states of mind or degrees of certainty (knew, believed, suspected, heard, wondered)"; go/look/say alone are L.2.5.b content. Added a fourth recorder in the same invention — the **thought cloud**, whose fill is how sure a think-word is (wonder "?" empty … know "!" full) — a third Fields option with a measured 9-round four-field sort table (9/9/9/9, every round 2-1-1, 5 spelling-trap rounds) and 4 certainty nuance rounds (T1–T4) whose twins both fit the grammar, so only meaning decides; a 10-round all-fields nuance set, balanced 5/5.
- **Two-field sort leaked by counting:** every round was 2 go + 2 look, so the fourth card was forced. Now 2+2 ×5, 3+1 ×2, 1+3 ×2, slots go 4/4/5/5 (re-measured `work-c42/c-stage3.js`). The first-letter bot sits at chance (16–19/36), not "below chance" as claimed; corrected.
- **Picture fix:** forest-creatures/beaver is front-facing on the contact sheet (cannot walk a path) — replaced by the side-view deer; the mouse faces right (mirroring rule corrected).
- **Honest fallback for thin banks:** fields with fewer than 7 clear members per locale drop out of that locale's options (say first); words may repeat at most twice, never in neighbouring rounds; no near-synonym padding.
- Distinct from designs/134 (Stove Knob: one knob orders words by strength — here fields by the KIND of mark, then manner) and designs/189 (Echo Canyon: one loudness/strength scale and equal-meaning echoes — here four different recorders; the only loudness pair, S1 whisper/shout, is one round of ten). Also distinct from Row 128 (a stage acting whole sentences): here single verbs are sorted by what a place can keep.
