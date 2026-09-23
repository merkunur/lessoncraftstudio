# nt10-E — native landing-page brief (10 base types + their variation faces)

You are a **three-agent native panel** for ONE locale — a **linguist**, a **primary-school
teacher** of this grade band in that country, and an **SEO content writer**. You write the
landing-page copy for the nt10-E batch of printable worksheet types in your language: 10 new
worksheet families, each with a BASE page and up to five VARIATION faces (≤ 60 ids; your locale
ships the ones its content panel did not refuse).

A landing page is the page a teacher reaches from Google. It is the indexable surface for its
worksheet: the deck itself is a printable, the landing is what ranks.

> ⭐ **YOUR JOB IS AN AUDIT OF THE RENDER, NOT COPYWRITING.** In the two previous batches the
> landing panels — because they had to describe what is actually printed — found dozens of
> defects that no automated gate could see: a title naming a shape the page never draws, an
> instruction naming boxes that do not exist, a truth face printing one fact twice through two
> frames, a cloze face repeating an answer, a title naming a five-verb pool the page draws two of.
> **Describe what the child SEES on the shipped PNG, and quote numbers FROM THE RENDER** (how
> many pictures, rows, signs, moons, continents, family members, blanks). **Report every
> disagreement between the render and a string as a finding before you write about the page.** A
> landing panel that only writes prose has wasted the cheapest review these sheets ever get.

## What you write

One file: `scripts/worksheet-gen/i18n/.landing-b5-<locale>.json`

```json
{
  "locale": "<locale>",
  "landings": {
    "K-368": {
      "slug": "...", "eyebrow": "...", "h1": "...", "title": "...",
      "metaDescription": "...", "strand": "...",
      "p1": "...", "p2": "...", "p3": "..."
    }
  },
  "findings": ["<id>: what the render shows vs what the string claims"]
}
```

Exactly the ids you are assigned, nothing else. Nine string fields each, no extras, plus the
`findings` array (empty only if you genuinely found nothing — say so explicitly). A locale is
written in halves (bases first, then faces, or by family) — the composer merges by slug and is
idempotent, so halves land in any order and a corrected half is re-applied on its own.

## Where the facts come from

- `scripts/worksheet-gen/out/b5-faces.<locale>.json` — the face table (`rows`): every id with its
  family key, band, `isBase`, `mode`, the SHIPPED theme (`theme`; **every nt10-E family is
  themeless**, so expect `null` — never invent one), whether it is `shipped` or `refused` (write
  NOTHING for a refused id), the worksheet's own **title and instruction in your language**, and
  `png` — the path of that face's **rendered page**.
- **Open the PNG for every face you write about.** Describe what is actually on the page — how
  many cards, what the child does, what is printed and what is blank. `png: null` means the render
  is missing: report it, do not guess. The renders are under
  `scripts/worksheet-gen/out/b5-sweep/<locale>/<ID>-null-d2-<locale>.png`.
- `scripts/worksheet-gen/i18n/strings.<locale>.json` — the worksheet's title + instruction were
  written by your locale's content panel. **The landing must agree with them.** If the render and
  the string disagree, the render wins and the disagreement is a `finding`.
- `frontend/content/seo-landing/<locale>.json` — the live corpus in your locale. Read a few of
  your locale's newest printable landings (the nt10-D families: tangram, weather-symbols, cloze,
  rounding…) — they set the genre head, the register and the house voice. **This batch has NO base
  landing yet — you write the base AND its faces**, so the base is the page that owns the bare
  genre term and every face must own one distinguishing element instead.
- The family's design file `docs/worksheet-gen/b5-designs/<ID>-<key>.md`: §1 table B (your
  locale's genre head, slug and national strand literal), §3 (each face's **Query face** line —
  the long-tail head it owns, in several locales), §6 (the SEO copy pattern). It is a design-time
  guide, not the truth about the page — the PNG is.
- **Your locale's SEO heads:** `docs/worksheet-gen/b5-designs/_work/_selection-seo-germanic.md`
  (en · de · nl), `_selection-seo-romance.md` (es · pt · fr · it), `_selection-seo-nordic.md`
  (sv · da · no · fi) — the harvested heads and tails per family, with what was measured and what
  was ruled out. Title and meta target THOSE heads, not an English calque.

## The ten families and what they are

`2d-shapes` (K-368) · `road-safety` (K-369) · `family` (K-370) · `plants` (G1-376) ·
`animal-life-cycles` (G1-377) · `earth-and-space` (G1-378) · `maps` (G1-379) · `digraphs`
(G1-380) · `synonyms` (G2-358) · `word-parts` (G2-359).

⚠ Heads the design files fence off — read table B before titling: `family` never "Meine Familie"
(de) / bare "família" (pt) / "sukupuu" (fi); `road-safety` sv never bare "Trafik"; `word-parts`
en never "word families", es never "Familias de palabras", fr never "familles de mots";
`synonyms` de F3 never "steigern" / "Steigerung". The family key `maps` is not the treasure-hunt
compass mode — no "with a compass", no steps on a grid.

## The per-face query faces (the one distinguishing element each face owns)

The base owns the bare genre head of table B. Each face owns ONE long-tail head — the en form is
below; your locale's form is on that face's **Query face** line in §3 of the family file and in
your `_selection-seo-*.md`.

| family | base | F1 | F2 | F3 | F4 | F5 |
|---|---|---|---|---|---|---|
| 2d-shapes | 2D shapes | G1-381 recognising shapes (real or not) | K-371 shapes around us | G1-382 write the names | G1-383 shape riddles | K-372 draw on dot paper |
| road-safety | road safety | K-373 colour the traffic light | K-374 crossing the road steps | G1-384 signs and their meanings | G2-360 kinds of road signs | G2-361 road sign quiz |
| family | family members | G1-385 family generations | K-375 family words to trace | G1-386 family tree + clues | G2-362 family relationship riddles | G1-387 family tree template |
| plants | parts of a plant | K-376 what plants need to grow | G1-388 plant life cycle (seed to plant) | G2-363 which part of the plant we eat | G2-364 parts of a plant and their functions | G3-392 parts of a flower |
| animal-life-cycles | butterfly life cycle | G1-389 frog life cycle cut and paste | G2-365 label the butterfly life cycle | G2-366 metamorphosis | G3-393 compare butterfly and frog | G1-390 what comes next |
| earth-and-space | sun, moon and planets | G1-391 moon phases in order | G2-367 name the moon phases | G2-368 why day and night | G3-394 planets in order | G3-395 giant and rocky planets |
| maps | map skills / map key | K-377 bird's-eye view | G2-369 compass rose | G2-370 label the continents | G3-396 continents and oceans | G2-371 cardinal directions on a map |
| digraphs | digraphs | K-378 sort by letter team (K) | G1-392 missing digraph | G1-393 read and match | G1-394 where is the digraph | G2-372 digraphs in sentences |
| synonyms | synonyms | G1-395 synonyms with pictures | G2-373 match synonyms | G1-396 shades of meaning | G2-374 synonyms for "said" | G3-397 word fields (go / look) |
| word-parts | prefixes, suffixes and root words | G1-397 picture families | G2-375 find the root word | G2-376 prefixes by meaning | G3-398 the person word (-er) | G3-399 one family, four sentences |

## ⚠ THE REFUSALS — a refused id carries NO landing

Your face table marks them, but know them going in. **626 of a possible 660 ship.** Every other
family ships 6 of 6 in every locale.

- **`digraphs` (G1-380 + faces K-378 · G1-392 · G1-393 · G1-394 · G2-372)** — the WHOLE family is
  REFUSED in **es · it · sv · da · no** (the inventory is owned by spelling-rules /
  syllable-reading, or fewer than 3 teams × 6 pictured words, measured). Those five locales write
  no digraphs landing at all, and their hub rail must show nothing for the key.
- **`G1-394` (digraphs F4, where is the letter team)** — REFUSED in **pt** (no word-final team).
  fi F4 was contingent on `uuni` — trust the face table.
- **`G3-398` (word-parts F4, the person word)** — REFUSED in **es · fr** (compound-words owns the
  agent nouns).
- **`G2-376` (word-parts F3, prefixes by meaning)** — REFUSED in **fi** (no prefixes).

If the face table disagrees with this list (a design-time risk that materialised: sv F3 / da F4
word-parts, the synonyms F1 lexicon floor in es / de, family F4 riddles), **the face table wins**
and the disagreement is a finding.

## ⚠ NO ANSWER KEY EXISTS — never promise one

These are printable-only decks and they ship **without an answer key**. No `title`,
`metaDescription`, `h1` or body sentence may say *with answers · mit Lösungen · con respuestas ·
com respostas · avec corrigé · con soluzioni · met antwoorden · med facit · med facitliste ·
med fasit · vastauksineen*. The composer refuses the file on a hit. "with answers" is a real
search tail for some of these heads and it is a **known loss** — take it deliberately, do not
write the claim.

## ⚠ QUOTE NUMBERS FROM THE RENDER AND THE SHIPPED CONFIG — never from the base's difficulty table

When a landing describes its siblings ("the easier version has four pictures…"), it is tempting
to read the numbers off the BASE spec's `difficulty` object. That is wrong: a variation spec
spreads `{...base.difficulty[src], ...overrides}` into ALL THREE levels, so its real config is the
base's source level with the face's overrides applied — and the overrides are exactly the
interesting part.

**Open the face's row in `scripts/worksheet-gen/tools/b5var-rows/<key>.js`** (`ROWS` =
`[dir, id, fileSlug, baseFile, srcLevel, overrides, enTitle, enInstruction]`), apply the overrides
to the base's `difficulty[srcLevel]` in `types/<band>/<baseFile>`, and resolve at the level the
wave ships (`difficulties: [2]`). If you quote a number — cards, rows, signs, moons, planets,
continents, oceans, family members, word counts — it must come from the render or from that
resolved config, never from the family's base table. **A landing describing a sibling resolves
THAT sibling's own config.**

⚠ **The render is ONE draw from a pool, and YOUR locale's draw.** A range-shaped claim ("up to
six pictures", "signs from three kinds") is checked against the pool that generates it, not the
instance in the picture. Read the generator and the bank (`scripts/worksheet-gen/data/b5/…`) for
your locale. Locale data is not uniform: the continent and ocean counts in `maps` are per-locale
data with a named source; the moon renders MIRRORED in pt (southern hemisphere); road signs are
your country's own sign table.

## The strand field

The `strand` chip carries your locale's **national strand literal from the family's §1 table B**
(framework NAME only; never a verbatim curriculum quotation):

- **Science — `plants`, `animal-life-cycles`, `earth-and-space`:** the existing `Science` row —
  Science · Sachunterricht · Conocimiento del Medio · Ciências · Questionner le monde · Scienze ·
  Oriëntatie op jezelf en de wereld · Naturorienterande ämnen · Natur/teknologi · Naturfag ·
  Ympäristöoppi. **No CCSS code**; NGSS appears in the English prose only, never in yours. pt
  prose may cite BNCC (EF02CI06 / EF02CI05 plants; EF03CI05 life cycles F4) as the file says.
- **Social-studies-like — `road-safety`, `family`, `maps`:** each has its OWN per-locale literal
  in table B (e.g. road-safety de `Verkehrserziehung`, da `Færdselslære`, no `Trafikkopplæring`,
  fi `Liikennekasvatus`; family pt `História: eu, minha família`, no `Samfunnsfag: familie og
  slekt`; maps sv `Samhällsorienterande ämnen`, no `Samfunnsfag`, pt/it `Geografia`). **No CCSS
  code**; C3 D2.Geo.1.K-2 appears in en prose only. Nordic cells are `[NSR]` — your panel signs
  them or corrects them (da maps: "panel rules").
- **`2d-shapes`:** the geometry literal of table B (Geometrie · Forma, espacio y medida ·
  Geometria · Espace et géométrie · Spazio e figure · Meetkunde · Geometri · Geometri og måling ·
  Geometria).
- **`digraphs`:** the existing `Reading: Foundational Skills` row in your language.
- **`synonyms`, `word-parts`:** the vocabulary literal of table B (Wortschatz untersuchen ·
  Ampliación del vocabulario · Ampliação do vocabulário · Le lexique · Lessico · Woordenschat… ·
  Ord och begrepp · Ord og begreber · Sanavaranto ja käsitteet). The **no** cell is MISSING in
  both files — your panel authors it.

Band honesty: where your country teaches a topic a year later (or earlier) than the page's band,
or a face is above band (plants F5, earth-and-space F3-F5, life-cycles F4), **the landing says so
in its own words**. A K face that is readiness everywhere (digraphs F1) says readiness.

## What the free tier rule means for YOUR words (operator ruling 2026-09-14)

"Free printable" is SEO METADATA: it may appear in `title` and `metaDescription` because the free
tier grants three PDF downloads a month. It may NOT appear in anything the teacher SEES on the
page: **`h1`, `eyebrow`, `strand`, `p1`, `p2`, `p3` carry no free-claim** — no *free / gratis /
kostenlos / gratuit / ilmainen / kosteloos …*, and no carrier phrase such as *frei zugänglich /
vrij toegankelijk / sans frais / sin costo*. The composer refuses the file on a hit. Bare *frei /
vrij / fritt* in a pedagogical sense ("freies Erzählen") is fine.

## Hard rules the composer enforces (it refuses to write on any failure)

1. `p1 + p2 + p3` ≥ **200 words**. Aim for 210-260 — panels reliably undershoot this floor.
2. `metaDescription` **120-170 characters**. Not 119, not 171.
3. `title` ≤ **75 characters**, ending in your locale's print/PDF phrasing.
4. `slug` ASCII-kebab (`^[a-z0-9-]+$`), unique within your batch and against the whole live
   corpus. Fold accents the way your locale already does in `<locale>.json`
   (da ø→oe å→aa æ→ae; no ø→o; sv/fi ä→a ö→o; es ñ→n; de ä→ae ö→oe ü→ue ß→ss).
5. No free-claim in the six visible fields (above). No answer-key claim anywhere. No U+00AD.
6. A refused id (`shipped: false` in the face table) may not carry a landing.
7. A **slot token** should appear in `p1` — the family slug or the level key, VERBATIM in its
   slug form. Satisfy it where it reads naturally and ignore it where it does not; never distort
   the language for it.

## What makes these pages worth publishing

- **The base landing owns the bare genre term** of table B. Each face adds exactly **one**
  distinguishing element (the query-face table above) and owns that query instead. Never write a
  face whose title is just the family head; that is the base's query and duplicating it is the one
  fatal case.
- **No two siblings may open the same way — and the BASE is the nearest sibling of all.** Six
  pages sit next to each other in one family; if three of them begin "This worksheet helps
  children…" they compete with each other and with the base. Vary the opening, the structure and
  the emphasis. Target: 3-gram Jaccard under ~0.10 sibling-to-sibling and under ~0.25 against your
  base. The gate FAILS a pair at ≥ 0.80 and WARNS from 0.65. Watch the fences the design files
  name against EXISTING families too (maps vs treasure-hunt / grid-coordinates / position-words;
  plants F2 vs science-sequence; word-parts vs compound-words; digraphs vs spelling-rules).
- Write for the **teacher deciding whether to print it**: what is on the page, what the child
  does, what it teaches, when you would use it. p3 is the place for the practical note — how it
  prints, how it differs from its siblings, what to do next.
- Use your country's curriculum framework by NAME where it is natural (Lehrplan, BNCC, Lgr22,
  SLO-kerndoelen, OPS 2014, programmes officiels, Indicazioni nazionali, Fælles Mål, LK20). Never
  write "Common Core" in a non-English page. The CCSS code (2d-shapes, digraphs, synonyms,
  word-parts faces that carry one) lives in the JSON-LD only — the composer adds it; you never
  write it.
- **Banned throughout**: "fun and engaging", "perfect for", "dive into", "great way to", "boost",
  "unlock", "in no time", "watch as they learn", and the rest of that register. The gate matches
  these as English substrings, so they fail even inside a native sentence.

⚠ **Scratch files must be locale-scoped** (`scratchpad/<loc>-landing/…`). Panels run concurrently
and share the directory.

## Self-check before you finish

Run, until it prints `dry-run ok`:

```
cd C:\Users\rkgen\lessoncraftstudio
node scripts/seo-landing/gen-b5-landings.js <locale> scripts/worksheet-gen/i18n/.landing-b5-<locale>.json --dry-run
```

It names every field that is short, long, duplicated, missing or carrying a free-claim or an
answer-key claim, and lists the shipped ids your file does not cover yet. Fix and re-run. Do not
stop before it prints `dry-run ok` for the ids you were assigned.

**Then hand back:** the `dry-run ok` line, your `findings` list in full (this is the part a
reviewer reads first), and any id you could not write and why.
