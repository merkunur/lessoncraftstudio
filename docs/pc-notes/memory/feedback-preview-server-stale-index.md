---
name: ""
metadata: 
  node_type: memory
  originSessionId: 69ebeee1-4452-4c2a-809f-05377b5aff6d
---

When the operator says newly-built activities "don't show on http://127.0.0.1:5050/" (the `mini tools/_preview-server.js` index), the cause is almost never the build. Diagnose in this order (I wasted the operator's patience twice by theorizing instead):

1. **curl the LIVE server, don't theorize.** `curl -s http://127.0.0.1:5050/ | grep -c "<title-text>"`. The index re-scans `mini tools/*-activities.json` on every request, so a correct build shows up immediately server-side. If curl shows it, the server is fine and the problem is client-side.
2. **Check for stale duplicate processes.** Repeated `! node "mini tools/_preview-server.js"` leaves MULTIPLE node processes (found FOUR once). Find/kill: PowerShell `Get-CimInstance Win32_Process -Filter "Name='node.exe'" | ? {$_.CommandLine -match 'preview'}` → `Stop-Process -Id <pid> -Force`. Then start ONE fresh.
3. **The real killer = browser-cached index.** The old server sent NO cache headers, so the browser served a cached snapshot from before the new activity existed (earlier activities "showed" because they were in that snapshot). FIX (already applied to `mini tools/_preview-server.js`): it now sends `Cache-Control: no-store, no-cache, must-revalidate` on every response. Operator must **hard-refresh once (Ctrl+Shift+R)** to drop the existing cached copy, or open a never-cached URL like `/?fresh`.

**Also (separate findability bug, see [[feedback-lean-activity-qa]] sibling work):** the index labels each row with `page_title.en`, so a new activity's `page_title.en` MUST lead with its character name (e.g. "Comet's Big Leaps…"), or the operator can't find it by the name. Grep existing `*-activities.json` page_titles for NAME/title/skill collisions at design time — not just the CCSS owned-code check.

**Why this matters:** the operator tests every batched (not-deployed) activity on this local preview; "doesn't show" reads as "you didn't build it." Verify server-side with curl first, fix the client-cache cause, never blame the browser without proof.
