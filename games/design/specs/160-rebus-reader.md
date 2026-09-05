# 160 — Rebus Reader

## Identity
- Slug: `rebus-reader`
- Subject / topic: Literacy / reading a three-picture sentence — reading a row of three pictures left to right (character + position + object, "cat on box") as one meaning and choosing the scene it describes
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Band note: **no instruction text on the play screen** — the prompt is a rebus row of three pictures on a card, the answers are three scene tiles ≥ 80 px, and the first item is discoverable by tapping. Language-neutral by construction: the "sentence" is pictures and a position icon (on / in / under — the pre-academic position-word core, F-215), so no `LOCALE_DATA` is needed; all 11 languages read left to right. Nothing is spoken.

## Learning
- Objective: Reads a three-picture row left to right — a character, a position icon (on / in / under) and an object — as one statement, and taps the one scene among three that shows exactly that character in that position with that object.
- Prerequisites: Recognises the pictured animals and objects; knows on / in / under as positions in the play language (position words are in every system's pre-primary core, F-215). No letters, no numerals.
- Curriculum links: F-22 (reading with comprehension by 8 — the rebus row is the pre-reading form of "read left to right and take a meaning from a sequence of symbols"), F-129 ("literal recall fine … picture-supported" — this is the picture-only layer), F-7 (comprehension-as-concept transfers to all 11 languages), F-215 (position words are pre-academic core, safe at 5-6), F-40 (cued recognition with immediate feedback), F-31 row "Position words (on/under/next to)" — conservative 6, earliest 4 → 5-6 (US K.G.A.1 "describe … using terms such as above, below, beside"; England Reception ELG "positional language"; Germany Vorschule "Raumlagebegriffe"; France GS "se repérer dans l'espace — sur, sous, dans"; Netherlands groep 1-2 "op, in, onder"; Spain Infantil "nociones espaciales"; Brazil EI03ET04; Sweden förskoleklass "lägesord"; Finland esiopetus "sijaintikäsitteet").
- Common misconceptions (F-129, F-125, F-101), each with this game's response:
  1. **Reads only the first picture — taps any scene with the right character.** Response: two of the three scenes always share the character, so the first token never decides; on a wrong tap the rebus tokens light left to right (`ANIM.readBack`) and the token the child skipped is ringed (`ART.tokenRing`) with a line (`ART.linkLine`) drawn to the element in the TAPPED scene that does not match it — "this picture-word says on; look, here it is under".
  2. **Ignores the position icon (treats "on" and "under" as the same).** Response: L2 distractors differ from the answer ONLY in position; the link cue rings the position icon and draws the line to the character's place in the tapped scene; the position icons are shapes that differ in FORM (ball above the bar / ball below the bar / ball inside the open box), never in colour only.
  3. **Reads the row in any order (starts from the right or the middle).** Response: the read-back after every wrong tap lights the tokens strictly left to right with three rising tones, so the reading direction is enacted each time; the card carries a small `ART.startArrow` at its left edge as the standing cue.
  4. **Matches on the object alone (taps the scene with the same box whatever is on it).** Response: L1 distractors differ in the character or in the object, L3 in either — the link cue names whichever token was ignored.
  5. **Position habit.** Response: the correct tile's slot never repeats twice running (§13); at 5-6 the tiles keep their positions after a wrong tap (the item counts as retried); the third attempt gets the show-me ring.

## How it plays
1. **Start screen**: title "Rebus Reader", the frog (`ART.frog`) at (360, 200), Start, picker.
2. **Item 1 (L1: cat ON box)**: rail of 8 dots (§6) at y = 28 (no numbers — 5-6 band). Zone A: the rebus card (`ART.rebusCard`, 420 × 100) at (360, 130) with `ART.startArrow` at its left edge (166, 130); three tokens on it: `ART.picCat` at (260, 130) at 64 px, the position icon ON at (360, 130) — `ART.relBar` with `ART.relBall` sitting on top of it — and the object at (460, 130): the box, drawn as `ART.boxBack` with `ART.boxFront` over it (a closed crate look when nothing is inside). The frog sits at (70, 130) at 56 px. Zone B: three scene tiles (`ART.sceneTile`, 150 × 130) at y = 380, x = 180 / 360 / 540, each a composed scene (Content): cat on box · dog on box · cat on bed, shuffled. No caption, no words.
3. **Answering**: the child taps a scene.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the rebus tokens light left to right once (`ANIM.readBack` with `tone("tap", 1..3)`) and the rebus card glows (`ART.cardGlow`, `ANIM.glow`); the frog `ANIM.hop`; rail dot fills; next item after 800 ms (`ANIM.appear`).
   - **Wrong**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays where it is; then the read-back (tokens left to right, three rising tones) and the link cue: `ART.tokenRing` around the token the tapped scene does not match, and `ART.linkLine` from that token to the mismatching element of the tapped scene, for 1200 ms; tiles disabled during the cue. Attempt 2.
   - **Second wrong tap**: the cue again, then the show-me ring (`ART.showRing`, `ANIM.showMe`) on the correct scene; tapping it completes the item as solved-with-help (no praise pop; the glow still plays).
4. **Items 2-8**: per Content/Rules. L1 position always ON; distractors differ in the character or the object; L2 positions on / in / under; distractors differ in the position; L3 positions mixed; one distractor differs in the position and one in the character or object.
5. **Re-queue** (F-41): an item wrong first-try re-enters after 2 intervening items with re-shuffled tiles; the count stays 8.
6. **Finish**: `t("all_done")` (360, 110); the frog (360, 200) `ANIM.celebrate`; the summary = the eight scenes the child chose as small chips (`ART.sceneChip`, 110 × 60, the scene composed at 0.45 scale) in two rows of four from y = 330 (x = 195 + i × 110) — no score, no numbers (5-6 band); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  frog:       { kind: "emoji", value: "🐸", size: 80 },                     // mascot
  rebusCard:  { kind: "shape", shape: "roundRect", w: 420, h: 100, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  cardGlow:   { kind: "shape", shape: "roundRect", w: 436, h: 116, fill: "structureSoft", radius: 20 },   // behind the card, alpha 0 → 1 → 0
  startArrow: { kind: "shape", shape: "polygon", points: [[-6,-8],[6,0],[-6,8]], fill: "inkSoft" },       // reading-direction cue at the card's left edge
  relBar:     { kind: "shape", shape: "rect", w: 56, h: 10, fill: "structure" },                          // the surface in the position icon
  relBall:    { kind: "shape", shape: "circle", r: 12, fill: "accent" },                                  // the "thing" in the position icon: above the bar = on, below = under, inside the box = in
  relBox:     { kind: "shape", shape: "roundRect", w: 56, h: 44, stroke: "structure", strokeWidth: 4, radius: 6 },   // open box outline for the IN icon (no fill)
  boxBack:    { kind: "shape", shape: "roundRect", w: 64, h: 52, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 6 },   // the box object, back panel
  boxFront:   { kind: "shape", shape: "rect", w: 64, h: 26, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },             // the box object, front lip — drawn OVER a character that is "in"
  sceneTile:  { kind: "shape", shape: "roundRect", w: 150, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  tokenRing:  { kind: "shape", shape: "circle", r: 36, stroke: "accent", strokeWidth: 4 },               // around the ignored rebus token
  linkLine:   { kind: "shape", shape: "line", w: 200, stroke: "accent", strokeWidth: 4 },                // endpoints set at runtime: token → mismatching scene element
  showRing:   { kind: "shape", shape: "roundRect", w: 162, h: 142, stroke: "structure", strokeWidth: 4, radius: 20 },
  sceneChip:  { kind: "shape", shape: "roundRect", w: 110, h: 60, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // characters (drawn at 64 px on the card, 36 px in a scene)
  picCat:     { kind: "emoji", value: "🐱", size: 64 },   // cat
  picDog:     { kind: "emoji", value: "🐶", size: 64 },   // dog
  picFrogChar:{ kind: "emoji", value: "🐸", size: 64 },   // frog (as a character, distinct from the mascot entry)
  picMouse:   { kind: "emoji", value: "🐭", size: 64 },   // mouse
  picBird:    { kind: "emoji", value: "🐦", size: 64 },   // bird
  picRabbit:  { kind: "emoji", value: "🐰", size: 64 },   // rabbit
  // objects (drawn at 64 px on the card, 52 px in a scene); the box is the shape pair above
  picBed:     { kind: "emoji", value: "🛏️", size: 64 },   // bed
  picChair:   { kind: "emoji", value: "🪑", size: 64 },   // chair (Unicode 12)
  picTree:    { kind: "emoji", value: "🌳", size: 64 },   // tree
  picUmbrella:{ kind: "emoji", value: "☂️", size: 64 }    // umbrella
};
```
No emoji newer than Unicode 12 is used, so no `fallback` is required. Every picture is an object whose English name is unambiguous; no words appear on the play screen.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct scene tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong scene tile" },
  readBack:  { scale: 1.15, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "each rebus token in turn, left to right, 300 ms apart, with tone(tap, k)" },
  linkIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "tokenRing and linkLine (from alpha 0)" },
  glow:      { alpha: 1, duration: 250, ease: "Sine.Out", yoyo: true, hold: 400, trigger: "cardGlow behind the rebus card on a correct answer (from alpha 0)" },
  hop:       { y: "-=14", duration: 150, ease: "Sine.Out", yoyo: true, repeat: 1, trigger: "frog on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new rebus card and scene tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct scene (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish frog" }
};
```
No flashing: `showMe` cycles at 1 Hz; nothing else repeats. Nothing moves while the child is thinking (F-42).

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ frog    > ┌──────────────────────────────────────┐            │
      │ (70,130)  │   cat        ●▬▬        [box]       │  card      │  zone A
      │           │  (260)      (360)       (460)       │  (360,130) │
      │           └──────────────────────────────────────┘  420×100   │
260   ├──────────────────────────────────────────────────────────────┤
      │    ┌────────┐     ┌────────┐     ┌────────┐   scenes y=380    │  zone B
      │    │ cat on │     │ dog on │     │ cat on │   x=180/360/540   │
      │    │  box   │     │  box   │     │  bed   │   (150×130)       │
      │    └────────┘     └────────┘     └────────┘                   │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. ●▬▬ stands for the ON icon (ball above bar).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22) → `ART.dotFull`; no `question_x_of_y` (5-6).
- Rebus card: `ART.cardGlow` behind `ART.rebusCard`, both at (360, 130); `ART.startArrow` at (166, 130); tokens at x = 260 / 360 / 460, y = 130: the character at 64 px; the position icon — ON: `ART.relBar` at (360, 138) with `ART.relBall` at (360, 118); UNDER: `ART.relBar` at (360, 122) with `ART.relBall` at (360, 142); IN: `ART.relBox` at (360, 132) with `ART.relBall` at (360, 136); the object at 64 px, or the box as `ART.boxBack` at (460, 132) + `ART.boxFront` at (460, 145).
- Scenes: `makeTile` 150 × 130 with `ART.sceneTile` tokens; inside, relative to the tile centre: the object at (0, +4) at 52 px (the box as `ART.boxBack` at (0, +8) + `ART.boxFront` at (0, +21)); the character at 36 px — ON: at (0, −36); UNDER: at (0, +46); IN (box only): at (0, −4), drawn BETWEEN `ART.boxBack` and `ART.boxFront` so its head shows above the lip. Scenes are composed at runtime from these offsets; no scene is a single emoji.
- Cues: `ART.tokenRing` around a token; `ART.linkLine` from the token's centre to the mismatching scene element (the character spot, the icon's counterpart = the character spot, or the object spot); `ART.showRing` behind the correct tile.
- `ART.frog` at (70, 130) at 56 px. Tap floors: scenes 150 × 130 ≥ 80; gaps 30.
- Keyboard: Tab across the three scenes; Enter taps. During a cue (≤ 2.2 s) tiles are `setEnabled(false)`.

## Content
Language-neutral (pictures and position icons only). `CONTENT` = `{ L1: [...], L2: [...], L3: [...] }`; an item = `{ answer: { who, rel, obj }, distractors: [{ who, rel, obj }, { who, rel, obj }] }` with `rel` ∈ `on | in | under` and `obj` ∈ `box | ART key`. Every distractor differs from the answer in exactly one element (L1: who or obj; L2: rel; L3: one differs in rel, the other in who or obj). "in" is used only with the box.

- **L1** (rel = on; distractors differ in who or obj):
  1. cat on box — [dog on box, cat on `ART.picBed`]
  2. `ART.picFrogChar` on `ART.picChair` — [`ART.picBird` on `ART.picChair`, `ART.picFrogChar` on `ART.picBed`]
  3. `ART.picMouse` on `ART.picBed` — [`ART.picRabbit` on `ART.picBed`, `ART.picMouse` on box]
  4. `ART.picBird` on `ART.picTree` — [`ART.picCat` on `ART.picTree`, `ART.picBird` on box]
- **L2** (distractors differ in rel):
  5. `ART.picCat` under `ART.picBed` — [`ART.picCat` on `ART.picBed`, `ART.picCat` in box]
  6. `ART.picDog` in box — [`ART.picDog` on box, `ART.picDog` under box]
  7. `ART.picFrogChar` under `ART.picUmbrella` — [`ART.picFrogChar` on `ART.picUmbrella`, `ART.picFrogChar` in box]
  8. `ART.picBird` in box — [`ART.picBird` on box, `ART.picBird` under box]
- **L3** (one distractor differs in rel, the other in who or obj):
  9. `ART.picMouse` in box — [`ART.picMouse` under box, `ART.picCat` in box]
  10. `ART.picRabbit` under `ART.picTree` — [`ART.picRabbit` on `ART.picTree`, `ART.picRabbit` under `ART.picChair`]
  11. `ART.picCat` on `ART.picChair` — [`ART.picCat` under `ART.picChair`, `ART.picDog` on `ART.picChair`]
  12. `ART.picDog` under `ART.picUmbrella` — [`ART.picDog` in box, `ART.picBird` under `ART.picUmbrella`]

(In items 1 the character keys are `ART.picCat` and `ART.picDog`.) The link cue targets the differing element of the tapped distractor: a who-difference rings the character token and lines to the scene's character; a rel-difference rings the position icon and lines to the scene's character spot; an obj-difference rings the object token and lines to the scene's object. Play list: 8 items per Rules; shuffled within level; no item repeats except by re-queue; tile order shuffled per item; the correct slot never repeats twice running.

## Rules
- Item count: 8 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- Inactivity cue (never a clock, nothing ends): if 8 s pass with no tap, the rebus tokens `ANIM.readBack` once with their rising tones; repeats every 8 s of inactivity.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try item, the tokens read back once and the card `ANIM.glow`s, frog `ANIM.hop`, rail dot, next item after 800 ms.
- What happens on a wrong answer:
  - Scene with the right character but wrong object (first-picture reading): nudge + `tone("nudge")`; read-back; `ART.tokenRing` on the object token + `ART.linkLine` to the scene's object.
  - Scene with the wrong position (position ignored): nudge + tone; read-back; ring on the position icon + line to the scene's character.
  - Scene with the wrong character (object-only matching): nudge + tone; read-back; ring on the character token + line to the scene's character.
  - Second wrong tap: the cue again + the show-me ring on the correct scene.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4; the item re-queues later. A brute-forced item never counts as first-try (F-65).
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Rebus Reader". No words on the play screen.

## Sound
`tone("tap", k)` on the k-th rebus token during a read-back (three rising notes, left to right — the reading direction is audible); `tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the pictures carry the sentence.

## Testing checklist
- [ ] Works in all 11 languages (only the chrome strings change; the rebus rows and scenes are identical in every language).
- [ ] Works at narrow width (400-px iframe: the rebus card and three scene tiles visible and separate).
- [ ] Keyboard operable (Tab across the three scenes; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] No word appears on the play screen — only pictures and the position icons.
- [ ] The position icons differ in shape: ball above the bar (on), ball below the bar (under), ball inside the open box (in).
- [ ] For "cat on box", tapping the "cat on bed" scene nudges it, lights the three tokens left to right with rising notes, rings the box on the card and draws a line to the bed in the tapped scene; the tiles do not move.
- [ ] Tapping the "cat on box" scene pops it and the card glows.
- [ ] At the second level the three scenes show the same character and object in three different positions.
- [ ] A character that is "in" the box shows its head above the box's front lip.
- [ ] The correct scene is never in the same slot twice running.
- [ ] The finish screen shows eight small scene chips and no score or numbers.
- [ ] With `?sound=off` nothing is audible.
