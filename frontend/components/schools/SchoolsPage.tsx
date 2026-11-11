/* The "For schools" page: /<locale>/schools (Daily Teaching System, Part 6; PLAN §11 ruling 6).
 *
 * What a school buys is the Teacher plan for each of its teachers, on one invoice the operator writes by hand. The
 * page states no price: the plan's own items and its name are read from the pricing page's strings
 * (messages `pricingPage.tier`), so the two pages cannot disagree; the price is on the pricing page and in the quote.
 * The same page for everyone: no cookie, no query. Look of the units (components/units/units.css). */
import '@/components/units/units.css';
import '@/components/schools/schools.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { MAKER_COUNT } from '@/lib/seo/maker-content';
import { fill } from '@/lib/units';
import { QUOTE_LIMITS, SCHOOLS_CONTACT_EMAIL, SchoolsUi } from '@/lib/schools';
import QuoteForm from '@/components/schools/QuoteForm';

/** the items of the Teacher plan as the pricing page lists them (item0 is the headline benefit) */
const TIER_ITEMS = [0, 1, 2, 3, 4, 5];

export default async function SchoolsPage({ locale, ui, has }: {
  locale: string;
  ui: SchoolsUi;
  /** which of the open hubs the language has, so that no link leads to a 404 */
  has: { checklists: boolean; units: boolean; subs: boolean };
}) {
  const [tTier, tBreadcrumb] = await Promise.all([
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
  ]);
  const plan = tTier('name');
  const url = canonicalUrl(localePath(locale, 'schools'));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: ui.metaTitle,
    description: ui.metaDescription,
    url,
    inLanguage: getHreflangCode(locale),
    publisher: { '@type': 'Organization', name: 'LessonCraftStudio', url: canonicalUrl('/') },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.crumb, path: localePath(locale, 'schools') },
  ]);
  const see = [
    has.checklists ? { href: `/${locale}/curriculum`, title: ui.seeChecklists, note: ui.seeChecklistsNote } : null,
    has.units ? { href: `/${locale}/units`, title: ui.seeUnits, note: ui.seeUnitsNote } : null,
    has.subs ? { href: `/${locale}/sub-plans`, title: ui.seeSubs, note: ui.seeSubsNote } : null,
  ].filter((x): x is { href: string; title: string; note: string } => !!x);

  return (
    <main className={`un sc ${baloo2.variable} ${nunito.variable}`}>
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.crumb }]} />

        <header className="un-head">
          <p className="un-eyebrow">{ui.eyebrow}</p>
          <h1 className="un-title un-title-wide">{ui.title}</h1>
          <p className="un-hub-lead">{fill(ui.lead, { plan })}</p>
          <p className="sc-jump"><a className="sc-button sc-button-link" href="#quote">{ui.jumpForm}</a></p>
        </header>

        <section className="sc-section" aria-labelledby="sc-plan-title">
          <h2 id="sc-plan-title">{fill(ui.planTitle, { plan })}</h2>
          <p className="sc-lead">{fill(ui.planLead, { plan })}</p>
          <ul className="sc-list">
            {TIER_ITEMS.map((i) => <li key={i}>{tTier(`item${i}`, { count: MAKER_COUNT })}</li>)}
            {has.units ? <li>{ui.planItemUnits}</li> : null}
            {has.subs ? <li>{ui.planItemSubs}</li> : null}
          </ul>
          <p className="sc-one">{ui.planOne} <a href={`/${locale}/pricing`}>{fill(ui.planOneLink, { plan })}</a></p>
        </section>

        {see.length ? (
          <section className="sc-section" aria-labelledby="sc-see-title">
            <h2 id="sc-see-title">{ui.seeTitle}</h2>
            <p className="sc-lead">{ui.seeLead}</p>
            <ul className="sc-see">
              {see.map((x) => (
                <li key={x.href}>
                  <h3><a href={x.href}>{x.title}</a></h3>
                  <p>{x.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="sc-section" aria-labelledby="sc-how-title">
          <h2 id="sc-how-title">{ui.howTitle}</h2>
          <ol className="sc-steps">
            <li>{ui.howStep1}</li>
            <li>{ui.howStep2}</li>
            <li>{ui.howStep3}</li>
            <li>{fill(ui.howStep4, { plan })}</li>
          </ol>
        </section>

        <section className="sc-section" aria-labelledby="sc-students-title">
          <h2 id="sc-students-title">{ui.studentsTitle}</h2>
          <p className="sc-lead">{ui.studentsText} <a href={`/${locale}/privacy`}>{ui.privacyLink}</a></p>
        </section>

        <section className="sc-section sc-quote" id="quote" aria-labelledby="sc-form-title">
          <h2 id="sc-form-title">{ui.formTitle}</h2>
          <p className="sc-lead">{ui.formLead}</p>
          <QuoteForm ui={ui} locale={locale} email={SCHOOLS_CONTACT_EMAIL} limits={QUOTE_LIMITS} />
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
