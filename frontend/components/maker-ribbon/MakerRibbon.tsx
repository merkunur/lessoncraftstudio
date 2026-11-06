/* The band that sends a topic page's visitors to the makers. Same mat, same words and same place in the reading order as
 * the static version on the worksheet landings and decks (scripts/lib/maker-links.js). An exercise-type topic gets its one
 * maker; a theme or a grade gets a shelf of three. Both link to the landing pages, and to the hub. */
import './maker-ribbon.css';
import Link from 'next/link';
import { makerForExerciseType, ribbonMaker, ribbonStrings, shelfMakers, RibbonMaker } from '@/lib/makers/ribbon';

export interface TopicAxis { axis: string; axisKey: string }

async function makersFor(locale: string, axes: TopicAxis[]): Promise<{ single: RibbonMaker | null; shelf: RibbonMaker[] }> {
  const type = axes.find((a) => a.axis === 'exercise-type');
  if (type) {
    const id = makerForExerciseType(type.axisKey);
    const m = id ? await ribbonMaker(id, locale) : null;
    if (m) return { single: m, shelf: [] };
  }
  const first = axes.find((a) => a.axis !== 'exercise-type') ?? axes[0];
  const ids = shelfMakers(first.axis === 'exercise-type' ? 'theme' : first.axis, first.axisKey, locale);
  const shelf = (await Promise.all(ids.map((id) => ribbonMaker(id, locale)))).filter((m): m is RibbonMaker => !!m);
  return { single: null, shelf };
}

export default async function MakerRibbon({ locale, axes }: { locale: string; axes: TopicAxis[] }) {
  const s = ribbonStrings(locale);
  const { single, shelf } = await makersFor(locale, axes);
  const hub = `/${locale}/worksheet-makers`;
  return (
    <aside className="mrb" aria-label={s.aria}>
      {single ? (
        <Link className="mrb-link" href={single.href}>
          <img src={single.image} alt="" width={264} height={152} loading="lazy" decoding="async" />
          <span className="mrb-text"><strong>{single.kw}</strong><span>{s.topicLine}</span></span>
          <span className="mrb-cta">{s.cta}</span>
        </Link>
      ) : (
        <div className="mrb-shelf">
          <div className="mrb-shelf-head"><strong>{s.shelfTitle}</strong><span>{s.shelfBody}</span></div>
          <ul>
            {shelf.map((m) => (
              <li key={m.id}>
                <Link href={m.href}>
                  <img src={m.image} alt="" width={264} height={152} loading="lazy" decoding="async" />
                  <span>{m.kw}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link className="mrb-all" href={hub}>{s.all}</Link>
    </aside>
  );
}
