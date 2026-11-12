/**
 * "Take a look": one real unit, opened, on the pricing page (Daily Teaching System, Part 11.2 and 11.6; operator
 * 2026-11-12: the strategic pages show the teaching system). The pricing page was the weakest step of the path
 * (1,228 sessions, 28 checkouts in 28 days) and told about units without showing one.
 *
 * The unit is the first unit of the Grade 1 mathematics plan of the language (the grade most visitors teach by the
 * topic-page numbers), else the first live unit. Its first four lessons are shown with the picture of the worksheet
 * each one hands out, and the page says what of it is the plan's (the whole unit as one file, the teacher guide).
 * Server component; every string is one a native reader has seen (content/units/ui.<loc>.json and the panel file).
 * A language without live units renders nothing.
 */
import { listedUnits, getUnitUi, pageThumb, fill } from '@/lib/units';
import type { TeacherGateProps } from '@/lib/teacher-gate';

export default async function PricingUnitLook({ locale, gate, plan }: { locale: string; gate: TeacherGateProps | null; plan: string }) {
  if (!gate) return null;
  const [u, ui] = await Promise.all([listedUnits(locale), getUnitUi(locale)]);
  if (!u.live || !ui || u.units.length < 2) return null;
  const firstOf = (grade: string, subject: string) => { const p = u.plans.find((x) => x.grade === grade && x.subject === subject); return p ? u.units.find((x) => x.id === p.units[0]?.id) : undefined; };
  const unit = firstOf('1', 'math') || firstOf('2', 'math') || u.units[0];
  const lessons = unit.lessons.filter((l) => l.paper.length).slice(0, 4);
  if (lessons.length < 2) return null;
  const href = `/${locale}/units/${unit.slug}`;
  return (
    <section data-unit-look="" aria-labelledby="unit-look-title" className="mb-16 rounded-xl border border-cream-300 bg-white p-6 md:p-8">
      <p className="font-semibold text-ink-700">{gate.ui.pricingSee}</p>
      <h2 id="unit-look-title" className="font-display text-2xl font-semibold text-ink-900">
        <a className="underline decoration-terracotta-400 decoration-2 underline-offset-4" href={href}>{unit.title}</a>
      </h2>
      <p className="mt-1 text-ink-700">
        {fill(ui.factLessons, { n: unit.lessons.length })} · {unit.weeks === 1 ? ui.factWeek : fill(ui.factWeeks, { n: unit.weeks })}
      </p>
      <ol className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {lessons.map((l) => (
          <li key={l.n} className="rounded-lg border border-cream-300 bg-cream-50 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pageThumb(locale, l.paper[0].core)} alt={l.paper[0].title} loading="lazy" width={300} height={388} className="mb-3 aspect-[300/388] w-full rounded border border-cream-300 bg-white object-contain" />
            <p className="text-sm font-semibold text-ink-700">{fill(ui.lessonWord, { n: l.n })}</p>
            <p className="font-semibold text-ink-900">{l.title}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-ink-900"><span className="font-semibold">{ui.teacherTitle}.</span> {fill(ui.planNote, { plan })}</p>
      <p className="mt-2"><a className="inline-flex min-h-[44px] items-center font-semibold underline underline-offset-4" href={`/${locale}/units`}>{ui.planAllUnits}</a></p>
    </section>
  );
}
