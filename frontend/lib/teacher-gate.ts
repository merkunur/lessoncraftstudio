/* The panel a visitor sees when she asks for a Teacher-only file without the plan, and the lines of the pricing
 * page that name what the plan gives (Daily Teaching System, Part 11.2; PLAN.md Part 11).
 *
 *   content/teacher-gate/ui.<loc>.json   the strings; a language has the panel and the pricing lines when the file exists
 *
 * Every number shown is counted here from the live content of the language (units, plans, sub plans, unit checks),
 * and every line names a file that the gate really holds back (app/api/quota/dl: kind=teacher answers a subscriber
 * only; components/units/UnitBundleButton asks the same gate; /api/collections/from-pack is a subscriber route).
 * A line whose count is 0 is not shown: a language never claims what it does not have. */
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { listedUnits } from '@/lib/units';
import { listedSubPacks } from '@/lib/sub-plans';
import { listedChecks } from '@/lib/assessments';

export type TeacherGateUi = Record<string, string>;
export interface TeacherGateFacts { units: number; plans: number; subPlans: number; checks: number }
export interface TeacherGateProps { ui: TeacherGateUi; price: string; monthly: string; facts: TeacherGateFacts }

const cache = new Map<string, TeacherGateUi | null>();
async function ui(locale: string): Promise<TeacherGateUi | null> {
  if (cache.has(locale)) return cache.get(locale) ?? null;
  try { cache.set(locale, (await import(`@/content/teacher-gate/ui.${locale}.json`)).default as TeacherGateUi); } catch { cache.set(locale, null); }
  return cache.get(locale) ?? null;
}

/** what the panel and the pricing lines need for a language, or null where the language has no such strings */
export async function getTeacherGate(locale: string): Promise<TeacherGateProps | null> {
  const strings = await ui(locale);
  if (!strings) return null;
  const [u, s, c] = await Promise.all([listedUnits(locale), listedSubPacks(locale), listedChecks(locale)]);
  return {
    ui: strings,
    // the same form as the pricing page prints it (app/[locale]/pricing/page.tsx)
    price: `$${SUBSCRIPTION_PRODUCT.priceUsd}`,
    monthly: `$${SUBSCRIPTION_PRODUCT.monthlyPriceUsd}`,
    facts: { units: u.live ? u.units.length : 0, plans: u.live ? u.plans.length : 0, subPlans: s.live ? s.packs.length : 0, checks: c.length },
  };
}
