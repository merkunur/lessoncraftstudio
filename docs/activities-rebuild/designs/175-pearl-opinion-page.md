# Row 175 — Pearl's Opinion Page → THE SIGN THAT STANDS ON ITS REASONS (RI.2.8)

## 0. Identity
- **id** `pearl-opinion-page.back-it-up.ri-2-8` (KEPT; slug, page title and intro frozen for en de fr es pt it nl; sv/da/no/fi get new slug, title and intro at build, grade 2) · CCSS RI.2.8 ("describe how reasons support specific points the author makes in a text") · strand Reading: Informational Text · own files `reason-sign-core.js` (new), `pearl-opinion-page-activity.js` (rewritten), html, `pearl-opinion-page-activities.json` (points kept, cards rewritten, two levels added).
- **Frozen promise kept true:** "Pearl the seal writes the opinion page, and every column makes a POINT — 'Our town should build a new park.' Your job: tap the card that BACKS IT UP with a real reason, not a card that just says the same thing again or talks about something else." Pearl is the library `zoo-animals/seal`.
- **Worksheets covered:** none mapped. The design adds the "specific points" half of the standard (Level 2: two points on one page) and "how reasons support" (Level 3: a point stands firm on two reasons).
- **Old activity:** 8 points, three cards each (reason / restatement / off-topic), tap one. **Kept:** all 8 points (one reworded: "We should turn off lights to save power" → "… when we leave a room", because the old point already contained its reason) and every old *reason* idea. **Changed — a measured answer tell removed:** the restatement card carried the point's modal verb (*should* / *sollte* / *devrait* / *debería* / *dovrebbe* / *moet*) in 7 of 8 rounds in en, de, fr, es, nl and 8 of 8 in it, and no reason ever did; the off-topic card shared no word with the point. Choosing "the card without *should* that is about the same thing" solved it unread. New cards (§6): restatements usually drop the modal, off-topic cards share a word with the point, reasons share a word too.

## 1. The pitch
"Pearl's point is a wooden sign lying on the beach — a real reason slides under it as a strong post and lifts it up, saying the point again only stacks a second copy of the sign on top (heavier, still flat on the sand), and an off-topic card plants a post beside the sign that holds nothing up; then the tide comes in, and only a sign standing on its reasons stays dry."

## 2. Why a child will want it again (the fun)
- **A beach sign workshop.** Pearl (library seal, 96 px) has painted her opinion on a wooden signboard (drawn, 360 × 72, painted letters = the point). It lies flat on the sand at the waterline.
- **Cards become wood.** Tap a card and it flies to the sign and turns into what it really is:
  - a **reason** becomes a sturdy post with the card's words carved down its side — it slides under the sign and lifts it up with a creak;
  - a **restatement** becomes a second painted sign, the same words in a new order, and lands *on top* of the first sign with a heavy *thunk* — two signs, still lying on the sand; matching words glow on both boards;
  - an **off-topic** card becomes a post too, but it plants itself in the sand a little way off, under nothing — a lonely post holding up empty air.
- **THE TIDE.** Press Check and a gentle wave rolls up the beach (drawn blue band, 1.2 s, with foam). A sign up on a reason post stays dry and Pearl claps her flippers; a flat sign gets soaked — its paint runs a little — and the wave pulls it a few pixels before it settles back (it can be fixed). In Level 3, a sign on one post tilts and dips one corner into the water; on two posts it stands level and dry.
- **The earned show:** a dry sign is carried up the beach and hammered into a row of signs on the dunes — Pearl's "opinion page" of the day, growing one sign per round.
- **Free play:** cards can be dropped and pulled back out at any time; the tide button can be pressed with nothing built (the sign gets splashed; Pearl giggles); in the dunes, tap a finished sign and it reads its point and its reasons.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RI.2.8):** tell which sentence gives a reason that supports an author's point, as opposed to restating it or saying something unrelated; match each reason to the specific point it supports when there are two points; see that a point is stronger with more than one reason.
- **Misconception 1 — "saying it again, louder, proves it"** ("A brand-new park is the right plan for our town."). **Push back:** a restatement turns into a second copy of the sign — more sign, no post. The child sees it adds weight but nothing underneath; the tide soaks both.
- **Misconception 2 — "anything about the same place supports it"** ("Our town has a big library next to the bus stop."). **Push back:** it becomes a post planted beside the sign, under nothing; the sign stays on the sand. Same subject words ("our town") are not support.
- **Misconception 3 — a reason supports any point on the page** (Level 2). **Push back:** a reason post only fits under the sign it supports: carry "A helmet protects your head in a crash" to the park sign and the post is the wrong height — it bumps the sign's edge and leans away; under the helmet sign it slots in.
- **Misconception 4 — one reason is the whole argument** (Level 3). **Push back:** one post holds the sign but it tilts — the tide wets the low corner; with two reasons the sign stands level.

## 4. The stage
`layout:'split'` at ≥ 700 px: beach (sign, posts, tide) left (≈ 460 px), card tray + bubble right (≈ 210 px). Stacked below 700.

**At 704 px:**
- **The beach** (450 × 300): sand (warm beige), the waterline along the bottom (blue band 40 px), the signboard lying at mid-height (360 × 72; point text 20 px bold, max 2 lines). Level 2: two smaller signs side by side (210 × 72 each, 17 px text). Under each sign a dashed "post socket" (one in Levels 1–2, two in Level 3).
- **Pearl:** `zoo-animals/seal`, 96 × 96, on the sand at the right.
- **The dunes row** (top of the beach, 450 × 36): tiny finished-sign tokens (drawn rectangles — a record).
- **Card tray** (right): 3 cards (Level 1), 4 cards (Levels 2–3), 200 × 64 each, 16 px text, max 3 lines.
- **Check** under the tray (the tide button: a drawn wave icon + "Check").
- **Task line (EN, 22 px):** Level 1 "Which card backs up Pearl's point?" · Level 2 "Put each reason under the point it backs up." · Level 3 "Find TWO reasons that back up Pearl's point."

**At 360 px:** beach 328 × 260 (sign 300 × 64, 17 px text; Level 2 the two signs stack vertically 300 × 56 each, 15 px text), Pearl 64 px at the beach's right edge, cards 328 × 56 (15 px, ≤ 3 lines) in a column, Check ≈ 690 px on 360 × 740 (Level 2/3 four cards: cards shrink to 52 px; Check ≈ 712); at 320 × 640 the beach is 220 px and cards 48 px, Check ≈ 630.
- **No words on the apparatus** except the point and the card sentences (the content).

## 5. The hand
- **Place a card:** tap a card → it flies to the (first free) socket of the sign and transforms (300 ms): post / copy-sign / lonely post. In Level 2 the child taps a card, then taps the sign it should go under (or drags it there). Tap a placed card → it flies back to the tray and turns back into a card.
- **Check (the tide):** the wave rolls in (1.2 s); the result holds (1 s); the water goes out.
- **Undo:** everything can be moved until Check; after a miss the wet sign stays and the child changes cards.
- **Long-press a card or a sign** → TTS where a voice exists.
- **Keyboard:** Tab through cards; Enter places (Level 2: then ← / → chooses the sign, Enter drops); C checks.
- **Sound:** card whoosh, wood creak (post), heavy *thunk* (copy-sign), soft *tock* (lonely post), wave wash, Pearl's happy bark-clap on success.

## 6. The rounds
Order-only reshuffle per pass; card order from a balanced table rotated per pass. Every point has two reasons (R1, R2), one restatement (S) and one off-topic sentence (O).

**The eight points (EN source; de/fr/es/pt/it/nl points kept, their cards rewritten to the same rules by native authors)**
| id | point | reason R1 | reason R2 | restatement S | off-topic O |
|---|---|---|---|---|---|
| park | Our town should build a new park. | Children in our town have nowhere safe to play. | A park gives families a green place to meet. | A brand-new park is the right plan for our town. | Our town has a big library next to the bus stop. |
| helmet | Everyone should wear a helmet when biking. | A helmet protects your head in a crash. | Falls can happen even on short bike rides. | Wear your helmet every single time you ride. | Bikes come in many bright colours. |
| read | Kids should read for twenty minutes each day. | Reading every day helps your brain grow strong. | Kids learn new words from every book. | Twenty minutes of reading a day is right for kids. | Kids at our school wear blue shirts on Fridays. |
| garden | Our class should grow a garden. | A garden gives us fresh food to eat. | We can watch real seeds grow into food. | A class garden is a great plan for us. | Our class has twenty-two children. |
| water | Students should bring water bottles to school. | Drinking water keeps students healthy and awake. | The water fountain at school is often broken. | Water bottles belong in every school bag. | Students ride a big yellow bus to school every morning. |
| lights | We should turn off lights when we leave a room. | Turning lights off saves electricity. | Lights left on waste money for families. | Lights should go off when nobody is in the room. | Our room has three big windows. |
| dogs | Dogs should be walked every day. | Walking keeps a dog happy and fit. | Dogs need to sniff and explore outside. | A walk every day is right for every dog. | Some dogs have long, curly fur that needs brushing. |
| dishes | Children should help wash the dishes. | It teaches children to care for their home. | The work gets done faster when we all help. | Washing dishes is a job kids should share. | Our dishes are blue and white. |

**Level 1 — Back it up** (8 rounds): one sign; cards R1, S, O (pass 2 and later alternate R2 in place of R1, so both reasons are met).
**Level 2 — Which point?** (8 rounds): two signs; cards = a reason for each sign + the restatement of one + the off-topic of the other.
| # | signs | reasons on the cards | restatement | off-topic |
|---|---|---|---|---|
| 1 | park · helmet | park R1 · helmet R1 | park S | helmet O |
| 2 | read · water | read R1 · water R2 | water S | read O |
| 3 | garden · lights | garden R2 · lights R1 | garden S | lights O |
| 4 | dogs · dishes | dogs R1 · dishes R2 | dishes S | dogs O |
| 5 | park · read | park R2 · read R2 | read S | park O |
| 6 | helmet · garden | helmet R2 · garden R1 | helmet S | garden O |
| 7 | water · dogs | water R1 · dogs R2 | dogs S | water O |
| 8 | lights · dishes | lights R2 · dishes R2 | lights S | dishes O |
Pairs were chosen so that no reason on the cards supports the other sign (gate: reviewer-signed "supports" matrix, every off-diagonal cell false). dishes uses R2 both times because R1 ("care for their home") could be argued for the lights point.
**Level 3 — Two strong legs** (8 rounds): one sign, two sockets; cards R1, R2, S, O; choose the two reasons.

- **Shortcut bots, re-measured by the critic on the cards above (`work-c35/pearl-c35.js`, EN, expected hits with random tie-break, chance 2.67/8):** Level 1 with R1 — longest 1.0, shortest 2.5, most point-words 0.0, fewest 2.5; with R2 — longest 2.0, shortest 3.0, most point-words 0.0, fewest 4.5 (every R2 and O share exactly one point word, so this "bot" is a coin toss between the reason and the off-topic card — it never separates them). **Modal tell:** the designer's restatements still carried a modal or modal-like *need/must* in 5 of 8 (park "needs", water "needs", dogs "a must", lights, dishes); three were rewritten, so restatements carry *should* in 2/8, reasons 1/8 (dogs R2 "need to sniff"), off-topic 1/8 (dogs O "needs brushing") — the "avoid the modal" bot is right 3.2/8 (R1) and 2.7/8 (R2). The strongest combined bot (drop the card with most point words, then the shortest) lands on the reason 4/8 — the coin-flip floor once restatements are spotted, and spotting a restatement is half the skill. Level 3: choosing 2 of 4 at random is right 1 time in 6; "the two longest" 1/8, "the two shortest" 3/8. Lights R2 was replaced (critic): "Bulbs last longer when they get a rest" is shaky for LED bulbs and shared no word with the point. The gate holds every single bot ≤ 3/8 (the one-point-word coin toss excepted, which it reports) and the combined bot ≤ 4/8 in every locale.
- **Card position — fixed balanced table, rotated +1 per pass:** Level 1 reason slot 2,1,3,3,1,2,1,3 (slots 3/2/3); Level 2 the two reasons occupy slot pairs {1,3},{2,4},{1,2},{3,4},{1,4},{2,3},{1,3},{2,4}; Level 3 the reasons {2,4},{1,3},{1,4},{2,3},{3,4},{1,2},{1,3},{2,4}. Gate: no slot holds a right card in more than 3/8 (Level 1) or 5/8 (Levels 2–3, two right cards per round).

## 7. Check, the misses, the success
- **Check with nothing placed** → no miss; a small wave splashes the bare sign and Pearl giggles. Hint: "Slide a card under the sign first."
- **Miss 1 — what the beach SHOWS (after the tide):**
  - restatement placed → two signs soaked flat; the words that match on both boards glow in pairs. Hint: "That card says the point again. What is a reason WHY?"
  - off-topic placed → the lonely post stands dry by itself while the sign is soaked; the shared words ("our town") glow on the post and the sign, and a dotted line from the post ends in nothing. Hint: "That card is about something else. Which card tells WHY {point-short}?"
  - Level 2 reason under the wrong sign → the post leans against the sign's edge, the sign soaks; the post's key words glow in the colour of the sign they belong to. Hint: "That reason belongs to the other point."
  - Level 3 only one reason → the sign tilts, one corner wet. Hint: "One strong leg! Pearl's point needs one more reason."
- **Miss 2 — the stronger showing:** Pearl reads the point with a "because" bridge: each card is held under the sign one at a time with the word **because** printed between them ("Our town should build a new park — **because** — Our town has a big library…"); the joins that make sense stay lit, the ones that do not fade to grey. Hint: "Read it with 'because'. Which one makes sense?"
- A new placement removes the help until the next Check.
- **Success:** the sign stands on its post(s), the tide rolls in and out, the sign stays dry; Pearl claps; the sign is carried to the dunes. Bubble: Level 1 "Backed up! {point} — because {reason}." (assembled per locale: the point's final full stop is dropped, the reason's first letter is lower-cased unless the locale capitalises that word anyway — de nouns, proper names — and its own full stop ends the line; the bridge word is the locale's main-clause "because" from the table below) · Level 2 "Both points are backed up!" · Level 3 "Standing strong on two reasons: {R1} And {R2}" (each reason as its own sentence).

## 8. Settings (each visibly changes the board at rest)
1. **Level:** Back it up / Which point? / Two strong legs — at rest: one sign with one socket and three cards; two signs and four cards; one sign with two sockets and four cards.
2. **"Because" bridge:** off / on — when on, the word *because* is printed in the gap between the sign and each empty socket at rest (a sentence frame for younger readers: point + because + card).

## 9. Words (EN source; native authors write the other 10)
- title (frozen) "Pearl's Opinion Page" · instruction: "Back up Pearl's point: slide a real reason under the sign. Then let the tide test it."
- task lines: "Which card backs up Pearl's point?" · "Put each reason under the point it backs up." · "Find TWO reasons that back up Pearl's point."
- hints: empty "Slide a card under the sign first." · restate "That card says the point again. What is a reason WHY?" · offtopic "That card is about something else. Which card tells WHY {pointShort}?" · wrongSign "That reason belongs to the other point." · oneLeg "One strong leg! Pearl's point needs one more reason." · miss2 "Read it with 'because'. Which one makes sense?"
- bridge word: "because"
- success: "Backed up! {pointNoStop} — because {reasonLower}" (built as described in §7) · "Both points are backed up!" · "Standing strong on two reasons: {r1} And {r2}"
- settings: "Level" — "Back it up" / "Which point?" / "Two strong legs" · "Because bridge" — "Off" / "On"
- aria: sign "Pearl's point: {point}" · socket "Post place {i}: {empty|card text}" · card "Card: {text}" · tide "Tide check".
- **Card-authoring rules for every locale (the gate checks):** a restatement keeps the point's meaning in new words and drops the modal verb in at least 5 of 8 rounds; every off-topic card shares ≥ 1 content word with its point but gives no reason; every reason gives a cause/benefit and shares a content word with the point in at least 5 of 8 rounds; lengths within a round vary so that no role is longest or shortest more than 3 of 8.
- **Locale traps.** (1) **"because" + word order:** de *weil* sends the verb to the end, so the bridge must not glue *weil* to a main-clause card ("weil Kinder haben keinen …" is wrong) — de uses **"denn"** (keeps main-clause order); nl likewise **"want"** (not *omdat*); sv uses **"för"** (main-clause order; *eftersom* would move sentence adverbs like *inte* in front of the verb and change the card), da/no **"for"** for the same reason (not *fordi*, which moves *ikke*); fi **"koska"** keeps order (Finnish word order does not move after it); capitals after the bridge: de keeps the noun capital ("denn Kinder …", "denn ein Helm …"), every other locale lower-cases the card's first word unless it is a name; fr *parce que*, es *porque*, it *perché*, pt *porque* keep order. The bridge is a separate word, never inserted inside the card. (2) Modal verbs per locale for the gate's restatement check: de *sollt-*, fr *devr-/doit/faut*, es *deber-*, pt *dever-*, it *dovr-/deve*, nl *moet-/zou-*, sv *borde/ska*, da *bør/skal*, no *bør/skal*, fi *pitäisi/kannattaa*. (3) pt already drops the modal in several kept points ("A nossa cidade precisa…") — keep, the rule applies to cards. (4) Commas/semicolons in the success line follow locale typography (fr space before "!" and ":"). (5) Content: walking dogs, bike helmets, reading time are universal; "yellow school bus" is a US image — native authors swap the off-topic detail for a local one (de "Unsere Schule hat einen roten Zaun.").

## 10. Sound off, access, phones
- Legible with the sound off: posts vs copy-signs vs lonely posts are shapes; the tide shows dry vs wet; the "because" bridge is printed; TTS bonus.
- Keyboard §5; aria-live: "The sign is lying on the sand. It got wet." / "The sign stands on one post and tilts."
- Reduced motion: the wave is a still blue band that fades in and out.
- Taps: cards 48–64 px tall, signs ≥ 56 px tall, Check 48 px.
- Pictures: Pearl 96/64 px.
- Check above the fold at 360 × 740 (≤ 712) and 320 × 640 (≈ 630).

## 11. Distinct from
- **Row 117 Marlo's Magnifier (RL.1.3):** tests whether a clue is in the story and proves a trait — evidence for a claim about a character. Here: an author's opinion and what counts as a reason (vs restating), and matching reasons to specific points.
- **Row 88 Equal-Sign Beam, Row 156 Spirit Level** (balances) — here nothing balances; a sign stands on posts and a tide tests it.
- **Siblings:** 173 (main topic), 174 (author's purpose).
- No premium tool covers opinion texts.

## 12. Build plan
- **Core `ReasonSignCore`:** point `{id, text, R1, R2, S, O, supports:{cardId:[pointId…]}}`; round `{level, signs:[pointId…], cards:[{id, role, pointId}]}`; `place(cardId, signIdx)`; `tide(state)` → `{signs:[{dry, tilt, copies, lonelyPosts, leaning}]}`; Level 1/2 dry ⇔ the socket holds a reason of that point; Level 3 dry ⇔ both sockets hold the point's two reasons (one = tilt); `slotTable(level, round, pass)`; `nextTask`.
- **Gate's truth (`verify-reason-sign-core.js`):** independent EN role table; per locale: each round has exactly one (L1) / two (L2, L3) right placements; the supports matrix is diagonal in every Level 2 pair; restatements without the modal ≥ 5/8; off-topic share ≥ 1 content word with the point (8/8); the bots in §6 at or under their thresholds; slot table limits; kept points byte-equal (except the reworded lights point, recorded); the bridge word per locale from the authored table, never a clause-final conjunction (de ≠ *weil*, nl ≠ *omdat*).
- **Mutations (each killed):** restatement holds the sign up · off-topic post planted under the sign · a reason accepted under the wrong sign in L2 · L3 accepts one reason · restatement carries the modal in 8/8 · off-topic shares no word · reason card always slot 1 · tide result before Check · bridge setting has no effect · de bridge = *weil* · nl bridge = *omdat* · sv bridge = *eftersom* · a restatement that keeps "needs/must" in more than 2 of 8 · reshuffle repeats.
- **Pictures:** `zoo-animals/seal` ✓ (white seal pup, sitting, cute; `winter/seal` and `ocean-life/seal` also exist — use one only). **Risks:** native rewriting of 8 × 4 cards in 10 locales; the gate's word-share checks need per-locale stemming (simple suffix strip per locale, reviewer-checked). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — cards that turn into posts or into a heavy copy of the sign, a tide that rolls in and soaks a flat sign, and Pearl clapping when her sign stands dry.
2. **Would a teacher put it on the board?** Yes — "back it up" is literal: a reason holds a point up, repeating it adds nothing underneath, and an off-topic fact stands alone; with two points and two-reason signs it reaches the whole standard.
3. **Would a parent trust it?** Kind, sensible opinions (helmets, reading, gardens), a library seal, no score.
4. **The invention:** the point is a sign on the beach that only a real reason can lift onto a post — a restatement just stacks another copy on top — and the tide shows which signs really stand.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **The modal tell was only half removed:** restatements still carried "needs" / "a must" / "should" in 5 of 8. Three restatements rewritten (park, water, dogs); now *should* sits on 2 restatements, 1 reason and 1 off-topic card, and the avoid-the-modal bot is at chance (re-measured with my own script).
- Lights R2 replaced ("Bulbs last longer when they get a rest" is shaky for LED bulbs and shared no word with the point) by "Lights left on waste money for families."
- Word-order claims checked and kept: de *denn*, nl *want*, sv *för*, da/no *for* are coordinating and keep main-clause order; fi *koska* moves nothing. Added the capital-letter rule for the bridge and the exact assembly of the success line (drop the point's full stop, lower-case the reason except de nouns and names).
- Mutations added for nl *omdat* and sv *eftersom*.
