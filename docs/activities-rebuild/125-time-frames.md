# #125 — The Clock Tower → PHOTO, WINDOW, ENVELOPE (L.1.1.e; all 11 locales)

ORDER row 125 · id `tense.past-present-future.l-1-1-e` (kept). Design: `designs/125-tense.md`.

## Files and wiring
- **Files (new):**
  - `mini tools/time-frames-core.js` (`TimeFramesCore`) holds the model:
    - every locale's levels of nine rounds: pick rounds (the sentence with its time word and gap, the three verb forms, the card withheld), time rounds (the verb printed, the time-word gap), pair rounds, find rounds (the sentence with its verb, the base form);
    - the frame each tense develops into and which opening takes which frame; dropping, sending back and developing a card; pairing photos and windows; tapping a word, typing the base form; Check and its reasons (album / post / window; pair; not the verb; spelling); the hints, the glow from miss 2;
    - the plan: a fresh order per pass, never three rounds in a row with the same time, the right card in every tray slot about equally.
    - DATA is written by a build script.
  - `time-frames-activity.js` draws the sentence card (the subject's library picture, two overlapped for a plural), the time word (bold ink, tap → its opening glows), the gap with the card and a develop button, the tray of paper cards, the clock tower's front with the album sleeve, the window and the post slot, the developed frame filing in or bumping, the level-4 windows and photos, the level-5/6 word buttons and base-form window (CSS prefix `vt-`, `apparatusClasses: ['vt-art']`).
  - `time-frames-activity.html` loads core `?v=1` and activity `?v=1`.
  - The old tense activity files stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `tense-activities.json`; `tool` → `time-frames-activity`; `params` = `{level: [1…6], rounds: {1…6: 9}}`; en, de, fr, es, pt, it, nl, sv slug, title and intro frozen; **da, no, fi authored new**.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.870.
- **Prose:** en–sv replaced; da, no, fi added. Every quoted sentence is a finished sentence of that locale's rounds (gate-checked).
- **Strings:** 54 keys × 11.
- **Visual-QA driver:** `scripts/visual-qa-phases/tense.past-present-future.l-1-1-e.js` replaced (it drove the retired activity): picked (nothing graded before Check) · missed (the card bumps against its opening, the hint) · resolved (it files in; Next 0.5 s later).
- **Sources** (scratchpad): `vt-src.js` → `vt-build.js`; `vt-strings.json` → `vt-apply.js`; `vt-prose.js`, `vt-manifest.js`, `vt-dump.js`, `vt-probe.js`, `vt-setbot.js`.

## The invention
**Every verb form develops into its own kind of thing.** On Check the card in the gap develops: a past form becomes a still sepia photo, a present form a window where the picture keeps moving, a future form a sealed envelope. It then goes to the clock-tower opening the time word names — the album, the windowsill or the post slot — and each opening only takes its own kind, so a wrong form visibly bumps instead of being marked wrong. Finnish has no future tense: its present develops into a window with a shutter that fits the window and the post slot.

## The levels
1. Yesterday · now · tomorrow — regular verbs.
2. Tricky verbs (went, ran, rode, was, had, did).
3. Read the verb, pick the time word.
4. Match the past: three base-form windows, three past-form photos.
5. Find the verb in a sentence; its base form develops.
6. Find the verb, then write its base form.

## Rules (each measured or ruled)
- **A future round never deals the present card** — the present also talks about tomorrow in ten of the eleven languages, so it is never offered as wrong. A level-3 present sentence is never offered the future time word.
- **sv / da / no:** *ska / skal* + infinitive also means "is about to", so a present round never deals the future card and a future sentence is never offered the present time word; every round then deals two cards. (Review finding.)
- **The card set never tells:** a time-word-blind bot that only reads WHICH cards are dealt wins 6 of 9 in every locale and level — the proven floor, given the first rule (the gate states the proof). The design's "longest card ≤ 4 of 9" was impossible under that rule and is replaced by this measured floor.
- **de / nl split futures** (*werden … streichen*, *zullen … verven*) fill two gaps.
- **fi:** singular subjects, two cards, the shutter window; level 3 offers *Eilen / Juuri nyt* only.
- **The present time word means in progress** (Right now, gerade, en ce moment, ahora mismo, neste momento, in questo momento, op dit moment, just nu, lige nu, akkurat nå, juuri nyt), never a bare *now*.
- **"Write it" became level 6** (a dead setting otherwise).

## Review
ONE native + Grade-1 grammar reviewer over all 11 locales (every round, every tray, the strings, the prose).
- **Applied:**
  - sv / da / no *ska / skal* two-right-answer risk → the modal rule above.
  - de and nl: *Zeitwort* / *tijdwoord* are old names for the VERB → *Signalwort* / *signaalwoord* everywhere.
  - fr *mot du temps* → *indicateur de temps*.
  - en *the frogs will do a big jump* → *will swim far*; en t3 *When did it happen?* → *When does it happen?*
  - de *Die Enten sind gerade hungrig* → *haben gerade Hunger*.
  - es *estuvo mojado* → *estaba*; *pícnic* → *día de campo*; *hueco* → *espacio*; prose *programas de estudio de la SEP*.
  - pt present rounds → *estão + gerúndio* (BR in-progress), level 3 too; *carta* → *cartão* in the card strings.
  - it *hanno saltato nello stagno* → *sono saltate*; *carta* → *scheda*.
  - sv prose *ett brevinkast*.
  - fi *[Nyt]* → *[Juuri nyt]* in levels 1–2; *kirjoita sama sana*.
- **Found by my own gates, not the review:** the card-set tell (every {past, future} tray was a future round) → one withheld-card table per level; fr level-4 pairs matchable by first letter (21/27) → same-initial trios; a fi past/present tie on length.
- **Kept, with reason:** es-MX *Comprobar* (standing rule; the review suggested *Revisar*).
- **Open (frozen metadata, not edited):** the de / es / pt / it / nl / sv titles and intros name grade 2 (Klasse 2, 2.º, 2º ano, classe seconda, groep 4, åk 2) for a grade-1 standard and some describe the retired activity (pt *toque o verbo*, it *pettirosso … tre finestre*, nl *elke klok*).

## Gates
- **`verify-time-frames-core.js`:** 9,834 checks, 0 fail, with its own tables: time → opening, tense → frame and the fits matrix; each locale's future marker and in-progress present word; its own lemma table for levels 5–6. It covers exactly one fitting card in every pick and time round; no future round with the present card, no present sentence with the future word, the sv/da/no modal rule; en present cards progressive; fi two cards and singular subjects; 3/3/3 balance, tray-slot balance, the plan; the card-set bot at its floor, no {present, future} tray, the two-card count; the always-will / always-ed bots; level-4 pairs and the first-letter bot; the model (drop, back, develop, Check reasons, hints, glow, pairs, find, write); pictures (exact case, colour themes); strings ×11; prose quotes; manifest.
- **`mutate-time-frames.js`:** 24 of 24 killed, control survived. Its first run had one survivor — the withheld card dealt anyway — now gated by the two-card count.
- **`local-test-time-frames.js`:** real pointer and keyboard, 11 locales, 320–1366.
  - The scenarios: the settings; level 1 the task line, an empty gap (no miss), the time word tapped (its opening glows), a wrong card developed (it peeks, no miss), Check (it bumps against the opening, that opening's hint), miss 2 (the right card glows), the gap tapped (the card comes back), the right card (it files in, the success line); a split future (both gaps); level 3 a wrong and the right time word; level 4 wrong photos come off, the right ones lock; level 5 another word (its hint), the verb (its base form); level 6 the verb, a misspelling, the base form typed.
  - Then every round of every level at rest / miss 2 / solved, resized through 320–1366.
  - Its first runs found: frames wider than their openings at 320, a short Swedish time word under 44 px, long French and Italian futures cut off on narrow cards (cards now size to their words).
- **`visual-qa-activity`:** PASSED, 216 renders (its first run: Next below the fold after a solve at 320 → the solved layout is tighter there). **`audit-activity-hierarchy`:** 272 / 0. **`audit-settings-efficacy`:** "level" changes the board. **`audit-activity-next-delay`:** pass. Content ×11, prose claims, SERP copy, content tells, route preflight: pass.

## Live
`live-verify-time-frames.js` on production, 2026-10-26: **52 pass, 0 fail.** All 11 pages return 200; en, de, sv and fi at 1366 and 390 embed time-frames-activity.html at wrapper 9.870; with a real pointer, a wrong card bumps against the album with its hint, and the right card files into the album as a photo with the success line; the iframe grows with the card. The first run fell inside the Cloudflare window (sv and fi still served the old iframe); the rerun once they refreshed was clean. The deploy's one smoke failure was a transient edge 502 on a seller-era 410 check (rechecked: 410).
