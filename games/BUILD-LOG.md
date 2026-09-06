# BUILD LOG — the games built so far, and what is next

NEXT: 005

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

### ⭐⭐ The operator could not press Start — and the whole gate suite was blind to it

Reported after sign-off: **the Start button was unresponsive.** Root cause, measured:
`game-core.js` passed `Phaser.Geom.Rectangle.contains` to `setInteractive`. Phaser 3.90
exposes `Phaser.Geom.Rectangle.**Contains**` — capital C — and has no lowercase alias, so
the callback was `undefined`, `hitAreaCallback is not a function` threw on every pointer
move, and **no real tap reached anything in any of the 200 games**. The demo and every
future build had it too.

It survived every gate because **every gate pressed buttons with a synthetic
`emit("pointerdown"/"pointerup")` on the container**, which bypasses Phaser's hit-testing
entirely. `check-build` is static and cannot see it; `qa-game`'s SESSION loop drove a full
8-item session to Finish, at three widths, with the bug active. The suite proved the game's
LOGIC while never once proving the game could be TOUCHED.

Fixed in `_lib/game-core.js` (4 occurrences, with a rule note at the top so nobody
re-lowercases it), and a **POINTER check added to `_tools/qa-game.js`**: every interactive
object must carry a callable `hitAreaCallback`, and a **real `page.mouse.click`** on the
largest interactive target must enter Play. Poison-tested against the original lowercase
form: the new check fails while `SESSION` still passes, which is precisely the blindness.

**Standing rule for the remaining 199: a synthetic `emit()` is not a tap.** At least one
assertion per game must drive a real pointer, or a game can pass everything and be
unplayable.

### Open, and honest about it

- **The visual critic graded an EARLIER state and has not re-run.** Its verdict was "the bones are right; the surface is not there", against a nest that read as a bathtub with the eggs stuck to its outside wall. That nest has since been redrawn a fourth time — warm straw instead of teal, a deep recessed cup, and a separate `nest.rim` entry drawn OVER the eggs so their bases tuck into the nest — the mirror cue completed so both bowls are ringed, and the hen's reaction proven by measurement. **None of that has been re-graded, and it should be before game 003 inherits the style.**
- Two of the critic's findings were refuted by measurement and are **not** defects: outline weights are 3.25 (hen) vs 3.00 (nest) logical px, not "5–6 vs 3" — it measured a 2× render and read anti-aliasing as stroke; and the hen *does* react — `henOops` holds for 750 ms, while the critic's frames were taken at 1400 ms. A capture at 420 ms is now in the probe so the pose is gradeable.
- Still open: the hen's near-white body on cream leans on its 3 px outline alone for separation; the language picker's globe glyph renders in `focus` blue (library chrome, all 200 games); and counts 3, 7 and 10 are not represented in the screenshot sweep.


### ⭐⭐⭐ Round two: eight more defects, all reported by the operator, all through a green suite

After the "unresponsive Start" fix the operator kept playing and kept finding
things. Every one passed check-build, qa-game and the probe.

| # | What the operator saw | Cause |
|---|---|---|
| 1 | Start unresponsive | `Phaser.Geom.Rectangle.contains` — 3.90 only has `.Contains`, so `hitAreaCallback` was undefined and **nothing was clickable in any game** |
| 2 | "I have to hover several times before buttons respond" | Phaser offsets a container's hit area by its display origin, so the passed rectangle was displaced by half the control; only the top-left quadrant was live |
| 3 | Every numeral outside its card, labels outside buttons, ground band starting mid-screen | **My own regression**: a GLOBAL regex fixing hit rectangles also rewrote `drawRoundedRect`, `makeTile`'s painter and all of `drawArt`'s shape branch, so every centred shape drew from its corner |
| 4 | Language buttons unresponsive | The pill CONTAINER stays at (0,0) while its children move to (cx,cy); the hit rect needs that offset. Neither the original nor my first fix put it near the pill |
| 5 | Hen and nest drawn over the open language panel | Chrome had no depth; anything given a depth — or destroyed and re-created, as the hen is on every pose change — covers it. Picker now at depth 1500 |
| 6 | Text pixelated | Text rasterised at 1x into a canvas magnified ~3.6x |
| 7 | **Everything** pixelated on desktop | The canvas backing store is the game size and **Phaser 3.90 has no resolution option** (scale.resolution / render.resolution / top-level: all measured, all ignored). Now renders at 3x with a per-scene camera zoom; `logicalSize()` added so helpers stop reading `scale.width` as the logical stage |
| 8 | Two of ten eggs hang out of the nest | The bowl floor curves up — y 146 at the centre, 128.7 at 112 units out. The cluster was checked against the bounding box, not the silhouette |

**The through-line: my QA proved the game's LOGIC and never proved it could be
TOUCHED or LOOKED AT.** Every gate pressed buttons with a synthetic `emit()`,
which skips hit-testing entirely, and every screenshot was DPR 1 in a 704-900px
window — never a desktop width at DPR 2, which is what the operator uses.

Now enforced: `qa-game` carries **POINTER** (callable hit area + a real
`page.mouse.click` that must enter Play) and **ALIGNMENT** (four interior points
of every control must hit-test back to it), both poison-tested. The skeleton in
BUILD-CONVENTIONS §1 carries `RENDER_SCALE` and `stageCam()`; §3.1 carries the
hit-area table; §3.2 the depth rule. BUILD-WORKFLOW §2.5 carries the full list.

## 001 — The Fox's Bowl (`feed-the-fox`) — built 2026-09-06

- **Spec → build.** The pedagogue's opening ruling was that the spec as written was **80% a re-skin of 002**, and one line did it: step 4 printed `ART.totalNumeral` — the answer — *before* unlocking the numeral tiles. Once the answer is on screen, "choose the numeral" is a matching task, which is 002's catalogue objective verbatim. Deleting that line is what gives 001 an objective of its own: **002 teaches the numeral, 001 teaches the tagging.** In 002 the count is performed FOR the child, by the machine, and only on failure; here the child performs the one-to-one with their own finger on every item, so 001 can diagnose **enumeration failure** — the skip and the double-count — where 002 structurally cannot. Four changes carry that separation: the pre-answer total is gone and the total now arrives as the child's own last tag flying to the bubble; the corrections are performed BY the child (attempt 2 a cardinality fade, attempt 3 a conservation re-lay plus a guided re-count they tap out in reading order); distractors are the outputs of tagging errors with **no 6-vs-9 pair anywhere** (that is 002's diagnostic, and borrowing it would re-converge the games); and item 1 demonstrates ONE tap, not the whole count — demonstrating the count performs the objective for the child and makes their first real act the numeral choice, i.e. 002 again.
- **Reversals of the spec, each measured.** Tiles unlock after the FIRST berry, not the last: answering early is not an invalid move, it is *the* canonical counting error and the observable form of two of the four misconceptions, so it is refused informatively and never costs an attempt. Pools 12 → 24. And the spec's geometry was wrong in four places — n=10 in one row needs 908 px (wider than the whole stage); the two-row y values gave a **zero** vertical gap; the one-row centring put the first tile inside the fox; and the L3 `+40` offset overflowed the right margin. A corner count-badge is also arithmetically impossible at the 5-6 band's 40 px floor (clearance is `gap − r`), so the numeral went INSIDE the cell — which makes inter-tile clearance exactly the tile gap at every count, with no per-count check needed.
- **Content.** Title ruled **"The Fox's Bowl"**; the spec's "Feed the Fox" was rejected as an imperative telling a child to feed a wild animal, which all eleven countries signpost against. The re-audit paid for itself three times, none of it findable from English: **`skal` is the TOAST in sv, da AND no**, and "X:s skål" is the fixed idiom for a toast *to* X, so "Rävens skål" reads as *a toast to the fox* (the compound `matskål`/`madskål` closes it); Norwegian **`bolle` is a bun and crude slang**; and bare Dutch "Kom van de vos" is the imperative **"Come away from the fox!"**, so the article is load-bearing. German `Napf` is an animal's floor-level feeder and `Schale` also means peel/shell — bad on a screen of fruit. **es is masculine `el zorro` forever** (`la zorra` is a vulgar insult) while pt `a raposa` is neutral, so the two must never be harmonised. The caption is derived from the OBJECT, never inherited: it `mirtilli` is masculine → **`Quanti?`**, where 002 (counting feminine `uova`) ships `Quante?` — copying 002 would have shipped a grammatical error onto the screen.
- **Art added to `_lib/art.js`:** `fox.idle`, `fox.think`, `fox.happy`, `fox.oops`, `fox.munch`, `berry`, `bowl`, `bowl.rim`. Locale status: STRINGS 11/11 · LOCALE_DATA n/a · NSR flags on the sv/da/no/fi titles.
- **Gates:** check-build PASS · check-pools PASS (new tool) · qa-game PASS (11 locales, POINTER + ALIGNMENT with a real pointer, a wrong answer on every item reaches Finish at 400/704/1024) · probe PASS (15 assertions) · unit tests 85/85 · visual critic **SHIP — 14/14 rubric + 6/6 game-specific, on measured evidence** · pedagogue **SIGN-OFF — 9/9 rulings implemented** · personal read at 400/704/1024 plus German.
- **Local links:** `http://localhost:8480/feed-the-fox/index.html?lang=en` and the same for de fr it es pt nl sv da no fi.

### What this build bought for the other 198

- **THE PALETTE HAS NO RED, AND THAT IS A CONTENT CONSTRAINT, NOT A DRAWING ONE.** A strawberry cannot be drawn here: coral would put ten `accent` objects on one screen and destroy the one-coral rule, and the only other warm value is the exact hex the fox's body needs. When the art cannot draw the object a title names, **change the object or change the title** — never spend the state colour. Recorded as ART-BIBLE §10.
- **§9.4, the warm-body clause.** A mascot whose BODY is an `accent` tint spends its entire identity exemption on that body: no other warm value anywhere on the character, state coral geometric and ≥120 px clear of it, and the game declares exactly ONE `accent` entry — one grep, one number. It applies again to at least seven more of the fifty (squirrel, deer, lion, hamster, dog, cow, rooster).
- **A YOYO TWEEN CAPTURES ITS RETURN VALUE WHEN IT STARTS.** `countBerry` calls straight into `onCountComplete` while `numeralIn` (scale 0.5 → 1) is still running on the same object, so `lastBeat` snapped back to ~0.5 and **the cardinality tag — the one numeral the whole game exists to produce — sat permanently at half size.** Measured 16×24 ink against a sibling's 31×48. It broke the game's central inference: the flying copy is deliberately sized to read identical to its source, so a half-size source made the total read as a NEW numeral appearing, which is 002. **Every gate passed it; only a pixel measurement found it.** Kill the running tween and settle the target before any yoyo.
- **A PROBE THAT WAITS ON A SHARED STATE MAY BE POINTED AT THE WRONG MOMENT.** `onCountComplete` also enters `"correcting"` and gets there first, so a probe waiting on that phase photographed the count-completion flight — seconds before any wrong answer existed. The visual critic then measured the fox as **byte-identical across all seven play frames**, and correctly refused to call that either a defect or a pass, naming the measurement that would settle it. Drive a REAL pointer and **assert the state key**, not the picture.
- **DISTRACTOR LEGALITY BEATS RANK BALANCE, and the ceiling is arithmetic.** n=10 admits exactly ONE legal set under ±2, and only n≤8 has a "lowest" set, so a perfect 8/8/8 split over 24 items is impossible; an earlier 8/8/8 was reachable only *because* two items used illegal +3 distractors. Aim for equal thirds PER LEVEL. Recorded as BUILD-CONVENTIONS §8.1, with `_tools/check-pools.js` to re-derive every number so a comment can never quietly rot.
- **`makeTile` RE-APPLIES THE DISABLED 50% DIM ON EVERY REDRAW**, so assigning `alpha 1` afterwards is undone by the next focus change or pointerout. The whole counted set sat at half alpha through the correction and the show-me — reading as GONE rather than counted, at exactly the moment the child is re-reading it. Keep visible tiles ENABLED and enforce tappability in the handler.
- **`check-build`'s comment stripper was defeated by an apostrophe in HTML TEXT.** `<title>The Fox's Bowl</title>` opened a bogus string context that swallowed the next four lines, so the `<style>` comment was never stripped and NO-VH matched the word "ResizeObserver" *inside a comment* — the gate condemning correct code. Fixed by the principled rule that a single or double quote with no unescaped partner on the same line is text, not a delimiter. Poison-tested in both directions and against `numeral-nest`.
- **A QA DIRECTORY THAT IS NEVER CLEANED HIDES THINGS.** Naming a frame after whichever count a run happened to land on left a stale `trail10` from an intermediate build beside fresh frames, still showing a defect that was already fixed. The probe now clears its own frames and uses stable names.
- **THE BOWL HAD TO BE THE DARKER TINT.** `var(--surface2)` #FBF6EE on the #FBF3E4 stage differs by three units, so the vessel read as a bare outline; #E9E1D2 gives ~5× the separation. Same reason the `nest` uses it. And the fox was standing IN its own bowl on both the play and finish screens until I read the renders — the gates cannot see that.
- ⚠ `qa-game`'s `*-wrong.png` frames land inside item 1's BUILD, not a wrong answer, and its `TARGETS` check runs before `start()`, so it only ever measures the start screen. The gate must not be described as covering either; the per-game probe supplies both.
- ⚠ Backticks inside `node -e`, and backslashes inside a shell heredoc, each silently ate code again. Write the script to a file.
