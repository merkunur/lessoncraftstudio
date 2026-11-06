import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { LOCALE_NAMES, SupportedLocale } from '@/config/locales';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { getHreflangCode } from '@/lib/seo/hreflang';
import {
  MAKER_KEYS,
  getMakerContent,
  MakerKey,
} from '@/lib/seo/maker-content';
import { fetchMakerSamples } from '@/lib/seo/maker-samples';
import { smartLaunchUrl, smartMaker } from '@/lib/makers/smart-link';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import {
  catalogMaker,
  getTemplateFile,
  getUi,
  landingPath,
  makerAppUrl,
  makerNames,
  previewUrl,
  templatesIn,
} from '@/lib/makers/landings';
import { ribbonStrings } from '@/lib/makers/ribbon';
import '@/components/maker-landing/maker-landing.css';
import { Baloo_2, Nunito } from 'next/font/google';
import MakerSamples, { makerScreenshots } from './MakerSamples';

const baloo2 = Baloo_2({ weight: ['600', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-baloo-2', display: 'swap', preload: true });
const nunito = Nunito({ weight: ['400', '600', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-nunito', display: 'swap', preload: true });

/**
 * Per-maker landing page body — /<locale>/tools/<native-slug>/ for a worksheet
 * generator. SEO RESCUE Part 1. Crawlable teacher-framed body + a prominent
 * LAUNCH button to the full generator (operator-ruled: no in-page embed), with
 * WebApplication JSON-LD. Rendered by the shared /tools/[tool] route when a
 * slug resolves to a maker (not a manipulative). Reuses the proven tool-landing
 * visual pattern.
 */

function jsonLdFor(
  content: { name: string; metaDescription: string },
  locale: string,
  slug: string,
  screenshots: Array<{ url: string; caption: string }> = [],
): string {
  const canonical = canonicalUrl(localePath(locale, 'tools', slug));
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.name,
    description: content.metaDescription,
    inLanguage: locale,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web browser',
    browserRequirements: 'Requires JavaScript. Runs in any modern browser.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: true,
    image: `${CANONICAL_HOST}/og-homepage.png`,
    audience: { '@type': 'EducationalAudience', educationalRole: 'teacher' },
    creator: { '@type': 'Organization', name: 'LessonCraftStudio', url: CANONICAL_HOST },
    url: canonical,
  };
  // Real screenshots of the tool's output (the per-mode sample thumbnails) — honest
  // ImageObjects on the WebApplication entity (NOT per-sample LearningResource nodes,
  // which belong to the deck landing pages and would confuse the entity graph).
  if (screenshots.length) {
    data.screenshot = screenshots.map((s) => ({
      '@type': 'ImageObject',
      contentUrl: s.url,
      caption: s.caption,
    }));
  }
  return JSON.stringify(data);
}

export default async function MakerLanding({
  locale,
  makerKey,
  slug,
}: {
  locale: string;
  makerKey: MakerKey;
  slug: string;
}) {
  const content = await getMakerContent(locale, makerKey);
  if (!content) return null;

  // The smart link (ARCHITECTURE §13, operator 2026-10-31): the launch button opens the NEW maker on the template that does
  // what the old app did, in this language. The old apps are gone (operator 2026-11-06), so a maker that cannot be read
  // from the served tree falls back to its landing, never to an old generator. This page's text, title, meta, canonical,
  // hreflang and JSON-LD keep their SEO: everything below only adds to them (gate: scripts/makers/gates/old-landings.js).
  const newId = smartMaker(makerKey);
  const newLanding = newId ? await landingPath(newId, locale) : null;
  const launchUrl = smartLaunchUrl(makerKey, locale) ?? newLanding ?? `/${locale}/worksheet-makers`;
  const launchLabel = content.labels.launchCta.replace('{name}', content.name);
  // Sample-modal action buttons (Download PDF / Answer key / Make your own). The deck's
  // own baked strip is hidden inside an iframe, so the modal renders them host-side.
  const tActions = await getTranslations({ locale, namespace: 'deckActions' });

  // "See what you can make" samples — fetched once here so the JSON-LD screenshots
  // and the rendered section share a single DB read (ISR-cached).
  // DB down: the page keeps every word of its text and simply shows no deck samples, rather than failing.
  const samplesData = await fetchMakerSamples(makerKey, locale).catch(() => ({ kind: 'none' as const, multiMode: false, samples: [], crossLanguage: [] }));
  const screenshots = makerScreenshots(samplesData);

  // Sibling makers in this locale (link mesh) + other-language siblings.
  const relatedMakers: Array<{ key: MakerKey; name: string; href: string }> = [];
  for (const key of MAKER_KEYS) {
    if (key === makerKey) continue;
    const c = await getMakerContent(locale, key);
    if (c && c.slug) relatedMakers.push({ key, name: c.name, href: localePath(locale, 'tools', c.slug) });
  }

  const otherLangs: Array<{ locale: string; href: string }> = [];
  for (const loc of TOPIC_ENABLED_LOCALES) {
    if (loc === locale) continue;
    const c = await getMakerContent(loc, makerKey);
    if (c && c.slug) otherLangs.push({ locale: loc, href: `/${loc}/tools/${c.slug}` });
  }

  /* The new maker this page leads to: its real sheets, in this language. */
  const [ui, tplFile, names] = await Promise.all([getUi(locale), getTemplateFile(locale), makerNames(locale)]);
  const rb = ribbonStrings(locale);
  const newTemplates = newId ? templatesIn(newId, locale) : [];
  const newTitles = newId ? tplFile?.[newId] ?? {} : {};
  const showcase = newId ? (catalogMaker(newId)?.showcase[locale] ?? []).slice(0, 3) : [];
  const wall = newTemplates.slice(0, 12);
  const newName = newId ? names[newId] : '';

    const tBreadcrumb = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: content.labels.makersBreadcrumb, path: localePath(locale, 'worksheet-makers') },
    { name: content.name, path: localePath(locale, 'tools', slug) },
  ] as BreadcrumbCrumb[]);

  return (
    <main className={`ml ${baloo2.variable} ${nunito.variable}`}>
      <div className="ml-crumbs">
        <BreadcrumbTrail
          locale={locale}
          trail={[
            { href: `/${locale}/worksheet-makers/`, label: content.labels.makersBreadcrumb },
            { label: content.name },
          ]}
        />
      </div>

      <section className="ml-hero ml-mat" aria-label={content.name}>
        <div className="ml-hero-inner">
          <header className="ml-hero-copy">
            <h1>{content.name}</h1>
            <p className="ml-lead">{content.tagline}</p>
            <div className="ml-ctas">
              <a href={launchUrl} className="ml-btn">{launchLabel}</a>
              {newLanding ? <a className="ml-link-light" href={newLanding}>{rb.upgradeCta}</a> : null}
            </div>
            {ui ? <p className="ml-free-line">{ui.freeLine}</p> : null}
          </header>
          {showcase.length ? (
            <div className="ml-fan">
              {[showcase[1], showcase[2], showcase[0]].map((t, i) => (t ? (
                <img
                  key={t}
                  className={`ml-fan-sheet is-${[1, 2, 0][i]}`}
                  src={previewUrl(newId!, locale, t)}
                  alt={`${newTitles[t]?.[0] ?? newName}, ${newName}`}
                  width={640}
                  height={860}
                  decoding="async"
                  {...(i === 2 ? { fetchPriority: 'high' as const } : {})}
                />
              ) : null))}
            </div>
          ) : null}
        </div>
        <div className="ml-ruler" aria-hidden="true" />
      </section>

      {ui ? (
        <ul className="ml-proofs">
          <li><strong>{ui.proofPictures}</strong><span>{ui.proofPicturesBody}</span></li>
          <li><strong>{ui.proofLanguages}</strong><span>{ui.proofLanguagesBody}</span></li>
          <li><strong>{ui.proofTwoWays}</strong><span>{ui.proofTwoWaysBody}</span></li>
          <li><strong>{ui.proofShare}</strong><span>{ui.proofShareBody}</span></li>
        </ul>
      ) : null}

      {newId && newLanding ? (
        <section className="ml-wall" aria-labelledby="ml-new-h">
          <header className="ml-wall-head">
            <h2 id="ml-new-h">{rb.upgradeTitle}</h2>
            <p>{rb.upgradeBody.replace('{name}', newName).replace('{count}', String(newTemplates.length))}</p>
          </header>
          <ul className="ml-grid">
            {wall.map((t) => (
              <li key={t.id}>
                <a className="ml-card" href={makerAppUrl(newId, locale, t.id)}>
                  <span className="ml-card-paper">
                    <img src={previewUrl(newId, locale, t.id)} alt={`${newTitles[t.id]?.[0] ?? newName}, ${newName}`} width={640} height={860} loading="lazy" decoding="async" />
                    {t.screen && ui ? <span className="ml-card-flag">{ui.alsoOnScreen}</span> : null}
                  </span>
                  <span className="ml-card-title">{newTitles[t.id]?.[0]}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="ml-wall-more"><a className="ml-btn" href={newLanding}>{rb.upgradeCta}</a></p>
        </section>
      ) : null}

      <article className="mx-auto max-w-3xl px-4">
        {/* "See what you can make" — per-mode playable samples (+ cross-language strip
            for crossword/wordsearch/matching). Highest-intent spot, right under the
            hero CTA; renders nothing for makers with no interactive decks. */}
        <MakerSamples
          locale={locale}
          makerKey={makerKey}
          labels={content.labels}
          modes={content.modes}
          modeNames={content.modeNames}
          samplesIntro={content.samplesIntro}
          data={samplesData}
          makeYourOwnHref={launchUrl}
          actionLabels={{
            downloadPdf: tActions('downloadPdf'),
            answerKey: tActions('answerKey'),
            makeYourOwn: tActions('makeYourOwn'),
            ariaLabel: tActions('ariaLabel'),
          }}
        />

        {/* Crawlable editorial body — the SEO surface for the maker. */}
        <section className="mx-auto max-w-2xl mt-8 space-y-8 px-1">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">{content.labels.about}</h2>
            {content.about.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-base text-ink-700 leading-relaxed' : 'text-base text-ink-700 leading-relaxed mt-3'}>{p}</p>
            ))}
          </div>

          <div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">{content.labels.howToUse}</h2>
            <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
              {content.howToUse.map((it, i) => (<li key={i}>{it}</li>))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">{content.labels.classroomIdeas}</h2>
            <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
              {content.classroomIdeas.map((it, i) => (<li key={i}>{it}</li>))}
            </ul>
          </div>

          <div className="text-center pt-2">
            <a
              href={launchUrl}
              className="inline-flex items-center gap-2 rounded-full bg-[#F2784B] hover:bg-[#D9633A] text-white font-semibold text-base px-6 py-3 shadow-md transition-colors"
            >
              {launchLabel}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* Link mesh */}
        <div className="mx-auto max-w-2xl px-1 mt-10 space-y-10">
          {relatedMakers.length > 0 && (
            <section aria-labelledby="maker-related-heading">
              <h2 id="maker-related-heading" className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-4">
                {content.labels.relatedMakers}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedMakers.map((r) => (
                  <li key={r.key}>
                    <Link
                      href={r.href}
                      className="flex items-center gap-2 rounded-2xl bg-cream-50 hover:bg-teal-50 px-4 py-3 text-teal-800 font-medium shadow-sm transition-colors"
                    >
                      <span>{r.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {otherLangs.length > 0 && (
            <section aria-labelledby="maker-langs-heading">
              <h2 id="maker-langs-heading" className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                {content.labels.otherLanguages}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {otherLangs.map(({ locale: loc, href }) => (
                  <li key={loc}>
                    <a
                      href={href}
                      hrefLang={getHreflangCode(loc)}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream-50 hover:bg-teal-50 text-teal-800 text-sm transition-colors"
                    >
                      {LOCALE_NAMES[loc as SupportedLocale] ?? loc}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdFor({ name: content.name, metaDescription: content.metaDescription }, locale, slug, screenshots) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </article>

      {ui ? (
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
                <a className="ml-btn-ghost" href={launchUrl}>{launchLabel}</a>
              </div>
              <div className="ml-plan is-paid">
                <h3>{ui.planPaidName}</h3>
                <p className="ml-price">{ui.planPaidPrice.replace('{year}', String(SUBSCRIPTION_PRODUCT.priceUsd)).replace('{month}', String(SUBSCRIPTION_PRODUCT.monthlyPriceUsd))}</p>
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
      ) : null}

      <Link className="ml-hub-link ml-mat" href={`/${locale}/worksheet-makers`}>
        <span className="ml-hub-stack" aria-hidden="true">
          {showcase.map((t) => (<img key={t} src={previewUrl(newId!, locale, t)} alt="" width={640} height={860} loading="lazy" decoding="async" />))}
        </span>
        <span className="ml-hub-text">
          <strong>{rb.all}</strong>
          {ui ? <span>{ui.seeAllBody}</span> : null}
        </span>
      </Link>
    </main>
  );
}
