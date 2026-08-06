const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer');
const REPO=path.join(__dirname,'..'),MINI=path.join(REPO,'mini tools'),IMG=path.join(REPO,'image-library-webp');
const MIME={'.js':'text/javascript','.css':'text/css','.json':'application/json','.html':'text/html','.webp':'image/webp'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);let f;
 if(p.startsWith('/mini-tools/'))f=path.join(MINI,p.slice(12));else if(p.startsWith('/image-library-webp/'))f=path.join(IMG,p.slice(20));else f=path.join(MINI,p.replace(/^\//,''));
 fs.readFile(f,(e,b)=>{if(e){r.statusCode=404;return r.end();}r.setHeader('Content-Type',MIME[path.extname(f)]||'application/octet-stream');r.end(b);});});
(async()=>{await new Promise(r=>srv.listen(0,r));const P=srv.address().port;
const br=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
for(const w of [720,860,1000,1100,1280,1440]){
 const pg=await br.newPage();await pg.setViewport({width:w,height:900});
 await pg.goto(`http://127.0.0.1:${P}/mini-tools/syllable-splitter.html?lang=en&embed=compact`,{waitUntil:'networkidle0'});
 await pg.waitForSelector('.ss-clap',{timeout:8000}).catch(()=>{});
 await pg.evaluate(()=>{const d=document.querySelector('.ss-drum');d.click();d.click();});
 await new Promise(r=>setTimeout(r,330));
 await pg.evaluate(()=>{document.querySelectorAll('.ss-ghostbtn')[0].click()});
 await new Promise(r=>setTimeout(r,450));
 const m=await pg.evaluate(()=>{const s=document.querySelector('.lcs-stage')||document.querySelector('#lcs-root');
  const r=s.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height)};});
 console.log(`viewport ${String(w).padStart(4)} -> stage ${m.w}x${m.h}  aspect ${(m.h/m.w).toFixed(3)} ${(m.h/m.w)<=0.85?'OK (no crop)':'CROPS'}`);
 await pg.close();}
await br.close();srv.close();})();
