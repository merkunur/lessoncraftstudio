# #84 — Find the Missing Part → THE TURNING DOMINO (1.OA.B.4, all 11 locales)

ORDER row 84 · id `numberbond.subtraction-unknown-addend.1-oa-b-4` (kept). Design: `designs/084-numberbond.md`.

## Files and wiring
- **New files:** `mini tools/turning-domino-core.js` (10 rounds within 20, 8 within 10; the five stances, the march test, the four facts), `turning-domino-activity.js`, `turning-domino-activity.html`. CSS prefix `td-`. No pictures: the domino is the apparatus.
- **Manifest:** the row stays in `number-bond-activities.json`, as at #79–#83. The design proposed its own json; the row is kept because a shared-engine row only needs its `tool` repointed.
  - `tool` is repointed, and `params` became a mirror of the core.
  - All 11 locales' slug, title and intro are frozen (sha1 `fa8fc13e…`, checked unchanged by the script). sv/da/no/fi already had metadata.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.825.
- **Legacy gate:** `local-test-number-bond.js` dropped this row, with a pointer comment. `verify-number-bond-core.js` still passes on the rows that remain.
- **Sources:** scratchpad `td-manifest.js`, `td-prose.json`, `td-dump.md` (the reviewer's text), `td-fix1.js`, `td-fix-prose.js`, `td-fr.js`, `td-probe.js`.

## The invention
**One domino is a whole fact family.** Its brass plate is the whole and its two halves are the parts.

**Stage 1 — find the missing number.**
- Each round opens the domino in the stance of one equation form. The equation strip always shows where the "?" is.
  - `a + ?` and `? + a`: one half lies face down on the holder.
  - `w − a = ?`: half a lies in the tray; the half on the holder is face down.
  - `w − ? = b`: the half in the tray is face down.
  - `? − a = b`: a felt lid covers the plate.
- The child sets the unknown with + / −; ghost rings appear on the face-down half.
- Check marches every dot onto the plate's places:
  - **part stances:** too few leaves empty places glowing amber; too many leaves dots hanging off the end;
  - **lid stance:** the number is the plate's size, so it works the other way round.

**Stage 2 — the four facts (fact house on).**
- **Turn** (round arrow, or the T key): the addition swaps and the plate stays the same.
- **Tap or drag a half:** it breaks off into the tray, and the subtraction is what is left on the holder. Tapping the tray half puts it back.
- Every new fact stamps into its window. A repeated fact flashes instead of counting twice.
- Four facts: the house glows and a mini domino goes onto the shelf.

**Settings:**
- Numbers: Within 10 / Within 20.
- Fact house: On / Off. With it off, the round ends once the half is found, and the task line drops "then make all four facts".

## Rulings this build made
- **The roof never tells the unknown.** The first render showed the full trio on the house roof from the first frame: the answer in every round, including 13 on the roof while the plate wore its lid. Until stage 1 is solved, the roof shows "?" where the hidden number sits. Found by reading the render.
- **The lid's second miss does not number the dots** (the same ruling as #83). The design numbered every dot 1…whole, and the last number would then be the answer. The dots are laid out in rows of ten, unnumbered. The part stances keep numbered EMPTY places; counting them is the real count.
- **Reviewer fixes, all 11 locales:**
  - **A1:** the prose stated only the part-stance rule. Under the lid it runs the other way, and "adding the two shown numbers never fits" is false there, because adding them is the right answer for `? − a = b`. Both points are now stated by stance.
  - **A2:** `hLid` asked "Do all the dots fit?", which answers "yes" when the plate is too big. It now asks "Does every dot have a place, and every place a dot?"
  - **A3:** "Writing the four facts" became "Building", because nothing is written.
  - **A4:** a new `tLineOff` for when the house is off.
  - **A5:** the second-miss prose now names the dots under the lid.
  - **A7:** "no points" read as "no dots" in six languages, so they now say no score: Punktwertung / puntaje / punteggio / pontuação / score / pisteytys.
- **Locale wording:**
  - en: "dots", not "pips" (US Grade 1);
  - nl: *bordje*, not *plaatje* (a plaatje is a picture);
  - sv / no / fi turn the domino with *snurra* / *drei* / *pyöräyttää*, so the half that flips over keeps *vända* / *snu* / *kääntyä*;
  - es / it / pt / fr / de no longer name a "casita / casetta / casinha / maison / Familie" that is never introduced;
  - de *Tauschaufgabe*.
- **Not built:**
  - the "Domino maker" free play (as at #82, the round advances);
  - tap-to-replay on the shelf, because a shelf of buttons would sit below the phone fold. The shelf is display only.
- **Added:** a stage-2 hint line telling the child to turn the domino or tap a half, then how to put a half back. Breaking a half off cannot be discovered from window icons alone.
- **Phones:** the roof is drawn at 110 px with 32-unit numerals (they were about 12 px), and the window facts are 16 px so "19 − 10 = 9" fits at 320.

## Gates
| Gate | Result |
|---|---|
| verify-turning-domino-core (own oracle: the design's round table re-solved; every stance; the march for every dial value; Check iff the answer; the four facts over the handlings; turned + left off = as lies + right off; balance rules; the old trios; plan adjacency + seed replay) | 13,858 / 0 |
| mutate-turning-domino | 18 / 18 killed, control survives |
| local-test-turning-domino (11 locales; real clicks, keys and a drag; every round of both levels at rest, at miss 2, at stage 2 and with the house full, 320–1366) | 23,650 / 0 |
| visual-qa | 60 renders green |
| hierarchy | 662 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |
| variety (production, en) | 10 distinct, pass 2 reshuffled |
| live-verify-turning-domino (11 pages 200; en/de/sv/fi × 1366/390, real pointer: 8 overflows by 3, 5 heals, turn + break + put back + turn fills the house) | 75 / 0 (first run inside the Cloudflare window failed the embeds) |

## Open (page metadata — for the operator)
- de intro "Online, ohne Anmeldung" is a no-sign-up claim.
- nl title and intro say "groep 4"; Grade 1 is usually groep 3.
- Neither was changed, because they are metadata.
