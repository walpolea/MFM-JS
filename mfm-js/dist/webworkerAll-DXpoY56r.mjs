import { E as y, U as St, T as _e, O as te, j as W, N as Ge, c as We, w as de, k as U, P as yt, s as Ue, C as wt, Q as D, K as T, L as C, b as re, B as E, D as L, a as ze, V as be, W as Ie, I as N, X as Tt, R as q, Y as Ct, Z as G, p as F, _ as vt, $ as Bt, a0 as ie, a1 as Mt, M as Se, a2 as le, n as ye, e as P, a3 as Ft } from "./main-Dh78mr3i.mjs";
import { U as K, T as I, R as ue, S as He, i as fe, b as Le, c as De, j as Ee, e as Pt, r as Oe, o as kt, n as Ye, a as Rt, g as At, k as Gt, m as Wt, B as Xe } from "./colorToUniform-lwrgSmWa.mjs";
import { C as Y } from "./CanvasPool-D0MgbZsJ.mjs";
import { b as Ut } from "./batchSamplersUniformGroup-B3BxwHqx.mjs";
class Ne {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(e) {
    Object.defineProperty(
      this,
      "resizeTo",
      /**
       * The HTML element or window to automatically resize the
       * renderer's view element to match width and height.
       * @member {Window|HTMLElement}
       * @name resizeTo
       * @memberof app.Application#
       */
      {
        set(t) {
          globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = t, t && (globalThis.addEventListener("resize", this.queueResize), this.resize());
        },
        get() {
          return this._resizeTo;
        }
      }
    ), this.queueResize = () => {
      this._resizeTo && (this._cancelResize(), this._resizeId = requestAnimationFrame(() => this.resize()));
    }, this._cancelResize = () => {
      this._resizeId && (cancelAnimationFrame(this._resizeId), this._resizeId = null);
    }, this.resize = () => {
      if (!this._resizeTo)
        return;
      this._cancelResize();
      let t, r;
      if (this._resizeTo === globalThis.window)
        t = globalThis.innerWidth, r = globalThis.innerHeight;
      else {
        const { clientWidth: i, clientHeight: s } = this._resizeTo;
        t = i, r = s;
      }
      this.renderer.resize(t, r), this.render();
    }, this._resizeId = null, this._resizeTo = null, this.resizeTo = e.resizeTo || null;
  }
  /**
   * Clean up the ticker, scoped to application
   * @static
   * @private
   */
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize), this._cancelResize(), this._cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
  }
}
Ne.extension = y.Application;
class Ke {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(e) {
    e = Object.assign({
      autoStart: !0,
      sharedTicker: !1
    }, e), Object.defineProperty(
      this,
      "ticker",
      {
        set(t) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = t, t && t.add(this.render, this, St.LOW);
        },
        get() {
          return this._ticker;
        }
      }
    ), this.stop = () => {
      this._ticker.stop();
    }, this.start = () => {
      this._ticker.start();
    }, this._ticker = null, this.ticker = e.sharedTicker ? _e.shared : new _e(), e.autoStart && this.start();
  }
  /**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */
  static destroy() {
    if (this._ticker) {
      const e = this._ticker;
      this.ticker = null, e.destroy();
    }
  }
}
Ke.extension = y.Application;
class je {
  constructor(e) {
    this._renderer = e;
  }
  push(e, t, r) {
    this._renderer.renderPipes.batch.break(r), r.add({
      renderPipeId: "filter",
      canBundle: !1,
      action: "pushFilter",
      container: t,
      filterEffect: e
    });
  }
  pop(e, t, r) {
    this._renderer.renderPipes.batch.break(r), r.add({
      renderPipeId: "filter",
      action: "popFilter",
      canBundle: !1
    });
  }
  execute(e) {
    e.action === "pushFilter" ? this._renderer.filter.push(e) : e.action === "popFilter" && this._renderer.filter.pop();
  }
  destroy() {
    this._renderer = null;
  }
}
je.extension = {
  type: [
    y.WebGLPipes,
    y.WebGPUPipes,
    y.CanvasPipes
  ],
  name: "filter"
};
const zt = new W();
function It(n, e) {
  return e.clear(), Ve(n, e), e.isValid || e.set(0, 0, 0, 0), n.isRenderGroupRoot ? e.applyMatrix(n.renderGroup.localTransform) : e.applyMatrix(n.renderGroup.worldTransform), e;
}
function Ve(n, e) {
  if (n.localDisplayStatus !== 7 || !n.measurable)
    return;
  const t = !!n.effects.length;
  let r = e;
  if ((n.isRenderGroupRoot || t) && (r = te.get().clear()), n.boundsArea)
    e.addRect(n.boundsArea, n.worldTransform);
  else {
    if (n.renderPipeId) {
      const s = n.bounds;
      r.addFrame(
        s.minX,
        s.minY,
        s.maxX,
        s.maxY,
        n.groupTransform
      );
    }
    const i = n.children;
    for (let s = 0; s < i.length; s++)
      Ve(i[s], r);
  }
  if (t) {
    let i = !1;
    for (let s = 0; s < n.effects.length; s++)
      n.effects[s].addBounds && (i || (i = !0, r.applyMatrix(n.renderGroup.worldTransform)), n.effects[s].addBounds(r, !0));
    i && (r.applyMatrix(n.renderGroup.worldTransform.copyTo(zt).invert()), e.addBounds(r, n.relativeGroupTransform)), e.addBounds(r), te.return(r);
  } else
    n.isRenderGroupRoot && (e.addBounds(r, n.relativeGroupTransform), te.return(r));
}
function Ht(n, e) {
  e.clear();
  const t = e.matrix;
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    i.globalDisplayStatus < 7 || (e.matrix = i.worldTransform, i.addBounds(e));
  }
  return e.matrix = t, e;
}
const Lt = new Ge({
  attributes: {
    aPosition: {
      buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      location: 0,
      format: "float32x2",
      stride: 2 * 4,
      offset: 0
    }
  },
  indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3])
});
class $e {
  constructor(e) {
    this._filterStackIndex = 0, this._filterStack = [], this._filterGlobalUniforms = new K({
      uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" }
    }), this._globalFilterBindGroup = new We({}), this.renderer = e;
  }
  /**
   * The back texture of the currently active filter. Requires the filter to have `blendRequired` set to true.
   * @readonly
   */
  get activeBackTexture() {
    var e;
    return (e = this._activeFilterData) == null ? void 0 : e.backTexture;
  }
  push(e) {
    var u;
    const t = this.renderer, r = e.filterEffect.filters;
    this._filterStack[this._filterStackIndex] || (this._filterStack[this._filterStackIndex] = this._getFilterData());
    const i = this._filterStack[this._filterStackIndex];
    if (this._filterStackIndex++, r.length === 0) {
      i.skip = !0;
      return;
    }
    const s = i.bounds;
    e.renderables ? Ht(e.renderables, s) : e.filterEffect.filterArea ? (s.clear(), s.addRect(e.filterEffect.filterArea), s.applyMatrix(e.container.worldTransform)) : It(e.container, s);
    const a = t.renderTarget.rootRenderTarget.colorTexture.source;
    let o = a._resolution, l = 0, c = a.antialias, h = !1, d = !1;
    for (let f = 0; f < r.length; f++) {
      const p = r[f];
      if (o = Math.min(o, p.resolution), l += p.padding, p.antialias !== "inherit" && (p.antialias === "on" ? c = !0 : c = !1), !!!(p.compatibleRenderers & t.type)) {
        d = !1;
        break;
      }
      if (p.blendRequired && !(((u = t.backBuffer) == null ? void 0 : u.useBackBuffer) ?? !0)) {
        de("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."), d = !1;
        break;
      }
      d = p.enabled || d, h = h || p.blendRequired;
    }
    if (!d) {
      i.skip = !0;
      return;
    }
    if (s.scale(o).fit(t.renderTarget.rootViewPort).scale(1 / o).pad(l).ceil(), !s.isPositive) {
      i.skip = !0;
      return;
    }
    i.skip = !1, i.bounds = s, i.blendRequired = h, i.container = e.container, i.filterEffect = e.filterEffect, i.previousRenderSurface = t.renderTarget.renderSurface, i.inputTexture = I.getOptimalTexture(
      s.width,
      s.height,
      o,
      c
    ), t.renderTarget.bind(i.inputTexture, !0), t.globalUniforms.push({
      offset: s
    });
  }
  pop() {
    const e = this.renderer;
    this._filterStackIndex--;
    const t = this._filterStack[this._filterStackIndex];
    if (t.skip)
      return;
    this._activeFilterData = t;
    const r = t.inputTexture, i = t.bounds;
    let s = U.EMPTY;
    if (e.renderTarget.finishRenderPass(), t.blendRequired) {
      const o = this._filterStackIndex > 0 ? this._filterStack[this._filterStackIndex - 1].bounds : null, l = e.renderTarget.getRenderTarget(t.previousRenderSurface);
      s = this.getBackTexture(l, i, o);
    }
    t.backTexture = s;
    const a = t.filterEffect.filters;
    if (this._globalFilterBindGroup.setResource(r.source.style, 2), this._globalFilterBindGroup.setResource(s.source, 3), e.globalUniforms.pop(), a.length === 1)
      a[0].apply(this, r, t.previousRenderSurface, !1), I.returnTexture(r);
    else {
      let o = t.inputTexture, l = I.getOptimalTexture(
        i.width,
        i.height,
        o.source._resolution,
        !1
      ), c = 0;
      for (c = 0; c < a.length - 1; ++c) {
        a[c].apply(this, o, l, !0);
        const d = o;
        o = l, l = d;
      }
      a[c].apply(this, o, t.previousRenderSurface, !1), I.returnTexture(o), I.returnTexture(l);
    }
    t.blendRequired && I.returnTexture(s);
  }
  getBackTexture(e, t, r) {
    const i = e.colorTexture.source._resolution, s = I.getOptimalTexture(
      t.width,
      t.height,
      i,
      !1
    );
    let a = t.minX, o = t.minY;
    r && (a -= r.minX, o -= r.minY), a = Math.floor(a * i), o = Math.floor(o * i);
    const l = Math.ceil(t.width * i), c = Math.ceil(t.height * i);
    return this.renderer.renderTarget.copyToTexture(
      e,
      s,
      { x: a, y: o },
      { width: l, height: c },
      { x: 0, y: 0 }
    ), s;
  }
  applyFilter(e, t, r, i) {
    const s = this.renderer, a = this._filterStack[this._filterStackIndex], o = a.bounds, l = yt.shared, h = a.previousRenderSurface === r;
    let d = this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution, u = this._filterStackIndex - 1;
    for (; u > 0 && this._filterStack[u].skip; )
      --u;
    u > 0 && (d = this._filterStack[u].inputTexture.source._resolution);
    const f = this._filterGlobalUniforms, p = f.uniforms, m = p.uOutputFrame, x = p.uInputSize, _ = p.uInputPixel, b = p.uInputClamp, S = p.uGlobalFrame, w = p.uOutputTexture;
    if (h) {
      let B = this._filterStackIndex;
      for (; B > 0; ) {
        B--;
        const R = this._filterStack[this._filterStackIndex - 1];
        if (!R.skip) {
          l.x = R.bounds.minX, l.y = R.bounds.minY;
          break;
        }
      }
      m[0] = o.minX - l.x, m[1] = o.minY - l.y;
    } else
      m[0] = 0, m[1] = 0;
    m[2] = t.frame.width, m[3] = t.frame.height, x[0] = t.source.width, x[1] = t.source.height, x[2] = 1 / x[0], x[3] = 1 / x[1], _[0] = t.source.pixelWidth, _[1] = t.source.pixelHeight, _[2] = 1 / _[0], _[3] = 1 / _[1], b[0] = 0.5 * _[2], b[1] = 0.5 * _[3], b[2] = t.frame.width * x[2] - 0.5 * _[2], b[3] = t.frame.height * x[3] - 0.5 * _[3];
    const k = this.renderer.renderTarget.rootRenderTarget.colorTexture;
    S[0] = l.x * d, S[1] = l.y * d, S[2] = k.source.width * d, S[3] = k.source.height * d;
    const v = this.renderer.renderTarget.getRenderTarget(r);
    if (s.renderTarget.bind(r, !!i), r instanceof U ? (w[0] = r.frame.width, w[1] = r.frame.height) : (w[0] = v.width, w[1] = v.height), w[2] = v.isRoot ? -1 : 1, f.update(), s.renderPipes.uniformBatch) {
      const B = s.renderPipes.uniformBatch.getUboResource(f);
      this._globalFilterBindGroup.setResource(B, 0);
    } else
      this._globalFilterBindGroup.setResource(f, 0);
    this._globalFilterBindGroup.setResource(t.source, 1), this._globalFilterBindGroup.setResource(t.source.style, 2), e.groups[0] = this._globalFilterBindGroup, s.encoder.draw({
      geometry: Lt,
      shader: e,
      state: e._state,
      topology: "triangle-list"
    }), s.type === ue.WEBGL && s.renderTarget.finishRenderPass();
  }
  _getFilterData() {
    return {
      skip: !1,
      inputTexture: null,
      bounds: new Ue(),
      container: null,
      filterEffect: null,
      blendRequired: !1,
      previousRenderSurface: null
    };
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(e, t) {
    const r = this._activeFilterData, i = e.set(
      r.inputTexture._source.width,
      0,
      0,
      r.inputTexture._source.height,
      r.bounds.minX,
      r.bounds.minY
    ), s = t.worldTransform.copyTo(W.shared);
    return s.invert(), i.prepend(s), i.scale(
      1 / t.texture.frame.width,
      1 / t.texture.frame.height
    ), i.translate(t.anchor.x, t.anchor.y), i;
  }
}
$e.extension = {
  type: [
    y.WebGLSystem,
    y.WebGPUSystem
  ],
  name: "filter"
};
class Q extends wt {
  /**
   * @param options - Options for the Graphics.
   */
  constructor(e) {
    e instanceof D && (e = { context: e });
    const { context: t, roundPixels: r, ...i } = e || {};
    super({
      label: "Graphics",
      ...i
    }), this.canBundle = !0, this.renderPipeId = "graphics", this._roundPixels = 0, t ? this._context = t : this._context = this._ownedContext = new D(), this._context.on("update", this.onViewUpdate, this), this.allowChildren = !1, this.roundPixels = r ?? !1;
  }
  set context(e) {
    e !== this._context && (this._context.off("update", this.onViewUpdate, this), this._context = e, this._context.on("update", this.onViewUpdate, this), this.onViewUpdate());
  }
  get context() {
    return this._context;
  }
  /**
   * The local bounds of the graphic.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._context.bounds;
  }
  /**
   * Adds the bounds of this object to the bounds object.
   * @param bounds - The output bounds object.
   */
  addBounds(e) {
    e.addBounds(this._context.bounds);
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(e) {
    return this._context.containsPoint(e);
  }
  /**
   *  Whether or not to round the x/y position of the graphic.
   * @type {boolean}
   */
  get roundPixels() {
    return !!this._roundPixels;
  }
  set roundPixels(e) {
    this._roundPixels = e ? 1 : 0;
  }
  onViewUpdate() {
    this._didChangeId += 4096, this._didGraphicsUpdate = !0, !this.didViewUpdate && (this.didViewUpdate = !0, this.renderGroup && this.renderGroup.onChildViewUpdate(this));
  }
  /**
   * Destroys this graphics renderable and optionally its context.
   * @param options - Options parameter. A boolean will act as if all options
   *
   * If the context was created by this graphics and `destroy(false)` or `destroy()` is called
   * then the context will still be destroyed.
   *
   * If you want to explicitly not destroy this context that this graphics created,
   * then you should pass destroy({ context: false })
   *
   * If the context was passed in as an argument to the constructor then it will not be destroyed
   * @param {boolean} [options.texture=false] - Should destroy the texture of the graphics context
   * @param {boolean} [options.textureSource=false] - Should destroy the texture source of the graphics context
   * @param {boolean} [options.context=false] - Should destroy the context
   */
  destroy(e) {
    this._ownedContext && !e ? this._ownedContext.destroy(e) : (e === !0 || (e == null ? void 0 : e.context) === !0) && this._context.destroy(e), this._ownedContext = null, this._context = null, super.destroy(e);
  }
  _callContextMethod(e, t) {
    return this.context[e](...t), this;
  }
  // --------------------------------------- GraphicsContext methods ---------------------------------------
  setFillStyle(...e) {
    return this._callContextMethod("setFillStyle", e);
  }
  setStrokeStyle(...e) {
    return this._callContextMethod("setStrokeStyle", e);
  }
  fill(...e) {
    return this._callContextMethod("fill", e);
  }
  stroke(...e) {
    return this._callContextMethod("stroke", e);
  }
  texture(...e) {
    return this._callContextMethod("texture", e);
  }
  /** Begins a new path. */
  beginPath() {
    return this._callContextMethod("beginPath", []);
  }
  cut(...e) {
    return this._callContextMethod("cut", e);
  }
  arc(...e) {
    return this._callContextMethod("arc", e);
  }
  arcTo(...e) {
    return this._callContextMethod("arcTo", e);
  }
  arcToSvg(...e) {
    return this._callContextMethod("arcToSvg", e);
  }
  bezierCurveTo(...e) {
    return this._callContextMethod("bezierCurveTo", e);
  }
  closePath(...e) {
    return this._callContextMethod("closePath", e);
  }
  ellipse(...e) {
    return this._callContextMethod("ellipse", e);
  }
  circle(...e) {
    return this._callContextMethod("circle", e);
  }
  path(...e) {
    return this._callContextMethod("path", e);
  }
  lineTo(...e) {
    return this._callContextMethod("lineTo", e);
  }
  moveTo(...e) {
    return this._callContextMethod("moveTo", e);
  }
  quadraticCurveTo(...e) {
    return this._callContextMethod("quadraticCurveTo", e);
  }
  rect(...e) {
    return this._callContextMethod("rect", e);
  }
  roundRect(...e) {
    return this._callContextMethod("roundRect", e);
  }
  poly(...e) {
    return this._callContextMethod("poly", e);
  }
  regularPoly(...e) {
    return this._callContextMethod("regularPoly", e);
  }
  roundPoly(...e) {
    return this._callContextMethod("roundPoly", e);
  }
  roundShape(...e) {
    return this._callContextMethod("roundShape", e);
  }
  filletRect(...e) {
    return this._callContextMethod("filletRect", e);
  }
  chamferRect(...e) {
    return this._callContextMethod("chamferRect", e);
  }
  star(...e) {
    return this._callContextMethod("star", e);
  }
  svg(...e) {
    return this._callContextMethod("svg", e);
  }
  restore(...e) {
    return this._callContextMethod("restore", e);
  }
  save(...e) {
    return this._callContextMethod("save", e);
  }
  getTransform(...e) {
    return this._callContextMethod("getTransform", e);
  }
  resetTransform(...e) {
    return this._callContextMethod("resetTransform", e);
  }
  rotateTransform(...e) {
    return this._callContextMethod("rotate", e);
  }
  scaleTransform(...e) {
    return this._callContextMethod("scale", e);
  }
  setTransform(...e) {
    return this._callContextMethod("setTransform", e);
  }
  transform(...e) {
    return this._callContextMethod("transform", e);
  }
  translateTransform(...e) {
    return this._callContextMethod("translate", e);
  }
  clear(...e) {
    return this._callContextMethod("clear", e);
  }
  /**
   * The fill style to use.
   * @type {ConvertedFillStyle}
   */
  get fillStyle() {
    return this._context.fillStyle;
  }
  set fillStyle(e) {
    this._context.fillStyle = e;
  }
  /**
   * The stroke style to use.
   * @type {ConvertedStrokeStyle}
   */
  get strokeStyle() {
    return this._context.strokeStyle;
  }
  set strokeStyle(e) {
    this._context.strokeStyle = e;
  }
  /**
   * Creates a new Graphics object.
   * Note that only the context of the object is cloned, not its transform (position,scale,etc)
   * @param deep - Whether to create a deep clone of the graphics object. If false, the context
   * will be shared between the two objects (default false). If true, the context will be
   * cloned (recommended if you need to modify the context in any way).
   * @returns - A clone of the graphics object
   */
  clone(e = !1) {
    return e ? new Q(this._context.clone()) : (this._ownedContext = null, new Q(this._context));
  }
  // -------- v7 deprecations ---------
  /**
   * @param width
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#setStrokeStyle} instead
   */
  lineStyle(e, t, r) {
    T(C, "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");
    const i = {};
    return e && (i.width = e), t && (i.color = t), r && (i.alpha = r), this.context.strokeStyle = i, this;
  }
  /**
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  beginFill(e, t) {
    T(C, "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
    const r = {};
    return e && (r.color = e), t && (r.alpha = t), this.context.fillStyle = r, this;
  }
  /**
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  endFill() {
    T(C, "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."), this.context.fill();
    const e = this.context.strokeStyle;
    return (e.width !== D.defaultStrokeStyle.width || e.color !== D.defaultStrokeStyle.color || e.alpha !== D.defaultStrokeStyle.alpha) && this.context.stroke(), this;
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#circle} instead
   */
  drawCircle(...e) {
    return T(C, "Graphics#drawCircle has been renamed to Graphics#circle"), this._callContextMethod("circle", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#ellipse} instead
   */
  drawEllipse(...e) {
    return T(C, "Graphics#drawEllipse has been renamed to Graphics#ellipse"), this._callContextMethod("ellipse", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#poly} instead
   */
  drawPolygon(...e) {
    return T(C, "Graphics#drawPolygon has been renamed to Graphics#poly"), this._callContextMethod("poly", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#rect} instead
   */
  drawRect(...e) {
    return T(C, "Graphics#drawRect has been renamed to Graphics#rect"), this._callContextMethod("rect", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#roundRect} instead
   */
  drawRoundedRect(...e) {
    return T(C, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect"), this._callContextMethod("roundRect", e);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#star} instead
   */
  drawStar(...e) {
    return T(C, "Graphics#drawStar has been renamed to Graphics#star"), this._callContextMethod("star", e);
  }
}
const qe = class Qe extends Ge {
  constructor(...e) {
    let t = e[0] ?? {};
    t instanceof Float32Array && (T(C, "use new MeshGeometry({ positions, uvs, indices }) instead"), t = {
      positions: t,
      uvs: e[1],
      indices: e[2]
    }), t = { ...Qe.defaultOptions, ...t };
    const r = t.positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), i = t.uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), s = t.indices || new Uint32Array([0, 1, 2, 0, 2, 3]), a = t.shrinkBuffersToFit, o = new re({
      data: r,
      label: "attribute-mesh-positions",
      shrinkToFit: a,
      usage: E.VERTEX | E.COPY_DST
    }), l = new re({
      data: i,
      label: "attribute-mesh-uvs",
      shrinkToFit: a,
      usage: E.VERTEX | E.COPY_DST
    }), c = new re({
      data: s,
      label: "index-mesh-buffer",
      shrinkToFit: a,
      usage: E.INDEX | E.COPY_DST
    });
    super({
      attributes: {
        aPosition: {
          buffer: o,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        },
        aUV: {
          buffer: l,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        }
      },
      indexBuffer: c,
      topology: t.topology
    }), this.batchMode = "auto";
  }
  /** The positions of the mesh. */
  get positions() {
    return this.attributes.aPosition.buffer.data;
  }
  set positions(e) {
    this.attributes.aPosition.buffer.data = e;
  }
  /** The UVs of the mesh. */
  get uvs() {
    return this.attributes.aUV.buffer.data;
  }
  set uvs(e) {
    this.attributes.aUV.buffer.data = e;
  }
  /** The indices of the mesh. */
  get indices() {
    return this.indexBuffer.data;
  }
  set indices(e) {
    this.indexBuffer.data = e;
  }
};
qe.defaultOptions = {
  topology: "triangle-list",
  shrinkBuffersToFit: !1
};
let pe = qe;
const Dt = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
function Z(n) {
  const e = typeof n.fontSize == "number" ? `${n.fontSize}px` : n.fontSize;
  let t = n.fontFamily;
  Array.isArray(n.fontFamily) || (t = n.fontFamily.split(","));
  for (let r = t.length - 1; r >= 0; r--) {
    let i = t[r].trim();
    !/([\"\'])[^\'\"]+\1/.test(i) && !Dt.includes(i) && (i = `"${i}"`), t[r] = i;
  }
  return `${n.fontStyle} ${n.fontVariant} ${n.fontWeight} ${e} ${t.join(",")}`;
}
const se = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
}, z = class g {
  /**
   * Checking that we can use modern canvas 2D API.
   *
   * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
   * @see TextMetrics.experimentalLetterSpacing
   * @see https://developer.mozilla.org/en-US/docs/Web/API/ICanvasRenderingContext2D/letterSpacing
   * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
   */
  static get experimentalLetterSpacingSupported() {
    let e = g._experimentalLetterSpacingSupported;
    if (e !== void 0) {
      const t = L.get().getCanvasRenderingContext2D().prototype;
      e = g._experimentalLetterSpacingSupported = "letterSpacing" in t || "textLetterSpacing" in t;
    }
    return e;
  }
  /**
   * @param text - the text that was measured
   * @param style - the style that was measured
   * @param width - the measured width of the text
   * @param height - the measured height of the text
   * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
   * @param lineWidths - an array of the line widths for each line matched to `lines`
   * @param lineHeight - the measured line height for this style
   * @param maxLineWidth - the maximum line width for all measured lines
   * @param {FontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
   */
  constructor(e, t, r, i, s, a, o, l, c) {
    this.text = e, this.style = t, this.width = r, this.height = i, this.lines = s, this.lineWidths = a, this.lineHeight = o, this.maxLineWidth = l, this.fontProperties = c;
  }
  /**
   * Measures the supplied string of text and returns a Rectangle.
   * @param text - The text to measure.
   * @param style - The text style to use for measuring
   * @param canvas - optional specification of the canvas to use for measuring.
   * @param wordWrap
   * @returns Measured width and height of the text.
   */
  static measureText(e = " ", t, r = g._canvas, i = t.wordWrap) {
    var b;
    const s = `${e}:${t.styleKey}`;
    if (g._measurementCache[s])
      return g._measurementCache[s];
    const a = Z(t), o = g.measureFont(a);
    o.fontSize === 0 && (o.fontSize = t.fontSize, o.ascent = t.fontSize);
    const l = g.__context;
    l.font = a;
    const h = (i ? g._wordWrap(e, t, r) : e).split(/(?:\r\n|\r|\n)/), d = new Array(h.length);
    let u = 0;
    for (let S = 0; S < h.length; S++) {
      const w = g._measureText(h[S], t.letterSpacing, l);
      d[S] = w, u = Math.max(u, w);
    }
    const f = ((b = t._stroke) == null ? void 0 : b.width) || 0;
    let p = u + f;
    t.dropShadow && (p += t.dropShadow.distance);
    const m = t.lineHeight || o.fontSize + f;
    let x = Math.max(m, o.fontSize + f * 2) + (h.length - 1) * (m + t.leading);
    return t.dropShadow && (x += t.dropShadow.distance), new g(
      e,
      t,
      p,
      x,
      h,
      d,
      m + t.leading,
      u,
      o
    );
  }
  static _measureText(e, t, r) {
    let i = !1;
    g.experimentalLetterSpacingSupported && (g.experimentalLetterSpacing ? (r.letterSpacing = `${t}px`, r.textLetterSpacing = `${t}px`, i = !0) : (r.letterSpacing = "0px", r.textLetterSpacing = "0px"));
    let s = r.measureText(e).width;
    return s > 0 && (i ? s -= t : s += (g.graphemeSegmenter(e).length - 1) * t), s;
  }
  /**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   * @param text - String to apply word wrapping to
   * @param style - the style to use when wrapping
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns New string with new lines applied where required
   */
  static _wordWrap(e, t, r = g._canvas) {
    const i = r.getContext("2d", se);
    let s = 0, a = "", o = "";
    const l = /* @__PURE__ */ Object.create(null), { letterSpacing: c, whiteSpace: h } = t, d = g._collapseSpaces(h), u = g._collapseNewlines(h);
    let f = !d;
    const p = t.wordWrapWidth + c, m = g._tokenize(e);
    for (let x = 0; x < m.length; x++) {
      let _ = m[x];
      if (g._isNewline(_)) {
        if (!u) {
          o += g._addLine(a), f = !d, a = "", s = 0;
          continue;
        }
        _ = " ";
      }
      if (d) {
        const S = g.isBreakingSpace(_), w = g.isBreakingSpace(a[a.length - 1]);
        if (S && w)
          continue;
      }
      const b = g._getFromCache(_, c, l, i);
      if (b > p)
        if (a !== "" && (o += g._addLine(a), a = "", s = 0), g.canBreakWords(_, t.breakWords)) {
          const S = g.wordWrapSplit(_);
          for (let w = 0; w < S.length; w++) {
            let k = S[w], v = k, B = 1;
            for (; S[w + B]; ) {
              const A = S[w + B];
              if (!g.canBreakChars(v, A, _, w, t.breakWords))
                k += A;
              else
                break;
              v = A, B++;
            }
            w += B - 1;
            const R = g._getFromCache(k, c, l, i);
            R + s > p && (o += g._addLine(a), f = !1, a = "", s = 0), a += k, s += R;
          }
        } else {
          a.length > 0 && (o += g._addLine(a), a = "", s = 0);
          const S = x === m.length - 1;
          o += g._addLine(_, !S), f = !1, a = "", s = 0;
        }
      else
        b + s > p && (f = !1, o += g._addLine(a), a = "", s = 0), (a.length > 0 || !g.isBreakingSpace(_) || f) && (a += _, s += b);
    }
    return o += g._addLine(a, !1), o;
  }
  /**
   * Convienience function for logging each line added during the wordWrap method.
   * @param line    - The line of text to add
   * @param newLine - Add new line character to end
   * @returns A formatted line
   */
  static _addLine(e, t = !0) {
    return e = g._trimRight(e), e = t ? `${e}
` : e, e;
  }
  /**
   * Gets & sets the widths of calculated characters in a cache object
   * @param key            - The key
   * @param letterSpacing  - The letter spacing
   * @param cache          - The cache
   * @param context        - The canvas context
   * @returns The from cache.
   */
  static _getFromCache(e, t, r, i) {
    let s = r[e];
    return typeof s != "number" && (s = g._measureText(e, t, i) + t, r[e] = s), s;
  }
  /**
   * Determines whether we should collapse breaking spaces.
   * @param whiteSpace - The TextStyle property whiteSpace
   * @returns Should collapse
   */
  static _collapseSpaces(e) {
    return e === "normal" || e === "pre-line";
  }
  /**
   * Determines whether we should collapse newLine chars.
   * @param whiteSpace - The white space
   * @returns should collapse
   */
  static _collapseNewlines(e) {
    return e === "normal";
  }
  /**
   * Trims breaking whitespaces from string.
   * @param text - The text
   * @returns Trimmed string
   */
  static _trimRight(e) {
    if (typeof e != "string")
      return "";
    for (let t = e.length - 1; t >= 0; t--) {
      const r = e[t];
      if (!g.isBreakingSpace(r))
        break;
      e = e.slice(0, -1);
    }
    return e;
  }
  /**
   * Determines if char is a newline.
   * @param char - The character
   * @returns True if newline, False otherwise.
   */
  static _isNewline(e) {
    return typeof e != "string" ? !1 : g._newlines.includes(e.charCodeAt(0));
  }
  /**
   * Determines if char is a breaking whitespace.
   *
   * It allows one to determine whether char should be a breaking whitespace
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param char - The character
   * @param [_nextChar] - The next character
   * @returns True if whitespace, False otherwise.
   */
  static isBreakingSpace(e, t) {
    return typeof e != "string" ? !1 : g._breakingSpaces.includes(e.charCodeAt(0));
  }
  /**
   * Splits a string into words, breaking-spaces and newLine characters
   * @param text - The text
   * @returns A tokenized array
   */
  static _tokenize(e) {
    const t = [];
    let r = "";
    if (typeof e != "string")
      return t;
    for (let i = 0; i < e.length; i++) {
      const s = e[i], a = e[i + 1];
      if (g.isBreakingSpace(s, a) || g._isNewline(s)) {
        r !== "" && (t.push(r), r = ""), t.push(s);
        continue;
      }
      r += s;
    }
    return r !== "" && t.push(r), t;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to customise which words should break
   * Examples are if the token is CJK or numbers.
   * It must return a boolean.
   * @param _token - The token
   * @param breakWords - The style attr break words
   * @returns Whether to break word or not
   */
  static canBreakWords(e, t) {
    return t;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to determine whether a pair of characters
   * should be broken by newlines
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param _char - The character
   * @param _nextChar - The next character
   * @param _token - The token/word the characters are from
   * @param _index - The index in the token of the char
   * @param _breakWords - The style attr break words
   * @returns whether to break word or not
   */
  static canBreakChars(e, t, r, i, s) {
    return !0;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It is called when a token (usually a word) has to be split into separate pieces
   * in order to determine the point to break a word.
   * It must return an array of characters.
   * @param token - The token to split
   * @returns The characters of the token
   * @see CanvasTextMetrics.graphemeSegmenter
   */
  static wordWrapSplit(e) {
    return g.graphemeSegmenter(e);
  }
  /**
   * Calculates the ascent, descent and fontSize of a given font-style
   * @param font - String representing the style of the font
   * @returns Font properties object
   */
  static measureFont(e) {
    if (g._fonts[e])
      return g._fonts[e];
    const t = g._context;
    t.font = e;
    const r = t.measureText(g.METRICS_STRING + g.BASELINE_SYMBOL), i = {
      ascent: r.actualBoundingBoxAscent,
      descent: r.actualBoundingBoxDescent,
      fontSize: r.actualBoundingBoxAscent + r.actualBoundingBoxDescent
    };
    return g._fonts[e] = i, i;
  }
  /**
   * Clear font metrics in metrics cache.
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */
  static clearMetrics(e = "") {
    e ? delete g._fonts[e] : g._fonts = {};
  }
  /**
   * Cached canvas element for measuring text
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _canvas() {
    if (!g.__canvas) {
      let e;
      try {
        const t = new OffscreenCanvas(0, 0), r = t.getContext("2d", se);
        if (r != null && r.measureText)
          return g.__canvas = t, t;
        e = L.get().createCanvas();
      } catch {
        e = L.get().createCanvas();
      }
      e.width = e.height = 10, g.__canvas = e;
    }
    return g.__canvas;
  }
  /**
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _context() {
    return g.__context || (g.__context = g._canvas.getContext("2d", se)), g.__context;
  }
};
z.METRICS_STRING = "|ÉqÅ";
z.BASELINE_SYMBOL = "M";
z.BASELINE_MULTIPLIER = 1.4;
z.HEIGHT_MULTIPLIER = 2;
z.graphemeSegmenter = (() => {
  if (typeof (Intl == null ? void 0 : Intl.Segmenter) == "function") {
    const n = new Intl.Segmenter();
    return (e) => [...n.segment(e)].map((t) => t.segment);
  }
  return (n) => [...n];
})();
z.experimentalLetterSpacing = !1;
z._fonts = {};
z._newlines = [
  10,
  // line feed
  13
  // carriage return
];
z._breakingSpaces = [
  9,
  // character tabulation
  32,
  // space
  8192,
  // en quad
  8193,
  // em quad
  8194,
  // en space
  8195,
  // em space
  8196,
  // three-per-em space
  8197,
  // four-per-em space
  8198,
  // six-per-em space
  8200,
  // punctuation space
  8201,
  // thin space
  8202,
  // hair space
  8287,
  // medium mathematical space
  12288
  // ideographic space
];
z._measurementCache = {};
let H = z;
const we = [
  "_fontFamily",
  "_fontStyle",
  "_fontSize",
  "_fontVariant",
  "_fontWeight",
  "_breakWords",
  "_align",
  "_leading",
  "_letterSpacing",
  "_lineHeight",
  "_textBaseline",
  "_whiteSpace",
  "_wordWrap",
  "_wordWrapWidth",
  "_padding",
  "_cssOverrides",
  "_trim"
];
function Et(n) {
  const e = [];
  let t = 0;
  for (let r = 0; r < we.length; r++) {
    const i = we[r];
    e[t++] = n[i];
  }
  return t = Ze(n._fill, e, t), t = Ot(n._stroke, e, t), e.join("-");
}
function Ze(n, e, t) {
  var r;
  return n && (e[t++] = n.color, e[t++] = n.alpha, e[t++] = (r = n.fill) == null ? void 0 : r.uid), t;
}
function Ot(n, e, t) {
  return n && (t = Ze(n, e, t), e[t++] = n.width, e[t++] = n.alignment, e[t++] = n.cap, e[t++] = n.join, e[t++] = n.miterLimit), t;
}
const ge = class O extends ze {
  constructor(e = {}) {
    super(), Yt(e);
    const t = { ...O.defaultTextStyle, ...e };
    for (const r in t) {
      const i = r;
      this[i] = t[r];
    }
    this.update();
  }
  /**
   * Alignment for multiline text, does not affect single line text.
   * @member {'left'|'center'|'right'|'justify'}
   */
  get align() {
    return this._align;
  }
  set align(e) {
    this._align = e, this.update();
  }
  /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(e) {
    this._breakWords = e, this.update();
  }
  /** Set a drop shadow for the text. */
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(e) {
    e !== null && typeof e == "object" ? this._dropShadow = {
      ...O.defaultDropShadow,
      ...e
    } : this._dropShadow = e ? {
      ...O.defaultDropShadow
    } : null, this.update();
  }
  /** The font family, can be a single font name, or a list of names where the first is the preferred font. */
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(e) {
    this._fontFamily = e, this.update();
  }
  /** The font size (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em') */
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(e) {
    typeof e == "string" ? this._fontSize = parseInt(e, 10) : this._fontSize = e, this.update();
  }
  /**
   * The font style.
   * @member {'normal'|'italic'|'oblique'}
   */
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(e) {
    this._fontStyle = e, this.update();
  }
  /**
   * The font variant.
   * @member {'normal'|'small-caps'}
   */
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(e) {
    this._fontVariant = e, this.update();
  }
  /**
   * The font weight.
   * @member {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(e) {
    this._fontWeight = e, this.update();
  }
  /** The space between lines. */
  get leading() {
    return this._leading;
  }
  set leading(e) {
    this._leading = e, this.update();
  }
  /** The amount of spacing between letters, default is 0. */
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(e) {
    this._letterSpacing = e, this.update();
  }
  /** The line height, a number that represents the vertical space that a letter uses. */
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(e) {
    this._lineHeight = e, this.update();
  }
  /**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   */
  get padding() {
    return this._padding;
  }
  set padding(e) {
    this._padding = e, this.update();
  }
  /** Trim transparent borders. This is an expensive operation so only use this if you have to! */
  get trim() {
    return this._trim;
  }
  set trim(e) {
    this._trim = e, this.update();
  }
  /**
   * The baseline of the text that is rendered.
   * @member {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(e) {
    this._textBaseline = e, this.update();
  }
  /**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   * @member {'normal'|'pre'|'pre-line'}
   */
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(e) {
    this._whiteSpace = e, this.update();
  }
  /** Indicates if word wrap should be used. */
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(e) {
    this._wordWrap = e, this.update();
  }
  /** The width at which text will wrap, it needs wordWrap to be set to true. */
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(e) {
    this._wordWrapWidth = e, this.update();
  }
  /** A fillstyle that will be used on the text e.g., 'red', '#00FF00'. */
  get fill() {
    return this._originalFill;
  }
  set fill(e) {
    e !== this._originalFill && (this._originalFill = e, this._fill = be(
      e === 0 ? "black" : e,
      D.defaultFillStyle
    ), this.update());
  }
  /** A fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'. */
  get stroke() {
    return this._originalStroke;
  }
  set stroke(e) {
    e !== this._originalStroke && (this._originalStroke = e, this._stroke = be(e, D.defaultStrokeStyle), this.update());
  }
  _generateKey() {
    return this._styleKey = Et(this), this._styleKey;
  }
  update() {
    this._styleKey = null, this.emit("update", this);
  }
  /** Resets all properties to the default values */
  reset() {
    const e = O.defaultTextStyle;
    for (const t in e)
      this[t] = e[t];
  }
  get styleKey() {
    return this._styleKey || this._generateKey();
  }
  /**
   * Creates a new TextStyle object with the same values as this one.
   * @returns New cloned TextStyle object
   */
  clone() {
    return new O({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this.dropShadow,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      leading: this.leading,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      textBaseline: this.textBaseline,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth
    });
  }
  /**
   * Destroys this text style.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the texture of the this style
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the this style
   */
  destroy(e = !1) {
    var r, i, s, a;
    if (this.removeAllListeners(), typeof e == "boolean" ? e : e == null ? void 0 : e.texture) {
      const o = typeof e == "boolean" ? e : e == null ? void 0 : e.textureSource;
      (r = this._fill) != null && r.texture && this._fill.texture.destroy(o), (i = this._originalFill) != null && i.texture && this._originalFill.texture.destroy(o), (s = this._stroke) != null && s.texture && this._stroke.texture.destroy(o), (a = this._originalStroke) != null && a.texture && this._originalStroke.texture.destroy(o);
    }
    this._fill = null, this._stroke = null, this.dropShadow = null, this._originalStroke = null, this._originalFill = null;
  }
};
ge.defaultDropShadow = {
  /** Set alpha for the drop shadow */
  alpha: 1,
  /** Set a angle of the drop shadow */
  angle: Math.PI / 6,
  /** Set a shadow blur radius */
  blur: 0,
  /** A fill style to be used on the  e.g., 'red', '#00FF00' */
  color: "black",
  /** Set a distance of the drop shadow */
  distance: 5
};
ge.defaultTextStyle = {
  /**
   * See {@link TextStyle.align}
   * @type {'left'|'center'|'right'|'justify'}
   */
  align: "left",
  /** See {@link TextStyle.breakWords} */
  breakWords: !1,
  /** See {@link TextStyle.dropShadow} */
  dropShadow: null,
  /**
   * See {@link TextStyle.fill}
   * @type {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */
  fill: "black",
  /**
   * See {@link TextStyle.fontFamily}
   * @type {string|string[]}
   */
  fontFamily: "Arial",
  /**
   * See {@link TextStyle.fontSize}
   * @type {number|string}
   */
  fontSize: 26,
  /**
   * See {@link TextStyle.fontStyle}
   * @type {'normal'|'italic'|'oblique'}
   */
  fontStyle: "normal",
  /**
   * See {@link TextStyle.fontVariant}
   * @type {'normal'|'small-caps'}
   */
  fontVariant: "normal",
  /**
   * See {@link TextStyle.fontWeight}
   * @type {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  fontWeight: "normal",
  /** See {@link TextStyle.leading} */
  leading: 0,
  /** See {@link TextStyle.letterSpacing} */
  letterSpacing: 0,
  /** See {@link TextStyle.lineHeight} */
  lineHeight: 0,
  /** See {@link TextStyle.padding} */
  padding: 0,
  /**
   * See {@link TextStyle.stroke}
   * @type {string|number}
   */
  stroke: null,
  /**
   * See {@link TextStyle.textBaseline}
   * @type {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  textBaseline: "alphabetic",
  /** See {@link TextStyle.trim} */
  trim: !1,
  /**
   * See {@link TextStyle.whiteSpace}
   * @type {'normal'|'pre'|'pre-line'}
   */
  whiteSpace: "pre",
  /** See {@link TextStyle.wordWrap} */
  wordWrap: !1,
  /** See {@link TextStyle.wordWrapWidth} */
  wordWrapWidth: 100
};
let ce = ge;
function Yt(n) {
  const e = n;
  if (typeof e.dropShadow == "boolean" && e.dropShadow) {
    const t = ce.defaultDropShadow;
    n.dropShadow = {
      alpha: e.dropShadowAlpha ?? t.alpha,
      angle: e.dropShadowAngle ?? t.angle,
      blur: e.dropShadowBlur ?? t.blur,
      color: e.dropShadowColor ?? t.color,
      distance: e.dropShadowDistance ?? t.distance
    };
  }
  if (e.strokeThickness) {
    T(C, "strokeThickness is now a part of stroke");
    const t = e.stroke;
    n.stroke = {
      color: t,
      width: e.strokeThickness
    };
  }
  if (Array.isArray(e.fill)) {
    T(C, "gradient fill is now a fill pattern: `new FillGradient(...)`");
    const t = new Ie(0, 0, 0, n.fontSize * 1.7), r = e.fill.map((i) => N.shared.setValue(i).toNumber());
    r.forEach((i, s) => {
      const a = e.fillGradientStops[s] ?? s / r.length;
      t.addColorStop(a, i);
    }), n.fill = {
      fill: t
    };
  }
}
function J(n, e) {
  if (n.texture === U.WHITE && !n.fill)
    return N.shared.setValue(n.color).toHex();
  if (n.fill) {
    if (n.fill instanceof Tt) {
      const t = n.fill, r = e.createPattern(t.texture.source.resource, "repeat"), i = t.transform.copyTo(W.shared);
      return i.scale(
        t.texture.frame.width,
        t.texture.frame.height
      ), r.setTransform(i), r;
    } else if (n.fill instanceof Ie) {
      const t = n.fill;
      if (t.type === "linear") {
        const r = e.createLinearGradient(
          t.x0,
          t.y0,
          t.x1,
          t.y1
        );
        return t.gradientStops.forEach((i) => {
          r.addColorStop(i.offset, N.shared.setValue(i.color).toHex());
        }), r;
      }
    }
  } else {
    const t = e.createPattern(n.texture.source.resource, "repeat"), r = n.matrix.copyTo(W.shared);
    return r.scale(n.texture.frame.width, n.texture.frame.height), t.setTransform(r), t;
  }
  return de("FillStyle not recognised", n), "red";
}
class Je extends ze {
  constructor() {
    super(...arguments), this.chars = /* @__PURE__ */ Object.create(null), this.lineHeight = 0, this.fontFamily = "", this.fontMetrics = { fontSize: 0, ascent: 0, descent: 0 }, this.baseLineOffset = 0, this.distanceField = { type: "none", range: 0 }, this.pages = [], this.baseMeasurementFontSize = 100, this.baseRenderedFontSize = 100;
  }
  /**
   * The name of the font face.
   * @deprecated since 8.0.0 Use `fontFamily` instead.
   */
  get font() {
    return T(C, "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."), this.fontFamily;
  }
  /**
   * The map of base page textures (i.e., sheets of glyphs).
   * @deprecated since 8.0.0 Use `pages` instead.
   */
  get pageTextures() {
    return T(C, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages;
  }
  /**
   * The size of the font face in pixels.
   * @deprecated since 8.0.0 Use `fontMetrics.fontSize` instead.
   */
  get size() {
    return T(C, "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."), this.fontMetrics.fontSize;
  }
  /**
   * The kind of distance field for this font or "none".
   * @deprecated since 8.0.0 Use `distanceField.type` instead.
   */
  get distanceFieldRange() {
    return T(C, "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."), this.distanceField.range;
  }
  /**
   * The range of the distance field in pixels.
   * @deprecated since 8.0.0 Use `distanceField.range` instead.
   */
  get distanceFieldType() {
    return T(C, "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."), this.distanceField.type;
  }
  destroy() {
    this.emit("destroy", this), this.removeAllListeners();
    for (const e in this.chars)
      this.chars[e].texture.destroy();
    this.chars = null;
  }
}
function et(n) {
  if (n === "")
    return [];
  typeof n == "string" && (n = [n]);
  const e = [];
  for (let t = 0, r = n.length; t < r; t++) {
    const i = n[t];
    if (Array.isArray(i)) {
      if (i.length !== 2)
        throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);
      if (i[0].length === 0 || i[1].length === 0)
        throw new Error("[BitmapFont]: Invalid character delimiter.");
      const s = i[0].charCodeAt(0), a = i[1].charCodeAt(0);
      if (a < s)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (let o = s, l = a; o <= l; o++)
        e.push(String.fromCharCode(o));
    } else
      e.push(...Array.from(i));
  }
  if (e.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return e;
}
class Te extends Je {
  /**
   * @param options - The options for the dynamic bitmap font.
   */
  constructor(e) {
    super(), this.resolution = 1, this.pages = [], this._padding = 4, this._measureCache = /* @__PURE__ */ Object.create(null), this._currentChars = [], this._currentX = 0, this._currentY = 0, this._currentPageIndex = -1, this._skipKerning = !1;
    const t = e, r = t.style.clone();
    t.overrideFill && (r._fill.color = 16777215, r._fill.alpha = 1, r._fill.texture = U.WHITE, r._fill.fill = null);
    const i = r.fontSize;
    r.fontSize = this.baseMeasurementFontSize;
    const s = Z(r);
    t.overrideSize ? r._stroke && (r._stroke.width *= this.baseRenderedFontSize / i) : r.fontSize = this.baseRenderedFontSize = i, this._style = r, this._skipKerning = t.skipKerning ?? !1, this.resolution = t.resolution ?? 1, this._padding = t.padding ?? 4, this.fontMetrics = H.measureFont(s), this.lineHeight = r.lineHeight || this.fontMetrics.fontSize || r.fontSize;
  }
  ensureCharacters(e) {
    var m, x;
    const t = et(e).filter((_) => !this._currentChars.includes(_)).filter((_, b, S) => S.indexOf(_) === b);
    if (!t.length)
      return;
    this._currentChars = [...this._currentChars, ...t];
    let r;
    this._currentPageIndex === -1 ? r = this._nextPage() : r = this.pages[this._currentPageIndex];
    let { canvas: i, context: s } = r.canvasAndContext, a = r.texture.source;
    const o = this._style;
    let l = this._currentX, c = this._currentY;
    const h = this.baseRenderedFontSize / this.baseMeasurementFontSize, d = this._padding * h, u = o.fontStyle === "italic" ? 2 : 1;
    let f = 0, p = !1;
    for (let _ = 0; _ < t.length; _++) {
      const b = t[_], S = H.measureText(b, o, i, !1);
      S.lineHeight = S.height;
      const w = u * S.width * h, k = S.height * h, v = w + d * 2, B = k + d * 2;
      if (p = !1, b !== `
` && b !== "\r" && b !== "	" && b !== " " && (p = !0, f = Math.ceil(Math.max(B, f))), l + v > 512 && (c += f, f = B, l = 0, c + f > 512)) {
        a.update();
        const A = this._nextPage();
        i = A.canvasAndContext.canvas, s = A.canvasAndContext.context, a = A.texture.source, c = 0;
      }
      const R = w / h - (((m = o.dropShadow) == null ? void 0 : m.distance) ?? 0) - (((x = o._stroke) == null ? void 0 : x.width) ?? 0);
      if (this.chars[b] = {
        id: b.codePointAt(0),
        xOffset: -this._padding,
        yOffset: -this._padding,
        xAdvance: R,
        kerning: {}
      }, p) {
        this._drawGlyph(
          s,
          S,
          l + d,
          c + d,
          h,
          o
        );
        const A = a.width * h, X = a.height * h, j = new q(
          l / A * a.width,
          c / X * a.height,
          v / A * a.width,
          B / X * a.height
        );
        this.chars[b].texture = new U({
          source: a,
          frame: j
        }), l += Math.ceil(v);
      }
    }
    a.update(), this._currentX = l, this._currentY = c, this._skipKerning && this._applyKerning(t, s);
  }
  /**
   * @deprecated since 8.0.0
   * The map of base page textures (i.e., sheets of glyphs).
   */
  get pageTextures() {
    return T(C, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages;
  }
  _applyKerning(e, t) {
    const r = this._measureCache;
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      for (let a = 0; a < this._currentChars.length; a++) {
        const o = this._currentChars[a];
        let l = r[s];
        l || (l = r[s] = t.measureText(s).width);
        let c = r[o];
        c || (c = r[o] = t.measureText(o).width);
        let h = t.measureText(s + o).width, d = h - (l + c);
        d && (this.chars[s].kerning[o] = d), h = t.measureText(s + o).width, d = h - (l + c), d && (this.chars[o].kerning[s] = d);
      }
    }
  }
  _nextPage() {
    this._currentPageIndex++;
    const e = this.resolution, t = Y.getOptimalCanvasAndContext(512, 512, e);
    this._setupContext(t.context, this._style, e);
    const r = e * (this.baseRenderedFontSize / this.baseMeasurementFontSize), i = new U({
      source: new Ct({
        resource: t.canvas,
        resolution: r,
        alphaMode: "premultiply-alpha-on-upload"
      })
    }), s = {
      canvasAndContext: t,
      texture: i
    };
    return this.pages[this._currentPageIndex] = s, s;
  }
  // canvas style!
  _setupContext(e, t, r) {
    t.fontSize = this.baseRenderedFontSize, e.scale(r, r), e.font = Z(t), t.fontSize = this.baseMeasurementFontSize, e.textBaseline = t.textBaseline;
    const i = t._stroke, s = (i == null ? void 0 : i.width) ?? 0;
    if (i && (e.lineWidth = s, e.lineJoin = i.join, e.miterLimit = i.miterLimit, e.strokeStyle = J(i, e)), t._fill && (e.fillStyle = J(t._fill, e)), t.dropShadow) {
      const a = t.dropShadow, o = N.shared.setValue(a.color).toArray(), l = a.blur * r, c = a.distance * r;
      e.shadowColor = `rgba(${o[0] * 255},${o[1] * 255},${o[2] * 255},${a.alpha})`, e.shadowBlur = l, e.shadowOffsetX = Math.cos(a.angle) * c, e.shadowOffsetY = Math.sin(a.angle) * c;
    } else
      e.shadowColor = "black", e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0;
  }
  _drawGlyph(e, t, r, i, s, a) {
    const o = t.text, l = t.fontProperties, c = a._stroke, h = ((c == null ? void 0 : c.width) ?? 0) * s, d = r + h / 2, u = i - h / 2, f = l.descent * s, p = t.lineHeight * s;
    a.stroke && h && e.strokeText(o, d, u + p - f), a._fill && e.fillText(o, d, u + p - f);
  }
  destroy() {
    super.destroy();
    for (let e = 0; e < this.pages.length; e++) {
      const { canvasAndContext: t, texture: r } = this.pages[e];
      Y.returnCanvasAndContext(t), r.destroy(!0);
    }
    this.pages = null;
  }
}
function tt(n, e, t) {
  const r = {
    width: 0,
    height: 0,
    offsetY: 0,
    scale: e.fontSize / t.baseMeasurementFontSize,
    lines: [{
      width: 0,
      charPositions: [],
      spaceWidth: 0,
      spacesIndex: [],
      chars: []
    }]
  };
  r.offsetY = t.baseLineOffset;
  let i = r.lines[0], s = null, a = !0;
  const o = {
    spaceWord: !1,
    width: 0,
    start: 0,
    index: 0,
    // use index to not modify the array as we use it a lot!
    positions: [],
    chars: []
  }, l = (f) => {
    const p = i.width;
    for (let m = 0; m < o.index; m++) {
      const x = f.positions[m];
      i.chars.push(f.chars[m]), i.charPositions.push(x + p);
    }
    i.width += f.width, a = !1, o.width = 0, o.index = 0, o.chars.length = 0;
  }, c = () => {
    let f = i.chars.length - 1, p = i.chars[f];
    for (; p === " "; )
      i.width -= t.chars[p].xAdvance, p = i.chars[--f];
    r.width = Math.max(r.width, i.width), i = {
      width: 0,
      charPositions: [],
      chars: [],
      spaceWidth: 0,
      spacesIndex: []
    }, a = !0, r.lines.push(i), r.height += t.lineHeight;
  }, h = t.baseMeasurementFontSize / e.fontSize, d = e.letterSpacing * h, u = e.wordWrapWidth * h;
  for (let f = 0; f < n.length + 1; f++) {
    let p;
    const m = f === n.length;
    m || (p = n[f]);
    const x = t.chars[p] || t.chars[" "];
    if (/(?:\s)/.test(p) || p === "\r" || p === `
` || m) {
      if (!a && e.wordWrap && i.width + o.width - d > u ? (c(), l(o), m || i.charPositions.push(0)) : (o.start = i.width, l(o), m || i.charPositions.push(0)), p === "\r" || p === `
`)
        i.width !== 0 && c();
      else if (!m) {
        const w = x.xAdvance + (x.kerning[s] || 0) + d;
        i.width += w, i.spaceWidth = w, i.spacesIndex.push(i.charPositions.length), i.chars.push(p);
      }
    } else {
      const S = x.kerning[s] || 0, w = x.xAdvance + S + d;
      o.positions[o.index++] = o.width + S, o.chars.push(p), o.width += w;
    }
    s = p;
  }
  return c(), e.align === "center" ? Xt(r) : e.align === "right" ? Nt(r) : e.align === "justify" && Kt(r), r;
}
function Xt(n) {
  for (let e = 0; e < n.lines.length; e++) {
    const t = n.lines[e], r = n.width / 2 - t.width / 2;
    for (let i = 0; i < t.charPositions.length; i++)
      t.charPositions[i] += r;
  }
}
function Nt(n) {
  for (let e = 0; e < n.lines.length; e++) {
    const t = n.lines[e], r = n.width - t.width;
    for (let i = 0; i < t.charPositions.length; i++)
      t.charPositions[i] += r;
  }
}
function Kt(n) {
  const e = n.width;
  for (let t = 0; t < n.lines.length; t++) {
    const r = n.lines[t];
    let i = 0, s = r.spacesIndex[i++], a = 0;
    const o = r.spacesIndex.length, c = (e - r.width) / o;
    for (let h = 0; h < r.charPositions.length; h++)
      h === s && (s = r.spacesIndex[i++], a += c), r.charPositions[h] += a;
  }
}
class jt {
  constructor() {
    this.ALPHA = [["a", "z"], ["A", "Z"], " "], this.NUMERIC = [["0", "9"]], this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], this.ASCII = [[" ", "~"]], this.defaultOptions = {
      chars: this.ALPHANUMERIC,
      resolution: 1,
      padding: 4,
      skipKerning: !1
    };
  }
  /**
   * Get a font for the specified text and style.
   * @param text - The text to get the font for
   * @param style - The style to use
   */
  getFont(e, t) {
    var a;
    let r = `${t.fontFamily}-bitmap`, i = !0;
    if (t._fill.fill && (r += t._fill.fill.uid, i = !1), !G.has(r)) {
      const o = new Te({
        style: t,
        overrideFill: i,
        overrideSize: !0,
        ...this.defaultOptions
      });
      o.once("destroy", () => G.remove(r)), G.set(
        r,
        o
      );
    }
    const s = G.get(r);
    return (a = s.ensureCharacters) == null || a.call(s, e), s;
  }
  /**
   * Get the layout of a text for the specified style.
   * @param text - The text to get the layout for
   * @param style - The style to use
   */
  getLayout(e, t) {
    const r = this.getFont(e, t);
    return tt(e.split(""), t, r);
  }
  /**
   * Measure the text using the specified style.
   * @param text - The text to measure
   * @param style - The style to use
   */
  measureText(e, t) {
    return this.getLayout(e, t);
  }
  // eslint-disable-next-line max-len
  install(...e) {
    var c, h, d, u;
    let t = e[0];
    typeof t == "string" && (t = {
      name: t,
      style: e[1],
      chars: (c = e[2]) == null ? void 0 : c.chars,
      resolution: (h = e[2]) == null ? void 0 : h.resolution,
      padding: (d = e[2]) == null ? void 0 : d.padding,
      skipKerning: (u = e[2]) == null ? void 0 : u.skipKerning
    }, T(C, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));
    const r = t == null ? void 0 : t.name;
    if (!r)
      throw new Error("[BitmapFontManager] Property `name` is required.");
    t = { ...this.defaultOptions, ...t };
    const i = t.style, s = i instanceof ce ? i : new ce(i), a = s._fill.fill !== null && s._fill.fill !== void 0, o = new Te({
      style: s,
      overrideFill: a,
      skipKerning: t.skipKerning,
      padding: t.padding,
      resolution: t.resolution,
      overrideSize: !1
    }), l = et(t.chars);
    return o.ensureCharacters(l.join("")), G.set(`${r}-bitmap`, o), o.once("destroy", () => G.remove(`${r}-bitmap`)), o;
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * @param {string} name - The name of the bitmap font to uninstall.
   */
  uninstall(e) {
    const t = `${e}-bitmap`, r = G.get(t);
    r && (G.remove(t), r.destroy());
  }
}
const he = new jt();
function Vt() {
  const { userAgent: n } = L.get().getNavigator();
  return /^((?!chrome|android).)*safari/i.test(n);
}
const $t = new Ue();
function rt(n, e, t, r) {
  const i = $t;
  i.minX = 0, i.minY = 0, i.maxX = n.width / r | 0, i.maxY = n.height / r | 0;
  const s = I.getOptimalTexture(
    i.width,
    i.height,
    r,
    !1
  );
  return s.source.uploadMethodId = "image", s.source.resource = n, s.source.alphaMode = "premultiply-alpha-on-upload", s.frame.width = e / r, s.frame.height = t / r, s.source.emit("update", s.source), s.updateUvs(), s;
}
function qt(n, e) {
  const t = e.fontFamily, r = [], i = {}, s = /font-family:([^;"\s]+)/g, a = n.match(s);
  function o(l) {
    i[l] || (r.push(l), i[l] = !0);
  }
  if (Array.isArray(t))
    for (let l = 0; l < t.length; l++)
      o(t[l]);
  else
    o(t);
  a && a.forEach((l) => {
    const c = l.split(":")[1].trim();
    o(c);
  });
  for (const l in e.tagStyles) {
    const c = e.tagStyles[l].fontFamily;
    o(c);
  }
  return r;
}
async function Qt(n) {
  const t = await (await L.get().fetch(n)).blob(), r = new FileReader();
  return await new Promise((s, a) => {
    r.onloadend = () => s(r.result), r.onerror = a, r.readAsDataURL(t);
  });
}
async function Ce(n, e) {
  const t = await Qt(e);
  return `@font-face {
        font-family: "${n.fontFamily}";
        src: url('${t}');
        font-weight: ${n.fontWeight};
        font-style: ${n.fontStyle};
    }`;
}
async function Zt(n, e) {
  const t = n.filter((r) => G.has(r)).map((r, i) => {
    if (!V.has(r)) {
      const { url: s } = G.get(r);
      i === 0 ? V.set(r, Ce(e, s)) : V.set(r, Ce({
        ...ee.defaultFontOptions,
        fontFamily: r
      }, s));
    }
    return V.get(r);
  });
  return (await Promise.all(t)).join(`
`);
}
function Jt(n, e, t, r, i) {
  const { domElement: s, styleElement: a, svgRoot: o } = i;
  s.innerHTML = `<style>${e.cssStyle}</style><div>${n}</div>`, s.setAttribute("style", `transform: scale(${t});transform-origin: top left; display: inline-block`), a.textContent = r;
  const { width: l, height: c } = i.image;
  return o.setAttribute("width", l.toString()), o.setAttribute("height", c.toString()), new XMLSerializer().serializeToString(o);
}
function er(n, e) {
  const t = Y.getOptimalCanvasAndContext(
    n.width,
    n.height,
    e
  ), { context: r } = t;
  return r.clearRect(0, 0, n.width, n.height), r.drawImage(n, 0, 0), Y.returnCanvasAndContext(t), t.canvas;
}
function tr(n, e, t) {
  return new Promise(async (r) => {
    t && await new Promise((i) => setTimeout(i, 100)), n.onload = () => {
      r();
    }, n.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`, n.crossOrigin = "anonymous";
  });
}
const ve = "http://www.w3.org/2000/svg", Be = "http://www.w3.org/1999/xhtml", V = /* @__PURE__ */ new Map();
class it {
  constructor() {
    this.svgRoot = document.createElementNS(ve, "svg"), this.foreignObject = document.createElementNS(ve, "foreignObject"), this.domElement = document.createElementNS(Be, "div"), this.styleElement = document.createElementNS(Be, "style"), this.image = new Image();
    const { foreignObject: e, svgRoot: t, styleElement: r, domElement: i } = this;
    e.setAttribute("width", "10000"), e.setAttribute("height", "10000"), e.style.overflow = "hidden", t.appendChild(e), e.appendChild(r), e.appendChild(i);
  }
}
class ee {
  constructor(e) {
    this._activeTextures = {}, this._renderer = e, this._createCanvas = e.type === ue.WEBGPU;
  }
  getTexture(e) {
    return this._buildTexturePromise(
      e.text,
      e.resolution,
      e.style
    );
  }
  getManagedTexture(e, t, r, i) {
    if (this._activeTextures[i])
      return this._increaseReferenceCount(i), this._activeTextures[i].promise;
    const s = this._buildTexturePromise(e, t, r).then((a) => (this._activeTextures[i].texture = a, a));
    return this._activeTextures[i] = {
      texture: null,
      promise: s,
      usageCount: 1
    }, s;
  }
  async _buildTexturePromise(e, t, r) {
    const i = F.get(it), s = qt(e, r), a = await Zt(s, r), o = rr(e, r, a, i), l = Math.ceil(Math.ceil(Math.max(1, o.width) + r.padding * 2) * t), c = Math.ceil(Math.ceil(Math.max(1, o.height) + r.padding * 2) * t), h = i.image;
    h.width = l | 0, h.height = c | 0;
    const d = Jt(e, r, t, a, i);
    await tr(h, d, Vt() && s.length > 0);
    let u = h;
    this._createCanvas && (u = er(h, t));
    const f = rt(u, h.width, h.height, t);
    return this._createCanvas && this._renderer.texture.initSource(f.source), F.return(i), f;
  }
  _increaseReferenceCount(e) {
    this._activeTextures[e].usageCount++;
  }
  decreaseReferenceCount(e) {
    const t = this._activeTextures[e];
    t && (t.usageCount--, t.usageCount === 0 && (t.texture ? this._cleanUp(t) : t.promise.then((r) => {
      t.texture = r, this._cleanUp(t);
    }).catch(() => {
      de("HTMLTextSystem: Failed to clean texture");
    }), this._activeTextures[e] = null));
  }
  _cleanUp(e) {
    I.returnTexture(e.texture), e.texture.source.resource = null, e.texture.source.uploadMethodId = "unknown";
  }
  getReferenceCount(e) {
    return this._activeTextures[e].usageCount;
  }
  destroy() {
    this._activeTextures = null;
  }
}
ee.extension = {
  type: [
    y.WebGLSystem,
    y.WebGPUSystem,
    y.CanvasSystem
  ],
  name: "htmlText"
};
ee.defaultFontOptions = {
  fontFamily: "Arial",
  fontStyle: "normal",
  fontWeight: "normal"
};
let Me;
function rr(n, e, t, r) {
  r = r || Me || (Me = new it());
  const { domElement: i, styleElement: s, svgRoot: a } = r;
  i.innerHTML = `<style>${e.cssStyle}</style><div>${n}</div>`, i.setAttribute("style", "transform-origin: top left; display: inline-block"), t && (s.textContent = t), document.body.appendChild(a);
  const o = i.getBoundingClientRect();
  a.remove();
  const l = H.measureFont(e.fontStyle).descent;
  return {
    width: o.width,
    height: o.height + l
  };
}
class st {
  constructor(e, t) {
    this.state = He.for2d(), this._graphicsBatchesHash = /* @__PURE__ */ Object.create(null), this.renderer = e, this._adaptor = t, this._adaptor.init();
  }
  validateRenderable(e) {
    const t = e.context, r = !!this._graphicsBatchesHash[e.uid], i = this.renderer.graphicsContext.updateGpuContext(t);
    return !!(i.isBatchable || r !== i.isBatchable);
  }
  addRenderable(e, t) {
    const r = this.renderer.graphicsContext.updateGpuContext(e.context);
    e._didGraphicsUpdate && (e._didGraphicsUpdate = !1, this._rebuild(e)), r.isBatchable ? this._addToBatcher(e, t) : (this.renderer.renderPipes.batch.break(t), t.add(e));
  }
  updateRenderable(e) {
    const t = this._graphicsBatchesHash[e.uid];
    if (t)
      for (let r = 0; r < t.length; r++) {
        const i = t[r];
        i.batcher.updateElement(i);
      }
  }
  destroyRenderable(e) {
    this._graphicsBatchesHash[e.uid] && this._removeBatchForRenderable(e.uid);
  }
  execute(e) {
    if (!e.isRenderable)
      return;
    const t = this.renderer, r = e.context;
    if (!t.graphicsContext.getGpuContext(r).batches.length)
      return;
    const s = r.customShader || this._adaptor.shader;
    this.state.blendMode = e.groupBlendMode;
    const a = s.resources.localUniforms.uniforms;
    a.uTransformMatrix = e.groupTransform, a.uRound = t._roundPixels | e._roundPixels, fe(
      e.groupColorAlpha,
      a.uColor,
      0
    ), this._adaptor.execute(this, e);
  }
  _rebuild(e) {
    const t = !!this._graphicsBatchesHash[e.uid], r = this.renderer.graphicsContext.updateGpuContext(e.context);
    t && this._removeBatchForRenderable(e.uid), r.isBatchable && this._initBatchesForRenderable(e), e.batched = r.isBatchable;
  }
  _addToBatcher(e, t) {
    const r = this.renderer.renderPipes.batch, i = this._getBatchesForRenderable(e);
    for (let s = 0; s < i.length; s++) {
      const a = i[s];
      r.addToBatch(a, t);
    }
  }
  _getBatchesForRenderable(e) {
    return this._graphicsBatchesHash[e.uid] || this._initBatchesForRenderable(e);
  }
  _initBatchesForRenderable(e) {
    const t = e.context, r = this.renderer.graphicsContext.getGpuContext(t), i = this.renderer._roundPixels | e._roundPixels, s = r.batches.map((a) => {
      const o = F.get(vt);
      return a.copyTo(o), o.renderable = e, o.roundPixels = i, o;
    });
    return this._graphicsBatchesHash[e.uid] = s, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), s;
  }
  _removeBatchForRenderable(e) {
    this._graphicsBatchesHash[e].forEach((t) => {
      F.return(t);
    }), this._graphicsBatchesHash[e] = null;
  }
  destroy() {
    this.renderer = null, this._adaptor.destroy(), this._adaptor = null, this.state = null;
    for (const e in this._graphicsBatchesHash)
      this._removeBatchForRenderable(e);
    this._graphicsBatchesHash = null;
  }
}
st.extension = {
  type: [
    y.WebGLPipes,
    y.WebGPUPipes,
    y.CanvasPipes
  ],
  name: "graphics"
};
const nt = class at extends pe {
  constructor(...e) {
    super({});
    let t = e[0] ?? {};
    typeof t == "number" && (T(C, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"), t = {
      width: t,
      height: e[1],
      verticesX: e[2],
      verticesY: e[3]
    }), this.build(t);
  }
  /**
   * Refreshes plane coordinates
   * @param options - Options to be applied to plane geometry
   */
  build(e) {
    e = { ...at.defaultOptions, ...e }, this.verticesX = this.verticesX ?? e.verticesX, this.verticesY = this.verticesY ?? e.verticesY, this.width = this.width ?? e.width, this.height = this.height ?? e.height;
    const t = this.verticesX * this.verticesY, r = [], i = [], s = [], a = this.verticesX - 1, o = this.verticesY - 1, l = this.width / a, c = this.height / o;
    for (let d = 0; d < t; d++) {
      const u = d % this.verticesX, f = d / this.verticesX | 0;
      r.push(u * l, f * c), i.push(u / a, f / o);
    }
    const h = a * o;
    for (let d = 0; d < h; d++) {
      const u = d % a, f = d / a | 0, p = f * this.verticesX + u, m = f * this.verticesX + u + 1, x = (f + 1) * this.verticesX + u, _ = (f + 1) * this.verticesX + u + 1;
      s.push(
        p,
        m,
        x,
        m,
        _,
        x
      );
    }
    this.buffers[0].data = new Float32Array(r), this.buffers[1].data = new Float32Array(i), this.indexBuffer.data = new Uint32Array(s), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
  }
};
nt.defaultOptions = {
  width: 100,
  height: 100,
  verticesX: 10,
  verticesY: 10
};
let ir = nt;
class me {
  constructor() {
    this.batcher = null, this.batch = null, this.roundPixels = 0;
  }
  get blendMode() {
    return this.mesh.groupBlendMode;
  }
  reset() {
    this.mesh = null, this.texture = null, this.batcher = null, this.batch = null;
  }
  packIndex(e, t, r) {
    const i = this.geometry.indices;
    for (let s = 0; s < i.length; s++)
      e[t++] = i[s] + r;
  }
  packAttributes(e, t, r, i) {
    const s = this.mesh, a = this.geometry, o = s.groupTransform, l = i << 16 | this.roundPixels & 65535, c = o.a, h = o.b, d = o.c, u = o.d, f = o.tx, p = o.ty, m = a.positions, x = a.uvs, _ = s.groupColorAlpha;
    for (let b = 0; b < m.length; b += 2) {
      const S = m[b], w = m[b + 1];
      e[r] = c * S + d * w + f, e[r + 1] = h * S + u * w + p, e[r + 2] = x[b], e[r + 3] = x[b + 1], t[r + 4] = _, t[r + 5] = l, r += 6;
    }
  }
  get vertexSize() {
    return this.geometry.positions.length / 2;
  }
  get indexSize() {
    return this.geometry.indices.length;
  }
}
class ot {
  constructor(e, t) {
    this.localUniforms = new K({
      uTransformMatrix: { value: new W(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uRound: { value: 0, type: "f32" }
    }), this.localUniformsBindGroup = new We({
      0: this.localUniforms
    }), this._meshDataHash = /* @__PURE__ */ Object.create(null), this._gpuBatchableMeshHash = /* @__PURE__ */ Object.create(null), this.renderer = e, this._adaptor = t, this._adaptor.init();
  }
  validateRenderable(e) {
    const t = this._getMeshData(e), r = t.batched, i = e.batched;
    if (t.batched = i, r !== i)
      return !0;
    if (i) {
      const s = e._geometry;
      if (s.indices.length !== t.indexSize || s.positions.length !== t.vertexSize)
        return t.indexSize = s.indices.length, t.vertexSize = s.positions.length, !0;
      const a = this._getBatchableMesh(e), o = e.texture;
      if (a.texture._source !== o._source && a.texture._source !== o._source)
        return a.batcher.checkAndUpdateTexture(a, o);
    }
    return !1;
  }
  addRenderable(e, t) {
    const r = this.renderer.renderPipes.batch, { batched: i } = this._getMeshData(e);
    if (i) {
      const s = this._getBatchableMesh(e);
      s.texture = e._texture, s.geometry = e._geometry, r.addToBatch(s);
    } else
      r.break(t), t.add({
        renderPipeId: "mesh",
        mesh: e
      });
  }
  updateRenderable(e) {
    if (e.batched) {
      const t = this._gpuBatchableMeshHash[e.uid];
      t.texture = e._texture, t.geometry = e._geometry, t.batcher.updateElement(t);
    }
  }
  destroyRenderable(e) {
    this._meshDataHash[e.uid] = null;
    const t = this._gpuBatchableMeshHash[e.uid];
    F.return(t), this._gpuBatchableMeshHash[e.uid] = null;
  }
  execute({ mesh: e }) {
    if (!e.isRenderable)
      return;
    e.state.blendMode = e.groupBlendMode;
    const t = this.localUniforms;
    t.uniforms.uTransformMatrix = e.groupTransform, t.uniforms.uRound = this.renderer._roundPixels | e._roundPixels, t.update(), fe(
      e.groupColorAlpha,
      t.uniforms.uColor,
      0
    ), this._adaptor.execute(this, e);
  }
  _getMeshData(e) {
    return this._meshDataHash[e.uid] || this._initMeshData(e);
  }
  _initMeshData(e) {
    var t, r;
    return this._meshDataHash[e.uid] = {
      batched: e.batched,
      indexSize: (t = e._geometry.indices) == null ? void 0 : t.length,
      vertexSize: (r = e._geometry.positions) == null ? void 0 : r.length
    }, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), this._meshDataHash[e.uid];
  }
  _getBatchableMesh(e) {
    return this._gpuBatchableMeshHash[e.uid] || this._initBatchableMesh(e);
  }
  _initBatchableMesh(e) {
    const t = F.get(me);
    return t.mesh = e, t.texture = e._texture, t.roundPixels = this.renderer._roundPixels | e._roundPixels, this._gpuBatchableMeshHash[e.uid] = t, t.mesh = e, t;
  }
  destroy() {
    for (const e in this._gpuBatchableMeshHash)
      this._gpuBatchableMeshHash[e] && F.return(this._gpuBatchableMeshHash[e]);
    this._gpuBatchableMeshHash = null, this._meshDataHash = null, this.localUniforms = null, this.localUniformsBindGroup = null, this._adaptor.destroy(), this._adaptor = null, this.renderer = null;
  }
}
ot.extension = {
  type: [
    y.WebGLPipes,
    y.WebGPUPipes,
    y.CanvasPipes
  ],
  name: "mesh"
};
const lt = class ct extends ir {
  constructor(e = {}) {
    e = { ...ct.defaultOptions, ...e }, super({
      width: e.width,
      height: e.height,
      verticesX: 4,
      verticesY: 4
    }), this._textureMatrix = new W(), this.update(e);
  }
  /**
   * Updates the NineSliceGeometry with the options.
   * @param options - The options of the NineSliceGeometry.
   */
  update(e) {
    this.width = e.width ?? this.width, this.height = e.height ?? this.height, this._originalWidth = e.originalWidth ?? this._originalWidth, this._originalHeight = e.originalHeight ?? this._originalHeight, this._leftWidth = e.leftWidth ?? this._leftWidth, this._rightWidth = e.rightWidth ?? this._rightWidth, this._topHeight = e.topHeight ?? this._topHeight, this._bottomHeight = e.bottomHeight ?? this._bottomHeight, e.textureMatrix && this._textureMatrix.copyFrom(e.textureMatrix), this.updateUvs(), this.updatePositions();
  }
  /** Updates the positions of the vertices. */
  updatePositions() {
    const e = this.positions, t = this._leftWidth + this._rightWidth, r = this.width > t ? 1 : this.width / t, i = this._topHeight + this._bottomHeight, s = this.height > i ? 1 : this.height / i, a = Math.min(r, s);
    e[9] = e[11] = e[13] = e[15] = this._topHeight * a, e[17] = e[19] = e[21] = e[23] = this.height - this._bottomHeight * a, e[25] = e[27] = e[29] = e[31] = this.height, e[2] = e[10] = e[18] = e[26] = this._leftWidth * a, e[4] = e[12] = e[20] = e[28] = this.width - this._rightWidth * a, e[6] = e[14] = e[22] = e[30] = this.width, this.getBuffer("aPosition").update();
  }
  /** Updates the UVs of the vertices. */
  updateUvs() {
    const e = this._textureMatrix, t = this.uvs;
    t[0] = t[8] = t[16] = t[24] = 0, t[1] = t[3] = t[5] = t[7] = 0, t[6] = t[14] = t[22] = t[30] = 1, t[25] = t[27] = t[29] = t[31] = 1;
    const r = 1 / this._originalWidth, i = 1 / this._originalHeight;
    t[2] = t[10] = t[18] = t[26] = r * this._leftWidth, t[9] = t[11] = t[13] = t[15] = i * this._topHeight, t[4] = t[12] = t[20] = t[28] = 1 - r * this._rightWidth, t[17] = t[19] = t[21] = t[23] = 1 - i * this._bottomHeight, nr(e, t), this.getBuffer("aUV").update();
  }
};
lt.defaultOptions = {
  /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  width: 100,
  /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  height: 100,
  /** The width of the left column. */
  leftWidth: 10,
  /** The height of the top row. */
  topHeight: 10,
  /** The width of the right column. */
  rightWidth: 10,
  /** The height of the bottom row. */
  bottomHeight: 10,
  /** The original width of the texture */
  originalWidth: 100,
  /** The original height of the texture */
  originalHeight: 100
};
let sr = lt;
function nr(n, e, t) {
  t ?? (t = e);
  const r = n.a, i = n.b, s = n.c, a = n.d, o = n.tx, l = n.ty;
  for (let c = 0; c < e.length; c += 2) {
    const h = e[c], d = e[c + 1];
    t[c] = h * r + d * s + o, t[c + 1] = h * i + d * a + l;
  }
  return t;
}
class ht {
  constructor(e) {
    this._gpuSpriteHash = /* @__PURE__ */ Object.create(null), this._renderer = e;
  }
  addRenderable(e, t) {
    const r = this._getGpuSprite(e);
    e._didSpriteUpdate && this._updateBatchableSprite(e, r), this._renderer.renderPipes.batch.addToBatch(r);
  }
  updateRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    e._didSpriteUpdate && this._updateBatchableSprite(e, t), t.batcher.updateElement(t);
  }
  validateRenderable(e) {
    const t = e._texture, r = this._getGpuSprite(e);
    return r.texture._source !== t._source ? !r.batcher.checkAndUpdateTexture(r, t) : !1;
  }
  destroyRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    F.return(t), this._gpuSpriteHash[e.uid] = null;
  }
  _updateBatchableSprite(e, t) {
    e._didSpriteUpdate = !1, t.geometry.update(e), t.texture = e._texture;
  }
  _getGpuSprite(e) {
    return this._gpuSpriteHash[e.uid] || this._initGPUSprite(e);
  }
  _initGPUSprite(e) {
    const t = new me();
    return t.geometry = new sr(), t.mesh = e, t.texture = e._texture, t.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuSpriteHash[e.uid] = t, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), t;
  }
  destroy() {
    for (const e in this._gpuSpriteHash)
      this._gpuSpriteHash[e].geometry.destroy();
    this._gpuSpriteHash = null, this._renderer = null;
  }
}
ht.extension = {
  type: [
    y.WebGLPipes,
    y.WebGPUPipes,
    y.CanvasPipes
  ],
  name: "nineSliceSprite"
};
const ar = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `
            vUV = (tilingUniforms.uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `
    )
  }
}, or = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `
    ),
    main: (
      /* glsl */
      `
            vUV = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `
    ),
    main: (
      /* glsl */
      `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `
    )
  }
};
let ne, ae;
class lr extends Le {
  constructor() {
    ne ?? (ne = De({
      name: "tiling-sprite-shader",
      bits: [
        Pt,
        ar,
        Oe
      ]
    })), ae ?? (ae = Ee({
      name: "tiling-sprite-shader",
      bits: [
        kt,
        or,
        Ye
      ]
    }));
    const e = new K({
      uMapCoord: { value: new W(), type: "mat3x3<f32>" },
      uClampFrame: { value: new Float32Array([0, 0, 1, 1]), type: "vec4<f32>" },
      uClampOffset: { value: new Float32Array([0, 0]), type: "vec2<f32>" },
      uTextureTransform: { value: new W(), type: "mat3x3<f32>" },
      uSizeAnchor: { value: new Float32Array([100, 100, 0.5, 0.5]), type: "vec4<f32>" }
    });
    super({
      glProgram: ae,
      gpuProgram: ne,
      resources: {
        localUniforms: new K({
          uTransformMatrix: { value: new W(), type: "mat3x3<f32>" },
          uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
          uRound: { value: 0, type: "f32" }
        }),
        tilingUniforms: e,
        uTexture: U.EMPTY.source,
        uSampler: U.EMPTY.source.style
      }
    });
  }
  updateUniforms(e, t, r, i, s, a) {
    const o = this.resources.tilingUniforms, l = a.width, c = a.height, h = a.textureMatrix, d = o.uniforms.uTextureTransform;
    d.set(
      r.a * l / e,
      r.b * l / t,
      r.c * c / e,
      r.d * c / t,
      r.tx / e,
      r.ty / t
    ), d.invert(), o.uniforms.uMapCoord = h.mapCoord, o.uniforms.uClampFrame = h.uClampFrame, o.uniforms.uClampOffset = h.uClampOffset, o.uniforms.uTextureTransform = d, o.uniforms.uSizeAnchor[0] = e, o.uniforms.uSizeAnchor[1] = t, o.uniforms.uSizeAnchor[2] = i, o.uniforms.uSizeAnchor[3] = s, a && (this.resources.uTexture = a.source, this.resources.uSampler = a.source.style);
  }
}
class cr extends pe {
  constructor() {
    super({
      positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      indices: new Uint32Array([0, 1, 2, 0, 2, 3])
    });
  }
}
function hr(n, e) {
  const t = n.anchor.x, r = n.anchor.y;
  e[0] = -t * n.width, e[1] = -r * n.height, e[2] = (1 - t) * n.width, e[3] = -r * n.height, e[4] = (1 - t) * n.width, e[5] = (1 - r) * n.height, e[6] = -t * n.width, e[7] = (1 - r) * n.height;
}
function dr(n, e, t, r) {
  let i = 0;
  const s = n.length / (e || 2), a = r.a, o = r.b, l = r.c, c = r.d, h = r.tx, d = r.ty;
  for (t *= e; i < s; ) {
    const u = n[t], f = n[t + 1];
    n[t] = a * u + l * f + h, n[t + 1] = o * u + c * f + d, t += e, i++;
  }
}
function ur(n, e) {
  const t = n.texture, r = t.frame.width, i = t.frame.height;
  let s = 0, a = 0;
  n._applyAnchorToTexture && (s = n.anchor.x, a = n.anchor.y), e[0] = e[6] = -s, e[2] = e[4] = 1 - s, e[1] = e[3] = -a, e[5] = e[7] = 1 - a;
  const o = W.shared;
  o.copyFrom(n._tileTransform.matrix), o.tx /= n.width, o.ty /= n.height, o.invert(), o.scale(n.width / r, n.height / i), dr(e, 2, 0, o);
}
const $ = new cr();
class dt {
  constructor(e) {
    this._tilingSpriteDataHash = /* @__PURE__ */ Object.create(null), this._renderer = e;
  }
  validateRenderable(e) {
    const t = this._getTilingSpriteData(e), r = t.canBatch;
    this._updateCanBatch(e);
    const i = t.canBatch;
    if (i && i === r) {
      const { batchableMesh: s } = t;
      if (s.texture._source !== e.texture._source)
        return !s.batcher.checkAndUpdateTexture(s, e.texture);
    }
    return r !== i;
  }
  addRenderable(e, t) {
    const r = this._renderer.renderPipes.batch;
    this._updateCanBatch(e);
    const i = this._getTilingSpriteData(e), { geometry: s, canBatch: a } = i;
    if (a) {
      i.batchableMesh || (i.batchableMesh = new me());
      const o = i.batchableMesh;
      e._didTilingSpriteUpdate && (e._didTilingSpriteUpdate = !1, this._updateBatchableMesh(e), o.geometry = s, o.mesh = e, o.texture = e._texture), o.roundPixels = this._renderer._roundPixels | e._roundPixels, r.addToBatch(o);
    } else
      r.break(t), i.shader || (i.shader = new lr()), this.updateRenderable(e), t.add(e);
  }
  execute(e) {
    const { shader: t } = this._tilingSpriteDataHash[e.uid];
    t.groups[0] = this._renderer.globalUniforms.bindGroup;
    const r = t.resources.localUniforms.uniforms;
    r.uTransformMatrix = e.groupTransform, r.uRound = this._renderer._roundPixels | e._roundPixels, fe(
      e.groupColorAlpha,
      r.uColor,
      0
    ), this._renderer.encoder.draw({
      geometry: $,
      shader: t,
      state: He.default2d
    });
  }
  updateRenderable(e) {
    const t = this._getTilingSpriteData(e), { canBatch: r } = t;
    if (r) {
      const { batchableMesh: i } = t;
      e._didTilingSpriteUpdate && this._updateBatchableMesh(e), i.batcher.updateElement(i);
    } else if (e._didTilingSpriteUpdate) {
      const { shader: i } = t;
      i.updateUniforms(
        e.width,
        e.height,
        e._tileTransform.matrix,
        e.anchor.x,
        e.anchor.y,
        e.texture
      );
    }
    e._didTilingSpriteUpdate = !1;
  }
  destroyRenderable(e) {
    var r;
    const t = this._getTilingSpriteData(e);
    t.batchableMesh = null, (r = t.shader) == null || r.destroy(), this._tilingSpriteDataHash[e.uid] = null;
  }
  _getTilingSpriteData(e) {
    return this._tilingSpriteDataHash[e.uid] || this._initTilingSpriteData(e);
  }
  _initTilingSpriteData(e) {
    const t = new pe({
      indices: $.indices,
      positions: $.positions.slice(),
      uvs: $.uvs.slice()
    });
    return this._tilingSpriteDataHash[e.uid] = {
      canBatch: !0,
      renderable: e,
      geometry: t
    }, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), this._tilingSpriteDataHash[e.uid];
  }
  _updateBatchableMesh(e) {
    const t = this._getTilingSpriteData(e), { geometry: r } = t, i = e.texture.source.style;
    i.addressMode !== "repeat" && (i.addressMode = "repeat", i.update()), ur(e, r.uvs), hr(e, r.positions);
  }
  destroy() {
    for (const e in this._tilingSpriteDataHash)
      this.destroyRenderable(this._tilingSpriteDataHash[e].renderable);
    this._tilingSpriteDataHash = null, this._renderer = null;
  }
  _updateCanBatch(e) {
    const t = this._getTilingSpriteData(e), r = e.texture;
    let i = !0;
    return this._renderer.type === ue.WEBGL && (i = this._renderer.context.supports.nonPowOf2wrapping), t.canBatch = r.textureMatrix.isSimple && (i || r.source.isPowerOfTwo), t.canBatch;
  }
}
dt.extension = {
  type: [
    y.WebGLPipes,
    y.WebGPUPipes,
    y.CanvasPipes
  ],
  name: "tilingSprite"
};
const oe = {
  test(n) {
    return typeof n == "string" && n.startsWith("info face=");
  },
  parse(n) {
    const e = n.match(/^[a-z]+\s+.+$/gm), t = {
      info: [],
      common: [],
      page: [],
      char: [],
      chars: [],
      kerning: [],
      kernings: [],
      distanceField: []
    };
    for (const d in e) {
      const u = e[d].match(/^[a-z]+/gm)[0], f = e[d].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), p = {};
      for (const m in f) {
        const x = f[m].split("="), _ = x[0], b = x[1].replace(/"/gm, ""), S = parseFloat(b), w = isNaN(S) ? b : S;
        p[_] = w;
      }
      t[u].push(p);
    }
    const r = {
      chars: {},
      pages: [],
      lineHeight: 0,
      fontSize: 0,
      fontFamily: "",
      distanceField: null,
      baseLineOffset: 0
    }, [i] = t.info, [s] = t.common, [a] = t.distanceField ?? [];
    a && (r.distanceField = {
      range: parseInt(a.distanceRange, 10),
      type: a.fieldType
    }), r.fontSize = parseInt(i.size, 10), r.fontFamily = i.face, r.lineHeight = parseInt(s.lineHeight, 10);
    const o = t.page;
    for (let d = 0; d < o.length; d++)
      r.pages.push({
        id: parseInt(o[d].id, 10) || 0,
        file: o[d].file
      });
    const l = {};
    r.baseLineOffset = r.lineHeight - parseInt(s.base, 10);
    const c = t.char;
    for (let d = 0; d < c.length; d++) {
      const u = c[d], f = parseInt(u.id, 10);
      let p = u.letter ?? u.char ?? String.fromCharCode(f);
      p === "space" && (p = " "), l[f] = p, r.chars[p] = {
        id: f,
        // texture deets..
        page: parseInt(u.page, 10) || 0,
        x: parseInt(u.x, 10),
        y: parseInt(u.y, 10),
        width: parseInt(u.width, 10),
        height: parseInt(u.height, 10),
        xOffset: parseInt(u.xoffset, 10),
        yOffset: parseInt(u.yoffset, 10),
        xAdvance: parseInt(u.xadvance, 10),
        kerning: {}
      };
    }
    const h = t.kerning || [];
    for (let d = 0; d < h.length; d++) {
      const u = parseInt(h[d].first, 10), f = parseInt(h[d].second, 10), p = parseInt(h[d].amount, 10);
      r.chars[l[f]].kerning[l[u]] = p;
    }
    return r;
  }
}, Fe = {
  test(n) {
    const e = n;
    return typeof e != "string" && "getElementsByTagName" in e && e.getElementsByTagName("page").length && e.getElementsByTagName("info")[0].getAttribute("face") !== null;
  },
  parse(n) {
    const e = {
      chars: {},
      pages: [],
      lineHeight: 0,
      fontSize: 0,
      fontFamily: "",
      distanceField: null,
      baseLineOffset: 0
    }, t = n.getElementsByTagName("info")[0], r = n.getElementsByTagName("common")[0], i = n.getElementsByTagName("distanceField")[0];
    i && (e.distanceField = {
      type: i.getAttribute("fieldType"),
      range: parseInt(i.getAttribute("distanceRange"), 10)
    });
    const s = n.getElementsByTagName("page"), a = n.getElementsByTagName("char"), o = n.getElementsByTagName("kerning");
    e.fontSize = parseInt(t.getAttribute("size"), 10), e.fontFamily = t.getAttribute("face"), e.lineHeight = parseInt(r.getAttribute("lineHeight"), 10);
    for (let c = 0; c < s.length; c++)
      e.pages.push({
        id: parseInt(s[c].getAttribute("id"), 10) || 0,
        file: s[c].getAttribute("file")
      });
    const l = {};
    e.baseLineOffset = e.lineHeight - parseInt(r.getAttribute("base"), 10);
    for (let c = 0; c < a.length; c++) {
      const h = a[c], d = parseInt(h.getAttribute("id"), 10);
      let u = h.getAttribute("letter") ?? h.getAttribute("char") ?? String.fromCharCode(d);
      u === "space" && (u = " "), l[d] = u, e.chars[u] = {
        id: d,
        // texture deets..
        page: parseInt(h.getAttribute("page"), 10) || 0,
        x: parseInt(h.getAttribute("x"), 10),
        y: parseInt(h.getAttribute("y"), 10),
        width: parseInt(h.getAttribute("width"), 10),
        height: parseInt(h.getAttribute("height"), 10),
        // render deets..
        xOffset: parseInt(h.getAttribute("xoffset"), 10),
        yOffset: parseInt(h.getAttribute("yoffset"), 10),
        // + baseLineOffset,
        xAdvance: parseInt(h.getAttribute("xadvance"), 10),
        kerning: {}
      };
    }
    for (let c = 0; c < o.length; c++) {
      const h = parseInt(o[c].getAttribute("first"), 10), d = parseInt(o[c].getAttribute("second"), 10), u = parseInt(o[c].getAttribute("amount"), 10);
      e.chars[l[d]].kerning[l[h]] = u;
    }
    return e;
  }
}, Pe = {
  test(n) {
    return typeof n == "string" && n.includes("<font>") ? Fe.test(L.get().parseXML(n)) : !1;
  },
  parse(n) {
    return Fe.parse(L.get().parseXML(n));
  }
};
class ut extends Je {
  constructor(e, t) {
    super();
    const { textures: r, data: i } = e;
    Object.keys(i.pages).forEach((s) => {
      const a = i.pages[parseInt(s, 10)], o = r[a.id];
      this.pages.push({ texture: o });
    }), Object.keys(i.chars).forEach((s) => {
      const a = i.chars[s], o = r[a.page].source, l = new q(
        a.x,
        a.y,
        a.width,
        a.height
      ), c = new U({
        source: o,
        frame: l
      });
      this.chars[s] = {
        id: s.codePointAt(0),
        xOffset: a.xOffset,
        yOffset: a.yOffset,
        xAdvance: a.xAdvance,
        kerning: a.kerning ?? {},
        texture: c
      };
    }), this.baseRenderedFontSize = i.fontSize, this.baseMeasurementFontSize = i.fontSize, this.fontMetrics = {
      ascent: 0,
      descent: 0,
      fontSize: i.fontSize
    }, this.baseLineOffset = i.baseLineOffset, this.lineHeight = i.lineHeight, this.fontFamily = i.fontFamily, this.distanceField = i.distanceField ?? {
      type: "none",
      range: 0
    }, this.url = t;
  }
  /** Destroys the BitmapFont object. */
  destroy() {
    super.destroy();
    for (let e = 0; e < this.pages.length; e++) {
      const { texture: t } = this.pages[e];
      t.destroy(!0);
    }
    this.pages = null;
  }
  /**
   * Generates a bitmap-font for the given style and character set
   * @param options - Setup options for font generation.
   * @returns Font generated by style options.
   * @example
   * import { BitmapFont, BitmapText } from 'pixi.js';
   *
   * BitmapFont.install('TitleFont', {
   *     fontFamily: 'Arial',
   *     fontSize: 12,
   *     strokeThickness: 2,
   *     fill: 'purple',
   * });
   *
   * const title = new BitmapText({ text: 'This is the title', fontFamily: 'TitleFont' });
   */
  static install(e) {
    he.install(e);
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * @param {string} name - The name of the bitmap font to uninstall.
   */
  static uninstall(e) {
    he.uninstall(e);
  }
}
const fr = [".xml", ".fnt"], pr = {
  extension: y.CacheParser,
  test: (n) => n instanceof ut,
  getCacheableAssets(n, e) {
    const t = {};
    return n.forEach((r) => {
      t[r] = e;
    }), t[`${e.fontFamily}-bitmap`] = e, t;
  }
}, gr = {
  extension: {
    type: y.LoadParser,
    priority: Bt.Normal
  },
  test(n) {
    return fr.includes(ie.extname(n).toLowerCase());
  },
  async testParse(n) {
    return oe.test(n) || Pe.test(n);
  },
  async parse(n, e, t) {
    const r = oe.test(n) ? oe.parse(n) : Pe.parse(n), { src: i } = e, { pages: s } = r, a = [];
    for (let h = 0; h < s.length; ++h) {
      const d = s[h].file;
      let u = ie.join(ie.dirname(i), d);
      u = Mt(u, i), a.push(u);
    }
    const o = await t.load(a), l = a.map((h) => o[h]);
    return new ut({
      data: r,
      textures: l
    }, i);
  },
  async load(n, e) {
    return await (await L.get().fetch(n)).text();
  },
  unload(n) {
    n.destroy();
  }
}, mr = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
    ),
    end: (
      /* wgsl */
      `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `
    ),
    main: (
      /* wgsl */
      ` 
            outColor = vColor * calculateMSDFAlpha(outColor, localUniforms.uDistance);
        `
    )
  }
}, xr = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `
    ),
    end: (
      /* glsl */
      `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform float uDistance;
         `
    ),
    main: (
      /* glsl */
      ` 
            outColor = vColor * calculateMSDFAlpha(outColor, uDistance);
        `
    )
  }
}, _r = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* wgsl */
      `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                return alpha;
            }
        `
    )
  }
}, br = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* glsl */
      `
            float calculateMSDFAlpha(vec4 msdfColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                return alpha;
            }
        `
    )
  }
};
class Sr extends Le {
  constructor() {
    const e = new K({
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uTransformMatrix: { value: new W(), type: "mat3x3<f32>" },
      uDistance: { value: 4, type: "f32" },
      uRound: { value: 0, type: "f32" }
    }), t = De({
      name: "sdf-shader",
      bits: [
        Rt,
        At(Se),
        mr,
        _r,
        Oe
      ]
    }), r = Ee({
      name: "sdf-shader",
      bits: [
        Gt,
        Wt(Se),
        xr,
        br,
        Ye
      ]
    });
    super({
      glProgram: r,
      gpuProgram: t,
      resources: {
        localUniforms: e,
        batchSamplers: Ut
      }
    });
  }
}
class ft {
  constructor(e) {
    this._gpuBitmapText = {}, this._renderer = e;
  }
  validateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    return e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, t)), this._renderer.renderPipes.graphics.validateRenderable(t);
  }
  addRenderable(e, t) {
    const r = this._getGpuBitmapText(e);
    ke(e, r), e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, r)), this._renderer.renderPipes.graphics.addRenderable(r, t), r.context.customShader && this._updateDistanceField(e);
  }
  destroyRenderable(e) {
    this._destroyRenderableByUid(e.uid);
  }
  _destroyRenderableByUid(e) {
    F.return(this._gpuBitmapText[e]), this._gpuBitmapText[e] = null;
  }
  updateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    ke(e, t), this._renderer.renderPipes.graphics.updateRenderable(t), t.context.customShader && this._updateDistanceField(e);
  }
  _updateContext(e, t) {
    var f;
    const { context: r } = t, i = he.getFont(e.text, e._style);
    r.clear(), i.distanceField.type !== "none" && (r.customShader || (this._sdfShader || (this._sdfShader = new Sr()), r.customShader = this._sdfShader));
    const s = Array.from(e.text), a = e._style;
    let o = (((f = a._stroke) == null ? void 0 : f.width) || 0) / 2;
    o += i.baseLineOffset;
    const l = tt(s, a, i);
    let c = 0;
    const h = a.padding, d = l.scale;
    r.translate(
      -e._anchor._x * l.width - h,
      -e._anchor._y * (l.height + l.offsetY) - h
    ).scale(d, d);
    const u = a._fill.color;
    for (let p = 0; p < l.lines.length; p++) {
      const m = l.lines[p];
      for (let x = 0; x < m.charPositions.length; x++) {
        const _ = s[c++], b = i.chars[_];
        b != null && b.texture && r.texture(
          b.texture,
          u,
          Math.round(m.charPositions[x] + b.xOffset),
          Math.round(o + b.yOffset)
        );
      }
      o += i.lineHeight;
    }
  }
  _getGpuBitmapText(e) {
    return this._gpuBitmapText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = F.get(Q);
    return this._gpuBitmapText[e.uid] = t, this._updateContext(e, t), e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), this._gpuBitmapText[e.uid];
  }
  _updateDistanceField(e) {
    const t = this._getGpuBitmapText(e).context, r = e._style.fontFamily, i = G.get(`${r}-bitmap`), { a: s, b: a, c: o, d: l } = e.groupTransform, c = Math.sqrt(s * s + a * a), h = Math.sqrt(o * o + l * l), d = (Math.abs(c) + Math.abs(h)) / 2, u = i.baseRenderedFontSize / e._style.fontSize, f = e.resolution ?? this._renderer.resolution, p = d * i.distanceField.range * (1 / u) * f;
    t.customShader.resources.localUniforms.uniforms.uDistance = p;
  }
  destroy() {
    var e;
    for (const t in this._gpuBitmapText)
      this._destroyRenderableByUid(t);
    this._gpuBitmapText = null, (e = this._sdfShader) == null || e.destroy(!0), this._sdfShader = null, this._renderer = null;
  }
}
ft.extension = {
  type: [
    y.WebGLPipes,
    y.WebGPUPipes,
    y.CanvasPipes
  ],
  name: "bitmapText"
};
function ke(n, e) {
  e.groupTransform = n.groupTransform, e.groupColorAlpha = n.groupColorAlpha, e.groupColor = n.groupColor, e.groupBlendMode = n.groupBlendMode, e.globalDisplayStatus = n.globalDisplayStatus, e.groupTransform = n.groupTransform, e.localDisplayStatus = n.localDisplayStatus, e.groupAlpha = n.groupAlpha, e._roundPixels = n._roundPixels;
}
class pt {
  constructor(e) {
    this._gpuText = /* @__PURE__ */ Object.create(null), this._renderer = e;
  }
  validateRenderable(e) {
    const t = this._getGpuText(e), r = e._getKey();
    return t.textureNeedsUploading ? (t.textureNeedsUploading = !1, !0) : t.currentKey !== r;
  }
  addRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), this._renderer.renderPipes.batch.addToBatch(r);
  }
  updateRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), r.batcher.updateElement(r);
  }
  destroyRenderable(e) {
    this._destroyRenderableById(e.uid);
  }
  _destroyRenderableById(e) {
    const t = this._gpuText[e];
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey), F.return(t.batchableSprite), this._gpuText[e] = null;
  }
  _updateText(e) {
    const t = e._getKey(), r = this._getGpuText(e), i = r.batchableSprite;
    r.currentKey !== t && this._updateGpuText(e).catch((a) => {
      console.error(a);
    }), e._didTextUpdate = !1;
    const s = e._style.padding;
    le(i.bounds, e._anchor, i.texture, s);
  }
  async _updateGpuText(e) {
    e._didTextUpdate = !1;
    const t = this._getGpuText(e);
    if (t.generatingTexture)
      return;
    const r = e._getKey();
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey), t.generatingTexture = !0, t.currentKey = r;
    const i = e.resolution ?? this._renderer.resolution, s = await this._renderer.htmlText.getManagedTexture(
      e.text,
      i,
      e._style,
      e._getKey()
    ), a = t.batchableSprite;
    a.texture = t.texture = s, t.generatingTexture = !1, t.textureNeedsUploading = !0, e._onUpdate();
    const o = e._style.padding;
    le(a.bounds, e._anchor, a.texture, o);
  }
  _getGpuText(e) {
    return this._gpuText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = {
      texture: U.EMPTY,
      currentKey: "--",
      batchableSprite: F.get(Xe),
      textureNeedsUploading: !1,
      generatingTexture: !1
    }, r = t.batchableSprite;
    return r.renderable = e, r.texture = U.EMPTY, r.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, r.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuText[e.uid] = t, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), t;
  }
  destroy() {
    for (const e in this._gpuText)
      this._destroyRenderableById(e);
    this._gpuText = null, this._renderer = null;
  }
}
pt.extension = {
  type: [
    y.WebGLPipes,
    y.WebGPUPipes,
    y.CanvasPipes
  ],
  name: "htmlText"
};
class gt {
  constructor(e) {
    this._gpuText = /* @__PURE__ */ Object.create(null), this._renderer = e;
  }
  validateRenderable(e) {
    const t = this._getGpuText(e), r = e._getKey();
    if (t.currentKey !== r) {
      const i = e.resolution ?? this._renderer.resolution, { width: s, height: a } = this._renderer.canvasText.getTextureSize(
        e.text,
        i,
        e._style
      );
      return (
        // is only being used by this text:
        !(this._renderer.canvasText.getReferenceCount(t.currentKey) === 1 && s === t.texture._source.width && a === t.texture._source.height)
      );
    }
    return !1;
  }
  addRenderable(e, t) {
    const i = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), this._renderer.renderPipes.batch.addToBatch(i);
  }
  updateRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), r.batcher.updateElement(r);
  }
  destroyRenderable(e) {
    this._destroyRenderableById(e.uid);
  }
  _destroyRenderableById(e) {
    const t = this._gpuText[e];
    this._renderer.canvasText.decreaseReferenceCount(t.currentKey), F.return(t.batchableSprite), this._gpuText[e] = null;
  }
  _updateText(e) {
    const t = e._getKey(), r = this._getGpuText(e), i = r.batchableSprite;
    r.currentKey !== t && this._updateGpuText(e), e._didTextUpdate = !1;
    const s = e._style.padding;
    le(i.bounds, e._anchor, i.texture, s);
  }
  _updateGpuText(e) {
    const t = this._getGpuText(e), r = t.batchableSprite;
    t.texture && this._renderer.canvasText.decreaseReferenceCount(t.currentKey);
    const i = e.resolution ?? this._renderer.resolution;
    t.texture = r.texture = this._renderer.canvasText.getTexture(
      e.text,
      i,
      e._style,
      e._getKey()
    ), t.currentKey = e._getKey(), r.texture = t.texture;
  }
  _getGpuText(e) {
    return this._gpuText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = {
      texture: null,
      currentKey: "--",
      batchableSprite: F.get(Xe)
    };
    return t.batchableSprite.renderable = e, t.batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, t.batchableSprite.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuText[e.uid] = t, this._updateText(e), e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), t;
  }
  destroy() {
    for (const e in this._gpuText)
      this._destroyRenderableById(e);
    this._gpuText = null, this._renderer = null;
  }
}
gt.extension = {
  type: [
    y.WebGLPipes,
    y.WebGPUPipes,
    y.CanvasPipes
  ],
  name: "text"
};
function Re(n, e, t) {
  for (let r = 0, i = 4 * t * e; r < e; ++r, i += 4)
    if (n[i + 3] !== 0)
      return !1;
  return !0;
}
function Ae(n, e, t, r, i) {
  const s = 4 * e;
  for (let a = r, o = r * s + 4 * t; a <= i; ++a, o += s)
    if (n[o + 3] !== 0)
      return !1;
  return !0;
}
function yr(n, e = 1) {
  const { width: t, height: r } = n, i = n.getContext("2d", {
    willReadFrequently: !0
  });
  if (i === null)
    throw new TypeError("Failed to get canvas 2D context");
  const a = i.getImageData(0, 0, t, r).data;
  let o = 0, l = 0, c = t - 1, h = r - 1;
  for (; l < r && Re(a, t, l); )
    ++l;
  if (l === r)
    return q.EMPTY;
  for (; Re(a, t, h); )
    --h;
  for (; Ae(a, t, o, l, h); )
    ++o;
  for (; Ae(a, t, c, l, h); )
    --c;
  return ++c, ++h, new q(o / e, l / e, (c - o) / e, (h - l) / e);
}
class mt {
  constructor() {
    this._activeTextures = {};
  }
  getTextureSize(e, t, r) {
    const i = H.measureText(e || " ", r);
    let s = Math.ceil(Math.ceil(Math.max(1, i.width) + r.padding * 2) * t), a = Math.ceil(Math.ceil(Math.max(1, i.height) + r.padding * 2) * t);
    return s = Math.ceil(s - 1e-6), a = Math.ceil(a - 1e-6), s = ye(s), a = ye(a), { width: s, height: a };
  }
  getTexture(e, t, r, i) {
    if (this._activeTextures[i])
      return this._increaseReferenceCount(i), this._activeTextures[i].texture;
    const s = H.measureText(e || " ", r), a = Math.ceil(Math.ceil(Math.max(1, s.width) + r.padding * 2) * t), o = Math.ceil(Math.ceil(Math.max(1, s.height) + r.padding * 2) * t), l = Y.getOptimalCanvasAndContext(a, o), { canvas: c } = l;
    this.renderTextToCanvas(e, r, t, l);
    const h = rt(c, a, o, t);
    if (r.trim) {
      const d = yr(c, t);
      h.frame.copyFrom(d), h.updateUvs();
    }
    return this._activeTextures[i] = {
      canvasAndContext: l,
      texture: h,
      usageCount: 1
    }, h;
  }
  _increaseReferenceCount(e) {
    this._activeTextures[e].usageCount++;
  }
  decreaseReferenceCount(e) {
    const t = this._activeTextures[e];
    if (t.usageCount--, t.usageCount === 0) {
      Y.returnCanvasAndContext(t.canvasAndContext), I.returnTexture(t.texture);
      const r = t.texture.source;
      r.resource = null, r.uploadMethodId = "unknown", r.alphaMode = "no-premultiply-alpha", this._activeTextures[e] = null;
    }
  }
  getReferenceCount(e) {
    return this._activeTextures[e].usageCount;
  }
  /**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param text
   * @param style
   * @param resolution
   * @param canvasAndContext
   */
  renderTextToCanvas(e, t, r, i) {
    var b, S, w, k;
    const { canvas: s, context: a } = i, o = Z(t), l = H.measureText(e || " ", t), c = l.lines, h = l.lineHeight, d = l.lineWidths, u = l.maxLineWidth, f = l.fontProperties, p = s.height;
    if (a.resetTransform(), a.scale(r, r), a.clearRect(0, 0, l.width + 4, l.height + 4), (b = t._stroke) != null && b.width) {
      const v = t._stroke;
      a.lineWidth = v.width, a.miterLimit = v.miterLimit, a.lineJoin = v.join, a.lineCap = v.cap;
    }
    a.font = o;
    let m, x;
    const _ = t.dropShadow ? 2 : 1;
    for (let v = 0; v < _; ++v) {
      const B = t.dropShadow && v === 0, R = B ? Math.ceil(Math.max(1, p) + t.padding * 2) : 0, A = R * r;
      if (B) {
        a.fillStyle = "black", a.strokeStyle = "black";
        const M = t.dropShadow, xt = M.color, _t = M.alpha;
        a.shadowColor = N.shared.setValue(xt).setAlpha(_t).toRgbaString();
        const bt = M.blur * r, xe = M.distance * r;
        a.shadowBlur = bt, a.shadowOffsetX = Math.cos(M.angle) * xe, a.shadowOffsetY = Math.sin(M.angle) * xe + A;
      } else
        a.globalAlpha = ((S = t._fill) == null ? void 0 : S.alpha) ?? 1, a.fillStyle = t._fill ? J(t._fill, a) : null, (w = t._stroke) != null && w.width && (a.strokeStyle = J(t._stroke, a)), a.shadowColor = "black";
      let X = (h - f.fontSize) / 2;
      h - f.fontSize < 0 && (X = 0);
      const j = ((k = t._stroke) == null ? void 0 : k.width) ?? 0;
      for (let M = 0; M < c.length; M++)
        m = j / 2, x = j / 2 + M * h + f.ascent + X, t.align === "right" ? m += u - d[M] : t.align === "center" && (m += (u - d[M]) / 2), t._stroke && this._drawLetterSpacing(
          c[M],
          t,
          i,
          m + t.padding,
          x + t.padding - R,
          !0
        ), t._fill !== void 0 && this._drawLetterSpacing(
          c[M],
          t,
          i,
          m + t.padding,
          x + t.padding - R
        );
    }
  }
  /**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param style
   * @param canvasAndContext
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */
  _drawLetterSpacing(e, t, r, i, s, a = !1) {
    const { context: o } = r, l = t.letterSpacing;
    let c = !1;
    if (H.experimentalLetterSpacingSupported && (H.experimentalLetterSpacing ? (o.letterSpacing = `${l}px`, o.textLetterSpacing = `${l}px`, c = !0) : (o.letterSpacing = "0px", o.textLetterSpacing = "0px")), l === 0 || c) {
      a ? o.strokeText(e, i, s) : o.fillText(e, i, s);
      return;
    }
    let h = i;
    const d = H.graphemeSegmenter(e);
    let u = o.measureText(e).width, f = 0;
    for (let p = 0; p < d.length; ++p) {
      const m = d[p];
      a ? o.strokeText(m, h, s) : o.fillText(m, h, s);
      let x = "";
      for (let _ = p + 1; _ < d.length; ++_)
        x += d[_];
      f = o.measureText(x).width, h += u - f + l, u = f;
    }
  }
  destroy() {
    this._activeTextures = null;
  }
}
mt.extension = {
  type: [
    y.WebGLSystem,
    y.WebGPUSystem,
    y.CanvasSystem
  ],
  name: "canvasText"
};
P.add(Ne);
P.add(Ke);
P.add(st);
P.add(Ft);
P.add(ot);
P.add(mt);
P.add(gt);
P.add(ft, gr, pr);
P.add(ee);
P.add(pt);
P.add(dt);
P.add(ht);
P.add($e);
P.add(je);
