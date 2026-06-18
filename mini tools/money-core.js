/* =====================================================================
   MONEY — COUNT-OUT CORE   (money-core.js)
   ---------------------------------------------------------------------
   E11 #1 — the COUNT-OUT / TENDER VERB engine. A prompt gives a target
   amount ("Show $0.30"); the child taps coins from a PALETTE into a TRAY,
   a running total builds, and the task is correct when the tray total
   equals the target. This instantiates CCSS 2.MD.C.8 (solve word problems
   with coins, ¢ and $) on its clean facet: single currency, coins only,
   count-out-to-target (mixed coin+bill and make-change are the #2 follow-up).

   A genuinely NEW verb — TENDER (build a tray by tapping a palette + sum) —
   that no existing core provides (tap-fill/partition/classify/array-build/
   radial-drag are none of these; a "which coin is worth more" choice would
   ride E2, a "type the total" would ride the shell keypad — this is neither).

   CLEAN SIBLING CORE — zero lines to any of the protected cores
   (choice-board / cvc-builder / match-pairs / place-value / ten-frame /
   word-builder / fractions / array / sort-bins / clock / number-bond) and
   zero lines to lcs-shell.{js,css}. Mirrors their public contract (init /
   setupTask / render / paint / reset / isCorrect + an 11-locale strings dict
   + idempotent injectCSS) so a thin wrapper (money-activity.js) merges it via
   Object.assign exactly like clock-activity.js does.

   MONEY IS NOT NUMERICALLY UNIVERSAL — currency, denominations, symbol,
   symbol placement, and decimal separator are genuine per-locale semantics
   (€ vs $ vs kr; before vs after; comma vs point; which coins exist). Each
   round carries its locale's `currency` descriptor + coin `palette` + the
   `target` (all in MINOR units, e.g. cents). Coin LABELS ("25¢"/"€1"/"2 kr")
   are native-authored; formatMoney() formats the target + running total from
   the descriptor (symbol/before/decimalSep/minorPerMajor).

   DISCRETE-STATE MODEL — `tray` (array of coin minor-unit values),
   `target` (minor units), `palette` (available coin values). Tap a palette
   coin → push to tray; tap a tray coin → remove it. total() = sum(tray);
   isCorrect() = total() === target (multiple valid combos OK — sum-based
   grade, like K.OA.A.3). answerType:'state' (the tray IS the answer surface).

   TOUCH + POINTER PARITY — coins are TAP targets (pointerdown +
   touch-action:manipulation, the fractions/array tap precedent; no drag).
   ===================================================================== */
window.MoneyCore = {

  /* CURATION FLAG: title / instruction / promptCount + sr labels are the
     load-bearing per-locale strings. The CURRENCY + coin set + round amounts
     are per-locale DATA (manifest params.byLocale) — each native author OWNS
     their currency system (NEVER cross-applied). EN authored here; the 10
     non-EN folded in by the per-locale native ensemble (§A.13.48). */
  strings: {
    title: {en:"Count Out the Money",de:"Zähl das Geld ab",es:"Cuenta el dinero",pt:"Conte o dinheiro",fr:"Compte la monnaie",it:"Conta i soldi",nl:"Tel het geld",sv:"Räkna pengarna",da:"Tæl pengene",no:"Tell pengene",fi:"Laske rahat"},
    instruction: {en:"Tap coins to put them in your tray until the money matches the amount. Tap a coin in the tray to take it back. Then tap Check.",de:"Tippe auf die Münzen, um sie in deine Schale zu legen, bis das Geld dem Betrag entspricht. Tippe auf eine Münze in der Schale, um sie zurückzunehmen. Tippe dann auf Prüfen.",es:"Toca las monedas y colócalas en la bandeja hasta reunir la cantidad exacta. Toca una moneda de la bandeja para quitarla. Luego toca Comprobar.",pt:"Toque nas moedas para colocá-las na bandeja até chegar ao valor pedido. Toque numa moeda da bandeja para tirá-la. Depois toque em Verificar.",fr:"Touche les pièces pour les mettre dans le bac jusqu'à atteindre le montant demandé. Touche une pièce du bac pour la retirer. Puis touche Vérifier.",it:"Tocca le monete per metterle nel vassoio finché il totale corrisponde all'importo. Tocca una moneta nel vassoio per toglierla. Poi tocca Controlla.",nl:"Tik op de munten en leg ze in de bak tot het bedrag klopt. Tik op een munt in de bak om die terug te nemen. Tik daarna op Controleer.",sv:"Tryck på mynten och lägg dem i facket tills summan stämmer. Tryck på ett mynt i facket för att ta tillbaka det. Tryck sedan på Kolla.",da:"Tryk på mønter, og læg dem i bakken, indtil beløbet passer. Tryk på en mønt i bakken for at tage den tilbage. Tryk så på Tjek.",no:"Trykk på myntene og legg dem i skålen til du har riktig beløp. Trykk på en mynt i skålen for å ta den tilbake. Trykk så på Sjekk.",fi:"Napauta kolikoita ja lisää ne lokeroon, kunnes summa vastaa tavoitetta. Napauta lokerossa olevaa kolikkoa ottaaksesi sen pois. Paina sitten Tarkista."},
    /* per-task prompt — {amount} is the formatted target (promptArgs) */
    promptCount: {en:"Show {amount}. Tap coins to count it out.",de:"Zeige {amount}. Tippe auf Münzen, um den Betrag abzuzählen.",es:"Reúne {amount}.",pt:"Mostre {amount}.",fr:"Montre {amount}.",it:"Mostra {amount}.",nl:"Maak {amount} met munten.",sv:"Visa {amount}.",da:"Vis {amount}.",no:"Vis {amount}.",fi:"Näytä {amount}."},
    totalLabel: {en:"Total",de:"Gesamt",es:"Total",pt:"Total",fr:"Total",it:"Totale",nl:"In de bak",sv:"Summa",da:"I alt",no:"I skålen",fi:"Yhteensä"},
    srPalette: {en:"coins you can use — tap a coin to add it to your tray",de:"Münzen, die du verwenden kannst – tippe auf eine Münze, um sie in deine Schale zu legen",es:"monedas disponibles: toca una para ponerla en la bandeja",pt:"moedas disponíveis: toque numa para colocá-la na bandeja",fr:"pièces disponibles : touche une pièce pour la mettre dans le bac",it:"monete disponibili: tocca una moneta per metterla nel vassoio",nl:"beschikbare munten – tik op een munt om die in de bak te leggen",sv:"mynt att välja – tryck på ett mynt för att lägga det i facket",da:"mønter, du kan vælge – tryk på en mønt for at lægge den i bakken",no:"mynter du kan velge – trykk på en mynt for å legge den i skålen",fi:"käytettävissä olevat kolikot – napauta kolikkoa lisätäksesi sen lokeroon"},
    srTray: {en:"your tray — tap a coin to take it back",de:"deine Schale – tippe auf eine Münze, um sie zurückzunehmen",es:"tu bandeja: toca una moneda para quitarla",pt:"sua bandeja: toque numa moeda para tirá-la",fr:"ton bac : touche une pièce pour la retirer",it:"il tuo vassoio: tocca una moneta per toglierla",nl:"jouw bak – tik op een munt om die terug te nemen",sv:"ditt fack – tryck på ett mynt för att ta tillbaka det",da:"din bakke – tryk på en mønt for at tage den tilbage",no:"skålen din – trykk på en mynt for å ta den tilbake",fi:"lokerosi – napauta kolikkoa ottaaksesi sen pois"}
  },

  defaults: {},

  /* ---- design-system constants (Direction A teal/coral) ---- */
  _C: { T: '#146B5E', BODY: '#FBF3E4', RIM: '#146B5E', TRAY: '#E3EEEB', CORAL: '#F2784B' },

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.currency = { symbol: '$', before: true, decimalSep: '.', minorPerMajor: 100 };
    this.coins = [];        // [{v, label}]
    this._labelOf = {};     // v -> label
    this.palette = [];      // coin values available this round
    this.target = 0;        // minor units
    this.tray = [];         // coin values the child has tendered
    this.readOnly = false;
    this._trayEl = null; this._totalEl = null;
  },

  /* opts = { currency, coins:[{v,label}], target, palette:[values] } */
  setupTask: function (opts) {
    opts = opts || {};
    if (opts.currency) this.currency = opts.currency;
    if (opts.coins) { this.coins = opts.coins; this._labelOf = {}; for (var i = 0; i < opts.coins.length; i++) this._labelOf[opts.coins[i].v] = opts.coins[i].label; }
    this.palette = opts.palette || [];
    this.target = opts.target || 0;
    this.tray = [];
    this.readOnly = false;
  },

  /* format a minor-unit amount via a currency descriptor (target + total). */
  formatMoney: function (v, c) {
    c = c || this.currency;
    var s;
    if ((c.minorPerMajor || 1) === 1) { s = String(v); }
    else {
      var maj = Math.floor(v / c.minorPerMajor), min = v % c.minorPerMajor;
      s = maj + (c.decimalSep || '.') + (min < 10 ? '0' + min : '' + min);
    }
    return c.before ? (c.symbol + (c.space ? ' ' : '') + s) : (s + ' ' + c.symbol);
  },
  _label: function (v) { return this._labelOf[v] || this.formatMoney(v); },
  total: function () { var t = 0; for (var i = 0; i < this.tray.length; i++) t += this.tray[i]; return t; },
  isCorrect: function () { return this.total() === this.target; },

  /* ---- render(): tray (with running total) + coin palette + clear ---- */
  render: function () {
    this.injectCSS();
    var api = this.api, self = this;
    var stage = api.stage; stage.innerHTML = '';
    var wrap = api.el('div', 'mn-wrap');

    /* TRAY — tendered coins + running total */
    var tray = api.el('div', 'mn-tray');
    tray.setAttribute('role', 'group');
    tray.setAttribute('aria-label', api.t('srTray'));
    this._trayEl = api.el('div', 'mn-tray-coins');
    var totalRow = api.el('div', 'mn-total-row');
    var totalLbl = api.el('span', 'mn-total-lbl'); totalLbl.textContent = api.t('totalLabel');
    this._totalEl = api.el('span', 'mn-total');
    totalRow.append(totalLbl, this._totalEl);
    tray.append(this._trayEl, totalRow);
    wrap.appendChild(tray);

    /* PALETTE — the coins the child can tap */
    var pal = api.el('div', 'mn-palette');
    pal.setAttribute('role', 'group');
    pal.setAttribute('aria-label', api.t('srPalette'));
    this.palette.forEach(function (v) {
      var b = self._coinBtn(v, false);
      b.addEventListener('pointerdown', function (e) {
        if (self.readOnly) return;
        if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
        e.preventDefault();
        self.tray.push(v); self._beep(660); self.paint();
      });
      pal.appendChild(b);
    });
    wrap.appendChild(pal);

    /* clear (reset the tray) */
    var clear = api.el('button', 'mn-clear'); clear.type = 'button';
    clear.textContent = '↺';
    clear.setAttribute('aria-label', api.t('srTray'));
    clear.addEventListener('click', function () { if (self.readOnly) return; self.tray = []; self._beep(420); self.paint(); });
    this._clearEl = clear;
    wrap.appendChild(clear);

    stage.appendChild(wrap);
    this.paint();
  },

  _beep: function (f) { if (this.api && this.api.sound) this.api.sound(f); },

  /* a coin token (button). inTray coins get the coral "tap to remove" cue. */
  _coinBtn: function (v, inTray) {
    var b = this.api.el('button', 'mn-coin' + (inTray ? ' mn-coin-tray' : ''));
    b.type = 'button';
    b.textContent = this._label(v);
    b.setAttribute('data-v', String(v));
    return b;
  },

  /* ---- paint(): rebuild tray coins + running total + lock state ---- */
  paint: function () {
    if (!this._trayEl) return;
    var self = this;
    this._trayEl.innerHTML = '';
    this.tray.forEach(function (v, idx) {
      var b = self._coinBtn(v, true);
      b.addEventListener('pointerdown', function (e) {
        if (self.readOnly) return;
        if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
        e.preventDefault();
        self.tray.splice(idx, 1); self._beep(420); self.paint();
      });
      self._trayEl.appendChild(b);
    });
    if (this._totalEl) this._totalEl.textContent = this.formatMoney(this.total());
    if (this._clearEl) this._clearEl.disabled = this.readOnly;
    if (this.api && this.api.announce) this.api.announce(this.formatMoney(this.total()) + ' / ' + this.formatMoney(this.target));
  },

  reset: function () { this.tray = []; this.readOnly = false; this.paint(); },

  /* ---- stage CSS — idempotent. Coins are ≥44px tap targets; palette wraps. ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var C = this._C;
    var css = ''
      + '.mn-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'
      + '.mn-tray{width:min(92vw,420px);min-height:84px;background:' + C.TRAY + ';border:2px dashed rgba(20,107,94,.35);border-radius:18px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;}'
      + '.mn-tray-coins{display:flex;flex-wrap:wrap;gap:8px;min-height:48px;align-items:center;justify-content:center;}'
      + '.mn-total-row{display:flex;align-items:center;justify-content:center;gap:8px;font:800 20px/1 var(--lcs-font-display,"Baloo 2",system-ui,sans-serif);color:' + C.T + ';}'
      + '.mn-total-lbl{font-weight:700;opacity:.7;font-size:14px;text-transform:uppercase;letter-spacing:.04em;}'
      + '.mn-palette{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;width:min(92vw,420px);}'
      + '.mn-coin{min-width:52px;height:52px;padding:0 10px;border-radius:999px;border:2.5px solid ' + C.RIM + ';background:' + C.BODY + ';'
      +   'color:' + C.T + ';font:800 16px/1 var(--lcs-font-display,"Baloo 2",system-ui,sans-serif);cursor:pointer;touch-action:manipulation;'
      +   'box-shadow:0 2px 0 rgba(20,107,94,.18),0 4px 8px -2px rgba(20,107,94,.18);transition:transform .1s var(--lcs-ease);}'
      + '.mn-coin:active{transform:scale(.92);}'
      + '.mn-coin-tray{border-color:' + C.CORAL + ';box-shadow:0 2px 0 rgba(217,99,58,.25);}'
      + '.mn-clear{width:48px;height:44px;border-radius:14px;border:2px solid ' + C.T + ';background:#fff;color:' + C.T + ';'
      +   'font:800 22px/1 system-ui,sans-serif;cursor:pointer;touch-action:manipulation;}'
      + '.mn-clear:active{transform:scale(.92);}'
      + '.mn-clear:disabled{opacity:.4;cursor:default;}';
    var tag = document.createElement('style');
    tag.setAttribute('data-money-core', '');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
