const puppeteer=require('puppeteer'),path=require('path');
const OUT=path.join(__dirname,'..','docs','audit-results','syllable-splitter','qa');
(async()=>{const br=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
for(const [w,h,tag] of [[704,1000,'LIVE-embed-704'],[1280,900,'LIVE-projector-1280']]){
 const p=await br.newPage();await p.setViewport({width:w,height:h});
 await p.goto('https://www.lessoncraftstudio.com/mini-tools/syllable-splitter.html?lang=de&embed=1',{waitUntil:'networkidle2',timeout:60000});
 await p.waitForSelector('.ss-clap',{timeout:20000}).catch(()=>{});
 await new Promise(r=>setTimeout(r,900));
 await p.click('.ss-drum');await new Promise(r=>setTimeout(r,300));
 await p.click('.ss-drum');await new Promise(r=>setTimeout(r,300));
 await p.evaluate(()=>document.querySelector('.ss-ghostbtn').click());
 await new Promise(r=>setTimeout(r,700));
 await p.screenshot({path:path.join(OUT,tag+'.png')});
 console.log('shot '+tag);await p.close();}
await br.close();})();
