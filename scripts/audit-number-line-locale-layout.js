/* =====================================================================
   audit-number-line-locale-layout.js — 11 locales x 6 widths, MEASURED
   ---------------------------------------------------------------------
   Run:  node scripts/audit-number-line-locale-layout.js

   66 renders, all of them measured; nothing is sampled. Exists because
   German compounds and Finnish agglutination break what English fits,
   and because `cold-line` overflowed 900px in es/pt/it/nl ONLY while
   English sat comfortably inside.

   ⚠ IT DRIVES THE TOOL INTO ITS LONGEST STATE FIRST — gate panel open,
   the wall hint showing (the longest of the five), and every numeral on.
   Measuring the opening frame measures the easiest cell in the grid.
   ⚠ FRESH BROWSER PER LOCALE, not a fresh page: a stale locale leaks
   through a shared context.
   ⚠ Containment is measured against the CARD (`.lcs-app`), not against
   an inner box whose own overflow would absorb the evidence.
   ===================================================================== */

'use strict';
const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer');
const ROOT=path.join('C:','Users','rkgen','lessoncraftstudio','mini tools');const PORT=5574;
http.createServer((rq,rs)=>{const f=rq.url.split('?')[0].replace('/mini-tools/','');const fp=path.join(ROOT,f);
if(!fs.existsSync(fp)){rs.writeHead(404);rs.end('x');return;}
const t=f.endsWith('.js')?'application/javascript':f.endsWith('.json')?'application/json':f.endsWith('.css')?'text/css':'text/html';
rs.writeHead(200,{'Content-Type':t});rs.end(fs.readFileSync(fp));}).listen(PORT);
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const LOC=['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
const W=[320,360,412,768,1024,1366];
(async()=>{
let fails=0,cells=0;
for(const loc of LOC){
  // fresh browser per locale
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
  let worst=null;
  for(const w of W){
    const p=await b.newPage();const errs=[];
    p.on('pageerror',e=>errs.push(String(e)));
    await p.setViewport({width:w,height:900});
    await p.goto(`http://127.0.0.1:${PORT}/number-line.html?lang=${loc}&embed=1`,{waitUntil:'domcontentloaded'});
    await p.waitForSelector('.nl-wrap');await wait(250);
    // drive into the LONGEST state: gate open + wall hint + all numerals
    const m=await p.evaluate(()=>{
      const T=window.NumberLine;
      T.st=T._st({max:20,start:0,hop:3,n:6});T._numStop=0;T._paint();T._showGate();
      const card=document.querySelector('.lcs-app').getBoundingClientRect();
      let over=[],tiny=[],small=[];
      document.querySelectorAll('.nl-wrap *').forEach(e=>{
        const r=e.getBoundingClientRect();if(!r.width)return;
        if(r.right>card.right+0.5||r.left<card.left-0.5) over.push(e.className||e.tagName);
        const fs=parseFloat(getComputedStyle(e).fontSize);
        if(e.children.length===0&&e.textContent.trim()&&fs<14) tiny.push((e.className||e.tagName)+'@'+fs);
      });
      document.querySelectorAll('.nl-chip,.nl-range,.nl-grip').forEach(e=>{
        const r=e.getBoundingClientRect();
        if(Math.min(r.width,r.height)<44) small.push((e.className||'')+' '+Math.min(r.width,r.height).toFixed(0));
      });
      const nums=[...document.querySelectorAll('.nl-num')].map(e=>{const r=e.getBoundingClientRect();return{x:r.x,w:r.width};}).sort((a,c)=>a.x-c.x);
      let ov=0;for(let i=1;i<nums.length;i++) if(nums[i].x<nums[i-1].x+nums[i-1].w) ov++;
      const wrap=document.querySelector('.nl-wrap').getBoundingClientRect();
      return{over:over.slice(0,3),tiny:tiny.slice(0,3),small:small.slice(0,3),numOverlap:ov,
             bottomVsCard:+(wrap.bottom-card.bottom).toFixed(0),
             hint:document.querySelector('.nl-hint').textContent.slice(0,30),
             gate:!!document.querySelector('.nl-gate')};
    });
    cells++;
    const bad=[];
    if(m.over.length)bad.push('OVERFLOW '+m.over.join(','));
    if(m.tiny.length)bad.push('TINY '+m.tiny.join(','));
    if(m.small.length)bad.push('TAP<44 '+m.small.join(','));
    if(m.numOverlap)bad.push('NUMS OVERLAP');
    if(m.bottomVsCard>0)bad.push('CUT OFF by '+m.bottomVsCard+'px');
    if(!m.gate)bad.push('GATE MISSING');
    if(errs.length)bad.push('JSERR');
    if(bad.length){fails++;if(!worst)worst=w+': '+bad.join('; ');}
    await p.close();
  }
  console.log((worst?'FAIL ':'ok   ')+loc+(worst?'   '+worst:''));
  await b.close();
}
console.log('\n'+(fails?'FAIL':'PASS')+'  '+(cells-fails)+'/'+cells+' cells clean (11 locales x 6 widths, gate open, wall state)');
process.exit(fails?1:0);
})();
