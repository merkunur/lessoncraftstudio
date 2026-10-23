# #86 — Lily's Ten Stones → THE SUNKEN STONES (1.OA.C.6, all 11 locales)

ORDER row 86 · id `ten-stones.add-sub-within-20.1-oa-c-6` (kept). Design: `designs/086-ten-stones.md`.

## Files and wiring
- **New files:** `mini tools/sunken-stones-core.js` (16 rounds "Adding and taking away", 10 "Adding"; leap / leapTo / undo / chooseStart / the water / the misses), `sunken-stones-activity.js`, `sunken-stones-activity.html` (loads `lcs-pictures.js` for the frog). CSS prefix `sk-`.
- **Picture:** `pets/frog`, a colour library picture. It was opened before use and **faces left**, so it is mirrored for leaps to the right.
- **Manifest:** the row stays in its own `ten-stones-activities.json` (already in MANIFEST_FILES).
  - `tool` is repointed, and `params` became a mirror of the core.
  - en/de/fr/es/pt/it/nl/sv slug, title and intro are frozen (sha1 `729bb29b…`, checked).
  - da/no/fi slug, title and intro are new, and were reviewed.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.827.
- **Legacy gates:** `verify-ten-stones-core.js` and `local-test-ten-stones.js` exit 0 with a pointer.
- **Sources:** scratchpad `sk-manifest.js`, `sk-meta.json`, `sk-prose.json`, `sk-dump.md` (the reviewer's text), `sk-fix1.js`, `sk-fr.js`, `sk-probe.js`, `sk-dbg.js`.

## The invention
**The pond is a number line from 0 to 20, and the stones past ten are under water until Lily stands on the golden Ten Stone.**
- **The number is a rope of beads.** The child pulls Lily back like a slingshot: one bead slides onto the spring for each stone of pull, and a dashed ring shows where she will land. Tapping a stone ahead does the same. Keyboard: ↑ / ↓ set the beads, Enter leaps.
- **The water enforces the stop at ten.** A leap across ten splashes and Lily stays put; this is never a miss. Landing on ten raises the far stones. A leap longer than the beads left is refused.
- **The equation strip writes each leap,** for example `8 + 2 = 10 · 10 + 4 = ?`, and the child types the stone where Lily is.
- **Choose-start rounds:** Lily waits on a lily pad and the two possible starts shine.
- **Bank rounds:** there is no rope. Leaps go up to 10 and must land exactly on 20; past 20 is the reeds. The child types the total leap.
- **Miss 1:** numerals count from ten toward Lily, stopping before her stone. **Miss 2:** her leaps appear as arcs with their lengths.

## Rulings this build made
- **Adding-level data:** 13 was the answer in 4 of 10 rounds. 8 + 5 became 9 + 7 (16), and the bank 7 + □ = 20 became 8 + □ = 20 (12). No answer now appears more than twice in either level.
- **Reviewer fixes:**
  - **P1:** "Ten and {r} more" used the last leap. It now uses Lily's distance from ten, so it stays true when the second part is made in several leaps.
  - **P2:** "count on" or "count back" now follows which side of ten Lily is on, not the operation.
  - **P3:** the task line "Stop on the Ten Stone first!" was impossible in the 4 rounds that never cross ten. It now reads "Going past ten? Stop on the Ten Stone first!" in all 11 languages.
  - **P4:** a one-leap bank round printed its own answer on the arc after a miss. Arc lengths now show only when there are two or more leaps.
  - **The bank's "too long" message:** a too-long bank leap said "not that many beads left", but bank rounds have no beads. It now has its own message, `nFar`.
  - **Prose:** it now says that "Every stone" is the easier setting (the numbers can be read off), and that a splash in the reeds means the leap was too long.
  - **Locale wording:**
    - pt "contas" meant both beads and sums, so the sums are now "operações";
    - it "dal 8" → "da {big}";
    - no "fjæra" (a feather) → "fjæren";
    - fi *rasti* (an X) → Tarkista;
    - the bridging-ten school terms are in de/nl/fi;
    - "shorter way" and "the other way" phrasing ×11.
  - **New metadata:** fi has the grade in its title. The no title keeps no grade: row 84 labels Grade 1 as "2. trinn", so "1. trinn" would contradict it.
- **Pull fix:** redrawing the pond during a pull silently dropped the pointer capture on Lily, so releasing did nothing. The drag is now followed on the window.
- **Lily stays inside the pond** at stones 0 and 20.
- **Not built:**
  - "Pond play" free play;
  - the 300 ms sliding window on phones, because the window is fixed per round and always holds ten, the starts and the end (gate-asserted).
- **Equivalent mutant noted:** "on/back by operation" cannot differ from "by side" in any legal game, so it is not mutated.

## Gates
| Gate | Result |
|---|---|
| verify-sunken-stones-core (own oracle: the design's tables; EVERY leap length from every start; EVERY way of emptying the rope enumerated — only paths through ten survive the water; past ten nothing is sunk; bank only on 20; rope/reeds/splash never misses; the tap path; typing Lily's stone or the start in a bank round is not the answer; plan runs + spacing + seed replay; the frog picture; the phone window) | 22,930 / 0 |
| mutate-sunken-stones | 18 / 18 killed, control survives |
| local-test-sunken-stones (11 locales; real slingshot pulls, stone taps, ↑/Enter, undo; every round of both levels at rest, finished, at miss 2 and solved, 320–1366) | 33,792 / 0 |
| visual-qa | 96 renders green |
| hierarchy | 518 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |
| variety (production, en) | 16 distinct, pass 2 reshuffled |
| live-verify-sunken-stones (11 pages 200; en/de/sv/fi × 1366/390, real pointer: a tap on 14 splashes, 10 lands on the Ten Stone, 14, the chain) | 75 / 0 (first run inside the Cloudflare window failed the embeds) |

## Open (page metadata — for the operator)
- **nl:** the title and intro name the frog **Ties**; the game calls her Lily.
- **fr:** the title and intro say *nénuphars* (water lilies); the game uses stones.
- **No-sign-up claims:** de "ohne Anmeldung", es "sin registro", it "senza registrazione".
- **es:** the title says 2.º de primaria, but the row is Grade 1.
- None of these were changed, because they are frozen metadata.
