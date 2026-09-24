---
name: project_the_queue_rejected
description: "TOOL #58 The Queue — rejected by fence and pedagogy 3-0; its content is banned by the house design law, and it produced a live i18n fix plus a CLAUDE.md correction"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-11T05:28:38.994Z
---

**REJECTED 2026-08-11. Not built.** v5 catalog entry 19 (*ordinal numbers — first, second, third;
animals queue at a bus stop, the bus arrives at the OTHER end*). Constants had been measured —
#58 · `PREV='shape-stretcher'` · wrapper 7.92→7.93 · `TOOL_KEYS` 60→61 · prefix `que-` free.

## ⭐⭐ WHY IT CANNOT BE BUILT — the content is what the design law forbids
§23.2: **NO WORDS ON THE APPARATUS.** But **"third" IS a word, and a numeral is CARDINAL.** The mark
that converts a numeral to an ordinal is **locale-specific** — `3.` (de/da/no/fi) · `3rd` (en) ·
`3e` (fr/nl) · `3:e` (sv) · `3.º` (es) · `3º` (pt/it) — so the apparatus would teach a **notation**
while the word is banned and **unspeakable by TTS in 6 of 11 locales**. The pedagogy panel's summary:
**"legible with the sound off, and teaching the wrong thing with the sound off."**
⚠ This is the first commission whose CONTENT and DESIGN LAW were in direct opposition.

## The headline was false, and the mechanism already ships
- **No ordinal standard exists.** Enumerating every K math code returns the complete official 22 —
  `K.CC.A.1-3 · B.4-5 · C.6-7 · K.OA.A.1-5 · K.NBT.A.1 · K.MD.A.1-2 · B.3 · K.G.A.1-3 · B.4-6` —
  none ordinal; none in Grade 1. ⭐ **The house had already ruled it silently: `K-030`/`K-031` ship
  with NO CCSS code at all, alone among K printables.**
- ⭐⭐ **`story-line.js:15-17` already ships the headline mechanism** — *"sequence words attach to
  POSITIONS, not cards, so a jumbled line makes the semantics audibly collide"* — i.e. "everyone's
  ordinal changes at once", live in 11 locales. `K-030` already draws the origin with a start-arrow.
  **Subtracting the overlap leaves ONE GESTURE: the arrow moves to the other end.** A printable
  variant, not an instrument. ⚠ And `arrow-strip.js:178-181` already has `inverseRail`, deliberately
  unwired.
- Direction-dependence is a **convention, not a misconception**; the documented difficulties are the
  cardinal/ordinal conflation and the **suppletive lexicon, irregular at 1-3 in all eleven**.

## ⭐ WHAT THE COMMISSION ACTUALLY PRODUCED — shipped
**`[FIX][I18N]` `K-030-ordinal-circle-nth.js`** hard-coded the badge as `` `${ordinal}.` `` **inside
`build()`**, outside any i18n layer — so an **ENGLISH worksheet printed "3." where English writes
"3rd"**, and six locales got an indicator their language does not use. ⭐ **The generator was already
passing what was needed and the type threw it away**: `render/render-instance.js:22` calls
`build({theme, difficulty, locale}, {rng})` while K-030 destructured only `{theme, difficulty}`.
Now per-locale, **English suppletive and irregular exactly at 1-3** (the range the sheet lives in),
**falling back to ENGLISH not the German stop** — a wrong default should look wrong in the locale
that owns it. Recorded **barred-7 class**: the prose was natively authored, the one glyph carrying
the mathematics was not.
⚠ **Still open:** `K-031` answers into a bare circle, so the child writes a **CARDINAL** numeral for
an **ORDINAL** question in every locale.

## ⚠⚠ CLAUDE.md §20.8 IS STALE — verified with a control
It records **`K.G.A.1 position words` as ASSET-BLOCKED and operator-undecided**. It is not:
`mini tools/place-by-relation-core.js` exists and `parking-tower-activities.json` declares
`K.G.A.1`. **I quoted that stale block in my own plan an hour before measuring it.**

## ⭐ The fence corrected THREE of its own numbers, in the fence where it quoted the rule
It reported fr `file` = 206 (actually **9/0** locale-scoped), es/it/pt `fila` = 70 each (**one
cross-locale figure counted three times**), sv `rad` = 133 (unscoped). Cause: **bounded but NOT
locale-scoped** — grepping all `mini tools/*.js` mixes English identifiers and eleven languages into
one number. **Two method facts to keep:** `key:{en:'…',de:'…'}` is usually ONE LINE so line-prefix
attribution fails; and **word boundaries UNDER-count in compounding languages** — nl `bord` bounded
is 6/4 while `digibord` alone is 112.

**Locale mines found:** ⚠ **sv `kö` → definite `kön` = gender/sex** (and `da.json:368` uses `kønnet`
for grammatical gender three times) — **Norwegian `kø` is clean** since gender is `kjønn`. ⚠ **da
`bag` / no `bak` are the imperative of *to bake***, and `Bagepladen` is already the baking tool.
**FREE in all 11: `bus`, and `stop` in the transport sense** (`Haltestelle`/`arrêt`/`fermata`/
`hållplats`/`holdeplass`/`pysäkki` all zero).

See [[project_shape_stretcher_tool]] · [[project_the_gap_tool]] ·
[[feedback_relay_the_strings_not_the_reasoning]]
