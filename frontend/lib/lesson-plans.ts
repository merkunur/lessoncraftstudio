import { prisma } from './prisma';

// Pillar 1 Phase 1b — lesson-plan query helper for topic-page integration.
// Server-side fetch by (axisKey, locale); axis-key is the English-canonical
// Topic.slug per Phase 1a schema-intent-B resolution at `1114dedb`.

interface PlanStructure {
  title?: string;
  warmup?: { durationMinutes?: number; body?: string };
}

export interface LessonPlanSummary {
  id: string;
  topicSlug: string;
  language: string;
  title: string;
  durationMinutes: number;
  warmupExcerpt: string; // first ~200 chars of warmup body for topic-page preview
}

/**
 * Fetch the lesson plan (if any) for a (topic-axis-key, locale) pair.
 * Returns null when no plan exists — topic page renders silent fall-through.
 *
 * Build-time DB unreachability is tolerated (matches the topic page's
 * generateStaticParams pattern). Returns null on error so the topic page
 * still renders.
 */
export async function fetchLessonPlanSummaryForTopic(
  axisKey: string,
  locale: string
): Promise<LessonPlanSummary | null> {
  try {
    const plan = await prisma.lessonPlan.findUnique({
      where: {
        topicSlug_language: {
          topicSlug: axisKey,
          language: locale,
        },
      },
    });
    if (!plan) return null;

    const struct = plan.structure as PlanStructure;
    const warmupBody = struct?.warmup?.body ?? '';
    const warmupExcerpt =
      warmupBody.length > 200 ? `${warmupBody.slice(0, 200).trim()}…` : warmupBody;

    return {
      id: plan.id,
      topicSlug: plan.topicSlug,
      language: plan.language,
      title: struct?.title ?? plan.topicSlug,
      durationMinutes: plan.durationMinutes,
      warmupExcerpt,
    };
  } catch (err) {
    console.warn(
      '[lesson-plans] fetchLessonPlanSummaryForTopic DB unreachable; falling through:',
      (err as Error).message
    );
    return null;
  }
}
