/**
 * Where in the school year a teaching point has been taught (Daily Teaching System, Part 5).
 *
 * A sub day is review, never new teaching. The plans of a grade (frontend/content/units/units.<loc>.json → plans)
 * put the units in teaching order with their weeks; a point is "taught" when the unit that holds its lesson has
 * ended. A pack for the START of the year may use a point of an earlier grade, or one whose unit ends within the
 * first third of its plan's weeks; a pack for the MIDDLE within the first two thirds; a pack for the END any point of
 * the grade. A point that no plan of its grade teaches (puzzles, drawing, a unit outside every plan) has no place in
 * the year and is allowed at every position.
 */
'use strict';

/** point id → { plan, to, of }: the plan week in which the point's unit ends, of how many weeks */
function planWeeks(unitsFile) {
  const out = new Map();
  const unitById = new Map((unitsFile.units || []).map((u) => [u.id, u]));
  for (const plan of unitsFile.plans || []) {
    for (const row of plan.units) {
      const unit = unitById.get(row.id);
      if (!unit) continue;
      for (const l of unit.lessons) out.set(l.point, { plan: plan.id, to: row.to, of: plan.weeks });
    }
  }
  return out;
}

const SHARE = { early: 1 / 3, middle: 2 / 3, late: 1 };

/** null when the point may stand in a pack of this grade and position; else the reason it may not */
function refused(point, packGrade, position, weeks) {
  const ORDER = 'PK123';
  const pg = ORDER.indexOf(String(point.grade)), g = ORDER.indexOf(String(packGrade));
  if (pg < 0 || g < 0) return null;
  if (pg > g) return 'the teaching point is of grade ' + point.grade + ', later than the pack\'s grade';
  if (pg < g) return null;
  const w = weeks.get(point.id);
  if (!w || !(position in SHARE)) return null;
  const last = Math.max(1, Math.round(w.of * SHARE[position]));
  return w.to > last ? 'its unit ends in week ' + w.to + ' of ' + w.of + ' of ' + w.plan + '; a pack for the ' + position + ' of the year reviews what was taught by week ' + last : null;
}

// a sub day can fall on any date, and not every child keeps every holiday: no pack hands out a page whose pictures
// belong to one
const HOLIDAY_PAGE = /(christmas|easter|halloween|thanksgiving|valentine|st-patrick|hanukkah|4th-of-july)/;
module.exports = {
  HOLIDAY_PAGE, planWeeks, refused, SHARE };
