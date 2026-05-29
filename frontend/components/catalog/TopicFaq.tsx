import { getMessages, getTranslations } from 'next-intl/server';
import { generateFAQSchema } from '@/lib/schema-generator';
import {
  resolveTopicFaq,
  resolveIntersectionFaq,
  resolveActivityFaq,
  resolveStandardsFaq,
  FaqItem,
  FaqVariant,
} from '@/lib/seo/topic-faq';

// Thin-page structural floor (Part 2): renders a 3-item FAQ block on catalog
// pages — visible <dl> AND matching FAQPage JSON-LD. Adds ~90 unique crawlable
// words per page and rich-result eligibility. Server component; no client JS.
//
// The visible text and the JSON-LD are built from the SAME `items` array so
// Google never sees a mismatch. Authored overrides (topicFaq.overrides.<key>)
// win when present; otherwise a per-variant ICU fallback guarantees no page is
// FAQ-less.

interface TopicFaqProps {
  locale: string;
  variant: FaqVariant;
  pageUrl: string;
  // single / intersection
  axisKey1?: string;
  axisKey2?: string;
  topicName1?: string;
  topicName2?: string;
  count?: number;
  // activity
  title?: string;
  grade?: string;
  strand?: string;
  // standards
  code?: string;
}

export default async function TopicFaq(props: TopicFaqProps) {
  const { locale, variant, pageUrl } = props;
  const messages = (await getMessages({ locale })) as Record<string, unknown> | null;
  const t = await getTranslations({ locale, namespace: 'topicFaq' });

  let items: FaqItem[] = [];
  if (variant === 'single') {
    items = await resolveTopicFaq(messages, locale, {
      axisKey: props.axisKey1,
      topicName: props.topicName1,
      count: props.count ?? 0,
    });
  } else if (variant === 'intersection') {
    items = await resolveIntersectionFaq(messages, locale, {
      axisKey1: props.axisKey1,
      axisKey2: props.axisKey2,
      name1: props.topicName1,
      name2: props.topicName2,
      count: props.count ?? 0,
    });
  } else if (variant === 'activity') {
    items = await resolveActivityFaq(locale, {
      title: props.title,
      grade: props.grade,
      strand: props.strand,
    });
  } else {
    items = await resolveStandardsFaq(locale, {
      code: props.code,
      strand: props.strand,
      grade: props.grade,
    });
  }

  if (!items.length) return null;

  const schema = generateFAQSchema(items, locale, pageUrl);

  return (
    <section className="topic-faq mt-10 max-w-2xl">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-4">
        {t('heading')}
      </h2>
      <dl className="space-y-4">
        {items.map((it, i) => (
          <div key={i}>
            <dt className="font-semibold text-ink-900">{it.question}</dt>
            <dd className="text-base text-ink-700 leading-relaxed mt-1">{it.answer}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
