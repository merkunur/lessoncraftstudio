/**
 * A look inside the Teacher plan (Daily Teaching System, Part 11.6): three pictures of REAL pages of the plan's
 * files for one grade (a lesson sheet of a teacher guide, the first page a guest teacher gets, the teacher page of a
 * unit check), each under the sentence that says what the file is, then the plan's price and one button.
 *
 * Until this section a topic page could only tell a visitor what the plan holds: the files themselves are behind the
 * plan. It stands BELOW the worksheets (the page's own content first; one main action per screen).
 * The pictures are made from the built files by scripts/units/build-looks.js and listed in
 * content/units/looks.<language>.json; a language or grade without them shows nothing.
 * Every sentence is one a native reader has already read (content/teacher-gate/ui.<language>.json).
 */
import type { TopicTeaching, TeachingLookItem } from '@/lib/topic-teaching';

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? `{${k}}`));

function Figure({ item, href, caption, label, linkText }: { item: TeachingLookItem; href: string; caption: string; label: string; linkText?: string }) {
  return (
    <li className="flex flex-col">
      <a href={href} className="block overflow-hidden rounded-xl border border-[#CFC5AE] bg-white shadow-[0_2px_6px_-2px_rgba(74,56,24,0.25)]">
        {/* the top of the page: enough to see it is a real one; the whole page is in the file */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.src} width={item.width} height={item.height} alt={`${item.title}: ${label}`} loading="lazy" decoding="async" className="block aspect-[4/3] w-full object-cover object-top md:aspect-[4/5]" />
      </a>
      <p className="mt-3 text-[0.9375rem] leading-snug text-[#3D4F49]">{caption}</p>
      <a href={href} className="mt-1 inline-flex min-h-[44px] items-center font-semibold text-[#0F5A4F] underline underline-offset-4 hover:text-[#14322D]">{linkText || item.title}</a>
    </li>
  );
}

export default function TeachingLook({ locale, data, from = 'topic-look' }: { locale: string; data: TopicTeaching; from?: string }) {
  const { gate, look, plan } = data;
  if (!gate || !look || !look.unit) return null;
  const ui = gate.ui;
  return (
    <section data-teaching-look aria-labelledby="teaching-look-title" className="mt-12 rounded-2xl border border-[#CFC5AE] bg-[#FFFDF8] px-5 py-6 shadow-[0_2px_6px_-2px_rgba(74,56,24,0.18)] md:px-7 print:hidden">
      <h2 id="teaching-look-title" className="font-display text-2xl font-semibold leading-tight text-[#14322D]">{ui.pricingTitle}</h2>
      <p className="mt-2 max-w-3xl text-[#3D4F49]">{ui.pricingLead.replace(/:\s*$/, '.')}</p>
      <ul className="mt-5 grid gap-6 md:grid-cols-3">
        <Figure item={look.unit} href={`/${locale}/units/${look.unit.slug}`} caption={ui['what_unit-guide']} label={ui.link_units} />
        {look.pack ? <Figure item={look.pack} href={`/${locale}/sub-plans/${look.pack.slug}`} caption={ui['what_sub-plan-file']} label={ui.link_subPlans} /> : null}
        {look.check ? <Figure item={look.check} href={`/${locale}/assessments`} caption={ui['what_check-teacher-pages']} label={ui.link_checks} linkText={ui.link_checks} /> : null}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#E3DCC9] pt-5">
        <p className="font-semibold text-[#0F5A4F]">{fill(ui.planTitle, { plan })}: {fill(ui.planPrice, { price: gate.price, monthly: gate.monthly })}</p>
        <a href={`/${locale}/pricing?from=${from}`} className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#F2784B] px-6 py-2.5 text-center font-display font-semibold text-[#2A1206] no-underline transition-shadow hover:shadow-[0_3px_10px_-2px_rgba(74,56,24,0.35)]">
          {fill(ui.seePlan, { plan })}
        </a>
      </div>
    </section>
  );
}
