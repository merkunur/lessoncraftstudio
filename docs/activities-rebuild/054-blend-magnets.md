# #54 — Blend Onset and Rime → THE BLENDING MAGNETS (RF.K.2.C, all 11 locales)

ORDER row 54 · id `choice-board.onset-rime-blend.rf-k-2-c` (kept).

- **Files:**
  - Added: `blend-magnets-core.js`, `blend-magnets-activity.js`, `blend-magnets-activity.html` and `blend-magnets-activities.json`.
  - The row left `choice-board-activities.json` as text, and the other 10 rows are byte-identical.
  - 0 lines changed in `lcs-shell` or any shared core.
- **Locales:** all 11.
  - en/de/nl/da keep their frozen slug, title and intro.
  - es, it, pt, fr, sv, no and fi each get a new slug, title and intro.
  - The prose is rewritten in all 11 for the new apparatus.
- **Grade:** the default is K. de, nl, pt and no are set to grade 1, because blending onset and rime belongs to the first school year there (Klasse 1 / groep 3 / 1º ano / 1. trinn).
- **Strand:** each non-English locale shows its national phonological-awareness strand name. The de and nl strands stay as they were.
- **Design:** `designs/054-choice-board.md`. **Prefix:** `bmg-`.
- **The old gates:** `verify-choice-board-onsetrime.js` and `local-test-choice-board-onsetrime.js` carry a RETIRED guard.

## The apparatus and its invention: BLENDING IS TWO MAGNETS CLOSING A GAP
- **The rail:** a red magnet holds the first sound and a blue magnet holds the rest of the word, with a gap between them. The gap is a stretch line, and pause dots under the rail count it down (round(gap × 6)).
- **Pull zone:** a magnet released inside the pull zone snaps shut. The zone is wide when the setting is **Strong** and narrow when it is **Gentle**.
- **Snap first:** Check with the magnets still apart only asks the child to push them together. It never counts as a miss.
- **The pictures:** three frames, holding the target word, a rhyme (same ending, different start) and a word with the same first sound but a different ending. Their order is balanced over the deck, and the rhyme sits next to the target about half the time.
- **The magnet test (at Check):**
  - The chosen picture's name is laid out under it as magnets of its own.
  - Each part that matches the rail sticks (a teal ring). Each part that does not match pushes away (it flips and fades).
  - A **rhyme** therefore shows its ending sticking and its start pushing away. A **same-first-sound** picture shows its start sticking and its ending pushing away.
  - The hint names whichever part to listen to.
- **Miss 2:** first-letter tags appear on the pictures, and the hint asks which picture starts with the onset. Any move clears the test and the help.
- **Right:** the word goes onto the fridge as red + blue magnets.
- **Levels:**
  - **First sound + rest:** this is RF.K.2.C.
  - **Every sound:** one magnet per sound, the RF.K.2.D bridge, with ck/sch/ch/ll/rr/mm/tt kept as one magnet. The test counts how many sounds stick and how many push away.
- **Settings:** Level and Pull (Strong / Gentle).

## Deviations from the design (each measured or ruled)
- **Pictures that name another word were struck:**
  - it *lago* (the camping lake reads as mountains);
  - fr *lune* and *prune* (the moon is a shape, the plum is an apple);
  - every cake slice, so *kakku* uses the whole `4th of July/cake`;
  - de *nest*, which became *netz*.
- **Native review (one reviewer over all 11 locales), fixed at source:**
  - nl *jam* is /ʒɛm/, so it became *jurk*.
  - da *hund/mund* do not rhyme in Danish speech, so round 1 became *hat/kat/hund* and the prose example became k + at.
  - sv *get* and no *geit* start with /j/, so both became *gaffel*.
  - no:
    - *tog/skog/tann* became *hatt/katt/hest*;
    - *kake/rake* was dropped, because *rake* is not the garden rake.
  - fr:
    - *bus/jus* was dropped (it has no spoken rhyme);
    - in *gilet / filet / gant*, *gant* became *girafe*, so the same first sound is /ʒ/.
  - it *tenda/benda* was dropped, because the plaster is *cerotto*.
  - The sv and fi hints were reworded.
- **The drag is kept alive during a move.** `_dragUpdate` repositions the magnets in place. A full re-render lost the pointer after the first move.
- **320 px:** a five-magnet test row (it *volpe*) widened its column and pushed the outer frames off the card. The cells are now fixed at the frame width, and the test tiles scale (font size 16–18 px).

## Gates
- `verify-blend-magnets-core.js`: 1673 / 0.
- `mutate-blend-magnets.js`: 19 / 19 killed.
- `local-test-blend-magnets.js`: real pointer at 704, a 320–1366 sweep, every round in every locale, at rest, at miss 2 and when right.
- `visual-qa-activity.js` (en / it / fi / de) PASS.
- `audit-activity-hierarchy.js`: 398 / 0.
- `audit-settings-efficacy`: 2 live.
- The static gates are green.

## Deploy (2026-10-20)
- **Commit:** `e1e845c6`.
- **Server:** cp `blend-magnets-*` and `choice-board-activities.json`, then the preview webp, then `deploy.sh`: EXIT 0, payment canary clean, 133 GB free.
- **`live-verify-blend-magnets.js`: 67/67.**
  - All 11 locale pages return 200.
  - en/de/sv/fi were played with a real pointer at 1366 and 390: snap, the rhyme miss with its end sticking, then right on the fridge.
  - The first run raced the fresh deploy (no iframe yet), and the re-run was clean.
- **Variety:** 15 distinct rounds live in en, reshuffled on pass 2.
