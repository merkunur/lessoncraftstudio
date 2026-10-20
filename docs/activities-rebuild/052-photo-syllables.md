# #52 — Forme le mot en syllabes (fr) → LA PHOTO QUI SE RÉVÈLE, the developing photo (RF.K.2.B, French only)

ORDER row 52 · id `syllable-builder.forme-le-mot-en-syllabes.rf-k-2-b` (kept).

- **Files:**
  - Added: `photo-syllables-core.js`, `photo-syllables-activity.js`, `photo-syllables-activity.html`, `photo-syllables-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 3 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** fr only by design.
- **Metadata:** slug, title and intro are frozen. The fr prose is rewritten for the new apparatus.
- **Strand chip:** «Conscience phonologique», as on the other fr phonology rows.
- **Design:** `designs/052-syllable-builder.md`. **Prefix:** `phs-`.

## The apparatus and its invention: EVERY SYLLABLE CARD CARRIES ITS OWN STRIP OF THE PHOTO
- **The photo frame:** a white-bordered photo paper on a teal developing tray. Before Développer it is blank cream with a dashed outline. A brass speaker sits on its corner and reads the cards on the rail as one word.
- **The cards:** cream syllable cards with a punch hole. The word-final mute e is shown **grey**: the CP «lettre muette».
- **The rail:** cards snap side by side from the left. A card dropped between two others is inserted; a card dragged along the rail moves; a tap or a drag off the rail takes it back. The tray holds the round's cards plus the decoy(s).
- **Développer (Check):**
  - **Safelight:** a red glow, then each card sends up its strip, left to right (500 ms each).
  - **Each strip** is the card's own syllable slice of its own word's photo, one ÷ its own word's syllable count wide.
  - **Sharp:** the word's own card in its own place.
  - **Fogged:** every other strip; its card tilts.
  - **A decoy** develops a strip of another photo (a coral edge).
  - **A missing card** leaves a white hatched band.
  - **Overflow** curls at the edge.
- **Miss 2 (the contact print):** the right photo lies faintly behind, with a dashed line at each syllable boundary. A move blanks the paper and the help until the next Développer.
- **Right:** the strips melt into one photo, a camera flash, and the cards light gold. The photo pins itself into the album (drawn photo-corner frames with the word under them; tapping one shows that photo FULL size in the frame again).
- **Levels:**
  - **Une ou deux syllabes:** 9 words; the 5 one-syllable words get two decoys.
  - **Le e muet:** 9 words.
  - **Trois syllabes et plus:** 10 words.
- **Settings:** Niveau; Carte piège (aucune / une).
- **Keyboard:** Enter lays a tray card, ← → move a rail card, Delete / Backspace take back.

## Deviations from the design (each measured or ruled)
- **lac and boulanger are out (native review):**
  - The only lake picture is a mountain landscape (children say «montagne»), and the baker wears a chef's toque («cuisinier»).
  - **lit** and **escargot** are in, both checked on a contact sheet.
  - The other 26 legacy words are kept.
  - **ours** uses `camping/bear` (the forest bear reads as a teddy); **ballon** uses the football.
- **Decoys that SOUND like an answer syllable were replaced:** tortue «tu» → «tour»; voiture «tue» → «ti»; ange «am» → «la»; ambulance «an» → «bal». The others changed with the dropped words: chat «lac» → «chien», chocolat «lac» → «lu», ours «bou» → «pom», livre «bre» → «ti».
- **Two-syllable trays are at chance, not a derangement:** two cards always swapped is a tell. Three or more are a derangement.
- **The symmetric-picture rule is not needed:** every misplaced strip is fogged, so a symmetric picture (sun, moon, apple) still shows the miss.
- **Free re-developing after success is reduced to the album:** a tapped album photo shows full size again. The rail is locked once the photo is whole.
- **The success line counts CARDS** («avec 3 cartes»), not syllables: a GS child claps banane as 2.
- **The speaker never voices a grey e:** it reads the whole word, and a lone or non-final mute-e card drops its e.
- **Layout:**
  - On phones the album is a column beside the photo, Développer gets its own row with the hint under it, and the picture is 160 px (132 under 340).
  - On wide screens the hint and Développer sit beside the photo.

## Gates
- **`verify-photo-syllables-core.js`: 659 checks, 0 failures.** It carries its own oracle: the 28 words, splits, pictures, level tables, decoys and the mute-e rule. It checks:
  - **Data:** splits = `approved-words-fr.json`; the fr labels; colour themes; lac / boulanger never; the old words kept.
  - **Levels:** each level's own shape.
  - **The grey e:** exactly the word-final plain e (never é, never non-final).
  - **Decoys:** each is a real syllable of another word, never one of the round's, and **never sounds like one** (a homophone list: tu/tue, am/an/en, la/lat, li/lit…).
  - **Develop:** EVERY ordered arrangement of every subset of every round's cards develops whole only in word order, with every strip's place, width, sharpness, the gap, the overflow and the kind of miss right.
  - **The tray:** three or more a derangement, two at chance, the decoy's place uniform.
  - **The hand:** lay, move, take back, blanking and help.
  - **The speaker:** never voices a grey e.
  - **Also:** the hints, the order rule, the strings (en + fr, reached, no price word, fr narrow no-break space before : ! ? ;) and the frozen manifest.
- **`mutate-photo-syllables.js`: 23 of 23 mutations killed**, including the tu and am decoys and the mountain lake coming back, a two-card tray always swapped, and a strip width taken from the round's word.
- **`local-test-photo-syllables.js`: 2,118 checks, 0 failures.**
  - **At 704, a real pointer** through every round: an empty rail asks, the decoy tapped in, the foreign strip and the tilted card, the decoy dragged off, a wrong order, the miss-2 ghost and lines, the cards taken back, the first card dragged on, whole, album, celebrate.
  - **Plus:** a missing card, insertion between cards, the keyboard, Carte piège aucune and the album peek.
  - **The sweep 320–1366** at rest, miss 2 and whole.
  - It caught the album column collapsing to 12 px in the miss state at 320 (the hint widened the `auto` grid column).
- **Other gates:**
  - `visual-qa-activity.js --locale=fr`: 54 renders pass;
  - `audit-activity-hierarchy.js`: 164 / 0;
  - `audit-settings-efficacy.js`: 2 live;
  - prose claims, SERP copy, content tells, answer rank, route preflight, font shorthand ×2 and `verify-activity-content-fr` are green.

## Review (one agent, French native + GS/CP pedagogy): applied
- **Required:**
  - the four homophone decoys;
  - lac and boulanger out (picture names);
  - okWord counts cards;
  - the speaker never voices a grey e;
  - two false prose sentences («sans message», «à la deuxième tentative»);
  - straight apostrophes → ’;
  - the mute-e wording «s’écrit, mais on ne l’entend pas» in the task line, the success line and the prose.
- **Optional, applied:**
  - «Une ou deux syllabes»;
  - «photo» throughout (hintOrder, howToPlay);
  - livre's «bre» decoy (li·bre = «libre») → «ti»;
  - «Ni minuteur ni score»;
  - EN "Hear the cards" and "The photo's pieces".
- **Kept:** tournesol, which some children call «fleur»; a sunflower is distinctive.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The title** «… former des mots en syllabes en ligne» has a clumsy double «en».
- **«GS»:** the title and the intro both say it, but Levels 2–3 read written syllables (CP territory).
- **The intro:** «écouter chaque syllabe» undersells the reading. «sans inscription» needs checking against the tier truth.

## Deploy (2026-10-20)
- **Commit 8bc33fef.** deploy.sh returned EXIT 0, with 0 payment-canary failures. The preview webp was copied to the server before the build.
- **Production play: 18 / 18** (fr at 1366 and 390).
  - Lapin: an empty rail asks; pin + la → mixed up, both strips fogged; la + pin → whole, and lapin goes into the album.
  - Papillon: the decoy develops a foreign strip; the right order → whole.
  - The wrapper version matches, and the iframe grows with the card.
  - The first live run failed its first three steps at 1366: the click landed before the freshly deployed page settled. A hand check and the immediate re-run were both clean.
- **The live phone shot (390)** is clean.
- **Live variety probe (fr):** 9 distinct rounds, and pass 2 is reshuffled.
- **Server disk after the deploy:** 134 GB available of 436 GB (68 % used).
