const os = class os {
  static registerType(t) {
    this.TYPES.set(t.name.toUpperCase(), t), (t.groups ?? ["Misc"]).forEach((s) => {
      this.GROUPS.has(s) || this.GROUPS.set(s, []);
      const r = this.GROUPS.get(s);
      this.GROUPS.set(s, [...r, t]);
    });
  }
  static getType(t) {
    return typeof t == "string" ? this.TYPES.get(t.toUpperCase()) : this.TYPES.get(t.name.toUpperCase());
  }
};
os.TYPES = /* @__PURE__ */ new Map(), os.GROUPS = /* @__PURE__ */ new Map();
let Ms = os;
class V {
  //creator creates an atom of element creation function with the ability to override BASE_TYPE element properties
  static CREATOR(t, e = {}) {
    let s = { ...t };
    const r = (n = {}, a = {}) => {
      const o = { ...s, ...n }, h = { ...e, ...a };
      return h ? new o.class(o, h) : new o.class(o);
    };
    return s.CREATE = r, Ms.registerType({ ...s, CREATE: r }), r;
  }
  constructor(t, e) {
    this.TYPE = t, this.classes = /* @__PURE__ */ new Set(), this.initializeState(e ?? void 0), this.classifyAs(this.TYPE), this.TYPE.classifications && this.TYPE.classifications.forEach((s) => {
      this.classifyAs(s);
    });
  }
  initializeState(t) {
    this.state = {}, this.wr("age", t.age ?? 0), this.wr("color", this.TYPE.color ?? 16777215), this.state = t ? { ...this.state, ...t } : { ...this.state };
  }
  behave(t) {
    this.state.age++;
  }
  rd(t) {
    return this.state[t];
  }
  wr(t, e) {
    this.state[t] = e;
  }
  classifyAs(t) {
    const e = typeof t == "string" ? t : t.name;
    this.classes.add(e.toUpperCase());
  }
  declassify(t) {
    const e = typeof t == "string" ? t : t.name;
    this.classes.delete(e.toUpperCase());
  }
  is(t) {
    if (Array.isArray(t))
      return t.some((s) => {
        const r = typeof s == "string" ? s : s.name;
        return this.classes.has(r.toUpperCase());
      });
    const e = typeof t == "string" ? t : t.name;
    return this.classes.has(e.toUpperCase());
  }
  isCore(t) {
    return (typeof t == "string" ? t : t.name).toUpperCase() === this.TYPE.name.toUpperCase();
  }
}
const Me = class Me extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.classifyAs("EMPTY");
  }
  behave(t) {
    super.behave(t);
  }
};
Me.CREATE = Me.CREATOR({ name: "EMPTY", symbol: "EMT", class: Me, color: 2763306, groups: ["MFM"] });
let xt = Me;
const R = class R {
  static oneIn(t) {
    return t === 0 ? !1 : Math.random() * t < 1;
  }
  constructor(t, e) {
    this.makeWindow(t, e);
  }
  makeWindow(t, e) {
    this.origin = t.getSiteByCoordinate(e), this.window = new Array(41);
    let s, r;
    const n = R.WINDOW_OFFSETS.length;
    for (let a = 0; a < n; a++)
      s = R.WINDOW_OFFSETS[a], r = t.getSiteByCoordinate(this.offsetFromOrigin(e, s)), this.window[a] = r;
  }
  //get relative offset ICoordinate from absolute ICoordinate
  //this should only be used by the makeWindow function to translate a picked site into
  //a full event window of sites
  offsetFromOrigin(t, e) {
    return { y: t.y + e.y, x: t.x + e.x };
  }
  //get site by specific window index
  getSite(t) {
    return this.window[t] ?? void 0;
  }
  getSites(t) {
    return t.map((e) => this.window[e] ?? void 0);
  }
  //get indexes of subset (of type) and possible only 1 random of the result
  //extremely useful in searching the event window for circumstances of element types
  filter(t, e = void 0, s = !1) {
    let r = this.getSubsetIndexes(t);
    return !e && !s ? r : (e && (r = this.filterByType(r, e)), s ? [this.random(r)] : r);
  }
  randomOfType(t, e) {
    return this.random(this.filterByType(t, e));
  }
  random(t) {
    const e = t[~~(Math.random() * t.length)];
    return this.getSite(e) ? e : void 0;
  }
  filterByType(t, e) {
    return t.filter((s) => {
      const r = this.getSite(s);
      return !!(r && r.atom.is(e));
    });
  }
  getSubsetIndexes(t) {
    return t ? t.map((e) => {
      if (this.window[e])
        return e;
    }) : [];
  }
  exists(t) {
    return !!this.getSite(t);
  }
  is(t = 0, e) {
    let s = !1, r;
    return typeof t == "number" ? r = this.getSite(t) : r = t, r ? (Array.isArray(e) ? s = !!e.filter((a) => r.atom.is(a)).length : s = r.atom.is(e), s) : !1;
  }
  any(t, e) {
    return Array.isArray(t) || (t = [t]), this.howMany(t, e) > 0;
  }
  all(t, e) {
    return Array.isArray(t) || (t = [t]), this.howMany(t, e) === t.length;
  }
  howMany(t, e) {
    return this.filter(t, e, !1).length;
  }
  selfIs(t) {
    return this.is(0, t);
  }
  /////////////////////////////////
  // EVENT WINDOW ACTIONS
  /////////////////////////////////
  move(t, e = void 0, s = 0) {
    const r = this.getSite(t), n = this.getSite(s);
    return r && n ? (r.atom = n.atom, e ? n.atom = e : n.atom = xt.CREATE(), !0) : !1;
  }
  swap(t, e = 0) {
    const s = this.getSite(t), r = this.getSite(e);
    return s && r ? ([s.atom, r.atom] = [r.atom, s.atom], !0) : !1;
  }
  replace(t, e) {
    const s = this.getSite(t);
    return s ? (s.atom = e, !0) : !1;
  }
  mutate(t, e, s = [{}, {}]) {
    const r = this.getSite(t);
    return r ? (r.atom = e(...s), !0) : !1;
  }
  mutateMany(t, e, s = [{}, {}]) {
    t.forEach((r) => {
      this.mutate(r, e, s);
    });
  }
  destroy(t = 0) {
    return this.mutate(t, xt.CREATE);
  }
};
R.WINDOW_OFFSETS = [
  { x: 0, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: -1, y: -1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: -2, y: 0 },
  { x: 0, y: -2 },
  { x: 0, y: 2 },
  { x: 2, y: 0 },
  { x: -2, y: -1 },
  { x: -2, y: 1 },
  { x: -1, y: -2 },
  { x: -1, y: 2 },
  { x: 1, y: -2 },
  { x: 1, y: 2 },
  { x: 2, y: -1 },
  { x: 2, y: 1 },
  { x: -3, y: 0 },
  { x: 0, y: -3 },
  { x: 0, y: 3 },
  { x: 3, y: 0 },
  { x: -2, y: -2 },
  { x: -2, y: 2 },
  { x: 2, y: -2 },
  { x: 2, y: 2 },
  { x: -3, y: -1 },
  { x: -3, y: 1 },
  { x: -1, y: -3 },
  { x: -1, y: 3 },
  { x: 1, y: -3 },
  { x: 1, y: 3 },
  { x: 3, y: -1 },
  { x: 3, y: 1 },
  { x: -4, y: 0 },
  { x: 0, y: -4 },
  { x: 0, y: 4 },
  { x: 4, y: 0 }
], R.RANDOM = (t = R.ALLADJACENT) => t[~~(t.length * Math.random())], R.ORIGIN = [0], R.W = [1], R.N = [2], R.S = [3], R.E = [4], R.NW = [5], R.SW = [6], R.NE = [7], R.SE = [8], R.ADJACENT4WAY = [1, 2, 3, 4], R.DIAGONAL4WAY = [5, 6, 7, 8], R.ADJACENT8WAY = [...R.ADJACENT4WAY, ...R.DIAGONAL4WAY], R.LAYER1 = [1, 2, 3, 4], R.LAYER2 = [5, 6, 7, 8, 9, 10, 11, 12], R.LAYER3 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], R.LAYER4 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], R.W_LINE = [1, 9, 21, 37], R.N_LINE = [2, 10, 22, 38], R.S_LINE = [3, 11, 23, 39], R.E_LINE = [4, 12, 24, 40], R.NW_LINE = [5, 25], R.SW_LINE = [6, 26], R.NE_LINE = [7, 27], R.SE_LINE = [8, 28], R.EQUATOR = [...R.ORIGIN, ...R.W_LINE, ...R.E_LINE], R.PRIME_MERIDIAN = [...R.ORIGIN, ...R.N_LINE, ...R.S_LINE], R.W_QUADRANT = [1, 9, 13, 14, 21, 29, 30, 37], R.N_QUADRANT = [2, 10, 15, 17, 22, 31, 33, 38], R.S_QUADRANT = [3, 11, 16, 18, 23, 32, 34, 39], R.E_QUADRANT = [4, 12, 19, 20, 24, 35, 36, 40], R.NW_QUADRANT = [5, 13, 15, 25, 29, 31], R.SW_QUADRANT = [6, 14, 16, 26, 30, 32], R.NE_QUADRANT = [7, 17, 19, 27, 33, 35], R.SE_QUADRANT = [8, 18, 20, 28, 34, 36], R.W_HEMISPHERE = Array.from(/* @__PURE__ */ new Set([...R.NW_QUADRANT, ...R.W_LINE, ...R.SW_QUADRANT])).sort(
  (t, e) => t - e
), R.N_HEMISPHERE = Array.from(/* @__PURE__ */ new Set([...R.NW_QUADRANT, ...R.N_LINE, ...R.NE_QUADRANT])).sort(
  (t, e) => t - e
), R.S_HEMISPHERE = Array.from(/* @__PURE__ */ new Set([...R.SW_QUADRANT, ...R.S_LINE, ...R.SE_QUADRANT])).sort(
  (t, e) => t - e
), R.E_HEMISPHERE = Array.from(/* @__PURE__ */ new Set([...R.NE_QUADRANT, ...R.E_LINE, ...R.SE_QUADRANT])).sort(
  (t, e) => t - e
), R.ALL = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40
], R.ALLADJACENT = [
  1,
  2,
  3,
  4,
  5,
  6,
  8,
  7,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40
], R.OPPOSITES = [
  0,
  4,
  3,
  2,
  1,
  8,
  7,
  6,
  5,
  12,
  11,
  10,
  9,
  20,
  19,
  18,
  17,
  16,
  15,
  14,
  13,
  24,
  23,
  22,
  21,
  28,
  27,
  26,
  25,
  36,
  35,
  34,
  33,
  32,
  31,
  30,
  29,
  40,
  39,
  38,
  37
], R.X_REFLECTION = [
  0,
  1,
  3,
  2,
  4,
  6,
  5,
  8,
  7,
  9,
  11,
  10,
  12,
  14,
  13,
  16,
  15,
  18,
  17,
  20,
  19,
  21,
  23,
  22,
  24,
  26,
  25,
  28,
  27,
  30,
  29,
  32,
  31,
  34,
  33,
  36,
  35,
  37,
  39,
  38,
  40
], R.Y_REFLECTION = [
  0,
  4,
  2,
  3,
  1,
  7,
  8,
  5,
  6,
  12,
  10,
  11,
  9,
  19,
  20,
  17,
  18,
  15,
  16,
  13,
  14,
  24,
  22,
  23,
  21,
  27,
  28,
  25,
  26,
  35,
  36,
  33,
  34,
  31,
  32,
  29,
  30,
  40,
  38,
  39,
  37
], R.XY_REFLECTION = R.OPPOSITES, R.SUBSETS = (/* @__PURE__ */ new Map()).set("4way", R.ADJACENT4WAY).set("8way", R.ADJACENT8WAY).set("all", R.ALL);
let T = R;
class Sn {
  constructor(t) {
    this.location = t, this.id = this.location.id, this.create();
  }
  create() {
    this.atom = xt.CREATE(), this.baseAtom = xt.CREATE();
  }
  swapAtoms(t) {
    return [this.atom, t.atom] = [t.atom, this.atom], !0;
  }
  mutate(t) {
    this.atom = t;
  }
  mutateBase(t) {
    this.baseAtom = t;
  }
}
class Jt {
  static CoordinateToId(t) {
    return `${t.y}:${t.x}`;
  }
  static IdToCoordinate(t) {
    const [e, s] = t.split(":");
    return { y: +e, x: +s };
  }
  static fromCoordinate(t) {
    return new Jt(Jt.CoordinateToId(t));
  }
  static fromId(t) {
    return new Jt(t);
  }
  constructor(t) {
    this.id = t, this.coordinate = Jt.IdToCoordinate(this.id);
  }
}
class Gh {
  constructor(t = 1, e = 1) {
    this.cur = 0, this.isRunning = !1, this.width = t, this.height = e, this.create(), this.seedRandoms();
  }
  seedRandoms() {
    this.rands = new Array();
    var t = new Uint32Array(16e3);
    crypto.getRandomValues(t);
    for (var e = 0; e < t.length; e++)
      this.rands.push(t[e] % (this.width * this.height));
  }
  getSiteByCoordinate(t) {
    return this.sites.get(Jt.CoordinateToId(t));
  }
  getSiteById(t) {
    return this.sites.get(t);
  }
  getRandomSite() {
    return this.sites.get(`${~~(Math.random() * this.height)}:${~~(Math.random() * this.width)}`);
  }
  getRandomSiteSeeded() {
    return this.cur > 15998 && (this.seedRandoms(), this.cur = 0), this.cur++, this.sitesArray[this.rands[this.cur]];
  }
  getRandomSiteInRange(t) {
    return this.sites.get(`${~~(Math.random() * (t[1] - t[0])) + t[0]}:${~~(Math.random() * (t[3] - t[2])) + t[2]}`);
  }
  getRandomSiteInRangeSeeded(t) {
    return this.cur > 15997 && (this.seedRandoms(), this.cur = 0), this.cur++, this.sites.get(`${this.rands[this.cur] % (t[1] - t[0]) + t[0]}:${this.rands[this.cur + 1] % (t[3] - t[2]) + t[2]}`);
  }
  create() {
    this.sites = /* @__PURE__ */ new Map();
    for (let t = 0; t < this.width; t++)
      for (let e = 0; e < this.height; e++) {
        const s = Jt.fromId(`${e}:${t}`);
        this.sites.set(s.id, new Sn(s));
      }
    this.sites.forEach((t) => {
      t.ew = new T(this, t.location.coordinate);
    }), this.sitesArray = Array.from(this.sites.values());
  }
  add(t, e = 0, s = 0) {
    if (e >= 0 && s >= 0 && e < this.width && s < this.height) {
      const r = t();
      let n = this.getSiteByCoordinate({ x: e, y: s });
      n && (n.atom = r);
    }
  }
  exportAtoms() {
    const t = {};
    return Array.from(this.sites.values()).filter((e) => !e.atom.is("EMPTY")).forEach((e) => {
      t[e.atom.TYPE.name] ? t[e.atom.TYPE.name] += `-${e.location.coordinate.x}x${e.location.coordinate.y}` : (t[e.atom.TYPE.name] = `${e.atom.TYPE.name}`, t[e.atom.TYPE.name] += `-${e.location.coordinate.x}x${e.location.coordinate.y}`);
    }), console.log(t), Object.values(t);
  }
  clear(t = void 0) {
    t ? this.sites.forEach((e) => {
      e.atom.is(t) && e.mutate(xt.CREATE());
    }) : this.sites.forEach((e) => {
      e.mutate(xt.CREATE());
    });
  }
}
var O = /* @__PURE__ */ ((i) => (i.Application = "application", i.WebGLPipes = "webgl-pipes", i.WebGLPipesAdaptor = "webgl-pipes-adaptor", i.WebGLSystem = "webgl-system", i.WebGPUPipes = "webgpu-pipes", i.WebGPUPipesAdaptor = "webgpu-pipes-adaptor", i.WebGPUSystem = "webgpu-system", i.CanvasSystem = "canvas-system", i.CanvasPipesAdaptor = "canvas-pipes-adaptor", i.CanvasPipes = "canvas-pipes", i.Asset = "asset", i.LoadParser = "load-parser", i.ResolveParser = "resolve-parser", i.CacheParser = "cache-parser", i.DetectionParser = "detection-parser", i.MaskEffect = "mask-effect", i.BlendMode = "blend-mode", i.TextureSource = "texture-source", i.Environment = "environment", i))(O || {});
const Ls = (i) => {
  if (typeof i == "function" || typeof i == "object" && i.extension) {
    if (!i.extension)
      throw new Error("Extension class must have an extension object");
    i = { ...typeof i.extension != "object" ? { type: i.extension } : i.extension, ref: i };
  }
  if (typeof i == "object")
    i = { ...i };
  else
    throw new Error("Invalid extension type");
  return typeof i.type == "string" && (i.type = [i.type]), i;
}, $e = (i, t) => Ls(i).priority ?? t, yt = {
  /** @ignore */
  _addHandlers: {},
  /** @ignore */
  _removeHandlers: {},
  /** @ignore */
  _queue: {},
  /**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {extensions} For chaining.
   */
  remove(...i) {
    return i.map(Ls).forEach((t) => {
      t.type.forEach((e) => {
        var s, r;
        return (r = (s = this._removeHandlers)[e]) == null ? void 0 : r.call(s, t);
      });
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {extensions} For chaining.
   */
  add(...i) {
    return i.map(Ls).forEach((t) => {
      t.type.forEach((e) => {
        var n, a;
        const s = this._addHandlers, r = this._queue;
        s[e] ? (a = s[e]) == null || a.call(s, t) : (r[e] = r[e] || [], (n = r[e]) == null || n.push(t));
      });
    }), this;
  },
  /**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function handler when extensions are added/registered {@link StrictExtensionFormat}.
   * @param onRemove  - Function handler when extensions are removed/unregistered {@link StrictExtensionFormat}.
   * @returns {extensions} For chaining.
   */
  handle(i, t, e) {
    var a;
    const s = this._addHandlers, r = this._removeHandlers;
    if (s[i] || r[i])
      throw new Error(`Extension type ${i} already has a handler`);
    s[i] = t, r[i] = e;
    const n = this._queue;
    return n[i] && ((a = n[i]) == null || a.forEach((o) => t(o)), delete n[i]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {extensions} For chaining.
   */
  handleByMap(i, t) {
    return this.handle(
      i,
      (e) => {
        e.name && (t[e.name] = e.ref);
      },
      (e) => {
        e.name && delete t[e.name];
      }
    );
  },
  /**
   * Handle a type, but using a list of extensions with a `name` property.
   * @param type - Type of extension to handle.
   * @param map - The array of named extensions.
   * @param defaultPriority - Fallback priority if none is defined.
   * @returns {extensions} For chaining.
   */
  handleByNamedList(i, t, e = -1) {
    return this.handle(
      i,
      (s) => {
        t.findIndex((n) => n.name === s.name) >= 0 || (t.push({ name: s.name, value: s.ref }), t.sort((n, a) => $e(a.value, e) - $e(n.value, e)));
      },
      (s) => {
        const r = t.findIndex((n) => n.name === s.name);
        r !== -1 && t.splice(r, 1);
      }
    );
  },
  /**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @param defaultPriority - The default priority to use if none is specified.
   * @returns {extensions} For chaining.
   */
  handleByList(i, t, e = -1) {
    return this.handle(
      i,
      (s) => {
        t.includes(s.ref) || (t.push(s.ref), t.sort((r, n) => $e(n, e) - $e(r, e)));
      },
      (s) => {
        const r = t.indexOf(s.ref);
        r !== -1 && t.splice(r, 1);
      }
    );
  }
}, Tn = {
  extension: {
    type: O.Environment,
    name: "browser",
    priority: -1
  },
  test: () => !0,
  load: async () => {
    await import("./browserAll-w_ftacHm.mjs");
  }
}, Rn = {
  extension: {
    type: O.Environment,
    name: "webworker",
    priority: 0
  },
  test: () => typeof self < "u" && self.WorkerGlobalScope !== void 0,
  load: async () => {
    await import("./webworkerAll-Bq2LQ_uo.mjs");
  }
};
class mt {
  /**
   * Creates a new `ObservablePoint`
   * @param observer - Observer to pass to listen for change events.
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  constructor(t, e, s) {
    this._x = e || 0, this._y = s || 0, this._observer = t;
  }
  /**
   * Creates a clone of this point.
   * @param observer - Optional observer to pass to the new observable point.
   * @returns a copy of this observable point
   */
  clone(t) {
    return new mt(t ?? this._observer, this._x, this._y);
  }
  /**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=x] - position of the point on the y axis
   * @returns The observable point instance itself
   */
  set(t = 0, e = t) {
    return (this._x !== t || this._y !== e) && (this._x = t, this._y = e, this._observer._onUpdate(this)), this;
  }
  /**
   * Copies x and y from the given point (`p`)
   * @param p - The point to copy from. Can be any of type that is or extends `PointData`
   * @returns The observable point instance itself
   */
  copyFrom(t) {
    return (this._x !== t.x || this._y !== t.y) && (this._x = t.x, this._y = t.y, this._observer._onUpdate(this)), this;
  }
  /**
   * Copies this point's x and y into that of the given point (`p`)
   * @param p - The point to copy to. Can be any of type that is or extends `PointData`
   * @returns The point (`p`) with values updated
   */
  copyTo(t) {
    return t.set(this._x, this._y), t;
  }
  /**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */
  equals(t) {
    return t.x === this._x && t.y === this._y;
  }
  toString() {
    return `[pixi.js/math:ObservablePoint x=0 y=0 scope=${this._observer}]`;
  }
  /** Position of the observable point on the x axis. */
  get x() {
    return this._x;
  }
  set x(t) {
    this._x !== t && (this._x = t, this._observer._onUpdate(this));
  }
  /** Position of the observable point on the y axis. */
  get y() {
    return this._y;
  }
  set y(t) {
    this._y !== t && (this._y = t, this._observer._onUpdate(this));
  }
}
function Ks(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var pr = { exports: {} };
(function(i) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function s() {
  }
  Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (e = !1));
  function r(h, l, c) {
    this.fn = h, this.context = l, this.once = c || !1;
  }
  function n(h, l, c, u, d) {
    if (typeof c != "function")
      throw new TypeError("The listener must be a function");
    var m = new r(c, u || h, d), f = e ? e + l : l;
    return h._events[f] ? h._events[f].fn ? h._events[f] = [h._events[f], m] : h._events[f].push(m) : (h._events[f] = m, h._eventsCount++), h;
  }
  function a(h, l) {
    --h._eventsCount === 0 ? h._events = new s() : delete h._events[l];
  }
  function o() {
    this._events = new s(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var l = [], c, u;
    if (this._eventsCount === 0)
      return l;
    for (u in c = this._events)
      t.call(c, u) && l.push(e ? u.slice(1) : u);
    return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(c)) : l;
  }, o.prototype.listeners = function(l) {
    var c = e ? e + l : l, u = this._events[c];
    if (!u)
      return [];
    if (u.fn)
      return [u.fn];
    for (var d = 0, m = u.length, f = new Array(m); d < m; d++)
      f[d] = u[d].fn;
    return f;
  }, o.prototype.listenerCount = function(l) {
    var c = e ? e + l : l, u = this._events[c];
    return u ? u.fn ? 1 : u.length : 0;
  }, o.prototype.emit = function(l, c, u, d, m, f) {
    var A = e ? e + l : l;
    if (!this._events[A])
      return !1;
    var g = this._events[A], y = arguments.length, E, x;
    if (g.fn) {
      switch (g.once && this.removeListener(l, g.fn, void 0, !0), y) {
        case 1:
          return g.fn.call(g.context), !0;
        case 2:
          return g.fn.call(g.context, c), !0;
        case 3:
          return g.fn.call(g.context, c, u), !0;
        case 4:
          return g.fn.call(g.context, c, u, d), !0;
        case 5:
          return g.fn.call(g.context, c, u, d, m), !0;
        case 6:
          return g.fn.call(g.context, c, u, d, m, f), !0;
      }
      for (x = 1, E = new Array(y - 1); x < y; x++)
        E[x - 1] = arguments[x];
      g.fn.apply(g.context, E);
    } else {
      var S = g.length, L;
      for (x = 0; x < S; x++)
        switch (g[x].once && this.removeListener(l, g[x].fn, void 0, !0), y) {
          case 1:
            g[x].fn.call(g[x].context);
            break;
          case 2:
            g[x].fn.call(g[x].context, c);
            break;
          case 3:
            g[x].fn.call(g[x].context, c, u);
            break;
          case 4:
            g[x].fn.call(g[x].context, c, u, d);
            break;
          default:
            if (!E)
              for (L = 1, E = new Array(y - 1); L < y; L++)
                E[L - 1] = arguments[L];
            g[x].fn.apply(g[x].context, E);
        }
    }
    return !0;
  }, o.prototype.on = function(l, c, u) {
    return n(this, l, c, u, !1);
  }, o.prototype.once = function(l, c, u) {
    return n(this, l, c, u, !0);
  }, o.prototype.removeListener = function(l, c, u, d) {
    var m = e ? e + l : l;
    if (!this._events[m])
      return this;
    if (!c)
      return a(this, m), this;
    var f = this._events[m];
    if (f.fn)
      f.fn === c && (!d || f.once) && (!u || f.context === u) && a(this, m);
    else {
      for (var A = 0, g = [], y = f.length; A < y; A++)
        (f[A].fn !== c || d && !f[A].once || u && f[A].context !== u) && g.push(f[A]);
      g.length ? this._events[m] = g.length === 1 ? g[0] : g : a(this, m);
    }
    return this;
  }, o.prototype.removeAllListeners = function(l) {
    var c;
    return l ? (c = e ? e + l : l, this._events[c] && a(this, c)) : (this._events = new s(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = e, o.EventEmitter = o, i.exports = o;
})(pr);
var bn = pr.exports;
const te = /* @__PURE__ */ Ks(bn);
let ds = 0;
const Ai = 500;
function it(...i) {
  ds !== Ai && (ds++, ds === Ai ? console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS.") : console.warn("PixiJS Warning: ", ...i));
}
const Rt = (i, t, e = !1) => (Array.isArray(i) || (i = [i]), t ? i.map((s) => typeof s == "string" || e ? t(s) : s) : i);
class _n {
  constructor() {
    this._parsers = [], this._cache = /* @__PURE__ */ new Map(), this._cacheMap = /* @__PURE__ */ new Map();
  }
  /** Clear all entries. */
  reset() {
    this._cacheMap.clear(), this._cache.clear();
  }
  /**
   * Check if the key exists
   * @param key - The key to check
   */
  has(t) {
    return this._cache.has(t);
  }
  /**
   * Fetch entry by key
   * @param key - The key of the entry to get
   */
  get(t) {
    const e = this._cache.get(t);
    return e || it(`[Assets] Asset id ${t} was not found in the Cache`), e;
  }
  /**
   * Set a value by key or keys name
   * @param key - The key or keys to set
   * @param value - The value to store in the cache or from which cacheable assets will be derived.
   */
  set(t, e) {
    const s = Rt(t);
    let r;
    for (let h = 0; h < this.parsers.length; h++) {
      const l = this.parsers[h];
      if (l.test(e)) {
        r = l.getCacheableAssets(s, e);
        break;
      }
    }
    const n = new Map(Object.entries(r || {}));
    r || s.forEach((h) => {
      n.set(h, e);
    });
    const a = [...n.keys()], o = {
      cacheKeys: a,
      keys: s
    };
    s.forEach((h) => {
      this._cacheMap.set(h, o);
    }), a.forEach((h) => {
      const l = r ? r[h] : e;
      this._cache.has(h) && this._cache.get(h) !== l && it("[Cache] already has key:", h), this._cache.set(h, n.get(h));
    });
  }
  /**
   * Remove entry by key
   *
   * This function will also remove any associated alias from the cache also.
   * @param key - The key of the entry to remove
   */
  remove(t) {
    if (!this._cacheMap.has(t)) {
      it(`[Assets] Asset id ${t} was not found in the Cache`);
      return;
    }
    const e = this._cacheMap.get(t);
    e.cacheKeys.forEach((r) => {
      this._cache.delete(r);
    }), e.keys.forEach((r) => {
      this._cacheMap.delete(r);
    });
  }
  /** All loader parsers registered */
  get parsers() {
    return this._parsers;
  }
}
const ht = new _n(), Nn = Math.PI * 2, In = 180 / Math.PI, Cn = Math.PI / 180;
class rt {
  /**
   * Creates a new `Point`
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  constructor(t = 0, e = 0) {
    this.x = 0, this.y = 0, this.x = t, this.y = e;
  }
  /**
   * Creates a clone of this point
   * @returns A clone of this point
   */
  clone() {
    return new rt(this.x, this.y);
  }
  /**
   * Copies `x` and `y` from the given point into this point
   * @param p - The point to copy from
   * @returns The point instance itself
   */
  copyFrom(t) {
    return this.set(t.x, t.y), this;
  }
  /**
   * Copies this point's x and y into the given point (`p`).
   * @param p - The point to copy to. Can be any of type that is or extends `PointData`
   * @returns The point (`p`) with values updated
   */
  copyTo(t) {
    return t.set(this.x, this.y), t;
  }
  /**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  /**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the `x` axis
   * @param {number} [y=x] - position of the point on the `y` axis
   * @returns The point instance itself
   */
  set(t = 0, e = t) {
    return this.x = t, this.y = e, this;
  }
  toString() {
    return `[pixi.js/math:Point x=${this.x} y=${this.y}]`;
  }
  /**
   * A static Point object with `x` and `y` values of `0`. Can be used to avoid creating new objects multiple times.
   * @readonly
   */
  static get shared() {
    return fs.x = 0, fs.y = 0, fs;
  }
}
const fs = new rt();
class U {
  /**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */
  constructor(t = 1, e = 0, s = 0, r = 1, n = 0, a = 0) {
    this.array = null, this.a = t, this.b = e, this.c = s, this.d = r, this.tx = n, this.ty = a;
  }
  /**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   * @param array - The array that the matrix will be populated from.
   */
  fromArray(t) {
    this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5];
  }
  /**
   * Sets the matrix properties.
   * @param a - Matrix component
   * @param b - Matrix component
   * @param c - Matrix component
   * @param d - Matrix component
   * @param tx - Matrix component
   * @param ty - Matrix component
   * @returns This matrix. Good for chaining method calls.
   */
  set(t, e, s, r, n, a) {
    return this.a = t, this.b = e, this.c = s, this.d = r, this.tx = n, this.ty = a, this;
  }
  /**
   * Creates an array from the current Matrix object.
   * @param transpose - Whether we need to transpose the matrix or not
   * @param [out=new Float32Array(9)] - If provided the array will be assigned to out
   * @returns The newly created array which contains the matrix
   */
  toArray(t, e) {
    this.array || (this.array = new Float32Array(9));
    const s = e || this.array;
    return t ? (s[0] = this.a, s[1] = this.b, s[2] = 0, s[3] = this.c, s[4] = this.d, s[5] = 0, s[6] = this.tx, s[7] = this.ty, s[8] = 1) : (s[0] = this.a, s[1] = this.c, s[2] = this.tx, s[3] = this.b, s[4] = this.d, s[5] = this.ty, s[6] = 0, s[7] = 0, s[8] = 1), s;
  }
  /**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   * @param pos - The origin
   * @param {Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Point} The new point, transformed through this matrix
   */
  apply(t, e) {
    e = e || new rt();
    const s = t.x, r = t.y;
    return e.x = this.a * s + this.c * r + this.tx, e.y = this.b * s + this.d * r + this.ty, e;
  }
  /**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   * @param pos - The origin
   * @param {Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Point} The new point, inverse-transformed through this matrix
   */
  applyInverse(t, e) {
    e = e || new rt();
    const s = this.a, r = this.b, n = this.c, a = this.d, o = this.tx, h = this.ty, l = 1 / (s * a + n * -r), c = t.x, u = t.y;
    return e.x = a * l * c + -n * l * u + (h * n - o * a) * l, e.y = s * l * u + -r * l * c + (-h * s + o * r) * l, e;
  }
  /**
   * Translates the matrix on the x and y.
   * @param x - How much to translate x by
   * @param y - How much to translate y by
   * @returns This matrix. Good for chaining method calls.
   */
  translate(t, e) {
    return this.tx += t, this.ty += e, this;
  }
  /**
   * Applies a scale transformation to the matrix.
   * @param x - The amount to scale horizontally
   * @param y - The amount to scale vertically
   * @returns This matrix. Good for chaining method calls.
   */
  scale(t, e) {
    return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this;
  }
  /**
   * Applies a rotation transformation to the matrix.
   * @param angle - The angle in radians.
   * @returns This matrix. Good for chaining method calls.
   */
  rotate(t) {
    const e = Math.cos(t), s = Math.sin(t), r = this.a, n = this.c, a = this.tx;
    return this.a = r * e - this.b * s, this.b = r * s + this.b * e, this.c = n * e - this.d * s, this.d = n * s + this.d * e, this.tx = a * e - this.ty * s, this.ty = a * s + this.ty * e, this;
  }
  /**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  append(t) {
    const e = this.a, s = this.b, r = this.c, n = this.d;
    return this.a = t.a * e + t.b * r, this.b = t.a * s + t.b * n, this.c = t.c * e + t.d * r, this.d = t.c * s + t.d * n, this.tx = t.tx * e + t.ty * r + this.tx, this.ty = t.tx * s + t.ty * n + this.ty, this;
  }
  /**
   * Appends two matrix's and sets the result to this matrix. AB = A * B
   * @param a - The matrix to append.
   * @param b - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  appendFrom(t, e) {
    const s = t.a, r = t.b, n = t.c, a = t.d, o = t.tx, h = t.ty, l = e.a, c = e.b, u = e.c, d = e.d;
    return this.a = s * l + r * u, this.b = s * c + r * d, this.c = n * l + a * u, this.d = n * c + a * d, this.tx = o * l + h * u + e.tx, this.ty = o * c + h * d + e.ty, this;
  }
  /**
   * Sets the matrix based on all the available properties
   * @param x - Position on the x axis
   * @param y - Position on the y axis
   * @param pivotX - Pivot on the x axis
   * @param pivotY - Pivot on the y axis
   * @param scaleX - Scale on the x axis
   * @param scaleY - Scale on the y axis
   * @param rotation - Rotation in radians
   * @param skewX - Skew on the x axis
   * @param skewY - Skew on the y axis
   * @returns This matrix. Good for chaining method calls.
   */
  setTransform(t, e, s, r, n, a, o, h, l) {
    return this.a = Math.cos(o + l) * n, this.b = Math.sin(o + l) * n, this.c = -Math.sin(o - h) * a, this.d = Math.cos(o - h) * a, this.tx = t - (s * this.a + r * this.c), this.ty = e - (s * this.b + r * this.d), this;
  }
  /**
   * Prepends the given Matrix to this Matrix.
   * @param matrix - The matrix to prepend
   * @returns This matrix. Good for chaining method calls.
   */
  prepend(t) {
    const e = this.tx;
    if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
      const s = this.a, r = this.c;
      this.a = s * t.a + this.b * t.c, this.b = s * t.b + this.b * t.d, this.c = r * t.a + this.d * t.c, this.d = r * t.b + this.d * t.d;
    }
    return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this;
  }
  /**
   * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
   * @param transform - The transform to apply the properties to.
   * @returns The transform with the newly applied properties
   */
  decompose(t) {
    const e = this.a, s = this.b, r = this.c, n = this.d, a = t.pivot, o = -Math.atan2(-r, n), h = Math.atan2(s, e), l = Math.abs(o + h);
    return l < 1e-5 || Math.abs(Nn - l) < 1e-5 ? (t.rotation = h, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = o, t.skew.y = h), t.scale.x = Math.sqrt(e * e + s * s), t.scale.y = Math.sqrt(r * r + n * n), t.position.x = this.tx + (a.x * e + a.y * r), t.position.y = this.ty + (a.x * s + a.y * n), t;
  }
  /**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */
  invert() {
    const t = this.a, e = this.b, s = this.c, r = this.d, n = this.tx, a = t * r - e * s;
    return this.a = r / a, this.b = -e / a, this.c = -s / a, this.d = t / a, this.tx = (s * this.ty - r * n) / a, this.ty = -(t * this.ty - e * n) / a, this;
  }
  /** Checks if this matrix is an identity matrix */
  isIdentity() {
    return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.tx === 0 && this.ty === 0;
  }
  /**
   * Resets this Matrix to an identity (default) matrix.
   * @returns This matrix. Good for chaining method calls.
   */
  identity() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  }
  /**
   * Creates a new Matrix object with the same values as this one.
   * @returns A copy of this matrix. Good for chaining method calls.
   */
  clone() {
    const t = new U();
    return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
  }
  /**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   * @param matrix - The matrix to copy to.
   * @returns The matrix given in parameter with its values updated.
   */
  copyTo(t) {
    return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
  }
  /**
   * Changes the values of the matrix to be the same as the ones in given matrix
   * @param matrix - The matrix to copy from.
   * @returns this
   */
  copyFrom(t) {
    return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this;
  }
  toString() {
    return `[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
  }
  /**
   * A default (identity) matrix.
   *
   * This is a shared object, if you want to modify it consider creating a new `Matrix`
   * @readonly
   */
  static get IDENTITY() {
    return Ln.identity();
  }
  /**
   * A static Matrix that can be used to avoid creating new objects.
   * Will always ensure the matrix is reset to identity when requested.
   * Use this object for fast but temporary calculations, as it may be mutated later on.
   * This is a different object to the `IDENTITY` object and so can be modified without changing `IDENTITY`.
   * @readonly
   */
  static get shared() {
    return Mn.identity();
  }
}
const Mn = new U(), Ln = new U(), Xt = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], $t = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], Qt = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], jt = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], vs = [], mr = [], Qe = Math.sign;
function vn() {
  for (let i = 0; i < 16; i++) {
    const t = [];
    vs.push(t);
    for (let e = 0; e < 16; e++) {
      const s = Qe(Xt[i] * Xt[e] + Qt[i] * $t[e]), r = Qe($t[i] * Xt[e] + jt[i] * $t[e]), n = Qe(Xt[i] * Qt[e] + Qt[i] * jt[e]), a = Qe($t[i] * Qt[e] + jt[i] * jt[e]);
      for (let o = 0; o < 16; o++)
        if (Xt[o] === s && $t[o] === r && Qt[o] === n && jt[o] === a) {
          t.push(o);
          break;
        }
    }
  }
  for (let i = 0; i < 16; i++) {
    const t = new U();
    t.set(Xt[i], $t[i], Qt[i], jt[i], 0, 0), mr.push(t);
  }
}
vn();
const $ = {
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 0°       | East      |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  E: 0,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 45°↻     | Southeast |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  SE: 1,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 90°↻     | South     |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  S: 2,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 135°↻    | Southwest |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  SW: 3,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 180°     | West      |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  W: 4,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -135°/225°↻ | Northwest    |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  NW: 5,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -90°/270°↻  | North        |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  N: 6,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -45°/315°↻  | Northeast    |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  NE: 7,
  /**
   * Reflection about Y-axis.
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  MIRROR_VERTICAL: 8,
  /**
   * Reflection about the main diagonal.
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  MAIN_DIAGONAL: 10,
  /**
   * Reflection about X-axis.
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  MIRROR_HORIZONTAL: 12,
  /**
   * Reflection about reverse diagonal.
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  REVERSE_DIAGONAL: 14,
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} ind - sprite rotation angle.
   * @returns {GD8Symmetry} The X-component of the U-axis
   *    after rotating the axes.
   */
  uX: (i) => Xt[i],
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} ind - sprite rotation angle.
   * @returns {GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */
  uY: (i) => $t[i],
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} ind - sprite rotation angle.
   * @returns {GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */
  vX: (i) => Qt[i],
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} ind - sprite rotation angle.
   * @returns {GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */
  vY: (i) => jt[i],
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {GD8Symmetry} The opposite symmetry of `rotation`
   */
  inv: (i) => i & 8 ? i & 15 : -i & 7,
  /**
   * Composes the two D8 operations.
   *
   * Taking `^` as reflection:
   *
   * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
   * |-------|-----|-----|-----|-----|------|-------|-------|-------|
   * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
   * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
   * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
   * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
   * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
   * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
   * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
   * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
   *
   * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
   * @memberof maths.groupD8
   * @param {GD8Symmetry} rotationSecond - Second operation, which
   *   is the row in the above cayley table.
   * @param {GD8Symmetry} rotationFirst - First operation, which
   *   is the column in the above cayley table.
   * @returns {GD8Symmetry} Composed operation
   */
  add: (i, t) => vs[i][t],
  /**
   * Reverse of `add`.
   * @memberof maths.groupD8
   * @param {GD8Symmetry} rotationSecond - Second operation
   * @param {GD8Symmetry} rotationFirst - First operation
   * @returns {GD8Symmetry} Result
   */
  sub: (i, t) => vs[i][$.inv(t)],
  /**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @memberof maths.groupD8
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */
  rotate180: (i) => i ^ 4,
  /**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @memberof maths.groupD8
   * @param {GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */
  isVertical: (i) => (i & 3) === 2,
  // rotation % 4 === 2
  /**
   * Approximates the vector `V(dx,dy)` into one of the
   * eight directions provided by `groupD8`.
   * @memberof maths.groupD8
   * @param {number} dx - X-component of the vector
   * @param {number} dy - Y-component of the vector
   * @returns {GD8Symmetry} Approximation of the vector into
   *  one of the eight symmetries.
   */
  byDirection: (i, t) => Math.abs(i) * 2 <= Math.abs(t) ? t >= 0 ? $.S : $.N : Math.abs(t) * 2 <= Math.abs(i) ? i > 0 ? $.E : $.W : t > 0 ? i > 0 ? $.SE : $.SW : i > 0 ? $.NE : $.NW,
  /**
   * Helps sprite to compensate texture packer rotation.
   * @memberof maths.groupD8
   * @param {Matrix} matrix - sprite world matrix
   * @param {GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: (i, t, e = 0, s = 0) => {
    const r = mr[$.inv(t)];
    r.tx = e, r.ty = s, i.append(r);
  }
}, je = [new rt(), new rt(), new rt(), new rt()];
class et {
  /**
   * @param x - The X coordinate of the upper-left corner of the rectangle
   * @param y - The Y coordinate of the upper-left corner of the rectangle
   * @param width - The overall width of the rectangle
   * @param height - The overall height of the rectangle
   */
  constructor(t = 0, e = 0, s = 0, r = 0) {
    this.type = "rectangle", this.x = Number(t), this.y = Number(e), this.width = Number(s), this.height = Number(r);
  }
  /** Returns the left edge of the rectangle. */
  get left() {
    return this.x;
  }
  /** Returns the right edge of the rectangle. */
  get right() {
    return this.x + this.width;
  }
  /** Returns the top edge of the rectangle. */
  get top() {
    return this.y;
  }
  /** Returns the bottom edge of the rectangle. */
  get bottom() {
    return this.y + this.height;
  }
  /** Determines whether the Rectangle is empty. */
  isEmpty() {
    return this.left === this.right || this.top === this.bottom;
  }
  /** A constant empty rectangle. This is a new object every time the property is accessed */
  static get EMPTY() {
    return new et(0, 0, 0, 0);
  }
  /**
   * Creates a clone of this Rectangle
   * @returns a copy of the rectangle
   */
  clone() {
    return new et(this.x, this.y, this.width, this.height);
  }
  /**
   * Converts a Bounds object to a Rectangle object.
   * @param bounds - The bounds to copy and convert to a rectangle.
   * @returns Returns itself.
   */
  copyFromBounds(t) {
    return this.x = t.minX, this.y = t.minY, this.width = t.maxX - t.minX, this.height = t.maxY - t.minY, this;
  }
  /**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
  }
  /**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Rectangle
   */
  contains(t, e) {
    return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this rectangle
   */
  strokeContains(t, e, s) {
    const { width: r, height: n } = this;
    if (r <= 0 || n <= 0)
      return !1;
    const a = this.x, o = this.y, h = a - s / 2, l = a + r + s / 2, c = o - s / 2, u = o + n + s / 2, d = a + s / 2, m = a + r - s / 2, f = o + s / 2, A = o + n - s / 2;
    return t >= h && t <= l && e >= c && e <= u && !(t > d && t < m && e > f && e < A);
  }
  /**
   * Determines whether the `other` Rectangle transformed by `transform` intersects with `this` Rectangle object.
   * Returns true only if the area of the intersection is >0, this means that Rectangles
   * sharing a side are not overlapping. Another side effect is that an arealess rectangle
   * (width or height equal to zero) can't intersect any other rectangle.
   * @param {Rectangle} other - The Rectangle to intersect with `this`.
   * @param {Matrix} transform - The transformation matrix of `other`.
   * @returns {boolean} A value of `true` if the transformed `other` Rectangle intersects with `this`; otherwise `false`.
   */
  intersects(t, e) {
    if (!e) {
      const M = this.x < t.x ? t.x : this.x;
      if ((this.right > t.right ? t.right : this.right) <= M)
        return !1;
      const N = this.y < t.y ? t.y : this.y;
      return (this.bottom > t.bottom ? t.bottom : this.bottom) > N;
    }
    const s = this.left, r = this.right, n = this.top, a = this.bottom;
    if (r <= s || a <= n)
      return !1;
    const o = je[0].set(t.left, t.top), h = je[1].set(t.left, t.bottom), l = je[2].set(t.right, t.top), c = je[3].set(t.right, t.bottom);
    if (l.x <= o.x || h.y <= o.y)
      return !1;
    const u = Math.sign(e.a * e.d - e.b * e.c);
    if (u === 0 || (e.apply(o, o), e.apply(h, h), e.apply(l, l), e.apply(c, c), Math.max(o.x, h.x, l.x, c.x) <= s || Math.min(o.x, h.x, l.x, c.x) >= r || Math.max(o.y, h.y, l.y, c.y) <= n || Math.min(o.y, h.y, l.y, c.y) >= a))
      return !1;
    const d = u * (h.y - o.y), m = u * (o.x - h.x), f = d * s + m * n, A = d * r + m * n, g = d * s + m * a, y = d * r + m * a;
    if (Math.max(f, A, g, y) <= d * o.x + m * o.y || Math.min(f, A, g, y) >= d * c.x + m * c.y)
      return !1;
    const E = u * (o.y - l.y), x = u * (l.x - o.x), S = E * s + x * n, L = E * r + x * n, B = E * s + x * a, C = E * r + x * a;
    return !(Math.max(S, L, B, C) <= E * o.x + x * o.y || Math.min(S, L, B, C) >= E * c.x + x * c.y);
  }
  /**
   * Pads the rectangle making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   * @returns Returns itself.
   */
  pad(t = 0, e = t) {
    return this.x -= t, this.y -= e, this.width += t * 2, this.height += e * 2, this;
  }
  /**
   * Fits this rectangle around the passed one.
   * @param rectangle - The rectangle to fit.
   * @returns Returns itself.
   */
  fit(t) {
    const e = Math.max(this.x, t.x), s = Math.min(this.x + this.width, t.x + t.width), r = Math.max(this.y, t.y), n = Math.min(this.y + this.height, t.y + t.height);
    return this.x = e, this.width = Math.max(s - e, 0), this.y = r, this.height = Math.max(n - r, 0), this;
  }
  /**
   * Enlarges rectangle that way its corners lie on grid
   * @param resolution - resolution
   * @param eps - precision
   * @returns Returns itself.
   */
  ceil(t = 1, e = 1e-3) {
    const s = Math.ceil((this.x + this.width - e) * t) / t, r = Math.ceil((this.y + this.height - e) * t) / t;
    return this.x = Math.floor((this.x + e) * t) / t, this.y = Math.floor((this.y + e) * t) / t, this.width = s - this.x, this.height = r - this.y, this;
  }
  /**
   * Enlarges this rectangle to include the passed rectangle.
   * @param rectangle - The rectangle to include.
   * @returns Returns itself.
   */
  enlarge(t) {
    const e = Math.min(this.x, t.x), s = Math.max(this.x + this.width, t.x + t.width), r = Math.min(this.y, t.y), n = Math.max(this.y + this.height, t.y + t.height);
    return this.x = e, this.width = s - e, this.y = r, this.height = n - r, this;
  }
  /**
   * Returns the framing rectangle of the rectangle as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(t) {
    return t = t || new et(), t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
  }
}
const ps = {
  default: -1
};
function nt(i = "default") {
  return ps[i] === void 0 && (ps[i] = -1), ++ps[i];
}
const Ei = {}, Nt = "8.0.0";
function It(i, t, e = 3) {
  if (Ei[t])
    return;
  let s = new Error().stack;
  typeof s > "u" ? console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${i}`) : (s = s.split(`
`).splice(e).join(`
`), console.groupCollapsed ? (console.groupCollapsed(
    "%cPixiJS Deprecation Warning: %c%s",
    "color:#614108;background:#fffbe6",
    "font-weight:normal;color:#614108;background:#fffbe6",
    `${t}
Deprecated since v${i}`
  ), console.warn(s), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${i}`), console.warn(s))), Ei[t] = !0;
}
const gr = () => {
};
function Hh(i) {
  return i += i === 0 ? 1 : 0, --i, i |= i >>> 1, i |= i >>> 2, i |= i >>> 4, i |= i >>> 8, i |= i >>> 16, i + 1;
}
function yi(i) {
  return !(i & i - 1) && !!i;
}
function Pn(i) {
  const t = {};
  for (const e in i)
    i[e] !== void 0 && (t[e] = i[e]);
  return t;
}
const xi = /* @__PURE__ */ Object.create(null);
function Dn(i) {
  const t = xi[i];
  return t === void 0 && (xi[i] = nt("resource")), t;
}
const Ar = class Er extends te {
  /**
   * @param options - options for the style
   */
  constructor(t = {}) {
    super(), this._resourceType = "textureSampler", this._touched = 0, this._maxAnisotropy = 1, t = { ...Er.defaultOptions, ...t }, this.addressMode = t.addressMode, this.addressModeU = t.addressModeU ?? this.addressModeU, this.addressModeV = t.addressModeV ?? this.addressModeV, this.addressModeW = t.addressModeW ?? this.addressModeW, this.scaleMode = t.scaleMode, this.magFilter = t.magFilter ?? this.magFilter, this.minFilter = t.minFilter ?? this.minFilter, this.mipmapFilter = t.mipmapFilter ?? this.mipmapFilter, this.lodMinClamp = t.lodMinClamp, this.lodMaxClamp = t.lodMaxClamp, this.compare = t.compare, this.maxAnisotropy = t.maxAnisotropy ?? 1;
  }
  set addressMode(t) {
    this.addressModeU = t, this.addressModeV = t, this.addressModeW = t;
  }
  /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
  get addressMode() {
    return this.addressModeU;
  }
  set wrapMode(t) {
    It(Nt, "TextureStyle.wrapMode is now TextureStyle.addressMode"), this.addressMode = t;
  }
  get wrapMode() {
    return this.addressMode;
  }
  set scaleMode(t) {
    this.magFilter = t, this.minFilter = t, this.mipmapFilter = t;
  }
  /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
  get scaleMode() {
    return this.magFilter;
  }
  /** Specifies the maximum anisotropy value clamp used by the sampler. */
  set maxAnisotropy(t) {
    this._maxAnisotropy = Math.min(t, 16), this._maxAnisotropy > 1 && (this.scaleMode = "linear");
  }
  get maxAnisotropy() {
    return this._maxAnisotropy;
  }
  // TODO - move this to WebGL?
  get _resourceId() {
    return this._sharedResourceId || this._generateResourceId();
  }
  update() {
    this.emit("change", this), this._sharedResourceId = null;
  }
  _generateResourceId() {
    const t = `${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;
    return this._sharedResourceId = Dn(t), this._resourceId;
  }
  /** Destroys the style */
  destroy() {
    this.emit("destroy", this), this.removeAllListeners();
  }
};
Ar.defaultOptions = {
  addressMode: "clamp-to-edge",
  scaleMode: "linear"
};
let wn = Ar;
const yr = class xr extends te {
  /**
   * @param options - options for creating a new TextureSource
   */
  constructor(t = {}) {
    super(), this.options = t, this.uid = nt("textureSource"), this._resourceType = "textureSource", this._resourceId = nt("resource"), this.uploadMethodId = "unknown", this._resolution = 1, this.pixelWidth = 1, this.pixelHeight = 1, this.width = 1, this.height = 1, this.sampleCount = 1, this.mipLevelCount = 1, this.autoGenerateMipmaps = !1, this.format = "rgba8unorm", this.dimension = "2d", this.antialias = !1, this._touched = 0, this._batchTick = -1, this._textureBindLocation = -1, t = { ...xr.defaultOptions, ...t }, this.label = t.label ?? "", this.resource = t.resource, this.autoGarbageCollect = t.autoGarbageCollect, this._resolution = t.resolution, t.width ? this.pixelWidth = t.width * this._resolution : this.pixelWidth = this.resource ? this.resourceWidth ?? 1 : 1, t.height ? this.pixelHeight = t.height * this._resolution : this.pixelHeight = this.resource ? this.resourceHeight ?? 1 : 1, this.width = this.pixelWidth / this._resolution, this.height = this.pixelHeight / this._resolution, this.format = t.format, this.dimension = t.dimensions, this.mipLevelCount = t.mipLevelCount, this.autoGenerateMipmaps = t.autoGenerateMipmaps, this.sampleCount = t.sampleCount, this.antialias = t.antialias, this.alphaMode = t.alphaMode, this.style = new wn(Pn(t)), this.destroyed = !1, this._refreshPOT();
  }
  /** returns itself */
  get source() {
    return this;
  }
  /** the style of the texture */
  get style() {
    return this._style;
  }
  set style(t) {
    var e, s;
    this.style !== t && ((e = this._style) == null || e.off("change", this._onStyleChange, this), this._style = t, (s = this._style) == null || s.on("change", this._onStyleChange, this), this._onStyleChange());
  }
  /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
  get addressMode() {
    return this._style.addressMode;
  }
  set addressMode(t) {
    this._style.addressMode = t;
  }
  /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
  get repeatMode() {
    return this._style.addressMode;
  }
  set repeatMode(t) {
    this._style.addressMode = t;
  }
  /** Specifies the sampling behavior when the sample footprint is smaller than or equal to one texel. */
  get magFilter() {
    return this._style.magFilter;
  }
  set magFilter(t) {
    this._style.magFilter = t;
  }
  /** Specifies the sampling behavior when the sample footprint is larger than one texel. */
  get minFilter() {
    return this._style.minFilter;
  }
  set minFilter(t) {
    this._style.minFilter = t;
  }
  /** Specifies behavior for sampling between mipmap levels. */
  get mipmapFilter() {
    return this._style.mipmapFilter;
  }
  set mipmapFilter(t) {
    this._style.mipmapFilter = t;
  }
  /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
  get lodMinClamp() {
    return this._style.lodMinClamp;
  }
  set lodMinClamp(t) {
    this._style.lodMinClamp = t;
  }
  /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
  get lodMaxClamp() {
    return this._style.lodMaxClamp;
  }
  set lodMaxClamp(t) {
    this._style.lodMaxClamp = t;
  }
  _onStyleChange() {
    this.emit("styleChange", this);
  }
  /** call this if you have modified the texture outside of the constructor */
  update() {
    if (this.resource) {
      const t = this._resolution;
      if (this.resize(this.resourceWidth / t, this.resourceHeight / t))
        return;
    }
    this.emit("update", this);
  }
  /** Destroys this texture source */
  destroy() {
    this.destroyed = !0, this.emit("destroy", this), this._style && (this._style.destroy(), this._style = null), this.uploadMethodId = null, this.resource = null, this.removeAllListeners();
  }
  /**
   * This will unload the Texture source from the GPU. This will free up the GPU memory
   * As soon as it is required fore rendering, it will be re-uploaded.
   */
  unload() {
    this._resourceId = nt("resource"), this.emit("change", this), this.emit("unload", this);
  }
  /** the width of the resource. This is the REAL pure number, not accounting resolution   */
  get resourceWidth() {
    const { resource: t } = this;
    return t.naturalWidth || t.videoWidth || t.displayWidth || t.width;
  }
  /** the height of the resource. This is the REAL pure number, not accounting resolution */
  get resourceHeight() {
    const { resource: t } = this;
    return t.naturalHeight || t.videoHeight || t.displayHeight || t.height;
  }
  /**
   * the resolution of the texture. Changing this number, will not change the number of pixels in the actual texture
   * but will the size of the texture when rendered.
   *
   * changing the resolution of this texture to 2 for example will make it appear twice as small when rendered (as pixel
   * density will have increased)
   */
  get resolution() {
    return this._resolution;
  }
  set resolution(t) {
    this._resolution !== t && (this._resolution = t, this.width = this.pixelWidth / t, this.height = this.pixelHeight / t);
  }
  /**
   * Resize the texture, this is handy if you want to use the texture as a render texture
   * @param width - the new width of the texture
   * @param height - the new height of the texture
   * @param resolution - the new resolution of the texture
   * @returns - if the texture was resized
   */
  resize(t, e, s) {
    s = s || this._resolution, t = t || this.width, e = e || this.height;
    const r = Math.round(t * s), n = Math.round(e * s);
    return this.width = r / s, this.height = n / s, this._resolution = s, this.pixelWidth === r && this.pixelHeight === n ? !1 : (this._refreshPOT(), this.pixelWidth = r, this.pixelHeight = n, this.emit("resize", this), this._resourceId = nt("resource"), this.emit("change", this), !0);
  }
  /**
   * Lets the renderer know that this texture has been updated and its mipmaps should be re-generated.
   * This is only important for RenderTexture instances, as standard Texture instances will have their
   * mipmaps generated on upload. You should call this method after you make any change to the texture
   *
   * The reason for this is is can be quite expensive to update mipmaps for a texture. So by default,
   * We want you, the developer to specify when this action should happen.
   *
   * Generally you don't want to have mipmaps generated on Render targets that are changed every frame,
   */
  updateMipmaps() {
    this.autoGenerateMipmaps && this.mipLevelCount > 1 && this.emit("updateMipmaps", this);
  }
  set wrapMode(t) {
    this._style.wrapMode = t;
  }
  get wrapMode() {
    return this._style.wrapMode;
  }
  set scaleMode(t) {
    this._style.scaleMode = t;
  }
  /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
  get scaleMode() {
    return this._style.scaleMode;
  }
  /**
   * Refresh check for isPowerOfTwo texture based on size
   * @private
   */
  _refreshPOT() {
    this.isPowerOfTwo = yi(this.pixelWidth) && yi(this.pixelHeight);
  }
  static test(t) {
    throw new Error("Unimplemented");
  }
};
yr.defaultOptions = {
  resolution: 1,
  format: "bgra8unorm",
  alphaMode: "premultiply-alpha-on-upload",
  dimensions: "2d",
  mipLevelCount: 1,
  autoGenerateMipmaps: !1,
  sampleCount: 1,
  antialias: !1,
  autoGarbageCollect: !1
};
let Ut = yr;
class Js extends Ut {
  constructor(t) {
    const e = t.resource || new Float32Array(t.width * t.height * 4);
    let s = t.format;
    s || (e instanceof Float32Array ? s = "rgba32float" : e instanceof Int32Array || e instanceof Uint32Array ? s = "rgba32uint" : e instanceof Int16Array || e instanceof Uint16Array ? s = "rgba16uint" : (e instanceof Int8Array, s = "bgra8unorm")), super({
      ...t,
      resource: e,
      format: s
    }), this.uploadMethodId = "buffer";
  }
  static test(t) {
    return t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array;
  }
}
Js.extension = O.TextureSource;
const Ps = [];
yt.handleByList(O.TextureSource, Ps);
function On(i = {}) {
  const t = i && i.resource, e = t ? i.resource : i, s = t ? i : { resource: i };
  for (let r = 0; r < Ps.length; r++) {
    const n = Ps[r];
    if (n.test(e))
      return new n(s);
  }
  throw new Error(`Could not find a source type for resource: ${s.resource}`);
}
function Wn(i = {}, t = !1) {
  const e = i && i.resource, s = e ? i.resource : i, r = e ? i : { resource: i };
  if (!t && ht.has(s))
    return ht.get(s);
  const n = new H({ source: On(r) });
  return n.on("destroy", () => {
    ht.has(s) && ht.remove(s);
  }), t || ht.set(s, n), n;
}
const Si = new U();
class Bn {
  /**
   * @param texture - observed texture
   * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   */
  constructor(t, e) {
    this.mapCoord = new U(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, typeof e > "u" ? this.clampMargin = t.width < 10 ? 0 : 0.5 : this.clampMargin = e, this.isSimple = !1, this.texture = t;
  }
  /** Texture property. */
  get texture() {
    return this._texture;
  }
  set texture(t) {
    var e;
    this.texture !== t && ((e = this._texture) == null || e.removeListener("update", this.update, this), this._texture = t, this._texture.addListener("update", this.update, this), this.update());
  }
  /**
   * Multiplies uvs array to transform
   * @param uvs - mesh uvs
   * @param [out=uvs] - output
   * @returns - output
   */
  multiplyUvs(t, e) {
    e === void 0 && (e = t);
    const s = this.mapCoord;
    for (let r = 0; r < t.length; r += 2) {
      const n = t[r], a = t[r + 1];
      e[r] = n * s.a + a * s.c + s.tx, e[r + 1] = n * s.b + a * s.d + s.ty;
    }
    return e;
  }
  /**
   * Updates matrices if texture was changed
   * @returns - whether or not it was updated
   */
  update() {
    const t = this._texture;
    this._updateID++;
    const e = t.uvs;
    this.mapCoord.set(e.x1 - e.x0, e.y1 - e.y0, e.x3 - e.x0, e.y3 - e.y0, e.x0, e.y0);
    const s = t.orig, r = t.trim;
    r && (Si.set(
      s.width / r.width,
      0,
      0,
      s.height / r.height,
      -r.x / r.width,
      -r.y / r.height
    ), this.mapCoord.append(Si));
    const n = t.source, a = this.uClampFrame, o = this.clampMargin / n._resolution, h = this.clampOffset;
    return a[0] = (t.frame.x + o + h) / n.width, a[1] = (t.frame.y + o + h) / n.height, a[2] = (t.frame.x + t.frame.width - o + h) / n.width, a[3] = (t.frame.y + t.frame.height - o + h) / n.height, this.uClampOffset[0] = h / n.pixelWidth, this.uClampOffset[1] = h / n.pixelHeight, this.isSimple = t.frame.width === n.width && t.frame.height === n.height && t.rotate === 0, !0;
  }
}
class H extends te {
  /**
   * @param {TextureOptions} param0 - Options for the texture
   */
  constructor({
    source: t,
    label: e,
    frame: s,
    orig: r,
    trim: n,
    defaultAnchor: a,
    defaultBorders: o,
    rotate: h
  } = {}) {
    if (super(), this.uid = nt("texture"), this.uvs = { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 }, this.frame = new et(), this.noFrame = !1, this.isTexture = !0, this.label = e, this.source = (t == null ? void 0 : t.source) ?? new Ut(), this.noFrame = !s, s)
      this.frame.copyFrom(s);
    else {
      const { width: l, height: c } = this._source;
      this.frame.width = l, this.frame.height = c;
    }
    this.orig = r || this.frame, this.trim = n, this.rotate = h ?? 0, this.defaultAnchor = a, this.defaultBorders = o, this.destroyed = !1, this.updateUvs();
  }
  /**
   * Helper function that creates a returns Texture based on the source you provide.
   * The source should be loaded and ready to go. If not its best to grab the asset using Assets.
   * @param id - String or Source to create texture from
   * @param skipCache - Skip adding the texture to the cache
   * @returns The texture based on the Id provided
   */
  static from(t, e = !1) {
    return typeof t == "string" ? ht.get(t) : t instanceof Ut ? new H({ source: t }) : Wn(t, e);
  }
  set source(t) {
    this._source && this._source.off("resize", this.update, this), this._source = t, t.on("resize", this.update, this), this.emit("update", this);
  }
  /** the underlying source of the texture (equivalent of baseTexture in v7) */
  get source() {
    return this._source;
  }
  /** returns a TextureMatrix instance for this texture. By default, that object is not created because its heavy. */
  get textureMatrix() {
    return this._textureMatrix || (this._textureMatrix = new Bn(this)), this._textureMatrix;
  }
  /** The width of the Texture in pixels. */
  get width() {
    return this.orig.width;
  }
  /** The height of the Texture in pixels. */
  get height() {
    return this.orig.height;
  }
  /** Call this function when you have modified the frame of this texture. */
  updateUvs() {
    const { uvs: t, frame: e } = this, { width: s, height: r } = this._source, n = e.x / s, a = e.y / r, o = e.width / s, h = e.height / r;
    let l = this.rotate;
    if (l) {
      const c = o / 2, u = h / 2, d = n + c, m = a + u;
      l = $.add(l, $.NW), t.x0 = d + c * $.uX(l), t.y0 = m + u * $.uY(l), l = $.add(l, 2), t.x1 = d + c * $.uX(l), t.y1 = m + u * $.uY(l), l = $.add(l, 2), t.x2 = d + c * $.uX(l), t.y2 = m + u * $.uY(l), l = $.add(l, 2), t.x3 = d + c * $.uX(l), t.y3 = m + u * $.uY(l);
    } else
      t.x0 = n, t.y0 = a, t.x1 = n + o, t.y1 = a, t.x2 = n + o, t.y2 = a + h, t.x3 = n, t.y3 = a + h;
  }
  /**
   * Destroys this texture
   * @param destroySource - Destroy the source when the texture is destroyed.
   */
  destroy(t = !1) {
    this._source && t && (this._source.destroy(), this._source = null), this._textureMatrix = null, this.destroyed = !0, this.emit("destroy", this), this.removeAllListeners();
  }
  /** call this if you have modified the `texture outside` of the constructor */
  update() {
    this.noFrame && (this.frame.width = this._source.width, this.frame.height = this._source.height), this.updateUvs(), this.emit("update", this);
  }
  /** @deprecated since 8.0.0 */
  get baseTexture() {
    return It(Nt, "Texture.baseTexture is now Texture.source"), this._source;
  }
}
H.EMPTY = new H({
  label: "EMPTY",
  source: new Ut({
    label: "EMPTY"
  })
});
H.EMPTY.destroy = gr;
H.WHITE = new H({
  source: new Js({
    resource: new Uint8Array([255, 255, 255, 255]),
    width: 1,
    height: 1,
    alphaMode: "premultiply-alpha-on-upload",
    label: "WHITE"
  }),
  label: "WHITE"
});
H.WHITE.destroy = gr;
function kn(i, t, e, s) {
  const { width: r, height: n } = e.orig, a = e.trim;
  if (a) {
    const o = a.width, h = a.height;
    i.minX = a.x - t._x * r - s, i.maxX = i.minX + o, i.minY = a.y - t._y * n - s, i.maxY = i.minY + h;
  } else
    i.minX = -t._x * r - s, i.maxX = i.minX + r, i.minY = -t._y * n - s, i.maxY = i.minY + n;
}
var Yn = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, Lt = function(i) {
  return typeof i == "string" ? i.length > 0 : typeof i == "number";
}, tt = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * i) / e + 0;
}, At = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = 1), i > e ? e : i > t ? i : t;
}, Sr = function(i) {
  return (i = isFinite(i) ? i % 360 : 0) > 0 ? i : i + 360;
}, Ti = function(i) {
  return { r: At(i.r, 0, 255), g: At(i.g, 0, 255), b: At(i.b, 0, 255), a: At(i.a) };
}, ms = function(i) {
  return { r: tt(i.r), g: tt(i.g), b: tt(i.b), a: tt(i.a, 3) };
}, Un = /^#([0-9a-f]{3,8})$/i, qe = function(i) {
  var t = i.toString(16);
  return t.length < 2 ? "0" + t : t;
}, Tr = function(i) {
  var t = i.r, e = i.g, s = i.b, r = i.a, n = Math.max(t, e, s), a = n - Math.min(t, e, s), o = a ? n === t ? (e - s) / a : n === e ? 2 + (s - t) / a : 4 + (t - e) / a : 0;
  return { h: 60 * (o < 0 ? o + 6 : o), s: n ? a / n * 100 : 0, v: n / 255 * 100, a: r };
}, Rr = function(i) {
  var t = i.h, e = i.s, s = i.v, r = i.a;
  t = t / 360 * 6, e /= 100, s /= 100;
  var n = Math.floor(t), a = s * (1 - e), o = s * (1 - (t - n) * e), h = s * (1 - (1 - t + n) * e), l = n % 6;
  return { r: 255 * [s, o, a, a, h, s][l], g: 255 * [h, s, s, o, a, a][l], b: 255 * [a, a, h, s, s, o][l], a: r };
}, Ri = function(i) {
  return { h: Sr(i.h), s: At(i.s, 0, 100), l: At(i.l, 0, 100), a: At(i.a) };
}, bi = function(i) {
  return { h: tt(i.h), s: tt(i.s), l: tt(i.l), a: tt(i.a, 3) };
}, _i = function(i) {
  return Rr((e = (t = i).s, { h: t.h, s: (e *= ((s = t.l) < 50 ? s : 100 - s) / 100) > 0 ? 2 * e / (s + e) * 100 : 0, v: s + e, a: t.a }));
  var t, e, s;
}, Ne = function(i) {
  return { h: (t = Tr(i)).h, s: (r = (200 - (e = t.s)) * (s = t.v) / 100) > 0 && r < 200 ? e * s / 100 / (r <= 100 ? r : 200 - r) * 100 : 0, l: r / 2, a: t.a };
  var t, e, s, r;
}, Fn = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Gn = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Hn = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Vn = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ds = { string: [[function(i) {
  var t = Un.exec(i);
  return t ? (i = t[1]).length <= 4 ? { r: parseInt(i[0] + i[0], 16), g: parseInt(i[1] + i[1], 16), b: parseInt(i[2] + i[2], 16), a: i.length === 4 ? tt(parseInt(i[3] + i[3], 16) / 255, 2) : 1 } : i.length === 6 || i.length === 8 ? { r: parseInt(i.substr(0, 2), 16), g: parseInt(i.substr(2, 2), 16), b: parseInt(i.substr(4, 2), 16), a: i.length === 8 ? tt(parseInt(i.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(i) {
  var t = Hn.exec(i) || Vn.exec(i);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : Ti({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(i) {
  var t = Fn.exec(i) || Gn.exec(i);
  if (!t)
    return null;
  var e, s, r = Ri({ h: (e = t[1], s = t[2], s === void 0 && (s = "deg"), Number(e) * (Yn[s] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return _i(r);
}, "hsl"]], object: [[function(i) {
  var t = i.r, e = i.g, s = i.b, r = i.a, n = r === void 0 ? 1 : r;
  return Lt(t) && Lt(e) && Lt(s) ? Ti({ r: Number(t), g: Number(e), b: Number(s), a: Number(n) }) : null;
}, "rgb"], [function(i) {
  var t = i.h, e = i.s, s = i.l, r = i.a, n = r === void 0 ? 1 : r;
  if (!Lt(t) || !Lt(e) || !Lt(s))
    return null;
  var a = Ri({ h: Number(t), s: Number(e), l: Number(s), a: Number(n) });
  return _i(a);
}, "hsl"], [function(i) {
  var t = i.h, e = i.s, s = i.v, r = i.a, n = r === void 0 ? 1 : r;
  if (!Lt(t) || !Lt(e) || !Lt(s))
    return null;
  var a = function(o) {
    return { h: Sr(o.h), s: At(o.s, 0, 100), v: At(o.v, 0, 100), a: At(o.a) };
  }({ h: Number(t), s: Number(e), v: Number(s), a: Number(n) });
  return Rr(a);
}, "hsv"]] }, Ni = function(i, t) {
  for (var e = 0; e < t.length; e++) {
    var s = t[e][0](i);
    if (s)
      return [s, t[e][1]];
  }
  return [null, void 0];
}, zn = function(i) {
  return typeof i == "string" ? Ni(i.trim(), Ds.string) : typeof i == "object" && i !== null ? Ni(i, Ds.object) : [null, void 0];
}, gs = function(i, t) {
  var e = Ne(i);
  return { h: e.h, s: At(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
}, As = function(i) {
  return (299 * i.r + 587 * i.g + 114 * i.b) / 1e3 / 255;
}, Ii = function(i, t) {
  var e = Ne(i);
  return { h: e.h, s: e.s, l: At(e.l + 100 * t, 0, 100), a: e.a };
}, ws = function() {
  function i(t) {
    this.parsed = zn(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return i.prototype.isValid = function() {
    return this.parsed !== null;
  }, i.prototype.brightness = function() {
    return tt(As(this.rgba), 2);
  }, i.prototype.isDark = function() {
    return As(this.rgba) < 0.5;
  }, i.prototype.isLight = function() {
    return As(this.rgba) >= 0.5;
  }, i.prototype.toHex = function() {
    return t = ms(this.rgba), e = t.r, s = t.g, r = t.b, a = (n = t.a) < 1 ? qe(tt(255 * n)) : "", "#" + qe(e) + qe(s) + qe(r) + a;
    var t, e, s, r, n, a;
  }, i.prototype.toRgb = function() {
    return ms(this.rgba);
  }, i.prototype.toRgbString = function() {
    return t = ms(this.rgba), e = t.r, s = t.g, r = t.b, (n = t.a) < 1 ? "rgba(" + e + ", " + s + ", " + r + ", " + n + ")" : "rgb(" + e + ", " + s + ", " + r + ")";
    var t, e, s, r, n;
  }, i.prototype.toHsl = function() {
    return bi(Ne(this.rgba));
  }, i.prototype.toHslString = function() {
    return t = bi(Ne(this.rgba)), e = t.h, s = t.s, r = t.l, (n = t.a) < 1 ? "hsla(" + e + ", " + s + "%, " + r + "%, " + n + ")" : "hsl(" + e + ", " + s + "%, " + r + "%)";
    var t, e, s, r, n;
  }, i.prototype.toHsv = function() {
    return t = Tr(this.rgba), { h: tt(t.h), s: tt(t.s), v: tt(t.v), a: tt(t.a, 3) };
    var t;
  }, i.prototype.invert = function() {
    return bt({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, i.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), bt(gs(this.rgba, t));
  }, i.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), bt(gs(this.rgba, -t));
  }, i.prototype.grayscale = function() {
    return bt(gs(this.rgba, -1));
  }, i.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), bt(Ii(this.rgba, t));
  }, i.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), bt(Ii(this.rgba, -t));
  }, i.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, i.prototype.alpha = function(t) {
    return typeof t == "number" ? bt({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t }) : tt(this.rgba.a, 3);
    var e;
  }, i.prototype.hue = function(t) {
    var e = Ne(this.rgba);
    return typeof t == "number" ? bt({ h: t, s: e.s, l: e.l, a: e.a }) : tt(e.h);
  }, i.prototype.isEqual = function(t) {
    return this.toHex() === bt(t).toHex();
  }, i;
}(), bt = function(i) {
  return i instanceof ws ? i : new ws(i);
}, Ci = [], Xn = function(i) {
  i.forEach(function(t) {
    Ci.indexOf(t) < 0 && (t(ws, Ds), Ci.push(t));
  });
};
function $n(i, t) {
  var e = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, s = {};
  for (var r in e)
    s[e[r]] = r;
  var n = {};
  i.prototype.toName = function(a) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b))
      return "transparent";
    var o, h, l = s[this.toHex()];
    if (l)
      return l;
    if (a != null && a.closest) {
      var c = this.toRgb(), u = 1 / 0, d = "black";
      if (!n.length)
        for (var m in e)
          n[m] = new i(e[m]).toRgb();
      for (var f in e) {
        var A = (o = c, h = n[f], Math.pow(o.r - h.r, 2) + Math.pow(o.g - h.g, 2) + Math.pow(o.b - h.b, 2));
        A < u && (u = A, d = f);
      }
      return d;
    }
  }, t.string.push([function(a) {
    var o = a.toLowerCase(), h = o === "transparent" ? "#0000" : e[o];
    return h ? new i(h).toRgb() : null;
  }, "name"]);
}
Xn([$n]);
const ce = class be {
  /**
   * @param {ColorSource} value - Optional value to use, if not provided, white is used.
   */
  constructor(t = 16777215) {
    this._value = null, this._components = new Float32Array(4), this._components.fill(1), this._int = 16777215, this.value = t;
  }
  /** Get red component (0 - 1) */
  get red() {
    return this._components[0];
  }
  /** Get green component (0 - 1) */
  get green() {
    return this._components[1];
  }
  /** Get blue component (0 - 1) */
  get blue() {
    return this._components[2];
  }
  /** Get alpha component (0 - 1) */
  get alpha() {
    return this._components[3];
  }
  /**
   * Set the value, suitable for chaining
   * @param value
   * @see Color.value
   */
  setValue(t) {
    return this.value = t, this;
  }
  /**
   * The current color source.
   *
   * When setting:
   * - Setting to an instance of `Color` will copy its color source and components.
   * - Otherwise, `Color` will try to normalize the color source and set the components.
   *   If the color source is invalid, an `Error` will be thrown and the `Color` will left unchanged.
   *
   * Note: The `null` in the setter's parameter type is added to match the TypeScript rule: return type of getter
   * must be assignable to its setter's parameter type. Setting `value` to `null` will throw an `Error`.
   *
   * When getting:
   * - A return value of `null` means the previous value was overridden (e.g., {@link Color.multiply multiply},
   *   {@link Color.premultiply premultiply} or {@link Color.round round}).
   * - Otherwise, the color source used when setting is returned.
   */
  set value(t) {
    if (t instanceof be)
      this._value = this._cloneSource(t._value), this._int = t._int, this._components.set(t._components);
    else {
      if (t === null)
        throw new Error("Cannot set Color#value to null");
      (this._value === null || !this._isSourceEqual(this._value, t)) && (this._normalize(t), this._value = this._cloneSource(t));
    }
  }
  get value() {
    return this._value;
  }
  /**
   * Copy a color source internally.
   * @param value - Color source
   */
  _cloneSource(t) {
    return typeof t == "string" || typeof t == "number" || t instanceof Number || t === null ? t : Array.isArray(t) || ArrayBuffer.isView(t) ? t.slice(0) : typeof t == "object" && t !== null ? { ...t } : t;
  }
  /**
   * Equality check for color sources.
   * @param value1 - First color source
   * @param value2 - Second color source
   * @returns `true` if the color sources are equal, `false` otherwise.
   */
  _isSourceEqual(t, e) {
    const s = typeof t;
    if (s !== typeof e)
      return !1;
    if (s === "number" || s === "string" || t instanceof Number)
      return t === e;
    if (Array.isArray(t) && Array.isArray(e) || ArrayBuffer.isView(t) && ArrayBuffer.isView(e))
      return t.length !== e.length ? !1 : t.every((n, a) => n === e[a]);
    if (t !== null && e !== null) {
      const n = Object.keys(t), a = Object.keys(e);
      return n.length !== a.length ? !1 : n.every((o) => t[o] === e[o]);
    }
    return t === e;
  }
  /**
   * Convert to a RGBA color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1, a: 1 }
   */
  toRgba() {
    const [t, e, s, r] = this._components;
    return { r: t, g: e, b: s, a: r };
  }
  /**
   * Convert to a RGB color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1 }
   */
  toRgb() {
    const [t, e, s] = this._components;
    return { r: t, g: e, b: s };
  }
  /** Convert to a CSS-style rgba string: `rgba(255,255,255,1.0)`. */
  toRgbaString() {
    const [t, e, s] = this.toUint8RgbArray();
    return `rgba(${t},${e},${s},${this.alpha})`;
  }
  toUint8RgbArray(t) {
    const [e, s, r] = this._components;
    return this._arrayRgb || (this._arrayRgb = []), t = t || this._arrayRgb, t[0] = Math.round(e * 255), t[1] = Math.round(s * 255), t[2] = Math.round(r * 255), t;
  }
  toArray(t) {
    this._arrayRgba || (this._arrayRgba = []), t = t || this._arrayRgba;
    const [e, s, r, n] = this._components;
    return t[0] = e, t[1] = s, t[2] = r, t[3] = n, t;
  }
  toRgbArray(t) {
    this._arrayRgb || (this._arrayRgb = []), t = t || this._arrayRgb;
    const [e, s, r] = this._components;
    return t[0] = e, t[1] = s, t[2] = r, t;
  }
  /**
   * Convert to a hexadecimal number.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toNumber(); // returns 16777215
   */
  toNumber() {
    return this._int;
  }
  /**
   * Convert to a BGR number
   * @example
   * import { Color } from 'pixi.js';
   * new Color(0xffcc99).toBgrNumber(); // returns 0x99ccff
   */
  toBgrNumber() {
    const [t, e, s] = this.toUint8RgbArray();
    return (s << 16) + (e << 8) + t;
  }
  /**
   * Convert to a hexadecimal number in little endian format (e.g., BBGGRR).
   * @example
   * import { Color } from 'pixi.js';
   * new Color(0xffcc99).toLittleEndianNumber(); // returns 0x99ccff
   * @returns {number} - The color as a number in little endian format.
   */
  toLittleEndianNumber() {
    const t = this._int;
    return (t >> 16) + (t & 65280) + ((t & 255) << 16);
  }
  /**
   * Multiply with another color. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param {ColorSource} value - The color to multiply by.
   */
  multiply(t) {
    const [e, s, r, n] = be._temp.setValue(t)._components;
    return this._components[0] *= e, this._components[1] *= s, this._components[2] *= r, this._components[3] *= n, this._refreshInt(), this._value = null, this;
  }
  /**
   * Converts color to a premultiplied alpha format. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {Color} - Itself.
   */
  premultiply(t, e = !0) {
    return e && (this._components[0] *= t, this._components[1] *= t, this._components[2] *= t), this._components[3] = t, this._refreshInt(), this._value = null, this;
  }
  /**
   * Premultiplies alpha with current color.
   * @param {number} alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {number} tint multiplied by alpha
   */
  toPremultiplied(t, e = !0) {
    if (t === 1)
      return (255 << 24) + this._int;
    if (t === 0)
      return e ? 0 : this._int;
    let s = this._int >> 16 & 255, r = this._int >> 8 & 255, n = this._int & 255;
    return e && (s = s * t + 0.5 | 0, r = r * t + 0.5 | 0, n = n * t + 0.5 | 0), (t * 255 << 24) + (s << 16) + (r << 8) + n;
  }
  /**
   * Convert to a hexidecimal string.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHex(); // returns "#ffffff"
   */
  toHex() {
    const t = this._int.toString(16);
    return `#${"000000".substring(0, 6 - t.length) + t}`;
  }
  /**
   * Convert to a hexidecimal string with alpha.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHexa(); // returns "#ffffffff"
   */
  toHexa() {
    const e = Math.round(this._components[3] * 255).toString(16);
    return this.toHex() + "00".substring(0, 2 - e.length) + e;
  }
  /**
   * Set alpha, suitable for chaining.
   * @param alpha
   */
  setAlpha(t) {
    return this._components[3] = this._clamp(t), this;
  }
  /**
   * Normalize the input value into rgba
   * @param value - Input value
   */
  _normalize(t) {
    let e, s, r, n;
    if ((typeof t == "number" || t instanceof Number) && t >= 0 && t <= 16777215) {
      const a = t;
      e = (a >> 16 & 255) / 255, s = (a >> 8 & 255) / 255, r = (a & 255) / 255, n = 1;
    } else if ((Array.isArray(t) || t instanceof Float32Array) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t), [e, s, r, n = 1] = t;
    else if ((t instanceof Uint8Array || t instanceof Uint8ClampedArray) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t, 0, 255), [e, s, r, n = 255] = t, e /= 255, s /= 255, r /= 255, n /= 255;
    else if (typeof t == "string" || typeof t == "object") {
      if (typeof t == "string") {
        const o = be.HEX_PATTERN.exec(t);
        o && (t = `#${o[2]}`);
      }
      const a = bt(t);
      a.isValid() && ({ r: e, g: s, b: r, a: n } = a.rgba, e /= 255, s /= 255, r /= 255);
    }
    if (e !== void 0)
      this._components[0] = e, this._components[1] = s, this._components[2] = r, this._components[3] = n, this._refreshInt();
    else
      throw new Error(`Unable to convert color ${t}`);
  }
  /** Refresh the internal color rgb number */
  _refreshInt() {
    this._clamp(this._components);
    const [t, e, s] = this._components;
    this._int = (t * 255 << 16) + (e * 255 << 8) + (s * 255 | 0);
  }
  /**
   * Clamps values to a range. Will override original values
   * @param value - Value(s) to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   */
  _clamp(t, e = 0, s = 1) {
    return typeof t == "number" ? Math.min(Math.max(t, e), s) : (t.forEach((r, n) => {
      t[n] = Math.min(Math.max(r, e), s);
    }), t);
  }
  /**
   * Check if the value is a color-like object
   * @param value - Value to check
   * @returns True if the value is a color-like object
   * @static
   * @example
   * import { Color } from 'pixi.js';
   * Color.isColorLike('white'); // returns true
   * Color.isColorLike(0xffffff); // returns true
   * Color.isColorLike([1, 1, 1]); // returns true
   */
  static isColorLike(t) {
    return typeof t == "number" || typeof t == "string" || t instanceof Number || t instanceof be || Array.isArray(t) || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Float32Array || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 && t.a !== void 0;
  }
};
ce.shared = new ce();
ce._temp = new ce();
ce.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
let gt = ce;
const Qn = {
  cullArea: null,
  cullable: !1,
  cullableChildren: !0
};
function jn(i, t, e) {
  const s = i.length;
  let r;
  if (t >= s || e === 0)
    return;
  e = t + e > s ? s - t : e;
  const n = s - e;
  for (r = t; r < n; ++r)
    i[r] = i[r + e];
  i.length = n;
}
const qn = {
  allowChildren: !0,
  /**
   * Removes all children from this container that are within the begin and end indexes.
   * @param beginIndex - The beginning position.
   * @param endIndex - The ending position. Default value is size of the container.
   * @returns - List of removed children
   * @memberof scene.Container#
   */
  removeChildren(i = 0, t) {
    const e = t ?? this.children.length, s = e - i, r = [];
    if (s > 0 && s <= e) {
      for (let n = e - 1; n >= i; n--) {
        const a = this.children[n];
        a && (this.renderGroup && this.renderGroup.removeChild(a), r.push(a), a.parent = null);
      }
      jn(this.children, i, e);
      for (let n = 0; n < r.length; ++n)
        this.emit("childRemoved", r[n], this, n), r[n].emit("removed", this);
      return r;
    } else if (s === 0 && this.children.length === 0)
      return r;
    throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
  },
  /**
   * Removes a child from the specified index position.
   * @param index - The index to get the child from
   * @returns The child that was removed.
   * @memberof scene.Container#
   */
  removeChildAt(i) {
    const t = this.getChildAt(i);
    return this.removeChild(t);
  },
  /**
   * Returns the child at the specified index
   * @param index - The index to get the child at
   * @returns - The child at the given index, if any.
   * @memberof scene.Container#
   */
  getChildAt(i) {
    if (i < 0 || i >= this.children.length)
      throw new Error(`getChildAt: Index (${i}) does not exist.`);
    return this.children[i];
  },
  /**
   * Changes the position of an existing child in the container container
   * @param child - The child Container instance for which you want to change the index number
   * @param index - The resulting index number for the child container
   * @memberof scene.Container#
   */
  setChildIndex(i, t) {
    if (t < 0 || t >= this.children.length)
      throw new Error(`The index ${t} supplied is out of bounds ${this.children.length}`);
    this.getChildIndex(i), this.addChildAt(i, t);
  },
  /**
   * Returns the index position of a child Container instance
   * @param child - The Container instance to identify
   * @returns - The index position of the child container to identify
   * @memberof scene.Container#
   */
  getChildIndex(i) {
    const t = this.children.indexOf(i);
    if (t === -1)
      throw new Error("The supplied Container must be a child of the caller");
    return t;
  },
  /**
   * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown.
   * If the child is already in this container, it will be moved to the specified index.
   * @param {Container} child - The child to add.
   * @param {number} index - The absolute index where the child will be positioned at the end of the operation.
   * @returns {Container} The child that was added.
   * @memberof scene.Container#
   */
  addChildAt(i, t) {
    this.allowChildren || It(Nt, "addChildAt: Only Containers will be allowed to add children in v8.0.0");
    const { children: e } = this;
    if (t < 0 || t > e.length)
      throw new Error(`${i}addChildAt: The index ${t} supplied is out of bounds ${e.length}`);
    if (i.parent) {
      const s = i.parent.children.indexOf(i);
      if (i.parent === this && s === t)
        return i;
      s !== -1 && i.parent.children.splice(s, 1);
    }
    return t === e.length ? e.push(i) : e.splice(t, 0, i), i.parent = this, i.didChange = !0, i.didViewUpdate = !1, i._updateFlags = 15, this.renderGroup && this.renderGroup.addChild(i), this.sortableChildren && (this.sortDirty = !0), this.emit("childAdded", i, this, t), i.emit("added", this), i;
  },
  /**
   * Swaps the position of 2 Containers within this container.
   * @param child - First container to swap
   * @param child2 - Second container to swap
   */
  swapChildren(i, t) {
    if (i === t)
      return;
    const e = this.getChildIndex(i), s = this.getChildIndex(t);
    this.children[e] = t, this.children[s] = i;
  },
  /**
   * Remove the Container from its parent Container. If the Container has no parent, do nothing.
   * @memberof scene.Container#
   */
  removeFromParent() {
    var i;
    (i = this.parent) == null || i.removeChild(this);
  }
};
class Kn {
  constructor(t) {
    this.pipe = "filter", this.priority = 1, this.filters = t == null ? void 0 : t.filters, this.filterArea = t == null ? void 0 : t.filterArea;
  }
  destroy() {
    for (let t = 0; t < this.filters.length; t++)
      this.filters[t].destroy();
    this.filters = null, this.filterArea = null;
  }
}
const br = [];
function Jn(i, t) {
  const e = br.pop() || new Kn();
  return e.filters = i, e.filterArea = t, e;
}
function Zn(i) {
  i.filters = null, br.push(i);
}
class Zs {
  /**
   * Constructs a new Pool.
   * @param ClassType - The constructor of the items in the pool.
   * @param {number} [initialSize] - The initial size of the pool.
   */
  constructor(t, e) {
    this._pool = [], this._count = 0, this._index = 0, this._classType = t, e && this.prepopulate(e);
  }
  /**
   * Prepopulates the pool with a given number of items.
   * @param total - The number of items to add to the pool.
   */
  prepopulate(t) {
    for (let e = 0; e < t; e++)
      this._pool[this._index++] = new this._classType();
    this._count += t;
  }
  /**
   * Gets an item from the pool. Calls the item's `init` method if it exists.
   * If there are no items left in the pool, a new one will be created.
   * @param {unknown} [data] - Optional data to pass to the item's constructor.
   * @returns {T} The item from the pool.
   */
  get(t) {
    var s;
    let e;
    return this._index > 0 ? e = this._pool[--this._index] : e = new this._classType(), (s = e.init) == null || s.call(e, t), e;
  }
  /**
   * Returns an item to the pool. Calls the item's `reset` method if it exists.
   * @param {T} item - The item to return to the pool.
   */
  return(t) {
    var e;
    (e = t.reset) == null || e.call(t), this._pool[this._index++] = t;
  }
  /**
   * Gets the number of items in the pool.
   * @readonly
   * @member {number}
   */
  get totalSize() {
    return this._count;
  }
  /**
   * Gets the number of items in the pool that are free to use without needing to create more.
   * @readonly
   * @member {number}
   */
  get totalFree() {
    return this._index;
  }
  /**
   * Gets the number of items in the pool that are currently in use.
   * @readonly
   * @member {number}
   */
  get totalUsed() {
    return this._count - this._index;
  }
}
class ta {
  constructor() {
    this._poolsByClass = /* @__PURE__ */ new Map();
  }
  /**
   * Prepopulates a specific pool with a given number of items.
   * @template T The type of items in the pool. Must extend PoolItem.
   * @param {PoolItemConstructor<T>} Class - The constructor of the items in the pool.
   * @param {number} total - The number of items to add to the pool.
   */
  prepopulate(t, e) {
    this.getPool(t).prepopulate(e);
  }
  /**
   * Gets an item from a specific pool.
   * @template T The type of items in the pool. Must extend PoolItem.
   * @param {PoolItemConstructor<T>} Class - The constructor of the items in the pool.
   * @param {unknown} [data] - Optional data to pass to the item's constructor.
   * @returns {T} The item from the pool.
   */
  get(t, e) {
    return this.getPool(t).get(e);
  }
  /**
   * Returns an item to its respective pool.
   * @param {PoolItem} item - The item to return to the pool.
   */
  return(t) {
    this.getPool(t.constructor).return(t);
  }
  /**
   * Gets a specific pool based on the class type.
   * @template T The type of items in the pool. Must extend PoolItem.
   * @param {PoolItemConstructor<T>} ClassType - The constructor of the items in the pool.
   * @returns {Pool<T>} The pool of the given class type.
   */
  getPool(t) {
    return this._poolsByClass.has(t) || this._poolsByClass.set(t, new Zs(t)), this._poolsByClass.get(t);
  }
  /** gets the usage stats of each pool in the system */
  stats() {
    const t = {};
    return this._poolsByClass.forEach((e) => {
      const s = t[e._classType.name] ? e._classType.name + e._classType.ID : e._classType.name;
      t[s] = {
        free: e.totalFree,
        used: e.totalUsed,
        size: e.totalSize
      };
    }), t;
  }
}
const vt = new ta();
class ea {
  constructor() {
    this._effectClasses = [], this._tests = [], this._initialized = !1;
  }
  init() {
    this._initialized || (this._initialized = !0, this._effectClasses.forEach((t) => {
      this.add({
        test: t.test,
        maskClass: t
      });
    }));
  }
  add(t) {
    this._tests.push(t);
  }
  getMaskEffect(t) {
    this._initialized || this.init();
    for (let e = 0; e < this._tests.length; e++) {
      const s = this._tests[e];
      if (s.test(t))
        return vt.get(s.maskClass, t);
    }
    return t;
  }
  returnMaskEffect(t) {
    vt.return(t);
  }
}
const Os = new ea();
yt.handleByList(O.MaskEffect, Os._effectClasses);
const sa = {
  _mask: null,
  _filters: null,
  /**
   * @todo Needs docs.
   * @memberof scene.Container#
   * @type {Array<Effect>}
   */
  effects: [],
  /**
   * @todo Needs docs.
   * @param effect - The effect to add.
   * @memberof scene.Container#
   * @ignore
   */
  addEffect(i) {
    this.effects.indexOf(i) === -1 && (this.effects.push(i), this.effects.sort((e, s) => e.priority - s.priority), this.renderGroup && (this.renderGroup.structureDidChange = !0), this._updateIsSimple());
  },
  /**
   * @todo Needs docs.
   * @param effect - The effect to remove.
   * @memberof scene.Container#
   * @ignore
   */
  removeEffect(i) {
    const t = this.effects.indexOf(i);
    t !== -1 && (this.effects.splice(t, 1), !this.isRenderGroupRoot && this.renderGroup && (this.renderGroup.structureDidChange = !0), this._updateIsSimple());
  },
  set mask(i) {
    if (this._mask || (this._mask = { mask: null, effect: null }), this._mask.mask === i || (this._mask.effect && (this.removeEffect(this._mask.effect), Os.returnMaskEffect(this._mask.effect), this._mask.effect = null), this._mask.mask = i, i == null))
      return;
    const t = Os.getMaskEffect(i);
    this._mask.effect = t, this.addEffect(t);
  },
  /**
   * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
   * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
   * {@link Graphics} or a {@link Sprite} object. This allows for much faster masking in canvas as it
   * utilities shape clipping. Furthermore, a mask of an object must be in the subtree of its parent.
   * Otherwise, `getLocalBounds` may calculate incorrect bounds, which makes the container's width and height wrong.
   * To remove a mask, set this property to `null`.
   *
   * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
   * @example
   * import { Graphics, Sprite } from 'pixi.js';
   *
   * const graphics = new Graphics();
   * graphics.beginFill(0xFF3300);
   * graphics.drawRect(50, 250, 100, 100);
   * graphics.endFill();
   *
   * const sprite = new Sprite(texture);
   * sprite.mask = graphics;
   * @memberof scene.Container#
   */
  get mask() {
    var i;
    return (i = this._mask) == null ? void 0 : i.mask;
  },
  set filters(i) {
    !Array.isArray(i) && i && (i = [i]), this._filters || (this._filters = { filters: null, effect: null, filterArea: null });
    const t = i && i.length > 0, e = this._filters.effect && !t || !this._filters.effect && t;
    if (this._filters.filters = Object.freeze(i), e)
      if (t) {
        const s = Jn(i, this.filterArea);
        this._filters.effect = s, this.addEffect(s);
      } else
        this.removeEffect(this._filters.effect), Zn(this._filters.effect), this._filters.effect = null;
  },
  /**
   * Sets the filters for the displayObject.
   * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
   * To remove filters simply set this property to `'null'`.
   * @memberof scene.Container#
   */
  get filters() {
    var i;
    return (i = this._filters) == null ? void 0 : i.filters;
  },
  set filterArea(i) {
    this._filters || (this._filters = { filters: null, effect: null, filterArea: null }), this._filters.filterArea = i;
  },
  /**
   * The area the filter is applied to. This is used as more of an optimization
   * rather than figuring out the dimensions of the displayObject each frame you can set this rectangle.
   *
   * Also works as an interaction mask.
   * @memberof scene.Container#
   */
  get filterArea() {
    var i;
    return (i = this._filters) == null ? void 0 : i.filterArea;
  }
}, ia = {
  /**
   * The instance label of the object.
   * @memberof scene.Container#
   * @member {string} label
   */
  label: null,
  /**
   * The instance name of the object.
   * @deprecated since 8.0.0
   * @see scene.Container#label
   * @member {string} name
   * @memberof scene.Container#
   */
  get name() {
    return It(Nt, "Container.name property has been removed, use Container.label instead"), this.label;
  },
  set name(i) {
    It(Nt, "Container.name property has been removed, use Container.label instead"), this.label = i;
  },
  /**
   * @method getChildByName
   * @deprecated since 8.0.0
   * @param {string} name - Instance name.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @returns {Container} The child with the specified name.
   * @see scene.Container#getChildByLabel
   * @memberof scene.Container#
   */
  getChildByName(i, t = !1) {
    return this.getChildByLabel(i, t);
  },
  /**
   * Returns the first child in the container with the specified label.
   *
   * Recursive searches are done in a pre-order traversal.
   * @memberof scene.Container#
   * @param {string|RegExp} label - Instance label.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @returns {Container} The child with the specified label.
   */
  getChildByLabel(i, t = !1) {
    const e = this.children;
    for (let s = 0; s < e.length; s++) {
      const r = e[s];
      if (r.label === i || i instanceof RegExp && i.test(r.label))
        return r;
    }
    if (t)
      for (let s = 0; s < e.length; s++) {
        const n = e[s].getChildByLabel(i, !0);
        if (n)
          return n;
      }
    return null;
  },
  /**
   * Returns all children in the container with the specified label.
   * @memberof scene.Container#
   * @param {string|RegExp} label - Instance label.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @param {Container[]} [out=[]] - The array to store matching children in.
   * @returns {Container[]} An array of children with the specified label.
   */
  getChildrenByLabel(i, t = !1, e = []) {
    const s = this.children;
    for (let r = 0; r < s.length; r++) {
      const n = s[r];
      (n.label === i || i instanceof RegExp && i.test(n.label)) && e.push(n);
    }
    if (t)
      for (let r = 0; r < s.length; r++)
        s[r].getChildrenByLabel(i, !0, e);
    return e;
  }
}, Mi = new U();
class Ot {
  constructor(t = 1 / 0, e = 1 / 0, s = -1 / 0, r = -1 / 0) {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = Mi, this.minX = t, this.minY = e, this.maxX = s, this.maxY = r;
  }
  /**
   * Checks if bounds are empty.
   * @returns - True if empty.
   */
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
  /** The bounding rectangle of the bounds. */
  get rectangle() {
    this._rectangle || (this._rectangle = new et());
    const t = this._rectangle;
    return this.minX > this.maxX || this.minY > this.maxY ? (t.x = 0, t.y = 0, t.width = 0, t.height = 0) : t.copyFromBounds(this), t;
  }
  /** Clears the bounds and resets. */
  clear() {
    return this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = Mi, this;
  }
  /**
   * Sets the bounds.
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */
  set(t, e, s, r) {
    this.minX = t, this.minY = e, this.maxX = s, this.maxY = r;
  }
  /**
   * Adds sprite frame
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   * @param matrix
   */
  addFrame(t, e, s, r, n) {
    n || (n = this.matrix);
    const a = n.a, o = n.b, h = n.c, l = n.d, c = n.tx, u = n.ty;
    let d = this.minX, m = this.minY, f = this.maxX, A = this.maxY, g = a * t + h * e + c, y = o * t + l * e + u;
    g < d && (d = g), y < m && (m = y), g > f && (f = g), y > A && (A = y), g = a * s + h * e + c, y = o * s + l * e + u, g < d && (d = g), y < m && (m = y), g > f && (f = g), y > A && (A = y), g = a * t + h * r + c, y = o * t + l * r + u, g < d && (d = g), y < m && (m = y), g > f && (f = g), y > A && (A = y), g = a * s + h * r + c, y = o * s + l * r + u, g < d && (d = g), y < m && (m = y), g > f && (f = g), y > A && (A = y), this.minX = d, this.minY = m, this.maxX = f, this.maxY = A;
  }
  /**
   * Adds a rectangle to the bounds.
   * @param rect - The rectangle to be added.
   * @param matrix - The matrix to apply to the bounds.
   */
  addRect(t, e) {
    this.addFrame(t.x, t.y, t.x + t.width, t.y + t.height, e);
  }
  /**
   * Adds other {@link Bounds}.
   * @param bounds - The Bounds to be added
   * @param matrix
   */
  addBounds(t, e) {
    this.addFrame(t.minX, t.minY, t.maxX, t.maxY, e);
  }
  /**
   * Adds other Bounds, masked with Bounds.
   * @param mask - The Bounds to be added.
   */
  addBoundsMask(t) {
    this.minX = this.minX > t.minX ? this.minX : t.minX, this.minY = this.minY > t.minY ? this.minY : t.minY, this.maxX = this.maxX < t.maxX ? this.maxX : t.maxX, this.maxY = this.maxY < t.maxY ? this.maxY : t.maxY;
  }
  /**
   * Adds other Bounds, multiplied with matrix.
   * @param matrix - The matrix to apply to the bounds.
   */
  applyMatrix(t) {
    const e = this.minX, s = this.minY, r = this.maxX, n = this.maxY, { a, b: o, c: h, d: l, tx: c, ty: u } = t;
    let d = a * e + h * s + c, m = o * e + l * s + u;
    this.minX = d, this.minY = m, this.maxX = d, this.maxY = m, d = a * r + h * s + c, m = o * r + l * s + u, this.minX = d < this.minX ? d : this.minX, this.minY = m < this.minY ? m : this.minY, this.maxX = d > this.maxX ? d : this.maxX, this.maxY = m > this.maxY ? m : this.maxY, d = a * e + h * n + c, m = o * e + l * n + u, this.minX = d < this.minX ? d : this.minX, this.minY = m < this.minY ? m : this.minY, this.maxX = d > this.maxX ? d : this.maxX, this.maxY = m > this.maxY ? m : this.maxY, d = a * r + h * n + c, m = o * r + l * n + u, this.minX = d < this.minX ? d : this.minX, this.minY = m < this.minY ? m : this.minY, this.maxX = d > this.maxX ? d : this.maxX, this.maxY = m > this.maxY ? m : this.maxY;
  }
  /**
   * Resizes the bounds object to include the given rectangle.
   * @param rect - The rectangle to be included.
   */
  fit(t) {
    return this.minX < t.left && (this.minX = t.left), this.maxX > t.right && (this.maxX = t.right), this.minY < t.top && (this.minY = t.top), this.maxY > t.bottom && (this.maxY = t.bottom), this;
  }
  /**
   * Pads bounds object, making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   */
  pad(t, e = t) {
    return this.minX -= t, this.maxX += t, this.minY -= e, this.maxY += e, this;
  }
  /** Ceils the bounds. */
  ceil() {
    return this.minX = Math.floor(this.minX), this.minY = Math.floor(this.minY), this.maxX = Math.ceil(this.maxX), this.maxY = Math.ceil(this.maxY), this;
  }
  /** Clones the bounds. */
  clone() {
    return new Ot(this.minX, this.minY, this.maxX, this.maxY);
  }
  /**
   * Scales the bounds by the given values
   * @param x - The X value to scale by.
   * @param y - The Y value to scale by.
   */
  scale(t, e = t) {
    return this.minX *= t, this.minY *= e, this.maxX *= t, this.maxY *= e, this;
  }
  /** the x value of the bounds. */
  get x() {
    return this.minX;
  }
  set x(t) {
    const e = this.maxX - this.minX;
    this.minX = t, this.maxX = t + e;
  }
  /** the y value of the bounds. */
  get y() {
    return this.minY;
  }
  set y(t) {
    const e = this.maxY - this.minY;
    this.minY = t, this.maxY = t + e;
  }
  /** the width value of the bounds. */
  get width() {
    return this.maxX - this.minX;
  }
  set width(t) {
    this.maxX = this.minX + t;
  }
  /** the height value of the bounds. */
  get height() {
    return this.maxY - this.minY;
  }
  set height(t) {
    this.maxY = this.minY + t;
  }
  /** the left value of the bounds. */
  get left() {
    return this.minX;
  }
  /** the right value of the bounds. */
  get right() {
    return this.maxX;
  }
  /** the top value of the bounds. */
  get top() {
    return this.minY;
  }
  /** the bottom value of the bounds. */
  get bottom() {
    return this.maxY;
  }
  /** Is the bounds positive. */
  get isPositive() {
    return this.maxX - this.minX > 0 && this.maxY - this.minY > 0;
  }
  get isValid() {
    return this.minX + this.minY !== 1 / 0;
  }
  /**
   * Adds screen vertices from array
   * @param vertexData - calculated vertices
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   * @param matrix
   */
  addVertexData(t, e, s, r) {
    let n = this.minX, a = this.minY, o = this.maxX, h = this.maxY;
    r || (r = this.matrix);
    const l = r.a, c = r.b, u = r.c, d = r.d, m = r.tx, f = r.ty;
    for (let A = e; A < s; A += 2) {
      const g = t[A], y = t[A + 1], E = l * g + u * y + m, x = c * g + d * y + f;
      n = E < n ? E : n, a = x < a ? x : a, o = E > o ? E : o, h = x > h ? x : h;
    }
    this.minX = n, this.minY = a, this.maxX = o, this.maxY = h;
  }
  /**
   * Checks if the point is contained within the bounds.
   * @param x - x coordinate
   * @param y - y coordinate
   */
  containsPoint(t, e) {
    return this.minX <= t && this.minY <= e && this.maxX >= t && this.maxY >= e;
  }
  toString() {
    return `[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`;
  }
}
const wt = new Zs(U), le = new Zs(Ot);
function _r(i, t, e) {
  e.clear();
  let s, r;
  return i.parent ? t ? s = i.parent.worldTransform : (r = wt.get().identity(), s = ns(i, r)) : s = U.IDENTITY, Nr(i, e, s, t), r && wt.return(r), e.isValid || e.set(0, 0, 0, 0), e;
}
function Nr(i, t, e, s) {
  var o, h;
  if (!i.visible || !i.measurable)
    return;
  let r;
  s ? r = i.worldTransform : (i.updateLocalTransform(), r = wt.get(), r.appendFrom(i.localTransform, e));
  const n = t, a = !!i.effects.length;
  if (a && (t = le.get().clear()), i.boundsArea)
    t.addRect(i.boundsArea, r);
  else {
    i.addBounds && (t.matrix = r, i.addBounds(t));
    for (let l = 0; l < i.children.length; l++)
      Nr(i.children[l], t, r, s);
  }
  if (a) {
    for (let l = 0; l < i.effects.length; l++)
      (h = (o = i.effects[l]).addBounds) == null || h.call(o, t);
    n.addBounds(t, U.IDENTITY), le.return(t);
  }
  s || wt.return(r);
}
function ns(i, t) {
  const e = i.parent;
  return e && (ns(e, t), e.updateLocalTransform(), t.append(e.localTransform)), t;
}
function Ir(i, t, e) {
  return t.clear(), e || (e = U.IDENTITY), Cr(i, t, e, i, !0), t.isValid || t.set(0, 0, 0, 0), t;
}
function Cr(i, t, e, s, r) {
  var h, l;
  let n;
  if (r)
    n = wt.get(), n = e.copyTo(n);
  else {
    if (!i.visible || !i.measurable)
      return;
    i.updateLocalTransform();
    const c = i.localTransform;
    n = wt.get(), n.appendFrom(c, e);
  }
  const a = t, o = !!i.effects.length;
  if (o && (t = le.get().clear()), i.boundsArea)
    t.addRect(i.boundsArea, n);
  else {
    i.renderPipeId && (t.matrix = n, i.addBounds(t));
    const c = i.children;
    for (let u = 0; u < c.length; u++)
      Cr(c[u], t, n, s, !1);
  }
  if (o) {
    for (let c = 0; c < i.effects.length; c++)
      (l = (h = i.effects[c]).addLocalBounds) == null || l.call(h, t, s);
    a.addBounds(t, U.IDENTITY), le.return(t);
  }
  wt.return(n);
}
function Mr(i, t) {
  const e = i.children;
  for (let s = 0; s < e.length; s++) {
    const r = e[s], n = (r.uid & 255) << 24 | r._didChangeId & 16777215;
    t.data[t.index] !== n && (t.data[t.index] = n, t.didChange = !0), t.index++, r.children.length && Mr(r, t);
  }
  return t.didChange;
}
const ra = new U(), na = {
  _localBoundsCacheId: -1,
  _localBoundsCacheData: null,
  _setWidth(i, t) {
    const e = Math.sign(this.scale.x) || 1;
    t !== 0 ? this.scale.x = i / t * e : this.scale.x = e;
  },
  _setHeight(i, t) {
    const e = Math.sign(this.scale.y) || 1;
    t !== 0 ? this.scale.y = i / t * e : this.scale.y = e;
  },
  /**
   * Retrieves the local bounds of the container as a Bounds object.
   * @returns - The bounding area.
   * @memberof scene.Container#
   */
  getLocalBounds() {
    this._localBoundsCacheData || (this._localBoundsCacheData = {
      data: [],
      index: 1,
      didChange: !1,
      localBounds: new Ot()
    });
    const i = this._localBoundsCacheData;
    return i.index = 1, i.didChange = !1, i.data[0] !== this._didChangeId >> 12 && (i.didChange = !0, i.data[0] = this._didChangeId >> 12), Mr(this, i), i.didChange && Ir(this, i.localBounds, ra), i.localBounds;
  },
  /**
   * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link Rectangle}.
   * @param skipUpdate - Setting to `true` will stop the transforms of the scene graph from
   *  being updated. This means the calculation returned MAY be out of date BUT will give you a
   *  nice performance boost.
   * @param bounds - Optional bounds to store the result of the bounds calculation.
   * @returns - The minimum axis-aligned rectangle in world space that fits around this object.
   * @memberof scene.Container#
   */
  getBounds(i, t) {
    return _r(this, i, t || new Ot());
  }
}, aa = {
  _onRender: null,
  set onRender(i) {
    const t = this.renderGroup;
    if (!i) {
      this._onRender && (t == null || t.removeOnRender(this)), this._onRender = null;
      return;
    }
    this._onRender || t == null || t.addOnRender(this), this._onRender = i;
  },
  /**
   * This callback is used when the container is rendered. This is where you should add your custom
   * logic that is needed to be run every frame.
   *
   * In v7 many users used `updateTransform` for this, however the way v8 renders objects is different
   * and "updateTransform" is no longer called every frame
   * @example
   * const container = new Container();
   * container.onRender = () => {
   *    container.rotation += 0.01;
   * };
   * @memberof scene.Container#
   */
  get onRender() {
    return this._onRender;
  }
}, oa = {
  _zIndex: 0,
  /**
   * Should children be sorted by zIndex at the next render call.
   *
   * Will get automatically set to true if a new child is added, or if a child's zIndex changes.
   * @type {boolean}
   * @memberof scene.Container#
   */
  sortDirty: !1,
  /**
   * If set to true, the container will sort its children by `zIndex` value
   * when the next render is called, or manually if `sortChildren()` is called.
   *
   * This actually changes the order of elements in the array, so should be treated
   * as a basic solution that is not performant compared to other solutions,
   * such as {@link https://github.com/pixijs/layers PixiJS Layers}
   *
   * Also be aware of that this may not work nicely with the `addChildAt()` function,
   * as the `zIndex` sorting may cause the child to automatically sorted to another position.
   * @type {boolean}
   * @memberof scene.Container#
   */
  sortableChildren: !1,
  /**
   * The zIndex of the container.
   *
   * Setting this value, will automatically set the parent to be sortable. Children will be automatically
   * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
   * and thus rendered on top of other display objects within the same container.
   * @see scene.Container#sortableChildren
   * @memberof scene.Container#
   */
  get zIndex() {
    return this._zIndex;
  },
  set zIndex(i) {
    this._zIndex !== i && (this._zIndex = i, this.depthOfChildModified());
  },
  depthOfChildModified() {
    this.parent && (this.parent.sortableChildren = !0, this.parent.sortDirty = !0), this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0);
  },
  /**
   * Sorts children by zIndex.
   * @memberof scene.Container#
   */
  sortChildren() {
    this.sortDirty && (this.sortDirty = !1, this.children.sort(ha));
  }
};
function ha(i, t) {
  return i._zIndex - t._zIndex;
}
const ca = {
  /**
   * Returns the global position of the container.
   * @param point - The optional point to write the global value to.
   * @param skipUpdate - Should we skip the update transform.
   * @returns - The updated point.
   * @memberof scene.Container#
   */
  getGlobalPosition(i = new rt(), t = !1) {
    return this.parent ? this.parent.toGlobal(this._position, i, t) : (i.x = this._position.x, i.y = this._position.y), i;
  },
  /**
   * Calculates the global position of the container.
   * @param position - The world origin to calculate from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform.
   * @returns - A point object representing the position of this object.
   * @memberof scene.Container#
   */
  toGlobal(i, t, e = !1) {
    if (!e) {
      this.updateLocalTransform();
      const s = ns(this, new U());
      return s.append(this.localTransform), s.apply(i, t);
    }
    return this.worldTransform.apply(i, t);
  },
  /**
   * Calculates the local position of the container relative to another point.
   * @param position - The world origin to calculate from.
   * @param from - The Container to calculate the global position from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform
   * @returns - A point object representing the position of this object
   * @memberof scene.Container#
   */
  toLocal(i, t, e, s) {
    if (t && (i = t.toGlobal(i, e, s)), !s) {
      this.updateLocalTransform();
      const r = ns(this, new U());
      return r.append(this.localTransform), r.applyInverse(i, e);
    }
    return this.worldTransform.applyInverse(i, e);
  }
};
class Lr {
  constructor() {
    this.uid = nt("instructionSet"), this.instructions = [], this.instructionSize = 0;
  }
  /** reset the instruction set so it can be reused set size back to 0 */
  reset() {
    this.instructionSize = 0;
  }
  /**
   * Add an instruction to the set
   * @param instruction - add an instruction to the set
   */
  add(t) {
    this.instructions[this.instructionSize++] = t;
  }
  /**
   * Log the instructions to the console (for debugging)
   * @internal
   * @ignore
   */
  log() {
    this.instructions.length = this.instructionSize, console.table(this.instructions, ["type", "action"]);
  }
}
class la {
  constructor(t) {
    this.renderPipeId = "renderGroup", this.root = null, this.canBundle = !1, this.renderGroupParent = null, this.renderGroupChildren = [], this._children = [], this.worldTransform = new U(), this.worldColorAlpha = 4294967295, this.worldColor = 16777215, this.worldAlpha = 1, this.childrenToUpdate = /* @__PURE__ */ Object.create(null), this.updateTick = 0, this.childrenRenderablesToUpdate = { list: [], index: 0 }, this.structureDidChange = !0, this.instructionSet = new Lr(), this._onRenderContainers = [], this.root = t, this.addChild(t);
  }
  get localTransform() {
    return this.root.localTransform;
  }
  addRenderGroupChild(t) {
    t.renderGroupParent && t.renderGroupParent._removeRenderGroupChild(t), t.renderGroupParent = this, this.onChildUpdate(t.root), this.renderGroupChildren.push(t);
  }
  _removeRenderGroupChild(t) {
    t.root.didChange && this._removeChildFromUpdate(t.root);
    const e = this.renderGroupChildren.indexOf(t);
    e > -1 && this.renderGroupChildren.splice(e, 1), t.renderGroupParent = null;
  }
  addChild(t) {
    if (this.structureDidChange = !0, t !== this.root && (this._children.push(t), t.updateTick = -1, t.parent === this.root ? t.relativeRenderGroupDepth = 1 : t.relativeRenderGroupDepth = t.parent.relativeRenderGroupDepth + 1, t._onRender && this.addOnRender(t)), t.renderGroup) {
      if (t.renderGroup.root === t) {
        this.addRenderGroupChild(t.renderGroup);
        return;
      }
    } else
      t.renderGroup = this, t.didChange = !0;
    const e = t.children;
    t.isRenderGroupRoot || this.onChildUpdate(t);
    for (let s = 0; s < e.length; s++)
      this.addChild(e[s]);
  }
  removeChild(t) {
    if (this.structureDidChange = !0, t._onRender && this.removeOnRender(t), t.renderGroup.root !== t) {
      const s = t.children;
      for (let r = 0; r < s.length; r++)
        this.removeChild(s[r]);
      t.didChange && t.renderGroup._removeChildFromUpdate(t), t.renderGroup = null;
    } else
      this._removeRenderGroupChild(t.renderGroup);
    const e = this._children.indexOf(t);
    e > -1 && this._children.splice(e, 1);
  }
  onChildUpdate(t) {
    let e = this.childrenToUpdate[t.relativeRenderGroupDepth];
    e || (e = this.childrenToUpdate[t.relativeRenderGroupDepth] = {
      index: 0,
      list: []
    }), e.list[e.index++] = t;
  }
  // SHOULD THIS BE HERE?
  updateRenderable(t) {
    t.globalDisplayStatus < 7 || (t.didViewUpdate = !1, this.instructionSet.renderPipes[t.renderPipeId].updateRenderable(t));
  }
  onChildViewUpdate(t) {
    this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++] = t;
  }
  _removeChildFromUpdate(t) {
    const e = this.childrenToUpdate[t.relativeRenderGroupDepth];
    if (!e)
      return;
    const s = e.list.indexOf(t);
    s > -1 && e.list.splice(s, 1), e.index--;
  }
  get isRenderable() {
    return this.root.localDisplayStatus === 7 && this.worldAlpha > 0;
  }
  /**
   * adding a container to the onRender list will make sure the user function
   * passed in to the user defined 'onRender` callBack
   * @param container - the container to add to the onRender list
   */
  addOnRender(t) {
    this._onRenderContainers.push(t);
  }
  removeOnRender(t) {
    this._onRenderContainers.splice(this._onRenderContainers.indexOf(t), 1);
  }
  runOnRender() {
    for (let t = 0; t < this._onRenderContainers.length; t++)
      this._onRenderContainers[t]._onRender();
  }
}
function ua(i, t, e = {}) {
  for (const s in t)
    !e[s] && t[s] !== void 0 && (i[s] = t[s]);
}
const Es = new mt(null), ys = new mt(null), xs = new mt(null, 1, 1), Li = 1, da = 2, Ss = 4;
class ot extends te {
  constructor(t = {}) {
    var e, s;
    super(), this.uid = nt("renderable"), this._updateFlags = 15, this.isRenderGroupRoot = !1, this.renderGroup = null, this.didChange = !1, this.didViewUpdate = !1, this.relativeRenderGroupDepth = 0, this.children = [], this.parent = null, this.includeInBuild = !0, this.measurable = !0, this.isSimple = !0, this.updateTick = -1, this.localTransform = new U(), this.relativeGroupTransform = new U(), this.groupTransform = this.relativeGroupTransform, this.destroyed = !1, this._position = new mt(this, 0, 0), this._scale = xs, this._pivot = ys, this._skew = Es, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._rotation = 0, this.localColor = 16777215, this.localAlpha = 1, this.groupAlpha = 1, this.groupColor = 16777215, this.groupColorAlpha = 4294967295, this.localBlendMode = "inherit", this.groupBlendMode = "normal", this.localDisplayStatus = 7, this.globalDisplayStatus = 7, this._didChangeId = 0, this._didLocalTransformChangeId = -1, ua(this, t, {
      children: !0,
      parent: !0,
      effects: !0
    }), (e = t.children) == null || e.forEach((r) => this.addChild(r)), this.effects = [], (s = t.parent) == null || s.addChild(this);
  }
  /**
   * Mixes all enumerable properties and methods from a source object to Container.
   * @param source - The source of properties and methods to mix in.
   */
  static mixin(t) {
    Object.defineProperties(ot.prototype, Object.getOwnPropertyDescriptors(t));
  }
  /**
   * Adds one or more children to the container.
   *
   * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
   * @param {...Container} children - The Container(s) to add to the container
   * @returns {Container} - The first child that was added.
   */
  addChild(...t) {
    if (this.allowChildren || It(Nt, "addChild: Only Containers will be allowed to add children in v8.0.0"), t.length > 1) {
      for (let s = 0; s < t.length; s++)
        this.addChild(t[s]);
      return t[0];
    }
    const e = t[0];
    return e.parent === this ? (this.children.splice(this.children.indexOf(e), 1), this.children.push(e), this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), e) : (e.parent && e.parent.removeChild(e), this.children.push(e), this.sortableChildren && (this.sortDirty = !0), e.parent = this, e.didChange = !0, e.didViewUpdate = !1, e._updateFlags = 15, this.renderGroup && this.renderGroup.addChild(e), this.emit("childAdded", e, this, this.children.length - 1), e.emit("added", this), e._zIndex !== 0 && e.depthOfChildModified(), e);
  }
  /**
   * Removes one or more children from the container.
   * @param {...Container} children - The Container(s) to remove
   * @returns {Container} The first child that was removed.
   */
  removeChild(...t) {
    if (t.length > 1) {
      for (let r = 0; r < t.length; r++)
        this.removeChild(t[r]);
      return t[0];
    }
    const e = t[0], s = this.children.indexOf(e);
    return s > -1 && (this.children.splice(s, 1), this.renderGroup && this.renderGroup.removeChild(e)), e.parent = null, this.emit("childRemoved", e, this, s), e.emit("removed", this), e;
  }
  /** @ignore */
  _onUpdate(t) {
    if (t && t === this._skew && this._updateSkew(), this._didChangeId++, !this.didChange)
      if (this.didChange = !0, this.isRenderGroupRoot) {
        const e = this.renderGroup.renderGroupParent;
        e && e.onChildUpdate(this);
      } else
        this.renderGroup && this.renderGroup.onChildUpdate(this);
  }
  set isRenderGroup(t) {
    if (this.isRenderGroupRoot && t === !1)
      throw new Error("[Pixi] cannot undo a render group just yet");
    t && this.enableRenderGroup();
  }
  /**
   * Returns true if this container is a render group.
   * This means that it will be rendered as a separate pass, with its own set of instructions
   */
  get isRenderGroup() {
    return this.isRenderGroupRoot;
  }
  /** This enables the container to be rendered as a render group. */
  enableRenderGroup() {
    if (this.renderGroup && this.renderGroup.root === this)
      return;
    this.isRenderGroupRoot = !0;
    const t = this.renderGroup;
    if (t && t.removeChild(this), this.renderGroup = new la(this), t) {
      for (let e = 0; e < t.renderGroupChildren.length; e++) {
        const s = t.renderGroupChildren[e];
        let r = s.root;
        for (; r; ) {
          if (r === this) {
            this.renderGroup.addRenderGroupChild(s);
            break;
          }
          r = r.parent;
        }
      }
      t.addRenderGroupChild(this.renderGroup);
    }
    this._updateIsSimple(), this.groupTransform = U.IDENTITY;
  }
  /** @ignore */
  _updateIsSimple() {
    this.isSimple = !this.isRenderGroupRoot && this.effects.length === 0;
  }
  /**
   * Current transform of the object based on world (parent) factors.
   * @readonly
   */
  get worldTransform() {
    return this._worldTransform || (this._worldTransform = new U()), this.renderGroup && (this.isRenderGroupRoot ? this._worldTransform.copyFrom(this.renderGroup.worldTransform) : this._worldTransform.appendFrom(this.relativeGroupTransform, this.renderGroup.worldTransform)), this._worldTransform;
  }
  // / ////// transform related stuff
  /**
   * The position of the container on the x axis relative to the local coordinates of the parent.
   * An alias to position.x
   */
  get x() {
    return this._position.x;
  }
  set x(t) {
    this._position.x = t;
  }
  /**
   * The position of the container on the y axis relative to the local coordinates of the parent.
   * An alias to position.y
   */
  get y() {
    return this._position.y;
  }
  set y(t) {
    this._position.y = t;
  }
  /**
   * The coordinate of the object relative to the local coordinates of the parent.
   * @since 4.0.0
   */
  get position() {
    return this._position;
  }
  set position(t) {
    this._position.copyFrom(t);
  }
  /**
   * The rotation of the object in radians.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get rotation() {
    return this._rotation;
  }
  set rotation(t) {
    this._rotation !== t && (this._rotation = t, this._onUpdate(this._skew));
  }
  /**
   * The angle of the object in degrees.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get angle() {
    return this.rotation * In;
  }
  set angle(t) {
    this.rotation = t * Cn;
  }
  /**
   * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
   * is the projection of `pivot` in the parent's local space.
   *
   * By default, the pivot is the origin (0, 0).
   * @since 4.0.0
   */
  get pivot() {
    return this._pivot === ys && (this._pivot = new mt(this, 0, 0)), this._pivot;
  }
  set pivot(t) {
    this._pivot === ys && (this._pivot = new mt(this, 0, 0)), typeof t == "number" ? this._pivot.set(t) : this._pivot.copyFrom(t);
  }
  /**
   * The skew factor for the object in radians.
   * @since 4.0.0
   */
  get skew() {
    return this._skew === Es && (this._skew = new mt(this, 0, 0)), this._skew;
  }
  set skew(t) {
    this._skew === Es && (this._skew = new mt(this, 0, 0)), this._skew.copyFrom(t);
  }
  /**
   * The scale factors of this object along the local coordinate axes.
   *
   * The default scale is (1, 1).
   * @since 4.0.0
   */
  get scale() {
    return this._scale === xs && (this._scale = new mt(this, 1, 1)), this._scale;
  }
  set scale(t) {
    this._scale === xs && (this._scale = new mt(this, 0, 0)), typeof t == "number" ? this._scale.set(t) : this._scale.copyFrom(t);
  }
  /**
   * The width of the Container, setting this will actually modify the scale to achieve the value set.
   * @memberof scene.Container#
   */
  get width() {
    return Math.abs(this.scale.x * this.getLocalBounds().width);
  }
  set width(t) {
    const e = this.getLocalBounds().width;
    this._setWidth(t, e);
  }
  /**
   * The height of the Container, setting this will actually modify the scale to achieve the value set.
   * @memberof scene.Container#
   */
  get height() {
    return Math.abs(this.scale.y * this.getLocalBounds().height);
  }
  set height(t) {
    const e = this.getLocalBounds().height;
    this._setHeight(t, e);
  }
  /**
   * Retrieves the size of the container as a [Size]{@link Size} object.
   * This is faster than get the width and height separately.
   * @param out - Optional object to store the size in.
   * @returns - The size of the container.
   * @memberof scene.Container#
   */
  getSize(t) {
    t || (t = {});
    const e = this.getLocalBounds();
    return t.width = Math.abs(this.scale.x * e.width), t.height = Math.abs(this.scale.y * e.height), t;
  }
  /**
   * Sets the size of the container to the specified width and height.
   * This is faster than setting the width and height separately.
   * @param value - This can be either a number or a [Size]{@link Size} object.
   * @param height - The height to set. Defaults to the value of `width` if not provided.
   * @memberof scene.Container#
   */
  setSize(t, e) {
    const s = this.getLocalBounds();
    let r, n;
    typeof t != "object" ? (r = t, n = e ?? t) : (r = t.width, n = t.height ?? t.width), r !== void 0 && this._setWidth(r, s.width), n !== void 0 && this._setHeight(n, s.height);
  }
  /** Called when the skew or the rotation changes. */
  _updateSkew() {
    const t = this._rotation, e = this._skew;
    this._cx = Math.cos(t + e._y), this._sx = Math.sin(t + e._y), this._cy = -Math.sin(t - e._x), this._sy = Math.cos(t - e._x);
  }
  /**
   * Updates the transform properties of the container (accepts partial values).
   * @param {object} opts - The options for updating the transform.
   * @param {number} opts.x - The x position of the container.
   * @param {number} opts.y - The y position of the container.
   * @param {number} opts.scaleX - The scale factor on the x-axis.
   * @param {number} opts.scaleY - The scale factor on the y-axis.
   * @param {number} opts.rotation - The rotation of the container, in radians.
   * @param {number} opts.skewX - The skew factor on the x-axis.
   * @param {number} opts.skewY - The skew factor on the y-axis.
   * @param {number} opts.pivotX - The x coordinate of the pivot point.
   * @param {number} opts.pivotY - The y coordinate of the pivot point.
   */
  updateTransform(t) {
    return this.position.set(
      typeof t.x == "number" ? t.x : this.position.x,
      typeof t.y == "number" ? t.y : this.position.y
    ), this.scale.set(
      typeof t.scaleX == "number" ? t.scaleX || 1 : this.scale.x,
      typeof t.scaleY == "number" ? t.scaleY || 1 : this.scale.y
    ), this.rotation = typeof t.rotation == "number" ? t.rotation : this.rotation, this.skew.set(
      typeof t.skewX == "number" ? t.skewX : this.skew.x,
      typeof t.skewY == "number" ? t.skewY : this.skew.y
    ), this.pivot.set(
      typeof t.pivotX == "number" ? t.pivotX : this.pivot.x,
      typeof t.pivotY == "number" ? t.pivotY : this.pivot.y
    ), this;
  }
  /**
   * Updates the local transform using the given matrix.
   * @param matrix - The matrix to use for updating the transform.
   */
  setFromMatrix(t) {
    t.decompose(this);
  }
  /** Updates the local transform. */
  updateLocalTransform() {
    if ((this._didLocalTransformChangeId & 15) === this._didChangeId)
      return;
    this._didLocalTransformChangeId = this._didChangeId;
    const t = this.localTransform, e = this._scale, s = this._pivot, r = this._position, n = e._x, a = e._y, o = s._x, h = s._y;
    t.a = this._cx * n, t.b = this._sx * n, t.c = this._cy * a, t.d = this._sy * a, t.tx = r._x - (o * t.a + h * t.c), t.ty = r._y - (o * t.b + h * t.d);
  }
  // / ///// color related stuff
  set alpha(t) {
    t !== this.localAlpha && (this.localAlpha = t, this._updateFlags |= Li, this._onUpdate());
  }
  /** The opacity of the object. */
  get alpha() {
    return this.localAlpha;
  }
  set tint(t) {
    const s = gt.shared.setValue(t ?? 16777215).toBgrNumber();
    s !== this.localColor && (this.localColor = s, this._updateFlags |= Li, this._onUpdate());
  }
  /**
   * The tint applied to the sprite. This is a hex value.
   *
   * A value of 0xFFFFFF will remove any tint effect.
   * @default 0xFFFFFF
   */
  get tint() {
    const t = this.localColor;
    return ((t & 255) << 16) + (t & 65280) + (t >> 16 & 255);
  }
  // / //////////////// blend related stuff
  set blendMode(t) {
    this.localBlendMode !== t && (this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), this._updateFlags |= da, this.localBlendMode = t, this._onUpdate());
  }
  /**
   * The blend mode to be applied to the sprite. Apply a value of `'normal'` to reset the blend mode.
   * @default 'normal'
   */
  get blendMode() {
    return this.localBlendMode;
  }
  // / ///////// VISIBILITY / RENDERABLE /////////////////
  /** The visibility of the object. If false the object will not be drawn, and the transform will not be updated. */
  get visible() {
    return !!(this.localDisplayStatus & 2);
  }
  set visible(t) {
    const e = t ? 1 : 0;
    (this.localDisplayStatus & 2) >> 1 !== e && (this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), this._updateFlags |= Ss, this.localDisplayStatus ^= 2, this._onUpdate());
  }
  /** @ignore */
  get culled() {
    return !(this.localDisplayStatus & 4);
  }
  /** @ignore */
  set culled(t) {
    const e = t ? 1 : 0;
    (this.localDisplayStatus & 4) >> 2 !== e && (this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), this._updateFlags |= Ss, this.localDisplayStatus ^= 4, this._onUpdate());
  }
  /** Can this object be rendered, if false the object will not be drawn but the transform will still be updated. */
  get renderable() {
    return !!(this.localDisplayStatus & 1);
  }
  set renderable(t) {
    const e = t ? 1 : 0;
    (this.localDisplayStatus & 1) !== e && (this._updateFlags |= Ss, this.localDisplayStatus ^= 1, this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), this._onUpdate());
  }
  /** Whether or not the object should be rendered. */
  get isRenderable() {
    return this.localDisplayStatus === 7 && this.groupAlpha > 0;
  }
  /**
   * Removes all internal references and listeners as well as removes children from the display list.
   * Do not use a Container after calling `destroy`.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for children with textures e.g. Sprites. If options.children
   * is set to true it should destroy the texture of the child sprite
   * @param {boolean} [options.textureSource=false] - Only used for children with textures e.g. Sprites.
   * If options.children is set to true it should destroy the texture source of the child sprite
   * @param {boolean} [options.context=false] - Only used for children with graphicsContexts e.g. Graphics.
   * If options.children is set to true it should destroy the context of the child graphics
   */
  destroy(t = !1) {
    if (this.destroyed)
      return;
    this.destroyed = !0, this.removeFromParent(), this.parent = null, this._mask = null, this._filters = null, this.effects = null, this._position = null, this._scale = null, this._pivot = null, this._skew = null, this.emit("destroyed", this), this.removeAllListeners();
    const e = typeof t == "boolean" ? t : t == null ? void 0 : t.children, s = this.removeChildren(0, this.children.length);
    if (e)
      for (let r = 0; r < s.length; ++r)
        s[r].destroy(t);
  }
}
ot.mixin(qn);
ot.mixin(ca);
ot.mixin(aa);
ot.mixin(na);
ot.mixin(sa);
ot.mixin(ia);
ot.mixin(oa);
ot.mixin(Qn);
class ue extends ot {
  /**
   * @param options - The options for creating the sprite.
   */
  constructor(t = H.EMPTY) {
    t instanceof H && (t = { texture: t });
    const { texture: e, anchor: s, roundPixels: r, width: n, height: a, ...o } = t;
    super({
      label: "Sprite",
      ...o
    }), this.renderPipeId = "sprite", this.batched = !0, this._didSpriteUpdate = !1, this._bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, this._sourceBounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, this._boundsDirty = !0, this._sourceBoundsDirty = !0, this._roundPixels = 0, this._anchor = new mt(
      {
        _onUpdate: () => {
          this.onViewUpdate();
        }
      }
    ), s && (this.anchor = s), this.texture = e, this.allowChildren = !1, this.roundPixels = r ?? !1, n && (this.width = n), a && (this.height = a);
  }
  /**
   * Helper function that creates a new sprite based on the source you provide.
   * The source can be - frame id, image, video, canvas element, video element, texture
   * @param source - Source to create texture from
   * @param [skipCache] - Whether to skip the cache or not
   * @returns The newly created sprite
   */
  static from(t, e = !1) {
    return t instanceof H ? new ue(t) : new ue(H.from(t, e));
  }
  set texture(t) {
    t || (t = H.EMPTY), this._texture !== t && (this._texture = t, this.onViewUpdate());
  }
  /** The texture that the sprite is using. */
  get texture() {
    return this._texture;
  }
  /**
   * The local bounds of the sprite.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._boundsDirty && (this._updateBounds(), this._boundsDirty = !1), this._bounds;
  }
  /**
   * The bounds of the sprite, taking the texture's trim into account.
   * @type {rendering.Bounds}
   */
  get sourceBounds() {
    return this._sourceBoundsDirty && (this._updateSourceBounds(), this._sourceBoundsDirty = !1), this._sourceBounds;
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(t) {
    const e = this.sourceBounds;
    return t.x >= e.maxX && t.x <= e.minX && t.y >= e.maxY && t.y <= e.minY;
  }
  /**
   * Adds the bounds of this object to the bounds object.
   * @param bounds - The output bounds object.
   */
  addBounds(t) {
    const e = this._texture.trim ? this.sourceBounds : this.bounds;
    t.addFrame(e.minX, e.minY, e.maxX, e.maxY);
  }
  onViewUpdate() {
    this._didChangeId += 4096, this._didSpriteUpdate = !0, this._sourceBoundsDirty = this._boundsDirty = !0, !this.didViewUpdate && (this.didViewUpdate = !0, this.renderGroup && this.renderGroup.onChildViewUpdate(this));
  }
  _updateBounds() {
    kn(this._bounds, this._anchor, this._texture, 0);
  }
  _updateSourceBounds() {
    const t = this._anchor, e = this._texture, s = this._sourceBounds, { width: r, height: n } = e.orig;
    s.maxX = -t._x * r, s.minX = s.maxX + r, s.maxY = -t._y * n, s.minY = s.maxY + n;
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(t = !1) {
    if (super.destroy(t), typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
      const s = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
      this._texture.destroy(s);
    }
    this._texture = null, this._bounds = null, this._sourceBounds = null, this._anchor = null;
  }
  /**
   * The anchor sets the origin point of the sprite. The default value is taken from the {@link Texture}
   * and passed to the constructor.
   *
   * The default is `(0,0)`, this means the sprite's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
   *
   * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite({texture: Texture.WHITE});
   * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
   */
  get anchor() {
    return this._anchor;
  }
  set anchor(t) {
    typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t);
  }
  /**
   *  Whether or not to round the x/y position of the sprite.
   * @type {boolean}
   */
  get roundPixels() {
    return !!this._roundPixels;
  }
  set roundPixels(t) {
    this._roundPixels = t ? 1 : 0;
  }
  /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
  get width() {
    return Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(t) {
    this._setWidth(t, this._texture.orig.width);
  }
  /** The height of the sprite, setting this will actually modify the scale to achieve the value set. */
  get height() {
    return Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(t) {
    this._setHeight(t, this._texture.orig.height);
  }
  /**
   * Retrieves the size of the Sprite as a [Size]{@link Size} object.
   * This is faster than get the width and height separately.
   * @param out - Optional object to store the size in.
   * @returns - The size of the Sprite.
   */
  getSize(t) {
    return t || (t = {}), t.width = Math.abs(this.scale.x) * this._texture.orig.width, t.height = Math.abs(this.scale.y) * this._texture.orig.height, t;
  }
  /**
   * Sets the size of the Sprite to the specified width and height.
   * This is faster than setting the width and height separately.
   * @param value - This can be either a number or a [Size]{@link Size} object.
   * @param height - The height to set. Defaults to the value of `width` if not provided.
   */
  setSize(t, e) {
    let s, r;
    typeof t != "object" ? (s = t, r = e ?? t) : (s = t.width, r = t.height ?? t.width), s !== void 0 && this._setWidth(s, this._texture.orig.width), r !== void 0 && this._setHeight(r, this._texture.orig.height);
  }
}
const fa = new Ot();
function vr(i, t, e) {
  const s = fa;
  i.measurable = !0, _r(i, e, s), t.addBoundsMask(s), i.measurable = !1;
}
function Pr(i, t, e) {
  const s = le.get();
  i.measurable = !0;
  const r = wt.get().identity(), n = Dr(i, e, r);
  Ir(i, s, n), i.measurable = !1, t.addBoundsMask(s), wt.return(r), le.return(s);
}
function Dr(i, t, e) {
  return i ? (i !== t && (Dr(i.parent, t, e), i.updateLocalTransform(), e.append(i.localTransform)), e) : (it("Mask bounds, renderable is not inside the root container"), e);
}
class wr {
  constructor(t) {
    this.priority = 0, this.pipe = "alphaMask", t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    this.mask = t, this.renderMaskToTexture = !(t instanceof ue), this.mask.renderable = this.renderMaskToTexture, this.mask.includeInBuild = !this.renderMaskToTexture, this.mask.measurable = !1;
  }
  reset() {
    this.mask.measurable = !0, this.mask = null;
  }
  addBounds(t, e) {
    vr(this.mask, t, e);
  }
  addLocalBounds(t, e) {
    Pr(this.mask, t, e);
  }
  containsPoint(t, e) {
    const s = this.mask;
    return e(s, t);
  }
  destroy() {
    this.reset();
  }
  static test(t) {
    return t instanceof ue;
  }
}
wr.extension = O.MaskEffect;
class Or {
  constructor(t) {
    this.priority = 0, this.pipe = "colorMask", t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    this.mask = t;
  }
  destroy() {
  }
  static test(t) {
    return typeof t == "number";
  }
}
Or.extension = O.MaskEffect;
class Wr {
  constructor(t) {
    this.priority = 0, this.pipe = "stencilMask", t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    this.mask = t, this.mask.includeInBuild = !1, this.mask.measurable = !1;
  }
  reset() {
    this.mask.measurable = !0, this.mask.includeInBuild = !0, this.mask = null;
  }
  addBounds(t, e) {
    vr(this.mask, t, e);
  }
  addLocalBounds(t, e) {
    Pr(this.mask, t, e);
  }
  containsPoint(t, e) {
    const s = this.mask;
    return e(s, t);
  }
  destroy() {
    this.reset();
  }
  static test(t) {
    return t instanceof ot;
  }
}
Wr.extension = O.MaskEffect;
const pa = {
  createCanvas: (i, t) => {
    const e = document.createElement("canvas");
    return e.width = i, e.height = t, e;
  },
  getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (i, t) => fetch(i, t),
  parseXML: (i) => new DOMParser().parseFromString(i, "text/xml")
};
let vi = pa;
const dt = {
  /**
   * Returns the current adapter.
   * @returns {environment.Adapter} The current adapter.
   */
  get() {
    return vi;
  },
  /**
   * Sets the current adapter.
   * @param adapter - The new adapter.
   */
  set(i) {
    vi = i;
  }
};
class Br extends Ut {
  constructor(t) {
    t.resource || (t.resource = dt.get().createCanvas()), t.width || (t.width = t.resource.width, t.autoDensity || (t.width /= t.resolution)), t.height || (t.height = t.resource.height, t.autoDensity || (t.height /= t.resolution)), super(t), this.uploadMethodId = "image", this.autoDensity = t.autoDensity;
    const e = t.resource;
    (this.pixelWidth !== e.width || this.pixelWidth !== e.height) && this.resizeCanvas(), this.transparent = !!t.transparent;
  }
  resizeCanvas() {
    this.autoDensity && (this.resource.style.width = `${this.width}px`, this.resource.style.height = `${this.height}px`), (this.resource.width !== this.pixelWidth || this.resource.height !== this.pixelHeight) && (this.resource.width = this.pixelWidth, this.resource.height = this.pixelHeight);
  }
  resize(t = this.width, e = this.height, s = this._resolution) {
    const r = super.resize(t, e, s);
    return r && this.resizeCanvas(), r;
  }
  static test(t) {
    return globalThis.HTMLCanvasElement && t instanceof HTMLCanvasElement || globalThis.OffscreenCanvas && t instanceof OffscreenCanvas;
  }
}
Br.extension = O.TextureSource;
class Ge extends Ut {
  constructor(t) {
    if (t.resource && globalThis.HTMLImageElement && t.resource instanceof HTMLImageElement) {
      const e = dt.get().createCanvas(t.resource.width, t.resource.height);
      e.getContext("2d").drawImage(t.resource, 0, 0), t.resource = e, it("ImageSource: Image element passed, converting to canvas. Use CanvasSource instead.");
    }
    super(t), this.uploadMethodId = "image", this.autoGarbageCollect = !0;
  }
  static test(t) {
    return globalThis.HTMLImageElement && t instanceof HTMLImageElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap;
  }
}
Ge.extension = O.TextureSource;
var Ws = /* @__PURE__ */ ((i) => (i[i.INTERACTION = 50] = "INTERACTION", i[i.HIGH = 25] = "HIGH", i[i.NORMAL = 0] = "NORMAL", i[i.LOW = -25] = "LOW", i[i.UTILITY = -50] = "UTILITY", i))(Ws || {});
class Ts {
  /**
   * Constructor
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param priority - The priority for emitting
   * @param once - If the handler should fire once
   */
  constructor(t, e = null, s = 0, r = !1) {
    this.next = null, this.previous = null, this._destroyed = !1, this._fn = t, this._context = e, this.priority = s, this._once = r;
  }
  /**
   * Simple compare function to figure out if a function and context match.
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @returns `true` if the listener match the arguments
   */
  match(t, e = null) {
    return this._fn === t && this._context === e;
  }
  /**
   * Emit by calling the current function.
   * @param ticker - The ticker emitting.
   * @returns Next ticker
   */
  emit(t) {
    this._fn && (this._context ? this._fn.call(this._context, t) : this._fn(t));
    const e = this.next;
    return this._once && this.destroy(!0), this._destroyed && (this.next = null), e;
  }
  /**
   * Connect to the list.
   * @param previous - Input node, previous listener
   */
  connect(t) {
    this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this;
  }
  /**
   * Destroy and don't use after this.
   * @param hard - `true` to remove the `next` reference, this
   *        is considered a hard destroy. Soft destroy maintains the next reference.
   * @returns The listener to redirect while emitting or removing.
   */
  destroy(t = !1) {
    this._destroyed = !0, this._fn = null, this._context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
    const e = this.next;
    return this.next = t ? null : e, this.previous = null, e;
  }
}
const kr = class ft {
  constructor() {
    this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new Ts(null, null, 1 / 0), this.deltaMS = 1 / ft.targetFPMS, this.elapsedMS = 1 / ft.targetFPMS, this._tick = (t) => {
      this._requestId = null, this.started && (this.update(t), this.started && this._requestId === null && this._head.next && (this._requestId = requestAnimationFrame(this._tick)));
    };
  }
  /**
   * Conditionally requests a new animation frame.
   * If a frame has not already been requested, and if the internal
   * emitter has listeners, a new frame is requested.
   * @private
   */
  _requestIfNeeded() {
    this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
  }
  /**
   * Conditionally cancels a pending animation frame.
   * @private
   */
  _cancelIfNeeded() {
    this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
  }
  /**
   * Conditionally requests a new animation frame.
   * If the ticker has been started it checks if a frame has not already
   * been requested, and if the internal emitter has listeners. If these
   * conditions are met, a new frame is requested. If the ticker has not
   * been started, but autoStart is `true`, then the ticker starts now,
   * and continues with the previous conditions to request a new frame.
   * @private
   */
  _startIfPossible() {
    this.started ? this._requestIfNeeded() : this.autoStart && this.start();
  }
  /**
   * Register a handler for tick events. Calls continuously unless
   * it is removed or the ticker is stopped.
   * @param fn - The listener function to be added for updates
   * @param context - The listener context
   * @param {number} [priority=UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */
  add(t, e, s = Ws.NORMAL) {
    return this._addListener(new Ts(t, e, s));
  }
  /**
   * Add a handler for the tick event which is only execute once.
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param {number} [priority=UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */
  addOnce(t, e, s = Ws.NORMAL) {
    return this._addListener(new Ts(t, e, s, !0));
  }
  /**
   * Internally adds the event handler so that it can be sorted by priority.
   * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
   * before the rendering.
   * @private
   * @param listener - Current listener being added.
   * @returns This instance of a ticker
   */
  _addListener(t) {
    let e = this._head.next, s = this._head;
    if (!e)
      t.connect(s);
    else {
      for (; e; ) {
        if (t.priority > e.priority) {
          t.connect(s);
          break;
        }
        s = e, e = e.next;
      }
      t.previous || t.connect(s);
    }
    return this._startIfPossible(), this;
  }
  /**
   * Removes any handlers matching the function and context parameters.
   * If no handlers are left after removing, then it cancels the animation frame.
   * @param fn - The listener function to be removed
   * @param context - The listener context to be removed
   * @returns This instance of a ticker
   */
  remove(t, e) {
    let s = this._head.next;
    for (; s; )
      s.match(t, e) ? s = s.destroy() : s = s.next;
    return this._head.next || this._cancelIfNeeded(), this;
  }
  /**
   * The number of listeners on this ticker, calculated by walking through linked list
   * @readonly
   * @member {number}
   */
  get count() {
    if (!this._head)
      return 0;
    let t = 0, e = this._head;
    for (; e = e.next; )
      t++;
    return t;
  }
  /** Starts the ticker. If the ticker has listeners a new animation frame is requested at this point. */
  start() {
    this.started || (this.started = !0, this._requestIfNeeded());
  }
  /** Stops the ticker. If the ticker has requested an animation frame it is canceled at this point. */
  stop() {
    this.started && (this.started = !1, this._cancelIfNeeded());
  }
  /** Destroy the ticker and don't use after this. Calling this method removes all references to internal events. */
  destroy() {
    if (!this._protected) {
      this.stop();
      let t = this._head.next;
      for (; t; )
        t = t.destroy(!0);
      this._head.destroy(), this._head = null;
    }
  }
  /**
   * Triggers an update. An update entails setting the
   * current {@link ticker.Ticker#elapsedMS|elapsedMS},
   * the current {@link ticker.Ticker#deltaTime|deltaTime},
   * invoking all listeners with current deltaTime,
   * and then finally setting {@link ticker.Ticker#lastTime|lastTime}
   * with the value of currentTime that was provided.
   * This method will be called automatically by animation
   * frame callbacks if the ticker instance has been started
   * and listeners are added.
   * @param {number} [currentTime=performance.now()] - the current time of execution
   */
  update(t = performance.now()) {
    let e;
    if (t > this.lastTime) {
      if (e = this.elapsedMS = t - this.lastTime, e > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
        const n = t - this._lastFrame | 0;
        if (n < this._minElapsedMS)
          return;
        this._lastFrame = t - n % this._minElapsedMS;
      }
      this.deltaMS = e, this.deltaTime = this.deltaMS * ft.targetFPMS;
      const s = this._head;
      let r = s.next;
      for (; r; )
        r = r.emit(this);
      s.next || this._cancelIfNeeded();
    } else
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    this.lastTime = t;
  }
  /**
   * The frames per second at which this ticker is running.
   * The default is approximately 60 in most modern browsers.
   * **Note:** This does not factor in the value of
   * {@link ticker.Ticker#speed|speed}, which is specific
   * to scaling {@link ticker.Ticker#deltaTime|deltaTime}.
   * @member {number}
   * @readonly
   */
  get FPS() {
    return 1e3 / this.elapsedMS;
  }
  /**
   * Manages the maximum amount of milliseconds allowed to
   * elapse between invoking {@link ticker.Ticker#update|update}.
   * This value is used to cap {@link ticker.Ticker#deltaTime|deltaTime},
   * but does not effect the measured value of {@link ticker.Ticker#FPS|FPS}.
   * When setting this property it is clamped to a value between
   * `0` and `Ticker.targetFPMS * 1000`.
   * @member {number}
   * @default 10
   */
  get minFPS() {
    return 1e3 / this._maxElapsedMS;
  }
  set minFPS(t) {
    const e = Math.min(this.maxFPS, t), s = Math.min(Math.max(0, e) / 1e3, ft.targetFPMS);
    this._maxElapsedMS = 1 / s;
  }
  /**
   * Manages the minimum amount of milliseconds required to
   * elapse between invoking {@link ticker.Ticker#update|update}.
   * This will effect the measured value of {@link ticker.Ticker#FPS|FPS}.
   * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
   * Otherwise it will be at least `minFPS`
   * @member {number}
   * @default 0
   */
  get maxFPS() {
    return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
  }
  set maxFPS(t) {
    if (t === 0)
      this._minElapsedMS = 0;
    else {
      const e = Math.max(this.minFPS, t);
      this._minElapsedMS = 1 / (e / 1e3);
    }
  }
  /**
   * The shared ticker instance used by {@link AnimatedSprite} and by
   * {@link VideoResource} to update animation frames / video textures.
   *
   * It may also be used by {@link Application} if created with the `sharedTicker` option property set to true.
   *
   * The property {@link ticker.Ticker#autoStart|autoStart} is set to `true` for this instance.
   * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
   * @example
   * import { Ticker } from 'pixi.js';
   *
   * const ticker = Ticker.shared;
   * // Set this to prevent starting this ticker when listeners are added.
   * // By default this is true only for the Ticker.shared instance.
   * ticker.autoStart = false;
   *
   * // FYI, call this to ensure the ticker is stopped. It should be stopped
   * // if you have not attempted to render anything yet.
   * ticker.stop();
   *
   * // Call this when you are ready for a running shared ticker.
   * ticker.start();
   * @example
   * import { autoDetectRenderer, Container } from 'pixi.js';
   *
   * // You may use the shared ticker to render...
   * const renderer = autoDetectRenderer();
   * const stage = new Container();
   * document.body.appendChild(renderer.view);
   * ticker.add((time) => renderer.render(stage));
   *
   * // Or you can just update it manually.
   * ticker.autoStart = false;
   * ticker.stop();
   * const animate = (time) => {
   *     ticker.update(time);
   *     renderer.render(stage);
   *     requestAnimationFrame(animate);
   * };
   * animate(performance.now());
   * @member {ticker.Ticker}
   * @readonly
   * @static
   */
  static get shared() {
    if (!ft._shared) {
      const t = ft._shared = new ft();
      t.autoStart = !0, t._protected = !0;
    }
    return ft._shared;
  }
  /**
   * The system ticker instance used by {@link BasePrepare} for core timing
   * functionality that shouldn't usually need to be paused, unlike the `shared`
   * ticker which drives visual animations and rendering which may want to be paused.
   *
   * The property {@link ticker.Ticker#autoStart|autoStart} is set to `true` for this instance.
   * @member {ticker.Ticker}
   * @readonly
   * @static
   */
  static get system() {
    if (!ft._system) {
      const t = ft._system = new ft();
      t.autoStart = !0, t._protected = !0;
    }
    return ft._system;
  }
};
kr.targetFPMS = 0.06;
let Ke = kr, Rs;
async function Yr() {
  return Rs ?? (Rs = (async () => {
    var a;
    const t = document.createElement("canvas").getContext("webgl");
    if (!t)
      return "premultiply-alpha-on-upload";
    const e = await new Promise((o) => {
      const h = document.createElement("video");
      h.onloadeddata = () => o(h), h.onerror = () => o(null), h.autoplay = !1, h.crossOrigin = "anonymous", h.preload = "auto", h.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=", h.load();
    });
    if (!e)
      return "premultiply-alpha-on-upload";
    const s = t.createTexture();
    t.bindTexture(t.TEXTURE_2D, s);
    const r = t.createFramebuffer();
    t.bindFramebuffer(t.FRAMEBUFFER, r), t.framebufferTexture2D(
      t.FRAMEBUFFER,
      t.COLOR_ATTACHMENT0,
      t.TEXTURE_2D,
      s,
      0
    ), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
    const n = new Uint8Array(4);
    return t.readPixels(0, 0, 1, 1, t.RGBA, t.UNSIGNED_BYTE, n), t.deleteFramebuffer(r), t.deleteTexture(s), (a = t.getExtension("WEBGL_lose_context")) == null || a.loseContext(), n[0] <= n[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload";
  })()), Rs;
}
const hs = class Ur extends Ut {
  constructor(t) {
    super(t), this.isReady = !1, this.uploadMethodId = "video", t = {
      ...Ur.defaultOptions,
      ...t
    }, this._autoUpdate = !0, this._isConnectedToTicker = !1, this._updateFPS = t.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = t.autoPlay !== !1, this.alphaMode = t.alphaMode ?? "premultiply-alpha-on-upload", this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onCanPlayThrough = this._onCanPlayThrough.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), t.autoLoad !== !1 && this.load();
  }
  /** Update the video frame if the source is not destroyed and meets certain conditions. */
  updateFrame() {
    if (!this.destroyed) {
      if (this._updateFPS) {
        const t = Ke.shared.elapsedMS * this.resource.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - t);
      }
      (!this._updateFPS || this._msToNextUpdate <= 0) && (this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0), this.isValid && this.update();
    }
  }
  /** Callback to update the video frame and potentially request the next frame update. */
  _videoFrameRequestCallback() {
    this.updateFrame(), this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    );
  }
  /**
   * Checks if the resource has valid dimensions.
   * @returns {boolean} True if width and height are set, otherwise false.
   */
  get isValid() {
    return !!this.resource.videoWidth && !!this.resource.videoHeight;
  }
  /**
   * Start preloading the video resource.
   * @returns {Promise<this>} Handle the validate event
   */
  async load() {
    if (this._load)
      return this._load;
    const t = this.resource, e = this.options;
    return (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0), t.addEventListener("play", this._onPlayStart), t.addEventListener("pause", this._onPlayStop), t.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._mediaReady() : (e.preload || t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlayThrough), t.addEventListener("error", this._onError, !0)), this.alphaMode = await Yr(), this._load = new Promise((s, r) => {
      this.isValid ? s(this) : (this._resolve = s, this._reject = r, e.preloadTimeoutMs !== void 0 && (this._preloadTimeout = setTimeout(() => {
        this._onError(new ErrorEvent(`Preload exceeded timeout of ${e.preloadTimeoutMs}ms`));
      })), t.load());
    }), this._load;
  }
  /**
   * Handle video error events.
   * @param event - The error event
   */
  _onError(t) {
    this.resource.removeEventListener("error", this._onError, !0), this.emit("error", t), this._reject && (this._reject(t), this._reject = null, this._resolve = null);
  }
  /**
   * Checks if the underlying source is playing.
   * @returns True if playing.
   */
  _isSourcePlaying() {
    const t = this.resource;
    return !t.paused && !t.ended;
  }
  /**
   * Checks if the underlying source is ready for playing.
   * @returns True if ready.
   */
  _isSourceReady() {
    return this.resource.readyState > 2;
  }
  /** Runs the update loop when the video is ready to play. */
  _onPlayStart() {
    this.isValid || this._mediaReady(), this._configureAutoUpdate();
  }
  /** Stops the update loop when a pause event is triggered. */
  _onPlayStop() {
    this._configureAutoUpdate();
  }
  /** Handles behavior when the video completes seeking to the current playback position. */
  _onSeeked() {
    this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0, this.updateFrame(), this._msToNextUpdate = 0);
  }
  _onCanPlay() {
    this.resource.removeEventListener("canplay", this._onCanPlay), this._mediaReady();
  }
  _onCanPlayThrough() {
    this.resource.removeEventListener("canplaythrough", this._onCanPlay), this._preloadTimeout && (clearTimeout(this._preloadTimeout), this._preloadTimeout = void 0), this._mediaReady();
  }
  /** Fired when the video is loaded and ready to play. */
  _mediaReady() {
    const t = this.resource;
    this.isValid && (this.isReady = !0, this.resize(t.videoWidth, t.videoHeight)), this._msToNextUpdate = 0, this.updateFrame(), this._msToNextUpdate = 0, this._resolve && (this._resolve(this), this._resolve = null, this._reject = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.resource.play();
  }
  /** Cleans up resources and event listeners associated with this texture. */
  destroy() {
    this._configureAutoUpdate();
    const t = this.resource;
    t && (t.removeEventListener("play", this._onPlayStart), t.removeEventListener("pause", this._onPlayStop), t.removeEventListener("seeked", this._onSeeked), t.removeEventListener("canplay", this._onCanPlay), t.removeEventListener("canplaythrough", this._onCanPlayThrough), t.removeEventListener("error", this._onError, !0), t.pause(), t.src = "", t.load()), super.destroy();
  }
  /** Should the base texture automatically update itself, set to true by default. */
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(t) {
    t !== this._autoUpdate && (this._autoUpdate = t, this._configureAutoUpdate());
  }
  /**
   * How many times a second to update the texture from the video.
   * Leave at 0 to update at every render.
   * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
   */
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(t) {
    t !== this._updateFPS && (this._updateFPS = t, this._configureAutoUpdate());
  }
  /**
   * Configures the updating mechanism based on the current state and settings.
   *
   * This method decides between using the browser's native video frame callback or a custom ticker
   * for updating the video frame. It ensures optimal performance and responsiveness
   * based on the video's state, playback status, and the desired frames-per-second setting.
   *
   * - If `_autoUpdate` is enabled and the video source is playing:
   *   - It will prefer the native video frame callback if available and no specific FPS is set.
   *   - Otherwise, it will use a custom ticker for manual updates.
   * - If `_autoUpdate` is disabled or the video isn't playing, any active update mechanisms are halted.
   */
  _configureAutoUpdate() {
    this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.source.requestVideoFrameCallback ? (this._isConnectedToTicker && (Ke.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    ))) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (Ke.shared.add(this.updateFrame, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (Ke.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0));
  }
  static test(t) {
    return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement || globalThis.VideoFrame && t instanceof VideoFrame;
  }
};
hs.extension = O.TextureSource;
hs.defaultOptions = {
  ...Ut.defaultOptions,
  /** If true, the video will start loading immediately. */
  autoLoad: !0,
  /** If true, the video will start playing as soon as it is loaded. */
  autoPlay: !0,
  /** The number of times a second to update the texture from the video. Leave at 0 to update at every render. */
  updateFPS: 0,
  /** If true, the video will be loaded with the `crossorigin` attribute. */
  crossorigin: !0,
  /** If true, the video will loop when it ends. */
  loop: !1,
  /** If true, the video will be muted. */
  muted: !0,
  /** If true, the video will play inline. */
  playsinline: !0,
  /** If true, the video will be preloaded. */
  preload: !1
};
hs.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};
let rs = hs;
yt.add(wr, Or, Wr, rs, Ge, Br, Js);
var ee = /* @__PURE__ */ ((i) => (i[i.Low = 0] = "Low", i[i.Normal = 1] = "Normal", i[i.High = 2] = "High", i))(ee || {});
function Tt(i) {
  if (typeof i != "string")
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(i)}`);
}
function xe(i) {
  return i.split("?")[0].split("#")[0];
}
function ma(i) {
  return i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ga(i, t, e) {
  return i.replace(new RegExp(ma(t), "g"), e);
}
function Aa(i, t) {
  let e = "", s = 0, r = -1, n = 0, a = -1;
  for (let o = 0; o <= i.length; ++o) {
    if (o < i.length)
      a = i.charCodeAt(o);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(r === o - 1 || n === 1))
        if (r !== o - 1 && n === 2) {
          if (e.length < 2 || s !== 2 || e.charCodeAt(e.length - 1) !== 46 || e.charCodeAt(e.length - 2) !== 46) {
            if (e.length > 2) {
              const h = e.lastIndexOf("/");
              if (h !== e.length - 1) {
                h === -1 ? (e = "", s = 0) : (e = e.slice(0, h), s = e.length - 1 - e.lastIndexOf("/")), r = o, n = 0;
                continue;
              }
            } else if (e.length === 2 || e.length === 1) {
              e = "", s = 0, r = o, n = 0;
              continue;
            }
          }
          t && (e.length > 0 ? e += "/.." : e = "..", s = 2);
        } else
          e.length > 0 ? e += `/${i.slice(r + 1, o)}` : e = i.slice(r + 1, o), s = o - r - 1;
      r = o, n = 0;
    } else
      a === 46 && n !== -1 ? ++n : n = -1;
  }
  return e;
}
const Ct = {
  /**
   * Converts a path to posix format.
   * @param path - The path to convert to posix
   */
  toPosix(i) {
    return ga(i, "\\", "/");
  },
  /**
   * Checks if the path is a URL e.g. http://, https://
   * @param path - The path to check
   */
  isUrl(i) {
    return /^https?:/.test(this.toPosix(i));
  },
  /**
   * Checks if the path is a data URL
   * @param path - The path to check
   */
  isDataUrl(i) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(i);
  },
  /**
   * Checks if the path is a blob URL
   * @param path - The path to check
   */
  isBlobUrl(i) {
    return i.startsWith("blob:");
  },
  /**
   * Checks if the path has a protocol e.g. http://, https://, file:///, data:, blob:, C:/
   * This will return true for windows file paths
   * @param path - The path to check
   */
  hasProtocol(i) {
    return /^[^/:]+:/.test(this.toPosix(i));
  },
  /**
   * Returns the protocol of the path e.g. http://, https://, file:///, data:, blob:, C:/
   * @param path - The path to get the protocol from
   */
  getProtocol(i) {
    Tt(i), i = this.toPosix(i);
    const t = /^file:\/\/\//.exec(i);
    if (t)
      return t[0];
    const e = /^[^/:]+:\/{0,2}/.exec(i);
    return e ? e[0] : "";
  },
  /**
   * Converts URL to an absolute path.
   * When loading from a Web Worker, we must use absolute paths.
   * If the URL is already absolute we return it as is
   * If it's not, we convert it
   * @param url - The URL to test
   * @param customBaseUrl - The base URL to use
   * @param customRootUrl - The root URL to use
   */
  toAbsolute(i, t, e) {
    if (Tt(i), this.isDataUrl(i) || this.isBlobUrl(i))
      return i;
    const s = xe(this.toPosix(t ?? dt.get().getBaseUrl())), r = xe(this.toPosix(e ?? this.rootname(s)));
    return i = this.toPosix(i), i.startsWith("/") ? Ct.join(r, i.slice(1)) : this.isAbsolute(i) ? i : this.join(s, i);
  },
  /**
   * Normalizes the given path, resolving '..' and '.' segments
   * @param path - The path to normalize
   */
  normalize(i) {
    if (Tt(i), i.length === 0)
      return ".";
    if (this.isDataUrl(i) || this.isBlobUrl(i))
      return i;
    i = this.toPosix(i);
    let t = "";
    const e = i.startsWith("/");
    this.hasProtocol(i) && (t = this.rootname(i), i = i.slice(t.length));
    const s = i.endsWith("/");
    return i = Aa(i, !1), i.length > 0 && s && (i += "/"), e ? `/${i}` : t + i;
  },
  /**
   * Determines if path is an absolute path.
   * Absolute paths can be urls, data urls, or paths on disk
   * @param path - The path to test
   */
  isAbsolute(i) {
    return Tt(i), i = this.toPosix(i), this.hasProtocol(i) ? !0 : i.startsWith("/");
  },
  /**
   * Joins all given path segments together using the platform-specific separator as a delimiter,
   * then normalizes the resulting path
   * @param segments - The segments of the path to join
   */
  join(...i) {
    if (i.length === 0)
      return ".";
    let t;
    for (let e = 0; e < i.length; ++e) {
      const s = i[e];
      if (Tt(s), s.length > 0)
        if (t === void 0)
          t = s;
        else {
          const r = i[e - 1] ?? "";
          this.joinExtensions.includes(this.extname(r).toLowerCase()) ? t += `/../${s}` : t += `/${s}`;
        }
    }
    return t === void 0 ? "." : this.normalize(t);
  },
  /**
   * Returns the directory name of a path
   * @param path - The path to parse
   */
  dirname(i) {
    if (Tt(i), i.length === 0)
      return ".";
    i = this.toPosix(i);
    let t = i.charCodeAt(0);
    const e = t === 47;
    let s = -1, r = !0;
    const n = this.getProtocol(i), a = i;
    i = i.slice(n.length);
    for (let o = i.length - 1; o >= 1; --o)
      if (t = i.charCodeAt(o), t === 47) {
        if (!r) {
          s = o;
          break;
        }
      } else
        r = !1;
    return s === -1 ? e ? "/" : this.isUrl(a) ? n + i : n : e && s === 1 ? "//" : n + i.slice(0, s);
  },
  /**
   * Returns the root of the path e.g. /, C:/, file:///, http://domain.com/
   * @param path - The path to parse
   */
  rootname(i) {
    Tt(i), i = this.toPosix(i);
    let t = "";
    if (i.startsWith("/") ? t = "/" : t = this.getProtocol(i), this.isUrl(i)) {
      const e = i.indexOf("/", t.length);
      e !== -1 ? t = i.slice(0, e) : t = i, t.endsWith("/") || (t += "/");
    }
    return t;
  },
  /**
   * Returns the last portion of a path
   * @param path - The path to test
   * @param ext - Optional extension to remove
   */
  basename(i, t) {
    Tt(i), t && Tt(t), i = xe(this.toPosix(i));
    let e = 0, s = -1, r = !0, n;
    if (t !== void 0 && t.length > 0 && t.length <= i.length) {
      if (t.length === i.length && t === i)
        return "";
      let a = t.length - 1, o = -1;
      for (n = i.length - 1; n >= 0; --n) {
        const h = i.charCodeAt(n);
        if (h === 47) {
          if (!r) {
            e = n + 1;
            break;
          }
        } else
          o === -1 && (r = !1, o = n + 1), a >= 0 && (h === t.charCodeAt(a) ? --a === -1 && (s = n) : (a = -1, s = o));
      }
      return e === s ? s = o : s === -1 && (s = i.length), i.slice(e, s);
    }
    for (n = i.length - 1; n >= 0; --n)
      if (i.charCodeAt(n) === 47) {
        if (!r) {
          e = n + 1;
          break;
        }
      } else
        s === -1 && (r = !1, s = n + 1);
    return s === -1 ? "" : i.slice(e, s);
  },
  /**
   * Returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last
   * portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than
   * the first character of the basename of path, an empty string is returned.
   * @param path - The path to parse
   */
  extname(i) {
    Tt(i), i = xe(this.toPosix(i));
    let t = -1, e = 0, s = -1, r = !0, n = 0;
    for (let a = i.length - 1; a >= 0; --a) {
      const o = i.charCodeAt(a);
      if (o === 47) {
        if (!r) {
          e = a + 1;
          break;
        }
        continue;
      }
      s === -1 && (r = !1, s = a + 1), o === 46 ? t === -1 ? t = a : n !== 1 && (n = 1) : t !== -1 && (n = -1);
    }
    return t === -1 || s === -1 || n === 0 || n === 1 && t === s - 1 && t === e + 1 ? "" : i.slice(t, s);
  },
  /**
   * Parses a path into an object containing the 'root', `dir`, `base`, `ext`, and `name` properties.
   * @param path - The path to parse
   */
  parse(i) {
    Tt(i);
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (i.length === 0)
      return t;
    i = xe(this.toPosix(i));
    let e = i.charCodeAt(0);
    const s = this.isAbsolute(i);
    let r;
    t.root = this.rootname(i), s || this.hasProtocol(i) ? r = 1 : r = 0;
    let n = -1, a = 0, o = -1, h = !0, l = i.length - 1, c = 0;
    for (; l >= r; --l) {
      if (e = i.charCodeAt(l), e === 47) {
        if (!h) {
          a = l + 1;
          break;
        }
        continue;
      }
      o === -1 && (h = !1, o = l + 1), e === 46 ? n === -1 ? n = l : c !== 1 && (c = 1) : n !== -1 && (c = -1);
    }
    return n === -1 || o === -1 || c === 0 || c === 1 && n === o - 1 && n === a + 1 ? o !== -1 && (a === 0 && s ? t.base = t.name = i.slice(1, o) : t.base = t.name = i.slice(a, o)) : (a === 0 && s ? (t.name = i.slice(1, n), t.base = i.slice(1, o)) : (t.name = i.slice(a, n), t.base = i.slice(a, o)), t.ext = i.slice(n, o)), t.dir = this.dirname(i), t;
  },
  sep: "/",
  delimiter: ":",
  joinExtensions: [".html"]
};
function Fr(i, t, e, s, r) {
  const n = t[e];
  for (let a = 0; a < n.length; a++) {
    const o = n[a];
    e < t.length - 1 ? Fr(i.replace(s[e], o), t, e + 1, s, r) : r.push(i.replace(s[e], o));
  }
}
function Ea(i) {
  const t = /\{(.*?)\}/g, e = i.match(t), s = [];
  if (e) {
    const r = [];
    e.forEach((n) => {
      const a = n.substring(1, n.length - 1).split(",");
      r.push(a);
    }), Fr(i, r, 0, e, s);
  } else
    s.push(i);
  return s;
}
const as = (i) => !Array.isArray(i);
class fe {
  constructor() {
    this._defaultBundleIdentifierOptions = {
      connector: "-",
      createBundleAssetId: (t, e) => `${t}${this._bundleIdConnector}${e}`,
      extractAssetIdFromBundle: (t, e) => e.replace(`${t}${this._bundleIdConnector}`, "")
    }, this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector, this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId, this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle, this._assetMap = {}, this._preferredOrder = [], this._parsers = [], this._resolverHash = {}, this._bundles = {};
  }
  /**
   * Override how the resolver deals with generating bundle ids.
   * must be called before any bundles are added
   * @param bundleIdentifier - the bundle identifier options
   */
  setBundleIdentifier(t) {
    if (this._bundleIdConnector = t.connector ?? this._bundleIdConnector, this._createBundleAssetId = t.createBundleAssetId ?? this._createBundleAssetId, this._extractAssetIdFromBundle = t.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle, this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar")
      throw new Error("[Resolver] GenerateBundleAssetId are not working correctly");
  }
  /**
   * Let the resolver know which assets you prefer to use when resolving assets.
   * Multiple prefer user defined rules can be added.
   * @example
   * resolver.prefer({
   *     // first look for something with the correct format, and then then correct resolution
   *     priority: ['format', 'resolution'],
   *     params:{
   *         format:'webp', // prefer webp images
   *         resolution: 2, // prefer a resolution of 2
   *     }
   * })
   * resolver.add('foo', ['bar@2x.webp', 'bar@2x.png', 'bar.webp', 'bar.png']);
   * resolver.resolveUrl('foo') // => 'bar@2x.webp'
   * @param preferOrders - the prefer options
   */
  prefer(...t) {
    t.forEach((e) => {
      this._preferredOrder.push(e), e.priority || (e.priority = Object.keys(e.params));
    }), this._resolverHash = {};
  }
  /**
   * Set the base path to prepend to all urls when resolving
   * @example
   * resolver.basePath = 'https://home.com/';
   * resolver.add('foo', 'bar.ong');
   * resolver.resolveUrl('foo', 'bar.png'); // => 'https://home.com/bar.png'
   * @param basePath - the base path to use
   */
  set basePath(t) {
    this._basePath = t;
  }
  get basePath() {
    return this._basePath;
  }
  /**
   * Set the root path for root-relative URLs. By default the `basePath`'s root is used. If no `basePath` is set, then the
   * default value for browsers is `window.location.origin`
   * @example
   * // Application hosted on https://home.com/some-path/index.html
   * resolver.basePath = 'https://home.com/some-path/';
   * resolver.rootPath = 'https://home.com/';
   * resolver.add('foo', '/bar.png');
   * resolver.resolveUrl('foo', '/bar.png'); // => 'https://home.com/bar.png'
   * @param rootPath - the root path to use
   */
  set rootPath(t) {
    this._rootPath = t;
  }
  get rootPath() {
    return this._rootPath;
  }
  /**
   * All the active URL parsers that help the parser to extract information and create
   * an asset object-based on parsing the URL itself.
   *
   * Can be added using the extensions API
   * @example
   * resolver.add('foo', [
   *     {
   *         resolution: 2,
   *         format: 'png',
   *         src: 'image@2x.png',
   *     },
   *     {
   *         resolution:1,
   *         format:'png',
   *         src: 'image.png',
   *     },
   * ]);
   *
   * // With a url parser the information such as resolution and file format could extracted from the url itself:
   * extensions.add({
   *     extension: ExtensionType.ResolveParser,
   *     test: loadTextures.test, // test if url ends in an image
   *     parse: (value: string) =>
   *     ({
   *         resolution: parseFloat(Resolver.RETINA_PREFIX.exec(value)?.[1] ?? '1'),
   *         format: value.split('.').pop(),
   *         src: value,
   *     }),
   * });
   *
   * // Now resolution and format can be extracted from the url
   * resolver.add('foo', [
   *     'image@2x.png',
   *     'image.png',
   * ]);
   */
  get parsers() {
    return this._parsers;
  }
  /** Used for testing, this resets the resolver to its initial state */
  reset() {
    this.setBundleIdentifier(this._defaultBundleIdentifierOptions), this._assetMap = {}, this._preferredOrder = [], this._resolverHash = {}, this._rootPath = null, this._basePath = null, this._manifest = null, this._bundles = {}, this._defaultSearchParams = null;
  }
  /**
   * Sets the default URL search parameters for the URL resolver. The urls can be specified as a string or an object.
   * @param searchParams - the default url parameters to append when resolving urls
   */
  setDefaultSearchParams(t) {
    if (typeof t == "string")
      this._defaultSearchParams = t;
    else {
      const e = t;
      this._defaultSearchParams = Object.keys(e).map((s) => `${encodeURIComponent(s)}=${encodeURIComponent(e[s])}`).join("&");
    }
  }
  /**
   * Returns the aliases for a given asset
   * @param asset - the asset to get the aliases for
   */
  getAlias(t) {
    const { alias: e, src: s } = t;
    return Rt(
      e || s,
      (n) => typeof n == "string" ? n : Array.isArray(n) ? n.map((a) => (a == null ? void 0 : a.src) ?? a) : n != null && n.src ? n.src : n,
      !0
    );
  }
  /**
   * Add a manifest to the asset resolver. This is a nice way to add all the asset information in one go.
   * generally a manifest would be built using a tool.
   * @param manifest - the manifest to add to the resolver
   */
  addManifest(t) {
    this._manifest && it("[Resolver] Manifest already exists, this will be overwritten"), this._manifest = t, t.bundles.forEach((e) => {
      this.addBundle(e.name, e.assets);
    });
  }
  /**
   * This adds a bundle of assets in one go so that you can resolve them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * resolver.addBundle('animals', [
   *  { alias: 'bunny', src: 'bunny.png' },
   *  { alias: 'chicken', src: 'chicken.png' },
   *  { alias: 'thumper', src: 'thumper.png' },
   * ]);
   * // or
   * resolver.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const resolvedAssets = await resolver.resolveBundle('animals');
   * @param bundleId - The id of the bundle to add
   * @param assets - A record of the asset or assets that will be chosen from when loading via the specified key
   */
  addBundle(t, e) {
    const s = [];
    let r = e;
    Array.isArray(e) || (r = Object.entries(e).map(([n, a]) => typeof a == "string" || Array.isArray(a) ? { alias: n, src: a } : { alias: n, ...a })), r.forEach((n) => {
      const a = n.src, o = n.alias;
      let h;
      if (typeof o == "string") {
        const l = this._createBundleAssetId(t, o);
        s.push(l), h = [o, l];
      } else {
        const l = o.map((c) => this._createBundleAssetId(t, c));
        s.push(...l), h = [...o, ...l];
      }
      this.add({
        ...n,
        alias: h,
        src: a
      });
    }), this._bundles[t] = s;
  }
  /**
   * Tells the resolver what keys are associated with witch asset.
   * The most important thing the resolver does
   * @example
   * // Single key, single asset:
   * resolver.add({alias: 'foo', src: 'bar.png');
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Multiple keys, single asset:
   * resolver.add({alias: ['foo', 'boo'], src: 'bar.png'});
   * resolver.resolveUrl('foo') // => 'bar.png'
   * resolver.resolveUrl('boo') // => 'bar.png'
   *
   * // Multiple keys, multiple assets:
   * resolver.add({alias: ['foo', 'boo'], src: ['bar.png', 'bar.webp']});
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Add custom data attached to the resolver
   * Resolver.add({
   *     alias: 'bunnyBooBooSmooth',
   *     src: 'bunny{png,webp}',
   *     data: { scaleMode:SCALE_MODES.NEAREST }, // Base texture options
   * });
   *
   * resolver.resolve('bunnyBooBooSmooth') // => { src: 'bunny.png', data: { scaleMode: SCALE_MODES.NEAREST } }
   * @param aliases - the UnresolvedAsset or array of UnresolvedAssets to add to the resolver
   */
  add(t) {
    const e = [];
    Array.isArray(t) ? e.push(...t) : e.push(t);
    let s;
    s = (n) => {
      this.hasKey(n) && it(`[Resolver] already has key: ${n} overwriting`);
    }, Rt(e).forEach((n) => {
      const { src: a } = n;
      let { data: o, format: h, loadParser: l } = n;
      const c = Rt(a).map((m) => typeof m == "string" ? Ea(m) : Array.isArray(m) ? m : [m]), u = this.getAlias(n);
      Array.isArray(u) ? u.forEach(s) : s(u);
      const d = [];
      c.forEach((m) => {
        m.forEach((f) => {
          let A = {};
          if (typeof f != "object") {
            A.src = f;
            for (let g = 0; g < this._parsers.length; g++) {
              const y = this._parsers[g];
              if (y.test(f)) {
                A = y.parse(f);
                break;
              }
            }
          } else
            o = f.data ?? o, h = f.format ?? h, l = f.loadParser ?? l, A = {
              ...A,
              ...f
            };
          if (!u)
            throw new Error(`[Resolver] alias is undefined for this asset: ${A.src}`);
          A = this._buildResolvedAsset(A, {
            aliases: u,
            data: o,
            format: h,
            loadParser: l
          }), d.push(A);
        });
      }), u.forEach((m) => {
        this._assetMap[m] = d;
      });
    });
  }
  // TODO: this needs an overload like load did in Assets
  /**
   * If the resolver has had a manifest set via setManifest, this will return the assets urls for
   * a given bundleId or bundleIds.
   * @example
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * resolver.setManifest(manifest);
   * const resolved = resolver.resolveBundle('load-screen');
   * @param bundleIds - The bundle ids to resolve
   * @returns All the bundles assets or a hash of assets for each bundle specified
   */
  resolveBundle(t) {
    const e = as(t);
    t = Rt(t);
    const s = {};
    return t.forEach((r) => {
      const n = this._bundles[r];
      if (n) {
        const a = this.resolve(n), o = {};
        for (const h in a) {
          const l = a[h];
          o[this._extractAssetIdFromBundle(r, h)] = l;
        }
        s[r] = o;
      }
    }), e ? s[t[0]] : s;
  }
  /**
   * Does exactly what resolve does, but returns just the URL rather than the whole asset object
   * @param key - The key or keys to resolve
   * @returns - The URLs associated with the key(s)
   */
  resolveUrl(t) {
    const e = this.resolve(t);
    if (typeof t != "string") {
      const s = {};
      for (const r in e)
        s[r] = e[r].src;
      return s;
    }
    return e.src;
  }
  resolve(t) {
    const e = as(t);
    t = Rt(t);
    const s = {};
    return t.forEach((r) => {
      if (!this._resolverHash[r])
        if (this._assetMap[r]) {
          let n = this._assetMap[r];
          const a = this._getPreferredOrder(n);
          a == null || a.priority.forEach((o) => {
            a.params[o].forEach((h) => {
              const l = n.filter((c) => c[o] ? c[o] === h : !1);
              l.length && (n = l);
            });
          }), this._resolverHash[r] = n[0];
        } else
          this._resolverHash[r] = this._buildResolvedAsset({
            alias: [r],
            src: r
          }, {});
      s[r] = this._resolverHash[r];
    }), e ? s[t[0]] : s;
  }
  /**
   * Checks if an asset with a given key exists in the resolver
   * @param key - The key of the asset
   */
  hasKey(t) {
    return !!this._assetMap[t];
  }
  /**
   * Checks if a bundle with the given key exists in the resolver
   * @param key - The key of the bundle
   */
  hasBundle(t) {
    return !!this._bundles[t];
  }
  /**
   * Internal function for figuring out what prefer criteria an asset should use.
   * @param assets
   */
  _getPreferredOrder(t) {
    for (let e = 0; e < t.length; e++) {
      const s = t[0], r = this._preferredOrder.find((n) => n.params.format.includes(s.format));
      if (r)
        return r;
    }
    return this._preferredOrder[0];
  }
  /**
   * Appends the default url parameters to the url
   * @param url - The url to append the default parameters to
   * @returns - The url with the default parameters appended
   */
  _appendDefaultSearchParams(t) {
    if (!this._defaultSearchParams)
      return t;
    const e = /\?/.test(t) ? "&" : "?";
    return `${t}${e}${this._defaultSearchParams}`;
  }
  _buildResolvedAsset(t, e) {
    const { aliases: s, data: r, loadParser: n, format: a } = e;
    return (this._basePath || this._rootPath) && (t.src = Ct.toAbsolute(t.src, this._basePath, this._rootPath)), t.alias = s ?? t.alias ?? [t.src], t.src = this._appendDefaultSearchParams(t.src), t.data = { ...r || {}, ...t.data }, t.loadParser = n ?? t.loadParser, t.format = a ?? t.format ?? ya(t.src), t;
  }
}
fe.RETINA_PREFIX = /@([0-9\.]+)x/;
function ya(i) {
  return i.split(".").pop().split("?").shift().split("#").shift();
}
const Pi = (i, t) => {
  const e = t.split("?")[1];
  return e && (i += `?${e}`), i;
}, Gr = class _e {
  /**
   * @param texture - Reference to the source BaseTexture object.
   * @param {object} data - Spritesheet image data.
   */
  constructor(t, e) {
    this.linkedSheets = [], this._texture = t instanceof H ? t : null, this.textureSource = t.source, this.textures = {}, this.animations = {}, this.data = e;
    const s = parseFloat(e.meta.scale);
    s ? (this.resolution = s, t.source.resolution = this.resolution) : this.resolution = t.source._resolution, this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
  }
  /**
   * Parser spritesheet from loaded data. This is done asynchronously
   * to prevent creating too many Texture within a single process.
   */
  parse() {
    return new Promise((t) => {
      this._callback = t, this._batchIndex = 0, this._frameKeys.length <= _e.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch();
    });
  }
  /**
   * Process a batch of frames
   * @param initialFrameIndex - The index of frame to start.
   */
  _processFrames(t) {
    let e = t;
    const s = _e.BATCH_SIZE;
    for (; e - t < s && e < this._frameKeys.length; ) {
      const r = this._frameKeys[e], n = this._frames[r], a = n.frame;
      if (a) {
        let o = null, h = null;
        const l = n.trimmed !== !1 && n.sourceSize ? n.sourceSize : n.frame, c = new et(
          0,
          0,
          Math.floor(l.w) / this.resolution,
          Math.floor(l.h) / this.resolution
        );
        n.rotated ? o = new et(
          Math.floor(a.x) / this.resolution,
          Math.floor(a.y) / this.resolution,
          Math.floor(a.h) / this.resolution,
          Math.floor(a.w) / this.resolution
        ) : o = new et(
          Math.floor(a.x) / this.resolution,
          Math.floor(a.y) / this.resolution,
          Math.floor(a.w) / this.resolution,
          Math.floor(a.h) / this.resolution
        ), n.trimmed !== !1 && n.spriteSourceSize && (h = new et(
          Math.floor(n.spriteSourceSize.x) / this.resolution,
          Math.floor(n.spriteSourceSize.y) / this.resolution,
          Math.floor(a.w) / this.resolution,
          Math.floor(a.h) / this.resolution
        )), this.textures[r] = new H({
          source: this.textureSource,
          frame: o,
          orig: c,
          trim: h,
          rotate: n.rotated ? 2 : 0,
          defaultAnchor: n.anchor,
          defaultBorders: n.borders,
          label: r.toString()
        });
      }
      e++;
    }
  }
  /** Parse animations config. */
  _processAnimations() {
    const t = this.data.animations || {};
    for (const e in t) {
      this.animations[e] = [];
      for (let s = 0; s < t[e].length; s++) {
        const r = t[e][s];
        this.animations[e].push(this.textures[r]);
      }
    }
  }
  /** The parse has completed. */
  _parseComplete() {
    const t = this._callback;
    this._callback = null, this._batchIndex = 0, t.call(this, this.textures);
  }
  /** Begin the next batch of textures. */
  _nextBatch() {
    this._processFrames(this._batchIndex * _e.BATCH_SIZE), this._batchIndex++, setTimeout(() => {
      this._batchIndex * _e.BATCH_SIZE < this._frameKeys.length ? this._nextBatch() : (this._processAnimations(), this._parseComplete());
    }, 0);
  }
  /**
   * Destroy Spritesheet and don't use after this.
   * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
   */
  destroy(t = !1) {
    var e;
    for (const s in this.textures)
      this.textures[s].destroy();
    this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && ((e = this._texture) == null || e.destroy(), this.textureSource.destroy()), this._texture = null, this.textureSource = null, this.linkedSheets = [];
  }
};
Gr.BATCH_SIZE = 1e3;
let Di = Gr;
const xa = [
  "jpg",
  "png",
  "jpeg",
  "avif",
  "webp",
  "basis",
  "etc2",
  "bc7",
  "bc6h",
  "bc5",
  "bc4",
  "bc3",
  "bc2",
  "bc1",
  "eac",
  "astc"
];
function Hr(i, t, e) {
  const s = {};
  if (i.forEach((r) => {
    s[r] = t;
  }), Object.keys(t.textures).forEach((r) => {
    s[r] = t.textures[r];
  }), !e) {
    const r = Ct.dirname(i[0]);
    t.linkedSheets.forEach((n, a) => {
      const o = Hr([`${r}/${t.data.meta.related_multi_packs[a]}`], n, !0);
      Object.assign(s, o);
    });
  }
  return s;
}
const Sa = {
  extension: O.Asset,
  /** Handle the caching of the related Spritesheet Textures */
  cache: {
    test: (i) => i instanceof Di,
    getCacheableAssets: (i, t) => Hr(i, t, !1)
  },
  /** Resolve the resolution of the asset. */
  resolver: {
    test: (i) => {
      const e = i.split("?")[0].split("."), s = e.pop(), r = e.pop();
      return s === "json" && xa.includes(r);
    },
    parse: (i) => {
      var e;
      const t = i.split(".");
      return {
        resolution: parseFloat(((e = fe.RETINA_PREFIX.exec(i)) == null ? void 0 : e[1]) ?? "1"),
        format: t[t.length - 2],
        src: i
      };
    }
  },
  /**
   * Loader plugin that parses sprite sheets!
   * once the JSON has been loaded this checks to see if the JSON is spritesheet data.
   * If it is, we load the spritesheets image and parse the data into Spritesheet
   * All textures in the sprite sheet are then added to the cache
   */
  loader: {
    name: "spritesheetLoader",
    extension: {
      type: O.LoadParser,
      priority: ee.Normal
    },
    async testParse(i, t) {
      return Ct.extname(t.src).toLowerCase() === ".json" && !!i.frames;
    },
    async parse(i, t, e) {
      var l, c;
      const {
        texture: s,
        // if user need to use preloaded texture
        imageFilename: r
        // if user need to use custom filename (not from jsonFile.meta.image)
      } = (t == null ? void 0 : t.data) ?? {};
      let n = Ct.dirname(t.src);
      n && n.lastIndexOf("/") !== n.length - 1 && (n += "/");
      let a;
      if (s instanceof H)
        a = s;
      else {
        const u = Pi(n + (r ?? i.meta.image), t.src);
        a = (await e.load([u]))[u];
      }
      const o = new Di(
        a.source,
        i
      );
      await o.parse();
      const h = (l = i == null ? void 0 : i.meta) == null ? void 0 : l.related_multi_packs;
      if (Array.isArray(h)) {
        const u = [];
        for (const m of h) {
          if (typeof m != "string")
            continue;
          let f = n + m;
          (c = t.data) != null && c.ignoreMultiPack || (f = Pi(f, t.src), u.push(e.load({
            src: f,
            data: {
              ignoreMultiPack: !0
            }
          })));
        }
        const d = await Promise.all(u);
        o.linkedSheets = d, d.forEach((m) => {
          m.linkedSheets = [o].concat(o.linkedSheets.filter((f) => f !== m));
        });
      }
      return o;
    },
    unload(i) {
      i.destroy(!0);
    }
  }
};
yt.add(Sa);
class Ta {
  /**
   * Create a new instance eof the Bind Group.
   * @param resources - The resources that are bound together for use by a shader.
   */
  constructor(t) {
    this.resources = /* @__PURE__ */ Object.create(null), this._dirty = !0;
    let e = 0;
    for (const s in t) {
      const r = t[s];
      this.setResource(r, e++);
    }
    this._updateKey();
  }
  /**
   * Updates the key if its flagged as dirty. This is used internally to
   * match this bind group to a WebGPU BindGroup.
   * @internal
   * @ignore
   */
  _updateKey() {
    if (!this._dirty)
      return;
    this._dirty = !1;
    const t = [];
    let e = 0;
    for (const s in this.resources)
      t[e++] = this.resources[s]._resourceId;
    this._key = t.join("|");
  }
  /**
   * Set a resource at a given index. this function will
   * ensure that listeners will be removed from the current resource
   * and added to the new resource.
   * @param resource - The resource to set.
   * @param index - The index to set the resource at.
   */
  setResource(t, e) {
    var r, n;
    const s = this.resources[e];
    t !== s && (s && ((r = t.off) == null || r.call(t, "change", this.onResourceChange, this)), (n = t.on) == null || n.call(t, "change", this.onResourceChange, this), this.resources[e] = t, this._dirty = !0);
  }
  /**
   * Returns the resource at the current specified index.
   * @param index - The index of the resource to get.
   * @returns - The resource at the specified index.
   */
  getResource(t) {
    return this.resources[t];
  }
  /**
   * Used internally to 'touch' each resource, to ensure that the GC
   * knows that all resources in this bind group are still being used.
   * @param tick - The current tick.
   * @internal
   * @ignore
   */
  _touch(t) {
    const e = this.resources;
    for (const s in e)
      e[s]._touched = t;
  }
  /** Destroys this bind group and removes all listeners. */
  destroy() {
    var e;
    const t = this.resources;
    for (const s in t) {
      const r = t[s];
      (e = r.off) == null || e.call(r, "change", this.onResourceChange, this);
    }
    this.resources = null;
  }
  onResourceChange() {
    this._dirty = !0, this._updateKey();
  }
}
const Bs = [];
yt.handleByNamedList(O.Environment, Bs);
async function Ra(i) {
  if (i)
    for (let t = 0; t < Bs.length; t++) {
      const e = Bs[t];
      if (e.value.test()) {
        await e.value.load();
        return;
      }
    }
}
let Se;
function ba() {
  if (typeof Se == "boolean")
    return Se;
  try {
    Se = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({ a: "b" }, "a", "b") === !0;
  } catch {
    Se = !1;
  }
  return Se;
}
var Vr = /* @__PURE__ */ ((i) => (i[i.NONE = 0] = "NONE", i[i.COLOR = 16384] = "COLOR", i[i.STENCIL = 1024] = "STENCIL", i[i.DEPTH = 256] = "DEPTH", i[i.COLOR_DEPTH = 16640] = "COLOR_DEPTH", i[i.COLOR_STENCIL = 17408] = "COLOR_STENCIL", i[i.DEPTH_STENCIL = 1280] = "DEPTH_STENCIL", i[i.ALL = 17664] = "ALL", i))(Vr || {});
class _a {
  /**
   * @param name - The function name that will be executed on the listeners added to this Runner.
   */
  constructor(t) {
    this.items = [], this._name = t;
  }
  /* eslint-disable jsdoc/require-param, jsdoc/check-param-names */
  /**
   * Dispatch/Broadcast Runner to all listeners added to the queue.
   * @param {...any} params - (optional) parameters to pass to each listener
   */
  /*  eslint-enable jsdoc/require-param, jsdoc/check-param-names */
  emit(t, e, s, r, n, a, o, h) {
    const { name: l, items: c } = this;
    for (let u = 0, d = c.length; u < d; u++)
      c[u][l](t, e, s, r, n, a, o, h);
    return this;
  }
  /**
   * Add a listener to the Runner
   *
   * Runners do not need to have scope or functions passed to them.
   * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
   * as the name provided to the Runner when it was created.
   *
   * Eg A listener passed to this Runner will require a 'complete' function.
   *
   * ```
   * import { Runner } from 'pixi.js';
   *
   * const complete = new Runner('complete');
   * ```
   *
   * The scope used will be the object itself.
   * @param {any} item - The object that will be listening.
   */
  add(t) {
    return t[this._name] && (this.remove(t), this.items.push(t)), this;
  }
  /**
   * Remove a single listener from the dispatch queue.
   * @param {any} item - The listener that you would like to remove.
   */
  remove(t) {
    const e = this.items.indexOf(t);
    return e !== -1 && this.items.splice(e, 1), this;
  }
  /**
   * Check to see if the listener is already in the Runner
   * @param {any} item - The listener that you would like to check.
   */
  contains(t) {
    return this.items.indexOf(t) !== -1;
  }
  /** Remove all listeners from the Runner */
  removeAll() {
    return this.items.length = 0, this;
  }
  /** Remove all references, don't use after this. */
  destroy() {
    this.removeAll(), this.items = null, this._name = null;
  }
  /**
   * `true` if there are no this Runner contains no listeners
   * @readonly
   */
  get empty() {
    return this.items.length === 0;
  }
  /**
   * The name of the runner.
   * @readonly
   */
  get name() {
    return this._name;
  }
}
const Na = [
  "init",
  "destroy",
  "contextChange",
  "resolutionChange",
  "reset",
  "renderEnd",
  "renderStart",
  "render",
  "update",
  "postrender",
  "prerender"
], zr = class Xr {
  /**
   * Set up a system with a collection of SystemClasses and runners.
   * Systems are attached dynamically to this class when added.
   * @param config - the config for the system manager
   */
  constructor(t) {
    this.runners = /* @__PURE__ */ Object.create(null), this.renderPipes = /* @__PURE__ */ Object.create(null), this._initOptions = {}, this._systemsHash = /* @__PURE__ */ Object.create(null), this.type = t.type, this.name = t.name;
    const e = [...Na, ...t.runners ?? []];
    this._addRunners(...e), this._addSystems(t.systems), this._addPipes(t.renderPipes, t.renderPipeAdaptors), this._unsafeEvalCheck();
  }
  /**
   * Initialize the renderer.
   * @param options - The options to use to create the renderer.
   */
  async init(t = {}) {
    for (const e in this._systemsHash)
      t = { ...this._systemsHash[e].constructor.defaultOptions, ...t };
    t = { ...Xr.defaultOptions, ...t }, this._roundPixels = t.roundPixels ? 1 : 0;
    for (let e = 0; e < this.runners.init.items.length; e++)
      await this.runners.init.items[e].init(t);
    this._initOptions = t;
  }
  render(t, e) {
    let s = t;
    if (s instanceof ot && (s = { container: s }, e && (It(Nt, "passing a second argument is deprecated, please use render options instead"), s.target = e.renderTexture)), s.target || (s.target = this.view.renderTarget), s.target === this.view.renderTarget && (this._lastObjectRendered = s.container, s.clearColor = this.background.colorRgba), s.clearColor) {
      const r = Array.isArray(s.clearColor) && s.clearColor.length === 4;
      s.clearColor = r ? s.clearColor : gt.shared.setValue(s.clearColor).toArray();
    }
    s.transform || (s.container.updateLocalTransform(), s.transform = s.container.localTransform), this.runners.prerender.emit(s), this.runners.renderStart.emit(s), this.runners.render.emit(s), this.runners.renderEnd.emit(s), this.runners.postrender.emit(s);
  }
  /**
   * Resizes the WebGL view to the specified width and height.
   * @param desiredScreenWidth - The desired width of the screen.
   * @param desiredScreenHeight - The desired height of the screen.
   * @param resolution - The resolution / device pixel ratio of the renderer.
   */
  resize(t, e, s) {
    this.view.resize(t, e, s);
  }
  clear(t = {}) {
    const e = this;
    t.target || (t.target = e.renderTarget.renderTarget), t.clearColor || (t.clearColor = this.background.colorRgba), t.clear ?? (t.clear = Vr.ALL);
    const { clear: s, clearColor: r, target: n } = t;
    gt.shared.setValue(r ?? this.background.colorRgba), e.renderTarget.clear(n, s, gt.shared.toArray());
  }
  /** The resolution / device pixel ratio of the renderer. */
  get resolution() {
    return this.view.resolution;
  }
  set resolution(t) {
    this.view.resolution = t, this.runners.resolutionChange.emit(t);
  }
  /**
   * Same as view.width, actual number of pixels in the canvas by horizontal.
   * @member {number}
   * @readonly
   * @default 800
   */
  get width() {
    return this.view.texture.frame.width;
  }
  /**
   * Same as view.height, actual number of pixels in the canvas by vertical.
   * @default 600
   */
  get height() {
    return this.view.texture.frame.height;
  }
  // NOTE: this was `view` in v7
  /**
   * The canvas element that everything is drawn to.
   * @type {environment.ICanvas}
   */
  get canvas() {
    return this.view.canvas;
  }
  /**
   * the last object rendered by the renderer. Useful for other plugins like interaction managers
   * @readonly
   */
  get lastObjectRendered() {
    return this._lastObjectRendered;
  }
  /**
   * Flag if we are rendering to the screen vs renderTexture
   * @readonly
   * @default true
   */
  get renderingToScreen() {
    return this.renderTarget.renderingToScreen;
  }
  /**
   * Measurements of the screen. (0, 0, screenWidth, screenHeight).
   *
   * Its safe to use as filterArea or hitArea for the whole stage.
   */
  get screen() {
    return this.view.screen;
  }
  /**
   * Create a bunch of runners based of a collection of ids
   * @param runnerIds - the runner ids to add
   */
  _addRunners(...t) {
    t.forEach((e) => {
      this.runners[e] = new _a(e);
    });
  }
  _addSystems(t) {
    let e;
    for (e in t) {
      const s = t[e];
      this._addSystem(s.value, s.name);
    }
  }
  /**
   * Add a new system to the renderer.
   * @param ClassRef - Class reference
   * @param name - Property name for system, if not specified
   *        will use a static `name` property on the class itself. This
   *        name will be assigned as s property on the Renderer so make
   *        sure it doesn't collide with properties on Renderer.
   * @returns Return instance of renderer
   */
  _addSystem(t, e) {
    const s = new t(this);
    if (this[e])
      throw new Error(`Whoops! The name "${e}" is already in use`);
    this[e] = s, this._systemsHash[e] = s;
    for (const r in this.runners)
      this.runners[r].add(s);
    return this;
  }
  _addPipes(t, e) {
    const s = e.reduce((r, n) => (r[n.name] = n.value, r), {});
    t.forEach((r) => {
      const n = r.value, a = r.name, o = s[a];
      this.renderPipes[a] = new n(
        this,
        o ? new o() : null
      );
    });
  }
  destroy(t = !1) {
    this.runners.destroy.items.reverse(), this.runners.destroy.emit(t), Object.values(this.runners).forEach((e) => {
      e.destroy();
    }), this._systemsHash = null, this.renderPipes = null;
  }
  /**
   * Generate a texture from a container.
   * @param options - options or container target to use when generating the texture
   * @returns a texture
   */
  generateTexture(t) {
    return this.textureGenerator.generateTexture(t);
  }
  /**
   * Whether the renderer will round coordinates to whole pixels when rendering.
   * Can be overridden on a per scene item basis.
   */
  get roundPixels() {
    return !!this._roundPixels;
  }
  /**
   * Overrideable function by `pixi.js/unsafe-eval` to silence
   * throwing an error if platform doesn't support unsafe-evals.
   * @private
   * @ignore
   */
  _unsafeEvalCheck() {
    if (!ba())
      throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.");
  }
};
zr.defaultOptions = {
  /**
   * Default resolution / device pixel ratio of the renderer.
   * @default 1
   */
  resolution: 1,
  /**
   * Should the `failIfMajorPerformanceCaveat` flag be enabled as a context option used in the `isWebGLSupported`
   * function. If set to true, a WebGL renderer can fail to be created if the browser thinks there could be
   * performance issues when using WebGL.
   *
   * In PixiJS v6 this has changed from true to false by default, to allow WebGL to work in as many
   * scenarios as possible. However, some users may have a poor experience, for example, if a user has a gpu or
   * driver version blacklisted by the
   * browser.
   *
   * If your application requires high performance rendering, you may wish to set this to false.
   * We recommend one of two options if you decide to set this flag to false:
   *
   * 1: Use the Canvas renderer as a fallback in case high performance WebGL is
   *    not supported.
   *
   * 2: Call `isWebGLSupported` (which if found in the utils package) in your code before attempting to create a
   *    PixiJS renderer, and show an error message to the user if the function returns false, explaining that their
   *    device & browser combination does not support high performance WebGL.
   *    This is a much better strategy than trying to create a PixiJS renderer and finding it then fails.
   * @default false
   */
  failIfMajorPerformanceCaveat: !1,
  /**
   * Should round pixels be forced when rendering?
   * @default false
   */
  roundPixels: !1
};
let $r = zr, Je;
function Ia(i) {
  return Je !== void 0 || (Je = (() => {
    var e;
    const t = {
      stencil: !0,
      failIfMajorPerformanceCaveat: i ?? $r.defaultOptions.failIfMajorPerformanceCaveat
    };
    try {
      if (!dt.get().getWebGLRenderingContext())
        return !1;
      let r = dt.get().createCanvas().getContext("webgl", t);
      const n = !!((e = r == null ? void 0 : r.getContextAttributes()) != null && e.stencil);
      if (r) {
        const a = r.getExtension("WEBGL_lose_context");
        a && a.loseContext();
      }
      return r = null, n;
    } catch {
      return !1;
    }
  })()), Je;
}
let Ze;
async function Ca(i = {}) {
  return Ze !== void 0 || (Ze = await (async () => {
    if (!dt.get().getNavigator().gpu)
      return !1;
    try {
      return await (await navigator.gpu.requestAdapter(i)).requestDevice(), !0;
    } catch {
      return !1;
    }
  })()), Ze;
}
const wi = ["webgpu", "webgl", "canvas"];
async function Ma(i) {
  let t = [];
  i.preference ? (t.push(i.preference), wi.forEach((n) => {
    n !== i.preference && t.push(n);
  })) : t = wi.slice();
  let e;
  await Ra(
    i.manageImports ?? !0
  );
  let s = {};
  for (let n = 0; n < t.length; n++) {
    const a = t[n];
    if (a === "webgpu" && await Ca()) {
      const { WebGPURenderer: o } = await import("./WebGPURenderer-CRAmWbI7.mjs");
      e = o, s = { ...i, ...i.webgpu };
      break;
    } else if (a === "webgl" && Ia(
      i.failIfMajorPerformanceCaveat ?? $r.defaultOptions.failIfMajorPerformanceCaveat
    )) {
      const { WebGLRenderer: o } = await import("./WebGLRenderer-DntmBkVA.mjs");
      e = o, s = { ...i, ...i.webgl };
      break;
    } else if (a === "canvas") {
      s = { ...i };
      break;
    }
  }
  delete s.webgpu, delete s.webgl;
  const r = new e();
  return await r.init(s), r;
}
const Qr = class ks {
  /** @ignore */
  constructor(...t) {
    this.stage = new ot(), t[0] !== void 0 && It(Nt, "Application constructor options are deprecated, please use Application.init() instead.");
  }
  /**
   * @param options - The optional application and renderer parameters.
   */
  async init(t) {
    t = { ...t }, this.renderer = await Ma(t), ks._plugins.forEach((e) => {
      e.init.call(this, t);
    });
  }
  /** Render the current stage. */
  render() {
    this.renderer.render({ container: this.stage });
  }
  /**
   * Reference to the renderer's canvas element.
   * @readonly
   * @member {HTMLCanvasElement}
   */
  get canvas() {
    return this.renderer.canvas;
  }
  /**
   * Reference to the renderer's canvas element.
   * @member {HTMLCanvasElement}
   * @deprecated since 8.0.0
   */
  get view() {
    return It(Nt, "Application.view is deprecated, please use Application.canvas instead."), this.renderer.canvas;
  }
  /**
   * Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
   * @readonly
   */
  get screen() {
    return this.renderer.screen;
  }
  /**
   * Destroys the application and all of its resources.
   * @param {object|boolean}[rendererDestroyOptions=false] - The options for destroying the renderer.
   * @param {boolean}[rendererDestroyOptions.removeView=false] - Removes the Canvas element from the DOM.
   * @param {object|boolean} [options=false] - The options for destroying the stage.
   * @param {boolean} [options.children=false] - If set to true, all the children will have their destroy method
   * called as well. `options` will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for children with textures e.g. Sprites.
   * If options.children is set to true,
   * it should destroy the texture of the child sprite.
   * @param {boolean} [options.textureSource=false] - Only used for children with textures e.g. Sprites.
   *  If options.children is set to true,
   * it should destroy the texture source of the child sprite.
   * @param {boolean} [options.context=false] - Only used for children with graphicsContexts e.g. Graphics.
   * If options.children is set to true,
   * it should destroy the context of the child graphics.
   */
  destroy(t = !1, e = !1) {
    const s = ks._plugins.slice(0);
    s.reverse(), s.forEach((r) => {
      r.destroy.call(this);
    }), this.stage.destroy(e), this.stage = null, this.renderer.destroy(t), this.renderer = null;
  }
};
Qr._plugins = [];
let jr = Qr;
yt.handleByList(O.Application, jr._plugins);
class La {
  /**
   * @param loader
   * @param verbose - should the loader log to the console
   */
  constructor(t, e = !1) {
    this._loader = t, this._assetList = [], this._isLoading = !1, this._maxConcurrent = 1, this.verbose = e;
  }
  /**
   * Adds an array of assets to load.
   * @param assetUrls - assets to load
   */
  add(t) {
    t.forEach((e) => {
      this._assetList.push(e);
    }), this.verbose && console.log("[BackgroundLoader] assets: ", this._assetList), this._isActive && !this._isLoading && this._next();
  }
  /**
   * Loads the next set of assets. Will try to load as many assets as it can at the same time.
   *
   * The max assets it will try to load at one time will be 4.
   */
  async _next() {
    if (this._assetList.length && this._isActive) {
      this._isLoading = !0;
      const t = [], e = Math.min(this._assetList.length, this._maxConcurrent);
      for (let s = 0; s < e; s++)
        t.push(this._assetList.pop());
      await this._loader.load(t), this._isLoading = !1, this._next();
    }
  }
  /**
   * Activate/Deactivate the loading. If set to true then it will immediately continue to load the next asset.
   * @returns whether the class is active
   */
  get active() {
    return this._isActive;
  }
  set active(t) {
    this._isActive !== t && (this._isActive = t, t && !this._isLoading && this._next());
  }
}
const va = {
  extension: O.CacheParser,
  test: (i) => Array.isArray(i) && i.every((t) => t instanceof H),
  getCacheableAssets: (i, t) => {
    const e = {};
    return i.forEach((s) => {
      t.forEach((r, n) => {
        e[s + (n === 0 ? "" : n + 1)] = r;
      });
    }), e;
  }
};
async function qr(i) {
  if ("Image" in globalThis)
    return new Promise((t) => {
      const e = new Image();
      e.onload = () => {
        t(!0);
      }, e.onerror = () => {
        t(!1);
      }, e.src = i;
    });
  if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
    try {
      const t = await (await fetch(i)).blob();
      await createImageBitmap(t);
    } catch {
      return !1;
    }
    return !0;
  }
  return !1;
}
const Pa = {
  extension: {
    type: O.DetectionParser,
    priority: 1
  },
  test: async () => qr(
    // eslint-disable-next-line max-len
    "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="
  ),
  add: async (i) => [...i, "avif"],
  remove: async (i) => i.filter((t) => t !== "avif")
}, Oi = ["png", "jpg", "jpeg"], Da = {
  extension: {
    type: O.DetectionParser,
    priority: -1
  },
  test: () => Promise.resolve(!0),
  add: async (i) => [...i, ...Oi],
  remove: async (i) => i.filter((t) => !Oi.includes(t))
}, wa = "WorkerGlobalScope" in globalThis && globalThis instanceof globalThis.WorkerGlobalScope;
function ti(i) {
  return wa ? !1 : document.createElement("video").canPlayType(i) !== "";
}
const Oa = {
  extension: {
    type: O.DetectionParser,
    priority: 0
  },
  test: async () => ti("video/mp4"),
  add: async (i) => [...i, "mp4", "m4v"],
  remove: async (i) => i.filter((t) => t !== "mp4" && t !== "m4v")
}, Wa = {
  extension: {
    type: O.DetectionParser,
    priority: 0
  },
  test: async () => ti("video/ogg"),
  add: async (i) => [...i, "ogv"],
  remove: async (i) => i.filter((t) => t !== "ogv")
}, Ba = {
  extension: {
    type: O.DetectionParser,
    priority: 0
  },
  test: async () => ti("video/webm"),
  add: async (i) => [...i, "webm"],
  remove: async (i) => i.filter((t) => t !== "webm")
}, ka = {
  extension: {
    type: O.DetectionParser,
    priority: 0
  },
  test: async () => qr(
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  ),
  add: async (i) => [...i, "webp"],
  remove: async (i) => i.filter((t) => t !== "webp")
};
class Ya {
  constructor() {
    this._parsers = [], this._parsersValidated = !1, this.parsers = new Proxy(this._parsers, {
      set: (t, e, s) => (this._parsersValidated = !1, t[e] = s, !0)
    }), this.promiseCache = {};
  }
  /** function used for testing */
  reset() {
    this._parsersValidated = !1, this.promiseCache = {};
  }
  /**
   * Used internally to generate a promise for the asset to be loaded.
   * @param url - The URL to be loaded
   * @param data - any custom additional information relevant to the asset being loaded
   * @returns - a promise that will resolve to an Asset for example a Texture of a JSON object
   */
  _getLoadPromiseAndParser(t, e) {
    const s = {
      promise: null,
      parser: null
    };
    return s.promise = (async () => {
      var a, o;
      let r = null, n = null;
      if (e.loadParser && (n = this._parserHash[e.loadParser], n || it(`[Assets] specified load parser "${e.loadParser}" not found while loading ${t}`)), !n) {
        for (let h = 0; h < this.parsers.length; h++) {
          const l = this.parsers[h];
          if (l.load && ((a = l.test) != null && a.call(l, t, e, this))) {
            n = l;
            break;
          }
        }
        if (!n)
          return it(`[Assets] ${t} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`), null;
      }
      r = await n.load(t, e, this), s.parser = n;
      for (let h = 0; h < this.parsers.length; h++) {
        const l = this.parsers[h];
        l.parse && l.parse && await ((o = l.testParse) == null ? void 0 : o.call(l, r, e, this)) && (r = await l.parse(r, e, this) || r, s.parser = l);
      }
      return r;
    })(), s;
  }
  async load(t, e) {
    this._parsersValidated || this._validateParsers();
    let s = 0;
    const r = {}, n = as(t), a = Rt(t, (l) => ({
      alias: [l],
      src: l
    })), o = a.length, h = a.map(async (l) => {
      const c = Ct.toAbsolute(l.src);
      if (!r[l.src])
        try {
          this.promiseCache[c] || (this.promiseCache[c] = this._getLoadPromiseAndParser(c, l)), r[l.src] = await this.promiseCache[c].promise, e && e(++s / o);
        } catch (u) {
          throw delete this.promiseCache[c], delete r[l.src], new Error(`[Loader.load] Failed to load ${c}.
${u}`);
        }
    });
    return await Promise.all(h), n ? r[a[0].src] : r;
  }
  /**
   * Unloads one or more assets. Any unloaded assets will be destroyed, freeing up memory for your app.
   * The parser that created the asset, will be the one that unloads it.
   * @example
   * // Single asset:
   * const asset = await Loader.load('cool.png');
   *
   * await Loader.unload('cool.png');
   *
   * console.log(asset.destroyed); // true
   * @param assetsToUnloadIn - urls that you want to unload, or a single one!
   */
  async unload(t) {
    const s = Rt(t, (r) => ({
      alias: [r],
      src: r
    })).map(async (r) => {
      var o, h;
      const n = Ct.toAbsolute(r.src), a = this.promiseCache[n];
      if (a) {
        const l = await a.promise;
        delete this.promiseCache[n], (h = (o = a.parser) == null ? void 0 : o.unload) == null || h.call(o, l, r, this);
      }
    });
    await Promise.all(s);
  }
  /** validates our parsers, right now it only checks for name conflicts but we can add more here as required! */
  _validateParsers() {
    this._parsersValidated = !0, this._parserHash = this._parsers.filter((t) => t.name).reduce((t, e) => (e.name ? t[e.name] && it(`[Assets] loadParser name conflict "${e.name}"`) : it("[Assets] loadParser should have a name"), { ...t, [e.name]: e }), {});
  }
}
function pe(i, t) {
  if (Array.isArray(t)) {
    for (const e of t)
      if (i.startsWith(`data:${e}`))
        return !0;
    return !1;
  }
  return i.startsWith(`data:${t}`);
}
function me(i, t) {
  const e = i.split("?")[0], s = Ct.extname(e).toLowerCase();
  return Array.isArray(t) ? t.includes(s) : s === t;
}
const Ua = ".json", Fa = "application/json", Ga = {
  extension: {
    type: O.LoadParser,
    priority: ee.Low
  },
  name: "loadJson",
  test(i) {
    return pe(i, Fa) || me(i, Ua);
  },
  async load(i) {
    return await (await dt.get().fetch(i)).json();
  }
}, Ha = ".txt", Va = "text/plain", za = {
  name: "loadTxt",
  extension: {
    type: O.LoadParser,
    priority: ee.Low
  },
  test(i) {
    return pe(i, Va) || me(i, Ha);
  },
  async load(i) {
    return await (await dt.get().fetch(i)).text();
  }
}, Xa = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
], $a = [".ttf", ".otf", ".woff", ".woff2"], Qa = [
  "font/ttf",
  "font/otf",
  "font/woff",
  "font/woff2"
], ja = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function qa(i) {
  const t = Ct.extname(i), r = Ct.basename(i, t).replace(/(-|_)/g, " ").toLowerCase().split(" ").map((o) => o.charAt(0).toUpperCase() + o.slice(1));
  let n = r.length > 0;
  for (const o of r)
    if (!o.match(ja)) {
      n = !1;
      break;
    }
  let a = r.join(" ");
  return n || (a = `"${a.replace(/[\\"]/g, "\\$&")}"`), a;
}
const Ka = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function Ja(i) {
  return Ka.test(i) ? i : encodeURI(i);
}
const Za = {
  extension: {
    type: O.LoadParser,
    priority: ee.Low
  },
  name: "loadWebFont",
  test(i) {
    return pe(i, Qa) || me(i, $a);
  },
  async load(i, t) {
    var s, r, n;
    const e = dt.get().getFontFaceSet();
    if (e) {
      const a = [], o = ((s = t.data) == null ? void 0 : s.family) ?? qa(i), h = ((n = (r = t.data) == null ? void 0 : r.weights) == null ? void 0 : n.filter((c) => Xa.includes(c))) ?? ["normal"], l = t.data ?? {};
      for (let c = 0; c < h.length; c++) {
        const u = h[c], d = new FontFace(o, `url(${Ja(i)})`, {
          ...l,
          weight: u
        });
        await d.load(), e.add(d), a.push(d);
      }
      return ht.set(o, {
        url: i,
        fontFaces: a
      }), a.length === 1 ? a[0] : a;
    }
    return it("[loadWebFont] FontFace API is not supported. Skipping loading font"), null;
  },
  unload(i) {
    (Array.isArray(i) ? i : [i]).forEach((t) => {
      ht.remove(t.family), dt.get().getFontFaceSet().delete(t);
    });
  }
};
var to = so, bs = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 }, eo = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
function so(i) {
  var t = [];
  return i.replace(eo, function(e, s, r) {
    var n = s.toLowerCase();
    for (r = ro(r), n == "m" && r.length > 2 && (t.push([s].concat(r.splice(0, 2))), n = "l", s = s == "m" ? "l" : "L"); ; ) {
      if (r.length == bs[n])
        return r.unshift(s), t.push(r);
      if (r.length < bs[n])
        throw new Error("malformed path data");
      t.push([s].concat(r.splice(0, bs[n])));
    }
  }), t;
}
var io = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;
function ro(i) {
  var t = i.match(io);
  return t ? t.map(Number) : [];
}
const no = /* @__PURE__ */ Ks(to);
function ao(i, t) {
  const e = no(i), s = [];
  let r = null, n = 0, a = 0;
  for (let o = 0; o < e.length; o++) {
    const h = e[o], l = h[0], c = h;
    switch (l) {
      case "M":
        n = c[1], a = c[2], t.moveTo(n, a);
        break;
      case "m":
        n += c[1], a += c[2], t.moveTo(n, a);
        break;
      case "H":
        n = c[1], t.lineTo(n, a);
        break;
      case "h":
        n += c[1], t.lineTo(n, a);
        break;
      case "V":
        a = c[1], t.lineTo(n, a);
        break;
      case "v":
        a += c[1], t.lineTo(n, a);
        break;
      case "L":
        n = c[1], a = c[2], t.lineTo(n, a);
        break;
      case "l":
        n += c[1], a += c[2], t.lineTo(n, a);
        break;
      case "C":
        n = c[5], a = c[6], t.bezierCurveTo(
          c[1],
          c[2],
          c[3],
          c[4],
          n,
          a
        );
        break;
      case "c":
        t.bezierCurveTo(
          n + c[1],
          a + c[2],
          n + c[3],
          a + c[4],
          n + c[5],
          a + c[6]
        ), n += c[5], a += c[6];
        break;
      case "S":
        n = c[3], a = c[4], t.bezierCurveToShort(
          c[1],
          c[2],
          n,
          a
        );
        break;
      case "s":
        t.bezierCurveToShort(
          n + c[1],
          a + c[2],
          n + c[3],
          a + c[4]
        ), n += c[3], a += c[4];
        break;
      case "Q":
        n = c[3], a = c[4], t.quadraticCurveTo(
          c[1],
          c[2],
          n,
          a
        );
        break;
      case "q":
        t.quadraticCurveTo(
          n + c[1],
          a + c[2],
          n + c[3],
          a + c[4]
        ), n += c[3], a += c[4];
        break;
      case "T":
        n = c[1], a = c[2], t.quadraticCurveToShort(
          n,
          a
        );
        break;
      case "t":
        n += c[1], a += c[2], t.quadraticCurveToShort(
          n,
          a
        );
        break;
      case "A":
        n = c[6], a = c[7], t.arcToSvg(
          c[1],
          c[2],
          c[3],
          c[4],
          c[5],
          n,
          a
        );
        break;
      case "a":
        n += c[6], a += c[7], t.arcToSvg(
          c[1],
          c[2],
          c[3],
          c[4],
          c[5],
          n,
          a
        );
        break;
      case "Z":
      case "z":
        t.closePath(), s.length > 0 && (r = s.pop(), r ? (n = r.startX, a = r.startY) : (n = 0, a = 0)), r = null;
        break;
      default:
        it(`Unknown SVG path command: ${l}`);
    }
    l !== "Z" && l !== "z" && r === null && (r = { startX: n, startY: a }, s.push(r));
  }
  return t;
}
class ei {
  /**
   * @param x - The X coordinate of the center of this circle
   * @param y - The Y coordinate of the center of this circle
   * @param radius - The radius of the circle
   */
  constructor(t = 0, e = 0, s = 0) {
    this.type = "circle", this.x = t, this.y = e, this.radius = s;
  }
  /**
   * Creates a clone of this Circle instance
   * @returns A copy of the Circle
   */
  clone() {
    return new ei(this.x, this.y, this.radius);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Circle
   */
  contains(t, e) {
    if (this.radius <= 0)
      return !1;
    const s = this.radius * this.radius;
    let r = this.x - t, n = this.y - e;
    return r *= r, n *= n, r + n <= s;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param width - The width of the line to check
   * @returns Whether the x/y coordinates are within this Circle
   */
  strokeContains(t, e, s) {
    if (this.radius === 0)
      return !1;
    const r = this.x - t, n = this.y - e, a = this.radius, o = s / 2, h = Math.sqrt(r * r + n * n);
    return h < a + o && h > a - o;
  }
  /**
   * Returns the framing rectangle of the circle as a Rectangle object
   * @param out
   * @returns The framing rectangle
   */
  getBounds(t) {
    return t = t || new et(), t.x = this.x - this.radius, t.y = this.y - this.radius, t.width = this.radius * 2, t.height = this.radius * 2, t;
  }
  /**
   * Copies another circle to this one.
   * @param circle - The circle to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.radius = t.radius, this;
  }
  /**
   * Copies this circle to another one.
   * @param circle - The circle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
  }
}
class si {
  /**
   * @param x - The X coordinate of the center of this ellipse
   * @param y - The Y coordinate of the center of this ellipse
   * @param halfWidth - The half width of this ellipse
   * @param halfHeight - The half height of this ellipse
   */
  constructor(t = 0, e = 0, s = 0, r = 0) {
    this.type = "ellipse", this.x = t, this.y = e, this.halfWidth = s, this.halfHeight = r;
  }
  /**
   * Creates a clone of this Ellipse instance
   * @returns {Ellipse} A copy of the ellipse
   */
  clone() {
    return new si(this.x, this.y, this.halfWidth, this.halfHeight);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coords are within this ellipse
   */
  contains(t, e) {
    if (this.halfWidth <= 0 || this.halfHeight <= 0)
      return !1;
    let s = (t - this.x) / this.halfWidth, r = (e - this.y) / this.halfHeight;
    return s *= s, r *= r, s + r <= 1;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse including stroke
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param width
   * @returns Whether the x/y coords are within this ellipse
   */
  strokeContains(t, e, s) {
    const { halfWidth: r, halfHeight: n } = this;
    if (r <= 0 || n <= 0)
      return !1;
    const a = s / 2, o = r - a, h = n - a, l = r + a, c = n + a, u = t - this.x, d = e - this.y, m = u * u / (o * o) + d * d / (h * h), f = u * u / (l * l) + d * d / (c * c);
    return m > 1 && f <= 1;
  }
  /**
   * Returns the framing rectangle of the ellipse as a Rectangle object
   * @returns The framing rectangle
   */
  getBounds() {
    return new et(this.x - this.halfWidth, this.y - this.halfHeight, this.halfWidth * 2, this.halfHeight * 2);
  }
  /**
   * Copies another ellipse to this one.
   * @param ellipse - The ellipse to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.halfWidth = t.halfWidth, this.halfHeight = t.halfHeight, this;
  }
  /**
   * Copies this ellipse to another one.
   * @param ellipse - The ellipse to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`;
  }
}
function oo(i, t, e, s, r, n) {
  const a = i - e, o = t - s, h = r - e, l = n - s, c = a * h + o * l, u = h * h + l * l;
  let d = -1;
  u !== 0 && (d = c / u);
  let m, f;
  d < 0 ? (m = e, f = s) : d > 1 ? (m = r, f = n) : (m = e + d * h, f = s + d * l);
  const A = i - m, g = t - f;
  return A * A + g * g;
}
class Ie {
  /**
   * @param points - This can be an array of Points
   *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
   *  the arguments passed can be all the points of the polygon e.g.
   *  `new Polygon(new Point(), new Point(), ...)`, or the arguments passed can be flat
   *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
   */
  constructor(...t) {
    this.type = "polygon";
    let e = Array.isArray(t[0]) ? t[0] : t;
    if (typeof e[0] != "number") {
      const s = [];
      for (let r = 0, n = e.length; r < n; r++)
        s.push(e[r].x, e[r].y);
      e = s;
    }
    this.points = e, this.closePath = !0;
  }
  /**
   * Creates a clone of this polygon.
   * @returns - A copy of the polygon.
   */
  clone() {
    const t = this.points.slice(), e = new Ie(t);
    return e.closePath = this.closePath, e;
  }
  /**
   * Checks whether the x and y coordinates passed to this function are contained within this polygon.
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this polygon.
   */
  contains(t, e) {
    let s = !1;
    const r = this.points.length / 2;
    for (let n = 0, a = r - 1; n < r; a = n++) {
      const o = this.points[n * 2], h = this.points[n * 2 + 1], l = this.points[a * 2], c = this.points[a * 2 + 1];
      h > e != c > e && t < (l - o) * ((e - h) / (c - h)) + o && (s = !s);
    }
    return s;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this polygon including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this polygon
   */
  strokeContains(t, e, s) {
    const r = s / 2, n = r * r, { points: a } = this;
    for (let o = 0; o < a.length; o += 2) {
      const h = a[o], l = a[o + 1], c = a[(o + 2) % a.length], u = a[(o + 3) % a.length];
      if (oo(t, e, h, l, c, u) <= n)
        return !0;
    }
    return !1;
  }
  /**
   * Returns the framing rectangle of the polygon as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(t) {
    t = t || new et();
    const e = this.points;
    let s = 1 / 0, r = -1 / 0, n = 1 / 0, a = -1 / 0;
    for (let o = 0, h = e.length; o < h; o += 2) {
      const l = e[o], c = e[o + 1];
      s = l < s ? l : s, r = l > r ? l : r, n = c < n ? c : n, a = c > a ? c : a;
    }
    return t.x = s, t.width = r - s, t.y = n, t.height = a - n, t;
  }
  /**
   * Copies another polygon to this one.
   * @param polygon - The polygon to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.points = t.points.slice(), this.closePath = t.closePath, this;
  }
  /**
   * Copies this polygon to another one.
   * @param polygon - The polygon to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((t, e) => `${t}, ${e}`, "")}]`;
  }
  /**
   * Get the last X coordinate of the polygon
   * @readonly
   */
  get lastX() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the last Y coordinate of the polygon
   * @readonly
   */
  get lastY() {
    return this.points[this.points.length - 1];
  }
  /**
   * Get the first X coordinate of the polygon
   * @readonly
   */
  get x() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the first Y coordinate of the polygon
   * @readonly
   */
  get y() {
    return this.points[this.points.length - 1];
  }
}
const ts = (i, t, e, s, r, n) => {
  const a = i - e, o = t - s, h = Math.sqrt(a * a + o * o);
  return h >= r - n && h <= r + n;
};
class ii {
  /**
   * @param x - The X coordinate of the upper-left corner of the rounded rectangle
   * @param y - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param width - The overall width of this rounded rectangle
   * @param height - The overall height of this rounded rectangle
   * @param radius - Controls the radius of the rounded corners
   */
  constructor(t = 0, e = 0, s = 0, r = 0, n = 20) {
    this.type = "roundedRectangle", this.x = t, this.y = e, this.width = s, this.height = r, this.radius = n;
  }
  /**
   * Returns the framing rectangle of the rounded rectangle as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(t) {
    return t = t || new et(), t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
  }
  /**
   * Creates a clone of this Rounded Rectangle.
   * @returns - A copy of the rounded rectangle.
   */
  clone() {
    return new ii(this.x, this.y, this.width, this.height, this.radius);
  }
  /**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
  }
  /**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this Rounded Rectangle.
   */
  contains(t, e) {
    if (this.width <= 0 || this.height <= 0)
      return !1;
    if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
      const s = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
      if (e >= this.y + s && e <= this.y + this.height - s || t >= this.x + s && t <= this.x + this.width - s)
        return !0;
      let r = t - (this.x + s), n = e - (this.y + s);
      const a = s * s;
      if (r * r + n * n <= a || (r = t - (this.x + this.width - s), r * r + n * n <= a) || (n = e - (this.y + this.height - s), r * r + n * n <= a) || (r = t - (this.x + s), r * r + n * n <= a))
        return !0;
    }
    return !1;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
   * @param pX - The X coordinate of the point to test
   * @param pY - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this rectangle
   */
  strokeContains(t, e, s) {
    const { x: r, y: n, width: a, height: o, radius: h } = this, l = s / 2, c = r + h, u = n + h, d = a - h * 2, m = o - h * 2, f = r + a, A = n + o;
    return (t >= r - l && t <= r + l || t >= f - l && t <= f + l) && e >= u && e <= u + m || (e >= n - l && e <= n + l || e >= A - l && e <= A + l) && t >= c && t <= c + d ? !0 : (
      // Top-left
      t < c && e < u && ts(t, e, c, u, h, l) || t > f - h && e < u && ts(t, e, f - h, u, h, l) || t > f - h && e > A - h && ts(t, e, f - h, A - h, h, l) || t < c && e > A - h && ts(t, e, c, A - h, h, l)
    );
  }
  toString() {
    return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
  }
}
var ut = /* @__PURE__ */ ((i) => (i[i.MAP_READ = 1] = "MAP_READ", i[i.MAP_WRITE = 2] = "MAP_WRITE", i[i.COPY_SRC = 4] = "COPY_SRC", i[i.COPY_DST = 8] = "COPY_DST", i[i.INDEX = 16] = "INDEX", i[i.VERTEX = 32] = "VERTEX", i[i.UNIFORM = 64] = "UNIFORM", i[i.STORAGE = 128] = "STORAGE", i[i.INDIRECT = 256] = "INDIRECT", i[i.QUERY_RESOLVE = 512] = "QUERY_RESOLVE", i[i.STATIC = 1024] = "STATIC", i))(ut || {});
class We extends te {
  /**
   * Creates a new Buffer with the given options
   * @param options - the options for the buffer
   */
  constructor(t) {
    let { data: e, size: s } = t;
    const { usage: r, label: n, shrinkToFit: a } = t;
    super(), this.uid = nt("buffer"), this._resourceType = "buffer", this._resourceId = nt("resource"), this._touched = 0, this._updateID = 1, this.shrinkToFit = !0, e instanceof Array && (e = new Float32Array(e)), this._data = e, s = s ?? (e == null ? void 0 : e.byteLength);
    const o = !!e;
    this.descriptor = {
      size: s,
      usage: r,
      mappedAtCreation: o,
      label: n
    }, this.shrinkToFit = a ?? !0;
  }
  /** the data in the buffer */
  get data() {
    return this._data;
  }
  set data(t) {
    this.setDataWithSize(t, t.length, !0);
  }
  /** whether the buffer is static or not */
  get static() {
    return !!(this.descriptor.usage & ut.STATIC);
  }
  set static(t) {
    t ? this.descriptor.usage |= ut.STATIC : this.descriptor.usage &= ~ut.STATIC;
  }
  /**
   * Sets the data in the buffer to the given value. This will immediately update the buffer on the GPU.
   * If you only want to update a subset of the buffer, you can pass in the size of the data.
   * @param value - the data to set
   * @param size - the size of the data in bytes
   * @param syncGPU - should the buffer be updated on the GPU immediately?
   */
  setDataWithSize(t, e, s) {
    if (this._updateID++, this._updateSize = e * t.BYTES_PER_ELEMENT, this._data === t) {
      s && this.emit("update", this);
      return;
    }
    const r = this._data;
    if (this._data = t, r.length !== t.length) {
      !this.shrinkToFit && t.byteLength < r.byteLength ? s && this.emit("update", this) : (this.descriptor.size = t.byteLength, this._resourceId = nt("resource"), this.emit("change", this));
      return;
    }
    s && this.emit("update", this);
  }
  /**
   * updates the buffer on the GPU to reflect the data in the buffer.
   * By default it will update the entire buffer. If you only want to update a subset of the buffer,
   * you can pass in the size of the buffer to update.
   * @param sizeInBytes - the new size of the buffer in bytes
   */
  update(t) {
    this._updateSize = t ?? this._updateSize, this._updateID++, this.emit("update", this);
  }
  /** Destroys the buffer */
  destroy() {
    this.emit("destroy", this), this._data = null, this.descriptor = null, this.removeAllListeners();
  }
}
function Kr(i, t) {
  if (!(i instanceof We)) {
    let e = t ? ut.INDEX : ut.VERTEX;
    i instanceof Array && (t ? (i = new Uint32Array(i), e = ut.INDEX | ut.COPY_DST) : (i = new Float32Array(i), e = ut.VERTEX | ut.COPY_DST)), i = new We({
      data: i,
      label: t ? "index-mesh-buffer" : "vertex-mesh-buffer",
      usage: e
    });
  }
  return i;
}
function ho(i, t, e) {
  const s = i.getAttribute(t);
  if (!s)
    return e.minX = 0, e.minY = 0, e.maxX = 0, e.maxY = 0, e;
  const r = s.buffer.data;
  let n = 1 / 0, a = 1 / 0, o = -1 / 0, h = -1 / 0;
  const l = r.BYTES_PER_ELEMENT, c = (s.offset || 0) / l, u = (s.stride || 2 * 4) / l;
  for (let d = c; d < r.length; d += u) {
    const m = r[d], f = r[d + 1];
    m > o && (o = m), f > h && (h = f), m < n && (n = m), f < a && (a = f);
  }
  return e.minX = n, e.minY = a, e.maxX = o, e.maxY = h, e;
}
function co(i) {
  return (i instanceof We || Array.isArray(i) || i.BYTES_PER_ELEMENT) && (i = {
    buffer: i
  }), i.buffer = Kr(i.buffer, !1), i;
}
class lo extends te {
  /**
   * Create a new instance of a geometry
   * @param options - The options for the geometry.
   */
  constructor(t) {
    const { attributes: e, indexBuffer: s, topology: r } = t;
    super(), this.uid = nt("geometry"), this._layoutKey = 0, this.instanceCount = 1, this._bounds = new Ot(), this._boundsDirty = !0, this.attributes = e, this.buffers = [], this.instanceCount = t.instanceCount || 1;
    for (const n in e) {
      const a = e[n] = co(e[n]);
      this.buffers.indexOf(a.buffer) === -1 && (this.buffers.push(a.buffer), a.buffer.on("update", this.onBufferUpdate, this), a.buffer.on("change", this.onBufferUpdate, this));
    }
    s && (this.indexBuffer = Kr(s, !0), this.buffers.push(this.indexBuffer)), this.topology = r || "triangle-list";
  }
  onBufferUpdate() {
    this._boundsDirty = !0, this.emit("update", this);
  }
  /**
   * Returns the requested attribute.
   * @param id - The name of the attribute required
   * @returns - The attribute requested.
   */
  getAttribute(t) {
    return this.attributes[t];
  }
  /**
   * Returns the index buffer
   * @returns - The index buffer.
   */
  getIndex() {
    return this.indexBuffer;
  }
  /**
   * Returns the requested buffer.
   * @param id - The name of the buffer required.
   * @returns - The buffer requested.
   */
  getBuffer(t) {
    return this.getAttribute(t).buffer;
  }
  /**
   * Used to figure out how many vertices there are in this geometry
   * @returns the number of vertices in the geometry
   */
  getSize() {
    for (const t in this.attributes) {
      const e = this.attributes[t];
      return e.buffer.data.length / (e.stride / 4 || e.size);
    }
    return 0;
  }
  /** Returns the bounds of the geometry. */
  get bounds() {
    return this._boundsDirty ? (this._boundsDirty = !1, ho(this, "aPosition", this._bounds)) : this._bounds;
  }
  /**
   * destroys the geometry.
   * @param destroyBuffers - destroy the buffers associated with this geometry
   */
  destroy(t = !1) {
    this.emit("destroy", this), this.removeAllListeners(), t && this.buffers.forEach((e) => e.destroy()), this.attributes = null, this.buffers = null, this.indexBuffer = null, this._bounds = null;
  }
}
const uo = new Float32Array(1), fo = new Uint32Array(1);
class po extends lo {
  constructor() {
    const e = new We({
      data: uo,
      label: "attribute-batch-buffer",
      usage: ut.VERTEX | ut.COPY_DST,
      shrinkToFit: !1
    }), s = new We({
      data: fo,
      label: "index-batch-buffer",
      usage: ut.INDEX | ut.COPY_DST,
      // | BufferUsage.STATIC,
      shrinkToFit: !1
    }), r = 6 * 4;
    super({
      attributes: {
        aPosition: {
          buffer: e,
          format: "float32x2",
          stride: r,
          offset: 0,
          location: 1
        },
        aUV: {
          buffer: e,
          format: "float32x2",
          stride: r,
          offset: 2 * 4,
          location: 3
        },
        aColor: {
          buffer: e,
          format: "unorm8x4",
          stride: r,
          offset: 4 * 4,
          location: 0
        },
        aTextureIdAndRound: {
          buffer: e,
          format: "uint16x2",
          stride: r,
          offset: 5 * 4,
          location: 2
        }
      },
      indexBuffer: s
    });
  }
}
const Jr = 16, Zr = {};
function mo(i, t) {
  let e = 0;
  for (let s = 0; s < t; s++)
    e = e * 31 + i[s].uid >>> 0;
  return Zr[e] || go(i, e);
}
function go(i, t) {
  const e = {};
  let s = 0;
  for (let n = 0; n < Jr; n++) {
    const a = n < i.length ? i[n] : H.EMPTY.source;
    e[s++] = a.source, e[s++] = a.style;
  }
  const r = new Ta(e);
  return Zr[t] = r, r;
}
class Wi {
  constructor(t) {
    typeof t == "number" ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData), this.size = this.rawBinaryData.byteLength;
  }
  /** View on the raw binary data as a `Int8Array`. */
  get int8View() {
    return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
  }
  /** View on the raw binary data as a `Uint8Array`. */
  get uint8View() {
    return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
  }
  /**  View on the raw binary data as a `Int16Array`. */
  get int16View() {
    return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
  }
  /** View on the raw binary data as a `Int32Array`. */
  get int32View() {
    return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
  }
  /** View on the raw binary data as a `Float64Array`. */
  get float64View() {
    return this._float64Array || (this._float64Array = new Float64Array(this.rawBinaryData)), this._float64Array;
  }
  /** View on the raw binary data as a `BigUint64Array`. */
  get bigUint64View() {
    return this._bigUint64Array || (this._bigUint64Array = new BigUint64Array(this.rawBinaryData)), this._bigUint64Array;
  }
  /**
   * Returns the view of the given type.
   * @param type - One of `int8`, `uint8`, `int16`,
   *    `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - typed array of given type
   */
  view(t) {
    return this[`${t}View`];
  }
  /** Destroys all buffer references. Do not use after calling this. */
  destroy() {
    this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this.uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
  }
  /**
   * Returns the size of the given type in bytes.
   * @param type - One of `int8`, `uint8`, `int16`,
   *   `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - size of the type in bytes
   */
  static sizeOf(t) {
    switch (t) {
      case "int8":
      case "uint8":
        return 1;
      case "int16":
      case "uint16":
        return 2;
      case "int32":
      case "uint32":
      case "float32":
        return 4;
      default:
        throw new Error(`${t} isn't a valid view type`);
    }
  }
}
function Bi(i, t) {
  const e = i.byteLength / 8 | 0, s = new Float64Array(i, 0, e);
  new Float64Array(t, 0, e).set(s);
  const n = i.byteLength - e * 8;
  if (n > 0) {
    const a = new Uint8Array(i, e * 8, n);
    new Uint8Array(t, e * 8, n).set(a);
  }
}
const Ao = {
  normal: "normal-npm",
  add: "add-npm",
  screen: "screen-npm"
};
var Eo = /* @__PURE__ */ ((i) => (i[i.DISABLED = 0] = "DISABLED", i[i.RENDERING_MASK_ADD = 1] = "RENDERING_MASK_ADD", i[i.MASK_ACTIVE = 2] = "MASK_ACTIVE", i[i.RENDERING_MASK_REMOVE = 3] = "RENDERING_MASK_REMOVE", i[i.NONE = 4] = "NONE", i))(Eo || {});
function ki(i, t) {
  return t.alphaMode === "no-premultiply-alpha" && Ao[i] || i;
}
class Yi {
  constructor() {
    this.ids = /* @__PURE__ */ Object.create(null), this.textures = [], this.count = 0;
  }
  /** Clear the textures and their locations. */
  clear() {
    for (let t = 0; t < this.count; t++) {
      const e = this.textures[t];
      this.textures[t] = null, this.ids[e.uid] = null;
    }
    this.count = 0;
  }
}
class Ui {
  constructor() {
    this.renderPipeId = "batch", this.action = "startBatch", this.start = 0, this.size = 0, this.blendMode = "normal", this.canBundle = !0;
  }
  destroy() {
    this.textures = null, this.gpuBindGroup = null, this.bindGroup = null, this.batcher = null;
  }
}
let Te = 0;
const tn = class en {
  constructor(t = {}) {
    this.uid = nt("batcher"), this.dirty = !0, this.batchIndex = 0, this.batches = [], this._vertexSize = 6, this._elements = [], this._batchPool = [], this._batchPoolIndex = 0, this._textureBatchPool = [], this._textureBatchPoolIndex = 0, t = { ...en.defaultOptions, ...t };
    const { vertexSize: e, indexSize: s } = t;
    this.attributeBuffer = new Wi(e * this._vertexSize * 4), this.indexBuffer = new Uint16Array(s);
  }
  begin() {
    this.batchIndex = 0, this.elementSize = 0, this.elementStart = 0, this.indexSize = 0, this.attributeSize = 0, this._batchPoolIndex = 0, this._textureBatchPoolIndex = 0, this._batchIndexStart = 0, this._batchIndexSize = 0, this.dirty = !0;
  }
  add(t) {
    this._elements[this.elementSize++] = t, t.indexStart = this.indexSize, t.location = this.attributeSize, t.batcher = this, this.indexSize += t.indexSize, this.attributeSize += t.vertexSize * this._vertexSize;
  }
  checkAndUpdateTexture(t, e) {
    const s = t.batch.textures.ids[e._source.uid];
    return !s && s !== 0 ? !1 : (t.textureId = s, t.texture = e, !0);
  }
  updateElement(t) {
    this.dirty = !0, t.packAttributes(
      this.attributeBuffer.float32View,
      this.attributeBuffer.uint32View,
      t.location,
      t.textureId
    );
  }
  /**
   * breaks the batcher. This happens when a batch gets too big,
   * or we need to switch to a different type of rendering (a filter for example)
   * @param instructionSet
   */
  break(t) {
    const e = this._elements;
    let s = this._textureBatchPool[this._textureBatchPoolIndex++] || new Yi();
    if (s.clear(), !e[this.elementStart])
      return;
    const r = e[this.elementStart];
    let n = ki(r.blendMode, r.texture._source);
    this.attributeSize * 4 > this.attributeBuffer.size && this._resizeAttributeBuffer(this.attributeSize * 4), this.indexSize > this.indexBuffer.length && this._resizeIndexBuffer(this.indexSize);
    const a = this.attributeBuffer.float32View, o = this.attributeBuffer.uint32View, h = this.indexBuffer;
    let l = this._batchIndexSize, c = this._batchIndexStart, u = "startBatch", d = this._batchPool[this._batchPoolIndex++] || new Ui();
    for (let m = this.elementStart; m < this.elementSize; ++m) {
      const f = e[m];
      e[m] = null;
      const g = f.texture._source, y = ki(f.blendMode, g), E = n !== y;
      if (g._batchTick === Te && !E) {
        f.textureId = g._textureBindLocation, l += f.indexSize, f.packAttributes(a, o, f.location, f.textureId), f.packIndex(h, f.indexStart, f.location / this._vertexSize), f.batch = d;
        continue;
      }
      g._batchTick = Te, (s.count >= Jr || E) && (this._finishBatch(
        d,
        c,
        l - c,
        s,
        n,
        t,
        u
      ), u = "renderBatch", c = l, n = y, s = this._textureBatchPool[this._textureBatchPoolIndex++] || new Yi(), s.clear(), d = this._batchPool[this._batchPoolIndex++] || new Ui(), ++Te), f.textureId = g._textureBindLocation = s.count, s.ids[g.uid] = s.count, s.textures[s.count++] = g, f.batch = d, l += f.indexSize, f.packAttributes(a, o, f.location, f.textureId), f.packIndex(h, f.indexStart, f.location / this._vertexSize);
    }
    s.count > 0 && (this._finishBatch(
      d,
      c,
      l - c,
      s,
      n,
      t,
      u
    ), c = l, ++Te), this.elementStart = this.elementSize, this._batchIndexStart = c, this._batchIndexSize = l;
  }
  _finishBatch(t, e, s, r, n, a, o) {
    t.gpuBindGroup = null, t.action = o, t.batcher = this, t.textures = r, t.blendMode = n, t.start = e, t.size = s, ++Te, a.add(t);
  }
  finish(t) {
    this.break(t);
  }
  /**
   * Resizes the attribute buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureAttributeBuffer(t) {
    t * 4 <= this.attributeBuffer.size || this._resizeAttributeBuffer(t * 4);
  }
  /**
   * Resizes the index buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureIndexBuffer(t) {
    t <= this.indexBuffer.length || this._resizeIndexBuffer(t);
  }
  _resizeAttributeBuffer(t) {
    const e = Math.max(t, this.attributeBuffer.size * 2), s = new Wi(e);
    Bi(this.attributeBuffer.rawBinaryData, s.rawBinaryData), this.attributeBuffer = s;
  }
  _resizeIndexBuffer(t) {
    const e = this.indexBuffer;
    let s = Math.max(t, e.length * 1.5);
    s += s % 2;
    const r = s > 65535 ? new Uint32Array(s) : new Uint16Array(s);
    if (r.BYTES_PER_ELEMENT !== e.BYTES_PER_ELEMENT)
      for (let n = 0; n < e.length; n++)
        r[n] = e[n];
    else
      Bi(e.buffer, r.buffer);
    this.indexBuffer = r;
  }
  destroy() {
    for (let t = 0; t < this.batches.length; t++)
      this.batches[t].destroy();
    this.batches = null;
    for (let t = 0; t < this._elements.length; t++)
      this._elements[t].batch = null;
    this._elements = null, this.indexBuffer = null, this.attributeBuffer.destroy(), this.attributeBuffer = null;
  }
};
tn.defaultOptions = {
  vertexSize: 4,
  indexSize: 6
};
let yo = tn;
function xo(i, t, e, s, r, n, a, o = null) {
  let h = 0;
  e *= t, r *= n;
  const l = o.a, c = o.b, u = o.c, d = o.d, m = o.tx, f = o.ty;
  for (; h < a; ) {
    const A = i[e], g = i[e + 1];
    s[r] = l * A + u * g + m, s[r + 1] = c * A + d * g + f, r += n, e += t, h++;
  }
}
function So(i, t, e, s) {
  let r = 0;
  for (t *= e; r < s; )
    i[t] = 0, i[t + 1] = 0, t += e, r++;
}
function sn(i, t, e, s, r) {
  const n = t.a, a = t.b, o = t.c, h = t.d, l = t.tx, c = t.ty;
  e = e || 0, s = s || 2, r = r || i.length / s - e;
  let u = e * s;
  for (let d = 0; d < r; d++) {
    const m = i[u], f = i[u + 1];
    i[u] = n * m + o * f + l, i[u + 1] = a * m + h * f + c, u += s;
  }
}
function To(i, t, e) {
  const s = i >> 16 & 255, r = i >> 8 & 255, n = i & 255, a = t >> 16 & 255, o = t >> 8 & 255, h = t & 255, l = s + (a - s) * e, c = r + (o - r) * e, u = n + (h - n) * e;
  return (l << 16) + (c << 8) + u;
}
const Ro = 33554430;
function bo(i, t) {
  return i + (t << 32) !== Ro ? i === 16777215 ? t : t === 16777215 ? i : To(i, t, 0.5) : 16777215;
}
class rn {
  constructor() {
    this.batcher = null, this.batch = null, this.applyTransform = !0, this.roundPixels = 0;
  }
  get blendMode() {
    return this.applyTransform ? this.renderable.groupBlendMode : "normal";
  }
  packIndex(t, e, s) {
    const r = this.geometryData.indices;
    for (let n = 0; n < this.indexSize; n++)
      t[e++] = r[n + this.indexOffset] + s - this.vertexOffset;
  }
  packAttributes(t, e, s, r) {
    const n = this.geometryData, a = this.renderable, o = n.vertices, h = n.uvs, l = this.vertexOffset * 2, c = (this.vertexOffset + this.vertexSize) * 2, u = this.color, d = u >> 16 | u & 65280 | (u & 255) << 16;
    if (this.applyTransform) {
      const m = bo(d, a.groupColor) + (this.alpha * a.groupAlpha * 255 << 24), f = a.groupTransform, A = r << 16 | this.roundPixels & 65535, g = f.a, y = f.b, E = f.c, x = f.d, S = f.tx, L = f.ty;
      for (let B = l; B < c; B += 2) {
        const C = o[B], M = o[B + 1];
        t[s] = g * C + E * M + S, t[s + 1] = y * C + x * M + L, t[s + 2] = h[B], t[s + 3] = h[B + 1], e[s + 4] = m, e[s + 5] = A, s += 6;
      }
    } else {
      const m = d + (this.alpha * 255 << 24);
      for (let f = l; f < c; f += 2)
        t[s] = o[f], t[s + 1] = o[f + 1], t[s + 2] = h[f], t[s + 3] = h[f + 1], e[s + 4] = m, e[s + 5] = r << 16, s += 6;
    }
  }
  // TODO rename to vertexSize
  get vertSize() {
    return this.vertexSize;
  }
  copyTo(t) {
    t.indexOffset = this.indexOffset, t.indexSize = this.indexSize, t.vertexOffset = this.vertexOffset, t.vertexSize = this.vertexSize, t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.geometryData = this.geometryData;
  }
  reset() {
    this.applyTransform = !0;
  }
}
const _s = {
  build(i, t) {
    let e, s, r, n, a, o;
    if (i.type === "circle") {
      const S = i;
      e = S.x, s = S.y, a = o = S.radius, r = n = 0;
    } else if (i.type === "ellipse") {
      const S = i;
      e = S.x, s = S.y, a = S.halfWidth, o = S.halfHeight, r = n = 0;
    } else {
      const S = i, L = S.width / 2, B = S.height / 2;
      e = S.x + L, s = S.y + B, a = o = Math.max(0, Math.min(S.radius, Math.min(L, B))), r = L - a, n = B - o;
    }
    if (!(a >= 0 && o >= 0 && r >= 0 && n >= 0))
      return t;
    const h = Math.ceil(2.3 * Math.sqrt(a + o)), l = h * 8 + (r ? 4 : 0) + (n ? 4 : 0);
    if (l === 0)
      return t;
    if (h === 0)
      return t[0] = t[6] = e + r, t[1] = t[3] = s + n, t[2] = t[4] = e - r, t[5] = t[7] = s - n, t;
    let c = 0, u = h * 4 + (r ? 2 : 0) + 2, d = u, m = l, f = r + a, A = n, g = e + f, y = e - f, E = s + A;
    if (t[c++] = g, t[c++] = E, t[--u] = E, t[--u] = y, n) {
      const S = s - A;
      t[d++] = y, t[d++] = S, t[--m] = S, t[--m] = g;
    }
    for (let S = 1; S < h; S++) {
      const L = Math.PI / 2 * (S / h), B = r + Math.cos(L) * a, C = n + Math.sin(L) * o, M = e + B, _ = e - B, N = s + C, q = s - C;
      t[c++] = M, t[c++] = N, t[--u] = N, t[--u] = _, t[d++] = _, t[d++] = q, t[--m] = q, t[--m] = M;
    }
    f = r, A = n + o, g = e + f, y = e - f, E = s + A;
    const x = s - A;
    return t[c++] = g, t[c++] = E, t[--m] = x, t[--m] = g, r && (t[c++] = y, t[c++] = E, t[--m] = x, t[--m] = y), t;
  },
  triangulate(i, t, e, s, r, n) {
    if (i.length === 0)
      return;
    let a = 0, o = 0;
    for (let c = 0; c < i.length; c += 2)
      a += i[c], o += i[c + 1];
    a /= i.length / 2, o /= i.length / 2;
    let h = s;
    t[h * e] = a, t[h * e + 1] = o;
    const l = h++;
    for (let c = 0; c < i.length; c += 2)
      t[h * e] = i[c], t[h * e + 1] = i[c + 1], c > 0 && (r[n++] = h, r[n++] = l, r[n++] = h - 1), h++;
    r[n++] = l + 1, r[n++] = l, r[n++] = h - 1;
  }
}, _o = 1e-4, Fi = 1e-4;
function No(i) {
  const t = i.length;
  if (t < 6)
    return 1;
  let e = 0;
  for (let s = 0, r = i[t - 2], n = i[t - 1]; s < t; s += 2) {
    const a = i[s], o = i[s + 1];
    e += (a - r) * (o + n), r = a, n = o;
  }
  return e < 0 ? -1 : 1;
}
function Gi(i, t, e, s, r, n, a, o) {
  const h = i - e * r, l = t - s * r, c = i + e * n, u = t + s * n;
  let d, m;
  a ? (d = s, m = -e) : (d = -s, m = e);
  const f = h + d, A = l + m, g = c + d, y = u + m;
  return o.push(f, A), o.push(g, y), 2;
}
function zt(i, t, e, s, r, n, a, o) {
  const h = e - i, l = s - t;
  let c = Math.atan2(h, l), u = Math.atan2(r - i, n - t);
  o && c < u ? c += Math.PI * 2 : !o && c > u && (u += Math.PI * 2);
  let d = c;
  const m = u - c, f = Math.abs(m), A = Math.sqrt(h * h + l * l), g = (15 * f * Math.sqrt(A) / Math.PI >> 0) + 1, y = m / g;
  if (d += y, o) {
    a.push(i, t), a.push(e, s);
    for (let E = 1, x = d; E < g; E++, x += y)
      a.push(i, t), a.push(
        i + Math.sin(x) * A,
        t + Math.cos(x) * A
      );
    a.push(i, t), a.push(r, n);
  } else {
    a.push(e, s), a.push(i, t);
    for (let E = 1, x = d; E < g; E++, x += y)
      a.push(
        i + Math.sin(x) * A,
        t + Math.cos(x) * A
      ), a.push(i, t);
    a.push(r, n), a.push(i, t);
  }
  return g * 2;
}
function Io(i, t, e, s, r, n, a, o, h) {
  const l = _o;
  if (i.length === 0)
    return;
  const c = t;
  let u = c.alignment;
  if (t.alignment !== 0.5) {
    let G = No(i);
    e && (G *= -1), u = (u - 0.5) * G + 0.5;
  }
  const d = new rt(i[0], i[1]), m = new rt(i[i.length - 2], i[i.length - 1]), f = s, A = Math.abs(d.x - m.x) < l && Math.abs(d.y - m.y) < l;
  if (f) {
    i = i.slice(), A && (i.pop(), i.pop(), m.set(i[i.length - 2], i[i.length - 1]));
    const G = (d.x + m.x) * 0.5, Wt = (m.y + d.y) * 0.5;
    i.unshift(G, Wt), i.push(G, Wt);
  }
  const g = r, y = i.length / 2;
  let E = i.length;
  const x = g.length / 2, S = c.width / 2, L = S * S, B = c.miterLimit * c.miterLimit;
  let C = i[0], M = i[1], _ = i[2], N = i[3], q = 0, Mt = 0, w = -(M - N), D = C - _, X = 0, K = 0, St = Math.sqrt(w * w + D * D);
  w /= St, D /= St, w *= S, D *= S;
  const di = u, P = (1 - di) * 2, W = di * 2;
  f || (c.cap === "round" ? E += zt(
    C - w * (P - W) * 0.5,
    M - D * (P - W) * 0.5,
    C - w * P,
    M - D * P,
    C + w * W,
    M + D * W,
    g,
    !0
  ) + 2 : c.cap === "square" && (E += Gi(C, M, w, D, P, W, !0, g))), g.push(
    C - w * P,
    M - D * P
  ), g.push(
    C + w * W,
    M + D * W
  );
  for (let G = 1; G < y - 1; ++G) {
    C = i[(G - 1) * 2], M = i[(G - 1) * 2 + 1], _ = i[G * 2], N = i[G * 2 + 1], q = i[(G + 1) * 2], Mt = i[(G + 1) * 2 + 1], w = -(M - N), D = C - _, St = Math.sqrt(w * w + D * D), w /= St, D /= St, w *= S, D *= S, X = -(N - Mt), K = _ - q, St = Math.sqrt(X * X + K * K), X /= St, K /= St, X *= S, K *= S;
    const Wt = _ - C, ge = M - N, Ae = _ - q, Ee = Mt - N, fi = Wt * Ae + ge * Ee, Ve = ge * Ae - Ee * Wt, ye = Ve < 0;
    if (Math.abs(Ve) < 1e-3 * Math.abs(fi)) {
      g.push(
        _ - w * P,
        N - D * P
      ), g.push(
        _ + w * W,
        N + D * W
      ), fi >= 0 && (c.join === "round" ? E += zt(
        _,
        N,
        _ - w * P,
        N - D * P,
        _ - X * P,
        N - K * P,
        g,
        !1
      ) + 4 : E += 2, g.push(
        _ - X * W,
        N - K * W
      ), g.push(
        _ + X * P,
        N + K * P
      ));
      continue;
    }
    const pi = (-w + C) * (-D + N) - (-w + _) * (-D + M), mi = (-X + q) * (-K + N) - (-X + _) * (-K + Mt), ze = (Wt * mi - Ae * pi) / Ve, Xe = (Ee * pi - ge * mi) / Ve, us = (ze - _) * (ze - _) + (Xe - N) * (Xe - N), Ft = _ + (ze - _) * P, Gt = N + (Xe - N) * P, Ht = _ - (ze - _) * W, Vt = N - (Xe - N) * W, yn = Math.min(Wt * Wt + ge * ge, Ae * Ae + Ee * Ee), gi = ye ? P : W, xn = yn + gi * gi * L;
    us <= xn ? c.join === "bevel" || us / L > B ? (ye ? (g.push(Ft, Gt), g.push(_ + w * W, N + D * W), g.push(Ft, Gt), g.push(_ + X * W, N + K * W)) : (g.push(_ - w * P, N - D * P), g.push(Ht, Vt), g.push(_ - X * P, N - K * P), g.push(Ht, Vt)), E += 2) : c.join === "round" ? ye ? (g.push(Ft, Gt), g.push(_ + w * W, N + D * W), E += zt(
      _,
      N,
      _ + w * W,
      N + D * W,
      _ + X * W,
      N + K * W,
      g,
      !0
    ) + 4, g.push(Ft, Gt), g.push(_ + X * W, N + K * W)) : (g.push(_ - w * P, N - D * P), g.push(Ht, Vt), E += zt(
      _,
      N,
      _ - w * P,
      N - D * P,
      _ - X * P,
      N - K * P,
      g,
      !1
    ) + 4, g.push(_ - X * P, N - K * P), g.push(Ht, Vt)) : (g.push(Ft, Gt), g.push(Ht, Vt)) : (g.push(_ - w * P, N - D * P), g.push(_ + w * W, N + D * W), c.join === "round" ? ye ? E += zt(
      _,
      N,
      _ + w * W,
      N + D * W,
      _ + X * W,
      N + K * W,
      g,
      !0
    ) + 2 : E += zt(
      _,
      N,
      _ - w * P,
      N - D * P,
      _ - X * P,
      N - K * P,
      g,
      !1
    ) + 2 : c.join === "miter" && us / L <= B && (ye ? (g.push(Ht, Vt), g.push(Ht, Vt)) : (g.push(Ft, Gt), g.push(Ft, Gt)), E += 2), g.push(_ - X * P, N - K * P), g.push(_ + X * W, N + K * W), E += 2);
  }
  C = i[(y - 2) * 2], M = i[(y - 2) * 2 + 1], _ = i[(y - 1) * 2], N = i[(y - 1) * 2 + 1], w = -(M - N), D = C - _, St = Math.sqrt(w * w + D * D), w /= St, D /= St, w *= S, D *= S, g.push(_ - w * P, N - D * P), g.push(_ + w * W, N + D * W), f || (c.cap === "round" ? E += zt(
    _ - w * (P - W) * 0.5,
    N - D * (P - W) * 0.5,
    _ - w * P,
    N - D * P,
    _ + w * W,
    N + D * W,
    g,
    !1
  ) + 2 : c.cap === "square" && (E += Gi(_, N, w, D, P, W, !1, g)));
  const En = Fi * Fi;
  for (let G = x; G < E + x - 2; ++G)
    C = g[G * 2], M = g[G * 2 + 1], _ = g[(G + 1) * 2], N = g[(G + 1) * 2 + 1], q = g[(G + 2) * 2], Mt = g[(G + 2) * 2 + 1], !(Math.abs(C * (N - Mt) + _ * (Mt - M) + q * (M - N)) < En) && o.push(G, G + 1, G + 2);
}
var ri = { exports: {} };
ri.exports = cs;
ri.exports.default = cs;
function cs(i, t, e) {
  e = e || 2;
  var s = t && t.length, r = s ? t[0] * e : i.length, n = nn(i, 0, r, e, !0), a = [];
  if (!n || n.next === n.prev)
    return a;
  var o, h, l, c, u, d, m;
  if (s && (n = Po(i, t, n, e)), i.length > 80 * e) {
    o = l = i[0], h = c = i[1];
    for (var f = e; f < r; f += e)
      u = i[f], d = i[f + 1], u < o && (o = u), d < h && (h = d), u > l && (l = u), d > c && (c = d);
    m = Math.max(l - o, c - h), m = m !== 0 ? 32767 / m : 0;
  }
  return Be(n, a, e, o, h, m, 0), a;
}
function nn(i, t, e, s, r) {
  var n, a;
  if (r === Fs(i, t, e, s) > 0)
    for (n = t; n < e; n += s)
      a = Hi(n, i[n], i[n + 1], a);
  else
    for (n = e - s; n >= t; n -= s)
      a = Hi(n, i[n], i[n + 1], a);
  return a && ls(a, a.next) && (Ye(a), a = a.next), a;
}
function Zt(i, t) {
  if (!i)
    return i;
  t || (t = i);
  var e = i, s;
  do
    if (s = !1, !e.steiner && (ls(e, e.next) || Q(e.prev, e, e.next) === 0)) {
      if (Ye(e), e = t = e.prev, e === e.next)
        break;
      s = !0;
    } else
      e = e.next;
  while (s || e !== t);
  return t;
}
function Be(i, t, e, s, r, n, a) {
  if (i) {
    !a && n && Bo(i, s, r, n);
    for (var o = i, h, l; i.prev !== i.next; ) {
      if (h = i.prev, l = i.next, n ? Mo(i, s, r, n) : Co(i)) {
        t.push(h.i / e | 0), t.push(i.i / e | 0), t.push(l.i / e | 0), Ye(i), i = l.next, o = l.next;
        continue;
      }
      if (i = l, i === o) {
        a ? a === 1 ? (i = Lo(Zt(i), t, e), Be(i, t, e, s, r, n, 2)) : a === 2 && vo(i, t, e, s, r, n) : Be(Zt(i), t, e, s, r, n, 1);
        break;
      }
    }
  }
}
function Co(i) {
  var t = i.prev, e = i, s = i.next;
  if (Q(t, e, s) >= 0)
    return !1;
  for (var r = t.x, n = e.x, a = s.x, o = t.y, h = e.y, l = s.y, c = r < n ? r < a ? r : a : n < a ? n : a, u = o < h ? o < l ? o : l : h < l ? h : l, d = r > n ? r > a ? r : a : n > a ? n : a, m = o > h ? o > l ? o : l : h > l ? h : l, f = s.next; f !== t; ) {
    if (f.x >= c && f.x <= d && f.y >= u && f.y <= m && ie(r, o, n, h, a, l, f.x, f.y) && Q(f.prev, f, f.next) >= 0)
      return !1;
    f = f.next;
  }
  return !0;
}
function Mo(i, t, e, s) {
  var r = i.prev, n = i, a = i.next;
  if (Q(r, n, a) >= 0)
    return !1;
  for (var o = r.x, h = n.x, l = a.x, c = r.y, u = n.y, d = a.y, m = o < h ? o < l ? o : l : h < l ? h : l, f = c < u ? c < d ? c : d : u < d ? u : d, A = o > h ? o > l ? o : l : h > l ? h : l, g = c > u ? c > d ? c : d : u > d ? u : d, y = Ys(m, f, t, e, s), E = Ys(A, g, t, e, s), x = i.prevZ, S = i.nextZ; x && x.z >= y && S && S.z <= E; ) {
    if (x.x >= m && x.x <= A && x.y >= f && x.y <= g && x !== r && x !== a && ie(o, c, h, u, l, d, x.x, x.y) && Q(x.prev, x, x.next) >= 0 || (x = x.prevZ, S.x >= m && S.x <= A && S.y >= f && S.y <= g && S !== r && S !== a && ie(o, c, h, u, l, d, S.x, S.y) && Q(S.prev, S, S.next) >= 0))
      return !1;
    S = S.nextZ;
  }
  for (; x && x.z >= y; ) {
    if (x.x >= m && x.x <= A && x.y >= f && x.y <= g && x !== r && x !== a && ie(o, c, h, u, l, d, x.x, x.y) && Q(x.prev, x, x.next) >= 0)
      return !1;
    x = x.prevZ;
  }
  for (; S && S.z <= E; ) {
    if (S.x >= m && S.x <= A && S.y >= f && S.y <= g && S !== r && S !== a && ie(o, c, h, u, l, d, S.x, S.y) && Q(S.prev, S, S.next) >= 0)
      return !1;
    S = S.nextZ;
  }
  return !0;
}
function Lo(i, t, e) {
  var s = i;
  do {
    var r = s.prev, n = s.next.next;
    !ls(r, n) && an(r, s, s.next, n) && ke(r, n) && ke(n, r) && (t.push(r.i / e | 0), t.push(s.i / e | 0), t.push(n.i / e | 0), Ye(s), Ye(s.next), s = i = n), s = s.next;
  } while (s !== i);
  return Zt(s);
}
function vo(i, t, e, s, r, n) {
  var a = i;
  do {
    for (var o = a.next.next; o !== a.prev; ) {
      if (a.i !== o.i && Uo(a, o)) {
        var h = on(a, o);
        a = Zt(a, a.next), h = Zt(h, h.next), Be(a, t, e, s, r, n, 0), Be(h, t, e, s, r, n, 0);
        return;
      }
      o = o.next;
    }
    a = a.next;
  } while (a !== i);
}
function Po(i, t, e, s) {
  var r = [], n, a, o, h, l;
  for (n = 0, a = t.length; n < a; n++)
    o = t[n] * s, h = n < a - 1 ? t[n + 1] * s : i.length, l = nn(i, o, h, s, !1), l === l.next && (l.steiner = !0), r.push(Yo(l));
  for (r.sort(Do), n = 0; n < r.length; n++)
    e = wo(r[n], e);
  return e;
}
function Do(i, t) {
  return i.x - t.x;
}
function wo(i, t) {
  var e = Oo(i, t);
  if (!e)
    return t;
  var s = on(e, i);
  return Zt(s, s.next), Zt(e, e.next);
}
function Oo(i, t) {
  var e = t, s = i.x, r = i.y, n = -1 / 0, a;
  do {
    if (r <= e.y && r >= e.next.y && e.next.y !== e.y) {
      var o = e.x + (r - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (o <= s && o > n && (n = o, a = e.x < e.next.x ? e : e.next, o === s))
        return a;
    }
    e = e.next;
  } while (e !== t);
  if (!a)
    return null;
  var h = a, l = a.x, c = a.y, u = 1 / 0, d;
  e = a;
  do
    s >= e.x && e.x >= l && s !== e.x && ie(r < c ? s : n, r, l, c, r < c ? n : s, r, e.x, e.y) && (d = Math.abs(r - e.y) / (s - e.x), ke(e, i) && (d < u || d === u && (e.x > a.x || e.x === a.x && Wo(a, e))) && (a = e, u = d)), e = e.next;
  while (e !== h);
  return a;
}
function Wo(i, t) {
  return Q(i.prev, i, t.prev) < 0 && Q(t.next, i, i.next) < 0;
}
function Bo(i, t, e, s) {
  var r = i;
  do
    r.z === 0 && (r.z = Ys(r.x, r.y, t, e, s)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== i);
  r.prevZ.nextZ = null, r.prevZ = null, ko(r);
}
function ko(i) {
  var t, e, s, r, n, a, o, h, l = 1;
  do {
    for (e = i, i = null, n = null, a = 0; e; ) {
      for (a++, s = e, o = 0, t = 0; t < l && (o++, s = s.nextZ, !!s); t++)
        ;
      for (h = l; o > 0 || h > 0 && s; )
        o !== 0 && (h === 0 || !s || e.z <= s.z) ? (r = e, e = e.nextZ, o--) : (r = s, s = s.nextZ, h--), n ? n.nextZ = r : i = r, r.prevZ = n, n = r;
      e = s;
    }
    n.nextZ = null, l *= 2;
  } while (a > 1);
  return i;
}
function Ys(i, t, e, s, r) {
  return i = (i - e) * r | 0, t = (t - s) * r | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
}
function Yo(i) {
  var t = i, e = i;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== i);
  return e;
}
function ie(i, t, e, s, r, n, a, o) {
  return (r - a) * (t - o) >= (i - a) * (n - o) && (i - a) * (s - o) >= (e - a) * (t - o) && (e - a) * (n - o) >= (r - a) * (s - o);
}
function Uo(i, t) {
  return i.next.i !== t.i && i.prev.i !== t.i && !Fo(i, t) && // dones't intersect other edges
  (ke(i, t) && ke(t, i) && Go(i, t) && // locally visible
  (Q(i.prev, i, t.prev) || Q(i, t.prev, t)) || // does not create opposite-facing sectors
  ls(i, t) && Q(i.prev, i, i.next) > 0 && Q(t.prev, t, t.next) > 0);
}
function Q(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function ls(i, t) {
  return i.x === t.x && i.y === t.y;
}
function an(i, t, e, s) {
  var r = ss(Q(i, t, e)), n = ss(Q(i, t, s)), a = ss(Q(e, s, i)), o = ss(Q(e, s, t));
  return !!(r !== n && a !== o || r === 0 && es(i, e, t) || n === 0 && es(i, s, t) || a === 0 && es(e, i, s) || o === 0 && es(e, t, s));
}
function es(i, t, e) {
  return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
}
function ss(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Fo(i, t) {
  var e = i;
  do {
    if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && an(e, e.next, i, t))
      return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function ke(i, t) {
  return Q(i.prev, i, i.next) < 0 ? Q(i, t, i.next) >= 0 && Q(i, i.prev, t) >= 0 : Q(i, t, i.prev) < 0 || Q(i, i.next, t) < 0;
}
function Go(i, t) {
  var e = i, s = !1, r = (i.x + t.x) / 2, n = (i.y + t.y) / 2;
  do
    e.y > n != e.next.y > n && e.next.y !== e.y && r < (e.next.x - e.x) * (n - e.y) / (e.next.y - e.y) + e.x && (s = !s), e = e.next;
  while (e !== i);
  return s;
}
function on(i, t) {
  var e = new Us(i.i, i.x, i.y), s = new Us(t.i, t.x, t.y), r = i.next, n = t.prev;
  return i.next = t, t.prev = i, e.next = r, r.prev = e, s.next = e, e.prev = s, n.next = s, s.prev = n, s;
}
function Hi(i, t, e, s) {
  var r = new Us(i, t, e);
  return s ? (r.next = s.next, r.prev = s, s.next.prev = r, s.next = r) : (r.prev = r, r.next = r), r;
}
function Ye(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function Us(i, t, e) {
  this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
cs.deviation = function(i, t, e, s) {
  var r = t && t.length, n = r ? t[0] * e : i.length, a = Math.abs(Fs(i, 0, n, e));
  if (r)
    for (var o = 0, h = t.length; o < h; o++) {
      var l = t[o] * e, c = o < h - 1 ? t[o + 1] * e : i.length;
      a -= Math.abs(Fs(i, l, c, e));
    }
  var u = 0;
  for (o = 0; o < s.length; o += 3) {
    var d = s[o] * e, m = s[o + 1] * e, f = s[o + 2] * e;
    u += Math.abs(
      (i[d] - i[f]) * (i[m + 1] - i[d + 1]) - (i[d] - i[m]) * (i[f + 1] - i[d + 1])
    );
  }
  return a === 0 && u === 0 ? 0 : Math.abs((u - a) / a);
};
function Fs(i, t, e, s) {
  for (var r = 0, n = t, a = e - s; n < e; n += s)
    r += (i[a] - i[n]) * (i[n + 1] + i[a + 1]), a = n;
  return r;
}
cs.flatten = function(i) {
  for (var t = i[0][0].length, e = { vertices: [], holes: [], dimensions: t }, s = 0, r = 0; r < i.length; r++) {
    for (var n = 0; n < i[r].length; n++)
      for (var a = 0; a < t; a++)
        e.vertices.push(i[r][n][a]);
    r > 0 && (s += i[r - 1].length, e.holes.push(s));
  }
  return e;
};
var Ho = ri.exports;
const Vo = /* @__PURE__ */ Ks(Ho);
function hn(i, t, e, s, r, n, a) {
  const o = Vo(i, t, 2);
  if (!o)
    return;
  for (let l = 0; l < o.length; l += 3)
    n[a++] = o[l] + r, n[a++] = o[l + 1] + r, n[a++] = o[l + 2] + r;
  let h = r * s;
  for (let l = 0; l < i.length; l += 2)
    e[h] = i[l], e[h + 1] = i[l + 1], h += s;
}
const zo = [], Xo = {
  build(i, t) {
    for (let e = 0; e < i.points.length; e++)
      t[e] = i.points[e];
    return t;
  },
  triangulate(i, t, e, s, r, n) {
    hn(i, zo, t, e, s, r, n);
  }
}, $o = {
  build(i, t) {
    const e = i, s = e.x, r = e.y, n = e.width, a = e.height;
    return n >= 0 && a >= 0 && (t[0] = s, t[1] = r, t[2] = s + n, t[3] = r, t[4] = s + n, t[5] = r + a, t[6] = s, t[7] = r + a), t;
  },
  triangulate(i, t, e, s, r, n) {
    let a = 0;
    s *= e, t[s + a] = i[0], t[s + a + 1] = i[1], a += e, t[s + a] = i[2], t[s + a + 1] = i[3], a += e, t[s + a] = i[6], t[s + a + 1] = i[7], a += e, t[s + a] = i[4], t[s + a + 1] = i[5], a += e;
    const o = s / e;
    r[n++] = o, r[n++] = o + 1, r[n++] = o + 2, r[n++] = o + 1, r[n++] = o + 3, r[n++] = o + 2;
  }
}, Qo = {
  build(i, t) {
    return t[0] = i.x, t[1] = i.y, t[2] = i.x2, t[3] = i.y2, t[4] = i.x3, t[5] = i.y3, t;
  },
  triangulate(i, t, e, s, r, n) {
    let a = 0;
    s *= e, t[s + a] = i[0], t[s + a + 1] = i[1], a += e, t[s + a] = i[2], t[s + a + 1] = i[3], a += e, t[s + a] = i[4], t[s + a + 1] = i[5];
    const o = s / e;
    r[n++] = o, r[n++] = o + 1, r[n++] = o + 2;
  }
}, ni = {
  rectangle: $o,
  polygon: Xo,
  triangle: Qo,
  circle: _s,
  ellipse: _s,
  roundedRectangle: _s
}, jo = new et();
function qo(i) {
  const r = {
    vertices: [],
    uvs: [],
    indices: []
  }, n = [];
  for (let a = 0; a < i.instructions.length; a++) {
    const o = i.instructions[a];
    if (o.action === "texture")
      Ko(o.data, n, r);
    else if (o.action === "fill" || o.action === "stroke") {
      const h = o.action === "stroke", l = o.data.path.shapePath, c = o.data.style, u = o.data.hole;
      h && u && Vi(u.shapePath, c, null, !0, n, r), Vi(l, c, u, h, n, r);
    }
  }
  return n;
}
function Ko(i, t, e) {
  const { vertices: s, uvs: r, indices: n } = e, a = n.length, o = s.length / 2, h = [], l = ni.rectangle, c = jo, u = i.image;
  c.x = i.dx, c.y = i.dy, c.width = i.dw, c.height = i.dh;
  const d = i.transform;
  l.build(c, h), d && sn(h, d), l.triangulate(h, s, 2, o, n, a);
  const m = u.uvs;
  r.push(
    m.x0,
    m.y0,
    m.x1,
    m.y1,
    m.x3,
    m.y3,
    m.x2,
    m.y2
  );
  const f = vt.get(rn);
  f.indexOffset = a, f.indexSize = n.length - a, f.vertexOffset = o, f.vertexSize = s.length / 2 - o, f.color = i.style, f.alpha = i.alpha, f.texture = u, f.geometryData = e, t.push(f);
}
function Vi(i, t, e, s, r, n) {
  const { vertices: a, uvs: o, indices: h } = n, l = i.shapePrimitives.length - 1;
  i.shapePrimitives.forEach(({ shape: c, transform: u }, d) => {
    const m = h.length, f = a.length / 2, A = [], g = ni[c.type];
    if (g.build(c, A), u && sn(A, u), s) {
      const S = c.closePath ?? !0;
      Io(A, t, !1, S, a, 2, f, h);
    } else if (e && l === d) {
      l !== 0 && console.warn("[Pixi Graphics] only the last shape have be cut out");
      const S = [], L = A.slice();
      Jo(e.shapePath).forEach((C) => {
        S.push(L.length / 2), L.push(...C);
      }), hn(L, S, a, 2, f, h, m);
    } else
      g.triangulate(A, a, 2, f, h, m);
    const y = o.length / 2, E = t.texture;
    if (E !== H.WHITE) {
      const S = t.matrix;
      u && S.append(u.clone().invert()), xo(a, 2, f, o, y, 2, a.length / 2 - f, S);
    } else
      So(o, y, 2, a.length / 2 - f);
    const x = vt.get(rn);
    x.indexOffset = m, x.indexSize = h.length - m, x.vertexOffset = f, x.vertexSize = a.length / 2 - f, x.color = t.color, x.alpha = t.alpha, x.texture = E, x.geometryData = n, r.push(x);
  });
}
function Jo(i) {
  if (!i)
    return [];
  const t = i.shapePrimitives, e = [];
  for (let s = 0; s < t.length; s++) {
    const r = t[s].shape, n = [];
    ni[r.type].build(r, n), e.push(n);
  }
  return e;
}
class Zo {
}
class th {
  constructor() {
    this.geometry = new po(), this.instructions = new Lr();
  }
  init() {
    this.instructions.reset();
  }
}
const ai = class Gs {
  constructor() {
    this._activeBatchers = [], this._gpuContextHash = {}, this._graphicsDataContextHash = /* @__PURE__ */ Object.create(null), this._needsContextNeedsRebuild = [];
  }
  /**
   * Runner init called, update the default options
   * @ignore
   */
  init(t) {
    Gs.defaultOptions.bezierSmoothness = (t == null ? void 0 : t.bezierSmoothness) ?? Gs.defaultOptions.bezierSmoothness;
  }
  prerender() {
    this._returnActiveBatchers();
  }
  getContextRenderData(t) {
    return this._graphicsDataContextHash[t.uid] || this._initContextRenderData(t);
  }
  // Context management functions
  updateGpuContext(t) {
    let e = this._gpuContextHash[t.uid] || this._initContext(t);
    if (t.dirty) {
      e ? this._cleanGraphicsContextData(t) : e = this._initContext(t);
      const s = qo(t);
      let r = 0;
      const n = t.batchMode;
      let a = !0;
      if (t.customShader || n === "no-batch")
        a = !1;
      else if (n === "auto") {
        for (let o = 0; o < s.length; o++)
          if (r += s[o].vertexSize, r > 400) {
            a = !1;
            break;
          }
      }
      e = this._gpuContextHash[t.uid] = {
        isBatchable: a,
        batches: s
      }, t.dirty = !1;
    }
    return e;
  }
  getGpuContext(t) {
    return this._gpuContextHash[t.uid] || this._initContext(t);
  }
  _returnActiveBatchers() {
    for (let t = 0; t < this._activeBatchers.length; t++)
      vt.return(this._activeBatchers[t]);
    this._activeBatchers.length = 0;
  }
  _initContextRenderData(t) {
    const e = vt.get(th), s = this._gpuContextHash[t.uid].batches;
    let r = 0, n = 0;
    s.forEach((l) => {
      l.applyTransform = !1, r += l.geometryData.vertices.length, n += l.geometryData.indices.length;
    });
    const a = vt.get(yo);
    this._activeBatchers.push(a), a.ensureAttributeBuffer(r), a.ensureIndexBuffer(n), a.begin();
    for (let l = 0; l < s.length; l++) {
      const c = s[l];
      a.add(c);
    }
    a.finish(e.instructions);
    const o = e.geometry;
    o.indexBuffer.setDataWithSize(a.indexBuffer, a.indexSize, !0), o.buffers[0].setDataWithSize(a.attributeBuffer.float32View, a.attributeSize, !0);
    const h = a.batches;
    for (let l = 0; l < h.length; l++) {
      const c = h[l];
      c.bindGroup = mo(c.textures.textures, c.textures.count);
    }
    return this._graphicsDataContextHash[t.uid] = e, e;
  }
  _initContext(t) {
    const e = new Zo();
    return this._gpuContextHash[t.uid] = e, t.on("update", this.onGraphicsContextUpdate, this), t.on("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid];
  }
  onGraphicsContextUpdate(t) {
    this._needsContextNeedsRebuild.push(t);
  }
  onGraphicsContextDestroy(t) {
    this._cleanGraphicsContextData(t), t.off("update", this.onGraphicsContextUpdate, this), t.off("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid] = null;
  }
  _cleanGraphicsContextData(t) {
    const e = this._gpuContextHash[t.uid];
    e.isBatchable || this._graphicsDataContextHash[t.uid] && (vt.return(this.getContextRenderData(t)), this._graphicsDataContextHash[t.uid] = null), e.batches && e.batches.forEach((s) => {
      vt.return(s);
    });
  }
  destroy() {
    for (const t of this._needsContextNeedsRebuild)
      this._gpuContextHash[t.uid] && this.onGraphicsContextDestroy(t);
    this._needsContextNeedsRebuild.length = 0;
  }
};
ai.extension = {
  type: [
    O.WebGLSystem,
    O.WebGPUSystem,
    O.CanvasSystem
  ],
  name: "graphicsContext"
};
ai.defaultOptions = {
  /**
   * A value from 0 to 1 that controls the smoothness of bezier curves (the higher the smoother)
   * @default 0.5
   */
  bezierSmoothness: 0.5
};
let cn = ai;
const eh = 8, is = 11920929e-14, sh = 1;
function ln(i, t, e, s, r, n, a, o, h, l) {
  const u = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, l ?? cn.defaultOptions.bezierSmoothness)
  );
  let d = (sh - u) / 1;
  return d *= d, ih(t, e, s, r, n, a, o, h, i, d), i;
}
function ih(i, t, e, s, r, n, a, o, h, l) {
  Hs(i, t, e, s, r, n, a, o, h, l, 0), h.push(a, o);
}
function Hs(i, t, e, s, r, n, a, o, h, l, c) {
  if (c > eh)
    return;
  const u = (i + e) / 2, d = (t + s) / 2, m = (e + r) / 2, f = (s + n) / 2, A = (r + a) / 2, g = (n + o) / 2, y = (u + m) / 2, E = (d + f) / 2, x = (m + A) / 2, S = (f + g) / 2, L = (y + x) / 2, B = (E + S) / 2;
  if (c > 0) {
    let C = a - i, M = o - t;
    const _ = Math.abs((e - a) * M - (s - o) * C), N = Math.abs((r - a) * M - (n - o) * C);
    if (_ > is && N > is) {
      if ((_ + N) * (_ + N) <= l * (C * C + M * M)) {
        h.push(L, B);
        return;
      }
    } else if (_ > is) {
      if (_ * _ <= l * (C * C + M * M)) {
        h.push(L, B);
        return;
      }
    } else if (N > is) {
      if (N * N <= l * (C * C + M * M)) {
        h.push(L, B);
        return;
      }
    } else if (C = L - (i + a) / 2, M = B - (t + o) / 2, C * C + M * M <= l) {
      h.push(L, B);
      return;
    }
  }
  Hs(i, t, u, d, y, E, L, B, h, l, c + 1), Hs(L, B, x, S, A, g, a, o, h, l, c + 1);
}
const rh = 8, nh = 11920929e-14, ah = 1;
function oh(i, t, e, s, r, n, a, o) {
  const l = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, o ?? cn.defaultOptions.bezierSmoothness)
  );
  let c = (ah - l) / 1;
  return c *= c, hh(t, e, s, r, n, a, i, c), i;
}
function hh(i, t, e, s, r, n, a, o) {
  Vs(a, i, t, e, s, r, n, o, 0), a.push(r, n);
}
function Vs(i, t, e, s, r, n, a, o, h) {
  if (h > rh)
    return;
  const l = (t + s) / 2, c = (e + r) / 2, u = (s + n) / 2, d = (r + a) / 2, m = (l + u) / 2, f = (c + d) / 2;
  let A = n - t, g = a - e;
  const y = Math.abs((s - n) * g - (r - a) * A);
  if (y > nh) {
    if (y * y <= o * (A * A + g * g)) {
      i.push(m, f);
      return;
    }
  } else if (A = m - (t + n) / 2, g = f - (e + a) / 2, A * A + g * g <= o) {
    i.push(m, f);
    return;
  }
  Vs(i, t, e, l, c, m, f, o, h + 1), Vs(i, m, f, u, d, n, a, o, h + 1);
}
function un(i, t, e, s, r, n, a, o) {
  let h = Math.abs(r - n);
  (!a && r > n || a && n > r) && (h = 2 * Math.PI - h), o = o || Math.max(6, Math.floor(6 * Math.pow(s, 1 / 3) * (h / Math.PI))), o = Math.max(o, 3);
  let l = h / o, c = r;
  l *= a ? -1 : 1;
  for (let u = 0; u < o + 1; u++) {
    const d = Math.cos(c), m = Math.sin(c), f = t + d * s, A = e + m * s;
    i.push(f, A), c += l;
  }
}
function ch(i, t, e, s, r, n) {
  const a = i[i.length - 2], h = i[i.length - 1] - e, l = a - t, c = r - e, u = s - t, d = Math.abs(h * u - l * c);
  if (d < 1e-8 || n === 0) {
    (i[i.length - 2] !== t || i[i.length - 1] !== e) && i.push(t, e);
    return;
  }
  const m = h * h + l * l, f = c * c + u * u, A = h * c + l * u, g = n * Math.sqrt(m) / d, y = n * Math.sqrt(f) / d, E = g * A / m, x = y * A / f, S = g * u + y * l, L = g * c + y * h, B = l * (y + E), C = h * (y + E), M = u * (g + x), _ = c * (g + x), N = Math.atan2(C - L, B - S), q = Math.atan2(_ - L, M - S);
  un(
    i,
    S + t,
    L + e,
    n,
    N,
    q,
    l * c > u * h
  );
}
const Ce = Math.PI * 2, Ns = {
  centerX: 0,
  centerY: 0,
  ang1: 0,
  ang2: 0
}, Is = ({ x: i, y: t }, e, s, r, n, a, o, h) => {
  i *= e, t *= s;
  const l = r * i - n * t, c = n * i + r * t;
  return h.x = l + a, h.y = c + o, h;
};
function lh(i, t) {
  const e = t === -1.5707963267948966 ? -0.551915024494 : 1.3333333333333333 * Math.tan(t / 4), s = t === 1.5707963267948966 ? 0.551915024494 : e, r = Math.cos(i), n = Math.sin(i), a = Math.cos(i + t), o = Math.sin(i + t);
  return [
    {
      x: r - n * s,
      y: n + r * s
    },
    {
      x: a + o * s,
      y: o - a * s
    },
    {
      x: a,
      y: o
    }
  ];
}
const zi = (i, t, e, s) => {
  const r = i * s - t * e < 0 ? -1 : 1;
  let n = i * e + t * s;
  return n > 1 && (n = 1), n < -1 && (n = -1), r * Math.acos(n);
}, uh = (i, t, e, s, r, n, a, o, h, l, c, u, d) => {
  const m = Math.pow(r, 2), f = Math.pow(n, 2), A = Math.pow(c, 2), g = Math.pow(u, 2);
  let y = m * f - m * g - f * A;
  y < 0 && (y = 0), y /= m * g + f * A, y = Math.sqrt(y) * (a === o ? -1 : 1);
  const E = y * r / n * u, x = y * -n / r * c, S = l * E - h * x + (i + e) / 2, L = h * E + l * x + (t + s) / 2, B = (c - E) / r, C = (u - x) / n, M = (-c - E) / r, _ = (-u - x) / n, N = zi(1, 0, B, C);
  let q = zi(B, C, M, _);
  o === 0 && q > 0 && (q -= Ce), o === 1 && q < 0 && (q += Ce), d.centerX = S, d.centerY = L, d.ang1 = N, d.ang2 = q;
};
function dh(i, t, e, s, r, n, a, o = 0, h = 0, l = 0) {
  if (n === 0 || a === 0)
    return;
  const c = Math.sin(o * Ce / 360), u = Math.cos(o * Ce / 360), d = u * (t - s) / 2 + c * (e - r) / 2, m = -c * (t - s) / 2 + u * (e - r) / 2;
  if (d === 0 && m === 0)
    return;
  n = Math.abs(n), a = Math.abs(a);
  const f = Math.pow(d, 2) / Math.pow(n, 2) + Math.pow(m, 2) / Math.pow(a, 2);
  f > 1 && (n *= Math.sqrt(f), a *= Math.sqrt(f)), uh(
    t,
    e,
    s,
    r,
    n,
    a,
    h,
    l,
    c,
    u,
    d,
    m,
    Ns
  );
  let { ang1: A, ang2: g } = Ns;
  const { centerX: y, centerY: E } = Ns;
  let x = Math.abs(g) / (Ce / 4);
  Math.abs(1 - x) < 1e-7 && (x = 1);
  const S = Math.max(Math.ceil(x), 1);
  g /= S;
  let L = i[i.length - 2], B = i[i.length - 1];
  const C = { x: 0, y: 0 };
  for (let M = 0; M < S; M++) {
    const _ = lh(A, g), { x: N, y: q } = Is(_[0], n, a, u, c, y, E, C), { x: Mt, y: w } = Is(_[1], n, a, u, c, y, E, C), { x: D, y: X } = Is(_[2], n, a, u, c, y, E, C);
    ln(
      i,
      L,
      B,
      N,
      q,
      Mt,
      w,
      D,
      X
    ), L = D, B = X, A += g;
  }
}
function fh(i, t, e) {
  const s = (a, o) => {
    const h = o.x - a.x, l = o.y - a.y, c = Math.sqrt(h * h + l * l), u = h / c, d = l / c;
    return { len: c, nx: u, ny: d };
  }, r = (a, o) => {
    a === 0 ? i.moveTo(o.x, o.y) : i.lineTo(o.x, o.y);
  };
  let n = t[t.length - 1];
  for (let a = 0; a < t.length; a++) {
    const o = t[a % t.length], h = o.radius ?? e;
    if (h <= 0) {
      r(a, o), n = o;
      continue;
    }
    const l = t[(a + 1) % t.length], c = s(o, n), u = s(o, l);
    if (c.len < 1e-4 || u.len < 1e-4) {
      r(a, o), n = o;
      continue;
    }
    let d = Math.asin(c.nx * u.ny - c.ny * u.nx), m = 1, f = !1;
    c.nx * u.nx - c.ny * -u.ny < 0 ? d < 0 ? d = Math.PI + d : (d = Math.PI - d, m = -1, f = !0) : d > 0 && (m = -1, f = !0);
    const A = d / 2;
    let g, y = Math.abs(
      Math.cos(A) * h / Math.sin(A)
    );
    y > Math.min(c.len / 2, u.len / 2) ? (y = Math.min(c.len / 2, u.len / 2), g = Math.abs(y * Math.sin(A) / Math.cos(A))) : g = h;
    const E = o.x + u.nx * y + -u.ny * g * m, x = o.y + u.ny * y + u.nx * g * m, S = Math.atan2(c.ny, c.nx) + Math.PI / 2 * m, L = Math.atan2(u.ny, u.nx) - Math.PI / 2 * m;
    a === 0 && i.moveTo(
      E + Math.cos(S) * g,
      x + Math.sin(S) * g
    ), i.arc(E, x, g, S, L, f), n = o;
  }
}
function ph(i, t, e, s) {
  const r = (o, h) => Math.sqrt((o.x - h.x) ** 2 + (o.y - h.y) ** 2), n = (o, h, l) => ({
    x: o.x + (h.x - o.x) * l,
    y: o.y + (h.y - o.y) * l
  }), a = t.length;
  for (let o = 0; o < a; o++) {
    const h = t[(o + 1) % a], l = h.radius ?? e;
    if (l <= 0) {
      o === 0 ? i.moveTo(h.x, h.y) : i.lineTo(h.x, h.y);
      continue;
    }
    const c = t[o], u = t[(o + 2) % a], d = r(c, h);
    let m;
    if (d < 1e-4)
      m = h;
    else {
      const g = Math.min(d / 2, l);
      m = n(
        h,
        c,
        g / d
      );
    }
    const f = r(u, h);
    let A;
    if (f < 1e-4)
      A = h;
    else {
      const g = Math.min(f / 2, l);
      A = n(
        h,
        u,
        g / f
      );
    }
    o === 0 ? i.moveTo(m.x, m.y) : i.lineTo(m.x, m.y), i.quadraticCurveTo(h.x, h.y, A.x, A.y, s);
  }
}
const mh = new et();
class gh {
  constructor(t) {
    this.shapePrimitives = [], this._currentPoly = null, this._bounds = new Ot(), this._graphicsPath2D = t;
  }
  /**
   * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
   * @param x - The x-coordinate for the starting point.
   * @param y - The y-coordinate for the starting point.
   * @returns The instance of the current object for chaining.
   */
  moveTo(t, e) {
    return this.startPoly(t, e), this;
  }
  /**
   * Connects the current point to a new point with a straight line. This method updates the current path.
   * @param x - The x-coordinate of the new point to connect to.
   * @param y - The y-coordinate of the new point to connect to.
   * @returns The instance of the current object for chaining.
   */
  lineTo(t, e) {
    this._ensurePoly();
    const s = this._currentPoly.points, r = s[s.length - 2], n = s[s.length - 1];
    return (r !== t || n !== e) && s.push(t, e), this;
  }
  /**
   * Adds an arc to the path. The arc is centered at (x, y)
   *  position with radius `radius` starting at `startAngle` and ending at `endAngle`.
   * @param x - The x-coordinate of the arc's center.
   * @param y - The y-coordinate of the arc's center.
   * @param radius - The radius of the arc.
   * @param startAngle - The starting angle of the arc, in radians.
   * @param endAngle - The ending angle of the arc, in radians.
   * @param counterclockwise - Specifies whether the arc should be drawn in the anticlockwise direction. False by default.
   * @returns The instance of the current object for chaining.
   */
  arc(t, e, s, r, n, a) {
    this._ensurePoly(!1);
    const o = this._currentPoly.points;
    return un(o, t, e, s, r, n, a), this;
  }
  /**
   * Adds an arc to the path with the arc tangent to the line joining two specified points.
   * The arc radius is specified by `radius`.
   * @param x1 - The x-coordinate of the first point.
   * @param y1 - The y-coordinate of the first point.
   * @param x2 - The x-coordinate of the second point.
   * @param y2 - The y-coordinate of the second point.
   * @param radius - The radius of the arc.
   * @returns The instance of the current object for chaining.
   */
  arcTo(t, e, s, r, n) {
    this._ensurePoly();
    const a = this._currentPoly.points;
    return ch(a, t, e, s, r, n), this;
  }
  /**
   * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
   * @param rx - The x-radius of the ellipse.
   * @param ry - The y-radius of the ellipse.
   * @param xAxisRotation - The rotation of the ellipse's x-axis relative
   * to the x-axis of the coordinate system, in degrees.
   * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
   * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
   * @param x - The x-coordinate of the arc's end point.
   * @param y - The y-coordinate of the arc's end point.
   * @returns The instance of the current object for chaining.
   */
  arcToSvg(t, e, s, r, n, a, o) {
    const h = this._currentPoly.points;
    return dh(
      h,
      this._currentPoly.lastX,
      this._currentPoly.lastY,
      a,
      o,
      t,
      e,
      s,
      r,
      n
    ), this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires three points: the first two are control points and the third one is the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the first control point.
   * @param cp1y - The y-coordinate of the first control point.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveTo(t, e, s, r, n, a, o) {
    this._ensurePoly();
    const h = this._currentPoly;
    return ln(
      this._currentPoly.points,
      h.lastX,
      h.lastY,
      t,
      e,
      s,
      r,
      n,
      a,
      o
    ), this;
  }
  /**
   * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the control point.
   * @param cp1y - The y-coordinate of the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothing - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveTo(t, e, s, r, n) {
    this._ensurePoly();
    const a = this._currentPoly;
    return oh(
      this._currentPoly.points,
      a.lastX,
      a.lastY,
      t,
      e,
      s,
      r,
      n
    ), this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this.endPoly(!0), this;
  }
  /**
   * Adds another path to the current path. This method allows for the combination of multiple paths into one.
   * @param path - The `GraphicsPath` object representing the path to add.
   * @param transform - An optional `Matrix` object to apply a transformation to the path before adding it.
   * @returns The instance of the current object for chaining.
   */
  addPath(t, e) {
    this.endPoly(), e && !e.isIdentity() && (t = t.clone(!0), t.transform(e));
    for (let s = 0; s < t.instructions.length; s++) {
      const r = t.instructions[s];
      this[r.action](...r.data);
    }
    return this;
  }
  /**
   * Finalizes the drawing of the current path. Optionally, it can close the path.
   * @param closePath - A boolean indicating whether to close the path after finishing. False by default.
   */
  finish(t = !1) {
    this.endPoly(t);
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(t, e, s, r, n) {
    return this.drawShape(new et(t, e, s, r), n), this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(t, e, s, r) {
    return this.drawShape(new ei(t, e, s), r), this;
  }
  /**
   * Draws a polygon shape. This method allows for the creation of complex polygons by specifying a sequence of points.
   * @param points - An array of numbers representing the x and y coordinates of the polygon's vertices, in sequence.
   * @param close - A boolean indicating whether to close the polygon path. True by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  poly(t, e, s) {
    const r = new Ie(t);
    return r.closePath = e, this.drawShape(r, s), this;
  }
  /**
   * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  regularPoly(t, e, s, r, n = 0, a) {
    r = Math.max(r | 0, 3);
    const o = -1 * Math.PI / 2 + n, h = Math.PI * 2 / r, l = [];
    for (let c = 0; c < r; c++) {
      const u = c * h + o;
      l.push(
        t + s * Math.cos(u),
        e + s * Math.sin(u)
      );
    }
    return this.poly(l, !0, a), this;
  }
  /**
   * Draws a polygon with rounded corners.
   * Similar to `regularPoly` but with the ability to round the corners of the polygon.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param corner - The radius of the rounding of the corners.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param smoothness - Optional parameter to adjust the smoothness of the rounding.
   * @returns The instance of the current object for chaining.
   */
  roundPoly(t, e, s, r, n, a = 0, o) {
    if (r = Math.max(r | 0, 3), n <= 0)
      return this.regularPoly(t, e, s, r, a);
    const h = s * Math.sin(Math.PI / r) - 1e-3;
    n = Math.min(n, h);
    const l = -1 * Math.PI / 2 + a, c = Math.PI * 2 / r, u = (r - 2) * Math.PI / r / 2;
    for (let d = 0; d < r; d++) {
      const m = d * c + l, f = t + s * Math.cos(m), A = e + s * Math.sin(m), g = m + Math.PI + u, y = m - Math.PI - u, E = f + n * Math.cos(g), x = A + n * Math.sin(g), S = f + n * Math.cos(y), L = A + n * Math.sin(y);
      d === 0 ? this.moveTo(E, x) : this.lineTo(E, x), this.quadraticCurveTo(f, A, S, L, o);
    }
    return this.closePath();
  }
  /**
   * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
   * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
   * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
   * A minimum of 3 points is required.
   * @param radius - The default radius for the corners.
   * This radius is applied to all corners unless overridden in `points`.
   * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
   *  method instead of an arc method. Defaults to false.
   * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
   * Higher values make the curve smoother.
   * @returns The instance of the current object for chaining.
   */
  roundShape(t, e, s = !1, r) {
    return t.length < 3 ? this : (s ? ph(this, t, e, r) : fh(this, t, e), this.closePath());
  }
  /**
   * Draw Rectangle with fillet corners. This is much like rounded rectangle
   * however it support negative numbers as well for the corner radius.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param fillet - accept negative or positive values
   */
  filletRect(t, e, s, r, n) {
    if (n === 0)
      return this.rect(t, e, s, r);
    const a = Math.min(s, r) / 2, o = Math.min(a, Math.max(-a, n)), h = t + s, l = e + r, c = o < 0 ? -o : 0, u = Math.abs(o);
    return this.moveTo(t, e + u).arcTo(t + c, e + c, t + u, e, u).lineTo(h - u, e).arcTo(h - c, e + c, h, e + u, u).lineTo(h, l - u).arcTo(h - c, l - c, t + s - u, l, u).lineTo(t + u, l).arcTo(t + c, l - c, t, l - u, u).closePath();
  }
  /**
   * Draw Rectangle with chamfer corners. These are angled corners.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param chamfer - non-zero real number, size of corner cutout
   * @param transform
   */
  chamferRect(t, e, s, r, n, a) {
    if (n <= 0)
      return this.rect(t, e, s, r);
    const o = Math.min(n, Math.min(s, r) / 2), h = t + s, l = e + r, c = [
      t + o,
      e,
      h - o,
      e,
      h,
      e + o,
      h,
      l - o,
      h - o,
      l,
      t + o,
      l,
      t,
      l - o,
      t,
      e + o
    ];
    for (let u = c.length - 1; u >= 2; u -= 2)
      c[u] === c[u - 2] && c[u - 1] === c[u - 3] && c.splice(u - 1, 2);
    return this.poly(c, !0, a);
  }
  /**
   * Draws an ellipse at the specified location and with the given x and y radii.
   * An optional transformation can be applied, allowing for rotation, scaling, and translation.
   * @param x - The x-coordinate of the center of the ellipse.
   * @param y - The y-coordinate of the center of the ellipse.
   * @param radiusX - The horizontal radius of the ellipse.
   * @param radiusY - The vertical radius of the ellipse.
   * @param transform - An optional `Matrix` object to apply a transformation to the ellipse. This can include rotations.
   * @returns The instance of the current object for chaining.
   */
  ellipse(t, e, s, r, n) {
    return this.drawShape(new si(t, e, s, r), n), this;
  }
  /**
   * Draws a rectangle with rounded corners.
   * The corner radius can be specified to determine how rounded the corners should be.
   * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  roundRect(t, e, s, r, n, a) {
    return this.drawShape(new ii(t, e, s, r, n), a), this;
  }
  /**
   * Draws a given shape on the canvas.
   * This is a generic method that can draw any type of shape specified by the `ShapePrimitive` parameter.
   * An optional transformation matrix can be applied to the shape, allowing for complex transformations.
   * @param shape - The shape to draw, defined as a `ShapePrimitive` object.
   * @param matrix - An optional `Matrix` for transforming the shape. This can include rotations,
   * scaling, and translations.
   * @returns The instance of the current object for chaining.
   */
  drawShape(t, e) {
    return this.endPoly(), this.shapePrimitives.push({ shape: t, transform: e }), this;
  }
  /**
   * Starts a new polygon path from the specified starting point.
   * This method initializes a new polygon or ends the current one if it exists.
   * @param x - The x-coordinate of the starting point of the new polygon.
   * @param y - The y-coordinate of the starting point of the new polygon.
   * @returns The instance of the current object for chaining.
   */
  startPoly(t, e) {
    let s = this._currentPoly;
    return s && this.endPoly(), s = new Ie(), s.points.push(t, e), this._currentPoly = s, this;
  }
  /**
   * Ends the current polygon path. If `closePath` is set to true,
   * the path is closed by connecting the last point to the first one.
   * This method finalizes the current polygon and prepares it for drawing or adding to the shape primitives.
   * @param closePath - A boolean indicating whether to close the polygon by connecting the last point
   *  back to the starting point. False by default.
   * @returns The instance of the current object for chaining.
   */
  endPoly(t = !1) {
    const e = this._currentPoly;
    return e && e.points.length > 2 && (e.closePath = t, this.shapePrimitives.push({ shape: e })), this._currentPoly = null, this;
  }
  _ensurePoly(t = !0) {
    if (!this._currentPoly && (this._currentPoly = new Ie(), t)) {
      const e = this.shapePrimitives[this.shapePrimitives.length - 1];
      if (e) {
        let s = e.shape.x, r = e.shape.y;
        if (!e.transform.isIdentity()) {
          const n = e.transform, a = s;
          s = n.a * s + n.c * r + n.tx, r = n.b * a + n.d * r + n.ty;
        }
        this._currentPoly.points.push(s, r);
      } else
        this._currentPoly.points.push(0, 0);
    }
  }
  /** Builds the path. */
  buildPath() {
    const t = this._graphicsPath2D;
    this.shapePrimitives.length = 0, this._currentPoly = null;
    for (let e = 0; e < t.instructions.length; e++) {
      const s = t.instructions[e];
      this[s.action](...s.data);
    }
    this.finish();
  }
  /** Gets the bounds of the path. */
  get bounds() {
    const t = this._bounds;
    t.clear();
    const e = this.shapePrimitives;
    for (let s = 0; s < e.length; s++) {
      const r = e[s], n = r.shape.getBounds(mh);
      r.transform ? t.addRect(n, r.transform) : t.addRect(n);
    }
    return t;
  }
}
class de {
  /**
   * Creates a `GraphicsPath` instance optionally from an SVG path string or an array of `PathInstruction`.
   * @param instructions - An SVG path string or an array of `PathInstruction` objects.
   */
  constructor(t) {
    this.instructions = [], this.uid = nt("graphicsPath"), this._dirty = !0, typeof t == "string" ? ao(t, this) : this.instructions = (t == null ? void 0 : t.slice()) ?? [];
  }
  /**
   * Provides access to the internal shape path, ensuring it is up-to-date with the current instructions.
   * @returns The `ShapePath` instance associated with this `GraphicsPath`.
   */
  get shapePath() {
    return this._shapePath || (this._shapePath = new gh(this)), this._dirty && (this._dirty = !1, this._shapePath.buildPath()), this._shapePath;
  }
  /**
   * Adds another `GraphicsPath` to this path, optionally applying a transformation.
   * @param path - The `GraphicsPath` to add.
   * @param transform - An optional transformation to apply to the added path.
   * @returns The instance of the current object for chaining.
   */
  addPath(t, e) {
    return t = t.clone(), this.instructions.push({ action: "addPath", data: [t, e] }), this._dirty = !0, this;
  }
  arc(...t) {
    return this.instructions.push({ action: "arc", data: t }), this._dirty = !0, this;
  }
  arcTo(...t) {
    return this.instructions.push({ action: "arcTo", data: t }), this._dirty = !0, this;
  }
  arcToSvg(...t) {
    return this.instructions.push({ action: "arcToSvg", data: t }), this._dirty = !0, this;
  }
  bezierCurveTo(...t) {
    return this.instructions.push({ action: "bezierCurveTo", data: t }), this._dirty = !0, this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires two points: the second control point and the end point. The first control point is assumed to be
   * The starting point is the last point in the current path.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveToShort(t, e, s, r, n) {
    const a = this.instructions[this.instructions.length - 1], o = this.getLastPoint(rt.shared);
    let h = 0, l = 0;
    if (!a || a.action !== "bezierCurveTo")
      h = o.x, l = o.y;
    else {
      h = a.data[2], l = a.data[3];
      const c = o.x, u = o.y;
      h = c + (c - h), l = u + (u - l);
    }
    return this.instructions.push({ action: "bezierCurveTo", data: [h, l, t, e, s, r, n] }), this._dirty = !0, this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this.instructions.push({ action: "closePath", data: [] }), this._dirty = !0, this;
  }
  ellipse(...t) {
    return this.instructions.push({ action: "ellipse", data: t }), this._dirty = !0, this;
  }
  lineTo(...t) {
    return this.instructions.push({ action: "lineTo", data: t }), this._dirty = !0, this;
  }
  moveTo(...t) {
    return this.instructions.push({ action: "moveTo", data: t }), this;
  }
  quadraticCurveTo(...t) {
    return this.instructions.push({ action: "quadraticCurveTo", data: t }), this._dirty = !0, this;
  }
  /**
   * Adds a quadratic curve to the path. It uses the previous point as the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveToShort(t, e, s) {
    const r = this.instructions[this.instructions.length - 1], n = this.getLastPoint(rt.shared);
    let a = 0, o = 0;
    if (!r || r.action !== "quadraticCurveTo")
      a = n.x, o = n.y;
    else {
      a = r.data[0], o = r.data[1];
      const h = n.x, l = n.y;
      a = h + (h - a), o = l + (l - o);
    }
    return this.instructions.push({ action: "quadraticCurveTo", data: [a, o, t, e, s] }), this._dirty = !0, this;
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(t, e, s, r, n) {
    return this.instructions.push({ action: "rect", data: [t, e, s, r, n] }), this._dirty = !0, this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(t, e, s, r) {
    return this.instructions.push({ action: "circle", data: [t, e, s, r] }), this._dirty = !0, this;
  }
  roundRect(...t) {
    return this.instructions.push({ action: "roundRect", data: t }), this._dirty = !0, this;
  }
  poly(...t) {
    return this.instructions.push({ action: "poly", data: t }), this._dirty = !0, this;
  }
  regularPoly(...t) {
    return this.instructions.push({ action: "regularPoly", data: t }), this._dirty = !0, this;
  }
  roundPoly(...t) {
    return this.instructions.push({ action: "roundPoly", data: t }), this._dirty = !0, this;
  }
  roundShape(...t) {
    return this.instructions.push({ action: "roundShape", data: t }), this._dirty = !0, this;
  }
  filletRect(...t) {
    return this.instructions.push({ action: "filletRect", data: t }), this._dirty = !0, this;
  }
  chamferRect(...t) {
    return this.instructions.push({ action: "chamferRect", data: t }), this._dirty = !0, this;
  }
  /**
   * Draws a star shape centered at a specified location. This method allows for the creation
   *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
   * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
   * An optional transformation can be applied to scale, rotate, or translate the star as needed.
   * @param x - The x-coordinate of the center of the star.
   * @param y - The y-coordinate of the center of the star.
   * @param points - The number of points of the star.
   * @param radius - The outer radius of the star (distance from the center to the outer points).
   * @param innerRadius - Optional. The inner radius of the star
   * (distance from the center to the inner points between the outer points).
   * If not provided, defaults to half of the `radius`.
   * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
   * Defaults to 0, meaning one point is directly upward.
   * @param transform - An optional `Matrix` object to apply a transformation to the star.
   * This can include rotations, scaling, and translations.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  // eslint-disable-next-line max-len
  star(t, e, s, r, n, a, o) {
    n = n || r / 2;
    const h = -1 * Math.PI / 2 + a, l = s * 2, c = Math.PI * 2 / l, u = [];
    for (let d = 0; d < l; d++) {
      const m = d % 2 ? n : r, f = d * c + h;
      u.push(
        t + m * Math.cos(f),
        e + m * Math.sin(f)
      );
    }
    return this.poly(u, !0, o), this;
  }
  /**
   * Creates a copy of the current `GraphicsPath` instance. This method supports both shallow and deep cloning.
   * A shallow clone copies the reference of the instructions array, while a deep clone creates a new array and
   * copies each instruction individually, ensuring that modifications to the instructions of the cloned `GraphicsPath`
   * do not affect the original `GraphicsPath` and vice versa.
   * @param deep - A boolean flag indicating whether the clone should be deep.
   * @returns A new `GraphicsPath` instance that is a clone of the current instance.
   */
  clone(t = !1) {
    const e = new de();
    if (!t)
      e.instructions = this.instructions.slice();
    else
      for (let s = 0; s < this.instructions.length; s++) {
        const r = this.instructions[s];
        e.instructions.push({ action: r.action, data: r.data.slice() });
      }
    return e;
  }
  clear() {
    return this.instructions.length = 0, this._dirty = !0, this;
  }
  /**
   * Applies a transformation matrix to all drawing instructions within the `GraphicsPath`.
   * This method enables the modification of the path's geometry according to the provided
   * transformation matrix, which can include translations, rotations, scaling, and skewing.
   *
   * Each drawing instruction in the path is updated to reflect the transformation,
   * ensuring the visual representation of the path is consistent with the applied matrix.
   *
   * Note: The transformation is applied directly to the coordinates and control points of the drawing instructions,
   * not to the path as a whole. This means the transformation's effects are baked into the individual instructions,
   * allowing for fine-grained control over the path's appearance.
   * @param matrix - A `Matrix` object representing the transformation to apply.
   * @returns The instance of the current object for chaining further operations.
   */
  transform(t) {
    if (t.isIdentity())
      return this;
    const e = t.a, s = t.b, r = t.c, n = t.d, a = t.tx, o = t.ty;
    let h = 0, l = 0, c = 0, u = 0, d = 0, m = 0, f = 0, A = 0;
    for (let g = 0; g < this.instructions.length; g++) {
      const y = this.instructions[g], E = y.data;
      switch (y.action) {
        case "moveTo":
        case "lineTo":
          h = E[0], l = E[1], E[0] = e * h + r * l + a, E[1] = s * h + n * l + o;
          break;
        case "bezierCurveTo":
          c = E[0], u = E[1], d = E[2], m = E[3], h = E[4], l = E[5], E[0] = e * c + r * u + a, E[1] = s * c + n * u + o, E[2] = e * d + r * m + a, E[3] = s * d + n * m + o, E[4] = e * h + r * l + a, E[5] = s * h + n * l + o;
          break;
        case "quadraticCurveTo":
          c = E[0], u = E[1], h = E[2], l = E[3], E[0] = e * c + r * u + a, E[1] = s * c + n * u + o, E[2] = e * h + r * l + a, E[3] = s * h + n * l + o;
          break;
        case "arcToSvg":
          h = E[5], l = E[6], f = E[0], A = E[1], E[0] = e * f + r * A, E[1] = s * f + n * A, E[5] = e * h + r * l + a, E[6] = s * h + n * l + o;
          break;
        case "circle":
          E[4] = Re(E[3], t);
          break;
        case "rect":
          E[4] = Re(E[4], t);
          break;
        case "ellipse":
          E[8] = Re(E[8], t);
          break;
        case "roundRect":
          E[5] = Re(E[5], t);
          break;
        case "addPath":
          E[0].transform(t);
          break;
        case "poly":
          E[2] = Re(E[2], t);
          break;
        default:
          it("unknown transform action", y.action);
          break;
      }
    }
    return this._dirty = !0, this;
  }
  get bounds() {
    return this.shapePath.bounds;
  }
  /**
   * Retrieves the last point from the current drawing instructions in the `GraphicsPath`.
   * This method is useful for operations that depend on the path's current endpoint,
   * such as connecting subsequent shapes or paths. It supports various drawing instructions,
   * ensuring the last point's position is accurately determined regardless of the path's complexity.
   *
   * If the last instruction is a `closePath`, the method iterates backward through the instructions
   *  until it finds an actionable instruction that defines a point (e.g., `moveTo`, `lineTo`,
   * `quadraticCurveTo`, etc.). For compound paths added via `addPath`, it recursively retrieves
   * the last point from the nested path.
   * @param out - A `Point` object where the last point's coordinates will be stored.
   * This object is modified directly to contain the result.
   * @returns The `Point` object containing the last point's coordinates.
   */
  getLastPoint(t) {
    let e = this.instructions.length - 1, s = this.instructions[e];
    if (!s)
      return t.x = 0, t.y = 0, t;
    for (; s.action === "closePath"; ) {
      if (e--, e < 0)
        return t.x = 0, t.y = 0, t;
      s = this.instructions[e];
    }
    switch (s.action) {
      case "moveTo":
      case "lineTo":
        t.x = s.data[0], t.y = s.data[1];
        break;
      case "quadraticCurveTo":
        t.x = s.data[2], t.y = s.data[3];
        break;
      case "bezierCurveTo":
        t.x = s.data[4], t.y = s.data[5];
        break;
      case "arc":
      case "arcToSvg":
        t.x = s.data[5], t.y = s.data[6];
        break;
      case "addPath":
        s.data[0].getLastPoint(t);
        break;
    }
    return t;
  }
}
function Re(i, t) {
  return i ? i.prepend(t) : t.clone();
}
function Ah(i, t) {
  if (typeof i == "string") {
    const s = document.createElement("div");
    s.innerHTML = i.trim(), i = s.querySelector("svg");
  }
  const e = {
    context: t,
    path: new de()
  };
  return dn(i, e, null, null), t;
}
function dn(i, t, e, s) {
  const r = i.children, { fillStyle: n, strokeStyle: a } = Eh(i);
  n && e ? e = { ...e, ...n } : n && (e = n), a && s ? s = { ...s, ...a } : a && (s = a), t.context.fillStyle = e, t.context.strokeStyle = s;
  let o, h, l, c, u, d, m, f, A, g, y, E, x, S, L, B, C;
  switch (i.nodeName.toLowerCase()) {
    case "path":
      S = i.getAttribute("d"), L = new de(S), t.context.path(L), e && t.context.fill(), s && t.context.stroke();
      break;
    case "circle":
      m = Z(i, "cx", 0), f = Z(i, "cy", 0), A = Z(i, "r", 0), t.context.ellipse(m, f, A, A), e && t.context.fill(), s && t.context.stroke();
      break;
    case "rect":
      o = Z(i, "x", 0), h = Z(i, "y", 0), B = Z(i, "width", 0), C = Z(i, "height", 0), g = Z(i, "rx", 0), y = Z(i, "ry", 0), g || y ? t.context.roundRect(o, h, B, C, g || y) : t.context.rect(o, h, B, C), e && t.context.fill(), s && t.context.stroke();
      break;
    case "ellipse":
      m = Z(i, "cx", 0), f = Z(i, "cy", 0), g = Z(i, "rx", 0), y = Z(i, "ry", 0), t.context.beginPath(), t.context.ellipse(m, f, g, y), e && t.context.fill(), s && t.context.stroke();
      break;
    case "line":
      l = Z(i, "x1", 0), c = Z(i, "y1", 0), u = Z(i, "x2", 0), d = Z(i, "y2", 0), t.context.beginPath(), t.context.moveTo(l, c), t.context.lineTo(u, d), s && t.context.stroke();
      break;
    case "polygon":
      x = i.getAttribute("points"), E = x.match(/\d+/g).map((M) => parseInt(M, 10)), t.context.poly(E, !0), e && t.context.fill(), s && t.context.stroke();
      break;
    case "polyline":
      x = i.getAttribute("points"), E = x.match(/\d+/g).map((M) => parseInt(M, 10)), t.context.poly(E, !1), s && t.context.stroke();
      break;
    case "g":
    case "svg":
      break;
    default: {
      console.info(`[SVG parser] <${i.nodeName}> elements unsupported`);
      break;
    }
  }
  for (let M = 0; M < r.length; M++)
    dn(r[M], t, e, s);
}
function Z(i, t, e) {
  const s = i.getAttribute(t);
  return s ? Number(s) : e;
}
function Eh(i) {
  const t = i.getAttribute("style"), e = {}, s = {};
  let r = !1, n = !1;
  if (t) {
    const a = t.split(";");
    for (let o = 0; o < a.length; o++) {
      const h = a[o], [l, c] = h.split(":");
      switch (l) {
        case "stroke":
          c !== "none" && (e.color = gt.shared.setValue(c).toNumber(), n = !0);
          break;
        case "stroke-width":
          e.width = Number(c);
          break;
        case "fill":
          c !== "none" && (r = !0, s.color = gt.shared.setValue(c).toNumber());
          break;
        case "fill-opacity":
          s.alpha = Number(c);
          break;
        case "stroke-opacity":
          e.alpha = Number(c);
          break;
        case "opacity":
          s.alpha = Number(c), e.alpha = Number(c);
          break;
      }
    }
  } else {
    const a = i.getAttribute("stroke");
    a && a !== "none" && (n = !0, e.color = gt.shared.setValue(a).toNumber(), e.width = Z(i, "stroke-width", 1));
    const o = i.getAttribute("fill");
    o && o !== "none" && (r = !0, s.color = gt.shared.setValue(o).toNumber());
  }
  return {
    strokeStyle: n ? e : null,
    fillStyle: r ? s : null
  };
}
const fn = class zs {
  constructor(t, e, s, r) {
    this.uid = nt("fillGradient"), this.type = "linear", this.gradientStops = [], this.x0 = t, this.y0 = e, this.x1 = s, this.y1 = r;
  }
  addColorStop(t, e) {
    return this.gradientStops.push({ offset: t, color: gt.shared.setValue(e).toHex() }), this;
  }
  // TODO move to the system!
  buildLinearGradient() {
    const t = zs.defaultTextureSize, { gradientStops: e } = this, s = dt.get().createCanvas();
    s.width = t, s.height = t;
    const r = s.getContext("2d"), n = r.createLinearGradient(0, 0, zs.defaultTextureSize, 1);
    for (let A = 0; A < e.length; A++) {
      const g = e[A];
      n.addColorStop(g.offset, g.color);
    }
    r.fillStyle = n, r.fillRect(0, 0, t, t), this.texture = new H({
      source: new Ge({
        resource: s,
        addressModeU: "clamp-to-edge",
        addressModeV: "repeat"
      })
    });
    const { x0: a, y0: o, x1: h, y1: l } = this, c = new U(), u = h - a, d = l - o, m = Math.sqrt(u * u + d * d), f = Math.atan2(d, u);
    c.translate(-a, -o), c.scale(1 / t, 1 / t), c.rotate(-f), c.scale(256 / m, 1), this.transform = c;
  }
};
fn.defaultTextureSize = 256;
let yh = fn;
const Xi = {
  repeat: {
    addressModeU: "repeat",
    addressModeV: "repeat"
  },
  "repeat-x": {
    addressModeU: "repeat",
    addressModeV: "clamp-to-edge"
  },
  "repeat-y": {
    addressModeU: "clamp-to-edge",
    addressModeV: "repeat"
  },
  "no-repeat": {
    addressModeU: "clamp-to-edge",
    addressModeV: "clamp-to-edge"
  }
};
class xh {
  constructor(t, e) {
    this.uid = nt("fillPattern"), this.transform = new U(), this.texture = t, this.transform.scale(
      1 / t.frame.width,
      1 / t.frame.height
    ), e && (t.source.style.addressModeU = Xi[e].addressModeU, t.source.style.addressModeV = Xi[e].addressModeV);
  }
  setTransform(t) {
    const e = this.texture;
    this.transform.copyFrom(t), this.transform.invert(), this.transform.scale(
      1 / e.frame.width,
      1 / e.frame.height
    );
  }
}
function se(i, t) {
  var a;
  if (i == null)
    return null;
  let e, s;
  if (i != null && i.fill ? (s = i.fill, e = { ...t, ...i }) : (s = i, e = t), gt.isColorLike(s)) {
    const o = gt.shared.setValue(s ?? 0);
    return {
      ...e,
      color: o.toNumber(),
      alpha: o.alpha === 1 ? e.alpha : o.alpha,
      texture: H.WHITE
    };
  } else if (s instanceof xh) {
    const o = s;
    return {
      ...e,
      color: 16777215,
      texture: o.texture,
      matrix: o.transform,
      fill: e.fill ?? null
    };
  } else if (s instanceof yh) {
    const o = s;
    return o.buildLinearGradient(), {
      ...e,
      color: 16777215,
      texture: o.texture,
      matrix: o.transform
    };
  }
  const r = { ...t, ...i };
  if (r.texture) {
    if (r.texture !== H.WHITE) {
      const h = ((a = r.matrix) == null ? void 0 : a.invert()) || new U();
      h.scale(
        1 / r.texture.frame.width,
        1 / r.texture.frame.height
      ), r.matrix = h;
    }
    const o = r.texture.source.style;
    o.addressMode === "clamp-to-edge" && (o.addressMode = "repeat");
  }
  const n = gt.shared.setValue(r.color);
  return r.alpha *= n.alpha, r.color = n.toNumber(), r.matrix = r.matrix ? r.matrix.clone() : null, r;
}
const Sh = new rt(), $i = new U(), oi = class _t extends te {
  constructor() {
    super(...arguments), this.uid = nt("graphicsContext"), this.dirty = !0, this.batchMode = "auto", this.instructions = [], this._activePath = new de(), this._transform = new U(), this._fillStyle = { ..._t.defaultFillStyle }, this._strokeStyle = { ..._t.defaultStrokeStyle }, this._stateStack = [], this._tick = 0, this._bounds = new Ot(), this._boundsDirty = !0;
  }
  /**
   * Creates a new GraphicsContext object that is a clone of this instance, copying all properties,
   * including the current drawing state, transformations, styles, and instructions.
   * @returns A new GraphicsContext instance with the same properties and state as this one.
   */
  clone() {
    const t = new _t();
    return t.batchMode = this.batchMode, t.instructions = this.instructions.slice(), t._activePath = this._activePath.clone(), t._transform = this._transform.clone(), t._fillStyle = { ...this._fillStyle }, t._strokeStyle = { ...this._strokeStyle }, t._stateStack = this._stateStack.slice(), t._bounds = this._bounds.clone(), t._boundsDirty = !0, t;
  }
  /**
   * The current fill style of the graphics context. This can be a color, gradient, pattern, or a more complex style defined by a FillStyle object.
   */
  get fillStyle() {
    return this._fillStyle;
  }
  set fillStyle(t) {
    this._fillStyle = se(t, _t.defaultFillStyle);
  }
  /**
   * The current stroke style of the graphics context. Similar to fill styles, stroke styles can encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   */
  get strokeStyle() {
    return this._strokeStyle;
  }
  set strokeStyle(t) {
    this._strokeStyle = se(t, _t.defaultStrokeStyle);
  }
  /**
   * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
   * pattern, or a more complex style defined by a FillStyle object.
   * @param style - The fill style to apply. This can be a simple color, a gradient or pattern object,
   *                or a FillStyle or ConvertedFillStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setFillStyle(t) {
    return this._fillStyle = se(t, _t.defaultFillStyle), this;
  }
  /**
   * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
   * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   * @param style - The stroke style to apply. Can be defined as a color, a gradient or pattern,
   *                or a StrokeStyle or ConvertedStrokeStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setStrokeStyle(t) {
    return this._strokeStyle = se(t, _t.defaultStrokeStyle), this;
  }
  texture(t, e, s, r, n, a) {
    return this.instructions.push({
      action: "texture",
      data: {
        image: t,
        dx: s || 0,
        dy: r || 0,
        dw: n || t.frame.width,
        dh: a || t.frame.height,
        transform: this._transform.clone(),
        alpha: this._fillStyle.alpha,
        style: e ? gt.shared.setValue(e).toNumber() : 16777215
      }
    }), this.onUpdate(), this;
  }
  /**
   * Resets the current path. Any previous path and its commands are discarded and a new path is
   * started. This is typically called before beginning a new shape or series of drawing commands.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  beginPath() {
    return this._activePath = new de(), this;
  }
  fill(t, e) {
    let s;
    const r = this.instructions[this.instructions.length - 1];
    return this._tick === 0 && r && r.action === "stroke" ? s = r.data.path : s = this._activePath.clone(), s ? (t && (e !== void 0 && typeof t == "number" && (It(Nt, "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"), t = { color: t, alpha: e }), this._fillStyle = se(t, _t.defaultFillStyle)), this.instructions.push({
      action: "fill",
      // TODO copy fill style!
      data: { style: this.fillStyle, path: s }
    }), this.onUpdate(), this._initNextPathLocation(), this._tick = 0, this) : this;
  }
  _initNextPathLocation() {
    const { x: t, y: e } = this._activePath.getLastPoint(rt.shared);
    this._activePath.clear(), this._activePath.moveTo(t, e);
  }
  /**
   * Strokes the current path with the current stroke style. This method can take an optional
   * FillStyleInputs parameter to define the stroke's appearance, including its color, width, and other properties.
   * @param style - (Optional) The stroke style to apply. Can be defined as a simple color or a more complex style object. If omitted, uses the current stroke style.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  stroke(t) {
    let e;
    const s = this.instructions[this.instructions.length - 1];
    return this._tick === 0 && s && s.action === "fill" ? e = s.data.path : e = this._activePath.clone(), e ? (t && (this._strokeStyle = se(t, _t.defaultStrokeStyle)), this.instructions.push({
      action: "stroke",
      // TODO copy fill style!
      data: { style: this.strokeStyle, path: e }
    }), this.onUpdate(), this._initNextPathLocation(), this._tick = 0, this) : this;
  }
  /**
   * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
   * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
   * fail to cut correctly!
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  cut() {
    for (let t = 0; t < 2; t++) {
      const e = this.instructions[this.instructions.length - 1 - t], s = this._activePath.clone();
      if (e && (e.action === "stroke" || e.action === "fill"))
        if (e.data.hole)
          e.data.hole.addPath(s);
        else {
          e.data.hole = s;
          break;
        }
    }
    return this._initNextPathLocation(), this;
  }
  /**
   * Adds an arc to the current path, which is centered at (x, y) with the specified radius,
   * starting and ending angles, and direction.
   * @param x - The x-coordinate of the arc's center.
   * @param y - The y-coordinate of the arc's center.
   * @param radius - The arc's radius.
   * @param startAngle - The starting angle, in radians.
   * @param endAngle - The ending angle, in radians.
   * @param counterclockwise - (Optional) Specifies whether the arc is drawn counterclockwise (true) or clockwise (false). Defaults to false.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  arc(t, e, s, r, n, a) {
    this._tick++;
    const o = this._transform;
    return this._activePath.arc(
      o.a * t + o.c * e + o.tx,
      o.b * t + o.d * e + o.ty,
      s,
      r,
      n,
      a
    ), this;
  }
  /**
   * Adds an arc to the current path with the given control points and radius, connected to the previous point
   * by a straight line if necessary.
   * @param x1 - The x-coordinate of the first control point.
   * @param y1 - The y-coordinate of the first control point.
   * @param x2 - The x-coordinate of the second control point.
   * @param y2 - The y-coordinate of the second control point.
   * @param radius - The arc's radius.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  arcTo(t, e, s, r, n) {
    this._tick++;
    const a = this._transform;
    return this._activePath.arcTo(
      a.a * t + a.c * e + a.tx,
      a.b * t + a.d * e + a.ty,
      a.a * s + a.c * r + a.tx,
      a.b * s + a.d * r + a.ty,
      n
    ), this;
  }
  /**
   * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
   * @param rx - The x-radius of the ellipse.
   * @param ry - The y-radius of the ellipse.
   * @param xAxisRotation - The rotation of the ellipse's x-axis relative
   * to the x-axis of the coordinate system, in degrees.
   * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
   * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
   * @param x - The x-coordinate of the arc's end point.
   * @param y - The y-coordinate of the arc's end point.
   * @returns The instance of the current object for chaining.
   */
  arcToSvg(t, e, s, r, n, a, o) {
    this._tick++;
    const h = this._transform;
    return this._activePath.arcToSvg(
      t,
      e,
      s,
      // should we rotate this with transform??
      r,
      n,
      h.a * a + h.c * o + h.tx,
      h.b * a + h.d * o + h.ty
    ), this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires three points: the first two are control points and the third one is the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the first control point.
   * @param cp1y - The y-coordinate of the first control point.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveTo(t, e, s, r, n, a, o) {
    this._tick++;
    const h = this._transform;
    return this._activePath.bezierCurveTo(
      h.a * t + h.c * e + h.tx,
      h.b * t + h.d * e + h.ty,
      h.a * s + h.c * r + h.tx,
      h.b * s + h.d * r + h.ty,
      h.a * n + h.c * a + h.tx,
      h.b * n + h.d * a + h.ty,
      o
    ), this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    var t;
    return this._tick++, (t = this._activePath) == null || t.closePath(), this;
  }
  /**
   * Draws an ellipse at the specified location and with the given x and y radii.
   * An optional transformation can be applied, allowing for rotation, scaling, and translation.
   * @param x - The x-coordinate of the center of the ellipse.
   * @param y - The y-coordinate of the center of the ellipse.
   * @param radiusX - The horizontal radius of the ellipse.
   * @param radiusY - The vertical radius of the ellipse.
   * @returns The instance of the current object for chaining.
   */
  ellipse(t, e, s, r) {
    return this._tick++, this._activePath.ellipse(t, e, s, r, this._transform.clone()), this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(t, e, s) {
    return this._tick++, this._activePath.circle(t, e, s, this._transform.clone()), this;
  }
  /**
   * Adds another `GraphicsPath` to this path, optionally applying a transformation.
   * @param path - The `GraphicsPath` to add.
   * @returns The instance of the current object for chaining.
   */
  path(t) {
    return this._tick++, this._activePath.addPath(t, this._transform.clone()), this;
  }
  /**
   * Connects the current point to a new point with a straight line. This method updates the current path.
   * @param x - The x-coordinate of the new point to connect to.
   * @param y - The y-coordinate of the new point to connect to.
   * @returns The instance of the current object for chaining.
   */
  lineTo(t, e) {
    this._tick++;
    const s = this._transform;
    return this._activePath.lineTo(
      s.a * t + s.c * e + s.tx,
      s.b * t + s.d * e + s.ty
    ), this;
  }
  /**
   * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
   * @param x - The x-coordinate for the starting point.
   * @param y - The y-coordinate for the starting point.
   * @returns The instance of the current object for chaining.
   */
  moveTo(t, e) {
    this._tick++;
    const s = this._transform, r = this._activePath.instructions, n = s.a * t + s.c * e + s.tx, a = s.b * t + s.d * e + s.ty;
    return r.length === 1 && r[0].action === "moveTo" ? (r[0].data[0] = n, r[0].data[1] = a, this) : (this._activePath.moveTo(
      n,
      a
    ), this);
  }
  /**
   * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
   * The starting point is the last point in the current path.
   * @param cpx - The x-coordinate of the control point.
   * @param cpy - The y-coordinate of the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveTo(t, e, s, r, n) {
    this._tick++;
    const a = this._transform;
    this._activePath.quadraticCurveTo(
      a.a * t + a.c * e + a.tx,
      a.b * t + a.d * e + a.ty,
      a.a * s + a.c * r + a.tx,
      a.b * s + a.d * r + a.ty,
      n
    );
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(t, e, s, r) {
    return this._tick++, this._activePath.rect(t, e, s, r, this._transform.clone()), this;
  }
  /**
   * Draws a rectangle with rounded corners.
   * The corner radius can be specified to determine how rounded the corners should be.
   * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
   * @returns The instance of the current object for chaining.
   */
  roundRect(t, e, s, r, n) {
    return this._tick++, this._activePath.roundRect(t, e, s, r, n, this._transform.clone()), this;
  }
  /**
   * Draws a polygon shape by specifying a sequence of points. This method allows for the creation of complex polygons,
   * which can be both open and closed. An optional transformation can be applied, enabling the polygon to be scaled,
   * rotated, or translated as needed.
   * @param points - An array of numbers representing the x and y coordinates of the polygon's vertices, in sequence.
   * @param close - A boolean indicating whether to close the polygon path. True by default.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  poly(t, e) {
    return this._tick++, this._activePath.poly(t, e, this._transform.clone()), this;
  }
  /**
   * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  regularPoly(t, e, s, r, n = 0, a) {
    return this._tick++, this._activePath.regularPoly(t, e, s, r, n, a), this;
  }
  /**
   * Draws a polygon with rounded corners.
   * Similar to `regularPoly` but with the ability to round the corners of the polygon.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param corner - The radius of the rounding of the corners.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @returns The instance of the current object for chaining.
   */
  roundPoly(t, e, s, r, n, a) {
    return this._tick++, this._activePath.roundPoly(t, e, s, r, n, a), this;
  }
  /**
   * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
   * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
   * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
   * A minimum of 3 points is required.
   * @param radius - The default radius for the corners.
   * This radius is applied to all corners unless overridden in `points`.
   * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
   *  method instead of an arc method. Defaults to false.
   * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
   * Higher values make the curve smoother.
   * @returns The instance of the current object for chaining.
   */
  roundShape(t, e, s, r) {
    return this._tick++, this._activePath.roundShape(t, e, s, r), this;
  }
  /**
   * Draw Rectangle with fillet corners. This is much like rounded rectangle
   * however it support negative numbers as well for the corner radius.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param fillet - accept negative or positive values
   */
  filletRect(t, e, s, r, n) {
    return this._tick++, this._activePath.filletRect(t, e, s, r, n), this;
  }
  /**
   * Draw Rectangle with chamfer corners. These are angled corners.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param chamfer - non-zero real number, size of corner cutout
   * @param transform
   */
  chamferRect(t, e, s, r, n, a) {
    return this._tick++, this._activePath.chamferRect(t, e, s, r, n, a), this;
  }
  /**
   * Draws a star shape centered at a specified location. This method allows for the creation
   *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
   * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
   * An optional transformation can be applied to scale, rotate, or translate the star as needed.
   * @param x - The x-coordinate of the center of the star.
   * @param y - The y-coordinate of the center of the star.
   * @param points - The number of points of the star.
   * @param radius - The outer radius of the star (distance from the center to the outer points).
   * @param innerRadius - Optional. The inner radius of the star
   * (distance from the center to the inner points between the outer points).
   * If not provided, defaults to half of the `radius`.
   * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
   * Defaults to 0, meaning one point is directly upward.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  star(t, e, s, r, n = 0, a = 0) {
    return this._tick++, this._activePath.star(t, e, s, r, n, a, this._transform.clone()), this;
  }
  /**
   * Parses and renders an SVG string into the graphics context. This allows for complex shapes and paths
   * defined in SVG format to be drawn within the graphics context.
   * @param svg - The SVG string to be parsed and rendered.
   */
  svg(t) {
    this._tick++, Ah(t, this);
  }
  /**
   * Restores the most recently saved graphics state by popping the top of the graphics state stack.
   * This includes transformations, fill styles, and stroke styles.
   */
  restore() {
    const t = this._stateStack.pop();
    t && (this._transform = t.transform, this._fillStyle = t.fillStyle, this._strokeStyle = t.strokeStyle);
  }
  /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
  save() {
    this._stateStack.push({
      transform: this._transform.clone(),
      fillStyle: { ...this._fillStyle },
      strokeStyle: { ...this._strokeStyle }
    });
  }
  /**
   * Returns the current transformation matrix of the graphics context.
   * @returns The current transformation matrix.
   */
  getTransform() {
    return this._transform;
  }
  /**
   * Resets the current transformation matrix to the identity matrix, effectively removing any transformations (rotation, scaling, translation) previously applied.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  resetTransform() {
    return this._transform.identity(), this;
  }
  /**
   * Applies a rotation transformation to the graphics context around the current origin.
   * @param angle - The angle of rotation in radians.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  rotate(t) {
    return this._transform.rotate(t), this;
  }
  /**
   * Applies a scaling transformation to the graphics context, scaling drawings by x horizontally and by y vertically.
   * @param x - The scale factor in the horizontal direction.
   * @param y - (Optional) The scale factor in the vertical direction. If not specified, the x value is used for both directions.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  scale(t, e = t) {
    return this._transform.scale(t, e), this;
  }
  setTransform(t, e, s, r, n, a) {
    return t instanceof U ? (this._transform.set(t.a, t.b, t.c, t.d, t.tx, t.ty), this) : (this._transform.set(t, e, s, r, n, a), this);
  }
  transform(t, e, s, r, n, a) {
    return t instanceof U ? (this._transform.append(t), this) : ($i.set(t, e, s, r, n, a), this._transform.append($i), this);
  }
  /**
   * Applies a translation transformation to the graphics context, moving the origin by the specified amounts.
   * @param x - The amount to translate in the horizontal direction.
   * @param y - (Optional) The amount to translate in the vertical direction. If not specified, the x value is used for both directions.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  translate(t, e = t) {
    return this._transform.translate(t, e), this;
  }
  /**
   * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
   * and optionally resetting transformations to the identity matrix.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  clear() {
    return this.instructions.length = 0, this.resetTransform(), this.onUpdate(), this;
  }
  onUpdate() {
    this.dirty || (this.emit("update", this, 16), this.dirty = !0, this._boundsDirty = !0);
  }
  /** The bounds of the graphic shape. */
  get bounds() {
    if (!this._boundsDirty)
      return this._bounds;
    const t = this._bounds;
    t.clear();
    for (let e = 0; e < this.instructions.length; e++) {
      const s = this.instructions[e], r = s.action;
      if (r === "fill") {
        const n = s.data;
        t.addBounds(n.path.bounds);
      } else if (r === "texture") {
        const n = s.data;
        t.addFrame(n.dx, n.dy, n.dx + n.dw, n.dy + n.dh, n.transform);
      }
      if (r === "stroke") {
        const n = s.data, a = n.style.width / 2, o = n.path.bounds;
        t.addFrame(
          o.minX - a,
          o.minY - a,
          o.maxX + a,
          o.maxY + a
        );
      }
    }
    return t;
  }
  /**
   * Check to see if a point is contained within this geometry.
   * @param point - Point to check if it's contained.
   * @returns {boolean} `true` if the point is contained within geometry.
   */
  containsPoint(t) {
    var r;
    if (!this.bounds.containsPoint(t.x, t.y))
      return !1;
    const e = this.instructions;
    let s = !1;
    for (let n = 0; n < e.length; n++) {
      const a = e[n], o = a.data, h = o.path;
      if (!a.action || !h)
        continue;
      const l = o.style, c = h.shapePath.shapePrimitives;
      for (let u = 0; u < c.length; u++) {
        const d = c[u].shape;
        if (!l || !d)
          continue;
        const m = c[u].transform, f = m ? m.applyInverse(t, Sh) : t;
        a.action === "fill" ? s = d.contains(f.x, f.y) : s = d.strokeContains(f.x, f.y, l.width);
        const A = o.hole;
        if (A) {
          const g = (r = A.shapePath) == null ? void 0 : r.shapePrimitives;
          if (g)
            for (let y = 0; y < g.length; y++)
              g[y].shape.contains(f.x, f.y) && (s = !1);
        }
        if (s)
          return !0;
      }
    }
    return s;
  }
  /**
   * Destroys the GraphicsData object.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the fill/stroke style?
   * @param {boolean} [options.textureSource=false] - Should it destroy the texture source of the fill/stroke style?
   */
  destroy(t = !1) {
    if (this._stateStack.length = 0, this._transform = null, this.emit("destroy", this), this.removeAllListeners(), typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
      const s = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
      this._fillStyle.texture && this._fillStyle.texture.destroy(s), this._strokeStyle.texture && this._strokeStyle.texture.destroy(s);
    }
    this._fillStyle = null, this._strokeStyle = null, this.instructions = null, this._activePath = null, this._bounds = null, this._stateStack = null, this.customShader = null, this._transform = null;
  }
};
oi.defaultFillStyle = {
  /** The color to use for the fill. */
  color: 16777215,
  /** The alpha value to use for the fill. */
  alpha: 1,
  /** The texture to use for the fill. */
  texture: H.WHITE,
  /** The matrix to apply. */
  matrix: null,
  /** The fill pattern to use. */
  fill: null
};
oi.defaultStrokeStyle = {
  /** The width of the stroke. */
  width: 1,
  /** The color to use for the stroke. */
  color: 16777215,
  /** The alpha value to use for the stroke. */
  alpha: 1,
  /** The alignment of the stroke. */
  alignment: 0.5,
  /** The miter limit to use. */
  miterLimit: 10,
  /** The line cap style to use. */
  cap: "butt",
  /** The line join style to use. */
  join: "miter",
  /** The texture to use for the fill. */
  texture: H.WHITE,
  /** The matrix to apply. */
  matrix: null,
  /** The fill pattern to use. */
  fill: null
};
let Th = oi;
function hi(i, t = 1) {
  var s;
  const e = (s = fe.RETINA_PREFIX) == null ? void 0 : s.exec(i);
  return e ? parseFloat(e[1]) : t;
}
function ci(i, t, e) {
  i.label = e;
  const s = new H({
    source: i,
    label: e
  }), r = () => {
    delete t.promiseCache[e], ht.has(e) && ht.remove(e);
  };
  return s.once("destroy", () => {
    e in t.promiseCache && (it("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."), r());
  }), s.source.once("destroy", () => {
    i.destroyed || (it("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."), r());
  }), s;
}
const Rh = ".svg", bh = "image/svg+xml", _h = {
  extension: {
    type: O.LoadParser,
    priority: ee.Low
  },
  name: "loadSVG",
  config: {
    crossOrigin: "anonymous",
    parseAsGraphicsContext: !1
  },
  test(i) {
    return pe(i, bh) || me(i, Rh);
  },
  async load(i, t, e) {
    return t.data.parseAsGraphicsContext ?? this.config.parseAsGraphicsContext ? Ih(i) : Nh(i, t, e, this.config.crossOrigin);
  },
  unload(i) {
    i.destroy(!0);
  }
};
async function Nh(i, t, e, s) {
  var g, y, E;
  const n = await (await dt.get().fetch(i)).blob(), a = URL.createObjectURL(n), o = new Image();
  o.src = a, o.crossOrigin = s, await o.decode(), URL.revokeObjectURL(a);
  const h = document.createElement("canvas"), l = h.getContext("2d"), c = ((g = t.data) == null ? void 0 : g.resolution) || hi(i), u = ((y = t.data) == null ? void 0 : y.width) ?? o.width, d = ((E = t.data) == null ? void 0 : E.height) ?? o.height;
  h.width = u * c, h.height = d * c, l.drawImage(o, 0, 0, u * c, d * c);
  const { parseAsGraphicsContext: m, ...f } = t.data, A = new Ge({
    resource: h,
    alphaMode: "premultiply-alpha-on-upload",
    resolution: c,
    ...f
  });
  return ci(A, e, i);
}
async function Ih(i) {
  const e = await (await dt.get().fetch(i)).text(), s = new Th();
  return s.svg(e), s;
}
const Ch = `(function () {
    'use strict';

    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    async function checkImageBitmap() {
      try {
        if (typeof createImageBitmap !== "function")
          return false;
        const response = await fetch(WHITE_PNG);
        const imageBlob = await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);
        return imageBitmap.width === 1 && imageBitmap.height === 1;
      } catch (e) {
        return false;
      }
    }
    void checkImageBitmap().then((result) => {
      self.postMessage(result);
    });

})();
`;
let oe = null, Xs = class {
  constructor() {
    oe || (oe = URL.createObjectURL(new Blob([Ch], { type: "application/javascript" }))), this.worker = new Worker(oe);
  }
};
Xs.revokeObjectURL = function() {
  oe && (URL.revokeObjectURL(oe), oe = null);
};
const Mh = `(function () {
    'use strict';

    async function loadImageBitmap(url) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \${response.status} \${response.statusText}\`);
      }
      const imageBlob = await response.blob();
      const imageBitmap = await createImageBitmap(imageBlob);
      return imageBitmap;
    }
    self.onmessage = async (event) => {
      try {
        const imageBitmap = await loadImageBitmap(event.data.data[0]);
        self.postMessage({
          data: imageBitmap,
          uuid: event.data.uuid,
          id: event.data.id
        }, [imageBitmap]);
      } catch (e) {
        self.postMessage({
          error: e,
          uuid: event.data.uuid,
          id: event.data.id
        });
      }
    };

})();
`;
let he = null;
class pn {
  constructor() {
    he || (he = URL.createObjectURL(new Blob([Mh], { type: "application/javascript" }))), this.worker = new Worker(he);
  }
}
pn.revokeObjectURL = function() {
  he && (URL.revokeObjectURL(he), he = null);
};
let Qi = 0, Cs;
class Lh {
  constructor() {
    this._initialized = !1, this._createdWorkers = 0, this._workerPool = [], this._queue = [], this._resolveHash = {};
  }
  isImageBitmapSupported() {
    return this._isImageBitmapSupported !== void 0 ? this._isImageBitmapSupported : (this._isImageBitmapSupported = new Promise((t) => {
      const { worker: e } = new Xs();
      e.addEventListener("message", (s) => {
        e.terminate(), Xs.revokeObjectURL(), t(s.data);
      });
    }), this._isImageBitmapSupported);
  }
  loadImageBitmap(t) {
    return this._run("loadImageBitmap", [t]);
  }
  async _initWorkers() {
    this._initialized || (this._initialized = !0);
  }
  _getWorker() {
    Cs === void 0 && (Cs = navigator.hardwareConcurrency || 4);
    let t = this._workerPool.pop();
    return !t && this._createdWorkers < Cs && (this._createdWorkers++, t = new pn().worker, t.addEventListener("message", (e) => {
      this._complete(e.data), this._returnWorker(e.target), this._next();
    })), t;
  }
  _returnWorker(t) {
    this._workerPool.push(t);
  }
  _complete(t) {
    t.error !== void 0 ? this._resolveHash[t.uuid].reject(t.error) : this._resolveHash[t.uuid].resolve(t.data), this._resolveHash[t.uuid] = null;
  }
  async _run(t, e) {
    await this._initWorkers();
    const s = new Promise((r, n) => {
      this._queue.push({ id: t, arguments: e, resolve: r, reject: n });
    });
    return this._next(), s;
  }
  _next() {
    if (!this._queue.length)
      return;
    const t = this._getWorker();
    if (!t)
      return;
    const e = this._queue.pop(), s = e.id;
    this._resolveHash[Qi] = { resolve: e.resolve, reject: e.reject }, t.postMessage({
      data: e.arguments,
      uuid: Qi++,
      id: s
    });
  }
}
const ji = new Lh(), vh = [".jpeg", ".jpg", ".png", ".webp", ".avif"], Ph = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
];
async function Dh(i) {
  const t = await dt.get().fetch(i);
  if (!t.ok)
    throw new Error(`[loadImageBitmap] Failed to fetch ${i}: ${t.status} ${t.statusText}`);
  const e = await t.blob();
  return await createImageBitmap(e);
}
const mn = {
  name: "loadTextures",
  extension: {
    type: O.LoadParser,
    priority: ee.High
  },
  config: {
    preferWorkers: !0,
    preferCreateImageBitmap: !0,
    crossOrigin: "anonymous"
  },
  test(i) {
    return pe(i, Ph) || me(i, vh);
  },
  async load(i, t, e) {
    var n;
    let s = null;
    globalThis.createImageBitmap && this.config.preferCreateImageBitmap ? this.config.preferWorkers && await ji.isImageBitmapSupported() ? s = await ji.loadImageBitmap(i) : s = await Dh(i) : s = await new Promise((a) => {
      s = new Image(), s.crossOrigin = this.config.crossOrigin, s.src = i, s.complete ? a(s) : s.onload = () => {
        a(s);
      };
    });
    const r = new Ge({
      resource: s,
      alphaMode: "premultiply-alpha-on-upload",
      resolution: ((n = t.data) == null ? void 0 : n.resolution) || hi(i),
      ...t.data
    });
    return ci(r, e, i);
  },
  unload(i) {
    i.destroy(!0);
  }
}, gn = [".mp4", ".m4v", ".webm", ".ogg", ".ogv", ".h264", ".avi", ".mov"], wh = gn.map((i) => `video/${i.substring(1)}`);
function Oh(i, t, e) {
  e === void 0 && !t.startsWith("data:") ? i.crossOrigin = Bh(t) : e !== !1 && (i.crossOrigin = typeof e == "string" ? e : "anonymous");
}
function Wh(i) {
  return new Promise((t, e) => {
    i.addEventListener("canplaythrough", s), i.addEventListener("error", r), i.load();
    function s() {
      n(), t();
    }
    function r(a) {
      n(), e(a);
    }
    function n() {
      i.removeEventListener("canplaythrough", s), i.removeEventListener("error", r);
    }
  });
}
function Bh(i, t = globalThis.location) {
  if (i.startsWith("data:"))
    return "";
  t = t || globalThis.location;
  const e = new URL(i, document.baseURI);
  return e.hostname !== t.hostname || e.port !== t.port || e.protocol !== t.protocol ? "anonymous" : "";
}
const kh = {
  name: "loadVideo",
  extension: {
    type: O.LoadParser
  },
  config: null,
  test(i) {
    const t = pe(i, wh), e = me(i, gn);
    return t || e;
  },
  async load(i, t, e) {
    var h, l;
    const s = {
      ...rs.defaultOptions,
      resolution: ((h = t.data) == null ? void 0 : h.resolution) || hi(i),
      alphaMode: ((l = t.data) == null ? void 0 : l.alphaMode) || await Yr(),
      ...t.data
    }, r = document.createElement("video"), n = {
      preload: s.autoLoad !== !1 ? "auto" : void 0,
      "webkit-playsinline": s.playsinline !== !1 ? "" : void 0,
      playsinline: s.playsinline !== !1 ? "" : void 0,
      muted: s.muted === !0 ? "" : void 0,
      loop: s.loop === !0 ? "" : void 0,
      autoplay: s.autoPlay !== !1 ? "" : void 0
    };
    Object.keys(n).forEach((c) => {
      const u = n[c];
      u !== void 0 && r.setAttribute(c, u);
    }), s.muted === !0 && (r.muted = !0), Oh(r, i, s.crossorigin);
    const a = document.createElement("source");
    let o;
    if (i.startsWith("data:"))
      o = i.slice(5, i.indexOf(";"));
    else if (!i.startsWith("blob:")) {
      const c = i.split("?")[0].slice(i.lastIndexOf(".") + 1).toLowerCase();
      o = rs.MIME_TYPES[c] || `video/${c}`;
    }
    return a.src = i, o && (a.type = o), new Promise((c) => {
      const u = async () => {
        const d = new rs({ ...s, resource: r });
        r.removeEventListener("canplay", u), t.data.preload && await Wh(r), c(ci(d, e, i));
      };
      r.addEventListener("canplay", u), r.appendChild(a);
    });
  },
  unload(i) {
    i.destroy(!0);
  }
}, An = {
  extension: O.ResolveParser,
  test: mn.test,
  parse: (i) => {
    var t;
    return {
      resolution: parseFloat(((t = fe.RETINA_PREFIX.exec(i)) == null ? void 0 : t[1]) ?? "1"),
      format: i.split(".").pop(),
      src: i
    };
  }
}, Yh = {
  extension: O.ResolveParser,
  test: (i) => fe.RETINA_PREFIX.test(i) && i.endsWith(".json"),
  parse: An.parse
};
class Uh {
  constructor() {
    this._detections = [], this._initialized = !1, this.resolver = new fe(), this.loader = new Ya(), this.cache = ht, this._backgroundLoader = new La(this.loader), this._backgroundLoader.active = !0, this.reset();
  }
  /**
   * Best practice is to call this function before any loading commences
   * Initiating is the best time to add any customization to the way things are loaded.
   *
   * you do not need to call this for the Assets class to work, only if you want to set any initial properties
   * @param options - options to initialize the Assets manager with
   */
  async init(t = {}) {
    var n, a;
    if (this._initialized) {
      it("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");
      return;
    }
    if (this._initialized = !0, t.defaultSearchParams && this.resolver.setDefaultSearchParams(t.defaultSearchParams), t.basePath && (this.resolver.basePath = t.basePath), t.bundleIdentifier && this.resolver.setBundleIdentifier(t.bundleIdentifier), t.manifest) {
      let o = t.manifest;
      typeof o == "string" && (o = await this.load(o)), this.resolver.addManifest(o);
    }
    const e = ((n = t.texturePreference) == null ? void 0 : n.resolution) ?? 1, s = typeof e == "number" ? [e] : e, r = await this._detectFormats({
      preferredFormats: (a = t.texturePreference) == null ? void 0 : a.format,
      skipDetections: t.skipDetections,
      detections: this._detections
    });
    this.resolver.prefer({
      params: {
        format: r,
        resolution: s
      }
    }), t.preferences && this.setPreferences(t.preferences);
  }
  /**
   * Allows you to specify how to resolve any assets load requests.
   * There are a few ways to add things here as shown below:
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Simple
   * Assets.add({alias: 'bunnyBooBoo', src: 'bunny.png'});
   * const bunny = await Assets.load('bunnyBooBoo');
   *
   * // Multiple keys:
   * Assets.add({alias: ['burger', 'chicken'], src: 'bunny.png'});
   *
   * const bunny = await Assets.load('burger');
   * const bunny2 = await Assets.load('chicken');
   *
   * // passing options to to the object
   * Assets.add({
   *     alias: 'bunnyBooBooSmooth',
   *     src: 'bunny{png,webp}',
   *     data: { scaleMode: SCALE_MODES.NEAREST }, // Base texture options
   * });
   *
   * // Multiple assets
   *
   * // The following all do the same thing:
   *
   * Assets.add({alias: 'bunnyBooBoo', src: 'bunny{png,webp}'});
   *
   * Assets.add({
   *     alias: 'bunnyBooBoo',
   *     src: [
   *         'bunny.png',
   *         'bunny.webp',
   *    ],
   * });
   *
   * const bunny = await Assets.load('bunnyBooBoo'); // Will try to load WebP if available
   * @param assets - the unresolved assets to add to the resolver
   */
  add(t) {
    this.resolver.add(t);
  }
  async load(t, e) {
    this._initialized || await this.init();
    const s = as(t), r = Rt(t).map((o) => {
      if (typeof o != "string") {
        const h = this.resolver.getAlias(o);
        return h.some((l) => !this.resolver.hasKey(l)) && this.add(o), Array.isArray(h) ? h[0] : h;
      }
      return this.resolver.hasKey(o) || this.add({ alias: o, src: o }), o;
    }), n = this.resolver.resolve(r), a = await this._mapLoadToResolve(n, e);
    return s ? a[r[0]] : a;
  }
  /**
   * This adds a bundle of assets in one go so that you can load them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle('animals', [
   *  { alias: 'bunny', src: 'bunny.png' },
   *  { alias: 'chicken', src: 'chicken.png' },
   *  { alias: 'thumper', src: 'thumper.png' },
   * ]);
   * // or
   * Assets.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const assets = await Assets.loadBundle('animals');
   * @param bundleId - the id of the bundle to add
   * @param assets - a record of the asset or assets that will be chosen from when loading via the specified key
   */
  addBundle(t, e) {
    this.resolver.addBundle(t, e);
  }
  /**
   * Bundles are a way to load multiple assets at once.
   * If a manifest has been provided to the init function then you can load a bundle, or bundles.
   * you can also add bundles via `addBundle`
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * await Assets.init({ manifest });
   *
   * // Load a bundle...
   * loadScreenAssets = await Assets.loadBundle('load-screen');
   * // Load another bundle...
   * gameScreenAssets = await Assets.loadBundle('game-screen');
   * @param bundleIds - the bundle id or ids to load
   * @param onProgress - Optional function that is called when progress on asset loading is made.
   * The function is passed a single parameter, `progress`, which represents the percentage (0.0 - 1.0)
   * of the assets loaded. Do not use this function to detect when assets are complete and available,
   * instead use the Promise returned by this function.
   * @returns all the bundles assets or a hash of assets for each bundle specified
   */
  async loadBundle(t, e) {
    this._initialized || await this.init();
    let s = !1;
    typeof t == "string" && (s = !0, t = [t]);
    const r = this.resolver.resolveBundle(t), n = {}, a = Object.keys(r);
    let o = 0, h = 0;
    const l = () => {
      e == null || e(++o / h);
    }, c = a.map((u) => {
      const d = r[u];
      return h += Object.keys(d).length, this._mapLoadToResolve(d, l).then((m) => {
        n[u] = m;
      });
    });
    return await Promise.all(c), s ? n[t[0]] : n;
  }
  /**
   * Initiate a background load of some assets. It will passively begin to load these assets in the background.
   * So when you actually come to loading them you will get a promise that resolves to the loaded assets immediately
   *
   * An example of this might be that you would background load game assets after your inital load.
   * then when you got to actually load your game screen assets when a player goes to the game - the loading
   * would already have stared or may even be complete, saving you having to show an interim load bar.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.backgroundLoad('bunny.png');
   *
   * // later on in your app...
   * await Assets.loadBundle('bunny.png'); // Will resolve quicker as loading may have completed!
   * @param urls - the url / urls you want to background load
   */
  async backgroundLoad(t) {
    this._initialized || await this.init(), typeof t == "string" && (t = [t]);
    const e = this.resolver.resolve(t);
    this._backgroundLoader.add(Object.values(e));
  }
  /**
   * Initiate a background of a bundle, works exactly like backgroundLoad but for bundles.
   * this can only be used if the loader has been initiated with a manifest
   * @example
   * import { Assets } from 'pixi.js';
   *
   * await Assets.init({
   *     manifest: {
   *         bundles: [
   *             {
   *                 name: 'load-screen',
   *                 assets: [...],
   *             },
   *             ...
   *         ],
   *     },
   * });
   *
   * Assets.backgroundLoadBundle('load-screen');
   *
   * // Later on in your app...
   * await Assets.loadBundle('load-screen'); // Will resolve quicker as loading may have completed!
   * @param bundleIds - the bundleId / bundleIds you want to background load
   */
  async backgroundLoadBundle(t) {
    this._initialized || await this.init(), typeof t == "string" && (t = [t]);
    const e = this.resolver.resolveBundle(t);
    Object.values(e).forEach((s) => {
      this._backgroundLoader.add(Object.values(s));
    });
  }
  /**
   * Only intended for development purposes.
   * This will wipe the resolver and caches.
   * You will need to reinitialize the Asset
   */
  reset() {
    this.resolver.reset(), this.loader.reset(), this.cache.reset(), this._initialized = !1;
  }
  get(t) {
    if (typeof t == "string")
      return ht.get(t);
    const e = {};
    for (let s = 0; s < t.length; s++)
      e[s] = ht.get(t[s]);
    return e;
  }
  /**
   * helper function to map resolved assets back to loaded assets
   * @param resolveResults - the resolve results from the resolver
   * @param onProgress - the progress callback
   */
  async _mapLoadToResolve(t, e) {
    const s = [...new Set(Object.values(t))];
    this._backgroundLoader.active = !1;
    const r = await this.loader.load(s, e);
    this._backgroundLoader.active = !0;
    const n = {};
    return s.forEach((a) => {
      const o = r[a.src], h = [a.src];
      a.alias && h.push(...a.alias), h.forEach((l) => {
        n[l] = o;
      }), ht.set(h, o);
    }), n;
  }
  /**
   * Unload an asset or assets. As the Assets class is responsible for creating the assets via the `load` function
   * this will make sure to destroy any assets and release them from memory.
   * Once unloaded, you will need to load the asset again.
   *
   * Use this to help manage assets if you find that you have a large app and you want to free up memory.
   *
   * - it's up to you as the developer to make sure that textures are not actively being used when you unload them,
   * Pixi won't break but you will end up with missing assets. Not a good look for the user!
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Load a URL:
   * const myImageTexture = await Assets.load('http://some.url.com/image.png'); // => returns a texture
   *
   * await Assets.unload('http://some.url.com/image.png')
   *
   * // myImageTexture will be destroyed now.
   *
   * // Unload multiple assets:
   * const textures = await Assets.unload(['thumper', 'chicko']);
   * @param urls - the urls to unload
   */
  async unload(t) {
    this._initialized || await this.init();
    const e = Rt(t).map((r) => typeof r != "string" ? r.src : r), s = this.resolver.resolve(e);
    await this._unloadFromResolved(s);
  }
  /**
   * Bundles are a way to manage multiple assets at once.
   * this will unload all files in a bundle.
   *
   * once a bundle has been unloaded, you need to load it again to have access to the assets.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle({
   *     'thumper': 'http://some.url.com/thumper.png',
   * })
   *
   * const assets = await Assets.loadBundle('thumper');
   *
   * // Now to unload...
   *
   * await Assets.unloadBundle('thumper');
   *
   * // All assets in the assets object will now have been destroyed and purged from the cache
   * @param bundleIds - the bundle id or ids to unload
   */
  async unloadBundle(t) {
    this._initialized || await this.init(), t = Rt(t);
    const e = this.resolver.resolveBundle(t), s = Object.keys(e).map((r) => this._unloadFromResolved(e[r]));
    await Promise.all(s);
  }
  async _unloadFromResolved(t) {
    const e = Object.values(t);
    e.forEach((s) => {
      ht.remove(s.src);
    }), await this.loader.unload(e);
  }
  /**
   * Detects the supported formats for the browser, and returns an array of supported formats, respecting
   * the users preferred formats order.
   * @param options - the options to use when detecting formats
   * @param options.preferredFormats - the preferred formats to use
   * @param options.skipDetections - if we should skip the detections altogether
   * @param options.detections - the detections to use
   * @returns - the detected formats
   */
  async _detectFormats(t) {
    let e = [];
    t.preferredFormats && (e = Array.isArray(t.preferredFormats) ? t.preferredFormats : [t.preferredFormats]);
    for (const s of t.detections)
      t.skipDetections || await s.test() ? e = await s.add(e) : t.skipDetections || (e = await s.remove(e));
    return e = e.filter((s, r) => e.indexOf(s) === r), e;
  }
  /** All the detection parsers currently added to the Assets class. */
  get detections() {
    return this._detections;
  }
  /**
   * General setter for preferences. This is a helper function to set preferences on all parsers.
   * @param preferences - the preferences to set
   */
  setPreferences(t) {
    this.loader.parsers.forEach((e) => {
      e.config && Object.keys(e.config).filter((s) => s in t).forEach((s) => {
        e.config[s] = t[s];
      });
    });
  }
}
const re = new Uh();
yt.handleByList(O.LoadParser, re.loader.parsers).handleByList(O.ResolveParser, re.resolver.parsers).handleByList(O.CacheParser, re.cache.parsers).handleByList(O.DetectionParser, re.detections);
yt.add(
  va,
  Da,
  Pa,
  ka,
  Oa,
  Wa,
  Ba,
  Ga,
  za,
  Za,
  _h,
  mn,
  kh,
  An,
  Yh
);
const qi = {
  loader: O.LoadParser,
  resolver: O.ResolveParser,
  cache: O.CacheParser,
  detection: O.DetectionParser
};
yt.handle(O.Asset, (i) => {
  const t = i.ref;
  Object.entries(qi).filter(([e]) => !!t[e]).forEach(([e, s]) => yt.add(Object.assign(
    t[e],
    // Allow the function to optionally define it's own
    // ExtensionMetadata, the use cases here is priority for LoaderParsers
    { extension: t[e].extension ?? s }
  )));
}, (i) => {
  const t = i.ref;
  Object.keys(qi).filter((e) => !!t[e]).forEach((e) => yt.remove(t[e]));
});
yt.add(Tn, Rn);
const Ki = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsSAAALEgHS3X78AAAAo0lEQVQokZ2SAQ2DMBBF/6pgDsYcIAEJSEAKEiZhEiZhEsBBJeDgL58c3Y3AoP3JJW1zr+3d/QtJrNQBqC0igAHAy9ZfCbRoSUbuq3e5Cez+AF5PD1Ykp5Mg7Wcz+MiAaOVAzVHRt3WHDnQPBZBUhQJolsCxgIvBhpsjPRTV1WvmOBpvgPokrNH9OGeBhx1Al8pdKX/L5DJ36/Yy+RvAlE4AfACcPn/i7BJmRgAAAABJRU5ErkJggg==";
class zh {
  constructor(t, e, s) {
    this.subdivisions = 1, this.renderSpeed = 1, this.fixedRenderSpeed = 1, this.renderMultiplier = 1, this.pointerDown = !1, this.mouseEnabled = !0, this.brushSize = 1, this.tile = t, this.rendererHeight = s, this.rendererWidth = e, this.tileWidth = this.tile.width, this.tileHeight = this.tile.height, this.totalSites = this.tileWidth * this.tileHeight, this.siteSize = ~~(this.maxValue(this.rendererHeight, this.rendererWidth) / this.maxValue(this.tileHeight, this.tileWidth)), this.siteArray = Array.from(t.sites.values()).sort((r) => Math.random() - 0.5);
  }
  async init() {
    await this.initializePIXI(), await this.initializeVisuals();
    const t = this.calculateSubdivisions();
    this.setSubdivisions(t), this.initializeClickArea(), this.startRendering();
  }
  calculateSubdivisions() {
    let t = Math.sqrt(this.tileWidth) * 0.25;
    if (this.tileWidth / t % 1 !== 0) {
      t = ~~t;
      do
        t--;
      while (this.tileWidth / t % 1 !== 0);
    }
    return t < 1 && (t = 1), t;
  }
  setSubdivisions(t) {
    this.subdivisions = t, this.createSubdivisions(this.subdivisions), this.setRenderMultiplier(this.renderMultiplier);
  }
  setRenderMultiplier(t) {
    this.renderMultiplier = t, this.renderSpeed = this.totalSites / this.gridDivisions.length * this.renderMultiplier, this.fixedRenderSpeed = this.totalSites * this.renderMultiplier;
  }
  async initializePIXI() {
    this.particleContainer = new ot(), this.pixiApplication = new jr(), await this.pixiApplication.init({
      width: this.rendererWidth,
      height: this.rendererHeight,
      antialias: !1,
      backgroundAlpha: 16777215,
      backgroundColor: 2236962,
      resolution: 1
    }), this.pixiApplication.stage.addChild(this.particleContainer), this.view = this.pixiApplication.canvas;
  }
  async initializeVisuals() {
    this.siteTexture = await re.load(Ki);
    const t = 14;
    this.siteVisuals = /* @__PURE__ */ new Map();
    for (let e = 0; e < this.tileHeight; e++)
      for (let s = 0; s < this.tileWidth; s++) {
        let r = ue.from(this.siteTexture);
        r.interactive = !1, r.scale = new rt(this.siteSize / t, this.siteSize / t), r.x = s * this.siteSize, r.y = e * this.siteSize, r.cacheAsBitmap = !0, r.tint = this.tile.sites.get(`${e}:${s}`).atom.rd("color"), this.particleContainer.addChild(r), this.siteVisuals.set(this.tile.sites.get(`${e}:${s}`), r);
      }
  }
  createSubdivisions(t) {
    let e = ~~(this.tileWidth / t), s = ~~(this.tileHeight / t);
    this.gridDivisions = new Array();
    for (let r = 0; r < this.tileHeight; r += s)
      for (let n = 0; n < this.tileWidth; n += e) {
        const a = r + s, o = n + e;
        this.gridDivisions.push([r, a, n, o]);
      }
    this.gridDivisionTotal = this.gridDivisions.length;
  }
  startRendering() {
    this.pixiApplication.ticker.add((t) => {
      this.render();
    });
  }
  deconstruct() {
    re.load(Ki), this.particleContainer.destroy(!0), this.pixiApplication.stop(), this.pixiApplication.destroy(!0);
  }
  render() {
    let t = 0, e = 0, s = this.fixedRenderSpeed;
    for (t; t < s; t++) {
      const { atom: r, ew: n } = this.tile.getRandomSiteSeeded();
      r.behave(n);
    }
    for (e; e < this.totalSites; e++) {
      const r = this.siteArray[e], n = this.siteVisuals.get(r), a = r.atom.state.color;
      n.tint !== a && (n.tint = a);
    }
  }
  initializeClickArea() {
    this.clickArea = new ot(), this.clickArea.hitArea = new et(0, 0, this.rendererWidth, this.rendererHeight), this.clickArea.interactive = !0, this.pixiApplication.stage.addChild(this.clickArea), this.clickArea.on("pointerdown", (t) => {
      this.pointerDown = !0, this.handleClick(t);
    }), this.clickArea.on("pointerup", (t) => {
      this.pointerDown = !1;
    }), this.clickArea.on("pointermove", this.handleClick, this);
  }
  getSitesFromCanvasXY(t, e, s = 1) {
    let r = new Array();
    const n = this.getSiteFromCanvasXY(t, e);
    if (!n)
      return r;
    switch (n.location.coordinate.x, n.location.coordinate.y, s) {
      case 5:
        r.push(...T.LAYER4.map((a) => n.ew.getSite(a)));
      case 4:
        r.push(...T.LAYER3.map((a) => n.ew.getSite(a)));
      case 3:
        r.push(...T.LAYER2.map((a) => n.ew.getSite(a)));
      case 2:
        r.push(...T.LAYER1.map((a) => n.ew.getSite(a)));
      case 1:
        r.push(n);
    }
    return r.filter((a) => a);
  }
  getSiteFromCanvasXY(t, e) {
    return t = t / this.siteSize >> 0, e = e / this.siteSize >> 0, this.tile.getSiteByCoordinate({ x: t, y: e });
  }
  handleClick(t) {
    if (this.mouseEnabled && this.pointerDown && t.target) {
      let e = this.pixiApplication.stage.toLocal(t.global);
      this.getSitesFromCanvasXY(e.x, e.y, this.brushSize).forEach((r) => {
        this.addAtom(r);
      });
    }
  }
  addAtom(t) {
    this.selectedSite = t, t && this.curSelectedElementFunction && (t.atom = this.curSelectedElementFunction());
  }
  minValue(t, e) {
    return t < e ? t : e;
  }
  maxValue(t, e) {
    return t > e ? t : e;
  }
  clear() {
    this.tile.clear();
  }
}
const at = class at {
  static CREATE(t, e = "EMPTY") {
    return (s, r = 1) => {
      var n;
      if (T.oneIn(r) && s.any(t, e)) {
        const a = (n = s.filter(t, e, !0)) == null ? void 0 : n[0];
        return s.swap(a);
      }
      return !1;
    };
  }
};
at.DOWN = at.CREATE(T.S), at.SIDE = at.CREATE([6, 8]), at.SLIP = at.CREATE(T.EQUATOR), at.SINK = at.CREATE([...T.S, 6, 8], "WATER"), at.FLOAT = at.CREATE([...T.N, 5, 7], "WATER"), at.PATROL = at.CREATE(T.ADJACENT4WAY), at.PATROL_8 = at.CREATE(T.ADJACENT8WAY);
let Pt = at;
const Le = class Le extends V {
  constructor(t, e = {}) {
    super(t, e);
  }
  behave(t) {
    super.behave(t), Pt.PATROL(t);
  }
};
Le.CREATE = Le.CREATOR({ name: "RES", class: Le, color: 938240, groups: ["MFM"] });
let $s = Le;
const ne = class ne extends V {
  constructor(t, e = {}) {
    super(t, e);
  }
  behave(t) {
    super.behave(t);
    const e = t.filter(T.ADJACENT4WAY, null, !0)[0];
    if (t.is(e, "EMPTY")) {
      const s = T.oneIn(this.state.pDREG_CREATE), r = T.oneIn(this.state.pRES_CREATE);
      s ? t.move(e, ne.CREATE()) : r ? t.move(e, $s.CREATE()) : t.swap(e);
    } else
      (t.is(e, "DREG") && T.oneIn(this.state.pDREG_DESTROY) || T.oneIn(this.state.pANY_DESTROY)) && t.move(e);
  }
};
ne.CREATE = ne.CREATOR(
  { name: "DREG", class: ne, color: 16719904, groups: ["MFM"] },
  {
    pDREG_CREATE: 1e3,
    pRES_CREATE: 200,
    pDREG_DESTROY: 10,
    pANY_DESTROY: 100
  }
);
let Ji = ne;
const ae = class ae extends V {
  constructor(t, e = {}) {
    super(t, e);
  }
  behave(t) {
    super.behave(t), t.replace(T.RANDOM(T.ADJACENT4WAY), ae.CREATE({ color: (this.rd("color") + 512) % 16777215 }));
  }
};
ae.CREATE = ae.CREATOR({ name: "FORKBOMB", symbol: "FKB", class: ae, color: 14483456, groups: ["MFM"] });
let Zi = ae;
class He {
  static MAKE_DECAY(t, e = 1) {
    return (s, r) => {
      const { age: n } = r.state;
      n > t && T.oneIn(e) && s.destroy();
    };
  }
  static DECAY(t, e, s, r = 1) {
    const { age: n } = e.state;
    return n > s && T.oneIn(r) ? (t.destroy(), !0) : !1;
  }
}
const qt = class qt extends V {
  constructor(t, e = {}) {
    super(t, e);
  }
  behave(t) {
    super.behave(t);
    const e = t.filterByType(T.ADJACENT8WAY, "FORKBOMB");
    e.length && t.mutateMany(e, qt.CREATE, [{ color: (this.rd("color") + 2048) % 16777215 }, {}]), He.DECAY(t, this, 40);
    const s = t.filterByType(T.ADJACENT8WAY, "ANTIFORKBOMB");
    s.length && T.oneIn(2) && t.mutateMany(s, qt.CREATE, [{ color: (this.rd("color") + 1024) % 11206655 }, { age: this.state.age - 1 }]);
  }
};
qt.CREATE = qt.CREATOR({ name: "ANTIFORKBOMB", symbol: "AFK", class: qt, color: 43741, groups: ["MFM"] });
let Qs = qt;
const p = class p {
  static directionToIndex(t, e = !1) {
    return p.DIRECTIONS_INDEX_MAP.get(t);
  }
  static indexToDirection(t, e = !1) {
    return p.INDEX_DIRECTION_MAP.get(t);
  }
  static getDirectionalMove(t, e = !1) {
    return !e && t.length == 2 ? t = t.split("")[Math.random() * t.length >> 0] : t.length > 2 && (t = T.oneIn(2) ? t.substr(0, 1) : t.substr(1)), p.DIRECTIONS_INDEX_MAP.get(t);
  }
  //given a direction and a DirectionMap, return the next direction
  static nextDirection(t, e) {
    return e.get(t);
  }
  static reverse(t) {
    return p.DIRMAP_REVERSE.get(t);
  }
  //LEFT
  static turnLeft(t) {
    return p.veerLeft(p.veerLeft(t));
  }
  static veerLeft(t) {
    return p.slightLeft(p.slightLeft(t));
  }
  static slightLeft(t) {
    return p.nextDirection(t, p.DIRMAP_COUNTERCLOCKWISE_ALL);
  }
  //RIGHT
  static turnRight(t) {
    return p.veerRight(p.veerRight(t));
  }
  static veerRight(t) {
    return p.slightRight(p.slightRight(t));
  }
  static slightRight(t) {
    return p.nextDirection(t, p.DIRMAP_CLOCKWISE_ALL);
  }
  static getInFront(t, e = !1) {
    return e ? p.DIRECTIONS_FRONT_QUADRANT_MAP.get(t) : p.DIRECTIONS_FRONT_MAP.get(t);
  }
  static getBehind(t, e = !1) {
    return e ? p.DIRECTIONS_BEHIND_QUADRANT_MAP.get(t) : p.DIRECTIONS_BEHIND_MAP.get(t);
  }
  static getLeft(t, e = !1) {
    return e ? p.DIRECTIONS_LEFT_QUADRANT_MAP.get(t) : p.DIRECTIONS_LEFT_MAP.get(t);
  }
  static getRight(t, e = !1) {
    return e ? p.DIRECTIONS_RIGHT_QUADRANT_MAP.get(t) : p.DIRECTIONS_RIGHT_MAP.get(t);
  }
  static slightRandom(t) {
    return T.oneIn(2) ? this.slightRight(t) : this.slightLeft(t);
  }
  static veerRandom(t) {
    return T.oneIn(2) ? this.veerRight(t) : this.veerLeft(t);
  }
  static turnRandom(t) {
    return T.oneIn(2) ? this.turnRight(t) : this.turnLeft(t);
  }
};
p.RANDOM = (t = p.DIRECTIONS) => t[~~(t.length * Math.random())], p.NORTH = "N", p.SOUTH = "S", p.EAST = "E", p.WEST = "W", p.NORTHWEST = "NW", p.NORTHEAST = "NE", p.SOUTHWEST = "SW", p.SOUTHEAST = "SE", p.NORTHNORTHWEST = "NNW", p.WESTNORTHWEST = "WNW", p.NORTHNORTHEAST = "NNE", p.EASTNORTHEAST = "ENE", p.SOUTHSOUTHWEST = "SSW", p.WESTWOUTHWEST = "WSW", p.SOUTHSOUTHEAST = "SSE", p.EASTSOUTHEAST = "ESE", p.DIRECTIONS_PRIMARY = ["N", "E", "S", "W"], p.DIRECTIONS_SECONDARY = ["NW", "NE", "SW", "SE"], p.DIRECTIONS_TERTIARY = ["NNW", "WNW", "SSW", "WSW", "NNE", "ENE", "SSE", "ESE"], p.DIRECTIONS = [...p.DIRECTIONS_PRIMARY, ...p.DIRECTIONS_SECONDARY, ...p.DIRECTIONS_TERTIARY], p.W_LINE = [1, 9, 21, 37], p.N_LINE = [2, 10, 22, 38], p.S_LINE = [3, 11, 23, 39], p.E_LINE = [4, 12, 24, 40], p.NW_LINE = [5, 25], p.SW_LINE = [6, 26], p.NE_LINE = [7, 27], p.SE_LINE = [8, 28], p.WNW_LINE = [13, 29], p.NNW_LINE = [15, 31], p.NNE_LINE = [17, 33], p.ENE_LINE = [19, 35], p.WSW_LINE = [14, 30], p.SSW_LINE = [16, 32], p.SSE_LINE = [18, 34], p.ESE_LINE = [20, 36], p.W_QUADRANT = [1, 9, 13, 14, 21, 29, 30, 37], p.N_QUADRANT = [2, 10, 15, 17, 22, 31, 33, 38], p.S_QUADRANT = [3, 11, 16, 18, 23, 32, 34, 39], p.E_QUADRANT = [4, 12, 19, 20, 24, 35, 36, 40], p.NW_QUADRANT = [5, 13, 15, 25, 29, 31], p.SW_QUADRANT = [6, 14, 16, 26, 30, 32], p.NE_QUADRANT = [7, 17, 19, 27, 33, 35], p.SE_QUADRANT = [8, 18, 20, 28, 34, 36], p.NNW_QUADRANT = [5, 15, 25, 31], p.WNW_QUADRANT = [5, 13, 25, 29], p.SSW_QUADRANT = [6, 16, 26, 32], p.WSW_QUADRANT = [6, 14, 26, 30], p.NNE_QUADRANT = [7, 17, 27, 33], p.ENE_QUADRANT = [7, 19, 27, 35], p.SSE_QUADRANT = [8, 18, 28, 34], p.ESE_QUADRANT = [8, 20, 28, 36], p.DIRMAP_CLOCKWISE_PRIMARY = /* @__PURE__ */ new Map([
  ["E", "S"],
  ["S", "W"],
  ["W", "N"],
  ["N", "E"]
]), p.DIRMAP_COUNTERCLOCKWISE_PRIMARY = /* @__PURE__ */ new Map([
  ["E", "N"],
  ["N", "W"],
  ["W", "S"],
  ["S", "E"]
]), p.DIRMAP_CLOCKWISE_SECONDARY = /* @__PURE__ */ new Map([
  ["E", "SE"],
  ["SE", "S"],
  ["S", "SW"],
  ["SW", "W"],
  ["W", "NW"],
  ["NW", "N"],
  ["N", "NE"],
  ["NE", "E"]
]), p.DIRMAP_COUNTERCLOCKWISE_SECONDARY = /* @__PURE__ */ new Map([
  ["E", "NE"],
  ["NE", "N"],
  ["N", "NW"],
  ["NW", "W"],
  ["W", "SW"],
  ["SW", "S"],
  ["S", "SE"],
  ["SE", "E"]
]), p.DIRMAP_CLOCKWISE_ALL = /* @__PURE__ */ new Map([
  ["E", "ESE"],
  ["ESE", "SE"],
  ["SE", "SSE"],
  ["SSE", "S"],
  ["S", "SSW"],
  ["SSW", "SW"],
  ["SW", "WSW"],
  ["WSW", "W"],
  ["W", "WNW"],
  ["WNW", "NW"],
  ["NW", "NNW"],
  ["NNW", "N"],
  ["N", "NNE"],
  ["NNE", "NE"],
  ["NE", "ENE"],
  ["ENE", "E"]
]), p.DIRMAP_COUNTERCLOCKWISE_ALL = /* @__PURE__ */ new Map([
  ["E", "ENE"],
  ["ENE", "NE"],
  ["NE", "NNE"],
  ["NNE", "N"],
  ["N", "NNW"],
  ["NNW", "NW"],
  ["NW", "WNW"],
  ["WNW", "W"],
  ["W", "WSW"],
  ["WSW", "SW"],
  ["SW", "SSW"],
  ["SSW", "S"],
  ["S", "SSE"],
  ["SSE", "SE"],
  ["SE", "ESE"],
  ["ESE", "E"]
]), p.DIRMAP_REVERSE = /* @__PURE__ */ new Map([
  ["E", "W"],
  ["W", "E"],
  ["S", "N"],
  ["N", "S"],
  ["NW", "SE"],
  ["SE", "NW"],
  ["NE", "SW"],
  ["SW", "NE"],
  ["ENE", "WSW"],
  ["WSW", "ENE"],
  ["NNE", "SSW"],
  ["SSW", "NNE"],
  ["NNW", "SSE"],
  ["SSE", "NNW"],
  ["WNW", "ESE"],
  ["ESE", "WNW"]
]), p.DIRECTIONS_INDEX_MAP = /* @__PURE__ */ new Map([
  ["W", 1],
  ["N", 2],
  ["S", 3],
  ["E", 4],
  ["NW", 5],
  ["SW", 6],
  ["NE", 7],
  ["SE", 8],
  ["WNW", 13],
  ["WSW", 14],
  ["NNW", 15],
  ["SSW", 16],
  ["NNE", 17],
  ["SSE", 18],
  ["ENE", 19],
  ["ESE", 20]
]), p.DIRECTIONS_FRONT_MAP = /* @__PURE__ */ new Map([
  ["W", p.W_LINE],
  ["N", p.N_LINE],
  ["S", p.S_LINE],
  ["E", p.E_LINE],
  ["NW", p.NW_LINE],
  ["SW", p.SW_LINE],
  ["NE", p.NE_LINE],
  ["SE", p.SE_LINE],
  ["WNW", p.WNW_LINE],
  ["NNW", p.NNW_LINE],
  ["NNE", p.NNE_LINE],
  ["ENE", p.ENE_LINE],
  ["WSW", p.WSW_LINE],
  ["SSW", p.SSW_LINE],
  ["SSE", p.SSE_LINE],
  ["ESE", p.ESE_LINE]
]), p.DIRECTIONS_FRONT_QUADRANT_MAP = /* @__PURE__ */ new Map([
  ["W", p.W_QUADRANT],
  ["N", p.N_QUADRANT],
  ["S", p.S_QUADRANT],
  ["E", p.E_QUADRANT],
  ["NW", p.NW_QUADRANT],
  ["SW", p.SW_QUADRANT],
  ["NE", p.NE_QUADRANT],
  ["SE", p.SE_QUADRANT],
  ["WNW", p.WNW_QUADRANT],
  ["NNW", p.NNW_QUADRANT],
  ["NNE", p.NNE_QUADRANT],
  ["ENE", p.ENE_QUADRANT],
  ["WSW", p.WSW_QUADRANT],
  ["SSW", p.SSW_QUADRANT],
  ["SSE", p.SSE_QUADRANT],
  ["ESE", p.ESE_QUADRANT]
]), p.DIRECTIONS_BEHIND_MAP = /* @__PURE__ */ new Map([
  ["W", p.E_LINE],
  ["N", p.S_LINE],
  ["S", p.N_LINE],
  ["E", p.W_LINE],
  ["NW", p.SE_LINE],
  ["SW", p.NE_LINE],
  ["NE", p.SW_LINE],
  ["SE", p.NW_LINE],
  ["WNW", p.ESE_LINE],
  ["NNW", p.SSE_LINE],
  ["NNE", p.SSW_LINE],
  ["ENE", p.WSW_LINE],
  ["WSW", p.ENE_LINE],
  ["SSW", p.NNE_LINE],
  ["SSE", p.NNW_LINE],
  ["ESE", p.WNW_LINE]
]), p.DIRECTIONS_BEHIND_QUADRANT_MAP = /* @__PURE__ */ new Map([
  ["W", p.E_QUADRANT],
  ["N", p.S_QUADRANT],
  ["S", p.N_QUADRANT],
  ["E", p.W_QUADRANT],
  ["NW", p.SE_QUADRANT],
  ["SW", p.NE_QUADRANT],
  ["NE", p.SW_QUADRANT],
  ["SE", p.NW_QUADRANT],
  ["WNW", p.ESE_QUADRANT],
  ["NNW", p.SSE_QUADRANT],
  ["NNE", p.SSW_QUADRANT],
  ["ENE", p.WSW_QUADRANT],
  ["WSW", p.ENE_QUADRANT],
  ["SSW", p.NNE_QUADRANT],
  ["SSE", p.NNW_QUADRANT],
  ["ESE", p.WNW_QUADRANT]
]), p.DIRECTIONS_LEFT_MAP = /* @__PURE__ */ new Map([
  ["W", p.S_LINE],
  ["N", p.W_LINE],
  ["S", p.E_LINE],
  ["E", p.N_LINE],
  ["NW", p.SW_LINE],
  ["SW", p.SE_LINE],
  ["NE", p.NW_LINE],
  ["SE", p.NE_LINE],
  ["WNW", p.SSW_LINE],
  ["NNW", p.WSW_LINE],
  ["NNE", p.WNW_LINE],
  ["ENE", p.NNW_LINE],
  ["WSW", p.SSE_LINE],
  ["SSW", p.ESE_LINE],
  ["SSE", p.ENE_LINE],
  ["ESE", p.NNE_LINE]
]), p.DIRECTIONS_LEFT_QUADRANT_MAP = /* @__PURE__ */ new Map([
  ["W", p.S_QUADRANT],
  ["N", p.W_QUADRANT],
  ["S", p.E_QUADRANT],
  ["E", p.N_QUADRANT],
  ["NW", p.SW_QUADRANT],
  ["SW", p.SE_QUADRANT],
  ["NE", p.NW_QUADRANT],
  ["SE", p.NE_QUADRANT],
  ["WNW", p.SSW_QUADRANT],
  ["NNW", p.WSW_QUADRANT],
  ["NNE", p.WNW_QUADRANT],
  ["ENE", p.NNW_QUADRANT],
  ["WSW", p.SSE_QUADRANT],
  ["SSW", p.ESE_QUADRANT],
  ["SSE", p.ENE_QUADRANT],
  ["ESE", p.NNE_QUADRANT]
]), p.DIRECTIONS_RIGHT_MAP = /* @__PURE__ */ new Map([
  ["W", p.N_LINE],
  ["N", p.E_LINE],
  ["S", p.W_LINE],
  ["E", p.S_LINE],
  ["NW", p.SE_LINE],
  ["SW", p.NE_LINE],
  ["NE", p.SE_LINE],
  ["SE", p.NW_LINE],
  ["WNW", p.ESE_LINE],
  ["NNW", p.SSE_LINE],
  ["NNE", p.SSW_LINE],
  ["ENE", p.WSW_LINE],
  ["WSW", p.ENE_LINE],
  ["SSW", p.NNE_LINE],
  ["SSE", p.NNW_LINE],
  ["ESE", p.WNW_LINE]
]), p.DIRECTIONS_RIGHT_QUADRANT_MAP = /* @__PURE__ */ new Map([
  ["W", p.N_QUADRANT],
  ["N", p.E_QUADRANT],
  ["S", p.W_QUADRANT],
  ["E", p.S_QUADRANT],
  ["NW", p.NE_QUADRANT],
  ["SW", p.NW_QUADRANT],
  ["NE", p.SE_QUADRANT],
  ["SE", p.SW_QUADRANT],
  ["WNW", p.ESE_QUADRANT],
  ["NNW", p.SSE_QUADRANT],
  ["NNE", p.SSW_QUADRANT],
  ["ENE", p.WSW_QUADRANT],
  ["WSW", p.ENE_QUADRANT],
  ["SSW", p.NNE_QUADRANT],
  ["SSE", p.NNW_QUADRANT],
  ["ESE", p.WNW_QUADRANT]
]), p.INDEX_DIRECTION_MAP = /* @__PURE__ */ new Map([
  [1, "W"],
  [2, "N"],
  [3, "S"],
  [4, "E"],
  [5, "NW"],
  [6, "SW"],
  [7, "NE"],
  [8, "SE"],
  [9, "W"],
  [10, "N"],
  [11, "S"],
  [12, "E"],
  [13, "WNW"],
  [14, "WSW"],
  [15, "NNW"],
  [16, "SSW"],
  [17, "NNE"],
  [18, "SSE"],
  [19, "ENE"],
  [20, "ESE"],
  [21, "W"],
  [22, "N"],
  [23, "S"],
  [24, "E"],
  [25, "NW"],
  [26, "SW"],
  [27, "NE"],
  [28, "SE"],
  [29, "WNW"],
  [30, "WSW"],
  [31, "NNW"],
  [32, "SSW"],
  [33, "NNE"],
  [34, "SSE"],
  [35, "ENE"],
  [36, "ESE"],
  [37, "W"],
  [38, "N"],
  [39, "S"],
  [40, "E"]
]);
let b = p;
const li = class li {
  static REVERSE(t) {
    const { heading: e } = t.state;
    e && t.wr("heading", b.reverse(e));
  }
  static SLIGHT_LEFT(t) {
    const { heading: e } = t.state;
    e && t.wr("heading", b.slightLeft(e));
  }
  static VEER_LEFT(t) {
    const { heading: e } = t.state;
    e && t.wr("heading", b.veerLeft(e));
  }
  static TURN_LEFT(t) {
    const { heading: e } = t.state;
    e && t.wr("heading", b.turnLeft(e));
  }
  static SLIGHT_RIGHT(t) {
    const { heading: e } = t.state;
    e && t.wr("heading", b.slightRight(e));
  }
  static VEER_RIGHT(t) {
    const { heading: e } = t.state;
    e && t.wr("heading", b.veerRight(e));
  }
  static TURN_RIGHT(t) {
    const { heading: e } = t.state;
    e && t.wr("heading", b.turnRight(e));
  }
  static SLIGHT_RANDOMLY(t) {
    T.oneIn(2) ? this.SLIGHT_LEFT(t) : this.SLIGHT_RIGHT(t);
  }
  static VEER_RANDOMLY(t) {
    T.oneIn(2) ? this.VEER_LEFT(t) : this.VEER_RIGHT(t);
  }
  static TURN_RANDOMLY(t) {
    T.oneIn(2) ? this.TURN_RIGHT(t) : this.TURN_RIGHT(t);
  }
  static SET_DIRECTION(t, e) {
    t.wr("heading", e);
  }
  static MOVE_IN_DIRECTION(t, e, s, r = "EMPTY", n = xt.CREATE()) {
    const { heading: a } = e.state;
    e.wr("heading", s);
    const o = this.MOVE_DIRECTIONALLY(t, e, r, n);
    return e.wr("heading", a ?? s), o;
  }
  static MOVE_DIRECTIONALLY(t, e, s = "EMPTY", r = xt.CREATE()) {
    const { heading: n } = e.state;
    if (n) {
      const a = b.getDirectionalMove(n, !0);
      if (s === "ANY" || t.is(a, s))
        return t.move(a, r);
    }
    return !1;
  }
  static SWAP_DIRECTIONALLY(t, e, s = "EMPTY") {
    const { heading: r } = e.state;
    if (r) {
      const n = b.getDirectionalMove(r, !0);
      if (s === "ANY" || t.is(n, s))
        return t.swap(n);
    }
    return !1;
  }
  static DIRECT(t, e, s) {
    const { atom: r } = t.getSite(e);
    return r && r.state.heading ? (r.state.heading = s, !0) : !1;
  }
};
li.NAME = "WAYFINDING";
let v = li;
const Y = class Y extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.state.heading || (this.state.heading = "E"), this.state.phase = "BUILD";
  }
  behave(t) {
    var n, a;
    super.behave(t);
    const e = b.directionToIndex(b.turnLeft(this.state.heading)), s = b.directionToIndex(b.turnRight(this.state.heading)), r = b.getInFront(this.state.heading);
    switch (t.is(r[0], "SWAPLINE") && t.destroy(), this.state.phase) {
      case "BUILD":
        const o = b.getInFront(b.veerLeft(this.state.heading)), h = b.getInFront(b.veerRight(this.state.heading));
        if (t.any([...o, ...h], "SWAPLINE"))
          return;
        if (t.is(e, "EMPTY") ? t.mutate(e, this.TYPE.CREATE) : this.state.color = 13421568, t.is(s, "EMPTY") && (t.mutate(s, this.TYPE.CREATE), this.state.color = 16776960), !t.any([e, s], "EMPTY")) {
          this.state.phase = "WAIT_TO_SWAP";
          return;
        }
        t.destroy();
        break;
      case "WAIT_TO_SWAP":
        this.state.color = 6710886, ((n = t.getSite(e)) == null ? void 0 : n.atom.state.phase) !== "BUILD" && ((a = t.getSite(s)) == null ? void 0 : a.atom.state.phase) !== "BUILD" && (this.state.phase = "SWAP");
        break;
      case "SWAP":
        this.state.color = 16737792;
        const l = b.getInFront(b.turnLeft(b.veerLeft(this.state.heading))).slice(0, 2), c = b.getInFront(b.turnRight(b.veerRight(this.state.heading))).slice(0, 2);
        !t.any([...r, ...l, ...c], "SWAPLINE") && v.SWAP_DIRECTIONALLY(t, this, "ANY"), t.getSite(r[0]) || (this.state.phase = "DIE");
        break;
      case "DIE":
        t.destroy();
    }
  }
};
Y.CREATE = Y.CREATOR({ name: "SWAPLINE", symbol: "SWL", class: Y, color: 10070562, groups: ["Swaplines"] }), Y.NORTH = Y.CREATOR({ name: "SWAPLINE NORTH", symbol: "SWL", class: Y, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "N" }), Y.SOUTH = Y.CREATOR({ name: "SWAPLINE SOUTH", symbol: "SWL", class: Y, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "S" }), Y.EAST = Y.CREATOR({ name: "SWAPLINE EAST", symbol: "SWL", class: Y, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "E" }), Y.WEST = Y.CREATOR({ name: "SWAPLINE WEST", symbol: "SWL", class: Y, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "W" }), Y.NW = Y.CREATOR({ name: "SWAPLINE NW", symbol: "SWL", class: Y, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "NW" }), Y.NE = Y.CREATOR({ name: "SWAPLINE NE", symbol: "SWL", class: Y, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "NE" }), Y.SW = Y.CREATOR({ name: "SWAPLINE SW", symbol: "SWL", class: Y, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "SW" }), Y.SE = Y.CREATOR({ name: "SWAPLINE SE", symbol: "SWL", class: Y, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "SE" });
let tr = Y;
class Et extends V {
  // static CREATE = Builder.CREATOR({ name: "BUILDER", symbol: "BLD", class: Builder, color: 0x121112 });
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.classifyAs("BUILDER"), this.state.transitionAge || (this.state.transitionAge = 10);
  }
  behave(t) {
    super.behave(t);
    const { buildPath: e, atomizer: s, totalSteps: r, transitionAge: n, age: a } = this.state, o = this.state.currentStep ?? 0, h = this.state.didSpread ?? !1, l = t.filterByType(e, "EMPTY");
    !h && l.length && (r ? o < r && (t.mutateMany(l, this.TYPE.CREATE, [{}, { currentStep: o + 1 }]), this.state.totalSteps--) : t.mutateMany(l, this.TYPE.CREATE)), this.state.didSpread = !0, a > n && t.mutate(0, s);
  }
}
const j = class j extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), t.selfIs("DECAYABLE") && He.DECAY(t, this, this.state.lifeSpan ?? 100, 2);
  }
};
j.CREATE = j.CREATOR({ name: "WALL", class: j, color: 3346892, groups: ["Structural", "MFM"] }), j.MOVABLE_WALL = j.CREATOR({ name: "MOVABLE WALL", class: j, color: 8917452, classifications: ["MOVABLE"], groups: ["Structural", "MFM"] }), j.DECAY_WALL = j.CREATOR({ name: "DECAY WALL", class: j, color: 238, classifications: ["DECAYABLE", "WALL"], groups: ["Structural"] }), j.DECAY_WALL_10 = j.CREATOR(
  { name: "DECAY WALL 10", class: j, color: 238, classifications: ["DECAYABLE", "WALL", "DECAY WALL"], groups: ["Structural"] },
  { lifeSpan: 10 }
), j.DECAY_WALL_25 = j.CREATOR(
  { name: "DECAY WALL 25", class: j, color: 238, classifications: ["DECAYABLE", "WALL", "DECAY WALL"], groups: ["Structural"] },
  { lifeSpan: 25 }
), j.DECAY_WALL_50 = j.CREATOR(
  { name: "DECAY WALL 50", class: j, color: 238, classifications: ["DECAYABLE", "WALL", "DECAY WALL"], groups: ["Structural"] },
  { lifeSpan: 50 }
), j.MOVABLE_WALL_GRID = Et.CREATOR(
  { name: "MOVABLE WALL GRID", class: Et, color: 1184018, groups: ["Structural"] },
  { buildPath: T.DIAGONAL4WAY, atomizer: j.MOVABLE_WALL }
);
let st = j;
const Bt = class Bt extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), this.regen(t), this.populateRegenMap(t);
  }
  populateRegenMap(t) {
    var s;
    const e = t.filterByType(T.ALLADJACENT, "LIVING WALL");
    e.length > (((s = this.state.regenMap) == null ? void 0 : s.length) ?? 0) && (this.state.regenMap = e.map((r) => [r, t.getSite(r).atom.TYPE.CREATE]), this.state.color = this.TYPE.color - this.state.regenMap.length * 6);
  }
  regen(t) {
    var e;
    (e = this.state.regenMap) != null && e.length && this.state.regenMap.forEach((s) => {
      t.is(s[0], "EMPTY") && t.mutate(s[0], s[1]);
    });
  }
};
Bt.CREATE = Bt.CREATOR({ name: "LIVING WALL", class: Bt, color: 2250154, groups: ["Structural", "MFM"] }), Bt.MOVABLE_LIVING_WALL = Bt.CREATOR({
  name: "MOVABLE LIVING WALL",
  class: Bt,
  color: 2250154,
  classifications: ["MOVABLE", "LIVING WALL"],
  groups: ["Structural", "MFM"]
});
let js = Bt;
const ui = class ui {
  static CREATE(t, e, s = "EMPTY", r) {
    return (n) => {
      let a = !1;
      if (n.any(e, t)) {
        const o = n.filterByType(r, s);
        o.length && (a = n.swap(n.random(o)));
      }
      return a;
    };
  }
  static FAR_NORTH(t, e, s = "EMPTY") {
    return T.oneIn(5) && t.is(3, e) && t.is(10, s) && t.swap(10), !0;
  }
  static MAKE_REPELLER(t, e = [1, 2, 3, 4, 5, 6, 7, 8], s = [37, 38, 39, 40, 25, 26, 27, 28]) {
    return (r, n) => {
      const a = n.state.repelTypes ?? t;
      if (e.length > s.length)
        throw new Error("fromSet must be less than or equal to length of toSet");
      const o = r.filter(e, a), h = r.filter(s, "EMPTY");
      if (o.length && h.length) {
        const l = Object.fromEntries(
          e.map((u, d) => [u, s[d]])
        );
        let c = !1;
        return o.forEach((u) => {
          if (!c) {
            const d = l[u];
            if (h.includes(d))
              c = r.move(d, void 0, u);
            else {
              const m = T.RANDOM(h);
              c = r.move(m, void 0, u);
            }
          }
        }), c;
      }
      return !1;
    };
  }
  static MAKE_AVOIDER(t, e = [1, 2, 3, 4, 5, 6, 7, 8], s = [40, 39, 38, 37, 28, 27, 26, 25]) {
    return (r, n) => {
      const a = n.state.repelTypes ?? t;
      if (e.length > s.length)
        throw new Error("fromSet must be less than or equal to length of toSet");
      const o = r.filter(e, a), h = r.filter(s, "EMPTY");
      if (o.length && h.length) {
        Object.fromEntries(
          e.map((c, u) => [c, s[u]])
        );
        let l = !1;
        return o.forEach((c) => {
          l || (l = r.move(T.RANDOM(h)));
        }), l;
      }
      return !1;
    };
  }
  static MAKE_ATTRACTOR(t, e = T.ALLADJACENT) {
    return (s, r) => {
      const n = r.state.attractTypes ?? t, a = r.state.swapTypes ?? ["EMPTY"], o = s.filter(e, n);
      if (o.length) {
        const h = T.RANDOM(o), l = b.getInFront(b.indexToDirection(h), !0), c = s.filter(l, a);
        if (c.length)
          return c.sort((u, d) => Math.abs(h - u) - Math.abs(h - d)).slice(~~(c.length / 2)), s.swap(T.RANDOM(c));
      }
      return !1;
    };
  }
};
ui.NAME = "REPEL";
let Dt = ui;
const F = class F extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), Pt.DOWN(t) || Pt.SIDE(t), t.selfIs("BUBBLY") && F.BUBBLE(t), t.selfIs("FLOATS") ? Pt.FLOAT(t, 1.25) : Pt.SINK(t);
  }
};
F.CREATE = F.CREATOR({ name: "SAND", symbol: "SND", class: F, color: 16768256, classifications: ["SAND", "MOVABLE"], groups: ["Environment"] }), F.RED_SAND = F.CREATOR({ name: "RED SAND", class: F, color: 16711680, classifications: ["SAND", "BUBBLY", "MOVABLE"], groups: ["Environment"] }), F.PINK_SAND = F.CREATOR({
  name: "PINK SAND",
  class: F,
  color: 16418500,
  classifications: ["BUBBLY", "SAND", "FLOATS", "MOVABLE"],
  groups: ["Environment"]
}), F.FLOATY_SAND = F.CREATOR({
  name: "FLOATY SAND",
  class: F,
  color: 0,
  classifications: ["FLOATS", "SAND", "MOVABLE"],
  groups: ["Environment"]
}), F.GREEN_SAND = F.CREATOR({ name: "GREEN SAND", class: F, color: 9095462, classifications: ["SAND", "MOVABLE"], groups: ["Environment"] }), F.BLUE_SAND = F.CREATOR({ name: "BLUE SAND", class: F, color: 1671876, classifications: ["SAND", "MOVABLE"], groups: ["Environment"] }), F.PURPLE_SAND = F.CREATOR({ name: "PURPLE SAND", class: F, color: 6966419, classifications: ["SAND", "MOVABLE"], groups: ["Environment"] }), F.SAND_GRID = Et.CREATOR(
  { name: "SAND GRID", class: Et, color: 1184018, groups: ["Environment"] },
  { buildPath: T.DIAGONAL4WAY, atomizer: F.CREATE, totalSteps: 40 }
), F.BUBBLE = Dt.CREATE("SAND", T.S_QUADRANT, "EMPTY", T.N_QUADRANT);
let er = F;
const ct = class ct extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.classifyAs("WATER");
  }
  behave(t) {
    super.behave(t), Pt.DOWN(t) || Pt.SLIP(t), t.selfIs("BUBBLY") && ct.DO_BUBBLE(t);
  }
};
ct.CREATE = ct.CREATOR({ name: "WATER", symbol: "SND", class: ct, color: 4590, groups: ["Environment"] }), ct.BUBBLY_WATER = ct.CREATOR({ name: "BUBBLY WATER", class: ct, color: 4590, classifications: ["WATER", "BUBBLY"], groups: ["Environment"] }), ct.WATER_GRID = Et.CREATOR(
  { name: "WATER GRID", class: Et, color: 1184018, groups: ["Environment"] },
  { buildPath: T.DIAGONAL4WAY, atomizer: ct.CREATE, totalSteps: 40 }
), ct.WATER_LINE = Et.CREATOR(
  { name: "WATER LINE", class: Et, color: 1184018, groups: ["Environment"] },
  { buildPath: [1, 4], atomizer: ct.CREATE }
), ct.DO_BUBBLE = Dt.CREATE("WATER", T.S_QUADRANT, "EMPTY", T.N_QUADRANT);
let sr = ct;
const J = class J extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.state.stickyType || (this.state.stickyType = ["GOOP"]), this.state.attractor = Dt.MAKE_ATTRACTOR(
      this.state.stickyType,
      [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    ), this.state.avoider = Dt.MAKE_AVOIDER(this.state.stickyType, [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]), this.state.aloneCount = 0;
  }
  behave(t) {
    super.behave(t), t.filterByType(T.ALLADJACENT, [...this.state.stickyType, "GOOP"]).length, !this.state.attractor(t, this) && !this.state.avoider(t, this) && J.ATTRACT(t, this);
  }
};
J.CREATE = J.CREATOR({ name: "GOOP", symbol: "GOP", class: J, color: 5542562, groups: ["Goopy Stuff"] }), J.WALL_GOOP = J.CREATOR(
  { name: "WALL GOOP", class: J, color: 15110911, classifications: ["GOOP"], groups: ["Goopy Stuff"] },
  { stickyType: ["WALL"] }
), J.LIFE_GOOP = J.CREATOR(
  { name: "LIFE GOOP", class: J, color: 5548439, classifications: ["GOOP", "MOVABLE"], groups: ["Goopy Stuff"] },
  { stickyType: ["DIRECTIONAL", "TAIL"] }
), J.HC3_GOOP = J.CREATOR(
  { name: "HC3 GOOP", class: J, color: 5548439, classifications: ["GOOP", "MOVABLE"], groups: ["Goopy Stuff"] },
  { stickyType: ["HC3-END"] }
), J.GOOP_GRID = Et.CREATOR(
  { name: "GOOP GRID", class: Et, color: 1184018, groups: ["Goopy Stuff"] },
  { buildPath: T.DIAGONAL4WAY, atomizer: J.LIFE_GOOP, totalSteps: 40 }
), J.ATTRACT = Dt.MAKE_ATTRACTOR(["GOOP"], [...T.LAYER2, ...T.LAYER3, ...T.LAYER4]), J.AVOID = Dt.MAKE_AVOIDER(["GOOP"], [...T.LAYER1], [...T.LAYER2, ...T.LAYER3, ...T.LAYER4]);
let ir = J;
const I = class I extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), this.state.directableTypes && this.state.directableTypes.forEach((e) => {
      t.filter(T.ALLADJACENT, e).forEach((r) => {
        v.DIRECT(t, r, this.state.pointing);
      });
    }), t.selfIs("DECAYABLE") && He.DECAY(t, this, this.state.lifeSpan ?? 100, 2);
  }
};
I.N = I.CREATOR(
  { name: "DIRECTOR N", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "N", directableTypes: ["DIRECTABLE"] }
), I.S = I.CREATOR(
  { name: "DIRECTOR S", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "S", directableTypes: ["DIRECTABLE"] }
), I.E = I.CREATOR(
  { name: "DIRECTOR E", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "E", directableTypes: ["DIRECTABLE"] }
), I.W = I.CREATOR(
  { name: "DIRECTOR W", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "W", directableTypes: ["DIRECTABLE"] }
), I.NE = I.CREATOR(
  { name: "DIRECTOR NE", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "NE", directableTypes: ["DIRECTABLE"] }
), I.NW = I.CREATOR(
  { name: "DIRECTOR NW", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "NW", directableTypes: ["DIRECTABLE"] }
), I.SW = I.CREATOR(
  { name: "DIRECTOR SW", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "SW", directableTypes: ["DIRECTABLE"] }
), I.SE = I.CREATOR(
  { name: "DIRECTOR SE", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "SE", directableTypes: ["DIRECTABLE"] }
), I.NNE = I.CREATOR(
  { name: "DIRECTOR NNE", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "NNE", directableTypes: ["DIRECTABLE"] }
), I.NNW = I.CREATOR(
  { name: "DIRECTOR NNW", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "NNW", directableTypes: ["DIRECTABLE"] }
), I.ENE = I.CREATOR(
  { name: "DIRECTOR ENE", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "ENE", directableTypes: ["DIRECTABLE"] }
), I.WNW = I.CREATOR(
  { name: "DIRECTOR WNW", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "WNW", directableTypes: ["DIRECTABLE"] }
), I.SSE = I.CREATOR(
  { name: "DIRECTOR SSE", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "SSE", directableTypes: ["DIRECTABLE"] }
), I.SSW = I.CREATOR(
  { name: "DIRECTOR SSW", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "SSW", directableTypes: ["DIRECTABLE"] }
), I.ESE = I.CREATOR(
  { name: "DIRECTOR ESE", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "ESE", directableTypes: ["DIRECTABLE"] }
), I.WSW = I.CREATOR(
  { name: "DIRECTOR WSW", symbol: "DTR", class: I, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "WSW", directableTypes: ["DIRECTABLE"] }
), I.DIRECTORS_MAP = /* @__PURE__ */ new Map([
  ["N", I.N],
  ["E", I.E],
  ["S", I.S],
  ["W", I.W],
  ["NE", I.NE],
  ["NW", I.NW],
  ["SE", I.SE],
  ["SW", I.SW],
  ["NNE", I.NNE],
  ["NNW", I.NNW],
  ["ENE", I.ENE],
  ["WNW", I.WNW],
  ["SSE", I.SSE],
  ["SSW", I.SSW],
  ["ESE", I.ESE],
  ["WSW", I.WSW]
]);
let Ue = I;
const lt = class lt extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.classifyAs("DIRECTIONAL");
  }
  makeBigTail(t) {
    [
      ...b.getLeft(this.state.heading, !0),
      b.getDirectionalMove(b.veerLeft(this.state.heading), !0),
      b.getDirectionalMove(b.veerRight(this.state.heading), !0),
      b.getDirectionalMove(b.turnRight(this.state.heading), !0),
      b.getDirectionalMove(b.turnLeft(this.state.heading), !0)
    ].forEach((e) => {
      t.is(e, "EMPTY") && t.replace(e, lt.LOOP_WALL());
    });
  }
  behave(t) {
    super.behave(t), lt.REPEL_DIRECTIONAL(t, this), t.selfIs("WONKY") ? this.behaveAsWonky(t) : this.behaveAsLooper(t);
  }
  behaveAsLooper(t) {
    if (!this.state.heading)
      v.SET_DIRECTION(this, b.RANDOM(b.DIRECTIONS_PRIMARY)), this.state.moves = 0;
    else {
      const e = this.state.moves % 2 !== 0;
      let s;
      this.makeBigTail(t), e && (s = lt.LOOP_DIRECTOR(this.state.heading)), v.MOVE_DIRECTIONALLY(t, this, ["LOOP WALL", "LOOP DIRECTOR", "EMPTY"], s), this.state.moves++, this.state.moves % 8 === 0 && v.VEER_RIGHT(this);
    }
  }
  behaveAsWonky(t) {
    this.state.heading ? (v.MOVE_DIRECTIONALLY(
      t,
      this,
      ["DECAY WALL", "EMPTY"],
      Ue.DIRECTORS_MAP.get(b.turnRight(this.state.heading))({ classifications: ["DECAY WALL", "DECAYABLE"] }, { lifeSpan: 50 })
    ), this.state.age % 5 === 0 && v.SLIGHT_RIGHT(this)) : (v.SET_DIRECTION(this, b.RANDOM(b.DIRECTIONS)), this.state.moves = 0);
  }
};
lt.CREATE = lt.CREATOR({ name: "LOOPER", symbol: "LPR", class: lt, color: 16716911, groups: ["Life"] }), lt.WONKY = lt.CREATOR({
  name: "WONKY LOOPER",
  symbol: "LPR",
  class: lt,
  color: 16716911,
  classifications: ["WONKY", "LOOPER"],
  groups: ["Life"]
}), lt.LOOP_WALL = st.CREATOR({ name: "LOOP WALL", class: st, color: 6689177, classifications: ["DECAYABLE", "MOVABLE"] }, { lifeSpan: 150 }), lt.LOOP_DIRECTOR = (t) => Ue.DIRECTORS_MAP.get(b.turnRight(t))({ classifications: ["LOOP DIRECTOR", "DECAYABLE"] }, { lifeSpan: 100 }), lt.REPEL_DIRECTIONAL = Dt.MAKE_REPELLER(["DIRECTIONAL"], [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 25, 26, 27, 28]);
let rr = lt;
const ve = class ve extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t);
  }
};
ve.CREATE = ve.CREATOR({ name: "BEIN", symbol: "BNG", class: ve, color: 12457071, groups: ["MFM"] });
let nr = ve;
const z = class z extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.state.colorMap = {
      N: 16216457,
      NNE: 16217906,
      NE: 13537330,
      ENE: 11770674,
      E: 9937969,
      ESE: 7122225,
      SE: 3322214,
      SSE: 3452814,
      S: 3583396,
      SSW: 3648440,
      SW: 3778512,
      WSW: 5938932,
      W: 10783988,
      WNW: 14054388,
      NW: 16081373,
      NNW: 16149173
    }, this.state.setColor = () => {
      this.state.color = this.state.colorMap[this.state.heading] ?? 5601024;
    };
  }
  behave(t) {
    var e;
    if (super.behave(t), this.state.heading, t.selfIs("FLY"))
      this.behaveAsFly(t);
    else if (t.selfIs("MOSQUITO"))
      this.behaveAsMosquito(t);
    else if (t.selfIs("BIRD"))
      this.behaveAsBird(t);
    else if (t.selfIs("SWAMP DATA"))
      this.behaveAsSwampData(t);
    else {
      if (!this.state.heading) {
        v.SET_DIRECTION(this, b.RANDOM());
        return;
      }
      if (!t.exists(b.getInFront(this.state.heading)[0])) {
        v.REVERSE(this), v.SLIGHT_RANDOMLY(this);
        return;
      }
      const s = (e = t.filter(b.getInFront(this.state.heading, !0), "WANDERER", !0)) == null ? void 0 : e[0];
      s ? this.state.heading = t.getSite(s).atom.state.heading : T.oneIn(100) && v.SLIGHT_RANDOMLY(this);
      const r = t.filter(b.getBehind(this.state.heading, !0), "WANDERER", !1);
      r.length > 0 && r.forEach((n) => {
        t.getSite(n).atom.state.heading = this.state.heading;
      }), v.MOVE_DIRECTIONALLY(t, this) || v.SLIGHT_RANDOMLY(this), this.state.setColor();
    }
  }
  behaveAsFly(t) {
    this.state.heading ? ([
      b.getDirectionalMove(b.turnRight(this.state.heading), !0),
      b.getDirectionalMove(b.turnLeft(this.state.heading), !0)
    ].forEach((e) => {
      t.is(e, "EMPTY") && t.replace(e, z.FLY_TAIL());
    }), v.MOVE_DIRECTIONALLY(t, this, "EMPTY", z.FLY_TAIL()), T.oneIn(2) && v.SLIGHT_RANDOMLY(this)) : v.SET_DIRECTION(this, b.RANDOM());
  }
  behaveAsMosquito(t) {
    this.state.heading ? (v.MOVE_DIRECTIONALLY(t, this, "EMPTY", z.MOSQUITO_TAIL()), v.SLIGHT_RANDOMLY(this)) : v.SET_DIRECTION(this, b.RANDOM());
  }
  behaveAsBird(t) {
    if (!this.state.heading)
      v.SET_DIRECTION(this, b.RANDOM());
    else {
      const e = t.filter(T.ALLADJACENT, "BIRD", !0)[0];
      e && (this.state.heading = t.getSite(e).atom.state.heading ?? this.state.heading), [
        b.getDirectionalMove(b.turnRight(this.state.heading), !0),
        b.getDirectionalMove(b.turnLeft(this.state.heading), !0)
      ].forEach((s) => {
        t.is(s, "EMPTY") && t.replace(s, z.BIRD_WING({}, { heading: this.state.heading }));
      }), v.MOVE_DIRECTIONALLY(t, this, "EMPTY") ? T.oneIn(4) && v.SLIGHT_RANDOMLY(this) : v.REVERSE(this);
    }
  }
  behaveAsSwampData(t) {
    this.state.heading ? (t.filter(b.getInFront(this.state.heading), "EMPTY").length && v.REVERSE(this), T.oneIn(10) && (v.SWAP_DIRECTIONALLY(t, this, "SWAMP"), v.SLIGHT_RANDOMLY(this))) : v.SET_DIRECTION(this, b.RANDOM());
  }
  blazeTrail(t) {
    if (this.state.heading) {
      const e = b.getInFront(b.turnLeft(this.state.heading))[1], s = b.getInFront(b.turnRight(this.state.heading))[1];
      t.is(e, "EMPTY") ? t.mutate(e, st.MOVABLE_WALL) : t.is(e, "MOVABLE WALL") && t.mutate(e, xt.CREATE), t.is(s, "EMPTY") ? t.mutate(s, st.MOVABLE_WALL) : t.is(s, "MOVABLE WALL") && t.mutate(s, xt.CREATE);
    }
  }
};
z.CREATE = z.CREATOR({ name: "WANDERER", class: z, color: 12457071, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] }), z.FLY = z.CREATOR({ name: "FLY", class: z, color: 13413119, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] }), z.MOSQUITO = z.CREATOR({ name: "MOSQUITO", class: z, color: 13434709, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] }), z.BIRD = z.CREATOR({ name: "BIRD", class: z, color: 4889583, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] }), z.SWAMPDATA = z.CREATOR({
  name: "SWAMP DATA",
  class: z,
  color: 5513984,
  classifications: ["OFSWAMP", "DIRECTIONAL", "DIRECTABLE"],
  groups: ["Swamp"]
}), z.BIRD_WING = st.CREATOR(
  { name: "BIRD WING", class: st, color: 3836895, classifications: ["DECAYABLE", "BIRD", "DIRECTABLE", "TAIL"] },
  { lifeSpan: 2 }
), z.FLY_TAIL = st.CREATOR({ name: "FLY TAIL", class: st, color: 10031428, classifications: ["DECAYABLE", "TAIL"] }, { lifeSpan: 10 }), z.MOSQUITO_TAIL = st.CREATOR({ name: "MOSQUITO TAIL", class: st, color: 5601024, classifications: ["DECAYABLE", "TAIL"] }, { lifeSpan: 10 });
let ar = z;
const Pe = class Pe extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t);
    const e = t.filterByType([...T.LAYER1, ...T.LAYER2, ...T.LAYER3], ["EMPTY", "DIRECTOR"]);
    e.length > 0 && t.mutateMany(e, js.CREATE);
    const s = t.filterByType(T.LAYER4, "EMPTY");
    if (s.length > 0 && s.forEach((r) => {
      let n = b.indexToDirection(r);
      const a = b.turnLeft(n);
      t.mutate(r, Ue.DIRECTORS_MAP.get(a));
    }), T.oneIn(1e3)) {
      const r = t.filterByType(T.LAYER4, "DIRECTOR");
      t.destroy(t.random(r));
    }
  }
};
Pe.CREATE = Pe.CREATOR({ name: "DIRECTOR WALL", symbol: "DRWL", class: Pe, color: 12457071, groups: ["Structural"] });
let or = Pe;
const kt = class kt extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
  }
  behave(t) {
    var s, r;
    if (super.behave(t), !this.state.heading) {
      this.state.heading = b.RANDOM(b.DIRECTIONS);
      return;
    }
    const e = t.filterByType(T.ALLADJACENT, ((s = this.state) == null ? void 0 : s.directableTypes) ?? ["DIRECTABLE"]);
    if (e.length > 0) {
      const n = e[0], a = v.DIRECT(t, n, ((r = this.state) == null ? void 0 : r.pointing) ?? b.reverse(this.state.heading));
      if (this.state.once && a) {
        t.destroy(0);
        return;
      }
    }
    this.state.heading && (v.MOVE_DIRECTIONALLY(t, this, this.state.direction) || (this.state.heading = b.slightRandom(this.state.heading)));
  }
};
kt.CREATE = kt.CREATOR({ name: "DIRDIR", symbol: "DDIR", class: kt, color: 11184810, groups: ["Agents"], classifications: ["DIRECTOR"] }), kt.DDIR_ONCE = kt.CREATOR(
  { name: "DIRDIR ONCE", symbol: "DDIRO", class: kt, color: 10066329, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { directableTypes: ["DIRECTABLE"], once: !0 }
);
let hr = kt;
const De = class De extends V {
  constructor(t, e = {}) {
    super(t, e);
  }
  behave(t) {
    super.behave(t);
    const e = t.filterByType(T.ADJACENT8WAY, "SWAMP WORKER");
    if (t.filterByType(T.ALLADJACENT, "OFSWAMP").length < T.ALLADJACENT.length * 0.4) {
      t.mutate(0, Fe.CREATE);
      return;
    }
    if (e.length) {
      t.mutate(0, Fe.CREATE);
      return;
    }
    this.state.heading ? v.SWAP_DIRECTIONALLY(t, this, "SWAMP") ? v.VEER_RIGHT(this) : v.SLIGHT_RIGHT(this) : v.SET_DIRECTION(this, b.RANDOM(b.DIRECTIONS_PRIMARY));
  }
};
De.CREATE = De.CREATOR({
  name: "SWAMP WORKER",
  symbol: "SWK",
  class: De,
  color: 214543,
  // color: 0x3d5b31,
  // color: 0x3d6242,
  classifications: ["OFSWAMP", "DIRECTIONAL", "SWAMPLING"],
  groups: ["Swamp"]
});
let qs = De;
const Kt = class Kt extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.state.lifeSpan = this.state.lifeSpan ?? 90;
  }
  behave(t) {
    super.behave(t);
    const e = t.filterByType(T.ADJACENT8WAY, "SWAMPLING"), s = t.filterByType(T.ADJACENT8WAY, "OFSWAMP"), r = t.filterByType(T.ALLADJACENT, "SWAMP");
    if (!this.state.made && r.length === T.ALLADJACENT.length) {
      this.state.made = !0, t.mutate(0, qs.CREATE);
      return;
    }
    e.length > 0 ? (this.state.age = 0, T.oneIn(6) && this.grow(t)) : t.selfIs("DECAYABLE") && s.length < 7 ? He.DECAY(t, this, this.state.lifeSpan) && t.mutate(0, Kt.BOG) : this.state.age = 0;
  }
  grow(t) {
    const e = t.filterByType(T.ADJACENT4WAY, "EMPTY");
    e.length && t.mutate(t.random(e), this.TYPE.CREATE);
  }
};
Kt.CREATE = Kt.CREATOR({
  name: "SWAMP",
  class: Kt,
  color: 4021041,
  classifications: ["ENV", "OFSWAMP", "DECAYABLE"],
  groups: ["Swamp"]
}), Kt.BOG = st.CREATOR({ name: "BOG", class: st, classifications: ["DECAYABLE"], color: 1320454 }, { lifeSpan: 45 });
let Fe = Kt;
const we = class we extends V {
  //SYSTEM ELEMENTS
  constructor(t, e = {}) {
    super(t, e);
  }
  behave(t) {
    if (super.behave(t), this.state.heading)
      t.filterByType(T.ADJACENT8WAY, "EMPTY").length > 1 && v.SLIGHT_RIGHT(this), v.SWAP_DIRECTIONALLY(t, this, "SWAMP"), T.oneIn(1.5) && v.SLIGHT_RIGHT(this);
    else {
      v.SET_DIRECTION(this, b.RANDOM());
      const e = t.filterByType(T.ADJACENT8WAY, "EMPTY");
      e.length && t.mutateMany(e, Fe.CREATE);
    }
  }
};
we.CREATE = we.CREATOR({
  name: "SWAMPLING",
  class: we,
  color: 2280584,
  // color: 0x3d5b31,
  classifications: ["OFSWAMP", "DIRECTIONAL", "DIRECTABLE"],
  groups: ["Swamp"]
});
let cr = we;
const Oe = class Oe extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), this.state.heading ? (v.MOVE_DIRECTIONALLY(t, this), v.SLIGHT_RANDOMLY(this)) : v.SET_DIRECTION(this, b.RANDOM());
    const e = t.filter(T.ALLADJACENT, "FORKBOMB", !0);
    e.length && t.mutate(e[0], Qs.CREATE);
  }
};
Oe.CREATE = Oe.CREATOR({ name: "SENTRY", class: Oe, color: 10753279, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["MFM"] });
let lr = Oe;
const k = class k extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.state.maxHops = this.state.maxHops ?? 16, this.state.stasus = !1, this.state.localId || (this.state.localId = (~~(Math.random() * 255)).toString(16)), this.classifyAs(`HC3-${this.state.localId}`);
  }
  behave(t) {
    if (super.behave(t), this.state.stasus = this.hasStasis(t), this.state.hops === void 0 || this.hasBadStructure(t)) {
      this.figureHops(t);
      return;
    }
    if (!this.isRoot()) {
      const e = this.shouldMove(t);
      if (e) {
        v.MOVE_IN_DIRECTION(t, this, e);
        return;
      }
    }
    if (this.shouldRegrow(t)) {
      const e = t.filter(k.CELL_SITES, "EMPTY");
      e.length && t.mutateMany(e, k.CREATOR(this.TYPE, { maxHops: this.state.maxHops, localId: this.state.localId }));
    }
    this.isRoot() && this.state.stasus && T.oneIn(4) && this.canMove(t) && t.swap(T.RANDOM(k.CELL_WANDER_MAP.get(0)), 0), this.isEnd() && this.classifyAs("HC3-END");
  }
  //stasus means you have all 4 HardCell3's surrounding you if you're not the end
  //AND all upstream HardCell3's are also in stasus
  hasStasis(t) {
    return this.isEnd() ? !0 : this.neighbors(t).length !== t.getSites(k.CELL_SITES).filter((r) => r).length ? !1 : !this.upstreams(t).map((r) => t.getSite(r).atom.state.stasus ?? !1).some((r) => !r);
  }
  //bad structure is if the neighbors have too high or low or no hop count
  hasBadStructure(t) {
    const e = this.neighbors(t).map((r) => t.getSite(r).atom.state.hops);
    return e.some((r) => r === void 0) || e.some((r) => r > this.state.hops + 1) || e.some((r) => r < this.state.hops - 1) || e.some((r) => r === void 0);
  }
  figureHops(t) {
    const e = this.neighbors(t);
    if (e.length === 0 || this.state.hops === 0) {
      this.state.hops = 0, this.setColor();
      return;
    } else {
      const s = e.map((r) => {
        var n;
        return (n = t.getSite(r)) == null ? void 0 : n.atom.state.hops;
      }).filter((r) => !isNaN(r) && r !== void 0);
      if (s.length)
        this.state.hops = Math.min(...s) + 1;
      else
        return;
    }
    this.setColor(), isNaN(this.state.hops) && t.destroy();
  }
  setColor() {
    this.state.color = k.COLORS[this.state.hops % k.COLORS.length];
  }
  canMove(t) {
    return this.neighbors(t).length === k.CELL_SITES.length;
  }
  shouldRegrow(t) {
    return !(this.isEnd() || t.filter(T.ALLADJACENT, this.localType()).length === 4);
  }
  shouldMove(t) {
    const e = t.filter(k.CELL_SITES, "EMPTY");
    if (e.length) {
      const s = T.RANDOM(e), r = k.CELL_WANDER_MAP.get(s), n = t.filter(r, this.localType()).filter((a) => t.getSite(a).atom.state.hops < this.state.hops);
      if (n.length) {
        const a = T.RANDOM(n);
        return k.CELL_DIRECTION_MAP.get(a);
      }
    }
    return !1;
  }
  localType() {
    return `HC3-${this.state.localId}`;
  }
  isRoot() {
    return this.state.hops === 0;
  }
  isEnd() {
    return this.state.hops === this.state.maxHops;
  }
  upstreams(t) {
    return t.filter(k.CELL_SITES, this.localType()).filter((r) => {
      var n, a;
      return ((a = (n = t.getSite(r)) == null ? void 0 : n.atom.state) == null ? void 0 : a.hops) > this.state.hops;
    });
  }
  downstreams(t) {
    return t.filter(k.CELL_SITES, this.localType()).filter((r) => {
      var n, a;
      return ((a = (n = t.getSite(r)) == null ? void 0 : n.atom.state) == null ? void 0 : a.hops) < this.state.hops;
    });
  }
  //returns actual HardCell3's at CELL_SITES
  neighbors(t) {
    return t.filter(k.CELL_SITES, this.localType());
  }
  getDirectionFromWanderMap(t, e) {
    var n;
    const s = k.CELL_WANDER_MAP.get(e);
    if (!s)
      return;
    const r = (n = t.filter(s, this.localType(), !0)) == null ? void 0 : n[0];
    if (r)
      return k.CELL_DIRECTION_MAP.get(r);
  }
};
k.CREATE = k.CREATOR({ name: "HARDCELL3x16", symbol: "HC3", class: k, color: 12457071, classifications: ["HARDCELL3"], groups: ["MFM"] }), k.HC3x8 = k.CREATOR({ name: "HARDCELL3x8", symbol: "HC3", class: k, color: 12457071, classifications: ["HARDCELL3"], groups: ["MFM"] }, { maxHops: 8 }), k.HC3x4 = k.CREATOR({ name: "HARDCELL3x4", symbol: "HC3", class: k, color: 12457071, classifications: ["HARDCELL3"], groups: ["MFM"] }, { maxHops: 4 }), k.CELL_SITES = [21, 22, 23, 24], k.CELL_WANDER_MAP = /* @__PURE__ */ new Map([
  [0, [1, 2, 3, 4]],
  [21, [9, 29, 30, 37]],
  [22, [10, 31, 33, 38]],
  [23, [11, 32, 34, 39]],
  [24, [12, 35, 36, 40]]
]), k.CELL_DIRECTION_MAP = /* @__PURE__ */ new Map([
  [2, "N"],
  [11, "N"],
  [29, "N"],
  [35, "N"],
  [38, "N"],
  [4, "E"],
  [9, "E"],
  [33, "E"],
  [34, "E"],
  [40, "E"],
  [1, "W"],
  [12, "W"],
  [31, "W"],
  [32, "W"],
  [37, "W"],
  [3, "S"],
  [10, "S"],
  [30, "S"],
  [36, "S"],
  [39, "S"]
]), k.COLORS = [16711680, 16744192, 16776960, 65280, 255, 4915330, 606419];
let ur = k;
const pt = class pt extends V {
  // static COLORS = [ 0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x940d3 ];
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.state.growCount = this.state.growCount ?? 8;
  }
  behave(t) {
    super.behave(t);
    let e = this.establishType(t), s = !1;
    if (!e && this.state.age > 1 && t.destroy(), !(this.state.growCount && (s = this.grow(t), s)))
      switch (e) {
        case "HEAD":
          return this.move(t);
        case "MIDDLE":
          if (this.isAheadTemp(t) && (s = this.swapSegments(t, this.state.ahead), s))
            return;
          break;
        case "TAIL":
          if (this.isTemp()) {
            const r = this.getSegment(t, this.state.ahead);
            r && (r.state.behind = null), t.destroy();
          } else if (this.isAheadTemp(t) && (s = this.swapSegments(t, this.state.ahead), s))
            return;
          break;
      }
  }
  establishType(t) {
    this.confirmBehind(t), this.confirmAhead(t);
    let e;
    return this.isHead() ? (this.state.color = 14544639, e = "HEAD") : this.isTail() ? e = "TAIL" : this.isMiddle() && (e = "MIDDLE"), this.isTemp(), e;
  }
  isHead() {
    return !!(!this.state.ahead && this.state.behind);
  }
  isTail() {
    return !!(this.state.ahead && !this.state.behind);
  }
  isMiddle() {
    return !!(this.state.ahead && this.state.behind);
  }
  isTemp() {
    return this.state.temp;
  }
  confirmBehind(t) {
    const e = this.getSegment(t, this.state.behind);
    return !e || e && !e.is("SWAPWORM") ? (this.state.behind = null, !1) : !0;
  }
  confirmAhead(t) {
    const e = this.getSegment(t, this.state.ahead);
    return !e || e && !e.is("SWAPWORM") ? (this.state.ahead = null, !1) : !0;
  }
  isBehindTemp(t) {
    if (this.state.behind) {
      const e = this.getSegment(t, this.state.behind);
      if (e && e.state.temp)
        return !0;
    }
    return !1;
  }
  isAheadTemp(t) {
    if (this.state.ahead) {
      const e = this.getSegment(t, this.state.ahead);
      if (e && e.state.temp)
        return !0;
    }
    return !1;
  }
  makeGrowSegment(t) {
    return pt.CREATE(this.TYPE, { growCount: 0, ahead: t, behind: this.state.behind });
  }
  makeGrowTemp(t) {
    return pt.CREATE(this.TYPE, { growCount: 0, ahead: t, behind: this.state.behind, temp: !0 });
  }
  getSegment(t, e) {
    var r;
    if (!e && e !== 0)
      return;
    const s = (r = t.getSite(e)) == null ? void 0 : r.atom;
    if (!(!s || !s.is("SWAPWORM")))
      return s;
  }
  swapSegments(t, e) {
    const s = this.getSegment(t, e);
    return [this.state.ahead, this.state.behind, s.state.ahead, s.state.behind] = [s.state.ahead, s.state.behind, this.state.ahead, this.state.behind], t.swap(e);
  }
  grow(t) {
    const e = Math.min(...t.filter(T.ADJACENT8WAY, "EMPTY"));
    if (e && e !== 1 / 0) {
      const s = t.move(e, this.makeGrowSegment(e));
      return s && (this.state.growCount--, this.state.behind = T.OPPOSITES[e]), s;
    }
    return !1;
  }
  move(t) {
    var e, s;
    if (((e = this.state) == null ? void 0 : e.status) === "HELD")
      return !1;
    if (!this.state.heading)
      v.SET_DIRECTION(this, b.RANDOM());
    else if (T.oneIn(2)) {
      const r = b.getDirectionalMove(this.state.heading, !0);
      let n = !1;
      return t.is(r, "EMPTY") && (n = t.move(r, this.makeGrowTemp(r))), ((s = this.state) == null ? void 0 : s.status) !== "DIRECTED" && T.oneIn(10) && v.SLIGHT_RANDOMLY(this), n ? this.state.behind = T.OPPOSITES[r] : v.SLIGHT_RANDOMLY(this), n;
    }
    return !1;
  }
};
pt.CREATE = pt.CREATOR({ name: "SWAPWORM", symbol: "SWP", class: pt, color: 12457071, classifications: ["DIRECTIONAL", "DIRECTABLE", "WORM"], groups: ["Life"] }), pt.SMOLSW = pt.CREATOR({ name: "SMOLSW", symbol: "SWP", class: pt, color: 12457071, classifications: ["SWAPWORM", "DIRECTIONAL", "DIRECTABLE", "WORM"], groups: ["Life"] }, { growCount: 2 }), pt.BIGSW = pt.CREATOR({ name: "BIGSW", symbol: "SWP", class: pt, color: 12457071, classifications: ["SWAPWORM", "DIRECTIONAL", "DIRECTABLE", "WORM"], groups: ["Life"] }, { growCount: 24 });
let dr = pt;
const Yt = class Yt extends V {
  constructor(t, e = {}) {
    super(t, e), this.init();
  }
  init() {
    this.state.status = "LOOKING";
  }
  behave(t) {
    switch (super.behave(t), this.state.status) {
      case "LOOKING":
        this.captureWorm(t);
        break;
      case "HOLDING":
        t.mutate(2, Yt.BUILDER), t.mutate(3, Yt.BUILDER), this.state.status = "BUILT";
        break;
      case "BUILT":
        if (t.is(1, "SWAPWORM")) {
          const e = t.getSite(1).atom;
          e.state.heading = "E", e.state.status = "DIRECTED";
        }
        if (t.is(2, "WORM TRAP WALL"))
          return;
        if (t.is(2, "WALL"))
          t.swap(4);
        else {
          t.mutateMany([2, 3], st.CREATE), this.state.status = "DONE";
          return;
        }
        break;
    }
    t.selfIs("DECAYABLE") && He.DECAY(t, this, this.state.lifeSpan ?? 100, 2);
  }
  captureWorm(t) {
    const e = t.filter([1, 5, 6, 9], "SWAPWORM");
    if (e.length > 0) {
      const s = t.getSite(T.RANDOM(e)).atom, r = t.filter([, 2, 3, 10, 11, 15, 16, 13, 14, 21, 25, 26, 29, 30, 37], "EMPTY");
      return t.mutateMany(r, st.CREATE), s.state.status = "DIRECTED", this.state.status = "HOLDING", !0;
    }
    return !1;
  }
};
Yt.CREATE = Yt.CREATOR({ name: "WORMTRAP", class: Yt, color: 8930542, groups: ["Structural"] }), Yt.BUILDER = Et.CREATOR(
  { name: "WORM TRAP WALL", class: Et, color: 1184018, groups: ["Misc"] },
  { buildPath: [4], totalSteps: 5, atomizer: st.CREATE, transitionAge: 1 }
);
let fr = Yt;
export {
  ee as $,
  $r as A,
  ut as B,
  ot as C,
  dt as D,
  O as E,
  Kn as F,
  da as G,
  Ss as H,
  gt as I,
  Ir as J,
  It as K,
  Nt as L,
  Jr as M,
  lo as N,
  le as O,
  rt as P,
  Th as Q,
  et as R,
  Eo as S,
  Ke as T,
  Ws as U,
  se as V,
  yh as W,
  xh as X,
  Ge as Y,
  ht as Z,
  rn as _,
  te as a,
  Ct as a0,
  Pi as a1,
  kn as a2,
  cn as a3,
  Gh as a4,
  V as a5,
  Ms as a6,
  T as a7,
  zh as a8,
  xt as a9,
  Ji as aa,
  $s as ab,
  Zi as ac,
  Qs as ad,
  tr as ae,
  st as af,
  js as ag,
  er as ah,
  sr as ai,
  Et as aj,
  ir as ak,
  rr as al,
  nr as am,
  ar as an,
  Ue as ao,
  or as ap,
  hr as aq,
  Fe as ar,
  cr as as,
  qs as at,
  lr as au,
  ur as av,
  dr as aw,
  fr as ax,
  We as b,
  Ta as c,
  Vr as d,
  yt as e,
  Bi as f,
  mo as g,
  Br as h,
  Ut as i,
  U as j,
  H as k,
  Bn as l,
  yo as m,
  Hh as n,
  po as o,
  vt as p,
  _r as q,
  jn as r,
  Ot as s,
  ue as t,
  nt as u,
  ba as v,
  it as w,
  _a as x,
  bo as y,
  Li as z
};
