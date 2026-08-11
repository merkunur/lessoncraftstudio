const http=require('http'),fs=require('fs'),path=require('path'),pup=require('puppeteer');
const ROOT=path.join(process.cwd(),'mini tools');
const MIME={'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json'};
const srv=http.createServer((q,s)=>{let f=path.join(ROOT,q.url.split('?')[0].replace(/^\/mini-tools/,''));
 fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);s.end();}else{s.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/plain'});s.end(d);}});});
srv.listen(5901,async()=>{
 const b=await pup.launch({headless:'new',args:['--no-sandbox']});const p=await b.newPage();
 await p.setViewport({width:768,height:900});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('http://localhost:5901/shape-stretcher.html',{waitUntil:'networkidle2'});
 await new Promise(r=>setTimeout(r,700));
 const r=await p.evaluate(()=>({errs:0,marks:document.querySelectorAll('.shp-tag').length,
   btns:document.querySelectorAll('.shp-btn').length,nums:document.querySelectorAll('.shp-notch').length,
   say:(document.querySelector('.shp-say')||{}).textContent,html:document.body.innerText.slice(0,90)}));
 console.log('pageerrors:',errs.length?errs:'none');
 console.log('marks='+r.marks,'buttons='+r.btns,'numerals='+r.nums);
 console.log('say:',JSON.stringify(r.say));
 await p.screenshot({path:'docs/audit-results/shape-stretcher-mount.png',fullPage:true});
 await b.close();srv.close();});
