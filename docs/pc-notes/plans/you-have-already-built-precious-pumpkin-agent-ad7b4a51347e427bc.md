# Hopper's Number Line → Swedish (Lgr22) — pedagogue's rulings

Activity `hoppers-number-line.jump-sums.2-md-b-6`. Advisory report, no edits made.
Everything below was measured against the artefact on 2026-09-08, not recalled.

---

## What the deck actually contains (measured, all 9 rounds)

| # | id | max | step | start | dir | size | landing | decoys | bridges a ten? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | fwd-6-8 | 20 | 2 | 6 | fwd | 8 | 14 | 4, 10 | **yes** (6→14) |
| 2 | fwd-9-12 | 30 | 3 | 9 | fwd | 12 | 21 | 6, 15 | **yes** (9→21, two tens) |
| 3 | back-16-6 | 20 | 2 | 16 | back | 6 | 10 | 4, 8 | lands *on* ten |
| 4 | back-24-9 | 30 | 3 | 24 | back | 9 | 15 | 6, 12 | **yes** (24→15) |
| 5 | fwd-15-20 | 50 | 5 | 15 | fwd | 20 | 35 | 10, 25 | no (whole ten added) |
| 6 | back-45-20 | 50 | 5 | 45 | back | 20 | 25 | 10, 30 | no |
| 7 | fwd-30-40 | 100 | 10 | 30 | fwd | 40 | 70 | 20, 50 | no (pure tens) |
| 8 | back-80-50 | 100 | 10 | 80 | back | 50 | 30 | 20, 40 | no (pure tens) |
| 9 | fwd-40-30 | 100 | 10 | 40 | fwd | 30 | 70 | 10, 50 | no (pure tens) |

All 9 stories match their round data exactly (start, direction, size). No story/data
mismatch — that class of defect is clean here.

**But the difficulty curve is inverted.** The only genuine ten-crossing arithmetic is in
band 1 (rounds 1–4, talområde 0–30). Bands 2 and 3 are entirely whole tens and fives —
30 + 40, 80 − 50, 40 + 30. There is no item like 47 + 25 anywhere. **The hardest
arithmetic in this "within 100" deck is its 0–20 material.** This is load-bearing for
both the grade ruling and the fence.

---

## DECISION 1 — STRAND

### Ruling: `sv: 'Taluppfattning och tals användning'` — bare, no parenthetical.

The auto-map `Mätning och data` is wrong twice over, and I would call it a worse error
than a calque. Lgr22 matematik åk 1–3 has six centralt-innehåll rubrics —
**Taluppfattning och tals användning · Algebra · Geometri · Sannolikhet och statistik ·
Samband och förändring · Problemlösning**. "Mätning och data" is not one of them, and it
is not even a compression of one: in Lgr22 **mätning sits inside Geometri** ("Mätning av
längd, massa, volym och tid…" — the same bullet this repo already cites in the
`mosaic-menders` sv ruling) while **data sits inside Sannolikhet och statistik**. The
auto-map fuses two unrelated Lgr22 rubrics into a rubric that does not exist.

For this activity neither half applies: nothing is measured, no data is handled. A frog
jumps from one whole number to another. The mathematics is addition and subtraction of
natural numbers within 100; the number line is only the model. Lgr22, Taluppfattning och
tals användning, åk 1–3, carries exactly this:

- *"Naturliga tal och deras egenskaper samt hur talen kan delas upp och hur de kan
  användas för att ange antal och **ordning**."* — the number line's own job.
- *"Metoder för beräkningar med naturliga tal…"* — addition and subtraction.

Two independent confirmations that this is the right string, not merely a right idea:

1. **All six sibling locales already made this exact ruling** — de `Zahlen und Rechnen im
   Zehnersystem`, fr `Nombres et calcul`, es `Sentido numérico`, pt `Números`, it
   `Numeri`, nl `Getallen`. Every one of them moved it off the measurement calque onto a
   number domain, on the same reasoning: *the line is the model, the work is arithmetic.*
   Sweden is the seventh vote, not a new argument.
2. **The string is already the platform's Swedish maths strand.** `strand-names.ts` ships
   `sv: 'Taluppfattning och tals användning'` at three CCSS number strands, and it occurs
   20× across the Swedish landing corpus. `Mätning och data` occurs exactly **once** — in
   the calque itself. Using the established string adds no new variant.

**Rejected alternatives, so they are not re-litigated:**

- **Algebra** — no. Lgr22 Algebra åk 1–3 is likhetstecknet and *"hur enkla mönster i
  talföljder … kan konstrueras, beskrivas och uttryckas"*. One jump is not a talföljd.

  ⚠ **I withdraw an argument I made before checking.** I had wanted to say that the
  strand separates this page from the skip-count sibling — that page being talföljder and
  therefore Algebra. As **shipped**, it does not: `skipcount.fill.2-nbt-a-2` carries
  strand `Number & Operations in Base Ten`, which auto-maps to sv **`Taluppfattning och
  tals användning`** — the same string I am recommending here. **The strand will not
  separate these two Swedish pages.** The separation has to be carried by the slug, the
  title and the content, which Decision 3 now does. (Whether `skipcount` should itself sit
  under Algebra in Swedish is a real question — *mönster i talföljder* is an Algebra
  bullet in Lgr22 — but it is that activity's ruling, not this one's. **Flagged, not
  acted on.**)
- **Samband och förändring** — no. That rubric in åk 1–3 is proportionella samband
  (dubbelt/hälften). Not this.
- **A parenthetical** (e.g. `Taluppfattning och tals användning (tallinjen)`) — no. The
  existing sv parentheticals (`Geometri (mätning av längd)`) exist because bare "Geometri"
  would mislead a teacher hunting for shapes. Here the bare rubric is exactly right, and
  keeping it bare means it matches `strand-names.ts` byte-for-byte.

**Confidence: high on the ruling.** One honest caveat: I am confident the *gällande*
matematik rubric is spelled `Taluppfattning och tals användning`, but Lgr22 renamed
rubrics in several subjects and I did not open Skolverket to re-verify the exact matematik
heading. Since the repo has already locked this exact string 20× in Swedish-facing prose,
**consistency and correctness point the same way even if the heading were later found to
be shortened** — in which case it is a one-line catalogue-wide change, not a per-activity
one, and should not be made here.

---

## DECISION 2 — GRADE

### Ruling: **åk 2. Confirm the manifest. Add NO sv row to `GRADE_OVERRIDE`.**

As the brief says, Lgr22 states centralt innehåll once for the whole åk 1–3 band, so it
cannot place a year; the progression does. Swedish textbook practice (Favorit matematik,
Prima, Singma, Eldorado, Matte Direkt Safari) is consistent:

- **åk 1** — talområdet 0–20; the tallinje is *unit-ticked* 0–20; tiotalsövergång inom 20
  arrives late in the year.
- **åk 2** — talområdet utvidgas till 0–100; positionssystemet tiotal/ental; **hela tiotal
  (30 + 40, 80 − 50) is early åk 2**, then tiotalsövergång inom 100; the tallinje acquires
  a **skala** (steg 2, 5, 10) rather than unit ticks.
- **åk 3** — talområdet 0–1000.

This deck's ceiling — a 0–100 line ticked every 10, adding and subtracting whole tens —
is squarely åk 2, and its scale-reading demand (four different skalor: 2, 3, 5, 10) is an
åk-2 competence that åk 1 does not carry. åk 2 also keeps Sweden aligned with de Klasse 2
/ nl groep 4 / it classe seconda.

### ⚠ A pattern in the repo that I am deliberately refusing

All three existing Swedish grade overrides sit **one year above** the manifest:
`comparison-creek` K→åk 1, `place-value-regroup` 1→åk 2, `mosaic-menders` 3→åk 4. Read
mechanically that is a "+1 Nordic shift", and it would push this deck to **åk 3**.

**It is not a shift rule and it must not be applied as one.** Each of those three is a
content ruling that happens to land one above — the `mosaic-menders` comment says so
explicitly, justifying åk 4 from the kursplan (area is absent from åk 1–3 Geometri and
present in åk 4–6), not from an offset. Applied here, a mechanical +1 would put a
talområde-0–100 deck into åk 3, where the Swedish talområde is 0–1000 and where 30 + 40
reads as revision. The grade chip is a **placement signal**: an åk-3 teacher who opened
this expecting tallinje work toward 1000 would be misled.

**Confidence: high**, with one qualification I want on record. Because bands 2–3 contain
no tiotalsövergång at all, the *arithmetic* alone would sit comfortably at the start of
åk 2, not across it. The åk-2 claim is carried by the **scale-reading and the modelling**,
not by the calculation. That is fine — but it dictates what the Swedish copy may promise
(see Decision 3), and it is the reason I would not defend åk 3 for a moment.

---

## DECISION 3 — THE FENCE

### First: the fence is tighter than the brief describes, in a way that changes the answer

The measured Swedish surfaces (verbatim):

| id | sv slug | sv title | code / grade |
|---|---|---|---|
| `ten-stones.add-sub-within-20.1-oa-c-6` | `rakna-over-tian-pa-tallinjen-ak-1` | Räkna över tian på tallinjen – **addition och subtraktion** (åk 1) | 1.OA.C.6, åk 1 |
| `skipcount.fill.2-nbt-a-2` | `hopprakning-5-10-och-100-ak-2` | Hoppräkning 5, 10 och 100 – talföljder för åk 2 | 2.NBT.A.2, åk 2 |
| `line-plot.read.2-md-d-9` | `kryss-pa-tallinjen-vanligaste-langden-ak-2` | Snäckis strandlinje – längder som kryss på tallinjen (åk 2) | 2.MD.D.9, åk 2 |
| `numberbond.make-ten-to-add.1-oa-c-6` | `gor-en-tia-nar-du-adderar` | Gör en tia när du adderar (åk 1) | 1.OA.C.6, åk 1 |
| tool `number-line` | `tallinje` | Tallinje — *tagline:* "Hoppa längs för att addera och subtrahera" | — |
| tool `open-number-line` | `tom-tallinje` | Tom tallinje — "Rita dina egna hopp på en linje utan streck" | — |

**Two collisions the brief did not name, and both matter more than the `tallinje` token:**

1. ⚠⚠ **The åk-1 page already owns the exact phrase "addition och subtraktion … på
   tallinjen".** Its title is *Räkna över tian på tallinjen – addition och subtraktion
   (åk 1)*. So the slug shape all six siblings use (operation + range + line + grade)
   would share **both** head terms with it, differing only by "till 100" and "åk 2". That
   is thinner separation than the sibling-consistency argument implies.
2. ⚠⚠ **Swedish already has a named frog hopping on the tallinje, and a lily-pad page.**
   `ten-stones` sv intro: *"**Grodan Lily** hoppar längs tallinjen 0–20: först fram till
   guldstenen vid tian, sedan resten av vägen."* `skipcount` sv intro: *"Barnet läser
   talföljden på **näckrosbladen**."* Adding Hopper the frog, hopping between näckrosor on
   a tallinje, makes **three Swedish pages sharing one set of furniture**. The setting
   therefore cannot carry any of the separation. All of it must come from the mathematics.

⚠ **`tom tallinje` is unusable.** Swedish didactics calls this method exactly that (the
empty number line, RME) and it would have been the natural teacher-facing term — but it is
the `open-number-line` tool's slug. Do not reach for it.

### The differentiation — and it is cleaner than the one I first drafted

The two shipped Swedish intros hand it over. `ten-stones` says the child goes *"först fram
till guldstenen vid tian, **sedan** resten av vägen"* — **två hopp**, via the ten. This
activity is **ett hopp**: the child picks one length and crosses the whole distance in a
single move.

> **åk 1 = två hopp (via tian). åk 2 = ett hopp (hela summan på en gång).
> Skip-count = många lika hopp utan start och landning.**

That is a real Swedish progression — from räknestrategi to treating the amount as one
quantity — it is citable from the pages' own shipped copy, and it is what a lågstadielärare
would recognise instantly.

⭐ **It also dissolves the band-1 overlap I was about to file as a problem.** Rounds 1–4
(6 + 8, 9 + 12, 24 − 9) *are* the åk-1 page's arithmetic. But under the ett-hopp framing
they are not a repeat of it — they are **the same sums done by the new method**: 6 + 8 as
one jump of 8, not 6 → 10 → 14. That is precisely the pedagogical advance, and it is the
right place to meet it, on arithmetic the child already owns. Band 1 is a feature.

**Three further axes of separation, all real:**

1. **Talområde** — 0–20 (åk 1) vs 0–100 (here). The weakest of the three; see the honest
   overlap below.
2. **Skala.** The åk-1 page's tallinje is a *counting* line, ticked every 1. This page's
   lines are **skalade** — steg 2, 3, 5 and 10 — so the child must read a scale where most
   numbers are not drawn. In Swedish practice that is exactly the åk-1 → åk-2 step. This
   is a genuinely different competence and it is invisible in the åk-1 page.
3. **The verb — and this is the real one.** The åk-1 page *computes with a strategy*
   (räkna över tian: 10-kompisar, dela upp talet). This page **modellerar**: the child
   translates a spoken sum into a representation — start, riktning, längd — and only then
   computes. The core enforces it. `gradeAttempt` demands start **and** direction **and**
   size **and** the landing; a child who knows 30 + 40 = 70 but sets the wrong start
   **fails**. Knowing the answer is not sufficient. Nothing on the åk-1 page works that
   way.

**The keyword discipline that follows, and it is non-negotiable:**

> **The Swedish title, intro and prose must never contain "räkna över tian" or
> "tiotalsövergång".** Those are the åk-1 page's head terms, and band 1 gives the phrase
> just enough surface truth to be tempting. Under the ett-hopp framing they are also
> *wrong*: this page deliberately does **not** teach the bridging strategy.

> **And the sv intro must not open the way the åk-1 intro opens.** *"Grodan Lily hoppar
> längs tallinjen 0–20…"* is taken. An intro beginning *"Grodan Hopper hoppar längs
> tallinjen…"* would be a near-duplicate of a live sibling. Open on the mathematics — the
> single jump and the 0–100 scale — and let the frog arrive in the second sentence.

Equally: because bands 2–3 carry no ten-crossing, the Swedish copy **must not promise**
"addition och subtraktion med tiotalsövergång inom 100". The page does not do it. Promise
what it does: *visa en addition eller subtraktion som **ett enda hopp** på en tallinje med
skala, i talområdet 0–100.*

### What this page can honestly own

`tallinje` is owned four times over and `hopp-` once, so **token-avoidance is the wrong
instrument — head-term separation is the right one.** The four existing owners lead on
four different heads: the two tools lead on the bare instrument (`tallinje` / `tom-tallinje`),
the åk-1 page leads on `räkna över tian`, Snäckis leads on lengths as crosses. None leads
on the operation-plus-range.

So this page should lead on **"Addition och subtraktion till 100"** and carry "på tallinjen"
as the qualifier — which is also the exact shape all six siblings already use (de
`addieren-und-subtrahieren-am-zahlenstrahl-bis-100-klasse-2`, nl
`optellen-en-aftrekken-op-de-getallenlijn-tot-100-groep-4`, and so on).

**Recommended slug:** `addition-och-subtraktion-till-100-pa-tallinjen-ak-2`
**Recommended title:** `Addition och subtraktion till 100 – ett hopp på tallinjen (åk 2)`

The **slug** keeps the sibling shape (operation + range + line + grade), because that is
also how Swedish teachers search — by talområde, *"inom 20"* vs *"till 100"*. "tallinjen"
in the slug is not a collision when the head is the operation; the four existing owners
lead on four different heads (bare instrument ×2, *räkna över tian*, *kryss/längder*).

The **title** carries the differentiator the slug cannot: **"ett hopp på tallinjen"**,
read directly against the åk-1 page's two-step *"först … sedan"*. This is where the
åk-1/åk-2 separation actually lives, and it is worth the extra clause.

I keep `hopp` out of the **slug** (owned by `hopprakning-…`) while allowing **"ett hopp"**
in the title — *Hoppräkning* and *ett hopp* are different words carrying a meaningful
contrast (many equal hops vs one), so this sharpens rather than blurs. **Veto:** any slug
led by `tallinje`, and any slug on the `hopp-` root.

**On the mascot — keep "Hopper", and here is why the pt precedent does not apply.** pt
rebuilt Hopper as *Saltão* because "Hopper" is opaque to a Brazilian child; in Swedish it
is the opposite — *hoppa* is the ordinary verb, so Hopper is transparent and charming. The
Swedish collision risk is not the name Hopper, it is **Grodan Lily** one grade below, and
renaming Hopper would not touch that. Distinguish the mathematics, keep the name.

⚠ Two native notes on the name: (a) **"Hopper" looks like a misspelt "hoppar"** to a
7–8-year-old — one vowel apart from the 3rd-person present. It survives because it is
capitalised and always in subject position, but *"Hopper hoppar"* should be kept as the
verb pairing so the contrast is visible rather than blurred. (b) It is the *third* Swedish
frog/lily-pad number-line surface; if the operator ever wants only two, the one to merge is
`skipcount` with the `number-line` tool, not this — but that is a catalogue decision, not
mine, and **flagged, not acted on**.

### Swedish wording I would fix before it ships

- **`back` must be `Bakåt`, never `Tillbaka`.** The Dutch note in the source already flags
  this defect class ("NIET *Terug* = terugkeren-naar-start, dubbelzinnig") — *Tillbaka*
  carries the identical ambiguity in Swedish: it reads as *return to where you started*,
  not *in the negative direction*. `Framåt` / `Bakåt` is the pair Swedish textbooks use on
  the tallinje. ⚠ The German shipped `Zurück`, which is the very ambiguity the Dutch
  reviewer caught — nobody propagated the fix. Do not repeat it in Swedish.
- **hop = `hopp` / `hoppa`**, the landing = **`landar`**, the lily pad = **`näckros`**
  (näckrosblad for the pad itself), the number line = **`tallinjen`**, start = **`starta
  på`** / **`börja på`**. ⚠ `näckros` is common gender (*en näckros, näckrosen*) — the
  definite form matters if any string inflects it.
- ⚠ **Swedish compounds take a singular first element**: *hoppstorlek*, not *hopparstorlek*
  or *hoppenstorlek*.
- **Story shape.** Follow the it/nl size-then-direction order and keep it flat:
  *"Hopper sitter på 6 och hoppar 8 steg framåt. Var landar han?"* — note **`steg`**, which
  is what makes the hop-size a *length* rather than a destination in Swedish, and which
  Swedish teachers say aloud. Without `steg`, *"hoppar 8 framåt"* is readable but thinner.
- **Pronoun: `han`.** See the English audit — the source is internally inconsistent and
  Swedish should not inherit the inconsistency.

---

## DECISION 4 — THE ENGLISH AUDIT

Eight findings. Five are in the shipped English and inherited by all seven locales; two
are data defects that carry **no language at all**, so one edit fixes every locale without
any re-translation; one is a code gap that will bite Swedish specifically.

### ⚠⚠ D1 — The correct hop size is the MIDDLE chip in 8 of 9 rounds, and never the smallest in 9 of 9. (data; **headline**)

| round | chips sorted | correct | rank |
|---|---|---|---|
| 1 | 4, **8**, 10 | 8 | middle |
| 2 | 6, **12**, 15 | 12 | middle |
| 3 | 4, **6**, 8 | 6 | middle |
| 4 | 6, **9**, 12 | 9 | middle |
| 5 | 10, **20**, 25 | 20 | middle |
| 6 | 10, **20**, 30 | 20 | middle |
| 7 | 20, **40**, 50 | 40 | middle |
| 8 | 20, 40, **50** | 50 | **largest** |
| 9 | 10, **30**, 50 | 30 | middle |

"Always pick the middle number" wins 8/9. "Never pick the smallest" wins 9/9. The
activity shuffles the chips for *display order*, which does nothing to this — the pattern
is in the **values**, not the positions.

This defeats a third of the graded model without reading the story. The core's docblock
claims *"reproducing the story without computing… fails"*; at the size step the story need
not be parsed for its number at all. **Fix in the `decoys` arrays only.** Verified
example: round 2 `decoys: [15, 18]` makes 12 the smallest, and both 15→24 and 18→27 stay
on-tick and on-line. Do the same for two or three others so the rank varies.
⭐ **The decoys are pure numbers — this fix costs nothing in any of the seven locales.**

### ⚠ D2 — Rounds 7 and 9 are the same fact commuted. (data)

30 + 40 = 70 and 40 + 30 = 70. Of only three band-3 rounds, two are the same addends and
the same landing. Change one.

### ⚠⚠ D3 — The English page copy describes a mechanic the tool does not have. (`en.json`)

> *"the decoy landing spots mean they have to track the actual jump, not guess a nearby number"*

There are **no decoy landing spots**. `decoys` feed `sizeChips` — they are hop-**size**
chips, rendered as `.hnl-size` buttons with `aria-label "hop {sz}"`. The landing is typed
on a keypad; there is nothing nearby to guess. The sentence is false as written.

### ⚠ D4 — And it confuses the tick scale with the hop size. (`en.json`)

> *"The activity scales from hops of 2 and 3 up to hops of 10 across a line to 100."*

The hops are 8, 12, 6, 9, 20, 20, 40, 50, 30. **There is no hop of 2, 3 or 10 anywhere.**
What runs 2 → 3 → 5 → 10 is the tick `step`. Correct wording: *"the line's scale grows
from steps of 2 up to steps of 10 on a line to 100."*

### ⚠ D5 — `howToPlay` tells the child to press a button that isn't the one to press.

> *"…and find where he lands; then press Check."*

The commit control is labelled **"Hop! 🐸"** (`strings.hop`). `answerType:'state'` with
the activity's own commit. Say "Hop!".

### ⚠ D6 — Hopper's pronoun is inconsistent *within English*.

All nine stories: *"Where does **it** land?"* The page copy: *"place **him** on the
starting lily pad"*, *"find where **he** lands"*. `sayDial` uses the name. A named animal
character in K-3 English takes *he/she/they*, not *it* — and the page copy already knows
that. **The nine stories are the outlier.** German shipped `er`, Dutch `hij` — both
locales silently corrected it, which is the tell. Swedish takes **`han`**; do not inherit
"it".

### ⚠ D7 — `hintCheck` says "the way" where every other locale says "the direction".

> *"Set the start, **the way**, and the hop size…"*

In English "the way" reads as *the method*, not *the direction*. de `die Richtung`, fr `la
direction`, es `la dirección`, nl `de richting` — all six translated the intended sense, so
the English is the only wrong one. Swedish: **`riktningen`**.

### ⚠⚠ D8 — `speak()` has no `sv` branch: Swedish would be read aloud by an en-US voice.

`hoppers-number-line-activity.js:29` maps de/fr/es/pt/it/nl and falls through to
**`'en-US'`**. `LCSAudio` does not call `getVoices()` and substitutes silently, so this
fails without any error. This is the recorded class from 2026-09-07 where *es and nl were
speaking English to children* — and here it is guaranteed rather than possible, because
the story is spoken on every round mount (`setTimeout(… speak(self._story()) …)`).

> **Adding `sv` to `storyL10n` without adding `'sv': 'sv-SE'` to that ternary ships a
> Swedish story read aloud in an American accent, nine times per session.** Non-optional.

### Two further observations, outside the brief

- **The child loses the problem statement exactly when they need it.** The story renders
  only while `!ready`; as soon as start + direction + size are set it is replaced by a
  recap built from the child's *own choices* (`80 − 50 = ?`), and the 🔊 replay button
  disappears with it. A child who picked the wrong size sees a confident, wrong equation
  and no way to re-read the story except a 32px unlabelled `↺`. I would show the story in
  both phases, or at least keep the replay control.
- **No leak, and no misconception response.** No string reveals the landing (`hnl-landlab`
  is `?` until solved) — that is clean. But `gradeAttempt` returns one boolean, so a child
  with correct arithmetic on a wrong model and a child with a wrong sum get the identical
  *"Hmm, let's hop again."* The information to differentiate them is right there in the
  model. Worth a future round.

---

---

## OUTSIDE THE BRIEF — three things I found while measuring the fence

### ⚠⚠ A verification hazard that will waste a session if nobody knows about it

`frontend/lib/activities.ts` resolves manifests with **`frontend/public/mini-tools/` first**
in its candidate list, and that local copy is dated **Aug 16** and carries only
`en,de,fr,es,pt` — **zero** Swedish hits on any number-line keyword, against 78 sv rows
and 3 hits in the `mini tools/` source (Sep 8). CLAUDE.md already records that
`frontend/public/mini-tools/` is a gitignored stale copy that must never be edited.

> **Anyone verifying this activity locally will load the August file and see no Swedish at
> all** — including the sibling pages this fence is drawn against. Verify against
> `mini tools/`, or against production, and do not conclude from a local run that the
> Swedish siblings are absent. I am **not** claiming the Swedish sibling pages are missing
> from production; I did not measure production, and the local staleness is not evidence
> either way.

### ⚠ The `line-plot` (Snäckis) strand is the same calque, and its right answer is a different rubric

`line-plot.read.2-md-d-9` carries strand `Measurement & Data` → sv `Mätning och data`. Same
non-rubric. But its correct Lgr22 home is **not** the one I am recommending here: a line
plot of measured lengths is *"Enkla tabeller och diagram och hur de kan användas för att
sortera data och beskriva resultat"* — **Sannolikhet och statistik**. Since that page ships
this week, worth catching now. **Flagged, not acted on** — it is that page's ruling.

### ⚠ A live "free" claim

`tool-content/sv.json`, tool `number-line`: metaTitle **`Gratis interaktiv tallinje |
LessonCraftStudio`**. This is one of the residual "nothing is free" hits, on a Swedish
surface, in a metaTitle. Not mine to fix inside this commission, but it is on the closest
neighbouring page to the one being built.

---

## VETOES

1. **`Mätning och data`** as the Swedish strand. Not an Lgr22 rubric, and this activity
   contains neither mätning nor data.
2. **åk 3** via a mechanical "+1 Nordic shift". The three existing sv overrides are
   content rulings, not an offset.
3. **`Tillbaka`** for the back direction. Use `Bakåt`.
4. **"räkna över tian" / "tiotalsövergång"** anywhere in the Swedish title, slug or intro
   — the åk-1 page's head term, and band 1 makes it falsely tempting.
5. **Any promise of tiotalsövergång inom 100.** The deck does not contain a single such
   item.
6. **A slug on the `hopp-` root or led by `tallinje`.** Both are owned; lead on the
   operation.
7. **Shipping `storyL10n.sv` without the `speak()` `sv-SE` branch.**
8. **Any "gratis/kostnadsfri" claim** in the Swedish copy, and no CCSS code or the words
   "Common Core" in Swedish-facing text — cite **Lgr22** by name only. (The English
   `about`/`learningGoals` name the code three times; all three must be rebuilt, not
   translated.)

## Where I am uncertain

- The exact spelling of the Lgr22 matematik rubric (`Taluppfattning och tals användning`
  vs a shortened form). I did not re-verify against Skolverket. Repo consistency and my
  reading agree, and any correction is catalogue-wide, not per-activity.
- Whether `step: 3` (rounds 2 and 4) is acceptable to a Swedish åk-2 teacher. Swedish
  textbooks use skalor of 2, 5 and 10 almost exclusively; a tallinje ticked every 3 is
  unusual here. It is not wrong, and it is good for the modelling, but it is the one
  design choice a Swedish reviewer is most likely to query. Flagging, not vetoing.
- Whether keeping **two named frogs** (Lily åk 1, Hopper åk 2) on the tallinje is an asset
  or a muddle. I ruled it an asset — a Swedish child recognising "another frog game" one
  level up is good, provided the intros do not open alike. A second native reader may
  disagree, and it is a cheap thing to change later.
- I read the fence from the **source** manifests (`mini tools/`), not from production. The
  slugs and titles above are verbatim from disk and I am confident in them as *authored*;
  I have not verified which of them are *live*.

---

## The work list this implies (for whoever builds it)

Nine surfaces, not two. Anything missed here ships silently:

1. `mini tools/hoppers-number-line-activities.json` — `slug.sv`, `page_title.sv`, `page_intro.sv`
2. …same file — **`storyL10n.sv` × 9 rounds** (each spoken *and* displayed)
3. `mini tools/hoppers-number-line-activity.js` — `strings` × **16 keys**, sv branch
4. …same file, **line 29** — add `'sv'` to the `speak()` fallback lang map (**D8**)
5. `frontend/messages/activity-content/sv.json` — one `prose` entry:
   `about` / `practices` / `howToPlay` / `learningGoals` (the sv file carries no title or
   slug fields — those live in the manifest)
6. `frontend/app/[locale]/activities/[slug]/page.tsx` — `STRAND_OVERRIDE` line 218, add
   `sv: 'Taluppfattning och tals användning'`
7. `GRADE_OVERRIDE` — **no sv row** (deliberate; record the reason in the comment)
8. `mini tools/hoppers-number-line-activity.html` — bump `?v=` (§A.13.42)
9. `ACTIVITY_WRAPPER_VERSION` bump — and note the two-level cache-buster: the wrapper
   version busts the HTML, the `?v=N` busts the JS

The data fixes **D1** (decoy ranks) and **D2** (the commuted duplicate) touch numbers only
and are cross-locale — they should land as their own commit, not folded into the Swedish
one.
