# Row 79 — The Wobble Museum → THE ABOUT-STRINGS (W.K.2)

## 0. Identity
- id `wobble-museum.catch-drift.w-k-2` (KEPT; slugs, titles and intros frozen for en, de, fr, es, pt, it, nl; sv/da/no/fi slug, title and intro authored new at build, the platform age-range grade names §17.4.2) · grade K · CCSS W.K.2 (informative/explanatory writing: name what you are writing about and supply some information about it) · Writing · own files `about-strings-core.js`, `about-strings-activity.js`, `about-strings-activity.html`, `about-strings-activities.json` (`wobble-museum-activities.json` emptied to `[]`).
- worksheets: none mapped.
- old activity: each "room" showed four sentence labels about one topic; one label had wandered in from another room; tap the one that does not belong. 8 rooms (frogs, the moon, fire trucks, rain, dogs, bees, trees, the body), with `roundsL10n` for de/fr/es/pt/it/nl. **Kept**: Bram the magpie's museum (named in the frozen intro; Bram stays a name only — no drawn bird), the room-per-topic structure, the "true but about something else" drift, the clever traps of the old list (a fact that names the other thing but is about the topic — "Frogs live in ponds"; a drift that shares a word with the topic — "Fire trucks are red / Stop signs are red"; the pronoun fact "They eat bugs"), and the de/fr/es/pt/it/nl sentence banks as the starting point for the new banks. **Changed**: four topics whose drift or topic has no library picture (ponds, stars, fire trucks, stop signs, plants, the body) are re-pointed to pictured neighbours (lakes, the sun, ambulances, bells, flowers, hands) keeping each trap's shape; "Birds nest in trees" (genuinely ambiguous — about trees or about birds?) becomes "Trees give birds a home". **Added**: the writing half of W.K.2 — building the room's page (L2) and naming the topic (L3) — so the child does not only spot a stray, but makes an All-About page.

## 1. The pitch
"Every label in the museum hangs by a string, and the string must go to what the sentence is ABOUT — the drifting fact's string goes out through the door to its own room."

## 2. Why a child will want it again
- **The strings.** Each sentence card hangs on the wall with a loose red string dangling from its corner. The child picks up the string's end and stretches it — it stretches like elastic, following the finger — and hooks it onto a picture: the room's big sign (the frog) or the sign peeking in through the doorway (the lake). Strings twang softly when hooked.
- **The museum comes alive at Check.** Right strings pull tight and their cards straighten with a click; the drifting card, hooked to the doorway sign, is pulled along its string out through the door into the next room, where it swings onto that wall. The museum tidies itself.
- **The page.** When a room is right, its cards fly off the wall onto a big open book on a lectern and become a page: "All about frogs" in big letters, the facts underneath, the frog picture in the corner. A new page each round — at the end of a pass the child flips through the book they made (a little page-turn animation).
- **Bram's stamp**: each finished page gets a museum stamp (a round drawn stamp with a magpie-feather icon — geometry, no drawn bird) pressed onto its corner with a satisfying *thunk*.
- **Free play**: after a room is done, the child can pull any string loose and re-hook it; a long-press on a card reads it aloud (TTS where available).

## 3. The skill and the misconception
- Skill (W.K.2 as kindergarten teachers mean it): an informative piece names its topic and gives facts ABOUT that topic. The precursor skill the instrument trains: deciding what a sentence is about, keeping only on-topic facts on the page (staying on topic), and naming the topic of a set of facts.
- Misconceptions made visible:
  1. **"It mentions the topic word, so it's about the topic" / "It mentions another thing, so it's off topic."** The traps: "Frogs swim in lakes." is about frogs (it names the lake); "Lakes are cold." is about lakes. Push-back at miss 1: every card's **about-word** lights up (the word the sentence tells about), and its string can only pull tight towards the picture of THAT word.
  2. **The pronoun trap.** "They eat bugs." names nothing. Push-back: when its about-word lights, a little arrow runs from "They" to the card that says "Frogs" — the word "they" points back.
  3. **Same feature ≠ same topic.** "Ambulances have a loud siren." / "Bells are loud." share "loud". Push-back: the about-words light "Ambulances" and "Bells" — the shared word stays dark.
  4. **"A true sentence belongs."** The drift is TRUE. The string mechanic never says "wrong" — it says "this belongs to the lake", and the card walks next door: true facts are kept, in the right room.

## 4. The stage
At 704 (layout `split`, stage ≈ 660 × 470):
- **The room (left, 440 × 420)**: a drawn museum wall (#F4E8D4 with a 3 px ink picture rail at y = 40 and a skirting band at the bottom). **The sign**: a gilt frame 168 × 150 centred at the top (drawn frame, 6 px #C99A6B with a 2 px ink edge) holding the topic's library picture at **128 px**, and under the frame a small brass plate with the topic word (content, 20 px Baloo 2, e.g. "Frogs"). Each sign has a **hook** (a drawn 18 px brass hook) under its plate where strings attach.
- **The doorway (right edge of the room, 124 × 300)**: an arched opening cut in the wall, showing a sliver of the next room's wall and **its sign**: a smaller frame 116 × 110 with the other thing's picture at **96 px** (the picture floor; the doorway sign is smaller than the topic sign but never below 96 px at 704 / 64 px on phones), its own plate word (18 px) and hook.
- **The cards** (four hooks on the wall in a 2 × 2 arrangement, each card 190 × 74): drawn paper cards (#FFFDF7, 2 px ink, a slight random tilt of ±2°) with the sentence in 20 px Nunito (two lines max, 26 px line height). From each card's top-left corner hangs a **string end** — a red 3 px line ending in a 30 px round brass ring (the drag handle; tap target 48 px).
- **The lectern (right column, 200 × 420)**: a drawn book on a stand, open to a blank page (shows the page being built; the finished pages stack under it).
- L2: a **cart** (drawn, 440 × 110, at the bottom of the room) holds the cards not yet hung; the wall has 1 card already hung and 3 empty hooks.
- L3: the sign frame is EMPTY (a dashed inner outline); a **sign shelf** (drawn ledge, 440 × 120 at the bottom) holds three sign pictures (library, 96 px each) to drag into the frame; the plate under the frame is blank until a picture is placed (then it shows that picture's word).
- Task line above (≤ 24 px). Check button and bubble under the room.

At 360 (stacked, stage ≈ 336 × 640): sign frame 120 × 104 (picture 88 px) top-left, doorway on the right as a 96 × 150 arch with its sign picture at 64 px; the four cards stacked as a single column (320 × 64 each, sentence 18 px, ring 30 px with a 48 px hit area) under the signs; the lectern collapses to a small book icon (56 px) that opens a full-width page overlay at success. L2's cart becomes a horizontal scroller (cards 220 × 64) under the wall; L3's sign shelf a row of three 72 px pictures. Check at y ≈ 590 at 360 × 740; at 320 × 640 cards are 300 × 60 with 17 px text, signs 80 px / 64 px, Check y ≈ 560.

Library pictures (verified in `mini tools/pictures/*.json`; weather, space, tree, birds-2, vehicles contact sheets seen; the rest re-read at build): forest-creatures/frog, camping/lake, camping/moon, weather/sunny, vehicles/ambulance, christmas/bell, weather/rainy, spring/flower, pets/dog, pets/cat, insects-and-bugs/bee, insects-and-bugs/ant, tree/apple (an apple tree — the "trees" sign), things-that-fly/bird, body-parts/hand, body-parts/foot; L3 third (unrelated) signs: toys/ball, fruits/banana, vehicles/bus, weather/umbrella, kitchen-tools/cup, toys/kite, clothing/shoe, music/drum. The wall, frames, doorway, cards, strings, rings, cart, shelf, lectern and book are drawn apparatus geometry. **Words on the apparatus are only the content**: the sentences, the sign plates (the topic word), the page title.

## 5. The hand
1. **Pick up a string** (pointer down on the brass ring) → the ring lifts (1.2×, shadow) within 50 ms; the string stretches from the card corner to the finger as a gently sagging curve (a quadratic curve whose sag shrinks as it stretches), with a faint creak.
2. **Hook it** onto a sign hook (drop zone 56 px round the hook) → the ring snaps onto the hook (120 ms) with a *twang*; the string stays slack-curved (not judged yet). Drop anywhere else → the ring springs back to the card corner (250 ms elastic). A hooked ring can be lifted off and re-hooked (undo). Keyboard/tap path: tap a card (it lifts slightly and the two hooks pulse), then tap a hook.
3. **L2 cart**: drag a card from the cart onto an empty wall hook (it hangs with a swing, 300 ms) — then its string is free to hook like the others. A card can go back to the cart. Only cards on the wall are judged; the cart may keep cards (the page has room for exactly as many facts as there are hooks — 4).
4. **L3 sign shelf**: drag a sign picture into the empty frame (it drops in with a small bounce; the plate fills with its word). The facts' strings are pre-hooked to the frame's hook in L3 (the facts are given; the question is what to call the room).
5. **Check** (shell) → §7.
- **Free play**: after success the strings can be unhooked and re-hooked for fun (no judging); long-press a card to hear it.

## 6. The rounds
One round = one room. L1: four cards hang (3 about the topic, 1 drift); every card's string must be hooked to the sign of what it is about (topic sign or doorway sign). L2: one card hangs, four wait on the cart (2 about the topic, 2 drifts); the child fills the wall with the facts about the topic (2 more cards: exactly the two topic facts) and sends the drifts' strings to the doorway — or leaves the drifts on the cart (both are right: a drift is "not on this page" either way). L3: three facts hang with strings to the empty frame; the child places the sign picture the facts are about.

Each topic has a bank of 5 facts + 2 drifts (EN below; the trap fact is marked ◆, the pronoun fact ◇, and each sentence's **about-word** is in [brackets] — the about-word is authored per locale, not computed).

| topic (sign) | door (sign) | facts | drifts |
|---|---|---|---|
| frogs (forest-creatures/frog) | lakes (camping/lake) | [Frogs] hop. · ◇[They] eat bugs. · ◆[Frogs] swim in lakes. · [Frogs] lay eggs in water. · A [frog] has long back legs. | [Lakes] are full of water. · [Lakes] have fish in them. |
| the moon (camping/moon) | the sun (weather/sunny) | [The moon] is round. · ◇[It] glows at night. · [The moon] has craters. · [The moon] goes around the Earth. · ◆[The moon] is smaller than the sun. | [The sun] is hot. · [The sun] shines in the day. |
| ambulances (vehicles/ambulance) | bells (christmas/bell) | ◆[Ambulances] have a loud siren. · ◇[They] carry sick people. · [Ambulances] have flashing lights. · [Ambulances] drive to the hospital. · An [ambulance] has a bed inside. | [Bells] are loud. · [Bells] ring. |
| rain (weather/rainy) | flowers (spring/flower) | [Rain] falls from clouds. · ◇[It] makes puddles. · ◆[Rain] helps flowers grow. · [Rain] makes things wet. · [Rain] comes down in drops. | [Flowers] smell sweet. · [Flowers] have petals. |
| dogs (pets/dog) | cats (pets/cat) | [Dogs] bark. · ◇[They] wag their tails. · [Dogs] like to fetch. · [Dogs] can smell very well. · ◆[Dogs] chase cats. | [Cats] say meow. · [Cats] climb trees. |
| bees (insects-and-bugs/bee) | ants (insects-and-bugs/ant) | [Bees] buzz. · [Bees] live in a hive. · ◇[They] make honey. · [Bees] visit flowers. · ◆[Bees] are bigger than ants. | [Ants] live in the dirt. · [Ants] carry crumbs. |
| trees (tree/apple) | birds (things-that-fly/bird) | [Trees] have leaves. · ◇[They] grow very tall. · ◆[Trees] give birds a home. · [Trees] have roots. · Some [trees] grow apples. | [Birds] can fly. · [Birds] lay eggs. |
| hands (body-parts/hand) | feet (body-parts/foot) | A [hand] has five fingers. · ◇[They] can wave hello. · [Hands] can hold a cup. · [Hands] can clap. · ◆[Hands] help put socks on our feet. | [Feet] help us walk. · [Feet] go into socks and shoes. |

Every sentence in every bank has its about-thing as its grammatical SUBJECT (the first draft's hands row had "We wash our hands" / "We put socks on our feet", whose subject is "we" — a child could fairly say they are about us, or about socks; rewritten). The hands row's ◇ card "They can wave hello." points back to "hands"; its ◆ trap names the feet and shares "socks" with the second drift, but is about what hands do.

**Level 1 — Catch the drift** (8 rounds, one per topic): the wall shows the first fact of the bank (a namer), the pronoun card ◇, the trap ◆ and drift #1. The pronoun card is always placed after a namer in reading order (rows left→right, top→bottom), so its "they" has a card to point back to.

**Level 2 — Make the page** (8 rounds, one per topic): the wall hangs one namer fact that L1 did not use; the cart holds the trap ◆, one more namer fact (never the pronoun card — on a cart it has nobody to point back to) and drifts #1 and #2, in shuffled cart order. Right = the wall's hooks hold exactly the two topic facts from the cart with their strings to the topic sign; a drift hung on the wall must have its string to the doorway sign (it then walks out at Check) — a drift left on the cart is equally right.

**Level 3 — Name the room** (8 rounds, one per topic): three **mystery facts** hang — all three say "They" / "It" and never the topic word, so the child must decide what they are about from what they SAY (W.K.2's "name what you are writing about"), not by matching a word to a plate. The sign shelf holds the topic picture, the door picture and one unrelated picture (from the L3 list, dealt), in shuffled order. Right = the topic picture in the frame. Each set is built so the door picture fits AT MOST ONE fact (a near-miss that tempts) and only the topic fits all three:

| topic | mystery facts (EN) | the door picture fits |
|---|---|---|
| frogs | They hop. · They eat bugs. · They have long back legs. | none (lakes do none of it) |
| the moon | It is round. · It shines at night. · It has craters. | "round" (the sun) |
| ambulances | They have a loud siren. · They carry sick people. · They have flashing lights. | "loud" (bells are loud, but have no siren) |
| rain | It falls from clouds. · It makes puddles. · It comes down in drops. | none |
| dogs | They bark. · They wag their tails. · They like to fetch. | none (cats do not bark or fetch) |
| bees | They buzz. · They make honey. · They live in a hive. | none |
| trees | They have leaves. · They have roots. · They grow very tall. | none |
| hands | They have five fingers each. · They can clap. · They can hold a cup. | none (feet have toes, not fingers) |

The frame's plate word appears only when a picture is in it; at success it reads the topic and the three cards' "They/It" each get their dotted arrow to the plate.

- **One right answer per round**: L1 — the drift is the only card whose about-word is the door thing (gate checks the authored about-words in all 11 locales); L2 — the topic facts are exactly the two on the cart whose about-word is the topic; L3 — exactly one shelf picture is the about-thing of all three facts.
- **Answer position**: L1 — the drift's hook is dealt so that over a pass it sits on each of the 4 hooks exactly twice (8 rounds); the trap is never on the same hook as the drift in consecutive rounds. L2 — the two topic facts' cart positions are a uniformly random pair. L3 — the topic picture's shelf slot is balanced over a pass (3 slots: 3/3/2). **Gate**: over 2,000 passes P(drift on hook h) = 0.25 ± 0.03; P(topic in shelf slot s) = 0.33 ± 0.04.
- **Order**: order-only reshuffle of the 8 topics per pass, never the same order twice in a row.

## 7. Check, the misses, the success
- **Check with a string not hooked** (L1/L2: any wall card's string loose; L3: frame empty) → no miss; the loose rings wiggle (or the frame pulses); bubble: "Every card needs its string on a picture."
- **Miss 1** → every card's **about-word** lights up (a soft gold highlighter band behind the word, 300 ms), and every wrongly hooked string goes slack with a little shiver (its ring stays on the hook). For a pronoun card the highlight on "They/It" sends a little dotted arrow to the about-word of the card it points back to. In L3 a wrong sign makes the strings of every fact that does NOT fit that picture sag (the door picture's one near-miss fact stays taut — so the child sees two of three facts refuse it), and those facts' key words ("craters", "siren", "bark") light up. Bubble: "Look at the shining words — that is what each card is about."
- **Miss 2** → the stronger showing: each wrongly hooked ring is lifted off and floats beside the right hook, wobbling; the right hook glows. In L3 the topic picture on the shelf lifts 6 px. Bubble: "This string wants to go here."
- A new move clears the highlights and the floating rings (help taken away until the next Check).
- **Success** → right strings pull taut (each card straightens with a click, 150 ms staggered); in L1/L2 the drift card slides along its string out through the doorway (500 ms) and swings onto the next room's wall; then the room's topic cards fly onto the lectern's open book (400 ms each) and the page builds: title "All about {topicPlural}", the facts in the page's order (the ◇ pronoun fact always directly after a fact that names the topic), the sign picture in the corner; Bram's stamp thunks onto the page corner. Bubble: "Your page is all about {topic}! The {doorThing} card went to its own room." (L1/L2) · "Yes — every fact is about {topic}. Your page is called All about {topicPlural}." (L3).
- End of pass: the book shows all the pages with a page-turn flip (1.2 s), "My All-About Book".

## 8. Settings (each visibly changes the board at rest)
1. **Words that help**: off (default) · on — the about-word of every card is underlined faintly from the start (a scaffold for children still learning to read; visible at rest as underlines). With "on", miss 1 highlights only the wrongly-hooked cards' about-words.
2. **Cards**: 4 (default) · 3 — L1 shows 2 facts + 1 drift (the trap fact stays), L2 shows 1 hung fact + 3 on the cart (◆, one drift, #5 removed) — the wall shows 3 or 4 hooks.
Level picker (shell): Catch the drift · Make the page · Name the room.

## 9. Words (EN source)
- title (frozen): The Wobble Museum — Stick to the Topic (Kindergarten Writing)
- instruction: "Every card hangs by a string. Hook each string to what the card is about."
- task lines: L1 "Hook each card's string to what it is about." · L2 "Make the page about {topicPlural}: hang the facts that belong." · L3 "Who or what are these cards about? Put the right picture in the frame."
- page title template: "All about {topicPlural}" · end of pass: "My All-About Book"
- hints and celebrations: §7.
- sentences: the bank above (EN); de/fr/es/pt/it/nl adapted from the old `roundsL10n` where the topic is unchanged (frogs/moon/rain/dogs/bees/trees rows keep their old sentences, re-pointed where ponds/stars/plants/fire trucks changed), sv/da/no/fi authored new.
- settings labels: "Words that help" — "off" / "on"; "Cards" — "4" / "3"; levels as above.

**Locale traps**:
- **Pronoun gender and number**: "They eat bugs" → fr *Elles mangent des insectes* (les grenouilles f.), es *Comen insectos* (pro-drop! the pronoun is GONE — the es/it/pt pronoun card's about-word is the verb ending; author it as the verb and let the dotted arrow run from the verb), it *Mangiano insetti*, pt *Comem insetos*; de *Sie fressen Insekten* (animals *fressen*, people *essen*), nl *Ze eten insecten*, sv *De äter insekter*, fi *Ne syövät hyönteisiä* (fi uses *ne* for animals, *he* for people). "It glows at night" → de *Er leuchtet* (der Mond m.), fr *Elle brille* (la lune f.), es *Brilla* (pro-drop), fi *Se loistaa*.
- **The about-word is authored per locale** as a character range — in compound languages the topic hides inside words (de *Bienenstock* contains *Biene* but is not the about-word; fi cases: *kuussa*, *kuulla* — the about-word is the inflected form as written).
- **Trap shape must survive translation**: the shared word ("loud", "socks", "lakes") must stay shared in each locale (de *laut / laut*, fr *bruyant(e)s* — both cards must use the same adjective, agreement aside), and the ◆ fact must still NAME the door thing.
- **Facts must stay TRUE in each locale's culture** (fr ambulances are often white/yellow, so no colour facts; "Some trees grow apples" fine everywhere). The moon "glows" — da *lyser*, sv *lyser*, fine; scientifically it reflects sunlight; K-level "glows/shines at night" is accepted school language (the reviewer may prefer "shines").
- **Plurals for the page title**: "All about frogs" → de *Alles über Frösche*, fr *Tout sur les grenouilles*, es *Todo sobre las ranas*, fi *Kaikki sammakoista* (elative plural), sv *Allt om grodor*. Authored per topic per locale.
- **"Ambulances drive to the hospital"** — es-MX *ambulancias*; "hospital" universal.
- TTS on long-press only; nothing needs sound.

## 10. Sound off, access, phones
- Sound off: hooks, taut/slack strings, lit about-words, the card walking out of the door and the page building carry everything.
- Keyboard: Tab to a card (focus ring on the card), Enter "picks up" its string (the hooks highlight), Left/Right choose a hook, Enter hooks; L2 cart: Enter on a cart card hangs it on the next empty hook; L3: Tab to a shelf picture, Enter places it.
- aria: each card `aria-label="{sentence}, string on {picture word | nothing}"`; hooks `aria-label="{word} sign"`; live region announces the drift's walk and the page title.
- Taps: string rings 48 px hit area, cards ≥ 60 px tall, shelf pictures 96/72 px.
- Pictures: topic sign 128 px at 704 / 88 px at 360; doorway sign 96 px / 64 px.
- Check above the fold: y ≈ 590 at 360 × 740; y ≈ 560 at 320 × 640.

## 11. Distinct from
- **#4 Constellation Thread** (thread stars in counting order): an ordering line through points. Here a string is a relation from a sentence to its subject — no order, no path, and the string's pull is the judgement.
- **story-line** tool (peg story beats in order on a clothesline): sequence. **reading-easel**: phrasing. Neither judges what a sentence is about.
- **wodb** (which one doesn't belong — every answer defensible): the drift here has one right answer, decided by the authored about-word, and is kept (sent to its room), never discarded.
- Designed registry: 217 Article Caps, 218 Word Ribbon, 73 Writing Carriage — letter/word mechanics, not topic. No built invention reused.

## 12. Build plan
- **Core** `AboutStringsCore`: `state = { round, level, hooks: {cardId: signId|null}, wall: [cardId] (L2), frame: pictureId|null (L3), misses }`. Data per card `{id, text, aboutSign: 'topic'|'door', aboutSpan:[start,end], pointsTo?: cardId}` per locale. Functions: `isComplete(state)`, `check(state)` → `{wrongStrings:[cardId], drift:[cardId], frameRight}`; L2 `wallRight` = wall cards ⊇ the two topic facts and every drift on the wall hooked to the door; L3 `frameRight` = frame = topic picture; `deal(rng)` under the hook/slot balance and the pronoun-after-namer rule; `pageOrder(cards)` places a pronoun card directly after a namer.
- **Gate's own ground truth** (`verify-about-strings-core.js`): the topic/door membership of every sentence re-read from the bank as literals; assert (a) each L1 round has exactly one drift; (b) every ◆ trap names the door thing in the text of every locale (substring of the door word stem, authored list) and is about the topic; (c) every ◇ pronoun card is placed after a namer in every deal; (d) the about-span of every card in every locale is a non-empty substring of its text and, for namers, contains the topic or door noun stem; (e) L2 accepts drift-on-cart and drift-on-wall-to-door, rejects drift-to-topic and topic-fact-to-door; (f) L3: no mystery fact contains the topic noun (per locale, authored stem list); a per-picture truth table (written in the gate) shows the topic picture satisfies all three facts, the door picture at most one, the unrelated picture none — so exactly one shelf picture is right; (g) balance stats (§6); (h) picture keys exist, no B&W theme; (i) every page title exists per topic per locale.
- **Mutations**: drift hooked to topic accepted · trap fact judged by "mentions the door word" instead of the about-word · pronoun card placed first (no namer before it) · L2 drift left on the cart rejected · L2 topic fact on the cart accepted as complete · L3 door picture accepted · L3 mystery fact containing the topic word (word-matching would solve it) · about-word highlight lights the wrong span · Check with a loose string counts a miss · help persists after a new move · drift hook always the last hook.
- **Pictures to verify on a contact sheet at build**: forest-creatures/frog, camping/lake (must read as a lake, not a pond scene with a frog in it — if a frog is in the picture, swap to beach/water and re-word "lakes" → "the sea"), insects-and-bugs/bee + ant, pets/dog + cat, christmas/bell, spring/flower, things-that-fly/bird, body-parts/hand + foot, tree/apple (labelled "apple" in the vocab — the plate word is authored "Trees", never read from the vocab), weather/rainy, weather/sunny (a smiling sun — acceptable as "the sun").
- **Risks**: (1) the about-word for pronoun and pro-drop locales (es/it/pt) — authored and gated; (2) children hooking every string to the big sign by habit — the gate's "all strings to topic" bot fails every L1 round by construction; (3) the stretchy string performance on phones (a single SVG path per string, updated on pointermove with rAF).
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — stretchy strings that twang onto hooks, a card that gets pulled out through a door into the next room, and a book that fills with their own pages.
2. **Would a teacher put it on the board?** Yes — "what is this sentence about?" is exactly the conversation of an All-About book mini-lesson; the traps (a fact that names another thing, a shared adjective, "they") are the real reasons children go off topic, and the help shows the about-word rather than marking a cross. L2 and L3 add the writing moves: choose the facts, name the topic.
3. **Would a parent trust it?** Calm, library pictures, true facts, no score.
4. **The invention in one sentence:** every sentence card hangs by a string that has to be hooked to what the sentence is about — and the off-topic fact's string pulls it out through the door into its own room.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- **Every off-topic card is now unambiguous.** Rule written into the bank: the about-thing is always the sentence's grammatical subject. The hands row broke it ("We wash our hands", "We put socks on our feet" — about us? about socks?) and was rewritten; "Lakes are cold" (not reliably true) became "Lakes are full of water". Each trap still names the door thing and each drift is plainly about the door thing.
- **L3 now trains the real skill.** The old L3 facts contained the topic word, so the child only matched a word to a plate. L3 facts are now three "They/It" mystery facts per topic with the door picture fitting at most one (round moon vs sun, loud siren vs bells) — naming the topic from what the facts say, the W.K.2 move. Gate + mutation added.
- Picture floor: topic sign 128 px and doorway sign 96 px at 704 (the doorway sign was 72 px, under the floor).
- Moon picture switched to camping/moon (seen on its contact sheet; the space theme is ruled unreliable). Lake confirmed as a lake scene with no frog in it.
