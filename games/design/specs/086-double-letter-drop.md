# 086 — Double-Letter Drop

## Identity
- Slug: `double-letter-drop`
- Subject / topic: Literacy / spelling patterns — when a consonant is doubled (rabbit, running, hopped, bigger) and when it is not (tiger, jumping, walked, hoping)
- Age band: `8-9`
- Interaction pattern: `P2` — tap to place (select a pattern tile from the tray, then tap the gap in the word; judged per placement)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (one destination slot; a wrong placement glides back with the hint; the arrangement is judged immediately). Locale note: the words, the gap positions, the tile pairs and the RULE itself are language-bound (F-127: doubling is an 8-9 English spelling pattern; German, Swedish, Danish, Norwegian, Italian and Finnish double consonants under different rules — in Finnish consonant length changes the meaning) and live in `LOCALE_DATA`; the `en` set is authored in full below; **other locales: a native list is required — en pilot** (A-15). The mechanic — a word with one gap, two or three tiles, a base-word card that shows the rule — is universal.

## Learning
- Objective: Completes a word by placing the correct spelling-pattern tile (a single consonant, its double, or a consonant-plus-e) into the word's gap, using the short-vowel / long-vowel / two-consonant / drop-the-e rule shown on the base word.
- Prerequisites: Spells regular words by sounds (game 085); reads two-syllable words; knows the endings -ing, -ed, -er as word parts.
- Curriculum links: F-1 (spelling in 5 of 15 sources), F-22 ("spelling … then patterns" in 11 of 12 systems; the doubling pattern is explicit in the English-family curricula), F-127 (doubling is hard and belongs at 8-9 only), F-31 row "Spell regular words by sounds" (conservative 8) extended to patterns at 8-9 (US L.2.2.d / L.3.2.e-f "use spelling patterns and generalizations (e.g., word families, position-based spellings, syllable patterns, ending rules)"; England Y2 "adding -ing, -ed, -er and -est to a root word ending in a single consonant letter after a single vowel letter"; Y3 spelling appendix). Market note: this is a rule of ENGLISH orthography; the German (Mutter/Sonne), Nordic and Italian doubling rules need their own native sets under the same mechanic, and Spanish/Portuguese/Dutch have little to teach here — a native author may reduce or replace the list.
- Common misconceptions (F-127, F-123, F-124), each with this game's response:
  1. **Never doubling ("runing", "stoped", "biger") — the commonest 8-9 error.** Response: the single tile glides back; the vowel before the gap gets `ART.vowelDot` (a coral dot under it — a short vowel) and the placed consonant visibly splits into two (`ANIM.doubleUp`: a copy slides 22 px to the right, both hold 900 ms, then fade); the feedback line shows `S("shortVowel")` ("Short vowel — double it.").
  2. **Over-doubling — doubling after a long vowel or vowel team ("tigger", "rainning", "readding").** Response: the double tile glides back; the vowel (or vowel pair) gets `ART.vowelBar` (a coral bar over it — a long sound) and the extra consonant lifts out and fades (`ANIM.dropOne`); `S("longVowel")` ("Long vowel — one letter.").
  3. **Doubling inside a consonant cluster ("jummping", "helpping", "fastter").** Response: the two consonants already after the vowel (m + the gap for jump) get `ART.pairBracket` under them, then `ANIM.dropOne`; `S("twoConsonants")` ("Two consonants already.").
  4. **Keeping the silent e ("hopeing", "bakeing", "niceer") or dropping it and doubling ("hopping" for hope).** Response: L3 shows the base word on a card; a kept-e tile (`pe`, `ke`, `le`, `ce`) glides back while the e on the base card falls away (`ANIM.eFall`) and the ending slides into its place; `S("dropE")` ("Drop the e."); a doubled tile on an e-word gets the vowel bar (the e makes the vowel long) and `ANIM.dropOne`.
  5. **Choosing by tile position or by the last answer ("it was double last time").** Response: tile order in the tray is shuffled per item and the correct tile is never in the same tray slot twice running (§13); after the second wrong placement the show-me ring identifies the tile.

## How it plays
1. **Start screen**: title "Double-Letter Drop", the rabbit (`ART.rabbit`) at (360, 200), Start, picker.
2. **Item 1 (L1: rabbit — ra_it; tiles bb / b)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the clue card (`ART.clueCard`, 130 × 100) at (140, 150) — at L1 it holds the word's picture (`ART.rabbit` at 64 px); the word card (`ART.wordCard`, 420 × 84) at (420, 150) showing the gapped word as letters (`ART.wordText`, 40 px): "ra", then the gap (`ART.gapSlot`, 72 × 64, a dashed `makeTile` inline with the letters), then "it"; the letters are laid out so the whole word (letters + gap) is centred on the card. Zone B: the tray — two pattern tiles (`ART.patTile`, 96 × 96, `makeTile`) at y = 380, x = 300 and 420, showing "bb" and "b" (36 px), shuffled. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty. No OK: one placement is the answer.
3. **Placing**: tap a tile (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap the gap; the tile glides (`ANIM.glide`) into the gap and the word reads with it.
   - **Correct (bb)**: the gap's dashed outline turns solid (`ART.gapSolved` tokens) and the word `ANIM.pop`s; `tone("correct")`; praise pop (rotation); the rabbit `ANIM.hop`; the completed word is added to the finish list; rail dot fills; next item after 900 ms (`ANIM.rise` clears, new word `ANIM.appear`s).
   - **Wrong (b)**: `tone("nudge")`; the cue for the error class (Rules) plays ON the word card — here `ART.vowelDot` under the a and `ANIM.doubleUp` on the b — then the tile glides back to the tray (`ANIM.glide`) with `ANIM.nudge`; the feedback line shows the rule string. Attempt 2.
   - **Second wrong placement**: the cue again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing it completes the item as solved-with-help (no praise pop).
   - Tapping the gap with nothing selected: the gap `ANIM.pop`s (harmless); tapping a second tile before the gap switches the selection; tapping a placed tile is not possible (a placement is judged at once).
4. **Items 2-12**: per Content/Rules. L1 = base words with a picture clue (doubles vs single-consonant words with a long vowel); L2 = a base word + "ing" on the clue card (`ART.baseText` + `ART.endingChip`) and the gapped -ing word; L3 = base + "ed" / "er" / "ing" with THREE tiles (single / double / consonant-plus-e), including the drop-the-e words.
5. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 200) `ANIM.celebrate`; the summary = the twelve completed words as `ART.wordChip`s (110 × 36, the word at 18 px with its pattern letters drawn in `THEME.colour.accent` — "ru**nn**ing" with the nn coral, drawn as three text pieces) in three rows of four (y = 320, 372, 424; x = 195 + i × 110), each with a filled `ART.dotFull` at its left for a first-placement item and a hollow `ART.dotEmpty` for a helped one — the finished word list, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  rabbit:      { kind: "emoji", value: "🐰", size: 80 },   // mascot; also the L1 picture for "rabbit" at 64 px
  clueCard:    { kind: "shape", shape: "roundRect", w: 130, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  wordCard:    { kind: "shape", shape: "roundRect", w: 420, h: 84, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  wordText:    { kind: "text",  value: "", size: 40, font: "display", color: "ink" },          // the letters around the gap
  gapSlot:     { kind: "shape", shape: "roundRect", w: 72, h: 64, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 10 },   // dashed [8,6]
  gapSolved:   { kind: "shape", shape: "roundRect", w: 72, h: 64, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 10 },
  baseText:    { kind: "text",  value: "", size: 28, font: "display", color: "structure" },    // the base word on the clue card (L2/L3)
  endingChip:  { kind: "shape", shape: "roundRect", w: 64, h: 32, fill: "accent", radius: 8 },  // "+ing" / "+ed" / "+er" 18 px display inkOnAccent
  patTile:     { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // pattern letters 36 px display ink
  vowelDot:    { kind: "shape", shape: "circle", r: 6, fill: "accent" },                         // under a short vowel
  vowelBar:    { kind: "shape", shape: "roundRect", w: 28, h: 6, fill: "accent", radius: 3 },    // over a long vowel; w 56 over a vowel pair
  pairBracket: { kind: "shape", shape: "roundRect", w: 96, h: 6, fill: "accent", radius: 3 },    // under two consonants after the vowel
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  wordChip:    { kind: "shape", shape: "roundRect", w: 110, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  // L1 picture clues — the comment is the ONE intended word
  apple:   { kind: "emoji", value: "🍎", size: 64 },   // apple
  hammer:  { kind: "emoji", value: "🔨", size: 64 },   // hammer
  butter:  { kind: "emoji", value: "🧈", size: 64 },   // butter (Unicode 12)
  bell:    { kind: "emoji", value: "🔔", size: 64 },   // bell
  egg:     { kind: "emoji", value: "🥚", size: 64 },   // egg
  hippo:   { kind: "emoji", value: "🦛", size: 64 },   // hippo (Unicode 11)
  puzzle:  { kind: "emoji", value: "🧩", size: 64 },   // puzzle (Unicode 11)
  tennis:  { kind: "emoji", value: "🎾", size: 64 },   // tennis
  cherry:  { kind: "emoji", value: "🍒", size: 64 },   // cherry
  tiger:   { kind: "emoji", value: "🐯", size: 64 },   // tiger
  spider:  { kind: "emoji", value: "🕷", size: 64 },   // spider
  tulip:   { kind: "emoji", value: "🌷", size: 64 },   // tulip
  robot:   { kind: "emoji", value: "🤖", size: 64 },   // robot
  paper:   { kind: "emoji", value: "📄", size: 64 },   // paper
  music:   { kind: "emoji", value: "🎵", size: 64 },   // music
  dotEmpty:{ kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull: { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No entry is newer than Unicode 12, so no fallbacks are needed. Letters render in `THEME.font.display` (Baloo 2, single-storey a and g).

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tile to the gap / back to the tray (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tile arriving back in the tray after a wrong placement" },
  doubleUp:  { x: "+=22", duration: 260, ease: "Back.Out", yoyo: true, hold: 900, trigger: "a copy of the placed single consonant slides right (from the letter's x), holds beside it, then returns and fades" },
  dropOne:   { y: "-=26", alpha: 0, duration: 320, ease: "Sine.In", trigger: "the second letter of a wrongly placed double lifts out of the word and fades" },
  eFall:     { y: "+=34", alpha: 0, duration: 360, ease: "Sine.In", trigger: "the e on the base card falls away; then the ending chip glides 24 px left into its place" },
  cueIn:     { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "vowelDot / vowelBar / pairBracket on the word card (from alpha 0), hold, fade" },
  pop:       { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the word card on a correct placement; the gap on an empty-handed tap" },
  hop:       { y: "-=14", duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "rabbit on a correct placement" },
  rise:      { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "word card contents and cues clearing before the next item" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new clue card, word and tray (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=12 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌───────┐   ┌──────────────────────────────────┐             │
      │  │picture│   │   r a  ┊   ┊  i t                │ wordCard    │  zone A
      │  │ or    │   │        gap (72×64)               │ (420,150)   │
      │  │run+ing│   └──────────────────────────────────┘             │
      │  └(140,150)   vowelDot under a / vowelBar over i, y=184/116   │
260   ├──────────────────────────────────────────────────────────────┤
      │                 [ bb ]        [ b ]     tray y=380            │
      │                 x=300        x=420      (96×96)               │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │              feedback line (360,500)                          │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Three-tile trays (L3) use x = 240 / 360 / 480. Fixed layout, FIT scaling. The word is laid out as [left letters][gap][right letters] with 8 px gaps, the whole group centred on the word card; the gap's x is therefore item-dependent.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.clueCard` at (140, 150): L1 = the item's picture at 64 px centred; L2/L3 = `ART.baseText` (the base word, 28 px) at (140, 136) and `ART.endingChip` at (140, 172) with "+ing" / "+ed" / "+er" in 18 px `THEME.font.display` `THEME.colour.inkOnAccent`.
- `ART.wordCard` at (420, 150); `ART.wordText` pieces (40 px) and the gap `makeTile` 72 × 64 with `ART.gapSlot` tokens (dashed) inline; on a correct placement the gap takes `ART.gapSolved` tokens and shows the pattern letters at 36 px.
- Cues on the word card: `ART.vowelDot` at (vowel x, 184); `ART.vowelBar` at (vowel x, 116) (w 56 centred over a vowel pair); `ART.pairBracket` at (midpoint of the two consonants, 184).
- Tray: `makeTile` 96 × 96 with `ART.patTile` tokens; pattern letters 36 px `THEME.font.display` `THEME.colour.ink`. `ART.showRing` behind the correct tile.
- `ART.rabbit` at (640, 150) at 56 px on the play screen. Feedback line at (360, 500), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 640.
- Tap floors 96 ≥ 56; the gap 72 × 64 ≥ 56; gaps ≥ 24. Keyboard: Tab order = tray tiles left to right, then the gap; Enter selects / places.

## Content
Language-bound: `LOCALE_DATA[lang].items`. `en` authored in full. **Other locales: a native list is required — en pilot.** Until a native list exists, `LOCALE_DATA[lang]` falls back to `en` for the items only; chrome stays localised.

Notation: gapped word (underscore = the gap) — clue — tiles (correct first; shuffled at play) — rule class (`short` = short vowel, double · `long` = long vowel, single · `cluster` = two consonants already, single · `team` = vowel team, single · `dropE` = silent e dropped, single) — the vowel letter(s) the cue marks.

- **L1 — base words with a picture clue (2 tiles)**
  1. ra_it — `ART.rabbit` — bb / b — short — a
  2. a_le — `ART.apple` — pp / p — short — a
  3. ha_er — `ART.hammer` — mm / m — short — a
  4. bu_er — `ART.butter` — tt / t — short — u
  5. be_ — `ART.bell` — ll / l — short — e
  6. e_ — `ART.egg` — gg / g — short — e
  7. hi_o — `ART.hippo` — pp / p — short — i
  8. pu_le — `ART.puzzle` — zz / z — short — u
  9. te_is — `ART.tennis` — nn / n — short — e
  10. che_y — `ART.cherry` — rr / r — short — e
  11. ti_er — `ART.tiger` — g / gg — long — i
  12. spi_er — `ART.spider` — d / dd — long — i
  13. tu_ip — `ART.tulip` — l / ll — long — u
  14. ro_ot — `ART.robot` — b / bb — long — o
  15. pa_er — `ART.paper` — p / pp — long — a
  16. mu_ic — `ART.music` — s / ss — long — u
- **L2 — base word + ing on the clue card (2 tiles)**
  17. ru_ing — run +ing — nn / n — short — u
  18. ho_ing — hop +ing — pp / p — short — o
  19. si_ing — sit +ing — tt / t — short — i
  20. swi_ing — swim +ing — mm / m — short — i
  21. cla_ing — clap +ing — pp / p — short — a
  22. jo_ing — jog +ing — gg / g — short — o
  23. jum_ing — jump +ing — p / pp — cluster — m + gap
  24. sin_ing — sing +ing — g / gg — cluster — n + gap
  25. hel_ing — help +ing — p / pp — cluster — l + gap
  26. rai_ing — rain +ing — n / nn — team — ai
  27. rea_ing — read +ing — d / dd — team — ea
  28. slee_ing — sleep +ing — p / pp — team — ee
- **L3 — base + ed / er / ing, three tiles including a kept-e tile**
  29. sto_ed — stop +ed — pp / p / pe — short — o
  30. hu_ed — hug +ed — gg / g / ge — short — u
  31. pla_ed — plan +ed — nn / n / ne — short — a
  32. dro_ed — drop +ed — pp / p / pe — short — o
  33. wal_ed — walk +ed — k / kk / ke — cluster — l + gap
  34. ho_ing — hope +ing — p / pp / pe — dropE — o (the base card shows the e)
  35. ba_ing — bake +ing — k / kk / ke — dropE — a
  36. smi_ing — smile +ing — l / ll / le — dropE — i
  37. bi_er — big +er — gg / g / ge — short — i
  38. ho_er — hot +er — tt / t / te — short — o
  39. fas_er — fast +er — t / tt / te — cluster — s + gap
  40. ni_er — nice +er — c / cc / ce — dropE — i

Play list of 12 per Rules (shuffle within level, levels in order); no word repeats; two consecutive items never share the rule class (a double is always followed by a non-double or vice versa, so "same as last time" never works twice); the correct tile's tray slot never repeats twice running (§13). Item 34 (hope) and item 18 (hop) may both occur in one session — deliberately.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-placement correct → next level (cap L3).
- Adaptation: a wrong placement, or wrong first-placement on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: the gap turns solid with the pattern letters, the word card `ANIM.pop`s, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-placement items only), rabbit `ANIM.hop`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")`; the cue plays on the word card BEFORE the tile glides back, so the child sees the wrong word for a moment and then the rule):
  - Single placed where a double belongs (short class): `ART.vowelDot` under the vowel + `ANIM.doubleUp` on the placed consonant; `S("shortVowel")`.
  - Double placed after a long vowel (long class): `ART.vowelBar` over the vowel + `ANIM.dropOne`; `S("longVowel")`.
  - Double placed after a vowel team (team class): `ART.vowelBar` (w 56) over the pair + `ANIM.dropOne`; `S("longVowel")`.
  - Double placed inside a cluster (cluster class): `ART.pairBracket` under the consonant + gap + `ANIM.dropOne`; `S("twoConsonants")`.
  - Kept-e tile on any L3 word: `ANIM.eFall` on the base card's e (for dropE words) — for non-e words the kept-e tile simply glides back with `S("twoConsonants")` or `S("shortVowel")` per the word's class; `S("dropE")` for dropE words.
  - Double placed on a dropE word ("hopping" for hope): `ART.vowelBar` over the vowel + `ANIM.dropOne` + the base card's e `ANIM.pop`s (it is the e that makes the vowel long); `S("longVowel")`.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct tile; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`): `title` = "Double-Letter Drop"; `shortVowel` = "Short vowel — double it."; `longVowel` = "Long vowel — one letter."; `twoConsonants` = "Two consonants already."; `dropE` = "Drop the e.". These four rule strings are English-orthography statements and are carried in `LOCALE_DATA.en.rules`, not in STRINGS, so a native list replaces them together with its words. The 40 items are `LOCALE_DATA.en.items` (Content).

## Sound
`tone("tap")` on selecting a tile; `tone("tap", 4)` on a placement landing; `tone("correct")` on a correct placement; `tone("nudge")` on a wrong one; `tone("tap", 2)` and `tone("tap", 2)` again 260 ms apart during `ANIM.doubleUp` (two notes for two letters); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the picture or the base card is the prompt.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu and praise change with the picker; the English word set is the pilot content under every `?lang=`; no raw key names appear).
- [ ] Works at narrow width (400-px iframe: clue card, word card with its gap, up to three tray tiles and the feedback line all visible).
- [ ] Keyboard operable (Tab walks the tray tiles then the gap; Enter selects a tile / places it in the gap).
- [ ] Never auto-starts.
- [ ] No losing state (wrong placements never end the session; the show-me ring always leads to completion).
- [ ] "ra_it" with the rabbit picture: placing "b" shows a coral dot under the a, the b splits into two for a moment, the tile returns to the tray and the line reads "Short vowel — double it."
- [ ] "ti_er" with the tiger: placing "gg" draws a coral bar over the i, the second g lifts out and fades, and the line reads "Long vowel — one letter."
- [ ] "jum_ing" with "jump +ing" on the clue card: placing "pp" draws a bracket under m and the gap and the extra p lifts out.
- [ ] "ho_ing" with "hope +ing": placing "pe" makes the e on the clue card fall away and the +ing chip slide into its place; placing "pp" draws the bar over the o.
- [ ] A correct placement turns the gap solid, pops the word and makes the rabbit hop.
- [ ] Two first-try items in a row bring +ing words; a wrong placement brings picture words back.
- [ ] A double-letter word is never followed by another double-letter word.
- [ ] The finish screen lists the twelve words with their pattern letters in coral and filled or hollow dots; no score.
- [ ] With `?sound=off` nothing is audible.
