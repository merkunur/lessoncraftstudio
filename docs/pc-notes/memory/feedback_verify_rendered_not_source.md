---
name: feedback-verify-rendered-not-source
description: A verification heuristic must be proved to FAIL on the pre-change state and to bite when poisoned — three heuristics in one session passed on data that had not changed
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 48bc9529-fbcd-4850-a3ea-778a761e73bc
  modified: 2026-07-20T18:10:27.105Z
---

Two failure modes keep recurring, and both produce a green check over a broken thing.

## 1. Verify the RENDERED output, never the source or a grep

The de-orphan precedent (§22.1): a predicate looked correct in the code path, a grep saw it
"working", and the rendered grid returned **0 results** because only the metadata query had
been patched, not `fetchDecksForTopicWithFilters`. A source-level check would have shipped
silently-orphaned hubs.

**Why:** the thing that matters is the bytes the server emits. Anything upstream of that is a
proxy that can be right while the page is wrong.

**How to apply:** fetch the live URL and read the emitted attribute/tag. For client-gated UI
that never reaches SSR HTML, use Puppeteer with `setCacheEnabled(false)` (§A.13.43, §A.13.50).

## 2. A gate must be proved to bite — on both ends

**Baseline-FAIL:** run the verifier against the UNCHANGED state first. If it passes before the
fix exists, it is measuring the wrong thing. Empirical, 2026-07-20 topic-hub alt-text work —
three heuristics in a row:

| heuristic | why it lied |
|---|---|
| alt contains a comma | a French level label is "(grande section, 5-7 ans)" → reported 33 vocab alts on a page with none |
| alt contains a known vocabulary name | Spanish theme names collide with vocabulary names ("Animales") → reported 24 of 26 **before deploy** |
| alt matches the locale's own `seo.worksheetMainAlt` template, built from `messages/<locale>.json` | correct — 0/0/0 across 8 hubs pre-change, and language-agnostic |

The third works because it tests **which template rendered**, which is the actual question,
instead of a symptom correlated with it.

**Poison-test:** mutate the data with each defect class the gate claims to catch and confirm
it FAILs, then restore and confirm it PASSes. The deck-vocab verifier was poisoned with an
invented noun, an English form in a German page, a word-puzzle naming a pool noun, and upload
residue — it caught all four, and passed clean after restore.

**Corollary already in the tree:** a surviving mutation can mean the GATE under-measures, not
that the mutation is harmless (see the Measurement Bench note in [[project-premium-tools-program]]).
Never accept the survivor; add a directed boundary test.

Related: [[project-crawl-budget-collapse-2026-07]], [[feedback-visual-qa-container-containment]].

## 3. Text placed ON a ruled frame is right only if its rendered x-height meets the midline (2026-09-21)

`rulingBlock` sized every printable sentence starter at `0.78·glyphH` — a derived factor, never
measured — and the caps of "because" / "The hedgehog is" sat ON the dashed midline in 11 locales
while every gate was green (the verifies checked text and length, never the rules). A layout that
puts a font on a frame needs the FONT'S metrics (`tools/measure-font-metrics.js` → `font-metrics.json`,
Chromium canvas TextMetrics), and the gate must measure the render: rule y from the svg `line`s
through `getScreenCTM`, the baseline from the text's own coordinates, the ink from the same document's
font — `qa/verify-ruling-starters.js`. ⚠ **A `verify()` that reads `style.left` and `data-lcs-*` is
reading the SOURCE**: G2-235's registration check passed on every deck while flex-shrink had rescaled
the ruler under it (`xMidYMid` re-centred the 0 tick 134 px away). ⚠ And when the "control" of a new
gate fails, MEASURE before dismissing it — the old d1 "control" that failed was a real 12 px
mis-registration nobody had seen for three months. → [[project-writing-frame-starter-fix]]

## 4. A republish is live only when the EDGE serves it (2026-09-21)

Round 1 of the starter fix was verified at origin and on the deck.html preview; the operator
downloads the PDF, and Cloudflare served the 30-day-cached v1 PDF under the unchanged URL
(`cf-cache-status: HIT, Age 7990`, `last-modified` two and a half hours older than origin). The
same hole sat under every earlier in-place republish. **Verify the artefact the person opens,
through the path they open it** — `curl -sI` through Cloudflare (not `--resolve 127.0.0.1`),
compare `last-modified` with origin, then download and READ the PDF. And a render you looked
at and called "close enough" (the G1-306 rime) is not a measurement: a frame model needs the
gate, and the gate needs to cover every text on the row, not the attribute you happened to name.
