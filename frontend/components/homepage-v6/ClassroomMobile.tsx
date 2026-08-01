/* ClassroomMobile — the v6.1 hero: a Calder-style kinetic mobile built from
   the product's own apparatus (see the .hv6-mob section of homepage-v6.css
   for the geometry law and motion system).

   Structure (nesting = the transform tree; each node rotates about its knot):

     ceiling thread
     └─ ARM 1 — the number balance IS the top beam (peg-ticks, pivot ring)
        ├─ n1 (long arm, page centerline): the traveler WORKSHEET
        │    + QR gift-tag tied at its knot
        │    + the drop thread the whole page hangs from
        └─ n2 (short arm) → ARM 2 (birch dowel)
             ├─ n3: working mini REKENREK (Y-yoke; beads slide once/cycle)
             └─ n4 → ARM 3 (thin dowel, far plane)
                  ├─ n5: the LEARNING CLOCK (hands advance occasionally)
                  └─ n6: letter tiles "c a t" on a rack shelf

   Decorative (aria-hidden), zero JS, two raster assets total (the traveler
   thumbnail + qr.png); everything else is CSS. Under prefers-reduced-motion
   the sculpture hangs perfectly still, composed. */

interface Props {
  /** The traveler worksheet thumbnail (the same sheet reappears at the
   *  Make / Print / Share moments down the page). */
  travelerThumb: string;
}

function MiniRekenrek() {
  // Rail 1: 3 beads slide once per 21s cycle; rail 2 rests composed at 4.
  const bead = (row: number, i: number) => {
    const isTeal = i >= 5;
    const pushed = row === 0 ? i < 3 : i < 4;
    const cls = ['hv6-rek-bead'];
    if (isTeal) cls.push('is-t');
    if (pushed) cls.push(row === 0 ? 'is-push' : 'is-set');
    return (
      <span
        key={i}
        className={cls.join(' ')}
        style={pushed && row === 0 ? ({ '--i': i, '--wave': 0 } as React.CSSProperties) : undefined}
      />
    );
  };
  return (
    <div className="hv6-mob-obj is-rek">
      <div className="hv6-mob-rrail">{Array.from({ length: 10 }, (_, i) => bead(0, i))}</div>
      <div className="hv6-mob-rrail">{Array.from({ length: 10 }, (_, i) => bead(1, i))}</div>
    </div>
  );
}

function MobClock() {
  return (
    <div className="hv6-mob-obj is-clockbox">
      <div className="hv6-mob-clockscale">
        <div className="hv6-clock">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="hv6-clock-tick" style={{ transform: `rotate(${i * 30}deg)` }} />
          ))}
          <span className="hv6-clock-hand is-hour" />
          <span className="hv6-clock-hand is-min" />
          <span className="hv6-clock-dot" />
        </div>
      </div>
    </div>
  );
}

export default function ClassroomMobile({ travelerThumb }: Props) {
  return (
    <div className="hv6-mob" aria-hidden="true">
      <span className="hv6-mob-thread is-ceiling" />
      <div className="hv6-mob-hang">
        {/* ARM 1 — the number balance as structure */}
        <div className="hv6-mob-arm is-a1">
          <span className="hv6-mob-beam is-main" />

          {/* n1 — the worksheet, on the page centerline */}
          <div className="hv6-mob-node is-n1">
            <span className="hv6-mob-thread" />
            <span className="hv6-mob-tag">
              <img src="/homepage/qr.png" width={40} height={40} alt="" loading="eager" />
            </span>
            <div className="hv6-mob-obj is-sheet">
              <img
                src={travelerThumb}
                width={480}
                height={620}
                alt=""
                loading="eager"
                fetchPriority="low"
              />
              <span className="hv6-mob-drop" />
            </div>
          </div>

          {/* n2 — the cascade */}
          <div className="hv6-mob-node is-n2">
            <span className="hv6-mob-thread" />
            <div className="hv6-mob-arm is-a2">
              <span className="hv6-mob-beam is-dowel" />

              {/* n3 — mini rekenrek */}
              <div className="hv6-mob-node is-n3">
                <span className="hv6-mob-thread" />
                <span className="hv6-mob-yoke" />
                <MiniRekenrek />
              </div>

              {/* n4 → ARM 3 */}
              <div className="hv6-mob-node is-n4">
                <span className="hv6-mob-thread" />
                <div className="hv6-mob-arm is-a3">
                  <span className="hv6-mob-beam is-dowel is-thin" />
                  <div className="hv6-mob-node is-n5">
                    <span className="hv6-mob-thread" />
                    <MobClock />
                  </div>
                  <div className="hv6-mob-node is-n6">
                    <span className="hv6-mob-thread" />
                    <div className="hv6-mob-obj is-word">
                      <span className="hv6-mob-rack" />
                      <span className="hv6-mob-tile">c</span>
                      <span className="hv6-mob-tile">a</span>
                      <span className="hv6-mob-tile">t</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
