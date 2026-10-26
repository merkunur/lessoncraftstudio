# #127 — Tempo's Day Plan → THE EVENT TUNNEL (L.1.1.i; all 11 locales)

ORDER row 127 · id `tempo-day-plan.time-prepositions.l-1-1-i` (kept). Design: `designs/127-tempo-day-plan.md`.

## Files and wiring
- **Files (new):**
  - `mini tools/event-tunnel-core.js` (`EventTunnelCore`) holds the model:
    - every locale's events (each with its three phrase cards *before / during / after + the event*, the preposition marked) and its action sentences (with `{g}` where the phrase goes); levels 1–2 (the card already stands in front of, inside or past the tunnel), level 3 (place the card), level 4 (two tunnels, five stretches, three cards);
    - choosing a phrase, placing a card, picking and putting cards in level 4 (a stretch holds one card); the stretch the lantern lights; Check and its reasons; the hints, the glow and its stretch from miss 2;
    - the plan: a fresh order per pass, never three rounds in a row on the same stretch, the rack shuffled with the right phrase in each slot once per stretch.
    - DATA is written by a build script.
  - `event-tunnel-activity.js` draws the sentence strip (with the gap, the complete sentence, or level 4's three tagged sentences), the day road (a dawn-to-dusk sky band, the road lane, the stone tunnel with three windows and the event's library picture above it), the action card on its stretch, the library lantern (`camping/lantern`) that walks to the lit stretch, the phrase rack and the card shelf (CSS prefix `et-`, `apparatusClasses: ['et-art']`).
  - `event-tunnel-activity.html` loads core `?v=1` and activity `?v=1`.
  - The old `tempo-day-plan-activity.js` stays on disk, unreferenced by this row.
- **Manifest:** the row stays in `tempo-day-plan-activities.json`; `tool` → `event-tunnel-activity`; `params` = `{level: [1…4], stretches: [hide, show], rounds: {1–3: 9, 4: 3}}`; en, de, fr, es, pt, it, nl slug, title and intro frozen; **sv, da, no, fi authored new**.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.872.
- **Prose:** en–nl replaced; sv, da, no, fi added. Every quoted sentence is a finished sentence of that locale's rounds (gate-checked).
- **Strings:** 41 keys × 11.
- **Visual-QA driver:** `scripts/visual-qa-phases/tempo-day-plan.time-prepositions.l-1-1-i.js` (new): picked (nothing lit before Check) · missed (the lantern lights the wrong phrase's stretch, the hint) · resolved (the card glows in the lit stretch; Next 0.5 s later).
- **Sources** (scratchpad): `etn-src.js` → `etn-build.js`; `etn-strings.js` → `etn-apply.js`; `etn-prose.js`, `etn-manifest.js`, `etn-dump.js`, `etn-probe.js`, `etn-review-fix.js`.

## The invention
**An event is a tunnel on the day's road.** What you do on the road in front of it happens *before*, what you do inside it happens *during*, and what waits past the exit happens *after*; a lantern walks the road and lights the stretch your words mean, and inside the tunnel its little windows glow. *During* gets a length — the whole inside of the tunnel — which is exactly what the word means.

## The levels
1. **Where is it?** — the card stands on the road; pick the phrase (3 / 3 / 3).
2. **New days** — the same with new events.
3. **Put it on the road** — the sentence is complete; tap the stretch the card belongs on.
4. **Day plan** — two tunnels, five stretches, three cards; only *before T1*, *during T1*, *during T2* and *after T2* are ever written (after T1 and before T2 would each fit two stretches).

## Deviations from the design (each measured or ruled)
- **Every phrase card carries the whole phrase** (*before the run*, *vor dem Lauf*, *antes del viaje*, *juoksun aikana*), not the bare word: articles, case, contraction and the Finnish postposition order are then authored per event, never computed, and agreement is never a tell.
- **Tap, not drag**, for phrases, stretches and cards; in level 4 a card is picked, then a stretch.
- **On phones the level-4 shelf cards show only their shape tag** (circle, square, triangle) — the strip pairs each sentence with the same tag — so three text cards do not push Check below the fold.
- **The lit lantern stops at the tunnel mouth** (above the road), never on top of the card inside the tunnel (my own render read: it hid "We clap").
- **The meal picture:** the design's plate and my first pick (a pizza) both misread; the "thank you" round now uses the lunchbox event.

## Review
ONE native + Grade-1 pedagogy reviewer over all 11 locales (every event's phrase triple, every sentence each phrase makes, the level-3 and level-4 sentences, strings, prose, new metadata).
- **Every phrase triple was confirmed correct** (de dative / genitive, es del / de la, pt do / da, it del / della / dello, fi partitive / genitive + postposition).
- **Applied:** en *the snowstorm*, fr *la tempête de neige*, pt *a nevasca* (*during the snow* is not idiomatic); the map that is also a "card" — de *Wanderkarte*, fr *une gourde*, nl *een drinkfles*, da *et landkort*, and (close to *kort / kortti*) no *en drikkeflaske*, fi *juomapullon*; nl *We ruimen de tafel af* (*dankjewel voor het eten* is true with *voor* — thank you FOR the food); es *farol* (in Mexico a *linterna* is a flashlight); it *il bagno* (not the toddler *bagnetto*) and *cartellino* (a *scheda* is a worksheet); de instruction wording; da *missGlow*, *Vi binder snørebånd*; no *tar på oss*, *har på oss*, *rydder opp*; fi *missLitD*; the meal picture (above).
- **Kept, with reason:** it *la nanna* for bedtime (the reviewer called it low severity; the alternatives break the event-noun pattern); es-MX *Comprobar* (standing rule).
- **Open (frozen metadata, not edited):** the en intro and the de / fr / es / pt / it / nl titles and intros describe the retired chip quiz (tap a word for a sentence).

## Gates
- **`verify-event-tunnel-core.js`:** 65,290 checks, 0 fail, with its own tables: each locale's time words (and where they stand — fi *ennen* before the noun, *aikana / jälkeen* after it), the agreement of every phrase triple (the same event noun; es del ↔ el, pt do ↔ o, it del ↔ il, de dative / genitive, fi one genitive), the stretch → place table and level 4's allowed stretches. It covers every sentence (capital, end mark, no stray spaces), the card text, exactly one phrase passing in levels 1–2 and one stretch in level 3, level 4 (a stretch holds one card, wrong cards come back, the right plan passes), hints and glow, 3 / 3 / 3 balance, the plan, the rack slot balance, the bot that picks the phrase under the card (≤ 3/9), always-during (3/9), pictures (exact case, colour), strings ×11, prose quotes, manifest.
- **`mutate-event-tunnel.js`:** 17 of 17 killed, control survived.
- **`local-test-event-tunnel.js`:** real pointer, 11 locales, 320–1366, pictures served case-exactly. The scenarios: the settings; level 1 (empty Check, the lantern tapped in free play, a wrong phrase lights its stretch, miss 2 glows the card's stretch and the right phrase, the gap tapped, the right phrase solved with the card glowing in the lit stretch); level 3 (a wrong stretch, the right one); level 4 (empty Check, wrong stretches come back, the right plan); "show the three stretches". Then every round of every level at rest / miss 2 / solved, resized through 320–1366. **36,509 pass, 0 fail.** Its first runs found: level-4 stretches under 44 px at 320, the lit lantern swallowing the tap on the right stretch (it no longer takes taps once it stands), and level 4 pushing Check below the fold at 320 (tag-only shelf cards).
- **`visual-qa-activity`:** PASSED, 216 renders. **`audit-activity-hierarchy`:** 272 / 0. **`audit-settings-efficacy`:** "level" and "stretches" both change the board. **`audit-activity-next-delay`:** pass. Content ×11, prose claims, SERP copy, content tells, route preflight: pass.

## Live
`live-verify-event-tunnel.js` on production, 2026-10-26: **52 pass, 0 fail.** All 11 pages return 200; en, de, sv and fi at 1366 and 390 embed event-tunnel-activity.html at wrapper 9.872; with a real pointer, a wrong phrase lights its own stretch with the hint, and the right phrase solves the round with the card glowing in the lit tunnel and the success line; the iframe grows with the card. The first two runs timed out waiting for the sv and fi iframes (new pages for this row, fresh from the cache window) although the pages already embedded it; the third run was clean.
