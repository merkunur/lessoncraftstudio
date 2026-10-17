# Row 120 — Two Moons → THE PLANK ACROSS TWO BOOKS (RL.1.9)

## 0. Identity
- **id** `two-tales.compare.rl-1-9` (KEPT; slugs, titles and intros frozen for en de fr es pt it nl; sv da no fi get a new slug/title/intro at build, grade 1) · CCSS **RL.1.9** (compare and contrast the adventures and experiences of characters in stories) · strand Reading: Literature · own files `two-tales-core.js` (rewritten), `two-tales-activity.js` (rewritten), `two-tales-activity.html`, `two-tales-activities.json`.
- **Worksheets covered:** none mapped (coverage map) — the activity carries RL.1.9 alone.
- **Old activity:** two one-line "tales" (an emoji glyph + one summary sentence) under a gold and a silver moon; tap one of three experience cards for "What is the SAME in both stories?" or "What happened in ONLY ONE story?". **Kept:** the gold-moon / silver-moon identity and Mossbeard the Story-Keeper (the frozen intros name him; fr/it/pt call him a turtle); the six experience tags and their labels in all 7 shipped locales (`tagText`, `tagTextL10n`); the six tales (fox, bunny, mouse, bird, frog, duck) with their tag pairs; both question flavours; the 9 old rounds survive inside the new tables (S1–S5 = old tt-s1…s5, O1–O4 = old tt-d1…d4 re-cut to one right answer). **Gone:** emoji glyphs, one-line summaries, the bare card tap. **New:** each tale becomes a three-panel picture book of library pictures; three new tales (hedgehog, squirrel, and Kiki the cat — the HALF-experience tale: she loses her ball and never finds it) so every tag is shared by ≥ 2 pairs and misconception 3 has rounds; a third task (sort every plank, with a "neither" basket).

## 1. The pitch
"An experience card is a plank: lay it across the two books and each end looks for the page where that happened — if both books have it the plank lies flat like a bridge; if only one does, the other end has nothing to rest on and it tips into that book."

## 2. Why a child will want it again
- **Two real little books** lie open on Mossbeard's table, gold on the left, silver on the right, with a gap of table between them. Each has three panels of big library pictures and one short sentence per panel. Tapping a panel makes its scene twitch (the cap blows away, the ball rolls, the lamp blinks on in the night) — reading feels like playing.
- **The plank.** Each experience card is a chunky wooden plank (drawn geometry, 3 px ink, wood-grain lines) with its words on it. The child picks one up and lays it across the gap. Each end then *walks* along its book like a reading finger — panel 1 → 2 → 3 — and where the book SHOWS that experience a small wooden prop rises out of the panel and the end settles on it with a soft *tock*.
- **The tip.** If one book has no such panel, that end slides off the book's edge into the air: the plank creaks, see-saws and tips down into the book that does hold it. The child SEES "only in this story". A plank true in neither book has nothing under either end and drops into the gap with a hollow *plonk*, then floats back to the tray.
- **The bridge show.** When a round is solved, Mossbeard (the library turtle) walks across the flat plank from one book to the other — the shared experience is literally the bridge between the two stories.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RL.1.9):** read two short stories, notice what happened to each character, and compare (same in both) and contrast (in only one) their experiences — with evidence from each text.
- **Misconception 1 — comparing surface, not experience** ("both have an animal", "both are outside"). The planks only name experiences, and a plank only rests on a panel that SHOWS that experience, so surface likeness buys nothing.
- **Misconception 2 — reading only one story.** A child who finds "Lost it, then found it" in the fox book and calls it "same" watches the silver end slide across all three silver panels and fall off: the check runs in BOTH books, panel by panel, in front of them.
- **Misconception 3 — half an experience counts** (a character who is only scared vs one who is scared, then safe). Two-part tags prove on the panel that COMPLETES them: the end passes the "scared" panel (it glows) and rests on the "safe" panel; a tale with only the first half gives no rest.
- **How the material pushes back:** gravity. An end needs a panel to rest on; no panel, no support. There is no "wrong" message; a plank simply cannot lie flat on one support.

## 4. The stage
Full width (no split layout) — the two books need the whole stage; the bubble sits under the table.

**At 704 px (stage 672 wide):**
- **The table** — a warm wood band (geometry) across the stage, 360 px tall.
- **Gold book** (left) and **silver book** (right): each 268 × 300 px, laid out like a comic page so pictures stay ≥ 96 px: panel 1 top-left and panel 2 top-right (132 × 150 each), panel 3 across the bottom (268 × 140). Panel edge 3 px ink; a 10 px gold (#F2C14E) or silver (#C3CCD4) spine ribbon with a 22 px moon disc (geometry) on it — the moons are the books' names. Gap between the books: 112 px.
- **Each panel:** sky band over ground band (colour per scene), main character (library, 96 px), prop (library, 96 px; overlap ≤ 20 % where the caption says "with/carry"), caption at the panel foot, 15 px Nunito 700, ≤ 2 lines; a 1–3-dot page mark in the panel corner (8 px dots), never a numeral word.
- **Mossbeard** — library `forest-creatures/turtle`, 96 px, sitting in the gap at the table's front edge.
- **The tray** under the table: 3 (SAME, ONLY-ONE) or 4 (SORT) planks, 300 × 52 px each, two per row, label 17 px Nunito 800, wood #E9C48F with grain lines, ink outline.
- **The basket** (SORT only): a woven basket (a trapezoid with a cross-hatch) 120 × 70 px at the tray's right end, for planks that are in neither story.
- **Task line** above the table (≤ 24 px, ≤ 2 lines): §9.
- No words on the apparatus except captions and plank labels, which ARE the content.

**At 360 px (stage 336 wide):** a **two-book swipe** — one book visible at a time (336 × 300, panels scaled, pictures 80 px), two tabs above it (gold-moon tab / silver-moon tab, 44 px tall). Between the tabs sits the **bridge bar** (336 × 56): dropping a plank on the bar means "across"; dropping it on the visible book means "only this book". On a walk the view flips gold → silver so the child watches each end search its own book (900 ms each); the bar's plank icon then lies level or tilts toward the book that holds it. Tray below (planks 320 × 48, one per row), basket beside the last plank, Check at ≈ 650 px. **320 × 640:** pictures 72 px, planks 300 × 46, Check at ≈ 600 px.

## 5. The hand
- **Pick up a plank** (pointerdown): it lifts 6 px with a shadow (60 ms) and follows the finger, level.
- **Drop across the gap** (both ends over books / on the phone bridge bar): it lands level (120 ms); each end walks its book, 300 ms per panel, the panel under the end brightening 10 %. Ends walk together at 704, one after the other on phones.
  - Panel shows it → a wooden prop (14 × 18) rises from the panel foot (150 ms), the end rests there, *tock* (marimba E4).
  - No panel → the end slides off the outer edge (200 ms); the plank tips toward the other book (350 ms, ease-out, a soft creak) — or, if neither book has it, drops into the gap (*plonk*, 300 ms) and floats back to the tray (400 ms).
- **Drop on ONE book** = "I think only this one". The plank lies inside that book and walks only that book; the OTHER book is searched at Check (the child commits first).
- **Drop in the basket** (SORT) = "in neither story".
- Planks can be lifted and moved freely until Check; a lifted plank's props sink back.
- **Tap a panel:** its scene action (≤ 900 ms) and TTS reads the caption where TTS exists.
- **Keyboard:** Tab cycles planks → drop targets (gold book · across · silver book · basket) → panels; Enter picks/drops; Esc returns a plank to the tray.
- **Free play:** after a solved round, Mossbeard can be dragged back and forth across the bridge; any plank can be laid across just to watch the ends search (exploration walks before Check are part of the play; Check grades the final placement).

## 6. The rounds

### The eight tales (3 panels; library pictures; scene action in brackets)
| tale | tags | panel 1 | panel 2 | panel 3 |
|---|---|---|---|---|
| **Rusty the fox** (kept) | LOST_FOUND, TRIED_AGAIN | The wind blew Rusty's cap away. [forest-creatures/fox; accessories/cap flies off] | He looked under the log, and he kept on looking. [fox beside camping/log] | At last he found his cap in the grass. [cap back on spring/grass] |
| **Bo the bunny** (kept) | LOST_FOUND, GOT_HELP | Bo lost her ball. [spring/bunny; toys/ball (a black-and-white football — never "red") rolls out of the panel] | She looked and looked, but it was gone. [bunny alone] | Her friend Dot the dog found the ball for her. [farm-animals/dog nudges toys/ball to the bunny] |
| **Millie the mouse** (kept) | SCARED_SAFE, GOT_HELP | Millie saw a big owl and felt scared. [forest-creatures/mouse trembles; forest-creatures/owl] | Her friend Bill the beaver came to help. [forest-creatures/beaver] | Next to Bill, Millie felt safe. [mouse beside beaver; owl flies away] |
| **Pip the robin** (kept) | TRIED_AGAIN, FIXED_IT | The wind blew Pip's nest out of the tree. [spring/robin; spring/nest falls from tree/apple] | Pip tried and tried to lift it back up. [robin tugs the nest] | At last Pip fixed the nest in the tree. [nest back in tree/apple] |
| **Fern the frog** (kept, re-told — "fixed the leak" had no picture, and weather/stormy is a RED cloud that reads as "red rain", ruled unusable as a storm) | SCARED_SAFE, FIXED_IT | Night came, and Fern felt scared of the dark. [forest-creatures/frog; the panel's sky band turns night blue (geometry)] | Her lamp was broken, so she fixed it. [furniture/lamp, unlit; Fern beside it] | With her lamp on, Fern felt safe. [lamp lit — a pale geometry halo; the night band softens] |
| **Dilly the duck** (kept) | SHARED, GOT_HELP | Dilly had a big lunch in her lunchbox. [farm-animals/duck; classroom/lunchbox] | She shared her lunch with Gus the goat. [farm-animals/goat] | Gus helped Dilly carry her lunchbox home. [goat beside the lunchbox, both move off] |
| **Hal the hedgehog** (NEW) | TRIED_AGAIN, SHARED | Hal found a big red apple. [forest-creatures/hedgehog; fruits/apple] | It was heavy, but he kept on rolling it home. [apple rolls a little] | At home, Hal shared the apple with his friend. [hedgehog + forest-creatures/rabbit] |
| **Sam the squirrel** (NEW) | LOST_FOUND, SHARED | Sam dropped his acorn and lost it. [forest-creatures/squirrel; miscellaneous/acorn falls] | Then he found it next to a pinecone. [acorn beside miscellaneous/pinecone] | Sam shared his acorn with a little bird. [spring/bird] |
| **Kiki the cat** (NEW — the half-experience tale) | SHARED only (LOST without FOUND) | Kiki lost her ball in the tall grass. [pets/cat; toys/ball rolls into spring/grass] | She looked, but she could not find it. [cat alone at the grass] | So she shared her kite with her friend Ted the pig. [toys/kite; farm-animals/pig] |

**Proof panels** (where the prop rises), stored per tale as `proof:{TAG: panel}`: LOST_FOUND → the "found" panel (the "lost" panel glows as the end passes); SCARED_SAFE → the "safe" panel (the "scared" panel glows on the way); GOT_HELP → the helper's panel; TRIED_AGAIN → the trying panel; FIXED_IT → the fixing panel; SHARED → the sharing panel. Rusty: LF 3, TA 2 · Bo: LF 3, GH 3 · Millie: SS 3, GH 2 · Pip: TA 2, FI 3 · Fern: SS 3, FI 2 · Dilly: SH 2, GH 3 · Hal: TA 2, SH 3 · Sam: LF 2, SH 3 · Kiki: SH 3, and `half:{LOST_FOUND: 1}` — a LOST_FOUND end passing Kiki's panel 1 makes it GLOW (the "lost" half is there) and then finds no "found" panel, so it slides off: the child watches half an experience fail to hold a plank.
Picture rulings honoured: no chick/duck pairing; spring/nest holds chicks (it is Pip's nest with babies — fits); spring/robin (Pip) and spring/bird (Sam) are near-twins, so the robin tale and the squirrel tale never share a round (gate-asserted); the turtle is Mossbeard only, never in a tale; weather/stormy is not used (red cloud); toys/ball is never called red.

**2-page tales** (setting "Pages: 2"; a separately authored caption pair per tale with the proof map remapped — page A carries what panels 1–2 carried, B what panel 3 carried):
| tale | page A | page B | proofs |
|---|---|---|---|
| Rusty | The wind blew Rusty's cap away, but he kept on looking. | At last he found his cap in the grass. | LF B (A glows) · TA A |
| Bo | Bo lost her ball and could not find it. | Her friend Dot the dog found the ball for her. | LF B · GH B |
| Millie | Millie saw an owl and felt scared, so Bill the beaver came to help. | Next to Bill, Millie felt safe. | SS B · GH A |
| Pip | The wind blew Pip's nest down, and Pip tried and tried to lift it. | At last Pip fixed the nest in the tree. | TA A · FI B |
| Fern | Night came, and Fern felt scared. Her lamp was broken, so she fixed it. | With her lamp on, Fern felt safe. | SS B · FI A |
| Dilly | Dilly shared her big lunch with Gus the goat. | Gus helped Dilly carry her lunchbox home. | SH A · GH B |
| Hal | Hal found a heavy apple, but he kept on rolling it home. | At home, Hal shared the apple with his friend. | TA A · SH B |
| Sam | Sam dropped his acorn, then found it next to a pinecone. | Sam shared his acorn with a little bird. | LF A · SH B |
| Kiki | Kiki lost her ball in the grass and could not find it. | So she shared her kite with her friend Ted the pig. | SH B · half-LF A |

### SAME rounds — the shared plank goes across (9 per pass)
Three planks: the shared tag + each tale's other tag. One right action: the shared plank across. (An only-one plank laid across tips = a miss.)
| # | gold | silver | shared (answer) | other planks |
|---|---|---|---|---|
| S1 | fox | bunny | LOST_FOUND | TRIED_AGAIN, GOT_HELP |
| S2 | bird | fox | TRIED_AGAIN | FIXED_IT, LOST_FOUND |
| S3 | mouse | frog | SCARED_SAFE | GOT_HELP, FIXED_IT |
| S4 | duck | bunny | GOT_HELP | SHARED, LOST_FOUND |
| S5 | frog | bird | FIXED_IT | SCARED_SAFE, TRIED_AGAIN |
| S6 | hedgehog | squirrel | SHARED | TRIED_AGAIN, LOST_FOUND |
| S7 | squirrel | fox | LOST_FOUND | SHARED, TRIED_AGAIN |
| S8 | mouse | duck | GOT_HELP | SCARED_SAFE, SHARED |
| S9 | Kiki (cat) | duck | SHARED | GOT_HELP, LOST_FOUND ← the half-trap: Kiki LOST her ball, so a child who reads half lays it across; the gold end glows Kiki's "lost" panel, finds no "found", and the plank (true in neither tale) drops through the gap |

### ONLY-ONE rounds — one plank lies inside ONE book (9 per pass)
Three planks: the answer (one tale's own tag), the shared tag (lure) and a tag in neither tale (decoy). The answer must be put **on the book it belongs to** (on the other book, across or in neither = miss).
| # | gold | silver | answer → book | shared (lure) | neither (decoy) |
|---|---|---|---|---|---|
| O1 | bunny | mouse | LOST_FOUND → gold | GOT_HELP | FIXED_IT |
| O2 | mouse | duck | SHARED → silver | GOT_HELP | TRIED_AGAIN |
| O3 | fox | bird | FIXED_IT → silver | TRIED_AGAIN | SCARED_SAFE |
| O4 | frog | mouse | FIXED_IT → gold | SCARED_SAFE | SHARED |
| O5 | hedgehog | fox | SHARED → gold | TRIED_AGAIN | GOT_HELP |
| O6 | squirrel | bunny | GOT_HELP → silver | LOST_FOUND | FIXED_IT |
| O7 | duck | squirrel | GOT_HELP → gold | SHARED | SCARED_SAFE |
| O8 | bird | hedgehog | SHARED → silver | TRIED_AGAIN | LOST_FOUND |
| O9 | Kiki (cat) | squirrel | LOST_FOUND → silver (Sam lost it AND found it; Kiki only lost it) | SHARED | GOT_HELP |

### SORT rounds — every plank has a place (7 per pass)
Four planks: shared → across; gold-only → gold book; silver-only → silver book; a tag in neither tale → the basket. All four placed, then Check.
| # | gold | silver | across | gold-only | silver-only | basket |
|---|---|---|---|---|---|---|
| X1 | fox | bunny | LOST_FOUND | TRIED_AGAIN | GOT_HELP | SHARED |
| X2 | mouse | frog | SCARED_SAFE | GOT_HELP | FIXED_IT | LOST_FOUND |
| X3 | bird | hedgehog | TRIED_AGAIN | FIXED_IT | SHARED | GOT_HELP |
| X4 | duck | squirrel | SHARED | GOT_HELP | LOST_FOUND | SCARED_SAFE |
| X5 | frog | bird | FIXED_IT | SCARED_SAFE | TRIED_AGAIN | SHARED |
| X6 | bunny | duck | GOT_HELP | LOST_FOUND | SHARED | FIXED_IT |
| X7 | squirrel | fox | LOST_FOUND | SHARED | TRIED_AGAIN | SCARED_SAFE |

- **Answer position (MEASURED by the critic's script `scratchpad/des/work-c25/m120.js`, 25 rounds).** Gold is always left (it is the gold moon); which TALE is gold is balanced — measured gold counts fox 3 · bird 3 · mouse 4 · duck 3 · frog 3 · hedgehog 2 · squirrel 3 · cat 2 · bunny 2. **The tray slot is FIXED by the table, not left to a shuffle:** the answer plank sits in slot `i mod 3` (S1→0, S2→1, S3→2 … S9→2; the same for O1…O9) → exactly 3/3/3 per pass; the other planks fill the remaining slots in table order; in SORT the across plank sits in slot `i mod 4` and the other three follow in the rotating order gold-only, silver-only, basket. ONLY-ONE answer book: gold 4 (O1, O4, O5, O7) / silver 5. Label length (EN): the answer is strictly the longest label in 7/18 SAME+ONLY rounds and strictly the shortest in 6/18 — no length tell; the gate re-measures per locale and fails if the answer is the longest in > 45 %. Tag-frequency bot ("always pick SHARED when offered"): right 5/11 — the gate keeps every single-tag bot ≤ 50 %. All 25 rows re-derived from the tale → tag table with 0 errors (SAME: exactly one shared tag, the other planks not shared; ONLY-ONE: answer in exactly one tale on the named book, lure in both, decoy in neither; SORT: each destination true).
- **Order:** order-only reshuffle per pass (the `nextTask` pattern, §A.13.60); never two rounds in a row with the same tale pair.

## 7. Check, the misses, the success
- **Check with nothing placed** → no miss; the planks wobble. Hint: "Pick up a plank and lay it where it belongs."
- **Check in SORT with planks still in the tray** → no miss; those planks wobble. Hint: "Every plank needs a place."
- **On Check** every placed plank finishes its walk: a plank lying in one book now also sends its other end across the other book (it appears and slides along the panels) — the child watches the second search.
- **Miss 1 (the apparatus shows it):** each wrongly placed plank behaves truthfully where it was put — a "both" guess that is only in one book TIPS into that book; an "only gold" guess that the silver book also has gets a second end that finds a silver panel and the plank swings flat across; a neither-plank drops into the gap. The searched panels stay faintly lit for 2 s and the proof props stay up, then the wrong planks float back to the tray (right planks stay). Hint: "Watch where the plank can rest. Read the page it found."
- **Miss 2 (stronger showing):** every tray plank shows two small moon dots at its ends — a lit gold dot if the gold book has it, a lit silver dot if the silver book has it (both lit = across; one = that book; none = basket). Hint: "Each end of a plank looks in one book. Does the gold book have it? Does the silver book?"
- A new drag clears the help until the next Check.
- **Success:** planks settle (flat across / resting in a book / in the basket), Mossbeard walks across the across-plank (1.2 s), the proof panels glow gold and silver. Bubble (EN):
  - SAME: "{goldName} and {silverName} both: {tag}! The plank rests in both stories."
  - ONLY-ONE: "Only {name}: {tag}. The other story doesn't have it."
  - SORT: "Same in both: {sharedTag}. Only {goldName}: {goldTag}. Only {silverName}: {silverTag}."

## 8. Settings
1. **Task:** What is the same? / What happened in only one? / Sort every plank. (Default: same.) The board changes at rest: 3 planks + no basket / 3 planks / 4 planks + the basket.
2. **Pages:** 3 pages / 2 pages — "2 pages" shows each tale as two big panels (A, B) with the separately authored caption pair and remapped proofs of §6 (pictures 120 px at 704), for early readers. Every proof survives because the pair was written for it, not cut out of the 3-page tale.

## 9. Words (EN source)
- page title (frozen) "Two Moons — Compare Two Stories: Same & Different (Grade 1)"; stage title "Two Moons"
- instruction SAME: "Read both stories. Lay the plank that happened in BOTH across the books." · ONLY-ONE: "Read both stories. Put the plank that happened in only one story on its book." · SORT: "Read both stories. Give every plank its place."
- hints: empty "Pick up a plank and lay it where it belongs." · sortEmpty "Every plank needs a place." · miss1 "Watch where the plank can rest. Read the page it found." · miss2 "Each end of a plank looks in one book. Does the gold book have it? Does the silver book?"
- celebrations as §7 (`{goldName}` = "Rusty the fox" etc.)
- plank labels: the six kept `tagText` strings — "Lost it, then found it" · "A friend helped" · "Kept trying" · "Shared with a friend" · "Scared, then felt safe" · "Fixed what broke".
- aria: book "{moon} book: {name}" · panel "Page {n}: {caption}" · plank "{tag}" · targets "Across both books" / "On the gold book" / "On the silver book" / "In neither story".
- settings: "Task" · "What is the same?" · "What happened in only one?" · "Sort every plank" · "Pages" · "3 pages" · "2 pages".
- **Locale traps.**
  - **Plank labels sit between two characters, so they must not agree in gender** with either: fr "Perdu, puis retrouvé" and "rassuré" agree with a masculine subject while Bo, Millie, Fern and Dilly are female → the reviewer rewrites fr/it/pt/es planks as gender-free phrases (fr "Perdre puis retrouver", "Avoir peur, puis se sentir en sécurité"; it avoids "aiutato/a"). de, nl, the Nordic languages and fi do not agree — fine.
  - **Captions must state the proof experience without copying the plank** (so the child reads rather than string-matches): the gate forbids each plank's literal inside any caption, per locale.
  - Character names kept unless a locale reads them as a word (da "Bo" is a real name — fine). Animal nouns are authored inside whole captions, never looked up (articles, gender, case: de capitalisation, fi no articles).
  - No left/right words anywhere: the moons carry the books.
  - es: "cuento", never "historia" (the old file's ruling, kept).
  - sv/da/no/fi: new slug, title and intro (grade 1), plank labels and all captions authored fresh by the build, then the one reviewer.

## 10. Sound off, access, phones
- Legible with sound off: captions and plank labels are written; walks, props, tips and drops are motion. TTS reads a caption on panel tap (5 locales).
- Keyboard path §5; outcomes announced ("The plank rests on page 3 of the gold book and page 3 of the silver book").
- Taps ≥ 44 px (planks 52/48 tall; drop targets are whole books, the 112 px gap, the 56 px bridge bar).
- Pictures 96 px at 704, 80 at 360, 72 at 320.
- Check above the fold at 360 × 740 (≈ 650) and 320 × 640 (≈ 600).

## 11. Distinct from
- **sorting-hoops (premium tool):** two overlapping hoops, a hidden attribute rule, and the HOOP decides where a thing may lie. Ruling (critic): here nothing overlaps and there is no hidden rule — the two books lie apart, the "both" place is not a region but a SPAN that needs a support at each end, and what decides is a page the child can read in each story. The child never drops a card into an intersection; she lays a claim and watches two readers check it. SORT's four destinations are the four outcomes of that test (two supports / one / none), not a Venn diagram, and the board must never draw an overlap.
- **Row 126 The Turning Bridge:** bridge planks whose SHAPE is a joining word; here a plank's shape never matters — only whether each end finds a page.
- **#18 The Friendship Bridge:** a bridge that carries counters for fair sharing; here the plank IS the claim and rests or tips by the presence of a page.
- **#063 The Bookmark / #069 The Highlighter:** evidence in ONE text; this compares ACROSS two texts.
- **story-line (tool) / #064 The Flipbook:** sequence, not comparison.

## 12. Build plan
- **Core** `TwoTalesCore`: `tale(id)` → `{panels:[{caption, pics}], tags, proof:{TAG:panel}}`; `newRound(row)`; `place(state, plankId, target)` (target ∈ across | gold | silver | basket | tray); `walk(state, plankId)` → `{gold: panel|null, silver: panel|null}` from the proof maps; `truth(plankId)` → across | gold | silver | basket (derived from the two tag sets, never stored); `grade(state, mode)` → per plank `{ok, truth, walk}`; `dotsHint(state)`.
- **Gate's own truth** (`verify-two-tales-core.js`): an independent tale → tags table written in the gate; every round's answer re-derived; SAME rounds share exactly one tag; ONLY-ONE answer is in exactly one tale and the decoy in neither; SORT covers all four destinations; every proof panel exists in BOTH the 3-page and the 2-page tale; Kiki's half-LF panel glows and never holds; no round pairs the robin tale with the squirrel tale; no caption contains a plank literal (every locale); the balance numbers of §6; no consecutive same pair after reshuffle.
- **Mutations (each killed):** an only-one plank lies flat across · a neither plank rests on a book · the walk searches one book only · ONLY-ONE accepts the right plank on the wrong book · SORT passes with a plank in the tray · the answer always in tray slot 0 · a proof panel off by one · a plank literal copied into a caption · gold always the same tale · miss-2 dots show the target instead of per-book evidence.
- **Pictures to verify on contact sheets (all present in the theme JSONs — critic-checked):** forest-creatures/{fox, mouse, owl, beaver, frog, hedgehog, rabbit, squirrel, turtle}, accessories/cap, camping/log, spring/{grass, bunny, robin, nest, bird}, toys/{ball, kite}, farm-animals/{dog, duck, goat, pig}, pets/cat, furniture/lamp, tree/apple, classroom/lunchbox, fruits/apple, miscellaneous/{acorn, pinecone}. (spring/umbrella and weather/stormy are no longer used.) (Seen this session: miscellaneous acorn/pinecone, classroom lunchbox; the rest are used by built rows.)
- **Risks:** "with/carry" is shown by overlap — panel coordinates authored and read on renders; plank gender in fr/it/pt (reviewer). Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — laying a plank and watching it creak, tip, drop, or become a bridge Mossbeard walks over is a toy; the panels move when tapped.
2. **Teacher on the board?** Yes — "is it in BOTH stories? Show me the page in each" is the whole lesson, and the plank enacts it for the class.
3. **Parent trust?** Gentle stories, library pictures, no scores, every answer proved by a page.
4. **Invention:** an experience is a plank that needs a page in each book to lie flat — same rests across, only-one tips in, neither falls through.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 3→5
What changed:
- Misconception 3 (half an experience counts) had NO round that tested it: added Kiki the cat (lost her ball, never found it) with S9 and O9, where a LOST_FOUND plank glows her "lost" page and still finds nothing to rest on.
- Fern re-told (night → fixes her lamp → safe): weather/stormy is a red cloud ruled unusable as a storm. Bo's ball is no longer "red" (toys/ball is a black-and-white football).
- The "2 pages" setting was broken (TRIED_AGAIN etc. proved on panel 2, which the setting removed): replaced by a separately authored 2-page caption pair per tale with a remapped proof map.
- Answer position measured with my own script (work-c25/m120.js): 25 rows re-derived, 0 errors; tray slot fixed by table (3/3/3), answer longest 7/18 / shortest 6/18, tag bot ≤ 5/11; ONLY-ONE gold 4 / silver 5.
- Sorting-hoops ruling written: no overlap is ever drawn, no hidden rule; "both" is a span needing two supports, not an intersection region. robin/bird twin pictures kept out of the same round.
