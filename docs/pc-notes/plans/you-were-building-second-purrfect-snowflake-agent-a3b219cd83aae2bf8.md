# sv `vera-verb-match` rebuild — NATIVE SWEDISH LINGUIST PANEL (read-only audit)

Panel 1 of 3. Verdict: **the predicative-adjective rebuild is CORRECT. Ship it.**
But three of the six answers change the build, and I found six defects in the shipped
source — one of which makes the deck's own quality metrics meaningless in all six
non-English pools.

---

## 1. THE PREMISE — correct, but restate it

**"Swedish has no subject–verb agreement" is true and should be narrowed to: the FINITE
VERB does not agree.** Swedish has a rich agreement system; it lives on the ADJECTIVE,
the DETERMINER and the PARTICIPLE. That is the strongest possible framing for this
rebuild — it is not a substitute lesson, it is the same feature (gender + number
concord) relocated to the word class that actually carries it in Swedish.

`jag är / du är / han är / vi är / ni är / de är`. Same for every verb
(`jag springer / vi springer`). `fixedGuessBot` = 8/8. Measurement confirmed.

**Residues a Swedish 7-year-old actually meets — the honest list:**

| Residue | Live for a child? | Ruling |
|---|---|---|
| `Vi äro musikanter` (children's song) | ⭐ **YES** — still sung in förskola/skola | The ONE live plural verb form. A teacher may raise it. |
| Elsa Beskow reprints (1901–1918) | Possibly (`voro`, `hade`) — modern editions largely modernised | Mention, hedge |
| Plural forms `äro/hava/voro/gingo/kommo` | No — dropped from written Swedish 1945 (TT/DN), out of SAOL 1950 | Historical only |
| `vore` (`Det vore roligt`) | Yes, fully live | **NOT agreement** — mood (optative/subjunctive), invariant for person AND number (`jag vore / vi vore`) |
| `vare` (`Gud vare med er`) | Frozen phrases | Same — invariant optative |
| Älvdalska (Övdalian), some Ostrobothnian dialects | No | ⚠ genuinely retain person/number agreement (`wið kumum`). The honest exception if someone says "no Swedish variety". Often classed a separate language. |

**Do not put `var/vore` in the deck.** It is mood, not agreement, and it introduces
nothing the child can act on.

---

## 2. PREDICATIVE ADJECTIVE — ENDORSED, with two hard constraints

### It is the right axis
Alternatives considered and rejected:
- tense of `vara` (`är/var/ska bli`) → **collides with sv #25 Junipers tidstorn (L.1.1.e)**
- V2 word order → syntax not agreement; collides with Krumelur (L.1.1.j); not a 3-card shape
- `en/ett` article → 2 cards only, and it is a determiner (closer to #24 than the adjective is)
- past participle `målad/målat/målade` → same 3-way morphology, but passive voice = åk 3–4

**Predicative wins**: three forms, deterministic function of (gender, number), keeps `är`
on screen as the pivot, no collision with anything shipped.

### CONSTRAINT A — predicative ONLY. Never mix in attributive.
They are the same feature system through **two different paradigms**:
- **Predicative** = the STRONG paradigm only, and it is **insensitive to definiteness**:
  `Bilen är stor` — definite subject, STRONG form.
- **Attributive** = a strong/weak alternation: `en stor bil` / **`den stora bilen`**.

So `bilen` takes `stor` predicatively and `stora` attributively, with **no visible cue on
the noun**. Mixing them in one deck is a genuine pedagogical error. Predicative is also
the cleaner half — pure (gender, number), no definiteness variable.

### CONSTRAINT B — differentiate hard from sv #24 (`min/mitt/mina`, pronoun deck, åk 2)
Same abstract feature system; **different word class, position, paradigm and dependency
direction.** It is NOT the same lesson twice, but it will LOOK like it unless the build
leans on all four differences:

1. **Direction.** #24 looks RIGHT at a following head noun (`min ___boll`). This looks
   LEFT, across `är`, at the SUBJECT. That is what makes it a subject-agreement task and
   is the whole of L.1.1.c.
2. **Definite + pronoun subjects.** `min` structurally cannot take one (`*min bollen`).
   This deck's subjects are `Bilen / Huset / Bilarna` — a space #24 cannot enter.
3. **Determiner vs adjective.** `min` is a determiner and never enters the strong/weak
   alternation at all.
4. ⭐ **Subject inventory is the visible lever.** #24 uses possessable objects
   (boll, äpple, mössa, paraply, vantar). **This deck must NOT.** Use animals, weather,
   places, the character's world — `Katten är trött`, `Vattnet är kallt`,
   `Björnarna är stora`. Reuse `bollen/äpplet/mössan` and a teacher sees redundancy.

### CONSTRAINT C — the ett-form is the pedagogical centre
`*Huset är stor` is the real, attested Swedish child/L2 error. The en-form and the plural
are comparatively easy. Band structure should reflect this: **ett-rounds carry the load.**

---

## 3. FORM INVENTORY — the exclusion rule first, then the table

### ⭐ THE ONE RULE
**An adjective is unusable in a 3-card deck iff its en-form and ett-form are identical.**
That happens whenever the stem already ends in a **consonant + t**:
`-t` after a consonant, `-tt`, `-st`, `-nt`, `-rt`, `-kt`.
→ `trött, lätt, mätt, svart, kort, tyst, exakt` are all dead the same way.

Four further exclusion classes that are *deck-legal* (3 distinct forms) but *teach the
wrong rule*, and must be excluded on pedagogy:
- **suppletive / syncopating**: `liten/litet/små`, `gammal/gammalt/gamla`
- **`-en` class**: `ledsen/ledset/ledsna`, `öppen/öppet/öppna`, `mogen/moget/mogna`
  (plural drops the `e` — a child who learned `stor→stora` produces `*ledsena`)
- **vowel-final with variable plural**: `blå/blått/blå~blåa`, `grå`, `rå` — **two right
  answers** ⚠ (the sv #25 trap again). `ny/nytt/nya` and `fri/fritt/fria` are FIXED → safe.
- **`-sk`**: known variation in the neuter for nationality/character adjectives. No
  child-level word needs it. Avoid the class entirely.
- **invariables**: `bra, sakta, äkta, öde` → three identical cards.

### The operator's 29, ruled

| Adj | en / ett / plural | Verdict |
|---|---|---|
| stor | stor / stort / stora | ✅ **SAFE** — the reference word |
| glad | glad / glatt / glada | ✅ SAFE (`-tt`) |
| röd | röd / rött / röda | ✅ SAFE (`-tt`) |
| grön | grön / grönt / gröna | ✅ SAFE |
| varm | varm / varmt / varma | ✅ SAFE |
| blöt | blöt / blött / blöta | ✅ SAFE (`-tt`) |
| kall | kall / kallt / kalla | ✅ SAFE (⚠ `kalla` = verb 'to call'; harmless) |
| mjuk | mjuk / mjukt / mjuka | ✅ SAFE |
| **liten** | liten / litet / **små** | ❌ **OUT** — suppletive plural; `litet` also a quantifier; 4th form `lilla` |
| **gammal** | gammal / gammalt / **gamla** | ❌ **OUT** — syncope + degemination; induces `*gammala` |
| tung | tung / tungt / tunga | ✅ SAFE (⚠ `tunga` = 'tongue'; low priority) |
| **lätt** | lätt / **lätt** / lätta | ❌ **OUT** — a second `trött` |
| hård | hård / hårt / hårda | ✅ SAFE |
| vit | vit / **vitt** / vita | ✅ SAFE (`-tt`) |
| **svart** | svart / **svart** / svarta | ❌ **OUT** — `-rt`, neuter = base |
| gul | gul / gult / gula | ✅ SAFE — cleanest simple `-t` |
| **blå** | blå / blått / **blå ~ blåa** | ❌ **OUT** — two right answers in the plural cell |
| ny | ny / **nytt** / nya | ✅ SAFE — fixed plural, good vowel-stem contrast |
| fri | fri / fritt / fria | ⚠ morphology SAFE, **out on content** (`Hunden är fri`?) |
| rund | rund / **runt** / runda | ⚠ usable, but `runt` is a high-frequency preposition |
| lång | lång / långt / långa | ✅ SAFE |
| **kort** | kort / **kort** / korta | ❌ **OUT** — `-rt`; also `kort` = noun 'card' |
| **trött** | trött / **trött** / trötta | ❌ OUT (known) |
| hungrig | hungrig / hungrigt / hungriga | ✅ SAFE — `-ig` is a large fully regular class |
| **ledsen** | ledsen / ledset / **ledsna** | ❌ **OUT** — `-en` syncope; ⚠ `ledsna` = verb |
| arg | arg / **argt** / arga | ✅ SAFE **only with a neuter subject that can be angry** — `Lejonet är argt` ✔ |
| **rädd** | rädd / **rätt** / rädda | ❌❌ **HARD OUT** — the prescriptive neuter is **`rätt`**, homographic with 'correct', on a screen that tells the child whether they are correct. Usage avoids the form entirely (`Barnet är rädd` is what people say). Excluded on both counts. |
| stark | stark / starkt / starka | ✅ SAFE |
| snabb | snabb / snabbt / snabba | ✅ SAFE |

**Additional SAFE pool (åk-2 vocabulary, three distinct forms, no traps):**
`våt/vått/våta` · `torr/torrt/torra` · `full/fullt/fulla` · `snäll/snällt/snälla` ·
`söt/sött/söta` · `sur/surt/sura` · `mörk/mörkt/mörka` · `smal/smalt/smala` ·
`djup/djupt/djupa` · `hög/högt/höga` · `rolig/roligt/roliga` · `lugn/lugnt/lugna` ·
`smutsig/smutsigt/smutsiga`

⚠ Near-misses to avoid: `tom/tomt/tomma` (gemination in the plural, not "add -a";
`tomt` = 'plot of land') · `ren/rent/rena` (`ren` = 'reindeer' — fatal in an animal deck) ·
`hel/helt/hela` (`helt` a very frequent adverb) · `tjock` (fine morphologically; tone) ·
`ljus` (= noun 'candle').

---

## 4. THE `-tt` DOUBLING — the rule, and the ratio

**It is orthographic and driven by vowel length.** A Swedish stressed syllable must be
heavy: long vowel + short consonant, OR short vowel + long consonant. The neuter suffix
`-t` closes the syllable, which forces a long stem vowel to SHORTEN — and Swedish spells a
short stressed vowel by doubling the following consonant.

- long vowel (or vowel-final) stem → **`-tt`**:
  `röd`[røːd]→`rött`[rœtː] · `glad`→`glatt` · `våt`→`vått` · `blöt`→`blött` ·
  `vit`→`vitt` · `ny`→`nytt` · `blå`→`blått`
- consonant already closing the syllable → **single `-t`**:
  `stor`→`stort` · `grön`→`grönt` · `varm`→`varmt` · `lång`→`långt` · `hård`→`hårt` ·
  `stark`→`starkt` · `snabb`→`snabbt` · `kall`→`kallt`

Teacher's one-liner: *"Lång vokal → dubbelt t (röd → rött, ny → nytt). Konsonant före
ändelsen → ett t (stor → stort, grön → grönt)."*

### ⭐ RULING: a deliberate mix, weighted ~2 simple : 1 doubling
- At the moment of CHOICE the doubling costs nothing — the forms are on cards; the child
  never spells them.
- It costs at TRANSFER. All-doubling induces `*stortt`; all-simple induces `*röt`. Both
  patterns must be visibly present.
- ⭐ The doubling words are the ones the child can **HEAR** (`röd`[røːd] vs `rött`[rœtː] —
  the vowel quality changes audibly), whereas `stor/stort` differ only by a final [t] that
  is easy to miss. Since the activity speaks each card on tap, they carry real value.
- Proposed shape: `stort, grönt, gult, varmt` alongside `rött, vitt`.

---

## 5. THE SEVEN UI STRINGS

### The character name
**`Vera` clears every check.** It is a real Swedish given name; it collides with no
adjective card; it is not `vara`/`vore`; no sibling sv character is named Vera
(Måna, Juniper, Marigold, Krumelur, Sigge, Doktor Fjäder, Salvia, Olga, Tore, Alva, Ebba,
Kurre, Lily, Pip, Tilly, Matis, Bult, Snäckis, Kapten Quill, Hoppers).

⚠ **The naming constraint that matters here: the name must not contain a stem that appears
on a card.** Rules out `Storm` (`stor`), `Gullan` (`gul`), `Lilla-` anything, `Rödluva`,
`Vitta`.

Recommendation: **`Vera Sork`** (sork = vole). Keeps the shipped character across locales
and reads as a Swedish children's-book animal. Full-rename alternative if the operator
prefers the sv line's native-invention pattern: **`Sixten Sork`**.

### Title / page title — follow the shipped sv convention
The sv siblings put the character+place in the activity title and the GRAMMAR in the page
title (#24: *"Min, mitt eller mina? Interaktiv svenskövning för årskurs 2"*).

- `title` → **`Veras ordbo`** (⭐ `ett bo` is itself an ett-word — the deck's hard case)
- `page_title` → **`Stor, stort eller stora? Interaktiv svenskövning för årskurs 2`**
- `slug` → `stor-stort-eller-stora-adjektiv-ovning-svenska-ak-2`

### The seven strings

```json
"title":       "Veras ordbo",
"instruction": "Läs meningen och tryck på ordet som passar i luckan.",
"prompt":      "Vilket ord passar i meningen?",
"veraIntro":   "Ett-ord får -t på slutet. Flera får -a!",
"hintPick":    "Tryck först på ett av de tre orden.",
"hintWrong":   "Titta på början av meningen: en-ord, ett-ord eller flera? Försök igen!",
"win":         "Ja! Nu passar ordet ihop. 🌿"
```

**Why each is shaped that way:**

- ⭐ **`en-ord` / `ett-ord` / `flera` is the single most authentically Swedish-school choice
  available.** It is how every Swedish teacher from förskoleklass onward frames gender
  ("är det ett en-ord eller ett ett-ord?"), and it maps exactly onto the am/is/are
  three-way. Keep `adjektiv` out of the child strings; put it in `page_intro`.
- **`prompt` is structurally safe**: `Vilket` agrees with `ord`, a noun printed in the
  prompt itself, not with the round's subject. ⚠ **A prompt like `Hur är den?` or
  `Vilken passar?` would be a hidden agreement LEAK** — `den/det/de` announces the
  subject's gender before the child chooses. **Never let a pronoun into the prompt.**
- **`veraIntro` carries the RULE, not the instruction** — correct for a bubble that
  disappears below 700px. And it is TRUE only because §3's exclusions hold; the moment
  `liten` or `gammal` enters the pool, the bubble starts lying.
- **`hintWrong` diagnoses AND re-invites** (see Defect H — five shipped locales fail this).
  ⚠ It says *"början av meningen"*, so **every round must be subject-initial**. No
  `Idag är bilen ___` inversions, or the hint lies.
- **`win` is dead code** in all seven shipped locales (Defect K).

---

## 6. DEFECTS FOUND IN THE SHIPPED SOURCE

Ordered by severity. All quoted from the files as shipped.

### ⭐⭐ DEFECT A — the PREDICATIVE ADJECTIVE LEAKS THE ANSWER in fr, es and pt
The `after` field carries number agreement, so the child can solve without reading the
subject — and worse, it teaches the **inverted dependency** ("match the verb to the
adjective").

| Locale | Round | `after` | Leak |
|---|---|---|---|
| fr | `enfants-contents` | `" contents."` | **FULL** → `sont` |
| fr | `chiens-forts` | `" forts."` | **FULL** → `sont` |
| es | `ninos-contentos` | `" contentos."` | **FULL** → `están` |
| pt | `criancas-contentes` | `" contentes."` | **FULL** → `estão` |
| fr | `chat-fatigue` | `" fatigué."` | partial (rules out `sont`; 3→2 cards) |
| es | `gato-cansado` | `" cansado."` | partial |
| pt | `gato-cansado` | `" cansado."` | partial |

**4 fully-leaking + 3 partially-leaking rounds across three shipped locales.**
`en`, `de` and `nl` are clean because their predicative adjectives are invariant
(`ready/happy`, `froh/müde`, `blij/moe`). `it` is clean because its location-only fence
(`sto/sta/stanno`, never state-adjectives) excluded adjectives for an unrelated reason and
prevented this by accident.

⭐ **This cannot happen in the sv rebuild — the adjective IS the answer.** The sv deck is
structurally immune to the defect that is live in three siblings.

### ⭐⭐ DEFECT B — `be-agreement-core.js` was never localized; its quality metrics are garbage for all six non-English pools
`correctIndex()` is hard-coded to `FORMS = ['am','is','are']`. For any localized round
(`correct: 'bin'`) it returns **-1**. Consequences in `deckFacts()`:

| Metric | Localized pools | Reality |
|---|---|---|
| `positionBot` | **1.0** (all 8 land in `posCount[-1]`) | looks like a catastrophic position leak; is noise |
| `longestBot` / `shortestBot` | **0** (`lens[-1]` is `undefined`) | measured nothing |
| `formMix` | **false** always (`ans.am && ans.is && ans.are`) | **inverted** — reports "doesn't use all three forms" for decks that do |
| `fixedGuessBot` | ✅ correct (keys on the string) | the ONE surviving metric |
| `total` | ✅ correct | |

`facts().correctValid` is likewise **false for every localized round**. `Core.grade`,
`Core.oracle`, `Core.cards` and `Core.audit` are dead (the activity uses `vvmGrade`).

⭐ **The operator's own measurement was valid by luck** — `fixedGuessBot` is precisely the
one metric that still works. Every other number from that same call was meaningless. This
is the project's own "a gate whose oracle shares the convention" class.

### ⭐ DEFECT C — EN `hintWrong` prints the answer key
```
"hintWrong": { "en": "Read the subject again — I → am, one → is, many → are." }
```
After ONE wrong tap the child is handed the complete mapping table and needs no reading at
all. `hintPick` does the same. `it` is the model to copy — `«Guarda il soggetto: io, uno o
tanti? Riprova!»` names the SUBJECT categories but not the forms. **The EN source
over-tells; five locales under-tell (Defect D). Nobody reviews the English.**

### ⭐ DEFECT D — `hintWrong` offers a BINARY for a THREE-way task, in five locales
```
de: "Schau aufs Subjekt: einer oder viele? Probier es noch einmal!"
fr: "Regarde le sujet : un seul ou plusieurs ? Essaie encore !"
es: "Mira el sujeto: ¿uno o varios? ¡Inténtalo de nuevo!"
pt: "Olhe o sujeito de novo: um ou vários? Tente outra vez!"
nl: "Kijk naar het onderwerp: één of meer? Probeer het nog eens!"
```
Each of those decks contains **2 first-person rounds** (`ich-garten`+`ich-gluecklich`,
`je-jardin`+`je-ecole`, `yo-jardin`+`yo-escuela`, `eu-jardim`+`eu-feliz`,
`ik-tuin`+`ik-vrolijk`). **25% of every one of those decks gets a hint structurally
incapable of leading to the right answer.** Only `en` and `it` give the three-way.

### ⭐ DEFECT E — ungrammatical German in `veraIntro`
```
de: 'Merke: „bin" bei ich, „ist" bei einem, „sind" bei vielen!'
```
1. **`bei ich` is a case error.** `bei` governs the dative. It must be `bei mir`, or the
   quotes must sit on the pronoun (`bei „ich“`) — they currently sit on `bin`.
2. **Broken quotation marks**: `„bin"` opens with the German low quote `„` and closes with
   a straight ASCII `"` instead of `“`. Three times. (es `«estoy»` ✔, it `«sto»` ✔,
   pt `“estou”` ✔ for BR — `de` is the only broken one.)
3. `bei einem` is elliptical to the point of awkwardness — a German reader waits for a noun.

### DEFECT F — `win` says the wrong thing in three locales, if it is ever wired up
`de`/`fr`/`nl` are **deck-completion** messages ("Alle Sätze sind richtig" / "Toutes les
phrases sont justes" / "Alle zinnen zijn goed"); `en`/`pt`/`it` are **per-round** messages
("The verb matches the subject"). The string is currently dead everywhere — the moment it
is reached, three locales fire the wrong register at the wrong moment.

### DEFECT G — no `sv` branch in `speak()` (blocking for this build)
```js
u.lang = LANG === 'de' ? 'de-DE' : ... : LANG === 'nl' ? 'nl-NL' : 'en-US';
```
A Swedish deck falls through to **`en-US`** and pronounces every Swedish adjective in
English. (The `LCSAudio` branch falls through to bare `LANG` = `'sv'`, which is fine — so
it is half-broken, which is worse than fully broken.) `FORMS_L10N` likewise has no `sv`
key, so without one the deck would render **English cards**.

### DEFECT H — a11y: the sentence change is never announced
`.vvm-sent` has no `aria-live`, and `btn.setAttribute('aria-label', o.word)` merely
duplicates `textContent`. A screen-reader user taps a card and gets **no confirmation the
sentence changed**. Shared by all seven locales.

### Minor / noted
- **double space**, all six localized pools (known): `before` carries a trailing space and
  the renderer appends another (`v.before + ' '`); same on `' ' + v.after`. EN is clean.
- `round.subject` is **dead data** — `childView` returns it, `render()` never reads it.
- ⚠ **`it` near-miss**: `vera` is Italian for 'true/real' (fem.) and 'wedding ring', and
  the character appears as a subject (`Vera ___ nella sua tana`). No card collision
  (`sto/sta/stanno`), so harmless — but it is exactly the class the operator warned about,
  live in a shipped locale.
- EN `"The cat ___ fast asleep."` — a Grade-1 decoder reads `fast` as speed.
- `it` fence **HOLDS**: all 8 it rounds are location or `sta bene`. Verified.

---

## 7. BUILD CONSTRAINTS THE SV DECK MUST HONOUR

1. ⭐ **Per-round cards, not constant cards.** The core assumes one fixed triple; sv needs
   `stor/stort/stora` in one round and `röd/rött/röda` in the next. `setupTask` already has
   the hook (`var _lf = FORMS_L10N[LANG]; if (_lf) this.view.choices = ...`) — extend it to
   read `round.cards`, and point `vvmGrade` at `round.cards[id]`. **Activity layer, 0 core
   lines.**
2. ⭐ **The live bot is MORPHOLOGICAL, not positional.** Card order is already shuffled per
   render, so a positional bot is dead. But *"always tap the card ending in `-a`"* wins
   every plural round, *"-t"* wins every ett round, *"shortest"* wins every en round. **The
   only defence is cell balance** — roughly 3 en / 3 ett / 2 plural of 8, so each such bot
   scores ⅓. This is a NEW gate the deck has never needed (am/is/are share no morphology).
3. ⭐ **Definite subjects only.** `Bilen / Huset / Bilarna` — the cue is then the noun's own
   suffix (a real reading skill). An indefinite subject prints the answer: `En bil är ___`.
   And because the predicative form stays STRONG under a definite subject
   (`Bilen är stor`, not `*stora`), the deck actively **inoculates against the real
   misconception** that `-a` means "definite" (from `den stora bilen`).
4. ⭐⭐ **BAN ett-word plurals in `-en`.** `Husen är stora` vs `Katten är stor` — `husen`
   (neuter plural) and `katten` (common definite singular) carry the **same written
   suffix**. Use only `-arna/-erna/-orna` (bilarna, katterna, blommorna) and `-ena`
   (äpplena). ✗ husen, borden, barnen, molnen, träden. Nothing is lost: the plural rule is
   gender-blind anyway.
5. **Nouns, not pronouns.** `Jag/Vi/Du/Han/Hon` all take the en-form; only `det` reaches the
   neuter, and it is abstract. Swedish cannot mirror the EN deck's pronoun-heavy design.
6. **Every round subject-initial** (so `hintWrong` does not lie).
7. **No adjective anywhere in the sentence frame** (`*Stora huset är ___`).
8. **Gender lives in the singular only.** With 3 en + 3 ett + 2 plural, the gender contrast
   gets 6 of 8 rounds. A 3/2/3 split would leave the gender lesson thin.
9. **Strand: no override needed.** `strand: "Language"` auto-maps to sv
   **`Språkliga strukturer och normer`** (`frontend/lib/seo/strand-names.ts:189`) — already
   shipped and already resolved for the sv Language line. Do NOT invent a heading.
10. **Grade: åk 2**, matching #24 and the other locales' Klasse 2 / CE1 / 2º ano placement.
    ⚠ Lgr22 states *centralt innehåll* once for the whole åk 1–3 band, so the chip is a
    PLACEMENT call, not a capability claim (the sv #8 precedent).
