# New 241 — The Recycling Bins with Windows → THE LID THAT WILL NOT SHUT ON A STRANGER (NGSS K-ESS3-3)

## 0. Identity
- id `bin-windows.play.k-ess3-3` · grade K · framework NGSS K-ESS3-3 (choose a solution that reduces the impact of humans on the land, water, air) · strand Science · files `bin-windows-core.js`, `bin-windows-activity.js`, `bin-windows-activity.html`, `bin-windows-activities.json` (scaffold `--num=241`).
- Worksheets covered: **K-357** Recycling Sort (draw a line to the bin) · **K-366** Which Bin? (circle the bin) — both are the core play · **K-367** Color the Bins (read each bin's name, colour it as the legend shows) — the Bins-by-name rounds (§6), where the bin's name and its national colour are the content.
- New instrument. **Correctness SoT: the K-357 bank** — `scripts/worksheet-gen/data/b4/recycling.json` (37 items, the MATERIAL of every picture fixed once by opening it, `packaging` flag) and `data/b4/recycling.js` (en) + `data/b4/locales/recycling.<loc>.json` (per locale: the bins in page order, colours, `packagingOnly`, `route`, `excludeItems`, `colorConvention`, `refuse`). The activity uses the bank's join verbatim: `bin(item, loc) = excludeItems[id] ? null : route[id]?.bin ?? first bin whose materials include item.material and (item.packaging || !bin.packagingOnly) ?? null`. It never decides a bin itself.
- The dossier's "food bin blocked" is resolved: the bank's organic items (apple, banana, bread, carrot, orange, leaf, corn, pear, lettuce, potato, tomato, strawberry, pepper) are reviewed pictures and every locale with an organic bin uses them.

## 1. The pitch
"Each bin has a window showing what is already inside, and its lid only shuts when everything inside belongs in that bin — drop a stranger in and the lid bumps down on it and stays open, with the stranger sticking out the top."

## 2. Why a child will want it again
A row of tall, chunky bins in the country's own colours stands across the stage — big rounded lids, a name on a little sign, and low down on each bin a clear window where you can see what is already inside: two glass jars lying in the glass bin, two newspapers-and-envelopes in the paper bin. Drag an empty tin can over the bins and each lid you pass lifts a little, like a mouth opening. Let go over the metal bin: the lid flips open, the can drops in with a clatter, appears in the window lying beside the other metal things, and the lid swings shut with a deep, satisfying *thunk*. Drop it in the paper bin instead and the lid comes down — *bonk* — on the can, which pops up and sticks out over the rim; the paper things in the window shuffle away from it; the lid stays open, rocking slightly, until the child pulls the stranger out. The show at the end: all the lids close one after another down the row like piano keys, *thunk-thunk-thunk-thunk-thunk*, rising in pitch, and the bins give a little hop together.

## 3. The skill and the misconception
- **Skill:** decide which bin an empty or finished thing goes in, by what it is made of and by the local rules (paper and cardboard, glass, plastic, metal, food waste, and — where the country has one on the page — the leftover/residual bin); read a bin's name and know its colour (K-367).
- **Misconceptions and the push-back (mechanism):**
  1. *"All rubbish goes in one bin."* There are always 2–5 bins and a lid only shuts on the things that belong in it; a bin with a stranger in it visibly cannot close.
  2. *"It is plastic, so it goes in the plastic bin"* (a toothbrush, a comb, a toy bucket). In the locales whose bank routes non-packaging plastic to the residual bin (de Restmüll, fr ordures, it secco, nl restafval, no restavfall), the yellow/plastic-packaging bin's lid bumps on the toothbrush — its window holds bottles and tubs (packaging), and the toothbrush is not one of them. The lesson comes from the contents, not a rule printed on screen.
  3. *"Shape tells the bin."* All slots are the same size; a bottle-shaped glass bottle and a bottle-shaped plastic bottle look alike in outline — the window's contents (a clear glass jar vs a squeezy shampoo bottle) are the evidence.
  4. *"Glass and plastic are the same."* Glass jar vs plastic bottle pictures are visibly distinct (the bank opened every picture for this).

## 4. The stage
Layout full width at 704 (the row of bins needs the width); stacked layout below 700.

**At 704 px:**
- **The bins** (a row across 680 px, bottom 330 px): N = the locale's bin count (2–5). Width `min(150, floor((680 − (N−1)·14) / N))` → N 5: 124 px · 4: 159→150 · 3: 150 · 2: 150. Height 300. Each bin is drawn apparatus: a rounded body in the bin's bank `color` whenever it has one (`codeBlue`, `codeYellow`, `codeGreen`, `codeBrown`, `codeOrange`, `codePurple`, `codeRed`, `inkSoft`; measured: de, es, fr, it, no, pt, sv colour every bin, nl four of five — its glass bin has none), otherwise (en, da, fi, nl glass) a neutral warm grey body with a band in a position colour so bins are still distinguishable; a lid (hinged, 3 px ink) with **one identical slot** (the same size on every bin); a name pill on the front (the bank's `label`, 18 px, cream pill); and **the window** — a clear rounded pane low on the body (width − 20 × 200 px) showing the two NEWEST things inside at 96 px, one above the other (two seeded ones at round start); anything older lies behind them as stacked edges (apparatus), so the window never shows a picture under the 96 px floor.
- **The tray** (top, 680 × 130): the round's things at 104 px on a drawn tray.
- **Bins-by-name rounds (K-367):** the bins are uncoloured (white bodies with ink outline), the pills show their names; a paint pot row (apparatus: 5 round pots in the bank colours, 56 px) above.

**At 360 px:** stacked — task → tray as 2 rows of 3 things at 72 px → bins: N ≤ 3 in one row (104 px wide, 230 tall, the window shows the latest 2 things stacked at 64 px); N = 4–5 in two rows (3 + 2 or 2 + 2), 104 px wide, 160 px tall, the window showing only the latest thing at 64 px → Check. At 320: bins 92 px wide, window things 64 px (they may overlap the window frame edge, never the card edge).

**Library pictures:** the bank's 37 items, filtered to those with an activity label: paper `classroom/notebook`, `post-office/envelope`, `post-office/letter`; cardboard `post-office/package`; glass `kitchen-tools/jar`, `at-the-supermarket/jam`, `at-the-supermarket/milk`, `at-the-supermarket/oil`, `breakfast/honey`; plastic `at-the-supermarket/shampoo`, `at-the-supermarket/water`, `beach/sunscreen`, `classroom/glue`, `at-the-supermarket/toothbrush`, `beach/bucket`, `around-the-house/comb`, `kitchen-tools/spoon`; metal `at-the-supermarket/can`, `kitchen-tools/saucepan`, `tools/bolt`; organic `fruits/apple`, `fruits/banana`, `at-the-supermarket/bread`, `vegetables/carrot`, `fruits/orange`, `spring/leaf`, `vegetables/corn`, `fruits/pear`, `vegetables/lettuce`, `vegetables/potato`, `vegetables/tomato`, `fruits/strawberry`, `at-the-supermarket/pepper`. Not available to the activity (no label): `classroom/paper`, the cereal box, the sauce bottle, the nut — so the paper pool is 4 items and the metal pool 3 (sv/fi metal-packaging pool = can only → their metal bin gets 1 item per round, §6).

**Task line** (≤ 24 px): Sort "Each thing is empty or finished. Which bin does it go in?" · By name "Read each bin's name. Paint it its colour."

No words on the apparatus except the bin names, which are the content (and are printed on real bins).

## 5. The hand
- **Drag a thing** from the tray: lifts within 50 ms; as it passes over each bin, that bin's lid lifts 12° (90 ms) and drops back as it leaves.
- **Let go over a bin:** the lid flips open (120 ms), the thing drops through the slot (200 ms), appears in the window at the next free spot (it lands lying down, 4° tilt), and the lid swings shut by itself:
  - all contents agree → *thunk*, the lid closes (240 ms); the thing's tray spot becomes an empty outline. **Right.**
  - a stranger inside → the lid comes down and *bonks* (180 ms) on it; the stranger is pushed up so its top half sticks out over the rim; the window's other things slide 10 px away from it; the lid stays ajar, rocking ±3°. **Miss** (§7).
- **Pull a stranger out:** tap or drag the sticking-out thing — it lifts back to its tray spot, the lid closes on the agreeing contents.
- **Bins-by-name:** drag a paint pot onto a bin: the body fills with that colour (a 300 ms wipe from the bottom). A wrong colour can be painted over.
- **Free play:** after success, any lid can be tapped to open and close; things can be lifted from windows and re-dropped until Next.
- Sound (optional): lid creak, the material's drop sound (glass clink, can clatter, paper rustle, soft thud for food), *thunk*, *bonk*; TTS reads the task line and the bin names (5 locales).

## 6. The rounds
One round = 6 things, sorted. Each bin is the answer 1–2 times per round (es-MX: 3 + 3), so over a pass of 9 rounds every bin is answered 9–18 times; measured per locale.

**en table** (bins in page order: Paper · Plastic · Glass · Metal · Compost; window seeds in brackets are never in that round's tray):
| # | things → bin | window seeds |
|---|---|---|
| 1 | notebook→Paper, water→Plastic, jar→Glass, can→Metal, apple→Compost, shampoo→Plastic | Paper [envelope, package] · Plastic [glue, sunscreen] · Glass [jam, honey] · Metal [bolt, saucepan] · Compost [bread, carrot] |
| 2 | envelope→Paper, jam→Glass, saucepan→Metal, banana→Compost, glue→Plastic, package→Paper | Paper [notebook] · Plastic [water, comb] · Glass [milk, oil] · Metal [can, bolt] · Compost [leaf, pear] |
| 3 | letter→Paper, milk→Glass, bolt→Metal, carrot→Compost, sunscreen→Plastic, oil→Glass | Paper [package, notebook] · Plastic [shampoo, toothbrush] · Glass [jar, honey] · Metal [can, saucepan] · Compost [apple, corn] |
| 4 | package→Paper, honey→Glass, can→Metal, corn→Compost, toothbrush→Plastic, orange→Compost | rule below |
| 5 | notebook→Paper, oil→Glass, saucepan→Metal, lettuce→Compost, bucket→Plastic, envelope→Paper | rule below |
| 6 | letter→Paper, jar→Glass, bolt→Metal, tomato→Compost, comb→Plastic, milk→Glass | rule below |
| 7 | package→Paper, jam→Glass, can→Metal, potato→Compost, spoon→Plastic, bolt→Metal | rule below |
| 8 | envelope→Paper, honey→Glass, saucepan→Metal, strawberry→Compost, water→Plastic, pear→Compost | rule below |
| 9 | notebook→Paper, milk→Glass, can→Metal, pepper→Compost, shampoo→Plastic, letter→Paper | rule below |
Window seeds for rounds 4–9: for each bin, the first two items of that bin's pool (in the §4 list order) that are not in the round's tray **and share no `family` with anything in the tray or the other windows** (the bank's rule: the envelope and the letter are one family, `env`, and never stand on one page — round 2 and round 3 above were corrected for exactly this). A bin may seed only one thing when its pool runs out; it never seeds a stranger.
(en is single-stream in many US towns; the bank sorts by material, and its en scheme sentence says so — that sentence goes in the landing, not on the stage.)

**Other locales:** the same 9-round shape is composed by the core from the bank with a fixed per-locale seed table (stored in the manifest, so the rounds are a reviewed fixed list, not random at play time): pick 6 things whose `bin(item, loc)` is non-null, each bin 1–2 per round, no two things sharing a `family`, ≥ 1 "route" thing per round in locales with routes (the toothbrush/comb/spoon/bucket → residual lesson), window seeds 2 per bin from the remaining pool. Examples of the resolved bins:
- **de** (Papier · Verpackung (Gelbe Tonne) · Bio · Glas · Rest): toothbrush, comb, spoon, bucket → **Rest**; water bottle and milk → **excluded** (Pfand, returned to the shop — the bank's ruling); saucepan, bolt → excluded (Wertstoffhof).
- **fr** (Emballages (jaune; paper + packaging) · Verre · Biodéchets · Ordures): notebook → Emballages; toothbrush → Ordures.
- **es** (es-MX, 2 bins: Orgánico · Inorgánico): food → Orgánico, everything else → Inorgánico — the 2-bin round still has 6 things (3 + 3).
- **pt** (5 bins, national colours: Papel azul · Plástico vermelho · Vidro verde · Metal amarelo · Orgânico marrom).
- **sv** (Papper · Plast · Metall · Glas · Matavfall; plastic and metal are packaging-only): toothbrush, comb → excluded; metal pool = can only → Metall answered once per round, saucepan/bolt excluded.
- **nl** (Papier · GFT · PMD · Glas · Restafval), **it** (Carta · Plastica · Vetro · Umido · Secco), **no** (Papir · Plast · Glass/metall · Matavfall · Restavfall), **da** (5, no national colours), **fi** (5, no national colours; Biojäte first).
A locale whose resolved pool is thin for one bin (**sv** metal: packaging only, so the can alone — fi's metal bin is not packaging-only and keeps can, saucepan, bolt) alternates: in odd rounds the can is in the tray (Metall answered once) and the window is empty; in even rounds the can is the window seed and Metall gets nothing. The gate measures each bin's count per pass against the bank's real pool size, never a filler.

**Bins setting · fewer:** only the recycling bins (the locale's bins minus organic and residual); things whose bin is organic or residual leave the pool. es-MX (2 bins) shows both in both settings.

**Bins-by-name rounds (K-367; 7 rounds, only in locales whose bank does not refuse the K-367 face — measured from `refuse`: **de, es, fr, it, no, pt** ship it; **en, nl, sv, da, fi** refuse `color` and skip these rounds. es-MX has 2 bins, so its pots are green, grey + 1 decoy):** the locale's bins uncoloured; the paint pots = the locale's bin colours + 1 decoy colour; each round shuffles the bin order (so position never tells) and the pot order.

- **Answer position:** bins stand in the bank's page order (the order is the locale's content — the K-357 bank fixes it); tray order is shuffled so that each bin's things occupy each tray slot ≤ 40 % across a pass (gate); window seeds are distinct from the tray.
- **Order:** order-only reshuffle per pass (`nextTask`).

## 7. Check, the misses, the success
- **Check with things left in the tray** → hint, no miss: "Some things are still in the tray. Put each one in a bin."
- **Miss 1 (a stranger in a bin):** the lid bonks and stays ajar with the stranger sticking out (§5); the window things of the RIGHT bin give one little shuffle and its lid lifts 8° — the twins call. Bubble "That one does not belong with these. Look in the windows." (+ in route locales, when the stranger is a non-packaging plastic in the packaging bin: "Look: this bin is for packaging." — stored per locale).
- **Miss 2 (same thing, wrong again):** the right bin's window glows and its lid stays open, waiting · "Try the bin that is open."
- **By name — miss:** a wrong colour paints, then the name pill wobbles and the legend pot of the right colour lifts (miss 2 only) · "Read the name. Which colour is that bin?"
- A new move takes the help away until the next Check.
- **Success:** the lids close one after another down the row, rising in pitch, the bins hop together; bubble "Every bin is shut — every thing is in its own bin." · By name "Every bin has its colour."

## 8. Settings
1. **Bins:** fewer (the recycling bins) · all (the locale's full set incl. food and residual) — at rest: 3–4 vs 5 bins (es-MX 2 in both; the drawer hides the setting there).
2. **Window:** shows what is inside · empty — at rest: two seeded things per window vs empty windows (harder: the child must know the bin from its name and colour alone).

## 9. Words (EN source)
- title "The Bins with Windows" · instruction "Look in each bin's window, then drop every empty or finished thing into the bin where it belongs — a lid only shuts when everything inside goes together."
- prompts: promptSort "Each thing is empty or finished. Which bin does it go in?" · promptName "Read each bin's name. Paint it its colour."
- hints: hintTray "Some things are still in the tray. Put each one in a bin." · hintStranger "That one does not belong with these. Look in the windows." · hintPackaging "Look: this bin is for packaging." · hintOpen "Try the bin that is open." · hintName "Read the name. Which colour is that bin?"
- celebrations: celebrateSort "Every bin is shut — every thing is in its own bin." · celebrateName "Every bin has its colour."
- bin names and colours: the bank's `label` / `colorWord` per locale (never authored here).
- aria: ariaBin "{label} bin, {n} things inside" · ariaStuck "{thing} does not fit with the others — the lid is open".
- settings: setBins "Bins" · binsFewer "Fewer" · binsAll "All" · setWindow "Window" · windowFull "Shows what is inside" · windowEmpty "Empty".
- **Locale traps:** the whole bin system is per country (the K-357 bank is the authority, each locale reviewed by its panel): de Gelbe Tonne = packaging only, Pfand bottles excluded; fr yellow bin takes paper too; es-MX two bins (SEP); nl PMD; sv FTI packaging bins; no glass+metal together; it umido/secco; da/fi neutral colours. Item names come from the bank's labels/vocab ("letter" = an envelope with a letter; de "Mutter" for the nut is a vocab trap — the nut is not used). "Empty or finished" (fr "vide ou fini", de "leer oder aufgebraucht", fi "tyhjä tai loppuun käytetty") stored whole. Colour words for K-367 from the bank's `colorWord`.

## 10. Sound off, access, phones
- Sound off: the lid shutting or staying open on a stranger, the stranger sticking out, the window contents shuffling away — all visual.
- Keyboard: Tab to a tray thing, ← / → move along the bins (the lid lifts on focus), Enter drops; Tab to a stuck stranger, Enter pulls it out. By name: Tab to a pot, Tab to a bin, Enter paints.
- aria-live per drop ("Can: metal bin — the lid shut").
- Taps: tray things 72–104 px; bins ≥ 92 px wide, whole bin is the drop target; pots 56 px; Check 48 px.
- Pictures: tray 104 px and window things 96 px at 704; tray 72 px and window things 64 px at 360.
- Fold at 360 × 740: N ≤ 3: 56 + 52 + tray 168 + bins 240 + Check 56 = 572 px; N = 4–5: 56 + 52 + 168 + 2 × 170 + 56 = 672 px. At 320 × 640, N = 5: tray 2 × 76, bins 2 × 150 → 616 px. Check above both folds.

## 11. Distinct from
- **The Sorting Chutes** (row 35: a conveyor drops things down chutes into graph tubes, then the tubes are read) — counting and graphing; here the bins judge their own contents and the lid's shutting is the check; nothing is counted.
- **The Where-From Thread** (234, same batch) — where a thing came from; this is where it goes when it is finished.
- **sorting-hoops** — a hidden rule; here the rule is the country's real bin system, shown by the windows.

## 12. Build plan
- **Model (core):** `state = { loc, binsSetting, windowSetting, bins:[{key,label,color,contents:[]}], tray:[ids], stuck:{binKey:id}|null, misses:{} }`. `binFor(id)` = the bank join (imported data, not re-derived); `drop(id, binKey)` → right iff `binFor(id) === binKey`, else the item is stuck in that bin; `pullOut(binKey)`; `paint(binKey, color)` (K-367); `check()`; `nextTask`.
- **Gate ground truth (`verify-bin-windows-core.js`):** its OWN copy of the join and of every locale's bins/routes/excludes, asserted equal to the bank (drift fails); every round thing resolves to a non-null bin in that locale; window seeds resolve to their bin and are not in the tray; each bin answered 1–2 times per round (3 in es-MX); ≥ 1 route thing per round in route locales; no excluded item in a locale; K-367 rounds only in national-convention locales; tray-slot balance ≤ 40 %; all bin slots the same size (the slot width is one constant).
- **Mutations:** the join replaced by material-only (toothbrush → plastic in de) · a Pfand bottle offered in de · a stranger accepted (lid shuts) · window seed also in tray · bins in a shuffled order (page order broken) · slot size by bin · K-367 rounds in en · organic bin present in "fewer" · tray order fixed · es-MX shown 3 bins · stuck item not pull-out-able · Check with tray items succeeds.
- **Pictures to re-open at 64 px (window size):** jar vs water bottle (glass vs plastic must stay distinct at 64), milk (a GLASS milk bottle), honey (glass jar), envelope vs letter (two envelopes — the bank never puts them on one page: `family: env`, same rule here).
- **BLOCKED:** nothing. Wanted: activity labels for `classroom/paper`, the cereal box, the sauce bottle and the nut (they are reviewed in the bank) — they widen the paper and metal pools.

## 13. The four questions
1. **Choose it again?** Lids that open like mouths as you pass, satisfying thunks, a stranger that sticks out and makes the lid rock, a piano of closing lids — yes.
2. **On the board?** The country's own bins with their own names and colours, sorted by the reviewed local rules — a teacher can trust it in Munich, Lyon or Mexico City.
3. **Parent trust?** Exactly the bins at home, calm sounds, no scores.
4. **The invention:** "A bin's lid only shuts when everything inside goes together — put a stranger in and the lid bumps down on it and stays open, while the window shows what belongs."

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **The lid's rule is now stated truthfully:** "shuts when everything inside belongs in that bin", not "the same kind of thing" — the de packaging bin legally holds plastic AND metal, and the residual bins hold non-packaging plastic; a "same kind" claim would teach the wrong rule. Pitch, misconception, celebration fixed.
- **K-367 locales corrected from the bank's `refuse` field:** de, es, fr, it, no, pt ship the colour rounds; en, nl, sv, da, fi refuse them (the design had nl and sv in and es out). Bin bodies use each bin's own bank colour (nl colours 4 of 5).
- **Window seeds obey the bank's family rule** (envelope and letter never on one page) — en rounds 2 and 3 corrected; sv's one-picture metal pool alternates tray / window instead of contradicting itself; fi's metal pool was wrongly called thin.
- **Picture floor:** window things were 64 px at 704; the window is now 200 px tall and shows the two newest things at 96 px, older ones as stacked edges.
- Checked: all 37 bank items' materials; en has no routes or excludes (every bin packagingOnly:false), so the en table's 6 things per round, each bin 1–2 times, resolve as written.
