# New 232 — The Sense Face → THE SIGNAL THAT ONLY ONE DOOR TAKES IN (NGSS 1-LS1-1)

## 0. Identity
- id `sense-face.play.1-ls1-1` · grade K · NGSS 1-LS1-1 (senses and the body parts that sense), framework via `alignment.framework` · strand Science · files `sense-face-core.js`, `sense-face-activity.js`, `sense-face-activity.html`, `sense-face-activities.json`. Scaffold `node scripts/new-activity.js --num=232`.
- worksheets covered: K-355 Five Senses · G1-357 Sort by Sense · G1-358 Which Sense? · G1-359 Which One Does Not Belong? · G1-360 Write the Sense Word · G1-361 I Can Hear… Merged: grade 1 "The Sense Switchboard" (face with five plug sockets, cable, odd-one-out) — it IS this instrument's face and cable.

## 1. The pitch
"Plug the thing into the face: a bell's sound rings in through the ear, a rose's smell curls in through the nose — plug it into the wrong door and its signal just bounces off."

## 2. Why a child will want it again
- A face that is a switchboard: a big friendly face board made of library body-part pictures (eye, ear, nose, mouth, hand), each one a socket. Things arrive on a curly cable with a chunky plug. Plugging in has a satisfying "chunk".
- The thing **comes alive** once plugged: the bell swings and sends out drawn sound-rings, the rose puffs scent-curls, the rainbow throws light-sparkles, the lemon squirts little taste-drops, the sponge sends squishy ripples. The signal travels along the cable as moving shapes and pours into the right organ, which reacts — the ear's rings converge into it, the nose's curls are sniffed in (the nose picture tilts up 6°), the eye blinks (a drawn lid sweeps), the mouth picture opens wider (scale 1.08), the hand gives a little squeeze-wiggle.
- Wrong door is funny: rings bump against the nose and scatter like ping-pong balls; scent-curls hit the hand and drift away. Children try the trumpet on the nose on purpose — and then say "no, sounds go in your EAR".
- Earned show per round: the thing docks in a little gallery around the face on the side of its sense (things for the ear gather near the ear), so after a pass the face is surrounded by its things — a living sort-by-sense poster made by the child.
- Free play: between rounds the child can unplug any docked thing and plug it anywhere to watch its signal again; tapping an organ makes it do its little move.

## 3. The skill and the misconception
- **Skill:** we learn about the world with five senses, each through a body part: eyes see, ears hear, nose smells, mouth (tongue) tastes, skin/hands touch; match each experience to its sense and body part; some things are sensed in two ways.
- **Misconception 1 — "I sense it with whatever I'm looking at" / hearing with the eyes (picture books).** **Pushback:** the signal is a physical shape that only one door takes in; a sound-ring physically bounces off an eye.
- **Misconception 2 — "one thing, one sense".** **Pushback (setting "one or two senses"):** some things arrive on a Y-cable with **two plugs**; the lemon is still squirting signals until both doors (mouth and nose) are filled. The plug count on the cable shows how many senses — the child must find both.
- **Misconception 3 — "taste is only the tongue, smell has nothing to do with it".** Lemon, onion, strawberry, pizza deliberately need nose AND mouth.

## 4. The stage
At **704 px** (split: face stage 470 px, conveyor/bubble 214 px):
- **The face board** (centre of the stage, 440 × 420): a drawn rounded face outline (cream fill, 3 px ink, no features drawn — every feature is a library picture). Sockets, each a library picture inside a drawn socket ring (teal, 4 px):
  - **eye** `body-parts/eye` 120 px — upper middle;
  - **ear** `body-parts/ear` 110 px — on the right edge;
  - **nose** `body-parts/nose` 100 px — centre;
  - **mouth** `body-parts/mouth` 120 px — lower middle (the open mouth with tongue showing taste);
  - **hand** `body-parts/hand` 120 px — beside the face at lower left, as if raised.
  The positions are fixed in every round (the organ IS the content).
- **The thing** (right column, top): the library picture (130 px) on a cable spool with a plug (a drawn plug, 44 × 56) — two plugs on a Y-cable when it has two senses.
- **Gallery** (around the face): docked things (64 px) gather in an arc next to the organ they went into.
- **Sense-word strip** (Sense words task only, right column): either five sense-word tiles (120 × 44: see · hear · smell · taste · touch) for an organ that lights on the face, or a sentence "I can hear the ___." with three picture tiles (96 px) — see §6 D.
- **Task lines (≤ 24 px):** Plug "Plug it into the part of your body you use for it." · Find all "Plug in everything you {sense} with your {organ}." (authored per sense, e.g. "Plug in everything you hear with your ears.") · Odd one out "One thing does not belong here. Unplug it." · Sense words "Which word goes with the glowing part?" / "Finish the sentence." (the two round kinds of §6 D)
- No words on the apparatus except the sense words in the sentence task (content).

At **360 px** (stacked): face board 320 × 300 (eye 80, ear 72, nose 64, mouth 80, hand 80); the thing + plug row under it (thing 96 px, cable drawn up to the face); gallery thumbnails 44 px. Height: 30 task + 300 face + 110 thing row + 44 bubble = 484 — Check above both folds (320: face 288 × 272, organs ≥ 64).

## 5. The hand
- **Drag the plug** (it lifts within 50 ms, the cable stretches behind it as a smooth bezier): near a socket ring (within 36 px) the ring brightens; **drop** → "chunk" (120 ms snap). Tap-tap alternative: tap the plug, tap an organ.
- **Signal:** 200 ms after plugging, the thing comes alive (bell swings ±12°, rose bobs, lemon tilts) and its signal shapes travel along the cable (6 shapes, 900 ms): sound = concentric arcs; smell = soft S-curls; sight = four-point sparkles; taste = round drops; touch = short zigzag ripples (all drawn geometry, palette colours, never on the face until plugged).
  - **Right door:** the shapes flow into the organ, the organ reacts (eye blink 200 ms; ear rings converge; nose tilt; mouth scale 1.08; hand squeeze-wiggle), a soft matching tone (bell-ish ping, a sniff "fff", a sparkle tinkle, a "mm", a soft pat). Then the thing docks in the gallery by that organ.
  - **Wrong door:** the shapes reach the socket and **bounce off** (scatter outward, 400 ms) and fade; the organ stays still; the plug pops out and the cable springs back to the thing (300 ms).
  - Two-sense thing: each plug is judged separately; one right plug keeps its signal flowing while the other plug waits; both right → docks.
- **Find all:** six things hang on a short conveyor line (each with its own plug); the lit socket glows; plug in every one that belongs (each plugs and comes alive at once — right ones stream in, wrong ones bounce). Check confirms the set (a wrong one bounced already counts toward a miss only at Check if left plugged — it cannot stay plugged, so the set is checked for completeness).
- **Odd one out:** four things already plugged into one organ, all quiet; tap one to unplug it. On Check all remaining three stream in; the unplugged one is then plugged by the apparatus into its own true organ and streams there.
- **Sense words:** (a) drag a word tile onto the glowing organ → on Check the word clips under it as a label and the organ does its move (eye blinks for *see*); a wrong word is pushed back off the organ by a burst of that organ's own signal shapes. (b) drag a picture tile into the sentence's blank → on Check the thing plugs itself into the organ the sentence's verb names and its signal streams in (right) or bounces (wrong, as above).
- **Free play:** any docked thing can be unplugged and replugged; organs react to taps.

## 6. The rounds
### The thing table (one reviewed right set per thing)
| sense / organ | one-sense things (setting "one") |
|---|---|
| see · eye | weather/rainbow · space/moon · beach/lighthouse · christmas/star |
| hear · ear | christmas/bell · music/drum · music/trumpet · accessories/whistle · music/xylophone |
| smell · nose | flowers/rose · flowers/lavender · flowers/lilac |
| taste · mouth | desserts-and-sweets/lollipop · desserts-and-sweets/pudding · breakfast/honey · at-the-supermarket/candy |
| touch · hand | kitchen-tools/sponge · winter/icicle · around-the-house/pillow · easter/feather · miscellaneous/pinecone |
Refused (several senses at once, so no single right answer): cake, cat, apple, popcorn, campfire, television, guitar, cookies, puppy.
| two-sense things (setting "one or two") | senses |
|---|---|
| fruits/lemon | taste + smell |
| vegetables/onion | smell + taste |
| fruits/strawberry | taste + smell |
| at-the-supermarket/pizza | taste + smell |
| desserts-and-sweets/popsicle | taste + touch (cold) |
| weather/stormy | see (lightning) + hear (thunder) |
| bakery/croissant | taste + smell |

### A. Plug in (K-355, G1-358) — 9 things per pass
One-sense setting: 9 of the 21 one-sense things, every sense the answer ≥ 1 and ≤ 3 times (e.g. see 2, hear 2, smell 1, taste 2, touch 2), no sense three times running. Two-sense setting: 5 two-sense + 4 one-sense things; the cable shows 1 or 2 plugs, so the child is told HOW MANY, never WHICH.
### B. Find all for one sense (G1-357) — 7 rounds
| # | lit organ | six things on the line (belonging in bold) |
|---|---|---|
| FA1 | ear | **bell**, **drum**, rose, rainbow, **whistle**, sponge |
| FA2 | nose | **rose**, **lavender**, moon, trumpet, icicle, **lilac** |
| FA3 | mouth | **candy**, pillow, bell, **honey**, star, pinecone |
| FA4 | mouth | **lollipop**, **honey**, feather, lighthouse, xylophone, **pudding** |
| FA5 | hand | **sponge**, **icicle**, rainbow, moon, star, **pillow** |
| FA6 | ear | **trumpet**, **xylophone**, moon, pinecone, rainbow, lavender |
| FA7 | nose | bell, **lilac**, sponge, star, **rose**, xylophone |
**Find-all honesty rule (critic):** a thing that is NOT plugged must truly not be sensed that way — otherwise a careful child who plugs it in is "wrong" for being right. So: no Find-all round for the **eye** (everything on the line can be seen); hand rounds use only things nobody can touch (rainbow, moon, star) as the non-belonging ones (the old FA5/FA7 left a drum, a rose and a lollipop unplugged — all touchable); ear rounds use only silent things; nose rounds only things with no smell; mouth rounds only things nobody eats.
Each line has 2 or 3 belonging things; their slot positions on the line are shuffled and balanced so no slot holds a belonging thing > 50 % of rounds.
### C. Odd one out (G1-359) — 8 rounds
| # | organ | three that belong | the odd one |
|---|---|---|---|
| OO1 | ear | bell, drum, trumpet | rainbow |
| OO2 | nose | rose, lavender, lilac | whistle |
| OO3 | eye | rainbow, moon, lighthouse | honey |
| OO4 | mouth | lollipop, pudding, honey | pillow |
| OO5 | hand | sponge, icicle, feather | moon |
| OO6 | ear | whistle, xylophone, bell | lavender |
| OO7 | hand | pillow, pinecone, sponge | star |
| OO8 | mouth | candy, honey, lollipop | lilac |
The odd one's position among the four plugged things cycles 2/2/2/2.
### D. Sense words (G1-360, G1-361) — 9 rounds (two kinds, interleaved)
The old frame "I can ___ the {thing}." with five verb tiles had **two right answers in every round** — "I can see the bell" is true; every thing can be seen. It is replaced by two kinds that each have exactly one right answer:
- **(a) The word for the part (G1-360 "write the sense word next to the body part") — 5 rounds:** one organ glows; five word tiles see · hear · smell · taste · touch; the child drops the one word that organ does. eye→see, ear→hear, nose→smell, mouth→taste, hand→touch. Tile order is a fresh shuffle each round (the right tile in each of the five slots once per pass).
- **(b) Finish the sentence (G1-361 "I can hear …") — 4 rounds:** the sentence names the sense, the child picks the THING from three picture tiles; the two wrong tiles cannot be sensed that way at all. There is no *see* sentence (nothing could be wrong).

| # | sentence | right | the two that cannot |
|---|---|---|---|
| SW1 | "I can hear the ___." | bell | rainbow, pillow |
| SW2 | "I can smell the ___." | rose | drum, icicle |
| SW3 | "I can taste the ___." | honey | star, xylophone |
| SW4 | "I can touch the ___." | sponge | rainbow, moon |
The right tile's slot cycles left / middle / right / middle over the 4. Kinds alternate a, b, a, b, a, b, a, b, a.
**Order:** order-only reshuffle per pass for every table.

## 7. Check, the misses, the success
Plugging is self-checking (answerType 'state'); the shell Check closes Find-all and Odd-one-out rounds and confirms two-sense things.
- **Nothing done** → "Drag the plug to a part of the face." · Find all: "Plug in the things for the glowing part." · Odd: "Tap the thing that does not belong." (no miss)
- **Miss 1:** the signal bounces off the wrong door (visible shapes scatter); hint by the signal: "That's a sound. Which part hears?" · "That's a smell. Which part smells?" · "That's something to see. Which part sees?" · "That's a taste. Which part tastes?" · "That's something to feel. Which part touches?" (the hint names the signal kind, which the bounce has just shown — the child still has to pick the organ).
- **Miss 2:** the right organ's socket ring breathes slowly (a 30 % pulse) and the bounced shapes, as they fade, drift toward it. Hint: "Follow the {signal} to the part that takes it in."
- **Find all, miss:** on Check, belonging things still unplugged wiggle their plugs (miss 1: "Something else belongs here too."); miss 2: their plugs glow.
- **Odd one out, miss:** the unplugged thing was a right one → on Check it is replugged into the lit organ and streams in happily; the true odd one stays plugged and bounces — "That one belonged. Which one bounces?" Miss 2: the odd one's cable flickers.
- **Two-sense, partial:** one right plug streams; the empty second plug swings — "This one has two plugs. What else do you use?"
- A new plug clears the showing.
- **Success:** the signal streams in, the organ reacts, the thing docks by its organ. Bubble: "You {sense} the {thing} with your {organ}!" (e.g. "You hear the bell with your ears!"); two-sense: "You taste AND smell the lemon!" · Find all: "All the things you hear!" · Odd: "Rainbow doesn't belong — you see it with your eyes!" · Sense words (a): "Your ears hear!" (per organ) · (b): "I can hear the bell!"

## 8. Settings
1. **Task:** Plug in · Find all · Odd one out · Sense words (default Plug in). At rest: one thing with a plug / a line of six / four plugged things / a glowing organ with word tiles.
2. **Senses per thing:** one · one or two (default one). At rest: single cables only, or the next thing's Y-cable with two plugs visible on the spool (Plug in task); in other tasks the setting shows as unavailable (they are one-sense by design).

## 9. Words (EN source)
- title: "The Sense Face — Five Senses"
- instruction: "Each thing sends its signal. Plug it into the part of your body that takes it in."
- task lines: §4 (Find-all line authored per sense: "Plug in everything you see with your eyes." · "…hear with your ears." · "…smell with your nose." · "…taste with your mouth." · "…touch with your hands.")
- sense words: "see" · "hear" · "smell" · "taste" · "touch"
- hints / celebrations: §7. Sentences (§6 D b): "I can hear the ___." · "I can smell the ___." · "I can taste the ___." · "I can touch the ___." · per-organ celebrations "Your eyes see!" · "Your ears hear!" · "Your nose smells!" · "Your mouth tastes!" · "Your hands touch!" · wrong-word hint (a): "That is not what this part does. Watch it."
- settings: "Task" — "Plug in" / "Find all" / "Odd one out" / "Sense words" · "Senses per thing" — "One" / "One or two"
- **Locale traps:**
  - Sense verbs differ by language: de *sehen / hören / riechen / schmecken / fühlen (tasten)*; fr *voir / entendre / sentir / goûter / toucher* — **fr *sentir* is both "smell" and "feel"**: the touch tile must be *toucher* and the smell sentence "Je peux sentir la rose" is right; the reviewer confirms no ambiguity in the touch frame. es *ver / oír / oler / saborear (probar) / tocar*; it *vedere / sentire (udire) / annusare (odorare) / assaggiare / toccare* — **it *sentire* also covers hear/smell/feel**: use *udire* or *sentire con le orecchie*? → the native reviewer chooses the school words (*vista, udito, olfatto, gusto, tatto* are the Italian school nouns; the frame may use nouns "Uso l'udito per la campana" instead of verbs). Same for pt (*ver, ouvir, cheirar, provar, tocar*), nl (*zien, horen, ruiken, proeven, voelen*), sv (*se, höra, lukta, smaka, känna*), da (*se, høre, lugte, smage, føle*), no (*se, høre, lukte, smake, kjenne*), fi (*nähdä, kuulla, haistaa, maistaa, tuntea* — the object case changes: "Voin kuulla kellon" genitive/partitive; each sentence authored).
  - Each "I can {verb} the ___." sentence and its completed form ("I can hear the bell!") are authored per locale — the blank takes a case/article in fi/de (fi "Voin kuulla kellon", partitive/genitive by verb) — never a template fill; the four sentences and four right things are fixed per §6 D so each locale authors only 4 + 4 strings.
  - Body-part plurals in the celebration (ears/eyes/hands but nose/mouth singular) authored per locale.
  - Taste organ: the picture is `body-parts/mouth` (open mouth with the tongue visible); the sense word is "taste", and the celebration says "mouth" (the tongue picture in the cache is unlabelled).

## 10. Sound off, access, phones
- Sound off: signal shapes, bounce, organ reactions and docking are visual; the per-sense tones are a bonus (and the hearing items do not depend on hearing the sound — the rings show it).
- Keyboard: Tab to the plug; Space picks; 1–5 or arrows choose eye/ear/nose/mouth/hand; Space plugs. Find all: Tab through line items. Odd: Tab + Space unplugs.
- aria: sockets "Eye — see", "Ear — hear"…; live region "The sound bounced off the nose." / "The bell rang into the ear."
- Taps ≥ 44 px (plug 44 × 56, sockets ≥ 72). Pictures ≥ 96 px at 704 (organs 100–120, thing 130), ≥ 64 at 360.
- Phone layout §4.

## 11. Distinct from
- **#219 Body Map** (name the body parts by pins/lenses): this is what each organ DOES; no naming of parts.
- **#35 Sorting Chutes** (conveyor into chutes → graph): the line here is a short hanging cable set and the sort is by a signal that bounces.
- Premium tools: no tool plugs things into organs.
- Batch siblings: #231 plant water path, #233 baby grows into its parent — different science and mechanics.

## 12. Build plan
- **Model:** `{task, multi, thing:{key, senses:[…]}, plugs:[{socket|null}], line:[…], plugged:[…], unplugged:null, miss}`; `plug(i, organ)` → accepted iff `thing.senses` includes organ's sense; `checkFindAll()`, `checkOdd()`, `fillSentence(word)`.
- **Gate (own oracle):** every one-sense thing has exactly one sense in the reviewed table, every two-sense thing exactly two; per pass each sense is the answer 1–3 times and never 3 running; Find-all lines hold 2–3 belonging things and a belonging slot ≤ 50 %; odd position 2/2/2/2; refused items never appear; every picture labelled in its theme JSON (body-parts eye/ear/nose/mouth/hand), no BW; every string in 11 locales; the signal kind is never drawn before plugging (DOM check: no `.sf-signal` before the first plug).
- **Mutations:** nose accepts a sound; a two-sense thing docks after one plug; the signal visible before plugging; the odd one always last; Find-all accepts a set with one missing; a refused item (cake) in the pool.
- **Pictures to verify:** body-parts/{eye, ear, nose, mouth, hand} (the eye/ear/nose/mouth/hand pictures carry no arrows — seen on the contact sheet; ankle/cheek/chin/eyebrow/neck/etc. carry red arrows and are not used), weather/{rainbow, stormy}, space/moon, christmas/{star, bell}, beach/lighthouse, music/{drum, trumpet, xylophone}, accessories/whistle, flowers/{rose, lavender, lilac}, desserts-and-sweets/{lollipop, popsicle, pudding}, at-the-supermarket/{candy, pizza}, breakfast/honey, kitchen-tools/sponge, winter/icicle, around-the-house/pillow, easter/feather, miscellaneous/pinecone, fruits/{lemon, strawberry}, vegetables/onion, bakery/croissant.
- **Risks:** the reviewed one-sense table is a pedagogy call — the reviewer confirms each (icicle = touch/cold; moon = see; pudding = taste). Odd-one-out must never use a two-sense thing. **Refused on the contact sheet (critic):** at-the-supermarket/salt carries the printed English word "SALT" (unusable outside en); space/saturn is a planet a child never sees (and planet art is on the rulings list) — replaced by christmas/star.
- **Mutations (added by the critic):** a Find-all line whose non-belonging thing can be sensed that way (a drum left out of "touch"); a sentence round with two true tiles; the old five-verb sentence frame.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Choose it again?** Yes — a face you plug things into, things that come alive, and sounds that bounce off noses.
2. **Teacher on the board?** Yes — "a sound only gets in through your ear" is shown, not said; two-plug things open the "more than one sense" talk.
3. **Parent trust?** Library pictures, calm, no score, legible with sound off.
4. **The invention:** each thing sends its signal in a shape only one body part takes in — plug it into the right part and the signal pours in, the wrong part and it bounces off; two plugs mean two senses.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 3→5
What changed:
- **"I can ___ the bell" had two right answers in every round** ("I can see the bell" is true — everything can be seen). The task is now **Sense words**: (a) the word for the glowing body part (G1-360, one right word each) and (b) "I can hear/smell/taste/touch the ___" with three picture tiles where the two wrong ones truly cannot be sensed that way (G1-361); no "see" sentence.
- **Find all was unfair to a careful child:** a drum, a rose and a lollipop left un-plugged in a "touch" round can all be touched; honey, bells and pillows in an "eye" round can all be seen. New rule and tables: no eye Find-all; non-belonging things must truly not be sensed that way.
- Pictures: at-the-supermarket/salt has the printed English word SALT → desserts-and-sweets/pudding; space/saturn (a planet a child never sees) → christmas/star; odd-ones adjusted (no touchable xylophone/candy as "not touch").
