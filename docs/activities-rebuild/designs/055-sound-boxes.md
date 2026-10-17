# Row 55 — Coco's Pop-Up Sound Boxes: the lids pop where the sounds are the same (RF.K.2.d)

## 0. Identity
- id `sound-boxes.phoneme-position.rf-k-2-d` (KEPT) · grade K · Common Core RF.K.2.d (isolate and pronounce the initial, medial vowel and final sounds in CVC words) · strand Reading: Foundational Skills · page title (frozen, en) "Coco's Sound Boxes — First, Middle & Last Sounds (Kindergarten)"; title/intro frozen in en/de/es/pt/it/nl; fr/sv/da/no/fi slug, title and intro are new at build.
- own files `mini tools/lid-boxes-core.js`, `lid-boxes-activity.js`, `lid-boxes-activity.html`; manifest row stays in `sound-boxes-activities.json` with `tool` repointed. The old `sound-boxes-activity.js` and the premium `sound-boxes` tool are untouched.
- worksheets it OWNS (the sound-POSITION family): **K-226** Ending Sounds, **K-227** Middle Sounds (Task 1, same sound at a position); **K-326** Beginning, Middle or End: Where Is the {U}?, **G1-394** Where Is the Digraph? (Task 2, sh/ch rounds; th pending art, §12); **K-325** Words with {U}: Hear It Anywhere (Task 3).
- worksheets the coverage map also listed here, **released to the instrument that teaches them better** (critic ruling 2026-10-17; checked that every one is covered by name in the named design, so no coverage is lost): counting / segmenting sounds **K-318, K-329, K-330, G1-312** → **New 214 Bumpy Slide** (K-318/K-329/K-330) and **058 / 109** (G1-312); blending **G1-314** → **054 Blending Magnets** (and 058, 109); syllable boxes **G1-305, G1-313, G1-324, G1-325, G1-326, G1-327, G1-328** → **045** (the syllable lock carries all seven by name); letter teams and sound of the week **G1-380, G1-392, G1-393, G1-311** → **059** (and 110). The coverage map rows move with them at build.
- what the old activity did: showed a target picture in three sound boxes and asked "which picture has the same first / middle / last sound?" among three; Coco the koala (a cartoon) cheered. **Kept:** the frozen promise (target in its sound boxes, find the picture with the same first, middle or last sound), all nine en rounds' words, and the de/es/pt/it/nl round data with its per-locale phoneme codes (`b/m/e`, e.g. de `i-kurz`, `au`). **Coco** becomes the library koala picture (animals/koala), never a drawing. **Fixed at build:** the legacy es/pt rounds point at `weather/sun` (does not exist → `beach/sun`), and pt uses `At the Supermarket/grapes` and `/egg`, which have no library entry (the only egg is `easter/egg`, a painted Easter egg — refused); the pt panel replaces those words.

## 1. The pitch
"Drop a picture on Coco's sound boxes: the lids pop open wherever its sounds are the same as the target's — so you can see that a sound matched, and *where* it matched."

## 2. Why a child will want it again (the fun)
- **Jack-in-the-box lids.** Three chunky boxes with hinged lids sit under the target picture. Drop a picture on them and — *pop, pop* — lids spring open with a springy wobble wherever the two words share a sound, each lid showing the same sound on both sides. Nothing pops? The picture bounces off with a rubbery *boing*.
- **The surprise of "same sound, different letter".** Drop *kite* on *cat*'s first box and the lid pops even though one says **c** and one says **k** — both glow the same colour. Children gasp: the boxes listen, they don't read.
- **Coco listens.** The library koala (96 px at 704, 64 px at 360 — never smaller) sits beside the target picture; when a lid pops, Coco's picture tilts as if listening; on success it hops once.
- **The shelf of pairs.** Every matched pair leaves a drawn token on a little shelf at the top — two small boxes joined by the gold bar, the shared letters in them ("c=k", "s", "u") — tap a token and the two words' boxes pop again full size in the test row. (A record in apparatus geometry: no picture is ever shown below the 96/64 px floor.)
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** isolate the first, medial (vowel) and final sound of CVC words and match words by a sound at a given position (RF.K.2.d); extended by the owned worksheets to: where in a word a given sound lives (K-326, G1-394 — a letter team is one sound in one box), and whether a word holds a sound at all, wherever it is (K-325). Every task is about POSITION; counting sounds belongs to New 214.
- **Misconception 1 — "they share a sound, so it's right"** (the classic: *hat* chosen for "same first sound as *cat*" because both end in *t*). The lids pop at the END, not the first box: the child sees the shared sound was in the wrong place.
- **Misconception 2 — sounds are letters.** *cat/kite*, *cup/can* pop together although the letters differ; *ship*'s **sh** sits in ONE box under one curve.
- **Misconception 3 — the middle sound is invisible.** The middle box has its own lid; a match there pops only that lid — the vowel becomes a thing you can find.
- **How the material pushes back:** the lids themselves — they open only where sounds are truly the same, at the position they really are.

## 4. The stage
`layout:'split'` at ≥ 700 px: apparatus left (≈ 470 px), bubble + shelf right. Stacked below.

**At 704 px (stage 704 × 500):**
- **The pair shelf** (top band, right column, 200 × 44 rows): drawn pair tokens — two 22 px boxes joined by a gold bar with the shared letters (record; no pictures, no numerals).
- **Target picture** (left column, y 20–160): library picture at **140 px** in a white card frame; **Coco** (library koala, **96 px**) beside it to the right — decoration that reacts, never carries a task word.
- **The box row** (y 176–296): three sound boxes **112 × 112** (gap 14), each a square box (cream face, 3 px ink, a 6 px dark rim) with a **lid** (a slightly wider flat plate 120 × 18 hinged at the back). The **asked box** has a coral rim and a small coral arrow above it (geometry, no word). The target's sounds sit inside: **letters at 54 px** (the grapheme of the sound; a digraph as two letters under one curve). In Task 1 all three target lids are open at rest so the target's sounds are visible ("hear a short word in its sound boxes").
- **The test row** (y 306–410): where a dropped picture's own boxes appear — three boxes 96 × 96, lids shut, under the target row; the dropped picture sits at its left at **96 px** (it never shrinks below the floor).
- **The candidate tray** (y 420–500): three library pictures at **96 px** each in white frames.
- **The bubble** (right column, y 60–250).
- **Task line** above (≤ 24 px). No words on the apparatus except the sound letters (content).
- **Sound colours:** each phoneme has a fixed colour from an 8-colour, colour-blind-safe set (assigned per round, never meaning right/wrong); when two lids pop together, both letters take the same colour **and** a white connecting bar joins the two boxes — colour is never the only signal.

**At 360 px (stage 360 × 700):** target picture **104 px** with Coco **64 px** beside it; target boxes **88 × 88** (letters 42 px); test row: the dropped picture **64 px** + test boxes 76 × 76; candidate pictures **72 px** (frames 84); bubble under the tray; shelf as a strip under the bubble; Check last. Check bottom ≤ 700 at 360 × 740, ≤ 620 at 320 × 640 (320: boxes 80/68, candidates 66 px, Coco 64 px moves to the bubble's left). Four-box rows (Task 2 with four sounds, e.g. b·e·n·ch): boxes 72 × 72 at 360.

## 5. The hand
- **Drag a candidate** from the tray onto the box row; it lands in the test slot (snaps 120 ms). Dropping another candidate swaps them (the first returns to the tray). Tap a candidate then tap the row = the same.
- **Check** runs the lid test (§7) — the lids are the judge.
- **Tap a target box** → TTS (where available) speaks that sound in isolation; **tap the target picture** → speaks the word; tap a candidate → speaks its name. Every spoken sound is also shown (the letters in the boxes).
- **Lids** can be poked open and shut by tapping them in free play (after success, all lids are live for 6 s; each pop plays its sound).
- **Task 2** (where is the sound): tap a lid to choose it (it lifts 10° and stays raised), Check.
- **Task 3** (hear it anywhere): drag each of eight pictures into one of two baskets under the row — a YES basket marked with the sound card's letters, a NO basket marked with the same letters crossed by a soft grey line (geometry); Check tests each.

## 6. The rounds
One round = one target (or sound card) + candidates. A pass = the task's table (and position mix), order-only reshuffled per pass. Phoneme keys are stored per word as in the old data (`b/m/e` or a list for 4-sound words); **the letters shown in the boxes come ONLY from `mini tools/sound-boxes-bank-<loc>.json`** (the shared per-locale box split, e.g. en `kite` = k · i_e · t, `fish` = f · i · sh, `sheep` = sh · ee · p, `duck` = d · u · ck). A word this activity needs that the bank lacks (en *fig, jet, jam, can, map, leg, chick, bench*) is ADDED to the bank first in the bank's own notation, then read by the native reviewer — never typed into this activity's data directly. The magic-e of *kite* is drawn the bank's way: *i* in the middle box and a grey *e* after the last box, joined to it by a small under-arc.

**Task 1 — Same sound (setting: first / middle / last / mixed).** Every distractor shares a sound with the target *at another position* (that is what the lids reveal), the answer shares the asked one.

*First sound*

| # | target (theme) | answer | distractor (shares) | distractor (shares) |
|---|---|---|---|---|
| 1 | cat k-a-t (animals) | kite k-ī-t (toys) | hat (last t) (accessories) | bag (middle a) (At the Supermarket) |
| 2 | bat b-a-t (animals) | bun b-u-n (bakery) | hat (middle, last) | pig — (animals) |
| 3 | pig p-i-g | pen p-e-n (classroom) | fig (middle, last) (fruits) | dog (last g) (animals) |
| 4 | sun s-u-n (beach) | sock s-o-k (accessories) | bun (middle, last) | hen (last n) (farm animals) |
| 5 | dog d-o-g | duck d-u-k (animals) | log (middle, last) (camping) | pig (last g) |
| 6 | hen h-e-n | hat h-a-t | pen (middle, last) | sun (last n) |
| 7 | mug m-u-g (kitchen tools) | mop m-o-p (around the house) | jug (middle, last) (kitchen tools) | bag (last g) |
| 8 | fan f-a-n (around the house) | fig f-i-g (fruits) | van (middle, last) (vehicles) | hen (last n) |
| 9 | cup k-u-p (around the house) | can k-a-n (At the Supermarket) | bus (middle u) (vehicles) | map (last p) (camping) |

*Last sound*

| # | target | answer | distractor | distractor |
|---|---|---|---|---|
| 1 | cat | net n-e-t (beach) | cap (first, middle) (accessories) | fan (middle a) |
| 2 | dog | pig | duck (first) | pot (middle o) (around the house) |
| 3 | sun | pen | sock (first) | bus (middle) |
| 4 | van v-a-n | bun | bag (middle) | cup — |
| 5 | mop | cup | mug (first) | dog (middle) |
| 6 | hat | jet j-e-t (vehicles) | ham (first, middle) (At the Supermarket) | cap (middle) |
| 7 | pig | bag | pen (first) | fish f-i-sh (middle) (animals) |
| 8 | hen | fan | hat (first) | bed (middle e) (around the house) |
| 9 | cup | map | can (first) | bus (middle) |

*Middle sound*

| # | target | answer | distractor | distractor |
|---|---|---|---|---|
| 1 | hat | van | hen (first) | net (last) |
| 2 | sun | jug | sock (first) | pen (last) |
| 3 | dog | pot | duck (first) | pig (last) |
| 4 | pig | fish | pen (first) | bag (last) |
| 5 | bed | hen | bun (first) | fan — |
| 6 | cup | bus | can (first) | map (last) |
| 7 | fan | jam j-a-m (At the Supermarket) | fig (first) | hen (last) |
| 8 | mop | log | mug (first) | cup (last) |
| 9 | net | leg l-e-g (body parts) | hat (last t) | sun (nothing at the same place — its *n* is last, net's is first: the bounce) |

All nine legacy en rounds' targets are kept (cat, bat, pig, hat, sun, dog, cat, dog, van); the legacy `cap` answer for cat-first is replaced by `kite` (the sound-not-letter lesson) and `cap` moves to a distractor. `fox` is gone from every row: it is f-o-k-s, four sounds, and would need a fourth box in a three-box task. **Mixed** draws 9 rounds, 3 per position, never the same target twice in a row.

**Task 2 — Where is the sound? (K-326, G1-394).** A sound card (letters, 48 px) + a picture; its boxes are shut; tap the box where the sound lives. Twelve rounds, **4 first · 4 middle · 4 last** (sh/ch rounds are G1-394's "where is the team" — the team is ONE box).

| # | sound | picture (theme) | boxes | answer |
|---|---|---|---|---|
| 1 | u | bus (vehicles) | b · u · s | middle |
| 2 | s | sun (beach) | s · u · n | first |
| 3 | p | map (camping) | m · a · p | last |
| 4 | sh | ship (vehicles) | sh · i · p | first |
| 5 | sh | fish (animals) | f · i · sh | last |
| 6 | ch | chick (farm animals) | ch · i · ck | first |
| 7 | ch | bench (furniture) | b · e · n · ch | last |
| 8 | a | bag | b · a · g | middle |
| 9 | th | tooth (body parts) | t · oo · th | last |
| 10 | sh | sheep (farm animals) | sh · ee · p | first |
| 11 | u | jug (kitchen tools) | j · u · g | middle |
| 12 | e | hen (farm animals) | h · e · n | middle |

Answer positions per pass: first 4 (s, sh, ch, sh), middle 4 (u, a, u, e), last 4 (p, sh, ch, th) — exactly balanced; the gate fails if any position is < 4 of 12. *bench* has four boxes, so "last" there is the fourth box — the position words are first / middle / last, and in a four-box word "middle" never occurs as an answer.

**Task 3 — Hear it anywhere (K-325, G1-311, G1-380).** Eight pictures, a sound card; sort YES/NO; Check pops the lid holding the sound in every YES picture.

| set | sound | YES pictures | NO pictures |
|---|---|---|---|
| A | u | bus, sun, cup, mug | cat, pig, hen, dog |
| B | a | cat, bag, map, van | dog, pig, sun, hen |
| C | sh | ship, fish, sheep, brush (around the house) | sock, duck, cup, chick (ch is NOT sh — the lids show it) |
| D | t | tie (accessories), tent (camping), hat, net | sun, pig, hen, mop |
| E | m | mop, mug, jam, drum (music) | pig, bed, bus, sock |
| F | s | sun, sock, bus, nest (spring) | cat, pig, hen, mop |
| G | e | bed, hen, pen, net | cat, sun, dog, pig |

Sets D–G are the K-325 "Words with {U}" sound of the week (the setting picks the letter; the sound sits first in some YES words and last or middle in others, so "it starts with it" is not the rule). The two-teams basket sort (G1-380) is 059's, not this row's.

**Answer position (measured):** Task 1 — the answer's tray slot is uniform over the three slots (each ⅓ ± 1 per level), and the distractor that shares the *most* sounds is next to the answer in exactly half the rounds. Task 2 — exactly 4/4/4 first/middle/last per pass. Task 3 — YES/NO is 4/4 per set, tray order random, and across sets D–F the sound's position in YES words is never all the same. The gate counts all of these.

## 7. Check, the misses, the success
- **Check with nothing dropped/chosen** → hint, no miss: "Drop a picture on the boxes." (Task 2: "Tap the box where you hear {sound}." Task 3: "Drag each picture into a basket.")
- **Miss 1 — the lids tell the truth (Task 1):** the candidate's own boxes appear in the test row; lids pop in BOTH rows wherever the sounds are the same (same colour + the white bar); the asked box does not pop and shakes (2 × ±4°, 300 ms); then the candidate returns to the tray, and its popped boxes stay visible faded for 1.5 s. Hint by case:
  - shared sound at another position: "Same sound — but at the end, not at the start! Find one that starts like {target}." (position words fill in)
  - nothing shared: "No sounds match. Say {target} slowly, then say each picture."
  Task 2: all lids pop to show the word's sounds, the box holding the sound glows; the chosen box, if wrong, shakes. "The {sound} is in the {position} box." is NOT shown at miss 1 — instead: "Look where {sound} popped up." Task 3: each mis-sorted picture shows its boxes; a YES picture with no popping lid slides to NO, a NO picture whose lid pops slides to YES — moved pictures keep a coral ring.
- **Miss 2 — Coco listens first:** Task 1: the asked box of the target lifts its letter up and shows it above each candidate in turn for 600 ms (the candidates' asked-position boxes appear above their pictures with lids open), so the child compares the asked sound only. Hint: "Listen only to the {position} sound." Task 3: each picture's box holding the sound (if any) pops alone, one picture at a time. Task 2: the word's boxes open one by one with each sound shown (and spoken where TTS exists), the child taps again.
- **A new move takes the help away** until the next Check.
- **Success:** the asked lids pop together with a bright *pop-pop*, the connecting bar flashes gold, Coco hops, and the pair flies to the shelf. Bubble: "cat and kite start with the same sound: /k/!" (EN source: "{a} and {b} {start with / have the same middle sound / end with} the same sound: {letters}!"). Task 2: "{sound} is at the {start / middle / end} of {word}." Task 3: "All sorted — {k} pictures have {sound}."

## 8. Settings
1. **Task:** Same sound · Where is the sound? · Hear it anywhere — the board changes at rest (target + 3 open boxes + tray / sound card + shut boxes / two baskets).
2. **Position / sound** (per task): first · middle · last · mixed (Task 1 — moves the coral arrow at rest); sound of the week u · a · sh · t · m · s · e (Task 3 — changes the sound card on the baskets at rest). Task 2 has no second control (its position mix is the lesson).

## 9. Words (EN source; the build authors the other 10 locales by hand, then one native ×11 + pedagogy reviewer)
- title (frozen en) · instruction: "Drop a picture on Coco's sound boxes. The lids pop open where the sounds are the same."
- task lines: Task 1 "Find the picture with the same {first / middle / last} sound as {target}." · Task 2 "Where do you hear {sound}? Tap its box." · Task 3 "Does the word have {sound}? Sort the pictures."
- position words: "first", "middle", "last"; "at the start", "in the middle", "at the end".
- hints / celebrations: §7. Settings: "Task", "Same sound", "Where is the sound?", "Hear it anywhere", "Position", "First", "Middle", "Last", "Mixed", "Sound of the week".
- aria: "Box {n} of {total}: {letters | shut}." · "Lids popped in boxes {list}." · "Basket yes / no." · "Shelf: {count} pairs."

**Locale traps:**
- **Phonemes, not letters,** are matched — each locale's rounds store sound keys authored by its panel (de *i-kurz* vs *i-lang*, *ei*, *au*, *sch*; nl *ui*, *ij/ei*, *ch*; fr *ou*, *on*, *ch*, nasal vowels; es *ll/y*, silent *h*; sv *sj*, *tj*, *ng*; da soft *d*; fi long vowels and doubled consonants follow the fi bank, which writes one LETTER per box (*kuu* = k · u · u, *kukka* = k · u · k · k · a) — so a fi "middle" round never uses a long vowel; the panel picks short-vowel CVCV words (*talo, kala, juna, muki*) where first / middle (first vowel) / last are unambiguous).
- **CVC is English-shaped — the honest per-locale shape (measured from the picture labels 2026-10-17):** de/nl/sv/da/no have many CVC(C) monosyllables (bank: *Hut, Bus, kat, zon, sol, hus*). **es and pt keep three-sound words** exactly as their legacy data does — es *sol, pan, pez, oso, ojo, red, sal, col* (CVC and VCV), pt *sol, sal, mel, lua, rio, pia, van* — so first / middle / last are three boxes and unambiguous. **fr** uses its bank's three-sound words (*bol, lac, sac, bus, nid, lune* = l·u·n, *poule* = p·ou·l). **it and fi have too few three-sound picture words** (it *ape, oca, ara*; fi *suu, kuu, ovi, vyö*), so in it and fi Task 1 offers **First and Last only** (on CVCV words like *kala, talo, gatto, mela*, the first and the last sound are unambiguous) and the Middle position is hidden — never faked. ⚠ The LIVE it rounds box 4-sound words into 3 boxes by dropping a vowel (*Naso* = n·s·o, *Mano* = m·n·o, "middle" = the second consonant): the rebuild never ships that, and the defect is reported to the orchestrator as a live pedagogical mistake.
- **Digraphs per language** (Task 2 team rounds, Task 3 set C): en *sh ch th* (th only at the end — *tooth*; th-first pending art); de *sch ch ck*; nl *ch ui oe*; fr *ch ou*; sv *sj tj ng*; da/no *sj kj ng*; es *ch ll rr*; it *gn gl ch*; pt *nh lh ch*; fi none (one letter per box) — fi Task 2 uses single sounds only. Every team box comes from that locale's bank split.
- **Letters in boxes** are lower case (de nouns keep their capital only in the bubble).
- **Sound off:** letters + colours + bars + shaking/popping carry everything.

## 10. Sound off, access, phones
- Silent legibility: letters in every box, matching colour AND a white bar for a match, lids open/shut, the asked arrow.
- Keyboard: Tab to tray, Space picks, Enter drops on the row; Task 2: ←/→ choose a lid, Space raises it; Task 3: Space picks, Y/N or ←/→ chooses basket; Enter = Check.
- aria-live: "Lids popped in the last boxes. The first box stayed shut." etc.
- Taps: lids/boxes ≥ 68 px; candidates ≥ 66 px.
- Pictures: target 140 / 104 / 88 px; candidates 96 / 72 / 66 px; dropped picture in the test row 96 / 64 / 64 px; Coco 96 / 64 / 64 px.
- Phone: target → boxes → test row → tray → bubble → shelf → Check.

## 11. Distinct from
- **Row 54 Blending Magnets** — onset + rime magnets, attraction test; **row 56 Pepper** — a flip card turned by a sound swap; **row 57** — a sticky name tag. None uses position boxes with lids.
- **Premium `sound-boxes`** — push a chip per sound, reveal letters; here the boxes COMPARE two words, popping lids only where a sound matches at the same place. This row never asks "how many sounds".
- **New 214 Bumpy Slide — the overlap is resolved in 214's favour (critic ruling 2026-10-17).** The earlier draft of this row had a Task 5 "How many sounds?" (open one lid per sound) that taught exactly what 214 teaches with a better invention (bumps built on a slide, sounds that fall and crack). COUNTING sounds now belongs to 214 alone (K-318, K-329, K-330), and this row keeps the act 214 never does: deciding WHERE a sound sits and whether two words share it there. No worksheet coverage is lost — 214 names K-318/K-329/K-330, and G1-312 is carried by 058/109 (and 054 as secondary).
- **045 syllable lock / New 215 Bead Rail** — the syllable worksheets once listed here (G1-305, G1-313, G1-324–328) are all carried by 045; this row has no syllable task.
- **059 / 110** — the letter-team worksheets (G1-380, G1-392, G1-393, G1-311) live there; this row keeps only G1-394's "where is the team" because it is a position question.
- **New 229 Blink Viewer** compares two pictures by overlay; here two *words* are compared by sound, box by box.

## 12. Build plan
- **Core state:** `{task, variant, round, target:{key, theme, sounds:[{key, letters}]}, test:null|{pictureIdx, sounds}, chosenLid, baskets:{yes:[],no:[]}, misses}`. Functions: `drop(i)`, `lidTest(a, b)` → `[{pos, same}]` by sound **key** equality; `check()` per task; `soundColour(key)` (round-local assignment). Box letters are read from `sound-boxes-bank-<loc>.json` at load (never stored here).
- **Gate's own ground truth (`verify-lid-boxes-core.js`):** for every Task 1 round, the answer shares the asked position by key, and every distractor does NOT share the asked position (exactly one right answer), and shares ≥ 1 other position or is marked "none"; c/k-type pairs pop by key; Task 2 answer index equals the index of the sound in the word's list; Task 3 YES iff key ∈ sounds; every word's box letters equal its `sound-boxes-bank-<loc>.json` boxes (read the file) and their count equals the sound-key count; no three-box Task 1 word has four sounds (fox, box excluded); balances per §6 (Task 2 exactly 4/4/4); every picture exists, is colour; legacy en targets present.
- **Mutations:** pop lids by letter (cat/kite fails) · accept a distractor sharing another position · asked box pops for a non-match · Task 2 accepts any box containing a letter of the sound · Task 3 by spelling (cup/can) · Task 3 sh set accepts *chick* · box letters not from the bank · a counting task reintroduced (the build must not grow a "how many" mode — 214 owns it) · answer always in slot 1 · help at miss 1 · help kept after a move · pass 2 order = pass 1.
- **Pictures to verify on a contact sheet:** animals cat, bat, pig, dog, duck, fish, koala; toys kite; accessories hat, cap, sock, tie; At the Supermarket bag, can, ham, jam; bakery bun; classroom pen; fruits fig; beach sun, net; farm animals hen, chick, sheep; kitchen tools mug, jug; around the house mop, cup, fan, pot, bed, brush; vehicles van, bus, jet, ship; camping map, log, tent; spring nest; body parts leg, tooth; furniture bench; music drum. Seen 2026-10-17 (critic): body-parts (tooth clean; thumb is drawn but unlabelled), around-the-house (brush is a paint brush — fine for "brush"), camping, beach (net is a butterfly net — fine), bakery (bun reads as a round bread roll — fine), vehicles (jet, ship, van, bus clean).
- **Risks:** three tasks keep the drawer short (Task + one contextual control). The sound colour set must avoid red/green as the only distinction (bars carry the match).
- **Partly BLOCKED (G1-394 th-first only):** *th* at the END is covered (`body-parts/tooth`, t · oo · th, Task 2 round 9). *th* at the START has no usable picture: `body-parts/thumb` is drawn in the image cache but has no lcs-pictures label (added to PICTURE-RULINGS). Needs: a `thumb` label in `body-parts.json` (art exists) — then a th-first round (thumb, th · u · m) joins Task 2. Until then no picture-less round is ever shown.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — jack-in-the-box lids that pop, a koala who listens, the "c and k are the same sound!" surprise.
2. **Would a teacher put it on the board?** Yes — position is made physical: the lids show *where* a sound matched, which answers the most common wrong choice directly; sounds are matched by sound, not spelling.
3. **Would a parent trust it?** Yes — library pictures only, calm, no score, legible silently.
4. **The invention:** drop a picture on the sound boxes and the lids pop open wherever its sounds are the same as the target's — you see that a sound matched, and where.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 4→5 · completeness 3→5 · correctness 3→5 · distinctness 2→5 · reality 3→5
What changed:
- **Overlap with New 214 resolved in 214's favour:** the "How many sounds?" task (open a lid per sound) is gone — counting belongs to the Bumpy Slide. This row now owns only POSITION: same sound at a position (K-226, K-227), where is the sound (K-326, G1-394), hear it anywhere (K-325). The seven syllable worksheets go to 045, the letter-team/sound-of-the-week sheets to 059/110, blending to 054 — each checked by name in the receiving design, so no coverage is lost.
- Box letters now come only from `sound-boxes-bank-<loc>.json` (missing words are added to the bank first); fi follows its bank (one letter per box), replacing an invented "long vowel in one box" ruling.
- `fox` (four sounds in a three-box task) removed from every row; Task 2 rebalanced to exactly 4/4/4 with a real *th* round (`body-parts/tooth`); Task 3 sets rebuilt from bank words, sound-of-the-week sets D–G authored with the sound at varied positions.
- Coco (64/48 px) and the test-row picture (64 px) and the shelf (30 px pictures) broke the picture floor → 96/64 px, and drawn pair tokens.
- Per-locale honesty: es/pt/fr keep three-sound words; it/fi show First/Last only (too few three-sound picture words). The LIVE it rounds that box *Naso* as n·s·o (dropping a vowel) are flagged as a live defect.
