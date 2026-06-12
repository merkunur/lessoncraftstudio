/**
 * clock — analog clock-face primitive (SVG) at an arbitrary time.
 * params: { h, m, size=150 }
 * Hour hand gets the proportional offset (h + m/60); minute ticks; the 12
 * numerals in Baloo. meta carries both hand angles for QA.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, circle, el, label } = require('./_svg.js');

function clock({ h, m, size = 150 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  if (h < 0 || h > 12 || m < 0 || m > 59) throw new Error(`clock: invalid time ${h}:${m}`);
  const c = size / 2;
  const rFace = c - 4;
  const parts = [
    circle({ cx: c, cy: c, r: rFace, fill: t.color.white, strokeColor: t.color.teal, strokeWidth: 4 }),
  ];

  // minute ticks (long at hours)
  for (let k = 0; k < 60; k++) {
    const a = (k / 60) * 2 * Math.PI - Math.PI / 2;
    const isHour = k % 5 === 0;
    const r1 = rFace - (isHour ? 9 : 5);
    parts.push(el('line', {
      x1: c + Math.cos(a) * r1, y1: c + Math.sin(a) * r1,
      x2: c + Math.cos(a) * (rFace - 2), y2: c + Math.sin(a) * (rFace - 2),
      stroke: t.color.teal, 'stroke-width': isHour ? 2.5 : 1, 'stroke-linecap': 'round',
    }));
  }
  // numerals
  for (let k = 1; k <= 12; k++) {
    const a = (k / 12) * 2 * Math.PI - Math.PI / 2;
    const rNum = rFace - size * 0.155;
    parts.push(label({
      x: c + Math.cos(a) * rNum, y: c + Math.sin(a) * rNum, text: k,
      size: Math.round(size * 0.115), color: t.color.ink, fontFamily: t.font.display, weight: 700,
    }));
  }

  // hands: hour with proportional offset, minute to the exact tick
  const hourAngle = (((h % 12) + m / 60) / 12) * 360;
  const minuteAngle = (m / 60) * 360;
  const hand = (angleDeg, len, w, color, name) => {
    const a = (angleDeg - 90) * Math.PI / 180;
    return el('line', {
      x1: c, y1: c, x2: c + Math.cos(a) * len, y2: c + Math.sin(a) * len,
      stroke: color, 'stroke-width': w, 'stroke-linecap': 'round',
      [`data-lcs-${name}`]: angleDeg.toFixed(1),
    });
  };
  parts.push(hand(hourAngle, rFace * 0.48, 6, t.color.ink, 'hourhand'));
  parts.push(hand(minuteAngle, rFace * 0.72, 4.5, t.color.coral, 'minutehand'));
  parts.push(circle({ cx: c, cy: c, r: 5.5, fill: t.color.teal }));

  return {
    svg: svgRoot({ width: size, height: size, label: `clock showing ${h}:${String(m).padStart(2, '0')}` },
      parts.join(''), { 'data-lcs-prim': 'clock', 'data-lcs-h': h, 'data-lcs-m': m }),
    meta: { h, m, hourAngle, minuteAngle },
    width: size,
    height: size,
  };
}

module.exports = clock;
