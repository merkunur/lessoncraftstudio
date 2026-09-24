# LINGUIST.md — Swedish for `numbers-court` (CCSS 1.OA.D.7 / Lgr22)

> **Delivery note.** I was launched in **plan mode**, which permits edits to this plan file
> only. The requested destination was
> `C:\Users\rkgen\AppData\Local\Temp\claude\C--Users-rkgen-lessoncraftstudio\cfb29625-4aea-4618-8e2c-de1d88dabb3b\scratchpad\sv10\LINGUIST.md`.
> **This file is the complete deliverable — copy it there verbatim.** Nothing is abbreviated.

Read: `mini tools/numbers-court-activity.js` (383 lines) and `mini tools/judge-balance-core.js`
(190 lines). Key count **verified from the artefact**, not from the brief: the `strings` object
spans lines 72–92 and contains exactly **15** keys. The brief's list is correct and complete.

---

## 1. The 15 `sv` values

```
title: 'Sifferdomstolen'
prompt: 'Stämmer det, domare?'
vTrue: 'Stämmer!'
vFalse: 'Stämmer inte!'
jFalse: 'Tryck på den tyngre sidan.'
jTrue: 'Tryck på varje tal och fyll båda vågskålarna.'
repair: 'Gör lika mycket på båda sidorna — tryck på ett sifferkort till rutan.'
sure: 'Hm… titta en gång till på båda sidorna, domare.'
reteach: 'Räkna båda sidorna — är det lika mycket?'
winTrue: 'Stämmer! Det är lika mycket på båda sidorna.'
winFalse: 'Stämmer inte! Det är inte lika mycket på båda sidorna.'
winRepair: 'Nu väger vågen jämnt, domare — lika mycket på båda sidorna!'
regen: 'Vågen väger fortfarande inte jämnt — här kommer ett nytt fall, domare.'
hintCheck: 'Tryck på Kontrollera när du är klar, domare.'
judgeName: 'Domare Tess'
```

**Single-quote safety:** no value contains `'`. All 15 drop into single-quoted JS literals
unescaped. Em-dash `—` and ellipsis `…` are used, matching de/es/pt/fr/nl in-file precedent.
The file is already UTF-8 (de `ü/ä`, fr `é/è`, es `¿/ó`, pt `ê`), so `å ä ö` need no special
handling — but confirm no build step transcodes.

---

## 2. Ruling on `våg` (the homograph) — **USABLE**, with the pan noun carrying the load

`våg` is genuinely two words. Full forms:

| noun | indef sg | def sg | indef pl | def pl |
|---|---|---|---|---|
| **våg** = *scales/balance* | en våg | vågen | vågar | **vågarna** |
| **våg** = *wave* | en våg | vågen | **vågor** | vågorna |

**Ruling: use it.** Four reasons, and this is a materially different case from `bana → banan`:

1. **The plurals diverge** (`vågar` vs `vågor`), so any plural use is self-disambiguating.
   `bana/banan` collided in the *definite singular*, the form the string actually used.
2. **The collocation disambiguates the singular.** `väga jämnt` selects *scales* absolutely —
   waves do not weigh. My two uses of `vågen` (`winRepair`, `regen`) are both inside that
   collocation.
3. **There is a drawn balance beam with two pans on screen.** `banan` failed because *banana*
   is a competing everyday referent for a six-year-old; *a wave* is not a competing referent
   in a courtroom with a see-saw. (`mask/masken` failed for the same reason — a face-mask is a
   thing a child sees daily.)
4. **The compound is monosemous.** `vågskål` has exactly one meaning.

**Nouns I propose — all forms, as demanded:**

| Swedish | gloss | indef sg | def sg | indef pl | def pl | note |
|---|---|---|---|---|---|---|
| **domare** | judge | en domare | domaren | domare | domarna | also *referee*; unambiguous in a court frame. **Epicene** — no gendered pair, unlike fr/es/pt/it which had to choose *jueza/juíza/giudice*. |
| **våg** | scales | en våg | vågen | vågar | vågarna | see ruling above |
| **vågskål** | scale pan | en vågskål | vågskålen | vågskålar | **vågskålarna** | monosemous; the exact term for the drawn object |
| **sifferkort** | number card | ett sifferkort | sifferkortet | sifferkort | sifferkorten | **neuter, zero plural.** Standard Swedish Y1 classroom manipulative name. |
| **ruta** | slot / box | en ruta | rutan | rutor | rutorna | what Swedish worksheets call a fill-in box (*skriv i rutan*); literally correct — the slot renders as a dashed rounded box |
| **sida** | side | en sida | sidan | sidor | sidorna | also *page*; `den tyngre sidan` is unambiguous |
| **tal** | number | ett tal | talet | tal | talen | ⚠ **exact homograph with *tal* = speech, in every form.** Safe as a free noun in a maths sentence (*varje tal*); NOT safe compound-initial in a name — see §3. |
| **siffra** | digit | en siffra | siffran | siffror | siffrorna | compound form **`siffer-`** (per the singular-first-element rule) |
| **domstol** | court | en domstol | domstolen | domstolar | domstolarna | |
| **sifferdomstol** | the title noun | en sifferdomstol | sifferdomstolen | sifferdomstolar | sifferdomstolarna | |
| **fall** | (legal) case | ett fall | fallet | fall | fallen | neuter, zero plural; also *a fall*, but *ett nytt fall* in a court frame is unambiguous (cf. *rättsfall*) |

**None of these collides with the spent list** (snöre, spår, remsa, planka, stump, räls, linjal,
pinne, lina, kloss, bricka, stav, kub, steg, näckros, hjälpare, glipa, band, rep, sten,
guldsten).

⚠ **One check I cannot run from here, and it is the one that could overturn the ruling:**
`planka` being spent implies a plank/balance-shaped tool already shipped in Swedish. **Grep the
shipped `sv` strings across `mini tools/*.js` and `mini tools/*-activity.js` for `våg`,
`vågskål`, `balans` before locking.** If a sibling tool already owns `vågen`, fall back to
`gungbrädan` (see-saw: en gungbräda, gungbrädan, gungbrädor, gungbrädorna) — vivid, monosemous,
and it matches the docblock's own "SEE-SAW FULCRUM" framing, though it is slightly less accurate
for a beam with hanging pans.

⚠ **`bricka` is spent, which is why the repair tile is `sifferkort` and not the obvious word.**
This is the recurring pattern the project has recorded: the obvious noun is already taken.

---

## 3. Ruling on `rättvis` / `rättvist` — **AVOID ENTIRELY**

I did not use it in any of the 15. Two independent reasons, either sufficient:

1. **The measured catalogue collision.** The fractions activities use `rättvist` for
   *equal-sized parts* — *"delad rättvist, så att alla delar är lika stora"*. Reusing it here
   for *equal-value-on-both-sides* would make one Swedish word carry two different mathematical
   relations inside one product. A child who has met `rättvist` as "the pieces are the same
   size" will import that reading into `8 = 5 + 3`, where nothing is being cut.
2. **Moral drift, sharpened by the setting.** `rättvis` in Swedish is first and foremost
   *morally just*. In a **courtroom**, "det är inte rättvist" reads as a verdict on the
   *witness's honesty*, not on the *quantities*. That is precisely the shaming register the
   operator bans, and it directly breaks the relational-equality lock. The Dutch panel reached
   the same conclusion independently and rejected `eerlijk` for the same reason (the comment at
   line 75 records it: *«NIET Eerlijk = moreel-eerlijk, drift»*).

**Replacement vocabulary — one consistent frame across all 15 strings:**

- **`lika mycket`** ("the same amount") = the relational concept. Appears in `repair`, `reteach`,
  `winTrue`, `winFalse`, `winRepair`. A six-year-old owns this phrase completely.
- **`väger jämnt`** ("weighs evenly") = the balance *state*. `Det väger jämnt` is a stock Swedish
  idiom every Swede knows. Concrete and Germanic, unlike the loanword abstraction `i balans`.
- **`stämmer`** = the *verdict*. `stämma` means "to tally / to be correct-as-a-match". It is
  relational by construction — two things stämmer *with each other*. This is the exact Swedish
  analogue of de `Stimmt!` and nl `Klopt!`, which are the two strongest values in the file.

Deliberately **not** used: `rätt`/`fel` (the shaming pair, and the memory records that
`Rätt/Fel` in Swedish means correct-or-incorrect *about your work*), `sant`/`falskt` (the
true/false framing the file's own Italian comment forbids at line 70).

---

## 4. Per-string reasoning, and where I deliberately diverged from the English

**`title: 'Sifferdomstolen'`** — definite, matching it/nl/pt which all went definite.
⚠ **I rejected `Taldomstolen`, which is the mathematically purer word,** because `tal-` as a
compound initial in a *name* first-parses as **speech** (talbok, talspråk, talterapi, taldator).
The maths family exists too (tallinje, talkamrater, talsort), but a title is read without
context, and "the Speech Court" is a live misreading. `Sifferdomstolen` has zero homograph, uses
the word a 6–8-year-old owns for the things on screen, and `siffer-` is the correct compound
form. Runner-up recorded so the parent can overrule: **`Taldomstolen`**.

**`prompt: 'Stämmer det, domare?'`** — the question and the two buttons now share a stem, so the
buttons read as direct answers. Keeps the vocative (en/fr/es/pt/it/nl keep it; **de drops it**,
see E12).

**`vTrue: 'Stämmer!'` / `vFalse: 'Stämmer inte!'`** — subject-drop is completely natural in
Swedish exclamations and mirrors de/nl exactly. Also a **width** decision: `.nc-verdict` only
goes column-wise below 360px, so at 361–412px the two buttons sit side by side at
`clamp(15px,4vw,20px)` with `clamp(16px,5vw,28px)` padding. I measured the pair at ≈250px
against ≈333px of usable width — fits. `Det stämmer inte!` would have been tighter for no gain.

⚠ **I refused the "catch it" metaphor.** A literal Swedish rendering (*Ta fast den!* / *Avslöja
den!*) frames the animal witness as a liar to be caught and unmasked. That is adversarial toward
a character the child is meant to like, and it contradicts the file's own no-shame rule. See E9
— four of six non-EN locales already abandoned it.

**`jFalse: 'Tryck på den tyngre sidan.'`** — `Tryck på` per the register rule.

**`jTrue: 'Tryck på varje tal och fyll båda vågskålarna.'`** — `båda` requires the definite
plural (`båda vågskålarna`, never `båda vågskålar`). `tal` is safe here as a free noun in a
maths sentence. Imperative-and-imperative rather than a purpose clause — clearer at this age
than *"…så att båda vågskålarna fylls"*.
⚠ **This string is correct copy over a broken mechanic — see E2. Do not ship it until E2 is
fixed**, or Swedish will be the voice that walks a child into a soft-lock.

**`repair: 'Gör lika mycket på båda sidorna — tryck på ett sifferkort till rutan.'`** — the goal
is restated in the activity's own frame (`lika mycket`) instead of the banned `rättvist`. `till
rutan` not `i rutan`: the card is not yet in the box, and the interaction is a tap, not a drag.
68 chars, in family with de (65) and es (62).

**`sure: 'Hm… titta en gång till på båda sidorna, domare.'`** — **deliberate divergence.** The
English *"Are you sure, Judge?"* pressures the child's confidence, and the brief is right that
it reads punitive. French already made this move (*"Hmm… regarde encore les deux côtés"*), so
there is in-file precedent. Mine directs the eye to *the relation*, which is the pedagogy.
⚠ **It also has to work at a second call site the English does not fit** — line 241 fires `sure`
when the child taps the *wrong pan* after a *correct* verdict, where "are you sure?" questions a
judgement that was right. "Titta en gång till på båda sidorna" is true at both sites. See E7.
Differs from the shell's retry line *"Inte än — försök igen!"* ✓

**`reteach: 'Räkna båda sidorna — är det lika mycket?'`** — **deliberate divergence, forced by a
defect.** The English is deictic (*"This much AND this much"*) and points at two pans that are
**empty at the moment this string fires** (E1). I will not author a Swedish string that
describes something not on screen. Mine is true over the *equation*, which is always drawn.
"Räkna" is not operational drift: the core's own docblock defines the target strategy as
"evaluate BOTH sides and compare", which is exactly what this asks.
**If E1 is fixed** (i.e. `_verdict` fills both pans before re-rendering), switch to the deictic
version, which is stronger: **`'Så här mycket och så här mycket — är det lika mycket på båda sidorna?'`**

**`winTrue` / `winFalse`** — echo the verdict button the child pressed, then restate the
relation. Parallel construction so the child hears one frame, not two.

**`winRepair: 'Nu väger vågen jämnt, domare — lika mycket på båda sidorna!'`** — pairs with
`regen`'s *"fortfarande inte jämnt"*. ⚠ Currently a **false statement on screen** — see E3.

**`regen: 'Vågen väger fortfarande inte jämnt — här kommer ett nytt fall, domare.'`** — `fall`
is the legal term (cf. *rättsfall*), matching es/pt/it/fr/nl which all say "case". Impersonal
alternative if `vågen` is overruled: *"Det väger fortfarande inte jämnt — …"*.

**`hintCheck: 'Tryck på Kontrollera när du är klar, domare.'`** — **deliberate divergence.**
`hintKey` (line 370) takes **no arguments**, so this one string is served at the verdict,
justify, repair **and** done stages. The English tells a child in the *repair* stage to "give
your verdict", which they did two stages ago (E6). Mine is true at every stage; the per-stage
instruction is already carried by `.nc-sub` (`jTrue`/`jFalse`/`repair`).
`Kontrollera` is written **unquoted with a capital**, not wrapped in quotation marks — this
sidesteps the de quote bug (E10) and reads as a button name.

**`judgeName: 'Domare Tess'`** — bare title + name is the Swedish pattern for a title preceding
a name (*kung Carl Gustaf*, *doktor Andersson*). Capitalised because this string is used
standalone as an SVG `aria-label` (line 48), not in running text. `Domaren Tess` is the
appositive reading ("the judge, Tess") and is also acceptable; `Domare` matches the bare
vocative `domare` used for the child, which is the intended fiction.

**On the -s genitive, since you asked me to rule:** Swedish names ending in **-s, -x, -z take no
added -s** in the genitive — **`Tess bok`**, never *Tess's*. An apostrophe (*Tess' bok*) is
tolerated but Språkrådet prefers the bare form, and it is the form Swedish children's books use.
**Moot in practice: none of my 15 strings needs a genitive**, which also keeps every value
apostrophe-free and JS-safe.

⚠ **`Tess` itself needs one check I cannot run.** It is a real Swedish girl's name with no
homograph (the archaic *tess* = *till dess* is not a child word), but the Dutch panel had to
rename Tess → Roos over a collision with a sibling activity's character. **Grep the sv character
names across `mini tools/*-activity.js` before locking.**

---

## 5. Strings outside the `strings` block

### 5.1 ⛔ BUILD-BLOCKING — `speak()` has no `sv` arm (line 40)

```js
u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX'
       : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG === 'nl' ? 'nl-NL' : 'en-US';
```

**Correct tag: `sv-SE`.** Not bare `sv` — `sv-SE` is the only Swedish voice tag browsers
actually ship. (`sv-FI` exists in BCP-47 and ships nowhere.)

Add the arm before the `'en-US'` fallback:

```js
: LANG === 'sv' ? 'sv-SE' : 'en-US';
```

Also absent, for whenever this fans to the rest of the Nordic set: **`da-DK`**, **`nb-NO`**
(prefer `nb-NO` over `no-NO`; Chrome and Edge index the bokmål tag), **`fi-FI`**.

⚠ **Fixing the tag is necessary but may not be sufficient.** The `speechSynthesis` branch is
only reached when `LCSAudio` is *absent* (line 39 returns early). The primary path passes bare
`lang: LANG` = `'sv'` into `LCSAudio.speak`, and the project has already recorded that
**`LCSAudio` never calls `getVoices()` and silently substitutes a missing voice** — reliable in
5 of 11 locales. So Swedish text can still be spoken in English with nothing erroring.
**Measure it** (enumerate voices, assert a `sv` voice was selected) rather than asserting the
tag is set. `speak()` is called on `sure`, `reteach`, `regen` and every win — i.e. on every
teaching moment in the activity.

### 5.2 Hardcoded English fallback in `tessSVG` (line 48)

```js
aria-label="' + esc(api && api.t ? api.t('judgeName') : 'Judge Tess') + '"
```

`'Judge Tess'` is an English literal outside the strings block. If `api.t` is ever missing, the
only accessible name on the stage is English in all 11 locales. Fall back to `''` (an
`aria-label` is better absent than wrong-language) or to the locale value.

### 5.3 The witness emoji is unlabelled and locale-blind (lines 60, 128)

```js
var WITNESS = { hopscotch: '🐰', crow: '🐦‍⬛', pip: '🐭', tilt: '🦫' };
...
var wit = api.el('div', 'nc-witness'); wit.textContent = WITNESS[this.round.witness] || '🐰';
```

No `role`, no `aria-label`, no `aria-hidden`. A screen reader announces the emoji's CLDR name in
the **assistive technology's** language, not the activity's — so a Swedish child may hear
"rabbit face" in English mid-sentence. Two secondary problems: `'🐦‍⬛'` is a ZWJ sequence with
poor coverage on Windows and older Android and degrades to 🐦 + ▪; and the witness carries no
information the child needs.

**Recommended fix, one line, no new strings:** `wit.setAttribute('aria-hidden', 'true');`
(If the witnesses are ever meant to be named, they need four more locale keys, which is a
larger commission.)

### 5.4 Not a problem — checked and clear

- `eqs.textContent = '='` (154) — locale-neutral. ✓
- `slot.textContent = '?'` (181) — locale-neutral. ✓
- Numerals render as `tok.t` — Western Arabic digits, correct for all 11 target locales; no
  per-locale digit variant needed here. ✓
- `Core`'s `'level'` return (core:42) is an internal token, never displayed. ✓
- All 15 keys reach the DOM through `api.t`. There is no other English copy in the file. ✓

---

## 6. Reachability of the 15 — all reached, but two fire wrongly

| key | reached at | verdict |
|---|---|---|
| `title` | shell (tool.strings) | ✓ |
| `prompt` | `makeTasks` `promptKey` → shell | ✓ |
| `vTrue` / `vFalse` | 200 / 201 | ✓ |
| `jFalse` / `jTrue` | 204 | ✓ |
| `repair` | 206 (label) + 257 (announce) | ✓ |
| `sure` | 222–223 **and** 241 | ⚠ two different errors, one string — E7 |
| `reteach` | 198 (label) + 222–223 | ⚠ **describes empty pans — E1** |
| `winTrue` | 249 | ✓ |
| `winFalse` | 240 | ✓ |
| `winRepair` | 262 **and 273** | ⚠ **false on screen — E3; false-praise path — E5** |
| `regen` | 264 | ✓ (wording honest) |
| `hintCheck` | 370 `hintKey` → shell | ⚠ **stage-blind — E6** |
| `judgeName` | 48 (SVG aria-label) | ✓ (English fallback — 5.2) |

**No dead strings.** All 15 are genuinely asked for. (Worth stating plainly, since the project
has recorded `hintMark` and `saveWords` shipping in 11 locales wired to nothing.)

---

## 7. Audit of the English source and the other six locales

### E1 ⭐⭐ `reteach` names two quantities that are not drawn — all 7 locales

*"This much AND this much — are they the same amount?"* fires at line 198/222 when `wrong >= 2`,
i.e. **in the verdict stage**. `this.fill` is `{left:0, right:0}` from `setupTask` (111) and is
mutated **only** in `_tapPan` success (237), `_deposit` (245) and `_placeTile` success (262) —
all of which are later stages. `_verdict`'s wrong branch (220–226) sets `this.tilt = 0` and
re-renders **without touching `fill`**, so `dotsHTML(0)` draws two **empty** pans.

The docblock at line 13 states the intent — *"2nd wrong → both-pans re-teach"* — and the code
never implements it. Every locale inherits the lie: de *"So viel und so viel"*, it *"Tanto da
una parte e tanto dall'altra"*, nl *"Zoveel én zoveel"*, fr *"Autant d'un côté, autant de
l'autre"*, es, pt. **This is the exact "prompt naming a manipulative that is not drawn" class
from the brief.**

**Fix:** in `_verdict`'s wrong branch, when `this.wrong >= 2`, set `this.fill = this.sums()`
before `this.render()`. That makes the deictic copy true and *is* the intended re-teach.
(My `sv` value is written to be true either way; swap to the deictic version once fixed.)

### E2 ⭐⭐⭐ Every session contains one round that cannot be completed — all 7 locales

`_deposit` (243–251):

```js
this.fill[side] += Math.abs(val);
...
if (this.fill.left === s.left && this.fill.right === s.right) { ... this._win('winTrue'); }
```

It **adds every operand**, ignoring `tok.op === '-'`. `Core.evalSide` (core:33–38) **subtracts**.
So on any TRUE round with a subtraction side the two can never agree.

`Core.buildPool` (core:99–106) is a fixed 12-entry plan that **always includes
`['subtraction', true]`**. Worked example: `5 = 9 − 4`.
- Child rules TRUE — correct → justify, `depositMode` on.
- Taps `5` → `fill.left = 5`, `s.left = 5` ✓
- Taps `9` → `fill.right = 9`; taps `4` → `fill.right = 13`; `s.right = 9 − 4 = 5` ✗
- Both right-side buttons now carry `nc-num-used` and their listeners were only attached
  `if (!used)` — **there is nothing left to tap.** `isCorrect()` returns `false` forever;
  the shell's Check answers *"Inte än — försök igen!"* with no available action.

**Guaranteed, every session, every locale — 1 round in 12.** The only escape is the shell's
reset, which re-serves the same round. And `jTrue` — *"Tap each number to fill both pans"* — is
the instruction that walks the child into it.

**Fix:** make the deposit respect the operator, e.g. carry the sign
(`this.fill[side] += (tok.op === '-' ? -val : val)`) and render the pan as `Math.max(0, fill)`
dots — or, cleaner for a see-saw, deposit onto a running value and level when
`fill.left === s.left && fill.right === s.right` with signed arithmetic. **Do not ship any new
locale before this is fixed.**

### E3 ⭐⭐ `winRepair` fires over the *unrepaired* equation, with *unequal* pans and a *level* beam

`_placeTile` success (262): `this.fill = this.sums(); this.tilt = 0; this._win('winRepair');`

`Core.repairLevels` (core:146–152) works on a **copy** (`.map(Object.assign)`) and never mutates
`round.expr`. So `this.sums()` returns the **original, unequal** sums. And `_win` (279) sets
`this.stage = 'done'` **before** `this.render()`, so in `_sideTokens` (178)
`isSlot = self.stage === 'repair' && …` is **false** — the slot re-renders as a plain `nc-num`
showing `tok.t`, **the original wrong number**.

Worked example: round `7 = 9 − 4` (FALSE). `repairTarget` → `{side:'left', slotIndex:0, V:5}`.
Child places `5`; `repairLevels` returns true. Screen then shows:
**the equation `7 = 9 − 4`** (reverted), **7 dots vs 5 dots** (unequal), **a level beam**
(`tilt = 0`), and the caption **"Now it balances — fair, Judge!"**

Four channels disagree simultaneously, and the one the child acted on — their tile — has
vanished. All 7 locales.

**Fix:** apply the repair to the round before winning (write `V` into
`this.round.expr[side][slotIndex].t`, then `this.fill = this.sums()`), or keep the slot rendered
in the done stage.

### E4 `.nc-slot-filled` is unreachable — corroborates E3

Line 329 styles `.nc-slot-filled` (solid green border). `slot.classList.add('nc-slot-filled')`
runs only when `self.slotVal != null` **and** `isSlot` is true (182). On the **correct** tile
the stage flips to `'done'` first, so `isSlot` is false; on the **wrong** tile `slotVal` is set
but **`render()` is never called** before the 700 ms `_regenerate` timeout, which resets
`slotVal` to `null`. Dead CSS in both branches — independent confirmation that the child never
sees their own tile in the slot.

### E5 `winRepair` is also the fallback for a *failed* regeneration — false praise

`_regenerate` (271–273): after 40 failed attempts to generate a repairable same-form round it
calls `this._win('winRepair')`. The child placed a **wrong** tile and is told *"Now it balances
— fair, Judge!"*. Low frequency (most likely on `both-sides`, where `repairTarget` returns null
if `V ∉ [1,9]` or `V` is a visible token — core:128–132), but it is a straight reward for a
wrong answer. **Fix:** fall through to a neutral re-serve, not a win.

### E6 `hintCheck` is stage-blind

`hintKey: function () { return 'hintCheck'; }` (370) takes no arguments and has no access to
`tool.stage`. So *"Give your verdict, then tap Check"* is served to a child who is in the
**justify** or **repair** stage and gave their verdict one or two stages ago. **Fix:** make
`hintKey` a function of the tool (`function (tool) { return tool.stage === 'verdict' ? … }`) —
or use a stage-neutral wording, which is what my `sv` does.

### E7 `sure` serves two different errors; one of them is silent and invisible

Line 222–223 (wrong verdict) **announces and `speak()`s**. Line 241 (wrong pan in FALSE-justify)
**announces only — no `speak()`** — and then calls `this.render()`, which produces a
**byte-identical screen**: same equation, same empty pans, same `tilt`, same instruction. The
child taps, hears a 320 Hz blip, and nothing changes. An audio-first or low-vision child gets
no spoken feedback at all on that path. **Fix:** add the `speak()` call and give the wrong pan a
visible non-directional cue (e.g. reuse `nc-bonk` on the tapped pan).

### E8 `this.wrong` is one counter for two unrelated error types

Incremented at 221 (wrong verdict) and 241 (wrong pan), reset only in `setupTask`. Consequences:
a verdict error can push the count so that a later stage's arithmetic is off; and because the
`reteach` escalation is only rendered in the **verdict** branch (198), a child can tap the wrong
pan indefinitely with identical, never-escalating feedback. Two counters, or a stage-scoped one.

### E9 ⭐ `vFalse` "Catch it!" is adversarial, and the locales have already voted

The file's own comments lock the register — Italian at line 70: *«NON "Vero/Falso", NON
"corretto/sbagliato"»*; Dutch at line 75: relational, not moral. Measured against that:

| locale | `vFalse` | verdict |
|---|---|---|
| de | *Stimmt nicht!* | ✓ relational |
| it | *Non è giusto!* | ✓ |
| nl | *Klopt niet!* | ✓ |
| pt | *Não é justo!* | ✓ |
| **es** | ***¡Atrápalo!*** | ⚠ keeps the catch metaphor |
| **fr** | ***Faux*** | ⛔ **true/false framing — the exact thing the Italian comment three lines above forbids** |

So **four of six** non-EN locales already abandoned the English. The English is the outlier, and
**fr contradicts a doctrine written in the same file**. `fr` also loses the exclamation and the
warmth that every other locale keeps. Recommend re-authoring fr `vTrue`/`vFalse` with a native
panel (*« Ça s'équilibre ! » / « Ça ne s'équilibre pas ! »* or similar) — not my language to
settle, but the defect is objective.

### E10 de `hintCheck` has a broken quotation mark

`'Fäll dein Urteil, dann tippe auf „Prüfen".'` — opens with the correct German `„` and closes
with a **straight ASCII `"`**. German closes with `“`. One-character fix; or drop the quotes
entirely, as my `sv` does.

### E11 ⭐ Seven locales name the Check button by a hand-typed literal, gated by nothing

`hintCheck` hardcodes the shell's button label in each locale — de „Prüfen", fr « Vérifier », es
"Revisar", it "Verifica", nl Controleer, pt "Verificar". **Nothing asserts these match what
`lcs-shell` actually renders.** If the shell's label differs (or is ever changed), the hint tells
the child to press a button that does not exist, in that locale only, silently. I can confirm
Swedish (`Kontrollera`, given in the brief); the other six are **unverified**. This is a
drift class worth a gate: assert every `hintCheck` value contains the shell's Check label for
that locale.

### E12 `prompt` — de drops the address, fr changes the frame

Every locale keeps the judge vocative (*Judge / Madame la juge / jueza / juíza / Giudice /
rechter*) except **de: "Stimmt das?"** — no address, so the German child is never actually cast
as the judge in the prompt. And **fr "Est-ce vrai, Madame la juge ?"** asks *is it true*, which
is the true/false framing again (E9). Both are one-line fixes for their own panels.

### E13 A `+ 0` operand can render, and its deposit button does nothing visible

`Core.generateRound('both-sides')` (core:71–74): `c = ri(rng, 1, Math.min(max-1, s - 0)); d = s - c;`
When `c === s` (possible whenever `s ≤ 9`), `d = 0` and the round renders as e.g. `4 + 3 = 7 + 0`.
In TRUE-justify the child taps a `0` button, it greys to `nc-num-used`, and **no dot appears** —
`fill` is unchanged. Pedagogically odd for 1.OA.D.7 and confusing at the pan. Suggest
regenerating when `d === 0`, or `d = Math.max(1, …)`. (Also: `s - 0` on core:72 is a no-op —
harmless, but it reads as an unfinished thought.)

### E14 The correct-verdict transition does not `speak()`

`_verdict`'s success path (228–229) plays a 700 Hz tone and re-renders; only the **wrong** paths
and the **wins** speak. A child relying on audio hears failure spoken and success only as a
tone. Minor, but the asymmetry runs the wrong way.

### E15 Dead code

- `init` line 99: `mulberry32((Date && false) ? 1 : …)` — `(Date && false)` is **always false**;
  a leftover deterministic-seed seam. Either wire it to a real test hook or delete it.
- `_loadActivity` (301–306) fetches `/mini-tools/numbers-court-activities.json` on every mount
  and assigns `self._activityRow`, which is **never read anywhere in the file**. A network
  request per mount for no effect.

### E16 `esc()` does not escape `'` (line 36)

Currently safe — the only consumer is the double-quoted `aria-label` at line 48. Brittle if that
attribute is ever emitted single-quoted. One character to add.

---

## 8. Bonus — the Lgr22 anchor, since the manifest will need it

⭐ **Lgr22 files this under Algebra, and that is not the usual override case.** Lgr22, matematik
åk 1–3, centralt innehåll, **Algebra**, contains the line **"Likhetstecknets betydelse"** — *the
meaning of the equal sign* — which is 1.OA.D.7 verbatim. So unlike the recorded pt-BR trap
(where MATH-OA auto-maps to the wrong "Álgebra" and needs a `STRAND_OVERRIDE` to "Números"),
**Swedish should NOT be overridden to "Tal"** — Algebra is genuinely correct here. Worth an
explicit note in the manifest work so nobody "fixes" it by analogy with pt.

**Grade:** Lgr22 states centralt innehåll once for the whole åk 1–3 band, so it cannot decide a
year — the **progression** does. Likhetstecknet is introduced in **åk 1** (Favorit matematik
1A/1B), so **åk 1** is the right chip, consistent with the §22.5 sv ledger-lock ruling that
within-10 symbolic arithmetic is åk 1.

**Framework name in sv-facing text: `Lgr22`.** Never "Common Core", never `1.OA.D.7` — the
project has already had 138 raw CCSS codes leak into the `page_title`/`page_intro` search-results
surface across 10 locales. The CCSS code stays as the machine anchor (JSON-LD `targetName`, the
`/standards/` hub) only.

---

## 9. Ship gate for the Swedish

1. ⛔ **Fix E2 first.** Otherwise the Swedish `jTrue` is the voice of a guaranteed soft-lock.
2. ⛔ **Add the `sv-SE` arm to `speak()`**, then *measure* that a Swedish voice actually speaks
   (§5.1) — do not trust the tag.
3. ⚠ **Grep the shipped sv strings for `våg`/`vågskål`/`balans`** (§2) and for the character
   name **`Tess`** (§4) before locking either.
4. Fix E1 and E3 — both make the Swedish copy false on screen. If E1 is fixed, swap `reteach` to
   the deictic variant.
5. Confirm `Kontrollera` is exactly the label `lcs-shell` renders for `sv`, and that my `sure`
   value differs from the shell's *"Inte än — försök igen!"* ✓ (it does).
6. Standard sv close-out: `[NSR-FLAG][sv]` per §17.5.1 — my values are native-authored, but
   the project's convention is to flag Nordic for a second native read.
