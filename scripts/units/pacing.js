/**
 * How many class days a lesson carries, and how many weeks a unit takes (Daily Teaching System, Part 4.8).
 *
 * The rule is a US teacher-reviewer's (2026-11-12, scripts/units/year/reviews/en.review-1.json), who rejected a flat
 * three days per lesson as padding:
 *   - two class days are the base of every lesson: a TEACH day (the classroom tool, the first practice page done
 *     together) and a PRACTICE-AND-CHECK day (the page at the child's level, the screen task, the check-up page);
 *   - a lesson earns a third day, to RESPOND to what the check showed (re-teach with the tool and a fresh page from
 *     the worksheet maker; a harder page for the rest), only when it holds the material for it: a classroom tool,
 *     the page at more than one level, a check-up page (the day acts on it) and a worksheet maker;
 *   - a Kindergarten lesson is two days (its second day is hands-on, at stations);
 *   - a unit ends with three days: review, the unit check, and a day to act on the check.
 * A unit's weeks are its days divided by the sessions a class has in a week, said as a whole number ("about N
 * weeks"): five, except mathematics in the Swedish förskoleklass, which has no timetable by subject and does
 * mathematics two or three times a week (three is counted).
 * A German and a Swedish teacher read the rule on 2026-11-12 (scripts/units/year/reviews/pacing.review-1.json):
 * it fits Klasse 1 to 3 and årskurs 1 to 3 unchanged; the förskoleklass week is the one change.
 */
'use strict';
const UNIT_END_DAYS = 3;
function lessonDays(grade, lesson) {
  if (String(grade) === 'K' || String(grade) === 'P') return 2;
  const levels = (lesson.paper || []).some((p) => p.easy || p.hard);
  return lesson.tool && levels && lesson.exit && lesson.maker ? 3 : 2;
}
const unitDays = (grade, lessons) => lessons.reduce((n, l) => n + lessonDays(grade, l), 0) + UNIT_END_DAYS;
const sessionsAWeek = (grade, ctx) => (ctx && ctx.loc === 'sv' && ctx.subject === 'math' && String(grade) === 'K' ? 3 : 5);
const unitWeeks = (grade, lessons, ctx) => Math.max(1, Math.round(unitDays(grade, lessons) / sessionsAWeek(grade, ctx)));
module.exports = { UNIT_END_DAYS, lessonDays, unitDays, unitWeeks, sessionsAWeek };
