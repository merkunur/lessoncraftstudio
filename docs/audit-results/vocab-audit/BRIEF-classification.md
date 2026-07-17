# Commission: classify what each PICTURE is — once, for all 11 languages

> **This is the binding text.** Every batch is judged against exactly this wording. Do not
> reinterpret it. **If this brief and a dictionary contradict each other, the dictionary wins** —
> say so explicitly in `reason`. That is wanted, not risky: this brief's author has already been
> caught being wrong twice this week by reviewers who contradicted him in writing, and both times
> the reviewers were right.

## The operator's rule — this is the whole design

> *"All of the languages reflect the same images. If an image is a noun it is a noun in all
> languages. If it is not a noun in a language it is not a noun in all languages."*

The **referent decides the category**, and the referent is the same picture for every locale. So you
decide **once per key**, and your decision applies to all 11 languages. You are not doing German or
Swedish here. You are answering: **what is in the picture?**

The shipped code already works this way — `build-pww-index.js` marks adjectives and gerunds
`noArticle:true` so the wall renders them frameless *"in EVERY locale and never speaks 'der Rot'"*.

## Why this commission exists

`REFERENCE TRANSLATIONS/image-vocabulary.js` feeds an educational site for children aged 3–7. The
words are **projected on the board AND read aloud** (text-to-speech) beside a picture.

**No human ever wrote these plurals or genders.** A script invented all 13,893 of them from the
singular. It invented `Gardinerar`, `Musklerar`, `Lägerar`, `Jordekorrrar` — words that do not
exist and were read to children. It also stamped a gender onto things that cannot have one:
`red → ["Rot","Rot","m"]`. The wall then hid that downstream instead of fixing it.

The operator's ruling, verbatim: **"If they are not nouns, don't make up anything, they don't need
plural or gender."**

## Your job — two independent questions per key

For each key decide **what the picture shows**, then answer both:

| the picture shows | `category` | `hasGender` | `hasPlural` |
|---|---|---|---|
| one countable thing (a cat, a curtain, a football) | `countable-thing` | **yes** | **yes** |
| SEVERAL of a thing — the label itself is plural (a picture of curtains) | `plural-picture` | **yes** | **no** |
| a substance / mass (water, jam, sand) | `mass` | **yes** | **no** |
| an abstract idea (science, liberty) | `abstract` | **yes** | **no** |
| a named thing (Venus, Earth, Santa) | `proper-noun` | **yes** | **no** |
| a QUALITY (red, angry, beige) | `adjective` | **NO** | **NO** |
| an ACTIVITY (swimming, baking, skiing) | `activity` | **NO** | **NO** |

**They are two separate axes.** A proper noun IS a noun — *die* Venus, *la* Terre — so it keeps a
gender and simply has no plural. (The German round already corrected `venus` der→**die**; that
gender is real and load-bearing.) Only **qualities and activities** lose the gender.

## ⚠ The trap that makes this hard: `en[0] === en[1]` means FOUR different things

Every key in your batch has the same English singular and plural. That does **not** tell you the
picture has no plural. It conflates:

| English | what it really is | do other languages have a plural? |
|---|---|---|
| `Curtains/Curtains` | **plural-picture** — the label is a plural | **no** |
| `Water/Water` | **mass** | **no** |
| `Red/Red` | **adjective** | **no** |
| `Angelfish/Angelfish` | **English ZERO-PLURAL — a single countable fish!** | **YES, and they are CORRECT** |

`angelfish` is `de ["Kaiserfisch","Kaiserfische"]` — a **correct** German plural. English merely
zero-pluralises fish/sheep/deer/moose/shrimp/squid. **Classifying such a key as "no plural" would
destroy correct plurals in ten languages.** This is the single most dangerous error you can make
here. When the English word is an animal or an object that English happens not to inflect, it is
`countable-thing`.

## ⚠ The hypothesis in your data is WRONG — overturn it when it is

`hypothesis.raw_type` comes from a machine and is **English-centric and demonstrably false**:
`chess`, `football`, `golf`, `baseball`, `badminton` are typed `verb-gerund`, but the picture is an
**object** — chess is a noun in English too (*ett schack*, *das Schach*, *en fotboll → fotbollar*).

Treat `raw_type` as a **starting guess you must confirm or overturn**. An overturn is a *finding*,
not a problem — say so in `reason`. `hypothesis.raw_countable` is likewise only a hint; it is
provably fallible (`bread` is marked `countable:false`, yet *ett bröd → flera bröd* is perfectly
correct).

## `plural-picture` vs its sister key — do NOT merge them

Some keys carry `sister_singular_key`. Example: `curtain` = `["Curtain","Curtains"]` (a picture of
ONE curtain) and `curtains` = `["Curtains","Curtains"]` (a picture of SEVERAL). **These are two
different pictures and two legitimate rows.** They are NOT duplicates and must NOT be merged: the
sister keeps `singular/plural`; the plural-picture key's label simply IS the plural, with nothing
further.

## Research is MANDATORY, not a last resort

You have **WebSearch and WebFetch. Use them.** The previous rounds failed precisely because
reviewers wrote *"I cannot verify from memory"* and held — honest and useless. The operator's words:
*"even by just googling I can easily get the right plural form of any word."* He is right.

- **"I could not verify from memory" is NOT an acceptable answer.** Uncertainty is a reason to
  search, not to hold.
- **Never invent a citation.** Cite the URL you actually fetched. If a lookup fails, say which
  source you tried and that it failed.
- Only a genuine *content* question (which of two things is in the picture?) may be `HOLD`.

## 🔴 LOOK AT THE PICTURE. This is not optional, and it is the whole job.

**You MUST open the image file with the Read tool before you classify a key.** The Read tool
renders `.webp` directly. The image is at:

```
C:\Users\rkgen\lessoncraftstudio\image-library-webp\themes\<theme>\<file>@2x.webp
```

where `<theme>` is an entry from the row's `themes` and `<file>` is the key with `-`→`_`
(`french-fries` → `french_fries@2x.webp`). If one theme path fails, try another from the list.

**Why this rule exists, in blood.** A first classification pass reasoned from the English word, the
theme NAME and the dictionary — and never opened a single image. It was checked against two
pictures and was wrong on both:

- `chess` — themes `[activities, toys]`, de `Schach`. Ruled `abstract` (the game, no plural).
  **The picture is a chess KING — a physical piece.** A countable object. And *Schach* names the
  game, so the label does not even name the thing in the picture (*Schachfigur* does).
- `football` — themes `[activities, sports bw]`, de `American Football`. Ruled `abstract` (the
  sport, no plural). **The picture is a BALL.** Countable: *footballs*, *Footballs*, *fotbollar*.

Two for two, wrong, from good reasoning over the wrong evidence. A Swedish native separately
insisted *"en fotboll → fotbollar"* — she was right, because she was picturing the ball. A Dutch
round held `football`/`golf`/`hockey`/`tennis` as *"sports twijfel"* for exactly this reason and
had no way to settle it. **You do: open the file.**

The operator's rule — *"all of the languages reflect the same images"* — only works if someone
actually looks at the image. That someone is you.

**A theme name is a hint, not the picture.** `toys/chess` contains a chess piece, not a toy set.

## The `themes` field tells you WHERE to look

`themes` locates the art. The vocabulary is keyed flat, so the subject lives only there — `orange`
with `[colors, fruits]` is undecidable without it; `salt` with `[at_the_supermarket]` is table salt
(a mass), not the chemist's *salts*. Use it to find the file, then **look**.

If a key resolves to art in two themes that show **different things** (`colors/orange` the swatch vs
`fruits/orange` the fruit), say so — that is a key that carries two pictures, and it is a finding.

Some keys carry `no_image: true` — no picture resolves to them (dead data, ~84 keys). You cannot
look at those; classify from `en` + `themes`, mark them, and say the image was unavailable.

## Output

Write **one** file to
`C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\classify\verdict-<PART>.json`
with **one row per key — EVERY key in your batch, none missing**:

```json
{ "part":"<PART>", "reviewed": <N>,
  "rows": [
    { "key":"curtains", "category":"plural-picture", "hasGender":true, "hasPlural":false,
      "reason":"themes=[around_the_house,furniture]; the picture shows several curtains and the English label is itself the plural of the sister key 'curtain'. The label IS the plural; there is nothing further to pluralise.",
      "overturns_hypothesis": false, "source":"" },
    { "key":"angelfish", "category":"countable-thing", "hasGender":true, "hasPlural":true,
      "reason":"a single countable fish; English merely zero-pluralises fish. de Kaiserfisch->Kaiserfische is a CORRECT plural and must be kept.",
      "overturns_hypothesis": false, "source":"https://…" },
    { "key":"chess", "category":"countable-thing", "hasGender":true, "hasPlural":true,
      "image_seen":"toys/chess@2x.webp — a single chess KING piece, red/gold, on white",
      "reason":"I opened the image: it is a chess PIECE, not the game. A countable object -> plural. raw_type 'verb-gerund' is wrong, but so is 'the game': de 'Schach' names the GAME and does not name what is pictured (Schachfigur does). LEMMA MISMATCH — flagged.",
      "overturns_hypothesis": true, "source":"https://…" }
  ] }
```

`reason` is required on **every** row. **`image_seen` is required on every row that has an image** —
one line describing what you actually saw. A row with no `image_seen` will be treated as
unclassified and sent back.

`source` wherever you looked something up. Set `overturns_hypothesis: true` whenever your
`category` contradicts `raw_type`.

**If the word does not name what is in the picture, say so** (`"LEMMA MISMATCH"` in `reason`). That
is a more serious defect than a wrong plural and no previous pass could see it — they were not
looking.

## Rules

- **Classify every key in the batch** — no sampling, no selection.
- Decide from the **picture** (`themes` + `en`), never from the English word class alone.
- **Never guess.** Search first; `HOLD` only for a genuine content question, with a reason.
- Change **NO** other file. Only your one verdict file.
- Finish with ONLY: the number classified, the count per `category`, how many overturned the
  hypothesis, and the 5 most serious findings on one line each.
