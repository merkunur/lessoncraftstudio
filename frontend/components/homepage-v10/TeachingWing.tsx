import Link from 'next/link';
import type { HomepageTeaching } from '@/lib/homepage-teaching';
import './teaching-wing.css';

/* ── The Teaching Wing ─────────────────────────────────────────────────────
   Daily Teaching System, Part 11.7. The first room after the hall: what a
   teacher teaches FROM. Four framed pages, each a real page of a real file
   (a lesson sheet of a teacher guide, the first page a guest teacher gets,
   the teacher page of a unit check, a scope and sequence), each hung over
   the name of its product and one sentence about it, and above them the
   grade chooser that leads to the whole year of a grade.

   The room wears the gallery's own fabric (cornice, dado, floor from
   homepage-v10.css) and its frames (.hv10-work-frame); only the hang of four
   and the text under each frame are its own (teaching-wing.css).
   No sentence is written for this room: lib/homepage-teaching.ts.
   A language without the products gets no wing (the page passes null). */
export default function TeachingWing({ numeral, data }: { numeral: string; data: HomepageTeaching }) {
  return (
    <section id="teaching" className="hv10-room is-light" data-teaching-wing>
      <div className="hv10-room-cornice" aria-hidden="true" data-bleed />
      <div className="hv10-room-inner">
        <p className="hv10-room-label" aria-hidden="true">{numeral}</p>
        <h2 className="hv10-room-h2">{data.heading}</h2>
        <p className="hv10-room-body">{data.body}</p>

        <p className="hv10-tw-grades">
          <span className="hv10-tw-grades-label">{data.gradeLabel}</span>
          {data.grades.map((g) => (
            <a key={g.href} href={g.href} className="hv10-tw-grade">{g.label}</a>
          ))}
        </p>

        <ul className="hv10-tw-doors">
          {data.doors.map((d) => (
            <li key={d.key} className="hv10-tw-door">
              <a href={d.href} className="hv10-tw-frame-link" aria-hidden={d.look ? undefined : true} tabIndex={-1}>
                <span className="hv10-work-frame">
                  {d.look ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={d.look.src} width={d.look.width} height={d.look.height} alt={`${d.title}: ${d.look.title}`} loading="lazy" decoding="async" />
                  ) : null}
                </span>
              </a>
              <h3 className="hv10-tw-title"><a href={d.href}>{d.title}</a></h3>
              <p className="hv10-tw-text">{d.text}</p>
            </li>
          ))}
        </ul>

        <div className="hv10-room-ctas">
          <Link href={data.allHref} className="hv10-cta is-primary">{data.allLabel}</Link>
        </div>
      </div>
      <div className="hv10-room-dado" aria-hidden="true" data-bleed />
      <div className="hv10-room-floor" aria-hidden="true" data-bleed />
    </section>
  );
}
