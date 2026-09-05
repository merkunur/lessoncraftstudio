# 171 — Syllable Hop

## Identity
- Slug: `syllable-hop`
- Subject / topic: Literacy / syllables as beats — hopping once per beat of a pictured word (per-locale word list)
- Age band: `5-6`
- Interaction pattern: `P7` — trace a path (tap each stepping stone in order; drag across them is also accepted)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P7 (5-6 form: 3-5 waypoints, tap fallback is the default). The number of hops is the child's answer, so the path is enforced in order but its LENGTH is free — that is what makes this a syllable game rather than a tracing game.

## Learning
- Objective: Looks at a picture, hops the frog once per syllable (beat) of that word in the child's own language, and commits the count by tapping the clap tile.
- Prerequisites: Knows the picture's name in the play language (all words are common nouns with an unambiguous emoji). No reading; the syllable chunks written on the stones after a hop are confirmation, never a prompt.
- Curriculum links: F-22 (phonological awareness — rhyme, syllables, initial sounds — at 5-7 in all 12 systems), F-24 (syllable-first reading methods in ES/BR/IT/FR/DE Silbenmethode/FI KÄTS), F-31 row "Rhyme, syllable clapping" — conservative 6-7, earliest 5 → 5-6 (US RF.K.2.b "count, pronounce, blend, and segment syllables"; England Reception phonics phase 1 "syllable clapping"; Germany Vorschule/Klasse 1 "Silben klatschen"; France GS "scander les syllabes"; Spain Infantil "conciencia silábica"; Brazil EI03EF "sílabas"; Italy prima "sillabe"; Netherlands groep 2 "klankgroepen"; Sweden förskoleklass "stavelser"; Denmark 0. klasse "stavelser"; Norway 1. trinn "stavelser"; Finland esiopetus "tavut"). F-217: language-universal mechanic, per-locale content.
- Common misconceptions (F-126, F-124), each with this game's response:
  1. **Counting the sounds or letters instead of the beats (c-a-t → 3 hops).** Response: the frog hops back to the bank and the **slow model** plays: the picture card pulses once per beat (`ANIM.beat`, 600 ms apart) with `tone("tap", k)`, and on each beat the k-th stone shows that syllable chunk (`ART.chunkText`, e.g. "ba" · "na" · "na") — the beat, not the letter, is what lights a stone.
  2. **One hop for the whole word (a long word gets 1 hop) — fast-speech elision.** Response: the same slow model; the chunks appear one per stone so a three-beat word visibly needs three stones.
  3. **Hopping to the end of the stones because they are there (4 hops for every word).** Response: the stones are never a count cue — there are always four, and the clap tile (not the last stone) commits the answer; on a wrong count the slow model stops on the right stone and the stones beyond stay unlit.
  4. **Off by one from a mis-counted first beat (starting the count on the bank).** Response: the bank carries no beat badge; hop 1 is the first stone; in the slow model the bank stays dark while stone 1 lights with the first chunk.

## How it plays
1. **Start screen**: title "Syllable Hop", the frog (`ART.frog`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: a one- or two-beat word in the play language, e.g. en "cat")**: rail of 8 dots (§6) at y = 28. Zone A: the picture card (`ART.wordCard`, 160 × 160) centred at (360, 160) showing the item's emoji at size 96 (here `ART.cat`); nothing written on it. Zone B: the pond — `ART.pondBar` across zone B at y = 380; the left bank (`ART.bank`, 100 × 100) at (100, 380) with the frog sitting on it; four stones (`ART.stone`, 84 × 84 `makeTile`s) at y = 380, x = 220 / 320 / 420 / 520, each carrying a faint beat numeral 1-4 (`ART.stoneNum`); a faint dashed guide (`ART.guide`) arcs from the bank over stone 1 only (the path direction, never the length). Zone C: the clap tile (`ART.clapTile`, 100 × 80, `makeTile`) at (360, 512), hidden until the first hop.
3. **Hopping**: the child taps stone 1 (or drags a finger from the frog rightward — reaching a stone's 84 × 84 area counts as tapping it). The frog hops there (`ANIM.hop`), the stone lights (`ART.stoneLit` look) and gets a beat badge (`ART.beatBadge` "1"), `tone("tap", 1)`. Only the NEXT stone is armed (P7): tapping stone 3 while the frog is on stone 1 does nothing. Tapping the bank sends the frog back to the start and clears the badges (undo; free). After the first hop the clap tile `ANIM.appear`s.
4. **Committing**: the child taps the clap tile.
   - **Correct (hops = beats)**: the clap tile `ANIM.pop`s, `tone("correct")`, the word's chunks appear on the lit stones one after another (`ART.chunkText`, 200 ms apart), the frog `ANIM.croak`s, `GameCore.showPraise` with the next key in rotation; rail dot fills; after 900 ms the stones clear (`ANIM.fadeOut`), the frog returns to the bank and the next card `ANIM.appear`s.
   - **Wrong count**: `tone("nudge")`, the clap tile `ANIM.nudge`s; the frog hops back to the bank (`ANIM.hopBack`); then the **slow model**: the picture card `ANIM.beat`s once per beat (600 ms apart, `tone("tap", k)`), and on beat k stone k lights and shows chunk k (`ART.chunkText`); stones beyond the count stay dark; after a 900 ms hold the stones un-light and the chunks fade. All tiles are disabled during the model (≈ 0.6 × beats + 1.5 s). Attempt 2: the child hops again and taps the clap tile.
   - **Second wrong count**: the slow model again, then the show-me: stones 1 … beats gain a pulsing ring (`ART.showRing`, `ANIM.showMe`) and stay ringed; the child hops onto exactly the ringed stones and taps the clap tile — the item completes as solved-with-help (no praise pop; the chunks still appear).
5. **A full worked session (en)**: item 1 "cat" 1 hop ✓ · item 2 "sun" 1 hop ✓ → step up · item 3 (L2) "apple" 3 hops ✗ (a-p-ple?) → slow model: "ap" · "ple" on stones 1-2, stone 3 dark; 2 hops ✓ (retried) · item 4 (L1) "fish" 1 hop ✓ · item 5 "dog" 1 hop ✓ → step up · item 6 (L2) "flower" 2 hops ✓ · item 7 "banana" 3 hops ✓ → step up · item 8 (L3) "elephant" 3 hops ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the frog on the far bank (`ART.bank` at (360, 236), `ART.frog` at (360, 200)) `ANIM.celebrate`; the summary = the eight picture emojis in a row at y = 400 (size 44, x = 360 − 3.5 × 76 + i × 76), each with its beat count shown as that many small filled stones beneath it (`ART.miniStone`, 12 px apart); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  frog:       { kind: "emoji", value: "🐸", size: 64 },
  wordCard:   { kind: "shape", shape: "roundRect", w: 160, h: 160, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 20 },
  // the fourteen picture words (the key is the English noun; the play word comes from LOCALE_DATA)
  cat:        { kind: "emoji", value: "🐱", size: 96 },
  sun:        { kind: "emoji", value: "☀️", size: 96 },
  fish:       { kind: "emoji", value: "🐟", size: 96 },
  dog:        { kind: "emoji", value: "🐶", size: 96 },
  flower:     { kind: "emoji", value: "🌸", size: 96 },
  ball:       { kind: "emoji", value: "⚽", size: 96 },
  apple:      { kind: "emoji", value: "🍎", size: 96 },
  banana:     { kind: "emoji", value: "🍌", size: 96 },
  tomato:     { kind: "emoji", value: "🍅", size: 96 },
  strawberry: { kind: "emoji", value: "🍓", size: 96 },
  elephant:   { kind: "emoji", value: "🐘", size: 96 },
  butterfly:  { kind: "emoji", value: "🦋", size: 96 },
  umbrella:   { kind: "emoji", value: "☂️", size: 96 },
  crocodile:  { kind: "emoji", value: "🐊", size: 96 },
  // pond
  pondBar:    { kind: "shape", shape: "roundRect", w: 660, h: 120, fill: "structureSoft", stroke: "line", strokeWidth: 2, radius: 24 },
  bank:       { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 18 },
  stone:      { kind: "shape", shape: "roundRect", w: 84, h: 84, fill: "surface", stroke: "line", strokeWidth: 2, radius: 42 },
  stoneLit:   { kind: "shape", shape: "roundRect", w: 84, h: 84, fill: "surface2", stroke: "structure", strokeWidth: 4, radius: 42 },
  stoneNum:   { kind: "text",  value: "", size: 22, font: "display", color: "inkSoft" },      // 1-4, faint, at the stone's bottom
  guide:      { kind: "shape", shape: "arc", r: 60, stroke: "line", strokeWidth: 3 },        // dashed (lineDash [8,6]) from the bank over stone 1
  beatBadge:  { kind: "shape", shape: "circle", r: 14, fill: "accent" },                     // beat number on it, 18 px display, color inkOnAccent
  chunkText:  { kind: "text",  value: "", size: 28, font: "display", color: "structure" },   // one syllable chunk on a stone
  clapTile:   { kind: "shape", shape: "roundRect", w: 100, h: 80, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  clapIcon:   { kind: "emoji", value: "👏", size: 44 },
  showRing:   { kind: "shape", shape: "circle", r: 50, stroke: "structure", strokeWidth: 4 },
  miniStone:  { kind: "shape", shape: "circle", r: 5, fill: "structure" },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji newer than Unicode 12; no fallback needed. Colour-blind safety: a lit stone differs from an unlit one by stroke weight AND the beat badge; the ring is a second outline, not a colour.

## Animation registry
```js
const ANIM = {
  hop:       { y: "-=44", duration: 130, ease: "Sine.Out", yoyo: true, trigger: "frog arc for one hop; x tweens to the stone in a parallel 260 ms Sine.InOut tween" },
  hopBack:   { y: "-=44", duration: 130, ease: "Sine.Out", yoyo: true, trigger: "frog returns to the bank in one arc (x tweens in a parallel 320 ms tween)" },
  beat:      { scale: 1.12, duration: 220, ease: "Sine.InOut", yoyo: true, trigger: "picture card pulses once per beat in the slow model, 600 ms apart" },
  lightUp:   { alpha: 1, duration: 160, ease: "Sine.Out", trigger: "stoneLit look and chunkText appearing on a stone (from alpha 0)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "clap tile on a correct count" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "clap tile on a wrong count" },
  croak:     { scaleY: 0.8, duration: 100, ease: "Sine.InOut", yoyo: true, trigger: "frog on a correct count" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "clap tile after the first hop; the next picture card (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "chunks and badges clearing between items / after the slow model" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "rings on stones 1..beats (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish frog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                        ┌────────┐                            │
      │                        │ picture │  ART.wordCard (360,160)    │  zone A
      │                        │ (emoji) │  160×160, emoji size 96    │
      │                        └────────┘                            │
260   ├──────────────────────────────────────────────────────────────┤
      │  ┌bank┐ ⌒guide  ( 1 )   ( 2 )   ( 3 )   ( 4 )   pond y=380  │  zone B
      │  │ F  │        x=220   x=320   x=420   x=520  stones 84×84   │
      │  └────┘(100,380)                                             │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [ clap ] (360,512) 100×80                  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(The card content is the item's ART emoji; F stands for `ART.frog`.) Fixed layout, FIT scaling; nothing reflows.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.wordCard` centred (360, 160) with the item emoji centred at size 96.
- `ART.pondBar` centred (360, 380); `ART.bank` at (100, 380) as a `makeTile` (tapping it = undo to start); `ART.frog` on the bank at (100, 372), on a stone at (stone x, 372).
- Stones: `makeTile` 84 × 84 (≥ 80, the 5-6 floor) with `ART.stone` tokens at x = 220 / 320 / 420 / 520 (pitch 100, gap 16), y = 380; `ART.stoneNum` at (0, +30) inside each; a lit stone swaps to `ART.stoneLit` tokens and shows `ART.beatBadge` at (+28, −28) with the beat numeral; `ART.chunkText` centred on the stone at (0, −4) when a chunk is shown (28 px, `wordWrap` 80, one line — every chunk in LOCALE_DATA is ≤ 6 letters).
- `ART.guide` drawn dashed from the bank's right edge (150, 360) arcing over to stone 1's top (220, 340); it never extends further.
- Clap tile: `makeTile` 100 × 80 with `ART.clapTile` tokens and `ART.clapIcon` centred; hidden (alpha 0, disabled) until the first hop; disabled during the slow model.
- `ART.showRing` centred on each ringed stone.
- Drag handling (P7): `pointerdown` on the frog's current tile arms the path; on `pointermove` while down only the NEXT stone's rectangle is tested; `pointerup` leaves the frog where it is. Tapping the next stone directly always works.
- Tab order: bank, stone 1-4, clap tile (only the next stone and the clap tile are enabled at any moment; the others are focusable but inert).
- Text budget (5-6): no instruction text; the only words on the play screen are the syllable chunks, shown after a hop as confirmation.

## Content
Locale-varying (F-217): the picture is universal, the word and its beat count come from `LOCALE_DATA[GameCore.lang]`. Beats are ORAL syllables as clapped in that language's early-years classroom: French does not count a final mute e ("ba-nane" = 2); Spanish is the Latin-American picker variant. Each entry = "hyphenated chunks" (the chunks are what `ART.chunkText` shows). **Native-speaker review is required before release for every locale (F-126 "word lists must be native-authored"); the counts below are the writer's best derivation.**

```js
const LOCALE_DATA = {
  en: { cat:"cat", sun:"sun", fish:"fish", dog:"dog", flower:"flow-er", ball:"ball", apple:"ap-ple", banana:"ba-na-na", tomato:"to-ma-to", strawberry:"straw-ber-ry", elephant:"el-e-phant", butterfly:"but-ter-fly", umbrella:"um-brel-la", crocodile:"croc-o-dile" },
  de: { cat:"Kat-ze", sun:"Son-ne", fish:"Fisch", dog:"Hund", flower:"Blu-me", ball:"Ball", apple:"Ap-fel", banana:"Ba-na-ne", tomato:"To-ma-te", strawberry:"Erd-bee-re", elephant:"E-le-fant", butterfly:"Schmet-ter-ling", umbrella:"Re-gen-schirm", crocodile:"Kro-ko-dil" },
  fr: { cat:"chat", sun:"so-leil", fish:"pois-son", dog:"chien", flower:"fleur", ball:"bal-lon", apple:"pomme", banana:"ba-nane", tomato:"to-mate", strawberry:"fraise", elephant:"é-lé-phant", butterfly:"pa-pi-llon", umbrella:"pa-ra-pluie", crocodile:"cro-co-dile" },
  it: { cat:"gat-to", sun:"so-le", fish:"pe-sce", dog:"ca-ne", flower:"fio-re", ball:"pal-la", apple:"me-la", banana:"ba-na-na", tomato:"po-mo-do-ro", strawberry:"fra-go-la", elephant:"e-le-fan-te", butterfly:"far-fal-la", umbrella:"om-brel-lo", crocodile:"coc-co-dril-lo" },
  es: { cat:"ga-to", sun:"sol", fish:"pez", dog:"pe-rro", flower:"flor", ball:"pe-lo-ta", apple:"man-za-na", banana:"ba-na-na", tomato:"to-ma-te", strawberry:"fre-sa", elephant:"e-le-fan-te", butterfly:"ma-ri-po-sa", umbrella:"pa-ra-guas", crocodile:"co-co-dri-lo" },
  pt: { cat:"ga-to", sun:"sol", fish:"pei-xe", dog:"ca-chor-ro", flower:"flor", ball:"bo-la", apple:"ma-çã", banana:"ba-na-na", tomato:"to-ma-te", strawberry:"mo-ran-go", elephant:"e-le-fan-te", butterfly:"bor-bo-le-ta", umbrella:"guar-da-chu-va", crocodile:"cro-co-di-lo" },
  nl: { cat:"kat", sun:"zon", fish:"vis", dog:"hond", flower:"bloem", ball:"bal", apple:"ap-pel", banana:"ba-naan", tomato:"to-maat", strawberry:"aard-bei", elephant:"o-li-fant", butterfly:"vlin-der", umbrella:"pa-ra-plu", crocodile:"kro-ko-dil" },
  sv: { cat:"katt", sun:"sol", fish:"fisk", dog:"hund", flower:"blom-ma", ball:"boll", apple:"äpp-le", banana:"ba-nan", tomato:"to-mat", strawberry:"jord-gub-be", elephant:"e-le-fant", butterfly:"fjä-ril", umbrella:"pa-ra-ply", crocodile:"kro-ko-dil" },
  da: { cat:"kat", sun:"sol", fish:"fisk", dog:"hund", flower:"blomst", ball:"bold", apple:"æb-le", banana:"ba-nan", tomato:"to-mat", strawberry:"jord-bær", elephant:"e-le-fant", butterfly:"som-mer-fugl", umbrella:"pa-ra-ply", crocodile:"kro-ko-dil-le" },
  no: { cat:"katt", sun:"sol", fish:"fisk", dog:"hund", flower:"blomst", ball:"ball", apple:"ep-le", banana:"ba-nan", tomato:"to-mat", strawberry:"jord-bær", elephant:"e-le-fant", butterfly:"som-mer-fugl", umbrella:"pa-ra-ply", crocodile:"kro-ko-dil-le" },
  fi: { cat:"kis-sa", sun:"au-rin-ko", fish:"ka-la", dog:"koi-ra", flower:"kuk-ka", ball:"pal-lo", apple:"o-me-na", banana:"ba-naa-ni", tomato:"to-maat-ti", strawberry:"man-sik-ka", elephant:"e-le-fant-ti", butterfly:"per-ho-nen", umbrella:"sa-teen-var-jo", crocodile:"kro-ko-tii-li" }
};
```
The beat count of a word = its number of chunks (split on "-"); the maximum in any locale is 4 (four stones). The picture ART key equals the entry key: `ART.cat`, `ART.sun`, `ART.fish`, `ART.dog`, `ART.flower`, `ART.ball`, `ART.apple`, `ART.banana`, `ART.tomato`, `ART.strawberry`, `ART.elephant`, `ART.butterfly`, `ART.umbrella`, `ART.crocodile` — fourteen words, every one drawn on `ART.wordCard` at size 96.

**Levels are computed per locale at Play start** from the beat counts (the same word is L1 in one language and L2 in another — e.g. "cat" 1 beat en, "gat-to" 2 beats it):
- **L1** = every word with 1 beat, plus 2-beat words if fewer than 4 words have 1 beat (fi/it/es/pt need this top-up: their 1-beat set is small).
- **L2** = words with 2 or 3 beats not used in L1.
- **L3** = words with 3 or 4 beats.
A word never appears twice in a session. Play list of 8 per Rules; the first item of a session is always a 1-beat word where the locale has one (en de fr es pt nl sv da no), otherwise a 2-beat word (it, fi) — success starts high (F-40). No two consecutive items with the same beat count.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct counts → next item from the next level up (cap L3).
- Adaptation: a wrong count, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: clap tile `ANIM.pop`, `tone("correct")`, chunks appear on the lit stones, frog `ANIM.croak`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot fills, next card after 900 ms.
- What happens on a wrong answer:
  - Too many hops (sounds/letters counted, or hopped to the end): `tone("nudge")`, clap tile nudges, frog hops back, the slow model lights only stones 1 … beats with their chunks; stones beyond stay dark.
  - Too few hops (one hop for the word / fast speech): the same slow model; each further stone lighting with its chunk shows the word has more beats.
  - Zero hops: cannot happen (the clap tile is hidden until the first hop).
  - Tapping a stone out of order or beyond the frog's next stone: nothing happens (not an attempt). Tapping the bank: undo, free.
- Retry behaviour: attempt 1 unaided → attempt 2 after the slow model → attempt 3 with the rings on stones 1 … beats; hopping exactly the ringed stones and clapping completes the item as solved-with-help. No attempt 4.
- Finish condition: 8 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Syllable Hop". No instruction text on the play screen; the syllable chunks come from `LOCALE_DATA`, not from `STRINGS`.

## Sound
`tone("tap", k)` on the k-th hop (pitch climbs with the beat count) and on each beat of the slow model; `tone("correct")` on a correct count; `tone("nudge")` on a wrong count; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken — the child supplies the word from the picture.

## Testing checklist
- [ ] Works in all 11 languages (the picker changes the chunk text shown on the stones and the beat counts — "cat" needs 1 hop in English and 2 in Italian; All done, Play again, Menu and praise change too).
- [ ] Works at narrow width (400-px iframe: card, bank, four stones and the clap tile fully visible; stones are separate targets).
- [ ] Keyboard operable (Tab: bank, stones, clap; only the next stone accepts Enter; Enter on the clap tile commits).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong counts still reaches All done via the ringed stones).
- [ ] The clap tile is hidden until the first hop and appears after it.
- [ ] Tapping stone 3 while the frog is on the bank does nothing; tapping stone 1 makes the frog hop with a "1" badge and a tone.
- [ ] Tapping the bank returns the frog and clears the badges without any message.
- [ ] Clapping the wrong count sends the frog back and pulses the picture once per beat while the stones light one by one with the word's chunks; stones past the count stay dark.
- [ ] Clapping the right count writes the chunks on the lit stones and the frog squashes.
- [ ] After two wrong counts the right stones gain pulsing rings; hopping them and clapping finishes the item.
- [ ] The first item of a session is a one-beat word (or two-beat in Italian/Finnish); no two consecutive items have the same beat count.
- [ ] The finish screen shows the eight pictures with their beat counts as small stones and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each hop is a higher note.
