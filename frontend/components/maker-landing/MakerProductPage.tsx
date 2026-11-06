/* A new worksheet maker's landing page. Everything shown is the product itself: the sheets on the mat, every template on
 * the wall and the screenshot of the maker are real renders in this page's language. The cutting mat (dark teal, ruled)
 * is the one recurring idea across the maker surfaces: the landing, the hub, the homepage room and the ribbon on every
 * worksheet, deck and topic page all put real paper on the same mat, so a teacher learns to read it as "you can make
 * this". */
import '@/components/maker-landing/maker-landing.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { getAxisName, getAxisSlug } from '@/lib/taxonomy';
import { listNonEmptyAxisKeys } from '@/lib/topic-decks';
import { getMakerContent, MAKER_KEYS, MakerKey } from '@/lib/seo/maker-content';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { wwwImg } from '@/lib/img-host';
import themeArtMap from '@/lib/topic-theme-art.json';
import {
  GRADE_ORDER,
  HUB_GROUPS,
  appShotUrl,
  catalogMaker,
  getCopyFile,
  getHubStrings,
  getTemplateFile,
  getUi,
  landingLocales,
  makerAppUrl,
  makerInLocale,
  makerNames,
  ogUrl,
  previewUrl,
  templatesIn,
} from '@/lib/makers/landings';


const NATIVE_LANGUAGE: Record<string, string> = {
  en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', pt: 'Português', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk', no: 'Norsk', fi: 'Suomi',
};
/* Pictures for the library wall, color art only. Theme keys of the generated art index. */
const WALL_KEYS = ['animals', 'fruits', 'space', 'dinosaurs', 'ocean_life', 'vehicles', 'insects_and_bugs', 'zoo_animals', 'farm_animals', 'weather', 'flowers', 'music', 'occupations', 'camping', 'vegetables', 'birds'];
const THEME_ART = themeArtMap as Record<string, string>;

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? `{${k}}`));

export default async function MakerProductPage({ locale, id, slug }: { locale: string; id: string; slug: string }) {
  const [copyFile, tplFile, ui, names] = await Promise.all([getCopyFile(locale), getTemplateFile(locale), getUi(locale), makerNames(locale)]);
  const maker = catalogMaker(id);
  if (!copyFile || !tplFile || !ui || !maker) return null;
  const copy = copyFile[id];
  const tpl = tplFile[id];
  const templates = templatesIn(id, locale);
  const name = names[id];
  const tBreadcrumb = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });

  const open = makerAppUrl(id, locale);
  const screenCount = templates.filter((t) => t.screen).length;
  const keyCount = templates.filter((t) => t.key).length;
  const themed = templates.some((t) => t.themed);
  const hubWords = (await getHubStrings(locale))!;
  const v = { name, count: templates.length, screens: screenCount };

  const bands = GRADE_ORDER
    .map((g) => ({ grade: g, label: ui[`grade${g}`], items: templates.filter((t) => t.grade === g) }))
    .filter((b) => b.items.length);
  /* the plain grades for the sentence in the questions: a band for two grades counts as both */
  const plainGrades = ['K', 'G1', 'G2', 'G3'].filter((g) => bands.some((b) => b.grade === g || (b.grade === 'G23' && (g === 'G2' || g === 'G3'))));
  const gradeList = plainGrades.map((g) => ui[`grade${g}`]).join(', ');

  const showcase = (maker.showcase[locale] || []).slice(0, 3);

  /* Sibling makers in the same subject, for the link mesh. */
  const related = HUB_GROUPS.find((g) => g.makers.includes(id))!.makers
    .filter((m) => m !== id && copyFile[m] && makerInLocale(m, locale))
    .slice(0, 6)
    .map((m) => ({
      id: m,
      name: names[m],
      href: localePath(locale, 'worksheet-makers', copyFile[m].slug),
      pic: catalogMaker(m)!.showcase[locale]?.[0],
    }));

  /* The same maker in the other languages: both a selling point and the visible half of hreflang. */
  const langs: Array<{ locale: string; href: string }> = [];
  for (const l of await landingLocales(id)) {
    const f = await getCopyFile(l);
    langs.push({ locale: l, href: `/${l}/worksheet-makers/${f![id].slug}` });
  }

  /* The classic maker pages this maker absorbed: linked both ways, each keeps its own query. */
  const classics: Array<{ name: string; href: string }> = [];
  for (const app of maker.oldApps) {
    if (!(MAKER_KEYS as readonly string[]).includes(app)) continue;
    const c = await getMakerContent(locale, app as MakerKey);
    if (c?.slug) classics.push({ name: c.name, href: localePath(locale, 'tools', c.slug) });
  }

  /* Ready-made sheets on the same topic: only hubs that really hold decks in this language. */
  let ready: Array<{ name: string; href: string }> = [];
  try {
    const nonEmpty = new Set(await listNonEmptyAxisKeys('exercise-type', locale));
    ready = [...maker.families, ...maker.oldApps]
      .filter((k, i, a) => a.indexOf(k) === i && nonEmpty.has(k))
      .flatMap((k) => {
        const s = getAxisSlug('exercise-type', k, locale);
        const n = getAxisName('exercise-type', k, locale);
        return s && n ? [{ name: n, href: localePath(locale, 'topic', s) }] : [];
      })
      .slice(0, 8);
  } catch { /* DB down: the section is simply absent */ }

  const faq = [
    { q: fill(ui.faqFreeQ, v), a: fill(ui.faqFreeA, v) },
    { q: fill(ui.faqGradesQ, v), a: fill(ui.faqGradesA, { ...v, grades: gradeList }) },
    { q: ui.faqKeyQ, a: keyCount ? fill(keyCount === templates.length ? ui.faqKeyAll : ui.faqKeySome, { ...v, keys: keyCount }) : ui.faqKeyNone },
    { q: fill(ui.faqScreenQ, v), a: screenCount ? fill(screenCount === templates.length ? ui.faqScreenAll : ui.faqScreenSome, v) : fill(ui.faqScreenNone, v) },
    { q: ui.faqLangQ, a: fill(ui.faqLangA, { ...v, languages: langs.map((l) => NATIVE_LANGUAGE[l.locale]).join(', ') }) },
    { q: ui.faqSaveQ, a: ui.faqSaveA },
  ];

  const url = canonicalUrl(localePath(locale, 'worksheet-makers', slug));
  const ogImage = `${CANONICAL_HOST}${ogUrl(id, locale)}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: copy.metaTitle,
        description: copy.metaDescription,
        inLanguage: getHreflangCode(locale),
        primaryImageOfPage: { '@type': 'ImageObject', url: ogImage, contentUrl: ogImage, width: 1200, height: 630, caption: copy.kw },
        mainEntity: { '@id': `${url}#app` },
      },
      {
        '@type': 'WebApplication',
        '@id': `${url}#app`,
        name: copy.kw,
        alternateName: name,
        description: copy.metaDescription,
        url,
        inLanguage: langs.map((l) => getHreflangCode(l.locale)),
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web browser',
        browserRequirements: 'Requires JavaScript. Runs in any modern browser.',
        image: ogImage,
        screenshot: showcase.map((t) => ({ '@type': 'ImageObject', contentUrl: `${CANONICAL_HOST}${previewUrl(id, locale, t)}`, caption: tpl[t]?.[0] })),
        audience: { '@type': 'EducationalAudience', educationalRole: 'teacher' },
        isAccessibleForFree: true,
        offers: [
          { '@type': 'Offer', name: ui.planFreeName, price: '0', priceCurrency: 'USD' },
          { '@type': 'Offer', name: ui.planPaidName, price: SUBSCRIPTION_PRODUCT.priceUsd.toFixed(2), priceCurrency: 'USD', category: 'subscription' },
        ],
        creator: { '@type': 'Organization', name: 'LessonCraftStudio', url: CANONICAL_HOST },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubName, path: localePath(locale, 'worksheet-makers') },
    { name, path: localePath(locale, 'worksheet-makers', slug) },
  ] as BreadcrumbCrumb[]);

  const sheet = (template: string, n: number) => (
    <img
      key={template}
      className={`ml-fan-sheet is-${n}`}
      src={previewUrl(id, locale, template)}
      alt={fill(ui.sheetAlt, { title: tpl[template]?.[0] ?? name, name })}
      width={640}
      height={860}
      decoding="async"
      {...(n === 0 ? { fetchPriority: 'high' as const } : {})}
    />
  );

  return (
    <main className={`ml ${baloo2.variable} ${nunito.variable}`}>
      <div className="ml-crumbs">
        <BreadcrumbTrail locale={locale} trail={[{ href: `/${locale}/worksheet-makers`, label: ui.hubName }, { label: name }]} />
      </div>

      <section className="ml-hero ml-mat" aria-labelledby="ml-h1">
        <div className="ml-hero-inner">
          <div className="ml-hero-copy">
            <h1 id="ml-h1">{copy.kw}</h1>
            <p className="ml-lead">{copy.lead}</p>
            <div className="ml-ctas">
              <a className="ml-btn" href={open}>{fill(ui.openMaker, v)}</a>
              <a className="ml-link-light" href="#every-worksheet">{fill(ui.seeEvery, v)}</a>
            </div>
            <p className="ml-free-line">{ui.freeLine}</p>
          </div>
          <div className="ml-fan">
            {showcase[1] ? sheet(showcase[1], 1) : null}
            {showcase[2] ? sheet(showcase[2], 2) : null}
            {showcase[0] ? sheet(showcase[0], 0) : null}
          </div>
        </div>
        <div className="ml-ruler" aria-hidden="true" />
      </section>

      <ul className={themed ? 'ml-proofs' : 'ml-proofs is-three'}>
        {themed && <li><strong>{ui.proofPictures}</strong><span>{ui.proofPicturesBody}</span></li>}
        <li><strong>{ui.proofLanguages}</strong><span>{ui.proofLanguagesBody}</span></li>
        <li><strong>{ui.proofTwoWays}</strong><span>{screenCount ? ui.proofTwoWaysBody : ui.proofPaperBody}</span></li>
        <li><strong>{ui.proofShare}</strong><span>{ui.proofShareBody}</span></li>
      </ul>

      <section id="every-worksheet" className="ml-wall" aria-labelledby="ml-wall-h">
        <header className="ml-wall-head">
          <h2 id="ml-wall-h">{fill(ui.wallTitle, v)}</h2>
          <p>{fill(ui.wallBody, v)}</p>
          {bands.length > 1 ? (
            <nav className="ml-bands" aria-label={ui.bandsAria}>
              {bands.map((b) => (<a key={b.grade} href={`#band-${b.grade}`}>{b.label}</a>))}
            </nav>
          ) : null}
        </header>
        {bands.map((b) => (
          <div key={b.grade} id={`band-${b.grade}`} className="ml-band">
            <h3>{b.label}</h3>
            <ul className="ml-grid">
              {b.items.map((t) => (
                <li key={t.id}>
                  <a className="ml-card" href={makerAppUrl(id, locale, t.id)}>
                    <span className="ml-card-paper">
                      <img src={previewUrl(id, locale, t.id)} alt={fill(ui.sheetAlt, { title: tpl[t.id]?.[0] ?? name, name })} width={640} height={860} loading="lazy" decoding="async" />
                      {t.screen ? <span className="ml-card-flag">{ui.alsoOnScreen}</span> : null}
                    </span>
                    <span className="ml-card-title">{tpl[t.id]?.[0]}</span>
                    {tpl[t.id]?.[1] ? <span className="ml-card-text">{tpl[t.id][1]}</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="ml-how" aria-labelledby="ml-how-h">
        <div className="ml-how-copy">
          <h2 id="ml-how-h">{ui.howTitle}</h2>
          <ol className="ml-steps">
            <li><strong>{ui.step1}</strong><span>{fill(ui.step1Body, v)}</span></li>
            <li><strong>{ui.step2}</strong><span>{themed ? ui.step2Body : ui.step2BodyPlain}</span></li>
            <li><strong>{ui.step3}</strong><span>{screenCount ? ui.step3Body : ui.step3BodyPaper}</span></li>
          </ol>
          <a className="ml-btn" href={open}>{fill(ui.openMaker, v)}</a>
        </div>
        <figure className="ml-browser">
          <div className="ml-browser-bar" aria-hidden="true"><i /><i /><i /></div>
          <img src={appShotUrl(id, locale)} alt={fill(ui.appAlt, v)} width={1280} height={800} loading="lazy" decoding="async" />
        </figure>
      </section>

      <section className="ml-teach" aria-labelledby="ml-teach-h">
        <div>
          <h2 id="ml-teach-h">{ui.teachTitle}</h2>
          <ul>{copy.teaches.map((x) => (<li key={x}>{x}</li>))}</ul>
        </div>
        <aside className="ml-note">
          <h3>{ui.tomorrowTitle}</h3>
          <p>{copy.moment}</p>
        </aside>
      </section>

      <section className={themed ? 'ml-library' : 'ml-library is-plain'} aria-labelledby="ml-lib-h">
        <div className="ml-library-copy">
          <h2 id="ml-lib-h">{themed ? ui.libraryTitle : hubWords.langTitle}</h2>
          <p>{themed ? ui.libraryBody : ui.libraryBodyPlain}</p>
          <ul className="ml-langs" aria-label={ui.langsAria}>
            {langs.map((l) => (
              <li key={l.locale}>
                {l.locale === locale
                  ? <span aria-current="page">{NATIVE_LANGUAGE[l.locale]}</span>
                  : <a href={l.href} hrefLang={getHreflangCode(l.locale)}>{NATIVE_LANGUAGE[l.locale]}</a>}
              </li>
            ))}
          </ul>
        </div>
        {themed && <ul className="ml-pics" aria-hidden="true">
          {WALL_KEYS.map((k) => (<li key={k}><img src={wwwImg(THEME_ART[k])} alt="" width={96} height={96} loading="lazy" decoding="async" /></li>))}
        </ul>}
      </section>

      <section className="ml-plans ml-mat" aria-labelledby="ml-plans-h">
        <div className="ml-plans-inner">
          <h2 id="ml-plans-h">{ui.plansTitle}</h2>
          <p className="ml-plans-sub">{ui.plansBody}</p>
          <div className="ml-plan-cols">
            <div className="ml-plan">
              <h3>{ui.planFreeName}</h3>
              <p className="ml-price">{ui.planFreePrice}</p>
              <ul>
                <li>{ui.planFree1}</li>
                <li>{ui.planFree2}</li>
                <li>{ui.planFree3}</li>
              </ul>
              <a className="ml-btn-ghost" href={open}>{fill(ui.openMaker, v)}</a>
            </div>
            <div className="ml-plan is-paid">
              <h3>{ui.planPaidName}</h3>
              <p className="ml-price">{fill(ui.planPaidPrice, { year: SUBSCRIPTION_PRODUCT.priceUsd, month: SUBSCRIPTION_PRODUCT.monthlyPriceUsd })}</p>
              <ul>
                <li>{ui.planPaid1}</li>
                <li>{ui.planPaid2}</li>
                <li>{ui.planPaid3}</li>
                <li>{ui.planPaid4}</li>
              </ul>
              <Link className="ml-btn" href={`/${locale}/pricing`}>{ui.seePlans}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ml-faq" aria-labelledby="ml-faq-h">
        <h2 id="ml-faq-h">{ui.faqTitle}</h2>
        {faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      {related.length ? (
        <section className="ml-related" aria-labelledby="ml-rel-h">
          <h2 id="ml-rel-h">{ui.relatedTitle}</h2>
          <ul>
            {related.map((r) => (
              <li key={r.id}>
                <Link href={r.href}>
                  {r.pic ? <img src={previewUrl(r.id, locale, r.pic)} alt="" width={640} height={860} loading="lazy" decoding="async" /> : null}
                  <span>{r.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Link className="ml-hub-link ml-mat" href={`/${locale}/worksheet-makers`}>
        <span className="ml-hub-stack" aria-hidden="true">
          {related.slice(0, 3).map((r) => (r.pic ? <img key={r.id} src={previewUrl(r.id, locale, r.pic)} alt="" width={640} height={860} loading="lazy" decoding="async" /> : null))}
        </span>
        <span className="ml-hub-text">
          <strong>{ui.seeAll}</strong>
          <span>{ui.seeAllBody}</span>
        </span>
      </Link>

      {classics.length || ready.length ? (
        <nav className="ml-more" aria-label={ui.moreAria}>
          {ready.length ? (
            <div>
              <h2>{ui.readyTitle}</h2>
              <ul>{ready.map((r) => (<li key={r.href}><Link href={r.href}>{r.name}</Link></li>))}</ul>
            </div>
          ) : null}
          {classics.length ? (
            <div>
              <h2>{ui.classicTitle}</h2>
              <ul>{classics.map((r) => (<li key={r.href}><Link href={r.href}>{r.name}</Link></li>))}</ul>
            </div>
          ) : null}
        </nav>
      ) : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
