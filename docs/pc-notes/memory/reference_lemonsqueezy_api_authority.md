---
name: reference-lemonsqueezy-api-authority
description: LS API is the authoritative source for product/variant state; codebase config + curl probes can disagree with reality. Query API first when buyNowUrl 404s.
metadata: 
  node_type: memory
  type: reference
  originSessionId: 1712bb34-5368-46c6-9f0d-f25be13b700f
---

When the homepage Subscribe CTA buyNowUrl 404s, do NOT ask the operator for the "correct URL" before querying the LS API. The codebase config (`frontend/config/lemonsqueezy-product-config.ts`) shows the *expected* product/variant IDs, but LS state (variant status: pending vs published, alt URL forms) is authoritative only via the API.

## Recipe

The LS env vars on Hetzner are:
- `LEMONSQUEEZY_API_KEY` — Bearer token
- `LEMONSQUEEZY_STORE_ID` — numeric store ID
- `LEMONSQUEEZY_WEBHOOK_SECRET`
- `LEMONSQUEEZY_STORE_SLUG`

To list all products in the store:
```bash
plink -batch -pw <pw> -hostkey <hk> root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && set -a && source .env.production && set +a && curl -sS -H \"Authorization: Bearer \$LEMONSQUEEZY_API_KEY\" -H \"Accept: application/vnd.api+json\" 'https://api.lemonsqueezy.com/v1/stores/'\$LEMONSQUEEZY_STORE_ID'/products'"
```

To list variants of a product:
```bash
curl -H "Authorization: Bearer $LEMONSQUEEZY_API_KEY" -H "Accept: application/vnd.api+json" "https://api.lemonsqueezy.com/v1/products/<productId>/variants"
```

## Key fields to read

- `data[].attributes.status` — `published` / `draft` / `pending`. **`/buy/<variant-id>` 404s when variant status ≠ `published`.**
- `data[].attributes.buy_now_url` — the LIVE checkout URL LS itself publishes. Use this verbatim; do NOT construct `/buy/<id>` yourself if the variant is in `pending` state.
- `data[].attributes.slug` (on variants) — UUID form (e.g., `4c08cb24-0aee-486e-ae01-1f77259a031d`). Used in the `/checkout/buy/<uuid>` URL form which sometimes resolves when `/buy/<numeric-id>` does not.

## Empirical anchor

2026-05-17 commission. Config had `variantId: 1595188` + `buyNowUrl: "https://lessoncraftstudio-com.lemonsqueezy.com/buy/1595188"`. URL returned HTTP 404 despite operator claiming product was live. Phase 0 audit agent reported the config values but didn't query the LS API. Direct API query revealed: product 1016671 status=published, variant 1595188 status=**pending**. The 404 was the variant pending-state symptom, not a missing/wrong URL.

**Resolution path:** operator publishes the variant in LS dashboard (Products → product → Variants → Default → Publish). After publishing, both URL forms resolve.

## Cross-refs

- `feedback_infrastructure_claim_verification.md` — verify-then-trust pattern; LS API is the empirical anchor for LS-related claims
- CLAUDE.md §A.6 — LS source-of-truth file is `lemonsqueezy-product-config.ts` BUT config has no signal on variant-status (LS-side state)
- [[feedback-infrastructure-claim-verification]]
