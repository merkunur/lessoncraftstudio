# #80 — Sock & Shadow → THE LAMPLIGHT CUPBOARD (SL.K.6, all 11 locales)

ORDER row 80 · id `sock-and-shadow.puppet-speak.sl-k-6` (kept). Design: `designs/080-sock-and-shadow.md`.

## Files and wiring
- **New files:** `mini tools/lamplight-cupboard-core.js`, `lamplight-cupboard-activity.js`, `lamplight-cupboard-activity.html`. CSS prefix `lc-`.
- **Pictures:** through `lcs-pictures.js` (kitchen tools, toys, accessories, emotions, weather, furniture, around the house, camping, bakery, christmas, hospital).
- **Manifest:** the row stays in `sock-and-shadow-activities.json` (no MANIFEST_FILES change, as at #79).
  - `tool` is repointed; `params` became a mirror of the core (the rounds, the pictures, the nouns and feeling sentences per locale);
  - en/de/fr/es/pt/it/nl slug, title and intro are frozen (sha1 over the seven = `5b7d1041…`, checked unchanged by the script);
  - sv/da/no/fi slug, title and intro are new.
- **Route:** `GRADE_OVERRIDE` sv/da/no/fi '1' (de/no K-label rule: school content → 1st year); `STRAND_OVERRIDE` sv «Tala, lyssna och samtala», da «Kommunikation», no «Muntlig kommunikasjon», fi «Vuorovaikutustilanteissa toimiminen»; `ACTIVITY_WRAPPER_VERSION` 9.821.
- **Legacy gates:** `verify-puppet-speak-core.js` and `local-test-sock-and-shadow.js` exit 0 with a pointer; `puppet-speak-core.js` is untouched.
- **Sources:** scratchpad `lc-manifest.js`, `lc-prose.json` (via `apply-activity-prose.js`), `lc-dump.md` (the reviewer's text), `lc-fix1.js`/`lc-fix2.js` (tap-to-say).

## The invention
- **The lamps:** Shadow's cupboard is dark behind glass; every word the child says lights ONLY the things it fits. The lit set is the listener's uncertainty, made of light.
- **Point and name:** a thing is said by tapping it in the cupboard (its noun); the tray holds only the details — big, small, on the top/bottom shelf, next to …
- **The door that fits one:** the speaking tube sends the sentence; one lit thing slides through the hatch; two jam; none = the dark cupboard.
- **The memory pegs:** Shadow holds 3 words (setting: 2); one bead too many rolls the FIRST word off the peg, onto the floor.
- **Feeling rounds:** the cupboard holds 3 faces and 3 helps; Sock shows a face and what happened; the child says the face and a "because …" card; Shadow holds up the face and brings the help (rain → umbrella, dark → lamp, late → pillow, sick → tissues, birthday → cake, sunny → kite, cold → scarf). "Please" is a card that is never graded.
- **Misses:** miss 2 badges the things that differ and glows the word that tells them apart (feeling rounds: the face and the reason glow).
- **Settings:** round types · Shadow's memory 3/2 · lamps light as you tap / only after speaking (a pelmet hides them).

## Rulings this build made
- **Nouns are said by pointing**, not chosen from chips: the tray shrank to the detail words, which is also what made the phone fit (all controls above the 640 px fold at 320).
- **Big must LOOK big:** the first build clamped the big picture to the cubby, so big and small rendered alike at 640–1366 (found on the hub preview). Now: the side counter only from 620 px, 180 px wide in Level 1, and big ≥ 1.33 × small at every width — asserted by the core gate (layout) and by the local test (rendered pictures).
- **No picture shows a fallen tower**, so "angry because my tower fell down" became "sad because I am sick" (thermometer → tissues); no round's answer is angry (the angry face stays as a decoy).
- **Reviewer fixes** (one reviewer, all 11 locales): please only where help makes sense (round 6, not the sunny one); round 1's surprised face (reads as scared) → happy; Level-1 round 6 gets a second truck so the noun alone no longer solves it; fi «ole kiltti» (not «kiitos»), da «vil du ikke nok», no «vær så snill»; es «tarro» (a tazón is a bowl), it «tazzone»; fi «on syntymäpäiväni»; da comma before *fordi*; es «armario» throughout; pt «Vá buscar»; de prose «oben im Regal»; fr «Celui-là», «de quel objet»; fi «esine» throughout; one name per locale for the hatch (da lågen, sv luckan, no luka, fi luukku); es/it/pt/fr "shows the face".
- The free-play guessing toy and the shuffle button of design §2 were not built (the round advances on success).

## Gates
| Gate | Result |
|---|---|
| verify-lamplight-cupboard-core (own matcher, every legal deal × every word set, own phrase table ×11) | 49,569 / 0 |
| mutate-lamplight-cupboard | 18 / 18 killed, control survives |
| local-test-lamplight-cupboard (11 locales × 320–1366, real clicks + keyboard, every round at rest and solved, big/small ratio) | 10,463 / 0 |
| visual-qa | 54 renders green |
| hierarchy | 430 / 0 |
| settings-efficacy | 3 live |
| preflight, prose-claims, serp-copy | green |

## Open (page metadata — for the operator)
- The frozen intros describe the old activity: nl/es/pt/it promise colour words (and it/nl a tray); it says «🔊» and «Senza registrazione» (a no-account claim); de «alles wird vorgelesen»; en and fr say "Shadow holds two cups / forgets half". The reviewer wrote replacements (kept in the session record); not changed — metadata.
