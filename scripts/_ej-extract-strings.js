const fs=require('fs');
const lines=fs.readFileSync('mini tools/estimation-jar.js','utf8').split('\n');
const NEW=['nudgeDown10','nudgeUp10','surprise','capAria','capLabel','setBench','setOnes','benchAria','spreadAria','holdBack','printChip','gatePrint','p1Head','p1Note','p2Head','p2Note','histTitle','histAria','setRange','rangeHint','clueTen'];
const out={};
for(const line of lines){
  const t=line.trim();
  for(const k of NEW){
    if(t.indexOf(k+':')!==0) continue;
    const i=t.indexOf("{en:'");
    if(i<0) continue;
    const rest=t.slice(i+5);
    const j=rest.indexOf("',");
    out[k]= j<0 ? rest : rest.slice(0,j);
  }
}
fs.writeFileSync('.ej-new-strings.json',JSON.stringify(out,null,2));
console.log(Object.keys(out).length+'/'+NEW.length+' strings -> .ej-new-strings.json');
NEW.filter(k=>!(k in out)).forEach(k=>console.log('  MISSING '+k));
for(const k in out) console.log('  '+k.padEnd(12)+' '+out[k]);
