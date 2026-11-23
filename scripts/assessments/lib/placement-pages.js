'use strict';
/**
 * (Stage C-3, 2026-11-23) The TEACHER PAGES of a placement check (build-teacher-pages.js --placement): how to give it and
 * the STOP RULE; the steps and their points, with the unit and lesson each comes from; the texts to read aloud and the
 * writing guide where the check has them; WHERE TO START per step ("If the child stops here, start at: <unit>, Lesson N",
 * with the unit's page; a step may name another lesson, its startAt, with its reason in the blueprint); the rule for a step of
 * one task (fix round 2026-11-23: the matching task of the other form first); the writing part, given to every child apart
 * from the steps; a class record (one row per child: the form, the step reached, where to start). The only sentences
 * are the strings of ui.<loc>.json; the look is the look of a unit check's teacher pages.
 *
 *   placementHtml(c, h) → the page's HTML; `c` is a check of out/assessments/<loc>/placement/checks.json, `h` the helpers of
 *   build-teacher-pages.js: { ui, loc, esc, fill, HOST, CSS, ROWS, readAloud, writingRows, rubricSection, RUBRICS }
 */
const gradeOf = (unitId) => (unitId.startsWith('k-') ? 'K' : (/^g(\d)-/.exec(unitId) || [])[1] || '');

function placementHtml(c, h) {
  const { ui, loc, esc, fill, HOST, CSS, ROWS, readAloud, writingRows, rubricSection, RUBRICS } = h;
  const W = c.writing || null, R = W ? RUBRICS[c.unit] : null;
  if (W && !R) throw new Error(c.unit + ': the check has a writing part and rubrics/' + loc + '.json has no entry for it');
  const grade = (s) => ui['yearGrade_' + gradeOf(s.unit)] || '';
  const from = (s) => '<b>' + esc(s.unitTitle) + '</b> (' + esc(grade(s)) + '), ' + esc(fill(ui.lessonRef, { n: s.unitLesson })) + ': ' + esc(s.lessonTitle);
  const total = c.sections.reduce((k, s) => k + s.cards, 0) + (W ? W.max : 0);
  const one = c.sections.some((s) => s.cards === 1);
  const steps = c.sections.map((s) => '<tr><td class="p">' + s.part + '</td><td>' + from(s) + (s.cards === 1 ? '<br><small>' + esc(ui.tpPlaceOneTask) + '</small>' : '') + '</td><td>' + esc(s.typeTitle) + '</td><td class="n">' + s.cards + '</td></tr>').join('')
    + (W ? writingRows(W) : '') + '<tr class="sum"><td></td><td><b>' + esc(ui.tpTotal) + '</b></td><td></td><td class="n">' + total + '</td></tr>';
  // (a step's own start-at: another lesson, named in the blueprint with its reason)
  const at = (s) => (s.startAt ? { unitTitle: s.startAt.unitTitle, grade: ui['yearGrade_' + s.startAt.grade] || '', n: s.startAt.n, title: s.startAt.title, slug: s.startAt.unitSlug } : { unitTitle: s.unitTitle, grade: grade(s), n: s.unitLesson, title: s.lessonTitle, slug: s.unitSlug });
  const start = c.sections.map((s) => { const t = at(s); return '<tr><td class="p">' + s.part + '</td><td>' + esc(fill(ui.tpPlaceStart, { unit: t.unitTitle + ' (' + t.grade + ')', n: t.n, title: t.title })) + '</td><td class="url">' + esc(HOST + '/' + loc + '/units/' + t.slug + '#lesson-' + t.n) + '</td></tr>'; }).join('')
    + '<tr><td class="p"></td><td colspan="2">' + esc(ui.tpPlaceStartAll) + '</td></tr>';
  const title = fill(ui.tpPlaceTitle, { check: c.title });
  const line = '<tr><td class="name"></td><td class="ab"></td><td class="st"></td><td class="sa"></td></tr>';
  return '<!doctype html><html lang="' + loc + '"><head><meta charset="utf-8"><title>' + esc(title) + '</title>'
    + '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">'
    + '<style>' + CSS + PLACE_CSS + '</style></head><body>'
    + '<header><p class="brand">LessonCraftStudio</p><p class="eyebrow">' + esc(ui.tpPlaceEyebrow) + '</p><h1>' + esc(title) + '</h1></header>'
    + '<section><h2>' + esc(ui.tpHowTitle) + '</h2><p class="stop">' + esc(ui.placeStop) + (one ? ' ' + esc(ui.placeStopOne) : '') + '</p><ul class="how"><li>' + [ui.tpPlaceHow, ui.yearFormsUse, W ? ui.tpHow3Plain : ui.tpHow3].concat(W ? [ui.tpPlaceWritingAll, ui.tpHow3Writing] : []).map(esc).join('</li><li>') + '</li></ul><p class="honest">' + esc(ui.tpPlaceHonest) + '</p></section>'
    + '<section><h2>' + esc(ui.tpPlaceStepsTitle) + '</h2><table class="score"><thead><tr><th>' + esc(ui.tpPlaceColStepNo) + '</th><th>' + esc(ui.tpYearColFrom) + '</th><th>' + esc(ui.tpColFrom) + '</th><th class="n">' + esc(ui.tpColPoints) + '</th></tr></thead><tbody>' + steps + '</tbody></table></section>'
    + readAloud(c)
    + (W ? rubricSection(W, R) : '')
    + '<section class="newpage"><h2>' + esc(ui.tpPlaceColStart) + '</h2><p class="stop">' + esc(ui.placeStop) + (one ? ' ' + esc(ui.placeStopOne) : '') + '</p>' + (W ? '<p class="lead">' + esc(ui.tpPlaceWritingStart) + '</p>' : '') + '<table class="next"><thead><tr><th>' + esc(ui.tpPlaceColStepNo) + '</th><th>' + esc(ui.tpPlaceColStart) + '</th><th>' + esc(ui.tpYearColPage) + '</th></tr></thead><tbody>' + start + '</tbody></table></section>'
    + '<section class="newpage"><h2>' + esc(ui.tpGridTitle) + '</h2><p class="lead">' + esc(ui.tpPlaceGridLead) + '</p><table class="grid"><thead><tr><th class="name">' + esc(ui.tpColName) + '</th><th class="ab">' + esc(ui.tpYearColForm) + '</th><th class="st">' + esc(ui.tpPlaceColStep) + '</th><th class="sa">' + esc(ui.tpPlaceColStartAt) + '</th></tr></thead><tbody>' + Array.from({ length: ROWS }, () => line).join('') + '</tbody></table></section>'
    + '</body></html>';
}
const PLACE_CSS = `
.stop { margin-top: 3mm; padding: 3mm 4mm; border-left: 3pt solid #146b5e; background: #eef5f3; max-width: 175mm; font-weight: 700; }
.next td.url { font-size: 8.5pt; color: #46625b; word-break: break-all; width: 62mm; }
.grid th.ab, .grid td.ab { width: 14mm; }
.grid th.st, .grid td.st { width: 28mm; }
.grid th.name { width: 50mm; }
`;
module.exports = { placementHtml };
