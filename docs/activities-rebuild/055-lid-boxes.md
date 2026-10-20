# #55 — Coco's Sound Boxes → THE POP-UP SOUND BOXES (RF.K.2.d, all 11 locales)

ORDER row 55 · id `sound-boxes.phoneme-position.rf-k-2-d` (kept).

- **Files:**
  - Added: `lid-boxes-core.js`, `lid-boxes-activity.js`, `lid-boxes-activity.html`.
  - The row stays in `sound-boxes-activities.json`, its only row. `tool` is repointed to `lid-boxes-activity`, and `params` now mirror the core.
  - The old `sound-boxes-activity.*` and the premium `sound-boxes` tool are untouched. 0 shared-core lines.
- **Locales:** all 11. en/de/es/pt/it/nl keep their frozen slug, title and intro. fr/sv/da/no/fi get a new slug, title and intro. The prose is rewritten in all 11.
- **Grade:** grade 1 for de/es/pt/it/nl (as before) and now no (as on #54). fr/sv/da/fi stay K.
- **Strand:** fr/sv/da/no/fi get their national phonological-awareness strand.
- **The banks:** box letters come only from `sound-boxes-bank-<loc>.json`. The 232 words this row needed were added to the banks first, in each bank's own notation and stage. verify-sound-boxes-bank's error list is now the HEAD list minus two (de bear and es chair are now verified pairs).
- **The other tools that read the banks:** blending-decks, dictation-desk, heart-words and letter-tiles show unchanged results.
- **The old gates:** `verify-sound-boxes-core.js` and `local-test-sound-boxes.js` carry a RETIRED guard.
- **Design:** `designs/055-sound-boxes.md`. **Prefix:** `lbx-`.

## The apparatus and its invention: THE LIDS POP WHERE THE SOUNDS ARE THE SAME
- **The rows:** every row is [picture | boxes]. The target picture sits beside its boxes, and the dropped picture beside its own, so the two rows share columns by construction. A coral arrow marks the asked box.
- **The lid test:** a picture dropped on the boxes (drag, or tap) shows its own boxes, lids shut. At Check, the lids pop open wherever its sounds equal the target's at the same place:
  - first meets first and last meets last;
  - middle boxes meet only between words of equal length;
  - a popped pair shares a colour and a bar joining the two boxes.
- **Sounds, not letters:** matching is by SOUND key, never by letter. cat and kite pop together at the first box; *sh*, *sch*, *oe*, *ll*, *nh* and *ou* each sit in one box. Vowel length is a key of its own in the Germanic and Nordic locales, so de *Hut* and *Bus* are different middles.
- **A miss:** the asked box shakes and stays shut, and the hint names WHERE the shared sound was («Same sound, but not at the start!»).
- **Miss 2:** every tray picture shows its own asked box, open. Any move takes the help away.
- **Right:** the asked lids pop together, the bar flashes gold, Coco (the library koala) hops, and the pair goes to the shelf as two small boxes.
- **Task 2, Where is the sound?** A sound card and a word with its lids shut. The child taps a box (its lid lifts).
  - A miss opens every lid.
  - Miss 2 makes the answer box glow.
  - Balance is 4 first · 4 middle · 4 last per locale.
- **Task 3, Hear it anywhere:** eight pictures sorted into YES and NO baskets (the NO basket shows the card crossed out).
  - At a miss, the mis-sorted pictures shake and show one box: the sound's box popped, or shut.
  - At miss 2, every picture shows it.
- **Settings:**
  - Task: Same sound / Where is the sound? / Hear it anywhere.
  - Position: First, Middle, Last or Mixed. Middle exists only where the locale has three-sound picture words.

## Deviations from the design (each measured or ruled)
- **Middle is hidden in es and pt as well as it and fi.** Measured from the picture labels, es has 4 three-sound picture rounds and pt has 0, below the 7-round floor. Their Task 1 offers First and Last, on CVCV words where both are unambiguous. A Middle setting there falls back to Mixed; it is never faked.
- **The en tables are the design's §6 tables.** The other ten locales come from a hand-written lexicon:
  - one sound key per box, with vowel length marked;
  - **rounds:** exactly one answer shares the asked sound; no distractor shares even the asked LETTERS; at least one distractor shares a sound elsewhere;
  - **Task 3:** YES words spell the sound the same way.
- **Pictures:**
  - All 156 were opened on contact sheets. A word already in a bank uses the bank's own picture.
  - **Struck:** fr *lac* (the camping lake reads as mountains); fi *vene* (every boat has a cabin, so a child says *laiva*); pt *ovo* and fi *muna* (the only eggs are a carton of eggs or a painted Easter egg); pt *bolo*'s bakery slice (it uses the whole cake).
  - **Look-alike pairs removed:** nl *hen*, de *Lamm* and sv *får* — the library's hen/chicken and lamb/sheep drawings are near-twins, and those locales carried both.
- **Tray help boxes are a fixed 46 px.** In Task 3, a picture shows ONE badge box (the sound's box) instead of its whole word, so the sort board fits a 320 × 640 phone in every state. On phones the baskets stack, with a slim label.
- **Task 3 keeps the child's agency.** Mis-sorted pictures are shown, never moved for the child. Task 2 glows the answer only at miss 2.
- **The sound-of-the-week setting is not built.** Task 3 cycles all seven sets. The shelf tokens are a record, not a replay control.
- **The target picture is 72 px at 360** (design 104), to fit the [picture | boxes] row; the floor is 64.
- **Native + pedagogical review (one reviewer, all 11 locales), fixed at source:**
  - de *Netz* (/ts/) no longer stands against a final *s*. A distractor's sound may not CONTAIN the asked sound (generator rule).
  - de *Zaun* no longer sits in a *t* NO list. A NO word holds no sound containing the set's sound.
  - A Task 2 one-letter card must be the sound that letter makes. This removed fr *rose*/*vase* (/z/), fr *luge* (/ʒ/), no *tog* (å) and pt *ninho* (/u/). Doubled letters and *ck*/*tz* are not cards.
  - nl *bol* is now keyed *o* and fr *bol* *ɔ* (an earlier edit had swapped them).
  - da *puf* (/ɔ/, an obscure picture) and *tun* (a child says *fisk*) are out, and *sæk* is keyed *e*.
  - fi *vesi* (a bottle) and *side* (a plaster: *laastari*) are out.
  - en *jet* (a child says *plane*) → *pot*.
  - Strings and prose: de/fr/fi hintNone, fi Keskikohta and partitive aria, da/fr Task 3 names, sv/no/pt prose wording.
- **FROZEN-NOTEs (metadata untouched):**
  - es/it/pt titles promise a middle sound that Task 1 does not offer in those locales (Task 2 still has middle answers).
  - The nl intro says «zonder letters», but the boxes show letters.
  - The pt intro says everything is spoken aloud and names the koala Téo.
  - The de intro says «ohne Anmeldung».
  - The en prose says "three-sound words", while Task 3 also has four-sound words.

## Gates
- `verify-lid-boxes-core.js`: 12446 / 0. Its own lid rule, the banks read from disk, pictures on disk, frozen metadata from git.
- `mutate-lid-boxes.js`: 18 / 18 killed.
- `local-test-lid-boxes.js`: 4737 / 0. A real pointer plays every round of all three tasks in 11 locales at 704. The 320–1366 sweep checks rest and miss states.
- `visual-qa-activity.js` (en / de / fi / fr) PASS · `audit-activity-hierarchy.js` 434 / 0 · `audit-settings-efficacy` 2 live · the static gates are green.
- The retired gates exit 0. verify-sound-boxes-bank errors are the HEAD set minus two. blending-decks, dictation-desk, heart-words and letter-tiles are unchanged.
