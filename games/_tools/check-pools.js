#!/usr/bin/env node
/* check-pools.js - the CONTENT block of a built game, checked against the pool
 * rules, by PARSING THE GAME FILE rather than trusting the comment in it.
 *
 *   node games/_tools/check-pools.js <slug>
 *
 * It exists because a comment claiming "38 conservation pairs" or "equal
 * thirds" is unverifiable prose: the reader cannot tell whether it was ever
 * true, and it silently rots the first time an item is edited. Every number
 * this prints is re-derived from the shipped data.
 *
 * Checks: 24 items / 8 per level; every value 1-10; no repeated value inside an
 * item; no 6-vs-9 pairing (that is game 002's diagnostic and borrowing it
 * re-converges the two games); every distractor within +-2 of the count (the
 * output of a tagging error - a +3 hands the item away by elimination); no two
 * items sharing a (count, distractor-set); no two sharing a layout; each
 * layout's cells summing to its count; and the rank of the correct answer
 * spread across lowest / middle / highest.
 *
 * Only games whose CONTENT rows match the { id, n, d, lay } shape are checked;
 * for anything else it reports that it parsed nothing rather than passing
 * vacuously. */
const fs=require("fs"),path=require("path");
const ROOT=path.resolve(__dirname,"..");
const slug=process.argv[2];
if(!slug){console.error("usage: check-pools.js <slug>");process.exit(2);}
const file=(fs.existsSync(slug)&&fs.statSync(slug).isFile())?slug:path.join(ROOT,slug,"index.html");
if(!fs.existsSync(file)){console.error("not found: "+file);process.exit(2);}
const src=fs.readFileSync(file,"utf8");
const re=/\{ id: "(L\d\w)", n: +(\d+), +d: \[ *(\d+), *(\d+)\], +lay: \[ *(-?\d+), *(-?\d+), *(-?\d+), *(-?\d+)\] \}/g;
const items=[];let m;
while((m=re.exec(src))) items.push({id:m[1],n:+m[2],d:[+m[3],+m[4]],lay:[+m[5],+m[6],+m[7],+m[8]]});
const rank=(n,d)=>[n,d[0],d[1]].sort((a,b)=>a-b).indexOf(n);
let bad=0; const F=(m)=>{console.log("  FAIL "+m);bad++;};
console.log("parsed "+items.length+" items from "+path.relative(ROOT,file));
if(items.length===0){console.log("  no { id, n, d, lay } CONTENT rows - nothing checked (NOT a pass)");process.exit(2);}
if(items.length!==24) F("expected 24 items");
const lvl=(id)=>+id[1];
const per={1:0,2:0,3:0}; items.forEach(i=>per[lvl(i.id)]++);
console.log("  per level: "+[1,2,3].map(L=>"L"+L+"="+per[L]).join(" "));
[1,2,3].forEach(L=>{if(per[L]!==8)F("level "+L+" has "+per[L]+" items");});
const dsets={},lays={},counts={};
for(const it of items){
  const all=[it.n,...it.d];
  for(const v of all) if(v<1||v>10) F(it.id+" value "+v+" outside 1-10");
  if(new Set(all).size!==3) F(it.id+" has a repeated value");
  if(all.includes(6)&&all.includes(9)) F(it.id+" pairs 6 with 9 (that is game 002's diagnostic)");
  for(const d of it.d){const delta=Math.abs(d-it.n);
    if(delta<1||delta>2) F(it.id+" distractor "+d+" is "+delta+" from "+it.n+" - not a tagging-error output");}
  const dk=it.n+"|"+it.d.slice().sort((a,b)=>a-b).join(",");
  (dsets[dk]=dsets[dk]||[]).push(it.id);
  const lk=it.lay.join("|")+"|n"+it.n;
  if(lays[lk]) F(it.id+" repeats the layout of "+lays[lk]); lays[lk]=it.id;
  const cells=it.lay[1]===0?it.lay[0]:it.lay[0]+it.lay[1];
  if(cells!==it.n) F(it.id+" layout holds "+cells+" cells for n="+it.n);
  (counts[it.n]=counts[it.n]||[]).push(it.id);
}
const dups=Object.entries(dsets).filter(([,v])=>v.length>1);
for(const [k,v] of dups){
  const n=+k.split("|")[0];
  // n=10 admits exactly ONE legal set under the +-2 rule, so this duplication is FORCED, not a defect.
  if(n===10) console.log("  note  "+k+" shared by "+v.join(",")+" - FORCED (n=10 has one legal set); separated by mirrored layout");
  else F("duplicate distractor set "+k+" -> "+v.join(","));
}
const t={1:[0,0,0],2:[0,0,0],3:[0,0,0]},all=[0,0,0];
items.forEach(i=>{const r=rank(i.n,i.d);t[lvl(i.id)][r]++;all[r]++;});
console.log("  rank low/mid/high  "+[1,2,3].map(L=>"L"+L+" "+t[L].join("/")).join("   ")+"   ALL "+all.join("/"));
if(Math.max(...all)-Math.min(...all)>3) F("rank distribution too skewed: "+all.join("/"));
const solo=Object.entries(counts).filter(([,v])=>v.length<2).map(([k])=>k);
console.log("  counts with no re-queue partner: "+(solo.length?solo.join(","):"none"));
console.log(bad?("\n"+bad+" FAILURES"):"\nPOOLS OK");
process.exit(bad?1:0);
