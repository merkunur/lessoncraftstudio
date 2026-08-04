/* Merge native-panel JSON into the tool's one-line-per-key strings block.
   ⚠ Surgical, per (key,locale): the fanout script's line contract is that
   each key is ONE physical line with `<loc>:'...'` on it. Reflowing the
   block would un-anchor every self-anchoring mutation needle. */
const fs=require('fs');
const P='mini tools/estimation-jar.js';
let s=fs.readFileSync(P,'utf8');
const locales=process.argv.slice(2);
if(!locales.length){console.error('usage: _ej-apply-panels.js <loc> [loc...]');process.exit(1)}
let applied=0, skipped=[], problems=[];
for(const loc of locales){
  const f='.ej-panel-'+loc+'.json';
  if(!fs.existsSync(f)){skipped.push(loc+' (no file)');continue}
  const panel=JSON.parse(fs.readFileSync(f,'utf8'));
  for(const key of Object.keys(panel)){
    const val=panel[key];
    if(val.indexOf("'")>=0){problems.push(loc+'.'+key+' contains a straight apostrophe');continue}
    const i=s.indexOf('\n    '+key+':');
    if(i<0){problems.push(loc+'.'+key+' key not in tool');continue}
    const end=s.indexOf('\n',i+1);
    let line=s.slice(i+1,end);
    // placeholder parity against en, before writing anything
    const en=(line.match(/en:'([^']*)'/)||[])[1]||'';
    const ph=(t)=>((t.match(/\{[a-z]+\}/g)||[]).sort().join(','));
    if(ph(en)!==ph(val)){problems.push(loc+'.'+key+' placeholder drift: en['+ph(en)+'] vs '+loc+'['+ph(val)+']');continue}
    const re=new RegExp("(,"+loc+":')([^']*)(')");
    if(!re.test(line)){problems.push(loc+'.'+key+' locale slot not found');continue}
    line=line.replace(re,'$1'+val.replace(/\$/g,'$$$$')+'$3');
    s=s.slice(0,i+1)+line+s.slice(end);
    applied++;
  }
}
if(problems.length){console.error('PROBLEMS — nothing written:');problems.forEach(p=>console.error('  '+p));process.exit(1)}
fs.writeFileSync(P,s);
console.log(applied+' locale values applied'+(skipped.length?'; skipped: '+skipped.join(', '):''));
