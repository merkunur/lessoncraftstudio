# Row 112 — Build Vowel-Team Words → THE TALKING CLASP (RF.1.3)

## 0. Identity
- **id** `syllable-builder.build-vowel-teams.rf-1-3` (KEPT; slug `build-vowel-team-words`, title and intro frozen en) · grade 1 · Common Core **RF.1.3** (know common vowel-team conventions for representing long vowel sounds) · strand Reading: Foundational Skills.
- **files (key `pinch-teams`)** `mini tools/pinch-teams-core.js`, `pinch-teams-activity.js`, `pinch-teams-activity.html`. The manifest row STAYS in `syllable-builder-activities.json` (which carries other rows); only its `tool` is repointed. `word-builder-core.js` and `syllable-builder-activity.js` untouched. New metadata (slug, title, intro) for de nl fr no (es it pt sv da fi refused, §6).
- **worksheets it covers:** none mapped.
- **what the old activity did:** picture, slots, chunk tiles (b, oa, t + ai, ee, d); tap chunks in order; EN, 8 words. **Kept:** the EN words with true pictures (boat, goat, leaf, seal, jeep, bee, coat) and the idea that the team goes in as ONE piece. **Changed because it was wrong:** `rain` points at `spring/rain`, which does not exist — replaced by *train*/*snail*; the team came ready-made ("oa" on one tile), so the child never had to know that o and a work together — now the child PINCHES two single vowels into a team, and only real teams lock; all four teams were never contrasted with "same sound, other spelling" (ee vs ea) — now they are.

## 1. The pitch
"Pinch two vowels together: only a real vowel team locks into one tile — and the locked team lights up the one letter whose name you hear (oa says O, ai says A), while its partner goes quiet."

## 2. Why a child will want it again (the fun)
- **The pinch.** The vowels lie loose in a tray as chunky single tiles. Drag one onto another: if they are a real team they slide side by side, a little brass clasp snaps over them (*click*) and they become ONE double tile. If they are not a team (o and i, a and u), the clasp won't close — the tiles bump, spin a quarter turn and drift apart. Children try every pair to find out which ones lock. That is the free play, and it teaches the team list by hand.
- **The talker and the quiet one.** On a locked team, the letter that "talks" lights up gold with a small sound-wave mark above it; its partner dims to a pale outline: two vowels, one long sound, and it is the FIRST one's name (oa → O, ai → A, ee → E, ea → E). Tap a locked team and the talker rings its name (TTS where reliable) while the quiet one does a tiny shush wobble.
- **The word lights.** Drop the team into the word's vowel socket and press Check: the whole word lights left to right like a marquee, the picture's caption slides down onto it, and the picture does its small move (the goat hops, the boat bobs, the snail creeps a step).
- **The team board.** A board along the top has four columns, one per team; each finished word pins its tiny word tag under its team. After a pass the child sees *boat goat coat* stacked under oa, *leaf seal* under ea and *bee sheep* under ee — same E sound, two spellings, side by side.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.1.3):** two vowels together can spell one long vowel sound — oa (boat), ai (train), ee (bee), ea (leaf) — and (in English, for these four) the team says the first vowel's name; the same long sound can be spelled two ways (ee / ea) and the word decides which; read and spell such words.
- **Misconception 1 — each vowel says its own sound** (*bo-at*). The clasp makes the two letters one tile with one lit talker — physically one sound. In the word, the socket holds exactly ONE tile, so two loose vowels do not fit side by side.
- **Misconception 2 — any two vowels make a team** (*boit*, *baot*). Non-teams will not lock; the clasp refuses.
- **Misconception 3 — the right sound is enough** (*leef* for leaf, *seel* for seal). ee and ea both light E: the socket glows GREEN for the sound (half right) but the word's spelling card flips over to show *ea* — "right sound, other spelling" is shown as a different, gentler result than a wrong sound.
- **Misconception 4 — the wrong long sound** (*bait* for boat, *beet* for boat). The talker letter does not match the long sound of the picture: at miss 2 the picture's sound badge shows the name it needs.
- **How the material pushes back:** the clasp (locks or refuses), the one-tile socket, and the talker light.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 504 × 470):
- **Team board** (top, 504 × 56): four columns headed by tiny team tiles (oa · ai · ee · ea — content letters); word tags pin under them; empty columns show dashed slots.
- **The picture** (y 66): library picture **150 × 150** on a cream card (`#FFF8EC`, 3 px ink rim, radius 18). A round **sound badge** (36 px) in its corner — empty at rest; fills only as help. Speaker 36 px.
- **The word rail** (y 236): sockets **72 × 84** for consonants (already seated, ink letters 44 px) and ONE **team socket** **120 × 84** (dashed, exactly the width of a locked double tile — a single vowel looks lost in it). Two-team words (oatmeal, sailboat) have two team sockets.
- **The tray** (y 360): seven single vowel tiles **60 × 70** — a, e, e, i, o, o, u (two e's and two o's so ee and oo can be pinched) — in one row, 8 px gaps. A locked team becomes one **120 × 70** tile with a brass clasp drawn across its top edge.
- **Task line** above (Nunito 22 px, ≤ 2 lines). Bubble right, Check under it.

**At 360 px** (stacked): board 360 × 44; picture **112 px**; sockets 56 × 66, team socket 96 × 66; tray in two rows (4 + 3) of tiles 56 × 62; Check bottom ≤ 690 at 360 × 740. **At 320 × 640:** picture 96 px, sockets 50 × 60, team socket 88 × 60 (sailboat: s, ai, l, b, oa, t = 4 × 50 + 2 × 88 + 5 × 4 = 396 — too wide: two-team words break onto TWO rail rows at 320 and 360, the break after the first team's syllable, *sail | boat*), tiles 52 × 58; Check bottom ≤ 620.

No words on the apparatus besides the letters (the content) and the board's word tags.

## 5. The hand
- **Pinch:** drag a vowel tile onto another (in the tray or anywhere on the stage). Overlap ≥ 40 % → test: real team (per the locale's team list, IN THIS ORDER: o onto a gives "oa"; the tile you drop lands on the RIGHT of the one you drop onto) → slide together (120 ms), clasp snaps (*click*), the talker lights gold, the partner dims. Not a team → bump, quarter-spin, drift apart (220 ms, a soft *bonk*). Order matters: *ao* refuses where *oa* locks.
- **Unpinch:** double-tap a team (or drag one of its letters away firmly): the clasp pops open (*tic*) and the two letters separate.
- **Place:** drag a team (or tap it) into the team socket (200 ms, *tok*). A single vowel can also be dropped into the team socket — it sits small in the wide socket (allowed, so a child can try *bot*; Check will answer).
- **Hear:** tap a locked team in the tray: the talker rings its name (TTS where reliable; the sound-wave mark always pulses, sound or not).
- **Check:** §7.
- **Free play:** between rounds the tray and an open rail are free — pinch any pair and see what locks.
- **Undo:** everything until Check; after a miss, tiles stay.

## 6. The rounds
Pass = 9 rounds. Two EN sets (A, B, alternating; order reshuffled every pass, never the same order twice).

**Source rule (critic, binding).** A team socket says "these letters are ONE sound" — a sound split — so every word's team comes from its `mini tools/sound-boxes-bank-<loc>.json` row (en `boat` = b · oa · t, `snail` = s · n · ai · l, `leaf` = l · ea · f). Consonant sockets are one per letter (spelling only; *sh* of *sheep* is two seated letters s h). Words the bank lacks are ADDED to the bank first in its notation and read by the native reviewer (Row 55 precedent). **en bank rows used:** boat, goat, coat, snail, bee, sheep, leaf (+ moon for More teams). **en bank additions required** (* below; pictures checked): train t·r·ai·n, seal s·ea·l, jeep j·ee·p, nail n·ai·l, cheese ch·ee·s (silent e left out of the boxes as the bank does for *mouse*), and the two-syllable set-B words teapot, eagle, beaver, toaster, mailbox, oatmeal, sailboat, peacock (team graphemes marked, the rest one box per sound).

**Clue "Build the word" (default).**

| set | picture (theme/noun) | rail (▭ = team socket) | team |
|---|---|---|---|
| A | boat (beach/boat) | b ▭ t | oa |
| A | goat (farm-animals/goat) | g ▭ t | oa |
| A | coat (clothing/coat) | c ▭ t | oa |
| A | train* (toys/train) | t r ▭ n | ai |
| A | snail (spring/snail) | s n ▭ l | ai |
| A | bee (farm-animals/bee) | b ▭ | ee |
| A | sheep (farm-animals/sheep) | s h ▭ p | ee |
| A | leaf (miscellaneous/leaf) | l ▭ f | ea |
| A | seal* (ocean-life/seal) | s ▭ l | ea |
| B | jeep (vehicles/jeep) | j ▭ p | ee |
| B | nail (body-parts/nail — a finger with its nail) | n ▭ l | ai |
| B | teapot (kitchen-tools/teapot) | t ▭ p o t | ea |
| B | eagle (4th-of-july/eagle) | ▭ g l e | ea |
| B | beaver (forest-creatures/beaver) | b ▭ v e r | ea |
| B | toaster (around-the-house/toaster) | t ▭ s t e r | oa |
| B | mailbox (post-office/mailbox) | m ▭ l b o x | ai |
| B | oatmeal (breakfast/oatmeal) | ▭ t m ▭ l | oa + ea |
| B | sailboat (beach/sailboat) | s ▭ l b ▭ t | ai + oa |

The *sh* of sheep is two seated letters (consonant teams are Row 110's job; the rail spells, it does not split consonant sounds). Every set-B word is a bank addition (*). Set A: oa 3 · ai 2 · ee 2 · ea 2; set B: ee 1 · ai 2 (+1) · ea 3 (+1) · oa 1 (+2) — set B's two-team finales (*oatmeal*, *sailboat*) are the hardest and the most fun. In set B the two-syllable words keep their second syllable's single vowels seated (te**a**pot's second vowel o is seated, never asked).

**Clue "Same sound?" (ee or ea).** The picture, the rail, and TWO ready-locked teams in the tray — ee and ea — for long-E words only. The sound is not the question (both light E); the spelling is. 9 rounds: bee, sheep, jeep, cheese (at-the-supermarket/cheese: ch ▭ s e, its quiet final e seated) — ee ×4 · leaf, seal, teapot, eagle, peacock (birds/peacock: p ▭ c o ck) — ea ×5. (*beetle* is refused: its picture reads as a ladybug.) This clue is the honest centre of vowel-team spelling: same sound, two spellings, the word decides — and the team board makes the two families visible.

**Answer position.** Build: the tray order is a per-pass Latin square over 7 tiles; the two letters of the target team are never adjacent and in team order in the tray (gate); every vowel tile's slot share ≤ 20 %. Same sound?: the ee tile is left / right 50 % per pass and never the same side three times running.

**Order:** order-only reshuffle per pass.

**Other locales** (the build authors each list; one native + pedagogy reviewer checks every word). The team list is per locale and the "first one talks" light is English-only — elsewhere the whole team lights as ONE new sound (both letters glow together, no talker).
- **de** (bank rows): ie — Biene, Ziege; au — Maus, Haus (miscellaneous/house), Zaun, Auto; eu — Eule; ei — Reis, Bein, Kleid, Schwein; oo — Boot. Twelve rows, two sets with fresh pairings. German teaches ie/oo as long vowels and ei/au/eu as *Zwielaute* (two letters, one gliding sound) — the whole team lights, no talker. Trap: *ie* is long i, never i + e. (*Spiegel*, *Auge*, *Klee* need bank rows before use.)
- **nl** (bank rows): maan (aa), boot (oo), boek (oe), muis, uil (ui), deur (eu), vijg (ij) — 7, the minimum; the richer list (kaas, schaap, roos, peer, been, koe, voet, huis, neus, geit, pauw) joins as bank additions. "Same sound?" in nl = ei vs ij (geit · bij), each pair checked against its picture.
- **fr** (bank rows): ou — loup, chou, souris, poule, bouche; oi — poire, étoile — 7; *bateau* (eau), *oiseau* (oi + eau) and an *ai* word join as additions. French silent final letters get Row 58's quiet socket (a hollow socket that holds a letter but no light).
- **no:** ei, au, øy (diphthongs: two letters, one gliding sound — the no bank writes *sau* s · au as ONE box). Only *sau* is a bank row today; geit, bein, øy (island picture to be checked) need bank additions, so no stays hidden until ≥ 7 rows exist; *høy* is refused (the haystack label is *Høystakk*).
- **fi: NOT shipped (refusal recorded, critic).** Finnish has no vowel teams: a long vowel is the same letter written twice, one letter per box (`sound-boxes-bank-fi.json`: kuu k|u|u — the binding Finnish ruling of Row 58), and a diphthong is two vowels each sounded (the bank writes *auto* a|u|t|o). A clasp that turns uu or au into ONE team tile would contradict the bank and the Finnish classroom. Long sounds in fi are taught by Row 109 (The Sound Roll) and Row 58.
- **es, it, pt, sv, da: NOT shipped (refusal recorded).** es/it/pt: two vowels side by side are two sounds (or a diphthong taught as two letters with their own sounds) — there is no vowel-team convention; sv/da: long vowels are spelled with ONE letter (length is marked by the following consonant), so a team activity would teach a false rule. No slug exists there; none is created.
Each shipped locale needs ≥ 9 Build words per set (the gate refuses < 7).

## 7. Check, the misses, the success
- **Check with an empty team socket:** hint, no miss — the socket pulses — "Pinch two vowels into a team for the middle."
- **Miss 1:** the word lights left to right and stops at the team socket: a wrong team (or a lone vowel) clouds and lifts 6 px, ringed coral; the talker letter flashes the name it says (gold, with its letter). · "Say the picture's name. Which long sound do you hear in the middle?"
- **Right sound, other spelling** (ee for ea, or ea for ee): NOT counted as a miss of the same kind — the socket glows green (the sound is right), then the word's spelling card flips over the socket and shows the real team, and the child's team slides back to the tray for them to pinch the shown one. · "That's the right sound! This word spells it with {ea}."
- **Miss 2:** the picture's sound badge fills with the long sound's letter, in gold (O for boat) — what the talker must say; the tray dims every tile except the two letters of the right team. · "The picture says {O}. Which team says {O}?"
- **Miss 3+:** a ghost team (25 %) floats over the socket to copy; the child still pinches and places.
- **A new move takes the help away** (badge empties, tray un-dims) until the next Check.
- **Success:** the word lights fully, the caption slides onto the picture, the picture does its little move; the word tag flies to its team's column on the board. · "{b}–{oa}–{t}: {boat}! In {oa}, the {o} says its name and the {a} stays quiet." · Same sound?: "{seal} spells its E with {ea}!" · non-EN locales: "{maan}: {aa} is one long sound!"

## 8. Settings
1. **Clue:** Build the word (default) · Same sound? — visibly different at rest (seven loose vowels / two ready-locked teams).
2. **Teams:** Four teams (default: oa ai ee ea) · More teams (adds oo, ow, ay, ie: moon (camping/moon, a bank row), broom (around-the-house/broom), spoon (around-the-house/spoon), bowl (around-the-house/bowl), crow (birds-2/crow), haystack (thanksgivinng/haystack — the word shown is *haystack*, its label; never "hay"), tie (accessories/tie), pie (at-the-supermarket/pie) — each a bank addition except moon; the board grows to eight columns) — visible at rest in the board's header row.

## 9. Words (EN source)
- title (shell, frozen): **Build Vowel-Team Words** · instruction: "Pinch two vowels into a team. Only a real team locks — then build the word."
- task lines: build — "Pinch the vowel team, then put it in the word for the picture." · same sound — "Both say E. Which team spells this word?"
- hints / celebrations: §7 exactly. First-time nudge (once per visit): "Drag one vowel onto another. Do they lock?"
- settings: "Clue", "Build the word", "Same sound?", "Teams", "Four teams", "More teams". aria: "Picture: {name}", "Vowel {letter}", "Team {team}: {talker} says its name", "{a} and {b} are not a team", "Team socket: {team|empty}", "Right sound, other spelling".

**Locale traps:** first-one-talks is EN-only (and only for the four default teams; *ow* in *cow* breaks it, so *cow* never appears); nl *ei/ij* homophones; de *ie* (long i, never two sounds); fi refused (its bank writes a long vowel as two boxes); fr silent letters (quiet socket); German capitalised nouns (the first consonant of *Biene*, *Maus* is a capital seated tile; a team at the very start, as in *Eule* or *Auto*, is pinched from capital vowel tiles — the tray carries capital A/E/U for those rounds); refusals as listed. Sound off: the clasp, the talker light, the badge and the flipping spelling card carry everything.

## 10. Sound off, access, phones
- **Silent legibility:** locking/refusing, the gold talker and the dim partner, the one-tile socket, the green-then-flip for "right sound, other spelling", and the badge.
- **Keyboard:** Tab to a tile, Space picks it up, arrow keys move between tiles, Space drops onto the focused tile (pinch); Enter on a team places it in the socket; Delete unpinches; Check button / C key.
- **aria-live:** "o and a locked: oa — o says its name." / "o and i are not a team." / "Right sound, other spelling: this word spells it ea."
- **Taps:** tiles ≥ 52 × 58, sockets ≥ 50 × 60; picture 150 / 112 / 96 px.
- **Phone layout:** stacked; tray in two rows; two-team words break onto two rail rows at a syllable seam; Check above the 360 × 740 and 320 × 640 folds (measured on every round including *sailboat* and *oatmeal*).

## 11. Distinct from
- **Row 110 The Paint Wells (this batch):** the nearest sibling, kept apart on purpose: 110 pours CONSONANTS only and asks "one sound or two?", answered by colour; 112 handles VOWELS only and asks two different questions the paint cannot — **which ORDER is the team** (o onto a locks *oa*, a onto o does not: the clasp is directional) and **which letter talks** (the gold talker shows the long sound's name; ee and ea both light E, so the word's spelling, not the sound, decides). No vowel team is ever poured in 110 and no consonant is ever clasped here.
- **Row 111 The Reach-Back e (this batch):** a silent letter at the end acts at a distance; here two vowels sit side by side and lock.
- **Row 58 The Word Elastic:** team tiles come ready-made; here the child makes the team and the material refuses fake teams.
- **Premium `letter-tiles`, `blending-board`:** no locking pairs, no talker.
- **Built registry:** no clasp or pinch mechanic exists.

## 12. Build plan
- **Core state** `{locale, clue, teamsMode, set, round:{pic, rail:[{kind:'seat', g}|{kind:'team', answer}], choices|null}, tray:[{id, letters:[v], locked:bool}], sockets:[tileId|null], misses, help}`.
- **Functions:** `pinch(dropId, ontoId)` → `{locked:bool, team}` (order-sensitive, per-locale list), `unpinch(id)`, `place(id, socketIdx)`, `talker(team, locale)` (EN: first letter for oa/ai/ee/ea, null elsewhere), `check()` → per socket `{state:'ok'|'sameSoundOtherSpelling'|'wrong'|'single'|'empty'}`, `helpFor(result, misses)`.
- **Gate's own ground truth** (`verify-pinch-teams-core.js`): its OWN per-locale team list and its OWN hand table of each word's teams; asserts every round's team is on the locale list, `pinch` locks exactly the listed ordered pairs (all 25 ordered vowel pairs tested per locale), "same sound" rounds pair only teams the gate marks homophonous for that locale (en ee/ea, nl ei/ij), the tray's target letters are never adjacent-in-order, slot shares ≤ 20 %, every picture exists in a colour theme with a label equal to the word; `rain`, `beetle`, `cow` never referenced; no es/it/pt/sv/da/fi rows; every team word equals its bank row's team (a word missing from the bank fails).
- **Mutations (one per rule):** let *ao* lock · let *oi* lock in en · make the second letter the talker · treat ee-for-ea as a plain miss · accept a lone vowel in the team socket · show the badge at rest · put the team's letters adjacent in the tray · keep the help after a new move · ship an sv row · drop the order check (pinch symmetric).
- **Pictures:** seen 2026-10-17 (`work-23/s109.png`, `s112.png`): boat, goat, coat, train, snail, bee, sheep, leaf, seal, jeep, body-parts/nail (a finger and its nail — reads as "nail"), teapot, eagle, beaver, toaster, mailbox (a US post-box), oatmeal (a bowl of porridge — reads as oatmeal/porridge), sailboat, peacock, bowl, crow, haystack, broom, spoon, moon, tie, pie. Ruled out: `things-that-fly/beetle` (reads as a ladybug); `tools/nail` (non-EN labels name the fingernail — picture ruling). Still to view: at-the-supermarket/cheese (a wedge — seen in s110, fine), and every non-EN word's picture.
- **Risks:** order-sensitive pinch on touch (the drop target decides the order: the dropped tile lands on the right) — tested with real pointers; the two-row rail break at 320/360.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — tiles that snap together with a clasp only when they belong, a letter that lights up and one that goes quiet, and a word that lights like a marquee.
2. **Would a teacher put it on the board?** Yes — "when two vowels go walking, the first one does the talking" made literal for the four teams where it is true, plus the honest lesson that ee and ea sound the same and the word decides.
3. **Would a parent trust it?** Yes — library pictures, each language's real teams (and no fake teams forced on Spanish or Swedish), calm, nothing sold.
4. **The invention:** vowels you pinch together that only lock when they are a real team — and the locked team lights the letter whose name you hear while its partner goes quiet.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 3→5 · reality 3→5
What changed:
- Renamed THE TALKING CLASP and separated from Row 110 (vowels only, directional clasp, the talker and the same-sound/other-spelling choice — none of which 110 has).
- fi REFUSED: its bank writes a long vowel as two boxes and a diphthong as two sounds (auto a|u|t|o) — a clasp joining them would contradict the bank and the Finnish ruling.
- Source rule added: team words from the bank (boat, goat, coat, snail, bee, sheep, leaf, moon) + listed bank additions; de rebuilt on its bank (Biene, Ziege, Maus, Haus, Zaun, Auto, Eule, Reis, Bein, Kleid, Schwein, Boot), nl/fr/no on theirs (no hidden until ≥ 7 rows).
- Picture paths fixed (crow = birds-2/crow, haystack = thanksgivinng/haystack, shown as *haystack* — never "hay").
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
