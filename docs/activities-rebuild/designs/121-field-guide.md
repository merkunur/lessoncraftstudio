# Row 121 — Detective Dewey's Field Guide → THE BOOK THAT ONLY OPENS WHERE YOU SEND IT (1.RI.5)

## 0. Identity
- **id** `field-guide.text-features.1-ri-5` (KEPT; slug, page title and intro frozen for en de fr es pt it nl; sv da no fi get new slug/title/intro at build, grade 1) · CCSS 1.RI.5 ("know and use various text features — headings, tables of contents, glossaries, electronic menus, icons — to locate key facts or information") · strand Reading: Informational Text · own files `field-guide-core.js` (rewritten), `field-guide-activity.js` (rewritten), html, `field-guide-activities.json` (rounds kept and extended).
- **Worksheets covered:** none mapped.
- **Old activity:** a list of three feature entries (contents lines, headings, glossary words, icon-menu buttons, index lines, or captions under a hand-drawn wordless creature), tap the one that answers. **Kept:** every one of the 14 EN rounds and their de/fr/es/pt/it/nl sets — the fictional creatures (the Gribbet, the Wuzzle, the Nim) and their made-up parts (snood, frell, tarn · blorp, gleen, fid · quib, sten, vorl — *sten* and *tarn* are renamed **plib** and **mipp**, §9 trap 1), page numbers, glosses, the two "which tool" rounds and the two menu rounds; the es/pt rule that drops the back-of-book index; the "no feature-text TTS" rule (reading the feature IS the skill). **Kept, and why it matters:** the creatures are invented, so no child can answer from what they already know — only the book's tools can find it. **Gone:** the hand-drawn creature (diagram rounds now use real library animals with labelled parts — §6 Level C), and the flat list (the answer was a tap on a line; now the line *sends the book* somewhere).

## 1. The pitch
"Dewey's field guide is closed and you can't flip through it — the only way in is to use its tools: tap a line in the contents and the book riffles straight to that page; tap a heading and only that section unfolds; tap a bold word and the book flips to its glossary — send it to the wrong place and you can see at once it's the wrong page."

## 2. Why a child will want it again
- **A thick book that moves.** A chunky field guide (drawn geometry: a cloth cover with Dewey's magnifier emblem, gilt page edges, coloured tabs sticking out — *Contents* at the front, *Words to Know* and *Index* at the back). When sent to a page it riffles: the pages fan past in a 520 ms flutter with a papery "frrrt" and land open, page number at the corner.
- **The page number is a brass tag.** Tapping a contents or index line pops its page number off the line as a little brass tag that flies to the book's page dial on the spine; the dial clicks round to it and the book riffles there. Children love sending the book to "page 9".
- **Folded sections.** On heading pages, each section's text is folded up behind its heading like a paper flap; a tap unfolds just that one (300 ms paper unfold).
- **Dewey's case card fills.** When the right sentence is reached, the child taps it and it slides up into Dewey's case card ("FOUND IT" stamp with the magnifier emblem). At the end of a pass the card stack fans out: the child's solved case file.
- **Free play:** between rounds the closed book's tabs can be tapped to peek at its contents page or glossary (no question, just browsing); the dial spins.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (1.RI.5):** use a book's text features — table of contents, headings, glossary, index, labels/captions on a picture, and electronic menus/icons — to *locate* a fact, and know which feature to use for which job.
- **Misconception 1 — flipping/scanning the whole book or guessing.** There is no page-turn button: the closed book cannot be flipped. The only way to reach a page is through a feature. (The fictional creatures make guessing from knowledge impossible.)
- **Misconception 2 — any feature line will do / matching a word without reading its meaning.** The question asks by *function* ("Which chapter is about how it can glow?") while the contents line says "Chapter 2: Frells — all about glowing"; matching "glow" requires reading the line's description, not the chapter name. Sending the book to the wrong page shows the wrong heading ("Snoods — all about swimming") — the mismatch is visible on the page.
- **Misconception 3 — not knowing which tool does which job.** In "which tool" rounds the child opens a tab; opening Index to find a meaning shows a list of page numbers, not meanings — visibly the wrong kind of page.
- **The material pushes back** by being a book: the wrong line opens the wrong page; nothing says "wrong".

## 4. The stage
`layout:'split'` at ≥ 700 px: the book left (430 px), Dewey's case card + bubble right (230 px); stacked below.

**At 704 px:**
- **Dewey's case card** (right column top, 220 × 150): Dewey = library `occupations/detective`, 96 × 96 px, at the card's top-left; the question in 20 px beside/below ("Which chapter is about how the Gribbet can glow?"); an empty "found" slot under it (dashed line).
- **The book** (left): closed 400 × 300 px; open spread 430 × 320 (two pages 210 × 300 each, gutter shadow). Tabs (44 px tall, 72 px wide) stick out of the right edge: *Contents* (teal, top), *Words to Know* (coral), *Index* (amber, not in es/pt). Page dial on the spine: a brass wheel showing the current page number (20 px digits).
- **Page text:** 20 px Nunito; contents/index lines 52 px tall (whole line is the tap target); headings 24 px bold on a paper flap 56 px tall.
- **Picture pages (Level C):** one library animal 200 × 200 on the left page; three label tags (rounded rectangles 96 × 44, the part word in 20 px) on leader lines (2 px ink) pointing to measured anchor points on the picture; the captions under each label are folded (one fold line) until the label is tapped.
- **Screen book (menu rounds):** the book sits inside a tablet frame (drawn geometry); a row of four icon buttons 64 × 64 along the bottom (drawn icons: magnifier, speaker, page-turn arrow, house).
- **Task line (EN, 22 px):** "Use the book's tools to find the answer." (the question itself rides on Dewey's card, never in the task line).

**At 360 px:** single column. Case card full width 328 × 120 (Dewey 64 px, question 18 px). The open book shows ONE page at a time (328 × 380): the spread's left page first; a page-corner flip appears only on spreads that continue (a heading spread with 3 sections stacks them on one tall page instead — no flipping needed). Tabs become a row of three chips above the book (each ≥ 44 px tall). Picture pages: picture 180 × 180, labels stacked to the right/below with leader lines. Check is not needed for locating rounds (the found sentence completes the round) — the shell's Next appears at ≈ 620 px; at 320 × 640 ≈ 590.
- No words on the apparatus except the book's own text (which is the content) and tab names (which are the features being taught).

## 5. The hand
- **Contents / Index line tap:** the line highlights (80 ms), its page number pops off as a brass tag (flies 280 ms to the spine dial), the dial clicks round (200 ms), the book riffles (520 ms) and opens at that page. The page shows a heading and two sentences.
- **Tap a sentence on an opened page** → if it holds the fact, it slides into Dewey's card ("FOUND IT" stamp, a soft brass "ting"), the round resolves; if not, the sentence gives a small shrug-wobble (not a miss — reading the wrong sentence on the right page is reading).
- **Back:** a ribbon bookmark at the top of the open book → tap → the book closes back to where the round began (contents, index, heading spread). Unlimited.
- **Heading tap:** the flap unfolds (300 ms), revealing its paragraph; tapping another heading folds the open one away.
- **Bold word tap** (glossary rounds): a bold word in the page text → the book flips to *Words to Know*; tapping a glossary entry slides its definition card out (240 ms).
- **Label tap** (picture pages): the caption under that label unfolds; tapping the caption sentence that answers sends it to the card.
- **Tab tap** ("which tool" rounds): the book opens at that feature with a riffle.
- **Icon tap** (screen book): the button does its job on the screen book in front of you — magnifier opens a search box with a blinking cursor, speaker shows sound waves round the page, arrow turns the page, house goes back to the cover — the question asks which button does a given job.
- **Keyboard:** Tab through tabs/lines/headings/labels/sentences; Enter activates; Escape = back ribbon.
- **Free play:** between rounds, peek through the tabs and spin the dial (it riffles to any page that exists; pages are plain "creature facts" pages, no questions).

## 6. The rounds
A round = Dewey's question + the book opened (or closed) at the round's starting feature. **8 rounds per level, order-only reshuffle per pass.** Every round's answer is ONE line/heading/label/word/tab/icon and ONE sentence.

**The three invented creatures (kept, two names replaced — §9 trap 1):** the **Gribbet** — snood (swim), frell (glow), **mipp** (dig; was *tarn*); the **Wuzzle** — blorp (float), gleen (sting), fid (climb); the **Nim** — quib (jump), **plib** (hide; was *sten*), vorl (spark). ONE spelling per name in all 11 locales except the kept fr/es/it/pt adaptations *snoud* and *gline* (which pass the same check). Every creature has a 3-chapter book section; chapter pages carry a heading and two sentences, e.g. page 9: heading "Frells" · "A frell is a round spot on the Gribbet's back." · "At night the frell glows so the Gribbet can find its way." The SECOND sentence of each page is the fact; the first is a true description that does not answer (so a child must read, not tap the first line).

**Level A — Contents & headings** (contents lines follow chapter order, so their right position is the chapter number; heading flaps are ordered as written)
| # | type | question (EN) | the feature shows | right (position) | the found sentence |
|---|---|---|---|---|---|
| 1 | contents (kept: toc-gribbet-glow) | Which chapter is about how the Gribbet can glow? | Ch 1 Snoods — all about swimming · 4 / Ch 2 Frells — all about glowing · 9 / Ch 3 Mipps — all about digging · 14 | Ch 2 → p. 9 (2) | "At night the frell glows so the Gribbet can find its way." |
| 2 | contents (kept: toc-nim-hide) | Which chapter is about how the Nim can hide? | Ch 1 Quibs — all about jumping · 3 / Ch 2 Plibs — all about hiding · 8 / Ch 3 Vorls — all about sparking · 12 | Ch 2 → p. 8 (2) | "The Nim tucks itself under its plib to hide." |
| 3 | contents (new) | Which chapter is about how the Wuzzle can climb? | Ch 1 Blorps — all about floating · 5 / Ch 2 Gleens — all about stinging · 10 / Ch 3 Fids — all about climbing · 15 | Ch 3 → p. 15 (3) | "The Wuzzle grips branches with its fid to climb." |
| 4 | contents (new) | Which chapter is about how the Gribbet can swim? | the Gribbet contents (as round 1) | Ch 1 → p. 4 (1) | "The Gribbet waves its snood to swim." |
| 5 | heading (kept: heading-gribbet-dig) | Which part tells how the Gribbet can dig? | flaps: Mipp Facts / Snood Facts / Frell Facts | Mipp Facts (1) | "The mipp is a flat paw for digging." |
| 6 | heading (kept: heading-wuzzle-float) | Which part tells how the Wuzzle can float? | flaps: Gleen Facts / Fid Facts / Blorp Facts | Blorp Facts (3) | "The blorp fills with air so the Wuzzle can float." |
| 7 | heading (new) | Which part tells how the Nim can spark? | flaps: Vorl Facts / Plib Facts / Quib Facts | Vorl Facts (1) | "The vorl makes tiny sparks when the Nim is happy." |
| 8 | heading (new) | Which part tells how the Wuzzle can sting? | flaps: Fid Facts / Blorp Facts / Gleen Facts | Gleen Facts (3) | "The gleen is a tiny tip that can sting." |
Right position over Level A: 1 ×3 · 2 ×2 · 3 ×3.

**Level B — Glossary & index** (es/pt: index rounds become glossary rounds). **Both features are alphabetical, as in a real book** (`Intl.Collator(locale)` — the old data listed glossary words in chapter order, which no real glossary does). A real index lists TOPICS, so the index lines are the function words with page numbers ("glowing … 9"), not part names — the old index ("Frell — 9") could only be used by a child who already knew that a frell glows.
| # | type | question (EN) | the feature shows (EN alphabetical) | right (position) |
|---|---|---|---|---|
| 1 | glossary (kept: glossary-gribbet-glow) | Which word means the part that can glow? | Words to Know: Frell — a part that glows / Mipp — a part for digging / Snood — a part for swimming | Frell (1) |
| 2 | glossary (kept: glossary-wuzzle-sting) | Which word means the part that can sting? | Blorp — a part for floating / Fid — a part for climbing / Gleen — a part that stings | Gleen (3) |
| 3 | bold word → glossary (new) | What is a vorl? | page text "The Nim's **vorl** is bright." → tap **vorl** → Plib / Quib / Vorl | Vorl — a part that makes sparks (3) |
| 4 | bold word → glossary (new) | What is a mipp? | "The Gribbet uses its **mipp** in the mud." → Frell / Mipp / Snood | Mipp — a part for digging (2) |
| 5 | glossary (new) | Which word means the part for jumping? | Plib — a part for hiding / Quib — a part for jumping / Vorl — a part that makes sparks | Quib (2) |
| 6 | index (kept: index-gribbet-glow) | Which page tells about glowing? | Index: digging … 14 / glowing … 9 / swimming … 4 | glowing → p. 9 → sentence (2) |
| 7 | index (new) | Which page tells about climbing? | climbing … 15 / floating … 5 / stinging … 10 | climbing → p. 15 (1) |
| 8 | index (new) | Which page tells about hiding? | hiding … 8 / jumping … 3 / sparking … 12 | hiding → p. 8 (1) |
EN right position over Level B: 1 ×3 · 2 ×3 · 3 ×2. Other locales: collation reorders the triples (de *Graben · Leuchten · Schwimmen*, fi *hehkuminen · kaivaminen · uiminen*); the build picks, per round, which creature's glossary/index is shown so that every locale lands ≤ 3 of 8 per position (the gate computes the collated positions; it never reorders a feature out of alphabetical order to balance).

**Level C — Picture labels** (real library animals; captions are true, simple facts)
| # | picture | labels → captions | question (EN) | right |
|---|---|---|---|---|
| 1 | beach/crab | claws — "The claws help it grab food." · legs — "The legs help it walk sideways." · shell — "The shell keeps it safe." | Which part helps a crab grab food? | claws |
| 2 | animals/elephant | trunk — "The trunk helps it drink and smell." · ears — "The big ears flap to keep it cool." · tail — "The tail swishes flies away." | Which part helps an elephant keep cool? | ears |
| 3 | birds-2/pelican | beak — "The big beak scoops up fish." · wings — "The wings help it fly." · feet — "The webbed feet help it swim." | Which part helps a pelican swim? | feet |
| 4 | forest-creatures/snail | shell — "The shell is its home." · feelers — "The feelers help it feel its way." · foot — "The foot helps it slide." | Which part helps a snail slide? | foot |
| 5 | forest-creatures/butterfly | wings — "The wings help it fly." · antennae — "The antennae help it smell." · legs — "The legs help it stand on flowers." | Which part helps a butterfly smell? | antennae |
| 6 | ocean-life/narwhal | tusk — "The tusk is a very long tooth." · tail — "The tail pushes it through the water." · flipper — "The flippers help it turn." | Which part of a narwhal is really a tooth? | tusk (no child knows this; only the caption tells) |
| 7 | ocean-life/octopus | arms — "The arms help it hold things." · eyes — "The eyes help it see in the dark sea." · head — "Its body is inside its big round head." | Which part helps an octopus hold things? | arms |
| 8 | forest-creatures/porcupine | quills — "The sharp quills keep it safe." · nose — "The nose helps it smell food." · feet — "The feet help it climb trees." | Which part keeps a porcupine safe? | quills |
Each picture has a known answer only from the caption in about half the rounds (claws/ears/quills are guessable by knowledge; foot/antennae/tail/feet less so) — honest: Level C teaches *what labels and captions are*; Levels A–B carry the no-prior-knowledge rigour.

**Level D — Which tool?** (all mixed; 8 = 2 kept which-tool + 2 kept menu + 4 drawn from A–C)
| # | question (EN) | the book shows | right |
|---|---|---|---|
| 1 | To find what a WORD means, which part of the book do you open? (kept) | closed book, three tabs | Words to Know |
| 2 | To find which chapter a TOPIC is in, which part do you open? (kept) | closed book | Contents |
| 3 | Which button finds a word in the screen book? (kept menu-search, icons replace the made-up labels) | screen book, 4 icons | magnifier |
| 4 | Which button reads the page out loud? (kept menu-listen) | screen book | speaker |
| 5–8 | one A, one B, two C rounds (shuffled per pass) | | |
es/pt: the Index tab is absent; "which tool" rounds use only Contents / Words to Know (and es names its front contents "Índice" — §9).

**Answer position (written, not left to the build).** Level A 3/2/3 and Level B 3/3/2 (EN, tables above; every locale re-measured on its collated features). Level C: the right label is the top / middle / bottom tag in rounds 1–8 as 1,2,3,1,2,3,1,2 (the builder orders each picture's three labels top-to-bottom accordingly; leader lines may cross). Level D: the 3 tabs are fixed (that is the book), so tab rounds alternate their right tab (Contents, Words to Know); the screen-book icon row is shuffled per round. The gate: no position wins more than 3 of 8 in any level and locale; an "always tap line 2" bot ≤ 3/8; the found sentence is the page's SECOND sentence in every round (a "tap the first sentence" bot finds nothing).

## 7. Check, the misses, the success
Locating is self-checking (the book opens where it is sent), so the shell's Check is replaced by the **found sentence**: a round resolves when the fact sentence reaches Dewey's card.
- **Wrong line / heading / tab / icon** = a miss (counted once per round per wrong feature choice; wrong sentences on the right page are not misses).
- **Miss 1:** the book opens at the wrong page and stays open there for the child to read; Dewey's card's key word (*glow*) gets a dotted underline, and on the opened page the heading's description (*all about swimming*) gets the same dotted underline in a different colour — two words side by side that do not match. Hint: "Look at this page's heading. Is it about {fn}?"
- **Miss 2:** the book closes back to the feature; on the feature, every line's description word is underlined (*swimming · glowing · digging*) and the question's key word *glow* is underlined in the same ink as its match. Hint: "Find the line that says {fn}. Then send the book there."
- A new choice removes the underlines.
- **Success:** the sentence slides into the card, the magnifier emblem stamps "FOUND IT", Dewey's picture gives a small hop, the dial spins back to 0. Bubble: "Found it on page {p}: {sentence}" (heading rounds: "Found it under {heading}: {sentence}"; glossary: "{word} means {gloss}."; which-tool: "Yes — the {tool} is for {job}.").

## 8. Settings
1. **Book tools:** Contents & headings / Glossary & index / Picture labels / Which tool? (mixed) — at rest the book shows the matching feature (contents page, glossary, a picture page, or closed with tabs).
2. **Help:** Underline helps after a miss / Underline helps from the start — "from the start" shows the description words underlined on every feature (for beginning readers); visibly different board.

## 9. Words (EN source)
- title "Detective Dewey's Field Guide" · instruction "Use the book's tools to find the answer." · tabs "Contents" · "Words to Know" · "Index"
- questions (kept templates): qToc "Which chapter is about how the {creature} can {fn}?" · qHeading "Which part tells how the {creature} can {fn}?" · qGlossary "Which word means the part that can {fn}?" · qBold "What is a {word}?" · qIndex "Which page tells about the part that can {fn}?" · qLabel "Which part helps a {animal} {fn}?" · qWhichMeaning "To find what a WORD means, which part of the book do you open?" · qWhichTopic "To find which chapter a TOPIC is in, which part do you open?" · qMenu "Which button {job}?"
- hints: miss1 "Look at this page's heading. Is it about {fn}?" · miss2 "Find the line that says {fn}. Then send the book there." · whichMiss1 "What kind of page did the book open? Is it the right tool?" · iconMiss1 "That button did something else. Which button {job}?"
- success: "Found it on page {p}: {sentence}" · "Found it under {heading}: {sentence}" · "{word} means {gloss}." · "Yes — the {tool} is for {job}."
- aria: line "Chapter {n}: {name}, {desc}, page {p}" · tab "{tab} tab" · dial "page {p}" · flap "{heading}, folded" · label "{part} label".
- **Locale traps.** (1) **Invented names must not be real words in any locale — RULED by the critic (2026-10-17):** *sten* is "stone" in sv/da/no → renamed **plib** in ALL locales (one name, not a per-locale patch, so the creature is the same creature everywhere); *tarn* is an English mountain lake and *le Tarn* a French river and département → renamed **mipp** everywhere. Checked clean in all 11 languages by the critic: plib, mipp, frell, blorp, gleen/gline, quib, vorl, Gribbet, Wuzzle. Left to the native reviewer, each with a ready replacement if refused: *snood/snoud* (a rare English word for a hairnet and a turkey's wattle → *snoof*), *fid* (a rare English tool → *fipp*), *Nim* (sounds like German *nimm* "take!" → *Nib*). The gate holds a per-locale **blocklist of real words** (the reviewer's list + sten, tarn) plus the image-vocabulary words, and fails any invented name that matches (case- and diacritic-folded, plural forms included). (2) **Grammar around the function word:** de nominalised "beim Leuchten" (kept), pt bare infinitive "ajuda ele a se esconder" (kept notes), fi illative/3rd infinitive ("auttaa sitä hehkumaan") — authored per locale. (3) **Feature names:** de "Inhaltsverzeichnis / Wichtige Wörter / Register", fr "Sommaire / Lexique / Index", es "Índice" (= the front contents in Spanish books!) / "Glosario" — no back index in es/pt (kept rule), pt "Sumário / Glossário", it "Indice / Glossario / Indice analitico" (watch the double "Indice"), nl "Inhoud / Woordenlijst / Register", sv "Innehåll / Ordlista / Register", da "Indhold / Ordliste / Stikordsregister", no "Innhold / Ordliste / Register", fi "Sisällys / Sanasto / Hakemisto". (4) **Alphabetical order of the index:** `Intl.Collator(locale)` — sv/fi å ä ö at the end, da/no æ ø å at the end, de ä sorted with a. (5) Page numbers are numerals; "page" word per locale ("Seite", "página", "sivu"). (6) Animal part names per locale come from careful authoring (es-MX "antenas", de "Fühler", fi "tuntosarvet"); the narwhal's "tusk" is a tooth — de "Stoßzahn", fr "défense". (7) Articles before the animal in qLabel ("a crab / un crabe / ein Krebs" — de *Krabbe* vs *Krebs*: use `image-vocabulary.js`).

## 10. Sound off, access, phones
- Legible with the sound off; **no TTS of feature text** (kept rule: reading the feature is the skill); the question on Dewey's card may be read aloud where a voice exists (it is the task, not the feature).
- Keyboard §5; the riffle and unfold animations respect reduced-motion (instant open).
- Taps: lines 52 px, flaps 56, labels 44, tabs 44, icons 64.
- Pictures: Dewey 96 / 64 px; Level C animal 200 / 180 px.
- The round completes on the found sentence; Next appears ≤ 620 px at 360 × 740 and ≤ 590 at 320 × 640 (single-page phone book).

## 11. Distinct from
- **Row 63 Fable's Picture Stories (The Bookmark):** slip a bookmark into a *story* at the page that answers; the book there can be paged through. Here the book is closed and only text features can open it — finding *how to get to* the fact is the task.
- **Row 69 Atlas's Fact Files (highlighter):** answer lives in a short text; here the answer's *location* is found through features.
- **Row 70 Idea Umbrella / 71 Domino Track:** main idea / connections — different skills.
- **New 266 Map Key:** symbols on a map — a different feature family.

## 12. Build plan
- **Core** `FieldGuideCore`: `book(locale)` = creatures → chapters `{num, name, desc, page, heading, sentences[], factIndex}`; `glossary`, `index` (collated); `open(state, featureChoice)` → `{page|section|entry}`; `isRight(round, choice)`; `found(round, sentenceIndex)`; `label(round, part)`; `icon(round, iconId)`; rounds per level; `shuffledOrder` + `nextTask`.
- **The gate's own truth** (`verify-field-guide-core.js`): an independent table of EN answers; for every locale: the right feature line's description contains the question's function word stem (authored per locale as `fnStem`) and no other line's does; the fact sentence on the target page contains it too; index lines are in `Intl.Collator(locale)` order; no invented name equals a word in that locale's `image-vocabulary.js` or a short real-word list; es/pt have no index rounds; position balance ≤ 3/8 per slot; every Level C picture exists and has three measured label anchors inside the picture's non-transparent pixels.
- **Mutations (each killed):** a page-flip control exists · wrong line opens the right page · any sentence on the right page resolves the round · index not alphabetical · es/pt show an Index tab · feature text TTS enabled · the right line always in slot 2 · label anchor outside the picture · invented name collides with a real word (inject *sten* in sv, *tarn* in fr) · glossary or index not alphabetical in its locale · index lists part names instead of topics · the fact is the page's first sentence · same order every pass.
- **Pictures to verify on contact sheets:** occupations/detective (Dewey), beach/crab ✓ seen (claws, legs, shell visible), animals/elephant ✓ seen (a chibi baby: trunk, big ears, tail — NO tusks, so no tusk label), birds-2/pelican ✓ seen (beak, wings, feet visible), forest-creatures/snail ✓ seen (shell, feelers, foot), forest-creatures/butterfly ✓ seen (antennae visible), ocean-life/narwhal ✓ seen (tusk, tail, flippers), ocean-life/octopus ✓ seen, forest-creatures/porcupine ✓ seen (quills, nose, feet). animals/giraffe was rejected: a chibi with a short neck cannot carry "the long neck". Anchors are measured by the builder on the 512 cache image (normalised x,y per part).
- **Risks:** every label must point at a part that is actually drawn — the builder measures each anchor and the gate fails a label anchored on transparent pixels. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — sending a thick book to "page 9" with a brass tag and watching it riffle open is a toy; Dewey's case file fills up.
2. **Teacher on the board?** Yes — it is exactly how text features are taught: you don't flip, you use the contents, the headings, the glossary; and the invented creatures mean nobody can answer from memory.
3. **Parent trust?** Real reading, library pictures, true facts in the picture pages, no scores.
4. **Invention:** a closed field guide that only opens where its own tools send it — the wrong line opens the wrong page, and you can see it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **Invented names made safe in all 11 locales:** *sten* (sv/da/no "stone") → **plib** and *tarn* (en mountain lake; fr river/département *le Tarn*) → **mipp**, in every locale (one creature, one name); the rest checked; *snood*, *fid*, *Nim* go to the native reviewer with ready replacements; the gate gets a per-locale real-word blocklist.
- **Glossary and index made real:** both alphabetical by `Intl.Collator(locale)` (the old glossary was in chapter order), and the index now lists TOPICS ("glowing … 9") — the old index of part names ("Frell — 9") could not be used by a child who did not already know what a frell does, so it tested memory, not the feature.
- **Answer positions written per round** (Level A 3/2/3, Level B 3/3/2, Level C labels 1,2,3,1,2,3,1,2) instead of "rebalanced by the build"; every page's fact is its SECOND sentence so "tap the first line" never works.
- **Level C narwhal question** now asks what only the caption knows ("which part is really a tooth?").
- Distinct from 063 (bookmark in a story you can page through), 069 (highlighter in a short text), 070, 071 confirmed: here the book is closed and only its features open it.
