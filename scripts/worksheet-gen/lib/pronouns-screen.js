/**
 * pronouns-screen.js — Level Set 2026-09-28 (Personal Pronouns, PDF + interactive): the screen version (tap-choice)
 * and the answer key for G1-352 and its five faces, built from the PRINTED page (the same instance: render-instance
 * rebuilds with a fresh rng and asserts meta identity), plus the robot's INDEPENDENT oracle, which re-derives every
 * answer from the merged bank — each name's tagged gender → the item key → the bank's map — never from the page.
 *
 *   base       the name(s) → tap the pronoun we use instead (every chip of the locale)
 *   replace    line 1 + line 2 with a gap → tap the word that replaces the name
 *   sort       a name card → tap the pronoun whose bin it goes in
 *   anaphora   "{P} reads a book." → tap the name the boxed word stands for (the block's two plates)
 *   possessive "This is Mia. This is ___ ball." → tap the word that shows who owns it
 *   rewrite    the sentence → tap the sentence rewritten with the right pronoun (one per pronoun)
 */
'use strict';
const { slotFor } = require('./answer-slots.js');

const CORAL = '#F2784B';
const { seatAfter } = require('./key-on-row.js');
const SCR_W = 660, OPT_H = 104;   // the Level Set screen sizes: 104 page-px reaches the 44 px tap floor at 360 wide
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const cssStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;text-align:center">${top}</div>${body}</div>`;
}
function opt(i, label, correct, w, px = 30) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px;padding:0 10px;text-align:center;line-height:1.15">${esc(label)}</span>`;
}
const opts = (html) => `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${html}</div>`;
const word = (w, px = 40) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:#3A3530">${esc(w)}</span>`;
const text = (t, px = 30) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:${px}px;line-height:1.35;color:#3A3530">${t}</span>`;
const GAP = `<span style="display:inline-block;width:110px;height:34px;border:3px dashed ${CORAL};border-radius:10px;vertical-align:middle;margin:0 6px"></span>`;
const chipW = (labels, n) => Math.min(200, Math.floor((SCR_W - 24 - (n - 1) * 12) / n));   // the item's inner width: 660 - 2 x (10 padding + 2 border); 4 chips at 151 wrapped the fourth

/** Every element carrying `attr` in the printed body, with its attributes (the screen reads the page it wraps). */
function elements(html, attr) {
  const out = [];
  const re = new RegExp(`<(\\w+)\\s[^>]*\\b${attr}(?=[\\s=>])(?:="[^"]*")?[^>]*>`, 'g');   // the name must END there: data-lcs-pair is not data-lcs-pairs
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0], at = {};
    tag.replace(/([\w-]+)="([^"]*)"/g, (_, k, v) => { at[k] = unesc(v); return ''; });
    out.push({ tag, at, index: m.index });
  }
  return out;
}
/** The text of the first `<p ATTR …>…</p>` after `from` in the printed body. */
function pText(html, attr, from) {
  const i = html.indexOf(attr, from);
  if (i < 0) return '';
  const s = html.indexOf('>', i) + 1, e = html.indexOf('</p>', s);
  return unesc(html.slice(s, e).replace(/<[^>]*>/g, '')).trim();
}

function screenOrKey(layout, built, ctx, loc, bank) {
  const html = built.bodyHtml;
  const out = { bodyHtml: html, meta: built.meta };
  const chips = bank.initial;   // the pronouns as a child writes them first in a sentence
  // only the pronouns that ARE the answer somewhere on this page, at least two (2026-10-06 guessability audit: de "Es"
  // offered on pages with no thing was never right — a free elimination that lifted "Sie" to 50% against 33%)
  const onPage = (all, isUsed) => { const kept = all.filter(isUsed); return kept.length >= 2 ? kept : all; };
  if (ctx.interactive) {
    let items = [];
    if (layout === 'base') {
      const cards = elements(html, 'data-lcs-item');
      const usedB = new Set(cards.map((c) => +c.at['data-lcs-chip-key']));
      const keep = onPage(bank.chips.map((w, j) => ({ w, j })), (x) => usedB.has(x.j));
      const labels = keep.map((x) => x.w);
      items = cards.map((c) => {
        const names = (c.at['data-lcs-names'] || '').split('|').filter(Boolean);
        const plate = pPlate(html, c.index);
        const k = +c.at['data-lcs-chip-key'];
        return item(`data-lcs-names="${esc(names.join('|'))}" data-lcs-refs="${esc(c.at['data-lcs-refs'] || '')}"`, word(plate, 44),
          opts(keep.map((x, j) => opt(j, x.w, x.j === k, chipW(labels, labels.length))).join('')));
      });
    } else if (layout === 'replace' || layout === 'rewrite') {
      const lanes = elements(html, 'data-lcs-frame');
      const pronOf = (answer) => chips.filter((w) => answer === w || answer.startsWith(w + ' ')).sort((a, b) => b.length - a.length)[0];
      const usedW = new Set(lanes.map((ln) => pronOf(ln.at['data-lcs-answer'] || '')).filter(Boolean));
      const shown = onPage(chips, (w) => usedW.has(w));
      items = lanes.map((ln) => {
        const names = (ln.at['data-lcs-names'] || '').split('|').filter(Boolean);
        const answer = ln.at['data-lcs-answer'];
        if (layout === 'replace') {
          const line1 = pText(html, 'data-lcs-line1', ln.index), line2 = pText(html, 'data-lcs-line2', ln.index);
          return item(`data-lcs-names="${esc(names.join('|'))}" data-lcs-refs="${esc(ln.at['data-lcs-key'])}"`, text(esc(line1)) + '<br>' + text(GAP + esc(line2)),
            opts(shown.map((w, j) => opt(j, w, w === answer, chipW(shown, shown.length))).join('')));
        }
        const sentence = pText(html, 'data-lcs-sentence', ln.index);
        // the LONGEST pronoun the answer opens with: "Ellas juegan" must not match "Ella" (fr Elle/Elles, pt Ela/Elas)
        const pron = chips.filter((w) => answer.startsWith(w + ' ') || answer === w).sort((a, b) => b.length - a.length)[0];
        if (!pron) throw new Error(`pronouns screen: "${answer}" opens with no pronoun of ${chips.join('/')}`);
        const rest = answer.slice(pron.length);
        const choices = shown.map((w) => w + rest);
        return item(`data-lcs-names="${esc(names.join('|'))}" data-lcs-rest="${esc(rest)}"`, text(esc(sentence), 32),
          opts(choices.map((c, j) => opt(j, c, c === answer, 310, 24)).join('')));   // two per row: one per row overflowed the 3600 screen
      });
    } else if (layout === 'possessive') {
      const lanes = elements(html, 'data-lcs-owner');
      const P = bank.possessive;
      const usedK = new Set(lanes.map((ln) => +ln.at['data-lcs-chip-key']));
      const offered = onPage(P.chips.map((w, j) => ({ w, j })), (x) => usedK.has(x.j));
      items = lanes.map((ln) => {
        const names = (ln.at['data-lcs-names'] || '').split('|').filter(Boolean);
        const frame = pText(html, 'data-lcs-frametext', ln.index);
        const k = +ln.at['data-lcs-chip-key'];
        const [pre, post] = splitAtBox(html, ln.index);
        return item(`data-lcs-names="${esc(names.join('|'))}" data-lcs-thing="${esc(ln.at['data-lcs-thing'])}"`, text(esc(pre) + GAP + esc(post)),
          opts(offered.map((x, j) => opt(j, x.w, x.j === k, chipW(offered.map((y) => y.w), offered.length))).join('')) + (frame ? '' : ''));
      });
    } else if (layout === 'sort') {
      const cards = elements(html, 'data-lcs-sortword');
      const heads = elements(html, 'data-lcs-sorthead').map((h) => bank.chips[+h.at['data-lcs-sorthead']]);
      items = cards.map((c) => {
        const names = (c.at['data-lcs-names'] || '').split('|').filter(Boolean);
        const k = +c.at['data-lcs-key'];
        return item(`data-lcs-names="${esc(names.join('|'))}" data-lcs-refs="${esc(c.at['data-lcs-refs'] || '')}"`, word(c.at['data-lcs-sortword'], 44),
          opts(heads.map((w, j) => opt(j, w, j === k, chipW(heads, heads.length))).join('')));
      });
    } else if (layout === 'anaphora') {
      const blocks = elements(html, 'data-lcs-pair');
      items = [];
      blocks.forEach((b, bi) => {
        const end = bi + 1 < blocks.length ? blocks[bi + 1].index : html.length;
        const seg = html.slice(b.index, end);
        const refs = elements(seg, 'data-lcs-referent');
        const plates = refs.map((r) => ({ t: r.at['data-lcs-referent'], names: (r.at['data-lcs-names'] || '').split('|').filter(Boolean), plate: plateText(seg, r.index) }));
        const intro = [pText(seg, 'data-lcs-intro', 0), seg.includes('data-lcs-intro2') ? pText(seg, 'data-lcs-intro2', 0) : ''].filter(Boolean).join(' ');
        elements(seg, 'data-lcs-anaphor').forEach((s) => {
          const tile = elements(seg.slice(s.index), 'data-lcs-pronoun')[0];
          const pron = tile.at['data-lcs-pronoun'];
          const restStart = seg.indexOf('</span>', seg.indexOf('data-lcs-pronoun', s.index)) + 7;
          const rest = unesc(seg.slice(restStart, seg.indexOf('</div>', restStart)).replace(/<[^>]*>/g, '')).trim();
          const want = s.at['data-lcs-ref'];
          // the two plates in an order of their own per sentence (2026-10-06: story order made the answers alternate) —
          // ONE order for the buttons AND the card's record, which the robot's oracle reads
          const shownPl = slotFor(intro + '|' + pron + '|' + rest + '|' + items.length, 2) ? plates.slice().reverse() : plates;
          items.push(item(`data-lcs-pron="${esc(pron)}" data-lcs-plates="${esc(shownPl.map((p) => p.names.join('+')).join('|'))}"`,
            text(esc(intro), 26) + '<br>' + text(`<span style="border:3px solid #146B5E;border-radius:10px;padding:0 10px">${esc(pron)}</span> ${esc(rest)}`, 32),
            opts(shownPl.map((p, j) => opt(j, p.plate, p.t === want, 300)).join(''))));
        });
      });
    } else throw new Error(`pronouns screen: layout "${layout}" has no screen`);
    out.bodyHtml = `<div data-ws-content data-lcs-type="pronouns" data-lcs-screen="${layout}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // answer key: the printed page with every answer shown in coral
  const css = [];
  // a gap-box answer is CENTERED by the box itself (inset 0, flex); a writing-row answer is SEATED on the row
  // (key-on-row.js) — never a guessed offset (operator report 2026-09-28)
  const write = (sel, w, where, px = 22) => css.push(`${sel}{position:relative}`,
    `${sel}::after{content:"${cssStr(w)}";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 ${px}px 'Baloo 2',cursive;color:${CORAL};white-space:nowrap;pointer-events:none}`);
  if (layout === 'base' || (layout === 'possessive' && !/data-lcs-write="1"/.test(html))) css.push(`[data-lcs-correct]{outline:4px solid ${CORAL};outline-offset:2px}`);
  if (layout === 'replace') elements(html, 'data-lcs-frame').forEach((ln) => write(`[data-lcs-frame="${cssStr(ln.at['data-lcs-frame'])}"][data-lcs-key="${cssStr(ln.at['data-lcs-key'])}"] [data-lcs-gapbox]`, ln.at['data-lcs-answer'], 'left:6px;top:0px'));
  if (layout === 'possessive' && /data-lcs-write="1"/.test(html)) {
    const P = bank.possessive;
    elements(html, 'data-lcs-owner').forEach((ln) => write(`[data-lcs-owner="${cssStr(ln.at['data-lcs-owner'])}"][data-lcs-thing="${cssStr(ln.at['data-lcs-thing'])}"] [data-lcs-gapbox]`, P.chips[+ln.at['data-lcs-chip-key']], 'left:6px;top:-2px'));
  }
  if (layout === 'rewrite') elements(html, 'data-lcs-frame').forEach((ln) => { out.bodyHtml = seatAfter(out.bodyHtml, `data-lcs-frame="${esc(ln.at['data-lcs-frame'])}"`, ln.at['data-lcs-answer'], { fill: CORAL, font: 'baloo2-700' }); });
  if (layout === 'sort') {
    // each name written ON its own bin line (a pair on two lines, as the page budgets it) — drawn inside the bin's svg
    // on the dashed line, never laid over the bin with a guessed offset (operator report 2026-09-28)
    const heads = elements(html, 'data-lcs-sorthead').length;
    const byBin = {};
    elements(html, 'data-lcs-sortword').forEach((c) => {
      const cap = c.at['data-lcs-sortword'], names = (c.at['data-lcs-names'] || '').split('|').filter(Boolean);
      const lines = names.length === 2 ? [cap.slice(0, cap.lastIndexOf(names[1])).trim(), names[1]] : [cap];
      (byBin[c.at['data-lcs-key']] = byBin[c.at['data-lcs-key']] || []).push(...lines);
    });
    for (let b = 0; b < heads; b++) {
      const at = out.bodyHtml.indexOf(`data-lcs-sortbin="${b}"`);
      const gapY = +((/data-lcs-gapy="([\d.]+)"/.exec(out.bodyHtml.slice(at, at + 200)) || [])[1]);
      const s = out.bodyHtml.indexOf('<svg', out.bodyHtml.indexOf('class="ws-bin"', at)), e = out.bodyHtml.indexOf('</svg>', s);
      if (at < 0 || !(gapY > 0) || s < 0) throw new Error(`pronouns key: bin ${b} has no lined svg`);
      const px = Math.min(20, Math.floor(gapY * 0.55));
      const texts = (byBin[b] || []).map((t, k) => `<text x="10" y="${((k + 1) * gapY - 3).toFixed(1)}" font-family="Baloo 2" font-weight="700" font-size="${px}" fill="${CORAL}" data-lcs-keytext="1">${esc(t)}</text>`).join('');
      out.bodyHtml = out.bodyHtml.slice(0, e) + texts + out.bodyHtml.slice(e);
    }
  }
  if (layout === 'anaphora') {
    // number each pronoun and its person: the same coral number on the boxed word and on the name
    let n = 0;
    const blocks = elements(html, 'data-lcs-pair');
    css.push('[data-lcs-pronoun],[data-lcs-referent]{position:relative}');
    blocks.forEach((b, bi) => {
      const end = bi + 1 < blocks.length ? blocks[bi + 1].index : html.length;
      const seg = html.slice(b.index, end);
      const a = b.at['data-lcs-a'];
      elements(seg, 'data-lcs-anaphor').forEach((s) => {
        n++;
        const ref = s.at['data-lcs-ref'];
        const badge = `content:"${n}";position:absolute;top:-10px;min-width:22px;height:22px;border-radius:11px;background:${CORAL};color:#fff;font:700 14px/22px 'Baloo 2',cursive;text-align:center;z-index:2`;
        css.push(`[data-lcs-pair][data-lcs-a="${cssStr(a)}"] [data-lcs-anaphor][data-lcs-ref="${ref}"] [data-lcs-pronoun]::before{${badge};right:-12px}`,
          `[data-lcs-pair][data-lcs-a="${cssStr(a)}"] [data-lcs-referent="${ref}"]::before{${badge};left:-8px}`);
      });
    });
  }
  out.bodyHtml = out.bodyHtml + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
  return out;
}
function pPlate(html, from) { return plateText(html, from); }
function plateText(html, from) {
  const i = html.indexOf('data-lcs-plate', from);
  const s = html.indexOf('>', i) + 1, e = html.indexOf('</span>', s);
  return unesc(html.slice(s, e).replace(/<[^>]*>/g, '')).trim();
}
function splitAtBox(html, from) {
  const i = html.indexOf('data-lcs-frametext', from);
  const s = html.indexOf('>', i) + 1, e = html.indexOf('</p>', s);
  const inner = html.slice(s, e);
  const b = inner.indexOf('<span class="ws-blankbox"'), be = inner.indexOf('</span>', b) + 7;
  return [unesc(inner.slice(0, b)).trim(), unesc(inner.slice(be)).trim()];
}

/** The key of a referent set from the NAMES alone (their tagged gender in the merged bank) — the oracle never reads marks. */
function keyFromNames(names, bank) {
  const g = names.map((n) => { const x = bank.names.find((y) => y.name === n); if (!x) throw new Error(`oracle: "${n}" is not a bank name`); return x.gender; });
  if (g.length === 1) return g[0] === 'm' ? 'm1' : 'f1';
  if (bank.chips.length === 2) return 'p';
  return g.every((x) => x === 'm') ? 'mp' : g.every((x) => x === 'f') ? 'fp' : 'xp';
}
function objKey(refs, loc, bank) {
  const { vocab } = require('./b2-common.js');
  const e = vocab()[refs] && vocab()[refs][loc];
  if (!e || !e[2] || !(e[2] in (bank.objectMap || {}))) throw new Error(`oracle: object "${refs}" has no gender code`);
  return bank.objectMap[e[2]];
}
const MAPFACE = { base: 'base', replace: 'replace', rewrite: 'rewrite', sort: 'sort' };

function oracle(layout, items, loc, bank) {
  const lc = (x) => String(x).normalize('NFC').toLocaleLowerCase(loc);
  return items.map((it) => {
    const labels = (it.options || []).map((o) => (o && typeof o === 'object' ? o.label : o));
    const names = String(it.meta['data-lcs-names'] || '').split('|').filter(Boolean);
    let want;
    if (layout === 'anaphora') {
      // the boxed pronoun stands for the plate whose key reaches that pronoun
      const pron = it.meta['data-lcs-pron'];
      const plates = String(it.meta['data-lcs-plates']).split('|').map((p) => p.split('+'));
      const hits = plates.map((ns, j) => {
        const k = keyFromNames(ns, bank);
        const c = bank.map.anaphora[k] != null ? bank.map.anaphora[k] : bank.map.replace[k];
        return lc(bank.initial[c]) === lc(pron) ? j : -1;
      }).filter((j) => j >= 0);
      if (hits.length !== 1) throw new Error(`oracle: "${pron}" stands for ${hits.length} of the plates (no single answer)`);
      return hits[0];
    }
    if (layout === 'possessive') {
      const k = keyFromNames(names, bank);
      const thing = bank.possessive.things.find((t) => t.key === it.meta['data-lcs-thing']);
      if (!thing) throw new Error(`oracle: no thing "${it.meta['data-lcs-thing']}"`);
      const fk = /^(mp|fp|xp|p)$/.test(k) ? 'p' : k;
      const v = thing.forms ? thing.forms[fk] : bank.possessive.byOwner[k];
      want = bank.possessive.chips[v];
    } else {
      let c;
      if (!names.length) c = objKey(it.meta['data-lcs-refs'], loc, bank);
      else c = bank.map[MAPFACE[layout]][keyFromNames(names, bank)];
      if (layout === 'base' || layout === 'sort') want = bank.chips[c];
      else if (layout === 'replace') want = bank.initial[c];
      else want = bank.initial[c] + it.meta['data-lcs-rest'];
    }
    const idx = labels.findIndex((l) => lc(l) === lc(want));
    if (idx < 0) throw new Error(`oracle: "${want}" not among ${labels.join('/')} (${layout})`);
    if (labels.filter((l) => lc(l) === lc(want)).length > 1) throw new Error(`oracle: "${want}" offered twice (${layout})`);
    return idx;
  });
}

module.exports = { screenOrKey, oracle };
