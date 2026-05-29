import { getMessages, getTranslations } from 'next-intl/server';

// Thin-page structural floor (Part 2): a short "How to use these worksheets"
// block. Adds ~45-60 unique crawlable words per page, distinct from the intro
// prose and the FAQ. Authored override (pageUsage.overrides.<key>) wins when
// present; otherwise a per-variant ICU fallback renders. Server component.

interface PageUsageBlockProps {
  locale: string;
  variant: 'topic' | 'intersection' | 'hub';
  overrideKey?: string;
  topicName?: string;
  primary?: string;
  secondary?: string;
}

function readOverride(
  messages: Record<string, unknown> | null,
  key: string | undefined,
): string | null {
  if (!messages || typeof messages !== 'object' || !key) return null;
  const ns = (messages as Record<string, unknown>).pageUsage;
  if (!ns || typeof ns !== 'object') return null;
  const overrides = (ns as Record<string, unknown>).overrides;
  if (!overrides || typeof overrides !== 'object') return null;
  const v = (overrides as Record<string, unknown>)[key];
  return typeof v === 'string' && v.length > 0 ? v : null;
}

export default async function PageUsageBlock(props: PageUsageBlockProps) {
  const { locale, variant } = props;
  const messages = (await getMessages({ locale })) as Record<string, unknown> | null;
  const t = await getTranslations({ locale, namespace: 'pageUsage' });

  let text = readOverride(messages, props.overrideKey);
  if (!text) {
    const vars: Record<string, string> = {};
    if (props.topicName) vars.topic = props.topicName;
    if (props.primary) vars.primary = props.primary;
    if (props.secondary) vars.secondary = props.secondary;
    text = t(`fallback.${variant}`, vars);
  }
  if (!text) return null;

  const paragraphs = text.split('\n\n').filter((p) => p.length > 0);

  return (
    <section className="page-usage mt-8 max-w-2xl">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
        {t('heading')}
      </h2>
      {paragraphs.map((para, idx) => (
        <p
          key={idx}
          className={
            idx === 0
              ? 'text-base text-ink-700 leading-relaxed'
              : 'text-base text-ink-700 leading-relaxed mt-3'
          }
        >
          {para}
        </p>
      ))}
    </section>
  );
}
