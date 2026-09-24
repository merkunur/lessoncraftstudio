---
name: Infrastructure-claim verification — handoff and CLAUDE.md infrastructure claims checked against actual production state before being relied upon for strategic reasoning
description: Infrastructure claims in handoff documents and CLAUDE.md (CDN-in-path, edge-cache active, DDoS protection, geographic distribution) must be verified against actual production state (curl headers, dashboard logins, DNS records) before being relied upon for strategic reasoning. Surfaced at Brief B Sub-phase 5.8 when "Cloudflare CDN" claim turned out aspirational; production was never on CF until 2026-04-30.
type: feedback
originSessionId: 057417cc-7dfe-42b6-a061-d175d9f2e80f
---
**Rule:** Infrastructure claims in handoff documents and CLAUDE.md (CDN-in-path, edge-cache active, DDoS protection layer, geographic distribution, backup state, monitoring presence) must be verified against actual production state — curl headers, dashboard logins, DNS records, deployed-config inspection — before being relied upon for strategic reasoning, capacity planning, contract design, or downstream amendments.

**Why:** Infrastructure claims tend to slide between aspirational (planned, partially-deployed, rolled-back, never-deployed) and actual (currently in path, governing requests). Aspirational claims propagate through handoff documents and downstream CLAUDE.md sections; downstream sections build contracts that assume the aspirational claim is real. When the claim is finally verified, the contracts that depended on it are exposed as inert. Architectural amendments that codified the contract become wrong by the time the verification happens.

**How to apply:**

1. When CLAUDE.md or handoff documents make an infrastructure claim — "CDN absorbs viral traffic", "edge cache active with 5-min TTL", "DDoS protection at edge", "monitoring catches X" — verify it against production state.
2. **Verification methods (cheap, fast):**
   - **CDN-in-path:** `curl -I` against production URL; check for `server: cloudflare`, `cf-cache-status`, `cf-ray` headers. Compare CDN-curl to origin-direct curl (`--resolve` to origin IP). Byte-identical = no CDN layer.
   - **DNS configuration:** `dig +short NS <domain>` confirms nameservers; `dig <domain> @<ns>` confirms record types and proxy status (cloudflare-resolved → orange-cloud).
   - **Edge cache TTL:** observe cache headers across t=0 / t=60 / t=180 / t=300 / t=360 checkpoints; transitions on `cf-cache-status: MISS → HIT → EXPIRED → MISS` confirm 5-min TTL behavior.
   - **DDoS protection:** dashboard login + verify firewall rules deployed.
3. Distinguish in writing between aspirational and actual: date-marker amendments. Pre-X-date state vs post-X-date state. Future audits can distinguish the two.
4. When a verification reveals the claim is aspirational, file the correction as an OPERATOR-ACTION-REQUIRED-PRE-LAUNCH item (not dormant deferred) if the claim was load-bearing for downstream contracts. Coordinate with the resolution timeline before re-asserting the claim in CLAUDE.md.

**Instance that surfaced this rule (Brief B Sub-phase 5.8 2026-04-29):**

- CLAUDE.md §3.5 contracted: "Cloudflare CDN (free tier). Caches and serves static deck HTML files… absorbs viral student traffic."
- Sub-phase 5.8's CDN cache invalidation observability test ran passive curl across t=0/60/180/300/360 checkpoints expecting `cf-cache-status: MISS → HIT` transitions.
- **Empirical evidence:** every checkpoint returned `server: nginx/1.18.0 (Ubuntu)` directly. No `cf-cache-status`, `cf-ray`, or any Cloudflare-edge headers at any checkpoint. CDN-curl byte-identical to origin-direct curl. Strongly indicating no edge-cache layer between client and Hetzner origin.
- **Investigation:** operator's Cloudflare account was empty; the domain was never added to Cloudflare. The §3.5 claim had been aspirational across multiple handoffs; downstream contracts (§15.x Cache-Control 5-min TTL; §3.5 viral-traffic absorption; §17.4 acquisition-mechanism premise relying on edge-distributed share-flywheel) had been depending on the claim.
- **Resolution-by-action 2026-04-30:** operator added Cloudflare Free plan; orange-cloud proxy; SSL Full (strict); AI crawlers allowed; nameserver swap at Namecheap; verified browser-test PASS via CF edge.
- **CLAUDE.md amendment:** Phase 6 Commit 1 (`ec85a594`) date-markered §3.5 to distinguish pre-2026-04-30 (aspirational) vs post-2026-04-30 (actual) infrastructure state.

**Generalization:** infrastructure claims in handoff documents and CLAUDE.md must be verified against actual production state (curl headers, dashboard logins, DNS records) before being relied upon for strategic reasoning. Apply at every handoff/CLAUDE.md authoring or audit pass that includes infrastructure claims.

**Family:** extends `feedback_documentation_against_real_emitter.md` from the documentation/config layer to the infrastructure layer. Sibling of `feedback_decision_premise_verification.md` (decision-premise layer). All three describe the claims-vs-real-state pattern.
