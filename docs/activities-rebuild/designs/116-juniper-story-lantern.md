# Row 116 — Juniper's Story Lantern → THE LANTERN THAT CARRIES A LESSON (RL.1.2)

## 0. Identity
- **id** `juniper-story-lantern.central-message.rl-1-2` (KEPT; slug, page title and intro frozen for en de fr es pt it nl; sv da no fi get new slug/title/intro at build, grade 1) · CCSS RL.1.2 ("retell stories, including key details, and demonstrate understanding of their central message or lesson") · strand Reading: Literature · own files `juniper-story-lantern-core.js` (new), `juniper-story-lantern-activity.js` (rewritten), html, `juniper-story-lantern-activities.json` (rounds kept and extended).
- **Worksheets covered:** none mapped.
- **Old activity:** read a three-sentence fable, tap one of three cards (the lesson, a detail from the story, a wrong lesson). **Kept:** all 8 EN fables with their exact sentences and their three cards (moral / detail / wrongmoral) and the de/fr/es/pt/it/nl translations; Juniper the hedgehog (now the library `forest-creatures/hedgehog`). **Added:** 2 new fables, one "next story" per fable, a fourth card option (another fable's lesson), and the retell step (§6 Level 2).

## 1. The pitch
"Slide a card into Juniper's lantern and its light tells you what kind of card it is: a real lesson lights the whole story AND shines on into a brand-new story, because a lesson is something you can take with you — a detail only lights the one line it came from, and a wrong lesson goes dark right where the story ends."

## 2. Why a child will want it again
- **A lantern in the hand.** A brass hedgehog-height lantern (drawn geometry: a frame, a glass chimney, a card slot like a postbox) stands between two windows. Dropping a card in the slot makes the flame catch with a soft "whump" and a warm bloom.
- **Light that travels.** When Check is pressed, light pours out in two directions at once: back across the three story panes (they glow one by one, left to right, like a retelling) and forward along a beam of tiny floating sparks to the second window, where a new little story waits in the dark. A true lesson makes that far window bloom open.
- **The three behaviours are clear and gentle.** A detail card lights exactly its own line (that line glows like a copy) and the beam fizzles halfway — "that happened, but it can't travel". A wrong-lesson card makes the ending pane turn cold blue and the beam stops at the glass. An other-story lesson (4-card setting) doesn't light the story at all — it belongs somewhere else.
- **The earned show.** On the right card, both windows glow, Juniper (library hedgehog) rolls a little closer to the lantern, and a firefly drifts from the lantern to settle on a "lesson jar" shelf — at the end of a pass the jar holds a firefly for every lesson found, each one shimmering when tapped to show its lesson card.
- **Free play:** tap the lantern between rounds to dim and brighten it; tap a firefly in the jar to re-read its lesson.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RL.1.2):** after reading a short tale, retell its key events in order and name its central message — the lesson the whole story teaches, which also holds in other situations.
- **Misconception 1 — the lesson is something that happened** ("Hare stopped for a long nap"). The detail card lights only its own pane, and the beam cannot reach a new story about a girl playing the piano: a detail is about these characters only.
- **Misconception 2 — a lesson that sounds wise but the story disproves** ("The fastest runner always wins"). The ending pane goes cold — the story's ending says the opposite. The child learns to test a lesson against how the story ends.
- **Misconception 3 — any good lesson will do** (4-card setting: "A small friend can help a lot" offered for the Tortoise and the Hare). It is a real lesson, but nothing in this story lights for it.
- **The material pushes back** by light alone; the lesson is defined by what it covers (all of the story, its ending, and a new story) — the definition of a central message, made visible. No text says "wrong".

## 4. The stage
`layout:'split'` at ≥ 700 px: the two windows + lantern left (470 px), the card tray + bubble right (210 px); stacked below.

**At 704 px:**
- **The story window** (left top, 460 × 220): a wooden window frame with three tall panes side by side, each 140 × 170 with one story sentence in 18 px Nunito (sentences ≤ 75 characters, already true of the kept data). Above the frame, the story's two library pictures (96 × 96 each) on a little sill — e.g. pets/tortoise and forest-creatures/rabbit.
- **The lantern** (centre, 90 × 150) between the windows with its card slot on top.
- **The next-story window** (left bottom, 460 × 130): one pane, dark until lit, holding one library picture (96 × 96) and the next story's sentence(s) (18 px; ≤ 2 lines). It is visible but dimmed to 35 % at rest — readable for a careful child, so the lesson can be tested against it before choosing.
- **The card tray** (right column): 3 (or 4) lesson cards 200 × 64, 18 px text, each with a little wick-shaped tab at the top (drawn). The **lesson jar** (a glass jar outline 80 × 100) sits under the tray.
- **Juniper:** library `forest-creatures/hedgehog`, 96 × 96, at the foot of the lantern.
- **Task line (EN, 22 px):** "Read the story. Which card tells what the story teaches?"

**At 360 px:** single column. Pictures 64 × 64 (two on the sill), panes stacked vertically as three wide strips 328 × 54 (18 px text, 2 lines each) — the light then flows top to bottom; the lantern (60 × 100) sits between the story window and the next-story window (328 × 96, picture 64 px). Cards 328 × 52 in a stack below. Check ≈ 690 px at 360 × 740 — the card stack is the last block before Check, the jar moves into the header progress chip area. At 320 × 640: panes 16 px text, cards 46 px tall, Check ≈ 630.
- No words on the apparatus except the story and the cards (the content).

## 5. The hand
- **Choose a card:** tap a card → it lifts and slides into the lantern slot (260 ms, a paper "shff"); the flame catches. Tap another card → the first slides back to the tray, the new one drops in (only one card in the lantern).
- **Check:** the light pours out (panes light in reading order, 220 ms each; the beam travels 600 ms).
- **Retell (Level 2):** before the lesson step, the three story panes arrive shuffled; the child drags them (or taps two to swap) into reading order on the window frame. When they are in order the window's latch clicks and the panes join into one picture strip (the retell). Only then does the lantern open its slot.
- **Long-press a pane** → TTS reads that sentence where a voice exists (a bonus; the story must be readable).
- **Keyboard:** Tab through panes (retell: Space picks up, arrows move, Space drops) and cards; Enter drops a card in the lantern; C = Check.
- **Free play:** dim/brighten the lantern; tap jar fireflies.

## 6. The rounds
A round = one fable. **Level 1 (Lesson): 10 fables per pass; Level 2 (Retell + lesson): the same 10; order-only reshuffle per pass.** One right card each.

| # | fable (pictures) | story (kept/new EN) | lesson (moral) | detail | wrong lesson | next story (new; picture) |
|---|---|---|---|---|---|---|
| 1 | Tortoise and Hare (pets/tortoise, forest-creatures/rabbit) | kept | Slow and steady can still win. | Hare stopped for a long nap. | The fastest runner always wins. | "Ana played her piano a little every day. At the concert, she played the whole song." (music/piano) |
| 2 | Ant and Grasshopper (forest-creatures/ant, forest-creatures/grasshopper) | kept | Plan ahead and be ready later. | Grasshopper played all summer long. | Play now and never mind later. | "Leo packed his raincoat in the morning. In the afternoon it rained, and he stayed dry." (clothing/raincoat) |
| 3 | Lion and Mouse (zoo-animals/lion, forest-creatures/mouse) | kept | A small friend can help a lot. | The big Lion was caught in a net. | Little ones can never help big ones. | "The big kids' ball rolled under the bench. Only little Kim could reach it, and she gave it back to them." (toys/ball) |
| 4 | Crow and Pitcher (birds-2/crow, kitchen-tools/pitcher) | kept | A clever idea solves a problem. | The Crow dropped in some pebbles. | If you can't reach it, give up. | "The kite was stuck in a tree. Sam had an idea and used a long broom to tap it down." (around-the-house/broom) |
| 5 | Boy Who Cried Wolf (farm-animals/sheep — one picture: every library wolf is drawn as a husky-like pup, PICTURE-RULINGS) | kept | Lying makes people stop trusting you. | The little boy yelled Wolf just for fun. | A joke is always fun for everyone. | "Max said he was sick three times when he was not. The fourth time he was really sick, but no one believed him." (hospital/thermometer) |
| 6 | Wind and Sun (beach/sun, clothing/coat) | kept | Gentle ways work better than force. | The strong Wind blew hard at the man. | The hardest push always wins. | "Mia pulled hard on her shoelace knot, and it got tighter. Then she wiggled it gently, and it came loose." (clothing/shoe) |
| 7 | Golden Goose (farm-animals/goose, occupations/farmer) | kept | Wanting too much costs everything. | The farmer wanted all of the gold. | Taking more is always better. | "Tom grabbed the whole cookie jar at once. It fell and broke, and then there were no cookies at all." (bakery/cookie) |
| 8 | Two Friends and the Bear (forest-creatures/bear) | kept | A true friend helps in trouble. | One friend climbed up a tall tree. | Save yourself and forget your friend. | "When Lily fell off her bike, Ben stopped and helped her up." (toys/bicycle) |
| 9 | Two Goats on the Bridge (farm-animals/goat ×2) | NEW: "Two goats met in the middle of a narrow bridge." · "Neither goat would step back, so they pushed and pushed." · "They both fell into the river below." | Taking turns is better than fighting. | Two goats met on a narrow bridge. | Never step back, just push harder. | "Two children both wanted the swing. They took turns, and both of them got to swing." (toys/swing) |
| 10 | Ant and Dove (forest-creatures/ant, birds-2/dove) | NEW: "An ant fell into a stream, and a dove dropped a leaf to save it." · "Later, a hunter tried to catch the dove." · "The ant bit the hunter's foot, and the dove flew away safe." | Be kind, and kindness comes back. | The dove dropped a leaf into the stream. | Helping others never helps you. | "Zoe shared her crayons with the new girl. The next day, the new girl helped Zoe find her lost hat." (toys/crayons) |
- Existing de/fr/es/pt/it/nl versions of fables 1–8 are kept verbatim; fables 9–10, all next stories and the 4th cards are authored new per locale by a native author (not translated); sv/da/no/fi author all 10. Every next story is checked by the reviewer for: the lesson fits it, the detail and the wrong lesson do NOT fit it, and the other-story lesson does not fit it.
- **4-card setting:** adds the moral of a different fable as the fourth card, chosen so it does not fit this fable or its next story (fixed pairing per round: 1←3, 2←8, 3←1, 4←6, 5←10, 6←4, 7←9, 8←7, 9←5, 10←2).
- **The wrong lesson is now always DISPROVED BY THE ENDING (critic, measured against each story):** the lantern's physics says a wrong lesson turns the ending pane cold — so every wrong card must be a lesson-shaped claim the last sentence contradicts. Seven of the eight kept wrong cards were not: "Never wake a sleeping lion" is sensible advice the ending does not refute, "The sun is hotter than wind" is something the ending actually *supports*, and "Geese are made of pure gold", "Wolves are big and very scary", "Bears are easy to scare off", "Always carry water when it is hot" are not lessons at all. They are replaced (table) — the kept morals, details and stories are untouched; the de/fr/es/pt/it/nl wrong cards are re-authored by the native author to the same rule. The gate cannot test "disproved" by string match, so the reviewer signs each wrong card against its ending, and the gate checks the shape (it is not a substring of any story sentence, it shares ≤ 1 content word with the detail card).
- **Answer position — a fixed balanced table, not a random shuffle** (a random shuffle can put the moral in one slot 5 times in 10): with 3 cards the moral's displayed slot over rounds 1–10 is 1,2,3,1,2,3,1,2,3,1 (4/3/3); with 4 cards 1,2,3,4,1,2,3,4,2,3 (2/3/3/2 — no slot > 3); the detail and the wrong lesson alternate in the remaining slots; each new pass rotates every slot by +1 (order-only reshuffle still reorders the ROUNDS). **Length is not a tell (critic-measured on the EN set above):** the moral is the longest card in 2 of 10 rounds (rounds 7 tie, 9) and the shortest in 2 of 10 (3, 8) — the gate asserts ≤ 4/10 for both in every locale.

## 7. Check, the misses, the success
- **Check with no card** → no miss; the lantern flickers and the slot glows. Hint: "Put a card in the lantern."
- **Miss 1 — what the light SHOWS:**
  - detail card → only its own pane glows (the matching sentence words underline in gold), the beam fizzles halfway. Hint: "That happened in the story. But a lesson is something you can take to a new story."
  - wrong lesson → panes 1–2 glow, the ending pane turns cold blue, the beam stops. Hint: "Look at how the story ends. Does it agree?"
  - other-story lesson → no pane lights, the beam goes straight to the new window and stops at its glass. Hint: "That is a lesson from a different story. What does THIS story teach?"
- **Miss 2:** the ending pane gets a warm glow and its key words underline (*kept going and going, and won*), and the next-story window brightens to full so its sentence is easy to read. Hint: "Read the ending again, and the new story. Which card is true for both?"
- A new card removes the help until the next Check.
- **Success:** all three panes glow in reading order, the beam reaches the new window and it blooms open, Juniper rolls closer, a firefly flies to the jar. Bubble: "Yes! This story teaches: {moral} It works in a new story too." (Level 2 adds before it: "You told the story in order.")
- **Retell step (Level 2):** Check on the window with panes out of order → the misplaced pane wobbles and a faint ↓ arrow (drawn) shows from the beginning pane; miss 2 numbers the first pane "1". Right → the latch clicks, the panes join.

## 8. Settings
1. **Task:** Lesson / Retell, then lesson — at rest the panes are in order (Lesson) or shuffled with the lantern slot closed (Retell).
2. **Cards:** 3 / 4 — the tray shows 3 or 4 cards.

## 9. Words (EN source)
- title "Juniper's Story Lantern" · instruction "Read the story. Which card tells what the story teaches?" · retell instruction "Put the story in order. Then find its lesson."
- hints: empty "Put a card in the lantern." · detail "That happened in the story. But a lesson is something you can take to a new story." · wrong "Look at how the story ends. Does it agree?" · other "That is a lesson from a different story. What does THIS story teach?" · miss2 "Read the ending again, and the new story. Which card is true for both?" · retellMiss1 "Which part happened first?" · retellMiss2 "Start with the part that has the number 1."
- success "Yes! This story teaches: {moral} It works in a new story too." · retell "You told the story in order."
- settings: "Task" — "Lesson" / "Retell, then lesson" · "Cards" — "3" / "4"
- aria: pane "Story part {i}: {sentence}" · card "Lesson card: {text}" · lantern "Lantern, holding: {text|empty}" · next window "New story: {sentence}".
- **Locale traps.** (1) Fable characters' names and genders per locale (de "die Schildkröte" f vs "der Hase" m; fr "le lièvre et la tortue"; es "la liebre y la tortuga"; fi "jänis ja kilpikonna"; sv "haren och sköldpaddan") — kept translations already handle 1–8. (2) The Ant and the Grasshopper is "La cigale et la fourmi" in fr (a cicada) and "la cigarra y la hormiga" in es — keep the locale's traditional animal in the TEXT, but the picture stays the grasshopper (forest-creatures/grasshopper; no cicada art) — reviewer confirms the grasshopper reads acceptably as *cigale/cigarra* or the round uses the generic "Grille" (de already "die Grille" — a cricket; acceptable). (3) Morals are proverbs in many locales (de "Langsam, aber stetig kommt man auch ans Ziel", fr "Rien ne sert de courir…") — use the child-friendly form, not an archaic proverb a six-year-old cannot read. (4) Next-story names must be locale-natural (Ana/Leo/Kim… per locale, taken from the b2 sentence bank `names` list). (5) es is es-MX; pt is pt-BR register. (6) Card sentences ≤ 45 characters so they fit 200 × 64 in 2 lines in every locale (fi/de longest — the gate measures).

## 10. Sound off, access, phones
- Legible with the sound off: everything is text + pictures + light. TTS (long-press a pane) is a bonus — RL.1.2 is about reading here, so text is never hidden.
- Light changes always pair with a shape change (underlines, the beam's length, the window opening) so colour-vision is not required.
- Keyboard §5; live region announces "Light reaches: story parts 1, 2; not the ending; not the new story."
- Taps: cards ≥ 52 px tall; panes ≥ 54 px; Check 48 px.
- Pictures 96 px at 704, 64 px at 360.
- Check above the fold at 360 × 740 (≈ 690) and 320 × 640 (≈ 630).

## 11. Distinct from
- **Row 70 Nila's Idea Umbrella** (RI.K.2): the big idea covers every detail of an informational text, shown by rain. The lantern's decisive test is the **transfer** to a new story and the **ending** test — the two ideas that separate a lesson from a summary.
- **Row 65 Book That Cracks and Mends** (problem → fix pages) and **Row 68 Story Zipper** (compare two stories) — different acts.
- **Row 117 Marlo's lens** (sibling, character evidence) and **Row 119 Lumen's windows** (sibling, point of view) — different inventions in this family.
- Premium tool **story-line** (peg story cards in order) is sequencing on a clothesline; the retell step here is a three-pane window latch inside a lesson task, not a story-line copy.

## 12. Build plan
- **Core** `JuniperLanternCore`: round `{id, band, story[3], pictures[2], cards:[{id,kind:'moral'|'detail'|'wrongmoral'|'other', text, pane?}], next:{sentence, picture}}`; `light(round, cardId)` → `{panes:[bool×3], ending:'warm'|'cold'|'dark', beam:'reaches'|'half'|'stops'}` derived from `kind` + `pane` (detail's source pane); `retellOk(order)`; `shuffledOrder` + `nextTask`.
- **The gate's own truth** (`verify-juniper-story-lantern-core.js`): an independent EN table of the right card per fable; for every locale: exactly one moral, one detail (whose text paraphrases one pane — the gate requires ≥ 2 shared content words with its `pane`), one wrong moral, and in 4-card mode one other-story moral that equals that other fable's moral text; the light table: moral → 3 panes + reaches; detail → its pane only + half; wrongmoral → ending cold + stops; other → none + stops; displayed moral position ≤ 4/10 per slot; moral longest ≤ 4/10; card length ≤ 45 chars; all pictures exist in colour themes.
- **Mutations (each killed):** detail lights all panes · wrong moral lights the ending · beam reaches on a detail · other-story moral accepted · retell accepts wrong order · moral always in slot 1 · light shows before Check (live) · same order every pass · two cards in the lantern at once.
- **Pictures to verify on contact sheets:** forest-creatures/hedgehog ✓, pets/tortoise ✓, forest-creatures/rabbit ✓, ant ✓, grasshopper ✓, mouse ✓, bear ✓, zoo-animals/lion, birds-2/crow ✓, birds-2/dove ✓, kitchen-tools/pitcher, farm-animals/sheep (animals/wolf REJECTED — a husky-like pup), farm-animals/goat, farm-animals/goose, occupations/farmer ✓, beach/sun ✓, clothing/coat, music/piano, clothing/raincoat, toys/ball, around-the-house/broom, hospital/thermometer, clothing/shoe, bakery/cookie, toys/bicycle, toys/swing, toys/crayons (a set of crayons — fine as "crayons").
- **Risks:** fr/es grasshopper-vs-cicada naming (§9); native authoring of next stories in sv/da/no/fi. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — dropping a card into a lantern and watching its light travel to a new story is magic; the firefly jar fills.
2. **Teacher on the board?** Yes — it is the exact test teachers use: "Does the whole story show it? Does the ending agree? Could it happen to you too?"
3. **Parent trust?** Classic fables, library pictures, kind lessons, no scores.
4. **Invention:** a lantern whose light shows what a card really is — a lesson lights the whole story and carries on into a new one; a detail lights one line; a wrong lesson goes dark at the ending.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **Every wrong-lesson card now fails by the lantern's own rule** (the ending disproves it): 9 of 10 were rewritten as lesson-shaped claims the last sentence contradicts ("Little ones can never help big ones", "If you can't reach it, give up", "The hardest push always wins"…). Before, several were facts, nonsense, or — for the Wind and the Sun — a claim the ending supported, so the ending pane would have had to turn cold over something the story never refutes.
- **The wolf picture removed** (every library wolf is a husky-like pup); the Boy Who Cried Wolf shows the sheep only.
- **The Lion-and-Mouse transfer story fixed** so the lesson really fits it (Kim gets the big kids' ball back FOR them; before, nobody was helped).
- **Answer position is a fixed balanced table** (3 cards 4/3/3, 4 cards 2/3/3/2, rotated per pass) instead of a random shuffle the gate could only hope about; card length measured (moral longest 2/10, shortest 2/10).
- Distinct from 064 (flipbook order) and 070 (idea umbrella over an informational text): the lantern's decisive tests are the ending and the transfer to a new story.
