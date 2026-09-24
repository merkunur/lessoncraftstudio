---
name: feedback-cache-buster-discipline
description: Every change to *-core.js or *-activity.js in mini tools/ MUST bump the ?v=N query in the html wrapper. Stale browser cache surfaced FI title bug at commit f59a7ad2. Empirically anchored.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2eb716ab-7052-48c6-a06d-c346c748d2b3
---

Rule: When ANY `*-core.js` or `*-activity.js` file in `mini tools/` changes, the html wrapper's `<script src=".../X.js?v=N">` query MUST be bumped (N+1). The inline comment in `syllable-builder-activity.html` documents the discipline at file-level; respect it on every commission that touches a mini-tool .js.

**Why:** Browsers cache by URL including query string. Without the bump, clients that visited any earlier version of the URL continue serving the stale local copy and miss new locale strings / task params. CDN edges + service workers compound the staleness.

**How to apply:** when committing a `[FEATURE][ACTIVITIES]` or `[FIX][ACTIVITIES]` whose scope includes editing a .js file in `mini tools/`, also edit the html wrapper to bump `?v=`. Same commit; don't split. Mini-tool wrapper html files carry an inline comment near the script tags documenting the rule as a reminder.

Current state (2026-05-22 session close): `syllable-builder-activity.html` is at `?v=3` post-PT-fan-out commit `693b3e86`. Bump to `?v=4` next time `word-builder-core.js` or `syllable-builder-activity.js` is modified.

**Empirical anchor:** the FI E8 fan-out commission (commit `92d0a136`) modified `syllable-builder-activity.js` to replace 5 .fi string values but did NOT bump `?v=1`. Operator's browser served cached pre-fan-out JS → in-card title rendered Spanish on the FI page. The corrective commission (commit `f59a7ad2`) bumped to `?v=2` and force-refreshed.

Long-term cleanup candidate: content-hash cache-busters (`?h=<sha1-of-file>`) eliminate the manual discipline. Defer until volume of mini-tool changes makes manual bumps error-prone.

Cross-reference: [[feedback-programmatic-textcontent-assertions]] (companion verification discipline that catches this class loudly).
