# New 229 — The Blink Viewer (READINESS visual-discrimination)

## 0. Identity
- id `pairing-pegs.play.visual-discrimination` · grade K · READINESS visual-discrimination (framework from `frontend/lib/frameworks.ts`, readiness strand) · strand Logic & Visual Thinking · key `pairing-pegs` (files `pairing-pegs-core.js`, `pairing-pegs-activity.js`, `pairing-pegs-activity.html`, `pairing-pegs-activities.json`). The key keeps its planned name; the instrument is renamed.
- worksheets covered: K-039 Same and Different · K-044 Find the Different Size · K-058 Find the Pairs · K-062 Find the Twins · K-078 Shape Twins · K-080 Which Shape Is Different?
- new instrument (no old activity). The coverage sketch's "peg that only closes on twins" survives as the CLASP (only twins are clipped together), but the washing line is dropped (the `story-line` tool already pegs cards on a line and #252 is a washing line). The critic also dropped the first design's lightbox overlay: laying one picture over another so the difference glows is the invention of #224 The Tile Twin (tracing paper) and #227 The Shadow Lamp — a third copy would not be distinct. This design compares in TIME, not by overlay.

## 1. The pitch
"Put two pictures in the blink viewer and pump the lever: it flips between them in the same window — real twins stand perfectly still and get clipped together, and anything only *nearly* the same jumps, exactly where it is different."

## 2. Why a child will want it again
- The viewer is a toy with a lever: a chunky drawn box with one window and a big chrome lever beside it. Pump it and the window goes "tk — tk — tk", flipping between the two pictures. Children love levers.
- It is a real scientist's trick (astronomers found Pluto with a "blink comparator"), and it works on the eye like magic: twins do NOTHING when you blink them — the picture just sits there, rock still — so the stillness itself is the surprise, and then the brass clasp snaps over the corner.
- The "nearly the same" pairs are funny: a mirrored dog turns its nose left-right-left as if shaking its head; a smaller apple breathes in and out; a recoloured fish flashes like a disco light; a duckling and a duck swap places with a jolt. The difference is not told — it MOVES.
- Free play: any two cards can be blinked as long as the child likes; between rounds the whole tray is a toy.
- End of round: the clipped pairs fan out on the shelf like a hand of cards; in "odd one" rounds the lone card rises into a gold frame and blinks once more against its nearest relative to show why. No score, no timer, no lives.

## 3. The skill and the misconception
- Skill (K-039/044/058/062/078/080): look closely enough to decide that two pictures are *exactly* the same, and find the one that differs — in kind, size, orientation (mirror), colour or shape.
- Misconceptions: (a) "same kind" accepted as "same picture" (duck = duckling, square = rectangle); (b) size and mirror differences go unseen because the eye names the object and stops looking; (c) the odd one is guessed by gut feeling.
- Push-back by the material, never by a message: the viewer registers both pictures on the same floor point (ink-box bottom centre), so identical pictures produce a window that does not change at all, and any difference — however small — appears as MOTION in exactly the place it lives (the eye's change detector, not the child's naming, does the noticing). Only a pair that stood still can be clasped. The odd one is not guessed: it is the card still alone when every twin is clipped, so "different" is discovered by pairing.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At 704 (stacked layout, stage ≈ 648 × 470):
- **Card tray** (left column, 400 wide): cards 112 × 112 (white, 3 px ink outline #0F4A40, radius 14, shadow 0 3 0 #E6D8BF), picture 96 × 96 fitted by its ink box, pitch 124. 4 cards → one row of 4; 5–6 → 2 rows of 3; 7–8 → 2 rows of 4.
- **The Blink Viewer** (right column, 240 × 300): a drawn box (teal #146B5E frame 3 px, cream body #FBF3E4, radius 18). Top: two **loading sockets** 56 × 56 side by side (small card outlines; a loaded card shows as a 48 px thumbnail). Centre: the **window**, a 200 × 200 rounded square (white, inner shadow) showing ONE picture at 180 px. Right side: the **lever** — a drawn chrome arm with a 64 px round knob (coral #F2784B) that swings down 40° when pressed.
- **Pairs shelf** under the viewer: a drawn plank 240 × 14; clasped pairs stand on it as 64 × 64 thumbnails overlapping by 20 px.
- Odd-one rounds only: a **gold frame** socket (88 × 88, dashed #E0A400) at the right end of the shelf.
- Task line above (≤ 24 px, ≤ 2 lines); feedback bubble under the viewer column.

At 360 (stacked, stage ≈ 336 wide): viewer first — window 168 × 168 (picture 150), sockets 44 px above it, lever knob 56 px to its right; the shelf becomes a vertical strip of 48 px thumbnails at the window's left (viewer block 336 × 236); tray below: cards 76 × 76, pictures 64 × 64, pitch 82 → 4 per row (328), at most 2 rows (172 tall). Stage ≈ 236 + 12 + 172 = 420 px; with header, task line and bubble it fits 360 × 740 and 320 × 640 (at 320: window 152, cards 70, pictures 64, pitch 76 → 304).

Library pictures (each checked in `mini tools/pictures/<theme>.json` and seen on the contact sheet `des/contact/b5-farm-bugs.png`, 2026-10-17): farm-animals/duck, duckling, goose, cow, calf, sheep, lamb, horse, foal; animals/dog, fish, rabbit; vehicles/car, taxi, bus, truck, van; insects-and-bugs/bee, wasp; fruits/apple, pear, lemon. Contact-sheet rulings honoured: fruits/cherry is drawn as an apple (never used); farm-animals/hen and chicken are the same drawing (never used); farm-animals/chick is never used (too close to the duck and duckling); duckling, fox and cat are drawn front-facing and near-symmetric (never mirrored); the cow is mostly white (never hue-shifted).

Drawn apparatus geometry: cards, viewer, sockets, window, lever, clasp (a 22 px brass paper-clip outline), shelf, gold frame — and **every shape** (square, rectangle, circle, oval, triangle, pentagon, hexagon) drawn as SVG in ONE fill (#9ED9CF, ink #0F4A40): the library shape pictures each come in their own colour, which would make a shape difference also a colour difference (two attributes, two right answers). No words on the apparatus.

Task line (EN): pairs "Put two pictures in the viewer. Find all the twins." · odd "Every picture has a twin — except one. Find the twins!" · twins "Only two pictures are exactly the same. Find them!"

## 5. The hand
- **Load**: drag a card onto the viewer (or tap it) → it flies into the first free socket (180 ms) and the window shows it. A second card → the second socket; the window still shows the first, and the lever knob starts a soft breathing glow. Shortcut: drop a card onto another card in the tray → both fly into the sockets.
- **Blink**: press and hold the lever → it swings down and the window flips between the two pictures every **500 ms** (2 flips per second — below the WCAG 3-flashes-per-second limit), each flip a soft shutter "tk" (1.4 kHz, 20 ms). A short tap flips exactly once, so a child can also pump it. Both pictures are drawn at their round transform about the SAME ink-box bottom-centre point, so a twin pair produces two identical frames.
- **The verdict** comes when the lever is released after the window has shown both pictures at least twice (A→B→A→B). Before that, release just stops the blinking (no verdict, no miss):
  - **Twins**: the window holds still, its rim glows teal for 300 ms, the brass clasp swings over the sockets (rotate −40° → 0°, 140 ms, a soft "tk"), and the pair shrinks onto the shelf (260 ms). A third identical card blinked against a clasped pair (tap the pair on the shelf to load it into a socket) joins it (triples exist in odd rounds O1–O3, O6).
  - **Not twins**: a low "bonk" (220 Hz, 120 ms); the window blinks slowly 3 more times by itself so the jump is seen once more, then both cards fly back to their tray places (240 ms). Nothing is lost.
- **Unload**: tap a loaded socket → that card flies back to the tray.
- **Undo**: tap a clasped pair on the shelf → it unclips and both cards return to the tray.
- **Free play**: any two cards can be blinked for as long as the child likes; between rounds the whole tray stays live.
- Optional TTS: a long-press (600 ms) on a card speaks its noun. Nothing depends on hearing.

The rendering: each picture is drawn into the window canvas at its round transform — mirror = scaleX −1 about the ink-box centre; size = uniform scale about the ink-box bottom centre (the smaller one stands on the same floor); hue = canvas `filter: hue-rotate()`; cousin = the other library picture; shape = the other SVG. Twins are the same card definition, so their frames are identical by construction; the gate measures every non-twin pair's frame difference from the source files (§6 data rules).

## 6. The rounds
One round = one tray. **Differences: Big (B) / Small (S)** use the same card sets; only the transform strength changes: size 0.70 (B) / 0.84 (S); hue-rotate 150° (B) / 70° (S); rectangle and oval width : height 1.40 (B) / 1.18 (S); O3's triangle-vs-square becomes pentagon-vs-hexagon at S. Mirror and cousins are identical at both levels. Notation: `noun` plain card · `@m` mirrored · `@s` smaller · `@h` hue-rotated · cousin = another library picture. Every non-twin differs from its nearest relative in ONE attribute only.

**Task: Find the pairs** (K-058, K-078) — every card has exactly one twin.
| # | cards (each ×2) |
|---|---|
| P1 | farm-animals/duck · duck@m · farm-animals/duckling |
| P2 | vehicles/car · car@s · vehicles/taxi |
| P3 | square · rectangle · square@s |
| P4 | farm-animals/cow · farm-animals/calf · cow@s |
| P5 | fruits/pear · pear@s · pear@h |
| P6 | vehicles/bus · bus@m · bus@s |
| P7 | circle · oval · circle@s |
| P8 | farm-animals/horse · farm-animals/foal · horse@m · horse@s (8 cards) |
| P9 | insects-and-bugs/bee · insects-and-bugs/wasp · bee@m · bee@s (8 cards) |

**Task: Find the odd one** (K-039, K-044, K-080 — the rows of 4 are the worksheet row form; 5 and 7 cards are twins plus one).
| # | cards | the odd one |
|---|---|---|
| O1 | animals/dog ×3 · dog@m | dog@m |
| O2 | fruits/apple ×3 · apple@s | apple@s |
| O3 | triangle ×3 · square (S: pentagon ×3 · hexagon) | square / hexagon |
| O4 | farm-animals/sheep ×2 · farm-animals/lamb ×2 · sheep@s | sheep@s |
| O5 | vehicles/taxi ×2 · vehicles/car ×2 · taxi@m | taxi@m |
| O6 | animals/fish ×3 · fish@h | fish@h |
| O7 | farm-animals/goose ×2 · farm-animals/duckling ×2 · farm-animals/duck ×2 · duck@m | duck@m |
| O8 | circle ×2 · oval ×2 · circle@s | circle@s |
| O9 | vehicles/truck ×2 · truck@m ×2 · vehicles/van ×2 · truck@s | truck@s |

**Task: Find the twins** (K-062) — exactly one identical pair; every other card is a near-miss of it.
| # | cards | twins |
|---|---|---|
| T1 | dog ×2 · dog@m · dog@s · animals/rabbit | dog |
| T2 | car ×2 · car@h · vehicles/taxi · car@m | car |
| T3 | farm-animals/goose ×2 · goose@s · farm-animals/duck · goose@m | goose |
| T4 | rectangle ×2 · square · rectangle@s · oval | rectangle |
| T5 | bee ×2 · wasp · bee@h · bee@s · bee@m | bee |
| T6 | fruits/lemon ×2 · lemon@s · lemon@h · fruits/pear | lemon |
| T7 | horse ×2 · foal · horse@m · horse@s | horse |
| T8 | duckling ×2 · duck · goose · duckling@s · duckling@h | duckling |
| T9 | bus ×2 · bus@m · bus@s · vehicles/truck · bus@h | bus |

Data rules (gated, measured from the source webp in `cache/themes-512`, never from the tool): `@h` only on nouns whose 70° hue difference covers ≥ 25 % of ink pixels (so the Small level is visible; if T2's car, T6's lemon or T8's duckling fails at build, swap that card to `@s` and record it); `@m` only on nouns whose mirror difference ≥ 15 % of ink pixels; every cousin pair's difference ≥ 20 %; shapes never use rotation — a turned square is still a square, and K-078/K-080 must not teach otherwise.

- **Answer position**: every showing of a tray reshuffles card slots under constraints, gated over 200 seeded passes: odd rounds — the odd card sits in each slot ≤ 25 % of a pass; twins rounds — the two twins are adjacent in reading order in ≤ 2 rounds in 9 and both in the first row in ≤ 3 in 9; pairs rounds — at most 1 pair per tray starts side by side.
- **Order**: order-only reshuffle per pass via `nextTask` (never the same round sequence twice in a row).

## 7. Check, the misses, the success
There is no Check button — the viewer judges every blinked pair. Help is counted per round in **bonks** (non-twin verdicts); a bonk is shown, never scolded.
- nothing done for 20 s → bubble "Put a picture in the viewer." (one card loaded: "Put a second picture in." · two loaded, no blink: "Hold the lever and watch.") — no miss.
- bonk 1 → the apparatus has already SHOWN where they differ (the jump, replayed 3 times); bubble "Something jumped — they are not the same."
- bonk 3 → one card in the tray that still has a twin softly breathes (scale 1.00↔1.04, 1.2 s cycle); the child still has to find its partner. Bubble "This one has a twin somewhere. Look closely!"
- bonk 5 → its twin breathes too. Bubble "These two are twins. Put them in the viewer."
- a successful clasp takes the breathing away until the next bonk.
- **Success** (every card that has a twin is clasped): the shelf pairs fan out (stagger 80 ms) and flash once; in odd rounds the lone card glides into the gold frame and the viewer blinks it twice against its nearest relative. Bubble:
  - pairs "You found all {n} pairs!"
  - odd "This one has no twin — {diff}!" with {diff} ∈ "it is turned the other way" · "it is smaller" · "its colour is different" · "it is a different shape" · "it is a {noun}" (cousin label, e.g. "it is a lamb")
  - twins "These two are twins — exactly the same!"

## 8. Settings
1. **Task**: Find the pairs / Find the odd one / Find the twins — visibly changes the tray at rest (6–8 cards; 4, 5 or 7 cards and the gold frame on the shelf; 5–6 cards).
2. **Differences**: Big / Small — the cards change at rest (0.70 vs 0.84 size, 150° vs 70° hue, 1.40 vs 1.18 ratios).

## 9. Words (EN source)
- title "The Blink Viewer"
- instruction "Put two pictures in the viewer and hold the lever. Twins stay perfectly still — if anything jumps, they are not twins."
- prompts: "Put two pictures in the viewer. Find all the twins." · "Every picture has a twin — except one. Find the twins!" · "Only two pictures are exactly the same. Find them!"
- hints: "Put a picture in the viewer." · "Put a second picture in." · "Hold the lever and watch." · "Something jumped — they are not the same." · "This one has a twin somewhere. Look closely!" · "These two are twins. Put them in the viewer."
- celebrations: "You found all {n} pairs!" · "This one has no twin — {diff}!" · "These two are twins — exactly the same!"
- {diff}: "it is turned the other way" · "it is smaller" · "its colour is different" · "it is a different shape" · "it is a {noun}"
- settings: "Task" — "Find the pairs" / "Find the odd one" / "Find the twins" · "Differences" — "Big" / "Small"
- aria: card "{noun}" (or the shape name) + state "in the viewer"; "Blink viewer"; lever "Lever — hold to blink"; shelf pair "Pair: {noun}".

Locale traps:
- "twins" exists naturally in all 11 (Zwillinge, jumeaux, gemelos, gêmeos, gemelli, tweeling, tvillingar, tvillinger ×2, kaksoset). In fr/es/pt/it use the masculine plural as a predicate about two pictures ("ce sont des jumeaux"), never a per-card gendered form.
- "it is a {noun}" needs the indefinite article by gender per locale (ein Lamm / un agneau / un cordero / um cordeiro / un agnello / een lam / ett lamm / et lam / et lam / fi: no article, "se on karitsa"); author one frame per locale using the vocab gender field (`labels[locale][2]`), singular label only — never concatenate an English article.
- mirror phrase, natural per language: "spiegelverkehrt" de · "tourné de l'autre côté" fr · "al revés" es · "virado para o outro lado" pt · "girato dall'altra parte" it · "gespiegeld" nl · "spegelvänd" sv · "spejlvendt" da · "speilvendt" no · "toisin päin" fi.
- "jumped": the everyday verb for something that moves suddenly (de "hat gewackelt", fr "a bougé", es "se movió", pt "mexeu", it "si è mosso", nl "bewoog", sv "hoppade till", da "hoppede", no "hoppet", fi "liikahti") — the native reviewer picks. "lever" (Hebel / levier / palanca / alavanca / leva / hendel / spak / håndtag / spak / vipu) appears only in aria and the instruction.
- shape names come from `scripts/worksheet-gen/data/geometry-words.js` per locale (no diamond/"losange" is used anywhere).
- colour names are never used ("its colour is different"), so there is no colour-adjective agreement trap.
- `{n}` pairs is 3 or 4 — the plural is always used; fi partitive after numerals ("3 paria").

## 10. Sound off, access, phones
- Every outcome is visible: stillness + teal rim + clasp (twins), the jump + replay + cards flying back (not twins), gold frame (odd). Sounds are decoration.
- Keyboard: Tab walks the cards in reading order, Enter loads a card into the viewer, Tab reaches the lever, Space held = blink (each Space press = one flip), Escape unloads; on the shelf Enter unclips. Focus ring 3 px #146B5E.
- aria-live polite on the bubble; after a verdict it announces "Twins — clipped together" or "Not twins: {diff}" (the difference kind is said only AFTER the verdict). Each card's `aria-label` is the plain noun or shape name — never the transform (a mirrored dog is labelled "dog").
- Taps ≥ 44 px (cards 76 at 360, 70 at 320; lever knob 56–64). Pictures 96 px in the tray at 704, 64 on phones; the window shows 180 / 150.
- Phone: stacked, viewer first, tray under it, shelf as a strip beside the window; no Check button, so the whole board fits above the 360 × 740 and 320 × 640 folds.
- prefers-reduced-motion and photosensitivity: holding the lever does NOT auto-blink — every tap flips exactly once (the child controls each change); the not-twins replay is skipped; the clasp appears without its swing. Blinking never exceeds 2 flips per second and the window is < 12 % of the stage area.

## 11. Distinct from
- #224 The Tile Twin and #227 The Shadow Lamp (other batches): both lay one thing OVER another and light up where they disagree. The Blink Viewer never overlays — it alternates two pictures in one window and the difference shows as motion (a different perceptual mechanism and a different toy: a lever and a shutter, not tracing paper or a lamp).
- #228 The Fold Mirror and the `folding-sheet` tool: a fold tests a picture against its own mirror half.
- Category odd-one-out activities (Ziggy's Odd One Out): "which is not an animal" is category reasoning; here identity is the content.
- #17 Partner Bows: pairs for counting (one-to-one); here pairs are about sameness.
- `story-line` tool and #252: no line, no pegs, no order.
- Registry: no built activity alternates two pictures in one window.

## 12. Build plan
- **Core state**: `{cards:[{id, kind:'pic'|'shape', noun, transform, slot}], stacks:[[ids]], sockets:[id|null, id|null], shown:{a,b}, bonks, done}`; functions `cardsFor(round, level)`, `isTwin(a,b)` (same noun/shape AND same transform), `load(id)`, `unload(socket)`, `flip()` (counts frames shown), `verdict()` → `{twins, diffKind}` — returns null before both pictures have been shown twice, `lonely()` (cards with no identical partner), `isDone()` (every card that has a twin is stacked), `diffKind(card, relative)` → mirror | smaller | colour | shape | cousin, `nextTask` reshuffle with slot constraints, `hintLevel()` from bonks.
- **Gate's own ground truth** (`verify-pairing-pegs-core.js`): (1) re-derives the twin classes from the round table literals (not from the core); (2) with `sharp` on `cache/themes-512` renders each card's frame at the window size and asserts: twins → pixel-identical frames; every non-twin pair → difference fraction at or above the §6 thresholds (mirror 15 %, hue-70 25 %, cousins 20 %; scale-0.84 measured and recorded); (3) each round has exactly one right final state (pairs: n/2 stacks; odd: exactly one lonely card; twins: exactly one identical pair); (4) every non-twin differs from its nearest relative in exactly one attribute; (5) slot balance over 200 passes; (6) no shape rotation; (7) no B&W theme, no fruits/cherry, no hen/chicken, no chick, never a mirrored duckling/fox/cat, never a hue-shifted cow; (8) `verdict()` before two full flips returns null.
- **Mutations** (one per rule): isTwin ignores transform · isTwin ignores size · a round with two lonely cards · odd card pinned to slot 1 · verdict allowed after one flip · registration about the image box instead of the ink box (twins jump) · hue on cow (diff below 25 %) · mirror on duckling · shape rotation used as a difference · stack accepts a non-twin · undo loses a card · aria-label leaks "mirrored" · blink interval below 500 ms · reduced-motion still auto-blinks · hint breathes on an already-clasped card.
- **Local test**: real pointer: drag-load, tap-load, card-on-card shortcut, lever hold and lever taps, verdicts both ways, unload, unclip, at 320·360·412·704·768·1024·1366, every round, 11 locales; canvas readback asserts identical frames for twins and different frames for every non-twin pair.
- **Pictures to re-check on a contact sheet at build**: vehicles/bus and animals/dog mirrored (visible?), fruits/pear, lemon, vehicles/car and farm-animals/duckling at 70° hue (visible?).
- **Risks**: canvas readback needs same-origin images (`/image-library-webp/…` is same-origin). Region-only "small detail" recolours are deliberately out of v1 (no region masks) — the Small level gets its difficulty from 0.84 scale, 70° hue and 1.18 ratios.
- Nothing BLOCKED.

## 13. The four questions
1. Yes — a lever, a shutter that goes tk-tk-tk, pictures that shake their heads or flash like a disco, and the strange calm of a twin pair that does not move at all.
2. Yes — it is a real comparison technique, it covers six worksheets, it makes "nearly the same" visibly NOT the same without a word, and the odd one is found by pairing, not guessing.
3. Yes — library pictures, shapes as clean geometry, no words on the stage, nothing ever marked wrong, quiet sounds, a safe blink rate.
4. Blink two pictures in one window: twins stand perfectly still and get clipped together, and anything only nearly the same jumps exactly where it differs.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 2→5 · reality 4→5
What changed:
- The lightbox overlay (two pictures laid over each other, the difference glowing) was a third copy of the overlay-and-glow invention already designed for #224 The Tile Twin and #227 The Shadow Lamp. Replaced with the blink viewer: two pictures alternate in ONE window under a lever; twins stand still, differences jump. Rounds, worksheets and data rules kept.
- Picture rulings applied from the contact sheet: the chick left O7 (it shared a round with the duck) and T8 (chick + duck, and a mirrored duckling — the duckling is front-facing and symmetric, so its mirror would be invisible). T8 is now duckling ×2 · duck · goose · duckling@s · duckling@h. P4 cow@h → cow@s (the cow is mostly white, so a hue shift would barely show).
- The verdict cannot happen before both pictures have been shown twice (the child must SEE the comparison); gated and mutated.
- Blink rate capped at 2 per second; reduced-motion = tap-to-flip only (photosensitivity).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
