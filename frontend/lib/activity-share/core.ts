import crypto from 'crypto';

/**
 * Activity-share core — durable student-play links for the 200+ interactive
 * activities. Mirrors the hosted-worksheet capability-link model: a subscriber
 * mints a clean `/play/a/<linkId>` URL (+ QR) that serves the standalone
 * mini-tool player. Cheap rows (no file storage — the player HTML is the
 * shared, versioned mini-tool wrapper), so a generous cap.
 */

const CANONICAL_HOST = 'https://www.lessoncraftstudio.com';

/** Per-teacher live-link cap. Cheap rows; generous. */
export const ACTIVITY_SHARE_LIMIT = 500;

/** Locales an activity can be served in (mirrors TOPIC_ENABLED_LOCALES set). */
export const ACTIVITY_SHARE_LOCALES = new Set([
  'en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi',
]);

/** 12-char URL-safe capability id (same alphabet/length class as hosted links). */
export function generateActivityLinkId(): string {
  const alphabet = 'abcdefghijkmnpqrstuvwxyz23456789'; // no 0/O/1/l lookalikes
  const bytes = crypto.randomBytes(12);
  let out = '';
  for (let i = 0; i < 12; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

/** The public student-play URL + QR image URL for a shared activity. */
export function activityShareUrls(linkId: string) {
  return {
    url: `${CANONICAL_HOST}/play/a/${linkId}`,
    qrUrl: `${CANONICAL_HOST}/play/a/${linkId}/qr.png`,
  };
}
