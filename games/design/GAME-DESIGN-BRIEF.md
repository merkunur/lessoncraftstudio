# Brief: Design 200 educational games for LessonCraft Studio

> **Superseded 2026-09-05 (operator ruling: "The local ai should not have anything to do with the website or the games").** There is NO local model. Claude Code builds every game — see `../BUILD-WORKFLOW.md`. The "build model" constraints below (tokens per second, line budget, literalness) are the historical premise of the design phase and no longer bind anything. The 200 specs this brief produced are complete and remain the basis of every build.

You are the **designer** on this project. You will not write the game code. Your
output is a set of specifications precise enough that a less capable model can
implement them without making design decisions of its own.

Read this entire brief before starting. Then follow the phases in order and stop
at each checkpoint for my approval.

---

## 1. The division of labour

Three parties, three jobs. Respect the boundaries.

| Who | Does |
|---|---|
| **You (Claude Code)** | Research, pedagogy, game design, detailed specs, English content |
| ~~**A local model** (Qwen3.8-Flash-Next, self-hosted)~~ → **Claude Code** (ruling 2026-09-05) | Writes the actual game code from your specs |
| **The human** | Judges quality, tests with real children, requests corrections |

The build model is capable but literal. It generates about 23 tokens per second,
has no access to the web, and will not question a vague instruction — it will
guess. Every ambiguity you leave becomes a defect it cannot detect and the human
cannot diagnose, because **the human does not write JavaScript**.

Design accordingly. A spec that assumes good judgement downstream is a failed
spec.

---

## 2. Hard constraints on what can be built

These come from the live production environment. They are not negotiable and
they shape what games are even possible.

**One file per game.** Each game is a single self-contained `index.html` living
at `/games/<slug>/index.html`. No build step, no npm, no bundler, no frameworks
beyond Phaser.

**Phaser 3.90.0**, loaded locally from `/games/_lib/phaser-3.90.0.min.js`.
Not Phaser 4 — the build model does not know its API.

**No binary asset files, ever.** No PNGs, no JPGs, no sprite sheets, no audio
files. These would have to travel through a deploy pipeline whose asset copy
step is flat and non-recursive, and they are not worth that cost.

**Version 1 art is emoji, Phaser shapes and text.** Every visual must be
buildable from:
- Phaser primitive shapes (rectangles, circles, polygons, lines, arcs)
- Unicode emoji as characters, animals, objects and icons
- Text

**But the art will be upgraded later**, by a more capable model, to inline SVG
and richer animation. SVG is text, so it needs no pipeline changes. For that
upgrade to cost one edit per game rather than a rewrite, every spec must
require an **art registry**: a single declared block at the top of the game
file where each visual element is defined exactly once.

```javascript
const ART = {
  cat:   { kind: "emoji", value: "🐱", size: 64 },
  nest:  { kind: "emoji", value: "🪹", size: 64 },
  tile:  { kind: "shape", shape: "roundRect", w: 96, h: 96,
           fill: "surface", stroke: "line" }
};
```

Game code refers to `ART.cat`, never to `'🐱'` directly. Upgrading later means
changing one entry to `{ kind: "svg", value: "<svg>…</svg>" }` and nothing
else. **A spec that lets an emoji appear anywhere outside the registry has
failed**, because it makes the art upgrade a rewrite.

The same applies to motion: declare every animation once in an `ANIM` block
(what moves, how far, how long, which easing), never inline.

Design games that work well as emoji and shapes *today*. Do not design
something that only makes sense once real artwork exists — but do leave the
door open.

**Shared libraries already exist**, in `/games/_lib/`:
- `ui-strings.js` — 50 common interface strings in all 11 languages
- `theme.js` — brand colours, fonts, sizes
- `game-core.js` — language resolution, buttons, praise messages, start screen,
  iframe height reporting

Specs must use these rather than reinventing them. Assume `GameCore.t()` for any
common string, `THEME` for any colour or size, `GameCore.makeButton()` for any
button.

**Games must never auto-start.** The host page bills a play on mount, so play
begins only when the child taps Start. `GameCore.makeStartScreen()` handles this.

**Eleven languages**, resolved from a `?lang=` URL parameter:
`en de fr it es pt nl sv da no fi`
(`pt` is Brazilian Portuguese, `no` is Norwegian Bokmål.)

**Sizing:** games run in an iframe at unpredictable widths, on tablets and
desktops. Never assume a fixed viewport. Never use `vh` units with a
ResizeObserver — inside an iframe that creates a runaway growth loop.

**Practical size ceiling.** A single game file should be roughly 400–800 lines
including comments. Beyond that the build model's output quality falls off and
generation takes over fifteen minutes. If a design needs more, it is too big —
split it or simplify it.

---

## 3. Audience

**Ages 5–9**, spanning Kindergarten through Grade 3 and their equivalents.

That range is too wide for one game. Band every game to one of:
- **5–6** (K / Year 1) — pre-readers and early readers. Minimal text.
  Instructions must work as icons or be spoken by shape and colour alone.
- **6–8** (Grade 1–2) — reading simple sentences, adding within 20.
- **8–9** (Grade 3) — reading fluently, multiplication, longer attention.

State the band in every spec, and design to its *lower* edge.

**Critical for the 5–6 band:** a child who cannot yet read cannot be told the
rules. The game must be discoverable by tapping. If your design depends on a
sentence of instruction, it belongs in an older band.

---

## 4. Phase 1 — Research

Do genuine, current web research. Do not work from memory. Cite sources.

Answer these:

**4.1 What do people actually search for?**
Which K-3 educational game topics have real demand? Look at search trends,
popular educational game sites (ABCya, Splashlearn, Topmarks, PBS Kids,
Education.com, Coolmath4kids, Toy Theater, Mathsframe), app store rankings,
and teacher-forum recommendations. Identify the topics that appear repeatedly
across sources — those are the load-bearing ones.

**4.2 What do curricula require?**
Our eleven languages span many countries. Research the K-3 mathematics,
literacy and science expectations for at least: the US (Common Core), England,
Germany, France, Spain, Brazil, Italy, the Netherlands, Sweden, Denmark,
Norway, Finland.

Find the **common core across all of them** — the concepts every one of those
systems teaches at this age. Those concepts deserve the most games, because a
game covering them is useful in every market. Note explicitly where systems
diverge (for example, when formal reading instruction begins varies by years
across these countries, and Finland starts school at 7).

**4.3 What makes an educational game actually work?**
Research the evidence, not the marketing. Cover at minimum: retrieval practice,
spaced repetition, cognitive load theory, immediate versus delayed feedback,
the effect of extrinsic rewards on intrinsic motivation, and what the research
says about timers and competition for this age group.

**4.4 What do the good ones do that the bad ones don't?**
Examine several well-regarded K-3 games closely and several poor ones. What
specifically distinguishes them? Be concrete — "better design" is not an answer.

Write your findings to `research/FINDINGS.md` before moving on. Everything
that follows must be traceable to something in that file — if you later
specify a game that your own research doesn't support, that is a defect.

---

## 5. Phase 2 — Taxonomy and catalogue

**5.1 Define the interaction patterns.**

Two hundred entirely unique games would be neither buildable nor good. Children
this age benefit from familiar controls, because attention spent relearning an
interface is attention not spent on the content.

Define **8–12 core interaction patterns** — the ways a child can act. For each,
specify what it is, which age bands suit it, which subjects it fits, and its
accessibility implications. Drag-and-drop, for instance, is genuinely hard for
five-year-olds on a trackpad; note that kind of thing.

Every one of the 200 games must use one of these patterns. Variety comes from
content, presentation and difficulty, not from novel controls.

**5.2 Build the catalogue.**

Produce a table of all 200 games with: number, slug, title, subject, topic,
age band, interaction pattern, learning objective in one sentence, and a
one-line description.

Balance it deliberately. Propose the subject split and justify it against your
research — do not simply divide by four. Mathematics and literacy typically
warrant more weight than science at this age, but let the evidence decide.

Sequence it so that games 1–10 are the ones to build first: high-demand,
technically straightforward, spanning several patterns so we discover problems
early.

Check for redundancy. Two games teaching the same objective with the same
pattern are one game with two coats of paint. Some repetition is pedagogically
correct — practice needs repetition — but it should be a decision, not an
accident.

Write to `catalogue/CATALOGUE.md` and `catalogue/PATTERNS.md`, then continue
straight into Phase 3.

---

## 6. Phase 3 — Detailed specifications

Write all 200, in catalogue order, without stopping.

One file per game: `specs/NNN-slug.md`, using the template in section 8.

**Write each spec to disk the moment it is finished.** Do not hold work in
memory to write later. This run is long; a spec on disk survives an
interruption and one in memory does not.

**After every spec, append one line to `specs/PROGRESS.md`:**

```
NNN | slug | subject | pattern | age-band | done
```

That file is the record of where you are. If you are ever restarted, read it
first, find the highest number present, and resume from the next one. Never
redo a spec already listed there.

**Every tenth spec, pause to self-check** — not to ask me anything, just to
verify before continuing:
- Does every game so far use a pattern from `PATTERNS.md`?
- Could each one be built with shapes, emoji and text alone, with no image
  file? Name the emoji you are relying on.
- Are any two games effectively the same game?
- Is the subject balance still tracking the split you justified in Phase 2?

Record the answers in `specs/SELF-CHECK.md` and correct course if anything
has drifted. Do not wait for me to confirm.

Every spec must be complete enough that the build model makes **no design
decisions**. If it has to choose a colour, a size, a message, or a rule, you
have underspecified it.

---

## 7. The quality bar

What separates a good educational game from a bad one, applied to every spec.

**One objective.** A game teaching three things teaches none. State the single
objective as an observable behaviour: "counts objects up to 10 accurately",
not "understands numbers".

**The learning is the game.** The commonest failure in educational games is a
quiz wrapped in unrelated arcade action — answer a sum, then shoot an alien.
The child learns to endure the sum to reach the fun. Design so the interesting
part *is* the thinking part.

**Feedback teaches.** "Wrong" teaches nothing. Feedback should tell the child
something they can use: which part was right, what to look at again, why the
right answer is right. Anticipate the specific mistakes children make with this
concept — research them — and write a distinct response for each.

**Never punish.** No lives, no game over, no losing screen, no red X, no
buzzer. A wrong answer is information, and the child gets to try again. This is
not softness; failure aversion at this age suppresses the risk-taking that
learning requires.

**Timers are off by default.** Time pressure impairs performance for exactly
the children who most need practice, and it teaches speed rather than
understanding. If a game genuinely needs urgency, justify it explicitly and
make it optional.

**Difficulty adapts.** Later items should be harder than earlier ones, and the
game should respond to the child: repeated errors soften the next item,
repeated successes stretch it. Specify the rule precisely — how many correct
answers advance a level, how many errors ease it.

**Five to seven minutes.** Long enough to matter, short enough to finish.
Specify the item count.

**Success is certain.** Every child who keeps trying finishes. The variation is
in how efficiently, never in whether.

**Readable without reading.** State and progress must be visible at a glance —
what to do now, how far along, what just happened.

**Accessibility.** Tap targets at least 44px, 64px for the youngest band. Never
carry meaning by colour alone — pair it with shape, position or symbol; roughly
1 in 12 boys has a colour vision deficiency. Text large and high contrast. Full
keyboard operability. No flashing.

**Culturally neutral.** These ship to eleven language markets. Avoid national
currency, imperial units, culture-specific holidays, and names that only work
in English. Where a game needs a currency or a measurement, specify how it
varies by locale.

---

## 8. Specification template

Use this exact structure for every game.

```markdown
# NNN — [Title]

## Identity
- Slug: kebab-case-name
- Subject / topic:
- Age band: 5-6 | 6-8 | 8-9
- Interaction pattern:
- Estimated build size: ~N lines

## Learning
- Objective: [single observable behaviour]
- Prerequisites: [what the child must already know]
- Curriculum links: [which countries' standards, from research]
- Common misconceptions: [the specific errors children make here,
  and how this game responds to each]

## How it plays
[Narrative walkthrough of one complete session, from tapping Start
to the finish screen. Concrete: what appears, what the child does,
what happens. This is the section the build model leans on most.]

## Art registry
[Every visual element the game uses, declared once. Use the ART block
format. For each: a key name, kind (emoji or shape), the emoji or the
shape parameters, size, and which THEME colour tokens apply.
No emoji may appear anywhere in the game outside this registry.]

## Animation registry
[Every animation, declared once in an ANIM block: name, what triggers
it, what moves, how far, how long, which easing.]

## Screen layout
[Text diagram of the layout at a typical size, with approximate
coordinates. State what moves and what stays fixed when the width
changes.]

## Visual specification
- Background: THEME.colour.___
- Position and size of every element, referring to ART keys
- (No binary image files. Version 1 is emoji, shapes and text only,
  all routed through the art registry so it can be upgraded to SVG
  later without rewriting the game.)

## Content
[The actual items — every question, answer, word, number, or pair.
In English. Specify exactly how many items and in what order or
under what randomisation rule.]

## Rules
- Item count:
- Difficulty progression: [exact rule]
- Adaptation: [exact rule for easing and stretching]
- What happens on a correct answer: [including which praise string]
- What happens on a wrong answer: [specific, per anticipated mistake]
- Retry behaviour:
- Finish condition:

## Strings
- Which GameCore.t() keys this game uses
- Any game-specific strings needed, listed as key + English text
  (translation happens separately — English only here)

## Sound
[Which events would have sound. Web Audio tones only, no files.
Must respect ?sound=off.]

## Testing checklist
- [ ] Specific, checkable statements a non-programmer can verify
- [ ] Include: works in all 11 languages, works at narrow width,
      keyboard operable, never auto-starts, no losing state
```

---

## 9. Anti-patterns

Do not produce any of these. They are the standard failures of the genre.

- A quiz with unrelated arcade action bolted on
- Points, stars or badges that aren't tied to actual learning
- Instructions a child in the target band cannot read
- Anything requiring a binary image or audio file
- Emoji or colours written inline in game code instead of through the
  art registry — this makes the later art upgrade a rewrite
- A design that only works once real artwork exists
- Timers on games that don't need them
- Meaning carried by colour alone
- A losing state of any kind
- Text that assumes English word order or English-length words
  (German compounds and Finnish inflections run much longer — leave room)
- Designs that assume a mouse; many of these children use tablets
- More than one learning objective in one game

---

## 10. Deliverables

```
research/FINDINGS.md            Phase 1 output
research/ASSUMPTIONS.md         Judgement calls made without asking
catalogue/CATALOGUE.md          All 200 games, tabulated
catalogue/PATTERNS.md           The interaction patterns
specs/001-slug.md               One per game
specs/002-slug.md
...
specs/200-slug.md
specs/PROGRESS.md               One line per completed spec
specs/SELF-CHECK.md             Every-tenth-spec verification
specs/SUBSTITUTIONS.md          Games replaced, with reasons
FINAL-REPORT.md                 Written last
```

---

## 11. How to proceed

**Run all three phases straight through without stopping.** Do not ask for
approval between phases, between batches, or between specs. Do not ask whether
to continue. The work is complete when `specs/` holds 200 specifications and
`specs/PROGRESS.md` has 200 lines.

Order: Phase 1 research → `research/FINDINGS.md` → Phase 2 catalogue and
patterns → Phase 3, specs 001 through 200 → final report.

**Before you begin**, note in `research/ASSUMPTIONS.md` anything in this brief
you find unclear, wrong, or in tension with your research — including
disagreement with my constraints. Then make your best judgement, record which
way you went and why, and carry on. Do not stall waiting for an answer.

**If you cannot finish in one session**, that is expected. Leave the work in a
resumable state at all times: specs on disk, `PROGRESS.md` current. On restart,
read `PROGRESS.md` and continue from the highest number present.

**If a game cannot be built within these constraints**, do not specify
something impossible and do not stop. Replace it with a workable alternative
covering the same objective, and log the substitution in
`specs/SUBSTITUTIONS.md` with the reason.

**When all 200 are done**, write `FINAL-REPORT.md` covering: the final subject
and age-band distribution, pattern usage counts, every substitution made, every
assumption from `ASSUMPTIONS.md` and how it was resolved, anything you consider
weak or risky, and your recommended build order for the first twenty games with
reasoning.
