# BUILD LOG — the games built so far, and what is next

NEXT: 001

**Build order** (the FINAL-REPORT's first twenty, then catalogue order 011-200 skipping any already built):
002 001 005 003 007 004 006 008 009 010 043 028 018 049 069 063 091 019 105 116 · then 011, 012, 013, 014, 015, 016, 017, 020, 021, 022 … 200 (skip built).

**How to read this file (for a new session):** the `NEXT:` line is the spec number to build when the operator says "build the next game". After a game ships, its entry is appended below and `NEXT:` moves to the next number in the order. Entries are the record the operator and the deploy step rely on; the hub (`node _tools/build-hub.js`) marks the NEXT game.

**Entry format**
```
## NNN — Title (`slug`) — built YYYY-MM-DD
- Spec → build: what the ensemble changed and why (pedagogy, mechanics, content, art)
- Art added to _lib/art.js: <entries>            Locale status: STRINGS 11/11 · LOCALE_DATA 11/11 (or n/a) · NSR flags: …
- Gates: check-build PASS · qa-game PASS (n items, 11 locales, targets ≥ 44) · critic PASS (rubric 14/14) · personal read 704+1024 · pedagogue sign-off
- Local links: http://localhost:8480/<slug>/index.html?lang=en … (11)
- Notes / follow-ups:
```

## Built games

## 002 — Number Nest (`numeral-nest`) — built 2026-09-06

- **Spec → build.** The pedagogue found 13 defects in the spec. The load-bearing ones: attempt 2 *showed the answer*, so F-46's three-rung ladder was built as two (the total numeral moves to attempt 3); the mirror `underline` was a verdict carrying no orientation information (BOTH numerals now have their bowl ringed — low on a 6, high on a 9 — and only the correct one drops onto a coral bar); misconception 3 had no distinct response (a far guess now ends in a *gather*, the set collapsing into the one numeral that stands for it); L1's fixed 60 px spacing made row width a perfect proxy for quantity, handing the child the very bias the game claims to defeat (spacing now varies over {48, 60, 72}); and praise + the hen's cluck now fire **only on a first try**, because with three tiles two wrong taps leave the answer by elimination and the celebration is the only thing that separates knowing from guessing. Pools 13 → 24 (8 per level) so a replay is not the same session and L3 cannot be exhausted; a missed quantity re-queues 3 items later with fresh distractors and a fresh layout; item 1 demonstrates itself once and fades (how a non-reader learns the task — and it puts the enacted count inside the loop for the child who never errs, since otherwise the game's best teaching only ever fires on failure); tapping the hen replays the count, free, once per item.
- **Content.** Title ruled **"Number Nest"** — *numeral* was the only word among the 200 titles a five-year-old would need explained; `CATALOGUE.md` row 002 was updated to match, because the hub reads its title from there. ⭐ The natural imperative title "Count the Eggs" yields Finnish *"Laske munat"* — `munat` is everyday slang for testicles, in a title a teacher reads aloud; moving the whole set to a noun phrase fixes it at source in all eleven and the egg word now appears in no string in any locale. Praise rotation cut to `well_done / you_did_it / keep_going`: `great_job` is literally "good work" in it/da/es/pt and `excellent` is report-card register in de/da/no/fi/sv. No `LOCALE_DATA` at all — nothing in this game varies by locale.
- **Art added to `_lib/art.js`:** `hen.idle`, `hen.think`, `hen.happy`, `hen.oops`, `egg`, `nest`, `nest.rim` — the first real entries in the library. Locale status: STRINGS 11/11 · LOCALE_DATA n/a · NSR flags on the sv/da/no/fi titles.
- **Gates:** check-build PASS · qa-game PASS (11 locales boot, never auto-starts, 7 distinct Start labels, a wrong answer on every item still reaches Finish at 400/704/1024, every target ≥ 44 px real) · probe PASS (5 assertions covering the states the gate structurally cannot reach) · unit tests 85/85 · personal read at 400/704/1024 · 0 lines to `game-core.js`/`theme.js`, and one word in `ui-strings.js` (the Italian fix below).
- **Local links:** `http://localhost:8480/numeral-nest/index.html?lang=en` and the same for de fr it es pt nl sv da no fi.

### What this build bought for the other 199

- ⭐⭐ **`ANIM.appear` — or any tween of raw `scale` — is WRONG for a `kind:"svg"` entry.** `preloadArt` rasterises at 2× and `drawArt` compensates with an object scale of 0.5, so an absolute `scale: 1` throws that compensation away and renders the art at DOUBLE size. Measured here: the eggs came out 96 px instead of 48 — a 21 px overlap on a 48 px pitch — **while every gate passed**. Wrap the art in a container and animate the container; a container's natural scale really is 1.
- ⭐⭐ **The qa-game session loop cannot answer a game that has an enacted hint.** It fires `correct()` 350 ms after `wrong()` while the correction holds the tiles disabled for 2.9–8.3 s, so the intent hits the disabled guard and evaporates and the session never finishes. The resolution is a deferred-intent queue in `LCS_TEST` that dispatches through the tile's own pointer handler: it removes the RACE, not the PATH, and §16 is preserved because no private set-state entry point exists anywhere in the file. Every game with an enacted correction needs this.
- ⭐⭐ **The gate cannot photograph the states a game exists for.** `shotWrong` latches on the *first* wrong answer, which is always an easy L1 item, so the mirror cue is never captured; and attempt 3 is unreachable with one wrong per item, so the show-me ring is never captured either. Without a per-game probe the visual critic grades a game whose two most important frames nobody has ever seen.
- ⭐ **`check-build` was reading a COMMENT, not code.** The BUILD-CONVENTIONS §1 skeleton — which every game is told to copy verbatim — carries the line "No vh units. No ResizeObserver.", and the NO-VH rule matched it: the canonical skeleton failed the canonical gate. Fixed by scanning comment-stripped source, poison-tested in both directions (real violations still fail; prose alone passes). That same skeleton was also missing `art.js`, which the gate REQUIRES and `preloadArt` throws without.
- ⭐ **`makeLanguagePicker` leaks a ScaleManager resize listener** (`game-core.js:702`). The ScaleManager is game-global, so every scene transition leaves a handler bound to pills the shutdown already destroyed, and the next viewport change — a child rotating a tablet — throws inside `setInteractive`. Worked around game-side by diffing the emitter's listener list and dropping only what the call added. **This is a real library bug and all 200 games have it.**
- ⭐ **A Phaser container has no `displayWidth`.** After wrapping the eggs, my own clearance check read 0 and reported "clear" — a vacuous pass on a measurement of nothing. Measure the inner image.
- ⚠ A non-square SVG entry MUST set `size === w`, or `drawArt` scales it by `64/w` and renders a postage stamp with **no error and no console warning** (poison-tested: the nest renders 64×27).

### Open, and honest about it

- **The visual critic graded an EARLIER state and has not re-run.** Its verdict was "the bones are right; the surface is not there", against a nest that read as a bathtub with the eggs stuck to its outside wall. That nest has since been redrawn a fourth time — warm straw instead of teal, a deep recessed cup, and a separate `nest.rim` entry drawn OVER the eggs so their bases tuck into the nest — the mirror cue completed so both bowls are ringed, and the hen's reaction proven by measurement. **None of that has been re-graded, and it should be before game 003 inherits the style.**
- Two of the critic's findings were refuted by measurement and are **not** defects: outline weights are 3.25 (hen) vs 3.00 (nest) logical px, not "5–6 vs 3" — it measured a 2× render and read anti-aliasing as stroke; and the hen *does* react — `henOops` holds for 750 ms, while the critic's frames were taken at 1400 ms. A capture at 420 ms is now in the probe so the pose is gradeable.
- Still open: the hen's near-white body on cream leans on its 3 px outline alone for separation; the language picker's globe glyph renders in `focus` blue (library chrome, all 200 games); and counts 3, 7 and 10 are not represented in the screenshot sweep.

