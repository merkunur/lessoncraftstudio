/* ⚠ MY OWN D2 FIX SPLIT THE LEXICON, AND IT REACHED FOR A BANNED NOUN.
   Dropping the vehicle, I reworded `instruction` and `lockedBody` to say
   "a line" while `again` still said "A different platform" — two nouns
   for one surface, which is the defect the panels catch on every tool.
   ⚠⚠ And "line" is the WORSE choice: the fence measured it TAKEN IN ALL
   ELEVEN locales, whereas PLATFORM is this tool's own free part-name and
   is already the header's first named part. The vehicle stays dropped;
   the surface keeps its name. */
'use strict';
const fs=require('fs'),path=require('path');
const P=path.join(__dirname,'..','mini tools','the-queue.js');
let s=fs.readFileSync(P,'utf8');
const sub=(a,b)=>{if(s.indexOf(a)<0)throw new Error('MISSING: '+a.slice(0,60));
 if(s.split(a).length-1!==1)throw new Error('NOT UNIQUE: '+a.slice(0,60));s=s.split(a).join(b);};
sub("Some are standing in a line. Pick an end","Some are standing on the platform. Pick an end");
sub("The whole apparatus is free — every line, both ends","The whole apparatus is free — every platform, both ends");
sub("which carries the line the class was looking at","which carries the platform the class was looking at");
fs.writeFileSync(P,s);
delete require.cache[require.resolve(P)];
const T=require(P),bad=[];
const all=JSON.stringify(T.strings);
if(!T.strings.again)bad.push('NON-VACUITY: strings missing');
if(/\bbus\b/i.test(all))bad.push('the vehicle came back');
if(/\ba line\b|every line\b|the line the class/i.test(all))bad.push('the banned noun survives');
if(!/platform/i.test(T.strings.instruction.en))bad.push('instruction lost the part-name');
const n=(all.match(/platform/gi)||[]).length;
if(n<4)bad.push('NON-VACUITY: only '+n+' platform mentions — lexicon not unified');
if(bad.length){console.log('FAILED:\n  '+bad.join('\n  '));process.exit(1);}
console.log('lexicon unified on PLATFORM ('+n+' mentions); vehicle stays dropped; "line" (taken in all 11) removed');
