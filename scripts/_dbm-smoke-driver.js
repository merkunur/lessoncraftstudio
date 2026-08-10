/* one-shot: replace the cloned #53 driver in the #54 smoke gate with one
   that drives THIS tool — including the branch that was dead until an
   hour ago, reached by BUTTON and never by page.evaluate. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'smoke-doubling-mirror-locales.js');
let s = fs.readFileSync(P, 'utf8');

const START = "    /* drive every control so every branch's strings get asked for */";
const END = "    const got = await p.evaluate";
const i = s.indexOf(START), j = s.indexOf(END);
if (i < 0 || j < 0) throw new Error('driver block not found');

const click = (sel, wait, note) =>
  "    await p.evaluate(() => document.querySelector('" + sel + "').click());" +
  (note ? "   /* " + note + " */" : "") + "\n" +
  "    await new Promise(r => setTimeout(r, " + wait + "));\n";
const rep = (sel, n, wait) =>
  "    for (let i = 0; i < " + n + "; i++) {\n" +
  "      await p.evaluate(() => document.querySelector('" + sel + "').click());\n" +
  "      await new Promise(r => setTimeout(r, " + wait + "));\n    }\n";

const body =
  "    /* DRIVE THE STATES BY BUTTON. Every refusal string lives behind a\n" +
  "       state a lazy driver never enters — and on this tool an entire\n" +
  "       BRANCH was unreachable until it was fixed, which two gates missed\n" +
  "       because they reached the model directly. Nothing here uses\n" +
  "       page.evaluate to set state. */\n" +
  click('.dbm-b-open', 250, 'already open') +
  click('.dbm-b-low', 250, 'no odd one waiting') +
  rep('.dbm-b-more', 3, 150) +
  click('.dbm-b-less', 200) +
  click('.dbm-b-close', 1100, 'past the beat') +
  click('.dbm-b-close', 250, 'already closed') +
  "    /* the branch that was DEAD: one more on a CLOSED tray, then open */\n" +
  click('.dbm-b-more', 300, 'the odd one') +
  click('.dbm-b-more', 250, 'a SECOND outsider is refused') +
  click('.dbm-b-open', 700) +
  click('.dbm-b-high', 500, 'the odd one gets the far leaf') +
  click('.dbm-b-again', 300) +
  click('.dbm-b-close', 900) +
  click('.dbm-b-open', 600, 'an EVEN split') +
  click('.dbm-b-again', 250) +
  click('.dbm-b-close', 900) +
  click('.dbm-b-more', 250) +
  click('.dbm-b-open', 700) +
  click('.dbm-b-low', 400, 'the odd one gets the near leaf') +
  click('.dbm-b-again', 250) +
  "    /* empty it, so saidEmpty is reached */\n" +
  rep('.dbm-b-less', 5, 130) +
  "    /* fill it to CAP, so saidFull is reached */\n" +
  rep('.dbm-b-more', 11, 110) +
  "    await p.evaluate(() => { const g = document.querySelector('.lcs-btn-settings, [aria-label*=\"etting\"], .lcs-settings-btn'); if (g) g.click(); });\n" +
  "    await new Promise(r => setTimeout(r, 260));\n" +
  "    await p.evaluate(() => { const T = window.DoublingMirror; T.premium = true; T._paint(); });\n" +
  click('.dbm-b-print', 250, 'the paid sheet') +
  "    await p.evaluate(() => { const T = window.DoublingMirror; T.premium = false; T._paint(); T._gate(); });\n" +
  "    await new Promise(r => setTimeout(r, 200));\n\n";

fs.writeFileSync(P, s.slice(0, i) + body + s.slice(j));
console.log('smoke driver written for this tool');
