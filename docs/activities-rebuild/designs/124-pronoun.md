# Row 124 — The Pronoun Prism (L.1.1.d)

## 0. Identity
- id `pronoun.case.l-1-1-d` (KEPT) · grade 1 · Common Core L.1.1.d (use personal, possessive, and indefinite pronouns) · strand Language · page title (frozen) "The Borrowed Hat — Personal Pronouns (Grade 1)" · own files `mini tools/pronoun-prism-core.js`, `pronoun-prism-activity.js`, `pronoun-prism-activity.html`; the manifest row stays in `pronoun-activities.json` (id, slugs en/de/fr/es/pt/it/nl/sv, title, intro frozen), `tool` repointed (`pronoun-core.js` is left untouched — no shared-core edits). New da/no/fi metadata at build.
- worksheets it covers: **G1-352** Personal Pronouns · **G1-371** Replace the Name with a Pronoun · **G1-372** Sort the Names: He, She or They · **G2-353** Who Is He? Pronouns in Sentences · **G2-354** Possessive Pronouns · **G2-355** Rewrite the Sentence with a Pronoun.
- what the old activity did: Hattie's hat shop; a sentence with a gap; two hat-chips (the right case and the wrong case: *he / him*), tap one. **Kept:** the hat-shop world (the intro's "word-hat for its job" becomes the prism's three faces — the same idea, made physical); every sentence of every locale as the seed of levels 1–2 (en: *___ ran to the den / Pat saw ___ at the park / That is ___ red ball / Sam and ___ built a fort / Mom called Sam and ___ / ___ sang a song / We waved at ___ / The twins lost ___ hats / Grandpa helped ___*; de/fr/es/pt/it/nl/sv lists likewise); the sv focus on *min/mitt/mina* agreement; the compound-subject trap (*Sam and me built…*). **Gone:** the two-chip quiz; the plain text stage.

## 1. The pitch
"Each person is one wooden prism with three faces — the doer (he), the done-to (him) and the owner (his) — and the sentence's own action arrow decides which face must be turned up: an arrow can only fly out of a doer face, only stick in a done-to face, and only an owner face can tie on a string to a thing."

## 2. Why a child will want it again (the fun)
- **A toy in the hand.** Five chunky triangular prisms sit on a felt tray — one per person (he, she, they, I, we). Spin one with a flick and it rolls over face by face with a wooden *tock-tock* (each face a pronoun: *he → him → his*). Children spin them just to hear it.
- **The face icons.** Each face carries its word big and a small corner mark that is pure geometry: a little **bow** (the doer face — things fly OUT of it), a **target** of rings (the done-to face — things land IN it), a **knot** (the owner face — it ties to a thing).
- **The sentence fires.** Drop a prism into the gap and press Check: the sentence's verb draws a bright arrow across the strip. In *Pat saw ___ at the park* the arrow leaves *Pat*, flies over *saw* and thunks into the gap — into the target face of *him* (*thunk*, it quivers). In *___ ran to the den* the arrow has to start at the gap: *he*'s bow face launches it (*twang*) toward *ran*. In *That is ___ red ball* a string runs from *ball* back to the gap and ties onto *his*'s knot face with a little loop.
- **Echo threads.** When a pronoun stands in for a name, a fine thread runs from the pronoun back to the name it stands for. *They* has TWO thread ends — tie one to *Ben* and one to *Mia*. Pull a thread taut and the name it is tied to glows.
- **The shop window.** Each solved round hangs a little paper hat (drawn: a coloured triangle with a band) in the shop window; a pass ends with a full window and a bell.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** a pronoun stands for a noun (G1-371, G2-353, G2-355); it changes form by its job — doer (subject: *he, she, they, I, we*), done-to (object: *him, her, them, me, us*), owner before a thing (*his, her, their, my, our*) and, at level 6, owner on its own (*his, hers, theirs, mine, ours* — G2-354); one person vs more than one, and the person's gender where the language marks it (G1-372).
- **Misconception 1 — the wrong case (*Him ran*, *Pat saw he*).** The arrow cannot fly out of a target face (it fizzles at the gap with a drooping line) and cannot stick in a bow face (it bounces off and falls). The job is decided by where the action comes from and goes to, which the arrow shows.
- **Misconception 2 — the compound trap (*Sam and me built a fort*, *Mom called Sam and I*).** Two prisms (Sam's name block and the I-prism) stand in the doer place together; the arrow has to launch from BOTH — the *me* face is a target and cannot launch, so only Sam's half fires and the arrow wobbles. Cover-the-other-name test made physical: tap Sam's block and it lifts away for a moment — *me built a fort* is left alone on the strip.
- **Misconception 3 — the owner face as an object (*the twins lost them hats*).** Only a knot face can take the string from *hats*; a target face lets it slide off.
- **Misconception 4 — losing track of who the pronoun means (G2-353).** The echo thread makes the link visible; *they* has two ends, so tying it to one name leaves a loose end dangling.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 480 × 440):
- **The name shelf** (top, y 0–70, levels 3–5): name blocks for the people in the round (cream blocks 112 × 52, Baloo 2, 28 px: *Mia*, *Ben and Mia*). Pronoun threads tie here.
- **The sentence strip** (y 90–190): a long paper strip 464 × 100, the sentence in Nunito 30 px (wrapping to two lines max) with **the gap** as a recessed triangular socket 96 × 64 that a prism lies in with one face up. The verb is underlined in ink (2 px): it is where the arrow is born.
- **The arrow layer** (above the strip): drawn at Check (a coral 4 px arc with a fletched tail and a head), or a string (cream 2 px) for owner rounds.
- **The prism tray** (y 230–420): a felt tray 464 × 190 holding the round's prisms (levels 1–2: the one or two persons the round needs plus one other person, never more than 3 prisms): each prism is a triangular block shown in 3/4 view, 120 × 104, with its UP face large (the word 34 px) and the two other faces visible as narrow slanted sides (their words 16 px, readable). Corner marks on each face: bow / target / knot (16 px geometry).
- **The shop window** (right column top at 704, above the bubble): six hat slots; solved hats fill them.
- No library pictures: a pronoun's referent is a word (a name) in these sentences, and G1-372 sorts by the names themselves. This is a deliberate no-picture activity, like the old one; the apparatus is the hero (prisms 120 px, strip 30 px type).
- **Task line** above (≤ 24 px). **Bubble** right column.

**At 360 px** (stacked; stage 360 × 560): name shelf 360 × 56 (blocks 96 × 44); sentence strip 344 × 120 (26 px, two lines; socket 84 × 56); prism tray 344 × 170, prisms 104 × 90 (up-face word 30 px, side words 14 px); window collapses into a strip of hat icons under the tray; Check below. Check bottom ≤ 700 at 360 × 740, ≤ 620 at 320 × 640 (320: prisms 96 × 84, sentence 24 px).

No words on the apparatus except the content (sentence, names, pronoun faces).

## 5. The hand
- **Spin a prism:** flick it up/down (or tap its top edge / bottom edge) → it rolls one face (180 ms, *tock*). Keyboard: ↑/↓.
- **Place it:** drag a prism into the socket (or double-tap it: it slides in, 220 ms). It lies with its CURRENT up face showing; it can be spun while in the socket (the word in the strip changes as it rolls; the sentence reads *Pat saw he / him / his at the park* as it turns — the child hears/sees each).
- **Take it out:** drag it back or tap the tray.
- **Echo thread (levels 3–5):** a placed or highlighted pronoun shows its thread end(s) as small brass rings below it (one ring for singular, two for *they/we* when they stand for named people). Drag a ring up to a name block: the thread follows the finger (taut, 2 px) and ties on with a loop (*tick*). Drag a tied ring away to untie.
- **Lift a name (compound test):** in compound rounds, tap the other person's name block in the strip — it lifts 24 px for 1.2 s, leaving the pronoun alone in the sentence.
- **Free play:** prisms can be spun and swapped at will; the arrow can be test-fired at any time by tapping the underlined verb (the same honest physics as Check, no miss counted).

## 6. The rounds
One round = one sentence (levels 4–5: two sentences or a set of names). Check fires the arrow/string/threads and judges.

**Level 1 — He, him, his (one person, three jobs), 9 rounds.** Tray: the *he* prism, the *she* prism, the *they* prism. **Every round names its person:** a **referent block** stands on the name shelf (*Ben*, *Mia*, *Ben and Mia*) with a fine thread already running from it down to the socket. Without it the sentence cannot decide — *Pat saw ___ at the park* takes *him*, *her* AND *them*; *That is ___ red ball* takes *his*, *her* AND *their* (the draft's L1 had three right answers in most rounds). With the referent, exactly one prism and one face fit: the child reads WHO (the block) and the JOB (the arrow).

| # | referent block | sentence | right |
|---|---|---|---|
| 1 | Ben | ___ ran to the den. | He (doer) |
| 2 | Ben | Pat saw ___ at the park. | him (done-to) |
| 3 | Ben | That is ___ red ball. | his (owner) |
| 4 | Ben and Mia | ___ sang a song. | They |
| 5 | Ben and Mia | We waved at ___. | them |
| 6 | the twins | The twins lost ___ hats. | their |
| 7 | Mia | ___ found a shell. | She |
| 8 | Mia | Dad hugged ___. | her (done-to) |
| 9 | Mia | Lily packed ___ bag. | her (owner) |

(Row 9 was *Mia packed ___ bag*: with Mia as the referent, *Mia packed her bag* is right but *his/their bag* are grammatical too unless the person is given — the referent block now gives it, and the subject is a different girl, *Lily*, so the thread, not the nearest name, decides. Row 6 keeps the name in the sentence — *the twins* is its own referent.)

Rounds 7–9 add *she* (the old set had none). *her* is both done-to and owner in English — the prism's done-to and owner faces both read *her* (with different corner marks); either face is accepted in rounds 8 and 9 only if its mark matches the job (the arrow sticks only in the target; the string ties only to the knot) — the gate checks the FACE, not the word, so the job is still taught.

**Level 2 — I, me, my · we, us, our · the compound trap, 9 rounds.** Tray: *I*, *we*, *they* prisms (+ a *Sam* name block in compound rounds). The referent block is the gold **star** (I, the one speaking — the same star as row 123) or **star + a name** (we); every round shows it, so *___ like my new hat* cannot take *We* or *They*. Sam and ___ built a fort. (I) · Mom called Sam and ___. (me) · I like ___ new hat. (my) · Grandpa helped ___. (us) · ___ live in a blue house. (We) · This is ___ classroom. (our) · Ben and ___ went to the shop. (I) · Mia gave the cup to Ben and ___. (me) · That is ___ bike. (my).

**Level 3 — Swap the name (G1-371, G2-355), 9 rounds.** The sentence starts with a NAME block in it (*Mia ran to the den.*). The child drags the name block out to the name shelf — a thread stays attached to it, its other end in the empty socket — then places a prism and turns the right face up; the thread ties itself to the prism's ring (one ring for one name, two for two names: a *she* prism dropped where *Ben and Mia* stood has one ring and a thread end left dangling). Mia ran to the den. (She) · Grandpa saw Ben. (him) · That is Sam's ball. (his — the name block carries the *'s*; the owner face replaces both) · Ben and Mia sang. (They) · We waved at Ben and Mia. (them) · Leo lost Leo's hat. → shown as *Leo lost ___ hat.* with *Leo's* block (his) · Dad hugged Mia. (her) · Mia packed Mia's bag. (her) · Sam and Leo built a fort. (They).

**Level 4 — Who is it? (G2-353), 9 rounds.** Two sentences; the pronoun in the second is already printed (highlighted); the child ties its thread ring(s) to the name block(s) in the first. Ben and Mia went to the park. *They* played on the swings. (both) · Mia lost her hat. *She* looked everywhere. (Mia) · Leo met Sam at school. Sam gave *him* a pencil. (Leo — two boys: the trap; *him* is not Sam, because Sam is the doer) · The twins came home. Mom gave *them* a snack. (the twins) · Mia and Ava baked a cake. *They* shared it. (both) · Sam called Mia. *She* came at once. (Mia) · Ben waved at Leo. *He* waved back. (Leo — *back* makes the reading single; a bare *He waved.* is refused as ambiguous) · Dad and I went out. *We* bought milk. (Dad and I — ties to *Dad* and to the star block *I*) · Mia found Ben's ball. She gave it to *him*. (Ben).

**Level 5 — Sort the names (G1-372), 9 cards per round-set (one round = 3 cards).** The three prisms stand upright with their DOER face forward as three bins: *he*, *she*, *they*. Name blocks arrive one at a time on the shelf; the child drags each to a bin; the bin's thread ring count accepts or rejects (*they* has two rings; dropping *Mia* there ties one ring and leaves one dangling — a visible half-empty bin). 3 rounds × 3 cards: (Tom · Mia · Ben and Leo) · (Ava · the twins · Leo) · (Mom and Dad · Ben · Lily). (*Sam* is refused here — Sam can be Samuel or Samantha, so it has two right bins; it stays in levels 1–4 only where the sentence's referent block and *he/him* fix it.) Names are chosen per locale as unmistakably gendered for that country; the *they* bin also accepts plural nouns (*the twins*, *the dogs*).

**Level 6 — Owner words on their own (G2-354), 9 rounds.** The owner face's word flips to its stand-alone form (*his, hers, theirs, ours, mine*; *yours* is excluded together with *you*). Rounds: The ball is ___ (his) · The bag is ___ (hers) · The kite is ___ (theirs) · The fort is ___ (ours) · This cup is ___ (mine) · That bike is ___ (his) · The shells are ___ (hers) · The house is ___ (ours) · The hats are ___ (theirs). The person is given by a name block on the shelf with a string to the thing word (*Mia ← bag*), so the person is never guessed. Owner of each: *Ben* (ball), *Mia* (bag), *Ben and Mia* (kite), *star + Sam* (fort), *star* (cup), *Leo* (bike), *Ava* (shells), *star + Mom* (house), *the twins* (hats).

**Answer position.** Prisms sit in the tray in a fixed order per level (he, she, they / I, we, they) — they are tools. What is guessable is the FACE: across each level the right face is doer 3, done-to 3, owner 3; no face is right three times in a row; the right person is never always the first prism. The gate's bots: *always doer face* (≤ 3/9), *always the face matching the sentence position* — "socket at the start → doer, else done-to" scores 6/9 by design (that is the real heuristic of English word order — reported); the compound rounds break it (*Sam and ___ built* — socket not at the start, right = doer), *always the first prism* (≤ 3/9).
**Order:** order-only reshuffle per pass; never two rounds with the same person and face in a row.

## 7. Check, the misses, the success
- **Check with the socket empty:** hint, no miss — "Put a prism in the gap. Who is it, and what is their job?"
- **Miss 1:** the arrow/string fires and fails visibly:
  - *bow face where the arrow lands* (*Pat saw he*): the arrow hits the bow face and bounces off with a twang, falling under the strip · "The action lands on this word. Turn the prism to the face with the target."
  - *target face where the arrow must start* (*Him ran*): the arrow tries to leave the socket and fizzles (a drooping dotted line) · "This word is doing the action. Turn the prism to the face with the bow."
  - *owner string slides off* (*lost them hats*): the string from *hats* reaches the socket and slips off a non-knot face · "The hats belong to someone. Turn to the face with the knot."
  - *wrong person* (*she* where the round is *they*): the echo thread rings show the count: one ring, but the sentence's people need two — a loose dotted end dangles · "How many people does it stand for?"
  - *compound*: Sam's block lifts automatically and the pronoun is left alone in the strip for 1.6 s (*me built a fort*) · "Cover Sam. Would you say 'me built a fort'?"
- **Miss 2:** the right prism lifts 6 px with a teal ring and the right face's corner mark glows on its side · "Spin the glowing prism to the face that is shining."
- **A new move takes the help away** until the next Check.
- **Success:** the arrow thunks/launches/ties, the sentence reads with the pronoun in teal, threads glow from pronoun to name, a paper hat flies into the shop window · en "Pat saw HIM — him is the one the action lands on!" (doer: "HE ran — he is doing it!"; owner: "HIS red ball — it belongs to him!"; level 3: "She means Mia!"; level 5: "Ben and Leo — two of them, so THEY!").

## 8. Settings
1. **Jobs:** He · him · his (L1) · I · me · my (L2) · Swap the name (L3) · Who is it? (L4) · Sort the names (L5) · Mine · hers · theirs (L6) — the level picker; the tray/shelf changes at rest.
2. **Face marks:** Show bow · target · knot (default) · Words only — hides the corner marks (the arrow still shows the job after Check); visible at rest.

## 9. Words (EN source)
- title (shell): **The Borrowed Hat** (frozen) · instruction: "Turn the prism so the right face is up. Is the word doing it, getting it, or owning it?"
- task lines: L1–L2 "Which person? Which face?" · L3 "Swap the name for a prism." · L4 "Tie the word to the name it stands for." · L5 "Sort the names: he, she or they?" · L6 "Whose is it? Turn the owner face."
- hints and celebrations: §7 exactly.
- settings: "Jobs", "He · him · his", "I · me · my", "Swap the name", "Who is it?", "Sort the names", "Mine · hers · theirs", "Face marks", "Show bow · target · knot", "Words only"
- aria: "Prism {person}, face up: {word} ({job})", "Gap in: {sentence}", "Thread from {pronoun} tied to {name}".

**Locale traps (faces and sentences literal per locale; the old lists kept):**
- **de** *er/ihn/sein*, *ich/mich/mein*, *wir/uns/unser* (old data). *sie* is doer AND done-to (*Sie sieht sie*) — the she-prism is used only in doer and owner rounds (*sie / ihr*); dative (*ihm, mir*) is refused (grade 3). *sein/seine* agrees with the thing: the owner face shows the form for the round's noun.
- **The owner word does not always mark the owner's sex** — fr *son/sa/ses*, it *il suo/la sua*, es *su*, pt *seu/sua* agree with the THING, not the owner, so the he- and she-prisms would carry the same owner face. fr and it keep owner rounds as a one-vs-many decision (*son* vs *leur*, *il suo* vs *il loro*); the he/she decision lives in their doer and done-to faces (*il/elle*, *le/la*; *lui/lei*, *lo/la*). es *su* is identical for one and many owners, so es owner rounds are removed and replaced by doer/done-to rounds (level 6 likewise: *suyo* has the same problem). pt-BR uses its everyday owner form *dele / dela / deles* (*a bola dele*, *a bolsa dela*, *os chapéus deles*), which does mark the owner — that is the pt owner face.
- **fr** clitic objects come BEFORE the verb (*Léo le suit*, *Maman me voit*): the arrow lands on a socket that sits before the verb — the arrow arcs backward. That is the language, drawn honestly. *son/sa/ses* agree with the THING (*son ballon, sa balle*): the owner face shows the round's form. Old fr foils (*Le* vs *Il*, *Me* vs *Je*) kept as the other faces.
- **es** (es-MX) pro-drop: subject pronouns are optional — doer rounds use contrast/emphasis frames the panel writes (*¡___ ganó!*) or keep the old ones (*___ sonríe.*); clitics before the verb (*Mamá me ve*); *su* is his/her/their — the owner face reads *su* for three persons (the job, not the word, is taught).
- **pt-BR** spoken Brazilian uses *ele* as object (*eu vi ele*) — refused as a target, never marked wrong if heard; the activity keeps the old first-person sets (*eu / me / meu*, *nós / nos / nossa*) where BR is uncontroversial; *mim* only after a preposition (old foil kept).
- **it** pro-drop as es; *lo/la* clitics; owner *il suo / la sua* with article (the owner face shows *suo* and the article stays in the strip).
- **nl** *hij/hem/zijn*, *zij/haar/haar*, *ik/mij/mijn*, *wij/ons/onze/ons* (*ons huis* vs *onze jas* — de/het: the face shows the round's form). The nl *they* object is disputed (*hen/hun* by the schoolbook rule, *ze* in everyday speech — and *ze* is also the doer form): the they-prism is used only in doer and owner rounds (*zij* / *hun*), like de *sie*.
- **sv** *jag/mig/min-mitt-mina* (old focus kept as level 2-sv: the owner face shows *min/mitt/mina* by the thing's gender and number — the old six possessive rounds are kept), *han/honom/hans*, *hon/henne/hennes*, *de/dem/deras* (the de/dem split is a famous adult error — kept only at doer/done-to rounds, never mixed).
- **da** *han/ham/hans*, *jeg/mig/min*, *de/dem/deres*. **no** (bokmål) *han/ham/hans*, *jeg/meg/min*, *de/dem/deres*.
- **fi** *hän/hänet/hänen*, *minä/minut/minun*, *me/meidät/meidän*, *he/heidät/heidän*. **Finnish has no he/she**: *hän* is both. Level 5 in fi sorts **one vs many** (*hän / he*) — two bins; level 1's she-rounds are folded into *hän*. Object case with some verbs is partitive (*näin hänet* but *autoin häntä*): only total-object verbs are used (the panel confirms each sentence).
- **Names** per locale: unmistakably gendered and ordinary (en Mia/Ben/Tom/Leo/Ava/Lily; de Anna/Ben/Mia/Paul…); unisex names (en Sam, Alex; de Kim, Toni; fr Camille, Charlie; sv/da/no Kim, Robin; fi Sasha) never stand where gender decides; *the twins* is a plural noun everywhere.
- Sound off: arrows, strings and threads carry every message; TTS reads the finished sentence only.

## 10. Sound off, access, phones
- Silent legibility: a bouncing arrow, a fizzle, a string that slides off, a dangling thread end.
- Keyboard: Tab to a prism, ↑/↓ spins, Enter places/removes; in thread levels Tab to a ring, Enter, then arrow keys to a name and Enter ties.
- aria-live: "The arrow landed on him. Him is the one the action lands on." / "The arrow bounced off he."
- Taps: prisms 120 × 104 (104 × 90 at 360); rings 44 px hit area; name blocks 112 × 52.
- No library pictures in this activity (the content is words); the hierarchy floor is met by the prisms and the strip.
- Phone: stacked; side faces stay readable at 14 px; the window becomes a hat strip.

## 11. Distinct from
- **Row 122 Hook Tile (this batch)** — possessive NOUNS on a string to a lost thing; here pronoun CASE by a rolling prism and an action arrow.
- **New 217 Article Caps** — caps that fit a word; prisms are not fitted, they are turned, and the arrow (not the shape) judges.
- **Row 72 Two-Ended Rod, Row 74 Rewind Rail** — unrelated mechanics.
- **Tools:** *heart-words*, *reading-easel* — no overlap. No instrument uses a multi-face block whose faces are the grammatical cases of one word.

## 12. Build plan
- **Data:** per locale, levels of rounds `{id, sentence:[tokens with socket index], verbIdx, job:'doer'|'object'|'owner'|'ownerAlone', person, names?, prisms:[{person, faces:{doer, object, owner, ownerAlone}}], threads?}`; faces literal per locale and per round where they agree with a noun.
- **Core state:** `{level, round, socket:null|{prism, face}, prismFaces:{}, threads:[{from, to}], lifted, misses}`; functions `spin(p, dir)`, `place(p)`, `remove()`, `tie(ring, name)`, `untie(ring)`, `fire()` → `{arrow:'stuck'|'bounced'|'fizzled'|'launched', string:'tied'|'slid', looseEnds}` (pure), `check()`.
- **Gate's own ground truth** (`verify-pronoun-prism-core.js`): its own case table per locale (en he/him/his…, de er/ihn/sein…, fi hän/hänet/hänen…), its own job label per round derived from the sentence's socket position relative to the verb and the round's declared role, and asserts: `fire()` succeeds only when the face equals the job AND the person matches; *her* rounds accept only the matching-mark face; thread count = number of named people; level-5 bin acceptance by its own name list; job balance 3/3/3; bots under caps; no *you/yours*; fi has no she-prism; de she-prism never in object rounds.
- **Referent rule (the one-right-answer proof):** for every round of levels 1, 2 and 6 the gate substitutes EVERY face of EVERY prism in the tray and asserts that exactly one (prism, face) fits both the referent block's person/number/gender and the job; a round without a referent block fails the build.
- **Mutations:** a round with no referent block · a unisex name in level 5 · es *su* owner round with he and she prisms both offered · arrow sticks in a bow face · arrow launches from a target face · string ties to a target face · *they* prism has one ring · compound round accepts *me* as doer · fi level 5 has three bins · de *sie* in an object round · balance broken (doer 5/9) · owner face ignores the thing's gender in fr.
- **Pictures:** none (deliberate; the content is words). The shop-window hats are drawn geometry (triangles with a band), not objects.
- **Risks:** the arrow arcing backward in fr/es/it (clitic before verb) must not cross the strip's text — it arcs above the line. Level 4 needs a native check per sentence for genuine single reference (the Ben/Leo round shows how: rewrite until only one reading exists).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — chunky prisms that roll *tock-tock*, an arrow that thunks or bounces, threads you tie to names.
2. **Would a teacher put it on the board?** Yes — "same person, three jobs" is one block you can turn; the arrow shows *why* it's *him* after *saw*; the compound trap gets the cover-the-name test built in.
3. **Would a parent trust it?** Yes — the pronouns of their own language (no invented *she* for Finnish), clean sentences, no scores.
4. **The invention:** each person is one prism with a doer face, a done-to face and an owner face — and the sentence's action arrow decides which face must be up.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 5→5
What changed:
- **Most level 1–2 rounds had two or three right answers** (*Pat saw him / her / them*, *That is his / her / their red ball*, *___ like my new hat* → I / We / They): the person was never given. Every round of levels 1, 2 and 6 now shows a **referent block** (a name, *Ben and Mia*, *the twins*, or the star for *I*) with a thread to the socket, and the gate proves exactly one (prism, face) fits. This also teaches G1-371 / G2-353 from the first round.
- L1 row 9 subject changed (*Lily packed ___ bag*, referent Mia) so the nearest name is not the answer.
- **Unisex names out of the sorting level** (*Sam* → *Tom*), and a per-locale unisex refusal list.
- **Owner faces that do not mark the owner:** fr/it owner rounds decide one vs many only; es/pt *su/seu* owner rounds removed (they could not have one right prism), pt uses BR *dele/dela/deles*.
- Level 2 balance fixed: the draft had doer 4 / done-to 3 / owner 2 (*___ like my new hat* → *I like ___ new hat*, owner) — now 3/3/3 as §6 claims.
- nl *they* object (*hen/hun/ze*) excluded like de *sie*; owner list for level 6 written out.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
