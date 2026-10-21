# #71 — Linc's Fact Chain → THE DOMINO TRACK (RI.K.3, all 11 locales)

ORDER row 71 · id `linc-fact-chain.connect.ri-k-3` (kept).
- **Files:**
  - a new `linc-fact-chain-core.js`;
  - `linc-fact-chain-activity.js` and its html are rewritten. The html no longer loads `fact-connect-core.js` (left untouched) and no longer pins `#lcs-root` to 100 % height.
- **Manifest:** in `linc-fact-chain-activities.json`, edited as text. The old rounds/roundsL10n (tap one of three cards) are replaced by a mirror of the core: rounds per level, per locale.
- **Metadata:**
  - slug, title and intro stay frozen in en, de, fr, es, pt, it and nl (gate hash `79bcd8ae…`);
  - sv, da, no and fi are new: slug, title, intro, and GRADE_OVERRIDE '1'.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Legacy gate:** `verify-fact-connect-core.js` exits 0 with a pointer. `local-test-linc-fact-chain.js` is rewritten.
- **Design and CSS:** design in `designs/071-linc-fact-chain.md`; CSS prefix `lf-`.

## The apparatus and its invention: only a real connection keeps the chain falling
- **The track:** facts are dominoes on a wooden track. One fact stands there; a dashed gap waits beside it (before it in because-rounds). Linc (the library lizard, mirrored to face the track) sits at the left, a bell at the right, and the cards lie in the tray below.
- **Placing a card:** drag a card into the gap (or tap it into the first empty one). It stands with a wobble. Drag it out again, or drag another card in to swap.
- **Check:** Linc pushes the first domino.
  - **A real link:** each next domino falls, and the facts join into the authored sentence on the rail ("The hot sun shines on the snow, so the snow melts."). The run comes to rest leaning domino on domino, the last one on the bell, which rings.
  - **A false link:** the struck domino rocks and stays standing. The one before it leans against it (its angle is computed from the real gap, never through it). The rail shows the two facts with a dashed "So?" between them. Then the wrong card goes back to the tray, and a right third card in a chain stays standing.
- **The three levels:**
  - **What happens next** (7 rounds): the gap comes after; the lures are an order lure (it happens BEFORE) and an unrelated fact.
  - **Why it happens** (8 rounds): 4 so-rounds (gap after; lures: a same-word lure and an unrelated fact) and 4 because-rounds (gap BEFORE; lures: a same-word lure and a direction lure, a real effect that reads wrong in front). Never one direction three times in a row.
  - **Three in a chain** (7 rounds): two gaps; lures: a story lure that fits no gap, and an unrelated fact. A swapped chain stops at the first gap.
- **Misses:**
  - miss 1: the read-together hint (sequence or cause wording);
  - miss 2: the link word (Then / So) is written in the gap, and a card dragged over a gap previews its pair on the rail.
- **Settings:**
  - Level (3);
  - Choices Fewer / More: Fewer drops the unrelated lure (the same-word lure in because-rounds) and keeps the lure that teaches.
- **After the win:** tap a domino to stand the row up; tap Linc to push it again.

## Content decisions (beyond the design)
- **Every joined sentence is authored per locale** (V2 after Dann/Sedan/Så in de/sv/da/no; joten in fi; alors/así que/então/quindi/dus). It is never assembled from the two cards; the gate rejects a concatenation.
- **es ice cream is «helado»**, so it does not collide with «nieve» in the snow rounds. The plant same-word lure is "We forget to water the plant" (not "in the dark": a plant in the dark does grow tall and thin).
- **Length balance:** the right card is the longest in ≤ 40 % of next+cause rounds and in ≤ 4 of 7 chains (50 % is chance there). The same-word lure is at least as long as the right card in ≥ half of the cause rounds. Some lures were lengthened in fr/es/pt/sv/da/no/fi to hold this.

## Native + pedagogy review (one reviewer over every round, card, joined sentence, string, the new metadata and the prose of 11 locales)
- **MUST, all locales — lures that honestly fit a gap (two right answers):**
  - chain/puddles "The sun shines bright." (it can come after rain) → "The puddles dry up."
  - chain/chick "The nest falls in a lake." (a coherent sad ending) → "The bird finds a tree for its nest."
  - chain/bread "You put it in the freezer." (bread can be frozen after baking) → "You buy flour at the shop."
  - SHOULD, chain/balloon "You put it in a box." → "You take a balloon out of the bag."
  - SHOULD, next/snow: the order lure "Dark clouds fill the sky." → "The first snowflakes fall."
- **MUST, all locales — prose truthfulness:** a learning goal said the child uses "because", but the screen shows only then/so. Now "then and so" in every locale.
- **MUST:**
  - es: «Léelos juntos» (dato is masculine);
  - fi: the kite's direction lure «Kaikki ihailevat sitä taivaalla.»; practices «paneminen».
- **SHOULD, applied:**
  - es: «Pon» instead of «Para» (read as the preposition); «El viento se lleva la semilla»; «pone un huevo ahí».
  - da: «fugleunge … ud af ægget», «i reden», «åbner for vandhanen», «badekarret», «Klokken ringer højt», «Lampen bliver tændt».
  - no: «sølepytt», «Klokka ringer høyt», «setter deg i badekaret».
  - sv: «Vinden slutar blåsa».
  - de: «Stöpsel in den Abfluss», «Die Klingel läutet laut».
  - pt: «A campainha toca alto», «rega a semente».
  - fr: «L’herbe se mouille», «La cloche sonne fort», «Un tambour résonne», «en est la cause».
  - fi: «dominopalikoita», «Tapahtuuko se seuraavaksi?», «Tulee tummia pilviä», «Ankka sanoo kvaak».

## FROZEN-NOTEs
- **Intros:** the en, de, fr, es, pt, it and nl intros describe the old tap-a-card game.
- **Grade:** de, fr, es, pt, it and nl keep their shipped grade 2.

## Gates (local, all green)
- **verify-linc-fact-chain-core:** 10380 pass, 0 fail. It covers:
  - the gate's own answer table, with every possible filling of the gaps in every round × locale × More/Fewer, graded by its own walk (where the chain stops, the two facts shown, which cards go back);
  - the swapped chain; the direction lure; what Fewer drops;
  - 2,000 passes: no direction three in a row, never the same order, slots balanced and honoured;
  - authored joined sentences; length balance; same-word lures; strings ×11; picture and floors; the manifest mirror and the frozen hash.
- **mutate-linc-fact-chain:** 15/15 killed.
- **local-test-linc-fact-chain:** 2299 pass, 0 fail. A real pointer through every round × level × 11 locales (empty check, a dragged lure, miss 1, a tapped lure, miss 2 with the gap word, the right cards dragged, the celebration with the joined sentence), plus the real-timing lean, Fewer, and a sweep of all 3 levels × rest/miss/won at 320–1366.
  - **Found by the sweep:** the last domino tipped past the card edge at 320. Its rest angle now comes from the space to the bell.
  - **Found by the probes, not the gates:**
    - a falling domino passed THROUGH the standing one (it now leans on it);
    - reading layout while building made the 62° class rule win, so every repaint restarted a delayed transition (angles are now computed from the layout numbers, and the transition runs only on the push);
    - the given domino wobbled because `undefined === undefined`;
    - English "ev-ery" was hyphenated (hyphenation is now limited to compound languages and words of ≥ 12 letters).
- **visual-qa:** en and fi, 42 renders each, pass; de/pt/fr/nl/da pass at 320. The first run failed SCALE: the rail container inherited 16 px, and it now scales.
- **Other gates:** audit-activity-hierarchy 128/0; audit-settings-efficacy 2 live; both preflights; verify-activity-content ×11.

## Live (2026-10-21)
- Commit `5aa4849f`, deployed (`git pull` → cp the four mini-tools files → `deploy.sh`), preview webp uploaded first. Server: 132 GB free (69 %).
- `live-verify-linc-fact-chain.js`: 51 pass, 0 fail on the second run (the first run after the deploy races the page cache). It covers all 11 pages returning 200, plus en/de/sv/fi at 1366 and 390: the same-word lure dragged into the gap stops the chain (a miss with the hint); the right card dragged in makes the chain fall and the shell read the authored joined sentence; wrapper 9.812; the iframe grows with the card.
- Variety probe en/sv/fi: 7 distinct rounds (the default level), reshuffled per pass.
