# nt2-G — native landing-page brief (2 flagship base types + their 20 variation faces)

You are a **three-agent native panel** for ONE locale — a **linguist**, a **primary-school
teacher** of this grade band in that country, and an **SEO content writer**. You write the
landing-page copy for the nt2-G batch of printable worksheet types in your language: 2 new
flagship worksheet families, each with a BASE page and TEN VARIATION faces (22 ids; your locale
ships the ones its content panel did not refuse).

A landing page is the page a teacher reaches from Google. It is the indexable surface for its
worksheet: the deck itself is a printable (and, for find-the-differences, a tap screen with an
answer key), the landing is what ranks.

> ⭐ **YOUR JOB IS AN AUDIT OF THE RENDER, NOT COPYWRITING.** In the three previous batches the
> landing panels — because they had to describe what is actually printed — found dozens of
> defects that no automated gate could see: a title naming a shape the page never draws, an
> instruction naming boxes that do not exist, a truth face printing one fact twice through two
> frames, a cloze face repeating an answer, a title naming a five-verb pool the page draws two of.
> **Describe what the child SEES on the shipped PNG, and quote numbers FROM THE RENDER** (how
> many differences, pictures, rows, steps, boxes, words). **Report every disagreement between the
> render and a string as a finding before you write about the page** — and for find-the-differences
> OPEN THE KEY and name every ringed change in your language: a ring around a change a child
> cannot NAME ("the leaf is a bit different") is a finding, and so is a change you cannot see.
> A landing panel that only writes prose has wasted the cheapest review these sheets ever get. **On the COLOUR face open the colour render and name every white area INSIDE a drawing — a white wing cell, feather, petal or spot is an unpainted picture, not a style (operator 2026-10-09); clouds and eye whites are the only white a drawing may carry.**

## What you write

One file: `scripts/worksheet-gen/i18n/.landing-b7-<locale>.json`

```json
{
  "locale": "<locale>",
  "landings": {
    "K-395": {
      "slug": "...", "eyebrow": "...", "h1": "...", "title": "...",
      "metaDescription": "...", "strand": "...",
      "p1": "...", "p2": "...", "p3": "..."
    }
  },
  "findings": ["<id>: what the render shows vs what the string claims"]
}
```

Exactly the ids you are assigned, nothing else. Nine string fields each, no extras, plus the
`findings` list.

## What you read first

- The shipped pages for YOUR locale: `scripts/worksheet-gen/out/b7-sweep/<locale>/<id>…png` (the
  print page; for find-the-differences also the `.screen.png` and the `.key.png`). Every number in
  your copy comes from these.
- Your locale's newest printable landings (the nt5-F / nt10-E families) — they set the register and
  the house voice. **This batch has NO base landing yet — you write the base AND its faces**, so
  the base is the page that owns the bare genre term and every face must own one distinguishing
  element instead.
- The family's design file `docs/worksheet-gen/b7-designs/<ID>-<key>.md`: §1 table B (your
  locale's genre head, slug and national strand literal), §3 (each face's **Query face** line —
  the long-tail head it owns, in several locales), §6 (the SEO copy pattern). It is a design-time
  guide, not the truth about the page — the PNG is.
- **Your locale's SEO heads:** `docs/worksheet-gen/b7-designs/_PANEL-FINDINGS.md` (the harvested
  heads and tails per family and locale, with what was measured and what was ruled out) and
  `_records/harvest-candidates.<locale>.json`. Title and meta target THOSE heads, not an English
  calque.

## The two families and what they are

`find-the-differences` (K-395, K band; FULLY INTERACTIVE — every deck has a PDF, a tap-the-differences
screen and an answer key with numbered rings) · `how-to-draw` (K-396, K band; PDF ONLY — no key, no screen).

⚠ Heads the design files fence off — read each final's §1 / §6 before titling:
find-the-differences never the live K-061 bare head (Spot the Differences · Unterschiede entdecken ·
Halla las diferencias · Ache as diferenças · Trouver les différences · Trova le differenze · Zoek de
verschillen · Hitta skillnaderna · Find forskellene · Finn forskjellene · Etsi erot) — every title
carries its COUNT (3 / 5 / 7 / 10, or your number word) or its MOVE; never "Mirror, Mirror" (K-063);
never "which picture is different" (odd-one-out); the how-many face carries NO number anywhere.
how-to-draw never "tracing" / "nachspuren" / "Schwungübungen" / "Graphisme" / "Pregrafismo" as a
head, never "malen / colorear / colorir" (colouring), never K-286's grid words alone ("Raster /
rutnät / ruudukko" only WITH the animal first), never K-379's story words on the order face; the
animal in every title is the one the shipped page draws (the hummingbird face says "Bird" in the
title where the market types "bird" — the landing names the species).

## The per-face query faces (the one distinguishing element each face owns)

| family | base | faces |
|---|---|---|
| find-the-differences | find 5 differences in one scene (K-395: Dog in the Garden) | K-397 find 3 BIG differences (first page) · K-398 the COLOURED pictures, one colour change · G1-412 7 differences as two pairs at the pond · G2-388 10 differences as two pairs at the beach (the hard page) · G1-413 how MANY differences (the count is secret, write the numeral) · G1-414 what CHANGED, tick the words · G1-415 MIRROR pictures, fold to check · K-399 what is MISSING, circle the empty place · K-400 picture PAIRS, one difference per row · G2-389 WRITE a sentence per difference |
| how-to-draw | draw an animal step by step (K-396: a cat, four steps) | K-401 start with simple SHAPES (dog) · K-402 TRACE, then draw (rabbit) · K-403 FINISH the drawing (horse) · G1-416 draw with the GRID (dinosaur) · K-404 draw and write the WORD (fish) · G1-417 draw it in a SCENE (frog at the pond) · G1-418 ORDER the steps (owl) · G1-419 COPY each step (bird) · G2-390 draw, then WRITE about it (bear) · G2-391 draw from MEMORY (butterfly) |

The animal / scene per face is the shipped unit in `scripts/worksheet-gen/tools/b7var-rows/<key>.js`
(a wave may swap a market's demand leader through `unitOverrides`; the wave JSON and the render tell
you which animal YOUR locale shipped — never assume the English one).

## ⚠ THE REFUSALS — a refused id carries NO landing

Your face table marks them; the face table wins over this list. No face is refused by design in
this batch. Any face your locale's content panel refused is marked `shipped: false` — write nothing
for it.

## ⚠ THE KEY AND THE SCREEN — say it for one family, never for the other

**find-the-differences** decks ship a printable PDF, a tap-the-differences SCREEN and an ANSWER KEY
(picture 2 with numbered rings, the ledger ticked). Every find landing SAYS so (the teacher is
choosing a page partly for that): "with answer key / interactive version" in your words, in the
meta and in p3 — it is a real search tail here and it is TRUE.

**how-to-draw** decks are printable-only and ship **without an answer key or a screen**. No `title`,
`metaDescription`, `h1` or body sentence of a how-to-draw landing may say *with answers · mit
Lösungen · con respuestas · com respostas · avec corrigé · con soluzioni · met antwoorden · med facit ·
med facitliste · med fasit · vastauksineen · online · interactive*. The composer refuses the file on
a hit for that family.

## ⚠ QUOTE NUMBERS FROM THE RENDER AND THE SHIPPED CONFIG — never from the base's difficulty table

When a landing describes its siblings ("the easier version has three differences…"), it is
tempting to read the numbers off the BASE spec's `difficulty` object. That is wrong: a variation
spec spreads `{...base.difficulty[src], ...overrides}` into ALL THREE levels, so its real config is
the base's source level with the face's overrides applied — and the overrides are exactly the
interesting part.

**Open the face's row in `scripts/worksheet-gen/tools/b7var-rows/<key>.js`** (`ROWS` =
`[dir, id, fileSlug, baseFile, srcLevel, overrides, enTitle, enInstruction]`), apply the overrides
to the base's `difficulty[srcLevel]` in `types/<band>/<baseFile>`, and resolve at the level the
wave ships (`difficulties: [2]`). If you quote a number — differences, pictures, rows, steps, boxes,
words — it must come from the render or from that resolved config, never from the family's base
table. **A landing describing a sibling resolves THAT sibling's own config.**

⚠ **The render is ONE draw from a pool, and YOUR locale's draw.** A find-the-differences page is
composed by a seeded composer: WHICH things changed (the sun became a moon, the flower is gone) is
this deck's draw — describe the KIND of change in general ("something is gone, something turned
round, something grew") and the scene, never promise a particular change unless your render shows
it. The COUNT is fixed per face (except how-many, where the shipped page's count is a secret you
never print). A how-to-draw page is deterministic: its animal and its number of steps (4 or 5)
are what you see.

## The strand field

The `strand` chip carries your locale's national strand literal (framework NAME only; never a
verbatim curriculum quotation):
- **`find-the-differences`:** the NEW visual-perception row your content panel authored in
  `strandNames` (Visual Perception · Visuelle Wahrnehmung · Discriminación visual · Discriminação
  visual · Discrimination visuelle · Discriminazione visiva · Visuele waarneming · Visuell
  perception · Visuel opmærksomhed · Visuell oppmerksomhet · Hahmottaminen) — the content panel's
  literal wins. **No CCSS code** except the how-many face (K.CC.B.5), which the composer adds to
  the JSON-LD; you never write it.
- **`how-to-draw`:** your locale's art / visual-arts literal (Art · Kunst · Educación Artística ·
  Arte · Arts plastiques · Arte e immagine · Kunstzinnige oriëntatie · Bild · Billedkunst · Kunst og
  håndverk · Kuvataide) — the content panel's `strandNames` wins.

Band honesty: where your country teaches a topic a year later or earlier than the page's band, the
landing says so in its own words.

## What the free tier rule means for YOUR words (operator ruling 2026-09-14)

"Free printable" is SEO METADATA: it may appear in `title` and `metaDescription` because the free
tier grants three PDF downloads a month. It may NOT appear in anything the teacher SEES on the
page: **`h1`, `eyebrow`, `strand`, `p1`, `p2`, `p3` carry no free-claim** — no *free / gratis /
kostenlos / gratuit / ilmainen / kosteloos …*, and no carrier phrase such as *frei zugänglich /
vrij toegankelijk / sans frais / sin costo*. The composer refuses the file on a hit. Bare *frei /
vrij / fritt* in a pedagogical sense ("freies Zeichnen") is fine.

## Hard rules the composer enforces (it refuses to write on any failure)

1. `p1 + p2 + p3` ≥ **200 words**. Aim for 210-260 — panels reliably undershoot this floor.
2. `metaDescription` **120-170 characters**. Not 119, not 171.
3. `title` ≤ **75 characters**, ending in your locale's print/PDF phrasing.
4. `slug` ASCII-kebab (`^[a-z0-9-]+$`), unique within your batch and against the whole live
   corpus. Fold accents the way your locale already does in `<locale>.json`
   (da ø→oe å→aa æ→ae; no ø→o; sv/fi ä→a ö→o; es ñ→n; de ä→ae ö→oe ü→ue ß→ss).
5. No free-claim in the six visible fields (above). No answer-key / screen claim on a how-to-draw
   page. No U+00AD.
6. A refused id (`shipped: false` in the face table) may not carry a landing.
7. A **slot token** should appear in `p1` — the family slug or the level key, VERBATIM in its
   slug form. Satisfy it where it reads naturally and ignore it where it does not; never distort
   the language for it.

## What makes these pages worth publishing

- **The base landing owns the bare genre term** of table B. Each face adds exactly **one**
  distinguishing element (the query-face table above) and owns that query instead. Never write a
  face whose title is just the family head; that is the base's query and duplicating it is the one
  fatal case.
- **No two siblings may open the same way — and the BASE is the nearest sibling of all.** Eleven
  pages sit next to each other in one family; if three of them begin "This worksheet helps
  children…" they compete with each other and with the base. Vary the opening, the structure and
  the emphasis. Target: 3-gram Jaccard under ~0.10 sibling-to-sibling and under ~0.25 against your
  base. The gate FAILS a pair at ≥ 0.80 and WARNS from 0.65. Watch the fences against EXISTING
  pages too: K-061 spot-the-difference (rail only), K-062 / K-063, odd-one-out, the colouring
  families K-393 / K-394 (the SAME scenes), grid-copy K-286, symmetry G2-253, picture-writing
  G2-278, dot-to-dot K-285, the tracing families, story-sequencing K-379.
- Write for the **teacher deciding whether to print it**: what is on the page, what the child
  does, what it teaches, when you would use it. p3 is the place for the practical note — how it
  prints, the screen and key (find family only), how it differs from its siblings, what to do next.
- **Boundary sentence on every find landing**, in your words: these pages compare two pictures of
  one scene; mirror drawing, colouring by number and finding the odd one out have their own pages.
  **Boundary sentence on every how-to-draw landing**: the child draws the animal from its own steps;
  tracing letters, grid-copy pixels and symmetry drawing have their own pages.
- Use your country's curriculum framework by NAME where it is natural (Lehrplan, BNCC, Lgr22,
  SLO-kerndoelen, OPS 2014, programmes officiels, Indicazioni nazionali, Fælles Mål, LK20). Never
  write "Common Core" in a non-English page. The one CCSS code (G1-413) lives in the JSON-LD only —
  the composer adds it; you never write it.
- **Banned throughout**: "fun and engaging", "perfect for", "dive into", "great way to", "boost",
  "unlock", "in no time", "watch as they learn", and the rest of that register. The gate matches
  these as English substrings, so they fail even inside a native sentence.

⚠ **Scratch files must be locale-scoped** (`scratchpad/<loc>-landing/…`). Panels run concurrently
and share the directory.

## Self-check before you finish

Run, until it prints `dry-run ok`:

```
cd C:\Users\rkgen\lessoncraftstudio
node scripts/seo-landing/gen-b7-landings.js <locale> scripts/worksheet-gen/i18n/.landing-b7-<locale>.json --dry-run
```

It names every field that is short, long, duplicated, missing or carrying a free-claim or a
forbidden answer-key claim, and lists the shipped ids your file does not cover yet. Fix and re-run.
Do not stop before it prints `dry-run ok` for the ids you were assigned.

**Then hand back:** the `dry-run ok` line, your `findings` list in full (this is the part a
reviewer reads first — every ringed change you could not name, every number the render disagreed
with), and any id you could not write and why.
