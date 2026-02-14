'use client';

import { useState } from 'react';
import type { GradeId, GradeLearningContent, CurriculumArea } from '@/content/themes/types';
import { ALL_GRADE_IDS } from '@/content/themes/types';
import { getGradeDisplayName } from '@/config/grade-slugs';
import { sectionLearningObjectives } from '@/config/theme-page-labels';
import { labelDevelopmentalNotes } from '@/config/theme-page-labels';

interface ThemeLearningObjectivesProps {
  gradeContent: Partial<Record<GradeId, GradeLearningContent>>;
  locale: string;
  activeGrade?: GradeId;
}

// Skill badge colors per curriculum area
const areaBadge: Record<CurriculumArea, { bg: string; text: string }> = {
  math: { bg: 'bg-blue-100', text: 'text-blue-700' },
  literacy: { bg: 'bg-green-100', text: 'text-green-700' },
  motor: { bg: 'bg-orange-100', text: 'text-orange-700' },
  cognitive: { bg: 'bg-purple-100', text: 'text-purple-700' },
  creative: { bg: 'bg-pink-100', text: 'text-pink-700' },
  social: { bg: 'bg-amber-100', text: 'text-amber-700' },
};

// Area display names (short, used as badge prefix)
const areaLabel: Record<CurriculumArea, string> = {
  math: 'Math',
  literacy: 'Literacy',
  motor: 'Motor',
  cognitive: 'Cognitive',
  creative: 'Creative',
  social: 'Social',
};

export default function ThemeLearningObjectives({
  gradeContent,
  locale,
  activeGrade,
}: ThemeLearningObjectivesProps) {
  // Determine available grades (only those with data)
  const availableGrades = ALL_GRADE_IDS.filter(
    (g) => gradeContent[g] != null
  );

  // Graceful degradation
  if (availableGrades.length === 0) return null;

  // For grade page mode: fixed single grade, no tabs
  if (activeGrade) {
    const content = gradeContent[activeGrade];
    if (!content) return null;
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {sectionLearningObjectives[locale] || sectionLearningObjectives.en}
          </h2>
          <GradeObjectivesPanel content={content} locale={locale} />
        </div>
      </section>
    );
  }

  // Theme page mode: tabs
  return <ThemePageObjectives availableGrades={availableGrades} gradeContent={gradeContent} locale={locale} />;
}

// ── Inner component with useState (theme page mode) ─────────────

function ThemePageObjectives({
  availableGrades,
  gradeContent,
  locale,
}: {
  availableGrades: GradeId[];
  gradeContent: Partial<Record<GradeId, GradeLearningContent>>;
  locale: string;
}) {
  const [selectedGrade, setSelectedGrade] = useState<GradeId>(availableGrades[0]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {sectionLearningObjectives[locale] || sectionLearningObjectives.en}
        </h2>

        {/* Grade pill tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist">
          {availableGrades.map((gradeId) => {
            const isActive = gradeId === selectedGrade;
            return (
              <button
                key={gradeId}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedGrade(gradeId)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-purple-50 hover:border-purple-300'
                }`}
              >
                {getGradeDisplayName(gradeId, locale)}
              </button>
            );
          })}
        </div>

        {/* Render ALL grades in HTML for SSR (search engines see everything) */}
        {/* Only the selected grade is visible via CSS */}
        {availableGrades.map((gradeId) => {
          const content = gradeContent[gradeId];
          if (!content) return null;
          return (
            <div
              key={gradeId}
              className={gradeId === selectedGrade ? '' : 'hidden'}
              role="tabpanel"
              aria-label={getGradeDisplayName(gradeId, locale)}
            >
              <GradeObjectivesPanel content={content} locale={locale} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Shared panel for a single grade's objectives ────────────────

function GradeObjectivesPanel({
  content,
  locale,
}: {
  content: GradeLearningContent;
  locale: string;
}) {
  return (
    <div>
      {/* Skill badges */}
      {content.objectives.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {content.objectives.map((obj, i) => {
            const badge = areaBadge[obj.area] || areaBadge.cognitive;
            return (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${badge.bg} ${badge.text}`}
              >
                <span className="opacity-70 text-xs uppercase tracking-wide">
                  {areaLabel[obj.area] || obj.area}
                </span>
                <span className="mx-0.5 opacity-30">|</span>
                {obj.skill}
              </span>
            );
          })}
        </div>
      )}

      {/* Developmental notes callout */}
      {content.developmentalNotes && (
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-2">
            {labelDevelopmentalNotes[locale] || labelDevelopmentalNotes.en}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {content.developmentalNotes}
          </p>
        </div>
      )}
    </div>
  );
}
