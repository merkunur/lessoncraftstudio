# New 217 — The Article Caps (L.1.1.h)

## 0. Identity
- **id** `article-caps.play.l-1-1-h` · **grade** K (stretching into G1) · **framework** Common Core L.1.1.h (determiners), readiness for L.K.1 · **strand** Language · **files** `mini tools/article-caps-core.js`, `article-caps-activity.js`, `article-caps-activity.html`, `article-caps-activities.json` · **key** `article-caps`
- **worksheets covered:** K-288 "A or An?" (pictures, circle the article) · K-306 "Circle the Right Word: Four Pictures" · K-307 "… Eight Pictures" · K-348 "A or An: Word Cards with the Article" (say each word with its article) · G1-292 "Sort the Words" (word only, write it under its article) · absorbed: G1 "The Article Garages" (`article-garages`) → the **Sort shelf** setting.
- **locales:** en de fr es it pt nl sv da no. **fi: refused** (Finnish has no articles; recorded). The fi face of K-288 (yksikkö / monikko) is a number skill and is owned by the plural activity (Daisy's Plate Stack row), not here.

## 1. The pitch
"Every word wears its article like a cap: at Check the right caps click down and the wrong ones pop off — the *an* cap's little bridge only joins smoothly onto a vowel *sound* — and every capped word files itself onto the shelf beside the words that share its article."

## 2. Why a child will want it again (the fun)
- The caps are toys: fat little peaked caps on a peg rail, each with its article printed on the crown. Pick one up and it swings from the finger like a real cap on a string (a ≤ 6° pendulum that settles in 300 ms). Drop it on a picture and it lands with a soft "plop" and a 2-frame squash.
- Each picture stands on a little plinth with its word on the plate. A capped picture *wears* its article: the word plate rewrites itself with the cap word in front — "ein Apfel", "l'ananas", "ett äpple" — so the child sees the phrase they built.
- At Check the right caps **click down** one by one, left to right (a ratchet tick each, 120 ms apart), the phrase plate glows and the picture does a tiny proud hop. Wrong caps pop up, wobble and slide back to their peg — nothing breaks, nothing turns red.
- **The earned show — the Cap Shelf.** When a round is right, the four capped pictures shrink and slide on a curve (450 ms) onto the shelf under the cap rail, each lining up under *its own* article's peg. Over the pass the shelf fills into columns — all the *der* words, all the *die* words, all the *das* words — the language's word families, built by the child's own hand. At the end of the pass the full shelf ripples (each column bobs in turn) and stays as a trophy until the next pass.
- Between rounds (free play): drag any cap onto any shelf picture to *try* it — the plate shows that phrase while the cap sits, then the cap floats home. Children love trying "die Hund" and seeing it written; that is how the wrong ones start to look wrong.

## 3. The skill and the misconception
- **Skill.** Choose the article that belongs to a noun: en *a/an* by the first **sound** of the next word; every other locale by the noun's **grammatical gender** (de der/die/das, ein/eine; fr le/la/l', un/une; es el/la, un/una; it il/lo/la/l', un/uno/una/un'; pt o/a, um/uma; nl de/het; sv en/ett; da en/et; no en/et). K-348's "say each word with its article, just as it is written" = the phrase plate.
- **Misconception 1 (en): choosing by the first LETTER.** Pushback is in the material: on Check a small **join arc** links the end of the article to the start of the word (the n of *an* flowing into the vowel). The right pair makes one smooth curve; *a apple* shows a **bump** (two vowel sounds collide: the arc kinks up); *an banana* shows a **snag** (the n's arc hits the consonant and kinks down). *a uniform* is smooth even though u is a vowel letter, because the join follows the **sound** /j/ — the round where letter and sound disagree, and the arc refuses the letter rule.
- **Misconception 2 (gendered): choosing by meaning** ("a girl is *die*", "a hen is a lady, so *la*"). Pushback is the **Cap Shelf**: it sorts by article, so *das Mädchen* lands beside *das Pferd* and *das Schwein*, *die Giraffe* beside *die Tasse*. Meaning-lure nouns are placed deliberately (§6), so the shelf visibly refuses meaning as the sorting rule.
- **Misconception 3 (it/fr): elision and *lo*.** The l' cap is narrower, with an apostrophe hook on its brim; it only seats on a vowel-initial word (l'elefante, l'ananas). The *lo* cap seats only on masculine s+consonant / z / gn / ps words (lo struzzo, lo zaino). "la zebra" shows that z does not force *lo* on a feminine word.

## 4. The stage
Apparatus is drawn geometry in the shell palette (cream #FBF3E4, teal #146B5E, coral #F2784B, 2.5 px ink #3A3530 outlines). Library pictures only, via `lcs-pictures.js`, colour themes only.

**704 px (content width ≈ 656):**
- **Task line** (top, 20 px Nunito 700, one line) — §9.
- **Cap rail** (y 56, height 96): a teal rail (rounded bar 8 px) with 2–4 pegs spread over 480 px, centred. On each peg a **cap** 96×68: crown = half-ellipse, brim = flat lens 104×14. Crown colour by **peg position** (peg 1 teal, 2 coral, 3 mustard #E8B54A, 4 plum #8E5A9B) — never by gender, so colour never carries a rule (de's school colours blue/red/green are deliberately NOT used: the task would become colour matching). The article in Baloo 2 700, 30 px, white on the crown. **l'** cap: crown 76 wide with an apostrophe hook on the brim. **an** cap: a small bridge arch 18×10 on the right of its brim (the n that will join).
- **Plinth row** (y 176, height 228): 4 plinths, each 148 wide, 12 px gaps. A plinth = a library picture in a **116 px** box standing on a **word plate** 132×36 (cream, ink border). The word: 24 px Nunito 800, the noun exactly as `image-vocabulary.js` spells it (de nouns keep their capital *Apfel*; other locales lower-case). A capped plate reads "<article> <noun>" (fr/it elided without a space: "l'ananas"). The cap sits on the picture's **head point** = top-centre of the picture's measured ink box (it sits on a horse's back, not floating above an ear).
- **8-picture setting:** two rows of 4 plinths, picture 96 px, plate 28 tall with a 20 px word; row height 168.
- **Check** (shell) right-aligned under the plinths at y ≈ 420; the feedback bubble to its left.
- **Cap Shelf** (y 470, height 120): a pale wooden shelf split into one column per cap, each headed by a mini copy of its cap (40×28). Thumbnails: 48 px picture + 13 px word, two deep, wrapping inside the column; overflow shows "+n".
- Total ≈ 610 px — no empty band.

**360 px (content width ≈ 328):**
- Cap rail 76 tall; caps 72×52, article 24 px; four caps (it) span 4×72 + 3×10 = 318 px.
- Plinths 2×2, cell 156×176, picture 96 px, plate 30 tall, word 20 px.
- 8-picture: 4 columns × 2 rows, cell 78×120, picture 64 px, word 14 px (the plate shrinks the word to fit; the pool rule "≤ 9 letters in 8-mode" keeps out *Briefumschlag*-length words).
- Check above the fold: 4-mode bottom ≈ 56 + 76 + 2×176 + 60 = 544 px; 8-mode ≈ 432 px (both < 640).
- The Cap Shelf collapses to a 56 px strip of columns (thumbnail 36 px, no word — the mini cap and the picture carry it), scrolling horizontally with `justify-content: safe center`.
- **320 px:** caps 64×48, cell 144 wide, picture 88 px.

**Words on the apparatus:** only the article words (they ARE the content) and the nouns on the plates.

## 5. The hand
- **Pick a cap** (pointerdown on a peg cap): a copy lifts (the peg keeps its cap — endless supply), scales 1.08, swings under the finger (damped ≤ 6°, 300 ms), shadow below. Transform-only, answers in < 16 ms.
- **Hover a plinth:** it lifts 3 px and its head point shows a dashed 40 px landing ring. No phrase preview — the phrase is written only on drop (commit, then see).
- **Drop on a plinth:** the cap lands on the head point (180 ms ease-out + 2-frame squash), a soft 220 Hz wood "plop". The plate rewrites to "<article> <noun>" with a 150 ms reveal of the article. One cap per plinth: a second drop replaces the first (the old one floats home, 250 ms).
- **Drop elsewhere:** floats back to its peg (250 ms).
- **Take a cap off:** drag it off, or tap it (it floats home; the plate shows the bare noun again).
- **Tap a plate:** TTS reads what the plate says (`LCSAudio`, page locale; silent where the voice is missing — nothing depends on it).
- **Keyboard / tap-tap:** Tab to a cap → Enter picks it up (lifted state on its peg); Tab/arrows to a plinth → Enter drops; Esc puts it back. Tap a cap, then tap a plinth = the same path for small hands.
- **Undo:** everything before Check.
- **Free play:** after a right round, any cap can be tried on any shelf picture (the phrase shows while it sits, then the cap floats home after 1.2 s). No kink, no miss — exploring is free.

## 6. The rounds
A round = 4 plinths (or 8); each must wear a cap; one right article per noun (the locale's grammar from the vocabulary gender; en by the sound rule with the EN_EXCEPTIONS / EN_AMBIGUOUS tables of `scripts/worksheet-gen/data/b2/articles.js`, re-implemented in the core). Plinth order is reshuffled every visit (an answer belongs to a noun, not a place). **Balance per pass:** two caps → each article 40–60 % (the nl/sv/da/no tables sit at 42 % *het/ett/et/et*, inside the band); three or four caps → each ≤ 40 %; it ≥ 1 *lo* and ≥ 2 *l'*; fr ≥ 2 *l'*; no round is all one article.

Pictures seen on contact sheets (`des/contact/b4-articles-en.png`, farm-animals, animals, fruits, toys, vehicles, kitchen-tools): apple, orange, owl (animals, blue), elephant, iguana, ostrich, onion, eagle, igloo, astronaut, acorn, eggplant, accordion, umbrella, uniform (reads as a shirt — so the plate word is always shown), hat, horse. **Refused:** easter/egg (painted egg), fruits/cherry · plum · peach · apricot · nectarine (drawn as apples), car/boat/airplane/jet (EN_AMBIGUOUS), body parts (disembodied), people except toys/girl (the de/nl meaning lure).

**EN (a / an), 4 pictures, 9 rounds — an 18 / a 18 = 50 %**

| # | pictures → answer |
|---|---|
| 1 | fruits/apple **an** · farm-animals/cow **a** · animals/owl **an** · toys/kite **a** |
| 2 | animals/elephant **an** · accessories/hat **a** (h = consonant sound) · fruits/pear **a** · toys/robot **a** |
| 3 | winter/igloo **an** · accessories/umbrella **an** · miscellaneous/acorn **an** · music/drum **a** |
| 4 | birds/eagle **an** · clothing/uniform **a** (the letter-vs-sound round) · vegetables/onion **an** · toys/ball **a** |
| 5 | space/astronaut **an** · farm-animals/horse **a** · insects-and-bugs/ant **an** · music/guitar **a** |
| 6 | animals/iguana **an** · farm-animals/hen **a** · kitchen-tools/cup **a** · animals/tiger **a** |
| 7 | ocean-life/octopus **an** · fruits/avocado **an** · vegetables/eggplant **an** · vehicles/bus **a** |
| 8 | birds/ostrich **an** · vehicles/yacht **a** (y = consonant sound) · post-office/envelope **an** · accessories/crown **a** |
| 9 | fruits/orange **an** · music/accordion **an** · animals/zebra **a** · animals/penguin **a** |

**EN 8 pictures, 7 rounds (56 nouns, an 28 = 50 %):** rounds 1–4 = table rounds (1+2), (3+4), (5+6), (7+8); round 5 = round 9 + around-the-house/oven, farm-animals/ox, zoo-animals/otter, furniture/armchair (all **an**; round 5 = an 6 / a 2); round 6 = vehicles/ambulance, accessories/apron, zoo-animals/antelope, around-the-house/iron (**an**) + farm-animals/dog, farm-animals/duck, toys/truck, toys/train (**a**); round 7 = reptiles-and-amphibians/alligator, winter/icicle (**an**) + farm-animals/goat, farm-animals/sheep, toys/bucket, vehicles/tractor, vehicles/taxi, farm-animals/pig (**a**). Totals an 28 / a 28. (Build opens oven, otter, ox, armchair, ambulance, apron, antelope, iron, alligator, icicle on a contact sheet before freezing; a refused one is replaced from the same initial-sound class.)

**DE definite (der / die / das) — 12 / 12 / 12**

| # | answers |
|---|---|
| 1 | Hund der · Katze die · Pferd das · Ball der |
| 2 | Kuh die · Schwein das · Apfel der · Banane die |
| 3 | Henne die · Hahn der · **Mädchen das** (toys/girl) · **Kaninchen das** — the meaning-trap round |
| 4 | Elefant der · Giraffe die · Zebra das · Eule die |
| 5 | Fuchs der · Schaf das · Ente die · Roboter der |
| 6 | Pinguin der · Kamel das · Birne die · Fahrrad das |
| 7 | Bus der · Boot das · Krone die · Hut der |
| 8 | Löffel der · Messer das · Tasse die · Erdbeere die |
| 9 | Pilz der · Auto das (vehicles/car) · Haus das · Gitarre die |

**DE indefinite (ein / eine) — 18 / 18:** the definite table with six swaps so *eine* reaches 18: Ball→Ziege, Roboter→Gans, Hut→Rakete, Löffel→Gabel, Fahrrad→Uhr, Haus→Trommel. The shelf then shows that *ein* serves both der and das words.

**IT definite (il / lo / la / l') — 10 / 4 / 11 / 11**

| # | answers |
|---|---|
| 1 | cane il · mucca la · elefante l' · **struzzo lo** |
| 2 | gatto il · pecora la · ape l' · ombrello l' |
| 3 | cavallo il · capra la · anatra l' · pera la |
| 4 | maiale il · **squalo lo** · gallina la · aquila l' |
| 5 | gallo il · giraffa la · asino l' · ananas l' |
| 6 | pinguino il · **zebra la** (z, but feminine) · **scoiattolo lo** · avocado l' |
| 7 | robot il · treno il · palla la · orologio l' |
| 8 | cappello il · **zaino lo** · corona la · arancia l' |
| 9 | cucchiaio il · banana la · fragola la · oca l' |

**IT indefinite (un / uno / una / un'):** the same nouns. *un'ape, un'anatra, un'aquila, un'arancia, un'oca* (feminine vowel) against *un elefante, un ombrello, un asino, un ananas, un avocado, un orologio* (masculine vowel — **no apostrophe**, the classic trap: the un' cap seats only on feminine vowel nouns); *uno struzzo, uno squalo, uno scoiattolo, uno zaino*.

**FR definite (le / la / l') — 13 / 13 / 10**

| # | answers |
|---|---|
| 1 | chien le · vache la · éléphant l' · ballon le |
| 2 | chat le · poule la · abeille l' · banane la |
| 3 | cheval le · chèvre la · âne l' · robot le |
| 4 | cochon le · girafe la · ananas l' · poire la |
| 5 | coq le · fraise la · avocat l' · orange l' |
| 6 | lapin le · fusée la · oignon l' · tasse la |
| 7 | renard le · train le · aigle l' · fourchette la |
| 8 | bus le · couronne la · autruche l' · guitare la |
| 9 | chapeau le · couteau le · écureuil l' · tortue la |

**FR indefinite (un / une):** same nouns, l'-nouns resolved by gender (un éléphant, une abeille…); *une* kept in 16–20 by swapping masculine nouns for feminine ones from the pool (chèvre, poule, vache are already in; add oie, pomme, montre, cuillère as needed). h-aspiré nouns (hibou, hamster) and y-nouns (yacht) are **refused** (the K-288 fr panel ruling).

**Every locale's table is written out here** (labels and genders read from `mini tools/pictures/*.json` — the per-locale gender authority — by the critic, 2026-10-17); the build freezes them into `article-caps-rounds.json` and the reviewer reads them. Refusals applied: es feminines with stressed initial á- (*águila* takes *el*); pt invariant/plural-form entries (blocks, cards, crayons, dice, chess); fr h-aspiré and y-words (*hibou*, the library owl, is out); nouns with two accepted genders (de *Iglu*); **no: feminine-capable nouns refused** (ku, høne, and, ugle, krone, geit, dør, seng …), so *en* is the only article any Norwegian teacher writes — the *ei* cap is not offered.

**ES definite (el / la) — 18 / 18** (es-MX vocabulary: *papalote*, *plátano*)

| # | answers |
|---|---|
| 1 | perro el · vaca la · manzana la · robot el |
| 2 | gato el · gallina la · pelota la · tren el |
| 3 | caballo el · jirafa la · cohete el · fresa la |
| 4 | cerdo el · oveja la · sombrero el · corona la |
| 5 | gallo el · cebra la · elefante el · taza la |
| 6 | conejo el · cabra la · cuchillo el · cuchara la |
| 7 | pato el · abeja la · tenedor el · casa la |
| 8 | pingüino el · tambor el · camello el · guitarra la |
| 9 | autobús el · bicicleta la · pera la · naranja la |

**ES indefinite (un / una):** the same nouns, el → un, la → una (18 / 18).

**PT (pt-BR) definite (o / a) — 18 / 18** (the fruit lure: *o morango*, *o abacaxi* against *a maçã*, *a banana*, *a pera* — fruit is not a gender)

| # | answers |
|---|---|
| 1 | cachorro o · vaca a · maçã a · robô o |
| 2 | gato o · galinha a · bola a · trem o |
| 3 | cavalo o · girafa a · foguete o · banana a |
| 4 | porco o · ovelha a · chapéu o · coroa a |
| 5 | galo o · zebra a · elefante o · xícara a |
| 6 | coelho o · cabra a · garfo o · colher a |
| 7 | pato o · abelha a · morango o · casa a |
| 8 | pinguim o · violão o · abacaxi o · faca a |
| 9 | ônibus o · bicicleta a · pera a · laranja a |

**PT indefinite (um / uma):** the same nouns (18 / 18).

**NL definite (de / het) — 21 / 15** (*het* 42 %; meaning lure: *het meisje*, toys/girl)

| # | answers |
|---|---|
| 1 | hond de · paard het · appel de · bed het |
| 2 | kat de · varken het · bal de · glas het |
| 3 | koe de · konijn het · eend de · kopje het |
| 4 | olifant de · schaap het · hoed de · mes het |
| 5 | giraf de · **meisje het** · kroon de · huis het |
| 6 | uil de · lam het · lepel de · raam het |
| 7 | vos de · vliegtuig het · trein de · robot de |
| 8 | pinguïn de · schip het · fiets de · aardbei de |
| 9 | banaan de · hart het (shapes/heart) · sleutel de · stoel de |

**SV indefinite (en / ett) — 21 / 15** (*ett* 42 %)

| # | answers |
|---|---|
| 1 | hund en · äpple ett · katt en · hus ett |
| 2 | häst en · får ett · boll en · tåg ett |
| 3 | ko en · päron ett · gris en · paraply ett |
| 4 | banan en · lamm ett · höna en · flygplan ett |
| 5 | tupp en · skepp ett · kanin en · bord ett |
| 6 | elefant en · hjärta ett · giraff en · glas ett |
| 7 | uggla en · fönster ett · räv en · anka en |
| 8 | robot en · föl ett · pingvin en · cykel en |
| 9 | buss en · tält ett · båt en · krona en |

**DA indefinite (en / et) — 21 / 15**

| # | answers |
|---|---|
| 1 | hund en · æble et · kat en · hus et |
| 2 | hest en · får et · bold en · tog et |
| 3 | ko en · jordbær et · gris en · ur et (around-the-house/clock) |
| 4 | banan en · lam et · høne en · skib et |
| 5 | hane en · telt et · kanin en · bord et |
| 6 | elefant en · hjerte et · giraf en · glas et |
| 7 | ugle en · vindue et · ræv en · and en |
| 8 | robot en · føl et · pingvin en · cykel en |
| 9 | bus en · egern et (camping/squirrel) · båd en · krone en |

**NO (bokmål) indefinite (en / et) — 21 / 15** (masculine-only *en* nouns, see refusals)

| # | answers |
|---|---|
| 1 | hund en · eple et · katt en · hus et |
| 2 | hest en · tog et · ball en · lam et |
| 3 | gris en · skip et · banan en · bord et |
| 4 | hane en · hjerte et · kanin en · glass et |
| 5 | elefant en · vindu et · sjiraff en · føll et |
| 6 | rev en · telt et · robot en · jordbær et |
| 7 | pingvin en · fly et · sykkel en · tiger en |
| 8 | buss en · ekorn et (camping/squirrel) · båt en · kopp en |
| 9 | stol en · esel et (farm-animals/donkey) · fisk en · drage en (toys/kite) |

**IT indefinite** and **FR indefinite** as written above. Every table: ≥ 1 of each article per round; the most frequent article ≤ 58 % (two caps) / ≤ 40 % (three or four caps) per pass; plates show the vocabulary singular exactly (de capitalised, all others lower-case).

**Sort shelf (G1-292 / Article Garages):** 9 rounds of 6 **word cards** (no picture; cream card 120×52, word 22 px) from the same table, dragged into the cap columns of the Cap Shelf, which grows to full height (the plinth row hides). Check works the same.

**Answer position:** the answer is a property of the noun; plinth order reshuffles every visit. The gate measures (a) the strategy "always the most frequent article" scores ≤ 60 % (two caps) / ≤ 40 % (three or four caps) per pass in every locale × set; (b) plinth order is never a tapping rhythm (`answer-slots.tappingRhythm`); (c) no round is all one article.

**Order:** rounds reshuffle per pass (order only, never the same sequence twice running); the shelf empties at the start of a pass.

## 7. Check, the misses, the success
- **Check with a bare plinth** → no miss; bare plinths bounce once. "Every picture needs a cap."
- **Miss 1** → right caps click down and stay; each wrong cap pops up, wobbles and floats home, and under its plinth the **right phrase writes itself in faded ink** for 2.4 s ("an umbrella", "das Mädchen", "l'ananas") then fades — the sound-off lesson. en only: before the cap lifts, the join arc shows its bump or snag for 600 ms. Hint: "Some caps did not fit. Say the word with each cap — which one sounds right?"
- **Miss 2** → wrong caps float home and each bare plinth keeps a **dotted outline of the right cap's shape** on the picture's head (outline only, no word, in that peg's colour); that peg pulses once. Hint: "Look for the cap that matches the dotted outline."
- A new drop on a plinth clears its outline (help is taken away until the next Check).
- **Success** → caps ratchet down left to right, phrases glow, pictures hop, the round slides onto the shelf. Bubble: "{phrases} — every word has its cap!" e.g. "an apple, a cow, an owl, a kite — every word has its cap!" (8-mode: "All eight words have their caps!"). Pass end: shelf ripple + "Look how your words are sorted: {caps}."

## 8. Settings
1. **Cards:** 4 pictures / 8 pictures / words only (sort) — one row, two rows, or word cards into shelf columns.
2. **Article:** definite / indefinite — changes the caps on the rail. Hidden where only one set exists: en (a/an), sv/da/no (indefinite only — their definite is a suffix), nl (definite only — *een* is gender-blind). Defaults: en a/an; de, fr, es, it, pt, nl definite; sv, da, no indefinite.

## 9. Words (EN source)
- title "The Article Caps" · instruction "Give every picture the cap that belongs in front of its word."
- task: en "Put the right cap on each picture: a or an?" · gendered template "Put the right cap on each picture: {caps}?" ({caps} = "der, die or das") · sort "Sort the words under their caps."
- hints: hintEmpty "Every picture needs a cap." · hintMiss1 "Some caps did not fit. Say the word with each cap — which one sounds right?" · hintMiss2 "Look for the cap that matches the dotted outline." · hintSort1 "Some words are under the wrong cap. Say each one with its cap."
- celebrate "{phrases} — every word has its cap!" · celebrate8 "All eight words have their caps!" · celebratePass "Look how your words are sorted: {caps}."
- aria: capLabel "cap {article}" · plinthBare "{noun}, no cap yet" · plinthCapped "{phrase}" · shelfLabel "words that take {article}".
- settings: "Cards" — "4 pictures" / "8 pictures" / "Words only" · "Article" — "definite" / "indefinite" (locale terms: bestimmt / unbestimmt, défini / indéfini…).
- **Locale traps:** de nouns capitalised (never lower-case a plate); de *ein* covers der + das; fr/it elision written with no space; it *un'* feminine only; it *lo* only for masculine s+consonant / z / gn / ps; fr h-aspiré and y refused; es stressed á- feminines refused; nl definite only; sv/da/no indefinite only; no *ei* refused; pt-BR forms (o ônibus, a xícara); {caps} joined with `Intl.ListFormat` ("der, die oder das", "le, la ou l'"); genders read per locale (§A.13.58: sv/da n = common / t = neuter, no m = common / n = neuter, nl d/h, de m/f/n). **Vocabulary note:** it *orecchio* (body-parts/ear) was tagged feminine in `image-vocabulary.js`; fixed at source in commit b30ee652 (now m; body parts are refused here anyway). **Two-gender nouns refused:** de *Iglu* (der/das both standard) was replaced by *Auto* in DE round 9 by the critic — any noun with two accepted genders breaks "one right article".

## 10. Sound off, access, phones
- Sound off: plates write every phrase; misses write the right phrase; en's join arc shows the sound collision as a shape. TTS only reads plates on tap.
- Keyboard: Tab caps → plinths → Check; Enter pick / drop; Esc cancel; aria-live bubble.
- Taps ≥ 64×48 at 320 px; plinth cells ≥ 78×120. Pictures 116 / 96 px at 704 (4 / 8), 96 / 64 px at 360.
- Check above the fold in both modes at 360×740 and 320×640 (§4).

## 11. Distinct from
- **Daisy's Plate Stack** (plurals) — number, not article. **Sorting Hoops** tool — a hidden rule and two hoops; here the columns are the language's own articles and the child wears a rule, not discovers one. **Letter Tiles / Heart Words** — spelling. Registry #1–#22: no cap, no article, no family shelf. Batch siblings: the only language instrument besides the Word Ribbon (writing), which shares nothing.

## 12. Build plan
- **Core state:** `{ loc, set:'def'|'indef'|'aan', mode:4|8|'sort', caps, rounds, r, plinths:[{noun, key, capIdx|null}], misses, shelf:{capIdx: nouns[]} }`. Functions: `capsFor(loc,set)`, `keyFor(entry,loc,set)` (gender table + en sound rule + it/fr elision and *lo* + refusals), `phrase(capIdx, noun, loc)`, `placeCap(i,c)`, `removeCap(i)`, `check()` → `{right, wrong}`, `hintLevel`, `nextRound()` (order-only reshuffle), `joinShape(capIdx, noun)` → 'smooth' | 'bump' | 'snag'.
- **The gate's own truth (`verify-article-caps-core.js`):** recomputes every frozen answer from `mini tools/pictures/*.json` labels with its OWN copy of the article rules; asserts one right cap per noun; the balance bands per locale × set; it *lo* ≥ 1 and *l'* ≥ 2, fr *l'* ≥ 2; refused classes absent (fi, es á-, fr h/y, no *ei*, refuseKeys, EN_AMBIGUOUS); every picture exists in a colour theme (localized B&W markers rejected); phrase spelling (elision without space, de capital); most-frequent-article strategy within band; no tapping rhythm; every round mixes ≥ 2 articles; en `joinShape` = smooth for exactly the right pairs.
- **Mutations (one per rule):** en uniform keyed *an* · elision joined with a space · it zebra → *lo* · de Mädchen → *die* · no gains *ei* · fr hibou admitted · de der ×20 (balance) · plinth order fixed · an all-one-article round · miss-1 ghost writes the wrong phrase · shelf files by plinth instead of cap · Check passes with a bare plinth · join arc smooth on *a apple*.
- **local-test:** real pointer drags in 10 locales × 7 widths, every round solved plus one deliberate miss; caps never cover a plate; 8-mode fits at 320.
- **Pictures to verify:** every noun in every frozen table, one contact sheet per locale set. **Nothing blocked.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — caps that swing, plop and click, words that rewrite themselves, a shelf that fills into families they built.
2. **Would a teacher put it on the board?** Yes — it is the daily "der, die oder das?" / "a or an?" drill; the material refuses the letter rule (join arc) and the meaning rule (Cap Shelf); one right answer; a miss teaches by writing the right phrase.
3. **Would a parent trust it?** Library pictures, no drawn characters, no score or timer, the phrase always written so it works with the sound off.
4. **The invention:** every word wears its article as a cap — at Check only its own cap clicks down (en: the *an* bridge joins smoothly only onto a vowel sound) — and the seated caps file the words into the language's article families on the shelf.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 3→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- The pitch claimed "the wrong one will not sit", but the hand (§5) lets every cap sit until Check (commit, then see — the better pedagogy). Pitch and §13 rewritten to say what the instrument does: right caps click down at Check, wrong ones pop off, the *an* bridge joins only onto a vowel sound, the shelf files the words.
- Completeness: es, pt-BR, nl, sv, da and no were left to "the build freezes one table"; all six 9-round tables are now written out, every noun's label and gender read from the library JSONs (per-locale gender authority): es 18/18, pt 18/18 (with the fruit-gender lure o morango / a maçã), nl 21/15 with the *het meisje* meaning lure, sv / da / no 21/15.
- no: feminine-capable nouns (ku, høne, and, ugle, krone …) refused so *en* is the only article a Norwegian teacher writes; the *ei* cap stays out.
- Correctness: de *Iglu* takes der AND das (Duden) — two right answers — replaced by *Auto* (das). The it *orecchio* gender defect is already fixed at source (b30ee652); the note now says so.
