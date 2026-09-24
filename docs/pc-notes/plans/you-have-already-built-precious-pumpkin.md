# sv #21 — `tense` (L.1.1.e): verb tenses, rebuilt for Lgr22

## Context

"Continue" is sv #21: `tense`, de commit `1b00767b`. Each round shows a sentence with a TIME WORD and
a blank and the child taps which of three verb forms fits, while a clock tower lights one of three
windows. Ships in en/de/fr/es/pt/it/nl; never in Swedish.

This is not a fan-out. **Swedish cannot express a unique future verb form in a single clause**, so the
activity as designed marks correct Swedish wrong — and the surrounding survey turned up a family
defect across 16 activities and a gate that validates one pool in seven. Everything below is measured.

---

## ⭐⭐ 1. THE RULING — Swedish presens IS the ordinary future, and the fix is the response, not the grammar

`isAnswer` (`tense-core.js:28`) accepts exactly one chip; anything else is `_nonConf[tense] = 1`
(`tense-activity.js:283`) — the chip dims **permanently for that round** and a red `.miss` line fires.
Under *i morgon*, **`seglar` is not merely acceptable but the unmarked Swedish future**, so a child
tapping it has their correct Swedish greyed out and locked. The pedagogue's words: *that teaches a
seven-year-old to distrust their own språkkänsla exactly where their instinct is right.*

The leak is one cell, mapped: only (future × presens) is broken; *i går*+`seglar` and *just nu*+`ska
segla` both grade correctly.

**Options ruled out, each on evidence:**
- **Accept it** — no. The page would claim to teach Swedish grammar while its grading encodes a false
  statement about Swedish.
- **Swap futurum → perfekt** — no, and it would make the CCSS anchor a lie: perfekt is not a third
  point on a timeline (preteritum and perfekt are both past; the contrast is aspect), its cues are not
  time adverbials, and it is åk 4–6 work. L.1.1.e says *past, present and future*.
- **Find a frame where presens is odd** — the pedagogue tested prediction, intention, distant,
  involuntary, negation, question, *snart*, *om en stund*, and the INVERTED task (pick the time word).
  **None escapes**, because `presens ∈ {nutid, framtid}` inherently.
- ⚠ **Use presens as the future chip** — structurally impossible, and I verified it:
  `facts.formsDistinct` requires three distinct strings, so `{present:'seglar', future:'seglar'}`
  returns **false**. The future must be `ska`/`kommer att` + infinitiv.

**THE FIX — a third response class, in the activity layer:** on a future round, tapping the presens
chip is answered *"Ja, så säger man också! Men leta efter formen som bara betyder framtid."* — affirming,
not a red nudge, and it does **not** resolve the round.
⚠ Not "accept both as correct": if presens resolved, the child would never meet `ska rita` at all and
the activity would fail to teach the construction it exists for.
- **0 lines to `tense-core.js`.** `isAnswer` untouched; `facts.exactlyOneCorrect` stays true, because
  exactly one chip still resolves. **The gate stays honest instead of being loosened** — that is the
  difference between this and moving a threshold.
- ~10 activity-layer lines + one string, **guarded on per-round DATA (`"alsoOk": ["present"]`), not on
  `LANG === 'sv'`** — so **da and no inherit it for free**, and they have the identical property.

---

## ⚠ 2. The English sentence frame is UNGRAMMATICAL in Swedish (V2)

`tense-activity.js:45` is `'"{tw}, {subj} ___."'` → *"I går, båtarna ___"*. Swedish is V2: a fronted
adverbial forces the finite verb second. de dodged this with a subject-first question shape and nl
copied it — but for Swedish there is a better answer that keeps a real sentence on screen:

> **`{subj} ___ {tw}.`** — *Båtarna **seglade** i går. · Ankorna **simmar** just nu. · Eleverna **ska
> rita** i morgon.*

⚠ And it is the **only** frame that works, for a structural reason: with the adverbial fronted, the
two-word future chip would have to straddle the subject (*I morgon **ska** eleverna **rita***), so
dropping it into one contiguous slot yields *I morgon ska rita eleverna*. Trailing adverbial keeps the
blank a single slot for all three chips. Consequently `timeWord` is lowercase and two words:
**`i går` / `just nu` / `i morgon`** (*just nu*, not bare *nu*, because *Nu ska grodorna hoppa* reads
as a prospective and would open a second leak).

---

## ⚠ 3. Yesterday's severe defect is a FAMILY defect — 16 activities

The sv#20 critic found `.pl-line-msg` fixed at `.88rem` with no clamp, so the sentence doing the
teaching was the smallest text on screen at projection width. `tense` has it verbatim (`.tn-line-msg`,
`.9rem`) — same template. Censused: **16 activities** carry a fixed-size feedback line (affix,
author-purpose, contraction, halfway-harbors, line-plot, maple-bakery, picture-story, point-of-view,
pronoun, seriation, skipcount, story-spine, **tense**, two-tales, wobble-museum, wordclass) and **15**
carry the mascot-drift structure.

⭐ **The gate cannot see it: visual-qa's NOT-TINY floor is 14px ABSOLUTE, and 14px clears it. A floor
cannot see an inverted hierarchy.**

**Instrument — and my first design would have been vacuous, which is the point.** The obvious rule
("the live region must not be smaller than `.lcs-activity-progress-label`") fails: the critic measured
x-HEIGHT (7.0 vs 7.5) and the label is UPPERCASE, so at `.88rem` the nudge is a 14px font against a
~11px label and **a font-size comparison PASSES the exact defect it exists for.** So gate the property
that actually failed: **`SCALE` — an `[aria-live]` region inside the stage whose computed font-size is
IDENTICAL at 360 and at 1024 is a defect**, because the card grows 342→720px and it does not. Narrow to
the live region on purpose (a blanket rule would condemn hoppers' legitimately small tick numerals —
the ban-too-wide trap). Applicability measured: **40 of 133 activities create an `[aria-live]` region.**

---

## ⚠ 4. The gate validates one pool in seven, and nobody extended it for a reason

`verify-tense-core.js:50` reads `params.rounds` only; `local-test-tense.js:48` is hard-coded
`?lang=en`. So 54 localized rounds are checked for **nothing** — not distinct forms, not the ≥7 floor,
not the 3/3/3 balance, not `irregularCount ≥ 1`, not the forbidden-key scan — while the gate prints
`PASS — 9 round(s)`, seven locales into the fan-out.

⚠⚠ **And the naive extension is worse here than in plural.** Two of the core's per-round facts are
English-only. Measured across all seven pools:

| | en | de | fr | es | pt | it | nl |
|---|---|---|---|---|---|---|---|
| `futureWellFormed` (`/^will\s/`) | 9/9 | **0/9** | **0/9** | **0/9** | **0/9** | **0/9** | **0/9** |

A naive extension reports **54 failures of which zero are real**. `formsDistinct`,
`exactlyOneCorrect`, the balance/variety floors and derived-not-stored are universal;
`futureWellFormed` and `presentIsBare` are English morphology and stay EN-scoped. (⚠ `presentIsBare`
passes the other six by luck; for Swedish the real hazard it half-gestures at is **deponens** —
*hoppas, trivs, finns* — a different rule with the same surface shape.)

---

## ⚠ 5. English-source defects Swedish must not inherit — all verified in source

- ⭐ **The clock tower is not drawn.** `about[0]` and `page_intro.en` have Juniper *"tending a clock
  tower"*; the renderer builds three flat `.tn-win` cards and a robin SVG, and **the only occurrence
  of "tower" in the file is its own docblock comment at line 8.** The copy inherited the design
  narrative rather than the screen. Same class as Pearl being a moon.
- ⭐ **`nFuture` names a token, not a time** — *"pick the word with \"will\""* (de *mit ‚werden'*, nl
  *met 'zullen'*). ⚠ **In Swedish that would be actively false**: it teaches framtid = the word *ska*,
  which is precisely the misconception §1 exists to prevent. Swedish says *"visar framtid"* and never
  names the auxiliary. es/pt/it/fr already say "the future form".
- ⭐ **The nudges hard-code the time word** and `_nudge` keys on `round.time`, never `round.timeWord`,
  so a round with a different time word silently lies. **6 of 7 locales are exposed; fr is the only
  one that interpolates.** Swedish uses the fr pattern.
- ⭐ **The read-aloud button omits the answers in 4 of 7 locales.** Measured: en/pt/it read all three
  forms; **de, fr, es, nl read only the subject and time word** — so a non-reading child presses
  *Vorlesen* and hears a question with no options. Swedish follows en/pt/it.
- ⭐ **`howToPlay[2]` describes a check that cannot exist and a retry the code forbids** — the shell
  Check is hidden until the answer is already right, and a wrong chip is **permanently** dimmed.
  **Verified consequence: with three chips and permanent dimming, two wrong taps leave exactly one
  live chip and it is the answer by elimination.**
- `practices[2]` claims *"Forming"* on a tap-to-recognise task (the Dutch dev comment gets this right,
  so the code knows better than the prose); `about[0]` misattributes verbs across rounds and misquotes
  its own prompt; **English is the only locale claiming Grade 1** — six panels independently said 2;
  `strings.q` is still missing `es`; **de and fr screen-reader users are never told which window is
  lit** while es/pt/it/nl are; `page_intro.en` is 315 chars (nl 421, it 523).

⚠ **Lexicon fences.** In the shipped sv catalogue **`form` reads as a geometric SHAPE** in 5 of its 6
occurrences, so an in-activity *"Vilken form passar?"* reads as geometry — use **`verbform`**. ⛔ No
`klocka`/`klockan`/`klocktorn`/`timme`: four Swedish clock activities and two tools own that for a
different subject. Quotes are `”…”` (U+201D twice).

---

## The build

**Rulings.** Window labels **Dåtid / Nutid / Framtid** (everyday — *futurum* would imply Swedish has a
future tense form, the very misconception at issue; this puts sv with en/nl, not with de/fr/es/pt/it).
Nine rounds, 3/3/3, nine distinct verbs, **3 strong** (sova→sov, sjunga→sjöng, springa→sprang) because
*"jag springade"* is the real åk-1/2 over-generalisation and the gate requires `irregularCount ≥ 1`.
⚠ No deponens; ⚠ **no `gå`** — its presens `går` would sit next to the time word *i går*. Future
auxiliary **`ska`** (shorter, child-frequent, parallel to de *werden*). **Grade åk 2** → add `sv: '2'`
to `GRADE_OVERRIDE` (`page.tsx:81`), or Swedish renders Årskurs 1, which all six locales rejected.
Strand: `Language → sv` **already exists**, 0 lines.

**Files.** `mini tools/tense-activity.js` (`WIN_LABELS.sv`, `L.sv`, the `alsoOk` branch + `nAlsoOk`,
`strings` sv + the missing `es`, the Hear-it sv arm reading all three forms, the `_srMirror` sv arm
naming the lit window) · `mini tools/tense-activities.json` (`roundsL10n.sv` + slug/title/intro) ·
`tense-activity.html` `?v=N+1` · `frontend/messages/activity-content/sv.json` (**80 → 81**) ·
`page.tsx` (wrapper bump + `sv:'2'`) · `scripts/verify-tense-core.js` (walk every pool, EN-scoped
predicates) · `scripts/local-test-tense.js` (the sv leak gate; it is hard-coded to `en` today) ·
`scripts/visual-qa-phases/tense.past-present-future.l-1-1-e.js` (NEW).
**0 lines** to `tense-core.js`, `lcs-shell.{js,css}`, Direction-A CSS.
⚠ `frontend/public/mini-tools/` is a stale gitignored copy that resolves FIRST — never edit it.

**Commits, in order:** (A) the shared `tense` defects — sr-order + gate scope + the four-locale
read-aloud gap; (B) the 16-activity family fix + the `SCALE` gate; (C) the sv #21 build. If (B) proves
larger than it looks it ships alone and does not block (C).

---

## Verification — the §A.13.62 definition of done

1. `node --check`; `JSON.parse` the manifest and `sv.json`.
2. **Parity over all 7 surfaces, brace-walked, each poisoned separately** — the check must NAME each.
3. `verify-tense-core.js` walking every pool with EN predicates EN-scoped — poison it against the
   unchanged file AND against a synthetic broken sv round · `local-test-tense.js` + the sv gate,
   carrying every prior lesson: probes from **`en` alone**; consecutive-run needles; **drive every
   state** (question / wrong tap / **the `alsoOk` tap** / resolve); round probes **from the manifest on
   disk**; a **reachability** check; and the **English-marker** check, since `WIN_LABELS.sv` and
   `nAlsoOk` have no shared-key twin to probe against.
   ⚠ Add a gate asserting **≤1 distinct `timeWord` per (locale, time)** — six locales' nudges quote it
   literally and nothing checks it.
4. `verify-activity-content-sv.js` → **81** · serp-copy · prose-claims · preflight-activity-routes.
5. `tsc --noEmit` — read **tsc's own exit status**; 7 pre-existing blog-test errors are the baseline.
6. `visual-qa-activity.js` with a new phase driver, **en baseline then sv** (screenshots now carry the
   locale, so an en run no longer overwrites sv evidence).
7. **I read the sv 768, 1024 and 360 renders myself**, then the visual critic, **and I wait for its
   verdict before reporting done.**
8. `git diff --name-only` shows only the files above; commit with explicit paths.

**Pushed, NOT deployed.** Then the record, `NEXT` → sv #22, and `MEMORY.md` via the script that
**measures and refuses to write if it would go over**.

**Filed separately, not folded in:** `scripts/worksheet-gen/types/g2/G2-275-word-classes.js` declares
`L.1.1.e` in its header and ships in Swedish — the code is double-claimed and the printable's claim is
the wrong one (a word-class sorter is L.1.1.b). One-line hygiene fix. Also: four sv `page_intro`s and
four cohort `about` blocks still carry `utan konto` / `direkt i webbläsaren` access claims.
