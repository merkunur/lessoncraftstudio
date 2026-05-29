import { getTranslations, getMessages } from 'next-intl/server';
import { Axis } from '@/lib/taxonomy';

// Arc 6a/6d — Descriptive prose container with Q3 fallback chain.
//
// Render-path (per Q3 adjudication):
//   1. Check topicProse.<axisKey> (single-axis) or topicProse.<a1>__<a2>
//      (intersection, alphabetic order) — populated at 6d for top-N
//      axis-keys per locale; long-tail falls through silently
//   2. Fall back to topicPage.intro.<intent> (single-axis) or
//      topicPage.intersection.intro (intersection)
//   3. Render in <section class="topic-prose">; rich prose renders as
//      a multi-paragraph block when the topicProse value contains \n\n
//      separators, otherwise as a single paragraph

interface TopicProseContainerProps {
  locale: string;
  // Single-axis case: one axis-key with intent
  axisKey1?: string;
  intent1?: 'exerciseType' | 'theme' | 'educationalLevel';
  topicName1?: string;
  // Intersection case: two axis-keys
  axisKey2?: string;
  topicName2?: string;
  // Live deck count — feeds the count-aware fallback intro (Part 2 structural
  // floor). Ignored when authored topicProse is present.
  count?: number;
}

function intentForAxis(axis: Axis): 'exerciseType' | 'theme' | 'educationalLevel' {
  if (axis === 'exercise-type') return 'exerciseType';
  if (axis === 'theme') return 'theme';
  return 'educationalLevel';
}

export { intentForAxis };

function lookupTopicProse(
  messages: Record<string, unknown> | null,
  axisKey1: string | undefined,
  axisKey2: string | undefined,
): string | null {
  if (!messages || typeof messages !== 'object') return null;
  const ns = (messages as Record<string, unknown>).topicProse;
  if (!ns || typeof ns !== 'object') return null;
  const proseMap = ns as Record<string, unknown>;

  if (axisKey1 && axisKey2) {
    const [a, b] = [axisKey1, axisKey2].sort();
    const v = proseMap[`${a}__${b}`];
    return typeof v === 'string' && v.length > 0 ? v : null;
  }
  if (axisKey1) {
    const v = proseMap[axisKey1];
    return typeof v === 'string' && v.length > 0 ? v : null;
  }
  return null;
}

export default async function TopicProseContainer({
  locale,
  axisKey1,
  intent1,
  topicName1,
  axisKey2,
  topicName2,
  count,
}: TopicProseContainerProps) {
  const t = await getTranslations({ locale, namespace: 'topicPage' });
  const messages = (await getMessages({ locale })) as Record<string, unknown> | null;

  let prose: string | null = lookupTopicProse(messages, axisKey1, axisKey2);

  if (!prose) {
    const n = count ?? 0;
    if (axisKey2 && topicName2 && topicName1) {
      prose = t('intersection.intro', { primary: topicName1, secondary: topicName2, count: n });
    } else if (intent1 && topicName1) {
      prose = t(`intro.${intent1}`, { topic: topicName1, count: n });
    } else {
      return null;
    }
  }

  const paragraphs = prose.split('\n\n').filter(p => p.length > 0);

  return (
    <section className="topic-prose mb-8 max-w-2xl">
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
