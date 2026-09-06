import Link from 'next/link';
import Image from 'next/image';
import LiveToolEmbedV10 from '@/components/homepage-v6/LiveToolEmbedV6';
import EmbedCopy from '@/components/homepage-v10/EmbedCopy';
import ActivityVignette from '@/components/homepage-v10/ActivityVignettes';
import { titleFor, type RoomStrings as RoomStringsV10, type AlcoveCard } from '@/components/homepage-v10/Rooms';
import FrontOfRoom, { type EaselPanel } from '@/components/homepage-v11/FrontOfRoom';
import ExitShelf, { type ShelfItem } from '@/components/homepage-v11/ExitShelf';
import Slip from '@/components/homepage-v11/Slip';
import type { ShowcaseDeck } from '@/lib/showcase-decks';

export { titleFor };
export type { AlcoveCard };

/* ───────────────────────────────────────────────────────────────────────────
   THE ROOMS — homepage v11 "The Gallery of Lessons, walked through".

   Same building as v10 (cornice above, panelled dado below, the same wall
   colours in the same order, the same six numerals), but the visitor now
   WALKS it: Room I is a sticky easel the instruments take turns on; Room II
   hangs its works in three depths that move at different rates under the
   wheel; Room III's exhibits play once as you arrive and again under your
   hand; Room IV's two outputs slide out from behind the maker; Room V sends
   one worksheet to twenty-five small screens, once; the exit puts the hero's
   four instruments on a shelf by the door, still running.

   The oak floor now shows only under the hero and at the exit. Between the
   rooms the dado meets the next cornice directly — a real gallery's rooms
   open into each other; four identical floor strips were the most repeated
   thing on the v10 page.

   ⚠ The numerals are HARDCODED per room (audit-room-order.js reads them in
   order): I instruments · II printroom · III activities · IV studio · V share
   · VI plans · unnumbered close. Reordering means editing the literals.

   i18n: nothing new. Every string is an existing native key; the ones v10
   never rendered (the v6 pen-notes, the four promises, the monthly price) are
   listed on RoomStrings below as optional so both routes stay in step.
   ─────────────────────────────────────────────────────────────────────── */

export type RoomStrings = RoomStringsV10 & {
  /* v6 pen-notes and trust lines, native ×11, unrendered since v10. */
  penBalance?: string;
  paperTraveler?: string;
  shareTraveler?: string;
  shareClock?: string;
  forkLabel?: string;
  promises?: string[];
  reassure?: string;
  teacherMonthly?: string;
  playAlt?: string;
  printAlt?: string;
  /** Alt text for the traveller's frame at the exit (the deck title). */
  travellerAlt?: string;
};

export type InstrumentCard = EaselPanel;

type Wall = 'green' | 'terracotta' | 'light' | 'ochre';

const WALLS: Record<Wall, React.CSSProperties> = {
  green: {},
  terracotta: {
    ['--room-wall' as string]: '#8E4630',
    ['--room-wall-lit' as string]: '#A2543B',
    ['--room-wall-deep' as string]: '#733526',
  },
  light: {},
  ochre: {},
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
      className={
        `hv10-room${wall === 'light' ? ' is-light' : ''}` +
        `${wall === 'ochre' ? ' is-ochre' : ''}${floor ? '' : ' no-floor'}`
      }
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

/* ── ROOM I — The front of the room ───────────────────────────────────────
   Left: the easel (FrontOfRoom — four sticky panels, each a working
   instrument). Right: the room's words, sticky beside it on desktop so the
   sentence stays while the instruments change. Below both: the touchable
   rekenrek, click-gated exactly as before (ActivityIframe meters a play on
   MOUNT; auto-mounting would burn one of every visitor's daily plays). */
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
  const panels = instruments.map((p, i) => (i === 0 && strings.penBalance ? { ...p, slip: strings.penBalance } : p));
  return (
    <Room id="instruments" wall="terracotta" floor={false}>
      <p className="hv10-room-label" aria-hidden="true">I</p>
      <div className="hv11-front">
        <div className="hv11-front-text">
          <h2 className="hv10-room-h2">{strings.instrumentsH2}</h2>
          <p className="hv10-room-body">{strings.instrumentsBody}</p>
          <div className="hv10-room-ctas">
            <Link href={`/${locale}/tools`} className="hv10-cta is-primary">
              {strings.instrumentsCta}
            </Link>
          </div>
        </div>
        <div className="hv11-easel-col">
          <FrontOfRoom panels={panels} />
          {/* THE SIGNATURE. In a gallery nothing may be touched; here the last
              piece on the easel works under your hand. Click-gated on purpose. */}
          <div className="hv10-touch">
            <LiveToolEmbedV10 {...live} />
          </div>
        </div>
      </div>
    </Room>
  );
}

/* ── ROOM II — The Wall ──────────────────────────────────────────────────
   Fifteen real works hung in THREE DEPTHS — a row of small frames high on
   the wall, three large works at eye level, six medium below — and the three
   planes move at different rates as the visitor walks past (homepage-v11.css).
   The traveller (the worksheet from the hero's fourth frame) is the first
   large work and carries its pen-note: "still the same sheet".

   All fifteen anchors are in the HTML at every width (the crawl floor reads
   the raw HTML); the phone bands hide the last three of the mid and far rows
   with display:none — off the a11y tree and the tab order together, exactly
   as v10's wall did. */
export function PrintRoom({
  locale,
  decks,
  traveller,
  strings,
}: {
  locale: string;
  decks: ShowcaseDeck[];
  traveller?: ShowcaseDeck;
  strings: RoomStrings;
}) {
  /* 15 works: the traveller + 14 from the wall slice. If the traveller is
     missing (no decks at all) the wall simply takes 15 of its own. */
  const pool = traveller ? [traveller, ...decks.filter((d) => d.id !== traveller.id)] : decks;
  const works = pool.slice(0, 15);
  const near = works.slice(0, 3);
  const mid = works.slice(3, 9);
  const far = works.slice(9, 15);
  const tile = (d: ShowcaseDeck, i: number, sizes: string, withSlip = false) => (
    <a
      key={d.id}
      className="hv10-work"
      href={`https://www.lessoncraftstudio.com/${d.language}/decks/${d.slug}/`}
      style={{ ['--tilt' as string]: TILTS[i % TILTS.length] }}
    >
      <Image src={d.thumbnailUrl} alt={titleFor(d)} width={480} height={620} sizes={sizes} quality={72} />
      {withSlip && strings.paperTraveler ? <Slip text={strings.paperTraveler} className="hv11-work-slip" /> : null}
    </a>
  );
  return (
    <Room id="printroom" wall="green" floor={false}>
      <p className="hv10-room-label" aria-hidden="true">II</p>
      <h2 className="hv10-room-h2">{strings.printH2}</h2>
      <p className="hv10-room-body">{strings.printBody}</p>

      <div className="hv11-wall" data-scrub data-enter>
        <div className="hv11-plane is-far">
          {far.map((d, i) => tile(d, i + 9, '(max-width: 879px) 30vw, 150px'))}
        </div>
        <div className="hv11-plane is-near">
          {near.map((d, i) => tile(d, i, '(max-width: 879px) 30vw, 300px', i === 0 && !!traveller))}
        </div>
        <div className="hv11-plane is-mid">
          {mid.map((d, i) => tile(d, i + 3, '(max-width: 879px) 30vw, 180px'))}
        </div>
      </div>

      <div className="hv10-room-ctas">
        <Link href={`/${locale}/worksheets`} className="hv10-cta is-primary">
          {strings.printCta}
        </Link>
        <Link href={`/${locale}/activities`} className="hv10-cta is-ghost">
          {strings.activitiesCta}
        </Link>
      </div>
    </Room>
  );
}

/* ── ROOM III — The Playroom ─────────────────────────────────────────────
   Same four lit alcoves. Each now plays its one move ONCE as the visitor
   arrives (data-enter → .is-in) and again under the pointer or keyboard
   focus; the perpetual loops are retired in the stylesheet so the wall of
   worksheets above and the studio below each keep one dominant motion. */
export function Playroom({
  locale,
  strings,
  activities,
}: {
  locale: string;
  strings: RoomStrings;
  activities: AlcoveCard[];
}) {
  return (
    <Room id="activities" wall="ochre" floor={false}>
      <p className="hv10-room-label" aria-hidden="true">III</p>
      <h2 className="hv10-room-h2">{strings.playH2}</h2>
      <p className="hv10-room-body">{strings.playBody}</p>

      <div className="hv10-alcoves">
        {activities.map((a) => (
          <a key={a.id} className="hv10-alcove" href={`/${locale}/activities/${a.slug}`} data-enter>
            <span className="hv10-alcove-art">
              <ActivityVignette kind={a.kind} />
            </span>
            <span className="hv10-alcove-plaque">
              {a.title}
              <span className="hv10-alcove-grade">{a.grade}</span>
            </span>
          </a>
        ))}
      </div>

      <div className="hv10-room-ctas">
        <Link href={`/${locale}/activities`} className="hv10-cta is-primary">
          {strings.playCta}
        </Link>
      </div>
    </Room>
  );
}

/* ── ROOM IV — The Studio ────────────────────────────────────────────────
   The maker on its bench; its two finished outputs start tucked behind it
   and slide out as the visitor scrolls — "one build, two outputs" enacted,
   with the v6 label of that name over the pair. */
export function Studio({ locale, strings }: { locale: string; strings: RoomStrings }) {
  const dir = locale === 'en' ? '' : `${locale}/`;
  return (
    <Room id="studio" wall="light" floor={false}>
      <p className="hv10-room-label" aria-hidden="true">IV</p>
      <h2 className="hv10-room-h2">{strings.studioH2}</h2>
      <p className="hv10-room-body">{strings.studioBody}</p>

      <div className="hv10-studio" data-enter>
        <figure className="hv10-workbench">
          <Image
            src={`/homepage/${dir}maker.webp`}
            alt={strings.studioMakerAlt}
            width={1200}
            height={760}
            sizes="(max-width: 900px) 100vw, 700px"
            quality={76}
          />
        </figure>
        <div className="hv10-outputs">
          {strings.forkLabel ? <p className="hv11-fork-label">{strings.forkLabel}</p> : null}
          <figure className="hv10-output" data-scrub data-enter>
            <Image
              src={`/homepage/${dir}interactive-play.webp`}
              alt={strings.playAlt || ''}
              width={760}
              height={959}
              sizes="(max-width: 900px) 50vw, 340px"
              quality={76}
            />
            <figcaption>{strings.studioPlay}</figcaption>
          </figure>
          <figure className="hv10-output" data-scrub data-enter>
            <Image
              src={`/homepage/${dir}interactive-celebrate.webp`}
              alt={strings.printAlt || ''}
              width={900}
              height={577}
              sizes="(max-width: 900px) 50vw, 340px"
              quality={76}
            />
            <figcaption>{strings.studioPrint}</figcaption>
          </figure>
        </div>
      </div>

      <div className="hv10-room-ctas">
        <Link href={`/${locale}/worksheet-makers`} className="hv10-cta is-primary">
          {strings.studioCta}
        </Link>
      </div>
    </Room>
  );
}

/* ── ROOM VI — The Members' Room ────────────────────────────────────────
   ⚠ TIER TRUTH. Quotas from frontend/lib/quota.ts (10 plays/day, 3 PDF
   downloads/month), prices from SUBSCRIPTION_PRODUCT — both interpolated,
   never typed. Nothing in this room animates. v11 adds three lines v6 had
   already authored natively: the monthly price under the yearly one, the
   "no card · one plan · cancel anytime" reassurance, and the four promises. */
export function MembersRoom({ locale, strings }: { locale: string; strings: RoomStrings }) {
  return (
    <Room id="plans" wall="green" floor={false}>
      <p className="hv10-room-label" aria-hidden="true">VI</p>
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
          <p className="hv10-plan-price">
            {strings.teacherPrice}
            {strings.teacherMonthly ? <span> {strings.teacherMonthly}</span> : null}
          </p>
          <ul>
            {strings.teacherItems.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <Link href={`/${locale}/pricing`} className="hv10-cta is-primary">
            {strings.teacherCta}
          </Link>
          {strings.reassure ? <p className="hv11-reassure">{strings.reassure}</p> : null}
        </div>
      </div>

      {strings.promises && strings.promises.length ? (
        <ul className="hv11-promises">
          {strings.promises.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      ) : null}
    </Room>
  );
}

/* ── ROOM V — The Dispatch: the peak ────────────────────────────────────
   One worksheet leaves the building. The arc draws, the code lands, and
   twenty-five small screens light up one after another in about a second —
   ONCE, as the visitor arrives (data-enter → .is-in), not on a loop. The
   sheet is the traveller and carries its pen-note. Chips, the Teacher-plan
   tag and the Loan Label below are exactly as v10 built them.

   ⚠ TIER TRUTH: durable share links are subscriber-gated (the plan tag);
   embedding is free and unmetered (the Free stamp). The two must not read
   as one offer. */
export function Dispatch({
  locale,
  strings,
  deck,
  embed,
}: {
  locale: string;
  strings: RoomStrings;
  deck?: ShowcaseDeck;
  embed?: { snippet: string };
}) {
  return (
    <Room id="share" wall="terracotta" floor={false}>
      <p className="hv10-room-label" aria-hidden="true">V</p>
      <h2 className="hv10-room-h2">{strings.shareH2}</h2>
      <p className="hv10-room-body">{strings.shareBody}</p>

      <div className="hv10-dispatch" data-enter>
        <div className="hv11-dispatch-sheetwrap">
          <div className="hv10-dispatch-sheet">
            {deck ? (
              <Image src={deck.thumbnailUrl} alt="" width={480} height={620} sizes="180px" quality={72} />
            ) : null}
          </div>
          {strings.shareTraveler ? <Slip text={strings.shareTraveler} className="hv11-dispatch-slip" /> : null}
        </div>
        <div className="hv10-dispatch-arc" aria-hidden="true" />
        <div className="hv10-dispatch-code">
          <span className="hv10-dispatch-card">
            {/* Deliberately a plain <img>, NOT next/image: a QR code depends on
                hard black/white edges. It is 3KB. */}
            <img src="/homepage/qr.png" alt={strings.shareQrAlt} width={360} height={360} loading="lazy" decoding="async" />
          </span>
        </div>
        {/* the class: twenty-five small screens, lit in sequence */}
        <span className="hv11-screens" aria-hidden="true">
          {Array.from({ length: 25 }, (_, i) => (
            <i
              key={i}
              className="hv11-screen"
              style={{
                ['--i' as string]: i,
                ...(deck ? { backgroundImage: `url("${deck.thumbnailUrl}")` } : {}),
              }}
            />
          ))}
        </span>
      </div>

      <div className="hv10-dispatch-chips">
        {strings.shareChips.map((c) => (
          <span key={c} className="hv10-chip">{c}</span>
        ))}
        {/* the Teacher-plan tag rides the same row, in the action colour so
            it still reads as the tier, not as a fifth chip */}
        <span className="hv10-plan-tag">{strings.planTag}</span>
      </div>

      {embed ? (
        <section className="hv10-loan" data-enter>
          <div className="hv10-loan-head">
            <h3 className="hv10-loan-h">
              <span className="hv10-loan-h-a">{strings.embedHeadA}</span>
              <span className="hv10-loan-h-b">{strings.embedHeadB}</span>
            </h3>
            <span className="hv10-loan-stamp">{strings.freeTitle}</span>
          </div>

          <div className="hv10-loan-grid">
            <div className="hv10-loan-back">
              <div className="hv10-loan-label">
                <EmbedCopy
                  snippet={embed.snippet}
                  caption={strings.embedCaption}
                  copyLabel={strings.embedCopy}
                  copiedLabel={strings.embedCopied}
                />
              </div>
            </div>

            <div className="hv10-loan-site" aria-hidden="true">
              <div className="hv10-loan-browser">
                <div className="hv10-loan-chrome">
                  <i /><i /><i />
                  <span className="hv10-loan-addr" />
                </div>
                <div className="hv10-loan-page">
                  <span className="hv10-loan-rule is-mid" />
                  <span className="hv10-loan-rule is-short" />
                  <div className="hv10-loan-well">
                    <span className="hv10-loan-slot" />
                    <span className="hv10-loan-live">
                      {deck ? (
                        <Image
                          src={deck.thumbnailUrl}
                          alt=""
                          width={480}
                          height={620}
                          sizes="(max-width: 940px) 88vw, 420px"
                          quality={72}
                        />
                      ) : null}
                    </span>
                  </div>
                  <span className="hv10-loan-rule is-mid" />
                  <span className="hv10-loan-rule is-short" />
                </div>
              </div>
            </div>
          </div>

          <ul className="hv10-loan-facts">
            <li>{strings.embedFact1}</li>
            <li>{strings.embedFact2}</li>
          </ul>
        </section>
      ) : null}
    </Room>
  );
}

/* ── THE EXIT ──────────────────────────────────────────────────────────────
   The shelf by the door (the hero's four instruments, running, and the
   traveller), then the close. Keeps its floor: this is where the walk ends. */
export function Exit({
  locale,
  strings,
  shelf,
  traveller,
}: {
  locale: string;
  strings: RoomStrings;
  shelf: ShelfItem[];
  traveller?: ShowcaseDeck;
}) {
  return (
    <Room id="close" wall="terracotta">
      <ExitShelf
        items={shelf}
        traveller={traveller}
        travellerNote={strings.shareClock || ''}
        travellerAlt={strings.travellerAlt || ''}
      />
      <div className="hv10-exit">
        <h2 className="hv10-room-h2">{strings.closeH2}</h2>
        <p className="hv10-room-body">{strings.closeBody}</p>
        <div className="hv10-room-ctas">
          <Link href={`/${locale}/tools`} className="hv10-cta is-primary">
            {strings.closeCtaPrimary}
          </Link>
          <Link href={`/${locale}/worksheets`} className="hv10-cta is-ghost">
            {strings.closeCtaSecondary}
          </Link>
        </div>
      </div>
    </Room>
  );
}
