import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale || 'en', namespace: 'subscribeThanks' });
  return {
    title: t('title'),
    robots: { index: false, follow: false }, // post-checkout page — never indexable
  };
}

/**
 * Lemon Squeezy checkout redirect target (checkout[redirect_url], lib/checkout.ts).
 * The webhook may land a few seconds after the redirect — copy manages that
 * expectation. New buyers (no account pre-checkout) get a password-setup email.
 */
export default async function SubscribeThanksPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'subscribeThanks' });

  return (
    <main className="container mx-auto px-4 max-w-2xl py-20 text-center">
      <h1 className="font-display text-4xl font-semibold text-ink-900 mb-4">
        {t('title')}
      </h1>
      <p className="text-ink-700 mb-3">{t('body')}</p>
      <p className="text-ink-500 mb-10">{t('emailNote')}</p>
      <Link
        href={`/${locale}/workspace`}
        className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
      >
        {t('cta')}
      </Link>
    </main>
  );
}
