/* The unit check of a unit, on the unit's page (Daily Teaching System, Part 7): what the two paper checks cover,
 * the student forms (printables, counted like any download) and the Teacher-only files (answer keys, teacher pages).
 * Everything shown is generated (content/assessments/checks.<loc>.json); the only sentences are the strings of
 * content/assessments/ui.<loc>.json. The section says what the check is and what it is not. */
import { AssessmentUi, UnitCheck, checkFormHref } from '@/lib/assessments';
import { teacherFileHref } from '@/lib/teacher-files';
import { fill } from '@/lib/units';

export default function UnitCheckSection({ locale, check, ui, planName }: { locale: string; check: UnitCheck; ui: AssessmentUi; planName: string }) {
  const tasks = (n: number) => (n === 1 ? ui.taskOne : fill(ui.taskMany, { n }));
  const pages = (n: number) => (n === 1 ? ui.pagesOne : fill(ui.pagesMany, { n }));
  const file = (name: string) => teacherFileHref(locale, `checks/${check.unit}/${name}`);
  return (
    <section className="un-check" id="unit-check" aria-labelledby="un-check-title">
      <h2 id="un-check-title">{ui.sectionTitle}</h2>
      <p className="un-check-lead">{ui.sectionLead}</p>
      <ul className="un-check-parts">
        {check.parts.map((p) => (
          <li key={p.part}>
            <a href={`#lesson-${p.lesson}`}>{fill(ui.partLine, { part: p.part, lesson: p.lesson, title: p.title })}</a>{' '}
            <span>({tasks(p.tasks)})</span>
          </li>
        ))}
      </ul>
      {check.notCovered.length ? <p className="un-check-left">{fill(ui.notCovered, { lessons: check.notCovered.map((n) => fill(ui.lessonRef, { n })).join(', ') })}</p> : null}
      <div className="un-check-files">
        <a className="un-check-btn" href={checkFormHref(locale, check.unit, 'a')} rel="nofollow">{ui.formA} · {pages(check.forms.A.pages)}</a>
        <a className="un-check-btn" href={checkFormHref(locale, check.unit, 'b')} rel="nofollow">{ui.formB} · {pages(check.forms.B.pages)}</a>
      </div>
      <p className="un-check-note">{ui.formsNote}</p>
      <div className="un-check-files">
        <a className="un-check-btn un-check-btn-line" href={file('key-a')} rel="nofollow">{ui.keyA}</a>
        <a className="un-check-btn un-check-btn-line" href={file('key-b')} rel="nofollow">{ui.keyB}</a>
        <a className="un-check-btn un-check-btn-line" href={file('teacher-pages')} rel="nofollow">{ui.teacherPages}</a>
      </div>
      <p className="un-check-note">{fill(ui.teacherNote, { plan: planName })}</p>
      <p className="un-check-honest">{ui.sectionHonest}</p>
      {ui.hubLinkFromUnits ? <p className="un-check-note"><a href={`/${locale}/assessments`}>{ui.hubCrumb}</a></p> : null}
    </section>
  );
}
