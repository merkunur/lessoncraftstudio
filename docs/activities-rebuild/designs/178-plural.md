# Row 178 — The Doubling Pond → THE TAIL PLUGS (L.2.1.b · L.2.2.d plurals)

## 0. Identity
- id `plural.irregular.l-2-1-b` (frozen) · grade 2 · Common Core L.2.1.b (+ L.2.2.d plural spelling) · strand Language · own files `doubling-pond-core.js` (new; `plural-core.js` stays untouched for anything else that loads it), `plural-activity.js`, `plural-activity.html`, `plural-activities.json` (row kept, params rewritten). Title / intro / slugs en..sv frozen; da/no/fi get new slug, title, intro at build.
- worksheets covered: **G2-328** Plurals (plural spelling face) · **G2-349** Fill in the Blank: Plural Nouns · **G2-315/324/325/326/327** Spelling Rules — the **plural-spelling rules** of each locale (en *y→ies, f→ves*, es *-z→-ces / -ón→-ones*, pt *-ão*, fr *-al→-aux / -eau→-eaux*, it *-co→-chi / -go→-ghi*, nl *verdubbeling / verenkeling / f→v*, da *dobbeltkonsonant i flertal*, fi *astevaihtelu kukka→kukat*). ⚠ Coverage note for the orchestrator: the NON-plural spelling rules on those five sheets (en magic-e, c/k/ck, ee/ea, ai/ay, floss; de tt/ll/ck/tz/ie; es b/v, c/qu, g/gu, r/rr; it doppie, c/ch; pt s/ss, ch/x; sv/no dubbelteckning, sj-ljudet; fi kk/tt…) cannot honestly live in a plural instrument — they need their own row.
- old activity: one singular word, three chips (irregular / +s / unchanged), Pearl the moon. **Kept:** all 9 en words (foot, tooth, goose, man, woman, mouse, child, deer, sheep) and the 8 locales' word lists (de Umlaut words, fr -al/-ou/-eu/-eau, es -es/-ces, pt -ão/-l/-m, it -o→-a etc., sv omljud, nl doubling/singling) — they become the locales' level-3 "special" words or their level-2 rule words; the derived-not-stored answer principle.

## 1. The pitch
"The end of every word has a plug, and every plural ending has a socket: *s* only clicks onto a plain end, *es* onto a hissing end like *x* or *sh*, *ies* swallows a *y* that comes after a consonant — and the special words have a knot on their end that no ending fits, because they change in their own way."

## 2. Why a child will want it again
- It is a jigsaw made of spelling: an ending tile slides along the water and sits on the word's tail; at Check the tail's real plug rises to meet it — if the shapes match, a lovely solid CLICK with a ripple across the pond; if not, the plug bumps the tile, it wobbles and floats back. (Before Check every tile sits, so the child must decide by READING the end of the word — trying tiles until one fits is impossible.)
- The rule is something you can see and then *predict*: after three rounds children start saying "it's a hissy end, it needs the bump tile" before they touch anything.
- The knot words are a surprise every time: drop *s* on *mouse* and the tail ties itself into a knot and flicks the *s* away; tap the knot and a little ring of three forms spins up out of the water — find the real one.
- The earned show: the finished plural lifts off the jetty and floats onto the three lily pads, the three identical pictures bob in a row, and the pond reads **one fox · three foxes** with the changed letters glowing coral for a moment.

## 3. The skill and the misconception
- Skill: form the plural of a noun, regular and irregular, spelling the ending by the position-dependent rule (en: *-s*; *-es* after s/x/z/sh/ch; consonant+*y* → *-ies* but vowel+*y* → *-s*; *f/fe* → *-ves*; irregular inner changes *foot→feet, mouse→mice*; no change *sheep, deer, moose*; *child→children*).
- Misconceptions and the push-back:
  - *"Just add s"* (foxs, babys, wolfs, foots) → the tail's plug shape refuses the *s* socket: hissing tails are zigzag, consonant-*y* tails are a hook, *f* tails are flat — the *s* tile only has the straight/round socket and visibly does not seat.
  - *"y always becomes ies"* (keies, monkies) → vowel+*y* tails have the ROUND plug the *s* tile fits; the *ies* tile's hook socket does not.
  - *"Special words take a normal ending"* → the knot plug rejects every ending tile.
  - *"Special words get an ending AND the change"* (feets, mices, childrens) → once a ring form is on the jetty its tail becomes a knot: an ending tile dropped on top of *feet* sits until Check, then the knot ties and flicks it away — double marking is visibly refused.
  - *"Plural never looks like the singular"* → *sheep / deer / moose* — the true form in their ring is the unchanged word; *meese* (the goose→geese analogy taken too far) and *sheepen* are the wrong friends.

## 4. The stage
At 704: split layout — pond apparatus left 452 px, bubble column right 204 px. At 360: stacked.
- **The pond** (drawn): a rounded pale-blue oval 452 × 230 px (328 × 190 at 360) with a 3 px teal rim. On it, LEFT: one lily pad (a green ellipse 120 × 34) holding ONE library picture, 96 px at 704 / 64 px at 360. RIGHT: three lily pads holding THREE identical copies of the same picture (96 / 64 px, overlapping by 10 %). Under the left pad the singular word in plain type; under the right pads the empty plural name-board.
- **The jetty** (drawn, above the pond): a wooden board 420 × 70 px (328 × 60) on which the word lies in letter tiles (Baloo 2 700, 34 px at 704 / 28 px at 360; tiles 36 × 50). The jetty's right **end post** sits under the word's tail and shows its **plug** — a 3 px ink outline shape, 30 px tall, under the last letter(s):
  - straight bar (plain end) · round knob (vowel + y) · zigzag (hissing end s/x/z/sh/ch) · hook (consonant + y) · flat plate (f / fe) · **knot** (special word).
  - The letters that the plug "belongs to" are underlined in the plug's colour (e.g., *x*; *sh*; the *y*; *fe*), so the child sees WHICH letters make the shape. **At rest (default) the post shows a neutral straight bar and nothing is underlined** — the real plug and its underline appear at Check (and stay on that tail until the next Check), or from the start under the help setting "Shapes: shown".
- **The ending tiles** float in the water along the bottom of the pond (5 tiles at 704 in a row, 3 + 2 at 360), 72 × 56 px each, each a tile with its letters and a socket shape on its LEFT edge: **s** (straight + round socket), **es** (zigzag), **ies** (hook — the tile is drawn wide enough to cover the *y*), **ves** (flat — covers *f* / *fe*). Level 3 adds a sixth floating item, the **ring button** (a small circle with three dots), which is the only thing that fits a knot.
- Task line (22 px): **"Make the word for more than one: find the ending that fits the end of the word."** (L3: **"Make the word for more than one. Some words change in their own way."**)
- No words on the apparatus except the noun and the endings (content). The plug shapes are geometry.

## 5. The hand
- **Drag an ending tile** to the jetty's tail (or tap tile, then tap the tail). Within 100 ms the tile follows the finger; near the tail (40 px) it settles on with a soft magnetic pull (120 ms) and the letters it covers slide under it (*y* of *baby* tucks under *ies*; *fe* of *knife* tucks under *ves*; for a wrong tile nothing tucks — *fox* + *s* shows *foxs* on the board). **Every tile seats before Check, at every level** — the tail shows a neutral bar, so nothing refuses a tile before the child commits; the name-board shows exactly the word the child built. At Check the real plug rises from the post and the shapes meet (see §7).
  - **Shapes: shown** (help setting): the real plug shapes are drawn on the tails and the sockets on the tiles from the start, as a reading aid — but a mismatched tile STILL seats until Check (no bump before Check), so the setting helps the child think, it never lets them find the answer by trying tiles.
- **Tap the knot** (or the ring button) → a ring of three forms rises out of the water around the tail (each a 120 × 52 chip, 26 px). Tap one → it replaces the word on the jetty; tap the jetty word again → the singular comes back (undo).
- **Remove** a seated tile: drag it back to the water.
- **Check** → the plural floats to the three pads (success) or the miss ladder.
- **Free play**: after a cure, drag any ending tile onto the finished word's tail → it bumps (already plural); tap the left single picture → it hops onto the right pads and the name-board shows the plural; tap a right copy → it hops back and the board shows the singular — "one / more than one" as a toy.

## 6. The rounds
One round = one noun (picture + word). Order-only reshuffle per pass. Tile order in the water is fixed (s, es, ies, ves, ring) so a tile's place says nothing about the round; balance is by category per level.

**Level 1 — s or es**
| # | picture | one | more than one | plug → tile |
|---|---|---|---|---|
| 1 | toys/ball | ball | balls | straight → s |
| 2 | toys/kite | kite | kites | straight → s |
| 3 | christmas/present | present | presents | straight → s |
| 4 | christmas/candle | candle | candles | straight → s |
| 5 | classroom/pencil (lie-flat rotation) | pencil | pencils | straight → s |
| 6 | vehicles/bus | bus | buses | zigzag → es |
| 7 | zoo-animals/fox | fox | foxes | zigzag → es |
| 8 | clothing/dress | dress | dresses | zigzag → es |
| 9 | accessories/watch | watch | watches | zigzag → es |
| 10 | furniture/bench | bench | benches | zigzag → es |
| 11 | classroom/lunchbox | lunchbox | lunchboxes | zigzag → es |
5 s / 6 es.

**Level 2 — y and f**
| # | picture | one | more than one | plug → tile |
|---|---|---|---|---|
| 1 | toys/baby | baby | babies | hook → ies |
| 2 | easter/bunny | bunny | bunnies | hook → ies |
| 3 | at-the-supermarket/strawberry | strawberry | strawberries | hook → ies |
| 4 | at-the-supermarket/cherry | cherry | cherries | hook → ies |
| 5 | things-that-fly/butterfly | butterfly | butterflies | hook → ies |
| 6 | around-the-house/key | key | keys | round → s |
| 7 | zoo-animals/monkey | monkey | monkeys | round → s |
| 8 | farm-animals/donkey | donkey | donkeys | round → s |
| 9 | farm-animals/turkey | turkey | turkeys | round → s |
| 10 | zoo-animals/wolf | wolf | wolves | flat → ves |
| 11 | spring/leaf | leaf | leaves | flat → ves |
| 12 | kitchen-tools/knife | knife | knives | flat → ves |
5 ies / 4 s / 3 ves — the most frequent answer covers 42 % of rounds. The *y* pairs (babies/keys) sit in the same level on purpose: the same final letter, two different plugs, decided by the letter BEFORE it.

**Level 3 — Special words** (mixed)
| # | picture | one | true | ring (shuffled) |
|---|---|---|---|---|
| 1 | body-parts/foot | foot | feet | feet · foots · foot |
| 2 | body-parts/tooth | tooth | teeth | teeth · tooths · tooth |
| 3 | farm-animals/goose | goose | geese | geese · gooses · goose |
| 4 | pets/mouse | mouse | mice | mice · mouses · mouse |
| 5 | farm-animals/sheep | sheep | sheep | sheep · sheeps · sheepen |
| 6 | camping/deer | deer | deer | deer · deers · deeren |
| 7 | animals/moose | moose | moose | moose · mooses · meese |
| 8 | — (word card, 3 drawn counters) | child | children | children · childs · child |
| 9 | — (word card) | man | men | men · mans · man |
| 10 | — (word card) | woman | women | women · womans · woman |
| 11 | zoo-animals/fox | fox | foxes | (ending: es) |
| 12 | toys/baby | baby | babies | (ending: ies) |
| 13 | zoo-animals/wolf | wolf | wolves | (ending: ves) |
| 14 | around-the-house/key | key | keys | (ending: s) |
10 knot words, 4 regular words (so "it's L3, everything is special" fails 4 times; "always open the ring" reaches the right form-set in 10 of 14 but still has to pick the form). **The ring button works on every word**: on a knot word it holds [true · +s · singular-or-analogy]; on a regular word it holds three WRONG forms ([+s naive · -en analogy · singular], e.g. *foxs · foxen · fox*) — the ring can never cure a regular word, and choosing from it shows the "it's special" misconception at Check (the word's real plug rises and the form slides off). Ring measurement (critic, `work-c27/measure.js`): the true form is the unique shortest in 3 of 10 (mice, sheep, deer), unique longest in 1 (children), tied elsewhere; "the only form without -s" never identifies the answer (0/10 — the singular or an analogy form is always a second -s-less option); the bot "changed AND no -s" picks right in 7 of 10 — that bot IS the irregular-plural knowledge, and the three same-plural words (sheep, deer, moose) defeat it. Words 8–10 have no library picture (there is no child/man/woman picture that is not a girl or a person holding a work tool — PICTURE-RULINGS), so their pads hold drawn round counters (1 · 3) instead of pictures — honest fallback, labelled in the gate.

## 7. Check, the misses, the success
- **Check with nothing on the tail** → bubble **"Bring an ending to the end of the word first."** (L3 knot round with nothing done → **"Try an ending — or look at the end of the word."**) No miss.
- **Miss 1** →
  - wrong ending tile: the true plug rises from the post, glows, meets the tile's socket, does not fit, and the tile is pushed off with a bump (60 ms knock, 2 px shake); the letters the plug belongs to are underlined (*x*; *sh*; the consonant + *y*; *fe*), and the plug shape STAYS drawn on this tail until the next Check. Bubble **"Look at the end of the word: what shape is its plug?"**
  - knot word: the knot ties itself (a 300 ms twist), flicks the tile away; the ring button pulses. Bubble **"This word has a knot: no ending fits. It changes in its own way."**
  - wrong ring form: the chosen form slides off the jetty back into the ring and dims for this try. Bubble **"Not that one. Say it: one {singular}, many …?"**
- **Miss 2** → every tile in the water shows its socket bigger with a matching ghost outline drawn over the plug (shape-to-shape), or, in the ring, the wrong form chosen twice is removed (two forms left) and the true form's changed letters are faintly outlined (e.g., the *ee* of *feet*). Bubble **"Match the shapes: which socket fits this plug?"** / **"Look at the letters in the middle of the word."**
- A new move clears the help until the next Check.
- **Success** → the word lifts off the jetty and floats onto the three right pads; changed letters glow coral for 800 ms; the pictures bob. Bubble **"One {singular}, three {plural}!"** + (when the rule was used) **"{plug}: {rule}."** — en rule lines: zigzag **"A hissing end takes -es."** · hook **"Consonant + y: the y turns into -ies."** · round **"Vowel + y: just add -s."** · flat **"f or fe turns into -ves."** · knot **"A special word: it changes in its own way."** · same **"A special word: it stays the same."**

## 8. Settings
1. **Level**: s or es (L1) · y and f (L2) · Special words (L3, default — the page's promise is irregular plurals, and L3 mixes regular words in so special words must be noticed).
2. **Shapes**: after a try (default, every level) · shown (help — the real plug and socket shapes are drawn from the start; tiles still seat until Check). The tails visibly change (real plug shapes vs neutral bars).

## 9. Words (EN source)
- title **The Doubling Pond** · task L1/L2 **Make the word for more than one: find the ending that fits the end of the word.** · L3 **Make the word for more than one. Some words change in their own way.**
- hints **Bring an ending to the end of the word first.** · **Try an ending — or look at the end of the word.** · **Look at the end of the word: what shape is its plug?** · **This word has a knot: no ending fits. It changes in its own way.** · **Not that one. Say it: one {singular}, many …?** · **Match the shapes: which socket fits this plug?** · **Look at the letters in the middle of the word.**
- celebration **One {singular}, three {plural}!** + the rule lines in §7.
- settings **Level** — **s or es** · **y and f** · **Special words** · **Shapes** — **Shown** · **After a try**
- Every locale gets its OWN tail table (plug shapes derived from that locale's letters by that locale's rule; built by the native author, gate-checked). Words and plurals come from the library labels (`labels[loc] = [singular, plural, gender]`), never translated from en. Locale traps:
  - **de**: plural is mostly lexical (-e, -er, -n, -s, Umlaut), not predictable from the end — so de has NO plug shapes at all; every de word is a ring word and the level axis is *Umlaut + e* (Baum→Bäume, Hand→Hände, Zahn→Zähne, Stuhl→Stühle, Fuchs→Füchse) · *Umlaut + er* (Mann→Männer, Buch→Bücher, Wald→Wälder, Blatt→Blätter) · *Umlaut only* (Apfel→Äpfel, Vogel→Vögel) · *no change* (Messer, Schlüssel, Esel). Rings: [true, no-umlaut form, +s] — e.g. Bäume · Baume · Baums. Spelling payoff named in the celebration: *ä kommt von a*. ⚠ library vocab defect: camping/deer and forest-creatures/deer give de *Hirsch → Rehe*; the plural of Hirsch is *Hirsche* — never use deer in de until fixed (reported).
  - **fr**: tail table: plain → *s*; -s/-x/-z → *nothing* (souris→souris, bus→bus: a "full" plug that only the fr-only **—** tile fits — a blank tile meaning "add nothing"; any locale whose rule produces a no-change plural by its END letters gets this tile, en does not); -al → *-aux* (cheval, animal, journal); -eau/-eu → *+x* (château, couteau→couteaux, jeu, feu); -ou → *s* except the seven (bijou, genou, hibou → *x*: knot words). Plural is mostly silent in speech — the rule must be SEEN, which is exactly what the plugs do.
  - **es (MX)**: vowel → *s* (round); consonant → *es* (straight); -z → *-ces* (pez→peces, luz→luces, lápiz→lápices — the *z* tucks under); -ón/-ín/-án → *-ones/-ines/-anes* with the accent dropping (camión→camiones, ratón→ratones: library *Ratón→Ratones* ✓) — the accent is part of the tucked letters.
  - **pt (BR)**: vowel → *s*; -r/-z → *es*; -m → *-ns* (homem→homens); -l → *-is* (animal→animais, papel→papéis, lençol→lençóis); -ão → three outcomes (pão→pães, balão→balões, mão→mãos) → -ão words are knot/ring words. Library *Ônibus→Ônibus* (same).
  - **it**: the plural REPLACES the final vowel: -o → -i, -a → -e, -e → -i; -co/-go → *-chi/-ghi* (lago→laghi; but amico→amici: amico is a knot word); feminine -o (mano→mani), -o → -a (uovo→uova, braccio→braccia, dito→dita, paio→paia) are knot words.
  - **nl**: -en / -s; doubling after a short vowel (kip→kippen, bal→ballen, man→mannen), singling a long vowel (boom→bomen, maan→manen, poot→poten), f→v / s→z (brief→brieven, muis→muizen); schip→schepen, kind→kinderen are knot words; -el/-er/-je → *-s* (sleutel→sleutels).
  - **sv**: en-words in -a → *-or* (flicka→flickor, apa→apor); en-words in consonant → *-ar* or *-er* (lexical!) — sv uses plugs only for the -a → -or class and makes the rest ring words; omljud knot words (fot→fötter, tand→tänder, hand→händer, bok→böcker, natt→nätter, bror→bröder, mus→möss); ett-words in consonant → same (barn, djur, får, lejon). **da/no** similar with *-er/-e/zero*, da doubling (kat→katte, the da sheet's rule).
  - **fi**: always *-t*, but consonant gradation changes the stem: kukka→kukat, pallo→pallot (no change), mansikka→mansikat, lehti→lehdet, susi→sudet, hammas→hampaat, lammas→lampaat. fi plugs: "double kk/pp/tt before the last vowel" → the double letter halves (the tile tucks one *k*); others are ring words.

## 10. Sound off, access, phones
- Sound off: plug shapes, the snap, the underline and the three pads carry it; TTS reads "one fox, three foxes" where available.
- Keyboard: Tab to a tile → Enter lifts it → Enter on the tail seats it (Esc returns); Tab to the knot → Enter opens the ring → arrows + Enter; Check.
- Taps: tiles 72 × 56; ring chips 120 × 52; the tail target 64 × 70.
- Phones: 360 — jetty 328 wide (long words: *strawberries* 12 letters → tiles shrink to 24 × 40, never below 22 px glyphs; the tail stays visible), pond 328 × 190, tiles 3 + 2 rows under the pond, bubble below, Check above the fold (jetty 100–160, pond 170–360, tiles 370–490, bubble 500–580, Check 600). 320 — pictures stay 64 px; the three right copies overlap by 30 % (each still ≥ 64 px).

## 11. Distinct from
- **Row 75** (*the ending arrives with the second plate* — L.K.1.c): there an ending APPEARS because there are more; here the child chooses WHICH ending by the shape of the word's end, and special words refuse endings altogether.
- **Row 122 Hook Tile** (apostrophe-s vs plain s): possession, not plural spelling.
- **Row 214/215/216** (sound/syllable/vowel): no plurals.
- ⚠ **COVERAGE GAP for the final pass (critic, 2026-10-17):** G2-315 / G2-324 / G2-325 / G2-326 / G2-327 ("Spelling Rules", "Which One?", "Rule Detective", "Sort by Spelling Rule", "Write the Word") are only PARTLY covered here — this instrument carries their PLURAL-ending rules. Their non-plural position-dependent spelling rules (en ck/k, tch/ch, -dge/-ge, ai/ay, magic-e, floss; de tt/ll/ck/tz/ie; es b/v, c/qu, g/gu, r/rr; it doppie, c/ch; pt s/ss, ch/x; sv/no dubbelteckning, sj-ljudet; fi kk/tt…) need their OWN row (a spelling-rule instrument); until one is designed, the coverage map must not count these five sheets as covered by 178.
- The old pond (3-chip pick) — replaced by tiles that physically fit or refuse.

## 12. Build plan
- **Core** `doubling-pond-core.js`: per-locale `tails[loc] = [{ id:'zigzag', re:/(s|x|z|sh|ch)$/, tile:'es', tuck:0 }, { id:'hook', re:/[^aeiou]y$/, tile:'ies', tuck:1 }, { id:'round', re:/[aeiou]y$/, tile:'s', tuck:0 }, { id:'flat', re:/fe?$/, tile:'ves', tuck:'f|fe' }, { id:'straight', re:/./, tile:'s', tuck:0 }]`; `special[loc] = { foot:{true:'feet', ring:[…]}, … }`. `plugOf(word) = special[word] ? 'knot' : first tails[] whose re matches`; `apply(word, tile)` → plural string; `isRight(round, state) = state.form === round.plural` where `round.plural` is the LIBRARY label plural (en `labels.en[1]`, lower-cased) — the oracle compares the DERIVED form (word + tile by the tail rule) with the independent library plural, so a wrong tail rule fails the gate.
- **Gate** `verify-doubling-pond-core.js`: for every round ×11 — derived plural === library plural (or the authored plural for word-only rounds); exactly one tile (or one ring form) yields it; each L1/L2 locale level has no answer category > 50 %; L3 has ≥ 3 regular words; ring length tell (unique shortest/longest ≤ 40 %); every picture key exists in its theme json, is colour, and is not on the refusal list (no plum/peach/fish-as-"fishes", no *scarf* — *scarfs/scarves* are both correct); de deer excluded; no round uses a word with a known plural exception to its tail rule (*roof, chief, piano, photo, chef*).
- **Mutations**: plug by stored class instead of the regex · *s* socket also fits zigzag · *ies* tile fits round tails · knot accepts an ending tile · a tile on top of a ring form accepted (*feets*) · ring offers two true forms · ring on a regular word offers the true plural · a mismatched tile refused before Check (trial-and-error) · shapes shown by default · ring correct by position · grade before Check · help persists after a new move · same order twice.
- **Pictures to verify** (seen on the contact sheets for this design: foot, tooth, goose, mouse, sheep, deer, moose, fox, wolf, monkey, donkey, turkey, butterfly, ball): recheck kite, present, candle, pencil (needs the lie-flat rotation per ruling), bus (must carry no printed text), dress, watch, bench, lunchbox, baby, bunny, strawberry, cherry (the supermarket cherry — the fruits cherry is drawn as an apple), key, leaf, knife.
- **Risks**: long words on phones; the plug must read as geometry, not as a symbol to decode — keep only 5 shapes per locale.
- BLOCKED: no child/man/woman pictures → drawn counters (fallback above).

## 13. The four questions
1. **Choose it again?** Yes — snapping endings onto word tails is a satisfying puzzle, and the knot words are a recurring surprise.
2. **Teacher on the board?** Yes — the rule (*hissing end → es*, *consonant+y → ies*) is visible on the word itself, and special words are honestly special.
3. **Parent trust?** Library pictures, real spelling rules, no scores, works silently.
4. **The invention:** the Tail Plugs — the end of a word has a shape, every plural ending a socket, and only the ending that fits the shape can click on; special words wear a knot.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 3→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- The default "shapes shown" mode let a tile seat only if it matched, so a child could find every L1/L2 answer by trying tiles until one clicked — no reading needed, no miss possible. Now every tile seats until Check at every level; the plug rises and judges at Check; "shown" is a help setting that draws the shapes but still never refuses before Check.
- Defined the ring button on REGULAR words (three wrong forms — it can never cure them; choosing it surfaces the "it's special" misconception) — before, L3's four regular words had no specified ring.
- §3 claimed the ring offered *feets / mices*; it did not. Double marking is now refused physically (a tile on a ring form is flicked off by the knot).
- Ring balance measured (`work-c27/measure.js`) and stated honestly, incl. the 7/10 "changed and no -s" bot (= the skill; defeated by sheep/deer/moose).
- Recorded the coverage gap in §11: the non-plural spelling rules of G2-315/324/325/326/327 need their own row (final pass).
