/* =====================================================================
   CONSEQUENCE PROBE — TOOL #55, THE MISSING QUESTION
   ---------------------------------------------------------------------
   Run:  node scripts/probe-missing-question.js

   ⚠⚠ THIS GATE ASKS THE ONE QUESTION NO OTHER GATE ON THE SHELF ASKS:
   NOT "did the control act?" but "WHAT DID IT CHANGE ELSEWHERE, and what
   did it leave alone?"

   `audit-tool-control-liveness` asks whether the DOM changed, and a
   control whose only effect is its own highlight class changes the DOM —
   which is how #39 shipped a numeral strip that scored 84/84 while its
   entire consequence in 1067 lines was its own `aria-pressed`. This
   build had the same defect on its first run of THIS script: the size
   steppers changed the model and moved nothing on screen, because at
   stage zero every slip is empty by law, the lattice is sized from the
   BAND rather than the value, and the say-line returned the same fixed
   sentence either way. A teacher pressed `+` in front of a class and
   nothing happened. Nine other gates were green.

   ⚠ HALF THE ASSERTIONS HERE ARE NEGATIVE, and they are the half that
   matters. A control is defined as much by what it must NOT disturb —
   telling one niche must not rewrite the other, counting must not
   rewrite what was told, and a refused move must move nothing at all.

   ⚠⚠ REAL POINTER INPUT ONLY. Nothing here calls page.evaluate to set
   state. #54's headline branch shipped unreachable under 626 model
   assertions, and #41's flag shipped INVISIBLE while eleven scripts
   asserted `!!querySelector` and never once drove it.

   ⚠ GEOMETRY IS NOT THIS GATE'S JOB. Containment, overlap, the 12px
   well floor, the 44px tap floor and the height-identity law are all
   asserted by `audit-missing-question-locale-layout.js` across 11
   locales x 6 viewports x 3 arrangements x 2 bands — 396 cells, far more
   than a single-locale probe could cover. Duplicating them here would
   buy nothing and would rot separately.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.MISSING_QUESTION_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
/* ⚠ env-overridable: a hard-coded port makes the gate unrunnable while a
   sibling gate holds it, and "cannot bind" is indistinguishable from
   "failed" at a glance. */
const PORT = Number(process.env.MISSING_QUESTION_PORT) || 5682;

/* 704 is the real desktop surface — `max-w-3xl` (768) minus `md:px-8`
   (2x32) — and it does not grow at 1440, 1920 or 2560. 360 is the phone.
   A gate that runs only standalone photographs a surface nobody visits. */
const WIDTHS = [704, 360];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'missing-question.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

/* ------------------------------------------------------------------ */
/* THE SIGNATURE. Everything here is read from the RENDERED DOM — never
   from a model field, never from a class name that means "should be".
   #44 shipped a mirrored side profile because its oracle counted cubes
   in the same index order the renderer drew them in, and both sides of
   the comparison carried the identical bug. */
const SIG = () => {
  const q = s => document.querySelector(s);
  const niches = [].slice.call(document.querySelectorAll('.mqu-niche'));
  const btn = k => q('.mqu-b-' + k);
  return {
    states: niches.map(n => n.getAttribute('data-state')),
    slips: [].slice.call(document.querySelectorAll('.mqu-slip')).map(s => s.textContent),
    on: document.querySelectorAll('.mqu-ct.is-on').length,
    say: (q('.mqu-say') || {}).textContent || '',
    dir: (q('.mqu-stand') || { getAttribute: () => null }).getAttribute('data-dir'),
    printing: document.body.classList.contains('mqu-printing'),
    off: ['deal', 'link', 't0', 't1', 't2', 'count', 'recount', 'print', 'tup', 'tdown']
      .reduce((o, k) => { const b = btn(k); if (b) o[k] = b.classList.contains('is-off'); return o; }, {}),
    pressed: ['link', 't0', 't1', 't2', 'count']
      .reduce((o, k) => { const b = btn(k); if (b) o[k] = b.getAttribute('aria-pressed'); return o; }, {})
  };
};

const J = v => JSON.stringify(v);

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let checks = 0; const fails = [];
  const bad = m => { fails.push(m); };

  for (const W of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width: W, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/missing-question.html?lang=en`,
      { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.mqu-niche', { timeout: 15000 });
    await new Promise(r => setTimeout(r, 400));

    /* ⚠ A SCRIPTED INTERACTION MUST FAIL LOUDLY WHEN IT DOES NOT HAPPEN.
       #39's harness had a click helper that quietly returned false on a
       disabled control, and the very next assertion — "the toggle is not
       swapped" — passed because nothing had been toggled. */
    /* ⚠ AND IT MUST SCROLL FIRST. The standalone page is 1181px tall at
       704 and 1399px at 360, against an 900px window, so half the column
       starts below the fold — `page.mouse.click` at page coordinates
       silently lands on whatever is at that VIEWPORT position instead.
       Four failures in this gate's first run were that, not the tool.
       (On the real surface there is no fold: `ActivityIframe` grows the
       iframe to the content height. And standalone, `body` computes
       `overflow: hidden auto` — the four-declaration scroll escape this
       tool keeps deliberately — so a teacher can reach it too. That is
       measured below, not assumed.)

       ⚠ Scrolling is NOT allowed to cost the occlusion check: this still
       asserts the element under the click point is the control itself,
       which is what would catch a #22-class control buried under an
       absolutely positioned sibling. */
    const press = async (sel) => {
      const el = await page.$(sel);
      if (!el) throw new Error(`NO SUCH CONTROL: ${sel} (at ${W}px)`);
      await page.evaluate(s => {
        const e = document.querySelector(s);
        if (e && e.scrollIntoView) e.scrollIntoView({ block: 'center', inline: 'center' });
      }, sel);
      await new Promise(r => setTimeout(r, 60));
      const hit = await page.evaluate(s => {
        const e = document.querySelector(s);
        const b = e.getBoundingClientRect();
        if (b.width < 1 || b.height < 1) return { ok: false, why: 'zero-sized' };
        const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
        if (cy < 0 || cy > innerHeight || cx < 0 || cx > innerWidth) {
          return { ok: false, why: 'OFF-SCREEN EVEN AFTER SCROLLING — physically unreachable' };
        }
        const top = document.elementFromPoint(cx, cy);
        if (!top || !(top === e || e.contains(top))) {
          return { ok: false, why: 'OCCLUDED by .' + (top ? String(top.className).slice(0, 40) : 'nothing') };
        }
        return { ok: true, x: cx, y: cy };
      }, sel);
      if (!hit.ok) throw new Error(`CONTROL NOT HITTABLE: ${sel} (at ${W}px) — ${hit.why}`);
      await page.mouse.click(hit.x, hit.y);
      await new Promise(r => setTimeout(r, 260));
    };
    const sig = () => page.evaluate(SIG);

    /* every case runs from a DEAL, so the start state is deterministic
       and a case can never inherit the previous case's leftovers */
    const fromDeal = async () => { await press('.mqu-b-deal'); return sig(); };

    /* --- the assertion pair. `changed` names what MUST move, `held`
       names what must NOT. A case that only asserts `changed` is the
       liveness gate again, wearing a probe's hat. --- */
    const T = (name, a, b, changed, held) => {
      checks++;
      const moved = changed.filter(k => J(a[k]) !== J(b[k]));
      if (moved.length !== changed.length) {
        const dead = changed.filter(k => J(a[k]) === J(b[k]));
        bad(`${W}px · ${name}: NO CONSEQUENCE on ${dead.join(', ')} — `
          + `before ${dead.map(k => k + '=' + J(a[k])).join(' ')}`);
      }
      checks++;
      const disturbed = held.filter(k => J(a[k]) !== J(b[k]));
      if (disturbed.length) {
        bad(`${W}px · ${name}: DISTURBED ${disturbed.map(k =>
          `${k} ${J(a[k])} -> ${J(b[k])}`).join('; ')}`);
      }
    };

    /* ============ 1. the steppers say what they did ============ */
    let a = await fromDeal();
    await press('.mqu-b-tup');
    let b = await sig();
    T('total + (stage 0)', a, b, ['say'], ['states', 'slips', 'on', 'printing']);

    a = b; await press('.mqu-b-tdown'); b = await sig();
    T('total − (stage 0)', a, b, ['say'], ['states', 'slips', 'on', 'printing']);

    /* ============ 2. linking marks the places, and only that ======= */
    a = await fromDeal();
    await press('.mqu-b-link'); b = await sig();
    T('link', a, b, ['states', 'pressed'], ['slips', 'on', 'printing']);
    checks++;
    if (b.states.indexOf('marked') < 0) {
      bad(`${W}px · link: nothing became "marked" — ${J(b.states)}`);
    }

    /* the same button walks it back — there is no separate undo */
    a = b; await press('.mqu-b-link'); b = await sig();
    T('unlink', a, b, ['states', 'pressed'], ['slips', 'on', 'printing']);
    checks++;
    if (b.states.some(s => s !== 'empty')) {
      bad(`${W}px · unlink: did not return to three empty places — ${J(b.states)}`);
    }

    /* ============ 3. telling one place must not rewrite another ==== */
    a = await fromDeal();
    await press('.mqu-b-link');
    const linked = await sig();
    /* the two tellable places are the ones whose buttons are live */
    const tellable = ['t0', 't1', 't2'].filter(k => linked.off[k] === false);
    checks++;
    if (tellable.length !== 2) {
      bad(`${W}px · exactly two places should be tellable once linked, `
        + `${tellable.length} are — ${J(linked.off)}`);
    }
    if (tellable.length === 2) {
      const [first, second] = tellable;
      const iFirst = Number(first[1]), iSecond = Number(second[1]);

      a = linked; await press('.mqu-b-' + first); b = await sig();
      T(`tell ${first}`, a, b, ['states', 'slips', 'pressed'], ['on', 'printing']);
      checks++;
      if (!b.slips[iFirst]) bad(`${W}px · tell ${first}: its slip stayed empty`);
      checks++;
      if (b.slips[iSecond] !== '') {
        bad(`${W}px · tell ${first}: WROTE THE OTHER PLACE — `
          + `slip ${iSecond} = ${J(b.slips[iSecond])}`);
      }

      /* toggling back must erase only its own numeral */
      const told1 = b;
      await press('.mqu-b-' + first); const untold = await sig();
      T(`untell ${first}`, told1, untold, ['states', 'slips'], ['on', 'printing']);
      checks++;
      if (untold.slips[iFirst] !== '') {
        bad(`${W}px · untell ${first}: the numeral survived — ${J(untold.slips[iFirst])}`);
      }

      /* ============ 4. counting, and the numeral-leak law ========= */
      await press('.mqu-b-' + first);
      await press('.mqu-b-' + second);
      const asked = await sig();
      checks++;
      if (asked.states.indexOf('ask') < 0) {
        bad(`${W}px · after both tellings no place is asking — ${J(asked.states)}`);
      }
      checks++;
      if (asked.on !== 0) {
        bad(`${W}px · ⚠⚠ THE ANSWER IS COUNTED OUT BEFORE ANYONE COUNTED IT `
          + `— ${asked.on} counters are on at the "ask" stage`);
      }
      checks++;
      if (asked.slips.filter(s => s !== '').length !== 2) {
        bad(`${W}px · ⚠⚠ NUMERAL LEAK — ${asked.slips.filter(s => s !== '').length} `
          + `slips carry a numeral at the "ask" stage, expected exactly 2 — ${J(asked.slips)}`);
      }

      a = asked; await press('.mqu-b-count'); b = await sig();
      T('count', a, b, ['states', 'on', 'pressed'], ['slips', 'printing']);
      checks++;
      if (b.on < 1) bad(`${W}px · count: no counter was seated — on=${b.on}`);

      /* ⚠ RECOUNT'S CONSEQUENCE IS A TRANSIENT, AND A BEFORE/AFTER
         SNAPSHOT IS STRUCTURALLY BLIND TO IT. It takes the counters OFF
         and puts them BACK so the class can count again, so its resting
         state is identical by design — the first version of this gate
         reported a correct tool as consequence-free. The consequence is
         real and it is the emptying, so that is what gets measured:
         sample continuously across the whole cycle and require the
         count to have reached ZERO at some point and returned. */
      const before = b.on;
      const seen = await page.evaluate(async (sel) => {
        const e = document.querySelector(sel);
        const b2 = e.getBoundingClientRect();
        e.scrollIntoView({ block: 'center' });
        const r = e.getBoundingClientRect();
        const ev = o => new MouseEvent(o, { bubbles: true, cancelable: true,
          clientX: r.x + r.width / 2, clientY: r.y + r.height / 2 });
        void b2;
        e.dispatchEvent(ev('mousedown')); e.dispatchEvent(ev('mouseup')); e.dispatchEvent(ev('click'));
        const seenCounts = [];
        for (let i = 0; i < 40; i++) {
          seenCounts.push(document.querySelectorAll('.mqu-ct.is-on').length);
          await new Promise(r2 => setTimeout(r2, 25));
        }
        return { min: Math.min.apply(null, seenCounts), last: seenCounts[seenCounts.length - 1] };
      }, '.mqu-b-recount');
      checks++;
      if (seen.min !== 0) {
        bad(`${W}px · recount: the counters never came off — the class is `
          + `given no chance to count again (min seen ${seen.min} of ${before})`);
      }
      checks++;
      if (seen.last !== before) {
        bad(`${W}px · recount: ended at ${seen.last} counters, started at ${before}`);
      }
      b = await sig();

      /* ============ 5. A REFUSED MOVE MOVES NOTHING =============== */
      await press('.mqu-b-count');
      const counted = await sig();
      checks++;
      if (counted.off.tup !== true) {
        bad(`${W}px · the total stepper looks LIVE while the model refuses it `
          + `— the recorded #54 defect`);
      }
      /* it is still clickable by design (a dead control teaches nothing),
         so pressing it must produce a REASON and no change */
      a = counted; await press('.mqu-b-tup'); b = await sig();
      T('total + (refused)', a, b, ['say'],
        ['states', 'slips', 'on', 'printing', 'pressed']);
    }

    /* ============ 6. the apparatus and the column are one tool ===== */
    await fromDeal();
    await press('.mqu-b-link');
    const beforeNiche = await sig();
    const liveNiche = beforeNiche.states.reduce((acc, s, i) =>
      (acc === -1 && beforeNiche.off['t' + i] === false ? i : acc), -1);
    checks++;
    if (liveNiche < 0) {
      bad(`${W}px · no tellable niche to press directly`);
    } else {
      await press(`.mqu-niche[data-i="${liveNiche}"]`);
      const afterNiche = await sig();
      T('press the niche itself', beforeNiche, afterNiche,
        ['states', 'slips'], ['on', 'printing']);
      checks++;
      if (afterNiche.pressed['t' + liveNiche] !== 'true') {
        bad(`${W}px · ⚠ pressing the apparatus did not move the COLUMN — `
          + `the two paths have drifted apart (the recorded counting-cups defect)`);
      }
    }

    /* ============ 7. a free visitor never reaches the paper ========
       ⚠ `body.mqu-printing` ALONE IS A VACUOUS INSTRUMENT. The tool adds
       it, calls `window.print()`, and an `afterprint` listener takes it
       off again — and headless Chrome returns from `window.print()`
       immediately, so the class is gone before any snapshot sees it. A
       check that reads it after the fact reports "not printing" whether
       the sheet opened or not. Record the CALL instead. */
    await fromDeal();
    await page.evaluate(() => {
      window.__mquPrints = 0;
      const real = window.print;
      window.print = function () { window.__mquPrints++; return real && undefined; };
    });
    a = await sig();
    await press('.mqu-b-print');
    b = await sig();
    const prints = await page.evaluate(() => window.__mquPrints);
    checks++;
    if (prints !== 0 || b.printing) {
      bad(`${W}px · ⚠⚠ THE PAID SHEET OPENED WITHOUT AN ENTITLEMENT — `
        + `window.print() called ${prints}x, body.mqu-printing=${b.printing}`);
    }
    T('print (locked)', a, b, ['say'], ['states', 'slips', 'on']);

    /* ============ 8. the standalone page can actually be scrolled ===
       ⚠ MEASURED, NOT ASSUMED. #22 shipped a phone-standalone layout
       886px tall in a 568px window with `scrollY` pinned at 0 and the
       reveal control physically unreachable. This tool is 1181px tall at
       704 and 1399px at 360, so the escape is load-bearing — and a
       computed `overflow` is not proof that scrolling WORKS. Drive it. */
    const scroll = await page.evaluate(async () => {
      const doc = document.scrollingElement || document.documentElement;
      const tall = doc.scrollHeight > innerHeight + 4;
      if (!tall) return { tall: false, moved: true };
      window.scrollTo(0, doc.scrollHeight);
      await new Promise(r => setTimeout(r, 80));
      const y = doc.scrollTop || window.scrollY || 0;
      window.scrollTo(0, 0);
      return { tall: true, moved: y > 4, y: Math.round(y) };
    });
    checks++;
    if (scroll.tall && !scroll.moved) {
      bad(`${W}px · ⚠⚠ THE PAGE IS TALLER THAN THE WINDOW AND WILL NOT SCROLL `
        + `— every control below the fold is unreachable standalone (scrollTop stuck at ${scroll.y})`);
    }

    /* ============ 9. every act is a real, focusable button ========= */
    const notButtons = await page.evaluate(() =>
      [].slice.call(document.querySelectorAll('.mqu-btn, .mqu-niche'))
        .filter(e => e.tagName !== 'BUTTON')
        .map(e => e.className));
    checks++;
    if (notButtons.length) {
      bad(`${W}px · not a <button>, so dead to a keyboard: ${J(notButtons)}`);
    }

    await page.close();
  }

  await browser.close();
  srv.close();

  console.log('');
  if (fails.length) {
    console.log(`FAIL  ${checks} consequence checks, ${fails.length} failures`);
    fails.forEach(f => console.log('  ✗ ' + f));
    process.exit(1);
  }
  console.log(`PASS — ${checks} consequence checks across ${WIDTHS.join(', ')}px.`);
  console.log('  Every control moved something ELSEWHERE, and left alone what it must.');
})().catch(e => {
  srv.close();
  console.log('FAIL — ' + e.message);
  process.exit(1);
});
