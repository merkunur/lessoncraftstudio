---
name: Commit CLAUDE.md edits in the same session they're made
description: CLAUDE.md is the project's most consequential document; uncommitted working-tree edits to it accumulate risk fast. Always commit CLAUDE.md changes before the session ends, full stop.
type: feedback
originSessionId: 1dc58079-a7cb-4836-9c4f-50a6e9159a50
---
When a Claude Code session edits CLAUDE.md — any edit, regardless of size — the edit must be committed in the same session before the session ends. No "let me think about it overnight" with CLAUDE.md modifications sitting in the working tree. No "I'll bundle this with the next change."

**Why:** Surfaced 2026-04-27 during the deck.html SEO amendment merge. HEAD's CLAUDE.md ended at §14, but the working tree had the entire §15–§19 (catalog data pipeline, topic destination pages, public site rebuild + SEO, sample decks, language launch sequence) sitting uncommitted across multiple prior sessions of design work. A PC failure, stray `git reset --hard`, or accidental working-tree wipe at any point in those days would have erased the entire catalog architecture from disk with no git history to recover from. The risk had been latent for an unknown amount of time. The §17.8 amendment we'd just merged was in the same boat.

The operator's exact framing: "CLAUDE.md is the project's most consequential document; uncommitted edits to it accumulate risk fast. The cost of an extra small commit is zero; the cost of losing design work to an accident is enormous."

**How to apply:**

- After any CLAUDE.md edit in a session, commit it before ending the session. If the edit is small enough that "it doesn't deserve its own commit," commit it anyway — small commits to a foundational doc are cheap.
- Before *starting* a CLAUDE.md edit, run `git status` and check whether CLAUDE.md is already dirty in the working tree. If it is dirty from a prior session, surface this to the operator before adding more edits — bundling new edits onto stale uncommitted ones turns one risk into a bigger one.
- For substantive edits (a new section, a re-architected section, a deletion of meaningful content), the commit message should name the design intent ("Add §17.8 deck.html SEO surface", "Restructure §16 topic taxonomy") rather than being generic ("update CLAUDE.md"). Operator-authored intent in the commit message is the audit trail for future sessions.
- For trivial edits (date bump, typo fix, small clarification), a generic message is fine — the rule is about getting it into git history, not about ceremony.
- The rule applies even when the session's primary task isn't CLAUDE.md itself. If the session incidentally touches CLAUDE.md (e.g., updating a section as part of a feature that also lands code), commit CLAUDE.md alongside or before the code commit so it doesn't drift dirty.

**Edge case:** if a CLAUDE.md edit lands during a session but the session's other work is still in flight (uncommitted code, unfinished plan), commit *just the CLAUDE.md change* on its own immediately. Don't wait for the larger work to be ready. CLAUDE.md commits don't block on anything else.
