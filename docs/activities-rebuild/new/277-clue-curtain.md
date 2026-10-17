# New #277 — The Clue Curtain → THE TRAPDOOR STAGE (RI.2.1)

## 0. Identity
- **id** `clue-curtain.play.ri-2-1` · grade 2 · CCSS RI.2.1 ("ask and answer such questions as who, what, where, when, why, and how to demonstrate understanding of key details in a text") · strand Reading: Informational Text · key `clue-curtain` → `clue-curtain-core.js`, `clue-curtain-activity.js`, `clue-curtain-activity.html`, `clue-curtain-activities.json`. New instrument: slug, page title and intro authored at build in all 11 locales (`node scripts/new-activity.js --num=277`, then `NEW-RECIPE.md`). 0 lines to `lcs-shell.*` or any shared core.
- **Worksheet covered:** G2-343 "Who Am I? Mystery Animal" (read the five clues on a card, find the animal in the picture bank, write its name) → the Long case (five clues), with the name read out at the reveal.
- **Data source (reused, not re-authored):** the fact clues come from the reviewed animal truth table `scripts/worksheet-gen/data/b3/animal-facts.json` (54 animals × class, covering, legs, fly, habitat — `reviewed:true`, every picture opened) and its native clue frames in all 11 locales (`data/b3/animal-fact-file.js` + `data/b3/locales/animal-fact-file.<loc>.json` → `mystery` and `legsFrames`: "I am {a bird}.", "I have {fur}.", "I have 4 legs.", "I can fly." / "I cannot fly.", "I live {on land}."). Only the 16 "special" clues (§6) are new sentences.

## 1. The pitch
"The animals stand on a stage of trapdoors and a curtain hides the mystery animal — every clue you turn over opens the trapdoors under the animals that clue rules out, but only if you chose them right: an animal that fits the clue holds on to the edge and won't fall, and the curtain cord only drops when exactly one animal is left standing."

## 2. Why a child will want it again (the fun)
- **A little theatre.** A drawn stage with a red velvet curtain on the right; behind it, the mystery animal's shape waits (nothing shows — the curtain is closed). On the stage floor stand six (or nine) library animals, each on its own square trapdoor with a brass ring.
- **The clue cards.** A neat stack of numbered clue cards hangs on a hook at the left. The top one flips over with a paper *flick* to show its sentence: "I cannot fly." The other cards stay face down — you cannot peek ahead.
- **Marking.** Tap an animal the clue rules out and its trapdoor ring lifts with a click and a red tag swings on it ("this one goes"). Tap again to unmark.
- **THE LEVER.** Pull the lever (= Check for that clue). Every marked trapdoor drops open — *clunk* — and the animals that really break the clue slide down out of sight with a comic little *whoop*, each one carrying the clue's number tag with it. If you marked an animal that **fits** the clue, the whole floor jams: that animal braces its feet and holds on, its trapdoor rattles, and nothing drops until you take its tag off.
- **The wings.** Animals that fell are not gone: they reappear in the wings at the side of the stage as drawn name tokens (the animal's name on a little tag), lined up under the number of the clue that sent them away — so the child can see *why* each one left.
- **THE CURTAIN.** When only one animal is left standing, the curtain cord drops down like a bell-pull. Pull it: the curtain sweeps open, a spotlight blooms, and the mystery animal is revealed — the same animal, now holding all the clue cards like a fan, every one lit. Its name appears under it (from `image-vocabulary.js`), the room claps.
- **Free play ("Rehearsal"):** after a round, tap any animal in the wings and drag it back onto the stage; the clue cards stay face up, and the child can test: which clue would send it away? (Hold it over a clue card and that card glows if it rules the animal out.)
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RI.2.1 with G2-343):** read short informational clue sentences one at a time and use each key detail to answer "Who am I?" — keeping only what fits every detail read so far.
- **Misconception 1 — guessing from the first clue** ("I can fly… it's the owl!"). **Push back:** there is no way to name the animal early: the curtain cord only drops when exactly one animal stands, and every round is built so that one clue never leaves one animal before the last clue (§6). The child must read on.
- **Misconception 2 — ignoring a clue** (keeps the fish after "I have wings"). **Push back:** the lever only works on what the child marked; at the lever pull the kept fish's trapdoor shakes and its square glows (miss 1 shows the count, miss 2 shows which — §7). A clue cannot be skipped: the next card stays face down until the current clue's work is done.
- **Misconception 3 — ruling out an animal that actually fits** (sends the penguin away at "I have wings" — penguins do have wings). **Push back:** the penguin holds on to its trapdoor edge and the floor jams; the clue's key word glows ("wings") and a small wing marker appears on the penguin's frame. Surprise facts are the best moments: ostriches and penguins have wings, bats are mammals, ants and bees lay eggs.
- **Misconception 4 — reading only the picture, not the text.** **Push back:** half the clues (lay eggs, hooves, lives on a farm, makes honey, hoots) cannot be seen in a picture at all — they must be read and known.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **Clue hook** (top of the stage, 460 × 64): the current clue card face up (420 × 56, 22 px text, centred) with its number badge; the remaining face-down cards peeking behind it (a tiny stack, numbered on their backs 1–5).
- **The stage** (460 × 330): Short case = 6 trapdoors in 3 × 2, each 140 × 150 (picture 112 px, a 30 px brass ring at the bottom of the square); Long case = 9 trapdoors in 3 × 3, each 140 × 104 (picture 96 px). Library pictures on every square (§12 list).
- **The curtain** (a drawn red velvet panel, 80 × 330) at the stage's right edge, with its cord (hidden until one animal stands).
- **The wings** (right column, 180 × 300): columns headed by clue number badges 1–3 (or 1–5); animals that fell are recorded there as **drawn name tokens** (a tag with the animal's name, 15 px) under the badge of the clue that sent them away — a record is a drawn token, never a shrunken picture (picture ruling).
- **The lever** (right column, drawn brass lever 48 × 120) — it is the Check button for each clue, with the word "Check" beside it.
- **Task line (EN, 22 px):** "Read the clue. Mark every animal it sends away, then pull the lever."

**At 360 px:** single column: clue card 328 × 56 (18 px) → stage 328 wide (Short 3 × 2 squares 104 × 120, pictures 80 px; Long 3 × 3 squares 104 × 92, pictures 68 px — floor 64 kept) with the curtain as a 24 px red strip on the right edge → lever as a 48 px wide button with the lever icon → wings collapse into a one-line strip "Sent away: 4" that opens on tap. Check (lever) at ≈ 640 (Short) / 700 (Long) on 360 × 740; at 320 × 640 pictures 64 px, squares 96 × 84, lever ≈ 620.
- **No words on the apparatus** except the clue sentence (content), the animals' names in the wings / at the reveal (content), and numerals on badges.

## 5. The hand
- **Turn a clue:** the first clue is face up at the start; after a successful lever pull the next card flips (220 ms, *flick*). It never flips early.
- **Mark / unmark:** tap an animal's square → its ring lifts and a red tag swings (100 ms, click). Tap again → unmarked.
- **Pull the lever:** drag the lever down or tap it (Space). The trapdoors of marked animals drop (150 ms, *clunk*); the fallen animals slide away (300 ms) and reappear as tokens in the wings column for this clue.
- **The cord:** appears only when exactly one animal stands; drag it down or tap it (Enter) → curtain opens (600 ms), spotlight, fan of clue cards, the name.
- **Undo:** marks can be changed until the lever; after a successful pull the round moves on (the wings record stays).
- **Keyboard:** arrows move around the stage, Space marks, L pulls the lever, C pulls the cord, R reads the clue (TTS bonus).
- **Sound:** *flick*, click, *clunk*, *whoop*, a rattle on a jam, a drum roll and applause at the reveal.

## 6. The rounds
One round = one mystery: a field, an ordered clue deck, one animal left. **Every clue sends away at least one animal; no clue before the last leaves one animal; the last clue leaves exactly the mystery; the first clue never removes more than half the field.** Field placement on the stage comes from a seeded permutation per round per pass; the mystery's square follows a balanced table (Short: 3,6,1,5,2,4,6,1 · Long: 5,9,1,7,3,8,2,6), rotated +1 per pass.

Clue language: **fact clues** use the reviewed frames (`class`, `covering`, `legs`, `fly`, `habitat`); **special clues** are 16 new sentences (EN source): eggs "I lay eggs." · wings "I have wings." · hooves "I have hooves." · stripes "I have stripes." · farm "I live on a farm." · trunk "I have a long trunk." · hump "I have a hump on my back." · bamboo "I love to eat bamboo." · honey "I make honey." · hoot "I hoot at night." · oink "I say oink." · neigh "I neigh." · seafish "I swim in the sea to catch fish." · cluck "I cluck." · biggest "I am the biggest bird in the world." · house "I carry my house on my back."

**Short case — 6 animals, 3 clues** (verified by the designer's `work-35/clue-check.js` and again by the critic's independent `work-c35/clue-verify.js`, which reads `animal-facts.json` directly and holds its own truth table for the special clues: 0 defects in 16 rounds)
| # | mystery | field (the other five) | clue 1 → sends away | clue 2 → sends away | clue 3 → sends away |
|---|---|---|---|---|---|
| 1 | hedgehog | swan, parrot, owl, lizard, hippopotamus | I have 4 legs. → swan, parrot, owl | I am a mammal. → lizard | I have spines. → hippopotamus |
| 2 | ostrich | bee, raccoon, horse, cow, penguin | I cannot fly. → bee | I have wings. → raccoon, horse, cow | I am the biggest bird in the world. → penguin |
| 3 | lizard | parrot, swan, ostrich, tiger, hippopotamus | I cannot fly. → parrot, swan | I have 4 legs. → ostrich | I lay eggs. → tiger, hippopotamus |
| 4 | camel | bee, flamingo, bat, hedgehog, tiger | I cannot fly. → bee, flamingo, bat | I have fur. → hedgehog | I have a hump on my back. → tiger |
| 5 | pig | penguin, zebra, sheep, horse, goat | I have hooves. → penguin | I live on a farm. → zebra | I say oink. → sheep, horse, goat |
| 6 | owl | koala, camel, moose, penguin, flamingo | I have 2 legs. → koala, camel, moose | I can fly. → penguin | I hoot at night. → flamingo |
| 7 | tortoise | goat, donkey, eagle, lizard, ostrich | I lay eggs. → goat, donkey | I cannot fly. → eagle | I carry my house on my back. → lizard, ostrich |
| 8 | panda | parrot, owl, bat, koala, camel | I have fur. → parrot, owl | I cannot fly. → bat | I love to eat bamboo. → koala, camel |

**Long case — 9 animals, 5 clues (G2-343)**
| # | mystery | field (the other eight) | clues in order → each sends away |
|---|---|---|---|
| 1 | owl | squirrel, fox, tortoise, lizard, fish, ostrich, butterfly, flamingo | I lay eggs. → squirrel, fox · I have wings. → tortoise, lizard, fish · I can fly. → ostrich · I am a bird. → butterfly · I hoot at night. → flamingo |
| 2 | penguin | rabbit, pig, elephant, lizard, fish, butterfly, owl, hen | I lay eggs. → rabbit, pig, elephant · I have wings. → lizard, fish · I have 2 legs. → butterfly · I cannot fly. → owl · I swim in the sea to catch fish. → hen |
| 3 | zebra | bee, parrot, eagle, ostrich, tortoise, lion, panda, horse | I cannot fly. → bee, parrot, eagle · I have 4 legs. → ostrich · I am a mammal. → tortoise · I have hooves. → lion, panda · I have stripes. → horse |
| 4 | bee | dog, bear, hedgehog, lizard, hen, ostrich, flamingo, butterfly | I lay eggs. → dog, bear, hedgehog · I have wings. → lizard · I can fly. → hen, ostrich · I am an insect. → flamingo · I make honey. → butterfly |
| 5 | tortoise | lion, donkey, moose, parrot, bee, fish, ostrich, lizard | I lay eggs. → lion, donkey, moose · I cannot fly. → parrot, bee · I live on land. → fish · I am a reptile. → ostrich · I carry my house on my back. → lizard |
| 6 | hen | horse, camel, pig, eagle, butterfly, fish, ant, ostrich | I lay eggs. → horse, camel, pig · I cannot fly. → eagle, butterfly · I live on land. → fish · I have 2 legs. → ant · I cluck. → ostrich |
| 7 | elephant | butterfly, flamingo, parrot, fish, hen, lizard, hedgehog, koala | I cannot fly. → butterfly, flamingo, parrot · I live on land. → fish · I have 4 legs. → hen · I am a mammal. → lizard · I have a long trunk. → hedgehog, koala |
| 8 | horse | butterfly, flamingo, swan, hen, lizard, pig, fox, dog | I cannot fly. → butterfly, flamingo, swan · I have 4 legs. → hen · I am a mammal. → lizard · I have fur. → pig · I neigh. → fox, dog |
Mystery kinds: Short — mammals 4, birds 2, reptiles 2; Long — birds 3, mammals 3, insect 1, reptile 1. Every animal and fact is from the reviewed table; the special clues' truth is recorded per animal in the core (`true` / `false` / `ambiguous`) and a clue is never used on a field that holds an "ambiguous" animal (e.g. "I have stripes" never with the tabby cat, the striped lizard, the raccoon or **animals/donkey, which is drawn with zebra-striped legs**; "I live on a farm" never with the ostrich (ostriches are farmed), the bee, the rabbit or the camel; "I live on land" never while an air or water-edge animal like the owl, penguin, swan or hippo is still standing; "I have 4 legs" never with the bat; "I am a mammal" never with a bat or penguin unless it is the mystery; "I have a shell" never with the ant or ladybug, whose reviewed covering is "shell").
- **Shortcut bots, measured (critic re-run, expected values):** "pick the animal of the rarest class in the field" names the mystery 1.3/8 (Short) and 0/8 (Long); "guess after the first clue" (pick at random among the animals clue 1 leaves) 2.2/8 (Short) and 1.3/8 (Long). "Tap every animal, pull the lever" always jams (every clue has at least one fitting animal besides the mystery) and costs a miss on every clue. The mystery square follows the balanced table, so "always the same square" is right ≤ 2/8.

## 7. Check, the misses, the success
- **Lever with nothing marked** → no miss; the clue card wiggles and its key word underlines. Hint: "Which animals does this clue send away? Tap them first."
- **Miss 1 — what the stage SHOWS:**
  - marked an animal that fits → the floor jams: that animal braces and holds its trapdoor edge, the clue's key word and a matching marker on its frame glow (a wing for "wings", an egg outline for "eggs", "4" over its legs). Nothing drops. Hint: "{name} fits this clue, so it stays. Take its tag off."
  - left out an animal that breaks the clue → the correct marks drop; then the stage dims and the number of animals still breaking the clue appears as empty red tags hanging from the lever ("2 more"), without saying which. Hint: "Some animals left on the stage don't fit this clue. Read it again and check each one."
- **Miss 2 — the stronger showing:** for each standing animal, the clue is "tried" on it in turn — a little check mark or cross pops on its frame as the clue card slides past it; the ones that break the clue keep their cross. Hint: "Look at the crosses. Those animals don't fit: tap them, then pull the lever."
- A new mark takes the help away until the next pull.
- **Success (each clue):** the trapdoors drop, the next card flips. **Success (round):** the cord drops, the curtain opens, the mystery holds its fan of lit clue cards. Bubble: "I am the {name}! {clue1} {clue2} {clue3}" (the clue sentences read back in order, each lit as it is read).

## 8. Settings (each visibly changes the board at rest)
1. **Case:** Short (6 animals, 3 clues) / Long (9 animals, 5 clues) — at rest a 3 × 2 or a 3 × 3 stage, and 3 or 5 cards on the clue hook.
2. **Names on the stage:** On / Off — each animal's name from `image-vocabulary.js` under its picture (On helps readers match clue words like "bird" to names; Off is pictures only, as on the worksheet's picture bank).

## 9. Words (EN source; native authors write the other 10)
- title (new, all locales): "The Clue Curtain — Who Am I?" · instruction: "Read the clue. Mark every animal it sends away, then pull the lever." · prompt at the start: "Who is behind the curtain?"
- clue frames: from the reviewed `mystery` / `legsFrames` blocks (all 11 locales exist) · special clues: the 15 EN sentences in §6 (new; 11 locales authored at build).
- hints: empty "Which animals does this clue send away? Tap them first." · fits "{name} fits this clue, so it stays. Take its tag off." · missed "Some animals left on the stage don't fit this clue. Read it again and check each one." · miss2 "Look at the crosses. Those animals don't fit: tap them, then pull the lever."
- success: "I am the {name}! {clues}" · lever label "Check" · cord aria "Pull the curtain cord".
- settings: "Case" — "Short (6 animals, 3 clues)" / "Long (9 animals, 5 clues)" · "Names on the stage" — "On" / "Off"
- aria: square "{name}, {standing|marked}" · clue "Clue {i} of {n}: {text}" · wings "Sent away by clue {i}: {names}".
- **Locale traps.** (1) **Grammatical person:** the frames are first person ("I have fur" / de "Ich habe ein Fell" / fi "Minulla on turkki") — the special clues follow the same person in every locale. (2) **Legs:** fi partitive after numerals ("Minulla on 4 jalkaa"), fr "pattes" for animals (not "jambes"), de "Beine", sv/da/no "ben" — all already in the reviewed `legsFrames`. (3) **Animal sounds differ:** "I hoot / I say oink / I neigh / I cluck" (cluck: de "Ich gackere", fr "Je caquette", es "Cacareo", it "Chioccio", pt "Cacarejo", nl "Ik kakel", sv "Jag kacklar", da "Jeg kagler", no "Jeg kakler", fi "Kotkotan" — native author confirms) — de "Ich rufe nachts ‚uhu'" / "Ich grunze" / "Ich wiehere", fr "Je hulule" / "Je grogne" / "Je hennis", es "Ululo" / "Gruño" / "Relincho", fi "Huhuilen öisin" / "Röhkin" / "Hirnun", sv "Jag hoar på natten" / "Jag grymtar" / "Jag gnäggar" — native authors choose the school word, never an English onomatopoeia. (4) **The success line's name** takes the locale's article/case: de "Ich bin der Igel!" (gender from the vocab file: m/f/n), fr "Je suis le hérisson !" (space before "!"), it "Sono il riccio!", es "¡Soy el erizo!", pt "Eu sou o ouriço!", nl "Ik ben de egel!" (de/het from vocab), sv "Jag är en igelkott!" (indefinite is natural), fi "Olen siili!" — built from the vocab gender column, reviewed. (5) **Names that differ from the picture:** the reviewed table already avoids wolf (drawn as a pup), duck (a duckling), turtle and frog (missing facts), and the picture rulings exclude hen + rooster together (only the hen is used). (6) **"farm":** a hen and a pig live on farms everywhere; "hooves" (de Hufe, fr sabots, es pezuñas/cascos — native author picks the school word for both horse and pig), "trunk" (de Rüssel, fr trompe), "hump" (de Höcker, fr bosse) are concrete nouns every locale has.

## 10. Sound off, access, phones
- Legible with the sound off: clue text, tags, jams, crosses and the wings record carry everything; the reveal prints the name; TTS bonus (R key / long-press).
- Keyboard §5; aria-live: "The penguin fits this clue and stays." / "Three animals fell. Clue 2 is face up."
- Reduced motion: trapdoors fade the animal out instead of dropping it; the curtain opens without a sweep.
- Taps: squares ≥ 96 × 84 px; lever 48 × 120 (phones: 48 px button); cord 48 px; cards are not targets.
- Pictures: stage pictures 112 / 96 px at 704 (Short / Long) and 80 / 68 px at 360 (≥ 64 floor); the wings record is drawn tokens with names, never shrunken pictures.
- Check (lever) above the fold at 360 × 740 (≤ 700) and 320 × 640 (≈ 620).

## 11. Distinct from
- **New 260 The Clue Table** (logic grids: picture clues on a grid of windows with latch rods — one thing per friend). Here: one mystery, text clues read in sequence, elimination by animal knowledge, and the record of which clue removed whom.
- **Premium tool `number-sieve`** (sealed clue cards act on a number field by themselves, the class reads what goes dark): here the child does the eliminating and the stage only *tests* it (fits hold on, the floor jams). **Premium tool `sorting-hoops`** sorts by a hidden rule.
- **Row 117 Marlo's Magnifier / Row 69 Atlas's Fact Files** — evidence in a story / lifting a fact from a text; not a sequence of clues narrowing a field.

## 12. Build plan
- **Core `ClueCurtainCore`:** `TRUTH` (copied keys from `animal-facts.json` + the special-clue table `{clue: {true:[…], ambiguous:[…]}}`); round `{level, mystery, field:[…], clues:[{f, v}]}`; `fits(animal, clue)`; `standing(state)`; `mark(i)`, `unmark(i)`; `pull(state)` → `{jam:[fitting marked…], dropped:[…], missing: count}`; `cordReady` ⇔ standing.length === 1; `square(round, pass)` (mystery balanced table + seeded fill); `nextTask`.
- **Gate's truth (`verify-clue-curtain-core.js`):** re-implements `fits` from the JSON independently and asserts for every round: each clue removes ≥ 1; standing ≥ 2 before the last clue; standing = [mystery] after it; first clue removes ≤ half; no clue meets an ambiguous animal in its field; every animal is in the reviewed table with `reviewed:true` and `picOpened:true` and is not on the picture-rulings refusal list (wolf, duck, turtle, frog, rooster-with-hen); mystery square table spread; rarest-class bot ≤ 1/8; the "tap all" bot jams on every clue; every special clue has an authored sentence in all 11 locales before ship; success strings name the right animal with the right article per locale.
- **Mutations (each killed):** a fitting animal drops · a breaking animal kept counts as success · next card flips before the lever · cord appears with two animals standing · first clue solves the round · "I have stripes" used with the cat or the donkey on stage · "I live on a farm" used with the ostrich on stage · "I live on land" used while the owl stands · mystery always square 1 · the wings show shrunken pictures · names-setting has no effect · reshuffle repeats.
- **Pictures (all checked on contact sheets):** animals/owl (blue cartoon owl), animals/penguin, animals/swan, animals/fish, animals/pig, animals/rabbit, animals/raccoon, animals/horse, animals/camel, animals/koala, animals/moose, animals/tiger, animals/elephant, animals/hippopotamus, animals/panda, animals/donkey, animals/sheep, animals/fox, animals/dog, animals/bat, animals/zebra; birds/eagle, birds/parrot, birds/flamingo, birds/ostrich; birds-2/hen; farm-animals/cow, farm-animals/goat, farm-animals/bee; forest-creatures/hedgehog, squirrel, bear, butterfly, ant, lizard; pets/tortoise; zoo-animals/lion. **Risks:** the 15 special clue sentences in 10 locales (native authors + the one reviewer); the "ambiguous" lists are a pedagogical judgement the reviewer signs. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — trapdoors that drop animals with a *whoop*, a stubborn animal that holds on when it fits, and a velvet curtain that sweeps open on a spotlight.
2. **Would a teacher put it on the board?** Yes — it is the "Who am I?" routine done honestly: every clue must be read and used, nothing can be guessed early, and the wings show which detail ruled out which animal.
3. **Would a parent trust it?** Real, checked animal facts, library pictures, no score, no timer.
4. **The invention:** a stage of trapdoors that only drops the animals a clue truly rules out — a fitting animal holds on and jams the floor — while the curtain cord waits until exactly one is left.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- **Every clue re-checked against `animal-facts.json` with my own script** (independent truth table for the special clues): each clue removes ≥ 1, none solves early, the first never removes more than half, each round ends on its mystery — 0 defects in 16 rounds.
- **Two special clues were not honestly true:** "I live where it is icy and cold" is false for many penguins (Galápagos, African) → "I swim in the sea to catch fish."; "I live on a farm" sent the OSTRICH away, but ostriches are farmed → the hen's last clue is now "I cluck." 16 special sentences (cluck words listed per locale).
- **Picture found on the contact sheet:** animals/donkey is drawn with zebra-striped legs — added to the "stripes" ambiguity list and to PICTURE-RULINGS.md.
- Bots re-measured (rarest class 1.3/8 and 0/8; guess-after-clue-1 2.2/8 and 1.3/8).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
