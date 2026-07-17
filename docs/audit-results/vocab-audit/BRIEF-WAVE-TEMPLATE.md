# Wave brief template — per-locale native verification (v2, image + dictionary)

> Copy to `BRIEF-<loc>.md` and fill the `<<…>>` slots. This is the BINDING text: every batch is
> judged against exactly this wording, so all batches stay comparable. **The brief lives on disk and
> is quoted verbatim — never paraphrased into an agent prompt.** That rule has been violated and
> punished repeatedly in this project.
>
> **If this brief and the dictionary contradict each other, THE DICTIONARY WINS.** Contradict the
> brief explicitly in `reason`. This is wanted, not risky — this brief's author has now been caught
> wrong **four separate times** by reviewers who did exactly that:
> `Kugel→Kugeln` (de, five reviewers), the `paraply` stress rule (sv), `chess`'s plural (de/Duden),
> and `football` (I opened ONE image and said "it's a ball"; a reviewer opened BOTH and found the
> other is a helmet). **Every time, the reviewer was right.**

## Why this commission exists

`REFERENCE TRANSLATIONS/image-vocabulary.js` feeds an educational site for children aged 3–7. The
words are **projected on the board AND read aloud** (text-to-speech) beside a picture.

**No human ever wrote these plurals or genders.** A script invented all 13,893 of them from the
singular. It produced words that do not exist and were read to children: `Gardinerar`, `Musklerar`,
`Lägerar`, `Jordekorrrar`, `Blackfisk`, `Diskbank`. The operator: *"This is an educational website.
It is absolutely not acceptable."* He is right.

## 🔴 RULE 1 — OPEN THE PICTURE. Every key. No exceptions.

**The Read tool renders `.webp` directly.**
`C:\Users\rkgen\lessoncraftstudio\image-library-webp\themes\<theme>\<file>@2x.webp`
(`<file>` = the key with `-`→`_`; ⚠ real traps: `high-heeled_shoes`, `flip_flops`, and `shoes`
resolves only via `shoes_2` — a blanket `key.replace('-','_')` will miss them. Try another theme
from the row's list before concluding the art is missing.)

**Why: for weeks NOBODY IN THIS PROJECT EVER LOOKED AT A PICTURE.** Twelve native reviewers, three
locale waves and the author all judged from a folder name and an English gloss. When someone finally
opened them, **38 of 193 keys (20%) had a word that does not name the picture**:
`singing` = a MICROPHONE · `butter` = drawn as CHEESE (a block WITH HOLES) · `chess` = a chess PIECE
· `dice` = ONE die · `cymbals` = a whole DRUM KIT · `honey` = a JAR · `hockey` = a PLAYER.

**That is why this arc kept failing: everyone was arguing about the plural of the WRONG WORD.**

Record what you saw in `image_seen`. A row without it is treated as unjudged and sent back.

## 🔴 RULE 2 — LOOK IT UP. "I cannot verify from memory" is NOT an answer.

The operator: *"even by just googling I can easily get the right plural form of any word but you
fail again and again."* He is right. The old brief said "uncertain → HOLD", and reviewers wrote
*"I cannot verify SAOL from memory"* **100+ times on Swedish alone**. Honest, and useless.

**Most authorities cannot be fetched with a plain request** — svenska.se (SAOL) is a JavaScript
shell; ordnet.dk is bot-walled; **Van Dale's free dictionary is DISCONTINUED**. So use the tool that
renders them in a real browser:

```
node scripts/vocab-audit/dict-fetch.js --locale=<<LOC>> --word=<word>
node scripts/vocab-audit/dict-fetch.js --locale=<<LOC>> --word=<word> --crosscheck
```
Authority: **<<AUTHORITY>>**. Cite the URL you actually consulted. **Never invent a citation** — a
fabricated `src` is a tell: the de round escalated `hot` for exactly that (a guessed value with an
empty source), and `deinonychus` cited "SAOL" for a word SAOL does not contain.

Uncertainty is a reason to **search**, not to hold. Only a genuine *content* question (which of two
things is pictured?) may be HOLD.

## 🔴 RULE 3 — the classification is already decided. Do not re-litigate it.

`classification.json` says, per key, what the PICTURE is — decided once and applied to all 11
locales, because *"all of the languages reflect the same images"* (the operator). Your row carries
`category` / `hasGender` / `hasPlural`. **You verify the WORD, not the category.**

| category | gender | plural |
|---|---|---|
| countable-thing | yes | yes |
| plural-picture (the image shows SEVERAL) | yes | **no** — the label IS the plural |
| mass / abstract / proper-noun | yes | **no** |
| adjective / activity | **no** | **no** |

Mass, abstract and proper nouns **are nouns**: *die* Venus keeps its gender and simply has no plural.
Only **qualities and activities** lose it.

**If the picture contradicts the category, say so** — that is a finding, and it outranks the file.

## 🔴 RULE 4 — BLOCKED keys: touch nothing.

Rows marked `blocked: true` are LEMMA MISMATCHES — the word does not name the picture. Their
`hasPlural` describes the **pictured object** (Mikrofon→Mikrofone), NOT the label. Pluralising
"Singen" → "Singens" manufactures exactly the garbage this commission deletes. **Skip them.** The
operator rules first: fix the WORD, or fix the ART.

## Your job — per key, per field

1. **`singular`** — is it the right <<LANG>> word for what the picture shows? Is it really a
   SINGULAR? (Known defect: a plural, or a DEFINITE form, sitting in the singular field —
   sv `santa` held *"Jultomten"*, onto which the script appended `-ar`.)
2. **`plural`** — correct per <<AUTHORITY>>? <<PLURAL_TRAPS>>
3. **`gender`** — correct? <<GENDER_CODES>>
   ⚠ **Gender codes are per-locale and NEVER cross-applied** (§A.13.58): `lås` is common in da/no but
   **neuter** in sv. sv/da `n` = **EN-ord (COMMON)**, NOT neuter — misreading it inverts your batch.

## ⚠ The inverse traps — correct data a naive rule DESTROYS

Each of these was nearly wrecked by a plausible rule. Do not repeat it:

- **English zero-plurals are COUNTABLE.** `Angelfish/Angelfish`, `Sheep`, `Deer`, `Fish` — English
  merely does not inflect them. **de *Kaiserfisch→Kaiserfische* is CORRECT.** A "no plural" ruling
  here destroys real plurals in ten languages.
- **English pluralia tantum over ONE object.** `pants`, `scissors`, `stairs`, `sunglasses` are a
  single object — **de *Hose→Hosen*, *Schere→Scheren*, *Treppe→Treppen* are CORRECT.** The real cut
  is one-object vs a genuine two-object PAIR (`sandals`, `slippers` ARE pairs).
- **A "sister key" may be a different thing.** `glasses` (spectacles, *Brille→Brillen*) is NOT the
  plural of `glass` (a drinking vessel). Reading a sister field mechanically kills a correct plural.
- **`_countable:false` is fallible** — wrong on `bread`, `asparagus`, `cheese`, `broccoli`, `celery`
  (all have real plurals); right on `Knoblauch` (kein Plural).
- **A class rule is a tool, not an automaton.** A de reviewer rightly refused `-saurus→-saurier` for
  `carnotaurus` (Latin *taurus*); an sv reviewer rightly kept `Stegosaurusar` (Latin `-us` loans take
  `-ar`) and refused *\*smörgäss*. That discrimination IS the quality bar.
- **A premise can be false even when the conclusion is right:** three sv rows argued *"an utrum noun
  cannot have a zero plural"* — false (*en musiker → flera musiker*). Never reuse it.

## Verdicts (per field)

- **`OK`** — correct. **Say OK when it is right**, flag or no flag.
- **`FIX`** — wrong; a pure form correction of the SAME word → give `correct`.
- **`NO_PLURAL`** — no (child-level) plural: mass, abstract, proper names.
  ⚠ **Not the same as a zero plural.** *ett hus → flera hus* HAS a plural that merely looks
  identical → that is `OK`, not `NO_PLURAL`.
- **`PLURALIA_TANTUM`** — plural only. May sit on `singular`: "this word has no singular".
- **`HOLD`** — the correction does MORE than fix a form (another lemma, a picture question, an
  internal contradiction). **Never rewrite blind.**

## Output

One file → `docs\audit-results\vocab-audit\verdicts\<<LOC>>-<NN>.json`, **one row per key, ALL keys**:

```json
{ "locale":"<<LOC>>", "batch":"<NN>", "reviewed": <N>,
  "rows": [
    { "key":"curtains",
      "image_seen":"around_the_house/curtains@2x.webp — two drawn curtains framing a window",
      "singular":{"verdict":"OK"},
      "plural":{"verdict":"OK","reason":"plural-picture: the label IS the plural; nothing further","source":"<<AUTHORITY_URL>>"},
      "gender":{"verdict":"OK"} }
  ] }
```
`correct` only on `FIX`. `reason` on everything but `OK`. `source` = the URL you fetched.
`image_seen` on every row that has art.

## Rules

- **Every key in the batch** — no sampling.
- **Never guess.** Search first. Uncertainty is legitimate and valuable; a fabricated citation is not.
- Change **NO** other file.
- End with ONLY: count reviewed, per-field per-verdict counts, and the 5 most serious findings.
