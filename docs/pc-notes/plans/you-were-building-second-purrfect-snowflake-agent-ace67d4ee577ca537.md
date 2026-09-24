# sv #24 — `pronoun.case.l-1-1-d` — Swedish pedagogue ruling (consultation, no code written)

Grounded against: `mini tools/pronoun-core.js`, `pronoun-activity.js`, `pronoun-activities.json`,
`sentence-builder-activities.json` (sv pool), `hattie-whose-is-it-activity.js`,
`REFERENCE TRANSLATIONS/image-vocabulary.js` (sv gender codes), `memory/project_sv_secondbatch_fanout.md`.

## Q1 — ÅRSKURS: **åk 2**
- Dutch premise transfers (no case burden, orally acquired ~3–4); Dutch *conclusion* does not:
  nl anchored "not groep 3, the decoding year" → the structural equivalent in Sweden is **åk 1**
  (7-year-olds, decoding year) → therefore **åk 2**, not åk 1.
- Sibling ladder is unanimous: sv#20 plural åk 2, sv#21 tense åk 2, sv#23 sentence-builder åk 2.
- sv#23 already ships the en/ett contrast (8× `En …`, 1× `Ett vitt får`) at åk 2. A min/mitt deck
  placed at åk 1 would INVERT that ladder.
- åk 3 is a German *case-morphology* placement Sweden cannot import.
- ⚠ Lgr22 svenska åk 1–3 names NO ordklass. Ordklasser/ordböjning appear in åk 4–6. So this is
  functional språkkänsla, not metalanguage — "pronomen" must stay in parent prose only.
- ⚠ Repo has NO Swedish language-arts kursplan text (recorded sv#20). Extract the Lgr22 PDF before
  committing copy — the #23 precedent caught an SVA/svenska column merge.

## Q2 — TEACHING POINT: **(c) possessive agreement min/mitt/mina is the content; (a) is the on-ramp; (b) one round at most; (d) REJECTED**

Decisive instrument = the **sv#21 test**: *does the WRONG chip name something a Swede actually says?*
- min/mitt/mina — `*mitt boll` is not Swedish in ANY register. **CLEAN.**
- jag/mig, vi/oss in simple frames — `*Mig sprang` not Swedish. **CLEAN but trivial.**
- han/honom object — **"jag såg han" IS said.** FAILS.
- compound `X och mig` — `mig och X` is said. Borderline; register correction, shame risk.
- de/dem — **both are spoken *dom***. FAILS twice, and see Q3.

⭐ In Swedish the subject/object contrast is either trivially easy or sociolinguistically contested —
there is **no honest middle band**. That is why (a) cannot carry the deck and why (c) is the only
candidate that is non-trivial, uncontested and honestly inside L.1.1.d.

**Consequence the operator must accept:** for sv the two chips are two AGREEMENT forms, not two case
forms. The core's EN-only invariant is bypassed (`pnChips` reads `loc.correct/loc.wrong`), so this is
structurally fine — but **`notePossessive` / `nPossessive` must be rebuilt for agreement, not
ownership.** "Det visar vem något TILLHÖR" is FALSE for a min/mitt round.

### Proposed 9-round sv pool (native panel finalises)
possessive ×6 · subject ×2 · object ×1 — all three `role` values live.
1 `Det här är ___ boll.` min/mitt · 2 `Det här är ___ äpple.` mitt/min · 3 `Där ligger ___ mössa.`
min/mitt · 4 `Det här är ___ paraply.` mitt/min · 5 `Här är ___ vantar.` mina/min ·
6 `Var är ___ skor?` mina/min · 7 `___ springer till kojan.` Jag/Mig · 8 `___ sjunger högt.` Vi/Oss ·
9 `Mamma ropade på ___.` mig/jag

sv genders verified in `image-vocabulary.js`: boll n · mössa(panel) · äpple t · paraply t · vante n ·
sko n. ⚠ The picturable-object vocabulary is dominated by **en**-words; usable child-ownable
**ett**-words are a short list: `äpple, paraply, glas, hopprep, ägg, suddgummi`. (`rep` is taken by
sv#1 Tillys hyllor. `glas`/`glass` is a superb but risky minimal pair — panel call.)

## Q3 — TWO CHIPS: **yes, correct instrument**
Each round needs only 2 of the 3 forms. Nothing recommended needs a third option.
⚠ **`sin/sitt/sina` is excluded on engine grounds, independent of the robin-mirror fence**: it needs a
3-way choice (sin/hans/hennes) AND a discourse context — `Kalle tvättade hans bil` is grammatical,
it just means someone else's car. **Two chips cannot disambiguate it without a picture.**
⚠ **de/dem is disqualified by the code**: `_srMirror` joins the chips and TTS renders both as *dom*,
so a screen-reader child hears two identical options.

## Q4 — CHARACTER: `Sigge`, premise `Sigges koja`
`S-i-g-g-e` — native letters, geminate, åk-2 decodable, warm, no second meaning, no platform
collision (existing sv names: Marigold, Bult, Tore, Kapten Quill, Pip, Hopper, Mätis, Snäckis, Alva,
Tuck, Måna, Ebba, Krumelur, Tilly, Mim, Kurre, Juniper, Lily).
Premise: Sigge has built a **koja** and carries his own things in — everything belongs to Sigge, so
only the FORM varies. Rejected: lost-and-found (owned by `hattie-whose-is-it` L.1.1.b), hat shop
(same), packing/backpack (⚠ `cleo-packing-list` L.1.2.b ships hats/mittens/boots), hylla (sv#1),
burk (sharing-jar), Nalle/Nasse (Nalle Puh IP), Alma/Tilda (one letter from Alva/Tilly).
⚠ `hundkojan` already ships in `frontend/messages/sv.json` — koja alone is idiomatic for a kids' den,
but flag the adjacency to the panel.

## Q5 — ENGLISH SOURCE AUDIT (8 findings)
1. **Circular definitions** — "him when it is done to *him*", "his when it belongs to *him*".
2. **Two Hatties.** `hattie-whose-is-it.possessive.l-1-1-b` is ALSO Hattie, ALSO a lost-and-found,
   ALSO possessives — and a **hedgehog**, while this one is a **hare**. Adjacent standards.
3. **Fused premise** — a lost-and-found returns what is yours; a hat shop sells you a new one.
4. **"Grade 1" is claimed for content that is not Grade 1** — `Sam and I` / `Mom called Sam and me`
   is the classic adult usage error; 5 of 7 locales already override to grade 3.
5. **"its job"** for an animate character.
6. **The intro never names the deck's own best property** — both chips are always forms of the SAME
   word — nor its hardest content (the compounds).
7. **`his` is glossed as ownership only**, but the round pairs `his` against `him`.
8. It would mislead a Swedish build three ways: the "word-hat for its job" metaphor pushes toward a
   CASE deck; the lost-and-found framing pushes toward genitive -s (= L.1.1.b's territory); and
   `notePossessive` would be carried over unchanged and be false.

## Live defects the sv build will hit (measured in `pronoun-activity.js`)
- L235 + L285 blank-filler chain has no `sv` → 🔊 and the sr mirror would say the ENGLISH word
  **"blank"**. L284 chip joiner falls to **" or "**. Three hard-coded English strings shipped to
  Swedish children — same class as sv#23's `EMPTY_SLOT`.
- `hear` lives ONLY in `L`, so adding `sv` to `strings` alone ships an English button (sv#23 finding).
- `strings.title/instruction/q` have no `sv`.
- The localized path never calls `Core.facts()`, so **there is no answer-leak guard on non-EN pools** —
  gate it: no sv sentence may contain `en`/`ett`/`min`/`mitt`/`mina` outside the blank.
- Header still claims "EN-ONLY-by-design"; 7 locales ship.
