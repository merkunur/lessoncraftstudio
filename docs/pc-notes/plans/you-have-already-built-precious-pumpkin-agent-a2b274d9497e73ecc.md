# Swedish pedagogue ruling — `bundle-bot.bundle-machine.1-nbt-b-2-a`

Measured against the artefact 2026-09-08. Read-only; no files changed.

## Rulings at a glance

| | Ruling |
|---|---|
| **Grade** | **åk 2** — add `sv: '2'` to `GRADE_OVERRIDE` |
| **Head term** | **`bunta` / `bunta ihop` ↔ `lösa upp`**. NOT *tiotal och ental*, NOT *gör ett tiotal*, NOT *växla* |
| **Strand** | `Taluppfattning och tals användning` — auto-map correct, **no override** |
| **English audit** | 8 defects, 3 of them cross-locale and shipped in all 7 locales |

---

## DECISION 1 — Grade: **åk 2**

### The citation, and what it can and cannot decide

Lgr22, matematik, **årskurs 1–3**, centralt innehåll, rubriken **Taluppfattning och
tals användning**, carries the two bullets this activity lives on:

- *naturliga tal och deras egenskaper samt **hur talen kan delas upp*** …
- *hur **positionssystemet** kan användas för att beskriva naturliga tal*

Both bullets are stated **once for the whole åk 1–3 block**, and betygskriterierna
sit at the end of åk 3. The syllabus therefore licenses the content and cannot
place the year. The year comes from the progression.

### The Swedish progression marker

The instrument that actually stratifies the years in Sweden is Skolverket's
**Nationella bedömningsstöd i taluppfattning** (obligatoriskt i åk 1):
**Avstämning A** is anchored in **talområdet 0–20**, **Avstämning B** opens
**0–100** with uppdelning av tal och tiotalsövergångar, **Avstämning C** goes
past 100. That is the ladder Swedish textbook series follow — *Favorit matematik*
(1A/1B kring 0–20, tiotalet introduceras i slutet av åk 1; 2A/2B = hela 0–100 med
positionssystemet), *Prima Matematik* and *Singma* place the systematic
tiotal-och-ental-arbetet inom 100 in åk 2 the same way.

### Judged by skill, not by the CCSS number

The standard is a grade-1 standard. The activity is not:

| Round | Content | Swedish year |
|---|---|---|
| build 23 · build 27 | tio ental → ett tiotal, 2 tiotal | **åk 1** — this is the classic buntning av sugrör |
| build 34 · impostor 29 | 3 tiotal, count-don't-gestalt | åk 1/2 gräns |
| **decade 40** | fyra tiotal, **noll ental** — nollans funktion i positionssystemet | **åk 2** |
| **build 45** | 4 tiotal | **åk 2** — past the åk-1 talområde |
| **unbundle 32 → 2 tiotal och 12 ental** | **icke-kanonisk uppdelning** | **åk 2, decisively** |

`unbundle-thirty-two` is the round that settles it. Asking a child to show 32 as
**2 tiotal och 12 ental** is not "tio ental blir ett tiotal" — it is the flexible,
reversible place value that underwrites subtraktion med växling. A Swedish åk-1
child who has *just* learned that ten ones become one ten is actively confused by
being asked to undo it into a non-canonical form. That decomposition is åk-2
content in every Swedish series I know, and it is the direct prerequisite for the
åk-3 `växla ett tiotal` page this catalogue already ships.

Two rounds are genuinely åk 1. Seven are åk 2 or the boundary. The chip must name
where the **whole set** is teachable: **åk 2**.

### How this coexists with "Tiotal och ental" at åk 1

It coexists cleanly, because the two are **different acts, not the same content at
two grades**:

- **"Tiotal och ental" (åk 1)** — the ten **already exists** as an object. The
  child taps to add *en tiostav*. Nothing is composed; the child **reads and
  builds** with a ready-made unit. That is åk-1-possible even at large values,
  because a tiostav is a thing you count with, not a decomposition you author.
- **Bundle Bot (åk 2)** — the ten **does not exist** until the child makes it, and
  can be un-made. Plus a non-canonical form and a jämnt tiotal with noll ental.

The Swedish sentence for a teacher: *"Först lär sig barnet **se** tiotal och ental
(åk 1). Sedan lär det sig **göra och lösa upp** ett tiotal (åk 2)."*

Relative to `Addition med tiotalsövergång … (åk 2)`, Bundle Bot is the
**manipulative that precedes it inside the same year** — höstterminen åk 2 vs
vårterminen. Two åk-2 pages in sequence is normal and correct; Bundle Bot makes
the tiotal, tiotalsövergången uses it inside an addition.

Resulting Swedish ladder — coherent, monotone, no rung repeated:

1. **åk 1** `Siffror 11 till 19` — teens = ett tiotal + ental
2. **åk 1** `Tiotal och ental` — se och bygga med färdiga tiostavar
3. **åk 2** ← **Bundle Bot** — bunta och lösa upp; icke-kanonisk form; jämna tiotal
4. **åk 2** `Addition med tiotalsövergång inom 100`
5. **åk 3** `Subtraktion med tiotalsövergång / dubbelväxling`

### The honest alternative, and its price

If the operator prefers to harmonise **down to åk 1** with es/fr/pt, that is
defensible **only if** `unbundle-thirty-two` is dropped or re-targeted and
`build-forty-five` is lowered. Those two rounds are what carry the activity over
the åk-1 line. Ruling åk 1 while keeping "visa 32 som 2 tiotal och 12 ental" would
put a genuinely åk-2 task under an åk-1 chip.

**Separate flag, not for this build:** `Tiotal och ental` ships at åk 1 with
targets up to **95**. I think 95 is high for a Swedish åk 1 and that page's
placement is itself arguable. I am *not* proposing to touch it here — I note it so
nobody later reads it as the precedent that settles Bundle Bot.

---

## DECISION 2 — Differentiation, head term, title

**Your reading is right, and I would sharpen it in one word: authorship.**

`Tiotal och ental` is about a number that is **already decomposed** — the child
selects pre-made units and reads the result. Bundle Bot is about the **act of
making the unit and un-making it**. In Swedish teaching language the pair is
**att bunta ihop** ↔ **att lösa upp**, and the sentence the whole activity exists
to install is:

> **Tio ental blir ETT tiotal — och ett tiotal kan lösas upp till tio ental igen.**

Three things Bundle Bot teaches that `Tiotal och ental` cannot:

1. **Buntningen som handling** — the ten is *manufactured* by the child, not
   handed over. Bolt refuses to bunta at nine. This is the composite-unit insight;
   a page with ready-made tiostavar structurally cannot teach it.
2. **Reversibiliteten** — that a tiotal can be **lösas upp**, and that 32 can
   honestly be *2 tiotal och 12 ental*. This is the flexibility the whole
   växlings-ladder later spends.
3. **Räkna, inte gissa på fullhet** — the impostor round makes "det ser fullt ut"
   fail. Nothing else in the Swedish catalogue does this.

### The fence — measured, and tighter than expected

| Phrase | Owner | Verdict |
|---|---|---|
| `tiotal och ental` | the sibling activity **AND** the printable exercise-type family `base-ten` (sv slug `tiotal-och-ental`) | **owned twice — veto** |
| `gör ett tiotal` | `Addition med tiotalsövergång … (åk 2)` | **veto** |
| `växla` / `växla ett tiotal` / `dubbelväxling` | the two åk-3 subtraktion pages | **veto** |
| `växel` | `Ge tillbaka växel i kronor` (pengar) | different sense — avoid entirely |
| `tio mer, tio mindre` | `choice-board.ten-more-less` | veto |
| **`bunta` / `bunt` / `bunta ihop` / `lösa upp`** | **nobody** | **free — and it is the correct word** |

`bunta` is not a workaround; it is the standard Swedish term for exactly this
activity (*bunta sugrör i buntar om tio*). It is both free and right.

### Recommended lead

- **Title:** **`Bolt buntar tiotal`** — follows the Romance sibling pattern
  (*Bolt agrupa decenas / Bolt raggruppa le decine / Bolt fait des dizaines*)
  rather than the German compound. Keep the mascot **Bolt** untranslated; Swedish
  *bult* is the fastener, there is no collision, and no Swedish child mis-reads it.
  (`Bunta-Bolt` also works but reads as an awkward hyphen-compound in Swedish.)
- **page_title:** lead on the **act and its reverse**, e.g.
  *Bolt buntar tiotal – bunta tio ental och lös upp ett tiotal (åk 2)*.
- The title must lead on **buntandet**, never on the two place names.

### Terminology set I would lock

| Element | Swedish | Note |
|---|---|---|
| a bundled ten | **ett tiotal** | ⚠ **NEVER *en tia*** — that is a 10-kronorsmynt |
| tens column label | **Tiotal** | |
| loose ones | **lösa ental** | tray label |
| bundle (verb / button) | **bunta** — *Bunta tio!* | |
| un-bundle (child-facing) | **lösa upp** | *plocka isär* acceptable in prose |
| refuse | *Inte tio än – räkna vidare!* | warm, no shame |
| bundled | *Tio ental blir ett tiotal!* | the headline sentence |

**Adjacent finding, not this build:** the sibling uses **`enhetskub`**, a calque of
*unit cube*. Standard Swedish for tiobasmaterial is **`entalskub`** (beside
`tiostav`, `hundraplatta`). Worth a separate one-line fix on that page.

---

## DECISION 3 — Strand: **confirmed, no override**

`strand-names.ts` maps `Number & Operations in Base Ten` → sv
**`Taluppfattning och tals användning`**. That is **verbatim the Lgr22 åk 1–3
rubric** in matematik — not a calque, not an invention. It is exactly right and
needs no override. (Contrast `nl`, which needed one because
*"Getallen en het tientallig stelsel"* is not an SLO domain name; Swedish has no
such problem.)

---

## DECISION 4 — Audit of the English

Read against `bundle-machine-core.js` and the round data, not the prose. Eight
findings; the first four are shipped in **all seven locales**.

### D1 ⭐⭐ `hintKey` is hard-coded to `qBuild` for every round — and one of them is the opposite instruction

`makeTasks` (bundle-bot-activity.js:419) returns `hintKey: function () { return 'qBuild'; }`
for **every** round. `lcs-shell.js:877-878` surfaces it as the hint on a wrong Check.

So in `unbundle-thirty-two`, a child who presses Check at the **start state**
(3 tiotal, 2 ental — value 32, correct value, wrong form) is told:

> **"Count ten ones, then bundle!"**

Following that hint moves them **away** from the solution; the task is to
un-bundle. The same hint is wrong for `read-state` (they need one single one) and
is actively counter-productive in `impostor`, where it **endorses the bundling
reflex the round exists to refuse**.

### D2 ⭐⭐ `promptKey` is hard-coded too — the shell prompt contradicts the task on screen

Same line: `promptKey: 'prompt'` for every round → the shell prompt always reads
**"Bundle the tens!"**. In the unbundle round the child sees, simultaneously:

- shell prompt: *Bundle the tens!*
- Bolt's bubble: *Show 32 as 2 tens and 12 ones — tap a ten to un-bundle!*

Two contradictory instructions in one frame, in the round with the hardest
cognition.

### D3 ⭐⭐ `clumpSizes` is dead data — and the `overfill` round is therefore non-functional

`Core.nextClump` is never called. `_peekClump` (line 282) is **defined and never
referenced**. `_feed` (line 285) always does `Core.feed(this.cstate, 1)`.

Consequence: `overfill-thirty-six` carries `clumpSizes: [3]` precisely so the child
overshoots ten and must recover. With one-at-a-time feeding **the child never
overshoots by accident**, so that round is behaviourally identical to a `build`
round of 36, and the `overfill` string plus the `.bb-over` styling are effectively
unreachable. The cog is inert.

The core's own docblock (lines 16-18, *"a subitizable clump-feeder drops 1-3 at a
time"*) now describes behaviour the activity does not have.

### D4 ⭐⭐ The `Tidy` button hands the child the exact ten-frame the design forbids

The core's headline anti-cheat (lines 11-13, and `facts.scatterNotCleanTenFrame:
true`) is that the tray is a **loose scatter** so the child holds *ten* as a count,
not *full* as a gestalt.

`.bb-tidy .bb-scatter { display:grid; grid-template-columns:repeat(5,1fr) }`
— tidying ten ones produces a **5×2 ten-frame**. One tap defeats the anti-cheat.
In the impostor round, tidying nine gives 5+4, readable as "not ten" at a glance —
which is precisely the reflex that round exists to defeat. Meanwhile `facts()`
still reports `scatterNotCleanTenFrame: true`, because it describes the data
structure, not what is on screen.

Femstruktur is a legitimate Swedish strategy and I would **keep** the tool in
general — but it must be **unavailable in the impostor round**, and the core's
`scatterNotCleanTenFrame` fact should not be claimed as structural while the UI
offers a ten-frame on request.

### D5 ⭐ `qReadState` performs the cognition the round is named for

`'Bolt has {v} already — add ones to make {n}!'` → renders **"Bolt has 23 already
— add ones to make 24!"**. Arithmetically it matches the model exactly
(start 2 tiotal + 3 ental = 23; solve = 2 tiotal + 4 ental). **The string is
correct and the round is broken by it**: the round is called `read-state`, and the
question *tells the child the state*. They never read anything.

Two further problems in the same string:
- *"add ones"* is plural; **exactly one** one is required.
- The round is therefore **one tap long**.

The honest version shows 2 tiotal + 3 ental and asks *"Hur många har Bolt? Lägg
till ental tills du har 24."*

### D6 ⭐ `qUnbundle` states the answer, the method and the object

`'Show {n} as {t} tens and {o} ones — tap a ten to un-bundle!'` → the target form,
the operation and the thing to tap. `_unbundle` then checks `isSolved` immediately,
so the round is **one tap**. Nothing is judged.

### D7 The impostor question goes stale and never states the goal

`_question()` is round-level. `impostor-twenty-nine` shows *"Is that ten? Count
carefully!"* for the **entire** round — including the ~20 further feeds and 2
lever pulls needed to reach 29. The actual goal (29) appears only on the target
card. The question is right for the first three seconds and wrong for the rest.

### D8 The tap budget is unbalanced to the point of being a different activity

`_feed` adds one. Measured minimum interactions per round:

| Round | Feeds | Pulls | **Taps** |
|---|---|---|---|
| unbundle 32 | — | — | **1** |
| read-state 24 | 1 | — | **1** |
| impostor 29 | 20 | 2 | 22 |
| build 23 | 23 | 2 | 25 |
| build 27 | 27 | 2 | 29 |
| build 34 | 34 | 3 | 37 |
| overfill 36 | 36 | 3 | 39 |
| **decade 40** | 40 | 4 | **44** |
| **build 45** | 45 | 4 | **49** |
| | | | **≈ 247** |

**Forty-four identical taps to build 40 trains counting stamina, not
positionssystemet.** And a one-tap round landing next to a 49-tap round is not a
progression. For a Swedish åk-2 class this is my strongest pedagogical objection —
see the veto list.

### Also noted (visual — please confirm on the render, I derived it from geometry)

`barSVG()` draws the ten-rod as a rect `y=3 … 89` with ten lines at
`y = 11, 19 … 83`. Ten interior lines cut the rod into **eleven** bands. A child
who counts the bands on a tiostav — which is exactly what a place-value child does
— **counts eleven**, in an activity whose entire subject is ten. Nine interior
lines give ten bands. I cannot screenshot in plan mode; treat this as measured
arithmetic awaiting a render check.

---

## Swedish build blockers — things `strings` alone will not fix

These are the "es and nl were speaking English to children" class. Adding `sv:` to
the 24 string keys and stopping there **ships an English-speaking Swedish page**.

1. **`numWord()` (line 102) has no `sv` branch** → falls through to `enWord()`.
   The win line would render **"forty-five — allt buntat!"**. Needs `numWordSV`:
   modern Swedish writes these as one word — *tjugotre, tjugonio, trettiotvå,
   trettiofyra, trettiosex, fyrtio, fyrtiofem*. ⚠ 30 = **trettio**, 40 =
   **fyrtio**. ⚠ Unit 1 takes the neuter counting form **-ett**
   (*tjugoett, trettioett*), not *-en*; no target in this deck ends in 1, but the
   function must handle it.
2. **`speak()` (line 104-109) has no `sv` branch** → `u.lang` falls to `'en-US'`,
   and both the refuse line and the bundled line are hard-coded English literals
   inside `_pull` (lines 300, 303) and `_win` (line 321). A Swedish child currently
   **hears English** on every bundle. Needs `sv-SE` plus the three Swedish
   utterances (*inte tio än* / *tio ental blir ett tiotal* / *— allt buntat*).
3. **`_win` capitalisation (line 318)** lists fr/es/pt/it/nl. `{w}` is
   sentence-initial in the sv `win` string, so **sv must join that list**
   (*Fyrtiofem — allt buntat!*).
4. **`tapCheck`** must match the shell's Swedish button, which is **`Kontrollera`**
   (`lcs-shell.js:37`) → *"Tryck på Kontrollera! ✓"*.
5. **Authoring constraint on `make`:** `_targetCard` (line 225) derives the card
   label by stripping `{n}` with `/\s*\{n\}!?/`. **`{n}` must stay last** in the
   Swedish string — `'Bygg {n}!'` → label *Bygg*. A Swedish string with `{n}`
   first produces a garbage label.

Variety/shuffle (§A.13.60) is already satisfied: 9 original rounds, `bandOrder`
reshuffles within band on each forward pass.

---

## What I would veto

1. **`en tia`** for a bundled ten. It is a ten-krona coin. Always **ett tiotal**.
2. **`tiotal och ental`** as head term or title — owned twice over (the sibling
   activity *and* the `base-ten` printable family).
3. **`gör ett tiotal`** (åk-2 tiotalsövergång) and **`växla` / `tiotalsövergång` /
   `dubbelväxling`** (åk-3 subtraktion). Also avoid **`växel`** — money.
4. **Shipping sv without `numWordSV` + a sv `speak()` branch.** Hard blocker; the
   activity would speak and write English to a Swedish child.
5. **The `decade 40` and `build 45` rounds as they stand.** I would not put 44 and
   49 consecutive identical taps in front of a Swedish åk-2 class. Fix by either
   restoring the clump feeder (`Core.nextClump` already exists and is wired in the
   core — the activity simply stopped calling it) or lowering those two targets.
   This is the one I would escalate rather than absorb.
6. **The one-tap `unbundle` and `read-state` rounds in their present form** — both
   hand the child the answer in the question text (D5, D6). Rebuild the question,
   don't translate it.
7. **The `Tidy` button in the `impostor` round** — it voids that round's entire
   cognition with one tap.

---

## Where I am uncertain

- **The exact 2022 wording** of the two Lgr22 bullets I cite. I am confident about
  their substance and the rubric name; I would have the wording confirmed against
  the published kursplan before it goes into any citation-bearing prose.
- **The exact talområden of bedömningsstödets Avstämning A/B/C.** I am confident
  that A is anchored in 0–20 and that the systematic 0–100-arbete is B, and the
  ruling rests on that; the precise boundaries are worth a second native check.
- **The barSVG band count** — derived from the SVG geometry, not seen. Confirm on
  the render before acting.
- I did **not** re-examine whether `Tiotal och ental` at åk 1 with targets to 95 is
  itself correctly placed. I believe it is arguable. It is out of scope here and I
  deliberately did not let it drive this ruling.
