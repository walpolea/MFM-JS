import { D as ft, u as K, a as dt, c as T, i as mt, k as ht, n as X, w as pt } from "./main-Dh78mr3i.mjs";
const $ = /* @__PURE__ */ Object.create(null), q = /* @__PURE__ */ Object.create(null);
function V(o, t) {
  let e = q[o];
  return e === void 0 && ($[t] === void 0 && ($[t] = 1), q[o] = e = $[t]++), e;
}
let y;
function gt() {
  return (!y || y != null && y.isContextLost()) && (y = ft.get().createCanvas().getContext("webgl", {})), y;
}
let S;
function xt() {
  if (!S) {
    S = "mediump";
    const o = gt();
    o && o.getShaderPrecisionFormat && (S = o.getShaderPrecisionFormat(o.FRAGMENT_SHADER, o.HIGH_FLOAT).precision ? "highp" : "mediump");
  }
  return S;
}
function vt(o, t, e) {
  return t ? o : e ? (o = o.replace("out vec4 finalColor;", ""), `
        
        #ifdef GL_ES // This checks if it's WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${o}
        `) : `
        
        #ifdef GL_ES // This checks if it's WebGL1
        #define in attribute
        #define out varying
        #endif
        ${o}
        `;
}
function bt(o, t, e) {
  const r = e ? t.maxSupportedFragmentPrecision : t.maxSupportedVertexPrecision;
  if (o.substring(0, 9) !== "precision") {
    let n = e ? t.requestedFragmentPrecision : t.requestedVertexPrecision;
    return n === "highp" && r !== "highp" && (n = "mediump"), `precision ${n} float;
${o}`;
  } else if (r !== "highp" && o.substring(0, 15) === "precision highp")
    return o.replace("precision highp", "precision mediump");
  return o;
}
function Pt(o, t) {
  return t ? `#version 300 es
${o}` : o;
}
const yt = {}, _t = {};
function Gt(o, { name: t = "pixi-program" }, e = !0) {
  t = t.replace(/\s+/g, "-"), t += e ? "-fragment" : "-vertex";
  const r = e ? yt : _t;
  return r[t] ? (r[t]++, t += `-${r[t]}`) : r[t] = 1, o.indexOf("#define SHADER_NAME") !== -1 ? o : `${`#define SHADER_NAME ${t}`}
${o}`;
}
function Mt(o, t) {
  return t ? o.replace("#version 300 es", "") : o;
}
const U = {
  // strips any version headers..
  stripVersion: Mt,
  // adds precision string if not already present
  ensurePrecision: bt,
  // add some defines if WebGL1 to make it more compatible with WebGL2 shaders
  addProgramDefines: vt,
  // add the program name to the shader
  setProgramName: Gt,
  // add the version string to the shader header
  insertVersion: Pt
}, A = /* @__PURE__ */ Object.create(null), ot = class N {
  /**
   * Creates a shiny new GlProgram. Used by WebGL renderer.
   * @param options - The options for the program.
   */
  constructor(t) {
    t = { ...N.defaultOptions, ...t };
    const e = t.fragment.indexOf("#version 300 es") !== -1, r = {
      stripVersion: e,
      ensurePrecision: {
        requestedFragmentPrecision: t.preferredFragmentPrecision,
        requestedVertexPrecision: t.preferredVertexPrecision,
        maxSupportedVertexPrecision: "highp",
        maxSupportedFragmentPrecision: xt()
      },
      setProgramName: {
        name: t.name
      },
      addProgramDefines: e,
      insertVersion: e
    };
    let n = t.fragment, s = t.vertex;
    Object.keys(U).forEach((a) => {
      const i = r[a];
      n = U[a](n, i, !0), s = U[a](s, i, !1);
    }), this.fragment = n, this.vertex = s, this._key = V(`${this.vertex}:${this.fragment}`, "gl-program");
  }
  /** destroys the program */
  destroy() {
    this.fragment = null, this.vertex = null, this._attributeData = null, this._uniformData = null, this._uniformBlockData = null, this.transformFeedbackVaryings = null;
  }
  /**
   * Helper function that creates a program for a given source.
   * It will check the program cache if the program has already been created.
   * If it has that one will be returned, if not a new one will be created and cached.
   * @param options - The options for the program.
   * @returns A program using the same source
   */
  static from(t) {
    const e = `${t.vertex}:${t.fragment}`;
    return A[e] || (A[e] = new N(t)), A[e];
  }
};
ot.defaultOptions = {
  preferredVertexPrecision: "highp",
  preferredFragmentPrecision: "mediump"
};
let nt = ot;
const Y = {
  uint8x2: { size: 2, stride: 2, normalised: !1 },
  uint8x4: { size: 4, stride: 4, normalised: !1 },
  sint8x2: { size: 2, stride: 2, normalised: !1 },
  sint8x4: { size: 4, stride: 4, normalised: !1 },
  unorm8x2: { size: 2, stride: 2, normalised: !0 },
  unorm8x4: { size: 4, stride: 4, normalised: !0 },
  snorm8x2: { size: 2, stride: 2, normalised: !0 },
  snorm8x4: { size: 4, stride: 4, normalised: !0 },
  uint16x2: { size: 2, stride: 4, normalised: !1 },
  uint16x4: { size: 4, stride: 8, normalised: !1 },
  sint16x2: { size: 2, stride: 4, normalised: !1 },
  sint16x4: { size: 4, stride: 8, normalised: !1 },
  unorm16x2: { size: 2, stride: 4, normalised: !0 },
  unorm16x4: { size: 4, stride: 8, normalised: !0 },
  snorm16x2: { size: 2, stride: 4, normalised: !0 },
  snorm16x4: { size: 4, stride: 8, normalised: !0 },
  float16x2: { size: 2, stride: 4, normalised: !1 },
  float16x4: { size: 4, stride: 8, normalised: !1 },
  float32: { size: 1, stride: 4, normalised: !1 },
  float32x2: { size: 2, stride: 8, normalised: !1 },
  float32x3: { size: 3, stride: 12, normalised: !1 },
  float32x4: { size: 4, stride: 16, normalised: !1 },
  uint32: { size: 1, stride: 4, normalised: !1 },
  uint32x2: { size: 2, stride: 8, normalised: !1 },
  uint32x3: { size: 3, stride: 12, normalised: !1 },
  uint32x4: { size: 4, stride: 16, normalised: !1 },
  sint32: { size: 1, stride: 4, normalised: !1 },
  sint32x2: { size: 2, stride: 8, normalised: !1 },
  sint32x3: { size: 3, stride: 12, normalised: !1 },
  sint32x4: { size: 4, stride: 16, normalised: !1 }
};
function St(o) {
  return Y[o] ?? Y.float32;
}
const Ct = {
  f32: "float32",
  "vec2<f32>": "float32x2",
  "vec3<f32>": "float32x3",
  "vec4<f32>": "float32x4",
  vec2f: "float32x2",
  vec3f: "float32x3",
  vec4f: "float32x4",
  i32: "sint32",
  "vec2<i32>": "sint32x2",
  "vec3<i32>": "sint32x3",
  "vec4<i32>": "sint32x4",
  u32: "uint32",
  "vec2<u32>": "uint32x2",
  "vec3<u32>": "uint32x3",
  "vec4<u32>": "uint32x4",
  bool: "uint32",
  "vec2<bool>": "uint32x2",
  "vec3<bool>": "uint32x3",
  "vec4<bool>": "uint32x4"
};
function Tt({ source: o, entryPoint: t }) {
  const e = {}, r = o.indexOf(`fn ${t}`);
  if (r !== -1) {
    const n = o.indexOf("->", r);
    if (n !== -1) {
      const s = o.substring(r, n), a = /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;
      let i;
      for (; (i = a.exec(s)) !== null; ) {
        const u = Ct[i[3]] ?? "float32";
        e[i[2]] = {
          location: parseInt(i[1], 10),
          format: u,
          stride: St(u).stride,
          offset: 0,
          instance: !1,
          start: 0
        };
      }
    }
  }
  return e;
}
function w(o) {
  var f, m;
  const t = /(^|[^/])@(group|binding)\(\d+\)[^;]+;/g, e = /@group\((\d+)\)/, r = /@binding\((\d+)\)/, n = /var(<[^>]+>)? (\w+)/, s = /:\s*(\w+)/, a = /struct\s+(\w+)\s*{([^}]+)}/g, i = /(\w+)\s*:\s*([\w\<\>]+)/g, u = /struct\s+(\w+)/, l = (f = o.match(t)) == null ? void 0 : f.map((d) => ({
    group: parseInt(d.match(e)[1], 10),
    binding: parseInt(d.match(r)[1], 10),
    name: d.match(n)[2],
    isUniform: d.match(n)[1] === "<uniform>",
    type: d.match(s)[1]
  }));
  if (!l)
    return {
      groups: [],
      structs: []
    };
  const c = ((m = o.match(a)) == null ? void 0 : m.map((d) => {
    const p = d.match(u)[1], x = d.match(i).reduce((v, b) => {
      const [P, h] = b.split(":");
      return v[P.trim()] = h.trim(), v;
    }, {});
    return x ? { name: p, members: x } : null;
  }).filter(({ name: d }) => l.some((p) => p.type === d))) ?? [];
  return {
    groups: l,
    structs: c
  };
}
var _ = /* @__PURE__ */ ((o) => (o[o.VERTEX = 1] = "VERTEX", o[o.FRAGMENT = 2] = "FRAGMENT", o[o.COMPUTE = 4] = "COMPUTE", o))(_ || {});
function $t({ groups: o }) {
  const t = [];
  for (let e = 0; e < o.length; e++) {
    const r = o[e];
    t[r.group] || (t[r.group] = []), r.isUniform ? t[r.group].push({
      binding: r.binding,
      visibility: _.VERTEX | _.FRAGMENT,
      buffer: {
        type: "uniform"
      }
    }) : r.type === "sampler" ? t[r.group].push({
      binding: r.binding,
      visibility: _.FRAGMENT,
      sampler: {
        type: "filtering"
      }
    }) : r.type === "texture_2d" && t[r.group].push({
      binding: r.binding,
      visibility: _.FRAGMENT,
      texture: {
        sampleType: "float",
        viewDimension: "2d",
        multisampled: !1
      }
    });
  }
  return t;
}
function Ut({ groups: o }) {
  const t = [];
  for (let e = 0; e < o.length; e++) {
    const r = o[e];
    t[r.group] || (t[r.group] = {}), t[r.group][r.name] = r.binding;
  }
  return t;
}
function At(o, t) {
  const e = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), n = [...o.structs, ...t.structs].filter((a) => e.has(a.name) ? !1 : (e.add(a.name), !0)), s = [...o.groups, ...t.groups].filter((a) => {
    const i = `${a.name}-${a.binding}`;
    return r.has(i) ? !1 : (r.add(i), !0);
  });
  return { structs: n, groups: s };
}
const E = /* @__PURE__ */ Object.create(null);
class C {
  /**
   * Create a new GpuProgram
   * @param options - The options for the gpu program
   */
  constructor(t) {
    var i, u;
    this._layoutKey = 0;
    const { fragment: e, vertex: r, layout: n, gpuLayout: s, name: a } = t;
    if (this.name = a, this.fragment = e, this.vertex = r, e.source === r.source) {
      const l = w(e.source);
      this.structsAndGroups = l;
    } else {
      const l = w(r.source), c = w(e.source);
      this.structsAndGroups = At(l, c);
    }
    this.layout = n ?? Ut(this.structsAndGroups), this.gpuLayout = s ?? $t(this.structsAndGroups), this.autoAssignGlobalUniforms = ((i = this.layout[0]) == null ? void 0 : i.globalUniforms) !== void 0, this.autoAssignLocalUniforms = ((u = this.layout[1]) == null ? void 0 : u.localUniforms) !== void 0, this._generateProgramKey();
  }
  // TODO maker this pure
  _generateProgramKey() {
    const { vertex: t, fragment: e } = this, r = t.source + e.source + t.entryPoint + e.entryPoint;
    this._layoutKey = V(r, "program");
  }
  get attributeData() {
    return this._attributeData ?? (this._attributeData = Tt(this.vertex)), this._attributeData;
  }
  /** destroys the program */
  destroy() {
    this.gpuLayout = null, this.layout = null, this.structsAndGroups = null, this.fragment = null, this.vertex = null;
  }
  /**
   * Helper function that creates a program for a given source.
   * It will check the program cache if the program has already been created.
   * If it has that one will be returned, if not a new one will be created and cached.
   * @param options - The options for the program.
   * @returns A program using the same source
   */
  static from(t) {
    const e = `${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;
    return E[e] || (E[e] = new C(t)), E[e];
  }
}
function wt(o, t) {
  switch (o) {
    case "f32":
      return 0;
    case "vec2<f32>":
      return new Float32Array(2 * t);
    case "vec3<f32>":
      return new Float32Array(3 * t);
    case "vec4<f32>":
      return new Float32Array(4 * t);
    case "mat2x2<f32>":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3x3<f32>":
      return new Float32Array([
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]);
    case "mat4x4<f32>":
      return new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]);
  }
  return null;
}
const st = class it {
  /**
   * Create a new Uniform group
   * @param uniformStructures - The structures of the uniform group
   * @param options - The optional parameters of this uniform group
   */
  constructor(t, e) {
    this._touched = 0, this.uid = K("uniform"), this._resourceType = "uniformGroup", this._resourceId = K("resource"), this.isUniformGroup = !0, this._dirtyId = 0, e = { ...it.defaultOptions, ...e }, this.uniformStructures = t;
    const r = {};
    for (const n in t) {
      const s = t[n];
      s.name = n, s.size = s.size ?? 1, s.value ?? (s.value = wt(s.type, s.size)), r[n] = s.value;
    }
    this.uniforms = r, this._dirtyId = 1, this.ubo = e.ubo, this.isStatic = e.isStatic, this._signature = V(Object.keys(r).map(
      (n) => `${n}-${t[n].type}`
    ).join("-"), "uniform-group");
  }
  /** Call this if you want the uniform groups data to be uploaded to the GPU only useful if `isStatic` is true. */
  update() {
    this._dirtyId++;
  }
};
st.defaultOptions = {
  /** if true the UniformGroup is handled as an Uniform buffer object. */
  ubo: !1,
  /** if true, then you are responsible for when the data is uploaded to the GPU by calling `update()` */
  isStatic: !1
};
let Et = st;
var H = /* @__PURE__ */ ((o) => (o[o.WEBGL = 1] = "WEBGL", o[o.WEBGPU = 2] = "WEBGPU", o[o.BOTH = 3] = "BOTH", o))(H || {});
class at extends dt {
  constructor(t) {
    super(), this._uniformBindMap = /* @__PURE__ */ Object.create(null), this._ownedBindGroups = [];
    let {
      gpuProgram: e,
      glProgram: r,
      groups: n,
      resources: s,
      compatibleRenderers: a,
      groupMap: i
    } = t;
    this.gpuProgram = e, this.glProgram = r, a === void 0 && (a = 0, e && (a |= H.WEBGPU), r && (a |= H.WEBGL)), this.compatibleRenderers = a;
    const u = {};
    if (!s && !n && (s = {}), s && n)
      throw new Error("[Shader] Cannot have both resources and groups");
    if (!e && n && !i)
      throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");
    if (!e && n && i)
      for (const l in i)
        for (const c in i[l]) {
          const f = i[l][c];
          u[f] = {
            group: l,
            binding: c,
            name: f
          };
        }
    else if (e && n && !i) {
      const l = e.structsAndGroups.groups;
      i = {}, l.forEach((c) => {
        i[c.group] = i[c.group] || {}, i[c.group][c.binding] = c.name, u[c.name] = c;
      });
    } else if (s) {
      if (e) {
        const l = e.structsAndGroups.groups;
        i = {}, l.forEach((c) => {
          i[c.group] = i[c.group] || {}, i[c.group][c.binding] = c.name, u[c.name] = c;
        });
      } else {
        i = {}, n = {
          99: new T()
        }, this._ownedBindGroups.push(n[99]);
        let l = 0;
        for (const c in s)
          u[c] = { group: 99, binding: l, name: c }, i[99] = i[99] || {}, i[99][l] = c, l++;
      }
      n = {};
      for (const l in s) {
        const c = l;
        let f = s[l];
        !f.source && !f._resourceType && (f = new Et(f));
        const m = u[c];
        m && (n[m.group] || (n[m.group] = new T(), this._ownedBindGroups.push(n[m.group])), n[m.group].setResource(f, m.binding));
      }
    }
    this.groups = n, this._uniformBindMap = i, this.resources = this._buildResourceAccessor(n, u);
  }
  /**
   * Sometimes a resource group will be provided later (for example global uniforms)
   * In such cases, this method can be used to let the shader know about the group.
   * @param name - the name of the resource group
   * @param groupIndex - the index of the group (should match the webGPU shader group location)
   * @param bindIndex - the index of the bind point (should match the webGPU shader bind point)
   */
  addResource(t, e, r) {
    var n, s;
    (n = this._uniformBindMap)[e] || (n[e] = {}), (s = this._uniformBindMap[e])[r] || (s[r] = t), this.groups[e] || (this.groups[e] = new T(), this._ownedBindGroups.push(this.groups[e]));
  }
  _buildResourceAccessor(t, e) {
    const r = {};
    for (const n in e) {
      const s = e[n];
      Object.defineProperty(r, s.name, {
        get() {
          return t[s.group].getResource(s.binding);
        },
        set(a) {
          t[s.group].setResource(a, s.binding);
        }
      });
    }
    return r;
  }
  /**
   * Use to destroy the shader when its not longer needed.
   * It will destroy the resources and remove listeners.
   * @param destroyPrograms - if the programs should be destroyed as well.
   * Make sure its not being used by other shaders!
   */
  destroy(t = !1) {
    var e, r;
    this.emit("destroy", this), t && ((e = this.gpuProgram) == null || e.destroy(), (r = this.glProgram) == null || r.destroy()), this.gpuProgram = null, this.glProgram = null, this.removeAllListeners(), this._uniformBindMap = null, this._ownedBindGroups.forEach((n) => {
      n.destroy();
    }), this._ownedBindGroups = null, this.resources = null, this.groups = null;
  }
  static from(t) {
    const { gpu: e, gl: r, ...n } = t;
    let s, a;
    return e && (s = C.from(e)), r && (a = nt.from(r)), new at({
      gpuProgram: s,
      glProgram: a,
      ...n
    });
  }
}
const Ft = {
  normal: 0,
  add: 1,
  multiply: 2,
  screen: 3,
  overlay: 4,
  erase: 5,
  "normal-npm": 6,
  "add-npm": 7,
  "screen-npm": 8
}, F = 0, z = 1, O = 2, B = 3, R = 4, j = 5, W = class ut {
  constructor() {
    this.data = 0, this.blendMode = "normal", this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
  }
  /**
   * Activates blending of the computed fragment color values.
   * @default true
   */
  get blend() {
    return !!(this.data & 1 << F);
  }
  set blend(t) {
    !!(this.data & 1 << F) !== t && (this.data ^= 1 << F);
  }
  /**
   * Activates adding an offset to depth values of polygon's fragments
   * @default false
   */
  get offsets() {
    return !!(this.data & 1 << z);
  }
  set offsets(t) {
    !!(this.data & 1 << z) !== t && (this.data ^= 1 << z);
  }
  /** The culling settings for this state none - No culling back - Back face culling front - Front face culling */
  set cullMode(t) {
    if (t === "none") {
      this.culling = !1;
      return;
    }
    this.culling = !0, this.clockwiseFrontFace = t === "front";
  }
  get cullMode() {
    return this.culling ? this.clockwiseFrontFace ? "front" : "back" : "none";
  }
  /**
   * Activates culling of polygons.
   * @default false
   */
  get culling() {
    return !!(this.data & 1 << O);
  }
  set culling(t) {
    !!(this.data & 1 << O) !== t && (this.data ^= 1 << O);
  }
  /**
   * Activates depth comparisons and updates to the depth buffer.
   * @default false
   */
  get depthTest() {
    return !!(this.data & 1 << B);
  }
  set depthTest(t) {
    !!(this.data & 1 << B) !== t && (this.data ^= 1 << B);
  }
  /**
   * Enables or disables writing to the depth buffer.
   * @default true
   */
  get depthMask() {
    return !!(this.data & 1 << j);
  }
  set depthMask(t) {
    !!(this.data & 1 << j) !== t && (this.data ^= 1 << j);
  }
  /**
   * Specifies whether or not front or back-facing polygons can be culled.
   * @default false
   */
  get clockwiseFrontFace() {
    return !!(this.data & 1 << R);
  }
  set clockwiseFrontFace(t) {
    !!(this.data & 1 << R) !== t && (this.data ^= 1 << R);
  }
  /**
   * The blend mode to be applied when this state is set. Apply a value of `normal` to reset the blend mode.
   * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
   * @default 'normal'
   */
  get blendMode() {
    return this._blendMode;
  }
  set blendMode(t) {
    this.blend = t !== "none", this._blendMode = t, this._blendModeId = Ft[t] || 0;
  }
  /**
   * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
   * @default 0
   */
  get polygonOffset() {
    return this._polygonOffset;
  }
  set polygonOffset(t) {
    this.offsets = !!t, this._polygonOffset = t;
  }
  toString() {
    return `[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
  }
  /**
   * A quickly getting an instance of a State that is configured for 2d rendering.
   * @returns a new State with values set for 2d rendering
   */
  static for2d() {
    const t = new ut();
    return t.depthTest = !1, t.blend = !0, t;
  }
};
W.default2d = W.for2d();
let te = W, zt = 0;
class Ot {
  /**
   * @param textureOptions - options that will be passed to BaseRenderTexture constructor
   * @param {SCALE_MODE} [textureOptions.scaleMode] - See {@link SCALE_MODE} for possible values.
   */
  constructor(t) {
    this._poolKeyHash = /* @__PURE__ */ Object.create(null), this._texturePool = {}, this.textureOptions = t || {}, this.enableFullScreen = !1;
  }
  /**
   * Creates texture with params that were specified in pool constructor.
   * @param pixelWidth - Width of texture in pixels.
   * @param pixelHeight - Height of texture in pixels.
   * @param antialias
   */
  createTexture(t, e, r) {
    const n = new mt({
      ...this.textureOptions,
      width: t,
      height: e,
      resolution: 1,
      antialias: r,
      autoGarbageCollect: !0
    });
    return new ht({
      source: n,
      label: `texturePool_${zt++}`
    });
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param frameWidth - The minimum width of the render texture.
   * @param frameHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @param antialias
   * @returns The new render texture.
   */
  getOptimalTexture(t, e, r = 1, n) {
    let s = Math.ceil(t * r - 1e-6), a = Math.ceil(e * r - 1e-6);
    s = X(s), a = X(a);
    const i = (s << 17) + (a << 1) + (n ? 1 : 0);
    this._texturePool[i] || (this._texturePool[i] = []);
    let u = this._texturePool[i].pop();
    return u || (u = this.createTexture(s, a, n)), u.source._resolution = r, u.source.width = s / r, u.source.height = a / r, u.source.pixelWidth = s, u.source.pixelHeight = a, u.frame.x = 0, u.frame.y = 0, u.frame.width = t, u.frame.height = e, u.updateUvs(), this._poolKeyHash[u.uid] = i, u;
  }
  /**
   * Gets extra texture of the same size as input renderTexture
   * @param texture - The texture to check what size it is.
   * @param antialias - Whether to use antialias.
   * @returns A texture that is a power of two
   */
  getSameSizeTexture(t, e = !1) {
    const r = t.source;
    return this.getOptimalTexture(t.width, t.height, r._resolution, e);
  }
  /**
   * Place a render texture back into the pool.
   * @param renderTexture - The renderTexture to free
   */
  returnTexture(t) {
    const e = this._poolKeyHash[t.uid];
    this._texturePool[e].push(t);
  }
  /**
   * Clears the pool.
   * @param destroyTextures - Destroy all stored textures.
   */
  clear(t) {
    if (t = t !== !1, t)
      for (const e in this._texturePool) {
        const r = this._texturePool[e];
        if (r)
          for (let n = 0; n < r.length; n++)
            r[n].destroy(!0);
      }
    this._texturePool = {};
  }
}
const ee = new Ot();
function Z(o, t, e) {
  if (o)
    for (const r in o) {
      const n = r.toLocaleLowerCase(), s = t[n];
      if (s) {
        let a = o[r];
        r === "header" && (a = a.replace(/@in\s+[^;]+;\s*/g, "").replace(/@out\s+[^;]+;\s*/g, "")), e && s.push(`//----${e}----//`), s.push(a);
      } else
        pt(`${r} placement hook does not exist in shader`);
    }
}
const Bt = /\{\{(.*?)\}\}/g;
function J(o) {
  var r;
  const t = {};
  return (((r = o.match(Bt)) == null ? void 0 : r.map((n) => n.replace(/[{()}]/g, ""))) ?? []).forEach((n) => {
    t[n] = [];
  }), t;
}
function Q(o, t) {
  let e;
  const r = /@in\s+([^;]+);/g;
  for (; (e = r.exec(o)) !== null; )
    t.push(e[1]);
}
function tt(o, t, e = !1) {
  const r = [];
  Q(t, r), o.forEach((i) => {
    i.header && Q(i.header, r);
  });
  const n = r;
  e && n.sort();
  const s = n.map((i, u) => `       @location(${u}) ${i},`).join(`
`);
  let a = t.replace(/@in\s+[^;]+;\s*/g, "");
  return a = a.replace("{{in}}", `
${s}
`), a;
}
function et(o, t) {
  let e;
  const r = /@out\s+([^;]+);/g;
  for (; (e = r.exec(o)) !== null; )
    t.push(e[1]);
}
function Rt(o) {
  const e = /\b(\w+)\s*:/g.exec(o);
  return e ? e[1] : "";
}
function jt(o) {
  const t = /@.*?\s+/g;
  return o.replace(t, "");
}
function It(o, t) {
  const e = [];
  et(t, e), o.forEach((u) => {
    u.header && et(u.header, e);
  });
  let r = 0;
  const n = e.sort().map((u) => u.indexOf("builtin") > -1 ? u : `@location(${r++}) ${u}`).join(`,
`), s = e.sort().map((u) => `       var ${jt(u)};`).join(`
`), a = `return VSOutput(
                ${e.sort().map((u) => ` ${Rt(u)}`).join(`,
`)});`;
  let i = t.replace(/@out\s+[^;]+;\s*/g, "");
  return i = i.replace("{{struct}}", `
${n}
`), i = i.replace("{{start}}", `
${s}
`), i = i.replace("{{return}}", `
${a}
`), i;
}
function rt(o, t) {
  let e = o;
  for (const r in t) {
    const n = t[r];
    n.join(`
`).length ? e = e.replace(`{{${r}}}`, `//-----${r} START-----//
${n.join(`
`)}
//----${r} FINISH----//`) : e = e.replace(`{{${r}}}`, "");
  }
  return e;
}
const g = /* @__PURE__ */ Object.create(null), I = /* @__PURE__ */ new Map();
let Dt = 0;
function kt({
  template: o,
  bits: t
}) {
  const e = ct(o, t);
  if (g[e])
    return g[e];
  const { vertex: r, fragment: n } = Nt(o, t);
  return g[e] = lt(r, n, t), g[e];
}
function Lt({
  template: o,
  bits: t
}) {
  const e = ct(o, t);
  return g[e] || (g[e] = lt(o.vertex, o.fragment, t)), g[e];
}
function Nt(o, t) {
  const e = t.map((a) => a.vertex).filter((a) => !!a), r = t.map((a) => a.fragment).filter((a) => !!a);
  let n = tt(e, o.vertex, !0);
  n = It(e, n);
  const s = tt(r, o.fragment, !0);
  return {
    vertex: n,
    fragment: s
  };
}
function ct(o, t) {
  return t.map((e) => (I.has(e) || I.set(e, Dt++), I.get(e))).sort((e, r) => e - r).join("-") + o.vertex + o.fragment;
}
function lt(o, t, e) {
  const r = J(o), n = J(t);
  return e.forEach((s) => {
    Z(s.vertex, r, s.name), Z(s.fragment, n, s.name);
  }), {
    vertex: rt(o, r),
    fragment: rt(t, n)
  };
}
const Ht = (
  /* wgsl */
  `
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);
        vUV = aUV;

        {{main}}

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`
), Wt = (
  /* wgsl */
  `
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`
), Vt = (
  /* glsl */
  `
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;

        {{start}}
        
        vColor = vec4(1.);
        vUV = aUV;

        {{main}}

        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`
), Kt = (
  /* glsl */
  `
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`
), Xt = {
  name: "global-uniforms-bit",
  vertex: {
    header: (
      /* wgsl */
      `
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `
    )
  }
}, qt = {
  name: "global-uniforms-bit",
  vertex: {
    header: (
      /* glsl */
      `
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `
    )
  }
};
function re({ bits: o, name: t }) {
  const e = kt({
    template: {
      fragment: Wt,
      vertex: Ht
    },
    bits: [
      Xt,
      ...o
    ]
  });
  return C.from({
    name: t,
    vertex: {
      source: e.vertex,
      entryPoint: "main"
    },
    fragment: {
      source: e.fragment,
      entryPoint: "main"
    }
  });
}
function oe({ bits: o, name: t }) {
  return new nt({
    name: t,
    ...Lt({
      template: {
        vertex: Vt,
        fragment: Kt
      },
      bits: [
        qt,
        ...o
      ]
    })
  });
}
const ne = {
  name: "color-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            @in aColor: vec4<f32>;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `
    )
  }
}, se = {
  name: "color-bit",
  vertex: {
    header: (
      /* glsl */
      `
            in vec4 aColor;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `
    )
  }
}, D = {};
function Yt(o) {
  const t = [];
  if (o === 1)
    t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"), t.push("@group(1) @binding(1) var textureSampler1: sampler;");
  else {
    let e = 0;
    for (let r = 0; r < o; r++)
      t.push(`@group(1) @binding(${e++}) var textureSource${r + 1}: texture_2d<f32>;`), t.push(`@group(1) @binding(${e++}) var textureSampler${r + 1}: sampler;`);
  }
  return t.join(`
`);
}
function Zt(o) {
  const t = [];
  if (o === 1)
    t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");
  else {
    t.push("switch vTextureId {");
    for (let e = 0; e < o; e++)
      e === o - 1 ? t.push("  default:{") : t.push(`  case ${e}:{`), t.push(`      outColor = textureSampleGrad(textureSource${e + 1}, textureSampler${e + 1}, vUV, uvDx, uvDy);`), t.push("      break;}");
    t.push("}");
  }
  return t.join(`
`);
}
function ie(o) {
  return D[o] || (D[o] = {
    name: "texture-batch-bit",
    vertex: {
      header: `
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,
      main: `
                vTextureId = aTextureIdAndRound.y;
            `,
      end: `
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `
    },
    fragment: {
      header: `
                @in @interpolate(flat) vTextureId: u32;
    
                ${Yt(16)}
            `,
      main: `
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${Zt(16)}
            `
    }
  }), D[o];
}
const k = {};
function Jt(o) {
  const t = [];
  for (let e = 0; e < o; e++)
    e > 0 && t.push("else"), e < o - 1 && t.push(`if(vTextureId < ${e}.5)`), t.push("{"), t.push(`	outColor = texture(uTextures[${e}], vUV);`), t.push("}");
  return t.join(`
`);
}
function ae(o) {
  return k[o] || (k[o] = {
    name: "texture-batch-bit",
    vertex: {
      header: `
                in vec2 aTextureIdAndRound;
                out float vTextureId;
              
            `,
      main: `
                vTextureId = aTextureIdAndRound.y;
            `,
      end: `
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `
    },
    fragment: {
      header: `
                in float vTextureId;
    
                uniform sampler2D uTextures[${o}];
              
            `,
      main: `
    
                ${Jt(16)}
            `
    }
  }), k[o];
}
const ue = {
  name: "round-pixels-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `
    )
  }
}, ce = {
  name: "round-pixels-bit",
  vertex: {
    header: (
      /* glsl */
      `   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `
    )
  }
}, L = {
  name: "local-uniform-bit",
  vertex: {
    header: (
      /* wgsl */
      `

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
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
  }
}, le = {
  ...L,
  vertex: {
    ...L.vertex,
    // replace the group!
    header: L.vertex.header.replace("group(1)", "group(2)")
  }
}, fe = {
  name: "local-uniform-bit",
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
            modelMatrix = uTransformMatrix;
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
  }
};
class de {
  constructor() {
    this.vertexSize = 4, this.indexSize = 6, this.location = 0, this.batcher = null, this.batch = null, this.roundPixels = 0;
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  packAttributes(t, e, r, n) {
    const s = this.renderable, a = this.texture, i = s.groupTransform, u = i.a, l = i.b, c = i.c, f = i.d, m = i.tx, d = i.ty, p = this.bounds, x = p.maxX, v = p.minX, b = p.maxY, P = p.minY, h = a.uvs, G = s.groupColorAlpha, M = n << 16 | this.roundPixels & 65535;
    t[r + 0] = u * v + c * P + m, t[r + 1] = f * P + l * v + d, t[r + 2] = h.x0, t[r + 3] = h.y0, e[r + 4] = G, e[r + 5] = M, t[r + 6] = u * x + c * P + m, t[r + 7] = f * P + l * x + d, t[r + 8] = h.x1, t[r + 9] = h.y1, e[r + 10] = G, e[r + 11] = M, t[r + 12] = u * x + c * b + m, t[r + 13] = f * b + l * x + d, t[r + 14] = h.x2, t[r + 15] = h.y2, e[r + 16] = G, e[r + 17] = M, t[r + 18] = u * v + c * b + m, t[r + 19] = f * b + l * v + d, t[r + 20] = h.x3, t[r + 21] = h.y3, e[r + 22] = G, e[r + 23] = M;
  }
  packIndex(t, e, r) {
    t[e] = r + 0, t[e + 1] = r + 1, t[e + 2] = r + 2, t[e + 3] = r + 0, t[e + 4] = r + 2, t[e + 5] = r + 3;
  }
  reset() {
    this.renderable = null, this.texture = null, this.batcher = null, this.batch = null, this.bounds = null;
  }
}
function me(o, t, e) {
  const r = (o >> 24 & 255) / 255;
  t[e++] = (o & 255) / 255 * r, t[e++] = (o >> 8 & 255) / 255 * r, t[e++] = (o >> 16 & 255) / 255 * r, t[e++] = r;
}
export {
  de as B,
  C as G,
  H as R,
  te as S,
  ee as T,
  Et as U,
  ne as a,
  at as b,
  re as c,
  V as d,
  L as e,
  nt as f,
  ie as g,
  St as h,
  me as i,
  oe as j,
  se as k,
  le as l,
  ae as m,
  ce as n,
  fe as o,
  ue as r
};
