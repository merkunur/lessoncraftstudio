# Swedish authoring — `sharing-jar-activity` (make-fair / 1.OA.D.8)

Native Swedish rebuild, not a translation. All findings measured against
`mini tools/sharing-jar-activity.js`, `make-fair-core.js`,
`sharing-jar-activities.json`, `lcs-shell.js`.

---

## 1. THE LEXICAL RULING — `rättvis` is right, but it must not carry the maths

The brief was right to challenge `rättvis`. Verdict: **build on it, but only for the
social frame.**

- `rättvis` / `rättvist` **does not drift toward "correct"** in modern Swedish.
  *"Det är inte rättvist!"* is exactly what a Swedish child shouts when a sibling
  gets more sweets. It is the authentic playground word for this activity's felt
  social wrong, and no alternative comes close.
- The recorded `Rätt`/`Fel` ban is about **verdicts on the child's work**.
  `rättvist` is a verdict on *the world* (the two jars), not on the child. Different
  object, no shame signal.
- **But** it is built on `rätt`, and it would sit next to correctness feedback. So I
  anchor it with a pronoun every time — **`Det är rättvist!`**, never a bare
  `Rättvist!` — which fixes the referent on the situation and kills the ambiguity.
- The **mathematics** rides on **`lika många`** (the Lgr22 / åk-1 textbook phrase for
  equal quantity) and **`skillnaden`** (the difference), not on `rättvist`.
  This mirrors how the English works: *fair* in the frame, *match* / *gap* in the
  question.

**Nouns introduced, with definite forms and the unfortunate-reading check:**

| indef. | definite | plural | plural def. | check |
|---|---|---|---|---|
| en burk | **burken** | burkar | burkarna | clean; not `bur`/`buren` (= cage) |
| en pärla | **pärlan** | pärlor | pärlorna | clean (bead = pearl, same word) |
| en pärlburk | **pärlburken** | pärlburkar | pärlburkarna | singular first element ✓ |
| en skillnad | **skillnaden** | skillnader | skillnaderna | clean, maths register |
| ett tal | **talet** | tal | talen | ⚠ `tal` also = *a speech*; unambiguous beside numerals on screen, and it is the Lgr22 word (`taluppfattning`) |
| — | **början** | — | — | fixed phrase `från början` |

`ramlade ut` (fell out) is used for the spill — **`spilla` avoided**, same liquid
trap the Dutch panel found with *morsen*.

---

## 2. THE NAME RULING

### Pim — **KEEP**

Not a Swedish word, not a Swedish name, cleanly pronounceable /pɪm/, genitive
**`Pims`** unambiguous (base does not end in -s). No unfortunate reading.
Only note: **`Pip`** is shipped (`graph-it`, *Pips stapelskog*) and is one phoneme
away — the standing "never on one screen" rule already covers it.

Pim is also a **shared-universe character across four activities** —
`sharing-jar`, `domino-two-part`, `echo-grove`, and `pim-comma-mail` (which is
*named after him in its slug*). None has Swedish yet. Keeping Pim keeps that
cluster coherent when the others are rebuilt.

### Bo — **RENAME.** Three converging reasons, one of them activity-specific.

1. **`bo` is a high-frequency verb** (*att bo* = to live/reside), and its imperative
   can legitimately open a Swedish sentence. The English source puts `Bo`
   sentence-initial twice (`qStart`, and `Bo's` in `revealCompare`). For an **åk-1
   decoder** — the exact target age — sentence-initial `Bo gav bort…` is a genuine
   garden path. This is the same rule the programme already recorded for `bär`
   (*never sentence-initial*).
2. **`ett bo` = a nest / a den**, definite **`boet`**. This one is
   activity-specific and is my strongest argument: **this game is about what is
   inside a container**, and `bo` *is* a container word. Naming a character
   after a receptacle, in a game whose whole subject is a receptacle, is uniquely
   unfortunate here in a way it would not be in a clock game.
3. **The label renders the bare word.** `sj-jarname` prints `Bo` alone under the
   figure on every round, with no syntax to disambiguate it from the verb or the
   nest.

The homograph objection alone would be weak — Swedish naming is full of
name/word homographs (*Björn*, *Sten*, *Vide*) and children handle them fine. But
those are all **nouns**, so syntax resolves them instantly. `Bo` is a **verb**, and
that is the difference.

### The sibling constraint — this is a cluster decision, not a local one

`bos-berry-pantry-activities.json` is titled **"Bo's Berry Pantry"** and has no
Swedish yet. It sits in the same fan-out queue. Two facts follow:

- The rename **must be decided once and applied to both.** If Swedish
  `sharing-jar` renames and `bos-berry-pantry` does not, Swedish gets two
  characters where English has one.
- **A pantry is also a container**, so reason (2) hits that activity identically.
  It is not a case where Bo survives elsewhere — the same argument renames it too.

### Recommended: **Sigge**

- Not a word in Swedish; no unfortunate reading; standard current child's name
  (from Sigvard/Sigurd), same homely unpretentious register as *Bo*.
- Genitive **`Sigges`** — base ends in `-e`, so no ambiguous double-s.
- Not on the shipped roster (Pip, Mim, Span, Kurre, Tore, Quill, Alva, Mätis,
  Tess, Ebba, Tilly).
- Phonetically well separated from Pim (two syllables, different onset).
- Works for the sibling: *Sigges bärskafferi*.

**Alternative, if a mixed-gender pair is wanted: `Vera`** (`Veras burk`, clean, no
roster clash).
⚠ **`Alma` was considered and rejected** — one letter from the shipped **`Alva`**
(`mosaic-menders`).

### ⚠ Code consequence of any rename — a live latent defect

`friendSVG()` hard-codes `aria-label="Pim"` / `"Bo"` (line 53), while the visible
name comes from `api.t(nameKey)` (line 176). Today they agree because no locale
renames. **The moment any locale renames, the screen reader says `Bo` while the
screen says `Sigge`** — the aria-label contradicting its own visible label.
`friendSVG` must take the localised name. This is a code change, flagged not made.

---

## 3. THE 23 STRINGS

```js
title:          'Den rättvisa pärlburken'
instruction:    'Gör det rättvist: räkna ut talet och tryck på det.'
prompt:         'Gör det rättvist!'
qEqualize:      'Hur många FLER pärlor behöver Pim för att ha lika många som Sigge?'
qCompare:       'Hur många FLER pärlor har Sigges burk än Pims?'
qRestore:       'Några pärlor ramlade ut! Hur många ska Pim få tillbaka?'
qReduce:        'Pim tog för många! Hur många ska tillbaka så att Pim har {T}?'
qStart:         'Sigge gav bort {k} och har nu {r}. Hur många hade Sigge från BÖRJAN?'
qZero:          'Hur många fler behöver Pim för att ha lika många som Sigge?'
hint:           'Räkna ut det och tryck sedan på talet.'
hintZero:       'Titta noga på båda burkarna och räkna.'
had:            'hade {n}'
fairIs:         'rättvist = {n}'
gaveAway:       'gav bort {k}'
lookAgain:      'Titta en gång till och räkna ut det igen.'
revealEqualize: 'Ja! Båda har {n} pärlor nu. Det är rättvist! 💛'
revealCompare:  'Precis! Sigges burk har {u} fler. Det är skillnaden.'
revealRestore:  'Tillbaka på {n} pärlor. Pim är glad igen! 💛'
revealReduce:   'Nu har Pim {n} pärlor. Det är rättvist! 💛'
revealStart:    'Ja! Från början hade Sigge {u} pärlor.'
revealZero:     'De har redan lika många. Det är rättvist! Ge inga alls. 💛'
tapCheck:       'Tryck på Kontrollera! ✓'
pim:            'Pim'
bo:             'Sigge'
fairBridge:     'lika'          // 24th key in the file; DEAD (§5)
```

Constraint compliance:
- `hint` and `hintZero` contain **no dash of any kind** — `lcs-shell.js:880`
  announces `tryAgain + ' — ' + hint`, and the shipped `sv` tryAgain
  (*Inte än — försök igen!*) already contributes one em dash.
- `tapCheck` names **`Kontrollera`**, the shipped `sv` chrome label
  (`lcs-shell.js:37`). Register **`Tryck på`** throughout; no *klicka*, no *peka*.
- Every placeholder `{n} {k} {r} {T} {u}` verbatim.
- No `Rätt`/`Fel`. `Precis!` and `Ja!` are warm affirmations, not grading labels.
- **`glad` is gender-neutral in Swedish** singular utrum — unlike Italian
  *bravo/brava*, `Pim är glad` genders nobody. No workaround needed.

Three of these deliberately **repair the English** (§5): `qCompare` adds the
missing comparand, `qReduce`/`revealReduce` drop the false *each*, `lookAgain`
stops naming a character who is off screen.

---

## 4. THE CODE ARMS

### 4a. `WORDS_SV` — build-blocking

```js
/* Swedish cardinals 0-12, COUNTING form. Swedish has no separate standalone
   numeral the way German has „eins": the counting form of 1 is `ett` (neuter).
   `en` is the common-gender form and appears ONLY before a common-gender noun
   („en pärla"). Line 217 speaks the BARE number with no noun → `ett`. */
var WORDS_SV = { 0:'noll', 1:'ett', 2:'två', 3:'tre', 4:'fyra', 5:'fem', 6:'sex',
                 7:'sju', 8:'åtta', 9:'nio', 10:'tio', 11:'elva', 12:'tolv' };
```

**1 takes `ett`, not `en`.** Swedish children count *ett, två, tre*; a bare numeral
read aloud is *ett*; arithmetic is *ett plus två*. `en` would only be right if the
number were followed by a common-gender noun — and line 217 is
`speak(numWord(u))`, the bare number. The trap is the inverse of the German one:
because the beads are *pärlor* (common gender) one is tempted to reach for `en`,
and that would be wrong.

⚠ **`6 = "sex"` is correct and must not be "fixed" later.** It is also the Swedish
word for sex; it is nonetheless the only word for 6, every Swedish child says it
constantly, and TTS pronounces it /sɛks/. Recorded here so no future pass
"corrects" it. (`u` never equals 6 in the shipped rounds, but the table must be
complete.)

Without this table the fall-through is **worse than silence**: `numWord` returns
the English *"two"*, which is then handed to a **Swedish** voice — `lcs-shell.js:182`
already maps `sv → sv-SE` — producing Swedish phonics applied to an English word.

### 4b. Line 41 — `numWord`

Insert `LANG === 'sv' ? WORDS_SV :` into the chain before the `WORDS` fallback.

### 4c. Line 46 — voice tag

Add `LANG === 'sv' ? 'sv-SE' :` before the `'en-US'` default.
Secondary in practice (this branch runs only when `LCSAudio` is absent, and the
shell's `ttsLang` already handles `sv`), but it is the belt-and-braces path and
currently says `en-US` for Swedish.
⚠ Noted in passing: this local fallback says **`es-MX`** where the shell says
**`es-ES`** — the two channels already disagree for Spanish.

### 4d. Line 202 — spoken wrong-answer line

Add `LANG === 'sv' ? 'titta en gång till' :`
Lowercase fragment, matching the shape of the existing arms and consistent in
sense with my `lookAgain`.
⚠ Structural note: this is a **second, hard-coded copy** of `lookAgain`'s meaning,
so the spoken and displayed channels can drift — the recorded `_srMirror` class
from `place-value-regroup`. Ideally line 202 speaks `api.t('lookAgain')`; that is a
code change and would speak a longer sentence, so I have only flagged it.

---

## 5. AUDIT OF THE ENGLISH SOURCE

Ordered by severity. All measured against the model, not read off the copy.

### ⭐⭐ A1 — `lookAgain` asks a different question from the one on screen, and in
three schemas of five it names a character who is not rendered.

Line 202 sets `this.msg = api.t('lookAgain')` on **every** wrong answer, whatever
the schema. Line 130 then renders `this.msg || this._question()` — so the message
**replaces the question**. The string is
*"Look again — how many more does Pim need?"*

- `compare-diff` — the question is about **Bo's** jar; the re-pose asks about Pim.
- `reduce-to-target` — the task is to **put beads back**; the re-pose asks how many
  more are **needed**. Opposite direction.
- `start-unknown` — `_scene` renders **only Bo's jar** (line 168). Pim is not on
  screen at all. A child who answers wrong loses the real question and is asked
  about a character who is not there.

So on the `how-many-start` round (k=3, r=4, u=7) a wrong tap replaces
*"Bo gave 3 away and now has 4. How many did Bo START with?"* with
*"Look again — how many more does Pim need?"* — unanswerable.

**Fix:** make it schema-neutral. My Swedish is
*"Titta en gång till och räkna ut det igen."* English should become the same
shape: *"Look again, then work it out."* The other six locales inherit the defect
verbatim.

### ⭐⭐ A2 — `qReduce` and `revealReduce` promise something the code does not keep.

*"How many to put back so **each** has {T}?"* / *"Now **each** can have {n}"*.

`reduce-to-target` renders **one jar** (line 165, Pim only). `nums` carries just
`{a, T}` — there is **no second quantity anywhere in the model**. Nothing
establishes that Bo has `T`, and `unknownFor` is `a − T`, which touches Pim alone.
On `put-some-back` (a=6, T=4) Pim ends with 4; Bo is neither shown nor computed.

"each" is a claim about a state the activity never produces. **Fix:** name Pim
only, and let the existing `fair = {T}` badge carry the fairness frame — which is
what my Swedish does.

### ⭐⭐ A3 — `restore` renders the answer as ghost beads, contradicting the file's
own stated anti-cheat invariant.

`make-fair-core.js` claims the perceptual cheat is structurally impossible
(`incrementSurfaceExists === false`, *"the child must DETERMINE m"*).

But line 162 passes `ghost: reconcile ? 0 : u` — during **decide**, `u` ghost
beads are drawn (`.sj-ghost{opacity:.28}`, visible). On `give-it-back`
(s=7, r=4, u=3) the child can **count three faint beads and tap 3** without any
arithmetic.

`biggerCountRenderedDuringDecide()` only inspects the `tier` flag and cannot see
this — so the gate has a hole exactly where the doctrine claims closure.

It is arguably defensible as a band-2 scaffold (empty-slot missing-addend is a
standard representation), but it **contradicts the header's stated invariant**,
and either the render or the doctrine should move. Flagging, not resolving.

### ⭐ A4 — `qCompare` is an incomplete comparison.

*"How many MORE beads does Bo's jar have?"* — more **than what**? The second term
is never stated; only the picture supplies it, and the beads are
`aria-hidden="true"`. A screen-reader child gets an unanchored comparative.
My Swedish supplies it: *"…än Pims"*. Same gap in de/nl/it.

### ⭐ A5 — the ceiling tier is unsolvable for a screen-reader user.

On `hideCount`, `sj-count` renders **`?`** (line 182) while `beadSVG()` is
`aria-hidden="true"` (line 61). On `level-hidden`, `gap-of-twelve` and
`hoard-hidden` the larger given is therefore available **only visually** — hidden
as a numeral by design, and unavailable as beads by accessibility markup. There is
no path to the answer. Needs an sr-only count on the jar (code change).

### ⭐ A6 — two strings are authored in seven locales and referenced nowhere.

- **`hintZero`** — `hintKey` is the constant `function () { return 'hint'; }`
  (line 289). `hintZero` is never fetched.
- **`fairBridge`** — `_bridge()` sets `'='`, `'?'` or `'+' + u` as literals
  (line 188) and never calls `api.t`. The Dutch comment even documents a
  translation decision for it (*"eerlijk (story) vs gelijk (fairBridge)"*) — a note
  about a string that never renders.

This is the recorded `hintMark` / `saveWords` class. Worse, **`hintZero` would leak
the answer if it were ever wired**: *"maybe it is already fair!"* is shown only
when `u === 0`, i.e. precisely when the answer is 0. My Swedish `hintZero` is
authored non-leaking in case it is ever connected.

### ⭐ A7 — `opts.removed` is passed and never read.

Line 165 passes `removed: reconcile ? u : 0`; `_jar` (lines 172–184) reads
`dim, quiet, full, newBeads, highlight, ghost, hideCount, badge` and never
`removed`. So the `reduce-to-target` reveal shows Pim at `T` with **nothing
depicting the removal** — the one schema whose action is subtraction has no
visual for it, while every other schema animates its change.

### A8 — the tile row silently bounds the authorable answer space.

`_tileRow` hard-codes `i <= 10` (line 194) while `nums` reach 12 and
`start-unknown` computes `u = r + k`. A round with `r=8, k=5` would need 13 —
**unsolvable, with no error anywhere**. Nothing validates the manifest against the
tile range. Shipped rounds max at 7, so this is latent, not live.

### A9 — `instruction` says *say*, `hint` says *tap*, and the child taps.

*"Make it fair — say the kind number"* vs *"Work it out, then tap that number."*
`instruction` is also interpolated into the shell's aria-label
(`lcs-shell.js:58`), so a screen-reader child is told to **say** something that is
in fact a tap. Additionally **"the kind number" is ambiguous in English** —
*kind* = nice, or *kind* = sort/type. For 6–8s and for EAL readers that is a real
ambiguity. My Swedish uses `tryck på` in both places and drops the ambiguity.

### A10 — `start-unknown`'s reveal animates the given-away beads *inwards*.

Line 168: on reconcile the jar shows `u` (=7) with `newBeads: n.k` (=3), so the
three beads Bo **gave away** float **in**. It reads as restoring rather than as
reconstructing the start. Defensible as "here is what you started with", but it
sits against the badge *"gave 3 away"*. Minor.

### Correct by measurement (checked, no defect)

- `unknownFor` matches every question's literal reading in all 5 schemas.
- `revealEqualize {n}=n.a`, `revealRestore {n}=n.s`, `revealReduce {n}=n.T`,
  `revealStart {u}`, `revealCompare {u}` — all resolve to the right quantity.
- On the zero round (`a=b=4`) `quiet` is correctly **false**, so Pim is not drawn
  sad when nothing is wrong.
- `qZero` is deliberately a near-duplicate of `qEqualize` — it **must not** hint
  that the answer is 0. The near-identity is correct design, and my Swedish
  preserves it.

---

## 6. COMPANION GAP (outside the 23 strings)

`sharing-jar-activities.json` has **no `sv`** in `slug`, `page_title` or
`page_intro`. That is the SERP surface now covered by
`verify-activity-serp-copy.js`, and its framework name for Swedish is **Lgr22**
(§A.13.49) — **no CCSS code in Swedish-facing text**. Not authored here; flagged
so it is not missed at build.
