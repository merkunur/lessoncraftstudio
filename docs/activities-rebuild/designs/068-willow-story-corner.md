# Row 68 — Willow's Story Corner → THE STORY ZIPPER (RL.K.9)

## 0. Identity
- id `willow-story-corner.compare-tales.rl-k-9` (KEPT; slugs/metadata frozen en, fr; de/es/pt/it/nl/sv/da/no/fi slug, title, intro new) · grade K · Common Core RL.K.9 · strand Reading: Literature · own files `story-zipper-core.js`, `story-zipper-activity.js`, `story-zipper-activity.html`; manifest row stays in `willow-story-corner-activities.json` (same id, new params).
- worksheets covered: G2-342 Compare Two Animals: Same and Different.
- old activity: Willow read two 3-beat tales; one question per round ("Who lost something?"); the child tapped Fox / Bunny / Both / Neither. **Kept:** the six tales (Fox, Bunny, Bear, Mouse, Owl, Frog) with their captions and fact tables, the question wording, the four answers Both / Neither / one / the other. **Gone:** emoji/hand-drawn panels and glyphs; the four answer buttons. Willow the tortoise is now the library `pets/tortoise` narrator badge.

## 1. The pitch
"Two stories are the two sides of a zipper: what happens in BOTH stories zips shut in the middle, what happens in only one sticks out on its side — and if you put it in the wrong place, the zipper jams."

## 2. Why a child will want it again
- A big chunky zipper is irresistible: teeth to click into place and a pull-tab that zips with a satisfying rattle, tooth by tooth.
- Each pair of tales fills ONE zipper over five rounds. On the fifth correct tooth the slider zips the whole length in one long "zzzzip", the two story columns are pulled together into one closed jacket-front, and Willow (library tortoise) nods. Then it unzips for the next pair. That full zip is the earned show.
- The teeth that stick out are a picture of difference; the closed middle is a picture of sameness — children read the finished zipper as a summary ("both lost something, only Fox kept trying…").
- Free play: between rounds the child can pull the slider up and down over the teeth already placed (it clicks over correct teeth); tapping a story panel replays its caption.

## 3. The skill and the misconception
- **Skill:** RL.K.9 — compare and contrast the adventures and experiences of characters in familiar stories (here two short tales); G2-342 — compare two animals: which features are the same and which are different.
- **Misconception 1 — "Both" = "it's in one of them" / answering for the last tale heard.** Children answer for the most recent story. **Pushback:** a tooth placed in the middle claims BOTH stories. When the slider reaches it, it can only close if each story column has a panel that shows the event; if one side has none, that side's teeth have nothing to bite and the slider jams with that side gaping open.
- **Misconception 2 — "Neither" never feels like an answer.** **Pushback:** the zipper has a pocket at the bottom for teeth that belong to no story; a tooth placed on a side with no evidence jams the slider, so "neither" becomes a real place the material demands.
- **Misconception 3 (animals) — "different means everything is different".** **Pushback:** the animal pair always shares a visible feature that zips shut, and differs in one that sticks out — sameness and difference sit on one zipper.

## 4. The stage
At **704 px** (no split; zipper in the centre; bubble under the stage):
- **Left story column** (230 × 360) and **right story column** (230 × 360): each a stack of 3 panels (230 × 112, drawn frame, ground line) composed of library pictures (actor 96 px, thing 96 px; small emotion badge 48 px decorative). Caption under each panel (Nunito 14 px, ≤ 2 lines). The character's library picture also heads the column at 64 px.
- **The zipper** (centre, 100 × 360): two drawn tracks of teeth (geometry, warm brass), a slider with a big pull-tab at the top (56 × 56). Five **tooth rows** (64 px apart) down the zipper, each row has three drop spots: left side, middle (spanning both tracks), right side.
- **The pocket** (under the zipper, 140 × 56): a stitched drawn pocket for teeth that belong to neither story.
- **The tooth** (the round's card, top of the stage, 220 × 52): a brass tooth-shaped card carrying the question as a short phrase — "lost something" — and Willow's question spoken/written in the task line.
- **Task line** (≤ 24 px): the round's question, e.g. "Who lost something? Put the tooth where it belongs." (Animal mode: "Which one has a beak? Put the tooth where it belongs.")
- No words on the apparatus except captions and the tooth phrase (content).

At **360 px**: columns 136 × 300 each (panels 136 × 96, actor 64 + thing 64 side by side, captions hidden and shown in the bubble when the panel plays or is tapped); zipper 56 × 300 between them; tooth 300 × 44 above; pocket 120 × 44 below. Height 40 + 48 + 300 + 50 + Check ≈ 500 px — above both folds (320: columns 120, zipper 48).

## 5. The hand
- **Listen first:** at the start of each pair, Willow "reads": the left story's panels light one after another (caption highlighted, TTS where available), then the right story's — 2.5 s per panel; a "play again" tap on Willow replays. Tapping any panel replays that panel alone.
- **Place the tooth:** drag the tooth (lifts within 50 ms) onto the current row's left spot, middle spot or right spot, or into the pocket. It snaps with a brass click (120 ms). It can be moved until Check.
- **Check = pull the tab:** the child drags the pull-tab down (or presses Check, which pulls it). The slider runs down the zipper (180 ms per row); over previously closed teeth it clicks; at the new tooth:
  - **middle, truly both** → each story's evidence panel lights and sends a short glow line to the tooth; the two tracks' teeth interlock (a click and a 4 px squeeze).
  - **side, truly only that story** → the evidence panel on that side lights; the tooth locks onto that side's track and sticks out; the opposite track at that row stays open (a neat gap).
  - **pocket, truly neither** → the pocket flap closes over the tooth with a soft pat; no panel lights.
  - **wrong** → the slider jams at that row: it shudders, stops, and the pull-tab springs back 20 px (see §7).
- **Free play:** the slider can be pulled up and down over the closed rows; panels replay on tap.

## 6. The rounds
One round = one tooth. One pair of stories (or animals) fills one zipper over **5 rounds**: every answer type appears at least once (left only, right only, both, neither) and **one type appears twice — a different type in each pair**. With four teeth of four kinds, a child who had placed three could get the fourth by elimination without reading the question; the fifth tooth, doubled on a kind that changes from zipper to zipper, closes that shortcut.

### A. Tales (setting Compare: two stories) — 3 pairs × 5 teeth = 15 rounds
Panels (library pictures only; a dashed outline is drawn geometry marking something missing):
- **Fox** (forest-creatures/fox): 1 "Fox lost his red scarf." fox + dashed scarf outline · 2 "Fox searched and searched." fox + spring/leaf ×3 · 3 "Fox found it under the leaves." fox + weather/scarf + leaves
- **Bunny** (spring/bunny): 1 "Bunny lost her ball." bunny + dashed ball outline · 2 "A friend helped her look." bunny + forest-creatures/squirrel · 3 "They found the ball together." bunny + squirrel + toys/ball
- **Bear** (forest-creatures/bear): 1 "Bear built a sandcastle." bear + beach/sandcastle · 2 "Rain fell and washed it flat." weather/rainy (96) over a drawn flat sand mound where the castle stood · 3 "Bear tried again and built a new one." bear + sandcastle (beach/wave is cache-only — not used; see §12)
- **Mouse** (forest-creatures/mouse): 1 "Mouse baked little muffins." mouse + bakery/muffin ×3 · 2 "Mouse shared them with friends." mouse + muffins + forest-creatures/hedgehog + forest-creatures/rabbit · 3 "Everyone ate happily." the three + emotions/happy badge
- **Owl** (forest-creatures/owl): 1 "Owl heard a scary noise." owl + camping/moon + emotions/scared badge · 2 "It was just a friend!" owl + forest-creatures/hedgehog · 3 "Owl felt safe again." owl + hedgehog + emotions/happy badge
- **Frog** (pets/frog): 1 "Frog climbed a tall hill." frog + camping/mountain · 2 "Frog flew a kite up high." frog + toys/kite · 3 "Frog cheered at the top." frog + mountain + emotions/excited badge

| pair | tooth (question) | answer | evidence panels |
|---|---|---|---|
| Fox / Bunny | lost something — "Who lost something?" | both | Fox 1, Bunny 1 |
|  | got help — "Who got help from a friend?" | Bunny only | Bunny 2 |
|  | searched alone — "Who searched all alone?" | Fox only | Fox 2 |
|  | found it — "Who found the lost thing?" | both | Fox 3, Bunny 3 |
|  | climbed high — "Who climbed up high?" | neither | — |
| Bear / Mouse | made something — "Who made something?" | both | Bear 1, Mouse 1 |
|  | shared it — "Who shared with friends?" | Mouse only | Mouse 2 |
|  | it rained — "In whose story did it rain?" | Bear only | Bear 2 |
|  | tried again — "Who tried again?" | Bear only | Bear 3 |
|  | lost something — "Who lost something?" | neither | — |
| Owl / Frog | happy at the end — "Who was happy at the end?" | both | Owl 3, Frog 3 |
|  | felt scared — "Who felt scared, then safe?" | Owl only | Owl 1 |
|  | climbed high — "Who climbed up high?" | Frog only | Frog 1 |
|  | made something — "Who made or baked something?" | neither | — |
|  | it rained — "In whose story did it rain?" | neither | — |

Doubled kind per zipper: Fox/Bunny → both · Bear/Mouse → one side (Bear) · Owl/Frog → neither. Per pass of 15: both 4, neither 4, a side 7 (split left/right by the per-pass side swap). (The old rounds fb-lost, fb-help, fb-climb, bm-made, bm-share, bm-wet, of-scared, of-climb, of-bake are kept; fb-try is re-worded — "Who kept looking until they found it?" had TWO right answers, because Bunny also looked until the ball was found — to "Who searched all alone?"; bm-wet becomes "In whose story did it rain?" with the rain panel; bm-lost, of-happy, fb-found, bm-again and of-rain are added. The Fox "kept trying" fact is never asked together with Bear's "tried again", so no tooth has two right places.)

### B. Animals (setting Compare: two animals, G2-342) — 7 pairs × 5 teeth; 3 pairs per pass = 15 rounds
The "story columns" become one big animal picture each (230 × 300, picture 200 px; 136 × 220 / 128 px at 360) with hand-set feature hotspots (`{x, y, r}` per picture, reviewer-checked) that light as evidence. Only features visible in the picture are asked.
| pair (left / right) | both | left only | right only | neither | 5th tooth (the doubled kind) |
|---|---|---|---|---|---|
| farm-animals/duck / birds/penguin | has a beak | is yellow | is black and white | has fur | has wings → both |
| farm-animals/cow / farm-animals/horse | has four legs | has horns | has a mane | has feathers | has patches → cow only |
| pets/frog / forest-creatures/turtle | has four legs | has spots | has a shell | has wings | has fur → neither |
| forest-creatures/owl / forest-creatures/bat | has wings | has feathers | has fur | has a shell | has a beak → owl only |
| insects-and-bugs/bee / insects-and-bugs/ladybug | has feelers | has stripes | has spots | has a tail | is red → ladybug only |
| animals/zebra / farm-animals/horse | has a mane | has stripes | is brown | has horns | has a tail → both |
| zoo-animals/lion / zoo-animals/tiger | has four legs | has a mane | has stripes | has feathers | has wings → neither |

Critic fixes from the contact sheets: the library owl has pointed ear TUFTS, so "has big pointy ears" (bat only) had two right places → the bat's tooth is "has fur"; the library ladybug's wings are hidden under its red shell, so "has wings" was not visible for it → the bee/ladybug "both" is "has feelers" (both antennae are plainly drawn); "has a tail" was unsure on the seated tiger → "has four legs". Every feature asked must be visible in its picture at 128 px (reviewer checks each hotspot on the render).
(Verify on the contact sheets at build: the library cow's horns, the lion's mane, the frog's spots, the bee's stripes — swap any feature the picture does not plainly show.)

**Answer position:** within a zipper the five teeth come in a shuffled order (never "both" first two pairs running); which story/animal sits on the LEFT is swapped per pass, so "left only" is not a habit; over a pass of 15 no spot (left / middle / right / pocket) holds the answer more than 6 times (40 %) or fewer than 3. The gate asserts this, that no spot is the answer 3 times running, and that the doubled kind differs between the three zippers of a pass.
**Order:** order-only reshuffle per pass (pair order, tooth order within a pair, sides).

## 7. Check, the misses, the success
- **Pull with no tooth placed** → the slider moves 10 px and waits; bubble "Put the tooth on the zipper first." (no miss).
- **Miss 1:** the slider jams at the tooth (shudder, the tab springs back 20 px), the tooth shakes on its spot; then Willow re-reads: both columns' panels flash once each in order (a quick re-reading sweep). Hint by mistake: middle but one story only → "Is it in BOTH stories? Look again." · side but both → "Look at the other story too." · side but neither → "Did that happen in this story?" · pocket but in a story → "One of the stories has it. Look again." (Animals: "Look at both animals again.")
- **Miss 2:** as miss 1, then the evidence panels (or feature hotspots) glow steadily — those that show the event; for "neither" no panel glows and the pocket's stitching shimmers. Hint: "The glowing pictures show where it happens." / "No picture shows it." 
- Moving the tooth clears the showing until the next pull.
- **Success (each tooth):** the tooth locks (zipped, sticking out, or pocketed) with its evidence glow. Bubble: both → "Both! {A} and {B} both {phrase}." · one → "Only {A} {phrase}." · neither → "Neither {A} nor {B} {phrase}." (each authored as a full sentence per tooth per locale — §9).
- **Success (fifth tooth):** the whole zipper zips shut top to bottom in one rattling pull, the two columns lean together, Willow nods; the bubble shows the summary: "Both {bothPhrase}. Only {A} {aPhrase}. Only {B} {bPhrase}." Then it unzips for the next pair.

## 8. Settings
1. **Compare:** two stories · two animals (default stories). At rest: three-panel story columns or one big animal each.
2. **Listen first:** always play both stories first · only when I tap Willow (default always). At rest: with "always", the panels are dimmed until the reading finishes and Willow shows a play ring; otherwise all panels are lit at once. (Animals mode ignores nothing — the setting dims/lights the two animal pictures the same way while Willow names them.)

## 9. Words (EN source)
- title (frozen): Willow's Story Corner — Two Tales, Alike or Different?
- instruction: "Listen to both stories. Put each tooth where it belongs: one side, both sides, or the pocket."
- task line: "{question} Put the tooth where it belongs."
- tooth phrases + questions: §6 tables. Captions: §6.
- hints: "Put the tooth on the zipper first." · "Is it in BOTH stories? Look again." · "Look at the other story too." · "Did that happen in this story?" · "One of the stories has it. Look again." · "Look at both animals again." · "The glowing pictures show where it happens." · "No picture shows it."
- celebrations: per-tooth sentences (authored), e.g. "Both! Fox and Bunny both lost something." · "Only Bunny got help from a friend." · "Neither Fox nor Bunny climbed up high." · summary per pair (authored).
- settings: "Compare" — "Two stories" / "Two animals" · "Listen first" — "Always" / "When I tap Willow"
- **Locale traps:**
  - "Both / only / neither … nor" sentences need full authoring per locale (de *Beide … / Nur … / Weder … noch …*, fr *Les deux … / Seulement … / Ni … ni …* with negation *ne*, fi *Molemmat … / Vain … / Kumpikaan ei …* — fi negative verb agrees with person) — never templated.
  - Character names are common nouns in the library (fox, bunny…): de *Fuchs*, *Hase*; gendered pronouns follow the caption (Fox "his", Bunny "her") and must match per locale grammatical gender where it differs (fr *la souris* is feminine — "Souris a fait…" used as a name keeps the caption's pronoun consistent; the reviewer checks each locale).
  - Feature phrases (animals) need number/gender agreement: "has four legs" → fr *a quatre pattes*, de *hat vier Beine*; colour adjectives (yellow / black and white / brown) agree in fr/es/it/pt — authored per pair.
  - "has big pointy ears" — the bat; must be a phrase a K child can read in each locale; native reviewer simplifies.
  - Animal sound-free; no seasons/dates/money.

## 10. Sound off, access, phones
- Sound off: the listen-first reading is visual (panels light, captions highlight); the evidence glows, jams and pocket are visual. TTS is a bonus.
- Keyboard: Space picks the tooth; ← / ↓ / → choose left / middle / right, P the pocket; Enter pulls the slider. Panels focusable; Enter replays a caption.
- aria: tooth "Tooth: {phrase}"; spots "Left: only {A}", "Middle: both", "Right: only {B}", "Pocket: neither"; live region announces "The zipper closed." / "The zipper jammed."
- Taps ≥ 44 px (spots 50 × 44 minimum at 320, pull-tab 56). Pictures ≥ 96 at 704 / ≥ 64 at 360 (story actors and things; badges are decorative and never evidence).
- Phone layout §4.

## 11. Distinct from
- **sorting-hoops** (premium tool: two overlapping hoops, a hidden rule) — a Venn of attributes. Here there are no hoops: two stories are the two tracks of a zipper and the slider tests each claim against evidence panels; "neither" is a pocket. The comparison is of events across two narratives.
- **#229 Blink Viewer** (blinked twins), **#225 Sorting Cabinet**: no overlap of mechanic.
- Batch siblings: #65 orders a book, #66 routes pages to makers, #67 pins words to a picture, #233 compares baby and parent by growing — #68 alone compares two stories.

## 12. Build plan
- **Model:** `{pair:{a,b}, teeth:[{id, phrase, answer}], row, placed:{row:spot}, miss}`; `place(spot)`; `pull()` → `{ok, evidence:[panelIds], jammedAt|null}`; `answerFor(tooth)` derived from the two fact tables (`facts[a][dim]`, `facts[b][dim]`) — never stored; `nextRound()`.
- **Gate (own oracle):** for every tooth, the derived answer matches exactly one spot; each zipper has every answer type at least once and exactly one type twice, a different doubled type in each zipper of a pass; no spot > 40 % or < 3 per pass; no type 3 runs; sides swap per pass; evidence panels exist for every true claim; animal features have a hotspot and a reviewer flag; every picture labelled, no BW; every caption, phrase, question, celebration and summary in 11 locales.
- **Mutations:** both accepted when only one story has it; side accepted for a both-tooth; pocket accepted for an event in a story; answers stored instead of derived (inject a stale answer); sides never swap; a fact asked that has two right spots (Bear kept trying + Fox kept trying in one zipper).
- **Pictures to verify:** pets/tortoise, forest-creatures/{fox, squirrel, bear, mouse, hedgehog, rabbit, owl, turtle, bat}, spring/{bunny, leaf}, weather/scarf, toys/{ball, kite}, beach/sandcastle, weather/rainy, bakery/muffin, camping/{moon, mountain}, emotions/{happy, scared, excited}, pets/frog, farm-animals/{duck, cow, horse}, birds/penguin, insects-and-bugs/{bee, ladybug}, animals/zebra, zoo-animals/{lion, tiger}.
- **Cache-only nouns are NOT used (orchestrator ruling):** beach/wave has no theme-JSON label, so Bear's panel 2 is the rain version (weather/rainy, "Rain fell and washed it flat."). **Label need (not blocking):** "wave" in 11 locales would restore the old "A big wave splashed it."
- **Mutations (added by the critic):** a zipper of four teeth (one of each kind — elimination works); the same doubled kind in every zipper; "Who kept looking until they found it?" accepted with Fox only (two right places).
- **Nothing BLOCKED.**

## 13. The four questions
1. **Choose it again?** Yes — a zipper to click and pull, and a whole-zipper "zzzzip" at the end of every pair.
2. **Teacher on the board?** Yes — "same zips in the middle, different sticks out" is a picture of compare-and-contrast a teacher can point at, and every claim is checked against the story panels.
3. **Parent trust?** Library pictures, calm, no score, works on a phone.
4. **The invention:** two stories are the two sides of a zipper — what happens in both zips shut, what happens in one sticks out on its side, what happens in neither goes in the pocket, and a wrong claim jams the slider.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 3→5
What changed:
- **Elimination closed:** four teeth of four kinds let a child place the fourth without reading. Each zipper now has **5 teeth**, every kind at least once and one kind doubled — a different kind in each zipper (tales: both / Bear only / neither; animals: varied). Balance re-stated per pass of 15.
- **Two-right-answer teeth fixed:** "Who kept looking until they found it?" was true of Bunny too → "Who searched all alone?"; owl/bat "has big pointy ears" — the library owl has pointed ear tufts → "has fur"; bee/ladybug "has wings" — the ladybug's wings are hidden under its shell → "has feelers"; lion/tiger "has a tail" (unsure on the seated tiger) → "has four legs".
- **beach/wave is cache-only** → Bear's panel 2 is the rain (weather/rainy, "Rain fell and washed it flat."), the tooth "In whose story did it rain?"; label need recorded in §12. The sandcastle story is no longer duplicated in #065.
- Kept the other critic's rename to "#229 Blink Viewer".
