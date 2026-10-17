# Row 127 — The Event Tunnel (L.1.1.i)

## 0. Identity
- id `tempo-day-plan.time-prepositions.l-1-1-i` (KEPT) · grade 1 · Common Core L.1.1.i (use frequently occurring prepositions — here the time prepositions before, during, after) · strand Language · page title (frozen) "Tempo's Day Plan — Before, During, or After? (Grade 1)" · own files `mini tools/event-tunnel-core.js`, `event-tunnel-activity.js`, `event-tunnel-activity.html`; the manifest row stays in `tempo-day-plan-activities.json` (id, slugs en/de/fr/es/pt/it/nl, title, intro frozen), `tool` repointed. New sv/da/no/fi metadata at build.
- worksheets it covers: none mapped.
- what the old activity did: a sentence with a gap ("We stretch ___ the run."), chips before/during/after, tap one. **Kept:** Tempo the turtle's day plan as the world (named in the title, never drawn); the three words; every locale's sentence pairs as the seed (de *vor/während/nach* + dative/genitive, fr *avant/pendant/après*, es *antes de/durante/después de*, pt *antes da/durante a/depois da*, it *prima della/durante la/dopo la*, nl *voor/tijdens/na*). **Fixed — the old activity's real defect:** most of its rounds had TWO or THREE sensible answers (*We rest before lunch / after lunch*; *We clap during the song / after the song*; *We clean up before the party / after the party*). A sentence alone cannot decide. Here the **day road decides**: either the action already sits before, inside or after the event and the child names where (one right word), or the sentence is complete and the child puts the action there (one right place).

## 1. The pitch
"An event is a tunnel on the day's road — what you do while you're inside it happens DURING, what's on the road in front of it happens BEFORE, and what's waiting past the exit happens AFTER — and a lantern walks the road to show which stretch your word means."

## 2. Why a child will want it again (the fun)
- **The day road.** A winding road runs across the stage from morning (a pale dawn edge on the left) to evening (a dusky edge on the right). In the middle stands a stone **tunnel** — an arch with little windows — and above its arch, the event's library picture: a stage for *the show*, a cake for *the party*, a bed for *bedtime*.
- **The action card.** A paper card with what we do (*We clap*) stands on the road somewhere — in front of the tunnel, inside it (visible through the arch's windows), or past the exit.
- **The lantern walks.** Pick a word and press Check: a library lantern sets off from the morning end and walks the road. The word you chose lights its stretch of road like a lamp-lit path: *before* lights the road up to the tunnel mouth; *during* lights the inside — the lantern goes into the tunnel and its glow shines out of all the little windows; *after* lights the road beyond the exit. If the action card stands in the lit stretch, it lights up too and hops.
- **Tunnel windows.** When the lantern is inside, the tunnel windows glow one after another — it is the most satisfying thing on the screen, and children send the lantern through again just to see it.
- **Tempo's day fills up.** Each solved round leaves its little card beside the road as a milestone; at the end of a pass the whole day plan stands along the road, and the lantern walks it from morning to evening once, lighting each tunnel as it passes.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** *before* = earlier than the event, *during* = at the same time as the event (while it is going on), *after* = later than the event; the word sits in front of the event name (*before the run*).
- **Misconception 1 — "during" means "near" or "at the start".** The tunnel has length: during is the whole inside, not the mouth. An action at the mouth (before) is not lit by *during*.
- **Misconception 2 — before/after swapped** (left-right confusion of time). The road runs morning → evening, and the lantern always walks forward; *before* lights the stretch the lantern reaches FIRST. The direction of the walk, not a left/right label, carries the meaning (it also reverses nothing for right-to-left readers — all 11 locales read left to right; §9).
- **Misconception 3 — the sentence alone is enough.** The old rounds were ambiguous; here the road fixes the situation, and level 3 shows the reverse: one complete sentence → one place on the road.

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (480), bubble column right (200).

**At 704 px** (stage 480 × 440):
- **The sentence strip** (top, y 0–70): the sentence in Nunito 30 px with the gap as a dotted box (*We clap ___ the song.*); in level 3 the sentence is complete.
- **The day road** (y 80–330): a drawn road 480 × 250 (a gentle S, 56 px wide, cream with a dashed centre line), dawn tint at the left edge (pale yellow), dusk tint at the right edge (soft lilac) — no sun or moon objects drawn, only the colour of the sky band. **The tunnel** at the road's middle: a stone arch 150 wide × 110 tall with three round windows (16 px), its two mouths clearly open. **The event picture, 112 px** (library) sits on top of the arch. Levels 1–2: the **action card** (paper card 120 × 52, Baloo 2 22 px) stands on the road in one of three stretches: in front of the tunnel (x 40–150), inside (visible framed in the arch, x 170–310), or past the exit (x 330–440).
- **The lantern** (library camping/lantern, 56 px) waits at the morning end.
- **Word cards** (y 350–430): three cards 136 × 64 (Baloo 2, 28 px): the locale's *before · during · after*, **shuffled per render** (see §6 answer position — a rack in road order would let a child match the card's left/middle/right position without reading a word).
- **Task line** above (≤ 24 px). **Bubble** right.

**At 360 px** (stacked; stage 360 × 540): sentence strip 344 × 80 (26 px, two lines); road 344 × 230 with the tunnel 120 × 96, event picture **80 px**, action card 104 × 46; lantern 44 px; word cards 3 × 108 × 56; Check below. Check bottom ≤ 700 at 360 × 740, ≤ 630 at 320 × 640 (at 320 the road straightens, event picture 72 px).

No words on the apparatus except the content (the sentence, the action card, the word cards).

## 5. The hand
- **Choose a word** (levels 1–2): drag a word card into the gap (or tap it — it slides in, 200 ms). The strip reads the whole sentence. Its stretch of road shows a faint dotted outline for 600 ms (a preview of what the word *means*, never the answer — it shows the word's stretch, not whether the card is there).
- **Send the lantern (free play, any time):** tap the lantern. It walks the road in 2.4 s, its glow lighting the road as it goes; inside the tunnel the windows glow in turn. If a word is in the gap, its stretch stays lit after the walk.
- **Place the action** (level 3): drag the action card onto the road; it snaps to the nearest of the three stretches (before / inside / after — the inside snap puts it framed in the arch) with a soft *tap*; drag again to move.
- **Plan the day** (level 4): drag three action cards to their places on a road with two tunnels.
- **Undo:** tap the gap or drag a card back to its rack.

## 6. The rounds
One round = one event (a tunnel) and one action. Levels 1–2: the action already stands on the road, the child supplies the word. Level 3: the sentence is complete, the child places the action. Level 4: a short day plan.

**Level 1 — Where is it on the road?, 9 rounds.**

| # | sentence | event picture | action stands | right |
|---|---|---|---|---|
| 1 | We stretch ___ the run. | activities/running | in front | before |
| 2 | We are quiet ___ the show. | music/stage | inside | during |
| 3 | We rest ___ lunch. | kitchen-tools/plate | past the exit | after |
| 4 | We pack ___ the trip. | vehicles/airplane | in front | before |
| 5 | We clap ___ the song. | music/singer | inside | during |
| 6 | We clean up ___ the party. | bakery/cake | past the exit | after |
| 7 | We brush our teeth ___ bed. | furniture/bed | in front | before |
| 8 | We sit still ___ the story. | classroom/book | inside | during |
| 9 | We dry off ___ the bath. | around-the-house/bathtub | past the exit | after |

The old eight en sentences are kept (the photo round becomes *the story*: there is no camera in the vocabulary). Right: 3/3/3.

**Level 2 — New days, 9 rounds** (same mechanic, new events; the action's place is chosen so the sentence is also natural): We put on our boots ___ the rain. (weather/rainy · in front · before) · We wear our coats ___ the snow. (weather/snowflake · inside · during) · We build a snowman ___ the snow. (weather/snowflake · past the exit · after) · We wash our hands ___ lunch. (kitchen-tools/plate · in front · before) · We look out the window ___ the bus ride. (vehicles/bus · inside · during) · We say thank you ___ the meal. (kitchen-tools/plate · past the exit · after) · We pack a map ___ the hike. (activities/hiking · in front · before) · We sing ___ the walk. (activities/hiking · inside · during) · We read a book ___ the bath. (around-the-house/bathtub · past the exit · after). Right 3/3/3.

**Level 3 — Put it on the road, 9 rounds.** The sentence is complete; the action card waits on the shelf; the child drags it to its stretch. Reuses levels 1–2 sentences with the words now IN them (*We clap during the song.* → inside). Check: the lantern walks and the sentence's word lights its stretch; the card must stand in it.

**Level 4 — Tempo's day plan, 3 rounds × 3 cards.** A road with TWO tunnels (two events, T1 then T2) and five stretches: before T1 · inside T1 · between · inside T2 · after T2. Three complete sentences in a list on the strip; three action cards to place. **Every sentence names exactly one stretch:** only *before T1*, *during T1*, *during T2* and *after T2* are ever written — *after T1* and *before T2* are never used, because each would fit two stretches (the between-stretch and beyond). Round A — T1 *lunch* (kitchen-tools/plate), T2 *the bath* (around-the-house/bathtub): "We wash our hands before lunch." · "We splash during the bath." · "We put on pyjamas after the bath." Round B — T1 *the walk* (activities/hiking), T2 *the show* (music/stage): "We tie our shoes before the walk." · "We sing during the walk." · "We clap during the show." Round C — T1 *the trip* (vehicles/airplane), T2 *the night* (space/moon): "We pack before the trip." · "We look out of the window during the trip." · "We dream during the night." The between-stretch stays empty in every round — a visible reminder that a day has gaps.

**Answer position.** Levels 1–2: the right word follows the action card's place, which is balanced 3/3/3 per level and never the same place three rounds running. **The word rack is shuffled per render** with a balance constraint (the right word in each rack slot 3 of 9 times). The draft kept the rack in road order (before, during, after), which made the right word ALWAYS sit in the same left/middle/right position as the action card on the road — the bot "pick the word card under the action card" scored 9/9 without reading. The gate now runs that bot and caps it at ≤ 3/9 (it only wins when the shuffle happens to align). Level 3: the correct stretch is balanced 3/3/3. The gate's bots: *always during* (3/9), *the stretch nearest the card's start shelf* (L3: the shelf sits under the road's centre — the bot "drop it in the middle" scores 3/9), *the word that appeared in the previous round* (≤ 2/9 — guarded by the no-three-in-a-row rule).
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with nothing chosen / placed:** hint, no miss — "Look where the card stands on the road. Is it before the tunnel, inside it, or after it?" (L3: "Read the sentence. Where does this go on the road?")
- **Miss 1:** the lantern walks and lights the stretch the WORD means; the action card is not in it — the lit stretch is empty and the card stays dark where it stands, with a dotted line from the card to the stretch it really stands in · "The lantern lit {word}. But the card stands {where}. Which word lights the card?"
- **Miss 2:** the action card's own stretch pulses teal and the matching word card lifts 6 px · "Try the word that lights the glowing stretch."
- **A new move takes the help away** until the next Check.
- **Success:** the lantern lights the stretch, the card hops and glows, the tunnel windows flash once (for *during*), the card shrinks into a milestone beside the road · en "We clap DURING the song — while it is going on!" · "We stretch BEFORE the run — first stretch, then run!" · "We rest AFTER lunch — first lunch, then rest!"

## 8. Settings
1. **Days:** Where is it? (L1) · New days (L2) · Put it on the road (L3) · Day plan (L4) — the level picker; at rest the road shows a placed card (L1–2) or an empty road with a waiting card (L3–4).
2. **Stretches:** Hidden (default) · Show the three stretches — draws faint dotted outlines of before / inside / after on the road at rest (a scaffold for children still learning the idea); visible at rest.

## 9. Words (EN source)
- title (shell): **Tempo's Day Plan** (frozen) · instruction: "The tunnel is the event. Before it, inside it, or after it — which word fits where the card stands?"
- task lines: L1–L2 "Where is the card? Pick the word." · L3 "Read it. Put the card on the road." · L4 "Plan Tempo's day."
- hints and celebrations: §7 exactly ({where} = "in front of the tunnel" / "inside the tunnel" / "past the tunnel").
- settings: "Days", "Where is it?", "New days", "Put it on the road", "Day plan", "Stretches", "Hidden", "Show the three stretches"
- aria: "Event: {event}. The card '{action}' stands {where}.", "Word {w}", "The lantern lit the road {before the tunnel | inside the tunnel | after the tunnel}."

**Locale traps (every phrase literal per locale; the old lists kept):**
- **The word is not always one word.** es *antes de / durante / después de* — and with a masculine event the article fuses: *antes del almuerzo / durante el almuerzo / después del almuerzo*, so es cards, like pt and it, carry the article (*antes del · durante el · después del* for a masculine event, *antes de la · durante la · después de la* for a feminine one); pt *antes da / durante a / depois da* (the contraction agrees with the event's gender: *antes do almoço*, *antes da festa* — the card shows the round's form, as the old data did); it *prima della / durante la / dopo la* (agrees: *prima del pranzo*); fr *avant / pendant / après* (with the article in the event phrase: *avant le spectacle*). The three cards of a round always carry the forms for THAT event's gender, so agreement never becomes the tell.
- **de** *vor / während / nach* + dative (*vor dem Lauf, nach dem Essen*) and *während* + genitive (*während des Liedes*, colloquially dative): the event phrase after the gap changes with the word — so in de the strip shows the event phrase **on the word card** (*vor der Wanderung / während der Wanderung / nach der Wanderung*), never a fixed phrase that only fits one card (feminine events keep *der* in all three: the old de data chose feminine events — kept: Wanderung, Vorstellung, Turnstunde, Reise, Musik, Feier, Mahlzeit, Fahrt). Separable verbs (*Wir ruhen uns ___ der Turnstunde aus.*) keep their particle after the gap.
- **nl** *voor / tijdens / na*; **sv** *före / under / efter* (*innan* before a clause — not used), **da** *før / under / efter*, **no** *før / under / etter*; Nordic *under* also means "below" — the tunnel makes the time meaning visible (the action is inside, not under the road).
- **fi** uses postpositions and cases: *ennen* + partitive BEFORE the noun (*ennen juoksua*), *aikana* AFTER the genitive (*laulun aikana*), *jälkeen* after the genitive (*lounaan jälkeen*). Word order differs, so in fi the gap sits AFTER the event noun for *aikana/jälkeen* and before for *ennen* — impossible with one gap position. fi rounds therefore put the whole phrase on the card (*ennen juoksua / juoksun aikana / juoksun jälkeen*), and the sentence strip reads *Venyttelemme ___.* The road does the rest. Documented.
- **Reading direction:** all 11 locales read left to right; the road runs left (morning) → right (evening), matching every locale's timeline convention.
- Sound off: the lit stretch and the lantern's walk carry the meaning; TTS reads the finished sentence only.

## 10. Sound off, access, phones
- Silent legibility: a lantern that lights one stretch of a road; a card that does or does not glow inside it.
- Keyboard: Tab to a word card, Enter places it; in level 3–4 Tab to the action card, ←/→ moves it between stretches, Enter drops; Enter on the lantern sends it.
- aria-live: "The lantern lit the road inside the tunnel. 'We clap' is inside the tunnel." 
- Taps: word cards 136 × 64 (108 × 56 at 360); stretches are drop zones ≥ 100 × 80; the lantern 56 px (44 px hit area at 360).
- Pictures: event 112 px at 704, 80 px at 360, ≥ 72 at 320.
- Phone: the road straightens at 320; the bubble is one line until miss 2.

## 11. Distinct from
- **Row 126 Turning Bridge (this batch)** — a car crossing between two clauses; here a lantern walking a day road with an event tunnel. No joining words, no vehicle.
- **Row 125 Photo, Window, Envelope (this batch)** — tense (verb form); here prepositions of time relative to an event.
- **New 210 Sleeps Calendar** (days and nights as a necklace) and **tool our-day** (a schedule of cards with a sun marking now) — a day as a list of slots; here an event has LENGTH (a tunnel), which is what *during* needs.
- **New 222 Pencil Path** (a car following a stroke) — no relation.

## 12. Build plan
- **Data:** per locale, levels of rounds `{id, before?, after?, eventKey, actionText, stand:'front'|'inside'|'past', words:[{w, eventPhrase?}], right}`; L3 `{sentence, actionText, eventKey, target}`; L4 `{tunnels:[k1,k2], stretches:5, items:[{sentence, card, target}]}`.
- **Core state:** `{level, round, gap:null|wordIdx, cardAt:null|stretch, misses}`; functions `choose(i)`, `place(stretch)`, `lit()` → stretch for the chosen word (pure), `walk()` (animation only), `check()` → `{ok, reason}`.
- **Gate's own ground truth** (`verify-event-tunnel-core.js`): its own map word → stretch per locale; asserts the position-match bot (rack slot = action-card stretch) ≤ 3/9 per level; es/pt/it card articles agree with the event's vocab gender; asserts L1–2 right word = the one whose stretch equals `stand`; L3/L4 target = the stretch named by the sentence's word; L4 every sentence names exactly one of five stretches and no L4 sentence uses *after T1* or *before T2*; 3/3/3 balance per level; no three equal answers in a row; pt/it/es word forms agree with the event's vocab gender; fi rounds carry the full phrase; every picture exists in a colour theme.
- **Mutations:** the rack in fixed road order · es *antes de el* (unfused) · *during* lights the front stretch · *before* lights past the exit · L3 accepts the card in the wrong stretch · L4 a sentence matches two stretches · pt card shows *antes do* for a feminine event · balance broken · the lantern's lit stretch shown before Check (a tell).
- **Pictures** (critic, contact sheets 2026-10-17; every key exists and is labelled): activities/running (a girl running), activities/hiking (a girl with a backpack and pole), music/stage (red curtains), music/singer (a woman with a microphone), camping/lantern (a red oil lantern), furniture/bed, around-the-house/bathtub, kitchen-tools/plate, bakery/cake, vehicles/airplane (purple), vehicles/bus (blue — not school_bus, which prints English text), classroom/book, weather/rainy (a rain cloud), weather/snowflake, space/moon.
- **Risks:** *lunch* as a plate picture is a stretch; the native/pedagogy reviewer may prefer breakfast/pancake for a meal picture — any meal event uses the same plate consistently. Level 4's five stretches must stay ≥ 100 px each at 360 (road length 344 → the two tunnels shrink to 72 px).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a lantern that walks a winding road and lights up the windows of a tunnel, and a day plan that fills up with milestones.
2. **Would a teacher put it on the board?** Yes — "an event is a tunnel; during is inside it" is the clearest picture of *during* there is, and every round now has exactly one right answer (the old one did not).
3. **Would a parent trust it?** Yes — real pictures of real moments of a child's day, correct agreement and word order in their own language, no scores.
4. **The invention:** an event is a tunnel on the day's road — before is the road in front of it, during is the inside, after is past the exit — and a lantern walks the road to light the stretch your word means.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- **A 9/9 answer tell removed:** the word rack sat in road order (before, during, after) while the action card stood in front / inside / past the tunnel, so the right word was always the card directly matching the action card's left/middle/right position — solvable without reading. The rack is now shuffled per render with slot balance, and the gate runs and caps the position-match bot.
- es cards carry the fused article for masculine events (*antes del / durante el / después del*), as pt and it already did.
- Pictures confirmed on the sheets (bus = the blue bus, never the printed-English school_bus).
- Kept: the road-decides fix for the old activity's two-and-three-answer rounds, the L4 rule that never writes *after T1* / *before T2*, and the fi whole-phrase cards — all correct.
