# Row 123 — The Verb Gates (L.1.1.c)

## 0. Identity
- id `vera-verb-match.be-agreement.l-1-1-c` (KEPT) · grade 1 · Common Core L.1.1.c (use singular and plural nouns with matching verbs in basic sentences) · strand Language · page title (frozen) "Vera's Verb Match — Am, Is, or Are? (Grade 1)" · own files `mini tools/verb-gates-core.js`, `verb-gates-activity.js`, `verb-gates-activity.html`; the manifest row stays in `vera-verb-match-activities.json` (id, slugs en/de/fr/es/pt/it/nl/sv, title, intro frozen), `tool` repointed. New da/no/fi metadata at build.
- worksheets it covers (agreement half; the TIME half is row 125's): **G2-336** The Irregular Verbs: be, have, do, go (the agreement forms is/are, was/were, has/have, does/do, goes/go) · **G2-337** Choose the Right Verb Form (number agreement) · **G2-335** Verb Forms in Sentences with Pictures (the subject's pictures decide the form) · **G2-317 / G2-334 / G2-338** are covered by row 125 (today/yesterday, base form); this row covers their was/were and has/have items.
- what the old activity did: a sentence with a gap ("The dogs ___ in the yard."), three chips am/is/are, tap one. sv was already rebuilt as predicate-adjective agreement (*Björnen är stor / Gräset är grönt / Blommorna är gula*) because Swedish verbs do not agree. **Kept:** every sentence of every locale (en, de, fr, es, pt, it, nl, sv) as the seed of level 1–2; es/pt/it's choice of *estar/stare* (location and state — the honest "be" for these sentences); the sv adjective design, extended to da/no. **Gone:** the bare chip row; the plain text stage.

## 1. The pitch
"Every verb is a gate on the path through the sentence: IS is a turnstile that lets exactly one through, ARE is a heavy double gate that only opens when two or more push together, and AM opens only for the star that means *me*."

## 2. Why a child will want it again (the fun)
- **The path.** The sentence lies along a garden path: the subject's word stands at the start like a little house, the rest of the sentence (*in the yard.*) is the garden at the end. The gap is an empty gateway in the hedge.
- **Gates you can feel.** Three gates hang on a rack: a narrow brass **turnstile** (is), a wide wooden **double gate with two handles** (are), and a small round **star door** with a star-shaped keyhole (am). Drag one into the gateway: it clunks into its posts.
- **The walk.** Press Check and the subject walks out of its house: library dogs trot out one after another toward the gate. Through the turnstile: *click* — one dog through — *clack*, it locks; the other two dogs bump into it and sit down behind it. Against the double gate: one dog pushes alone… the gate creaks but does not open; a second dog joins, and together they push it wide (*whoosh*). The star (I) glides to the star door; the keyhole lights and the door spins open.
- **The garden at the end.** When everyone gets through, the garden end of the path blooms — the predicate words light up one by one and the subject's pictures settle into the garden (*in the yard*), wagging/bobbing. Each solved round plants one flower on the hedge (drawn geometry: a five-petal circle); a pass ends with the hedge in flower.
- **Free play:** any time, the child may tap the subject's house to "send them out" with whatever gate is in — the walk always plays honestly. Trying the turnstile on a crowd is funny every time.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** the verb agrees with the subject's number: *I am*, one other → *is*, more than one → *are*; in the past *was/were*; and for *have/do/go* the one-other form carries -s (*has, does, goes*) and the many form does not (*have, do, go*). Each locale's own forms (§9).
- **Misconception 1 — "is" with a plural subject (*the dogs is*).** The turnstile physically lets one through and locks; the rest of the crowd sits outside the gate. The sentence visibly leaves dogs behind.
- **Misconception 2 — "are" with one (*the dog are*).** The double gate needs two pushers. One dog leans on it and nothing happens; it stands there, waiting.
- **Misconception 3 — "I is / I are."** Only the star door opens for the star; the turnstile's arm is too high for the star token (it bounces off), the double gate needs two.
- **Misconception 4 — reading the noun ending as decoration** (*dog* vs *dogs*, *Der Hund* vs *Die Hunde*). The subject's crowd is NOT shown until Check — the child has to read the subject word to know who is coming. (Setting "Show who" reveals them first, for beginners.)
- **Misconception 5 (levels 4–5) — the -s belongs to plurals.** The -s goes on the VERB for ONE (*the dog runs*, *the dog has*) and is missing for MANY (*the dogs run*, *the dogs have*): *has/does/goes/runs* are always turnstiles, *have/do/go/run* always double gates. The plural noun has an s; the singular verb has an s. The gate shape — not the letters — tells which.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 480 × 440):
- **The path** (y 150–300): a drawn gravel path running left → right, 480 × 64, between two hedge bands (drawn green rounded rectangles, 24 px). The **subject house** at the left end (x 8–128): a drawn little doorway frame (120 × 120) with the subject word on a sign plank above it (Baloo 2, 30 px — the content). The **gateway** in the middle (x 200–300): two hedge posts 100 px apart, empty until a gate is hung. The **garden** at the right end (x 320–472): a drawn bed (152 × 120) with the predicate words written along the path's edge (Nunito 24 px: *in the yard.*).
- **The sentence strip** (top, y 70–130): the whole sentence in large type (32 px) with the gap shown as a dotted box the width of the hung gate's word — *The dogs [ ] in the yard.* The strip is the reading surface; the path is the consequence.
- **The gate rack** (bottom, y 330–430): three gates hanging on a drawn rail, each 112 × 96, the verb word painted on its top bar (content, 28 px): **turnstile** (a brass post with three arms, one-body wide), **double gate** (two wooden leaves, each with a round handle, twice as wide), **star door** (a round door with a star keyhole). In levels 4–5 only two gates hang (turnstile + double gate) with that level's words.
- **The crowd** (hidden until Check, or shown with "Show who"): the subject's library pictures, **96 px** each, identical instances, 1 for one, 2–4 for many (the number is a property of the round — §6). "I" and "we" use **the star token**: a drawn gold star 64 px with a soft glow (geometry, means *me, the one speaking*); "we" = the star + 1–2 pictures.
- **Task line** above (≤ 24 px). **Bubble** right.

**At 360 px** (stacked; stage 360 × 540): sentence strip on top (26 px, wraps to 2 lines max); the path turns into a gentle S so it fits: house (96 × 96) top-left → gateway centre (posts 84 px apart) → garden bottom-right (140 × 96); crowd pictures **64 px** (four many = 2 × 2 cluster); gate rack 3 × 104 × 84; Check below. Check bottom ≤ 700 at 360 × 740, ≤ 620 at 320 × 640 (at 320 the hedge bands thin to 14 px and the house to 84 px).

No words on the apparatus except the sentence (content), the subject sign and the verb words on the gates (content).

## 5. The hand
- **Hang a gate:** drag a gate from the rack to the gateway (or tap a gate: it slides there, 220 ms). It clunks into the posts (wooden *thock*, 80 ms after the drop), and its word drops into the sentence strip's gap (the dotted box fills; 160 ms).
- **Swap:** drag another gate onto the gateway — the old one swings back to the rack.
- **Remove:** tap the hung gate → it returns to the rack.
- **Send them out (free play, any time a gate is hung):** tap the subject house. The crowd walks out (each picture 260 ms apart, 600 ms to the gate) and meets the gate:
  - *turnstile:* the first through (arm turns 90°, *click*, 180 ms), then it locks (*clack*); others bump (6 px bounce) and sit (scale 0.92).
  - *double gate:* one pusher → the gate creaks and wobbles 3° and stays; at two pushers → the leaves swing open (320 ms, *whoosh*) and all walk through.
  - *star door:* the star's glow fills the keyhole, the door spins open (360 ms, a soft chime); any picture token bumps off it.
  - Everyone through → the garden lights.
  Sending out is not Check (no miss, no hint) — it is exploration; the walk resets after 2 s.
- **Tap the subject sign:** TTS reads the subject where available; with "Show who" ON the crowd stands visibly in the doorway at rest.

## 6. The rounds
One round = one sentence with a gap. Check runs the walk and judges.

**Level 1 — I, one, or many? (am / is / are), 9 rounds.** Gates: star door (am), turnstile (is), double gate (are).

| # | sentence | right | crowd (library) |
|---|---|---|---|
| 1 | I ___ ready to play. | am | star |
| 2 | The dog ___ in the yard. | is | pets/dog ×1 |
| 3 | The dogs ___ in the yard. | are | pets/dog ×3 |
| 4 | The cat ___ fast asleep. | is | pets/cat ×1 |
| 5 | The cats ___ on the mat. | are | pets/cat ×2 |
| 6 | I ___ a big helper. | am | star |
| 7 | The bird ___ in the nest. | is | spring/bird ×1 |
| 8 | The ducks ___ in the pond. | are | farm-animals/duck ×4 |
| 9 | The frog ___ on a log. | is | camping/frog ×1 |

Right: am 2, is 4, are 3 per pass (the next pass swaps two rounds so is/are alternate 4/3 ↔ 3/4).

**Level 2 — Who is it? (pronouns and names), 9 rounds.** Same gates. She ___ my best friend. (is; toys/girl ×1) · We ___ at the park. (are; star + toys/girl ×1 — *we* = me and others: the star pushes the double gate together with the girl) · They ___ very happy. (are; toys/girl ×3) · It ___ a big dog. (is; pets/dog ×1) · Mia and Zoe ___ on the slide. (are; toys/girl ×2 — two girls' names, so the two identical girl pictures are honest) · The farmer ___ in the field. (is; occupations/farmer ×1 — the draft called this picture "Grandpa": the picture is a farmer, so the sentence says farmer) · Mia ___ six today. (is; toys/girl ×1) · We ___ in the garden. (are; star + pets/dog ×1) · I ___ so happy! (am; star). (*You* is excluded: *you are* for one person breaks the gate logic and is not asked by L.1.1.c — documented.)

**Level 3 — Yesterday (was / were), 9 rounds.** Two gates: turnstile **was**, double gate **were** (the star door is not hung: the star fits the turnstile in the past — the sentence strip begins with *Yesterday*, and the turnstile's arm lowers for the star). Yesterday I ___ at the beach. (was; star) · Yesterday the dog ___ wet. (was) · Yesterday the dogs ___ wet. (were) · Last night the cat ___ on my bed. (was) · Last night the cats ___ hungry. (were) · Yesterday we ___ at the zoo. (were; star + 1) · Yesterday the birds ___ in the tree. (were) · Yesterday the frog ___ in the pond. (was) · Yesterday I ___ very tired. (was; star). Right: was 5, were 4.

**Level 4 — Has or have? Does or do? Goes or go? (G2-336), 9 rounds.** Two gates per round: turnstile carries the -s form, double gate the plain form; the words change per round. The dog ___ a ball. (has / have → has) · The dogs ___ a ball. (have) · The cat ___ to sleep. (goes / go → goes) · The cats ___ to sleep. (go) · The bird ___ a nest. (has) · The birds ___ to the tree. (go) · The duck ___ a little hop. (does / do → does) · The ducks ___ a little hop. (do) · The frog ___ to the pond. (goes). Third-person subjects only (*I have / I go* would need the star at a double gate — refused here; the star appears only in levels 1–3). Right: turnstile 5 (has, goes, has, does, goes), double gate 4 (have, go, go, do). Each round's two gates carry the SAME verb (has/have, goes/go, does/do), so the only decision is one or many.

**Level 5 — Any verb (the -s lane), 9 rounds.** Gates: turnstile = verb + s, double gate = verb. The dog ___ . (runs / run) · The dogs ___ . (run) · The bird ___ . (sings / sing) · The birds ___ . (sing) · The cat ___ milk. (drinks / drink) · The cats ___ milk. (drink) · The frog ___ . (hops / hop) · The frogs ___ . (hop) · The duck ___ . (swims / swim). Right: turnstile 5, double gate 4. (en-specific; other locales use their person endings — §9.)

**Answer position.** Gates hang in a fixed physical order (star, turnstile, double gate — the rack is a tool, like an easel's colours); the guessable thing is therefore the GATE, and it is balanced by content: within each level, each gate is right 3–5 times, never three times in a row. The crowd size never tells (hidden until Check by default; with "Show who" it is the scaffold). The gate's bots: *always is/turnstile* (≤ 5/9 per level), *always the gate matching the noun's last letter being s* (en levels 1–2: the plural word ends in s — the bot "s-ending subject → are" scores high by design; that IS reading the subject, so it is reported, not capped; levels 4–5 deliberately break it: *The dogs have* vs *The dog has* — the bot "verb with s for subject with s" must score ≤ 1/9).
**Order:** order-only reshuffle per pass; never two rounds with the same subject in a row.

## 7. Check, the misses, the success
- **Check with no gate hung:** hint, no miss — "Hang a gate in the hedge. Who is coming down the path?"
- **Miss 1:** the walk plays and shows the failure:
  - *turnstile, many:* one through, the rest sit behind the locked turnstile; dotted outlines of the left-behind pictures pulse · "The turnstile lets only ONE through. How many are coming?"
  - *double gate, one:* the lone picture pushes, the gate creaks and stays shut; a dotted outline of a second pusher appears beside it, empty · "This gate needs two or more to push it open."
  - *star door, a picture:* it bumps off the keyhole · "The star door is only for I."
  - *turnstile/double gate, the star:* the star bounces off the arm / waits alone at the double gate · "Who is speaking? I — that is the star."
- **Miss 2:** the crowd stands visibly in the house's doorway (as with "Show who") and the right gate on the rack lifts 6 px with a teal glow · "Count who is coming, then try the glowing gate."
- **A new move takes the help away** until the next Check.
- **Success:** everyone walks through, the gate swings shut behind them, the garden words light left to right, the pictures settle and bob, a flower opens on the hedge, the whole sentence reads in the strip with the verb in teal · "The dogs are in the yard — more than one, so ARE!" (by case: "The dog is in the yard — just one, so IS!" · "I am ready to play — I, so AM!" · L3 "…so WERE!/WAS!" · L4–5 "The dog has a ball — one dog, so HAS!" / "The dogs run — more than one, so RUN!").

## 8. Settings
1. **Verbs:** am · is · are (L1) · Who is it? (L2) · Yesterday: was · were (L3) · has · does · goes (L4) · Any verb (L5) — the shell's level picker; the rack shows that level's gates at rest.
2. **Show who:** Hide until Check (default) · Show who is coming — the crowd stands in the doorway at rest.

## 9. Words (EN source)
- title (shell): **Vera's Verb Match** (frozen) · instruction: "Hang the gate that lets everyone through. Read who is coming first!"
- task lines: L1–L2 "Read who is coming. Which gate fits?" · L3 "Yesterday! Which gate fits?" · L4–L5 "One or more? Which gate fits?"
- hints and celebrations: §7 exactly; Check-empty: "Hang a gate in the hedge. Who is coming down the path?"
- settings: "Verbs", "am · is · are", "Who is it?", "Yesterday: was · were", "has · does · goes", "Any verb", "Show who", "Hide until Check", "Show who is coming"
- aria: "Sentence: {sentence}", "Gate {word}: lets one through" / "needs two or more" / "only for I", "{n} {subject} walked through the gate" / "{k} could not get through".

**Locale traps (forms are literal per round; the old sentences are kept):**
- **de** bin/ist/sind; L3 war/waren (*ich war* takes the turnstile); L4 hat/haben, geht/gehen, macht/machen. Nouns capitalised; *Die Kinder* is plural with no -s (the crowd decides, not the s — good: it breaks the s-bot).
- **fr** suis/est/sont; L3 était/étaient (*j'étais* — the strip shows *J'* elided: the star's sign reads *J'*); L4 a/ont, va/vont, fait/font. *Les oiseaux* — plural heard only in the article: the crowd teaches it.
- **es** (es-MX) estoy/está/están (location/state with *estar*, as before); L3 estaba/estaban; L4 tiene/tienen, va/van, hace/hacen. Subject pronouns can be dropped in Spanish — every round names its subject explicitly (*Yo, El perro*).
- **The star has no gender — so no *I*/*we* round in fr/es/pt/it may end in a gendered predicate** (*Je suis prêt/prête*, *Estoy listo/lista*, *Nous sommes contents/contentes*): two right answers by the speaker's sex. I/we rounds use a place (*dans le jardin*, *en la escuela*, *in giardino*) or an invariable word (pt *feliz*, fr *à l'école*, it *a casa*). The old en *I am ready to play* is fine in English; its fr/es/pt/it rounds are the old location sentences. Third-person rounds may agree (the subject's article fixes the gender: *Le chat est fatigué*).
- **pt-BR** estou/está/estão; L3 estava/estavam; L4 tem/têm (the circumflex is the whole difference — the two gates show it large), vai/vão, faz/fazem.
- **it** sto/sta/stanno (as before); L3 stava/stavano; L4 ha/hanno (h silent — never offered without its h), va/vanno, fa/fanno.
- **nl** ben/is/zijn; L3 was/waren; L4 heeft/hebben, gaat/gaan, doet/doen.
- **Crowd pictures per locale.** Every subject must be drawn by a library picture (the walk shows it). Old subjects with no picture are re-cast, never drawn by hand: de *Die Kinder sind froh* / fr *Les enfants sont contents* / es *Los niños* / pt *As crianças* / it *I bambini* / nl *De kinderen* → toys/girl ×3 is NOT honest for mixed children — these rounds become *Die Mädchen sind froh* (and fr *Les filles sont contentes*, es *Las niñas están contentas*, pt *As meninas estão contentes*, it *Le bambine stanno in classe*, nl *De meisjes zijn blij*); *Meine Freundin / Mon amie / Mi amiga / Minha amiga / Mijn vriendin* → toys/girl ×1; it *La nonna sta bene oggi* → *La bambina sta bene oggi* (no grandmother picture exists); it *Vera sta nella sua tana* → *Il coniglio sta nella sua tana* (pets/rabbit; Vera is never drawn); it *Le api* → spring/bee ×3; *Les oiseaux / Die Vögel / Los pájaros…* → spring/bird ×3.
- **sv/da/no — verbs do not agree** (*är / er* for everyone). The gates become the **predicate adjective** (the old sv design, kept): turnstile = the plain form (one *en*-word / *n*-word: *stor*), a second narrow turnstile with a small t-flag = the neuter form (one *ett*-word: *stort*), double gate = the plural form (*stora* / *store*). L1 sv *Björnen är [stor]* (camping/bear), *Gräset är [grönt]* (spring/grass), *Blommorna är [röda]* (spring/flower ×3 — the flower is RED on the contact sheet; the old *gula* contradicted it), *Bäret är [rött]* (at-the-supermarket/raspberry), *Boet är [varmt]* (spring/nest), *Bina är [glada]* (spring/bee ×3), plus two re-cast rounds for old subjects with no picture — *Vinden är stark* → *Bollen är [rund]* (toys/ball), *Pälsen är mjuk* → *Katten är [mjuk]* (pets/cat) — and *Huset är [stort]* (camping/cabin) = 9; da *Hunden er stor / Huset er stort / Hundene er store*; no *Hunden er stor / Huset er stort / Hundene er store*. Gender pushback: the t-flag turnstile turns only for an *ett/et*-word; on a miss the subject's indefinite article is ghosted above it (*ett gräs*) — the reason. L2 in sv/da/no: pronouns and names with the adjective (*Hon är glad*, *De är glada*, *Mia och Zoe är glada*, *Det är stort* for an ett-word). L3 the same with the past *var* (*Björnen var stor*). L4–L5 are skipped (no agreement exists to teach — the level picker hides them; documented). In each sv/da/no level the three gates are each right at least twice; the *t*-turnstile is right 2–3 times per level so it is a real choice, never decoration. Colour adjectives are used only where they are true of the picture (*Gräset är grönt*, *Blommorna är röda*).
- **fi** olen/on/ovat (minä olen, koira on, koirat ovat); L3 olin/oli/olivat; L4 *on* with possession is *koiralla on pallo* (no agreement) → fi L4 uses *menee/menevät, tekee/tekevät, juoksee/juoksevat*; L5 = L4 verbs widened.
- **The star means *I* in every locale** and is drawn the same; its sign word is the locale's (Ich, Je/J', Yo, Eu, Io, Ik, Jag, Jeg, Minä).
- Sound off: the walk shows everything; TTS reads the finished sentence only.

## 10. Sound off, access, phones
- Silent legibility: people left behind a turnstile, a gate that will not open for one, a star door that only spins for the star.
- Keyboard: Tab to a gate, Enter hangs it; Delete removes it; Enter on the house sends the crowd out; Check is the shell's.
- aria-live narrates the walk: "One dog went through the turnstile. Two dogs could not get through."
- Taps: gates 112 × 96 (104 × 84 at 360); house 120 / 96; the gateway accepts drops in a 120 × 120 zone.
- Pictures 96 px at 704, 64 px at 360.
- Phone: the S-shaped path; the walk plays the same; the bubble is one line until miss 2.

## 11. Distinct from
- **New 223 Looking Kerb / New 207 Bus Queue** — animals at a kerb / a bus door; neither is a grammar gate, and here a gate's WIDTH is the verb's number.
- **Row 75 Plate Stack** — the noun's plural ending; here the verb's agreement.
- **Row 125 Time Frames (this batch)** — tense (when); this row is number (how many). Level 3 here uses *was/were* only as agreement; row 125 never shows gates.
- **Row 19 Number Elevator, #18 Bridge** — counting mechanics; nothing is counted here except by the gate.

## 12. Build plan
- **Data:** per locale, levels of rounds `{id, sentenceBefore, sentenceAfter, subject, crowd:{kind:'star'|key, n, plusStar?}, gates:[{word, shape:'turnstile'|'double'|'star'|'turnstileT'}], right}`.
- **Core state:** `{level, round, hung:null|gateIdx, showWho, misses}`; functions `hang(i)`, `unhang()`, `walk()` → `{through, leftBehind, waiting}` (pure: shape × crowd: turnstile → through = min(1, n) if token type admitted; double → through = n ≥ 2 ? n : 0; star → through = star ? 1 : 0; turnstileT admits only neuter subjects), `check()` → `{ok, reason}`.
- **Gate's own ground truth** (`verify-verb-gates-core.js`): its own table — en: subject I → am/was-turnstile; singular → is/was/has/does/goes/verb+s; plural → are/were/have/do/go/verb; de/fr/es/pt/it/nl/fi its own person-number table keyed by subject class; sv/da/no adjective endings from its own copy of the vocab gender (t/n; da/no: n/m vs neuter) — asserts every round's `right` equals the table, `walk()` lets all through ONLY for the right gate, never for a wrong one; crowd n = 1 for singular, 2–4 for plural, star for I; L4–L5 s-bot ≤ 1/9; per-level gate balance; no *you* subject anywhere; every picture exists.
- **Mutations:** turnstile lets two through · double gate opens for one · star door opens for a picture · turnstile admits the star in the present · L3 star door hung · crowd shown before Check with Show-who off · sv t-turnstile turns for an en-word · L4 round with subject I · right gate always the turnstile.
- **Pictures:** pets dog, cat, rabbit; spring bird, bee, grass, flower (RED), nest; farm-animals duck; camping frog, bear, cabin; toys girl, ball; occupations/farmer; at-the-supermarket/raspberry (critic, contact sheets 2026-10-17; every key exists). No *Grandpa*, *grandmother*, *children* (mixed) picture exists — those subjects are re-cast (§9). The dog and cat are single, front-facing — good walkers.
- **Risks:** a crowd of four 96 px pictures at the gateway — at 704 they queue in a line of 4 (path is 480 wide, queue overlaps by 30% like a real queue); at 360 a 2 × 2 cluster.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a turnstile that strands three dogs, a gate that two have to push together, a star door that spins only for *me*.
2. **Would a teacher put it on the board?** Yes — agreement becomes a physical fact: *is* lets one through, *are* needs company; the class can call out "how many are coming?" before the walk.
3. **Would a parent trust it?** Yes — the real verbs of their language (and, honestly, the adjective agreement where verbs do not agree), real pictures, no scores.
4. **The invention:** every verb is a gate — IS lets exactly one through, ARE opens only when two or more push, AM opens only for the star that means *me*.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- **A picture that lied:** L2 "Grandpa ___ in the tent" was drawn with occupations/farmer → "The farmer ___ in the field." "Mia and Sam" was drawn as two girls → "Mia and Zoe".
- **sv colour contradiction:** *Blommorna är gula* would walk three RED spring/flowers down the path → *Blommorna är röda*. sv subjects with no picture (*vinden*, *pälsen*) re-cast to *Bollen är rund*, *Katten är mjuk*; sv L1 is now 9 rounds with a picture each, and the *t*-turnstile is right 2–3 times per level.
- **Every old subject now has an honest picture in every locale:** mixed *children* → girls (the crowd is three girls), *Meine Freundin* → girl, it *la nonna* (no art) → *la bambina*, it *Vera* (never drawn) → *il coniglio*.
- **Two right answers by the speaker's sex removed:** no fr/es/pt/it I/we round may end in a gendered predicate (*prêt/prête*, *listo/lista*); they use places or invariable words.
- Level 4 and 5 right-gate counts stated (5/4), L4 gates always carry the same verb; sv/da/no level 2 defined.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
