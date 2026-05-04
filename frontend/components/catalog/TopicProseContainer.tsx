import { getTranslations } from 'next-intl/server';
import { Axis } from '@/lib/taxonomy';

// Arc 6a — Descriptive prose container with Q3 fallback chain.
//
// Render-path (per Q3 adjudication):
//   1. Check topicProse.<axisKey> namespace — doesn't exist yet (lands in 6d
//      cooperation-pattern authoring); falls through silently
//   2. Fall back to existing topicPage.intro.<intent> (single-axis) or
//      topicPage.intersection.intro (intersection)
//   3. Render in <section class="topic-prose"> — DOM 6d will populate
//      identically when rich prose ships; no DOM/CSS migration needed
//
// Visual: slightly enlarged emphasis on the existing template per Q3 spec.

interface TopicProseContainerProps {
  locale: string;
  // Single-axis case: one axis-key with intent
  axisKey1?: string;
  intent1?: 'exerciseType' | 'theme' | 'educationalLevel';
  topicName1?: string;
  // Intersection case: two axis-keys
  axisKey2?: string;
  topicName2?: string;
}

function intentForAxis(axis: Axis): 'exerciseType' | 'theme' | 'educationalLevel' {
  if (axis === 'exercise-type') return 'exerciseType';
  if (axis === 'theme') return 'theme';
  return 'educationalLevel';
}

export { intentForAxis };

export default async function TopicProseContainer({
  locale,
  axisKey1,
  intent1,
  topicName1,
  axisKey2,
  topicName2,
}: TopicProseContainerProps) {
  // 6d substrate not present yet; skip the topicProse.<axisKey> lookup.
  // When 6d ships, replace this fallback chain with a true lookup that
  // returns rich prose + falls back here only on absence.

  const t = await getTranslations({ locale, namespace: 'topicPage' });

  let prose: string;
  if (axisKey2 && topicName2 && topicName1) {
    // Intersection: use topicPage.intersection.intro
    prose = t('intersection.intro', { primary: topicName1, secondary: topicName2 });
  } else if (intent1 && topicName1) {
    // Single-axis: use topicPage.intro.<intent>
    prose = t(`intro.${intent1}`, { topic: topicName1 });
  } else {
    return null;
  }

  return (
    <section className="topic-prose mb-8">
      <p className="text-base text-ink-700 max-w-2xl leading-relaxed">
        {prose}
      </p>
    </section>
  );
}
