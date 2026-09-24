# Plan — Retire the "local AI" from the website and the games (operator ruling 2026-09-05)

## Context

Operator ruling, verbatim: **"The local ai should not have anything to do with the website or the games."** Scope confirmed by the operator: **games docs AND website doctrine.**

Two separate "local AI" ideas exist in the documentation, and neither exists in code:

1. **The games "local model / build model."** The original design brief (`games/design/GAME-DESIGN-BRIEF.md`) assumed a self-hosted model (Qwen, ~23 tok/s) would write the game code from the specs. The operator has since ruled that Claude Code builds the games (§24, `games/BUILD-WORKFLOW.md`), but the brief, the writer brief, `BUILD-CONVENTIONS` §15, the FINAL-REPORT, ASSUMPTIONS A-4/A-14, one spec (098) and the games memory still speak of "the build model" / "a local model".
2. **The website's Mac Studio local-AI enrichment service** (Ollama on a headless Mac Studio over Tailscale, pull-based `/api/ai-ingest/*`, `enrichment.json`, Topic embeddings). Measured: `frontend/app/api/ai-ingest/` does not exist, `mac-studio-service/` does not exist, no `ai-ingest` / `ollama` / `mac-studio` reference in `frontend/app`, `frontend/lib` or `scripts`. Only the dormant `DeckEnrichment` Prisma model exists (§8.1 forbids touching existing tables, so it stays). Everything else is CLAUDE.md doctrine: §3.5, §4.5, §5, §8.2 tree, §10.2, §10.3, §11 "now in scope", §15.1/§15.3, A.9, plus scattered mentions at lines ~93, 125, 247, 299.

Outcome: after this pass no document routes any future work to a local AI; the website architecture is two machines (PC + Hetzner, Cloudflare in front); the games are built by Claude Code; the historical text is marked retired, not deleted (§10.3: never delete files; §12: flag, then amend on operator ruling — this IS the ruling).

## Changes

### A. CLAUDE.md (the doctrine; version 3.9 → 3.10, "Last updated" stays 2026-09-05)

Pattern for every retired section: keep the text, prefix a one-line dated marker, so a future reader sees both the ruling and the history. Concretely:

- **New top AMENDMENT** (after the games amendment, before "Teaching-packages domain removed"): `## [AMENDMENT 2026-09-05] Local AI retired from the website and the games` — the verbatim ruling; what it retires (Mac Studio / Ollama / Tailscale-bound `ai-ingest` service; `enrichment.json` as a live layer; Topic-embedding resolution §16.1 step 2; any "local model" building games); what stays (`DeckEnrichment` schema model, dormant, per §8.1; the three-layer manifest shape with `enrichment.json` reserved-empty); forward rule: **no future task may plan, build, or offer a local-AI dependency for the website or the games — all AI work in this project is Claude Code in-session.**
- **§3.5** heading "Three-machine infrastructure" → "Two-machine infrastructure (was three; Mac Studio retired 2026-09-05)"; Mac Studio bullet and the Tailscale sentence marked `[RETIRED 2026-09-05]`.
- **§4.5** heading → `### 4.5 [RETIRED 2026-09-05] Local AI enrichment service` + one line: never built; decks serve without enrichment permanently; topic pages use the faceted path (§16.1 step 2 embedding-similarity is dead — note it there too, one clause).
- **§5** stack line: strike "headless Mac Studio M3 Ultra for AI · Ollama runtime · Tailscale" with a `~~…~~ (retired 2026-09-05)` marker.
- **§8.2** tree: the three lines `api/{…,ai-ingest}`, `lib/{…,ai-enrichment-client}`, `mac-studio-service/…` annotated `# RETIRED 2026-09-05 — never built`.
- **§10.2** bullet "Treat local AI service …" and **§10.3** bullet "Expose Mac Studio tailnet hostname …" and the last §10.3 bullet "Make AI service synchronous …" → each prefixed `[RETIRED 2026-09-05]` (keeping them costs nothing and blocks a revival).
- **§11** "Now in scope" paragraph: the Mac-Studio clause marked retired; "Deferred" list gains "any local/self-hosted AI (operator ruling 2026-09-05)".
- **§15.1** `enrichment.json` clause → "(reserved; the local-AI producer is retired 2026-09-05 — stays empty)"; **§15.3** heading → `[RETIRED 2026-09-05]` + one line; §4.2 line 125 "(local AI)" → "(reserved, retired producer)".
- **§1/§3.4/§9** launch-definition mentions (lines ~93, ~247): append "(local AI retired 2026-09-05)" once each — historical definitions, minimal touch.
- **A.9** heading → `### A.9 [RETIRED 2026-09-05] Mac Studio operational rules` + one line.
- **§24.1** first bullet: "(the 'local model' plan is dropped)" → "(no local AI of any kind — operator ruling 2026-09-05; Claude Code is the only builder)".
- Companions under `docs/claude-md/` still mention Mac Studio in historical narration; NOT edited (the amendment supersedes them; they are relocated justification, not forward rules). Recorded in the amendment.

### B. games/ (the operator's brief is historical; the working docs are rewritten)

- `games/design/GAME-DESIGN-BRIEF.md`: a dated note under the title ("Superseded 2026-09-05: no local model; Claude Code builds every game — see `../BUILD-WORKFLOW.md`; the 'build model' constraints below (tokens/s, line budget) are historical"); the "Who does what" row `A local model (Qwen…)` → struck-through with "→ Claude Code (ruling 2026-09-05)". Body text left as the record.
- `games/_tools/WRITER-BRIEF.md` line 5: "A literal local model will turn each spec…" → "Claude Code turns each spec…" (the superseded note already exists).
- `games/design/catalogue/BUILD-CONVENTIONS.md`: line 3 and §15 (heading + body + my note): "the build model" → "the builder (Claude Code)"; §15 note rewritten to "the builder is Claude Code with the ensemble of `games/BUILD-WORKFLOW.md`; no local AI is involved (ruling 2026-09-05)".
- `games/design/FINAL-REPORT.md` (line 3 addendum "(not a local model)" → "(no local AI — operator ruling 2026-09-05)"; lines 112, 118 "build model" → "the builder") and the template it is generated from, `games/_tools/_final-report-static.md` (lines 37, 43, same change) so `report-stats.js` cannot reintroduce the phrase.
- `games/design/research/ASSUMPTIONS.md` A-4 and A-14: "build model" → "the builder".
- `games/design/specs/098-five-senses-sort.md` line 88: "build model" → "the builder" (re-run `lint-specs.js 098`).
- `games/BUILD-WORKFLOW.md` §0 line "The old 'there will never be games' ruling is superseded": append "; no local AI is involved anywhere (ruling 2026-09-05)".

### C. Memory (out-of-tree, not committed)

- `memory/project_games_build_200.md` line "I build (no local model)" → "I build — no local AI anywhere (operator ruling 2026-09-05)".
- `memory/MEMORY.md`: one new standing-rule line near the top: `## 🛑 STANDING RULE 2026-09-05 — NO LOCAL AI: the Mac Studio/Ollama enrichment service and any "local model" are RETIRED from the website AND the games (never built in code; DeckEnrichment schema stays dormant). All AI work = Claude Code in-session. CLAUDE.md top AMENDMENT 2026-09-05.` (no new topic file — the fact is one line and lives in CLAUDE.md).

## Reuse / constraints
- No code changes; no schema changes (§8.1); no file deletions or renames (§10.3); `docs/claude-md/*` untouched.
- Edits via the Edit tool (exact anchors already read this session); no heredoc patching of prose.

## Verification
1. `grep -rIn -i "local model\|build model\|ollama\|qwen" games --include=*.md --include=*.js` → only the brief's struck row / dated notes and the writer-brief's superseded note remain (each contains "2026-09-05" or "~~").
2. `grep -n -i "mac studio\|ollama\|ai-ingest\|local AI" CLAUDE.md` → every hit sits on a line carrying `RETIRED`, `retired 2026-09-05`, `~~`, or inside the new amendment.
3. `node games/_tools/lint-specs.js 098` → PASS; `node games/_tools/lint-specs.js` → 200/200; `node games/_test/run-tests.js` → 85 pass (no lib touched — sanity only).
4. `git diff --stat` shows only `CLAUDE.md` + the listed `games/` files; commit with explicit paths (`git add CLAUDE.md games/design games/_tools/WRITER-BRIEF.md games/_tools/_final-report-static.md games/BUILD-WORKFLOW.md`), session attribution, no push, no deploy.
