/* one-shot: wrap TOOL #50's flat English strings as per-locale objects,
   which is the shape `lcs-shell.js:488` -> `i18n.t(tool.strings, key)`
   actually reads. A flat map makes t() hand back the KEY, which renders
   as the literal word "title" in the heading and is invisible to a model
   gate and to a geometry probe alike. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'number-drum.js');
let s = fs.readFileSync(P, 'utf8').replace(/\r\n/g, '\n');

const m = /( {4}strings: \{\n)([\s\S]*?)(\n {4}\},\n\n {4}settings:)/.exec(s);
if (!m) throw new Error('strings block not found');

const LINE = new RegExp('^(\\s*)([A-Za-z0-9_]+):(\\s*)(\'(?:[^\'\\\\]|\\\\.)*\')(,?)$');
let n = 0;
const out = m[2].split('\n').map(function (line) {
  const mm = LINE.exec(line);
  if (!mm) return line;
  n++;
  return mm[1] + mm[2] + ': { en: ' + mm[4] + ' }' + mm[5];
});
if (n < 25) throw new Error('only ' + n + ' strings converted — refusing to write');

s = s.slice(0, m.index + m[1].length) + out.join('\n') + s.slice(m.index + m[1].length + m[2].length);
fs.writeFileSync(P, s);
console.log('converted ' + n + ' strings to per-locale objects');
