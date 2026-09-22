# nt10-D — native landing-page brief (10 base types + their variation faces)

You are a **three-agent native panel** for ONE locale — a **linguist**, a **primary-school
teacher** of this grade band in that country, and an **SEO content writer**. You write the
landing-page copy for the last batch of printable worksheet types in your language: 10 new
worksheet families, each with a BASE page and up to five VARIATION faces (≤ 60 ids; your locale
ships the ones its content panel did not refuse).

A landing page is the page a teacher reaches from Google. It is the indexable surface for its
worksheet: the deck itself is a printable, the landing is what ranks.

> ⭐ **YOUR JOB IS AN AUDIT OF THE RENDER, NOT COPYWRITING.** In the previous batch the landing
> panels — because they had to describe what is actually printed — found ~40 defects that no
> automated gate could see: a title naming a shape the page never draws, an instruction naming
> boxes that do not exist, a truth face printing one fact twice through two frames, a cloze face
> repeating an answer, a title naming a five-verb pool the page draws two of. **Report every such
> disagreement as a finding before you write about the page.** A landing panel that only writes
> prose has wasted the cheapest review these sheets ever get.

## What you write

One file: `scripts/worksheet-gen/i18n/.landing-b4-<locale>.json`

```json
{
  "locale": "<locale>",
  "landings": {
    "K-353": {
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

- `scripts/worksheet-gen/out/b4-faces.<locale>.json` — the face table: every id with its family
  key, band, `isBase`, `mode`, the SHIPPED theme (`theme`, from the wave — never invent one;
  `null` means the page is themeless), whether it is `shipped` or `refused` (write NOTHING for a
  refused id), the worksheet's own **title and instruction in your language**, and `png` — the
  path of that face's **rendered page**.
- **Open the PNG for every face you write about.** Describe what is actually on the page — how
  many cards, what the child does, what is printed and what is blank. `png: null` means the render
  is missing: report it, do not guess. The renders are under
  `scripts/worksheet-gen/out/b4-sweep/<locale>/<ID>-<theme|null>-d2-<locale>.png`.
- `scripts/worksheet-gen/i18n/strings.<locale>.json` — the worksheet's title + instruction were
  written by your locale's content panel. **The landing must agree with them.** If the render and
  the string disagree, the render wins and the disagreement is a `finding`.
- `frontend/content/seo-landing/<locale>.json` — the live corpus in your locale. Read a few of
  your locale's newest printable landings (the nt20-C families) — they set the genre head, the
  register and the house voice. **This batch has NO base landing yet — you write the base AND its
  faces**, so the base is the page that owns the bare genre term and every face must own one
  distinguishing element instead.
- The family's design file `docs/worksheet-gen/b4-designs/<ID>-<key>.md` §6 is the SEO copy
  pattern the design panel wrote. It is a design-time guide, not the truth about the page — the
  PNG is.

## The ten families and what they are

`tangram` (K-353) · `human-body` (K-354) · `five-senses` (K-355) · `weather-symbols` (K-356) ·
`recycling` (K-357) · `cloze` (G1-350) · `odd-and-even` (G1-351) · `pronouns` (G1-352) ·
`question-words` (G1-353) · `rounding` (G2-346).

⚠ **The family key is `weather-symbols`, never `weather`** — the THEME axis owns `weather`.

## ⚠ THE REFUSALS — a refused id carries NO landing

Your face table marks them, but know them going in. **652 of a possible 660 ship.**

- **`K-367` (recycling F4, colour the bins)** ships ONLY where a genuine national per-fraction
  colour convention exists — **de · es · pt · fr · it · no**. REFUSED in **en · nl · sv · da · fi**
  (no national colour for the Dutch glasbak; the honest Swedish Metallförpackningar bin holds one
  item family; Denmark standardises the PICTOGRAM not a colour; the Finnish marks differ by waste
  company).
- **`G2-349` (cloze F3, plural)** — REFUSED in **da** (the `singular-plural` family already owns
  the only honest Danish head).
- **`G2-354` (pronouns F3, possessive)** — REFUSED in **es** (`su` is owner-invariant) and **fi**
  (`hänen` is owner-invariant and the possessive suffix encodes nothing about the owner).

## ⚠ NO ANSWER KEY EXISTS — never promise one

These are printable-only decks and they ship **without an answer key**. No `title`,
`metaDescription`, `h1` or body sentence may say *with answers · mit Lösungen · con respuestas ·
com respostas · avec corrigé · con soluzioni · met antwoorden · med facit · med facitliste ·
med fasit · vastauksineen*. The composer refuses the file on a hit. "with answers" is a real
search tail for some of these heads and it is a **known loss** — take it deliberately, do not
write the claim.

## ⚠ QUOTE NUMBERS FROM THE SHIPPED CONFIG — never from the base's difficulty table

When a landing describes its siblings ("the easier version has four rows…"), it is tempting to
read the numbers off the BASE spec's `difficulty` object. That is wrong: a variation spec spreads
`{...base.difficulty[src], ...overrides}` into ALL THREE levels, so its real config is the base's
source level with the face's overrides applied — and the overrides are exactly the interesting
part.

**Open the face's row in `scripts/worksheet-gen/tools/b4var-rows/<key>.js`** (`ROWS` =
`[dir, id, fileSlug, baseFile, srcLevel, overrides, enTitle, enInstruction]`), apply the overrides
to the base's `difficulty[srcLevel]` in `types/<band>/<baseFile>`, and resolve at the level the
wave ships (`difficulties: [2]`). If you quote a number — cards, rows, lanes, word counts, ranges,
how many bins, how many markers — it must come from that resolved config or from the render, never
from the family's base table. **A landing describing a sibling resolves THAT sibling's own config.**

⚠ **The render is ONE draw from a pool, and YOUR locale's draw.** A range-shaped claim ("up to
four colours", "animals from one theme") is checked against the pool that generates it, not the
instance in the picture. Read the generator and the bank for your locale.

## The strand field

- **The four science families** — `human-body`, `five-senses`, `weather-symbols`, `recycling` —
  carry your locale's **national science strand** (Sachunterricht · Conocimiento del Medio ·
  Ciências · Questionner le monde · Scienze · Oriëntatie op jezelf en de wereld ·
  Naturorienterande ämnen · Natur/teknologi · Naturfag · Ympäristöoppi). They carry **no CCSS
  code**; NGSS appears in the English prose only, never in yours.
- **`tangram`** is spatial reasoning / geometry readiness in your framework's own words.
- **`odd-and-even` and `rounding`** carry the **per-locale maths strand literal from their design
  file's table B**, not the CCSS OA/NBT row (which misrenders in several locales). Examples the
  content panels already locked: sv `Taluppfattning och tals användning` · da
  `Tal og algebra (Fælles Mål)` · no `Tall og algebra` · fi `Luvut ja laskutoimitukset`.
- **`cloze`, `pronouns`, `question-words`** carry your locale's language strand.

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
7. A **slot token** should appear in `p1` — the family slug, the theme slug, or the level key,
   VERBATIM in its slug form. Satisfy it where it reads naturally and ignore it where it does not;
   never distort the language for it.

## What makes these pages worth publishing

- **The base landing owns the bare genre term** (Tangram, Kroppens dele, Vädersymboler,
  Kildesortering, Täydennä lauseet, Avrunding…). Each face adds exactly **one** distinguishing
  element and owns that query instead — a sub-skill, a scaffold level, a mode of working, a range.
  Never write a face whose title is just the family head; that is the base's query and duplicating
  it is the one fatal case.
- **No two siblings may open the same way — and the BASE is the nearest sibling of all.** Six
  pages sit next to each other in one family; if three of them begin "This worksheet helps
  children…" they compete with each other and with the base. Vary the opening, the structure and
  the emphasis. Target: 3-gram Jaccard under ~0.10 sibling-to-sibling and under ~0.25 against your
  base. The gate FAILS a pair at ≥ 0.80 and WARNS from 0.65.
- Write for the **teacher deciding whether to print it**: what is on the page, what the child
  does, what it teaches, when you would use it. p3 is the place for the practical note — how it
  prints, how it differs from its siblings, what to do next.
- Use your country's curriculum framework by NAME where it is natural (Lehrplan, BNCC, Lgr22,
  SLO-kerndoelen, OPS 2014, programmes officiels, Indicazioni nazionali, Fælles Mål, LK20). Never
  write "Common Core" in a non-English page. The CCSS code (when a face carries one) lives in the
  JSON-LD only — the composer adds it; you never write it.
- **Banned throughout**: "fun and engaging", "perfect for", "dive into", "great way to", "boost",
  "unlock", "in no time", "watch as they learn", and the rest of that register. The gate matches
  these as English substrings, so they fail even inside a native sentence.

⚠ **Scratch files must be locale-scoped** (`scratchpad/<loc>-landing/…`). Panels run concurrently
and share the directory.

## Self-check before you finish

Run, until it prints `dry-run ok`:

```
cd C:\Users\rkgen\lessoncraftstudio
node scripts/seo-landing/gen-b4-landings.js <locale> scripts/worksheet-gen/i18n/.landing-b4-<locale>.json --dry-run
```

It names every field that is short, long, duplicated, missing or carrying a free-claim or an
answer-key claim, and lists the shipped ids your file does not cover yet. Fix and re-run. Do not
stop before it prints `dry-run ok` for the ids you were assigned.

**Then hand back:** the `dry-run ok` line, your `findings` list in full (this is the part a
reviewer reads first), and any id you could not write and why.
