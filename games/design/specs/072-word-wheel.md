# 072 — Word Wheel

## Identity
- Slug: `word-wheel`
- Subject / topic: Literacy / onset-rime word families — turning an onset wheel against a fixed rime (c-at, h-at, b-at) to make the word a picture shows
- Age band: `6-8`
- Interaction pattern: `P9` — set a value (a stepped dial with tap-the-mark fallback) with a Check
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P9. Locale note: word families are language-bound (F-124, F-126; A-15) and live in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native family list (en pilot). Nothing is spoken; the target word is cued by its picture.

## Learning
- Objective: Turns a wheel of onsets against a fixed rime until the wheel and rime together spell the word a picture shows, then checks it.
- Prerequisites: Recognises letters (game 006); has met blending of three-letter words (game 071 or the free CVC builder). Reads no sentences.
- Curriculum links: F-1 (CVC/blending in 8 of 15 sources), F-22 (blending letter-sounds into words at 6-7, all twelve systems), F-24 (onset-rime is the "word family" strand of EN/US synthetic phonics; Germanic and Nordic systems teach letter-sound blending in the same band; Romance systems are syllable-first — see game 073 for that surface), F-31 row "Blending to words (CVC / syllables)" — conservative 7, earliest 4 → 6-8 (US RF.K.2.c / RF.1.2.b "blend sounds, including onset and rime"; England Y1 phonics; Germany Klasse 1 "Anlaut / Reimwörter"; Netherlands groep 3 "hakken en plakken"; Sweden åk 1; Denmark 1. klasse "lydering").
- Common misconceptions (F-124, F-126, F-121), each with this game's response:
  1. **Says the onset and the rime but does not synthesise them into one word ("c … at" and no cat).** Response: the wheel window and the rime card are drawn as two halves of ONE word (same baseline, 8 px apart); on a correct Check the onset slides against the rime and the two glow together as one word (`ANIM.join`, `ART.wordGlow`) — continuous blending is enacted, not described.
  2. **Stops on a word that goes with the picture's MEANING rather than its letters (picture of a cat → stops on "rat" or "bat", both animals — F-126 matching on meaning).** Response: on a wrong Check the game shows what the child actually made: if the made word is in the picture set, its picture (`ART.madePic`) appears in a thought bubble (`ART.bubble`) above the wheel beside the made word (`ART.madeWord`) for 1200 ms — "you made a bat"; if the made word has no picture, the made word alone appears. The onset letter in the made word is coral (`THEME.colour.accent`) so the child sees which part to change. This is feedback on a word already decoded, not a picture beside a word to be decoded (F-125).
  3. **Mirror-onset confusion (b/d/p: stops on "dat" for bat, "pat" for bat).** Response: L2 wheels contain b, d and p together; when the made word differs from the target only by a mirror onset, `ART.bellyDot` (the game-006 cue) appears on the bowl of the onset letter on the wheel window and on the target's onset in the bubble for the same 1200 ms.
  4. **Splitting a digraph or cluster into two letters (sh-ip read as s-h-ip).** Response: at L3 a digraph/cluster is ONE tile on the wheel (`ART.onsetTile` shows "sh" or "tr" as a unit) — it turns as one and lands as one (F-124 "a digraph is one physical tile").
  5. **Searching by tapping Check at every position (brute force, F-65).** Response: a Check on a non-target word always plays the made-word feedback (≈ 1.4 s, wheel disabled during it), and an item solved after any wrong Check is never first-try; after two wrong Checks the show-me ring marks the target onset on the rim.

## How it plays
1. **Start screen**: title "Word Wheel", the hamster (`ART.hamster`) at (360, 200), Start, picker.
2. **Item 1 (L1: rime -at; picture cat; wheel onsets c, h, b, r)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the picture frame (`ART.frame`, 150 × 150) centred at (130, 160) holding `ART.picCat` at 88 px; the word assembly to its right: the wheel (`ART.wheel`, circle r 80) centred at (340, 170) with the four onsets written around its rim at 90° intervals (`ART.onsetTile`, 56 × 56 transparent tiles, letter 32 px), the window (`ART.window`, 64 × 64 rounded square outline) fixed on the wheel's RIGHT edge at (420, 170) framing whichever onset is at the 3 o'clock position, and the rime card (`ART.rimeCard`, 120 × 72) at (520, 170) showing "at" at 44 px. The hamster sits on top of the wheel at (340, 76). Zone B: the two stepper tiles: `ART.stepTile` with `ART.arrowUp` at (260, 400) and `ART.stepTile` with `ART.arrowDown` at (460, 400); between them a read-only strip (`ART.madeStrip`, 160 × 64) at (360, 400) showing the currently assembled word at 36 px ("cat", "hat", …) so the whole word is readable in one place. Zone C: Check (`makeButton ok`) at (360, 510), enabled from the start. Caption `S("makeTheWord")` ("Make the word") at (360, 296), 24 px `THEME.colour.inkSoft`.
3. **Setting**: tap the up tile → the wheel rotates one step clockwise (`ANIM.spinStep`, +90° for four onsets, 360/N in general) so the next onset arrives in the window; `tone("tap", k)` where k is the onset's index (pitch tells the child the wheel moved); the made strip updates to the new word. The down tile turns the other way. **Tap-the-mark fallback (P9):** tapping any onset tile on the rim rotates the wheel directly until that onset is in the window (`ANIM.spinTo`). Keyboard: Left/Right arrows step, Enter checks. The wheel starts at a random onset that is NOT the target.
4. **Check**: tap OK.
   - **Correct**: the window's onset slides 8 px toward the rime and the rime card slides 8 px toward the onset (`ANIM.join`), `ART.wordGlow` fades in behind the pair and out again, `tone("correct")`, praise pop, the whole word (`ART.wordLabel`) appears under the picture at (130, 244), the hamster `ANIM.run` (a quick wobble as if running on the wheel); rail dot fills; next item after 900 ms (new picture and wheel `ANIM.appear`).
   - **Wrong (a real word that is not the target)**: `tone("nudge")`; `ART.bubble` appears at (340, 60) with `ART.madeWord` (the word made, onset in accent colour) and, if that word has a picture in the set, `ART.madePic` at 56 px beside it; if the made word differs from the target by a mirror onset, `ART.bellyDot` also appears on both onsets. After 1200 ms the bubble fades (`ANIM.fadeOut`). The wheel stays where it is; the child turns and checks again. Attempt 2. Wheel and stepper are disabled during the 1.4 s cue.
   - **Second wrong Check**: the cue again, then the target onset's rim tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); when the child brings it to the window and checks, the item completes as solved-with-help (no praise pop; the hamster still runs).
5. **Items 2-12**: per Content/Rules. L1 four-onset wheels on -at / -an / -en / -og; L2 five-onset wheels on -in / -et / -ell / -ug / -ig with e/i rimes and b/d/p together; L3 six-onset wheels on -ock / -uck / -ip / -ing / -ell / -og with digraph and cluster onsets as single tiles.
6. **Re-queue** (F-41): an item wrong at first Check re-enters after 2 intervening items with the wheel at a fresh random start; the count stays 12.
7. **Finish**: `t("all_done")` (360, 110); the hamster (360, 200) `ANIM.celebrate`; the summary = the session's words grouped by rime as chips (`ART.wordChip`, 96 × 36, word 20 px) in rows under a rime heading (`ART.rimeHead`, 24 px: "-at", "-en" …) from y = 300, four chips per row — the word families the child built, not a score; first-try words carry `ART.dotFull` at their left, helped words `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  hamster:   { kind: "emoji", value: "🐹", size: 72 },                    // mascot
  frame:     { kind: "shape", shape: "roundRect", w: 150, h: 150, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  wheel:     { kind: "shape", shape: "circle", r: 80, fill: "surface2", stroke: "structure", strokeWidth: 4 },
  hub:       { kind: "shape", shape: "circle", r: 12, fill: "structure" },
  onsetTile: { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "surface2", strokeWidth: 1, radius: 12 },  // rim onset, letter(s) 32 px display ink; invisible box
  window:    { kind: "shape", shape: "roundRect", w: 64, h: 64, stroke: "accent", strokeWidth: 4, radius: 12 },
  rimeCard:  { kind: "shape", shape: "roundRect", w: 120, h: 72, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 12 },  // rime 44 px display ink
  wordGlow:  { kind: "shape", shape: "roundRect", w: 260, h: 88, fill: "structureSoft", radius: 20 },   // behind window+rime, alpha 0 → 1 → 0
  wordLabel: { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  madeStrip: { kind: "shape", shape: "roundRect", w: 160, h: 64, fill: "bg", stroke: "line", strokeWidth: 2, radius: 12 },   // made word 36 px
  stepTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  arrowUp:   { kind: "text",  value: "▲", size: 44, font: "display", color: "structure" },
  arrowDown: { kind: "text",  value: "▼", size: 44, font: "display", color: "structure" },
  bubble:    { kind: "shape", shape: "roundRect", w: 220, h: 84, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  madeWord:  { kind: "text",  value: "", size: 32, font: "display", color: "ink" },      // onset letter(s) recoloured accent at runtime
  madePic:   { kind: "text",  value: "", size: 56, font: "body", color: "ink" },          // holds the made word's picture value looked up from the pic entries below
  bellyDot:  { kind: "shape", shape: "circle", r: 7, fill: "accent" },
  showRing:  { kind: "shape", shape: "circle", r: 36, stroke: "structure", strokeWidth: 4 },
  wordChip:  { kind: "shape", shape: "roundRect", w: 96, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  rimeHead:  { kind: "text",  value: "", size: 24, font: "display", color: "structure" },
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // target pictures (intended English word in the comment)
  picCat:    { kind: "emoji", value: "🐱", size: 88 },   // cat
  picHat:    { kind: "emoji", value: "🎩", size: 88 },   // hat
  picBat:    { kind: "emoji", value: "🦇", size: 88 },   // bat
  picRat:    { kind: "emoji", value: "🐀", size: 88 },   // rat
  picPan:    { kind: "emoji", value: "🍳", size: 88 },   // pan
  picCan:    { kind: "emoji", value: "🥫", size: 88 },   // can
  picVan:    { kind: "emoji", value: "🚐", size: 88 },   // van
  picPen:    { kind: "emoji", value: "🖊️", size: 88 },   // pen
  picHen:    { kind: "emoji", value: "🐔", size: 88 },   // hen
  picTen:    { kind: "emoji", value: "🔟", size: 88 },   // ten
  picDog:    { kind: "emoji", value: "🐶", size: 88 },   // dog
  picPin:    { kind: "emoji", value: "📌", size: 88 },   // pin
  picBin:    { kind: "emoji", value: "🗑️", size: 88 },   // bin
  picNet:    { kind: "emoji", value: "🥅", size: 88 },   // net
  picBell:   { kind: "emoji", value: "🔔", size: 88 },   // bell
  picBug:    { kind: "emoji", value: "🐛", size: 88 },   // bug
  picPig:    { kind: "emoji", value: "🐷", size: 88 },   // pig
  picSock:   { kind: "emoji", value: "🧦", size: 88 },   // sock
  picLock:   { kind: "emoji", value: "🔒", size: 88 },   // lock
  picClock:  { kind: "emoji", value: "⏰", size: 88 },   // clock
  picBlock:  { kind: "emoji", value: "🧱", size: 88 },   // block
  picDuck:   { kind: "emoji", value: "🦆", size: 88 },   // duck
  picTruck:  { kind: "emoji", value: "🚚", size: 88 },   // truck
  picShip:   { kind: "emoji", value: "🚢", size: 88 },   // ship
  picRing:   { kind: "emoji", value: "💍", size: 88 },   // ring
  picShell:  { kind: "emoji", value: "🐚", size: 88 },   // shell
  picFrog:   { kind: "emoji", value: "🐸", size: 88 },   // frog
  picPlug:   { kind: "emoji", value: "🔌", size: 88 }    // plug
};
```
All emoji are Unicode 10 or older; no fallbacks needed. `ART.madePic` is drawn with the `value` of the matching `pic*` entry at runtime (looked up by word), so the emoji still lives only in this block.

## Animation registry
```js
const ANIM = {
  spinStep:  { angle: "+=90", duration: 220, ease: "Back.Out", trigger: "wheel container on an up tap (−=90 on down); the step is 360/N degrees for N onsets; rim letters counter-rotate so they stay upright" },
  spinTo:    { duration: 320, ease: "Sine.InOut", trigger: "wheel container to the angle that brings a tapped rim onset into the window (angle set at call, shortest direction)" },
  join:      { x: "+=8", duration: 220, ease: "Back.Out", trigger: "window onset moves toward the rime; the rime card runs the mirror (−=8) at the same time" },
  glow:      { alpha: 1, duration: 220, ease: "Sine.Out", yoyo: true, trigger: "wordGlow behind window+rime on a correct Check (from alpha 0)" },
  run:       { angle: 6, duration: 90, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "hamster on correct" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "bubble after the made-word cue" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new picture, wheel and rime (from alpha 0, scale 0.6); bubble on a wrong Check" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the target onset's rim tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hamster" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                       hamster (340,76)   bubble (340,60) on error│
      │  ┌─────────┐        ╭───h───╮                                 │
      │  │ picture │       ( r     c )[window] [  at  ]  rime (520,170) │  zone A
      │  │(130,160)│        ╰───b───╯ (420,170)                       │
      │  └─────────┘        wheel (340,170) r=80                       │
      │   "cat" (130,244) after solve                                  │
260   ├──────────────────────────────────────────────────────────────┤
      │                 "Make the word" (360,296)                     │
      │        [ up ]      [  cat  ]      [ down ]   y=400              │  zone B
      │       x=260       strip x=360      x=460   (96×96 / 160×64)    │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Rim onsets sit at radius 60 from the wheel centre, evenly spaced, the first at 0° (3 o'clock = the window); the wheel container rotates, each onset tile counter-rotates by the same angle so letters stay upright.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.frame` centred (130, 160) with the item's picture centred (130, 150); `ART.wordLabel` at (130, 244) after a correct Check.
- Wheel: `ART.wheel` centred (340, 170), `ART.hub` at its centre; N × `ART.onsetTile` as `makeTile` 56 × 56 at radius 60 (angles 0, 360/N, 2·360/N …), letters 32 px `THEME.font.display` `THEME.colour.ink` (a two-letter onset at 28 px); `ART.window` fixed at (420, 170) over the 0° position; `ART.rimeCard` at (520, 170) with the rime at 44 px. The window onset and the rime read as one word: same baseline (y = 170), the rime's left edge 8 px right of the window's right edge (the card is drawn with its text left-aligned at x = 468).
- `ART.wordGlow` centred (470, 170) at alpha 0 behind window + rime.
- `ART.madeStrip` at (360, 400) with the assembled word 36 px `THEME.colour.ink`; `ART.stepTile` + `ART.arrowUp` at (260, 400); `ART.stepTile` + `ART.arrowDown` at (460, 400).
- `ART.bubble` at (340, 60) holding `ART.madeWord` (left, x = 290) and `ART.madePic` (right, x = 400); `ART.bellyDot` on the bowl of b/d/p at the offsets in game 006 Content.
- `ART.showRing` behind the target rim tile. Check `makeButton` `ok` at (360, 510). `ART.hamster` at (340, 76) (it overlaps nothing: the bubble replaces it during a cue — the hamster hides at alpha 0 while the bubble shows).
- Caption `S("makeTheWord")` at (360, 296), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 400.
- Keyboard: Left/Right arrows step the wheel; Tab also reaches the rim tiles, up, down and OK; Enter activates.
- Tap floors: rim tiles 56, step tiles 96, OK 220 × 72 (all ≥ 56). Rim tiles at radius 60 with N = 6 are 60 px apart centre to centre — gap 4 px between 56-px tiles; acceptable because a mis-tap onto a neighbour simply spins to that neighbour (no wrong answer is recorded until Check).

## Content
Word families are language-bound. `LOCALE_DATA[lang]` = `{ items: { L1: [...], L2: [...], L3: [...] } }`; each item is `{ rime: "at", onsets: ["c","h","b","r"], answer: "c", pic: <ART key> }`; every onset + rime is a real word. The English set is complete below. **Other locales: a native word-family list is required — en pilot** (de/fr/it/es/pt/nl/sv/da/no/fi = `"en"` until then; the Romance locales should be served by game 073's syllable surface first, F-24).

English items — (rime; wheel onsets; target picture → answer onset):
- **L1** (four onsets, single letters, no mirror pairs together): (at; c h b r; `ART.picCat` → c) · (at; h m s c; `ART.picHat` → h) · (at; r c s m; `ART.picRat` → r) · (an; p c m r; `ART.picPan` → p) · (an; c f t p; `ART.picCan` → c) · (an; v m c r; `ART.picVan` → v) · (en; p h t m; `ART.picPen` → p) · (en; h d t p; `ART.picHen` → h) · (en; t p m h; `ART.picTen` → t) · (og; d l f j; `ART.picDog` → d)
- **L2** (five onsets; e/i rimes; b, d and p on the same wheel where the family allows): (at; b d p h c; `ART.picBat` → b) · (in; p b t w f; `ART.picPin` → p) · (in; b p t d w; `ART.picBin` → b) · (et; n p w j g; `ART.picNet` → n) · (ell; b t s w f; `ART.picBell` → b) · (ug; b m r j h; `ART.picBug` → b) · (ig; p b d w f; `ART.picPig` → p) · (en; p d h t m; `ART.picPen` → p)
- **L3** (six onsets including digraphs/clusters as single tiles): (ock; s l r d cl bl; `ART.picSock` → s) · (ock; l s d r cl bl; `ART.picLock` → l) · (ock; cl s l r d bl; `ART.picClock` → cl) · (ock; bl cl s l r d; `ART.picBlock` → bl) · (uck; d l t b tr st; `ART.picDuck` → d) · (uck; tr d l b t st; `ART.picTruck` → tr) · (ip; sh l h z d ch; `ART.picShip` → sh) · (ing; r s w k br st; `ART.picRing` → r) · (ell; sh b t s w sm; `ART.picShell` → sh) · (og; fr d l f j h; `ART.picFrog` → fr) · (ug; pl b m r j h; `ART.picPlug` → pl)

Made-word pictures (for the wrong-Check bubble): any made word that is itself a target above shows its picture (e.g. making "bat" on the -at wheel shows `ART.picBat`); all other made words (mat, sat, ran, tan, log, jog, lick, …) show the word only.

Play list: 12 per Rules; shuffled within level; no picture repeats except by re-queue; the wheel's random start is never the target.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong Check, or wrong first-Check on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: `ANIM.join` + `ANIM.glow`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try item, word label under the picture, hamster `ANIM.run`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Meaning-related word (bat/rat for the cat picture): bubble with the made word (onset in accent) and that word's picture for 1200 ms; wheel disabled during the cue.
  - Mirror-onset word (dat/pat-type confusions, or bin/pin/din on the -in wheel): the bubble plus `ART.bellyDot` on both onsets.
  - Any other real word: the bubble with the made word only.
  - Check with the wheel already on the target after a previous wrong Check: correct, solved-with-help.
- Retry behaviour: attempt 1 → attempt 2 after the bubble → attempt 3 with the show-me ring on the target onset; solved-with-help. No attempt 4; the item re-queues later.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Word Wheel"; `makeTheWord` = "Make the word". Onsets, rimes and words are content from `LOCALE_DATA`.

## Sound
`tone("tap", k)` on each wheel step (k = onset index, so the pitch cycles with the wheel); `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 12", All done, Play again, Menu, praise change; with `?lang=fr` and no French list the English families play and nothing breaks).
- [ ] Works at narrow width (400-px iframe: picture, wheel, rime card, both step tiles and OK visible; six rim onsets stay readable).
- [ ] Keyboard operable (Left/Right arrows turn the wheel one step; Tab reaches the rim onsets, up, down and OK; Enter activates).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong Checks still ends with the word made; the show-me ring always marks the target onset).
- [ ] The wheel never starts on the target onset.
- [ ] Tapping the up tile brings the next onset into the window and the made strip changes to the new word; tapping an onset on the rim jumps straight to it.
- [ ] Checking "bat" for the cat picture shows a bubble with "bat" (b in coral) and a bat picture, then fades; checking "mat" shows the word only.
- [ ] Checking "cat" slides the c and the "at" together with a glow and writes "cat" under the picture.
- [ ] At the third level "sh", "cl", "tr" and "fr" are single tiles that turn as one.
- [ ] A missed item comes back two items later with the wheel at a different start.
- [ ] Two first-Check corrects in a row bring a wheel with more onsets; a wrong Check brings fewer.
- [ ] The finish screen groups the built words under their rimes and shows no score.
- [ ] With `?sound=off` nothing is audible.
