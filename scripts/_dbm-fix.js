/* the native panel's findings on TOOL #54. The first is the worst
   defect of the session: the headline invention was unreachable, and
   both my gates passed it because both reached the model directly
   instead of pressing the button. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'doubling-mirror.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => { if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 55)); s = s.split(a).join(b); };

/* ---- 1 ⭐⭐ THE ODD TRAY WAS UNREACHABLE. close() always set odd:null
   and kept `near`, so total() after a close was ALWAYS 2n — always even
   — and open() therefore never saw an odd total. The fix is the pitch's
   own sentence: you may add ONE MORE to a closed tray, and that one has
   no partner. Six doubled is twelve; one more is thirteen; opening it
   gives six and seven. "Double six and the one who wouldn't fit." */
sub("    place: function (st, d) {\n      var s = this._st(st);\n      if (s.closed) return null;\n      var n = s.near + d;\n      if (n < 0 || n > GEO.CAP) return null;\n      return { near: n, closed: false, odd: null, opened: null };\n    },",
  "    place: function (st, d) {\n" +
  "      var s = this._st(st);\n" +
  "      /* ⭐⭐ ON A CLOSED TRAY, ONE MORE COUNTER IS THE ODD ONE — and this\n" +
  "         is the path that was missing. Without it close() only ever made\n" +
  "         an even total, open() never saw an odd one, and the tool's\n" +
  "         entire headline (nine opens to five and four) was UNREACHABLE:\n" +
  "         five authored strings and two controls dead, in a build whose\n" +
  "         626-assertion gate and 16 pixel checks both passed — because\n" +
  "         both reached the model directly instead of pressing a button.\n" +
  "         ⚠ And it holds exactly ONE, so the tray says n+n and n+(n+1)\n" +
  "         and nothing else. */\n" +
  "      if (s.closed) {\n" +
  "        if (d > 0) {\n" +
  "          if (s.odd !== null) return null;\n" +
  "          if (this.total(s) + 1 > GEO.CAP * 2 + 1) return null;\n" +
  "          return { near: s.near, closed: true, odd: 0, opened: null };\n" +
  "        }\n" +
  "        if (s.odd === null) return null;\n" +
  "        return { near: s.near, closed: true, odd: null, opened: null };\n" +
  "      }\n" +
  "      var n = s.near + d;\n" +
  "      if (n < 0 || n > GEO.CAP) return null;\n" +
  "      return { near: n, closed: false, odd: null, opened: null };\n" +
  "    },");

/* ---- 2 ⭐⭐ THE OPEN CONTROL WAS CONSEQUENCE-FREE. open() returned
   closed:true, so nothing in the DOM moved — the #39 defect class, which
   audit-tool-control-liveness scores GREEN because the control acts. */
sub("      var half = Math.floor(t / 2);\n      if (t % 2 === 0) return { near: half, closed: true, odd: null, opened: t };\n      return { near: half, closed: true, odd: 0, opened: t };",
  "      var half = Math.floor(t / 2);\n" +
  "      /* ⚠⚠ closed:false. It returned TRUE, so \"open the hinge\" did not\n" +
  "         open the hinge and nothing in the DOM changed — a control that\n" +
  "         acts and has no consequence, which the shared liveness gate\n" +
  "         scores green because it only asks whether the DOM changed AT\n" +
  "         ALL. An opened tray shows both leaves side by side. */\n" +
  "      if (t % 2 === 0) return { near: half, closed: false, odd: null, opened: t };\n" +
  "      return { near: half, closed: false, odd: 0, opened: t };");

/* the opened tray still shows both leaves, so far()/nearShown() must not
   key on `closed` alone once a tray has been opened */
sub("    far: function (st) {\n      var s = this._st(st);\n      if (!s.closed) return 0;\n      if (s.odd === null) return s.near;\n      return s.near + (s.odd > 0 ? 1 : 0);\n    },",
  "    far: function (st) {\n" +
  "      var s = this._st(st);\n" +
  "      /* an OPENED tray still has counters on both leaves — `opened`\n" +
  "         records that it was taken apart rather than never closed. */\n" +
  "      if (!s.closed && s.opened === null) return 0;\n" +
  "      if (s.odd === null || s.odd === 0) return s.near;\n" +
  "      return s.near + (s.odd > 0 ? 1 : 0);\n" +
  "    },");
sub("    nearShown: function (st) {\n      var s = this._st(st);\n      return s.near + (s.closed && s.odd !== null && s.odd < 0 ? 1 : 0);\n    },",
  "    nearShown: function (st) {\n" +
  "      var s = this._st(st);\n" +
  "      return s.near + (s.odd !== null && s.odd < 0 ? 1 : 0);\n" +
  "    },");
sub("    total: function (st) {\n      var s = this._st(st);\n      if (!s.closed) return s.near;\n      return this.nearShown(s) + this.far(s);\n    },",
  "    total: function (st) {\n" +
  "      var s = this._st(st);\n" +
  "      if (!s.closed && s.opened === null) return s.near;\n" +
  "      return this.nearShown(s) + this.far(s) + (s.odd === 0 ? 1 : 0);\n" +
  "    },");

/* open() must accept the tray it is actually looking at */
sub("      if (!s.closed && total == null) return null;",
  "      if (!s.closed && total == null) return null;\n" +
  "      if (s.opened !== null && total == null) return null;   /* already open */");

/* ---- 3 a reachable FALSE announcement: _refuse('side') fell through to
   the default and said "the hinge is already open" on a CLOSED tray. */
sub("      if (why === 'open') { api.announce(api.t(s.closed ? 'saidEmpty' : 'saidAlreadyOpen')); return; }\n      api.announce(api.t('saidAlreadyOpen'));",
  "      if (why === 'open') { api.announce(api.t('saidAlreadyOpen')); return; }\n" +
  "      /* ⚠ 'side' had NO branch and fell through to the default, so\n" +
  "         pressing a side button on a closed tray announced \"the hinge is\n" +
  "         already open\" — false, and reachable. */\n" +
  "      if (why === 'side') { api.announce(api.t('saidNoOdd')); return; }\n" +
  "      api.announce(api.t('saidAlreadyOpen'));");

/* ---- 5 role="img" made the tray's subtree presentational, so the three
   aria strings on its descendants were never announced. */
sub("      tray.setAttribute('role', 'img');\n", "");

/* ---- 6 {s} was a bare digit: \"went to the 1 leaf\". */
sub("        s: dir < 0 ? '1' : '2'", "        s: api.t(dir < 0 ? 'sideNameNear' : 'sideNameFar')");

/* ---- the English falsehoods the panel refused to reproduce ---------- */
sub("      again: { en: 'Clear the tray' },", "      again: { en: 'Start again' },");
sub("      startTen: { en: 'up to ten' },", "      startTen: { en: 'seven to start' },");
sub("      startSmall: { en: 'a few counters' },", "      startSmall: { en: 'three to start' },");
sub("A Teacher plan adds the paper tray to cut out and hinge, so a child can lay real counters on both leaves and bend it shut themselves.",
  "A Teacher plan adds the paper tray to cut out and hinge, so a child can lay real counters on both leaves and bend it shut themselves.");
sub("The whole apparatus is free — every count, the closing, the opening and the odd one\\'s side.",
  "The whole apparatus is free — every count, the closing and the opening.");
sub("saidFull: { en: 'The near leaf holds {n}, and that is as many as it takes.' },",
  "saidFull: { en: 'The near leaf holds {n}, and that is as many as it holds.' },\n      /* ⚠ 'side' now has a branch; this is what it says. */\n      saidNoOdd: { en: 'There is no odd counter waiting for a leaf.' },\n      sideNameNear: { en: 'near' },\n      sideNameFar: { en: 'far' },");
sub("sheetTitle: { en: 'Paper tray to cut out and hinge' },", "sheetTitle: { en: 'Paper trays to cut out and hinge' },");
sub("instruction: { en: 'Put counters on the near leaf and say what the double will be. Then close the hinge — the far leaf gets the same number again, and you can count every one of them.' },",
  "instruction: { en: 'Set the near leaf to a number and say what the double will be. Close the hinge and the far leaf gets the same number again — then add one more and open it, and see what a double and one more looks like.' },");

fs.writeFileSync(P, s);
console.log('the unreachable branch, the consequence-free control and the false announcement are fixed');
