# #101 — Sprocket's Clock (to the half-hour) → THE HOUR ROAD (1.MD.B.3, all 11 locales)

ORDER row 101 · id `clock-digital.read-half-hour.1-md-b-3` (kept). Design: `designs/101-clock-digital.md`.

## Files and wiring
- **New files:**
  - `mini tools/hour-road-core.js`: the round tables, the road position t = 2·(h mod 12) + m/30, the hand angles, the landing of a card (wrap-aware, in half-segments) and its error kind, the card order (a bag of places), choose / Check / hint, free play (snap, timeAt) and the plan.
  - `hour-road-activity.js` (the clock, the road and its roll, the marker, the cards; CSS prefix `hr-`)
  - `hour-road-activity.html`
- **Manifest:**
  - The row left `clock-digital-activities.json` (its other five rows stay, only this row's lines removed) for its own `hour-road-activities.json`, registered in `frontend/lib/activities.ts` `MANIFEST_FILES`.
  - Metadata is frozen in the 8 shipped locales (sha1 `d710f2ad`, checked).
  - da / no / fi slug, title and intro are new, as the design says: da *laes-uret-hele-og-halve-timer-1-klasse*, no *les-klokka-hele-og-halve-timer-1-trinn*, fi *lue-kello-tasa-ja-puolitunnit-1-luokka*.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.843. The existing grade and strand overrides for this id are unchanged.
- **Legacy gates:** `verify-clock-digital-core.js` reads its manifest generically and still passes on the five remaining rows.
- **Picture:** Sprocket is `farm animals/rooster` (opened; 96 px wide, 64 px on phones, never shrunk), perched on the clock's right shoulder, clear of every numeral (gated). Names as shipped: Sprocket, nl Kukel, sv Tore; da / no / fi Sprocket.
- **Sources** (scratchpad): `hr-strings.json` + `hr-times.js` → `hr-times.json` + `hr-apply.js`, `hr-manifest.js`, `hr-prose.json`, `hr-dump.txt` (the reviewer's text), `hr-review-fix.js`, `hr-probe.js`.

## The invention
**The clock's rim, unrolled into a road.** Thirteen posts (12, 1, … 11, 12) with a half stone between every two lie under the clock.
- The child reads both hands and taps one of three digital cards. On Check, Sprocket's marker (a drawn coral token with a comb) walks to that time's spot on the road; the road rolls back up into a ring of its own length (R = L/2π) round the dial, post k on numeral k's ray; the marker slides along its ray to the short hand's tip.
- Right: it lands exactly on the tip, which glows, Sprocket hops, and the clock runs half an hour (half a lap of the long hand, half a step of the short hand and the marker); then the road unrolls.
- Wrong: the road stays rolled and a dashed coral arc joins the marker to the tip — half a step (the long-hand error, or half past the hour before) or a whole step (the next-number error); the long hand glows when its minutes were the mistake. Miss 2: the marker walks round the ring from the 12 to the tip while the long hand turns a lap per post.
- After success the marker can be dragged along the road (or moved with the arrow keys); the hands follow and a readout shows h:mm.

## Rounds
| Face | Rounds |
|---|---|
| O'clock and half past | R1–R10 (the nine old targets + 12:30): 6 half past, 4 o'clock; cards = right · same hour other minutes · the half hour on the other side (next hour for half past, hour before for o'clock) |
| Half past only | H1–H9, every target half past (the next-number error in every round) |

- Card places come from a bag of the three places refilled every three showings: each place exactly a third, never three rounds running in one place (gated over 300 showings: 30–37 % each; the next-hour card right of the right card 40–60 %).
- The plan is an order-only reshuffle that never repeats the previous pass; the mixed level never runs three o'clocks or three half-pasts.

## Deviations from the design (each measured or reviewed)
- **Order on the page:** clock → road → cards → Check (the design put the cards between clock and road; the road directly under the clock keeps the roll short and keeps it off the cards).
- **The roll in between** is a straight blend from each road spot to its ring spot, so the moving road never sweeps over the cards; the END states are exact (ring circumference = road length, posts on their numerals' rays — measured by the gate). An arc-length-preserving curl dipped below the road on phones.
- **No ghost card at miss 2** and no hour in any hint (the rule: a hint never gives the answer); the hints speak about the hands only, so the "halb vier" languages are never contradicted.
- **The celebration writes the time as the cards do (h:mm)** in every locale (review: the same digits on the card and in the praise line).
- **Sprocket perches on the right shoulder** (feet on the rim 55° from the 12), not centred on top: the 00 collar sits at the 12, and the perch costs the least height.
- **No TTS speaker corner** on the cards.
- **Hand lengths:** the long hand is 62 % of the radius and the short hand 46 % (the design said 88 % / 55 %). At 88 % the long hand ran across the numeral it points at — it split the 12 and covered the 6, the very number the child must read — and the 5-minute ticks touched the 3 and the 9 ("−9"). Numerals now sit at 76 % (26 px wide), and the local test measures ≥ 3 px from every numeral's digits to the long hand's tip and to the tick ends on and beside its ray (poison-tested: a long hand at 85 % and numerals at 82 % both fail it).

## Review
ONE native + pedagogy reviewer over the compact dump of all 11 locales: every o'clock and half-past phrase confirmed (incl. 1 and 12 and the next-hour half in de/nl/da/sv/no/fi). Applied: learning goal no longer claims the child writes the time; the celebration uses the cards' digits; fi marker label "Sprocketin"; the prose's "if the child chooses…"; en "halfway"; es "Horas en punto y medias horas / Solo medias horas"; fr "c'est la demie", "Seulement à la vérification"; it "Solo al controllo"; de "Lies beide Zeiger ab", "digitale Uhrzeit", "abgerollt"; nl tTask and hintNext; sv hintLong and two prose fixes; no intro "halve steiner"; and the spoken "halb vier / half vier / halv fire …" added as the reason for the next-hour error in the six languages that say it.

## Gates
- `verify-hour-road-core.js` — 5,234 checks: the tables typed literally with the gate's own positions and landings; exactly one card per round on the tip; every wrong card's distance and kind; the hands (:30 exactly half way); the roll measured from the drawn geometry at 288 / 328 / 648 px (ring = road length ± 1 px, posts on their rays < 1°, the moving road inside its stretch); card-place balance over 300 showings; the plan; Check / hint ladder; every next-hour half phrase; no hint with a number, a placeholder or a time phrase; strings.
- `mutate-hour-road.js` — 15 / 15 killed (core and activity), control survived.
- `local-test-hour-road.js` — 25,113 checks: real taps, drags and keys, 11 locales, every round of both levels at rest / miss 2 / solved through 320…1366.
- `visual-qa-activity` 60 / 60 · `audit-activity-hierarchy` 242 / 0 · `audit-settings-efficacy` 2 live · variety static scan ok · preflight-activity-routes, prose-claims, SERP copy, activity-content ×11 green.
- `live-verify-hour-road.js` on production: 67 / 0 (11 locale pages 200; en / de / sv / fi × 1366 / 390, real taps: 4:30 → a miss with the road rolled round the dial, 3:30 → the celebration; the iframe grows with the card).
