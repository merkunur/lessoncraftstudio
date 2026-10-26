# #121 — Detective Dewey's Field Guide → THE BOOK THAT ONLY OPENS WHERE YOU SEND IT (1.RI.5; all 11 locales)

ORDER row 121 · id `field-guide.text-features.1-ri-5` (kept). Design: `designs/121-field-guide.md`.

## Files and wiring
- **Files:**
  - `mini tools/field-guide-core.js` is rewritten in place (`FieldGuideCore`; the old core was this activity's own and no other page loads it). It holds the model:
    - the book: three invented creatures (the Gribbet, the Wuzzle and the Nim; fi *Nimu*), three parts each with a page number, a job, a heading, a meaning and two sentences;
    - four levels of eight rounds: A contents and headings, B Words to Know and index (es/pt books have no index, so those rounds are glossary rounds), C picture labels, D which tool (tabs, screen-book buttons, and four rounds drawn from A–C each pass);
    - the choices (send, back, flap, sentence, bold, entry, label, caption, tab, icon), the hints, the underlines, the plan.
    - Glossary and index order is computed with `Intl.Collator`, never stored. DATA is written by a build script, which also picks each locale's three index rounds so no answer position wins more than 3 of 8.
  - `field-guide-activity.js` is rewritten. It draws Dewey's case card (his picture, the question, the found slot), the open book (contents or index on the left, the page it was sent to on the right, the brass page dial on the spine), heading flaps, the glossary, the bold-word page, the picture page with labels on leader lines, the closed book with tabs and the screen book with four drawn buttons (CSS prefix `fg-`, `apparatusClasses: ['fg-art']`).
  - `field-guide-activity.html` loads core `?v=2` and activity `?v=13`, and drops its `#lcs-root{height:100%}` pin.
- **Manifest:** the row stays in `field-guide-activities.json`.
  - `params` = `{tools: [A, B, C, D], help: [after, start], rounds: {A: 8, B: 8, C: 8, D: 8}}`; the 14 old rounds and their per-locale copies are retired (in git).
  - en, de, fr, es, pt, it and nl slug, title and intro are frozen.
  - **sv, da, no and fi slug, title and intro are authored new.**
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.865.
- **Prose:** en, de, fr, es, pt, it and nl replaced; sv, da, no and fi added. Every quoted line is in the locale's book (gate-checked).
- **Strings:** 48 keys × 11.
- **Sources** (scratchpad): `fg-src.js` (every locale's book, questions, pictures and tool lines) → `fg-build.js` (rounds, measured label anchors, DATA); `fg-strings.json` → `fg-apply.js`; `fg-prose.js`, `fg-manifest.js`, `fg-dump.js` (the review dump), `fg-e-rev.js` (the review's fixes), `fg-anch.js` (anchor measurement), `fg-probe.js`.

## The invention
**A closed field guide that only opens where its own tools send it.** There is no page-turn button. A contents line sends the book to its page: the dial turns to the number and the page riffles open. The wrong line opens the wrong page in plain view: asked how the Gribbet can glow, a child who taps "Snoud: all about swimming" lands on a page about swimming. The fact is always the page's second sentence, so tapping the first line of a page never answers. The creatures are invented, so nobody can answer from what they already know.

## The four levels
- **A, Contents & headings:** four contents rounds and four heading rounds (sections folded behind their headings; a tap unfolds one, the others fold away).
- **B, Words to Know & index:** three glossary rounds, two bold-word rounds (the glossary is shut until the bold word on the page is tapped) and three index rounds (topics with page numbers). es/pt: five glossary rounds and the two bold-word rounds.
- **C, Picture labels:** a crab, an elephant, a pelican, a snail, a butterfly, a narwhal, an octopus and a porcupine, each with three labels on leader lines; a label opens its caption; one caption answers.
- **D, Which tool?:** the closed book's tabs (which part do you open to find what a word means, or to see every chapter and its page?), the screen book's buttons (which one finds a word, which one reads the page out loud?), plus one A, one B and two C rounds drawn each pass.
- Misses: miss 1 dots the question's key and the wrong place's key side by side; miss 2 underlines every key word and marks the match in teal (contents: the book closes back first). "Help from the start" underlines everything without marking the match.

## Deviations from the design (each measured or ruled)
- **Snood → snoud and fid → fipp in every locale.** Both are real English words; *snoud* was already the fr/es/it/pt name. *Nim* → **Nimu in fi only**: the reviewer found *Nim* inflects into forms of *nimi* ("name"), so "Nimillä on punainen vorl" read as "the names have a red vorl".
- **The narwhal question asks which part helps it turn (the flippers)** instead of "which part is really a tooth": the label word for tusk contains "tooth" in de, nl, da, no and fi (*Stoßzahn, slagtand, stødtand, støttann, syöksyhammas*), so the label gave the answer away.
- **The butterfly's third label is its body**, not its legs: the picture shows no legs.
- **Headings carry the job** ("Mipp: all about digging"), the same text as the contents line, because a heading of a made-up part name alone cannot be matched to a question without opening every section.
- **Every page heading reads "Name: job"** and the index lists topics ("glowing … 9"), never part names (gate-checked).
- **One picture size per width, no brass-tag flight:** the dial turns and the page riffles; the tag flying from the line to the dial is left out.
- **Tabs appear only in Level D**, not on every book, and there is no free-play browsing between rounds.
- **Hints carry no inflected job word** ("Look at this page's heading. Does it match the question?"); the underlines carry the comparison instead, so no hint needs a case form in de or fi.
- **Phones show one page at a time** with the red ribbon to go back; the closed book's tabs sit above it.

## Pictures
Checked by eye on the contact sheet: occupations/detective (Dewey), beach/crab (claws, legs, shell), animals/elephant (trunk, big ears, a tail tuft), birds 2/pelican (beak, wings, feet), forest creatures/snail (foot, shell, feelers), forest creatures/butterfly (wings, antennae, body — no legs drawn), ocean life/narwhal (tusk, tail, flippers), ocean life/octopus (arms, eyes, head), forest creatures/porcupine (nose, quills, feet). Every label anchor is measured on the 1024 px image and snapped to a drawn pixel; the butterfly's antennae anchor first landed on a wing and was re-measured onto the antenna itself.

## Review
ONE native + Grade-1 reading reviewer over all 11 locales (compact dump of every page, question, caption, tool line, string and the prose).
- **MUST, applied:**
  - **Two right answers in Level D (en, fr, it, fi):** "which chapter a topic is in" shared its word with the Index tab's own explanation ("topics and their pages"), so word matching pointed at the Index. Now "to see every chapter and its page" (fr *tous les chapitres et leur page*, it *tutti i capitoli*, fi *kaikki luvut*).
  - **sv:** *betan* (the beet) → *beten* (the tusk).
  - **da:** *klosakser* → *klosakse*.
  - **fi:** *Nim* → *Nimu*; *ruumis* (also "corpse") → *vartalo*.
- **SHOULD, applied:** de *ganz hinten am Schwanz vom Wuzzle*, *schlage es nach*; fr index topic *se cacher* (not *cacher (se)*), the quib sentence; es *pata delantera*, *trepar a los árboles*; pt *flexível* (not *mole*), *pata da frente*, the narwhal's *cauda*; it *vogliono dire le parole*, *trovare la strada*; nl *Welk bijschrift*; sv *tofs* (a *lock* reads as a lid), *snigelns hem*; no *[mippen] sin*, *Sneglen bor i huset sitt*, *er til for*; fi *kaivaa mudassa*; en *The contents page lists*.
- **Kept, with reason:** de *der Nim* (sounds like *nimm*, harmless); the blorp "hovers" in de/sv/da/no and "floats" elsewhere (each locale consistent with itself); frell "glows" and vorl "makes sparks" are close, but their key words differ in every locale.
- **Open (frozen metadata, not edited):** the de, fr, es, pt, it and nl titles and intros place the activity a year up (Klasse 2, CE1, 2.º, 2º ano, classe seconda, groep 4) while 1.RI.5 is grade 1; otherwise the frozen intros describe the new activity correctly (the book's tools, never guessing, invented creatures).

## Gates
- **`verify-field-guide-core.js`:** 8,368 checks, 0 fail, with its own ground truth (the creatures, each part's job as a per-locale word stem, every round's answer, the pictures' answers). It covers:
  - the book (every locale authored, es/pt without index, no invented name is a real word: a blocklist plus every image-vocabulary word of the locale);
  - one right answer (each part's line, heading, topic, meaning and fact carry its job, its first sentence does not, no sibling does; every question's key carries only the answer's job; each picture's key is in the right caption only and in no label);
  - the model for every locale, round and choice; glossary and index alphabetical in the locale's collation; no answer position wins more than 3 of 8; the plan; the pictures exist and every label points at a drawn pixel; strings ×11; every prose quote is in the book; the manifest.
- **`mutate-field-guide.js`:** 19 of 19 mutations killed, and the control survived.
- **`local-test-field-guide.js`:** real pointer, 11 locales, 320–1366.
  - The scenarios: the settings; contents (a wrong line opens its own page with the two keys dotted, its first sentence is reading, the ribbon closes the book, miss 2 underlines every key and marks the match, the right line opens its page and the dial turns to its number, only the second sentence ends it); headings; a bold word (the glossary shut until tapped, then alphabetical); the index (es/pt: a glossary round); picture labels (captions closed until a label is tapped, three leader lines ending on the picture); the closed book's tabs; the screen book's buttons; help from the start; the riffle.
  - Then every round of all four levels at rest / miss 2 / solved, resized through 320–1366: no sideways scroll, the book's controls above the fold, the hint and the success line in view, controls ≥ 44, Dewey ≥ 64, the picture ≥ 96, everything inside the card, no text cut off, the leader lines on the picture.
  - **39,138 pass, 0 fail.** Its first run found the unfold and slide animations replaying on every repaint (a resize mid-animation measured captions 20 px tall): animations now run once, on what was just opened, and never in FAST.
- **`visual-qa-activity`:** PASSED, 48 renders. **`audit-activity-hierarchy`:** 162 / 0. **`audit-settings-efficacy`:** "tools" and "help" both change the board.
- **Preview:** a seed in `generate-activity-previews.js` opens the first contents round with the right page riffled open.
- **Renders read** at 320, 360, 704 and 1024 (en, de, sv, fi, es): they found the leader lines missing (a wrong selector), the contents lines without a colon, the heading flaps spreading their words (a flex gap), the butterfly's antennae anchor on a wing, the screen book's sound waves over the page number, and the phone tabs not filling the width.
- **Content:** `verify-activity-content-<loc>` ×11, `verify-activity-prose-claims`, `verify-activity-serp-copy`, `audit-activity-content-tells` and `preflight-activity-routes` all pass.

## Live
LIVEVERIFY: pending.
