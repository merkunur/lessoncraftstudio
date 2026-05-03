import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSubscriber } from '@/lib/subscriber-api-gate';
import { resolveTopicSlug } from '@/lib/taxonomy';

// Pillar 1 Phase 1b — Lesson-plan detail endpoint.
// Subscriber-gated per docs/SUBSCRIPTION-SCOPE.md Pillar 1.
//
// URL slug is the per-locale topic-page slug (e.g., /api/lesson-plans/optellen?language=nl
// for the addition lesson plan in Dutch). The slug is resolved to its
// English-canonical axis-key via topics-taxonomy.json (taxonomy helper);
// LessonPlan rows are stored against the axis-key per Phase 1a schema-intent-B
// resolution at `1114dedb`.

export const dynamic = 'force-dynamic';

const VALID_LOCALES = new Set(['en', 'de', 'es', 'nl']);

interface PlanStructure {
  title?: string;
  warmup?: { durationMinutes?: number; body?: string };
  contentActivity?: { durationMinutes?: number; body?: string };
  scaffold?: { durationMinutes?: number; body?: string };
  closure?: { durationMinutes?: number; body?: string };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language');

  if (!language || !VALID_LOCALES.has(language)) {
    return NextResponse.json(
      { error: 'Query parameter `language` is required (one of en, de, es, nl).' },
      { status: 400 }
    );
  }

  // Resolve per-locale slug → English-canonical axis-key.
  const resolved = resolveTopicSlug(params.slug, language);
  if (!resolved) {
    return NextResponse.json({ error: 'Lesson plan not found' }, { status: 404 });
  }

  const plan = await prisma.lessonPlan.findUnique({
    where: {
      topicSlug_language: {
        topicSlug: resolved.axisKey,
        language,
      },
    },
  });

  if (!plan) {
    return NextResponse.json({ error: 'Lesson plan not found' }, { status: 404 });
  }

  const struct = plan.structure as PlanStructure;
  return NextResponse.json({
    plan: {
      id: plan.id,
      topicSlug: plan.topicSlug,
      language: plan.language,
      durationMinutes: plan.durationMinutes,
      title: struct?.title ?? plan.topicSlug,
      sections: {
        warmup: {
          durationMinutes: struct?.warmup?.durationMinutes ?? 0,
          body: struct?.warmup?.body ?? '',
        },
        contentActivity: {
          durationMinutes: struct?.contentActivity?.durationMinutes ?? 0,
          body: struct?.contentActivity?.body ?? '',
        },
        scaffold: {
          durationMinutes: struct?.scaffold?.durationMinutes ?? 0,
          body: struct?.scaffold?.body ?? '',
        },
        closure: {
          durationMinutes: struct?.closure?.durationMinutes ?? 0,
          body: struct?.closure?.body ?? '',
        },
      },
      recommendedDeckIds: plan.recommendedDeckIds,
      recommendedPdfDeckIds: plan.recommendedPdfDeckIds,
      generatedAt: plan.generatedAt.toISOString(),
    },
  });
}
