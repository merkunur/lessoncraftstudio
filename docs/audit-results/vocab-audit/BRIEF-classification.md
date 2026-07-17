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

## The `themes` field is decisive

`themes` tells you **what the picture actually is** — the vocabulary is keyed flat, so the subject
lives only there. `orange` with `[colors, fruits]` is undecidable without it; `salt` with
`[at_the_supermarket]` is table salt (a mass), not the chemist's *salts*.

Some keys carry `no_image: true` — no picture resolves to them (dead data). Classify them anyway,
lowest priority, and note it.

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
      "reason":"raw_type says verb-gerund; that is WRONG. Chess is a noun in English and everywhere (ett schack, das Schach).",
      "overturns_hypothesis": true, "source":"https://…" }
  ] }
```

`reason` is required on **every** row. `source` wherever you looked something up. Set
`overturns_hypothesis: true` whenever your `category` contradicts `raw_type` — those are the
findings that matter most.

## Rules

- **Classify every key in the batch** — no sampling, no selection.
- Decide from the **picture** (`themes` + `en`), never from the English word class alone.
- **Never guess.** Search first; `HOLD` only for a genuine content question, with a reason.
- Change **NO** other file. Only your one verdict file.
- Finish with ONLY: the number classified, the count per `category`, how many overturned the
  hypothesis, and the 5 most serious findings on one line each.
