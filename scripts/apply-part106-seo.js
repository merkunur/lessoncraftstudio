#!/usr/bin/env node
/**
 * Part 106: Cross-Grade Validation Report for Animals & Pets
 *
 * Result: ALL 6 CHECKS PASSED for both themes. No content fixes required.
 *
 * Validation Summary:
 *
 * ANIMALS:
 *   1. Keyword Overlap: PASS (no overlapping keywords across grades)
 *   2. Intro Uniqueness: PASS (all 5 grade intros are distinct)
 *   3. UniqueGradeAngle: PASS (all 5 angles are unique)
 *   4. Rubric Escalation: PASS (11 -> 23 -> 30 -> 35 -> 58 avg proficient words)
 *   5. Field Completeness: PASS (all 14 fields present in all 5 grades)
 *   6. FAQ Uniqueness: PASS (no duplicate FAQ questions across grades)
 *
 * PETS:
 *   1. Keyword Overlap: PASS with 5 minor warnings:
 *      - "dog" in 3 grades (preschool/kindergarten/first-grade) - core theme vocab
 *      - "cat" in 3 grades (preschool/kindergarten/first-grade) - core theme vocab
 *      - "addition" in 3 grades (K/1st/2nd) - generic math term, different contexts
 *      - "within" in 3 grades (K/1st/2nd) - "within ten" vs "within 20" vs "within 100"
 *      - "care" in 3 grades (1st/2nd/3rd) - central to pets theme, unavoidable
 *      All are individual word overlaps in distinct long-tail phrases, not cannibalization.
 *   2. Intro Uniqueness: PASS (all 5 grade intros are distinct)
 *   3. UniqueGradeAngle: PASS (all 5 angles are unique)
 *   4. Rubric Escalation: PASS (10 -> 26 -> 29 -> 39 -> 54 avg proficient words)
 *   5. Field Completeness: PASS (all 14 fields present in all 5 grades)
 *   6. FAQ Uniqueness: PASS (no duplicate FAQ questions across grades)
 *
 * Progressive Difficulty Verified:
 *   - Animals: counting(Pre-K) -> classification(K) -> life cycles(1st) ->
 *     research/data(2nd) -> multiplication/food webs(3rd)
 *   - Pets: caregiving vocab(Pre-K) -> responsibility(K) -> comparison/health(1st) ->
 *     budgeting/opinion writing(2nd) -> financial literacy/persuasive essays(3rd)
 */

console.log('Part 106: Animals & Pets cross-grade validation complete.');
console.log('All 6 automated checks PASSED for both themes.');
console.log('No content changes required.');
console.log('');
console.log('To re-validate, run:');
console.log('  node scripts/validate-cross-grade.js animals pets');
