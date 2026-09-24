# Swedish panel — `sentence-clinic.fix-it.l-2-1` (sv)

Native Swedish linguist review. I read `mini tools/sentence-clinic-activity.js`,
`mini tools/fix-it-core.js`, `mini tools/sentence-clinic-activities.json`,
`mini tools/sentence-builder-activity{.js,ies.json}`, `mini tools/tense-activities.json`,
`mini tools/lcs-shell.js`, `scripts/verify-fix-it-core.js`,
`scripts/local-test-sentence-clinic.js`. I changed nothing. Every count below is
computed, not recalled.

---

## 0. Headline

- **Your no-agreement claim is right. Your evidence is not** — the tense deck holds
  subject-number constant in *all eight* locales including German, so it cannot
  distinguish Swedish from anything. Better evidence exists in the same repo (§1).
- **`swap` → särskrivning**, `Vi spelar fot boll.` → `fotboll`. Ranking and the
  distractor reasoning in §2.
- **`delete` → the extra infinitive marker**, `Jag kan att simma.` → `Jag kan simma.`
  Your doubled-preposition idea works but teaches proofreading, not language (§3).
- **`reorder` → yes, ship the V2 inversion**, and it is an L2 error, which for this
  audience is the argument *for* it. ⚠ But as briefed it violates the design law:
  `Jag ska cykla imorgon` is equally correct with the same four tokens and the
  engine accepts exactly one order. Pin both ends (§4).
- **Rounds 1–2 are redundant with `sentence-builder` sv — re-aim them, don't drop
  them.** Capital-in-a-NAME and QUESTION-MARK, both named by Lgr22 åk 1–3, both
  untaught anywhere else in the sv catalogue (§7).
- **Audit: 1 live data defect in nl, 4 hard-coded-English/SR defects, 1 post-solve
  render bug in all 7 locales, and the structural cause — no gate has ever executed
  a single non-EN round of this activity** (§8).

---

## 1. Subject–verb agreement in Swedish — CONFIRMED, with the record corrected

**Confirmed.** Modern Swedish has no person and no number inflection on the verb.
One present form and one past form serve every subject:

> jag springer · du springer · hon springer · vi springer · ni springer · de springer
> jag sprang · vi sprang · de sprang

A `swap` round on agreement is not merely hard in Swedish — there is nothing to
swap. Every one of the other six locales uses that slot for a contrast Swedish
does not have.

### ⚠ Your evidence does not carry the claim

I checked the tense deck across all eight locale sets:

| locale | `verb.forms` keys | first subjects |
|---|---|---|
| en | future, past, present | the boats, the kids, the sailors |
| **de** | future, past, present | Die Boote, Die Kinder, Die Hunde |
| fr | future, past, present | Les oiseaux, Les élèves |
| **sv** | future, past, present | Båtarna, Katterna, Barnen |
| nl | future, past, present | de boten, de kinderen |

German stores exactly one `present` form too — and German unquestionably has
agreement. The deck holds the subject plural in **every** locale by design, so
"one present form per verb" is a property of the *deck schema*, not of Swedish.
Had you shown that reasoning to a reviewer who wanted to reject the finding, they
would have won.

### The evidence that does carry it — cross-deck, both native-authored, both live

- `sentence-builder-activities.json` → `roundsL10n.sv.snt-fish.canonical`:
  **`En randig fisk simmar.`** — singular subject.
- `tense-activities.json` → `roundsL10n.sv.tn-n3`: subject **`Ankorna`**,
  `present: "simmar"` — plural subject.

Same verb, same form, singular and plural, both shipped, both authored by native
panels. That is a measured demonstration of invariance. The same pair exists for
*springa* (`Hästarna springer` in tense; the builder's singular subjects take the
identical `-er`/`-ar` present).

### The historical note, so the record is accurate

The plural verb forms (`vi springa`, `de sprungo`, `vi äro`, `de voro`) were a
**written-language-only convention for roughly their last three centuries** —
spoken Swedish had already levelled them in most dialects by the 1600s–1700s.
They died in the written norm in stages:

- **mid-1940s** — the newspapers abandon them; *Dagens Nyheter* 1945 is the date
  usually cited, and TT follows, which is what carries it into general prose.
- **1950s** — the school norm follows; from here no Swedish schoolchild is taught
  to produce them.
- **1970s** — statute Swedish is the last hold-out; SFS carried plural forms into
  the *klarspråk* reform era (early-to-mid 1970s).
- **1917 års bibel** kept them; the 1981 NT translation did not.

So: no living Swede under about 80 has ever actively used *sprungo*, and no
Swedish curriculum since roughly 1950 has taught it. Teaching agreement to an
åk-2 child in 2026 would be teaching a paradigm their great-grandparents dropped.

**What must occupy the slot:** see §2. Note that the slot's *shape* survives —
"the word on the board is the wrong form of the right thing; pick the right one" —
only the grammatical dimension changes from morphology to orthography.

---

## 2. The `swap` slot — ranked

Ranked as **written** errors a Swedish 8–9-year-old actually makes.

| # | candidate | stage | verdict |
|---|---|---|---|
| 1 | **särskrivning** — *fot boll* | **lågstadiet** (transparent noun+noun only) | **WINNER** |
| 2 | dubbelteckning — *kat*/*katt* | **lågstadiet**, åk 1–2 | best used as the distractor axis, not the round |
| 3 | *å* for *och* — *jag å du* | **lågstadiet**, very common | strong runner-up, thin structurally |
| 4 | strong-verb past — *springde* → *sprang* | **lågstadiet** | real, but collides with the shipped sv tense deck |
| 5 | **var / vart** | mellanstadiet as a norm issue | ⛔ **RULED OUT — design law** |
| 6 | **de / dem** | mellanstadiet–högstadiet | ⛔ **stays out — you were right** |

### Why the two exclusions

**var/vart — this is the sv #21 trap wearing a new hat.** *Vart är du?* is not an
error in large parts of Sweden; the directional *vart* has spread to static
contexts in ordinary regional speech and millions of Swedes say it daily. Marking
it wrong to an eight-year-old whose family says exactly that is precisely the
thing that needed repairing twice already. Do not put it in front of a child.

**de/dem — confirm it stays out.** It depends on subject/object metalanguage the
åk 1–3 kursplan does not introduce, it is the canonical mellanstadiet-and-upward
issue (and an adult one), and the *dom* question is normatively contested. Your
sv #24 ruling holds.

### Why the winner, and why it is not merely the frequent one

Särskrivning is the characteristic Swedish written error, and — this is the part
that matters for *this* activity — **it changes meaning**, which is exactly the
clinic's frame. *fot boll* is literally "a foot, a ball": two things. That is a
grammar consequence, not a spelling slip, and it is why teachers reach for
*en brun hårig flicka* vs *en brunhårig flicka*.

⚠ **But only on a transparent noun+noun compound.** Two of your three examples are
not åk-2 material:

- *lärar rummet* — needs the fogemorfem *lärar-*, which is opaque to a young
  child (the base is *lärare*). **Mellanstadiet at the earliest.**
- *rök fri* — a compound **adjective**, and an adult/public-signage word. A
  Swedish child does not write *rökfri*. **Out on register, not on stage.**
- *fot boll* — ✅ two words the child owns, no linking morpheme, and the compound
  is one of the first a Swedish child ever writes.

### The round

```
tokens        ["Vi", "spelar", "fot boll", "."]
targetIndex   2
replacement   "fotboll"
distractors   ["fotbol", "fottboll"]
```

**Distractor reasoning.** Both are same-lemma near-misses on the *dubbelteckning*
axis — the #2 error on the list above — so the round quietly tests two conventions
and neither wrong option is a throwaway:

- **`fotbol`** — under-doubling. The real child error: in a compound the second
  element's geminate gets reduced.
- **`fottboll`** — over-doubling, the mirror error a child makes the week after
  "short vowel → double consonant" is introduced and over-applied. *fot* has a
  long vowel, so no doubling is correct — invisible to a child who has just
  learned the rule.

Neither is defensible by any Swedish speaker of any age. ✅ design law.

**Rejected distractors, with reasons** (so nobody re-adds them):

- `fot boll` — that is the board token. Offering the child back the word they just
  condemned is a live bug in nl right now (§8 C1). **Never.**
- `fot-boll` — hyphens are *correct* in Swedish compounds elsewhere (*TV-spel*,
  *A-lag*, avstavning). Do not teach "hyphen = wrong".
- `Fotboll` — a different round's error (capitalisation); muddies the teaching point.
- `fotbollen` — *Vi spelar fotbollen* is well-formed; a child could defend it.
- `boll fot` — nonsense; a distractor nobody picks teaches nothing.

### ⚠ One honest cost of this choice — the frame

Särskrivning is **invisible to the ear**. *fot boll* and *fotboll* sound identical.
The deck's whole frame is *sound* — "help it sound right", `soundsRight`, "Listen
again" — and the shared `promptSwap` says "the word that **sounds** wrong".

This is not a reason to reject särskrivning, because **the frame is already false
for rounds 1 and 2 in every locale** — a missing capital and a missing period are
equally inaudible (§8 D1). The right response is an sv-only reframe from *låta
rätt* to **`bli rätt`** ("help the sentence get right again"), which covers both
channels honestly. That is baked into the strings in §6.

The alternative, if the platform prefers to keep the sound frame intact, is
candidate #4 (*springde* → *sprang*, which *is* audible) — but it re-teaches the
neighbouring sv tense deck, which already ships `springa/sprang`. Given rounds
1–2 also need de-duplicating against `sentence-builder` (§7), a third overlap
would leave the sv clinic teaching almost nothing new. **Take särskrivning.**

---

## 3. The `delete` slot

### Your ruling on *Min mamma hon lagar mat* is correct

Confirmed, and it is worse than "spoken". Swedish **fundamentsdubblering /
left-dislocation** is a productive construction, not a slip:

> Min mamma, hon lagar all mat hemma.
> Den där boken, den har jag redan läst.
> Kalle, han är alltid sen.

Millions of Swedes produce it every day and it appears in edited prose for
emphasis. Marking it wrong is the sv #21/#24 error a third time. ⛔

### Your doubled preposition — it works, but it is weak, and I would better it

*Vi gick till till skolan* passes the design law (nobody defends it) but fails on
pedagogy: two adjacent identical words is a **visual pattern match**, not a
language judgement. The child learns "spot the repeat" — proofreading, not
grammar — and the convention line can only say *ett ord står bara en gång*, which
is content-free.

### ⚠ A real finding about Swedish before I give you the replacement

I went looking for an extra word that Swedish forbids in **both** channels, and
the well is unusually dry — because **most Swedish "extra word" patterns are things
Swedes actually say**:

- *Min mamma **hon** lagar mat* — left-dislocation, productive.
- *När det regnar **så** stannar vi inne* — *så*-insertion, standard in speech,
  accepted informally in writing.
- *Jag ska **och** handla* — dialectal but widespread.
- *Jag har inte **ingenting**…* — real in several varieties.

Every one of them is a design-law violation. That is exactly why the German round
does not port: German's doubled subject pronoun is simply wrong in German, and
Swedish's is not. **The survivors are the transfer errors.**

### Recommended round

```
tokens        ["Jag", "kan", "att", "simma", "."]
targetIndex   2
clean         ["Jag", "kan", "simma", "."]
```

*Jag kan att simma* is ungrammatical in Swedish, full stop — after a modal the
infinitive is bare, with no exceptions and no register where it is licensed.

**Why it beats the doubled preposition:** *att* is a small, high-frequency function
word the child sees constantly, so finding it requires a **rule**, not a spot-the-
duplicate reflex. The repaired sentence is perfect åk-2 Swedish and echoes nothing
else in the deck.

**Honesty about its frequency, since you asked for bluntness.** For *monolingual*
Swedish children this is not a common error — the bare infinitive after modals is
acquired early and is robust. It is very common for **L2 / SVA and immersion**
children, where the infinitive marker transfers from the other language (English
*to*, German *zu*, Dutch *te*, Spanish *a*). Given that this platform's stated
audience is international, dual-language and immersion classrooms, that makes it
on-target rather than obscure — but the record should say so rather than claim a
monolingual frequency it does not have.

**Alternative if you want a second option:** `["Hunden","är","springer","fort","."]`
→ *Hunden springer fort.* Also unambiguously ungrammatical (Swedish takes one
finite verb per clause), also an immersion transfer error (English *is running*).
I rank it second because *är springer* is spottable by sheer weirdness, which
weakens the diagnosis step.

---

## 4. The `reorder` slot — V2 inversion

### Is it a real Swedish child error?

**Split answer, and both halves matter.**

- **Monolingual Swedish children: essentially no.** V2 with a fronted adverbial
  (*Imorgon ska jag…*, *Igår gick vi…*, *Sen kom han…*) is acquired very early and
  is robust well before school age. Swedish children do not produce
  *Imorgon jag ska cykla*.
- **L2 / SVA and immersion children: it is THE canonical error** — the single most
  studied structure in Swedish second-language acquisition. In
  *processbarhetsteorin* (Pienemann / Håkansson), inversion is a late stage, and
  *Imorgon jag ska cykla* is the textbook interlanguage form that persists for
  years. Every SVA teacher in Sweden knows this sentence by heart.

**My view: ship it, and lean into it.** For an international / dual-language /
immersion audience this is the highest-value round in the whole sv deck — it is
the one thing in the sv catalogue that drills *omvänd ordföljd*, and it is
harmlessly easy for monolingual children (they will solve it instantly, which is
fine at band 3). Say so in the record so nobody later "corrects" it as an L2 error
that does not belong in an L1 activity.

### ⚠⚠ As briefed, the round violates the design law

`repairCorrect` for `reorder` compares element-by-element against a single
`correctOrder` (`fix-it-core.js:126-129`). With the four tokens
*Imorgon / jag / ska / cykla*, **`Jag ska cykla imorgon.` is equally correct
Swedish** — and the engine giggles at it and wipes the board after 600ms
(`sentence-clinic-activity.js:291`). That is marking correct Swedish wrong, for
the third time on this platform.

### The fix — pin both ends, which is what `sentence-builder` sv already does

Capitalise the fronted adverbial and **attach the period to the last word**. The
sibling activity ships exactly this convention (`En brun hund skäller.`,
`Ett vitt får bräker.`) and its own sv hint tells the child the rule:
*"Börja med ordet som har stor bokstav och lägg ordet med punkt sist."*

```
tokens        ["läsa.", "jag", "ska", "Nu"]
correctOrder  [3, 2, 1, 0]
clean         ["Nu", "ska", "jag", "läsa."]
```

Only `Nu` can open (capital), only `läsa.` can close (period), so the middle two
slots take *jag* and *ska* — **`Nu ska jag läsa.` is the unique grammatical
arrangement**, and `Nu jag ska läsa.` is the buildable wrong answer, which is the
whole point.

### ⚠ Why not *Imorgon*

*imorgon*, *idag* and *igår* all have a live one-word/two-word doublet (SAOL
lists both; *i morgon* is the traditional form). In a deck whose `swap` round is
explicitly about writing two words as one, presenting *imorgon* as one word invites
a teacher — or a child — to read it as the same rule. It is **not**: *i morgon* is
a preposition phrase, not a compound. `Nu` has no doublet and no interference.
Alternative if `Nu` reads too thin: `Sedan ska vi äta.` (same structure, same
pinning). Do not "improve" it back to *imorgon*.

### Side benefit

Attaching the period fixes a defect the other locales carry: **every locale's
`reorder` round currently ships a finished, celebrated sentence with no full stop
at all** (`en: ["The","dog","runs","fast"]`) — in a deck whose round 2 teaches
"end with a period". See §8 D2.

---

## 5–7 combined — the seven rounds, with the `sentence-builder` collision resolved

### 7. The collision — yes, real, and worse than pedagogical

`sentence-builder` sv is **`Krumelur bygger meningar`**, L.1.1.j, åk 2. Its slug is
`bygga-meningar-ordfoljd-stor-bokstav-och-punkt-ak-2` and its page title is
*"Bygga meningar — ordföljd, stor bokstav och punkt (åk 2)"*. Its nine rounds all
do the same thing: arrange four tiles, capital first, period last.

So the neighbouring sv activity already owns **word order + capital-first +
period-last, at åk 2** — and has claimed those keywords in its slug and title.
Shipping clinic rounds 1, 2 and 5 as briefed makes three of seven rounds a
duplicate, and puts two sv pages on this site competing for the same queries.

**Dropping them is not available** (`verify-fix-it-core.js` requires ≥7 rounds and
7 distinct actions; §A.13.60 requires ≥7 exercises). **Re-aim them instead** — and
the re-aim lands on two things Lgr22 names explicitly for åk 1–3 that *nothing
else in the sv catalogue teaches*:

| round | builder does | clinic sv does instead | Lgr22 åk 1–3 |
|---|---|---|---|
| 1 capitalize | capital on the **first** tile | **capital in a NAME**, mid-sentence | "stor och liten bokstav" |
| 2 insert-punct | period **last** | **frågetecken** — is this a telling sentence or a question? | "punkt, frågetecken och utropstecken" |
| 5 reorder | assemble a correct sentence | **repair an omvänd-ordföljd error** | "meningsbyggnad" |

⚠ **Round 1 has a trap.** If the sentence-initial word is *also* lowercase, there
are two defensible targets and the engine accepts one — a design-law violation and
a gate violation ("exactly one correct diagnosis target"). So the first word must
already be correct and only the **name** lowercase. `["Min","hund","heter","doris","."]`
has exactly one capitalisable candidate. Do **not** write *jag heter elsa*.

⚠ **SEO consequence:** the sv slug and page copy must key on *rätta meningar /
hitta felet / särskrivning / omvänd ordföljd / frågetecken*, **not** on the
builder's *bygga meningar / ordföljd, stor bokstav och punkt*.

### The seven rounds — ready to paste as `params.roundsL10n.sv`

```json
"sv": [
  { "id": "cap-start",   "band": 1, "action": "capitalize",   "tokens": ["Min","hund","heter","doris","."], "targetIndex": 3, "replacement": "Doris", "convention": "Namn börjar alltid med stor bokstav — hunden heter Doris.", "clean": ["Min","hund","heter","Doris","."] },
  { "id": "mark-end",    "band": 1, "action": "insert-punct", "tokens": ["Vill","du","leka"], "gapIndex": 3, "replacement": "?", "distractors": [".",","], "convention": "En mening som frågar något slutar med frågetecken.", "clean": ["Vill","du","leka","?"] },
  { "id": "swap-agree",  "band": 2, "action": "swap",         "tokens": ["Vi","spelar","fot boll","."], "targetIndex": 2, "replacement": "fotboll", "distractors": ["fotbol","fottboll"], "convention": "Två ord kan bli ett enda ord — ”fot” och ”boll” blir fotboll.", "clean": ["Vi","spelar","fotboll","."] },
  { "id": "fill-verb",   "band": 2, "action": "insert-word",  "tokens": ["Katten","mjölk","."], "gapIndex": 1, "replacement": "dricker", "distractors": ["grön","under"], "convention": "Varje mening behöver ett ord som talar om vad någon gör: katten dricker.", "clean": ["Katten","dricker","mjölk","."] },
  { "id": "order-svo",   "band": 3, "action": "reorder",      "tokens": ["läsa.","jag","ska","Nu"], "correctOrder": [3,2,1,0], "convention": "Börjar meningen med ett tidsord kommer ”ska” före ”jag”: Nu ska jag läsa.", "clean": ["Nu","ska","jag","läsa."] },
  { "id": "del-double",  "band": 3, "action": "delete",       "tokens": ["Jag","kan","att","simma","."], "targetIndex": 2, "convention": "Efter ”kan” behövs inget ”att” — Jag kan simma.", "clean": ["Jag","kan","simma","."] },
  { "id": "split-runon", "band": 3, "action": "split",        "tokens": ["Det","regnade","vi","stannade","inne","."], "seamIndex": 1, "convention": "Två tankar blir två meningar — punkt efter ”regnade” och stor bokstav på ”Det”.", "clean": ["Det","regnade",".","Vi","stannade","inne","."] }
]
```

⚠ **`split-runon` carries no `replacement` field on purpose.** The other six
locales author one (`"Es"`, `"Il"`, `"Hace"`…) and the engine **never reads it** —
`applyRepair` capitalises with `cap()` (`fix-it-core.js:143-146`). It is dead data
that can silently disagree with reality (§8 H6). Do not add one to sv.

### Measured, against the engine's own logic and the gate's own rules

I ran all seven through `applyRepair` / `diagnoseCorrect` / `repairOptions` /
`repairCorrect` exactly as `fix-it-core.js` implements them, plus every assertion
in `verify-fix-it-core.js`, plus two the gate lacks:

```
cap-start     capitalize    -> Min hund heter Doris .
mark-end      insert-punct  -> Vill du leka ?
swap-agree    swap          -> Vi spelar fotboll .
fill-verb     insert-word   -> Katten dricker mjölk .
order-svo     reorder       -> Nu ska jag läsa.
del-double    delete        -> Jag kan simma .
split-runon   split         -> Det regnade . Vi stannade inne .

rounds 7 · distinct actions 7 · distinct ids 7
ORACLE 7/7 · exactly one diagnosis target per round
blind-first-token 0/6 = 0.00  (< 1.00 required)
distractor ≠ replacement · distractor ≠ board token · no distractor visible on board
gapIndex ≤ tokens.length in both insert rounds
FAILURES: NONE
```

### Per-round notes a reviewer will want

- **cap-start.** *Doris* is a thoroughly ordinary Swedish dog name (retro human
  names for dogs are the norm: Doris, Sigge, Bella). Nothing else in the sentence
  is capitalisable. No proper noun anywhere else — that is the trap above.
- **mark-end.** *Vill du leka?* is unmistakably a question; `.` is a genuinely
  plausible wrong choice (it is the correct answer in the other six locales), and
  `,` mirrors the shipped cross-locale foil. ⚠⚠ **Never use `!` as a distractor
  here** — *Vi bakar bullar!* or *Vill du leka!* are defensible sentences and a
  child who picks it has written correct Swedish. No shipped locale uses it;
  keep it that way.
- **fill-verb.** `grön` / `under` mirror the German `grün` / `unter` exactly — a
  wrong-word-class pair, both plainly impossible in the slot.
- **split-runon.** The seam is unique: *Det regnade vi* / *…stannade. Inne* are
  both ungrammatical, so seam 1 is the only defensible cut. And sv is the **only**
  locale whose split round ends its second sentence with a period — see §8 D2 for
  the other six.

---

## 6. The `strings` block — sv

House style honoured: `”…”` U+201D on both sides (documented at
`affix-activity.js:146` and shipped in `calendar-wall.js`, `affix-activity.js`),
em dash with spaces, *Just det!* over a bare *Ja!*. Verbs match the shipped sv
register: **`Tryck på`** (not *Tippa*), **`Kontrollera`** (the shell's sv Check
label, `lcs-shell.js` CHROME), **`Nästan!`** (the shipped sv near-miss word in
`syllable-builder-activity.js:79` and `sentence-builder-activity.js`).

```js
title:        sv: 'Doktor Plumes meningsklinik',
instruction:  sv: 'Hjälp varje tilltrasslad mening att bli rätt igen. Tryck på Kontrollera när den ser bra ut.',
promptCap:    sv: 'Tryck på ordet som ska ha stor bokstav.',
promptPunct:  sv: 'Tryck på tecknet som avslutar meningen.',
promptSwap:   sv: 'Tryck på ordet som ser fel ut och välj sedan det rätta.',
promptInsert: sv: 'Tryck på ordet som passar i luckan.',
promptReorder:sv: 'Orden har hamnat i fel ordning — tryck på dem i rätt ordning.',
promptDelete: sv: 'Tryck på ordet som är för mycket.',
promptSplit:  sv: 'Tryck där de två meningarna krockar.',
alright:      sv: 'Det ordet är redan rätt — titta en gång till!',
giggle:       sv: 'Hi hi — nästan! Prova en gång till.',
soundsRight:  sv: 'Just det! Nu blev meningen rätt.',
hintCheck:    sv: 'Fortsätt hjälpa meningen — tryck sedan på Kontrollera.'
```

**Choices worth defending:**

- **`meningsklinik`, not `mottagning`.** Swedish children know *klinik* mainly from
  **djurklinik** — which is precisely the image: an owl treating poorly sentences.
  *Doktor Plume* in full rather than *dr Plume* (SAOL writes *dr* lowercase and
  unabbreviated-period-free; the full word is warmer for a child and unambiguous).
  *Doktor* is gender-neutral in Swedish, so nothing is lost against the feminine
  *Dott.ssa* / *Dra.* the Romance locales use.
- **`bli rätt` / `ser bra ut`, not `låta rätt`.** Four of the seven sv rounds are
  invisible to the ear (capital, frågetecken, särskrivning, and the reorder's
  written order). Keeping the sound frame would make the activity lie to a child
  who is listening. See §8 D1 — this is a defect the English already has.
- **`ser fel ut` in `promptSwap`** for the same reason: särskrivning is a *seen*
  error, not a heard one.
- **`promptReorder` deliberately diverges from `sentence-builder`**, whose sv
  strings are *"Lägg orden i rätt ordning"* / *"Tryck på orden i rätt ordning…"*.
  The clinic's version names a **fault** ("har hamnat i fel ordning"), which is the
  clinic's job, not the builder's.
- **`tilltrasslad`** (*trassel* — tangle) over *krånglig*; it is the child-warm
  Swedish for the German *verdreht* / Dutch *verdraaide*.
- **`lucka`** is the standard Swedish school word for a fill-in gap.
- **No `pronomen` / `subjekt` / `predikat` anywhere.** The seven convention lines
  use only *mening, ord, stor bokstav, punkt, frågetecken, namn, tidsord* — every
  one of which the Lgr22 åk 1–3 kursplan itself uses ("Språkets struktur med stor
  och liten bokstav, punkt, frågetecken och utropstecken…"). *Ordklasser* enter at
  åk 4–6, so *verb* is paraphrased as **"ett ord som talar om vad någon gör"**.
  ⓘ *sammansatt ord* is a term åk-2 teachers do use with children — it is available
  for the teacher-facing `page_intro`, but I kept it out of the child's line.

---

## 8. AUDIT — the engine, the English, and the shipped locales

Per your correction: I do **not** report "the convention names the answer" as a
copy defect. But see **B1** — there is a path where the convention is announced
*before* the child has solved the round, and only to screen-reader users. That
one still stands.

### A. Hard-coded English inside locale-branching paths

| id | where | finding |
|---|---|---|
| **A1** | `sentence-clinic-activity.js:185` | `s.setAttribute('aria-label', 'split here')` — **hard-coded English in all seven locales**, on the *sole* affordance of the split round. A Swedish child using a screen reader hears "split here". |
| **A2** | same line | **Every seam button carries the identical label.** In a button list they are indistinguishable, so an SR user cannot tell which seam is which. Should be e.g. `sätt punkt efter ordet ”regnade”`. |
| **A3** | `:59` | SVG `aria-label="Dr. Plume the owl"` — hard-coded English while `strings.title` is localised in all seven. |
| **A4** | `:51` | The `speechSynthesis` fallback ternary ends **`: 'en-US'`**. `sv` matches no branch, so a Swedish sentence is read by an **American English voice**. This is the "English default at the end of a locale ternary" class exactly. `da`/`no`/`fi` would inherit it. |
| **A5** | `:49` vs `:51` | The two ternaries know **different locale sets** (`nl` is handled in one and not the other). A maintenance trap even where the output happens to be right. |

### B. Screen-reader surface ≠ rendered surface

| id | where | finding |
|---|---|---|
| **B1** | `:306` | **`_giggle` announces `this.round.convention` — pre-solve.** Both *rendered* convention sites are `readOnly`-guarded (`:219`, `:252`), so a sighted child sees the rule only after succeeding. An SR child is told the rule on the **first wrong repair chip**, and in de that rule is literally *"…ein Kind rennt"* — the answer. Two children get two different games. Fix: announce a neutral retry line, or gate the convention on `readOnly` in the announce path too. |
| **B2** | `:303` vs `:306` | `_alright` (wrong **diagnosis**) announces no convention; `_giggle` (wrong **repair**) does. The asymmetry is undocumented and looks accidental. |
| **B3** | `:177` | **`sc-gap` is an unnamed empty `<span>`.** For both insert rounds an SR user hears "Katten mjölk." and three unattached option buttons — no indication a gap exists or where it is. ⭐ The sibling solved this: `sentence-builder-activity.js:278` sets `aria-label` from `emptySlotLabel()`, with **`EMPTY_SLOT.sv = 'tom ruta'` already authored**. |
| **B4** | `:236` | `sc-slot` (the reorder empty slots) — same omission, same available fix. |
| **B5** | `:300-301` | `_win` announces *"Now it sounds right"* and then `speak()`s the corrected sentence. **After the capitalize round the spoken output is acoustically identical to before the repair.** An audio-first child is told something changed that did not. |

### C. ⭐ A live data defect in a shipped locale

**C1 — `nl` `swap-agree` offers the child back the word they just condemned.**

```
tokens      ["Het","kind","rennen","snel","."]   targetIndex 2
replacement "rent"
distractors ["rennen", "ren"]     ← "rennen" IS tokens[2]
```

The Dutch child taps *rennen* as the fault, and one of the three offered repairs
is *rennen*. I swept all eight locale sets for this; **nl is the only one**, and it
is live. `verify-fix-it-core.js` checks `distractor !== replacement` but has no
rule for `distractor !== the board token`, and in any case never reads this file
(see E). Suggested nl replacement: `["rennt","rennen"]` → no; use `["rende","ren"]`
(past tense + imperative), but that is a Dutch panel's call, not mine.

### D. Frame and copy

| id | finding |
|---|---|
| **D1** | The deck is framed entirely on **sound** — `soundsRight` = *"Yes! Now it sounds right"*, `giggle` = *"Listen again!"*, `promptSwap` = *"the word that sounds wrong"*, the header comment's "sounds-right pulse". **Rounds 1 and 2 are purely orthographic in every locale**: a missing capital and a missing period are inaudible. The frame is false for 2 of 7 rounds today, before sv adds a third. |
| **D2** | **No `reorder` round in any locale ends with a period** — `en: ["The","dog","runs","fast"]`, `de: [… "schnell"]` — in a deck whose round 2 teaches "end a telling sentence with a period". The `split` rounds likewise leave their **second** sentence unterminated in all seven. The sv rounds above fix both for sv; the other six want the same. |

### E. ⭐⭐ The structural cause — no gate has ever seen a non-EN round

| id | where | finding |
|---|---|---|
| **E1** | `scripts/verify-fix-it-core.js:31-37` | The gate loads **`mini tools/fix-it-core.js`** and calls `Core.buildRounds()`. It never opens `sentence-clinic-activities.json`. So the ORACLE check, the exactly-one-diagnosis check, the ≥2-distractor check and the no-stored-answer check **all run against the English pilot only**. |
| **E2** | `scripts/local-test-sentence-clinic.js:55` | `const url = ...?lang=en&...` — **hard-coded**. |
| **E3** | — | Therefore **not one of the 42 shipped non-EN rounds has ever been executed or validated by anything.** C1 is what that costs. The fix is small: sweep `params.roundsL10n` through the same assertions, and add the two rules the gate lacks — `distractor !== tokens[targetIndex]` and `gapIndex <= tokens.length`. I ran exactly that sweep by hand for this review; apart from C1, all eight locale sets pass. |

### F. Silent-fallback traps (relevant to the sv build itself)

| id | where | finding |
|---|---|---|
| **F1** | `:346` | `(row.params.roundsL10n && row.params.roundsL10n[LANG]) \|\| row.params.rounds` — if the sv **slug** ships before the sv **rounds**, a Swedish page renders Swedish chrome around **English sentences**, with no error. |
| **F2** | `lcs-shell.js:80-84` | `t()` falls back to `entry.en`. The clinic's `strings` currently has **no `sv` key on any of its 13 entries** — so an sv launch without §6 is silently English, not visibly broken. |
| **F3** | `:174-181` | A `gapIndex` greater than `tokens.length` renders **no gap at all**; the round stays "solvable" (insert rounds start in `phase:'repair'`) but the child has no visible target. Degrades silently. All eight shipped sets are in range; sv above is in range. |

### G. A post-solve render bug in all seven locales, 2 of 7 rounds

**G1 — a solved insert round renders an empty pulsing gap inside the corrected
sentence.** `_win` sets `this._gapFilled = null` (`:296`) and then calls
`_renderCard()` (`:299`), while `this.tokens` already contains the inserted word
from `applyRepair`. The gap block at `:176` is **not** `readOnly`-guarded, so it
still appends an `sc-gap` — with `background`, an inset shadow and
`animation:scGlow` (`:386-387`), i.e. visible and moving:

```
The cat [◻ pulsing] drinks milk .        ← after solving fill-verb
The sun is hot [◻ pulsing] .             ← after solving mark-end
```

One-line fix: `if (isInsert && i === gapIndex && !this.readOnly)`. High confidence
from the code path; worth one screenshot before acting, per house rule.

### H. Dead code and latent traps

| id | finding |
|---|---|
| **H1** | `esc()` (`:34-38`) is defined and **never called** anywhere in the file. |
| **H2** | `_seed` is computed (`:132-133`) and never read. `_reorderTray` is assigned `null` and never used. |
| **H3** | `_setPose` (`:311`) collapses everything that is not `'happy'` to `'idle'`, so the three `_setPose('examine')` calls are **no-ops** — the "trouble cue is a soft thinking-GLOW" promised in the header comment never fires. |
| **H4** | `C.CREAM` and `C.WOOD` are declared and unused. |
| **H5** | `interp(this.api.t('giggle'), {})` (`:306`) — `giggle` carries no placeholders in any locale. |
| **H6** | **Two authored fields that nothing reads.** `replacement` on `split` rounds is authored in all seven locales and never consulted (`applyRepair` capitalises with `cap()`). `clean` is read by **no runtime path at all** — only by the EN-only gate. Either can drift out of agreement with what the engine actually produces, in any locale, with nothing to catch it. |
| **H7** | ⚠ **`_win`'s speak normalisation handles only `.` and `,`** (`:301`): `.replace(/ \./g,'.').replace(/ ,/g,',')`. It has no case for `?` or `!`. No shipped locale currently uses `?` as a `replacement`, so it is latent — **my sv round 2 (`Vill du leka?`) is the first round that would hit it**, and the spoken output would be *"Vill du leka ?"*, which several TTS engines will render without interrogative intonation. One-line fix in the activity file (not a core): `.replace(/ ([.,?!])/g, '$1')`. |

---

## Sequencing note

**H7 and G1 are prerequisites for the sv build**, not follow-ups: H7 because the sv
question-mark round triggers it, G1 because the sv deck ships two insert rounds
like everyone else. A1/A3 (the two hard-coded English aria-labels) and B3/B4 (the
unnamed gap and slot) are cheap and land in the same file — B3/B4 can copy
`EMPTY_SLOT.sv = 'tom ruta'` straight from the sibling. **C1 is a Dutch defect and
should be its own commit with a Dutch panel**, not folded into an sv build.
**E1–E3 is the one that stops the next C1** and is worth doing while this file is
already open.
