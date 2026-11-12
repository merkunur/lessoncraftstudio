#!/usr/bin/env node
/**
 * Builds the UNIT CHECKS of a language (Daily Teaching System, Part 7.1; design: docs/daily-teaching-system/
 * PART-7-DESIGN.md): per unit two forms (A before the unit, B after it) from one blueprint, and their keys.
 *
 * The blueprint is the unit itself: for each lesson, in order, the cards of the first worksheet type the lesson hands
 * out that is built of cards carrying their answers (lib/cut-cards.js). A section is the cards of one lesson under the
 * worksheet's own instruction line. Form B is the same blueprint with another seed and another picture theme; no
 * card of B asks what a card of A asks. The key is the form's own markup with the answers shown.
 *
 *   node scripts/assessments/build-checks.js --loc=en [--subject=math] [--grades=K,1] [--unit=<id>] [--png]
 *     → out/assessments/<loc>/<unit id>/{check-a,check-b,key-a,key-b}.pdf   (+ page pictures with --png)
 *     → out/assessments/<loc>/checks.json   what was built (read by the next steps: the teacher pages, the unit page)
 *
 * A unit gets a check when at least MIN_SECTIONS of its lessons have such a type; the others are named in checks.json.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const REPO = path.join(__dirname, '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const { buildPage } = require(path.join(WG, 'page', 'shell.js'));
const { cutCards } = require('./lib/cut-cards.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const has = (k) => process.argv.includes('--' + k);
const loc = arg('loc', 'en');
const MIN_SECTIONS = 3;
const CARD_MAX = 460;                         // a taller card is most of a page: not a task of a short check
const SECTION_MAX = 330;                      // the cards of a section are at most this tall together
const SEEDS = 8;                              // worksheet pages built per form and type, to choose a section's cards from
const GAP = 12;                               // between two sections of a page
const AIR = 16;                               // added to a card's own height (cut-cards.js: nh), so that it does not stand tight
const tall = (c) => Math.min(c.h, (c.nh || c.h) + AIR);
const THEMES = { A: 'animals', B: 'fruits' };  // the picture theme of a form's themed cards
const ui = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'assessments', 'ui.' + loc + '.json'), 'utf8'));
// what a reader of the checks ruled: sections left out, directions reworded for cut cards, units without a check
const rulesFile = path.join(__dirname, 'lists', loc + '.json');
const rules = fs.existsSync(rulesFile) ? JSON.parse(fs.readFileSync(rulesFile, 'utf8')) : { drop: {}, instruction: {}, noCheck: {} };
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : '{' + k + '}'));
// a range of numbers in a title stays on one line ("0–" at the end of a line and "10" on the next: review sv.review-1)
const tie = (s) => s.replace(/(\d)\u2013(\d)/g, '$1\u2013\u2060$2');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// the worksheet types by id, and their printed strings in the language
const typeFiles = new Map();
for (const g of fs.readdirSync(path.join(WG, 'types'))) { if (g.startsWith('_')) continue; for (const f of fs.readdirSync(path.join(WG, 'types', g))) { const m = /^((?:K|G\d)-\d{3})/.exec(f); if (m) typeFiles.set(m[1], path.join(WG, 'types', g, f)); } }
const strings = JSON.parse(fs.readFileSync(path.join(WG, 'i18n', 'strings.' + loc + '.json'), 'utf8'));

const STYLE = `<style>
.tc-wrap{display:flex;flex-direction:column;gap:${GAP}px;width:100%}
.tc-instr{display:flex;gap:10px;align-items:center;margin:0 0 8px;font-family:'Nunito',sans-serif;font-weight:700;font-size:15px;line-height:1.25;color:#3A3530}
.tc-part{flex:0 0 auto;min-width:28px;height:28px;padding:0 8px;border-radius:14px;background:#3A3530;color:#fff;font-family:'Baloo 2',cursive;font-weight:700;font-size:15px;display:inline-flex;align-items:center;justify-content:center}
.tc-cards{display:grid;gap:14px;justify-content:start}
.tc-wrap [fill="#DDEBE8"]{fill:#A3CCC3}
.tc-wrap [style*="background:#DDEBE8"]{background:#A3CCC3 !important}
.tc-key [data-lcs-correct]:not([data-lcs-correct="0"]):not([data-lcs-correct="false"]):not([data-tc-unit]){outline:3px solid #C9552E;outline-offset:2px;border-radius:8px}
.tc-key [data-tc-correct]{outline:3px solid #C9552E;outline-offset:2px;border-radius:8px}
.tc-key [data-lcs-key-ring],.tc-key [data-lcs-keyring]{outline:3px solid #C9552E;outline-offset:2px;border-radius:50%}
.tc-key .tc-ans{color:#C9552E;font-family:'Baloo 2',cursive;font-weight:800}
.tc-keynote{margin:-2px 0 8px 38px;font-family:'Nunito',sans-serif;font-weight:700;font-size:12.5px;line-height:1.3;color:#C9552E}
.tc-key [data-tc-says]{position:relative}
.tc-key [data-tc-says]::before{content:attr(data-tc-says);position:absolute;right:8px;top:5px;z-index:3;font-family:'Nunito',sans-serif;font-weight:800;font-size:12.5px;color:#C9552E;background:#FFFFFFCC;border-radius:6px;padding:0 5px}
.tc-wrap [data-lcs-crossed] svg path{stroke:#3A3530}
.tc-key .ws-pattern-chip[data-lcs-key-badge]{position:relative}
.tc-key .ws-pattern-chip[data-lcs-key-badge]::after{content:attr(data-lcs-key-badge);position:absolute;right:-7px;top:-9px;min-width:22px;height:22px;box-sizing:border-box;padding:0 5px;border-radius:11px;background:#C9552E;color:#fff;font-family:'Baloo 2',cursive;font-weight:800;font-size:14px;line-height:22px;text-align:center}
.tc-key svg[data-lcs-mode="solution"] [data-lcs-tan]{stroke:#C9552E}
</style>`;
// (review sv.review-1) crossed-out pictures: the cross is dark, an orange cross on an orange fruit is lost in a grey
// print; the picture that fills a gap of a pattern carries the number of its gap in the key; the lines of a figure
// built of pieces are drawn in the colour of the answers
// a picture without a printed word: the key names it (English: the file's name; another language whose list says
// sayWords: the word of the card's own sound boxes, else the vocabulary's word)
const vocab = loc === 'en' || !rules.sayWords ? null : require(path.join(WG, 'lib', 'platform', 'index.js')).vocab();
const wordOf = (c) => { const own = (/data-lcs-(?:word|chunks)="([^"]*)"/.exec(c.html) || [])[1]; if (own) return own.split('|').join(''); return allPics(c).map((p) => { const n = p.split('/')[1]; const e = vocab[n] || vocab[n.replace(/_/g, ' ')] || vocab[n.replace(/_/g, '-')]; return e && e[loc] ? e[loc][0] : ''; }).filter(Boolean).join(', '); };
const said = (c) => (/^p:/.test(c.key) && !/[\p{L}\d]/u.test(textOf(c)) ? (loc === 'en' ? allPics(c).map((p) => p.split('/')[1].replace(/_/g, ' ')).join(', ') : vocab ? wordOf(c) : '') : '');
const sectionHtml = (s, n, key) => `<section class="tc-section" data-tc-part="${n}"><p class="tc-instr"><span class="tc-part">${n}</span><span>${esc(s.instruction)}</span></p>` +
  (key && (rules.keyNote || {})[s.type] ? `<p class="tc-keynote">${esc(rules.keyNote[s.type])}</p>` : '') +
  (s.styles || []).join('') + (key && (s.keyStyles || []).length ? '<style>' + s.keyStyles.map((r) => { const at = r.indexOf('{'); return r.slice(0, at).split(',').map((x) => '[data-tc-part="' + n + '"] ' + x.trim()).join(',') + r.slice(at); }).join('') + '</style>' : '') +                                                    // the style sheet a worksheet type carries in its page
  `<div class="tc-cards" style="grid-template-columns:repeat(${s.perRow},${s.w}px);grid-auto-rows:${s.h}px">${s.cards.map((c, i) => { const h = renumber(key && c.keyHtml ? c.keyHtml : c.html, i + 1); return key && said(c) ? h.replace('data-tc-unit=""', 'data-tc-unit="" data-tc-says="' + esc(said(c)) + '"') : h; }).join('')}</div></section>`;
const renumber = (html, n) => html.replace(/(<span class="ws-card-badge">)\d+(<\/span>)/, '$1' + n + '$2').replace(/data-lcs-card="\d+"/, 'data-lcs-card="' + n + '"')
  .replace(/(<[^>]*data-tc-badge[^>]*>)\s*\d+\s*(<)/, '$1' + n + '$2');          // the badge of a row (cut-cards.js marks it)
const pageHtml = (title, sections, first, opts) => buildPage({
  title, instruction: ui.pageInstruction, locale: loc, pageSize: loc === 'en' ? 'letter' : 'a4', ...(opts || {}),
  bodyHtml: STYLE + `<div class="tc-wrap${opts && opts.keyLabel ? ' tc-key' : ''}">` + sections.map((s, i) => sectionHtml(s, first + i, !!(opts && opts.keyLabel))).join('') + '</div>',
});
// the key: every answer the cards carry, written where the child writes it
const showAnswers = () => {
  const SVG = 'http://www.w3.org/2000/svg';
  let shown = 0;
  document.querySelectorAll('[data-lcs-answer]').forEach((el) => {
    const answer = el.dataset.lcsAnswer;
    if (answer === '') return;                                             // a box without an answer of its own (the type's key card fills it)
    if (el.namespaceURI === SVG) {
      // an answer that sits in a drawing (the empty circle of a number bond, the empty brick of a number wall): the
      // number is written into the middle of the shape; the shape itself is left as it is
      const box = el.getBBox();
      const t = document.createElementNS(SVG, 'text');
      t.setAttribute('x', box.x + box.width / 2); t.setAttribute('y', box.y + box.height / 2);
      t.setAttribute('text-anchor', 'middle'); t.setAttribute('dominant-baseline', 'central');
      t.setAttribute('font-family', "'Baloo 2'"); t.setAttribute('font-weight', '800'); t.setAttribute('fill', '#C9552E');
      t.setAttribute('font-size', Math.max(12, Math.min(32, Math.floor(Math.min(box.height * 0.5, box.width / Math.max(1, answer.length) * 1.1)))));
      t.setAttribute('data-tc-shown', '1');
      t.textContent = answer;
      (el.tagName.toLowerCase() === 'g' ? el : el.parentNode).appendChild(t);
      shown++;
      return;
    }
    // a row that carries its answer itself (a sentence with a gap): the answer is written into its gap box
    const gap = el.querySelector('[data-lcs-gapbox]');
    const drawn = (x) => { const c = getComputedStyle(x, '::after').content; return !!c && c !== 'none' && c !== 'normal' && c !== '""'; };
    if (drawn(el) || (gap && drawn(gap))) { shown++; return; }
    if (gap && !(gap.textContent || '').trim()) el = gap;
    else if ((el.textContent || '').trim()) { shown++; return; }          // the card already prints it
    const r = el.getBoundingClientRect();
    const mark = document.createElement('span');
    mark.className = 'tc-ans'; mark.setAttribute('data-tc-shown', '1');
    mark.textContent = answer;
    mark.style.cssText = 'display:block;width:100%;text-align:center;line-height:' + Math.max(16, Math.floor(r.height) - 6) + 'px;font-size:' + Math.max(13, Math.min(28, Math.floor(r.height * 0.55))) + 'px';
    el.appendChild(mark);
    shown++;
  });
  // T1: the key shows every answer the cards carry (a choice is outlined by the style sheet)
  // a key that rings EVERY option of a box marks nothing (key rules carried from another page did that once)
  const ringAll = [...document.querySelectorAll('[data-tc-correct]')].filter((e) => { const sib = [...e.parentElement.children]; return sib.length >= 3 && sib.every((x) => x.hasAttribute('data-tc-correct')); }).length;   // (three or more: two digit boxes of a sum are both answers)
  return { ringAll, answers: [...document.querySelectorAll('[data-lcs-answer]')].filter((e) => e.dataset.lcsAnswer !== '').length, shown, hidden: [...document.querySelectorAll('[data-tc-shown]')].filter((e) => { const b = e.getBoundingClientRect(); return !(b.width > 2 && b.height > 2); }).length };
};


// ---- the cut pages are kept (out/assessments/_cut-cache): building 16 worksheet pages per lesson takes minutes, and a
// change of the CHOICE below needs none of them again. An entry is good while the type's file, the cutter, the
// strings and the page shell are the files it was made from (their time stamps are part of its name).
const CACHE = path.join(REPO, 'out', 'assessments', '_cut-cache');
const stamp = (f) => { try { return String(fs.statSync(f).mtimeMs); } catch (e) { return '0'; } };
const SHARED = [path.join(__dirname, 'lib', 'cut-cards.js'), path.join(WG, 'i18n', 'strings.' + loc + '.json'), path.join(WG, 'page', 'shell.js'), path.join(WG, 'page', 'page.css')].map(stamp).join('|');
async function cached(o, make) {
  if (has('no-cache')) return make(o.seed);
  const name = crypto.createHash('sha1').update([loc, o.typeId, o.seed, o.theme, stamp(o.file), SHARED].join('|')).digest('hex').slice(0, 24) + '.json';
  const at = path.join(CACHE, name);
  if (fs.existsSync(at)) return JSON.parse(fs.readFileSync(at, 'utf8'));
  const r = await make(o.seed);
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(at, JSON.stringify(r));
  return r;
}

// ---- which cards of a worksheet type a section takes (what two readers of the checks ruled, reviews/) ----
/** a FACT: the numbers of a task in any order. A fact stands once in a form, in whatever part, and in one form only. */
const fact = (c) => (c.key.startsWith('n:') ? c.key : null);
/** the one number of a card that has only one (count the pictures: 9): an answer once in a form, across its parts */
const solo = (c) => (/^[tp]:/.test(c.key) ? null : /^\d+$/.test(String(c.ans)) && !/[+\-−×÷=<>]/.test(c.kind) ? 'n:' + c.ans : new Set(c.nums).size === 1 ? 'n:' + c.nums[0] : null);   // … also when the child circles it among three numbers; a sum is not meant
/** a number a check can lean on: not 55, and of three digits not 262 or 774 (a child who writes the places in another
 *  order or twice the same digit goes unnoticed) */
const plain = (c) => (c.plain && !String(c.ans).split('|').some((a) => /^\d{3}$/.test(a) && new Set(a).size < 3) ? 1 : 0);
/** the drawings of a choice card whatever their order: three shapes in another order are the same box */
const shapes = (c) => { const d = c.pos == null ? [] : (c.html.match(/<svg[^]*?<\/svg>/g) || []); return d.length >= 2 ? d.slice().sort().join('|') : null; };
/** how much drawing a card is (of a card without numbers: eight slices are more than two halves) */
const drawn = (c) => Number(String(c.look).split('.')[1]) || 0;
/** every picture of a card by name (folder/name), and what a card prints as text */
const allPics = (c) => c._all || (c._all = [...new Set([...c.html.matchAll(/src="[^"]*?([^"\/]+)\/([^"\/]+?)(?:@\dx)?\.(?:webp|png|svg)"/g)].map((m) => decodeURIComponent(m[1] + '/' + m[2])))]);
const textOf = (c) => { if (c._text == null) { const marked = /class="ws-card-badge"|data-tc-badge/.test(c.html); const t = c.html.replace(/<span class="ws-card-badge">[^<]*<\/span>/g, ' ').replace(/(<[^>]*data-tc-badge[^>]*>)[^<]*/g, '$1').replace(/<style[^]*?<\/style>/g, ' ').replace(/<svg[^]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim(); c._text = marked || !/^[tp]:/.test(c.key) ? t : t.replace(/^\d+\s+/, ''); } return c._text; };   // (a card of numbers without a badge starts with a number of its task)
/** the numbers a task of words or pictures prints, in order (23 ÷ 2 with foxes is 23 ÷ 2 with mangoes) */
const printed = (c) => (/^[tp]:/.test(c.key) ? (textOf(c).match(/\d+/g) || []).join(',') : '');
/** the words of a short card of words (two cards of a part do not share one: lists disjointWords) */
const wordsOf = (c) => textOf(c).toLowerCase().split(/[^\p{L}]+/u).filter((w) => w.length >= 3);
/** the pictures of a task of words or sounds (cut-cards.js: keys t: and p:), by name: a picture stands once in a form,
 *  whatever the part (the zebra of the sound boxes is not spelled two parts further down) */
const picsOf = (c) => (/^[tp]:/.test(c.key) ? (c._pics || (c._pics = [...new Set([...c.html.matchAll(/src="[^"]*?([^"\/]+)\/([^"\/]+?)(?:@\dx)?\.(?:webp|png|svg)"/g)].map((m) => decodeURIComponent(m[1] + '/' + m[2])))])) : []);
let PICS_A = new Set(), PICS_B = new Set();          // per unit (set where its plans are made)
let WORDS_A = new Set(), WORDS_B = new Set();        // the words a form has printed in its parts of words (list disjointForm)
/** a word a form has printed, or a form of it (start and starta, slut and sluta: one word to a child; review sv.review-2) */
const inWords = (set, w) => { for (const x of set) if (x === w || (Math.min(x.length, w.length) >= 4 && (x.startsWith(w) || w.startsWith(x)))) return true; return false; };
/** the drawings of a card, each as its markup (lists otherDrawings: no figure of form A's box in form B's) */
const drawingsOf = (c) => c._svgs || (c._svgs = c.html.match(/<svg[^]*?<\/svg>/g) || []);
const shown = (c, set, others, small) => picsOf(c).some((p) => (!small && set.has(p)) || others.some((x) => picsOf(x).includes(p)));
/** a card that hides a number inside the task ("? + 3 = 7") and not at its end */
const inside = (c) => (/\?/.test(c.kind) && !/\?\s*$/.test(c.kind) ? 1 : 0);
/** the larger numbers of a task that are its own (not furniture): two cards of one part do not share one */
const own = (plan, c) => c.nums.filter((n) => n >= 11 && !plan.furniture.has(n));
const shares = (plan, c, chosen) => { const seen = new Set(chosen.flatMap((x) => own(plan, x))); return own(plan, c).some((n) => seen.has(n)); };
/** a task whose numbers lie ten or more apart (72 and 97) is not the task of two numbers in one ten (94 and 97) */
/** … and two equal numbers (65 and 65) are a third case: form B has it only where form A has it */
/** … and two numbers of three digits in ONE hundred (746 and 775) are a fourth: the hundreds do not decide */
const wide = (c) => { const lo = c.nums[0], hi = c.nums[c.nums.length - 1]; return c.nums.length < 2 ? 'one' : hi === lo ? 'equal' : lo >= 100 && Math.floor(lo / 100) === Math.floor(hi / 100) ? 'sameH' : hi - lo >= 10 ? 'far' : 'close'; };
/** where in the range of the type's sizes the cards of a section are taken: not all from the top (10 would be the
 *  answer everywhere), and both forms get the same spread because B follows A card by card */
const SPREAD = { 1: [0.6], 2: [0.75, 0.4], 3: [0.5, 0.9, 0.15] };   // (three: a middle, a large and a small one — 7, 6, 5 sides read as a countdown)
// (two apart at least: doubles and other tasks whose sizes go in steps of two have no neighbour one apart)
const near = (x, y) => Math.abs(x.mag - y.mag) <= Math.max(2, Math.round(y.mag * 0.2));
/** a card of form A needs a card of form B: the same kind, about the same size, another task */
const partner = (plan, c) => plan.b.cards.some((x) => x.kind === c.kind && x.key !== c.key && !x.twins && near(x, c) && wide(x) === wide(c));
function chooseA(plan, usedA, soloA) {
  let cands = plan.a.cards.filter((c) => !c.inOrder && !c.twins && !plan.avoid.includes(c.mag) && !(fact(c) && usedA.has(fact(c))) && !(c.fact2 && usedA.has(c.fact2)) && !(plan.disjointForm && wordsOf(c).some((w) => inWords(WORDS_A, w))) && !(plan.posA != null && c.pos !== plan.posA) && !(solo(c) && soloA.has(solo(c))) && !shown(c, PICS_A, [], plan.small));
  // a type that has pairs in one hundred: the part asks one pair the hundreds do not decide (taken first: they are
  // few) and one they do
  const pairs = plan.take >= 2 && cands.some((c) => wide(c) === 'sameH');
  if (new Set(cands.map(inside)).size > 1) cands = cands.filter(inside);       // a page that hides a number is about that
  const mags = [...new Set(cands.map((c) => c.mag))].sort((x, y) => x - y);
  const out = [];
  for (const [i, t] of (SPREAD[plan.take] || SPREAD[3]).entries()) {
    // a part blended of several worksheet types (lists: blend) takes its boxes from them in turn, and only cards
    // that form B can answer with a card of the same type and size
    const from = plan.sources > 1 ? cands.filter((c) => c.src === i % plan.sources && partner(plan, c))
      : plan.slotWide && plan.slotWide[i] ? cands.filter((c) => wide(c) === plan.slotWide[i] && partner(plan, c))
      : pairs && i < 2 ? cands.filter((c) => wide(c) === (i ? 'far' : 'sameH') && partner(plan, c)) : cands;
    const sizes = from !== cands ? [...new Set(from.map((c) => c.mag))].sort((x, y) => x - y) : mags;
    const want = sizes[Math.round(t * (sizes.length - 1))];
    const ok = from.filter((c) => !(plan.mixKinds && out.some((x) => x.kind === c.kind)) && !(plan.sameGiven && out.some((x) => (x.given || []).join() === (c.given || []).join())) && !(printed(c) && out.some((x) => printed(x) === printed(c))) && !shown(c, new Set(), out) && !(plan.disjoint && out.some((x) => wordsOf(x).some((w) => wordsOf(c).includes(w)))) && !out.some((x) => x.key === c.key || (x.ans === c.ans && !(/^[tp]:/.test(c.key) && /^\d+$/.test(String(c.ans)) && c.mag === 0)) || (x.ask && x.ask === c.ask) || (x.pos != null && x.pos === c.pos) || (c.mag > 0 && x.mag === c.mag)) && !shares(plan, c, out));
    const seenA = (x) => (plan.small && picsOf(x).some((p) => PICS_A.has(p)) ? 1 : 0);
    ok.sort((x, y) => (seenA(x) - seenA(y)) || (plain(y) - plain(x)) || (Math.abs(x.mag - want) - Math.abs(y.mag - want)));
    if (ok[0]) out.push(ok[0]);
  }
  return out;
}
/** for each card of A a card of the SAME KIND (the unknown in the same place, the same sign) and of the same size,
 *  that is no fact of form A or of form B so far, shares no total and no larger number with the part's other cards,
 *  and whose right option, if it is a choice, does not sit where A has it when the pool offers that */
function chooseB(plan, cardsA, usedA, usedB, soloB) {
  const askedA = new Set(cardsA.map((x) => x.ask).filter(Boolean));
  const shownA = new Set(cardsA.map(shapes).filter(Boolean));
  // the cards form B may take for a box of form A, the best first, given the boxes of the part taken so far
  const candidates = (ca, out) => {
    // a number of three digits one or two away from form A's (262 and 263) reads as the same task: taken only
    // when the pool has nothing further away
    const twin = (x) => (ca.mag >= 100 && Math.abs(x.mag - ca.mag) < ca.mag * 0.05 ? 1 : 0);
    // … and in another hundred when the pool has one (262 and 246 both have 2 hundreds)
    // (list otherLead: also for numbers of two digits — 56 in form A and 58 in form B both show five tens)
    const lead = (x) => ((ca.mag >= 100 || (plan.otherLead && ca.mag >= 10)) && String(x.mag)[0] === String(ca.mag)[0] ? 1 : 0);
    // (list sameGap) two groups to compare: about as far apart as in form A (8 against 6 is counted, 8 against 3 is seen)
    const gap = (x) => (x.nums.length >= 2 ? x.nums[x.nums.length - 1] - x.nums[0] : 0);
    // (list otherRest) a division with a remainder: another number to divide and another remainder than in form A
    const rest = (x) => { const n = printed(x).split(',').map(Number); return n.length >= 2 && n[1] ? [n[0], n[0] % n[1]] : [NaN, NaN]; };
    // a type without numbers whose forms must be alike (lists: sameLook): the card with about as much drawing
    const looks = (x) => (plan.sameLook ? Math.abs(drawn(x) - drawn(ca)) : 0) + Math.abs((x.len || 0) - (ca.len || 0));
    const ok = plan.b.cards.filter((c) => c.kind === ca.kind && !c.inOrder && !c.twins && !(c.ask && askedA.has(c.ask)) && !(shapes(c) && shownA.has(shapes(c))) && !(solo(c) && soloB.has(solo(c))) && !(printed(c) && out.concat(cardsA).some((x) => printed(x) === printed(c))) && !shown(c, PICS_B, out, plan.small) && !(plan.disjoint && out.some((x) => wordsOf(x).some((w) => wordsOf(c).includes(w)))) && !(plan.sameGiven && (c.given || []).join() !== (ca.given || []).join()) && !(plan.sameAnswer && c.ans !== ca.ans) && near(c, ca) && wide(c) === wide(ca) && !plan.avoid.includes(c.mag)
      && !(fact(c) && (usedA.has(fact(c)) || usedB.has(fact(c)))) && !(c.fact2 && (usedB.has(c.fact2) || cardsA.some((x) => x.fact2 === c.fact2))) && !cardsA.some((x) => x.key === c.key)
      // (review sv.review-2) a figure of form A's box does not stand in form B's box; a word of as many sounds as form A's
      && !(plan.otherDrawings && drawingsOf(c).some((d) => cardsA.some((x) => drawingsOf(x).includes(d)))) && !(plan.sameSize && c.mag !== ca.mag) && !(plan.otherFirst && (c.given || [])[0] === (ca.given || [])[0])
      && !(plan.sameGap && Math.abs(gap(c) - gap(ca)) > 1) && !(plan.otherRest && (rest(c)[0] === rest(ca)[0] || rest(c)[1] === rest(ca)[1])) && !(plan.disjointForm && wordsOf(c).some((w) => inWords(WORDS_B, w)))
      && !out.some((x) => x.key === c.key || (x.ans === c.ans && !(/^[tp]:/.test(c.key) && /^\d+$/.test(String(c.ans)) && c.mag === 0)) || (x.ask && x.ask === c.ask) || (c.mag > 0 && x.mag === c.mag)) && !shares(plan, c, out.concat(cardsA)));
    const asked = new Set(cardsA.map((x) => x.ans));
    const seenInA = (x) => (picsOf(x).some((p) => PICS_A.has(p)) ? 1 : 0);
    // (a task of sounds whose answer IS its size — four sounds — keeps that size in form B: another word of four sounds)
    const again = (x) => (/^[tp]:/.test(x.key) && String(x.mag) === String(x.ans) ? 0 : asked.has(x.ans) ? 1 : 0);
    const seenB = (x) => (plan.small && picsOf(x).some((p) => PICS_B.has(p)) ? 1 : 0);
    ok.sort((x, y) => (again(x) - again(y)) || (seenB(x) - seenB(y)) || (seenInA(x) - seenInA(y)) || (twin(x) - twin(y)) || (lead(x) - lead(y)) || ((ca.pos != null && x.pos === ca.pos) - (ca.pos != null && y.pos === ca.pos)) || (plain(y) - plain(x)) || (looks(x) - looks(y)) || (Math.abs(x.mag - ca.mag) - Math.abs(y.mag - ca.mag))
      // two candidates equally far from A's size: the larger one for the first box, the smaller for the second, so that
      // form B is not the easier form as a whole
      || (out.length % 2 === 0 ? y.mag - x.mag : x.mag - y.mag));
    return ok;
  };
  // the first choice of every box, and when that leaves a later box empty, the next one (six-sided shape: 5 or 7 sides
  // in form B; taking 7 leaves nothing for the eight-sided one)
  const out = [];
  const fillFrom = (i) => { if (i === cardsA.length) return true; for (const c of candidates(cardsA[i], out).slice(0, 8)) { out.push(c); if (fillFrom(i + 1)) return true; out.pop(); } return false; };
  if (!fillFrom(0)) {
    out.length = 0;
    for (const ca of cardsA) {
      const ok = candidates(ca, out);
      if (ok[0]) out.push(ok[0]);
      else if (has('debug')) { const P = plan.b.cards; console.log('      [form B of lesson ' + plan.lesson + ', ' + plan.type + '] no box for «' + String(ca.ans).slice(0, 30) + '» (kind ' + ca.kind + ', size ' + ca.mag + '): pool ' + P.length + ', same kind ' + P.filter((c) => c.kind === ca.kind).length + ', near ' + P.filter((c) => c.kind === ca.kind && near(c, ca) && wide(c) === wide(ca)).length + ', not a task of A ' + P.filter((c) => c.kind === ca.kind && near(c, ca) && !cardsA.some((x) => x.key === c.key)).length + ', picture free ' + P.filter((c) => c.kind === ca.kind && !cardsA.some((x) => x.key === c.key) && !shown(c, PICS_B, out)).length + '; kinds in the pool: ' + [...new Set(P.map((c) => c.kind))].join(' / ')); }
    }
  }
  return out;
}

(async () => {
  const unitsFile = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'units', 'units.' + loc + '.json'), 'utf8'));
  const grades = arg('grades', '') ? arg('grades', '').split(',') : null;
  const subject = arg('subject', '');
  const only = arg('unit', '');
  const units = unitsFile.units.filter((u) => u.status === 'live' && (!only || u.id === only) && (!subject || u.subject === subject) && (!grades || grades.includes(String(u.grade))));
  const outRoot = path.join(REPO, 'out', 'assessments', loc);
  fs.mkdirSync(outRoot, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const built = [];
  const load = async (file, html) => { fs.writeFileSync(file, html, 'utf8'); await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 }); await page.goto(url.pathToFileURL(file).href, { waitUntil: 'networkidle0' }); await page.evaluate(() => document.fonts.ready); };

  for (const u of units) {
    if (rules.noCheck[u.id]) { console.log('--    ' + u.id + ': no check by a ruling: ' + rules.noCheck[u.id]); continue; }
    const dir = path.join(outRoot, u.id);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    // ---- the blueprint: one section per lesson that has a type of answer-carrying cards ----
    const sections = { A: [], B: [] }, left = [], plans = [];
    const usedA = new Set(), usedB = new Set();          // the facts a form has asked (a fact stands once in a form, and in one form only)
    PICS_A = new Set(); PICS_B = new Set(); WORDS_A = new Set(); WORDS_B = new Set();
    const soloA = new Set(), soloB = new Set();          // the single numbers a form has asked (9 pictures: once in a form)
    for (const l of u.lessons) {
      let found = null;
      const why = [];
      if ((rules.drop[u.id] || {})[l.n]) { left.push(l.n); if (has('debug')) console.log('      lesson ' + l.n + ' is left out by a ruling: ' + rules.drop[u.id][l.n]); continue; }
      for (const p of l.paper || []) {
        const file = typeFiles.get(p.type);
        if (!file || !strings[p.type]) continue;
        if ((rules.dropType || {})[p.type]) { why.push(p.type + ': left out by a ruling (' + rules.dropType[p.type].slice(0, 60) + '…)'); continue; }
        // the cards a form may choose from: the worksheet page of a type built with SEEDS seeds of the form
        const poolOf = async (typeId, form) => {
          const file = typeFiles.get(typeId), type = require(file), p = { type: typeId };
          let cols = 0; const cards = [], seen = new Set(), styles = [], keyStyles = [];
          for (let k = 1; k <= SEEDS; k++) {
            const r = await cached({ file, typeId: type.id, seed: 'check|' + u.id + '|' + form + (k > 1 ? k : ''), theme: (rules.theme || {})[typeId] || THEMES[form] }, (seed) => cutCards(page, { type, strings: strings[p.type], locale: loc, seed, theme: (rules.theme || {})[typeId] || THEMES[form], outDir: dir }));
            if (r.refused) return r;
            if (cols && r.cols !== cols) return { refused: 'its page changes its columns' };
            cols = r.cols;
            for (const st of r.styles || []) if (!styles.includes(st)) styles.push(st);
            for (const st of r.keyStyles || []) if (!keyStyles.includes(st)) keyStyles.push(st);
            for (const c of r.cards) { if (seen.has(c.key + '#' + c.kind)) continue; seen.add(c.key + '#' + c.kind); cards.push(c); }
          }
          return { cols, cards, styles, keyStyles, instruction: strings[p.type].instruction, title: strings[p.type].printTitle || strings[p.type].title };
        };
        const pool = (form) => poolOf(p.type, form);
        const a = await pool('A');
        if (a.refused) { why.push(p.type + ': ' + a.refused); continue; }
        const b = await pool('B');
        if (b.refused || b.cols !== a.cols) { why.push(p.type + ': form B ' + (b.refused || 'has other columns')); continue; }
        // a ruling (lists: blend): the lesson hands out several worksheets of one shape (the table of 2, the table of 5),
        // and its part takes its boxes from them in turn
        const more = (rules.blend || {})[p.type] || [];
        const titles = [a.title];
        if (more.length) {
          for (const c of a.cards.concat(b.cards)) { c.src = 0; c.kind += ' ·0'; }
          for (const [k, id] of more.entries()) {
            const a2 = await poolOf(id, 'A'), b2 = await poolOf(id, 'B');
            // (the direction lines differ where the worksheets ask other things — 1 more, 10 more: then the list gives the part its own line)
            if (a2.refused || b2.refused || a2.cols !== a.cols || b2.cols !== a.cols || (a2.instruction !== a.instruction && !rules.instruction[p.type])) throw new Error(u.id + ' lesson ' + l.n + ': ' + id + ' cannot be blended into ' + p.type + ' (' + (a2.refused || b2.refused || 'another shape or another direction line') + ')');
            for (const c of a2.cards.concat(b2.cards)) { c.src = k + 1; c.kind += ' ·' + (k + 1); }
            a.cards.push(...a2.cards); b.cards.push(...b2.cards); titles.push(a2.title);
          }
        }
        // rulings on single types (lists): fractions only in lowest terms (2/4 is also 1/2); answers a part must not
        // have (the first mark of a number line); pairs of fractions by what they share (the top number, the bottom
        // number; a pair that shares neither is not taken)
        const listed = (name) => (rules[name] || []).includes(p.type);
        const gcd = (x, y) => (y ? gcd(y, x % y) : x);
        for (const pool of [a, b]) {
          if (listed('lowestTerms')) pool.cards = pool.cards.filter((c) => { const f = String(c.ans).split('|').map(Number); return !(f.length === 2 && f.every(Number.isInteger) && gcd(f[0], f[1]) > 1); });
          if ((rules.avoidAns || {})[p.type]) { const re = new RegExp(rules.avoidAns[p.type]); pool.cards = pool.cards.filter((c) => !re.test(String(c.ans))); }
          // (review en.review-73) pictures no check shows; the pictures or the words a type is held to; a word no card may print;
          // a card whose answer is a number it prints (5 × ? = 25)
          const names = (c) => allPics(c).map((x) => x.split('/')[1]);
          if ((rules.avoidPictures || []).length) pool.cards = pool.cards.filter((c) => !/^[tp]:/.test(c.key) || !names(c).some((n) => rules.avoidPictures.includes(n)));
          if ((rules.onlyPictures || {})[p.type]) pool.cards = pool.cards.filter((c) => names(c).length > 0 && names(c).every((n) => rules.onlyPictures[p.type].includes(n)));
          if ((rules.avoidText || []).length) pool.cards = pool.cards.filter((c) => !/^[tp]:/.test(c.key) || !rules.avoidText.some((w) => textOf(c).toLowerCase().includes(w)));
          if ((rules.onlyText || {})[p.type]) { const re = new RegExp(rules.onlyText[p.type], 'i'); pool.cards = pool.cards.filter((c) => re.test(textOf(c))); }
          if (listed('avoidEcho')) pool.cards = pool.cards.filter((c) => !(/^\d+$/.test(String(c.ans)) && (c.given || []).includes(Number(c.ans))));
          // (review de.review-1) words spelled as they sound: one letter per sound, of a given length, without the letters a rule names
          if ((rules.plainChunks || {})[p.type]) { const pc = rules.plainChunks[p.type], not = pc.not ? new RegExp(pc.not, 'i') : null;
            const chunks = (c) => ((/data-lcs-chunks="([^"]*)"/.exec(c.html) || [])[1] || '').split('|').filter(Boolean);
            pool.cards = pool.cards.filter((c) => { const ch = chunks(c); return ch.length >= pc.min && ch.length <= pc.max && ch.every((x) => x.length === 1) && !(not && not.test(ch.join(''))); });
            for (const c of pool.cards) c.chunkCount = chunks(c).length; }
          // a kind of task named by an attribute of the card or by what its picture shows, or by its end mark
          if ((rules.kindAttr || {})[p.type]) for (const c of pool.cards) { const m = new RegExp('data-lcs-' + rules.kindAttr[p.type] + '="([^"]*)"').exec(c.html); if (m && !c.kinded) { c.kind += ' ·' + m[1]; c.kinded = 1; } }
          if (listed('kindFolder')) for (const c of pool.cards) if (!c.kinded) { const folder = (allPics(c)[0] || '').split('/')[0]; c.kind += /^(occupations|hospital|classroom)$/.test(folder) || /girl|boy/.test(allPics(c)[0] || '') ? ' ·person' : ' ·thing'; c.kinded = 1; }
          if (listed('endMark')) for (const c of pool.cards) if (!c.kinded) { c.kind += /\?/.test(textOf(c)) ? ' ·?' : ' ·.'; c.kinded = 1; }
          // (review sv.review-1) further rulings on single types: a picture a type does not show; numbers a type does not
          // print (a number another part of the unit already asks); a kind of task named by what the box prints and
          // answers (a rectangle among squares; a unit fraction); the three numbers on top of a number wall as a fact
          // of the form; a wrong choice that is close to the right one (an area one cannot tell by its size)
          if ((rules.avoidPicturesOf || {})[p.type]) pool.cards = pool.cards.filter((c) => !names(c).some((n) => rules.avoidPicturesOf[p.type].includes(n)));
          if ((rules.avoidNums || {})[p.type]) pool.cards = pool.cards.filter((c) => !(c.nums || []).some((n) => rules.avoidNums[p.type].includes(n)));
          if ((rules.kindText || {})[p.type]) { const re = new RegExp(rules.kindText[p.type], 'i'); for (const c of pool.cards) if (!c.kinded) { c.kind += re.test(textOf(c) + ' → ' + c.ans) ? ' ·1' : ' ·0'; c.kinded = 1; } }
          // (the top fact of a wall is compared with the facts the other parts of ITS form ask. It is not entered among
          // the facts — entered, it took 4 + 6 = 10 away from the part about partners of ten, which then asked 9 + 1 —
          // and it is not compared across the forms: held to that, form B was left with walls of doubles only)
          if (listed('topFact')) for (const c of pool.cards) { const n = [...new Set(String(c.ans).split('|').map(Number))].sort((x, y) => x - y); if (n.length >= 2 && n.every(Number.isInteger)) c.fact2 = 'n:' + n.join(','); }
          if ((rules.nearWrong || {})[p.type]) { const val = (s) => { const m = /(\d+) by (\d+)/.exec(s); return m ? (rules.nearWrong[p.type] === 'area' ? m[1] * m[2] : 2 * (Number(m[1]) + Number(m[2]))) : NaN; };
            pool.cards = pool.cards.filter((c) => { const v = [...c.html.matchAll(/aria-label="([^"]*)"/g)].map((m) => val(m[1])); if (v.length !== 3 || v.some(Number.isNaN)) return false; const wrong = v.slice(1).find((x) => x !== v[0]); return wrong != null && Math.abs(wrong - v[0]) <= Math.max(3, Math.round(v[0] * 0.4)); }); }
          // (review sv.review-2) a choice among strips of several lengths: the right one is never the longest, in either form
          // (a child who takes "the whole is the biggest" is otherwise right without reading the fraction)
          if (listed('notLongest')) pool.cards = pool.cards.filter((c) => { const lens = [...c.html.matchAll(/class="ws-pattern-chip"[^>]*data-lcs-len="(\d+)"/g)].map((m) => Number(m[1])); const den = Number((/data-lcs-den="(\d+)"/.exec(c.html) || [])[1]); return lens.length >= 3 && den < Math.max(...lens); });
          if (listed('pairKind')) { for (const c of pool.cards) { const g = c.given || []; c.pair = g.length === 4 ? (g[0] === g[2] ? 'top' : g[1] === g[3] ? 'bottom' : 'mixed') : 'mixed'; c.kind += ' ·' + c.pair; } pool.cards = pool.cards.filter((c) => c.pair !== 'mixed'); }
        }
        if ((listed('lowestTerms') || (rules.avoidAns || {})[p.type] || (rules.avoidPicturesOf || {})[p.type] || (rules.avoidNums || {})[p.type] || (rules.nearWrong || {})[p.type] || listed('pairKind') || (rules.onlyPictures || {})[p.type] || (rules.onlyText || {})[p.type] || (rules.plainChunks || {})[p.type] || listed('avoidEcho')) && (a.cards.length < 2 || b.cards.length < 2)) { why.push(p.type + ': the rulings leave too few cards'); continue; }
        // a task of sounds whose answer is a number only the key writes (how many syllables, how many sounds): that
        // number is its size (a part does not ask the same count twice; form B asks about as many)
        { const all = a.cards.concat(b.cards), num = (c) => c.mag === 0 && /^[tp]:/.test(c.key) && /^\d+$/.test(String(c.ans));
          if (all.every(num) && new Set(all.map((c) => c.ans)).size >= 2) for (const c of all) c.mag = Number(c.ans);
          // … and a task of words that prints ONE number to work on (13 = _ + _ + _ left over): that number
          const one = (c) => { const m = textOf(c).match(/\d+/g) || []; return c.mag === 0 && /^[tp]:/.test(c.key) && m.length >= 1 ? Number(m[0]) : 0; };
          if (all.every((c) => one(c) > 0) && new Set(all.map(one)).size >= 2) for (const c of all) c.mag = one(c); }
        { const all = a.cards.concat(b.cards); if (all.every((c) => c.chunkCount) && new Set(all.map((c) => c.chunkCount)).size >= 2) for (const c of all) c.mag = c.chunkCount; }
        { const all = a.cards.concat(b.cards); if (all.every((c) => /^[tp]:/.test(c.key) && c.mag > 0 && c.mag === all[0].mag)) for (const c of all) c.mag = 0; }
        if (listed('parity')) for (const c of a.cards.concat(b.cards)) if (c.mag > 0 && !/ (odd|even)$/.test(c.kind)) c.kind += c.mag % 2 ? ' odd' : ' even';
        // a task of words whose cards carry a count that differs from card to card (the syllables of the word to scoop):
        // the count is the size of the task, so that a part does not ask two words of one syllable and form B asks alike
        { const all = a.cards.concat(b.cards); const cnt = (c) => { const m = /data-lcs-count="(\d+)"/.exec(c.html); return m ? Number(m[1]) : 0; };
          if (all.every((c) => c.mag === 0 && /^[tp]:/.test(c.key)) && new Set(all.map(cnt)).size >= 2 && all.every((c) => cnt(c) > 0)) for (const c of all) c.mag = cnt(c); }
        // what every choice card of the type asks alike is no question (a legend all cards print)
        { const asks = a.cards.concat(b.cards).map((c) => c.ask); if (asks[0] && asks.every((x) => x === asks[0])) for (const c of a.cards.concat(b.cards)) c.ask = null; }
        if (new Set(a.cards.concat(b.cards).map((c) => c.key)).size <= 1) for (const c of a.cards.concat(b.cards)) c.key = 'v:' + c.look + '|' + c.ans;
        // how many cards a section takes: one row of a page of columns; of a one-column page two cards when two fit
        // in SECTION_MAX, else one (a check is two or three pages, not six)
        const take = (rules.take || {})[p.type] || (a.cols === 1 ? (a.cards[0].h * 2 + 14 <= SECTION_MAX ? 2 : 1) : a.cols);
        // a card that fills most of a worksheet page (a page of two big cards) is not a task of a short check
        if (Math.max(...a.cards.concat(b.cards).map((c) => c.h)) > CARD_MAX) { why.push(p.type + ': its cards are taller than ' + CARD_MAX + ' px'); continue; }
        // numbers every card of the type prints (the labels of a number line) are furniture, not the task's numbers
        const every = a.cards.concat(b.cards);
        const furniture = new Set(every.length >= 4 ? every[0].nums.filter((n) => every.every((c) => c.nums.includes(n))) : []);
        // --dump-pool=<type>[,<type>]: what the two forms may choose from, for whoever writes a ruling (out/assessments/<loc>/_pool-<type>.json)
        if (arg('dump-pool', '').split(',').includes(p.type)) fs.writeFileSync(path.join(outRoot, '_pool-' + p.type + '.json'), JSON.stringify({ A: a.cards, B: b.cards, keyStyles: a.keyStyles, styles: a.styles }, null, 1));
        const plan = { lesson: l.n, lessonTitle: l.title, point: l.point, type: p.type, typeTitle: titles.join(' · '), types: [p.type].concat(more), sources: 1 + more.length, instruction: rules.instruction[p.type] || a.instruction, perRow: a.cols === 1 ? 1 : a.cols, cols: a.cols, take, a, b, furniture, small: !!((rules.onlyPictures || {})[p.type] || (rules.plainChunks || {})[p.type]), slotWide: (rules.slotWide || {})[p.type] || null, mixKinds: listed('mixKinds'), sameAnswer: listed('sameAnswer'), disjoint: listed('disjointWords'), sameGiven: listed('sameGiven'), sameLook: listed('sameLook'), sameGap: listed('sameGap'), otherRest: listed('otherRest'), otherLead: listed('otherLead'), otherDrawings: listed('otherDrawings'), sameSize: listed('sameSize'), otherFirst: listed('otherFirst'), posA: rules.posA && p.type in rules.posA ? rules.posA[p.type] : null, disjointForm: listed('disjointForm'), avoid: rules.avoid && rules.avoid[p.type] ? rules.avoid[p.type] : [] };
        const cardsA = chooseA(plan, usedA, soloA);
        if (!cardsA.length || chooseB(plan, cardsA, new Set([...usedA, ...cardsA.map(fact).filter(Boolean)]), usedB, soloB).length < cardsA.length) { why.push(p.type + ': the two forms cannot both be filled (the same kind and size, no task twice)'); continue; }
        for (const c of cardsA) { if (fact(c)) usedA.add(fact(c)); if (solo(c)) soloA.add(solo(c)); for (const p of picsOf(c)) PICS_A.add(p); if (plan.disjointForm) for (const w of wordsOf(c)) WORDS_A.add(w); }
        plan.cardsA = cardsA;
        found = plan;
        plans.push(plan);
        break;
      }
      if (!found) { left.push(l.n); if (has('debug')) console.log('      lesson ' + l.n + ' „' + l.title + '“ has no section: ' + (why.join('; ') || 'no worksheet type')); }
    }
    // FORM B is chosen when every task of form A is known: no fact of A, of whatever part, is a task of B
    for (const plan of plans) {
      let cardsB = chooseB(plan, plan.cardsA, usedA, usedB, soloB);
      // a part of words or sounds: form B stands in another order than form A (2, 3, 1 syllables in both forms is a pattern),
      // when every box still faces a box of its kind and size
      if (cardsB.length === plan.cardsA.length && cardsB.length >= 2 && /^[tp]:/.test(cardsB[0].key)) { const turned = cardsB.slice(1).concat(cardsB[0]); if (turned.every((c, i) => c.kind === plan.cardsA[i].kind && near(c, plan.cardsA[i]))) cardsB = turned; }
      if (cardsB.length < plan.cardsA.length) { left.push(plan.lesson); left.sort((x, y) => x - y); if (has('debug')) console.log('      lesson ' + plan.lesson + ' has no section: form B cannot be filled once every task of form A is known'); continue; }
      for (const c of cardsB) { if (fact(c)) usedB.add(fact(c)); if (solo(c)) soloB.add(solo(c)); for (const p of picsOf(c)) PICS_B.add(p); if (plan.disjointForm) for (const w of wordsOf(c)) WORDS_B.add(w); }
      const meta = { styles: [...new Set(plan.a.styles.concat(plan.b.styles))], keyStyles: [...new Set(plan.a.keyStyles.concat(plan.b.keyStyles))], lesson: plan.lesson, lessonTitle: plan.lessonTitle, point: plan.point, type: plan.type, types: plan.types, typeTitle: plan.typeTitle, instruction: plan.instruction, perRow: plan.perRow, cols: plan.cols };
      sections.A.push(Object.assign({}, meta, { cards: plan.cardsA, w: plan.cardsA[0].w, h: Math.max(...plan.cardsA.map(tall)) }));
      sections.B.push(Object.assign({}, meta, { cards: cardsB, w: cardsB[0].w, h: Math.max(...cardsB.map(tall)) }));
    }
    if (sections.A.length < MIN_SECTIONS) { console.log('--    ' + u.id + ': ' + sections.A.length + ' lesson(s) with cards; no check'); fs.rmSync(dir, { recursive: true, force: true }); continue; }

    // ---- the pages: ONE packing for both forms (a part has the same number and the same page in A and in B) ----
    // how much a page holds (with the longer of the two titles) and how tall each section is in either form
    const measure = async (form) => {
      const title = tie(fill(ui.formTitle, { unit: u.title, form }));
      await load(path.join(dir, '_probe.html'), pageHtml(title, [], 1));
      const cap = await page.evaluate(() => document.querySelector('[data-lcs-body]').clientHeight);
      const tallOf = () => page.evaluate(() => [...document.querySelectorAll('.tc-section')].map((s) => Math.ceil(s.getBoundingClientRect().height)));
      await load(path.join(dir, '_probe.html'), pageHtml(title, sections[form], 1, { pageHeight: 9000 }));
      // a box that does not fit the height it was measured at without its page (a line of choices that wraps) gets the
      // height it has on its worksheet; the part is then set again
      const cut = await page.evaluate(() => [...document.querySelectorAll('.tc-section')].map((sec) => [...sec.querySelectorAll('[data-tc-unit]')].some((c) => c.scrollHeight > c.clientHeight + 2 || c.scrollWidth > c.clientWidth + 2)));
      if (cut.some(Boolean)) {
        cut.forEach((is, i) => { if (is) for (const k of ['A', 'B']) sections[k][i].h = Math.max(...sections[k][i].cards.map((c) => c.h)); });
        await load(path.join(dir, '_probe.html'), pageHtml(title, sections[form], 1, { pageHeight: 9000 }));
        const still = await page.evaluate(() => [...document.querySelectorAll('.tc-section')].map((sec) => [...sec.querySelectorAll('[data-tc-unit]')].some((c) => c.scrollHeight > c.clientHeight + 2 || c.scrollWidth > c.clientWidth + 2)));
        if (still.some(Boolean)) return { cutOff: still.map((is, i) => (is ? i : -1)).filter((i) => i >= 0) };
      }
      const child = await tallOf();
      // the key of a part can be taller than the child's page (a note for the teacher under the direction): one packing serves both
      await load(path.join(dir, '_probe.html'), pageHtml(title, sections[form], 1, { pageHeight: 9000, keyLabel: ui.keyLabel }));
      const key = await tallOf();
      // … and the key card of a box can be wider than the box of the child (a written-in answer): a part cut off there is left out too
      const keyCut = await page.evaluate(() => [...document.querySelectorAll('.tc-section')].map((sec) => [...sec.querySelectorAll('[data-tc-unit]')].some((c) => c.scrollHeight > c.clientHeight + 2 || c.scrollWidth > c.clientWidth + 2)));
      if (keyCut.some(Boolean)) return { cutOff: keyCut.map((is, i) => (is ? i : -1)).filter((i) => i >= 0) };
      return { cap, heights: child.map((h, i) => Math.max(h, key[i])) };
    };
    let mA, mB;
    for (;;) {
      mA = await measure('A'); const hBefore = JSON.stringify(sections.A.map((x) => x.h)); mB = mA.cutOff ? mA : await measure('B');
      const off = mA.cutOff || mB.cutOff;
      if (off) {
        // (the part goes; its lesson joins the lessons that are not in the check)
        for (const i of off.slice().sort((x, y) => y - x)) { const gone = sections.A[i]; if (has('debug')) console.log('      lesson ' + gone.lesson + ' has no section: a box of ' + gone.type + ' is cut off inside its card even at the size it has on its worksheet'); left.push(gone.lesson); sections.A.splice(i, 1); sections.B.splice(i, 1); }
        left.sort((x, y) => x - y);
        if (sections.A.length < MIN_SECTIONS) break;
        continue;
      }
      if (JSON.stringify(sections.A.map((x) => x.h)) !== hBefore) mA = await measure('A');
      break;
    }
    if (sections.A.length < MIN_SECTIONS) { console.log('--    ' + u.id + ': ' + sections.A.length + ' lesson(s) with cards after a part was left out; no check'); fs.rmSync(dir, { recursive: true, force: true }); continue; }
    const cap = Math.min(mA.cap, mB.cap);
    const heights = mA.heights.map((h, i) => Math.max(h, mB.heights[i]));
    if (has('debug')) console.log('      a page holds ' + cap + ' px; sections ' + heights.join(', '));
    if (heights.some((x) => x > cap)) throw new Error(u.id + ': a section is taller than a page');
    // the parts stand in the order of the lessons; a page takes sections until the next one no longer fits
    const pages = []; { let cur = [], h = -GAP; heights.forEach((x, i) => { if (cur.length && h + GAP + x > cap) { pages.push(cur); cur = []; h = -GAP; } cur.push(i); h += GAP + x; }); if (cur.length) pages.push(cur); }

    const entry = { unit: u.id, slug: u.slug, title: u.title, grade: String(u.grade), subject: u.subject, sections: sections.A.map((s, i) => ({ part: i + 1, lesson: s.lesson, lessonTitle: s.lessonTitle, point: s.point, type: s.type, types: s.types, typeTitle: s.typeTitle, cards: s.cards.length, answersA: s.cards.reduce((k, c) => k + c.answers, 0), answersB: sections.B[i].cards.reduce((k, c) => k + c.answers, 0) })), notCovered: left, forms: {} };
    for (const form of ['A', 'B']) {
      const title = tie(fill(ui.formTitle, { unit: u.title, form }));
      for (const kind of ['check', 'key']) {
        const doc = await PDFDocument.create();
        for (let pi = 0; pi < pages.length; pi++) {
          const secs = pages[pi].map((i) => sections[form][i]);
          await load(path.join(dir, '_page.html'), pageHtml(title, secs, pages[pi][0] + 1, kind === 'key' ? { keyLabel: ui.keyLabel } : null));
          if (kind === 'key') { const k = await page.evaluate(showAnswers); if (k.ringAll && has('debug')) console.log('      (key ' + form + ' page ' + (pi + 1) + ': every one of three or more neighbours is marked; right for the digit boxes of a written sum, wrong for options)'); if (k.shown !== k.answers || k.hidden) throw new Error(u.id + ' key ' + form + ' page ' + (pi + 1) + ': ' + k.shown + ' of ' + k.answers + ' answers written, ' + k.hidden + ' not visible'); }
          // T4: nothing leaves its card, no card leaves the page (measured)
          const over = await page.evaluate(() => { const b = document.querySelector('[data-lcs-body]').getBoundingClientRect(); const out = []; document.querySelectorAll('.tc-section').forEach((s) => { const r = s.getBoundingClientRect(); if (r.bottom > b.bottom + 1 || r.right > b.right + 1) out.push('part ' + s.dataset.tcPart + ' leaves the page'); s.querySelectorAll('[data-tc-unit]').forEach((c, i) => { if (c.scrollHeight > c.clientHeight + 2 || c.scrollWidth > c.clientWidth + 2) out.push('part ' + s.dataset.tcPart + ' box ' + (i + 1) + ' is cut off inside its card (needs ' + c.scrollWidth + ' × ' + c.scrollHeight + ' px, has ' + c.clientWidth + ' × ' + c.clientHeight + ')'); }); }); return out; });
          if (over.length) throw new Error(u.id + ' form ' + form + ' page ' + (pi + 1) + ': ' + over.join('; '));
          const pdf = await page.pdf({ printBackground: true, preferCSSPageSize: true });
          const src = await PDFDocument.load(pdf);
          for (const p of await doc.copyPages(src, src.getPageIndices())) doc.addPage(p);
          if (has('png')) await (await page.$('[data-lcs-page]')).screenshot({ path: path.join(dir, kind + '-' + form.toLowerCase() + '-' + (pi + 1) + '.png') });
        }
        const bytes = await doc.save();
        fs.writeFileSync(path.join(dir, kind + '-' + form.toLowerCase() + '.pdf'), bytes);
        // where the site reads them from (uploaded by scripts/units/upload-teacher-files.sh; outside every served folder)
        const tf = path.join(REPO, 'out', 'teacher-files', loc, 'checks', u.id);
        fs.mkdirSync(tf, { recursive: true });
        fs.writeFileSync(path.join(tf, kind + '-' + form.toLowerCase() + '.pdf'), bytes);
      }
      for (const f of ['_probe.html', '_page.html']) fs.rmSync(path.join(dir, f), { force: true });
      entry.forms[form] = { pages: pages.length, cards: sections[form].reduce((k, s) => k + s.cards.length, 0), sigs: sections[form].map((s) => s.cards.map((c) => crypto.createHash('sha1').update(c.key.startsWith('n:') ? c.key : s.type + '|' + c.key).digest('hex').slice(0, 16))), kinds: sections[form].map((s) => s.cards.map((c) => c.kind)), mags: sections[form].map((s) => s.cards.map((c) => c.mag)), pos: sections[form].map((s) => s.cards.map((c) => c.pos)) };
    }
    built.push(entry);
    // what a reader of the check reads first (reviews/): every box as text — its words, its pictures by name, its answer
    {
      const text = (h) => h.replace(/<style[^]*?<\/style>/g, ' ').replace(/<svg[^]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
      const pics = (h) => [...h.matchAll(/src="[^"]*?([^"\/]+)\/([^"\/]+?)(?:@\dx)?\.(?:webp|png|svg)"/g)].map((m) => decodeURIComponent(m[1] + '/' + m[2]));
      const box = (c) => { const t = textOf(c) || text(c.html).replace(/^\d+\s*/, ''), k = c.keyHtml ? text(c.keyHtml).replace(/^\d+\s*/, '') : t; return Object.assign({ text: t, pictures: pics(c.html), answer: String(c.ans) }, k !== t ? { keyText: k } : {}); };
      fs.writeFileSync(path.join(dir, 'dump.json'), JSON.stringify({ unit: u.id, title: u.title, grade: String(u.grade), subject: u.subject, notInTheCheck: left.map((n) => (u.lessons.find((l) => l.n === n) || {}).title),
        parts: sections.A.map((s, i) => ({ part: i + 1, lesson: s.lessonTitle, worksheet: s.typeTitle, type: s.type, directionReadAloud: s.instruction, formA: s.cards.map(box), formB: sections.B[i].cards.map(box) })) }, null, 1) + '\n');
    }
    console.log('ok    ' + u.id + ': ' + entry.sections.length + ' parts of ' + u.lessons.length + ' lessons, ' + entry.forms.A.cards + ' cards, ' + entry.forms.A.pages + ' + ' + entry.forms.B.pages + ' page(s)' + (left.length ? '; not in the check: lesson ' + left.join(', ') : ''));
  }
  await browser.close();
  // a run over some units (a grade, one unit) keeps what earlier runs built for the others; a unit of this run that no
  // longer gets a check is taken out; the list stands in the order of the units file
  const listFile = path.join(outRoot, 'checks.json');
  const ran = new Set(units.map((u) => u.id));
  const kept = fs.existsSync(listFile) ? JSON.parse(fs.readFileSync(listFile, 'utf8')).checks.filter((c) => !ran.has(c.unit)) : [];
  const orderOf = new Map(unitsFile.units.map((u, i) => [u.id, i]));
  const all = kept.concat(built).sort((x, y) => orderOf.get(x.unit) - orderOf.get(y.unit));
  fs.writeFileSync(listFile, JSON.stringify({ locale: loc, checks: all }, null, 1) + '\n');
  console.log(loc + ': ' + built.length + ' check(s) of ' + units.length + ' unit(s) → ' + path.relative(REPO, outRoot));
})().catch((e) => { console.error(String(e && e.stack || e)); process.exit(1); });
