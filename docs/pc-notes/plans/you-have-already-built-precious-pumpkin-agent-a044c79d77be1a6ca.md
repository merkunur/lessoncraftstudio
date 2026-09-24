# Swedish for `bundle-bot-activity` — native authoring + English/model audit

Measured against `mini tools/bundle-bot-activity.js`, `mini tools/bundle-machine-core.js`,
`mini tools/bundle-bot-activities.json`, `mini tools/lcs-shell.js`,
`scripts/verify-bundle-machine-core.js`, and the shipped Swedish corpus
(`place-value-core.js`, all `*-activities.json` sv values).

---

## 0. THE FULL KEY LIST — 24 keys, lines 150-173

1 `title` · 2 `instruction` · 3 `prompt` · 4 `make` · 5 `tensLab` · 6 `trayLab` ·
7 `feed` · 8 `bundle` · 9 `tidy` · 10 `untidy` · 11 `qBuild` · 12 `qUnbundle` ·
13 `qImpostor` · 14 `qDecade` · 15 `qReadState` · 16 `qOverfill` · 17 `refuse` ·
**18 `overfill`** ← the one missing from the brief (line 167) ·
19 `unbundled` · 20 `bundled` · 21 `win` · 22 `tapCheck` · 23 `ariaBar` · 24 `ariaCube`

All 24 are reachable. `instruction` is rendered by the shell at `lcs-shell.js:461`
(`<p class="lcs-instruction">`) and again inside the a11y description template
`sv:'Interaktiv {title}-aktivitet. {instruction}'` (line 58). No dead strings.

---

## 1. THE SWEDISH — all 24 keys

```
title:       'Bults buntmaskin'
instruction: 'Lägg i ett ental i taget (tryck på ett ental för att ta tillbaka det). Räkna till tio och dra sedan i spaken, så buntar Bult ihop ett tiotal.'
prompt:      'Bunta ihop tiotalen!'
make:        'Gör {n}!'
tensLab:     'Tiotal'
trayLab:     'Lösa ental'
feed:        'Lägg i ett ental'
bundle:      'Bunta ihop tio! 🔧'
tidy:        'Ordna ⊞'
untidy:      'Sprid ut'
qBuild:      'Räkna tio ental och bunta ihop dem!'
qUnbundle:   'Visa {n} som {t} tiotal och {o} ental. Tryck på en tiostav för att ta isär den!'
qImpostor:   'Är det verkligen tio? Räkna noga!'
qDecade:     'Gör {n}. Bara hela tiotal, inga lösa ental!'
qReadState:  'Bult har redan {v}. Lägg i fler ental tills du får {n}!'
qOverfill:   'Lägg i ental och bunta ihop varje tiotal!'
refuse:      'Det är inte tio än. Räkna vidare!'
overfill:    'Oj, det blev fler än tio! Bunta ihop ett tiotal först.'
unbundled:   'Tiostaven blev tio lösa ental igen!'
bundled:     'Tio ental blev ett tiotal! 🔧'
win:         '{w}. Nu är talet färdigt! 🧰'          ← recommended (see §5.A)
             '{w}. Nu är allt buntat! 🧰'            ← parity fallback ONLY
tapCheck:    'Tryck på Kontrollera! ✓'
ariaBar:     'ett tiotal, tryck för att ta isär det i tio ental'
ariaCube:    'ett löst ental, tryck för att ta tillbaka det'
```

### Lexicon decisions (each measured against the shipped corpus)

- **`tiotal` / `ental` / `tiostav`** are NOT my inventions — they are the shipped house
  lexicon, from `place-value-core.js` (`sv:'Tiotal'`, `sv:'Ental'`, `sv:'tiostav'`,
  `sv:'enhetskub'`, `sv:'hundraplatta'`). Reusing them is correct: this activity and the
  place-value board must name the same material the same way.
- **The verb is `bunta (ihop)`, NOT `växla` and NOT `gruppera`.** Three reasons, all
  measured: (a) the Swedish classroom material for exactly this apparatus is *stickor
  som buntas i tiobuntar* — bundling sticks with a rubber band — so `bunta` is what an
  åk 1-2 teacher says at the board for THIS act; (b) **`växla` is owned** by
  `place-value-regroup` (shipped sv title: *"…tiotalsövergång inom 1000 – växla ett
  tiotal"*) and means *exchange*, a different move; (c) **`gruppera` is owned** by
  `place-value-activity` (shipped hint: *"Tio ental blir ett tiotal — gruppera dem"*).
  `bunta` is free, precise, and is what makes this a *buntmaskin* rather than a board.
- **"gör ett tiotal" avoided** as instructed — it is `place-value-regroup`'s sv head
  phrase. `make:'Gör {n}!'` is a different construction (numeral object, no *tiotal*).
- **`bundled` vs the sibling.** The sibling ships *"Tio ental blir ett tiotal"* (present
  tense, a general rule). Mine is *"Tio ental **blev** ett tiotal!"* (past — reporting
  the event that just fired). Same mathematical truth, different speech act; the tense
  is the differentiator and it is the right one for a just-happened transform.
- **`trayLab:'Lösa ental'`.** *lösa ental* / *hela tiotal* is the standard Swedish
  textbook pair. It also distinguishes this tray from the sibling's plain `Ental`.
  ⚠ Checked and dismissed: *lösa* is also the verb *to solve*. In a column-header noun
  phrase with no object the adjective reading is the only available one.
- **Register.** `Tryck på` / `Tryck för att` — both are shipped house forms
  (`place-value-core.js`: *"Tryck för att lägga till tiotal och ental. Tryck på ett
  block för att ta bort det."*). No *klicka*, no *peka*.
- **`Rätt`/`Fel` do not appear.** `refuse` and `overfill` describe the MATERIAL
  ("it isn't ten yet", "that came out more than ten"), never the child.

### Definite forms of every noun introduced, each checked

| indef sg | **def sg** | indef pl | def pl | unfortunate reading? |
|---|---|---|---|---|
| ett ental | **entalet** | ental | entalen | none |
| ett tiotal | **tiotalet** | tiotal | tiotalen | ⚠ see below |
| en tiostav | **tiostaven** | tiostavar | tiostavarna | none |
| en spak | **spaken** | spakar | spakarna | ⚠ homograph with adj. *spak* "meek"; the definite noun is unambiguous |
| en buntmaskin | **buntmaskinen** | buntmaskiner | buntmaskinerna | none |
| en bunt | **bunten** | buntar | buntarna | none |
| en robot | **roboten** | robotar | robotarna | none |
| ett tal | **talet** | tal | talen | none |

⚠⚠ **`tiotal` carries two dormant non-maths readings.** *tiotalet* = "the 1910s", and
colloquial *ett tiotal X* = "**roughly** ten X". Both are dead inside a maths frame with
a robot counting blocks, but they forbid one specific sentence shape: never write
`Bult har ett tiotal` bare, which reads "Bult has about ten". My strings only ever use
*tiotal* with a numeral (`{t} tiotal`), a quantifier (`varje tiotal`, `hela tiotal`),
the definite plural (`tiotalen`), or an explicit article in a bundling context
(`ett tiotal` immediately after `bunta ihop`). All safe.

⚠ Adjective agreement trap, for the record: **neuter singular `löst`** (`ett löst
ental`) vs **plural `lösa`** (`Lösa ental`). Both forms appear in this string set and
they are not interchangeable.

### The `make` string is constrained by code, not by taste

`_targetCard` (line 225) runs `api.t('make').replace(/\s*\{n\}!?/,'').trim()`.
`'Gör {n}!'` → strips `' {n}!'` → **`Gör`**. Clean.
⚠ This regex already damages two shipped locales — see §5.F.

### Em-dash discipline

`lcs-shell.js:880` announces `tryAgain + ' — ' + hintMsg`, and `makeTasks` (line 419)
returns `'qBuild'` as the hint for **every** round. So `qBuild` is the one string that
must not carry an em dash — and mine does not.

I have additionally kept **every** `q*` string dash-free (en/de/fr/es/pt/it/nl use em
dashes in `qUnbundle`, `qDecade`, `qReadState`). This costs nothing, reads more
naturally in Swedish, and pre-empts the §5.B fix: the moment `hintKey` becomes
per-cog — which it should — those strings enter the announce path and the other seven
locales will each need repunctuating. Swedish will already be correct.

---

## 2. `numWordSV` — 0-99

```js
  /* Swedish number-words 0-99: tens-then-unit written SOLID — no space, no hyphen, no
     joiner word (23 = „tjugotre", NEVER „tjugo tre" / „tjugo och tre"). Irregular tens
     STEMS: trettio (double t, NOT „tretio"), fyrtio (spelt with y, NOT „fyratio" and NOT
     „förtio"), åttio (NOT „åttatio"); 18 = arton (aderton is archaic). ⚠ unit 1 in a
     compound is ALWAYS the neuter „ett" (tjugoett) — Swedish never uses „en" there, so
     there is no de-style eins/ein split. */
  var ONES_SV = ['noll', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv', 'tretton', 'fjorton', 'femton', 'sexton', 'sjutton', 'arton', 'nitton'];
  var TENS_SV = ['', '', 'tjugo', 'trettio', 'fyrtio', 'femtio', 'sextio', 'sjuttio', 'åttio', 'nittio'];
  function numWordSV(n) {
    n = n | 0;
    if (n < 0 || n > 99) return String(n);
    if (n < 20) return ONES_SV[n];
    var t = Math.floor(n / 10), u = n % 10;
    return u ? (TENS_SV[t] + ONES_SV[u]) : TENS_SV[t];
  }
```

Dispatch, line 102 — insert before the `enWord` fallback:
```js
LANG === 'nl' ? numWordNL(n) : LANG === 'sv' ? numWordSV(n) : enWord(n)
```

**Stems, explicitly.** 20 `tjugo` (keeps its -o in compounds: *tjugoett*, *tjugotre*;
the spoken reduction *tjuett* is never written) · 30 `trettio` (double t — from *tre* +
*ttio*) · 40 `fyrtio` (**y**, and no *a*: not *fyratio*) · 50 `femtio` · 60 `sextio` ·
70 `sjuttio` · 80 `åttio` (no *a*: not *åttatio*) · 90 `nittio`.
Irregular teens: 11 `elva`, 12 `tolv`, 18 `arton`.

**The nine values this activity actually produces** (manifest targets + the unbundle
solve value): 23 **tjugotre** · 24 **tjugofyra** · 27 **tjugosju** · 29 **tjugonio** ·
32 **trettiotvå** · 34 **trettiofyra** · 36 **trettiosex** · 40 **fyrtio** ·
45 **fyrtiofem**.

Without this function Swedish falls through to `enWord` and a Swedish child is shown —
and spoken — **"thirty-four"**.

---

## 3. CAPITALISATION RULING — **YES, sv joins the capitalising branch**

`win` puts `{w}` sentence-initially, and Swedish capitalises the first word of a
sentence exactly as English does. Number words are otherwise lowercase common words in
Swedish, so this is purely a sentence-initial capital — nothing to do with the German
noun-capital rule. Line 318 becomes:

```js
if (LANG === 'fr' || LANG === 'es' || LANG === 'pt' || LANG === 'it' || LANG === 'nl' || LANG === 'sv') wd = wd.charAt(0).toUpperCase() + wd.slice(1);
```

`charAt(0).toUpperCase()` handles `å→Å` correctly, so *åttio→Åttio* is safe even though
this pool never reaches 80.

⚠ **The `de` omission looks like a bug, not a decision.** German also capitalises
sentence-initially, and `de` ships `'{w} — alles gebündelt!'` with `{w}` first — so
German currently renders **"dreiundzwanzig — alles gebündelt!"** with a lowercase
sentence opening. Outside my brief; reporting it.

---

## 4. THE FOUR CODE ARMS

**a) line 300 — spoken on a refused (sub-ten) pull.** After `LANG === 'it' ? … :`
insert `LANG === 'sv' ? 'det är inte tio än' :`

**b) line 303 — spoken on a successful bundle.**
`LANG === 'sv' ? 'tio ental blev ett tiotal' :`

**c) line 321 — the spoken tail after the number word on a win.**
`LANG === 'sv' ? '. Nu är talet färdigt' :`
(Use `'. Nu är allt buntat'` only if you ship the parity `win`.)
⚠ A period, not an em dash: TTS renders a dash as an unpredictable pause, and the tail
must match whichever `win` string ships. Note `wd` is already capitalised at line 318
before line 321 reads it, so the spoken line is *"Trettiofyra. Nu är talet färdigt"*.

**d) line 107 — the voice tag.** `LANG === 'sv' ? 'sv-SE' :` before the `'en-US'`
fallback. ⚠ `LCSAudio` (line 106, the preferred path) never calls `getVoices()` and
silently substitutes a missing voice, so Swedish TTS may simply be silent on some
devices. That is acceptable here **only because** every spoken line has a visible twin
(`refuse`, `bundled`, `win`) — the activity is fully legible with the sound off. Do not
let any future string depend on hearing.

**e) line 116 — the mascot SVG `aria-label`, also a LANG chain.**
`LANG === 'sv' ? 'Bult, roboten' :` — mirrors es *"Bolt, el robot"* / pt *"Bolt, o robô"*.

---

## 5. THE NAME RULING — `Bolt` must not ship in Swedish; use **`Bult`**

**What `Bolt` reads as to a Swedish 7-year-old:** a **white dog** (Disney's *Bolt*, 2008,
released in Sweden under the same name) or, for the adults in the room, **Usain Bolt**.
It reads as neither a fastener nor anything mechanical. The English pun — *bolt* the
fastener on a robot that fastens things together — is **completely invisible in
Swedish**, because the Swedish fastener is `bult`. `Bolt` is also not a Swedish word and
not a Swedish spelling; it would simply be an English name sitting on the one screen
where the whole point is that a machine bundles.

**`Bult` restores the pun exactly.** *en bult* = a bolt/fastener; the related verb
*bulta* = to pound/knock, which is workshop-flavoured and warm. One syllable, native
phonotactics, trivially readable by a 6-8 year old.

- **Genitive: `Bults`** (Swedish adds a bare `-s`, no apostrophe). The name does not end
  in `-s`/`-x`/`-z`, so there is no doubled-s or zero-genitive problem — as instructed.
  Used in the title: *Bults buntmaskin*.
- **Definite/unfortunate reading check:** as a name there is no definite form. The
  common noun's definite is *bulten* — no collision, nothing vulgar, no `bana→banan`
  hazard.
- **Roster check (measured across every `page_title.sv` in `mini tools/*-activities.json`):**
  shipped Swedish mascots are **Kurre** (ekorren), **Mim** (räven), **Tore** (klockan),
  **Kapten Quill**, **Pip**, **Alva**, **Mätis**, **Ebba**, **Tilly**, **Tess**, **Span**.
  There is **no robot and no B-name** in the roster. `Bult` is free, and it sits
  naturally with the concept-name half of the roster (Mätis, Span, Pip).
- Confidence: high on the semantics and the roster (both measured). The one thing I
  cannot verify offline is whether a specific Swedish children's-TV character is
  already called Bult; the risk is low and the word is generic.

**Title: `Bults buntmaskin`.** Noun phrase, names both the mascot and the apparatus,
and distinct from the sibling's shipped `Platsvärde` / *"Tiotal och ental"*.
⚠ Chosen deliberately as a **noun phrase** because `lcs-shell.js:58` builds the a11y
description as `'Interaktiv {title}-aktivitet.'` — a hyphen-compound. Any clause-shaped
title ("Bult buntar tiotal") would produce the broken *"Interaktiv Bult buntar
tiotal-aktivitet"*. A noun phrase survives it.

---

## 6. AUDIT OF THE ENGLISH AND THE MODEL

### A. ⭐⭐ `win` is accurate on **1 of 9 rounds**, in all seven shipped locales

`win` = *"{w} — all bundled! 🧰"*. It fires whenever `isSolved`. But eight of the nine
rounds solve to a state with **loose ones still in the tray**, and `_renderDone`
(lines 327-328) draws them: build-23 → 2 bars **+ 3 loose cubes**; build-34 → 4 loose;
build-45 → 5; build-27 → 7; read-state-24 → 4; impostor-29 → 9; overfill-36 → 6;
unbundle-32 → **12 loose, and the child got there by taking a bundle APART**.
Only `decade-forty` ends with zero loose ones.

So on 8 of 9 rounds the celebration says *"all bundled"* while the child is looking at
un-bundled cubes — and on the unbundle round it says it about the one round whose whole
purpose is to un-bundle. This is a promise the code does not keep, and it contradicts
the picture on the same screen.

**This is why I am not shipping a Swedish calque of it.** Recommended sv is
`'{w}. Nu är talet färdigt! 🧰'` — true on all nine rounds. Parity fallback supplied
above if you insist on lockstep, but it inherits the defect.

### B. ⭐⭐ Every round hints the wrong thing — `hintKey` is hard-coded

`makeTasks`, line 419: `hintKey: function () { return 'qBuild'; }` — for all nine
rounds. So a failed Check announces *"Not yet — try again! — Count ten ones, then
bundle!"* on:
- **`unbundle-thirty-two`**, where the required move is to **un-bundle** (bundling is
  exactly backwards, and pulling the lever undoes the child's correct work);
- **`read-state-twenty-four`**, which needs **one** feed tap and **no bundle at all**
  (start 2 tens 3 ones → solve 2 tens 4 ones);
- `decade-forty`, `impostor-twenty-nine`, `overfill-thirty-six`, where it is at best vague.

### C. ⭐⭐ The shell prompt contradicts Bolt's speech bubble, on screen, simultaneously

`promptKey: 'prompt'` is likewise hard-coded for all nine rounds (line 416), so the
shell prompt line always reads **"Bundle the tens!"**. On `unbundle-thirty-two` the
child sees that line *and*, two elements below it, Bolt saying *"Show 32 as 2 tens and
12 ones — tap a ten to un-bundle!"*. On `read-state-twenty-four` the prompt orders a
bundle in a round that contains none.

### D. ⭐⭐ The Tidy button builds the ten-frame the core swears is impossible — and the gate cannot see it

The core's central anti-cheat, stated three times in its own header and in `facts()`:
> the tray is a loose SCATTER (not a clean ten-frame — the child holds "ten" as a count,
> not "full" as a gestalt) … `scatterNotCleanTenFrame === true` — the discriminating
> assertion.

The shipped CSS (line 390):
```css
.bb-tidy .bb-scatter{display:grid;grid-template-columns:repeat(5,1fr);…}
```
The Tidy button is always available, and at ten cubes a 5-column grid **is** a 5×2
ten-frame. The one gestalt the design exists to withhold is one tap away. Worse, on
`impostor-twenty-nine` the seeded 9 tidies into 5+4 — visibly one short — so the round
whose entire cognition is *count, don't eyeball* can be solved by eyeballing.

⚠⚠ **And the gate certifies the opposite.** `bundle-machine-core.js:85` returns
`scatterNotCleanTenFrame: true` as a **hard-coded literal**, and
`verify-bundle-machine-core.js:69` asserts that literal. It cannot fail. It is also
structurally incapable of being right: the claim is about the **view**, and the core
never sees the view. Contrast lines 53/58, whose constants *are* corroborated by real
solver runs (`noAutoBundleSolver`, `subTenRefuseSolver`) — line 69 has no such
corroboration and no possible core-level behaviour to check against. `local-test-bundle-bot.js`
does not mention `tidy` either.

### E. ⭐ `feedIsClumpNotBlindTap` is false, `clumpSizes` is inert, and the longest round is 49 taps

`_feed` (line 285) calls `Core.feed(this.cstate, 1)` — exactly one. `Core.nextClump` is
never called by the activity, and `_peekClump` (line 282) is **dead code** whose
`_feedIdx` is never incremented anyway. So every `clumpSizes` value in the manifest is
inert, including `overfill-thirty-six`'s deliberate `[3]`, which was the mechanism by
which that round was supposed to overshoot ten at all.

Consequences: the core header's "A subitizable clump-feeder drops 1-3 at a time" is not
what ships; `facts().feedIsClumpNotBlindTap: true` (another hard-coded literal, asserted
by nothing) is false; and the tap counts are `build-45` = 45 feeds + 4 pulls = **49
taps**, `decade-40` = 44, `impostor-29` = 29. That is a lot of taps for a 6-8 year old,
and it is the exact load the clump feeder was designed to remove.

### F. ⭐ The `make` regex leaves visible punctuation debris in two locales

`_targetCard`, line 225: `api.t('make').replace(/\s*\{n\}!?/,'').trim()`.
- **es** `'¡Forma {n}!'` → **`¡Forma`** — a dangling opening inverted exclamation on the
  target card, with no closer.
- **fr** `'Fabrique {n} !'` → **`Fabrique !`** — the French space-before-`!` means the
  `!?` does not match, so the bang survives as a bare label.

### G. ⭐ English names the robot two different things and never introduces one of them

`title.en` = *"Bundle Bot"* and the mascot `aria-label` for en = *"Bundle Bot"*, but
`qReadState.en` says **"Bolt has {v} already"** and `page_intro.en` says *"Bundle Bot is
an eager little robot"*. So an English-speaking child is told the robot is called Bundle
Bot, then reads a sentence about someone named Bolt who was never introduced. Every
other locale uses *Bolt* consistently. This is also the one place where the aria-label
disagrees with the visible prose about the identity of the thing it labels.

### H. `qReadState` prints the answer to the round named "read-state"

The cognition of `read-state-twenty-four` is reading a board of 2 tens + 3 ones as
**23**. The prompt renders `{v}` = `start.tens*10 + start.ones` = **23**. The string does
the reading for the child; all that is left is 24 − 23. Present in all seven locales, so
the fix belongs across the set, not in Swedish alone — I have authored the faithful
Swedish rather than silently diverging.

### I. The target card says "Make 32" on a round where 32 is already made

`unbundle-thirty-two` starts at `{tens:3, ones:2}` = 32 and asks for a **regrouping** to
2 tens + 12 ones. The value never changes. "Make 32" is therefore not the task, and it
contradicts `qUnbundle` in the bubble.

### J. Minor

- `tidy: 'Tidy ⊞'` carries a glyph, `untidy: 'Scatter'` does not — the same toggle
  changes shape as well as text.
- Line 244 renders a bare `—` span for the empty tens column with no `aria-hidden` and
  no label; a screen reader announces "em dash".
- `overfill` fires only above ten, never at exactly ten — correct, and worth keeping.

---

## 7. NOT IN THE 24 KEYS, BUT SWEDISH IS NOT SHIPPABLE WITHOUT THEM

`bundle-bot-activities.json` has no `sv` in `slug`, `page_title` or `page_intro`. Every
shipped Swedish sibling has all three. Drafts, following the measured house conventions
(ASCII fold `å/ä→a`, `ö→o`, `åk→ak`; `Platsvärde` is the shipped sv term for place value,
per `place-value-core.js`):

- `slug.sv`: `bunta-tiotal-och-ental-platsvarde-ak-1`
- `page_title.sv`: `Bults buntmaskin – bunta tio ental till ett tiotal, platsvärde (åk 1)`
- `page_intro.sv`: rebuild for **Lgr22**, framework NAME only, no CCSS code in
  sv-facing text (§20.10). Grade and strand are per-activity calls — note the sibling
  `place-value` sits at åk 2 in Swedish and `nl` needed a `STRAND` override here, so
  `alignment.grade`/`strand` for sv want an explicit ruling rather than the auto-map.
