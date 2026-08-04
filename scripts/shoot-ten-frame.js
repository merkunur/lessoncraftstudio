/* shoot-ten-frame.js — renders for the eye, not for an assertion. */
'use strict';
const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer');
const ROOT=path.join(__dirname,'..','mini tools');
const OUT=path.join(__dirname,'..','.scratch','tnf');
const PORT=5584;
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
const srv=http.createServer((req,res)=>{
  const f=path.join(ROOT,decodeURIComponent(req.url.split('?')[0]).replace(/^\/mini-tools/,''));
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end('nf');}
  res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/plain'});res.end(fs.readFileSync(f));
});
const SHOTS=[
  {w:360,h:820,field:1,fill:7,name:'360-ten-7'},
  {w:768,h:900,field:1,fill:7,name:'768-ten-7'},
  {w:1024,h:900,field:1,fill:7,name:'1024-ten-7'},
  {w:1024,h:900,field:3,fill:13,name:'1024-twenty-13'},
  {w:1024,h:900,field:2,fill:7,name:'1024-tenrow-7'},
  {w:1366,h:900,field:4,fill:13,name:'1366-twentypair-13'},
];
(async()=>{
  fs.mkdirSync(OUT,{recursive:true});
  await new Promise(r=>srv.listen(PORT,r));
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
  for(const s of SHOTS){
    const pg=await b.newPage();
    await pg.setViewport({width:s.w,height:s.h,deviceScaleFactor:2});
    await pg.goto(`http://127.0.0.1:${PORT}/ten-frame.html?lang=en`,{waitUntil:'networkidle0'});
    await pg.waitForSelector('.tnf-cell');
    await pg.evaluate(i=>document.querySelectorAll('.tnf-fieldchip')[i].click(),s.field);
    await new Promise(r=>setTimeout(r,150));
    await pg.evaluate(n=>{document.querySelectorAll('.tnf-cell')[n-1].click();},s.fill);
    await new Promise(r=>setTimeout(r,250));
    await pg.screenshot({path:path.join(OUT,s.name+'.png')});
    await pg.close();
    console.log('shot',s.name);
  }
  await b.close();srv.close();
})();
