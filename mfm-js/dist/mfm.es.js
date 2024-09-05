const tt = class tt {
  static registerType(t) {
    this.TYPES.set(t.name.toUpperCase(), t), (t.groups ?? ["Misc"]).forEach((e) => {
      this.GROUPS.has(e) || this.GROUPS.set(e, []);
      const a = this.GROUPS.get(e);
      this.GROUPS.set(e, [...a, t]);
    });
  }
  static getType(t) {
    return typeof t == "string" ? this.TYPES.get(t.toUpperCase()) : this.TYPES.get(t.name.toUpperCase());
  }
};
tt.TYPES = /* @__PURE__ */ new Map(), tt.GROUPS = /* @__PURE__ */ new Map();
let st = tt;
class l {
  //creator creates an atom of element creation function with the ability to override BASE_TYPE element properties
  static CREATOR(t, s = {}) {
    let e = { ...t };
    const a = (r = {}, c = {}) => {
      const I = { ...e, ...r }, O = { ...s, ...c };
      return O ? new I.class(I, O) : new I.class(I);
    };
    return e.CREATE = a, st.registerType({ ...e, CREATE: a }), a;
  }
  constructor(t, s) {
    this.TYPE = t, this.classes = /* @__PURE__ */ new Set(), this.initializeState(s ?? void 0), this.classifyAs(this.TYPE), this.TYPE.classifications && this.TYPE.classifications.forEach((e) => {
      this.classifyAs(e);
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
  wr(t, s) {
    this.state[t] = s;
  }
  classifyAs(t) {
    const s = typeof t == "string" ? t : t.name;
    this.classes.add(s.toUpperCase());
  }
  declassify(t) {
    const s = typeof t == "string" ? t : t.name;
    this.classes.delete(s.toUpperCase());
  }
  is(t) {
    if (Array.isArray(t))
      return t.some((e) => {
        const a = typeof e == "string" ? e : e.name;
        return this.classes.has(a.toUpperCase());
      });
    const s = typeof t == "string" ? t : t.name;
    return this.classes.has(s.toUpperCase());
  }
  isCore(t) {
    return (typeof t == "string" ? t : t.name).toUpperCase() === this.TYPE.name.toUpperCase();
  }
}
const K = class K extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
    this.classifyAs("EMPTY");
  }
  behave(t) {
    super.behave(t);
  }
};
K.CREATE = K.CREATOR({ name: "EMPTY", symbol: "EMT", class: K, color: 2763306, groups: ["MFM"] });
let d = K;
const o = class o {
  static oneIn(t) {
    return t === 0 ? !1 : Math.random() * t < 1;
  }
  constructor(t, s) {
    this.makeWindow(t, s);
  }
  makeWindow(t, s) {
    this.origin = t.getSiteByCoordinate(s), this.window = new Array(41);
    let e, a;
    const r = o.WINDOW_OFFSETS.length;
    for (let c = 0; c < r; c++)
      e = o.WINDOW_OFFSETS[c], a = t.getSiteByCoordinate(this.offsetFromOrigin(s, e)), this.window[c] = a;
  }
  //get relative offset ICoordinate from absolute ICoordinate
  //this should only be used by the makeWindow function to translate a picked site into
  //a full event window of sites
  offsetFromOrigin(t, s) {
    return { y: t.y + s.y, x: t.x + s.x };
  }
  //get site by specific window index
  getSite(t) {
    return this.window[t] ?? void 0;
  }
  getSites(t) {
    return t.map((s) => this.window[s] ?? void 0);
  }
  //get indexes of subset (of type) and possible only 1 random of the result
  //extremely useful in searching the event window for circumstances of element types
  filter(t, s = void 0, e = !1) {
    let a = this.getSubsetIndexes(t);
    return !s && !e ? a : (s && (a = this.filterByType(a, s)), e ? [this.random(a)] : a);
  }
  randomOfType(t, s) {
    return this.random(this.filterByType(t, s));
  }
  random(t) {
    const s = t[~~(Math.random() * t.length)];
    return this.getSite(s) ? s : void 0;
  }
  filterByType(t, s) {
    return t.filter((e) => {
      const a = this.getSite(e);
      return !!(a && a.atom.is(s));
    });
  }
  getSubsetIndexes(t) {
    return t ? t.map((s) => {
      if (this.window[s])
        return s;
    }) : [];
  }
  exists(t) {
    return !!this.getSite(t);
  }
  is(t = 0, s) {
    let e = !1, a;
    return typeof t == "number" ? a = this.getSite(t) : a = t, a ? (Array.isArray(s) ? e = !!s.filter((c) => a.atom.is(c)).length : e = a.atom.is(s), e) : !1;
  }
  any(t, s) {
    return Array.isArray(t) || (t = [t]), this.howMany(t, s) > 0;
  }
  all(t, s) {
    return Array.isArray(t) || (t = [t]), this.howMany(t, s) === t.length;
  }
  howMany(t, s) {
    return this.filter(t, s, !1).length;
  }
  selfIs(t) {
    return this.is(0, t);
  }
  /////////////////////////////////
  // EVENT WINDOW ACTIONS
  /////////////////////////////////
  move(t, s = void 0, e = 0) {
    const a = this.getSite(t), r = this.getSite(e);
    return a && r ? (a.atom = r.atom, s ? r.atom = s : r.atom = d.CREATE(), !0) : !1;
  }
  swap(t, s = 0) {
    const e = this.getSite(t), a = this.getSite(s);
    return e && a ? ([e.atom, a.atom] = [a.atom, e.atom], !0) : !1;
  }
  replace(t, s) {
    const e = this.getSite(t);
    return e ? (e.atom = s, !0) : !1;
  }
  mutate(t, s, e = [{}, {}]) {
    const a = this.getSite(t);
    return a ? (a.atom = s(...e), !0) : !1;
  }
  mutateMany(t, s, e = [{}, {}]) {
    t.forEach((a) => {
      this.mutate(a, s, e);
    });
  }
  destroy(t = 0) {
    return this.mutate(t, d.CREATE);
  }
  shuffleSites(t) {
    for (var s = t.length, e, a; s !== 0; )
      a = Math.floor(Math.random() * s), s -= 1, e = t[s], t[s] = t[a], t[a] = e;
    return t;
  }
};
o.WINDOW_OFFSETS = [
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
], o.RANDOM = (t = o.ALLADJACENT) => t[~~(t.length * Math.random())], o.ORIGIN = [0], o.W = [1], o.N = [2], o.S = [3], o.E = [4], o.NW = [5], o.SW = [6], o.NE = [7], o.SE = [8], o.ADJACENT4WAY = [1, 2, 3, 4], o.DIAGONAL4WAY = [5, 6, 7, 8], o.ADJACENT8WAY = [...o.ADJACENT4WAY, ...o.DIAGONAL4WAY], o.LAYER1 = [1, 2, 3, 4], o.LAYER2 = [5, 6, 7, 8, 9, 10, 11, 12], o.LAYER3 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], o.LAYER4 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], o.W_LINE = [1, 9, 21, 37], o.N_LINE = [2, 10, 22, 38], o.S_LINE = [3, 11, 23, 39], o.E_LINE = [4, 12, 24, 40], o.NW_LINE = [5, 25], o.SW_LINE = [6, 26], o.NE_LINE = [7, 27], o.SE_LINE = [8, 28], o.EQUATOR = [...o.ORIGIN, ...o.W_LINE, ...o.E_LINE], o.PRIME_MERIDIAN = [...o.ORIGIN, ...o.N_LINE, ...o.S_LINE], o.W_QUADRANT = [1, 9, 13, 14, 21, 29, 30, 37], o.N_QUADRANT = [2, 10, 15, 17, 22, 31, 33, 38], o.S_QUADRANT = [3, 11, 16, 18, 23, 32, 34, 39], o.E_QUADRANT = [4, 12, 19, 20, 24, 35, 36, 40], o.NW_QUADRANT = [5, 13, 15, 25, 29, 31], o.SW_QUADRANT = [6, 14, 16, 26, 30, 32], o.NE_QUADRANT = [7, 17, 19, 27, 33, 35], o.SE_QUADRANT = [8, 18, 20, 28, 34, 36], o.W_HEMISPHERE = Array.from(/* @__PURE__ */ new Set([...o.NW_QUADRANT, ...o.W_LINE, ...o.SW_QUADRANT])).sort(
  (t, s) => t - s
), o.N_HEMISPHERE = Array.from(/* @__PURE__ */ new Set([...o.NW_QUADRANT, ...o.N_LINE, ...o.NE_QUADRANT])).sort(
  (t, s) => t - s
), o.S_HEMISPHERE = Array.from(/* @__PURE__ */ new Set([...o.SW_QUADRANT, ...o.S_LINE, ...o.SE_QUADRANT])).sort(
  (t, s) => t - s
), o.E_HEMISPHERE = Array.from(/* @__PURE__ */ new Set([...o.NE_QUADRANT, ...o.E_LINE, ...o.SE_QUADRANT])).sort(
  (t, s) => t - s
), o.ALL = [
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
], o.ALLADJACENT = [
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
], o.OPPOSITES = [
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
], o.X_REFLECTION = [
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
], o.Y_REFLECTION = [
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
], o.XY_REFLECTION = o.OPPOSITES, o.SUBSETS = (/* @__PURE__ */ new Map()).set("4way", o.ADJACENT4WAY).set("8way", o.ADJACENT8WAY).set("all", o.ALL);
let E = o;
class pt {
  constructor(t) {
    this.location = t, this.id = this.location.id, this.create();
  }
  create() {
    this.atom = d.CREATE(), this.baseAtom = d.CREATE();
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
class H {
  static CoordinateToId(t) {
    return `${t.y}:${t.x}`;
  }
  static IdToCoordinate(t) {
    const [s, e] = t.split(":");
    return { y: +s, x: +e };
  }
  static fromCoordinate(t) {
    return new H(H.CoordinateToId(t));
  }
  static fromId(t) {
    return new H(t);
  }
  constructor(t) {
    this.id = t, this.coordinate = H.IdToCoordinate(this.id);
  }
}
class mt {
  constructor(t = 1, s = 1) {
    this.cur = 0, this.isRunning = !1, this.width = t, this.height = s, this.create(), this.seedRandoms();
  }
  seedRandoms() {
    this.rands = new Array();
    var t = new Uint32Array(16e3);
    crypto.getRandomValues(t);
    for (var s = 0; s < t.length; s++)
      this.rands.push(t[s] % (this.width * this.height));
  }
  getSiteByCoordinate(t) {
    return this.sites.get(H.CoordinateToId(t));
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
      for (let s = 0; s < this.height; s++) {
        const e = H.fromId(`${s}:${t}`);
        this.sites.set(e.id, new pt(e));
      }
    this.sites.forEach((t) => {
      t.ew = new E(this, t.location.coordinate);
    }), this.sitesArray = Array.from(this.sites.values());
  }
  add(t, s = 0, e = 0) {
    if (s >= 0 && e >= 0 && s < this.width && e < this.height) {
      const a = t();
      let r = this.getSiteByCoordinate({ x: s, y: e });
      r && (r.atom = a);
    }
  }
  exportAtoms() {
    const t = {};
    return Array.from(this.sites.values()).filter((s) => !s.atom.is("EMPTY")).forEach((s) => {
      t[s.atom.TYPE.name] ? t[s.atom.TYPE.name] += `-${s.location.coordinate.x}x${s.location.coordinate.y}` : (t[s.atom.TYPE.name] = `${s.atom.TYPE.name}`, t[s.atom.TYPE.name] += `-${s.location.coordinate.x}x${s.location.coordinate.y}`);
    }), console.log(t), Object.values(t);
  }
  clear(t = void 0) {
    t ? this.sites.forEach((s) => {
      s.atom.is(t) && s.mutate(d.CREATE());
    }) : this.sites.forEach((s) => {
      s.mutate(d.CREATE());
    });
  }
}
const g = class g {
  static CREATE(t, s = "EMPTY") {
    return (e, a = 1) => {
      var r;
      if (E.oneIn(a) && e.any(t, s)) {
        const c = (r = e.filter(t, s, !0)) == null ? void 0 : r[0];
        return e.swap(c);
      }
      return !1;
    };
  }
};
g.DOWN = g.CREATE(E.S), g.SIDE = g.CREATE([6, 8]), g.SLIP = g.CREATE(E.EQUATOR), g.SINK = g.CREATE([...E.S, 6, 8], "WATER"), g.FLOAT = g.CREATE([...E.N, 5, 7], "WATER"), g.PATROL = g.CREATE(E.ADJACENT4WAY), g.PATROL_8 = g.CREATE(E.ADJACENT8WAY);
let y = g;
const J = class J extends l {
  constructor(t, s = {}) {
    super(t, s);
  }
  behave(t) {
    super.behave(t), y.PATROL(t);
  }
};
J.CREATE = J.CREATOR({ name: "RES", class: J, color: 938240, groups: ["MFM"] });
let it = J;
const F = class F extends l {
  constructor(t, s = {}) {
    super(t, s);
  }
  behave(t) {
    super.behave(t);
    const s = t.filter(E.ADJACENT4WAY, null, !0)[0];
    if (t.is(s, "EMPTY")) {
      const e = E.oneIn(this.state.pDREG_CREATE), a = E.oneIn(this.state.pRES_CREATE);
      e ? t.move(s, F.CREATE()) : a ? t.move(s, it.CREATE()) : t.swap(s);
    } else
      (t.is(s, "DREG") && E.oneIn(this.state.pDREG_DESTROY) || E.oneIn(this.state.pANY_DESTROY)) && t.move(s);
  }
};
F.CREATE = F.CREATOR(
  { name: "DREG", class: F, color: 16719904, groups: ["MFM"] },
  {
    pDREG_CREATE: 1e3,
    pRES_CREATE: 200,
    pDREG_DESTROY: 10,
    pANY_DESTROY: 100
  }
);
let ot = F;
const V = class V extends l {
  constructor(t, s = {}) {
    super(t, s);
  }
  behave(t) {
    super.behave(t), t.replace(E.RANDOM(E.ADJACENT4WAY), V.CREATE({ color: (this.rd("color") + 512) % 16777215 }));
  }
};
V.CREATE = V.CREATOR({ name: "FORKBOMB", symbol: "FKB", class: V, color: 14483456, groups: ["MFM"] });
let rt = V;
class w {
  static MAKE_DECAY(t, s = 1) {
    return (e, a) => {
      const { age: r } = a.state;
      r > t && E.oneIn(s) && e.destroy();
    };
  }
  static DECAY(t, s, e, a = 1) {
    const { age: r } = s.state;
    return r > e && E.oneIn(a) ? (t.destroy(), !0) : !1;
  }
}
const Q = class Q extends l {
  constructor(t, s = {}) {
    super(t, s);
  }
  behave(t) {
    super.behave(t);
    const s = t.filterByType(E.ADJACENT8WAY, "FORKBOMB");
    s.length && t.mutateMany(s, Q.CREATE, [{ color: (this.rd("color") + 2048) % 16777215 }, {}]), w.DECAY(t, this, 40);
    const e = t.filterByType(E.ADJACENT8WAY, "ANTIFORKBOMB");
    e.length && E.oneIn(2) && t.mutateMany(e, Q.CREATE, [{ color: (this.rd("color") + 1024) % 11206655 }, { age: this.state.age - 1 }]);
  }
};
Q.CREATE = Q.CREATOR({ name: "ANTIFORKBOMB", symbol: "AFK", class: Q, color: 43741, groups: ["MFM"] });
let et = Q;
const i = class i {
  static directionToIndex(t, s = !1) {
    return i.DIRECTIONS_INDEX_MAP.get(t);
  }
  static indexToDirection(t, s = !1) {
    return i.INDEX_DIRECTION_MAP.get(t);
  }
  static getDirectionalMove(t, s = !1) {
    return !s && t.length == 2 ? t = t.split("")[Math.random() * t.length >> 0] : t.length > 2 && (t = E.oneIn(2) ? t.substr(0, 1) : t.substr(1)), i.DIRECTIONS_INDEX_MAP.get(t);
  }
  //given a direction and a DirectionMap, return the next direction
  static nextDirection(t, s) {
    return s.get(t);
  }
  static reverse(t) {
    return i.DIRMAP_REVERSE.get(t);
  }
  //LEFT
  static turnLeft(t) {
    return i.veerLeft(i.veerLeft(t));
  }
  static veerLeft(t) {
    return i.slightLeft(i.slightLeft(t));
  }
  static slightLeft(t) {
    return i.nextDirection(t, i.DIRMAP_COUNTERCLOCKWISE_ALL);
  }
  //RIGHT
  static turnRight(t) {
    return i.veerRight(i.veerRight(t));
  }
  static veerRight(t) {
    return i.slightRight(i.slightRight(t));
  }
  static slightRight(t) {
    return i.nextDirection(t, i.DIRMAP_CLOCKWISE_ALL);
  }
  static getInFront(t, s = !1) {
    return s ? i.DIRECTIONS_FRONT_QUADRANT_MAP.get(t) : i.DIRECTIONS_FRONT_MAP.get(t);
  }
  static getBehind(t, s = !1) {
    return s ? i.DIRECTIONS_BEHIND_QUADRANT_MAP.get(t) : i.DIRECTIONS_BEHIND_MAP.get(t);
  }
  static getLeft(t, s = !1) {
    return s ? i.DIRECTIONS_LEFT_QUADRANT_MAP.get(t) : i.DIRECTIONS_LEFT_MAP.get(t);
  }
  static getRight(t, s = !1) {
    return s ? i.DIRECTIONS_RIGHT_QUADRANT_MAP.get(t) : i.DIRECTIONS_RIGHT_MAP.get(t);
  }
  static slightRandom(t) {
    return E.oneIn(2) ? this.slightRight(t) : this.slightLeft(t);
  }
  static veerRandom(t) {
    return E.oneIn(2) ? this.veerRight(t) : this.veerLeft(t);
  }
  static turnRandom(t) {
    return E.oneIn(2) ? this.turnRight(t) : this.turnLeft(t);
  }
};
i.RANDOM = (t = i.DIRECTIONS) => t[~~(t.length * Math.random())], i.NORTH = "N", i.SOUTH = "S", i.EAST = "E", i.WEST = "W", i.NORTHWEST = "NW", i.NORTHEAST = "NE", i.SOUTHWEST = "SW", i.SOUTHEAST = "SE", i.NORTHNORTHWEST = "NNW", i.WESTNORTHWEST = "WNW", i.NORTHNORTHEAST = "NNE", i.EASTNORTHEAST = "ENE", i.SOUTHSOUTHWEST = "SSW", i.WESTWOUTHWEST = "WSW", i.SOUTHSOUTHEAST = "SSE", i.EASTSOUTHEAST = "ESE", i.DIRECTIONS_PRIMARY = ["N", "E", "S", "W"], i.DIRECTIONS_SECONDARY = ["NW", "NE", "SW", "SE"], i.DIRECTIONS_TERTIARY = ["NNW", "WNW", "SSW", "WSW", "NNE", "ENE", "SSE", "ESE"], i.DIRECTIONS = [...i.DIRECTIONS_PRIMARY, ...i.DIRECTIONS_SECONDARY, ...i.DIRECTIONS_TERTIARY], i.W_LINE = [1, 9, 21, 37], i.N_LINE = [2, 10, 22, 38], i.S_LINE = [3, 11, 23, 39], i.E_LINE = [4, 12, 24, 40], i.NW_LINE = [5, 25], i.SW_LINE = [6, 26], i.NE_LINE = [7, 27], i.SE_LINE = [8, 28], i.WNW_LINE = [13, 29], i.NNW_LINE = [15, 31], i.NNE_LINE = [17, 33], i.ENE_LINE = [19, 35], i.WSW_LINE = [14, 30], i.SSW_LINE = [16, 32], i.SSE_LINE = [18, 34], i.ESE_LINE = [20, 36], i.W_QUADRANT = [1, 9, 13, 14, 21, 29, 30, 37], i.N_QUADRANT = [2, 10, 15, 17, 22, 31, 33, 38], i.S_QUADRANT = [3, 11, 16, 18, 23, 32, 34, 39], i.E_QUADRANT = [4, 12, 19, 20, 24, 35, 36, 40], i.NW_QUADRANT = [5, 13, 15, 25, 29, 31], i.SW_QUADRANT = [6, 14, 16, 26, 30, 32], i.NE_QUADRANT = [7, 17, 19, 27, 33, 35], i.SE_QUADRANT = [8, 18, 20, 28, 34, 36], i.NNW_QUADRANT = [5, 15, 25, 31], i.WNW_QUADRANT = [5, 13, 25, 29], i.SSW_QUADRANT = [6, 16, 26, 32], i.WSW_QUADRANT = [6, 14, 26, 30], i.NNE_QUADRANT = [7, 17, 27, 33], i.ENE_QUADRANT = [7, 19, 27, 35], i.SSE_QUADRANT = [8, 18, 28, 34], i.ESE_QUADRANT = [8, 20, 28, 36], i.DIRMAP_CLOCKWISE_PRIMARY = /* @__PURE__ */ new Map([
  ["E", "S"],
  ["S", "W"],
  ["W", "N"],
  ["N", "E"]
]), i.DIRMAP_COUNTERCLOCKWISE_PRIMARY = /* @__PURE__ */ new Map([
  ["E", "N"],
  ["N", "W"],
  ["W", "S"],
  ["S", "E"]
]), i.DIRMAP_CLOCKWISE_SECONDARY = /* @__PURE__ */ new Map([
  ["E", "SE"],
  ["SE", "S"],
  ["S", "SW"],
  ["SW", "W"],
  ["W", "NW"],
  ["NW", "N"],
  ["N", "NE"],
  ["NE", "E"]
]), i.DIRMAP_COUNTERCLOCKWISE_SECONDARY = /* @__PURE__ */ new Map([
  ["E", "NE"],
  ["NE", "N"],
  ["N", "NW"],
  ["NW", "W"],
  ["W", "SW"],
  ["SW", "S"],
  ["S", "SE"],
  ["SE", "E"]
]), i.DIRMAP_CLOCKWISE_ALL = /* @__PURE__ */ new Map([
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
]), i.DIRMAP_COUNTERCLOCKWISE_ALL = /* @__PURE__ */ new Map([
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
]), i.DIRMAP_REVERSE = /* @__PURE__ */ new Map([
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
]), i.DIRECTIONS_INDEX_MAP = /* @__PURE__ */ new Map([
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
]), i.DIRECTIONS_FRONT_MAP = /* @__PURE__ */ new Map([
  ["W", i.W_LINE],
  ["N", i.N_LINE],
  ["S", i.S_LINE],
  ["E", i.E_LINE],
  ["NW", i.NW_LINE],
  ["SW", i.SW_LINE],
  ["NE", i.NE_LINE],
  ["SE", i.SE_LINE],
  ["WNW", i.WNW_LINE],
  ["NNW", i.NNW_LINE],
  ["NNE", i.NNE_LINE],
  ["ENE", i.ENE_LINE],
  ["WSW", i.WSW_LINE],
  ["SSW", i.SSW_LINE],
  ["SSE", i.SSE_LINE],
  ["ESE", i.ESE_LINE]
]), i.DIRECTIONS_FRONT_QUADRANT_MAP = /* @__PURE__ */ new Map([
  ["W", i.W_QUADRANT],
  ["N", i.N_QUADRANT],
  ["S", i.S_QUADRANT],
  ["E", i.E_QUADRANT],
  ["NW", i.NW_QUADRANT],
  ["SW", i.SW_QUADRANT],
  ["NE", i.NE_QUADRANT],
  ["SE", i.SE_QUADRANT],
  ["WNW", i.WNW_QUADRANT],
  ["NNW", i.NNW_QUADRANT],
  ["NNE", i.NNE_QUADRANT],
  ["ENE", i.ENE_QUADRANT],
  ["WSW", i.WSW_QUADRANT],
  ["SSW", i.SSW_QUADRANT],
  ["SSE", i.SSE_QUADRANT],
  ["ESE", i.ESE_QUADRANT]
]), i.DIRECTIONS_BEHIND_MAP = /* @__PURE__ */ new Map([
  ["W", i.E_LINE],
  ["N", i.S_LINE],
  ["S", i.N_LINE],
  ["E", i.W_LINE],
  ["NW", i.SE_LINE],
  ["SW", i.NE_LINE],
  ["NE", i.SW_LINE],
  ["SE", i.NW_LINE],
  ["WNW", i.ESE_LINE],
  ["NNW", i.SSE_LINE],
  ["NNE", i.SSW_LINE],
  ["ENE", i.WSW_LINE],
  ["WSW", i.ENE_LINE],
  ["SSW", i.NNE_LINE],
  ["SSE", i.NNW_LINE],
  ["ESE", i.WNW_LINE]
]), i.DIRECTIONS_BEHIND_QUADRANT_MAP = /* @__PURE__ */ new Map([
  ["W", i.E_QUADRANT],
  ["N", i.S_QUADRANT],
  ["S", i.N_QUADRANT],
  ["E", i.W_QUADRANT],
  ["NW", i.SE_QUADRANT],
  ["SW", i.NE_QUADRANT],
  ["NE", i.SW_QUADRANT],
  ["SE", i.NW_QUADRANT],
  ["WNW", i.ESE_QUADRANT],
  ["NNW", i.SSE_QUADRANT],
  ["NNE", i.SSW_QUADRANT],
  ["ENE", i.WSW_QUADRANT],
  ["WSW", i.ENE_QUADRANT],
  ["SSW", i.NNE_QUADRANT],
  ["SSE", i.NNW_QUADRANT],
  ["ESE", i.WNW_QUADRANT]
]), i.DIRECTIONS_LEFT_MAP = /* @__PURE__ */ new Map([
  ["W", i.S_LINE],
  ["N", i.W_LINE],
  ["S", i.E_LINE],
  ["E", i.N_LINE],
  ["NW", i.SW_LINE],
  ["SW", i.SE_LINE],
  ["NE", i.NW_LINE],
  ["SE", i.NE_LINE],
  ["WNW", i.SSW_LINE],
  ["NNW", i.WSW_LINE],
  ["NNE", i.WNW_LINE],
  ["ENE", i.NNW_LINE],
  ["WSW", i.SSE_LINE],
  ["SSW", i.ESE_LINE],
  ["SSE", i.ENE_LINE],
  ["ESE", i.NNE_LINE]
]), i.DIRECTIONS_LEFT_QUADRANT_MAP = /* @__PURE__ */ new Map([
  ["W", i.S_QUADRANT],
  ["N", i.W_QUADRANT],
  ["S", i.E_QUADRANT],
  ["E", i.N_QUADRANT],
  ["NW", i.SW_QUADRANT],
  ["SW", i.SE_QUADRANT],
  ["NE", i.NW_QUADRANT],
  ["SE", i.NE_QUADRANT],
  ["WNW", i.SSW_QUADRANT],
  ["NNW", i.WSW_QUADRANT],
  ["NNE", i.WNW_QUADRANT],
  ["ENE", i.NNW_QUADRANT],
  ["WSW", i.SSE_QUADRANT],
  ["SSW", i.ESE_QUADRANT],
  ["SSE", i.ENE_QUADRANT],
  ["ESE", i.NNE_QUADRANT]
]), i.DIRECTIONS_RIGHT_MAP = /* @__PURE__ */ new Map([
  ["W", i.N_LINE],
  ["N", i.E_LINE],
  ["S", i.W_LINE],
  ["E", i.S_LINE],
  ["NW", i.SE_LINE],
  ["SW", i.NE_LINE],
  ["NE", i.SE_LINE],
  ["SE", i.NW_LINE],
  ["WNW", i.ESE_LINE],
  ["NNW", i.SSE_LINE],
  ["NNE", i.SSW_LINE],
  ["ENE", i.WSW_LINE],
  ["WSW", i.ENE_LINE],
  ["SSW", i.NNE_LINE],
  ["SSE", i.NNW_LINE],
  ["ESE", i.WNW_LINE]
]), i.DIRECTIONS_RIGHT_QUADRANT_MAP = /* @__PURE__ */ new Map([
  ["W", i.N_QUADRANT],
  ["N", i.E_QUADRANT],
  ["S", i.W_QUADRANT],
  ["E", i.S_QUADRANT],
  ["NW", i.NE_QUADRANT],
  ["SW", i.NW_QUADRANT],
  ["NE", i.SE_QUADRANT],
  ["SE", i.SW_QUADRANT],
  ["WNW", i.ESE_QUADRANT],
  ["NNW", i.SSE_QUADRANT],
  ["NNE", i.SSW_QUADRANT],
  ["ENE", i.WSW_QUADRANT],
  ["WSW", i.ENE_QUADRANT],
  ["SSW", i.NNE_QUADRANT],
  ["SSE", i.NNW_QUADRANT],
  ["ESE", i.WNW_QUADRANT]
]), i.INDEX_DIRECTION_MAP = /* @__PURE__ */ new Map([
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
let h = i;
const Et = class Et {
  static REVERSE(t) {
    const { heading: s } = t.state;
    s && t.wr("heading", h.reverse(s));
  }
  static SLIGHT_LEFT(t) {
    const { heading: s } = t.state;
    s && t.wr("heading", h.slightLeft(s));
  }
  static VEER_LEFT(t) {
    const { heading: s } = t.state;
    s && t.wr("heading", h.veerLeft(s));
  }
  static TURN_LEFT(t) {
    const { heading: s } = t.state;
    s && t.wr("heading", h.turnLeft(s));
  }
  static SLIGHT_RIGHT(t) {
    const { heading: s } = t.state;
    s && t.wr("heading", h.slightRight(s));
  }
  static VEER_RIGHT(t) {
    const { heading: s } = t.state;
    s && t.wr("heading", h.veerRight(s));
  }
  static TURN_RIGHT(t) {
    const { heading: s } = t.state;
    s && t.wr("heading", h.turnRight(s));
  }
  static SLIGHT_RANDOMLY(t) {
    E.oneIn(2) ? this.SLIGHT_LEFT(t) : this.SLIGHT_RIGHT(t);
  }
  static VEER_RANDOMLY(t) {
    E.oneIn(2) ? this.VEER_LEFT(t) : this.VEER_RIGHT(t);
  }
  static TURN_RANDOMLY(t) {
    E.oneIn(2) ? this.TURN_RIGHT(t) : this.TURN_RIGHT(t);
  }
  static SET_DIRECTION(t, s) {
    t.wr("heading", s);
  }
  static MOVE_IN_DIRECTION(t, s, e, a = "EMPTY", r = d.CREATE()) {
    const { heading: c } = s.state;
    s.wr("heading", e);
    const I = this.MOVE_DIRECTIONALLY(t, s, a, r);
    return s.wr("heading", c ?? e), I;
  }
  static MOVE_DIRECTIONALLY(t, s, e = "EMPTY", a = d.CREATE()) {
    const { heading: r } = s.state;
    if (r) {
      const c = h.getDirectionalMove(r, !0);
      if (e === "ANY" || t.is(c, e))
        return t.move(c, a);
    }
    return !1;
  }
  static SWAP_DIRECTIONALLY(t, s, e = "EMPTY") {
    const { heading: a } = s.state;
    if (a) {
      const r = h.getDirectionalMove(a, !0);
      if (e === "ANY" || t.is(r, e))
        return t.swap(r);
    }
    return !1;
  }
  static DIRECT(t, s, e) {
    const { atom: a } = t.getSite(s);
    return a && a.state.heading ? (a.state.heading = e, !0) : !1;
  }
};
Et.NAME = "WAYFINDING";
let n = Et;
const N = class N extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
    this.state.heading || (this.state.heading = "E"), this.state.phase = "BUILD";
  }
  behave(t) {
    var r, c;
    super.behave(t);
    const s = h.directionToIndex(h.turnLeft(this.state.heading)), e = h.directionToIndex(h.turnRight(this.state.heading)), a = h.getInFront(this.state.heading);
    switch (t.is(a[0], "SWAPLINE") && t.destroy(), this.state.phase) {
      case "BUILD":
        const I = h.getInFront(h.veerLeft(this.state.heading)), O = h.getInFront(h.veerRight(this.state.heading));
        if (t.any([...I, ...O], "SWAPLINE"))
          return;
        if (t.is(s, "EMPTY") ? t.mutate(s, this.TYPE.CREATE) : this.state.color = 13421568, t.is(e, "EMPTY") && (t.mutate(e, this.TYPE.CREATE), this.state.color = 16776960), !t.any([s, e], "EMPTY")) {
          this.state.phase = "WAIT_TO_SWAP";
          return;
        }
        t.destroy();
        break;
      case "WAIT_TO_SWAP":
        this.state.color = 6710886, ((r = t.getSite(s)) == null ? void 0 : r.atom.state.phase) !== "BUILD" && ((c = t.getSite(e)) == null ? void 0 : c.atom.state.phase) !== "BUILD" && (this.state.phase = "SWAP");
        break;
      case "SWAP":
        this.state.color = 16737792;
        const C = h.getInFront(h.turnLeft(h.veerLeft(this.state.heading))).slice(0, 2), f = h.getInFront(h.turnRight(h.veerRight(this.state.heading))).slice(0, 2);
        !t.any([...a, ...C, ...f], "SWAPLINE") && n.SWAP_DIRECTIONALLY(t, this, "ANY"), t.getSite(a[0]) || (this.state.phase = "DIE");
        break;
      case "DIE":
        t.destroy();
    }
  }
};
N.CREATE = N.CREATOR({ name: "SWAPLINE", symbol: "SWL", class: N, color: 10070562, groups: ["Swaplines"] }), N.NORTH = N.CREATOR({ name: "SWAPLINE NORTH", symbol: "SWL", class: N, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "N" }), N.SOUTH = N.CREATOR({ name: "SWAPLINE SOUTH", symbol: "SWL", class: N, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "S" }), N.EAST = N.CREATOR({ name: "SWAPLINE EAST", symbol: "SWL", class: N, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "E" }), N.WEST = N.CREATOR({ name: "SWAPLINE WEST", symbol: "SWL", class: N, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "W" }), N.NW = N.CREATOR({ name: "SWAPLINE NW", symbol: "SWL", class: N, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "NW" }), N.NE = N.CREATOR({ name: "SWAPLINE NE", symbol: "SWL", class: N, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "NE" }), N.SW = N.CREATOR({ name: "SWAPLINE SW", symbol: "SWL", class: N, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "SW" }), N.SE = N.CREATOR({ name: "SWAPLINE SE", symbol: "SWL", class: N, color: 10070562, classifications: ["SWAPLINE"], groups: ["Swaplines"] }, { heading: "SE" });
let At = N;
class M extends l {
  // static CREATE = Builder.CREATOR({ name: "BUILDER", symbol: "BLD", class: Builder, color: 0x121112 });
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
    this.classifyAs("BUILDER"), this.state.transitionAge || (this.state.transitionAge = 10);
  }
  behave(t) {
    super.behave(t);
    const { buildPath: s, atomizer: e, totalSteps: a, transitionAge: r, age: c } = this.state, I = this.state.currentStep ?? 0, O = this.state.didSpread ?? !1, C = t.filterByType(s, "EMPTY");
    !O && C.length && (a ? I < a && (t.mutateMany(C, this.TYPE.CREATE, [{}, { currentStep: I + 1 }]), this.state.totalSteps--) : t.mutateMany(C, this.TYPE.CREATE)), this.state.didSpread = !0, c > r && t.mutate(0, e);
  }
}
const L = class L extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), t.selfIs("DECAYABLE") && w.DECAY(t, this, this.state.lifeSpan ?? 100, 2);
  }
};
L.CREATE = L.CREATOR({ name: "WALL", class: L, color: 3346892, groups: ["Structural", "MFM"] }), L.MOVABLE_WALL = L.CREATOR({ name: "MOVABLE WALL", class: L, color: 8917452, classifications: ["MOVABLE"], groups: ["Structural", "MFM"] }), L.DECAY_WALL = L.CREATOR({ name: "DECAY WALL", class: L, color: 238, classifications: ["DECAYABLE", "WALL"], groups: ["Structural"] }), L.DECAY_WALL_10 = L.CREATOR(
  { name: "DECAY WALL 10", class: L, color: 238, classifications: ["DECAYABLE", "WALL", "DECAY WALL"], groups: ["Structural"] },
  { lifeSpan: 10 }
), L.DECAY_WALL_25 = L.CREATOR(
  { name: "DECAY WALL 25", class: L, color: 238, classifications: ["DECAYABLE", "WALL", "DECAY WALL"], groups: ["Structural"] },
  { lifeSpan: 25 }
), L.DECAY_WALL_50 = L.CREATOR(
  { name: "DECAY WALL 50", class: L, color: 238, classifications: ["DECAYABLE", "WALL", "DECAY WALL"], groups: ["Structural"] },
  { lifeSpan: 50 }
), L.MOVABLE_WALL_GRID = M.CREATOR(
  { name: "MOVABLE WALL GRID", class: M, color: 1184018, groups: ["Structural"] },
  { buildPath: E.DIAGONAL4WAY, atomizer: L.MOVABLE_WALL }
);
let D = L;
const B = class B extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), this.regen(t), this.populateRegenMap(t);
  }
  populateRegenMap(t) {
    var e;
    const s = t.filterByType(E.ALLADJACENT, "LIVING WALL");
    s.length > (((e = this.state.regenMap) == null ? void 0 : e.length) ?? 0) && (this.state.regenMap = s.map((a) => [a, t.getSite(a).atom.TYPE.CREATE]), this.state.color = this.TYPE.color - this.state.regenMap.length * 6);
  }
  regen(t) {
    var s;
    (s = this.state.regenMap) != null && s.length && this.state.regenMap.forEach((e) => {
      t.is(e[0], "EMPTY") && t.mutate(e[0], e[1]);
    });
  }
};
B.CREATE = B.CREATOR({ name: "LIVING WALL", class: B, color: 2250154, groups: ["Structural", "MFM"] }), B.MOVABLE_LIVING_WALL = B.CREATOR({
  name: "MOVABLE LIVING WALL",
  class: B,
  color: 2250154,
  classifications: ["MOVABLE", "LIVING WALL"],
  groups: ["Structural", "MFM"]
});
let nt = B;
const ht = class ht {
  static CREATE(t, s, e = "EMPTY", a) {
    return (r) => {
      let c = !1;
      if (r.any(s, t)) {
        const I = r.filterByType(a, e);
        I.length && (c = r.swap(r.random(I)));
      }
      return c;
    };
  }
  static FAR_NORTH(t, s, e = "EMPTY") {
    return E.oneIn(5) && t.is(3, s) && t.is(10, e) && t.swap(10), !0;
  }
  static MAKE_REPELLER(t, s = [1, 2, 3, 4, 5, 6, 7, 8], e = [37, 38, 39, 40, 25, 26, 27, 28]) {
    return (a, r) => {
      const c = r.state.repelTypes ?? t;
      if (s.length > e.length)
        throw new Error("fromSet must be less than or equal to length of toSet");
      const I = a.filter(s, c), O = a.filter(e, "EMPTY");
      if (I.length && O.length) {
        const C = Object.fromEntries(
          s.map((Y, x) => [Y, e[x]])
        );
        let f = !1;
        return I.forEach((Y) => {
          if (!f) {
            const x = C[Y];
            if (O.includes(x))
              f = a.move(x, void 0, Y);
            else {
              const Wt = E.RANDOM(O);
              f = a.move(Wt, void 0, Y);
            }
          }
        }), f;
      }
      return !1;
    };
  }
  static MAKE_AVOIDER(t, s = [1, 2, 3, 4, 5, 6, 7, 8], e = [40, 39, 38, 37, 28, 27, 26, 25]) {
    return (a, r) => {
      const c = r.state.repelTypes ?? t;
      if (s.length > e.length)
        throw new Error("fromSet must be less than or equal to length of toSet");
      const I = a.filter(s, c), O = a.filter(e, "EMPTY");
      if (I.length && O.length) {
        Object.fromEntries(
          s.map((f, Y) => [f, e[Y]])
        );
        let C = !1;
        return I.forEach((f) => {
          C || (C = a.move(E.RANDOM(O)));
        }), C;
      }
      return !1;
    };
  }
  static MAKE_ATTRACTOR(t, s = E.ALLADJACENT) {
    return (e, a) => {
      const r = a.state.attractTypes ?? t, c = a.state.swapTypes ?? ["EMPTY"], I = e.filter(s, r);
      if (I.length) {
        const O = E.RANDOM(I), C = h.getInFront(h.indexToDirection(O), !0), f = e.filter(C, c);
        if (f.length)
          return f.sort((Y, x) => Math.abs(O - Y) - Math.abs(O - x)).slice(~~(f.length / 2)), e.swap(E.RANDOM(f));
      }
      return !1;
    };
  }
};
ht.NAME = "REPEL";
let P = ht;
const T = class T extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), y.DOWN(t) || y.SIDE(t), t.selfIs("BUBBLY") && T.BUBBLE(t), t.selfIs("FLOATS") ? y.FLOAT(t, 1.25) : y.SINK(t);
  }
};
T.CREATE = T.CREATOR({ name: "SAND", symbol: "SND", class: T, color: 16768256, classifications: ["SAND", "MOVABLE"], groups: ["Environment"] }), T.RED_SAND = T.CREATOR({ name: "RED SAND", class: T, color: 16711680, classifications: ["SAND", "BUBBLY", "MOVABLE"], groups: ["Environment"] }), T.PINK_SAND = T.CREATOR({
  name: "PINK SAND",
  class: T,
  color: 16418500,
  classifications: ["BUBBLY", "SAND", "FLOATS", "MOVABLE"],
  groups: ["Environment"]
}), T.FLOATY_SAND = T.CREATOR({
  name: "FLOATY SAND",
  class: T,
  color: 0,
  classifications: ["FLOATS", "SAND", "MOVABLE"],
  groups: ["Environment"]
}), T.GREEN_SAND = T.CREATOR({ name: "GREEN SAND", class: T, color: 9095462, classifications: ["SAND", "MOVABLE"], groups: ["Environment"] }), T.BLUE_SAND = T.CREATOR({ name: "BLUE SAND", class: T, color: 1671876, classifications: ["SAND", "MOVABLE"], groups: ["Environment"] }), T.PURPLE_SAND = T.CREATOR({ name: "PURPLE SAND", class: T, color: 6966419, classifications: ["SAND", "MOVABLE"], groups: ["Environment"] }), T.SAND_GRID = M.CREATOR(
  { name: "SAND GRID", class: M, color: 1184018, groups: ["Environment"] },
  { buildPath: E.DIAGONAL4WAY, atomizer: T.CREATE, totalSteps: 40 }
), T.BUBBLE = P.CREATE("SAND", E.S_QUADRANT, "EMPTY", E.N_QUADRANT);
let ct = T;
const W = class W extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
    this.classifyAs("WATER");
  }
  behave(t) {
    super.behave(t), y.DOWN(t) || y.SLIP(t), t.selfIs("BUBBLY") && W.DO_BUBBLE(t);
  }
};
W.CREATE = W.CREATOR({ name: "WATER", symbol: "SND", class: W, color: 4590, groups: ["Environment"] }), W.BUBBLY_WATER = W.CREATOR({ name: "BUBBLY WATER", class: W, color: 4590, classifications: ["WATER", "BUBBLY"], groups: ["Environment"] }), W.WATER_GRID = M.CREATOR(
  { name: "WATER GRID", class: M, color: 1184018, groups: ["Environment"] },
  { buildPath: E.DIAGONAL4WAY, atomizer: W.CREATE, totalSteps: 40 }
), W.WATER_LINE = M.CREATOR(
  { name: "WATER LINE", class: M, color: 1184018, groups: ["Environment"] },
  { buildPath: [1, 4], atomizer: W.CREATE }
), W.DO_BUBBLE = P.CREATE("WATER", E.S_QUADRANT, "EMPTY", E.N_QUADRANT);
let Rt = W;
const u = class u extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
    this.state.stickyType || (this.state.stickyType = ["GOOP"]), this.state.attractor = P.MAKE_ATTRACTOR(
      this.state.stickyType,
      [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    ), this.state.avoider = P.MAKE_AVOIDER(this.state.stickyType, [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]), this.state.aloneCount = 0;
  }
  behave(t) {
    super.behave(t), t.filterByType(E.ALLADJACENT, [...this.state.stickyType, "GOOP"]).length, !this.state.attractor(t, this) && !this.state.avoider(t, this) && u.ATTRACT(t, this);
  }
};
u.CREATE = u.CREATOR({ name: "GOOP", symbol: "GOP", class: u, color: 5542562, groups: ["Goopy Stuff"] }), u.WALL_GOOP = u.CREATOR(
  { name: "WALL GOOP", class: u, color: 15110911, classifications: ["GOOP"], groups: ["Goopy Stuff"] },
  { stickyType: ["WALL"] }
), u.LIFE_GOOP = u.CREATOR(
  { name: "LIFE GOOP", class: u, color: 5548439, classifications: ["GOOP", "MOVABLE"], groups: ["Goopy Stuff"] },
  { stickyType: ["DIRECTIONAL", "TAIL"] }
), u.HC3_GOOP = u.CREATOR(
  { name: "HC3 GOOP", class: u, color: 5548439, classifications: ["GOOP", "MOVABLE"], groups: ["Goopy Stuff"] },
  { stickyType: ["HC3-END"] }
), u.GOOP_GRID = M.CREATOR(
  { name: "GOOP GRID", class: M, color: 1184018, groups: ["Goopy Stuff"] },
  { buildPath: E.DIAGONAL4WAY, atomizer: u.LIFE_GOOP, totalSteps: 40 }
), u.ATTRACT = P.MAKE_ATTRACTOR(["GOOP"], [...E.LAYER2, ...E.LAYER3, ...E.LAYER4]), u.AVOID = P.MAKE_AVOIDER(["GOOP"], [...E.LAYER1], [...E.LAYER2, ...E.LAYER3, ...E.LAYER4]);
let Nt = u;
const A = class A extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), this.state.directableTypes && this.state.directableTypes.forEach((s) => {
      t.filter(E.ALLADJACENT, s).forEach((a) => {
        n.DIRECT(t, a, this.state.pointing);
      });
    }), t.selfIs("DECAYABLE") && w.DECAY(t, this, this.state.lifeSpan ?? 100, 2);
  }
};
A.N = A.CREATOR(
  { name: "DIRECTOR N", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "N", directableTypes: ["DIRECTABLE"] }
), A.S = A.CREATOR(
  { name: "DIRECTOR S", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "S", directableTypes: ["DIRECTABLE"] }
), A.E = A.CREATOR(
  { name: "DIRECTOR E", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "E", directableTypes: ["DIRECTABLE"] }
), A.W = A.CREATOR(
  { name: "DIRECTOR W", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "W", directableTypes: ["DIRECTABLE"] }
), A.NE = A.CREATOR(
  { name: "DIRECTOR NE", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "NE", directableTypes: ["DIRECTABLE"] }
), A.NW = A.CREATOR(
  { name: "DIRECTOR NW", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "NW", directableTypes: ["DIRECTABLE"] }
), A.SW = A.CREATOR(
  { name: "DIRECTOR SW", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "SW", directableTypes: ["DIRECTABLE"] }
), A.SE = A.CREATOR(
  { name: "DIRECTOR SE", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "SE", directableTypes: ["DIRECTABLE"] }
), A.NNE = A.CREATOR(
  { name: "DIRECTOR NNE", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "NNE", directableTypes: ["DIRECTABLE"] }
), A.NNW = A.CREATOR(
  { name: "DIRECTOR NNW", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "NNW", directableTypes: ["DIRECTABLE"] }
), A.ENE = A.CREATOR(
  { name: "DIRECTOR ENE", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "ENE", directableTypes: ["DIRECTABLE"] }
), A.WNW = A.CREATOR(
  { name: "DIRECTOR WNW", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "WNW", directableTypes: ["DIRECTABLE"] }
), A.SSE = A.CREATOR(
  { name: "DIRECTOR SSE", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "SSE", directableTypes: ["DIRECTABLE"] }
), A.SSW = A.CREATOR(
  { name: "DIRECTOR SSW", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "SSW", directableTypes: ["DIRECTABLE"] }
), A.ESE = A.CREATOR(
  { name: "DIRECTOR ESE", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "ESE", directableTypes: ["DIRECTABLE"] }
), A.WSW = A.CREATOR(
  { name: "DIRECTOR WSW", symbol: "DTR", class: A, color: 6750777, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { pointing: "WSW", directableTypes: ["DIRECTABLE"] }
), A.DIRECTORS_MAP = /* @__PURE__ */ new Map([
  ["N", A.N],
  ["E", A.E],
  ["S", A.S],
  ["W", A.W],
  ["NE", A.NE],
  ["NW", A.NW],
  ["SE", A.SE],
  ["SW", A.SW],
  ["NNE", A.NNE],
  ["NNW", A.NNW],
  ["ENE", A.ENE],
  ["WNW", A.WNW],
  ["SSE", A.SSE],
  ["SSW", A.SSW],
  ["ESE", A.ESE],
  ["WSW", A.WSW]
]);
let q = A;
const p = class p extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
    this.classifyAs("DIRECTIONAL");
  }
  makeBigTail(t) {
    [
      ...h.getLeft(this.state.heading, !0),
      h.getDirectionalMove(h.veerLeft(this.state.heading), !0),
      h.getDirectionalMove(h.veerRight(this.state.heading), !0),
      h.getDirectionalMove(h.turnRight(this.state.heading), !0),
      h.getDirectionalMove(h.turnLeft(this.state.heading), !0)
    ].forEach((s) => {
      t.is(s, "EMPTY") && t.replace(s, p.LOOP_WALL());
    });
  }
  behave(t) {
    super.behave(t), p.REPEL_DIRECTIONAL(t, this), t.selfIs("WONKY") ? this.behaveAsWonky(t) : this.behaveAsLooper(t);
  }
  behaveAsLooper(t) {
    if (!this.state.heading)
      n.SET_DIRECTION(this, h.RANDOM(h.DIRECTIONS_PRIMARY)), this.state.moves = 0;
    else {
      const s = this.state.moves % 2 !== 0;
      let e;
      this.makeBigTail(t), s && (e = p.LOOP_DIRECTOR(this.state.heading)), n.MOVE_DIRECTIONALLY(t, this, ["LOOP WALL", "LOOP DIRECTOR", "EMPTY"], e), this.state.moves++, this.state.moves % 8 === 0 && n.VEER_RIGHT(this);
    }
  }
  behaveAsWonky(t) {
    this.state.heading ? (n.MOVE_DIRECTIONALLY(
      t,
      this,
      ["DECAY WALL", "EMPTY"],
      q.DIRECTORS_MAP.get(h.turnRight(this.state.heading))({ classifications: ["DECAY WALL", "DECAYABLE"] }, { lifeSpan: 50 })
    ), this.state.age % 5 === 0 && n.SLIGHT_RIGHT(this)) : (n.SET_DIRECTION(this, h.RANDOM(h.DIRECTIONS)), this.state.moves = 0);
  }
};
p.CREATE = p.CREATOR({ name: "LOOPER", symbol: "LPR", class: p, color: 16716911, groups: ["Life"] }), p.WONKY = p.CREATOR({
  name: "WONKY LOOPER",
  symbol: "LPR",
  class: p,
  color: 16716911,
  classifications: ["WONKY", "LOOPER"],
  groups: ["Life"]
}), p.LOOP_WALL = D.CREATOR({ name: "LOOP WALL", class: D, color: 6689177, classifications: ["DECAYABLE", "MOVABLE"] }, { lifeSpan: 150 }), p.LOOP_DIRECTOR = (t) => q.DIRECTORS_MAP.get(h.turnRight(t))({ classifications: ["LOOP DIRECTOR", "DECAYABLE"] }, { lifeSpan: 100 }), p.REPEL_DIRECTIONAL = P.MAKE_REPELLER(["DIRECTIONAL"], [1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 25, 26, 27, 28]);
let Tt = p;
const k = class k extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t);
  }
};
k.CREATE = k.CREATOR({ name: "BEIN", symbol: "BNG", class: k, color: 12457071, groups: ["MFM"] });
let lt = k;
const S = class S extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
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
    var s;
    if (super.behave(t), this.state.heading) {
      const e = h.getInFront(this.state.heading)[0];
      t.is(e, "MOVABLE") && P.MAKE_REPELLER(["MOVABLE"], [e], t.shuffleSites([9, 10, 11, 12, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]))(t, this);
    }
    if (t.selfIs("FLY"))
      this.behaveAsFly(t);
    else if (t.selfIs("MOSQUITO"))
      this.behaveAsMosquito(t);
    else if (t.selfIs("BIRD"))
      this.behaveAsBird(t);
    else if (t.selfIs("SWAMP DATA"))
      this.behaveAsSwampData(t);
    else {
      if (!this.state.heading) {
        n.SET_DIRECTION(this, h.RANDOM());
        return;
      }
      if (!t.exists(h.getInFront(this.state.heading)[0])) {
        n.REVERSE(this), n.SLIGHT_RANDOMLY(this);
        return;
      }
      const e = (s = t.filter(h.getInFront(this.state.heading, !0), "WANDERER", !0)) == null ? void 0 : s[0];
      e ? this.state.heading = t.getSite(e).atom.state.heading : E.oneIn(100) && n.SLIGHT_RANDOMLY(this);
      const a = t.filter(h.getBehind(this.state.heading, !0), "WANDERER", !1);
      a.length > 0 && a.forEach((r) => {
        t.getSite(r).atom.state.heading = this.state.heading;
      }), n.MOVE_DIRECTIONALLY(t, this) || n.SLIGHT_RANDOMLY(this), this.state.setColor();
    }
  }
  behaveAsFly(t) {
    this.state.heading ? ([
      h.getDirectionalMove(h.turnRight(this.state.heading), !0),
      h.getDirectionalMove(h.turnLeft(this.state.heading), !0)
    ].forEach((s) => {
      t.is(s, "EMPTY") && t.replace(s, S.FLY_TAIL());
    }), n.MOVE_DIRECTIONALLY(t, this, "EMPTY", S.FLY_TAIL()), E.oneIn(2) && n.SLIGHT_RANDOMLY(this)) : n.SET_DIRECTION(this, h.RANDOM());
  }
  behaveAsMosquito(t) {
    this.state.heading ? (n.MOVE_DIRECTIONALLY(t, this, "EMPTY", S.MOSQUITO_TAIL()), n.SLIGHT_RANDOMLY(this)) : n.SET_DIRECTION(this, h.RANDOM());
  }
  behaveAsBird(t) {
    if (!this.state.heading)
      n.SET_DIRECTION(this, h.RANDOM());
    else {
      const s = t.filter(E.ALLADJACENT, "BIRD", !0)[0];
      s && (this.state.heading = t.getSite(s).atom.state.heading ?? this.state.heading), [
        h.getDirectionalMove(h.turnRight(this.state.heading), !0),
        h.getDirectionalMove(h.turnLeft(this.state.heading), !0)
      ].forEach((e) => {
        t.is(e, "EMPTY") && t.replace(e, S.BIRD_WING({}, { heading: this.state.heading }));
      }), n.MOVE_DIRECTIONALLY(t, this, "EMPTY") ? E.oneIn(4) && n.SLIGHT_RANDOMLY(this) : n.REVERSE(this);
    }
  }
  behaveAsSwampData(t) {
    this.state.heading ? (t.filter(h.getInFront(this.state.heading), "EMPTY").length && n.REVERSE(this), E.oneIn(10) && (n.SWAP_DIRECTIONALLY(t, this, "SWAMP"), n.SLIGHT_RANDOMLY(this))) : n.SET_DIRECTION(this, h.RANDOM());
  }
  blazeTrail(t) {
    if (this.state.heading) {
      const s = h.getInFront(h.turnLeft(this.state.heading))[1], e = h.getInFront(h.turnRight(this.state.heading))[1];
      t.is(s, "EMPTY") ? t.mutate(s, D.MOVABLE_WALL) : t.is(s, "MOVABLE WALL") && t.mutate(s, d.CREATE), t.is(e, "EMPTY") ? t.mutate(e, D.MOVABLE_WALL) : t.is(e, "MOVABLE WALL") && t.mutate(e, d.CREATE);
    }
  }
};
S.CREATE = S.CREATOR({ name: "WANDERER", class: S, color: 12457071, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] }), S.FLY = S.CREATOR({ name: "FLY", class: S, color: 13413119, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] }), S.MOSQUITO = S.CREATOR({ name: "MOSQUITO", class: S, color: 13434709, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] }), S.BIRD = S.CREATOR({ name: "BIRD", class: S, color: 4889583, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] }), S.SWAMPDATA = S.CREATOR({
  name: "SWAMP DATA",
  class: S,
  color: 5513984,
  classifications: ["OFSWAMP", "DIRECTIONAL", "DIRECTABLE"],
  groups: ["Swamp"]
}), S.BIRD_WING = D.CREATOR(
  { name: "BIRD WING", class: D, color: 3836895, classifications: ["DECAYABLE", "BIRD", "DIRECTABLE", "TAIL"] },
  { lifeSpan: 2 }
), S.FLY_TAIL = D.CREATOR({ name: "FLY TAIL", class: D, color: 10031428, classifications: ["DECAYABLE", "TAIL"] }, { lifeSpan: 10 }), S.MOSQUITO_TAIL = D.CREATOR({ name: "MOSQUITO TAIL", class: D, color: 5601024, classifications: ["DECAYABLE", "TAIL"] }, { lifeSpan: 10 });
let St = S;
const $ = class $ extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t);
    const s = t.filterByType([...E.LAYER1, ...E.LAYER2, ...E.LAYER3], ["EMPTY", "DIRECTOR"]);
    s.length > 0 && t.mutateMany(s, D.CREATE);
    const e = t.filterByType(E.LAYER4, "EMPTY");
    if (e.length > 0 && e.forEach((a) => {
      let r = h.indexToDirection(a);
      const c = h.turnLeft(r);
      t.mutate(a, q.DIRECTORS_MAP.get(c));
    }), E.oneIn(1e3)) {
      const a = t.filterByType(E.LAYER4, "DIRECTOR");
      t.destroy(t.random(a));
    }
  }
};
$.CREATE = $.CREATOR({ name: "DIRECTOR WALL", symbol: "DRWL", class: $, color: 12457071, groups: ["Structural"] });
let It = $;
const U = class U extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
  }
  behave(t) {
    var e, a;
    if (super.behave(t), !this.state.heading) {
      this.state.heading = h.RANDOM(h.DIRECTIONS);
      return;
    }
    const s = t.filterByType(E.ALLADJACENT, ((e = this.state) == null ? void 0 : e.directableTypes) ?? ["DIRECTABLE"]);
    if (s.length > 0) {
      const r = s[0], c = n.DIRECT(t, r, ((a = this.state) == null ? void 0 : a.pointing) ?? h.reverse(this.state.heading));
      if (this.state.once && c) {
        t.destroy(0);
        return;
      }
    }
    this.state.heading && (n.MOVE_DIRECTIONALLY(t, this, this.state.direction) || (this.state.heading = h.slightRandom(this.state.heading)));
  }
};
U.CREATE = U.CREATOR({ name: "DIRDIR", symbol: "DDIR", class: U, color: 11184810, groups: ["Agents"], classifications: ["DIRECTOR"] }), U.DDIR_ONCE = U.CREATOR(
  { name: "DIRDIR ONCE", symbol: "DDIRO", class: U, color: 10066329, classifications: ["DIRECTOR"], groups: ["Agents"] },
  { directableTypes: ["DIRECTABLE"], once: !0 }
);
let Lt = U;
const z = class z extends l {
  constructor(t, s = {}) {
    super(t, s);
  }
  behave(t) {
    super.behave(t);
    const s = t.filterByType(E.ADJACENT8WAY, "SWAMP WORKER");
    if (t.filterByType(E.ALLADJACENT, "OFSWAMP").length < E.ALLADJACENT.length * 0.4) {
      t.mutate(0, Z.CREATE);
      return;
    }
    if (s.length) {
      t.mutate(0, Z.CREATE);
      return;
    }
    this.state.heading ? n.SWAP_DIRECTIONALLY(t, this, "SWAMP") ? n.VEER_RIGHT(this) : n.SLIGHT_RIGHT(this) : n.SET_DIRECTION(this, h.RANDOM(h.DIRECTIONS_PRIMARY));
  }
};
z.CREATE = z.CREATOR({
  name: "SWAMP WORKER",
  symbol: "SWK",
  class: z,
  color: 214543,
  // color: 0x3d5b31,
  // color: 0x3d6242,
  classifications: ["OFSWAMP", "DIRECTIONAL", "SWAMPLING"],
  groups: ["Swamp"]
});
let at = z;
const G = class G extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
    this.state.lifeSpan = this.state.lifeSpan ?? 90;
  }
  behave(t) {
    super.behave(t);
    const s = t.filterByType(E.ADJACENT8WAY, "SWAMPLING"), e = t.filterByType(E.ADJACENT8WAY, "OFSWAMP"), a = t.filterByType(E.ALLADJACENT, "SWAMP");
    if (!this.state.made && a.length === E.ALLADJACENT.length) {
      this.state.made = !0, t.mutate(0, at.CREATE);
      return;
    }
    s.length > 0 ? (this.state.age = 0, E.oneIn(6) && this.grow(t)) : t.selfIs("DECAYABLE") && e.length < 7 ? w.DECAY(t, this, this.state.lifeSpan) && t.mutate(0, G.BOG) : this.state.age = 0;
  }
  grow(t) {
    const s = t.filterByType(E.ADJACENT4WAY, "EMPTY");
    s.length && t.mutate(t.random(s), this.TYPE.CREATE);
  }
};
G.CREATE = G.CREATOR({
  name: "SWAMP",
  class: G,
  color: 4021041,
  classifications: ["ENV", "OFSWAMP", "DECAYABLE"],
  groups: ["Swamp"]
}), G.BOG = D.CREATOR({ name: "BOG", class: D, classifications: ["DECAYABLE"], color: 1320454 }, { lifeSpan: 45 });
let Z = G;
const X = class X extends l {
  //SYSTEM ELEMENTS
  constructor(t, s = {}) {
    super(t, s);
  }
  behave(t) {
    if (super.behave(t), this.state.heading)
      t.filterByType(E.ADJACENT8WAY, "EMPTY").length > 1 && n.SLIGHT_RIGHT(this), n.SWAP_DIRECTIONALLY(t, this, "SWAMP"), E.oneIn(1.5) && n.SLIGHT_RIGHT(this);
    else {
      n.SET_DIRECTION(this, h.RANDOM());
      const s = t.filterByType(E.ADJACENT8WAY, "EMPTY");
      s.length && t.mutateMany(s, Z.CREATE);
    }
  }
};
X.CREATE = X.CREATOR({
  name: "SWAMPLING",
  class: X,
  color: 2280584,
  // color: 0x3d5b31,
  classifications: ["OFSWAMP", "DIRECTIONAL", "DIRECTABLE"],
  groups: ["Swamp"]
});
let ut = X;
const j = class j extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
  }
  behave(t) {
    super.behave(t), this.state.heading ? (n.MOVE_DIRECTIONALLY(t, this), n.SLIGHT_RANDOMLY(this)) : n.SET_DIRECTION(this, h.RANDOM());
    const s = t.filter(E.ALLADJACENT, "FORKBOMB", !0);
    s.length && t.mutate(s[0], et.CREATE);
  }
};
j.CREATE = j.CREATOR({ name: "SENTRY", class: j, color: 10753279, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["MFM"] });
let Dt = j;
const R = class R extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
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
      const s = this.shouldMove(t);
      if (s) {
        n.MOVE_IN_DIRECTION(t, this, s);
        return;
      }
    }
    if (this.shouldRegrow(t)) {
      const s = t.filter(R.CELL_SITES, "EMPTY");
      s.length && t.mutateMany(s, R.CREATOR(this.TYPE, { maxHops: this.state.maxHops, localId: this.state.localId }));
    }
    this.isRoot() && this.state.stasus && E.oneIn(4) && this.canMove(t) && t.swap(E.RANDOM(R.CELL_WANDER_MAP.get(0)), 0), this.isEnd() && this.classifyAs("HC3-END");
  }
  //stasus means you have all 4 HardCell3's surrounding you if you're not the end
  //AND all upstream HardCell3's are also in stasus
  hasStasis(t) {
    return this.isEnd() ? !0 : this.neighbors(t).length !== t.getSites(R.CELL_SITES).filter((a) => a).length ? !1 : !this.upstreams(t).map((a) => t.getSite(a).atom.state.stasus ?? !1).some((a) => !a);
  }
  //bad structure is if the neighbors have too high or low or no hop count
  hasBadStructure(t) {
    const s = this.neighbors(t).map((a) => t.getSite(a).atom.state.hops);
    return s.some((a) => a === void 0) || s.some((a) => a > this.state.hops + 1) || s.some((a) => a < this.state.hops - 1) || s.some((a) => a === void 0);
  }
  figureHops(t) {
    const s = this.neighbors(t);
    if (s.length === 0 || this.state.hops === 0) {
      this.state.hops = 0, this.setColor();
      return;
    } else {
      const e = s.map((a) => {
        var r;
        return (r = t.getSite(a)) == null ? void 0 : r.atom.state.hops;
      }).filter((a) => !isNaN(a) && a !== void 0);
      if (e.length)
        this.state.hops = Math.min(...e) + 1;
      else
        return;
    }
    this.setColor(), isNaN(this.state.hops) && t.destroy();
  }
  setColor() {
    this.state.color = R.COLORS[this.state.hops % R.COLORS.length];
  }
  canMove(t) {
    return this.neighbors(t).length === R.CELL_SITES.length;
  }
  shouldRegrow(t) {
    return !(this.isEnd() || t.filter(E.ALLADJACENT, this.localType()).length === 4);
  }
  shouldMove(t) {
    const s = t.filter(R.CELL_SITES, "EMPTY");
    if (s.length) {
      const e = E.RANDOM(s), a = R.CELL_WANDER_MAP.get(e), r = t.filter(a, this.localType()).filter((c) => t.getSite(c).atom.state.hops < this.state.hops);
      if (r.length) {
        const c = E.RANDOM(r);
        return R.CELL_DIRECTION_MAP.get(c);
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
    return t.filter(R.CELL_SITES, this.localType()).filter((a) => {
      var r, c;
      return ((c = (r = t.getSite(a)) == null ? void 0 : r.atom.state) == null ? void 0 : c.hops) > this.state.hops;
    });
  }
  downstreams(t) {
    return t.filter(R.CELL_SITES, this.localType()).filter((a) => {
      var r, c;
      return ((c = (r = t.getSite(a)) == null ? void 0 : r.atom.state) == null ? void 0 : c.hops) < this.state.hops;
    });
  }
  //returns actual HardCell3's at CELL_SITES
  neighbors(t) {
    return t.filter(R.CELL_SITES, this.localType());
  }
  getDirectionFromWanderMap(t, s) {
    var r;
    const e = R.CELL_WANDER_MAP.get(s);
    if (!e)
      return;
    const a = (r = t.filter(e, this.localType(), !0)) == null ? void 0 : r[0];
    if (a)
      return R.CELL_DIRECTION_MAP.get(a);
  }
};
R.CREATE = R.CREATOR({ name: "HARDCELL3x16", symbol: "HC3", class: R, color: 12457071, classifications: ["HARDCELL3"], groups: ["MFM"] }), R.HC3x8 = R.CREATOR({ name: "HARDCELL3x8", symbol: "HC3", class: R, color: 12457071, classifications: ["HARDCELL3"], groups: ["MFM"] }, { maxHops: 8 }), R.HC3x4 = R.CREATOR({ name: "HARDCELL3x4", symbol: "HC3", class: R, color: 12457071, classifications: ["HARDCELL3"], groups: ["MFM"] }, { maxHops: 4 }), R.CELL_SITES = [21, 22, 23, 24], R.CELL_WANDER_MAP = /* @__PURE__ */ new Map([
  [0, [1, 2, 3, 4]],
  [21, [9, 29, 30, 37]],
  [22, [10, 31, 33, 38]],
  [23, [11, 32, 34, 39]],
  [24, [12, 35, 36, 40]]
]), R.CELL_DIRECTION_MAP = /* @__PURE__ */ new Map([
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
]), R.COLORS = [16711680, 16744192, 16776960, 65280, 255, 4915330, 606419];
let Ot = R;
const m = class m extends l {
  // static COLORS = [ 0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x940d3 ];
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
    this.state.growCount = this.state.growCount ?? 8;
  }
  behave(t) {
    super.behave(t);
    let s = this.establishType(t), e = !1;
    if (!s && this.state.age > 1 && t.destroy(), !(this.state.growCount && (e = this.grow(t), e)))
      switch (s) {
        case "HEAD":
          return this.move(t);
        case "MIDDLE":
          if (this.isAheadTemp(t) && (e = this.swapSegments(t, this.state.ahead), e))
            return;
          break;
        case "TAIL":
          if (this.isTemp()) {
            const a = this.getSegment(t, this.state.ahead);
            a && (a.state.behind = null), t.destroy();
          } else if (this.isAheadTemp(t) && (e = this.swapSegments(t, this.state.ahead), e))
            return;
          break;
      }
  }
  establishType(t) {
    this.confirmBehind(t), this.confirmAhead(t);
    let s;
    return this.isHead() ? (this.state.color = 14544639, s = "HEAD") : this.isTail() ? s = "TAIL" : this.isMiddle() && (s = "MIDDLE"), this.isTemp(), s;
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
    const s = this.getSegment(t, this.state.behind);
    return !s || s && !s.is("SWAPWORM") ? (this.state.behind = null, !1) : !0;
  }
  confirmAhead(t) {
    const s = this.getSegment(t, this.state.ahead);
    return !s || s && !s.is("SWAPWORM") ? (this.state.ahead = null, !1) : !0;
  }
  isBehindTemp(t) {
    if (this.state.behind) {
      const s = this.getSegment(t, this.state.behind);
      if (s && s.state.temp)
        return !0;
    }
    return !1;
  }
  isAheadTemp(t) {
    if (this.state.ahead) {
      const s = this.getSegment(t, this.state.ahead);
      if (s && s.state.temp)
        return !0;
    }
    return !1;
  }
  makeGrowSegment(t) {
    return m.CREATE(this.TYPE, { growCount: 0, ahead: t, behind: this.state.behind });
  }
  makeGrowTemp(t) {
    return m.CREATE(this.TYPE, { growCount: 0, ahead: t, behind: this.state.behind, temp: !0 });
  }
  getSegment(t, s) {
    var a;
    if (!s && s !== 0)
      return;
    const e = (a = t.getSite(s)) == null ? void 0 : a.atom;
    if (!(!e || !e.is("SWAPWORM")))
      return e;
  }
  swapSegments(t, s) {
    const e = this.getSegment(t, s);
    return [this.state.ahead, this.state.behind, e.state.ahead, e.state.behind] = [e.state.ahead, e.state.behind, this.state.ahead, this.state.behind], t.swap(s);
  }
  grow(t) {
    const s = Math.min(...t.filter(E.ADJACENT8WAY, "EMPTY"));
    if (s && s !== 1 / 0) {
      const e = t.move(s, this.makeGrowSegment(s));
      return e && (this.state.growCount--, this.state.behind = E.OPPOSITES[s]), e;
    }
    return !1;
  }
  move(t) {
    var s, e;
    if (((s = this.state) == null ? void 0 : s.status) === "HELD")
      return !1;
    if (!this.state.heading)
      n.SET_DIRECTION(this, h.RANDOM());
    else if (E.oneIn(2)) {
      const a = h.getDirectionalMove(this.state.heading, !0);
      let r = !1;
      return t.is(a, "EMPTY") && (r = t.move(a, this.makeGrowTemp(a))), ((e = this.state) == null ? void 0 : e.status) !== "DIRECTED" && E.oneIn(10) && n.SLIGHT_RANDOMLY(this), r ? this.state.behind = E.OPPOSITES[a] : n.SLIGHT_RANDOMLY(this), r;
    }
    return !1;
  }
};
m.CREATE = m.CREATOR({ name: "SWAPWORM", symbol: "SWP", class: m, color: 12457071, classifications: ["DIRECTIONAL", "DIRECTABLE", "WORM"], groups: ["Life"] }), m.SMOLSW = m.CREATOR({ name: "SMOLSW", symbol: "SWP", class: m, color: 12457071, classifications: ["SWAPWORM", "DIRECTIONAL", "DIRECTABLE", "WORM"], groups: ["Life"] }, { growCount: 2 }), m.BIGSW = m.CREATOR({ name: "BIGSW", symbol: "SWP", class: m, color: 12457071, classifications: ["SWAPWORM", "DIRECTIONAL", "DIRECTABLE", "WORM"], groups: ["Life"] }, { growCount: 24 });
let gt = m;
const v = class v extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
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
        t.mutate(2, v.BUILDER), t.mutate(3, v.BUILDER), this.state.status = "BUILT";
        break;
      case "BUILT":
        if (t.is(1, "SWAPWORM")) {
          const s = t.getSite(1).atom;
          s.state.heading = "E", s.state.status = "DIRECTED";
        }
        if (t.is(2, "WORM TRAP WALL"))
          return;
        if (t.is(2, "WALL"))
          t.swap(4);
        else {
          t.mutateMany([2, 3], D.CREATE), this.state.status = "DONE";
          return;
        }
        break;
    }
    t.selfIs("DECAYABLE") && w.DECAY(t, this, this.state.lifeSpan ?? 100, 2);
  }
  captureWorm(t) {
    const s = t.filter([1, 5, 6, 9], "SWAPWORM");
    if (s.length > 0) {
      const e = t.getSite(E.RANDOM(s)).atom, a = t.filter([, 2, 3, 10, 11, 15, 16, 13, 14, 21, 25, 26, 29, 30, 37], "EMPTY");
      return t.mutateMany(a, D.CREATE), e.state.status = "DIRECTED", this.state.status = "HOLDING", !0;
    }
    return !1;
  }
};
v.CREATE = v.CREATOR({ name: "WORMTRAP", class: v, color: 8930542, groups: ["Structural"] }), v.BUILDER = M.CREATOR(
  { name: "WORM TRAP WALL", class: M, color: 1184018, groups: ["Misc"] },
  { buildPath: [4], totalSteps: 5, atomizer: D.CREATE, transitionAge: 1 }
);
let Ct = v;
const b = class b extends l {
  constructor(t, s = {}) {
    super(t, s), this.init();
  }
  init() {
    this.state.homeostasis = 5, this.state.inactivityCounter = 0;
  }
  behave(t) {
    super.behave(t), this.state.hasData || this.state.hadData ? this.state.inactivityCounter = 0 : this.state.inactivityCounter++;
    const s = t.filterByType([...E.LAYER1, ...E.ADJACENT8WAY], "MESHNET"), e = t.filterByType(E.ALLADJACENT, "MESHNET");
    if (e.length > 1)
      this.state.color = 65280;
    else {
      this.state.color = 15606289, b.ATTRACT(t, this) || t.swap(t.random(E.ALLADJACENT));
      return;
    }
    if (e.length === 0) {
      b.ATTRACT(t, this) || t.swap(t.random(E.ALLADJACENT));
      return;
    }
    if (s.length > 0) {
      b.AVOID(t, this);
      return;
    }
    const a = t.filterByType(E.ADJACENT8WAY, "RES");
    if (a.length > 0) {
      t.destroy(a[0]), this.state.hasData = !0, this.state.hadData = !0;
      return;
    }
    if (this.state.hasData) {
      if (this.state.color = 16759603, e.length > 0) {
        const r = t.getSite(E.RANDOM(e)).atom;
        r.state.hasData || (this.state.hasData = !1, this.state.hadData = !0, r.state.hasData = !0);
      }
      return;
    }
    this.state.hadData && !this.state.hasData && (this.state.color = 0), this.state.inactivityCounter > 1e3 && (this.state.inactivityCounter = 0, t.swap(t.random(E.ALLADJACENT)));
  }
};
b.CREATE = b.CREATOR({ name: "MESHNET", symbol: "MNT", class: b, color: 15606289, groups: ["MFM"] }), b.ATTRACT = P.MAKE_ATTRACTOR(["MESHNET"], E.ALLADJACENT), b.AVOID = P.MAKE_AVOIDER(["MESHNET"], [...E.LAYER1, ...E.LAYER2, ...E.LAYER3], [...E.LAYER4, ...E.LAYER4, ...E.LAYER4]);
let ft = b;
export {
  et as AntiForkBomb,
  lt as Bein,
  M as Builder,
  ot as DReg,
  Lt as DirectionalDirector,
  q as Director,
  It as DirectorWall,
  l as Element,
  st as ElementRegistry,
  d as Empty,
  E as EventWindow,
  rt as ForkBomb,
  Nt as Goop,
  Ot as HardCell3,
  nt as LivingWall,
  Tt as Looper,
  ft as MeshNet,
  it as Res,
  ct as Sand,
  Dt as Sentry,
  pt as Site,
  Z as Swamp,
  at as SwampWorker,
  ut as Swampling,
  At as SwapLine,
  gt as SwapWorm,
  mt as Tile,
  D as Wall,
  St as Wanderer,
  Rt as Water,
  Ct as WormTrap
};
