# nt20-B — landing-page prose brief (one native panel per locale, 20 pages)

Each of the 20 new worksheet types gets ONE landing page per locale at `/<locale>/worksheets/<slug>` — the indexable tier that sits between the hub and the printable PDF. The page renders eyebrow → H1 → strand chip → p1/p2/p3 → the deck's PDF → a carousel of sibling pages. You write the nine linguistic fields; everything mechanical is derived.

## Read before writing
1. `docs/worksheet-gen/b2-design-specs.md` — what each page IS (the child's task, the difficulty ladder).
2. The rendered page for your locale: `scripts/worksheet-gen/out/b2-sweep/<TYPE>-<theme>-d2-<loc>.png` (EN) or the locale's own renders in `scripts/worksheet-gen/out/b2-probe-<loc>/` when present. LOOK at the page before describing it — a panel that reads the spec instead of the generator produced 74 false claims last batch (picture-headed bins described as labels, a maze with two icons, "subtraction to 12" on a page that goes to 20).
3. Your locale's deck titles + instructions: `scripts/worksheet-gen/i18n/strings.<loc>.json` (ids K-284…G3-370) — the landing H1/title must carry the SAME genre keyword the deck title carries.
4. Existing landings of your locale for register + non-duplication: `frontend/content/seo-landing/<loc>.json` (the nt20 entries are the nearest siblings; yours must not paraphrase them).

## Deliverable — ONE file: `scripts/worksheet-gen/i18n/.landing-b2-<loc>.json`
```jsonc
{ "locale": "de",
  "landings": {
    "K-284": { "slug": "…", "eyebrow": "…", "h1": "…", "title": "…", "metaDescription": "…", "strand": "…", "p1": "…", "p2": "…", "p3": "…" },
    … all 20 ids …
  } }
```

## The 20 coordinates (theme + band + standard are FIXED — the composer stamps them)
| id | family key | theme | band | CCSS |
|---|---|---|---|---|
| K-284 | word-tracing | fruits | K | L.K.1.a |
| K-285 | dot-to-dot | — | K | K.CC.A.1 |
| K-286 | grid-copy | — | K | readiness |
| K-287 | singular-plural | animals | K | L.K.1.c |
| K-288 | articles | fruits | K | readiness (per-locale grammar) |
| G1-242 | read-and-color | fruits (B&W line art) | G1 | RF.1.4 |
| G1-243 | number-of-the-day | — | G1 | 1.NBT.B.2 |
| G1-244 | write-the-word | animals | G1 | L.1.2.d |
| G1-245 | alphabetical-order | fruits | G1 | readiness |
| G1-246 | number-walls | — | G1 | 1.OA.C.6 |
| G1-247 | doubles-halves | toys | G1 | 1.OA.C.6 |
| G1-248 | number-lines | — | G1 | 1.NBT.A.1 |
| G1-249 | sentence-building | fruits | G1 | L.1.1.j |
| G2-274 | capitals-punctuation | vehicles | G2 | L.1.2.b |
| G2-275 | word-classes | toys | G2 | L.2.1.e |
| G2-276 | money | animals | G2 | 2.MD.C.8 |
| G2-277 | calendar | — | G2 | readiness |
| G2-278 | picture-writing | vehicles | G2 | W.2.3 |
| G2-279 | grid-coordinates | — | G2 | readiness |
| G3-370 | word-problems | animals | G3 | 3.OA.A.3 |

Band → the level your locale's corpus uses: en kindergarten/grade-1/grade-2/grade-3 · de vorschule/1-klasse/2-klasse/3-klasse · es preescolar/primer-grado/segundo-grado/tercer-grado · fr maternelle/cp/ce1/ce2 · pt educacao-infantil/1o-ano/2o-ano/3o-ano · it infanzia/classe-prima/classe-seconda/classe-terza · nl kleuters/groep-3/groep-4/groep-5 · sv forskola/ak-1/ak-2/ak-3 · da boernehaveklasse/1-klasse/2-klasse/3-klasse · no 1-trinn/2-trinn/3-trinn/4-trinn · fi esikoulu/1-luokka/2-luokka/3-luokka. Name the school level in prose the way your country says it (Vorschule / maternelle / educação infantil …); the CCSS code is machine-only — non-EN prose names the NATIONAL framework, never "Common Core" (de Lehrplan · fr programmes officiels · es currículo · pt BNCC · it Indicazioni nazionali · nl SLO kerndoelen · sv Lgr22 · da Fælles Mål · no LK20 · fi OPS 2014) and never invents a national code.

## Field rules (the composer and `gate.js` refuse anything outside)
- **slug** ASCII-kebab, unique in the locale corpus, keyword-led (`zahlenmauern-1-klasse`, `points-a-relier-1-a-20`), never a bare reserved word (browse/all/filter/search/index).
- **eyebrow** ≤ 40 chars: the family in the locale's genre name + "worksheet" word IS allowed here (Arbeitsblatt / fiche / ficha…).
- **h1** the genre keyword first, then what makes THIS page specific (theme, range, level): "Zahlenmauern bis 20 — 1. Klasse".
- **title** ≤ 75 chars, keyword-led, ends with the locale's print/PDF/free trio in its natural order (de "… zum Ausdrucken PDF kostenlos" · es "… para imprimir PDF gratis" · fr "… à imprimer PDF gratuit" · pt "… para imprimir PDF grátis" · it "… da stampare PDF gratis" · nl "… printen PDF gratis" · sv "… skriva ut PDF gratis" · da "… til print PDF gratis" · no "… til utskrift PDF gratis" · fi "… tulostettava PDF ilmainen" · en "… Free Printable PDF"). No two of your 20 titles may be identical.
- **metaDescription** 120-170 chars (count!), one concrete sentence about the page + the level, ending with the print/free promise.
- **strand** the national-curriculum domain name for this page (de "Zahlen und Operationen" / "Sprache untersuchen" …), NOT a CCSS strand in English.
- **p1 / p2 / p3** together ≥ 205 words (the floor is 200; leave margin — Finnish/Nordic agglutination counts fewer words, add content, never pad). p1 = what the child actually does on THIS page, naming the theme word and the level word literally (the lint needs one of the page's slot tokens — the family slug, the theme slug, or the level key — to appear as an ASCII substring in p1: write "Vorschule", "fruits", "Kindergarten", "1. Klasse"… naturally). p2 = why it works (the skill, the progression, what the teacher watches for). p3 = how to use it (print, the difficulty ladder d1→d3, what comes next in the catalog).
- **Banned phrases** (the gate fails the page): "fun and engaging", "fun and interactive", "perfect for", "ideal for", "great for", "dive into", "dive in", "great way to", "wonderful way to", "excellent way to", "in today's classroom", "in the modern classroom", "sneaky", "find a way in", "something for everyone", "one of the earliest", "one of the oldest", "one of the most important forms of", "engaging" (the bare word, in any compound), "captivating", "delightful", "amazing", "watch as they learn", "before you know it", "in no time", "boost", "supercharge", "unlock", "easy and fun", "simple yet effective" — and their literal translations (the gate matches the ENGLISH strings as substrings, so a native word containing e.g. "boost"/"unlock" also fires). Write concretely; no marketing filler, no exclamation marks.
- **Non-cannibalization**: sibling pages of the same strand (word-tracing vs sight-words vs write-the-word; read-and-color vs color-by-number; number-walls vs number-bonds; sentence-building vs capitals-punctuation) must describe DIFFERENT mechanics in DIFFERENT words — mode-true pedagogy, not shared boilerplate. Each of your 20 pages must read as its own page.
- Repeat the child as "the child" / your locale's neutral term; never gendered pronouns.
- Write the JSON with the Write tool (clean accents). Then run from the repo root:
  `node scripts/seo-landing/gen-b2-landings.js <loc> scripts/worksheet-gen/i18n/.landing-b2-<loc>.json --dry-run` and fix until it prints `dry-run ok`. Do NOT run without `--dry-run` — the apply is done centrally.
