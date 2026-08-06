const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer');
const REPO='C:/Users/rkgen/lessoncraftstudio',MINI=path.join(REPO,'mini tools'),IMG=path.join(REPO,'image-library-webp');
const OUT=path.join(REPO,'docs','audit-results','syllable-splitter','qa');
const MIME={'.js':'text/javascript','.css':'text/css','.json':'application/json','.html':'text/html','.webp':'image/webp'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);let f;
 if(p.startsWith('/mini-tools/'))f=path.join(MINI,p.slice(12));
 else if(p.startsWith('/image-library-webp/'))f=path.join(IMG,p.slice(20));
 else f=path.join(MINI,p.replace(/^\//,''));
 fs.readFile(f,(e,b)=>{if(e){r.statusCode=404;return r.end();}r.setHeader('Content-Type',MIME[path.extname(f)]||'application/octet-stream');r.end(b);});});
(async()=>{await new Promise(r=>srv.listen(0,r));const P=srv.address().port;
const br=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
const pg=await br.newPage();const errs=[];pg.on("requestfailed",r=>errs.push("404 "+r.url()));pg.on('response',r=>{if(r.status()>=400)errs.push('HTTP '+r.status()+' '+r.url())});pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
await pg.setViewport({width:704,height:1000});
await pg.goto(`http://127.0.0.1:${P}/mini-tools/syllable-splitter.html?lang=en`,{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,900));
const st=await pg.evaluate(()=>({
  clap:!!document.querySelector('.ss-clap'), drum:!!document.querySelector('.ss-drum'),
  wordVisible:!!document.querySelector('.ss-wordrow'), beats:document.querySelectorAll('.ss-beat').length,
  pill:(document.querySelector('.ss-pill-value')||{}).textContent,
  eyebrow:(document.querySelector('.ss-pill-eyebrow')||{}).textContent,
  cue:(document.querySelector('.ss-cue')||{}).textContent,
  seg:[...document.querySelectorAll('.ss-segbtn')].map(b=>b.textContent),
  sortLocked:!!document.querySelector('.ss-sortbtn.ss-locked'),
}));
console.log('AT REST:',JSON.stringify(st,null,1));
await pg.screenshot({path:path.join(OUT,'AFTER-rest-704.png')});
// tap drum twice
await pg.click('.ss-drum'); await new Promise(r=>setTimeout(r,250));
await pg.click('.ss-drum'); await new Promise(r=>setTimeout(r,350));
const t2=await pg.evaluate(()=>({beats:document.querySelectorAll('.ss-beat').length,word:!!document.querySelector('.ss-wordrow')}));
console.log('AFTER 2 TAPS:',JSON.stringify(t2));
await pg.screenshot({path:path.join(OUT,'AFTER-2taps-704.png')});
// reveal
await pg.evaluate(()=>{[...document.querySelectorAll('.ss-ghostbtn')][0].click()});
await new Promise(r=>setTimeout(r,700));
const t3=await pg.evaluate(()=>({word:(document.querySelector('.ss-wordrow')||{}).textContent,arcs:document.querySelectorAll('.ss-arc').length,
 arcStroke:document.querySelector('.ss-arc')?document.querySelector('.ss-arc').getAttribute('stroke-width'):null}));
console.log('AFTER REVEAL:',JSON.stringify(t3));
await pg.screenshot({path:path.join(OUT,'AFTER-revealed-704.png')});
console.log('ERRORS:',errs.length?errs.slice(0,5):'none');
await br.close();srv.close();})();
