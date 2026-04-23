/**
 * attribution-manager.js — shared attribution-footer module for all
 * LessonCraftStudio worksheet-generator apps.
 *
 * Adds a single Fabric.js Text object at the bottom-center of the
 * worksheet canvas, tagged { isAttribution: true } so undo/redo and
 * re-generation treat it as a persistent element. Because the
 * attribution lives on the canvas, it automatically appears in:
 *   - PDF exports  (canvas.toDataURL -> jsPDF)
 *   - JPEG exports (canvas.toDataURL)
 *   - Interactive JPEG backdrops (v4..v11 _captureWorksheetImage)
 *   - Screenshots and social previews of any rendered worksheet
 *
 * No per-app duplication — every app calls LCSAttribution.addToCanvas
 * once at the end of its generator function.
 *
 * For interactive exports, LCSAttribution.getRectFromCanvas returns
 * the attribution's world bounds so the standalone play page can
 * overlay a clickable <a href> on top of the baked text.
 */
(function () {
    'use strict';

    var ATTRIBUTION_TEXT = 'Made with LessonCraftStudio.com';
    var ATTRIBUTION_URL = 'https://lessoncraftstudio.com';
    // Single safe muted gray — reads well on cream/white/pale backgrounds
    // (the dominant operator-chosen palette). Dark-mode backgrounds are
    // rare in this app set; adaptive palette detection can be added later
    // without breaking this API (opts.fill overrides the default).
    var DEFAULT_FILL = '#8A8A8E';
    var DEFAULT_FONT_FAMILY = 'Fredoka, Arial, sans-serif';
    var DEFAULT_FONT_SIZE = 11;
    var DEFAULT_BOTTOM_MARGIN = 22;

    function removeExisting(canvas) {
        if (!canvas || typeof canvas.getObjects !== 'function') return;
        var objs = canvas.getObjects().slice();
        for (var i = 0; i < objs.length; i++) {
            if (objs[i] && objs[i].isAttribution === true) {
                canvas.remove(objs[i]);
            }
        }
    }

    function addToCanvas(canvas, opts) {
        opts = opts || {};
        if (!canvas) return null;
        if (typeof fabric === 'undefined' || !fabric.Text) {
            console.warn('[LCSAttribution] fabric not available; skipping');
            return null;
        }

        // Avoid duplicates: re-generation calls this each time.
        removeExisting(canvas);

        // Resolve canvas dimensions from (in order of precedence):
        // 1) explicit opts.width / opts.height
        // 2) opts.currentCanvasConfig.{width,height}
        // 3) window.currentCanvasConfig.{width,height}
        // 4) canvas.getWidth() / getHeight()  (display size, not page pt)
        var cfg = opts.currentCanvasConfig || (typeof window !== 'undefined' && window.currentCanvasConfig);
        var width = opts.width || (cfg && cfg.width) || (canvas.getWidth ? canvas.getWidth() : 0);
        var height = opts.height || (cfg && cfg.height) || (canvas.getHeight ? canvas.getHeight() : 0);
        if (!width || !height) {
            console.warn('[LCSAttribution] Could not resolve canvas dimensions; skipping');
            return null;
        }

        var fontSize = opts.fontSize || DEFAULT_FONT_SIZE;
        var fill = opts.fill || DEFAULT_FILL;
        var fontFamily = opts.fontFamily || DEFAULT_FONT_FAMILY;
        var bottomMargin = (typeof opts.bottomMargin === 'number') ? opts.bottomMargin : DEFAULT_BOTTOM_MARGIN;

        var text = new fabric.Text(ATTRIBUTION_TEXT, {
            left: width / 2,
            top: height - bottomMargin,
            originX: 'center',
            originY: 'bottom',
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontWeight: 'normal',
            fill: fill,
            selectable: false,
            evented: false,
            hoverCursor: 'default',
            objectCaching: false,
            isAttribution: true,
            attributionUrl: ATTRIBUTION_URL,
            excludeFromExport: false
        });

        canvas.add(text);
        // Keep attribution above other objects so it's never obscured.
        if (typeof canvas.bringToFront === 'function') {
            canvas.bringToFront(text);
        }
        canvas.renderAll && canvas.renderAll();
        return text;
    }

    function getRectFromCanvas(canvas) {
        if (!canvas || typeof canvas.getObjects !== 'function') return null;
        if (typeof fabric === 'undefined' || !fabric.util) return null;
        var objs = canvas.getObjects();
        for (var i = 0; i < objs.length; i++) {
            var o = objs[i];
            if (o && o.isAttribution === true) {
                var m = o.calcTransformMatrix();
                var hw = (o.width || 100) / 2;
                var hh = (o.height || 20) / 2;
                var corners = [
                    fabric.util.transformPoint({ x: -hw, y: -hh }, m),
                    fabric.util.transformPoint({ x:  hw, y: -hh }, m),
                    fabric.util.transformPoint({ x:  hw, y:  hh }, m),
                    fabric.util.transformPoint({ x: -hw, y:  hh }, m)
                ];
                var xs = corners.map(function (c) { return c.x; });
                var ys = corners.map(function (c) { return c.y; });
                var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
                var minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
                return {
                    x: (minX + maxX) / 2,
                    y: (minY + maxY) / 2,
                    w: maxX - minX,
                    h: maxY - minY
                };
            }
        }
        return null;
    }

    window.LCSAttribution = {
        addToCanvas: addToCanvas,
        getRectFromCanvas: getRectFromCanvas,
        removeExisting: removeExisting,
        TEXT: ATTRIBUTION_TEXT,
        URL: ATTRIBUTION_URL,
        DEFAULT_FILL: DEFAULT_FILL,
        DEFAULT_FONT_FAMILY: DEFAULT_FONT_FAMILY,
        DEFAULT_FONT_SIZE: DEFAULT_FONT_SIZE
    };
})();
