'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';

// Pillar 1 Phase 1b — Lesson-plan reader (subscriber-gated).
// Mirrors WorkspaceClient pattern (subscriber-gate on mount; loading / error
// / empty / non-subscriber / signed-out states). Renders CLIL 4-section
// template with per-section duration + body. Print-friendly per @media print
// (hide non-content chrome; full-width prose).

interface PlanSection {
  durationMinutes: number;
  body: string;
}

interface LessonPlanPayload {
  id: string;
  topicSlug: string;
  language: string;
  title: string;
  durationMinutes: number;
  sections: {
    warmup: PlanSection;
    contentActivity: PlanSection;
    scaffold: PlanSection;
    closure: PlanSection;
  };
  recommendedDeckIds: string[];
  recommendedPdfDeckIds: string[];
}

export default function LessonPlanReader({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const t = useTranslations('lessonPlanReader');
  const { user, loading: authLoading } = useAuth();

  const [plan, setPlan] = useState<LessonPlanPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchPlan = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const token = localStorage.getItem('accessToken');
      const url = `/api/lesson-plans/${encodeURIComponent(slug)}?language=${encodeURIComponent(locale)}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setPlan(data.plan);
    } catch {
      setError(t('errorGeneric'));
    } finally {
      setLoading(false);
    }
  }, [slug, locale, t]);

  useEffect(() => {
    if (!user || !isLcsSubscriptionActive(user)) return;
    fetchPlan();
  }, [user, fetchPlan]);

  if (authLoading) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-12">
        <p className="text-ink-500">{t('loading')}</p>
      </main>
    );
  }

  // Signed out
  if (!user) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">
          {t('gate.signInPromptTitle')}
        </h1>
        <p className="text-ink-700 mb-8">{t('gate.signInPromptBody')}</p>
        <Link
          href={`/${locale}/auth/signin`}
          className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          {t('gate.signInCta')}
        </Link>
      </main>
    );
  }

  // Signed in but not subscribed — Notify-me-shape per HOMEPAGE_SUBSCRIBE_MODE
  if (!isLcsSubscriptionActive(user)) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">
          {t('gate.subscribePromptTitle')}
        </h1>
        <p className="text-ink-700 mb-8">{t('gate.subscribePromptBody')}</p>
        <Link
          href={`/${locale}#subscription`}
          className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          {t('gate.subscribeCta')}
        </Link>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">
          {t('notFoundTitle')}
        </h1>
        <p className="text-ink-700">{t('notFoundBody')}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-12">
        <p className="text-terracotta-500">{error}</p>
      </main>
    );
  }

  if (loading || !plan) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-12">
        <p className="text-ink-500">{t('loading')}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 max-w-3xl py-12 lesson-plan-reader">
      <header className="mb-10 print:mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-2">
          {plan.title}
        </h1>
        <p className="text-sm text-ink-500">
          {t('totalDuration', { minutes: plan.durationMinutes })}
        </p>
      </header>

      <Section
        heading={t('section.warmup')}
        durationMinutes={plan.sections.warmup.durationMinutes}
        body={plan.sections.warmup.body}
        durationLabel={t('sectionDuration')}
      />
      <Section
        heading={t('section.contentActivity')}
        durationMinutes={plan.sections.contentActivity.durationMinutes}
        body={plan.sections.contentActivity.body}
        durationLabel={t('sectionDuration')}
      />
      <Section
        heading={t('section.scaffold')}
        durationMinutes={plan.sections.scaffold.durationMinutes}
        body={plan.sections.scaffold.body}
        durationLabel={t('sectionDuration')}
      />
      <Section
        heading={t('section.closure')}
        durationMinutes={plan.sections.closure.durationMinutes}
        body={plan.sections.closure.body}
        durationLabel={t('sectionDuration')}
      />

      <style jsx global>{`
        @media print {
          .lesson-plan-reader {
            max-width: none;
            padding: 0 !important;
          }
          header, footer, nav, .no-print {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}

function Section({
  heading,
  durationMinutes,
  body,
  durationLabel,
}: {
  heading: string;
  durationMinutes: number;
  body: string;
  durationLabel: string;
}) {
  return (
    <section className="mb-10 print:mb-6 break-inside-avoid">
      <h2 className="font-display text-2xl font-semibold text-ink-900 mb-1">
        {heading}
      </h2>
      <p className="text-sm text-ink-500 mb-3">
        {durationLabel.replace('{minutes}', String(durationMinutes))}
      </p>
      <div className="prose prose-sm max-w-none text-ink-800 whitespace-pre-wrap">
        {body}
      </div>
    </section>
  );
}
