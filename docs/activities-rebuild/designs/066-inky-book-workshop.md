# Row 66 — Inky's Book Workshop → THE TWO INKS (RL.K.6)

## 0. Identity
- id `inky-book-workshop.author-illustrator.rl-k-6` (KEPT; slugs/metadata frozen en..nl; sv/da/no/fi slug, title, intro new) · grade K · Common Core RL.K.6 · strand Reading: Literature · own files `inky-workshop-core.js`, `inky-workshop-activity.js`, `inky-workshop-activity.html`; manifest row stays in `inky-book-workshop-activities.json` (same id, new params). `author-illustrator-core.js` untouched.
- worksheets covered: none mapped (RL.K.6 only).
- old activity: a sentence described a job ("Inky drew a picture book about a sleepy dragon") and the child tapped one of three emoji cards — Author ✍️ / Illustrator 🎨 / Reader 📖. **Kept:** the eight book ideas (brave little tugboat, sleepy dragon, lost balloon, bedtime moon, funny farm animals, singing whale, rainbow garden, kite that flew away) and all their localized wording; the formal labels per locale (es *Autor / Ilustrador / Lector*, it *Autore / Illustratore / Lettore*, nl *Schrijver*, … — the §A.13.61 naming-standard ruling stays); the three roles. **Gone:** emoji, the read-a-sentence-then-tap-a-card quiz.

## 1. The pitch
"Each person in the workshop can only make their own kind of mark — so if you hand a page with a missing picture to the author, he fills the picture box with words."

## 2. Why a child will want it again
- A real little factory: Inky (the library octopus) feeds pages out of a press; the child carries each page to the person whose ink it needs and watches them work — words typing themselves onto the lines, a picture blooming out of a brush-sweep, a reader opening the finished page and smiling.
- The wrong delivery is *funny*, not shaming: the author dutifully writes tiny words all over the picture box; the illustrator squeezes a little picture onto the word lines. Then the ink drips off and the page floats back. Children try it on purpose — and in doing so say out loud "no, he only does WORDS".
- Each book is built page by page; the earned show at the end of a book is **the cover**: the child drags the two portraits into the credit slots, the cover stamps itself, and the finished book flips through all its pages like a flip-book in front of Inky.
- Free play: between rounds the child can drop a finished book on any station: the author underlines his words, the illustrator outlines her picture, the reader reads it again.

## 3. The skill and the misconception
- **Skill:** RL.K.6 — name the author and illustrator of a story and define the role of each in telling the story (the author writes the words, the illustrator draws the pictures; the reader enjoys both).
- **Misconception 1 — "the author made the whole book" / "the author draws the pictures too".** **Pushback:** the author's ink is words only. Hand him a page whose picture is missing and he really does write — lines of small letters appear inside the empty picture frame — and the page is visibly still without a picture. The material shows that a different person is needed.
- **Misconception 2 — "the illustrator writes the story" / "pictures are not part of telling the story".** **Pushback:** the illustrator's ink is pictures only; her mark on blank word lines is a little squashed picture where the sentence should be — the page cannot be read. And on a finished page the reader shows that the story is told by BOTH: the reader's narration reads the words while a soft light moves over the picture.
- **Misconception 3 — "the reader made the book".** **Pushback:** the reader has no ink: give her an unfinished page and she opens it, reads up to the gap, and the gap stays blank with a blinking cursor (or an empty frame); she cannot fill it.

## 4. The stage
At **704 px** (split layout: workshop stage left 470 px, bubble/credit column right 214 px):
- **The press** (top-left, 120 × 120): the library `ocean-life/octopus` (Inky, 96 px) standing behind a drawn press (two rollers, a slot).
- **The page** (centre of the stage, 230 × 290): a cream page with a **picture box** (180 × 130, drawn frame) above **three word lines** (180 px each, 30 px apart). One of the two is empty according to the round; the other is filled: the picture box with ONE library picture at 120 px, or the lines with the sentence (Nunito 17 px).
- **The three stations** (bottom of the stage, 3 × 150 × 170): each a drawn desk silhouette (geometry) holding a library picture of the person at work, 120 px — **Author** `activities/writing` (a man writing at a desk), **Illustrator** `occupations/artist` (a child painting at an easel), **Reader** `activities/reading` (a girl reading) — with a name plate under each: "Author", "Illustrator", "Reader" (the formal words are the content of RL.K.6). In the "Jobs: 2" setting the Reader station is absent and the two stations are 2 × 210 wide. Station order rotates per book (§6).
- **Tool marks:** a small drawn mark above each station — three ruled lines for the author, a framed rectangle for the illustrator, an open-book outline for the reader (geometry, no words). Always shown in "Desks: open".
- **Closed desks** (setting "Desks: name plates only"): each station is covered by a drawn door (two warm panels, a round knob) that shows ONLY its name plate — "Author", "Illustrator", "Reader" — enlarged to 18 px; the person and the tool mark are behind the door. A tap on a plate reads the word aloud (TTS where available) and wiggles the door; sound off, the word itself is the content. This is the RL.K.6 step the open desks cannot test: the child has to know what the WORD "author" means, not just match an empty picture box to a person holding a brush. On delivery the door swings open (200 ms) and the person works as in §5.
- **Bubble column** (right): hints and, at the end of a book, **the cover**: a 180 × 230 cover with the book's library picture, and two credit slots, each marked only by an icon — ruled lines (words) and a framed rectangle (pictures).
- **Task line** (≤ 24 px): "Who can finish this page? Bring it to them."
- No words on the apparatus except the page's sentence (content) and the three role names (content).

At **360 px** (stacked): press 72 × 72 top-left beside the task line; page 300 × 230 (picture box 150 × 110, picture 96 px; lines 260 px); stations in one row 3 × 108 × 150 (person pictures 72 px, name plates 13 px, two lines allowed: "Illustra-/tor" hyphenation is NOT allowed — plates use `font-size: clamp(11px, 3.4vw, 14px)` and the longest locale label is tested at 320). Cover appears as an overlay sheet over the page area. Total height: 40 + 236 + 160 + bubble 60 ≈ 500 px — Check above both folds.

## 5. The hand
- **Drag the page** onto a station (or tap a station while a page waits — the page travels there): the page lifts within 50 ms, follows the finger; on drop it slides onto the desk (220 ms).
- **The author works** (page needs words): a caret moves along line 1 and the sentence appears letter by letter (28 ms per letter, soft pencil-tick per word). Wrong page (picture missing): the same letters appear **inside the picture box**, small and cramped, filling it; after 600 ms the letters run down like wet ink (400 ms) and the page slides back to the press tray.
- **The illustrator works** (page needs a picture): a wide brush-stroke mask sweeps left to right across the picture box (700 ms) revealing the library picture; a soft swish. Wrong page (words missing): a little 40 px copy of the book's picture is painted onto the word lines, then drips and the page slides back.
- **The reader** (finished page): the page opens toward her, words underline one by one (TTS where available), a soft light passes over the picture, and a small library `emotions/happy` badge (40 px, decorative) pops beside the reader. Unfinished page: she reads up to the gap — words stop at an empty line with a blinking caret, or the light passes over an empty frame — then the page slides back.
- **A finished page to the author or illustrator**: their tool mark (or, with marks hidden, a small sparkle at their desk) hovers over the page, finds no empty space, wiggles, and the page slides back — "nothing to do here".
- **Cover**: drag each portrait (a 64 px copy of the station picture, peeled from its desk) into a credit slot. Right slot → the portrait drops in with a stamp "thunk" and the slot's icon lights. Wrong slot → the portrait's ink tries its mark there (the artist's portrait paints a smear across the ruled-lines slot / the writer's portrait scribbles letters into the frame slot), then it slides back.
- **Free play:** finished books in the column can be dropped on any station for the station's "show your part" animation (author underlines his words, illustrator traces her picture's frame).

## 6. The rounds
A **book** = 2 pages (Jobs: 2) or 3 pages (Jobs: 3) + a cover round. Each page shows ONE library picture and ONE sentence; the round says which half is missing. Four books per pass (chosen from 8), never the same 4 in the same order twice.

| book (kept idea) | page A | page B | page C (Jobs: 3 only — finished, goes to the Reader) | cover picture |
|---|---|---|---|---|
| K1 a brave little tugboat | toys/boat · "A little boat sailed out." · **picture missing** | weather/stormy · "A big storm came." · **words missing** | beach/lighthouse · "The boat got home safe." | toys/boat |
| K2 a sleepy dragon | things-that-fly/dragon · "Dragon gave a big yawn." · **words missing** | camping/moon · "The moon came up." · **picture missing** | furniture/bed · "Dragon fell asleep." | things-that-fly/dragon |
| K3 a lost balloon | toys/balloon · "The balloon flew away." · **picture missing** | spring/bird · "A bird saw it." · **words missing** | miscellaneous/house · "It landed on a roof." | toys/balloon |
| K4 a bedtime story about the moon | space/moon · "The moon is round and bright." · **words missing** | forest-creatures/owl · "Owl looked up at it." · **picture missing** | christmas/star · "The stars came out too." | space/moon |
| K5 funny farm animals | farm-animals/pig · "The pig rolls in the mud." · **picture missing** | farm-animals/cow · "The cow says moo." · **words missing** | farm-animals/duck · "The duck says quack." | farm-animals/pig |
| K6 a singing whale | animals/whale · "Whale sang a song." · **words missing** | beach/crab · "Crab tapped along." · **picture missing** | ocean-life/dolphin · "Dolphin danced in the waves." | animals/whale |
| K7 a rainbow garden | weather/rainbow · "A rainbow came out." · **picture missing** | spring/tulip · "A red tulip grew." · **words missing** | flowers/sunflower · "The garden was bright." | weather/rainbow |
| K8 a kite that flew away | toys/kite · "The kite went up high." · **words missing** | tree/apple · "It got stuck in a tree." · **picture missing** | animals/giraffe · "Giraffe got it down." | toys/kite |

- Missing half alternates A/B across books so "first page = picture missing" never holds: K1, K3, K5, K7 start with picture missing; K2, K4, K6, K8 with words missing. Over any pass of 4 books: author 4 / illustrator 4 (Jobs: 2) or 4 / 4 / 4 (Jobs: 3).
- **Cover round:** after the last page of each book. One right answer: writer portrait → lines slot, artist portrait → frame slot (the slot positions top/bottom swap per book).
- **Station order:** the stations rotate per book through the 2 (Jobs: 2) or 6 (Jobs: 3) seat orders, so "the left desk" is never the habit answer; the gate measures that the correct station for page A sits in each seat ≤ 40 % per pass.
- The old "band 1/2/3" ordering is replaced by the settings (Jobs: 2 → Jobs: 3).
- **Order:** order-only reshuffle per pass (book order + which 4 books), never repeating the previous pass's sequence.

## 7. Check, the misses, the success
The delivery IS the Check (answerType 'state', the shell Check is hidden for page rounds; the shell's Check confirms the cover after both portraits are placed).
- **Nothing done** (the shell Check pressed with the page still at the press, or the cover empty) → "Bring the page to a person." / "Put the two people on the cover." (no miss).
- **Miss 1:** the wrong person makes their own mark in the wrong place (letters in the picture box / a little picture on the lines / the reader stops at the gap) and the page returns. Hint, chosen by the mistake: "The author writes the words. This page needs a picture." · "The illustrator draws the pictures. This page needs words." · "The reader enjoys the book. Someone has to finish this page first." · "This page is finished. Who enjoys it?"
- **Miss 2:** closed doors swing open for the rest of the round (open desks: the tool marks pulse once), and the empty half of the page pulses in the shape of the missing mark (three dashed lines pulse on the empty lines; a dashed frame pulses on the empty box). Hint: "Look at what is missing: words or a picture?"
- A new delivery clears the showing.
- **Success (page):** the right person finishes the page and it files itself into the book block beside the press (a stack that grows). Bubble: "{Author} wrote the words!" / "{Illustrator} drew the picture!" / "The reader enjoys the story!"
- **Success (cover):** both portraits stamped; the cover closes over the stack, the book flips through its pages once (200 ms per page) and Inky raises one arm (the octopus picture rocks 8°). Bubble: "The author wrote the words. The illustrator drew the pictures. Now it's a book!"

## 8. Settings
1. **Jobs:** Author and illustrator · Author, illustrator and reader (default the first). At rest: two or three stations.
2. **Desks:** Open — see each person at work · Name plates only (default open; the K teacher moves to name plates once the class knows the jobs). At rest: the three people with their tool marks, or three closed doors carrying only the words Author / Illustrator / Reader.

## 9. Words (EN source)
- title (frozen): Inky's Book Workshop — Author or Illustrator? (Kindergarten)
- instruction: "Inky prints the pages. Bring each page to the person who can finish it."
- task line: "Who can finish this page? Bring it to them."
- role names: "Author" · "Illustrator" · "Reader"
- sentences: the 24 page sentences in §6.
- hints: "Bring the page to a person." · "Put the two people on the cover." · "The author writes the words. This page needs a picture." · "The illustrator draws the pictures. This page needs words." · "The reader enjoys the book. Someone has to finish this page first." · "This page is finished. Who enjoys it?" · "Look at what is missing: words or a picture?"
- celebrations: "The author wrote the words!" · "The illustrator drew the picture!" · "The reader enjoys the story!" · "The author wrote the words. The illustrator drew the pictures. Now it's a book!"
- settings: "Jobs" — "Author and illustrator" / "Author, illustrator and reader" · "Desks" — "Open" / "Name plates only"
- **Locale traps:**
  - Role names are the FORMAL book-cover words (kept): de *Autor / Illustrator / Leser*, fr *Auteur / Illustrateur / Lecteur*, es-MX *Autor / Ilustrador / Lector*, pt *Autor / Ilustrador / Leitor*, it *Autore / Illustratore / Lettore*, nl *Schrijver / Illustrator / Lezer*, sv *Författare / Illustratör / Läsare*, da *Forfatter / Illustrator / Læser*, no *Forfatter / Illustratør / Leser*, fi *Kirjailija / Kuvittaja / Lukija*. Generic masculine on the plate (old ruling) — the pictures show a man (author), a child (illustrator), a girl (reader); the celebration sentences must not assign a pronoun that contradicts the picture: they use the role noun, never "he/she".
  - Gender agreement in de/fr/es/pt/it celebration verbs/participles ("L'auteur a écrit…", fine; "La lectrice" would contradict the plate) — authored per locale, the plate noun is reused verbatim.
  - The 24 sentences reuse the old localized book wording where it exists (roundsL10n) and are authored for sv/da/no/fi; "says moo / quack" uses each locale's animal sound (de *muh / quak*, fr *meuh / coin-coin*, es *mu / cuac*, fi *ammuu / kvaak*).
  - Name plates must fit 108 px at 360: fi *Kuvittaja* and sv *Illustratör* are the longest — tested.

## 10. Sound off, access, phones
- Sound off: every outcome is visible (where the ink lands, the dripping, the gap with a blinking caret). TTS reads the sentence on the Reader station only (bonus).
- Keyboard: the page has focus; 1/2/3 or arrows choose a station, Enter delivers. Cover: Tab to a portrait, Space, arrows to a slot, Space.
- aria: page label "Page: picture of a {noun}, no words yet" / "Page: '{sentence}', no picture yet" / "Finished page"; stations "Author, writes the words" etc.; live region narrates the result ("The author wrote words in the picture box. This page needs a picture.").
- Taps ≥ 44 px (stations ≥ 108 × 150). Pictures: station people 120 / 72 px, page picture 120 / 96 px.
- Phone layout §4; Check above both folds.

## 11. Distinct from
- Old RL.K.6 quiz (cards) — replaced. **#84 author's purpose** and other "who did it" choice boards: those classify; here the child *routes work* and sees each maker's mark land.
- **#219 Body Map** (labels on pins with lenses), **#225 Sorting Cabinet**: unrelated mechanics.
- Batch siblings: #65 orders pages of a book, #67 checks a sentence against a picture with pins, #68 compares two tales on a zipper. #66 alone is about who makes which part of a book.

## 12. Build plan
- **Model:** `{book, pageIdx, page:{picture, sentence, missing:'words'|'picture'|'none'}, stations:[role…], phase:'page'|'cover', cover:{lines:null|role, frame:null|role}, miss}`; `deliver(role)` → `{ok, mark:'words'|'picture'|'read', landed:'lines'|'box'|'gap'|'none'}`; `canFill(role, missing)` = author↔words, illustrator↔picture, reader↔none; `placePortrait(role, slot)`; `nextRound()`.
- **Gate (own oracle):** every page has exactly one missing half (or none for C pages); author/illustrator counts balanced 4/4 per pass; correct station per seat ≤ 40 %; every picture labelled in its theme JSON, no BW; every sentence present in 11 locales; plates fit 108 px at 320 for all locales (measured in local-test).
- **Mutations:** a closed door that shows the person before delivery; author accepted for a picture-missing page; reader accepted for an unfinished page; stations never rotate; page A always picture-missing; cover accepts swapped portraits; the wrong mark lands in the right place (letters on the lines when the box was empty).
- **Pictures to verify:** ocean-life/octopus, activities/writing, occupations/artist, activities/reading, emotions/happy, toys/{boat, balloon, kite}, weather/{stormy, rainbow}, beach/{lighthouse, crab}, things-that-fly/dragon, camping/moon, furniture/bed, spring/{bird, tulip}, tree/apple, miscellaneous/house, space/moon, forest-creatures/owl, christmas/star, farm-animals/{pig, cow, duck}, animals/{whale, giraffe}, ocean-life/dolphin, flowers/sunflower. Seen on contact sheets (critic): activities/writing = a man writing at a desk, occupations/artist = a child at an easel, activities/reading = a girl reading, toys/balloon green, spring/tulip red, things-that-fly/dragon a friendly orange baby dragon. (occupations/author exists but shows a man READING his book — not used, it would teach the wrong job.)
- **Every page sentence names what its own picture shows** (critic fix: K4-C said "Good night, moon" over a star; K8-B said "the wind blew it away" over a cloud — both rewritten; K3-C moved off the tree so K8 can use it).
- **Risks:** `occupations/artist` paints at an easel (seen) — good; `activities/writing` shows an adult writing (seen). The old title said "red balloon"; the library balloon is green, so the sentence says only "the balloon".
- **Nothing BLOCKED.**

## 13. The four questions
1. **Choose it again?** Yes — a workshop where the wrong delivery makes a funny mess and the right one makes a book with your two makers on the cover.
2. **Teacher on the board?** Yes — "the author's ink only makes words" is exactly the definition RL.K.6 wants, shown not told.
3. **Parent trust?** Library pictures, calm, no score, nothing sold.
4. **The invention:** each maker can only make their own mark — so a page goes to whoever can fill what is missing, and the wrong maker visibly fills the wrong part.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **The word itself is now tested.** With open desks the round can be solved by matching an empty picture box to the person holding a brush — never knowing the word "author". The weak "Tools: shown / after a miss" setting became **Desks: Open / Name plates only**: closed doors show only the words Author / Illustrator / Reader (tap = spoken), so naming the author and illustrator (RL.K.6) is what decides; miss 2 opens the doors.
- **Every page sentence now names what its own picture shows:** K4-C "Good night, moon" sat over a star → "The stars came out too."; K8-B "The wind blew it away" sat over a cloud → the kite stuck in tree/apple, "Giraffe got it down"; K3-C moved off the tree to miscellaneous/house; K7 uses spring/tulip, seen red.
- Pictures checked on the contact sheets (writer, child painter, girl reading, green balloon, friendly dragon); occupations/author refused (it shows a man reading, and has no label).
