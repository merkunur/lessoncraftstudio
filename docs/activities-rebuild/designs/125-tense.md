# Row 125 — Photo, Window, Envelope (L.1.1.e)

## 0. Identity
- id `tense.past-present-future.l-1-1-e` (KEPT) · grade 1 · Common Core L.1.1.e (use verbs to convey a sense of past, present, and future) · strand Language · page title (frozen) "The Clock Tower — Verb Tense: Past, Present & Future (Grade 1)" · own files `mini tools/time-frames-core.js`, `time-frames-activity.js`, `time-frames-activity.html`; the manifest row stays in `tense-activities.json` (id, slugs en/de/fr/es/pt/it/sv/nl, title, intro frozen), `tool` repointed; `tense-core.js` untouched. New da/no/fi metadata at build.
- worksheets it covers (the TIME half; number agreement is row 123's): **G2-317** Verb Forms: Today and Yesterday · **G2-334** Match the Verb to Its Past Form · **G2-335** Verb Forms in Sentences with Pictures · **G2-336** The Irregular Verbs: be, have, do, go (their past forms was/were, had, did, went) · **G2-337** Choose the Right Verb Form (by time) · **G2-338** Find the Verb, Write Its Base Form.
- what the old activity did: Juniper the robin's clock tower with three windows (Before / Now / Soon); a sentence with a time word and a gap; three verb chips (sail / sailed / will sail), tap one. **Kept:** the three-way time split and the clock-tower world's three windows (they become the photo, the window and the envelope — the tower's front holds all three); every round of every locale as the seed (en *Yesterday the boats… / Right now the kids… / Tomorrow…*; de *Gestern/Jetzt/Morgen* with Präteritum and *werden*; fr *Hier/Maintenant/Demain*; es *Ayer/Hoy/Mañana*; pt *Ontem/Agora/Amanhã* with *vão + inf.*; it *Ieri/Adesso/Domani* with passato prossimo; sv *i går/just nu/i morgon* with *ska*; nl *Gisteren/Nu/Morgen* with *zullen*); the regular/irregular flag on each verb. **Gone:** the chip quiz; the text-only stage; subjects with no picture (*the sailors* → a library subject).

## 1. The pitch
"Every verb form develops into its own kind of frame — the past into a photo, the present into a live window, the future into a sealed envelope — and the time word sends the sentence to the album, the windowsill or the post slot, which only take their own kind."

## 2. Why a child will want it again (the fun)
- **A darkroom toy.** The verb cards are blank-backed paper cards. Drop one into the sentence and, on Check, it *develops*: a past form (*sailed*) grows a white photo border and the subject's library picture inside it fades to warm sepia and stops still; a present form (*sail*) grows a blue window frame and the picture inside keeps moving — the sailboat rocks; a future form (*will sail*) folds into an envelope with a round wax seal, and the picture is only a soft shadow through the paper.
- **The tower front.** Below the sentence, the clock tower's front has three openings: an **album sleeve** (a photo-corner pocket) on the left, an **open window** with a sill in the middle, a **post slot** on the right. The time word in the sentence (*Yesterday*) glows the colour of its opening when read.
- **Filing.** The developed card slides to the opening the time word names. A photo slips into the album sleeve with a satisfying *shff*; a window pane clicks into the windowsill; an envelope drops through the post slot with a *plop* and the slot's flap swings. A wrong kind bumps against the opening — a window pane is too wide for the album sleeve, an envelope will not stand on a sill.
- **The album grows.** Each solved round leaves its card in its opening: a pass ends with photos in the album, windows on the sill, letters in the post — and the clock strikes (a soft chime for each card, left to right).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** the verb's form tells when something happens — past (*sailed, went*), present (*sail*), future (*will sail*); the time word and the verb agree; irregular pasts are their own words (*go → went, run → ran, is → was, are → were, have → had, do → did*); find the verb in a sentence and name its base form.
- **Misconception 1 — the time word does all the work, the verb stays the same** (*Yesterday the boats sail*). The present card develops into a live window, and the window cannot go into the album: yesterday is a photo — it already happened, it does not move any more.
- **Misconception 2 — "will" with a past form or a past form for tomorrow** (*Tomorrow the dogs ran*): a photo does not go through the post slot — tomorrow has not happened yet; you cannot have a photo of it.
- **Misconception 3 — irregular pasts** (*goed*). Irregular pasts are presented as cards to find and match (levels 2 and 4); invented forms like *goed* are never shown. The photo of *go* is *went*: in level 4 the child carries each photo to its window, and the base form and its past form show the same subject, one moving and one still.
- **Misconception 4 — "the verb is the first word" or "the verb is a thing"** (G2-338): in level 5 only the verb develops — tap any other word and it stays plain paper.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 480 × 460):
- **The sentence card** (top, y 0–150): a paper card 464 × 150. Left: the round's **subject picture, 112 px** (library; plurals show 2 identical instances overlapped by 40%, 112 px each). Right: the sentence (Nunito 28 px, two lines max): the **time word** in bold ink (never coloured — colour would be a tell); its opening glows only when the child taps the word (a reading aid). The gap is a dotted box 120 × 44.
- **The card tray** (y 168–232): three verb cards 128 × 56 (Baloo 2, 26 px), cream paper, no frames, shuffled.
- **The tower front** (y 250–460): a drawn stone front 464 × 210 with three openings 132 × 150, gap 34: the **album sleeve** (a dark-cream page with four drawn photo corners; it accepts a card 112 × 96 with a white border), the **window** (a blue-framed opening with a sill; accepts a 132 × 100 pane), the **post slot** (a brass slot 112 × 14 in a red door with a flap; accepts an envelope 100 × 64). No words on the openings; above them a drawn clock face (geometry, 72 px) whose hands never tell a time — it only chimes.
- **Task line** above (≤ 24 px). **Bubble** right.

**At 360 px** (stacked; stage 360 × 560): sentence card 344 × 150 (picture **80 px**, sentence 24 px); card tray 3 × 108 × 52; tower front 344 × 190, openings 100 × 130; Check below. Check bottom ≤ 700 at 360 × 740, ≤ 620 at 320 × 640 (at 320 the tower clock hides; picture 72 px).

No words on the apparatus except the content (the sentence, the verb cards).

## 5. The hand
- **Drop a card in the gap** (drag, or tap a card → it slides in, 200 ms). The sentence reflows around it; the card stays plain until Check. Swap by dropping another card; tap the gap to send the card back.
- **Tap the time word:** its opening glows softly for 1 s (TTS reads it where available) — a reading aid, never automatic.
- **Develop (free play, any time a card is in the gap):** tap the card in the gap — it develops for 1.5 s (photo / window / envelope, with the picture still, alive or shadowed) and then returns to plain paper. Exploration only: no miss, no hint. Children can try each card in turn and watch the three frames.
- **Check:** the card develops (420 ms: border grows, picture sepia-fades or keeps moving or blurs behind paper), then the whole card slides down to the opening the time word names (480 ms) and either files in (sound per kind) or bumps (§7).
- **Level 4 (match):** photos (past forms) and panes (base forms) are dealt as cards; drag a photo onto a pane: if it is that verb's past, the photo snaps to the pane's corner and the pane's moving picture freezes into the photo's still one (they show the same activity picture); if not, the photo slides off.
- **Level 5 (find the verb):** tap a word in the sentence card; the verb peels up and develops into a window pane under the card showing its base form; any other word wiggles and stays. In "Write it" mode the pane is empty and a letter keyboard types the base form.

## 6. The rounds
One round = one sentence with a time word and a gap. Check develops and files.

**The one-right-answer rule for tense (critic, binding in every locale).** Two traps made the draft's trays carry two right cards:
1. **The present tense also talks about tomorrow** — *Tomorrow the dogs play in the park* is correct English for a plan, and *Morgen spielen die Hunde*, *Demain les chiens jouent*, *Mañana los perros juegan*, *Domani i cani giocano*, *Amanhã os cachorros brincam*, *Morgen spelen de honden*, *I morgon leker hundarna* are the NORMAL way to say it in ten of the eleven languages. So a **future round deals two cards: past · future** — the present card is withheld, never offered as wrong. Past and present rounds deal three cards, except that three of them per level deal two (see Answer position), so the card count never tells.
2. **English simple present does not mean "right now".** *Right now the girls jump rope* is not English; the present card in en is the progressive (*are jumping*), the live window it develops into is exactly that, and *Right now* never pairs with a bare present. Other locales keep their simple present (they have no progressive split) — but each locale's present time word must mean "in progress at this moment" so that its future card is plainly wrong: de **gerade** (not *jetzt*: *Jetzt werden wir malen* = "now we are going to paint" is natural), fr **en ce moment**, es **ahora mismo**, pt **neste momento**, it **in questo momento**, nl **op dit moment**, sv **just nu**, da **lige nu**, no **akkurat nå**. The native panel tests every present round with the future card and refuses any that reads naturally.

**Level 1 — Yesterday, right now, tomorrow (regular verbs), 9 rounds.**

| # | sentence | subject (library) | cards | right |
|---|---|---|---|---|
| 1 | Yesterday the boats ___ on the lake. | vehicles/sailboat ×2 | sailed · are sailing · will sail | sailed |
| 2 | Right now the girls ___ rope. | activities/jumping (one girl with a rope) ×2 | jumped · are jumping · will jump | are jumping |
| 3 | Tomorrow the girls ___ the fence. | toys/girl ×2 | painted · will paint | will paint |
| 4 | Right now the gulls ___ at the sea. | beach/seagull ×2 | looked · are looking · will look | are looking |
| 5 | Yesterday the girls ___ to us. | toys/girl ×2 | waved · are waving · will wave | waved |
| 6 | Tomorrow the cats ___ in the box. | pets/cat ×2 | napped · will nap | will nap |
| 7 | Yesterday the frogs ___ in the pond. | camping/frog ×2 | jumped · are jumping · will jump | jumped |
| 8 | Right now the ducks ___ in the rain. | farm-animals/duck ×2 | walked · are walking · will walk | are walking |
| 9 | Tomorrow the dogs ___ in the park. | pets/dog ×2 | played · will play | will play |

Right: past 3, present 3, future 3 (future rounds have two cards — rule above). Row 5's subject was *the kids* drawn as two girls; it now says *the girls*. Row 6 no longer repeats row 9's verb.

**Level 2 — Irregular verbs (be, have, do, go and friends — G2-336), 9 rounds.** Yesterday the gulls ___ to the beach. (went · are going · will go → went) · Tomorrow the dogs ___ fast. (ran · will run → will run) · Yesterday the girls ___ their bikes. (rode · are riding · will ride → rode) · Yesterday the dog ___ wet. (was · is · will be → was) · Right now the ducks ___ hungry. (were · are · will be → are — *be* is stative, so its present is the simple *are*) · Tomorrow the frogs ___ a big jump. (did · will do → will do) · Tomorrow the girls ___ a picnic. (had · will have → will have; the draft's *we* had no picture) · Yesterday the birds ___ a song. (sang · are singing · will sing → sang) · Right now the boats ___ home. (went · are going · will go → are going). Right: past 4, present 2, future 3 in pass 1; pass 2 swaps *Yesterday the birds sang* for *Right now the dogs ___ in the park* (ran · are running · will run → are running) → 3/3/3.

**Level 3 — No time word: read the verb (G2-337), 9 rounds.** The sentence has the verb already in it and the TIME WORD is the gap: cards *Yesterday · Right now · Tomorrow*. "___ the boats sailed on the lake." (Yesterday) · "___ the dogs will run in the park." (Tomorrow) · "___ the girls are jumping rope." (Right now) · "___ the gulls went to the beach." (Yesterday) · "___ the cats will nap in the box." (Tomorrow) · "___ the ducks are walking in the rain." (Right now) · "___ the frogs jumped in the pond." (Yesterday) · "___ the girls will paint the fence." (Tomorrow) · "___ the gulls are looking at the sea." (Right now) — 3/3/3. One right answer holds here in English because a past form cannot take *Tomorrow* or *Right now*, and *will* cannot take *Yesterday*; a bare present is never the verb in a level-3 sentence (it would accept *Tomorrow* too). Other locales: the verb in the sentence is past or future or the locale's in-progress present with its in-progress time word only. The develop step is the same (the verb in the sentence develops; the chosen time word sends it). This is the reverse direction: the verb's form decides the time.

**Level 4 — Match the past (G2-334, G2-317), 3 rounds × 3 pairs.** Each round deals three panes (base forms) and three photos (past forms), shuffled: (go–went, run–ran, see–saw) · (have–had, do–did, is–was) · (sit–sat, swim–swam, eat–ate); pass 2 adds (are–were, jump–jumped, play–played) so regular pairs appear too. Panes and photos carry **no picture at all** in level 4 — a match freezes the pane's drawn ripple into a still photo frame (apparatus geometry), so a picture can never be the tell and no verb is ever shown with an approximate picture (the draft's *swim–swam = beach/water* was a picture of a water bottle). *read–read* is refused (same spelling).

**Level 5 — Find the verb, name its base form (G2-338), 9 rounds.** The sentence is complete; the child taps the verb; the base form develops. The girls rode their bikes. (rode → ride) · The dog ran to the gate. (ran → run) · The ducks swam in the pond. (swam → swim) · The cats will sleep on the mat. (will sleep → sleep; the whole verb *will sleep* peels together) · The boy has a kite. (has → have) · We went home. (went → go) · The frogs jumped high. (jumped → jump) · The girl was happy. (was → be) · The birds sang. (sang → sing). Setting "Write it": the child types the base form into the pane (G2-338's "write").

**Answer position.** Cards are shuffled per render with a balance constraint: three-card rounds put the right card in each slot equally often (±1) across the level, two-card rounds put it first and second equally often (±1); measured over the level, no slot is right more than 4 of 9 times. The gate's bots: *always the longest card* (en: *are jumping* vs *will jump* — the progressive breaks the old "*will* is longest" tell; ≤ 4/9 in L1–L2), *always the card with will* (≤ 3/9). So that the NUMBER of cards is never the tell, in each level three of the six past/present rounds also deal two cards (the right card plus one wrong card chosen at random per render); the bot "two cards → pick *will*" then scores 3/6 on two-card rounds and is capped there, *always the card ending in -ed* (≤ 3/9 in L1; L2 has irregulars so ≤ 2/9), *always the first slot* (3/9), *match by first letter* in level 4 (go–went, have–had: first letters differ in 6 of 9 pairs).
**Order:** order-only reshuffle per pass; never three rounds in a row with the same time.

## 7. Check, the misses, the success
- **Check with the gap empty:** hint, no miss — "Read the time word. When does it happen?"
- **Miss 1:** the card develops and bumps:
  - *window at the album* (present for yesterday): the pane presses against the album sleeve, too wide, the picture inside still moving; the album's photo corners pulse · "Yesterday is over — it is a photo now. Which word is a photo?"
  - *photo at the post slot* (past for tomorrow): the photo lies on top of the slot and will not go in; the envelope outline glows dotted in the slot · "Tomorrow has not happened yet. It needs the envelope."
  - *envelope at the window* (future for right now): the envelope slides off the sill; the window's frame pulses · "It is happening right now. Which word is a live window?"
  - *photo or envelope at the window* likewise; level 3 shows the mismatch from the other side (the time-word card glows at the wrong opening).
- **Miss 2:** the right card in the tray develops faintly on its own (its frame shows at 40% for 2 s) and lifts 6 px · "Try the card that is showing its frame."
- **A new move takes the help away** until the next Check.
- **Success:** the card files in with its sound, the clock chimes once, the opening keeps it · "Yesterday the boats SAILED — it already happened!" · "Right now the girls ARE JUMPING — it is happening!" · "Tomorrow the girls WILL PAINT — it has not happened yet!" (level 5: "RODE comes from RIDE!"; level 4: "WENT is the photo of GO!").

## 8. Settings
1. **Verbs:** Yesterday · now · tomorrow (L1) · Tricky verbs (L2) · Read the verb (L3) · Match the past (L4) · Find the verb (L5) — the level picker; the tray changes at rest.
2. **Answer** (L5 only, otherwise hidden): Show the base form · Write it — the pane at rest is a developed word or an empty pane with a keyboard.

## 9. Words (EN source)
- title (shell): **The Clock Tower** (frozen) · instruction: "Pick the verb for the time word. Past is a photo, now is a window, tomorrow is a letter."
- task lines: L1–L2 "When does it happen? Pick the verb." · L3 "Read the verb. When did it happen?" · L4 "Put each photo on its window." · L5 "Tap the verb. What is its base form?"
- hints and celebrations: §7 exactly.
- settings: "Verbs", "Yesterday · now · tomorrow", "Tricky verbs", "Read the verb", "Match the past", "Find the verb", "Answer", "Show the base form", "Write it"
- aria: "Sentence: {sentence}", "Card {word}", "The card developed into a {photo|window|letter} and went into the {album|window|post slot}" / "…could not go into the {opening}".

**Locale traps (every sentence and form literal per locale; old lists kept, then reviewed):**
- **de** past: the old Präteritum (*segelten, liefen*) is kept for writing, but spoken German narrates with Perfekt — the panel decides per round; never both forms in one tray (*segelten* vs *sind gesegelt* would be two right answers). Future: *werden + Inf.* (old). Natural German says *Morgen malen die Mädchen* (present for future) — which is exactly why future rounds deal only past · future (rule above); the present card is never in a *Morgen* tray. Present time word *gerade* (*Gerade malen die Mädchen*), never *jetzt*.
- **fr** the old past was imparfait (*chantaient*); with *Hier* French narrates in passé composé (*ont chanté*) — the panel picks one per round, futur simple (*chanteront*) or futur proche (*vont chanter*) one per round. Never two acceptable forms on cards together.
- **es** (es-MX) pretérito (*navegaron*), presente, futuro (*navegarán*) — *van a navegar* is the everyday future; one per round.
- **pt-BR** pretérito perfeito, presente, *vão + inf.* (old) — kept.
- **it** passato prossimo (*hanno nuotato*, *sono andati* — auxiliary *essere* agreement with gender: the subject's article decides *andati/andate*), futuro semplice.
- **nl** imperfectum (*voeren, speelden*), *zullen + inf.* (old) — *gaan + inf.* is the everyday choice; one per round.
- **sv** preteritum, presens, *ska + inf.* (old); **da** *sejlede / sejler / skal sejle*; **no** *seilte / seiler / skal seile*.
- **fi has no future tense** (the present is used with *huomenna*) and the 3rd-person PLURAL present and past can look alike (*purjehtivat* / *purjehtivat*): fi uses **singular subjects** (*koira juoksee / juoksi*) and **two cards**: past and present; the present card develops into a window **with a shutter** that fits both the window and the post slot; *Huomenna koira juoksee* files the shuttered window into the post slot. fi present time word *nyt*, past *eilen*. In fi level 3 a present verb fits both *Nyt* and *Huomenna*, so fi level 3 deals two time-word cards, *Eilen · Juuri nyt*: past sentences take *Eilen*, present sentences *Juuri nyt*; *Huomenna* is never a card in fi level 3. Level 1 is two cards. Documented in the fi rounds.
- **Level 4 pairs** per locale are that language's strong/irregular verbs (de *gehen–ging, sehen–sah, haben–hatte*; fr matches present to passé composé, *il va – il est allé, il voit – il a vu, il a – il a eu*; sv *gå–gick, se–såg, ha–hade*; fi *mennä–meni, olla–oli, tehdä–teki*).
- **Base form** (level 5) = the dictionary form: en bare verb, de/nl/sv/da/no infinitive (*fahren, varen, segla*), fr/es/it/pt infinitive (*naviguer*), fi 1st infinitive (*juosta*).
- Sound off: the frames (photo still / window alive / envelope shadow) carry the meaning; TTS reads only the finished sentence.

## 10. Sound off, access, phones
- Silent legibility: a still photo, a moving window, a sealed shadow, and openings that visibly refuse the wrong kind.
- Keyboard: Tab to a card, Enter drops it into the gap; Backspace returns it; Space on the gapped card develops it (free play); in level 4 Tab between photos and panes, Enter pairs; in level 5 Tab through the words, Enter taps one.
- aria-live: "Sailed became a photo and went into the album." / "Sail became a window. A window does not go into the album."
- Taps: cards 128 × 56 (108 × 52 at 360); openings are drop zones 132 × 150.
- Pictures 112 px at 704, 80 px at 360, ≥ 72 at 320.
- Phone: stacked; the clock hides at 320; the bubble is one line until miss 2.

## 11. Distinct from
- **Row 74 Rewind Rail, New 210 Sleeps Calendar** — time as a rail/necklace of days; here tense as three KINDS of frame (still / live / sealed), not positions on a line.
- **Row 127 Event Tunnel (this batch)** — before/during/after an event (prepositions); this is verb form by time.
- **Row 123 Verb Gates (this batch)** — agreement by number; no time.
- **Row 75 Plate Stack** — endings by quantity; here no endings are built — whole forms develop.
- **Tool story-line** — sequencing cards on a line; nothing develops or files.

## 12. Build plan
- **Data:** per locale, levels of rounds `{id, timeWord, time:'past'|'present'|'future', subject:{key, n}, before, after, cards:{past, present, future}, irregular}`; level 4 pairs `{base, past, pictureKey?}`; level 5 `{sentence:[tokens], verbIdx:[i..j], base}`.
- **Core state:** `{level, round, gap:null|cardId, developed:null|kind, filed:[], misses, typed}`; functions `drop(c)`, `back()`, `develop(c)` → `'photo'|'window'|'envelope'` (from the card's tense, fi `'shutter'`), `destination()` (from the time word), `fits(kind, opening)` (photo→album, window→window, envelope→post, shutter→window|post), `check()`.
- **Gate's own ground truth** (`verify-time-frames-core.js`): its own map time-word → opening and tense → kind; asserts every round's right card is the only card whose kind fits the destination; **no future round contains a present card and no level-3 sentence's verb is a bare present** (the tomorrow-present trap); en present cards are progressive (`are …ing` / `is …ing`) except for *be* and *have* (stative); every present time word is on the locale's in-progress list (de *gerade*, fr *en ce moment*…), never *jetzt / now / nu*; fi rounds have two cards and use singular subjects with distinct past/present strings; no tray holds two forms of the same tense (de Präteritum + Perfekt, fr imparfait + passé composé…); 3/3/3 balance and tray-slot balance; bots under caps; no invented form (*goed*) in any locale (each card must appear in its locale's verb list); level-5 base equals its own lemma table; every picture exists.
- **Mutations:** a future round deals the present card · en present card is a bare present with *Right now* · de present time word *jetzt* · level 4 shows a picture · window fits the album · photo fits the post slot · envelope fits the window · develop maps *will sail* to photo · fi shutter not accepted at the post slot · tray holds two past forms · right card always slot 1 · level 4 pairs show their picture before matching · level 5 accepts a noun tap.
- **Pictures** (critic, contact sheets 2026-10-17; every key exists): vehicles/sailboat (red and white sails), activities/jumping (a girl skipping rope — exactly *jumping rope*), toys/girl, beach/seagull, pets/cat, pets/dog, camping/frog, farm-animals/duck (yellow). Level 4 uses no pictures.
- **Risks:** two overlapped plural pictures must stay readable at 360 (80 px, 40% overlap). Level 4's per-pair pictures may not exist for every verb — pairs without a picture show a neutral drawn frame (no picture) on match.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a word that develops into a photo, a live window or a sealed letter, and an album, sill and post slot that fill up and chime.
2. **Would a teacher put it on the board?** Yes — "yesterday is a photo, it can't move any more; tomorrow is a sealed letter" is a picture of tense a class can say back; the reverse level and the base-form level cover the worksheets.
3. **Would a parent trust it?** Yes — the real tenses of their language (and honest about Finnish having no future tense), no invented misspellings, no scores.
4. **The invention:** the past develops into a photo, the present into a live window, the future into a sealed envelope — and the time word sends the sentence to the album, the windowsill or the post slot, which only take their own kind.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 4→5
What changed:
- **Future rounds had two right cards in every locale:** the present tense is the normal way to talk about tomorrow in ten of eleven languages (and correct English for plans). Future rounds now deal **past · future** only; the gate forbids a present card in any future tray.
- **"Right now the girls jump rope" is not English:** en present cards are progressive (*are jumping*), which is exactly the live window; *be* stays simple (*are hungry*).
- **Present time words that exclude a future reading:** de *gerade* (not *jetzt*), fr *en ce moment*, es *ahora mismo*, pt *neste momento*, it *in questo momento*, nl *op dit moment*, Nordic *just nu / lige nu / akkurat nå*; fi level 3 never offers *Huomenna* with a present verb.
- L1 row 2 now uses activities/jumping (a girl skipping rope); *the kids* drawn as girls → *the girls*; *we* (no picture) → *the girls*; a repeated verb replaced; level 2 balance recounted (4/2/3 → 3/3/3 in pass 2); level 3 written out in full.
- **Level 4 has no pictures at all** (the draft's *swim–swam = beach/water* was a water bottle).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
