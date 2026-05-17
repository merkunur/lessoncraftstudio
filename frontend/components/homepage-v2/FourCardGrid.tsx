import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import topicsTaxonomy from '@/config/topics-taxonomy.json';
import {
  BookOpen,
  Sparkles,
  Gamepad2,
  ArrowRight,
} from 'lucide-react';

// Section 2 — "Our learning library" 4-card grid per education.com reference
// architecture + operator-locked 4-category composition (commission 2026-05-17).
//
// Four cards:
//   1. Worksheets             → /[locale]/topic/<en-canonical-axis-key-resolved-to-locale>/
//   2. Apps (worksheet makers)→ /[locale]/worksheet-makers/
//   3. Teaching packages      → /[locale]/teaching-packages/
//   4. Interactive worksheets → /[locale]/topic/<axis-key-resolved-to-locale>/  (parallel to card 1)
//
// Cards 1 + 4 both link into the topic-page surface (per Phase 1 operator lock #3:
// reuse existing /[locale]/topic/<axis>/ rather than building new /catalog/). The
// destination axis-key is operator-curated per locale via topics-taxonomy.json
// slug.<locale>; here we route to a representative anchor topic per card.
//
// Per CLAUDE.md §15.7 routing-contract: all 4 destinations are Next.js routes
// (NOT nginx-served), so Next.js <Link> is correct.

// Resolve native-language slug for the anchor exercise-type axis-key per locale.
// Reads from topics-taxonomy.json per CLAUDE.md §10.4 read-from-SoT precedence.
function resolveAxisSlug(axisKey: string, locale: string): string {
  const taxonomy = topicsTaxonomy as unknown as {
    axes: {
      'exercise-type': Record<string, { slug: Record<string, string> }>;
    };
  };
  const entry = taxonomy.axes['exercise-type']?.[axisKey];
  return entry?.slug?.[locale] ?? entry?.slug?.en ?? axisKey;
}

interface FourCardGridProps {
  locale: string;
}

export default async function FourCardGrid({ locale }: FourCardGridProps) {
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid' });

  // Anchor axis-keys for cards 1 + 4. Operator-curated: addition is the
  // canonical math entry; matching is a high-engagement visual mechanic that
  // showcases interactive output well. Both routes serve the same topic-page
  // surface; per-card framing in copy distinguishes printable vs interactive.
  const worksheetsAnchorSlug = resolveAxisSlug('addition', locale);
  const interactiveAnchorSlug = resolveAxisSlug('matching', locale);

  const cards = [
    {
      key: 'worksheets',
      icon: BookOpen,
      title: t('worksheets.title'),
      description: t('worksheets.description'),
      ctaLabel: t('worksheets.cta'),
      href: `/${locale}/topic/${worksheetsAnchorSlug}/`,
    },
    {
      key: 'apps',
      icon: Sparkles,
      title: t('apps.title'),
      description: t('apps.description'),
      ctaLabel: t('apps.cta'),
      href: `/${locale}/worksheet-makers/`,
    },
    {
      key: 'interactive',
      icon: Gamepad2,
      title: t('interactive.title'),
      description: t('interactive.description'),
      ctaLabel: t('interactive.cta'),
      href: `/${locale}/topic/${interactiveAnchorSlug}/`,
    },
  ];

  return (
    <section className="container mx-auto px-4 max-w-6xl py-20 md:py-24">
      <div className="max-w-3xl mb-12">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink-900 tracking-tight">
          {t('sectionTitle')}
        </h2>
        <p className="mt-6 text-lg text-ink-600 leading-relaxed">
          {t('intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <Link
              key={card.key}
              href={card.href}
              className="group bg-cream-50 hover:bg-cream-100 border border-cream-300 hover:border-cream-400 rounded-xl p-6 md:p-8 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-terracotta-100 text-terracotta-500 flex items-center justify-center">
                  <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-ink-900 leading-snug">
                  {card.title}
                </h3>
              </div>
              <p className="text-base text-ink-600 leading-relaxed mb-6">
                {card.description}
              </p>
              <span className="inline-flex items-center gap-2 text-base font-medium text-terracotta-500 group-hover:text-terracotta-600 transition-colors">
                {card.ctaLabel}
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
