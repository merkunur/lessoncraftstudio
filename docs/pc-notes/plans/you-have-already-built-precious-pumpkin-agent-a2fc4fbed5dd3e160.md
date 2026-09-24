# `ten-stones` — Swedish (sv) in-activity strings · native linguist deliverable

> ⚠ **DELIVERY NOTE.** This session was started in **plan mode**, which permits writing to
> exactly one file — this plan file. I could not create
> `…\scratchpad\sv09\LINGUIST.md`. **This file IS the deliverable — copy it verbatim to
> that path.** Nothing below is a plan; it is finished copy plus the audit.

Sources read in full: `mini tools/ten-stones-activity.js`, `mini tools/ten-stones-core.js`,
`mini tools/ten-stones-activities.json`, plus `lcs-shell.js` (Check/Next/tryAgain, `instruction`
consumption, `LCSAudio.ttsLang`) and the sibling Swedish lexicon
(`skipcount-activity.js`, `rounding-hill.js`, `choice-board-activity.js`).

Keys enumerated **from the artefact** (`strings:` block, lines 61–76). There are **17**, not the
9 the brief listed. Two of them (`relYes`, `hintCheck`) and one more (`sayWinSpoken`) are absent
from the brief; all three are reached at runtime.

---

## 1. `sv` for every key in `strings`

```
title: "Lilys guldsten"
instruction: ""
prompt: "Hjälp Lily över dammen."
hop: "Hoppa! 🐸"
yes: "Ja – vila på guldstenen"
no: "Nej – hoppa raka vägen"
stand: "Ställ dig på talet"
sayWelcome: "Hjälp mig över dammen – gör tio på guldstenen!"
sayWin: "Vi är framme! 🌸"
sayOnStone: "På guldstenen! Hoppa nu resten."
sayWrongTen: "Då missar du guldstenen – hur långt är det till tio?"
sayWrongRest: "Det är inte riktigt resten – hur långt är det kvar?"
sayAgain: "Vi tittar en gång till."
sayRelation: "Samma stenar, baklänges! 🌸"
relYes: "Ja – samma stenar! 🌸"
hintCheck: "Gör först tio på guldstenen, hoppa sedan resten."
sayWinSpoken: "Vi klarade det!"
```

No apostrophes anywhere → every value is single-quote-safe in the JS literal.
`Lilys` takes the bare genitive `-s` (vowel-final name), never `Lily's`.

### Why each choice — the rulings the brief asked for

**`guldstenen`, not `tiostenen` — and this is a `banan`-class save.**
`tio` + `sten` compounds to `tiosten`; a 6-year-old sounding it out can segment it
`ti|osten` — **`osten` = "the cheese"**. `tio-` is also already crowded in the shipped Swedish
tool lexicon (`Tioaskarna`, `tiostav`, `tiotalsringen`). `guldsten` segments only one way
(`guld`+`sten`, both high-frequency to a first-grader, cf. `guldfisk`), and it names what the
child actually sees: the engine paints a **gold circle** (`C.GOLD #E8A53A`) at 10. The
ten-ness is never lost, because every string that uses `guldstenen` carries an explicit `10`
beside it — `sayWelcome` says *gör tio på guldstenen*, and every bridge prompt ends `= 10`.
This mirrors what es and it already do (*la piedra dorada del diez*, *il sasso dorato del dieci*).

**`sten` is free; the definite forms all check out.**
- `en sten` → `stenen` / `stenar` / `stenarna`. Common gender (**en**-word), so the double
  definite is `den gyllene stenen` — written as a full literal wherever it is needed, never
  assembled.
- `guldsten` → **`guldstenen`**. No homograph.
- `damm` → **`dammen`**. ⚠ This one needed the check: `damm` meaning *dust* is neuter and its
  definite is `dammet`; the pond is `en damm` → `dammen`. The definite form is what
  disambiguates, and I only ever use the definite. `dammen` is also the everyday child word
  (`ankdammen`).
- `rest` → `resten` ✓ · `tal` → `talet` ✓ (neuter) · none of them lands on a false word.
- The only near-miss in the whole set was `hopp` → **`hoppet`**, which is *the hope* as well as
  *the jump* (both `ett hopp`). One more reason the hop stays a **verb** here (below).

**`sten` is not spent.** The vetoed list bans `kloss`, `bricka`, `stav`, `kub`, `planka`,
`stump`, `pinne`. `rounding-hill.js` owns **`stenbumlingen`** (the boulder) — a different
compound for a different object, and the only genuine `sten` in the shipped Swedish lexicon.
`choice-board-activity.js` has `rock: sv:'stenen'`, but that is a picture-vocabulary label, not
an apparatus noun. `guld` and `damm` return nothing at all. All clear.

**⭐ The `hopp`/`hoppa` ruling — the collision is real but it is a NOUN collision, so keep the
verb and ban the compound.**
`skipcount-activity.js` ships in Swedish as *Hoppers näckroshopp* — **grodan Hopper**
hoppräknar **från näckros till näckros** across a pond, where the load-bearing taught term is
the compound noun `{step}-hopp` ("5-hopp") and the hyphen carries the meaning. So Swedish
already has a named frog crossing a pond by hopping. But:

- `hoppa` is the **only** natural Swedish verb for what a frog does. `skutta` belongs to hares
  and lambs; `studsa` is *bounce*; `skippa` is *skip (omit)*. Forcing an alternative would ship
  a word no Swedish child uses for a frog — the *s'allonger* / `cuerda` class of error.
- The collision is in the **noun**: skipcount's `hopp` is a *counting unit*, ten-stones' hop is
  a *movement along a line*. Two different concepts under one noun would blur skipcount's
  taught term.

**Ruling: `hoppa` is used as a plain verb only. `hopp` never appears as a noun, and the compound
`N-hopp` / `hoppräkna` / `näckroshopp` shapes are hard-banned in this activity.** Check the
delivered strings: `hoppa` appears six times, always as an imperative verb; `hopp` appears zero
times as a noun. The two activities are then differentiated on the setting noun as well —
`näckros` (vetoed for me anyway) vs `sten` — so a Swedish child meets two clearly different
games. `baklänges` in `sayRelation` is deliberately the same word skipcount uses
(*Räkna baklänges*): that is a **helpful** echo, one direction word across the catalogue.

`steg` is respected — it appears nowhere, which is why round 7 says *ligger ett ifrån* rather
than the more obvious *ett steg ifrån*.

**`stand: "Ställ dig på talet"` is engineered around a bare cardinal.**
Line 208 builds the anchor aria as `api.t('stand') + ' ' + numWord(o)` for every locale except
de and nl. Swedish would normally want the *definite* number-object here (*ställ dig på åttan*),
but `numWord` must stay a bare cardinal because the equation chip also reads it
(*åtta plus sex*), and the definite of ten is **`tian` — the ten-krona coin**, which is exactly
the trap MEMORY already records. Inserting the noun `talet` makes the bare cardinal grammatical:
`Ställ dig på talet åtta` — fully natural, **and it needs no engine branch at all**. `tal` is
also the Lgr22 term (*naturliga tal*), not `siffra`.

**`Vi är framme!` instead of a crossing claim.** See audit finding **B4** — `sayWin` fires on
rounds where nothing was crossed and, on three of them, where the frog never moved. Swedish
says *we're there*, which is true on every round type; every other locale asserts the far shore.

**`hur långt … till tio` / `hur långt … kvar` are direction-neutral by design.** See **B1** —
these two messages also fire on the two **subtraction** rounds, where the child hops *down*.
Swedish uses a *distance* question in both, so it is correct going up and going down. `resten`
and `kvar` never imply addition.

**`Samma stenar` takes the INDEFINITE plural.** After `samma`, Swedish never uses the definite:
`samma stenar` ✓, `*samma stenarna` ✗. Written as the finished literal.

**Register.** `Tryck på` is the house tap-verb and would be required if `instruction` is ever
filled — but no delivered string contains a tap instruction, so it does not appear. Nothing
reads as a verdict: no `rätt`, no `fel`, no `bra jobbat`. `Vi tittar en gång till.` keeps the
inclusive first-person the English uses, and is structurally unlike the shell's
`Inte än — försök igen!`, as are both `sayWrong*` lines.

**Terms I would flag as teacher-mouth, and did NOT put in a child string:**
`tiotalsövergång` (the Swedish *Zehnerübergang* — correct, and right for `page_title`/`page_intro`,
wrong for a 6-year-old on screen), `tiokamrater` (the standard term for the bonds to ten; a
Swedish first-grader does meet it, but only after it has been taught, and this activity cannot
assume it), `dubblering`. In the child strings I use `gör tio` and `nästan dubbelt`, which are
what a Swedish teacher actually *says* aloud in the lesson.

**`instruction: ""`.** Deliberate, and matching. See audit **A5**: the key is `''` for
en/de/pt/it/nl and **absent for fr and es**. A non-empty Swedish value would give Swedish alone
a visible `<p class="lcs-instruction">` that no other locale renders — a layout divergence that
would show up as an sv-only delta in the visual-QA fold sweep. If the team wants it filled, it
must be filled in all eleven at once, and the Swedish would then be:
`Hjälp Lily över dammen. Tryck på − och + för att välja hoppet, och tryck sedan på Hoppa.`
(hold that in reserve; do not ship it alone).

---

## 2. `promptL10n.sv` — all 11 rounds

Numbers copied verbatim from `prompt`, including `⬚` (U+2B1A) and `−` (U+2212). Only words
translated.

```
maketen-8-6      sv: "8 + 6. Hoppa först till guldstenen: 8 + ⬚ = 10."
maketen-7-5      sv: "7 + 5. Gör tio: 7 + ⬚ = 10, hoppa sedan resten."
findten-6-3      sv: "6 + 3. Behöver Lily vila på guldstenen?"
decompose-13-4   sv: "13 − 4. Hoppa tillbaka till guldstenen: 13 − ⬚ = 10."
anchor-3-8       sv: "3 + 8. Vilket tal ska Lily ställa sig på för att snabbast komma till tio?"
findten-8-6      sv: "8 + 6. Behöver Lily vila på guldstenen?"
equiv-7-8        sv: "7 + 8. Nästan dubbelt! Vilket tal plus sig självt ligger ett ifrån svaret?"
maketen-9-4      sv: "9 + 4. Gör tio: 9 + ⬚ = 10, hoppa sedan resten."
decompose-15-7   sv: "15 − 7. Hoppa tillbaka till guldstenen: 15 − ⬚ = 10."
anchor-9-2       sv: "9 + 2. Vilket tal ska Lily ställa sig på för att snabbast komma till tio?"
relation-8-6     sv: "8 + 6 = 14. Se hur Lily hoppar baklänges: 14 − 6 = 8. Samma stenar!"
```

Notes on three of them:

- **`anchor-3-8` / `anchor-9-2`** — the answer is deliberately **not** given. The core's
  `correctChoice` for `anchor` is literally `Math.max(a, b)`, so a prompt that says "start with
  the biggest" states the answer. Dutch does exactly that (finding **B2**); Swedish does not.
- **`equiv-7-8`** — English uses the noun *DOUBLE*, which has no natural Swedish nominal
  (`en dubbel` reads as a stand-in or a double measure of spirits). Swedish names the strategy
  the way the classroom does — **`nästan dubbelt`**, the standard near-doubles term — and then
  asks about the operation instead of the noun: *vilket tal plus sig självt* ("which number plus
  itself"), which is exactly what the three buttons render (`7 + 7`, `5 + 5`, `9 + 9`). It stays
  discriminating: only 7 + 7 = 14 is one from 15. ⚠ This is the **longest prompt in the set (73
  chars)** — the one to watch when `visual-qa-activity.js` sweeps 320/360; `.ts-prompt` wraps at
  `clamp(11.5px,2.9vw,14px)` so it will run to two lines on a phone, as nl's 63-char prompt
  already does.
- **`relation-8-6`** — English says *"Watch **it** hop backward"*. Every other locale names the
  character (de is the exception and drops it). Swedish names her: *Se hur Lily hoppar baklänges*.

---

## 3. Swedish number-words 0–20 for the aria-labels

**This is the build-blocking one.** `numWord()` (line 33) has no `sv` branch, so today a Swedish
child on a Swedish page hears the equation chip read out **in English** — *"eight plus six"* —
and nothing errors.

```js
/* sv — sifferord 0–20 för aria-etiketter/TTS. ⚠ 1 = 'ett' (den fristående räkneformen),
   INTE 'en'; 18 = 'arton', inte det ålderdomliga 'aderton'; 20 = 'tjugo', inte 'tjugu'. */
var WORDS_SV = ['noll', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv', 'tretton', 'fjorton', 'femton', 'sexton', 'sjutton', 'arton', 'nitton', 'tjugo'];
```

and in `numWord`, before the `WORDS` fallback:

```js
LANG === 'sv' ? WORDS_SV :
```

### Traps, in the German-`eins`/`sechzehn` sense

1. ⚠⚠ **1 = `ett`, never `en`.** Swedish has two forms of *one* and they are not
   interchangeable: `en` is common gender (`en sten`), `ett` is neuter — **and `ett` is also the
   absolute/counting form**, the one you say alone and in a sequence (*ett, två, tre*). This is
   the exact analogue of German *eins* vs *ein*. Every `numWord` call site here is absolute, so
   `ett` is right in all of them: the chip reads *ett plus sex*, and the anchor aria reads
   *Ställ dig på talet ett* — where `tal` happens to be neuter too, so it is doubly correct.
2. ⚠ **18 = `arton`**, not `aderton` (archaic, still dictionary-listed, wrong register for a
   six-year-old). And never write it as `attan` — **`attan!` is a mild Swedish interjection**
   ("darn!"), not a numeral.
3. ⚠ **20 = `tjugo`**, not `tjugu` (older spoken/regional variant that some references list).
4. **14 = `fjorton`** is irregular — it is *not* derived from `fyra`. A non-native writing the
   series regularly produces `*fyrton`.
5. **9 = `nio`** (ni-o) and **10 = `tio`** (ti-o) — two syllables each, never `*nie` / `*ti`.
6. **16/17 = `sexton` / `sjutton`** are *regular* in Swedish, unlike German's truncated
   *sechzehn/siebzehn* — so there is no trap, but there is a false alarm to pre-empt: `sjutton`
   doubles as a mild expletive (*sjutton också!*). It is nonetheless the only word for 17 and is
   completely unremarkable when counting. **Do not substitute anything.**
7. ⚠ **`tia` / `tian` must never enter this file.** `en tia` is the ten-krona coin/note in
   everyday Swedish. The array correctly uses the bare cardinal `tio`, and the strings avoid the
   definite number-object entirely (which is what `stand: "Ställ dig på talet"` is for).
8. `två` and `åtta` carry `å` — save UTF-8. The file already carries `fünf`, `dieciséis` and
   `três`, so the encoding path is proven.

### Three more one-line engine additions Swedish needs

```js
// line 146 — eqWord: sv has no branch and falls through to English ' equals '
LANG === 'sv' ? ' är ' :          // (' blir ' is the warmer classroom form; ' är ' matches de/nl)

// line 157 — SVG aria-label, currently hardcoded English for ALL locales
'en tallinje från 0 till 20'

// lines 188 / 190 — spinner aria-labels, currently hardcoded English for ALL locales
minus → 'ett mindre'      plus → 'ett till'
```

⭐ **The op words at line 147 need NO Swedish branch, and nobody must "fix" them.** `plus` and
`minus` **are** the Swedish words; the generic English fallback is accidentally correct for sv.
This is precisely the shape MEMORY records from the place-value-regroup repair
("Swedish was ACCIDENTALLY CORRECT there — which is why it kept surviving review"), so it is
worth a code comment. Line 208 likewise needs no `sv` branch, by construction of `stand`.

---

## 4. Audit — the English source and the other locales

### A. Build-blocking / silent, all locales

**A1. `numWord` has no `sv`.** Line 33. Covered above — English numerals to a Swedish child.

**A2. ⭐⭐ `3 + 8 = undefined` renders on screen, in every locale, at the celebration moment.**
`anchor-3-8`, `anchor-9-2` and `equiv-7-8` carry **no `target`** in
`ten-stones-activities.json`. `Core.snapshot()` passes `round.target` straight through — it does
not compute one. `_eqChip` (line 145) is `var ans = this.solved ? r.target : '?'` and writes it
into `innerHTML`, so the moment the child taps the right option, the chip reads
**`3 + 8 = undefined`** / `9 + 2 = undefined` / `7 + 8 = undefined`. The aria-label is worse:
`numWord(undefined)` → `WORDS[undefined]` → the string `undefined`, so a screen reader / the TTS
says *"three plus eight equals undefined"*. Three of the eleven rounds, seven locales, no error
thrown. Fix: add `"target": 11 / 11 / 15` to those rounds, **or** guard the chip
(`r.target == null ? '?' : r.target`) and skip the `eqWord` clause. This is a number, not a
string, so no locale panel could ever have caught it.

**A3. Hardcoded English aria-labels leak into all seven locales.** `'a number line from 0 to 20'`
(157), `'less'` (188), `'more'` (190). Exactly the class the brief names.

**A4. The equation chip speaks English operators to three locales.** Line 147:
`minus` is branched only for `it` (`meno`) and `nl` (`min`), so **fr, es and pt all get the
English word "minus"** (should be `moins`, `menos`, `menos`); `plus` is branched only for `it`
(`più`), so **es and pt get English "plus"** (should be `más`, `mais`). And `eqWord` (146) has no
`sv`/`da`/`no`/`fi`, falling through to `' equals '`.

**A5. `instruction` is missing for `fr` and `es` entirely** (line 62 lists only en/de/pt/it/nl),
and is `''` for the five that have it. The shell consumes it twice
(`lcs-shell.js:449/455/461`): as the visible `<p class="lcs-instruction">`, which renders empty,
and interpolated into the aria description, which therefore ends `"…-aktivitet. "` with a
dangling period and space in all eleven.

### B. Content and pedagogy

**B1. ⭐ A nudge that instructs ADDITION on a descending row — the recorded defect, live in three
locales including the source.** `sayWrongRest` and `sayWrongTen` fire on the **subtraction**
bridge rounds `decompose-13-4` and `decompose-15-7`, where the child must hop *back*:

| key | locale | text | problem |
|---|---|---|---|
| `sayWrongRest` | **nl** | *hoeveel **erbij** om te landen?* | *erbij* = "added on" — an explicit add instruction while hopping down |
| `sayWrongRest` | **en** | *how many **more** to land?* | "more" on a subtraction |
| `sayWrongRest` | **es** | *¿Cuántos **más** para llegar?* | same |
| `sayWrongTen` | **nl** | *hoeveel **erbij** om het tiental vol te maken?* | same, at the first bridge step |

de (*wie viele noch bis ans Ziel?*), fr (*combien encore pour arriver ?*) and it
(*quanti ne mancano per arrivare?*) are already direction-neutral. Swedish is neutral by design
(*hur långt är det kvar?* / *hur långt är det till tio?*).

**B2. ⭐ Dutch tells the child the answer, inside the question.** `anchor-3-8` and `anchor-9-2`
append *"Denk aan de grootste eerst"* ("think of the biggest first"). The core's
`correctChoice('anchor')` **is** `Math.max(round.a, round.b)` — so on `3 + 8` and `9 + 2` the
appended hint *is* the correct option. Six locales pose the question; nl answers it. (nl also
appends *"Denk aan de bijna-dubbel"* to `equiv-7-8` and *"Dat is de omkeersom"* to
`relation-8-6` — unflagged content divergences from the other six, milder, but they mean nl is
running a different activity from everyone else on three of eleven rounds.)

**B3. ⭐ French names a manipulative that is not drawn — and the slug names a third one.**
`_renderLine` draws a **gold circle on a number line**, and the tool is called Ten **Stones**;
en/de/es/pt/it/nl all say stone / Stein / piedra / pedra / sasso / steen. French says
**`nénuphar`** (lily pad) in `title`, `yes`, `sayWelcome`, `sayOnStone`, `sayWrongTen`,
`sayRelation`, `relYes`, `hintCheck` **and all eleven prompts** — while the French **slug** in
the JSON says `passer-par-dix-sur-la-piste-cp`, i.e. **`la piste`** (the track). Three metaphors
in one locale, none of them the drawn object. This also collides in Swedish terms with the
sibling `skipcount` activity, which is the one that genuinely draws lily pads.

**B4. ⭐ `sayWin` claims a crossing that did not happen — on five of eleven rounds.** It fires
after every round via `_correct()`:
- `findten-6-3` — 6 + 3 = 9. The correct answer is *"No — hop straight there"*: nothing is
  crossed. The reward line then congratulates the child on the crossing.
- `anchor-3-8`, `anchor-9-2`, `equiv-7-8` — these rounds have no `start`, so `setupTask` leaves
  `this.pos = 0` and `_arcs` empty; `_renderDone` re-renders the line with the frog **still on
  the near shore**, under a caption saying she is on the far one.

de *"Wir sind drüben!"*, es *"¡Llegamos al otro lado!"*, nl *"We zijn aan de overkant!"* all state
the far shore explicitly, so all three are false in those five rounds. Swedish ships
*`Vi är framme!`* ("we're there"), which is true on every round type — but the drawn frog still
does not move on those three rounds, which is a render question, not a copy one.

**B5. ⭐ The standing character line contradicts the task it sits above.** `render()` (line 110)
shows `sayWelcome` in `.ts-saytext` on **every** round until a `msg` replaces it. On
`findten-6-3` the child therefore reads *"make a ten on the golden stone!"* directly above the
question *"Will Lily need to rest on the Ten Stone?"* — whose correct answer is **no**. All seven
locales inherit it. A `sayWelcome` variant for the non-bridge cogs, or clearing it on
`findten`/`anchor`/`equiv`, would fix it in one place.

**B6. ⚠ The spoken prompt reads mathematical symbols aloud.** `render()` line 130 calls
`speak(pr)` on the raw prompt text, which contains `⬚` (U+2B1A) and `−` (U+2212). Most voices
skip `⬚` entirely, so `8 + ⬚ = 10` is spoken as *"åtta plus lika med tio"* — mathematically
**false** — and `13 − 4` risks *"tretton fyra"*. Affects every locale including en. Precedent
and fix shape: the `_SPOKEN` table built for place-value-regroup — a substitution
(`⬚` → *"hur många"* / *"how many"*, `−` → *"minus"*) applied before `speak()`, not in the
displayed string.

**B7. ⚠ `speak()` files a whole sentence under `type:'word'`** (line 37). `LCSAudio.speak`
slugifies the text and looks for `/audio/<lang>/word/<slug>.mp3`; a sentence slug can never
match a word recording, so it always falls through to TTS. Harmless today (no inventory), but it
mis-files these strings for the coming human voiceover — `type:'ui'` is the honest bucket, as the
shell itself uses at line 683.

**B8. ⚠ Two blossoms on the done panel.** `sayWin` ends in `🌸` in all seven locales *and*
`_renderDone` (line 230) renders a separate `<span class="ts-flare">🌸</span>` beside it. Cosmetic,
every locale.

**B9. ⚠ Spanish is authored es-MX but spoken es-ES.** This file's own header comment cites
*"planes y programas SEP"* and uses `brincar`, i.e. Mexican Spanish — while
`lcs-shell.js:175` maps `es → 'es-ES'`, a Peninsular voice. Catalogue-wide, not fixable here;
flagged because this file asserts the es-MX register explicitly.

---

## 5. One-line summary of what must change in code before sv ships

| # | file | change | severity |
|---|---|---|---|
| 1 | `ten-stones-activity.js:20-33` | add `WORDS_SV` + the `sv` branch in `numWord` | **blocking** |
| 2 | `ten-stones-activity.js:146` | add `LANG === 'sv' ? ' är ' :` to `eqWord` | **blocking** |
| 3 | `ten-stones-activity.js:61-76` | insert the 17 `sv:` values above | **blocking** |
| 4 | `ten-stones-activities.json` | add `promptL10n.sv` ×11, plus `slug.sv` / `page_title.sv` / `page_intro.sv` (not in this brief) | **blocking** |
| 5 | `ten-stones-activities.json` | add `"target"` to `anchor-3-8` (11), `anchor-9-2` (11), `equiv-7-8` (15) — **or** guard `_eqChip` | **blocking, all locales** |
| 6 | `ten-stones-activity.js:157,188,190` | localise the three hardcoded English aria-labels | high, all locales |
| 7 | `ten-stones-activity.js:147` | branch `minus` for fr/es/pt and `plus` for es/pt | high, 3 locales |
| 8 | `ten-stones-activity.js:130` | symbol substitution before `speak()` | high, all locales |
| 9 | `ten-stones-activity.js:62` | add `fr` and `es` to `instruction` (as `''`) | low |
| 10 | prompts, nl | drop the answer-giving clause from `anchor-3-8` / `anchor-9-2` | high, nl |
| 11 | strings, fr | decide stone vs `nénuphar` vs `piste` — one metaphor | high, fr |
| 12 | `sayWin` / `sayWelcome` | stop claiming a crossing / stop instructing make-a-ten on non-bridge rounds | medium, all locales |

**Do not add an `sv` branch at line 147 or line 208.** `plus`/`minus` are Swedish, and
`stand: "Ställ dig på talet"` is written to concatenate correctly with a bare cardinal.
