---
name: reference-lemonsqueezy-api-readonly
description: LS API does NOT allow PATCH on /v1/products or /v1/variants — both return 405. Variant/product status mutation is dashboard-only. Checkouts API works but renders 404 if variant is in pending state.
metadata: 
  node_type: memory
  type: reference
  originSessionId: 1712bb34-5368-46c6-9f0d-f25be13b700f
---

The Lemon Squeezy REST API has read-only product + variant endpoints. Verified empirically 2026-05-17:

- `PATCH https://api.lemonsqueezy.com/v1/variants/<id>` → HTTP 405 `"The PATCH method is not supported for route v1/variants/<id>. Supported methods: GET, HEAD."`
- `PATCH https://api.lemonsqueezy.com/v1/products/<id>` → HTTP 405 (same message shape)

The Checkouts API (`POST /v1/checkouts`) succeeds with HTTP 201 even when the underlying variant is in `pending` state, returning a `data.attributes.url` like `https://lessoncraftstudio-com.lemonsqueezy.com/checkout/custom/<uuid>?signature=...`. **BUT** loading that URL still hits LS's variant-state gate and 302-redirects to `/checkout` which returns 404. Custom-checkout URLs do not bypass the published-variant requirement.

**Implication:** there is no API-driven path to flip a variant from `pending` → `published`. The operator MUST do it via LS dashboard:
1. Log into lemonsqueezy.com
2. Products → click the relevant product
3. Variants tab → click the variant in pending state
4. The variant edit screen will surface what's blocking publish (missing thumbnail, KYC incomplete, etc.)
5. Resolve the surfaced block; the variant flips to `published`

Common pending-state causes (LS empirical patterns):
- Product has no thumbnail (`thumb_url: null` / `large_thumb_url: null` in product detail)
- Merchant onboarding (KYC / payment processor connection) incomplete
- Required variant field unfilled (description, etc.)
- **Account-level compliance review (most common for EU subscription merchants).** LS empirically holds new EU-based subscription products in Pending until they finish a merchant review on their backend. Symptoms: BOTH live variants AND test-mode-copied variants are Pending; product is Published; payouts (Bank + PayPal) configured; tax submitted; thumbnail uploaded; price-model wired correctly; the dashboard Variants tab only offers "Add variant" with no UI-level publish action. Confirmed 2026-05-17 with Sweden-based store id 327460. Resolution: operator emails support@lemonsqueezy.com with variant + product IDs + diagnostic state; LS support flips status on their backend. Test mode does NOT bypass the gate — test variants get the same Pending treatment.

## What WAS observed working

- `GET /v1/stores/<id>/products` returns `data[].attributes.buy_now_url` — the canonical checkout URL LS publishes for the product. Use this verbatim in `lemonsqueezy-product-config.ts: buyNowUrl`.
- `GET /v1/products/<id>` returns full product detail including `status_formatted` and `description`.
- `GET /v1/variants/<id>` returns variant detail including `status_formatted` (`"Pending"` vs `"Published"`).

## Cross-refs

- [[reference-lemonsqueezy-api-authority]] — the LS API IS the authoritative source for current product/variant state (codebase config + curl probes can disagree)
- CLAUDE.md §A.6 — LS source-of-truth file `lemonsqueezy-product-config.ts`; updates require operator approval
