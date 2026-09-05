# 006 — Letter Lantern

## Identity
- Slug: `letter-lantern`
- Subject / topic: Literacy / letter recognition — matching a target letter among visually similar letters (uppercase first, then lowercase)
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N
- Estimated build size: ~400 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the letter SET and the confusable pairs are language-bound (F-122) and live in `LOCALE_DATA`; the mechanic is universal.

## Learning
- Objective: Given a target letter shown large, taps the same letter among three tiles that include its visual confusables (mirror forms, near forms), in the same case.
- Prerequisites: None. This is a visual-discrimination task; no letter names or sounds are required (they are not spoken — no audio files — so the target is always SHOWN).
- Curriculum links: F-1 (letter recognition/formation in 9 of 15 sources), F-22 (letter names and letter-sound correspondence in all twelve systems at 5-7), F-31 row "Letter names + sounds; initial sound" — conservative 6-7, earliest 4 → 5-6 (US RF.K.1.d "recognize and name all upper- and lowercase letters"; England Reception/Y1 phonics; Germany Klasse 1 Buchstaben; France GS "reconnaître les lettres"; Spain Infantil; Brazil EF01LP04-05; Sweden förskoleklass "bokstäver"; Denmark 0. klasse letters; Finland esiopetus letter awareness).
- Common misconceptions (F-121, F-102), each with this game's response:
  1. **Mirror reversals b/d, p/q (and 6/9-style flips of N, S, Z) — developmentally normal to ~7.** Response: when the child taps the mirror twin, the two tiles slide together side by side under the lantern (`ANIM.glide`) and the target's distinguishing side is marked: `ART.bellyDot` (a coral dot) appears on the round part of BOTH letters so the child sees the belly is on the left for d and on the right for b; after 1200 ms they return. Not treated as a hard error; item counts as retried.
  2. **Near-form confusion (O/Q, C/G, E/F, M/W, V/U, n/h, i/l, u/n, r/n).** Response: the tapped near-form and the target slide together and the extra/missing stroke is traced in coral over the target (`ART.strokeHint`, a short line or curve drawn on the tile), 1200 ms.
  3. **Upper/lowercase not linked (taps A for a; b for B).** Response: never a distractor at L1 (same case only); at L3 a case-mismatch distractor appears, and tapping it shows the target morphing into its other case and back (`ART.caseGhost` drawn beside it) so the pair is linked, then the child taps again.
  4. **Choosing by position (always the middle tile).** Response: the correct tile's slot is shuffled and never repeats twice running (§13); after two wrong taps the show-me ring identifies the tile.

## How it plays
1. **Start screen**: title "Letter Lantern", the moth (`ART.moth`) at (360, 200), Start, picker.
2. **Item 1 (L1: target B; tiles B, D, P)**: rail of 10 dots (§6). Zone A: a lantern (`ART.lantern`, a rounded rectangle "glass" with a warm `bg` fill and a `structure` frame, 200 × 160) centred at (360, 160); inside it the target letter (`ART.targetLetter`, 96 px, `THEME.font.display`, `THEME.colour.structure`); the moth hovers at the lantern's top-left (250, 96) with a tiny idle-free pose (no idle animation — F-42). Zone B: three letter tiles (`ART.letterTile`, 96 × 96) at y = 380, x = 240 / 360 / 480, each showing one letter at 56 px, shuffled. Caption: none (the lantern IS the prompt: "find this one").
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation), the tile's letter flies up into the lantern (`ANIM.glide`) and the lantern glows (`ANIM.glow` — alpha of `ART.lanternGlow` to 1 and back), the moth does `ANIM.flutter`; rail dot fills; next item after 700 ms (tiles `ANIM.appear`).
   - **Wrong — mirror twin**: `ANIM.nudge`, `tone("nudge")`, then the mirror cue (misconception 1). Attempt 2.
   - **Wrong — near form**: nudge, tone, then the stroke cue (misconception 2). Attempt 2.
   - **Wrong — case mismatch (L3 only)**: nudge, tone, then the case cue (misconception 3). Attempt 2.
   - **Second wrong**: the cue again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
4. **Items 2-10**: per Content/Rules. L1 uppercase targets with two confusables; L2 lowercase targets (the hardest set: b d p q, n h, u n, i l); L3 mixed: the target shown in one case, the three tiles include the correct letter in the SAME case plus one case-mismatch distractor and one confusable.
5. **Finish**: `t("all_done")` (360, 110); the lantern at (360, 220) full of the ten found letters arranged in two rows of five inside the glass (`ART.foundLetter`, 28 px) — the visual summary — with the moth `ANIM.celebrate` beside it; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  moth:         { kind: "emoji", value: "🦋", size: 64 },
  lantern:      { kind: "shape", shape: "roundRect", w: 200, h: 160, fill: "bg", stroke: "structure", strokeWidth: 4, radius: 22 },
  lanternGlow:  { kind: "shape", shape: "roundRect", w: 216, h: 176, fill: "accent", radius: 26 },   // drawn behind the lantern at alpha 0; ANIM.glow raises it to 0.35 briefly
  targetLetter: { kind: "text",  value: "", size: 96, font: "display", color: "structure" },
  letterTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // letter label 56 px display ink
  bellyDot:     { kind: "shape", shape: "circle", r: 7, fill: "accent" },
  strokeHint:   { kind: "shape", shape: "line", w: 40, stroke: "accent", strokeWidth: 6 },   // endpoints set at runtime per confusable pair (table in Content)
  caseGhost:    { kind: "text",  value: "", size: 56, font: "display", color: "inkSoft" },   // the target's other case, drawn beside it at alpha 0.6
  foundLetter:  { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "letter into the lantern; two tiles side by side for a cue and back (x,y at call)" },
  glow:      { alpha: 0.35, duration: 220, ease: "Sine.Out", yoyo: true, trigger: "lanternGlow on correct" },
  flutter:   { y: "-=10", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "moth on correct" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tiles and target (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish moth" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │        moth (250,96)  ┌──────────────┐                        │
      │                       │  ART.lantern │  (360,160) 200×160     │  zone A
      │                       │      B       │  target 96 px          │
      │                       └──────────────┘                        │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ D ]        [ B ]        [ P ]   tiles y=380           │  zone B
      │       x=240        x=360        x=480    (96×96)               │
480   ├──────────────────────────────────────────────────────────────┤
      │   cue parking spots for two tiles: (300,470) (420,470)        │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 (`ART.dotEmpty` → `ART.dotFull`, 10 dots at x = 261 + i × 22).
- `ART.lanternGlow` behind `ART.lantern`, both centred (360, 160); `ART.targetLetter` centred in the lantern; `ART.moth` at (250, 96).
- Tiles: `makeTile` 96 × 96 with `ART.letterTile` tokens; letter label 56 px `THEME.font.display` `THEME.colour.ink`.
- Cue drawing: during a cue both tiles glide to (300, 470) and (420, 470); `ART.bellyDot` at the letter's bowl centre (offsets per letter in Content); `ART.strokeHint` per pair table; `ART.caseGhost` at (420, 96) beside the target.
- `ART.showRing` behind the correct tile. Tap floor 96 ≥ 80. Gaps 24.
- Font: letters must render in `THEME.font.display` (Baloo 2), which has a single-storey a and g; the locale table below is written for that face.

## Content
Letter sets are language-bound. `LOCALE_DATA[lang]` supplies the alphabet subset and the confusable table; the English (`en`) table is authored here and is the base for every Latin-script locale; the other ten locales ADD their extra letters/diacritics to the L3 pool and remove nothing (all eleven use the basic 26 letters; extras: de ÄÖÜß, fr ÉÈÊÀÇ, es ÑÁÉÍÓÚ, pt ÃÕÇÁÉ, it ÀÈÉÌÒÙ, nl none, sv ÅÄÖ, da ÆØÅ, no ÆØÅ, fi ÄÖ). Extras appear only as targets with their base letter as the distractor (Ä vs A) at L3.

Items = (target; distractors) — the correct tile is the target letter in the same case.
- **L1 uppercase** (10 authored, 3-4 used per session): (B; D, P) · (E; F, L) · (M; W, N) · (O; Q, C) · (V; U, Y) · (S; Z, 5-shaped decoy Z) · (K; X, R) · (G; C, O) · (T; I, J) · (H; N, A)
- **L2 lowercase**: (b; d, p) · (d; b, q) · (p; q, b) · (n; h, u) · (u; n, v) · (i; l, j) · (m; n, w) · (a; o, e) · (f; t, r) · (g; q, y)
- **L3 mixed case, one case-mismatch distractor + one confusable**: (b; B, d) · (D; d, B) · (q; Q, p) · (N; n, M) · (e; E, a) · (R; r, P) · (h; H, n) · (G; g, C) · (u; U, n) · (Q; q, O)

Cue tables (English base; a locale may override):
- `bellyDot` offsets (tile-centre relative, px): b (+12, +8) · d (−12, +8) · p (+12, −6) · q (−12, −6) · B (+10, 0) · D (+8, 0) · P (+10, −10) · R (+10, −10) · Q (0, 0) · G (0, 0).
- `strokeHint` (a coral line on the TARGET showing what the near-form lacks or adds): E vs F → horizontal at (−4, +18) length 28 (E's bottom bar); O vs Q → short diagonal at (+14, +14) length 16 (Q's tail); C vs G → horizontal at (+8, +4) length 18 (G's bar); n vs h → vertical at (−12, −12) length 24 (h's ascender); u vs n → the bowl opening: line at (0, −18) length 26 (n's closed top); i vs l → the dot: line at (0, −22) length 6 (i's dot); M vs W → the middle vertex: line at (0, +6) length 12; V vs U → the bottom point: line at (0, +18) length 10; t vs f → the crossbar: line at (0, −6) length 20; y vs g → the descender hook: line at (+8, +22) length 14.

Play list: 10 items; L1 → L2 → L3 by Rules; no target repeats in a session; correct slot never repeats twice running.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three: items take ~10-15 s.)
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every second correct item and on the tenth, the letter flies into the lantern with `ANIM.glow`, moth `ANIM.flutter`, rail dot, next item after 700 ms.
- What happens on a wrong answer:
  - Mirror twin (b/d, p/q, B/D-style): `ANIM.nudge` + `tone("nudge")`, both tiles park below with `ART.bellyDot` on each bowl for 1200 ms, then return.
  - Near form (E/F, O/Q, n/h…): nudge + tone, both park, `ART.strokeHint` drawn on the target tile for 1200 ms.
  - Case mismatch (L3): nudge + tone, `ART.caseGhost` (the target's other case) fades in beside the lantern's letter for 1200 ms.
  - Position habit (any wrong tile twice at the same slot): no special cue; the show-me ring after the second wrong tap.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Letter Lantern". No words on the play screen; letters are content, not text.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap")` when a cue starts; `tone("finish")` once. Silent under `?sound=off`. Letter names/sounds are NOT spoken (no audio files); the game is purely visual by design.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change; the letter pool follows `?lang=` — `?lang=de` produces Ä/Ö/Ü targets at the third level, `?lang=da` Æ/Ø/Å).
- [ ] Works at narrow width (400-px iframe: lantern and three tiles fully visible).
- [ ] Keyboard operable (Tab across the three tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] Tapping d when the lantern shows b parks both tiles below with a coral dot on each letter's round part, then returns them.
- [ ] Tapping F when the lantern shows E draws a coral bar on E's bottom.
- [ ] At the third level, tapping B when the lantern shows b shows a faint "B" beside the b in the lantern.
- [ ] The correct tile is never in the same position twice in a row.
- [ ] Three first-try corrects in a row switch from capitals to small letters; a wrong tap brings capitals back next.
- [ ] The finish screen shows the ten found letters inside the lantern and no score.
- [ ] Letters render in the rounded display font (single-storey a and g).
- [ ] With `?sound=off` nothing is audible.
