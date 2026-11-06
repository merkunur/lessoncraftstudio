'use client';

/* The hub's finder: one search box over every maker AND every worksheet in this language, plus grade and subject chips.
   The whole list renders on the server too (the cards are plain links), so a crawler and a visitor without JavaScript get
   every maker; typing only narrows what is shown. */
import { useMemo, useState } from 'react';

export interface FinderTemplate { id: string; title: string; href: string; pic: string }
export interface FinderMaker {
  id: string;
  name: string;
  href: string;
  group: string;
  grades: string[];
  gradeLabel: string;
  count: number;
  pics: string[];
  templates: FinderTemplate[];
}
export interface FinderStrings {
  searchLabel: string;
  searchPlaceholder: string;
  allGrades: string;
  allSubjects: string;
  gradeFilterAria: string;
  subjectFilterAria: string;
  worksheetsCount: string;
  noResults: string;
  resultsTemplates: string;
  showing: string;
}

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{M}+/gu, '');

export default function MakerFinder({
  makers,
  groups,
  grades,
  strings,
  quick,
}: {
  makers: FinderMaker[];
  groups: Array<{ key: string; label: string; blurb: string }>;
  grades: Array<{ key: string; label: string }>;
  strings: FinderStrings;
  quick: string[];
}) {
  const [q, setQ] = useState('');
  const [grade, setGrade] = useState('');
  const [group, setGroup] = useState('');
  const query = norm(q.trim());

  const { shown, templateHits } = useMemo(() => {
    const byGrade = (m: FinderMaker) => !grade || m.grades.includes(grade);
    const byGroup = (m: FinderMaker) => !group || m.group === group;
    const list = makers.filter((m) => byGrade(m) && byGroup(m));
    if (!query) return { shown: list, templateHits: [] as Array<FinderTemplate & { maker: string }> };
    const hits: Array<FinderTemplate & { maker: string }> = [];
    const ids = new Set<string>();
    for (const m of list) {
      if (norm(m.name).includes(query)) ids.add(m.id);
      for (const t of m.templates) {
        if (norm(t.title).includes(query)) { ids.add(m.id); hits.push({ ...t, maker: m.name }); }
      }
    }
    return { shown: list.filter((m) => ids.has(m.id)), templateHits: hits.slice(0, 12) };
  }, [makers, query, grade, group]);

  const visibleGroups = groups.filter((g) => shown.some((m) => m.group === g.key));
  const filtered = !!(query || grade || group);

  return (
    <div className="mh-finder">
      <div className="mh-search-card">
        <label className="mh-search-label" htmlFor="mh-search">{strings.searchLabel}</label>
        <input
          id="mh-search"
          className="mh-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={strings.searchPlaceholder}
          autoComplete="off"
        />
        <div className="mh-quick">
          {quick.map((w) => (
            <button key={w} type="button" onClick={() => setQ(w)}>{w}</button>
          ))}
        </div>
      </div>

      <div className="mh-filters">
        <div className="mh-chips" role="group" aria-label={strings.gradeFilterAria}>
          <button type="button" aria-pressed={!grade} onClick={() => setGrade('')}>{strings.allGrades}</button>
          {grades.map((g) => (
            <button key={g.key} type="button" aria-pressed={grade === g.key} onClick={() => setGrade(g.key)}>{g.label}</button>
          ))}
        </div>
        <div className="mh-chips" role="group" aria-label={strings.subjectFilterAria}>
          <button type="button" aria-pressed={!group} onClick={() => setGroup('')}>{strings.allSubjects}</button>
          {groups.map((g) => (
            <button key={g.key} type="button" aria-pressed={group === g.key} onClick={() => setGroup(g.key)}>{g.label}</button>
          ))}
        </div>
      </div>

      <p className="mh-status" role="status" aria-live="polite">
        {filtered ? strings.showing.replace('{count}', String(shown.length)) : ''}
      </p>

      {templateHits.length ? (
        <section className="mh-hits" aria-label={strings.resultsTemplates}>
          <h2>{strings.resultsTemplates}</h2>
          <ul>
            {templateHits.map((t) => (
              <li key={`${t.maker}-${t.id}`}>
                <a href={t.href}>
                  <img src={t.pic} alt="" width={640} height={860} loading="lazy" decoding="async" />
                  <span className="mh-hit-title">{t.title}</span>
                  <span className="mh-hit-maker">{t.maker}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {shown.length === 0 ? <p className="mh-none">{strings.noResults}</p> : null}

      {visibleGroups.map((g) => (
        <section key={g.key} className="mh-group" aria-labelledby={`mh-g-${g.key}`}>
          <header>
            <h2 id={`mh-g-${g.key}`}>{g.label}</h2>
            <p>{g.blurb}</p>
          </header>
          <ul className="mh-grid">
            {shown.filter((m) => m.group === g.key).map((m) => (
              <li key={m.id}>
                <a className="mh-card" href={m.href}>
                  <span className="mh-stack" aria-hidden="true">
                    {m.pics.slice(0, 3).map((p, i) => (
                      <img key={p} className={`is-${i}`} src={p} alt="" width={640} height={860} loading="lazy" decoding="async" />
                    ))}
                  </span>
                  <span className="mh-card-name">{m.name}</span>
                  <span className="mh-card-meta">{strings.worksheetsCount.replace('{count}', String(m.count))}</span>
                  <span className="mh-card-grades">{m.gradeLabel}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
