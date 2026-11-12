'use client';

/**
 * "My teaching": what an account without the plan sees on its first page (Daily Teaching System, Part 11.3).
 * The data comes from the server (lib/my-teaching.ts): the live units of the language by grade, in teaching order.
 * The grade a teacher picks stays on her device (localStorage); nothing about it is sent anywhere.
 */
import { useEffect, useState } from 'react';
import type { MyTeachingData } from '@/lib/my-teaching';
import type { TeacherGateProps } from '@/lib/teacher-gate';

type Umami = { track: (event: string, data?: Record<string, unknown>) => void };
const track = (name: string, data: Record<string, unknown>) => { try { (window as unknown as { umami?: Umami }).umami?.track(name, data); } catch { /* counting never breaks a page */ } };
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? `{${k}}`));
const GRADE_KEY = 'lcs-my-grade';
/** the page a wall or a panel sent the teacher away from (set there, read once here; this tab only) */
export const RETURN_KEY = 'lcs-return';

const card = 'rounded-2xl border border-[#CFC5AE] bg-[#FFFDF8] p-5 shadow-[0_2px_6px_-2px_rgba(74,56,24,0.18)] md:p-6';
const h2 = 'font-lcsDisplay text-[1.25rem] font-bold leading-tight text-[#14322D]';
const link = 'font-semibold text-[#0F5A4F] underline underline-offset-4 hover:text-[#14322D]';

/**
 * `page` makes it the grade page for everyone (/<language>/teach/<grade>, Part 11.4): the grade is fixed by the
 * address, the grade chips are links to the other grade pages, the heading names the grade, and the card on the right
 * speaks of the plan, not of "your account" (the reader may have none).
 */
export default function MyTeaching({ locale, plan, data, gate, gradeLabels, subjectLabels, topicHrefs, page }: {
  locale: string; plan: string; data: MyTeachingData; gate: TeacherGateProps | null;
  gradeLabels: Record<string, string>; subjectLabels: Record<string, string>; topicHrefs: Record<string, string>;
  page?: { grade: string; heading: string; hrefs: Record<string, string> };
}) {
  const { ui, grades } = data;
  const [grade, setGrade] = useState<string>(page && grades.some((x) => x.grade === page.grade) ? page.grade : grades[0].grade);
  const [back, setBack] = useState<string | null>(null);

  useEffect(() => {
    if (page) return; // the address says the grade; nothing is read from or kept on the device
    try {
      const g = window.localStorage.getItem(GRADE_KEY);
      if (g && grades.some((x) => x.grade === g)) setGrade(g);
      const r = window.sessionStorage.getItem(RETURN_KEY);
      // only a page of this site in this language, and never this page itself
      if (r && r.startsWith(`/${locale}/`) && !r.includes('//') && !r.startsWith(`/${locale}/workspace`)) setBack(r);
      window.sessionStorage.removeItem(RETURN_KEY);
    } catch { /* storage blocked: the page works without it */ }
  }, [grades, locale, page]);

  const pick = (g: string) => {
    setGrade(g);
    try { window.localStorage.setItem(GRADE_KEY, g); } catch { /* not kept; nothing else changes */ }
    track('my-teaching-grade', { grade: g });
  };
  const now = grades.find((x) => x.grade === grade) || grades[0];
  const gives: string[] = [];
  if (gate) {
    gives.push(gate.ui.gives_downloads);
    if (gate.facts.units > 1) gives.push(fill(gate.ui.gives_units, { n: gate.facts.units }));
    if (gate.facts.plans > 1) gives.push(fill(gate.ui.gives_plans, { n: gate.facts.plans }));
    if (gate.facts.subPlans > 1) gives.push(fill(gate.ui.gives_subPlans, { n: gate.facts.subPlans }));
    if (gate.facts.checks > 1) gives.push(fill(gate.ui.gives_checks, { n: gate.facts.checks }));
  }

  return (
    <div className="grid gap-6" data-my-teaching="">
      <header className="max-w-3xl">
        <h1 className="mb-2.5 font-lcsDisplay text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#14322D] md:text-[2rem]">{page ? page.heading : ui.title}</h1>
        <span aria-hidden="true" className="mb-3.5 block h-1.5 w-14 rounded-full bg-lcs-coral" />
        <p className="font-lcsBody text-[#3D4F49]">{ui.lead}</p>
      </header>

      {back ? (
        <p className={`${card} max-w-3xl`}>
          <span className="mb-1 block font-lcsDisplay font-bold text-[#14322D]">{ui.backTitle}</span>
          <a className={`${link} inline-flex min-h-[44px] items-center`} href={back}>{ui.backLink}</a>
        </p>
      ) : null}

      <div role="group" aria-label={ui.gradeLabel} className="flex flex-wrap items-center gap-2">
        <span className="mr-1 font-lcsBody font-semibold text-[#3D4F49]">{ui.gradeLabel}</span>
        {grades.map((g) => page ? (
          <a key={g.grade} href={page.hrefs[g.grade]} aria-current={g.grade === now.grade ? 'page' : undefined}
            className={`inline-flex min-h-[44px] items-center rounded-full border-2 px-4 py-2 font-lcsDisplay font-semibold no-underline transition-colors ${g.grade === now.grade ? 'border-[#0F5A4F] bg-[#0F5A4F] text-white' : 'border-[#CFC5AE] bg-[#FFFDF8] text-[#14322D] hover:border-[#0F5A4F]'}`}>
            {gradeLabels[g.grade] || g.grade}
          </a>
        ) : (
          <button key={g.grade} type="button" aria-pressed={g.grade === now.grade} onClick={() => pick(g.grade)}
            className={`min-h-[44px] rounded-full border-2 px-4 py-2 font-lcsDisplay font-semibold transition-colors ${g.grade === now.grade ? 'border-[#0F5A4F] bg-[#0F5A4F] text-white' : 'border-[#CFC5AE] bg-[#FFFDF8] text-[#14322D] hover:border-[#0F5A4F]'}`}>
            {gradeLabels[g.grade] || g.grade}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid gap-6 lg:col-span-2">
          {now.subjects.map((s) => (
            <section key={s.subject} className={card} aria-label={fill(ui.unitsTitle, { subject: subjectLabels[s.subject] || s.subject })}>
              <h2 className={h2}>{fill(ui.unitsTitle, { subject: subjectLabels[s.subject] || s.subject })}</h2>
              {s.plan ? <p className="mt-1"><a className={`${link} inline-flex min-h-[44px] items-center`} href={`/${locale}/units/${s.plan.slug}`}>{fill(ui.planLink, { weeks: s.plan.weeks })}</a></p> : null}
              <ol className="mt-4 grid gap-2">
                {s.units.map((u, i) => (
                  <li key={u.slug} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl border border-[#E3DCC9] bg-[#F5F1E6] px-4 py-3">
                    <span aria-hidden="true" className="font-lcsDisplay font-bold text-[#5E706A]">{i + 1}</span>
                    <a className={`${link} inline-flex min-h-[44px] items-center`} href={`/${locale}/units/${u.slug}`}>{u.title}</a>
                    {i === 0 ? <span className="rounded-full bg-lcs-coral px-2.5 py-0.5 text-sm font-bold text-[#2A1206]">{ui.startHere}</span> : null}
                    <span className="basis-full text-sm text-[#3D4F49] sm:basis-auto">{u.weeks === 1 ? fill(ui.unitFactsOneWeek, { lessons: u.lessons }) : fill(ui.unitFacts, { lessons: u.lessons, weeks: u.weeks })}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
          {now.subjects.length === 0 ? <p className={card}>{ui.noUnits}</p> : null}
        </div>

        <div className="grid content-start gap-6">
          <section className={card}>
            <h2 className={h2}>{ui.alsoTitle}</h2>
            <ul className="mt-3 grid gap-1">
              {data.hasSubPlans && now.subPlans > 1 ? <li><a className={`${link} inline-flex min-h-[44px] items-center`} href={`/${locale}/sub-plans`}>{fill(ui.alsoSubPlans, { n: now.subPlans })}</a></li> : null}
              {data.hasChecks && now.checks > 1 ? <li><a className={`${link} inline-flex min-h-[44px] items-center`} href={`/${locale}/assessments`}>{fill(ui.alsoChecks, { n: now.checks })}</a></li> : null}
              {data.hasStandards ? <li><a className={`${link} inline-flex min-h-[44px] items-center`} href={`/${locale}/curriculum`}>{ui.alsoStandards}</a></li> : null}
              {topicHrefs[now.grade] ? <li><a className={`${link} inline-flex min-h-[44px] items-center`} href={topicHrefs[now.grade]}>{ui.alsoWorksheets}</a></li> : null}
            </ul>
          </section>

          <section className={card}>
            <h2 className={h2}>{page && gate ? fill(gate.ui.planTitle, { plan }) : ui.accountTitle}</h2>
            {page ? null : <p className="mt-2 text-[#3D4F49]">{fill(ui.accountBody, { n: data.downloadsPerMonth })}</p>}
            {gate ? (
              <>
                <p className="mt-4 font-semibold text-[#14322D]">{fill(ui.planLead, { plan })}</p>
                <ul className="mt-2 grid list-disc gap-1 pl-5 text-[0.9375rem] text-[#3D4F49]">{gives.map((g) => <li key={g}>{g}</li>)}</ul>
                <p className="mt-3 font-lcsDisplay text-lg font-bold text-[#0F5A4F]">{fill(gate.ui.planPrice, { price: gate.price, monthly: gate.monthly })}</p>
                <a href={`/${locale}/pricing?from=${page ? 'teach' : 'workspace'}`} onClick={() => track('my-teaching-cta', { grade: now.grade })}
                  className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-lcs-coral px-6 py-3 font-lcsDisplay font-semibold text-[#2A1206] transition-shadow hover:shadow-[0_3px_10px_-2px_rgba(74,56,24,0.35)]">
                  {fill(gate.ui.seePlan, { plan })}
                </a>
              </>
            ) : null}
            {page ? null : <p className="mt-4 text-sm text-[#5E706A]">{fill(ui.collectionsNote, { plan })}</p>}
          </section>
        </div>
      </div>
    </div>
  );
}
