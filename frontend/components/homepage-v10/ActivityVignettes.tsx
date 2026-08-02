/* The four activities, in action.

   Hand-authored CSS rather than the 204 preview webps: those are static,
   which fails "animated, in action", and four more raster files would add
   weight to a page whose images are already its heaviest asset. These cost
   zero bytes.

   Each recreates the ONE move its activity is about — the move a child
   actually makes — so the exhibit is honest about the product rather than
   decorative. Geometry and motion live in homepage-v10.css; everything scales
   from a single font-size on the alcove.

   aria-hidden throughout: these are pictures of an activity, and the alcove's
   own link carries the accessible name. */

/* Teen Numbers 11-19 — two ten frames: the first full, the second filling to
   four. Eleven to nineteen is "ten and some more", and two frames say exactly
   that. */
function TenFrame() {
  return (
    <div className="hv10-act-tenframe" aria-hidden="true">
      <div className="hv10-act-frame">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="hv10-act-dot" style={{ ['--i' as string]: i }} />
        ))}
      </div>
      <div className="hv10-act-frame">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className={`hv10-act-dot${i >= 4 ? ' is-empty' : ''}`}
            style={{ ['--i' as string]: 10 + i }}
          />
        ))}
      </div>
    </div>
  );
}

/* Build an Array — a 4x3 rectangle fills row by row while the
   repeated-addition strip writes itself underneath: rows, columns, total. */
function BuildArray() {
  return (
    <div className="hv10-act-array" aria-hidden="true">
      <div className="hv10-act-grid">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="hv10-act-tile"
            style={{ ['--r' as string]: Math.floor(i / 4) }}
          />
        ))}
      </div>
      <div className="hv10-act-sum">
        {[0, 1, 2].map((r) => (
          <span key={r} style={{ ['--r' as string]: r }} />
        ))}
      </div>
    </div>
  );
}

/* Identify the Shape — three shapes, and the one being named lights. The ring
   is its own node so nothing carries two animations. */
function ShapeId() {
  return (
    <div className="hv10-act-shapes" aria-hidden="true">
      <span className="hv10-act-shape is-circle" />
      <span className="hv10-act-shape is-square">
        <span className="hv10-act-ring" />
      </span>
      <span className="hv10-act-shape is-tri" />
    </div>
  );
}

/* Comparing Length — the same thing at two lengths, and the longer one gets
   the mark. No counting: that is precisely what this activity is about. */
function CompareLength() {
  return (
    <div className="hv10-act-length" aria-hidden="true">
      <div className="hv10-act-bar is-long">
        <span className="hv10-act-tick" />
      </div>
      <div className="hv10-act-bar is-short" />
    </div>
  );
}

const REGISTRY = {
  'ten-frame': TenFrame,
  array: BuildArray,
  shape: ShapeId,
  length: CompareLength,
} as const;

export type ActivityVignetteKind = keyof typeof REGISTRY;

export default function ActivityVignette({ kind }: { kind: ActivityVignetteKind }) {
  const V = REGISTRY[kind];
  return <V />;
}
