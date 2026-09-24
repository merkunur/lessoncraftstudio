# PEDAGOGUE — `numbers-court` → Swedish (Lgr22)

> Written by the Swedish lågstadielärare / matematikdidaktiker panel.
> **Intended path:** `…\scratchpad\sv10\PEDAGOGUE.md`. Plan mode restricted this session to the
> plan file, so the ruling lives here verbatim — copy it across.
> Sources read: `mini tools/numbers-court-activity.js`, `mini tools/numbers-court-activities.json`,
> `mini tools/judge-balance-core.js` (the generator — the manifest says `generate:true`, so the
> rounds are in `buildPool()`, not in the JSON).

---

## 1. GRADE — **åk 1**, and it *may* share åk 1 with `plus-och-minus-par`

**Ruling: årskurs 1, placed in the second half of åk 1 (vårterminen).** Not åk 2. Do not copy
pt (3º ano), nl/es/it (year 2), and do not treat the seven-locale spread as evidence — that
spread reflects *when each country introduces the relational equal sign*, not how hard it is.

**Why Lgr22 alone cannot decide it, and what does.** Lgr22 states matematik centralt innehåll
once for the whole åk 1–3 band, and the relevant bullet — *"Matematiska likheter och
likhetstecknets betydelse"* — is stated for åk 1–3 without a year. So the year is decided by
the Swedish textbook progression, and there it is unambiguous:

- **Favorit matematik 1A** introduces *lika med* and the likhetstecken in the first chapters,
  inside talområdet 0–10.
- **Kommutativa lagen** ("man kan byta plats på talen") is explicit **åk 1** content in Favorit,
  Prima and Singma — and `a + b = b + a` is 2 of the 12 generated rounds here.
- Open sentences / missing addend (`3 + __ = 5`) are **åk 1**.
- åk 2 is where the range opens to 0–20 / 0–100 and where subtraktion med växling arrives —
  none of which this activity touches.

**Content check against the actual generator.** `generateRound(form, rng, opts)` defaults
`max = 10`, and `buildPool()` never overrides it. Every number the child sees is 0–10; the
only operations are `+` and a single `−`; there is no regrouping, no two-step, no unknown
beyond one slot. That is **åk 1 talområde**, squarely.

**Why late åk 1 and not autumn.** The VERDICT stage is pure relational reading and would work
in höstterminen. But the JUSTIFY stage requires the child to *evaluate both sides* (deposit
until the sums match), and the `subtraction` rounds require subtraction within 10 to be secure.
That is vårterminen. State it as åk 1; a teacher scanning for åk 1 will find it, which is what
the grade chip is for — a **placement signal, not a capability claim** (same principle as the
clock ruling on sv #8).

**Sharing åk 1 with the existing `1.OA.D.7` sibling — YES, and it must.**
`plus-och-minus-par` ("Plus- och minus-par", the match-pairs card) asks the child to **find /
produce an expression of equal value** — pairing `6 + 2` with `9 − 1`. This card asks the child
to **evaluate a stated relation as true or false, and then repair a false one**. In Swedish
didactics those are two different acts under the same bullet:

| | sibling | this card |
|---|---|---|
| cognitive act | *hitta lika värde* (produce) | *avgöra om en likhet är sann* (evaluate) |
| child's move | matching | judging + justifying + repairing |
| direction | expression → expression | statement → verdict |

Both belong to *likhetstecknets betydelse* in åk 1. Pushing this one to åk 2 purely to avoid
a duplicate chip would be **placing content by catalogue convenience rather than by curriculum**
— exactly the error the grade chip must not make. If differentiation is wanted, differentiate
in the copy, not the year: the sibling is the *entry* card (matching), this is the *consolidation*
card (judging). Say so in `page_intro`.

---

## 2. STRAND — **CONFIRMED: Algebra. For once the auto-map is right on the merits.**

I am asked to confirm or refuse the CCSS "Operations & Algebraic Thinking" → sv **Algebra**
auto-map. **Confirmed, and this time not merely for consistency with the 17 shipped cards.**

Lgr22, matematik, årskurs 1–3, kunskapsområde **Algebra**, centralt innehåll, verbatim:

> **"Matematiska likheter och likhetstecknets betydelse."**

That bullet *is* this activity. Not adjacent to it, not a reasonable home for it — it is the
literal subject. Lgr22 files only two things under åk 1–3 Algebra (this, plus mönster/stegvisa
instruktioner–programmering), and the equal sign is one of them.

**The distinction the brief asks me to draw, made explicit.** On the three previous Swedish
activities the auto-map produced Algebra for content that is *aritmetiska strategier* and
genuinely belongs under **Taluppfattning och tals användning**; Algebra was kept there for
catalogue consistency against a wrong substantive reading. **Here the two justifications
coincide**: consistency says Algebra and the curriculum says Algebra. There is no tension to
manage on this card, and no carve-out is needed.

**Do not** move it to *Taluppfattning och tals användning*. The arithmetic in this activity is
the *instrument*, not the object — the object is what the symbol `=` asserts. Filing it under
Taluppfattning would be the mirror of the previous mistake.

**Copy consequence.** Use Lgr22's own phrase in `page_title` / `page_intro`: **"matematiska
likheter"** and **"likhetstecknets betydelse"**. A Swedish teacher searches those exact words,
so curriculum fidelity and discoverability point the same way here.

---

## 3. TERMINOLOGY — Lgr22 / lågstadiet register

### 3.1 The equal sign and its relational meaning

| concept | Swedish | status |
|---|---|---|
| the equal sign | **likhetstecknet** (ett likhetstecken, likhetstecknet, likhetstecken, likhetstecknen) | **established** — Lgr22 verbatim |
| a mathematical equality | **en likhet** / **matematiska likheter** | **established** — Lgr22 verbatim |
| "the same amount on both sides" (to a 7-year-old) | **"lika mycket på båda sidor"** | **established** — the standard formulation in Favorit / Prima åk 1 |
| the same for an older child / formal | "lika stort värde" | established, but **åk 3+ register — do not use here** |
| "it balances" | **"det väger jämnt"** / **"i balans"** | **established idiom**, and it is the phrase Swedish maths didactics uses for the equal-sign balance |

⚠ **Spelling trap for the implementer: `jämnt` (evenly), NOT `jämt` (always).** *"Det väger
jämnt"* is correct; *"det väger jämt"* means "it always weighs". This is a common native
misspelling and will look illiterate to a teacher.

**Say "lika mycket", never "blir" / "gör" / "svaret".** The whole point of 1.OA.D.7 is to kill
the operational reading, and Swedish has an especially strong operational pull: children read
`=` aloud as *"blir"* ("fyra plus tre blir sju"). Any affirmative string containing **blir**
teaches the misconception. Ban it in affirmative copy; it may appear only inside an explicit
negation (e.g. in the page intro: *"likhetstecknet betyder inte 'nu kommer svaret'"*). This is
the same lock the it/nl panels already applied to *fa* / *wordt*.

### 3.2 The apparatus — **`våg` is safe here; the collision is in the plural, not the singular**

**Ruling: `våg` is usable, but I recommend the play strings not name it at all.**

The homograph is real but it is not where the brief expects it:

| | scales | wave |
|---|---|---|
| indefinite sg | en våg | en våg |
| **definite sg** | **vågen** | **vågen** ← genuinely ambiguous in isolation |
| indefinite pl | vågar | vågor |
| **definite pl** | **vågarna** | **vågorna** ← diverge |

So the singular collides and the plural does not. This activity only ever needs the singular.

**Why it is nonetheless not a problem:** (a) the disambiguating context is total — a beam, a
fulcrum and two pans are on screen with numerals on them; (b) Swedish primary maths material
uses *vågen* for exactly this apparatus without qualification; (c) a wave has no plausible
reading in a numbers activity. No Swedish 7-year-old will read *"vågen väger jämnt"* as a wave.

**Two safer options if the team wants zero ambiguity:**
- **`balansvågen`** — the explicit compound, established in Swedish maths didactics, unambiguous.
  Slightly long; good in `page_intro`, heavy in a button.
- **`vågskål` / `vågskålarna`** (the *pans*) — **unambiguous, no wave reading at all**, and it is
  the precise word for the part the child actually taps. This is the better noun for `jFalse`.

**My recommendation:** name the apparatus **`balansvågen`** once, in `page_title`/`page_intro`
(where the role must be introduced and the SEO lives), use **`vågskål`** for the pans in play
strings, and otherwise carry the idea with the **verb** — *"väger jämnt"* — so the play copy
never has to disambiguate a noun at all.

### 3.3 TRUE / FALSE verdicts for a 7-year-old

**Refused, with reasons:**

- ❌ **"Sant" / "Falskt"** — åk 4+ register, and *falskt* carries a lying/forgery connotation in
  Swedish that the courtroom frame makes worse. A 7-year-old hears *falskt* as *fusk*.
- ❌ **"Rätt" / "Fel"** — ⚠ **this is the trap.** In a Swedish classroom *rätt/fel* is the
  teacher's verdict on **the child's own work**. Putting it on a button that judges *a claim*
  collapses "the statement is false" into "you are wrong". Must not be used.
- ❌ **"Korrekt" / "Inkorrekt"** — not lågstadiet Swedish at all.

**Ruling — primary pair (says the mathematics, and is the shortest true thing):**

- `vTrue` → **"Lika mycket!"**
- `vFalse` → **"Inte lika mycket!"**
- `prompt` → **"Är det lika mycket på båda sidor?"**

**Acceptable alternative** (matches the de/nl solution, slightly more abstract):
`"Det stämmer!"` / `"Det stämmer inte!"`. Both are correct Swedish; the first pair is better
because the button itself teaches the relation.

**Balance-flavoured alternative** if the team wants the apparatus in the verdict:
`"Det väger jämnt!"` / `"Det väger inte jämnt!"` — correct and idiomatic, but long for a button.
The `@media (max-width:360px)` rule stacks the verdict buttons full-width, so length is
survivable; at ≥360px they sit side by side and these will crowd. Prefer the primary pair.

### 3.4 ⚠⚠ The `rättvis` collision — **REFUSE `rättvis`. Not a helpful echo: an interference risk.**

The measured collision is real (`choice-board.fraction-equal-shares.1-g-a-3` and
`fractions.partition-equal-shares.1-g-a-3` both use *rättvist* for equal-sized parts), but the
collision is the **second** reason to refuse it. The first is that it is simply the wrong word:

**(1) `rättvis` is a moral/social word in Swedish.** It is what children hear about turn-taking,
sharing sweets and referee decisions. Applied to `8 = 5 + 3` it makes a *moral* claim about an
arithmetic statement — a category error. The Dutch ensemble reached this independently
(*«Eerlijk» = moreel-eerlijk, drift*), which is corroboration from a second native panel.

**(2) The fraction cards use it correctly, which is precisely why reuse here is harmful.**
Partitioning one whole into equal parts *is* genuine fairness — that is the real-world grounding
of equal partitioning, and *rättvist* is the right word there. Reusing it here does not build a
bridge; it builds a **false** one. The two meanings are different schemas:

- fractions: *rättvist* = **one whole**, split into **equal parts** (part–whole)
- equations: the claim = **two separate expressions** with the **same value** (relational)

A child who transfers *rättvis* from the fraction cards imports a part–whole schema into a
relational-equality task. That is a concrete misconception risk, not a stylistic worry.

**Alternative — use these instead of `rättvis` everywhere in this activity:**

| English | Swedish | note |
|---|---|---|
| Is it fair, Judge? | **Är det lika mycket på båda sidor?** | states the mathematics |
| It's fair! | **Lika mycket!** | |
| Fair! Both sides are the same amount. | **Ja! Det är lika mycket på båda sidor.** | |
| Make it fair — tap a tile for the slot. | **Få det att väga jämnt — tryck på en bricka till den tomma rutan.** | *bricka* = tile, established |
| Now it balances — fair, Judge! | **Nu väger det jämnt!** | |
| Tap the heavier side. | **Tryck på den tyngre vågskålen.** | ⚠ **comparative** *tyngre*, not superlative *tyngsta* — there are exactly two pans |

---

## 4. AUDIT OF THE ENGLISH SOURCE

Seven defects, four of them in the shared engine and therefore inherited by **all seven shipped
locales**. Two are severe.

### 4.A ⚠⚠ **SEVERE — the `subtraction`-TRUE round is UNWINNABLE. Every deck contains exactly one.**

`numbers-court-activity.js:245`

```js
_deposit: function (side, i, val) {
  this.deposited[side + i] = true;
  this.fill[side] += Math.abs(val);          // ← ignores the operator
```

`Math.abs()` is a no-op (`{op:'-', t:2}` already stores `t` positive) — the bug is that the
**minus is never applied**. Trace `buildPool()` entry 8, `['subtraction', true]`, e.g. `7 = 9 − 2`:

- `sums()` → `{left: 7, right: 9 − 2 = 7}`
- child taps `7` → `fill.left = 7` ✓
- child taps `9` → `fill.right = 9`
- child taps `2` → `fill.right = **11**`
- win test `fill.right === s.right` → `11 === 7` → **never true**

Both right-hand tokens are now `nc-num-used` with their listeners gone, `_win()` never fires,
`stage` stays `'justify'`, and `isCorrect()` (`stage === 'done'`) returns false forever — so the
shell's **Check button can never succeed either**. The child is in a hard dead end with no
affordance left on screen.

`buildPool()` hard-codes `['subtraction', true]` at index 7, so **this is guaranteed once in
every deck, in every locale, at every mount.** All the other TRUE forms (commutative, reversed,
both-sides, equal-id) are addition-only and work.

**Fix:** deposit signed, using the same walk `evalSide` uses — the operator is on the token
(`tokens[i].op`), so `_deposit` must subtract when `op === '-'` (and the pan must render a
*removal*, not a negative dot count).

### 4.B ⚠⚠ **SEVERE — the promised re-teach never happens; "This much AND this much" points at nothing.**

The docblock (line 13) promises *"2nd wrong → both-pans re-teach"*. The code does not do it:

```js
if (!correct) {
  this.wrong++; … this.tilt = 0;   // fill is NEVER touched — still {left:0, right:0}
  this.render(); return;
}
```

Only the **caption** appears (`reteach` via `hint0.textContent`). So after a Swedish child gets
it wrong twice, they read *"Så här mycket och så här mycket — är det lika mycket på båda
sidor?"* above **two empty pans**. The deictic *"så här mycket"* has no referent. It is worse in
Swedish than English because *så här mycket* is strongly pointing — it demands something to
point at.

**Fix:** on the second wrong verdict, set `this.fill = this.sums()` before `render()`. That is
the re-teach the docblock already specifies, and it leaks nothing the child has not already
guessed at twice.

### 4.C ⚠⚠ **The balance never behaves like a balance until after the child is already right.**

This is the deepest pedagogical defect, and it undercuts the activity's own stated premise
(*"the '=' is a SEE-SAW FULCRUM"*).

- **VERDICT stage** — pans empty (`fill = {0,0}`), beam level. **Defensible**: filling them
  would hand over the answer, and the docblock's "the truth-motion is the REWARD, never the
  hint" is the right call here. Keep.
- **FALSE-justify** — the child is told *"tap the heavier side"* while **both pans are still
  empty** (`_tapPan` only sets `fill` and `tilt` *after* a correct tap). So "which is heavier"
  is answered from the numerals alone; the apparatus contributes nothing at the moment of the
  decision and then animates as a reward. **Not defensible** — the verdict is already settled,
  so there is nothing left to leak.
- **TRUE-justify** — dots accumulate as the child taps, but `tilt` is never recomputed; it stays
  `0` from `setupTask` until the win. So the child watches a **level beam holding 8 dots against
  0 dots**. For a child building relational equality out of a physical metaphor, that is a
  direct contradiction of the idea being taught. **Not defensible.**

**Fix (both cases, and the docblock's own reasoning supports it):**
1. FALSE-justify — fill **both** pans on entry, *then* ask which is heavier. The cognitive work
   was the verdict; this step should let the child *read the apparatus*, which is the whole
   point of having one.
2. TRUE-justify — recompute `tilt` from `fill.left − fill.right` on every deposit and settle to
   `0` only when they match. The levelling then genuinely *is* the reward.

### 4.D **The only `canonical` round in the deck is always FALSE — that teaches an inverted shape heuristic.**

`buildPool()` line 105: `['canonical', false]`. `canonical` is `a + b = c`, the familiar form.
It appears once in twelve, and it is **hard-coded FALSE**.

The child therefore never meets a **true** `4 + 3 = 7` inside this game. The available lesson is
*"when it looks like a sum with the answer after it, say 'inte lika mycket'"* — a **shape**
heuristic, i.e. the same class of misconception 1.OA.D.7 exists to break, merely inverted. A
Swedish åk-1 child must also learn that the ordinary form is *likewise* just a statement of
sameness — otherwise the card quietly teaches that the everyday notation is suspect.

**Fix:** randomise that entry's truth per mount (`['canonical', rng() < 0.5]`). This keeps
canonical at 1/12 (inside the ≤15% cap the core docblock claims) and removes the tell.
Do **not** simply flip it to `true` — `want === undefined` in `generateRound` also yields TRUE,
so an under-specified entry produces the opposite always-tell.

### 4.E **`speak()` has no `sv` branch — Swedish will be read aloud by an American voice.**

`numbers-court-activity.js:40` hard-codes the fallback:

```js
u.lang = LANG === 'de' ? 'de-DE' : … : 'en-US';
```

There is no `sv`, and none for `da` / `no` / `fi` either. `LCSAudio.speak` is tried first, but
this path is the fallback, and Swedish text spoken by `en-US` is not merely accented — the
digits and *"lika mycket"* will be unintelligible to a 7-year-old. This is where the pedagogy
lands, because `speak()` fires on **every** wrong verdict (`sure` / `reteach`), every win, and
every `regen`. One-line fix; affects four locales.

### 4.F **Round-generation quality — `both-sides` emits degenerate items.**

`judge-balance-core.js:70-75`:

```js
c = ri(rng, 1, Math.min(max - 1, s - 0)); d = s - c; if (d < 0) d = 0;
```

- `c` may equal `s`, giving **`d = 0`** → items like `2 + 5 = 7 + 0`. Not wrong, but a wasted
  item and a distraction: åk 1 has only just met 0 as an addend.
- `c` may equal `a`, giving **`d = b`** → items like `3 + 4 = 3 + 4`. Trivially true by pattern
  match with no arithmetic at all, and it duplicates what the commutative rounds already do
  better.

**Fix:** reject `c === s` and `c === a` (redraw). One extra condition each.

### 4.G **Minor, but each is real**

- **The minus glyph is an ASCII hyphen.** `{op:'-'}` is rendered straight into the DOM
  (`op.textContent = tok.op`) at `clamp(18px,5vw,28px)` weight 800. Swedish (and every) primary
  material uses **U+2212 −**; the hyphen is visibly short and sits low next to Baloo 2 numerals.
  Change the *display* only — `evalSide` keys on `k.op === '-'`, so the data must stay ASCII.
- **The witness is an unlabelled emoji.** `wit.textContent = WITNESS[...]` (🐰 / 🐦‍⬛ / 🐭 / 🦫)
  in a bare `div`. A Swedish screen reader will announce the English CLDR name or nothing.
- **Band ordering makes the opening TRUE-heavy.** `bandFor` puts commutative / canonical /
  equal-id in band 1, and `bandOrder` concatenates bands ascending, so the first four rounds are
  always the two commutative-TRUE + canonical-FALSE + equal-id-TRUE. **Three of the first four
  are TRUE**, so "always say lika mycket" survives the entire warm-up. Consider promoting one
  `reversed`-FALSE into band 1.
- **Keep `max = 10`.** It is correct for åk 1 talområde, *and* the pan layout depends on it:
  `.nc-pan-dots` is `clamp(58px,18vw,88px)` with `clamp(7px,2vw,10px)` dots ≈ 6–7 per row, so
  10 dots is two tidy rows. Raising to 20 for åk 2 would need the dot rendering reworked (and
  would change my grade ruling).
- **Layout cross-check for the visual panel (not my call):** `.nc-pan-l{left:-34px}` against
  `.nc-bar{left:6%}` inside `.nc-beam{width:min(94%,360px)}` puts the left pan outside the beam
  box; the `@media (max-width:360px)` rule pulls it to `-22px`. Worth a measured check at 320px.

---

## 5. ⚠⚠ THE FRAME — the court survives in Swedish; **"Catch it!" does not**

I was asked whether judging/catching reads as punitive to a Swedish 7-year-old. The two halves
of the frame get opposite answers.

### 5.1 The court / judge frame: **KEEP** — and Swedish makes it *better* than English

**`domare` is the same word for a courtroom judge and a sports referee**, and for a Swedish
7-year-old the overwhelmingly dominant reading is **fotbollsdomare**. That is a gift, not a
problem:

- a referee rules on whether something is **fair / correct**, which is exactly the act here;
- a referee carries none of the criminal-justice freight — nobody is accused of anything;
- a referee's verdict is about **the play**, not about a person, which is precisely the
  distinction Swedish lågstadiet pedagogy insists on.

So *"domare"* lands soft in Swedish where "Judge" lands hard in English. Keep it. Address the
child as **domare** (or simply drop the vocative — Swedish uses vocatives far less than English;
*"Är det lika mycket på båda sidor?"* needs no address at all).

The tortoise is fine: **en sköldpadda** (common gender). For the name, `judgeName` →
**"domaren Tess"** in `page_title` / `page_intro` where the role must be introduced, and plain
**"Tess"** in play strings — Swedish is uncomfortable with occupational titles stacked before
names in running child copy. ⚠ Check "Tess" against the shipped Swedish character roster before
locking it (nl had to rename to Roos over a collision with #9 "Ties"); I cannot see the sv roster
from here.

### 5.2 **`vFalse: "Catch it!"` — REFUSE. And the file already contains the evidence.**

*Catch it* is a **catching-a-liar** verb. The witnesses are a rabbit, a crow, a mouse and a
beaver, so the frame casts a small animal as a liar the child exposes; `winFalse: "Caught it!"`
doubles down. In Swedish the natural calques — *"Ta fast den!"*, *"Avslöja!"*, *"Fast!"* — are
**markedly** more accusatory than the English, and they make being wrong a moral offence with a
culprit. That is straightforwardly out of register for Swedish lågstadiet and, by my reading,
out of policy for a product that forbids shaming.

**And it is not just my judgement — it is measurable in the shipped strings.** Of the seven
locales, **five independently refused the catching verb** and quietly substituted a relational
one:

| locale | `vFalse` | catching? |
|---|---|---|
| en | "Catch it!" | ✔ |
| es | "¡Atrápalo!" | ✔ |
| de | "Stimmt nicht!" | ✘ |
| fr | "Faux" | ✘ |
| pt | "Não é justo!" | ✘ |
| it | "Non è giusto!" | ✘ |
| nl | "Klopt niet!" | ✘ |

Five native panels reached the same verdict without coordination, each patched it **locally**,
and **nobody fixed the source** — so the English still carries it, `winFalse` still says "Caught
it!", and the next locale inherits it again. This is the recorded *the-English-source-is-the-one-
nobody-reviews* pattern, and here it is visible in a single file.

**Also refuse the two supporting strings:**

- **`sure: "Are you sure, Judge? Look again."`** The direct calque *"Är du säker, domare?"* is
  noticeably more confrontational in Swedish than in English — it reads as an adult doubting the
  child rather than inviting a second look. And it fires **twice**: after a wrong verdict *and*
  after tapping the wrong pan. Replace with an invitation to look at the apparatus:
  **"Titta en gång till på båda sidorna."**
- **`regen` + the wrong-tile shake.** In `_placeTile`, a wrong tile plays a 320 Hz tone, adds
  `nc-bonk` (a horizontal shake — the mildest possible "no"), speaks *"Still not level — here is
  a fresh one, Judge"*, and **removes the round** after 700 ms. Note the inconsistency with the
  product's own scaffolding policy: the VERDICT stage grants a second chance *and* a re-teach;
  the REPAIR stage grants **neither**. The child loses the object of their thinking at the exact
  moment they were reasoning about it, and hears a line that reads as *"you failed, moving on"*.
  **Recommend:** on a wrong tile, first fill both pans and show the gap (the 4.B/4.C re-teach),
  let the child try a second tile, and regenerate only after that. Keep `nc-bonk` only if the
  second-chance path lands first.

### 5.3 The replacement frame, if the team wants one word changed rather than a rebuild

Nothing needs replacing structurally — **keep the court/referee**. Swap the *verb*: the child is
not catching a liar, they are **checking whether the scales balance**. Concretely:

| key | current EN | Swedish ruling |
|---|---|---|
| `title` | Numbers Court | **Talens domstol** *(or* **Vågen och likhetstecknet** *if the court is dropped)* |
| `prompt` | Is it fair, Judge? | **Är det lika mycket på båda sidor?** |
| `vTrue` | It's fair! | **Lika mycket!** |
| `vFalse` | Catch it! | **Inte lika mycket!** |
| `winTrue` | Fair! Both sides are the same amount. | **Ja! Det är lika mycket på båda sidor.** |
| `winFalse` | Caught it! The sides are not the same. | **Just det — sidorna är inte lika mycket.** |
| `winRepair` | Now it balances — fair, Judge! | **Nu väger det jämnt!** |
| `sure` | Are you sure, Judge? Look again. | **Titta en gång till på båda sidorna.** |
| `reteach` | This much AND this much — are they the same amount? | **Så här mycket och så här mycket — är det lika mycket?** ⚠ only after 4.B is fixed |
| `jFalse` | Tap the heavier side. | **Tryck på den tyngre vågskålen.** |
| `jTrue` | Tap each number to fill both pans. | **Tryck på varje tal för att fylla båda vågskålarna.** |
| `repair` | Make it fair — tap a tile for the slot. | **Få det att väga jämnt — tryck på en bricka till den tomma rutan.** |
| `regen` | Still not level — here is a fresh one, Judge. | **Det väger fortfarande inte jämnt. Här kommer en ny.** |
| `hintCheck` | Give your verdict, then tap Check. | **Bestäm dig och tryck sedan på Kontrollera.** ⚠ must match the shipped shell label |
| `judgeName` | Judge Tess | **domaren Tess** (intro) / **Tess** (play) |

⚠ **`hintCheck` names a shell button.** Verify the shipped Swedish `lcs-shell` label before
writing *"Kontrollera"* — if the shell says *"Kolla"* or *"Svara"*, this string must match it
exactly or the child is told to press a button that does not exist under that name.

---

## 6. THE GENERATOR — what it *really* emits (the brief's second worry)

**Answer: the worry is unfounded. The generator is sound, and this is the one place the English
source is right.** `buildPool()` (`judge-balance-core.js:97`) is a fixed 12-round plan:

| # | form | truth | shape | example |
|---|---|---|---|---|
| 1 | commutative | TRUE | `a+b = b+a` | `4 + 3 = 3 + 4` |
| 2 | commutative | TRUE | `a+b = b+a` | |
| 3 | reversed | TRUE | `c = a+b` | **`8 = 5 + 3`** |
| 4 | reversed | FALSE | `c = a+b` | |
| 5 | reversed | FALSE | | |
| 6 | both-sides | TRUE | `a+b = c+d` | `3 + 4 = 2 + 5` |
| 7 | both-sides | FALSE | | |
| 8 | subtraction | TRUE | `c = a−b` | `7 = 9 − 2` ⚠ **unwinnable, §4.A** |
| 9 | subtraction | FALSE | | |
| 10 | subtraction | FALSE | | |
| 11 | **canonical** | **FALSE** | `a+b = c` | ⚠ **always false, §4.D** |
| 12 | equal-id | TRUE | `a = a` | `7 = 7` |

- **Both target shapes are present and guaranteed:** `8 = 5 + 3` (reversed, #3) and
  `4 + 3 = 3 + 4` (commutative, #1–2). Exactly what 1.OA.D.7 and Lgr22's *likhetstecknets
  betydelse* require.
- **The `a + b = c` misconception shape is 1 of 12 (8.3%)**, not the whole deck — well inside the
  core's own ≤15% cap.
- **GOLD (non-canonical) = 10 of 12 (83%)**, so an operational reader ("compute the left, expect
  the answer on the right") fails most of the deck. The core even ships the dumb-solver gauntlet
  that proves it (`VERDICT.computeLeftOnly`, `pickCanonicalOrder`, `firstTermMatch`).
- **Truth balance is exactly 6/6.**

Two calibration notes rather than defects:

- **Every FALSE round is off by exactly ±1 or ±2** (`off(rng)`, line 53). This is a *deliberate*
  and correct anti-eyeball choice at the VERDICT stage — a large gap would let the child answer
  from the picture without computing. But it makes the **FALSE-justify** step ("tap the heavier
  side") a one-or-two-dot discrimination across two separated, flex-wrapped pans, which is a
  subitising task, not an equal-sign task — and getting it wrong increments `wrong` and fires
  `sure` again. Fixing §4.C (fill both pans *before* asking) largely resolves this; if not,
  allow a larger offset on band-1 rounds only.
- The always-TRUE commutative rounds are *not* a leak — "same two numbers, swapped ⇒ lika mycket"
  **is** the mathematics of the kommutativa lagen, which is åk 1 content.

---

## 7. SUMMARY OF RULINGS

1. **Grade — åk 1** (late åk 1 / vårterminen). Not åk 2, not åk 3. Numbers are 0–10 and the
   kommutativa lagen is åk 1 content. **It may and should share åk 1 with `plus-och-minus-par`**:
   that card is *produce an equal value* (matching), this one is *evaluate a stated equality*
   (judging + repairing) — two distinct acts under one Lgr22 bullet.
2. **Strand — Algebra, CONFIRMED on the merits**, not merely for catalogue consistency. Lgr22 åk
   1–3 Algebra says verbatim *"Matematiska likheter och likhetstecknets betydelse"* — that bullet
   *is* this activity. Unlike the three previous sv cards, consistency and curriculum agree here.
3. **Terminology — `likhetstecknet`, `matematiska likheter`, `lika mycket på båda sidor`,
   `väger jämnt` (⚠ *jämnt*, not *jämt*), `vågskål(arna)`, `balansvågen`.**
   `våg` is safe (the homograph diverges only in the plural, and the context is total) but the
   play strings are better off using the verb. **`rättvis` is REFUSED** — it is a moral word, and
   reusing it from the fraction cards imports a part–whole schema into a relational task.
   **`Sant/Falskt` and `Rätt/Fel` are both refused** (register; and *rätt/fel* judges the child,
   not the claim). Verdicts: **"Lika mycket!" / "Inte lika mycket!"**.
4. **Frame — keep the court, kill the catching.** Swedish *domare* reads as referee, which is
   softer and more apt than English "Judge". But **`vFalse: "Catch it!"` must go** — and five of
   the seven shipped locales already refused it independently while nobody fixed the source.
   `sure` and the wrong-tile regenerate also need softening.
5. **Generator — sound.** It really does emit `8 = 5 + 3` and `4 + 3 = 3 + 4`; canonical is 1/12.
6. **Four engine defects inherited by all seven locales**, two severe:
   **(A)** the `subtraction`-TRUE round is **unwinnable** — `_deposit` ignores the minus, so one
   guaranteed round per deck is a hard dead end with Check permanently false;
   **(B)** the promised two-wrong **re-teach never fills the pans**, so *"This much AND this
   much"* points at nothing;
   **(C)** the **beam never tilts and the pans stay empty** while the child reasons — the
   apparatus only performs *after* the child is already right;
   **(D)** the sole canonical round is **always FALSE**, teaching an inverted shape heuristic.
   Plus: no `sv` in `speak()`; ASCII hyphen instead of U+2212; `both-sides` can emit `+ 0` and
   `3 + 4 = 3 + 4`; unlabelled witness emoji; the opening four rounds are 3-of-4 TRUE.
