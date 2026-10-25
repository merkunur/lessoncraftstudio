# #110 — Build Blend and Digraph Words → THE PAINT WELLS (RF.1.3; en de nl sv no es it pt)

ORDER row 110 · id `cvc-builder.build-blend-word.rf-1-3` (kept). Design: `designs/110-cvc-builder.md`.

## Files and wiring
- **New files:**
  - `mini tools/paint-wells-core.js` holds the model:
    - the six wells, pour / take / move, the stir (ok · lean · split · wrong · gap), Team jars, Sentence, hints, the bright droppers, the ghosts and the plan;
    - the DATA block is generated from the sound-boxes banks by a build script, never hand-split.
  - `paint-wells-activity.js` draws the picture, the wooden palette with six glass wells, the dropper tray, the jars, the sentence strip, the dried strip and the colour shelf. It owns tap and drag pouring, a well handing back its last letter, the stir and the keyboard (CSS prefix `pw-`).
  - `paint-wells-activity.html`.
- **Manifest:** the row stays in `cvc-builder-activities.json`, beside rows 111 and 58. It was edited surgically inside this row only, and parsed back to prove the other two rows are unchanged.
  - `tool` is now `paint-wells-activity`, `task_template` is `paint-wells`, and the params are `clue` / `help` / `wells` / `rounds` / `sets`.
  - en slug, title and intro are frozen.
  - **de / nl / sv / no / es / it / pt slug, title and intro are authored new** (the activity was en-only) and were reviewed.
  - `cvc-builder-core.js` and `cvc-builder-activity.*` have a 0-line diff.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.853, then 9.854 for the live fix below.
- **Prose:** en replaced; de / nl / sv / no / es / it / pt added.
- **Pictures:** library pictures of the bank rows. All of them were checked by eye on contact sheets (see Deviations).
- **Sources** (scratchpad):
  - `pw-build.js` (data from the banks) and `pw-strings.js` → `pw-apply.js` (48 keys × 11);
  - `pw-prose-src.js` → `pw-prose-apply.js`; `pw-meta.js` → `pw-manifest.js`;
  - `pw-review-fix.js`; `pw-edit1..3.js`; `pw-sheet.js` (contact sheets).

## The invention
**Paint wells where two letters that make one sound mix into one new colour, and letters that keep their own sounds refuse to mix.**
- Every letter is a glass dropper of its own colour (s blue, h yellow, c red…).
- The child pours the picture's word into six wells, one well for each sound. There are always six wells, so the wells never tell how many sounds the word has.
- A tap pours into the next EMPTY well; only a drag can put a second letter into a well, so sharing a well is always a decision.
- **Check stirs:**
  - s + h in one well swirl into a brand-new green (sh);
  - f + r in one well refuse and run in stripes with a crack (two sounds);
  - an sh broken across two wells leans across the wall;
  - a wrong letter clouds grey;
  - a missing sound shows a coral notch after its well.
- When every well is right, the paint dries into the word's colour strip under the picture, and the strip goes on the colour shelf, where every sh is the same green wherever it sat.

**Clues:**
- **Pour the word** (all seven) — the tray holds the word's letters plus three traps (the near-team letter, the near-blend letter, an h, a neighbouring vowel).
- **Team jars** (en de) — the word is poured except its team; pick the jar.
- **Sentence** (en) — tap every word with sh; Check runs green into the sh and drops into a counting jar.

**Help setting:** First letter given (default, locked in well 1) · Picture only.

## Deviations from the design (each measured or ruled)
- **No bank additions.** The sound-boxes banks are read by five shipped tools and their gates, so this row uses existing rows only.
  - en Team jars are sh / ch / ck, not sh / ch / th: the bank's only th word is *tooth*.
  - *whisk*, *shelf*, *shrimp*, *cheese*, *mouth*, *sloth* are not bank rows; set B uses the bank's final blends (vest, lamp, belt, mask, milk).
- **Pictures checked by eye:** all were rendered on contact sheets and looked at, because a word review cannot see a picture. Three were removed:
  - en *chin* (the picture is a whole face);
  - es *pollo* (the picture is a hen, and es also has *gallo*);
  - pt *ninho* (a nest holding chicks — the de *Nest* ruling at #109).
- **Locales:**
  - **sv ships** (the design hid it at 6 rows; the bank now has doubled consonants and ng with checked pictures).
  - **da / fr stay hidden** (too few consonant-team rows); **fi is refused** (no consonant digraphs to teach).
  - **es / sv / pt have no blend words** in their banks: Pour teaches their teams and doubles.
  - **nl is mostly blends** (its bank has only two consonant-team rows, *schip* and *ring*). "One letter per well" therefore wins 7 of 9 there, a recorded exception the gate freezes at its measured value.
- **Doubled letters:** es *ll* / *rr* and pt *rr* are sounds of their own, so they are teams (their own colour). Elsewhere a doubled letter is one sound in a deeper shade of its letter.
- **A well is the tap target**, not its letters: the letter chips were 26–30 px, under the 44 px floor. A tap on a poured well hands back its last letter, and a drag from it carries that letter.
- **The split well is not split for the child** (no automatic second well). It shows stripes and a crack; the child moves the letter.
- **Sentence words get no colour until Check**, so a tap is not an instant verdict.
- **Not built:** free play, the Word bank and Keyboard help modes, "One team" for Team jars, a paddle sweeping well by well (the wells swirl together, and the Check button carries the paddle).

## Review
ONE native + phonics reviewer over the compact dump: every word with its split, its kinds and its traps per locale, the strings, the prose and the new metadata.
- **Confirmed:**
  - every split is right for one-sound-or-two in its language (nl *schip* = s · ch, es *qu* / *ll* / *rr* and pt *rr* / *lh* / *ch* teams, it *ch* / *gn* / *sc* teams and doubles, sv / no doubles and *ng*);
  - no trap letter makes a second valid spelling of any word;
  - every success line is true under its selection rule;
  - no digit or answer in any hint; no "free"; no claimed feature that does not exist.
- **MUST, applied:** es and pt practices claimed a single-r / rr contrast the activity never shows (no single-r word) — rewritten to what it does show.
- **SHOULD, applied:**
  - de *Netz* (tz, a Klasse-2 spelling topic outside the sch / ch / ck focus) → *Tisch* (picture viewed: a table);
  - the en RF.1.3 sentence no longer claims blends (they sit under RF.1.2.b);
  - es / it / pt setting label → Actividad / Attività / Atividade;
  - sv: Lgr22 names the åk 1–3 band; "the colours lean"; "the paint runs"; hFirst "är ifylld";
  - no: LK20 aims after 2. trinn; aPoured "hellet"; "the paint runs";
  - es: "primer grado de primaria", "presiona", Shift+Enter;
  - it "lentamente" (piano also means quietly), curly apostrophes in the prose;
  - pt hFirst "já colocada"; de "fließt ihre Farbe".
- **Kept, with reason:** en "Clue", es "Comprobar" and "currículo oficial" are the shipped house wording across the activities.
- **My own reading of the renders** found what no gate measured: b, n and s were three near-identical blues and d, p, r three purples, in a tool where colour carries the meaning — the palette was respread so s is the only blue (s + h = green reads).

## Gates
- `verify-paint-wells-core.js` — 3,656 checks, its own ground truth: a letter-team table typed by hand per locale that re-splits every word, the banks re-read from disk, every picture on disk. It covers:
  - the source rule (bank boxes, picture, word; refused words; da / fr / fi absent; no vowel team poured);
  - kinds (team vs double, es ll / rr and pt rr teams);
  - the tray (the word once + three distinct traps, a near-team trap beside every h-team, never two neighbours in spelling order, the first letter on no place more than a quarter of the time);
  - the stir against the gate's own verdict on 120 random fills per word (ok / lean / split / spell), and the bots ("one letter per well" ≤ 5 of a set, nl 7 recorded);
  - the hand (a tap never shares, three a well, the locked first letter, empty Check no miss, help gone on a new pour, two bright droppers at miss 2, ghosts at miss 3);
  - Team jars (team of the jars, right jar where the plan says, balanced, never twice running; place never three running);
  - Sentence (the gate's own sh count, 2–4, extra / missing are misses);
  - the plan and the success line; the strings × 11.
- `mutate-paint-wells.js` — 18 / 18 killed, control survived.
- `local-test-paint-wells.js` — 12,404 checks in 8 locales with real taps and drags:
  - the drag found two defects no other gate saw: a finished drag left a flag that swallowed the child's NEXT real tap, and well letters were 26–30 px tap targets (the well is now the target);
  - every clue × round at rest, at miss 2 and solved, through 320…1366 (short sentence words got a 48 px floor).
- **Live fix (9.854):** my read of the first live de phone render showed a three-letter well (*Sch*) spilling out of its glass — the narrow-width chip floor overrode the mixed reset, and no gate measured letters against their well. Letters are now sized by how many share a well; the local test now fails any well whose letters spill (poisoned: it fires 5× on the pre-fix file).
- `visual-qa-activity` 54 / 54 · `audit-activity-hierarchy` 608 / 0 · `audit-settings-efficacy` (clue, help live) · preflight-activity-routes · prose-claims · SERP copy · activity-content × 8 — all green.

LIVEVERIFY
