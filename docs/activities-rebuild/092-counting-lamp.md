# #92 — Whistle Valley Track Repair → THE COUNTING LAMP (1.NBT.A.1, all 11 locales)

ORDER row 92 · id `track-repair.count-to-120.1-nbt-a-1` (kept). Design: `designs/092-track-repair.md`.

## Files and wiring
- **New files:**
  - `mini tools/counting-lamp-core.js`: the three tracks' round tables, the lamp run (the first plate the lamp disagrees with), hops, the open rail with ε, mileposts, the keypad, the plan, the tray.
  - `counting-lamp-activity.js`
  - `counting-lamp-activity.html`, which loads `lcs-pictures.js`.
  - CSS prefix `lm-`.
- **Engine:** the library picture vehicles/train (a steam engine facing right, no printed text). It is mirrored only for count-back hops, and its headlamp is drawn apparatus.
- **Manifest:**
  - The row stays in `track-repair-activities.json`. `tool` is repointed, and `params` mirrors the core.
  - en..nl slug, title and intro are frozen (sha1 `8d526f5e…`, checked).
  - sv/da/no/fi are new: Visseldalen / Fløjtedalen / Fløytedalen / Pillilaakso.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.833. The existing grade and strand overrides are kept.
- **Legacy gates step aside:** `verify-track-repair-core.js` and `local-test-track-repair.js` exit 0 with a pointer while the row runs the Counting Lamp.
- **Sources:** scratchpad `lm-manifest.js`, `lm-meta.json`, `lm-strings.json` + `lm-apply-strings.js`, `lm-prose.json`, `lm-dump.md` (the reviewer's text), `lm-fix1.js`, `lm-fr.js`, `lm-probe.js`.

## The invention
**The engine checks the repaired track by counting on from the station with its headlamp.** The lamp lights each tie's true number as the engine rolls, and the engine stops at the first plate the lamp disagrees with. That plate turns coral, with the lamp's number on a tag above it.
- **Hops:** one numbered puff per hop, so counting the start tie as "one" shows at once. The engine stops on the tie it really reaches.
- **Mileposts:** each jump shows its own size (+10, −2 …), so the plate that breaks the step has a jump of a different size.
- **The open rail:** faint ties are laid one per step from the station.
- **Choosing, not only filling:** one or two plates on the trolley belong nowhere on the stretch, so the child has to choose as well as fill.

## Rulings this build made
- **"To 50" really stays inside 50.** The design's "to 50" lists still held numbers above 50 (H1 46–56, H6 60–70, S6 50–60, M2 40–90, M4 90–40). They were rebuilt within 50, keeping each STOP / target tie position (H1 16–26, H6 30–40, S6 5–15, M2 20…45 +5, M4 30…20 −2). The S4 distractor 54 became 36.
- **Reviewer (MUST), "to 120" really stays inside 120.** The design's G3 big-step mileposts (25…150, 100…350, 300…800) are replaced by 60…110 +10, 70…95 +5 and 118…108 −2. A setting called "to 120" may not show 800, and 1.NBT.A.1 is counting to 120. **G3-326/327/329 big steps are therefore NOT covered here**; they belong to a later activity.
- **Reviewer (MUST), no 0:** the 0–10 stretch became 1–11, with plates 4 and 8 and distractor 13 (the never-0 rule).
- **Reviewer (MUST), no tie that does not exist:** miss 2 on a distractor said "Find the tie that says 12". It now says **hintNowhere**: "No tie here says {n}. Leave that plate on the trolley."
- **The flag is "the red flag":** no word is drawn on the apparatus, so the prompt does not name a STOP sign the child cannot see.
- **The prompt says how many plates do not belong** ("One plate / two plates do not belong"). The choice is part of the task, and the empty-Check hint asks only for the plates that belong.
- **The tray** is never in numeric order with 3+ plates. Two plates may come in either order (forcing one order would put the distractor in a fixed slot).
- **The plan:**
  - neighbouring rounds never share a right tie or a STOP tie (hops, ties);
  - mileposts are exempt, because the design rows mostly blank posts 2 and 4 and the rule is unsatisfiable there (the seed-replay check caught the old version handing back the previous order).
- **Phones:**
  - plates sit in two staggered rows, every seat is ≥ 44 px, and a 52 px open-rail plate drops to a second row when it would overlap its neighbour or a station;
  - the keypad (2 × 6) takes the trolley's place while it is open, so every round stays above the fold down to 320 × 640.
- **The full sweep found what the narrow runs could not:** at 360 a station plate held inside the card reached tie 2 in its row (seat width now from the no-overlap condition, phone pad 19), and the resize watcher ignored the 8 px card change 768 → 1024 (now any change ≥ 2 px).
- **Free play after success (rolling the engine along) is not built**, as at #86–#91.
- **Reviewer SHOULD fixes, applied:**
  - "Find the jump" (en/de/sv/no);
  - howToPlay "watch the engine count on" (the hop engine starts at the start tie, not a station);
  - sv one plural *sliprar*, *spår*, "Talen ökar";
  - no "på plass", "Tallene øker", "tierovergang";
  - da "på plads", "lyse sveller", »en«;
  - fi "Luvut kasvavat {s} kerrallaan", *etuvalo*, "kymmenylityksen";
  - es "en el {a}";
  - it "Binario da {a} a {b}" (no dal/all' elision), "sul numero {a}";
  - de "auf eine Schwelle", "{s} groß".

## Gates
| Gate | Result |
|---|---|
| verify-counting-lamp-core (details below) | 10,631 / 0 |
| mutate-counting-lamp | 19 / 19 killed, control survives |
| local-test-counting-lamp (details below) | 63,217 / 0 |
| visual-qa | 60 renders green |
| hierarchy | 242 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |

**What verify-counting-lamp-core checks**, against its own oracle (the design tables as text, with the rulings above, solved here):
- **Hops:** a ± k, the STOP tie never the centre or the start, 4 left / 4 right per range.
- **Every flag** on every tie.
- **Ties:** every target on one blank tie, the distractor on none; EVERY plate on EVERY tie, with the lamp's first-wrong stop and the ties it counted.
- **The arrow tie:** typed, with no leading 0 and at most 3 digits (1007 reads 100).
- **The open rail:** every target at 39 positions against ε, and the distractor wrong anywhere.
- **Mileposts:** one step, two printed neighbours, the distractors break it, every plate on every blank, and each jump's own size.
- **The hints**, including hintNowhere.
- **The plan:** never the previous pass, a real reshuffle, the seed replay.
- **The tray.**
- **The engine** is vehicles/train.

**What local-test-counting-lamp covers:**
- 11 locales with REAL drags and taps:
  - spots: hintEmpty → 8 dragged to the wrong tie → the lamp stops (tag 9) → dragged to tie 7 → okTies;
  - the arrow tie: keypad 2, 3 → hintFromNearest 20 → ⌫ 2 → okName;
  - hops: hintFlag → tie 51 → three puffs, hintHop → the flag dragged to 50 → okHop;
  - mileposts: 85 → a coral jump → 80 → okUp;
  - open rail: 20 tapped onto the middle, 15 dragged near 12 → stop → → moves it one faint tie at a time → okOpen.
- Every round of both ranges at rest, at miss 2 and solved, reached ONCE by real clicks, then resized 320–1366: fold, ≥ 44 px, no overlapping seats, the engine ≥ 96 / 64 px.
- Poison: phone seats at 40 px fail 32× at 320 and 0× at 1366.

## Open (page metadata — for the operator)
- **en intro:** "drag numbered ties": the child now moves plates onto ties, plants a flag and types.
- **de:** slug/title/intro "bis 100", "Klasse 2", "Leg die Schwellen". The game goes to 120 and is Grade 1.
- **nl:** "tot 100", "groep 4", "bielzen" (the UI says *dwarsliggers*), "sprongen van 5 en 10".
- **es:** "hasta 100", "ordena los números" (no ordering task), "sin registro".
- **it:** "fino a 100", "da 0 a 100", "Classe seconda", "tocca una traversina e la colloca", "senza registrazione".
- **pt:** "até 100", "dormente numerado".
- **fr:** "jusqu'à 100", "pose la traverse".
- None of these were changed, because they are frozen metadata.
