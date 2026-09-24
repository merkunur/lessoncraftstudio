# Swedish ruling — Wiggles' Sentence Builder (`sentence-builder.build-a-sentence.l-1-1-j`)

Advisory only. No file edits made. Everything below that is stated as a number was measured;
everything stated as a curriculum fact is sourced at the end with an explicit confidence.

---

## 0. The finding that reframes the whole commission

**Lgr22 removed *meningsbyggnad* from svenska åk 1–3. It survives only in *svenska som
andraspråk*.**

Verbatim, from the national-test provider's mapping of Lgr22 centralt innehåll to årskurs 3
(Gruppen för nationella prov, Uppsala universitet):

> **Ämnet svenska**, "Läsa och skriva" → *Språkliga strukturer och normer.*
> "Grundläggande skrivregler, med gemener och versaler, de vanligaste skiljetecknen samt
> stavning av vanligt förekommande ord i elevnära texter." · "Alfabetet och alfabetisk ordning."

> **Ämnet svenska som andraspråk**, same heading:
> "**Ords böjningsformer och meningsbyggnad med sambandsord**, i jämförelse med andraspråk
> eleven kan." · "Grundläggande skrivregler, med gemener och versaler, de vanligaste
> skiljetecknen samt stavning av vanligt förekommande ord i elevnära och för eleven kända
> texter." · "Alfabetet och alfabetisk ordning."

There is **no meningsbyggnad bullet in plain svenska åk 1–3 at all.** (Lgr11 had one —
"Språkets struktur med stor och liten bokstav, punkt … samt ords böjningsformer och
meningsbyggnad" — and Lgr22 moved it out of svenska and kept it in SVA.)

Three consequences, all load-bearing:

1. **The Lgr22 hook for this activity is *grundläggande skrivregler* — gemener/versaler and
   skiljetecken — not ordföljd.** Frame the Swedish page on *stor bokstav och punkt*, with word
   order as the mechanism rather than the claim.
2. **This settles §7 (teaching soundness) in the activity's favour.** The capital-first and
   period-last cues are not leaks that give the answer away; under Lgr22 they are the *only*
   part of this activity that the svenska kursplan names. See §7.
3. ⚠ **For this platform's actual audience the SVA kursplan is the better fit.** CLAUDE.md §1
   targets "international schools, dual-language/immersion programs, bilingual European
   schools". SVA åk 1–3 *does* name meningsbyggnad. If the Swedish landing copy wants to claim
   word order, it should claim it against **svenska som andraspråk**, where the claim is true.
   I would ship it against svenska with the skrivregler framing (safer, larger audience) and
   note SVA in the prose.

⚠ A web-search summary I ran first reported "meningsbyggnad med sambandsord … for years 1-3"
without qualification. That summary had **silently merged the svenska and SVA columns** of the
comparison document. I only caught it by extracting the PDF's own text. Do not take the
one-line version of this from a search engine.

---

## 1. ⚠⚠ THE CENTRAL FORK — RULING: **INDEFINITE** (`En stor hund` shape, not `Den stora hunden`)

**Ruling: indefinite, `En + Adj + Noun + Verb.`**

### Why

**(a) The picture is a first mention, and the definite presupposes a referent the child has not
met.** `Den stora hunden skäller.` says *the* big dog — the one we were just talking about.
There is no prior mention; there is a bare picture. A Swedish six-year-old shown a dog says
*"En hund!"* or *"Hunden skäller"*, not *"Den stora hunden skäller"*. The free article `den` is
information-structurally marked: it wants either an established referent or a contrast ("den
STORA hunden, inte den lilla"). Neither exists on this screen. The indefinite is the honest
form for naming what is in a picture.

**(b) Four tiles should teach ONE thing, and the definite makes three of them carry morphology.**
Definite forces **dubbel bestämdhet** — the free article `den`, the weak adjective `-a`, *and*
the noun suffix `-en` — three redundant markers of one feature, spread across three of the four
tiles. A child who has not yet met double definiteness is decoding morphology at the same
moment as ordering. The indefinite leaves exactly one structural fact on screen: **adjektivet
står före substantivet.** That is the word-order lesson, uncontaminated.

**(c) ⚠ The gender-agreement argument the brief raises against the indefinite is VACUOUS on the
INHERITED picture set — which is an argument *for* the indefinite, not against it.** I checked
all nine:

| noun | genus | indefinite | neuter form that never appears |
|---|---|---|---|
| hund, katt, sol, buss, groda, gris, höna, fisk, blomma | **all utrum (en-ord)** | `en …` | — |

**There is not one ett-ord among the inherited nine.** So the `-t` neuter adjective (`ett stort
hus`) never occurs, the adjective is always the bare base form, and the indefinite imposes
**zero** morphological load while the definite imposes triple. The agreement hazard the brief
worried about cannot fire on this set.

### The consequence — and it is fixable, which §1.1 does

**As inherited, the determiner tile is `En` in all nine rounds.** That is *not* a defect of the
indefinite: under the definite it would equally be `Den` in all nine, for the same reason (all
nine nouns are utrum). Swedish cannot reproduce German's Der/Die/Das variation on *this* set.

⚠ But the picture set is **not fixed** — each locale's `roundsL10n` rounds carry their own
`subject`, and the shipped decks already diverge (§6.1). **§1.1 therefore swaps one round to an
ett-word**, which turns this paragraph's weakness into the deck's best teaching point. Read §1.1
as part of this ruling, not as an addendum to it.

Two ways to vary the determiner *without* changing a picture were considered and **both are
rejected**:

- **Numerals** (`Sex bruna hönor…`, as EN does): rejected — every picture shows **one** object.
  Using a numeral would reproduce exactly the falsehood the EN deck already ships (§6).
- **Possessive `Min`** (as EN's "My green frog" does): rejected on two counts — it is not true
  of a generic picture, and ⚠ **a Swedish possessive triggers the *definite* adjective form**:
  `min gröna groda`, never *`min grön groda`. It would smuggle back the exact morphology the
  indefinite was chosen to avoid, and it is a trap a fan-out would walk straight into.

So: constant `En` — **unless one round changes noun, which is exactly what §1.1 rules.**

---

## 1.1 ⚠⚠ ONE ROUND MUST BE AN ETT-WORD — RULING: **YES**, swap the cat for the sheep

The content panel is right, and this is the single best improvement available to the Swedish
deck. **Ruling: yes, ship one ett-word round.**

### Why it is not an overload

It adds **no tile, no slot and no new decision to the ordering task.** The shape is identical —
`Ett + Adj + Noun + Verb.` — and the child still orders four tiles. The en/ett contrast arrives
as **ambient correct input**, not as an assessed second skill. That is precisely the right
ambition for a word-order activity: the child is not being asked to *choose* a determiner (there
is only one determiner tile per round), only to read the one they are given.

Against that near-zero cost it buys the one grammar point **no other locale in this row can
carry**, because en/ett has no equivalent in en/de/fr/es/pt/it/nl. It also breaks the rote
`En`-every-time pattern that §1 was forced to accept, which directly strengthens §7.2.

### ⚠ It also answers Q3 — and it makes the INDEFINITE ruling stronger, not weaker

| | article | adjective | noun |
|---|---|---|---|
| **indefinite** | `En` vs **`Ett`** ✓ | `vit` vs **`vitt`** ✓ | `höna` / `får` |
| **definite** | `Den` vs `Det` ✓ | `vita` vs `vita` ❌ **collapses** | `hönan` / `fåret` |

The Swedish **weak adjective ending is a uniform `-a` regardless of gender**, so in the definite
the adjective stops carrying gender entirely and the contrast survives in one place only, buried
under double definiteness. In the indefinite it is visible **twice**, in adjacent tiles, on the
child's own screen. So the ett proposal does not merely coexist with the indefinite ruling — it
**depends on it**, and had we chosen the definite the panel's proposal would have been worth
much less. §1 stands, and stands more firmly.

### Which round gives way: `snt-cat`

Two rounds carry **indeclinable** adjectives and therefore zero agreement yield either way —
`orange` (cat) and `rosa` (pig). Between those, the cat goes, on decoding grounds:
⚠ **`orange` is the single hardest tile in the deck for an åk-2 reader** — a French loanword
with foreign spelling and a /ʃ/ realisation of ⟨ge⟩. `rosa` is transparent; `orange` is not.
The cat round was also the one where the true action (*sitter*) was fenced at 47 hits, so its
verb was already a workaround.

Divergence from the shared picture set is **already normal and sanctioned**: EN ships `bat` and
`van` where the l10n decks ship `fish` and `flower` (§6.1), and the standing rule for this
programme is rebuild-not-translate. A Swedish-specific picture for a Swedish-specific grammar
point is the rule working, not breaking.

### The replacement — verified, not assumed

```jsonc
{ "id": "snt-sheep", "seed": 3, "canonical": ["Ett","vitt","får","bräker."],
  "subject": { "noun": "sheep", "themeDir": "animals", "label": "ett får" } }
```

- **`ett får`** — neuter, certain. ⚠ I checked the other candidates the coordinator floated and
  they do **not** work: **`en häst`** and **`en kanin`** are both *utrum* (the coordinator was
  right to flag their own uncertainty), and `lamm`/`lejon`, which *are* neuter, **have no image
  in `animals`**. Verified on disk: of the ett-word animals, **`sheep` is the only one with
  artwork**, and `animals/sheep@2x.webp` exists.
- **`vitt`** — the neuter of `vit`, and ⚠ **this is the tile a fan-out would get wrong.** It
  must be `vitt`, never `vit`. Verified true of the picture: the sheep is white.
- **`bräker`** — ⚠ **not `betar`.** I opened the image: the sheep is **standing, head up, facing
  the viewer — it is not grazing.** `Ett vitt får betar.` would reproduce, in the very round
  added to improve the deck, the exact defect §6.2 convicts seven other locales of. `bräka`
  (to bleat) is a sound verb, unfalsifiable by a still, **0 corpus hits**, and its imperative
  (`bräk`) differs from its present, so it is clear of the §2 conjugation-2 hazard.
- ⚠ **`får` measures 175 corpus hits — this is NOT a fence violation.** Those are the verb *får*
  ("gets/may"), one of the commonest words in Swedish, not the noun *ett får*. With `Ett` in
  front of it and a sheep beside it there is no ambiguity for a child. Recorded so that a later
  audit does not mistake the count for a collision.

### The payoff: a minimal pair inside the deck

Keeping the hen means the deck now contains

> **`En vit höna pickar.`**  ·  **`Ett vitt får bräker.`**

— same adjective, same colour, same shape, **different gender, visible `-t` in two places at
once.** That is the clearest demonstration of en/ett a seven-year-old can be handed, and it
costs one picture swap. This deliberate repetition of *vit/vitt* is worth more than a ninth
distinct adjective; it breaks no gate (duplicate words are forbidden only *within* a sentence).

**Measured:** the revised nine still return `PASS — all rules green (9 rounds, 9 distinct
sentences, 9 subjects)` against the real core, and `animals/sheep@2x.webp` satisfies the gate's
`colorImage` asset check.

---

## 2. THE NINE SENTENCES

⚠ **I opened every picture before writing a single adjective** (ten of them, including the two
EN-only ones and the sheep). Seven of the nine shipped locales describe the pictures wrongly
(§6); the fix is to look, not to translate. Every adjective below is true of the artwork, and
every verb is either visible or unfalsifiable-by-a-still — a sound verb (*skäller, bräker,
kväker, grymtar*) is the idiomatic Swedish way to say what an animal in a picture is doing, and
cannot be contradicted by a static image.

```jsonc
"sv": [
  { "id": "snt-dog",    "seed":  2, "canonical": ["En","brun","hund","skäller."],
    "subject": { "noun": "dog",    "themeDir": "animals",  "label": "en hund" } },
  { "id": "snt-sheep",  "seed":  3, "canonical": ["Ett","vitt","får","bräker."],
    "subject": { "noun": "sheep",  "themeDir": "animals",  "label": "ett får" } },
  { "id": "snt-sun",    "seed":  8, "canonical": ["En","gul","sol","skiner."],
    "subject": { "noun": "sun",    "themeDir": "beach",    "label": "en sol" } },
  { "id": "snt-bus",    "seed": 12, "canonical": ["En","blå","buss","kör."],
    "subject": { "noun": "bus",    "themeDir": "vehicles", "label": "en buss" } },
  { "id": "snt-frog",   "seed": 13, "canonical": ["En","grön","groda","kväker."],
    "subject": { "noun": "frog",   "themeDir": "camping",  "label": "en groda" } },
  { "id": "snt-pig",    "seed": 15, "canonical": ["En","rosa","gris","grymtar."],
    "subject": { "noun": "pig",    "themeDir": "animals",  "label": "en gris" } },
  { "id": "snt-hen",    "seed": 19, "canonical": ["En","vit","höna","pickar."],
    "subject": { "noun": "hen",    "themeDir": "birds 2",  "label": "en höna" } },
  { "id": "snt-fish",   "seed": 21, "canonical": ["En","randig","fisk","simmar."],
    "subject": { "noun": "fish",   "themeDir": "animals",  "label": "en fisk" } },
  { "id": "snt-flower", "seed": 22, "canonical": ["En","röd","blomma","doftar."],
    "subject": { "noun": "flower", "themeDir": "spring",   "label": "en blomma" } }
]
```

Nine distinct verbs, nine distinct nouns, eight distinct adjectives plus the deliberate
`vit`/`vitt` minimal pair (§1.1). **Eight rounds `En` + one round `Ett`.** Seeds are **not** the
shipped ones — see §7.3, that is a measured defect.

### Truth to the artwork, per round

| round | what the picture actually shows | adjective | verb |
|---|---|---|---|
| dog | one small orange-and-cream **puppy, standing** | `brun` ✓ | `skäller` (sound, unfalsifiable) |
| **sheep** | one **white** woolly sheep, **standing, head up, facing front** | **`vitt`** ✓ neuter (§1.1) | **`bräker`** — ⚠ *not* `betar`, it is **not grazing** |
| sun | yellow disc, orange rays, smiling face | `gul` ✓ | `skiner` — *solen skiner* is the canonical collocation |
| bus | one **light-blue** city bus, driver + passengers | `blå` ✓ | `kör` ✓ |
| frog | one **green** frog, **sitting**, orange cheeks/toes | `grön` ✓ | `kväker` (sound) |
| pig | one **pink** pig, **sitting, clean and dry** | `rosa` ✓ | `grymtar` (sound) |
| hen | **one** hen, **cream-white** body, red comb, brown wing bars | `vit` ✓ | `pickar` (sound/action) |
| fish | one red-orange fish with clear **stripes** | `randig` ✓ | `simmar` ✓ |
| flower | one **red** flower, yellow centre, green leaves | `röd` ✓ | `doftar` |

### Uniqueness of the order — CONFIRMED, with the mechanism named precisely

**Confirmed: with a subject phrase and a verb there is no second valid declarative order.** But
the guarantee is **orthographic, not syntactic**, and the docblock's phrasing ("a child can't
form a different valid sentence") is true only because of that. State it correctly:

- Swedish attributive adjectives are **strictly prenominal**. `*En buss blå kör.` is
  ungrammatical. So slots 2–3 admit exactly one order.
- V2 is satisfied by subject-initial order. The only competing Swedish order is verb-first —
  and verb-first with these tiles is either a **yes/no question** (`Kör en blå buss?`) or, for
  one verb, an **imperative** (`Kör en blå buss.` = "Drive a blue bus."). Both are blocked
  because **the period is glued to the verb tile and the capital is on `En`**: to form them the
  child must place a lowercase, period-bearing tile in slot 1. The orthography, not the syntax,
  is what closes the door.

⚠ The sheep round is clear on the same test: `*Ett får vitt bräker.` is ungrammatical, and
`Bräker ett vitt får.` needs the period-bearing lowercase tile in slot 1. **UNIQUE.** (`får` is
also the verb *"gets"*, but no rearrangement of these four tiles yields a second reading.)

⚠ **One Swedish-specific hazard worth recording, because it does not exist in German or
English.** In Swedish, conjugation-2 verbs have **present = imperative**: *köra* → present
`kör`, imperative `kör`. Of my nine verbs only `kör` is such a verb (skälla→skäll, bräka→bräk,
skina→skin, kväka→kväk, grymta→grymta, picka→picka, simma→simma, dofta→dofta all differ from
their present forms). `kör` is safe here for the orthographic reason above, but if the build
wants the hazard eliminated *structurally* rather than orthographically, swap in **`tutar`**
(*tuta* → imp. `tuta` ≠ `tutar`): `En blå buss tutar.` I recommend keeping `kör` — it is the
natural, true, high-frequency sentence about a bus — and recording `tutar` as the fallback.

### Measured against the shipped gate

I ran these nine rounds through the **real** `mini tools/sentence-builder-core.js` under the
rules of `scripts/verify-sentence-builder-core.js`:

```
PASS — all rules green (9 rounds, 9 distinct sentences, 9 subjects)
  ≥4 words · capital-first · period-last · no duplicate words · scramble ≠ canonical
  · canonical accepted · reversed rejected · every adjacent swap rejected
  · tiles are a permutation · order-mutation rejects the old order
  · all nine subject images exist as COLOR @2x.webp
```

---

## 3. MEASURED LEXICAL FENCES — rulings

I re-ran the corpus measurement myself. ⚠ My first pass returned 3,934 sv strings against the
brief's 4,616 because it only harvested values under a key literally named `sv` — which misses
`frontend/messages/sv.json`, an entire file that *is* Swedish. Corrected harvest: **8,876 sv
strings** (a superset of the brief's, which is the conservative direction for a fence).

| word | measured | ruling |
|---|---|---|
| **`stor`** 70 · `stora` 229 · `större` 61 · `storlek` 28 = **388** | concentrated in `comparison-creek-activity` (6× `större`), `fraction-kitchen` (10× `stora`), `fractions-core` (9×) | ⛔ **REJECT.** It is a live comparison/measurement term. |
| `liten` 77 · `lilla` 12 | same strand | ⛔ **REJECT** — do not "fix" `stor` with its own antonym. |
| **`hoppar`** 16 | 9 in `hoppers-number-line-activities`, 2 in `ten-stones`; sv text *"Hjälp grodan Hopper att **hoppräkna**"*; also the demo verb in `tense-activities` | ⛔⛔ **REJECT, emphatically** — see below. |
| **`kör`** 41 · `körs` 95 | I read the contexts: the bare hits are idioms — *"så kör vi igång"*, *"om de kör fast"*; `körs` is the passive *"aktiviteten körs i webbläsaren"* | ✅ **SAFE.** Neither is curriculum vocabulary. The *choir* homograph is unreachable with `buss` as subject. |
| `brun` **0** · `skäller` **0** · `skiner` **0** · `grymtar` **0** · `pickar` **0** · `simmar` **0** · `doftar` **0** · `kväker` **0** · `bräker` **0** · `randig` **0** · `rosa` **0** · (also free but unused: `våt` 0, `jamar` 0, `betar` 0) | — | ✅ all free |
| **`får`** 175 | ⚠ **not a collision** — these are the verb *får* ("gets/may"), not the noun *ett får*. Recorded so a later audit does not misread the count | ✅ **SAFE** (§1.1) |
| `gul` 3 · `grön` 4 · `blå` 9 · `vit` 1 · `röd` 15 · `orange` 4 | colour words in `sorting-hoops` / `story-line-sets` / SEO prose | ✅ **SAFE.** Colour terms are unavoidable and none is a *strand* term. |

### ⛔⛔ `hoppar` + the frog — REJECTED, and it is worse than the brief suspected

The brief calls it "the `hopp` disqualification from the affix build". It is that, twice over:

1. **`Hopper` is a frog mascot in TWO maths activities** — `skipcount-activity` (2.NBT.A.2) and
   `hoppers-number-line-activity` — and the Swedish string binds the frog, the hop and the
   maths term in one sentence: *"Hjälp grodan Hopper att **hoppräkna** från näckros till
   näckros!"* Nine of the sixteen `hoppar` hits are Hopper on a number line. `Den gröna grodan
   hoppar.` would put the skip-counting mascot, verb and animal on screen inside a **literacy**
   activity.
2. **`hoppa/hoppar/hoppade` is also the worked verb in `tense-activities.json`** — another
   literacy activity — so the collision is not confined to maths.
3. ⚠ **And it is false about the screen anyway: the frog is sitting.** Two independent
   disqualifications.

`kväker` (0 hits, idiomatic, unfalsifiable) takes it cleanly.

### `blomma` / `blommar` — RULED, and avoided entirely

The brief is right that `blomman blommar` shows the root repetition far more visibly than German's
*Blume blüht*. My answer takes a different verb: **`En röd blomma doftar.`**

- `blommar` **0** hits, but rejected on the repetition ground the brief raises.
- ⚠ `växer` — the obvious alternative, and the one es/pt/it/nl all chose (*crece/cresce/groeit*) —
  measures **40 hits** and is a growth/measurement word. **Rejected.**
- `doftar` **0** hits, idiomatic, unfalsifiable by a still image, and semantically fresh. ✅

### ⚠ One more fence the brief did not ask about, which the corpus surfaced

The verbs of **position and stance** are heavily occupied and must be avoided in this activity:
`står` **191**, `går` **198**, `ligger` **168**, `sitter` **47** (10 of them *"Hopper sitter på
6"*), `rullar` 12 (5 in `rounding-hill`), `lyser` 12, `stannar` 17. This is why the sun takes
`skiner` (0) and not `lyser`, and why the cat takes `jamar` and not `sitter` — even though
"sitting" is the literally most accurate description of the cat.

### ⚠ And one for the FRAMING, not the sentences — the caterpillar is already taken

Per the coordinator: `lay-units.measure.1-md-a-2` ships *"Mätis är en mätarlarv: den kryper
fram genom att lägga sin egen kropp längs marken, bit för bit"*, with the unit noun *"en liten
mask"*. That is a caterpillar whose **body laid end to end in a row IS the act of measuring**.

The Italian page_intro leans exactly on that image for word order — *"Wiggles è fatto di
segmenti, proprio come una frase fatta di parole in ordine"*. **Do not reproduce that in
Swedish.** In this catalogue, segments-in-a-row already means *iterating a length unit*
(1.MD.A.2). Name the mascot and let the rationale rest on *stor bokstav och punkt* plus word
order. This costs nothing — the metaphor was decorative — and it keeps two strands apart.

---

## 4. ÅRSKURS — RULING: **åk 2** (unchanged, and the corrected evidence makes it much safer)

⚠ The brief told me "German overrode to Klasse 2"; the coordinator has since corrected this —
the route map already carries **`{de:'2', fr:'2', es:'2', pt:'2', it:'2', nl:'2'}`, six locales
unanimous**, and the **`tense` row immediately above already ships `sv:'2'`**. That changes the
character of the decision: åk 2 is no longer a lone override, it is the **row's settled
placement**, and Swedish already sits at 2 for the adjacent literacy activity. **Nothing in my
reasoning changes; the confidence rises.** ⚠ It also means the *interesting* question is
inverted — the burden now falls on anyone proposing **åk 1**, which would make sv the single
outlier in a unanimous row *and* put this activity a year below the sv `tense` activity beside
it. There is no case for that.

Do not inherit EN grade 1. Note also that the six locales agree on the *number* but reach it
through six different school systems, so the agreement is corroboration, not a shared premise.

**The kursplan cannot decide the year.** Lgr22 states centralt innehåll **once for the whole åk
1–3 band** — the precedent already recorded on this platform from the sv clock build (#8) — so
"grundläggande skrivregler, med gemener och versaler, de vanligaste skiljetecknen" is equally
"in" åk 1, 2 and 3. The progression decides, and the grade chip is a **placement** signal.

**åk 2, because:**

1. **The task is metalinguistic, not productive.** The child is not writing a sentence; the
   child is **reordering a sentence somebody else wrote**. That operation presupposes the
   sentence schema is already held. In åk 1 the schema is being built.
2. **Decoding load.** åk 1 is dominated by ljudning and avkodning. Sight-reading `grymtar`,
   `kväker`, `skäller`, `pickar` as whole tiles — two-syllable verb forms, out of context,
   scrambled — is not an åk-1 reading task for most of the year.
3. **Assessment sits at the end of åk 3**, so åk 2 is the consolidation window: capital and
   full stop are *introduced* in åk 1 and *secured* in åk 2.
4. **Harmonisation, now measured.** Six locales are already at grade 2 in the route map —
   de Klasse 2, nl groep 4, fr CE1, es 2.º, pt 2º, it classe seconda — and sv is already at 2
   for the neighbouring `tense` activity. sv åk 1 here would be the lone outlier twice over,
   and would contradict the platform's own "GRADE by SKILL not number-ceiling" rule.

⚠ **This overrides the §22.5 Nordic spine's EN-Grade-1 → åk-1 mapping**, deliberately. That
spine was locked for *deck landing pages banded by arithmetic range*; it is not a literacy
progression, and German already broke the same inheritance for the same activity.

Implied: `GRADE_OVERRIDE` sv → `"2"`; slug and page_title carry årskurs 2. For the slug I
recommend **`bygga-meningar-stor-bokstav-och-punkt-arskurs-2`** — it uses `mening` (the
catalogue's established Swedish word for *sentence*, 31 hits, vs `ordföljd` **0** and `sats`
**1**) and leads on the skrivregler hook that Lgr22 svenska actually names (§0). If the build
prefers a single curriculum term, **`meningsbyggnad`** (1 hit) is Lgr22's own word — but note
§0: in Lgr22 that word lives in the **SVA** kursplan, not svenska.

**Textbook practice** (the kursplan being silent): the åk 1–3 series are **ABC-klubben** (*Den
magiska kulan* åk 1 → *Diamantjakten* åk 2 → *Nyckeln till skatten* åk 3), **Livet i
Bokstavslandet**, and **Klara svenskan**. In all three, capital-and-full-stop is introduced in
åk 1 within the child's *own* writing, and explicit sentence-manipulation exercises of this
"sätt orden i rätt ordning" type belong to åk 2. ⚠ The brief is right that **Zick Zack is åk
4–6** and must not be cited here. *(Confidence: medium-high — textbook-scope, not a document I
can cite line-and-verse.)*

---

## 5. STRAND — **CONFIRMED**, and now verified against the primary source

`alignment.strand: "Language"` → sv **`Språkliga strukturer och normer`** is **correct**, and it
is not merely a plausible translation: **"Språkliga strukturer och normer" is a literal Lgr22
sub-heading** inside "Läsa och skriva" in the svenska kursplan for åk 1–3, and it is the exact
bullet group that contains *grundläggande skrivregler, med gemener och versaler, de vanligaste
skiljetecknen*. Keep the registration from the plural build unchanged.

---

## 6. AUDIT OF THE ENGLISH SOURCE — required deliverable

### 6.1 ⚠⚠ The EN deck is not the same deck as every other locale

The brief states "All locales reuse the SAME nine pictures". **That is false.** EN ships
`snt-bat` (animals/bat) and `snt-van` (vehicles/van); all seven l10n decks ship `snt-fish` and
`snt-flower` instead. The round **ids differ**, not just the words. Since `_beginRound` is
driven per-locale this does not currently break, but it means the EN deck has never been
reviewed against the two pictures every other locale uses, and vice versa. Someone building sv
from "the nine pictures" would be building against a set the EN round list does not contain.

### 6.2 ⚠⚠ Seven of nine EN rounds make a claim the picture contradicts

I opened every image. Evidence:

| EN round | the picture | verdict |
|---|---|---|
| `The **big** dog **runs**.` | a small orange-and-cream **puppy, standing still** | ❌ **false twice** — not big, not running |
| `A little cat **naps**.` | orange tabby **sitting, eyes wide open** | ❌ **false** — not asleep |
| `The hot sun shines.` | yellow sun with a face | ✅ (heat is a fair inference) |
| `**Six** **brown** hens peck.` | **ONE** hen, **cream-white** with a red comb | ❌ **false twice** — wrong number, wrong colour |
| `The fast bus stops.` | blue bus, neutral 3/4 view | ✅ unfalsifiable |
| `My green frog **hops**.` | green frog **sitting** | ❌ *hops* false; also "**My**" is untrue of a stock picture |
| `The **wet** pig **digs**.` | pink pig **sitting, clean and dry** | ❌ **false twice** |
| `**Two** **black** bats fly.` | **ONE** dark-slate bat with **pink** wings, wings spread, not in flight | ❌ **false** — wrong number, colour arguable |
| `The old van honks.` | van | ✅ unfalsifiable |

**"Six hens" and "Two bats" are the worst of these**, because the activity's own JSON pairs the
sentence with a single-object picture and the child is being asked to *read carefully*. We are
teaching close reading with a sentence that contradicts the illustration beside it.

The same defect is in the other locales and is not uniformly inherited — it was authored fresh
each time, correctly in some places and not others:

- **flower is red.** de `rote` ✅ · es `roja` ✅ · **fr `bleue` ❌ blue** · **pt `roxa` ❌ purple** ·
  **it `viola` ❌ purple** · nl `mooie` ✅ (evasive but safe)
- **bus is blue.** es `azul` ✅ · pt `azul` ✅ · it `blu` ✅ · **de `gelbe` ❌ yellow** ·
  **fr `rouge` ❌ red**
- **cat is orange.** es/it/pt `naranja/arancione/laranja` ✅ · **fr `noir` ❌ black** — and *dort*
  ("sleeps") is false in **all seven**
- **hen is white.** es `blanca` ✅ · pt `branca` ✅ · it `bianca` ✅ · **en/de/fr/nl "brown" ❌**
- **dog is a puppy.** **en `big` / de `große` / nl `grote` ❌**

⚠ This is why my Swedish adjectives were chosen from the artwork and not from the German. Had I
translated the German, sv would have shipped `En stor hund` (false), `En gul buss` (false) and
`En brun höna` (false) — three falsehoods inherited in one pass.

### 6.3 Dead and English-leaking strings in `sentence-builder-activity.js`

- ⚠ **`win` is authored in all seven locales and never referenced.** `grep -c "txt('win')"`
  → **0**. Seven translations of "You built a sentence!" that no code path can reach. This is
  the recorded `hintMark` class from #39 — and note a *source scan* alone would not have caught
  it either way; the count is what settles it.
- ⚠ **`hear` exists only in the private `L` table, not in `strings`.** `strings` (the object the
  shell renders) has `title, instruction, q, hintFill, hintOrder` — **no `hear`, no `win`**. The
  "🔊 Hear it" button is filled by `txt('hear')`, which falls back to `L.en.hear`. **Adding
  `sv` to `strings` alone would ship an English button to Swedish children.** The sv build must
  add an `sv` entry to **`L`** as well as to `strings`.
- Same shape in **`_srMirror`**: the screen-reader sentence is a hard-coded `LANG === …` ternary
  chain ending in an English default. A new locale silently gets English **on the accessibility
  channel** — the one nobody screenshots. sv needs a branch here too.
- The double table is the underlying fault: `q`/`hintFill`/`hintOrder` are authored **twice**
  (in `L` and in `strings`) with identical text, and `strings.q` is the indirection `'{q}'`
  filled from `L`. Two sources of truth for the same six strings, already drifted (two keys
  exist in one and not the other).

### 6.4 EN prose

`page_intro` (en) claims *"a noun and a verb in the middle"*. On screen the middle two tiles are
an **adjective and a noun**; the verb is last. The sentence describes a shape the activity does
not have.

*(`frontend/messages/activity-content/en.json` → `prose > sentence-builder.build-a-sentence.l-1-1-j`
was not present in my read of the manifest; the claim above is against `page_intro` in
`sentence-builder-activities.json`, which is the string the search-result surface uses. The
`prose` block should be checked against the same list before the sv build ships.)*

### 6.5 Does any EN round have more than one valid order?

**No** — and specifically `Six brown hens peck.` does not: `*Brown six hens peck.` and
`*Six hens brown peck.` are both ungrammatical, and every verb-initial arrangement puts the
period-bearing tile in slot 1. The uniqueness claim in the docblock holds for EN. But note it
holds for the **orthographic** reason given in §2, not because English syntax forbids the
alternatives outright — `The bus stops fast.` *is* a valid English sentence over the same four
lexemes, and is only excluded because the period is glued to `stops.`

---

## 7. TEACHING SOUNDNESS — and the coordinator's two questions

### 7.1 "24 arrangements, the child can brute-force" — the real number is **2**, and that is the better framing

The concern is aimed slightly wide. The capital is on tile 1 and the full stop is welded to tile
4, so **slots 1 and 4 are pinned by orthography and the live search space is 2, not 24.** A
guessing child solves any round in at most two tries.

That sounds worse. It is actually **fine, and here is the precise reason**: under Lgr22 svenska
åk 1–3, *"grundläggande skrivregler, med gemener och versaler, de vanligaste skiljetecknen"* is
**the curriculum content** (§0). A child who places `En` first *because it carries the capital*
and `skäller.` last *because it carries the full stop* has not bypassed the lesson — **that
child has just performed the lesson.** The orthographic cues are not leaks; they are the taught
behaviour. The residual adjective/noun choice is the word-order fact worth teaching in Swedish,
and it is genuinely a choice.

So: **acceptable for åk 1–2**, with no timer and no score, and consistent with the platform's
refusal of "dim the wrong choice" — nothing here is removed from the child, a wrong Check leaves
the tiles in place and nudges, and the child re-reads. That is the opposite mechanic.

**One condition, which is currently violated → §7.2.**

### 7.2 ⚠ The `hintOrder` scaffold — RULING: state the RULE, never name the article

The German hint hands over tile 1: *"fang mit **Der, Die oder Das** an"*. Every locale copies
the shape.

⚠ **Swedish must NOT copy it, and the asymmetry is sharp.** German's hint offers a **three-way**
choice (Der/Die/Das) — it narrows, it does not solve. Swedish's determiner is **`En` in eight of
nine rounds and `Ett` in the ninth** (§1, §1.1). Naming it would not be a hint; it would be
**the answer to slot 1, for eight rounds out of nine** — and slot 1 is exactly where the Lgr22
content (versaler) lives. The hint would delete the only curriculum-bearing decision on screen.

⚠ It would also actively *damage* the sheep round: a hint reading "börja med **En**" is **wrong**
on the one round that teaches en/ett, and would train the child against the very contrast §1.1
added. A hint that is false on one round in nine is worse than no hint.

**Ship the rule, not the token:**

```
hintOrder (sv):
"Inte en mening än — börja med ordet som har stor bokstav, sätt punkten sist och läs
 meningen tyst för dig själv. Låter den rätt?"

hintFill (sv):
"Använd alla orden — fyll varje ruta."

q (sv):        "Sätt orden i rätt ordning."
hear (sv):     "🔊 Lyssna"
win (sv):      "Du har byggt en mening!"      ← only if §6.3 is fixed; otherwise it is dead code
title (sv):    "Wiggles bygger meningar"
instruction (sv): "Tryck på orden och sätt dem i rätt ordning så att det blir en mening."
_srMirror (sv): "Bygg en mening. Orden är: … ."
```

This keeps the scaffold — it tells the child *where to look* (the capital, the full stop) and
*what to do* (read it back) — while leaving the child to find the word. It also generalises
across all nine rounds instead of naming a constant, and *"läs meningen tyst för dig själv"*
converts the second Check attempt from a guess into a re-read, which is the whole answer to the
brute-force worry.

⚠ Note it uses **mening**, the catalogue's established Swedish word (31 hits), not *sats* (1).

### 7.3 ⚠⚠ `Core.snapshot` — MEASURED, and two seeds arrive one swap from solved

The brief asks whether any seed leaves the tiles nearly in order. **Yes.** `scramble()` only
guarantees `≠ canonical`; it guarantees **nothing about distance.** Measured against the real
core, on the shipped nine seeds, using a neutral 4-element array:

```
seed  11  ADBC  inv 2/6  in-place 1/4  ** CAP-FIRST **
seed  23  CBDA  inv 4/6  in-place 1/4  ok
seed  31  ABDC  inv 1/6  in-place 2/4  ** CAP-FIRST **
seed  53  BDCA  inv 4/6  in-place 1/4  ok
seed  61  ABDC  inv 1/6  in-place 2/4  ** CAP-FIRST **
seed  67  ACBD  inv 1/6  in-place 2/4  ** CAP-FIRST + PERIOD-LAST **
seed  41  ACBD  inv 1/6  in-place 2/4  ** CAP-FIRST + PERIOD-LAST **
seed  71  CBAD  inv 3/6  in-place 2/4  ** PERIOD-LAST **
seed  83  DBAC  inv 4/6  in-place 1/4  ok
```

**Seeds 41 (hen) and 67 (pig) present the capital already in slot 1 AND the period already in
slot 4** — the child needs a single swap of the middle pair. Given §7.1, those two rounds have
**no live decision left at all.** Five of nine present the capital already first.

⚠⚠ **And because a 4-element Fisher–Yates draws its swap indices from the seed alone, the
permutation is a pure function of the seed — the words are irrelevant.** Verified across every
shipped deck:

```
EN n=9  cap-first 5/9  period-last 3/9  ONE SWAP FROM SOLVED 2/9  (snt-hen, snt-pig)
DE n=9  cap-first 5/9  period-last 3/9  ONE SWAP FROM SOLVED 2/9  (snt-pig, snt-hen)
FR / ES / PT / IT / NL — identical, 2/9 each, same two rounds
```

`Die Henne braune pickt.` · `El rosa cerdo gruñe.` · `De kip bruine pikt.` — the same two rounds,
in all seven locales, arrive essentially solved.

**Recommendation.** This is a **pure integer data fix with no language content**, so it needs no
native panel and can be fixed for every locale at once. Seeds giving a maximally unsolved 4-tile
palette (capital not first, period not last, no tile in its final place, ≥3/6 inversions) —
**130 of the first 399 integers qualify**; the smallest nine are `2, 3, 8, 12, 13, 15, 19, 21,
22`, which is the set I used in §2.

I would (a) ship sv on good seeds from the start, and (b) fold the other seven decks' seeds into
the same build **as a separate commit**, since it is a defect that is live right now in seven
languages. The durable fix is a floor in `scramble()` itself — retry until `inv ≥ 3` and no tile
sits in its final position, not merely until `≠ canonical` — which would also make the property
gate-able in `verify-sentence-builder-core.js`, where it currently is not.

---

## 8. Confidence and provenance

| claim | confidence | provenance |
|---|---|---|
| "Språkliga strukturer och normer" is a literal Lgr22 sub-heading in svenska åk 1–3 | **high** | verbatim text extracted from the UU national-test provider's Lgr22 mapping PDF; corroborated independently by web search |
| åk 1–3 svenska contains *"Grundläggande skrivregler, med gemener och versaler, de vanligaste skiljetecknen…"* | **high** | verbatim, same source |
| **meningsbyggnad is absent from svenska åk 1–3 and present only in SVA** | **high** | both columns extracted verbatim side by side from the same document; the SVA column is identifiable by its own *"i jämförelse med andraspråk eleven kan"* wording |
| Lgr22 states centralt innehåll once for the whole åk 1–3 band | **high** | structural property of the document; matches the platform's own sv #8 precedent |
| åk 2 placement | **medium-high** | judgement. The kursplan cannot decide it; I argue from task type, decoding load, assessment point and cross-locale harmonisation |
| ABC-klubben / Livet i Bokstavslandet / Klara svenskan are the åk 1–3 series, and this exercise type belongs to åk 2 in them | **medium-high** | textbook-scope knowledge, not cited line-and-verse |
| all nine *inherited* subject nouns are utrum | **high** | native judgement, uncontroversial |
| `får` is neuter (*ett får*); `häst` and `kanin` are **utrum**, so neither works as an ett-word | **high** | native judgement; I checked these rather than accept the suggestion |
| `sheep` is the only ett-word animal with artwork | **high — measured** | `animals/{sheep,horse,rabbit}@2x.webp` exist; `lamm`/`lejon`/`ko` have no image |
| the sheep is white and **not grazing** | **high — I opened the image** | `animals/sheep@2x.webp` |
| the weak (definite) adjective `-a` is gender-uniform, so the definite hides the en/ett contrast | **high** | standard Swedish morphology |
| every corpus count in §3 | **high — measured** | `mini tools/**` + `frontend/messages/**`, 8,876 sv strings |
| every picture description in §2/§6.2 | **high — I opened all eleven images** | `image-library-webp/themes/**@2x.webp` |
| gate PASS and the seed analysis | **high — measured** | executed against the real `sentence-builder-core.js` |

⚠ Two things I could **not** verify and which someone should before ship: the exact
`frontend/messages/activity-content/en.json → prose` block (not in the manifest I read), and
whether skolverket.se's own live page words the svenska bullet identically to the UU
reproduction.

**Sources:**
- [Centralt innehåll i kursplanen (Lgr22), årskurs 3 — Gruppen för nationella prov, Uppsala universitet](https://www.uu.se/download/18.1ba0faf7191e4fde0421f21/1726150392369/32022centraltinnehall.pdf)
- [Jämför kursplanerna Svenska Lgr22–Lgr11 — Skolverket](https://www.skolverket.se/download/18.3069476618aadea0683146b/1695379282509/jamforelsedok_Svenska.pdf)
- [Jämför kursplanerna Svenska och svenska som andraspråk Lgr22 — Skolverket](https://www.skolverket.se/download/18.3069476618aadea0683146c/1695379282580/jamforelsedok_Svenska%20o%20Sv%20andrasprak.pdf)
- [Läroplan (Lgr22) för grundskolan — Skolverket](https://www.skolverket.se/undervisning/grundskolan/laroplan-lgr22-for-grundskolan-samt-for-forskoleklassen-och-fritidshemmet)
