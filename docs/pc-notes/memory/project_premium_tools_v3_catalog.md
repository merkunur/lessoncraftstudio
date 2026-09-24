---
name: project_premium_tools_v3_catalog
description: "The ground-up 20-tool catalog (2026-07-30) that replaced the rejected v2 list, plus the six-gate test and the discourse-instrument diagnosis that killed it."
metadata: 
  node_type: memory
  type: project
  originSessionId: 4e6f1f6a-04b7-4b94-93cc-fd9a19ede19e
  modified: 2026-07-30T10:01:47.401Z
---

# Premium Tools **v3** — 20 K-3 teaching instruments, designed ground-up (APPROVED 2026-07-30)

**Supersedes the v2 catalog in [[project_premium_tools_v2_design]].** The v2 build log for tools
#1-#3 (Number Bonds Board, Dictation Desk, Say It Board) is still valid; its *list of 20* is dead.

## ✅ v3 TOOL #1 — Sorting Hoops (`sorting-hoops`, TOOL #30): **LIVE + REGISTERED IN 11 LOCALES**, 2026-07-30.
`95f4f458` corpus · `49984ece` instrument (EN) · `585f8539` locales + registration · `58dbfec8` live-verify. Tool key #33.

Two overlapping hoops on a mat; four regions (A, B, OVERLAP, outside). In "guess my rule" the
teacher sets a hidden rule per hoop and **the HOOP accepts or releases** — nobody judges, so the
teacher can go quiet and watch the reasoning. Released items **stay on the mat outside the ring**
and accumulate as the counter-example set (failure BUILDS the data). **No tell on hover** — the
hoop is silent until you let go, so "do you think it will go in?" is a real question.

**Whitespace verified before a line was written:** attribute hoops / Venn-Carroll sorting /
guess-my-rule are absent from Polypad, Gynzy, Toy Theater, Didax, Math Learning Center, Braining
Camp, ReadWriteThink, Twinkl — **absent even in English** — and absent from this repo (0 hits for
venn / carroll / attribute block / guess my rule / hoop).

**Two item worlds:** 32 drawn Dienes logic blocks (4 shapes × 4 colours × 2 sizes; attributes
exact by construction, so no artwork can contradict a colour rule) + 933 picture cards.
**FREE** = the apparatus, both modes, all blocks, and the **syllable + initial-letter rules** (so
the free tier demonstrates the moat). **PAID** = the six conceptual rules, themes, print.

### PHASE A — the object-attribute corpus (`mini tools/object-attributes.json`, 933 keys)
The platform had **NO semantic attribute data at all**. Six closed enums: `living`
(living/once_living/never_living) · `natural` · `edible` · `moves` (self/moved/**a car is
`moved`**) · `size_band` · `habitat` (**`none` unless it is a creature — a boat is not `water`**).
⚠ **CONCEPTUAL ONLY, BY DESIGN.** Visual attributes come from the drawn blocks, so no tag can be
contradicted by artwork and **no image inspection is needed anywhere**. Language-independent.
Pipeline: `seed-object-attributes.js` (⚠ seeds by **most-specific theme**, not first-theme —
`beach` holds crab AND bucket) → 10 parallel reviewers returning only changes with reasons
(`scripts/object-attributes.changes.txt`, 456 keys / 668 fields) → `merge-` (halts on any unknown
key/field/enum) → `verify-object-attributes.js` (**14/14 mutations**). Gate G6 PLAYABLE is the one
that matters: every (field,value) must leave **both sides non-empty** — a rule admitting
everything or nothing cannot be guessed. All 17 split; smallest side 36.

### ⚠ LESSONS (do not relearn)
- **THE FIRST LAYOUT HAD NO VISIBLE OVERLAP.** Three flex siblings rendered as one pill in three
  stripes — and the overlap IS the pedagogy. Rebuilt as two real intersecting SVG ellipses with
  invisible drop zones over the lenses. **Caught by looking, never by a gate.**
- **THE TRAY NEVER EXERCISED THE LENS.** With two rules set it dealt twelve things of which none
  belonged in the middle. Now buckets by region and deals round-robin; gate S3b measures all four
  regions present (3/3/3/3).
- **A GATE THAT WRITES A FIELD CANNOT THEN CHECK IT.** "premium defaults true" survived mutation
  testing because S9 read `T.premium` at the end, after S2 had set it. Snapshot declared identity
  BEFORE any test runs.
- **ACCIDENTAL ISOLATION IS NOT ISOLATION.** "a block rule leaks into pictures" survived because
  pictures happen to carry no colour field. S2b now feeds a picture a colour and a block a
  syllable count and asserts neither world answers for the other.
- **THE GATE CAUGHT MY OWN INVARIANT, NOT THE DATA:** `moves=self => living` failed on 26 keys,
  all dinosaurs. Extinct animals are `once_living` and certainly moved themselves. Fixed WHAT is
  measured, never the data, never a threshold.
- **SYLLABLE COUNTS COME FROM THE GATED CORPUS**, `approved-words-<locale>.json` (three-source
  agreement) — NOT `vocabulary-phonics.json`, which is ungated and calls English "apple" ONE
  syllable (§20.7). Served slice = `mini tools/syllable-counts.json` via
  `build-syllable-counts.js` (596 da … 837 fi). A key with no gated count is kept OUT of the tray
  under a syllable rule (`_applicable`) — silence, not a guess.
- **AN OR-SHAPED ASSERTION HID A MISSING FEATURE:** the free tier offered only initial-letter and
  the test passed on that alone. Tightened to AND.
- **A "PURE" FUNCTION THAT WRITES INSTANCE STATE ISN'T.** `buildPictures` wrote `this.themeName`
  and exploded outside a browser; returns `{items, themes}` now.
- ⚠ **THE MINI-TOOLS DEPLOY CP MUST INCLUDE `*.json`.** The habitual chain copies only
  `*.html` and `*.js`; the JSON banks ARE served from /var/www/lcs-media/mini-tools/, so a tool
  with a data file 404s its data otherwise.
- ⚠ **A LIVE HARNESS SHARING ONE BROWSER ACROSS 11 LOCALES GAVE A FALSE NEGATIVE** — the 11th page
  reported "iframe never appeared" while the same URL rendered alone. Fresh browser per locale.
- ⚠ **BACKTICKS INSIDE A DOUBLE-QUOTED `node -e` RUN AS COMMAND SUBSTITUTION** and silently
  emptied a test's message argument into a syntax error. Third time this class has cost time —
  use the Edit tool for anything containing backticks or backslashes.

**Gates:** `verify-sorting-hoops.js` 12 invariants, satisfies() total over 76,235 (rule × item)
pairs + hostile inputs, **25/25 mutations** via `HP_TOOL_DIR` · `local-test-` **72 assertions, 0
failed** (real pointer drags into all four regions measured in the DOM, release-is-not-loss as an
invariant count, no-tell DOM comparison, rule absent before reveal, §A.13.62 sweep with resting
FITTING at desktop 780/1000 and 810/900) · `live-verify-` **11/11 rendered** · 0 lines to
lcs-shell or any protected core.

Native slugs: sorting-hoops · sortierreifen · cerceaux-de-tri · cerchi-per-classificare ·
aros-para-clasificar · arcos-de-classificacao · sorteerhoepels · sorteringsringar ·
sorteringsringe · sorteringsringer · lajitteluvanteet.

**Remaining:** the ten non-EN string sets are builder drafts awaiting the native 3-agent ensembles
(§A.13.48); [NSR-FLAG] sv/da/no/fi. **NEXT in the v3 build order: L3 Vowel Switch.**

## ✅ v3 TOOL #2 — Number Balance (`number-balance`, TOOL #31): **LIVE + REGISTERED IN 11 LOCALES**, 2026-07-30.
`cb71c9a6` instrument (EN) · `75835851` locales + registration · `ca39f0c5` live-verify. Tool key #34.

A beam on a fulcrum, a pan each end; a pan is worth the sum of its tiles; level only when both
sides are worth the same. Attacks the most documented arithmetic misconception in the world:
children read `=` as "and here comes the answer", so `8 = 3 + 5` looks backwards and most K-2
children complete `3 + 5 = _ + 2` with 8.

**Three inventions:** (1) **THE TIP IS ANALOG and it is the only feedback** — near-miss 2.8°, wild
miss 16.9°; an error signal a six-year-old can act on with no verdict in it. (2) **HOLD** freezes
the beam so the class predicts before it settles (the Easel's curtain applied to equality).
(3) **Notation follows the beam** — level `=`, tipped `>`/`<` at the heavier side; off by default,
as are the pan totals (if the totals show, the child computes and the beam has nothing to say).
Plus the **cloth** over a pan, where the lean is an honest clue not a leak.

**FREE** = the whole apparatus, both levers, tiles 1-10. **PAID** = tiles to 20, print.
Slugs: number-balance · zahlenwaage · balance-des-nombres · bilancia-dei-numeri ·
balanza-numerica · balanca-numerica · getallenbalans · talvag · talvagt · tallvekt · lukuvaaka.

**⚠ THE MOAT IS `equalsFrame` AND IT IS NOT A TRANSLATION** — the canonical spoken equals-sign
phrase per locale, verified live: de **"4 und 3 ist gleich 7"** (never *gibt*, the read-aloud trap
that plants the misconception) · nl "is evenveel als" · fi "on yhtä paljon kuin" · sv "är lika
med" · da "er lig med" · no "er lik". Exposed via a teacher-invoked **"Say it out loud"** lever —
never automatic, because speaking it the moment the beam goes level would make level a prize.

**Reuse:** beam physics copied as a PATTERN from `measurement-bench.js` (`balanceAngle` :777,
`_panAnchor` :994, `_runBalance` :1163) — **it is a standalone tool, NOT a core, so zero blast
radius**. Zero lines imported. Drag follows `sort-bins-core.js:350-435` as a pattern.

### ⚠ LESSONS (do not relearn)
- **THE PANS FLOATED BESIDE THE BEAM.** First pass placed each pan AT its anchor; it read as two
  boxes near a see-saw and the captions collided with the arm. Pans HANG: anchor moves with the
  beam, rope is always vertical (gravity does not rotate), pan sits ROPE below. Side names became
  aria-only — a real balance has no labels on its pans. **Caught by looking.**
- **A FORBIDDEN CHARACTER MUST BE CHECKED IN ITS ESCAPE SPELLING.** A `≠` smuggled in as
  `≠` passed the literal scan (not the character) AND the runtime scan (hid behind a
  threshold the scan never reached). Third instance of this class — Say It Board's flag was the
  first. **Check literal + escape + runtime, all three.**
- **MONOTONE IS NOT ENOUGH — a signal must be VISIBLE.** With `k=900` every angle stayed under
  half a degree: still strictly monotone, completely invisible. The gate now has an ABSOLUTE
  floor (wild ≥8°, near ≥0.8°), not a relative one.
- **A DEAD-STRING DETECTOR CAN BE BOTH TOO NARROW AND TOO WIDE.** Narrow (literal-only) gave ten
  false positives that buried the one real dead string — which was the moat. Wide (every quoted
  token inside `api.t(...)`) then read the comparison operand in `api.t(side === 'left' ? …)` as a
  key. Take only what api.t consumes: whole argument, or a branch after `?`/`:`.
  **And the moat strings are now ERRORS if unwired, never warnings.**
- **A LYING BROWSER TEST:** the cloth check searched the WHOLE PAGE for the hidden number, which
  the tray always shows — it could never fail. Scoped to the covered pan, with a control proving
  it can fail. ⚠ Then the control itself tripped on a coincidence (the other pan's total was
  2+4=**6**, the digit under test) — **choose fixtures so the control cannot collide.**
- the fence regex was hyphen-only; `judge_balance_core` walked past it. Separator- and case-blind.

**Gates:** `verify-number-balance.js` 12 invariants, level-iff-equal exhaustive over 3,721 pairs,
**34/34 mutations** via `NBAL_TOOL_DIR` · `local-test-` **49 assertions, 0 failed** (analog claim
measured on the rendered SVG transform, HOLD, cloth, notation, sweep FITTING at desktop) ·
`live-verify-` **11/11 rendered** · 0 lines to lcs-shell, measurement-bench, either balance core.

## ⚠ CATALOG CORRECTION 2026-07-30 — L3 VOWEL SWITCH IS DEAD; Array & Equal Groups promoted (11 literacy / 9 maths)

**Do not re-propose Vowel Switch.** Refuted by measurement before a line was written:
- **Four locales where it does not apply.** es/pt have no phonemic vowel length; **it**'s real
  contrast is consonant gemination (pala/palla), not vowels; **fr** vowel length is not a K-2
  curricular contrast.
- **en is occupied by a shipped twin**: `cvc-builder-core.js` carries `prefill` + `lockPrefilled`
  with the comment `magic-e: ["k","i","t",null]`, a `.cvc-prefill` state that gilds the magic-e
  tile, and `speakBlend()`; **`cvc-builder.build-magic-e.rf-1-3-silent-e` (RF.1.3) is live.**
- It would have named eleven languages and honestly served ~six — the Say It Board failure mode in
  a new costume. **Replacement: Array & Equal Groups** (multiplication AND division from one
  picture; Toy Theater has an array but no equal-groups). Split is now **11 literacy / 9 maths**,
  stated honestly rather than forcing a thin literacy tool to preserve 12/8.

### ⚠ THE DATA FLOOR — a finding that reshapes the literacy half
`chunks` in `approved-words-<locale>.json` **means different things per locale**: grapheme-level
segmentation exists only for **de, nl, sv, da, no** (the five with `chunk-tables/`); the other six
carry **syllable splits only**. So a one-grapheme-apart word-ladder derivation over en/fi/Romance
actually measures syllable differences between long nouns (`acorn→actor`), not ladders. Restricted
to genuine K-2 short words: **nl 81-word chain; de 6, sv 5, no 7; en/fr/it/es/pt/fi zero** (their
1-syllable words have chunk-length 1). Also: `vocabulary-phonics.json` has `onset`/`rime`/`vs`/`wf`
**English-only**; non-EN locales carry only `syl`/`pat`/`lc` (+ an unreliable `cmp`).

**The literacy twelve therefore split in two:**
- **Buildable now** (teacher-typed text or the image library only): L1 Sentence Builder · L4 Story
  Map · L7 Shared Reading Easel · L8 Morning Message · L10 Question Builder · L12 The Window.
- **Blocked on a per-locale word-data commission**: L2 Word Ladder · L5 Meaning Rail · L6
  Morphology Machine · L9 Word Breaker · L11 Word Sort. → **Scope that corpus as its own piece of
  work, exactly as the object-attribute corpus was.** The maths tools need almost no data at all,
  which is why M4 was pulled forward.

## Why v2 was rejected — the diagnosis, which is the durable part

The operator rejected **Say It Board** (#29, shipped `8bfe53a3`, **stays live** — "don't remove
it") as nowhere near **Number Talk Easel · Rekenrek · Learning Clock · Story Line · Fraction
Kitchen**, and ordered 20 designed from scratch.

**Root cause: v2 was generated from TEACHER PAIN POINTS** (prep time, EAL support,
differentiation, transitions). The five gold tools are not pain-point tools — they are
**curriculum instruments**: the apparatus a teacher stands at the front and teaches *from*, in a
named routine, repeatedly, all year.

**⭐ The property v2 missed entirely, found by reading all five in source:**

> **Each of the five manufactures a CONVERSATION and deliberately withholds the answer to create
> the vacuum the conversation fills.** Number Talk Easel's real payload is five sentence stems +
> "FEEDBACK: NONE — no right/wrong, ever". Rekenrek's half-cover IS a question. Fraction Kitchen:
> "a neutral observation line, **then the tool waits**."
>
> **The five are DISCOURSE INSTRUMENTS with a manipulable body. Weak tools are ANSWER-DELIVERY
> DEVICES** — the chime rings, the name is drawn, the word is spoken, and nothing is left to say.

Say It Board is an answer-delivery device by construction (tap → speaks → over). Scored on the new
test it is **2/6**. Polish cannot fix a tool that fails gate 5.

## THE TEST — six gates, all six or it is not a tool

1. **APPARATUS** — a manipulable body modelling the *idea itself*, not a container for content.
2. **NAMED ROUTINE, REPEATED** — every K-3 teacher in that strand, daily/weekly, all year.
3. **VISIBLE ABSTRACTION** — move something, the maths or the language *changes*.
4. **MATERIAL PUSHES BACK** — resistance in the material; the tool never judges.
5. ⭐ **MANUFACTURES A CONVERSATION** — **if tapping it ENDS the interaction, it is disqualified.**
6. **WHITESPACE** — verified absent/poor across Polypad · Gynzy · Toy Theater · Didax · Math
   Learning Center · Braining Camp · ReadWriteThink · Twinkl.

Plus each must name **THE INVENTION** (not in the wooden version, not in any competitor — cf. the
curtain / one-push drag / honey arc / positional connectives / wobble-back) and **THE MOAT**.

**New standing DoD line for every tool:** before shipping, state in one sentence *what the class
talks about while using it*. If the answer is "nothing, it just tells them," it is not finished.

## ⚠ Market facts (verified 2026-07-30 — do NOT re-derive)

**COMMODITY, excluded by operator ruling ("whitespace only"):** geoboard (Toy Theater/MLC/Didax),
pattern blocks (MLC), tangram (Polypad), 3D solids+nets (Polypad), fraction wall + fractions on a
number line (most saturated concept checked), hundred chart (4 suites). Digitising the classroom
cupboard is largely **already done** and free.

**The moat is real but narrower than "11 languages" — state it precisely:** Polypad is the only
free multilingual competitor and its localisation is **chrome-deep** — 26 UI languages but an
English-only content library under every locale prefix, **no TTS in any language**, `/da/` `/no/`
`/fi/` all 404, no national-curriculum alignment, and real mistranslations in Swedish tile labels.
Gynzy has 13 locales but is paid (€499-9,999/yr) and has no Finnish. Toy Theater owns the only
serious literacy manipulative set and is **structurally** English-only: *word families, digraphs
and silent-e do not translate — they must be rebuilt per language.*

**→ THESIS: build the instruments that CANNOT BE TRANSLATED INTO EXISTENCE.** Where the content
*is* the language, an English-first vendor must rebuild eleven times; we already own the asset
stack (vocabulary with gender+plural, `approved-words-<locale>.json`, per-locale syllable/chunk
tables, native audio, 11 school rulings, national frameworks).

**Unresolved (client-side JS, could not be fetched — re-check before building against them):**
Polypad number-grid masking, auto face/edge/vertex count, array builder, unit-square tiling,
fractional number-line labels. None of the 20 depends on these.

## The 20 (12 literacy / 8 maths, per operator ruling)

**Literacy:** L1 Sentence Builder (word order; reads itself aloud in the order built) · L2 Word
Ladder (one tile per rung; non-word wobbles back) · L3 Vowel Switch · L4 Story Map (built during
the read-aloud; empty slots are questions) · L5 Meaning Rail (gradient) · L6 Morphology Machine
(pictures merge as words merge; it will say *Schuhhand*) · L7 Shared Reading Easel (phrase scoops;
prosody heard appearing) · L8 Morning Message (11 school rulings) · L9 Word Breaker (multisyllabic)
· L10 Question Builder (statement→question as a movement) · L11 Word Sort (open sort; tool never
names the pattern) · L12 The Window (inference + notice-and-wonder from one body).

**Maths:** M1 Story Problem Stage (CGI; acted, then the question; 3 number sets = differentiation
with zero prep) · M2 Sorting Hoops (hidden rule; a rejected item is information) · M3 Class Graph
(votes → picture graph → same data re-forms as a bar graph) · M4 Equation Balance (analog tip) ·
M5 Comparison Bars (the gap is a liftable object) · M6 Mirror Bench · M7 Counting Collections ·
M8 Strategy Wall (2-4 live mini-manipulatives side by side — only we own what it embeds).

**Strongest four:** M2 · L3 · L1 · M1. **Build order: M2 → L3 → L2 → M1**, one per plan-mode
session, registration INSIDE each build commit.

**Runners-up, deliberately out:** Number of the Day (good but paid at Gynzy), Array & Equal Groups
(poor not absent), Area Tiling, Position & Direction, Rhyme Bench.

**Cancelled-4 ruling (2026-07-30):** class graph + sentence builder are **BACK ON**, redesigned to
this bar. sound-wall and decodable-sentences stay dead.

**Why L3 Vowel Switch is the moat showcase:** one instrument, eleven genuinely different lessons —
EN magic-e (hat→hate) · DE umlaut (Apfel→Äpfel) · NL open/closed syllable (man→mannen vs
maan→manen) · SV/DA/NO consonant-doubling vowel length · FI length (tuli/tuuli/tulli).

Full catalog with per-tool invention/moat/market evidence: the plan file
`C:\Users\rkgen\.claude\plans\i-want-you-to-fuzzy-wave.md`.

## RESUME TRIGGER
Operator says "build the first tool" / names one → do NOT re-research or re-design. EnterPlanMode
for that ONE tool, apply the six gates, name the invention and the moat, build instrument-first,
honour §A.13.62 DoD + §A.13.55 + §A.13.60 + §A.13.42 + §A.13.48, and register per §21 (`TOOL_KEYS`
in BOTH `tool-content.ts` AND `config/live-tool-slugs.ts` — miss the second and all 11 locales
410).


## ✅ v3 TOOL #3 — Pattern Bench (`pattern-bench`, TOOL #32): **LIVE + REGISTERED IN 11 LOCALES**, 2026-07-30.
`fcff5b39` (instrument + all 11 locales + registration in ONE commit). Tool key #35, wrapper 7.45.
Live-verified 11/11 rendered: **99 assertions, 0 failed** (HTTP 200, canonical self, hreflang 12,
JSON-LD, h1 in locale, 12 beads + 2 unit slots mounted inside the iframe, 0 console errors).

M1 from the rebuilt catalog. Fills hole 65-69 — **the patterns strand was entirely EMPTY**.
The activity fence was checked BEFORE a line was written (the discipline the three earlier
deaths bought): `shapeforge.compose` 1.G.A.2 is pattern BLOCKS (trapezoids into a hexagon,
geometry); `star-stitcher` + `choice-board.next-number` are the COUNTING sequence. Neither is
a repeating unit. **Both were false positives — the fence check is what proved it.**

**WHY THE GROUND WAS OPEN (worth reusing as a scouting heuristic):** repeating patterns are
taught daily in K-1 across every European market we serve — Muster fortsetzen, patronen
voortzetten, fortsätta mönster — but **US Common Core barely codes them before 4.OA.C.5**, so
the US-built suites (Polypad/Toy Theater/Didax/Braining Camp) skipped them. *Look for strands
the US standards under-code and our markets teach daily.* Readiness class, no educationalAlignment.

**THE THESIS + the three inventions.** A child who continues red-blue-red-blue has not
necessarily SEEN the pattern — they may just be alternating, a much smaller idea. (1) **THE
PATTERN IS STORED AS ABSTRACT SLOTS; colour/shape/picture are COSTUMES.** Switching costume
*provably* cannot touch the pattern, and the gate asserts the letter sequence is identical
across all three. Transfer made structural rather than encouraged. (2) **THE GAP GOES IN THE
MIDDLE** — a gap at the end is solved by copying the last bead; one in the middle only from
the unit. Covered cells LEAVE THE DOM. (3) **HIDE THE UNIT** — turns "carry it on" into "what
is the part that repeats". No right-answer button: in ABABAB the unit is honestly AB *or* BA,
and the class settles it by rebuilding the strip from each claim.

**FREE** = colours + shapes + every lever. **PAID** = the picture costume + print.
Slugs: pattern-bench · musterwerkstatt · atelier-des-motifs · mesa-de-patrones ·
mesa-de-padroes · banco-dei-ritmi · patroonwerkplaats · monsterverkstaden · monsterbaenken ·
monsterbenken · kuviopaja.

### ⚠ THE ELEVEN ENSEMBLES EARNED THEIR COST — every locale rejected the calque
- **All ten non-EN rejected "bench"**: Musterwerkstatt / Patroonwerkplaats / Mönsterverkstaden /
  Kuviopaja (workshop), because "bench" reads as furniture. Only da/no kept Mønsterbænken/-benken.
- **Each supplied its OWN classroom term for the repeating unit**, which no translation would
  find: de **"der Baustein"** · nl **"de kern"** (the actual NL didactic term) · sv
  **"mönsterdelen"** · fr **"le motif"** — the French panel explicitly **rejected "algorithme"**
  as staffroom vocabulary despite it being the traditional maternelle word · it **"il ritmo"**
  (what infanzia says) · fi "osa, joka toistuu" (rejected the technical "jakso" as too late).
- **es AND pt independently refused "cuentas"/"contas" for the beads** — the word also means
  *sums*, fatal in a maths tool. Both chose "fichas".
- **fi restructured FIVE strings** a literal form would have made ungrammatical (purposive
  clause → niin-clause; a bare "How long?" needs its head noun restored; negative passive chain).
- **da vs no deliberately diverged** on definiteness ("det samme mønster" vs "det samme
  mønsteret") — the cousins do NOT collapse.
- ⚠ **THE ENSEMBLES CANNOT SEE THE PRODUCT LEXICON.** de/da/no/fi each coined a DIFFERENT name
  for the paid plan (Lehrkräfte-Paket, Lærerabonnementet, Opettajan tilaus). The suite already
  ships Lehrer-Paket / Lærerpakken / Opettaja-tilaus. **Grammar is theirs; the product name is
  the suite's — normalise it, or the subscription is called three things in one product.**
  Check `grep -o "unlock:[^}]*}" mini tools/<any-shipped-tool>.js` before authoring gate strings.

### ⚠ LESSONS (do not relearn)
- **A GATE THAT HANGS REPORTS NOTHING.** A mutation removing a clamp made
  `while (unit.length > v) pop()` spin forever on a negative v, and the mutation harness
  wedged instead of recording a kill. Fixed BOTH ways: the tool now uses `slice()` (bounded by
  construction) and `setUnitLength` **clamps instead of rejecting** — a rejecting guard invites
  a future edit to loosen it into the hanging shape; and the harness got `timeout: 20000`.
- **THREE EMPTY STRINGS ARE ALL EQUAL TO EACH OTHER.** The costume-blind assertion —
  the tool's whole thesis — PASSED while the letter row was empty, because `'' === '' === ''`.
  **An identity claim must first prove there was something there to be identical** (`seq.length === 12`).
- **THE HARNESS WASN'T SERVING THE IMAGE LIBRARY**, so the picture costume was twelve BROKEN
  images that still satisfied "an img exists". Caught by LOOKING at the screenshot, not by a
  gate. Now serves `/image-library-webp/` and asserts `naturalWidth > 0` — the check that would
  catch a wrong theme dir.
- **A LOCALE TEST THAT MATCHES ENGLISH UI CHROME IS BLIND IN TEN LOCALES.** The smoke opened the
  settings drawer by `aria-label =~ /setting/i` — English. In the other ten it never opened, so
  two strings were silently absent from the digest *in exactly the locales the digest exists to
  check*. The shell fixes control order [settings][sound][fullscreen][reset], so **index 0 is
  locale-independent**.
- **A DIGEST MUST PRINT THE AUTHORED SET, NOT WHAT HAPPENED TO RENDER.** Printing only rendered
  text left 8 of 23 strings unreviewed. Now prints all 23 per locale with a seen/unseen mark,
  drives the states that reveal the rest (costume change, hidden unit), and ASSERTS every
  non-gate string rendered.
- **MEASURE AT THE RIGHT MOMENT.** The mount assertions ran *after* the test hid the unit, so
  correct behaviour (0 unit slots) was reported as a defect. Capture resting state BEFORE
  driving states.
- **DEAD STRINGS ARE WHERE THE FEATURES HID** (2nd instance, after Number Balance). Three unused
  strings were not dead copy — they were **the transfer line** (`sameAgain`, the moat), a
  **missing strip-growth control**, and an aria name. All three are now wired; the transfer line
  is a P13 ERROR if unwired, never a warning.
- **THE 320px OVERRUN EXPOSED A COPY DEFECT.** Measuring the stack showed the bar was FOUR rows
  of chips; the culprit was a long "Hide the part that repeats" chip — and the same screen was
  calling one thing both "the part that repeats" and "the unit". Fixed by moving the hide
  control **beside the thing it hides** and settling on one name. 675px → 588px, fits at 320.
- Two eye-only catches no gate had: a **dangling `|` separator** left hanging when the bar
  wrapped on a phone, and the **drawer covering the strip** in a probe screenshot.

**Gates:** `verify-pattern-bench.js` 13 invariants (P1 strip-is-the-unit exhaustive · **P2
costume-blind** · P3/P4 the cover · P5/P6 model · P7 clap silent over a cloth · P8 no verdict ·
P9 fence · P10 identity/exfil · **P11 one shared column template + 44px tap floor** · P12
strings/css · P13 the transfer line), **49/49 mutations** via `PTN_TOOL_DIR` ·
`local-test-` **76 browser assertions** (costume-blind measured on the rendered DOM;
letter-under-bead alignment **0px**; the sweep FITS at every width 320-1366) ·
`smoke-…-locales` **77 assertions x 11** · `live-verify-` **99 assertions, 11/11 rendered** ·
0 lines to lcs-shell or any protected core.



## ✅ v3 TOOL #4 — Reading Easel (`reading-easel`, TOOL #33): **LIVE + REGISTERED IN 11 LOCALES**, 2026-07-30.
`720a62f1` (instrument + all 11 locales + registration in ONE commit). Tool key #36, wrapper 7.46.
Live-verified 11/11 rendered: **99 assertions, 0 failed**.

L1 from the rebuilt catalog. Fills the fluency hole. One line of text, projector-large; tap the
gap between two words and a scoop joins them; then hear the line read twice — **like a robot**
(a break after every word) and **in your scoops**.

**⚠ THE POSITIONING IS THE PRODUCT: THE MARKET TIMES CHILDREN AND WE NEVER WILL.** Fluency is the
one strand the whole market gamifies (words-per-minute, stopwatch, score) and that is the part of
fluency that is NOT reading. The opening was never "do fluency better" — it was **do the part of
fluency that is not speed: phrasing.** `R6` is a named gate invariant for it. Reusable framing:
*where the market measures the wrong thing loudly, the whitespace is the right thing done quietly.*

**THREE INVENTIONS.** (1) **The scoops ALWAYS partition the line** — the model is a set of BOUNDARY
indices, so overlaps and gaps are *unrepresentable* rather than prevented (proven exhaustively over
127 boundary sets). (2) **Two readings of the SAME WORDS** — strip the separators and both are the
line verbatim. (3) **Scoop-by-scoop on the teacher's tap** — audio/visual sync BY CONSTRUCTION.

**FREE** = the easel, your own typed line, 3 starter lines, scooping, all three readings.
**PAID** = the full 8-line library + print. (Follows the `number-talk-easel` precedent: free
routine + one starter, premium library.)

### ⚠ THE AUDIO LAYER — hard facts, verified, reusable for ANY speaking tool
- **`LCSAudio` has NO end event** (`story-line.js:637` says so in a comment) **AND `speak()`
  calls `cancel()` as its first act** (`lcs-shell.js:250`) — so any timer-sequenced chunk is **cut
  off mid-word**. Hence: both readings are ONE utterance; the step-through is tap-driven. **A
  guessed timer is the wrong mechanism for anything about prosody.**
- **The pause comes from punctuation inside the utterance.** MEASURED by a throwaway probe BEFORE
  a line of tool code (en + sv agree): robot **1.68-1.76x** the plain line, scooped **1.14-1.17x**
  — a **~1.4s gap on six words**. Unmistakably audible. *De-risk the central claim first; it cost
  ten minutes and it could have killed the design.*
- ⚠ **`type` must be a string LITERAL and the options object must have NO nested braces** — every
  `verify-*.js` regex-scans `/LCSAudio\.speak\(\s*\{[^}]*\}/` then `/type\s*:\s*'([a-z]+)'/`.
  `type: flat ? 'word' : 'ui'` **fails the gate**. Branch outside the call.
- ⚠ **Use `type:'ui'` even for single words, deliberately.** Today the audio inventory is empty so
  everything is TTS; when recorded audio lands, `type:'word'` chunks start hitting the FILE path,
  which has no queue and overlaps on concurrent plays.
- ⚠ **NO VOICE = NO CONTENT.** `LCSAudio` never calls `getVoices()`; a missing voice is **silently
  substituted** (a Finnish line read with German phonology). **This build machine had voices for
  only 2 of 11 locales** (English Windows: 6 en + 1 sv). Copy `hasVoice()` from
  `home-language-bridge.js:214-224` + a 🔇 affordance. Not theoretical.

### ⚠ LESSONS (do not relearn)
- **THE GATE CAUGHT THE REAL BUG, AND IT WAS THE CORE INVARIANT.** When the teacher's line already
  contains a comma, joining with `', '` **doubled it**, and stripping separators could not tell my
  comma from theirs. Fix: the readings are **CHUNK LISTS first, strings second** (compare arrays
  exactly, never re-parse the rendered string), and `joinForSpeech` skips the separator when the
  previous chunk already ends in pause punctuation. *Re-parsing your own output is not a check.*
- **A COMMENT MUST NOT SATISFY A CODE REQUIREMENT** (2nd instance, after the fence). The 🔇 gate
  scanned `SRC`; the glyph also appeared in a comment, so a mutation deleting the real one passed.
  Scan `SRC_NC`.
- ⚠ **PYTHON REWROTE A TOOL FILE AS CRLF** and silently un-anchored every multi-line mutation
  (`open(...,'w')` translates `\n` to `os.linesep`). Symptom: mutations "ANCHOR NOT FOUND" for no
  visible reason. **Never edit repo files through Python text mode** — same class as the bash
  heredoc/backtick traps. Appliers now write LF explicitly.
- **AN ENGLISH-ONLY SWEEP IS STRUCTURALLY BLIND.** German and Dutch chips overran 320px **in four
  locales at once** (715px vs 640) while English fit comfortably. Got its own permanent gate,
  `audit-reading-easel-locale-layout.js`, 11 locales x 6 viewports. **Any tool with authored
  per-locale chips needs this; English fitting proves nothing.**
- **THE RENDER SHOWED WHAT NO GATE COULD:** at rest, before anyone scooped, a full-width arc was
  drawn under the line — the tool asserting "this whole line is one phrase", which violates its own
  refuse-list. Now nothing is drawn until the teacher scoops (and the first tap visibly *does*
  something). Also caught: the step-through highlight rendered as **one box per word with a hole
  between**, saying the opposite of "these words are one group" — the gaps inside a lit group now
  light too, as one band.
- **`speechSynthesis` timings are measurable in headless Chrome** — `onstart`/`onend` on a RAW
  utterance give real durations. Useful for any future prosody claim.
- The dead-string rule paid again: 3 unused strings were a missing feature each (3rd instance).

**Gates:** `verify-reading-easel.js` 13 invariants (R1 partition exhaustive · **R2 same words** ·
R3 the contrast is real · R4 tokeniser total + Unicode + paste-safe · R5 model · **R6 nothing times
a child** · R7 no verdict · R8 speech lock · R9 voice honesty · R10 no innerHTML · R11 fence ·
R12 identity/exfil · R13 strings+starters+css), **59/59 mutations** via `RDE_TOOL_DIR` ·
`local-test-` **68 assertions** (audio spy on all three readings; an injection attempt renders as
text and executes nothing; wrapped groups draw one arc segment per visual row) ·
`smoke-...-locales` **99 x11** · `audit-...-locale-layout` **264** · `live-verify-` **99, 11/11
rendered** · 0 lines to lcs-shell or any protected core.


## ✅ v3 TOOL #5 — Class Graph (`class-graph`, TOOL #34): **LIVE + REGISTERED IN 11 LOCALES**, 2026-07-30.

Commit `f72135a5`. The class answers one question, each child tapping once and adding a child
figure to a column; then the teacher taps and **the columns of children become bars**, and taps
again and they come back. Free-play tool: no `tasks`, no `nextTask`, therefore no CCSS alignment
and no possible same-code collision.

### ⚠ THE FENCE CUT THE TOOL DOWN BEFORE A LINE WAS WRITTEN — the most reusable event so far

The catalog's own one-line description (*the class votes; votes become a picture graph; then a bar
graph*) **would have re-implemented a shipped activity.** The fence found the strand far more
occupied than the catalog assumed:

- `graph-it.bar-graph.2-md-d-10` — tap a column to stack a unit until the bar graph is built, **the
  same verb at the same standard**, plus the graded *how many more?* answer rail.
- `calendar-wall` — a strict 1:1 stacked pictograph **with** most/compare/total prompts; its own
  header calls it *"the K.MD.B.3 → 2.MD.D.10 bridge"*.
- `choice-board.sort-count.k-md-b-3` 11/11 · `chart-count` · `line-plot.read.2-md-d-9`.

**Exactly two things were free**, and the tool is only those two: (1) **the children generate the
data** — nothing else on the platform lets a child originate a datum that lands in a graph
(`calendar-wall`'s unit is a DAY entered by one helper); (2) **the transformation** — nothing
anywhere animates a representation change, `graph-it` has build-tally and build-picture as separate
rounds on separate data. So this tool **never asks a graded question and a child never builds a bar
by tapping.** Boundary stated in the header: calendar-wall = one observation per DAY over a month,
stays a pictograph; Class Graph = one vote per CHILD in one sitting, transforms.

*Durable form: when the fence comes back partially occupied, do not negotiate the overlap — subtract
it and ship only the remainder. The remainder here was smaller than the catalog entry and better.*

### The three inventions

1. **THE BAR IS THE PILE, BY CONSTRUCTION** — the bar is real DOM at `position:absolute;inset:0`
   inside the SAME wrapper as the stamps, and the stamps are never removed, only faded. The height
   is therefore never computed: **the layout answers.** Second instance of the hidden-real-
   destination trick (`place-value-lab.js:2298 .pvl-incoming{visibility:hidden}`). **A probe proved
   it before any tool code:** |bar − pile| = **0px** across 90 columns × 5 viewports × both states,
   lossless over four flips. One `--cgr-unit` variable drives stamp, ruling and the density ladder,
   so nothing can drift apart.
2. **THE DATA IS US** — every figure is one child and all are identical (`estimation-jar`'s
   ANONYMOUS-dot doctrine). The bar is not an example; it is them.
3. **THE NUMERALS ARE BEHIND A CURTAIN** (`number-talk-easel`) — if a numeral is on screen from the
   start, nobody looks at the graph. Compare by LENGTH first; the teacher reveals counts last.

### Refusals, each one gated

No winner, no ranking, no sort — a class survey is a portrait, not a contest — and the ranking ban
is checked **against all eleven locales' own vocabulary**, not English. No timer, no score. No
roster read, no name, nothing persisted. **A repeat tap is indistinguishable from a second child:
that is the honest price of anonymity, not a bug to engineer around.** Votes are an ordered list of
category indices, so *one tap = one vote* and *undo removes exactly one* are true by construction;
`counts()`/`total()` are derived and there is deliberately no `most()`, no `winner()`, no sort.
FREE = 3 categories (1.MD.C.4 is literally "up to three categories"); PAID = 4-6 + print.

### ⚠ THREE ENSEMBLES CORRECTED THE ENGLISH SOURCE, not just their own strings

**German** noticed the privacy line cannot promise *nothing is counted* when counting is precisely
what the class does — **French and Spanish reached the same conclusion independently**, and the
English string was wrong too (fixed to *recorded*; it/pt/da/no/fi aligned). **Dutch refused
`cijfers`** for the numbers because it also means school grades. All eleven panels, unprompted and
unanimously, put the textbook term (*Säulendiagramm · staafdiagram · stapeldiagram · diagramme en
barres · pictograma · pylväsdiagrammi*) in the PROSE and kept it OUT of the child-facing chips.
**Finnish** restructured seven strings, including the vote aria-label, whose `{label}` placeholder
always arrives nominative and cannot take the illative.

### ⚠ LESSONS (do not relearn)

- **`\b` cannot match `_elapsed`** — `_` is a word character, so `\b(elapsed|timer|…)` made the
  no-stopwatch gate blind to the commonest spelling of the thing it was banning. Only mutation
  testing found it. *Third distinct instance of a gate that could never fire.*
- **A `_clone` laundered a smuggled state field away**, so the state-shape gate passed a mutation
  that added one. Read `newState()` directly, never a round-tripped copy.
- **`cleanText` not throwing is not a gate** — `String(null)` is the four characters `"null"`, which
  renders happily.
- **An explicit `height` silently overrides `min-height`** — the ≥44px tap floor was set and then
  cancelled two rules later.
- **Order matters in a gate**: the reveal must be SET before asserting that a new question clears
  it, or the assertion passes on a state that was never true.
- **Reduced motion must COMPRESS, not delete** — `transition:none` removed the transformation, and
  the transformation IS the lesson. `.12s` instead. (Same call as the 13 tools carrying
  `_reducedMotion()`.)
- **The palette shipped red + green** against the locked *never verdict colours* rule; coral had to
  go too, because in this tool coral is already the locked/premium affordance.
- **The string digest caught a mis-wiring no assertion did**: *"Nobody has answered yet"* was
  rendering when there were no CATEGORIES — a state a teacher can barely reach — instead of when
  there are no VOTES, which is how every session starts.
- **The renders showed three things no gate could**: child figures so small they read as dots
  (destroying *one stamp = one child*), bars floating above an axis that sat below the labels
  (fixed with a per-column plinth copied from `calendar-wall`), and a head floating off its body.
- **da/no slugs must fold ø per locale** — house convention is da ø→`oe` (`foelelsestjek`) and
  no ø→`o` (`folelsessjekk`); two locales had been handed the identical slug.

### Gates

`verify-class-graph.js` 13 invariants (view-cannot-write exhaustive · one-tap-one-vote · numeral
curtain · no-ranking incl. 11-locale vocabulary · no-timer · anonymity · immutability · no
innerHTML · fence · exfil · verdict-free palette) · **`mutate-class-graph.js` 54/54 killed** ·
`local-test` **55** browser (the bar measured pixel-exact against the rendered pile at several
counts and both densities, a lossless four-flip cycle, zero digits before reveal, injection in both
question and label) · `smoke-…-locales` **110 ×11** · `audit-…-locale-layout` **264** ·
`live-verify-` **132, 11/11 rendered** · 0 lines to lcs-shell or any protected core.


## 🔴 FIXED + LIVE 2026-07-30 — the Class Graph "Add an answer" DEAD BUTTON (`bc1f1e15`)

The operator reported it. It was dead **by construction**, in every locale, since
the day it shipped — and **five green suites had passed it**.

### The bug

`_buildEditor` added a row by pushing `''` into `setSetup`. `setSetup` DROPS empty
labels on purpose (a blank must never become a column) and **verify C7 asserts that
it does**. So `cats.length` could not grow, `render()` redrew identical rows, and
nothing happened. Root cause: **the editor had no state of its own** — it rebuilt
its rows from `st.cats` every render, which makes an in-progress blank row
*unrepresentable*.

Two worse things hid behind it: `setSetup` also clears `votes`, so adding an answer
mid-session would have silently thrown away the class's whole survey; and `apply()`
checked only the first two boxes, so `['A','','']` committed a one-column survey.

**FIX** = the editor gets a `_draft` `{q, labels}`, seeded on open, discarded on
close. Add/remove edit the DRAFT and re-render — no commit, so votes survive
editing. `apply()` is the one commit point (plus the starter chips, deliberately),
demands **two DISTINCT non-blank** answers, and **if nothing changed it does not
call setSetup at all** — opening the editor to check your wording must not cost a
class its votes.

**FREE_CATS 3 → 4** (operator ruling). Grounded on BOTH standards: 1.MD.C.4 "up to
three categories", 2.MD.D.10 "up to four". Also fixes a bad first touch — the tool
OPENS on three, so at a three-cap the very first affordance in the setup panel was
**locked on arrival** for every signed-out teacher. `gateCats` re-authored ×11
(every frame survived the numeral: de `als`+nom.pl, fi nominative numeral +
partitive singular `neljä vastausta`, sv/da/no neuter `svar`).

### ⭐ THE DURABLE LESSON — why five suites missed it

**We proved every STRING RENDERS and never proved a CONTROL ACTS.** `addCat` even
appeared in the 11-locale smoke digest *marked as rendered*, which reads as
coverage. Model gate, 54/54 mutations, 55 browser assertions, 264 layout
assertions — not one of them clicked the button.

**NEW `scripts/audit-tool-control-liveness.js`** — generic across all v3 tools.
Discovers controls breadth-first (a hand-written list is exactly the thing that
forgets the untested button), replays the click path from a fresh page, and
asserts the world changed (DOM / print / speech / storage). Runs under **three
entitlement states** because this defect was only reachable where the chip
rendered UNLOCKED — a single-state harness could pass forever.

**Poison-tested before being trusted:** with the original handler restored it
FAILS in all three states.

### ⚠ THE GATE NEEDED FOUR FIXES OF ITS OWN — all "fix what is measured", never a threshold

1. **judged per PATH** → 33 false alarms on honest idempotent no-ops ("Show the
   children" when they are showing). Now per **STATE** — which still catches the
   original, because the old chip acted under `free` (raising the gate line) and
   was dead on every path under `premium`. **Collapse the states and the bug walks
   back through.**
2. **called the shell's sound toggle dead** — it swaps an icon and flips
   `aria-pressed`, and a text-only DOM signature sees neither. Signature now reads
   attributes; that is how toggles normally speak.
3. **IT ONLY KNEW HOW TO CLICK** → 137 "dead" controls across the siblings, nearly
   all number-balance tray tiles and sorting-hoops blocks, which are pointer-drag
   for mouse and Enter/Space for keyboard. **A click is the wrong verb for them.**
   Now falls back to the ACCESSIBLE path before condemning — which also proves
   those controls are keyboard-reachable.
4. **its BFS refused to re-test a label deeper** → "Colours" only acts after you
   switch to Shapes, so never trying it deeper guaranteed it looked dead forever.
   **Depth is precisely how an idempotent control reaches a state where it bites.**

Also: bind **port 0**, not a fixed port — two overlapping runs died on EADDRINUSE,
and a gate that cannot run twice at once is a gate people stop running.
`Fullscreen` is the ONE named exemption (`requestFullscreen` is unobservable in a
headless iframe).

### TWO REAL DEFECTS THE SWEEP FOUND IN ALREADY-SHIPPED TOOLS

- **`number-balance` DESTROYED A CHILD'S TILE.** Dragging into a pan already at
  `PAN_MAX`: `removeAt` succeeded, `add` refused, the number **vanished from BOTH
  pans** — and `_say()` still announced it as if it had landed. Now asks before it
  takes, and speaks only what arrived. Proven: old order 19 → 12, fixed 19 → 19,
  normal cross-pan drags unaffected. *Reusable shape: **never remove before you
  know the destination will accept** — a silent clamp downstream turns a move into
  a deletion.*
- **`pattern-bench` leaked the premium costume.** `locked` required
  `premiumKnown`, so during the auth window a free account could switch to the
  picture costume, and when the answer came back free the chip locked but
  `st.medium` did not — the strip kept drawing premium beads forever. **Unknown
  entitlement must be PESSIMISTIC** (as in sorting-hoops/number-balance), and
  locking a control is not enough — reset the STATE it produced.

The latent `if (!token) { … return; }` branch (skips the repaint its three siblings
do) normalised in all three files. **NOT a live bug** — it runs before the first
paint — recorded so nobody "fixes" it as one.

### Sweep result + what was adjudicated, not fixed

class-graph 0 dead · pattern-bench 0 · number-balance 0 · reading-easel 0 ·
**sorting-hoops raises 7, ALL BENIGN**, checked against source not waved through:
"Set the rules" (`sorting-hoops.js:807`) sets `picking='a'` and the only path
reaching it is via "Guess my rule", which already set `picking='a'` at `:605`;
"Clear the mat" at rest has an empty mat. **Left visible rather than allowlisted —
a gate raises candidates and a person adjudicates; an allowlist is where a future
real one would hide.** Filed: "Set the rules" is a cosmetic dead click to a
teacher, worth a guard next time that file is open.

### Gates

`verify` **C14** (the editor edits a draft; commits ONLY in apply + the starters;
add/remove may not commit; apply must demand two answers) · **59/59 mutations**, 5
new and all in the dead-button class · the existing starter-cap mutation had to
move 4 → 5 or the free-cap change would have let it survive silently ·
`local-test` **64** with **L9** (add adds a row 3→4, typing survives it, votes
survive the editor 5→5, one-answer refused) · smoke **110 ×11** · layout **264** ·
number-balance **49** · pattern-bench **76 + 49/49** · **0 lines to lcs-shell** ·
live-verify **132, 11/11** · and a production check signed-out in en/de/fi/es
proving the row really appears (3 → 4) on the real site.


## ✅ v3 TOOL #6 — The Folding Sheet (`folding-sheet`, TOOL #35): **LIVE + REGISTERED IN 11 LOCALES**, 2026-07-30.

Commit `79ba8bec`. Catalog slot M2, renamed from "Mirror Bench" by the operator
once the design moved to the fold. A square of squared paper: children colour
squares, somebody says where they think the mirror is and puts THE CREASE
there, then they FOLD and the paper answers — colour on colour reads as TWO
LAYERS, colour on bare paper as ONE LAYER, two different colours as a third
thing. Free-play tool: no `tasks`, no `nextTask`.

**⭐ THE THESIS: "IS IT SYMMETRIC?" HAS NO ANSWER UNTIL YOU SAY ALONG WHICH
CREASE.** The crease is a CLAIM; the fold is the TEST. Two children put it in
two places, both fold, and the paper settles it. The routine ends on the move
that matters — *"now try the crease somewhere else."*

### ⚠ THE FENCE FOUND A WHOLE SURFACE THE PREVIOUS THREE FENCES HAD MISSED

Interactive side clean: 204 activities + 37 tools, 11 locales, **zero**
symmetry (`robin-mirror` is reflexive PRONOUNS; "halves" everywhere is
fair-shares partitioning; "symmetry" in number-talk-easel is teacher talk about
doubles). **But `scripts/worksheet-gen/` is a SEPARATE ~400-type PRINTABLE
catalog from the 33 REFERENCE APPS**, and it already ships FOUR symmetry types:
`K-063 mirror-images` (**Kindergarten, built and proofed but in NO WAVE**),
`G2-247 line-of-symmetry`, `G2-248 symmetry-pictures` ("the same on both
sides"), `G3-342 lines-of-symmetry`. Three live in all 11 locales.

**ALL FOUR ARE RECOGNITION — circle the answer on a picture somebody else
drew.** So the whitespace is the GENERATIVE half. *Durable: **FENCE THE
PRINTABLE SURFACE TOO**, not just activities + tools. Added to the per-build
discipline.*

### The grade-band ruling, discharged as a gate rather than an argument

`docs/character-art-spec.md:402` records line-symmetry = 4.G.A.3 as "above the
K-2 ceiling, hard-banned", pinned in CI at `shapeforge-core.js:220` +
`verify-shapeforge-core.js:126`. **That ruling is about a GRADED activity's
CCSS tag.** A free-play tool declares no `tasks`/`nextTask` → no
`educationalAlignment` at all → it claims nothing (M14). And it never counts
axes, which is the actual 4.G.A.3 content and belongs to G3-342 → **no locale
string may contain the axis vocabulary or ANY digit (M13)**. Both halves are
`process.exit(1)`, not prose. **L5 carve-out gated too: no letters, ever —
b/d/p/q is Reversal Bench (hole 89) and putting it here would cannibalise it.**

### The model is finite, so the gate EXHAUSTS it

Which is why **the sheet is SQUARE**: all four reflections are then exact
integer index maps. `v`: `(r,c)->(r,2k+1-c)` · `h`: `(r,c)->(2k+1-r,c)` ·
`d`: `(r,c)->(c,r)` · `a`: `(r,c)->(n-1-c,n-1-r)`. **Straight creases live in a
GAP** so they have NO fixed points — which is what makes an off-by-one re-index
DETECTABLE (M4). Diagonals centred-only. An off-centre crease is lossy on
purpose and "it hangs off the edge" is a named state of paper, not an error.

**THE FOLD IS A REFLECTION OF REAL DOM, NOT ARITHMETIC:** the flap is a real
copy of the far half reflected by ONE CSS matrix about the crease, so where it
lands is the layout's own answer. Measured: **0.00px** from its partner at every
viewport and every crease. (class-graph's bar; place-value-lab `pvl-incoming`.)

### ⚠ THE GATE WAS WRONG BEFORE THE TOOL WAS — twice, and the second is the lesson

1. **M9 first asserted commitGhosts ALWAYS yields symmetry.** It does not and
   must not: **GHOSTS COMPLETE, THEY DO NOT CORRECT.** A square painted red
   whose partner is blue has no *missing* partner, so nothing is suggested
   there, and overwriting a child's colour to make the sheet come out right
   would be the tool judging. The honest invariant is an IFF.
2. **⭐ And that IFF was nearly VACUOUS.** On a 4-colour random corpus a
   disagreement is almost always present, so the expected answer is "false"
   almost every time — a mutation corrupting an unrelated cell sailed straight
   through. *(Same class as pattern-bench's "three empty strings are all
   equal".)* Fixed by asserting the direct thing: **commitGhosts may write to
   the suggested squares and to NOTHING the child painted**, plus a
   one-colour half-figure corpus where the IFF is non-trivially TRUE.

Also: `isNear` was untested (a flipped near/far survived); the shell-restyle
grep anchored on `(^|[;}])` and MISSED the real case because the CSS is built
by string concatenation, so an injected rule is preceded by a QUOTE — **read
the selector, don't guess at its neighbour**. One mutation was **provably
inert** (`paint[-1]` is `undefined`, which already fails `!== null`) — *an
inert mutation is not a gate hole, it is a bad mutation; write one that bites.*

### ⚠ FOUR DEFECTS ONLY LOOKING COULD FIND (every measurement green throughout)

- **Folded, the far half sat on screen as a blank white rectangle** — the sheet
  read as BROKEN, not folded. Now clipped exactly at the crease: `inset()` for
  the straight folds, `polygon()` triangles for the diagonals.
- **The two-colour state rendered FLAT.** Setting `style.background` (the
  SHORTHAND) resets `background-image`, and an inline style beats the sheet —
  it silently erased the stripe pattern. **Use `backgroundColor`.**
- **The legend showed "two layers" and "two colours together" as two IDENTICAL
  teal squares.** A legend that cannot tell its own terms apart is worse than
  none. Legend swatches now carry their own state, not the cell classes.
- **⭐ THE DIAGONAL CREASE WAS DRAWN ACROSS THE WRONG CORNER.** A
  `linear-gradient`'s colour bands run **PERPENDICULAR** to its direction, so
  `to bottom right` draws the ANTI-diagonal — the two were swapped, the clip
  was right and the line was a lie.
- Plus: one layer looked different depending on which side the paint started
  on (flap `.62` vs lone cell `.4`) — **the same state must look the same**.

### ⚠ AND ONE ONLY THE 11-LOCALE SWEEP COULD FIND

The legend text shipped at **13px**. `local-test` measured three hand-picked
selectors and never looked at it. It now scans **every text-bearing node** —
*a list of selectors is a list somebody has to remember to extend.*

### The panels corrected ME, not just themselves

- **de**: `Faltblatt` is a **LEAFLET** — the whole panel read the draft title as
  advertising → `Das Faltpapier`. Also rejected `Falz` (bookbinding jargon) and
  `Knick` (damage left AFTER folding) for `die Faltlinie`.
- **nl/fr/es**: all three rejected my verb — *verven / peindre / pintar* is
  painting a WALL → **kleuren / colorier / colorear**.
- **fr**: `deux couches` = nappies → `deux épaisseurs`. Introduced a
  distinction English cannot make: **le miroir** (where it would stand) vs
  **le reflet** (what it shows); es did the same with reflejo.
- **⭐ da AND no independently caught the same false friend: `Lærerplanen` is
  the national CURRICULUM**, so a paywall chip saying it reads as a syllabus
  document → `Lærerabonnementet`. **no** also: `bretten` is a **TRAY**.
- **fi**: `taitos` is a fold already MADE; **`taite` is the LINE** the child
  moves — the whole thesis depends on that word. And the ordinal `cellAria`
  was rejected because the placeholder can only supply a cardinal.
- **it**: `cancellino` is the blackboard duster, not a child's rubber;
  `casella` is a form box → `quadretto`. **pt**: `dobradura` is the origami
  LESSON in a Brazilian school → `vinco` for the mark, `dobrar` for the act.

### The liveness gate learned something too

It refused to run on a new tool with "unknown tool" — a **hardcoded registry**,
the same shape of defect as the registration step that once 410'd a tool in all
eleven locales. It now **DERIVES** each tool's class prefix from the wrapper the
tool builds, so a new tool needs no entry. And `live-verify` moved off
`networkidle2` (a proxy that can never settle on a page with an iframe + fonts;
it timed out on a DIFFERENT locale each run while curl returned 200 in 0.2s)
onto `domcontentloaded` + the real readiness selector, with **one loud retry**
— a silent retry would have been the dishonest fix.

### Gates

`verify-folding-sheet` **16 invariants** incl. ⭐ symmetry ⟺ zero singles proven
EXHAUSTIVELY over all **524,288** states at n=4 · **40/40 mutations killed** ·
`local-test` **63** incl. the 0.00px fold measurement · `smoke` **121 ×11** ·
`audit-…-locale-layout` **264** (11 locales × 6 viewports) ·
`audit-tool-control-liveness` **258/0/0** across 86 controls × 3 entitlement
states · **0 lines to lcs-shell or any protected core** · `live-verify`
**187, 11/11**, which paints and presses Fold in every language rather than
merely checking the page mounts.

### Flagged, not built

- **`K-063 mirror-images` is finished, proofed and in NO WAVE** — a Kindergarten
  symmetry worksheet unpublished while `frontend/messages/en.json:3479` already
  markets "explore symmetry". One wave edit; the operator's call.
- **"Half given, complete it" is the good future ACTIVITY here** — it has a
  right answer, so it belongs on a graded surface, not in a tool that must
  never judge. Deliberately left in the drawer rather than burned.
- `draw-and-color.html:967-977` ships "Mirror Clue Cells" and its blog
  blueprint already claims 4.G.A.3 — unshipped copy for a half-existing
  feature.


Related: [[project_premium_tools_v2_design]] (build log #1-#3; its catalog is dead) ·
[[project_premium_tools_program]] (the closed 26) · [[feedback-visual-qa-container-containment]].
