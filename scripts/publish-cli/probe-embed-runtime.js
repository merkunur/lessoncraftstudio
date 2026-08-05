#!/usr/bin/env node
/**
 * probe-embed-runtime.js — END-TO-END proof that an embed URL actually works
 * as an embed, rather than merely existing.
 *
 * WHY THIS EXISTS. The embed snippet baked into deck.html had its iframe `src`
 * silently repointed at the deck's LANDING page by a canonical rewrite. Every
 * string-level check passes on that: the snippet is well-formed, the URL
 * resolves 200, the page renders. It is only wrong at RUNTIME —
 *
 *   · the landing never calls postMessage, so the snippet's auto-resize
 *     listener never fires and the iframe is frozen at its fallback ratio;
 *   · the landing never detects being framed, so it renders the full site
 *     header and footer inside the teacher's own page.
 *
 * So this probe does what a teacher's blog does: it builds a real parent page
 * carrying the REAL snippet markup, loads it, and measures what the parent
 * actually receives.
 *
 * Usage:
 *   node scripts/publish-cli/probe-embed-runtime.js --url=<absolute URL>
 *   node scripts/publish-cli/probe-embed-runtime.js --deck=en/more-less-around-the-house
 *   node scripts/publish-cli/probe-embed-runtime.js --deck=... --expect=fail
 *
 * `--expect=fail` inverts the exit code, so the landing URL (which MUST fail)
 * can be asserted in the same breath as the deck URL that must pass. That is
 * the control: a probe that has never been seen failing is indistinguishable
 * from one that cannot fail.
 *
 * Exit 0 when the outcome matches --expect (default `pass`), else 1.
 */
const puppeteer = require('puppeteer');

const HOST = 'https://www.lessoncraftstudio.com';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);

const EXPECT = String(args.expect || 'pass');
let target = args.url;
if (!target && args.deck) {
  const [loc, slug] = String(args.deck).split('/');
  target = `${HOST}/${loc}/decks/${slug}/`;
}
if (!target) {
  console.error('need --url=<abs> or --deck=<locale>/<slug>');
  process.exit(2);
}

/* The parent page is the teacher's site: the snippet's own markup, verbatim —
   a sized iframe plus the tiny listener the snippet ships. Nothing here is
   privileged; it is exactly what a WordPress paste produces. */
function parentPage(src) {
  return `<!doctype html><meta charset="utf-8"><title>host</title>
<body style="margin:0">
<div style="max-width: 800px; margin: 0 auto;">
  <iframe id="probe" title="t" src="${src}" frameborder="0"
    style="display:block;width:100%;max-width:800px;aspect-ratio:800 / 1000;border:1px solid #e0d8c5;border-radius:8px;"></iframe>
</div>
<script>
window.__msgs = [];
window.addEventListener('message', function (e) {
  if (!e.data || e.data.type !== 'lcs-embed-resize') return;
  window.__msgs.push({ height: e.data.height, url: e.data.url });
  var f = document.getElementById('probe');
  if (e.data.url && f.src && e.data.url.split('?')[0] !== f.src.split('?')[0]) return;
  f.style.aspectRatio = 'auto';
  f.style.height = e.data.height + 'px';
});
</script>
</body>`;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 900 });

  // Serve the synthetic parent from the same origin as the iframe, so nothing
  // here depends on cross-origin quirks that a real blog would not share.
  await page.setRequestInterception(true);
  const PARENT_URL = `${HOST}/__probe_parent__`;
  page.on('request', (req) => {
    if (req.url() === PARENT_URL) {
      req.respond({ status: 200, contentType: 'text/html; charset=utf-8', body: parentPage(target) });
    } else {
      req.continue();
    }
  });

  await page.goto(PARENT_URL, { waitUntil: 'networkidle2', timeout: 120000 });
  // The deck emits on load and again via ResizeObserver; give it room.
  await new Promise((r) => setTimeout(r, 6000));

  const res = await page.evaluate(() => {
    const f = document.getElementById('probe');
    const cs = getComputedStyle(f);
    return {
      messages: window.__msgs.length,
      firstHeight: window.__msgs[0] ? window.__msgs[0].height : null,
      postedUrl: window.__msgs[0] ? window.__msgs[0].url : null,
      inlineHeight: f.style.height || null,
      aspectRatio: cs.aspectRatio,
      renderedHeight: Math.round(f.getBoundingClientRect().height),
    };
  });

  /* Inside the frame: did the embedded document recognise it is framed?
     ⚠ NON-VACUITY. An earlier version asked `display !== 'none'` on a possibly
     ABSENT element, so "hidden" and "not there at all" both scored as
     not-visible — the check could report success on a page it had never
     measured. Presence and visibility are now reported separately, and the
     chrome verdict is only meaningful when the chrome EXISTS. */
  let framed = { chromePresent: null, chromeVisible: null, embeddedClass: null, ok: false };
  /* ⚠ Select the frame BY URL. Iterating every child frame and keeping the last
     result silently measured whichever frame happened to come last — which is
     how this reported `lcs-embedded: false` for a deck that was demonstrably
     posting resize messages from the very block that sets that class. */
  const bare = (u) => String(u || '').split('?')[0].replace(/\/$/, '');
  const targetFrames = page.frames().filter((fr) => fr !== page.mainFrame() && bare(fr.url()) === bare(target));
  if (targetFrames.length !== 1) {
    console.log(`(frame selection: ${targetFrames.length} frames matched the target URL; ` +
      `all child frames: ${page.frames().filter((f) => f !== page.mainFrame()).map((f) => f.url()).join(', ') || 'none'})`);
  }
  for (const fr of targetFrames) {
    try {
      framed = await fr.evaluate(() => {
        const header = document.getElementById('lcs-site-chrome');
        const footer = document.getElementById('lcs-site-footer');
        const shown = (el) => !!el && getComputedStyle(el).display !== 'none';
        return {
          embeddedClass: document.body.classList.contains('lcs-embedded'),
          chromePresent: !!header || !!footer,
          chromeVisible: shown(header) || shown(footer),
          ok: true,
        };
      });
    } catch { /* frame detached */ }
  }

  const resized = res.messages > 0 && !!res.inlineHeight && res.aspectRatio === 'auto';
  // Chrome only counts against the target when it is actually in the document.
  const noChrome = framed.chromePresent === false || framed.chromeVisible === false;
  const pass = resized && noChrome;

  console.log(`target                     : ${target}`);
  console.log(`resize messages received   : ${res.messages}` + (res.postedUrl ? `  (posted url: ${res.postedUrl})` : ''));
  console.log(`iframe height set from msg : ${res.inlineHeight || '(never set)'}`);
  console.log(`aspect-ratio released      : ${res.aspectRatio}`);
  console.log(`rendered height            : ${res.renderedHeight}px`);
  console.log(`body.lcs-embedded set      : ${framed.embeddedClass}`);
  console.log(`site chrome in document    : ${framed.chromePresent}`);
  console.log(`site chrome VISIBLE inside : ${framed.chromeVisible}`);
  console.log(`\nVERDICT: ${pass ? 'WORKS as an embed' : 'BROKEN as an embed'}`);

  await browser.close();

  const matched = EXPECT === 'fail' ? !pass : pass;
  if (!matched) {
    console.log(`\n✖ expected ${EXPECT.toUpperCase()}, got ${pass ? 'PASS' : 'FAIL'}`);
    process.exit(1);
  }
  console.log(`✔ matches --expect=${EXPECT}`);
})().catch((e) => {
  console.error('probe-embed-runtime: ' + e.message);
  process.exit(2);
});
