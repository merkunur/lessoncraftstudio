// ============================================================================
// Grade-Specific Type Utilities
// Re-exports core grade types from types.ts and adds grade-only helpers
// ============================================================================

export type { GradeId, GradeLearningContent, LearningObjective } from './types';
export { ALL_GRADE_IDS } from './types';

/** Human-readable grade labels keyed by GradeId (English) */
export const GRADE_LABELS: Record<import('./types').GradeId, string> = {
  'preschool': 'Preschool (Ages 3-4)',
  'kindergarten': 'Kindergarten (Ages 5-6)',
  'first-grade': '1st Grade (Ages 6-7)',
  'second-grade': '2nd Grade (Ages 7-8)',
  'third-grade': '3rd Grade (Ages 8-9)',
};

/** Typical age ranges per grade */
export const GRADE_AGE_RANGES: Record<import('./types').GradeId, { min: number; max: number }> = {
  'preschool': { min: 3, max: 4 },
  'kindergarten': { min: 5, max: 6 },
  'first-grade': { min: 6, max: 7 },
  'second-grade': { min: 7, max: 8 },
  'third-grade': { min: 8, max: 9 },
};
