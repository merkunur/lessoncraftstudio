/**
 * withFixedTheme — wraps a type so it always renders from one library theme
 * (the geometry types live on the `shapes` theme regardless of the wave's
 * theme axis). Marks themeAxis non-applicable for enumeration honesty.
 */
'use strict';

function withFixedTheme(type, theme) {
  const wrapped = Object.create(type);
  wrapped.themeAxis = { ...type.themeAxis, applicable: false, fixedTheme: theme };
  wrapped.build = function (args, ctx) {
    return type.build.call(this, { ...args, theme }, ctx);
  };
  return wrapped;
}

module.exports = { withFixedTheme };
