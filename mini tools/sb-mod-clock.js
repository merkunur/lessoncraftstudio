/* ============================================================================
   sb-mod-clock.js — WRAPPED LEGACY CORE: ClockCore as a storybook interaction
   module (0 core edits). Thinking type: time / measurement.

   The child drags the analog hands to set the asked time (radial drag with
   snap — the core's own Pointer Events machinery, element-scoped capture).
   The PAGE NARRATION says the target time ("Set the clock to half past
   three") — the module renders only the clock; the deferred Check reads the
   core's discrete isCorrect() (setHour==targetHour && setMinute==targetMinute).

   Page taskData:
     { "hour": 3,            // 1..12
       "minute": 30,         // multiple of minuteStep
       "minuteStep": 30,     // 30 (hours/half-hours) | 5 (to the nearest 5)
       "seed": 7 }
   ========================================================================= */
(function (global) {
  'use strict';

  global.SBLegacyAdapter.wrap({
    type: 'sb-clock',
    core: function () { return global.ClockCore; },
    completionModes: ['check'],
    minZone: { w: 440, h: 420 },

    buildTask: function (taskData) {
      var startH = null, startM = null;
      return {
        setup: function (tool) {
          tool.setupTask({
            hour: taskData.hour,
            minute: taskData.minute || 0,
            minuteStep: taskData.minuteStep || 30,
            seed: taskData.seed || 1
          });
          startH = tool.setHour; startM = tool.setMinute;   /* deliberately-wrong start */
        },
        check: function (tool) {
          var ok = tool.isCorrect();
          if (ok) { tool.readOnly = true; tool.paint(); }
          return ok;
        },
        hasAnswer: function (tool) {
          /* enabled once the child has moved a hand off the start position */
          return tool.setHour !== startH || tool.setMinute !== startM;
        }
      };
    },

    autoSolve: function (tool) {
      try {
        tool.setHour = tool.targetHour;
        tool.setMinute = tool.targetMinute;
        tool.paint();
      } catch (e) {}
    },

    validateTask: function (taskData, v) {
      var step = taskData.minuteStep || 30;
      if ([30, 5].indexOf(step) < 0) v.error('sb-clock: minuteStep must be 30 or 5');
      if (!(taskData.hour >= 1 && taskData.hour <= 12)) v.error('sb-clock: hour must be 1..12');
      var m = taskData.minute || 0;
      if (m < 0 || m > 55 || m % step !== 0) v.error('sb-clock: minute must be a multiple of minuteStep in 0..55');
    }
  });
}(typeof window !== 'undefined' ? window : this));
