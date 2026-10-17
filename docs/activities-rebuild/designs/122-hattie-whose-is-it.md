# Row 122 — The Hook Tile (L.1.1.b)

## 0. Identity
- id `hattie-whose-is-it.possessive.l-1-1-b` (KEPT) · grade 1 · Common Core L.1.1.b (use common, proper, and possessive nouns) · strand Language · page title (frozen) "Hattie's Whose-Is-It — Possessive Nouns (Grade 1)" · own files `mini tools/hook-tile-core.js`, `hook-tile-activity.js`, `hook-tile-activity.html`; the manifest row stays in `hattie-whose-is-it-activities.json` (id, slugs en/de/pt/nl, title, intro frozen), `tool` repointed. New metadata for the locales without a slug (fr/es/it/sv/da/no/fi) authored at build.
- worksheets it covers: none mapped. It is the only activity that teaches possession as grammar.
- what the old activity did: text only. A line "This is the dog's.", a question "Whose bone is it?", three word chips (dog's / dogs / dogs'), tap one; a hand-drawn SVG hedgehog. **Kept:** Hattie's lost-and-found as the world (named in the title, never drawn); the en contrast *dog's / dogs* (the plural-s confusion is THE grade-1 error); the de Namen-Genitiv rule (Annas, no apostrophe — the Deppenapostroph as the misconception); the nl contrast rule (Anna's after a vowel, Bens after a consonant — Groene Boekje); the pt-BR insight that Portuguese has no genitive and teaches *da/do* agreeing with the owner; every name list (de Anna/Ben/Papa/Mia/Tom/Oma/Lina/Emil; pt Ana/Téo/Bia/Léo/Gui/Lia/Caio/Nina; nl Anna/Ben/Romy/Tom/Kim/Milo/Daan/Sem). **Gone:** the hand-drawn hedgehog; the text-only stage; the en plural-possessive foil *dogs'* as a level-1 choice (a grade-2/3 form); the pt foil *na/no* (a different preposition, not a possession error — teaching from a non-error); the en things the library does not have (bone, egg, crown-on-a-king; the Easter egg is a painted egg).

## 1. The pitch
"The apostrophe-s is a hook: clip it onto the owner's word and the lost thing swings up and hangs from its owner — clip on a plain s instead and you just get MORE owners, and the thing stays in the basket."

## 2. Why a child will want it again (the fun)
- **The basket of lost things.** Hattie's lost-and-found basket sits on the right, piled with library things. Each round one of them bounces up to the top: *whose is this?*
- **The owner shelf.** On the left an owner stands on a wooden shelf under a brass peg — a library dog, a rabbit, a girl. The owner's word lies below on a wooden word bar, with a dark slot at its end.
- **The hook clicks.** The tray holds two chunky tiles. The `'s` tile has a brass hook drawn over its apostrophe — the apostrophe IS the hook, and it is the one tile that sticks up out of the tray. Drop it in the slot: it clicks, a string shoots from the hook across to the basket, catches the kite and **swings it up onto the owner's peg**, where it sways twice and settles. The bar now reads *girl's kite*.
- **The plain s does something too — something funny.** Drop the plain `s` tile in the slot and a SECOND girl pops up beside the first (the same library picture, a little bounce). The bar reads *girls*. The kite stays in the basket. Children try it on purpose: *girl — girls — girl's*. Pull the tile and the twin hops away.
- **The wall fills up.** Every solved round sends its thing up to its own peg on the wall behind (40 px). After a pass the wall is a lost-and-found returned: nine things on nine pegs. The last round of a pass ends with Hattie's bell (a soft two-note chime) and every hanging thing swings once, left to right, like wind chimes.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (L.1.1.b):** a possessive noun names who owns something (*the girl's kite*); a common noun becomes possessive with apostrophe-s; so does a proper noun, a name (*Mia's kite*); possessive *'s* is not plural *s*. In every locale the possessive is built the way that language builds it (§9): a tile after the owner in en/de/nl/sv/da/no/fi, a little word before the owner in fr/es/it/pt.
- **Misconception 1 — "possessive s and plural s are the same s" (dogs ↔ dog's).** The two s's DO two different things: the plain s multiplies the owner (two girls appear — that is what *girls* means); only the hooked s hangs the thing on its owner. A child who builds *girls kite* sees two girls and a kite that never moved.
- **Misconception 2 — "the apostrophe is decoration."** The apostrophe is drawn as the hook itself; without it, nothing catches.
- **Misconception 3 (level 2) — "add 's whenever I hear s."** In *I see three dog__* there is nothing to own: the hook clicks in, swings out, finds nothing, and dangles empty, turning slowly. The plain s fills the shelf to three. Possession needs a thing that belongs; a plural needs more than one.
- **Locale misconceptions**, each shown the same way (the thing only swings up when the right hook is in): de/sv/da/no the Deppenapostroph (*Anna's*) and the names ending in s (*Max'*, *Jonas'*, sv *Jonas*); nl the vowel/consonant contrast (*Anna's / Bens*); fr/es/it/pt the contraction that agrees with the owner (*du chien / de la souris / de l'écureuil*; *del perro / de la gallina*; *del cane / della gallina / dello scoiattolo*; *do Téo / da Ana*); fi the genitive *-n* (*Annan pallo*).

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (480), bubble column right (200).

**At 704 px** (stage 480 × 460):
- **Peg wall** (back, full width, y 0–56): a drawn wooden rail with nine brass pegs (circles 10 px, 2 px ink). Solved rounds' things hang here at 40 px.
- **Owner shelf** (left, x 16–216, y 70–270): a drawn shelf board 200 × 14; **the owner picture, 128 px**, standing on it (library). In level-2 plural rounds up to three identical owners stand side by side at 96 px (the shelf widens to 312 px; the basket slides right 40 px). Above the owner one brass target peg (14 px) that glows when a hook is seated.
- **Basket** (right, x 300–464, y 120–300): a drawn wicker basket 164 × 110 (crosshatched rim) with **the round's thing on top, 112 px**, and two decoy things half-hidden behind it at 64 px (other library things of the pass; they never move and are never an answer).
- **Word bar** (bottom, x 16–464, y 320–392): a wooden bar 448 × 72. On it the owner word in wooden letter tiles (Baloo 2, 40 px, tiles 34 × 54), then **the slot**: a dark recess 56 × 54 with a brass rim, then the thing word. In fr/es/it/pt the bar reads THING · SLOT · OWNER (*la pelota* [slot] *Ana*).
- **Tile tray** (y 404–460): two tiles 72 × 56 (three where §6 says so), gap 20, centred. The `'s` tile: cream, the apostrophe drawn as a brass hook rising 18 px above the tile edge. The plain `s` tile: cream, flat top.
- **Task line** above the stage (≤ 24 px, ≤ 2 lines). **Bubble** in the right column.

**At 360 px** (stacked; stage 360 × 520): peg wall 360 × 40 (pegs 8 px, hung things 28 px); owner shelf x 8–168, owner **96 px** (plural rounds: three at 64 px on a 220 px shelf, basket drops below-right); basket x 190–352, thing **88 px**; word bar 344 × 60 (letters 30 px, tiles 26 × 44, slot 44 × 44); tray tiles 64 × 52; bubble under the tray (one line, grows on miss 2); Check below. Check bottom ≤ 690 at 360 × 740, ≤ 620 at 320 × 640 (at 320 the decoys hide, owner 80 px, thing 72 px — still ≥ 64).

No words on the apparatus except the content: the owner word, the thing word, the tile endings/hook words, and the short level-2 sentence.

## 5. The hand
- **Drag a tile to the slot** (or tap it → it flies there, 200 ms). Within 60 ms it seats with a wooden *tock*; the bar's letters slide together so the word reads as one (*girl's*, no gap; in fr/es/it/pt the hook word sits between spaces, and `d'`/`dell'` glue to the owner).
  - **Hook seated, the sentence has a thing:** the hook glows (100 ms), a string (2 px, cream with ink edge) draws to the thing (220 ms), the thing lifts out and travels in an arc (380 ms ease-out) to the owner's peg, swinging twice (600 ms, decaying). A soft brass *ting*.
  - **Hook seated, nothing to own (level-2 plural frame):** the string reaches toward the basket, finds nothing, curls back; the hook dangles and sways slowly (2 s idle). A legal state — Check decides.
  - **Plain s seated (en):** a second identical owner pops up beside the first (scale 0.6 → 1, 240 ms, soft *pop*); in plural frames the shelf fills to the sentence's number (*three* → three). The thing does not move.
  - **Other locales' non-hook tile:** it seats, the string reaches the thing and slips off, the thing drops back into the basket with a soft thud (the hook "does not catch").
- **Pull a tile out** (drag back, or tap the seated tile): everything reverses — the thing swings back into the basket (300 ms), twins hop off (200 ms). Undo is always free.
- **Swap:** dropping the other tile on a filled slot swaps them (the old one flies home).
- **Tap the owner or the thing:** it bobs; TTS reads its word where available.
- **Free play:** after success the child may keep clipping and unclipping: the thing swings down and up, the plain s still makes twins. The tray locks only during the 1.4 s success show.

## 6. The rounds
One round = one owner, one lost thing (level 2: one sentence), one slot. Check when a tile is seated.

**Level 1 — Whose is it? (common nouns, read from the pictures), 9 rounds.** Tray `'s` · `s`. Bar OWNER [slot] THING. Five rounds are possession (one owner on the shelf, a thing bouncing up out of the basket, the thing word on the bar after the slot); four are plurality (two or three identical owners ALREADY stand on the shelf, nothing bounces, the bar has no thing word) — so a pre-reader decides from the stage, and a child who always grabs the hook is caught by the empty, dangling string.

| # | owner (library) | thing (library) | bar after success |
|---|---|---|---|
| 1 | pets/dog | toys/ball | dog's ball |
| 2 | pets/rabbit | vegetables/carrot | rabbit's carrot |
| 3 | pets/dog ×3 on the shelf | — | dogs |
| 4 | forest-creatures/squirrel | miscellaneous/acorn | squirrel's acorn |
| 5 | spring/bird | spring/nest | bird's nest |
| 6 | camping/frog ×2 on the shelf | — (nothing bounces) | frogs |
| 7 | toys/girl | toys/kite | girl's kite |
| 8 | pets/cat ×3 on the shelf | — | cats |
| 9 | farm-animals/pig ×2 on the shelf | — | pigs |

(Old en pairs kept where the library has both: dog, bird–nest, girl–kite, frog–log. cat/boy/duck/king and bone/egg/crown are gone — no picture, or a misleading one. *hen's chick* is refused in every locale: a chick is the hen's baby, which reads as family, not ownership, and chick/duck is a known look-alike pair. Every thing is an object an owner can plausibly HAVE — never a living creature. Right tile: 's ×5 (rows 1, 2, 4, 5, 7), s ×4 (rows 3, 6, 8, 9). Plural owners are only nouns whose plural is the plain s (*mouse/mice*, *baby/babies*, *sheep* are refused as plural rounds). *mouse's cheese*, *frog's log*, *baby's balloon* and *pig's bucket* live in level 2 and level 3. In a plural round the plain s makes the bar read *frogs* and the shelf already matches — success "Two frogs — more than one frog!"; the hook reaches for a thing, finds none and dangles.)

**Level 2 — One owner or more? (en), 9 rounds.** The bar holds a short sentence with the slot; tray `'s` · `s`.

| # | bar | right | success shows |
|---|---|---|---|
| 1 | This is the dog[ ] ball. | 's | the ball hangs on the dog |
| 2 | I see three dog[ ]. | s | three dogs |
| 3 | The bird[ ] nest is up high. | 's | the nest hangs on the bird |
| 4 | Two rabbit[ ] hop. | s | two rabbits |
| 5 | Here is the girl[ ] kite. | 's | the kite hangs on the girl |
| 6 | Look at the three hen[ ]. | s | three hens |
| 7 | That is the mouse[ ] cheese. | 's | the cheese hangs on the mouse |
| 8 | Two frog[ ] sit on a log. | s | two frogs |
| 9 | The baby[ ] balloon is green. | 's | the balloon hangs on the baby |

Right tile: 's ×5, s ×4. In plural rounds the shelf starts with one owner; the number word decides how many the s brings. (Colour check on the contact sheet: toys/balloon is GREEN — the draft's "red" was false. No other level-2 sentence names a colour or attribute.)

**Level 3 — Names and things (proper and common nouns in a sentence), 9 rounds.** A sentence bar as in level 2; when the owner is a name, a **name card** stands on the shelf (cream card 160 × 64, the name 36 px with its capital letter; a small red pin, no words). Tray `'s` · `s`. Five name rounds: *This is Mia[ ] kite.* (toys/kite) · *Here is Ben[ ] robot.* (toys/robot) · *That is Lily[ ] doll.* (toys/doll; toys/dinosaur in a pass that contains toys/girl — toys/teddy_bear is drawn but has NO label, so it is not usable) · *Tom[ ] car is green.* (toys/car — green on the sheet) · *Look at Zoe[ ] backpack.* (accessories/backpack) — all 's. Four common-noun rounds mixed in: *The mouse[ ] cheese is yellow.* ('s; at-the-supermarket/cheese is yellow on the sheet) · *I see two pig[ ].* (s) · *Three cat[ ] sleep.* (s) · *Two frog[ ] jump.* (s). Right: 's ×6, s ×3, never two s rounds in a row. (No en name ends in s — *James's / James'* is a style split, refused. The plain s on a name makes a second name card appear: *Mias* is two Mias — shown, never praised.)

**Per-locale round content.** Every locale ships 3 levels × 9 rounds. Where a list below names fewer than 9, the build completes it from that locale's own ordinary names / the pictures named here (passing the refusal rules in §9) and the native panel confirms; the RULE, the tray and the right-tile mix of each level are fixed here. Outside en L1/L3 and fi L3 (where the decision is the hook versus its look-alikes, every foil's consequence visible), every level mixes its right tiles so no tile is right more than 5 of 9 times:
- **de** — L1 names + `s` (old names kept): Anna–toys/ball (*Annas Ball*), Ben–toys/scooter (*Bens Roller*), Papa–toys/car, Mia–classroom/book, Tom–accessories/beanie, Oma–accessories/umbrella (glasses: no picture), Lina–accessories/backpack, Emil–toys/bicycle, Paul–toys/kite. Tray `s` · `'s` (the Deppenapostroph — real, everyday, named). ⚠ Duden §97 tolerates an apostrophe ONLY to show the base form of a name that would otherwise be misread (*Andrea's* vs *Andreas*); names with such a twin (Andrea/Andreas, Nico/Nicos, Carlo/Carlos) are refused, so *Annas* is the one school-correct form. L2 names ending in s/ß/x/z/tz take an apostrophe only (Duden): *Max' Ball*, *Hans' Hut* (accessories/hat), *Luis' Roller*, *Moritz' Auto*, *Felix' Drachen*, mixed with four plain names (Anna, Ben, Mia, Lina → `s`); tray `s` · `'` · `'s`; right `'` ×5, `s` ×4. L3 common nouns with *vom / von der* — the possession every German first-grader says — bar THING [slot] OWNER, tray `vom` · `von der`, decided by the owner's gender: *der Ball vom Hund* (pets/dog–toys/ball), *das Nest vom Vogel* (spring/bird–spring/nest), *die Karotte vom Kaninchen* (pets/rabbit–vegetables/carrot), *die Eichel vom Eichhörnchen* (forest-creatures/squirrel–miscellaneous/acorn), *der Ballon vom Baby* (toys/baby–toys/balloon) · *der Käse von der Maus* (forest-creatures/mouse–at-the-supermarket/cheese), *das Boot von der Ente* (farm-animals/duck–toys/boat), *der Eimer von der Kuh* (farm-animals/cow–toys/bucket), *das Blatt von der Schnecke* (forest-creatures/snail–spring/leaf); `vom` ×5, `von der` ×4. Miss: the owner's own article is ghosted above it (*der Hund → vom*, *die Maus → von der*). (The old L3 tray `von` · `s` offered *der Ball s Anna*, an invented non-error — gone. Common-noun genitive *des Hundes* is grade 3+: refused.)
- **nl** — L1 mixed names, the vowel/consonant rule decided every round (Groene Boekje): *Bens*, *Toms*, *Kims*, *Daans*, *Sems* · *Anna's*, *Romy's*, *Milo's*, *Sara's*; tray `s` · `'s`; right `s` ×5, `'s` ×4 (the draft's split — all consonants in L1, all vowels in L2 — made each level one constant answer). L2 adds names ending in an s-sound, which take only an apostrophe: *Thomas' fiets* (toys/bicycle), *Max' bal*, *Lars' vlieger*, *Joris' boot*, *Kees' auto*, mixed with four L1 names; tray `s` · `'s` · `'`. L3 common nouns with *van de / van het* by the owner's de/het word, bar THING [slot] OWNER: *de bal van de hond*, *het nest van de vogel*, *de kaas van de muis*, *de boot van de eend*, *de emmer van de koe* · *de wortel van het konijn*, *de vlieger van het meisje*, *de emmer van het paard* (farm-animals/horse), *de muts van het schaap* (farm-animals/sheep–accessories/beanie); tray `van de` · `van het`; a miss ghosts the owner's own article (*het konijn*).
- **sv** — L1 names + `s` (Annas boll, Elsas mössa, Ottos bil, Liams robot, Majas docka, Noahs tåg, Idas paraply, Hugos båt, Sagas drake); tray `s` · `'s` (*Anna's* is the same real everyday mistake as in German). L2 names ending in s/x/z take nothing (*Jonas boll*, *Lukas bil*, *Elias drake*, *Max båt*, *Klas mössa*) mixed with four L1 names: tray `s` · `'s` · an empty dotted tile (*nothing*); right *nothing* ×5, `s` ×4. L3 definite common nouns: the bar shows the DEFINITE form (*hunden*, *flickan*, *kaninen*, *musen*, *fågeln*, *ekorren*, *bebisen*, *grisen*, *ankan*) and the tray is `s` · `'s` (*hundens boll* vs *hunden's*). The draft's `ens` / `ns` tiles are gone: *hundns* is not an error a child makes, and a foil must be a real mistake.
- **da** — L1 names + `s` (Annas bold, Emils bil, Idas dukke, Noahs tog, Frejas drage…); tray `s` · `'s`. L2 names ending in s/x/z → `'` (*Jonas' bold*, *Max' bil*, *Lukas' drage*, *Klaus' båd*, *Mads' kasket*) mixed with four L1 names; tray `s` · `'s` · `'`. L3 definite common nouns, bar in the definite form (*hunden*, *pigen*, *kaninen*, *musen*, *fuglen*…) + tray `s` · `'s` (*hundens bold*, *pigens drage*).
- **no** (bokmål) — L1 names + `s` (Annas ball, Emils bil, Noras dukke, Olivers tog…); tray `s` · `'s`. L2 s/x/z-names → `'` (*Jonas' ball*, *Max' bil*, *Elias' drage*, *Lukas' båt*, *Mats' caps*) mixed with four L1 names; tray `s` · `'s` · `'`. L3 definite common nouns + `s` as da (*hundens ball*, *jentas drage* — bokmål allows *jenta/jenten*: the panel fixes one form per round), tray `s` · `'s`. (*ballen til Anna* is the everyday spoken form but has no wrong written alternative a child produces, so it cannot be a level with one right tile.)
- **fi** — L1 names + `n` (Annan pallo, Ellan leija, Leon auto, Ainon nukke, Veetin robotti — only names whose genitive adds n with no stem change); L2 common nouns without gradation (koiran pallo, kanin porkkana, kanan tipu, oravan tammenterho); stem-change nouns (lintu → linnun, hiiri → hiiren) are excluded. Tray `n` · `t` (the plural -t: *koirat* = more dogs — the en twin effect, honest in Finnish too). L3 mixes 5 names and 4 nouns from L1–L2 with a third tile, the empty dotted *nothing* (*Anna pallo*, the spoken slip): tray `n` · `t` · nothing; right `n` in all 9 (as en L1, each foil's consequence is visible: twins for `t`, the string slipping off for nothing).
- **fr** — L1 names: consonant → `de` (le cerf-volant *de* Mia, le robot *de* Léo, la poupée *de* Jade, le train *de* Tom, le parapluie *de* Lou), vowel or mute h → `d'` (la balle *d'*Anna, le bateau *d'*Élie, la voiture *d'*Hugo, le sac à dos *d'*Inès); tray `de` · `d'`; right `de` ×5, `d'` ×4. L2 common nouns → `du` / `de la` / `de l'` by the owner's gender and first sound: *le ballon du chien*, *la carotte du lapin*, *le dinosaure du bébé* (toys/dinosaur), *le bateau du canard* · *le fromage de la souris*, *le seau de la vache* · *le gland de l'écureuil*, *le nid de l'oiseau*, *la feuille de l'escargot*; tray `du` · `de la` · `de l'`; right du 4, de la 2, de l' 3. (*le poussin de la poule* refused — family, not ownership.) L3 mixed names and nouns, tray `de` · `d'` · `du` · `de la` (k = 4).
- **es** (es-MX) — L1 names `de` (la pelota *de* Ana, el robot *de* Diego, la muñeca *de* Sofía, el tren *de* Mateo, la mochila *de* Valeria…); tray `de` · `del` (*del Ana* is the error). `de la` is NOT offered with names: *la Ana* is regional colloquial in Mexico, and a foil must be plainly wrong. L2 `del` / `de la`: *la pelota del perro*, *la zanahoria del conejo*, *el queso del ratón*, *el nido del pájaro*, *el globo del bebé* · *el papalote de la niña*, *la cubeta de la vaca*, *la bellota de la ardilla*, *el tronco de la rana* (camping/log); tray `de` · `del` · `de la`; del 5, de la 4. (*el pollito de la gallina* refused — family.) L3 mixed names and nouns, same tray.
- **it** — L1 names `di` (la palla *di* Anna, l'aquilone *di* Luca, il robot *di* Marco, la bambola *di* Giulia…; *d'Anna* is literary and never offered); tray `di` · `del`. L2 `del` / `della` / `dello` / `dell'`: *la palla del cane*, *la carota del coniglio*, *il formaggio del topo* · *la ghianda dello scoiattolo* · *il secchio della mucca*, *il tronco della rana*, *l'aquilone della bambina* · *il nido dell'uccello*, *la carota dell'asino* (farm-animals/donkey); tray of four `del` · `della` · `dello` · `dell'` (slot balance with k = 4); del 3, dello 1, della 3, dell' 2. (*il pulcino della gallina* refused — family.) L3 mixed names and nouns.
- **pt-BR** — L1 old names with `da`/`do` by the owner's gender (a bola *da* Ana, o carrinho *do* Téo, a pipa *da* Bia, o livro *do* Léo, a mochila *da* Lia, o chapéu *do* Caio, a boneca *da* Nina, o robô *do* Gui, o trem *do* Davi); do 5, da 4. L2 common nouns: *a bola do cachorro*, *a cenoura do coelho*, *o queijo do rato*, *o ninho do passarinho*, *o balão do bebê* · *o balde da vaca*, *a pipa da menina*, *o tronco da rã*, *a folha da lagarta* (spring/caterpillar); do 5, da 4. (*o pintinho da galinha* refused — family.) Tray `da` · `do`; L3 mixed names and nouns.

**Answer position.** Tray order is shuffled per render with a balance constraint: across each level's 9 rounds the right tile sits in each tray slot at least ⌊9/k⌋ times (k = tiles). The gate's bots: *always the hook tile* (level 2 ≤ 5/9; in levels 1 and 3 the decision IS hook-or-not and the plain tile's consequence is visible — reported, not capped); *always the first slot* (≤ ⌈9/k⌉); *always the longest word* (≤ 5/9 — matters for `de la` / `della`).
**Order:** order-only reshuffle per pass (never the same order twice); level 2 never puts more than two plural rounds in a row.

## 7. Check, the misses, the success
- **Check with the slot empty:** hint, no miss — "Find the tile that hangs the thing on its owner."
- **Miss 1** — what the apparatus shows:
  - *plain s in a possessive round:* the twin stays; a dotted string draws from the thing toward the owner's peg and stops short; the slot pulses · "Now there are two {owners}! Who owns the {thing}? Try the tile with the hook."
  - *hook in a plural round:* the dangling hook glows; the sentence's number word lights and that many dotted owner outlines appear on the shelf, only one filled · "There is nothing to hang here — the sentence wants more {owners}."
  - *de/sv/da/no apostrophe on a plain name:* the string slips off and the thing drops back; the correct form (*Annas*) is ghosted under the slot for 800 ms · de: "Bei Namen hängt nur ein s — ohne Strich." (authored per locale).
  - *fr/es/it/pt wrong contraction:* the owner's own article lights above it, ghosted (*le chien*, *la souris*, *el perro*) — the reason for *du / de la / del* · fr: "Écoute le petit mot devant « chien » : le chien… alors ?"
  - *nl wrong convention:* the name's last letter lights (vowel teal, consonant coral) · "Kijk naar de laatste letter van de naam."
- **Miss 2:** the right tile rises 6 px with a teal ring; in de/fr/es/it/pt the right form is ghosted in the slot · "Try the tile that is glowing."
- **A new move takes the help away** until the next Check.
- **Success:** the thing hangs and sways, the peg rings, the thing shrinks and flies up to its own peg on the back wall (500 ms), Hattie's chime · en "The girl's kite — it belongs to the girl!" · level-2 plural "Three dogs — more than one dog!" · level 3 "Mia's kite — it belongs to Mia!"

## 8. Settings
1. **Owners:** Things and owners (level 1) · One or more? (level 2) · Names (level 3) — the shell's level picker; at rest the shelf shows a picture (L1), a sentence bar (L2) or a name card (L3).
2. **Hook tiles:** Show the hook (default) · Plain tiles — draws the `'s` tile with the apostrophe alone (no brass hook) for children ready to read the mark itself; visible at rest in the tray.

## 9. Words (EN source)
- title (shell): **Hattie's Whose-Is-It** (frozen)
- instruction: "Hang the lost thing on its owner. Which tile has the hook?"
- task lines: L1 "Whose is it? Hang it on its owner." · L2 "One owner — or more? Finish the word." · L3 "Whose is it? Finish the name."
- hints and celebrations: §7 exactly.
- settings: "Owners", "Things and owners", "One or more?", "Names", "Hook tiles", "Show the hook", "Plain tiles"
- aria: "Owner: {owner}", "Lost thing: {thing}", "Word bar: {bar}", "Hook tile {t}", "Plain tile {t}", "The {thing} is hanging on the {owner}'s peg."
- **Celebrations are literal per locale and per round** (never assembled — agreement differs): pt "A bola da Ana — é da Ana!", fr "Le ballon du chien — il est au chien !", de "Annas Ball — er gehört Anna!".

**Locale traps:**
- **Where the hook goes.** en/de/nl/sv/da/no/fi: owner + hook + thing (a suffix slot; letters slide together). fr/es/it/pt: thing + hook word + owner (a word slot with spaces; `d'` and `dell'` glue to the owner).
- **No invented misspellings.** The only "wrong" tiles are the real, documented error of that locale (the de/sv/da/no apostrophe, the nl other-convention) or real words (*du/de la/de l'*, never *de le*).
- **Names are content.** Ordinary names for each country, mixed gender (pt needs the owner's gender — `ownerG` as before). Refused: en names in -s; fi names with gradation (Otto → Oton); sv/da/no names in -s outside the level that teaches them.
- **German nouns are capitalised** (Ball, Auto); *Annas* keeps the capital.
- **Thing labels** come from `image-vocabulary.js`, lower-cased mid-sentence where the language does (fr *le cerf-volant*), with the per-round article the native panel writes (es-MX *papalote*, pt-BR *pipa*).
- **The twin effect** exists where the foil IS a plural (en `s`, fi `t`); elsewhere the foil "does not catch" and the hint shows the reason.
- Sound off: the swing, the twins, the dangling hook and the ghosted article carry every message; TTS only reads the finished bar.

## 10. Sound off, access, phones
- Silent legibility: the thing travels to its owner on success; twins appear for a plural; a hook dangles when there is nothing to own.
- Keyboard: Tab cycles tiles → Enter seats the focused tile; Backspace pulls it; Space on owner/thing reads it. Check is the shell's.
- aria-live: "The kite is hanging on the girl's peg." / "Now there are two girls. The kite is still in the basket."
- Taps: tiles 72 × 56 (64 × 52 at 360); the slot accepts drops in a 64 × 64 zone; owner and thing tappable at full size.
- Pictures: owner 128 / thing 112 at 704; 96 / 88 at 360; ≥ 64 at 320.
- Phone: stacked; the peg wall becomes a strip; decoys hide at 320; the bubble is one line until miss 2.

## 11. Distinct from
- **Row 75 Plate Stack** (an ending socket that opens with the second plate) — there quantity opens a socket; here both tiles seat and what each tile DOES is the lesson (twins vs a thing carried to its owner).
- **New 217 Article Caps** (a cap that does or does not sit) — fit-by-shape; nothing here is fit by shape.
- **Row 124 Pronoun Prism (this batch)** — possessive pronouns (his, their); here possessive nouns; no prism, no string.
- No built or designed instrument carries an object to its owner on a string.

## 12. Build plan
- **Data:** per locale `levels[1..3]` of rounds `{id, ownerKey|ownerName, ownerG?, thingKey, frame?, tiles:[…], right, barAfter, celebrate}`; pictures through `lcs-pictures.js`; labels from `image-vocabulary.js`; frames and celebrations literal.
- **Core state:** `{level, round, slot:null|tileId, misses}`; functions `seat(t)`, `pull()`, `swap(t)`, `effect()` → `{owners, thingOn:'basket'|'peg', hookDangling}` (pure, from the seated tile and the round), `bar()`, `check()` → `{ok, reason:'empty'|'plural-in-possessive'|'hook-in-plural'|'wrong-hook'}`.
- **Gate's own ground truth** (`verify-hook-tile-core.js`): its own rule table per locale — en noun+"'s"; de name+"s", /(s|ß|x|z|tz)$/ → name+"'", L3 vom for m/n owners and von der for f owners (from its own copy of the vocab gender); nl /[aeiouy]$/ → "'s", /(s|x|z|ce|sch)$/ (s-sound) → "'", else "s", L3 van de / van het by its own de/het list; sv /[sxz]$/ → nothing else "s", L3 definite form + "s"; da/no /[sxz]$/ → "'", L3 definite + "s"; fi name+"n"; fr vowel/mute-h → d' else de, du/de la/de l' from the vocab gender and first letter; es del/de la; it del/della/dello/dell' (dello before s+consonant, z, gn, ps); pt da/do by ownerG — and asserts: every shipped `right` equals the rule; `effect()` hangs the thing only for the right tile in possessive rounds; en plain s yields owners = 2 or the sentence's number; `bar()` after success = `barAfter`; tray-slot balance; bots under caps; every picture key exists in a colour theme; no fi name on the gradation refusal list; no en name ending in s.
- **Mutations:** hook hangs in a plural round · plain s hangs the thing · plain s adds no owner · de apostrophe catches on Anna · de Max takes "s" · de vom for die Maus · nl vowel name takes "s" · nl Thomas takes "s" · nl van de for het konijn · sv Jonas gets "s" · sv L3 offers an invented ending · fr d' before a consonant · fr du for a feminine owner · it del before s+consonant · pt do for Ana · es `de la` offered with a name · a thing that is a living creature (hen's chick) · a level whose right tile is constant where §6 says mixed · right tile always in slot 1 · plural round celebrates with the possessive sentence · a sentence colour word that is not its picture's (the green balloon called red).
- **Pictures** (critic, contact sheets 2026-10-17; every key exists in its theme JSON): toys — girl, kite (red/yellow), baby, balloon (GREEN), ball (a football), car (green beetle), boat, robot, doll, train, scooter (a motor scooter), bicycle, bucket (blue sand pail); pets dog, cat, rabbit; forest-creatures mouse (blue-grey), squirrel, snail; at-the-supermarket cheese; miscellaneous acorn; spring bird, nest (two chicks sit in it — still reads as a nest), leaf, caterpillar; camping frog, log (a cut log); farm-animals pig, cow, duck, horse, sheep, donkey; vegetables carrot; classroom book; accessories cap, umbrella, backpack, beanie, hat.
- **Risks:** the swinging thing must not cross the word bar at 320 (the target peg sits above the owner; the arc stays in the top half). toys/girl, toys/doll and toys/baby_girl are three near-identical drawings of a girl — never two of them in one pass (L1 uses toys/girl as an owner; when toys/girl is in the pass, L3's Lily–doll round uses toys/dinosaur instead (toys/teddy_bear is on the sheet but unlabelled)). toys/scooter is a motor scooter (Vespa): de *Roller* and en *scooter* cover it; never call it a kick scooter.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a hook that shoots a string and swings a kite onto its owner, a plain s that makes a surprise twin, a wall of returned things that chimes at the end.
2. **Would a teacher put it on the board?** Yes — *dogs* vs *dog's* is the commonest grade-1 confusion, and the board shows the difference: one s makes more dogs, the hooked s makes the ball the dog's.
3. **Would a parent trust it?** Yes — real words and names, the possessive built the way their own language builds it (no English apostrophe forced onto German or Portuguese), no scores.
4. **The invention:** the apostrophe-s is a hook that hangs the lost thing on its owner; a plain s just makes more owners.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 3→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **A false colour fixed:** L2 #9 said the baby's balloon is red; toys/balloon is GREEN on the contact sheet.
- **One right answer restored in de L3:** the old tray `von` · `s` offered an invented non-error (*der Ball s Anna*). L3 is now *vom / von der* by the owner's gender — a real choice every German first-grader makes — with 9 rounds and pictures.
- **Constant-answer levels broken up:** nl L1 was all consonant names (always `s`) and L2 all vowel names (always `'s`) — a bot scored 9/9. L1 now mixes the two, L2 adds the s-sound apostrophe (*Thomas'*), L3 is *van de / van het*.
- **Invented foils removed:** sv L3 `ens` / `ns` → the definite form on the bar + `s` · `'s`; es names no longer get `de la` (*la Ana* is regional colloquial, not plainly wrong); no L3 *til* (no wrong written alternative exists) → definite + `s` like da.
- **Family is not ownership:** *hen's chick* (and fr/es/it/pt *poussin/pollito/pulcino/pintinho*) replaced by owner–object pairs (*pig's bucket*, *la vache / le seau*…); every thing is an object.
- **Every locale now has 3 complete levels** with a fixed tray, rule and right-tile mix (fi, fr, es, it, pt had no L3; da/no/sv had no trays); de Duden apostrophe tolerance named, base-form-twin names refused.
- **The hook was always right in en L1 and L3 (a bot scored 9/9):** L1 now has 4 plural rounds read from the stage (two or three owners already on the shelf, nothing bounces — the hook dangles empty), L3 mixes 6 name possessives with 3 plurals in sentences.
- Gate rule table and mutations extended to the new rules; the girl/doll/baby_girl look-alike and the motor-scooter picture recorded.
