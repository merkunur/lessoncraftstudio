# #46 — Byg ordet af stavelser → KIKKERTEN, the telescope (RF.K.2.B, Danish only)

ORDER row 46 · id `syllable-builder.byg-ordet-af-stavelser.da.rf-k-2-b` (kept).

- **Files:**
  - Added: `telescope-core.js`, `telescope-activity.js`, `telescope-activity.html`, `telescope-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 9 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** Danish only by design.
- **Metadata:** slug, title and intro are frozen. The da prose is rewritten: the old prose cited "ba-nan-en" and "so-len", which are not the activity's words.
- **Strand chip:** the da strand chip is overridden to «Fonologisk opmærksomhed», as on #42 and #44. The RF default «Læsning (afkodning)» is a reading strand.
- **Design:** `designs/046-syllable-builder.md`.
- **Prefix:** `telescope` was checked free.

## The apparatus and its invention: A TELESCOPE THAT IS ONLY SHARP AT THE RIGHT LENGTH
- **The telescope:** a brass telescope lies across a sea, and the picture sits on a far-away island.
- **Kig! (Check) swings a round view onto the island.** The view is sharp only when the telescope has exactly as many rings as the word has syllables, in the right order:
  - **Too short:** blurred and shifted. The last ring carries the rest of the word, squeezed together, and a ghost ring pulses beyond the lens.
  - **Too long:** blurred and shrunk. The extra rings stay blank and dull.
  - **Nothing gives the count away:** focus is never live before Kig!, and every ring is the same size.
- **Træk ud:**
  - Drag the lens cap out one click per ring width, or tap it to pull out one ring. Tapping a ring pushes it, and every ring beyond it, back in. At most 4 rings.
  - **Miss 2:** the syllables are spoken, and one ghost ring appears for each missing syllable.
- **Byg kikkerten:**
  - Drag or tap syllable rings from the rack onto the telescope.
  - **Kig!:** the right rings stay in and glow; wrong rings pop back to the rack. "Ekstra ring" adds a decoy, which always pops first.
  - **Miss 2:** the FIRST syllable locks onto ring 0 with a rivet.
- **Den manglende ring:**
  - One hollow ring and three candidates: the answer, a syllable of the same word, and a foreign one.
  - **A same-word syllable** glows in its own place for a moment, then returns to the rack.
  - **Miss 2:** the word is spoken with a pause at the hollow, and the hollow glows.
- **Success:** the view snaps sharp and twinkles; the telescope slides shut and the word appears on the main tube; the word is inked into the logbook strip (spyglass mark + word + one dot per syllable).
- **Settings:** Niveau, Ekstra ring (Fra / Til) and Ordet på øen (Nej / Ja; the word under the picture, for readers).
- **Keyboard:** → pulls a ring out and ← pushes one in; Enter fits a rack ring; Backspace takes the outermost ring off.

## Deviations from the design (each measured or ruled)
- **Rack balance target:**
  - **The design** asked that "fit left-to-right" solve ≤ 0.25 and "first ring is the first syllable" ≤ 0.35.
  - **Why not:** seven of the ten words have two syllables, so any order is right 50 % of the time by chance. Getting below that needs a reversal bias, which is itself a tell (the #44 / #45 ruling).
  - **Instead:** two rings lie in reading order exactly half the time over two passes; three or more are never in order and never reversed. Measured: left-to-right solves 7 of 20, first-ring-first 9 of 20.
- **Words replaced in review (see below):**
  - pelikan → **spøgelse** (Level 2);
  - papegøje → **ballerina** (Level 2);
  - badekar → **medalje** (Level 3).
- **Decoy and candidate changes:**
  - delfin's decoy "ke" → **"nan"**, because fin + ke = *finke* (a finch), caught by the gate;
  - xylofon's decoy kan → **ri**, lampe's foreign gø → **bal** and radise's foreign kar → **tor**, so that each one is still a syllable of a pool word;
  - every decoy and foreign candidate is a syllable of a pool word.
- **The answer slot in Level 3** is balanced 3/3/3 by rotation, ignoring the design's listed candidate order.
- **"Den sidste ring har mere end én stavelse"** replaces "to stavelser", because a telescope that is two or more rings short puts three or more syllables on the last ring.
- **Not built:** free play between rounds (the blurry horizon) and the end-of-pass logbook twinkle.

## Fixes from the build (each found by a render or a gate)
- **At 320–412 the four-ring telescope ran past the sea.** Ring width is now computed from the real stage width, after the sea padding and the 44 px lens handle; at 320 the cap and tube are smaller.
- **Long words overflowed the main tube when it widened on success** (motorcykel, ambulance). The rings now slide shut first, and the word appears on the tube only then.
- **The view replayed its swing on every repaint**, and the island ring showed through it. The view now animates once per look, and the island hides behind it.
- **"De lysende ringe sidder rigtigt" was shown when no ring stayed.** A new hint, "Ingen af ringene sad rigtigt. Hvilken stavelse kommer først?", covers that case.
- **The empty logbook strip looked like an input box,** so it is hidden until the first word is spotted.
- **A stray backspace byte from shell escaping** broke a regex in the local test. It was found by reading the bytes.

## Gates
- **`verify-telescope-core.js`: 853 checks, 0 failures.** Its own oracle carries the 29 words, splits, pictures, levels and hollow places. It checks:
  - **Data:** splits match `approved-words-da.json`, and no word is `policy_managed`; every picture exists and its da label is the word; klokke is the bell; there is no pelican, badekar or papegøje.
  - **Træk ud:** the flight and engraving for every word × 1–4 rings, and no focus before Kig!.
  - **Byg kikkerten:** every arrangement of every Level-2 word gives the right stay/pop result; the decoy always pops; no decoy + ring makes a Danish word; the rack never lies in order or reversed over 24 passes; miss 2 locks the first syllable.
  - **Den manglende ring:** all three candidates for every word, and the slot balance in every pass.
  - **Also:** the hint ladder, the order rule (deterministic), the strings, and the frozen manifest.
- **`mutate-telescope.js`:** 21 of 21 mutations killed.
- **`local-test-telescope.js`:** 1889 checks, 0 failures, with a real pointer at 704 for every round of every level: lens drags, taps, rack drags, decoy, rivet, settings and keyboard. It also sweeps 320–1366 at rest, at a miss and on success.
- **Other gates:**
  - `visual-qa-activity.js --locale=da`: 60 renders pass;
  - `audit-activity-hierarchy.js`: 182 / 0;
  - `audit-settings-efficacy.js`: 3 live;
  - the da content gate, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are green.
- **Read by me:** both contact sheets (the 29 pictures, then the replacement candidates); the miss, collapse, gap and success at 360, 704 and 1024; the preview.

## Review (one agent, Danish native + børnehaveklasse pedagogy): applied
- **Required:**
  - **beach/pelican is drawn as a stork,** with no pouch, and "stork" is one syllable. All four library pelicans read as storks (seen on a contact sheet), so pelikan was replaced.
  - **The prose claim "Alle ord udtales med lige så mange stavelser"** was too strong. It now reads "Alle ord er valgt, så de klappes med lige så mange stavelser, som de skrives med, når man siger dem tydeligt."
- **Syllable risk:** badekar ("bad-kar") and papegøje were the reviewer's top two, so both were replaced.
  - køleskab and lænestol were rated a lesser risk and kept.
  - cykel, motorcykel and engel were confirmed as clapped with a syllabic -el.
- **Optional, applied:**
  - "i den rigtige rækkefølge";
  - a comma in "stavelse, du siger";
  - "Træk én ring mere ud!";
  - "Klap ordet, og træk kikkerten ét klik ud for hvert klap.";
  - aria "ringe trukket ud";
  - "Tryk på Kig! Et skarpt billede …";
  - prose: "fonetikaktivitet" → "aktivitet i fonologisk opmærksomhed", and "følger" → "understøtter Fælles Mål".
- **Kept:**
  - **lænestol could be called "stol" and gorilla "abe":** tapping the picture says the word.
  - **xylofon may be called "klokkespil":** that is also three syllables.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The title** says "Fonetik"; in Danish schools that is the science of phonetics, and the right term is "fonologisk opmærksomhed".
- **The intro** says "blande … stavelser", a calque of "blend" (Danish: "sætte sammen"), and it describes only the build level.

## Deploy (2026-10-20)
- **Commit 7b8e7339.** deploy.sh returned EXIT 0, with 0 payment-canary failures. The da page returns 200. The preview webp was copied to the server before the build.
- **Production play: 20 / 20** (da at 1366 and 390).
  - Banan on one ring is blurred, with two syllables on the ring (a miss); on two rings it is sharp.
  - Kjole: le + kjo pops back (a miss); kjo + le is sharp.
  - Panda: "da" in the hollow is sent back (a miss); "pan" is sharp.
  - The wrapper version matches, and the iframe grows with the card.
- **Live variety probe (da):** 10 distinct rounds, and pass 2 is reshuffled.
- **Server disk after the deploy:** 134 GB available of 436 GB (68 % used).
