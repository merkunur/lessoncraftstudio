# Swedish linguist panel — `tally-squirrel-activity` (2.NBT.B.6 → åk 2, Lgr22)

Read: `mini tools/tally-squirrel-activity.js`, `mini tools/add-stack-core.js`,
`mini tools/tally-squirrel-activities.json`, `mini tools/tally-squirrel-activity.html`,
`frontend/lib/seo/strand-names.ts`, plus lexicon greps across `mini tools/`.

---

## RULING FIRST — the mascot is renamed to **Kurre**

`Tally` has a Swedish reading, and it is not innocent for *this* activity:

- **`tall` = pine.** A Swedish reader hears *Tally* as /ˈtalːɪ/ — `tall` + a nickname vowel,
  i.e. "the pine one". The activity's entire subject is **ekollon**, which grow on **ek**
  (oak), never on **tall**. Swedish åk 1–2 nature teaching pairs *ek → ekollon* and
  *tall → tallkotte* explicitly, and **this catalogue has already taught that split in
  Swedish**: `graph-it-activity.js:62` ships the sv categories `acorn: 'ekollon'` and
  `pinecone: 'kottar'` side by side. A squirrel named after the pine harvesting oak nuts is
  visible to exactly the target age.
- **`Tilly` collision confirmed live.** `seriation-activity.js:255` ships
  `sv: 'Tillys hyllor'` (Tilly = an orange tabby shop cat, åk 1). `Tallys` / `Tillys`, one
  vowel apart, on the same catalogue.
- **The English name is a pun that does not survive.** *Tally* = counting marks. A Swedish
  8-year-old gets none of that, so keeping the name preserves nothing and costs the
  collision. (Verified: `Tally` elsewhere in `mini tools/` is only the English identifier —
  `countTally`, `_paintTally`, `closureNotTally` — never a second mascot.)

**Replacement: `Kurre`** — the traditional Swedish name for a squirrel (as *Mickel* is for the
fox, *Nalle* for the bear). Grep: **zero** occurrences of `Kurre`/`Kurres` anywhere in
`mini tools/`. Not in the shipped roster. Common-noun reading *en (lustig) kurre* = "a funny
fellow" — benign and affectionate; the adjacent *kurragömma* (hide-and-seek) is a bonus for
an animal that hides nuts. Genitive **`Kurres`** — bare -s, no apostrophe, no colon.
Pronoun **han**.

**Checked and rejected:** `Snurre` — *Snurre Sprätt* is the Swedish name of Bugs Bunny, a
famous-character collision. `Kotte` — wrong tree, and collides with graph-it's sv `kottar`.
`Nöt` — *ett nöt* is "a fool/blockhead" and *nöt* is also cattle.

---

## PART A — the five strings

```
title        sv: 'Kurres ekollonkorgar'
instruction  sv: 'Kurre fyller korgarna med ekollon. Lägg ihop alla ekollonen och skriv summan.'
prompt       sv: 'Hur många ekollon är det tillsammans?'
hint         sv: 'Räkna först ihop alla tiotal, sedan alla ental, och lägg till sist ihop de två summorna.'
readAria     sv: 'lyssna på uppgiften'
```

Notes per string:

- **title** — joins the majority family. de/fr/pt/it/nl name the baskets; en/es name only the
  mascot and say nothing about baskets, acorns or adding. `ekollonkorg` is a well-formed
  compound on the pattern *papperskorg / matkorg / picknickkorg*, with the singular first
  element `ekollon` as the compound rules require.
- **instruction** — deliberately says **`alla ekollonen`**, not `alla talen`. ⚠ Swedish `tal`
  means *number* **and**, in school register, *an arithmetic problem* ("räkna ett tal") — the
  same ambiguity that made Dutch reject `de som`. `ekollonen` removes it and matches EN's
  "add **them** all up". `summan` is the correct Lgr22 term for the result of an addition;
  `totalen` is not school Swedish.
- **prompt** — `tillsammans`, not `sammanlagt` (adult register). `är det` because the question
  is about acorns present.
- **hint** — teaches **one** strategy: **pure place-value split** (tiotal → ental → join the
  two partial sums). Not sequential accumulation. `tiotal`/`ental` are already shipped in a
  Swedish title here ("Hundratal, tiotal och ental"), so the terms are consistent.
  ⚠ **Commas, not an em dash, in the middle.** The shell announces
  `tryAgain + ' — ' + hint`; the German shape would give Swedish children *three* em dashes in
  one line ("Inte än — försök igen! — … — …"). Trim variant if length ever bites:
  `'Räkna först ihop alla tiotal, sedan alla ental, och lägg till sist ihop dem.'`
  It does not open with its own verdict, so it does not duplicate *Inte än — försök igen!*
- **readAria** — describes the **action**, and describes it **truthfully**: see audit finding
  B — the button does *not* read the sum. It reads the addends and the question, i.e. the
  whole problem. `lyssna på` is the doing verb; `uppgiften` is what is actually spoken.

Constraint check: no U+0027 anywhere; no `klicka`/`peka` (`Tryck på` is the register if a tap
instruction is ever needed); no `rättvis`/`rättvist`; `korg`/`ekollon`/`ekorre` are not on the
claimed-noun list; Lgr22 only, no CCSS string.

---

## PART B — the three code fragments

**1. Mascot SVG aria-label**

```
'ekorren Kurre'
```

Species first and definite, per *grodan Ebba*, *hunden Karo*, the canonical *Grodan Boll*.
`'Tally, das Eichhörnchen'` / `'Tally l’écureuil'` word order reads as a stage aside in
Swedish. `'Ekorren Kurre'` is equally acceptable if the platform sentence-cases aria-labels;
lowercase matches the French entry.

**2. The spoken read-out**

- **(a) join word — `' plus '`, stated explicitly.** Swedish reads "23 plus 14" exactly.
  The default is correct; make it an **entry**, not a fall-through, so it stops being
  accidental.
- **(b) question — `'. Hur många blir det tillsammans?'`**
  ⚠ **`blir`, not `är`** — after an arithmetic expression Swedish idiom is *"23 plus 14, hur
  många blir det?"*. This is deliberately different from the on-screen `prompt` (`är det`),
  which follows the acorns rather than an expression.

**3. Everything else I would change in those chains**

- ⚠⚠ **`speak()` speaks Swedish with an English voice.** `tally-squirrel-activity.js:20`,
  the browser-fallback branch: `u.lang = LANG==='de'?'de-DE': … : 'en-US'`. **sv, da, no and
  fi all fall to `'en-US'`.** This is not cosmetic: the line contains bare digits, and an
  `sv-SE` voice reads `23` as *tjugotre* while an `en-US` voice reads it as *twenty-three*.
  So the numerals themselves come out in the wrong language. Needs `sv-SE` (and `da-DK`,
  `nb-NO`, `fi-FI`). This is exactly the shape the platform has shipped before — a correct-
  looking Swedish operator with English around it — except here the *numbers* break too.
- ⚠ **The activity speaks unprompted.** `render()` fires `speak(sayLine)` 320 ms after every
  render when `_spoke` is false, and `reset()` calls `setupTask()` which clears `_spoke`, so
  pressing *Kontrollera → Inte än → försök igen* re-triggers it. Combined with the bug above,
  a Swedish child's first experience of the activity is an English voice. Gate the autospeak
  on a voice actually being available, or make it press-only.
- ⚠ **The read button's accessible name hides its own visible label.** Visible:
  `🔊 23 + 14 = ?`. `aria-label`: *"hear the baskets"*. The accessible name contains none of
  the visible text (WCAG 2.5.3 *Label in Name*), and a screen-reader user never hears the
  expression from the button. Recommended: append it —
  `'lyssna på uppgiften: 23 plus 14, hur många blir det tillsammans?'` — or drop the
  `aria-label` and let the visible text be read.
- The `sayLine` question chain has no `sv` **and no `da`/`no`/`fi`** branch — same class of
  gap, four locales wide.

---

## PART C — the forks

**1. Mascot** — **RENAME to `Kurre`** (reasoning above; operator's call, this is my
recommendation). Replacement set:

| where | value |
|---|---|
| `strings.title.sv` | `'Kurres ekollonkorgar'` |
| `strings.instruction.sv` | `'Kurre fyller korgarna med ekollon. …'` |
| SVG `aria-label` | `'ekorren Kurre'` |

If the operator overrules and keeps **Tally**: the strings become
`'Tallys ekollonkorgar'` / `'Tally fyller korgarna med ekollon. …'` / `'ekorren Tally'`.
The genitive is clean either way (`Tallys`, bare -s). But note the mitigation is partial —
avoiding the genitive in the title would soften the *Tilly* clash and would **not** touch the
pine/oak reading.

**2. Acorn, basket, squirrel — every definite form checked**

| word | gender | def. sg. | plural | def. pl. | trap check |
|---|---|---|---|---|---|
| **korg** | en | **korgen** | korgar | **korgarna** | clean — no homograph |
| **ekollon** | ett | **ekollonet** | ekollon (ø) | **ekollonen** | clean |
| **ekorre** | en | **ekorren** | ekorrar | **ekorrarna** | clean |
| **tiotal** | ett | **tiotalet** | tiotal | **tiotalen** | ⚠ *ett tiotal* colloquially = "about ten"; unambiguous beside *ental* |
| **ental** | ett | **entalet** | ental | **entalen** | clean |
| **summa** | en | **summan** | summor | summorna | clean |
| **tal** | ett | **talet** | tal | **talen** | ⚠⚠ = number / speech / *an arithmetic problem* → kept out of `instruction` |

`korg` is forced — it is the only Swedish word for a basket (`hink`/`spann` are buckets).
⚠ Mild adjacency: `syllable-splitter.js` sells *sorteringskorgarna* as a premium feature, and
`fraction-kitchen.js` has *utflyktskorgen*; neither is a named apparatus, so `korg` is free
here. Reported, not blocking.

⚠ **`ekollon` is already claimed in Swedish** by `graph-it-activity.js:62` (sv #7, the
immediately preceding fan-out), where it is one of six chart categories. Here it is the whole
subject. Unavoidable — the art draws a squirrel — but two consecutive Swedish activities about
ekollon is worth knowing before ship.

**3. The hint** — teaches the **pure tens-then-ones place-value split**, matching de/fr/pt/nl
and rejecting the English double method. This is the right call for åk 2: Lgr22 *centralt
innehåll* åk 1–3 names "naturliga tal och deras egenskaper … tal i talsystemet" and mental
strategies over written algorithms; column arithmetic (*uppställning*) is later. Five of the
nine rounds carry over the ten, which is precisely where the split pays.

**4. `readAria`** — action-first and truthful: `'lyssna på uppgiften'`. ⚠ Do **not** author it
toward the sum — the button never speaks the sum (audit B). "Listen to the baskets" (the
de/fr/nl shape) describes what is on screen rather than what pressing does.

---

## AUDIT OF THE ENGLISH SOURCE

**A. ⭐⭐ `hint` names two different strategies, and two shipped locales inherited the
contradiction.** *"one at a time"* is sequential accumulation; *"tens with tens, ones with
ones"* is place-value partitioning. On a four-addend round with a carry they are different
procedures. de/fr/pt/nl quietly replaced it — but **es** (`de una en una: las decenas con las
decenas`) and **it** (`un cestino alla volta: le decine con le decine`) reproduce it verbatim.
Live in two locales.

**B. ⭐⭐ `readAria` is wrong about what the button does — and the brief I was given repeats
the error.** The brief says *"a button that reads the sum aloud."* Line 99:
`sayLine = addends.join(' plus ') + question`. **The total is never spoken.** Every locale
that authored `readAria` toward the answer would be lying; the shipped ones all say "the
baskets", which is content-not-action but at least not false. Flagging so nobody "corrects"
it toward the sum.

**C. ⭐⭐ The copy asserts a fiction the render never draws.** `instruction` says Tally *fills
the baskets with acorns* and `prompt` asks *how many acorns in all* — but `basketSVG()` draws
an **empty** basket, and **no acorn is drawn anywhere in the file**. The child sees baskets
with numerals on them. All seven locales inherited an instruction describing a picture that
does not exist. Either draw the acorns or stop promising them.

**D. ⭐ The brief's EN `title` is not the artefact's.** Brief: *"Tally's Acorn Baskets."*
Shipped `strings.title.en`: **`"Tally the Squirrel"`**. *"Tally's Acorn Baskets"* is the
**`page_title`** in the manifest — a different field. Two fields conflated.
And the stated reason for the double quotes is false: `"Tally the Squirrel"` contains **no**
apostrophe. The apostrophe-bearing strings in this file are `fr: 'Tally l’écureuil'`,
`nl: 'Tally’s eikelmandjes'` and `fr: 'Additionne d’abord…'` — all U+2019, which is exactly
why single quotes still work. The double quotes on `en` are decorative.

**E. ⭐ `title` is inconsistent across locales.** en/es name only the mascot ("Tally the
Squirrel" / "Tally la ardilla") and say nothing about baskets, acorns or adding; de/fr/pt/it/nl
name the baskets. The card title is a discovery surface. sv follows the majority.

**F. ⭐ `page_intro.en` puts the raw CCSS code in human-facing prose** — *"Common Core
2.NBT.B.6."* Per §20.10 the code belongs in JSON-LD and the `/standards/` hub, not the intro.
This is the exact class `verify-activity-serp-copy.js` exists to catch.

**G. ⚠ The manifest has no `sv` key at all** — `slug`, `page_title` and `page_intro` are all
seven-locale. The sv build needs those three as well as the five strings; they must carry
**Lgr22** by name, **no CCSS code**, and no "free/gratis" claim.
✅ **No `STRAND_OVERRIDE` needed:** `strand-names.ts:86-99` already maps
`'Number & Operations in Base Ten'` → sv **`'Taluppfattning och tals användning'`**, the
correct Lgr22 centralt-innehåll heading. Verified, not assumed.
✅ **No `GRADE_OVERRIDE` needed:** `alignment.grade: "2"`. Lgr22 states centralt innehåll once
for the whole åk 1–3 band and so cannot decide a year; the progression does, and addition
within 100 with *tiotalsövergång* and place-value strategies sits in **åk 2**. The chip is a
placement signal, not a capability claim.

**H. ⭐ No number-word engine is needed for sv** — the TTS line carries bare digits, which an
`sv-SE` voice reads correctly as *tjugotre*. That is true **only if B.3's `sv-SE` fix lands**;
without it the digits are read in English. The two are one fix.

**I. Minor.** `answerMax: 140` while every round totals ≤ 90 (core caps at 140) — the keypad
accepts three-digit entries far outside any round. And `hintKey` returns the same hint for all
nine rounds, including the four with no carry, where the split hint is overkill.

**Rounds verified against the manifest:** totals 37 · 56 · 67 · 80 · 78 · 77 · 82 · 72 · 90 —
match the brief exactly, and exactly **five** carry over the ten (80, 77, 82, 72, 90). Three
bands of three; `bandOrder` reshuffles within band, so the easy band is always met first.
