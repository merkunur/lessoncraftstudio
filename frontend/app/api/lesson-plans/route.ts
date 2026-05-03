import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSubscriber } from '@/lib/subscriber-api-gate';

// Pillar 1 Phase 1b — Lesson-plan index endpoint.
// Subscriber-gated per docs/SUBSCRIPTION-SCOPE.md Pillar 1 (content-only library).
// Filter by language (required) + topicSlug (optional). Returns minimal
// summary payload (slug + language + title + total duration). Full body
// served via /api/lesson-plans/[slug] detail endpoint.

export const dynamic = 'force-dynamic';

const VALID_LOCALES = new Set(['en', 'de', 'es', 'nl']);

interface PlanStructure {
  title?: string;
  warmup?: { durationMinutes?: number };
  contentActivity?: { durationMinutes?: number };
  scaffold?: { durationMinutes?: number };
  closure?: { durationMinutes?: number };
}

export async function GET(request: NextRequest) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language');
  const topicSlug = searchParams.get('topicSlug');

  if (!language || !VALID_LOCALES.has(language)) {
    return NextResponse.json(
      { error: 'Query parameter `language` is required (one of en, de, es, nl).' },
      { status: 400 }
    );
  }

  const where: { language: string; topicSlug?: string } = { language };
  if (topicSlug) where.topicSlug = topicSlug;

  const plans = await prisma.lessonPlan.findMany({
    where,
    select: {
      id: true,
      topicSlug: true,
      language: true,
      durationMinutes: true,
      structure: true,
      generatedAt: true,
    },
    orderBy: { topicSlug: 'asc' },
  });

  return NextResponse.json({
    plans: plans.map(p => {
      const struct = p.structure as PlanStructure;
      return {
        id: p.id,
        topicSlug: p.topicSlug,
        language: p.language,
        title: struct?.title ?? p.topicSlug,
        durationMinutes: p.durationMinutes,
        generatedAt: p.generatedAt.toISOString(),
      };
    }),
  });
}
