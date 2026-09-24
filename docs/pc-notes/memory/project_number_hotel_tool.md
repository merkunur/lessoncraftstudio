---
name: project_number_hotel_tool
description: "TOOL #49 The Number Hotel — build record; a pedagogy panel ruled DO NOT BUILD and I built it anyway, and an interaction panel found a bug in the model that became the best thing in it"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-10T05:29:47.922Z
---

**TOOL #49 `number-hotel` — THE NUMBER HOTEL, live in all eleven locales, 2026-08-10.**
Commits `4c51d0e9` → `de7676d5`. TOOL_KEYS 51→52, wrapper **7.84**, category `number`, ordinal
**#49**, `PREV='counting-cups'`. **live-verify 154/154 on production.** v5 catalog entry #5, one of
that batch's three named heroes.

**The object:** rooms **0-99 on ten corridors 0-9**, so **the corridor number IS the tens digit**.
Three moves and they are all different: **walk** +1 (refused at both ends), **elevator** +10 (never
touches the door position), **stairs** — the only move that changes BOTH digits, existing at exactly
two places on a corridor. At room 49 the walk is refused, the elevator goes to 59, the stairs go to
50. **That is the whole tool in three lines.**

## ⚖️ A PEDAGOGY PANEL RULED **DO NOT BUILD** (3-1) AND I BUILT IT ANYWAY
Its reasons were fair: v5 #6 The Number Drum takes the boundary *mechanically* ("forced beats
forbidden"); ⭐ **"there is no decision"**; and it could not write the five-minute routine.
⚠ **A panel saying "build something else" is not authority to build something else** — that is
#47's failure in an expert's coat. Redefining the deliverable is the operator's call. The verdict is
recorded in the file header next to the fence so the argument survives, not just the outcome.
⭐ **But its real objection was correct and changed the design.** As pitched there was no decision.
**THE REPAIR: the rooms are only numbered on the corridor you are standing in** — physically true of
a hotel, and it makes the elevator land the class somewhere they must SAY before they can read it.
⚠ Verified it is NOT `number-talk-easel`'s curtain (a ~3s TIMED FLASH hiding a QUANTITY); this hides
the DERIVABLE, with no flash and no clock.

## ⭐⭐ THE INTERACTION PANEL FOUND A BUG IN THE MODEL, AND THE FIX IS THE TOOL
**49 —elevator→ 59. NOT 50.** The elevator preserves the ones digit, so it cannot be the escape from
the dead end — escaping it is exactly the move that changes both digits. The catalog said
*stairwell*; I had read it as the lift and welded two moves onto one part.
⭐ **The stairs climb up AND ALL THE WAY BACK to door 0 — and that leg is THE CARRY.** One step of
counting costs a journey back to the start of a new corridor, which is precisely what 9→0 costs.

## ⚠⚠ THE CATALOG SPEC WAS INTERNALLY INCONSISTENT, AND FIXING IT WAS THE DESIGN
"rooms 1-100" cannot coexist with "you cannot walk from 49 to 50" — on 1-100 those are the same
floor. **0-99 is forced, and it is the thesis arriving:** the corridor number IS the tens digit, "the
shaft ticks the tens digit" becomes literally true, and the largest numeral is two digits so no
condensation hack exists. **No 1-100 toggle** — a setting that lets a teacher put the tool in the
state where its own thesis is false is #46's comb.

## ⭐ THE FENCE, AND WHAT READING THE SOURCE MYSELF CHANGED
An adversarial sweep concluded **"the remainder is one visual assertion, not a tool"** — number-sieve
owns a 10-wide 1-100 field AND states this tool's thesis in prose (`:676-679`); choral-counting ships
"tens climb" with Tint-the-tens in 11 locales; jump-tens machine-gates `onesUnchanged`;
parking-tower owns tower/building/skyline/floor/level by declaration at `build-plan.js:77`; and
`counting-cups` claimed the same dread hours earlier.
⭐ **Reading the three load-bearing files directly SHARPENED the gap and DOWNGRADED one collision:**
`number-sieve._fieldKey` guards only `next < 1 || next > max` — a bound on the whole field, not a
row, so ArrowRight at 10 lands on 11 with no event; and `connect-sequence`'s `isDecadeCross` is a
round-VALIDATION predicate, not a child-facing wall. **So: the numbered field wraps silently, the
blank mat refuses to wrap but means nothing by it, and nobody refuses to wrap ON a numbered field.**

## ⭐⭐ THE ART PANEL'S PARTING GIFT: DEAD MOTION CONSTANTS
It found that **`exchange-machine.js:197-203` ships FIVE motion constants no call site reads** — a
ceremony documented and never implemented, made to look shipped by the named-constants convention.
**This file had THREE of its own.** `T_ARRIVE` deleted, `T_WALK` wired, `MIN_FEATURE` consumed by the
gate that enforces it, and **verify L11 now proves every named constant reaches a call site**.

## ⭐ NATIVE PANELS FOUND NINE DEFECTS IN MY ENGLISH, FOUR OF THEM LIVE BUGS
- ⚠⚠ **Rooms 0 and 99 announced an escape that does not exist** — both `canWalkRight` and
  `canStairs` false, yet the refusal promised the stairs, and **`newState()` starts at room 0**.
- ⚠⚠ **`shaftLabel` and `stairsBtn` were DEAD STRINGS** — and shaftLabel is the only name for the
  indicator, i.e. the tool's central claim had no accessible name.
- ⚠⚠ **The walk and the stairs animated NOTHING** — `_paint` branched only on 'ride' and 'refuse',
  so the leg the docblock calls "THE CARRY" was a freeze-then-jump.
- `gateBody` contradicted `sheetNote`; `saidArrive` was byte-identical to `saidWalk`.
⭐ **And one panel MEASURED a false alarm from two others**: both reported the instruction says
"lift"; every `lift` in the file is a comment describing the fixed defect in past tense.
**Agreement is not confirmation.**

## ⚠ NOUN TRAPS ONLY NATIVES COULD SEE
**da+no cannot use `gang` — `at gange` is TO MULTIPLY** (`gangetabellen` = the times table), a
head-on collision in a maths tool. sv cannot use `gång` (definite = *the occasion*). **fr `couloir`
is owned by unroll-tape** (my brief said it was free). **pt `andar` is BOTH "to walk" and the banned
noun "storey"**, so the walk VERB is unusable → "dar um passo". it `piano` is the banned floor AND
the plan name. ⭐ **fi is the one locale that wants "ON the corridor"** (adessive) where Dutch and
Scandinavian want "IN" — that string must never be harmonised.

## Gates
`verify` **3,515 assertions ENUMERATING the whole 100-room space** against its own re-derived oracle ·
`mutate` **34/34 killed**, control green, 0 harness faults — ⚠ two "survivors" were **equivalent
mutations**, not holes (a nudge inside a mutator cannot reach the caller because `_st` returns a
fresh object; the gate now asserts that guarantee) · `preflight-tool-registration` 52/52 ·
**live-verify 154/154**. **0 lines to `lcs-shell.{js,css}` or any protected core.**

⚠ **Registration defects caught before shipping, both recorded ones:** the clever `tool-content.ts`
regex again did 2 of 4 (now four explicit anchors + verification); and **the register script's log
said "7.83 → 7.83" while writing 7.84** — #40's defect verbatim.

Related: [[project_counting_cups_tool]] · [[feedback_a_naming_note_is_not_a_design_ban]] ·
[[feedback_native_panels_read_the_model]] · [[feedback_agreement_between_panels_is_not_confirmation]]
