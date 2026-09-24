---
name: project_sv_secondbatch_fanout
description: "Swedish (sv) second-batch activity fan-out — recipe, progress, per-#N log, standing sv doctrine"
metadata: 
  node_type: memory
  type: project
  originSessionId: cfb29625-4aea-4618-8e2c-de1d88dabb3b
  modified: 2026-09-07T18:13:03.064Z
---

## WHERE THE LOOP IS  — read this first

**#1–#35 SHIPPED** (commit + push, **NO deploy**). sv prose = **95**. `ACTIVITY_WRAPPER_VERSION` last at **9.722**.

| | |
|---|---|
| **NEXT** | **#36 = `wren-question-window`** — question words, L.K.1.d, de commit `3696f277` (added a per-activity grade override) |
| trigger | "continue" / "continue building the second batch of the Swedish activities", sent in plan mode |
| routing | **CLAUDE.md §20.9 [ACTIVE — SWEDISH SECOND-BATCH FAN-OUT]** carries the full recipe and every standing trap (repointed from pt-BR at v3.11) |
| plan file | `C:\Users\rkgen\.claude\plans\you-were-building-second-purrfect-snowflake.md` — rewritten per activity |

**The last five, newest first:** #35 `ziggy-odd-one-out` · #34 `roary-roar-meter` · #33 `rusty-yesterday` · #32 `wally-capital-crane` · #31 `robin-mirror`.

⚠ **Find #37 onward the same way:** `git rev-list --all --children | grep ^3696f277` → the child **de** commit → `git show --stat`.

⭐ **What a "continue" session actually costs.** Every engine so far has shipped with the SAME four holes — an English-only
gate, a `?lang=en` local test whose `force()` silently no-ops, no visual-qa phase driver, and a selection painted in the
shell’s try-again ink with no post-Check marking. Retrofitting those is most of the work; the Swedish content is the
smaller half. Budget accordingly and do not treat a green suite as evidence until you have poisoned it.

**The ACTIVE sv loop (started 2026-09-07).** Fan the ~123 EN second-batch lcs-shell activities out to **Swedish**, ONE per plan-mode session, in the SAME #1..#N order as de/nl/it/es/fr/pt. **Rebuild, never translate** — for **Lgr22**, not Common Core. Build LOCAL; **deploy once at the very end** of the whole sv program.

**Baseline at start:** `activity-content/sv.json` prose = **57** (first batch) vs en 194. There were **ZERO** `sv` rows in `GRADE_OVERRIDE` / `STRAND_OVERRIDE` — all 57 run on the auto-map.

**Recipe per "continue":** EnterPlanMode → find the next in order (`git rev-list --all --children | grep ^<prev-de-hash>` → the de child commit → `git show --stat`) → survey the EN engine + manifest + the de/nl prose → **3-agent native Swedish ensemble** (`general-purpose`, NOT Explore): lågstadielärare/pedagogue (grade + strand + terminology, DECISIVE) + content creator (slug/page_title/page_intro/prose) + linguist (in-activity strings). **Hand every panel the English as a SOURCE TO AUDIT** — that is what found the defects below. → ExitPlanMode → build activity-layer ONLY → full §A.13.62 LOCAL DoD → **commit + push, NO deploy, WITHOUT asking** → update this file.

**The 5 activity-layer files:** `mini tools/<engine>-activity.js` (sv string blocks) · `mini tools/<engine>-activities.json` (sv slug/page_title/page_intro; numbers LOCKED) · `mini tools/<engine>-activity.html` (bump `?v=N`) · `frontend/messages/activity-content/sv.json` (Tier-1 prose override) · `frontend/app/[locale]/activities/[slug]/page.tsx` (bump `ACTIVITY_WRAPPER_VERSION`; overrides only on a pedagogue divergence).

## Standing sv doctrine

- Framework name = **Lgr22** (route chip already wired). NEVER "Common Core"/CCSS code in sv-facing text — `verify-activity-content-sv.js` fails on either.
- Grade chips: PK→Förskola · K→**Förskoleklass** · 1→**Årskurs 1** · 2→Årskurs 2 · 3→Årskurs 3. **Sweden runs ~1 year older than the US grade number for the same age**, but the platform's locked Nordic spine still maps **EN Grade 1 → åk 1**. GRADE by SKILL, pedagogue-decisive.
- **Slug folding: å→a, ä→a, ö→o — ONE LETTER FOR ONE LETTER.** Verified across all 57 shipped sv slugs; there is not one `ae`/`oe`. ⚠ Swedish diverges from da (ø→oe) and no (ø→o) here. Grade term in slugs = **`ak-N`** (from åk), never `arskurs-N`.
- **STRAND: keep the auto-map unless a panel proves otherwise.** "Mätning och data" is a calque, not an Lgr22 heading (Lgr22 files measurement under *Geometri* for åk 1–3) — but the 57 shipped sv cards have already trained the reader that **"Lgr22 inom geometri" = shapes** (7 cards, all shapes) while length/time/money says **"inom området mätning"**. A Geometri chip reads as *former* and fractures the ladder. **OPEN, filed:** whether the whole sv M&D family should be re-chipped is a family-wide ruling — do NOT start it from one activity.
- **Choose nouns against the SHIPPED sv lexicon, not against English** (§23.6). Already claimed by shipped sv tools: `snöre` + `spår` (unroll-tape #41) · `remsa` (unit-handle #40 "Enhetsremsan", pattern-bench, number-drum) · `planka`/`stump` (comparison-planks #42) · `räls` (arrow-strip) · `linjal` (ruler, measurement-bench) · `pinne` (name-sticks) · `lina` (story-line).
- ⚠⚠ **CHECK THE DEFINITE FORM OF EVERY NOUN.** `bana` → definite **banan** = *banana*. Write out indef/def singular + plural before committing to any noun.
- **VETO `mät-` in child-facing strings** — Swedish *mäta* promises a number and a unit. Parent-facing prose may use *mätövning/mätning* (house voice). Also veto: `linjal/måttband/tumstock/centimeter` (a graduated tool implies standard units = wrong stage, and *linjal* is owned by the shipped sibling `choice-board.read-ruler.2-md-a-1`); `transitivitet`; `indirekt jämförelse` / `mätbar egenskap` = teacher-facing only.
- Register: **Tryck på** (all 57 cards), never Klicka/Peka. Shell renders Check=**Kontrollera**, Next=Nästa, retry=*Inte än — försök igen!* — so activity nudges must differ from that line. Parent prose addresses **barnet**. No rätt/fel shaming.
- **Genitive of a vowel-final name takes a bare -s: Tillys, never Tilly's** → every sv string is single-quote-safe in JS.
- ⚠ **Swedish gender is en/ett (utrum/neutrum) — never cross-apply another locale's code.** Picking an **ett**-noun makes superlatives uniform (*det längsta X-et*, *lika långt*) but forces a **second colour map** for any attributive splice; an **en**-noun lets the bare citation colour labels drop in unchanged. Decide per engine, and write double-definiteness (`det längsta bandet`) as a FULL LITERAL, never assembled from parts.

## Per-#N log

- **#1 DONE + pushed `3b084340`** — `seriation.compare-length.1-md-a-1` "Tillys hyllor" / slug `jamfora-langder-med-ett-rep-ak-1` (1.MD.A.1 → **Årskurs 1**, NO grade override, NO strand override — the first sv activity, and it opened NEITHER override map). Compare ribbons against a fixed cord. **Nouns: `ett band` + `ett rep`, both neuter** → uniform neuter agreement (the gift Swedish gets that de/it/es each had to engineer a colon-form dodge around). ⚠ `snöre` REJECTED (unroll-tape #41's central noun) → **`rep`** (free; `repa` is a separate paradigm; familiar from hopprep; 5 chars for the pill; and the cord's 45° gradient genuinely reads as rope twist). ⚠ **TWO colour maps**: chips `Röd/Blå/Grön/Gul/Lila/Orange` (utrum citation form), new `COLOR_SR_L` mirror `Rött/Blått/Grönt/Gult/Lila/Orange` (neuter attributive) via `clabelSr()` with a `clabel()` fallback → other 7 locales byte-identical. ⚠ **Title reconciliation:** the pedagogue vetoed `längst bort` (collides with the taught `det längsta`); that veto ALSO killed the linguist's own `Hyllorna långt ifrån varandra` (`långt` vs `lika långt`) → **Tillys hyllor**. Sibling wall that set the grade: 8 sv M&D activities already ship; the ladder is förskoleklass (compare two directly) → **this rung** → åk 2 (read cm off a linjal); `clock.set-clock.1-md-b-3` already sits at Årskurs 1. de #1 = `94e8ec11`, nl #1 = `8cb89b72`. prose 57→58.

- **#2 DONE + pushed `d2e5a7b6`** — `lay-units.measure.1-md-a-2` "Mätis trädgårdsstig" / slug `mata-langd-med-egna-enheter-ak-1` (1.MD.A.2 → **Årskurs 1**, NO grade override, NO strand override). Lay identical units end to end, then count them; 10 rounds / 7 modes. prose 58→59. de #2 = `b08c1c32`, nl #2 = `bf0a7eb4`.
  - **GRADE — Sweden joined en/de/es/fr but on its OWN grounds.** pt/it/nl deferred to their second year because THEIR curricula codify it (BNCC EF02MA16, Indicazioni classe seconda, the NL TAL/SLO meten-leerlijn). **Lgr22 codifies nothing** — åk 1–3 is one undifferentiated block — and Swedish textbooks **front-load**: Favorit matematik 1B / Prima Matematik 1B / Matte Direkt Safari 1B all reach cm + linjal INSIDE year 1. Åk 2 would assert Sweden reaches the ruler later than the CCSS when it reaches it earlier. ⚠ **Never copy another locale's grade — ask what that locale's curriculum CODIFIES.**
  - **STRAND — auto-map kept, second time.** New decisive evidence: "Geometri" is **already a live sv label meaning SHAPES** in shipped page titles ("Geometri i årskurs 1", "Geometri i förskoleklass"). The `data` calque is real and declined — **fixable only arc-wide, never per-card.**
  - ⚠⚠ **CHARACTER RENAME: Inchie → Mätis.** `ch` is not a Swedish grapheme–phoneme correspondence, so an åk-1 child mid-decoding reads *in-sjie*. Verified before accepting: **Tilly was the ONLY named character in the whole 58-entry sv catalogue**, and it was kept precisely because it decodes. **The rule: keep a name that decodes in Swedish, rename one that does not.** Mätis = *mäta* + the productive `-is` suffix (dagis/godis/kompis). ⚠ **Zero genitive** (*Lars bok*): `Mätis trädgårdsstig`, never `Mätis's`. Panels split 2–1 for keeping Inchie — but the two who kept it never ADDRESSED decodability, so it was an unopposed ruling, not an outvoted one.
  - **UNIT NOUN `hjälpare`, chosen MECHANICALLY:** its indefinite plural is IDENTICAL to the singular, so one `sayWin` tail is grammatical for every n=1–10 with no plural branch — the same gift German gets from *Helfer*. ⚠ `mask` rejected: **`masken` is also "the face-mask"** (the `banan` class). `kloss`/`bricka`/`stav`/`kub`/`steg` all TAKEN by shipped sv tools. Gap = **`glipa`** (`springa` rejected — homograph of "to run"). `mätarlarv` = the literal Swedish for inchworm, kept for the LANDING prose as a species reveal (four syllables in a button, and *larv*→*larvigt* = silly).
  - ⚠⚠ **`NUMW.sv` was BUILD-BLOCKING** — `numCount`/`numWin` fall back to the English `WORDS` array while `speak()` is handed `lang:'sv'`, so a Swedish voice reads ENGLISH numerals on every count tap. **Any engine with a NUMW-style table needs its sv row or it silently ships English speech.** Swedish needs the German *eins/ein* split on **two axes**: `count[1]='ett'` (bare numeral) but `win[1]='En'` because *hjälpare* is an **en**-word. **win[1] and the unit noun are locked together.**
  - ⚠ **`sayWin.sv` = 'hjälpare långt!' — neuter `långt` is CORRECT, never "fix" it to `lång`.** Subjectless fragment; the measured objects alternate gender across rounds (*pennan är lång* / *bladet är långt*), so the only form right for all ten is the neuter of the elided *det är*. Both panels reached this independently.

- **#3 DONE + pushed `8c017a28`** — `skipcount.fill.2-nbt-a-2` "Hoppers näckroshopp" / slug `hopprakning-5-10-och-100-ak-2` (2.NBT.A.2 → **Årskurs 2**, NO grade override, NO strand override). A frog crosses a pond on numbered lily pads; fill the blank pad, or say how big each hop is. 11 rounds, steps 5/10/100/−10, max number 400. prose 59→60. de #3 = `4ae6f6d9`.
  - **GRADE — the sv #2 test applied again and gave a DIFFERENT answer.** At #2 the kursplan was silent and the textbooks agreed, so the textbooks decided. Here the kursplan is silent **and the textbooks disagree** (Prima/Safari put 0–1000 in åk 3; Singma 2A and Favorit 2B reach it in åk 2), so the tiebreak fell to (a) what is on screen — *hela hundratal*, the earlier item in all four series, not arbitrary three-digit work — and (b) ⚠ **the shipped sv catalogue's own ceiling**: `place-value.hundreds-tens-and-ones` builds **108–974** at åk 2 and `match-pairs.compare-three-digit-numbers` goes to 1000. A row topping out at 400 cannot sit ABOVE a 974 place-value builder. **Check the catalogue's existing ceiling before ruling a number-range grade.**
  - **STRAND — `Taluppfattning och tals användning`, auto-map.** A genuine Lgr22 heading (unlike the measurement family's calque), and already the sv `byStrand` string for Base-Ten. ⚠ **The pt `Álgebra` override does NOT transfer**: BNCC files recursive sequences as a *named habilidade inside Álgebra*; Lgr22's Algebra heading is an umbrella (*mönster i talföljder*), not an address. Content agrees — `Core.choices` returns the fixed literal `[5,10,100]`, so the child picks *which base-ten step is running*, never generalises a rule.
  - ⭐ **CHARACTER `Hopper` KEPT — the decoding rule's other outcome.** Every grapheme is a native sv correspondence AND it is transparently meaningful (*hoppa* = to hop). **Uniquely, the name NAMES THE MATHEMATICS**, because `hopp` is both the everyday word and the technical term (*hoppräkning*, *10-hopp*). The near-homograph with *hoppar* is an asset: the Swedish agent noun is *hoppare*, so *Hopper* sits one suffix off a job title and reads as a name. ⚠ genitive bare **`Hoppers`**, never `Hopper's`/`Hoppern`.
  - ⭐ **Swedish needs NO narrative/mathematical split.** German split *Sprung* (frog) from *{step}er-Schritte* (maths) because its maths term is a walking word. **Swedish is the opposite case — the hop word IS the technical term.** ⚠ **VETO `steg`**: a walking word AND already spent by `landing-strip`/`lay-units` for *moving a control one notch*, so "varje steg är +10" reads as a button instruction. ⚠ **`talrad` reserved** (it denotes the natural counting sequence) → use **`talföljd`**. ⚠ **`Hur LÅNGT hoppar Hopper?` catalogue-vetoed** — *långt* makes it a LENGTH question and length is owned by sv #1 and #2 → **`Hur stort är varje hopp?`** (`hopp` neuter → `stort`). ⚠ Pads are **`näckros`**, NOT `näckrosblad` — **`blad` is this product's word for a printed sheet in five shipped tools**.
  - **Panel split on the prompt, reconciled:** pedagogue `Räkna med {step}-hopp.` vs linguist `Räkna {step} i taget.` → **took the linguist's for the prompts** (zero agreement surface; nothing shifts between 5, 10 and 100; shipped house lexicon in `estimation-jar`), and **kept `{step}-hopp` in the sr lines, prose, slug and title** so the technical term still appears where the register suits it. ⚠ Wherever `{step}-hopp` is written **the hyphen is load-bearing** — `Räkna med 10 hopp` means *count with ten hops*.
  - Also carried: the hardcoded English `'hops of ' + val` aria-label (the whichstep buttons show a bare `+5/+10/+100`, so it is a speech user's ONLY signal for the sign) → key with en+sv. ⚠ **`api` is not in `_renderScene` scope — use `self._api`**; the repaired gate caught that immediately.

## The dead-gate class is CLOSED (commit `720e4c2e`) — flagged at #1, flagged at #2, fixed at #3

All six siblings carrying `slugKeys.length === 1 && slugKeys[0] === 'en'` were **multi-locale and therefore failing, gating nothing, for months**: `place-value-regroup`, `place-value-regroup-subtract`, `skipcount` (7 locales), `rhyme-shop`, `sound-boxes` (6), `wordclass` (2). ⚠ `skipcount`'s own gate was failing *during its own build*. All replaced with the seriation coherence assertion (every locale in ANY of slug/page_title/page_intro must be in ALL THREE; slugs unique + url-safe; non-vacuity first), all six now pass, poison-tested. `shades` keeps its EN-only assertion — genuinely still EN-only. ⭐ **The repaired skipcount gate earned its keep in the same session**, catching a scope error every other gate passed.

## The backward-nudge defect (commit `853518f1`) — 6 locales told the child to ADD on a descending row

`sc-fill-10-back` runs 60, 50, ?, 30; `_nudge` passes `Math.abs(step)`, so `nFill` — which fires **only on a wrong tap**, reaching precisely the child already lost — said *"keep adding 10"*. Broken in en/fr/es/pt/it/nl; **de survived BY ACCIDENT** (*"immer {s} weiter"*). Each replacement names the **size** of the hop, not an operation (fr *de {s} en {s}* — the file's own doctrine comment already mandated that form; nl *elke sprong is precies {s} groot* — answers `srWhich`'s own question in its words). Verified through the real `_nudge` in all 8 locales: additive verbs 6 → 0. Also fixed `nStep`, direction-committed in en/es/pt/it (*grows/crece/cresce*) — latent, not live, since all whichstep steps are positive.
⚠⚠ **The Dutch ensemble SPOTTED this exact hazard in `nStep` and hardened it, then walked past the identical defect in `nFill`. Seeing a defect class once is not sweeping for it.**

## ⚠⚠ RECORDED FROM #3, NOT FIXED — skipcount does not reliably teach its skill

Both panels found it and I confirmed it by running the real `Core.choices`:
- **6 of 8 `fill` rounds are fully solvable with NO arithmetic** — `choices` returns the two adjacent skip-terms, and with a mid-row blank **those are printed on the neighbouring pads**, so "pick the one not already on a pad" wins. The one round designed to defeat rote chanting (3, 8, 13, 18, 23) is among them.
- **2 of 3 `whichstep` rounds are answerable from the first pad** — `sc-step-5` starts at 5, `sc-step-100` at 100, matching a button numeral exactly.
- **Dim-on-wrong makes it terminal**: 3 choices, permanent dimming → two wrong taps leave one live button.
- ⚠ **The core's own guard looks the wrong way**: `Core.facts.answerNotDisplayed` checks the *answer* is not on a pad and never checks the *distractors*.
Fixing needs `Core.choices` and/or the round data — protected core + 8 locales. **Its own commission.**

## Two fixes that rode with #2 (cross-locale, activity-layer)

- ⭐⭐ **REACHABLE CONTROLS.** `nudgeL`/`nudgeR`/`take` are all `disabled = selected == null` and `setupTask` sets `selected = null` — so in **exactly the four rounds that OPEN with prePlaced helpers** (gaps-ribbon, overlaps-crayon, start-stick, gaps-leaf) the child was told to move a helper while every control that moves one was greyed out, and **no string in any locale names the tap-to-select affordance**. Fixed by selecting the last pre-placed helper — exactly what `_add()` already does for a helper the child just placed. ⚠⚠ **The harness set `a.selected = 3` DIRECTLY, bypassing the selection UI — which is precisely why this shipped unseen.** New assertion reads the RENDERED buttons with non-vacuity checks; poison-tested (fires 8× pre-fix, passes after). **Look for this shape in every engine: a gate that pokes the model instead of the control.**
- **Four hardcoded English aria-labels** (`measuring rail`, `nudge left`, `nudge right`, `measuring choice N`) leaked into every locale — and the nudge buttons are bare ◀ ▶ glyphs, so the aria-label is a speech user's ONLY directional signal. Now keys with en+sv (+it); the other five fall through to en as before.

## The lay-units prompt scandal (commit `b67e3bb5`) — 16 prompts, 5 locales

- **en/de/es named a manipulative that is NOT DRAWN.** `unitKind` is written by `setupTask`/`_add` and **read nowhere**; `_rowSvg` draws the identical worm in all ten rounds. Yet `span-ribbon2` said *cubes/Würfel/cubos* and `gaps-leaf` said *clips/Büroklammern/clips* — while the SAME rounds' `count`/`sayWin` said "helper". fr/pt/it/nl had silently corrected it; en/de/es had not.
- **fr `start-stick` named LA PAILLE (a straw)**, an object this activity never measures. ⚠ The literal `bâton` was ALSO rejected — it collides with the unit `bâtonnet`. Both fr and sv independently landed on **twig** (`brindille` / `kvist`). **ROOT CAUSE: `objectNoun` is set on all 10 rounds and consumed by NOTHING user-facing** — the object name reaches the child through 70 hand-typed strings (10×7) with no resolver and no gate.
- **it `judge-ribbon` was a YES/NO question in front of a three-card pick**; six it rounds had lost their cognitive point (both gap rounds never mentioned the gap; inverse dropped "what changes?"; overlaps stated a placement rule for a round that OPENS with an overlap).
- **it `sayWelcome` said "testa-coda" — in Italian a CAR SPINNING OUT**, not nose-to-tail.
- ⚠ **My own guard caught ME:** I invented the "current" it values for two rounds instead of reading them, and the exact-match guard refused the patch. **Always read the current value from the artefact before writing a replacement.**

## Recorded from #2, not fixed

- The **judge round awards the length straight from the manifest** (`_bloom(r.L)`) with NO counting — contradicting the core docblock's claim that the brute-count cheat is "STRUCTURALLY impossible".
- **judge card 3 carries FIVE units against four** — a child can answer by counting instead of judging placement.
- `sayInverse` is a **dead string in all 7 locales**; `addBig` has no `disabled` guard where `add` does; `judgeMiss` sends the child hunting for a gap foil that does not exist.
- `numWin(1)` breaks agreement in EVERY locale ("One helpers long", "Un aiutanti") — **unreachable**: minimum `L` across all ten rounds is 3.
- ⚠ **Two visual-critic "defects" were HARNESS ARTEFACTS**, refuted by reading the code: the inverse round's small-unit row IS built (`round.inverse.smallWidth`), the harness only captures stage A; and the seedling bar reads empty because every frame is a round-open frame with `bloomCount = 0`. **Verify the measurement before accepting a critic finding.**

## Two fixes that rode with #1 (both cross-locale, both activity-layer)

- **`_srMirror()` now speaks in `_shelfOrder`** — shelves and chips are shuffled independently, so raw manifest order gave a speech user a THIRD sequence contradicting the screen. Zero new strings; no locale can regress.
- **The cord pill sat ON the striped reference bar**, covering its terminal edge — the one pixel the activity turns on. Lifted clear (`bottom:calc(100% + 3px)` + `.sr-cordrow{margin-top:22px}`). ⚠ NOT moved into the label column: that column is `flex:0 0 52px` and *la ficelle* / *o barbante* would overflow it. Found by the visual-critic agent, not by any measuring gate.

## Dead gate repaired (class finding — check the others)

`local-test-seriation.js` asserted the manifest was **EN-only**. False since de #1 (**2026-06-29**) → the harness failed for 2+ months and **six locale fan-outs shipped straight past it**. Replaced with: every locale declared in ANY of slug/page_title/page_intro must be in **ALL THREE**, slugs unique + url-safe. All 3 new assertions poison-tested; control passes. ⚠ **Six sibling harnesses carry the SAME dead assertion and are failing today**: `place-value-regroup`, `place-value-regroup-subtract`, `rhyme-shop`, `skipcount`, `sound-boxes`, `wordclass` (`shades` is still genuinely EN-only, so its assertion is live). **Fix each when next touched.**

## The seriation copy scandal (commit `469eab68`) — and the method that found it

Every panel was handed the English as a **SOURCE TO AUDIT**, not a target. Nine panels independently found that the activity **was sold as teaching ORDERING and never has**: one tap, one superlative per round; `seriation-core.js`'s own header admits the seriation rail was "set aside for clarity". Repaired in all 7 non-sv locales. Four further false-claim classes, all confirmed against code: *"too far apart to lay side by side"* (`_scene()` stacks all three from a common left edge); *hidden / searching / exploring*; *"compare two objects through a third"* (never enacted — even samecord checks ONE ribbon against the cord); *the cord as a measuring instrument* (nl found the same promise hiding in **"aflezen"**, which presupposes a scale). Plus receptive-vs-productive vocabulary overclaims, and de/it/pt naming the ribbon as the tap target when the bars are inert divs. **0 ordering claims remain outside the slugs.**

**OPEN, each recorded, none started:**

1. `slug.en/de/fr` still say order / ordnen / ranger — live URLs, need a redirect map.
2. `strings.title.*` in 7 locales still carries the "faraway" fiction on screen (es "El estante lejano", it "Lo scaffale lontano", nl "Tilly's verre plank", pt "A estante distante"); es/pt `srRef` calls the cord *la medida* / *a medida*. Child-facing runtime strings need per-locale visual re-verification → own commission.
3. **Screen-reader mirror is unanswerable** in longest/shortest (two ribbons both "longer than the cord", asked which is longest) and **gives the answer away** in samecord. Needs relative-to-each-other vocabulary authored in 8 languages.
4. **The cord is decorative in 6 of 9 rounds** (`cordLen` read only in samecord) — a round-data/design question.
5. `alignment.code` 1.MD.A.1 claims a clause the activity does not enact — a product ruling.
6. A child tapping the inert ribbon bar gets no response (only chips have listeners) — an engine affordance question.

(historical, superseded — the live pointer is at the END of this file) NEXT was sv #4 = the de child of `4ae6f6d9` — find it with `git rev-list --all --children | grep ^4ae6f6d9`. sv #1–#3 done (prose 60).

## ⚠ Two self-inflicted traps hit at #3 — both already written down in this repo

1. **`git checkout --` to undo a poison experiment WIPED the entire engine patch.** CLAUDE.md §23.6 records this verbatim ("used to undo a poison experiment, it silently reverted fourteen fixes") and I did it anyway. **Take a file backup and restore from that; never `git checkout` a file with uncommitted work.**
2. **The same `git checkout` rewrote the file to CRLF** (`core.autocrlf`), which silently blinded every multi-line `\n` needle in the patch script — it reported "needle matched 0" on a file that looked correct. **Normalise `\r\n` → `\n` on read in any patch/mutation harness.**
3. ⚠ **`indexOf` returning −1 makes `slice(start, -1)` swallow the rest of the FILE.** My vetoed-term check "found" `Hopper's` inside the sv block — it was the *English* title, pulled in by an unbounded slice. **Bound both ends and fail loudly if either marker is missing.**

---

## sv #4 — `shapeforge.compose.1-g-a-2` — "Mims ljussmedja" (2026-09-07)

Årskurs 1 · strand `Geometri` (both auto-map, no route override) · slug
`satta-ihop-former-med-trianglar-och-romber-ak-1` · sv prose 60 → **61**.

**Lexical rulings, every one MEASURED against the sv corpus before it was locked** —
and two of my own plan's numbers were WRONG until I scoped the measurement to
`sv`-keyed strings only:
- **`verkstad` is CLAIMED** (2×, incl. the site-level heading *"Verkstaden bakom varje
  arbetsblad"*) → title takes **`smedja`** (0 hits). My plan claimed 5 hits; the
  scoped count is 2. The ruling held, the evidence did not.
- **`Vrid` vs `Snurra` — BOTH ship**, and my plan's "Snurra: 0 hits" was simply false
  (12 bare hits). The distinction is what settles it: `Vrid` is the *turn-this-thing*
  label in five tools (baking-tray, number-drum, wodb, build-plan, arrow-strip);
  `Snurra` belongs to shape-stretcher, where it means *spin the whole figure and watch
  nothing change* — the exact wrong connotation for a shard being turned to fit. **`↻ Vrid`.**
- **`kristall`** (0 hits) for the piece. ⚠ NOT `bit/bitar` (106 hits): that root is the
  fraction and baking-tray strands' word for an EQUAL SHARE — the one meaning this
  activity must not borrow. Also rules out the compound `glasbit`.
- **`tak`** for the trapezoid — `trapets` ships once (wodb) but reads as the CIRCUS
  TRAPEZE to a 7-year-old, and all six sibling ensembles independently reframed it.
  **`lykta`** for the parallelogram, **`bjälke`** for the long bar (both 0 hits).
- **`sexhörning`, never `hexagon`** — shipped 20× across 7 files including
  choice-board's own on-screen label. ⚠ `trekant` REJECTED despite shipping once
  (unroll-tape): da/no both use it, but modern Swedish reads it as adult slang.
- `ariaForge` **drops "lantern"**: the English names a lantern on every round, and only
  2 of the 11 rounds are one.

**Folded in (§20.10 / operator's fix-it-automatically rule):** `hexagon` → `sexhörning`
in the 6 sv prose lines that still carried the loanword — two of them in a list that
also said `femhörning`, so one sentence mixed the loan and the native compound, and
`choice-board.shape-id.k-g-a-2`'s prose contradicted its own rendered label.

**Also fixed in shapeforge itself — three visual defects, each MEASURED, all locales:**
1. Placed pieces drew at `fill-opacity:0.5` over the `#243B36` silhouette, compositing
   to `#3F786E` and `#866A48` — **2.35:1 and 2.40:1 against the empty region**, while
   the EMPTY region sat at 9.48:1. Progress whispered; what you had not done shouted.
2. ⭐ **The two shard tints were ISOLUMINANT** (`#5BB5A6` / `#E89A5B` = **1.02:1**) — one
   colour in greyscale, on a projector, or to a red-green colour-deficient child.
   Raising opacity alone would NOT have fixed this. Now `SHARD` (lit, on the dark
   window) and `TRAY` (saturated, on the white chip) are split, because one colour
   cannot be light enough to glow on the board and dark enough to read on the chip.
   Measured after: **4.30 / 7.63 vs empty, 1.80 between the types.**
3. The constant shell headline was **2.4× the size of the actual task**; `.sf-prompt`
   raised to `clamp(15px,4.2vw,21px)/800`.
⚠ Per-cell fills must NEVER gain a stroke — that would draw seam lines across the blank
silhouette and hand the child the decomposition.

**Still open on shapeforge (recorded, needs its own unit):** `named-hexagon` is
byte-identical to `build-hexagon` (the critic measured r4 ≡ r10 pixel-for-pixel at all
three widths, so round 11 replays round 5); the 6-cell hexagon placement cells are
**32×28px at 360 and only 35×30 at 1024**, below the 44px guideline and the project's
own 36px K-2 floor — ⚠ **and `visual-qa` cannot see them, because they are SVG polygons,
not buttons**; the board is a letterbox with 1.9–5.6% ink at 1024; the progress marker
never moves and parks at the finish line; `onramp-rhombus` opens by "forging" a rhombus
out of one rhombus; `substitute-tri` enforces its constraint through the palette rather
than the child's choice; `sayIllegal` is dead in all 7 locales.

---

## sv #5 — `place-value-regroup.add-compose-ten.1-nbt-c-4` — "Tuck gör ett tiotal" (2026-09-07)

**Årskurs 2** (route `GRADE_OVERRIDE` gains `sv:'2'` beside pt/it/nl) · strand
`Taluppfattning och tals användning` (auto-map) · slug
`addition-med-tiotalsovergang-inom-100-ak-2` · sv prose 61 → **62**.

**⚠ TWO NATIVE PANELS CONTRADICTED EACH OTHER AND THE CODE SETTLED IT.** The
pedagogue ruled the button verb `bunta`, citing `place-value-lab`. I read that file:
its **child buttons** are `makeTen sv:'Gör ett tiotal!'` and `breakTen sv:'Växla ett
tiotal'` **in all eleven locales**; `bunta` lives only in its **teacher settings
drawer**, and you bunta *sugrör with a rubber band* — you *växla* tiobasmaterial. The
linguist also caught the collision I had backwards: had this MAKE button said *Växla
ett tiotal* it would have been **byte-identical to the sibling's BREAK button with the
opposite meaning**. Shipped: **`🔁 Gör ett tiotal` / `🔁 Växla ett tiotal`**.

**The årskurs ruling was decided by the site contradicting itself.** `frontend/messages/sv.json:1933`
already tells Swedish visitors *"Övningar för **årskurs 2** … bygger **tvåsiffrig räkning
med tiotalsövergångar**"*. The real Swedish boundary is **inom 20 vs inom 100**, not
with/without regrouping — so the shipped within-20 activity stays åk 1 and this one is
the next year. pt/it/nl had already moved it up.

**Standing sv lexicon added:** ⚠ **`tia` is first a 10-KRONA COIN** — on a mat with no
money a 7-year-old reads it literally; the Lgr22 word is `tiotal`. ⚠ **`minnessiffra` /
`uppställning` are BANNED** on concrete-material pages (the written algorithm — the same
line the Italian panel drew, «fai il cambio» ≠ «il riporto»). ⚠ **`ental`/`tiotal`/
`hundratal` are neuter with ZERO plural** (*ett tiotal, tre tiotal*) — `*tiotaler` is
instantly wrong, so `srMat` needs no numerus machinery. ⚠ never *"gyllene pärlmaterial"*
(Montessori's apparatus); the material is `tiobasmaterial` / `tiostavar` / `enhetskuber`.
**Tuck kept** — decodes as /tɵk/, `ck` forces the short vowel, no homonym; ⚠ genitive is
bare **`Tucks`**, never `Tuck's`.

## Three defects fixed that had nothing to do with Swedish

1. ⭐⭐ **es and nl were speaking ENGLISH to children.** `lockAndCaption` built the spoken
   sum from an inline ternary chain; I enumerated it for all eleven locales and **es and
   nl (both LIVE) spoke "27 plus 5 MAKES 32"** — es with the English operator too. And
   the core's `_srMirror` hardcoded its own `' plus '`/`' minus '` for the **screen
   reader**, so the two channels disagreed in fr/it/pt/es. **Swedish was accidentally
   correct there — *plus* and *minus* ARE Swedish — which is exactly why it kept
   surviving review.** Fixed with ONE shared `_SPOKEN` table read by both channels
   (0 core lines): sv `blir` (both Swedish panels proposed it independently — the
   *becomes* verb that de fills with *macht*, fr *font*, it *fa*), es `más`/`menos`/
   `es igual a` (⚠ the panel rejected the folk form *son* — plural, breaks on a result
   of 1), nl `plus`/`min`/`is`.
2. ⭐ **A SEVENTH dead EN-only gate.** `local-test-place-value-regroup-hundred.js`
   asserted `slugKeys().join() === 'en'` on rows that have shipped 7 locales for months.
   It had been **FAILING**, and nobody ran it. ⚠ My memory said the class was CLOSED at
   `720e4c2e` ("6 harnesses") — **the sweep missed one**. Repaired to the same
   locale-coherence invariant, and its PASS line no longer claims a check it stopped
   making.
3. **7 shipped German strings closed `„` with a straight ASCII `"`.** Found by the
   SWEDISH linguist auditing a locale that is not theirs.

## Two instrument failures worth keeping

⭐⭐ **A CHECK THAT DISAGREES WITH THE BYTES IS THE CHECK THAT IS WRONG.** My first
German-quote scan compared per-line counts of `„` against `“` and reported **CLEAN**. A
raw codepoint read of one string showed U+201E followed by U+0022. I nearly dismissed a
real defect on the strength of my own broken instrument — the mirror image of "verify
the measurement before the defect".

⭐ **The comment-skip filter did not skip comments.** `if (!/:\s*'/.test(line))` was
meant to exclude comments, but the docblock above `lockAndCaption` contains `lang:'en'`,
so it matched and the comment's own `„… makes …"` was rewritten. The recorded fix
(blank out comment spans first, preserving indices) is the only one that works.

⭐ **A manifest's formatting is not a property of the project.** shapeforge's manifest is
hand-formatted compact one-liners where a JSON round-trip would reformat everything;
`place-value-regroup-activities.json` is plain 2-space JSON that round-trips
byte-identically. My text needle assumed the first shape, matched 0, and correctly wrote
nothing. **Check which one you have before choosing the tool.**

## Recorded, NOT fixed — engine design, all seven live locales

- ⭐⭐ **The answer is printed on screen and the machine has already added.** `core:261`
  renders each label as `label + ' (' + n + ')'` — the mat reads **tiotal (2) · ental
  (12)**, and after the bundle **tiotal (3) · ental (2)**, i.e. the answer 32 in reading
  order. `core:125` sets `onesCount = onesOf(a) + b`, so the child never performs 7 + 5.
  **A child who cannot add can pass all eight rounds.** Visible in the shipped renders.
- ⭐⭐ `hintReadTotal` says *"count the blocks"* — undoing the abstraction the bundle just
  created — and is **shared with two subtraction siblings**, where "the total" does not
  exist. (The Swedish refuses both: *"Hur många tiotal och ental har du nu?"*)
- ⭐⭐ `srMat` announces only `{t}` and `{o}`, but 2 of the 4 activities render a
  **hundreds** column — a blind child is never told it exists. Needs `{h}` in 7 locales.
- **No decision is ever asked**: `needsCompose()` is defined, exported and **never
  called**, and all 8 rounds compose.
- **The ten is invisible before the tap** — 12 ones wrap ~9+3, not 5+5+2.
- The `🔁` sits inside the button label, so screen readers announce the emoji first.

### #5 follow-up — the visual critic's three blockers (fixed `d6ecf02a`)

⭐⭐ **THE ONES BOX NEVER SHOWED A TEN**, on an activity whose entire reason to exist is
that ten ones make a ten. The core wraps the ones by `max-width`, so 12 cubes fell
**9+3 at desktop and 7+5 at 360**, rows CENTRED with no column alignment (measured
x-origins: uniform 36px pitch, second row inset 108px) — and **the break moved with the
browser width**, so the same sum looked different on a phone and a tablet. Fixed with a
5-per-row grid in the activity's own stylesheet: 12 reads **5+5+2** at every width, and
two full rows ARE the ten. **The pedagogue and the visual critic named this independently
as the single most valuable change** — neither had seen the other's report.

⭐ **White-on-coral at 2.78:1 on the primary control**, a combination this project had
already banned in writing. House ink `#14322D` on the same coral = 4.96:1.

⚠⚠ **MY OWN FIX SHIPPED A CUT-OFF.** A flat `@media (max-width:400px){margin-top:10px}`
(closing a 2.5px button/mat gap) pushed the `add-compose-hundred` sibling **10px past the
fold at 280** — because that sibling sits at **EXACTLY** the fold there (ctrlBottom 653 =
vh 653, zero slack). Found by sweeping the three SIBLINGS after changing shared CSS, and
isolated by setting the margin to 0 and re-measuring rather than by reasoning about it.
**Changing shared CSS means re-sweeping every activity on that engine, not just the one
you built.**

**Deliberately NOT changed:** the pale/solid cube shading (1.57:1). The semantics are
correct in all 8 rounds, and every way of separating the shades further either pushes the
pale cube toward the paper or changes its hue, breaking the "same material, newly
arrived" reading. **Recorded rather than guessed at** — a critic finding is not an
instruction.

---

## sv #6 — the three place-value-regroup variants (2026-09-07, `ad9b7231`)

`subtract-decompose` · `add-compose-hundred` · `subtract-decompose-hundred`, **all
årskurs 3**, strand `Taluppfattning och tals användning`. sv prose 62 → **65**. The
German chain shipped all three in one commit, so sv did too.

**Årskurs by NUMBER RANGE, not by växling** — inom 20 → inom 100 → inom 1000. That is
why #5 sits at åk 2 *with* a full tiotalsövergång, and these sit at åk 3. All six other
locales had already moved. ⚠ Recorded: **A's arithmetic is åk-2 arithmetic** (342−5 is
42−5 with a spectator hundreds column); it stays at åk 3 because the column is on screen
in all 8 rounds and splitting A from C for the same operation on the same material reads
as an error to a browsing teacher.

⭐⭐ **THE STRINGS #5 WROTE BLIND WERE WRONG, AND ONE WAS MINE.** #5 authored sv for all
16 engine keys because the deferred siblings' shape was known — but nobody had seen them
RUN. Both defects were **two-column assumptions on a three-column mat**: `hintReadTotal`
asked *"Hur många tiotal och ental har du nu?"* with a `hundratal` column on screen, and
`srMat` told a blind child about two of three columns. **Authoring for an artefact you
cannot see is authoring blind, however well the shape is known — re-review it against the
real thing before it ships.**

⚠ **The fix was one step from being a six-locale regression.** `srMat3`/`hintReadTotal3`
carry **sv only**, and both route to the 3-column variant *only for locales that have
one*. An en-only key would have swapped de/fr/es/pt/it/nl's own language for English.
Proven by resolving both keys for all eight locales through the shipped code path.

**The 0-core mechanism, worth reusing:** `srMat` has TWO consumers — the activity's
`_srMirror` override and the core's own `api.announce` — and **both let the core do the
`{t}`/`{o}` replace**, so `_t` returns the 3-column string with **`{h}` already
substituted** and one change fixes both channels with no placeholder leak. Hints do NOT
go through `_t` (the shell calls `api.t(hintKey)` at `lcs-shell.js:877`), so the
3-column hint is chosen in **`hintKey`**, which still receives the tool; all four
dispatch points share one helper.

⭐ **NO STRING MAY STATE HOW MANY TENS ARE ON THE MAT.** The linguist flagged it from
three examples; I measured all eight: **4 rounds have ELEVEN tens, 4 have exactly TEN.**
So *"du har tio tiotal"* would be false half the time — and the same measurement
condemns the **English** intro *"add tens that make MORE THAN ten tens"*, false in 4 of 8.
State the rule, never the board.

⭐ **BOTH panels independently REFUSED to calque "över nollan"** (de *über Null* / nl
*over de nul heen*) — the content creator wrote *"I cannot cite this in Swedish teaching
material; do not ship it on my say-so"* and the pedagogue named the attested handles
`dubbelväxling` / `växla två gånger`. **A panel refusing to invent a term is the panel
working.** ⚠ `hundraplatta`, never `hundratalsplatta` — verified shipped **9×** against
**0**. ⚠ never `hundring` (a 100-krona note), the same trap as `tia`.

⚠ **The longer, more accurate Swedish C title wrapped to THREE lines at 280px**
(`.lcs-title` measured 63px) and pushed the lowest control 14px past the fold. **The
layout gave, not the Swedish** — a ≤300px shrink-only title trim, locale-neutral.

## ⚠⚠ A reporting error of mine, corrected

**I had been reading tsc's status from a trailing `echo`, not from tsc.** In #4 and #5 I
reported "tsc clean" on the strength of the background task's exit code, which came from
`echo "TSC-EXIT=..."` and is always 0. Measured properly, tsc exits 1 on **three
pre-existing blog test files** (`e2e/blog.spec.ts`, `__tests__/blog/{api,seo}.test.ts`,
last touched at `f746169c`) — none in any file I have changed, so the substance stands,
but the claim was never measured. **Read the exit status of the command you care about,
not of the pipeline that printed it.**

## Recorded from the pedagogue, NOT fixed — engine design, all seven locales

- ⭐⭐ **B has no mathematics left in it.** Both addends are multiples of ten, so
  `onesCount` is 0 in all 8 rounds and an empty `ental (0)` column renders eight times;
  `setupTask` performs the addition before the child acts; and the labels print the three
  digits. After the tap, 160+50 reads `(2) (1) (0)` — *"read three numbers, type 210"*.
- ⭐ **The machine performs the take-away too, and the label contradicts it**: for 342−5
  the screen simultaneously says `ental (12)` and shows five of those twelve crossed out.
- **"borrowing" / "carrying" in the English name the WRITTEN algorithm** — the very thing
  the Swedish bans as `minnessiffra`. The EN source is where that ban leaks into every
  locale.
- **Seven of eight locales claim "free"** on these three pages; sv is the only one that
  does not.
- **Swedish order should be B → A → C** (compose before decompose, at every talområde),
  and B is the *easiest* of the three, not the hardest.

---

## sv #7 — `graph-it.bar-graph.2-md-d-10` — "Pips stapelskog" (2026-09-07, `d7dde1ca`)

**Årskurs 2** (no grade override — all seven locales agree) · strand **overridden** to
`Sannolikhet och statistik` · slug `stapeldiagram-lasa-och-bygga-ak-2` · sv prose 65 → **66**.

⭐⭐ **THE STRING SURFACE WAS 31, NOT 9 — I BRIEFED THE PANEL WRONG.** My first
enumeration found only the `strings` table. There are **three**: `strings` (9), **`L`
(16** — the running line, buttons, celebrations, the four after-a-wrong-answer
miss-lines, two screen-reader strings) and **`CAT_L` (6** category nouns that label the
bars AND get substituted into the other two tables' sentences). ⚠ `txt()` and `clabel()`
fall back **per key**, so a half-filled sv table shows English in the gaps *silently*.
**Enumerate every string table before briefing, and assert through the shipped lookup.**

**Strand:** the auto-map `Mätning och data` is a Common-Core calque and the wrong domain
— this activity measures nothing. Lgr22 files *enkla tabeller och diagram* under
**Sannolikhet och statistik**, all six other locales already override, and the site ships
the phrase verbatim. ⚠ The needle matched **twice**: `line-plot.read.2-md-d-9` carries
byte-identical override values and also lacks sv — recorded for its own fan-out.

**Three Swedish-specific traps:**
- **Category labels LOWERCASE** — Swedish lowercases common nouns (as fr/it); de
  capitalises by rule and is right, **nl capitalises and is wrong** (*"Hoeveel meer
  Bladeren dan Bessen?"*). One form serves both bar label and mid-sentence noun.
- **Miss-lines reshaped to `Det finns {ca} {A} och {cb} {B}`** instead of every other
  locale's `{A}: {ca}` opening. Fixes three things at once: no sentence may open with a
  lowercase common noun; `Det finns` is invariant (no verb-agreement trap); and it keeps
  **`bär` out of sentence-initial position, where it reads as the verb *bära*** (to carry).
- **`announceBar` cannot use de/nl's `{label}-stapeln` compound** — a Swedish compound
  takes a **singular** first element (*kottstapeln*, not *kottar-stapeln*) and `{label}`
  is plural. `Stapeln med {label}` sidesteps compounding.
- ⚠ `Sant`/`Falskt`, **not `Rätt`/`Fel`** — in a Swedish classroom *Rätt/Fel* means
  correct/incorrect about the child's own work, which blurs "is this claim true" with
  "did I get it right".

## ⭐⭐ I APPLIED A FIX AND A PANEL REFUTED IT — the most useful thing this round

`missMore` says *"count up from {B}"* — the **label** — so a child is told to count up
from *"Berries"*. de/fr/nl had already corrected it to the number `{cb}`; en/es/pt/it had
not. I made the four match the three.

**The Swedish linguist then showed that the de/fr/nl fix is itself wrong half the time.**
`missMore` is an **ELSE branch** (activity ~line 548) and also serves the **fewer**
rounds, where `{a}` is the SMALLER category (measured: fewer-1 = berry 4 vs leaf 7). So
*"count up from {cb}"* tells the child to count upward from 7 to reach 4. I verified it
at the call site and **reverted my own change**: the English is *vaguely* wrong, the
de/fr/nl fix is *precisely* wrong, and mine would have made four more locales precisely
wrong. A correct string must be **direction-neutral** — a rewording in seven languages,
so panel work, not a token swap. Swedish points at the two bars instead.

**Lesson: matching what other locales did is not the same as being right.** Three native
teams had independently made the same wrong correction, and the majority looked like
evidence.

## Also fixed, all seven locales

The chart's **`aria-label="Bar graph"` was hardcoded English**, so a screen-reader user on
the German, French or Swedish page heard an English phrase while `srCaption` beside it was
properly localised. Now reads `srCaption` — already native everywhere, so no language is
invented. ⚠ Escaped at the seam: there is no `esc()` helper in this file.

## ⚠ A manifest-format lesson, opposite to #6's

`graph-it-activities.json` is **hand-formatted** (slug/page_title are compact one-liners),
so a JSON round-trip reformats the whole file — while `place-value-regroup-activities.json`
is plain 2-space JSON that round-trips byte-identically. **Same question, opposite answer:
assert the round-trip before choosing the tool.** My build script did, faulted, and wrote
nothing.

## Recorded from the panels, NOT fixed

- ⭐ **"take-apart problems" is false** — claimed 5 times across en.json and the manifest;
  no round gives a whole and asks for a part. `more`/`fewer` are comparison.
- ⭐ **`qVerify` says "{x} BEAT {y} by {by}"** on a platform with a hard no-competition
  rule; all six other locales already rewrote it as a plain statement. English is alone.
- **The English miss-lines are ungrammatical** — `{A}` is plural, so *"Leaves has 6"*.
- **The chart has no word labels at all** — bars are identified only by a coloured icon;
  the words appear only in the tally list. Verified in the render.
- **The English calls the bars a "fence" in the maths questions** while `instruction` says
  "bar graph", and `qFix` uses both names in five words.
- **`flower` is authored in six locales and reachable by no round** — and the Italian
  intro promises *"e fiori"*.
- **The shouted capitals** (MORE/FEWER/TOGETHER) and *"a no-counting-pressure activity"*.
- **Three shipped Swedish titles already say "gratis"**, against the trial-only position.


---

# sv #7 FOLLOW-UP — the visual repair commit, and six defects only the RENDER showed

The Swedish copy shipped at `d7dde1ca` and every gate was green. The visual critic then
read the sweep and found the chart had **never scaled**: pixel-identical 250.5 x 71 px at
360, 768 AND 1024, occupying 2.7% of a 786px card. Nine other findings came with it.

## The lessons, in the order they cost the most

- **A MEDIA QUERY ADDS NO SPECIFICITY, SO PLACE IT AFTER THE RULE IT OVERRIDES.** My first
  fix put `@media (min-width:700px){.gi-graph{max-height:168px}}` *before* the base
  `.gi-graph{max-height:112px}` eight lines below. Equal specificity, later wins: the
  `.gi-root` half of the very same query applied and the `.gi-graph` half did not. Every
  gate stayed green and the 1024 render was unchanged. **I found it by reading the render
  and disbelieving my own fix**, then measuring the drawn axis: 251 / 376.6 / 439.3 px
  after, from 250.5 at all three widths before.

- **A QUOTED HEREDOC IN THIS ENVIRONMENT COLLAPSES A DOUBLED BACKSLASH TO A SINGLE ONE.** `lab.split(/\s+/)`
  reached disk as `/s+/`, so every category label split **at the letter s**: `Acorns` ->
  `Acorn` + empty, `svampar` -> empty + `vampar`, `Paddenstoelen` -> `Padden` +
  `toelen`. This is the recorded template-literal `\s` trap arriving through a different
  door, and it bit twice in one session (the second time producing an unterminated
  character class). **Regex-bearing scripts go through the Write tool, never the shell** —
  or are written so they contain no escape to lose (a plain `split(" ")`).

- **`^` IS CMD.EXE'S ESCAPE CHARACTER AND `execSync` USES CMD ON WINDOWS.** `git show
  d7dde1ca^:file` silently became `d7dde1ca:file`, so my parity check compared the sv
  commit **against itself** and reported "added [], expected [sv]" for a locale plainly
  present. Use `~1`.

- **`\s+` INCLUDES NEWLINES.** A greedy indent capture in the leak grep swallowed a
  1219-character blanked docblock, so the closing-brace anchor could never be found: the
  anchor "matched" and the collector returned **0 strings**. Use `[ 	]+`.

- **BLANK COMMENTS WITHOUT DESTROYING LINE STRUCTURE.** `' '.repeat(m.length)` preserves
  indices and flattens newlines, which removed the `
    sv: {` anchor entirely. Replace
  each non-newline character instead.

- **THE NON-VACUITY GUARD IS WHAT SAVED THE LEAK GREP.** It collected 28 of 48 strings and
  said so; a clean "no leaks" over 28 would have looked identical to a real pass. The
  collector was blind because `[^{}]*` stops at the `{ca}` placeholders inside the Swedish
  miss-lines. Three shapes of sv string exist (multi-line block, one-line block, bare
  `sv: '…'`) and each is now counted separately, so a shape that stops matching shows up
  as a number rather than as silence.

- **POISON FOUND MY CCSS BAN COULD NEVER FIRE ON THIS ACTIVITY'S OWN CODE** — I wrote
  `[A-C]` for the cluster letter and the activity is **2.MD.D.10**.

## What actually shipped (all locales — activity layer, 0 core lines)

1. **The chart scales.** Drawn axis 251 -> 376.6 -> 439.3 px; the option thumbnails in the
   match round 144 -> 200 -> 236 px, their internal axis 118.8 -> 204.3. The round whose
   whole point is comparing three charts was previously deciding on 2-2.5px bar segments.
2. **Word labels under every bar, on build and interpret rounds.** ⭐ The nine interpret
   rounds ask *"Hur många fler ekollon än bär?"* over a chart that spelled **nothing** — an
   acorn glyph and a red dot. A child who does not already know the icon could not answer.
   Labels live INSIDE the viewBox, never in an HTML row: `.gi-graph` letterboxes under its
   max-height (element 597px vs painted axis 439px), so percentage-placed HTML would drift.
   Multi-word labels wrap at the most even seam (pt *pinhas de pinheiro*, fr *pommes de
   pin*, es *piñas de pino*), because shrink-to-fit alone rendered pt at **8px** — smaller
   than the chart's own axis numerals.
3. **A real five-gate.** `.gi-tcross` only changed COLOUR — no rotation — so the fifth
   stroke read as four-plus-an-error; and the colour it changed to was **the berry
   category's own red**, in an activity where colour IS the category.
4. **INK on coral, both states.** Enabled was white-on-coral (2.78:1, banned here);
   disabled was `opacity:.45` = 1.58:1, and disabled is the state the child ARRIVES in on
   all nine interpret rounds. Now 4.96:1 and 9.17:1. ⚠ `opacity` fades ink and fill
   together so the ratio collapses however dark the ink is — style the waiting state
   explicitly (pale fill, full-strength ink) rather than fading the active one.
5. **The tally strip stopped impersonating a column legend** (it sat 1.0px from the löv bar
   and drifted from the rest). Now discrete cards — and the decoration switches OFF below
   340px, where the strip already wraps to two rows and cannot be misread anyway, because
   it cost 12px and put the match round 11px past the fold at 280.
6. **Pip restored to the Swedish landing title.** All seven other locales name him; sv was
   the only one that dropped him, so a child arriving from the page had no thread to
   *Pips stapelskog*. The Swedish linguist proposed the line.

## ⚠ The cache-buster has TWO levels and bumping the inner one alone does nothing

`ACTIVITY_WRAPPER_VERSION` busts the **HTML** URL; the `?v=N` inside the html busts the
**JS**. Shipping `?v=12` without bumping the wrapper leaves a cached HTML still asking for
`v=11`, so the fix reaches nobody. 9.686 -> 9.687.

## Probes written for this (scratchpad, poison-tested)

- **label probe** — 8 locales x 3 viewports x 4 rounds; same-BASELINE overlap only (two
  stacked lines of one label share an x-centre by construction, and comparing consecutive
  text nodes flagged nine of those as collisions — a wrong measurement, not a defect).
  Poisoned by forcing the font to 26 units: fires on 87 of 96 states.
- **match probe** — does the drawn tally agree with exactly one drawn option? First answer
  was **0**, which would have meant the child cannot win; the cause was `.gi-thumb svg`
  matching the inline category ICONS and a five-gate drawing six elements for a value of
  five. Scoped to rects of width BW: **exactly 1**. Verify the measurement before the defect.
- **two-baseline parity check** — vs `d7dde1ca~1` (exactly `sv` added, 7 prior locales
  byte-identical) AND vs HEAD (this commit moves `page_title.sv` and nothing else).

## Still recorded, still not fixed

Everything in the previous section stands, minus the two entries this commit closed (the
chart's missing word labels, and the English `aria-label`). The English `qVerify` "BEAT"
framing, the false "take-apart problems" claim, the ungrammatical English miss-lines, the
fence/bar-graph naming clash, the unreachable `flower` category, the shouted capitals, and
the three Swedish titles saying "gratis" are all still open.


## The visual critic then found six more, and the best fix was not "make it bigger"

Commit `dc542c8f`, after `7fd02658`. All all-locale, all activity layer.

- ⭐⭐ **THE BUILD ROUND OPENED AS A BLANK RECTANGLE.** Its hint says *"tryck på varje
  stapel"* and the opening state is a plot containing nothing — the tap targets are
  transparent rects. At 1024 that is a 430x250px expanse of cream under an instruction
  that does not match it, and it is the child's FIRST impression of the round. Faint
  dashed ghost columns now show where each bar grows. **No gate can see this**: the
  markup is present, the control is live, nothing overflows.
- ⭐⭐ **TEN STACKED BANDS AT 5px ARE NOT TEN COUNTABLE THINGS.** Measured: a unit cell was
  4.6 / 5.9 / 9 / 10.2px at 280/360/768/1024, against the platform's own 14px content
  floor, while 70-256px of card sat empty below the controls. ⭐ **The lever was not a
  taller card** — 1024 had 67px of clearance. The axis always reserved TEN units even
  when the round's max was six; scaling it to the round buys ~65% more height per unit at
  ZERO extra card height. Now 9.8 / 12.6 / 19.8 / 21.5px. **When a measurement is short,
  look for the waste inside the thing before you ask for more room around it.**
- ⭐⭐ **ONE SCALE PER ROUND, NOT PER CHART.** The match round draws three candidates for
  the child to compare; three independently-scaled charts are not comparable, and
  comparing them IS the task. `scaleMax` carries the round-wide maximum into every chart.
- ⚠ **280 is the one width with no headroom** — the taller plot put round 11's controls
  19px past the fold, so below 340 the chart keeps its old height. A smaller chart beats
  a cut-off one.
- ⭐ **RED WAS DOING TWO JOBS.** The fix round says *"En stapel är fel"* over a saturated
  tomato bar, so a six-year-old reads the berry bar as the flagged one before counting —
  a verdict delivered by hue, in an activity where colour IS the category. Berries moved
  to plum.
- ⭐ **THE MATCH ROUND PRINTED THE SAME SENTENCE TWICE, ONE LINE APART** — in EVERY
  locale `matchLine` is word-for-word the `qMatch` headline above it. Suppressed when it
  only restates the question, rather than commissioning new hint copy in eight languages
  for a slot that was adding nothing.
- The axis ran to `GW-6`, past the data, trailing a tail wide enough to read as a fourth
  category that is not there.

**Recorded, NOT fixed (shell-owned or out of scope):** the "KLARA 0" badge reads as a
score before the child has done anything (shared chrome, ~204 activities); the answer
chips clear 44px but sit ~6px apart; the headline outweighs the chart it refers to; the
r13 2+1 option layout gives the odd card positional salience; the unlabelled brown trough
at the right edge of the mascot row.

⚠ **The full-sweep critic (48 renders) never finished** — it was stopped and re-run over a
stratified 12 (all four round types x all three viewports), which is what produced this
list. Worth knowing the cost before pointing a critic at a whole sweep again.


---

# sv #8 — clock-digital `read-hour` + `read-half-hour` (`025741f6`)

A **PAIR**, not one activity — German shipped both together, so sv #8 is two manifest rows,
two slugs, two prose entries (66 → 68). An analog face; the child taps which of three
DIGITAL times it shows. Round data locked.

## The idiom, and why it is not clock-core's

`halv fyra` **= 3:30**, toward the NEXT hour — inherited from the already-shipped
`clock-core.js timeExpr` sv (`halv 8` = 7:30). The engine had branches for six locales and
**no `sv`**, so Swedish fell through to English: win note, aria-label and screen-reader all
said *half past three*. The recorded es/nl "speaking English to children" defect, new file.

- ⭐⭐ **THE HOUR IS A WORD, NEVER A DIGIT.** clock-core writes `halv 8`; this activity
  writes `halv åtta`, because the string is announced **beside a tile reading 3:30** — and
  "halv 4" next to "3:30" builds the exact misconception the activity exists to kill. Same
  call the nl panel made. Two shipped Swedish surfaces may legitimately differ in FORM
  while sharing the IDIOM; the cross-check asserts the idiom, not the numeral.
- ⭐⭐ **THE TWO PANELS DISAGREED AND I RESOLVED IT ON A CODE FACT, NOT A MAJORITY.**
  Linguist: a full sentence. Pedagogue: a bare phrase. `spoken()` is used as a standalone
  `aria-label` (verified at the call site), so a bare "tre" would make Swedish the only
  locale whose accessible name is not self-describing. **Full sentence wins.** This is the
  sv #7 lesson applied in the other direction — there a majority was wrong, here a panel
  minority was right, and only reading the call site settles either.
- ⚠ `ett`, never `en`. `wrapH(13) → 1`, so 12:30 = *halv ett* (never in the data; handled).

## The rulings

- **Årskurs SPLIT**: read-hour åk 1, read-half-hour **åk 2**. ⭐ **Lgr22 states matematik
  centralt innehåll ONCE for the whole åk 1–3 band, so it cannot decide a year** — the
  progression does. Favorit matematik puts *hel timme* in 1B and "hela och halva timmar" in
  2B, an *ökning från 1B*. The pedagogue explicitly overrode contrary research (children
  CAN learn halva in åk 1) because **the grade chip is a placement signal, not a capability
  claim**. Swedish joins fr/es/it/nl.
- **Strand override `Geometri (mätning av tid)`** on both. "Mätning och data" is a Common
  Core calque; Lgr22 has six headings and time appears in exactly one, under Geometri.
  Per-activity only — `strand-names.ts` untouched (it/nl precedent).
- **Mascot renamed to Tore** (operator ruling). ⭐ **All seven shipped locales name the
  mascot in `page_title`**; the content panel proposed dropping him for keyword-first SEO,
  which would have repeated the sv #7 defect exactly. Overridden on that measurement.
- Slugs `lasa-klockan-*` — the verb separates them from the shipped `stall-klockan-*` SET
  pair; `vad-ar-klockan-*` deliberately left free for the unshipped `clock-read.tell-time`.

## Gate lessons

- ⭐ **`spoken()` proved by ENUMERATION over the locked data** — 23 distinct times, targets
  AND distractors, plus the two that never occur. Sampling would have missed the wrap.
- ⭐ **My own poison caught a ban too narrow**: `W('Sprocket')` can never match
  `Sprockets klocka`, which is precisely the form that would ship. The genitive `-s`.
- The three poisons that fired: the Romance half-hour error, an English string left in
  place, and a 12:30 wrapping to *halv tretton*.

## Found and NOT fixed — a separate commit, with native panels per locale

- ⭐⭐ **`instruction` is ONE string for all six rows and is WRONG for row 6.**
  `match-clocks` is `direction: digital-to-analog` — read a number, tap a clock — under
  *"Read the clock, then tap the time that matches."* All 7 locales inherited it.
- ⭐⭐ **The false "free" claim is in ALL SEVEN intros** (measured; the panel said six).
- ⭐⭐ **`srReadBody` hands the screen-reader user the answer.** The accessible substitute
  for *reading a clock* is the hand positions, not the time.
- ⭐ **`hintMinute` describes marks that are not all there** — the fine ring is drawn only
  at non-multiples of five (the code comment says "48 fine marks at the non-5 positions").
- ⭐ **`clockSVG` aria-label `'clock face'` is hardcoded English**, identical for stimulus
  and all three choices; plus a label-in-name mismatch (visible 3:00 vs spoken 3 o'clock).
- **"Sprocket crows the hours"** is false (static SVG; the only audio is an 880/440 Hz
  tone). ⚠ The panel's supporting detail — "no audio call anywhere" — was WRONG; the
  finding stood, the evidence did not. **nl** inherited the claim in prose, **it** did not,
  also contrary to the panel. Reproduce, then record.
- **Data-locked, Swedish-specific:** the next-hour distractor (`4:30` against `3:30`)
  **never appears in any round**, so a child running the wrong rule scores 9/9 and the set
  cannot detect the one error that matters in Swedish.
- **The sibling `stall-klockan-hela-och-halva-timmar-ak-1` looks mis-graded** (four
  halvtimmar = 2B content on an åk-1 label). Fixing it moves a slug → own commit + 301.
- Two live sv clock activities carry the strand calque today.

# sv #9 — `ten-stones` 1.OA.C.6 (`b1dd8cd7`) + a cross-locale repair (`b37125d5`)

`ten-stones.add-sub-within-20.1-oa-c-6` — "Lilys guldsten" / slug
`rakna-over-tian-pa-tallinjen-ak-1`. Make-a-ten on the 0-20 number line. prose 68 -> 69.
de #9 = `c6656642`. **NO grade override, NO strand override.**

## The rulings

- **GRADE = ak 1, and the shipped locales split 3-3** (de/fr/nl year one; es/pt/it year two),
  so there was no majority even if deferring were allowed. Lgr22 states centralt innehall ONCE
  for the whole ak 1-3 band; the progression decides. Skolverket's bedomningsstod puts crossing
  ten *inom 20* at the end-of-ak-1 marker; Favorit 1B / Singma 1B teach it in ak 1.
  * **The structural argument is the reusable one:** es/pt/it compress bonds-to-ten and
  first-work-within-20 into their first year BECAUSE THEY HAVE NO EARLIER RUNG. Sweden has one
  (forskoleklass owns `tiokompisar`), and that is what frees ak 1. Corroborated by a sibling
  found while checking: `numberbond.make-ten-to-add.1-oa-c-6` is the SAME CCSS code and already
  ships at ak 1.
- **STRAND = keep the `Algebra` auto-map, third time in a row.** Lgr22 Algebra in ak 1-3 is only
  monster i talfoljder + likhetstecknets betydelse, so it is wrong for a huvudrakningsstrategi —
  but **17 shipped sv cards sit on that key** and the index groups by localized strand.
  * **A uniformly wrong label reads as a taxonomy choice; a split reads as broken data.**
  Family commission, never one card (`1.OA.D.8` / `2.OA.B.2` are arguable as equality content).
- **MASCOT (operator):** keep **Lily** (decodes in Swedish), name her in intro + prose, lead
  `page_title` and `slug` on the mathematics with no mascot. Measured: mascot in title is
  **5 of 7**, not 7 — de drops it and **nl RENAMED her to "Ties"** on this very activity — and
  **0 of 68 shipped sv slugs carry a mascot name**. I briefed the panel from memory and had to
  correct it mid-flight.
- **SLUG:** the neighbourhood is FOUR deep. Besides `tiokompisar-gor-10` (F-klass) and
  `addition-med-tiotalsovergang-inom-100-ak-2` (ak 2), there is `gor-en-tia-nar-du-adderar` —
  same code, same grade — so a third head term was spent. What was left unclaimed AND true is
  what distinguishes this card: **tallinjen** and **subtraktion**.

## Terminology

* **`guldstenen` vs `tiostenen` — the linguist argued for `guld`, then RETRACTED after the
build.** Its case was that `tiosten` segments `ti|osten` and **`osten` = "the cheese"**; on
review it withdrew that (`ti` is not a Swedish morpheme, so the parse is forced, and
`tiostav`/`tioramar`/`tiogrupp` are house style). `guldstenen` shipped anyway and the reason is
in the commit: both are coinages, the content panel reached it independently, the stone really
is painted gold (`C.GOLD #E8A53A`, verified before accepting), and every use pairs it with the
ten. **Recorded OPEN, cheap to flip.**
- `tiokamrater` (not `tiokompisar`, which is the F-klass slug) — a ladder, not a collision.
  * **The linguist blocked it from three strings**: it is mathematically FALSE on the two
  subtraction rounds (13 and 15 are in no ten-bond), so it appears in the two `maketen` prompts
  only, never in `sayWelcome`/`sayWrongTen`/`hintCheck`, which fire across cogs.
- `hoppa` = plain VERB only; `hopp` never a noun; `N-hopp` banned (skipcount owns it as a
  counting unit). `hoppa` is unavoidable — *skutta* is for hares, *studsa* is bounce, *skippa*
  means omit. * **`hoppa over tiotalet` means SKIP the ten** — the Italian *saltare il dieci*
  trap; 0 occurrences, verified with a poison-tested noun-vs-verb check (`hoppar` is the VERB
  and my first check flagged it as a noun).
- `damm` -> `dammen` (pond, en-word); *damm* = dust is neuter -> `dammet`. Only the definite is
  used. Near-miss: `hopp` -> `hoppet` is also *the hope*.
- `eqWord = ' ar '`, not `' blir '` — *blir* reinforces equals-as-instruction.
- `stand: "Stall dig pa talet"` makes the bare cardinal grammatical AND dodges `tian`, the
  ten-krona coin. So L208 needs no sv branch.

## The cross-locale repair that had to go first (`b37125d5`)

* **`3 + 8 = undefined` RENDERED ON SCREEN in all 7 locales at the celebration moment.**
`anchor-3-8`, `anchor-9-2`, `equiv-7-8` carry no `target`; the aria said "equals undefined"
because `numWord(undefined)` yields the literal string. Found by two panels independently,
verified at source. Fixed in data (11/15/11) AND guarded at the chip.
- **fr/es/pt spoke the ENGLISH "minus"; es/pt the English "plus".** * sv needed NO branch —
  `plus`/`minus` ARE Swedish, so the fallback is **accidentally correct**, which is exactly how
  this class survives review. Now a comment.
- Three hardcoded English aria-labels (`'a number line from 0 to 20'`, `'less'`, `'more'`) in
  every locale; the spinner pair is a speech user's ONLY directional signal. Keyed en+sv.
  * sv is `'minska med ett'` / `'oka med ett'` — strict parity would be `farre`/`fler`, NEVER
  `mindre`/`mer` (mass-noun forms, read as "smaller"/"more of it" on a by-one spinner).
- **New gate:** manifest coherence in `local-test-ten-stones.js`, browser-free, runs FIRST —
  every locale in ANY of slug/page_title/page_intro must be in ALL THREE. ten-stones had none.
  Poison-tested on a half-added locale and on unfolded a/a/o.

## Recorded, NOT fixed — two commissions

**Round design (all 8 locales, needs the core):** 5 of 11 rounds render only two options and
re-offer on a wrong tap, so **a wrong answer tells you the answer**; `anchor`'s `correctChoice`
is literally `Math.max(a,b)`, so for addends <=10 "the larger" and "nearest to ten" are the same
predicate and always tapping the bigger number scores 100%; `equiv-7-8`'s own rule
`|sum-2d|===1` **admits 8 as well as 7, and 8 is not offered**; `8 + 6` is three of eleven
rounds; the spinner opens at 1, which IS the answer to two sub-bonds; no round lands exactly on
ten. All verified at source.

**Layout / shared copy (visual critic, all locales):** the number-line labels are ~4 CSS px cap
height at 360 and ~8 at 1024 — the smallest text on the page, on the activity's own apparatus;
the frog is ~12 CSS px at 360; the pond panel collapses to a ~40 px strip at 360; r4/r9 put two
56 px cards in a 581 px panel (sparse); the goal flower is **clipped flat by the progress
track** at every width; r10 states the answer three times beside a chip still reading `?`; and
in r6 the frog stands at 0, unrelated to 7 + 8.
* **Prompt wrap:** sv "Hjalp Lily over dammen." is 2 lines at 1024 (1 at 768). Measured before
touching it — the font is 48px at BOTH widths and **ITALIAN already ships a 2-line prompt at every width**,
so a wrapped prompt is accepted house behaviour, not an sv regression. Left as is.


# sv #10 — `numbers-court` 1.OA.D.7 (`eeccac03`) + two fixes that had to go first

`Sifferdomstolen` / `likhetstecknet-sant-eller-falskt-balansvag-ak-1`. What the equals sign
means, on a balance. prose 69 -> 70. de #10 = `1ac66b7a`. **NO grade override, NO strand
override.**

(superseded — the live pointer is at the END of this file) NEXT was sv #11 = `comparison-creek` (K.CC.\*)** — the de commit is `8c17500c`
("Käpt'n Quills Flussfahrt / Zahlen vergleichen"). sv #1–#10 done, prose 70.

## The rulings

**Grade åk 1, and it did NOT come from a majority.** The seven shipped locales spread across
*three* school years for this one activity — en/de/fr at year 1, nl/es/it at year 2, pt at
year 3. The ruling came from the Swedish progression plus the fact that a same-code sibling
(`plus-och-minus-par`) already ships at åk 1.

⭐ **Strand `Algebra` — the auto-map is right ON THE MERITS here, which inverts the last three
rulings.** On #3 and #9 the `Operations & Algebraic Thinking → Algebra` map was judged wrong
for the content and kept only for consistency with the shipped cards. Lgr22 files exactly two
things under algebra in åk 1–3: *mönster i talföljder* and ***likhetstecknets betydelse***.
This activity IS the second one. Recorded so nobody "fixes" it back on a consistency argument.

⭐⭐ **`rättvis` is refused on EVERY surface, and it is a SEMANTIC refusal, not a register
one.** Both Swedish panels reached it independently. The shipped fraction cards already anchor
`rättvist` to mean **equal-sized parts** ("delad rättvist, så att alla delar är lika stora"),
so reusing it for a balanced equation imports a part–whole schema into a relational task. And
in a courtroom "inte rättvist" reads as a verdict on the witness's honesty — the banned shaming
register. The English calls a balanced equation *fair* throughout; Swedish cannot.

⭐ **`Stämmer!` / `Stämmer inte!`** — the analogue of the shipped de `Stimmt!` and nl `Klopt!`.
It judges the CLAIM, not the child, which is what the refusal of `Rätt/Fel` was actually about.
The pedagogue accepted this over its own `Lika mycket!` **on one condition**: since the buttons
no longer state the mathematics, **`lika mycket` must be on screen every round**. The prompt
carries it. If anyone ever shortens the prompt further, that condition dies with it.

⭐ **`Sant/Falskt` was refused for the BUTTONS ONLY** — so the slug and title keep *sant eller
falskt*, which is the phrase a Swedish teacher searches for. A refusal scoped to one surface is
not a refusal of the word.

⚠ **Three names for one court, flagged as "one string now versus a 301 later."** Header said
`Sifferdomstolen` (linguist), prose said `Talens domstol` (content), title says `Tess domstol`.
Aligned on **`Sifferdomstolen`** — one word, concrete, and it dodges the trap the content panel
found in `Taldomstolen`, where a `tal-` first element leans to the SPEECH sense (*talpedagog*,
*talspråk*). ⚠ **`Tess domstol` is CORRECT** — a name already ending in -s takes no added -s and
no apostrophe (Språkrådet, cf. *Lars bok*). Never "fix" it to Tess' or Tesss.

⭐ **`våg` is usable despite being a homograph** (scales / wave) — and the reasoning is the
counterexample to the recorded `bana`→`banan` case. There the definite singular collided. Here
the **plurals diverge** (`vågar` scales vs `vågor` waves) so any plural self-disambiguates, the
singular appears only inside `väger jämnt` which selects "scales" absolutely, and a wave is not
a competing referent on a courtroom balance. ⚠ `jämnt`, never `jämt`.

## Two defects that had to be fixed before the Swedish went in

⛔ **`d759017d` — one round in every twelve could not be completed, in all seven locales.**
`_deposit` did `fill[side] += Math.abs(val)` — it ignored the token's operator — while the
core's `evalSide` subtracts when `op === '-'`. `buildPool` **always** includes a TRUE
`subtraction` round. So on `6 = 8 − 2` the child rules correctly, taps both operands, the right
pan fills to 10 against a target of 6, both tokens are spent with no listeners left, and Check
can never succeed. **Measured against the real generator over 200 seeded decks: exactly 1.00
dead end per deck, every deck.** Found independently by the Swedish linguist and the Swedish
pedagogue, reading the model — not by any gate. The fix reads the authoritative token out of
the round rather than trusting the passed value, so no caller can reintroduce the sign.

⭐⭐ **The harness HAD a TRUE-round test and still could not see it.** `forceKind('true')` takes
the FIRST true round in the pool, and `buildPool`'s plan puts `commutative` first — so the
subtraction round was never reached. A predicate that selects "some round of kind X" tests the
round the generator happens to order first, not the class. `04943e62` + `d759017d` add a
`subtraction-true` predicate and a completion assertion that names the claim in its failure
message.

⚠ **`speak()` had no `sv` arm and fell through to `'en-US'`** — Swedish read aloud by an
American voice, nothing thrown. Same silent class as the `WORDS_SV` blocker on sv #9, in a new
shape (a BCP-47 language tag, not a word array). Now `sv-SE`. **Check the voice-tag map on
every engine that has one.**

## The prompt wrap — measured, then changed

The two-sentence prompt ran to **three lines at 1024 with "sidor?" orphaned**, while en and de
sit on one. The pedagogue had pre-authorised a shorter fallback *provided `lika mycket`
survived*, so `Stämmer det? Är det lika mycket på båda sidor?` became `Är det lika mycket på
båda sidor?` — two lines at both 768 and 1024, condition intact. ⚠ Contrast sv #9, where a
2-line wrap was LEFT because Italian already ships one at every width: **a wrapped prompt is
accepted house behaviour; an orphaned last word is not.** Measure before deciding either way.

## Gate lessons

⚠ **My own parity regex reported 14 of 15 keys and the file was correct.** The prefix-anchored
form `(?:^|[\{,]\s*)key:` missed one; the lookbehind form `(?<![a-zA-Z])key:` found all 15.
**Verify the measurement before the defect** — again. And the count was only trustworthy once
the check was poison-tested by stripping one `sv` and confirming it named `vTrue`.

⚠ The strings block starts at line 72 and my first regex for it (`strings:\s*\{[\s\S]*?\n  \},`)
matched **nothing** and printed "FAULT: no strings block" — a shape assumption about
indentation. Walk the braces; do not pattern-match a block's end.

## Recorded, NOT fixed — own commissions

* `reteach` fires over empty pans, telling the child to count sides that show nothing.
* `winRepair` congratulates over the *unrepaired* equation — the display is not re-rendered.
* `buildPool` fixes truth-per-form, so `commutative` is always TRUE and a child who notices
  the shape can skip the mathematics.
* The claim renders an ASCII hyphen, not U+2212 minus.

# sv #11 — `comparison-creek` K.CC.C.7 (`74287e41`) + two repairs (`95a41883`, `b9fa2988`)

`Kapten Quills flottfärd` / `jamfor-tal-1-till-10-storre-mindre-lika-ak-1`. Comparing numbers
1–10 on a forking river. prose 70 -> 71. de #11 = `8c17500c`. **GRADE OVERRIDE `sv:'1'`, NO
strand override.**

(superseded — the live pointer is at the END of this file) NEXT was sv #12 — find it with `git rev-list --all --children | grep ^8c17500c` -> the de
child commit. sv #1–#11 done, prose 71.

## The rulings

**Grade åk 1, and the sibling constraint decided it.** The six shipped locales split three–three
(de Vorschule / fr GS / es preescolar vs nl Groep 3 / it classe prima / pt 1º ano), which the
pedagogue dismissed as each panel ruling on its own curriculum. Lgr22 förskoleklassen covers most
rounds but has **no räknesätt and no operator symbols at all**, so the written-sums round, the
likhetstecken round and arguably the *between* round sit above it. Reinforcing: **two sv
activities on this same code already ship at förskoleklass** (`vilket-tal-ar-storre`,
`vilket-tal-ar-mindre`, both simple pick-one tasks) — at åk 1 the three read as a progression
instead of three competitors. And **three shipped sv prose entries already teach *likhetstecknet*
on cards labelled årskurs 1** (measured, not assumed — one of them is sv #10).

⭐ **The grade ruling also REMOVED a strand mismatch.** `Taluppfattning och tals användning` is the
åk 1–3 kursplan heading; förskoleklassens section of Lgr22 does not use those headings at all (it
uses *Matematiska resonemang och uttrycksformer*). Placing it at åk 1 makes the auto-map correct
rather than merely tolerated.

⭐ **`FLER prickar`, never `MER`.** Dots are countable; *mer* is the mass form and a Swedish
six-year-old hears it as an error. All three panels reached this independently.

⭐ **The mixed round must NOT ellipt.** 7 prickar against the siffra 6 are different kinds of thing,
so *det större* (ett) and *den större* (en) each mislabel one side. Naming both representations is
also better than the English "the BIGGER one": it says out loud that prickar and siffror are two
ways of showing the same TAL. ⚠ *störst / den största* refused — "biggest" invites the
physical-size reading the very next band exists to trap.

⭐ **Buttons `STÖRRE`/`MINDRE`, not `MER`/`MINDRE`.** Swedish has **no** PIÙ/MENO collision — the
operators are *plus* and *minus* — so the Italian reason does not transfer. The Swedish reason is
different: *större än / mindre än* is the Lgr22 formulation, and `MER` would contradict the `FLER`
the activity teaches two rounds earlier.

⚠ **`hintCheck` deliberately diverges from the English**, which is false on two rounds in twelve:
`hintKey` always returns `hintCheck`, so "steer down a channel" is served on the tie round (whose
answer is the `=` beacon) and on the relation round (which renders only buttons).

## ⚠⚠ THREE NATIVES, THREE WORDS FOR THE WATER — and a 2–1 split is not evidence

- pedagogue: refuse *bäck* — **you cannot sail a raft down a bäck and bojar belong in sjö and
  hav**. Proposed **å + holme**.
- linguist: refuse *bäck* — **`en bäck` → def. `bäcken`, spelt as `ett bäcken` = pelvis/basin**.
  Proposed **flod / flodarm**.
- content: keep *bäck* (the pelvis sense is unreachable in running prose) + **gren**.

**Resolved on a FACT, not a count:** the pedagogue's objection is not about spelling at all, and
the content panel never addressed it. Of the survivors, **`flod`/`flodarm`** — a flod plausibly
carries a flotte and bojar, `floden` has no homograph, and it is the morphology the other six
locales already chose (Flussarm / rivierarm / bras / brazo / ramo). The content panel's
counter-objection (*armen* = body part) is weak: `flodarmen` is a compound. **The prose was
re-pointed off `bäcken`/`gren` before shipping** — one apparatus, one name (the sv #10 lesson) —
and likewise `flottfärd` everywhere rather than `flodfärd` in-app and `flottfärd` in the title.

⭐ **KEEP Quill, and the reason beats the default.** Swedish has no native ⟨qu⟩, so a Swedish
reader says /kvɪl/ automatically — and **`kvill` is a real Swedish element meaning a river fork**
(Old Swedish *kvisl*; Kvillebäcken, Kvillsfors, Kville), so the name lands inside this activity's
own semantic field. The Dutch rename was right *because Quill is inert in Dutch*.

## ⛔ Three defects, one root cause — `95a41883`, all 7 locales, ZERO new strings

Every one was code re-deriving a value the core already owns (the sv #10 `_deposit` disease):

1. **The between round's re-teach named the WRONG buoy and looped forever.** `_bonk` branched on
   `promptKey`, which has no `between` case, so `btw-5-8` (5 vs 8, "which is between 4 and 6?",
   answer 5) announced and SPOKE *"8 is more than 5. Look again — which channel has 8 now?"*.
   Follow it, get bonked, hear it again. Fixed by binding a/b to `Core.deriveCorrect` — the file's
   own declared ONLY answer source. Identical output on the other eleven rounds.
2. **The relation round stated its answer, named a control it does not render, and promised a swap
   it never performs.** *"6 is less than 7 … which channel has 6 now?"* — but the round renders
   only MORE/LESS buttons, and `swap` fires only for `responseMode === 'side'`. It now re-asks.
3. **The sum round's commit read-back said "You picked 0."** A sum channel carries `value: 0` with
   the quantity in `addends`; `_answer` read `.value` raw. `Core.val()` exists for exactly this.

I found #1 and #3 from source; the linguist found all three independently by reading the model.

⭐ **The harness already drove a wrong steer and was blind to all three** — it steered on whichever
round the shuffle put first, asserted only "did not advance" + "the buoys swapped", and never read
the announced message; its all-twelve loop solves every fork with `SOLVERS.reader`, which is always
correct. The sv #10 shape exactly: a test for the behaviour that selects the wrong instance.

## Gate lessons — three of my own measurements were wrong before the gates could be trusted

- ⭐⭐ **The sum gate read the live region ONCE and so measured the RE-TEACH, not the read-back** —
  `_answer` announces, then `_win`/`_bonk` announce over it in the same frame. **It PASSED over a
  defect I had already traced in the source.** Fixed with a MutationObserver recording the whole
  sequence.
- ⭐ **Then it identified the read-back by POSITION** — but the shell announces the prompt on load,
  so index 0 was the prompt. Now it matches the `readback` TEMPLATE read off the live tool
  (locale-independent). **Positional indexing into an announcement stream is not identification.**
- ⭐ **The relation assertion read "must not contain the answer word" and FAILED THE CORRECT FIX**,
  because re-asking necessarily offers both options. It now targets asserting one relation to the
  exclusion of the other.
- ⚠ **`$$` in a `String.replace` REPLACEMENT is an escape for a literal `$`** — a patch script
  silently turned puppeteer's `page.$$` into `page.$` and the gate crashed on a null. Use a
  replacer function. (Same family as the backtick-in-`node -e` trap, which I hit again this
  session, and the heredoc-eats-apostrophes trap, which I hit writing this very file.)

## ⚠ Two traps in the STRING-INSERTION patch itself

- ⭐ **The keys are SPACE-PADDED for column alignment** (`title:         {`), so a `key: \{` needle
  matched nothing and reported *"strings key not found — title"* on a perfectly normal file. Use
  `key:\s*\{`. (The #43 alignment-padding trap.)
- ⭐⭐ **Five values contain ICU placeholders — `{a} {b} {n} {lo} {hi}` — so a `[^}]*?` run to the
  first `}` stops INSIDE the value** and splices the new entry into the middle of a string. It
  produced `Unexpected identifier 'Är'` on a file that had been valid. **Anchor on the LAST locale
  (`nl: '…'`), not on the closing brace.**

## ⚠⚠ `JSON.parse` → `JSON.stringify(rows, null, 2)` REFORMATS A LIVE MANIFEST

These manifests hand-compact their round arrays onto single lines. Round-tripping expanded all
twelve comparison-creek rounds, turning a three-field addition into a **244-line diff**, and would
have reformatted **247 lines of choice-board** for an eight-title fix. Both caught by reading the
diff stat, then redone as **surgical text replacement with a line-count assertion**. Final diffs:
6 lines and 8 lines. **Never restringify a manifest to change a field.**

## ⚠ I nearly overrode a native panel on a bad measurement

A probe that picked "the largest-font leaf element" reported the mixed-round prompt at 3 lines
against English's 1, so I shortened the linguist's string. Measuring `.lcs-activity-prompt`
directly showed **English wraps to 3 lines on that round too** — house behaviour, not an sv
regression — and the shortening had cost the *styr* verb every other prompt carries. Reverted.
⚠ That probe also over-counts by one against the render; trust the screenshot.

## Queued from the panels' audit of the English — real, needs the other six locales

- **`ros-7-6` licenses the misconception rounds 8/9 punish** — "the BIGGER **one**" is ambiguous
  between the bigger number and the bigger thing, and it comes BEFORE the size-trap rounds.
  (Swedish fixes it for free: it cannot ellipt.)
- **`sz-3-8`/`sz-9-4` give away their own trap** — "not bigger size!" hands over the strategy
  before the child chooses, disarming the only probe of value-vs-magnitude. Costs no new text
  (ask neutrally, move the existing `promptSize` string to the wrong-steer hint).
- **`tie-6-6` — the `=` target's mere appearance is the answer.** Structural: make `=` present and
  legal to REJECT in two or three unequal rounds. Rejecting it is where the meaning lives.
- **`btw-5-8`'s distractor (8) is refutable by "way too big."** ⚠ Checked before treating it as a
  safe one-character change and it is **not** — en, it and nl prose all name specific digits
  including 8, so altering shared round data risks falsifying three locales' shipped copy.
- **The wind-vane is SILENT on `tie-6-6` and `name-6-7`** (the guard only fires for L/R), so two of
  twelve rounds lose the only non-punitive confirmation channel. Needs authored text ×7.
- **Round 11** silently changes the verb from *steer* to *name the relation*, at 50% guess odds;
  **the reshuffle** can cold-open on the sums or between round.
- **The English meta description** cites Common Core + a CCSS code, is 358 chars, and describes
  four of twelve rounds falsely — the other ten locales were built from it.

## ⚠ I wrote a brief from memory again

I told all three panels the size-trap was "3 big vs 8 small (twice)". The artefact has `sz-3-8`
**and** `sz-9-4`, where the big numeral is the RIGHT answer — a better design than I described,
because it stops a child learning "always pick the small one". The content panel caught it by
reading the manifest instead of my brief. **Write the brief from the artefact.**

## Also shipped: `b9fa2988` — eight sv page titles were in ENGLISH title case

Swedish uses sentence case. Eight shipped titles capitalised function words (*Med, Och, På, Till,
Inom, I, En*) on the clickable line in Google results. The linguist checked every word: **no proper
nouns** — `tioram` is a plain common compound (tio + ram), and Swedish capitalises common nouns
never; only German does. ⭐ Its best finding: in `Dela In En Rektangel I Lika Stora Rutor` the
capital **`I`** is not only the preposition *i* — standing alone and capitalised it is also the
archaic plural pronoun *I* ("ye"), so lowercasing removes an ambiguity too. Flagged and NOT changed
(wording on live ranking pages): *räkna ut textuppgifter* (you **löser** a textuppgift), the
article-less *på tioram*, and title #1 sitting at the ~60-char SERP cap so its third relation
truncates.

# sv #12 — `span-length-gap` 2.MD.A.4 (`7ce8ff99`) + a gate fix (`8e8cdf3d`) + a family repair (`9c9697bb`)

`Hur mycket längre?` / `langdskillnad-hur-mycket-langre-cm-ak-2`. Two bars, both lengths printed
in cm, type the difference. prose 71 → 72. de #12 = `b385e738`. **NO grade override (manifest
grade 2 auto-renders åk 2); STRAND OVERRIDE `Geometri (mätning av längd)`.**

(superseded — the live pointer is at the END of this file) NEXT was sv #13 — find it with `git rev-list --all --children | grep ^b385e738` → the de child.
sv #1–#12 done, prose 72.

## The rulings

**Grade åk 2, and the pedagogue explicitly REFUSED to use the unanimity.** All six shipped locales
agree at year 2, but "six curricula agreeing is corroboration, not evidence" — it ruled from the
Swedish progression (cm and the ruler arrive in åk 1; expressing a *comparison* as a difference in
a standard unit is 2B) plus five of eight rounds needing tiotalsövergång. ⭐ Note this is the
opposite move from sv #11, where the locales split 3–3 and the sibling constraint decided.

⭐⭐ **Strand `Geometri (mätning av längd)`, and the argument generalised to the whole family.**
Lgr22's åk 1–3 headings do not include *Mätning och data* — it is the CCSS domain respelled. The
decisive point: **Lgr22 names time and length in ONE SENTENCE** ("Mätning av längd, massa, volym
och tid") under Geometri, and the platform was splitting that single bullet across two headings —
time already overridden to `Geometri (mätning av tid)` on both clock cards, length left on the
calque. Four siblings harmonised in `9c9697bb`. ⚠ **seriation gets `Geometri (jämförelse av
längd)`** on purpose: it has no unit, and calling a unitless comparison *mätning* promises a
number that is not there — the same reasoning as the project's own `mät-` veto.

⚠ **Both standing vetoes were re-examined and both were STAGE vetoes that do not bite here.**
`mät-` was written for pre-unit activities; this one has a number and a unit. `linjal/centimeter`
likewise — 2.MD.A.4 *is* the standard-unit stage. But `mäta` still stays out of the child-facing
task strings for a different reason: **nothing is measured in this activity**.

## ⛔ Three engineering defects, all cross-locale, two found by panels reading the model

1. ⭐⭐ **The colour round is FALSE.** `blue bar` renders `rgb(242,120,75)` — CORAL — and `red bar`
   renders `rgb(63,176,126)` — GREEN. There is no blue and no red in the tool; `.slg-a` is always
   the longer bar and `.slg-b` the shorter, coloured by POSITION. A seven-year-old is asked about
   the blue bar while looking at an orange one, in band 3. **Found independently by two panels**
   (the pedagogue objected on colour-blindness grounds — red/blue being the commonest confusion
   pair — and the linguist read the CSS and found it is not even red and blue). Swedish relabels
   the round to real objects (`sugröret` 20 / `nyckeln` 8); the other six locales still ship it.
2. ⭐⭐ **The mascot and his only line NEVER RENDER.** `@media (max-height:1040px){.slg-row{display
   :none}}` hides both the worm SVG and the `spanIntro` bubble. Measured: hidden at 568/740/900/
   1000, visible only at 1100 — i.e. never, in an iframe whose height is its content height. So
   `spanIntro` is dead in seven locales and `spanName` survives only as an aria-label inside a
   `display:none` subtree. Seven page titles promise a character the page does not contain.
3. ⛔ **The 2 cm numeral WRAPPED to two lines and burst its bar**, all seven locales, on both
   rounds whose short value is 2. Bar width is `max(12, len/20*100)%` → ~20px on a phone, while
   "2 cm" needs ~25px. Fixed in the activity layer: the value can never wrap, and a bar too
   narrow to hold its numeral puts the label on the track beside it in ink. Bar WIDTH untouched.

## ⚠⚠ visual-qa COULD NOT MEASURE THIS ACTIVITY AT ALL — 96/96 FAIL, in English (`8e8cdf3d`)

The DoD gate's convention-independent fallback excludes anything with an `lcs-` class, so it never
counts shell chrome. But for `answerType:'number'` activities the **shell keypad IS the answer
surface**, so the gate found zero controls and correctly refused to pass. **Nine activity files
declare `answerType:'number'` — none of them could ever go green.** The keypad now counts toward
FITS and TAP.

⭐ **Two floors, both already documented, neither invented by me.** 44px is the answer-card target;
**36px is the recorded K-2 minimum for shell controls** (§A.13.55 — `audit-activity-mobile.js`
WARNs below it and the shell ships `minmax(36px,1fr)` for exactly this). Measured keys: 39px@320,
37px@360, 43px@412 — above the shell's floor, below the card floor. Applying the card floor would
have failed a correct tool on the wrong standard. ⚠ The keypad is NOT folded into the card
`minTap` (a 37px key must never mask an undersized card elsewhere) and is NOT an answer card, so
SPARSE/NOT-TINY are unchanged. Poisoned both ways: floor→60 fires on all 96; comparison-creek's
72 card renders still pass.

## Gate lessons

- ⭐ **The existing harness ran `?lang=en` only and never read a bar caption**, so it was blind to
  a Swedish label falling through to English — which is exactly what a missed LANG-membership list
  produces. New sv block: 32 fires before, clean after.
- ⚠ **Two defects in my own gate's reporting**: it printed "FAIL … no English label reached the
  DOM" (its own contradiction), and its ok/FAIL prefix read the GLOBAL fails array so an
  English-side failure would have mislabelled the Swedish line.

## ⚠⚠ I misread my own render, and the DOM was right

At 360 the fixed 2 cm row *looked* to me like the label overlapping the caption in the wrong
colour. The DOM said it sat **6px past the bar in ink (42,42,53)**, not overlapping. A **4×
screenshot of just that row** settled it — the DOM was right. At 1×, a 23px bar and 12px text are
at the limit of what a downscaled screenshot conveys. **When the render and the measurement
disagree, MAGNIFY before concluding** — the DoD's "read the render yourself" step can itself
mislead at small sizes.

⚠ And the reverse happened first: my probe measured the numeral's width and its left/right spill
and reported undramatic numbers (4.1px@320, 0px@412). **What makes it look broken is the WRAP,
which a width measurement cannot see.** The defect was found by reading the render.

## ⚠ An invented threshold, again

My first short-bar fix used "narrow if the bar is under 22% of the track" — width-independent, so
at 768 it moved the label outside a 48px bar that comfortably holds a 31px label. **A threshold I
made up is not a measurement.** Replaced with the real question, asked after layout: does the
label FIT in this bar at this width? The same 2 cm bar is 20px at 320 and 48px at 768.

## ⭐ `win` is dead in 36 of 133 activity files — measured before filing

`win` is declared in all seven locales here and never referenced (the shell's celebration comes
from `i18n.chrome('celebrate')` reading its OWN table). **Before filing it as an sv #12 defect I
checked whether it was local — it is not.** Filing one instance of a 36-file pattern as this
activity's bug would have been the wrong report. Deleted here; the sweep is its own commission.
Scanner: `scratchpad/scan-dead-strings.js`, poison-checked. ⚠ It over-reports on the few
activities with *nested* string structures, so the defensible number is the `win` count.

## ⚠ I wrote the brief from memory AGAIN, and corrected a panel mid-flight

I told all three panels the bars "carry centimetre marks already drawn on them". They do not:
`_barRow` draws a caption, a proportional bar, and the length **printed as text** — no scale, no
ruler, no artwork. I sent the correction to the content panel mid-run and it rewrote its copy to
open on *"Det här är ingen mätövning"*. ⭐ The absence of artwork is also what makes the Swedish
relabelling of the colour round possible at all — there is no picture to contradict.

## Where the three panels disagreed, and how it resolved

**The mascot.** Pedagogue: rename to `Centi` (because `Mätis` is already taken). Linguist: keep
`Span`, species `mätarlarven`. Content: keep `Span` but **never call him a mätarlarv** — because
`Mätis`, one rung below in the same Swedish length family, IS one. **Synthesis: `larven Span`** —
the linguist's inertness argument (Swedish has no native ⟨qu⟩ and *spann*/*spån* are not
homophones) plus the content panel's collision catch.

## Queued, cross-locale, needs the other six panels

- The **false colour round** in en/de/fr/es/pt/it/nl.
- The **hidden mascot**: either give `.slg-row` a compact layout or stop promising him in seven
  page titles.
- **Object plausibility** — a 14 cm scarf, a 13 cm rope, a 10 cm snake. The pedagogue notes åk 2
  works explicitly on *rimlighet*, so a picture asserting "a scarf is 14 cm" damages the benchmark
  the child is building. It offered a full replacement set; not applied because implausible
  objects are a SOURCE defect and fixing only Swedish would leave six locales wrong.
- **The bands do not escalate** — measured: band 1 holds difference 7, band 3 holds difference 2.
  The missing axis is *does it cross the ten?*
- **Eight rounds of one question** trains the keyword strategy (*longer* → subtract).
- **The English meta description** is 243 chars, cites a CCSS code, and says Span *measures*.
- **`hintAdd` is named for addition and describes subtraction**; `prompt` and `instruction` are
  near-duplicates; `spanIntro` says "the long one" where every other string says "longer".
- **`strand-names.ts` sv fallback** `Mätning och data` → bare `Geometri` — recommended by the
  pedagogue, NOT done: that map is read by every Swedish surface and I have not enumerated what
  else falls through to it.

# sv #13 — `mosaic-menders` 3.MD.C.6 (`a4179651`) + two gate fixes (`570a2c0d`, `e4ffcd15`)

`Alvas mosaiker` / `area-rakna-rutor-mosaik-ak-4`. Area as a count of unit squares. prose 72 →
73. de #13 = `c4b92ec3`. **GRADE OVERRIDE `sv:'4'`; STRAND OVERRIDE `Geometri (area)`.**

(superseded — the live pointer is at the END of this file) NEXT was sv #14 — `git rev-list --all --children | grep ^c4b92ec3` → the de child.
sv #1–#13 done, prose 73.

## ⭐⭐ Årskurs 4 — the first Swedish activity above åk 3

Lgr22's åk 1–3 Geometri lists measurement **exhaustively** — *"Mätning av längd, massa, volym och
tid"* — and **area is not in it**; the list is closed. *Omkrets och area* appear in the åk 4–6
kursplan. ⭐ The pedagogue answered the question I actually asked — can an åk 3 class do this? —
and the answer **cut against åk 3**: they can, but *"hur många rutor får plats"* is an ACTIVITY
in åk 3, not a content goal, and it is nearly always covering a given rectangle. What this
activity tests is that **area is conserved when the figure changes shape**, which is the åk 4–6
step. The chip is a PLACEMENT signal, not a capability claim (the sv #8 ruling).

⚠ **It binds the sibling.** `patchwork-meadow.tile.3-md-c-6` — same standard, same mechanic, no
sv yet — must follow to åk 4. Written into the override comment so a later session cannot
quietly give it åk 3.

**Strand `Geometri (area)`** — bare, not `(mätning av area)`: Lgr22 names area as a study object
paired with *omkrets*, not as a measuring act, unlike the length family where *jämförelse* and
*mätning* genuinely differ. A future perimeter activity takes `Geometri (omkrets)`. Geometri is a
heading across the whole kursplan, so the åk 4 ruling does not change the wording.

## ⚠⚠ Two gates that certified what they were written to forbid

**`570a2c0d` — the harness PASSED a locale that did not exist.** Its expected title read the
tool's own fallback (`STR.title[loc] || STR.title.en`), so with no `sv` present the *expectation*
fell back to English and the *page* fell back to English and they matched. Measured before a word
was written: `ok mosaic-menders/sv — "The Mosaic Menders"`. The recorded **"a gate whose oracle
reads the same file marks its own homework"** defect, live. Now asserts the locale is DECLARED,
for every key, ahead of every fallback-comparing check.
⭐ **I checked whether it was a pattern before widening the fix, and that changed what I did.**
Five other harnesses share the shape — but two test **deliberately English-only** activities
where the fallback is correct and the assertion would fail a correct tool. Blanket-applying it
would have been the "a new gate condemns correct code first" trap.

**`e4ffcd15` — three of eight rounds are pure rotations, and the check forbidding that passed
them.** The assertion was an **OR** whose second disjunct (`match !== target`) is true in every
round by construction, so the bbox comparison never ran — and `bboxArea` is a scalar, so it could
not tell 1×6 from 6×1 anyway. Now compares MASKS, with a **shrink-only ratchet** for the three
shipped rounds; poisoned by removing one entry (fires that round by name) and by emptying it
(fires all three).

## ⚠⚠ `L8` IS NOT AN L — and I put that error into three panel briefs

`L8: ['11','11','11','11']` is a **solid 4×2 rectangle**; the file's own comment says
`bbox 4×2=8`, and area === bbox means solid. `L9` IS a genuine L, so the library can express one.
**I described "an L-shape of 8" to all three panels straight off the identifier** — a shape id is
not a shape — and a panel caught it by reading the mask.

The consequence reached the deliverable: the content panel, writing in good faith from my brief,
**offered the 1×6 → 6×1 round as the example of area conservation** (that round is the same bar
turned 90°, which is the defect, not the illustration) and **described counting "L-formade
figurer" in the plural** when exactly one round has a real L. Both corrected before shipping.

## ⛔ `srCand` handed the answer to screen-reader users, all seven locales

Every candidate button was labelled with **its own tile count**, so the task collapsed to
matching two spoken numbers; in round 7 the board is {4,6,6} — one tap, no counting. ⭐ **No
Swedish text could repair it**: the leak is the VALUE bound at the call site, not the words
around it. The label now reads the mosaic **row by row with no total** — the same addition a
sighted child performs.
⚠ **Capability-detected, not a locale list**: a locale that has authored `srRowMany` gets the new
behaviour; everyone else keeps the legacy label, so nothing regresses while the other panels are
still to be asked. The check reads the **strings table directly**, because `api.t` falls back to
`en` and could therefore never report a locale as missing. English joined Swedish; five filed.
⚠ For the 1×N bars the row list equals the total ("6 rutor") — **parity, not a leak**: a sighted
child reading a 1×6 bar also just reads one row of six.

## The mascot — three panels, three names, and a near-miss

**Renamed Tessa → `Alva`.** *Domare Tess* shipped three sessions ago from this same fan-out; one
letter apart, both female, and the Swedish genitives collide. ⭐ **The reason the other seven
locales kept Tessa does not transfer, and the file says so**: the Italian entry records that
*«tessera»* = mosaic tile, so *"Tessa la mosaicista"* reads transparently — Romance-only. ⭐ And
**per-locale mascot renaming is already shipped ON THE COLLIDING LINE**: the same `judgeName` row
reads `nl: 'rechter Roos'`.

⚠ Pedagogue said `Kajsa`, content said `Mira`, linguist said `Alva`, each after its own roster
check. `Mira` shares an initial with two live mascots (Mätis, Mim). Kajsa and Alva both verified
clean; **Alva taken because the linguist searched every Swedish string in `mini tools/`, not just
page titles** — its roster found Lily, Hopper and Tuck, which a title-only scan misses.
⚠ **The pedagogue caught its OWN first suggestion**: it was going to propose `Tilda` until the
roster showed live `Tilly`.
⚠ **My own check produced two false "Alva" collisions** — the substring inside *halva*.

⚠⚠ **The rename would have been half-done**: `aria-label="Tessa"` was a LITERAL in the SVG
markup, outside the strings table, unlocalised in all seven locales. A screen reader would still
have said "Tessa" for Alva.

## Terminology

`ruta / rutan / rutor / rutorna` — the Swedish area curriculum runs on it (*rutat papper*, *hur
många rutor*). Rejected: **`bricka`** (VERIFIED claimed in 6 shipped Swedish strings as this
platform's counter/token, and everyday = *tray*), **`platta`** (*plattan* = the cooker hob),
**`kloss`** (three-dimensional — would teach volume in an area activity), `kvadrat` (register).

⚠ **The title is NOT a `-verkstad`.** The German/Dutch workshop move is unavailable: `Ordverkstad`
and `Bokstavsverkstaden` already ship in Swedish (verified), so the content panel's
`mosaikverkstad` would have been a third and was not taken.

⚠ **`hintCount` does not say "not the size".** The English *"count the tiles, not the size"* is
self-defeating — the tile count IS the size — and five locales inherited it. The misconception the
code builds is comparative, so the Swedish names that: *gå inte efter vilken som ser störst ut*.
It also opens with no verdict, because `lcs-shell.js:880` announces `chrome('tryAgain') + ' — ' +
hint`, so an English-shaped hint renders two verdicts before any help arrives.

## Queued, cross-locale

- **`srCand` row strings for de/fr/es/pt/it/nl** — the engine already supports them; each needs
  two short strings from its own panel.
- **The three rotation rounds and round 7's identical-area decoys** — redesign needs new decoys
  (a real non-rectangle of area 8 has bbox ≥ 9, so round 1's bbox-9 foil would no longer be
  bigger than the match), which is pedagogical design, not a repair to improvise.
- **`hintPickOne` is delivered as a punishment for a non-error** — the shell's `else` branch fires
  the failure tone, the shake and *"Not yet — try again!"* before it reads `hintKey`, so a child
  who taps Check without choosing is treated exactly like a wrong answer. Shell-level.
- **`instruction` names no referent** — "the same number of tiles" as WHAT? All seven inherited it.
- **Doc-vs-code drift**: `mosaic-menders-core.js:57` says "a target + 4 candidates"; `candidates()`
  returns 3.
- ⚠ **Checked and NOT a defect**: `engine-mosaic-menders.js` carries hardcoded English aria-labels
  but is loaded only by `game-preview.html`, never by the activity. The linguist first filed it as
  dead code, then self-corrected to match what I had independently measured.

# sv #14 — `pond-juice` 3.MD.A.2 (`eb252618`) + an sv leak gate (`bc73b3b9`)

`Ebbas saftkiosk` / `volym-lasa-av-matglaset-ak-2`. Reading a graduated scale; volume in
deciliter. prose 73 → 74. de #14 = `e999987b`. **GRADE `sv:'2'`; STRAND `Geometri (mätning av
volym)`.**

**(sv #15 shipped — see the section at the end of this file.)**
sv #1–#14 done, prose 74.

## ⛔⛔ THE MASCOT COULD NOT SHIP — and three panels found it independently

**"pippa" is a well-established vulgar Swedish verb meaning to have sex.** The pedagogue flagged
it as the ONE item it wanted a second native to confirm before it entered a commit; the linguist
and the content panel each reported it **unprompted**, without sight of each other. It is the
`bana`→`banan` / `bäck`→`bäcken` class one level worse — not a definite form hiding in one
string, but the name, in the title, the page title, the slug, and spoken by TTS every round.

Two further reasons either of which would have forced it anyway: `Pip` ships in Swedish (*Pips
stapelskog*, åk 2) one syllable away, and ⭐ **the source file's own Dutch note records that Pip is
ALSO a frog** — which is why nl renamed this same mascot to *Fenna*. Per-locale renaming is
precedent on this exact activity.

⭐ **Two of three panels independently proposed the SAME replacement, `Ebba`.** The content panel
proposed *Frida* and rejected *Ebba* over the echo of *ebba ut* — an objection the linguist had
already considered and disposed of. 2–1 with the objection answered. Rejected lists worth
keeping: **Kajsa** (Kajsa Anka is Daisy Duck — and there is a DUCK customer here), **Kvack** (the
duck sound; frogs say *kväk*), **Plums / Iris** (already end in -s, so no genitive), **Vippa /
Doppa / Kväka** (verbs).

⭐ **`saftkiosk`, not `saftstånd`** — two panels independently flagged that the simplex *stånd*
carries a vulgar reading and both offered the kiosk swap. Having just renamed for that exact
class, taking the smaller risk was the only consistent choice. ⭐ `saft` is right and Swedish is
luckier than the other six: it is the squash a child gets at a pond-side stall, not fruit juice.

## ⚠⚠ Deciliter, not liter — unanimous, and it costs nothing

The scale runs 0–10, so at litres a bee orders **four litres of squash from a ten-litre bucket**,
and all six other locales shipped the bucket. 0–10 dl is exactly one litre — a real Swedish
måttbägare — and dl is core Swedish kitchen and åk 1–3 vocabulary. ⭐ **Every scale and level is
numerically unchanged**, so the standing rule that numbers stay locked to the on-screen apparatus
is untouched; it is a pure unit relabel.

⚠⚠ **AND `{u}` IS A TRAP.** Line 191 resolves it `it ? unitIt : es ? unitEs : pt ? unitPt :
unitFr` — **the default arm is FRENCH**, so any locale that put a `{u}` in its strings without
also being added to that chain silently gets the French pluraliser. en/de/nl survive only because
their strings contain no `{u}`. Swedish bakes the unit in literally (as de and nl do), which
*removes* the failure mode rather than patching it.

## ⚠⚠ 65 `LANG ===` comparisons across 11 lines — the most locale-entangled activity yet

Every one falls through to English silently. ⭐ **Four of the eleven only ever surface in SPEECH or
an ARIA-LABEL**, never in visible text, so a gate reading `textContent` would miss them. The new
gate (`bc73b3b9`) collects three channels — rendered text, every aria-label, and everything passed
to `LCSAudio.speak` (reusing the hook the harness already installs). It went from **27 fires to
clean**, and its non-vacuity check earned its place immediately: run before any Swedish existed it
reported *"only 0 string keys differ from en — the leak check would be near-vacuous"*, the
string-derived half honestly declaring itself inert rather than passing quietly.

## Grammar rulings

⚠ **`WORDS_SV[1] = 'en', NOT 'ett'`** — the **mirror** of the German *ein/eins* note in the same
file, which makes it easy to get backwards: German says *eins* counting aloud and *ein*
attributively; Swedish says *ett* counting aloud and *en* before an en-word. Verified at all three
use sites; every one is followed by the unit noun.

⚠⚠ **`CUST_L10N_SV` is NOT uniform.** Dutch is (`Een libel` … `Een bij`) and copying that shape
ships an error: **`bi` is NEUTRUM → `Ett bi`** (biet, bin, bina — the short neuter-animal class
with lejon/får/svin). Eight of nine are utrum.
⚠⚠ **`and` REFUSED for the duck**: the definite of *and* is **`anden`**, identical to the definite
of *ande* = spirit/ghost. `anka` is also the child's word and already shipped in
`measurement-bench.js`.

⚠ **Vessel `mätglas`, not `måttbägare`.** VERIFIED: `measurement-bench.js` ships `kannan` and
`den höga bägaren`, so *bägare* is a claimed APPARATUS name — and unlike sv #11's round-data nouns
this one IS an apparatus name, so the rule bites. ⚠ `mätglas` is NEUTER, hence `Det här!` and
*vilket* mätglas; the German `Der hier!` (masculine *Messbecher*) or a Dutch de-word would ship an
agreement error.
⚠ `skala` is also the verb **"to peel"**, in an activity full of fruit — so it is always *läs av
skalan*, and no bare imperative *Skala…* appears anywhere.

## ⛔ Two cross-locale defects found and fixed for Swedish

1. **The win line praised the wrong act, in all seven locales.** The core's own docblock says the
   READING is judged and the pour never is — but `win` said *"just right!"*, which names a match
   with the **order**, and the three estimate rounds are built so the order and the actual level
   deliberately disagree (6→5, 4→5, 7→6). At the exact moment the child does what the activity
   teaches, the praise told them the pour hit the order.
2. **Both compare buttons carried the SAME screen-reader label.** Line 244 is inside the cups
   `forEach`, so every pick button got the identical constant (*'ce verre en a plus'*, *'este vaso
   tiene más'* …). Two buttons making the same claim about two different glasses: unusable, and on
   one of them a plain statement of the answer, in four of nine rounds. Swedish **identifies
   rather than judges** (`välj mätglas 1/2`) using the loop index already in scope; the other six
   keep their label, so nothing regresses.

## ⚠ My brief was wrong again, and a panel corrected the corpus claim back at me

- I told the linguist *"there is no separate core"*. There is: `pour-measure-core.js`, loaded by
  the activity's HTML, holding the whole answer derivation. Corrected mid-flight. **Third session
  running** in which I described the artefact from memory instead of from the artefact.
- ⭐ **`practices` are INFINITIVE PHRASES, against my brief.** The content panel measured the
  shipped corpus and I re-measured: **291 of 299** shipped Swedish practices strings carry no
  final period, because the array renders as a bullet list under *"Vad ditt barn övar på"*. The
  panel was right and the brief was wrong.

## Verified NOT defects — the discipline that keeps paying

- **The order/actual mismatch is deliberate and already gated** — the harness asserts it in its
  own words (*"the ORDER numeral is WRONG"*). Only the win copy was wrong.
- **The `reward: {id,label}` block is dead here** — `lcs-shell.js` never reads it, and its one
  consumer `game-collection.js` is loaded by `collection.html`/`game-preview.html` only.
  ⚠ Still worth filing: that consumer does `l[i18n.current] || l.en || reward.id` on what all
  **18** declaring activities write as a **bare string**, so wherever it *is* read it renders the
  raw id in every locale, English included.

## Queued, cross-locale

- **The compare aria-label** for the other six locales, and **`win` praising the pour** in all six.
- ⚠ **`beakerSVG` is `aria-hidden="true"`**, so on the four compare/diff rounds the *entire board*
  is invisible to a screen reader — the two levels and the two `scaleMax` values exist nowhere in
  text. And `facts()` hard-codes `scaleNumbersLegible: true` and `levelHiddenDuringPour: true`, so
  no gate can notice.
- **`hintKey` returns `'instruction'` unconditionally**, so on a compare round the child is told
  to pour on a screen with no pour button.
- **Two customer emojis are the wrong animal** — dragonfly is 🪰 (a housefly) and newt is 🦎 (a
  lizard). Confirmed in the render.
- **Round 3's second scale is numbered by fives with juice at an unlabelled 8**, so the child
  compares a printed 7 against an unprinted 8 — in a band-2 round. Confirmed in the render.
- **Four of seven page_intros are outside the 120–170 band** (en 321, es 249, it 665, nl 176).


---

# sv #15 — `tally-squirrel` 2.NBT.B.6 (`c9da0418`)

`Kurres ekollonkorgar` / `addera-flera-tvasiffriga-tal-inom-100-ak-2`. Adding two to four
two-digit numbers within 100. prose 74 → 75. de #15 = `a1872347`.
**GRADE åk 2 and STRAND `Taluppfattning och tals användning` — NO override for either**, verified
already mapped in `strand-names.ts`. Unlike the measurement family this NBT auto-map is a real
Lgr22 heading word for word.

**(sv #16 shipped — see the section at the end of this file.)**
sv #1–#15 done, prose 75.

## ⭐⭐⭐ THE INSTRUCTION STRING IS INVISIBLE TO EVERY CHILD, IN EVERY ACTIVITY

`lcs-shell.css:261` — **`.lcs-app.embed .lcs-instruction { display: none; }`**. The activity route
renders the tool in an iframe with `embed=1`, which is how every child meets it, so the
`strings.instruction` of all ~204 activities never reaches a reader. It survives only as the app
container's `aria-label` (shell line 455) and in the standalone view.

I found this because two panels reported that the prompt asks *"how many acorns"* over baskets with
**no acorn drawn anywhere in the file** (verified: the renderer defines exactly `squirrelSVG` and
`basketSVG`, and the render shows empty baskets). My repair was to state in the INSTRUCTION that the
numeral on each basket says how many — and that sentence would have been seen by nobody.
⭐ **The prompt is the only child-facing text.** Any copy fix aimed at a child must land there.

⚠ **And the prompt could not absorb it.** The sweep measured `ctrlBottom=629` against a 640-tall
viewport at 320×640 — **11px of headroom** — so a third prompt line breaks FITS. The lengthened,
honest prompt was therefore NOT shipped; the acorns-not-drawn issue is filed as an EN-source defect
across all seven locales instead.

## ⭐⭐ THE ACCIDENTALLY-CORRECT FALL-THROUGH, TWICE IN TWO ACTIVITIES

The spoken read-out is `addends.join(<operator>) + <question>`. Swedish fell through to `' plus '`
on the join — **which is correct Swedish** — while the appended question fell through to ENGLISH.
The half that works is what stops the half that does not from looking broken. Same shape as the
`place-value-regroup` defect one activity earlier.
The sv join arm is now written **explicitly even though it is byte-identical to the default**, so it
is a decision rather than an accident.
⚠ The voice tag is not cosmetic either: the line carries **bare digits**, so under `en-US` the
synthesiser reads 23 as *"twenty-three"* — the numerals themselves come out English — and the
activity auto-speaks 320ms after every render, so that is a Swedish child's first contact.

## ⭐ Mascot Tally → Kurre, and the third panel's proposal was a collision

`tall` is the **pine**; the acorns come from **ek** (oak) — a split this catalogue already teaches in
Swedish, since `graph-it` ships `acorn:'ekollon'` beside `pinecone:'kottar'`. Plus the live
`Tillys band` (seriation, åk 1) is one vowel away. **Two of three panels independently said Kurre**
(the traditional Swedish squirrel name, genitive `Kurres`, bare -s). Rejected: **Snurre** (= Bugs
Bunny in Swedish), **Kotte** (wrong tree), **Nöt** (*ett nöt* = a blockhead).
⚠ The third panel proposed **reusing `Pip`** because `graph-it` sv already reads *"Ekorren Pip har
burit hem löv, bär, ekollon…"* — the same species collecting the same acorns. Verified true, but
`Pips stapelskog` is a **shipped Swedish activity**, so that is a mascot collision, not a fix. Its
own author flagged the uncertainty and named a fallback. **Fourteen sessions of practice say one
mascot per activity.**

## ⭐ A code fact outranked the panel majority, again

The pedagogue's hint used an em dash. `lcs-shell.js:880` announces `tryAgain + ' — ' + hint`, so a
dashed hint yields **three dashes in one spoken line**. The linguist's comma form shipped. Same
resolution shape as sv #8, where two panels disagreed and a code fact settled it.

## ⚠ My own measurements, wrong twice more

- **The `Kurre` free-check matched Danish `konkurrence`.** A case-insensitive grep reported two
  hits in `mini tools/`; printing what it matched showed both were that substring. The `halva`
  trap again — **print what the selector matched before believing the count.**
- **I briefed the panels with the manifest `page_title` as the in-app `strings.title.en`.** The real
  one is *"Tally the Squirrel"*. **Fourth session running** describing the artefact from memory
  rather than from the artefact; a panel caught it, as one did the last three times.

## ⚠ Tooling

- `visual-qa-activity.js` takes **`--activity=`** (singular). `audit-activity-mobile.js` takes
  `--activities=` (plural). Passing the wrong one to visual-qa prints usage and exits — harmless;
  the reverse is the dangerous one (mobile silently runs the whole catalogue).
- A probe script in the scratchpad **cannot resolve `puppeteer`** — node resolves from the script's
  own directory. Copy it into `scripts/` and delete it after.

## Filed, not built (EN-source, all seven locales)

- **No acorn is drawn anywhere**, yet `instruction` says the squirrel fills the baskets with acorns
  and `prompt` asks how many acorns. Both panels found it independently.
- **`hint` and `practices` teach two incompatible methods as one** — sequential accumulation vs
  place-value partitioning. **es and it shipped the contradiction verbatim**; de/fr/pt/nl silently
  fixed it. Swedish teaches partitioning only.
- **`about[0]` claims rounds grow from two baskets to four.** Band 3 runs four, then TWO, then four,
  and the per-session reshuffle means there is no fixed order at all.
- **The carry is never mentioned**, though five of the nine rounds cross a ten — the whole reason
  this sits at åk 2 rather than åk 1. Swedish names it in `about[2]`, `practices[3]`,
  `learningGoals[2]`.
- **`page_intro.en` carries the raw CCSS code** in prose.
- **The read button's `aria-label` hides its own visible label** `23 + 14 = ?` (WCAG 2.5.3).
- **Tally has no stated gender in the source**, so all seven locales guessed independently
  (nl *zijn*, it *lo scoiattolo*). Swedish uses no pronoun at all.
- Below `@media (max-height:640px)` the squirrel AND the basket art are `display:none` — deliberate
  and load-bearing for FITS at 320×640, not a defect.


---

# sv #16 — `sharing-jar` 1.OA.D.8 (`12c865b4`) + two fixes it forced (`cd65abb6`, `ea281794`)

`Den rättvisa pärlburken` / `gor-det-rattvist-lika-manga-i-burkarna-ak-1`. Pim and Bo, jars of
beads, five question shapes, numbers ≤12. prose 75 → 76. de #16 = `965c841d`.
**GRADE åk 1 (no override); STRAND overridden to `Taluppfattning och tals användning`.**
**25 string keys** — the largest of the fan-out — plus a `WORDS_SV` table and 3 LANG chains.

**(sv #17 shipped — see the section at the end of this file.)** ⚠ That de build carried a
per-activity GRADE override (→ Klasse 2), and MEMORY already flags an earlier bundle-bot grade
ruling as *possibly mis-graded* — so the grade is a live question for the pedagogue, not a formality.
sv #1–#16 done, prose 76.

## ⭐⭐⭐ A GATE I WROTE AND SHIPPED DERIVED ITS EXPECTATION FROM THE FILE IT WAS CHECKING

The sv leak gate built its probe list as `keys where S[k].en && S[k].sv && en !== sv`. **A key with
no Swedish was therefore excluded from the list of things to look for** — deleting an sv string
deleted the assertion that would have caught it. Poisoning found it: stripping sv `prompt` left the
gate GREEN while the English rendered on screen.

This is the recorded *marks-its-own-homework* shape, and it is worse than a missing assertion
because it **reports success**. It shipped in the tally-squirrel gate at #15, where 28 genuine fires
made it look trustworthy. Now derived from `en` alone, excluding only keys whose Swedish is
deliberately identical (the names).

⭐⭐ **And a second, independent hole in the same probe:** it kept only words longer than three
letters and joined them, so *"Make it fair!"* became `"Make fair"` — **a string the page can never
contain**, because the discarded short word still sits between them on screen. That assertion was
structurally incapable of firing for any English string with a short interior word. Now it searches
for a CONSECUTIVE run, splitting on ICU placeholders first (a whole-string needle fails for
`had {n}`, which renders as "had 7").

⭐ **One poison is not enough.** Poisons 1 and 2 (the two speech chains) were caught immediately and
would have left me satisfied. Only poison 3, on the third channel, exposed both holes.

## ⭐⭐ FIXING ONE THING MOVED THE BURDEN ONTO SOMETHING UNFIT TO CARRY IT

All three panels independently found that the `restore` round **drew its own answer**:
`ghost: reconcile ? 0 : u` rendered `u` faded-but-countable beads during the DECIDE phase, so
`give-it-back` (s=7, r=4) showed 4 solid and 3 ghosts and the child tapped 3 without subtracting.
No gate could see it — `biggerCountRenderedDuringDecide()` inspects only `tier` and `facts()` has no
field for the ghost layer. Fixed in `cd65abb6` with a gate that asserts non-vacuity first, then
0 ghosts **and** that the badge still states the given.

⭐⭐ **Then the visual critic measured that badge at ~11px and 3.0:1 — the least readable thing in
the frame.** My fix had made it load-bearing: it is now the ONLY honest source of `s`, and on r8 the
jar numeral is hidden as "?" while the target sits in that same pill, so the two things needed to
solve the round were the two least legible things on screen. **Removing a crutch obliges you to
check what now carries the weight.** Badge raised to teal at 12–15px; the bridge "?" (1.89:1, read
as a missing glyph) darkened alongside it.

## ⭐ THE KEYPAD DISAGREEMENT FROM #15 — RESOLVED BY MEASUREMENT, AND MY GATE WAS RIGHT

`visual-qa` said `tap=44`; the #15 critic said the shell keypad keys were 32 × 37 CSS px, under the
36px floor. Measured directly by surfacing the gate's own hidden field: **11 keys, minimum box 37px
at 360** (39 at 320, 54 at 768). The gate is NOT vacuous — it found the keys and measured them — and
`KEYPAD-TAP` correctly stayed silent because 37 > 36. The critic's 32 is a pixel→CSS conversion
error; **the QA screenshots are DPR 2** (a "360-wide" render is a 720px PNG).
⚠ Worth knowing: 37px clears the K-2 floor **by one pixel**. Raising it means touching the protected
shell, and moving a threshold is banned, so it stands — but it is that tight.

## ⭐ The strand ruling, and why the sibling had to move with it

Lgr22 åk 1–3 files *"obekanta tal och hur de kan betecknas med EN SYMBOL"* under **Algebra** — a
REPRESENTATIONAL bullet, glossed by Skolverket as the öppen utsaga with an empty box. That is the
sibling `match-pairs.find-the-missing-number.1-oa-d-8` ("Hitta det saknade talet"), not this: this
renders no likhet, no likhetstecken, no ruta, and is a **räknehändelse** → the Taluppfattning bullet
*"de fyra räknesättens egenskaper och samband samt användning i olika situationer"*.
Measured: across the sv landings **`Algebra` occurs ZERO times** against 656 for Taluppfattning.
⚠ The sibling had NO sv override and so rendered `Algebra` for the same standard — overriding only
one would have shipped a knowing inconsistency, **so both got the key in the same commit**.
`numbers-court` (1.OA.D.7) is deliberately untouched: that one IS likhetstecknets betydelse.

## ⭐ Pim and Bo KEPT, over the linguist's dissent — settled on a fact, not a vote

The linguist ruled rename (→ `Sigge`): `bo` is a verb whose imperative can open a sentence (a
garden path for an åk-1 decoder) and a container word in a container game. The pedagogue and the
content writer, both native, read *"Bo gav bort tre"* as unambiguous and the name as authentically
Swedish. **What settled it was a fact the linguist itself surfaced:** Pim and Bo are a
SHARED-UNIVERSE pair across four activities (`sharing-jar`, `domino-two-part`, `echo-grove`,
`pim-comma-mail` — the last named after Pim in its slug). So the `bos-berry-pantry` overlap I
raised mid-brief is **not a collision but the same character by design**, and renaming would oblige
every future Swedish session to rename in lockstep plus patch `friendSVG`'s hardcoded aria-label.
Dissent recorded rather than buried.

## ⚠ My own measurements, wrong twice again

- **`grep -c` counts LINES, not occurrences.** It reported 23 sv strings where there were 25,
  because `pim`, `bo` and `fairBridge` share source lines — and I briefly believed a restore had
  failed. The `konkurrence` lesson from #15 in a new dress: print what the tool actually matched.
- **The key count is 25, and BOTH panels said 23/24** — as did I, because a `sed` range clipped four
  reveal keys. Three sources agreeing is not verification when they share a method.
- ⚠ A probe script in the scratchpad **cannot resolve `puppeteer`**; and my probe's
  `.catch(() => {})` silently swallowed a mount failure and reported `keys=0` as if measured — the
  silent-no-op trap, in my own throwaway code.

## Filed, not fixed (English-source, all seven locales)

- `lookAgain` re-poses a DIFFERENT question in 4 of 5 schemas, naming a character not on screen.
- `qReduce`/`revealReduce` promise "each has {T}" where the schema renders one jar.
- `hintZero` and `fairBridge` are DEAD in seven locales (`hintKey` is a constant; `_bridge` uses
  literals). The Dutch panel deliberated over `fairBridge` in a committed comment — a native expert
  spent judgement on a string that never renders. Swedish is authored for both anyway, with
  `hintZero` rewritten so it would not leak the answer if ever wired.
- `friendSVG` hardcodes `aria-label="Pim"/"Bo"`, ignoring `api.t()` — harmless while Swedish keeps
  the names, latent for any locale that renames.
- The **ceiling tier is unsolvable for a screen-reader user**: the numeral renders `?` by design and
  the beads are `aria-hidden="true"`.
- The characters' silhouette encodes MOOD, not identity (eared/smiling vs earless/frowning), so head
  colour is the only stable way to tell Pim from Bo; and the frown attaches to having less.
- At 1024 the apparatus never grows — the keypad is wider than the thing being counted.


---

# sv #17 — `bundle-bot` 1.NBT.B.2.a (`acc9d3f8`) + an engine/gate commit (`b1a818e3`)

`Bults buntmaskin` / `tio-ental-blir-ett-tiotal-och-tillbaka`. Making and un-making a ten.
prose 76 → 77. de #17 = `1db414aa`. **GRADE åk 2 (sv override); STRAND no override.**
**24 keys + a `numWordSV` FUNCTION + 7 LANG chains** — the most code-heavy of the fan-out.

**(sv #18 shipped — see the section at the end of this file.)**
⚠ That de build needed a per-activity **Daten** STRAND override, so the sv strand is a live
question — and my measurement family (`Geometri (mätning av …)`) may or may not be the right home
for data. sv #1–#17 done, prose 77.

## ⭐⭐⭐ TWO POISONS SURVIVED BECAUSE THE GATE DROVE PAST THE STRINGS IT TESTED

The sv leak gate went green while (a) the sv `qImpostor` string was deleted and (b) `numWordSV` was
removed. Neither is subtle — both would put English in front of a Swedish child — and both survived
because of how the gate DROVE the activity, not what it asserted:

- it clicked the lever first, which sets `this.msg` and **replaces the question in Bolt's bubble**,
  so the q-strings were never on screen when the text was sampled;
- it set `cstate` directly and clicked Check, but `_win` is reached **only from the activity's own
  handlers** (`_feed`/`pullLever`/`unbundle`/`_removeOne`) — `isCorrect()` merely reports
  `this.solved`, which `_win` sets. So the win line never rendered, and the win line is the ONLY
  place the number word appears.

Fixed by sampling **three states per round** (question · refuse · win) and landing the win through a
**real action**: park one loose cube ABOVE the solution and remove it. ⚠ Feeding one does not work
uniformly — the overfill round's clump feeder adds three at a time, so a feed overshoots and that
round alone never won. **A gate can assert the right thing and still never see it.**

## ⭐⭐ AN ASSERTION THAT COULD NOT FAIL, ABOUT A THING THE CORE CANNOT SEE

`bundle-machine-core.js:85` writes `scatterNotCleanTenFrame: true` as a **literal** and
`verify-bundle-machine-core.js:69` asserted `f.scatterNotCleanTenFrame === true` — a literal
compared to itself through one indirection, green on any codebase. And the claim is about the
**view**: whether ten loose cubes form the canonical 5×2 is-it-ten scaffold. It was **false in
practice** — the CSS was `repeat(5,1fr)`, so one Tidy tap built exactly that, and the impostor
round's seeded 9 tidied to 5+4, visibly one short, making the round whose whole cognition is
*count, don't eyeball* solvable by eyeballing. The vacuous assertion is gone and the claim is now
measured in the DOM harness, scattered and tidied, poison-tested.

## ⭐⭐ I BUILT THE OBVIOUS FIX, MEASURED IT, AND IT WAS WRONG FOR THIS SHELL

`promptKey` was hard-coded so the banner said "Bundle the tens!" on every round while Bolt's bubble
could say the opposite. Pointing it at the cog's own question is the obvious repair — and the shell
renders the prompt as a **large display banner**, so the un-bundle question wrapped to THREE lines
and pushed Check off the bottom at 1024×900 and 1366×900 (**ctrlBottom 799 → 909**, visible in the
render I read). Emptying the bubble did not recover the height. Reverted, with the measurement
recorded in-file, and the newly-dead `Q_BY_COG`/`qKeyForCog`/`promptArgsFor` removed rather than
left behind — that would have been the `_peekClump` defect this very commit criticises.
⚠ **`hintKey` cannot take the placeholder-bearing keys at all**: `lcs-shell.js:878` is a bare
`api.t(hintKey)` with **no interpolation**, so qUnbundle/qDecade/qReadState would show a literal
`{n}`. Only `impostor` and `overfill` were fixable; the other three need new placeholder-free hint
strings in eight locales.

## ⚠ AND MY OWN GATE REIMPLEMENTED THE THING IT CHECKED

The hint check copied the cog→key map into the test, so poisoning the tool's real `hintKey` changed
nothing and the poison **survived** — the gate was testing its own copy. Now it reads the tool's own
`task.hintKey()`. The recorded #44 lesson, walked into anyway.

## Other engine defects fixed (all seven locales, `b1a818e3`)

- **The ten-rod drew ELEVEN bands** — rod y=3…89 with ten interior lines at y=11,19,…,83 cuts it
  into eleven segments, in an activity whose entire subject is ten. Nine lines now.
- **The `overfill` cog was inert** — `_feed` hard-coded one cube, so `clumpSizes:[3]` did nothing and
  the child could never overshoot ten; that round was mechanically a build round. ⚠ Scoped to the
  overfill cog ONLY: the core docblock says "clump-feeder drops 1-3 at a time" while the activity
  carries a comment asserting one-by-one, so restoring clumps everywhere would reverse someone's
  decision across seven locales.

## The Swedish rulings

**GRADE åk 2** — `unbundle 32 → 2 tiotal och 12 ental` settles it; coexists with the parent standard
at åk 1 because there the ten already EXISTS and here the child MAKES it. **MASCOT `Bolt` → `Bult`**
(2 of 3 panels): collision was never the risk — to a Swedish 7-year-old `Bolt` is Disney's dog or
Usain Bolt, so the fastener pun is **invisible**; `bult` restores it. **Verb `bunta ihop`** —
`växla` is owned by place-value-regroup and means *exchange*, `gruppera` by place-value-activity.
⚠ **The fence's real collision was on the TOOLS surface**, which my brief missed: `place-value-lab`
owns the slug `tiotal-och-ental` and `counting-cups` owns `bunta-i-tiotal`. This page owns
**reversibility**. ⚠ Never `en tia` (a 10-krona coin); `tiotal` never bare after a verb
(`ett tiotal X` = "roughly ten X").

## ⚠ VISUAL-QA IS NOT GREEN HERE, AND IT IS NOT THE SWEDISH

Swedish matches the English **pre-change baseline exactly** — 24 TAP failures, identical
distribution, zero cut-offs — established by stashing my edits and re-running, so the build
introduces nothing. The failures are the **manipulative pieces**: `.bb-cube` renders **13×13px** at
narrow widths (base 22–28px) and `.bb-bar` 15–20px wide, against the gate's 44px control floor
(`fallbackControls` selects every non-shell `<button>`). Twelve cubes at a finger-sized 44px cannot
fit a 320px tray, so this is a layout redesign, not a `min-height` bump like #15's. Pre-existing in
all seven locales. **Filed with the measurement, not papered over and not silently accepted.**

## Filed, not fixed

- The banner/bubble contradiction (above), and hints for unbundle/decade/read-state.
- **`win` is true on 1 round in 9 in all seven locales** — eight end with 2–9 loose ones drawn on
  the same screen. Swedish does not calque it.
- `qReadState` prints the answer to the round named *read-state*; `qUnbundle` states target form,
  operation and what to tap, then wins in one tap.
- The `make` regex leaves debris: es `'¡Forma {n}!'` → `¡Forma`, fr `'Fabrique {n} !'` → `Fabrique !`.
- English names the robot twice — `title.en` "Bundle Bot" vs `qReadState.en` "Bolt".
- `de` is missing from the capitalisation branch though German capitalises sentence-initially.
- Whether clumps should return for every round (44- and 49-tap rounds are the consequence).


---

# sv #18 — `line-plot` 2.MD.D.9 (`c138865e`) + a render fix (`e97824f7`)

`Snäckis strandlinje` / `kryss-pa-tallinjen-vanligaste-langden-ak-2`. Reading and building a line
plot of shell lengths. prose 77 → 78. de #18 = `7b87985d`.
**GRADE åk 2 (no override); STRAND `Sannolikhet och statistik`** (one key on a row that already
carried de/fr/es/pt/it/nl).

**(sv #19 shipped — see the section at the end of this file.)**

## ⭐⭐⭐ THE SECOND STRING TABLE — 8 KEYS VISIBLE, 10 MORE HIDDEN

`strings` holds 8; a separate **`var L`** at the top of the file holds **10 more** (win / winPlot /
winAt / winMode / winNum / nPlot / nRead / srJoin / srPlot / srRead), resolved through a local
`txt()` that falls back **PER KEY** to `L.en`. Authoring only the visible table would have left both
wrong-answer nudges and all three screen-reader descriptions silently English, **and nothing would
have failed**. Found by grepping the whole file for `en: '` instead of reading the `strings` block —
the recorded graph-it defect (a panel once briefed on 9 of 31 strings because the file held three
tables).
⚠ **`L` is module-private and unreachable from the page**, so the leak gate parses its English out
of the SOURCE FILE in node rather than carrying a copy — otherwise the gate would be checking its
own transcription (#44).

## ⭐⭐ THE GATE HAD TO REACH THREE STATES PER ROUND

Ten of the eighteen strings render **only after an answer**: `win*` after a correct tap,
`nPlot`/`nRead` after a wrong one. This is exactly #17's failure, where two poisons survived because
the gate never drove the activity into the states the strings live in. So each round is sampled
three times — question · wrong tap · correct tap — and the gate asserts that the wrong tap and the
correct tap actually CHANGED the screen in ≥8 rounds, or the two post-answer channels are declared
unchecked. Poison-tested on both tables and on the nudge state.

## ⭐⭐ MASCOT: I OVERRODE THE LINGUIST ON REPO EVIDENCE

It proposed `Krysse` (named for the act, *sätta ett kryss*) and rejected `Snäckis` because it "ends
in -s, so no genitive". **The shipped `Mätis trädgårdsstig` contradicts that** — house style is that
an -s-final name takes no second -s. And the content panel found the decider: **`kryss` already
means a WRONG MARK in this corpus' own Swedish** — graph-it ships *"…ger en lugn ledtråd i stället
för ett kryss"*, verified. A verb frame can be controlled (`sätta ett kryss` neutral vs `få ett
kryss` = marked wrong) but **a NAME cannot**, and it is on every screen. → **`Snäckis`**, built like
the shipped `Mätis` (*mätarlarv* → *Mätis*); `snäck-` is zero-hit across 77 sv activities and 61 sv
tools.
⚠ The linguist's objection is recorded, not buried: a `snäck-` name makes the crab share its name
with the objects it measures, whereas `Mätis` echoes its own species. Close precedent, not identical.
⚠⚠ **Never write `får ett kryss` in this activity**, and never put `kryss` in a sentence about a
wrong answer — the prose says *"ett tal som inte stämmer tonas ner"* for exactly that reason.

## ⛔⚠ Two lexical near-misses

- ⛔ **`mussla` is common Swedish slang for the vulva** (and a bivalve — the wrong animal twice
  over). Shells are `en snäcka / snäckan / snäckor / snäckorna`. **Fifth round running** a panel has
  found an obvious-looking term unusable in Swedish.
- ⚠⚠ **`Val:` for "Choices:" — `en val` is a WHALE.** The linguist caught it **in its own draft**;
  on a beach activity a screen reader would have announced *"Whale: 5, 6, 7"*. It is `Alternativ:`.
  The `bana`→*banan* class exactly.
- ⛔ No `kryssdiagram`: Dutch genuinely has *kruisjesdiagram*, Swedish has no such term and
  `punktdiagram` is a scatter plot. Describe the apparatus rather than coin a word no teacher
  searches. ⚠ The tide conceit is dead — the Baltic has centimetre tides — hence `strandlinjen`.
- ⚠ The singular arm is `(LANG === 'sv' && a === 1) ? 'en snäcka'` — **strictly `=== 1`, never
  `<= 1`**: the French arm beside it uses `<= 1` because French takes the singular after zero, while
  Swedish takes the plural (`0 snäckor`). Copying the fr shape would have shipped a new error.

## ⭐ Two render defects fixed (`e97824f7`), and the gate could not see either

- **The ✕ marks could not be counted — the one thing the activity asks for.** Glyph `font-size 15`
  stacked at pitch `i * 14`: **the pitch was SMALLER than the glyph**. Measured 15.5px marks with
  4.0–4.5px gaps at 768, and **8.5px marks with 2.5px gaps at 360**, so a three-stack fused into a
  braided ribbon. The critic needed 3× magnification to prove they do not touch. Now glyph 17 at
  pitch 20; headroom checked (baseY 76 in a 102/116-unit box, tallest stack 3, top mark 38 → 26).
- **The orange guide ran through the numeral on every plot round** — numerals baseline at
  `baseY+18` (ink ~+8…+18) while the guide ran `baseY+6` → `barY+11`, crossing the digit by
  construction. Now starts at `baseY+21`.
Both verified by reading the 360 render, the worst case for each.

## Filed, not fixed

- ⭐⭐ **A content-free strategy solves 10 of 11 rounds**: `nearNums` starts `out=[a]` and takes
  `a−1` then `a+1`, so **the answer is always the numeric middle of the three cards**. The shuffle
  defeats a positional strategy but not this one. Visible in every render I read. The mode round is
  the exception — and there the mode is always the **largest** card.
- **`_srMirror` computes `dist` and discards it on plot rounds**, so a blind child is never told
  what is on the plot but IS told the new shell's length and the three choices. (The sv `srPlot`
  therefore carries **no `{dist}`** — `txt()` renders an unknown placeholder as literal text.)
- **`howToPlay[2]` states the opposite of the code** — a wrong tap sets `_nonConf[val]` permanently
  and dims the option, so two wrong taps leave only the answer: elimination, not free retry.
  **`howToPlay[1]` tells the child to press a button that is not on screen** (Check is hidden until
  the answer is already correct).
- **EN has no singular branch** → "1 shells!"; **EN is the only locale that strips `cm`**;
  `winMode` over-claims on ties; `moreAB` can go negative.
- ⚠ **es and it `page_intro` claim "sin registro" / "senza registrazione"** — an access claim where
  the tier truth is a limited trial. Swedish does not inherit it.
- The critic's remaining five: the mascot at 32×23px marooned in ~138px of empty card with detached
  artwork; ~120px of dead card below the buttons; the apparatus subordinate to the question text;
  read rounds 1–8 vs plot rounds 0–8; the bar's rounded end cap.

## ⚠ Two of my own framings corrected by measurement
- The **page_title band** I have been quoting is one tail: n=77 gives min 9 · q25 40 · **median 50** ·
  q75 60 · max 90.
- The **120–170 page_intro band is a GATE requirement, not the corpus** — corpus median 163, and
  **41 of 77 sit outside it**.
- ⚠ And **the tool surface collided again, for the third round running**: `class-graph` owns
  *stapeldiagram* in a TOOL slug. Brief the tools, not just the activities.


---

# sv #19 — `hoppers-number-line` 2.MD.B.6 (`1c7336b5`)

`Hoppers tallinje` / `addition-och-subtraktion-till-100-ak-2`. One hop on the number line.
prose 78 → 79. de #19 = `f96dedc1`. **GRADE åk 2 (no override); STRAND `Taluppfattning och tals
användning`** (one key on a row that already carried six locales).

**(sv #20 shipped — see the section at the end of this file.)**

## ⭐⭐⭐ THE SECOND LOCALISATION SURFACE WAS IN A DIFFERENT FILE

16 keys live in the JS `strings` table; **9 more live in the MANIFEST** at
`params.rounds[].storyL10n`, resolved by `_story()` as
`(round.storyL10n && round.storyL10n[LANG]) || round.story` — one sentence per round, **both spoken
and displayed**, present for the six siblings and absent for sv. Miss it and a Swedish child sees
and hears English on every round while every string in the JS is perfect.
This is #18's lesson generalised: there the hidden surface was a sibling table in the SAME file;
here it is a **separate file**. ⭐ **Ask where the rendered text comes from, not where the strings
table is.**
⚠ And a `grep "en: '"` under-counts this file by two — `title` and `sayWait` are double-quoted
because their English carries an apostrophe. Caught by cross-checking the key count against the grep
count, exactly as #18's hidden table was.

## ⭐⭐ THE ROSTER CHECK I HAVE PRESCRIBED FOR SIX ROUNDS IS INCOMPLETE

I told the linguist to grep `page_title.sv` across the manifests. `skipcount` returns
*"Hoppräkning 5, 10 och 100"* — no mascot — which reads as **"Hopper is free"**, and it had a rename
shortlist drafted on that basis. The sibling's **strings table** ships `sv: 'Hoppers näckroshopp'`
and *"Hjälp grodan Hopper att hoppräkna…"*: **the page_title had dropped him for SEO.**
**→ The mascot roster grep must cover the JS strings tables, not just `page_title.sv`.**
⚠ Swedish already carries **three frogs** — Hopper (skipcount), **Grodan Lily** (`ten-stones`, the
closest fence) and **Grodan Ebba** (`pond-juice`, mine from sv #14). English cannot see the Lily
collision because *Lily* and *lily pad* are the same word there. Renaming Hopper would not touch it,
so `Hopper` is KEPT (unanimous).
⚠ **A binding sibling ruling I would have violated:** `skipcount-activity.js:138` requires
**`näckros`, never `näckrosblad`** — *blad* is the product's word for a printed sheet in five tools.

## ⭐ The pedagogue refused a pattern, and withdrew an argument

- **Refused the "+1 Nordic shift".** All three existing sv grade overrides sit one year above the
  manifest; read mechanically that is a rule and would put this at åk 3, where 30+40 is revision.
  Each is a content ruling that *happens* to land one above. Grade stays åk 2.
- **Withdrew its own argument after checking**: it wanted the strand to separate this from the
  skip-count sibling, then found both resolve to the same sv string. Recorded rather than quietly
  dropped.
- ⭐ **The differentiation was handed over by the shipped Swedish copy itself.** `ten-stones` says
  the child goes *"först fram till guldstenen vid tian, **sedan** resten av vägen"* — **två hopp**.
  This is **ett hopp**. åk 1 = två hopp (via tian) · åk 2 = ett hopp · skip-count = många lika hopp.
  That **dissolves** the band-1 overlap I was about to file as a problem: rounds 1–4 are the åk-1
  page's arithmetic done by the new method, so band 1 is a feature.
⚠ The fence: the åk-1 page owns BOTH head terms, and `tallinje` is owned by **four** tools, not the
two I named (`cold-line` and `landing-strip` as well). **Fourth round running the tool surface bit,
third where I thought I had covered it.**

## ⚠ A near-miss: my poison silently matched nothing

The first poison of the JS surface used `sed` with an **emoji in the pattern**; it matched NOTHING,
the file was untouched, and the gate was correctly green. I nearly filed a gate hole that did not
exist. Re-running through python with a **needle-count assertion** made it fail as designed.
⭐ **Verify the poison APPLIED before concluding the gate is blind** — the same rule as verify the
measurement before the defect, one level up.

## Tap targets — measured, partly fixed, partly refused

visual-qa fails **54 of 66** renders on TAP in **both** en and sv, identical distribution, so the
Swedish introduces nothing. I surfaced *which* node was smallest by temporarily printing it from the
gate, having inferred the wrong control twice from the CSS alone:
`320/360 → hnl-tickhit 26x34 · 412 → 29x34 · 768+ → hnl-replay 94x34`.
- **Fixed:** `.hnl-replay` 34 → 44px (a plain chrome button, nothing constrained it), and the tick
  hit-area HEIGHT 34 → 44 with its transform moved to match.
- ⛔ **Refused:** the tick hit-area WIDTH. Every round has exactly **11 ticks**, so at phone width the
  neighbours sit **~28px apart** — a 44px hit area would OVERLAP them and a tap near a boundary would
  select the wrong start, silently corrupting the one field the core grades most strictly. I raised
  it, measured, and reverted. **Never contort a layout to clear a threshold**, the mirror of never
  moving the threshold.

## Filed, not fixed

- ⭐⭐ **The render gives away what the core says must be computed.** `numberline-jump-core.js:10`
  says the landing *"must be COMPUTED, not read off"*, but `_renderLine` puts the lily at
  `_pct(land)` while every tick is labelled — the `?` hides the badge numeral, not the position.
  Readable in all nine rounds. Third instance of this shape (bundle-bot's ghost beads, line-plot's
  median).
- ⭐⭐ **The correct hop size is the MIDDLE chip in 8 of 9 rounds and NEVER the smallest in 9 of 9** —
  measured. The fix is in `decoys` only: **pure numbers, so it costs nothing in any locale.**
- **Three false statements about the screen** in the English page copy: no "number line of lily pads"
  (one 🪷, at the landing); no "decoy landing spots" (decoys are hop-SIZE chips; the landing is
  typed); and "hops of 2 and 3 up to 10" is the TICK SPACING — `step` 2,3,2,3,5,5,10,10,10 vs
  `size` 8,12,6,9,20,20,40,50,30, so **no hop is 2, 3 or 10**.
- Scale difficulty runs backwards (band 1 holds the step-3 lines, band 3 only step-10); rounds 7 and
  9 are the same fact commuted; `howToPlay` says "press Check" but the commit control is "Hoppa! 🐸";
  the ⌫ glyph lies (`_clearDial` clears everything); no `aria-pressed` on three toggling controls.
- ⚠ The access claim is live in **five of seven** locales, and `tool-content/sv.json`
  `number-line` metaTitle reads **`Gratis interaktiv tallinje`** — a live free claim on the nearest
  neighbouring page, verified.
- ⚠ `frontend/public/mini-tools/` is a stale gitignored copy that `activities.ts` resolves FIRST, so
  local verification can wrongly suggest the Swedish siblings do not exist.


---

# sv #20 — `plural` L.2.1.b (`ff186b88`) + three defect commits

`Månas pluraldamm` / `plural-av-substantiv-fot-blir-fotter-ak-2`. **The platform's FIRST sv
`Language`-strand activity** (measured: all 79 shipped sv activities were maths or Reading:
Foundational Skills). prose 79 → 80. de #20 = `52f44d45`.
**GRADE åk 2, no override. STRAND `Språkliga strukturer och normer`** added to `strand-names.ts`.

**(sv #21 shipped — see the section at the end of this file.)**

## ⭐⭐ The gate had never photographed anything but an OPENING FRAME

sv#19's critic called hoppers' opening frame *"DISQUALIFYING — the number line is EMPTY"*. It was
the DESIGNED frame (`_renderLine` draws span+lily only once start+dir+size are set). **But the
caveat was the finding:** `visual-qa-activity.js`'s `forceRound()` reloads the FIRST TASK, so every
render of every activity in every sweep is an opening frame. **Census: 86 of 133 activity engines
branch on a phase or a `solved` state**, so no win screen has ever been seen either.
→ opt-in drivers at `scripts/visual-qa-phases/<id>.js`; a step that no-ops FAILS (it must move the
control signature); undriven = WARN census. Written for hoppers (3 phases) and plural (3 phases).
⭐ **My own new gate condemned correct code twice**, both fixed by changing WHAT is measured:
a win screen legitimately has no TOOL control (→ the driver declares `terminal: true`), and
**MIN_TAP=44 is the wrong instrument for a control on a shared axis** — 11 ticks across a 320px card
is 29px edge-to-edge, and RAISING them to 44 makes the real defect worse. Axis controls are now
measured for OVERLAP. ⭐⭐ **Poisoned with the naive fix itself: forcing the ticks to 44px PASSES
`tap=44` and FAILS `AXIS-OVERLAP(19.4px on a 24.6px pitch)`.** That is the whole argument.

## ⚠ Seven hoppers defects the phase sweep exposed (all 7 locales, 0 strings)

Tick hit areas **already overlapped** (pitch 22.5px vs a 26px minimum) — **refuting my own sv#19
note of "~28px apart"**, which is why I refused to widen them then; width is now bound to the pitch
in the SAME UNIT as the tick positions · PAD 7%→3% · the numerals carrying the mathematics were the
**smallest ink on the card** (8.5px below 380px vs a 14px story and 20px chips) · `.hnl-edit` 32px
and `.hnl-key` 40px, both in the DIAL phase, invisible to every gate until now · **`Kontrollera`
live over a completely unset apparatus** (the #39 class; found by reading the 1024 render MYSELF) ·
the size caption 69px off its own chips · **white-on-coral at 2.78:1 on the commit button**, a
standing ban, surviving because it exists only in the DIAL phase · and the win screen printed the
**same sentence twice**. ⚠ **33 activity files ship the same white-on-coral pattern** — filed.
⭐ **RANK CHEAT:** the chips are shuffled on screen so position was safe, but the correct size was
the numerical MIDDLE in 8 of 9 rounds and the smallest in 0 of 9 — "always pick the middle number"
beat the deck 8/9 with no maths, while every other assertion in that verifier passed. Decoys
rebalanced to 3/3/3; new RANK-CHEAT gate, poison-tested against the shipped deck.

## ⭐⭐ Two plural defects that were live in production and are not Swedish

**The screen reader was handed the answer, first, every round, all 7 locales.** `_renderChips` reads
the shuffled `_chipOrder`; `_srMirror` read `Core.chipStrings()` UNSHUFFLED, and **chipStrings[0] is
the correct answer in 63 of 63 rounds**. Same pair fixed in clock-digital 2026-09-08.
**The gate had never read a non-English pool** — 54 localized rounds unchecked since written — and
**Dutch shipped a free win**: `pl-huis` → chips `huizen/huiss/huis`, so dropping everything ending
in `s` leaves exactly one survivor and it is correct. ⚠ Dutch's s→z class is STRUCTURALLY
unhostable (every s→z singular ends in -s) → replaced with `schip → schepen`.
⚠ **Scoping the gate extension WAS the job**: `threeDistinctChips`/`blocksEliminateS` are universal,
but the KNOWN English-forms table, `≥2 rules` and `≥2 no-change` describe ENGLISH morphology —
a naive extension reports six failures of which one is real.

## ⭐⭐ A POISON TEST SURVIVED, AND IT WAS RIGHT TO

Poisoning `L.sv.nChange` changed nothing because that string is **unreachable in Swedish**: with
both error-specific keys authored, a transform round's only two wrong chips are the +s form
(→`nPlusS`) and the bare singular (→`nUnchanged`). Removed as a dead string. It produced two
instruments: a **reachability** check (every authored sv string must be observed RENDERING — which
immediately found two more that turned out to be the GATE under-driving, tapping only the first
wrong chip), and ⚠⚠ an **English-marker** check, because a leak in a key with **no English twin** is
invisible to a probe list built from `en`, and the reachability check reads its expectation out of
the file it checks, so it confirmed the ENGLISH was reached. Marks-its-own-homework, new dress.
Markers exclude `and` (=a duck), `is` (=ice) and `just` (`just nu`) — real Swedish words.
All 8 Swedish surfaces poison-tested, every one caught.

## ⚠ The screenshots had no locale in the filename

An `--locale=en` baseline run **silently overwrote the sv evidence in the same directory**, and I
read an English render believing it was Swedish before noticing. Non-en runs now carry the locale.
**The DoD step "I read the sv renders myself" was defeatable by a filename.**

## Panel rulings (they disagreed twice; both resolved on evidence, not majority)

- **Word list** (pedagogue's nine, machine-verified by me): fot·tand·hand·bok·natt·bror (omljud) +
  sko→skor (ending) + barn·djur (unchanged). ⚠ `mus`/`gås` are **engine-forbidden** (every chip
  ends in -s); `man` is the impersonal pronoun; `får` is the present of `få`; `hus`'s correct
  answer ends in -s.
- ⚠ **The teaching point was REFINED, not accepted**: åk 1–3 does not teach the five deklinationer
  (mellanstadiet) and never says "omljud" — the frame is `en bok – flera böcker`, "does the word
  change, and how?". That reframe is what makes the unchanged chip a live hypothesis rather than
  filler, because Swedish has a large productive zero-plural class.
- ⭐ **The -s claim is scoped to the PLURAL, never absolute.** The pedagogue rejected the Italian
  move: "på svenska sätter man inte -s" is falsifiable (*fans*) AND collides with the **genitive**
  -s the child is being taught — and `fots`/`brors`/`barns`/`boks` are all real genitives, so the
  hard-coded distractor is a real form chosen for the wrong reason. The nudge now says what -s DOES.
- **Mascot `Måna`** — ⭐ the English name is a pun on the wrong thing: `pearlSVG` draws a disc with
  CRATERS, a face and a pond ripple. It is a moon. `Pärla` is unusable (sharing-jar ships *pärlor*
  = BEADS to the same age band). ⚠ The page title carries no mascot, because Tuck/Pim/Bo/Lily/Tap
  all live in a `strings.title` while their `page_title.sv` leads with the skill — the sv#19 trap.
- **Grade åk 2, explicitly NOT a "+1 Nordic shift"**: Swedish åk 1 starts at 7, so åk 2 is already a
  year above Klasse 2.
- **Strand** rejects `Språkbruk` (the pragmatics heading, the plausible calque). ⚠ **PROVENANCE
  RECORDED IN THE CODE: this repo has NO Swedish LANGUAGE-ARTS kursplan text** — the Swedish
  blogposts quote only the MATHEMATICS centralt innehåll and are self-authored marketing.
- ⚠ **Lexicon fence: `ental` means THE ONES PLACE in six sv maths activities** — banned as a
  grammar term. And the spoken sentence is ARTICLE-FREE: `barn`/`djur` are ett-words, so a
  hard-coded "Fler än en" ships "Fler än en barn".

## ⭐⭐ The English source was convicted by all three panels

"the lazy +s" (5 places) — *foots* is rule-governed OVERREGULARIZATION, the sign a child has
ACQUIRED the rule; **not one of the six localizers carried "lazy" across**. The question frame
"More than one foot is…?" is **ungrammatical** and **all six independently rewrote it**. Plus two
calques, `howToPlay` printing the answer *mice*, and `about` claiming "no account" against
`quota.ts PLAYS_PER_DAY = 10`. All fixed (`5a50aa2b`).
⚠ **The test had to change first** — it asserted the prompt with the English inline, so fixing the
grammar FAILED A CORRECT BUILD; it now derives the expected prompt from the manifest.
**FILED:** the activity is called "The Doubling Pond" and **nothing doubles** — and *doubling* is a
live arithmetic term in this catalogue. Renaming touches the product name + hub card + landing
title, so it is an operator call.

## ⭐⭐ The critic verdict — four defects every gate had passed (`f80a9762`)

NOT CLEAN, 6 defects, each verified against the CSS before acting.

⭐⭐ **`.pl-line-msg` was a FIXED `.88rem` with no clamp** while everything around it scales:
measured x-height **7.0 at 360, 768 AND 1024**, against a headline going 9.0 → 23.0. At 768 — the
width a teacher projects — the ranking was headline 23.0 → title 14.5 → singular 12.5 → chips 9.5
→ **KLARA 7.5 → the nudge 7.0**. The grey chrome counter was LARGER than the sentence explaining
the mistake, and a class could not read the correction — the entire point of the round.
⚠ **visual-qa PASSED it**: its NOT-TINY floor is 14px absolute, and 14px clears it.
**A FLOOR CANNOT SEE AN INVERTED HIERARCHY.**

⭐ **One accent meant both wrong and right** — `.pl-line-msg.miss` and `.pl-reveal .pl-plural`
were the same `#C2410C`, one tap apart. Not the banned red/green (a gold ring carries correct),
but unresolvable for a six-year-old. The accent stays with the CONTENT being taught; feedback
drops to the neutral ink — warmer for a no-shame design, and 4.74:1 → ~11:1.

⭐ **The mascot drifted up to 197px from the line it speaks** (`.pl-say` full-width, mascot pinned
left, message centred in the remainder) and was a **fixed 21px at every width**, so its presence
halved exactly where there was room for it. At 6x zoom the drawing is good — none of that was
visible at 21px. A sizing problem, not a drawing problem.

⭐ **The chips were 41% the size of the question they answer**, while the child must discriminate
`fots`/`fot`/`fötter` and `barns`/`barn`/`barnes` — pairs differing by one or two characters.

**Filed:** 43.6% of the viewport empty below the last control at 768 (the stage is taller than its
content and the card is capped at 720 — shell-owned; changing `justify-content` would MOVE the
void, not remove it); and at 360 the tool’s own NAME is larger than the question, because the
shell prompt clamp falls 23.0 → 9.0 while the title falls only 14.5 → 9.5 (protected, and it
affects every activity).

⭐ Measured CLEAN and worth keeping: 0 cut-off across all 81 sv frames, 0 true element overlaps,
every tap target ≥44, no white-on-coral (Kontrollera is white on teal at 6.37:1), and the correct
chip lands A×3/B×2/C×4 across 9 rounds — chance, not a position leak. **The critic corrected two
of its OWN first measurements** before reporting them.

## Filed, not fixed
`lcs-shell.js:879` announces `tryAgain + ' — ' + hintMsg`, and with no `hintKey` **hintMsg IS
tryAgain**, so every such activity announces the retry line TWICE in all 11 locales (protected) ·
`L[*].q` is a dead string in all 7 locales (measured: `txt('q')` is called nowhere) · `this._finds`
written never read · the header still claims "EN-ONLY-by-design (404)" while 7 locales ship ·
the 6-locale error-specific-nudge fill · 33 activity files with white-on-coral · hoppers'
44px tap floor is unreachable at 360 on an 11-tick line (filed with the pitch table, not faked).


---

# sv #21 — `tense` L.1.1.e (`45d66c99`) + two shared-defect commits

`Junipers tidstorn` / `verbets-tempus-datid-nutid-framtid-ak-2`. prose 80 → 81.
de #21 = `1b00767b`. **GRADE åk 2 via GRADE_OVERRIDE** (manifest says 1; all six other locales
already override). **STRAND already existed** — `Language → sv` was added for plural in sv#20.

(superseded — see the end of this file) NEXT was sv #22 — `affix` **L.2.4.b**, de commit `8fbb297f` ("Marigolds Wortmaschine /
Vorsilben & Nachsilben"), which ALSO needed a **`strand-names.ts` Vocabulary→de** entry, so sv will
need `Vocabulary Acquisition and Use → sv`. ⚠ Another rebuild-not-translate: Swedish affixes
(`o-`, `-lig`, `-het`, `-are`, `-bar`) are not German's. ⭐ Its LAYOUT is already sound —
`affix` is one of the 16 fixed in the family commit below. sv #1–#21 done, prose 81.

## ⭐⭐ SWEDISH HAS NO FUTURE TENSE, AND THE ACTIVITY MARKED CORRECT SWEDISH WRONG

Swedish expresses the future with plain PRESENS + a time adverbial — *I morgon seglar båtarna* is
not a near-miss, it is what a Swede says. But `isAnswer` accepts exactly one chip and everything
else is `_nonConf[tense] = 1`: the chip dims PERMANENTLY and a red line fires. The pedagogue:
*that teaches a seven-year-old to distrust their own språkkänsla exactly where their instinct is
right.* Ruled out with reasons — accept it (the page would claim to teach Swedish while its grading
encodes a false statement about Swedish) · swap futurum→perfekt (**would make the CCSS anchor a
lie**: perfekt is not a third point on a timeline, its cues are not time adverbials, and it is
åk 4–6) · find a frame where presens is odd (**none exists**; the pedagogue tested prediction,
intention, distant, involuntary, negation, question, *snart*, *om en stund* AND the inverted task —
`presens ∈ {nutid, framtid}` inherently) · ⚠ use presens AS the future chip — **structurally
impossible, verified**: `facts.formsDistinct` needs three distinct strings.

⭐ **THE FIX IS THE RESPONSE, NOT THE GRAMMAR.** A third response class: a round carrying
`alsoOk` answers that tap with *"Ja, så säger man också! Men leta efter ordet som bara betyder
framtid."* — affirming, ordinary colour, chip NOT dimmed, and it does **not resolve** (accepting it
would mean the child never meets *ska rita*). **0 core lines**; `exactlyOneCorrect` stays TRUE, so
**the gate stays honest instead of being loosened**. Guarded on per-round DATA, not `LANG`, so
**da and no inherit it free** — same property.

## ⚠ The English sentence frame is UNGRAMMATICAL in Swedish (V2)

`'"{tw}, {subj} ___."'` → *"I går, båtarna ___"*. de/nl dodged it by abandoning the sentence.
Swedish keeps it with the adverbial **TRAILING**: `{subj} ___ {tw}.`
⭐ **The panels disagreed and the pedagogue won on the linguist's own reasoning** — the linguist
argued V2 forces the de/nl shape, having considered only FRONTED adverbials. Subject-first satisfies
V2 **and** keeps the blank one contiguous slot for the two-word `ska rita`; fronted, the
construction would have to straddle the subject.

## ⭐⭐ FRENCH CHILDREN HAVE BEEN SHOWN THE RAW TOKEN `{tw}` (`42a07726`)

`txt(k, a)` substitutes only when args are passed and `_nudge` called `txt(key)` with none.
French is the ONE locale whose nudges interpolate, so every wrong tap rendered, verbatim:
*« {tw} », c'est déjà passé…*. Reproduced against the shipped `txt()` first. Fixing it also
removed a forced error for every future locale.
Same commit: **the sr mirror announced a FIXED order while the buttons are shuffled, all 7 locales**
(third instance after clock-digital and plural — here no positional leak, but only 1 of 6
permutations matches) · **the read-aloud button omits the ANSWERS in de/fr/es/nl** while en/pt/it
read them, so the child who cannot read hears a question with no options · a dimmed chip announced
as an ordinary live button.

## ⭐⭐ The gate validated 1 pool in 7, and extending it found a real content gap

`verify-tense-core.js` read `params.rounds` only while printing "PASS — 9 round(s)".
⚠ **The naive extension is worse here than in plural**: `futureWellFormed` (/^will\s/) scores
**0/9 in every non-EN pool** — 54 failures of which zero are real. Now EN-scoped.
⭐ Extending it surfaced: **the French and Italian pools contain NO irregular verb at all**, so "add
the regular ending" wins every past round there. Frozen in `KNOWN_NO_IRREGULAR` (house ratchet),
**self-clearing** — the day either gains an irregular the gate demands its own entry be removed.
New gate: **≤1 distinct `timeWord` per (locale, band)**, since six locales quote it literally.

## ⭐⭐ Yesterday's severe defect was a FAMILY defect — 16 activities (`c616e8be`)

The fixed-`rem` feedback line was never a plural accident: **16 activities** shared it and **15**
the mascot-drift structure. **A FLOOR CANNOT SEE AN INVERTED HIERARCHY** — visual-qa's NOT-TINY
floor is 14px absolute and 14px clears it.
New **`SCALE`** gate. ⚠ **My first design would have been VACUOUS**: the obvious rule ("not smaller
than the chrome counter") fails because the critic measured X-HEIGHT while a gate measures
font-size, and the counter is UPPERCASE — at `.88rem` the nudge is a 14px font against a ~11px
label, so the comparison PASSES the defect it exists for. Gate instead that the region's font-size
is IDENTICAL at 320 and 1366 while the card doubles.
⭐⭐ **Its first real act was to catch MY OWN fix**: the replacement re-emitted a captured `rem/`,
giving `clamp(...)rem/1.3` — **an invalid `font` shorthand, dropped WHOLE and SILENTLY** in all 16
files. The tell was the reported size becoming **16px** (the root default) rather than the old
14.4px. Two more self-inflicted errors the same hour: an "already fixed" guard tested the WHOLE FILE
for `justify-content:center;gap` and silently skipped ten correct files; and I re-pointed the
gate's selector twice by inference before driving the DOM and printing what it had matched — the
selector was right and the CSS was broken.

## Rulings + fences
Labels **Dåtid / Nutid / Framtid** (⚠ *Futurum* implies Swedish inflects a future tense — the very
misconception). 9 rounds 3/3/3, **3 strong verbs** (*"jag springade"* is the real over-generalisation);
⚠ no deponens (a present in -s), ⚠ **no `gå`** — its presens *går* would sit beside the time word
*i går*. **`just nu`** not bare *nu* (both panels, independently). ⚠ **`Vilket ord`, never `Vilken
form`** — *form* reads as a geometric SHAPE in 5 of 6 sv occurrences. ⛔ no `klocka`/`klocktorn`
(four sv clock activities; *klocka* also = bell) → **tidstorn**, joining es/pt/it which dropped
"clock" for *time*. ⚠ `nFuture` never names *ska* — "välj formen med ska" teaches framtid = the
word ska; en/de/nl all make that mistake.

## ⭐⭐ The critic verdict (`a5decc8b`) — and it confirmed both earlier fixes

NOT CLEAN, 9 findings, **none functional**. It measured that both changes landed: the feedback
line is now **1.33–1.73× the KLARA chrome** at every width, and Juniper sits **15.5–33px** from
her line with vertical centres within 2.5px — against the **197px** drift measured in plural.

⭐⭐ **THREE SEMANTICALLY DIFFERENT MESSAGES SHARED ONE INK.** The affirming line and the WIN
line were byte-identical `rgb(20,107,94)`; only an amber chip ring and the Kontrollera button
separated them, so a child tapping presens on a future round had a plausible read of "correct".
**This is the sv#20 finding — one accent, two meanings — INVERTED, and I introduced it while
fixing the original.** Three inks now: coral = not yet · bronze `#7A5A12` = true but keep
looking · teal = right.

⭐ **Two of three window icons had no usable contrast** — moon **1.14:1**, sun **1.50:1**, clock
5.68:1 — and the invisible one is the LIT icon on the past rounds. The lit STATE was never in
doubt (a 2px teal border at 5.84:1 plus fill, ring and bold label); it is the ICONOGRAPHY channel
that was dead, and a projector crushes pale-on-pale. Outlines at 5.67:1 now carry the silhouette.

⭐ **The window labels were chrome-sized** — cap-height 7.5–8.0 at 360 against the passive KLARA
counter at **7.5, identical** — i.e. the three words naming the whole concept rendered at ~10px.

⭐ **The mascot teleported horizontally**, x-origin 497→303→222→368 within ONE round at 1024,
because bird and line centre AS A GROUP whose width follows the sentence. A side effect of my own
centring fix; corrected with a stable message column, **not** by reverting to the left-pinned
layout that caused the original 197px drift.

⭐ Measured CLEAN and worth keeping: **0 overlaps across all 81 sv frames** (tightest vertical
clearance 4.5px at 360 on the three-line affirmations) · no white-on-coral (the only white text is
Kontrollera on dark teal at 5.34:1) · **no saturated green anywhere**, so the brand teal carries no
pass/fail meaning · KLARA reads 0 in all 81 frames including the resolved ones · every tap target
clears 44px except the time-window card at 360 (43.0px, not a control).

## Filed, not fixed
The clock tower is **drawn nowhere** — only the file's own docblock mentions it, and en page copy
inherited it · `howToPlay` describes a check that cannot exist and a retry the code forbids, and
**two wrong taps leave one live chip = the answer by elimination** · `practices[2]` claims
"Forming" on a tap task · English is the only locale claiming Grade 1 · `page_intro.en` is 315
chars (nl 421, it 523) · **"Juniper" names a robin here and a HEDGEHOG in juniper-story-lantern**
(live in en/de/fr/es; pt/it/nl renamed by accident), and a third bird is literally "Robin the robin"
· `G2-275-word-classes.js` declares L.1.1.e in its header (a word-class sorter is L.1.1.b) · four
sv page_intros + four cohort about blocks still carry `utan konto` / `direkt i webbläsaren`.


---

# sv #22 — `affix` L.2.4.b (`cb021bc3`) + four riding commits

`Marigolds ordmaskin` / `prefix-och-suffix-vad-betyder-ordet-ak-2`. prose 81 → 82.
de #22 = `8fbb297f`. **Årskurs 2, no GRADE_OVERRIDE. STRAND `Ord och begrepp`** added to
`strand-names.ts` — the platform's FIRST sv Vocabulary-strand activity.

**NEXT = sv #23** — `sentence-builder` **L.1.1.j**, de commit `b7842370` ("Wiggles baut Sätze /
Sätze bauen"), which ALSO needed a **per-activity grade override** (L.1.1.j → Klasse 2), so sv
must rule on årskurs rather than inherit the manifest. sv #1–#22 done, prose 82.

## ⭐⭐ The handover note's premise about Swedish affixes was FALSE

It said *"Swedish affixes (o-, -lig, -het, -are, -bar) are not German's"*. **All seven have exact
German cognates** (o-/un-, -lös/-los, -full/-voll, -bar/-bar, -are/-er, -het/-heit, -lig/-lich).
The two derivational inventories are near-identical. ⭐ **What actually differs is the ROOTS**, and
severely: every high-value root in the de/nl pools is fenced in sv — `färg` 26, `hjälp` 47,
`hopp` 74, `ljud` 107, `värde` 28, `mening` 12. **The deck cannot be translated from German
because of the WORDS, not the affixes.** Correct the note when it is next read.

**Set = `o-` (MOTSATSEN) / `-full` (FULL AV) / `-lös` (UTAN)**, chosen on the ENGINE's contract:
`facts()` needs a wrong-affix distractor = the meaning the OTHER cog gives on the SAME root, so the
set must be **closed under shared roots**, and `-full`↔`-lös` is the only pair that is.
⚠⚠ **`-are` would have shipped a TRAP** — it is also the Swedish comparative (*snäll→snällare*;
measured **~119 comparative tokens** live on this platform vs ~45 agent nouns), and since `o-`
takes adjectives a which-round on `snäll` would put `o-` and `-are` in ONE cog row with
*snällare* a real word. ⚠ `-bar` strands every round (verb-stem roots, nothing to contrast) and
its root would be a bare stem (*läs*), not a citation word. ⚠ `-het` changes category; ⚠ `-lig`
has no single sense **and sits inside `o-`'s own roots** (olycklig = o+lyck+lig).
⚠ **Three cogs, not four**: the EN deck declares 4 affixes and never renders 4 — all its which
rounds ship 3 — and `cogInner`'s `ful`/`less` glyphs literally SHARE one `cup` path, filled vs
outlined, so it is a designed three-symbol set.

## ⭐⭐ Two panels disagreed on one string and the COMPOSED BYTES settled it

Pedagogue said `INTE`; linguist said `MOTSATSEN`. `winApply` renders `”{label}” betyder {sense}.`
and **`betyder INTE` means DOES NOT MEAN** — the sentence inverts. I composed the strings rather
than take either on trust. ⚠⚠ **de (`bedeutet NICHT.`) and nl (`betekent NIET.`) SHIP that bug**;
the four Romance locales escaped by choosing a noun phrase. Capitals do not rescue it.
⚠ **FULL AV, never bare FULL** — *full* in Swedish reads first as **drunk**.
⚠ **`förstavelse` REJECTED**: it decomposes as *för-* + **STAVELSE**, and this catalogue has spent
**32 strings** teaching that *stavelse* = SYLLABLE. The child would form the rule "prefix = the
first syllable" — and **nothing in the deck would ever contradict it**, because the affix falls on
a syllable boundary in every round. ⚠ `ändelse` rejected too: it means an **inflectional** ending
(the *-r* of *skor*, which the sv plural activity teaches); these are **derivational**.
⭐ **The child needs no morphology term at all** — no shipped locale's `strings`/`L` contains
prefix/suffix/affix; it lives only in slug/page_title/page_intro, which adults read.
⚠ **`vanlig` DISQUALIFIED** (a fence neither of my sweeps found): *"vanliga ord"* is this
platform's **technical term for high-frequency sight words**. ⚠ `smakfull` = *tasteful*, not
"full of taste". ⚠ `hopp` is a genuine homonym (jump/hope) so a child could tap right for the
wrong reason and be positively reinforced. ⚠ **my own `lös` measurement was WRONG** — not 63
solve-verbs but 18 in three senses, and the two dominant ones (*lösa upp* = release, adjective
*lös* = loose) ARE the suffix: the corpus **pre-teaches** `-lös`.

## ⭐⭐ The phase driver found a state nothing had ever photographed

`scripts/visual-qa-phases/` had drivers for 3 activities; every other one is shot in its OPENING
FRAME ALONE. affix now has open/feedback/resolved, and **the resolved phase failed on its first
run**: Check 13px past the fold at 320. Measured cause — sv's win line wraps to 3 lines (55px vs
en 37px) because MOTSATSEN is the longest sense word, and **English sits at 637 against vh 640:
three pixels of slack**. **THE LAYOUT GIVES, NOT THE LANGUAGE** → cog glyph shrinks at ≤340px,
shrink-only, and **all 8 locales re-swept** because it is shared CSS.
⭐⭐ **Then READING THE RENDER myself found what no gate could**: `.af-cand.sel` was declared with
a CORAL ring and applied **NOWHERE** — dead CSS, and the consequence was visible: on resolving the
correct card looked **identical to the untouched one**. Now `.af-cand.ok` in TEAL (coral = not
yet, teal = right).

## ⭐ The gate had read only the English pool — and the naive fix is worse

`verify-affix-core.js` read `params.rounds` only; **six shipped decks unmeasured**, one commit
after `42a07726` fixed exactly this in `tense`. Now 88 rounds / 8 pools with **per-assertion
SCOPE**: ⭐ `wordSpellingOk` passes **only where a locale's affix happens to be spelt like
English** (de's 2 = its `un` rounds, fr/es/pt's 3 = their `re` rounds, it/nl 0) — two numbers
agreeing by coincidence. It is now SURFACE-scoped with a per-locale table, and **sv passes 8/8
genuinely**, the first locale where it means anything. `hasRootDistractor`/`correctNotIndex0` are
HARD for en/sv and a **57-item WARN backlog** elsewhere.
⚠⚠ **A poison must be caught by the assertion it NAMES** — my first three structural poisons also
destroyed the correct option, so they were caught upstream by "could not be derived" and proved
nothing. Now surgical, and the harness asserts the EXPECTED message. 10/10.
⚠ `correctNotIndex0` was guarding a REAL leak: `_srMirror` read `Core.snapshot` (unshuffled)
while the buttons walk `_choiceOrder`, so **the answer was announced FIRST in 9 of 11 rounds in
both fr and it** (4/11 pt). Fixed in the mirror — 0 strings, all locales. 4th instance after
clock-digital, plural, tense.
⚠ **My own order assertion was wrong first**: comparing substring positions reported a false
disorder because *"snäll"* is a substring of *"full av snällhet"* and *"motsatsen till snäll"*.
Parse the list, compare ordered arrays.

## The riding commits

- `341b0b9c` **[de] 17 stranded copulas.** The 2026-09 free-claim sweep deleted a price adjective
  and left `ist` before a finite verb (*"Die Aktivität ist lädt…"*). ⭐⭐ **Its own instrument was
  structurally blind**: "any NEW WORD is a defect" cannot see two already-present words stranded
  together. **The instrument that sees it: the sweep only DELETES, so every new BIGRAM is a seam**
  — 1,978 seams, 223 copula-initial and unattested elsewhere in that locale's corpus, 17 real.
  ⚠ `d2f38789` had already repaired a SUBSET of this class. sv is clean (poison-tested both ways).
  fr (`est se joue`, `est s'appuie`) and es (`es está`) carry it — **their own panels**.
- `b0315feb` **[sv] a Swedish page described an ENGLISH word list** — `tell-words-apart` told
  Swedish parents about *was/saw/of/off* while the pool is *är/var*, *det/den*, *han/hann*. ⚠ The
  panel reported ONE field; the entry-scoped check showed it was still dirty and found **two
  more**. ⚠ **The "baklänges" claim cannot be made in Swedish at all** — no reversal pair exists in
  the pool, so it is dropped, not localized.
- `7b75825a` **[en] the copy described a drag that does not exist** (only `click` is bound; the
  scene draws the finished word), promised unlimited retries (`_pick` kills a wrong option
  permanently), and claimed **L.2.4.c, which belongs to `sage-root-garden`**. ⚠ I checked the
  panel's framing: the standards hub lists by `alignment.code`, so it is a false DESCRIPTION, not
  a routing collision.
- `60188fc5` **[gate]** — above.

## ⚠⚠ I ALMOST SHIPPED INVENTED GERMAN AND DUTCH, AND STOPPED

The de/nl `NICHT`/`NIET` inversion is real and verified by composition. I wrote `GEGENTEIL` /
`TEGENDEEL` — then caught that both want an ARTICLE (the Romance locales all ship the definite
form) and that this is **child-facing copy in two live locales with no native panel in session**.
**Reverted to the shipped values and ran de + nl panels instead.** A verified defect does not
license invented native copy.

## Filed, not fixed

⭐⭐ **de/fr/es/it cut off at 1024×900 in the resolved phase.** Measured: the activity block is
**byte-identical across locales** (rootH 315, same component heights) — the 55px difference is
entirely **above** it in the protected shell chrome, and **English sits at exactly 900 with zero
slack**. Shrinking the apparatus to absorb shell chrome would be **contorting the layout to clear
a threshold**. Needs a shell-level decision.
· `o-` takes adjectives while `-full`/`-lös` take nouns, so a which-round is honestly **2-way**
(de has the identical property and shipped) · the bare-root card is **always** wrong and always
shortest, a free elimination Swedish cannot escape (the affixes partition by root class); the real
fix is a fourth round type where the root IS the answer · **the apply scene draws the round's own
affix glyph**, so after one which round a child can match icon→meaning without reading the word
· **three aria-live announcements per tap** (`_srMirror` wrapper + `.af-line-msg` + `api.announce`)
· the wrong **L.2.4.c gloss is in `affix-core.js`'s header comment**, copied forward by six
fan-outs — untouched to hold the 0-core-lines bar · fr distractors are **not French**
(`plein de` + infinitive; `-eux` takes nouns), milder in es/pt; **de and it are the clean pools**
(both nominalise) · nl tags `heel gelukkig` as the `-vol` meaning · de still uses `‚…‘` while the
file's own nl comment bans it, three lines away · `af-spotless`'s root card reads "spots" vs root
"spot".

## ⚠ A constraint I imposed was wrong, and it manufactured 84 false findings

I told the content panel *"nothing may be called free"*. **`quota.ts` gives `play` 10/day to
ANONYMOUS users** — only `download` needs an account — so *"utan konto"* is TRUE and
`verify-activity-prose-claims` carves it out deliberately. The panel dutifully returned 84
"violations" against correct copy. **Nothing swept.** The price-word ban (`gratis`,
`kostnadsfri`) stays absolute. The recorded *"a constraint you impose can be wrong"* trap, this
time in a BRIEF rather than a gate.

## Tooling traps paid for again

⚠ `affix-activities.json` is **CRLF** while `activity-content/*.json` is LF — needles with `\n`
matched 0. **Normalise in the harness, restore on write.** ⚠ It is also **hand-formatted** (a JSON
round-trip reflows it) while `sv.json` round-trips byte-identically at indent 2 — **assert the
round-trip before choosing the tool**, same question, opposite answers, in one session.
⚠ A bash heredoc mangled backslashes in a JS regex twice; write the script with a file tool.
⚠ `git diff --name-only | grep "core\.js"` matched **`scripts/verify-affix-core.js`**, a GATE —
scope the protected-core check to `^mini tools/.*-core\.js$`.
⚠ tsc's exit code came back 2 once and 1 on rerun with **byte-identical output** — diff the logs
before believing an exit code changed.

## ⚠⚠ MY OWN REVERT DELETED FOUR LOCALES, AND ONLY A DIFF AGAINST PRE-SESSION CAUGHT IT (`6384fd07`)

I wrote invented de/nl caps words, thought better of shipping unreviewed native copy, and reverted.
The revert script took `indexOf` of the de comment as start and the nl line as end and replaced
everything between — **fr, es, pt and it sat in that gap.** All four SENSE rows deleted; `sense()`
falls back to `SENSE.en`, so four live locales would have shown **English caps on the cogs and in
every win line and aria-label.** Shipped in `cb021bc3` and PUSHED.
⭐ **Both ends WERE bound; the RANGE was wrong.** Nothing failed, because everything the script
asserted was true. **VERIFY A REVERT THE SAME WAY YOU VERIFY AN EDIT — a revert is an edit.**
⚠ No gate could see it: `verify-affix-core` reads the MANIFEST (every pool intact), `local-test`
drives en+sv (both intact), and the fr/es/pt/it sweeps had all run BEFORE the damage.
⚠ The Dutch panel then "found" it and **misattributed the cause to a different file** — it was
reading my transient broken tree. A panel finding is a measurement of the tree it read.

## The critic + the two native panels (`cd50f2b0`)

⭐⭐ **THE MACHINE DREW THE ANSWER.** `_renderScene` drew `cogInner(r.affix)` in apply rounds while
the same glyphs are captioned with their sense words in which rounds — a filled cup IS "full of".
**5 of 11 rounds solvable picture-to-picture without decoding the word.** Now neutral until resolve.
⭐ **The teaching line was at/below the passive KLARA counter** (x-height 7.0@360, 8.0@768 vs its
8.0 cap) — the FLOOR-CANNOT-SEE-AN-INVERTED-HIERARCHY class again, 14px clears a 14px floor.
⭐ **My own `.af-cand.ok` was a NO-OP**: `border-color:#146B5E` restated `.af-cand`'s own border,
so the confirmation rested on a 1.63:1 halo. Half a fix looks like a fix.
⚠ **The sweep caught my regression**: growing the line pushed sv 10px past the fold at 320 — a
state that passed minutes earlier. Measured (55px→62px), and **the layout gave, not the text**.
⭐⭐ **de: the aria-label has NO CAPITALS**, so `bedeutet NICHT` reaches a screen-reader child as a
plain inverted sentence — the argument that settles it, and one no amount of typography answers.
→ `DAS GEGENTEIL` / `VOLL DAVON`; ⛔ **`OHNE` explicitly PROTECTED from the consistency sweep.**
de pool: `Farbe`+`-los`=`farblos` — **the root does not occur in the word**, so the machine's own
equation is broken on screen → `fehlerlos`. Quotes `‚…‘`→`„…“`.
⭐⭐ **nl DIVERGED FROM THE SWEDISH REMEDY ON PURPOSE**: every Dutch frame with a finite verb fails
(`niet` is happy clause-finally) and **quoting cannot rescue a SPOKEN channel** → change the FRAME
(`staat voor`), not SENSE. It rejected `HET TEGENDEEL` on MEASUREMENT (96.9px in a 79.1px cell)
and on LEXICON (the platform teaches `het tegenovergestelde` a year earlier), and **refuted the
proposed `heel gelukkig` fix** — the card text is good, the metadata TAG was wrong (`ful`→`int`).

## ⚠ An alarm of mine that was WRONG — recorded so nobody re-raises it
sv measured 907 against vh 900 and the gate passed. I read that as a gate hole. `visual-qa-activity.js:334`
is `bottom > m.vh + 8` — an explicit 8px tolerance. **Verify before the defect**, including against gates.

## Filed: the 1024x900 desktop cut-off is SHELL-OWNED and unreachable from here
**sv, en and nl now pass all 198 renders** (nl was failing 1 before these fixes; es went 6→4, pt 6→5). de/fr/es/pt/it retain the desktop cut-off. Measured: `rootH` is **322 in every locale**; the 55px delta sits entirely ABOVE the activity in the
protected shell prompt, which wraps to three lines in de/fr/es/pt/it. en sits at exactly the fold.
Contorting the apparatus to absorb shell chrome is the refusal this project already records.

---

# sv #23 — `sentence-builder` L.1.1.j (`ba932e30`) + two riding commits

`Krumelur bygger meningar` / `bygga-meningar-ordfoljd-stor-bokstav-och-punkt-ak-2`. prose 82 → 83.
de #23 = `b7842370`. **Årskurs 2 — `sv:'2'` ADDED to the existing GRADE_OVERRIDE row** (which
already carried de/fr/es/pt/it/nl at `'2'`; without sv the chip falls to åk 1 and contradicts an
`-ak-2` slug). **STRAND `Språkliga strukturer och normer` auto-maps — no `strand-names.ts` edit.**
Activity layer only: **0 lines to any `*-core.js` or `lcs-shell.*` across all three commits**.
Riding: `46880e7a` (the visual-qa unrecognised-flag guard) + `f7f4e8ae` (es/pt/it hen artwork).

**NEXT = sv #24** — `pronoun` **L.1.1.d** (`pronoun.case.l-1-1-d`, "Hatties Hutladen /
Personalpronomen im Fall"), de commit **`34cbb59c`**, which ALSO needed a per-activity grade
override (→ **Klasse 3**), so sv must RULE on årskurs rather than inherit. Today it ships
en/de/fr/es/pt/it/nl and **/sv/ 404s** (no `slug.sv`, no `roundsL10n.sv`).
⚠ The route's GRADE_OVERRIDE row already reads `{de:'3', fr:'3', es:'3', pt:'3', it:'3', nl:'2'}`
— **nl deliberately LOWER than the rest**, so this is a genuine per-locale ruling, not a
harmonisation. Swedish has no case system for personal pronouns comparable to German's, so expect
the sv panel to argue placement on a different basis than de did.
sv #1–#23 done, prose 83.

## ⭐⭐ Lgr22 REMOVED meningsbyggnad from svenska åk 1–3 — it survives only in SVA

Plain svenska åk 1–3 carries only *"Grundläggande skrivregler, med gemener och versaler, de
vanligaste skiljetecknen"*. So the Lgr22 hook for this activity is **stor bokstav och punkt**, and
word order is the VEHICLE, not the standard. The copy leads accordingly.
⚠ The pedagogue's first web search reported the **SVA** bullet as if it were svenska's; only
extracting the PDF caught the merged columns. **A search result is not a kursplan.**

## ⭐⭐ The panels split on definiteness, and the ett round is what settles it

The linguist argued DEFINITE (situational definiteness from the picture; the weak adjective is
invariant `-a`). The pedagogue ruled **INDEFINITE** and was decisive, on a checkable argument: the
picture is a FIRST MENTION, and with the sheep round the indefinite **shows** the en/ett contrast
twice (`En`/`Ett`, `vit`/`vitt`) while the definite **hides** it — the weak `-a` is identical for
both genders. The definite would defeat the one round that exists for the contrast.
⭐ Verified against `image-vocabulary.js` (§A.13.58, sv codes only): **all nine inherited nouns are
`n` = en-words**, so the inherited deck cannot teach en/ett at all. `sheep` = `Får`, code `t`.
⚠ The linguist's `tree` round is UNBUILDABLE — `tree@2x.webp` exists only in `christmas` (a
decorated fir) and two **B&W** themes, excluded by §20.5.

## ⭐⭐ The pedagogue READ THE ARTWORK, and it changed the deck

- the **frog is SITTING**, front-facing and planted → `hoppar` would make the sentence FALSE ABOUT
  ITS OWN PICTURE. ⚠ My *lexical* fence for `hoppar` was refuted first: `tense-activities.json` —
  the activity I built the session before — already ships `verb:{lemma:"hoppa"}`. **The right
  reason to refuse it is the picture, not the corpus.**
- the **hen is ONE cream-white hen**, not six brown ones; the **flower is red**, not purple.
- ⚠⚠ **A literal translation of the German would have shipped three falsehoods in one pass** —
  `En stor hund` (a standing puppy), `En gul buss` (it is blue), `En brun höna` (it is white).
- I checked `randig` myself at full size rather than at the 100px render: `animals/fish@2x.webp`
  has three distinct vertical bands. **Judge a picture claim on the picture, not the thumbnail.**

## ⭐⭐ 5 of 9 ROUNDS OPENED ONE SWAP FROM SOLVED, IN EVERY LOCALE — AND I MISREAD MY OWN DATA

I measured "1–2 of 4 tiles in the right slot" and concluded no round opens nearly-solved.
**Two fixed points out of four IS one transposition from solved.** The pedagogue caught it.
Measured: seeds 31/41/61/67/71 all leave 2 fixed points, and 41 gives `[0,2,1,3]` — **capital and
period already pinned, only the middle pair swapped**. For n=4 the permutation is a **pure function
of the seed**, so the same five rounds were degenerate in all seven locales (31/61 and 41/67 are
even duplicate patterns). !4 = 9, so nine distinct derangements exist for a 9-round 4-tile deck →
new seeds `[2,5,8,12,13,19,21,27,35]` applied to **all eight pools** (63 values). **0 fixed points
everywhere.** A pure integer swap, no native panel needed.
⭐ `Core.scramble` guarantees only `!= canonical` — never that it is FAR from it. That gap is now
a gate assertion (`homeTiles < 2`), not a hope.

## ⭐ The uniqueness proof credits the wrong thing, and the danger is a SECOND ADJECTIVE

The core says the sentences are "curated to a unique grammatical order". **The curation is not what
makes that true — the PERIOD is.** One tile carries the capital and one the period, pinning slots 1
and 4, leaving 2! orders of the middle pair, of which the strictly-prenominal adjective admits one.
That pin is also the only thing protecting EN `The fast bus stops.` and DE `Der gelbe Bus fährt.`
⭐ The rule is NOT "never add a fifth tile" — the pins survive one. **The real test is whether the
un-pinned middle admits two orders, and a SECOND ADJECTIVE is the dangerous case**: `den stora
bruna` and `den bruna stora` are both acceptable Swedish → two correct answers, one marked wrong.
It is the likeliest future break because "add another adjective" looks like a difficulty knob.
Gate: `c.length === 4` with that reason in the message.

## ⚠⚠ THE PRIMARY INTERACTION TARGET WAS LABELLED IN ENGLISH IN SIX LIVE LOCALES

`render()` set `'empty slot ' + (si+1)` — hard-coded, and the slots' ONLY label. Fixed with an
`EMPTY_SLOT` table + `emptySlotLabel()`; ⭐ **it needed no invention** — `skipcount-activity.js`
already ships a native-authored `srBlank` in all eight. Measured on the rendered DOM afterwards:
all eight locales now announce natively (`leere Stelle 1` / `case vide 1` / `espacio vacío 1` /
`espaço vazio 1` / `spazio vuoto 1` / `lege plek 1` / `tom ruta 1`). **This build's sv work
repaired six OTHER locales.**
⚠ **I deviated from the plan on the sv value and the deviation is the point**: the plan said reuse
skipcount's `tom plats`; it ships **`tom ruta`**, because the visible sv hint says *"Lägg ett ord i
varje **ruta**"*. A screen-reader child must not meet a second noun for the object the instruction
just named — **consistency INSIDE the activity beats consistency with a sibling.**

## ⚠ Three L strings are dead in seven locales — do not author an eighth set

`txt()` has exactly TWO call sites (`q`, `hear`). The shell renders hints from **`tool.strings`**
via `api.t()`, and success from `i18n.chrome('celebrate')` — never the tool's `win`. So
**`L.*.win`, `L.*.hintFill`, `L.*.hintOrder` are dead in all seven locales = 21 dead strings**;
sv authors only `q` and `hear`. ⚠ And `hear` lives ONLY in `L`, so adding sv to `strings` alone
would have shipped an English button.
⚠ The shell clears the hint after **1800 ms** and shipped hints run 86–121 chars. sv is **75** —
the shortest of any locale. It also carries its own softener (`Nästan!`) because the shell sets
`hintSpan.textContent = hintMsg` but announces `tryAgain + ' — ' + hintMsg`: **the hint REPLACES
the retry line visually while the screen reader gets both.**
⭐ The hint states the rule and **names no article**: `En` would answer slot 1 for eight rounds and
be WRONG on the ninth (`Ett`).

## ⭐ The phantom palette is the ENGINE, not the Swedish

`.snt-tile.used{visibility:hidden}` keeps a used tile's BOX — deliberate and right while the child
is placing (the remaining tiles do not jump under a finger). But once every tile is placed the whole
palette is empty space between the child and Check. Measured at 320×640 in the `wrong` phase (a
state nothing had photographed before this driver): **94px in sv, 44px in en**, pushing Check to
654 against a 640 viewport — **in BOTH locales**. Collapsed only when entirely phantom and only
below 340px, leaving the no-jump behaviour intact everywhere else.

## ⚠ A tap-target defect that BLOCKED THIS BUILD'S OWN DoD, present in English first

Baselined before changing anything: **English already failed 6 of 54 renders**, all
`TAP(35px<44 on .snt-tile)`. `.snt-tile` set `min-height:44px` and **no `min-width`**, and the gate
measures `min(width,height)` — so a short tile was 35px at 320/360. Swedish's `En`/`Ett` inherit it
exactly. One `min-width` fixed all eight. **Baseline the gate before you build, or you inherit a
failure and call it yours.**

## The gates

`verify-sentence-builder-core.js` now walks **every pool** — `poolsOf(row)` over `rounds` +
`roundsL10n` — and prints **72 sentences across 8 pools**. ⚠ It used to say "9" while 63 existed:
**a PASS line that names a scope it does not walk.** Fourth occurrence of the English-pool-only
class in this family (plural → tense → affix → here). ⭐ **Unlike affix the extension is CLEAN** —
every assertion is locale-neutral and all pools passed unchanged, so there is no per-assertion
scoping and no WARN backlog. **Do not assume scoping is always required; measure.**
New: `homeTiles < 2`, the `c.length === 4` pin, and a **Unicode-safe capital diagnosis** —
`Core.facts().startsCapital` is `/^[A-Z]/`, ASCII-only, so it REJECTS `Åtta`/`Ärtan`/`Öknen`. Swedish
dodges it (Den/Det/De/En/Ett are ASCII-initial) but **da/no will not**, and would be told they "do
not start with a capitalized word" — the wrong diagnosis. The core is protected, so the gate names
the real cause. Six poisons, **each caught by the assertion it names**, manifest restored byte-identically.

`local-test-sentence-builder.js` rewritten: **en + sv**, tiles reached by **MODEL INDEX** (the old
version searched the DOM for the word it wanted — works only while every word is unique), each
locale asserted against **its own manifest pool**, plus a cross-locale chrome check on title,
prompt and slot label. The stale **"EN-only"** claim is gone from the PASS line.
⚠⚠ **The poison had to go into the ACTIVITY, not the manifest** — the harness reads its expectation
from the manifest and the page reads the same file, so a manifest poison **moves both sides
together and stays green**. Two poisons, each on its own named check.
⚠ A flake fixed rather than tolerated: the subject-image assertion failed on en and passed on sv
for the same `animals/dog` file — cold-start timing. It now WAITS for the decode.

## Verification

**visual-qa 1,296 renders across all 8 locales, all pass** (162 each: 9 rounds × 3 phases × 6
viewports), plus 270 more in the narrow band 280–430 for sv and en. New phase driver
`open → wrong → resolved`; a step that no-ops FAILS. `preflight-activity-routes` 204 ·
`verify-activity-content-sv` 83/83 · prose-claims · serp-copy · variety (7 locales, sv excluded —
it probes production) · `tsc --noEmit` exit 1 with **exactly the 7 baseline blog-test errors**.

## ⚠⚠⚠ `--lang=sv` IS SILENTLY IGNORED — I REPORTED TWO ENGLISH RUNS AS SWEDISH

The flag is `--locale=`. `visual-qa-activity.js` parsed argv by prefix and ignored anything
else, so `--lang=sv` fell through to the `'en'` default: the sweep rendered ENGLISH, printed a
normal PASS, and wrote English screenshots — and I told the operator the Swedish build had been
swept at every width. **A wrong RUN is worse than a failed run, because it carries a green
verdict.** Third dress of a recorded class (`--activities=` on the mobile audit; "a filtered run
that matches nothing looks exactly like one that passes").
⭐ Caught only by a CONTRADICTION I could not explain away: the phase driver THROWS when the hint
is empty, the 1024 sweep passed, and yet the 1024 screenshot showed no hint. Chasing that to the
end — mtimes, then the `-sv` filename suffix — produced the real cause. **When a gate's own
guarantee contradicts the artefact, one of them is lying and it is worth finding out which.**
⭐ Fixed at the root: the gate now REFUSES an unrecognised flag, prints the near-miss
(`did you mean --locale= ?`) and exits 2. Poisoned in both directions.

## ⭐⭐ THE WRONG-ANSWER STATE IS TRANSIENT AND THE SWEEP IS NOT — the desktop nudge was never measured

`lcs-shell.js:893` clears the hint and the coral state **1800 ms** after Check. The harness drives
a phase ONCE at 412px and then walks six viewports in sequence, so 1024 and 1366 were being
measured AND photographed after the state had timed out. Measured: at +200 ms and +1500 ms every
width shows coral `rgb(242,120,75)` + the full hint; at +2600 ms the hint is empty and the prompt
is teal again. **So the TALLEST state of the wrong phase — the one carrying an extra line of text
— had never been measured at desktop, for any activity with a transient hint**, and which widths
won the race depended on machine speed: flaky in the direction that always passes.
Fixed in the phase driver: `pressCheck(page, true)` drops only the long timers scheduled BY the
check handler, for the duration of that synchronous click, then restores `setTimeout`. It weakens
nothing — every viewport now measures the state WITH the hint. All 8 locales still pass.
⚠ **The critic's headline finding was a photograph of this artifact, not a defect** — "wrong
answers say nothing at 1024, 9/9 rounds". Reproduced, explained, and disproved by a positive
control (a post-freeze English 1024 frame that DOES show the coral prompt and hint).

## ⭐ Two critic findings that were real, and one that is not mine to fix

**FIXED — the picture is the EVIDENCE, not decoration.** `.snt-subject` was FIXED at 52px while
the card grows past 700px, so at desktop it was the smallest meaningful thing on screen beside a
48px prompt. Every sentence names a colour or pattern and the thumbnail is the child's only
evidence for it: judging `randig` at 52px is genuinely hard. Now `clamp(52px,13vw,128px)`.
⭐ **A per-box floor cannot see this — 52px clears a 14px minimum comfortably. The defect is the
RATIO to the card, not the absolute size.**
**FIXED — desktop fill.** `.snt-root` capped the apparatus at 560px, leaving a ~230×570 cluster
adrift in a 720px card. ⚠ The shell's own sparse gate is blind here because it measures ANSWER
CARDS and this activity has none (its controls are tiles) — `sparse=—` on every row. Grown at
`min-width:768` only; the phone layout is untouched.
**FILED, SHELL-OWNED — the measure DIPS as the window widens.** `lcs-shell.css:548-575` sets
`.lcs-app.activity{max-width:max(720px,60vw); padding-inline:6vw}`. Between 768 and ~1200 the card
is CLAMPED at 720 while the padding keeps growing, so the usable measure falls: **628px @768 →
597 @1024 → 576 @1200 → 656 @1366**. That is why a wider viewport wraps the sv prompt to three
lines and strands the speaker button. Protected file, affects every activity in every locale.

## ⚠⚠ THE HARNESS'S GEOMETRY IS NOT PRODUCTION'S — measured, and it flatters

Live measurement of the en page (the only deployed one): a **768-wide browser gives the activity a
640px iframe** (measure 486), not 768 (measure 628); 1024 → 896px iframe (613); 1200 → 1072 (591);
1366 → 1238 (594). `vw` inside an iframe resolves against the IFRAME (§A.13.47), so **the
standalone sweep is testing a WIDER, easier layout than the operator ever sees at the same label.**
The sweep's "desktop 768" is not the operator's desktop 768. Filed, not fixed — it is a change to
the shared harness for all ~204 activities and wants its own commission.

## ⭐⭐ ENLARGING THE PICTURE IMMEDIATELY EXPOSED A FALSE CLAIM I HAD SHIPPED

At 52px `birds 2/hen` read as a white hen and the round `En vit höna pickar.` looked fine — the
pedagogue and I both accepted it. At 128px it is plainly a **cream-bodied hen with a BROWN BARRED
WING and a RED TAIL**. The adjective the child is asked to verify was false about its own picture,
and **the fix for one defect is what revealed the other**: make the evidence legible and the claim
becomes checkable, including by the author.
Fixed by pointing the sv round at **`farm animals/hen`** — a uniformly cream-white hen, no brown
wing, no red tail — with the sentence untouched. ⭐ Consistent by construction: the deck already
calls the cream-white SHEEP `vitt`, so the cream-white hen is `vit` on the same standard, and the
`vit`/`vitt` minimal pair that justifies the whole ett round survives. Data-only, sv-only.
⚠ **es, pt and it make the SAME false claim** (`La gallina blanca` / `A galinha branca` /
`La gallina bianca`) against the same brown-winged picture, and the identical one-line remedy is
proven to work — no text changes, so no native panel is needed to apply it. de/fr/nl say "brown"
and must STAY on `birds 2`, where the brown wing is the only thing that makes them true.

## Round-two verification

All 8 locales re-swept AFTER the freeze + the CSS changes: **1,296 renders, all pass**, this time
with the wrong phase's TALLER state (hint present) measured at every width. Gates re-run after the
artwork swap: core 72/8 pools, local-test en+sv, preflight 204.

## The second critic pass — it found the hen independently, and two more

⭐ It read the pre-fix renders and reached DEFECT 1 = the hen, by its own route: *"the competing
word is already in this child's deck (`brun` on a brown dog in r0), and the same deck proves what
white should look like (`Ett vitt får`, r8)"* — i.e. the deck taught the wrong boundary for `vit`.
Already fixed while it ran. **Independent convergence on a defect I found by fixing a different
one is the strongest evidence either of us produced.**

**FIXED — the picture was still unusable on a PHONE.** At 360 it rendered ~42px, the same width as
the two-letter `En` tile and the smallest thing on screen, so `randig` was unresolvable exactly
where most children meet it. ⚠ My first ramp (`13vw`) only paid out at desktop; a 412px phone
still got 54px. Now `clamp(56px,20vw,128px)`, with the phone band SPLIT because the two ends are
not one case: measured headroom is **~35px at 320×640 but ~157px at 360×740**, so 320 takes
`clamp(48px,16vw,54px)` and 341-380 takes `clamp(56px,21vw,76px)`. At 360 the bands are now
unmistakable. 320 stayed at ctrlBottom 613; 360 rose to 614 of 748.
⚠⚠ **A MEDIA QUERY ADDS NO SPECIFICITY — I walked into the recorded graph-it trap again.** The
narrower `max-width:340px` rule was placed BEFORE the `380px` block, so it LOST and 320 silently
took the LARGER picture: measured ctrlBottom 613 → **629**, eating half the margin, while every
gate stayed green. Reordering it after fixed it. ⚠ And the splice broke the CSS array, because the
380 line was the LAST entry and carried no trailing comma.

**FILED, SHELL-OWNED — the corrective hint is ~3.3× smaller than the instruction above it.**
`lcs-shell.css:314` sets `.lcs-activity-prompt-hint{font-size:clamp(13px,2vmin,15px)}` — capped at
15px while the prompt reaches 48px. So the line that TEACHES is the smallest text on the card, and
it sits ~217px from the tiles it corrects, above the picture. Same disease as the 16-activity
family fix (`c616e8be`), but in the SHELL element, so it affects every activity that uses the shell
hint rather than its own.
⚠⚠ **AND THE `SCALE` GATE FROM THAT VERY FIX CANNOT SEE IT: it fails only on EXACT EQUALITY**
(`n.m.liveFont === w.m.liveFont`), so a token 13→15px counts as "it scales" while the prompt
triples. **A floor cannot see an inverted hierarchy — and neither can an equality test.** The
critic named the right instrument: gate the hint on a RATIO to the prompt in the same frame
(never below ~55-60%), not on an absolute floor plus inequality. Tightening it would fail ~204
activities against a protected file, so it is a commission, not a line in this build.

---

# sv #24 — `pronoun` L.1.1.d (`bc89df6e`)

`Sigges koja` / `min-mitt-och-mina-ovning-svenska-ak-2`. prose 83 → 84. de #24 = `34cbb59c`
("Hatties Hutladen", Klasse 3). **Årskurs 2** (`sv:'2'` added to the existing GRADE_OVERRIDE row).
STRAND `Språkliga strukturer och normer` auto-maps — no `strand-names.ts` edit.
Activity layer only: **0 lines to any `*-core.js` or `lcs-shell.*`**.

**NEXT = sv #25** — `sentence-clinic` **L.2.1** (`sentence-clinic.fix-it.l-2-1`, "Dr. Plumes
Satzklinik / Sätze verbessern"), de commit **`db3a8338`**. Today it ships en/de/fr/es/pt/it/nl and
**/sv/ 404s** (no `slug.sv`, no `roundsL10n.sv`). ⚠ Its manifest already declares `grade:"2"`, so
unlike #24 it may need NO GRADE_OVERRIDE — check before adding one. Strand `Language` → sv already
resolves to `Språkliga strukturer och normer`.
sv #1–#24 done, prose 84.

## ⭐⭐ THE GERMAN FRAME DOES NOT TRANSFER — six of nine rounds would have been DEAD

German works because it has four cases with heavy syncretism. Swedish has a two-form system
acquired before school: **`*Mig ritar en katt` is not a child error, it is a string no Swedish
speaker of any age or dialect produces.** A transliterated deck would have shipped six rounds whose
wrong option no child would ever pick — and *a forced choice whose distractor is unpickable teaches
nothing*. Both native panels reached this independently.

⭐ **The deck's design law, and it is checkable:** *every round's wrong chip must be a form no
Swedish child would defend.* That one test decides the whole build.

## ⚖ The panels DISAGREED on `han/honom` — resolved on evidence, not majority

The linguist called it *"the best round available"* (colloquial object `han` — *jag såg han*, *till
han* — is widely attested and actively corrected in school). The pedagogue excluded it for the
**same fact**: because *jag såg han* IS said, the deck would mark real Swedish wrong.

**Ruled OUT.** This project already paid for that defect at **sv #21** (`tense`), where the activity
marked correct Swedish wrong (presens IS the ordinary future) and the repair required inventing the
`alsoOk` third response class. **That class lives in `tense`, not in this engine** — and with only
two chips, a wrong chip that is "also OK in speech" leaves the round with *no wrong answer at all*.
The same test excludes `de/dem` (both spoken *dom*, so no ear cue whatsoever) and the compounds
(*mig och mamma* is said — correcting it is a REGISTER correction on a no-shame platform).

## ⭐ `sin/sitt/sina` is out for a MECHANICAL reason, not a curricular one

My fence said "no English equivalent → no honest CCSS anchor". ⚠ The pedagogue **corrected that
reasoning**: `robin-mirror` (L.2.1.c) owns reflexive *object* pronouns, and reflexive *possessives*
sit closer to L.1.1.d than to L.2.1.c, so the anchor argument is weak. The reason that holds:
`Kalle tvättade hans bil` is perfectly grammatical (it just means someone else's car), so it is a
**coreference judgement needing three chips and a picture** — and the engine fires one of three
notes keyed on `role`, so a sin/hans round would tell the child *"det visar vems det är"*, which is
true of **both** options and therefore not the reason. The feedback would be actively wrong.

## What Swedish teaches instead — possessive agreement, and the design is structural

`min boll` (en-word) · `mitt äpple` (ett-word) · `mina vantar` (plural) — **the noun AFTER the
blank decides the form, not who owns it.** Six possessive rounds + three uncontested subject/object
rounds as an on-ramp, keeping all three `role` values live.
⭐ `min` and `mitt` each appear as the CORRECT chip in one round and the WRONG chip in another, so
neither is ever "the right word" — the teaching point made mechanical.
⭐ It rides on the en/ett contrast **sv #23 introduces** (`Ett vitt får`, `vit`/`vitt`), which is
also why åk 1 would be a ladder inversion; åk 1 is the decoding year besides. ⚠ The nl precedent
transfers as a PREMISE, not a conclusion: nl reasoned "not groep 3, the decoding year → groep 4",
and Sweden's decoding year is åk 1, so the equivalent placement is åk 2 — reading "nl=2 so sv=2"
would be the coincidence, not the argument.
⚠ **`pronomen` never reaches the child**: Lgr22 names no ordklass at åk 1–3 (they enter åk 4–6), so
the framing is *språkkänsla*. Parent-facing prose may name it.

## ⭐⭐ Two content collisions the panels caught by reading the CATALOGUE, not the copy

- **There are TWO Hatties.** `hattie-whose-is-it.possessive.l-1-1-b` is *"Hattie the **hedgehog**
  runs a lost-and-found"* (possessive NOUNS, genitive -s); `pronoun-activity.js` is *"Hattie the
  **hare** runs the Lost-and-Found Hat Shop"*. Same name, same premise, adjacent standards. (pt had
  already dodged it by renaming theirs *Tuca, a ouriça*.) → **`Sigge`** and `Sigges koja`; the
  lost-and-found framing also points at the genitive-`s` activity's standard, not this one.
- **`mössa + vantar + skor` is `cleo-packing-list`'s *hats, mittens, boots*** (L.1.2.b), which has
  no sv build yet — the fan-out would have shipped the identical triad twice. `skor` → `äpplen`,
  which also makes round 6's distractor `mitt` instead of a second `min`.

## ⭐⭐ A DEFINITE NOUN LEAKS ITS OWN GENDER — the machine drawing the answer, again

The content panel stripped every other noun from the six possessive sentences: *"På kroken hänger
___ mössa"* cues **en** → `min` (gettable without reading the target), and *"I kojan står ___
paraply"* cues **en** → actively misleading. Rounds 1, 2 and 5 deliberately share ONE frame
(`Här är ___ X.`) so the noun is the only variable that can decide the form. The koja therefore
lives in the title, the instruction and rounds 7–8 — never inside a possessive sentence.

## ⭐⭐ A LIVE ANSWER LEAK IN THE BLIND CHANNEL, in all seven locales

`_renderChips` paints `this._chipOrder`, which `_beginRound` **shuffles** (its own comment:
*"position ≠ answer"*). `_srMirror` called `pnChips(round)`, which is **always `[correct, wrong]`**.
So a screen-reader child was told the correct answer FIRST on every round and could solve the deck
without reading a sentence — and the announced order contradicted the visible one about half the
time. Measured before: **11/27 order mismatches, 18/18 localized rounds correct-first.** After:
0 mismatches, correct-first 5/27. Poison-controlled against the pre-fix line.
⚠⚠ **My probe was wrong TWICE before the fix was, and both were substring traps**: `he` sits inside
**the** (in the sentence) and `ich` sits inside **mich** (the OTHER CHIP). Each made a correct fix
look broken. **Never locate a token by `indexOf` in rendered prose — split on the joiner.**

## ⚠ Three hard-coded English defaults, one of them duplicated

`:235` and `:285` carried the SAME blank-word ternary ending in `'blank'`, and `:284` joined the
chips with `' or '`. A Swedish child would have heard *"Var är **blank** äpplen? … mina **or**
mitt?"*. Now `BLANK_WORD` / `CHIP_JOIN` tables read from both sites — patching one and missing the
other is no longer possible. `lucka` is deliberate: the same noun the nudge uses, so the sighted
child and the blind child are pointed at the same thing by the same word.

## ⭐ MEASURED INVERTED HIERARCHY — the chrome outgrew the content

The shell prompt is INVARIANT (the same question every round); the sentence is the only thing that
changes and the only thing the child can read to decide. Measured: **0.96 at 360 (peers, correct)
but 0.47 at 768/1024/1366** — the chrome more than twice the content. Raising the sentence cap
(1.42rem → 2rem) moved it to 0.67 but did not cross over, so **the prompt came down to meet it**
(scoped override, precedent: the file's own `.lcs-stage` rule). Final: **1.43 / 1.14 / 1.14**, and
360 is byte-identical.

## The visual critic — 5 findings, 4 real and 1 that was MY driver

FIXED: **one colour meant both "wrong" and "right"** — `.pn-blank.filled` and `.pn-line-msg.miss`
were both `#C2410C`, so the same orange said *look again* and *this is your answer* one tap apart
(the recorded house defect, fixed on `plural` at `f80a9762`, reappeared here); the answer now shares
the win note's teal. FIXED: an **orphaned full stop** — a sentence-final blank kept its right margin,
rendering `Mamma ropade på ___ .` (⚠ EN has three such rounds, so never Swedish-only). FIXED: the
**slot stayed wider than its answer**, so the finished line still read as a sentence-with-a-slot.
FIXED (nit): the mascot was the only thing that did not scale, reading as a stray emoji at desktop.
⚠ **NOT a defect — my own phase driver:** the critic reported that a dimmed chip meant both "tried
and wrong" and "not chosen". `dim` is applied ONLY to a chip the child actually tried; the resolved
frame showed one because my driver ran `resolved` straight after `miss`. **The driver now re-forces
the round so it photographs a CLEAN first-time resolve** — the common case.

## The gates — the FIFTH English-pool-only occurrence, and the naive fix was wrong

`verify-pronoun-core.js:53` read `params.rounds` only: six localized decks × 9 = **54 rounds never
machine-verified**. Now **72 rounds across 8 pools**.
⚠⚠ The naive fix would have been actively wrong here, unlike sentence-builder: `FORBIDDEN_KEYS`
contains `'correct'` and the localized shape **stores the answer by design**, so pointing the
existing scan at `roundsL10n` would condemn every localized deck for the thing that makes it work.
Three scopes — UNIVERSAL / EN-DERIVED (CASE_TABLE, referent, role-mutation, the `kind` counts) /
LOCALIZED (blank present, two distinct chips, answer-not-in-sentence, **distractor**-not-in-sentence,
role dispatchable, role coverage, ≥7 distinct) — each named on its failure line.
**11 poisons, every one caught by the assertion it NAMES**, including two EN-scope controls proving
the split did not disarm the English half.
`local-test-pronoun.js` now drives **en + sv, every round**, by MODEL INDEX (`_chipOrder` is
shuffled), asserting each locale runs its own pool plus a cross-locale chrome check that includes
the **Hear-it label** — which lives ONLY in `L`, so a locale added to `strings` alone ships an
English button and nothing else notices.
**New phase driver** `open → miss → resolved`: the sweep went from **27 renders (one phase, English
only)** to **162**. ⭐ And NO freeze here — `pronoun-activity.js` contains no `setTimeout` at all,
so the miss state persists; carrying sv #23's shell-timeout freeze across would have added
machinery that solves nothing. Measured, not assumed.

## Filed, NOT fixed — three shipped decks have unpickable distractors

`fr-obj-3` pairs `le` against **`son`**, a *possessive* in an **object** round. `it-pos-3` pairs
`suo` against **`lui`** → `*il lui cappello`, word salad. `es-sub-1/2/3` put the clitics
**`La`/`Lo`/`Los`** in a pre-verbal subject slot — impossible strings. All reproduced from the
manifest. ⚠ Choosing a plausible distractor is **authoring**, so these need native fr/it/es panels
and their own commit — unlike the sv #23 hen, which was data-only with no text change.

## Also filed — the English source, audited by three panels

Circular definitions (*"him when it is done to him"*); the intro promises `he/him/his` but the deck
runs nine rounds over four referents, with `us` and `their` never defined; **`its` used for a
person** in both the intro and the shipped `instruction` — on a page about choosing the right
pronoun; `Sam and I`/`Sam and me` is dialectally contested yet called *"using pronouns correctly"*;
a ~330-char meta description that Google cuts at ~155; and `Common Core L.1.1.d` sitting in
user-facing copy against the platform's own machine-anchor-only rule. **L.1.1.d says "personal,
possessive, and indefinite" — no indefinite pronoun appears anywhere in the deck, in any locale.**


## ⚠ sv #23 close-out: the two advisory panels landed LATE, and they disagree on the hen

Both sv #23 panels (linguist + pedagogue) returned hours after `ba932e30` shipped; both verified the
built artefact line by line rather than assuming, and both confirm every ruling was adopted. Two
residuals, neither fixed, both needing native panels per locale — recorded so they are not lost:

**1. ✅ FIXED in `3b9c83a3` — `it.hintOrder` had no softener**, the one locale of eight whose
failing child got a bare command. Measured openings: en *"Not a sentence yet —"*, de *"Noch kein Satz –"*, fr *"Ce n'est
pas encore une phrase —"*, es *"Todavía no es una oración:"*, pt *"Ainda não é uma frase —"*,
nl *"Nog geen zin —"*, sv *"Nästan!"* — and it *"Comincia con la lettera maiuscola…"*. ⚠ It lands
hardest there because `lcs-shell.js:879` sets `hintSpan.textContent = hintMsg` while announcing
`tryAgain + ' — ' + hintMsg`: the hint **visually REPLACES** the retry line, so a sighted Italian
child sees only the imperative.
**2. Seven of eight hints overrun the shell's 1800 ms window** — fr 121 · it 109 · es 108 · pt 105 ·
de 103 · en 94 · nl 86 characters; only sv (75) fits comfortably. Shell-owned timeout, seven
locales' authored copy — its own commission.

**3. ⚠ THE PANELS CONFLICT ON THE HEN, and I am not resolving it unilaterally.** The pedagogue says
`birds 2/hen` is "cream-white too", so the four locales still on it (en/de/fr/nl) saying **brown**
are ALSO wrong, and that `f7f4e8ae` "aligned the three that were right and left the four that were
wrong". The visual critic, reading renders, said the opposite: *"beige/tan body with brown-barred
wing and dark-red tail… dominant impression: tan and brown."* My own read of the file: cream body,
**brown barred wing**, red tail, white head and cape. So **white was unambiguously false** (fixed for
es/pt/it) while **brown is weak-but-arguable** — the wing genuinely is brown. Left as filed, not
silently decided.

**4. The filed cross-locale artwork commission now has an evidence table.** The pedagogue opened all
eleven pictures: **28 sentence-vs-artwork falsehoods across the seven pre-existing locales, sv the
only clean one** — EN 6 (*"The big dog runs"* over a standing puppy; *"cat naps"* eyes wide open;
*"Six brown hens"* over ONE hen; *"frog hops"* sitting; *"wet pig digs"* dry and sitting; *"Two
black bats fly"* over one slate-and-pink bat, not flying), DE 5, FR 6 (incl. `gelbe Bus`/`bus rouge`
on a BLUE bus, `chat noir` on an ORANGE cat, `fleur bleue` on a RED flower), PT/IT (`flor roxa`/
`fiore viola` on that same red flower), ES 2, NL 3. Full table in the agent plan file
`you-were-building-second-purrfect-snowflake-agent-a13d115b97660e20e.md` §6.2.


## ✅ `3b9c83a3` — the Italian fix that came out of the late sv #23 panel

A native Italian panel confirmed the diagnosis and **found the mechanism is worse than I stated**:
on a wrong answer the shell does NOT touch `textSpan` (only `hintSpan` + `.tryagain`), so the child
sees **two stacked lines** — the unchanged prompt imperative *and* the hint imperative, with nothing
between the failure and the order. → `Ci siamo quasi: maiuscola all'inizio, punto alla fine e una
frase che si capisce.` (81 chars, down from 109).

⚠⚠ **THE STRING EXISTS TWICE AND ONLY ONE COPY RENDERS.** `hintOrder` is authored in `L.it` (DEAD)
and in `strings.hintOrder.it` (LIVE — `api.t()` resolves against `strings`). **Editing the L copy
alone would have changed nothing on screen**, and the L copy is exactly where an editor lands
because the Italian comment block sits above it. Both updated; the dead one now says so.
⚠ The old string also **NAMED THE ANSWER**: `(Il o La)` hands over tile 1, since only one is ever
present in a round — and capitalising the first word IS L.1.1.j. de/fr/es/pt/nl still do this;
en and sv do not. Filed.

Two more Italian defects the panel found by reading the model, both verified against the pictures
before editing: **`Il fiore viola`** over a red-orange flower (de/es/sv all say red for that same
image; ⚠ fr `bleue` and pt `roxa` are wrong about it too and need their own panels), and
**`pullman`** — a long-distance coach with luggage bays — for a small blue municipal minibus, with
`corre` (running/racing) as its verb → `Il pulmino blu parte.`

⚠⚠ **FILED, LARGEST BY REACH: `lcs-shell.js:39` sets `it:'Bravo!'`.** In French *bravo* is an
invariable interjection; **in Italian it is an ADJECTIVE THAT AGREES WITH THE CHILD**, so every girl
in every Italian classroom is told *Bravo* on every success, in every activity in the catalogue.
Gender-neutral: `Perfetto!` / `Ottimo!` / `Esatto!`. Protected core + catalogue-wide → its own
commission. ⭐ The activity's own `win` string already honours the "praise gender-neutral" note in
its comment — and `win` is wired to nothing.

---

# sv #25 — `sentence-clinic` fix-it L.2.1 (`3021e0a3`)

`Doktor Fjäders meningsklinik` / `forbattra-meningar-arskurs-2`. prose 84 → 85. de #25 = `db3a8338`
("Dr. Plumes Satzklinik", Klasse 2). **Årskurs 2**, strand `Språkliga strukturer och normer`
auto-maps — **no `strand-names.ts` edit and no `GRADE_OVERRIDE`** (`alignment.grade` `'2'` already
resolves to Årskurs 2). Activity layer only: **0 lines to `fix-it-core.js` or `lcs-shell.*`**.

⚠ **The protected core is `fix-it-core.js` — named for the ACTION, not the activity.** I first
concluded this engine had none because I grepped for *clinic*. Its build gate is
`verify-fix-it-core.js` for the same reason. **An engine whose core is named after its verb is
exactly how a protected file gets missed.**

**NEXT = sv #26** — `git rev-list --all --children | grep ^db3a8338` → the child de commit.
sv #1–#25 done, prose 85.

## ⭐⭐ Swedish cannot have the round the whole family drills

All six shipped locales use `swap-agree` for subject–verb agreement (`rennen→rennt`, `mangent→mange`,
`comen→come`, `comem→come`, `mangiano→mangia`, `rennen→rent`). Swedish has none.

⚠⚠ **MY FIRST EVIDENCE DID NOT CARRY IT.** I wrote that the sv `tense` deck stores one present form
per verb against plural subjects and called that proof. The native linguist checked all eight locale
sets: `verb.forms` is `{present,past,future}` and **every subject is plural in GERMAN too** — a
property of the deck SCHEMA, not of Swedish. A reviewer wanting to reject the finding would have won.
⭐ **The evidence that holds is CROSS-DECK:** `simmar` ships with a **singular** subject in
*En randig fisk simmar.* (`sentence-builder` sv) and a **plural** one in *Ankorna simmar* (`tense` sv)
— same form, both native-authored, both live. **A single deck cannot prove the absence of an axis it
never encodes; two decks disagreeing about the same word can.**

## ⭐⭐ Two panels disagreed on the replacement round; a CODE FACT decided it

Pedagogue: `å → och`. Linguist: `särskrivning` (*fot boll* → *fotboll*). The content creator broke it
on the engine: **`swap` replaces exactly ONE token** (`t[targetIndex] = replacement`), so `fot boll`
→ `fotboll` is a delete *and* a rewrite. The workaround I had verified (author `"fot boll"` as one
chip, since `chip.textContent = tok` renders a space verbatim) is real but destroys the visual
grammar — the row already renders a gap between chips, so a space *inside* one bordered box teaches
the opposite of the lesson. Secondary: särskrivning is åk 4+/adult; åk 2 goes the other way
(*hopskrivning*). ⛔ `var/vart` and `de/dem` rejected on the design law by both panels.

## ⭐⭐ The sv #23 collision was DESIGNED OUT, not argued

sv #23 already teaches capital-first + full-stop-last. The kursplan bullet names **four** things
(gemener, versaler, skiljetecken, stavning) and #23 spends itself on two — so this deck takes the
**other two with both actions unchanged**: `capitalize` → stor bokstav i **NAMN** mid-sentence,
`insert-punct` → **frågetecken**. The two decks now exhaust the bullet instead of overlapping on
half of it, and *build-vs-repair never had to be adjudicated*. ⭐ **When two activities collide,
look for an uncovered half of the same bullet before debating whether the overlap is acceptable.**

## ⭐⭐ `del-double`: the pedagogue's own proposal carried the defect the deck exists to avoid

`diagnoseCorrect` for `delete` is a **single** index and a wrong tap routes to `_alright` — *"that
one is already right"*. With two adjacent **string-identical** `till` chips, half of all children
tap the left one and **are told a character-for-character copy of the answer is correct**. ⭐ Every
shipped locale avoided it — `she`/`sie`/`elle`/`ella`/`ela`/`lei`/`zij` are all unique in their
sentence. → `Jag kan att simma.` (no Swedish modal licenses *att*; correct in no register).
⭐ Taking it accepts an L2/immersion-shaped round, and **CLAUDE.md §1 settles that without an
operator question**: the audience *is* international / dual-language / immersion schools.

## ⭐ `order-svo` pins BOTH ends

`["ska","läsa.","Imorgon","jag"]` → `[2,0,3,1]`. The capital on *Nu/Imorgon* AND the welded full
stop leave exactly one well-formed order. The linguist supplied the both-ends lock; the content
creator supplied the non-reversal (below); **neither panel had the other's finding.**
⚠ *imorgon* was kept but has a live one-word/two-word doublet — avoid it in any deck whose swap
round is about joining two words.

## ⭐⭐⭐ THE REORDER TRAY IS NOT SHUFFLED — 4 of 7 locales ship a round solvable without reading

`_renderReorder` builds its tray with `this.round.tokens.forEach` — **descriptor order, no shuffle**
(`shuffledOrder` is used only for the swap/insert chip tray). So `correctOrder: [3,2,1,0]` means the
answer is literally **tap the tray right to left**, deterministically, every session, in any
language. **en, de, fr, nl all ship exactly that**; es/pt/it use `[3,1,0,2]`.
⭐ And the author **allocated the shuffle and never wired it**: `this._reorderTray` and `this._seed`
are each written once and read nowhere. *Two dead fields named for the missing mechanism are why
this survived — the code LOOKS like it shuffles.*

## ⭐⭐ FIVE repairs to all seven locales, none authoring a new string

1. ⚠⚠ **`_giggle` announced the `convention` on EVERY wrong tap** while the visible caption is gated
   on `if (this.readOnly)`. Measured across the 49 shipped rounds: **in 5 of the 21 chip rounds the
   announced rule names the correct chip as a whole word** (de `rennt`, fr `mange`, pt `come`, it
   `mangia`, nl `rent`). A blind child tapped once, was told the answer, tapped it.
2. ⚠⚠ **The mirror image**: `alright`/`giggle`/`soundsRight` reached ONLY `api.announce` — **21
   authored strings (3 × 7 locales) rendering on no screen in any locale**, so a sighted child
   tapping a healthy word got a beep and nothing else (`_setPose('examine')` collapses to `'idle'`,
   a no-op). ⭐ **The dead-string defect in a variant a source scan AND a reachability recorder both
   pass: the string IS reached, in one channel only.**
3. Solved insert rounds drew the repaired sentence **plus an empty pulsing notch** — the `sc-gap`
   render had no `readOnly` guard, four lines above a seam block that had one.
4. `_win`'s speak normalisation handled `.` and `,` only; the sv question round is the FIRST in the
   catalogue to end in `?` and would have been spoken *"Vad heter din hund ?"*.
5. `speak()`'s fallback ternary ended in `'en-US'` with no sv branch → a table (the sv #24 shape).

⭐ Adding the `.sc-msg` line **enrolled this activity in the visual-qa SCALE gate for the first
time**: that gate finds the feedback region as `.lcs-stage [aria-live]` and **SKIPS entirely when
there is none**, so a deck with no live region is invisible to it.

## ⭐⭐ The gate never opened the manifest — 42 rounds, zero coverage

`verify-fix-it-core.js` read `Core.buildRounds()`, a fixture hard-coded **inside the core**. Now
**56 rounds across 8 pools**. ⭐ Unlike `pronoun`, **no scope split was needed** — measured: no pool
carries `answer`/`correctIndex`, so one loop covers all eight. Three new assertions, each catching a
live defect, each with its locale in a **ratchet that may only shrink**; proven to FAIL on the live
manifest when the ratchet is emptied.

⚠⚠ **A FOURTH ASSERTION WAS WITHDRAWN BEFORE IT WAS WRITTEN.** I had planned *"a chip-action
convention must not name its own replacement"*. That is a defect only while `_giggle` announces it
pre-solve; with that fixed, naming the answer post-solve is exactly **right** — it is the reward
caption. As a DATA rule it would have condemned the correct Swedish `Vi säger ”å” — men vi skriver
”och”.` **The ban-too-wide trap, caught one step before it shipped.** It became a RUNTIME assertion
in `local-test`, driving a real miss — **measuring the CHANNEL, which was the actual defect, not
the data.**

## ⭐⭐ The phase driver: `alright` and `miss` are the SAME phase

Seven decks shipped and no sweep had ever photographed a repair resolving. I first wrote two phases
and the harness refused them — **correctly**: the three single-tap actions (capitalize/delete/split)
resolve on a correct diagnosis, so they have **no repair to miss and no second distinct state**.
One `nudge` phase, preferring the coral repair-miss where one exists.
⚠⚠ **A freeze IS required here** (480 ms giggle / 600 ms reorder reset / 700 ms sparkle) — sv #24's
"no freeze needed" was specific to an activity with no `setTimeout` at all. **Measure, don't
pattern-match.**
⚠ The 21 renders on disk were **bare-named, meaning English by the harness's own convention, and
Italian in content** — they predate the locale-suffix rule by two weeks. This run restored a true
English baseline at those names. *An inference from a naming convention is not a measurement.*

## ⭐⭐ The sweep found tap defects NO locale had ever passed

English failed the tap floor at the **opening frame** in every round: the full stop 23px, the split
seam 14px. Fixed by making punctuation a **non-control** (no round diagnoses it — and it is the
"activity calling a mark a word, in a deck that teaches punctuation" defect a panel had named), and
by giving the seam a 44px hit box with `margin:0 -15px` so it contributes 14px of layout — **safe by
construction**, since `_tappableWord` is false for `split` and the neighbours are spans.
⚠ **WIDTH, NOT HEIGHT, broke the 320px Fold cover** in fr/pt/it: the scene renders 243px there and
the tray needs 227px against ~211px of card, so it wrapped a row.
⚠⚠ **A SINGLE-CLASS OVERRIDE CANNOT BEAT THE SHELL.** The shell's rule is
`.lcs-app.activity .lcs-activity-prompt` — **two classes** — so my `.lcs-activity-prompt` override
lost however late it was injected, and lost **SILENTLY**: the computed size stayed put through four
measurements while the declaration sat there looking applied. *Sibling of "a media query adds no
specificity".*

## ⭐⭐⭐ What READING THE RENDERS found that no gate could

- **The prompt was `clamp(22px,6vh,48px)` — 48px on desktop against 22px sentence chips.** The
  INVARIANT question at nearly twice the size of the only thing the child reads to answer it, taking
  more vertical space than the whole card. **The sv #24 inverted-hierarchy defect, and the SCALE gate
  is structurally blind to it** — it only asks whether the feedback line GROWS.
- **Coral said two opposite things one line apart**: the correctly-diagnosed word wore a coral ring
  under a coral *"Hoppsan — inte riktigt"*. Diagnosing right is a success → it takes the success
  colour, and coral now means only *look again*.
- ⭐ **The visual critic measured the miss text at 3.56:1 on cream** — below the 4.5 AA floor, so the
  message a **struggling** child most needs to read was the only text failing it, at 60% of the
  contrast given to the success line. ⚠⚠ **I COMPUTED the replacement instead of eyeballing: my own
  first guess `#C24A22` measures 4.43 and would have shipped STILL FAILING.** `#B8431C` = 4.94.
- **Free wrapping is a teaching surface here.** The split round broke the line between `det` and
  `var` — a line break being the strongest sentence-boundary cue a seven-year-old has, while the
  real seam sat mid-line — and left a coral seam tick dangling with no word after it; and the full
  stop wrapped onto its own line, centred and alone above the tray, reading as a fourth option.
  → **non-breaking groups**: punctuation glued to the word before it, a seam to the word it opens.
- No seam is offered **before punctuation** (a split there ends the sentence immediately before its
  own full stop). The repaired word is marked in **every** round, not only swap. The progress track
  is centred instead of left-aligned at 70% of a centred board.
- ⭐ The critic **retracted two of its own findings after re-measuring**, including the hierarchy one
  — because my fix had already landed. *Ask a critic to re-verify before filing; it did.*

## ⚠⚠ THE TERRITORY MAP IN THE REPO IS STALE

`asking-bench.js:41-44` certifies *"worksheet-gen's 240 printable types have zero sentence-level
literacy"*. Measured: `scripts/worksheet-gen/i18n/strings.sv.json` holds **478** Swedish types and
four teach this activity's actions verbatim (`G2-274` stor bokstav + skiljetecken, `G2-307` *"Två
meningar sitter ihop. Dela på dem."*, `G1-283` ordföljd, `G2-282` namn + skiljetecken).
⚠ **That whole i18n layer is DOTFILES** (`.landing-*-sv.json`, `.nsr-sv-*.json`) — invisible to a
normal search, which is exactly how the fence went stale unnoticed. **A search tool's default
exclusions are a source of false "clean" findings** — the same class as the gitignored
`frontend/public/mini-tools/` mirror.

## sv house style confirmed in use (from the shipped literacy siblings)

”…” both sides · em dash with spaces · **`Vilket ord`, never `Vilken form`** (*form* = geometric
SHAPE in this catalogue) · praise `Precis!`/`Just det!`, never a bare `Ja!` · Check = **`Kontrollera`**
· nudges must differ from the shell's `Inte än — försök igen!` · **no ordklass metalanguage reaches
the child** (Lgr22 names none at åk 1–3) · **Swedish copy is the longest in the family** — budget for
it BEFORE the sweep · `hen` is the sanctioned gender-neutral singular.
⚠ **`mening`, NEVER `sats`** — Swedish *sats* is a CLAUSE (huvudsats/bisats, åk 4+) and also *batch*.
Pattern-matching de's `Satzklinik` would be wrong Swedish AND wrong band, in the one field an adult
searches on.
⚠ `Doktor Plåster` was the pedagogue's pick and **the file's own header forbids it**: *"NO
surgery/scalpel/bandage language … the trouble cue is a soft thinking-GLOW (not a bandage)"*.
**`Doktor Fjäder`** is better than the English source — *Plume* is a feather pun and stops there,
while **fjäder → fjäderpenna** is a writing instrument, so the Swedish name carries the subject.
`Ljuddoktorn` is reserved for `word-clinic` (L.1.2.e, *by ear*) — the two then differ on doctor, on
unit (mening vs ord) and on channel (skrift vs ljud).

## ⚠ Filed, NOT fixed

`nl swap-agree` offers `rennen` as the repair for `rennen` · `order-svo` solvable right-to-left in
en/de/fr/nl · four locales' `del-double` marks real spoken left-dislocation wrong · **the insert
rounds have NO diagnose step at all** (`setupTask` puts them straight into `'repair'`, the gap is a
`<span>`), so for 2 of 7 rounds blind guessing is the only interaction — contradicting the file's own
header · `_setPose('examine')` is a no-op catalogue-wide in this activity · `asking-bench.js`'s fence
comment.

## Verification

visual-qa **8 locales × 126 = 1,008 renders**, all pass, with the new driver. verify-fix-it-core 56
rounds / 8 pools + 9 poisons + ratchet, proven to FAIL when emptied. local-test en+sv, all 7 actions,
**poison-tested against the pre-fix code in both locales — each poison caught by the assertion it
NAMES**. preflight 204. content-sv 85/85. serp-copy, prose-claims, variety (7 locales; sv excluded —
it probes production). `tsc --noEmit` at exactly the 7 baseline blog-test errors. Visual critic on the
full sv sweep + I read the 360/768/1024 sv renders myself.
⚠ Only the **21 already-tracked** renders were committed; the 483 new locale-suffixed ones stay local
QA artifacts, as every render in this directory always has been.

---

# sv #26 — `sage-root-garden` · root words L.2.4.c · **SHIPPED `369cb114`** (pushed, NO deploy)

*Salvias ordträdgård* — a tortoise shows a small word and the child taps which of three words grows
out of it. Årskurs 2, strand **`Ord och begrepp`**, slug `ord-som-hor-ihop-ordbildning-ak-2`,
sv prose 85 → 86. de source `7d3052db`. 32 files, **0 lines to `root-word-core.js` or `lcs-shell.*`**.

## ⭐⭐⭐ FIVE OF SEVEN SHIPPED LOCALES CAN BE SOLVED WITHOUT READING

The core's only content invariant is `correct.toLowerCase().indexOf(root.toLowerCase()) === 0` — the
answer must **start with the root string**. So a blind strategy exists: *pick the one word that
begins with the root.* Measured over all 56 shipped rounds:

| locale | position | longest | shortest | fixed | **letter bot** | `correctFromRoot` |
|---|---|---|---|---|---|---|
| en | 38% | 25% | 0% | 13% | **8/8** | ok |
| de | **100%** | 38% | 0% | 13% | **8/8** | ok |
| fr | **100%** | **75%** | 13% | 13% | **8/8** | ok |
| es | 38% | **50%** | 0% | 13% | **8/8** | ok |
| pt | **100%** | **100%** | 0% | 13% | 2/8 | **4 FAIL** |
| it | **100%** | **75%** | 0% | 13% | 0/8 | **8 FAIL** |
| nl | **100%** | **100%** | 0% | 13% | **8/8** | ok |
| **sv (new)** | **38%** | **25%** | **0%** | **13%** | **0/8** | **ok** |

`sun -> sunny / funny / bunny` is decided by three letters. L.2.4.c is entirely about a root as a clue
to **meaning**, and in five locales no meaning is ever consulted.

⭐⭐ **And the two locales that FAIL the core's invariant are the only two that teach the standard.**
12 of 56 rounds violate `correctFromRoot` — 8 it, 4 pt — because `gatto->gattino`, `dente->dentista`,
`livro->livraria` change the stem vowel. Those same pools defeat the bot, with foils like
`dente -> dentro` and `mar -> martelo`. **The invariant is anglocentric and the well-designed pools
are the ones it condemns.**

⚠ **The two bots are different animals.** `positionBot` is 1.00 in five locales but `setupTask`
reshuffles the cards every task, so no child ever sees a fixed position — data hygiene, not a live
leak, and I checked before saying so. The **letter bot survives the shuffle**, because matching the
first letters works wherever the card lands.

⭐ **A trap the engine cannot see:** French offers root `chat` -> `chaton` / **`château`**. `â` is
U+00E2, so `"château".startsWith("chat")` is **false** — the best distractor in the catalogue is
invisible to `correctFromRoot` AND to the letter bot. **The French deck is better authored than any
instrument here can measure.** Remember that before any future pass "fixes" it.

## ⭐⭐ THE ACTIVITY'S OWN HINTS TEACH THE LETTER-MATCHING

`hintPick` says the root is *"hiding **inside** one of the words"* — the engine requires position 0,
always. `hintWrong` says a wrong pick *"just looks alike"*. ⭐ **French alone corrected the first one**
(«caché **au début**») **and the fix never travelled back** to English or the five locales sharing it
— and French fixed only ONE of its two hints.

⚠⚠ **This is what forced the Swedish copy to be re-authored rather than translated.** The whole design
below puts root-initial FOILS on the board, so *"that one just looks alike"* is a **flat lie in six of
eight rounds** — `soldat` really does contain `sol`. The Swedish admits it:
«Det ordet börjar likadant — men det handlar om något helt annat.»

## The Swedish deck — the only pool that passes everything AND kills the bot

Nothing forbids a **foil** from also starting with the root, and Swedish is unusually rich in loans
whose opening syllable coincides with a native noun. Every round offers ≥2 root-initial choices:

| band | root | correct | foils (⭐ = shares the root's letters) |
|---|---|---|---|
| 1 | `sol` | **solig** | ⭐soldat, soppa |
| 1 | `sand` | **sandig** | ⭐sandal, sadel |
| 1 | `snö` | **snöboll** | ⭐snöre, snickare |
| 2 | `hund` | **hundvalp** | ⭐hundra, hus |
| 2 | `mat` | **matsäck** | ⭐matta, ⭐matematik |
| 2 | `hår` | **hårig** | ⭐hård, hammare |
| 3 | `bil` | **bilbana** | ⭐bild, ⭐biljett |
| 3 | `stor` | **storlek** | ⭐stork, ⭐storm |

No suffix is a cue (two `-ig`, four compounds, one `-lek`) and the long foils (*matematik, snickare,
biljett, hammare*) keep `longest` at 25%.

⚠ **Stated conservatively, because two panels measured it two ways.** Strict (*only one choice starts
with the root, so take it*) = **0/8**; guessing uniformly among the root-initial choices ≈ **45%**,
which does **not** reach the 33% chance floor. A large measured win — **not** elimination. The commit
says so.

⚠ Own caveat: **`bilbana`** is the least universally owned word. `bil -> biltvätt` preserves every
measurement (longest 25% -> 37.5%, still under 45%) if a later panel objects.

## ⭐⭐ THE FENCE — and the word that was already taken

⚠⚠ **`ordfamilj` is ALREADY TAKEN IN SWEDISH and means a RIME family.** `translations-cvc-words.js`
ships *"Sortera ordfamiljer"* and `tool-content/sv.json` defines it publicly as *"ordfamiljer med
svenska rimdelar som -al och -ål"*, to the same age band. **My own slug candidate was
`ordfamiljer-…`** — it would have claimed a word this platform already teaches as *bil/sil rhyme*.

⭐ **The fence test, reusable:** *a word is fenced if a shipped Swedish deck taught a RULE whose
correct output this engine must reject.* That fences `fot, tand, hand, bok, natt, bror` (all omljud
rounds in the sv plural deck, whose slug is literally `plural-av-substantiv-fot-blir-fotter-…` — a
child who just learned *fot -> fötter* would answer `fötter`, which `correctFromRoot` can never
accept) and, for the softer inflection-vs-derivation blur, `lek` and `dans` from the sv tense deck.
It does **NOT** fence `sol` or `hund`: no rule about their families was taught, and the standard
requires a **known** root, so familiarity is the good kind of collision.

⭐ The compounds fence held **mixed**, not never: *sammansatta ord* are the salient åk 1–3 topic and
*avledning* is the weaker half, so a compounds-never rule would strip the deck of the words a Swedish
child owns. `compound-meaning` (L.2.4.d) has no `slug.sv` and no `roundsL10n.sv`, and every root here
throws off compounds it can still use (*solglasögon, snögubbe, hundkoja, matsäck*).

## The content creator broke the panels' tie, and the rejections are the value

Two decks were proposed (pedagogue `-ig`/`-are`, linguist compounds); the creator took two rounds from
each and replaced the rest: `mod -> modig` — **a child owns *modig*, not the bare noun *mod***, so the
round has no meaning path · `vän -> vänlig` — ***vänster* IS etymologically related** (ON *vinstri*,
"the friendlier hand"); synchronically unrelated so it would work, but **a deck whose whole claim is
truth about word families will not carry a disputable pair when eight clean ones exist** ·
`mat -> mata` — the answer would be the **shortest** word differing by one letter of consonant length,
i.e. a **spelling** discrimination · `mor -> mormor` (a modern child says *mamma*) ·
`bad -> badrum` (*badminton* is nine letters of foreign orthography) · `rik -> rikedom` (abstract both
ends) · `dans` (fenced).

## ⚠⚠ The strand override goes on the ROUTE, never the manifest

`alignment.strand` is `"Language"`; changing it would silently re-point **all seven live locales'**
chip, JSON-LD `teaches`, byStrand prose and index entry. fr/es/pt/it/nl were already routed to the
vocabulary strand with written native rationales; **sv was missing**, so Swedish would have filed
*sol -> solig* under grammar-and-spelling-norms while filing *o-/-full/-lös* under vocabulary — the
same eixo, two strands. One key at `page.tsx:186`, blast radius one locale.

⭐ Honest counter recorded: `strand-names.ts` chose `Ord och begrepp` **over** `Ordförråd och
ordbildning` precisely because *ordbildning* over-fits the affix deck — and it over-fits this one too.
Still right, for the same reason. **`ordbildning` belongs in the slug, not the chip.**

⭐ **Grade needed no override.** Lgr22 states svenska's centralt innehåll once for the whole åk 1–3
band and **does not name ordbildning at all** — there is no sentence to appeal to in either
direction, so the progression alone decides, and it sits at the TOP of åk 2, *after* sv #22 (`affix`
hands the child the morpheme; this one names nothing and requires rejecting a same-prefix impostor).

## The gate read the English pool and stopped

`verify-root-word-core.js:31` was `manifest[0].params.rounds`. **48 shipped rounds had never been
through a single assertion** — which is how 12 `correctFromRoot` violations and 12 over-ceiling bot
scores reached production. Now walks all **8 pools** (8 rounds/1 pool -> **64/8**), adds the **letter
bot** (⚠ `deckFacts` is in the protected core, so it lives in the gate) and an **inflection check**
(`correctFromRoot` happily accepts `sol->solen`, `hund->hundar` — böjning, not ordbildning), plus a
**palette-completeness check** (no undefined `C.*`). 14 poisons, **17 named exemptions**, proven to
FAIL on **27 live violations** when the ratchet is emptied.

⚠⚠ **THE INFLECTION CHECK ACCUSED THIRTEEN CORRECT ROUNDS ON ITS FIRST RUN** — English agent nouns
(`teach->teacher`), German infinitives (`wasch->waschen`), Spanish `solar`, Dutch `speler`. `-en`,
`-er` and `-ar` are inflection in Swedish and derivation in those languages. **Scoping it to `sv` is
not a softened threshold: an unscoped version would have been making EXACTLY the category error this
gate exists to document in the core.** A morphological rule belongs to the language it describes.
Three **scoping controls** now assert the same string fires in sv and does NOT fire in en/de.

⚠⚠ **DO NOT "repair" the Italian and Portuguese rounds.** Correct Romance morphology meeting an
anglocentric invariant; exempted **by name**. A future pass that "fixes" them turns eight correct
Italian rounds into rubbish.

## The sweep had never seen a choice made

No phase driver existed -> seven shipped decks had only ever been photographed at the **opening
frame**, and the 24 renders on disk were **bare-named** (= English by the harness's convention). New
driver, four phases `open -> picked -> missed -> resolved`, **192 renders per locale**.

⚠ **NO freeze needed, and that was MEASURED not assumed:** the activity holds exactly one `setTimeout`
(320 ms, the root read-aloud) and it changes no pixels. sv #25's clinic needed one for three transient
states; sv #24 needed none. **Measure, do not pattern-match.**

⭐ It immediately found a live defect in two locales: the tortoise's speech bubble **clipped
mid-sentence** at 360 and 412px in de and es (`-webkit-line-clamp:2` eating «finde die Wortfamilie!»
and «¡encuentra la familia!»). Fixed in CSS -> both locales repaired without touching a word either
panel wrote.

## ⚠⚠ AND THE CRITIC CAUGHT MY OWN BUG — the recorded trap, made by me

I fixed the coral-on-a-success-screen defect with `border-color: C.GOOD`. **This activity's palette
has `GREEN`; `GOOD` belongs to a SIBLING's palette.** An invalid declaration is **dropped WHOLE and
SILENTLY**, so `.srg-sel`'s coral won and the checked-correct card stayed coral — *the exact defect
the rule was added to fix, shipped inside the fix.* Found by the critic reading the render AND the
source. There is now a check that no `C.*` reference is undefined.

The critic also measured two contrast failures I had not — the strategy line at **3.39:1** and the
selected word at **3.68:1**, both under the 4.5 AA floor, on the two strings a struggling child most
needs. ⭐ **I computed the replacement rather than eyeballing it** (4.70 / 5.11) and raised the
strategy line's floor from 11.5px, the smallest text on a screen built for seven-year-olds.

And it found that a **WRONG Check changed nothing on the board at all** — the card kept the coral it
already wore. ⭐⭐ **The most common child state had no feedback, and my own driver could not have
shown it because no phase drove it.** Added both: a quiet neutral treatment for the tried card (no
red, no X) and the fourth phase that photographs it.

## What else reading the renders found

The prompt rendered at **48px against 24px word cards** — the invariant question at twice the size of
the only thing the child reads to answer. Same shell rule, same repair as sv #25, and ⚠ it must carry
the shell's own **two-class specificity** or it loses silently.

`theAsk` was a near-verbatim restatement of the prompt in every locale — the child reads the same
sentence twice in two sizes. ⭐ Swedish uses that persistent line for the **strategy** instead:
«Titta på vad orden betyder — inte bara på bokstäverna.» The one always-visible line now teaches the
thing the English hints teach backwards.

## ⭐⭐ A CATALOGUE-WIDE a11y defect, found by asking which strings are actually REACHED

`lcs-shell.js` builds the container `aria-label` from `'Interactive {title} activity. {instruction}'`
and fetches it with `i18n.t(tool.strings,'instruction')` — and **`i18n.t` returns the RAW KEY when the
entry is absent**. `sage-root-garden` declared no `instruction`. Measured: **37 of the 120 activities
with a strings block do not declare it**, so each announces itself to every screen-reader user, in
every locale, as *"Interactive <Title> activity. **instruction**"*.
⭐ **Here the fix cost no new copy** — every locale already ships a `prompt` that IS the instruction,
so all eight are repaired from existing native strings. **The other 36 are FILED**: mechanical in
shape, but each needs a judgement about which string is the real instruction across 8–11 locales.

## Agent claims I corrected by measuring — two of four, again

Prose exists in **all seven** shipped locales (the survey said en-only) · the strand override **IS**
needed (the sweep said "none, same as affix"; the two manifests declare different strands) ·
**three** German rounds are capitalisation-solvable, not four (`lach -> lachen/machen/Sachen` has two
lowercase choices) · **RETRACTED**: `hintWrong` cannot fire on a correct answer — `lcs-shell.js`
dispatches the hint only inside the `else` of a failed Check. **Worth the two minutes: the "fix" would
have been a change to correct code.**

## ⚠ Filed, NOT fixed

37 activities announce the raw token `instruction` · 12 bot violations + 12 `correctFromRoot` failures
across six locales (⚠ do NOT repair it/pt) · **the English source**: `about[1]` asserts *"a child
cannot win on the first few letters"* — **false in all eight English rounds**, inherited by
de/fr/es/nl; `hintPick` says *inside*; `care -> careful` uses **-ful**, which the affix sibling owns;
and the deck contains **no unknown word anywhere**, so the root is never a clue to anything ·
access claims (`no account` / `ohne Anmeldung` / `sans inscription` / `senza registrazione`) ·
**German ships a different activity from the other six** — six of its eight roots are **bound stems
that are SPOKEN ALOUD**, against this file's own documented ruling that the root must be *"a real
sayable word"* · `win` declared in seven locales and reached by nothing.

## Verification

visual-qa **8 locales × 192 = 1,536 renders**, all pass, with the new four-phase driver.
verify-root-word-core **64 rounds / 8 pools** (was 8/1), 14 poisons incl. three scoping controls,
17 named exemptions, proven to FAIL on 27 live violations when emptied. local-test en+sv with ids read
from the **pool** (per-locale here, unlike sv #25) and the title from the shipped strings table, plus
a runtime letter-bot assertion poison-tested to fire at 2/8. preflight 204. content-sv **86/86**.
serp-copy, prose-claims, variety (7 locales; sv excluded — it probes production). `tsc --noEmit` at
exactly the 7 baseline blog-test errors. Visual critic on the full sv sweep + I read the 360/768/1024
sv renders myself.
⚠ Only the **24 already-tracked** renders were committed; the 744 new locale-suffixed ones stay local
QA artifacts, as every render in this directory always has.

---

# sv #27 — `olive-kind-of` · categories L.1.5.b · **SHIPPED `c99c3516`** (pushed, NO deploy)

*Olgas grenar* — an owl shows a picture plus a written clue and the child taps which of three words
is the CATEGORY. Årskurs 2, strand **`Ord och begrepp`**, slug `overbegrepp-vilken-sorts-sak-ak-2`,
sv prose 86 → 87. de source `89302dc7`. **0 lines to `category-define-core.js` or `lcs-shell.*`**.

⭐ The protected core is named for the ACTION, not the activity, for the **third consecutive build**
(`fix-it-core` → `root-word-core` → `category-define-core`).

## ⭐⭐⭐ FIFTEEN SHIPPED ROUNDS ARE CORRECT ONLY BECAUSE A FOIL IS NEVER OFFERED

`facts().oneMatch` is a STRING test, so nothing stops a round offering two words that are BOTH true
of the target. Measured:

- **The FRUIT round, in every single pool — 8 of 8.** A banana is filed under `food` while `plant` is
  a correct answer elsewhere in the same deck. A banana **is** plant matter. Saved only because
  `plant` is never OFFERED there. It is the one round all seven locales share.
- **The FISH round, in all six non-English pools** — `animal`, while `food` is live in the same deck.
- English also ships `bird` (robin) and `animal` (dog) as correct answers, kept apart by omission.

⭐ **The new assertion ships GREEN on all 56 shipped rounds with an EMPTY ratchet** — it does not
document a backlog, it makes the class unshippable. And it is catalogue-wide *precisely because* what
a banana IS is a fact about bananas, not about English: every pool uses the same image nouns, only
the category WORDS differ, so the truth table keys on the shared noun + a per-locale label map.
**That is deliberately NOT the sv #26 shape**, where an English morphology rule had to be scoped.

The second assertion — exactly ONE membership across the whole set — **IS scoped to sv**, and the
scoping is the substance: *"would a seven-year-old defend the other answer?"* is a claim about
Swedish children, not a botanical identity. Two scoping controls prove the same fish/banana targets
fire in sv and NOT in en/de.

## ⭐⭐ Two shipped locales hand over the answer in the clue

| locale | round | category | clue |
|---|---|---|---|
| de | `banane-essen` | `Essen` | *"Man kann sie **essen**. Sie ist gelb."* |
| nl | `banaan-eten` | `eten` | *"Je kunt hem op**eten**. Hij is geel."* |

⭐ **The pair is what made the check precise:** de's is a standalone word (a boundary match catches
it), nl's hides INSIDE `opeten` (a boundary match does not). So the rule needs the boundary match
**and** an explicit per-category FORM list — never a bare stem, because `mat` as a substring
false-fires on **`tomat`** and **`matta`**, and `eten` on `weten`. ⚠ `\b` is ASCII-only and would
silently never match a Swedish word; use `(?<!\p{L})…(?!\p{L})`.

## ⭐⭐ The gate read the English pool and stopped — THIRD BUILD RUNNING

`verify-category-define-core.js:31` was `manifest[0].params.rounds`; `roundsL10n` appeared nowhere.
48 of 56 rounds never asserted → de/fr/nl all at **positionBot 100%** against the file's own 45%
ceiling. Now **64 rounds / 8 pools**, 15 poison cases, 5 named exemptions, proven to FAIL on exactly
those 5 live violations when emptied.
⚠ positionBot is NOT a live leak — `setupTask` reshuffles the buttons every task. Data hygiene.

## ⭐⭐⭐ What Swedish could not translate

- ⚠⚠ **`grupp` is UNUSABLE.** The English `theAsk` is *"Tap the **group** it belongs to"*, and Swedish
  `grupp` is the **counting** word — load-bearing in ≥5 shipped sv MATH decks (*"Vilken grupp har
  fler?"*, *"Lika grupper – upprepad addition"*). Translating it imports the counting word into a
  vocabulary deck in the one locale where it is already spoken for. Child-facing word = **`sort`**;
  **`överbegrepp`** (0 repo occurrences, and what a teacher actually searches) carries the slug and
  page title and never reaches the screen.
- ⚠⚠ **AN INVARIANT SWEDISH PROMPT CANNOT CONTAIN AN ANAPHORIC PRONOUN.** `den`/`det` agrees with each
  round's noun gender and the prompt is ONE string across all rounds, so *«Vilken sort hör det
  till?»* and *«Vad är den för sorts sak?»* are both dead. The escape is the **identificational
  `det`** («Vad är det för sorts sak?»), which does not agree. German survives its own version for
  the same reason; en/fr/nl never had the problem. ⚠ Predicative adjectives agree too — *Det är
  rött*, never *Det är röd* — so the clue's opening pronoun is asserted against the label's article.
- ⚠⚠ **The rose clue is a STEM-LEVEL LEAK in Swedish and nowhere else:** `växer` and `Växter` share
  `väx-`, and every locale clues the rose with *"grows in a garden"*.
- ⚠⚠ **The banana — the only round all seven locales share — is NOT PORTABLE.** A Swedish child taught
  *vad växer* answers `Växter` and is RIGHT. Two panels wanted to keep it with `Växter` merely off
  its board — safety by omission, i.e. exactly the state of the 15 rounds above, and it would have
  forced me to exempt my own new round on day one (ratchet-as-approval). Replaced with `en pannkaka`.

## ⭐⭐⭐ TWO IMAGE FILES ARE NOT WHAT THEIR FILENAME SAYS — and no gate can see it

Found by the content-creator panel OPENING the files; **I confirmed all three with my own eyes**:

- ⚠⚠ **`clothing/pants@2x.webp` is knee-length SHORTS.** `byxor` over it is wrong and the clue *"på
  benen"* would describe a garment not shown. `clothing/trousers@2x.webp` is correct — and **both sit
  in the same folder**, so a stem-matching build picks either. This one would have shipped.
- ⚠ **`tree/oak@2x.webp` is a generic broadleaf** — no acorns, no lobed leaves. `label` is SPOKEN
  ALOUD and used as `alt`, so *"ek"* would teach a wrong word to the child who cannot check it.
  **The label follows the PICTURE, not the filename.**
- ⚠ `At the Supermarket/egg@2x.webp` is **three** eggs in a carton → bare `ägg` + a plural clue (the
  same no-article-when-plural rule `byxor` needs).

⭐ **`image-vocabulary.js` is authoritative for WHICH WORD but cannot say what the picture SHOWS** —
it maps both `pants` and `trousers` to `Byxor`. Only opening the file settles it. That step now sits
in the DoD, not in a gate.

## The sweep had never seen a choice made — and its first run found a defect in every locale

No phase driver → seven decks photographed only at the opening frame; the 24 renders on disk were
bare-named (= English by convention). New driver, four phases `open → picked → missed → resolved`,
192 renders/locale. ⚠ A freeze IS required — see the critic section below, where my claim that it
was not cost a false finding.

⭐ First run: at **320×640 in the WRONG-ANSWER state** the shell adds its hint inside the prompt
(+33px) and pushed Check to 655px — **cut off in every locale, English included**, invisible for as
long as only the opening frame was photographed. The repair took two goes; see below.

## ⭐⭐ What reading the renders found that no gate could

- ⚠⚠ **The CORRECT answer wore the coral SELECTION colour on the success screen**, beside a green
  *"Bra jobbat!"* — the child's right answer flagged in the attention colour at the moment of
  celebration. **The sv #26 defect exactly, live here in all eight locales.** The success mark now
  asserts the **RESOLVED border colour**, not the class, because `.okt-right` and `.okt-sel` are both
  two-class rules and only ORDER breaks the tie; poison-tested by moving the rule above `.okt-sel`,
  which reports the coral back (`rgb(242, 120, 75)`).
- ⚠⚠ **MY OWN AA FIX WAS SILENTLY DEFEATED.** I raised `.okt-ask` from an 11.5px floor to 14px and a
  LATER `@media (max-width:380px)` block pinned it back to **11px** — on the narrowest phones, where
  it matters most. A media query adds no specificity, so the later rule wins. Caught by measuring the
  **computed style**, not by trusting the edit.
- Contrast computed, not eyeballed: `#D9572F` measured **3.37–3.85:1** across three text roles
  (strategy line, clue label, SELECTED word) — all below 4.5 AA, none large text. `#B8431C` = 4.68–5.35.
- The wrong-answer board said **nothing at all**; there is now a quiet neutral mark on the card the
  child tapped (no red, no X) and the driver photographs it.

## ⭐⭐⭐ THE VISUAL CRITIC'S HEADLINE FINDING WAS A DEFECT IN MY OWN DRIVER

It reported that at **1024 the wrong-answer feedback does not appear at all** — plain green heading,
no message, in all 8 rounds, while 360 showed both. A real observation of a real artefact, and **the
defect was in the phase driver, not the activity**: `lcs-shell.js:885` clears `.tryagain` and blanks
the hint after **1800 ms**, and the harness drives a phase ONCE then sweeps six viewports at ~260 ms
each — so the wide viewports photographed a state that had already auto-dismissed.

⚠⚠ **My driver's docblock said "NO FREEZE NEEDED, and this was MEASURED."** I had measured the
ACTIVITY's timeouts (one, 320 ms, no pixels) and **never looked at the SHELL's**.
⭐ The lesson is narrower than *always freeze*: **measure the timers of every layer that can mutate
the screen, not just the one you own.** The freeze is filtered to the exact 1800 ms delay, because a
blanket `setTimeout` stub would be the ban-too-wide trap in a new place.

⚠ And the assertion I added alongside it (*the hint TEXT is on screen, not just the class*) **cannot
catch this class** — it runs at drive time, when the hint is still present. The freeze is the fix;
the proof is reading the 1024 render.

### Confirmed and fixed from the same report
Speaker badge covered a **measured 21.9%** of the picture at 320/360 — a fifth of the only thing the
child reasons from — now on the card edge · the greyed tried card was **3.30:1** (my own new rule) →
5.04 · every success frame said *"Bra jobbat!"* AND *"Tryck på rätt sort."* above the answered board
· **coral carried THREE meanings** (standing instruction, selection, verdict) so the neutral
instruction gave up its claim (teal, 5.48–5.78:1) · the answer cards were the palest thing on a board
whose REFERENCE boxes wear the loudest colour → border 2.07:1 against the gold boxes' 2.09.

### ⭐⭐ And the canoe was wrong Swedish
`fordon` is conventionally a LAND vehicle — trafikförordningen: *"en anordning på hjul, band, **medar**
eller liknande … för färd på marken"*. A canoe is a *båt*, and the clue *"den har inga hjul"* argued
against its own answer. Replaced with **`en släde`**, which is regulatorily a fordon *because* of the
**medar** (runners) — so the deck keeps its best idea (round 2 teaches *har hjul → Fordon*; round 8
says *inga hjul, men…* and is still Fordon) and is now correct. The plank top sharpens the `Möbler`
trap too.

### ⭐ One finding refuted, one already gone
**Refuted:** *"the answer cards are ~37px, the smallest targets, below the chrome."* The DOM says
**44px at 320, 48px at 360/412, against 44px chrome** — equal or larger. It had measured off a 2×
screenshot. **Already gone:** the round-1 layout jump at 360 was the old `flex-wrap:wrap` behaviour,
which the narrow-viewport fix had already made uniform.

## ⚠⚠ THE NARROW-VIEWPORT FIX WAS NOT ENOUGH THE FIRST TIME

The new `missed` phase found a cut-off at 320×640 **in every locale, English included** — the shell's
hint adds 33px inside the prompt, pushing Check to 655px. My first repair recovered **6px and German
still failed**. The honest fix was structural: at ≤380px the picture and clue were **STACKING**,
spending the picture's whole height twice. Side by side → that row 150px → **69px**, Check 655 → 577.
⭐ Incremental trimming hid the real shape of the problem; the second look found 60px, not 6.

## ⚠ My own instrument read a COMMENT as code

My ad-hoc palette-completeness check reported `UNDEFINED PALETTE KEYS: GOOD` — and the only `C.GOOD`
in the file was inside **the comment describing the sv #26 trap**. Strip comments before scanning;
a gate that reads prose is the recorded trap in a new dress.

## The shell has been announcing a raw token

`lcs-shell.js:449` builds the container aria-label from `i18n.t(tool.strings,'instruction')`, and
`i18n.t` returns the RAW KEY when absent. Swedish announced *"Interaktiv Olgas grenar-aktivitet.
**instruction**"* — correct scaffolding, English token bolted on. Repaired from each locale's own
`theAsk`: all eight fixed at no new copy. ⚠ 37 of 120 activities are in this state.
⚠ It is **screen-reader-only** — `.lcs-app.embed .lcs-instruction{display:none}` and the route always
appends `&embed=1`. I checked before escalating (an agent report implied it was visible).

## Agent claims I refuted by measuring — three, and one by the repo's own words

- A survey agent: *"inherits the strand automatically, no override needed."* The manifest declares
  `strand:"Language"`, which auto-maps in sv to the GRAMMAR strand. **Third consecutive build** with
  a wrong strand claim.
- The content creator recommended strand **`Språkbruk`** — `strand-names.ts:199-213` explicitly
  **rejected** it in writing (*"it is a HEADING … would mix kursplan levels; it also covers
  kroppsspråk and tonfall"*) and names *"hyperonyms, categories"* as intended inheritors of
  `Ord och begrepp`.
- Its slug `overbegrepp-vilken-grupp-tillhor-bilden-ak-2` contains `grupp` **and** near-collides with
  the shipped sv slug `vilken-grupp-har-fler`.
- ⚠ It also corrected **me**: the sv house dash is the **EN dash `–`**, not the em dash I had in my
  brief. Measured: 45 shipped sv page_titles use `–` vs 22 using `—`, and both my own siblings
  (#22, #26) use the en dash.

## Four suspected defects checked and CLEARED before filing

The picture speaks the localised word (all six pools carry `target.label`) · all 11 shipped images
resolve (⚠ `<img onerror>` hides a miss silently, so it was worth measuring) · the raw `instruction`
token is not visible · `lcs-shell.js:58` DOES have `sv:'Interaktiv {title}-aktivitet. {instruction}'`
(my first grep said otherwise; the grep was wrong).

## Verification

visual-qa **8 locales × 192 = 1,536 renders**, four-phase driver. verify-category-define-core
**64 rounds / 8 pools** (was 8/1), 15 poison (9 must-fire, 6 controls incl. 2 scoping + 3
ban-too-wide: `tomat`, `matta`, `weten`), 5 named exemptions, proven to FAIL on emptying.
local-test **en + sv**, ids from the POOL and title from the shipped strings table (both were English
literals), poison-tested in both locales. preflight 204. content-sv **87/87**. serp-copy 2,978.
prose-claims. variety (7 locales; sv excluded — its live half probes production). `tsc --noEmit` at
exactly the 7 baseline blog-test errors. Visual critic on the full sv sweep; I read the 360/768/1024
sv renders myself, **and all eight round images before they were written into the manifest**.
⚠ Only the **24 already-tracked** renders were committed; the new locale/phase ones stay local.

---

# sv #28 — `vera-verb-match` (L.1.1.c) → **Tuvas ordäng**, adjektivböjning · commit `57db0c28`

`slug.sv` = `boja-adjektiv-stor-stort-stora-ak-2` · `page_title.sv` = *Böja adjektiv: en-ord eller
ett-ord? stor, stort, stora (åk 2)* · character **Sorken Tuva** · åk 2 · strand inherited
(`Språkliga strukturer och normer`) — **no STRAND_OVERRIDE, deliberately**. sv prose 87 → **88**.

## ⭐⭐⭐ THE ACTIVITY IS IMPOSSIBLE IN SWEDISH, AND THE CORE'S ESCAPE HATCH DOES NOT EXIST HERE

CCSS L.1.1.c is subject–verb agreement. **Swedish has none** — `vara` has ONE present form, `är`,
for every person and number, and so does every other Swedish verb. Measured on a faithful Swedish
pool: **1 distinct form**, `fixedGuessBot` **100%**, the core's own `formMix` **false**.

⭐ And the escape es/pt/it used is unavailable. They did not translate *ser/essere* — they switched
to **ESTAR/STARE** for three clean forms. Measured across all six persons: `vara`, `ha`, `springa`,
`göra` → **1 distinct present form each**. There is nothing to switch to.

**The rebuild:** move the gap from the verb to the **predicative adjective**, which is where Swedish
actually carries gender/number concord — `Björnen är ___` / `Gräset är ___` / `Blommorna är ___`
with stor·stort·stora. ⭐ `är` STAYS ON SCREEN, and it is not dead weight: it is the distance the
child must reason across, and the only thing separating this deck from sv #24's `min/mitt/mina`.

## ⭐⭐ THE PROTECTED CORE IS ENGLISH-ONLY AND SIX SHIPPED LOCALES BYPASS IT

`be-agreement-core.js:19` is `var FORMS = ['am','is','are']`. Measured against the live pools:

| | `facts().correctValid` | `oracle()` | `formMix` |
|---|---|---|---|
| en | true | ≥0 | true |
| de/fr/es/pt/it/nl | **false, every round** | **−1, every round** | **false** |

Both the core's docblock (*"THE ANSWER IS DERIVED, NEVER A STORED INDEX"*) and the activity's
(*"Validity DERIVED by be-agreement-core.js"*) were **false in six of seven shipped locales**. The
activity had silently re-implemented the whole lookup at `:31-33` all along. The activity docblock is
now corrected; the core is protected, so the GATE carries the truth instead.

⭐⭐ **AND THREE OF THE FOUR BOT NUMBERS THE OLD GATE PRINTED WERE ARTEFACTS, NOT MEASUREMENTS.**
Every non-English round lands in `posCount[-1]`, so `positionBot` read **100%** — not a position leak.
`lens[-1]` is `undefined`, so `longest`/`shortest` read **0%** — not "clean", they measured NOTHING.
Only `fixedGuessBot` survived, because it keys on the STRING. ⚠ **nl's 63% is the dangerous one**: a
plausible-looking number is far harder to disbelieve than an obviously broken one.

## The gate — rewritten, 1 pool → 8, 8 rounds → 64

It no longer calls `Core.deckFacts` for a non-English pool at all. It declares its own per-locale
triples **and cross-checks them against the shipped `FORMS_L10N`** (parsed out of the activity), so it
has independent ground truth *and* drift detection — instead of either marking its own homework or
hard-coding a copy that rots. New assertions: cards distinct (would have caught `trött/trött/trötta`);
form-mix per locale; **no padding**; **cell balance**; length bots **per round**; the **tail rule**.
**17 poison cases, every one caught by the assertion it NAMES**, plus a control and a ban-too-wide case.

⭐ **`longestBot` is STRUCTURALLY 0% in Swedish** — the ett- and plural forms tie at the maximum
length (stort/stora), so the longest card is never unique. My first poison for it could not fire, and
"the assertion is green" would have meant "the assertion cannot bind". `shortestBot` DOES bind (the
en-form is the bare stem, always uniquely shortest) — which is why the deck caps en-ord rounds at 3/8.

⭐⭐ **CELL BALANCE is the assertion per-round cards make NECESSARY.** With a different triple each
round `fixedGuessBot` is permanently 1/8 and never binds again; the live bot is **morphological**
("always tap the `-a` card"). Nothing measured that before. sv ships 3 en / 3 ett / 2 plural = 37.5%.

## ⭐⭐ 48 LIVE ROUNDS IN SIX LOCALES RENDERED A DOUBLE SPACE

The renderer pads the gap itself (`before + ' '` … `' ' + after`) and English relies on it. **Every**
localized pool ALSO padded its own strings, so all six shipped `"Ich  ___  im Garten."`. English is
the only one that was right, and every fan-out copied a wrong convention from the first localizer.
Fixed in all 48 rounds (not ratcheted), and the local-test now asserts the RENDERED sentence.

## ⭐⭐ A COLOUR THAT MEANT BOTH "WRONG" AND "RIGHT" — found by READING THE RENDER, not by a gate

On the win screen the correct card and the filled blank kept the coral `.vvm-sel` treatment — the
**same coral a wrong answer wears**. Two screenshots side by side were identical but for the heading
colour and the button label, and a six-year-old reads the board before the heading. All eight locales,
every gate green. Fixed with `.vvm-opt.vvm-right` / `.vvm-blank.vvm-right` in green, ⚠ **placed AFTER
`.vvm-sel`** — both are two-class rules, so the cascade breaks the tie on ORDER alone and moving the
win rule up would revert it SILENTLY. Only the SUCCESS side is marked, so a miss still never reveals
which card was right. The driver now asserts the RESOLVED colour, never the class list.

## ⭐⭐ AND THE FIRST FIX WAS ONLY HALF OF IT — the VISUAL CRITIC found the other half

I fixed the SUCCESS side and left the miss silent, so `picked` and `missed` still rendered
**pixel-identically**: the tapped card and the word in the gap were coral in both, and the whole
distinction lived ABOVE the panel in the prompt heading. The critic proved it by comparing two
frames of the same round element by element. Two harms it named that I had not: *before* Check,
tapping paints the child's own choice in the screen's rejection colour — a shame signal for the act
of answering, on a deck whose tone is no-shame; and *after* a wrong Check the board says nothing at
all to a child who is looking at the cards they just touched, not at the heading.

Three states now get three colours, all already in the palette:
**PLUM = chosen** (it echoes the gap's own colour) · **CORAL = wrong** · **GREEN = right**.
⚠ Teal was the obvious neutral and is REJECTED: #146B5E sits beside the success green #2E7D46 and an
eight-year-old would read the two as one signal.

## ⭐⭐⭐ I THEN BROKE FOUR LOCALES TUNING THE LAYOUT FOR THE ONE IN FRONT OF ME

The critic's findings 4+5 (at 360 the sentence dropped its last word onto a line of its own in 5
frames of 5, and a long triple wrapped 2-then-1, orphaning one of three PEER cards) are real. My
≤400px pass set `min-width:0` on the cards so a long Swedish word would fit — and **collapsed «am»,
«is», «bin», «ben» to 36px, under the 44px tap floor, in en/de/nl/es: 48–64 renders each, while sv
stayed green.** A Swedish card says «starka»; an English one says «am»; sizing a card by its text
means every locale sets a different width and the shortest one loses.

**The fix is a three-column GRID below 400px** (`repeat(3,minmax(0,1fr))`): the row cannot wrap, all
three cards are the same width whatever the word, and the width is a share of the ROW rather than a
function of the TEXT — so no locale can push another below the floor. It also settles finding 5
properly: three peers now render as three peers.

⭐ **The eight-locale sweep is what caught it, and only because it is eight.** A single-locale run —
even the right single locale — would have shipped this. Never accept a layout change on the locale
you were looking at.

## ⭐⭐⭐ TWO OF SIX VISUAL-QA GATES WERE DARK ON **36 ACTIVITIES**

`visual-qa-activity.js`'s answer-card selector was
`[class*="-cand"],[class*="choice-card"],[class*="-choice"],[class*="-card"]`. **`-opt` was missing,
and it is the commonest answer-card convention in the catalogue** — 36 activities name their choice
buttons `<prefix>-opt` (`vvm-opt`, `okt-opt`, `srg-opt`, `ts-opt`…). So `cards` was 0, the
convention-independent FALLBACK engaged, and **TINY and SPARSE — which key on `minContent` and on
`cards > 0` — measured nothing on all 36**, printing `content=—  sparse=—` and PASSING.
⚠ **The non-vacuity check could not see it either**: it counts `fallbackControls`, so the instrument
reported "I measured controls" while two of six gates were dark. That includes **sv #26 and sv #27**,
both of which I declared visually green.

**Poison-proved:** at an 8px card font the widened gate fires **256 TINY hits**; at the shipped size,
0; control restores green. Before the widening it was 0 in both — the definition of a gate that
certifies nothing. (⚠ my first poison at 10px SURVIVED: Baloo 2's glyph bbox runs ~1.6× the font size,
so a 10px font still measures ~16px. A poison that does not fire is not evidence of a clean tool.)

**Blast radius measured before shipping**, all 36 re-run: 3 FAIL, and **all three are PRE-EXISTING** —
identical counts with the original selector (`fox-forge` 27/66, `hattie-whose-is-it` 8/48). ⭐ And
`linc-fact-chain` went **22 → 8**: with `cards` non-empty the fallback no longer engages, so a false
TAP reading off `.lfc-stem` (not a card at all) disappeared. The widening is a strict improvement.
**FILED, not fixed:** those three activities fail their own §A.13.62 DoD today, in 11 locales each.

## The deck — 8 rounds, one adjective each, every constraint measured

```
b1 bjornen-stor    Björnen är ___ när han står upp.   stor·stort·stora    -> stor
b1 graset-gront    Gräset är ___ överallt i ängen.    grön·grönt·gröna    -> grönt
b1 blommorna-gula  Blommorna är ___ vid stigen.       gul·gult·gula       -> gula
b2 vinden-stark    Vinden är ___ nere vid sjön.       stark·starkt·starka -> stark
b2 palsen-mjuk     Pälsen är ___ att klappa.          mjuk·mjukt·mjuka    -> mjuk
b2 boet-varmt      Boet är ___ inuti.                 varm·varmt·varma    -> varmt
b3 baret-rott      Bäret är ___ på busken.            röd·rött·röda       -> rött
b3 bina-glada      Bina är ___ när solen skiner.      glad·glatt·glada    -> glada
```

⭐⭐ **PER-ROUND CARDS — I overturned my own constraint mid-flight.** I briefed the content panel with
"one adjective for the whole deck", because `setupTask` overwrites `view.choices` with the locale
triple. That was wrong: the card hook takes one more fallback level, and **the deck's entire
justification is that the rule is PRODUCTIVE** — a single-adjective deck cannot demonstrate that.
⚠⚠ **AND THE PATCH HAS TO LAND AT BOTH CALL SITES.** `setupTask` is the DISPLAY path; grading runs
through an independent lookup. Patch only the first and the child is SHOWN `round.cards` while the
grader indexes `FORMS_L10N[LANG]` — a correct tap marked wrong. Poison-proved: case B of the
local-test poison set is exactly that, and it fires "did not celebrate".

**Binding constraints, all verified by me:** DEFINITE subjects only (`En bil är ___` announces the
gender) · **ban ett-word plurals in `-en`** (`Husen`/`Katten` share a written suffix, destroying the
one cue the design rests on) · every tail opens with a preposition/adverb/infinitive marker —
⭐ because for EVERY Swedish adjective the plural is homographic with the definite attributive
(`stora` = «Bilarna är stora» AND «den stora bilen»), so a bare noun after the blank would admit the
reading the deck bans · bands 1–2 plain `+t`, first neuter `grönt` · nouns not pronouns · no subject
reused from sv #24 (boll, äpple, mössa, paraply, vantar).

⭐ **`Bina` is the deck's most valuable round** — the only ett-word in the plural, so the only one
showing the `-a` card serving BOTH genders.

## Rejections that corrected MY list, not the panel's

- ⚠⚠ **`hård`** — `hård → hårt` **deletes the d** with no doubling. It LOOKS like plain `+t` and is
  not; a deck holding both `rött` and `hårt` teaches "sometimes it doubles, sometimes it vanishes".
  It was on my verified-safe list.
- ⚠⚠ **`full/fulla`** — colloquially **drunk**. Also on my safe list.
- ⭐⭐ **`Mattan`** — `matta` is a deliberate FOIL in the deck I shipped LAST SESSION (`mat → matta`).
  **A word one deck marks as a trap must not be a correct subject in another.**
- **`rädd`**, whose neuter is `rätt`, spelled identically to *rätt* "correct" — on a deck about right
  and wrong answers.
- ⚠ **The pedagogue's own exclusion rule over-fires.** "Exclude every adjective whose stem ends in
  -t/-tt" condemns `blöt` and `vit`, which the same panel listed as SAFE. The correct gate is simply
  **"the three forms must be distinct"** — total, mechanical, cannot over-fire. The ban-too-wide trap,
  this time inside a panel's ruling rather than my own regex.

## ⭐ Two of my OWN checks were wrong before the deck was

- my tail-rule regex used **`\b`** — ASCII-only, so `på` never matched and a CORRECT round reported as
  a failure. **In the very session where I wrote that rule into the plan.** Fixed with `(?!\p{L})`.
- my doubling test was `neuter.length > stem.length + 1`, which misses `röd → rött` (+1 char). The
  correct test is `neuter !== stem + 't'`.
- and a third at build time: my `force()` guard compared `round.id` against the prefixed TASK id, so
  both locales failed with *"force('dogs') landed on dogs"*. `tool.round` is the RAW manifest round.

**Verify the measurement before the defect** — three times in one build.

## Traps re-paid

- ⚠ A **multi-line mutation needle went blind on line endings** again. Fixed in the HARNESS (all
  needles are single-line now); the only reason it was visible is that a missing needle THROWS.
- ⚠ A **heredoc ate `\r\n`** and produced real newlines inside a regex literal → parse error. Patch
  scripts go through the Write tool.
- ⚠ The `page_title`/`page_intro`/prose files are **hand-formatted and do NOT round-trip** through
  `JSON.stringify` — anchored splices only, asserted before writing.

## Verification (§A.13.62, LOCAL — commit + push, NO deploy)

visual-qa **8 locales × 192 = 1,536 renders**, NEW four-phase driver (`open → picked → missed →
resolved`) — ⚠ seven decks had shipped and no sweep had ever seen a card tapped; the 24 tracked
renders were 8 rounds × 3 widths × ONE phase. ⚠⚠ The `missed` phase needs the **1800 ms shell freeze**
(`lcs-shell.js:885`), filtered to that exact delay. · verify-be-agreement-core **64 rounds / 8 pools**
(was 8/1), 17 poison + control. · local-test **en + sv**, ids from the POOL, title from the shipped
strings table, 6 poison cases incl. both call sites and the silent-English fallback. · preflight 204
slugs. · content-sv **88/88**. · serp-copy 2,980. · prose-claims. · variety 7 locales (sv excluded —
its live half probes production). · `tsc --noEmit` at exactly the 7 baseline blog-test errors. ·
I read the 360/768/1024 sv renders myself — **and that is where the coral defect was found**. ·
`git diff --numstat` = **0 lines** to `be-agreement-core.js` and `lcs-shell.*`.

## Filed, NOT fixed

- **the core's English-only `FORMS`** — the fix means touching a protected core.
- **the fr/es/pt ANSWER LEAK**: `after` agrees in number (*"contents." "contentos." "contentes."*),
  so the child answers without reading the subject and learns the dependency BACKWARDS. Needs new
  native sentences in three languages → separate commit, native panel per locale.
  ⭐ The Swedish rebuild is structurally immune: the adjective IS the answer.
- **the EN `hintWrong` prints the answer key** (*"I → am, one → is, many → are"*), and **five locales
  offer a BINARY hint for a THREE-WAY task**, each with two first-person rounds the hint cannot solve.
- **German `bei ich`** (dative → `bei mir`) + three broken quotation marks.
- **the three activities failing their own visual-QA DoD** (fox-forge 27/66, linc-fact-chain 8/48,
  hattie-whose-is-it 8/48) — pre-existing, surfaced by this build's blast-radius sweep.
- a11y: `.vvm-sent` has no `aria-live`; the vole's `aria-label` is still English in six locales;
  `win` is declared in eight locales and reached by nothing; `round.subject` is dead data.

---

# sv #29 — `hazel-word-bridge` L.1.1.g — *Vides ordbro* (bindeord) — `1e194bb9`

Chips **och · eller · men · för**. 8 rounds, 2 per relation. `slug.sv` =
`bindeord-koppla-ihop-tankarna-ak-2`; character **Hägern Vide**; `sv:'2'`, **no strand override**
(`Language` auto-maps to `Språkliga strukturer och normer`, which is the grammar heading).
Source de `5f4198a1`; siblings fr/es/pt/it/nl.

## ⭐⭐ There was no single source to copy — English and the six locales teach DIFFERENT SETS

en: addition · contrast · cause · **result** (and/but/because/so).
de/fr/es/pt/it/nl: addition · **alternative** · contrast · cause. The fan-out silently dropped
`result` and added `alternative`; all six agree with each other, none agrees with English.
**"Match the siblings" and "match the source" are different instructions here** — so sv had to
choose on Swedish grounds. Check this before assuming a fan-out is a translation chain.

## ⚠⚠ THE DECK CAN SHIP SILENTLY UNWINNABLE — and nothing in the repo caught it

`hwbOracle` falls back to the **English core** when a locale is absent from `REL_CONJ_L10N`; for
`relation:'alternative'` that core returns the empty string, so **every chip is wrong**. No error,
no console warning, a normal-looking screen. `slug.sv` without `roundsL10n.sv` serves the ENGLISH
sentences under a Swedish title. ⭐ **The core is English-only and fails PARTIALLY, which is worse
than failing cleanly** — over all 48 localized rounds it answers with a plausible English word six
times in eight. (In #28 the equivalent core returned −1 uniformly, which at least *looks* broken.)

## ⭐⭐⭐ `och` is almost never *wrong* in Swedish — only bleached

*Jag ville bada och vattnet var kallt* is odd, not broken. **If `och` is merely worse than the
target, the round has no defensible grading and a bright child will argue — correctly.** So every
non-`och` round needs a forcing device — but the devices are themselves answer-leaks, so **one per
relation only**: `också`, `antingen`, `ändå`, and a **pluperfect**. The honest target adopted: *no
four-chip configuration in Swedish is both unique in all eight AND cue-free — so: unique in all
eight, cued in at most one round per relation.*
⭐ Round 4's pluperfect makes `och` **dead** rather than worse (`och` chains forward along one
timeline; a pluperfect clause 2 sits *before* clause 1's event). ⭐⭐ Round 8 is its **counterweight**
— a true minimal pair with round 7 (identical surface, opposite answer), so a child who
pattern-matches that shape is wrong.

## ⭐⭐ BIFF decides the causal: `för`, not `eftersom`

Swedish subordinate clauses put the sentence adverbial **before** the finite verb ("eftersom det
**inte** regnade" ✔). The engine prints **one fixed frame** and swaps only the chip, so any clause 2
with a post-verbal `inte`/`ändå`/`också` would render **ill-formed Swedish as the correct answer, in
a grammar deck** — and those adverbs are exactly what the uniqueness devices require. **The deck's
own devices demand a coordinating causal.** ⚠ `så` is a *konjunktionellt adverb*, and is unusable
**because `och` is in the set** (a result frame admits `och` and reverse-`för` too = three live
chips). ⚠ `därför att` rejected: a fast reader sees only `därför` = *therefore*, the opposite
direction.

## ⚠ Two adjacencies with sv #25 (`sentence-clinic`), both deliberate

`å` appears in **no chip and no sentence** — showing it would undo the clinic's spelling claim. And
the clinic **splits** run-ons while this deck **joins** clauses, so **no string may call the sentence
wrong**: ⭐ *the clinic **lagar** a wrong sentence; this deck **väljer** a word for an incomplete one.
A gap is not an error.* Framed so, the two jointly deliver the rule that kills run-on writing.

## The gate — 1 pool → 8, 8 rounds → 64

⚠⚠ **It must not ask the core about a non-English pool** (`facts().relationValid` is false on every
`alternative` round; `deckFacts` buckets a Swedish deck into English keys plus an empty-string
bucket). It declares its **own** per-locale tables and **cross-checks them against the shipped
`REL_CONJ_L10N`/`CHIPS_L10N`** — independent ground truth *and* drift detection.
⭐ New assertion: **the round id does not contain its own answer**. Five of six siblings fail today
(`und-essen-tisch`, `denn-schirm-regen`) → **named ratchet `de,fr,es,pt,nl`, may only shrink**.
⭐ The padding check had to be rewritten: `indexOf(' ___ ')` is **satisfied by a double-spaced
gap**, so the check could not see the defect it was written for — poison case O SURVIVED. Measure
the actual neighbours, plus a no-double-space assertion.
⭐ **My "subject-shaped" heuristic condemned the correct word `mamma`.** Fixed by changing WHAT is
measured: ban the degree-word/quantifier/`att` hazard class (which creates the `för` = *too* reading)
rather than assert subjecthood.

## ⚠⚠ Every word check is TOKEN-scoped

`\b` is ASCII-only and dies after å/ä/ö; `includes()` is worse. Measured: `ändå` and `på` contain
`å`, `meningen` contains `men`, `första` contains `för`. **A bare-substring gate makes this deck
unbuildable.** Use a Unicode-letter lookaround pair instead.
⭐ **Longest-bot poison could not fire in Swedish** — ett/plural forms tie at max length, so
"longest" is never unique. The poison had to manufacture a unique longest.

## Three colours, three meanings

Coral previously meant **chosen**, so `picked` and `missed` rendered identically — the #28 blocker,
still live here. Now **gold = chosen · coral = wrong after Check · green = right after Check**, with
the label ink carrying the signal twice. ⚠ The rules are **cascade-order-dependent** (`.hwb-right`
above `.hwb-sel` reverts it silently) — poisoned.
⭐ The visual critic **corrected my own justification**: I picked gold for the selected chip *because*
it matched the panel and called that semantic; it is the opposite, and the label ink is what makes
it work.

## Four pre-existing cross-locale defects the sweep forced out

`.hwb-chip` had **no min-width**, so it `e`/`o`, es `y`/`o`, pt `e` fell under the 44px tap floor —
**four locales were failing their own DoD**. · `.hwb-say` clamped to **2 lines at 78%**, hiding a
third of the German and Spanish rule statements (now 84% / 3). · `.hwb-sent` held **GOLD as a
permanent border**, so gold could not mean "chosen". · `.hwb-ask` was **coral — a verdict colour on
an instruction** — and stayed up after a correct answer.

## ⚠ No phase driver existed

In seven locales **only the OPENING frame of this activity had ever been photographed**. New driver:
`open → picked → missed → resolved`, with the 1800 ms filtered freeze (`lcs-shell.js:885`).
**8 locales × 192 = 1,536 renders, all green.**

## Grade `sv:'2'` — and the stated mechanism was overstated

⚠ I measured the pedagogue's "Sweden numbers a year lower" claim: of 14 sv grade overrides, 10 also
set `de` and **sv equals de in 9**. The ruling rests instead on the **Language-line precedent**,
which is unanimous — all five sv Language decks are åk 2, and `pronoun.case.l-1-1-d` is `sv:'2'`
where `de:'3'`. Lgr22 does not name konjunktioner in åk 1–3 at all, so the **progression** decides
(as in sv #8).

## Traps re-paid

- ⚠ **Heredoc mangling, FIVE times in the build and a sixth writing this record**: `\s` in a
  template literal, CRLF becoming real newlines, the Unicode-property escape losing its backslash,
  an escaped newline becoming a real one, an escaped quote breaking a string. Patch scripts and
  long records go through the **Write tool**; tokenise instead of escaping.
- ⚠ `force()` compared against the **prefixed TASK id** again — `tool.round` is the RAW manifest round.
- ⚠ **I guessed the nl string anchors** and all 7 patches failed. Extract the real text first.
- ⚠ **I changed CSS mid-sweep**, so the results were a mixed state. TaskStop and re-run clean.
- ⚠ My palette parser **invented a phantom key `CT`** (split across the `var C = { T:` declaration)
  → false alarm on correct code.
- ⚠ An agent's advice was **wrong twice** (LCSAudio "real"; `master-sync` relevant). I verified both
  myself: `ttsLang()` does map sv, so the `en-US` chain is dead code; and both harnesses serve
  `mini tools/` directly.

## Filed, NOT fixed

- **the English-only core**, whose `sentenceNoAnswerLeak` is **vacuously true for `alternative`**
  (it searches for the empty string). Fixing it means touching a protected core.
- **five siblings leak the answer in the round id** → the named ratchet.
- **the English deck is not exactly-one-correct**: 6 of 8 rounds accept a second chip. Round 1
  ("I packed a hat ___ a coat") is worst — three live chips *and* it joins two NOUN PHRASES among
  seven clause rounds, so "no verb after the gap" narrows to and/or **without understanding any
  relation**. An EN rebuild is its own commission.
- **the gap is never filled** — `render()` always writes the literal three underscores, so the child
  never sees or hears the sentence they built and the speaker always reads "…lucka…". Cross-locale
  behaviour change.
- `win` declared in seven locales, **reached by nothing**; the header comment claims the chips
  shuffle "per render" (they shuffle **per task**); `CREAM`/`GOOD` and `esc()` are dead.
- ⚠ **`-chip` is missing from the visual-qa card selector** (10 more activities have dark TINY/SPARSE)
  — but widening it would **STOP `.hwb-spk` being measured**, since the fallback only engages when
  `cards` is 0. Needs a real fix, not a widening.
- critic findings 3/4/5: the speaker emoji reads as disabled; desktop sparseness; small text does not
  scale.
- carried from #28: the fr/es/pt answer leak in `vera-verb-match`; the EN `hintWrong` printing the
  answer key; five locales' binary hints for a three-way task; German `bei ich`; the six activities
  failing their own DoD (fox-forge, linc-fact-chain, hattie, pepper, ten-tank, willow).

## NEXT — sv #30

`cleo-packing-list` — **comma in a list (L.1.2.b)**, de commit `7191e4f0` (*Cleos Packliste / Komma
bei Aufzählung*). ⚠ de used **BOTH** a grade override (→ Klasse 3) **and** a strand override
(*Richtig schreiben*) — both are per-locale ensemble calls for sv, not to be copied.

---

# sv #30 — `cleo-packing-list` L.1.2.b — *Rankas ordkedja* (kommatecken i uppräkning)

The Swedish deck lists **FOUR** things where all seven other locales list three, and that is the
whole build. `slug.sv` = `kommatecken-i-upprakning-ak-2`; character **Ranka** (a chameleon);
`sv:'2'`, **no strand override**. Source de `7191e4f0`; siblings fr/es/pt/it/nl, all at grade 3.

## ⭐⭐⭐ Six shipped locales are solvable without reading, measured

The three cards are one sentence with the comma moved, and in Swedish — as in de/fr/es/pt/it/nl —
the comma goes BETWEEN items, so a foil can only push it **rightward**. The correct card is therefore
the **earliest-comma** card in every round, in every band: that heuristic scores **1.00** in all six.
English scores 1.00 too, by a different route — its Oxford comma is the only one sitting *before*
"and". Four items make all three cards share their FIRST comma, dropping it to chance and moving the
discrimination to the SECOND comma, where the rule lives.

⭐ A three-item Swedish list also carries exactly ONE comma, so a child extracts *"a list gets a
comma"* and never learns where it goes. Four items carry two and the rule becomes visible.

## ⭐⭐⭐ I got the measurement wrong three times before a native panel got it right

1. I invented a **"value bot"**, measured 0.50 everywhere, wrote it up as a catalogue-wide hole —
   and it was not one. The instrument lumped **length** (a spread of ONE character; imperceptible)
   together with **comma count**, which for a three-item list *is part of the rule*, not a way round
   it. **A metric I invented is not a measurement.**
2. On that bad number I designed an "improvement" — three cards each with exactly one comma — that
   was **strictly worse**: it never shows a list with the wrong NUMBER of commas.
3. I told both panels *"the engine prints one fixed frame and only moves the comma."* **False** — the
   shipped English forms carry **2/0/2** commas. The constraint was mine, not the machine's, and the
   linguist caught it by reading the core.

⭐ The axis that decided the build (comma POSITION rank across the cards) came from a pedagogue
reading the rendered cards, not from any instrument of mine. ⚠ That panel also corrected my
*mechanism*: the cards are `text-align:center`, not left-aligned, so there is no visual comma column
— the shortcut is string-level. The measured fact stands; my picture of it was wrong twice.

## ⭐⭐ The first FOUR-item design was also wrong, and an exhaustive search settled it

I locked `{correct, missing-middle, Oxford}` because the Oxford comma is the anglicism Swedish
children actually produce. A panel caught the cost: **both** foils then carry a comma before «och», so
*"reject any card with a comma touching och"* identifies the correct card **1.00** — half the rule
winning the whole deck, i.e. exactly the defect this build files against the siblings. **I cannot ship
a 1.00 while filing a 1.00.** Enumerating all 21 three-card sets: **no set beats 0.50**, four reach
it. Shipped `{A} + {A,C}`:

```
Jag ser katter, hundar, hästar och fåglar.   ← a comma in every gap, none before och
Jag ser katter, hundar hästar och fåglar.    ← the second gap is unmarked      ("between" half)
Jag ser katter, hundar hästar, och fåglar.   ← the second comma touches «och»  ("not och" half)
```
Both halves load-bearing; neither alone resolves a round. The och-error survives *inside* the second
foil — it is just no longer sufficient on its own.

## ⭐⭐ A RENDERED cue no string-level measurement could see

The panel's wrap arithmetic sent me to the browser: at desktop widths one round's three cards
**disagreed on LINE COUNT** — the missing-comma card was the only single-line one, so its *shape* gave
it away with no reading at all. Measured across every round × every viewport, exactly one round
straddled, at **42 chars against a budget of 42**. One item shortened (`pinnar` → `bark`) fixed it,
and the gate now enforces the budget **with the reason written into the failure message**.
⚠ Five of the seven shipped locales have the same leak: en `farm`@320 + `table`@360 · es
`lista-aves`@360 · pt `lista-arte`@768 · it `lista-animali`@320 · nl `pak-fruit`@360 +
`houvan-kleuren`@360 + `pakken-servies`@412.

## ⭐⭐⭐ The English source stated a false rule about English punctuation, three times

*"A comma goes after each thing in a list!"* — in `apples, pears, and plums` there is **no comma after
`plums`**. Three items, two commas, **between** them. Restated in both hints, so three of five
teaching strings carried one claim and the claim was false — and false in the direction that
**manufactures the Oxford comma the deck exists to mark wrong**. `hintPick` was self-contradictory
besides (the comma after item 2 *is* the comma before "and", so applying both clauses places three)
and said *"the last \"and\""* where there is exactly one. Both said *list* where the child taps a
**sentence**; instruction and prompt were near-duplicates. ✔ **Measured, not assumed: all six siblings
say the right thing** — only English carried it. ⚠ My first check flagged three of them because my
negation word-list omitted `jamais`, `nicht`, `niet` — *a named-token check only finds what you
thought of*.

## ⭐⭐ The German quotation mark, in five places

`„und"` pairs U+201E with an ASCII U+0022 where German closes with U+201C. I checked the codepoints
rather than trusting the report — and the assertion found **5, not the 3 reported**: three shipped
strings plus two in the header comment. A punctuation deck shipping the wrong punctuation, in German.

## Two live defects nobody had ever seen, because no non-English frame had ever been rendered

24 screenshots existed: 8 rounds × 3 widths × the OPENING frame, all bare-named (= English). de/fr/es/
pt/it/nl had **zero**. Adding the locales alone — before any phase — found `.cpl-say` clamped to 2
lines at 74%, hiding **16–17px** of the German and Spanish tips at 360 **and** 412. And
`.cpl-opt.cpl-sel` was **CORAL**, so the board painted the child's own choice in the rejection colour
and said nothing at all after a Check (the #28/#29 blocker). Now gold/coral/green, cascade order
commented because all three are two-class rules.

## ⭐⭐ The new phase driver found a live FRENCH defect on its first full run

`fr` failed **7 of 192** — every one of them in the `missed` phase, which had never existed before
this build. The try-again hint adds a line the opening frame never had, and French pushes the
controls **past the fold**: `ctrlBottom=910 > vh=900` at 1024×900 (five rounds) and `669 > 640` at
320×640. ⚠ Not a hint-length problem — the German hint is 60 chars to French's 47. The cause is that
**French items are long enough that all three cards wrap to two lines**, so the whole stack is taller
before the hint arrives. Fixed by reclaiming vertical padding and gaps in the three height bands
(the `min-height` tap floors untouched, and the measured tap heights are carried by the two-line text
anyway). ⚠⚠ That CSS is shared by all eight locales — the #28 defect was tuning the layout for the
one locale in front of me — so the whole sweep was re-run clean afterwards.

⭐ The lesson is the driver's, not the fix's: **the state a child hits most often had never been
photographed in any locale**, so a cut-off in French survived every gate the repo had.

## ⭐⭐⭐ The visual critic found the one defect that would have broken the activity on phones

Everything measured green and I had read three renders myself. The critic read twenty-one and found
that **at 360 the three cards wrap at DIFFERENT points in half the rounds**, so they cannot be
compared at all:

```
Emma plockar svamp, kottar,        Emma plockar svamp, kottar löv        Emma plockar svamp, kottar
löv och bark.                      och bark.                             löv, och bark.
```
`löv` lands in three different places, and the text is centred, so nothing aligns. **The whole task is
"find the one comma that moved", and on a phone there was nothing to scan down.**

⚠⚠ **My line-count check passed this.** All three cards were 2 lines. It measured the COUNT and was
structurally blind to the break POINT — a proxy standing in for the thing that mattered, for the
third time in this build.

⚠ **And my first repair made it worse.** Breaking before the final conjunction left line 1 too long,
so it wrapped again and the cards came out **3/3/2 lines with an orphaned `löv,`** — I saw that only
because I re-read the render instead of trusting the gate that had just gone green. The break has to
go where line 1 always FITS: **before the second-to-last item**, plus left-align at those widths.
Line 1 then differs only by the comma after item 2, line 2 only by the comma after item 3, both at
the end of a left-aligned line. Longest line 1 in the deck: 27 characters, measured.

⭐ The other critic findings, kept as filed rather than fixed: the `missed` state repaints the
QUESTION coral as well as the card (a third of the phone screen is alarm colour after one wrong tap);
the teaching sentence is the lowest-contrast text on the page; the type hierarchy is inverted (the
question is ~1.8× the sentences, and the comma is the smallest mark on a screen about commas); and
the chameleon's line duplicates the feedback during "Bra jobbat!". All four are cross-locale shell-
adjacent design changes, not sv content.

## The rulings

**Grade `sv:'2'`.** ⚠ I first told the pedagogue åk 3 was a hard ceiling; it is not (`mosaic-menders`
ships `sv:'4'`). Given the real options the ruling moved to åk 2:
⭐ **Two precedents that appeared to conflict do not.** Both concern content Lgr22 declines to name in
åk 1–3, and they went opposite ways — so *"is it named in the band?"* cannot be the test. What sorts
them: **NEW OBJECT the band does not require (area → åk 4) vs NEW RULE about an object the band
already requires (meningsbyggnad needs och/men/för → åk 2)**.
⚠ **Recognition-vs-production is NOT the line** — `mosaic-menders` is area-**MATCH**, also recognition,
and still went to åk 4. I had leaned on that and it does not survive the precedent.
The YEAR comes from **age parity**: all six siblings are age 8–9 and sv åk 2 is 8–9; the sv Language
line is unanimous at åk 2 across ten decks. ⚠ NOT the "Sweden numbers a year lower" mechanism #29
measured and rejected. And Lgr22's åk 1–3 punctuation list is a **floor on PRODUCTION** (mirrored in
the kunskapskrav), not an inventory of marks.

**Strand: no override.** *Skiljetecken* sits **verbatim** under `Språkliga strukturer och normer` in
the åk 4–6 kursplan, the heading is identical in both bands, and there is nothing else real to
override to (`Språkbruk` is the calque `strand-names.ts` already warns about).

**The `och` scoping rule.** A comma before `och` joining two main clauses is **normal Swedish**, and
sv #29 (*Vides ordbro*, åk 2) teaches exactly that `och`. So every child-facing sentence naming `och`
carries `i en lista`/`i listan`, and the **character line — which fires every render — names `och` at
all**, so it cannot collide however it is quoted. ⚠ Two panels disagreed on `aldrig` vs `inte`;
resolved on the language fact (Språkrådet says *normalt inte* and licenses a *tydlighetskomma*), not
the majority.

**Copy:** everything **plural** (`kommatecknen` — four items means two commas on screen, so every
singular said something false); **`orden` not `sakerna`** (two rounds list animals, which Swedish
*saker* excludes); **`kommatecken` never `komma`** (a homograph of the verb, in a deck read aloud, and
the neighbour *Doktor Fjäders meningsklinik* already says `frågetecken`); **`står` never `sätter du`**
(a tap-a-card surface cannot receive a comma).

## Data rules the gate now enforces

⭐ **The juxtaposition hazard MOVED.** In a four-item design items 1 and 2 are never adjacent — the
only pair ever juxtaposed is **items 2 and 3**, in the gap-missing card. So the earlier panel's proxy
("item 1 must carry a plural marker", derived from the three-item shape) guarded the wrong slot. The
right test is direct: **is `<item2><item3>` written solid a real Swedish word?** (`husbilar`,
`barnböcker`, `glasburkar`, `djurungar`, `äppelsmör` all are.) ⚠ `äggost` is a real dish, so round 2
is **ORDER-LOCKED** — the gate prints that as a note, not a failure, because särskrivning preserves
order.
⚠ **The verb-homograph ban had to be SCOPED**: Swedish `-ar` plurals are systematically homographous
with first-conjugation presents (`bilar/bila`, `bollar/bolla`), so a formal ban rejects half the
language. Only high-frequency **strong**-verb presents can actually be read as a verb — `bär` was
removed twice, because `smör bär` is a well-formed clause ("butter carries").

## The gate — 1 pool → 8

It **drives the real activity** in a sandbox (init → setupTask → view.choices → isCorrect) rather than
re-implementing the builders — ⭐ *a gate that reimplements what it checks is testing a copy* — while
holding its **own declared correct form per locale**, so the builder cannot mark its own homework.
Four surface heuristics per pool, held by a **named ratchet that may only shrink** (en/de/fr/es/pt/
it/nl 1.00, sv 0.50). 13 poisons + a control, each caught by the assertion it NAMES.
⚠ **One poison SURVIVED first time** because it accidentally reproduced correct behaviour (`.cpl-opt[0]`
IS the tapped card whenever the correct one is not first) — *a poison set is only as good as its
examples*. ⚠ Another died on a multi-line needle carrying `\r\n`; the harness **threw** rather than
skipping, which is the only reason it was visible.

## Traps re-paid

- ⚠ **My own new check condemned correct copy**: the list-scope regex was case-sensitive and both
  scoped strings start with a capital `I`. The gate was wrong, not the copy.
- ⚠ The manifest **does not round-trip** through `JSON.stringify` — anchored splices, asserted, plus a
  post-parse check that every other locale is byte-identical.
- ⚠ The strings object's LAST entry ends ` }` with no comma; assuming ` },` threw before writing.
- ⚠ A scratchpad script cannot `require('puppeteer')` — run with `NODE_PATH` set to the repo's
  `node_modules`.

## Filed, NOT fixed

- ⭐⭐⭐ **the earliest-comma leak (1.00) in six locales** and **the line-count leak in five** — the fix
  is the four-item rebuild done here, but it needs native round data per locale: six panels, six
  commits. Filed with the measurements so they cannot be lost.
- **the German and Spanish tips assert an absolute that is false in their own languages** —
  *"nie vor „und“"* / *"nunca antes de «y»"*, unscoped, where German permits a comma before `und`
  between main clauses and RAE lists correct cases before `y`. ⚠ These are claims a *Swedish* panel
  made about German and Spanish — verify with native de/es panels first.
- **the audio reads the foils aloud** (`_tap` speaks every card), and in Swedish the comma's break
  falls exactly where an **English** list-final break falls, so a child with English exposure hears
  the wrong card as natural. Cheapest honest fix: speak with commas stripped.
- **`pim-comma-mail.letter-commas.l-2-2-b`** — a second Swedish comma deck coming down this fan-out,
  so this deck's rule claims nothing exclusive. It also stores its forms with `ok` flags as DATA.
- carried from #29: the English-only `series-comma-core`; the gap never filled; `win` dead in seven
  locales; the six activities failing their own DoD.
---

# sv #31 — `robin-mirror.reflexive.l-2-1-c` — *Kottes ordspegel* (Lgr22 åk 3)

**Shipped `0f026666`** (pushed, NO deploy; 10 files, 1177 insertions). `slug.sv` = `reflexiva-pronomen-mig-dig-sig-oss-er-ak-3` · character **Kotte** (rödhake)
· grade override **`sv:'3'`** · **no** strand override · prose 90 → 91 · wrapper 9.717 → 9.718 ·
html `?v=7 → 8` · **0 lines** to `reflexive-pronoun-core.js` and `lcs-shell.*` · commit + push, NO deploy.

The deck — a LADDER, not a paradigm fan-out:

| # | band | sentence | ✓ | chips |
|---|---|---|---|---|
| 1 | 1 | `Jag bryr ___ om hunden.` | mig | mig · dig · sig |
| 2 | 1 | `Du måste skynda ___ nu!` | dig | dig · mig · er |
| 3 | 1 | `Vi beter ___ fint i klassen.` | oss | oss · mig · er |
| 4 | 2 | `Barnen klär på ___ i hallen.` | sig | sig · oss · er |
| 5 | 2 | `Ali och jag ger ___ iväg nu.` | oss | oss · mig · dig |
| 6 | 2 | `Du och Sara torkar ___ i solen.` | er | er · dig · sig |
| 7 | 3 | `Varje kväll lägger katten ___.` | sig | sig · dig · oss |
| 8 | 3 | `På morgonen tvättar jag ___.` | mig | mig · sig · oss |

Fixed-guess 25% · longest 35% · shortest 29% · firstToken 54% (the best of the eight pools).

## ⭐⭐⭐ THE DECK SHIPPED WITH THREE ROUNDS THAT HAD TWO RIGHT ANSWERS, AND ONLY A NATIVE PANEL COULD SAY SO

Swedish barely has a reflexive paradigm to teach: **mig/dig/oss/er ARE the ordinary object pronouns**,
unchanged, so four of the five cells add no new form at all. The one novel fact is that **`sig`
collapses han/hon/den/det/de onto one word** — and a Swedish five-year-old already says
«han lägger sig» correctly. So a flat fan-out is a LOOKUP answerable by ear. The rebuild is a ladder
over the thing that IS hard in Swedish — **finding the doer**: adjacent pronoun subject (band 1), a
coordination the child must map to a person (band 2, with the visible «jag»/«Du» as the trap), and
**V2 inversion** (band 3), where the first word is a decoy. Band 3 is a question English cannot pose.

⚠⚠ **But the verbs I first chose were transitive, and a transitive verb destroys the exercise.** The
panel, asked one question about the printed sentences cold, found three LIVE second answers:

- «Jag sätter **dig** på stolen» — *I'm putting you on the chair*. Idiomatic. **In round ONE**, where
  the rule is being established.
- «Vi gömmer **er** bakom soffan» — not merely well-formed: **the single most natural sentence in a
  hide-and-seek frame**, which is exactly the frame the sentence evokes.
- «Ali och jag lär **dig** simma» — *lära* is both *learn* (`lära sig`) and *teach* (`lära någon`), and
  nothing in the sentence selects between them. It is the one Swedish verb that most reliably defeats
  a reflexive exercise.

⭐ **A child who picks those has read Swedish correctly and would be marked wrong** — the one outcome
a grammar deck must never produce, because it teaches the child to distrust their own ear.

⭐ **And the panel located the reason in the CHROME, not the data**: the framing says *the word points
back at the one doing something*, but the prompt the child reads is «Vilket ord passar i meningen?» —
a **fit** question, not a **points-back** question. Answering the prompt literally, any grammatical
chip fits. The repair was the sentences (cheaper, and it leaves the prompt short):
`bry sig om` has **no transitive use at all** in modern Swedish, `bete sig` is obligatorily reflexive,
and `ge sig iväg`'s competing particle reading needs «ger iväg dig», not «ger dig iväg», so the
printed string has no second parse.

⚠ The panel also confirmed round 7's word order: «Varje kväll lägger katten sig» is canonical V2 and
needs no change; switching to «lägger sig katten» would put the antecedent AFTER the gap and destroy
the band-3 lesson.

## ⭐⭐ THE GATE READ 8 ENGLISH ROUNDS AND CALLED IT A GATE — 48 ROUNDS, 0 ASSERTIONS

`verify-reflexive-pronoun-core.js` read `params.rounds` only. The core hardcodes the ENGLISH
`REFLEXIVE_TABLE`, so its `oracle`/`chips`/`facts` are meaningless on any localized deck, and the
activity knows this and routes every non-English locale through its own `REFL_L10N`. **Six shipped
localizations had no gate at all.** Rewritten to the #30 shape: drive the REAL activity per locale in
a sandbox while holding an independently declared table, and report a disagreement as DRIFT.

⭐ **The new bot is the point.** `firstToken` reads ONLY the first word of the sentence, looks it up
and taps that form. A deck it beats does not teach finding the doer — it teaches copying word one:

| | en | de | fr | es | pt | it | nl | **sv** |
|---|---|---|---|---|---|---|---|---|
| firstToken | 58% | **83%** | 42% | 58% | 67% | 46% | **83%** | **54%** |
| fixed-guess | 25% | 25% | 25% | 25% | **50%** | 38% | 25% | 25% |

Both are named RATCHETS that may only shrink. `pt` is over the 45% fixed ceiling because BR Portuguese
has three surface forms and `se` answers four of eight — measured, filed, not repairable from here.

## Traps paid, and how each was found

- ⭐⭐ **AN INVENTED THRESHOLD IS NOT A MEASUREMENT.** My first ratchet table was ESTIMATED and three of
  eight numbers were wrong in the direction that FAILS A CORRECT DECK. Added `--measure`, ran it,
  pasted. Never round to taste.
- ⭐⭐ **THE SUBSTRING RULE WAS RIGHT FOR THE CHROME AND WRONG FOR THE SENTENCE.** A substring no-leak
  test condemned three CORRECT rounds — French «Maya ___ repose» because *repose* contains "se", and
  two Portuguese for the same reason. Inside a sentence a substring is not a leak. It belongs to the
  FIXED strings, where a Swedish `er` really does hide inside «eller» and «person» and where the
  shipped guard never looks. ⚠ And it must NOT be diacritic-folded: pt «Nós» vs «nos» differ only by
  the accent, and folding would fail a shipped correct deck. That homography is priced by firstToken.
- ⭐⭐ **A COMPARISON FOLDED ON ONE SIDE REPORTS A NUMBER, AND THE NUMBER IS WRONG.** My verb check
  folded the sentence word and compared it against an unfolded list, so «sätter», «gömmer», «klär»,
  «lär» and «tvättar» could never match: it reported 1 of 8 where the answer was 6. The sv #28
  artefact-bot shape. It was then replaced entirely — a verb having a transitive use does not mean
  THIS round's foils are grammatical, so the file now carries the panel's per-round ruling instead,
  and an **unclassified round FAILS** (a new round may not inherit another's verdict).
- ⭐ **A CASE-SENSITIVE RULE, AND THE POISON IS WHAT PROVED IT.** The «säg» homophone ban was
  case-sensitive, so «Säg» at sentence start — the only place a Swedish imperative stands — sailed
  through. The poison survived; the RULE was fixed, not the poison. Same class as sv #30's
  case-sensitive list-scope regex.
- ⭐ **A HARNESS THAT SILENTLY DID NOTHING.** `local-test`'s `force()` looked a round up and on a miss
  took `at = -1`, failed `if (at > 0)`, reordered nothing and **threw nothing** — so it was testing
  round ZERO eight times and reporting PASS. It also asked `Core.oracle()` for the expected chip,
  which returns the EMPTY STRING on every non-English locale. Now it throws, drives EVERY round of
  BOTH pools, and holds its own table.
- ⚠ **My own comparison then failed a working tool**: `_pool[k].id` is the TASK id (prefixed
  `robin-mirror.`) and `tool.round.id` is the RAW manifest id. Verify the measurement before the defect.
- ⚠⚠ **BACKSLASHES EATEN BY THE SHELL, THREE TIMES IN ONE SESSION.** `bash <<'PY'` and `node -e` each
  swallowed a level, turning `'\n};'` into a literal newline inside a JS string. The rule was already
  recorded. ⚠ And my throwaway `new Function(src)` parse-check FAILED FOR AN UNRELATED REASON — the
  shebang — which nearly masked the real syntax error. A check that fails for the wrong reason tells
  you nothing.
- ⚠ `continue` inside `try` still runs `finally`, so an explicit `page.close()` before it double-closes
  and throws `Target.closeTarget`, which the outer catch reports as a run-ending ERROR.

## ⭐⭐ TWO GATES WERE DARK ON THIS ACTIVITY, AND ON TEN OTHERS

`visual-qa-activity.js` printed `cards=0 content=— sparse=—` and PASSED. The answer-card selector knew
`-cand`, `choice-card`, `-choice`, `-card`, `-opt` — and **not `-chip`**, which ELEVEN activities use
(rmr, hwb, cf, cl, dps, fb, gi, sc, ss, wcc, wqw). Same symptom and same silence as the recorded `-opt`
defect: cards 0 → fallback → TINY and SPARSE measuring nothing. **Adding one convention did not make
the list complete; it made the list one longer.**

⚠⚠ **UNLIKE `-opt`, THE SHELL SHIPS A `-chip` CLASS** — `lcs-chip` is the settings drawer's segmented
control, and `buildDrawer` appends the drawer INSIDE `.lcs-app`. Without an explicit exclusion every
drawer chip in the catalogue would have been measured as an answer card.

⭐ **And widening one gate would have narrowed another.** The fallback control set engages *only when
cards is empty*, and it is what feeds TAP and controlBottom — so the moment `-chip` matched, those
eleven activities went from "every tool button measured for TAP" to "only the chips", silently
dropping any undersized speaker or reset. The engage condition now keys on what the selector matched
BEFORE the addition, so those eleven keep exactly their prior coverage and the other ~120 are
untouched. Measuring every tool control for TAP everywhere is the right eventual answer and is new
catalogue-wide coverage — its own measured commission, not a side effect of one line.

**Blast radius MEASURED, not asserted**: ran all ten other `-chip` activities, then re-ran the six
failures with `-chip` removed. **All six fail identically without the change — every one pre-existing.**
Unfixed, with the numbers, at 320×640 unless noted:

| activity | selector | measured |
|---|---|---|
| `chuffer.rail-decompose.k-oa-a-3` | `.cf-box cf-box-a` | 40px < 44 |
| `clunks-lost-lunch.make-total.k-oa-a-3` | `.cl-chip cl-locked` | 40px < 44 |
| `friendship-bridge.compare-balance.k-cc-c-6` | `.fb-disc fb-disc-left` | 36px < 44 |
| `sock-and-shadow.puppet-speak.sl-k-6` | `.ss-chip ss-chip-object` | 34px < 44 |
| `wally-capital-crane.special-names.l-2-2-a` | `.wcc-chip` | 40px < 44 |
| `wren-question-window.question-words.l-k-1-d` | `.wqw-spk` | 34px < 44 |

(`graph-it.bar-graph.2-md-d-10` reported >10 failures and was not itemised. `daisy-plate-stack`,
`hazel-word-bridge` and `sentence-clinic` pass.) These are one-declaration `min-height` fixes each,
but each needs its own sweep — **their own commit, not this one.**

## ⭐⭐ THE TWO DEFECTS THE GATES COULD NOT SEE, FOUND BY READING THE RENDER

1. **INVERTED HIERARCHY.** The sentence — the thing that changes each round and that the child must
   read closely to find the doer — shipped at `clamp(14px,3.6vw,18px)` against chips at
   `clamp(15px,4vw,19px)`. **The smallest text in the working area was the material and the largest
   was a prompt that never changes**, and on desktop the sentence stayed pinned at 18px inside a 540px
   card while everything round it grew. Every gate was green: TINY has a 14px floor and reads only
   answer-card content, so 18px passed twice over. ⚠ **A FLOOR CANNOT SEE AN ORDER.** Fixed to
   `clamp(15px,4.6vw,26px)` — and then the local test caught that all three narrow/short media
   overrides pinned it BELOW the chips too, so the clamp alone had fixed only the wide widths. The
   assertion added is the ORDER (sentence ≥ chips at every viewport), never a number.
2. **A DEAD STRING IN EIGHT LOCALES.** `win` was authored everywhere and referenced NOWHERE — not by
   the activity, not by the shell, which renders its own «Bra jobbat!». Deleted. The #39 lesson:
   *"the string exists" is not "the string is reached"*, and the check that catches it names its own
   blind spot (a live `t()` call in an unreachable branch still counts as referenced).

Also fixed: `.rmr-sent` wore a permanent **GOLD** border — the same ink `.rmr-sel` uses for *I chose
this* — so the child met the chosen-colour on every frame before choosing anything. Neutralised, and
the phase driver now asserts that **no standing chrome wears a state ink as a border**, scoped to
borders outside the chips so the legitimate coral TEXT of `.rmr-ask` is not condemned.

## Also fixed in this commit

- **the English `cat` round had two correct answers** — chips *itself/herself/themselves* on
  «The cat washed ___ clean.», and *"the cat washed herself clean"* is impeccable English. The deck's
  only true reflexive round had a foil that was not wrong. Now «The robot dried ___ off.» with `we`.
- **the English `youcan` round leaked its answer's STEM** — «You can tie **your** shoes ___!» with the
  answer *yourself*: pattern-matchable without ever locating the subject, and invisible to a
  word-identity guard. Now «You can tie the laces ___!».
- **`robinIntro.en`** was false for 7 of its own 8 rounds (they teach the intensive, not the reflexive).
- `.rmr-spk` 34px → 44px (under the floor at EVERY width); `.rmr-chip` min-width 48px; the three-colour
  contract GOLD/CORAL/GREEN with `check()` marking only the tapped chip; `.rmr-say` clamp 78%/2 → 84%/3.
- **`audit-activity-variety.js` reported "not deployed yet" as FAIL** — indistinguishable from a real
  variety defect, on every build of a commit-but-do-not-deploy loop. Now distinguishes on HTTP STATUS:
  404 is a reported SKIP, 200-with-no-iframe stays a hard FAIL.

## The grade, and why it breaks a unanimous line

**åk 3** — the FIRST sv Language deck above åk 2, against ~12 unanimous at åk 2. ⚠ The two nearest
precedents in `page.tsx` argue OPPOSITE ways: **#29 measured and REJECTED** the "Sweden numbers a year
lower, so sv 2 == their 3" mechanism (sv equals de in 9 of the 10 overrides that set both), while
**#30 leaned on age parity** with the siblings to hold åk 2. So neither "is it named in the band?" nor
"what age are the siblings?" can decide it — the Lgr22 PROGRESSION does, as in sv #8. The ruling rests
on **band 3**: locating a post-verbal subject across an inverted main clause is a reading operation no
shipped åk-2 sv deck asks for. It declines #30's age parity explicitly, because that argument holds
when the sv deck teaches the SAME thing a year-name apart, and here it does not. ⚠ NOT åk 4 — that
band names ordklasser and this deck never asks the child to NAME anything.

## ⭐⭐ THE VISUAL CRITIC RETURNED **DO NOT SHIP** OVER A GREEN 8-LOCALE SWEEP

1,536 renders passed every measured gate. The critic then read 32 of them and filed nine
findings, and the three that matter are ones no floor could express.

**Fixed here (all activity layer):**

- ⭐⭐ **the standing instruction wore the WRONG-ANSWER COLOUR in every state, including the
  win screen.** «Läs meningen. Tryck på ordet som passar.» was `C.CORAL2` in all 32 images —
  so on a green celebration (green heading, green ringed chip, green Nästa) a **coral line sat
  in the middle of the party**. To a child who has just learned coral means *not that*, it
  reads as a leftover error. Same class as the recorded `f80a9762`. Now a muted teal, and
  raised from a 13.5px cap (under the legibility floor, for an *instruction*) to 16px.
- ⭐⭐ **THE MARKED CHIP WAS THE LEAST LEGIBLE ONE ON THE BOARD — and I measured it rather
  than eyeballing it.** WCAG on the shipped pairs: an untouched chip 6.37, «selected» 5.63,
  **«tried» 3.68**. The chip carrying the state information read DIMMER than the two the child
  never touched. Deepened to 7.83 / 7.16 / 7.75, hue unchanged so gold/coral/green still mean
  chosen/tried/right. ⭐ The gate added asserts the ORDER against the UNTOUCHED chip, not a
  number I picked — so it moves if the resting style ever does.
- ⭐⭐ **the win screen never showed the completed sentence, AND MY OWN ASSERTION DEMANDED
  THAT.** The phase driver said *"the gap must still be a gap"* — I reasoned that filling it
  would print the answer. It cannot: the frame is reached only after the round is WON. In a
  grammar activity seeing «Jag bryr mig om hunden.» whole IS the payoff — the moment the rule
  becomes a sentence — and the child was being made to assemble it from two places on screen.
  **An assertion can encode the wrong intent perfectly and stay green forever.** Flipped.
- **the sentence speaker looked DISABLED.** Two speakers on one screen in two visual
  languages: the shell's is a crisp glyph on a white circle with a shadow; this one was a
  washed glyph on a pale mint square with none. A child presses the one that looks like a
  button and not the one attached to the sentence they cannot read — exactly backwards.
- the sentence cap raised again, 26px → 30px.

**⚠ ONE FINDING WAS A MIS-ATTRIBUTION, AND I VERIFIED IT BEFORE ACTING.** It reported "the
chip tray is ~2.4× wider than its contents, ~150px of dead grey each side". There is no tray
element — that grey is `.rmr-root`'s own bottom gradient, i.e. the card, which also carries
the full-width sentence bar. Narrowing it would have been wrong. It also measured the inline
speaker at "44 × 41, under the floor" from a screenshot; the harness measures the actual rect
and it is 44 × 44. **Verify the measurement before the defect — including a critic's.**

**Three findings are SHELL chrome and this build touches 0 shell lines** — recorded, not
silenced: the shell prompt grows ~2.4× from 360→1024 while any activity's own content is
nearly fixed, so *the invariant question dominates the variable sentence at desktop*; the
prompt turns coral on a miss, making the whole screen a rebuke when only the answer was
wrong; and the `KLARA` pill is a lone number in a rounded badge, top right — the canonical
scoreboard position and shape. It counts completions and cannot fall, so it is not a score in
substance, but it is the one element that LOOKS like one. All three are catalogue-wide.


## Filed, NOT fixed

- ⭐⭐⭐ **exactly-one-grammatical is UNGATED IN SEVEN LOCALES.** sv now carries a native ruling per
  round (6 none, 2 marginal, 0 live). en/de/fr/es/pt/it/nl carry NONE, and the panel's reading of the
  shipped German — «Ich wasche dich jeden Morgen» is grammatical — says the hole is live there too.
  ⚠ That is a Swedish panel's judgement about German: verify with a German panel first. Likely the
  largest open finding in this engine.
- ⭐⭐ **de and nl at 83% on the firstToken bot** — decks a child can clear without ever locating the
  doer. Recorded as ratchets; the repair is native round data per locale.
- ⭐ **pt over the fixed-guess ceiling** (50% vs 45%), structural to a three-form paradigm.
- ⚠ **`hintWrong` is the whole subject→form mapping list in all six sibling locales** — the #28
  answer-key shape. A Swedish version would read «jag → mig, du → dig, han/hon → sig…», near-absurd
  when four of five are just the object pronoun.
- ⭐⭐ **German and Dutch split the intensive the way Swedish does** (`selbst`/`selber`, `zelf`); their
  decks want re-reading for any round whose answer ought to have been the emphasiser.
- ⚠ **the `referent` field is now misnamed** for this deck — it is an answer key, and several rounds'
  subject is not the mirror. Anyone reading it will author a bad round.
- ⭐⭐ **sv #23's search copy does not describe its own deck** (slug and intro claim min/mitt/mina; 3 of
  9 rounds are case rounds).
- the six other activities' tap-target defects, tabulated above.
- `frontend/public/mini-tools/` (gitignored mirror) is behind; the shell prompt outranks every
  activity's own content by design and no activity can fix that from its own layer.
---

# sv #32 — `wally-capital-crane.special-names.l-2-2-a` — *Almas namnkran* (Lgr22 åk 3)

**Shipped `986aeb9e`** (pushed, NO deploy; 8 files, 813 insertions). `slug.sv` =
`egennamn-som-ska-ha-stor-bokstav-ak-3` · character **Alma** · grade override **`sv:'3'`** (a NEW
row — no locale had one) · **no** strand override · prose 91 → 92 · wrapper 9.718 → 9.719 · html
`?v=7 → 8` · **0 lines** to `capital-name-core.js` and `lcs-shell.*`.

| # | band | sentence | ✓ | trap |
|---|---|---|---|---|
| 1 | 1 | `I sverige finns mycket snö.` | Sverige | — |
| 2 | 1 | `Vi åker till stockholm tillsammans.` | Stockholm | — |
| 3 | 1 | `Vid stranden i danmark bor kompisarna.` | Danmark | — |
| 4 | 2 | `På fredag öppnar simhallen i göteborg.` | Göteborg | fredag |
| 5 | 2 | `På gotland övernattar eleverna i maj.` | Gotland | **maj** (last) |
| 6 | 2 | `Vi möter kompisen i kiruna i oktober.` | Kiruna | **oktober** (last) |
| 7 | 3 | `På somrarna hör vi svenska i finland.` | Finland | svenska |
| 8 | 3 | `Vi bakar pepparkakor i umeå till jul.` | Umeå | **jul** (last) |

longest 12.5% · lowercase-longest 12.5% · shortest 0% · last-word 25% · fixed-index 25% ·
fixed-guess 12.5%. Bands are TRAP STRENGTH, not length: b1 none · b2 veckodag/månad · b3
högtid/språk, so the trap always arrives AFTER the rule it contrasts with.

## ⭐⭐⭐ A CCSS STANDARD THAT IS ONE-THIRD FALSE IN THE TARGET LANGUAGE

L.2.2.a is *"capitalize holidays, product names, and geographic names"*. In Swedish **holidays are
the OPPOSITE** — *jul, påsk, midsommar* are lowercase — and **products are unstable**: a child meets
«legobitar» and «vi bygger lego» in lowercase; `lego` is additionally a real Swedish common noun from
*lega* 'hired work' (*legoarbete, legosoldat*); and ⭐ **the engine can only ever produce `Xxxxx`**,
so tapping `lego` yields `Lego`, matching neither the brand's own `LEGO` nor the generic usage. Both
brand rounds would have marked a **defensible lowercase wrong**. Only the geographic third survives.

⚠ The failure mode this creates: if any Swedish-facing surface derived its wording from the code's
English gloss, the page would **state the reverse of the rule the deck teaches**. Verified rather
than assumed — the route sends `targetName` = the bare code and `targetDescription` = the localized
STRAND, never a gloss.

⭐ **The engine also settles the framing.** `proper` must exist, so a round where nothing needs a
capital is INEXPRESSIBLE — the lowercase words can only ever be DISTRACTORS. The deck is «hitta
egennamnet», not «lär dig att veckodagar är små», and *prose promising the negative rule would
describe an activity the engine does not run*.

## ⚠⚠ THE MEASUREMENT REFUTED THE PANEL, AND THEN THE PANEL REFUTED ME

The pedagogue's first eight rounds cleared every engine constraint and every positional bot —
last-word 25%, fixed-index 25%, fixed-guess 13%, shortest 0%. I ran them through the real core before
accepting and **the LONGEST-CHIP bot scored 75%**, against the gate's 45% ceiling. Structural, not
accidental: Swedish place names are long (stockholm 9, göteborg 8) and the panel had surrounded them
with the shortest words in the language. **The deck was solvable without reading — the very failure
it exists to prevent, one level down.**

⭐⭐ Sent back with the numbers, the panel then found a bot **I had not thought of**: in its own
second draft *"tap the longest LOWERCASE chip"* scored **62.5%** while plain longest scored 12.5%,
because the long distractor was usually the sentence-initial word no child would tap. It restructured
four rounds itself. That axis is now in the gate.

## ⭐⭐⭐ THE TWO PANELS CONFLICTED ON A FACT, AND THE FACT WON

The pedagogue's round 8 used **`dalarna`** — which is the definite plural of *dal*, "the valleys". A
child reading it that way is right and the engine would mark them wrong. Resolved on the language,
not the majority (the sv #8 precedent). The generalisable rule, now encoded:

> **A Swedish place name is usable only if its LOWERCASE form is not itself a Swedish word.** The
> homograph is invisible in the capitalised form, which is the only form a designer looks at.

Excluded on that test: `Lund` (en lund = a grove) · `Rom` (fish roe) · `Polen` (the pole) · `Skansen`
(the redoubt) · `Kolmården` · and worst of all ⚠ **`Japan`** — *en japan* is a Japanese person, and
nationality nouns are lowercase, **which is precisely the distinction this deck teaches**.
Excluded as foils: ⚠ **`mars`** (the month is lowercase but the planet is capitalized, and it is a
substring of the genitives *Hjalmars/Ingmars/Gunnars*), plus `halloween`, `lucia`, `Valborg` — the
rule says lowercase but a large share of literate Swedes, teachers included, capitalize them.
⚠⚠ **Multi-token names are banned outright** — two capital-needing chips is two right answers.

## ⭐⭐ THE SUBSTRING SCREEN I HAVE USED SINCE sv #31 IS IMPOSSIBLE IN SWEDISH AS STATED

`i` is a substring of nearly every Swedish word. **Measured: 13 of 38 candidate chip words contain
it, including this deck's own answers — Kiruna, Sverige, Finland, Paris.** A blanket substring screen
would condemn the answers. The corrected rule, now used:

> **SUBSTRING screen for CONTENT words** (answers + foils) — strict;
> **WHOLE-WORD screen for function words.**

⭐ And the reverse direction matters: a word used in the STRINGS must not appear as a CHIP. That is
why `på` is not in hintPick, and why the frames carry no `är` and no `måste`. ⭐ The linguist rejected
its own first character name **Hjalmar** on this screen — *Hjalmars* contains *mars*.

## The gate read one pool of eight

`verify-capital-name-core.js` read `params.rounds` — the English deck and nothing else. **48 rounds
ungated.** Rewritten to drive all eight pools, re-derive the answer rather than ask the core, and add
the three axes `deckFacts` cannot see: **lastWord**, **loLongest**, and ⭐⭐ **exactly-one-capital** —
`facts()` checks that `proper` occurs once, never that the REST of the sentence is legitimately
lowercase, so a second name would be a second right answer and nothing had ever looked. For sv that
is a declared per-round native ruling and an unclassified round FAILS. 2 controls + 14 poisons killed.

⚠ **The ratchet table was measured, not estimated** — my first draft was wrong on **5 of 8**
`loLongest` values, in the direction that fails a correct deck. `--measure` exists so it can never be
invented again. ⚠ And the first version of the two ratchet poisons could never fire, because
`--measure` is exactly what disables the assertion they test: `enforceRatchet` is now an ARGUMENT.

## Three defects found by reading the render, not by a gate

- ⭐⭐ **`.wcc-chip.wcc-sel` is a TWO-class rule**, so my new single-class `.wcc-tried`/`.wcc-right`
  lost on **SPECIFICITY, not source order**, and failed silently — the class was applied and the
  border stayed gold. My own recorded trap, walked into again. Caught by measuring the pixel.
- ⭐ **The tap floor is limited by chip WIDTH, not height** — a one-letter chip «i» rendered 29px at
  280px, so `min-height` could never fix it. `min-width:44px` did.
- ⭐⭐ **MY OWN DRIVER MADE A VACUOUS ASSERTION.** It picked the first chip that was not the answer —
  chip 0, the sentence-initial word, **already capitalized**. So the `picked` frame photographed a
  crane that had lifted nothing and the capital check passed *trivially* because «Vi» already starts
  with a capital. Now it picks a LOWERCASE distractor and asserts the lift **by comparison** against
  the before-text.

## Two pre-existing sibling defects the new driver exposed

Only the OPENING frame had ever been photographed for this activity, in one locale — so `picked`,
`missed` and `resolved` had never been seen in any language.

- **German was CLIPPING** in `resolved` at 412px: `.wcc-say` at `max-width:74%` + `line-clamp:2`, and
  the German line is 61 chars, the longest of the eight. → 84%/3 lines. (The sv #29/#30 clamp shape,
  third appearance.)
- **French and Dutch were CUT OFF** at 320×640 in `missed` (control 673 and 656 against a 640 fold):
  fr carries up to 9 chips and nl up to 8, wrapping to three or four rows, and the hint line pushed
  the button past the fold. ⚠ **Measured before blaming my own clamp change** — the speech row is
  `display:none` at that height, so it contributes zero. Fixed by tightening short-viewport spacing;
  tap floor untouched and the local test re-run to prove it.

## Also fixed

- `.wcc-sel` was **CORAL** — the try-again ink — and nothing changed after Check, so picked/missed/
  resolved were ONE colour. Now GOLD/CORAL/GREEN with the mark on the **TAPPED CHIP ONLY**.
  ⭐ **The text stays INK in all three states**: this deck's resting chip is near-black on near-white
  (WCAG **13.69**) against robin-mirror's 6.37, so the #31 palette would have made every marked chip
  LESS legible than an untouched one. **The relative rule did not transfer** — border and tint carry
  the state instead (12.5-12.9). ⚠ And the leak assertion was TIGHTENED, not deleted: from "no chip
  is ever marked" to "the CORRECT chip is never marked".
- The local test ran `?lang=en` only with hard-coded English round ids and title, and its `force()`
  could silently no-op. Now en + sv, every round of both pools, and it throws.
- ⚠⚠ It asserted the capital with **`/^[A-Z]/` — ASCII-only. Measured FALSE for `Åre`, `Öland`,
  `Älvsjö`**: it would have failed a CORRECT Swedish tool the moment the deck used such a place.
  Now `/^\p{Lu}/u`.
- `win` deleted — authored in every locale, referenced nowhere.

## The grade, and the curriculum that cannot decide it

**åk 3**, on progression. ⚠⚠ **Lgr22 åk 1–3 names «stor och liten bokstav» and STOPS** — it never
names egennamn, veckodagar or högtider, so **the curriculum cannot place this deck and anyone
claiming it does is reading in**. The shipped ladder does: förskoleklass LETTERFORM
(`choice-board.letter-case`) → åk 2 POSITION (`sentence-builder`) + the PROTOTYPE personal name
(`sentence-clinic`, «Min hund heter Bella») → **åk 3 category membership under competition**, a
metalinguistic judgement rather than a rule application. ⚠ **NO Lgr22 quotation anywhere**: the panel
gives ~60% confidence on the bullet wording and refuses to be quoted, so the copy REFERENCES the
framework. (`strand-names.ts` carries the same warning about its own sv value.)

**NO strand override.** de/fr/es/nl each override because their curricula HAVE a separate orthography
strand; `it` and `pt` deliberately do not; Swedish is in the second group — «Språkliga strukturer och
normer» is the one rubrik carrying stor och liten bokstav, the sv #30 komma reasoning. ⚠ A
code-survey agent asserted the opposite; the native panel did not, and it contradicts a shipped sv
decision. Not accepted.

## Filed, NOT fixed

- ⭐⭐ **exactly-one-capital is a declared ruling for sv ONLY.** en/de/fr/es/pt/it/nl carry none.
- ⭐⭐ **en 75% and nl 88% on the last-word bot** — decks a child can clear without reading. Ratcheted.
- ⭐⭐ **34 of 133 activities declare a `win` string referenced nowhere** (~300 authored strings).
  A mechanical deletion, no locale authoring — its own commit.
- **Six other activities under the 44px tap floor**, measured both directions, all pre-existing:
  `chuffer` (.cf-box 40px) · `clunks-lost-lunch` (.cl-chip 40px) · `friendship-bridge` (.fb-disc
  36px) · `sock-and-shadow` (.ss-chip 34px) · `wren-question-window` (.wqw-spk 34px) · plus
  `graph-it` (>10 failures, unitemised).
- `kid_prompt_template` in this manifest is an English-only bare string, not a locale map.
- ⚠ `isAccessibleForFree: true` is emitted in the JSON-LD of EVERY activity page, against the
  recorded tier truth that nothing is free.
- The English deck has **no foil in any round** (every non-answer word is ordinary vocabulary), and
  `games/design/research/PRIOR-ART.md` carries a `locales` column for this row still reading **7**.

## NEXT — sv #33

Find it the usual way: `git rev-list --all --children | grep ^4d60f5ab` → the child de commit →
`git show --stat`. The de source for #32 was `4d60f5ab`.

## sv #33 — Murklas ordsluss (`rusty-yesterday.irregular-past.l-2-1-d`) — `b678c799`, pushed, NO deploy

slug `verb-i-datid-malade-sprang-gick-ak-3` · åk 3 (`sv:'3'` added) · no strand override · prose 92→93
· wrapper 9.719→9.720 · html `?v=7→8` · 8 files, 620 insertions · 0 lines to `irregular-past-core.js` + `lcs-shell.*`

**The deck** (band · present → correct [cards]; `att`=infinitive foil, `fake`=invented):
1 målar→**målade** [målat·målade·måla/att] · 2 springer→**sprang** [sprungit·springa/att·sprang]
3 leker→**lekte** [lekte·lekt·lekade/fake] · 4 bygger→**byggde** [byggt·byggte/fake·byggde]
5 kommer→**kom** [kommit·kom·komma/att] · 6 läser→**läste** [läsa/att·läste·läst]
7 äter→**åt** [ätit·ätade/fake·åt] · 8 går→**gick** [gick·gått·gådde/fake]

⭐⭐⭐ **THE SHIPPED DECK IS 94–100% SOLVABLE WITHOUT READING** — 56/56 rounds offer a card that is a
word already in the prompt (the foil set is correct·PRESENT·invented, and the prompt shows the present
in bold). sv is **0/8**. Worst solver: en/de/it/nl **100%**, fr/pt 81%, es 56%, **sv 60.4%**.

⭐⭐⭐ **THE FOILS MUST NOT BE CONSISTENT.** Regularising them (weak→infinitive, strong→invented — the
obvious tidy-up) makes foil TYPE name the verb CLASS: "drop anything ending in -t, then if a bare -a
form survives take the longer else the shorter" = **100%**. Fix = put the att-ordet on STRONG rounds
too, because the infinitive is SHORTER than a weak past (måla<målade) and LONGER than a strong one
(springa>sprang). Exhaustive search over 238 credible configs floors at 60.4%; the deck sits on it.
⚠ **The panel measured the smart strategy against the regularised deck and the simple one against the
mixed deck and never crossed them** — crossed, the "frozen" table was 87.5%.

⭐⭐ **MY IMPOSSIBILITY PROOF WAS WRONG (the premise, not the mechanism).** The answer is a unique
extreme only when BOTH foils fall on the same side. **STRADDLE** rescues any weak round (byggt 5 <
byggde 6 < byggade 7); only a **TIE** rescues a strong one (gick/gått), and `gå` is the only usable
tie-verb — `få` is out because «får» = sheep. **Durable rule: the answer must never be a unique length
extreme of its own card set.** Deck passes the flat 45% at 37.5% → **no ratchet opened**.

⭐⭐ **ONE `hintWrong` CANNOT BE HONEST — three classes** (har-ordet / påhittat ord / att-ordet) via
`hintKey` dispatch on a per-choice `cls` tag, with a guard falling back to `hintWrong` for the seven
locales that lack the keys (a miss renders the KEY, `lcs-shell.js:82`). Precedent `45d66c99`.

⭐⭐ **A LIVE FALSE STATEMENT FIXED:** the shipped åk-2 `tense.past-present-future` said «en del verb
byter vokal i dåtid — **sover blir sov**». `sova·sover·sov·sovit` has `o` in all four forms. Replaced
with «springer blir sprang». It also decided the design — `sova` out, `komma` takes «nästan likadant».

⭐⭐ **THE WIN FRAME NEVER SHOWED THE FINISHED SENTENCE** (found by READING the 360 render, not a gate)
— the gap stayed a gap after a correct Check, the identical defect the critic caught on sv #31 where I
had asserted the OPPOSITE. Now «I går **sprang** jag.», asserted, poison fires on all 8 rounds.
⚠ Only where the template carries a slot: es «¿Y ayer?» / pt «E ontem?» have none.

⚠⚠ **PANEL CONFLICTS RESOLVED ON THE LANGUAGE, NOT THE MAJORITY.** `komma` kept — the «kom»⊂«kommit»
ban also deletes the tighter lekt⊂lekte / läst⊂läste (linguist withdrew). `äta` kept — «dåtid» contains
«åt» is a **substring test wearing a leak test's clothes**, the sv #31 French «se»⊂«repose» defect
again. `gå` kept — ⭐ **chrome identical in all eight rounds carries zero information and cannot leak.**

⚠⚠ **I BRIEFED BOTH PANELS WITH ENGLISH STRINGS THAT DO NOT EXIST**, so three of their headline
"source defects" convict invented text. **Write the brief from the artefact.** The two that survive:
`theAsk` "Tap the word that tells about yesterday" is TRUE of a wrong card (`run`/`come` are past
participles), and `seed` is a real English word sitting as a foil.
⚠ The linguist also reported a `nl yTpl 'ich'` defect — the file says `'ik'`. **It was not real.**

⚠ **THIRD CONSECUTIVE ENGINE with the same three holes:** gate read only `params.rounds` (48/56 rounds
ungated, de 0.750 / fr 0.625 never seen), local-test was `?lang=en` with a `force()` that silently
no-op'd on a miss, and no phase driver. All three retrofitted; 7+7 poisons killed.
⚠ **`positionBot` is now NOT asserted** — it reads the STORED order that `setupTask` shuffles away, so
its 1.000 in five locales is an artefact. The RENDERED order is asserted in the local test instead.
⚠ My de baseline was invented from the wrong column — **third invented ratchet in this fan-out**; use
`--measure`. ⚠ A fixed-140ms verdict read made the harness FLAKY (different round failed each run).

## sv #34 — Leos ordtrappa (`roary-roar-meter.shades.l-2-5-b`) — `d7bb67af`, pushed, NO deploy

slug `starka-och-svaga-ord-ljummen-varm-het-ak-3` · åk 3 (`sv:'3'`) · **strand override
`sv: 'Ord och begrepp'`** (all six siblings override the strand too) · prose 93→94 · wrapper
9.720→9.721 · html `?v=7→8` · 8 files, 613 insertions · 0 lines to `word-intensity-core.js` + `lcs-shell.*`

**The deck** (ask · rank1 · rank2 · rank3 → answer). Ask assignment is FORCED, not chosen:
```
1 ljudstyrka STRONG viska · prata · skrika      -> skrika
2 fart       weak   gå · springa · rusa         -> gå        (soft springa/rusa joint made LATENT)
3 gladje     STRONG nöjd · glad · lycklig       -> lycklig   ⚠ nöjd<glad FAILS entailment; safe only because STRONG
4 blott      weak   fuktig · våt · genomblöt    -> fuktig    (transparent compound at rank3, weakest only)
5 ilska      STRONG irriterad · arg · rasande   -> rasande
6 kyla       weak   kylig · kall · iskall       -> kylig     (transparent compound at rank3, weakest only)
7 vind       STRONG vindpust · kuling · storm   -> storm
8 varme      weak   ljummen · varm · het        -> ljummen   (soft varm/het joint made LATENT)
```

⭐⭐⭐ **THE GATE MEASURED BOTH HALVES OF THE EXPLOIT AND PASSED EACH.** It asserted
`longestBot<=0.45` and `shortestBot<=0.45`; en is 0.38/0.25 and always green. But the ask
ALTERNATES, so the real solver is ask-aware — *"strongest→longest, weakest→shortest"* — and scores
**en 68.8%**. **A gate that measures a conjunction one conjunct at a time is not measuring it.**

⭐⭐ **WIDENED TO 8 CUES × ALL POOLS: EVERY SHIPPED LOCALE BREACHES, ON A DIFFERENT CUE.**
en askLength 68.8 · fr alwaysShortest 62.5 · pt alwaysLongest 62.5 · it midLength 54.2 ·
de/nl midLength 47.9 · es midLength 41.7. **sv 37.5%, no ratchet row.**
⭐ Syllables is an INDEPENDENT axis (fr 25.0→14.6 while es 16.7→25.0) → ratchet the MAX over the
family. ⚠ `midLength` is the OVER-CORRECTION trap: the core guarantees the middle-RANK word is never
the answer, so tuning off both length extremes hands it the deck. **Target every cue at CHANCE, not 0.**

⭐⭐⭐ **THE RULE OF THE BUILD — A CONTESTED JOINT IS *ACTIVE* OR *LATENT* BY WHICH END IS ASKED.**
`gå<springa<rusa` under 'strongest' puts the soft joint ON the answer; under 'weakest' the answer is
`gå` and it never decides anything. The pedagogue withdrew both its own MEDIUM flags on seeing it:
*"my instrument rated whole triples; the linguist's rates the joint the ask actually interrogates."*
Combined with *a transparent compound may sit at rank 3 only in a WEAKEST round* (33→50, not 33→100),
**the ask assignment has no remaining freedom.**

⚠⚠ **BOTH PANEL HEADLINES WERE WRONG.** The pedagogue filed *five locales 100% solvable by position*
with a table — it read the core's ordered `childView()` and stopped one layer short of the activity's
`shuffle` (`:61`). Browser-measured: all six permutations over 24 remounts, bot at 13–46%.
⭐ **I made the identical error one build ago off `positionBot`** — the core's job is to expose an
ordered view, so *anything pointed at the core reports order*. And the strand claim was off-target
(CCSS: "Language" is the strand, "Vocabulary Acquisition and Use" a cluster) but found a real
inconsistency: `affix` stores the cluster, the other three the strand.

⭐⭐ **THREE RESPONSE CLASSES, DERIVED FROM THE RANKS** — middle-rank tapped = never ordered them;
other extreme = ordered them right, answered the wrong question. **No per-card tagging, unlike #33.**

⚠ **The compound ban must be a WHITELIST, never a prefix regex** — `stor-` is banned and **`storm`
starts with `stor`**, so a regex kills round 7's correct answer.

⚠⚠ **POISON FINDINGS:** `answerNotMiddle` **cannot be poisoned** — with distinct ranks the target is
max or min and neither equals the middle, so the core's fact is a **tautology** of `ranksDistinct`.
Deleting the sv pool SURVIVED (`>= 7 pools` was right before sv existed). ⚠⚠ **THE RATCHET WAS
LAUNDERABLE** — adding an `sv: 0.90` row passed a real 50% breach, because the max-over-family number
is the SOLE cue assertion. Fixed by freezing WHICH locales may carry a row at all.
⚠ **The harness went flaky one layer down from #33**: there I fixed the verdict READ; here the
SEQUENCING raced (three tap→Check cycles per round). `check()` now waits for a clean prompt.

**Sixth engine** with `.rrm-sel` = `--lcs-accent` and no post-Check marking. **Fourth** with no phase
driver, an en-only gate, and `force()`'s silent `if (at > 0)`.

## sv #35 — Sebbes bildhage (`ziggy-odd-one-out.category.l-1-5-a`) — `877d183c`, pushed, NO deploy

slug `vilken-passar-inte-in-blabar-hallon-bjornbar-apelsin-ak-1` · **åk 1, NO grade override**
(below Olga's åk 2, not above) · strand `sv: 'Ord och begrepp'` · prose 94→95 · wrapper 9.721→9.722 ·
8 files, 673 insertions · 0 lines to `odd-one-out-core.js` + `lcs-shell.*`

⚠⚠⚠ **PICTURE DECK: OPEN EVERY IMAGE. THREE OF THREE I OPENED WERE NOT WHAT THE FILENAME SAID.**
`christmas/tree` = a fully DECORATED Christmas tree (star, baubles, snow, a wrapped present) filed as
the **plant** exemplar beside a rose and a leaf — the visual outlier of the three, so a child tapping
it was marked wrong. LIVE in 7 locales. `tree/oak` = a generic broadleaf, not an oak. ⭐ And the panel
found **`fruits/plum` IS A RED APPLE** — fatal beside a live `äpple`.
⭐ Repaired in **14 items across 7 pools with ZERO translations**: repoint to `tree/oak` and give EN
an explicit `label:"tree"`; the six L10n pools already say Baum/arbre/árbol/árvore/albero/boom.

⭐⭐⭐ **`.lcs-instruction` IS VISIBLE BODY TEXT, NOT AN A11Y LABEL** — I recorded it wrongly for three
builds. `lcs-shell.js:461` writes a `<p class="lcs-instruction">`, styled at `lcs-shell.css:152`,
hidden ONLY in embed mode (`:261`). **The literal word "instruction" sits under the H1 on live
standalone pages in every locale, for the 33 activities that still lack the key.**

⭐⭐ **`robin` renders as the generic word for "bird" in SIX locales** (Vogel/oiseau/pájaro/pássaro/
uccello/vogel) in a round whose category IS bird — the tile literally reads "bird" beside a duck and
an owl. Solvable by reading one word. sv uses `rödhake`.

⭐⭐⭐ **A CUE I BUILT AND HAD TO CORRECT AGAINST MYSELF.** "The outsider is the only tile from its
theme folder" read 62.5% shipped but **75% on the better new deck** — it would have FAILED it.
Diagnosed: that number is 100% exactly when a round is CROSS-superordinate and 0% when WITHIN one, so
**it is the category arriving by another name, not a shortcut.** The real cue is the INVERSE — a
**MEMBER** alone in its folder, so the art points at the wrong tile: **shipped 62.5% · sv 12.5%**
(a bee from `farm animals` beside an ant from `forest creatures` and a butterfly from `easter`).

⚠⚠ **MY REBUILD HYPOTHESIS WAS RIGHT AND ALREADY SPENT** — Swedish category boundaries do differ
(a kanot is not a `fordon`; a kälke is), but the shipped `olive-kind-of` already ships that exact
round (`slade-fordon`). ⭐ The replacement is STRUCTURAL: **odd-one-out can contrast INSIDE one
superordinate and a naming task cannot** — four animals split skog/gård, four fruits ask which is not
a **bär** (*frukt och bär* are coordinate in Swedish, subordinate in English).

⚠ **GATE HOLES, fifth consecutive engine:** en-only pool; ⭐ **length bots measured `it.noun`, the
ENGLISH FILENAME, not the rendered `label`** — the tell was an IDENTICAL 12.5/25.0 in all seven
locales; ⭐ **it never checked the pictures exist** (`:84` hides a broken one with `onerror`, so a
typo ships as a word over blank space); ⭐ **`facts.distinct` checks `noun` not `label`** and Swedish
has 61 labels shared by >1 image key (klocka = clock/watch/bell, bok = book/beech). ⚠ The gate
**CRASHED** on a 2-2 split (`items[-1]`) instead of reporting — a crash prints no reason.

⚠ Label form: bare indefinite singular, **lower-cased** (the vocab stores Title Case), **no en/ett** —
`byxor` is plural and takes none, so an article would itself become a visible feature.
⚠ «grupp» banned (counting word); «hör ihop» banned as a HEADLINE (it is `sage-root-garden`'s title).
⚠ Stored answer index was constant at 3 → scattered (positionBot 1.00 → 0.25).
Bots on sv labels: longest 9.4 · shortest 3.1 · first-letter 12.5 · member-decoy 12.5 · substring 28.1.
