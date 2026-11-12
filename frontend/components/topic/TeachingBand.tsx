/**
 * The teaching band of a topic page (Daily Teaching System, Part 11.6; operator 2026-11-12: every entry page
 * reflects the teaching system and leads to the Teacher plan). Server component: plain links, nothing to load.
 *
 * Left: what a teacher can open today (the units of the grade in teaching order, the lessons that hand out
 * worksheets of this type, or the way into the lesson plans). Right: what the Teacher plan adds, its price, one button.
 * Data and strings: lib/topic-teaching.ts (live content only; strings a native reader has already seen).
 * The band is ADDED to the page: the page's title, description, heading and links are untouched.
 * It is kept SHORT (measured by the local check: at most 560 px on a phone, 320 px on a desktop): the worksheets a
 * visitor came for must stay near; the list of what the plan gives is shown from tablet width up.
 */
import type { TopicTeaching } from '@/lib/topic-teaching';

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? `{${k}}`));
const link = 'font-semibold text-[#0F5A4F] underline underline-offset-4 hover:text-[#14322D]';
const tap = 'inline-flex min-h-[44px] items-center';

export default function TeachingBand({ locale, data }: { locale: string; data: TopicTeaching }) {
  const { unitUi, myUi, gate, plan } = data;
  const gives: string[] = [];
  if (gate) {
    if (gate.facts.units > 1) gives.push(fill(gate.ui.gives_units, { n: gate.facts.units }));
    if (gate.facts.subPlans > 1) gives.push(fill(gate.ui.gives_subPlans, { n: gate.facts.subPlans }));
    if (gate.facts.checks > 1) gives.push(fill(gate.ui.gives_checks, { n: gate.facts.checks }));
  }
  const hubLinks = (
    <p className="mt-1 flex flex-wrap gap-x-5">
      <a className={`${link} ${tap}`} href={`/${locale}/units`}>{unitUi.planAllUnits}</a>
      {data.subPlans > 1 ? <a className={`${link} ${tap}`} href={`/${locale}/sub-plans`}>{fill(myUi.alsoSubPlans, { n: data.subPlans })}</a> : null}
      {data.checks > 1 ? <a className={`${link} ${tap}`} href={`/${locale}/assessments`}>{fill(myUi.alsoChecks, { n: data.checks })}</a> : null}
      {data.hasStandards ? <a className={`${link} ${tap} max-md:hidden`} href={`/${locale}/curriculum`}>{myUi.alsoStandards}</a> : null}
    </p>
  );
  return (
    <section data-teaching-band={data.kind} aria-labelledby="teaching-band-title" className="mb-8 overflow-hidden rounded-2xl border border-[#CFC5AE] bg-[#FFFDF8] shadow-[0_2px_6px_-2px_rgba(74,56,24,0.18)]">
      <div className="grid lg:grid-cols-3">
        <div className="px-5 pb-3 pt-5 md:px-6 lg:col-span-2">
          <h2 id="teaching-band-title" className="font-display text-xl font-semibold leading-tight text-[#14322D]">
            {data.kind === 'type' ? unitUi.partOfTitle : unitUi.hubTitle}
          </h2>
          {data.kind === 'grade' ? (
            <ul className="mt-2 grid gap-x-6 md:grid-cols-2">
              {data.subjects.map((s) => (
                <li key={s.subject}>
                  <span className="font-semibold text-[#14322D]">{s.label}</span>
                  {s.units.length > 1 ? <span className="text-[#3D4F49]"> ({fill(unitUi.hubFactUnits, { n: s.units.length })})</span> : null}
                  <span className="flex flex-wrap items-center gap-x-2">
                    <span className="whitespace-nowrap rounded-full max-md:hidden bg-[#F2784B] px-2 py-0.5 text-sm font-bold text-[#2A1206]">{myUi.startHere}</span>
                    <a className={`${link} ${tap}`} href={`/${locale}/units/${s.units[0].slug}`}>{s.units[0].title}</a>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {data.kind === 'type' ? (
            <ul className="mt-2 grid">
              {data.lessons.map((l) => (
                <li key={l.unitSlug + l.lesson}>
                  <a className={`${link} ${tap}`} href={`/${locale}/units/${l.unitSlug}#lesson-${l.lesson}`}>{fill(unitUi.lessonWord, { n: l.lesson })}: {l.lessonTitle}</a>
                  <span className="ml-2 text-[0.9375rem] text-[#3D4F49] max-md:hidden">{l.gradeLabel} · {l.unitTitle}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {hubLinks}
        </div>
        {gate ? (
          <div className="border-t border-[#CFC5AE] bg-[#F1ECDD] px-5 py-4 md:px-6 lg:border-l lg:border-t-0">
            <p className="font-display text-lg font-semibold text-[#14322D]">{fill(gate.ui.planTitle, { plan })}</p>
            <ul className="mt-1 list-disc pl-5 text-[0.9375rem] leading-snug text-[#3D4F49] max-md:hidden">{gives.map((g) => <li key={g}>{g}</li>)}</ul>
            <p className="mt-1 font-semibold text-[#0F5A4F]">{fill(gate.ui.planPrice, { price: gate.price, monthly: gate.monthly })}</p>
            <a href={`/${locale}/pricing?from=topic`} className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#F2784B] px-6 py-2.5 text-center font-display font-semibold text-[#2A1206] no-underline transition-shadow hover:shadow-[0_3px_10px_-2px_rgba(74,56,24,0.35)]">
              {fill(gate.ui.seePlan, { plan })}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
