# BUILD-CONVENTIONS — the shared contract every game spec cites

This file is part of every specification. A spec says "per BUILD-CONVENTIONS §n" instead of restating the rule. The build model reads this file once and applies it to every game. Nothing here is optional; a spec may add to it, never contradict it.

Version 1.0 — 2026-09-05. Companion files: `_lib/theme.js`, `_lib/ui-strings.js`, `_lib/game-core.js`, `_test/demo.html`, `catalogue/PATTERNS.md`.

---

## §1 File skeleton (identical for all 200 games)

Every game is exactly one file, `/games/<slug>/index.html`, loading the shared libraries by relative path. Copy this skeleton verbatim; only the parts marked `GAME:` change.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>GAME: Title</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link id="webfont" rel="stylesheet" href="" />
  <style>
    /* Fixed pixel sizing. No vh units. No ResizeObserver. */
    html, body { margin: 0; padding: 0; background: #FBF3E4; }
    #game { width: 100%; }
    canvas { display: block; margin: 0 auto; }
  </style>
</head>
<body>
  <div id="game"></div>
  <script src="../_lib/theme.js"></script>
  <script src="../_lib/ui-strings.js"></script>
  <script src="../_lib/phaser-3.90.0.min.js"></script>
  <script src="../_lib/game-core.js"></script>
  <script>
    document.getElementById("webfont").href = THEME.font.webfontUrl;
    GameCore.init({});
    GameCore.reportHeight();

    // GAME: ART registry  (§4)  — the ONLY place an emoji may appear
    const ART = { /* ... */ };
    // GAME: ANIM registry (§5)  — the ONLY place motion is described
    const ANIM = { /* ... */ };
    // GAME: STRINGS       (§9)  — game-specific text, English only, keyed
    const STRINGS = { /* ... */ };
    // GAME: CONTENT       (§8)  — the items, exactly as the spec lists them
    const CONTENT = [ /* ... */ ];

    // Boot scene: start screen + language picker. Games NEVER auto-start.
    var Boot = new Phaser.Class({
      Extends: Phaser.Scene,
      initialize: function Boot() { Phaser.Scene.call(this, "Boot"); },
      create: function () {
        var self = this;
        GameCore.makeStartScreen(this, "GAME: Title", function () { self.scene.start("Play"); });
        GameCore.makeLanguagePicker(this, 16, 16);
        GameCore.reportHeight();
      }
    });

    // Play scene: the game (§3 layout, §6 progress, §7 rules).
    var Play = new Phaser.Class({
      Extends: Phaser.Scene,
      initialize: function Play() { Phaser.Scene.call(this, "Play"); },
      create: function () { /* GAME */ }
    });

    // Finish scene (§10): summary + Play again + Menu. No score numbers for 5-6.
    var Finish = new Phaser.Class({
      Extends: Phaser.Scene,
      initialize: function Finish() { Phaser.Scene.call(this, "Finish"); },
      create: function () { /* GAME */ }
    });

    new Phaser.Game({
      type: Phaser.AUTO,
      parent: "game",
      width: 720,
      height: 560,
      backgroundColor: THEME.colour.bg.hex,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_HORIZONTALLY },
      scene: [Boot, Play, Finish]
    });
  </script>
</body>
</html>
```

The one raw hex in the file is the `<style>` body background, which must equal `THEME.colour.bg.hex` (`#FBF3E4`); it cannot read THEME because CSS loads before the script. Everything else takes colours from THEME.

## §2 Stage geometry and sizing

- Logical stage: **720 × 560** (width × height). Phaser `Scale.FIT` scales the whole canvas to the iframe width, so the game never assumes a viewport. All coordinates in specs are logical pixels on this stage, origin top-left, `(0,0)` to `(720,560)`.
- A spec's **Screen layout** section may declare a taller stage (max 720 × 720) when a grid needs it; then `height` in the Phaser config changes and nothing else.
- **Never** use `vh` units, `window.innerHeight`, or a `ResizeObserver`. Height is reported to the host by `GameCore.reportHeight()`; call it once in every scene's `create()` and after any layout change.
- `?embed=1` (`GameCore.isEmbedded === true`): hide the language picker (the host page already chose the language). Nothing else changes.
- Safe margins: keep every interactive element at least **16 px** from the stage edge (makeButton/makeLanguagePicker already clamp themselves).
- Text width budget: design every text box for **1.6 × the English width** (German compounds, Finnish inflections). Fit-to-width shrinking is built into `makeButton` / `makeTile`; plain `scene.add.text` labels must set `wordWrap: { width: <box width> }` and a maximum of two lines.

## §3 Tap targets, keyboard, pointer

| Band | Minimum tap target (logical px) | Why |
|---|---|---|
| 5-6 | **80 × 80** | 64 px real at 0.8 FIT scale (a 576-px iframe) |
| 6-8 and 8-9 | **56 × 56** | 44 px real at 0.8 FIT scale |
| Gap between adjacent targets | **≥ 12** | prevents mis-taps |

- Every tappable thing is a `GameCore.makeTile(...)` or a `GameCore.makeButton(...)`. Both are keyboard-registered by the library: **Tab / Shift-Tab / arrow keys** move a visible focus ring, **Enter / Space** taps. A spec never invents its own keyboard scheme; it only states the Tab order (default: creation order, left-to-right, top-to-bottom).
- `makeButton` is for the fixed 220 × 72 chrome buttons (Start, Play again, Menu, Next). `makeTile` is for everything the child chooses between.
- Pointer events only (`pointerdown / pointerup`), never mouse-only events; tablets are the primary device. Hover effects are cosmetic and must not carry meaning.
- Drag-and-drop (PATTERNS P5) is allowed only in the 6-8 and 8-9 bands and always with the tap-tap fallback (select source, then tap destination) built in the same game.

## §4 The ART registry

- One `const ART = { ... }` block at the top of the file. Every visual element the game draws is one entry. **No emoji literal and no shape parameters appear anywhere else in the file.**
- Entry kinds:
  - `{ kind: "svg", value: LCSArt.get("fox.idle"), size: 96 }` or `{ kind: "svg", value: "<svg viewBox='0 0 64 64'>…</svg>", size: 64 }` — **the DEFAULT for every BUILT game (build phase, 2026-09-05).** Shared characters/objects live in `_lib/art.js` (`LCSArt.register/get`, tokens as `var(--structure)` resolved to THEME hex); game-specific art is an inline SVG string. `GameCore.preloadArt(scene, ART)` in the Play scene's `preload` registers the textures; `GameCore.drawArt(scene, ART, key, x, y, opts)` draws any kind. Rules: 1:1 viewBox, no external references, ≤ 6 KB per entry, style per `games/ART-BIBLE.md`. `_tools/check-build.js` fails a built game that draws an emoji outside a declared `fallback`.
  - `{ kind: "emoji", value: "🐱", size: 64, fallback: "🐈" }` — the SPEC-time form (the 200 specs were written with it); in a built game an emoji may remain only as the declared `fallback` of an `svg` entry. `size` is the font size in logical px. `fallback` is mandatory when `value` is an emoji newer than Unicode 12 (2019); the build model renders `fallback` only if the platform lacks the glyph (test: `measureText` width of `value` ≈ width of U+FFFD).
  - `{ kind: "shape", shape: "roundRect" | "rect" | "circle" | "ellipse" | "polygon" | "line" | "arc", w, h | r | points, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 }` — `fill` / `stroke` are THEME colour token NAMES (`"surface"`, `"structure"`, `"accent"` …), resolved as `THEME.colour[name]`. Never a hex.
  - `{ kind: "text", value: "10", size: 40, font: "display", color: "ink" }` — for numerals/words that are art (e.g. a big target numeral), not for UI copy.
- The spec's **Art registry** section lists the block in this exact shape. The **Visual specification** and **How it plays** sections refer to entries as `ART.key`.
- The build phase realised the "later art upgrade" from day one: built games use `GameCore.drawArt` (in `_lib/game-core.js`), which is the only code that knows about kinds. The reference helper below is the spec-time sketch it grew from and is kept for reading the specs:

```js
// Draw one ART entry centred at (x, y). Returns the game object.  [spec-time sketch; built games call GameCore.drawArt]
function draw(scene, key, x, y, opts) {
  var a = ART[key]; opts = opts || {};
  if (a.kind === "emoji" || a.kind === "text") {
    return scene.add.text(x, y, a.value, {
      fontFamily: THEME.font[a.font || "body"], fontSize: (opts.size || a.size) + "px",
      color: THEME.colour[a.color || "ink"].hex
    }).setOrigin(0.5);
  }
  var g = scene.add.graphics({ x: x, y: y });
  if (a.fill)   g.fillStyle(THEME.colour[a.fill].num, 1);
  if (a.stroke) g.lineStyle(a.strokeWidth || 2, THEME.colour[a.stroke].num, 1);
  /* shape switch: roundRect / rect / circle / ellipse / polygon / line / arc, all centred on (0,0) */
  return g;
}
```

## §5 The ANIM registry

- One `const ANIM = { ... }` block. Every motion is one entry, run only through `GameCore.playAnim(scene, target, ANIM.name)`. No inline `scene.tweens.add` in game code.
- Entry shape = a Phaser tween config without `targets`: `{ scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, repeat: 0, delay: 0 }`, plus optional documentation keys `trigger` and `note` (ignored by the runner).
- House animations every game may use (copy into the game's ANIM block; a spec may add more):

| name | config | used for |
|---|---|---|
| `pop` | `{ scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true }` | a tile was chosen |
| `settle` | `{ scale: 1.0, duration: 120, ease: "Sine.Out" }` | return to rest |
| `nudge` | `{ x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1 }` | "not yet" — a gentle sideways wiggle, never a shake that reads as anger |
| `glide` | `{ duration: 260, ease: "Sine.InOut" }` + the target `x`/`y` set by the game | an object moving to a slot |
| `rise` | `{ y: "-=40", alpha: 0, duration: 400, ease: "Sine.In" }` | a label floating away |
| `appear` | `{ alpha: 1, scale: 1, duration: 200, ease: "Back.Out" }` from `alpha 0, scale 0.6` | a new item arriving |
| `celebrate` | `{ angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3 }` | finish screen only |

- No flashing: nothing may toggle visibility faster than 3 times per second. No full-screen colour flashes.

## §6 Progress and state, readable without reading

- A **dot rail** shows progress: one hollow circle per item (`ART.dotEmpty`, shape circle r 8, stroke `line`), filled (`ART.dotFull`, fill `structure`) when done. Positioned along the top at y = 28, centred, 22 px apart. For more than 15 items, group into a segmented bar of the same tokens. **Never a numeric score for the 5-6 band**; the 6-8 / 8-9 bands may show `t("question_x_of_y")` beside the rail.
- The **current task** is always visible in one fixed prompt area (§7 layout zone A). For the 5-6 band the prompt is an ART element (picture/numeral) plus at most three words.
- What just happened is shown by the tile itself (§7.4) and by `GameCore.showPraise`, never only by sound or colour.

## §7 Standard layout zones (720 × 560)

```
y   0 ─────────────────────────────────────────────── 720
    │ [lang picker 16,16]   • • • • • • • • (dot rail y=28) │  zone T  chrome, 0-56
 56 ├────────────────────────────────────────────────┤
    │             zone A — PROMPT / STAGE             │  56-260   the thing to think about
260 ├────────────────────────────────────────────────┤
    │             zone B — CHOICES / WORKSPACE        │  260-480  the tiles the child acts on
480 ├────────────────────────────────────────────────┤
    │   zone C — feedback line + optional Next        │  480-560
560 └────────────────────────────────────────────────┘
```

A spec's Screen layout section places elements within these zones with coordinates. When the iframe is narrower, FIT scales everything uniformly; nothing reflows. A spec must say what stays fixed (everything, by default).

### §7.1 Choice tiles
Tiles in zone B are laid out in a centred row or grid: for N tiles of width w and gap g, the first x = `360 − ((N−1) × (w+g)) / 2`. Use `makeTile` with `label` = an `ART` emoji/text value (looked up through ART, never inline) and the band's minimum size.

### §7.2 Selection state
Chosen = `api.setSelected(true)` (thicker `structure` stroke + `structureSoft` fill) **and** `ANIM.pop`. Colour is never the only cue: the stroke thickness change is the second cue.

### §7.3 Locking
After a correct answer, all tiles `setEnabled(false)` for the transition (≥ 500 ms) so a double tap cannot skip an item.

### §7.4 Feedback on the tile
- Correct: the chosen tile keeps the selected look; `GameCore.tone("correct")`; `GameCore.showPraise(scene, <praise key>)` with the key the spec names; `ANIM.pop` on the tile.
- Not yet: `ANIM.nudge` on the chosen tile; `GameCore.tone("nudge")`; the tile is **de-selected and stays enabled** (the child may tap it again — no lock-out); the spec's feedback string appears in zone C (§8) and, where the spec says, a **hint element** appears in zone A (e.g. the correct count highlighted). Nothing turns red; no ✗ glyph; no sad face.

## §8 Rules block — the adaptive template

Every spec fills these fields with numbers; this is the default shape they instantiate.

- **Item count**: 5-6 band 8-10 items; 6-8 band 10-12; 8-9 band 12-15. Target 5-7 minutes.
- **Levels**: 3 levels (L1 easy, L2 core, L3 stretch), each a named subset of CONTENT. Play starts at L1.
- **Progression**: after **2 consecutive correct first-try** answers at the current level, the next item comes from the next level up (cap L3).
- **Easing**: after **2 wrong attempts on one item** (or wrong first-try on 2 consecutive items) the next item comes from one level down (floor L1); the current item is never abandoned — a hint appears on the 2nd wrong attempt and the item stays until solved.
- **Success is certain**: an item never ends unsolved. On the 3rd wrong attempt the hint becomes a **show-me** (the correct tile gains a pulsing `structure` outline via `ANIM.pop` repeating) and tapping it completes the item; it counts as solved-with-help.
- **Finish**: after the item count is reached. Finish screen (§10).
- No lives, no game-over, no losing screen, no timers unless the spec justifies an optional one (default off).

## §9 Strings

- Common UI text: only `GameCore.t(key)` with keys that exist in `ui-strings.js` (start, play_again, next, correct, try_again, almost, well_done, great_job, excellent, keep_going, nice_try, you_did_it, question_x_of_y, finished, all_done, choose_answer, tap_to_choose, drag_here, match_the_pairs, sort_them, look_carefully, listen_carefully, read_the_question, menu, restart, sound_on, sound_off …).
- Game-specific text lives in `const STRINGS = { en: { key: "English" } }` and is read through a local `S(key)` that falls back to `en`. Translations for the other 10 languages are added later to the same object by the translation step; the game code never changes.
- Praise keys are rotated: `["well_done","great_job","excellent","you_did_it","keep_going"]` in order, wrapping; a spec may fix a different order.
- 5-6 band: game-specific strings are at most **3 words** each and always paired with an ART element.

## §10 Finish screen

- Zone A: `t("all_done")` title, size 52, `structure` colour, plus the game's mascot/reward `ART` element with `ANIM.celebrate`.
- Zone B: a **visual summary tied to the learning**, not a score: e.g. the completed row of objects, the filled ten-frame, the finished word list (the spec names it). For 6-8 / 8-9 optionally `t("question_x_of_y", {n: solved, total})` where solved counts first-try items — never shown for 5-6.
- Zone C: `makeButton` `play_again` (restarts Play with a fresh randomisation) and `makeButton` `menu` (returns to Boot). `GameCore.tone("finish")` once.
- `GameCore.reportHeight()` after build.

## §11 Sound

Only `GameCore.tone("tap" | "correct" | "nudge" | "finish", step?)`. The optional integer `step` raises the pitch by that many semitones: a counting game plays `tone("tap", k)` on the k-th counted object so the child hears the count climb (one note per object, pitch rising with quantity — F-213). It is silent under `?sound=off`. A game may add a mute toggle: a `makeTile` at (704−40, 16) 40 × 40 with `ART.soundOn` / `ART.soundOff` emoji (🔊 / 🔇) calling `GameCore.setSoundEnabled`. Sound never carries meaning that the screen does not also show.

## §12 Colour and accessibility rules

- Meaning is never carried by colour alone: pair with shape, position, outline weight, a symbol from ART, or text.
- Text contrast: `ink` on `bg`/`surface`; `bg` or `inkOnAccent` on `accent`/`structure`. Never `surface` (white) on `accent` (coral).
- Font sizes: 5-6 band minimum 28 px for words, 40 px for single numerals/letters; 6-8 minimum 24 px; 8-9 minimum 20 px.
- No content flashes; no rapid repeats; celebrations are ≤ 1.5 s.

## §13 Randomisation

- `CONTENT` is authored in the spec's order. At Play start the game builds the play list per the spec's rule (usually: shuffle within level, keep levels in order). Use `Phaser.Utils.Array.Shuffle`.
- Distractor positions are shuffled per item so the correct tile is never in a fixed slot.
- Two consecutive items never share the same correct tile position.

## §14 Locale-varying content

Money, units and names vary by locale. A spec that needs them declares `const LOCALE_DATA = { en: {...}, de: {...}, ... }` for all 11 codes and reads `LOCALE_DATA[GameCore.lang]`. Defaults: metric units everywhere (cm, m, kg, L, °C); currency by language — en: £ (England), de: €, fr: €, it: €, es: €, pt: R$, nl: €, sv: kr (SEK), da: kr (DKK), no: kr (NOK), fi: € — using only coin/note values that exist in that currency. Names of characters are emoji animals, not people's names.

## §15 What the build model must not decide

If a spec leaves any of these open, the build model stops and reports the gap instead of guessing: a colour, a size, a position, a string, an item, a rule threshold, a praise key, an animation, which tile is correct. Every one of those is in the spec or in this file.

> Build phase (2026-09-05): the "build model" is now Claude Code with the expert ensemble of `games/BUILD-WORKFLOW.md`; a gap is resolved in plan mode by the ensemble, never guessed in code.

## §16 Test hook contract (`window.LCS_TEST`) — every BUILT game

Every built `index.html` exposes, before Phaser boots, an object the runtime gate (`_tools/qa-game.js`) drives:

```js
window.LCS_TEST = {
  ready:   function () { /* true once Phaser has booted and the Boot scene is shown */ },
  scene:   function () { /* "Boot" | "Play" | "Finish" */ },
  strings: function () { /* { start: <the Start label in the current language>, title: … } */ },
  start:   function () { /* presses the Start button exactly as a tap would (emit pointerdown+pointerup on the makeButton container) */ },
  wrong:   function () { /* answers the current item with a WRONG choice, through the game's own handler */ },
  correct: function () { /* answers the current item with the CORRECT choice, through the game's own handler */ },
  targets: function () { /* [{ id, x, y, w, h }] of every interactive target on the current screen, logical px */ }
};
```
`wrong()`/`correct()` go through the same code path a tap takes (they call the tile's handler, never a private "set state" shortcut), so a session driven by the hook exercises the real attempt ladder, re-queue and finish logic. The gate asserts: never auto-start; all 11 `?lang=` values boot; `wrong()` then `correct()` on every item still reaches Finish (no losing state); every target ≥ 44 px real at a 704-px iframe. Games with no discrete wrong choice (a P6 sorting/ordering game, a free build) implement `wrong()` as the spec's nearest "not yet" action and document it in the hook.

## §17 Locale completeness — every BUILT game

"en pilot" is a SPEC-time state. A built game ships `STRINGS` with all 11 locale keys (en de fr it es pt nl sv da no fi) and, wherever it reads `LOCALE_DATA`, all 11 locale entries authored as native content by the content-creator + native panels of `games/BUILD-WORKFLOW.md` (word lists, minimal pairs, sentences in each locale's word order, digraphs, number words, coin sets). `_tools/check-build.js` fails a game whose STRINGS or LOCALE_DATA block is missing a locale. Nordic rows may carry an `[NSR-FLAG]` comment where a later native review is advisable; the flag is recorded in `games/BUILD-LOG.md`, never a reason to ship fewer than 11.
