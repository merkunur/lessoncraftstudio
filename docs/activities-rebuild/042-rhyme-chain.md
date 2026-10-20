# #42 — Rosa Raccoon's Rhyme Wagon → THE RHYME CHAIN (RF.K.2.a)

ORDER row 42 · id `rhyme-shop.rhyme.rf-k-2-a` (kept).

- **Files:**
  - Added: `rhyme-chain-core.js`, `rhyme-chain-activity.js`, `rhyme-chain-activity.html`, `rhyme-chain-activities.json`.
  - `rhyme-shop-activities.json` was emptied to `[]`. It was the row's only manifest, as the engine was single-row.
  - 0 shared-core lines.
- **Metadata:**
  - The slug, title and intro are frozen in en, de, es, pt, it and nl.
  - **New in fr, sv, da, no and fi:** slug, title and intro.
  - The prose is rewritten ×11.
  - The strand chip (STRAND_OVERRIDE) is added for fr, sv, da, no and fi: the default RF strand is a reading strand, which is wrong for an aural rhyme game.
- **Design:** `designs/042-rhyme-shop.md`.
- The `rhyme-chain` prefix was checked free before the first write.

## The apparatus and its invention: A RING ONLY CLOSES ON A RING WHOSE WORD ENDS WITH THE SAME SOUND
- **The chain:** Rosa (the library raccoon) sits in a drawn wagon and pulls a chain of rings. Each picture hangs under a ring. The child taps a picture to hear its name (`LCSAudio`, the page's locale), then drags it to the end of the chain, or taps it and then the empty ring. A tap alone never commits.
- **The judgement:**
  - A rhyme closes, and both rings glow the same family pattern (a colour plus an engraving).
  - A non-rhyme springs its ring open. The picture falls back onto the grass and keeps its now-known pattern. That counts as a miss.
- **Truth is by sound, never by spelling.** Each word carries a hand-typed rime key:
  - bear and ear do not link, although their spelling matches;
  - snail and whale do link.
- **Seven kinds of round:**
  - JUDGE: a closed-rings button and an open-rings button, no words.
  - PICK: one of three.
  - ODD: four on the chain; mark one and pull the wagon, and the odd one falls.
  - SORT: two wagons, two chains.
  - FINISH: Rosa's line on a song strip, ending in a blank.
  - FIELD: every picture that rhymes.
  - CHAIN: a string, each step offering three.
- **After every built chain**, an open ring with an ear dangles at the end and the note reads "Your turn! Say another word that rhymes." This is the "produce" half of RF.K.2.a; it is spoken, and nothing judges it.
- **Help:**
  - Miss 1: "Listen to the ends: a … b", with both words spoken slowly.
  - Miss 2: every ring shows its pattern, and the hint is "Find the ring with the same pattern as …".
  - A new move takes the help away.
- **Settings:**
  - Names (Off/On): on by default in sv, da, no and fi, where browser voices are unreliable.
  - Patterns (After hanging/Always).
- **Keyboard:** Enter hangs the focused picture; 1 and 2 choose the chain in SORT; Y and N answer JUDGE.
- **Rounds:** 11 to 13 per locale. Every locale has all seven kinds and a judge trap round: en bear/ear (spelling) and bear/bus (onset); the others an onset trap.
- **Order:** an order-only reshuffle per pass. A pass opens on a PICK, two FINISH rounds never touch, no kind appears three times in a row, and a pass never repeats the previous order.
- **Answer slots:** one counter covers every three-way choice in a locale (PICK, FINISH, each CHAIN step), so the right slot rotates ±1 per pass.

## Deviations from the design (each measured or ruled)
- **The design's "live defects" in de and pt were measured, and most were not there.**
  - de Hose = clothing/trousers and Kanne = kitchen-tools/pitcher both carry those labels, so both are kept.
  - pt Cão and Cabelo are not in the current rounds.
- **The real live defects found while building:**
  - **es (Mexican labels):**
    - "Limón" became "Limón amarillo", so the word is now León (zoo animals/lion).
    - "Camiseta" became "Playera", so the word is now Paleta (lollipop).
    - Camión (post office/truck) became "Camión de carga"; the word is now Camión on vehicles/bus, the es-MX word for a bus.
  - **pt panela/estrela** is not a true rhyme in Brazil (open versus closed e), so the round is now panela/janela.
- **The old per-locale onset traps** were added where missing: de Haus/Hahn, es pato/paleta, pt gato/galo, it panino/padella and nl beer/bel. en gained bear/bus.
- **nl FINISH:** the old chant had no line, so the line is now authored ("Kijk, daar staat een trotse haan, hij eet een gele …").
- **fi FINISH:** the line is now "Kissalla on pieni suu, taivaalla loistaa …" → kuu. The design's line was flagged as stiff.
- **No unhook:** a wrong ring never stays on, so every hung link is right and there is nothing to undo.
- **No pass-end lap or "What a rhyme parade!"** The wagon rolls at each win.
- **Check ("Pull the wagon")** is hidden in PICK, FINISH and JUDGE, where hanging the picture (or pressing the button) is itself the test.
- **On phones a chain wraps onto a second row** (a swag) instead of shrinking the pictures below 64px.

## Fixes from the build (each found by a gate or a render)
- **Answer slots favoured slot 1** (3,2,1 per pass) because PICK and CHAIN steps used separate counters. They now share one counter, and the gate asserts ±1.
- **Hierarchy (122 fails):**
  - Card pictures were 83px, because the picture sat at 86% of a 96px tag. It now fills the tag, and the name overlays its foot.
  - Rosa was 74px on desktop and 54px on phones. She now sits above the cart at 96px and 70px.
- **The 320 fold:** the SORT round put Check at 691px against a 640px viewport. Phone ring, hook, gap and padding were tightened; the pictures were left at their size.
- **FINISH win** printed the sung line twice (in the song strip and in the note). The note now says "whale, nail — they rhyme!".
- **The mutation harness** ran once against a gate that failed on the clean core, so every "killed" was empty. It now refuses to run unless the clean gate passes.

## Gates
- **`verify-rhyme-chain-core.js`: 4,124 checks, 0 failures.** It carries its own oracle, typed again rather than read off the core: the rhyme families of each locale by ear, and every round's answer. It covers:
  - every word equals its picture's label and the picture exists (exact case);
  - the picture rulings (tools/nail is en only, no post-office art outside en, no kitchen-tools/pan, never ball beside balloon);
  - a ring holds if and only if the words share a family, over every word pair of every locale;
  - one right answer per round;
  - the trap rounds, slot balance, re-deals, mixed sort piles, and the order rules over 10,000 seeds;
  - strings ×11 with matching placeholders, layout floors and the hint ladder;
  - the manifest mirrors the core, and the frozen metadata is unchanged.
- **`mutate-rhyme-chain.js`:** 20 of 20 mutations killed (the harness refuses to run unless the clean gate passes; a hung gate loop was bounded after one mutation timed out).
- **`local-test-rhyme-chain.js`:** 1,278 checks, 0 failures, real pointer, in all 11 locales. It covers:
  - every round of every pool: a wrong picture dragged falls back, miss 2 patterns, tap-tap hangs, judge buttons, odd marks, sort/field/chain drags, early pulls, and the shell's celebration;
  - names and patterns change the board; Enter hangs; Y and N judge;
  - a width sweep (fi, pt, de at 320–1366): no sideways scroll, controls ≥ 44px, pictures ≥ 64px, everything above the fold;
  - no console errors.
- **`visual-qa-activity.js`:** 78 renders pass.
- **`audit-activity-hierarchy.js`:** 968 / 0.
- **`audit-settings-efficacy.js`:** 2 live (names and patterns both change the board).
- **Other gates:** content gates ×11, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are all green.
- **Read by me:**
  - en at 704 and 360: every kind at rest, wrong and won;
  - sv: sort, odd and chain with names on;
  - the preview (the boat–goat chain mid-build).

## Review (one agent, native ×11 + pedagogy): applied
- **Confirmed by ear in all 11 locales:**
  - every rhyme, every distractor, every JUDGE verdict, and exactly one answer per round;
  - every onset trap and en bear/ear work;
  - Brazilian e quality, Danish stød and Norwegian -nd [n] are right.
- **Required fixes, all applied:**
  - en and fr okYes capitalise the name at sentence start;
  - en prose said "print" the names; it is now "show";
  - en learning goal on "start alike" is now taught (the bear/bus round was added);
  - pt "não vai segurar" (= won't hold something) is now "ficar presa / se prende";
  - sv, da and fi framework naming: Lgr22 förskoleklass chapter (Språk och kommunikation), Fælles Mål for børnehaveklassen (Sprog), and the ops learning area named properly;
  - it toys/baby was checked on a contact sheet: it is a baby, so *bambino* stands.
- **Optional fixes applied:**
  - de Rosa *die Waschbärin*;
  - wording in de, es, it, nl, sv, da and fi;
  - fr *un casque est conseillé*;
  - pt *que é um guaxinim*;
  - no *kompetansemål etter 2. trinn*;
  - fi intro wording;
  - en US spelling;
  - it FIELD re-anchored on *cappello* (*anello* is the apparatus word).
- **Optional fixes not applied:**
  - **no rake → rive:** the picture reads as a rake, and *rake* is bokmål.
  - **A second fi chain step:** there is no third -ava word in the library.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **de intro** names "Rudi Reimbär", and **nl title and intro** name "Rijmbeer Rob". The host is Rosa.
- **pt intro:**
  - names "O Gui" instead of Rosa;
  - says "vagão de rimas por trilhos", although there are no rails and it is a carroça.
- **it intro:**
  - "vagone" for the carretto;
  - "toccando il 🔊", although the child taps the picture.
- **en intro:** "feed Rosa's wagon the words"; the child hangs them on the chain.
- **es intro:** the example "ratón y limón" uses limón, which is no longer in the rounds (the rhyme is true).
