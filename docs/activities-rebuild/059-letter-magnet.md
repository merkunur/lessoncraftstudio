# #59 — Beginning Sounds → THE LETTER MAGNET (RF.K.3.a, all 11 locales)

ORDER row 59 · id `choice-board.beginning-sound.rf-k-3-a` (kept).

- **Files:** new `letter-magnet-core.js`, `letter-magnet-activity.js` and `letter-magnet-activity.html`.
- **Manifest:** the row stays in `choice-board-activities.json`, edited as text. Its `tool` is repointed and its params became a mirror of the core (levels × rounds per locale). Every other choice-board row is byte-identical.
- **Shared code:** 0 lines changed in shared cores.
- **Metadata:** slugs, titles and intros are frozen in all 11 locales. Grade stays K (no override). The strand stays Reading: Foundational Skills.
- **Prose:** rewritten in all 11 locales. Every example is a real round, checked by the prose script against the core.
- **Design:** `designs/059-choice-board.md`. CSS prefix `lmg-`.
- **Retired:** the legacy `verify-` and `local-test-choice-board-beginningsound.js` now exit 0 with a pointer once the row runs the new tool.

## The apparatus and its invention: THE LETTER IS A MAGNET
- **The gantry.** A beam with one to three red horseshoe magnets. Each magnet carries a letter, a letter team or (in read rounds) a word on a cream plate, and has one hook per picture it should pull. Under each magnet sits a dashed **pull zone**.
- **The table.** 4 or 6 picture cards, pictures only and no words. Each card has its own speaker. The hand can:
  - drag a card onto a zone;
  - with one magnet, tap a card to send it under the magnet;
  - with several magnets, tap the card and then the zone;
  - press keys 1–3 on a focused card;
  - tap a card in a zone to send it back to the table.

  A table row whose pictures have all gone up folds flat, so the switch rises as the zones fill.
- **The switch (the lever = Check).**
  - Right pictures fly up onto the hooks one after another and stay there.
  - Wrong ones shiver and go back to the table.
  - Empty hooks wiggle: they are the count of pictures still to find.
  - The empty switch asks, with no miss.
  - In a one-hook round, the right picture beside a wrong one ends the round, but the wrong one still visibly stays down and counts as a miss.
- **Miss 2:** small tabs appear on every card: the first letter on letter levels, the team on team levels. On team levels the two magnets involved glow. Any move takes the help away.
- **Success:** a name strip unrolls under each hung picture, with the magnet's letter or team in coral. The shell's Check is hidden and pressed by the activity.
- **Levels (Magnets setting), shown per locale only with ≥ 7 rounds:**
  - **One hook:** the old 8 rounds per locale. en G → goat, es b → burro.
  - **Letter of the week:** 3 hooks and 6 pictures, with a sound neighbour among the others.
  - **Two magnets:** m / n, b / p, …; the two magnets swap sides every pass.
  - **Which team?** sh · ch · th, heard anywhere in the word.
  - **Team in the word:** word strips with the team cut out, plus two read-and-match rounds where three words hang on the magnets.

  en, de, nl, no, es, it, pt and fr have all five levels. da, sv and fi have levels 1–3 (no team literal with enough pictures; sv /ɧ/ is never written sj in the library's words).
- **Letters setting:** capital and small (Dd · Sh sh), capital only, or small only.

## Data (generated, then baked between `/*DATA-BEGIN*/ … /*DATA-END*/`)
- **Pictures:** pictures earlier rows already checked, plus the old rounds. Every picture any row had not opened before was opened on a contact sheet: the 89 team pictures and the 22 letter-level ones.
- **First-sound classifier (per locale):**
  - soft c/g; silent h; English kn/wr/wh/ph/qu;
  - German V = /f/, St/Sp = /ʃ/, French loans like Giraffe;
  - Dutch sch/ch; Swedish and Norwegian soft k/g, sk/skj/kj/tj;
  - Spanish b = v (never a B/V pair);
  - Italian c/g + e/i;
  - Brazilian t/d + i = /tʃ dʒ/ (tigre);
  - Finnish loan letters.

  A belonging picture starts with the magnet's letter and its primary sound. Every other picture differs in both letter and sound.
- **Teams:** a team word holds exactly one of the locale's teams, written literally (de sch hides its ch). fr two-team words (mouton, chou, bouche, cochon) are out. ng only where it is one sound (nl kangoeroe and no kenguru are out).

## Native + pedagogy review (one reviewer, all 11 locales) — every fix applied at the source
- **MUST:**
  - nl hen → out (a Dutch child says «kip»);
  - nl kangoeroe / no kenguru → out (the g is spoken);
  - es béisbol → out (a bat and ball: «pelota»); the one-hook B round is now burro;
  - pt tigre on the t magnet → out, and the classifier now knows Brazilian ti/di;
  - fr sofa → out («canapé»);
  - da prose «lyder ens» → «lyder næsten ens».
- **SHOULD:**
  - de Mopp, sv bo and föl, it gazza, pt luminária → out;
  - it, pt and fr read-round prompts reworded;
  - the learning-goal line now says teams are *contained*, not begun with (8 locales);
  - it comma; fi partitive (pieniä kirjaimia).
- **My own finding:** I opened the 22 letter-level pictures on a contact sheet. The legacy es «béisbol» shows a bat and a ball, so I replaced it before the review.

## FROZEN-NOTEs
- The frozen intros in all 11 locales still describe the old mechanic ("tap the picture"). The de and fr intros mention "ohne Anmeldung" / "sans inscription". Not touched (frozen metadata, landing-level text).
- de title says «(Klasse 1)» while the intro says «Vorschule und Klasse 1»; the grade chip follows K. Not touched.

## Gates
- `verify-letter-magnet-core.js` — 82,221 / 0. The gate's own per-locale first-sound classifier (incl. Brazilian ti/di), its own team detector, pictures on disk / colour / not refused / the library's or the vocabulary's own name, every round's shape, the switch state machine, deals (no row holds all of one magnet's pictures; slot shares spread), order() never repeats even with a fixed draw, strings ×11 with matching placeholders and nothing "free", manifest mirror, frozen metadata.
- `mutate-letter-magnet.js` — 17 / 17 killed (2 survived on the first run → the read-round decoy check and the deterministic order check were added).
- `local-test-letter-magnet.js` — every round of every level in all 11 locales with a real pointer at 704 (drag + tap + tap-zone + keys 1–3), the miss-2 tabs, a zone card back; the width sweep 320–1366 (en) / 320 · 704 · 1366 (all) at rest, zones full, miss 2 and won: 0 fail.
- `visual-qa-activity.js` (en, fi) — 48 renders each, green. `audit-activity-hierarchy.js` — 482 / 0. `audit-settings-efficacy.js` — Magnets and Letters both change the board. `preflight-activity-routes.js`, `preflight-indexable-routes.js`, `verify-activity-content-<loc>.js` ×11 green.
- I read the 360 / 704 / 1024 renders: the word and team plates first touched their round ends (fixed: a slim pill for any label longer than two characters); the 320 switch fell below the fold with every picture gathered (fixed: an emptied table row folds flat).

## Deploy
- `f4ea4d68` deployed 2026-10-21: git pull, the three files + `choice-board-activities.json` copied to `/var/www/lcs-media/mini-tools/`, the preview webp scp'd, `deploy.sh` exit 0, payment canary clean, server 133 GB free.
- Reading the live fi phone render found a defect no gate had: the shell interpolates `celebrateKey` with `promptArgs` (only {u}), so the success bubble showed raw «{a} veti kuvat {la}». Fixed in `93f06518` (the win fills list / a / la / b / lb into the task's own promptArgs; js ?v=2, wrapper 9.798). local-test and live-verify now assert the bubble is filled (poisoned against the shipped build: 60 fails).
- `live-verify-letter-magnet.js` — 99 / 0: all 11 pages 200; en / de / sv / fi at 1366 and 390: the empty switch asks, a wrong picture dragged → stays down, the right one → hook, two magnets by tap + tap-zone → right, name strips, the filled success text, the iframe grows with the card. (The first run after each deploy raced the page cache; the rerun is the record.)
- Variety probe on production: 8 distinct, pass 2 reshuffled.
