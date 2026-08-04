/* live-verify-ten-frame.js — drives the REAL tool on production, in all
   eleven locales. Never "it mounts": it taps the seventh cell and
   demands the tray fall to three, which is the tool's whole thesis. */
'use strict';
const puppeteer=require('puppeteer');
const BASE='https://www.lessoncraftstudio.com';
const LOCS=['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
let PASS=0,FAIL=0; const fails=[];
const is=(c,m)=>{if(c)PASS++;else{FAIL++;fails.push(m);}};
(async()=>{
  for(const loc of LOCS){
    const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});  /* fresh browser per locale */
    const pg=await b.newPage();
    await pg.setViewport({width:1024,height:900});
    const errs=[]; pg.on('pageerror',e=>errs.push(e.message));
    await pg.goto(`${BASE}/mini-tools/ten-frame.html?lang=${loc}`,{waitUntil:'networkidle0',timeout:60000});
    await pg.waitForSelector('.tnf-cell',{timeout:30000});
    const before=await pg.evaluate(()=>({cells:document.querySelectorAll('.tnf-cell').length,
      tray:Number(document.querySelector('.tnf-tray').dataset.left),
      title:document.querySelector('.lcs-title').textContent}));
    /* DRIVE IT — a real click on the seventh cell */
    await pg.evaluate(()=>document.querySelectorAll('.tnf-cell')[6].click());
    await new Promise(r=>setTimeout(r,300));
    const after=await pg.evaluate(()=>({filled:document.querySelectorAll('.tnf-cell[data-filled="1"]').length,
      tray:Number(document.querySelector('.tnf-tray').dataset.left),
      ghosts:document.querySelectorAll('.tnf-cell[data-filled="0"] .tnf-ghost').length,
      trayAria:document.querySelector('.tnf-tray').getAttribute('aria-label')}));
    is(before.cells===10,`${loc}: ten cells (${before.cells})`);
    is(before.tray===10,`${loc}: tray opens full (${before.tray})`);
    is(after.filled===7,`${loc}: one tap fills seven (${after.filled})`);
    is(after.tray===3,`${loc}: ⭐ the tray falls to three — the thesis (${after.tray})`);
    is(after.ghosts===3,`${loc}: three ghosts remain (${after.ghosts})`);
    is(errs.length===0,`${loc}: no page errors ${JSON.stringify(errs.slice(0,1))}`);
    console.log(`[${loc}] "${before.title}" · 7 in, ${after.tray} left · ${after.trayAria}`);
    await b.close();
  }
  console.log(`\nlive-verify-ten-frame: ${PASS} passed, ${FAIL} failed`);
  if(FAIL){console.error('FAILURES:');fails.forEach(f=>console.error('  '+f));process.exit(1);}
  console.log('PASS — live on production, driven in all eleven locales');
})();
