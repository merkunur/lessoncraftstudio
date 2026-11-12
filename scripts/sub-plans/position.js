/**
 * Where in the school year a teaching point has been taught (Daily Teaching System, Part 5).
 *
 * A sub day is review, never new teaching. The plans of a grade (frontend/content/units/units.<loc>.json → plans)
 * put the units in teaching order; each lesson carries its class days (scripts/units/pacing.js) and each unit ends
 * with three more. A point is "taught" on the last class day of ITS lesson. A pack for the START of the year may use
 * a point of an earlier grade, or one taught within the first third of its plan's class days; a pack for the MIDDLE
 * within the first two thirds; a pack for the END any point of the grade. (Before Part 4.8 the measure was the week
 * in which the whole unit ended; the units file of a language without lesson days is still measured that way.) A point that no plan of its grade teaches (puzzles, drawing, a unit outside every plan) has no place in
 * the year and is allowed at every position. The school year of a point is the one in which the language's own units
 * teach it; the grade in the point's id counts only where no unit of the language holds the point.
 */
'use strict';

/** point id → { plan, to, of }: the plan week in which the point's unit ends, of how many weeks */
function planWeeks(unitsFile) {
  const out = new Map();
  const unitById = new Map((unitsFile.units || []).map((u) => [u.id, u]));
  for (const plan of unitsFile.plans || []) {
    // the class day on which each lesson is done (Part 4.8: a lesson carries 2 or 3 days, a unit ends with 3), so a
    // point is placed by the day ITS lesson is taught, not by the last week of the whole unit
    const UNIT_END = 3;
    const ofDays = plan.units.reduce((n, row) => { const unit = unitById.get(row.id); return n + (unit ? unit.lessons.reduce((m, l) => m + (l.days || 2), 0) + UNIT_END : 0); }, 0);
    let day = 0;
    for (const row of plan.units) {
      const unit = unitById.get(row.id);
      if (!unit) continue;
      for (const l of unit.lessons) { day += l.days || 2; out.set(l.point, { plan: plan.id, to: row.to, of: plan.weeks, day, ofDays, grade: String(unit.grade) }); }
      day += UNIT_END;
    }
  }
  // a unit outside every plan still says in which school year of this country its points are taught
  for (const unit of unitsFile.units || []) for (const l of unit.lessons) if (!out.has(l.point)) out.set(l.point, { grade: String(unit.grade) });
  return out;
}

const SHARE = { early: 1 / 3, middle: 2 / 3, late: 1 };

/** null when the point may stand in a pack of this grade and position; else the reason it may not */
function refused(point, packGrade, position, weeks) {
  const ORDER = 'PK123';
  // the school year in which THIS country's units teach the point comes before the grade in the point's id (a
  // letter page is Kindergarten work in the US and first-grade work in Germany)
  const w = weeks.get(point.id);
  const taughtIn = w && w.grade != null ? w.grade : String(point.grade);
  const pg = ORDER.indexOf(taughtIn), g = ORDER.indexOf(String(packGrade));
  if (pg < 0 || g < 0) return null;
  if (pg > g) return 'the teaching point is of grade ' + taughtIn + ', later than the pack\'s grade';
  if (pg < g) return null;
  if (!w || w.to == null || !(position in SHARE)) return null;
  if (w.day != null && w.ofDays) {
    const lastDay = Math.max(1, Math.round(w.ofDays * SHARE[position]));
    return w.day > lastDay ? 'its lesson is taught on class day ' + w.day + ' of ' + w.ofDays + ' of ' + w.plan + '; a pack for the ' + position + ' of the year reviews what was taught by day ' + lastDay : null;
  }
  const last = Math.max(1, Math.round(w.of * SHARE[position]));
  return w.to > last ? 'its unit ends in week ' + w.to + ' of ' + w.of + ' of ' + w.plan + '; a pack for the ' + position + ' of the year reviews what was taught by week ' + last : null;
}

// a sub day can fall on any date, and not every child keeps every holiday: no pack hands out a page whose pictures
// belong to one
const HOLIDAY_PAGE = /(christmas|easter|halloween|thanksgiving|valentine|st-patrick|hanukkah|4th-of-july|weihnacht|ostern|nikolaus|advent|fasching|karneval|st-martin|muttertag)/;
/**
 * null when the blocks make a pack of this form, else what is wrong. A day (no form): at least five blocks, with
 * reading, writing and math. A lesson: one lesson of one subject, three or four blocks, 35 to 45 minutes, the
 * opening block first and the closing block last.
 */
function packShape(form, blocks) {
  if (form && form !== 'lesson') return 'unknown form ' + form;
  if (!form) {
    if (blocks.length < 5) return blocks.length + ' blocks (at least 5)';
    for (const m of ['reading', 'writing', 'math']) if (!blocks.some((b) => b.key === m)) return 'no ' + m + ' block';
    return null;
  }
  if (blocks.length < 3 || blocks.length > 4) return blocks.length + ' blocks (a lesson has 3 or 4)';
  const min = blocks.reduce((n, b) => n + b.minutes, 0);
  if (min < 35 || min > 45) return min + ' minutes (a lesson has 35 to 45)';
  if (blocks[0].key !== 'morning') return 'a lesson opens with its opening block';
  if (blocks[blocks.length - 1].key !== 'closing') return 'a lesson ends with its closing block';
  return null;
}
module.exports = {
  packShape, HOLIDAY_PAGE, planWeeks, refused, SHARE };
