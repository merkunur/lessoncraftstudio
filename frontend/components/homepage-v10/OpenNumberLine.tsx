/* The open number line — as a working instrument for the hero plinths.

   The real tool (mini tools/open-number-line.js) is an empty axis with a
   marker you press and drag: each drag DRAWS A JUMP as a half-ellipse arc
   above the line, and the landing number is derived rather than typed. Its
   own header puts it best — "47 + 25 becomes +10, +10, +5 landing on 72 —
   the strategy, not the answer."

   So the action here is the jumps arriving: three arcs draw themselves left
   to right while the marker hops along the axis and comes to rest on the
   landing. That is the whole instrument, and it is legible at ~110px because
   an arc over a line is a shape, not a detail.

   No numerals: at plinth scale a "+10" label would be about four pixels tall,
   and the arcs carry the meaning on their own.

   Authored entirely in cqw so it scales with the poster with no transform
   wrapper and no pixel keyframes. Geometry + motion live in
   homepage-v10.css. aria-hidden: it is apparatus, not content. */
export default function OpenNumberLine() {
  return (
    <div className="hv10-onl" aria-hidden="true">
      {/* the two long jumps and the short one that lands it */}
      {[0, 1, 2].map((i) => (
        <span key={i} className={`hv10-onl-arc is-a${i + 1}`} style={{ ['--i' as string]: i }} />
      ))}
      <span className="hv10-onl-axis" />
      <span className="hv10-onl-tip" />
      <span className="hv10-onl-dot" />
    </div>
  );
}
