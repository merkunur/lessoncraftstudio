# sv copy — `sharing-jar.make-fair.1-oa-d-8`

Everything below is measured against the repo, not recalled. Measurement commands and
counts are cited inline.

---

## 0. WHAT I MEASURED FIRST

| thing | measured value |
|---|---|
| `slug.sv` values shipped across `mini tools/*-activities.json` | **75** |
| sv `page_title` length | min 9 · p25 39 · **median 49** · p75 60 · max 90 |
| sv `page_intro` length | min 107 · median 163 · max 460 · **41 of 75 sit outside 120–170** |
| sv `prose` entries in `activity-content/sv.json` | 75 (none for `sharing-jar`) |
| `practices` array length | 4 in 68 of 75 entries; 5 in 7 |
| `practices` terminal period | **299 of 307 have NO period** (97.4%) |
| `practices` opening word | **264 of 307 start with an infinitive** (86%) |
| `howToPlay` | always exactly 3; **225 of 225 END WITH A PERIOD** |
| `learningGoals` | always exactly 3; **213 of 225 have NO period** |
| `about` | 3 in 52 of 75; always full sentences with periods |

⚠ **Your brief said titles "run roughly 60–84 characters".** That is the top quartile
only. The measured median is **49** and p25 is **39**. I have written to ~62, which sits
just above p75 — deliberate, because the differentiation fence forces a longer title —
but the corpus does not require 60+.

Your brief was **right** about `practices`: infinitive phrases, no terminal period.
I measured it rather than take your word, and it holds at 86% / 97%.

---

## 1. `slug.sv`

```
gor-det-rattvist-lika-manga-i-burkarna-ak-1
```

43 chars. Matches `^[a-z0-9-]+$`.

Folding, one letter for one letter, as the 75 shipped slugs do it
(`jamfor`, `langder`, `rakna`, `gor`, `storre`, `hogre`, `las`, `stall`):

- gör → **gor**
- rättvist → **rattvist**
- många → **manga**
- åk → **ak**

No `ae`/`oe` expansion anywhere. Verb-led (`gor-talet`, `gor-lika-grupper-ak-2`,
`stall-klockan-…`, `sortera-och-rakna`) and grade-suffixed (`-ak-1`), both of which are
the dominant shipped conventions.

**No range token.** The shipped range convention is `inom 10` / `inom 20` / `upp till 20`
/ `inom 100`. This activity's largest given is **12** (`gap-of-twelve`, a=12). `inom 10`
would be false, `inom 20` overstates, and `inom 12` is not a bound Swedish maths writing
uses. Honest-fit gating says the qualifier only appears where the content supports it, so
the slug carries the grade instead — which is what most of the 75 do anyway.

---

## 2. `page_title.sv`

```
Gör det rättvist – lika många i båda burkarna | Åk 1 matematik
```

**62 characters** — just above the corpus p75 (60), well under max (90). En dash + pipe
separator, both used throughout the shipped set.

---

## 3. `page_intro.sv`

```
Två pärlburkar, olika många i varje. Barnet räknar ut talet som gör det rättvist: hur många fler, hur många försvann, hur många det var från början. Åk 1, Lgr22.
```

**161 characters** — inside the required 120–170 band (measured, not estimated).

- Cites **Lgr22** by name. ✔
- Names **no** framework belonging to another country. ✔
- Contains **no** "Common Core" and **no** CCSS code — unlike the English source, which
  ends `"…aligned to Common Core 1.OA.D.8."` and would be a `verify-activity-serp-copy.js`
  violation if inherited. ✔
- Contains **no** free/price claim — no *gratis*, *kostnadsfri*, *fritt tillgänglig*, and
  no predication that the product costs nothing. I checked my wording against the live
  ban list in `scripts/verify-activity-prose-claims.js` (lines 62–73), including the
  `fritt\s+tillgänglig` pattern. ✔
- Carries **no character name**, so a Pim/Bo rename does not touch it. ✔

Three indirect questions instead of one, because the activity has **five** question
shapes and describing only one is exactly the English defect (§6 below). Grammar note:
`hur många försvann` takes no inversion because *hur många* is the subject;
`hur många det var från början` is a correct subordinate clause with subject before verb.

---

## 4. The prose block — `frontend/messages/activity-content/sv.json` → `prose`

```json
"sharing-jar.make-fair.1-oa-d-8": {
  "about": [
    "Två vänner, Pim och Bo, öser upp glittrande pärlor i var sin burk, men den ena burken blir fullare än den andra — och då är det inte rättvist längre. Barnet räknar ut vilket tal som gör det rättvist och trycker på det talet bland brickorna 0–10. Det är en interaktiv matteaktivitet för årskurs 1 som körs direkt i webbläsaren, utan installation och utan konto.",
    "Den stora idén är att talet barnet letar efter inte betyder samma sak varje gång. I en runda är det hur många fler den tomma burken behöver för att komma ikapp; i nästa hur stor skillnaden är mellan de två burkarna; sedan hur många pärlor som rullade bort när burken välte, hur många som ska läggas tillbaka, och till sist hur många det fanns från början. Fem frågeformer över samma två burkar — så barnet måste läsa situationen varje gång i stället för att alltid dra det mindre talet från det större. En runda är redan rättvis, och då är svaret noll.",
    "Nio rundor med tal upp till 12, ordnade så att de enklaste kommer först och blandade om till en ny ordning varje gång. Aktiviteten följer Lgr22 — sambandet mellan addition och subtraktion, och hur tal kan delas upp. Ingen timer, inga poäng och ingen som vinner: ett tal som inte stämmer möts av en lugn fråga och en ny titt på burkarna."
  ],
  "practices": [
    "Räkna ut hur många fler som behövs för att det ska bli lika många i båda burkarna",
    "Se hur stor skillnaden är mellan de två burkarna",
    "Hitta hur många som försvann, eller hur många som ska läggas tillbaka",
    "Komma fram till hur många det fanns från början, när något redan har getts bort"
  ],
  "howToPlay": [
    "Titta på de två burkarna och läs frågan högst upp — den ändrar sig från runda till runda.",
    "Räkna ut talet och tryck på det bland brickorna 0–10 — stämmer det får du se vad som händer i burkarna.",
    "Tryck sedan på Kontrollera för att gå vidare. Ingen timer och inga poäng, så ta den tid du behöver."
  ],
  "learningGoals": [
    "Barnet kan räkna ut talet som gör två antal lika, med tal upp till 12",
    "Barnet läser vad frågan gäller innan det räknar, och märker att samma två burkar kan ställa fem olika frågor",
    "Barnet ser att addition och subtraktion hänger ihop: det man lägger till kan man också ta bort igen"
  ]
}
```

Every factual claim traced to the artefact:

| claim | source |
|---|---|
| 9 rounds | manifest `params.rounds` = 9 |
| numbers up to 12 | largest given a=12 (`gap-of-twelve`); answers 0–7 |
| tiles 0–10 | `_tileRow`: `for (var i = 0; i <= 10; i++)` |
| easiest first, reshuffled each pass | `bandOrder()` groups by band (3×band1, 4×band2, 2×band3) and shuffles **within** band; `nextTask` reshuffles on each forward pass |
| one round already fair, answer 0 | `already-fair` a=4 b=4 → `unknownFor('equalize-add')` = 0 |
| five question shapes | `unknownFor` switch: equalize-add / compare-diff / restore / reduce-to-target / start-unknown |
| calm non-directional re-pose | `commit()` returns `'mismatch'`, `msg = t('lookAgain')`, no seal, no penalty |
| "Kontrollera" | `lcs-shell.js:37` `check: {… sv:'Kontrollera' …}`; the button is **enabled** for `answerType:'state'` (`lcs-shell.js:777` disables it only for `'number'`/`'choice'`) |

`howToPlay[2]` deliberately says the Check button is for **going on**, not for checking —
because `_produce()` commits on the tile tap and `Kontrollera` only advances. Saying
"work it out, then tap Check" (the sibling `numberbond` phrasing) would be false here.

`about[1]` does **not** repeat the English "so each has {T}" claim — see §6, defect 2.

---

## 5. DIFFERENTIATION STATEMENT

**The real collision** is `match-pairs.find-the-missing-number.1-oa-d-8` — same CCSS code,
already live in Swedish:

- slug `hitta-det-saknade-talet` · title **"Hitta det saknade talet"**
- its intro closes: *"…hitta det okända talet i en addition eller subtraktion, var som helst."*

**Head terms I am ceding to it and use nowhere in slug, title or intro:**
`saknade talet` · `det saknade talet` · `okända talet` · `hitta det saknade` — and
`var som helst` (its distinguishing promise: the blank moves anywhere in the equation).

**Ceded to the other four neighbours:**

| neighbour | its owned head term, avoided here |
|---|---|
| `numberbond.subtraction-unknown-addend.1-oa-b-4` | `delen som saknas` · `talkompis` / `talkompisar` |
| `numberbond.find-the-total.1-oa-a-1` | `hitta det hela` · `helheten` |
| `numbers-court.judge-balance.1-oa-d-7` | `likhetstecknet` · `sant eller falskt` · `balansvåg` |
| `match-pairs.addition-and-subtraction-pairs.1-oa-d-7` | `plus- och minus-par` |
| `numberbond.add-three.1-oa-a-2` | `addera tre tal` |

**What this page owns instead: `rättvist`.** Measured across all 75 shipped sv
slugs + titles + intros, **`rättvis*` is FREE — zero occurrences** (it appears twice
inside prose bodies only, incidentally, never as a head term). So are **`burk`** and
**`pärl`** — zero occurrences in any sv SERP surface. The page's face is the *fairness*
situation and the concrete two-jar apparatus, which is what actually distinguishes it
from four abstract equation pages, and `"Det är inte rättvist!"` is the phrase a Swedish
seven-year-old already owns.

**Two soft overlaps, disclosed rather than hidden:**

- `lika många` appears in the SERP copy of two pages — `choice-board.fraction-noncongruent.2-g-a-3`
  and `mosaic-menders.area-match.3-md-c-6`. Both are geometry/area, åk 2–3. No shared
  search intent. **`lika delar` / `lika stora delar` / `lika grupper` are heavily owned by
  the fractions and repeated-addition families and I avoid them entirely.**
- `hur många fler` appears once, in `graph-it.bar-graph.2-md-d-10` (bar graphs, åk 2). I
  keep it **out of the title and out of the slug**; it survives only as one of three list
  items inside the intro. Different grade, different apparatus, different query.

---

## 6. AUDIT OF THE ENGLISH SOURCE

Six findings. All seven shipped locales inherited 1–4.

**1. ⭐⭐ The `page_intro` describes one of the five question shapes and gets the
interaction wrong.**
> *"work out how many more beads the quiet friend needs and say that number, then watch
> the beads float over and two friends lean their heads together."*

- "how many more … needs" is `equalize-add` only — **3 of 9 rounds**. It is false for
  `compare-diff`, `restore`, `reduce-to-target` and `start-unknown`.
- "**say** that number" — there is no speech input. The only input is a tile tap
  (`_tileRow` → `_produce`). The same file's `hint` string correctly says *"tap that
  number"*, so the English contradicts itself across two strings.
- "watch the beads **float over**" — `giveDirection()` returns `'into-jar'` for only two
  of five schemas. For `compare-diff` and `start-unknown` it returns `'reveal'` (nothing
  flies), and for `reduce-to-target` `'to-floor'` (beads leave). On the `already-fair`
  round the answer is 0 and `revealZero` explicitly says *"Give none."*
- "**two friends lean their heads together**" — not rendered. `friendSVG` changes the
  mouth path to `mood === 'happy'`. There is no leaning.

**2. ⭐⭐ `qReduce` makes an arithmetic claim the model does not support.**
> *"Pim scooped too many! How many to put back so each has {T}?"*

For `reduce-to-target` the scene renders **one jar only** — `_scene()` appends a single
`_jar('pim', …)` and no Bo. `nums` carries `a` and `T` and no second quantity. So "each"
names a second person who is not on screen and whose count is not modelled: after Pim
puts 2 back from 6, nothing in the model gives Bo 4. `revealReduce` repeats it — *"Now
each can have {n}"*. The honest statement is the one the badge already makes
(`fairIs` = "fair = 4"): *put back until **this jar** has T*. My Swedish prose uses that
framing and does not inherit the "each" claim.

**3. ⭐⭐ `hintZero` is a dead string in all seven locales.**
Authored at line 90 with seven translations, referenced nowhere: `makeTasks` hard-codes
`hintKey: function () { return 'hint'; }` and `_tileRow` calls `api.t('hint')`. Grep for
`hintZero` returns exactly one hit — the declaration. So the `already-fair` round, the one
round where a child most needs *"Look closely — maybe it is already fair!"*, shows the
generic *"Work it out, then tap that number"* instead. This is the §23.6 dead-string class
verbatim; a source scan finds the key, and only a reachability check finds that nothing
asks for it.

**4. ⭐ `instruction` and `hint` disagree about what the child does.**
`instruction`: *"Make it fair — say the kind number."* `hint`: *"Work it out, then tap
that number."* The child taps. "The kind number" is also not English a six-year-old
parses; six of the seven locales quietly rewrote it to "the right/correct number"
(de *richtige*, fr *bon*, es *correcto*, nl *juiste*) while pt and it kept the calque
(*gentil* / *gentile*). The English is the odd one out and nobody reviewed it.

**5. ⭐ The `restore` round renders its own answer as countable ghost beads.**
`_jar('pim', …, { ghost: reconcile ? 0 : u })` draws **u** faded beads at 0.28 opacity
during the *decide* phase — u being the unknown. On `give-it-back` (s=7, r=4) the child
can count three faded beads instead of computing 7 − 4. The core's docblock claims
*"the child must DETERMINE m"* and its `facts()` exposes `incrementSurfaceExists` and
`biggerCountRenderedDuringDecide` but has no fact covering this channel, so no gate can
see it. It is one round of nine and may well be an intended floor-tier scaffold — but if
so it is undeclared, and the docblock's claim is broader than the code.

**6. `tapCheck` is NOT a defect — I checked before reporting it.**
*"Tap Check! ✓"* looked false, since `_produce` seals on the tile tap. But
`lcs-shell.js:777` disables the Check button only for `answerType 'number'` and
`'choice'`; this activity is `'state'`, so the button is present and enabled, and after
the reveal it is what advances the round. The string is correct. Reporting it would have
been a defect filed against working code.

**Not a defect, and worth recording because the previous activities in this programme
were:** this one **does** have the round progression its copy can claim. `bandOrder()`
sorts by band before shuffling within band, so bands 1 → 2 → 3 (3, 4, 2 rounds) always
run in order and the pool reshuffles per pass. "Easiest first, mixed into a new order each
time" is true here.

---

## 7. ⛔ BLOCKER FOR THE sv FAN-OUT — the activity will speak ENGLISH to Swedish children

`sharing-jar-activity.js` has **no `sv` branch anywhere**. `numWord()` is:

```js
(LANG === 'de' ? WORDS_DE : LANG === 'fr' ? WORDS_FR : … : WORDS)[n]
```

With `LANG = 'sv'` every ternary falls through to **`WORDS`, which is English**. On every
correct answer `_reconcile()` calls `speak(numWord(u))`, so a Swedish child hears
**"four"** — routed through `LCSAudio` with `lang: 'sv'`. The same fall-through hits the
mismatch path, which speaks the literal English `'look again'`.

This is the recorded defect class (*"es and nl were SPEAKING ENGLISH to children"*),
already paid for once. The sv ship needs a `WORDS_SV` table — `noll, ett, två, tre, fyra,
fem, sex, sju, åtta, nio, tio, elva, tolv` — plus an sv arm on the mismatch `speak()`
(*"titta en gång till"*) and an `sv-SE` entry in the `speechSynthesis` fallback lang map.
⚠ **`ett` is the standalone neuter cardinal and is correct here**, spoken alone; `en` is
the common-gender article form and would be wrong.

---

## 8. NAME-SUBSTITUTION SITE LIST (Pim / Bo)

Measured over the `strings` block: **23 keys total, 10 of which name a character**, plus
one hardcoded label outside the strings block.

**Inside `mini tools/sharing-jar-activity.js` — sv values to be authored:**

| site | why a rename touches it |
|---|---|
| `strings.pim`, `strings.bo` | the labels under each jar |
| `strings.qEqualize` | *"…does Pim need to match Bo?"* |
| `strings.qCompare` | *"…does Bo's jar have?"* |
| `strings.qRestore` | *"…give Pim back?"* |
| `strings.qReduce` | *"Pim scooped too many!"* |
| `strings.qStart` | *"Bo gave {k} away…"* — names Bo twice |
| `strings.qZero` | *"…does Pim need to match Bo?"* |
| `strings.lookAgain` | *"…how many more does Pim need?"* |
| `strings.revealCompare` | *"Bo's jar has {u} more."* |
| `strings.revealRestore` | *"Pim is happy again!"* |
| `strings.revealStart` | *"Bo started with {u} beads."* |

**⚠ One site is not localisable at all today** — `friendSVG`, line 53:

```js
'<svg … role="img" aria-label="' + (which === 'pim' ? 'Pim' : 'Bo') + '">'
```

Hardcoded English, ignoring `api.t('pim')` / `api.t('bo')`. A Swedish rename would leave
the screen-reader announcing "Pim" and "Bo" in every locale. Should be
`api.t(which)` — a one-line fix that also fixes the other six locales.

**Inside my deliverables — exactly one site:**

- prose `about[0]`: *"Två vänner, **Pim och Bo**, öser upp…"*. Every later reference is
  `den ena burken` / `den andra` / `burkarna`. Swapping the names is one edit to one
  string.
- `slug.sv`, `page_title.sv`, `page_intro.sv`: **zero sites, by design.** A rename cannot
  touch the URL, the SERP title or the meta description — which is the point, because a
  slug change after indexing is the one edit that is not small.

⚠ For the record: **`Bo` is a common Swedish male given name** (and `ett bo` is a nest,
`bo` is also the verb *to live/dwell*), so `"Bo har fler pärlor"` reads as an ordinary
sentence about a boy and `"Bos burk"` is grammatical Swedish for *Bo's jar*. That is
arguably a *feature* in sv rather than a problem — but it is the panel's call, and the
list above is why it is cheap either way.

---

## 9. TWO THINGS FOR THE PEDAGOGUE, NOT FOR ME

1. **Strand.** `frontend/lib/seo/strand-names.ts` maps `Operations & Algebraic Thinking`
   → sv **`Algebra`**. Lgr22's åk 1–3 *Algebra* is only *"matematiska likheter och
   likhetstecknets betydelse"* and stepwise instructions — that is `numbers-court`'s
   territory, not this one. This activity's content (*de fyra räknesättens egenskaper och
   samband*, *hur tal kan delas upp*) sits under Lgr22 **Tal**. A `STRAND_OVERRIDE`
   `sv: 'Tal'` may be right — but the sibling `match-pairs.find-the-missing-number.1-oa-d-8`
   renders `Algebra` today, so changing one desyncs the pair. Flagging, not acting.
2. **Grade.** `alignment.grade` is `"1"` → åk 1. Numbers reach 12 and the hardest schema
   is `start-unknown` (`? − k = r`). Åk 1 is defensible; it is the pedagogue's call, and
   the grade chip is a placement signal, not a capability claim.
