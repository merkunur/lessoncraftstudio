/**
 * data/fl/roll-parts.js — the parts of Roll and Draw (docs/makers/FLAGSHIP.md): per creature, five rows of six small drawings in a
 * 100 × 100 box, line art only, in the order a child draws them. The page shuffles each row, so New version is a new chart.
 */
'use strict';
const eye = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${r * 0.35}" fill="#141414"/>`;
const dots = (n, y = 50) => Array.from({ length: n }, (_, i) => eye(50 + (i - (n - 1) / 2) * 18, y, 7)).join('');
const eyes = [
  eye(50, 50, 20),
  eye(32, 50, 14) + eye(68, 50, 14),
  eye(24, 58, 11) + eye(50, 40, 11) + eye(76, 58, 11),
  eye(30, 32, 11) + eye(70, 32, 11) + eye(30, 68, 11) + eye(70, 68, 11),
  `<path d="M16 54Q30 34 44 54"/><path d="M56 54Q70 34 84 54"/>`,
  eye(30, 50, 15) + `<path d="M58 52L84 46"/>`,
];
const mouths = [
  `<path d="M22 44Q50 82 78 44"/>`,
  `<path d="M22 44Q50 82 78 44Z"/><path d="M36 50V60M50 52V66M64 50V60"/>`,
  `<ellipse cx="50" cy="52" rx="20" ry="26"/>`,
  `<path d="M18 52L32 40L46 52L60 40L74 52L84 44"/>`,
  `<path d="M26 40Q50 66 74 40Z"/><path d="M42 53Q50 76 58 53"/>`,
  `<path d="M22 50H78"/><path d="M34 50V64L44 50"/><path d="M58 50L66 64V50"/>`,
];
const monsterBody = [
  `<circle cx="50" cy="50" r="38"/>`,
  `<rect x="16" y="14" width="68" height="72" rx="14"/>`,
  `<path d="M50 10L90 86H10Z"/>`,
  `<ellipse cx="50" cy="50" rx="28" ry="42"/>`,
  `<path d="M50 12C80 12 88 40 84 58C80 80 68 88 50 88C32 88 20 80 16 58C12 40 20 12 50 12Z"/>`,
  `<path d="M20 86C8 50 22 12 50 12C78 12 92 50 80 86Q70 74 60 86Q50 74 40 86Q30 74 20 86Z"/>`,
];
const monsterTop = [
  `<path d="M30 80L22 26L46 62"/><path d="M70 80L78 26L54 62"/>`,
  `<path d="M50 80V26"/><circle cx="50" cy="20" r="10"/>`,
  `<path d="M22 78Q30 40 16 28"/><path d="M50 78V22"/><path d="M78 78Q70 40 84 28"/>`,
  `<path d="M20 74Q34 24 50 54Q66 24 80 74"/>`,
  `<path d="M22 72L34 36L46 66L58 36L70 66L80 40"/>`,
  `<path d="M32 76C10 60 18 28 36 40"/><path d="M68 76C90 60 82 28 64 40"/>`,
];
const monsterLegs = [
  `<path d="M36 12V70L24 84H48Z"/><path d="M64 12V70L52 84H76Z"/>`,
  `<path d="M26 12V84"/><path d="M50 12V84"/><path d="M74 12V84"/>`,
  `<path d="M28 14Q10 56 30 84"/><path d="M72 14Q90 56 70 84"/>`,
  `<path d="M32 14V60"/><circle cx="32" cy="74" r="14"/><path d="M68 14V60"/><circle cx="68" cy="74" r="14"/>`,
  `<path d="M20 14V80H36"/><path d="M42 14V80H58"/><path d="M64 14V80H80"/>`,
  `<path d="M36 14Q22 44 42 54T32 86"/><path d="M64 14Q78 44 58 54T68 86"/>`,
];

const robotBody = [
  `<rect x="14" y="20" width="72" height="60" rx="4"/>`,
  `<rect x="24" y="10" width="52" height="80" rx="4"/>`,
  `<rect x="14" y="14" width="72" height="72" rx="22"/>`,
  `<path d="M28 12H72L88 88H12Z"/>`,
  `<circle cx="50" cy="50" r="40"/><path d="M12 50H88"/>`,
  `<path d="M50 8L88 30V70L50 92L12 70V30Z"/>`,
];
const robotTop = [
  `<path d="M50 84V30"/><circle cx="50" cy="20" r="11"/>`,
  `<path d="M34 84L20 30"/><circle cx="18" cy="22" r="8"/><path d="M66 84L80 30"/><circle cx="82" cy="22" r="8"/>`,
  `<path d="M50 84V48"/><path d="M24 48H76"/><path d="M34 36H66"/><path d="M44 24H56"/>`,
  `<rect x="34" y="44" width="32" height="40"/><path d="M50 44V18"/><path d="M38 18H62"/>`,
  `<path d="M50 84V54"/><path d="M50 54C34 30 66 30 50 54"/><circle cx="50" cy="24" r="6"/>`,
  `<path d="M24 84V52H76V84"/><path d="M36 52V34H64V52"/>`,
];
const robotEyes = [
  `<rect x="14" y="34" width="30" height="30"/><rect x="56" y="34" width="30" height="30"/>`,
  eye(32, 50, 16) + eye(68, 50, 16),
  `<rect x="12" y="38" width="76" height="24" rx="12"/><circle cx="50" cy="50" r="7" fill="#141414"/>`,
  `<path d="M16 42H42V62H16Z"/><path d="M16 52H42"/><path d="M58 42H84V62H58Z"/><path d="M58 52H84"/>`,
  `<circle cx="50" cy="50" r="28"/><circle cx="50" cy="50" r="16"/><circle cx="50" cy="50" r="5" fill="#141414"/>`,
  `<path d="M18 40L38 50L18 60Z"/><path d="M82 40L62 50L82 60Z"/>`,
];
const robotMouth = [
  `<rect x="20" y="38" width="60" height="26"/><path d="M35 38V64M50 38V64M65 38V64"/>`,
  `<path d="M20 52H80"/>`,
  `<path d="M16 58L28 42L40 58L52 42L64 58L76 42L84 54"/>`,
  `<circle cx="28" cy="50" r="7"/><circle cx="50" cy="50" r="7"/><circle cx="72" cy="50" r="7"/>`,
  `<rect x="24" y="36" width="52" height="30" rx="15"/><path d="M24 51H76"/>`,
  `<path d="M22 42Q50 74 78 42"/><path d="M22 42H78"/>`,
];
const robotArms = [
  `<path d="M18 16V60"/><path d="M8 60H28V76H8Z"/><path d="M82 16V60"/><path d="M72 60H92V76H72Z"/>`,
  `<path d="M18 16V64"/><path d="M6 80L18 64L30 80"/><path d="M82 16V64"/><path d="M70 80L82 64L94 80"/>`,
  `<path d="M14 18Q30 44 14 74"/><circle cx="14" cy="80" r="9"/><path d="M86 18Q70 44 86 74"/><circle cx="86" cy="80" r="9"/>`,
  `<path d="M20 16L10 40L24 58L12 82"/><path d="M80 16L90 40L76 58L88 82"/>`,
  `<rect x="10" y="16" width="16" height="66"/><path d="M10 38H26M10 60H26"/><rect x="74" y="16" width="16" height="66"/><path d="M74 38H90M74 60H90"/>`,
  `<path d="M18 16V54"/><circle cx="18" cy="68" r="14"/><path d="M18 60V76M10 68H26"/><path d="M82 16V54"/><circle cx="82" cy="68" r="14"/><path d="M82 60V76M74 68H90"/>`,
];

const bugBody = [
  `<ellipse cx="50" cy="50" rx="40" ry="30"/>`,
  `<circle cx="28" cy="50" r="20"/><circle cx="62" cy="50" r="26"/>`,
  `<circle cx="20" cy="50" r="14"/><circle cx="46" cy="50" r="16"/><circle cx="76" cy="50" r="18"/>`,
  `<path d="M10 52C20 16 80 16 90 52Z"/>`,
  `<ellipse cx="50" cy="50" rx="24" ry="42"/>`,
  `<path d="M12 50Q50 2 88 50Q50 98 12 50Z"/>`,
];
const bugWings = [
  `<path d="M50 80C10 80 6 30 30 26C44 24 50 50 50 80Z"/><path d="M50 80C90 80 94 30 70 26C56 24 50 50 50 80Z"/>`,
  `<ellipse cx="28" cy="46" rx="24" ry="14"/><ellipse cx="72" cy="46" rx="24" ry="14"/>`,
  `<path d="M50 50L14 18V50L50 50L14 82V50"/><path d="M50 50L86 18V50L50 50L86 82V50"/>`,
  `<circle cx="26" cy="34" r="18"/><circle cx="74" cy="34" r="18"/><circle cx="32" cy="68" r="12"/><circle cx="68" cy="68" r="12"/>`,
  `<path d="M50 84Q18 62 22 18Q50 40 50 84Z"/><path d="M50 84Q82 62 78 18Q50 40 50 84Z"/>`,
  `<path d="M12 56Q30 20 50 56Q70 20 88 56"/><path d="M12 56Q50 80 88 56"/>`,
];
const bugSpots = [1, 2, 3, 4, 5, 6].map((n) => {
  const P = { 1: [[50, 50]], 2: [[30, 50], [70, 50]], 3: [[26, 66], [50, 32], [74, 66]], 4: [[30, 30], [70, 30], [30, 70], [70, 70]], 5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]], 6: [[28, 22], [72, 22], [28, 50], [72, 50], [28, 78], [72, 78]] }[n];
  return P.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${n > 4 ? 9 : 12}"/>`).join('');
});
const bugFeelers = [
  `<path d="M42 84Q36 40 14 26"/><path d="M58 84Q64 40 86 26"/>`,
  `<path d="M42 84V30"/><circle cx="42" cy="22" r="8"/><path d="M58 84V30"/><circle cx="58" cy="22" r="8"/>`,
  `<path d="M42 84Q20 64 22 40Q24 24 36 30Q44 36 34 44"/><path d="M58 84Q80 64 78 40Q76 24 64 30Q56 36 66 44"/>`,
  `<path d="M42 84L24 56L38 44L20 20"/><path d="M58 84L76 56L62 44L80 20"/>`,
  `<path d="M36 84L18 24"/><path d="M26 54L12 50"/><path d="M64 84L82 24"/><path d="M74 54L88 50"/>`,
  `<path d="M50 84V22"/><path d="M50 40L28 22"/><path d="M50 40L72 22"/>`,
];
const bugLegs = [
  `<path d="M14 26Q30 44 50 44Q70 44 86 26"/><path d="M14 54H86"/><path d="M14 80Q30 62 50 62Q70 62 86 80"/>`,
  `<path d="M10 20L30 40L50 40"/><path d="M90 20L70 40L50 40"/><path d="M10 80L30 60L50 60"/><path d="M90 80L70 60L50 60"/>`,
  `<path d="M16 14V86"/><path d="M38 14V86"/><path d="M62 14V86"/><path d="M84 14V86"/>`,
  `<path d="M12 24L34 48L12 76"/><path d="M88 24L66 48L88 76"/>`,
  `<path d="M12 30Q24 22 30 34T50 34T70 34T88 30"/><path d="M12 70Q24 78 30 66T50 66T70 66T88 70"/>`,
  `<path d="M22 14V52"/><circle cx="22" cy="66" r="12"/><path d="M78 14V52"/><circle cx="78" cy="66" r="12"/>`,
];

const ROLL = {
  monster: [monsterBody, eyes, mouths, monsterTop, monsterLegs],
  robot: [robotBody, robotEyes, robotMouth, robotTop, robotArms],
  bug: [bugBody, eyes, bugFeelers, bugWings, bugSpots],
};
void dots; void bugLegs;
module.exports = { ROLL };
