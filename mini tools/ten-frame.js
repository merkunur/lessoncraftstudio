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
  init:     TenFrameCore.init,
  render:   TenFrameCore.render,
  paint:    TenFrameCore.paint,
  reset:    TenFrameCore.reset,
  setCount: TenFrameCore.setCount,
  capacity: TenFrameCore.capacity
};

TenFrameCore.injectCSS();
