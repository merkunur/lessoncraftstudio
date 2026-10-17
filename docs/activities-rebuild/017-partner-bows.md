# #17 — Which Group Has More? → THE PARTNER BOWS (K.CC.C.6)

ORDER row 17 · id `choice-board.which-more.k-c-c-6` · own files `partner-bows-core.js`, `partner-bows-activity.js`, `partner-bows-activity.html`, `partner-bows-activities.json`. The row left `choice-board-activities.json` (removed as text, 200 lines; the file stays LF like HEAD). All 11 locales' slugs, titles and intros were already authored and stay frozen.

## The skill
K.CC.C.6: say whether the number of objects in one group is greater than, less than or equal to the number in another — by matching and counting strategies, up to 10.

## The apparatus and its invention: THE PARTNER BOWS
- Two mats of pairs that belong together (bee–flower, bunny–carrot, squirrel–acorn, mouse–cheese, snail–leaf, robin–birdhouse; contact sheet: the spring nest already holds chicks and the Easter egg is a painted egg, so bird–nest and chick–egg are out).
- The spacing trick: in most tricky rounds the smaller group is spread over its mat and the bigger one huddled (the conservation trap), in the others the bigger group is spread, and in "same" rounds one of each — so spacing NEVER predicts the answer (the huddled group has more in 40–60 % of tricky rounds, gated). The "Even" setting removes it.
- Pairing: tap one in one group (gold glow), then one in the other — both wear the same bow, a colour AND a knot shape (never colour alone). Tap a bowed one → apart. Whoever has no bow shows the answer. Counting is the other honest way.
- Answers: "More" in each mat's top-right corner (a place no creature is ever placed in; two on the 320 phone), "The same" between the mats.
- Check: none → start hint; wrong → miss 1: pair them up / look who has no partner (nothing done for the child); miss 2: the rest paired for the child, the lone ones ringed (only until a change). Right → every pair bowed, both groups numbered, "10 is more than 7" (numbers only: no noun inflection anywhere).

## Why it differs
#15 Twin Pools ties strings for the child as the proof of a count-out; here the child makes every pair and the comparison is the task. Row 18 (Friendship Bridge, also K.CC.C.6) must take another road.

## Layout
Stacked mats: wide 6 × 2 (cell ≤ 112, picture cell − 6), stack 4 × 3 (cell ≤ 66, picture cell − 2), narrow 6 × 2 at the 320 phone. "More" sits inside the reserved corner cell.

## Settings
Numbers up to 5 / up to 10 · Spacing tricky / even.

## Gates
verify-partner-bows-core 503 · mutate-partner-bows 22/22 · local-test 11 locales × 7 widths 1664/0 · visual-qa 54 · hierarchy 824/0 · settings-efficacy 2 live (`--tool=partner-bows-activity`) · preflight PASS · content ×11, prose-claims, SERP, tells PASS.

## Review (one reviewer)
MUST-FIX (pedagogy): the first version always spread the SMALLER group, so "pick the huddled group" won every round — a reverse tell; the rounds now mix, and the gate asserts the spacing never predicts the answer. Also: sv/da/no "Flest" → "Fler"/"Flere" (two groups take the comparative); it "Uguale" → "Tanti quanti"; es/pt fuller "same" celebrations; da written-standard "De, der …"; spacing labels no longer claim "the smaller group spread out"; the prose says the trick is "not always".
