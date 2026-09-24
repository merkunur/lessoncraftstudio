---
name: User-facing copy must be written from reader perspective, never engineer perspective
description: When authoring i18n strings / PDF text / page descriptions / UI labels / download buttons / modal text, the audience is the reader (teacher, parent, kid) — not the engineer. Forbidden in teacher/parent-facing copy: internal taxonomy names, implementation primitives, architectural concepts, third-party brand stamps in private external communications. Sub-Phase 2.5 surfaced parent-letter LessonCraftStudio branding + 7×4=28 section descriptions leaking operator jargon.
type: feedback
originSessionId: 12858146-3749-4191-b753-18ee82e70f50
---
**Rule:** All user-facing content (i18n message strings, PDF text, page descriptions, UI labels, download-button copy, modal text, error messages, email templates) MUST be written from the reader's perspective — what they get, what they do with it — never how the system produces it. Audience-blind copy reads as engineer-talk and breaks reader trust at first contact.

**Why:** The Sub-Phase 2.5 incident demonstrated empirically:

- **Parent-letter PDF shipped with `LessonCraftStudio` branding at both header and footer of letters a teacher sends home to a parent.** Operator surface: "There shouldn't be any lessoncraftstudio in parent letter. How can I teacher send to a parent something with it? It is absurd!" A teacher cannot send a letter branded by a third-party software vendor — it reads as advertising-spam from the parent's perspective.
- **Teaching-package section descriptions × 4 locales × 7 sections = 28 entries leaked operator-internal taxonomy and implementation details to teacher-facing copy.** Egregious sentence-strips example: subheading `Multi-strip printable with one image + one localized sentence per strip, using IMAGE_VOCABULARY-driven article and gender resolution`. Operator surface: "It is unprofessional. The teacher doesn't need to know how the vocabulary system of the generators work." Teachers do not need to know how our system works internally; they need to know what they get + what they use it for.

Both defects bind to the same root cause: I author content from my engineer mental-model of what's clever about the implementation, not from the reader's mental-model of what they need.

**How to apply (any commission authoring user-facing copy):**

1. **Identify the reader role explicitly.** Before authoring, name the audience: K-3 teacher? Parent? Subscriber-admin? Each role has a different vocabulary and concerns. Write the role on a sticky-note before any sentence is drafted.
2. **Use plain reader-vocabulary, never operator-internal taxonomy.** Specifically forbidden in teacher/parent-facing copy:
   - **Internal taxonomy:** `composedExercises`, `materialSlug`, `framePreset`, `package metadata`, `pedagogical framing`, `curriculum standards` (as a label)
   - **Implementation primitives:** `IMAGE_VOCABULARY`, `NUMBER_WORDS`, `auto-resolved`, `gender data`, `locale resolution`, `target language` (use "the language your kids are learning")
   - **Architectural concepts:** `packages`, `decks`, `generators`, `ground-truth`, `locales-as-codes`, `print pipeline`, `mass-run`
   - **Aesthetic-meta descriptors:** `warm-tone summary`, `picture-cue grid`, `multi-strip printable` — describe the thing, not your characterization of it
3. **Describe what the reader gets + what they DO with it.** "Print, cut along the dashed lines, and use the cards for counting" — not "Image-only cards for cut-and-handle classroom work". The reader cares about the verb (cut, use, send home, print) and the outcome (count, sort, practice together) — not the noun-class of the artifact.
4. **Third-party brand stamps are forbidden in private external communications.** Parent letters, take-home content, family-facing materials a teacher sends home — these are private teacher-parent communication. Never stamp them with platform branding. Classroom-internal materials (flashcards, worksheets, the teacher's own answer key) MAY carry attribution per §14.3 attribution-neutrality contract; private external communication MAY NOT. The line is "who is the recipient": teacher's own classroom use = attribution OK; sent home to family = no platform branding.
5. **Self-audit before commit.** Read every line out loud as the reader would. If the reader role would not understand a word, would think "what is this software trying to tell me", or would not trust the document, the copy fails. Read it as the teacher reading the page. Read it as the parent opening the letter. Read it as the kid looking at the strip.

**Where this applies:**

- i18n message strings (`teachingPackagePage.*.{heading,subheading,description}` was the surfaced case; all other `*.json` namespaces fall under the same discipline)
- PDF text (parent-letter, answer-key, sentence-strips, parent communications, all materials)
- Page descriptions, meta descriptions, OG tags
- UI labels, download buttons, modal text, error messages
- Email templates (subscription, deck-share, new-deck digest, NSR review prompts)
- Marketing copy (homepage, pricing, about, FAQ)
- Admin tooling copy surfaced to subscribers (collections, workspace, bulk operations)

**Empirical anchor:** Sub-Phase 2.5 multi-mechanism discipline lock commission this session. Pre-fix: parent-letter `LessonCraftStudio` branding at header + footer; 28 i18n entries leaking jargon. Post-fix: branding stripped; 28 entries rewritten in plain teacher-vocabulary across en/de/es/nl. 27th §A.13.6 firing cleanly resolved per §A.13.8 cost-recalibration discipline.

**Family:** sibling of [feedback_template_ground_truth_discipline.md](feedback_template_ground_truth_discipline.md) at the behavior-description layer of the discipline family. Sibling of [feedback_documentation_against_real_emitter.md](feedback_documentation_against_real_emitter.md), [feedback_decision_premise_verification.md](feedback_decision_premise_verification.md), [feedback_infrastructure_claim_verification.md](feedback_infrastructure_claim_verification.md), [feedback_verification_regex_from_real_samples.md](feedback_verification_regex_from_real_samples.md). All describe the same root pattern at different layers: **claims** (in code / docs / decisions / infra / behavior-description / audience-facing-copy) **verified against real state** (emitter / codebase / production / app source / reader perspective) **before being relied upon**.

**Generalization:** any time you author content the reader will see, the reader is the source-of-truth for what makes sense to them. Don't author from your mental model of how the system works. Author from the reader's mental model of what they're holding in their hands. Speak their vocabulary. Skip your jargon. And never stamp a vendor's name on a private letter someone is sending to someone else's family.
