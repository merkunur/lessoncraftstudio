/* dump the keys that are English-only, as the SOURCE the native panels audit */
const fs=require('fs'),path=require('path');
const W=require(path.join(__dirname,'..','mini tools','wodb.js'));
const LOC=['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
const out={};
for(const k of Object.keys(W.strings)){
  const e=W.strings[k];
  const missing=LOC.filter(l=>!e[l]);
  if(missing.length) out[k]=e.en;
}
fs.writeFileSync(path.join(__dirname,'_wodb-new-strings-en.json'),JSON.stringify(out,null,2));
console.log(Object.keys(out).length+' keys need all 11 locales');
