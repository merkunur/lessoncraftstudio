import { getTranslations } from 'next-intl/server';

// Arc 6a — Dedicated result-count element below h1.
//
// Pre-Arc-6a: count rendered in the topic-page header neighborhood as part
// of the h1 area. Arc 6a moves it to a dedicated element below h1 to leave
// the h1 clean for the axis name(s).
//
// Reuses existing topicPage.decksCount ICU plural template (already shipped
// across 11 locales pre-Arc-6a).

interface ResultCountProps {
  locale: string;
  count: number;
}

export default async function ResultCount({ locale, count }: ResultCountProps) {
  const t = await getTranslations({ locale, namespace: 'topicPage' });
  return (
    <p className="text-sm text-ink-500 mb-6">
      {t('decksCount', { count })}
    </p>
  );
}
