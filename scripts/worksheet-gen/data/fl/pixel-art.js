/**
 * data/fl/pixel-art.js — Mystery Grid Pictures (K-589; docs/makers/FLAGSHIP.md): pictures drawn by hand on a grid, because a library
 * drawing cut down to 14 cells reads as a blob. One letter a colour, '.' = white. Rows are centred; the page takes each design's own size.
 * Level 1 about 12 cells wide, level 2 about 14, level 3 about 16.
 */
'use strict';
const COLOURS = { k: 'black', r: 'red', o: 'orange', y: 'yellow', g: 'green', l: 'lightgreen', b: 'blue', s: 'lightblue', p: 'pink', u: 'purple', n: 'brown', e: 'grey', '.': 'none' };
const A = {
  1: {
    heart: ['............', '..rrr..rrr..', '.rrrrrrrrrr.', '.rrrrrrrrrr.', '.rrrrrrrrrr.', '..rrrrrrrr..', '...rrrrrr...', '....rrrr....', '.....rr.....', '............'],
    star: ['.....yy.....', '.....yy.....', '....yyyy....', '.yyyyyyyyyy.', '..yyyyyyyy..', '...yyyyyy...', '...yyyyyy...', '..yyy..yyy..', '..yy....yy..', '............'],
    apple: ['......n.....', '.....ng.gg..', '...rrnrgg...', '..rrrrrrrr..', '..rrrrrrrr..', '..rrrrrrrr..', '..rrrrrrrr..', '...rrrrrr...', '...rr..rr...', '............'],
    fish: ['............', '...bbbb.....', '..bbbbbbb..b', '.bkbbbbbbbbb', '.bbbbbbbbbb.', '.bbbbbbbbbbb', '..bbbbbbb..b', '...bbbb.....', '............'],
    flower: ['....pp.pp...', '...ppppppp..', '...ppyyypp..', '....pyyyp...', '...ppyyypp..', '...ppppppp..', '....pp.pp...', '......g.....', '....g.g.....', '.....gg.....', '......g.....'],
    house: ['.....rr.....', '....rrrr....', '...rrrrrr...', '..rrrrrrrr..', '.rrrrrrrrrr.', '..nnnnnnnn..', '..nssnnssn..', '..nssnnssn..', '..nnnnnnnn..', '..nnnkknnn..', '..nnnkknnn..'],
    tree: ['.....gg.....', '....gggg....', '...gggggg...', '..gggggggg..', '.gggggggggg.', '.gggggggggg.', '..gggggggg..', '...gggggg...', '.....nn.....', '.....nn.....', '....nnnn....'],
    sun: ['.....yy.....', '.y...yy...y.', '..y......y..', '....oooo....', '...oooooo...', 'yy.oooooo.yy', 'yy.oooooo.yy', '...oooooo...', '....oooo....', '..y......y..', '.y...yy...y.', '.....yy.....'],
    mushroom: ['....rrrr....', '..rr..rrrr..', '.rrr..rr.rr.', '.rrrrrrr.rr.', '.rrrrrrrrrr.', '....yyyy....', '....yyyy....', '....yyyy....', '....yyyy....'],
    icecream: ['.....pp.....', '....pppp....', '...pppppp...', '...pppppp...', '...ssssss...', '...ssssss...', '...oooooo...', '....oooo....', '....oooo....', '.....oo.....', '.....oo.....'],
    balloon: ['....rrrr....', '...rrrrrr...', '..rrrrrrrr..', '..rr.rrrrr..', '..r..rrrrr..', '..rrrrrrrr..', '...rrrrrr...', '....rrrr....', '.....rr.....', '.....k......', '......k.....', '.....k......'],
    butterfly: ['.uuu....uuu.', 'uuuuu..uuuuu', 'uuyuu..uuyuu', 'uuuuukkuuuuu', '.uuuukkuuuu.', '...ppkkpp...', '..pppkkppp..', '..pypkkpyp..', '...pp..pp...'],
  },
  2: {
    cat: ['.kk........kk.', '.kok......kok.', '.kookkkkkkook.', '.kooooooooook.', '.kookooookook.', '.kookooookook.', '.kooooppooook.', '.kooooooooook.', '..koookkoook..', '...kooooook...', '....kkkkkk....'],
    car: ['....rrrrrr....', '...rssrrssr...', '..rrssrrssrr..', '.rrrrrrrrrrrr.', '.rrrrrrrrrrrr.', '.rrkkrrrrkkrr.', '...kk....kk...'],
    rocket: ['......rr......', '.....rrrr.....', '.....eeee.....', '....eeeeee....', '....essese....', '....essese....', '....eeeeee....', '....eeeeee....', '...reeeeeer...', '..rreeeeeerr..', '..rr.oooo.rr..', '......yy......', '......yy......'],
    boat: ['......n.......', '......nrr.....', '......nrrrr...', '......nrrrrr..', '......nrrrr...', '......nrr.....', '......n.......', '..nnnnnnnnnn..', '...nnnnnnnn...', '....nnnnnn....', '.bbbbbbbbbbbb.', 'bbbbbbbbbbbbbb'],
    duck: ['....yyyy......', '...yyyyyy.....', '...ykyyyy.....', '.ooyyyyyy.....', '.ooyyyyy......', '....yyyy...y..', '...yyyyyyyyyy.', '..yyyyyyyyyyy.', '..yyyyyyyyyy..', '...yyyyyyyy...', '....oo..oo....'],
    owl: ['..n........n..', '..nnnnnnnnnn..', '.nnnnnnnnnnnn.', '.nssssnnssssn.', '.nskksnnskksn.', '.nssssoossssn.', '.nnnnnoonnnnn.', '.nnyynnnnyynn.', '.nnyyyyyyyynn.', '.nnyyyyyyyynn.', '..nnyyyyyynn..', '...nn....nn...', '...oo....oo...'],
    ladybug: ['.....k..k.....', '......kk......', '.....kkkk.....', '....rrkkrr....', '...rrrkkrrr...', '..rkkrkkrkkr..', '..rkkrkkrkkr..', '..rrrrkkrrrr..', '..rrkrkkrkrr..', '...rrrkkrrr...', '....rrkkrr....', '......kk......'],
    turtle: ['....gggggg......', '...gglgglgg.....', '..gglgglgglg.ll.', '..gggggggggg.lkl', '..glgglgglgglll.', '.llllllllllll...', '..ll.......ll...'],
    cupcake: ['......rr......', '.....pppp.....', '....pppppp....', '...pppppppp...', '..pppppppppp..', '..pppppppppp..', '..nnnnnnnnnn..', '...nynnynnn...', '...nynnynnn...', '...nnnnnnnn...', '....nnnnnn....'],
    umbrella: ['......kk......', '....uuuuuu....', '..uuuuuuuuuu..', '.uuuuuuuuuuuu.', 'uuuuuuuuuuuuuu', 'u..u..kk..u..u', '......kk......', '......kk......', '......kk......', '...kk.kk......', '...kkkkk......'],
    crown: ['y.....yy.....y', 'yy....yy....yy', 'yyy..yyyy..yyy', 'yyyyyyyyyyyyyy', 'yyryyybbyyyryy', 'yyyyyyyyyyyyyy', 'oooooooooooooo'],
    snowman: ['.....kkkk.....', '.....kkkk.....', '....kkkkkk....', '.....ssss.....', '....ssssss....', '....skssks....', '....ssooss....', '.....ssss.....', '...ssssssss...', '..sssskkssss..', '..ssssssssss..', '...sssskksss..', '....ssssss....'],
  },
  3: {
    robot: ['.......rr.......', '.......ee.......', '...eeeeeeeeee...', '...ebbeeeebbe...', '...ebbeeeebbe...', '...eeeeeeeeee...', '...eekkkkkkee...', '...eeeeeeeeee...', '.....eeeeee.....', '.eeeuuuuuuuueee.', '.e..uuyyyyuu..e.', '.e..uuyyyyuu..e.', '.e..uuuuuuuu..e.', '....uu....uu....', '....ee....ee....', '...eee....eee...'],
    dinosaur: ['..........gggg..', '.........gggggg.', '.........ggkggg.', '.........gggggg.', '.........ggggl..', '..g.....ggggg...', '.ggg...gggggg...', '..ggggggggggll..', '...ggggggggggg..', '....gggggggggg..', '.....ggggggggg..', '......gg...gg...', '......gg...gg...', '.....ggg..ggg...'],
    penguin: ['.....kkkkkk.....', '....kkkkkkkk....', '...kkk.kk.kkk...', '...kkkkkkkkkk...', '...kkk.oo.kkk...', '..kkkk....kkkk..', '.kkkk......kkkk.', '.kk.k......k.kk.', '....k......k....', '....k......k....', '....kk....kk....', '.....kkkkkk.....', '....oo....oo....', '...ooo....ooo...'],
    rainbow: ['.....rrrrrr.....', '...rrrrrrrrrr...', '..rrroooooorrr..', '.rrroooooooorrr.', '.rroooyyyyooorr.', 'rrroooyyyyooorrr', 'rroooyyggyyooorr', 'rrooyyggggyyoorr', 'rrooyyg..gyyoorr', 'rrooyyg..gyyoorr', 'ssss........ssss', 'ssssss....ssssss'],
    castle: ['e.e.e......e.e.e', 'eeeee......eeeee', 'eeeee.e..e.eeeee', 'eeeeeeeeeeeeeeee', 'eeskeeeeeeeeskee', 'eeskeeeeeeeeskee', 'eeeeeeeeeeeeeeee', 'eeeeeennnneeeeee', 'eeeeennnnnneeeee', 'eeeeennnnnneeeee', 'eeeeennnnnneeeee'],
    whale: ['....s...s.......', '.....s.s........', '......s.........', '...bbbbbbbb.....', '..bbbbbbbbbbb..b', '.bbbkbbbbbbbbbbb', '.bbbbbbbbbbbbbb.', '.sssssbbbbbbbb..', '..sssssssbbb....'],
    bee: ['.....ss..ss.....', '....ssss.sss....', '.....ss.sss.....', '...yykkyykkyy...', '..kyykkyykkyyy..', '..yyykkyykkyyyk.', '..kyykkyykkyyy..', '...yykkyykkyy...'],
    pumpkin: ['.......gg.......', '......gg........', '...oooooooooo...', '..oooooooooooo..', '.oookkoookkoooo.', '.oookkoookkoooo.', '.oooooookoooooo.', '.ooooooooooooo..', '.ookooooooooko..', '.oookkkkkkkooo..', '..oooooooooooo..', '...oooooooooo...'],
    tractor: ['.........kk.....', '.........kk.....', '....ggggggggg...', '....gsssgggggg..', '....gsssgggggg..', '.kk.gsssggggggg.', '.kkgggggggggggg.', 'kkkkkggggggkkkk.', 'kkekkggggggkkekk', 'kkkkk......kkkk.', '.kkk........kk..'],
    train: ['..kk............', '..kk....rrrrrr..', '.kkkk...rssssr..', 'rrrrrrrrrssssr..', 'rrrrrrrrrrrrrr..', 'rrrrrrrrrrrrrr..', 'yyyyyyyyyyyyyy..', 'kkk.kkk.kkk.kkk.', 'kkk.kkk.kkk.kkk.'],
    elephant: ['....eeee........', '...eeeeeeeee....', '..eeeeeeeeeeee..', '..eekeeeeeeeeee.', '..eeeeeeeeeeeee.', '..e.eeeeeeeeeee.', '..e.eeeeeeeeeee.', '..e.eeeeeeeeeee.', '.ee.eee...eee...', '.e..eee...eee...', '....eee...eee...'],
    lion: ['.....oooooo.....', '...oooooooooo...', '..oooyyyyyyooo..', '.ooyyyyyyyyyyoo.', '.ooyykkyykkyyoo.', '.ooyykkyykkyyoo.', '.ooyyyyyyyyyyoo.', '.ooyyyykkyyyyoo.', '.ooyyyyyyyyyyoo.', '..ooyykkkkyyoo..', '...ooyyyyyyoo...', '.....oooooo.....'],
    frog: ['...gg......gg...', '..gkkg....gkkg..', '..gkkggggggkkg..', '.gggggggggggggg.', '.gggggggggggggg.', '.ggkggggggggkgg.', '.gggkkkkkkkkggg.', '..gggggggggggg..', '...lllllllll....', '..gglllllllgg...', '.gggg.....gggg..'],
  },
};
/** a design as a square grid of colour letters: rows centred, one white row of air round the picture */
function grid(rows, mirror) {
  // a square grid with one blank cell round the picture; a picture 16 cells or more is printed without it (2026-11-09: 18
  // cells left 34 px boxes, at the screen's tap floor, and the page no room to grow them; 16 cells give 37 px boxes)
  const w = Math.max(...rows.map((r) => r.length)), s = Math.max(w, rows.length), n = s + (s >= 16 ? 0 : 2);
  const out = [], top = Math.floor((n - rows.length) / 2);
  for (let y = 0; y < n; y++) {
    const src = rows[y - top];
    if (!src) { out.push('.'.repeat(n)); continue; }
    const r = mirror ? [...src].reverse().join('') : src, left = Math.floor((n - r.length) / 2);
    out.push('.'.repeat(left) + r + '.'.repeat(n - left - r.length));
  }
  return out;
}
module.exports = { A, COLOURS, grid };
