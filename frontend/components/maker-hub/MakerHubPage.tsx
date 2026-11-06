/* The worksheet makers' hub: /<locale>/worksheet-makers. The one place a K-3 teacher sees the whole collection, finds what
 * she is teaching this week and reaches its maker. Real sheets on the same cutting mat as every maker surface; every
 * number on the page is counted from the catalog in this language, never written by hand. */
import '@/components/maker-landing/maker-landing.css';
import './maker-hub.css';
import { Baloo_2, Nunito } from 'next/font/google';
import Link from 'next/link';
import { CANONICAL_HOST, localePath } from '@/lib/seo/url';
import { getMakerContent, MAKER_KEYS } from '@/lib/seo/maker-content';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { wwwImg } from '@/lib/img-host';
import themeArtMap from '@/lib/topic-theme-art.json';
import {
  GRADE_ORDER,
  HUB_GROUPS,
  MAKER_IDS,
  appShotUrl,
  catalogMaker,
  getCopyFile,
  getHubStrings,
  getTemplateFile,
  getUi,
  hubGroupOf,
  makerAppUrl,
  makerInLocale,
  makerNames,
  previewUrl,
  templatesIn,
} from '@/lib/makers/landings';
import MakerFinder, { FinderMaker } from './MakerFinder';

const baloo2 = Baloo_2({ weight: ['600', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-baloo-2', display: 'swap', preload: true });
const nunito = Nunito({ weight: ['400', '600', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-nunito', display: 'swap', preload: true });

const THEME_ART = themeArtMap as Record<string, string>;
const WALL_KEYS = ['animals', 'fruits', 'space', 'dinosaurs', 'ocean_life', 'vehicles', 'insects_and_bugs', 'zoo_animals', 'farm_animals', 'weather', 'flowers', 'music', 'occupations', 'camping', 'vegetables', 'birds', 'pets', 'toys', 'winter', 'forest_creatures', 'kitchen_tools', 'desserts_and_sweets', 'reptiles_and_amphibians', 'tools'];
const LANGUAGE_NAMES: Array<[string, string]> = [['en', 'English'], ['de', 'Deutsch'], ['fr', 'Français'], ['es', 'Español'], ['pt', 'Português'], ['it', 'Italiano'], ['nl', 'Nederlands'], ['sv', 'Svenska'], ['da', 'Dansk'], ['no', 'Norsk'], ['fi', 'Suomi']];
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? `{${k}}`));

/* The language exhibit: one worksheet in four languages, the visitor's own first. */
const SHOW_MAKER = 'counting';
const SHOW_TEMPLATE = 'K-002';

export default async function MakerHubPage({ locale }: { locale: string }) {
  const [copyFile, tplFile, ui, hub, names] = await Promise.all([getCopyFile(locale), getTemplateFile(locale), getUi(locale), getHubStrings(locale), makerNames(locale)]);
  if (!copyFile || !tplFile || !ui || !hub) return null;

  const ids = MAKER_IDS.filter((id) => makerInLocale(id, locale) && copyFile[id]);
  const templateTotal = ids.reduce((n, id) => n + templatesIn(id, locale).length, 0);
  const counts = { makers: ids.length, templates: templateTotal.toLocaleString(locale === 'no' ? 'nb' : locale), languages: 11 };

  const gradeLabel = (keys: string[]) => {
    const present = GRADE_ORDER.filter((g) => keys.includes(g));
    if (present.length === 0) return '';
    const first = ui[`grade${present[0]}`], last = ui[`grade${present[present.length - 1]}`];
    return present.length === 1 ? first : `${first} – ${last}`;
  };

  const makers: FinderMaker[] = ids.map((id) => {
    const m = catalogMaker(id)!;
    const list = templatesIn(id, locale);
    const grades = [...new Set(list.map((t) => t.grade))];
    return {
      id,
      name: names[id],
      href: localePath(locale, 'worksheet-makers', copyFile[id].slug),
      group: hubGroupOf(id),
      /* G23 counts as both grades for the chip filter */
      grades: [...new Set(grades.flatMap((g) => (g === 'G23' ? ['G2', 'G3'] : [g])))],
      gradeLabel: gradeLabel(grades),
      count: list.length,
      pics: (m.showcase[locale] || []).map((t) => previewUrl(id, locale, t)),
      templates: list.map((t) => ({ id: t.id, title: tplFile[id][t.id]?.[0] ?? '', href: makerAppUrl(id, locale, t.id), pic: previewUrl(id, locale, t.id) })),
    };
  });

  const groups = HUB_GROUPS.map((g) => ({ key: g.key, label: hub[`group_${g.key}`], blurb: hub[`group_${g.key}_blurb`] }));
  const grades = ['K', 'G1', 'G2', 'G3'].map((g) => ({ key: g, label: ui[`grade${g}`] }));

  /* Hero sheets: one strong page from a spread of subjects. */
  const heroPicks = ['mazes', 'telling-time', 'word-search', 'addition-subtraction', 'money'].filter((id) => ids.includes(id));
  const heroSheets = heroPicks.map((id) => ({ id, src: previewUrl(id, locale, catalogMaker(id)!.showcase[locale][0]), alt: names[id] }));

  const langOrder = [locale, ...['en', 'de', 'fi', 'es', 'fr'].filter((l) => l !== locale)].slice(0, 4);
  const langName = Object.fromEntries(LANGUAGE_NAMES);

  /* The classic maker pages stay reachable from the hub, so each keeps its internal link. */
  const classics: Array<{ name: string; href: string }> = [];
  for (const key of MAKER_KEYS) {
    const c = await getMakerContent(locale, key);
    if (c?.slug) classics.push({ name: c.name, href: localePath(locale, 'tools', c.slug) });
  }

  const finderStrings = {
    searchLabel: hub.searchLabel,
    searchPlaceholder: hub.searchPlaceholder,
    allGrades: hub.allGrades,
    allSubjects: hub.allSubjects,
    gradeFilterAria: hub.gradeFilterAria,
    subjectFilterAria: hub.subjectFilterAria,
    worksheetsCount: hub.worksheetsCount,
    noResults: hub.noResults,
    resultsTemplates: hub.resultsTemplates,
    showing: hub.showing,
  };

  return (
    <main className={`ml mh ${baloo2.variable} ${nunito.variable}`}>
      <section className="mh-hero ml-mat" aria-labelledby="mh-h1">
        <div className="mh-hero-inner">
          <div className="mh-hero-copy">
            <h1 id="mh-h1">{hub.h1}</h1>
            <p className="ml-lead">{fill(hub.lead, counts)}</p>
            <div className="ml-ctas">
              <a className="ml-btn" href="#makers">{hub.findCta}</a>
              <Link className="ml-link-light" href={`/${locale}/pricing`}>{ui.seePlans}</Link>
            </div>
          </div>
          <div className="mh-hero-sheets" aria-hidden="true">
            {heroSheets.map((s, i) => (
              <img key={s.id} className={`is-${i}`} src={s.src} alt="" width={640} height={860} decoding="async" {...(i === 2 ? { fetchPriority: 'high' as const } : {})} />
            ))}
          </div>
        </div>
        <div className="ml-ruler" aria-hidden="true" />
      </section>

      <p className="mh-line">{fill(hub.line, counts)}</p>

      <div id="makers" className="mh-wrap">
        <MakerFinder makers={makers} groups={groups} grades={grades} strings={finderStrings} quick={hub.quick.split('|')} />
      </div>

      <section className="ml-how" aria-labelledby="mh-how-h">
        <div className="ml-how-copy">
          <h2 id="mh-how-h">{ui.howTitle}</h2>
          <ol className="ml-steps">
            <li><strong>{ui.step1}</strong><span>{hub.step1Body}</span></li>
            <li><strong>{ui.step2}</strong><span>{ui.step2Body}</span></li>
            <li><strong>{ui.step3}</strong><span>{ui.step3Body}</span></li>
          </ol>
        </div>
        <figure className="ml-browser">
          <div className="ml-browser-bar" aria-hidden="true"><i /><i /><i /></div>
          <img src={appShotUrl('counting', locale)} alt={fill(ui.appAlt, { name: names.counting })} width={1280} height={800} loading="lazy" decoding="async" />
        </figure>
      </section>

      <section className="mh-band" aria-labelledby="mh-lang-h">
        <div className="mh-band-copy">
          <h2 id="mh-lang-h">{hub.langTitle}</h2>
          <p>{hub.langBody}</p>
          <ul className="mh-langnames" aria-label={hub.langTitle}>
            {LANGUAGE_NAMES.map(([code, name]) => (
              <li key={code}>
                {code === locale ? <span aria-current="true">{name}</span> : <a href={`/${code}/worksheet-makers`} hrefLang={code}>{name}</a>}
              </li>
            ))}
          </ul>
        </div>
        <ul className="mh-langsheets">
          {langOrder.map((l) => (
            <li key={l}>
              <img src={previewUrl(SHOW_MAKER, l, SHOW_TEMPLATE)} alt={fill(hub.langSheetAlt, { language: langName[l] })} width={640} height={860} loading="lazy" decoding="async" />
              <span>{langName[l]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="ml-library" aria-labelledby="mh-pic-h">
        <div className="ml-library-copy">
          <h2 id="mh-pic-h">{hub.picTitle}</h2>
          <p>{hub.picBody}</p>
        </div>
        <ul className="ml-pics" aria-hidden="true">
          {WALL_KEYS.filter((k) => THEME_ART[k]).slice(0, 24).map((k) => (<li key={k}><img src={wwwImg(THEME_ART[k])} alt="" width={96} height={96} loading="lazy" decoding="async" /></li>))}
        </ul>
      </section>

      <section className="mh-twoways" aria-labelledby="mh-two-h">
        <h2 id="mh-two-h">{hub.twoTitle}</h2>
        <div className="mh-two-cols">
          <div>
            <h3>{hub.twoPaperTitle}</h3>
            <p>{hub.twoPaperBody}</p>
          </div>
          <div>
            <h3>{hub.twoScreenTitle}</h3>
            <p>{hub.twoScreenBody}</p>
          </div>
          <div>
            <h3>{hub.twoShareTitle}</h3>
            <p>{hub.twoShareBody}</p>
          </div>
        </div>
      </section>

      <section className="ml-plans ml-mat" aria-labelledby="mh-plans-h">
        <div className="ml-plans-inner">
          <h2 id="mh-plans-h">{ui.plansTitle}</h2>
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
              <a className="ml-btn-ghost" href="#makers">{hub.findCta}</a>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: hub.h1,
            numberOfItems: makers.length,
            itemListElement: makers.map((m, i) => ({ '@type': 'ListItem', position: i + 1, name: m.name, url: `${CANONICAL_HOST}${m.href}` })),
          }).replace(/</g, '\\u003c'),
        }}
      />

      <nav className="mh-classics" aria-labelledby="mh-classic-h">
        <h2 id="mh-classic-h">{hub.classicTitle}</h2>
        <ul>{classics.map((c) => (<li key={c.href}><Link href={c.href}>{c.name}</Link></li>))}</ul>
      </nav>
    </main>
  );
}
