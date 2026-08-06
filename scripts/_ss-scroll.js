const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer');
const REPO=path.join(__dirname,'..'),MINI=path.join(REPO,'mini tools'),IMG=path.join(REPO,'image-library-webp');
const MIME={'.js':'text/javascript','.css':'text/css','.json':'application/json','.html':'text/html','.webp':'image/webp'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);let f;
 if(p.startsWith('/mini-tools/'))f=path.join(MINI,p.slice(12));else if(p.startsWith('/image-library-webp/'))f=path.join(IMG,p.slice(20));else f=path.join(MINI,p.replace(/^\//,''));
 fs.readFile(f,(e,b)=>{if(e){r.statusCode=404;return r.end();}r.setHeader('Content-Type',MIME[path.extname(f)]||'application/octet-stream');r.end(b);});});
(async()=>{await new Promise(r=>srv.listen(0,r));const P=srv.address().port;
const br=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
for(const v of [[320,568],[360,640],[360,740],[412,820],[768,700]]){
 const pg=await br.newPage();await pg.setViewport({width:v[0],height:v[1]});
 await pg.goto(`http://127.0.0.1:${P}/mini-tools/syllable-splitter.html?lang=en`,{waitUntil:'networkidle0'});
 await pg.waitForSelector('.ss-clap',{timeout:8000}).catch(()=>{});
 await pg.evaluate(()=>{const d=document.querySelector('.ss-drum');d.click();d.click();document.querySelectorAll('.ss-ghostbtn')[0].click();});
 await new Promise(r=>setTimeout(r,500));
 const m=await pg.evaluate(()=>{
   const doc=document.documentElement, b=document.body;
   const app=document.querySelector('.lcs-app');
   const lowest=[...document.querySelectorAll('.ss-wrap button, .ss-wrap .ss-card')]
     .map(e=>e.getBoundingClientRect().bottom).reduce((a,c)=>Math.max(a,c),0);
   // can the user actually reach it?
   window.scrollTo(0, 99999);
   const scrolled = window.scrollY;
   return {vh:doc.clientHeight, appH:Math.round(app.getBoundingClientRect().height),
     bodyOverflow:getComputedStyle(b).overflowY, docScrollH:doc.scrollHeight,
     lowest:Math.round(lowest), scrolled:Math.round(scrolled)};});
 const reachable = m.lowest <= m.vh + m.scrolled + 2;
 console.log(`${String(v[0])}x${v[1]}  app=${m.appH}  viewport=${m.vh}  lowest control bottom=${m.lowest}  body overflow=${m.bodyOverflow}  scrollY max=${m.scrolled}  -> ${reachable?'REACHABLE':'*** UNREACHABLE ***'}`);
 await pg.close();}
await br.close();srv.close();})();
