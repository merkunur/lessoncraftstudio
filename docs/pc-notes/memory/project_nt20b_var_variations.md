---
name: project-nt20b-var-variations
description: "nt20-B-VAR (2026-09-02) — pedagogically distinct variation faces for the 20 batch-2 printable types x 11 locales; the demand-weighted allocation, the description-budget WINDOW rule, and the defects the native panels found in my English source"
metadata: 
  node_type: memory
  type: project
  originSessionId: 136db0c6-37d8-42c4-9f28-66a35efd4593
  modified: 2026-09-02T18:13:04.968Z
---

# nt20-B-VAR — variations of the 20 nt20-B worksheet types (IN PROGRESS 2026-09-02)

**Goal (operator /goal):** expand each of the 20 nt20-B types with pedagogically meaningful
variations, natively rebuilt in all 11 languages, top quality, full SEO, target ≥1000 clicks/day,
and **every sheet must appear when its type is clicked in the /worksheets sidebar**.

## Operator decisions taken in planning
1. **Demand-weighted allocation, not uniform 5-per-type** — each type gets as many faces as it can
   *honestly sustain*; surplus goes to types teachers actually search for.
2. **Finnish `articles` re-targets to partitive vs nominative** (`yksi omena / kaksi omenaa`),
   fixing a LIVE collision: fi has no articles so K-288 shipped as yksikkö/monikko, which is what
   K-287 singular-plural already teaches — two live fi pages, one query.
   ### ⭐⭐ THE PARTITIVE RE-TARGET DID NOT SHIP — AND I RECORDED IT AS IF IT HAD.
   The Finnish panel refused the brief and proved it from four agreeing artefacts: `articles.js`
   is `fi: { mode:'form', chipsFor: e => [e.singular, e.plural] }` keyed on picture count; the
   `articles-overrides.js` fi note says so; `strings.fi.json` K-306/K-307 say *"Ympyröi sana,
   joka sopii kuvan määrään"*; and the rendered fi probe prints `lokki/lokit`, `susi/sudet` —
   nominative throughout, no partitive anywhere.
   **BUT THE COLLISION IT EXISTED TO FIX IS MEASURABLY GONE**, by a different and defensible
   mechanism: the two fi families now split on **recognition vs production** with distinct head
   terms — *Yksi vai monta* (count, circle the form) against *Yksikkö ja monikko* (trace, then
   write the plural). Measured across the 3+3 live fi landings: worst cross-family whole-page
   3-gram Jaccard **0.017**, worst title **0.182**. Two queries, two pages.
   **Do not retrofit the partitive.** The vocab stores singular/plural only, and the repo's one
   Finnish morphology table is `FI_GENITIVES` (1,166 entries, genitive not partitive) — so it
   needs its own table and is a NEW FAMILY, not a parameter flip. The partitive IS live in this
   batch, in `read-and-color`: the fi sentence frames take `noun:"partitive"` and the page prints
   *"Väritä 2 sitruunaa vihreäksi"*.
   ⚠ The lesson is mine, not the panel's: **a decision recorded as taken is not a decision
   implemented**, and the only reason this surfaced is that a panel read the code instead of
   believing my brief. Ten other panels were briefed off the same planning record.

## What shipped so far
**64 PARAM faces** across the 20 families (number-lines 8, money 7, word-problems 6, the rest 2-3),
`gen-b2var-specs.js` + `gen-b2var-waves.js` + `validate-b2var-draft.js` (poison-tested 13/13) +
`apply-b2var-locale.js` + `gen-b2var-landings.js`. Locale content applied: **de, es, fr, pt**
(it/nl/sv running; da/no/fi pending). 25 CODE faces are a deferred second wave.

## ⭐⭐ THE DESCRIPTION BUDGET IS A WINDOW, NOT A CEILING
`bandedDescription` (build-seo-head.js) picks the **LONGEST** middle that fits inside 120-170.
The per-face `instruction` competes with the FAMILY-level skill sentence. So an instruction fails
in BOTH directions: too long → overflows, discarded; too short → the generic sentence is longer
and wins. Either way every sibling in the family shares one description and **no gate catches it**
(deck title/description uniqueness is EXACT HASH only).
- I first told the panels "60-75 chars". **That was wrong.** The Spanish panel measured instead of
  trusting me: at 58 chars only 3 of 64 won. de and es both reached **64/64** by measuring their
  own per-locale window and **shortening titles to buy budget** (de shortened 33).
- The lead is per-locale and contains the TITLE, so a long title eats the instruction's room.
  Measured es budget ≈ `80 − titleLen` themeless, `67 − titleLen` themed.
- EN went 10/64 → 55/64 by rewriting 54 instructions as one short sentence; similarity 9 WARN → **0
  FAIL 0 WARN**, top pair 0.793 → 0.463.

## ⭐ Two gates the pipeline did not have (both now exist, both poison-tested)
- `scripts/publish-cli/scan-staged-desc-band.js` — preband SKIPS `printable_only` ZIPs (banded at
  emit time), so nothing checked the band before upload. It calls
  `seo-reconciliation.reconcileDescriptionLength` rather than reimplementing the verdict. **It paid
  for itself immediately: 4 French decks would have HALTed at publish.**
- `scripts/publish-cli/gate-deck-title-similarity.js` — word-3-gram Jaccard (imported from
  gate-teaching-similarity), FAIL ≥0.80, grouped by (family × language).

## ⭐⭐ THE PANELS CONVICT THE ENGLISH — three found the same defects independently
Every one verified on the render before fixing. **My first check of the worst one was a text regex
that found nothing, because unscramble tiles are scrambled by design and the page body is rendered
art — reading the PNG proved the panels right and my measurement wrong.**
- **G1-283 rendered "feeds | tom | skateboard | the".** The sentence bank's `{name} feeds the
  {noun}` frame (s2) has **no animacy gate**, `uses:['unscramble','fix']`. Moved to animals.
  ⚠ The gap is unfixed in all 11 banks — any future wave putting a frame-consuming type on an
  inanimate theme reproduces it.
- **G2-292** shipped `kinds:['total3','total','total3']` → card 2 held TWO items under a "Buying
  Three Things" title. **G2-295** `['diff','total','diff']` → card 2 asked for a total.
- **G2-294 said "Count the coins" — there are no coins**; a can-buy card prints money as a numeral.
- G2-282 named only the end mark (legend has Capital/Names/End mark); G1-282 said "full stop" where
  a card ends in "?"; K-289 said "lines" for one line; G2-299 never mentioned its sentence starters.
- ⭐ **`crane` is the BIRD in de (Kranich), pt (Grou), nl (Kraanvogel)** — `B2_EXCLUDE` guarded only
  es/no/da/sv/fi. Added the three. fr "grue" / it "gru" mean both, so they stay unguarded.

## Latent defects found in levels that had NEVER shipped (waves emit d2 only)
- G1-243 d3 pairs `{max:100, tick:5}` with N over 21..99 excluding multiples of 10 → **64 of 79
  possible numbers have no tick** and verify fires.
- G1-248 at 0-50 in fives leaves 5 unlabelled candidates while verify needs ≥2 pointers per line
  and no repeats.
- G3-370 d3 **overflows the page box in French** — three stories fit in English, not in a longer
  language.
- The base `dot-to-dot` d1 is headed "Dot-to-Dot 1 to 20" while carrying only dots 1-10.

## Traps re-paid this session
- ⚠ **Node's `/tmp` is `C:\tmp`, Git Bash's is under AppData** — a poison never applied and the
  scanner "passed" untouched files. A poison stopped upstream tests nothing.
- ⚠ A poison that MISSED because I typed `Woerter` for the shipped `Wörter`: **the poison was
  wrong, not the check.** Read the real value off the file.
- ⚠ `\n` written through a python heredoc became a literal newline inside a JS string literal.
- ⚠ `cd` inside a Bash call persists to the next call.
- ⚠ A poison that only changes a DEFAULT parameter value tests nothing when callers pass it
  explicitly.

## Build + publish state (2026-09-02)
**704 decks built (64 faces x 11 locales), 0 build failures.** Gates: description band 704/704
in 120-170 · similarity 0 FAIL in all 11 (3 WARN es) · duplicate questions 0 across 77
story-card pages · lint-locale exit 0 for all ten non-EN · b2-baseline 810 coordinates 0 drift.
publish-bulk dry-run: 704/704 ok, 0 collisions, 0 halts, all 11 locales.

## ⭐ More lessons bought after the first write-up
- ⭐⭐ **A GUARD KEYED ON THE DIFFICULTY INDEX IS BLIND TO THE VARIATION CONVENTION.** G2-274
  refused name-bearing frames with `difficulty === 1` because d1 is the config whose checklist
  has no Names chip. The VAR convention replicates ONE config across d1/d2/d3 and the waves ship
  d2, so a face built from the d1 config sailed past it and printed "anna has a big fox" under a
  two-chip banner. **Key a guard on the CONFIG (`d.needCaps === 0`), never on the level index.**
- ⭐⭐ **A SLUG RENAME LEAVES THE OLD SPEC FILE ON DISK.** Two modules then declare one id and
  `loadType` returns the first `readdirSync` match — right answer by directory-order luck.
  The generator now prunes stale files. Caught by two panels, by no gate.
- ⭐⭐ **A CONCEPT CAN BE UNBUILDABLE IN 11 LANGUAGES AND ONLY LOOK FINE BECAUSE OF A BUG.**
  G2-281 (capital + full stop, no names, 4 lanes) is impossible: name-free frames ending in a
  period number 5 in en, 4 de/fr, 3 es/pt, 2 it/nl/sv/da/fi and **1 in no**. It only "worked"
  while names were leaking in. Settled at 3 lanes + `ends ['.','?']` + `needQ:1`, and verify's
  hardcoded 4-lane floor relaxed to 3 (0 drift — no shipped coordinate has fewer than 4).
- ⭐ **Italian sorts with 26 letters but PRINTS 21.** `firstIndex` uses the collation alphabet,
  so "kiwi"/"jet" passed the filter and verify then failed. Filter on the PRINTED strip.
- ⭐ **`out/b2var-faces.json` went stale** and panels were briefed from it. Now generated by
  `tools/gen-b2var-faces.js`, which FAILS if any sweep render is missing. Re-run after every
  spec or wave change.
- ⭐ **Shrinking the wrong thing.** G2-297 overflowed in de/no; I cut the calendar cell height,
  but it is the question CARDS that overflow. Six questions -> five, six-week grid off.
- ⚠ Long locales expose overflow that English never shows: G3-376 (3 stories) in it/no, G2-290's
  shelf in pt (currency spelled "centavos"), G2-297 in de/no. All in levels the base waves have
  never shipped, so nothing had ever built them in a long language.
- ⚠ The engine STRIPS a trailing mark from the instruction and appends its own period, so a
  question-form instruction ships as a statement in the meta (fr panel).
- ⚠ RECORDED, NOT FIXED: `sentenceCase()` lowercases any capital after the first character of
  the title segment for the eight sentence-casing locales; touches only `<title>`; fixing it
  would rewrite titles catalogue-wide.


## 🏁 SHIPPED 2026-09-02/03 — 704 landings, 11 locales, every gate measured

**64 faces x 11 locales.** Landings 704/704 live, in the sitemap (shards 4-7), submitted to
IndexNow (8 batches, all HTTP 200). Decks repointed canonical -> landing (64 per locale, 0
missing, uniform) and noindexed by `refresh-deck-noindex-exempt` (exempt map 20,786 -> 19,634).
**Operator's OBS requirement measured, not assumed: 220 of 220 (locale x type) hub filters list
every sheet of that type — 96 rows behind every filter in every locale.**

## ⭐⭐ THE PANELS CONVICT THE SOURCE — the single highest-yield pattern in this batch
Every locale artifact below was found by a panel reading the GENERATOR after being handed an
English render, and each would have shipped a claim about a page that does not exist:
- **money**: the EN sweep shows two 25-cent coins. `payOpts = coinVals.filter(v => v > price+4)`
  is never empty for fr/it/fi (a 50c piece clears every price), so those sheets print **exactly
  one coin**; sv pays only in **ten-kronor** pieces; da/no in one or two whole-krone coins.
  Four independent panels caught this; it is a USD artifact of the sweep.
- **calendar**: the EN sweep starts the week on **Sunday**; `calendar-frames.js` sets
  `weekStart: 1` for every European locale.
- **`b2var-faces.json` asserted the EN theme for all 11** — K-306 is `fruits` in sv/da/no and
  K-307 in sv, and `deckSlugFor` derives from the WAVE, so an animals landing would have pointed
  at a slug that does not exist. Now emits `themeByLocale` + `themeDivergesIn`.
⚠ And the converse: **a sweep is ONE DRAW from a pool.** An Italian panel filed a defect against
correct copy ("up to four colours") from a two-colour render; the figure pool reaches four.
Range-shaped claims must be checked against the pool.

## ⭐⭐ FIVE LIVE BASE-LANDING CLAIMS WERE FALSE, all found by variation panels
The family BASE landing is the nearest sibling and the page nobody re-reads. Found + fixed:
sv `en-eller-ett-frukter` (a left/right card layout that does not exist — K-288 d3 is cols:2);
it + pt word-problems (claimed d3 drops the answer line; `ruling:true` on all three levels);
**7 locales' unscramble base** (claimed the hardest level lowercases all but names —
`capsIndices` skips index 0, so a SENTENCE-INITIAL name is lowercased too); fi picture-writing
(3 rows and "Minä näen"; actually `rows:4` and starters `Kuvassa on / Näen / Tässä on`); fi
word-classes (cites `ylpeä`, which is not in the fi bank).

## ⭐⭐ TWO SHIPPED-PRODUCT DEFECTS THE GATES COULD NOT SEE
- **G2-292 asked the SAME QUESTION TWICE in ALL ELEVEN locales.** `scan-duplicate-problems.js`
  keyed on `qtype|refs|answer` with `refs` in RAW DRAW ORDER, so {0,2,3} and {3,2,0} hashed
  differently. **A duplicate-detector whose key preserves an irrelevant ordering is an
  exact-string check wearing the name.** Sorting refs: 0 -> 11 -> fixed 0. `build()` now redraws
  (and THROWS if it cannot), `verify()` asserts it, b2-baseline 810 coords 0 drift.
- **G2-281's checklist glyph was keyed on `difficulty === 3`** while the face re-points the d1
  config with `ends:['.','?']` — the banner told the child to look for a period while a sentence
  needed a question mark. The SAME config-vs-index hole I had already fixed one line above.

## ⭐ THE DESCRIPTION-OWNS-ITS-INSTRUCTION GATE (new, poison-tested 3 ways)
`gate-desc-carries-instruction.js` + `measure-instruction-window.js`. 70 of 704 faces lose their
instruction to the family skill sentence. ⚠ **I wrote this up as "sibling-shared descriptions"
and the measurement refuted me: 704 decks, 704 DISTINCT descriptions, 0 FAIL, 5 WARN.** The cost
is specificity, not duplication. Not retrofitted: the instruction is also the sentence printed
for the CHILD, so shortening it to win a meta slot makes the worksheet worse — the right fix is
a separate `metaSentence` field.

## ⚠ TRAPS PAID AGAIN
- **`--help` IS NOT A FLAG.** `repoint-deck-canonical.js --help` ignored the unknown arg and ran
  the DEFAULT: all types, locale=en, no dry-run — 641 files mutated while I was reading usage.
  (Idempotent, backed up per file, and toward the documented target state, but unintended.)
  **Read a script's argv parser before invoking it to learn what it does.**
- **A VALUE CAN HAVE THREE HOMES.** fi `dayPlural` lives in `calendar.js`, `.draft-b2-fi.json`
  AND the GENERATED `calendar-frames.js`, which overrides the base at load. Patching the base
  reported success and changed nothing observable.
- **VERIFY THE MEASUREMENT BEFORE THE DEFECT — four times.** deck.html is the SEO wrapper, not
  the worksheet (the glyph lives in `out/render/`); counting `data-lcs-day` nodes gave 34 and a
  wrong row inference where `data-lcs-rows=6` was sitting right there; a two-colour render is not
  the pool's ceiling; a prefix comparison is not a comparison.
- **Committing on the FILE rather than the panel's REPORT** captured pre-correction text twice
  (sv, da). A panel's file is not final until the panel says so.


## ⭐⭐ TWELVE FALSE CLAIMS IN LIVE BASE LANDINGS — the highest-yield finding of the batch
All twelve were surfaced by panels writing a VARIATION of that family; none by a gate. Fixed:
sv articles (a left/right layout K-288 does not have) · it + pt word-problems (claimed d3 drops
the answer line; `ruling:true` on all three) · **7 locales' unscramble** (claimed the hardest
level lowercases all but names — `capsIndices` skips index 0, so a SENTENCE-INITIAL name is
lowercased; it/no/de/fr/pt/da had it right) · en/nl/sv/fi word-classes ("colours and sizes only";
tier 1 also holds hot/cold/wet/fast/happy, and in nl+sv this contradicted their own p2) ·
en/nl/fi picture-writing ("keeps the narrative starters"; `G2-278` d3 is `starters: null`, and
d1 is `rows: 4` not 3 — **it and no had it right**) · en cited `proud`, absent from the bank,
**which fi had inherited as `ylpeä`**, likewise absent.
⚠ **STRUCTURAL CAUSE:** base landings describe a d1/d2/d3 ladder while the waves publish ONLY
d2, so most of that copy describes levels no deck ever exposes — unreviewed by construction.
⚠ **AND THE INHERITANCE DIRECTION IS THE TELL:** where it/no/de/fr/pt got it right and
en/nl/sv/fi got it wrong, the wrong ones copied my English instead of reading the data.

## ⚠ A SUBAGENT'S REFUTATION CAN ITSELF BE WRONG — measure before you believe it
A panel reported that my English fix named three adjectives absent from the bank
(`curious, sleepy, gentle`) and that en has **no tier 3**. Measured: en has 28 adjectives across
THREE tiers and all three words are in tier 3. My fix stood. It had already rewritten the
Finnish on that false premise — harmless, because `G2-275 d3 tiers = [1,2,3]` so the tier-2 words
it substituted do print, but it swapped correct examples for correct examples for no reason.
**Take a panel's finding seriously and still verify it: they have been right about ~15 defects
and wrong about 2 this batch, and both wrong ones looked exactly like the right ones.**


## WAVE 2 (2026-09-03) — the approved allocation was 100 faces; wave 1 shipped 64

A pedagogy panel that read all 16 base modules' build() AND verify() designed the gap and
**REFUSED 14 of 38 slots**: an all-questions capitals page is unbuildable (pt/it have 2 question
frames, fi has 0); read-and-color has one teaching move already bracketed by its two faces; a
5-course number wall exceeds topMax 20 arithmetically; an array word-problem page already ships
as its own printable family. **Honest ceiling 93, not 100.**

### ⭐⭐ FIVE OF THE FIRST THIRTEEN WERE THE PUBLISHED BASE DECK WITH A NEW THEME
K-312/K-284, G1-284/G1-245, G1-290/G1-244, G2-309/G2-278, G3-377/G3-370 each spread
`base.difficulty[2]` with an EMPTY override — and the base wave publishes `difficulties:[2]`.
Byte-identical generator config; only theme, seed and title differed. The design panel believed
those d2 levels had never shipped: it was reasoning about the shipped VARIATIONS (which source
d1/d3) and missed that the base TYPE publishes at d2.
**No gate could see it** — specs compile, decks build, titles ARE distinct so every SEO gate
passes, and the similarity gate scores prose not configuration. **Two native panels found it
independently within an hour, while writing copy, by comparing the render to the base.**
→ NEW GATE `tools/gate-variation-distinct.js`, poison-tested, wired into `deploy.sh`. Compares
the RESOLVED config (not the override literal) at every difficulty the base wave actually
publishes, both read from the wave files. It certifies the original 64 as all-distinct.

### ⭐ A SIXTH FACE WAS UNBUILDABLE ON ITS OWN PREMISE
G2-306 promised "every sentence names somebody, so every line needs two capitals". Measured: of
`.`-ended fix frames carrying a name, those where the name is NOT the first token number **0 in
ten locales, 1 in French** — the name's capital IS the sentence-initial capital. Two-name frames
number 1-2 per locale against a 3-lane floor. 80 faces -> 74; wave 2 nets +10, not +16.

### ⭐⭐ THE CHEAPEST REAL FACE IN THE PROGRAM WAS ONE HARDCODED WORD
`K-285.build` passed `step: 1` while `dotFigure` had always ACCEPTED step, always STAMPED
`data-lcs-step`, and `verify()` had always checked labels AND strip chips against `start+i*step`.
`d.step || 1` yields four faces (count back from 10 and 20, by twos, by fives). **When a family
looks exhausted, check what its primitive and its verifier already support that its build() does
not pass through.**

### Wave-2 traps
- ⚠ **The spec emitter assumed the base lives in the same band directory.** Six faces take an id
  from the band their CONTENT belongs to (dot-to-dot is K, but by-twos-to-20 is G1), so
  `require('./K-285-...')` from `g1/` threw MODULE_NOT_FOUND.
- ⚠ **`min` on a number line needs the LABEL TEST moved too.** `tickRow` prints via
  `(v - min) / tickStep % labelEvery` while G1-248 chose candidates with absolute `v / tick`;
  they agree only when min is 0 or decade-aligned, so a naive `min` offers PRINTED labels as
  arrow targets.
- ⚠ **G1-247's card count must be EVEN** (`const half = d.cards / 2` renders a phantom card at 3).
- ⚠ **A card-height measurement cannot see a card-content overflow.** All four G1-286 cards
  reported inside the page while the last one's equation row rendered at 954 of 945 — the box
  says 184, the content measures 217. I also scoped to `document.querySelectorAll('*')` where the
  lint scopes to `.ws-page *`, and checked only the horizontal axis. **Read the gate before
  disputing the gate.**
- ⚠ 60-100 counting in FIVES has four unlabelled ticks against six pointers — unbuildable.

## 2026-09-03 — all 11 locales authored; six defect classes found by native panels

**State.** All 100 faces now exist natively in all 11 languages (478 strings per non-EN locale;
en carries its 36 new faces in the spec `i18n.en` blocks). Content panels done for
de·nl·es·fr·it·pt·sv·da·no·fi. **704 of 1,100 landings live** — the 396 for the 36 new faces
are the remaining half of the work.

**⭐⭐ THE STALE ARTEFACT BESIDE THE FRESH ONE.** `extract-b2var-sweep` writes only `.png`, so the
sweep directory held an 08:24 `.html` next to a 09:07 `.png` **rendering different icon sizes**.
Three panels were briefed from it and all reported clipping that no longer existed; I then
"measured" the same stale file and reported a defect twice. The build's own `out/render/<wave>/`
is rewritten every run and is the only trustworthy DOM. The extractor now refreshes and prunes.
**A directory whose files have different mtimes is not one artefact.**

**⭐⭐ FOUR PANELS BEAT FOUR GATES.** Every defect this round came from a native panel reading the
GENERATOR and the RENDER — none from a gate:
- `bandedDescription/assemble` stripped the terminal mark and appended `.`, shipping every
  question-final instruction punctuated as a statement. **Corpus-wide, 20 instructions, 8
  locales** — and my independent count matched the panel's exactly. The non-banded path four
  lines away already preserved it: two assembly paths, disagreeing.
- G2-311 promised "one of them is a question" per CARD when `needQ:1` guarantees one per PAGE.
- G1-293's picture WAS the answer: pictures attach to noun chips only, so with two bins
  picture ⟺ noun ⟺ not-verb and the page sorted without reading.
- G1-249 lowercased proper names — `capsIndices` INFERS a capital from the letter and is blind
  at position 0, where sentence-initial and proper-name are ambiguous.
- K-288 ruled a hardcoded 5 lines while `cards` is a knob; the de page deals **6** to one bin.
- G1-298/299 published under a fruits/animals slug while rendering **0 `<img>` tags**.

**⭐ A PIN THAT CAN BE SILENTLY SUBSTITUTED IS NOT A PIN.** `cli.js` retried alternative themes on
a render throw — right for a round-robin theme, wrong for a `themeOverrides` pin, which is the
theme the slug, title and landing were all written against. Guarded via `themePinned`; it
immediately caught G1-292 failing the gender mix on `toys` in **both en and sv**, two decks
already shipping a substituted theme. No single theme satisfies all 11 (sv accepts only fruits,
nl refuses it) → fruits ×10 + toys for nl, one honest singleton over two silent lies.

**⭐ A GENERATED FILE EATS YOUR FIX.** `data/b2/sentences.js` is regenerated wholesale from
`i18n/.draft-b2-<loc>.json`; hand-added `qUncued` flags would have been wiped by the next apply.
Fix the SOURCE the generator reads.

**⭐ `--force` cannot delete a RENAMED output.** deckId embeds the theme, so re-pinning left 104
ZIPs in a 100-instance wave — and publish-bulk reads the directory. `prune-stale-zips.js`
(refuses to run on an empty enumeration).

**⭐ Romance yes/no questions have statement word order**, so stripping the "?" leaves no cue and
the page has no solution: **all 4 pt question frames**, 1 of 4 es; it was CLEAN (all four open
"Chi") though two panels suspected it. Germanic/Nordic invert, fi has `-ko`. Frames carry
`qUncued`; native WH frames authored for pt.

**⚠ Panels share the scratchpad.** Generic helper filenames (`build.js`, `new36.json`) let one
panel's file overwrite another's mid-run and push the WRONG LANGUAGE into a draft — caught only
because a measured win-rate dropped 100→91. Locale-scope every temp path.

**⚠ Plan-vs-code drift:** the plan says fi `articles` was re-targeted to partitive vs nominative.
It was never implemented — `articles.js` gives fi `mode:'form'` with bins `yksi`/`monta`. The fi
panel wrote to the code per "the render wins", and separately notes `monta` governs the partitive
singular, so a bin headed *monta* collecting nominative plurals is not a grammatical pair
(the file's own header says `yksikkö / monikko`). **Unresolved — needs a native ruling.**

**Still open (panel-reported, not yet acted on):** `crane` renders a truck while ten locales name
the BIRD (§10.3 vocab, guarded for no/fi only) · the ungated animacy frame ("Leo feeds the
avocado", "my camel is in the box") · G1-282's capitalised clue is "I", capitalised everywhere ·
G2-292 duplicate cards · G2-285 keeps its picture scaffold while the younger G1-293 lost its own.

### Later on 2026-09-03 — the landing half opens

**⭐⭐ A CODE CHANGE CAN FALSIFY LIVE PROSE SOMEWHERE IT NEVER TOUCHED.** This morning's
name-capital fix (G1-249 protects a name at index 0) made a LIVE landing page wrong: the
unscramble base still told teachers "a name keeps its capital only in the middle of the sentence,
never as the first word." Nothing in the pipeline connects a spec edit to the landing copy that
describes it, so the class is invisible unless someone reads both — the EN landing panel found it
by reading the code, not the copy. Repaired.

**⭐⭐ THE COMPOSER COULD NOT RUN FOR ANY LOCALE.** `gen-b2var-landings.js` validates its per-face
STANDARD map against ROWS at MODULE LOAD, before reading a prose file — the map covered only the
first 64 faces, so all 11 locales aborted on `no STANDARD entry for K-308` no matter what their
panel wrote. A validation that runs before the input is read fails identically for everyone.

**⭐ A THEMED FACE MUST BE PINNED or its landing points at nothing.** `deckSlugFor` reads the theme
from `themeOverrides` ONLY, so a round-robin-themed face composes a slug with no theme segment
while the deck has one. Measured clean (0 of 36) *because* the wave pins everything — held by
convention with nothing asserting it. Now guarded, poison-tested both ways.

**⭐ es is 54/100 on the description slot, and it is PRE-EXISTING.** Proven by curl: the live
`piramides-numericas-g1266` carries the same generic family sentence my build produces. Spanish
has the longest lead of any locale (`Ficha imprimible gratis: <title> Hoja de ejercicios para
<level>.`), so 41 published es pages share family-level descriptions. An earlier es panel's
"64/64" claim was a simulation, not shipped bytes. **Measure from the ZIP.**

**Description slot, measured from shipped bytes** (not a model of the assembler):
da/no/fi 100 · de/nl/sv/fr/it 98 · pt 97 · **en 86** · **es 54**. The two universal losers are
G1-251/G1-252 (base faces, published). All ten English losers were too LONG, not too short — the
ceiling, not the floor, which is the opposite of what the brief warned panels about.

**⚠ A dry-run that prints ONE sample entry is not a listing.** Two greps over it returned nothing
and I nearly took that as evidence of correctness. Third instance of the vacuous-match trap today
(the others: a filtered generate that was crashing, and six theme probes against a wave file that
was never written because Node's /tmp is not Git Bash's /tmp).

**Publish shape:** 36 new faces × 11 = 396 decks; `stage-new-faces.js` derives the new set from
the LIVE corpus (never a hand list) and refuses an empty-or-whole-wave result.
`gate-deck-title-similarity` = 0 FAIL / 0 WARN per locale, worst pair 0.217 against a 0.65 line.

### ⭐⭐ The G1-302 capital tangle — and an OPEN pedagogical question

**What happened.** The morning fix made `nameIdx` protect a proper name's capital at ANY index
under `showCap:false`. That is CORRECT — the spec header states d3 prints "every tile lowercase
EXCEPT NAMES", so the code had been contradicting its own documented design (capsIndices is blind
at index 0, where a capital is ambiguous). But the fix falsified prose in three places at once:
- **7 of 10 locales' G1-302 instruction** said the capital is absent or the end mark is the only
  cue ("Sin mayúscula", "la majuscule non", "de hoofdletter niet", "der er kun tegnet", "Vain
  lopetusmerkki auttaa"). Verified on rendered tiles: Hugo, Martín, Nathan, Lotte, Julia, Daan,
  William, Alma all print capitalised. All fixed by their own native panels.
- **The en base landing** said a name keeps its capital "only in the middle of the sentence,
  never as the first word". Repaired.
- **Three fi base landings** described pre-fix behaviour, incl. one saying the first word is
  *always* lowercased "even when it is a name" — exactly backwards. Repaired; a fifth is filed.

**⭐ English was SILENT here, not wrong — and seven panels resolved the silence the same wrong
way.** The inverse of the usual lesson. When the source omits something the design implies,
every locale invents the same plausible claim.

**⚠ A nuance I gave three panels was wrong and a panel refuted it.** I said "a capital marks a
NAME, not a sentence start, since a name can sit mid-sentence." MEASURED over the frames this
face draws: **name-mid is 0 in NINE of eleven locales** (fr 1, it 2). So when a name frame is
drawn, the capitalised tile IS the first word.

**OPEN — needs a pedagogical ruling, do not silently resolve.** On the hardest unscramble face
the child is asked to work out which word starts the sentence, but a protected name capital gives
it away whenever a name frame is drawn. Three options, all measured:
1. Exclude name frames from `showCap:false` faces — **NOT AVAILABLE**: it has 3 name-free frames
   in the token band and fi has 2, against the 4 lanes the face needs.
2. Lowercase a sentence-initial name under `showCap:false` — contradicts the spec header and
   prints a child's own name lowercase.
3. Accept it and never claim the capitals mean nothing (**current state**; the copy points at
   what IS given and stays true either way).
Adding mid-sentence-name frames per locale would fix it properly, but that is native authoring
across 11 banks.

**⭐ The end-mark tile is SHUFFLED** — it lands second in one lane and FIRST in another, so "the
mark is on the last tile" is a fresh falsehood. Found by reading the render, not the source.

### ⭐⭐ A landing describing a SIBLING must resolve that sibling's OWN config

The most productive defect class of the landing phase. A variation spec spreads
`{...base.difficulty[src], ...overrides}` into ALL THREE levels, so its real config is the base's
source level with the overrides applied — and the overrides are the interesting part. Prose that
reads numbers off the BASE's `difficulty` table describes a level that does not ship.

Two live Norwegian pages, both wrong this way:
- "the hardest level goes up to SEVEN words" — the face overrides `maxTok` to **six**.
- "the easiest version has FOUR sentences without names, where only the capital and full stop are
  missing" — that sibling has **three** lanes and `ends: ['.','?']` with `needQ: 1`, so the mark
  must be CHOSEN and one sentence is a question. It described the base's never-shipped d1.

**Rule: any quoted number — lanes, cards, word counts, ranges, marks in play — comes from the
sibling's config resolved at the SHIPPED level (`difficulties: [2]`), or from the render. Never
from the family's base table.** Now required in the landing brief.

**⚠ AND MY OWN "10 FALSE QUESTION-MARK PROMISES" WAS AN OVER-COUNT.** A grep cannot separate a
scoped mention from a false promise: the EN page says "the HARDER version mixes in questions" —
correctly scoped to the unshipped level and TRUE. The Danish one said the child chooses between
the marks with no scoping and told the teacher to watch for it — false, repaired in 2 lines. Only
a native read of the sentence settles it. The Norwegian base's question-mark mention turned out
LEGITIMATE (a sibling description) while the sentence beside it was the real defect.

**Live-prose repairs made this phase** (all one-sentence, every other field byte-identical):
en unscramble base · fi ×4 (3 bases + the 5th filed one) · no ×7 fields / 4 landings incl. a false
**h1** · da ×2 lines. Authorising the h1 was a judgement call: §21.5a's freeze ran to ~2026-09-01
and exists to stop MASS rewrites; a single h1 its own body now contradicts is the opposite case.
Scoped to that field, keyword head intact.

**⭐ The panels' instruments were wrong three separate times and each caught its own** — a
tile-reader keyed on `data-lcs-tile` (which printable `deck.html` never emits) that would have
CLEARED the defect it was sent to find; a `findIndex` that stopped at the first name and reported
"0 mid-sentence" for the wrong reason; a "GUARD MISSING" that was regex escaping. **Verify the
measurement before the defect** — the single most load-bearing habit in this whole batch.

### ⭐⭐ "It builds" is not "every bin fills" — the G1-292 theme grid

I repinned G1-292 to `fruits` in 10 locales this morning to keep one hreflang cluster, having
checked only that it BUILT. The German panel found the consequence: **de fruits is
{der:3, die:24, das:0}** — a three-chip page with one column permanently empty. `K-288`'s mix
guard only requires **two DISTINCT** articles, so a 3-bin locale sails through with a dead bin.

Measured grid (bins reaching the guard's floor of 2):
```
en   fruits 2/2  toys 1/2  animals 2/2  vehicles 1/2
de   fruits 2/3  toys 3/3  animals 3/3  vehicles 3/3
nl   fruits 1/2  toys 2/2  animals 2/2  vehicles 2/2
sv   fruits 2/2  toys 1/2  animals 1/2  vehicles 1/2      <- fruits ONLY
no   fruits 2/2  toys 1/2  animals 1/2  vehicles 1/2      <- fruits ONLY
da   fruits 2/2  toys 1/2  animals 1/2  vehicles 2/2
es/fr/it/pt  all four themes 2/2 ;  fi is mode:'form' (bins are word forms, not gender)
```
**No single theme works for all 11** — sv/no need fruits, de/nl cannot use it. Final pin:
**fruits ×9 + toys for de and nl** (de 3/3 at 5/5/7). A 9+2 hreflang split is the right trade for
a page whose bins actually fill. **When a guard's floor is looser than the page's shape needs,
"passes the guard" and "is a good page" are different questions.**

**⭐ German-specific, and I had not considered it:** `SENTENCES.de.nounCase === 'keep'`, so German
ships **Kamel** capitalised as well as **Emma**. The "no capitals" claim is doubly false there,
and the live page printed an all-lowercase example sentence to illustrate it.

**OPEN (live base page, found by the de panel, not yet repaired):**
`einzahl-mehrzahl-fruechte-vorschule` states umlaut/stem-change plurals "deliberately do not
occur", but `K-287`'s `isRegular()` NFD-folds diacritics for every non-EN locale and its own
comment names `de Apfel→Äpfel`. 14 umlaut plurals measured eligible.

### ⭐ The config BOUNDS the render, it does not DESCRIBE it

The Swedish panel took the resolved-config rule one step further and corrected a range
**downward** where the override went up: G1-283 sets `maxTok: 6`, but no Swedish frame reaches
six tokens, so "fyra till sex ordbrickor" was wrong even though the config permits it. Likewise
`minTok: 3` is unreachable in Swedish. **Resolve the sibling's config AND check the pool it draws
from — a permitted bound a locale's data never reaches is still a false claim.**

**Tally of the stale-capital class: 5 locales carried it** (en, fi, no, de, sv), each phrased
natively, each describing pre-fix behaviour. And the sibling-config class: 3 locales (no, sv, de),
every one describing the base's never-shipped d1.

**⭐ One prediction of mine finally earned out.** After the "10 false question-mark promises"
over-count, I re-measured on the g2274 face alone: 8 of 10 mention it only in p3 (the level-split
paragraph, correctly scoped like EN); the genuine suspects were the two mentioning it in **p1** —
nl and sv. Swedish's p1 was exactly the unscoped promise. **The fix for a coarse measurement is a
finer one, not abandoning it.**

**h1 rulings:** two false h1s repaired (no + sv), each contradicted by its own repaired body.
§21.5a stops MASS rewrites; a single self-contradicting h1 is the opposite case. Scoped to that
field, keyword head intact, title checked separately (no's was clean).

### Cross-locale live-defect classes found by the landing audits (running tally)

Each was invisible to every gate and surfaced only because native readers were asked to check
CODE against COPY. Counts are locales confirmed, not locales affected.

| class | confirmed | shape |
|---|---|---|
| stale capital claim | **6** (en fi no de sv nl) | "every tile lowercase, even names" — false since names are protected at any index |
| sibling-config | **4** (no sv de nl) | prose describing the base's never-shipped d1 instead of the sibling's resolved config |
| unscoped question mark | **2** (da sv nl) | p1 promising a choice the shipped `ends: ['.']` never offers |
| K-284 "model word removed" | **2** (fi nl) | d3 sets `caption`, so the model is RELOCATED under the picture, not dropped |
| K-285 names the hidden figure | **1** (nl) | the docblock says the figure is never printed — the reveal is the point |

**⚠ "p3 is the safe one" is a tendency, not a rule.** 8 of 10 locales scope their question-mark
mention correctly in p3 — but Dutch's p3 was independently wrong (the sibling-config class), so
the p1/p3 heuristic narrows attention, it does not license skipping p3.

**QUEUED, not done:** K-284 and K-285 base landings are unchecked in 9 and 10 locales. fi already
repaired its K-284 while nl only reported, so those two locales are now INCONSISTENT with the
rest — worth a single targeted sweep after the publish rather than mid-flight scope creep.

### ⭐⭐ A CONTENT ADDITION can falsify live prose too — the mirror of the code-change class

Found by the es panel: `G2-297`'s live landing says it is *"the only one of the three variants
that asks to count an interval between two marked days"*. True today; **false the moment this
batch publishes**, because the new `G2-312` also carries the `after` question — and "the three
variants" goes stale in the count as well (it becomes four).

```
G2-296 [dayOfDate countWeekday stickerDate daysInMonth]
G2-297 [dayOfDate countWeekday stickerDate weekLater after]   <- has `after`
G2-298 [dayOfDate countWeekday firstDay lastDay]
G2-312 [stickerDate after weekLater dayOfDate]                <- NEW, also `after`
```
**Standing rule: before publishing a variation into an existing family, check the family's live
pages for UNIQUENESS and COUNT claims the new sibling breaks** — "the only one that…", "the three
variants", "the largest…". Nothing in the pipeline connects a new landing to the prose of its
siblings. Queued for the 8 locales whose panels are already closed.

**⭐ The strongest grounding any panel used:** the es panel built each face's `build()` for its OWN
locale and read the resulting DOM, verifying its harness reproduced the English sweeps
byte-for-byte first. That surfaced claims invisible in the English render — es K-309 runs a→s not
a→t (the ñ makes 27 letters), es calendar is Monday-first, K-316 draws pez→peces — and caught a
false claim in its own draft ("largest cells in the family": cellH 68 against 72 elsewhere).

**⚠ `scratchpad/` was NOT gitignored** while ten panels wrote into it concurrently — one
`git add .` from sweeping every working file into a commit. Now ignored.

### 2026-09-03 CLOSE — 11/11 READY to publish

`publish-readiness.js`: 11 of 11 locales, 36 decks + 36 landings each = **396 + 396**.
All descriptions in band, 0 duplicate titles per locale, 0 FAIL/WARN on cross-variant
similarity, `lint-locale` 0/0 across the ten non-EN, `b2-baseline` 0 drift on 810 coordinates.

**⭐⭐ THE DEAD-BIN CLASS, TWICE, AND ONLY THE SECOND ONE HAD NO ESCAPE.** German `das` on
`fruits` was fixed by moving theme; Italian `lo` cannot be — it needs an s+consonant/z/gn/ps
onset and the picture vocabulary holds at most ONE such noun in any theme (0,1,0,0). So K-288's
sort layout now DROPS a bin the locale's POOL cannot fill (pool-stable, not deal-stable; throws
below two bins). ⚠ My theme grid missed Italian entirely because it read `A.chips` while G1-292
spreads d3, and **only fr and it declare a separate `chipsD3`** — right for nine locales, blind
for two.

**⭐ K-287's docblock contradicted its own implementation and that reached live prose in TWO
languages.** Header: "Regular (prefix) plurals ONLY". `isRegular`'s own comment 8 lines below:
stem-carries-over, naming `de Apfel→Äpfel` as intended. de found a live page denying umlaut
plurals (14 eligible); fr found "just add an s" while its pools admit -x/-aux ~1 page in 3.
**The code was right and the sentence above it was wrong** — fixing the docblock kills the source
of both. 0 behaviour change, 0 drift.

**⭐ The panels' best work was self-correction.** it made **fourteen** corrections to its own
draft by measuring (letter ceilings, `mirrorGroups` packing 4+3 at n=7, only 2 of 4 G2-312
questions being distances, invariable adjectives), and declined a superlative after checking it.
es caught "largest cells in the family" (68 vs 72). fr pulled three pages from 0.120-0.125 to
under 0.100 by replacing boilerplate with mode-true copy rather than moving a threshold.
**Several panels caught themselves mid-superlative — it is the most dangerous sentence shape in
this corpus.**

**⭐ it applied the newest rule to MY code change**, unprompted: it verified the bin fix does not
falsify the live sibling `articoli-il-lo-la-otto-carte` ("four labels" — still true, because
`cards` is built from the original chips BEFORE the sortWords block). And it tightened a 73-char
title unasked rather than assume my ≤70 was scoped to one face.

**Final live-prose repair tally: ~50 fields across ~30 pages in 10 locales**, every one a false
statement about what a worksheet does. Classes: stale capital (9 locales) · sibling-config (7) ·
unscoped question mark (2, exactly the two predicted from the p1/p3 split) · uniqueness-claim
broken by a new sibling (3) · K-284 model-relocated (2) · dead bin (2).

## ✅ SHIPPED 2026-09-03 — 1,100 worksheets + 1,100 landings live in 11 languages

**Published:** 396 decks + 396 landings (36 new faces × 11). Wave clean: 396/396, 0 collisions,
0 errors, 0 theme/mode halts, all 55 finalization steps, audit **36/36 clean per locale**,
confirmed in the DB by face id. Landings composed +36 each, **0 replaced**. Hub strip 209 → **245
links per locale — the DERIVED figure, matched without being written down in advance.** Canonicals
repointed 397 (0 missing, 0 embed snippets damaged), exempt map refreshed 20,426 → 19,634 lines,
IndexNow 396 URLs HTTP 200, deploy 1,660 tests / 0 failed. Family depth 3-4 → 4-12 landings
(87 across the 13 affected families in en). Live canonicals verified in 4 locales after the
Cloudflare TTL.

**⚠ Three of my own measurements were wrong in the final stretch, each looking like a defect:**
- DB reported **0 newly published** — the filter was a 45-minute window and more time had passed.
- The composer "failed" in all 11 locales with MODULE_NOT_FOUND — **the Bash cwd persists across
  calls** and a `cd` eight steps earlier was still in effect.
- The live canonical read self-canonical while disk was correct — Cloudflare inside its 300s TTL
  (`Age: 246`, `last-modified` predating the repoint). It refreshed on its own.
- Plus the repoint's first launch died on nested-quote mangling (`seo-landing/ 2.json`) — a clean
  startup failure, **0 locales run, nothing written**, verified before relaunching via a script
  file. Same family as backticks in `node -e` and `\s` in a heredoc: **put it in a file.**

**Honest outcome vs the goal:** the ≥1,000 clicks/day target is NOT met and will not be by this
batch — ~a few hundred/day at maturity, bounded by demand for these 20 types, not page count.
What it did buy: genuine 11-language catalogue completeness, and **~50 false statements corrected
on pages that were ALREADY LIVE**, found by native panels checking CODE against COPY.
