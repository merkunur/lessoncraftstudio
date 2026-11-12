/**
 * The teaching wing of the homepage (Daily Teaching System, Part 11.7): the four doors of the teaching system as the
 * first room after the hall: lesson plans by unit, a sick day covered, unit checks, the curriculum by name.
 *
 * Every word comes from a string a native reader has already read: the titles and first sentences of the four hub
 * pages, the lead of "My teaching" and the heading of the pricing lines. Nothing is written for this room alone, so
 * the room exists in exactly the languages that have the products (today English, German, Swedish) and a door is
 * shown only where its product is live in the language. The pictures are the looks of the first grade that has them
 * (content/units/looks.<language>.json, scripts/units/build-looks.js): real pages of the plan's files.
 */
import { teachingForHub, type TeachingLookItem } from '@/lib/topic-teaching';

export interface TeachingDoor {
  key: 'units' | 'subPlans' | 'plan' | 'checks' | 'standards';
  title: string;
  text: string;
  href: string;
  /** a real page of the product, when the language has the picture */
  look: TeachingLookItem | null;
}
export interface HomepageTeaching {
  heading: string;
  body: string;
  gradeLabel: string;
  grades: { label: string; href: string }[];
  doors: TeachingDoor[];
  allHref: string;
  allLabel: string;
}

type Ui = Record<string, string>;
async function ui(load: () => Promise<{ default: unknown }>): Promise<Ui | null> {
  try { return (await load()).default as Ui; } catch { return null; }
}
/** the first sentence of a lead, whole: the hub pages' leads are two to five sentences, the door has room for one */
const firstSentence = (s: string) => { const i = s.search(/[.!?]\s/); return i < 0 ? s : s.slice(0, i + 1); };

export async function getHomepageTeaching(locale: string): Promise<HomepageTeaching | null> {
  const t = await teachingForHub(locale).catch(() => null);
  if (!t || !t.gate || !t.grades.length) return null;
  const [sub, checks, curriculum] = await Promise.all([
    ui(() => import(`@/content/sub-plans/ui.${locale}.json`)),
    ui(() => import(`@/content/assessments/ui.${locale}.json`)),
    ui(() => import(`@/content/curriculum-pages/ui.${locale}.json`)),
  ]);
  const g = t.gate.ui as unknown as Ui;
  const look = t.look || {};
  const doors: TeachingDoor[] = [];
  if (t.unitUi.hubLead) doors.push({ key: 'units', title: g.link_units, text: firstSentence(t.unitUi.hubLead), href: `/${locale}/units`, look: look.unit ?? null });
  if (t.subPlans > 0 && sub?.hubLead) doors.push({ key: 'subPlans', title: g.link_subPlans, text: firstSentence(sub.hubLead), href: `/${locale}/sub-plans`, look: look.pack ?? null });
  // a language without sub plans hangs the scope and sequence in their place, so the room keeps its four frames
  else if (look.plan && t.unitUi.planEyebrow && g['what_year-plan']) doors.push({ key: 'plan', title: t.unitUi.planEyebrow, text: g['what_year-plan'], href: `/${locale}/units/${look.plan.slug}`, look: look.plan });
  if (t.checks > 0 && checks?.hubLead) doors.push({ key: 'checks', title: g.link_checks, text: firstSentence(checks.hubLead), href: `/${locale}/assessments`, look: look.check ?? null });
  if (t.hasStandards && curriculum?.hubLead && curriculum.hubCrumb) doors.push({ key: 'standards', title: curriculum.hubCrumb, text: firstSentence(curriculum.hubLead), href: `/${locale}/curriculum`, look: look.standards ?? null });
  if (doors.length < 2 || !t.myUi.lead || !g.pricingTitle) return null;
  return { heading: g.pricingTitle, body: t.myUi.lead, gradeLabel: t.myUi.gradeLabel, grades: t.grades, doors, allHref: `/${locale}/units`, allLabel: t.unitUi.planAllUnits };
}
