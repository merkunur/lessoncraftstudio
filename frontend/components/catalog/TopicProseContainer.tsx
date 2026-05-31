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
  intent2?: 'exerciseType' | 'theme' | 'educationalLevel';
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

// R15.1 — axis-aware intersection fallback. Map the two axis intents (order-
// independent) to one of three bounded variant templates. The call site passes
// axes in canonical order (theme < educational-level < exercise-type), so each
// variant's {primary}/{secondary} positions are fixed and the EN copy is
// written accordingly.
function intentPairVariant(
  i1: string | undefined,
  i2: string | undefined,
): 'typeTheme' | 'typeLevel' | 'themeLevel' | null {
  if (!i1 || !i2) return null;
  const [a, b] = [i1, i2].sort(); // educationalLevel < exerciseType < theme
  if (a === 'educationalLevel' && b === 'exerciseType') return 'typeLevel';
  if (a === 'educationalLevel' && b === 'theme') return 'themeLevel';
  if (a === 'exerciseType' && b === 'theme') return 'typeTheme';
  return null;
}

// Presence check against the loaded messages object (no t() throw on a missing
// key) so the code is safe to ship before the 10 non-EN variants are authored —
// those locales fall back to the existing generic intersection.intro.
function hasIntroByPair(messages: Record<string, unknown> | null, variant: string): boolean {
  if (!messages) return false;
  const tp = (messages as Record<string, unknown>).topicPage as Record<string, unknown> | undefined;
  const intersection = tp?.intersection as Record<string, unknown> | undefined;
  const ip = intersection?.introByPair as Record<string, unknown> | undefined;
  return !!(ip && typeof ip[variant] === 'string' && (ip[variant] as string).length > 0);
}

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
  intent2,
  topicName2,
  count,
}: TopicProseContainerProps) {
  const t = await getTranslations({ locale, namespace: 'topicPage' });
  const messages = (await getMessages({ locale })) as Record<string, unknown> | null;

  let prose: string | null = lookupTopicProse(messages, axisKey1, axisKey2);

  if (!prose) {
    const n = count ?? 0;
    if (axisKey2 && topicName2 && topicName1) {
      const variant = intentPairVariant(intent1, intent2);
      const params = { primary: topicName1, secondary: topicName2, count: n };
      prose = variant && hasIntroByPair(messages, variant)
        ? t(`intersection.introByPair.${variant}`, params)
        : t('intersection.intro', params);
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
