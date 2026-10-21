# #70 — Nila's Idea Pond → THE IDEA UMBRELLA (RI.K.2, all 11 locales)

ORDER row 70 · id `nila-pond.main-idea-net.ri-k-2` (kept).
- **Files:**
  - a new `nila-pond-core.js`;
  - `nila-pond-activity.js` and its html are rewritten. The html no longer loads `main-idea-core.js` (left untouched) and no longer pins `#lcs-root` to 100 % height.
- **Manifest:** in `nila-pond-activities.json`, edited as text. The old rounds/roundsL10n (net and fish) are replaced by a mirror of the core: twelve texts per locale.
- **Metadata:**
  - slug, title and intro stay frozen in en, de, fr, es, pt, it and nl (gate hash `e0384a8e…`);
  - sv, da, no and fi are new: slug, title, intro, and GRADE_OVERRIDE '1'.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Legacy gate:** `verify-main-idea-core.js` exits 0 with a pointer. `local-test-nila-pond.js` is rewritten.
- **Design and CSS:** design in `designs/070-nila-pond.md`; CSS prefix `np-`.

## The apparatus and its invention: the rain decides
- **The stage:**
  - **The card:** the lead sentence, with Nila (library otter, reads the text aloud) and the animal.
  - **The pond:** the three detail sentences float on it as lily pads; a cloud and a rail hang over it.
  - **The rail:** four folded umbrellas, each with an idea tag. Canopy colour goes by peg, never by idea.
- **Hanging:** drag or tap an umbrella onto the pond. It opens to the same full width as every other umbrella, so hanging tells the child nothing.
- **Check:** it rains, and the canopy pulls in to exactly what its idea covers:
  - the big idea stays wide over all three pads;
  - a detail idea shrinks over its own pad;
  - an idea that is not in the text folds up over the water between two pads.
  - The pads it leaves out get wet: the ink blurs and they bob under.
- **Step 2:**
  - **reject rounds (bear-warm, bear-cave, bee-flowers, bee-wings, swan-lunch):** a true sentence about the same animal that is not about the big idea drifts in under the umbrella. Push it out into the rain.
  - **supply round (swan-nest):** two pads float at the edge. Pull the one that belongs under.
- **Success:** the shell retells the text in an authored sentence ("This text is about staying warm in the snow. It tells us: …"). Afterwards, tapping the cloud makes it rain again on the dry pond.
- **Misses:**
  - miss 1: rain, the umbrella folds home, "Which idea covers ALL of them?";
  - miss 2: the not-in-text umbrella dims;
  - a third wrong umbrella: the target moves. A sibling text about the same animal takes the place, and the old text comes later in the pass.
- **Settings:**
  - Reading (I read it / Read it to me: auto-reads, with the sentence highlight);
  - Umbrellas 3 / 4 (with 3, the not-in-text idea stays home).
- **A pass:** 12 texts, never one animal three times in a row, a new order every pass. The big idea's peg is balanced: 3 per peg of 4, 4 per peg of 3.

## Content decisions (beyond the design)
- **The bird group is a swan, not a duck.** Every library duck is a duckling (RULINGS), and the texts are about a grown duck and a mother duck. The four duck texts became swan texts with true swan facts: swans glide, dip their heads for plants, build big reed nests and tuck their heads on their backs to sleep. They do not dive for fish and do not quack. Picture: `animals/swan`.
- **Tag lengths are balanced in every locale.** The big idea is the longest tag in ≤ 4 and the shortest in ≤ 4 of 12 rounds, with both 4 and 3 umbrellas (gated). All four tags of a round share one shape: en -ing, infinitive groups (verb last in de/nl), fi -minen.
- **No {topic} insertion anywhere.** The step-2 hints are generic ("One lily pad is not about the big idea"), and every retelling is authored whole per locale.
- **"Read the text"**, not "Listen": TTS exists in 5 of 11 locales.

## Native + pedagogy review (one reviewer over every text, tag, step-2 pad, retelling, string, the new metadata and the prose of 11 locales)
- **MUST, all locales — a false fact:** bear-eat said "It carries some to its cave". Bears do not store food, so it is now "It eats lots of nuts too" in every locale.
- **MUST, all locales — two right answers:** bee-honey's not-in-text idea "sleeping in a nest" is arguably true, because a hive is a bees' nest. It is now "spinning a sticky web". fi already said "a bird's nest".
- **MUST, it:** "farsi il pelo" means "to shave". It is now "cambiare il pelo per l’inverno".
- **SHOULD, applied:**
  - **Every retelling** says "text", not "story" (it is an informational text). The en task line says "Read the text".
  - **bee-flowers pad 3:** "It flaps its tiny wings" was not work in the garden. It is now "It sips sweet nectar".
  - **Brooding verbs:** de «brütet», nl «broedt», da/no «ruger», pt «choca».
  - **de:** «Nahrung», not «Futter», for bees.
  - **sv:** the step-2 instruction word order («Knuffa ut i regnet det näckrosblad som inte hör hit»).
  - **no:** «den tredje gale paraplyen».
  - **es:** «cambiar el pelo para el invierno» (the big idea had copied the lead); «acomodar la cabeza»; «bajo la lluvia».
  - **it:** «veloce» (the invariable adverb) and «esce ronzando».
  - **pt:** «deitar a cabeça nas costas».
  - **fr:** «l’ours change de fourrure pour l’hiver».
  - **fi:** «siivet liikkuvat»; «Luolaan se tekee».
  - **nl:** «Parapluhaak».
- **Tag balance:** the new tags were re-balanced afterwards (pt, it, sv, fi).

## FROZEN-NOTEs
- **Intros:** the en, de, fr, es, pt, it and nl intros describe the old net-and-fish game.
- **Strand overrides:** de/fr/es/pt/it/nl in page.tsx name a listening strand. The activity is now read by the child, with "Read it to me" as an option.

## Gates (local, all green)
- **verify-nila-pond-core:** 17195 pass, 0 fail. It covers:
  - the gate's own coverage table over every round × locale × peg × 3/4 umbrellas: the same full canopy before Check, the true reach after, exactly the uncovered pads wet, only the big idea passes, the reach monotone;
  - step 2: every under/out configuration graded by the gate's rule;
  - 2,000 passes: no animal three in a row, never the same order, the peg balanced, the rails varied;
  - tag length balance and shape per locale;
  - hints, miss-2 dim and the moving target;
  - texts and strings ×11, pictures and floors, the manifest mirror and the frozen hash.
- **mutate-nila-pond:** 16/16 killed.
- **local-test-nila-pond:** 1974 pass, 0 fail. A real pointer through all 12 rounds × 11 locales (empty check, dragged detail umbrella in its peg colour, the rain measured mid-fall, miss 2 dim, step 2 by drag and tap, the retelling), the moving target, both settings, and a width sweep at 320–1366.
  - **Found by the sweep:** the narrowest phone (320×640) overflowed by up to 65 px in de/fi. Fixed with a compact tiny layout (Nila hidden there — Read it to me still auto-reads; tighter pond, sky and rail; hyphenation) and a shorter fi task line.
  - **Also found:** the canopy (a twirl button) below 44 px.
- **visual-qa:** en and fi full (72 renders each), plus de/pt/fr/nl/da at 320, all pass.
- **Other gates:** audit-activity-hierarchy 530/0; audit-settings-efficacy 2 live; both preflights; verify-activity-content ×11.
