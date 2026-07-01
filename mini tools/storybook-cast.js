/* ============================================================================
   storybook-cast.js — SBCast: the character/performer system.

   A Performer renders one character placement on the Pixi stage:
   - POSE tier (default): named single-frame textures ('pose_<name>'),
     swapped with a 160ms cross-fade (instant under reduced motion).
   - IDLE: if the base atlas carries an 'idle' animation, it plays whenever the
     performer rests in its neutral pose — subtle 6-8fps breathing. Budgeted
     via policy.maxIdles; staggered start phases so a crowd never pulses in sync.
   - CLIPS (optional tier): 'clip_<name>' animations from the transient clips
     atlas, 12fps, rationed by the global policy.maxPerformers semaphore.
     Over budget / reduced motion / atlas absent → the clip's declared
     fallbackPose (validator guarantees it exists). Meaning is NEVER carried
     by motion alone — callers pair clips with captions/static poses.
   - TALKING garnish while a narration line plays: clip_talk if affordable,
     else pose_talk<->neutral alternation, else static pose_talk.

   All spatial inputs (anchor, scale, flip) are operator DATA in 1600×1000
   design units; the anchor is the character's FEET/base point.
   ========================================================================= */
(function (global) {
  'use strict';

  var _policy = { maxPerformers: 0, maxIdles: 0, reduced: true };
  var _activeClips = 0;
  var _activeIdles = 0;

  function setPolicy(p) { _policy = p || _policy; }

  function _tween(ms, onUpdate, onDone) {
    if (_policy.reduced || ms <= 0) { onUpdate(1); if (onDone) onDone(); return; }
    var t0 = (global.performance || Date).now();
    function step() {
      var k = Math.min(1, ((global.performance || Date).now() - t0) / ms);
      onUpdate(k);
      if (_policy.requestRender) _policy.requestRender();  /* render-on-demand tiers */
      if (k < 1) global.requestAnimationFrame(step);
      else if (onDone) onDone();
    }
    global.requestAnimationFrame(step);
  }

  function createPerformer(opts) {
    var PIXI = global.PIXI;
    var castDef = opts.castDef;            /* story.json cast entry */
    var placement = opts.placement;        /* page character placement */
    var baseSheet = global.SBLoader.sheet(castDef.atlasBase);
    if (!baseSheet) throw new Error('[SBCast] base atlas not loaded for ' + castDef.id);
    var clipsSheet = castDef.atlasClips ? global.SBLoader.sheet(castDef.atlasClips) : null;

    var container = new PIXI.Container();
    container.x = placement.anchor.x;
    container.y = placement.anchor.y;
    var sc = (placement.scale || 1) * (castDef.scale || 1);
    container.scale.set(placement.flip ? -sc : sc, sc);

    function poseTex(name) {
      return baseSheet.textures['pose_' + name] || baseSheet.textures[name] || null;
    }

    var neutralName = placement.pose || 'neutral';
    var currentPose = neutralName;

    var poseSprite = new PIXI.Sprite(poseTex(neutralName) || PIXI.Texture.EMPTY);
    poseSprite.anchor.set(0.5, 1);
    var fadeSprite = new PIXI.Sprite(PIXI.Texture.EMPTY);
    fadeSprite.anchor.set(0.5, 1);
    fadeSprite.alpha = 0;
    container.addChild(poseSprite);
    container.addChild(fadeSprite);

    var idleSprite = null;
    var idleCounted = false;
    var idleAnim = baseSheet.animations && baseSheet.animations.idle;
    if (idleAnim && idleAnim.length && !_policy.reduced && _policy.maxIdles > 0) {
      idleSprite = new PIXI.AnimatedSprite(idleAnim);
      idleSprite.anchor.set(0.5, 1);
      idleSprite.animationSpeed = 7 / 60;              /* ~7fps breathing */
      idleSprite.visible = false;
      container.addChild(idleSprite);
    }

    var clipSprite = null;
    var talkTimer = null;
    var self;

    function _showPoseTexture(tex) {
      poseSprite.texture = tex || PIXI.Texture.EMPTY;
      poseSprite.visible = true;
      if (idleSprite) { idleSprite.visible = false; if (idleSprite.playing) idleSprite.stop(); _uncountIdle(); }
      if (clipSprite) clipSprite.visible = false;
    }

    function _countIdle() {
      if (!idleCounted && _activeIdles < _policy.maxIdles) { _activeIdles++; idleCounted = true; return true; }
      return idleCounted;
    }
    function _uncountIdle() {
      if (idleCounted) { _activeIdles--; idleCounted = false; }
    }

    function _maybeIdle() {
      /* idle only in the neutral resting pose, budget permitting */
      if (!idleSprite || currentPose !== neutralName) return;
      if (!_countIdle()) return;
      poseSprite.visible = false;
      idleSprite.visible = true;
      idleSprite.gotoAndPlay(Math.floor(Math.random() * idleAnim.length)); /* staggered phase */
    }

    function setPose(name, instant) {
      var tex = poseTex(name);
      if (!tex) tex = poseTex(neutralName);
      currentPose = name;
      if (_policy.reduced || instant) {
        _showPoseTexture(tex);
        _maybeIdle();
        return;
      }
      /* 160ms cross-fade */
      if (idleSprite && idleSprite.visible) { idleSprite.visible = false; idleSprite.stop(); _uncountIdle(); poseSprite.visible = true; }
      fadeSprite.texture = tex;
      fadeSprite.alpha = 0;
      fadeSprite.visible = true;
      _tween(160, function (k) { fadeSprite.alpha = k; }, function () {
        poseSprite.texture = tex;
        fadeSprite.alpha = 0;
        fadeSprite.visible = false;
        _maybeIdle();
      });
    }

    function playClip(name, o) {
      o = o || {};
      var fallbackPose = (castDef.clips && castDef.clips[name] && castDef.clips[name].fallbackPose) || 'happy';
      var anim = clipsSheet && clipsSheet.animations && clipsSheet.animations['clip_' + name];
      var affordable = anim && anim.length && !_policy.reduced && _activeClips < _policy.maxPerformers;
      if (!affordable) {
        setPose(fallbackPose, _policy.reduced);
        if (o.onComplete) setTimeout(o.onComplete, _policy.reduced ? 250 : 700);
        return false;
      }
      _activeClips++;
      if (!clipSprite) {
        clipSprite = new global.PIXI.AnimatedSprite(anim);
        clipSprite.anchor.set(0.5, 1);
        container.addChild(clipSprite);
      } else {
        clipSprite.textures = anim;
      }
      clipSprite.animationSpeed = 12 / 60;
      clipSprite.loop = !!o.loop;
      poseSprite.visible = false;
      if (idleSprite) { idleSprite.visible = false; idleSprite.stop(); _uncountIdle(); }
      clipSprite.visible = true;
      clipSprite.onComplete = function () {
        _activeClips--;
        clipSprite.visible = false;
        setPose(fallbackPose, true);
        if (o.onComplete) o.onComplete();
      };
      clipSprite.gotoAndPlay(0);
      if (o.loop) { /* looped clips are stopped via stopClip() */ }
      return true;
    }

    function stopClip() {
      if (clipSprite && clipSprite.visible) {
        _activeClips--;
        clipSprite.stop();
        clipSprite.visible = false;
        setPose(currentPose, true);
      }
    }

    function setTalking(on) {
      if (talkTimer) { clearInterval(talkTimer); talkTimer = null; }
      var talkTex = poseTex('talk');
      if (on) {
        if (!talkTex) return;               /* character has no talk pose — stay */
        if (_policy.reduced) { _showPoseTexture(talkTex); return; }
        var flip = false;
        _showPoseTexture(talkTex);
        talkTimer = setInterval(function () {
          flip = !flip;
          _showPoseTexture(flip ? poseTex(currentPose) : talkTex);
        }, 700);
      } else {
        setPose(currentPose, true);
      }
    }

    function destroy() {
      if (talkTimer) clearInterval(talkTimer);
      if (clipSprite && clipSprite.visible) _activeClips--;
      _uncountIdle();
      try { container.destroy({ children: true }); } catch (e) {}
    }

    _maybeIdle();

    self = {
      id: castDef.id,
      container: container,
      setPose: setPose,
      playClip: playClip,
      stopClip: stopClip,
      setTalking: setTalking,
      destroy: destroy
    };
    return self;
  }

  global.SBCast = {
    setPolicy: setPolicy,
    createPerformer: createPerformer,
    _counts: function () { return { clips: _activeClips, idles: _activeIdles }; }
  };
}(typeof window !== 'undefined' ? window : this));
