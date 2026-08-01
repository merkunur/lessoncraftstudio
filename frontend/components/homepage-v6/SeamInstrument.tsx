/* SeamInstrument (v9) — a small working machine running ON the seam
   between two bands: the beetle walks its arrow strip, the thermometer
   column rises, the ten-frame fills. Desktop-only accents (hidden < lg),
   ≤96px tall, aria-hidden, no text, no i18n. Server component, zero JS.

   Containment: the beetle's walk distance derives from the strip's OWN
   width via container query (the rekenrek law) — it cannot escape at any
   viewport. */

export type SeamVariant = 'beetle' | 'thermometer' | 'ten-frame';

function Beetle() {
  return (
    <div className="hv9-strip">
      <span className="hv9-trail" />
      <span className="hv9-beetle" />
    </div>
  );
}

function Thermometer() {
  return (
    <div className="hv9-therm">
      <span className="hv9-therm-tube">
        <span className="hv9-therm-col" />
      </span>
      <span className="hv9-therm-ticks" />
      <span className="hv9-therm-bulb" />
    </div>
  );
}

function TenFrame() {
  return (
    <div className="hv9-tenframe">
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className="hv9-tf-cell">
          <span
            className={`hv9-tf-dot${i < 7 ? ' is-fill' : ''}`}
            style={i < 7 ? ({ '--i': i } as React.CSSProperties) : undefined}
          />
        </span>
      ))}
    </div>
  );
}

const SEAMS: Record<SeamVariant, () => JSX.Element> = {
  beetle: Beetle,
  thermometer: Thermometer,
  'ten-frame': TenFrame,
};

export default function SeamInstrument({ variant }: { variant: SeamVariant }) {
  const V = SEAMS[variant];
  return (
    <div
      className="hv9-seam relative z-[2] -mb-8 mt-10 hidden lg:flex justify-center"
      aria-hidden="true"
    >
      <V />
    </div>
  );
}
