# 196 — Dictionary Order

## Identity
- Slug: `dictionary-order`
- Subject / topic: Literacy / alphabetical order — ordering four words onto a shelf as a dictionary would, by the first letter and, when first letters match, by the second letter
- Age band: `8-9`
- Interaction pattern: `P4` — tap in order (per-tap judgement)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Locale note: the mechanic is universal but the WORDS and the ALPHABET are language-bound (F-22; A-15): sv/da/no/fi place their extra letters after z (sv å ä ö; da/no æ ø å; fi å ä ö), de treats ä/ö/ü as a/o/u, es treats ñ as its own letter after n; each locale's word sets and its `alphabet` string are stored in `LOCALE_DATA`. English is authored in full; German is authored as the umlaut exemplar (native review before ship); the other nine locales are declared as needing a native set (en pilot). Nothing is spoken; the child reads four words.

## Learning
- Objective: Taps four word cards in dictionary order, deciding by the first letter and, when two or more words share the first letter, by the second letter (and by the third at the stretch level), using the alphabet strip as the reference.
- Prerequisites: Reads single words (games 071-074); knows the alphabet sequence well enough to find a letter on a strip (game 142 or classroom); can order three things by a rule (game 132).
- Curriculum links: F-22 (letter names taught explicitly at 5-7; reading and writing short texts by 8-9 — dictionary use is the study skill built on the alphabet in every system), F-31 row "Read short text; retell/sequence; simple inference" → 8-9 as the age anchor (US L.2.2.e / L.3.2.g "consult reference materials, including beginning dictionaries"; England Y2 "use the first two or three letters of a word to check its spelling in a dictionary"; Germany Klasse 2-3 "Wörter nach dem Alphabet ordnen, Wörterbuch nutzen"; France CE1-CE2 "l'ordre alphabétique, utiliser un dictionnaire"; Netherlands groep 4-5 "alfabetiseren, woordenboek"; Spain 2º ciclo "orden alfabético, uso del diccionario"; Italy classe seconda-terza "ordine alfabetico"; Brazil EF02LP; Sweden åk 1-3 "alfabetisk ordning"; Finland 2.-3. luokka "aakkosjärjestys"). Demand: F-6 (a study-skill niche); this is the catalogue's one alphabetical-order game.
- Common misconceptions (F-121, F-102, F-128), each with this game's response:
  1. **Orders by the first letter only and stops ("bat, bee" in either order).** Response: a wrong tap when the remaining cards share a first letter makes the SECOND letter of each such card glow (`ART.letterGlow` on letter index 1, `ANIM.markIn`) while the alphabet strip lights those letters in their alphabet places (`ART.stripMark` on the strip) for 1200 ms — the differing letter is the one to compare. When the remaining cards have different first letters, the FIRST letters glow instead. When the second letters match too (L3), the third letters glow.
  2. **Uses the alphabet from the wrong end or does not know where a letter sits (c before a).** Response: the alphabet strip is always visible across the top of zone A; on any wrong tap the strip lights the compared letters so the child sees which comes first left-to-right; on the second wrong tap for the same shelf slot the correct next card gains `ART.hintRing`.
  3. **Orders by word length or by meaning (shortest first; animals together).** Response: sets mix lengths deliberately (an L1 set has a three-letter and a seven-letter word); the letter glow ignores length and meaning; the read-back (`ANIM.readBack`) re-lights the shelf so far.
  4. **Letter-form slips — confusing b and d when comparing second letters (F-121).** Response: L3 sets include second-letter pairs b/d and p/q (abbey / added; open / opus — see Content); the glow sits on the letter itself and the strip lights the two positions, so the child compares the strip, not the mirror image.
  5. **Transferring the English alphabet to another language (putting ö with o in Swedish).** Response: structural — each locale's `alphabet` string in `LOCALE_DATA` defines the strip and the comparison; the game never sorts with the built-in string compare.

## How it plays
1. **Start screen**: title "Dictionary Order", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1: bat · dog · sun · apple → apple, bat, dog, sun)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the alphabet strip (`ART.strip`, 660 × 36) at (360, 84) with the locale's letters at 18 px, 24 px pitch (26 English letters span 624 px; 29 Swedish letters at 22 px pitch span 638); below it the shelf (`ART.shelf`, 640 × 90) at (360, 176) with four empty slots (`ART.slot`, 140 × 64, dashed) at x = 135 / 285 / 435 / 585, each with its position numeral (`ART.slotNum` "1"…"4") at its top-left; the owl at (48, 176) beside the shelf. Zone B: the four word cards (`ART.wordCard`, 150 × 70, word 26 px) at (200, 330), (520, 330), (200, 420), (520, 420), assignment shuffled. Caption `S("putInOrder")` ("Put them in dictionary order") at (360, 268), 22 px `THEME.colour.inkSoft`.
3. **Tapping in order**: the child taps a card.
   - **Correct next card (apple)**: `tone("tap", k)` (k = slot index; the pitch climbs along the shelf), the card glides (`ANIM.glide`) into the next free slot (the slot stroke turns solid `structure`); the position numeral stays. Tapping the LAST-filled slot returns its card (undo, `ANIM.glide`, no penalty); earlier slots are locked.
   - **Wrong card (dog)**: `ANIM.nudge`, `tone("nudge")`; then the letter cue: the deciding letter of every remaining card glows (`ART.letterGlow`) and the strip marks those letters (`ART.stripMark`) for 1200 ms; the filled slots `ANIM.readBack`. The item counts as retried.
   - **Second wrong tap for the same slot**: the cue again, then the correct next card gains `ART.hintRing` (`ANIM.showMe`) until it is tapped; the item is solved-with-help from here.
   - **All slots filled** (only possible in the right order): the shelf `ANIM.settle` (the four cards drop 6 px and rise), a small book glyph (`ART.book`) pops at the shelf's right end, `tone("correct")`, praise pop (only if no wrong tap), the owl `ANIM.blink`; rail dot fills; next item after 900 ms (`ANIM.appear`).
4. **Items 2-12**: L1 four different first letters; L2 two words share a first letter (decided by the second letter); L3 three or four words share a first letter, some sharing the second (decided by the third), including b/d second-letter pairs and, in locales that have them, extra letters.
5. **Re-queue** (F-41): an item with any wrong tap re-enters after 2 intervening items with a fresh card shuffle; the count stays 12.
6. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the summary = the twelve ordered sets as one-line chips (`ART.setChip`, 600 × 26, the four words in order at 16 px separated by " · ") stacked from y = 290 at 26 px pitch — the dictionary lines the child built — with `ART.dotFull` at the left of first-try ones and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  owl:        { kind: "emoji", value: "🦉", size: 72 },                    // librarian / mascot
  book:       { kind: "emoji", value: "📖", size: 32 },                    // pops at the shelf end on completion
  strip:      { kind: "shape", shape: "roundRect", w: 660, h: 36, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },   // letters 18 px body inkSoft
  stripMark:  { kind: "shape", shape: "circle", r: 12, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // behind a strip letter during a cue
  shelf:      { kind: "shape", shape: "roundRect", w: 640, h: 90, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 14 },
  slot:       { kind: "shape", shape: "roundRect", w: 140, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },   // dashed (lineDash [8,6]) while empty; solid structure stroke when loaded
  slotNum:    { kind: "text",  value: "", size: 16, font: "body", color: "inkSoft" },
  wordCard:   { kind: "shape", shape: "roundRect", w: 150, h: 70, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // word 26 px display ink
  letterGlow: { kind: "shape", shape: "roundRect", w: 26, h: 36, fill: "accent", radius: 6 },   // behind ONE letter of a word at alpha 0.45; x set per letter at runtime
  hintRing:   { kind: "shape", shape: "roundRect", w: 162, h: 82, stroke: "structure", strokeWidth: 4, radius: 16 },
  setChip:    { kind: "shape", shape: "roundRect", w: 600, h: 26, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The two emoji are the mascot and the book; the content is text. The letter glow is a coral block BEHIND the letter (the letter stays in ink), so the cue is a shape, and the strip mark is a ring — never colour alone.

## Animation registry
```js
const ANIM = {
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "card to a slot / back to its spot (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong card" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "letterGlow (to alpha 0.45) and stripMark rings (from alpha 0)" },
  readBack:  { alpha: 0.4, duration: 125, ease: "Sine.InOut", yoyo: true, trigger: "each filled slot in turn, 250 ms apart, from slot 1" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next card (from alpha 0.2)" },
  settle:    { y: "+=6", duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "the four loaded slots when the shelf completes" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "book glyph on completion" },
  blink:     { scaleY: 0.85, duration: 100, ease: "Sine.InOut", yoyo: true, trigger: "owl on completion" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new slots and cards (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```
Implementation note: each word card's label is drawn as one text object per LETTER (26 px, letters advanced by their measured width) so `ART.letterGlow` can sit behind a single letter; the card's fit-to-width shrink is applied to the whole letter row.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  [a b c d e f g h i j k l m n o p q r s t u v w x y z] strip (360,84)│
      │ owl  ┌────────────────────────────────────────────────────┐   │  zone A
      │(48,176)│ ┌1────┐   ┌2────┐   ┌3────┐   ┌4────┐  shelf y=176 │   │
      │      │ └──────┘   └──────┘   └──────┘   └──────┘  x=135/285/435/585
      │      └────────────────────────────────────────────────────┘   │
260   ├──────────────────────────────────────────────────────────────┤
      │            "Put them in dictionary order" (360,268)           │
      │     [  bat   ]                     [  sun   ]   spots y=330    │  zone B
      │     [  dog   ]                     [ apple  ]   spots y=420    │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.strip` at (360, 84) with the locale's `alphabet` letters (lowercase) at 18 px `THEME.font.body` `THEME.colour.inkSoft`, pitch = 624 / (n − 1) capped at 24; `ART.stripMark` centred behind a letter during a cue.
- `ART.shelf` at (360, 176); slots as `makeTile` 140 × 64 with `ART.slot` tokens, `ART.slotNum` at each slot's (−60, −22); a loaded slot shows the word at 22 px `THEME.colour.ink`. `ART.owl` at (48, 176). `ART.book` at (672, 176), hidden until completion.
- Word cards: `makeTile` 150 × 70 with `ART.wordCard` tokens; the word at 26 px `THEME.font.display` `THEME.colour.ink` drawn letter by letter; `ART.letterGlow` behind one letter (alpha 0.45); `ART.hintRing` behind a card.
- Tap floors: cards 150 × 70, slots 140 × 64 (≥ 56). Gaps ≥ 10 between slots, ≥ 20 between cards. During a cue (≤ 1.5 s) cards are `setEnabled(false)`.
- Keyboard: Tab walks the cards left-to-right, top-to-bottom, then the slots; Enter taps.

## Content
Word sets are language-bound. `LOCALE_DATA[lang]` = `{ alphabet: "abcdefghijklmnopqrstuvwxyz", items: { L1: [...], L2: [...], L3: [...] } }`; each item = an array of four words in DICTIONARY ORDER (the game shuffles the cards and accepts exactly that order). The deciding letter index for the cue is computed at runtime: for the remaining cards, the first index at which they do not all share a letter (0, 1 or 2). Comparison uses the position of each letter in `alphabet`, never the built-in string compare.

**en** (`alphabet` = the 26 letters):
- **L1** (four different first letters; lengths mixed): apple, bat, dog, sun · cat, egg, moon, tree · bee, fish, hat, zebra · ant, kite, owl, water · duck, goat, lamp, rabbit · box, jam, nest, violin · car, frog, milk, pig · elephant, ice, net, yak
- **L2** (two words share the first letter — second letter decides): bat, bee, dog, sun · cake, cup, hen, moon · fish, fox, jam, tree · ant, apple, egg, owl · map, milk, pig, sun · rabbit, ring, tent, van · goat, gum, lamp, nest · sock, star, wing, zebra · bed, bus, cat, ice · dog, drum, kite, web
- **L3** (three or four share the first letter; some share the second too — third letter decides; b/d second-letter pairs included): cake, cat, cow, cup · bat, bed, bin, bus · pan, pen, pig, pot · sad, sip, sock, sun · abbey, added, ant, apple · open, opus, orange, owl · dog, doll, door, dot · ship, shoe, shop, sun · bag, ball, bat, bed · man, map, mat, mud · fig, fin, fish, fox · hat, hen, hill, hop
- Every item above is written in dictionary order exactly as it is stored in `LOCALE_DATA`.

**de** (`alphabet` = the 26 letters; ä ö ü ß sort as a o u ss — the strip shows the 26 letters and a small "ä=a ö=o ü=u" legend is NOT shown, the rule is enacted by the glow landing on the base letter's strip place; native review before ship): L1: Apfel, Ball, Hund, Sonne · Ente, Igel, Katze, Zebra · Baum, Fisch, Maus, Wal · Ameise, Kuh, Löwe, Vogel. L2: Bär, Biene, Hund, Sonne · Kuh, Kuchen, Maus, Tiger · Fisch, Fuchs, Hase, Zebra · Ameise, Apfel, Eule, Ohr · Milch, Mond, Pferd, Sonne. L3: Kamm, Katze, Kuchen, Kuh · Bär, Bett, Biene, Bus · Affe, Ähre, Ameise, Apfel (ä = a, then f < h) · Hahn, Hase, Hund, Hut · Ofen, Ohr, Öl, Onkel (ö = o, then e < h < l < n).

**fr, it, es, pt, nl, sv, da, no, fi: a native word set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rules: `alphabet` in the locale's dictionary order (sv "…xyzåäö", da/no "…xyzæøå", fi "…xyzåäö", es with ñ after n; fr/it/pt/nl the 26 letters with accented forms sorting as their base); four words per item; L3 must include at least two items decided by an extra letter where the locale has one (a sv item with "öra" after "zebra").

Play list: 12 items per Rules; shuffled within level; no item repeats except by re-queue; card spots shuffled per item.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive items completed without a wrong tap → next level (cap L3).
- Adaptation: an item with a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: each correct card glides to its slot with `tone("tap", k)`; on the last card `ANIM.settle`, `ART.book` `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item completed without a wrong tap, owl `ANIM.blink`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - First-letter-only ordering (a card tapped whose first letter matches the correct card's but whose second letter is later): nudge + `ART.letterGlow` on the SECOND letter of every remaining card sharing that first letter + `ART.stripMark` on those letters in the strip, 1200 ms.
  - Alphabet-position slip (a card whose deciding letter is simply later): nudge + the glow on the deciding letter of every remaining card + the strip marks, 1200 ms, + `ANIM.readBack` on the filled slots.
  - Length / meaning ordering: the same cue (the glow ignores length and meaning).
  - b/d second-letter confusion at L3: the same cue; the strip marks show b and d in their two places.
  - Second wrong tap for the same slot: the cue again + `ART.hintRing` on the correct next card until tapped (solved-with-help).
- Retry behaviour: per slot: attempt 1 → attempt 2 after the cue → the ringed card (no attempt 4). Undo of the last slot is always free.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Dictionary Order"; `putInOrder` = "Put them in dictionary order". The words and the alphabet are content from `LOCALE_DATA`.

## Sound
`tone("tap", k)` when the k-th slot is loaded (pitch climbs along the shelf); `tone("nudge")` on a wrong card; `tone("correct")` on completion; `tone("finish")` once. Silent under `?sound=off`. No word is ever spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=de` shows the German sets and sorts Ähre between Affe and Ameise; `?lang=sv` shows a 29-letter strip ending å ä ö once a Swedish set exists, and plays the English set until then).
- [ ] Works at narrow width (400-px iframe: the full alphabet strip, the shelf with four slots and four cards visible without overlap).
- [ ] Keyboard operable (Tab across the cards then the slots; Enter loads / unloads).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with the shelf full; the hint ring always names the next card).
- [ ] For bat · dog · sun · apple, tapping "bat" first nudges it and glows the first letter of every card while the strip rings a, b, d and s.
- [ ] For bat · bee · dog · sun, tapping "bee" before "bat" glows the second letters "a" and "e" and rings a and e on the strip.
- [ ] At the third level, for cake · cat · cow · cup, tapping "cup" first glows the second letters of all four cards.
- [ ] Tapping the last loaded slot returns its card; earlier slots stay locked.
- [ ] Two clean items in a row bring sets with shared first letters; a wrong tap brings an easier set next.
- [ ] A completed shelf settles and a book appears at its end.
- [ ] The finish screen lists the twelve ordered sets with filled/hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
