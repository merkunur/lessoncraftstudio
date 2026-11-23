'use strict';
/**
 * (Stage C-2, 2026-11-22) The TEACHER PAGES of a check of the year (build-teacher-pages.js --year): how to use it, its
 * parts and points with the unit and lesson each part comes from, the texts to read aloud (when a part has them), what
 * to do next per part ("If a child misses this part: re-teach <unit>, Lesson N", with the unit's page), and a class record
 * (one column per part of the form a child took). The only sentences are the strings of ui.<loc>.json; the look is the
 * look of a unit check's teacher pages (the CSS of build-teacher-pages.js).
 *
 *   yearHtml(c, h) → the page's HTML; `c` is a check of out/assessments/<loc>/year/checks.json, `h` the helpers of
 *   build-teacher-pages.js: { ui, loc, esc, fill, HOST, CSS, ROWS, readAloud }
 */
const GRADES = ['K', '1', '2', '3'];

function yearHtml(c, h) {
  const { ui, loc, esc, fill, HOST, CSS, ROWS, readAloud } = h;
  const g = String(c.grade), time = c.year.time;
  const entry = time === 'beginning' && g === 'K';
  const prev = GRADES[GRADES.indexOf(g) - 1];
  const how = entry ? ui.tpYearHow_entry : time === 'beginning' ? fill(ui.tpYearHow_beginning, { prev: ui['yearGrade_' + prev] }) : ui['tpYearHow_' + time];
  // a unit of another grade (the beginning of Grades 1-3 asks the year before) carries its grade after its title
  const unitName = (s) => s.unitTitle + (gradeOf(s.unit) !== g ? ' ' + fill(ui.yearPartGrade, { grade: ui['yearGrade_' + gradeOf(s.unit)] }) : '');
  const from = (s) => '<b>' + esc(unitName(s)) + '</b>, ' + esc(fill(ui.lessonRef, { n: s.unitLesson })) + ': ' + esc(s.lessonTitle);
  const total = c.sections.reduce((k, s) => k + s.cards, 0);
  const score = c.sections.map((s) => '<tr><td class="p">' + s.part + '</td><td>' + from(s) + '</td><td>' + esc(s.typeTitle) + '</td><td class="n">' + s.cards + '</td></tr>').join('')
    + '<tr class="sum"><td></td><td><b>' + esc(ui.tpTotal) + '</b></td><td></td><td class="n">' + total + '</td></tr>';
  const next = c.sections.map((s) => '<tr><td class="p">' + s.part + '</td><td>' + from(s) + '</td><td>' + esc(fill(entry ? ui.tpYearTeach : ui.tpYearReteach, { unit: unitName(s), n: s.unitLesson, title: s.lessonTitle })) + '</td><td class="url">' + esc(HOST + '/' + loc + '/units/' + s.unitSlug + '#lesson-' + s.unitLesson) + '</td></tr>').join('');
  // the class record: the name, the form a child took, one column per part, the total
  const head = '<tr><th class="name">' + esc(ui.tpColName) + '</th><th class="ab">' + esc(ui.tpYearColForm) + '</th>' + c.sections.map((s) => '<th>' + s.part + '<small> /' + s.cards + '</small></th>').join('') + '<th>' + esc(ui.tpTotal) + '<small> /' + total + '</small></th></tr>';
  const line = '<tr><td class="name"></td><td class="ab"></td>' + c.sections.map(() => '<td></td>').join('') + '<td class="b"></td></tr>';
  const title = fill(ui.tpYearTitle, { check: c.title });
  return '<!doctype html><html lang="' + loc + '"><head><meta charset="utf-8"><title>' + esc(title) + '</title>'
    + '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">'
    + '<style>' + CSS + YEAR_CSS + '</style></head><body>'
    + '<header><p class="brand">LessonCraftStudio</p><p class="eyebrow">' + esc(ui.tpYearEyebrow) + '</p><h1>' + esc(title) + '</h1></header>'
    + '<section><h2>' + esc(ui.tpHowTitle) + '</h2><ul class="how"><li>' + [how, ui.yearFormsUse, ui.tpHow2, ui.tpHow3].map(esc).join('</li><li>') + '</li></ul><p class="honest">' + esc(ui.tpYearHonest) + '</p></section>'
    + '<section><h2>' + esc(ui.tpScoreTitle) + '</h2><table class="score"><thead><tr><th>' + esc(ui.tpColPart) + '</th><th>' + esc(ui.tpYearColFrom) + '</th><th>' + esc(ui.tpColFrom) + '</th><th class="n">' + esc(ui.tpColPoints) + '</th></tr></thead><tbody>' + score + '</tbody></table></section>'
    + readAloud(c)
    + '<section class="newpage"><h2>' + esc(ui.tpNextTitle) + '</h2><p class="lead">' + esc(ui.tpYearNextLead) + '</p><table class="next"><thead><tr><th>' + esc(ui.tpColPart) + '</th><th>' + esc(ui.tpYearColFrom) + '</th><th>' + esc(ui.tpYearColNext) + '</th><th>' + esc(ui.tpYearColPage) + '</th></tr></thead><tbody>' + next + '</tbody></table></section>'
    + '<section class="newpage"><h2>' + esc(ui.tpGridTitle) + '</h2><p class="lead">' + esc(ui.tpYearGridLead) + '</p><table class="grid"><thead>' + head + '</thead><tbody>' + Array.from({ length: ROWS }, () => line).join('') + '</tbody></table></section>'
    + '</body></html>';
}
const gradeOf = (unitId) => (unitId.startsWith('k-') ? 'K' : (/^g(\d)-/.exec(unitId) || [])[1] || '');
const YEAR_CSS = `
.next td.url { font-size: 8.5pt; color: #46625b; word-break: break-all; width: 52mm; }
.next td:nth-child(2) { width: 50mm; }
.grid th.ab, .grid td.ab { width: 12mm; }
`;
module.exports = { yearHtml };
