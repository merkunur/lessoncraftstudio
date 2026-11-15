/** G3-361 — 3-Digit Addition with Carrying. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');

/** the carries of a + b, place by place from the ones (1 where a place gives a ten to the next) */
function carriesOf(a, b) {
  const out = [];
  let c = 0;
  for (let x = a, y = b; x > 0 || y > 0; x = Math.floor(x / 10), y = Math.floor(y / 10)) { c = (x % 10) + (y % 10) + c >= 10 ? 1 : 0; out.push(c); }
  return out;
}

module.exports = {
  ...base,
  id: 'G3-361',
  slug: '3-digit-addition-carrying',
  // Level Set 2026-10-05: real levels (level 2 = the published page); level 1 smaller numbers / 4 problems, level 3 harder / more problems
  difficulty: { 1: {"min":115,"max":889,"sumMax":999,"cards":4,"cols":2,"rows":2,"cell":64,"ops":["+"],"maxCarries":1}, 2: {"min":115,"max":889,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 3: {"min":115,"max":889,"sumMax":999,"cards":9,"cols":3,"rows":3,"ops":["+"],"minCarries":2} },
  i18n: { en: { title: "3-Digit Addition with Carrying", instruction: "Add one place at a time. Regroup when you need to carry." } },

  /**
   * THE ITEM BANK of the unit checks (Part 7.6): the page of the level, every problem regrouping as often as every other
   * (review en f1115, 2026-11-15: form A carried once, form B twice). Level 1 carries once, levels 2 and 3 twice (a new
   * ten AND a new hundred). The key writes each carry into its small box (the reviewer: "show the 1s").
   */
  checkPage(args, ctx) {
    const lv = Number(args.difficulty) || 2;
    const d = this.difficulty[lv] || this.difficulty[2];
    const self = Object.assign(Object.create(this), { difficulty: { ...this.difficulty, [lv]: d.maxCarries || d.minCarries ? d : { ...d, minCarries: 2 } } });
    const built = base.build.call(self, args, ctx);
    if (!(ctx && ctx.answerKey)) return built;
    // the carry row of each addition: one small box per place left of the ones, its carry the one of the place to its right
    const html = built.bodyHtml.replace(/data-lcs-a="(\d+)" data-lcs-b="(\d+)" data-lcs-op="\+">(<div style="display:flex;gap:6px;margin-bottom:2px">)([\s\S]*?)(<\/div>)/g, (m, a, b, open, cells, close) => {
      const cs = carriesOf(Number(a), Number(b));
      const spans = cells.match(/<span [^>]*><\/span>/g) || [];
      const width = spans.length;
      const filled = spans.map((sp, c) => {
        const place = width - 1 - c;   // 0 = ones
        return place >= 1 && cs[place - 1] && /dashed/.test(sp)
          ? sp.replace('></span>', ` data-lcs-carry="1"><span style="margin:auto;font-family:'Baloo 2';font-weight:800;font-size:17px;line-height:1;color:#C9552E">1</span></span>`) : sp;
      });
      return `data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-op="+">` + open + filled.join('') + close;
    });
    return { ...built, bodyHtml: html };
  },
};
