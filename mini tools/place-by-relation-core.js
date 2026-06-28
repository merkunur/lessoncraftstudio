/* =====================================================================
   CORE — Place-by-Relation  (place-by-relation-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL positional-language cognition (the spec's
   `engine-place-by-relation.js`). First skin: "Bramble's Parking Tower" —
   CCSS K.G.A.1 (above / below / beside / next-to / between). A side-on
   parking tower; a position WORD names a relation to a landmark; the child
   parks a vehicle in the bay that matches. The relation is PRE-RESOLVED at
   authoring → runtime is geometry-free id-matching (no UI geometry math):
   isCorrect = round.targetSpotIds.includes(tappedId).

   The board always carries ≥1 confusable-sibling near-miss bay, so the WORD
   is the only discriminator — a non-grammatical guesser (nearest / topmost /
   bottommost / center) must NOT reliably win (the build-gate proves it).

   Grid model: cols × levels (level 1 = ground, higher = up). A cell is
   `L<level>C<col>`. Pure functions, no DOM (mirrors ordering-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  function cellId(level, col) { return 'L' + level + 'C' + col; }

  /* ---- the round pool (EN pilot). Each scene: landmarks (vehicles parked,
     not tappable) + candidates (the tappable targets — dashed BAYS for a
     place round, or TRUCKS for a reverse round) + an optional mover. The
     correct candidate(s) live in targetSpotIds; nearMiss notes the sibling. ---- */
  var ROUNDS = [
    /* Band A — adjacency: park NEXT TO the bus. target = same level, beside.
       foils: the above-bay (sibling) + a far ground bay (so "bottommost" ties). */
    {
      id: 'next-to-bus', band: 1, relation: 'next-to', experience: 'adjacency', termRef: ['bus'],
      scene: {
        cols: 3, levels: 2, mover: { vehicle: 'truck', label: 'truck' },
        landmarks: [{ id: 'bus', vehicle: 'bus', col: 1, level: 1, label: 'bus' }],
        candidates: [
          { id: cellId(1, 2), col: 2, level: 1, kind: 'bay' },
          { id: cellId(2, 1), col: 1, level: 2, kind: 'bay' },
          { id: cellId(1, 3), col: 3, level: 1, kind: 'bay' }
        ]
      },
      targetSpotIds: [cellId(1, 2)], nearMiss: { 'L2C1': 'above' }
    },
    /* Band A — vertical up: park ABOVE the van. foils: two ground bays beside
       (so "bottommost" picks a non-target). */
    {
      id: 'above-van', band: 1, relation: 'above', experience: 'vertical', termRef: ['van'],
      scene: {
        cols: 3, levels: 2, mover: { vehicle: 'truck', label: 'truck' },
        landmarks: [{ id: 'van', vehicle: 'van', col: 2, level: 1, label: 'van' }],
        candidates: [
          { id: cellId(2, 2), col: 2, level: 2, kind: 'bay' },
          { id: cellId(1, 1), col: 1, level: 1, kind: 'bay' },
          { id: cellId(1, 3), col: 3, level: 1, kind: 'bay' }
        ]
      },
      targetSpotIds: [cellId(2, 2)], nearMiss: { 'L1C1': 'next-to' }
    },
    /* Band A — vertical down: park BELOW the car. foils: two top bays beside
       (so "topmost" picks a non-target). */
    {
      id: 'below-car', band: 1, relation: 'below', experience: 'vertical', termRef: ['car'],
      scene: {
        cols: 3, levels: 2, mover: { vehicle: 'truck', label: 'truck' },
        landmarks: [{ id: 'car', vehicle: 'car', col: 2, level: 2, label: 'car' }],
        candidates: [
          { id: cellId(1, 2), col: 2, level: 1, kind: 'bay' },
          { id: cellId(2, 1), col: 1, level: 2, kind: 'bay' },
          { id: cellId(2, 3), col: 3, level: 2, kind: 'bay' }
        ]
      },
      targetSpotIds: [cellId(1, 2)], nearMiss: { 'L2C1': 'next-to' }
    },
    /* Band B — between: park BETWEEN the bus and the van (same level gap).
       foil: the bay above the gap (sibling 'above'). */
    {
      id: 'between-bus-van', band: 2, relation: 'between', experience: 'between', termRef: ['bus', 'van'],
      scene: {
        cols: 3, levels: 2, mover: { vehicle: 'truck', label: 'truck' },
        landmarks: [
          { id: 'bus', vehicle: 'bus', col: 1, level: 1, label: 'bus' },
          { id: 'van', vehicle: 'van', col: 3, level: 1, label: 'van' }
        ],
        candidates: [
          { id: cellId(1, 2), col: 2, level: 1, kind: 'bay' },
          { id: cellId(2, 2), col: 2, level: 2, kind: 'bay' },
          { id: cellId(2, 1), col: 1, level: 2, kind: 'bay' }
        ]
      },
      targetSpotIds: [cellId(1, 2)], nearMiss: { 'L2C2': 'above' }
    },
    /* Band B — transfer: NEXT TO the boat, in a new dock scene (proves the term,
       not the scene). next-to = either side; the above-bay is the near-miss. */
    {
      id: 'transfer-boat', band: 2, relation: 'next-to', experience: 'transfer', termRef: ['boat'],
      scene: {
        cols: 3, levels: 2, mover: { vehicle: 'truck', label: 'truck' }, theme: 'dock',
        landmarks: [{ id: 'boat', vehicle: 'boat', col: 2, level: 1, label: 'boat' }],
        candidates: [
          { id: cellId(1, 1), col: 1, level: 1, kind: 'bay' },
          { id: cellId(1, 3), col: 3, level: 1, kind: 'bay' },
          { id: cellId(2, 2), col: 2, level: 2, kind: 'bay' }
        ]
      },
      targetSpotIds: [cellId(1, 1), cellId(1, 3)], nearMiss: { 'L2C2': 'above' }
    },
    /* Band C — reverse: "Bramble parked ABOVE the bus — tap his truck." The
       candidates are TRUCKS; tap the one above the bus. */
    {
      id: 'reverse-above', band: 3, relation: 'above', experience: 'reverse', termRef: ['bus'], reverse: true,
      scene: {
        cols: 3, levels: 2,
        landmarks: [{ id: 'bus', vehicle: 'bus', col: 1, level: 1, label: 'bus' }],
        candidates: [
          { id: cellId(2, 1), col: 1, level: 2, kind: 'truck', vehicle: 'truck' },
          { id: cellId(1, 2), col: 2, level: 1, kind: 'truck', vehicle: 'truck' },
          { id: cellId(2, 3), col: 3, level: 2, kind: 'truck', vehicle: 'truck' }
        ]
      },
      targetSpotIds: [cellId(2, 1)], nearMiss: { 'L1C2': 'next-to' }
    },
    /* Band C — two-truck: park BETWEEN your two parked trucks (persistence). */
    {
      id: 'two-truck-between', band: 3, relation: 'between', experience: 'two-truck', termRef: ['tk1', 'tk2'],
      scene: {
        cols: 3, levels: 2, mover: { vehicle: 'car', label: 'car' },
        landmarks: [
          { id: 'tk1', vehicle: 'truck', col: 1, level: 1, label: 'truck' },
          { id: 'tk2', vehicle: 'truck', col: 3, level: 1, label: 'truck' }
        ],
        candidates: [
          { id: cellId(1, 2), col: 2, level: 1, kind: 'bay' },
          { id: cellId(2, 2), col: 2, level: 2, kind: 'bay' },
          { id: cellId(2, 3), col: 3, level: 2, kind: 'bay' }
        ]
      },
      targetSpotIds: [cellId(1, 2)], nearMiss: { 'L2C2': 'above' }
    }
  ];

  /* ---- runtime: geometry-FREE id match ---- */
  function isCorrect(round, tappedId) { return round.targetSpotIds.indexOf(tappedId) >= 0; }

  /* ---- helpers ---- */
  function landmark(round, id) { return round.scene.landmarks.filter(function (l) { return l.id === id; })[0]; }
  function candAt(round, col, level) { return round.scene.candidates.filter(function (c) { return c.col === col && c.level === level; })[0]; }
  function termL(round, i) { return landmark(round, round.termRef[i]); }

  /* INDEPENDENT geometry re-derive of the correct candidate id(s) from the
     relation + landmark grid positions (the gate compares this to the author's
     targetSpotIds — author can't lie about which bay is "above"). */
  function deriveTargets(round) {
    var s = round.scene, out = [];
    if (round.relation === 'above') { var a = termL(round, 0); var c = candAt(round, a.col, a.level + 1); if (c) out.push(c.id); }
    else if (round.relation === 'below') { var b = termL(round, 0); var d = candAt(round, b.col, b.level - 1); if (d) out.push(d.id); }
    else if (round.relation === 'next-to') {
      var n = termL(round, 0);
      [n.col - 1, n.col + 1].forEach(function (col) { var e = candAt(round, col, n.level); if (e) out.push(e.id); });
    } else if (round.relation === 'between') {
      var p = termL(round, 0), q = termL(round, 1);
      if (p.level === q.level) {
        var lo = Math.min(p.col, q.col), hi = Math.max(p.col, q.col);
        if (hi - lo >= 2) for (var col = lo + 1; col < hi; col++) { var f = candAt(round, col, p.level); if (f) out.push(f.id); }
      }
    }
    return out;
  }

  /* ---- non-grammatical heuristic solvers (each returns a candidate id, or
     null when AMBIGUOUS/tied — a tie is not a reliable win). bays only for
     place rounds; for reverse the candidates are the tappable trucks. ---- */
  function bays(round) { return round.scene.candidates; }
  function uniqueExtreme(list, score, dir) {
    var best = null, bestV = dir > 0 ? -Infinity : Infinity, tie = false;
    list.forEach(function (c) { var v = score(c); if ((dir > 0 && v > bestV) || (dir < 0 && v < bestV)) { bestV = v; best = c; tie = false; } else if (v === bestV) tie = true; });
    return tie ? null : (best ? best.id : null);
  }
  var HEURISTICS = {
    topmost: function (round) { return uniqueExtreme(bays(round), function (c) { return c.level; }, +1); },
    bottommost: function (round) { return uniqueExtreme(bays(round), function (c) { return c.level; }, -1); },
    nearestLandmark: function (round) {
      var l = termL(round, 0); if (!l) return null;
      return uniqueExtreme(bays(round), function (c) { return -(Math.abs(c.col - l.col) + Math.abs(c.level - l.level)); }, +1);
    },
    centerMost: function (round) {
      var center = (round.scene.cols + 1) / 2;
      return uniqueExtreme(bays(round), function (c) { return -Math.abs(c.col - center); }, +1);
    }
  };

  function buildRounds() { return ROUNDS.map(function (r) { return JSON.parse(JSON.stringify(r)); }); }

  global.PlaceByRelationCore = {
    ROUNDS: ROUNDS,
    buildRounds: buildRounds,
    isCorrect: isCorrect,
    deriveTargets: deriveTargets,
    HEURISTICS: HEURISTICS,
    cellId: cellId,
    landmark: landmark
  };

}(typeof window !== 'undefined' ? window : this));
