# sv page copy — `sentence-builder.build-a-sentence.l-1-1-j`

Advisory only. No file edits made. All Swedish below is paste-ready.

Read before writing: `mini tools/sentence-builder-activities.json`,
`mini tools/sentence-builder-activity.js` (tap handlers + `_checkNow` + the 🔊 handler),
`mini tools/sentence-builder-core.js`, `frontend/messages/activity-content/{en,de,sv}.json`,
`frontend/app/[locale]/activities/[slug]/page.tsx` (GRADE_OVERRIDE line 82),
`frontend/lib/seo/strand-names.ts`, `scripts/verify-activity-serp-copy.js`.

---

## 1. `slug.sv`

```
meningsbyggnad-ordfoljd-stor-bokstav-och-punkt-ak-2
```

Placeholder form: `meningsbyggnad-ordfoljd-stor-bokstav-och-punkt-{ak-1|ak-2}`

**I would pick `ak-2`, and the evidence is already in the repo, not in my judgement.**
`frontend/app/[locale]/activities/[slug]/page.tsx:82` already carries a GRADE_OVERRIDE row for
this exact activity id: `{ de:'2', fr:'2', es:'2', pt:'2', it:'2', nl:'2' }` — **six locales
independently overrode CCSS grade 1 to grade 2, unanimously**, each for the same reason: grade 1
is decoding, and the *metalinguistic* work (reordering words, applying the conventions
consciously) is grade 2. Swedish has the identical split — åk 1 is läsinlärning/avkodning, and the
deliberate treatment of ordföljd + skrivregler as an object of study is åk 2. The closest shipped
Swedish sibling, `tense.past-present-future.l-1-1-e`, is CCSS grade 1 and already ships **`sv:'2'`**
in that same map with slug `verbets-tempus-datid-nutid-framtid-ak-2`. Two of two Swedish literacy
siblings ship `-ak-2`.

⚠ Note this means the build must add `sv:'2'` to the GRADE_OVERRIDE row at line 82 — the row exists
but has no `sv` key, so without the edit the chip falls through to åk 1 and contradicts the slug.

Folding verified: `ordföljd → ordfoljd` (ö→o, one letter for one letter). Measured across all 82
shipped Swedish activity slugs: **zero `ae`/`oe` occurrences.** Matches `^[a-z0-9-]+$`. 51 chars
(es sibling `construir-oraciones-orden-de-las-palabras-2-primaria` is also 51).

Shape follows the three shipped Swedish literacy siblings — *[grammatical term] – [the concrete
content] – ak-N*:
`plural-av-substantiv-fot-blir-fotter-ak-2` / `verbets-tempus-datid-nutid-framtid-ak-2` /
`prefix-och-suffix-vad-betyder-ordet-ak-2`.

---

## 2. `page_title.sv`

```
Meningsbyggnad – sätt orden i ordning, stor bokstav och punkt (åk 2)
```

68 chars — inside the sibling band (62 / 68 / 65). Leads with the skill, **no mascot**, en-dash
U+2013 as the siblings use, `(åk N)` tail. Carries three real Swedish search phrases:
*meningsbyggnad*, *sätt orden i ordning* (ordföljd), *stor bokstav och punkt*.

åk-1 variant if the panel rules that way: swap `(åk 2)` → `(åk 1)`.

Alternate, if the panel prefers the siblings' show-the-content style (`fot blir fötter`,
`o-, -full och -lös`), 66 chars — **binds `roundsL10n.sv[0]` to that sentence**:
```
Meningsbyggnad – sätt orden i ordning: En stor hund skäller (åk 2)
```

---

## 3. `page_intro.sv`

```
Barnet ser en bild och fyra blandade ordkort och trycker på dem i rätt ordning: En stor hund skäller. Stor bokstav först, punkt sist. Nio meningar. Åk 2, Lgr22.
```

160 chars — sibling band is 161 / 166 / 180. Opens with `Barnet`, framework by name only (`Lgr22`),
no CCSS code, no price claim. Simulated against `scripts/verify-activity-serp-copy.js`:
`FREE_RE` false, Common Core / code-shape false. Ends on the sibling cadence `Åk 2, Lgr22.`

åk-1 variant: `… Nio meningar. Åk 1, Lgr22.`

⚠ Deliberately does **not** carry `utan konto`. None of the three shipped Swedish literacy siblings
does; it is true but it is not the sentence that earns the click.

---

## 4. `frontend/messages/activity-content/sv.json` → `prose > "sentence-builder.build-a-sentence.l-1-1-j"`

```json
{
  "about": [
    "Barnet ser en bild – en hund – och under den fyra tomma rutor och fyra ordkort i blandad ordning: skäller. stor En hund. Barnet trycker på ett kort i taget, och orden hamnar i rutorna från vänster till höger tills hela meningen står där: En stor hund skäller.",
    "Det som övas är att en mening har en ordning. Först kommer den som meningen handlar om – en stor hund – och sedan kommer verbet, det som händer. Kortet med stor bokstav visar var meningen börjar och kortet med punkt var den slutar; punkten sitter fast på det sista ordet, så barnet slipper leta efter den och kan lägga hela sin uppmärksamhet på ordningen.",
    "Nio meningar, i ny ordning varje gång. Aktiviteten följer Lgr22 inom området språkliga strukturer och normer: grundläggande skrivregler med stor bokstav och punkt. Det finns varken tidtagning eller poäng, och ett kort som hamnat fel går att trycka tillbaka hur många gånger som helst."
  ],
  "practices": [
    "Sätta lösa ord i den ordning som gör dem till en hel mening",
    "Börja meningen med stor bokstav och avsluta den med punkt",
    "Se att orden om vem det handlar om hör ihop – en, stor och hund – och kommer före verbet",
    "Läsa igenom den byggda meningen och höra efter om den låter rätt"
  ],
  "howToPlay": [
    "Titta på bilden och läs de blandade ordkorten. Ett kort börjar med stor bokstav och ett slutar med punkt – de visar var meningen börjar och slutar.",
    "Tryck på ett kort i taget, så hamnar ordet i nästa tomma ruta från vänster. Trycker du på en ruta som redan är fylld åker ordet tillbaka till korthögen. Ingenting behöver dras med fingret.",
    "När alla rutor är fyllda trycker du på Kontrollera. Blir det fel tonas ingenting ner – du får en vänlig påminnelse och flyttar om korten. Blir det rätt låses meningen och läses upp. Tryck på 🔊 Lyssna om du vill höra det du byggt så här långt."
  ],
  "learningGoals": [
    "Barnet kan sätta ihop en hel mening av lösa ord i rätt ordning",
    "Barnet vet att en mening börjar med stor bokstav och slutar med punkt",
    "Barnet känner igen att orden om vem det handlar om hör ihop och står före verbet"
  ]
}
```

Every mechanical claim in `howToPlay` was read off the code, not the plan:
- `selectTile` → `_firstEmpty()` — the tile goes into the **next empty box from the left**; the child
  never chooses a box. (`sentence-builder-activity.js:197-204`)
- `clearSlot` on a filled box returns the word to the palette. (`:205-211`) **Nothing is dragged** —
  there is no pointerdown/pointermove path anywhere in the file, only `click`.
- A wrong answer: `_checkNow` returns false, the shell shows `hintFill` or `hintOrder`, and **nothing
  dims and nothing locks** (`readOnly` is only set on success). This is the opposite of the plural
  and tense siblings, whose sv copy says *"tonas den rutan ner"* — so that sentence must **not** be
  copied across. Used tiles get `visibility:hidden` (they vanish from the palette), they are not dimmed.
- On success: `readOnly = true`, Wiggles switches to the happy pose, and `LCSAudio.speak` reads the
  sentence. (`:213-222`)
- 🔊 reads `self._placedWords().filter(Boolean).join(' ')` — **what the child has built so far**, not
  the correct answer, and it works on a half-filled row. (`:263-266`) Hence "det du byggt så här långt".

---

## 5. Audit

### 5a. FALSE in the English copy

**⭐ "a noun and a verb in the middle" is false in 9 of 9 rounds.** `page_intro.en`: *"a capital
letter to start, a noun and a verb in the middle, and a period at the end"*, repeated in
`about[1]`: *"has a naming word and an action word in the middle, and ends with a period"*. The
period **rides on the verb tile** (`"runs."`, `"naps."`, `"peck."`) — the verb is the LAST of four
tiles in every round. There is no word after it. The same paragraph says the period is baked onto
the last word, so it contradicts itself two sentences apart. Fix: *"a naming word and an action
word in between"* → *"a naming word, then the action word that carries the period"*.

**⭐ The English round pool is not the pool the page describes, and it is not the pool the other
six locales ship.** `params.rounds` (en) = dog, cat, sun, **hen, bus, frog, pig, bat, van**;
every `roundsL10n` locale = dog, cat, sun, bus, frog, pig, hen, **fish, flower**. `bat` and `van`
are English CVC rhyme-family words that carry nothing outside English. Any brief written from
"nine rounds: … fish, flower" is describing the *localized* pool. A Swedish pool should follow the
localized set, not `params.rounds`.

**`howToPlay` never mentions the 🔊 read-aloud button** — the single most parent-relevant control on
the screen, present in every round, and named in both shipped Swedish siblings' step 1. Omission,
not falsehood.

**`howToPlay[2]` "Rearrange and try again"** — you cannot rearrange in place. You tap a filled box
to send the word back to the palette, then re-tap. Minor, but it sets a wrong expectation about
whether words can be swapped.

**`about[0]` "Wiggles the caterpillar hands over scrambled word tiles"** — Wiggles is a static SVG
beside the Hear-it button and hands over nothing. Acceptable anthropomorphism; noted only because
the same file elsewhere is precise.

### 5b. The "EN-ONLY-by-design (404)" claim

**It has NOT leaked into user-facing copy.** It appears only in JS header comments, in 8 files
(and their mirrored `frontend/public/mini-tools/` copies). No `page_intro`, `page_title`, `prose`,
or `strings` entry contains it. Nothing to repair on the copy side.

**But the claim is stale in at least three of those files**, and it is the kind of stale comment that
makes the next author skip the locale work:

| file | comment says | manifest actually ships |
|---|---|---|
| `sentence-builder-activity.js:6` | EN-ONLY (404) | **7 locales** en de fr es pt it nl |
| `plural-activity.js:5` | EN-ONLY (404) | **8 locales** — including **sv**, with full sv prose |
| `place-value-regroup-activity.js:6` | EN-ONLY (404 non-EN) | **8 locales** — including **sv** |
| `contraction` / `fraction-equiv` / `pronoun` / `wobble-museum` | EN-ONLY (404) | 7 locales each |
| `sound-boxes-activity.js:5` | EN-ONLY (404) | 6 locales |

**All eight are wrong.** Not one of the eight is EN-only. Recommend deleting the phrase from all
eight headers in whatever commit next touches them.

### 5c. Swedish page copy making a price claim

The Swedish side of the "nothing is free" backlog is large and includes **SERP titles**:

- `frontend/messages/sv.json` — **300 strings** contain *gratis* (`kostnadsfri` / `utan kostnad`: 0).
  By namespace: `topicFaq` 83, `topicMeta` **65**, `topicProse` 44, `topicPage` 14, `homepage` 12,
  `pricingPage` 12, `homepageV4` 9, `homepageV6` 8, `about` 7, `seo` 7, `homepageV3` 6,
  `standardsPage` 4, `quotaWall` 4, plus singles across `license`, `terms`, `faq`, `billing`,
  `dashboard`, `collections`, `workspace`, `navigation`, `auth`, `aboutPage`, `learnPage`.
- The worst three, because they are the **rendered `<title>`/`<meta description>`**:
  - `homepage.meta.title` — *"Gratis arbetsblad och interaktiva övningar för F-3, 11 språk"*
  - `homepage.meta.description` — *"Gratis utskrivbara arbetsblad …"*
  - `homepage.meta.ogTitle`, `about.metaDescription`, `faq.metaDescription`, `license.metaDescription`
- `frontend/app/[locale]/activities/page.tsx` `LANDING_STRINGS.sv` — **`metaTitle`: *"Gratis
  lärandeaktiviteter (K-3) — anpassade till Lgr22"*** and `metaDescription`: *"Gratis
  lärandeaktiviteter för K-3 …"*. This is the hub that links to the page I am writing copy for.
  ⚠ Same block: `pageTitle` correctly says *"förskoleklass till åk 2"* while `metaTitle`,
  `metaDescription` and `directoryHeading` say **"K-3"** — an English band label on a Swedish page,
  three surfaces out of four, inconsistent with the fourth.
- `standardsPage.sv` — 4, including the SERP template *"Gratis {code}-aktiviteter & arbetsblad på
  11 språk"*.
- `frontend/messages/tool-content/sv.json` — 104, most of them `metaTitle`/`metaDescription`
  (*"Gratis interaktiv tioram | LessonCraftStudio"* etc.).
- **Clean:** `frontend/messages/activity-content/sv.json` — **0**. The Swedish activity prose has
  already been swept. Nothing I am writing here reintroduces a claim.

### 5d. Do the other locales' `page_intro`s describe this activity accurately?

**de** — accurate and clean. *"Wörter in die richtige Reihenfolge bringen"* ✓, *"ohne Anmeldung"* ✓
(true). 139 chars.

**fr** — accurate. 129 chars. Does not name the framework, while en/es/it/nl do.

**es** — accurate; *"concordancia"* is genuinely what the es pool teaches (`la gata naranja` /
`la flor roja`, Det+Noun+Adj+Verb). 249 chars, over any sensible meta band.

**pt** — accurate. 149 chars. Names no framework — the only Romance locale that doesn't, and BNCC
is the shipped `pt` token.

**it** — ⚠ **542 characters.** Google truncates at roughly 160, so most of it is invisible in the
SERP, and `page_intro` is *also* rendered on-page twice (route lines 638 and 714) so the length is
visible there too. Content is accurate (the segment/word analogy is real — Wiggles is five circles
in `wiggleSVG`). But the opening clause *"Con Wiggles il bruco imparare a costruire frasi diventa
un gioco"* is missing the comma after `il bruco` and reads badly without it. Recommend a comma and
a rewrite to the 155–180 band.

**nl** — ⚠ **contradicts its own grade.** The intro says *"zinsbouw in groep 3/4"*, while
`slug.nl` = `…-groep-4`, `page_title.nl` = *"(groep 4)"*, and GRADE_OVERRIDE line 82 sets `nl:'2'`
→ groep 4. The "3/" is wrong on all three other surfaces. 247 chars, also over band.

**en** — 325 chars, and carries the "verb in the middle" falsehood above.

Summary: intro lengths on this one row run **129 → 542**. Only a Swedish entry written to the
155–180 band would be inside it. Worth a single normalising pass across the row.

### 5e. Things a Swedish build needs that do not exist yet

1. `sv` is absent from `slug` / `page_title` / `page_intro` / `params.roundsL10n` in the manifest.
2. `sv` is absent from `strings.{title,instruction,hintFill,hintOrder}` in
   `sentence-builder-activity.js:99-105`, from the `L` table at `:21-78`, and from the `_srMirror`
   chain at `:273-290` — a Swedish child on a screen reader currently hears *"Build a sentence.
   The words are: …"* in English. All three need sv.
3. GRADE_OVERRIDE line 82 needs `sv:'2'` (see §1).
4. Strand needs nothing: `Language → sv 'Språkliga strukturer och normer'` is already registered in
   `strand-names.ts:189`, and `FRAMEWORK_BY_LOCALE.sv = 'Lgr22'` at `:495`. ⚠ That file's own
   comment records that the repo holds **no Swedish language-arts kursplan text** and the wording
   is professional knowledge, not a checked quote — so my `about[2]` paraphrases the åk 1–3
   *grundläggande skrivregler* bullet rather than quoting it.
5. ⚠ Verify sv-SE TTS on the target device before shipping the read-aloud sentence in
   `howToPlay[2]`. CLAUDE.md §23.2 records that `LCSAudio` never calls `getVoices()` and silently
   substitutes a missing voice, and that TTS is reliable in only 5 of 11 locales. Both shipped
   Swedish siblings already promise 🔊, so there is precedent — but the promise is unverified.

### 5f. ⚠ Swedish-specific pool advice (the copy above depends on it)

The de/nl pools use a **definite** determiner (`Der große Hund` / `De grote hond`). A literal
Swedish transfer gives `Den stora hunden skäller.` — correct, but it forces **double definiteness**
(determiner `den` + weak adjective `-a` + definite noun `-en`), so three of the four tiles carry
inflection a beginning reader has to decode.

Recommend the **indefinite** shape instead: `En stor hund skäller.` Four short base-form words,
the natural sentence a Swedish child builds from ordkort, unique word order (no valid alternative
arrangement, which `sentence-builder-core.js` requires), and it keeps the Germanic
Det+Adj+Noun+Verb order the de/nl pools use. All the copy above is written to it.

⚠ **One free win available:** every noun in the localized set — hund, katt, sol, buss, groda, gris,
höna, fisk, blomma — is an **en-word**. As inherited, the Swedish deck cannot teach the en/ett
contrast at all. Swapping one round for an ett-word subject (`Ett vitt får betar.` / `Ett stort
lejon ryter.`) would add the one grammar point that is genuinely Swedish and that no other locale
in this row has — the neuter `-t` adjective form. Pedagogue/linguist call; I have not written it
into the copy above, so the copy is true either way.

Suggested indefinite pool, advisory only:
`En stor hund skäller.` · `En liten katt sover.` · `En gul sol lyser.` · `En snabb buss stannar.` ·
`En grön groda hoppar.` · `En rosa gris bökar.` · `Sex bruna hönor pickar.` · `En röd fisk simmar.` ·
`En gul blomma växer.`

### 5g. Fork for the operator — the mascot's Swedish name

`page_title.sv` carries no mascot, per the recorded finding, and both Swedish literacy siblings
confirm it (`plural`, `tense`, `affix` — none names Juniper or any mascot; the Swedish **maths**
activities do: Bult, Tore, Alva, Mätis, Snäckis, Pip). So the title is unaffected.

But `strings.title.sv` is still needed, and **"Wiggles" means nothing to a Swedish child** — every
existing Swedish mascot name in this repo is Swedish-native. Proposal: **`Larvis bygger meningar`**
(*larv* = caterpillar, `-is` the standard Swedish kid-diminutive, matching Mätis / Snäckis).
Per the recorded rule, a character rename where the EN name is opaque is an operator fork, not my
call — flagging it rather than deciding it.
