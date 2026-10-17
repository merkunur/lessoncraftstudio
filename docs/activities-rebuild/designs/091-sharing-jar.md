# Row 91 — The Sharing Jar → THE FAIR RIBBON (1.OA.D.8)

## 0. Identity
- id `sharing-jar.make-fair.1-oa-d-8` (KEPT; slugs/metadata frozen) · grade 1 · CCSS 1.OA.D.8 · Operations & Algebraic Thinking · own files `fair-ribbon-core.js`, `fair-ribbon-activity.js`, `fair-ribbon-activity.html`, `fair-ribbon-activities.json` (the row leaves `sharing-jar-activities.json`, emptied to `[]`; the id is unchanged). Slugs en/de/fr/es/pt/it/nl/sv exist; da/no/fi slug, title and intro are new at build (grade 1).
- page title (frozen): "The Sharing Jar — Make It Fair (Find the Missing Number)"; intro (frozen) promises: a jar of moon-beads spills, Pim and Bo scoop up different amounts — one jar glows full, the other goes quiet; work out how many more beads the quiet friend needs and **say that number**, then watch the beads float over and two friends lean their heads together. **All kept true.**
- worksheets also covered: **G1-115** What Is Missing? (pictures to 10 — the beads), **G1-218** Missing Number Problems to 10, **G1-215** Missing Number Problems to 20 (the frosted level).
- old activity: nine rounds of five CGI schemas (equalize-add, compare-diff, restore, reduce-to-target, start-unknown), floor/ceiling tiers, a number-tile row 0–10, SVG-stub Pim and Bo; beads float only after a correct numeral. **Kept:** all five schemas, eight of the nine old rounds verbatim (5/3, 6/2, 7→4, 6→4, start 3 + 4, 8/5, 12/8, 9→5), the floor/ceiling idea (now "clear" and "frosted" jars), producing the number BEFORE anything moves, the floating beads and the leaning-in friends. **Changed:** a wrong number is no longer just a re-pose — the beads actually float that many and the jars show what happened (a gap under the ribbon, or the ribbon overtaken and the other friend going quiet); Pim and Bo are library animals, not hand-drawn stubs; the 0 tile and the "already fair" round are gone (no answer is 0).

## 1. The pitch
"A gold ribbon is tied across both jars at the fair height — the number you say is exactly how many beads float, so too few leaves a gap under the ribbon and too many pushes past it and makes the other friend go quiet."

## 2. Why a child will want it again (the fun)
- **Moon-beads.** Round pale-gold beads with a soft glow, stacked one on top of another in two tall glass jars. When they float they rise in a slow arc, one every 180 ms, each with a tiny "tink" a step higher in pitch, and drop into the jar with a soft settle.
- **The fair ribbon.** A gold ribbon is stretched across both jars at the height that would make them fair. Watching the beads climb toward it — and stop exactly on it — is the satisfying moment.
- **Overshoot flips the story.** Say too many and the beads keep coming: the quiet jar climbs past the ribbon, starts to glow, and now the OTHER friend dims and turns away. Children laugh at it — "now Pim is sad!" — and immediately see why the number was too big. The extra beads then drift back to the pile by themselves.
- **The lean-in.** When the jars are fair, both jars glow the same warm gold, the two friends (a library hedgehog and a library mouse) tilt toward each other until their heads touch, and a ring of little gold sparkles circles them. That warm ending is the reason to press "next".
- **Free play ("Bead table"):** tap beads from the pile into either jar, move the ribbon, and just play with fair and unfair.

## 3. The skill and the misconception
- **Skill (1.OA.D.8):** determine the unknown in an addition or subtraction relation, here as comparing and equalising: 3 + ? = 5 (how many more), 6 − 2 = ? (how many more does one have), 7 − ? = 4 (give it back), 6 − ? = 4 (put some back), ? + 4 = 7 (how many at the start), within 10 (clear jars) and within 20 (frosted jars).
- **Misconception 1 — answer with one of the numbers you see** (Pim 5, Bo 3 → "5" or "8"). **Push back:** 5 beads float into Bo's jar and climb 3 beads past the ribbon; Bo's jar glows, Pim dims. The ribbon makes "too many" visible as a height.
- **Misconception 2 — "how many more" means "how many does he have"** (→ 3). **Push back:** 3 beads float, Bo's jar reaches 6 — one past the ribbon at 5 — flip again; or for compare rounds the lifted beads leave Pim below Bo's level.
- **Misconception 3 — start-unknown solved by adding** (got 4, now 7 → 11). **Push back:** in a start round the child's number paints that many beads from the bottom in Bo's "start" colour; with 11, the painted start beads run over the glowing "new" beads at the top — 4 beads end up painted AND glowing (overlap shown coral). Too few leaves plain beads between the two (dashed).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 452 + column 220):
- **Task line** (22 px): the round's question (§9).
- **The table** (drawn: a pale wood line across the stage at y = 390).
- **Two jars** (drawn apparatus: tall glass cylinders 64 × 330, 3 px ink outline, a cream lid band 70 × 14, glass tint #EAF4F2), 140 px apart, centred. Beads stack **one per layer** from the bottom: bead 24 px (to 10: max 12 layers = 288 px; to 20: bead 14 px, max 20 layers = 280 px). A faint tick at every 5th layer on the glass (no numerals). Left jar = Pim's, right jar = Bo's (always).
- **Pim and Bo** (library pictures, 96 px, standing on the table OUTSIDE their jars — Pim left of the left jar, Bo right of the right jar): **forest-creatures/hedgehog = Pim**, **forest-creatures/mouse = Bo** (both seen on the forest-creatures sheet: a warm brown hedgehog and a grey-blue mouse — very different shapes and colours, so they are told apart at a glance and in grayscale). "Quiet" = 70 % saturation + 6° tilt away from the jars; "glowing" = full colour + a soft gold halo behind the jar; "lean-in" = both tilt 10° toward the centre.
- **The fair ribbon** (drawn: a gold band 4 px across both jars, with a small bow on the left end) at the fair level — the level both jars must share (§6 per schema). In restore rounds a **pencil mark** (a short grey dash on Bo's jar) shows where Bo's beads used to reach; the ribbon sits on it.
- **The spill pile** (drawn: a low heap of beads on the table between the jars) — where beads come from and go back to.
- **Number tiles** under the table: clear level 1–10 in one row (tiles 44 × 52, numerals 26 px, gap 4); frosted level 1–20 in two rows of 10. No 0 tile.
- **Right column (220 px):** bubble (≤ 3 lines) → Check → speaker.

**At 360 px** (stacked): task line → jars 48 × 260, 100 px apart (beads 20 px clear / 12 px frosted), pictures 64 px beside them → tiles 1–10 in two rows of 5 (60 × 48 each) or 1–20 in four rows of 5 → bubble → Check. Check ≈ 690 px at 360 × 740. **At 320 × 640:** jars 44 × 220 (beads 17 / 10 px), pictures 64 px tucked under the jars, tiles 54 × 44; Check ≈ 625 px.

**Words on the apparatus:** none. In frosted rounds each jar's lid shows its numeral (the frozen intro's "say that number" is about numbers only).

## 5. The hand
- **Tap a number tile:** it pops up 6 px and glows (one tile at a time; tapping another moves the choice). Nothing moves in the jars yet — the number is said first (the old activity's principle).
- **Check:** the beads act out the chosen number (§6 per schema) — one bead every 180 ms, rising in a 300 ms arc with a "tink" that climbs in pitch; beads that leave a jar lift off its top and arc to the pile or to the other jar.
- **After a miss**, the extra beads drift back by themselves after 1.6 s (or at once when a new tile is tapped), so the jars return to the round's start.
- **Tap a jar** (any time, no miss): its beads light one by one from the bottom for a moment (a visible count, no numbers) — the child's own counting tool; in frosted rounds tapping a jar does nothing (the frost hides them; its numeral is on the lid).
- **Free play ("Bead table"):** tap the pile to drop one bead into the nearer jar (or drag a bead to a jar), tap a top bead to send it back, drag the ribbon up and down; the friends react to fair and unfair live.

## 6. The rounds
Five round kinds (the old schemas), each with its own fair level and action:
- **MORE** (equalize-add): Pim a, Bo b (a > b). Ribbon at a. Question: how many more does Bo need? Action: n beads float from the pile into Bo's jar. Answer a − b.
- **HOW MANY MORE** (compare-diff): Pim a, Bo b. Ribbon at b. Question: how many more beads does Pim have than Bo? Action: Pim's top n beads lift out and hover in a row beside his jar ("the extra"). Fair when Pim's jar is down to the ribbon. Answer a − b.
- **GIVE BACK** (restore): Bo used to have s (pencil mark + ribbon at s); Pim borrowed some, Bo now has r. Question: how many must Pim give back? Action: n beads float from Pim's jar to Bo's. Answer s − r. Pim's jar holds what Pim had (also s) plus what was borrowed, 2s − r, so after the give-back both jars read s and the ribbon is fair for both.
- **PUT BACK** (reduce-to-target): Pim has a, Bo has T; ribbon at T. Question: how many should Pim put back? Action: n beads float from Pim's jar to the pile. Answer a − T.
- **START** (start-unknown): Bo's jar holds k + r beads, the top r glowing ("just got these" — a gold bracket beside them). Question: Bo just got r beads and now has k + r — how many did he have at the start? Action: n beads from the bottom of Bo's jar turn Bo's colour (teal-tinted). Fair/right when the tinted start beads meet the glowing new ones exactly. Answer k. Pim's jar holds k + r beads too (the friends end equal), so the ribbon sits at k + r across both jars.

**Level "Clear jars" (to 10; beads visible, countable — G1-115, G1-218):**
| # | kind | numbers | answer |
|---|---|---|---|
| 1 | MORE | Pim 5, Bo 3 (old) | 2 |
| 2 | HOW MANY MORE | Pim 6, Bo 2 (old) | 4 |
| 3 | GIVE BACK | Bo had 7, has 4; Pim has 10 (old) | 3 |
| 4 | PUT BACK | Pim 6, Bo 4 (old) | 2 |
| 5 | START | got 4, now 7 (old) | 3 |
| 6 | MORE | Pim 9, Bo 4 | 5 |
| 7 | HOW MANY MORE | Pim 10, Bo 2 | 8 |
| 8 | PUT BACK | Pim 8, Bo 2 | 6 |
| 9 | MORE | Pim 10, Bo 1 | 9 |

**Level "Frosted jars" (to 20; the beads hide behind frost with each jar's numeral on its lid; the frost wipes clear on Check — G1-215):**
| # | kind | numbers | answer |
|---|---|---|---|
| 1 | MORE | Pim 8, Bo 5 (old) | 3 |
| 2 | HOW MANY MORE | Pim 12, Bo 8 (old) | 4 |
| 3 | PUT BACK | Pim 9, Bo 5 (old) | 4 |
| 4 | MORE | Pim 18, Bo 6 | 12 |
| 5 | HOW MANY MORE | Pim 19, Bo 8 | 11 |
| 6 | GIVE BACK | Bo had 12, has 4; Pim has 20 | 8 |
| 7 | PUT BACK | Pim 17, Bo 3 | 14 |
| 8 | START | got 6, now 13 | 7 |
| 9 | MORE | Pim 15, Bo 9 | 6 |

Never 0 (no equal jars, no 0 tile). The fuller jar is Pim's in most rounds by the story, so for position balance the **jar sides swap**: in rounds marked by the pass's swap mask (4 of 9 per level), Bo stands at the left jar and Pim at the right (pictures and jars swap together; the story is unchanged).

**Answer position:** answers are tile values, so the "position" is the tile — and the first draft's tiles had a tell (critic, measured with `work-c22/m091.js`): Clear answers ran only 2–7, so tiles 1, 8, 9, 10 were never right; Frosted answers ran only 3–9, so the whole SECOND ROW of tiles (11–20) was never right and the Clear level's GIVE BACK row 9 put 12 beads in a "to 10" jar. Now: Clear answers 2 4 3 2 3 5 8 6 9 (every jar ≤ 10), Frosted answers 3 4 4 12 11 8 14 7 6 (three answers on the second tile row, every jar ≤ 20, the old ceiling rounds 8/5, 12/8, 9→5 kept). No answer appears more than twice per level, and the shuffle never puts the same answer in two consecutive rounds (gate). The fuller jar is on the left in 5 rounds and on the right in 4 per level (swap mask). The answer is never equal to either jar's number in MORE / HOW MANY MORE / PUT BACK rounds (measured, all rows) so "say a number you see" never works.
**Order:** order-only reshuffle per pass (never the same order twice); each kind appears ≥ 1 time in the first five rounds of a pass.

## 7. Check, the misses, the success
- **Check with no tile chosen:** no miss. The tiles shimmer left to right; bubble: **"Say a number first — tap a tile."**
- **Miss 1:** the beads act out the chosen number, so the jars SHOW the result:
  - too few → the quiet jar stops below the ribbon; the empty layers up to the ribbon show as dashed bead outlines. Bubble: **"Still a gap under the ribbon."**
  - too many → the beads climb past the ribbon; the extra beads glow coral above it; the other friend dims and turns away. Bubble: **"Too many — now {other} has less!"**
  - START too big / too small → overlap (coral) or plain beads between (dashed). Bubble: **"Look where the start beads meet the new ones."**
  Then the beads drift back.
- **Miss 2:** the same showing, and the dashed layers (or coral extras) are numbered 1, 2, 3 … from the end of the beads — counting the difference; in frosted rounds the frost stays cleared for the rest of the round. Bubble: **"Count the {dashed|coral} beads — that's how far off it was."** (the child still taps the corrected tile).
- **A new tile takes the help away** (numbers fade, beads back) until the next Check.
- **Success:** the right number of beads float and stop exactly on the ribbon; both jars glow the same gold; the friends lean in until their heads touch; a ring of gold sparkles (drawn dots) circles them. Bubble reads the fact: MORE **"3 and 2 more make 5 — now it's fair!"** · HOW MANY MORE **"Pim had 4 more than Bo: 6 take away 2 is 4."** · GIVE BACK **"Bo gets 3 back: 4 and 3 make 7 again."** · PUT BACK **"Pim puts 2 back: 6 take away 2 is 4 — fair!"** · START **"Bo had 3: 3 and 4 make 7."** End of pass: **"Every jar is fair!"**

## 8. Settings
1. **Jars:** Clear (to 10) / Frosted (to 20) (default Clear) — at rest the jars show beads or frost with lid numerals, and the tile row shows 1–10 or 1–20.
2. **Story:** All kinds / Only "how many more" (default All kinds) — the second keeps MORE and HOW MANY MORE rounds only (the add-on and compare forms of G1-115 / G1-218) for children not yet ready for start-unknown; at rest the round table and the progress chip count change (9 → 7 rounds: the five MORE / HOW MANY MORE rounds of the level, padded with MORE Pim 7 / Bo 4 and HOW MANY MORE 9 / 5 in clear — answers 2 4 5 8 9 3 4 — and MORE 16 / 9 and HOW MANY MORE 20 / 7 in frosted — answers 3 4 12 11 6 7 13; measured).

## 9. Words (EN source)
- on-screen title: **The Sharing Jar**
- instruction: **Make it fair! Work out how many beads should move, tap that number, then press Check. The gold ribbon shows how full a fair jar is.**
- prompts (task line): MORE **How many more beads does {quiet} need?** · HOW MANY MORE **How many more beads does {full} have than {quiet}?** · GIVE BACK **{quiet} had {s}. How many must {full} give back?** · PUT BACK **{full} took too many. How many should go back in the pile?** · START **{name} just got {r} beads and now has {t}. How many did {name} have at the start?**
- hints: **Say a number first — tap a tile.** · **Still a gap under the ribbon.** · **Too many — now {other} has less!** · **Look where the start beads meet the new ones.** · **Count the {dashed} beads — that's how far off it was.** (two strings: "dashed" / "glowing")
- success: as §7 (five templates with {numbers}) · **Every jar is fair!**
- free play: **Bead table**
- settings: **Jars** — **Clear** / **Frosted** · **Story** — **All kinds** / **Only "how many more"**

**Locale traps:**
- **Names, not pronouns:** every prompt repeats "Pim" / "Bo" instead of he/she, so no locale has to give the animals a grammatical gender beyond the name (de "Pim braucht", fr "Pim a besoin", fi "Pim tarvitsee"). The animal NOUNS are never shown.
- **"How many more … than"** has no single construction across locales (de "wie viele mehr als", fr "combien de plus que", es "cuántas más que", fi "kuinka monta enemmän kuin" + partitive "helmeä"); "beads" agrees with the number in each locale (fi partitive after numerals: "3 helmeä"; it/pt/es/fr feminine "perles/perline/contas/cuentas" → "quante perline in più").
- **"Moon-beads"** (intro) is a coined word; the activity's strings say just "beads" in every locale (de "Perlen", sv "pärlor", da "perler", no "perler", fi "helmet").
- **"Give back" vs "put back"** are different verbs in every locale (de "zurückgeben" vs "zurücklegen", fr "rendre" vs "remettre", nl "teruggeven" vs "terugleggen", sv "ge tillbaka" vs "lägga tillbaka") — never translated with one verb.
- **Pim and Bo** keep their names in all 11 (the old 8 locales use them).
- Numbers are numerals; number words for TTS from `scripts/worksheet-gen/lib/number-words.js` (the old file's hand tables WORDS_DE… are retired).

## 10. Sound off, access, phones
- Legible silent: the ribbon, the bead levels, the dashed gap, the coral overshoot, the dimming friend and the lean-in carry everything.
- Keyboard: digits 1–9, then 0-key = 10, "1" then a digit within 600 ms for 11–20 (frosted), Enter = Check; J/K tap the left/right jar (count lights).
- aria: jars "Pim's jar, 6 beads" (clear) / "Pim's jar, number 12" (frosted); ribbon "fair line at 6"; live region after Check: "3 beads moved; Bo has 5, the same as Pim" / "2 short of the ribbon".
- Taps: tiles ≥ 44 × 48; jars are tappable 64 × 330 / 48 × 260.
- Reduced motion: beads appear in their final places; the friends switch pose without tilting animation.

## 11. Distinct from
- **comparison-planks (tool):** the overhang of the long plank is taken off and laid on the short one. Here the child must SAY the number first and only then do exactly that many beads move — the number is the cause, the jars are the evidence, and overshooting changes who is short.
- **#18 Friendship Bridge** (fair share K.CC.C.6: pairing toys across a bridge) and **#17 Partner Bows** (pairs): comparison by matching, no unknown is produced. **#16 Bug Jar:** estimation against ten.
- **#089 Two Gauges** (this batch): equality as two needle readings in symbols; **#090 Plank Path:** unknowns as planks spanning gaps; this is the story/comparison form of 1.OA.D.8 with heights.

## 12. Build plan
- **Core state:** `{ level, story, order[], idx, kind, swap, jars: {pim:int, bo:int}, ribbon:int, mark:int|null, newTop:int (START), chosen:int|null, misses, help, phase:'ask'|'acting'|'done' }`.
- **Functions:** `answer(round)` (pure: a − b / a − b / s − r / a − T / k), `act(n)` → `{after:{pim, bo, tinted}, result:'fair'|'short'|'over'|'overlap'|'gap', diff}`, `choose(n)`, `check()`, `nextTask(index)`.
- **Gate `verify-fair-ribbon-core.js` (own oracle):** (0) every jar ≤ 10 in Clear and ≤ 20 in Frosted (incl. GIVE BACK's 2s − r); Frosted has ≥ 3 answers ≥ 11 and Clear ≥ 2 answers ≥ 8, so no tile row is dead; (1) `act(n)` reaches `fair` iff n equals the oracle's answer, for n = 1…20 in every round; (2) short/over/overlap/gap and `diff` match |n − answer| with the right sign per kind; (3) never 0 in any table or tile; (4) the answer ≠ either jar's number in MORE / HOW MANY MORE / PUT BACK; (5) no answer > 2× per level, no equal answers adjacent over 10 000 shuffles; (6) swap mask 5/4 per level; (7) jars never exceed capacity (12 / 20); in GIVE BACK Pim's jar is 2s − r and both jars end at s; (8) the pictures exist on disk (forest-creatures/hedgehog, forest-creatures/mouse).
- **Mutations:** beads move before Check; act moves n − 1 beads; overshoot doesn't flip the dim state; ribbon placed at the emptier jar in MORE; START tints from the top; 0 tile present; frosted level shows beads before Check; answer equals a jar number; swap mask always left; drift-back missing after a miss.
- **Pictures verified on the forest-creatures contact sheet:** hedgehog (Pim), mouse (Bo). The hand-drawn Pim/Bo SVG stubs and their face expressions are retired: mood is shown by colour, tilt and the jar's glow, never by a drawn face. Nothing blocked.
- **Risks:** 20 beads at 10 px on 320 px (frosted) are only seen after the frost clears; the lid numerals carry the round. The swap must swap pictures AND jars together (a gate assertion), or Pim would stand by Bo's jar.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — glowing beads that float, a ribbon to hit exactly, a funny flip when you overshoot, and two friends who lean their heads together.
2. **Would a teacher put it on the board?** Yes — "Bo has 3, Pim has 5: how many more does Bo need?" The ribbon turns "how many more" into a visible height, all five CGI forms of the missing number appear, and the misses show the difference instead of scolding.
3. **Would a parent trust it?** Warm, about fairness, library animals, no score or timer, nothing sold.
4. **The invention:** a gold ribbon across both jars marks the fair height, and the number the child says is exactly how many beads float — too few leaves a gap under the ribbon, too many pushes past it and makes the other friend go quiet.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- **Dead tiles (answer-position tell), measured:** Clear answers were only 2–7 (tiles 1, 8, 9, 10 never right) and Frosted answers only 3–9 (the entire 11–20 tile row never right — a child learns to ignore half the board). Both tables rebuilt; Frosted now has 12, 11, 14 among its answers, Clear reaches 8 and 9. All eight old rounds kept verbatim.
- **A "to 10" jar held 12 beads:** Clear GIVE BACK row 9 (Bo had 8, has 4 → Pim 2·8 − 4 = 12). Replaced; gate clause (0) checks every jar against its level's cap.
- **"Only how many more" padding** re-specified with real, measured rounds after the table change.
- Pim/Bo pictures re-seen on the forest-creatures sheet (hedgehog and mouse, distinct in shape and colour); #090 no longer uses the hedgehog as a walker so Pim stays Pim. Coverage of G1-115/215/218 is secondary here — #090 owns those sheets (ruling in #090 §11).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
