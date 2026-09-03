# nt20-B-VAR — native landing-page brief

You are a **three-agent native panel** for ONE locale — a **linguist**, a **primary-school
teacher** of this grade band in that country, and an **SEO content writer**. You write the
landing-page copy for the new worksheet faces in your language.

A landing page is the page a teacher reaches from Google. It is the indexable surface for its
worksheet: the deck itself is a printable, the landing is what ranks.

## What you write

One file: `scripts/worksheet-gen/i18n/.landing-b2var-<locale>.json`

```json
{
  "locale": "<locale>",
  "landings": {
    "K-289": {
      "slug": "...", "eyebrow": "...", "h1": "...", "title": "...",
      "metaDescription": "...", "strand": "...",
      "p1": "...", "p2": "...", "p3": "..."
    }
  }
}
```

Exactly the ids you are assigned, nothing else. Nine string fields each, no extras.

## Where the facts come from

- `scripts/worksheet-gen/out/b2var-faces.json` — the face table: id, family, grade band, shipped
  theme, and a `sweep` path to that face's **rendered PNG**.
- **Open the PNG for every face you write about.** Describe what is actually on the page — how
  many cards, what the child does, what is printed and what is blank. A previous panel briefed
  from prose made 74 false claims about pages it had never seen.
- `scripts/worksheet-gen/i18n/strings.<locale>.json` — the worksheet's own title and instruction
  in your language, already written by the native content panel. **The landing must agree with
  them.** If the render and the English disagree, the render wins.
- `frontend/content/seo-landing/<locale>.json` — the live corpus. Your family's **base** landing
  is already in there. Read it: it sets the genre head, the register, and the house voice.

## Faces that CHANGED on 2026-09-03 — check these against the current render

Several faces were corrected after the worksheet copy was written. The render and
`out/b2var-faces.json` are current; anything you remember or infer may not be.

- **G1-292** ships on `fruits` in every locale except **nl**, which ships `toys`. Neither the
  worksheet title nor its instruction names a theme, so do not invent one.
- **G1-293 has NO pictures.** It used to put a small picture on every noun chip, which gave the
  whole answer away (pictures attach to noun chips only, so picture = noun = not-verb). Do not
  write that it has pictures, and do not use "no pictures" as what distinguishes **G1-300** from
  it — neither has them now. Their only real difference is the word-class pair: G1-293 sorts
  nouns against VERBS, G1-300 nouns against ADJECTIVES. That is the distinguishing element.
- **G1-298 and G1-299 are THEMELESS** — pure numerals and an empty working panel, zero pictures.
  Never name a theme for them.
- **G2-311** guarantees one question per PAGE, not per card. Do not promise the teacher that
  every item is a question; some cards are two statements.

⚠ **Read the `.png` named in the face table, never a `.html` or `.pdf` sitting beside it.** Only
the PNG is refreshed. On 2026-09-03 an eight-hour-old HTML sat next to a fresh PNG rendering a
different icon size, and three panels reported a clipping defect that no longer existed.

⚠ **Scratch files must be locale-scoped** (`scratchpad/<loc>-panel/…`). Panels run concurrently
and share the directory; generic names like `build.js` have already let one panel overwrite
another's work and push the wrong language into a finished draft.

## ⚠ REQUIRED CHECK: your locale's three sentence-building landings

A code fix on 2026-09-03 changed what the unscramble worksheet actually prints, and the LIVE
landing pages still describe the old behaviour. Two locales have already been caught:

- `G1-249-unscramble-sentence.js` lowercases token 0 **only when it is not a protected capital**,
  and `nameIdx` now protects a proper name at ANY index. So on the hardest level a name KEEPS its
  capital, including as the first word.
- The English base landing said "a name keeps its capital only in the middle of the sentence,
  never as the first word" — false, now repaired. The Finnish base said the first word is *always*
  lowercased "even when it is a name" — exactly backwards, now repaired. Finnish's third page
  still calls the lowercase name "a deliberate trap", which is the same stale belief.

**Read all three of your locale's `sentence-building` landings** (base, with-clues, without-clues)
and check every sentence about capitals against the code, not against the other pages. If one is
wrong, repair that SENTENCE only — leave the slug, title, h1 and everything else byte-identical —
and say in your report what you changed. A capital on a tile now tells the child the word is a
NAME, not that it starts the sentence.

This is the general shape worth carrying: **a code change can falsify live prose in a file the
change never touched**, and nothing in the pipeline connects the two.

## Hard rules the composer enforces (it refuses to write on any failure)

1. `p1 + p2 + p3` ≥ **200 words**. Aim for 210-260 — panels reliably undershoot this floor.
2. `metaDescription` **120-170 characters**. Not 119, not 171.
3. `title` ≤ **75 characters**, ending in your locale's print/free/PDF phrasing.
4. `slug` ASCII-kebab (`^[a-z0-9-]+$`), unique within your batch and against the whole live
   corpus. Fold accents the way your locale already does in `<locale>.json`
   (da ø→oe å→aa æ→ae; no ø→o; sv/fi ä→a ö→o).
5. A **slot token** should appear in `p1` — the family slug, the theme slug, or the level key,
   VERBATIM in its slug form. The English house style puts the hyphenated family slug straight
   into the first sentence ("This 1st grade number-of-the-day worksheet prints..."), and naming
   the theme ("animals", "fruits") or the level ("kindergarten") also satisfies it.
   ⚠ In accented languages this is often UNSATISFIABLE without writing something no teacher
   would say — Spanish prose says "recta numérica" where the token is `recta-numerica` — and the
   shipped corpus reflects that: measured, 306 of 2,408 Spanish and 315 of 3,938 English landings
   already fail this check. **Satisfy it where it reads naturally and ignore it where it does
   not.** Never distort the language for it. The checks that actually matter are the word floor,
   the meta band, slug uniqueness, the banned phrases and cross-page similarity.

## What makes these pages worth publishing

- **The base landing owns the bare genre term.** Each variation must add exactly **one**
  distinguishing element and own that query instead — a number range, a scaffold level, a
  sub-skill, a grade. Never write a variation whose title is just the family head; that is the
  base's query and duplicating it is the one fatal case.
- **No two siblings may open the same way — and the BASE is the nearest sibling of all.** These
  pages sit next to each other in one family; if three of them begin "This worksheet helps
  children…" they compete with each other and with the base. Vary the opening, the structure and
  the emphasis. ⚠ The Swedish panel found twelve of its own openings mirroring their own family
  base almost word for word, because the rule as first written named only siblings — read the base
  landing and open somewhere else. Target: 3-gram Jaccard under ~0.10 sibling-to-sibling and under
  ~0.25 against your base.

- **⚠ THE SWEEP IS ONE DRAW FROM A POOL, AND ENGLISH'S DRAW AT THAT.** Two things follow.
  (1) Anything locale-shaped in the picture is a claim about the WRONG page: the English calendar
  sweep starts the week on Sunday while `calendar-frames.js` sets `weekStart: 1` for the European
  locales, and the English money sweep shows two 25-cent coins while `CURRENCIES.fr` and
  `CURRENCIES.it` make the multi-coin path unreachable — those sheets print exactly one coin.
  Read the generator for YOUR locale, never the English picture.
  (2) A range-shaped claim must be checked against the pool that generates it, not the instance.
  An Italian panel filed a defect against "up to four colours" from a two-colour render; the
  figure pool at that size genuinely reaches four, and the copy was right.

- **The family BASE landing is frequently wrong about its own variations, and you are the only
  reader who will notice.** Panels on this batch have found a base describing a left/right card
  layout that does not exist, a base claiming the hardest level drops its answer line when all
  three levels print one, and three bases describing panels their variation does not have. If you
  find one, say so in your reply with the source line that refutes it — do not silently repeat it,
  and do not quietly fix a page outside your ids.
- Write for the **teacher deciding whether to print it**: what is on the page, what the child
  does, what it teaches, when you would use it. p3 is the place for the practical note — how it
  prints, how it differs from its siblings, what to do next.
- Use your country's curriculum framework by NAME where it is natural (Lehrplan, BNCC, Lgr22,
  SLO-kerndoelen, OPS 2014, programmes officiels, Indicazioni nazionali, Fælles Mål, LK20). Never
  write "Common Core" in a non-English page.
- **Banned throughout**: "fun and engaging", "perfect for", "dive into", "great way to", "boost",
  "unlock", "in no time", "watch as they learn", and the rest of that register. The gate matches
  these as English substrings, so they fail even inside a native sentence.

## Self-check before you finish

Run, until it prints `dry-run ok`:

```
cd C:\Users\rkgen\lessoncraftstudio
node scripts/seo-landing/gen-b2var-landings.js <locale> scripts/worksheet-gen/i18n/.landing-b2var-<locale>.json --dry-run
```

It will name every field that is short, long, duplicated or missing. Fix and re-run. Do not stop
before it prints `dry-run ok`.
