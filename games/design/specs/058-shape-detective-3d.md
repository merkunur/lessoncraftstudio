# 058 — Shape Detective 3D

## Identity
- Slug: `shape-detective-3d`
- Subject / topic: Mathematics / naming 3D shapes — cube, sphere, cone, cylinder, cuboid — from a turning solid, and telling a solid from its flat shadow
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (five carved plinths standing in the world; the pattern is unchanged, because a pattern is now only how the finger reaches the world)
- Frame: THE ROUNDS
- Mission title (Boot screen): "The Lamp Path"
- Estimated build size: ~640 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Frame contract: `design/MISSIONS.md` FRAME 5 — THE ROUNDS. Ruling: `design/GAME-DESIGN-LAW.md`. The solids and their icons are language-neutral shapes; the five shape NAMES are game-specific strings translated by the translation step (§9) — no `LOCALE_DATA` table is needed because nothing else varies by locale.

## Learning
- Objective: Names a 3D solid (cube, sphere, cone, cylinder, cuboid) shown turning through three views by tapping its name tile, and distinguishes the solid from the 2D shadow it casts.
- Prerequisites: Names the four basic 2D shapes (game 005); reads single words (the tiles carry an icon beside each name at L1-L2 so a weak reader can still play).
- Curriculum links: F-115 (3D shapes called by 2D names — "ball is a circle"; cube = cuboid; "curved surfaces have no faces" — with the responses rotate live, show shadow vs object, count faces), F-21 (3D cube/sphere + cylinder/cone/cuboid in the common core by 8), F-31 row "3D shapes named" — conservative 7-9, earliest 5 → 6-8 (US K.G.A.2-3 / 1.G.A.1 "cubes, cones, cylinders, spheres … two-dimensional or three-dimensional"; England Y1 "3-D shapes … cuboids (including cubes), pyramids and spheres"; Germany Klasse 1-2 "Körper: Würfel, Quader, Kugel, Zylinder, Kegel"; France CP-CE1 "cube, pavé droit, boule, cylindre, cône"; Netherlands groep 3-4 "kubus, bol, cilinder, kegel, balk"; Spain 1º ciclo "cuerpos geométricos"; Brazil EF02MA14; Sweden åk 1-3 "klot, kub, rätblock, cylinder, kon"; Finland grade 1-2 "kappaleet").
- Common misconceptions (F-115), each with this game's response:
  1. **A 3D solid named by its 2D face ("the ball is a circle", "the box is a square").** Response: the lamp does not catch, and the owl's hand-lamp swings low — the stone standing in her claws throws a flat shadow down onto the apron (`ART.shadowCircle` / `ART.shadowSquare` / `ART.shadowRect` / `ART.shadowTri` via `ANIM.castShadow`), and then **she turns the stone one quarter and the shadow CHANGES SHAPE while the stone does not change what it is** — a cylinder's shadow goes from a rectangle to a circle in front of the child. A breeze (`ANIM.ripple`) crosses the apron *through* the shadow, showing it is a mark and not a thing; then the shadow withdraws and the lamp dims. This is stronger than showing one shadow: one shadow only teaches "the shadow is flat", whereas a shadow that changes under a turn refutes the misconception outright — *a flat shape cannot name a solid, because the same solid has several.* No 2D name is carved on any plinth, so the cue is the whole cue.
  2. **Cube and cuboid confused (any box is a cube).** Response: L2 brings cuboid stones onto a path where the cube plinth (A, x = 88) and the cuboid plinth (E, x = 632) both already stand; on a refusal between them the stone's edges light one at a time (`ART.edgeGlow`, `tone("tap", k)`) and the `ART.edgeTick`s show equal marks on a cube's edges and two lengths of tick on a cuboid's — same faces, different edge lengths. Then **she turns it a quarter** (`ANIM.roll`): the cuboid is still long from the new side; the cube is the same from every side. The turn carries invariance, which a static edge-glow could not. And the comparison is **permanent**: by the finish, plinth A and plinth E each carry their own stones under their own carved names, a standing side-by-side the child built and can look back at.
  3. **Cylinder and cone confused (both "round"), or cone named "triangle".** Response: on a refusal she **tips the stone up to show its top** (`ANIM.tipUp`) — an act she performs rather than a rotation that happens to her: a cone comes to a point (`ART.apexDot` pulses), a cylinder shows its second circular face (`ART.faceGlow` on the rim); the shadow reveal then shows the cone's triangle shadow against the cylinder's rectangle.
  4. **Prototype pose only (a cylinder lying down "isn't a cylinder").** Response: three things, and the third is the best thing the persistent world buys this game. (a) Stones arrive lying and tilted from L2 and in their least typical view at L3. (b) The child can turn *any* stone through its three views in the owl's claws, and **turning never changes which plinth it belongs on** — the invariance is something the child does, not something the game asserts. (c) **Each plinth ends the session carrying its solid in more than one pose under one carved name** — a standing cylinder and a lying cylinder, side by side, on the plinth that says *cylinder*, put there by the child. A permanent, child-authored refutation that is still on screen at the finish.
  5. **Guessing by tile position or icon colour.** Response: re-staged onto a different mechanism, and the substitution is flagged rather than hidden. The original response was *"tile order is shuffled per item"*, and **that response cannot survive in a persistent world** — a station that jumps when you knock on it destroys the world's constancy (GAME-DESIGN-LAW §6). The diagnosis is unchanged and is answered by **THE ONE-WAY SET-DOWN** (Rules): a set-down is irreversible, so an item touched by a wrong move can never again be first-try; the support ladder closes an item in three attempts against five plinths, so a guesser reaches the show-me before the candidate set is exhausted; the content list never repeats a solid twice running (§13 in its fixed-world form). And the replacement is stronger than the original: because the plinths never move and never swap names, **positional memory in a fixed world IS name knowledge** — a child who memorises "it is the third one along" has memorised that the third one along is the cone plinth, so the exploit and the objective are the same thing. The two colour-neutral halves carry over verbatim: all icons are the same ink outline, and at L3 the icons are withdrawn from the plates entirely (cue fading, F-46).

## Mission

**Mission, as the child would say it.** *Carry the lamp-stones up the dark path so the owlets can see me coming.*

**The want — legible in a single still frame, with nothing written.** An owl at the bottom of a dark path with a barrow. Five stone plinths standing empty, each with a name carved on it. Five lamp hoods above them, all unlit. Three small owls sitting in a dark hollow at the top right. The lack is the five empty plinths and the dark between the last lit one and the roost.

**The goal.** The roost at (642, 100), on screen from the first tap, in a state only arrival changes. Its three owlets are Device 1, THE WAITING PARTY: drawn from tap one, never cold, never hungry, never in danger, and they **do not react to a single answer** — a waiting party that responds per item is an approval meter, which is F-44's banned shape. They change once, at the finish.

### The single state variable

**`S` = which stones stand on which plinths.**

- **Mathematical reading.** The naming itself. A stone standing on the plinth carved *cylinder* **is** the proposition "this solid is a cylinder", made physical and left standing. The set of stones on plinths is the set of namings the child has committed.
- **Physical reading.** How far the light has got up the path, and how far the owl has come. A plinth's lamp is lit exactly when a stone stands on it; the dark between the furthest-lit plinth and the roost is what remains.

One variable, two readings. The commit handler asks **"which plinth is the owl standing at, and will its lamp take this stone?"** — never `tapped === item.answer`.

**Honest declaration (MISSIONS §8.2 Tier C discipline).** This state is split down the middle and the spec will not pretend otherwise. The *knowing* half is genuinely physical and positional: a solid cannot be identified from one side, so the child must act — turn it — to acquire the information, and no amount of staring substitutes. The *labelling* half is conventional: a plinth cannot physically reject a wrongly-named stone the way 005's square hole physically rejects a rectangle. **All naming is convention; a game about naming cannot have a physical joint there, and a design claiming one would be lying.** So the refusal is staged as the lamp failing to catch, with the *reason* delivered by the world (the shadow, the edge ticks, the tipped-up top) — Device 3, an honest obstacle, but conventional at its root.

### The isomorphism

**Naming a solid is putting it in the place that bears its name — and which place that is cannot be known until it has been looked at from more than one side.** Two halves, and both are the child's action rather than the game's assertion.

1. **Turning is knowing.** The stone arrives in one view. Tapping it makes the owl roll it a quarter in her claws and a new face comes round; three views cycle. This is the entire cognitive content of 3D naming — one silhouette is ambiguous (a circle is a sphere *or* a cylinder end-on *or* a cone from above) and the only way past it is to change the relationship between viewer and object. In the original spec the object rotated by itself, at 900 ms per view, for ever, whether or not the child was looking; **that is banned outright by the F1 freeze rule** (nothing may tween while a choice is open), and deleting it is a gain: the child now has to *decide to check*, which is the habit the objective actually trains. `view = f(the taps the child chose to make)`.
2. **Setting down is naming.** `answer = f(owl.position)` — the commit reads which plinth she is standing at when the stone goes down. The plinths are not answer tiles moved into a picture: they are permanent, they are carved, they never shuffle, and a stone set on one **stays there for the rest of the session**. By the end the child has not answered ten questions; they have built a lit path whose five plinths each carry the solids that belong to that word.

The original caption *"What shape is it?"* is **deleted**. It is the tell — a question printed on a card is a test, and the child is never presented with one. The name is still fully visible in the same frame as the fiction, carved into the stone she is walking toward, so the notation is **integrated, never concealed**; this is emphatically not a word problem.

### The commit handler, written out

```
onPlinthTap(p):   walkTo(p.x)                      // ACT — she goes there; ≤ 900 ms
                  var here = plinthAt(owl.x);      // the commit READS HER POSITION
                  if (here.lamp.catches(stone))    // will the world take the move?
                       seat(stone, here); light(here.hood);
                  else refuse(here);               // sits proud, rocks once, comes back
```

The tapped id is discarded; `plinthAt(owl.x)` is the truth, and it is still the truth at the start of the next item, because **her x persists** (L2 PERSISTENCE). She never returns to a start coordinate and there is no home position she bobs at.

### The three deletion tests

- **A · Delete the maths — every plinth takes every stone.** She walks to whichever plinth she likes, the lamp catches every time, the path lights itself and ten stones distribute at random. Nothing to choose, nothing to look at, and the turn instrument has no purpose because no view can matter. What is left is an owl pushing a barrow past five identical pedestals. **Nothing playable survives.**
- **B · Delete the mission — remove the owl, the path, the plinths, the roost and the owlets.** There are no plinths to set a stone on, so there is no commit target; the handler reads `owl.position` and there is no owl and no position to read; there is no lamp to catch or fail to catch, so there is no correctness event at all; and the cues are choreographed on a stone held in claws that no longer exist. **No item can complete.** Contrast the original spec, which passed this test only trivially: delete its owl at (110, 160) with the magnifier at (150, 190) and the three tiles at y = 380 still work perfectly, because that owl was never load-bearing for a single item.
- **C · Delete the walking — patch every traversal to `duration: 0`.** She appears at the chosen plinth instead of walking to it; the stone snaps to its next view instead of rolling; the shadow appears instead of sliding out; the lamp is on instead of coming on. **Every position, every state, every item outcome and the whole finish state are identical, and the item log is byte-identical.** That is the pass condition, and it is worth saying what it means: **the travel here is doing no work as spectacle.** The work is done by the *arrangement* — a hero with somewhere to be, a goal whose distance shrinks, a history that stays on screen — which is why this fits inside F-42 and inside a fixed 720 × 560 stage with no scrolling.

### The F-42 gate

| # | how this game satisfies it |
|---|---|
| **F1 freeze** | During DECIDE, zero tweens run: the stone is static in one view, the owl holds `owlIdle`, lit lamps are **static with no flicker**, the owlets do not move, and the show-me is a one-shot glow that **holds** rather than pulsing (see Rules). Every pixel that moves was caused by a tap. |
| **F2 displacement** | The handler above reads `owl.x`; her position persists across items and the stone she sets stays at that position as part of `S`. |
| **F3 co-location** | One 720 × 560 frame, zero camera tweens, apparatus and hero one saccade apart. |
| **F4 single world** | Boot / Play / Finish. No hub, no map that opens anything. |
| **F5 instant-cut** | Test C above. |
| **F6 text budget** | **Zero words of authored prose on the play screen.** The only text in zone W is the five shape names carved on the plates, which are the content and the learning object. The mission premise is carried entirely by the picture. |

**ACT budget (M6, ceiling 60 s).** Ten items × (hand-over 300 ms + about two turns at 400 ms + walk ≤ 900 ms + set-down 400 ms) ≈ 22 s; about six refusals × (rock-and-lift 700 ms + cue 1800 ms) ≈ 13 s; two show-me glows ≈ 1 s; the closing walk to the roost 900 ms. **≈ 37 s.** The longest single traverse is plinth A to plinth E, 544 px, budgeted at 870 ms; every other move is shorter. The three views cycle back to the first on the third tap, so ACT time cannot be accumulated by spinning a stone.

## World

**Zone W, y 56-420 — the world. Stage 720 × 560, `Scale.FIT`, no scrolling, static camera.**

```
y   0 +--------------------------------------------------------------+  zone T  0-56
      | [lang 16,16]                                                 |  chrome only
 56   +--------------------------------------------------------------+
      |                                        roost hollow (642,100)|
      |                                        owlets 620 / 642 / 664|
      |  (168)   (164)    (160)    (156)    (152)   lamp hoods       |
      |  [216]   [212]    [208]    [204]    [200]   stones set here  |
      |  ==244   ==240    ==236    ==232    ==228   slabs            |  zone W
      | |cube |  |spher|  |cone |  |cylin|  |cuboi| name plates      |  56-420
      |  x=88    x=224    x=360    x=496    x=632                    |
      |  ~~~~~~~~~ the path, feet-line 396 -> 372 ~~~~~~~~~~~~~~~~   |
      |   owl (feet on the line)   stone at owl.x+48                 |
420   +--------------------------------------------------------------+
      |  the apron: the flat shadow lies here, y=430, during a cue    |  zone H
      |  NO CONTROLS OF ANY KIND DURING PLAY                          |  420-560
560   +--------------------------------------------------------------+
```

**The five plinths — fixed for the whole session, never renamed, never moved, never shuffled.**

| | carved name | x | slab cy | hood cy | set-stones cy | plate cy | tap rect |
|---|---|---|---|---|---|---|---|
| A | cube | 88 | 244 | 168 | 216 | 279 | 120 × 132 at (88, 252) |
| B | sphere | 224 | 240 | 164 | 212 | 275 | 120 × 132 at (224, 248) |
| C | cone | 360 | 236 | 160 | 208 | 271 | 120 × 132 at (360, 244) |
| D | cylinder | 496 | 232 | 156 | 204 | 267 | 120 × 132 at (496, 240) |
| E | cuboid | 632 | 228 | 152 | 200 | 263 | 120 × 132 at (632, 236) |

Pitch **136**, tap rects **120 wide, so gaps are 16** (floor 12). Every target 120 × 132, far over the 56 px band floor (F-49, F-69). The row rises 16 px left to right so the path visibly **climbs toward the roost**.

- **Slab** `ART.plinth` 108 × 18; **column** `ART.plinthColumn`, an 8 px line from the slab down to the path.
- **Name plate** `ART.plinthLabel` 120 × 52, the carved name at 20 px `THEME.font.display` `THEME.colour.ink`, `wordWrap` 112, at most three lines with a 16 px floor for long locale terms. The 24 px ink-outline icon (`ART.iconCube` and siblings) sits at the plate's left at L1-L2 and is **withdrawn at L3** — the original's cue fading, preserved exactly. The icons are scaffold, not world state: dropping a level restores them, which is kindness, not decay.
- **Lamp hood** `ART.lampHood` 34 × 26 above each plinth, dark until that plinth takes its first stone; then `ART.lampFlame` plus a static `ART.lampPool` 130 × 26 on the path below it. **Static — no flicker**, because a flicker is an idle loop and F1 forbids one.
- **Stones already set** stand on the slab at (x − 28, slabCy − 28) and (x + 28, slabCy − 28) at scale 0.42; a third re-lays all three at scale 0.34 across (x − 40, x, x + 40). They stay for the session.

**The roost — the goal and the waiting party.** `ART.roostHollow` 96 × 72 at (642, 100); three `ART.owlet` at (620, 116), (642, 112), (664, 116), 26 px, drawn at alpha 0.55 from tap one and unchanged until the finish.

**The path.** `ART.path`, a pale band whose top edge runs (40, 372) to (700, 348) and whose bottom edge runs (40, 420) to (700, 396); past x = 660 it turns up as a short rise to the roost. The owl's feet ride the band's centre line, `feetY(x) = 396 − (x − 40) × 0.0364`: her five stops are **394 / 389 / 384 / 380 / 375**. She starts at (52, feet 396). Over the band, five `ART.pathDark` segments (136 px wide, one per plinth) hold the unlit stretch; a segment is destroyed permanently the moment its plinth's lamp catches.

**The owl.** 76 px, drawn with her feet on the centre line, so her body sits at (x, feetY − 38). She carries `ART.handLamp` at (owl.x − 26, feetY − 30) on her near side.

**The stone — the item, and the turn instrument.** Held out ahead of her at `(min(owl.x + 48, 660), feetY(owl.x) − 46)`, 88 px, 70 px at L3 (scale 0.8). Its own 88 × 88 tap target is how the child turns it. The clamp at 660 keeps it 16 px clear of the stage edge when she stands at plinth E. Built as containers of parts exactly as the original: cube + 3 seams · cuboid + 3 seams · sphere + shade arc · cone + base ellipse · cylEnd + cylinder + cylEnd, plus the flat-view parts (below).

**The barrow.** `ART.barrow` 44 × 30 at `(max(owl.x − 46, 30), feetY(owl.x) − 12)`, travelling with her and holding the next stone, which rises out of it (`ANIM.lift` + `ANIM.appear`). Not a tap target. If it clutters at 400 px it is the first thing to cut.

**Interactive elements (F-69 as ratified in MISSIONS §5.1: the character, every station, every candidate, each instrument as one): the owl 1 + five plinths 5 + the stone-as-turn-instrument 1 = 7.**

**Zone H, y 420-560, is EMPTY during play** — the world is the hand, which is what THE ROUNDS prescribes when the items lie in the world rather than in a tray. There is no tile row, no keypad and no Check button. Deliberately so: **a row of answer tiles along the bottom is the worksheet tell**, and moving the original's three 200 × 96 tiles from y = 380 up into the world as carved, permanent, walk-to-able plinths is the single change that turns this from an activity into a game. Zone H carries exactly two things, neither of them a control:

- **The flat shadow during a correction cue**, on the apron at `(stoneX, 430)`, up to 160 × 48 (`scaleY` 0.3). It lies on the ground below and in front of the solid standing in the air — one saccade apart, so "flat down there, solid up here" is a spatial fact rather than a sentence.
- **On the Finish screen only:** `play_again` at (250, 510) and `menu` at (470, 510).

**Diegetic progress, and the cheat that was refused.** Progress is the lamps and the plinths themselves in their new state, never a token standing for one. The lit plinths are the light; the dark segments are the remainder; `mission.progress` is the x of the furthest-lit plinth and it is monotone. **Nothing counts anything.** And each of ten items was deliberately *not* given its own little light: ten lights filling one per item is the old progress display wearing a hat. There are **five** lights, they are per-plinth, they come on at content-driven moments, and they light a path.

**The ratchet.** Every lamp, once lit, stays lit; every stone, once standing, stays standing; every dark segment, once destroyed, is gone. Nothing dims, nothing decays, nothing is taken back. A wrong move fails to advance the world; it never reverses it. Nothing in the world can get worse — no fall, no drop, no collapse, no meter emptying, no path closing, no companion leaving.

## How it plays

**Boot.** `S("title")` at (360, 150), 52 px `THEME.font.display` `THEME.colour.structure`; `ART.owlIdle` at (360, 250) with `ART.barrow` beside her and one stone in it; `makeButton` `t("start")` at (360, 400); language picker at (16, 16). A 2 % breathing idle is allowed here and only here. **Never auto-starts.**

**Play `create()`** draws, in this order: `ART.path`; five `ART.pathDark` segments; for each plinth `ART.plinthColumn`, `ART.plinth`, `ART.plinthLabel` with its carved name and (at L1-L2) its icon, and a dark `ART.lampHood`; `ART.roostHollow` with three `ART.owlet` at alpha 0.55; then the owl at (52, feet 396) in pose `ART.owlIdle` with `ART.handLamp`, and `ART.barrow` at (30, 384). `GameCore.reportHeight()`.

**Item 1 — L1, a sphere, arriving in its upright view.** The stone rises out of the barrow into her claws (`ANIM.lift`, then `ANIM.appear`) at (100, 350), 88 px. **First item only:** she turns it once unbidden (`ANIM.roll`) and then holds — F-42's own first-presentation concession, and the mitigation for the risk that a child never discovers the turn (R4, and Risks below). Then the stage **freezes**: six targets enabled, zero tweens running.

**Turning.** The child taps the stone. `ANIM.roll` rolls it a quarter in her claws, 400 ms, the drawn view swapping at the 200 ms midpoint; then frozen again. Three views cycle 0 → 1 → 2 → 0, so no ACT time can be banked by spinning.

**Committing.** The child taps plinth B, the one carved *sphere*, at x = 224. Pose `ART.owlWalk`; `ANIM.walk` carries her, the barrow, the hand-lamp and the held stone from 52 to 224 (172 px, so 300 ms); she arrives at (224, feet 389) and returns to `ART.owlIdle`. The handler then reads `plinthAt(owl.x)` — plinth B — and asks whether B's lamp will take a sphere.

- **The lamp catches (correct).** `ANIM.setDown` carries the stone from (272, 343) to B's slab at (196, 212), scale 0.42, where it stands for the rest of the session. `ANIM.lampCatch` brings `ART.lampFlame` and `ART.lampPool` up from alpha 0 to 1 and they **stay**; B's `ART.pathDark` segment is destroyed. `GameCore.tone("correct")`; pose `ART.owlHappy` for 400 ms, then `ART.owlIdle`; `GameCore.showPraise` takes the next key in the rotation. After 300 ms the next stone rises from the barrow. First-try correct: one of the two consecutive needed to move up a level.
- **The lamp does not catch (wrong).** The stone is set on the slab and **does not settle** — it sits proud and rocks once (`ANIM.rock`, 6°, 400 ms), the hood stays dark, `tone("nudge")`, and `ANIM.lift` brings it back up into her claws (300 ms). **She is still holding it, so attempt 2 costs one tap** — the shape F-46's support ladder wants, and the crab precedent from MISSIONS §6.3. Nothing falls, nothing is lost, the plinth is unmarked: no cross, no tally, no mark of any kind. Pose `ART.owlOops` for 400 ms — **surprise, never disapproval, per ART-BIBLE §12** — then `ART.owlThink`. The reviewer check is the wrong-answer screenshot: if the creature's state changed to anything unhappy, reject.

**The cue — an honest obstacle, 1800 ms, world frozen, every target disabled.** Her hand-lamp swings low and the world says *why*, on the stone in her claws. Which cue plays is decided by the pair (Rules). It runs **1800 ms against the original's 1200 ms, so correction duration rises rather than falls** — elaborated feedback is the most expensive thing in the corpus to break (F-40). When it ends the targets re-enable and she is still holding the stone.

**Attempt 3 — the show-me.** The correct plinth's hood glows low: `ART.showRing` around it, brought from alpha 0.2 to 1 by `ANIM.lampLow` **once, holding at full**. It does not pulse: a target animating while a choice is open breaks the freeze rule, so the original's 1 Hz `showMe` is deliberately replaced by a one-shot glow that holds. Walking there and setting the stone down completes the item as solved-with-help, with no praise pop. **There is no attempt 4, and no way for the session to end other than by finishing.**

**The empty-hand guard.** If a plinth is tapped while her claws are empty — reachable only through a queued keyboard Enter on the hand-over frame — she looks up at it and its carved name brightens once (`ANIM.brighten`); nothing is committed. The original's harmless preview, kept as the handler's guard clause.

**A worked session, item by item, with the branches.**

1. **L1, sphere, upright.** She demonstrates one turn; the child taps plinth B (52 → 224, 300 ms). Lamp B catches. First-try.
2. **L1, cone, upright.** The child taps plinth C at x = 360 (224 → 360, 300 ms). Lamp C catches. First-try — two consecutive, so item 3 comes from L2.
3. **L2, cuboid, arriving END-ON, which is a plain square.** The child does not turn it and taps plinth A, *cube*, at x = 88 (360 → 88, 435 ms). `plinthAt(88)` is the cube plinth; a cuboid is not a cube; the stone sits proud and rocks. **Cue for the cube/cuboid pair:** the edges light one at a time with `tone("tap", k)` 250 ms apart, `ART.edgeTick`s showing two lengths of tick along the long edges; then `ANIM.roll` turns it a quarter to the tilted long view — still long from the new side. Attempt 2: the child taps the stone once more, then plinth E, *cuboid*, at x = 632 (88 → 632, 544 px, 870 ms). Lamp E catches. Solved, not first-try — and per THE ONE-WAY SET-DOWN it can never again be first-try. Adaptation: item 4 comes from L1.
4. **L1, cylinder, upright.** Plinth D at x = 496. First-try.
5. **L1, sphere, upright.** Plinth B. First-try — two consecutive, so item 6 comes from L2.
6. **L2, cylinder, arriving END-ON, which is a plain circle.** The child taps the stone twice to reach the upright view, then plinth D. First-try.
7. **L2, cone, arriving FROM ABOVE, which is a circle with a point at its centre.** The child taps plinth D, *cylinder*. Refusal at D. **Cue for the cone/cylinder pair:** `ANIM.tipUp` tips the stone to show its top, `ART.apexDot` pulses (`ANIM.pulse`) because it comes to a point; then `ANIM.castShadow` slides `ART.shadowTri` onto the apron at (544, 430) while the stone stands above it, and it withdraws. Attempt 2: plinth C, *cone* (496 → 360, 300 ms). Lamp C catches — C now carries two stones, at (332, 208) and (388, 208).
8. **L1, cube, upright.** Plinth A. First-try.
9. **L1, cone, upright.** Plinth C. First-try — two consecutive, so item 10 comes from L2.
10. **L2, sphere, shaded from the other side.** The child taps plinth D, *cylinder*. Refusal. **Cue for the round/flat-faced confusion:** the hand-lamp swings low, `ART.shadowCircle` slides onto the apron, then **she turns the stone and the shadow stays a circle while a cylinder's would have become a rectangle** — a breeze (`ANIM.ripple`) crosses through it — and it withdraws. Attempt 2: plinth B. Lamp B catches.

**Finish.** All ten stones stand, all five hoods are lit and every `ART.pathDark` segment is gone, so the path is lit end to end. `ANIM.climb` walks her from her last plinth up the final rise to the roost at (642, 140), 900 ms; the three owlets brighten from alpha 0.55 to 1 — **their one and only change all session** — and `ANIM.celebrate` runs on the group. The Finish scene re-draws the world at its play coordinates: the five plinths carrying the stones the child put there, under their carved names, the lit path, the owl among her owlets. This is the original's summary row — *"the five solids in a row … the set the detective can now name"* — except that it is no longer a certificate drawn at the end: **it is the world the child built, where they built it.** `t("all_done")` at (360, 76); `makeButton` `play_again` at (250, 510) and `menu` at (470, 510); `GameCore.tone("finish")` once; `GameCore.reportHeight()`. **No score, no stars, no first-try count, nothing counting anything.**

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  owlIdle:      { kind: "svg", value: LCSArt.get("owl.idle"),  size: 76, fallback: "🦉" },
  owlWalk:      { kind: "svg", value: LCSArt.get("owl.walk"),  size: 76 },
  owlThink:     { kind: "svg", value: LCSArt.get("owl.think"), size: 76 },
  owlHappy:     { kind: "svg", value: LCSArt.get("owl.happy"), size: 76 },
  owlOops:      { kind: "svg", value: LCSArt.get("owl.oops"),  size: 76 },
  owlAct:       { kind: "svg", value: LCSArt.get("owl.act"),   size: 76 },
  owlet:        { kind: "svg", value: LCSArt.get("owl.chick"), size: 26 },
  handLamp:     { kind: "shape", shape: "polygon", points: [[0,-11],[9,-2],[9,11],[-9,11],[-9,-2]], fill: "surface2", stroke: "structure", strokeWidth: 2 },
  barrow:       { kind: "shape", shape: "roundRect", w: 44, h: 30, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 6 },
  roostHollow:  { kind: "shape", shape: "ellipse", w: 96, h: 72, fill: "surface2", stroke: "structure", strokeWidth: 3 },
  path:         { kind: "shape", shape: "polygon", points: [[-330,-24],[330,-48],[330,0],[-330,24]], fill: "surface2", stroke: "line", strokeWidth: 2 },
  pathDark:     { kind: "shape", shape: "rect", w: 136, h: 46, fill: "structure" },
  plinth:       { kind: "shape", shape: "roundRect", w: 108, h: 18, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },
  plinthColumn: { kind: "shape", shape: "line", w: 8, stroke: "line", strokeWidth: 8 },
  plinthLabel:  { kind: "shape", shape: "roundRect", w: 120, h: 52, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },
  lampHood:     { kind: "shape", shape: "polygon", points: [[-17,-13],[17,-13],[11,13],[-11,13]], fill: "surface2", stroke: "structure", strokeWidth: 3 },
  lampFlame:    { kind: "shape", shape: "ellipse", w: 20, h: 26, fill: "structure" },
  lampPool:     { kind: "shape", shape: "ellipse", w: 130, h: 26, fill: "structureSoft" },
  cube:         { kind: "shape", shape: "polygon", points: [[0,-70],[60,-35],[60,35],[0,70],[-60,35],[-60,-35]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  cubeSeam:     { kind: "shape", shape: "line", w: 3, stroke: "structure", strokeWidth: 3 },
  cuboid:       { kind: "shape", shape: "polygon", points: [[-30,-60],[70,-30],[70,30],[-30,60],[-70,40],[-70,-40]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  cuboidSeam:   { kind: "shape", shape: "line", w: 3, stroke: "structure", strokeWidth: 3 },
  faceSquare:   { kind: "shape", shape: "rect", w: 88, h: 88, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  sphere:       { kind: "shape", shape: "circle", r: 64, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  sphereShade:  { kind: "shape", shape: "arc", r: 50, stroke: "structure", strokeWidth: 3 },
  cone:         { kind: "shape", shape: "polygon", points: [[0,-72],[58,48],[-58,48]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  coneBase:     { kind: "shape", shape: "ellipse", w: 116, h: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  faceCircle:   { kind: "shape", shape: "circle", r: 46, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  coneApex:     { kind: "shape", shape: "circle", r: 5, fill: "ink" },
  cylinder:     { kind: "shape", shape: "rect", w: 100, h: 110, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  cylEnd:       { kind: "shape", shape: "ellipse", w: 100, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  cylRim:       { kind: "shape", shape: "circle", r: 38, stroke: "structure", strokeWidth: 3 },
  apexDot:      { kind: "shape", shape: "circle", r: 9, fill: "accent" },
  faceGlow:     { kind: "shape", shape: "ellipse", w: 104, h: 34, stroke: "accent", strokeWidth: 4 },
  edgeGlow:     { kind: "shape", shape: "line", w: 4, stroke: "accent", strokeWidth: 5 },
  edgeTick:     { kind: "shape", shape: "rect", w: 10, h: 3, fill: "ink" },
  shadowCircle: { kind: "shape", shape: "ellipse", w: 140, h: 40, fill: "line" },
  shadowSquare: { kind: "shape", shape: "rect", w: 120, h: 120, fill: "line" },
  shadowRect:   { kind: "shape", shape: "rect", w: 160, h: 100, fill: "line" },
  shadowTri:    { kind: "shape", shape: "polygon", points: [[0,-72],[58,48],[-58,48]], fill: "line" },
  iconCube:     { kind: "shape", shape: "polygon", points: [[0,-12],[10,-6],[10,6],[0,12],[-10,6],[-10,-6]], stroke: "ink", strokeWidth: 2 },
  iconCuboid:   { kind: "shape", shape: "polygon", points: [[-5,-10],[12,-5],[12,5],[-5,10],[-12,6],[-12,-6]], stroke: "ink", strokeWidth: 2 },
  iconSphere:   { kind: "shape", shape: "circle", r: 11, stroke: "ink", strokeWidth: 2 },
  iconCone:     { kind: "shape", shape: "polygon", points: [[0,-12],[10,9],[-10,9]], stroke: "ink", strokeWidth: 2 },
  iconCylinder: { kind: "shape", shape: "rect", w: 17, h: 20, stroke: "ink", strokeWidth: 2 },
  showRing:     { kind: "shape", shape: "roundRect", w: 46, h: 38, stroke: "structure", strokeWidth: 4, radius: 10 }
};
```
The only emoji in the file is the declared `fallback` on `owlIdle`, per §4. **The owl is roster animal 36 and is drawn once at 96 px master size into `_lib/art.js` under `owl.<pose>`**; her poses are discrete swapped drawings, never a tween of one drawing, and `owl.oops` is SURPRISE (whites grow while the pupils shrink) and never disapproval. There is no ground shadow under her.

**Each solid is one container of parts, and each has THREE DRAWN VIEWS** — not a rotation of one picture, because rotating a drawing does not bring a new face round. The views are chosen so that **at least one view of every solid is genuinely ambiguous with another solid**, which is what makes turning necessary rather than decorative:

| solid | view 0 | view 1 | view 2 |
|---|---|---|---|
| cube | `cube` + 3 × `cubeSeam` (iso box) | `faceSquare` — face-on, a plain square | `cube` + seams, tilted |
| cuboid | `cuboid` + 3 × `cuboidSeam` (iso long box) | `faceSquare` — end-on, **the same square as the cube's** | `cuboid` + seams, tilted |
| sphere | `sphere` + `sphereShade` at 200°-300° | `sphere` + `sphereShade` at 240°-340° | `sphere` + `sphereShade` at 260°-360° |
| cone | `cone` + `coneBase` upright | `cone` + `coneBase` lying | `faceCircle` + `coneApex` — from above |
| cylinder | `cylEnd` + `cylinder` + `cylEnd`, upright | the same, lying | `faceCircle` + `cylRim` — end-on |

Cube view 1 and cuboid view 1 are the **same drawing**, so the cube/cuboid pair cannot be settled without a turn. Cone view 2, cylinder view 2 and every sphere view are all circles, so the round family cannot be settled without a turn either. A sphere looks the same from every side, which is itself the answer. The icons are the same outline geometry in miniature; the shadows are the solid's 2D outline squashed flat (`scaleY` 0.3) on the apron. `ART.dotEmpty` and `ART.dotFull` are **not declared**: this game has no such display anywhere, including the Finish screen.

## Animation registry
```js
const ANIM = {
  walk:       { duration: 900, ease: "Sine.InOut", trigger: "the owl to the tapped plinth's x and the path's feet-line y; duration = clamp(300, 900, |dx| * 1.6); barrow, hand-lamp and held stone travel with her; pose owlWalk during, owlIdle after" },
  roll:       { angle: "+=90", duration: 400, ease: "Sine.InOut", trigger: "the child tapped the stone: she rolls it one quarter in her claws and the drawn view swaps at the 200 ms midpoint" },
  tipUp:      { angle: -28, duration: 320, ease: "Sine.Out", yoyo: true, hold: 700, trigger: "she tips the stone up to show its top during the cone/cylinder cue" },
  setDown:    { duration: 400, ease: "Sine.In", trigger: "the stone from her claws to the plinth's slab; x, y and scale set at call" },
  rock:       { angle: 6, duration: 200, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the stone sits proud and rocks once when the lamp does not catch (400 ms total)" },
  lift:       { duration: 300, ease: "Sine.Out", trigger: "the stone back up into her claws after a refusal, and up out of the barrow at the start of an item" },
  lampCatch:  { alpha: 1, duration: 300, ease: "Back.Out", trigger: "a hood's flame and its pool from alpha 0 when a stone is accepted; they STAY at alpha 1 for the session" },
  lampLow:    { alpha: 1, duration: 500, ease: "Sine.InOut", trigger: "the show-me: the correct hood's ring goes from alpha 0.2 to 1 ONCE and HOLDS. No repeat: a target animating while a choice is open breaks the freeze rule (F-42)" },
  castShadow: { y: "+=82", alpha: 1, duration: 400, ease: "Sine.Out", trigger: "the flat shadow slides down out of the stone onto the apron from alpha 0; reversed to withdraw" },
  ripple:     { x: "+=14", duration: 500, ease: "Sine.InOut", yoyo: true, trigger: "a breeze crosses the apron THROUGH the shadow, showing it is a mark and not a thing" },
  glow:       { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each edgeGlow in turn from alpha 0, 250 ms apart; also faceGlow and apexDot" },
  pulse:      { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "apexDot or faceGlow during the top cue, inside an ACT with every target disabled" },
  brighten:   { alpha: 1, duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "a plinth's carved name when it is tapped with her claws empty (the handler's empty-hand guard)" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "the next stone in the barrow, from alpha 0 scale 0.6" },
  climb:      { duration: 900, ease: "Sine.InOut", trigger: "the closing walk from her last plinth up the final rise to the roost" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the owl and the owlets on the Finish screen only" }
};
```
No flashing: nothing toggles faster than three times a second, and no animation repeats indefinitely. Every entry above runs inside an ACT caused by a tap; during DECIDE the running tween count is zero.

## Screen layout
```
y   0 +--------------------------------------------------------------+
      | [lang 16,16]                                                 |  zone T  0-56
 56   +--------------------------------------------------------------+
      |                                     roost hollow (642,100)   |
      |                                     owlets 620/642/664 y=112-116
      |  hoods    (88,168) (224,164) (360,160) (496,156) (632,152)   |
      |  set stones cy      216      212      208      204      200  |  zone W
      |  slabs      ==244   ==240    ==236    ==232    ==228         |  56-420
      |  plates    |cube |  |spher|  |cone |  |cylin|  |cuboi|       |
      |             cy279    cy275    cy271    cy267    cy263        |
      |  ~~~~~~~~ path, feet-line 396 at x=40 -> 372 at x=700 ~~~~~  |
      |    owl 76px, feet on the line   stone 88px at owl.x+48       |
420   +--------------------------------------------------------------+
      |    apron: the flat shadow at (stoneX, 430) during a cue only  |  zone H
      |    no controls of any kind during play                        |  420-560
560   +--------------------------------------------------------------+
```
Tap targets: five plinth rects 120 × 132 at (88, 252) / (224, 248) / (360, 244) / (496, 240) / (632, 236), pitch 136 so the gaps are 16; and the held stone, 88 × 88, at its current position. Nothing else is tappable during play. Tab order: the stone first, then the five plinths left to right; Enter or Space acts; the focus ring is the one thing permitted to move during DECIDE. Fixed layout, FIT scaling, no scrolling, static camera. At L3 the stone draws at scale 0.8 (70 px) and its tap rect stays 88 × 88.

## Visual specification
- Background `THEME.colour.bg`. **Zone W carries no text except the five carved names**, and there is no progress display of any kind on the play surface: progress is the lamps and the standing stones.
- `ART.path` drawn once across the foreground, its centre line the owl's feet-line; five `ART.pathDark` segments (136 × 46, `THEME.colour.structure` at alpha 0.14) centred at x = 88 / 224 / 360 / 496 / 632 hold the unlit stretch. A segment is destroyed permanently when its plinth's lamp catches, and is never re-created.
- Per plinth: `ART.plinthColumn` from the slab down to the path; `ART.plinth` at the slab centre; `ART.plinthLabel` at the plate centre carrying the carved name at 20 px `THEME.font.display` `THEME.colour.ink`, `wordWrap` 112, at most three lines, floor 16 px for long locale terms; at L1-L2 the level's icon (`ART.iconCube` / `ART.iconCuboid` / `ART.iconSphere` / `ART.iconCone` / `ART.iconCylinder`) at 24 px `THEME.colour.ink` outline at the plate's left, withdrawn at L3.
- Per plinth: `ART.lampHood` at the hood centre, drawn dark from the first frame. When a stone is accepted, `ART.lampFlame` appears inside the hood and `ART.lampPool` appears on the path directly below it, both at alpha 1 and both **static thereafter**.
- Stones already set stand on their slab at (x ± 28, slabCy − 28), scale 0.42; the third re-lays all three at (x − 40, x, x + 40), scale 0.34.
- `ART.roostHollow` at (642, 100) with three `ART.owlet` at (620, 116), (642, 112), (664, 116), alpha 0.55 for the whole session.
- The owl: `ART.owlIdle` at rest, `ART.owlWalk` while travelling, `ART.owlThink` during a cue, `ART.owlHappy` for 400 ms after a lamp catches, `ART.owlOops` for 400 ms after one does not, `ART.owlAct` on the frame the stone leaves her claws. 76 px, feet on the feet-line. `ART.handLamp` at (owl.x − 26, feetY − 30). `ART.barrow` at (max(owl.x − 46, 30), feetY − 12).
- The held stone at (min(owl.x + 48, 660), feetY − 46), 88 px, 70 px at L3, drawn above the plates so a brush at a plate's lower corner reads as her holding the stone up beside the name she is walking to. Built per the three-view table: `ART.cube` + `ART.cubeSeam` × 3 · `ART.cuboid` + `ART.cuboidSeam` × 3 · `ART.faceSquare` · `ART.sphere` + `ART.sphereShade` · `ART.cone` + `ART.coneBase` · `ART.faceCircle` + `ART.coneApex` · `ART.cylEnd` + `ART.cylinder` + `ART.cylEnd` · `ART.faceCircle` + `ART.cylRim`.
- Cue overlays, all inside an ACT with every target disabled: `ART.edgeGlow` along one edge at a time with `ART.edgeTick`s; `ART.apexDot` at a cone's point; `ART.faceGlow` on a cylinder's top rim; `ART.showRing` around the correct hood for the show-me.
- Shadows `ART.shadowCircle` / `ART.shadowSquare` / `ART.shadowRect` / `ART.shadowTri` on the apron at (stoneX, 430), `scaleY` 0.3, only during a cue, never during DECIDE.
- **Colour budget.** Cream ground, `THEME.colour.structure` teal for every piece of the apparatus, and **one coral accent per screen**: the cue overlays (`ART.edgeGlow`, `ART.apexDot`, `ART.faceGlow`) are the only `THEME.colour.accent` on the stage, and they exist only while a cue is playing. Nothing is red anywhere. Meaning is never carried by colour alone: every icon is the same ink outline and every distinction is shape, position or outline weight (F-49).
- Tap floors: plinths 120 × 132, the stone 88 × 88, both far over the 56 px band floor; gaps 16. All interactive elements at least 16 px from the stage edge, which is what the 660 clamp on the stone's x protects.

## Content
The solids and icons are language-neutral; the five names come from `STRINGS`. **All five plinths stand from the first frame at every level** — the world cannot hide or move a station — so the choice load is 5 / 5 / 5 where the original ran 3 / 3 / 4. That is the frame's one genuine price and it is named in Risks. The level ramp carries the difficulty instead: which solids appear, which view they arrive in, whether the icons are on the plates, and how large the stone is drawn.

Items are given as (solid; arrival view):

- **L1** — four solids, arrival view is the identifying one, icons on the plates. The cuboid plinth stands but no L1 stone is a cuboid.
  (sphere; upright) · (cube; iso) · (cone; upright) · (cylinder; upright) · (sphere; upright)
- **L2** — the cuboid joins; **arrival view is an ambiguous one**, so the stone cannot be named without a turn; icons on.
  (cuboid; end-on square) · (cube; face-on square) · (cylinder; end-on circle) · (cone; from above) · (cuboid; tilted iso) · (sphere; shaded from the other side)
- **L3** — icons withdrawn from the plates, stone at scale 0.8, arrival view is the least typical.
  (cylinder; end-on circle) · (cuboid; end-on square) · (cone; from above) · (cube; face-on square) · (sphere; shaded from below)

Play list of 10 per Rules; within a level the pool is shuffled and not repeated until exhausted. **§13 in its fixed-world form: never the same solid twice running**, enforced on the content list rather than on the layout, because the layout is the world and does not move.

**Distractor legality (§8.1).** The candidate set is the five plinths, and every wrong one for a given stone is the output of an error this game diagnoses: cube against cuboid is misconception 2, cone against cylinder is misconception 3, anything against sphere is the round-versus-flat-faced confusion of misconception 1, and a mis-name driven by an unusual arrival view is misconception 4. There is no absurd candidate on the path, so a wrong set-down always carries a diagnostic signal and the cue that follows is chosen by which pair it was.

Worked example: item 1 (sphere) first-try · item 2 (cone) first-try, so L2 · item 3 (cuboid arriving as a plain square) set down on the cube plinth, the edge-and-turn cue, then set down on the cuboid plinth, so L1 · item 4 (cylinder) first-try · item 5 (sphere) first-try, so L2 · item 6 (cylinder arriving end-on) turned twice then first-try · item 7 (cone from above) set down on the cylinder plinth, the tip-up-and-shadow cue, then the cone plinth · items 8-10 with one more miss. Finish: ten stones standing on five lit plinths, the cylinder plinth carrying one upright and one lying stone under one name.

## Rules
- **Item count**: 10.
- **Difficulty progression**: 2 consecutive first-try correct → the next item comes from the next level up (cap L3).
- **Adaptation**: any wrong set-down on an item, or a wrong first attempt on 2 consecutive items → the next item comes from one level down (floor L1). Dropping a level restores the plate icons; scaffold returning is support, not decay, and the world's own marks are untouched by it.
- **What happens on a correct answer**: the commit reads `plinthAt(owl.x)`; the lamp catches; `ANIM.setDown` seats the stone on that plinth's slab where it stands for the rest of the session; `ANIM.lampCatch` lights the hood and its pool permanently and that plinth's `ART.pathDark` segment is destroyed; `GameCore.tone("correct")`; pose `ART.owlHappy` 400 ms; praise rotation `["well_done", "great_job", "excellent", "you_did_it", "keep_going"]`; the next stone rises from the barrow after 300 ms. Her x persists into the next item.
- **What happens on a wrong answer** (the lamp does not catch; per the pair, world frozen, every target disabled, 1800 ms):
  - **Cube against cuboid**: `ANIM.rock`, `tone("nudge")`, `ANIM.lift`; then the edges light one by one with `tone("tap", k)` and `ART.edgeTick`s — single ticks on a cube's edges, two lengths on a cuboid's long edges — then `ANIM.roll` turns it a quarter and it is still long, or still the same, from the new side.
  - **Cone against cylinder**: rock, tone, lift; then `ANIM.tipUp` shows the top — `ART.apexDot` pulses on a cone, `ART.faceGlow` on a cylinder's rim — then the shadow reveal, triangle against rectangle.
  - **Any round-versus-flat-faced confusion, and every other pair**: rock, tone, lift; then the hand-lamp swings low, the flat shadow slides onto the apron under the standing stone, **she turns the stone and the shadow changes shape while the stone does not change what it is**, `ANIM.ripple` crosses through it, and it withdraws.
- **Retry behaviour**: attempt 1 unaided; attempt 2 after the cue, costing one tap because she is still holding the stone; attempt 3 with the show-me — the correct hood's `ART.showRing` glows once via `ANIM.lampLow` and holds — and setting the stone there completes the item as solved-with-help, with no praise pop. No attempt 4. If a plinth is tapped with her claws empty, `ANIM.brighten` runs on its carved name and nothing is committed.
- **Finish condition**: 10 items. No losing state; no clock. Exactly zero ways a session ends other than by finishing. Nothing in the world may decay: no lamp goes out, no stone comes back, no segment re-darkens, no owlet leaves.
- **Anti-brute-force guard — THE ONE-WAY SET-DOWN.** P1's per-item tile re-shuffle is dead here by law: the plinths are the world's furniture and a station that jumps when you knock on it destroys the constancy that makes the path a place. Four parts replace it.
  1. **A set-down is a commitment that cannot be un-made.** Walking back does not un-choose. The attempt happened; the item is on attempt 2; it can never again be first-try and therefore never again counts toward the 2-consecutive level-up.
  2. **The ladder closes the item in three against five plinths**, so a guesser reaches the show-me before the candidate set is exhausted. Trying them all is not a strategy that exists (F-65).
  3. **Position memory IS name knowledge, so the guard and the teaching are the same mechanism.** Because the plinths never move and never swap names, a child who memorises "it was the third one along last time" has memorised that the third one along is the cone plinth. In a shuffling-tile game positional memory is noise to be defeated; in a fixed world it is the learning, and the harder a child games it the more of the objective they acquire.
  4. **The world is fixed; the CONTENT varies.** §13's "never the same slot twice running" becomes **never the same solid twice running**, enforced on the content list, with the confusable partner always present on the path because all five plinths stand from the first frame.
- **Test hook (§16).** `wrong()` sets the current stone down on a plinth whose carved name is not the stone's solid, chosen as the diagnosed confusable partner; `correct()` sets it down on the plinth that bears its name. Both go through `onPlinthTap`, so a driven session exercises the real walk, the real commit, the real ladder and the real adaptation. `targets()` returns the five plinth rects plus the held stone.
- **Risks, stated rather than buried.**
  - **The turn is optional, and a child who never discovers it plays a one-view guessing game.** The sharpest risk in the design, because the original's automatic rotation guaranteed three views. Mitigations in order: item 1 demonstrates itself once (F-42's own sanctioned first-presentation concession); from L2 the arrival view is *deliberately uninformative*, so guessing fails and the world teaches the habit; and the stone is the largest object on screen with an 88 px target. If playtest shows children still not turning, the fallback is to turn once unbidden on **every new solid**, not only item 1 — one line, and still inside F-42.
  - **Choice load rises from 3 / 3 / 4 to 5 / 5 / 5.** Forced by the rule that stations cannot move or hide. Compensated by fixed, learnable positions (easier for working memory than a re-shuffle, not harder), icons at L1-L2, and an untouched pose-and-confusable ramp.
  - **The naming joint is conventional**, declared in `S`. 005's square hole physically rejects a rectangle; a carved word cannot. Naming *is* convention, so this is unavoidable; the compensation is that the *knowing* half is fully physical.
  - **Long locale names on a 120 px plate are the tightest element in the game.** Finnish *suorakulmainen särmiö* and Dutch *rechthoekig blok* will need three lines at 16-18 px, which at a 400 px iframe is about 9-10 px. The icon carries the meaning at L1-L2, and by L3 the child has met each name in the same fixed place eight times — but **the build must measure this in all eleven locales before it ships**, and be ready to widen the plate to 128 (gaps drop to 8) or accept a two-line 16 px floor.
  - **Redundancy against 005 `shape-sorter`, which takes THE HARBOUR WALL.** Both are classification-to-a-destination and 005 is the frame catalogue's own flagship example, so the pair will be examined. Discriminators: 005's destination is a **shaped aperture** and its refusal is a **physical misfit**; 058's destination is a **carved word** and its refusal is a lamp that does not catch, explained by a shadow that changes when the stone is turned. Different verb (*fit* against *turn-and-read*), different band (5-6 against 6-8), different content (2D against 3D). `check-redundancy.js` must be re-run **against the transformed designs**, not the originals.
  - **Five plinths plus a stone plus an owl is a busy frame at 400 px.** The plinths are flat silhouettes with one word each and the stone is the only large object, but this is the first thing to check on the render sweep; the barrow is not load-bearing and is the first thing to cut if it clutters.
  - **The visible motion in this game is modest** — an owl walking up to 544 px along one path, turning a stone in her claws, and setting it down. Test C passing means the walk is arrangement rather than spectacle, which is what the law requires; if the response to the first framed build is "still not enough movement", the honest answer is not to lengthen the tweens (that fails Test C and eats the ACT budget) but that **this objective's motion budget is spent on the turn**, because turning the object is the only movement in this game that *is* the thinking.
  - **Nothing here has been built**, and every claim about how a seven-year-old reads a lamp that fails to catch is a design judgement. This spec should ship to the local link and be watched, not certified.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, read through `S(key)`): `title` = "The Lamp Path"; `cube` = "cube"; `sphere` = "sphere"; `cone` = "cone"; `cylinder` = "cylinder"; `cuboid` = "cuboid".
- The original's `whatShape` = "What shape is it?" is **deleted**: a question printed on a card is a test, and the child is never presented with one. Its deletion is why the play screen carries zero words of authored prose.
- The translation step supplies each locale's school term — the local "ball"-type word for the sphere and the local cuboid term — for all eleven locales (§17). The plates wrap to three lines at a 16 px floor where a term is long.

## Sound
`tone("correct")` when a lamp catches; `tone("nudge")` when one does not; `tone("tap", k)` per edge in the edge cue, so the pitch climbs along the edges; `tone("tap")` when a shadow lands on the apron; `tone("finish")` once. Silent under `?sound=off`; no audio files. The turning stone, the shadow and the lamp carry the meaning; sound never carries it alone.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and the praise keys change with the picker; the five carved names once translated, wrapping to three lines at a 16 px floor where long).
- [ ] Works at narrow width (400-px iframe: all five plinths and their carved names, the held stone, the owl, the path and the roost visible and separate; the plates legible).
- [ ] Keyboard operable (Tab reaches the stone then the five plinths left to right; Enter turns the stone or walks-and-sets-down; nothing else is focusable).
- [ ] Never auto-starts.
- [ ] No losing state (a set-down that is refused never ends the session; the show-me always completes the item; there is no way to finish other than by finishing).
- [ ] **Mission.** The roost and its three owlets are drawn from the first frame at constant coordinates; the owl's x changes on at least 9 of the 10 items; her x at the start of item k+1 equals her x at the end of item k, for every k.
- [ ] **Mission, deletion 2.** Remove the owl and the roost and the game cannot complete an item: there is no position for the commit to read.
- [ ] **Ratchet.** Drive a full session answering wrongly on every item first: no lamp ever goes out, no seated stone ever leaves a slab, no dark segment is ever re-created, no owlet ever changes before the finish, and the furthest-lit plinth's x never decreases.
- [ ] **Instant cut.** Patch every traversal to `duration: 0` and the item log is byte-identical; total ACT time across a session measures under 60 s (expected ≈ 37 s).
- [ ] **Freeze.** At every decision point of a driven session, if any target is enabled the running tween count is zero — including while the show-me glow is holding.
- [ ] The stone turns only when the child taps it, and three taps return it to its first view.
- [ ] A lying cylinder is accepted on the cylinder plinth, and by the finish at least one plinth carries the same solid in two different poses under one name.
- [ ] Setting a cuboid on the cube plinth lights its edges one by one with double ticks on the long edges, then turns it a quarter, before it comes back into her claws.
- [ ] Setting a cone on the cylinder plinth tips it up and pulses its point; setting a cylinder on the cone plinth tips it up and glows its rim.
- [ ] The shadow cue turns the stone and the shadow changes shape, and the shadow appears only on the apron and only during a cue.
- [ ] No plinth is ever carved with a 2D shape name (circle, square, triangle, rectangle).
- [ ] At level 3 the plates show names only, and the held stone draws at 70 px while its tap target stays 88 × 88.
- [ ] The wrong-answer screenshot shows the owl surprised, never unhappy, and the plinth unmarked.
- [ ] There is no progress display of any kind on the play surface, and the Finish screen counts nothing.
- [ ] The Finish screen re-draws the world at its play coordinates: five lit plinths carrying the ten stones the child put there, the path lit end to end, and the owl at the roost with her owlets.
- [ ] With `?sound=off` nothing is audible.
