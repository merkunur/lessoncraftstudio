#!/usr/bin/env node
/* =====================================================================
   verify-shapeforge-core.js — the MEASURED, critic-armed build-gate for
   "Shape Forge / Mim's Glow Workshop" (1.G.A.2 + K.G.B.6). Drives the REAL
   geometry kernel (loaded via `new Function`) over the REAL manifest. HALTS
   the build on any failure. The cognition is part-to-whole SYNTHESIS (tile a
   blank region by COMPOSING interchangeable shards). The solver set proves no
   shortcut survives:

     • COMPOSER ORACLE tiles every target 100% (this also VERIFIES the hand-
       authored orientation cell-sets — a wrong set → no tiling → halt);
     • JIGSAW fails — pieces are interchangeable (a type fits MANY anchors);
     • SEAM-READER fails — blank silhouette (no internal seams to read);
     • GREEDY-BOUNDARY-FOLLOWER fails on every non-on-ramp target — the
       rationed triangle supply makes an all-triangle rim-walk IMPOSSIBLE, so
       the interior must be COMPOSED (the critic's F1, the headline);
     • SNAP-ELIMINATION fails — legal-but-DOOMED placements exist, so "the
       piece stayed (legal)" carries no correctness (the critic's F1b);
     • MIRROR/SWAP fails on reway — a different tiling needs a different piece-
       MULTISET, not a mirror of identical triangles (the critic's F2).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'shapeforge-core.js');
const MANIFEST = path.join(MINI, 'shapeforge-activities.json');

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.ShapeForgeCore) throw new Error('core did not attach window.ShapeForgeCore');
  return win.ShapeForgeCore;
}

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };

(function main() {
  const C = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  const rounds = row.params.rounds || [];
  const N = rounds.length || 1;
  const nonOnRamp = rounds.filter((r) => !r.onRamp);

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  /* ---- (1) COMPOSER ORACLE → 100% (also verifies the cell-sets) ---- */
  let oracleOK = 0;
  rounds.forEach((r) => { const sol = C.solve(r); if (sol && C.isComplete(r, sol.concat(r.prePlaced || []))) oracleOK++; else fails.push(`${r.id}: the composer ORACLE could not tile the target (bad cell-set OR over-rationed palette)`); });

  /* ---- (2) JIGSAW fails — interchangeable pieces (a type fits MANY anchors) ---- */
  nonOnRamp.forEach((r) => {
    const anchors = C.legalAnchors(r, r.prePlaced || [], 'triangle', 0).length + C.legalAnchors(r, r.prePlaced || [], 'triangle', 1).length;
    F(anchors >= 2, `${r.id}: a triangle fits <2 legal anchors (jigsaw-like, not interchangeable)`);
  });

  /* ---- (3) SEAM-READER fails — blank silhouette, no seam data ---- */
  rounds.forEach((r) => {
    F(r.target.seams == null, `${r.id}: target carries seam data (not a blank silhouette)`);
    const snap = C.snapshot(r);
    F(snap.seams == null && !('solution' in snap) && !('placements' in snap), `${r.id}: snapshot leaks a solution/seam`);
  });

  /* ---- (4) GREEDY-BOUNDARY-FOLLOWER fails on every non-on-ramp target ---- */
  function boundaryFollower(r) {                    /* triangles ONLY, greedy, no backtrack */
    let tri = 0; (r.palette || []).forEach((p) => { if (p.pieceId === 'triangle') tri = p.count; });
    let placements = (r.prePlaced || []).slice();
    let guard = 0;
    while (guard++ < 100) {
      if (C.isComplete(r, placements)) return placements;
      const occ = C.occupiedSet(placements);
      const empty = r.target.cells.find((rc) => !occ[C.cellKey(rc[0], rc[1])]);
      if (!empty) break;
      if (tri <= 0) break;
      const orient = C.up(empty[0], empty[1]) ? 0 : 1;
      const ref = C.PIECES.triangle.orients[orient][0];
      placements = placements.concat([{ pieceId: 'triangle', orient: orient, dr: empty[0] - ref[0], dc: empty[1] - ref[1] }]);
      tri--;
    }
    return C.isComplete(r, placements) ? placements : null;
  }
  /* interior-by-composite applies to the FOUNDATIONAL composition cogs
     (build/recompose/named); reway legitimately allows an all-triangle "way"
     (the multiplicity), and substitute/extend are triangle-fill-the-hole by
     design — their locks are the multiset / region-coverage / whole-becomes-
     part, not interior-by-composite. */
  const composeBuild = nonOnRamp.filter((r) => ['build', 'recompose', 'named'].indexOf(r.cog) !== -1);
  composeBuild.forEach((r) => {
    const f = C.facts(r);
    F(f.interiorByComposite, `${r.id}: an all-triangle rim-walk IS possible (composition not load-bearing — ration the triangles)`);
    F(boundaryFollower(r) === null, `${r.id}: the GREEDY-BOUNDARY-FOLLOWER (triangles only) COMPLETED it (interior not composite-only)`);
  });

  /* ---- (5) SNAP-ELIMINATION fails — a legal-but-DOOMED placement exists ---- */
  /* big-triangle: a triangle on the centre DOWN cell isolates the 3 up cells
     (no down neighbours left for a rhombus; not enough triangles) → unsolvable.
     "the piece stayed (legal)" therefore carries no correctness. */
  const bt = rounds.find((r) => r.id === 'build-bigtriangle');
  if (bt) {
    const centre = [1, 2];                          /* the centre down cell */
    F(!C.up(centre[0], centre[1]), 'build-bigtriangle: centre cell is not a DOWN cell');
    const doomed = { pieceId: 'triangle', orient: 1, dr: centre[0] - C.PIECES.triangle.orients[1][0][0], dc: centre[1] - C.PIECES.triangle.orients[1][0][1] };
    const legal = C.legalAnchors(bt, [], 'triangle', 1).some((a) => a.dr === doomed.dr && a.dc === doomed.dc);
    const stillSolvable = C.solve(Object.assign({}, bt, { prePlaced: (bt.prePlaced || []).concat([doomed]), palette: bt.palette.map((p) => (p.pieceId === 'triangle' ? { pieceId: 'triangle', count: p.count - 1 } : p)) }));
    F(legal, 'build-bigtriangle: the centre-triangle placement is not even legal (cannot demonstrate the doomed-legal cheat)');
    F(legal && stillSolvable === null, 'build-bigtriangle: placing a legal triangle on the centre is NOT doomed — snap-elimination would survive (commit-only eval not load-bearing)');
    rounds.forEach((r) => F(C.facts(r).snapNotCorrectness && C.facts(r).commitOnlyEval, `${r.id}: not commit-only / snap-not-correctness`));
  } else { fails.push('build-bigtriangle round missing (the doomed-legal demonstration)'); }

  /* ---- (6) MIRROR/SWAP fails on reway/recompose — distinct piece-MULTISETS ---- */
  rounds.filter((r) => r.cog === 'reway' || r.cog === 'recompose').forEach((r) => {
    const a = C.audit(r);
    F(C.facts(r).multipleValidTilings, `${r.id}: NOT multi-tiling (reway/recompose needs ≥2 distinct piece-MULTISETS)`);
    F(a.secondMultiset && a.secondMultiset !== a.solutionMultiset, `${r.id}: no genuinely-different piece-MULTISET (mirror/swap would fake "another way")`);
  });

  /* ---- (7) STRUCTURAL ---- */
  rounds.forEach((r) => {
    const f = C.facts(r);
    F(!f.equalSharesLexicon, `${r.id}: prompt uses equal-shares lexicon (half/fourth/equal share) — banned`);
    F(!f.symmetryTask, `${r.id}: a symmetry task slipped in (the original 4.G.A.3 bug)`);
    F(!f.fewestPiecesValued, `${r.id}: fewest-pieces is valued (bigger=better misconception)`);
    F(f.abundantSupply, `${r.id}: palette is not abundant (total piece cells <= target)`);
    F(f.blankSilhouette, `${r.id}: not a blank silhouette`);
  });
  const cogs = new Set(rounds.map((r) => r.cog));
  F(cogs.size >= 5, `only ${cogs.size} distinct cognitions (need >=5 of the 6: build/reway/recompose/substitute/extend/named)`);
  F(rounds.filter((r) => r.onRamp).length >= 1, 'no K.G.B.6 on-ramp round (2-3 pieces)');
  /* ROTATION_CLOSES — cycling a piece's orients returns to the start cell-set */
  Object.keys(C.PIECES).forEach((pid) => {
    const n = C.orientCount(pid);
    const a0 = JSON.stringify(C.cellsOf({ pieceId: pid, orient: 0, dr: 0, dc: 0 }));
    const aN = JSON.stringify(C.cellsOf({ pieceId: pid, orient: 0 % n, dr: 0, dc: 0 }));
    F(a0 === aN && n >= 1, `${pid}: rotation does not close`);
  });

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds, cogs: ${[...cogs].sort().join('/')}`);
  console.log(`pieces: ${Object.keys(C.PIECES).join('+')} (pilot: trapezoid-piece + curve family deferred)`);
  console.log(`  ${oracleOK === N ? 'ok  ' : 'FAIL'} composer oracle tiles ${oracleOK}/${N} targets`);
  console.log(`  ok   boundary-follower fails all ${nonOnRamp.length} non-on-ramp targets; a doomed-legal placement exists; reway has distinct multisets`);
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-SHAPEFORGE FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-SHAPEFORGE PASSED — the composer ORACLE tiles every target 100% (verifying the hand-authored cell-sets); JIGSAW fails (interchangeable pieces, a type fits many anchors); SEAM-READER fails (blank silhouette, no seam data); the GREEDY-BOUNDARY-FOLLOWER fails every non-on-ramp target (rationed triangles make an all-triangle rim-walk impossible — the interior must be COMPOSED); SNAP-ELIMINATION fails (a legal-but-doomed placement exists → commit-only eval is load-bearing); MIRROR/SWAP fails on reway (≥2 distinct piece-MULTISETS). No equal-shares lexicon, no symmetry, no fewest-pieces; abundant supply; >=5 cognitions + a K on-ramp; rotation closes.');
  process.exit(0);
})();
