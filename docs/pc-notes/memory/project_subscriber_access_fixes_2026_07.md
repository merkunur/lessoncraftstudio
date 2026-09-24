---
name: project-subscriber-access-fixes-2026-07
description: "The 2026-07-11 saga of \"subscriber treated as free\" — 3 distinct real bugs found + fixed (metering token transport, auth-refresh subscription wipe, short-lived-token expiry) + deferred BUG B"
metadata: 
  node_type: memory
  type: project
  originSessionId: aaf336ec-30a7-4d56-b21f-c711a6b23431
---

# "Subscriber treated as free" — 3 real bugs, all FIXED + LIVE 2026-07-11

The operator reported subscribers treated as free repeatedly. It was THREE distinct bugs (each real, each
fixed), plus a deferred fourth. THE ONE THAT ACTUALLY FIXED "can't play as subscriber" was #3 (token expiry).

## #1 — Meter got no auth token (`85e85678`)
This app has NO cookie session — auth is a JWT in localStorage sent as `Authorization: Bearer`; `getCurrentUser`
(lib/auth.ts) reads ONLY that header. The client meter `meterAction` (lib/client-meter.ts) POSTed with
`credentials:'include'` (cookies) but NO Bearer → server saw everyone as anon → metered → wall for ALL signed-in
users incl. subscribers. FIX: meterAction attaches `Authorization: Bearer <localStorage accessToken>` (fixes
activity + deck plays); deck-grid PDF/answer-key `<a href=/api/quota/…>` NAVIGATIONS can't carry the token →
converted to a metered `handleDownload` (meter → open the public `deck.pdfUrl`). METERING_ENABLED=1 in prod.

## #2 — Auth refresh WIPED the subscription (`e6e91ae2`)
`/api/auth/refresh` + `/api/auth/verify-email` returned the user WITHOUT the `subscription` object (loaded via
include, then dropped); client `performRefresh` did `subscription: data.subscription`(=undefined) → wiped an
active subscriber's entitlement to localStorage → `isLcsSubscriptionActive` false → free UI on
Workspace/Collections/ActivityShareButton. Refresh fires routinely (interval, tab-focus, `checkAuth` 401→refresh)
→ bit subscribers during/after deploys. (`/api/auth/me` + `/signin` were correct → fresh login looked fine, a
background refresh silently downgraded.) FIX: server refresh+verify-email return `subscription: user.subscription`;
CLIENT RESILIENCE: performRefresh+verifyEmail merge over prev user + change `subscription` ONLY when the response
INCLUDES the key (`'subscription' in data`) — missing key PRESERVES known sub, authoritative null still clears.

## #3 — THE REAL ONE: short-lived token expiry → metered as anon (`2edde866`)
Operator clarified: "I cannot PLAY decks/activities as subscriber — it's about USAGE." The access-token JWT is
SHORT-LIVED (~10 min, `SESSION_EXPIRY`; observed exp-iat=604s), but the client only refreshed it on a DAILY
interval or on tab-focus. A subscriber actively playing on ONE tab for >10 min → token expires → `meterAction`
sends the expired Bearer → `resolveQuotaIdentity`→`getCurrentUser` null → **anon** → metered (10/day) → wall.
DECISIVE DIAGNOSTIC (with the operator's ACTUAL live token): `/api/quota/status`→`kind:"anon"` + `/api/auth/me`
→**401** (expired). FIX = (1) client `contexts/auth-context.tsx`: replaced the useless daily refresh interval
with a proactive 2-min interval calling the existing expiry-aware `checkTokenAndRefresh` (refreshes when <5min to
the token's own exp) → token always fresh for active users; (2) SERVER BULLETPROOF `lib/quota.ts
resolveQuotaIdentity`: when the Bearer is missing/expired, fall back to the httpOnly `refreshToken` cookie
(already sent by meterAction's `credentials:'include'`, 30-day) → verifyRefreshToken → session lookup →
subscriber. **Layer 2 fixes it SERVER-SIDE IMMEDIATELY for ALL clients** (even the old bundle already sends the
cookie). Verified live: refresh-cookie+no-bearer → `kind:subscriber, remaining:unlimited`; no-cookie → still anon.

## #4 — Signed-OUT users stayed UNLIMITED (`67d4fb28`) — the flip side of #3's Layer 2
After #3's Layer-2 (meter falls back to the refresh COOKIE), signing out left the user unmetered (unlimited play
+ download). CAUSE: the Navigation "Sign Out" button cleared localStorage INLINE and never called the real
`logout()` / `/api/auth/signout`, so the `Session` row + the httpOnly `refreshToken` cookie survived → Layer 2
still recognized them as the subscriber. (Bearer surfaces — Share, save-interactive — correctly required sign-in,
since logout clears the localStorage token.) An httpOnly cookie can ONLY be cleared server-side, so a client-only
clear can never log out properly. FIX: (1) `Navigation.tsx` both sign-out buttons → `logout()` (POSTs
/api/auth/signout → deletes session + clears cookie); (2) `/api/auth/signout` deletes the session by the
`refreshToken` cookie too (not just the access token — robust to token drift) + clears the cookie with `path:'/'`.
Verified: before signout `kind:subscriber/unlimited` → after signout `kind:anon` (play 10/day, download
signup_required) + session row DELETED. DOCTRINE: logout MUST invalidate server-side (delete session + clear the
httpOnly cookie), not just clear localStorage; every sign-out UI must call the real logout(), never an inline clear.
FOLLOW-ON (`8fe96555`): routing sign-out through logout() (which did `router.push('/')`) then caused the browser
Back button to show raw Next.js RSC flight data (cached `text/x-component` served as a document behind the CDN).
FIX: `logout()` now navigates via `window.location.href = /<locale>` (FULL page nav), not `router.push` — resets
history + client state cleanly. Verified: after signout, Back → normal `text/html` page (not RSC). DOCTRINE:
logout must do a FULL-page navigation, not an SPA push (the App-Router RSC-on-back trap behind a CDN).

## #5 — DEFERRED (operator "just the main fix")
The Lemon Squeezy webhook never writes legacy `user.subscriptionTier`, so `/dashboard/*` shows a permanent "FREE
Plan" badge for real subscribers (low-traffic; subscribers land on /workspace; clean fix touches the payment
webhook §10.3). Also flagged: `checkAuth` 401→refresh hard-logs-out on a transient/5xx refresh failure (deploy
window) — should keep cached user, not logout.

## DOCTRINE
- Every authed client→API fetch MUST send `Authorization: Bearer <localStorage accessToken>`; `credentials:'include'`
  authenticates NOBODY here (no cookie session for the access path).
- Every auth endpoint returning a user MUST return the full subscription (incl `lsSubscriptionId`); the client
  must NEVER derive a subscriber's entitlement to false from an incomplete/errored response (sticky entitlement).
- A client gating on a short-lived token MUST refresh proactively vs the token's OWN exp, not a fixed slow interval.
- A server entitlement check receiving `credentials:'include'` can fall back to the long-lived `refreshToken`
  cookie so a paying user is never mis-identified as anon.
- **LESSON: for "subscriber treated as free," the FIRST diagnostic must be `/api/quota/status` + `/api/auth/me`
  with the user's ACTUAL (possibly stale) token — a fresh-token test hides token-expiry bugs.**
- Auth files (`app/api/auth/*`, sometimes `contexts/auth-context.tsx`) are pre-commit-hook-protected → the hook's
  own escape is `git commit --no-verify` + an `[AUTH]` tag.
