# BUILD LOG — the games built so far, and what is next

NEXT: 002

**Build order** (the FINAL-REPORT's first twenty, then catalogue order 011-200 skipping any already built):
002 001 005 003 007 004 006 008 009 010 043 028 018 049 069 063 091 019 105 116 · then 011, 012, 013, 014, 015, 016, 017, 020, 021, 022 … 200 (skip built).

**How to read this file (for a new session):** the `NEXT:` line is the spec number to build when the operator says "build the next game". After a game ships, its entry is appended below and `NEXT:` moves to the next number in the order. Entries are the record the operator and the deploy step rely on; the hub (`node _tools/build-hub.js`) marks the NEXT game.

**Entry format**
```
## NNN — Title (`slug`) — built YYYY-MM-DD
- Spec → build: what the ensemble changed and why (pedagogy, mechanics, content, art)
- Art added to _lib/art.js: <entries>            Locale status: STRINGS 11/11 · LOCALE_DATA 11/11 (or n/a) · NSR flags: …
- Gates: check-build PASS · qa-game PASS (n items, 11 locales, targets ≥ 44) · critic PASS (rubric 14/14) · personal read 704+1024 · pedagogue sign-off
- Local links: http://localhost:8480/<slug>/index.html?lang=en … (11)
- Notes / follow-ups:
```

## Built games

(none yet — 2026-09-05)
