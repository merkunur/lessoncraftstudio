export const meta = {
  name: 'redesign-wave',
  description: 'Redesign a wave of game specs from activities into mission games (design, author, verify)',
  phases: [
    { title: 'Design', detail: 'pick the frame, invent the world, state the isomorphism' },
    { title: 'Author', detail: 'write the redesigned spec to disk' },
    { title: 'Verify', detail: 'adversarial: three deletion tests, F-42 gate, linter' },
  ],
}

const G = 'C:\\Users\\rkgen\\lessoncraftstudio\\games'

const DOCTRINE = `
## What you are doing and why

${G} holds 200 designed K-3 educational games. The operator's verdict, verbatim:

  "The games you designed are just activities. The purpose of the educational game is to let the kid
   have fun while training the skills. The game has to have a mission or purpose. The kids need to be
   involved in the mission by making the character do something while on the way solving math problems
   or training skills. Here the training is rather hidden in the game. The character should not be
   static, it needs to move around and complete missions. The game has to be engaging and fun so that
   kids want to play it for the sake of playing and completing something rather than for the sake of
   training their skills."
  ... followed by: "You should redesign all 200 games."

Measured: 183 of 200 specs say "the child taps"; one says "mission"; of the 182 specs declaring a
mascot, ~110 are a {y:"-=14", yoyo:true} bobber that returns to its own coordinate.

## READ THESE FIRST - they are binding and they are short enough

1. ${G}\\design\\GAME-DESIGN-LAW.md   - the ruling, the THREE deletion tests, the Displacement rule,
   the band policy, the F-42 gate, the RATCHET RULE, the banned "losing states in costume".
2. ${G}\\design\\MISSIONS.md          - the FOURTEEN frames. Read the frame catalogue (section 2),
   the Single-State Law (1.1), the three structural laws (1.2) and the MISSION LAYOUT (1.4).
3. The game's own current spec: ${G}\\design\\specs\\<NNN-slug>.md - read it END TO END.

## The law in one line

MOVING IS SOLVING. The character's action in the world is isomorphic to the cognitive operation.
Not "solve then move" - moving IS how you solve.

THE SINGLE-STATE LAW: there is ONE state variable S with TWO readings, mathematical and physical.
Practical test: if the correctness check compares a tap to a stored 'answer' field it is a worksheet;
if it asks whether THE WORLD WILL ACCEPT THE MOVE it is a game.

THE DISPLACEMENT RULE (the sharpest check): answer = f(character.position). If the commit handler
reads a tile id and THEN animates the character walking there, that is answer-then-arcade with a
shorter arcade, and it is REJECTED.

THE JOURNEY IS ALONG THE APPARATUS, NOT BETWEEN PLACES. The trail IS the number line. Never a world
screen plus a problem panel - that is a split-attention format (g = 0.63 against you) and it is banned.

## Absolutely invariant - a violation is a failed redesign

- NO timer, countdown, clock, lives, game over, losing state, score, points, stars or badges.
  Exactly ZERO ways a session ends other than finishing.
- THE RATCHET RULE: nothing in the world may ever decay. Every mark the child makes stays made.
  Banned "losing states in costume": the character falls / drowns / gets tired / runs out of anything;
  a collected item is dropped or taken back; a built thing collapses; a companion leaves; the goal
  moves further away; a path closes behind you; a meter empties.
- THE CHARACTER IS NEVER THE CONSEQUENCE. No fall, no denial, no sad face, no hurt. An error changes
  the APPARATUS, never the creature.
- Invalid moves are REFUSED, not punished. Success is certain: the 3-attempt ladder always completes.
- Tap only. Tap floors 80px at band 5-6, 56px at 6-9. Keyboard Tab/Enter must work.
- Fixed 720x560 stage (max 720x720), Scale.FIT, NO scrolling, static camera, legible at 400px wide.
- <=10 interactive elements, counting the character and every station; a multi-key instrument
  (keypad, dial) counts as ONE.
- Text budget: band 6-8 <= 8 English words TOTAL including the mission premise; 8-9 <= 2 short
  sentences. The mission does not buy an exemption.
- INTEGRATED, NEVER CONCEALED. The abstract notation (numeral, symbol, ten-frame, equation) is
  VISIBLE in the same frame as the fiction at the moment of the answer. The mission supplies the
  reason; it never replaces the cue. Do NOT turn the game into a word problem.
- Engine reality: no sprites, no spritesheets, no physics, no path-following. Motion is tweening a
  container between points; poses are discrete swapped SVG drawings (idle/walk/happy/think/oops/act).
- Characters are ANIMALS (people are never drawn). Culturally neutral, metric, no holidays.
- Palette: cream bg, teal 'structure', ONE coral 'accent' per screen, no red anywhere.
`

const SCHEMA_RULES = `
## The spec schema you must produce

Keep the twelve required headings IN ORDER (the linter checks this):
## Identity / ## Learning / ## How it plays / ## Art registry / ## Animation registry /
## Screen layout / ## Visual specification / ## Content / ## Rules / ## Strings / ## Sound /
## Testing checklist
... and INSERT two new headings, "## Mission" and "## World", immediately after "## Learning".

- "## Identity" keeps Slug, Subject/topic, Age band, Interaction pattern (UNCHANGED - pattern is now
  only how the finger reaches the world) and Estimated build size (300-800), and GAINS a line:
      - Frame: THE CLIMB
  using the EXACT uppercase frame name from MISSIONS.md.
- "## Learning" is COPIED VERBATIM, byte for byte, from the original spec. Objective, Prerequisites,
  Curriculum links and every numbered misconception. Do NOT reword it. The one permitted change: each
  misconception's "Response:" is RE-STAGED against the new apparatus - the diagnosis and the count
  stay identical, the choreography changes. The number of misconceptions may NEVER fall.
- "## Mission" must name the single state variable and BOTH its readings (mathematical and physical),
  state the isomorphism explicitly, and give the want (the visible lack) and the goal.
- "## World" must lay out zone W (56-420, the world: board, hero, destination, history) and zone H
  (420-560, at most five controls, may be empty) per MISSIONS.md 1.4.
- "## Screen layout" and "## Visual specification" MUST NOT contain a dot rail, the word "rail", or
  ART.dotEmpty / ART.dotFull. Progress is diegetic. (Those entries may still exist in the Art registry
  for the Finish screen only.) THE LINTER FAILS THE SPEC IF YOU LEAVE THE RAIL IN.
- "## Rules" must still literally contain the phrases: Item count, Difficulty progression, Adaptation,
  correct answer, wrong answer, Retry behaviour, Finish condition. It must also declare the
  ANTI-BRUTE-FORCE guard by name (P1's tile re-shuffle is impossible in a persistent world, because a
  station that jumps when you knock on it destroys the world's constancy).
- "## Sound" must mention ?sound=off. "## Testing checklist" must keep its five mandatory items
  (11 languages, narrow width, keyboard, never auto-starts, no losing state) and add checks for the
  mission, the ratchet rule and the instant-cut test.
- Every ART.<key> referenced anywhere must be declared in the Art registry, and no emoji may appear
  outside the Art registry.
- Total length >= 9000 characters (the originals run 12k-26k; do not write a thin spec).
`

const DESIGN_SCHEMA = {
  type: 'object',
  properties: {
    n: { type: 'string' },
    frame: { type: 'string', description: 'the EXACT uppercase frame name from MISSIONS.md, e.g. THE CLIMB' },
    title: { type: 'string', description: 'the new game title - a real game name a child would say, not an exercise label' },
    hero: { type: 'string', description: 'which animal, and what it wants' },
    want: { type: 'string', description: 'the visible lack, legible in a single still frame' },
    stateVariable: { type: 'string', description: 'S, with BOTH readings: mathematical and physical' },
    isomorphism: { type: 'string', description: 'exactly how moving IS solving - the crux' },
    world: { type: 'string', description: 'zone W layout with real 720x560 coordinates' },
    hand: { type: 'string', description: 'zone H controls, or EMPTY and why' },
    refusal: { type: 'string', description: 'what the world does on an illegal move - refusal, never punishment, never on the character' },
    progress: { type: 'string', description: 'diegetic progress: what visibly shrinks or grows. NOT a dot rail' },
    finish: { type: 'string' },
    antiBruteForce: { type: 'string', description: 'the NAMED guard replacing P1 tile re-shuffle, which a persistent world forbids' },
    misconceptionRestaging: { type: 'string', description: 'for EACH misconception in the original spec, how its enacted correction is re-staged on the new apparatus. Name any that resist.' },
    deletionTests: { type: 'string', description: 'prove all three fail: delete the maths / delete the mission / delete the walking (instant-cut)' },
    risks: { type: 'string' },
  },
  required: ['n', 'frame', 'title', 'hero', 'want', 'stateVariable', 'isomorphism', 'world', 'hand', 'refusal', 'progress', 'finish', 'antiBruteForce', 'misconceptionRestaging', 'deletionTests', 'risks'],
}

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    n: { type: 'string' },
    linterPass: { type: 'boolean' },
    linterOutput: { type: 'string' },
    deletionA: { type: 'boolean', description: 'delete the maths -> nothing playable survives' },
    deletionB: { type: 'boolean', description: 'delete the mission -> nothing playable survives' },
    deletionC: { type: 'boolean', description: 'TRUE if the instant-cut LOAD AUDIT passes: under duration:0 the item log is IDENTICAL (a difference means travel time is carrying a mechanic — a disguised timer — and is a FAIL), AND the total traversal time per session is small and is stated as a number in the spec. Test C is NOT the isomorphism proof; that is displacement.' },
    displacement: { type: 'boolean', description: 'answer = f(character.position), not a tile id then a walk' },
    noLosingState: { type: 'boolean' },
    ratchetHeld: { type: 'boolean' },
    characterNotConsequence: { type: 'boolean' },
    misconceptionCountOriginal: { type: 'number' },
    misconceptionCountNew: { type: 'number' },
    notationVisible: { type: 'boolean', description: 'integrated not concealed - the numeral/symbol is on screen at the moment of the answer' },
    elementBudgetOk: { type: 'boolean' },
    verdict: { type: 'string', description: 'PASS or FAIL' },
    findings: { type: 'array', items: { type: 'string' }, description: 'every defect, most severe first' },
  },
  required: ['n', 'linterPass', 'deletionA', 'deletionB', 'deletionC', 'displacement', 'noLosingState', 'ratchetHeld', 'characterNotConsequence', 'misconceptionCountOriginal', 'misconceptionCountNew', 'notationVisible', 'elementBudgetOk', 'verdict', 'findings'],
}

const games = args

log(`redesigning ${games.length} specs`)

const results = await pipeline(
  games,
  (g) => agent(
    `You are an expert designer of games for 5-9 year olds, working on game ${g.n} (${g.slug}), band ${g.band}, current pattern ${g.pattern}.\n\n${DOCTRINE.replace('<NNN-slug>', g.n + '-' + g.slug)}\n\n## Your task\n\nRead the current spec at ${G}\\design\\specs\\${g.n}-${g.slug}.md end to end, then read GAME-DESIGN-LAW.md and MISSIONS.md. Design the MISSION that turns this activity into a game.\n\nPick the frame that genuinely fits - do not force one. Invent a world, a hero with a want, and a goal. The maths must be the steering. Give real coordinates on the 720x560 stage.\n\nBe concrete and be honest: if a misconception's enacted correction cannot be re-staged on your new apparatus, SAY SO rather than quietly dropping it. If this game is one that resists a world layer (high-density retrieval, or an apparatus that will not become terrain), say that too and design the smallest honest change: a want, an agentive character and diegetic progress, without forced travel.`,
    { label: `design:${g.n}`, phase: 'Design', schema: DESIGN_SCHEMA }
  ),
  (design, g) => agent(
    `You are an expert spec writer for K-3 educational games. Write the FULL redesigned spec for game ${g.n} (${g.slug}) and SAVE IT with the Write tool to exactly:\n\n  ${G}\\design\\specs\\${g.n}-${g.slug}.md\n\n(overwriting the existing file - the original is safe in git).\n\n${DOCTRINE.replace('<NNN-slug>', g.n + '-' + g.slug)}\n\n${SCHEMA_RULES}\n\n## The approved mission design you are writing up\n\n${JSON.stringify(design, null, 1)}\n\n## Method\n\n1. Read the CURRENT spec at ${G}\\design\\specs\\${g.n}-${g.slug}.md in full. You are rewriting it, not writing from nothing.\n2. Copy "## Learning" across verbatim, re-staging only each misconception's Response against the new apparatus.\n3. Rewrite How it plays as a concrete narrative of ONE full session, from the Start tap to the finish, with every branch (correct / wrong attempt 1 / wrong attempt 2 / show-me) and real coordinates.\n4. Rewrite the Art registry, Animation registry, Screen layout, Visual specification, Content and Rules around the new world.\n5. Read ${G}\\design\\catalogue\\BUILD-CONVENTIONS.md sections 2, 3, 4, 5, 8, 9, 10, 11, 16 first so your ART/ANIM/Rules blocks match the house contract.\n\nThen run:  node "${G}\\_tools\\lint-specs.js" --file "${G}\\design\\specs\\${g.n}-${g.slug}.md"\nand FIX every failure it reports, until it passes. Report what you wrote and the final linter output.`,
    { label: `author:${g.n}`, phase: 'Author' }
  ),
  (authorReport, g) => agent(
    `You are an ADVERSARIAL reviewer. Your job is to find reasons this redesigned spec is NOT a real game. Be harsh; a false PASS is far more costly than a false FAIL.\n\nGame ${g.n} (${g.slug}), band ${g.band}.\n\nRead:\n- the redesigned spec: ${G}\\design\\specs\\${g.n}-${g.slug}.md\n- the original, for comparison: run  git -C "C:\\Users\\rkgen\\lessoncraftstudio" show HEAD:games/design/specs/${g.n}-${g.slug}.md\n- ${G}\\design\\GAME-DESIGN-LAW.md and ${G}\\design\\MISSIONS.md\n\nRun the linter yourself:\n  node "${G}\\_tools\\lint-specs.js" --file "${G}\\design\\specs\\${g.n}-${g.slug}.md"\n\nThen judge, and COUNT THINGS rather than asserting them:\n\n1. THE THREE DELETION TESTS. (A) Delete the maths - is anything playable left? (B) Delete the mission - is anything playable left? (C) INSTANT CUT, and read GAME-DESIGN-LAW.md 2.2a for what it actually measures, because an earlier version of that table was self-contradictory: under duration:0 the item log must be IDENTICAL (a DIFFERENCE means travel time is carrying a mechanic - a disguised timer - and is the failure), and the total traversal time per session must be small AND STATED AS A NUMBER in the spec. Test C is a LOAD AUDIT, not the isomorphism proof - the isomorphism is proved by displacement (check 2), so do not fail a spec on C merely because its walk could be instant.\n2. DISPLACEMENT: does the commit read a POSITION, or does it read a tile id and then animate a walk? The second is answer-then-arcade and is an automatic FAIL.\n3. Count the misconceptions in the ORIGINAL "## Learning" and in the NEW one. If the new count is lower, FAIL and name the lost one.\n4. NO LOSING STATE, including in costume: does the character ever fall, tire, drown, run out, lose a collected item, watch a built thing collapse, or have the goal move away? Does anything in the world DECAY (ratchet rule)?\n5. THE CHARACTER IS NEVER THE CONSEQUENCE: on a wrong answer, does the character's state change? That is a FAIL - the apparatus changes, not the creature.\n6. INTEGRATED NOT CONCEALED: is the numeral/symbol/notation visible at the moment of the answer, or has the maths been buried in a story so it became a word problem?\n7. Element budget <=10 (character + stations + candidates; a keypad counts as one). Text budget for the band. Tap floors. Fits 720x560 with no scrolling. Legible at 400px.\n8. Is the frame used the one declared, and does it match MISSIONS.md's definition?\n\nReturn PASS only if every one of these holds.`,
    { label: `verify:${g.n}`, phase: 'Verify', schema: VERIFY_SCHEMA }
  )
)

const done = results.filter(Boolean)
const passed = done.filter((r) => r.verdict === 'PASS')
const failed = done.filter((r) => r.verdict !== 'PASS')
log(`wave complete: ${passed.length} PASS, ${failed.length} FAIL, ${games.length - done.length} dropped`)

return {
  passed: passed.map((r) => r.n),
  failed: failed.map((r) => ({ n: r.n, findings: r.findings, verdict: r.verdict })),
  misconceptionDeltas: done.map((r) => ({ n: r.n, was: r.misconceptionCountOriginal, now: r.misconceptionCountNew })),
  linterFailures: done.filter((r) => !r.linterPass).map((r) => r.n),
}
