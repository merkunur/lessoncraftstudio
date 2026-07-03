import Script from 'next/script';

/**
 * First-party, cookieless analytics beacon (commission #8, 2026-07-03).
 *
 * Self-hosted Umami v2 on this server (pm2 :3100), proxied same-origin by nginx:
 *   /lcs-insights.js → umami /script.js   ·   /api/send → umami collection
 *
 * Privacy posture (GDPR, no consent banner needed): no cookies, no localStorage,
 * no fingerprinting, no stored IPs — uniques via Umami's daily-rotating salted
 * hash; country via Cloudflare's CF-IPCountry header; EU-hosted; aggregate-only.
 * Keep it that way: never add identifying properties to events.
 *
 * Env-gated like PinterestTag: renders nothing until NEXT_PUBLIC_UMAMI_WEBSITE_ID
 * is set (bake-time env on the server; see docs/ops/server-access.md conventions).
 * Custom events: `window.umami?.track('event-name', {props})` — co-emitted at the
 * pinterestEvents call sites.
 */
export default function UmamiBeacon() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;
  return (
    <Script
      src="/lcs-insights.js"
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
