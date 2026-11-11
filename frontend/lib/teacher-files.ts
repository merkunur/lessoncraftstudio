/**
 * Teacher-only files (Daily Teaching System, Part 3): PDFs that only an active subscriber may open — a unit's
 * teacher guide, a sub pack's script and forms, later a test's answer booklet.
 *
 * They live OUTSIDE every folder nginx serves (no public URL exists for them) and are read from disk by the gate
 * (GET /api/quota/dl?kind=teacher&loc=<locale>&file=<kind>/<id>/<name>), which answers with the file only to a
 * subscriber. They never count against a free account's monthly downloads: a free account cannot open them at all.
 *
 *   /var/www/lcs-media/teacher-files/<locale>/<kind>/<id>/<name>.pdf
 *
 * Uploaded by scripts/units/upload-teacher-files.sh. On the PC (next dev) TEACHER_FILES_DIR points at out/teacher-files.
 */
import path from 'path';

export const TEACHER_FILES_DIR = process.env.TEACHER_FILES_DIR || '/var/www/lcs-media/teacher-files';

/** kinds of Teacher-only files; a new product adds its kind here */
const KINDS = ['units', 'sub-plans', 'checks'] as const;

/**
 * The student forms of a unit check (Part 7) lie in the same tree but are NOT Teacher-only: they are printables,
 * handed out through the metered path (GET /api/quota/dl?kind=form). Only these two names of the kind "checks" can
 * be asked for that way, so a key can never be fetched as a form.
 */
export function checkFormPath(locale: string, file: string): string | null {
  if (!/^[a-z]{2}$/.test(locale)) return null;
  const m = /^checks\/([a-z0-9]+(?:-[a-z0-9]+)*)\/(check-a|check-b)$/.exec(file);
  return m ? path.join(TEACHER_FILES_DIR, locale, 'checks', m[1], m[2] + '.pdf') : null;
}

/** `file` is "<kind>/<id>/<name>", every part lower-case letters, digits and hyphens; anything else is refused */
export function teacherFilePath(locale: string, file: string): string | null {
  if (!/^[a-z]{2}$/.test(locale)) return null;
  const m = /^([a-z-]+)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(file);
  if (!m || !(KINDS as readonly string[]).includes(m[1])) return null;
  return path.join(TEACHER_FILES_DIR, locale, m[1], m[2], m[3] + '.pdf');
}

export function teacherFileHref(locale: string, file: string): string {
  return `/api/quota/dl?kind=teacher&loc=${locale}&file=${encodeURIComponent(file)}`;
}
