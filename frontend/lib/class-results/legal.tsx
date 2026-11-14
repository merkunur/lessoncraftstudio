/**
 * The three texts of "classes and results" (Daily Teaching System, Part 9; legal decision of 2026-11-14, condition E7):
 * the privacy section, the data processing terms and the note for parents.
 *
 * They are written as plain text with a few marks (frontend/content/class-legal/src/<locale>/*.md) and built into one
 * file per language by scripts/class-results/build-class-legal.js, which also checks that a translation keeps the
 * headings, the lists and the facts of the English text. This module shows them. The marks it knows are the ones the
 * texts use and no more: headings (#, ##, ###), paragraphs, lists (- ), a table (| … |), a rule (---), a boxed note
 * (> ), bold (**…**) and a link ([words](/address)). The project carries no package for this and takes none.
 *
 * A language is listed here when its three texts exist. The pages that show the texts exist only while the feature is
 * switched on (CLASS_RESULTS_ENABLED=1), and the switch waits for all eleven languages.
 */
import type { ReactNode } from 'react';
import en from '@/content/class-legal/legal.en.json';

export type LegalDoc = 'privacy' | 'terms' | 'parentNote';
const LEGAL: Record<string, Record<LegalDoc, string>> = { en };

/** the languages whose three texts exist */
export const LEGAL_LOCALES: readonly string[] = Object.keys(LEGAL);
/** the text in the page's language; English until the language has its own */
export const legalText = (locale: string, doc: LegalDoc): string => (LEGAL[locale] || LEGAL.en)[doc];
/** the first heading of a text: the name of its page */
export const legalTitle = (locale: string, doc: LegalDoc): string => (/^#{1,3} (.+)$/m.exec(legalText(locale, doc)) || ['', ''])[1];

const INLINE = /(\*\*[^*\n]+\*\*|\[[^\]\n]+\]\((?:\/|https:\/\/)[^)\s]*\))/g;

function inline(s: string, locale: string, key: string): ReactNode[] {
  return s.split(INLINE).filter((x) => x !== '').map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={key + i}>{part.slice(2, -2)}</strong>;
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const href = link[2].startsWith('/') ? '/' + locale + link[2] : link[2];
      return <a key={key + i} href={href} className="underline">{link[1]}</a>;
    }
    return part;
  });
}

const H = { 1: 'text-3xl font-bold text-gray-900 dark:text-white mb-6', 2: 'text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4', 3: 'text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3' } as const;
const P = 'text-gray-600 dark:text-gray-300 mb-4';

/** One text, drawn. `skipTitle`: the page prints the first heading itself. */
export function LegalText({ md, locale, skipTitle }: { md: string; locale: string; skipTitle?: boolean }) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: ReactNode[] = [];
  let i = 0, n = 0, titleSeen = false;
  const key = () => 'b' + (n++);
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const h = /^(#{1,3}) (.+)$/.exec(line);
    if (h) {
      i++;
      if (skipTitle && !titleSeen) { titleSeen = true; continue; }
      titleSeen = true;
      const level = h[1].length as 1 | 2 | 3, k = key();
      out.push(level === 1 ? <h1 key={k} className={H[1]}>{h[2]}</h1> : level === 2 ? <h2 key={k} className={H[2]}>{h[2]}</h2> : <h3 key={k} className={H[3]}>{h[2]}</h3>);
      continue;
    }
    if (/^---+$/.test(line.trim())) { out.push(<hr key={key()} className="my-6 border-gray-200 dark:border-gray-700" />); i++; continue; }
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) { items.push(lines[i].slice(2)); i++; }
      const k = key();
      out.push(<ul key={k} className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">{items.map((t, j) => <li key={k + j}>{inline(t, locale, k + j)}</li>)}</ul>);
      continue;
    }
    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i].split('|').slice(1, -1).map((c) => c.trim())); i++; }
      const body = rows.filter((r) => !r.every((c) => /^-+$/.test(c)));
      const k = key();
      out.push(
        <div key={k} className="overflow-x-auto mb-4">
          <table className="w-full text-left text-gray-600 dark:text-gray-300 border-collapse">
            <thead><tr>{body[0].map((c, j) => <th key={k + 'h' + j} scope="col" className="border-b-2 border-gray-300 dark:border-gray-600 py-2 pr-4 font-semibold">{inline(c, locale, k + 'h' + j)}</th>)}</tr></thead>
            <tbody>{body.slice(1).map((r, a) => <tr key={k + 'r' + a}>{r.map((c, j) => <td key={k + 'r' + a + j} className="border-b border-gray-200 dark:border-gray-700 py-2 pr-4 align-top">{inline(c, locale, k + 'r' + a + j)}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (line.startsWith('> ')) {
      const note: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) { note.push(lines[i].slice(2)); i++; }
      const k = key();
      out.push(<aside key={k} data-legal-note="" className="rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-4 mb-4 print:hidden">{inline(note.join(' '), locale, k)}</aside>);
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,3} |- |\||> |---+$)/.test(lines[i])) { para.push(lines[i]); i++; }
    const k = key();
    out.push(<p key={k} className={P}>{inline(para.join(' '), locale, k)}</p>);
  }
  return <>{out}</>;
}
