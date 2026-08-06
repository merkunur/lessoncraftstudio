const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer');
const REPO=path.join(__dirname,'..'),MINI=path.join(REPO,'mini tools'),IMG=path.join(REPO,'image-library-webp');
const MIME={'.js':'text/javascript','.css':'text/css','.json':'application/json','.html':'text/html','.webp':'image/webp'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);let f;
 if(p.startsWith('/mini-tools/'))f=path.join(MINI,p.slice(12));else if(p.startsWith('/image-library-webp/'))f=path.join(IMG,p.slice(20));else f=path.join(MINI,p.replace(/^\//,''));
 fs.readFile(f,(e,b)=>{if(e){r.statusCode=404;return r.end();}r.setHeader('Content-Type',MIME[path.extname(f)]||'application/octet-stream');r.end(b);});});
(async()=>{await new Promise(r=>srv.listen(0,r));const P=srv.address().port;
const br=await puppeteer.launch({headless:'new',args:['--no-sandbox']});const pg=await br.newPage();
await pg.setViewport({width:900,height:1100});
await pg.goto(`http://127.0.0.1:${P}/mini-tools/syllable-splitter.html?lang=en`,{waitUntil:'networkidle0'});
await pg.waitForSelector('.ss-clap');await new Promise(r=>setTimeout(r,300));
await pg.click('.ss-pill');await new Promise(r=>setTimeout(r,250));
await pg.evaluate(()=>{[...document.querySelectorAll('.ss-tab')].find(t=>/my words/i.test(t.textContent)).click()});
await new Promise(r=>setTimeout(r,200));
await pg.type('.ss-ed-area','Amara');await pg.click('.ss-ed-btn');await new Promise(r=>setTimeout(r,350));
const dom=await pg.evaluate(()=>[...document.querySelector('.ss-desk-body').children].map((c,i)=>{
 const r=c.getBoundingClientRect();const cs=getComputedStyle(c);
 return {i,cls:c.className,top:Math.round(r.top),bottom:Math.round(r.bottom),h:Math.round(r.height),pos:cs.position,txt:(c.textContent||'').slice(0,34)};}));
console.log(JSON.stringify(dom,null,1));
// overlap check
for(let a=0;a<dom.length;a++)for(let b=a+1;b<dom.length;b++){
 if(dom[a].bottom>dom[b].top+1) console.log(`OVERLAP: [${dom[a].i}] ${dom[a].cls} bottom=${dom[a].bottom} vs [${dom[b].i}] ${dom[b].cls} top=${dom[b].top}`);}
await br.close();srv.close();})();
