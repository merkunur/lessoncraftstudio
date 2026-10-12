/**
 * data/hmx/settings.js — the SETTINGS of the Maze Puzzles Level Set scenes (2026-10-12): where a scene happens.
 *
 * A setting returns the drawn part of a scene — sky band (+ drawn motifs), ground colour and patches, road material,
 * island decor, ground texture — for one of three looks:
 *   SET.<name>({ v, flip, flat, band })
 *     v     0 | 1 | 2   a variant (time of day / season / palette), so two scenes in one setting never look alike
 *     flip  mirror the band motifs left-right
 *     flat  no sky band (label faces, strip faces: the maze fills the frame); the scene stays recognisable by its
 *           ground, decor and texture
 *     band  band height when not flat (default 76)
 * Colours are the library's own palette (sampled from the colour drawings). A road colour must stay > 36 from every
 * scenery colour (lib/hm-scene.js refuses the scene otherwise); the road materials below were chosen so.
 */
'use strict';

const ROAD = {
  sand: { fill: '#FBF1D6', edge: '#B89A5E', outline: 3.5 },
  cream: { fill: '#FFF5DC', edge: '#B08A45', outline: 3.5 },
  stone: { fill: '#EFEAE2', edge: '#9E968A', outline: 3.5 },
  gravel: { fill: '#F4EDE2', edge: '#A79C8E', outline: 3.5 },
  snow: { fill: '#FFFFFF', edge: '#8FB3CB', outline: 3.5 },
  ice: { fill: '#EAF7FC', edge: '#6FA6C4', outline: 3.5 },
  cloud: { fill: '#FFFFFF', edge: '#9DB8D8', outline: 3.5 },
  moss: { fill: '#F2F8E4', edge: '#5E8F4A', outline: 3.5 },
  plank: { fill: '#F6E2BC', edge: '#A9783F', outline: 3.5 },
  water: { fill: '#D3EEF8', edge: '#5FA9C8', outline: 4 },
  candy: { fill: '#FFF4F7', edge: '#E5A2BA', outline: 3.5 },
  star: { fill: '#FFF8E6', edge: '#C8B98A', outline: 3.5 },
  shell: { fill: '#FFF8EE', edge: '#B98B5E', outline: 3.5 },
  pale: { fill: '#FBF7EE', edge: '#A88C6A', outline: 3.5 },
  lilac: { fill: '#FAF5FF', edge: '#9C86C4', outline: 3.5 },
  straw: { fill: '#FCEBC4', edge: '#B98A4A', outline: 3.5 },
};

const HILLS = [[[-40, 300, 30], [330, 720, 24]], [[-30, 240, 22], [200, 520, 28], [470, 720, 20]], [[-40, 380, 26], [400, 720, 32]]];
const mx = (x, flip) => (flip ? 675 - x : x);
/** band motifs with x mirrored when flip */
function M(list, flip) { return list.map((m) => { const o = { ...m }; if (o.x != null) o.x = mx(o.x, flip); if (flip && o.peaks) o.peaks = o.peaks.map(([x, w, h]) => [mx(x, true), w, h]); if (flip && o.list) o.list = o.list.map(([a, b, h]) => [mx(b, true), mx(a, true), h]); if (flip && o.pts) o.pts = o.pts.map(([x, y, s]) => [mx(x, true), y, s]); if (flip && o.x0 != null && o.x1 != null) { const a = mx(o.x1, true), b = mx(o.x0, true); o.x0 = a; o.x1 = b; } return o; }); }
function hills(i, flip) { return HILLS[i % 3].map(([a, b, h]) => (flip ? [mx(b, true), mx(a, true), h] : [a, b, h])); }

/** build a scene look from its parts; `flat` drops the sky band and its motifs */
function look(o, opt) {
  const flat = !!opt.flat; const bh = opt.band || 76;
  return {
    band: flat ? { h: opt.bandH || 8, sky: o.field, hill: o.field } : { h: bh, sky: o.sky, hill: o.hill, hills: o.hills },
    ...(flat ? {} : { motifs: o.motifs || [] }),
    field: o.field, corridor: o.road,
    ...(o.patches ? { patches: o.patches } : {}),
    decor: (o.decor || []).concat(flat && o.flatDecor ? o.flatDecor : []),
    ...(o.decorPal ? { decorPal: o.decorPal } : {}),
    texture: o.texture,
  };
}

const SET = {
  meadow({ v = 0, flip, ...opt } = {}) {
    const P = [
      { sky: '#D4ECF7', hill: '#A8D27E', field: '#BFE08E', patch: '#B2D782', tuft: ['#A2CB74', '#94BE66'] },
      { sky: '#F6C8A4', hill: '#B9D58A', field: '#C9E39A', patch: '#BCD98E', tuft: ['#ABCB7E', '#9DBE70'] },
      { sky: '#C9DCE8', hill: '#9CC877', field: '#B4DA88', patch: '#A7D07C', tuft: ['#98C26C', '#8AB65F'] },
    ][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v, flip), field: P.field, road: ROAD.sand,
      motifs: M([v === 1 ? { k: 'sun', x: 580, y: 50, r: 22, col: '#F7B65A' } : { k: 'sun', x: 600, y: 28, r: 16 }, { k: 'cloud', x: 120, y: 26, s: 0.9 }, { k: 'cloud', x: 360, y: 18, s: 0.7 }, { k: 'birds', pts: [[250, 30, 1], [280, 22, 0.8]] }], flip),
      patches: { n: 8, col: P.patch, r: [50, 90], key: 'meadow' + v }, decor: [{ k: 'bush', n: 2 }, { k: 'flowerbed', n: 1 }],
      texture: { n: 26, gap: 40, kinds: ['tuft', 'tuft', 'dot'], colours: { tuft: P.tuft, dot: ['#FFFFFF', '#F6D45E'] } } }, opt);
  },
  farmyard({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#CFE6F2', hill: '#B9D58A', field: '#E9D89A', tex: ['#D9C47E', '#CDB46E'] }, { sky: '#F5C8A6', hill: '#C2D48C', field: '#EDD9A0', tex: ['#DCC483', '#D0B574'] }, { sky: '#C8DCE6', hill: '#A9CF85', field: '#E2D497', tex: ['#D3C07A', '#C6B06A'] }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 1, flip), field: P.field, road: ROAD.sand,
      motifs: M([{ k: 'sun', x: 90, y: 30, r: 15 }, { k: 'cloud', x: 520, y: 24, s: 0.8 }, { k: 'fence', near: true }], flip),
      decor: [{ k: 'hay', n: 2 }, { k: 'puddle', n: 1, pal: { water: '#9CC7DE' } }], texture: { n: 22, gap: 44, kinds: ['tuft', 'dot'], colours: { tuft: P.tex, dot: ['#B48A5E'] } } }, opt);
  },
  orchard({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#D8EEF6', hill: '#A3CF7B', field: '#B8DC8A' }, { sky: '#F6C9A3', hill: '#B3D07F', field: '#C3DE92' }, { sky: '#C8E2D2', hill: '#9AC674', field: '#B0D684' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 2, flip), field: P.field, road: ROAD.cream,
      motifs: M([{ k: 'sun', x: 610, y: 30, r: 15 }, { k: 'treeline', near: true, col: '#6FA85A', h: 34, key: 'or' + v }], flip),
      patches: { n: 7, col: '#ABD57F', r: [50, 90], key: 'orchard' + v }, decor: [{ k: 'leafpile', n: 1, pal: { leaves: ['#E6574A', '#F2A65A', '#8CC063'] } }, { k: 'stump', n: 1 }],
      texture: { n: 26, gap: 40, kinds: ['tuft', 'leaf'], colours: { tuft: ['#9FC872', '#92BC66'], leaf: ['#7DB463', '#E05A4A'] } } }, opt);
  },
  garden({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#C6E6F4', hill: '#9FCC74', field: '#B5D98C', bed: '#9C6E4A' }, { sky: '#F7CDA9', hill: '#ADD37E', field: '#C1DE95', bed: '#A57751' }, { sky: '#CBD8E6', hill: '#97C66F', field: '#ACD483', bed: '#946847' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v, flip), field: P.field, road: ROAD.sand,
      motifs: M([{ k: 'sun', x: 120, y: 32, r: 15 }, { k: 'cloud', x: 450, y: 26, s: 0.85 }, { k: 'fence', near: true }], flip),
      decor: [{ k: 'flowerbed', n: 2 }, { k: 'bush', n: 1, pal: { bush: '#6FA85A' } }], texture: { n: 24, gap: 40, kinds: ['tuft', 'dot'], colours: { tuft: ['#9CC76F', '#8EBB63'], dot: [P.bed] } } }, opt);
  },
  park({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#D6EEFA', hill: '#9BCB79', field: '#B3DB8B' }, { sky: '#F5D9EE', hill: '#A9CF82', field: '#BEDD93' }, { sky: '#E3EBF2', hill: '#93C371', field: '#A9D383' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 1, flip), field: P.field, road: ROAD.plank,
      motifs: M([{ k: 'skyline', x0: 380, x1: 680, key: 'pk' + v, cols: ['#CFC3D9', '#BFD1DE', '#C9B9A6'] }, { k: 'cloud', x: 90, y: 22, s: 0.8 }, { k: 'treeline', near: true, x1: 360, col: '#76AF5E', h: 30, key: 'pt' + v }], flip),
      decor: [{ k: 'pond', n: 1 }, { k: 'bush', n: 2 }], texture: { n: 24, gap: 42, kinds: ['tuft', 'dot'], colours: { tuft: ['#9CC872', '#8DBC66'], dot: ['#F29BB4', '#FFFFFF'] } } }, opt);
  },
  pond({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#D9EEF5', hill: '#8FC27A', field: '#A9D58B', water: '#86C3DC' }, { sky: '#F6DDF0', hill: '#9CC680', field: '#B4D994', water: '#8CC4D9' }, { sky: '#E0E8EC', hill: '#86BA72', field: '#A0CF84', water: '#7FBBD4' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 2, flip), field: P.field, road: ROAD.plank,
      motifs: M([{ k: 'sun', x: 560, y: 30, r: 14 }, { k: 'treeline', near: true, col: '#6CA65A', kind: 'round', h: 32, key: 'pd' + v }], flip),
      decor: [{ k: 'pond', n: 2, pal: { water: P.water } }, { k: 'reeds', n: 3 }], texture: { n: 22, gap: 40, kinds: ['tuft', 'tuft'], colours: { tuft: ['#8FC174', '#7FB466'] } } }, opt);
  },
  forest({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#BFDDE8', hill: '#7FB26A', field: '#9DC97F', tree: '#5E9A55' }, { sky: '#F2C59E', hill: '#8CB873', field: '#A8CF88', tree: '#6AA15A' }, { sky: '#BCCCD2', hill: '#76AA64', field: '#94C37A', tree: '#558F4E' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v, flip), field: P.field, road: ROAD.moss,
      motifs: M([{ k: 'treeline', col: P.tree, kind: 'pine', h: 40, step: 26, key: 'fo' + v }, { k: 'treeline', near: true, col: '#7AB168', kind: 'round', h: 30, x0: -10, x1: 300, key: 'fn' + v }], flip),
      decor: [{ k: 'stump', n: 1 }, { k: 'fern', n: 2 }, { k: 'rock', n: 1, pal: { rock: '#AFA99E' } }], texture: { n: 26, gap: 38, kinds: ['leaf', 'tuft'], colours: { leaf: ['#7AB066', '#679F57'], tuft: ['#88BB71', '#76AD62'] } } }, opt);
  },
  autumn({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#BFDCEB', hill: '#D9A35C', field: '#E6C98A', tree: '#E0864A' }, { sky: '#B9C6CF', hill: '#C99657', field: '#DDC284', tree: '#D2703F' }, { sky: '#F4BE95', hill: '#E0AE68', field: '#EBD194', tree: '#E8994E' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 1, flip), field: P.field, road: ROAD.straw,
      motifs: M([{ k: 'treeline', col: P.tree, h: 36, step: 30, key: 'au' + v, trunk: '#8A5A3B' }, { k: 'cloud', x: 120, y: 18, s: 0.7 }], flip),
      decor: [{ k: 'leafpile', n: 2 }, { k: 'stump', n: 1 }], texture: { n: 28, gap: 38, kinds: ['leaf', 'leaf', 'tuft'], colours: { leaf: ['#E2793F', '#D9A13F', '#C95C3A'], tuft: ['#CDB070', '#C2A462'] } } }, opt);
  },
  jungle({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#BFE3D2', hill: '#4F8F55', field: '#86BE77' }, { sky: '#C3E3C0', hill: '#5A9A5B', field: '#90C47E' }, { sky: '#B7DCCF', hill: '#468650', field: '#7DB771' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 2, flip), field: P.field, road: ROAD.moss,
      motifs: M([{ k: 'treeline', col: '#3F7F4C', h: 44, step: 24, key: 'ju' + v }, { k: 'birds', pts: [[520, 18, 0.8]] }], flip),
      decor: [{ k: 'fern', n: 3, pal: { leaf: '#4F8F55' } }, { k: 'pond', n: 1, pal: { water: '#79B9C9' } }], texture: { n: 26, gap: 38, kinds: ['leaf', 'leaf', 'tuft'], colours: { leaf: ['#6FAF66', '#5A9654'], tuft: ['#79B56C', '#5A9654'] } } }, opt);
  },
  savanna({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#FCE6C2', hill: '#D9B271', field: '#E7C98D', sun: '#F28C4B' }, { sky: '#D9ECF2', hill: '#CDA96A', field: '#E3C486', sun: '#FFD55A' }, { sky: '#F8D7B8', hill: '#D2A462', field: '#EBCF97', sun: '#F06A3C' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v, flip), field: P.field, road: ROAD.shell,
      motifs: M([{ k: 'sun', x: 520, y: 44, r: 22, col: P.sun, rays: v === 1 }, { k: 'birds', pts: [[160, 26, 1], [190, 18, 0.8], [210, 30, 0.7]] }], flip),
      decor: [{ k: 'rocks', n: 1, pal: { rock: '#B9A486' } }, { k: 'tuftbig', n: 3, pal: { leaf: '#BC9A58' } }], texture: { n: 24, gap: 42, kinds: ['tuft', 'pebble'], colours: { tuft: ['#C9A764', '#B8955A'], pebble: ['#D3B07A', '#C9A06A'] } } }, opt);
  },
  desert({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#C2E2F0', dune: '#E9C27E', field: '#F1D49B' }, { sky: '#FBDDBF', dune: '#E8B675', field: '#F2D39A' }, { sky: '#D2CCE2', dune: '#DFB674', field: '#EDCF95' }][v];
    return look({ sky: P.sky, hill: P.dune, hills: [], field: P.field, road: ROAD.pale,
      motifs: M([{ k: 'sun', x: 110, y: 32, r: 18, col: '#FFC94F' }, { k: 'dunes', col: P.dune, list: [[-40, 260, 22], [200, 520, 28], [460, 720, 20]] }], flip),
      decor: [{ k: 'cactus', n: 2, pal: { ground: '#E3C185' } }, { k: 'rocks', n: 1, pal: { rock: '#C9A882' } }], texture: { n: 22, gap: 44, kinds: ['pebble', 'dot'], colours: { pebble: ['#DDB77E', '#D3AC72'], dot: ['#C9A06A'] } } }, opt);
  },
  beach({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#CFEAF6', sea: '#6FB7D6', field: '#F3DDA6' }, { sky: '#F4C2A0', sea: '#7DB9D2', field: '#F4DEAA' }, { sky: '#C6E2EE', sea: '#5FA8C8', field: '#EFD79D' }][v];
    return look({ sky: P.sky, hill: P.field, hills: [], field: P.field, road: { fill: '#FFF6DF', edge: '#C7A46C', outline: 3.5 },
      motifs: M([{ k: 'sun', x: 600, y: 22, r: 13 }, { k: 'sea', y: 46, col: P.sea, crest: '#BFE3F0' }], flip),
      decor: [{ k: 'shells', n: 2 }, { k: 'rock', n: 1, pal: { rock: '#B4A99A' } }], texture: { n: 24, gap: 42, kinds: ['pebble', 'dot'], colours: { pebble: ['#E3C891', '#DDBF86'], dot: ['#D9B97C'] } } }, opt);
  },
  snow({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#B7CFE6', hill: '#D4E3F0', field: '#CFE0EE' }, { sky: '#D3BEDC', hill: '#D3D6EA', field: '#D8D9EA' }, { sky: '#AFC8E2', hill: '#D1E0EE', field: '#C6DAEB' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v, flip), field: P.field, road: { fill: '#FFFFFF', edge: '#7FA6C4', outline: 3.5 },
      motifs: M([{ k: 'mountains', peaks: [[150, 150, 54], [300, 120, 40]], col: '#9DB3CC', snow: '#D9E6F1' }, { k: 'treeline', near: true, kind: 'pine', col: '#4F8A6A', h: 34, x0: 420, x1: 700, key: 'sn' + v }], flip),
      decor: [{ k: 'drift', n: 2, pal: { snow: '#D9E7F2', shade: '#B9CEE0' } }, { k: 'rock', n: 1, pal: { rock: '#9FA7B0' } }], texture: { n: 22, gap: 44, kinds: ['dot'], colours: { dot: ['#B3C9DC', '#A9C1D6'] } } }, opt);
  },
  arctic({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#BFD9EC', sea: '#5E9FC0', field: '#D7E8F2' }, { sky: '#2E3F6E', sea: '#3F6F95', field: '#C9DCEA' }, { sky: '#BCD3E6', sea: '#6AA9C7', field: '#D3E4F0' }][v];
    return look({ sky: P.sky, hill: P.field, hills: [], field: P.field, road: { fill: '#FFFFFF', edge: '#86AFCB', outline: 3.5 },
      motifs: M(v === 1 ? [{ k: 'aurora', y: 16 }, { k: 'stars', n: 10, y1: 30, key: 'ar' }, { k: 'sea', y: 50, col: P.sea, crest: '#9CC4DA' }] : [{ k: 'sun', x: 590, y: 26, r: 13, col: '#FFE48A' }, { k: 'mountains', peaks: [[180, 180, 40], [420, 140, 30]], col: '#CADDEB', snow: null }, { k: 'sea', y: 52, col: P.sea, crest: '#CFE6F2' }], flip),
      decor: [{ k: 'iceblock', n: 2, pal: { ice: '#CFE2EF', iceShade: '#A9C8DD' } }], texture: { n: 20, gap: 46, kinds: ['dot'], colours: { dot: ['#B3CFE2', '#A7C6DC'] } } }, opt);
  },
  mountain({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#CFE4F2', hill: '#9CCB7A', field: '#B5D98F', mt: '#8FA8C8' }, { sky: '#F2C3A3', hill: '#A9CE84', field: '#C2DD98', mt: '#A99BB8' }, { sky: '#C3D3E1', hill: '#8FC172', field: '#ABD388', mt: '#7F98B4' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 2, flip), field: P.field, road: ROAD.sand,
      motifs: M([{ k: 'mountains', peaks: [[120, 190, 62], [290, 160, 50], [470, 210, 66]], col: P.mt, snow: '#FFFFFF' }, { k: 'cloud', x: 600, y: 18, s: 0.6 }], flip),
      decor: [{ k: 'rocks', n: 2, pal: { rock: '#A39E95' } }, { k: 'flowerbed', n: 1, pal: { flowers: ['#B79AE6', '#FFFFFF', '#F6D45E'] } }], texture: { n: 24, gap: 40, kinds: ['tuft', 'dot'], colours: { tuft: ['#99C673', '#8BBA66'], dot: ['#E9B6CF', '#C7D8F2'] } } }, opt);
  },
  night({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#33416E', hill: '#4C5F86', field: '#5E7397', tex: ['#6E83A6'] }, { sky: '#2B3A5E', hill: '#3E5A6E', field: '#4F6F7F', tex: ['#5F7F8F'] }, { sky: '#3E3566', hill: '#55507E', field: '#665F8E', tex: ['#766F9E'] }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v, flip), field: P.field, road: { fill: '#FFF6D8', edge: '#C9A95C', outline: 3.5 },
      motifs: M([{ k: 'moon', x: 590, y: 32, r: 16 }, { k: 'stars', n: 16, y1: 56, key: 'ni' + v }], flip),
      decor: [{ k: 'bush', n: 2, pal: { bush: '#4E6A7E' } }, { k: 'rock', n: 1, pal: { rock: '#7C86A0' } }], texture: { n: 26, gap: 40, kinds: ['star', 'dot'], colours: { star: ['#FFE59A'], dot: P.tex } } }, opt);
  },
  rainy({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#C9D3DC', hill: '#93BC7A', field: '#A9CB8F' }, { sky: '#C4C8E6', hill: '#9BBF83', field: '#B0CF97' }, { sky: '#BFCBD4', hill: '#89B373', field: '#A1C589' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 1, flip), field: P.field, road: ROAD.plank,
      motifs: M([{ k: 'cloud', x: 140, y: 24, s: 1.1, col: '#EEF1F4' }, { k: 'cloud', x: 420, y: 18, s: 0.9, col: '#F3F5F7' }, { k: v === 2 ? 'rainbow' : 'cloud', x: 590, y: 70, r: 50, s: 0.8, col: '#E9EDF1' }], flip),
      decor: [{ k: 'puddle', n: 3, pal: { water: '#8DBBD3' } }, { k: 'bush', n: 1 }], texture: { n: 24, gap: 40, kinds: ['tuft', 'dot'], colours: { tuft: ['#93BD78', '#86B16C'], dot: ['#9DC4D8'] } } }, opt);
  },
  blossom({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#CFE8F4', hill: '#B6D98D', field: '#C9E3A2' }, { sky: '#F4C3D3', hill: '#ADD385', field: '#C2DE9A' }, { sky: '#D6DBF2', hill: '#A5CF80', field: '#BBDB94' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v, flip), field: P.field, road: ROAD.sand,
      motifs: M([{ k: 'treeline', col: '#F2A9C0', h: 36, step: 34, key: 'bl' + v, trunk: '#8A5A3B' }, { k: 'sun', x: 600, y: 26, r: 13 }], flip),
      decor: [{ k: 'flowerbed', n: 2, pal: { flowers: ['#F28CA8', '#FFFFFF', '#F7C5D6'] } }], texture: { n: 26, gap: 40, kinds: ['tuft', 'dot'], colours: { tuft: ['#A8CF82', '#9AC376'], dot: ['#F6B4C8', '#FFFFFF'] } } }, opt);
  },
  town({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#B6D8EE', hill: '#A7CF84', field: '#BBDB98' }, { sky: '#F2BFA0', hill: '#ADCC88', field: '#C3DC9F' }, { sky: '#BCC9D8', hill: '#9DC67D', field: '#B2D58F' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: [], field: P.field, road: { fill: '#E4E2DE', edge: '#A9A49C', outline: 4 },
      motifs: M([{ k: 'skyline', key: 'tw' + v }, { k: 'birds', pts: [[560, 18, 0.9]] }], flip),
      decor: [{ k: 'bush', n: 2 }, { k: 'flowerbed', n: 1 }], texture: { n: 16, gap: 46, kinds: ['tuft'], colours: { tuft: ['#A6CB7A', '#96BE68'] } } }, opt);
  },
  harbour({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#C3E1F0', sea: '#6FB0D0', field: '#C9C3B8' }, { sky: '#EFB58E', sea: '#79B3CC', field: '#CFC6B6' }, { sky: '#C2D2DE', sea: '#5E9FC0', field: '#C2BCB2' }][v];
    return look({ sky: P.sky, hill: P.field, hills: [], field: P.field, road: ROAD.plank,
      motifs: M([{ k: 'sea', y: 40, col: P.sea }, { k: 'birds', pts: [[200, 22, 1], [240, 16, 0.8]] }, { k: 'cloud', x: 540, y: 18, s: 0.7 }], flip),
      decor: [{ k: 'rocks', n: 1, pal: { rock: '#A39B91' } }, { k: 'log', n: 1 }], texture: { n: 20, gap: 46, kinds: ['pebble'], colours: { pebble: ['#B3AA9C', '#ABA192'] } } }, opt);
  },
  campsite({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#CFE6EE', hill: '#86B86E', field: '#A4CC86' }, { sky: '#F2C9A8', hill: '#8FB772', field: '#AACE8B' }, { sky: '#3A4870', hill: '#4F6B66', field: '#6E8F78' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 2, flip), field: P.field, road: v === 2 ? { fill: '#FFF2CF', edge: '#C49A55', outline: 3.5 } : ROAD.sand,
      motifs: M(v === 2 ? [{ k: 'moon', x: 560, y: 30, r: 14 }, { k: 'stars', n: 12, y1: 50, key: 'cp' }, { k: 'treeline', near: true, kind: 'pine', col: '#2F5A4C', h: 38, key: 'cpt' }] : [{ k: 'mountains', peaks: [[200, 200, 50], [420, 160, 40]], col: '#8EA6BC' }, { k: 'treeline', near: true, kind: 'pine', col: '#4E8A5C', h: 36, key: 'cpt' + v }], flip),
      decor: [{ k: 'log', n: 1 }, { k: 'rocks', n: 1, pal: { rock: v === 2 ? '#8792A0' : '#A9A49C' } }, { k: 'fern', n: 1 }], texture: { n: 24, gap: 40, kinds: ['tuft', 'leaf'], colours: { tuft: v === 2 ? ['#5F7F6E'] : ['#8DBA72', '#7EAD66'], leaf: v === 2 ? ['#5A7A68'] : ['#9AC27A'] } } }, opt);
  },
  reef({ v = 0, flip, ...opt } = {}) {
    const P = [{ field: '#7FCBD5', top: '#BFE6F0', bub: ['#B4E1EA', '#A6D9E3'], road: { fill: '#EAF8FA', edge: '#4F9FAD', outline: 3.5 } }, { field: '#6FB7D6', top: '#B6DDEE', bub: ['#A6D3E8', '#99CBE2'], road: { fill: '#F2F5E6', edge: '#4A8EAE', outline: 3.5 } }, { field: '#8BC9C2', top: '#C6E9E4', bub: ['#B7E0DA', '#A8D8D1'], road: { fill: '#FBF5E8', edge: '#5C9E96', outline: 3.5 } }][v];
    return look({ sky: P.field, hill: P.field, hills: [], field: P.field, road: P.road,
      motifs: M([{ k: 'surface', col: P.top, ray: '#A9DDEB' }], flip),
      decor: [{ k: 'seaweed', n: 3 }, { k: 'rocks', n: 1, pal: { rock: '#7E96A6' } }, { k: 'shells', n: 1 }], texture: { n: 26, gap: 36, kinds: ['bubble', 'bubble', 'dot'], colours: { bubble: P.bub, dot: P.bub.slice(0, 1) } } }, opt);
  },
  space({ v = 0, flip, ...opt } = {}) {
    const P = [{ field: '#3D4A85', star: '#FFD86B' }, { field: '#4B3D7A', star: '#FFE08A' }, { field: '#2F4E6E', star: '#FFE9A8' }][v];
    return look({ sky: P.field, hill: P.field, hills: [], field: P.field, road: ROAD.star,
      motifs: M([{ k: 'stars', n: 18, y1: 60, key: 'sp' + v, col: P.star }], flip),
      decor: [{ k: 'crater', n: 2, pal: { crater: '#6C76A8' } }], texture: { n: 34, gap: 34, kinds: ['star', 'star', 'dot'], colours: { star: [P.star, '#FFC24F'], dot: [P.star] } } }, opt);
  },
  candy({ v = 0, flip, ...opt } = {}) {
    const P = [{ field: '#CDEEDF', sky: '#F7C7DA' }, { field: '#F6E3C9', sky: '#C9E5F6' }, { field: '#D9CDEE', sky: '#FFE2B8' }][v];
    return look({ sky: P.sky, hill: P.field, hills: hills(v, flip), field: P.field, road: v === 1 ? ROAD.lilac : ROAD.candy,
      motifs: M([{ k: 'rainbow', x: 560, y: 72, r: 46 }, { k: 'sun', x: 120, y: 30, r: 14, col: '#FFD27A' }], flip),
      decor: [{ k: 'flowerbed', n: 1, pal: { bed: '#F2B4CA', flowers: ['#E8708F', '#7FBEE0', '#F2B04C'] } }], texture: { n: 24, gap: 44, kinds: ['dot', 'dot', 'star'], colours: { dot: ['#F2A5BF', '#A8D8F0', '#FBD38C'], star: ['#F7B6CB'] } } }, opt);
  },
  sky({ v = 0, flip, ...opt } = {}) {
    const P = [{ field: '#D2E2F7', sky: '#FCE6D8' }, { field: '#CFE7F5', sky: '#C9E4F5' }, { field: '#E1D8F2', sky: '#FBE2D0' }][v];
    return look({ sky: P.sky, hill: P.field, hills: [], field: P.field, road: ROAD.cloud,
      motifs: M([{ k: 'sun', x: 590, y: 36, r: 18, col: '#FFC86A' }, { k: 'birds', pts: [[160, 30, 1], [190, 22, 0.8]] }], flip),
      decor: [{ k: 'cloudpuff', n: 2, pal: { puff: '#C5D7EF' } }], texture: { n: 18, gap: 46, kinds: ['dot'], colours: { dot: ['#C4D6F0', '#BFCFEB'] } } }, opt);
  },
  prehistoric({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#F2C49B', hill: '#8FAF6A', field: '#B7C98A' }, { sky: '#C4DCC8', hill: '#7FA563', field: '#A9C27F' }, { sky: '#F2C9A2', hill: '#97A86A', field: '#C1C98C' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v, flip), field: P.field, road: ROAD.sand,
      motifs: M([{ k: 'volcano', x: 520, w: 150, h: 56 }, { k: 'birds', pts: [[150, 24, 1.2]] }], flip),
      decor: [{ k: 'fern', n: 3, pal: { leaf: '#5E8F4A' } }, { k: 'rocks', n: 1, pal: { rock: '#9C8E7E' } }], texture: { n: 24, gap: 40, kinds: ['tuft', 'pebble'], colours: { tuft: ['#9FB56F', '#90A863'], pebble: ['#A99A86'] } } }, opt);
  },
  cave({ v = 0, flip, ...opt } = {}) {
    const P = [{ field: '#8E7FA6', crystal: '#9FD8E6' }, { field: '#7E8CA0', crystal: '#E6A9D8' }, { field: '#94806C', crystal: '#B8E6A0' }][v];
    return look({ sky: P.field, hill: P.field, hills: [], field: P.field, road: { fill: '#F6EEDC', edge: '#6A5E50', outline: 3.5 },
      motifs: [], decor: [{ k: 'crystal', n: 3, pal: { crystal: P.crystal } }, { k: 'rocks', n: 1, pal: { rock: '#6F6A72' } }], texture: { n: 24, gap: 40, kinds: ['pebble', 'dot'], colours: { pebble: ['#7B6F90', '#85799A'], dot: [P.crystal] } } }, { ...opt, flat: true });
  },
  /** WATERWAYS (river face): the roads are water. kind = meadow | forest | autumn | sea | ice | tropic | marsh */
  water({ v = 0, flip, kind = 'meadow', ...opt } = {}) {
    const K = {
      meadow: { sky: '#FCEFD2', hill: '#B6DB8E', field: '#A9D27E', road: { fill: '#D3EEF8', edge: '#5FA9C8', outline: 4 }, motifs: [{ k: 'sun', x: 590, y: 28, r: 15 }, { k: 'cloud', x: 140, y: 24, s: 0.8 }], decor: [{ k: 'reeds', n: 3 }, { k: 'bush', n: 1 }], tex: { kinds: ['tuft', 'tuft'], colours: { tuft: ['#7FAF57', '#8DBA62'] } } },
      forest: { sky: '#F3DFC0', hill: '#6E9E5A', field: '#8DBE72', road: { fill: '#CFE9F2', edge: '#4E93AE', outline: 4 }, motifs: [{ k: 'treeline', col: '#4E8A50', kind: 'pine', h: 42, step: 24, key: 'wf' + v }], decor: [{ k: 'stump', n: 1 }, { k: 'fern', n: 2 }, { k: 'rock', n: 1, pal: { rock: '#9C978F' } }], tex: { kinds: ['leaf', 'tuft'], colours: { leaf: ['#6FA35E', '#5E9450'], tuft: ['#7DAE66'] } } },
      autumn: { sky: '#F2CFA0', hill: '#D39A55', field: '#DCB673', road: { fill: '#D6ECF4', edge: '#5C9BB6', outline: 4 }, motifs: [{ k: 'treeline', col: '#D9783E', h: 36, step: 28, key: 'wa' + v }], decor: [{ k: 'leafpile', n: 2 }, { k: 'reeds', n: 1 }], tex: { kinds: ['leaf', 'leaf'], colours: { leaf: ['#E2793F', '#C95C3A', '#D9A13F'] } } },
      sea: { sky: '#F6D7B4', hill: '#EBD39C', field: '#F0D9A4', road: { fill: '#C8E8F5', edge: '#4D9CC1', outline: 4 }, motifs: [{ k: 'sun', x: 120, y: 34, r: 18, col: '#F7B65A' }, { k: 'birds', pts: [[400, 26, 1], [430, 18, 0.8]] }], decor: [{ k: 'shells', n: 2 }, { k: 'rocks', n: 1, pal: { rock: '#B4A99A' } }], tex: { kinds: ['pebble', 'dot'], colours: { pebble: ['#E3C891', '#DDBF86'], dot: ['#D9B97C'] } } },
      ice: { sky: '#33416E', hill: '#E4EEF6', field: '#E7F0F7', road: { fill: '#9FD3EA', edge: '#3F86AE', outline: 4 }, motifs: [{ k: 'aurora', y: 16 }, { k: 'stars', n: 10, y1: 32, key: 'wi' }], decor: [{ k: 'iceblock', n: 2, pal: { ice: '#FFFFFF', iceShade: '#C6DCEB' } }], tex: { kinds: ['dot'], colours: { dot: ['#C9DCEA', '#D3E3EF'] } } },
      tropic: { sky: '#FFE3C2', hill: '#7FBF7A', field: '#F2DDA8', road: { fill: '#B8EDE8', edge: '#2E9E96', outline: 4 }, motifs: [{ k: 'sun', x: 560, y: 34, r: 18, col: '#FFC24F' }, { k: 'treeline', col: '#3F8F55', h: 36, step: 30, key: 'wt' + v }], decor: [{ k: 'shells', n: 1 }, { k: 'fern', n: 2, pal: { leaf: '#4F9A5A' } }], tex: { kinds: ['pebble'], colours: { pebble: ['#E6CC95', '#DCC089'] } } },
      marsh: { sky: '#E9DCC2', hill: '#94B66E', field: '#A7C47F', road: { fill: '#D8EFEA', edge: '#5B9C8E', outline: 4 }, motifs: [{ k: 'cloud', x: 520, y: 22, s: 0.9 }, { k: 'birds', pts: [[150, 26, 1]] }], decor: [{ k: 'reeds', n: 4 }, { k: 'pond', n: 1, pal: { water: '#5E9483' } }], tex: { kinds: ['tuft', 'tuft'], colours: { tuft: ['#8AAE68', '#7EA35E'] } } },
    }[kind];
    return { ...look({ sky: K.sky, hill: K.hill, hills: hills(v, flip), field: K.field, road: K.road, motifs: M(K.motifs, flip), decor: K.decor, texture: { n: 24, gap: 40, ...K.tex } }, opt), paint: 'water' };
  },
  wheat({ v = 0, flip, ...opt } = {}) {
    const P = [{ sky: '#BEE0F0', hill: '#E2C46E', field: '#EAD58E' }, { sky: '#FAD9BB', hill: '#DDBA62', field: '#E8CF84' }, { sky: '#C2CCD8', hill: '#D8B860', field: '#E3CC80' }][v];
    return look({ sky: P.sky, hill: P.hill, hills: hills(v + 1, flip), field: P.field, road: ROAD.pale,
      motifs: M([{ k: 'sun', x: 100, y: 34, r: 16 }, { k: 'birds', pts: [[460, 24, 1], [490, 16, 0.8]] }], flip),
      decor: [{ k: 'hay', n: 2 }], texture: { n: 26, gap: 38, kinds: ['tuft', 'tuft'], colours: { tuft: ['#D7B95E', '#CDAE52'] } } }, opt);
  },
};

module.exports = { SET, ROAD };
