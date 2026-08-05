/* Does each control have a CONSEQUENCE, not merely liveness?
   audit-tool-control-liveness scores a control green if the DOM changed —
   and a control that highlights ITSELF changes the DOM. This asks what
   each one changes ELSEWHERE. */
const http=require('http'),fs=require('fs'),path=require('path'),puppeteer=require('puppeteer');
const ROOT=path.join(__dirname,'..');
const MIME={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'};
function serve(){const roots=[path.join(ROOT,'mini tools'),path.join(ROOT,'frontend','public')];
 const srv=http.createServer((q,s)=>{const rel=decodeURIComponent(q.url.split('?')[0]).replace(/^\/mini-tools\//,'/').replace(/^\//,'');
  for(const r of roots){const f=path.join(r,rel);if(fs.existsSync(f)&&fs.statSync(f).isFile()){s.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});return fs.createReadStream(f).pipe(s);}}
  s.writeHead(404);s.end('nf');});
 return new Promise(r=>srv.listen(0,()=>r({srv,port:srv.address().port})));}
let FAIL=0;const fail=m=>{FAIL++;console.log('  FAIL '+m)};const ok=m=>console.log('  ok   '+m);
(async()=>{const{srv,port}=await serve();
 const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
 const p=await b.newPage();
 await p.setViewport({width:1024,height:900});
 await p.evaluateOnNewDocument(()=>{try{localStorage.setItem('accessToken','x')}catch(e){}});
 await p.setRequestInterception(true);
 p.on('request',r=>{ if(r.url().indexOf('/api/auth/me')>=0) return r.respond({status:200,contentType:'application/json',
   body:JSON.stringify({user:{subscriptionTier:'full'},subscription:{status:'active'}})}); r.continue();});
 await p.goto('http://127.0.0.1:'+port+'/wodb.html?lang=en',{waitUntil:'networkidle2'});
 await p.waitForSelector('.wdb-grid');
 await new Promise(r=>setTimeout(r,900));
 const title=()=>p.evaluate(()=>document.querySelector('.wdb-nametitle').textContent);
 const cells=()=>p.evaluate(()=>[...document.querySelectorAll('.wdb-cell')].map(c=>c.getAttribute('aria-label')).join('|'));
 const click=fk=>p.evaluate(k=>{const b=document.querySelector('[data-fk="'+k+'"]');
   if(!b) throw new Error('no control data-fk='+k); if(b.disabled) throw new Error('disabled: '+k); b.click();},fk);

 // NEXT must change the GRID, not just its own class
 const t0=await title(), c0=await cells();
 await click('next'); await new Promise(r=>setTimeout(r,400));
 const t1=await title(), c1=await cells();
 // BOTH must move: the title AND the four accessible names. Comparing
 // only the title would pass a tool that renamed the chip and drew the
 // same board; comparing only the labels caught a REAL defect, that
 // picture cells had no accessible name and so read identically on
 // every picture grid.
 if(t1===t0) fail('Next grid did not change the grid title ("'+t0+'" -> "'+t1+'")');
 else if(c1===c0) fail('Next grid changed the title but the four accessible names are IDENTICAL — '+
   'the cells are unnamed, so a screen reader cannot tell the grids apart: "'+c0+'"');
 else ok('Next grid changes the board: "'+t0+'" -> "'+t1+'"');

 // PREV must return to it
 await click('prev'); await new Promise(r=>setTimeout(r,400));
 const t2=await title();
 if(t2!==t0) fail('Previous did not return to "'+t0+'" (got "'+t2+'")'); else ok('Previous returns to the grid before');

 // PREV at the START OF THE DECK must be disabled, not a silent no-op.
 // ⚠ MY FIRST VERSION ASSERTED THIS RIGHT HERE AND FAILED A CORRECT TOOL:
 // it assumed the weekly featured grid sits at deck position 0. It does
 // not — the K deck is in payload order and this week's grid is the
 // fifth of eight. Walk to the actual start first, then ask.
 for (let i=0;i<12;i++){
   const dis=await p.evaluate(()=>document.querySelector('[data-fk="prev"]').disabled);
   if(dis) break;
   await click('prev'); await new Promise(r=>setTimeout(r,220));
 }
 const d0=await p.evaluate(()=>document.querySelector('[data-fk="prev"]').disabled);
 if(!d0) fail('Previous never becomes disabled — the deck has no start');
 else ok('Previous is disabled at the start of the deck (walked there)');

 // KEYBOARD: the presenter clicker
 const t3a=await title();
 await p.keyboard.press('ArrowRight'); await new Promise(r=>setTimeout(r,400));
 const t3=await title();
 if(t3===t3a) fail('ArrowRight did nothing — a presenter remote cannot drive the tool');
 else ok('ArrowRight advances (a presenter remote drives it): "'+t3a+'" -> "'+t3+'"');
 await p.keyboard.press('ArrowLeft'); await new Promise(r=>setTimeout(r,400));
 if(await title()!==t3a) fail('ArrowLeft did not go back'); else ok('ArrowLeft goes back');

 // R toggles the reasons
 const rv0=await p.evaluate(()=>!!document.querySelector('.wdb-revealarea'));
 await p.keyboard.press('r'); await new Promise(r=>setTimeout(r,400));
 const rv1=await p.evaluate(()=>!!document.querySelector('.wdb-revealarea'));
 if(rv0===rv1) fail('R did not toggle the reasons'); else ok('R toggles the reasons');
 await p.keyboard.press('r'); await new Promise(r=>setTimeout(r,300));

 // LIFT must surface the closing chip — the consequence elsewhere
 const vis=()=>p.evaluate(()=>{const c=document.querySelector('[data-fk="closing"]');return c?getComputedStyle(c).display!=='none':null;});
 if(vis()!==null){}
 const before=await vis();
 await p.evaluate(()=>document.querySelectorAll('.wdb-cell')[0].click());
 await new Promise(r=>setTimeout(r,250));
 const after=await vis();
 if(before!==false||after!==true) fail('lifting a cell did not surface the closing chip (before='+before+' after='+after+')');
 else ok('lifting a cell surfaces the closing move');

 await b.close(); srv.close();
 console.log(FAIL?'\nFAIL '+FAIL:'\nPASS — every control has a consequence elsewhere');
 process.exit(FAIL?1:0);
})();
