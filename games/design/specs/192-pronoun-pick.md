# 192 — Who Is It

## Identity
- Slug: `pronoun-pick`
- Subject / topic: Literacy / subject pronouns — choosing the pronoun that stands for a pictured referent (one person, one thing or animal, or a group) to complete the second of two sentences
- Age band: `8-9`
- Interaction pattern: `P1` — tap one of N (three pronoun tiles; the picture's referent is the enacted hint)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the pronoun SYSTEM is market-conditional grammar (F-22: explicit grammar terms from 8 in EN/FR/DE/ES/IT, NL at 8, later in FI/SE/DK/NO/BR): which pronoun a picture takes differs per language (English "it" for an animal; German "es" for a girl via "das Mädchen"; French has no "it"; Finnish "hän" for both he and she; Spanish and Portuguese often omit the subject pronoun). The pronoun tiles AND the items are stored in `LOCALE_DATA`; English is authored in full, the other ten locales carry their tile set here and are declared as needing a native item set (en pilot). The on-screen prompt is a PICTURE of the referent(s) plus two short sentences; the word "pronoun" never appears anywhere the child can see.

## Learning
- Objective: Reads a two-sentence text whose second sentence has a gap, looks at the picture of what the text is about, and taps the pronoun that stands for that pictured referent (its gender and number, in the play language) among three.
- Prerequisites: Reads sentences of up to 8 words (games 074-080); answers who / what questions about a two-line text (game 080).
- Curriculum links: F-22 (sentence conventions and explicit grammar terms from 8 in EN/FR/DE/ES/IT/NL — the reason this is an 8-9 game), F-31 row "Read short text; retell/sequence; simple inference" → 8-9 (US L.1.1.d "use personal … pronouns", L.2.1, L.3.1.a; England Y2-Y3 "pronouns for cohesion"; Germany Klasse 3 "Personalpronomen"; France CE1-CE2 "les pronoms personnels sujets"; Netherlands groep 5 "persoonlijk voornaamwoord"; Spain 2º ciclo "los pronombres personales"; Italy classe terza "i pronomi personali"; Brazil EF03LP; Sweden åk 1-3 "ordklasser" as an introduction; Finland 3. luokka "persoonapronominit"). F-6 notes grammar is a niche game genre; this is the catalogue's one pronoun game.
- Common misconceptions (F-129, F-128), each with this game's response:
  1. **Recency — the pronoun stands for the LAST noun mentioned ("The boy has a cat. ___ likes the cat." → "It").** Response: after a wrong tap the referent in the PICTURE is ringed (`ART.referentRing`, `ANIM.markIn`) and the matching noun in sentence 1 is underlined (`ART.wordMark`) for 1200 ms — the picture and the text point at the same thing; L3 items are built so the referent is never the last noun.
  2. **Gender by association (a cat is "she" because it is soft; a dog is "he") — in English animals and things are "it".** Response: the tapped tile nudges and the picture's referent is ringed together with its kind badge (`ART.kindBadge`: a small card under the picture showing the picture's own class glyph from ART — one person, one thing, a group); the child re-reads and chooses again.
  3. **Number — "it" for a group, "they" for one thing (does not count the referents).** Response: on a wrong tap each referent in the picture gets a numeral badge (`ART.countBadge` 1, 2, 3 …, `tone("tap", k)`), so "how many" is written on the picture, and the number word in sentence 2's verb ("are" / "is") is underlined.
  4. **Position habit / brute force.** Response: the correct tile's slot shuffles and never repeats twice running (§13); after a wrong tap the tiles re-shuffle; an item solved after a wrong tap is never first-try; the third wrong tap gets the show-me ring (F-65).
  5. **Transferring English pronoun rules to another language ("it" for a German girl).** Response: structural — every locale's tile set and every item's answer are native-authored in `LOCALE_DATA`; the game never maps an English answer onto another language.

## How it plays
1. **Start screen**: title "Who Is It", the panda (`ART.panda`) at (360, 200), Start, picker.
2. **Item 1 (L1: picture = a girl with a balloon; text "The girl has a balloon. ___ is happy.")**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the picture card (`ART.pictureCard`, 200 × 150) at (130, 160) showing the referent picture at 72 px (`ART.picGirl` at (110, 150)) and the prop at 40 px (`ART.picBalloon` at (176, 130)); the text card (`ART.textCard`, 420 × 110) at (470, 160) with sentence 1 at y = 140 and sentence 2 at y = 180, 24 px `THEME.font.body` `THEME.colour.ink`, left-aligned from x = 280; the gap in sentence 2 is a dashed box (`ART.gapBox`, 90 × 34) at the start of the line. The panda sits at (640, 60) at 44 px. Zone B: three pronoun tiles (`ART.pronounTile`, 150 × 90, word 32 px) at y = 380, x = 190 / 360 / 530, showing She / He / It, shuffled. Caption: none (the gap is the prompt).
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop; the pronoun word glides (`ANIM.glide`) into the gap box and the box turns solid; the referent in the picture is ringed (`ART.referentRing`) and its noun underlined in sentence 1 — the link is shown, not just rewarded; the panda `ANIM.nod`; rail dot fills; next item after 900 ms (`ANIM.appear`).
   - **Wrong (any)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects; then the cue for the error class (Learning 1-3): the referent ring + noun underline for recency; the ring + kind badge for a gender-by-association pick; the numeral badges + verb underline for a number pick; tiles re-shuffle (`ANIM.glide`). Attempt 2.
   - **Second wrong tap**: the cue again; attempt 3 with the show-me ring (`ART.showRing`, `ANIM.showMe`) on the correct tile; tapping it completes the item as solved-with-help.
4. **Items 2-12**: per Content/Rules. L1 one referent (a person → she/he; a thing or animal → it); L2 groups (they) mixed with single referents, the tiles being It / They / She or He; L3 two nouns in sentence 1 where the gap refers to the FIRST noun (recency trap) and mixed number.
5. **Re-queue** (F-41): an item wrong first-try re-enters after 2 intervening items with re-shuffled tiles; the count stays 12.
6. **Finish**: `t("all_done")` (360, 110); the panda (360, 200) `ANIM.celebrate`; the summary = the twelve items as chips (`ART.answerChip`, 150 × 40: the referent picture 24 px on the left, the chosen pronoun 18 px on the right) in three rows of four from y = 320 (x = 135 + i × 150), with `ART.dotFull` at the chip's left for first-try items and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  panda:        { kind: "emoji", value: "🐼", size: 80 },                    // mascot
  pictureCard:  { kind: "shape", shape: "roundRect", w: 200, h: 150, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  textCard:     { kind: "shape", shape: "roundRect", w: 420, h: 110, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  gapBox:       { kind: "shape", shape: "roundRect", w: 90, h: 34, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },   // dashed (lineDash [6,4]); solid structure stroke once filled
  wordMark:     { kind: "shape", shape: "rect", w: 40, h: 4, fill: "accent" },                             // width = the word's width at runtime
  referentRing: { kind: "shape", shape: "circle", r: 44, stroke: "accent", strokeWidth: 4 },
  kindBadge:    { kind: "shape", shape: "roundRect", w: 44, h: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },   // holds ART.kindPerson / kindThing / kindGroup at 20 px
  kindPerson:   { kind: "emoji", value: "🧍", size: 20 },                    // one person (Unicode 12)
  kindThing:    { kind: "emoji", value: "📦", size: 20 },                    // one thing / animal
  kindGroup:    { kind: "emoji", value: "👥", size: 20 },                    // a group
  countBadge:   { kind: "shape", shape: "circle", r: 13, fill: "structure" },  // numeral 16 px display, color bg
  pronounTile:  { kind: "shape", shape: "roundRect", w: 150, h: 90, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // word 32 px display ink
  showRing:     { kind: "shape", shape: "roundRect", w: 162, h: 102, stroke: "structure", strokeWidth: 4, radius: 18 },
  answerChip:   { kind: "shape", shape: "roundRect", w: 150, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // referents — people (no names are ever shown; the text calls them "the girl", "the boy", "the man", "the woman")
  picGirl:      { kind: "emoji", value: "👧", size: 72 },   // girl
  picBoy:       { kind: "emoji", value: "👦", size: 72 },   // boy
  picWoman:     { kind: "emoji", value: "👩", size: 72 },   // woman
  picMan:       { kind: "emoji", value: "👨", size: 72 },   // man
  picGrandma:   { kind: "emoji", value: "👵", size: 72 },   // grandmother
  picGrandpa:   { kind: "emoji", value: "👴", size: 72 },   // grandfather
  picTwoKids:   { kind: "emoji", value: "👫", size: 72 },   // two children (a group)
  picTwoGirls:  { kind: "emoji", value: "👭", size: 72 },   // two girls
  picTwoBoys:   { kind: "emoji", value: "👬", size: 72 },   // two boys
  // referents — things and animals
  picCat:       { kind: "emoji", value: "🐱", size: 72 },   // cat
  picDog:       { kind: "emoji", value: "🐶", size: 72 },   // dog
  picBird:      { kind: "emoji", value: "🐦", size: 72 },   // bird
  picFish:      { kind: "emoji", value: "🐟", size: 72 },   // fish
  picBall:      { kind: "emoji", value: "⚽", size: 72 },   // ball
  picApple:     { kind: "emoji", value: "🍎", size: 72 },   // apple
  picBook:      { kind: "emoji", value: "📕", size: 72 },   // book
  picBike:      { kind: "emoji", value: "🚲", size: 72 },   // bike
  picTree:      { kind: "emoji", value: "🌳", size: 72 },   // tree
  picBus:       { kind: "emoji", value: "🚌", size: 72 },   // bus
  // props (drawn small beside a referent; never the referent)
  picBalloon:   { kind: "emoji", value: "🎈", size: 40 },   // balloon
  picGift:      { kind: "emoji", value: "🎁", size: 40 },   // gift
  picUmbrella:  { kind: "emoji", value: "☂️", size: 40 },   // umbrella
  picIceCream:  { kind: "emoji", value: "🍦", size: 40 },   // ice cream
  picBone:      { kind: "emoji", value: "🦴", size: 40 }    // bone (Unicode 11)
};
```
The group pictures are the two-person emoji (each is ONE glyph showing two people); a group of three or more is drawn as two copies of a single-person or animal glyph side by side (see Content). `kindPerson` is Unicode 12 (2019), inside the limit; no fallbacks needed.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "pronoun word into the gap box; tiles re-shuffling after a wrong tap (x,y at call)" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "referentRing, wordMark, kindBadge, countBadges (from alpha 0)" },
  nod:       { y: "-=8", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "panda on correct" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new picture, text and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish panda" }
};
```
Implementation note: each sentence is drawn as one text object per WORD (24 px, 8 px word gaps) so `ART.wordMark` can sit under one word; the gap box replaces word 0 of sentence 2 and the chosen pronoun is drawn into it at 24 px `THEME.colour.structure`.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌──────────┐  ┌────────────────────────────────┐  panda     │
      │  │ girl +bal│  │ The girl has a balloon.   y=140 │ (640,60)   │  zone A
      │  │ (130,160)│  │ [___] is happy.           y=180 │            │
      │  └──────────┘  └────────────────────────────────┘ (470,160)  │
      │   200×150             420×110                                │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌────────┐     ┌────────┐     ┌────────┐   tiles y=380   │  zone B
      │      │  She   │     │   He   │     │   It   │   x=190/360/530 │
      │      └────────┘     └────────┘     └────────┘   (150×90)      │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. ("bal" in the diagram stands for `ART.picBalloon` beside the referent.)

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.pictureCard` at (130, 160): a single referent at (110, 150) at 72 px with its prop at (176, 130) at 40 px; a two-glyph group = two referent glyphs at 56 px at (95, 150) and (165, 150); `ART.kindBadge` at (130, 220) under the card during a cue with the class glyph (`ART.kindPerson` / `ART.kindThing` / `ART.kindGroup`) centred on it; `ART.countBadge` at each referent's (+26, −26) during a number cue, numeral 16 px `THEME.font.display` `THEME.colour.bg`.
- `ART.textCard` at (470, 160); sentence 1 at y = 140, sentence 2 at y = 180, from x = 280, 24 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 390 (8 English words ≈ 300 px; a 1.6× locale fits; a line that still wraps drops to 20 px — never a third line); `ART.gapBox` at the start of sentence 2 (its centre at (325, 180)); `ART.wordMark` 4 px under a word; `ART.referentRing` centred on the referent glyph.
- Tiles: `makeTile` 150 × 90 with `ART.pronounTile` tokens; the pronoun at 32 px `THEME.font.display` `THEME.colour.ink` (fit-to-width shrink for long forms). `ART.showRing` behind the correct tile. `ART.panda` at (640, 60) at 44 px.
- Tap floors: tiles 150 × 90 (≥ 56); gaps 20. During a cue (≤ 1.5 s) tiles are `setEnabled(false)`.
- Keyboard: Tab across the three tiles; Enter taps.

## Content
Both the tile set and the items are language-bound. `LOCALE_DATA[lang]` = `{ tiles: [...], items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ pic: [<ART key>, ...], prop: <ART key> | null, s1: "…", s2: "___ …", answer: "She", distractors: ["He", "It"], referentIndex: 0, nounIndex: 1, verbIndex: 1, kind: "person" | "thing" | "group", count: 1 }`. `referentIndex` names which picture glyph is ringed; `nounIndex` the word in s1 to underline; `verbIndex` the word in s2 (after the gap) underlined on a number error. Every distractor is a real pronoun tile of the same locale.

**Tile sets per locale** (the subject pronouns a child of 8-9 meets in that language; a native author confirms before ship):
| lang | tiles | note |
|---|---|---|
| en | She · He · It · They | it = things and animals |
| de | Sie · Er · Es · Sie (pl.) | es for "das Mädchen"; the plural "Sie" tile is shown with a small `ART.kindGroup` glyph so the two Sie are told apart |
| fr | Elle · Il · Ils · Elles | no "it": things take il/elle by noun gender |
| it | Lei · Lui · Loro | things usually take no pronoun; author items where a pronoun is natural |
| es | Ella · Él · Ellos · Ellas | the subject pronoun is often dropped; author s2 so it is natural to say it |
| pt | Ela · Ele · Eles · Elas | as es |
| nl | Zij · Hij · Het · Ze | het for "het meisje" and neuter things |
| sv | Hon · Han · Den · Det · De | den / det by noun gender; de for groups |
| da | Hun · Han · Den · Det · De | as sv |
| no | Hun · Han · Den · Det · De | as sv |
| fi | Hän · Se · He · Ne | hän = he and she; se = an animal or thing; he = people; ne = things |
Three tiles are shown per item (the answer + 2 distractors from the set).

**en** (authored in full; "the girl / the boy / the man / the woman / the grandmother / the grandfather" — never names):
- **L1** (one referent; tiles She / He / It):
  1. `ART.picGirl` + `ART.picBalloon` — The girl has a balloon. ___ is happy. → She [He, It]
  2. `ART.picBoy` + `ART.picIceCream` — The boy eats an ice cream. ___ is cold. → He [She, It]
  3. `ART.picDog` + `ART.picBone` — The dog has a bone. ___ is hungry. → It [He, She]
  4. `ART.picWoman` + `ART.picUmbrella` — The woman opens an umbrella. ___ is dry. → She [He, It]
  5. `ART.picBall` — The ball is red. ___ is round. → It [He, They]
  6. `ART.picMan` + `ART.picGift` — The man holds a gift. ___ smiles. → He [She, It]
  7. `ART.picCat` — The cat sits on the mat. ___ is asleep. → It [She, He]
  8. `ART.picGrandma` + `ART.picBook` — The grandmother reads a book. ___ likes it. → She [He, It]
- **L2** (groups and single referents; tiles It / They / She or He):
  9. `ART.picTwoKids` — The children run. ___ are fast. → They [It, She] (count 2)
  10. `ART.picDog`, `ART.picDog` — The dogs bark. ___ are loud. → They [It, He] (count 2)
  11. `ART.picBike` — The bike is blue. ___ is new. → It [They, He]
  12. `ART.picTwoGirls` — The girls sing. ___ are happy. → They [She, It] (count 2)
  13. `ART.picGrandpa` + `ART.picUmbrella` — The grandfather has an umbrella. ___ is dry. → He [They, It]
  14. `ART.picApple`, `ART.picApple`, `ART.picApple` — The apples are red. ___ are sweet. → They [It, She] (count 3; three glyphs at 48 px)
  15. `ART.picBird` — The bird sings. ___ is loud. → It [They, He]
  16. `ART.picTwoBoys` — The boys play. ___ are tired. → They [He, It] (count 2)
- **L3** (two nouns in sentence 1; the gap refers to the FIRST — `referentIndex` 0):
  17. `ART.picBoy`, `ART.picCat` — The boy has a cat. ___ likes the cat. → He [It, She]
  18. `ART.picGirl`, `ART.picDog` — The girl feeds the dog. ___ is kind. → She [It, He]
  19. `ART.picCat`, `ART.picFish` — The cat looks at the fish. ___ is hungry. → It [They, She]
  20. `ART.picTwoKids`, `ART.picTree` — The children climb the tree. ___ are brave. → They [It, He]
  21. `ART.picWoman`, `ART.picBus` — The woman waits for the bus. ___ is late. → She [It, They]
  22. `ART.picDog`, `ART.picBoy` — The dog runs to the boy. ___ wags its tail. → It [He, They]
  23. `ART.picTwoGirls`, `ART.picBook` — The girls read a book. ___ are quiet. → They [It, She]
  24. `ART.picMan`, `ART.picDog`, `ART.picDog` — The man walks two dogs. ___ is strong. → He [They, It]
- Every sentence is ≤ 8 words. In L3 the picture shows BOTH nouns; the ring names the first.

**Other locales: a native item set is required — en pilot** (`LOCALE_DATA[lang].items = "en"` until then; the tiles table above is used as soon as items exist). Author's rules: the answer is the locale's own pronoun for the PICTURED referent (de "das Mädchen" → Es is a deliberate L3 item; fi never distinguishes he/she, so fi L1 contrasts Hän / Se / He instead); es/pt/it sentences must be ones where the pronoun is naturally spoken; keep each sentence ≤ 8 words.

Play list: 12 items per Rules, shuffled within level, no item repeats except by re-queue; the correct tile's slot never repeats twice running.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try item, the word glides into the gap, `ART.referentRing` + `ART.wordMark` on the noun, panda `ANIM.nod`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")` and the tiles re-shuffle):
  - Recency (the pronoun for the LAST noun): the referent ring on the pictured referent + the underline under the first noun in sentence 1, 1200 ms.
  - Gender by association (He/She for a thing or animal, or It for a person): the referent ring + `ART.kindBadge` showing the class glyph, 1200 ms.
  - Number (It for a group, They for one): `ART.countBadge`s on every referent glyph with `tone("tap", k)` + the underline under the verb in sentence 2, 1200 ms.
  - Second wrong tap: the cue again; then the show-me ring on the correct tile.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4; the item re-queues later.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Who Is It". The sentences and pronoun tiles are content from `LOCALE_DATA`, not UI strings; no grammar term is shown anywhere.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap", k)` per numeral badge during a number cue; `tone("finish")` once. Silent under `?sound=off`. The text is never read aloud.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=de` shows Sie / Er / Es tiles as soon as a German item set exists and the English items until then, without crashing).
- [ ] Works at narrow width (400-px iframe: picture card, both sentences with the gap box, and three tiles visible; no sentence wraps to a third line).
- [ ] Keyboard operable (Tab across the three tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] The word "pronoun" (or any grammar term) never appears on screen.
- [ ] Tapping "It" for "The boy has a cat. ___ likes the cat." rings the boy in the picture and underlines "boy" in the first sentence.
- [ ] Tapping "She" for the cat item rings the cat and shows the thing badge under the picture.
- [ ] Tapping "It" for "The children run. ___ are fast." puts numeral badges 1 and 2 on the picture with rising notes and underlines "are".
- [ ] Tapping the correct tile glides the word into the gap box, which turns solid.
- [ ] After a wrong tap the tiles come back in a different order; the correct tile is never in the same slot twice running.
- [ ] A missed item comes back two items later.
- [ ] The finish screen shows twelve picture-and-pronoun chips with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
