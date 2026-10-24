# #103 — Owl's Cuckoo Cottage → THE PULL-BACK KEY (1.MD.B.3, all 11 locales)

ORDER row 103 · id `clock-read.tell-time.1-md-b-3` (kept). Design: `designs/103-clock-read.md`.

## Files and wiring
- **New files** (named for the invention; the row stays in `clock-read-activities.json`, its only row):
  - `mini tools/pull-key-core.js`: Owl's day (events → library pictures), the 19 rounds (board / write / partners / set), the geared hand angles, the spring (wind back to the o'clock, stop, release), the pulled-out key (wind on by detent; drag five minutes and settle), the wheels, Check / error kinds / the hint ladder, Owl's bobs, the window's part of the day and the plan.
  - `pull-key-activity.js` (the cottage, the clock or the three partner clocks, the key, the answer area; CSS prefix `pk-`)
  - `pull-key-activity.html`
- **Manifest:**
  - The row's `tool` is now `pull-key-activity` and its `task_template` is `pull-key`.
  - Params: `times`, `mode` and `rounds` (11 / 12).
  - Metadata is frozen in the 7 shipped locales (sha1 `dde4e6f2`, checked).
  - sv / da / no / fi slug, title and intro are new: *las-och-stall-klockan-ak-1*, *laes-og-stil-uret-1-klasse*, *les-og-still-klokka-1-trinn*, *lue-ja-aseta-kello-1-luokka*.
  - `MANIFEST_FILES` is unchanged (the file was already registered).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.845.
- **Legacy gates:** `verify-clock-read-core.js` and `local-test-clock-read.js` step aside (they exit 0 while the row runs the Pull-Back Key).
- **Pictures** (all opened):
  - Owl is `forest creatures/owl`.
  - Events: pancake (breakfast), reading, puzzle, lunchbox (lunch), playground, muffin (snack), piano (music), pot (supper), bathtub, bed.
  - Names: Owl, Eulchen, Uiltje (nl; the old file said Sprocket), Uglen, Ugglan, Ugla, Tecolín, il Gufo, a Corujita, Chouette, Pöllö.
- **Sources** (scratchpad): `pk-build.js` → `pk-strings.json` + `pk-times.json`, `pk-apply.js`, `pk-manifest.js`, `pk-prose.json`, `pk-dump.js` → `pk-dump.md`, `pk-review-fix.js`, `pk-probe.js`.

## The invention
**A spring key that winds the clock back to the hour it is in.**
- **Read rounds:** drag the brass key anticlockwise (or press ◀). Both hands run back together, one click per five minutes. The key stops by itself when the long hand reaches the 12. At that moment the short hand stands on the hour the clock is in, and that numeral is ringed. Let go, and the clock whirrs forward to the real time; the ring stays.
- **Set rounds:** the key is pulled out (orange) and winds the clock ON from Owl's last activity to the target, one detent at a time. ◀ ▶ do the same, and a drag settles on the nearest detent.
- **Miss 1:** the spring rewinds the clock by itself and rings the hour (set rounds give their own hints instead).
- **Miss 2:** a bead lights on the rim at every five-minute mark from the 12 to the long hand, and the child counts them in fives.
- **Success:** the cuckoo door opens and Owl pops out with the event's picture. On the hour she bobs as many times as the hour; otherwise she bobs once. A row of dots lights one per bob, so the count reads with the sound off. The window turns to the event's part of the day. After that, free play: ◀ ▶ and the key move the clock five minutes at a time, and Owl pops out at every o'clock.

## Rounds
| Times | Rounds |
|---|---|
| O'clock and half past | R1–R11: board ×3, write ×3, partners ×3, set ×2. Owl's day runs from breakfast at 7:00 to bed at 8:30. Near-misses are the next hour at half past, the long hand read as the hour, and a neighbour hour. |
| With quarter hours | R1, R3, R4, R6 + Q1–Q8 (quarter past / quarter to in every type). |

- **Rounds "Read only":** set rounds become write rounds.
- **Plan:** an order-only reshuffle that never repeats the previous pass.

## Deviations from the design (each measured or ruled)
- **Files are named `pull-key-*`.** The design said to rewrite `clock-read-*`, but the old engine stays intact for history; the row's `tool` was repointed instead.
- **Hand colours follow row 102:** short hand orange, long hand green. The design had a teal short hand and an orange long one; the next activities read the same clock.
- **The key column sits beside the clock** (the design put it on the cottage's right wall). Partners rounds show three clocks with the key strip below them.
- **Bob dots sit in the key column** (two rows of six); in partners rounds they sit beside the strip. Under the door they would collide with Owl.
- **No hint names the hour, and the right card is not marked at miss 2.** The design's "this is the hour" ring stays, because it is produced by the child's own winding. The only number in a hint is "the 12", where the long hand stops (a cited gate exemption).
- **◀ in read rounds runs the full spring rewind,** not one detent. One press shows the whole move.
- **The ring appears as soon as the key reaches the o'clock.** The first build only rang it when the child tried to turn past; a child who stopped exactly at the hour saw nothing. The browser test caught it, together with a stale view object in the drag handler.
- **The window follows the event when the event belongs to one part of the day.** Bed at 8:30 and a bath at 7:45 are evening, never morning. The first build chose the sky from the hour alone and drew a morning sky over bedtime.
- **Hand lengths follow the face size:**
  - long / short 58 / 44 % on the cottage clock at r ≥ 130;
  - 55 / 42 % below r 130;
  - 46 / 34 % on the small partner faces.
  - Faces of r ≤ 60 keep only the 12 / 3 / 6 / 9 numerals (dots elsewhere).
  - Below r 130, numerals replace the hour ticks; minute ticks stay.
  - All measured: the round hand caps touched the wide numerals and the hour ring, and the hour ticks touched the numerals.
- **No count is printed at miss 2.** The design's "5 … 30" labels printed the minutes, which is the answer. They also crowded the numerals and sat on the long hand. The beads sit on the rim, clear of every numeral, and the child counts them.
- **An error class `neighbour`** (a neighbouring hour) is added to the core's error kinds.

## Review
ONE native + pedagogy reviewer over the compact dump. MUST findings:
- **The "set" wording** in es / it / pt / fr ("dar cuerda", "caricare", "dar corda", "remonter") means winding the mainspring, not setting the time. The new wording is to move or turn the hands, or to advance the clock.
- **de / da / sv / no / fi learning goal:** "read the hour the short hand has passed, not the next one" contradicted the language's own half-past idiom (halb acht = 7:30). It is reworded to "the hour that has begun — halb acht is 7:30" (nl too).
- **fr hint:** "remonte en arrière" contradicted itself.

SHOULD findings applied:
- every locale's hintBack now names the long hand on the 12 instead of "the top";
- de "gestellt" and the clock running forward;
- nl "doorgedraaid";
- da "have" and "kommer til 12";
- no "stilte";
- es "manecilla larga", "manecillas del reloj", "cerca de", "refrigerio";
- it "Round";
- pt "relógio de cuco" and BR phrasing;
- fr "horloge" and "demi-heures";
- fi "siivessään".

The fi illative for {to} was left as is (judged understandable; not authored blind).

## Gates
- `verify-pull-key-core.js` — 2,144 checks:
  - the tables typed literally with the gate's own geared hands;
  - one right answer per round;
  - every near-miss is the error class the table says;
  - the spring stops on the o'clock and never runs past it;
  - set detents per level;
  - the read-only conversion;
  - the hint ladder;
  - bobs and the event-led window;
  - no hint with a number or a time (one cited "12");
  - the plan.
- `mutate-pull-key.js` — 17 / 17 killed (core and activity), control survived.
- `local-test-pull-key.js` — 28,116 checks:
  - real drags round the key, taps, wheels, arrows and keys in 11 locales;
  - every round of both levels at rest, at miss 2 and solved, through 320…1366;
  - the hands drawn at the geared angles;
  - no hand cap, drawn tick or miss-2 bead within 2 px of a numeral;
  - the hour ring clear of the long hand's reach;
  - no count printed on the face;
  - Check above the fold at rest, and Check plus the hint in view at miss 2;
  - pictures at or above the floor.
- `visual-qa-activity` 66 / 66 · `audit-activity-hierarchy` 254 / 0 · `audit-settings-efficacy` 2 live.
- variety static scan ok · preflight-activity-routes, prose-claims, SERP copy, activity-content ×11 green.
- `live-verify-pull-key.js` on production: 67 / 0. All 11 locale pages return 200. In en / de / sv / fi at 1366 and 390, with a real pointer: ◀ winds the key back and the 8 is ringed; 7:30 gives a miss and the spring rewinds by itself (hintBack); 8:30 gives the celebration with Owl out and the evening window; the iframe grows with the card. The first run, inside the deploy window, saw no iframe; the rerun passed.
