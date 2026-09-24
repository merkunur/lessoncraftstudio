---
name: feedback_native_i18n_two_panel_authoring
description: "Author i18n with one native panel per locale and audit with a SECOND — and hand them the English as a source to audit, because they read the model"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4c6eb655-0453-45b0-b448-b1bf4fca5e67
  modified: 2026-08-09T14:51:19.797Z
---

Proven on the 811-string workspace/collections repair ([[project_workspace_i18n_english_leak]]).
The shape that worked, and should be reused for any ≥50-string per-locale authoring job:

**1. One authoring panel per locale, then a SECOND, DIFFERENT panel to audit it cold.**
The review round is where the value is. It caught two grammar BLOCKERs that the authoring panels
— competent, careful, self-checking — had both shipped: French `de` + a vowel-initial placeholder
("Ajout de Automne"), and Portuguese `a` + a user-typed name that cannot take crase. Neither is
visible to any automated check, because both strings are perfectly well-formed ICU.

**Why:** *"Be adversarial but honest. If a string is correct, do not invent a problem. A clean
verdict is a valid verdict."* Four of eight reviewers returned NO blockers and said so plainly —
which is what made the two that did find blockers worth believing.

**2. ⭐⭐ THE PANELS READ THE MODEL, AND THEY AUDIT YOUR ENGLISH.** Recurring, and it keeps paying:
- The Italian panel opened `ShareDeckButton.tsx` and found `share.label` is a `<button>`, not a
  field label — so it wrote an imperative where four other locales had put a noun on a trigger.
  It also opened `SharedActivitiesSection.tsx`, saw the `tabular-nums` column, and rejected its own
  preferred wording because a leading word would break the alignment that class exists for.
- Five panels independently found `bulk.packUpsell` naming the plan "Teacher" — a key that was NOT
  in any of their work lists, because it was already "translated", just wrongly.
- Three panels found the two workspace gates contradict each other on whether the feature is free.

**3. ⭐⭐ AND THEY WILL CORRECT YOU. LET THEM.** I told all seven panels that `à {collectionName}`
would break on a vowel-initial name. **That is wrong — `à` does not elide in French**; only `de`,
`le`, `la`, `que`, `ne`, `ce`, `si`, `jusque` do. The French panel rendered it with "Élise" and
pushed back with the evidence. I also told them `pickerTitle` nests `{collectionName}` — it does
not, and the Danish panel caught that too by rendering both branches instead of trusting the note.
**Write the brief from the artefact, not from memory, and treat a panel's pushback as a finding.**

**4. Feed the second round the first round's result.** Telling each panel what its reviewer found,
what was applied, and what was deliberately NOT applied (and why) kept round two consistent and
stopped panels re-litigating settled lexicon.

**5. ⚠ Say WHY when you decline a panel's finding.** The Norwegian panel argued `deck` should
become `arbeidsark` and pointed out — correctly — that my stated rule ("re-cut only where a locale
contradicts ITSELF") had just been undermined by a string it had not seen. Naming the actual
reason (the English source is itself unsettled, so churning one locale makes it the odd one out)
got a better answer back: *"your reasoning is better than my flag was."* A silent decline teaches
a panel to stop reporting.

**Mechanics that made it safe:** panels write flat `key -> string` JSON to a scratchpad and NEVER
touch the repo; one validated applier merges, refusing invented keys, lost ICU arguments,
malformed ICU and still-English values; ⚠ **it must preserve each file's own line endings** —
`core.autocrlf=true` here, and a stray `git checkout` left one message file on CRLF while its
siblings were LF, which would have turned a 1-string edit into a 4,291-line diff.
