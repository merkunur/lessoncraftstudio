/* The Master Machine — the Press Hall's hero apparatus.
 *
 * A drawn press shown mid-demonstration: a blank sheet leaves the ream
 * hopper, rides the bed rail under the stamp (four picture cells pop on as
 * the die dips), the type wheel ratchets the title bar and answer line on,
 * the seal arm presses the coral seal, and the finished worksheet slides to
 * the delivery easel — where two ALREADY-FINISHED real published worksheets
 * stand as proof. The architecture is drawn; the work is real.
 *
 * Authored entirely in cqw inside the .wmk-stage container-query box so it
 * scales rigidly 320→2560 with no transform wrapper (v10 poster law).
 * Geometry + the 13s/9s/19s choreography live in worksheet-makers.css.
 * aria-hidden: it is apparatus, not content — the two real thumbnails on
 * the easel are decorative repetitions of cards below, so they stay hidden
 * from the tree too (empty alt).
 */
export interface MasterMachineProps {
  /** 4 local theme-art webp paths stamped onto the traveling sheet. */
  cellArts: string[];
  /** Up to 2 real deck-thumbnail URLs for the delivery easel (www host). */
  doneThumbs: string[];
}

export default function MasterMachine({ cellArts, doneThumbs }: MasterMachineProps) {
  return (
    <div className="wmk-stage" aria-hidden="true">
      {/* ground + plinth */}
      <div className="wmk-m-ground" />
      <div className="wmk-m-plinth" />

      {/* delivery easel first: behind the arriving sheet */}
      <div className="wmk-m-easel">
        {doneThumbs.slice(0, 2).map((src, i) => (
          <div key={i} className={`wmk-m-done is-${i + 1}`}>
            {/* plain img: decorative, fixed cqw box, no optimizer round-trip */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" decoding="async" />
          </div>
        ))}
        {doneThumbs.length === 0 && (
          <>
            <div className="wmk-m-done is-1"><div className="wmk-m-done-fallback" /></div>
            <div className="wmk-m-done is-2"><div className="wmk-m-done-fallback" /></div>
          </>
        )}
      </div>

      {/* machine frame */}
      <div className="wmk-m-col is-l" />
      <div className="wmk-m-col is-r" />
      <div className="wmk-m-crossbar" />
      <div className="wmk-m-face" />

      {/* flank + face instruments */}
      <div className="wmk-m-fly" />
      <div className="wmk-m-dial">
        <div className="wmk-m-needle" />
      </div>

      {/* working parts over the bed */}
      <div className="wmk-m-wheel" />
      <div className="wmk-m-sealarm" />

      {/* bed + hopper */}
      <div className="wmk-m-bed" />
      <div className="wmk-m-ream is-1" />
      <div className="wmk-m-ream is-2" />
      <div className="wmk-m-ream is-3" />

      {/* the traveling sheet — the worksheet coming into being */}
      <div className="wmk-m-sheet">
        <div className="wmk-m-sheet-title" />
        {cellArts.slice(0, 4).map((art, i) => (
          <div key={i} className={`wmk-m-cell is-${i + 1}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={encodeURI(art)} alt="" loading="lazy" decoding="async" />
          </div>
        ))}
        <div className="wmk-m-sheet-line" />
        <div className="wmk-m-seal" />
      </div>

      {/* the stamp last so its die passes in front of the sheet */}
      <div className="wmk-m-stamp" />
    </div>
  );
}
