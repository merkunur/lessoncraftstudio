# nt20-C — native landing-page brief (20 base types + their variation faces)

You are a **three-agent native panel** for ONE locale — a **linguist**, a **primary-school
teacher** of this grade band in that country, and an **SEO content writer**. You write the
landing-page copy for the last batch of printable worksheet types in your language: 20 new
worksheet families, each with a BASE page and up to five VARIATION faces (≤ 120 ids; your
locale ships the ones its content panel did not refuse).

A landing page is the page a teacher reaches from Google. It is the indexable surface for its
worksheet: the deck itself is a printable, the landing is what ranks.

## What you write

One file: `scripts/worksheet-gen/i18n/.landing-b3-<locale>.json`

```json
{
  "locale": "<locale>",
  "landings": {
    "K-317": {
      "slug": "...", "eyebrow": "...", "h1": "...", "title": "...",
      "metaDescription": "...", "strand": "...",
      "p1": "...", "p2": "...", "p3": "..."
    }
  }
}
```

Exactly the ids you are assigned, nothing else. Nine string fields each, no extras. A locale is
written in halves (bases first, then faces, or by family) — the composer merges by slug and is
idempotent, so halves land in any order and a corrected half is re-applied on its own.

## Where the facts come from

- `scripts/worksheet-gen/out/b3-faces.<locale>.json` — the face table: every id with its family
  key, band, `isBase`, `mode`, the SHIPPED theme (`theme`, from the wave — never invent one;
  `null` means the page is themeless), whether it is `shipped` or `refused` (write NOTHING for a
  refused id), the worksheet's own **title and instruction in your language**, and `png` — the
  path of that face's **rendered page**.
- **Open the PNG for every face you write about.** Describe what is actually on the page — how
  many cards, what the child does, what is printed and what is blank. A previous panel briefed
  from prose made 74 false claims about pages it had never seen. `png: null` means the render is
  missing: report it, do not guess.
- `scripts/worksheet-gen/i18n/strings.<locale>.json` — the worksheet's title + instruction were
  written by your locale's content panel. **The landing must agree with them.** If the render and
  the English disagree, the render wins.
- `frontend/content/seo-landing/<locale>.json` — the live corpus (~2,000–4,000 pages in your
  locale). Read a few of your locale's newest printable landings (nt20-B families such as
  `number-of-the-day`, `singular-plural`, `calendar`): they set the genre head, the register and
  the house voice. **This batch has NO base landing yet — you write the base AND its faces**, so
  the base is the page that owns the bare genre term and every face must own one distinguishing
  element instead (a sub-skill, a scaffold, a range, a mode of working).
- The family's design file `docs/worksheet-gen/b3-designs/<ID>-<key>.md` §6 is the SEO copy
  pattern the design panel wrote (what the page teaches, which query it answers, the per-locale
  framework note). It is a design-time guide, not the truth about the page — the PNG is.

## ⚠ QUOTE NUMBERS FROM THE SHIPPED CONFIG — never from the base's difficulty table

The most productive defect class of the previous batch. When a landing describes its siblings
("the easier version has four rows…", "the hardest level goes up to seven words"), it is
tempting to read the numbers off the BASE spec's `difficulty` object. That is wrong: a variation
spec spreads `{...base.difficulty[src], ...overrides}` into ALL THREE levels, so its real config
is the base's source level with the face's overrides applied — and the overrides are exactly the
interesting part.

**So: open the face's row in `scripts/worksheet-gen/tools/b3var-rows/<key>.js`** (`ROWS` =
`[dir, id, fileSlug, baseFile, srcLevel, overrides, enTitle, enInstruction]`), apply the overrides
to the base's `difficulty[srcLevel]` in `types/<band>/<baseFile>`, and resolve at the level the
wave ships (`difficulties: [2]`). If you quote a number — cards, rows, lanes, word counts, ranges,
how many clues — it must come from that resolved config or from the render, never from the
family's base table. **A landing describing a sibling resolves THAT sibling's own config.**

⚠ **The sweep is ONE draw from a pool, and YOUR locale's draw.** A range-shaped claim ("up to
four colours", "animals from one theme") is checked against the pool that generates it, not the
instance in the picture. Read the generator for your locale.

## What the free tier rule means for YOUR words (operator ruling 2026-09-14)

"Free printable" is SEO METADATA: it may appear in `title` and `metaDescription` (and in the hub's
topicMeta) because the free tier grants three PDF downloads a month. It may NOT appear in anything
the teacher SEES on the page: **`h1`, `eyebrow`, `strand`, `p1`, `p2`, `p3` carry no free-claim** —
no *free / gratis / kostenlos / gratuit / ilmainen / gratis / kosteloos …*, and no carrier
phrase such as *frei zugänglich / vrij toegankelijk / sans frais / sin costo*. The composer refuses
the file on a hit. Bare *frei / vrij / fritt* in a pedagogical sense ("freies Erzählen") is fine.

## Hard rules the composer enforces (it refuses to write on any failure)

1. `p1 + p2 + p3` ≥ **200 words**. Aim for 210-260 — panels reliably undershoot this floor.
2. `metaDescription` **120-170 characters**. Not 119, not 171.
3. `title` ≤ **75 characters**, ending in your locale's print/PDF phrasing.
4. `slug` ASCII-kebab (`^[a-z0-9-]+$`), unique within your batch and against the whole live
   corpus. Fold accents the way your locale already does in `<locale>.json`
   (da ø→oe å→aa æ→ae; no ø→o; sv/fi ä→a ö→o; es ñ→n; de ä→ae ö→oe ü→ue ß→ss).
5. No free-claim in the six visible fields (above). No U+00AD soft hyphen anywhere.
6. A refused id (`shipped: false` in the face table) may not carry a landing.
7. A **slot token** should appear in `p1` — the family slug, the theme slug, or the level key,
   VERBATIM in its slug form. Satisfy it where it reads naturally and ignore it where it does not;
   never distort the language for it.

## What makes these pages worth publishing

- **The base landing owns the bare genre term** (Silbenbögen, tabuada, mots composés, ficha del
  animal…). Each face adds exactly **one** distinguishing element and owns that query instead — a
  sub-skill, a scaffold level, a mode of working, a range. Never write a face whose title is just
  the family head; that is the base's query and duplicating it is the one fatal case.
- **No two siblings may open the same way — and the BASE is the nearest sibling of all.** Six
  pages sit next to each other in one family; if three of them begin "This worksheet helps
  children…" they compete with each other and with the base. Vary the opening, the structure
  and the emphasis. Target: 3-gram Jaccard under ~0.10 sibling-to-sibling and under ~0.25 against
  your base. The gate FAILS a pair at ≥ 0.80 and WARNS from 0.65.
- Write for the **teacher deciding whether to print it**: what is on the page, what the child
  does, what it teaches, when you would use it. p3 is the place for the practical note — how it
  prints, how it differs from its siblings, what to do next.
- Use your country's curriculum framework by NAME where it is natural (Lehrplan, BNCC, Lgr22,
  SLO-kerndoelen, OPS 2014, programmes officiels, Indicazioni nazionali, Fælles Mål, LK20). Never
  write "Common Core" in a non-English page. The CCSS code (when a face carries one) lives in the
  JSON-LD only — the composer adds it; you never write it.
- **Readiness faces carry no standard.** The composer knows which ids are readiness (ordinal
  numbers, days and months, seasons, logic puzzles, and several single faces); write their
  `strand` as the honest skill ("Ordinal numbers (readiness)"-style, in your language), never as
  a curriculum code.
- **Banned throughout**: "fun and engaging", "perfect for", "dive into", "great way to", "boost",
  "unlock", "in no time", "watch as they learn", and the rest of that register. The gate matches
  these as English substrings, so they fail even inside a native sentence.

⚠ **Scratch files must be locale-scoped** (`scratchpad/<loc>-landing/…`). Panels run
concurrently and share the directory.

## Self-check before you finish

Run, until it prints `dry-run ok`:

```
cd C:\Users\rkgen\lessoncraftstudio
node scripts/seo-landing/gen-b3-landings.js <locale> scripts/worksheet-gen/i18n/.landing-b3-<locale>.json --dry-run
```

It names every field that is short, long, duplicated, missing or carrying a free-claim, and lists
the shipped ids your file does not cover yet. Fix and re-run. Do not stop before it prints
`dry-run ok` for the ids you were assigned.
