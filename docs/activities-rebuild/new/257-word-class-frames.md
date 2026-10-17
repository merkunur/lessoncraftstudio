# New 257 — The Test Frames (L.1.1.b)

## 0. Identity
- id `word-class-frames.play.l-1-1-b` · grade 1 · Common Core L.1.1.b (use common, proper and possessive nouns; here: tell nouns from verbs and adjectives — the naming/doing/describing distinction the worksheets sort by) · strand Language · files `mini tools/word-class-frames-core.js`, `word-class-frames-activity.js`, `word-class-frames-activity.html`, `word-class-frames-activities.json` (scaffold `node scripts/new-activity.js --num=257`, then `NEW-RECIPE.md`). New slug/title/intro in all 11 locales at build.
- worksheets it covers: **G1-293** Nouns and Verbs: Two Bins · **G1-300** Nouns and Adjectives: Two Bins · **G2-275** Nouns, Verbs, and Adjectives · **G2-285** Word Classes: Sort Nine Words (picture help on noun chips) · **G2-286** Sort Twelve Words (no pictures) · **G2-287** Sort Fifteen Words. Merged: grade 2 "The Slot Test — Noun, Verb or Adjective?" (its three test slots and the rule "a word that fits two frames is excluded" are this instrument's core).
- (new instrument; nothing to keep from an old activity.)

## 1. The pitch
"Three little sentence machines each have a gap — 'I see a ___.', 'I can ___.', 'The balloon is very ___.' — drop a word in the machine where it makes sense, and when the machines run, each one DOES its sentence: a thing appears on the stand, someone does the action, the balloon changes; a word in the wrong machine jams it."

## 2. Why a child will want it again (the fun)
- **Three machines with windows**, each a sentence strip with a little stage beside it: an empty pedestal (the seeing machine), a performer's spotlight (the doing machine), a balloon on a string (the describing machine). Kids want to see what each one does.
- **The run is a show.** After the child has sorted all the cards, they pull the big lever ("Run the machines!") and the machines play their bins one card at a time, left to right: the dog trots onto the pedestal (library picture pops up on it), the spotlight shows the writing child (activities/writing) for "write", the balloon puffs up huge for "huge" and turns blue for "blue". Each correct card that plays drops a little brass token into a counter-free tray — no number, just a glinting row.
- **A jam is funny, not sad.** A wrong card in a machine makes the strip crumple like paper, the stage stays empty ("I see a jump." — nothing to put on the pedestal), a little puff of steam, and the card pops out and flies back to the shelf.
- **Free play:** "Test a word" — between rounds any card can be dropped into any machine and the machine shows its sentence (just the words; the stage does not act) so children can say the sentences out loud and hear what sounds wrong.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** decide whether a word names a thing (noun), says what someone does (verb) or describes (adjective), by testing it in a frame where only that class makes sense; sort 9–15 words into two or three bins (the six worksheets).
- **Misconception 1 — "if there is a picture of it, it's a noun"** (write is a noun because a picture shows writing). Pushback: in the seeing machine "I see a write." cannot put anything on the pedestal — the stand stays empty and the strip jams; in the doing machine the spotlight plays the writing picture. The picture belongs to the action, not the thing.
- **Misconception 2 — colours and sizes are names of things** (red is a noun). Pushback: "I see a red." jams (a red what?); "The balloon is very red." turns the balloon red.
- **Misconception 3 — any word fits "I can"** (I can ball). Pushback: the spotlight finds no action to play and the strip crumples.
- **The test itself is the lesson:** the machines are the classic grammar test frames (article test, "can" test, "very" test) turned into apparatus; in German the article frame is also the Grundschule "Artikelprobe".

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **Three machines** in a row (or two when the setting uses two classes), each 150 × 300: a drawn cabinet (rounded rectangle, `#146B5E` frame, cream face, 3 px ink, a brass lever knob on top) with, from top to bottom:
  - **the window** (130 × 110): the machine's little stage. Seeing machine: an empty drawn pedestal (a 70 × 20 plinth). Doing machine: a soft spotlight cone (geometry) on an empty floor line. Describing machine: the library **toys/balloon** at **96 px** on a drawn string.
  - **the sentence strip** (140 × 56): the frame sentence in Nunito 18 px with a gap box 64 × 32 — EN "I see a ___." / "I can ___." / "The balloon is very ___."
  - **the bin** (140 × 110): an open drawer where dropped cards stack (up to 8 visible, fanned; card 120 × 36 in the bin).
- **The word shelf** (under the machines, 460 × 90): the round's 10 word cards (120 × 44, Nunito 22 px bold), two rows of five. With "Picture help" on (G2-285), noun cards carry a small drawn camera corner (geometry, 14 px) and **pressing and holding a noun card pops its library picture up above the card at 96 px** (64 px at 360) until the finger lifts — the worksheet's "each noun chip has a picture to help", without ever shrinking a library picture onto a 44 px card. Verb and adjective cards have no corner and pop nothing.
- **The big lever** "Run the machines!" (= Check): a 72 × 120 drawn lever at the right of the shelf, knob 44 px.
- **Task line** above; **bubble** right.

**At 360 px** (stacked): the three machines side by side at 108 × 250 each (window 96 × 80, balloon **64 px**, pedestal 56 px; sentence strip 14 px, two lines allowed: "I see a / ___."); bins 100 × 80 showing a count-free stack (cards fanned 4 visible, the rest as a thicker edge); shelf cards 100 × 44 in a 3-column grid (10 cards → 4 rows; the shelf never scrolls: card font drops to 18 px for long words, min 16 px, measured per locale); the lever becomes a full-width 300 × 52 pull bar under the shelf. Lever bottom ≤ 690 at 360 × 740; at 320 × 640 the shelf is 3 × 4 at 92 × 44 and the bar ≤ 610 (measured with 10 cards; 15-card rounds deal the cards in two waves of 8 and 7 so the shelf never grows past 4 rows).
- In the window, the played noun picture is **96 px** at 704 and **64 px** at 360; the activity picture for a verb 96 px at 704 / 64 px at 360.

Pictures (library, colour, verified in theme JSONs; the critic looked at the activities, around-the-house, kitchen-tools, vehicles and at-the-supermarket contact sheets 2026-10-17): toys/balloon (a single green balloon — hue-rotates to red/blue/yellow/pink; scales cleanly); activities/writing (a man writing at a desk), baking (a cook with a tray), reading (a girl with a book), music/singer (for "sing" — a person singing; the picture belongs to the action); dancing, running, jumping, biking and hiking are NOT used (dance, run, jump, ride and hike are also nouns). Nouns: animals/dog, cat, fox, pig; toys/ball, kite, car, robot, boat; kitchen-tools/cup; around-the-house/bed, chair, lamp; at-the-supermarket/cake; spring/frog; accessories/hat, sock; classroom/desk; vehicles/bus.

## 5. The hand
- **Drag a card from the shelf into a machine's gap** (or tap a card, then tap a machine): the card slides into the gap (120 ms) and the sentence reads complete on the strip ("I see a dog.") for 900 ms — the child reads it — then the card drops down into that machine's bin with a drawer *clunk*. The stage does NOT act yet.
- **Change your mind:** drag a card out of a bin back to the shelf or into another machine (it passes through that machine's gap and reads there).
- **Test a word** (free play button, also available during a round with no effect on grading): the card sits in the gap and stays readable for as long as the child holds it there; lift it off to return it.
- **Pull the lever** (= Check; enabled when the shelf is empty): the machines run, left to right, one card at a time (550 ms per card): the card rises from the bin into the gap, the strip reads, and the stage acts:
  - seeing machine + noun → the noun's library picture pops onto the pedestal (scale 0→1, 200 ms) then fades for the next; every pool noun has a library picture in this design; if a locale's reviewer adds one without art, the word itself stands on the pedestal in large letters (a "word statue") — never a drawn object;
  - doing machine + verb → the spotlight brightens and the verb's library picture appears in it (write, bake, read → activities/writing, baking, reading; sing → music/singer); other verbs: the spotlight sweeps left-right once (motion) with the word in it;
  - describing machine + adjective → the balloon changes: big grows (×1.4), small shrinks (×0.6), tall stretches up (×1.4 height only), red / blue / yellow / pink hue-rotate the balloon to that colour, other adjectives (soft, happy, sad, funny) make the balloon bob and the word sits on it like a sticker;
  - any wrong card → the strip crumples (skew + jagged clip-path, 250 ms), the stage stays as it is, steam puff (drawn circles), the card pops out and arcs back to the shelf.
- After the run, the remaining bins hold only right cards; wrong cards wait on the shelf for the next try.

## 6. The rounds
One round = 10 cards (9, 12 or 15 in the G2 settings). Every card fits exactly one machine in the page language — the build tests each card against all three frames with the native reviewer, and the gate keeps a per-locale table `{word → class}` plus the reviewer's "fits only this frame" sign-off.

**Classes setting and balance:** two classes (noun/verb — G1-293; noun/adjective — G1-300): 4–6 of each per 10; three classes (G2-275/285/286/287): 3–4 of each per 10 (9 → 3/3/3, 12 → 4/4/4, 15 → 5/5/5).

**EN card pools (single-class only; words that are also another class are excluded — no run, jump, dance, swim, walk, play, brush, kick, hop, clap, cry, sleep, drink, light, fly, watch, ride, hike, draw, climb):**
- nouns (consonant-initial, so "a ___" never needs "an"; countable, so "a ___" is always grammatical): dog, cat, fox, pig, ball, kite, car, robot, boat, bus, cup, bed, chair, lamp, cake, frog, hat, sock, desk (19). **Cut by the critic:** owl (needs "an"), bread ("a bread" is not English), train, book and pot (all three are also verbs — "I can train / book / pot"), duck (a verb too).
- verbs: write, bake, read, sing, eat, see, sit, give, tell, come, make (11; find is cut — "a lucky find" is a noun; ride, hike, go, laugh, think and take are out — "a ride", "a hike", "have a go", "a laugh", "a think", "a take" are nouns).
- adjectives: big, small, tall, red, blue, yellow, pink, soft, happy, sad, funny (11). **Cut by the critic:** tiny and huge ("very huge", "very tiny" are not grammatical — extreme adjectives refuse "very", so the frame would reject a right word), green (the balloon is already green: "very green" would change nothing on the stage), cold (also a noun — "a cold"), wet (also a verb), slow (also a verb — "slow down"), fast (verb and noun).
Colours: "I see a red." fails (✓ intended); "The balloon is very red." works. Colours as nouns ("Red is my favourite") never appear in a frame.

**Round sets (EN), two classes noun/verb, 8 rounds of 10** (the dealer draws from the pools with the balance and never repeats a card within a pass); **noun/adjective, 8 rounds**; **all three, 8 rounds**. Example round (all three): dog · write · big · cup · bake · red · lamp · read · soft · sing → nouns dog, cup, lamp · verbs write, bake, read, sing · adjectives big, red, soft.

**Answer position:** the shelf order is shuffled per render; the gate measures the bots "fill machines left to right in shelf order", "all cards with a picture go to the seeing machine" (with Picture help on, this one is true BY DESIGN for nouns — the worksheet's own help; the gate allows it only with help on and requires picture help to be off by default in G2 three-class rounds), "short words are verbs" — each must score ≤ 60 % cards right on average (chance for three bins ≈ 33 %).
**Order:** order-only reshuffle of rounds per pass; cards re-dealt per round.

## 7. Check, the misses, the success
- **Lever with cards left on the shelf:** hint, no miss — the shelf glows: "Put every word into a machine first."
- **Miss 1** — the run is the showing: right cards play their machines, wrong cards jam and fly back to the shelf. Hint: "{n} words jammed a machine and came back. Try each one in another machine and read the sentence."
  (one card: "One word jammed a machine and came back. Try it in another machine and read the sentence.")
- **Miss 2** — the stronger showing: each returned card, when picked up, makes the machine where it belongs light its window softly (the pedestal / spotlight / balloon glows) while the child holds it over the machines — the right machine "wakes up". Hint: "Hold the word over the machines. The one that wakes up is its machine."
- **A new move takes the help away** until the next run.
- **Success:** the last bin plays, all three windows glow in turn (seeing → doing → describing), the balloon floats up off its string and drifts out of the top of the window; bubble: "Naming words: dog, cup, lamp. Doing words: write, bake, read, sing. Describing words: big, red, soft." (the round's own words; list rule of the locale; class names are the school terms per locale — §9).

## 8. Settings
1. **Machines:** noun + verb (G1-293) · noun + adjective (G1-300) · all three (default; G2-275). Visible at rest: two or three machines.
2. **Words:** 10 with picture help on nouns (G2-285 style, default for two machines) · 10 · 12 · 15, no pictures (G2-286/287). Visible at rest: the shelf size and the pictures on noun cards.

## 9. Words (EN source)
- title: "The Word Machines".
- instruction: "Drop each word into the machine where its sentence makes sense. Then run the machines!"
- task line: "Which machine does each word belong in?"
- frame sentences: "I see a ___." · "I can ___." · "The balloon is very ___."
- class names (bins' small labels under each machine — content words the worksheets teach): "naming word (noun)" · "doing word (verb)" · "describing word (adjective)".
- hints/celebrations: §7. Labels: "Run the machines!", "Test a word", settings names.
- aria: "Seeing machine: I see a ___", "Doing machine: I can ___", "Describing machine: The balloon is very ___", "{word} is in the {machine} bin", "{word} jammed the {machine}".

**Locale traps (every frame and every card is authored and signed off per locale; nothing is generated):**
- **Seeing machine needs the article to agree** in gendered locales — the frame's article word is part of the frame and is shown in the gender of the noun when a NOUN is dropped (from `image-vocabulary.js` gender: de einen/eine/ein — accusative after "Ich sehe"; fr un/une; es un/una; pt um/uma; it un/una (nouns needing "uno" are left out of the pool); sv en/ett; da en/et; no en/ei/et; nl "een" for all). For a verb or adjective the article shows its plain neutral form (de ein, fr/es/it un, pt um, sv/da/no en) — "Ich sehe ein schreiben." reads wrong because it IS wrong. (This is text inside the frame, not a movable cap — row 217's Article Caps owns caps.) **Romance and Scandinavian trap:** an adjective after an article can be a noun there (fr "un petit", es "un pequeño", it "un piccolo" = a small one; sv "en liten") — the reviewer drops from that locale's pool every adjective a grade-1 ear would accept after the article, and keeps only colours/feelings that stay ungrammatical there; the gate records the dropped words.
- **German capitalisation:** de nouns are capitalised on their cards — a visible cue the de native panel accepts as part of the skill ("Nomen schreibt man groß"); in de the real challenge is verb vs adjective, and de rounds weight those two (noun share at the low end of the balance). The de frames: "Ich sehe ___." (with the article), "Ich kann ___." (infinitive cards: schreiben, backen, lesen — de infinitives double as nouns only when capitalised, "das Lesen", so lower-case verb cards are single-class), "Der Ballon ist sehr ___." (adjective base forms: groß, klein, rot).
- **The "very" frame is chosen on purpose** so article-less languages stay safe: fi "Ilmapallo on hyvin ___." rejects a noun ("hyvin kissa" ✗), where "Ilmapallo on ___." would accept one ("Ilmapallo on kissa" = "the balloon is a cat"). Every locale uses its degree word (sehr, très, muy, muito, molto, heel, mycket, meget, veldig, hyvin).
- **fi frames — SETTLED (critic):** seeing frame **"Tässä on ___."** (here is — a noun in its nominative base form: "Tässä on koira."); doing frame **"Osaan ___."** with -a/-ä infinitives (osaan kirjoittaa, leipoa, lukea, laulaa); describing frame **"Ilmapallo on hyvin ___."**. "Katso, ___!" was rejected because "Katso, iso!" is a natural exclamation (an adjective would fit), and "Näen ___." because it needs the partitive/accusative. Finnish adjectives can be used as nouns in speech ("tässä on iso" ≈ here's a big one), so the fi adjective pool keeps only colours and feelings that sound wrong after "Tässä on" to a grade-1 ear (punainen, sininen, keltainen, iloinen, surullinen, hauska — the native reviewer signs each) and drops size words (iso, pieni, pitkä) from the seeing-vs-describing contrast — sizes still appear in noun/verb rounds where only "Osaan" competes.
- **Zero-derivation (en, nl, sv, da, no):** many words are both noun and verb (a run / to run; sv "en dans / dansa" are different forms, good). The per-locale pool excludes every word that fits two frames; the reviewer reads every card in all three frames.
- **Adjective agreement:** the balloon noun in each locale's describing frame is chosen so the BASE form of the adjective agrees: masculine/common balloon in fr (le ballon), es (el globo), pt (o balão), it (il palloncino), sv (ballongen), da (ballonen), no (ballongen), de (der Ballon); nl and en have no agreement problem; fi adjectives base form.
- **Class names** per locale are the school terms (de Namenwort/Nomen, Tunwort/Verb, Wiewort/Adjektiv; fr nom, verbe, adjectif; sv substantiv, verb, adjektiv; fi substantiivi/nimisana, verbi/teonsana, adjektiivi/laatusana; …) — the reviewer picks the grade-1 term.

## 10. Sound off, access, phones
- Silent legibility: the sentence on the strip, the stage acting, the jam — all visible. TTS reads frame sentences as a bonus ("I see a write." spoken is extra-funny).
- Keyboard: Tab to a shelf card, Enter picks it up, 1/2/3 or arrows choose a machine, Enter drops; Enter on the lever runs.
- aria-live narrates the run: "Seeing machine: I see a dog — the dog is on the stand." / "I can red — jammed."
- Taps ≥ 44 px (cards 100 × 44+, machine gaps and bins as drop targets ≥ 96 px, lever bar 52 px tall).
- Pictures 88–96 px at 704, 64 px at 360.
- Phone: three narrow machines side by side; the shelf deals 15-card rounds in two waves.

## 11. Distinct from
- **New 217 The Article Caps** — caps on words for a/an (L.1.1.h); here frames test the word's class; the article inside the seeing frame is fixed text that follows gender, not a cap the child places.
- **Glim's Describing Words** (adjective vs adverb, grade 2) — a different distinction.
- **Row 75 The Ending That Arrives With the Second Plate** — plural morphology; here word class by syntax.
- **Sorting Hoops (premium tool)** — attribute Venn; no sentences.
- Not a reused invention: no registered design uses sentence frames that perform their sentence.

## 12. Build plan
- **Data:** `word-class-frames-rounds.json` per locale: `frames:{noun:{text, articleByGender?}, verb:{text}, adj:{text, balloonLabel}}`, `pool:[{word, cls, pic?:{theme,noun}, gender?, effect?:'grow'|'shrink'|'hue:<deg>'|'sticker'}]`, `classNames`, `banned:[words that fit two frames — kept as a record]`.
- **Core state** `{setting, round, cards:[{word, cls}], bins:{noun:[],verb:[],adj:[]}, shelf:[], ran:null|[{word, machine, ok}], misses}`; functions `deal(setting, pool)` (balance + no repeats per pass), `drop(word, machine)`, `lift(word)`, `run()` → per card `{ok, effect}`, `frameText(machine, word)` (article from gender for nouns, neutral blank otherwise).
- **Gate's own ground truth** (`verify-word-class-frames-core.js`): its own class table per locale (written in the gate); every dealt card has exactly one class and that class's machine exists in the setting; balance per setting; `run()` ok iff machine == class; no pool word appears in `banned`; noun cards in gendered locales have a gender in vocab; frameText never builds an article for a non-noun; adjective effects map to real transforms; picture help only on nouns; bots ≤ 60 %.
- **Mutations:** a two-class word dealt (run) · run() accepts a noun in the doing machine · picture help on a verb card · article chosen for a verb · balance broken (8 nouns in 10) · fi seeing frame swapped to "Näen ___" with base forms · describing frame without "very" (fi noun would fit) · deal repeats a card in a pass · wrong card stays in the bin after the run.
- **Pictures to verify on contact sheets:** toys/balloon (seen), activities/writing, baking, reading (seen 2026-10-17: writing = a man at a desk writing, baking = a cook with a tray, reading = a girl with a book — each shows the action), nouns from animals, toys (seen), kitchen-tools (seen), around-the-house, at-the-supermarket (seen), spring, accessories, classroom.
- **Risks:** a native reviewer may cut the en verb pool (11) further for zero-derivation — the three-class 15-card setting needs 5 verbs, so the pool must keep ≥ 6; below that the 15-card setting deals 4 verbs and adds nouns/adjectives within the 25–40 % band. Hue-rotate on the green balloon must land on recognisable red/blue/yellow/pink (tuned on the picture at build and asserted by sampling the rendered centre pixel's hue).
- **Blocked:** none. (Verbs without an activities picture use the spotlight sweep with the word — honest, no drawn person.)

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — three machines that DO their sentences, a big lever and funny jams make sorting words a show.
2. **Would a teacher put it on the board?** Yes — the frames are exactly how teachers test word classes ("can you say 'I see a …'?"), the picture-is-not-a-noun and colour-is-not-a-noun errors are shown by the machines, and the two- and three-bin worksheets are settings.
3. **Would a parent trust it?** Yes — library pictures, no scores, frames correct in the family's own language (articles, cases, agreement handled by native authoring, never generated).
4. **The invention:** three sentence machines with a gap each — a word in the right machine makes it perform its sentence; a word in the wrong one jams it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- The EN pools carried words that break the frames or fit two classes: owl ("a owl"), bread ("a bread"), train/book/pot/duck (also verbs), find (also a noun), cold/wet/slow/fast (two classes), and tiny/huge, which the "very" frame REJECTS ("very huge" is ungrammatical) — so a right card would have jammed. All cut, with the reason recorded; green is cut because the green balloon cannot visibly turn green. The success line no longer lists "ride", a banned word.
- Sizes: the balloon and the played noun pictures are 96 px at 704 (were 88); picture help no longer shrinks library pictures to 40 px on a card — a hold-to-peek pops the noun's picture up at 96 / 64 px.
- The Finnish frame choice is SETTLED ("Tässä on ___." / "Osaan ___." / "Ilmapallo on hyvin ___.") with the reason "Katso, ___!" lost, and the elliptic-adjective trap handled by the pool. The same nominalised-adjective trap is named for fr/es/it/sv, and the non-noun article is a plain neutral form instead of an underscore.
- "sing" gets a real picture (music/singer). The machines (sentence frames that perform their sentence and jam on a wrong word) are kept as the invention — they are the teacher's own test frames, made physical.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
