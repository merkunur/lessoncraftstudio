---
name: feedback-write-full-urls
description: "Operator preference — always write full, complete URLs (never relative paths or bare filenames) when referencing anything openable."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f2e74a05-4a11-4b23-a203-ac9e957448f2
---

When referencing anything the operator might open — a local preview page, a screenshot, a deployed page, a dashboard — **always write the FULL URL**, never a bare filename or relative path.

**Why:** the operator wants to click/open directly without reconstructing the path. A relative mention like `game-preview.html` or "open the harness" forces them to figure out the full location.

**How to apply:**
- Local dev server (premium games): **http://127.0.0.1:5173/mini-tools/game-preview.html** (after `node scripts/games/serve.js`; port `5173` per `scripts/games/serve.js`).
- Double-click harness (no server): **file:///C:/Users/rkgen/lessoncraftstudio/mini%20tools/game-preview.html** (the space in "mini tools" → `%20`).
- Local files (screenshots, outputs): the full `file:///C:/Users/rkgen/lessoncraftstudio/<path>` URL.
- Deployed/live pages: the full `https://www.lessoncraftstudio.com/<path>` URL (www-form per §A.10).

Stated 2026-06-23 during the premium-games pilot build. Cross-ref [[project_premium_games_program]].
