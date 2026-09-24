# sv fan-out — `line-plot.read.2-md-d-9` — Swedish pedagogue ruling (Lgr22)

Advisory only. Nothing edited. All facts below re-measured from the repo this session.

## Measured baseline (verified, not remembered)

| Fact | Source |
|---|---|
| `strand-names.ts` auto-maps "Measurement & Data" → sv **`Mätning och data`** | `frontend/lib/seo/strand-names.ts:73-85` |
| `graph-it.bar-graph.2-md-d-10` ships **`sv: 'Sannolikhet och statistik'`** | `page.tsx:214` |
| `line-plot.read.2-md-d-9` override row: de/fr/es/pt/it/nl — **no `sv`** | `page.tsx:215` |
| No `sv` key in `GRADE_OVERRIDE` for either row (graph-it or line-plot) | `page.tsx:30-129` |
| graph-it categories = leaf/berry/acorn/mushroom/pinecone (nominal, unordered) | `graph-it-activities.json:9-52` |
| line-plot: 11 rounds, 3 datasets, scale 1–8, all `placeLength` ∈ {4,6,7} | `line-plot-activities.json:10-21` |
| **THREE** string tables, not two | see §4.1 |

## D1 — STRAND: `Sannolikhet och statistik` (match graph-it). One key.

Lgr22 matematik keeps six rubrics for åk 1–3: Taluppfattning och tals användning ·
Algebra · Geometri · **Sannolikhet och statistik** · Samband och förändring ·
Problemlösning. The relevant bullet (recalled, verify verbatim at Skolverket before it
enters Swedish-facing prose):

> *"Enkla tabeller och diagram och hur de kan användas för att sortera data och beskriva
> resultat från enkla undersökningar, såväl med som utan digitala verktyg."*

vs the Geometri measurement bullet: *"Jämförelser och uppskattningar av matematiska
storheter. Mätning av längd, massa, volym och tid med vanliga nutida och äldre
måttenheter."*

Ruling — **Sannolikhet och statistik**, i.e. match graph-it, NOT the measurement family:

1. 8 of 11 rounds contain no measuring act at all. The lengths are already recorded; the
   child counts X-stacks. That is verbatim *sortera data och beskriva resultat*.
2. The 3 plot rounds add a datum to a record. The reading-off is one step; the recording
   is the taught act.
3. Geometri's bullet is about *jämförelser, uppskattningar och mätning med måttenheter* —
   an instrument and two quantities. There is no instrument here and (except `maxMinusMin`)
   no two quantities; cm is a label on an axis.
4. A line plot's defining property is that its categories ARE numeric measurements. That
   *is* "sortera data" over an ordered scale. Filing it under Geometri severs it from its
   only sibling and from the diagram progression.
5. Coherence: a Swedish teacher teaches stapeldiagram and this in the same block.

Honest counter-weight: `maxMinusMin` returns **cm**, not a count — that one shape of five
genuinely is Geometri work, and it duplicates my shipped *Hur mycket längre?* (2.MD.A.4).
It is 2 rounds of 11. A cross-link, not a rubric change. See D3.

## D2 — GRADE: åk 2, no override.

Lgr22 states centralt innehåll once for åk 1–3, so the syllabus cannot place a year. Placed
by progression:

- Numbers do NOT force åk 2: counts 0–3, scale 1–8, largest computation 8−2=6. All åk 1.
- The REPRESENTATION forces it: a frequency distribution over a tallinje, plus two-step
  questions (`maxMinusMin` = locate max, locate min, subtract; `moreAB` = two counts, then
  a difference). Two-step data questions are åk 2.
- Swedish läromedel practice: simple sorting/tally tables late åk 1; diagram reading with a
  numeric scale and comparison questions in åk 2 (Favorit matematik 2, Prima 2, Singma 2).
  *(medium confidence — worth one läromedel check)*
- cm as standard unit is åk 1–2. Fine.
- Nothing reaches åk 3 (which wants larger sets, scale >10, half-unit marks).
- **Harmonisation is load-bearing**: *Pips stapelskog* is åk 2 with no sv grade override. The
  pair must sit at the same level.

Chip = placement, not capability. A confident åk 1 class in vårterminen can do the read cog.

## D3 — Fence vs *Pips stapelskog*. Operator's reading confirmed and sharpened.

**The axis is the whole difference.** Pip's horizontal axis carries *kategorier* — nominal
labels with no order and no distance (ekollon is not "between" löv and bär). Here the axis is
a **tallinje**: ordered, equally spaced, and the gaps carry meaning.

Four consequences, all exercised by the shipped data:

1. **A gap is information.** "Inga snäckor är 4 cm" is a fact about the distribution. A
   missing bar in Pip is just a category nobody drew. Measured: `hasInteriorGap` is true for
   **every** read round (dataset A [2,3,5,5,5,6,8] misses 4 and 7; B [3,4,4,4,6,7] misses 5;
   C [2,2,4,6,6,6,7] misses 3). The differentiator is baked into the data.
2. **One X = one object.** Pip reads a bar's height off a scale (a number you read). Here the
   child counts marks, each one shell. Different act, same-looking picture.
3. **Order-based queries exist only here.** `longerN` ("längre än 5 cm") is impossible over
   categories, and `maxMinusMin` asks a question about *distance along the axis*.
4. **Pip only reads; this also generates.** The plot cog closes measure → record → read.

**The one real overlap:** graph-it's `more` ("how many more A than B") is the same shape as
line-plot's `moreAB`. Object differs (two categories vs two positions on a scale), and it is
1 of 5 question shapes; 4 of 5 are Pip-impossible. Pip additionally owns `total`, `verify`,
`match`, `fix`, `build-tally`, `build-picture` — none here. Acceptable.

**Second fence, inside my own family (the operator did not name it):** `maxMinusMin` in
Swedish reads naturally as *"Hur mycket längre är den längsta snäckan än den kortaste?"* —
which is verbatim the title of my shipped ***Hur mycket längre?*** (2.MD.A.4). The
differentiator is real and must be stated in the sv intro: there, the child measures **two
given objects**; here the child must first **find the extremes inside a distribution**. The
extra step is locating them on the plot.

**Title must lead on `tallinjen` + `kryssen`**, never on *diagram*. Reserve **stapeldiagram**
for Pip entirely — title, slug and intro.

### Swedish naming (pedagogue's constraints; final wording is the linguist's)

- **Do not name the diagram type.** Swedish primary has no settled åk-2 noun for this shape.
  *stolpdiagram* is the correct statistical term but is åk 4+; *punktdiagram* means SCATTER
  PLOT; *prickdiagram* is ambiguous; *kryssdiagram* is not standard Swedish (it is a calque
  of the Dutch *kruisjesdiagram*). Describe the act instead: **"sätta ett kryss på tallinjen"**.
- **`tidvattenlinje` is dead on arrival.** The Baltic has centimetre tides; a Swedish
  8-year-old has no tide concept. Rebuild the setting as **strandlinjen** — same picture
  (a line along the beach where things wash up), universally familiar.
- shells = **snäckor** (⚠ not *musslor* = bivalves; ⚠ not bare *skal* = peel/husk).
- hermit crab = **eremitkräfta**.
- mode = **"den vanligaste längden" / "kommer oftast"**. ⚠ NEVER **typvärde** (åk 6+) — the
  exact parallel of the it "NON la moda" and nl "NOOIT de modus" warnings already in the file.
- plot-verb = **"sätta ett kryss"**. ⚠ NEVER *plotta*.
- ⚠ Mascot name: **do not use "Skalman"** — it is the tortoise in Bamse, Sweden's best-known
  children's comic. Suggest e.g. *Sigge*; linguist decides.
- Shape, following the sibling: `"<Namn>s strandlinje – kryss på tallinjen (åk 2)"`.

## D4 — English audit (read against `line-plot-core.js`, not the prose)

Answered directly first:

- **`qDiff` matches the core.** `Math.max(marks) − Math.min(marks)` is exactly "how much
  longer is the longest than the shortest". No defect.
- **`qMore` matches its round data.** lp-more-56: c[5]=3, c[6]=1 → 2. lp-more-46: c[4]=3,
  c[6]=1 → 2. Both correct, both non-negative.
- **All `placeLength` are inside 1–8**: 6, 4, 7. ✓
- **No nudge or sr string leaks an answer**, with one designed exception (§4.4).

### 4.1 ⚠⚠ There is a THIRD string table, and it is invisible

`_resolve` line 311 hard-codes six locale literals in a ternary chain —
`'eine Muschel'`, `'{a} coquillage'`, `'una concha'`, `'uma concha'`, `'una conchiglia'`,
`'één schelp'` — outside both `strings` and `L`. **`en` has no branch**, so EN renders
`"1 shells!"`. Latent today (both `atN` answers are 3) but live the moment round data
changes, and **any sv build that ships without an `sv` branch will render "1 snäckor"**.
This is the graph-it three-tables trap repeating. Brief 19 items, not 18.

### 4.2 ⭐ The answer is the MEDIAN of the three cards in 10 of 11 rounds

`nearNums(a, lo, hi)` walks `[a−1, a+1, a+2, a−2]` and stops at 3, so for any `1 ≤ a ≤ hi−1`
it returns exactly `[a−1, a, a+1]`. Every round has `a ∈ [2,7]` with `hi = 8`. Verified per
round: 3→[2,3,4] · 3→[2,3,4] · 2→[1,2,3] · 6→[5,6,7] · 5→[4,5,6] · 2→[1,2,3] · 2→[1,2,3] ·
plot 6→[5,6,7] · plot 4→[3,4,5] · plot 7→[6,7,8]. **Ten of eleven: pick the middle value.**

Display order *is* shuffled (`_choiceOrder`), so it is not a positional tell — a child must
sort three small numbers mentally, which an åk-2 child can do. It is a value-structure leak
in the CORE, inherited by all seven live locales, and invisible to any prose review.
Fix: let `nearNums` sometimes return `[a, a+1, a+2]` or `[a−2, a−1, a]`.

### 4.3 ⭐ "Pick the biggest card" wins the mode round

`choices()`'s mode branch takes `presentLengths.filter(≠a).slice(0, 2)` — always the two
**smallest** non-mode lengths. lp-mode: present [2,4,6,7], mode 6 → distractors [2,4] →
cards [2,4,6], **mode is the maximum**. Whenever the mode exceeds the two smallest present
lengths (usually), the answer is the largest card. Not learnable from one round — but the sv
build should add mode rounds for variety, and the strategy is then free. Fix: draw
distractors from the lengths whose **counts** are nearest the mode's, i.e. near-miss stacks.

### 4.4 The screen-reader plot round has no cognition left

`srPlot` states `{len}` — which *is* `oracle(round)`. Defensible as accommodation (the coral
bar is not perceivable), but the task collapses to "tap the number you were just told". Not a
leak (`.tl-sronly` is genuinely clipped), and not sv-specific. Recorded, not vetoed.

### 4.5 EN drops the unit that all six other locales carry

- `srJoin` en `'{c} at {v}'` vs de `'{c} bei {v} cm'`, fr/es/pt/it `'… cm'`, nl `'… cm'`.
- `srPlot` en `'A new shell measures {len} on a scale of 1 to {max}'` — no cm, and
  *"measures 6"* is not idiomatic English. All six others say `{len} cm`.
- `winPlot` en `'plotted at {a}!'` vs de `'bei {a} cm eingetragen'` etc.

Pattern: a later locale fixed it and nobody backported to the source.

### 4.6 `winNum` covers two different KINDS of quantity

`_resolve` routes `atN` → `winAt` ("{a} shells"), `mode` → `winMode`, and **everything else**
→ `winNum` ("the answer is {a}"). So `longerN` and `moreAB` (**counts of shells**) and
`maxMinusMin` (**centimetres**) share one unitless confirmation. Distinguishing "how many
data points" from "how many units along the scale" is the central idea of this standard, and
the feedback never names it. All seven locales inherit this. Strongest pedagogical finding.

### 4.7 `qMore` is ungrammatical in English

`'How many more shells are {a} cm than {b} cm?'` → *"…shells are 5 cm than 6 cm"*. `qAt`
gets it right (`'are {n} cm long'`). Should be *"…are {a} cm long than {b} cm long"* or a
rebuild. Six locales rebuilt around it; English never did.

### 4.8 `qplot` uses the exact jargon the other locales were warned off

en *"Tap its length to **plot** it."* The it comment says «⚠ NEVER «plottare»=dev jargon» and
the nl says «⚠ NOOIT «plotten»». The English source uses the register both were protected
from. "Tap its length to mark it" / "…to add it".

### 4.9 One generic nudge for five cognitively distinct questions

`nRead` = *"Look again at the X's over each number"* fires for `atN`, `longerN`, `mode`,
`maxMinusMin` and `moreAB`. For `maxMinusMin` it points at the wrong thing entirely (the
child needs "find the longest and the shortest"). No-shame tone is intact; the scaffold is
empty. ⚠⚠ **A per-question-type nudge cannot be added for sv alone** — the dispatch is shared
code, so `txt()` would silently fall back to `L.en` and leak English into the other six
locales. All-seven-plus-sv, or not at all.

### 4.10 Data variety is thin against §A.13.60

11 rounds over **3 datasets** (A used 5×, B 4×, C 2×). Question-type variety (5 shapes,
2 cogs) carries it past the letter of the rule, but the child sees the same plot repeatedly.
The fractions ruling — "≥7 code-distinct configurations of one plain shape does NOT satisfy
it" — applies in spirit. Cheap, data-only fix: a distinct dataset per round.

### 4.11 SERP prose overstates the plot cog

it: *"mano a mano che le X si impilano, prende forma il diagramma delle frequenze"* and nl:
*"voor elke schelp komt er een kruisje boven het juiste getal"* both describe the child
**building** the diagram. Measured: 3 plot rounds, each with 6–7 marks pre-placed; the child
adds exactly **one** X. Swedish must say so truthfully. (en `page_intro` "measure shells and
plot their lengths" has the same tint; the `instruction` string is accurate.)

### 4.12 ⚠ es and it `page_intro` claim "sin registro" / "senza registrazione"

Outside my brief, reporting as asked. This is an access claim about the product, exactly the
class the prose sweep hunts, and per `frontend/lib/quota.ts` the tier truth is a limited
trial. **Swedish must not inherit "utan registrering."** The es/it strings want checking by
whoever owns that gate.

### 4.13 Minor / latent

- `choices()`: `var hi = round.cog === 'plot' ? round.scale.max : round.scale.max;` — the two
  branches are identical. A distinction was intended (count answers are bounded by the number
  of marks, not by the scale) and lost. Harmless today.
- `scale.min` is authored in all 11 rounds and **never read** by the core.
- Read mode draws the axis from x(0) but labels only 1..max; plot mode labels the 0. The
  origin is treated inconsistently between cogs.
- X-stack headroom: `baseY − 10 − (n−1)·14` inside `H = 102` clips at **n ≥ 6**. Max stack
  today is 3.
- `_makeTask` falls back `|| 'qAt'` on an unknown question type, rendering *"How many shells
  are undefined cm long?"*. Defensive-skip (§17.8.11) would be correct.
- Choice buttons carry `aria-label = String(val)` — a bare numeral. Context exists only in
  `srRead`. Thin but acceptable.

## Vetoes

1. **`Mätning och data`** (the auto-map) — a Common Core calque; no such Lgr22 rubric.
2. **Any tide conceit** (*tidvattenlinje*) — no meaningful tide in Sweden. Use *strandlinjen*.
3. **`typvärde`** at åk 2.
4. **`plotta`**.
5. **`stapeldiagram`** anywhere in the sv title/slug/intro — Pip owns it.
6. **`punktdiagram`** (= scatter plot); **`stolpdiagram`** as the lead noun (åk 4+).
7. **`musslor`** for the shells.
8. **`Skalman`** as the mascot name (Bamse).
9. **Inheriting "utan registrering."**
10. **Adding `L` keys for sv alone** — silent English fallback for six locales.
11. **Shipping sv without an `sv` branch in the `_resolve` singular chain** (§4.1).

## Scope if built

23 authored items: 8 `strings.*.sv` · 10 `L.sv` · 1 inline singular branch · `slug.sv` ·
`page_title.sv` · `page_intro.sv` · 1 `STRAND_OVERRIDE` sv key. No `GRADE_OVERRIDE` key.
Core defects §4.2/§4.3/§4.6 are cross-locale and belong in their own commit.

## Where I am uncertain

- **Verbatim** Lgr22 bullet wording (§D1) — recalled. Substance high confidence, wording medium.
  Verify at Skolverket before it reaches Swedish-facing prose.
- Whether some åk 1 läromedel already introduce a numeric-axis mark diagram — medium.
- The right Swedish åk-2 noun for this diagram shape — genuinely unsettled in Swedish
  practice, which is *why* I recommend not naming it.
- Mascot name: linguist's call; I only veto *Skalman*.
