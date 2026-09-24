# Panel verdict — Swedish rebuild of L.1.1.c (Vera's Verb Match / `be-agreement-core`)

Panel: native Swedish K-3 läromedel content creator. **Revision 2** — rebuilt against the
per-round-cards correction. Everything below supersedes my first pass.

---

## 0. I accept the correction, and I withdraw my own headline rejection

My first pass rejected `stor / stort / stora` outright, on catalogue evidence: five shipped
Swedish maths decks (`beskriv-lang-hog-tung`, `jamfor-langder-hogre-kortare-langre`,
`vilket-tal-ar-storre`, `vilket-tal-ar-mindre`, `gor-lika-stora-delar`) have already trained the
child that *stor* means **compare this to a second thing** — and in an agreement round there is no
second thing.

**Under per-round cards that rejection no longer holds, and I withdraw it.** It was an argument
about the deck's *identity*: a single-adjective deck would have *been* the size deck, colliding
with five of ours on meaning and on search. As one triple in eight, `stor` is no longer the deck's
identity, and it is the canonical Swedish grammar example that adults actually search for. It goes
in, at round 1, as instructed.

**What survives of the argument, and I would hold this line:** choose round 1's *subject* so that
comparison is not invited. `Katten är stor` begs the question *bigger than what?* — a cat is only
big relative to something. `Björnen är stor` states an inherent property. The residual pull from
our own maths decks is real but harmless once the sentence contains nothing to compare against.

**The pedagogue is right and this is the stronger design.** Eight adjectives means there is nothing
to memorise, so any strategy that wins *is* the rule. That single change does more for the deck's
integrity than every anti-bot subject I engineered in revision 1 — see §4, where it dissolves the
problem I had spent that pass working around.

One thing from revision 1 still stands and belongs in the build notes: **keeping `är` visible and
unchanged in all eight rounds is the lesson, not a side effect.** A Swedish seven-year-old's whole
experience of verbs is that they never move. The deck shows `är` eight times, identical, while the
word after it changes three ways — the same contrast an English child gets from am/is/are, reached
from the opposite direction. That is the justification for not skipping the locale.

---

## 1. THE EIGHT ADJECTIVES

All eight are drawn from the verified-safe list, all eight are different — that difference *is* the
productivity claim, and it is the deck's whole case for existing alongside
`min-mitt-och-mina-ovning-svenska-ak-2`.

| round | adjective | class | cell |
|---|---|---|---|
| 1 | `stor / stort / stora` | plain `+t` | en |
| 2 | `grön / grönt / gröna` | plain `+t` | **ett — first neuter** |
| 3 | `gul / gult / gula` | plain `+t` | plural |
| 4 | `stark / starkt / starka` | plain `+t` | en |
| 5 | `mjuk / mjukt / mjuka` | plain `+t` | en |
| 6 | `varm / varmt / varma` | plain `+t` | ett |
| 7 | `röd / rött / röda` | **`-tt` doubling** | ett |
| 8 | `glad / glatt / glada` | **`-tt` doubling** | plural |

**Sequencing ruling honoured exactly:** bands 1–2 (rounds 1–6) are plain `+t` throughout; both
doubling triples sit in band 3; **the child's first neuter is `grönt`, a plain `+t`.**

Doubling triples: 2 of 8 — within the 2–3 cap. Only ONE of them is *tested* on the neuter
(`Bäret är rött`); on round 8 the doubling form `glatt` appears on a card but the answer is the
regular plural `glada`, so the alternation acts as a lure before it is ever required. For åk 2 that
is the right dose: the child meets the alternation once as a *notice this*, not as a drill.

### ⚠ A third alternation class the sequencing ruling does not name

"Doubling" is not one class, it is two, and mixing them teaches a false rule:

- **`röd → rött`, `glad → glatt`, `blöt → blött`, `vit → vitt`** — short vowel, consonant **doubles**.
- **`hård → hårt`, `god → gott`(≠), `bred → brett`(≠)** — ⚠ `hård → hårt` **deletes** the `d` with
  **no** doubling, because the vowel is long. It *looks* like a plain `+t` and is not.

A deck containing both `rött` and `hårt` teaches "sometimes it doubles, sometimes it doesn't" with
no visible cause. **This deck uses only the `-tt` class.** `hård` is rejected outright (§5).

---

## 2. THE EIGHT ROUNDS

⚠ `before` and `after` are **exact** — no leading or trailing spaces. The renderer
(`vera-verb-match-activity.js:96,98`) already adds one on each side; all six shipped locales got
this wrong and render a double space. Swedish will not.

| band | id | `subject` | `before` | `after` | `cards` | `correct` |
|---|---|---|---|---|---|---|
| 1 | `bjornen-stor` | Björnen | `Björnen är` | `när han står upp.` | stor · stort · stora | **stor** |
| 1 | `graset-gront` | Gräset | `Gräset är` | `överallt i ängen.` | grön · grönt · gröna | **grönt** |
| 1 | `blommorna-gula` | Blommorna | `Blommorna är` | `vid stigen.` | gul · gult · gula | **gula** |
| 2 | `vinden-stark` | Vinden | `Vinden är` | `nere vid sjön.` | stark · starkt · starka | **stark** |
| 2 | `palsen-mjuk` | Pälsen | `Pälsen är` | `att klappa.` | mjuk · mjukt · mjuka | **mjuk** |
| 2 | `boet-varmt` | Boet | `Boet är` | `inuti.` | varm · varmt · varma | **varmt** |
| 3 | `baret-rott` | Bäret | `Bäret är` | `på busken.` | röd · rött · röda | **rött** |
| 3 | `bina-glada` | Bina | `Bina är` | `när solen skiner.` | glad · glatt · glada | **glada** |

Renders as:

> *Björnen är **stor** när han står upp.* · *Gräset är **grönt** överallt i ängen.* ·
> *Blommorna är **gula** vid stigen.* · *Vinden är **stark** nere vid sjön.* ·
> *Pälsen är **mjuk** att klappa.* · *Boet är **varmt** inuti.* ·
> *Bäret är **rött** på busken.* · *Bina är **glada** när solen skiner.*

All eight are **predicative** and all eight take the **indefinite (strong)** form regardless of the
subject's definiteness — `Björnen är stor`, never *`Björnen är stora`. No attributive form appears
anywhere on screen.

### ⚠⚠ The tail rule that makes the attributive ban enforceable

Two independent reasons every `after` must be checked, not just written:

**(a) Nothing in the tail may itself agree.** *"Blommorna är ___ och stora"* hands the answer over —
`stora` announces the plural before the child has looked at the subject. This also kills the entire
`som en / som ett` simile frame, since the article would announce the gender. Every tail above is
an adverb (`inuti`, `överallt i ängen`), a prepositional phrase (`på busken`, `vid stigen`), an
infinitive (`att klappa`) or a subordinate clause (`när han står upp`) — none contains an adjective,
an article, or an agreeing pronoun.

**(b) ⭐ No tail may begin with a bare noun — otherwise the plural card reads as attributive.**
For **every** adjective in Swedish, the plural form is homographic with the definite/attributive
singular: `stora` is both *"Bilarna är stora"* and *"den stora bilen"*. So the `-a` card is the one
card that actively invites the reading constraint 1 bans. `Blommorna är ___ vid stigen` cannot be
misparsed; `Blommorna är ___ solrosor` could be. Starting every tail with a preposition, adverb,
infinitive marker or conjunction makes the attributive reading **structurally unavailable** rather
than merely discouraged.

⚠ `after` may also never be bare punctuation. A Swedish predicative adjective normally ends the
clause — *"Björnen är stor."* — so the obvious `after` is `"."`, which the renderer would print as
`stor .`. Every round therefore needs a genuine tail, and each has a purpose-built one.

---

## 3. WHY EACH SUBJECT'S GENDER AND NUMBER IS CERTAIN

Every subject is **definite**, per constraint 2 — `En bil är ___` would print the answer, because
the article announces the gender before the child reads anything.

| round | evidence available to the child |
|---|---|
| **Björnen** | `en björn → björnen`. Animals a child names are overwhelmingly en-words; björn is among the most certain, and it is the first animal in every Swedish picture book. |
| **Gräset** | `ett gräs → gräset`. A mass noun the child has only ever heard in the definite, so they have never had to decide the gender — the safest possible **first neuter**. |
| **Blommorna** | `en blomma → blommor → blommorna`. `-orna` can only be plural definite. No gender question arises, which is why it opens the plural card. |
| **Vinden** | `en vind → vinden`. Weather nouns split, but *vinden* is heard daily and never as *vindet*. |
| **Pälsen** | `en päls → pälsen`. Vera's world; the child has heard *mjuk päls* before meeting it here. |
| **Boet** | `ett bo → boet`. ⚠ vowel-final ett-word, so the definite is `-et` on a one-syllable stem — a slightly harder read than `gräset`, which is why it sits at band 2 rather than band 1. |

### The two band-3 rounds

**`Bäret` → `rött`.** `ett bär` is a genuine gender trap: children reach for *en bär* by analogy
with the countable fruit they know, and must trust the `-et` they can see. It is also the round
where the `-tt` doubling is actually **required**, not merely displayed — the child must reject the
plain-`+t` shape their first six rounds taught them and take `rött`. That is the deck's single
hardest moment and it is placed last-but-one, correctly.

**`Bina` → `glada`.** ⭐⭐ `ett bi → biet → bin → **bina**`. Two things make this the ceiling round:

1. **It is an ett-word in the plural, so it proves the gender collapse.** Every other plural in the
   deck comes from an en-word. This is the only round that shows the child that in the plural the
   *same* `-a` card serves both genders — the half of the rule the other seven rounds cannot teach.
2. **Its plural suffix is outside the pattern band 1 hands over.** A child who extracted
   *"-arna / -erna / -orna → the -a card"* from `Blommorna` has **no rule** for `-na`. They must
   generalise rather than pattern-match. See §4.

⚠ **`Bina` and constraint 3.** The ban is on ett-word plurals ending in **`-en`** — `husen`,
`borden`, `barnen`, `molnen`, `träden`, `djuren` — because `-en` is written identically to an
en-word singular definite (`katten`, `björnen`), making the child's gender cue ambiguous. I have
honoured that ban in full; none of those forms appears. `bina` ends in `-na` and collides with
**nothing**: no en-word singular definite ends in `-na` (they end `-n` after the stem vowel:
`björnen`, `blomman`, `pälsen`). The reason for the ban does not reach this form, so the form is
safe — and it is the only route left to the gender-collapse lesson.

---

## 4. CELL BALANCE, AND WHY THE SUFFIX RULE IS NO LONGER A CHEAT

**3 en / 3 ett / 2 plural, exactly as ruled:**

| cell | rounds | count |
|---|---|---|
| en-form | Björnen `stor`, Vinden `stark`, Pälsen `mjuk` | **3** |
| ett-form | Gräset `grönt`, Boet `varmt`, Bäret `rött` | **3** |
| plural | Blommorna `gula`, Bina `glada` | **2** |

Bands 1/1/1/2/2/2/3/3 ✓. Band 1 shows one of each cell; band 2 revisits en ×2 and ett ×1; band 3 is
the ett gender-trap plus the plural ceiling.

### Every subject-blind strategy, measured

| strategy | score |
|---|---|
| always tap the **bare stem** card (the en-form) | 3/8 = **37.5 %** |
| always tap the **`-t`** card | 3/8 = **37.5 %** |
| always tap the **`-a`** card | 2/8 = **25 %** |
| always the same **string** | 1/8 — *dead*, all eight adjectives differ |
| always the same **position** | chance — the row is reshuffled every render |
| always the **longest** card | ⭐ **0 %** — see below |

All ≤ 37.5 %, under the 45 % ceiling, and **no morphological strategy beats one third**, which is
exactly what the cell balance was ruled for.

⭐ The longest-card strategy scores a clean zero, and it does so **in all eight triples at once**:
`stor 4 / stort 5 / stora 5` · `grön 4 / grönt 5 / gröna 5` · `gul 3 / gult 4 / gula 4` ·
`stark 5 / starkt 6 / starka 6` · `mjuk 4 / mjukt 5 / mjuka 5` · `varm 4 / varmt 5 / varma 5` ·
`röd 3 / rött 4 / röda 4` · `glad 4 / glatt 5 / glada 5`. In every case the neuter and the plural
**tie** for longest, so no form is ever *uniquely* longest and `longHits` can never increment. This
is a property of Swedish adjective morphology, not of my selection — it holds for every regular
adjective, and it is worth knowing that this deck gets that ceiling for free.

The bare stem is always uniquely shortest, so the shortest-card score is exactly the en-cell count:
**3, the cap**. That is the one ceiling with no headroom — any future round added to the en cell
breaches it.

### ⭐⭐ The one that matters: "read the ending and map it" is now the objective, not the exploit

The dangerous strategy in revision 1 was the one-rule generaliser:

> **R1:** subject ends `-en/-n` → tap the bare stem; ends `-et/-t` → tap the `-t` card;
> ends `-arna/-erna/-orna` → tap the `-a` card.

Under one adjective, R1 was a genuine cheat, because a child could *also* win by memorising three
strings — so R1 and competence were indistinguishable from the outside, and I spent revision 1
engineering a round where R1 fails.

**Per-round cards dissolve that.** With eight different adjectives there is nothing to memorise: a
child who scores 8/8 has applied a rule to eight words, five of which they have never seen inflected
before. **R1 *is* the productive rule the pedagogue asked for.** It is the same thing an English
child does with the `-s` on *"The dogs are"*.

⚠ **The honest cost of constraint 3, on the record.** Banning `-en` ett-plurals removes the only
round type where the naive suffix map is *wrong*, so R1 scores 7 of 8 here rather than 6. I think
the ban is correct — an ambiguous gender cue at first exposure makes the rule unlearnable, and åk 2
is first exposure — but the consequence should be recorded rather than discovered later.

**The remaining 1 of 8 is `Bina`**, whose `-na` is outside the `-arna/-erna/-orna` pattern band 1
teaches. It is the only round that separates a child who has generalised from a child who is
pattern-matching, and it is the reason it must not be dropped or replaced with a third `-orna`
plural.

---

## 5. REJECTIONS

**Withdrawn**

0. ⭐ **`stor / stort / stora` — REJECTION WITHDRAWN.** Correct for a single-adjective deck (it
   would have *been* the size deck, colliding with five shipped maths decks on meaning and on
   search); wrong for a per-round deck, where it is one triple in eight and the highest-volume
   query an adult types. Retained mitigation: an inherent-size subject (`Björnen`), never a
   comparable one.

**Adjectives**

1. ⭐ **`kall / kallt / kalla` — REJECTED for the first-neuter round; allowed from band 2 on.**
   Every Swedish child has **`Det är kallt`** stored as an unanalysed chunk, where `kallt` is
   neuter *impersonally* — not because any noun is an ett-word. If the child's first neuter is
   `kallt`, the rule they form is *"say kallt when it feels like weather"*, which is precisely the
   rule the deck exists to replace. Round 2 went to `Gräset är grönt` instead: plain `+t`,
   unarguably true, and stored nowhere. The same objection, weaker, is why `varm` sits at round 6
   rather than round 2 — `Boet är varmt` forces the match in a way `Det är varmt` never did.

2. ⭐ **`hård / hårt / hårda` — REJECTED outright, not merely deferred to band 3.** `hård + t`
   **deletes** the `d` (`hårt`, not *hårdt*) with **no doubling**, because the vowel is long. It is
   a third alternation class, invisible to the plain-`+t` / `-tt` split the sequencing ruling is
   built on. A deck containing both `rött` and `hårt` teaches "sometimes the consonant doubles,
   sometimes it vanishes" with no visible cause — worse than teaching neither.

3. ⭐ **`ny / nytt / nya` — REJECTED on two counts, the second of which applies to every adjective.**
   (a) The stem is a single vowel-final syllable, so `ny → nytt` is the most opaque alternation on
   the list. (b) ⭐ `nya` is the form a child meets constantly in *"den nya bilen"* — the
   **attributive** use constraint 1 bans from the screen. This is worth generalising: the plural
   card is homographic with the definite attributive for *every* adjective, so it is always the
   card most likely to be read attributively, and `ny` is the adjective where the attributive
   reading is the child's dominant one. Hence the tail rule in §2(b).

4. ⭐ **`full / fullt / fulla` — REJECTED, and it is on the verified-safe list.** `full` in
   colloquial Swedish means *drunk*, and `fulla` in the plural admits essentially no other reading
   for an adult glancing at a child's screen. Not a grammar problem; a publishing one, of exactly
   the same class as the `ren` = reindeer and `tunga` = tongue exclusions already made.

5. **`smutsig`, `hungrig`, `rolig` — REJECTED (soft).** Grammatically impeccable and genuinely
   safe, but `smutsiga` / `hungriga` / `roliga` are four syllables at åk 2. They add decoding load
   to a deck whose difficulty must sit entirely in the ending. Held in reserve for a band-4
   extension.

**Subjects**

6. ⭐ **`Husen`, `Barnen`, `Molnen`, `Träden`, `Djuren` — REJECTED per constraint 3**, in full. In
   revision 1 `Djuret / Djuren` was my centrepiece — a minimal pair one letter apart taking
   different cards, mirroring the English deck's own `The dog / The dogs`. It is dead, and correctly
   so: `Djuren` and `Björnen` carry the same written suffix, so at first exposure the cue is
   ambiguous and the child cannot form the rule at all. The cost is recorded in §4.

7. ⭐ **`Bollen`, `Äpplet`, `Mössan`, `Paraplyet`, `Vantarna` — REJECTED on the fence.** All five are
   the exact subjects of `min-mitt-och-mina-ovning-svenska-ak-2` (L.1.1.d), which drills the **same
   en/ett/plural axis** on possessives. Reusing them would let a child who did Sigge's deck answer
   ours from **memory of the noun** rather than from the rule — which would defeat the productivity
   argument that got this deck approved in the first place.

8. ⭐ **`Mattan` — REJECTED**, despite *mjuk matta* being a perfect collocation. `matta` is a
   deliberate **foil** in the shipped `ord-som-hor-ihop-ordbildning-ak-2` (Salvia's word garden:
   `mat → matta` is one of the traps). A word one deck has marked as a trap should not be a correct
   subject in another.

9. ⭐ **`Snön` — REJECTED for a reason that reads like the opposite of a problem.** `en snö → snön`
   is correct, but children meet snow as bare `snö` and as `Det är snö` / `Det snöar`; the definite
   `snön` is rare in child speech and its gender is genuinely uncertain at seven. The deck depends
   on the subject's gender being **certain** — an uncertain subject silently converts a grammar
   round into a vocabulary guess, and the child then fails for a reason the activity is not
   teaching and cannot diagnose.

10. **`Håret` — REJECTED (marginal).** `ett hår` is correct and *mjukt hår* is real, but `hår`
    wobbles between mass and count for a child (*ett hår* = one strand). No round should have the
    child quietly resolving a countability question underneath the agreement one.

---

## 6. PUBLIC COPY

**`slug.sv`**
```
boja-adjektiv-en-ord-ett-ord-stor-stort-stora-ak-2
```
Sibling shape `<concept>-<concrete example>-ak-2`, matching
`plural-av-substantiv-fot-blir-fotter-ak-2` and `verbets-tempus-datid-nutid-framtid-ak-2`. Carries
both search clusters — the rule (*böja adjektiv*, *en-ord*, *ett-ord*) and the canonical trio.
Contains none of the spent tokens (`sortera`, `kategori`, `hör ihop`, `ordbildning`, `ordfamilj`,
`grupp`). ⚠ It does contain `stor`, which I flagged in revision 1 as colliding with
`vilket-tal-ar-storre` and `gor-lika-stora-delar` — that is now acceptable, because
*"böja adjektiv stor stort stora"* is unmistakably a grammar query and cannot be confused with a
number-comparison one. Note `stor-bokstav` is already a token in
`bygga-meningar-ordfoljd-stor-bokstav-och-punkt-ak-2`, so `stor` is not reserved.

**`page_title.sv`**
```
Böja adjektiv: en-ord eller ett-ord? stor, stort, stora (åk 2)
```
*Böja adjektiv* is what a Swedish teacher actually types. Naming the trio follows the de and nl
siblings (*"bin, ist, sind"*, *"ben, is, zijn"*) and is the query. Ends with the year band. 61
characters — the keyword leads, so an overflowing distinguisher is the accepted trade.

Variant without the trio, if the operator would rather round 1's card set never appear on a public
surface: `Böja adjektiv – en-ord, ett-ord och flera: övning för åk 2` (55).

⚠ **Why naming the trio in the title does not break the give-away rule.** The rule bars the intro
from *describing a round's sentence and its three cards*; the English intro's failure is that it
states the **mapping** — *"AM with I, IS with one (the dog, she, it), and ARE with many"* — which
hands the child a solved round. A title naming three forms with no sentence and no mapping leaves
the child still having to decide which of the three fits `Björnen är ___ när han står upp`. The
intro below names neither a sentence nor a mapping nor a card.

**`page_intro.sv`**
```
Sorken Tuva går genom ängen och hittar något nytt vid varje steg. Barnet läser en
mening där ett ord saknas och trycker på den form av adjektivet som passar
substantivet: en-ord, ett-ord eller flera. Åtta meningar med åtta olika adjektiv,
i ny ordning varje gång. Årskurs 2, Lgr22.
```

Deliberate omissions, each one a rule rather than an oversight:
- **no CCSS code** — Lgr22 only, per the framework-name doctrine;
- **no round given away** — no sentence, no card, no mapping;
- **no free / no-account claim** — nothing about *gratis*, *kostnadsfritt*, *utan registrering* or
  *fri tillgång*;
- ⚠ **no `uppläsning` claim.** The sibling intros promise *"med uppläsning"*. Do **not** copy that
  here until the audio defect in §8(b) is fixed — the Swedish sentences would be read aloud by an
  American voice, and the intro would be advertising it.

⭐ *"Åtta meningar med åtta olika adjektiv"* is the productivity claim, stated adult-facing. It is
the sentence that distinguishes this deck from `min/mitt/mina` on a search-results page, and it is
literally true only because the cards are per-round — so it is worth keeping even if the intro is
tightened elsewhere.

**Year band — åk 2, decided on a code fact rather than on Lgr22.** Lgr22 states *centralt innehåll*
once for the whole åk 1–3 band, so it cannot pick a year; the progression and the catalogue can.
The sibling on the **identical grammatical axis** — `min-mitt-och-mina-ovning-svenska-ak-2`,
en/ett/plural on possessives — is placed at åk 2, and so are all seven other Swedish literacy decks.
Same axis, same placement.

---

## 7. THE CHARACTER — `Sorken Tuva`

Vole = **sork** (`fältsork` is the meadow species). I recommend renaming from *Vera*.

**Proposal: `Tuva`.**

- **`en tuva` is the grass tussock a field vole actually lives in.** The name and the animal are the
  same picture — and with this round set (`Gräset`, `Blommorna`, `Bina`, `Bäret`, `ängen`,
  `stigen`) the whole deck is that meadow. No other candidate does this.
- It is a **top-100 Swedish girls' name**, so it reads as a *name* first and a meadow word second —
  exactly the pattern the catalogue already shipped and accepted with **`Sköldpaddan Salvia`**
  (sage, a plant).
- **Ends in `-a`, like Vera**, so the shared vole art still reads as the same character across
  locales.

**What I checked it against:**

1. **The answer cards** — all 24 forms across the eight triples: *stor, stort, stora, grön, grönt,
   gröna, gul, gult, gula, stark, starkt, starka, mjuk, mjukt, mjuka, varm, varmt, varma, röd, rött,
   röda, glad, glatt, glada*. No overlap. This is the check that forced a rename on a previous
   build, and per-round cards make it a **24-form** check rather than a 3-form one — worth
   re-running against any adjective substituted later.
2. **Every character name shipped in Swedish**, harvested from all `page_title.sv` /
   `page_intro.sv`: *Tore, Tess, Bult (roboten), Kapten Quill, Hopper, Mätis, Snäckis, Alva, Olga,
   Ebba, Sigge, Salvia, Doktor Fjäder, Tilly, Mim, Kurre (ekorren), Lily (grodan)*. `Tuva` is
   absent. Tore / Tess / Tilly share the initial but are all maths decks and none is a rodent.
3. **The eight round subjects.** `tuva` appears in none, and must not — see the constraint below.
4. **Mechanical / mathematical connotation**, which retired my first choice. **`Vippa`** kept Vera's
   V and evoked a vole's twitching nose, but `vippa` is the verb *to see-saw / wobble*, and we ship
   `likhetstecknet-sant-eller-falskt-balansvag-ak-1` — a balance-scale deck. A literacy character
   named after the motion of a maths deck's apparatus is an avoidable adjacency. **`Sippa`**
   (anemone — *blåsippa*, *vitsippa*) was the runner-up and is lovely, but shares an initial with
   **both** *Sigge* and *Salvia*, the two nearest literacy neighbours.
5. **Swedish children's culture.** I can confirm no collision inside this catalogue. I cannot verify
   external titles from here and will not claim otherwise — `Tuva` is a plain, common, unbranded
   Swedish given name, which is the safest class there is, but a quick external check before ship
   costs nothing.

⚠ **Standing constraint for anyone adding a ninth round later:** because `tuva` is also a common
noun, **the character must never be a round subject.** *"Tuva är ___"* is parseable as *"the tussock
is ___"*. My eight rounds do not use her, so this is enforced by construction today — write it down,
because it is exactly the class of thing added later by someone who has not read this file. The
Italian deck already uses `Vera` as a round subject, so the temptation is live.

---

## 8. ⚠⚠ THREE CODE DEFECTS THE CONTENT PANEL FOUND — none is a content question

**(a) ⭐⭐ The per-round `cards` hook is at TWO call sites, not one — and patching only the obvious
one silently mis-grades every round.**

`setupTask` (line 79) is the display path:

```js
var _lf = FORMS_L10N[LANG]; if (_lf) this.view.choices = _lf.map(...);
```

But grading runs through a **second, independent** lookup at line 32–33:

```js
function vvmForms() { return FORMS_L10N[LANG] || Core.FORMS; }
function vvmGrade(round, id) { return vvmForms()[id] === round.correct; }
```

Patch `setupTask` alone and the child is **shown** `round.cards` while the grader indexes
`FORMS_L10N['sv']` — two different arrays, so tapping the correct card is marked wrong (and, worse,
a wrong card can be marked right whenever the indices happen to line up). Both sites need the same
fallback:

```js
function vvmForms(round) { return (round && round.cards) || FORMS_L10N[LANG] || Core.FORMS; }
function vvmGrade(round, id) { return vvmForms(round)[id] === round.correct; }
// setupTask:
var _lf = vvmForms(round); if (_lf) this.view.choices = _lf.map(function (f, i) { return { id: i, word: f }; });
```

This stays entirely in the activity layer — **0 lines to `be-agreement-core.js`**, 0 to
`lcs-shell.{js,css}`.

**(b) The gate has never read a non-English pool — and per-round cards make it worse.**
`scripts/verify-be-agreement-core.js:31`:

```js
const rounds = manifest[0].params.rounds || [];
```

`params.roundsL10n` is never touched. The de / fr / es / pt / it / nl pools — **48 rounds** — have
had **zero assertions** run against them, and Swedish will be the seventh unless this changes. It is
worse than vacuous: `be-agreement-core.js` hard-codes `var FORMS = ['am','is','are']`, so
`Core.facts().correctValid`, `Core.oracle()` and all of `deckFacts()` are computed against the
English forms. Pointed at the Swedish pool as written, the gate would fail all eight rounds for the
wrong reason (`correct "stor" not am/is/are`) and report `positionBot 100 %`.

I measured the six shipped pools by hand: **all six happen to clear the 45 % ceilings** (every one
lands at 37.5 % fixed-guess). So the vacuous gate has not shipped a defect **yet** — that is luck,
not enforcement.

⭐ **Per-round cards change what the gate must compute.** `shortestBot` and `longestBot` are
currently derived from one module-level triple; with per-round cards they must be measured **within
each round's own `cards` array**, or they are meaningless. For this pool the correct answers are
shortest 3/8, longest 0/8 (§4) — a gate computing them against a single triple will not reproduce
those numbers. `fixedGuessBot` also needs re-reading: with eight distinct adjectives the
`max(count of identical correct string)` is 1/8 and always passes, so the metric that actually
binds is **the cell balance** (3/3/2 by morphological class), which nothing currently measures.

**Fix before the Swedish pool is authored:** iterate `params.rounds` plus every key of
`params.roundsL10n`; take the triple from `round.cards || FORMS_L10N[locale]`; and add a
cell-balance assertion over the en/ett/plural classification. Until then, the 3/3/2 split, the
2-doubling cap and the plain-`+t`-first-neuter sequencing above are standards **I imposed on
myself** — not ones the build can check.

**(c) Swedish will be read aloud by an American voice.**
`vera-verb-match-activity.js:37` — the language ternary runs `de → fr → es → pt → it → nl →
'en-US'`, with **no `sv` branch**, so `LANG === 'sv'` falls through to `'en-US'`. Add
`LANG === 'sv' ? 'sv-SE'`. Until it is in, keep the word *uppläsning* out of `page_intro.sv` — the
sibling intros promise it and this deck could not honour it.

---

## 9. Paste-ready

```json
"sv": [
  { "id": "bjornen-stor",   "band": 1, "subject": "Björnen",   "before": "Björnen är",   "after": "när han står upp.",  "cards": ["stor","stort","stora"],    "correct": "stor"  },
  { "id": "graset-gront",   "band": 1, "subject": "Gräset",    "before": "Gräset är",    "after": "överallt i ängen.",  "cards": ["grön","grönt","gröna"],    "correct": "grönt" },
  { "id": "blommorna-gula", "band": 1, "subject": "Blommorna", "before": "Blommorna är", "after": "vid stigen.",        "cards": ["gul","gult","gula"],       "correct": "gula"  },
  { "id": "vinden-stark",   "band": 2, "subject": "Vinden",    "before": "Vinden är",    "after": "nere vid sjön.",     "cards": ["stark","starkt","starka"], "correct": "stark" },
  { "id": "palsen-mjuk",    "band": 2, "subject": "Pälsen",    "before": "Pälsen är",    "after": "att klappa.",        "cards": ["mjuk","mjukt","mjuka"],    "correct": "mjuk"  },
  { "id": "boet-varmt",     "band": 2, "subject": "Boet",      "before": "Boet är",      "after": "inuti.",             "cards": ["varm","varmt","varma"],    "correct": "varmt" },
  { "id": "baret-rott",     "band": 3, "subject": "Bäret",     "before": "Bäret är",     "after": "på busken.",         "cards": ["röd","rött","röda"],       "correct": "rött"  },
  { "id": "bina-glada",     "band": 3, "subject": "Bina",      "before": "Bina är",      "after": "när solen skiner.",  "cards": ["glad","glatt","glada"],    "correct": "glada" }
]
```

Card order in every triple is **[en-form, ett-form, plural]**, mirroring `[am, is, are]` and the six
shipped locales. The row is shuffled at render, so the order is a convention for the grader and the
gate, not a display order.

```
slug.sv        boja-adjektiv-en-ord-ett-ord-stor-stort-stora-ak-2
page_title.sv  Böja adjektiv: en-ord eller ett-ord? stor, stort, stora (åk 2)
page_intro.sv  Sorken Tuva går genom ängen och hittar något nytt vid varje steg. Barnet läser en mening där ett ord saknas och trycker på den form av adjektivet som passar substantivet: en-ord, ett-ord eller flera. Åtta meningar med åtta olika adjektiv, i ny ordning varje gång. Årskurs 2, Lgr22.
```
