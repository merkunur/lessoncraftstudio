const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer');
const ROOT=path.join(__dirname,'..');
const MIME={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'};
function serve(){const roots=[path.join(ROOT,'mini tools'),path.join(ROOT,'frontend','public')];
 const srv=http.createServer((req,res)=>{const rel=decodeURIComponent(req.url.split('?')[0]).replace(/^\/mini-tools\//,'/').replace(/^\//,'');
  for(const r of roots){const f=path.join(r,rel);if(fs.existsSync(f)&&fs.statSync(f).isFile()){res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});return fs.createReadStream(f).pipe(res);}}
  res.writeHead(404);res.end('nf');});
 return new Promise(r=>srv.listen(0,()=>r({srv,port:srv.address().port})));}
(async()=>{const{srv,port}=await serve();
 const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
 for(const w of [360,768,1024,1440,2560]){
  const p=await b.newPage();
  await p.setViewport({width:w,height:Math.round(w*0.62),deviceScaleFactor:1});
  await p.goto('http://127.0.0.1:'+port+'/wodb.html?lang=en&embed=1',{waitUntil:'networkidle2'});
  await p.waitForSelector('.wdb-grid',{timeout:15000});
  await new Promise(r=>setTimeout(r,700));
  const m=await p.evaluate(()=>{
   const q=s=>document.querySelector(s);
   const r=e=>e?e.getBoundingClientRect():null;
   const app=r(q('.lcs-app')),grid=r(q('.wdb-grid')),dock=r(q('.wdb-dock')),cell=r(q('.wdb-cell'));
   return {app:app&&Math.round(app.height),grid:grid&&Math.round(grid.width),
    cell:cell&&Math.round(cell.width),dockBottom:dock&&Math.round(dock.bottom),
    vh:window.innerHeight, docH:Math.round(document.documentElement.scrollHeight),
    instr:!!q('.lcs-instruction')&&getComputedStyle(q('.lcs-instruction')).display};
  });
  console.log(String(w).padStart(5)+'  app '+String(m.app).padStart(5)+'  board '+String(m.grid).padStart(4)+
   '  cell '+String(m.cell).padStart(4)+'  dockBottom '+String(m.dockBottom).padStart(5)+
   '  docH '+String(m.docH).padStart(5)+'  shell-instr '+m.instr);
  await p.close();
 }
 await b.close();srv.close();})();
