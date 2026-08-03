/* =====================================================================
   TEN FRAME — MANIPULATIVE   (ten-frame.js)
   ---------------------------------------------------------------------
   Thin wrapper around ten-frame-core.js. Free-play variant: the kid taps
   cells to fill or remove counters. No tasks, no check-answer flow —
   the shell sees no `tasks` field and skips the activity chrome.

   The shared logic lives in ten-frame-core.js so the activity sibling
   (ten-frame-activity.js) reuses it byte-for-byte. Fixing a counter bug
   or adding a locale happens exactly once, in the core.
   ===================================================================== */
var TenFrame = {
  id: 'ten-frame',
  strings:  TenFrameCore.strings,
  defaults: TenFrameCore.defaults,
  settings: TenFrameCore.settings,
  /* ⚠ THE GEOMETRY IS IN THE CORE, AND THE CORE IS SHARED WITH THE ACTIVITY
     SIBLING — so the wide tiers cannot go there. This wrapper adds a class
     only the FREE-PLAY variant carries, and appends its tier sheet after the
     core's, so `body.tf-wide .tf-cell` (0,2,1) out-specifies the core's
     `.tf-cell` (0,1,0) without a single line changing in ten-frame-core.js.
     ten-frame-activity.js never gets the class and is untouched. */
  init: function (api) {
    document.body.classList.add('tf-wide');
    return TenFrameCore.init.call(this, api);
  },
  render:   TenFrameCore.render,
  paint:    TenFrameCore.paint,
  reset:    TenFrameCore.reset,
  setCount: TenFrameCore.setCount,
  capacity: TenFrameCore.capacity
};

TenFrameCore.injectCSS();

/* =====================================================================
   Wide board (§23 — the apparatus a teacher teaches FROM).
   ---------------------------------------------------------------------
   The core pins the cell at `clamp(44px, 11vmin, 84px)`, so on a 2560x1440
   board 11vmin computes to 158px and is clamped straight back to 84 — the
   frame drew 476px, 18.6% of the screen, the smallest apparatus in the
   catalogue. A ten frame is exactly the instrument a teacher stands at and
   points to, so it should be one of the biggest.

   ONE number per tier. Frame width = 5 cells + 4 gaps + 2 paddings, and the
   gap/padding are raised with the cell so the proportions of the printed
   apparatus survive. Double-frame cells are ~48% of single, because in that
   mode TWO frames share the same width side by side — the core already makes
   that distinction (64 vs 84) and this keeps it.

   ⚠ `.tf-cell svg` and `.tf-cell img` are already `max-width:78%` of the
   cell, so the counters follow for free. Ramping them as well would
   double-scale — the recorded failure from the batch-2 tools.
   ===================================================================== */
(function tenFrameWideTiers() {
  var css = ''
  + '@media (min-width:1367px) and (min-height:880px){'
  +   'body.tf-wide .tf-cell{width:140px;}'
  +   'body.tf-wide .tf-double .tf-cell{width:68px;}'
  +   'body.tf-wide .tf-frame{gap:11px;padding:15px;}'
  +   'body.tf-wide .tf-readout-num{font-size:52px;}'
  +   'body.tf-wide .tf-readout-label{font-size:16px;}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.tf-wide .tf-cell{width:186px;}'
  +   'body.tf-wide .tf-double .tf-cell{width:88px;}'
  +   'body.tf-wide .tf-frame{gap:14px;padding:18px;}'
  +   'body.tf-wide .tf-readout-num{font-size:64px;}'
  +   'body.tf-wide .tf-readout-label{font-size:19px;}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.tf-wide .tf-cell{width:240px;}'
  +   'body.tf-wide .tf-double .tf-cell{width:108px;}'
  +   'body.tf-wide .tf-frame{gap:16px;padding:20px;}'
  +   'body.tf-wide .tf-readout-num{font-size:76px;}'
  +   'body.tf-wide .tf-readout-label{font-size:22px;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
