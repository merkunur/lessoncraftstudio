# #175 — Pearl's Opinion Page → THE SIGN THAT STANDS ON ITS REASONS (RI.2.8; all 11 locales)

ORDER row 175 · id `pearl-opinion-page.back-it-up.ri-2-8` (kept). Design: `designs/175-pearl-opinion-page.md`.

## The invention
- **Pearl's point is a wooden sign lying on the beach.** The child slides a card under it and presses Check: a wave rolls up the beach and tests it.
- **The tide shows what each card really is:**
  - a REASON is a post that lifts the sign out of the water — it stays dry;
  - a RESTATEMENT is only a second copy of the sign, stacked on top and soaked, with the words it shares with the point glowing;
  - an OFF-TOPIC card is a post planted beside the sign, holding nothing, its shared word glowing;
  - in Level 2 a reason under the wrong sign leans against it;
  - in Level 3 one reason holds the sign up but it tilts — it needs two.
- **Second miss:** the locale's "because" appears under the sign and in front of every card, so the sign reads "‹point› because ‹card›" and the child hears which one makes sense.
- **Success:** "Backed up! ‹point› — because ‹reason›" (Level 1), "Both points are backed up!" (Level 2), the two reasons named (Level 3); a token goes on the dunes; Next 0.5 s later.
- **Settings:** Level (Back it up / Which point? / Two strong legs) and the "Because" bridge (prints the word under the sign from the start).
- **A speaker button** reads the point and the cards aloud, which keeps the frozen pt and it intros' 🔊 promise true.

## Rounds
- **Points:** 8 per locale.
  - de/fr/es/pt/it/nl/en keep their shipped points byte for byte. pt keeps its own three different points (water vs soda, the dog as the best pet, recycling).
  - sv/da/no/fi have new points on the same topics.
- **Cards:** every point has two reasons, one restatement and one off-topic card, all written new.
- **Levels:**
  - Level 1: R1 on even passes, R2 on odd passes.
  - Level 2: the design's 8 pairs. The reviewer signed that no reason fits the other sign.
  - Level 3: R1 R2 S O.
- **Card positions:** a rotated slot table puts the right card in no slot more than 3/8 (Level 1) or 5/8 (Levels 2–3).
- **Order:** reshuffled each pass, never the previous order.

## Answer tells removed (measured; ceilings in the gate)
- **The old modal tell:** the restatement carried *should* in 7–8 of 8 rounds; it is now ≤ 2 of 8 in every locale.
- **Length:** in each round the reason, the restatement and the off-topic card take the longest, middle or shortest place on a fixed balanced pattern, assigned per locale by search. Every bot lands on the reason ≤ 3/8: longest, shortest, middle length, most point-words, no modal (≤ 3.25). The combined bot is ≤ 4/8.
- **Shared words:** every off-topic card shares a word with its point; every reason does too. The "fewest point-words" bot is a coin toss between reason and off-topic, ≤ 5/8 (the design accepts it).
- **The evaluative tell (found by the reviewer):** restatements leaned on "right / perfect / great plan". It is now ≤ 2 of 8 in every locale, and other cards carry such words too.
- **Level 3:** "the two longest" ≤ 3/8 and "the two shortest" ≤ 3/8.

## Deviations from the design
- **Placing a card does not transform it.** A card becomes a post, a copy or a lonely post only when the tide comes. The design's instant transformation on placement would have shown the answer before the Check.
- **The second-miss help does not grey out the wrong joins** (that would name the answer). It prints "because" in front of every card and under the sign, and the child reads which makes sense. It lives in the cards, not a separate panel, so a 320 phone keeps the cards above the fold.
- **Interaction:** tap, not drag. Level 2 is tap a card, then tap a sign. Keyboard: Tab / Enter, and C sends the tide.
- **Data:** lives in `reason-sign-data.js`, built per locale. The manifest row has params `{}` and task_template `reason-sign`. The old `reason-support-core.js` stays unused; its gates are retired.
- **Phones:** the Check button and Pearl sit right under the beach, the "because" label sits beside each socket, and Levels 2–3 lay the cards out in two columns. At 320, solved, the buttons step back so the success line and Next stay above the fold.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **Clean:** no wrong role, no false fact, and no Level 2 reason that fits the other sign.
- **SEVERE, fixed:**
  - sv/da/no reasons opening with an infinitive ("att läsa…") read as "in order to" after för/for. They are now noun-led ("Läsning…", "Vatten…", "En släckt lampa…").
  - Two de nominalised infinitives needed a capital ("Tägliches Lesen", "Wassertrinken").
  - The es/it "tap the sign it backs up" line was ambiguous.
  - fr elision was confirmed in the render ("parce qu’un casque").
- **MINOR, fixed:** sv garden point, da dogs point (*luftes*), da/no "for ingenting" calques, fi spellings and phrasing, it overclaim ("Si può cadere"), several strings and prose lines, and the da intro ("holder sig tørt").
- **Found by me:** the de restatement "Kinder brauchen…" kept its noun capital after *denn* in the help (gated).

## Gates
- `verify-reason-sign-core.js` 8,952/0 — its own truth (roles from the card keys, its own modal / evaluative / stem tables, the frozen kept points, its own copy of the signed Level 2 pairs); the bots under measured ceilings; every round of every level and pass; the slot table; the hand; the reshuffle; the strings; the "because" assembly run through the activity (fr elision).
- `mutate-reason-sign.js` 26/26 killed; the control passes.
- `local-test-reason-sign.js` 1,839/0 in all 11 locales (real taps and keys, every miss, the because help, success lines, Next 0.5 s, the speaker, Levels 2–3, the fold at 320/360, every state resized through 320…1366).
- Visual QA ×11 locales: 288 renders each (6 phases × 8 rounds × 6 viewports), all PASS; tablet reach included. pt r6 solved @320 failed twice only while another browser suite ran in parallel; alone it passes (Next at 557/640) — load timing, not layout.
- Hierarchy 243/0; settings efficacy 2 live (level, bridge); prose claims, SERP copy, content tells, route preflight and Next delay all PASS.

## Live (2026-10-31)
- Deployed with `a4c87192f`; payment canary OK. Wrapper 9.921.
- `live-verify-reason-sign.js --locales=en,de,sv,fi`: 60/0. All 11 pages return 200. At 1366 and 390 a real tap on the restatement + the tide is a miss (a soaked copy of the sign); the copy taps back; the reason + the tide stands the sign dry, solved; the iframe grows with the card.
