# Row 181 — Glim's Describing Words → THE DESCRIBING LIGHT (L.2.1.e)

## 0. Identity
- id `wordclass.adjective-adverb.l-2-1-e` (frozen) · grade 2 · Common Core L.2.1.e (+ L.1.1.b/f word classes) · strand Language · own files `glim-light-core.js` (new; `wordclass-core.js` untouched), `wordclass-activity.js`, `.html`, `wordclass-activities.json` (row kept, params rewritten). Title / intro / slugs en, fr frozen; de, es, pt, it, nl, sv, da, no, fi get new slug, title, intro at build (the old activity was en+fr only).
- worksheets covered: **G1-293** Nouns and Verbs: Two Bins · **G1-300** Nouns and Adjectives: Two Bins · **G2-275** Nouns, Verbs, and Adjectives · **G2-285 / 286 / 287** Word Classes: Sort Nine / Twelve / Fifteen Words (with and without picture help). The 11-locale word-class lists of those sheets (`scripts/worksheet-gen/data/b2/word-classes.js`, incl. each locale's `nounExclude` list of noun/verb look-alikes) are the vocabulary source.
- old activity: a sentence with a blank, two chips (*quick / quickly*), the shell prompt naming "a thing / an action", Glim SVG. **Kept:** all 9 en and 9 fr sentence ideas (rabbit, bell, star, mouse, sang, turtle, wrote; guépard, chat, chien, singe, avion, bébé, garçon, monsieur, élève). **Fixed:** the old prompt TOLD the child "Which word describes the rabbit?" — the question gave the answer away; and every adjective blank stood before a noun while every adverb blank stood after a verb, so position alone solved the deck. Flat adverbs (*quick, loud, slow* — "hopped quick", "rang loud", "walked slow" are heard in everyday English) are replaced by words with only one adverb form.

## 1. The pitch
"A describing word is a little light: aim it at what it describes — if it lands on a thing it stays *happy*, if it lands on an action it grows its tail and becomes *happily* — so the word's shape is decided by where the light falls."

## 2. Why a child will want it again
- Glim's light is a toy flashlight: pull a beam out of the word card and sweep it across the sentence; the words it passes over glow; thing-words light up like little stages, action-words ripple like water when the beam touches them; let go and the beam locks on.
- The magic moment: the word card **changes shape under your eyes** as the beam lands — *happy* sprouts *-ly* the instant the beam touches *wagged*, and drops it again when you swing back to *puppy*. Children swing it back and forth just to see the tail grow.
- *is / looks / seems* are drawn as little bridges — the beam slides straight across a bridge and cannot stop on it ("that word only joins things"), which children find funny the first time and then remember.
- The earned show: the beam settles, the described word lights fully (the thing's library picture pops above it, the action's word does a tiny motion — a hop for *hopped*, a wave for *waved*), and the whole sentence reads with the describing word glowing in Glim's warm yellow.

## 3. The skill and the misconception
- Skill (L.2.1.e): choose between an adjective and an adverb by what is being described — a thing (noun) → adjective; an action (verb) → adverb; and (worksheets) sort words into nouns, verbs and adjectives.
- Misconceptions and the push-back:
  - *"After the verb → always -ly"* → the rounds mix *The kitten looks ___* (adjective after a verb) with *The kitten meowed ___*: the beam cannot land on *looks* (a bridge), it must go back to *kitten* — and the word stays *sad*.
  - *"Before the noun → adjective, at the end → adverb"* (position) → blanks also stand BEFORE verbs (*Mia ___ carried the eggs*, *The owl ___ flew away*) and adjectives stand at the END after *is / looks* — the light must reach an action or a thing whatever the position. (No blank ever opens a sentence: "*Silent*, the owl flew away" is good English too — a fronted adjective — so a start blank has two right answers.)
  - *"-ly words are just longer adjectives"* → the tail is a consequence: it only exists while the light rests on an action.
  - Sorting (L3): *"a word is a noun if it's a thing in my head"* → in a real sentence, things light up with a picture, doings move, describing words beam onto something else — the word's JOB in the sentence decides.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At 704: stacked — apparatus left 470 px, bubble under the stage. At 360: stacked.
- **The sentence board** (drawn apparatus): a dark-teal board 460 × 180 px (328 × 200 at 360) — dark so the light reads; words in cream Nunito 800, 30 px (24 at 360). Content words (nouns, verbs) sit on faint round **landing pads**; linking verbs (*is, are, looks, seems, feels*) sit on drawn **bridges** (a small arch under the word); little words (the, a, its, and) are plain.
- **The blank**: a glowing dashed slot 130 px wide in the sentence.
- **Glim's word card**: below the board, a warm-yellow card 170 × 64 px (140 × 56 at 360) holding the base word (*happy*) in Baloo 2 700 30 px, with a small **lamp knob** on its top edge. When the card is in the blank, the knob is where the beam is pulled from.
- **The beam**: a soft yellow cone (SVG, 30 % opacity) from the knob to the finger, ending in a 44 px light spot.
- **Pictures** (L3 and the success moment, above the lit noun): library pictures, 96 px at 704 / 64 px at 360 — e.g., pets/dog, toys/kite, zoo-animals/bear, breakfast/honey, toys/girl, classroom/book, pets/frog, zoo-animals/giraffe, at-the-supermarket/apple, pets/cat, furniture/bed, farm-animals/sheep, beach/sun. For L1/L2 the noun picture appears only at the success moment (it is the reward of the right aim, never a cue before it).
- **L3 shelves**: three shelves under the board (each 150 × 70 at 704; stacked full-width 328 × 56 at 360) with an icon and the class name as content words: a picture-frame icon **noun**, a motion-arrow icon **verb**, a lamp icon **adjective**.
- Task line (22 px): L1/L2 **"Put Glim's word in the gap and shine it on what it describes."** · L3 **"Sort the words: what job does each word do in the sentence?"**

## 5. The hand
- **Place the card**: drag Glim's word card into the blank (or tap card → it flies in, 160 ms).
- **Aim**: press on the lamp knob and drag → the beam follows the finger within one frame; words under the spot glow (pads brighten; bridges show the beam sliding off with a 100 ms skid); release on a landing pad → the beam locks (a soft click), and the card's word takes the form for that target in 150 ms (the tail *-ly* grows letter by letter, or shrinks). Release elsewhere → the beam retracts.
- **Re-aim** any time before Check: drag the knob again.
- **L2**: two cards (two base words), each fixed in its own blank; each card aims separately; beams are two different warm colours so both can be followed.
- **L3**: tap a word tile → it lifts; tap a shelf → it lands there (or drag); tap a shelved word to send it back.
- **Check** → the light show (§7).
- **Free play**: after a cure, the child may grab the knob and sweep the beam over the sentence: every pad still glows and the card's tail still grows and shrinks — but the board's "lit" state stays on the right target; tapping the lit noun's picture makes it wiggle.

## 6. The rounds
Order-only reshuffle per pass. The right target is a word in the sentence; balance = thing vs action and blank position.

**Level 1 — Thing or action?** (en, 10; one blank, one card)
| # | sentence | card | lands on | form | blank position |
|---|---|---|---|---|---|
| 1 | The ___ puppy wagged its tail. | happy | puppy | happy | before a noun |
| 2 | The puppy wagged its tail ___. | happy | wagged | happily | end, after a noun |
| 3 | The baby is ___. | sleepy | baby (across the *is* bridge) | sleepy | end, after a bridge |
| 4 | The baby yawned at her mom ___. | sleepy | yawned | sleepily | end, after a noun |
| 5 | Mia ___ carried the eggs. | careful | carried | carefully | before a verb |
| 6 | Mia is a ___ girl. | careful | girl | careful | before a noun |
| 7 | The kitten looks ___. | sad | kitten | sad | end, after a bridge |
| 8 | The kitten meowed ___ at the door. | sad | meowed | sadly | after a verb |
| 9 | The owl ___ flew away. | silent | flew | silently | before a verb |
| 10 | The owl is ___. | silent | owl | silent | end, after a bridge |
5 thing / 5 action. Measured by the critic (`work-c27/measure.js`): "nearest content word (ties go left)" picks the right target in 6 of 10; "right after a verb or bridge → adverb" in 3 of 10; "right before a noun → adjective, else adverb" in 7 of 10 (the three bridge rounds defeat it). The only rule that solves every round is the real grammar — a bridge (*is, looks*) or a following noun means a thing is described — which IS the L.2.1.e skill. Each base word appears once as a thing and once as an action (pairs), so the base word decides nothing either. Changes from the design draft: round 9 no longer opens the sentence (*Silent, the owl flew away* is also correct — two right answers); round 8 moves the blank next to the verb (*meowed at the door sad* can be heard as a depictive about the kitten); round 4 adds *at her mom* so the nearest content word is a noun, not the verb.

**Level 2 — Two lights** (en, 10; two blanks, two cards)
| # | sentence | cards | targets → forms |
|---|---|---|---|
| 1 | The ___ girl ___ climbed the tree. | brave · careful | girl → brave · climbed → carefully |
| 2 | The baby slept ___ in a ___ bed. | peaceful · soft | slept → peacefully · bed → soft |
| 3 | The ___ owl ___ flew home. | tired · silent | owl → tired · flew → silently |
| 4 | The kitten looks ___ and meows ___. | sad · soft | kitten → sad · meows → softly |
| 5 | The ___ bear ate the honey ___. | hungry · happy | bear → hungry · ate → happily |
| 6 | My dog is ___ and plays ___. | gentle · happy | dog → gentle · plays → happily |
| 7 | The ___ boy spoke ___. | shy · polite | boy → shy · spoke → politely |
| 8 | Mia ___ painted a ___ picture. | careful · beautiful | painted → carefully · picture → beautiful |
| 9 | The ___ cat sat on a ___ mat. | fluffy · soft | cat → fluffy · mat → soft |
| 10 | The turtle walked ___ and ___. | careful · calm | walked → carefully · walked → calmly |
Eight rounds mix one thing + one action; round 9 is two things and round 10 two actions, so "the second one is the other kind" fails. **Each card arrives already sitting in ITS blank (left card → left blank) and cannot be swapped** — the child only aims. If the child could swap cards, most rounds would have two right answers (*The careful girl bravely climbed the tree* is as good as *The brave girl carefully climbed the tree*; *The silent owl tiredly flew home*). The gate checks card–blank–target as one fixed triple.

**Level 3 — Word jobs** (en, 8; sort all content words; little words greyed)
| # | sentence | noun | verb | adjective |
|---|---|---|---|---|
| 1 | The little dog runs. | dog | runs | little |
| 2 | A red kite flies. | kite | flies | red |
| 3 | Big bears eat honey. | bears, honey | eat | big |
| 4 | The happy girl reads a book. | girl, book | reads | happy |
| 5 | Two small frogs jump. | frogs | jump | small |
| 6 | The hungry giraffe eats red apples. | giraffe, apples | eats | hungry, red |
| 7 | My cat sleeps on a soft bed. | cat, bed | sleeps | soft |
| 8 | Fluffy sheep sit in the sun. | sheep, sun | sit | fluffy |
13 nouns / 8 verbs / 9 adjectives across the deck (critic count; the draft said 14) — no single shelf can collect a whole sentence. Number words and determiners (*Two, The, A, My*) are little words, greyed and not sorted. Setting "Pictures" off (= G2-286 *without pictures*) hides the success pictures. No word from the locale's `nounExclude` list (*fly, duck, fish, …* — noun/verb look-alikes) is ever a noun or verb here; *flies* in round 2 is a verb by its job and appears only as a verb.

## 7. Check, the misses, the success
- **Check with the card outside the gap / no beam locked** → bubble **"Put the word in the gap, then shine it on something."** (L3 with words left on the board → **"Some words are still waiting for a shelf."**) No miss.
- **Miss 1** → Glim's light runs a short "reading" sweep along the sentence and stops on the RIGHT kind of word region: the beam you locked flickers and fades, and a dotted outline glows round every word of the right KIND (all nouns if a thing is described, all verbs if an action is) without picking one. Bubble **"Read the sentence: is the word telling about a thing, or about how something is done?"** (bridge case: **"Is, looks and seems only join — they aren't actions. Shine past them."**; L3: misfiled words wobble on their shelf, **"Ask what each wobbling word does in this sentence."**)
- **Miss 2** → the right target's pad pulses gently and the card shows both of its forms faintly (happy · happily) with the right kind's icon next to each form. Bubble **"Things get the plain word, actions get the -ly word."** (L3: each wobbling word shows the three shelf icons and the light test for that word: a picture frame lights if it is a noun, a swoosh if it is a verb, a beam toward a noun if it is an adjective.)
- A new move clears the help until the next Check.
- **Success** → the beam locks bright, the described noun's library picture pops above it (or the verb does its tiny motion), the sentence reads with the describing word glowing. Bubble **"{Word} tells about {target}: “{sentence}”"** (en "Happily tells about wagged: “The puppy wagged its tail happily.”"). L3: the three shelves light in turn; **"Nouns name things, verbs tell what they do, adjectives describe them."**

## 8. Settings
1. **Level**: Thing or action? (L1, default) · Two lights (L2) · Word jobs (L3).
2. **Pictures**: show at the end (default) · off (word-only sorting, G2-286).

## 9. Words (EN source)
- title **Glim's Describing Words** · tasks as §4 · hints and celebrations as §7
- shelf names (content): **noun** · **verb** · **adjective**
- settings **Level** — **Thing or action?** · **Two lights** · **Word jobs** · **Pictures** — **Show at the end** · **Off**
- aria: card **Glim's word: {form}**; beam **The light is on: {target}**; pads **{word}, a word the light can land on**; bridges **{word}, a joining word**.
- Locale traps (every locale rebuilds its rounds; the FORM is always derived from the aimed target through a per-locale table):
  - **de / nl**: the adverb has NO separate form (*Der Hase hüpft schnell* = *Der Hase ist schnell*). What changes is the attributive ending before a noun: de *der fröhliche Welpe*, *ein fröhlicher Welpe*; nl *de blije puppy*. So in de/nl the card grows an ENDING when the light lands on a noun in front of it, and stays bare on an action or across a bridge — the invention still holds (form follows target), the morphology is the locale's own. Case/gender endings are stored per round, never computed.
  - **sv / da / no**: the adverb is the neuter **-t** form (*snabbt*, *glad → glatt*) and the attributive adjective agrees in gender/number (*en glad valp, ett glatt barn, glada valpar*): adjective rounds use common-gender singular nouns so the plain and *-t* forms differ visibly; neuter nouns appear only where their -t is the honest adjective form.
  - **fr / es / pt / it**: adverbs in *-ment / -mente* built on the FEMININE adjective (*heureuse → heureusement*, *lenta → lentamente*); adjectives agree with the noun (*la petite chatte*); predicative after *être/estar/ser/essere* is an adjective (the bridge rule). fr keeps its 9 old sentences.
  - **fi**: adverb **-sti** (*iloinen → iloisesti*), adjectives agree in case (*iloinen koira*, *iloista koiraa*); the beam targets are the same.
  - L3 in **de**: nouns are capitalized — that IS the German cue (Nomen schreibt man groß), so de L3 sentences are a legitimate first step and the de level adds adjectives/verbs where the capital does not help.
  - Pictures labelled from the library in the page locale.

## 10. Sound off, access, phones
- Sound off: the beam, the growing tail, the picture pop and the motion are the whole feedback; TTS reads the finished sentence where available.
- Keyboard: Tab to the card → Enter places it → arrow keys move the light spot from pad to pad (bridges skipped with a skid) → Enter locks; L3 Tab to a word, 1/2/3 send it to a shelf; Check.
- Taps: lamp knob 44 px hit area; light spot 44 px; word pads ≥ 44 px tall; L3 tiles 48 px; shelves ≥ 56 px tall.
- Phones: 360 — board 328 × 200 (sentences wrap to 3 lines), card under the board, bubble under the card, L3 shelves stacked full width (3 × 56), Check above the fold (board 100–300, card 310–370, bubble 380–450, Check 470; L3 shelves 310–490, Check 510). 320 — words 22 px, card 132 × 52.

## 11. Distinct from
- **New 257 Test Frames** (drop a word into one of three gap machines — *I see a ___*, *I can ___*, *very ___* — and the machine enacts it): that classifies a word OUT of context by which frame accepts it; here the word sits IN a real sentence and its job is shown by where its light lands, with the adjective/adverb FORM following the aim.
- **Row 76 Question Lamp** (a question word lights the part of an answer it asks for) and **Row 116 Story Lantern**: there the child CHOOSES which lamp (word) fits a target that is fixed; here the word is fixed and the child AIMS it, and the word changes its own FORM (*happy → happily*, de/nl endings, sv *-t*) according to where the light lands — the light is a grammar lever, not a selector. Different gesture (drag a beam vs pick a lamp), different consequence (morphology vs highlight).
- **Row 134 Stove Knob** (word strength ordering) and **Row 179 Robin** (this batch: faces compared in a mirror, nothing aimed).
- No premium tool aims at words; sorting-hoops sorts by hidden rules, not by sentence job.

## 12. Build plan
- **Core** `glim-light-core.js`: round `{ id, level, tokens:[{w, kind:'noun'|'verb'|'link'|'little'|'adj', target?:i}], blanks:[{at, card, rightTarget, forms:{[targetKind]:string}}] }` (L3 `{ tokens, classOf:{i: 'noun'|'verb'|'adj'} }`); `formFor(blank, targetIndex) = blank.forms[tokens[targetIndex].kind]` (bridges/little words not landable); `isRight = every blank's locked target === rightTarget` (L3 `every word's shelf === classOf`). The displayed form is DERIVED from the locked target — the gate proves the right target yields the sentence's correct form.
- **Gate** `verify-glim-light-core.js`: every round ×11 — the right target exists and is landable; the form for the right target, inserted, reproduces the native author's accepted sentence (a whitelist per locale, written independently); each L1 base word appears as both a thing and an action in its locale (pairs); L1 thing/action 50 % ± 10; "nearest content word" heuristic right in ≤ 70 % of L1 rounds; "after the verb → adverb" heuristic right in ≤ 60 %; "before a noun → adjective, else adverb" ≤ 70 %; no blank opens a sentence and no blank where the native author marks a depictive or fronted adjective as also acceptable; L2 cards are fixed to their blanks; L2 has ≥ 1 two-things and ≥ 1 two-actions round; L3 no sentence whose content words are all one class; no word from the locale's `nounExclude` list used as a noun or verb; no en flat-adverb base (*fast, hard, quick, slow, loud, high, low, late, early, straight*).
- **Mutations**: form stored per blank instead of derived · beam allowed to land on a bridge · grade on release instead of Check · all adjective blanks before nouns · pictures shown before Check in L1 · L3 accepts a word on any shelf in a two-class sentence · help persists after a new move · same order twice.
- **Risks**: the dark board must keep cream text ≥ 4.5:1 (teal #0E4F45 behind cream #FBF3E4 measures ~9:1); the beam must not hide the words it passes (30 % opacity, words drawn above it).
- Pictures to verify at build: dog, kite, bear, honey, girl, book, frog, giraffe (chibi — "hungry" is fine, never "tall"), apple, cat, bed, sheep, sun (beach/sun — weather/sun has no label). BLOCKED: nothing.

## 13. The four questions
1. **Choose it again?** Yes — a flashlight that makes a word grow and lose its tail as you sweep it is a toy in itself.
2. **Teacher on the board?** Yes — "ask what the describing word describes" is the exact L.2.1.e test, and the bridge rule (*is/looks* are not actions) is taught by physics.
3. **Parent trust?** Calm dark board, library pictures only as rewards, no scores, works silently.
4. **The invention:** the Describing Light — aim a describing word at what it describes, and its form follows: plain on a thing, -ly on an action.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 5→5
What changed:
- Two-right-answer rounds removed: sentence-start blanks (*Silent, the owl flew away* and *Tired, the silent owl flew home* are good English) in L1 round 9 and L2 round 3; *meowed at the door sad* (depictive) in L1 round 8. And L2 let the child swap the two cards between blanks — *The careful girl bravely climbed the tree* is as right as the key — so L2 cards are now fixed to their blanks.
- L1's position column and bot claims were wrong (round 2's blank follows a noun, not a verb). Re-measured on the final table (`work-c27/measure.js`): nearest-content 6/10, after-verb→adverb 3/10, before-noun→adjective 7/10; only the real grammar rule solves all ten. Gate thresholds updated.
- L3 noun count corrected (13); number words/determiners declared little words.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
