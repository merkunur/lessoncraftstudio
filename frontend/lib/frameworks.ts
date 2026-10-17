/**
 * Curriculum frameworks an activity can be aligned to.
 *
 * Every activity shipped before 2026-10-17 is `CCSS` (Common Core). The
 * worksheet→activity coverage plan (docs/activities-rebuild/new/) adds
 * activities for what the printable worksheets also teach outside Common
 * Core — science, health and safety, social studies, social-emotional
 * learning. Those rows carry `alignment.framework` = one of the keys below
 * and a code from that framework (e.g. NGSS `K-ESS2-1`).
 *
 * Rules the activity page and the standards hub follow:
 *   • only CCSS codes get a `/[locale]/standards/<code>` hub (the hub copy,
 *     the sibling-domain logic and the worksheet links are all Common Core);
 *   • the JSON-LD `educationalFramework` names the framework: in EN the
 *     framework's own name, in every other locale that country's national
 *     curriculum (which covers science/health/social studies as well — the
 *     same per-locale names the CCSS rows already use);
 *   • the code stays the machine anchor in JSON-LD `targetName`;
 *   • `READINESS` marks a skill no external standard names (patterns, logic,
 *     visual discrimination, handwriting strokes, calendar, ordinals): its
 *     code is an internal id, so the page claims NO alignment (no JSON-LD
 *     educationalAlignment, no code on the chip).
 * A CCSS row renders exactly as before.
 */

export type FrameworkKey = 'CCSS' | 'NGSS' | 'HEALTH' | 'SEL' | 'SS' | 'READINESS';

export const FRAMEWORK_NAME_EN: Record<FrameworkKey, string> = {
  CCSS: 'Common Core State Standards',
  NGSS: 'Next Generation Science Standards',
  HEALTH: 'National Health Education Standards',
  SEL: 'CASEL SEL Framework',
  SS: 'C3 Framework for Social Studies',
  READINESS: '',
};

/** True for a Common Core row (the default when a manifest omits the field). */
export function isCcss(framework: string | undefined | null): boolean {
  return !framework || framework === 'CCSS';
}

/** False when the row names no external standard (READINESS): no alignment is claimed. */
export function hasExternalStandard(framework: string | undefined | null): boolean {
  return framework !== 'READINESS';
}

/** The code to SHOW a teacher: the standard code, or '' for a READINESS row (its code is an internal id). */
export function displayCode(alignment: { framework?: string; code: string }): string {
  return hasExternalStandard(alignment.framework) ? alignment.code : '';
}

/** The EN framework name for JSON-LD; unknown keys fall back to Common Core. */
export function frameworkNameEn(framework: string | undefined | null): string {
  return (framework && (FRAMEWORK_NAME_EN as Record<string, string>)[framework]) || FRAMEWORK_NAME_EN.CCSS;
}
