<!--
  Lesson-plan markdown template — Pillar 1 Phase 1c authoring.

  Schema authority: frontend/scripts/seed-lesson-plans.js (Phase 1b ship `4921786e`).

  ─── topicSlug whitelist ────────────────────────────────────────────────
  Must match a row in the Topic table (39 rows seeded at `1114dedb`).
  Source of truth: frontend/config/topics-taxonomy.json axes.
    axes.exercise-type.<key>     — 30 values (e.g. addition, sudoku, crossword, ...)
    axes.theme.<key>             — 4 values  (animals, vehicles, food, fruit)
    axes.educational-level.<key> — 5 values  (preschool, kindergarten, grade-1, grade-2, grade-3)
  Live query: `psql ... -c "SELECT slug FROM topics ORDER BY slug;"`

  ─── language whitelist ────────────────────────────────────────────────
  One of: en | de | es | nl
  Tier-3+4 locales (sv/fi/no/da/fr/it/pt) are NOT supported at Phase 1c.

  ─── length target (per Q4) ────────────────────────────────────────────
  Total: 500-700 words.
  Per CLIL section: ~125-175 words.
  Reader layout designed for that envelope; longer plans wrap the print
  surface across multiple pages and lose at-a-glance scannability.

  ─── CLIL template semantics (per Q3) ──────────────────────────────────
  Structural template is constant across all 4 locales:
    Warmup → Content-Language Activity → Language Scaffold → Closure
  Per-locale variation lives in the CONTENT layer only — vocabulary
  register, idiom, examples, classroom conventions. Section structure +
  H2 heading pattern (case-insensitive regex per locale) does NOT vary.
  Heading patterns the parser accepts:
    Warmup       → Warmup | Aufwärmung | Calentamiento | Opwarming
    Content      → Content-Language Activity | Inhalt-Sprache | Actividad de contenido | Inhoud-taal
    Scaffold     → Language Scaffold | Sprachgerüst | Andamiaje | Taalsteun
    Closure      → Closure | Abschluss | Cierre | Afsluiting

  ─── collision behavior (per Phase 1b lock) ────────────────────────────
  ERROR in both dry-run and real-mode if a (topicSlug, language) row
  already exists. Operator must explicitly DELETE + re-insert if
  overwriting. No silent overwrite at Phase 1c. Reactivation policy
  filed for a future commission.

  ─── usage ─────────────────────────────────────────────────────────────
  Copy this file to lesson-plan-drafts/{locale}/{topicSlug}.md and edit.
  Drop the HTML comment block at the top (or leave it — markdown
  renderers ignore it; seed parser ignores it; only the YAML frontmatter
  + ## H2 sections matter).

  Run from frontend/:
    node scripts/seed-lesson-plans.js                          # dry-run
    node scripts/seed-lesson-plans.js --confirm                # real-mode
    node scripts/seed-lesson-plans.js --file ../path/to/x.md   # single file
-->

---
topicSlug: addition
language: en
title: "Addition for kindergarten — animals theme"
durationMinutes:
  warmup: 5
  contentActivity: 15
  scaffold: 8
  closure: 5
recommendedDeckIds: []
recommendedPdfDeckIds: []
---

## Warmup

Open the lesson by gathering the children in a circle on the carpet. Hold up two
familiar animal flashcards (cat and dog work well; pick whatever the class has
been working with this month). Ask the children to count how many cats they see,
then how many dogs, using whichever counting language has already been
established as routine. Praise effort over correctness — the warmup's job is to
light the mental switch, not to assess. Transition into the lesson by saying
that today the animals are going to help us add. Show one cat plus one dog and
ask "how many animals are there?" Children answer; affirm. The warmup ends with
the children settled, oriented to the activity, and primed to count animals.
Aim for five minutes here; if you've used eight, the rest of the lesson will
feel rushed. Keep flashcards within reach for the next section.

## Content-Language Activity

Open the addition deck on the classroom display. The first card shows a small
group of animals on the left, a plus sign in the middle, and a second small
group on the right. Read the card aloud in the target language as you point to
each element: "two cats, plus three cats, equals…" — pause for the children to
chorus the answer. Move through five or six cards together at this pace; the
children's job here is to internalize the structural pattern of an addition
sentence by hearing and saying it many times. Vary the animals (cats, dogs,
birds, fish) so the linguistic novelty doesn't fade. After the chorus rounds,
invite individual children to read a card aloud and arrive at the answer.
Affirm correct answers warmly; redirect quickly past wrong ones without making
the child feel singled out. The activity ends when most of the class has
spoken at least once.

## Language Scaffold and Practice

Move from the deck to the worksheet. Each child gets a printed page with three
or four addition sentences shown in the same animal-flashcard format. Read the
first sentence aloud together. Demonstrate filling in the answer on the
classroom display — say each numeral as you write it. Now ask the children to
work the second sentence on their own pages. Circulate. The sentence frame
"___ animals plus ___ animals equals ___ animals" is the language scaffold
the children should be able to produce, with prompting if needed, by the end
of this section. Don't push for full fluency — production at this level is the
goal of the next two weeks of lessons, not this single one. Pair children up
and have them read their completed sentences to each other before transitioning
to closure. The scaffold ends when most pairs have done at least one read-aloud.

## Closure

Bring the class back together. Hold up one final card — make this one slightly
harder than the deck average (e.g., three plus four), so the children feel a
small stretch as the closing moment. Ask them to chorus the answer, then ask
one volunteer to repeat the full sentence in the target language. Close by
naming what they did: "Today we added animals together. Tomorrow we'll do the
same with food." This forward-pointing sentence transfers the pattern to the
next lesson and gives the children a thread to pick up. Collect the worksheets
into a stack — they're the artifact for the language portfolio. The closure
should feel like the lesson's natural exhale, not a rushed wrap-up. Five
minutes is the right envelope.
