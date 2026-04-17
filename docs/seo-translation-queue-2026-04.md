# SEO Translation Queue — April 2026

Captures every EN string changed during the 2026-04 SEO refresh so the same
changes can be propagated to the 10 remaining locales (de, fr, es, pt, it,
nl, sv, da, no, fi). Each entry cites the content file, the field, the
before, and the after. Apply equivalent changes in `frontend/config/app-content/<locale>/<file>.ts`
(for apps) and `frontend/config/tool-content/<locale>/<file>.ts` (for tools).

**Do not commit translations into `frontend/config/app-content/en/`** — EN is
the source of truth and has already been updated.

**File encoding rules** (per `CLAUDE.md`): use real characters, never `\uXXXX`
escape sequences; never use curly/smart quotes in .ts files; escape apostrophes
inside single-quoted strings. Run `node scripts/find-broken-quotes.js` after
editing.

---

## Commit A — `ctaHeading` field added to all 33 EN apps

The template now renders `content.ctaHeading || ui.startCreating || 'Start creating now'`. Non-EN
locales already have translated `ui.startCreating` values, so a short generic
fallback is already live in every locale. Adding locale-specific `ctaHeading`
per generator is **optional polish**; it is only needed if a more specific
verb phrase is desired per generator. If you do translate, follow the same
action-phrase pattern: "Start creating [generator output]".

EN values (for reference):

- `addition.ts` → "Start creating addition worksheets"
- `alphabet-train.ts` → "Start creating alphabet train worksheets"
- `big-small.ts` → "Start creating big-vs-small worksheets"
- `bingo.ts` → "Start creating bingo cards"
- `chart-count.ts` → "Start creating counting chart worksheets"
- `code-addition.ts` → "Start creating code-breaking addition puzzles"
- `coloring.ts` → "Start creating coloring pages"
- `crossword.ts` → "Start creating picture crosswords"
- `cryptogram.ts` → "Start creating cryptogram puzzles"
- `draw-and-color.ts` → "Start creating draw-and-color worksheets"
- `drawing-lines.ts` → "Start creating line tracing worksheets"
- `find-and-count.ts` → "Start creating find-and-count pages"
- `find-objects.ts` → "Start creating hidden object puzzles"
- `grid-match.ts` → "Start creating grid match worksheets"
- `matching.ts` → "Start creating matching worksheets"
- `math-puzzle.ts` → "Start creating math logic puzzles"
- `math-worksheet.ts` → "Start creating mixed math worksheets"
- `missing-pieces.ts` → "Start creating missing pieces puzzles"
- `more-less.ts` → "Start creating more-or-less worksheets"
- `odd-one-out.ts` → "Start creating odd-one-out worksheets"
- `pattern-train.ts` → "Start creating pattern train worksheets"
- `pattern-worksheet.ts` → "Start creating pattern worksheets"
- `picture-path.ts` → "Start creating maze path puzzles"
- `picture-sort.ts` → "Start creating picture sort worksheets"
- `prepositions.ts` → "Start creating prepositions worksheets"
- `shadow-match.ts` → "Start creating shadow match worksheets"
- `subtraction.ts` → "Start creating subtraction worksheets"
- `sudoku.ts` → "Start creating sudoku puzzles"
- `treasure-hunt.ts` → "Start creating treasure hunt worksheets"
- `word-guess.ts` → "Start creating word guess worksheets"
- `word-scramble.ts` → "Start creating word scramble worksheets"
- `wordsearch.ts` → "Start creating word search puzzles"
- `writing.ts` → "Start creating handwriting practice sheets"

---

## Commit B — H1 rewrite (apps pages)

Every EN `hero.title` was normalized to the pattern
`[Generator Name] Generator — Create Printables to Sell on Etsy & KDP`
(or "Maker" where it reads naturally). Translators should produce an
equivalent phrase in each target locale. The important invariants:

- **The generator keyword leads the H1** (before the em-dash), not the
  commercial angle.
- **Use "Generator" or "Maker"** according to what reads naturally in the
  target language. If "Generator" is a direct cognate, prefer it;
  otherwise, use the closest idiomatic equivalent ("Arbeitsblatt-Generator",
  "Générateur de fiches", "Generatore di schede", etc.).
- **Use a real em-dash (`—`)**, never `\u2014`.

Per-file mapping:

| File | New EN H1 |
|------|-----------|
| `addition.ts` | Addition Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `alphabet-train.ts` | Alphabet Train Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `big-small.ts` | Big & Small Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `bingo.ts` | Bingo Card Maker — Create Printables to Sell on Etsy & KDP |
| `chart-count.ts` | Chart Count Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `code-addition.ts` | Code Addition Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `coloring.ts` | Coloring Page Generator — Create Printables to Sell on Etsy & KDP |
| `crossword.ts` | Picture Crossword Generator — Create Printables to Sell on Etsy & KDP |
| `cryptogram.ts` | Cryptogram Puzzle Generator — Create Printables to Sell on Etsy & KDP |
| `draw-and-color.ts` | Draw & Color Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `drawing-lines.ts` | Tracing Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `find-and-count.ts` | Find & Count Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `find-objects.ts` | Hidden Object Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `grid-match.ts` | Grid Match Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `matching.ts` | Matching Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `math-puzzle.ts` | Math Puzzle Generator — Create Printables to Sell on Etsy & KDP |
| `math-worksheet.ts` | Math Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `missing-pieces.ts` | Missing Pieces Puzzle Generator — Create Printables to Sell on Etsy & KDP |
| `more-less.ts` | More or Less Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `odd-one-out.ts` | Odd One Out Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `pattern-train.ts` | Pattern Train Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `pattern-worksheet.ts` | Pattern Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `picture-path.ts` | Picture Path Maze Generator — Create Printables to Sell on Etsy & KDP |
| `picture-sort.ts` | Picture Sort Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `prepositions.ts` | Prepositions Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `shadow-match.ts` | Shadow Match Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `subtraction.ts` | Subtraction Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `sudoku.ts` | Picture Sudoku Generator — Create Printables to Sell on Etsy & KDP |
| `treasure-hunt.ts` | Treasure Hunt Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `word-guess.ts` | Word Guess Worksheet Generator — Create Printables to Sell on Etsy & KDP |
| `word-scramble.ts` | Word Scramble Generator — Create Printables to Sell on Etsy & KDP |
| `wordsearch.ts` | Word Search Generator — Create Printables to Sell on Etsy & KDP |
| `writing.ts` | Handwriting Worksheet Generator — Create Printables to Sell on Etsy & KDP |

---

## Commit B — Meta description trim (9 apps files)

Nine EN `seo.metaDescription` values were trimmed from 166–171 chars down
to 136–152 chars to stay comfortably within Google's display threshold
(~160 chars). Keep the target under 160 chars in each locale.

Updated EN texts:

- `addition.ts`: "Addition worksheet generator for Etsy and KDP sellers. 4 math modes, 104 image themes, auto answer keys, 11 languages. Try free with watermark."
- `chart-count.ts`: "Chart count worksheet generator for Etsy and KDP sellers. Themed images, multiple layouts, auto answer keys, 11 languages. Commercial license. Try free."
- `code-addition.ts`: "Code addition puzzle generator for Etsy and KDP sellers. Crack-the-code math competitors don't offer. 104 themes, answer keys. Try free."
- `math-worksheet.ts`: "Math worksheet generator for Etsy and KDP sellers. Addition, subtraction, multiplication, division with custom ranges. 300 DPI PDFs. Try free."
- `pattern-train.ts`: "Pattern train worksheet generator for Etsy and KDP sellers. AB/AAB/ABB/ABC/AABB patterns, themed images, 11 languages. Commercial license. Try free."
- `pattern-worksheet.ts`: "Pattern worksheet generator for Etsy and KDP sellers. Multiple pattern types, 104 themes, auto answer keys, 11 languages. Commercial license. Try free."
- `picture-path.ts`: "Picture path maze generator for Etsy and KDP sellers. Themed visual paths, multiple layouts, auto answer keys. Commercial license. Try free."
- `shadow-match.ts`: "Shadow match worksheet generator for Etsy and KDP sellers. 104 themed sets, answer keys, best-selling preschool format. Commercial license. Try free."
- `subtraction.ts`: "Subtraction worksheet generator for Etsy and KDP sellers. Visual counting, themed images, auto answer keys, 11 languages. Commercial license. Try free."

---

---

## Commit C — Intent-separated FAQ prepends + commercial-content collapse

### New shared FAQ pools (EN populated, other locales fall back to EN)

Both apps and tools page templates now merge a shared, intent-specific FAQ
pool with each generator's existing `content.faq`. Translators should
populate the 10 remaining locales with equivalent questions/answers.

**Source files:**
- `frontend/config/app-content/shared-commercial-faqs.ts` — 5 commercial
  questions prepended to every `/[locale]/apps/[slug]` FAQ.
- `frontend/config/tool-content/shared-usage-faqs.ts` — 5 usage questions
  prepended to every `/[locale]/tools/[slug]` FAQ.

**EN source questions (apps / commercial):**

1. "What does the commercial license include?"
2. "Can I sell worksheets on Etsy, Amazon KDP, Teachers Pay Teachers, and Gumroad?"
3. "What is your refund policy?"
4. "Can I share the license with team members or employees?"
5. "Can I sell the same worksheet in 11 languages as separate products?"

**EN source questions (tools / usage):**

1. "Is there really no signup required?"
2. "What file formats can I download?"
3. "Will it work on a tablet, Chromebook, or older browser?"
4. "What page sizes are supported? How do I print on A4 vs Letter?"
5. "Do my worksheets save if I close the tab?"

### New section label

A new `sellWithThisTool` section label was added in
`frontend/config/section-labels.ts` with translations for all 11 locales
(see file for EN–FI values). This label powers the `<summary>` text on
the collapsed commercial block on every tools page.

### Pro Tips split (follow-up)

The brief also asked for the `content.proTips` section to be split into
usage tips (visible) and selling tips (collapsed). That requires a per-tip
`intent: 'usage' | 'commercial'` tag on 33 × 11 tool content files. It was
NOT done in this round. Follow-up work: add an optional `intent` field to
each Pro Tip and update the tools template to render the selling ones
inside the same `<details>` as whatYouCanCreate/businessIdeas.

---

## Commit D — Internal linking additions

### New UI strings on `/[locale]/apps/[slug]` template

Two new optional fields added to the apps-page `uiStrings` dict in
`frontend/app/[locale]/apps/[slug]/page.tsx`. Only EN is populated;
non-EN locales currently render the EN fallback literal from the JSX.

- `pairedToolPrompt` (EN): "Looking for the free browser version?"
- `pairedToolAnchor` (EN): "Try the free Maker tool — no signup required."

Translators should add equivalents to each of the 10 other locale blocks
(de, fr, es, pt, it, nl, sv, da, no, fi).

### Tools index intro copy (EN, ~325 words)

A new prose block was added inside the EN branch of
`frontend/app/[locale]/tools/page.tsx` between the "33 Free Worksheet
Generators" heading and the category grid, targeting "free worksheet
makers" / "free printable generators online" queries. The copy is
EN-only this round — when translated, equivalent locale-specific prose
should be added inside the non-EN branch in the same position.

### KDP calculator cross-link block (EN-only by design)

A new section renders on every `/en/apps/[slug]` page linking to the KDP
Royalty Calculator and KDP Cover Size Calculator. Gated behind `locale
=== 'en'` because the calculators are currently English-only (no locale
variants in sitemap/page tree). Once localized calculators exist, remove
the gate.

---

## Commit H — Technical SEO audit findings

### Hreflang (passes)
Ran `node scripts/validate-hreflang-symmetry.js --sitemap-only` — all 3,592 URLs
pass SYMMETRY, SELF_REFERENCE, and X_DEFAULT checks against the live sitemap.
35,490 symmetry pairs verified. No action needed for this commit.
Full HTML parity run (removes `--sitemap-only`) should be done after deploy.

### Canonicals (passes)
Every apps, tools, and index page template emits self-referential
`alternates.canonical` via Next.js `generateMetadata`. No page was found
canonicalizing to a different URL. No action needed.

### Robots.txt (passes)
- `Allow: /` at root covers `/apps/*` and `/tools/*`.
- Sitemap, image-sitemap-index, and video-sitemap-index are all listed via
  `Sitemap:` directives.
- Private areas blocked: /admin, /dashboard, /auth, /member, /_next,
  /testing, /uploads (plus locale-prefixed variants).
- `/samples/` explicitly allowed for image crawlers.
- No action needed.

### Sitemap FI apps/tools coverage (gap — blocked on content translation)
Finnish (`fi`) has zero slug entries in `frontend/config/product-page-slugs.ts`
(0/33 products) and `frontend/config/tool-page-slugs.ts` (0/33 tools). As a
result, `/fi/apps/*` and `/fi/tools/*` are not in the sitemap, not indexable,
and users arriving from a Finnish locale get the EN fallback.

This is a content-translation gap, not a code bug — every other locale
(de/fr/es/pt/it/nl/sv/da/no) has complete slug coverage. Fixing requires
translating each of the 33 apps and 33 tools slugs into Finnish.

**Action for the translation sprint:** add FI slugs to both
`product-page-slugs.ts` and `tool-page-slugs.ts`, then confirm the sitemap
picks them up on the next build.

## Commits I–J

Further translation-queue entries will be appended by subsequent commits
(schema, redirects, UTM, perf). Re-run `git log -p
frontend/config/app-content/en/` and `git log -p
frontend/config/tool-content/en/` to see the diff for each string that
needs propagation.

---

# German (DE) — landed 2026-04-17

DE round propagates the same SEO patterns to `frontend/config/app-content/de/`
plus the shared-FAQ pools. Four atomic commits. The remaining 9 locales
(fr, es, pt, it, nl, sv, da, no, fi) follow in their own rounds.

## DE-A — `ctaHeading` on all 33 DE apps

Populates German action-phrase `ctaHeading` values in every
`frontend/config/app-content/de/*.ts`. Mapping:

- `addition.ts` → "Additions-Arbeitsblätter erstellen"
- `alphabet-train.ts` → "Alphabet-Arbeitsblätter erstellen"
- `big-small.ts` → "Groß-und-Klein-Arbeitsblätter erstellen"
- `bingo.ts` → "Bingo-Karten erstellen"
- `chart-count.ts` → "Zähl-Arbeitsblätter erstellen"
- `code-addition.ts` → "Zahlencode-Mathe-Rätsel erstellen"
- `coloring.ts` → "Malvorlagen erstellen"
- `crossword.ts` → "Kreuzworträtsel erstellen"
- `cryptogram.ts` → "Kryptogramme erstellen"
- `draw-and-color.ts` → "Zeichnen-und-Malen-Arbeitsblätter erstellen"
- `drawing-lines.ts` → "Schwungübungen erstellen"
- `find-and-count.ts` → "Suchen-und-Zählen-Arbeitsblätter erstellen"
- `find-objects.ts` → "Wimmelbilder erstellen"
- `grid-match.ts` → "Gitter-Arbeitsblätter erstellen"
- `matching.ts` → "Zuordnungs-Arbeitsblätter erstellen"
- `math-puzzle.ts` → "Mathe-Rätsel erstellen"
- `math-worksheet.ts` → "Mathe-Arbeitsblätter erstellen"
- `missing-pieces.ts` → "Fehlende-Teile-Rätsel erstellen"
- `more-less.ts` → "Mehr-oder-Weniger-Arbeitsblätter erstellen"
- `odd-one-out.ts` → "Was-passt-nicht-Arbeitsblätter erstellen"
- `pattern-train.ts` → "Musterreihen-Arbeitsblätter erstellen"
- `pattern-worksheet.ts` → "Muster-Arbeitsblätter erstellen"
- `picture-path.ts` → "Labyrinthe erstellen"
- `picture-sort.ts` → "Sortier-Arbeitsblätter erstellen"
- `prepositions.ts` → "Präpositionen-Arbeitsblätter erstellen"
- `shadow-match.ts` → "Schattenbilder-Arbeitsblätter erstellen"
- `subtraction.ts` → "Subtraktions-Arbeitsblätter erstellen"
- `sudoku.ts` → "Sudoku-Rätsel erstellen"
- `treasure-hunt.ts` → "Schatzsuche-Arbeitsblätter erstellen"
- `word-guess.ts` → "Wörter-Raten-Arbeitsblätter erstellen"
- `word-scramble.ts` → "Buchstabensalat erstellen"
- `wordsearch.ts` → "Suchsel erstellen"
- `writing.ts` → "Schreibübungen erstellen"

## DE-B — H1 + titleTag + meta trim

### H1 (`hero.title`) pattern

`[DE Generator Name] — Druckvorlagen für Etsy & KDP erstellen`

Full mapping:

| File | New DE H1 |
|------|-----------|
| `addition.ts` | Additions-Arbeitsblatt-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `alphabet-train.ts` | Alphabet-Zug-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `big-small.ts` | Groß-und-Klein-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `bingo.ts` | Bingo-Karten-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `chart-count.ts` | Strichlisten-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `code-addition.ts` | Zahlencode-Mathe-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `coloring.ts` | Malvorlagen-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `crossword.ts` | Kreuzworträtsel-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `cryptogram.ts` | Kryptogramm-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `draw-and-color.ts` | Zeichnen-und-Ausmalen-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `drawing-lines.ts` | Nachspur-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `find-and-count.ts` | Suchen-und-Zählen-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `find-objects.ts` | Wimmelbild-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `grid-match.ts` | Gitter-Zeichnungs-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `matching.ts` | Zuordnungs-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `math-puzzle.ts` | Mathe-Rätsel-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `math-worksheet.ts` | Mathe-Arbeitsblatt-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `missing-pieces.ts` | Fehlende-Teile-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `more-less.ts` | Mehr-oder-Weniger-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `odd-one-out.ts` | Was-passt-nicht-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `pattern-train.ts` | Musterreihen-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `pattern-worksheet.ts` | Muster-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `picture-path.ts` | Labyrinth-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `picture-sort.ts` | Sortier-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `prepositions.ts` | Präpositionen-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `shadow-match.ts` | Schattenbilder-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `subtraction.ts` | Subtraktions-Arbeitsblatt-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `sudoku.ts` | Sudoku-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `treasure-hunt.ts` | Schatzsuche-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `word-guess.ts` | Wörter-Raten-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `word-scramble.ts` | Buchstabensalat-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `wordsearch.ts` | Suchsel-Generator — Druckvorlagen für Etsy & KDP erstellen |
| `writing.ts` | Schreibübungen-Generator — Druckvorlagen für Etsy & KDP erstellen |

### titleTag pattern

`[DE Generator Name] | LessonCraftStudio` — brand-suffix replaces the
previous descriptor-suffix ("| Mathe Generator" etc). All 33 new DE
titles verified between 36 and 55 characters — well under the 60-char
display threshold.

### Meta trim

Only `addition.ts` (previously 173 chars) was rewritten to 150 chars.
New text: "Additions-Generator für Etsy- und KDP-Verkäufer. 4 Mathe-Modi,
104 Bildthemen, automatische Lösungen, 11 Sprachen. Kostenlos testen mit
Wasserzeichen." Other 32 DE metas kept as-is.

## DE-C — DE translations of shared commercial + usage FAQs

5 DE commercial FAQs added to `frontend/config/app-content/shared-commercial-faqs.ts`
and 5 DE usage FAQs added to `frontend/config/tool-content/shared-usage-faqs.ts`.
Price stated as `49 $` (matches the USD Lemon Squeezy checkout).

Template logic (`getSharedCommercialFAQs(locale)` /
`getSharedUsageFAQs(locale)`) was already locale-aware with EN fallback —
once the `de: [...]` entries exist, `/de/apps/*` and `/de/tools/*` pages
automatically prepend the DE FAQs before the generator-specific ones.

EN fallback remains active for the 9 other non-EN locales (fr, es, pt,
it, nl, sv, da, no, fi) until their respective rounds land.

## DE-D — DE uiStrings backlink + DE tools index intro

### DE uiStrings additions (apps page)

Two DE values added to the `uiStrings.de` block in
`frontend/app/[locale]/apps/[slug]/page.tsx`:

- `pairedToolPrompt: 'Suchen Sie die kostenlose Browser-Version?'`
- `pairedToolAnchor: 'Testen Sie das Maker-Tool — keine Anmeldung erforderlich.'`

These surface as the reciprocal /de/apps → /de/tools backlink section
below the FAQ. EN fallback in JSX still covers the remaining locales
until their rounds.

### DE tools index intro

A ~330-word German intro block was added to the non-EN branch of
`frontend/app/[locale]/tools/page.tsx`, gated on `locale === 'de'`.
Targets queries like "kostenlose Arbeitsblatt-Generatoren" and
"Druckvorlagen erstellen online". Rendered between the section opening
and the category grid.

### KDP calculator cross-link — NOT added on DE

Per the user-confirmed plan, the KDP Royalty Calculator / Cover Size
Calculator cross-link block remains gated behind `locale === 'en'`
because those two calculator pages are English-only. Adding a
German-label block pointing at an English page would produce mixed-
language content and a bad UX. When/if German calculator pages ship,
widen the gate to include `de` and add German label/CTA strings.

---

# French (FR) — landed 2026-04-17

FR round propagates the same SEO patterns to
`frontend/config/app-content/fr/` plus the shared-FAQ pools. Four
atomic commits mirror the EN/DE shape.

## FR-A — `ctaHeading` on all 33 FR apps

French action-phrase mappings per generator:

- `addition.ts` → "Créer des fiches d\'addition"
- `alphabet-train.ts` → "Créer des fiches alphabet"
- `big-small.ts` → "Créer des fiches grand et petit"
- `bingo.ts` → "Créer des cartes de loto"
- `chart-count.ts` → "Créer des fiches de dénombrement"
- `code-addition.ts` → "Créer des fiches de messages codés"
- `coloring.ts` → "Créer des coloriages"
- `crossword.ts` → "Créer des mots croisés"
- `cryptogram.ts` → "Créer des cryptogrammes"
- `draw-and-color.ts` → "Créer des fiches dessin et coloriage"
- `drawing-lines.ts` → "Créer des fiches de graphisme"
- `find-and-count.ts` → "Créer des fiches cherche et compte"
- `find-objects.ts` → "Créer des jeux de cherche et trouve"
- `grid-match.ts` → "Créer des fiches de dessin sur quadrillage"
- `matching.ts` → "Créer des fiches d\'association"
- `math-puzzle.ts` → "Créer des puzzles mathématiques"
- `math-worksheet.ts` → "Créer des fiches de mathématiques"
- `missing-pieces.ts` → "Créer des puzzles à pièces manquantes"
- `more-less.ts` → "Créer des fiches plus ou moins"
- `odd-one-out.ts` → "Créer des fiches de l\'intrus"
- `pattern-train.ts` → "Créer des fiches de suites logiques"
- `pattern-worksheet.ts` → "Créer des fiches de motifs"
- `picture-path.ts` → "Créer des labyrinthes"
- `picture-sort.ts` → "Créer des fiches de tri"
- `prepositions.ts` → "Créer des fiches de prépositions"
- `shadow-match.ts` → "Créer des fiches d\'ombres"
- `subtraction.ts` → "Créer des fiches de soustraction"
- `sudoku.ts` → "Créer des grilles de sudoku"
- `treasure-hunt.ts` → "Créer des chasses au trésor"
- `word-guess.ts` → "Créer des fiches de jeu du pendu"
- `word-scramble.ts` → "Créer des fiches de lettres mélangées"
- `wordsearch.ts` → "Créer des mots mêlés"
- `writing.ts` → "Créer des fiches d\'écriture"

## FR-B — H1 + titleTag + meta trim

### H1 (`hero.title`) pattern

`[FR Generator Name] — Créez des imprimables à vendre sur Etsy & KDP`

All 33 FR files rewritten. Generator names use the idiomatic French
pattern `Générateur de X` (e.g. "Générateur de mots mêlés",
"Générateur de fiches d\'addition", "Générateur de coloriages").

### titleTag pattern

`[FR Generator Name] | LessonCraftStudio` — replaces the previous
descriptor-suffix pattern. All new FR titles verified 37–55 chars,
well under Google's 60-char display threshold.

### Meta trim

Three FR metas exceeded 160 chars. Rewritten to 150–160 range:

- `wordsearch.ts` (164 → 156)
- `big-small.ts` (162 → 148)
- `find-and-count.ts` (161 → 149)

Other 30 FR metas were already within spec and left as-is. Longest FR
meta is now 160 chars (alphabet-train.ts, pattern-worksheet.ts).
