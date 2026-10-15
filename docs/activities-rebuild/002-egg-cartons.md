# 002 — Count by tens (K.CC.A.1) — Posy's Egg Cartons, the Ten-Shelf

Replaces `posy-egg-cartons.count-tens.k-cc-a-1` (a drawn hen, three drawn cartons, three answer cards with two foils; 7 locales). Same manifest id; en/de/fr/es/pt/it/nl slugs, page titles and intros frozen; **sv/da/no/fi added** (the second-batch gap this row had). New tool `egg-cartons-activity`, own core `egg-cartons-core.js`.

## The four questions

1. **Would a 5–8-year-old choose it again?** Every carton is a thing to tap; each tap drops a running-total tag (10, 20, 30…) with a rising note; in the pack rounds the child builds the shelf carton by carton and watches the tens climb; the whole shelf hops when the answer lands. Two round kinds (read a shelf / pack a shelf) keep it from being one trick.
2. **Would a teacher put it on the board?** K.CC.A.1 is counting to 100 by tens. The material enacts it: a carton IS ten (a lidded two-by-five tray of eggs, the ten-frame in egg form), and the tag a carton receives is the RUNNING TOTAL, not "10" — the fourth carton says 40. The by-ones slip gets its own hint in the form the rail can show (tapping 10 — one carton's stamp — for a shelf of several; reviewer finding 2026-10-16); "one carton too far" is caught by the rail. Pack rounds are the production half ("pack 70 eggs"): the child must stop when the last carton says 70. No timer, no score.
3. **Would a parent trust it?** Nothing drawn by hand: the carton is apparatus geometry (a tray and ten egg-shaped cells, the shell palette), no mascot. Numerals are the only words on the apparatus; works at 320 px; legible with the sound off.
4. **Is it creative?** The invention: **each carton wears its running total — counting by tens is reading the last carton.** The pack rounds turn the same shelf around: build until the last carton says the number.

## Apparatus

- **The shelf** (`.ec-mat`): a cream mat with a teal edge; cartons in rows of five (five per row makes 50 and 100 visible), four per row on a phone.
- **A carton** (`.ec-carton`): SVG tray, two rows of five egg cells, a small "10" stamp on the lid; tapping it drops a coral tag with the running total (`.ec-tag`); a second tap wobbles. In pack rounds cartons arrive from the **crate** (`.ec-add`, a 44 px+ button drawn as a carton with a plus) and tapping a shelf carton takes the last one off.
- **The rail** (`.ec-rail`): 10, 20 … 100 (or … 50) under the shelf in count rounds; the child taps the total.
- **Feedback**: the shell bubble. Count rounds: untagged → "Some cartons are not counted yet" (they pulse); no numeral → "All counted! Tap how many eggs"; by-ones slip → "Each carton is ten eggs"; wrong → "The last carton tells how many eggs" (last tag glows, only as the remedy). Pack rounds: short → "Not yet — keep adding: 10, 20, 30…", over → "Too many. Take one off", ok → "Yes — 70 eggs in 7 cartons!"
- Settings drawer: Numbers (to 50 / to 100), Rounds (both / count the shelf / pack the shelf). Free.
- One free move in count rounds: *Count again* (clears the tags).

## Rounds

Count rounds for 2…10 cartons (9) + pack rounds for 20…100 (9) = 18, order-only reshuffle per pass; "to 50" halves both. One right answer per round; the rail is fixed 10…100 (position = value).

## Layout

Stacked. Carton width from the mat: 5 columns at ≥ 520 px (≈ 118 px at the live width), 4 columns below (≥ 66 px wide, ≥ 44 px tall — the carton is the tap target). Rail: one row at ≥ 10 × 44 + 36 px, else two rows (10–50 / 60–100). No `vh`.

## Strings (×11; sv/da/no/fi authored now, one reviewer for all 11)

title · instruction · promptCount · promptPack ("Pack {n} eggs. Add cartons of ten.") · matLabel · railLabel · addCarton · again · hintUntagged · hintNoAnswer · hintOnes · hintWrong · hintShort · hintOver · celebrateCount ("Yes — {n} eggs!") · celebratePack ("Yes — {n} eggs in {k} cartons!") · counted/notCounted (sr) · cartonSr · setRange + 2 · setKind + 3. Nouns are fixed plurals after a number ≥ 20 (fi partitive singular "munaa"), never inserted from vocabulary.

## Refuse-list

No answer cards with foils (the rail is the number line). No "10" tags — tags are running totals. No mascot. No countdown.

## Gates

`verify-egg-cartons-core.js` (own oracle: tags = 10·k, verdicts incl. the by-ones slip, pack short/over/ok, layout rows/columns/floors, pools per setting) · `mutate-egg-cartons.js` · `local-test-egg-cartons.js` (real pointer, every round, 11 locales, 7 widths, both round kinds, the resize broadcast) · `visual-qa-activity.js` · `audit-activity-hierarchy.js` · `preflight-activity-routes.js` · preview · one reviewer · `live-verify-egg-cartons.js`.
