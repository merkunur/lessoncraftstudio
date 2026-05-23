/* Pillar 1 — Activities. THE MOAT. Largest visual treatment on the page.
   Asymmetric layout: copy left, card showcase right, with a second card
   tilted into negative space below to break the grid.

   i18n: every visible string flows from useTranslations('homepageV3.pillar01').
   The 3 activity-card mockups are intentionally STATIC English defaults in
   the EN baseline (Costruttore/Count to 10/Forma las sílabas) demonstrating
   the multilingual catalog; per-locale recreations replace those values
   with native-language equivalents when the locale's namespace is added. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import ActivityCardPreview from './ActivityCardPreview';
import MascotPlaceholder from './MascotPlaceholder';
import { DoodleBullet, Arrow } from './DoodleAccents';

interface PillarActivitiesProps {
  locale: string;
}

export default async function PillarActivities({ locale }: PillarActivitiesProps) {
  const t = await getTranslations({ locale, namespace: 'homepageV3.pillar01' });

  const supportingLines = [
    { label: t('support1Label'), body: t('support1Body') },
    { label: t('support2Label'), body: t('support2Body') },
    { label: t('support3Label'), body: t('support3Body') },
    { label: t('support4Label'), body: t('support4Body') },
  ];

  return (
    <section id="activities" className="hv3-section-cream relative overflow-hidden py-24 md:py-36 lg:py-44">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(242,120,75,0.18) 70%, rgba(242,120,75,0.32) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="hv3-blob-teal absolute -top-[15%] -right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="hv3-pillar-num-coral">01</span>
              <span className="hv3-eyebrow">{t('eyebrow')}</span>
            </div>
            <h2 className="font-lcsDisplay font-bold text-lcs-teal leading-[1.05] tracking-tight text-[2.25rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4rem]">
              {t('h2Line1')}<br />
              <span className="text-lcs-teal-deep">{t('h2Line2')}</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-start">
          <div>
            <ul className="space-y-7 md:space-y-9">
              {supportingLines.map((item, i) => {
                const variants: Array<'loop' | 'dot' | 'star'> = ['loop', 'star', 'dot', 'loop'];
                const variant = variants[i % variants.length];
                return (
                  <li key={`support-${i}`} className="flex gap-5">
                    <span className="flex-shrink-0 w-7 h-7 mt-0.5" aria-hidden="true">
                      <DoodleBullet
                        className="text-lcs-coral"
                        size={28}
                        variant={variant}
                      />
                    </span>
                    <div>
                      <h3 className="font-lcsDisplay font-semibold text-xl md:text-2xl text-lcs-teal leading-tight">
                        {/* First supporting line gets the squiggle flourish
                            on the locale's equivalent of "Common Core". */}
                        {i === 0 ? (
                          <>
                            {t('support1LabelBefore')}<span className="hv3-squiggle-word">{t('support1LabelSquiggle')}</span>
                          </>
                        ) : (
                          item.label
                        )}
                      </h3>
                      <p className="mt-2 font-lcsBody text-base md:text-lg text-lcs-teal/80 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 md:mt-12">
              <Link
                href={`/${locale}/activities`}
                className="hv3-cta-coral inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg px-7 py-3.5"
              >
                {t('cta')}
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[560px] md:min-h-[720px] lg:min-h-[780px]">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -top-2 -left-16 z-30 opacity-80"
              style={{ transform: 'rotate(8deg)' }}
            >
              <Arrow className="text-lcs-teal/55" width={110} height={70} rotate={-20} strokeWidth={2.2} />
            </div>
            <div
              aria-hidden="true"
              className="hv3-blob-coral absolute top-[20%] -right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
            />

            {/* Card 1 — language demonstration #1 (was IT, now per-locale). */}
            <div className="absolute top-[10%] -left-[6%] w-[68%] z-0">
              <ActivityCardPreview
                variant="compact"
                title={t('card1Title')}
                prompt={t('card1Prompt')}
                subjectImg="https://www.lessoncraftstudio.com/image-library-webp/themes/animals/cat@2x.webp"
                subjectAlt={t('card1SubjectAlt')}
                tiles={['gat', 'to']}
                slotsFilled={false}
                ccCode="RF.K.2.B"
                gradeLabel={t('card1GradeLabel')}
                checkLabel={t('card1CheckLabel')}
                langChip="IT"
                tilt={-5}
              />
            </div>

            {/* Card 2 — foreground main card (was EN, now per-locale). */}
            <div className="absolute top-[2%] right-0 w-[78%] z-10">
              <ActivityCardPreview
                variant="full"
                title={t('card2Title')}
                prompt={t('card2Prompt')}
                subjectImg="https://www.lessoncraftstudio.com/image-library-webp/themes/animals/cat@2x.webp"
                subjectAlt={t('card2SubjectAlt')}
                tiles={['+', '−']}
                slotsFilled={false}
                ccCode="K.CC.B.4"
                gradeLabel={t('card2GradeLabel')}
                checkLabel={t('card2CheckLabel')}
                langChip="EN"
                tilt={3}
                float
              />
            </div>

            {/* Card 3 — bottom tilted card. Subject image + tiles are
                LOCALE-COORDINATED with the syllabification of the
                card3SubjectAlt. EN keeps horse/caballo (3 syll). DE swaps
                to elephant/Elefant (3 syll: e-le-fant). The component
                here uses a server-side branch on locale to render the
                correct image + tiles; if you add a new locale, extend
                this map. */}
            <div className="absolute bottom-0 left-[4%] w-[64%] z-20">
              {(() => {
                // Per-locale subject + tiles map for Card 3. Keep at file
                // level when more locales add coordinated variants.
                const card3ByLocale: Record<string, { img: string; tiles: string[] }> = {
                  en: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/horse@2x.webp',
                    tiles: ['ca', 'ba', 'llo'],
                  },
                  de: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/elephant@2x.webp',
                    tiles: ['e', 'le', 'fant'],
                  },
                  fr: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/elephant@2x.webp',
                    tiles: ['é', 'lé', 'phant'],
                  },
                  es: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/horse@2x.webp',
                    tiles: ['ca', 'ba', 'llo'],
                  },
                  pt: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/horse@2x.webp',
                    tiles: ['ca', 'va', 'lo'],
                  },
                  it: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/horse@2x.webp',
                    tiles: ['ca', 'val', 'lo'],
                  },
                  nl: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/elephant@2x.webp',
                    tiles: ['o', 'li', 'fant'],
                  },
                  sv: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/elephant@2x.webp',
                    tiles: ['e', 'le', 'fant'],
                  },
                  da: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/elephant@2x.webp',
                    tiles: ['e', 'le', 'fant'],
                  },
                  no: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/elephant@2x.webp',
                    tiles: ['e', 'le', 'fant'],
                  },
                  fi: {
                    img: 'https://www.lessoncraftstudio.com/image-library-webp/themes/animals/giraffe@2x.webp',
                    tiles: ['ki', 'rah', 'vi'],
                  },
                };
                const variant = card3ByLocale[locale] ?? card3ByLocale.en;
                return (
                  <ActivityCardPreview
                    variant="compact"
                    title={t('card3Title')}
                    prompt={t('card3Prompt')}
                    subjectImg={variant.img}
                    subjectAlt={t('card3SubjectAlt')}
                    tiles={variant.tiles}
                    slotsFilled={true}
                    filledOrder={variant.tiles}
                    ccCode="RF.K.2.B"
                    gradeLabel={t('card3GradeLabel')}
                    checkLabel={t('card3CheckLabel')}
                    langChip="ES"
                    tilt={-3}
                  />
                );
              })()}
            </div>

            <div
              aria-hidden="true"
              className="hidden md:block absolute -bottom-12 -right-8 z-30 w-[200px] lg:w-[240px] pointer-events-none hv3-float"
              style={{ ['--rot' as string]: '4deg' } as React.CSSProperties}
            >
              <MascotPlaceholder
                size="inline"
                poseHint="showing-down-right"
                alt={t('mascotAlt')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
