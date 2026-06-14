'use strict';
const fs = require('fs'), path = require('path');
const I = __dirname, ROOT = path.join(I, '..', '..', '..');
const LOCALES = ['de','es','fr','it','pt','nl','sv','da','no','fi'];
const LIT_IDS = ['K-221','K-222','K-223','K-224','K-225','K-226','K-227','K-228','K-229','K-230','K-231','K-232','K-233','K-234','K-235'];
const SCI_IDS = ['K-201','K-202','K-203','K-204','K-205','K-206','K-207','K-208','K-209','K-210','K-211','K-212','K-213','K-214','G1-201','G1-202','G1-203','G1-204','G1-205','G1-206','G1-207'];
const LIT_FAMS = ['beginning-sounds','letter-knowledge','word-building','picture-vocabulary','phonological-awareness'];
const SCI_FAMS = ['science-sort','science-sequence','science-match'];
const rj = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const enS = rj(path.join(I,'strings.en.json')), enSk = rj(path.join(I,'skill-sentences.en.json'));
const tax = rj(path.join(ROOT,'frontend','config','topics-taxonomy.json')).axes['exercise-type'];
const cat = rj(path.join(I,'..','data','literacy','category-vocab.json'));
const lk = rj(path.join(I,'..','data','literacy','letter-knowledge.json'));
const sciDir = path.join(I,'..','data','science');
const sciFiles = fs.readdirSync(sciDir).filter(f=>f.endsWith('.json'));

for (const loc of LOCALES) {
  const S = rj(path.join(I,'strings.'+loc+'.json'));
  const Sk = fs.existsSync(path.join(I,'skill-sentences.'+loc+'.json')) ? rj(path.join(I,'skill-sentences.'+loc+'.json')) : {};
  const b = { locale: loc, _instructions: 'Review the <loc> fields for native naturalness, K-2 register, terminology, grammar. en_* = English source for meaning only.', literacy:{strings:{},families:{},categoryLabels:{},vcLabels:{}}, science:{strings:{},families:{},binLabels:{}} };
  for (const id of LIT_IDS) b.literacy.strings[id] = { en_title:enS[id]&&enS[id].title, loc_title:S[id]&&S[id].title, en_instruction:enS[id]&&enS[id].instruction, loc_instruction:S[id]&&S[id].instruction };
  for (const f of LIT_FAMS) b.literacy.families[f] = { en_name:tax[f]&&tax[f].name.en, loc_name:tax[f]&&tax[f].name[loc], loc_slug:tax[f]&&tax[f].slug[loc], en_skill:enSk[f]&&enSk[f].full, loc_skill_full:Sk[f]&&Sk[f].full, loc_skill_short:Sk[f]&&Sk[f].short };
  for (const bin of cat.bins) b.literacy.categoryLabels[bin.key] = { en:bin.label.en, loc:bin.label[loc] };
  b.literacy.vcLabels = { vowels:{en:lk.vcLabels.vowels.en, loc:lk.vcLabels.vowels[loc]}, consonants:{en:lk.vcLabels.consonants.en, loc:lk.vcLabels.consonants[loc]} };
  for (const id of SCI_IDS) b.science.strings[id] = { en_title:enS[id]&&enS[id].title, loc_title:S[id]&&S[id].title, en_instruction:enS[id]&&enS[id].instruction, loc_instruction:S[id]&&S[id].instruction };
  for (const f of SCI_FAMS) b.science.families[f] = { en_name:tax[f]&&tax[f].name.en, loc_name:tax[f]&&tax[f].name[loc], loc_slug:tax[f]&&tax[f].slug[loc], en_skill:enSk[f]&&enSk[f].full, loc_skill_full:Sk[f]&&Sk[f].full, loc_skill_short:Sk[f]&&Sk[f].short };
  for (const f of sciFiles) { const d = rj(path.join(sciDir,f)); if(!d.bins) continue; b.science.binLabels[f]={}; for(const bin of d.bins) b.science.binLabels[f][bin.key]={ en:bin.label&&bin.label.en, loc:bin.label&&bin.label[loc] }; }
  fs.writeFileSync(path.join(I,'.nsr-'+loc+'-bundle.json'), JSON.stringify(b,null,2)+'\n');
}
console.log('wrote .nsr-<loc>-bundle.json for: '+LOCALES.join(', '));
