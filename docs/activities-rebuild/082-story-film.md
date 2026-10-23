# #82 — Vet's Diagnosis Window → THE STORY FILM (1.OA.A.1, all 11 locales)

ORDER row 82 · id `vet-diagnosis.word-problems.1-oa-a-1` (kept). Design: `designs/082-vet-diagnosis.md`.

## Files and wiring
- **New files:** `mini tools/story-film-core.js` (35 stories × 11 locales, each split into clauses by role), `story-film-activity.js`, `story-film-activity.html`. CSS prefix `sf-`.
- **Pictures:** through `lcs-pictures.js`; all opened on a contact sheet. Patients forest-creatures/hedgehog, squirrel, rabbit, fox, raccoon, mouse, badger, beaver, pets/hamster (x-ray filter until healed); hospital/bandage.
- **Manifest:** the row stays in `vet-diagnosis-activities.json` (no MANIFEST_FILES change, as at #79–#81; the old engine files are left on disk).
  - `tool` is repointed; `params` became a mirror of the core (every round's kind, numbers, unknown, decoy, pictures; per locale the story, question and answer);
  - en/de/fr/es/pt/it/nl slug, title and intro are frozen (sha1 = `403d1272…`, checked unchanged by the script);
  - sv/da/no/fi slug, title and intro are new.
- **Route:** `GRADE_OVERRIDE` sv/da/no/fi '2' (the six siblings were already grade 2 by structure); `ACTIVITY_WRAPPER_VERSION` 9.823.
- **Legacy gates:** `verify-vet-diagnosis.js` and `local-test-vet-diagnosis.js` exit 0 with a pointer.
- **Sources:** scratchpad `sf-manifest.js`, `sf-prose.json`, `sf-dump.md` (the reviewer's text), `sf-fix-add.js`, `sf-fix1.py`.

## The invention
- **The film plays the child's own model.** The child puts the story's two numbers on the frames (one of the three tiles is a decoy), taps the unknown frame to mark it "?" and sets it with the − / + that sit ON that frame. Diagnose plays the model sentence by sentence: each frame lights with its clause.
- **A wrong number stops the film where it is wrong:** a tile on the wrong frame (or the decoy) makes that frame and its sentence glow amber together; with the tiles right, a wrong dial makes the landing frame spill dots over its rim or leave sockets empty, exactly as many as the film is off.
- **Miss 2** replays the true film with the mystery's dots numbered 1…n and names the count by kind ("Count the dots that went away", "… without a partner", "… in one group").
- **Healing:** the fog lifts, the patient turns from x-ray blue to colour, a plaster lands, the question becomes its answer sentence and the bubble shows the equation, written the way the unknown is found (13 − 4 = 9 for a start-unknown "Bo gets 4 more").
- **The intro film** plays the TRUE story with the unknown fogged, clause by clause; any tap skips it. Read aloud (setting) speaks the story.
- **Diagrams:** change (start · chute ± · result), bracket (two interchangeable parts · whole), compare (long row · short row · gap), groups (trays · one tray · total). **Levels:** Within 20 (16) · Within 10 (10) · Groups (9).

## Rulings this build made
- **Pictures:** every library duck is a duckling, so the birds that fly away are geese; the goose and the swan are near-twins, so no swan; the bun reads as a loaf (cookies and muffins instead); the apple is red, so the apple story says "on the table / in a bag".
- **Measured data fixes:** the design's "always add the two numbers" was right in 31 % (w20) and 30 % (w10), over its own < 30 % bar (adding also solves take-from start-unknown) — w20 #11 became a compare-difference (11 ladybugs, 6 frogs) and w10 #6 a put-together part (9 fruit, 4 apples); w10 #5's decoy 7 keeps drop-smallest ≤ 40 %. Decoy rank spread holds (w20 6/6/4, w10 4/4/2).
- **Phones:** the dial lives on the mystery frame and Diagnose sits with the tiles (French at 320 was 104 px over the fold with a separate control row); a short task line on phones; the patient and the story's pictures float inside the story card.
- **Reviewer fixes** (one reviewer, all 11 locales): a real "fewer" story (the bees round: "6 fewer bees than butterflies" — the prose promised "how many fewer" and no round asked it); it divides with ":", sv and fi multiply with "·"; Groups hints say "group" (stories use baskets, bowls, plates); the decoy prose says "the wrong operation, either way"; fr «Combien d’oies…», no «skåler», fi «Niistä syödään», «Pupuja hyppelee», «yksi pari», it «in più rispetto a», sv «den hemliga rutan», en «onto 3 plates»; "where the number belongs" in en/fr/es/it/pt prose. Declined: decoys 17 and 13 for the two rewritten rounds (each would push drop-biggest over 40 %).
- The design's "Film lab" free play was not built (the round advances on success).

## Gates
| Gate | Result |
|---|---|
| verify-story-film-core (own answer table; every tile binding × mystery × dial; clause numerals × 11; equations evaluated) | 12,245 / 0 |
| mutate-story-film | 17 / 17 killed, control survives |
| local-test-story-film (11 locales × 320–1366, real clicks + keyboard + intro skip, every round of every level at rest and solved) | 21,046 / 0 |
| visual-qa | 96 renders green |
| hierarchy | 626 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |
| variety (production, en) | 16 distinct, pass 2 reshuffled |
| live-verify-story-film (11 pages 200; en/de/sv/fi × 1366/390, real pointer: place, mark, a wrong dial, heal) | 67 / 0 (first run inside the Cloudflare window failed the de/sv/fi embeds) |

## Open (page metadata — for the operator)
- Frozen intros: nl «tikt het antwoord in» and it «infine digita la risposta» (the answer is dialled, not typed); es «con el zorro veterinario» / pt «com a raposa veterinária» (the vet is never named, the patients change); «ohne Anmeldung» (de), «sin registro» (es), «senza registrazione» (it), «Jogo sem cadastro» (pt), «sans inscription» (fr) — no-sign-up claims. Not changed — metadata.
