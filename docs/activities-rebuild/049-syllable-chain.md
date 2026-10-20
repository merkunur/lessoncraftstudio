# #49 — Forma la parola con le sillabe (it) → LA CATENA DELLE SILLABE, the syllable chain (RF.K.2.B, Italian only)

ORDER row 49 · id `syllable-builder.forma-la-parola-con-le-sillabe.rf-k-2-b` (kept).

- **Files:**
  - Added: `syllable-chain-core.js`, `syllable-chain-activity.js`, `syllable-chain-activity.html`, `syllable-chain-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 6 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** Italian only by design.
- **Metadata:** slug, title and intro are frozen. The it prose is rewritten: the old prose split *gatto* as «GA e TTO», which contradicts the school rule that the doppie divide (gat·to).
- **Strand chip:** overridden to «Consapevolezza fonologica»; the RF default «Lettura» is a reading strand.
- **Design:** `designs/049-syllable-builder.md`. **Prefix:** `scn-`.

## The apparatus and its invention: A CHAIN WHOSE HOOKS ARE SYLLABLES
- **The chain:** it hangs from a brass hook. Each link is a ring holding a library picture with its word written split underneath. The open clasp at the end shows the last syllable of the last word.
- **Catene corte / Catene lunghe:** the basket holds three pictures:
  - the answer (STARTS with the clasp syllable);
  - a trick picture (ENDS with it);
  - a plain picture that starts with the SAME SOUND but a different spoken syllable.
- **Hooking:** tap a card (it is spoken and lifts) and tap it again, or tap the open clasp, or drag the card onto the clasp. The hook is the check:
  - **Right:** the clasp clinks shut, engraved with the shared syllable, and a new open clasp appears.
  - **Wrong:** the two half-rings show their two syllables side by side («la | gu»), and the card swings back.
  - **Miss 2:** every card shows its first syllable on a tag.
  - **Unhooking:** tapping the last link (never the start link) unhooks it.
- **Conta e forma:** one big link and a picture.
  - Set the boxes with + / − (1–5), then press Conta:
    - too few: the last box holds the rest, crammed;
    - too many: the extras stay empty;
    - miss 2: the boxes light one per beat.
  - Then fill the boxes with the syllable tiles and press Controlla: the right boxes lock, the wrong tiles return, and at miss 2 the next tile flies in.
- **Success:** the chain rings link by link and its joint syllables join the festone (the garland) at the top.
- **Settings:** Livello, Trabocchetto (Sì / No), Sillabe sulle immagini (Dopo l'aggancio / Sempre).
- **Keyboard:** ← / → move between cards, Enter twice hooks, Backspace unhooks; + / − set the boxes.

## Deviations from the design (each measured or ruled)
- **Chains rebuilt after the picture check, the gate and the review** (8 short + 9 long chains, from the design's 9 + 9):
  - **sofà out:** around the house/sofa is a couch a child calls «divano».
  - **Plain cards (the gate):** in the design's baskets no plain card shared the clasp's first sound, so matching the first LETTER solved 100% of steps. Every step now carries a same-sound plain card (lu·na for «la», ni·do / nu·vo·la for «na», se·dia for «so», taz·za / ten·da for «to» / «ta»). The same-letter bot now solves 0.000.
  - **Answer pictures a child names otherwise (review):**
    - vespa (the wasp reads as «ape»);
    - tastiera («pianola»);
    - remo (unknown, «pagaia»);
    - lago (a landscape);
    - toro (a cute calf, «mucca»; it was the answer 4 times).
    - New chains: chia·ve → ve·sti·to → to·po; lu·ma·ca → ca·ro·ta → ta·vo·lo; sco·pa → pa·la → la·ma; pen·na → na·ve → ve·sti·to; pe·ra → ra·na → na·ve → ve·sti·to; vol·pe → pe·co·ra → ra·na → na·so; stel·la → la·ma → ma·ti·ta → ta·vo·lo. The new pictures were checked on a contact sheet.
  - **Plain cards whose SPOKEN start is the clasp syllable (review):** pen·na beside «pe», tor·ta beside «to» → piu·ma, taz·za.
  - Catene lunghe round 7's *bot* step had no possible trick picture; that chain is gone.
- **Tap = select, tap again = hook**, so a first tap only names the picture (the design had tap = speak only, which left touch users drag-only).
- **The festone** is a row of drawn rings with the joint syllables («la ma»). A phone shows the newest 4 chains, so it never grows past two rows.
- **Medium-risk answers kept** (the reviewer accepted them): na·ve («barca»), la·ma («alpaca»), pe·co·ra («agnellino»), mo·ra.
- **Not built:** the festone lighting link by link at the end of a pass; the drag-the-link's-edge socket control (+ / − only).

## Gates
- **`verify-syllable-chain-core.js`: 2,051 checks, 0 failures.** Its own oracle carries every word, split, picture and chain. It checks:
  - **Data:** splits = `approved-words-it.json`; every picture exists and its it label is the word.
  - **Every step:** it joins; no picture comes back in a chain; three different cards; exactly one starts with the clasp syllable; the trick picture ends with it; a same-sound plain card; no other card starts with the clasp when spoken; never the wasp, keyboard, oar, lake, calf-like bull or sofa as an answer.
  - **Hooking:** EVERY card at EVERY step, with the trick picture on and off.
  - **Help and unhooking:** miss-2 tags; a right hook resets the help; unhook only the last link.
  - **Bots** (2,000 deals): left card 0.344 / 0.319; same first letter 0.000; "the syllable anywhere" solves 0.000 of whole chains.
  - **Conta e forma:** EVERY fill order of every word; counts 2×2 3×3 4×3 5×2.
  - **Also:** the hints, the order rule, the strings and the frozen manifest.
- **`mutate-syllable-chain.js`:** 23 of 23 mutations killed, including the wasp, pen·na and tor·ta coming back. The "two-link unhook" mutation survived once, because the test only ever had one hooked link; it was strengthened.
- **`local-test-syllable-chain.js`:** 2,153 checks, 0 failures.
  - **At 704, a real pointer** through every round of every level: tap-tap, drag onto the clasp, the trick card, miss-2 tags, unhook, every count case (the five-syllable words cannot be "too many": miss 2 comes from a second short count), tile order, settings and keyboard.
  - **The sweep 320–1366** at rest, miss and done asserts: no sideways scroll, controls ≥ 44 px, no link overlap, text ≥ 14 px, pictures ≥ 64 / 96 px, every control above the fold.
- **Other gates:**
  - `visual-qa-activity.js --locale=it`: 48 renders pass;
  - `audit-activity-hierarchy.js`: 338 / 0;
  - `audit-settings-efficacy.js`: 3 live;
  - the it content gate, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are green.
- **Read by me:** four contact sheets; rest, miss and done at 360, 704 and 1024; the preview.

## Review (one agent, Italian native + scuola dell'infanzia pedagogy): applied
- **Required, all applied:**
  - the five answer pictures (above);
  - pen·na / tor·ta as plain cards;
  - ariaHooked «{word} agganciata a» (wrong for masculine words) → «{word} si aggancia a «{syl}»».
- **Optional, applied:**
  - hintSlow «Di' «{prev}» piano piano: l'ultimo pezzetto è «{syl}».»;
  - «Catene completate»;
  - prose «fa riferimento alle Indicazioni nazionali, campo …» and «quando il gancio dice «la»»;
  - the gufo step's plain cards are both f-words.
- **Checked correct:** every split (doppie divided, s impura with the next syllable), every joint sounds the same in both words, every trick card truly ends with the clasp, and the English source.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The title** says «Fonetica», the science of phonetics; the right term is «consapevolezza fonologica».
- **The intro** describes only the old build task, not the chain. «fondere … le sillabe» is a calque of "blend"; Italian teachers say «unire» or «fusione sillabica».

## Deploy (2026-10-20)
- **Commit c858534a.** deploy.sh returned EXIT 0, with 0 payment-canary failures. The it page returns 200. The preview webp was copied to the server before the build.
- **Production play: 22 / 22** (it at 1366 and 390).
  - Palla: sca·la tapped twice will not close (a miss); la·ma dragged onto the clasp closes; ma·no → the chain is closed.
  - Stel·la → la·ma → ma·ti·ta → ta·vo·lo by tap-tap.
  - Cane on one box → ca·ne crammed (a miss); two boxes → ca + ne = cane.
  - The wrapper version matches, and the iframe grows with the card.
- **The live phone shot (390)** is clean.
- **Live variety probe (it):** 8 distinct rounds, and pass 2 is reshuffled.
- **Server disk after the deploy:** 134 GB available of 436 GB (68 % used).
