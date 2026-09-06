# ART BIBLE — the one visual language for all 200 games

Version 1.0 — 2026-09-05. Owned by the art-director role; every artist, graphic-design and animation agent works to it, and the visual-critic pass grades against §8. It sits on top of `design/catalogue/BUILD-CONVENTIONS.md` (stage, zones, tap floors, tokens) and `_lib/theme.js` (the palette). Nothing here overrides the accessibility rules there.

## §1 Intent

Two hundred games should feel like one world: warm, rounded, calm and generous, made for a five- to nine-year-old on a tablet in a classroom. The art must **read at a glance from across a room and hold up in a 400-px iframe**. It supports the thinking (F-42: no decorative motion while the child thinks; F-63: the learning object IS the game object) and never competes with it. Everything is vector: inline SVG strings and Phaser shapes. No bitmaps, no photos, no emoji on the play surface once a game is built (emoji remain only as declared fallbacks).

## §2 Palette

The palette is `THEME.colour` and nothing else. Vector art references tokens by name (`fill="var(--structure)"`, resolved by `LCSArt`), so a palette change is one edit.

| token | hex | role in art |
|---|---|---|
| `bg` | #FBF3E4 | paper; the stage ground; never used inside a character |
| `surface` | #FFFFFF | cards, tiles, eyes' whites |
| `surface2` | #FBF6EE | recessed wells, secondary tiles, water/sky washes |
| `ink` | #2A2A35 | every outline; pupils; text |
| `inkSoft` | #6B6B78 | secondary lines, muted labels |
| `line` | #E7DCC8 | hairlines, tile borders, dashed slots |
| `structure` | #146B5E | the teal brand: frames, rails, filled counters, the "chosen" outline, hero fills |
| `structureSoft` | #E2F0EC | teal wash: selected fills, soft grounds |
| `accent` | #F2784B | coral: hints, badges, the ONE warm highlight per screen; never large areas; never text on white |
| `good` | #2FA56A | reserved: a small confirming mark only, always paired with a shape |
| `focus` | #1E8FD4 | the keyboard focus ring only |

**Two tints per token** are allowed inside SVG art so characters have volume: a lighter tint (mix 35% with `bg`) and a darker tint (mix 20% with `ink`). They are written as hex INSIDE the SVG string only, and only these:
`structure` → #5A9C90 / #10564B · `accent` → #F6A07E / #C2603C · `structureSoft` → #EEF6F3 / #B5D6CC · `surface2` → #FFFFFF / #E9E1D2 · `inkSoft` → #9A9AA5 / #55555F. Character body colours come from the tint pairs of `structure`, `accent` and `surface2` plus `bg`; a character never carries a saturated colour outside this set. Meaning is never carried by colour alone (BUILD-CONVENTIONS §12): every state also changes shape, outline weight, position or a glyph.

## §3 Characters (the mascots)

- **Construction:** simple stacked circles and rounded capsules; head ≈ 55% of total height; eyes are two large `surface` circles with `ink` pupils placed high and close together; a small `ink` nose/beak; no visible teeth; limbs are short capsules. Silhouette must read at 48 px.
- **Line:** a single 3-px `ink` outline around the whole figure and its main parts (2 px at sizes ≤ 48); interior detail lines 1.5 px `inkSoft`. No line-weight variation for style; the outline is what keeps art legible on cream.
- **Fill:** flat body colour + one lighter tint on the belly/face + one darker tint for the far ear/arm. No gradients except an optional 8%-opacity radial highlight on the head. No textures.
- **Expression set per mascot (the pose vocabulary a game may ask for):** `idle` (neutral, eyes open, slight smile), `happy` (eyes closed crescents, open smile), `think` (eyes to one side, mouth small), `oops` (eyebrows up, mouth "o" — used for the child's wrong answer only when the spec asks; it is surprise, never disapproval), `act` (the game-specific action: munch, wave, peek, cluck, hop). A character never frowns, cries or looks angry at the child.
- **Roster** (first use draws it; every drawing is registered in `_lib/art.js` under `<animal>.<pose>` and listed in §7): fox · hen · owl · beaver · crab · butterfly · moth · penguin · frog · raccoon · rabbit · squirrel · mouse · bear · goat · tortoise · koala · otter · hedgehog · dog · cat · duck · bee · pig · panda · parrot · snail · ladybird · giraffe · elephant · monkey · octopus · kangaroo · sheep · cow · rooster · lion · lizard · gorilla · hamster · swan · chick · dove · robot · seal · deer · zebra · badger · flamingo · sloth. Each is drawn once at 96 px master size with a 1:1 viewBox.
- **People:** never drawn (cultural neutrality, brief §7); the pronoun game uses silhouette figures from §4.

## §4 Objects, tiles, scenery

- **Objects** (berry, egg, acorn, coin, cup, sock, leaf…) share the character line rule (3 px `ink`, flat fill + one tint), sit on a transparent ground, and are drawn to a 1:1 viewBox at 64 px master. Countable objects must be **identical instances** (the child counts, not compares).
- **Tiles, cards, bins, frames** are Phaser shapes from BUILD-CONVENTIONS (`roundRect` radius 12-18, `surface` fill, `line` 2-px stroke; selected = `structureSoft` fill + `structure` 3-px stroke). A tile's picture is drawn INSIDE it via `drawArt` at ≤ 70% of the tile's short side.
- **Scenery** (a pond, a hill, a shop shelf, a sky band) is always a **low-contrast wash** in `surface2` / `structureSoft` with `line` edges, never detailed, never animated, never in front of a tappable thing. One scene element per screen at most.
- **Icons on bins and prompts** are single-weight `ink` line glyphs 40-48 px (a leaf, a bone, a running figure, an arrow) — the same glyph family across games.
- **Shadows:** one soft ellipse (`ink` at 8% alpha) under a character or a placed object; nothing else casts shadows.

## §5 Typography in art

Numerals and letters that ARE content (a numeral tile, a letter card) use `THEME.font.display` (Baloo 2) at the sizes BUILD-CONVENTIONS §12 sets (≥ 40 px single glyphs at 5-6). Never outline text. Never place text on `accent` in `surface`; use `inkOnAccent` (BUILD-CONVENTIONS contrast rule).

## §6 Motion (the animation agent's rules)

- Every motion is an `ANIM` entry run by `GameCore.playAnim` or a CSS-free SVG transform the game applies to a drawn object; nothing moves that the child is not meant to look at (F-42).
- **Vocabulary:** anticipation 60-90 ms → action → settle with a small overshoot (`Back.Out`); squash/stretch 8-12% for hops and lands; hover-lift 6-8 px; a chosen tile pops 12%; "not yet" is a 2-cycle 10-px sideways nudge, never a shake that reads as anger, never a red flash.
- **Durations:** micro 80-160 ms · placement/glide 220-300 ms · reveal steps 250-400 ms apart · celebration ≤ 1.5 s total. Idle loops are forbidden during play; a breathing idle (2% scale, 3 s) is allowed only on the start and finish screens.
- **No flashing** (nothing toggles faster than 3 Hz), no full-screen colour changes, no particle bursts larger than 12 particles.
- **Enacted feedback first:** the correction animation (recount, overlay, slide-back) is the message; the mascot's reaction follows it, never replaces it.

## §7 Library index (`_lib/art.js`) — maintained by the artist agents

Every registered entry is listed here with its master size and the game that introduced it. Entries are shared: a later game reuses `fox.idle`; it does not redraw the fox. (Empty at 2026-09-05; `_probe.dot` is a test fixture, not art.)

| entry | size | introduced by | notes |
|---|---|---|---|
| `hen.idle` | 96 | 002 Number Nest | the roster template. ONE shared body string + a swapped head group per pose is what makes the four read as one bird - keep that structure for the other 49 |
| `hen.think` | 96 | 002 Number Nest | head +7deg, pupils +3: she looks at the thing the child should look at |
| `hen.happy` | 96 | 002 Number Nest | crescent eyes, open beak, wing +14deg |
| `hen.oops` | 96 | 002 Number Nest | SURPRISE, never disapproval: brows arch up and out, beak an "o". Eye centres 18 apart, not 16 - two r-8 whites at 16 intersect into a visible lens |
| `egg` | 64 | 002 Number Nest | plain and undecorated: a decorated egg reads as EASTER in de/nl/sv/da/no, and colour variation invites sorting rather than counting. BINDING: opaque ovoid <=36 wide, <=48 tall, or the 12px counting clearance fails |
| `nest` | 360x152 | 002 Number Nest | the FIRST non-square entry (see §9.1); `bowl` and `bowl.rim` are the second and third. Rim ticks lie ALONG the rim at varied angles - uniform outward twigs read as spikes - and the interior weave is held at 17pc opacity because the eggs cover almost the whole interior and that is the surface the child counts on |
| `berry` | 64 | 001 The Fox's Bowl | the countable instance. DARK inkSoft tint #55555F: coral would spend the one-coral budget ten times over, teal would lose figure/ground inside the teal 'counted' cell, white is already `egg`. The 5-tick calyx is LOAD-BEARING (a plain circle collides with the count-marker cue) but keep the fan NARROW - wider plus a ring reads as an INSECT on the fruit at 128px |
| `bowl` | 96x44 | 001 The Fox's Bowl | back + body, drawn BEFORE the contents. NON-SQUARE: the game's ART row MUST set size===w (96). BODY is #E9E1D2, not var(--surface2): #FBF6EE on the #FBF3E4 stage differs by three units and read as a bare outline (measured on the first render) |
| `bowl.rim` | 96x44 | 001 The Fox's Bowl | near lip, drawn AFTER the contents so they tuck behind it. Outer path byte-identical to `bowl`'s front silhouette - edit both together or the pair splits open |
| `fox.idle` | 96 | 001 The Fox's Bowl | roster mascot #2. REDRAWN 2026-09-06 (see §11). Side-on standing body, front-facing head; the fox mask IS the head outline. FOUR legs, all 9 wide, all filled paths with their own 3px outline, all with the same white sock; the far pair is offset 9 and its ink-12pc wash covers the RUSSET SHIN ONLY. Body #C2603C is the §9.2 identity tint and spends the whole §9.4 warm-body exemption: NO coral anywhere on this character |
| `fox.think` | 96 | 001 The Fox's Bowl | head +6deg about (66,32), pupils +2.5. The EARS rotate inside the same `<g>` - a feature that stays put while the skull turns detaches (the hen's comb lesson). BINDING: ear tips at y5, not higher - at y3 the +6deg rotation carries the left tip and its stroke off the top of the viewBox |
| `fox.happy` | 96 | 001 The Fox's Bowl | crescent eyes, small open mouth, tail `<g>` +14deg about (28,55) - a pivot buried in the haunch. The tail rotation is the ONLY byte differing from the shared body string. Keep the open mouth SMALL: a wide ink mouth on the white snout patch reads as a hole punched in the face at 384 |
| `fox.oops` | 96 | 001 The Fox's Bowl | SURPRISE, never disapproval. Whites grow r6.2->7.0 while the pupils SHRINK 3.2->2.9; that opposition is what reads as surprise. Separation is derived: centres 19 apart >= 2r+3. BINDING: brows arch to y13.5 with ends at y17.5-19.5 - 5+ clear of the skull outline and 2+ clear of the eyes. A brow drawn ON the outline merges with it and becomes a FROWN |
| `fox.munch` | 96 | 001 The Fox's Bowl | the `act` pose. The bulged cheek is built INTO this pose's face path (one segment re-curved out to x90), never overlaid as a second shape - an overlaid bulge must close somewhere, and a closing stroke that does not land exactly on the head outline draws a line across the cheek |

## §8 The visual-critic rubric (graded on the full screenshot sweep, every locale start screen + en item/wrong/finish at 400/704/1024)

1. Silhouettes read at a glance; nothing is a blob.
2. Every outline is present and consistent (3 px / 2 px rule); no anti-aliased mush at 400.
3. Palette obeyed: tokens + the listed tints only; coral used once per screen, small.
4. Hierarchy: the prompt is the biggest thing in zone A; choices in zone B are equal in visual weight; chrome is quiet.
5. Countable objects are identical instances, evenly spaced (≥ 12 px), never overlapping.
6. Nothing decorative moves while a choice is open.
7. No text below the band's size floor; no clipped or wrapped-to-three-lines string in any of the 11 locales.
8. Every state has a non-colour cue (outline, glyph, position).
9. Wrong-answer state looks calm: no red, no cross, no sad face; the enacted hint is visible in the screenshot.
10. Finish screen shows the learning summary, not a score; the celebration is proportionate.
11. Tap targets are visibly separate and large; at 704 nothing important is smaller than a fingertip.
12. Locale layouts: German/Finnish strings fit; nothing overflows a tile or the stage.
13. Scenery is a wash; no scene element competes with a tile.
14. The mascot's expression matches the moment (idle while thinking, happy on success, surprised-not-disapproving on a miss).
A pass requires all fourteen; the critic names the screenshot and the rule for every miss.

## §9 Amendments established by the first build (002 Number Nest)

1. **Containers and scenery may be NON-SQUARE** with an explicit `w`/`h`; countable objects and characters stay 1:1. A 1:1 nest would be 360px tall and could not exist in a 204px zone. ⚠ Such an entry MUST also set `size` equal to `w`, or `drawArt` scales it by `64/w` and renders a postage stamp **with no error and no console warning**.
2. **Identity tint vs state coral.** A mascot may carry ONE identity feature in an `accent` TINT (the hen's terracotta comb, beak and legs). It is exempt from the one-coral-per-screen count because it never changes and never means anything. The counted coral is STATE coral - the single element that is coral *because of what is happening now*. This is what keeps coral available for meaning across all 50 mascots.
3. ⚠ **`ANIM.appear` and any tween of raw `scale` is WRONG for a `kind:"svg"` entry.** `preloadArt` rasterises at 2x and `drawArt` compensates with an object scale of 0.5, so an absolute `scale: 1` renders the art at DOUBLE size. Measured on this build: eggs came out 96px instead of 48, a 21px overlap, while every gate passed. Wrap the art in a container and animate the container - a container's natural scale really is 1.

## §10 Amendments established by the second build (001 The Fox's Bowl)

1. ⭐⭐ **§9.4 — the warm-body clause.** A mascot whose BODY is an `accent` tint spends its ENTIRE
   §9.2 identity exemption on that body. `#F6A07E` and `#F2784B` may then appear **nowhere** on that
   character (no coral ear linings, no coral tongue, no coral socks), and the game's state coral must
   be (i) geometric rather than organic in shape, (ii) at least 120 logical px from the character's
   bounding box, and (iii) no larger than 600 px². Such a game declares **exactly one** `accent`
   entry in its ART registry — one grep, one number.
   *Why it exists:* a fox is orange and `accent` is orange, so without this clause a warm-bodied
   mascot silently spends the one colour the palette reserves for meaning. The three alternatives
   were each rejected on evidence — a light-coral body is indistinguishable from state coral to a
   five-year-old; a near-white body repeats the hen's still-open separation weakness on a bigger
   character; and a teal body is a SEMANTIC collision, because teal already means counted / chosen /
   correct. It will apply again to at least seven more of the fifty (squirrel, deer, lion, hamster,
   dog, cow, rooster).
2. **The palette has NO RED, and that is a content constraint, not just a drawing one.** A strawberry
   cannot be drawn in this palette: coral would put ten `accent` objects on one screen, teal loses
   figure/ground inside a teal "selected" cell, and white is owned by `egg`. When the art cannot draw
   the object a title names, **change the object or change the title** — do not spend the state
   colour. 001 resolved it by naming no fruit at all.
3. **A countable object that is a plain circle collides with the count-marker cue.** `berry` carries
   a 5-tick calyx crown for exactly this reason. A dot is already spoken for.
4. **A corner badge on a tile is arithmetically impossible at the 5-6 band floor.** On a pitch of
   `tile + gap`, a badge of radius r centred on the corner leaves `gap − r` of clearance, so any
   badge big enough to hold a 40 px digit overlaps its neighbour. Put the numeral INSIDE the tile and
   move the picture to make room. Then nothing leaves its own box and inter-tile clearance is exactly
   the gap, at every count, with no per-count check needed.
5. **Two things in one frame register exactly.** `bowl` / `bowl.rim` repeats the `nest` / `nest.rim`
   pattern at 96×44: same viewBox, same centre, near part drawn AFTER the contents so arriving
   objects tuck behind it. Any container that things go INTO wants this pair.
6. **Grade outline weights in LOGICAL px, not the 2× render** (002's critic read anti-aliasing as
   stroke and filed two false defects), and **grade a mascot's reaction pose INSIDE its hold window**
   (002's critic captured a 750 ms reaction at 1400 ms and wrongly reported the mascot never reacts).

## §11 Amendment established by the fox redraw (2026-09-06)

1. ⭐⭐ **EVERY GATE IN THE SUITE RENDERS A MASCOT AT ROUGHLY 104 LOGICAL PX, AND THAT IS
   NOT THE SIZE THE ART IS JUDGED AT.** The first fox passed `check-build`, `qa-game`, the
   85 unit tests and the visual-critic sweep, and the operator rejected it on sight — because
   §1 asks for art that reads across a room AND holds up at 400 px, and nothing in the suite
   looked at 400 px. **A mascot is not finished until it has been rendered at 384 and LOOKED
   AT, on the `#FBF3E4` stage, in every pose.** The instrument is
   `_tools/art-sheet.js <slug> <entry,…>`, which draws every entry at 48/96/192/384 px (it also takes
   `--from=<draft.json>`, so a drawing can be judged BEFORE it enters `_lib/art.js`).
   Render on the stage colour, never on white: a white-bibbed mascot on white loses its
   belly edge and the defect hides.
2. **A LIMB BUILT FROM A FAT STROKE HAS NO SHOULDER.** The first fox's legs were a 9-unit
   stroke inside a 12-unit ink stroke, which at 96 units is as wide as the head is tall, and
   a stroke has no join to the body — it hung off the middle of the chest like a bandage.
   Limbs are FILLED PATHS with their own 3 px outline, emerging from under the body mass at
   a shoulder and a haunch. And **draw all of them**: two limbs on a quadruped read as a
   defect, not as economy.
3. **A FAR-SIDE PART IS SHADED, NEVER RE-MATERIALISED.** The ink-12 % wash may darken the
   russet of a far limb; it must NOT be laid over that limb's white sock, or the far paw
   changes colour and the two sides read as different animals. Wash the body-coloured
   segment only.
4. **A BOLTED-ON SNOUT READS AS A BILL.** A projecting three-quarter muzzle has to be a
   lobe stuck to a round skull, and at size it reads as a beak — worse, an open mouth in
   that construction reads as something held in the jaws. The front-facing fox mask solves
   it by making the taper the HEAD OUTLINE itself: a rounded triangle, wide at the ears,
   narrowing to the nose. It is the strongest fox cue available and it is the one that
   survives 48 px. Applies to every pointed-face mascot on the roster.
5. **AN ELLIPSE IS NOT A BELLY.** A white ellipse laid on a body floats in the middle of it
   and reads as a pill. An underbelly is a PATH whose lower edge follows the body's own
   bottom outline, inset ~1.2 so the 3 px ink line still reads.
6. **AN INK-WASHED EAR IS A HORN.** Filling an ear interior with the wash leaves the 3 px
   outline dominant and the ear reads as a dark hollow triangle — closer to a horn than to
   fur, and worst in the surprised pose where the ears are the loudest thing on the head.
   The hollow is a SMALL inner triangle, unstroked, well inside the ear.
7. ⚠ **`indexOf` ON A COMMENT HEADER FINDS THE FIRST ONE.** Splicing the fox block out of
   `_lib/art.js` by searching for its `GAME 001` header hit the *berry/bowl* block, which
   carries the same header, and silently deleted `berry`, `bowl` and `bowl.rim` — and the
   85 unit tests still passed, because no test names them. Anchor a splice on a string
   unique to the block, and assert both that every entry you meant to replace is inside the
   cut AND that every entry you did not is outside it.
