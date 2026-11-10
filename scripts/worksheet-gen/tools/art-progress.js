#!/usr/bin/env node
/**
 * art-progress.js: the owner's page of every redrawn picture that has passed review (docs/makers/art-passed.json), grouped by theme.
 *   node scripts/worksheet-gen/tools/art-progress.js <out.html>
 */
'use strict';
const path = require('path'), fs = require('fs');
const sharp = require('sharp');
const W = path.join(__dirname, '..'), ROOT = path.join(W, '..', '..'), DRAWN = path.join(W, 'art-src', 'drawn');
const man = JSON.parse(fs.readFileSync(path.join(W, 'cache', 'manifest.json'), 'utf8'));
const passed = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'makers', 'art-passed.json'), 'utf8')));
const OUT = process.argv[2];
// awaiting the owner's look: passed but not yet accepted, or accepted and changed since (unlocked for a fix)
const accepted = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'makers', 'art-accepted.json'), 'utf8')));
const locked = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'makers', 'art-lock.json'), 'utf8')).files || {};
const fresh = new Set([...passed].filter((n) => !accepted.has(n) || !locked[n]));
const human = (s) => s.replace(/_friend$/, '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const themeOf = {};
for (const [theme, t] of Object.entries(man.themes)) for (const [n, e] of Object.entries(t.nouns)) if (e.fl) themeOf[n] = human(theme.replace(/ bw( \d+)?$/, ''));
(async () => {
  const groups = {}, fresher = [];
  let count = 0;
  for (const n of passed) {
    const b = await sharp(path.join(DRAWN, n + '.svg'), { density: 200 }).flatten({ background: '#fff' }).resize(512, 512, { fit: 'contain', background: '#fff' }).webp({ quality: 80 }).toBuffer();
    const it = { name: human(n), src: 'data:image/webp;base64,' + b.toString('base64') };
    if (fresh.has(n)) fresher.push(it); else (groups[themeOf[n] || 'Other'] = groups[themeOf[n] || 'Other'] || []).push(it);
    count++;
  }
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const card = (it) => `<li><button type="button" class="card" aria-label="Enlarge ${esc(it.name)}"><img src="${it.src}" alt="${esc(it.name)}" width="512" height="512" decoding="async"><span>${esc(it.name)}</span></button></li>`;
  const top = fresher.length ? `<section class="fresh"><h2>New since your last look <small>${fresher.length}</small></h2><ul>${fresher.sort((a, b) => a.name.localeCompare(b.name)).map(card).join('')}</ul></section>` : '';
  const body = top + Object.keys(groups).sort().map((t) => `<section><h2>${esc(t)} <small>${groups[t].length}</small></h2><ul>${groups[t].sort((a, b) => a.name.localeCompare(b.name)).map((it) => `<li><button type="button" class="card" aria-label="Enlarge ${esc(it.name)}"><img src="${it.src}" alt="${esc(it.name)}" width="512" height="512" decoding="async"><span>${esc(it.name)}</span></button></li>`).join('')}</ul></section>`).join('');
  const html = `<title>Redraw Progress</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@500;700;800&display=swap">
<style>
/* the site's own look. Layout: a contact sheet per theme */
:root { --bg:#FBF3E4; --fg:#2E2E2E; --muted:#5F5A52; --accent:#146B5E; --hot:#F2784B; --line:#E6DCCB; --display:'Baloo 2','Trebuchet MS',sans-serif; --body:'Nunito','Segoe UI',sans-serif }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#16201E; --fg:#F1EDE4; --muted:#B5AFA3; --accent:#5CC4B2; --line:#33413E; color-scheme:dark } }
:root[data-theme="dark"] { --bg:#16201E; --fg:#F1EDE4; --muted:#B5AFA3; --accent:#5CC4B2; --line:#33413E; color-scheme:dark }
body { background:var(--bg); color:var(--fg); font:500 16px/1.5 var(--body); padding-left:max(16px,env(safe-area-inset-left,0px)); padding-right:max(16px,env(safe-area-inset-right,0px)); padding-block:28px 48px }
.wrap { max-width:1240px; margin:0 auto }
h1 { font:700 clamp(30px,5vw,44px)/1.1 var(--display); margin:0 0 6px }
.wrap > p { margin:0; color:var(--muted); max-width:62ch }
h2 { font:700 26px/1.2 var(--display); margin:28px 0 12px; color:var(--accent) }
h2 small { font:700 15px var(--body); color:var(--muted) }
ul { list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(auto-fill,minmax(170px,1fr)); gap:10px }
.card { display:flex; flex-direction:column; width:100%; padding:0; border:1px solid var(--line); border-radius:12px; overflow:hidden; background:#FFFFFF; color:#2E2E2E; cursor:zoom-in; font:800 14px/1.25 var(--body) }
.card img { display:block; width:100%; height:auto; aspect-ratio:1 }
.card span { padding:6px 8px 8px; text-align:center; border-top:1px solid #EFE8DB }
.fresh { border:2px solid var(--hot); border-radius:16px; padding:2px 14px 16px; margin-top:20px }
.fresh h2 { color:var(--hot) }
.card:focus-visible, #close:focus-visible { outline:3px solid var(--hot); outline-offset:2px }
dialog { border:0; border-radius:16px; padding:14px; background:#FFFFFF; color:#2E2E2E; width:min(620px,calc(100vw - 32px)) }
dialog::backdrop { background:rgba(0,0,0,.6) }
dialog img { display:block; width:100%; height:auto; aspect-ratio:1 }
#close { display:block; margin:8px 0 0 auto; font:800 15px 'Nunito','Segoe UI',sans-serif; color:#FFFFFF; background:#146B5E; border:0; border-radius:10px; padding:8px 16px; cursor:pointer }
</style>
<div class="wrap"><h1>Redraw Progress</h1><p>${count} of 435 drawings have passed review. A drawing appears here only after it passes. Tap one to see it larger.</p><main>${body}</main></div>
<dialog id="big"><img id="bigimg" alt=""><button id="close" type="button">Close</button></dialog>
<script>
(function(){var d=document.getElementById('big'),i=document.getElementById('bigimg');
document.querySelector('main').addEventListener('click',function(e){var b=e.target.closest('.card');if(!b)return;var m=b.querySelector('img');i.src=m.src;i.alt=m.alt;d.showModal();});
document.getElementById('close').addEventListener('click',function(){d.close();});d.addEventListener('click',function(e){if(e.target===d)d.close();});})();
</script>
`;
  fs.writeFileSync(OUT, html);
  console.log(count, 'drawings,', (html.length / 1048576).toFixed(2), 'MB');
})();
