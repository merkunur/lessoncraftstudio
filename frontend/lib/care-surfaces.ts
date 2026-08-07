/**
 * CARE_SURFACES — the tools that are never metered.
 *
 * ⚠⚠ WHY THIS FILE EXISTS. `ActivityIframe` meters every tool mount as a
 * 'play' at `PLAYS_PER_DAY = 10` (`lib/quota.ts`), and before this file
 * there was NO exemption mechanism anywhere in the codebase — I searched.
 * So the Say It Board, a communication board for a newly arrived child
 * with no words of the classroom language, sat behind a ten-a-day meter
 * that could show them
 *
 *     "You've used your free plays for today"
 *
 * on the surface they use to ask for the toilet — while the tool's own
 * header, its hub card, and its landing copy in all eleven locales
 * promised that the whole board is free and stays free "because a child's
 * voice is not something to sell".
 *
 * Either the meter exempts these surfaces or that copy is false in eleven
 * languages. The copy is the thing worth keeping, so: an allowlist.
 *
 * ⭐ A NAMED LIST, NOT A SPECIAL CASE, so the next care surface joins it
 * without another code change. The test for membership is NOT "is this
 * tool nice" — it is:
 *
 *     Would a child in distress reach for this, and would a wall in
 *     front of it make that distress worse?
 *
 * That is a much narrower question than "is this tool valuable", and it
 * is why the ten-frame and the number line are not on this list however
 * good they are. A maths manipulative behind a daily cap is a business
 * decision. A child's only way to say "it hurts" behind a daily cap is
 * not.
 *
 * Everything else about the subscription is untouched: these tools are
 * already free, the meter never earned anything from them, and the paid
 * depth inside them (print sheets, keeping your own phrases) is enforced
 * per-tool and is unaffected by this file.
 */

/** Tool keys whose apparatus must never meet a usage wall. */
export const CARE_SURFACES: ReadonlySet<string> = new Set([
  /* the newcomer's voice — the board a child taps to ask for the toilet,
     to say it hurts, or to say no. Tool #29. */
  'home-language-bridge',
  /* how a child says they are not ok, and the day-slot a teacher reads
     it from. Its own header records the same doctrine in its own words:
     "the supportive half is never sold". Tool #24. */
  'feelings-check-in',
  /* the room's volume, which a child with sensory needs relies on being
     able to see. Tool #21. */
  'hush-owl',
]);

/**
 * True when this tool's apparatus must bypass the usage meter.
 *
 * ⚠ Takes the TOOL KEY, not the localised slug — the slug differs per
 * locale (`say-it-board`, `sag-es-tafel`, `sanomistaulu`, …) and matching
 * on it would exempt English and meter Finnish, which is the worst
 * possible version of this bug.
 */
export function isCareSurface(toolKey: string | null | undefined): boolean {
  return !!toolKey && CARE_SURFACES.has(toolKey);
}
