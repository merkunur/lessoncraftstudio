# sv — `hoppers-number-line.jump-sums.2-md-b-6` (Lgr22, åk 2)

Everything below is measured against the repo, not asserted. Nothing has been written to
the codebase — this is the panel deliverable only.

---

## 0. Measured conventions (my numbers, not the brief's)

**Corpus = 78 rows carrying `slug.sv` across `mini tools/*-activities.json`.**

| field | n | min | q1 | median | q3 | p90 | max | mean |
|---|---|---|---|---|---|---|---|---|
| `slug.sv` chars | 78 | 9 | 20 | 24 | 33 | 42 | **47** | 26.8 |
| `page_title.sv` chars | 78 | 9 | 40 | **50** | 60 | 67 | 90 | 48.6 |
| `page_intro.sv` chars | 78 | 107 | 150 | 163 | 222 | 337 | 460 | 200.1 |

`page_title.sv` 10-char histogram: `10:5, 20:6, 30:7, 40:19, 50:18, 60:17, 70:3, 80:1, 90:1`.
The 40–69 span holds **54 of 78** rows; the 9- and 90-char ends are single outliers, so the
usable band is **~40–67**, not the full min–max.

⚠ **The intro band is a gate, not the corpus.** Only **37 of 78** shipped sv intros fall in
120–170; the median 163 sits inside it but q3 (222) and p90 (337) are far outside. I wrote to
the gate.

**Slug folding, measured on the shipped set:** one letter for one letter —
`jämför→jamfor`, `längder→langder`, `förskoleklass` (in `hopprakning…`, `rakna-over-tian…`,
`jamfora-langder…`, `matcha-stora-och-sma-bokstaver`). No `ae`/`oe` anywhere. `åk` → `ak`.

**Prose conventions, counted over all 78 sv entries (215 about / 319 practices / 234
howToPlay / 234 learningGoals items):**

| array | dominant count | terminal period | median len |
|---|---|---|---|
| `about` | 3 (49 rows; 2 in 21 rows) | **215/215 — always** | 352 |
| `practices` | 4 (71 rows) | **8/319 — never** | 59 |
| `howToPlay` | 3 (78/78) | **234/234 — always** | 92 |
| `learningGoals` | 3 (78/78) | **12/234 — never** | 75 |

Shape histogram `about/practices/howToPlay/learningGoals`: `3/4/3/3` ×49, `2/4/3/3` ×21,
`3/5/3/3` ×6, `4/4/3/3` ×1, `4/5/3/3` ×1. The requested 3/4/3/3 **is** the dominant shape.

`practices` are **bare capitalised infinitives**, confirmed by first-word frequency:
Läsa 31, Räkna 30, Bygga 21, Skilja 19, Känna 16, Lägga 14, Koppla 14, Para 13, Se 13,
Jämföra 13, Hitta 10, Använda 9, Hålla 9, Addera 8… `learningGoals` open **`Barnet kan…` /
`Barnet ser…` / `Barnet förstår…`**.

**74 of 78** sv intros name Lgr22. **3 of 78** carry an access claim (`Utan konto`):
`mata-langd-med-egna-enheter-ak-1`, `jamfora-langder-med-ett-rep-ak-1`,
`satta-ihop-former-med-trianglar-och-romber-ak-1` — pre-existing gate violations, not mine.

---

## 1. `slug.sv`

```
addition-och-subtraktion-pa-tallinjen-ak-2
```

42 chars — matches `^[a-z0-9-]+$`, sits exactly on the corpus p90 and level with
`addition-med-tiotalsovergang-inom-100-ak-2` (42). Verified: **0 collisions** against all 78
activity `slug.sv` and all 61 `tool-content/sv.json` slugs.

Pattern-conformant on both axes — `addition-och-subtraktion-pa-…` is already the shipped
shape (`addition-och-subtraktion-pa-tioram`), and `-ak-2` is the second-batch grade suffix.
The apparatus token (`tallinjen` vs `tioram`) is what separates them.

⚠ **The mascot is deliberately absent from the slug.** A URL is the one string a rename can
never touch cheaply.

`inom-100` was dropped from the slug only: with it the slug is 51 chars, four over the
corpus maximum. It carries in the title instead, where it costs nothing.

## 2. `page_title.sv`

```
Addition och subtraktion inom 100 på tallinjen – åk 2
```

**53 chars** — on the median (50), inside the 40–67 working band, 0 title collisions.

Head-term-led rather than character-led, which is well inside convention (`Räkna över tian
på tallinjen – addition och subtraktion (åk 1)`, `Addition med tiotalsövergång inom 100 –
gör ett tiotal (åk 2)`, `Hoppräkning 5, 10 och 100 – talföljder för åk 2` all lead with the
maths). `addition och subtraktion inom 100` is the phrase a Swedish åk-2 teacher actually
types; `inom 100` is also the single cleanest fence against the åk-1 competitor, which is
within 20.

En-dash `–` before the grade: the shipped sv separator (both `–` and `—` occur; `–` is the
majority in the second-batch rows).

## 3. `page_intro.sv` — **161 characters**

```
Barnet läser hoppet och bygger det på tallinjen – start, riktning och längd – och räknar ut var det landar. Addition och subtraktion inom 100, åk 2 enligt Lgr22.
```

In the 120–170 gate band. Names Lgr22. No CCSS code, no framework other than Lgr22, no
`gratis` / `kostnadsfri` / `fritt tillgänglig` / `utan registrering` / `utan konto`.

It leads with what makes this page different from every neighbour — **the child builds the
hop rather than reading one** — and no mascot name appears, so a rename never touches the
search-facing surface.

## 4. Prose block for `frontend/messages/activity-content/sv.json`

Key: `"hoppers-number-line.jump-sums.2-md-b-6"`. Shape 3/4/3/3.

```json
{
  "about": [
    "Grodan Hopper sitter på ett tal på tallinjen, och hoppet står i uppgiften: sitt på 6 och hoppa 8 framåt, eller sitt på 80 och hoppa 50 bakåt. Barnet bygger hoppet själv – trycker på talet där Hopper ska börja, väljer framåt för addition eller bakåt för subtraktion, och trycker på hur långt hoppet är. Näckrosbladet dyker upp där hoppet slutar, och först då är det dags att räkna ut vilket tal grodan landar på.",
    "Det stora i det här är att tallinjen blir ett redskap barnet använder, inte en bild att titta på. Landningen står som ett frågetecken tills svaret stämmer, så det går inte att läsa av linjen – talet måste räknas ut och knappas in på sifferknapparna. Bland knapparna för hopplängd finns dessutom två som inte stämmer, till exempel 4 och 10 när hoppet är 8, så barnet måste hålla reda på det verkliga hoppet i stället för att chansa på ett tal i närheten.",
    "Nio uppgifter i tre steg. Först fyra kortare hopp på en linje till 20 och 30: 6 + 8, 9 + 12, 16 − 6 och 24 − 9. Sedan två tjugohopp på en linje till 50: 15 + 20 och 45 − 20. Till sist tiotalshopp på en linje till 100: 30 + 40, 80 − 50 och 40 + 30 – två av dem landar på samma tal, 70, fast hoppen ser olika ut. Uppgifterna blandas om till en ny ordning varje gång, men de lätta kommer alltid först. Aktiviteten följer Lgr22 inom taluppfattning och tals användning, där barnet möter metoder för beräkningar med naturliga tal. Ingen timer, inga poäng – bara lugn och lekfull träning."
  ],
  "practices": [
    "Visa addition som ett hopp framåt och subtraktion som ett hopp bakåt på tallinjen",
    "Ställa in hela hoppet själv: rätt startpunkt och rätt hopplängd bland knappar där två inte stämmer",
    "Räkna ut var hoppet landar inom 100, när svaret inte går att läsa av på linjen",
    "Använda tallinjen som ett redskap för att räkna, inte bara som en bild att titta på"
  ],
  "howToPlay": [
    "Läs hoppet i uppgiften och tryck på talet där Hopper ska börja.",
    "Välj framåt för addition eller bakåt för subtraktion, tryck på hur långt hoppet är och knappa sedan in vilket tal grodan landar på. Tryck på Hoppa!",
    "Stämmer det inte får du välja hopplängd och landning en gång till, så många gånger du vill. Ingen timer och inga poäng."
  ],
  "learningGoals": [
    "Barnet kan visa en addition eller subtraktion inom 100 som ett hopp på tallinjen",
    "Barnet kopplar addition till ett hopp framåt och subtraktion till ett hopp bakåt från samma startpunkt",
    "Barnet räknar ut var hoppet landar i stället för att läsa av det, och bygger den tallinjemodell som huvudräkningen senare vilar på"
  ]
}
```

Lengths — about 411 / 453 / 581 (corpus median 352, max 800); practices 81 / 98 / 78 / 83
(median 59, max 168); howToPlay 63 / 147 / 119 (median 92, max 296); learningGoals 80 / 102 /
130 (median 75, max 186). All inside the shipped ranges. Periods exactly per the measured
convention: about ✓, howToPlay ✓, practices ✗, learningGoals ✗.

Every factual clause was checked against `numberline-jump-core.js` and
`hoppers-number-line-activity.js`, including the three the English gets wrong (§7).

## 5. Strand

`alignment.strand` is `"Measurement & Data"`, which `strand-names.ts:81` auto-maps to
**`Mätning och data`**. That is a calque with no Lgr22 referent — the åk 1–3 areas are
*Taluppfattning och tals användning*, *Algebra*, *Geometri*, *Sannolikhet och statistik*,
*Samband och förändring*, *Problemlösning*; measurement itself lives inside *Geometri*.

All **six** shipped siblings already override
(`page.tsx:218` → de `Zahlen und Rechnen im Zehnersystem`, fr `Nombres et calcul`,
es `Sentido numérico`, pt `Números`, it `Numeri`, nl `Getallen`). sv must join:

```
sv: 'Taluppfattning och tals användning'
```

Adding to the number line **is arithmetic**; the line is only the model. This is also the
strand `strand-names.ts:94` already gives sv for Base-Ten, so no new lexicon is introduced.

**Grade: åk 2, no override.** ⚠ Lgr22 states *centralt innehåll* once for the whole åk 1–3
band, so it cannot decide a year — the progression does. Within-20 lands åk 1 (the shipped
`rakna-over-tian` page), within-100 lands åk 2. `alignment.grade` is already `"2"`.

---

## 6. Differentiation

**Ceded outright:**

| head term | owner |
|---|---|
| `tallinje` (bare) | TOOL `number-line` — *Gratis interaktiv tallinje* |
| `tom-tallinje`, **"rita egna hopp"** | TOOL `open-number-line` — *Tom tallinje – rita egna hopp* |
| `hoppräkning` / `hopp-` as a lead noun | `hopprakning-5-10-och-100-ak-2` (2.NBT.A.2) |
| `räkna över tian`, tallinjen **inom 20**, åk 1 | `rakna-over-tian-pa-tallinjen-ak-1` (1.OA.C.6) |
| `kryss på tallinjen`, vanligaste längden | `kryss-pa-tallinjen-vanligaste-langden-ak-2` (2.MD.D.9) |
| `tiotalsövergång` | `addition-med-tiotalsovergang-inom-100-ak-2` |
| `lästal` / textuppgifter inom 100 | `lastal-upp-till-100-ak-2` |
| tallinje **under noll** / avstånd | TOOL `cold-line` — *Pelaren – under noll, avstånd och tallinje, åk 1–3* |
| uppskatta tal på en linje | TOOL `landing-strip` — *Närmare 0, 50 eller 100?* |

**Owned:** *addition och subtraktion **inom 100** representerade som **ett hopp** på
tallinjen, **åk 2***, where the child **sets** start + direction + length and must **compute**
a landing that is never displayed. Nothing else in the sv catalogue does that.

⚠ **The brief named two tool collisions; there are four.** `cold-line` puts the word
*tallinje* in its own metaTitle, and `landing-strip` is a number-line estimation instrument.
Neither takes my slug, but both compete for `tallinje` intent and both are stronger
competitors than the brief assumed. I also checked `the-queue` (*Räkneraden*),
`number-drum` (*Talringen: över tiotalet*), `rounding-hill` and `number-sieve` — number-ish,
but none is a number-line page.

**The nearest neighbour is not a tool — it is `rakna-over-tian-pa-tallinjen-ak-1`.** Its
shipped title is *"Räkna över tian på tallinjen – **addition och subtraktion** (åk 1)"* and
its shipped intro is *"Grodan Lily hoppar längs tallinjen 0–20… Addition och subtraktion inom
20 för åk 1"*. Overlap on `addition och subtraktion` + `tallinjen` is therefore unavoidable
and is fenced on three axes at once: **grade** (åk 1 / åk 2), **range** (inom 20 / inom 100)
and **mechanic** (fylla upp till tian / bygga hoppet själv). Grade saturates copy, so this is
the safe direction of overlap — but see the frog problem in §8.

---

## 7. Audit of the English source

Read against `numberline-jump-core.js` and `hoppers-number-line-activity.js`. Six findings,
three of them false statements about what is on the screen.

**⚠⚠ 1. "a number line of lily pads" is false, and so is "the starting lily pad".**
`_renderLine` (activity JS ~163-192) draws a plain axis: `hnl-axis`, then a `hnl-tick` and a
numeric `hnl-ticklab` per tick. There is exactly **one** 🪷 in the whole render — `hnl-lily`,
placed at the **landing**, and only after start + direction + size are all set. The frog sits
on a numbered tick. So:
- `about[0]` "hopping along a number line **of lily pads**" — there is no row of lily pads.
- `howToPlay[0]` "place him on the **starting lily pad**" — the start is a numbered tick;
  the lily pad is at the *other* end, and is the thing the child is computing toward.
Inherited: `page_intro.nl` "over de **waterlelies**" (plural). The nine `storyL10n` strings
are clean in all six locales. **My Swedish deliberately says the opposite of the English
here** — the frog starts on a *tal*, and *näckrosbladet* appears where the hop ends.

**⚠⚠ 2. "the decoy landing spots" is false.** `sizeChips(round)` returns
`[round.size].concat(round.decoys)` and the core comment reads *"correct size + decoy(s)"* —
the decoys are **hop-size** chips (4 and 10 when the hop is 8). The landing has no options at
all: `_pushDigit` builds it on a 0-9 keypad, clamped to 100. `about[1]` describes a decoy
mechanism that does not exist on the axis it names.

**⚠⚠ 3. "scales from hops of 2 and 3 up to hops of 10" is false — it reports the tick
spacing as the hop size.** Measured, `step` runs 2, 3, 2, 3, 5, 5, 10, 10, 10 while `size`
runs 8, 12, 6, 9, 20, 20, 40, 50, 30. **No hop in the activity is 2, 3 or 10.** `about[1]`.

**⚠ 4. Access claim in five of seven locales, not two.** `about[0]` en *"with no account"*;
`page_intro` de *"ohne Anmeldung"*, fr *"Sans inscription"*, es *"sin registro"*, it *"senza
registrazione"*. pt and nl intros are clean. The EN source is one of the offenders, which is
why the other four have it.

**⚠ 5. `page_intro` band: five of seven are outside 120–170.** Measured: en 387, de **115**
(under the floor), fr 120 (on the floor), es 308, pt 148, it **636**, nl 415. Only pt and fr
comply.

**6. The English contradicts itself on the mascot's animacy.** All nine `story` strings ask
*"Where does **it** land?"* while `howToPlay[0]` says *"place **him**"*. de `er`, nl `hij`,
pt `ele` all chose a person; EN alone uses *it*, and not consistently.

**Verified sound, for the record:** "within 100" is honest (largest value the child touches
is the start 80, largest landing 70, longest line 100); the landing really is derived, never
authored (`facts.answerDerivedNotAuthored`); the story dictates the direction and the child
only commits it, which the EN prose words correctly; the reshuffle is real but is
*within band* (`bandOrder` shuffles inside each band and concatenates ascending), so "a new
order every time" is true while "any order" would not be — my `about[2]` says *"de lätta
kommer alltid först"*, which no sibling locale states.

**Outside brief, worth a separate ticket:** two rounds land on the same number by
commutativity (30 + 40 and 40 + 30, both 70). No locale mentions it. I put one honest clause
about it in sv `about[2]`; it looks deliberate and is the best free pedagogy in the round set.

---

## 8. Mascot — recommendation and the complete rename surface

**Recommendation: keep `Hopper` in Swedish.** It is not a foreign import here — `grodan
Hopper` is **already shipped in Swedish prose**, on `skipcount.fill.2-nbt-a-2`
(*Hoppräkning 5, 10 och 100*), in the same lily-pad pond world. The route override comment at
`page.tsx:218` states the reuse is intentional (*"Zelfde Hopper als #3 skipcount"*, *"igual
que el skip-count Hopper #3"*), and only pt renamed (→ *Saltão*, recorded as BR-specific).
Renaming sv would break a link the catalogue already made in Swedish. *Hopper* is also
transparent to a Swedish child next to *hoppa*.

**⚠ The real mascot problem in Swedish is not the name — it is that there are two frogs.**
`ten-stones.add-sub-within-20.1-oa-c-6` ships **"Grodan Lily"**, a frog hopping a lily-pad
number line, one grade below. Swedish now has *Grodan Lily* on the åk-1 number line and
*grodan Hopper* on the åk-2 number line, and English cannot see the collision because *Lily*
and *lily pad* are the same word there. That is a catalogue decision above this panel; I am
surfacing it, not resolving it.

**Every site a Swedish rename would touch — 14 occurrences, 3 files, sv only:**

1. `mini tools/hoppers-number-line-activity.js` → `strings.title.sv`, `strings.sayDial.sv`.
   **2 of the 16 keys.** I enumerated the whole table: `title`, `prompt`, `hop`, `replay`,
   `fwd`, `back`, `sizeHint`, `sayWelcome`, `sayDial`, `sayWin`, `sayWait`, `hintCheck`,
   `ariaStart`, `ariaHop`, `ariaEdit`, `ariaClear` — the other 14 never name the mascot.
   ⚠ **`sv` is currently absent from all 16**; authoring must add every key, not only the two.
2. `mini tools/hoppers-number-line-activities.json` → `params.rounds[i].storyL10n.sv` × **9**.
3. `frontend/messages/activity-content/sv.json` → `prose[…].about[0]` (**2** occurrences) and
   `prose[…].howToPlay[0]` (**1**). Elsewhere I wrote *grodan* / *hoppet*, which survive a
   rename untouched.
4. **Not** `slug.sv`, **not** `page_title.sv`, **not** `page_intro.sv` — by design. A rename
   never touches the URL or the SERP line.

## 9. Swedish terminology locked for this row

`tallinjen` · `hoppet` / `hoppa` / `hopplängd` · `framåt` / **`bakåt`** (⚠ not *tillbaka*,
which reads as *return to start*) · `startpunkt` / *talet där … börjar* · `landar` /
`landningen` · `näckrosbladet` (singular — there is one) · `addition` / `subtraktion` ·
`inom 100` · `taluppfattning och tals användning`.

Suggested JS values if the row is built: `fwd` `▶ Framåt`, `back` `◀ Bakåt`,
`hop` `Hoppa! 🐸`, `sizeHint` `Hur långt är hoppet?`, `sayWin` `Plask! Mitt på näckrosbladet. 🪷`,
`sayDial` `Var landar Hopper? Knappa in talet!`, `title` `Hoppers tallinje`.
