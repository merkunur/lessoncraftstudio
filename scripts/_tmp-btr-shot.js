const puppeteer=require('puppeteer');const http=require('http');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..','mini tools');
const srv=http.createServer((rq,rs)=>{let f=rq.url.split('?')[0].replace('/mini-tools/','');while(f[0]==='/')f=f.slice(1);if(!f)f='baking-tray.html';
const fp=path.join(ROOT,f);if(!fs.existsSync(fp)){rs.writeHead(404);rs.end('x');return;}
const t=f.endsWith('.js')?'application/javascript':f.endsWith('.json')?'application/json':f.endsWith('.css')?'text/css':'text/html';
rs.writeHead(200,{'Content-Type':t});rs.end(fs.readFileSync(fp));}).listen(5601);
(async()=>{const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
for(const [w,h,tag,drive] of [[768,1000,'a-whole-768',null],[768,1000,'b-cracked-768','crack'],[360,820,'c-cracked-360','crack'],[1024,1000,'d-10x10-1024','big']]){
  const p=await b.newPage();await p.setViewport({width:w,height:h,deviceScaleFactor:2});
  const errs=[];p.on('pageerror',e=>errs.push(String(e)));
  await p.goto('http://127.0.0.1:5601/mini-tools/baking-tray.html?lang=en&embed=1',{waitUntil:'load'});
  await p.waitForSelector('.btr-wrap',{timeout:15000});await new Promise(r=>setTimeout(r,500));
  if(drive==='crack'){await p.evaluate(()=>{const T=window.BakingTray;T.st=T.crack(T.st,'row',5);T._paint();});await new Promise(r=>setTimeout(r,400));}
  if(drive==='big'){await p.evaluate(()=>{const T=window.BakingTray;T.st=T.newState(10,10);T._paint();});await new Promise(r=>setTimeout(r,400));}
  await p.screenshot({path:`docs/audit-results/baking-tray/qa/${tag}.png`});
  if(errs.length)console.log('ERRORS',tag,errs[0]);
  await p.close();console.log('shot',tag);}
await b.close();srv.close();})();
