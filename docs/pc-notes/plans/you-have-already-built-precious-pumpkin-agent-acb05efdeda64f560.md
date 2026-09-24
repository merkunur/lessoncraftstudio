# sv rebuild — `sharing-jar.make-fair.1-oa-d-8` ("The Sharing Jar") — pedagogue rulings

Advisory only. No code written. All findings measured against the artefact 2026-09-08.

---

## RULING 1 — STRAND: **OVERRIDE to `Taluppfattning och tals användning`** (confidence ~75–80%)

`page.tsx` line 151 gains `sv: 'Taluppfattning och tals användning'` alongside the existing
`pt: 'Números', nl: 'Getallen en bewerkingen'`.

**Lgr22 verbatim (Skolverket GRGRMAT01, åk 1–3), the two live bullets:**

- Algebra: *"Obekanta tal och hur de kan betecknas med **en symbol**."*
- Taluppfattning: *"De fyra räknesättens egenskaper och **samband** samt användning i **olika situationer**."*

The Algebra bullet is **representational** — Skolverket's kommentarmaterial glosses it as
"enkla symboler för att beteckna det man inte vet … streck, **tomma rutor** eller andra
grafiska symboler." That is the *öppna utsagan med tom ruta* = the match-pairs sibling.
This activity renders **no likhet, no likhetstecken during decide, no ruta** — only two jars,
beads, counts, and a `?` on the bridge. Its load is: read the situation → pick the räknesätt →
use the add/sub *samband*. That is the Taluppfattning bullet verbatim.

**Corroboration (measured, in-repo):** `frontend/content/seo-landing/sv.json` — of 2,925 sv
landings carrying a strand, **0 are `Algebra`**; the five landings whose standard is exactly
`1.OA.D.8` are **all** `Taluppfattning och tals användning` (incl. "Öppna utsagor upp till 20").
⚠ Weight this as corroborating only — the §22.5 sv ledger-lock may not have offered Algebra as
an option, so it is partly absence-by-construction.

**Counter-evidence named honestly:** the bridge does render `?`, a graphic symbol standing for
the unknown — a thin but real hook into the Algebra bullet. It is not "beteckna ett obekant tal"
in the Lgr22 sense because there is no likhet for it to sit inside.

**numbers-court is NOT a counter-precedent.** `1.OA.D.7` *is* "likhetstecknets betydelse" —
verbatim the first Algebra bullet. Its auto-map is right by coincidence, not by policy.

**Bonus:** overriding produces a principled, self-differentiating split — concrete → Taluppfattning,
symbolic (sibling) → Algebra — which also solves Ruling 3 on the chip.

Plain heading, no parenthetical. (The existing `Geometri (mätning av längd)` descriptor form
exists because bare "Geometri" would mis-describe a ruler; "Taluppfattning" describes this fine.)

---

## RULING 2 — GRADE: **åk 1 confirmed. No `GRADE_OVERRIDE`.**

Lgr22 states centralt innehåll once for the whole åk 1–3 block, so it cannot decide a year;
progression + Swedish textbook practice decide. Measured: all nine unknowns are **≤7**
(2,4,3,2,7,3,0,4,4), the tile row caps at 10, the largest given is 12. Swedish åk 1 works in
talområdet 0–20 (0–10 autumn, 0–20 spring); "hur många fler?" and "hur många till?" are åk-1
content in every major Swedish åk-1 series.

The hardest type here — `start-unknown` (`? − 3 = 4`) — sits late åk 1 / early åk 2 in Swedish
materials, but it is one round of nine, answer 7, posed **concretely** with a badge rather than
symbolically. That does not lift the page. If Swedish teachers later read it as åk 2, re-band
that single round; do not move the page. Keeps it level with numbers-court (åk 1) and the
de/en Klasse 1 / Grade 1 spine.

---

## RULING 3 — DIFFERENTIATION from `match-pairs.find-the-missing-number` ("Hitta det saknade talet")

Same code, genuinely different teaching point:

| | sibling (match-pairs) | this (sharing-jar) |
|---|---|---|
| Swedish name | **uppgift i symbolform / öppen utsaga med tom ruta** | **räknehändelse / matematisk situation** |
| on screen | `? + 4 = 9`, `14 − ? = 6` | two burkar, pärlor, no equation |
| child's job | *tolka symbolerna* — the ruta moves | *tolka situationen* — decide which räknesätt and what is asked |
| Lgr22 | Algebra ("betecknas med en symbol") | Taluppfattning ("samband … i olika situationer") |

The classic Swedish finding is that these dissociate: children who solve `5 + __ = 8` stall on
"Anna har 5 kulor, hur många till för att få 8?" — and vice versa. The pair is a **strength**,
not duplication, provided the copy says which is which.

**This one must lead with the SITUATION and the comparison, never the symbol.**

- ❌ the sv title/slug may **not** contain "det saknade talet" — the sibling owns
  `hitta-det-saknade-talet` as both slug and title, verbatim.
- lead on **lika många** + **hur många fler / hur många till**.
- title direction: *"Lika många i burkarna — hur många fler behövs?"*;
  slug direction: `lika-manga-hur-manga-fler-ak-1`.
- `page_intro` should name **räknehändelse** explicitly — that word is what separates the two
  pages in a Swedish teacher's eye.

---

## RULING 4 — ENGLISH AUDIT (verified against `make-fair-core.js`, not the prose)

**1. ⭐⭐ `restore` DRAWS THE ANSWER.** `_scene`: `ghost: reconcile ? 0 : u` renders `u` faded
beads **during decide**. Round 2 (s=7, r=4, u=3) → 4 solid + **3 ghosts**. The child counts the
ghosts and taps 3 with no subtraction. This contradicts the core's own header doctrine ("the
child must DETERMINE m", `incrementSurfaceExists===false`). **The core is clean; the render
leaks.** ⚠ Distinguish from `hideCount`, which is honest — hiding a numeral while drawing the
*given* beads is legitimate (the core comment says "the child counts + derives"). Drawing the
*unknown* is not.

**2. ⭐⭐ `lookAgain` re-poses the WRONG question in 4 of 5 schemas.** Shown on every mismatch in
every schema, it reads "how many more does Pim need?" — but `compare-diff` asks about Bo's jar,
`restore` about giving back, `reduce-to-target` about putting back, and `start-unknown` about
**Bo's starting amount, with Pim not in the round at all**. A child who errs is told to answer a
different question, naming an absent character.

**3. ⭐⭐ `qReduce` / `revealReduce` promise a two-person outcome the model never renders.**
"…so **each** has {T}" / "Now **each** can have {n}". `reduce-to-target` renders **only Pim's
jar**; Bo never appears and nothing establishes he has T. The real model is "Pim has 6, bring it
to 4." The "each" is false.

**4. ⭐ `hintZero` is a DEAD STRING** — authored in 7 locales, referenced nowhere (`_tileRow`
always calls `t('hint')`; `hintKey` always returns `'hint'`). Measured: 1 occurrence = the
declaration. The #39 `hintMark` class verbatim.

**5. ⭐ `fairBridge` is a DEAD STRING** — 2 occurrences = the declaration + an nl comment.
`_bridge` hard-codes `'='` / `'?'` / `'+'+u`. Worse: the nl panel deliberated over it in a
committed comment ("eerlijk (story) vs gelijk (fairBridge)") — a native expert spent judgement
on a string that never renders.

**6. ⭐ `qZero` is a redundant duplicate of `qEqualize`** — semantically identical, just without
"beads" and the caps. So round 6 (a=4,b=4,u=0) gives the child no cue that 0 is available. The
`hintZero` that WOULD have cued it is defect 4 — the design intended a zero cue and never wired
it. *(Mechanically it works: tapping 0 seals, because `0 != null` is true in JS.)*

**7. ⭐ `instruction` says "say the kind number" — the child TAPS, and "kind" is ambiguous.**
`hint` says "tap that number"; the only input is a tile tap. And the locales already split on
the meaning: pt/it read *gentle* (`gentil`/`gentile`), de/fr/es/nl read *correct*
(`richtige`/`bon`/`correcto`/`juiste`). A source string that splits its own locales 3–4 is
ambiguous by demonstration.

**8. `qStart` is CORRECT** — checked against the core. `unknown = r + k`; round 4 (k=3, r=4) → 7;
decide renders Bo with 4 + badge "gave 3 away"; reconcile renders 7 with 3 floating in;
`revealStart` says "started with 7". Consistent. *(Minor: the reveal animates beads arriving
while the story says he gave them away — it rewinds the event. Defensible; sv copy must say
**"hade från början"**, never imply he received them.)*

**9. Missing `sv` branch in the inline `speak()` fallback.** The `speechSynthesis` ternary has no
sv case → `u.lang` falls to `'en-US'`, an English voice reading Swedish. Siblings
`numbers-court-activity.js`, `comparison-creek-activity.js`, `tally-squirrel-activity.js` all
carry `LANG === 'sv' ? 'sv-SE'`. Also the mismatch utterance is a hard-coded per-locale ternary
with no sv branch → **Swedish children would hear the English words "look again"**. And
`numWord()` has no `WORDS_SV` → falls back to `String(n)`, speaking the digit.

**10. Minor source inconsistency:** `revealCompare` fr ships "Bravo !" while this very file's it
comment warns "⚠ never «Bravo/Brava» = genders the child". Not a Swedish problem; reported for
the source set.

---

## RULING 5 — Swedish lexical rulings and traps

- jar = **burk** (⚠ never *kruka* = flowerpot, *vas*, *krus*). `glasburk` if glass is wanted.
- beads = **pärlor** (en-word: *en pärla, pärlan, pärlor, pärlorna*).
- ⚠⚠ **"lika många", never "lika mycket"** — pärlor are countable. The likeliest single error a
  translator makes from English "the same".
- fair = **rättvist** (adj. *rättvis*). ⚠ never **jämnt** (= *even*, as in even numbers —
  actively confusing in a maths activity); never bare *lika* as a predicate.
- ⚠ English uses "MORE" for **both** `qEqualize` and `qCompare`; Swedish must split them:
  - `qCompare` (difference) → **"Hur många fler pärlor har Bo?"**
  - `qEqualize` (add-to) → **"Hur många till behöver Pim för att få lika många som Bo?"**
  Using *fler* for both makes two different thinkings sound identical.
- **1 = "ett"** (räkneordet spoken alone), not *en* — same class as the de *eins* / nl *één*
  notes already in the file. `WORDS_SV`: noll, ett, två, tre, fyra, fem, sex, sju, åtta, nio,
  tio, elva, tolv.
- **Pim/Bo: keep** (cross-locale, nl precedent). **Bo is a genuine Swedish male given name**, so
  it reads naturally. ⚠ *bo* is also the verb "to live" and the noun "nest", but sentence-initial
  "Bo gav bort tre" is unambiguous.
- `tapCheck` must name the **actual** shell button: `lcs-shell.js` sv `check` = **"Kontrollera"**
  → *"Tryck på Kontrollera!"* ⚠ not *Klar*, not *Nästa* (sv `next` = "Nästa").
- `fairIs` "fair = {n}" → *"rättvist = 4"* is stilted → **"ska bli 4"** or **"lika: 4"**.
- `had` → **"hade {n}"**; `gaveAway` → **"gav bort {k}"**.
- praise: **"Just det!" / "Precis!"** — ⚠ never *"Duktig!"* (praises the child, not the work,
  and inflects).

---

## VETOES

1. ❌ Any sv title/slug containing **"det saknade talet"** — the sibling owns it verbatim.
2. ❌ **"lika mycket"** for the beads; ❌ **"jämnt"** for fair.
3. ❌ Shipping sv while `restore` still draws the ghost beads (defect 1). A Swedish teacher who
   notices the answer is countable on screen will not trust the rest of the page. Per the
   standing rule — fix it, do not file it.
4. ❌ Paying a native panel to author **`hintZero`** and **`fairBridge`** into Swedish while they
   are dead. Either wire them in the same commit or strike them from the sv authoring brief.
   The nl panel was already made to deliberate over `fairBridge`.

## UNCERTAINTIES stated plainly

- The strand ruling is a judgement call at ~75–80%, not a certainty. Both Lgr22 bullets are
  genuinely live; the `?` on the bridge is real counter-evidence. **Keeping `Algebra` is
  defensible** and the operator may reasonably prefer it if discoverability under
  "algebra-förberedande" matters more than describing what the child does.
- The sv-landing corroboration is partly absence-by-construction (the landing program's sv
  strand set may never have offered Algebra).
- I did not read the Skolverket kommentarmaterial PDF directly (image-only); the
  "streck, tomma rutor" gloss comes from a search summary of it, not from my own read.
