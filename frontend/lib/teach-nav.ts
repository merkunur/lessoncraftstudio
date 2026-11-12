/* The first menu entry, "Lesson plans" (Daily Teaching System, Part 11.5), for a language that has live units:
 * one link per grade to its grade page (/<language>/teach/<grade>), then the sub plans, the unit checks and the
 * standards checklists, and "all lesson plans by unit" at the foot. Every word is one a native reader has seen
 * (the units, first-page and panel string files). A language without live units gets null and keeps its menu. */
import type { TeachNav } from '@/lib/category-nav-data';
import { myTeachingProps } from '@/lib/my-teaching-page';
import { getUnitUi } from '@/lib/units';

export async function teachNav(locale: string): Promise<TeachNav | null> {
  try {
    const [mine, unitUi] = await Promise.all([myTeachingProps(locale), getUnitUi(locale)]);
    if (!mine || !unitUi || !unitUi.hubCrumb || !unitUi.planAllUnits) return null;
    const items = mine.data.grades.filter((g) => mine.teachHrefs[g.grade]).map((g) => ({ href: mine.teachHrefs[g.grade], label: mine.gradeLabels[g.grade] || g.grade }));
    if (items.length < 2) return null;
    const gate = mine.gate;
    if (mine.data.hasSubPlans && gate && gate.facts.subPlans > 1) items.push({ href: `/${locale}/sub-plans`, label: gate.ui.link_subPlans });
    if (mine.data.hasChecks && gate && gate.facts.checks > 1) items.push({ href: `/${locale}/assessments`, label: gate.ui.link_checks });
    if (mine.data.hasStandards) items.push({ href: `/${locale}/curriculum`, label: mine.data.ui.alsoStandards });
    return { label: unitUi.hubCrumb, items, browseAllHref: `/${locale}/units`, browseAllLabel: unitUi.planAllUnits };
  } catch {
    return null; // the menu never falls with it
  }
}
