# 014 — Number Line Hop

## Identity
- Slug: `number-line-hop-to-20`
- Subject / topic: Mathematics / number order to 20 (tapping numerals in ascending sequence)
- Age band: `5-6`
- Interaction pattern: `P4` — tap in order (per-tap judgement; the "rail" is the frog's path drawn across the pond and the hop badge is the position number)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P4. One stated variation: tapped tiles do not move to a separate rail; each stays on its lily pad and the path line plus the hop badge (1st, 2nd, 3rd …) are the ordered-rail cues. Everything else follows P4.

## Learning
- Objective: Taps 4-6 scattered numerals (a consecutive run within 1-20) in ascending order, starting from the smallest, so that the frog hops along the path.
- Prerequisites: Reads numerals to 10 (game 002); says the counting sequence to 20. No reading.
- Curriculum links: F-1 (number recognition / ordering in 11 of 15 sources), F-4 ("ordering" and "1 more / 1 less" on the UK reception map), F-21, F-31 row "Numerals to 20, number words" — conservative 6-7, earliest 5 → 5-6 (US K.CC.A.2 "count forward beginning from a given number"; England Reception ELG "verbally count beyond 20, recognising the pattern"; Germany Klasse 1 "Zahlenreihe bis 20"; France GS "suite orale et écrite des nombres"; Netherlands groep 2-3 "telrij tot 20"; Sweden förskoleklass; Finland esiopetus "lukujono").
- Common misconceptions (F-101, F-102), each with this game's response:
  1. **Stable-order violation — skipping a number (4 then 6).** Response: per-tap judgement: the skipped-over pad is not accepted; the tapped pad nudges (`ANIM.nudge`) and nothing else changes. On the second wrong tap at the same step, the correct next pad gains a soft glowing ring (`ART.glowRing`, `ANIM.showMe`) so the child sees which numeral comes next; the frog only ever moves along the true sequence, so the path the child builds is always in order.
  2. **Always starting at 1.** Response: from L2 the run starts mid-sequence (6, 7, 8, 9, 10). The first pad to tap is the SMALLEST numeral, whatever it is; a tap on any other pad first nudges, and on the second wrong first-tap the smallest pad glows.
  3. **Mirror numerals 6 and 9 (normal to ~6).** Response: when 6 is next and the child taps 9 (or the reverse), both pads show `ART.underline` beneath their numerals for 1200 ms (the round part of 6 sits at the bottom; 9's at the top — the bar anchors the orientation) before the nudge; the item counts as retried but this is never treated as a hard error.
  4. **Teen numbers read from their ones digit (16 taken as "six-ish").** Response: L3 runs sit in 11-20; a wrong teen tap makes the frog's bank signpost (`ART.signpost`) show the last hopped numeral and the next one side by side (`ART.nextPair`, e.g. "15 16") for 1200 ms, so the child sees the whole two-digit numeral, not the ones digit.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Number Line Hop"): the frog (`ART.frog`) at (360, 200) above the title, Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: run 1-4, four pads).** The Play scene builds: the dot rail of 8 hollow dots at y = 28 (§6). The pond (`ART.pond`, 640 × 400) fills zones A + B centred at (380, 270). The bank (`ART.bank`, 110 × 140) at (70, 270) with the frog sitting on it at (70, 240) and the signpost (`ART.signpost`, 80 × 44) at (70, 340), empty. Four lily pads (`ART.pad` glyph on 80 × 80 `ART.padTile`s) at the 4-pad positions (Screen layout), each showing one numeral of 1-4 (44 px) assigned to positions in a shuffled order. No caption.
3. **Hopping.** The child taps a pad.
   - **The smallest numeral (1):** `tone("tap", 1)`; the frog hops there (`ANIM.hop`: an arc — x/y tween to the pad over 400 ms with a y-dip of 40 px at the midpoint); the pad locks (`setEnabled(false)`, fill `structureSoft`, stroke `structure` 3 px) and a hop badge (`ART.hopBadge`) with "1" appears at its top-right; the path line (`ART.path`, 6 px `structure`) draws from the bank to the pad (`ANIM.pathDraw`). The signpost shows "1".
   - **Any other pad first:** `ANIM.nudge`, `tone("nudge")`, the pad de-selects and stays enabled. Second wrong first-tap: the smallest pad gains `ART.glowRing` with `ANIM.showMe` until it is tapped.
   - **Next numeral in order (2, then 3, then 4):** as for the first: `tone("tap", k)` with k = hop number (pitch climbs), frog hops, badge k, path extends from the previous pad, signpost updates.
   - **Out of order (4 tapped when 2 is next):** `ANIM.nudge` + `tone("nudge")`; the pad stays enabled. Second wrong tap at the same step: the correct next pad gains `ART.glowRing` (`ANIM.showMe`). Third wrong tap at the same step: the frog hops to the correct pad by itself (show-me), the badge and path draw as usual, and play continues from there; the item counts as solved-with-help.
   - **Mirror pair (9 tapped when 6 is next, or 6 when 9):** `ART.underline` under both numerals for 1200 ms, then the nudge. **Teen wrong tap at L3:** `ART.nextPair` on the signpost for 1200 ms, then the nudge.
   - **Tapping a locked pad:** nothing happens.
4. **Item complete** (the last pad hopped): `tone("correct")`, the frog `ANIM.ribbit` (a scale-y squash) on the last pad, the whole path `ANIM.pathGlow` (alpha pulse once), `GameCore.showPraise(scene, key)` with the next praise key; the rail dot fills; after 900 ms the pads and path fade (`ANIM.fadeOut`), the frog glides back to the bank (`ANIM.glide`) and the next item builds (`ANIM.appear`).
5. **Items 2-8.** Built from the level pools in Content by the Rules. Pad counts: L1 four pads, L2 five, L3 six; positions per Screen layout; numerals shuffled among the positions so the spatial order never matches the numeric order (the shuffle is re-rolled if the numerals happen to read left-to-right ascending).
6. **Finish** (after 8 items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the frog at (360, 220) with `ANIM.celebrate`. Zone B: the eight runs the child hopped, as small chips (`ART.runChip`, 76 × 36) showing "1-4", "6-10" … (18 px `THEME.colour.ink`) in a row at y = 400 (x = 360 − 3.5 × 84 + i × 84) — the visual summary; no score. Zone C: `makeButton play_again` at (250, 510), `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 5 minutes: 8 items × (4-6 hops ≈ 25-40 s).

## Art registry
```js
const ART = {
  frog:      { kind: "emoji", value: "🐸", size: 72 },
  pad:       { kind: "emoji", value: "🪷", size: 60, fallback: "🍀" },      // Unicode 14 lotus → fallback four-leaf clover; the numeral is drawn over it
  pond:      { kind: "shape", shape: "roundRect", w: 640, h: 400, fill: "structureSoft", radius: 40 },
  bank:      { kind: "shape", shape: "roundRect", w: 110, h: 140, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 20 },
  signpost:  { kind: "shape", shape: "roundRect", w: 80, h: 44, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 8 },   // numeral 24 px display ink
  nextPair:  { kind: "text",  value: "", size: 22, font: "display", color: "structure" },                                             // "15 16" on the signpost
  padTile:   { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 40 },       // a round tile; numeral 44 px display ink on top of the pad glyph
  hopBadge:  { kind: "shape", shape: "circle", r: 14, fill: "structure" },                                                            // hop number 16 px display bg
  path:      { kind: "shape", shape: "line", w: 6, stroke: "structure", strokeWidth: 6 },
  glowRing:  { kind: "shape", shape: "circle", r: 48, stroke: "structure", strokeWidth: 4 },
  underline: { kind: "shape", shape: "rect", w: 40, h: 6, fill: "accent" },
  runChip:   { kind: "shape", shape: "roundRect", w: 76, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. The pad glyph sits under a numeral; the art upgrade replaces `ART.pad` and `ART.frog` and nothing else changes.

## Animation registry
```js
const ANIM = {
  hop:       { duration: 400, ease: "Sine.InOut", trigger: "frog to the tapped pad (x, y set at call); a second tween on y dips 40 px at the midpoint (yoyo, 200 ms) started together" },
  pathDraw:  { duration: 260, ease: "Sine.Out", trigger: "the path line's end point tweens from the previous pad to the new pad (Graphics redrawn each frame)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "out-of-order pad" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "glowRing on the correct next pad (from alpha 0.2); stopped when that pad is hopped" },
  ribbit:    { scaleY: 0.8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "frog on the last pad" },
  pathGlow:  { alpha: 0.4, duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "whole path once on item complete" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "pads and path after item complete" },
  glide:     { duration: 300, ease: "Sine.InOut", trigger: "frog back to the bank (x, y set at call)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new pads (from alpha 0, scale 0.6)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "inactivity cue on the smallest pad" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish frog" }
};
```
No flashing: `showMe` cycles at 1 Hz; `pathGlow` plays once.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]         ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ ┌bank┐  ~~~~~~~~~~~~~~ ART.pond (380,270) 640×400 ~~~~~~~~~~ │
      │ │frog│      (P)              (P)                 (P)          │  zone A
      │ │    │                                                        │
      │ │sign│              (P)                    (P)                │
      │ └────┘  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ (P) ~~~~~~~~~~~ │  zone B
      │ (70,270)                                                      │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: P = a lily-pad tile (numeral over ART.pad on ART.padTile). Pad positions (fixed per pad count; numerals shuffled among them):
- 4 pads: (220, 120) · (460, 110) · (300, 330) · (560, 330)
- 5 pads: (200, 110) · (440, 100) · (620, 200) · (280, 320) · (500, 380)
- 6 pads: (190, 110) · (400, 95) · (600, 150) · (240, 300) · (450, 300) · (620, 400)
Every pair of pads is ≥ 120 px apart centre to centre (gap ≥ 40 between 80-px tiles). The bank is at (70, 270); the frog rests at (70, 240); the signpost at (70, 340).

## Visual specification
- Background: `THEME.colour.bg`; `ART.pond` centred (380, 270) beneath everything.
- Rail: 8 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 283 + i × 22); filled dots use `ART.dotFull`.
- `ART.bank` at (70, 270); `ART.frog` at (70, 240) at rest; `ART.signpost` at (70, 340) with the last hopped numeral (24 px `THEME.font.display` `THEME.colour.ink`) or `ART.nextPair` during the teen hint.
- Pads: `makeTile` 80 × 80 with `ART.padTile` tokens, the `ART.pad` glyph drawn at the tile centre and the numeral (44 px `THEME.font.display` `THEME.colour.ink`) drawn over it; locked look = fill `THEME.colour.structureSoft`, stroke `THEME.colour.structure` 3 px, `ART.hopBadge` at (+28, −28) with the hop number in `THEME.colour.bg` 16 px.
- `ART.path` segments drawn on one `Graphics` object beneath the pads, bank → pad 1 → pad 2 …
- `ART.glowRing` behind the correct next pad; `ART.underline` centred 30 px below a numeral's centre.
- Tap floors: pads 80 × 80 (5-6 floor); gaps ≥ 40.
- Tab order: pads in reading order of their POSITIONS (top-to-bottom, left-to-right), not numeric order — so keyboard users also have to find the next numeral.
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral: numerals only. `LOCALE_DATA` not needed.

Items as consecutive runs (smallest … largest); pad count = run length:
- **L1** (4 pads, within 1-8, mostly starting at 1): 1-4 · 1-4 · 2-5 · 3-6 · 4-7 · 5-8
- **L2** (5 pads, within 1-12, starting mid-sequence; two runs hold both 6 and 9): 6-10 · 3-7 · 8-12 · 5-9 · 7-11 · 2-6
- **L3** (6 pads, within 10-20): 11-16 · 14-19 · 15-20 · 12-17 · 13-18 · 10-15

Play list: 8 items; start at L1; shuffle within the level without repeats; level changes per Rules; the same run is never played twice in a session; if a pool is exhausted it is reused reshuffled. Numeral-to-position assignment is shuffled per item and re-rolled if it comes out in left-to-right ascending order.

## Rules
- Item count: 8 (each item = one complete run of 4-6 hops).
- Difficulty progression: after 2 consecutive first-try items, the next item comes from the next level up (cap L3). "First-try" = every hop in the run was made with no wrong tap.
- Adaptation: 2 or more wrong taps within one item, or a non-first-try result on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 6 s pass with no tap, the correct next pad `ANIM.pulse`s once (on item 1 this is also the mechanic's demonstration: the smallest pad pulses). Repeats every 6 s of inactivity. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: per hop — `tone("tap", k)`, `ANIM.hop`, pad locks with `ART.hopBadge`, `ANIM.pathDraw`, signpost updates. Per completed run — `tone("correct")`, `ANIM.ribbit`, `ANIM.pathGlow`, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Skipping ahead / out of order** (stable-order): `ANIM.nudge`, `tone("nudge")`; second wrong tap at the same step → `ART.glowRing` on the correct next pad; third → the frog hops there by itself.
  - **Not starting at the smallest** (always-start-at-1 habit): the same ladder applied to the first tap.
  - **6 / 9 mirror tap**: `ART.underline` under both numerals for 1200 ms, then the nudge; the ladder step still counts.
  - **Teen numeral confusion** (L3): `ART.nextPair` "15 16" on the signpost for 1200 ms, then the nudge.
  - **Tapping a locked pad**: nothing happens (not an error).
- Retry behaviour: per step — attempt 1 unaided → attempt 2 with the glow ring → attempt 3 the frog hops by itself (solved-with-help); the run then continues. No attempt 4. A run with any wrong tap does not count as first-try.
- Finish condition: 8 runs completed → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Number Line Hop"
  - No text appears on the play screen; the numerals are the whole content.

## Sound
`GameCore.tone` only (§11): `tone("tap", k)` on the k-th hop of a run (pitch rising hop by hop, F-213); `tone("correct")` when the run completes; `tone("nudge")` on an out-of-order tap (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show (the badge and the path carry the order).

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "All done!", "Play again", "Menu" and the praise pops; the play screen has no words.
- [ ] Works at narrow width: in a 400-px-wide iframe the pond, bank, six pads and the signpost are visible and the pads are separate targets.
- [ ] Keyboard operable: Tab walks the pads in position order; Enter taps; Enter on a locked pad does nothing.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: tapping out of order repeatedly still ends with the frog hopping by itself and every run completing; the session reaches "All done!".
- [ ] Tapping the smallest numeral first makes the frog hop to it, draws a line from the bank, and shows a "1" badge on the pad.
- [ ] Tapping a numeral out of order makes the pad wiggle and nothing else moves; the second wrong tap at the same step makes the correct next pad glow.
- [ ] Tapping 9 when 6 is next shows a coral bar under both numerals before the wiggle.
- [ ] At the second level runs start mid-sequence (e.g. 6-10) and the smallest numeral is not 1.
- [ ] At the third level runs are within 10-20 and a wrong tap shows the last and next numerals side by side on the signpost.
- [ ] Two clean runs in a row bring longer runs; two runs with mistakes bring shorter ones.
- [ ] The numerals are never laid out left-to-right in ascending order.
- [ ] The finish screen shows eight run chips (e.g. "1-4", "6-10") and no score or stars.
- [ ] With `?sound=off` nothing is audible; with sound on, each hop is a higher note than the previous.
