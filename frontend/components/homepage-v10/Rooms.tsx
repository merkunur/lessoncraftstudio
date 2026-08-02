import Link from 'next/link';
import LiveToolEmbedV10 from '@/components/homepage-v6/LiveToolEmbedV6';
import type { ShowcaseDeck } from '@/lib/showcase-decks';

/* ───────────────────────────────────────────────────────────────────────────
   THE ROOMS — homepage v10 "The Gallery of Lessons".

   Past the hall the building continues. Every room wears the same fabric:
   cornice above, panelled dado and oak floor below, drawn by the shared
   primitives in homepage-v10.css. Wall colour alternates the way a real
   gallery's rooms do, so scrolling reads as walking rather than as a stack
   of marketing bands.

   The gallery is drawn; the art is real. Every frame holds a published
   worksheet and every pedestal carries an actual apparatus render.
   ─────────────────────────────────────────────────────────────────────── */

type Wall = 'green' | 'terracotta' | 'light';

const WALLS: Record<Wall, React.CSSProperties> = {
  green: {},
  terracotta: {
    ['--room-wall' as string]: '#8E4630',
    ['--room-wall-lit' as string]: '#A2543B',
    ['--room-wall-deep' as string]: '#733526',
  },
  light: {},
};

function Room({
  id,
  wall,
  floor = true,
  children,
}: {
  id: string;
  wall: Wall;
  floor?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`hv10-room${wall === 'light' ? ' is-light' : ''}${floor ? '' : ' no-floor'}`}
      style={WALLS[wall]}
    >
      <div className="hv10-room-cornice" aria-hidden="true" data-bleed />
      <div className="hv10-room-inner">{children}</div>
      <div className="hv10-room-dado" aria-hidden="true" data-bleed />
      {floor && <div className="hv10-room-floor" aria-hidden="true" data-bleed />}
    </section>
  );
}

/* Tilts are tiny and fixed per index — a salon hang is never dead level, but
   a random tilt per render would fight the ISR cache. */
const TILTS = ['-1.1deg', '0.8deg', '-0.6deg', '1.2deg', '-0.9deg', '0.5deg'];

/* Deck.title is a per-locale map typed `unknown` (a JSON column), so it is
   read through the same accessor the v6 page uses rather than rendered
   directly — and it falls back to the slug, never to an empty alt on a link. */
function titleFor(deck: ShowcaseDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

/* ── ROOM I — The Instrument Hall ──────────────────────────────────────────
   The teaching tools, standing as objects. These are the real apparatus
   renders at /mini-tools/tool-previews/<key>.webp — flat-vector drawings of
   the actual instruments, which is why nothing had to be illustrated for
   them. NOTE: those files are gitignored and reach production by scp to
   /var/www/lcs-media/mini-tools/, not by git (§20.4). */
export type InstrumentCard = { key: string; name: string; note: string };

export function InstrumentHall({
  locale,
  strings,
  instruments,
  live,
}: {
  locale: string;
  strings: RoomStrings;
  instruments: InstrumentCard[];
  live: { src: string; name: string; previewUrl: string; ctaLabel: string; note: string; liveTag: string };
}) {
  return (
    <Room id="instruments" wall="terracotta">
      <p className="hv10-room-label" aria-hidden="true">I</p>
      <h2 className="hv10-room-h2">{strings.instrumentsH2}</h2>
      <p className="hv10-room-body">{strings.instrumentsBody}</p>

      {/* The sculpture bench. Each column is a two-row grid whose first row
          is a fixed height, so the exhibits share a baseline and the labels
          share a top BY CONSTRUCTION — the previous version let each caption
          set its own column's height, which is what made the row ragged.
          The slab is one element spanning the whole bench. */}
      {/* ⚠ --bench-n is NOT set inline. An inline custom property beats every
          media query in the stylesheet, so setting it here pinned the bench to
          four columns at 320px and the labels overflowed their ~66px columns.
          The column count is the stylesheet's job. */}
      <div className="hv10-bench">
        {instruments.map((t) => (
          <div key={t.key} className="hv10-stand">
            <div className="hv10-stand-art">
              <img
                src={`/mini-tools/tool-previews/${t.key}.webp`}
                alt=""
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Name only. The tagline is a full sentence and belongs in prose;
                on a museum label it varied the box height 2.3x and dragged the
                whole row out of alignment. */}
            <span className="hv10-stand-plaque">{t.name}</span>
          </div>
        ))}
        <div className="hv10-bench-slab" aria-hidden="true" />
      </div>

      {/* THE SIGNATURE. In a gallery nothing may be touched; here one piece
          on the floor works under your hand. Click-gated on purpose —
          ActivityIframe meters a play on MOUNT, so auto-mounting would burn
          one of every anonymous visitor's daily plays on page load. */}
      <div className="hv10-touch">
        <LiveToolEmbedV10 {...live} />
      </div>

      <div className="hv10-room-ctas">
        <Link href={`/${locale}/tools`} className="hv10-cta is-primary">
          {strings.instrumentsCta}
        </Link>
      </div>
    </Room>
  );
}

/* ── ROOM II — The Print Room ──────────────────────────────────────────────
   The library, hung salon-style. This is the room where density is safe:
   unlike the hall, it can reflow, so it holds as many works as the width
   allows. */
export function PrintRoom({
  locale,
  decks,
  strings,
}: {
  locale: string;
  decks: ShowcaseDeck[];
  strings: RoomStrings;
}) {
  return (
    <Room id="printroom" wall="green" floor={false}>
      <p className="hv10-room-label" aria-hidden="true">II</p>
      <h2 className="hv10-room-h2">{strings.printH2}</h2>
      <p className="hv10-room-body">{strings.printBody}</p>

      <div className="hv10-hang">
        {decks.slice(0, 12).map((d, i) => (
          <a
            key={d.id}
            className="hv10-work"
            href={`https://www.lessoncraftstudio.com/${d.language}/decks/${d.slug}/`}
            style={{ ['--tilt' as string]: TILTS[i % TILTS.length] }}
          >
            <img
              src={d.thumbnailUrl}
              alt={titleFor(d)}
              width={480}
              height={620}
              loading="lazy"
              decoding="async"
            />
          </a>
        ))}
      </div>

      <div className="hv10-room-ctas">
        <Link href={`/${locale}/worksheets/`} className="hv10-cta is-primary">
          {strings.printCta}
        </Link>
        <Link href={`/${locale}/activities`} className="hv10-cta is-ghost">
          {strings.activitiesCta}
        </Link>
      </div>
    </Room>
  );
}

/* ── ROOM III — The Studio ─────────────────────────────────────────────────
   Where the work is made. The maker screenshot is committed art at
   /homepage/maker.webp, with per-locale re-renders alongside it. */
export function Studio({ locale, strings }: { locale: string; strings: RoomStrings }) {
  const dir = locale === 'en' ? '' : `${locale}/`;
  return (
    <Room id="studio" wall="light">
      <p className="hv10-room-label" aria-hidden="true">III</p>
      <h2 className="hv10-room-h2">{strings.studioH2}</h2>
      <p className="hv10-room-body">{strings.studioBody}</p>

      <div className="hv10-studio">
        <figure className="hv10-workbench">
          <img
            src={`/homepage/${dir}maker.webp`}
            alt={strings.studioMakerAlt}
            width={1200}
            height={760}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="hv10-outputs">
          <figure className="hv10-output">
            <img
              src={`/homepage/${dir}interactive-play.webp`}
              alt=""
              width={760}
              height={959}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{strings.studioPlay}</figcaption>
          </figure>
          <figure className="hv10-output">
            <img
              src={`/homepage/${dir}interactive-celebrate.webp`}
              alt=""
              width={900}
              height={577}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{strings.studioPrint}</figcaption>
          </figure>
        </div>
      </div>

      <div className="hv10-room-ctas">
        <Link href={`/${locale}/worksheet-creators`} className="hv10-cta is-primary">
          {strings.studioCta}
        </Link>
      </div>
    </Room>
  );
}

/* ── ROOM IV — The Members' Room ───────────────────────────────────────────
   ⚠ TIER TRUTH. These claims are about code behaviour, so they come from
   frontend/lib/quota.ts (PLAYS_PER_DAY = 10, DOWNLOADS_PER_MONTH = 3,
   anonymous downloads = 0) and the price from SUBSCRIPTION_PRODUCT. Never
   hardcode a price and never exceed the pricing page. */
export function MembersRoom({ locale, strings }: { locale: string; strings: RoomStrings }) {
  return (
    <Room id="plans" wall="green" floor={false}>
      <p className="hv10-room-label" aria-hidden="true">IV</p>
      <h2 className="hv10-room-h2">{strings.plansH2}</h2>
      <p className="hv10-room-body">{strings.plansBody}</p>

      <div className="hv10-plans">
        <div className="hv10-plan">
          <h3>{strings.freeTitle}</h3>
          <p className="hv10-plan-price">{strings.freePrice}</p>
          <ul>
            {strings.freeItems.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <Link href={`/${locale}/auth/signup`} className="hv10-cta is-ghost">
            {strings.freeCta}
          </Link>
        </div>
        <div className="hv10-plan is-teacher">
          <h3>{strings.teacherTitle}</h3>
          <p className="hv10-plan-price">{strings.teacherPrice}</p>
          <ul>
            {strings.teacherItems.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <Link href={`/${locale}/pricing`} className="hv10-cta is-primary">
            {strings.teacherCta}
          </Link>
        </div>
      </div>
    </Room>
  );
}

/* ── THE EXIT ──────────────────────────────────────────────────────────────
   The close, and the catalogue at the back of the building. */
export function Exit({ locale, strings }: { locale: string; strings: RoomStrings }) {
  return (
    <Room id="close" wall="terracotta">
      <div className="hv10-exit">
        <h2 className="hv10-room-h2">{strings.closeH2}</h2>
        <p className="hv10-room-body">{strings.closeBody}</p>
        <div className="hv10-room-ctas">
          <Link href={`/${locale}/tools`} className="hv10-cta is-primary">
            {strings.closeCtaPrimary}
          </Link>
          <Link href={`/${locale}/worksheets/`} className="hv10-cta is-ghost">
            {strings.closeCtaSecondary}
          </Link>
        </div>
      </div>
    </Room>
  );
}

export type RoomStrings = {
  instrumentsH2: string;
  instrumentsBody: string;
  instrumentsCta: string;
  printH2: string;
  printBody: string;
  printCta: string;
  activitiesCta: string;
  studioH2: string;
  studioBody: string;
  studioMakerAlt: string;
  studioPlay: string;
  studioPrint: string;
  studioCta: string;
  plansH2: string;
  plansBody: string;
  freeTitle: string;
  freePrice: string;
  teacherPrice: string;
  freeItems: string[];
  freeCta: string;
  teacherTitle: string;
  teacherItems: string[];
  teacherCta: string;
  closeH2: string;
  closeBody: string;
  closeCtaPrimary: string;
  closeCtaSecondary: string;
};
