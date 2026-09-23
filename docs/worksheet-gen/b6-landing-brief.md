# nt5-F — native landing-page brief (10 base types + their variation faces)

You are a **three-agent native panel** for ONE locale — a **linguist**, a **primary-school
teacher** of this grade band in that country, and an **SEO content writer**. You write the
landing-page copy for the nt5-F batch of printable worksheet types in your language: 5 new
worksheet families, each with a BASE page and up to five VARIATION faces (≤ 30 ids; your locale
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

One file: `scripts/worksheet-gen/i18n/.landing-b6-<locale>.json`

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

- `scripts/worksheet-gen/out/b6-faces.<locale>.json` — the face table (`rows`): every id with its
  family key, band, `isBase`, `mode`, the SHIPPED theme (`theme`; **every nt5-F family is
  themeless**, so expect `null` — never invent one), whether it is `shipped` or `refused` (write
  NOTHING for a refused id), the worksheet's own **title and instruction in your language**, and
  `png` — the path of that face's **rendered page**.
- **Open the PNG for every face you write about.** Describe what is actually on the page — how
  many cards, what the child does, what is printed and what is blank. `png: null` means the render
  is missing: report it, do not guess. The renders are under
  `scripts/worksheet-gen/out/b6-sweep/<locale>/<ID>-null-d2-<locale>.png`.
- `scripts/worksheet-gen/i18n/strings.<locale>.json` — the worksheet's title + instruction were
  written by your locale's content panel. **The landing must agree with them.** If the render and
  the string disagree, the render wins and the disagreement is a `finding`.
- `frontend/content/seo-landing/<locale>.json` — the live corpus in your locale. Read a few of
  your locale's newest printable landings (the nt10-E families: 2d-shapes, road-safety, plants, maps…) — they set the genre head, the register and the house voice. **This batch has NO base
  landing yet — you write the base AND its faces**, so the base is the page that owns the bare
  genre term and every face must own one distinguishing element instead.
- The family's design file `docs/worksheet-gen/b6-designs/<ID>-<key>.md`: §1 table B (your
  locale's genre head, slug and national strand literal), §3 (each face's **Query face** line —
  the long-tail head it owns, in several locales), §6 (the SEO copy pattern). It is a design-time
  guide, not the truth about the page — the PNG is.
- **Your locale's SEO heads:** `docs/worksheet-gen/b6-designs/_work/_selection-seo-germanic.md`
  (en · de · nl), `_selection-seo-romance.md` (es · pt · fr · it), `_selection-seo-nordic.md`
  (sv · da · no · fi) — the harvested heads and tails per family, with what was measured and what
  was ruled out. Title and meta target THOSE heads, not an English calque.

## The five families and what they are

`story-sequencing` (K-379) · `healthy-habits` (K-380) · `habitats` (G1-398) · `sink-or-float`
(G1-399) · `cursive-writing` (G2-377).

⚠ Heads the design files fence off — read each final's §6 before titling: story-sequencing never a
bare order word (science-sequence owns "Sequencing & Life Cycles" / "Reihenfolge & Lebenszyklen";
pt/it "sequência lógica" / "sequenze logiche" are the PATTERNS genre) — every title carries a story
word; healthy-habits never food / eating / Ernährung / "saludables" alone, never nl "gezonde
gewoontes", never the K-374 "step by step" family; habitats never the live G1-202 title (Where Do
Animals Live? · Waar wonen de dieren? · Var bor djuren? · Hvor bor dyrene?) and never a bare animal
theme word; sink-or-float never the live G1-204 title (Sink or Float? · Schwimmt oder sinkt? ·
¿Se hunde o flota? · Afunda ou Flutua? · Flotte ou coule ? · Galleggia o affonda? · Zinkt het of
drijft het? · Sjunker eller flyter?), always an experiment/predict word, es never "flotación";
cursive-writing never "tracing" / "nachspuren" / "Schwungübungen" / "Graphisme" / "Pregrafismo",
no never "løkkeskrift", and each de title names the script its page shows (Vereinfachte or
Lateinische Ausgangsschrift).

## The per-face query faces (the one distinguishing element each face owns)

| family | base | F1 | F2 | F3 | F4 | F5 |
|---|---|---|---|---|---|---|
| story-sequencing | story sequencing (number the pictures) | K-381 cut and paste: first, next, last | G1-400 what happens next | G1-401 beginning, middle and end | G1-402 sequencing sentences | G2-378 retell / write the story |
| healthy-habits | healthy habits and hygiene (habit ↔ what we need) | K-382 hand washing steps | G1-403 brushing teeth (before / during / after) | G1-404 stop the germs | G2-379 why we do healthy habits | G1-405 healthy habits chart for the week |
| habitats | animal habitats (match the animal) | K-383 animal homes | G1-406 who does not live here | G2-380 how animals adapt | G1-407 what animals need | G2-381 my habitat report |
| sink-or-float | sink or float experiment (predict and test) | G1-408 heavy or light (a balance scale) | G2-382 change the shape (clay boat) | G2-383 true or false: why things float | K-384 draw what floats and sinks | G3-400 my investigation / lab report |
| cursive-writing | cursive lowercase letters | G2-384 cursive capitals | G2-385 letter connections | G2-386 cursive words with pictures | G2-387 reading cursive | G3-401 copy a sentence in cursive |

## ⚠ THE REFUSALS — a refused id carries NO landing

Your face table marks them; the face table wins over this list.
- **`cursive-writing` (G2-377 + G2-384 · G2-385 · G2-386 · G2-387 · G3-401)** — the WHOLE family is
  REFUSED in **sv · fi** (no joined school script in Lgr22 / OPS 2014; no matching school font).
  Those two locales write no cursive landing, and their hub rail must show nothing for the key.
- Any further face your locale's content panel refused (e.g. cursive capitals in it / es) is
  marked `shipped: false` — write nothing for it.

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

**Open the face's row in `scripts/worksheet-gen/tools/b6var-rows/<key>.js`** (`ROWS` =
`[dir, id, fileSlug, baseFile, srcLevel, overrides, enTitle, enInstruction]`), apply the overrides
to the base's `difficulty[srcLevel]` in `types/<band>/<baseFile>`, and resolve at the level the
wave ships (`difficulties: [2]`). If you quote a number — cards, rows, signs, moons, planets,
continents, oceans, family members, word counts — it must come from the render or from that
resolved config, never from the family's base table. **A landing describing a sibling resolves
THAT sibling's own config.**

⚠ **The render is ONE draw from a pool, and YOUR locale's draw.** A range-shaped claim ("up to
six pictures", "signs from three kinds") is checked against the pool that generates it, not the
instance in the picture. Read the generator and the bank (`scripts/worksheet-gen/data/b6/…`) for
your locale. Locale data is not uniform: the habitat SET in `habitats` is per-locale data (de Wald/Wiese/Teich/Meer, Nordic forest/meadow/lake/sea, pt biomes, es-MX selva/bosque/mar/lago); the cursive SCRIPT and ruling are per-locale; the week start on the habits chart is your calendar convention.

## The strand field

The `strand` chip carries your locale's national strand literal (framework NAME only; never a
verbatim curriculum quotation):
- **`healthy-habits`, `habitats`, `sink-or-float`:** the existing `Science` row (Science ·
  Sachunterricht · Conocimiento del Medio · Ciências · Questionner le monde · Scienze · Oriëntatie
  op jezelf en de wereld · Naturorienterande ämnen · Natur/teknologi · Naturfag · Ympäristöoppi),
  or the health literal your content panel authored in `strandNames` for healthy-habits (a
  health home is honest where the country teaches hygiene outside science). **No CCSS code**; NHES /
  NGSS appear in the English prose only.
- **`story-sequencing`:** your locale's reading / oral-language literal (Reading: Literature ·
  Lesen / Sprechen und Zuhören · Lenguajes · Leitura/Oralidade · Langage oral · Ascolto e parlato ·
  Mondelinge taalvaardigheid · Tala och lyssna / Berätta · Mundtlig dansk · Muntlig kommunikasjon ·
  Vuorovaikutustilanteissa toimiminen) — the content panel's `strandNames` wins.
- **`cursive-writing`:** your locale's handwriting / writing literal (Handwriting · Schreiben ·
  Escritura · Escrita · Écriture · Scrittura · Schrijven · Skriva · Skriftlig dansk · Skriving).

Band honesty: where your country teaches a topic a year later or earlier than the page's band, the
landing says so in its own words.

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
  base. The gate FAILS a pair at ≥ 0.80 and WARNS from 0.65. Watch the fences against EXISTING pages too: G1-204 sink/float sort, G1-202 where-animals-live, K-203 healthy food, G1-207 food groups, science-sequence life cycles, K-374 crossing steps, the tracing families, animal-fact-file G2-318.
- Write for the **teacher deciding whether to print it**: what is on the page, what the child
  does, what it teaches, when you would use it. p3 is the place for the practical note — how it
  prints, how it differs from its siblings, what to do next.
- Use your country's curriculum framework by NAME where it is natural (Lehrplan, BNCC, Lgr22,
  SLO-kerndoelen, OPS 2014, programmes officiels, Indicazioni nazionali, Fælles Mål, LK20). Never
  write "Common Core" in a non-English page. The CCSS code (only the story-sequencing faces carry one) lives in the JSON-LD only — the composer adds it; you never
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
node scripts/seo-landing/gen-b6-landings.js <locale> scripts/worksheet-gen/i18n/.landing-b6-<locale>.json --dry-run
```

It names every field that is short, long, duplicated, missing or carrying a free-claim or an
answer-key claim, and lists the shipped ids your file does not cover yet. Fix and re-run. Do not
stop before it prints `dry-run ok` for the ids you were assigned.

**Then hand back:** the `dry-run ok` line, your `findings` list in full (this is the part a
reviewer reads first), and any id you could not write and why.
