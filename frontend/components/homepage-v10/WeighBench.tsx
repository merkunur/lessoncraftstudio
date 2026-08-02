/* The weight bench — measurement-bench in weight mode, as a working
   instrument for the hero plinths.

   The real tool says "Tap cubes onto the pan until the scale balances", so
   that is exactly what this does: the beam sits tipped under the apple, three
   cubes arrive one at a time on the other pan, and it comes level.

   It stands beside the number balance, which is also a beam. They are told
   apart the way the real tools are: this one weighs a recognisable OBJECT
   against a growing stack of cubes, and has a flatter dish. At ~110px on a
   plinth the apple is what makes it legible.

   Authored entirely in cqw so it scales with the poster with no transform
   wrapper and no pixel keyframes. Geometry + motion live in
   homepage-v10.css. aria-hidden: it is apparatus, not content. */
export default function WeighBench() {
  return (
    <div className="hv10-weigh" aria-hidden="true">
      <div className="hv10-weigh-beam">
        <div className="hv10-weigh-pan is-l">
          <span className="hv10-weigh-obj" />
        </div>
        <div className="hv10-weigh-pan is-r">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="hv10-weigh-cube"
              style={{ ['--i' as string]: i }}
            />
          ))}
        </div>
      </div>
      <div className="hv10-weigh-post" />
      <div className="hv10-weigh-foot" />
    </div>
  );
}
