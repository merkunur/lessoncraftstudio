# Swedish linguist review — `sentence-builder` (L.1.1.j)

Advisory only. No file edits made. All counts below are measured, not recalled.

---

## 0. Measurements taken (so nobody re-runs them)

| Probe | Result |
|---|---|
| `hoppar` in `mini tools/` | 13: `hoppers-number-line-activities.json` ×9, `ten-stones-activities.json` ×2, `asking-bench.js` ×1 ("Ett ord hoppar först"), **`tense-activities.json` ×1 (`{lemma:"hoppa", present:"hoppar"}` — an ordinary lexical verb in a Swedish literacy activity)** |
| `stor/stora/stort` | 435 combined; sampled sv contexts are overwhelmingly the fixed collocation **`lika stora (delar)`** (fractions/comparison), not attributive size |
| `kör` | `choral-counting.js` + `estimation-jar.js` `sv:'Räkna i kör'` (= **choir**), `sv.json` `kör fast` (= get stuck). `kör` = "drives" is **unshipped** |
| `mening` / `meningen` / `meningar` | 22 / 10 / 3 — house word for *sentence* ✓ |
| `ordföljd` | **0** — free |
| `satsen` | 0 in sv-scoped files |
| `krumelur` / `byggis` / `ordis` / `krulle` | 0 / 0 / 0 / 0 |
| `randig`, `tutar`, `grymtar`, `kacklar`, `skuttar` | 0 each — free |
| `ruta` / `rutan` | 21 / 7 — established slot noun (`syllable-builder` sv) |
| `punkt` / `punkten` | 33 / 7 |
| `hear:` in siblings | `plural-activity.js:92 sv:'🔊 Lyssna'`, `tense-activity.js` same, `hoppers` `'🔊 Lyssna igen'` — coordinator's claim **confirmed** |
| `Mätis` | `lay-units-activity.js` sv title `Mätis trädgårdsstig`; `activity-content/sv.json` "Mätis är en **mätarlarv**" — species clash **confirmed**; note the genitive is written `Mätis trädgård` (zero genitive) ✓ |
| shipped hintOrder lengths | en 94 · de 103 · **fr 121** · es 108 · pt 105 · it 109 · nl 86 chars |

---

## 1. Code facts that change the answer (read from source, not assumed)

**`lcs-shell.js:877-880`**
```js
var hintKey = currentTask.hintKey && currentTask.hintKey(tool, answer);
var hintMsg = hintKey ? api.t(hintKey) : i18n.chrome('tryAgain');
if (hintSpan) hintSpan.textContent = hintMsg;          // hint REPLACES tryAgain visually
api.announce(i18n.chrome('tryAgain') + ' — ' + hintMsg); // SR gets BOTH
```
plus `setTimeout(…, 1800)` which clears the hint and restores the prompt.

Consequences:
1. The hint **replaces** "Inte än — försök igen!" on screen → the hint **must** carry its own softener.
2. The hint **must not begin with "Inte än"** → it would stutter in the SR channel.
3. The hint has a **1800 ms** reading window → 94–121 characters is unreadable by a 7-year-old. Swedish must be short.

**`api.t()` reads `tool.strings`, not `L`.** Therefore in `sentence-builder-activity.js`:
- live: `L.<lang>.q` (line 177), `L.<lang>.hear` (line 262)
- **dead: `L.<lang>.win`, `L.<lang>.hintFill`, `L.<lang>.hintOrder` in all 7 locales** — `win` is never referenced at all (the shell renders `i18n.chrome('celebrate')`), and the two hints are verbatim duplicates of `strings.hintFill/hintOrder`, which is what actually renders.

---

## 2. Rulings (summary; full text in the delivered report)

- **V2 / uniqueness: SAFE, and the safety device is the period-on-the-verb, not the curation.** Any well-formed *written* arrangement must put the period tile last and the capital tile first; that pins the verb to slot 4 and the determiner to slot 1, leaving 2!=2 orders of {Adj, N}, of which Swedish licenses one. `Skäller den stora hunden.` is excluded (V1 = interrogative / literary narrative inversion, not a åk-2 declarative). **The transitive-object hazard (`Den stora äter hunden.`) is fully neutralised by the same pin.**
- **Fifth tile: the real test is not "a fifth tile" but "does the un-pinned middle admit two grammatical orders".** Swedish triggers: (a) two coordinate adjectives (`den stora bruna` ≈ `den bruna stora`), (b) a mobile adverbial. Both must be refused.
- **sv #21 precedent risk: LOW here**, conditional on (i) exactly one capitalised tile, (ii) the period on the verb, (iii) no second adjective, (iv) no mobile adverbial.
- **DEFINITE (`Den stora hunden skäller.`) over indefinite** — I disagree with the "unintroduced referent" premise: a picture licenses *deictic* definiteness in Swedish exactly as in German/Dutch, and all six shipped non-EN decks are definite. Definite also gives an **invariant weak `-a` adjective across all nine rounds** (maximum word-order salience, minimum morphology) and handles the unique-referent sun.
- **Mascot: rename** (initial `W` is the loan-letter case that renamed *Inchie*; semantically inert in Swedish). → **`Krumelur`** (squiggle/doodle; 0 hits; genitive `Krumelurs` ✓). **Do not name the species** — Mätis is already a `mätarlarv` and `larv` doubles as *silly*; describe the shape.
- **Title: `Krumelur bygger meningar`** in `strings.title`; **`meningsbyggnad` / `ordföljd` in `page_title`/slug** (teacher-search terms). `Meningsbyggaren` is good Swedish and a clean third rung of the `Ordbyggare → Stavelsebyggaren` ladder, but belongs in the SEO copy, not in place of the mascot.
- **Fence: refuse `kör` (two grounds). Allow `hoppar`. Allow `stor` but ration it to one round** — a blanket ban would also cost `stor bokstav`, the only child term for a capital letter.

---

## 3. Defects found in the source and the other locales

1. `L.*.win` / `L.*.hintFill` / `L.*.hintOrder` — **dead strings, 7 locales × 3 keys = 21**.
2. `_srMirror` (line 275-287) has **no `sv` branch** → Swedish screen-reader users get English.
3. `render()` line 243: `aria-label` = `'empty slot ' + (si+1)` — **hardcoded English in all 7 locales**.
4. `it.hintOrder` is the only locale with **no softener** — it fires only after a failure and, because the hint replaces the retry line, the Italian child gets a bare command.
5. All seven `hintOrder` strings are **86–121 chars against an 1800 ms window**.
6. `fr` — the guillemets and the `!` use ordinary spaces, not U+00A0 (low severity).
7. `it` docblock promises «…» caporali; the it strings contain no quotes (stale comment).
8. **False alarm checked and cleared:** `syllable-builder-activity.js` has English under `sv:` at lines 44 and 55 — this is *deliberate*, documented two lines above as "EN-only; non-EN fall back to EN but never route (slug.en only)". Not a defect.
9. EN/de closest calls, both saved by the period-pin: `The bus stops fast.` and German `Bus fahren` (`Der gelbe fährt Bus.`). If the period is ever split onto its own tile, **both break**.
