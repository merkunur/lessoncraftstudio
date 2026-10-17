# Row 180 — Rusty's Yesterday Machine → THE THREE DOORS (L.2.1.d)

## 0. Identity
- id `rusty-yesterday.irregular-past.l-2-1-d` (frozen) · grade 2 · Common Core L.2.1.d (+ L.1.1.e verb forms) · strand Language · own files `yesterday-machine-core.js` (new; `irregular-past-core.js` untouched), `rusty-yesterday-activity.js`, `.html`, `rusty-yesterday-activities.json` (row kept, params rewritten). Title / intro / slugs en..sv frozen; da/no/fi new at build.
- worksheets covered: **G2-317** Verb Forms: Today and Yesterday · **G2-334** Match the Verb to Its Past Form · **G2-335** Verb Forms in Sentences · **G2-336** The Irregular Verbs: be, have, do, go · **G2-337** Choose the Right Verb Form · **G2-338** Find the Verb, Write Its Base Form. The per-locale verb banks of those sheets (`scripts/worksheet-gen/data/b3/locales/verb-forms.<loc>.json`, en in `data/b3/verb-forms.js`) are the verb source for all 11 locales.
- old activity: a present verb, three chips (past / base / over-regularized -ed), a robot SVG stub. **Kept:** 7 of the 8 en verbs (go, run, eat, see, give, come, swim — *give* is the 13th L1 verb, on the dial; *take → took* is dropped because its past changes a vowel AND loses the silent e, which no single door shows honestly) and the 8 locales' verb sets (de Präteritum ging/lief/sah/aß/fuhr/trank/flog/schlief; fr passé-composé participles fait/pris/vu/bu/lu/dit/tenu/reçu; es pretérito hice/tuve/puse/vine/dije/pude/quise/anduve; pt fiz/disse/trouxe/pude/quis/soube/estive/coube; it preso/letto/scritto/chiuso/rotto/aperto/messo/chiesto; nl liep/dronk/sliep/viel/sprong/zwom/las/vloog; sv målade/sprang/lekte/byggde/kom/läste/åt/gick) — including their over-regularized foils (goed, gehte, faisé, hací, prenduto, loopte, ätade), which now come OUT of the machine as real wrong outputs instead of being printed on chips.

## 1. The pitch
"A verb can only get to yesterday through one of three doors — the -ed press, the vowel dial, or the drawer of brand-new words — and if you push *go* through the -ed press, out comes *goed*, which nobody says."

## 2. Why a child will want it again
- Rusty's machine is a chunky apparatus with three round doors, each a different toy: the **-ed press** comes down with a stamp and a hiss of steam; the **vowel dial** is a brass wheel that clicks the word's vowel through a, e, i, o, u while the word changes live under it (*swim → swam → swem → swim → swom → swum*); the **drawer** slides out with three new word tiles inside.
- The machine prints its result on a paper **diary strip** that curls out of a slot at the side: *Yesterday I went to the park.* Funny outputs (*goed*, *swom*) print too — and the machine's little calendar flips back a page only when the word is really yesterday's.
- The earned show: the calendar on top flips from TODAY to YESTERDAY with a page-flutter, the gears spin, and the diary strip reads the whole sentence; the verb glows in the door's colour so the child sees HOW it travelled.
- Free play: run any finished word BACK through its door (the crank turns the other way) and watch *went* become *go* again.

## 3. The skill and the misconception
- Skill: form and use past tense verbs, including frequently occurring irregular ones (be, have, do, go and the common strong verbs); choose present or past by the sentence's time words; find the verb in a sentence and name its base form.
- Misconceptions and the push-back:
  - *"Every verb takes -ed"* (goed, runned, eated, seed) → the press accepts any verb and prints the over-regularized word on the strip, but the calendar REFUSES to flip: the page lifts, flutters and falls back, and the door the verb really uses glows (miss 1). The child sees that -ed is ONE road, not the only road.
  - *"Irregular = random"* → the vowel dial shows that many irregular verbs keep every letter but one vowel (sit/sat, ride/rode, come/came); the drawer holds the truly new words (go/went, be/was, see/saw).
  - *"I seen it / I done it"* (participle for past) → the drawer for *see* holds *saw · seen · sees*; *seen* prints but the calendar won't flip.
  - *"Past tense always"* (L2) → sentences with *Every day / On Fridays* need the TODAY lever — sending them through any door makes the calendar flip to a day the sentence is not about, and it flips straight back.
  - *"was / were are the same"* → the drawer for *be* holds *was · were · been*; *The twins was* prints and is refused.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At 704: stacked — machine left 460 px, bubble under the stage. At 360: stacked.
- **The machine** (drawn apparatus, teal body, cream panels, 3 px ink outlines): 440 × 300 px at 704 / 328 × 260 at 360.
  - Top: a **day calendar** 120 × 80 showing **TODAY** or **YESTERDAY** (content words — the time concept is what the task is about; localized) with a page that can flip.
  - Middle: the **input window** 300 × 64 where the verb (L1) or the sentence with its gap (L2) sits, Nunito 800 30 px / 24 px at 360. L2 shows the base verb in a small tag hanging from the window: **(go)**.
  - Bottom row: **three round doors** 104 px diameter (84 at 360), each with only a symbol, never a word: door 1 a stamp with **-ed** (the ending IS content), door 2 a dial symbol (a circle with a vowel wedge), door 3 a drawer symbol (a little box with three lines). For L2 a fourth control appears left of the doors: the **TODAY lever** (a short lever, 64 × 104).
  - Side: the **diary strip** slot; the strip curls out to 300 × 40 px.
- Locale door sets: a locale whose past never uses vowel change for these verbs (fr, es, pt, it) shows two doors (its regular ending press + the drawer); the dial door is drawn as a blank plate. The regular press shows that locale's ending: en **-ed**, de **-te**, nl **-de/-te** (two stamps on one press; the 't kofschip choice is the child's), sv **-ade/-de/-te**, da **-ede/-te**, no **-et/-te**, fr **-é**, es **-é/-í**, pt **-ei/-i**, it **-ato/-uto/-ito**, fi **-i**.
- No library pictures (verbs are words here; the activity pictures exist for only half the verbs, and a picture on only some rounds would hint at the door).
- Task line (22 px): L1 **"Send the word to yesterday: which door does it go through?"** · L2 **"Is it today or yesterday? Make the verb fit the sentence."** · L3 **"Find the verb, then send it back to today."**

## 5. The hand
- **Tap a door** → it swings open (180 ms) and the word slides in:
  - **-ed press**: the stamp comes down (220 ms, steam puff); the word gets the ending (spelling handled: *dance → danced*, *hop → hopped*, *cry → cried*; the press knows the spelling rules so only the DOOR choice is judged). The result shows in the window.
  - **vowel dial**: the word's main vowel (or vowel team, per locale: de *ie*, *au*, *ei*) is ringed; drag the dial (or tap ◀ ▶ beside it, 44 px) → each click (60 ms tick) changes the ringed vowel through the locale's set; the window shows the live word.
  - **drawer**: slides out with three tiles (the verb's real forms — never invented); tap one → it replaces the word. **The drawer never holds a past form the other doors make**: for a press verb it holds *jumps · jumping · jump*; for a dial verb *swims · swimming · swum* (the participle is a real form and a real trap, never the simple past); only for a drawer verb does it hold the past (*went · gone · goes*). So exactly one door can produce the past of any verb.
- **TODAY lever** (L2): pull → the verb stays a today form, which the lever completes by the subject only where the locale needs it (de *wir gehen*, fr *nous allons*): the en L2 today-rounds use *I / we / they* subjects so no -s choice is hidden in the lever.
- Change your mind: tap the window → the word returns to its base form and all doors close (undo).
- **Check** → the machine runs: the diary strip prints the sentence and the calendar tries to flip.
- **L3**: the sentence sits in the window; tap a word → it lifts (wrong word: it lifts and sinks back after Check only — see §7); then tap the door to run it backwards (press removes the ending, dial turns back, drawer offers three base verbs of similar length).
- **Free play**: after a cure, the crank on the side runs the finished word backwards and forwards as often as the child likes.

## 6. The rounds
Order-only reshuffle per pass. Doors never move; balance is by which door is right.

**Level 1 — Today → yesterday** (en, 13): door 1 **jump → jumped, play → played, climb → climbed, help → helped** · door 2 **swim → swam, ride → rode, come → came, sit → sat, give → gave** · door 3 (drawer: three real forms) **go → went** (went · gone · goes) · **see → saw** (saw · seen · sees) · **eat → ate** (ate · eaten · eats) · **do → did** (did · done · does). 4 / 5 / 4. The dial for door-2 verbs changes exactly one vowel letter (en: *ride→rode*, *come→came*); verbs whose past needs more (*take → took*, *sleep → slept*) are not used.

**Level 2 — In the sentence** (en, 16; base verb shown in the tag)
| # | sentence | (verb) | right | path |
|---|---|---|---|---|
| 1 | Yesterday we ___ to the zoo. | go | went | drawer |
| 2 | Every day we ___ to school. | go | go | TODAY |
| 3 | Yesterday I ___ a big fish. | see | saw | drawer |
| 4 | On Fridays we ___ a song. | sing | sing | TODAY |
| 5 | Yesterday Ben ___ a tall tower. | make | made | drawer (made · makes · making) |
| 6 | Last week the dog ___ in the lake. | swim | swam | dial |
| 7 | Yesterday I ___ sick. | be | was | drawer (was · were · been) |
| 8 | Yesterday the twins ___ sick. | be | were | drawer (was · were · been) |
| 9 | Last summer we ___ a little boat. | have | had | drawer (had · has · having) |
| 10 | Every morning I ___ my teeth. | brush | brush | TODAY |
| 11 | Yesterday Mia ___ her homework. | do | did | drawer (did · done · does) |
| 12 | Yesterday we ___ in the park. | play | played | press |
| 13 | Yesterday the cat ___ on my bed. | sit | sat | dial |
| 14 | Every day they ___ home. | walk | walk | TODAY |
| 15 | Yesterday I ___ Dad in the garden. | help | helped | press |
| 16 | Yesterday I ___ my bike to school. | ride | rode | dial |
TODAY 4 · press 2 · dial 3 · drawer 7 (be, have, do, go, see, make — the G2-336 content; measured with `work-c27/measure.js`: "always the drawer" reaches the right door in 7 of 16 = 44 % and must still pick one of three tiles). Time words vary (*Yesterday, Last week, Last summer* vs *Every day, On Fridays, Every morning*) so "yesterday" is not the only past cue. (*Right now we sing a song* was replaced: with *right now* English uses *are singing*, so the TODAY form *sing* was not natural English.)

**Level 3 — Find the verb** (en, 9): the verb is the tapped word; then back through its door.
| # | sentence | verb (word index) | back to | path |
|---|---|---|---|---|
| 1 | The cat sat on the mat. | sat (2) | sit | dial |
| 2 | Yesterday Leo ran to the shop. | ran (2) | run | dial |
| 3 | We went home after school. | went (1) | go | drawer (go · get · do) |
| 4 | Mia and Tom played in the snow. | played (3) | play | press |
| 5 | Last night I wrote a letter. | wrote (3) | write | dial |
| 6 | The hungry bear ate the honey. | ate (3) | eat | drawer (eat · sit · get) |
| 7 | On Monday the frogs jumped into the pond. | jumped (4) | jump | press |
| 8 | I saw a rainbow. | saw (1) | see | drawer (see · say · sew) |
| 9 | After lunch my little sister drank some milk. | drank (5) | drink | dial |
Verb index 1–5 (no position wins > 3 of 9); reverse drawers hold three base verbs of the same length, so the shortest tile is never the key.

## 7. Check, the misses, the success
- **Check with no door used / no lever** → bubble **"Choose a door (or the today lever) first."** · L3 nothing tapped → **"Tap the word that tells what someone did."** No miss.
- **Miss 1** → the diary strip prints the child's sentence (*Yesterday we goed to the zoo.*), the calendar lifts, flutters, falls back; the word slides back to its base form and the RIGHT door's rim glows softly (not opened). Bubble **"Nobody says “{wrong}”. This verb takes a different door."** (TODAY-round sent through a door: **"Read the time word: is this today?"**; was/were: **"{subject} — one or more than one?"**; L3 wrong word: **"That word does not tell what happened. Find the doing word."** — the old text said "That word names something", which is false for a tapped *Yesterday*, *On* or *into*.)
- **Miss 2** → the right door opens a crack and its tool shows a hint: the dial ring jumps to the right vowel slot and dims wrong vowels to two choices; the drawer shows only two tiles; the press puffs steam. Bubble **"Try this door. Read each word in the sentence."**
- A new move removes the glow until the next Check.
- **Success** → gears spin, the calendar flips to YESTERDAY (or stays proudly on TODAY with a little bounce for today-rounds), the diary strip prints the sentence with the verb in the door's colour. Bubble L1 **"Today {base}, yesterday {past}!"** · L2 **"“{sentence}”"** · L3 **"{past} comes from {base}."**

## 8. Settings
1. **Level**: Today → yesterday (L1, default) · In the sentence (L2) · Find the verb (L3). The lever appears only in L2; the window shows a word vs a sentence.
2. **Door help**: only after a try (default) · always — each door shows two example pairs on its rim (*jump→jumped* / *sit→sat* / *go→went*) for children meeting the doors for the first time.

## 9. Words (EN source)
- title **Rusty's Yesterday Machine** · tasks as §4 · calendar **TODAY** / **YESTERDAY**
- hints: **Choose a door (or the today lever) first.** · **Tap the word that tells what someone did.** · **Nobody says “{wrong}”. This verb takes a different door.** · **Read the time word: is this today?** · **{subject} — one or more than one?** · **That word does not tell what happened. Find the doing word.** · **Try this door. Read each word in the sentence.**
- celebrations: **Today {base}, yesterday {past}!** · **“{sentence}”** · **{past} comes from {base}.**
- settings **Level** — **Today → yesterday** · **In the sentence** · **Find the verb** · **Door help** — **Only after a try** · **Always**
- aria: doors **The -ed press**, **The vowel dial**, **The drawer of new words**, **The today lever**; the strip **The diary says: {sentence}**.
- Locale traps:
  - **de**: grade 2 practises the Präteritum in writing (ging, lief) while speech uses the Perfekt — keep Präteritum (as the old deck and the de verb bank); the dial moves vowel TEAMS (*laufen → lief*: au → ie; *schlafen → schlief*: a → ie; *fliegen → flog*: ie → o); weak press **-te**; present forms in the window are 1st person (*ich gehe*) as in the old rounds. ⚠ *ich laufe → ich lief* changes the vowel team AND drops the present ending *-e* (strong Präteritum has no ending in the ich/er form): the de dial works on the STEM (*lauf-*) and the machine drops the present ending by itself (like the press handles spelling) — only the vowel choice is judged. Same in **sv** (*springer → sprang*: the dial turns *i → a*, the present ending *-er* falls away by itself).
  - **nl**: weak verbs take **-de** or **-te** by the "'t kofschip" rule — the press has two stamps and choosing the stamp is part of the task (*speelde* vs *werkte*); strong verbs on the dial (*liep, dronk, zwom*).
  - **fr**: the activity's past is the passé composé participle (the old deck: *j'ai fait*) — the window shows *J'ai ___ un gâteau.*; press **-é** (*mangé*), drawer for irregular participles holding REAL forms only (*fait · fais · faire*); the over-regularised *faisé* is what the PRESS prints when *faire* is pushed through it (per-locale press spell function: stem of the old deck's foil), never a drawer tile; agreement with *être* verbs avoided (no *aller* rounds).
  - **es (MX) / pt (BR)**: pretérito: press **-é/-í** (es), **-ei/-i** (pt); irregulars from the drawer; no *vosotros*, no *tu* in pt.
  - **it**: participle after *ho* (*ho preso*); press **-ato/-uto/-ito**.
  - **sv / da / no**: the press has the weak endings (sv *-ade/-de/-te*: *målade, byggde, lekte* — choosing among them is the old sv content), strong verbs on the dial (*springa → sprang*), drawer for *gå → gick*, *vara → var*, *ha → hade*.
  - **fi**: imperfekti adds **-i** with stem changes (*juoksen → juoksin*, *luen → luin*, *syön → söin*) — the press adds *-i* and the dial door handles the vowel change of *syödä/juoda* (*söin, join*); verbs from the fi bank.
  - Time words per locale come from the verb bank's frames (*gestern / hier / ayer / ontem / ieri / gisteren / igår / i går / eilen*).

## 10. Sound off, access, phones
- Sound off: doors, dial, calendar flip and the printed strip carry everything; TTS reads the diary strip where available.
- Keyboard: Tab across doors/lever → Enter opens; the dial on ← →; drawer tiles Tab + Enter; Check.
- Taps: doors 104 / 84 px; dial arrows 44 px; drawer tiles 120 × 52; lever 64 × 104.
- Phones: 360 — calendar + window on top (window wraps the sentence to 2 lines), doors in one row of three (84 px) with the lever before them (L2: lever 52 wide, doors 80), diary strip under the machine, bubble below, Check above the fold (machine 100–360, strip 370–410, bubble 420–500, Check 520). 320 — doors 76 px, words 22 px.

## 11. Distinct from
- **Row 125 Photo, Window, Envelope** (a verb FORM develops into a frame and the time word sends it to an album/window/post slot): that sorts given forms by tense; here the child MAKES the past form and the machine shows the three ways a verb gets to yesterday.
- **Row 123 Verb Gates** (is/are/am agreement): agreement only.
- The old chips (pick went/go/goed) — now *goed* is something the child can actually produce and watch fail.
- No premium tool forms verb tenses.

## 12. Build plan
- **Core** `yesterday-machine-core.js`: per-locale `doors[loc] = { press:{endings:[…], spell(base, ending)}, dial:{vowels:[…], teams:[…]}|null, drawer:true }`; round `{ id, level, base, past?, frame?, subject?, timeKind:'past'|'today', drawer?[], reverseDrawer?[], verbIndex? }` with the right form taken from the verb bank (`forms[unit].past`). `run(state)` returns the produced form; `isRight = produced === expected` where expected = bank past (or the bank's today form for `timeKind:'today'`), and for L3 `tapped === verbIndex && produced === base`. `doorOf(base, past)` is DERIVED: press if `spell(base, ending) === past` for some ending, dial if one vowel slot differs, else drawer.
- **Gate** `verify-yesterday-machine-core.js`: every round ×11 — exactly one path produces the expected form (press output ≠ past for irregular verbs; dial cannot reach the past for drawer verbs; drawer tiles are real forms from the bank and only one fits the sentence); derived door distribution per level: no door > 45 % (L2 drawer is allowed 45 % because be/have/do/go is a covered sheet); TODAY rounds ≥ 20 % of L2; L3 verb index spread (no index > 35 %); reverse drawer tiles equal length ±1; no en today-round with a he/she subject; picture-free.
- **Mutations**: door stored per round instead of derived · press accepts irregular verbs as right · dial allowed to change two letters · drawer offers two right forms (was/were with a plural subject both accepted) · drawer of a press/dial verb holds its past form (two doors reach the answer) · drawer holds an invented form (*faisé*) · TODAY rounds removed · grade before Check · help persists after a new move · L3 accepts the right base with the wrong tapped word.
- **Risks**: the dial generates nonsense words while turning (*swom*) — they are visible for a moment only and never printed on the strip as "right"; the dial skips forms that are offensive or unfortunate in any locale (list checked by the native reviewer).
- Pictures: none. BLOCKED: nothing.

## 13. The four questions
1. **Choose it again?** Yes — three different machines in one, a dial to spin and a calendar that refuses to flip on *goed*.
2. **Teacher on the board?** Yes — "most verbs add -ed, some change a vowel, some become new words" is the exact lesson, now a machine the class can operate.
3. **Parent trust?** No scores, no drawn robot, honest real forms only in the drawer.
4. **The invention:** the Three Doors — a verb reaches yesterday through the -ed press, the vowel dial or the drawer of new words, and the calendar only flips when it went through the right one.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- The drawer's contents for press and dial verbs were unspecified; a "three real forms" drawer for *jump* would hold *jumped* — two doors reaching the answer. The drawer now never holds a past another door makes (press verb: *jumps · jumping · jump*; dial verb: *swims · swimming · swum*); a mutation guards it.
- *Right now we sing a song* is not natural English (→ *On Fridays we sing a song*); the L3 wrong-word hint "That word names something" was false for *Yesterday/On/into* → "That word does not tell what happened. Find the doing word."
- fr drawer listed the invented *faisé* while §0 promised real forms only — *faisé* now comes out of the press; drawer *fait · fais · faire*.
- de/sv strong verbs: *ich laufe → lief*, *springer → sprang* drop the present ending as well as changing the vowel — the dial now works on the stem and the ending falls away by itself (otherwise the one-vowel dial could never reach the past).
- Door distributions measured (`work-c27/measure.js`): L1 4/5/4, L2 TODAY 4 · press 2 · dial 3 · drawer 7, L3 verb index max 3 of 9.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
