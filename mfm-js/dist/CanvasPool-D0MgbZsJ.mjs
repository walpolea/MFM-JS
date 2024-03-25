import { D as c, n } from "./main-Dh78mr3i.mjs";
class l {
  constructor(a) {
    this._canvasPool = /* @__PURE__ */ Object.create(null), this.canvasOptions = a || {}, this.enableFullScreen = !1;
  }
  /**
   * Creates texture with params that were specified in pool constructor.
   * @param pixelWidth - Width of texture in pixels.
   * @param pixelHeight - Height of texture in pixels.
   */
  _createCanvasAndContext(a, t) {
    const s = c.get().createCanvas();
    s.width = a, s.height = t;
    const e = s.getContext("2d");
    return { canvas: s, context: e };
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture.
   * @param minHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @returns The new render texture.
   */
  getOptimalCanvasAndContext(a, t, s = 1) {
    a = Math.ceil(a * s - 1e-6), t = Math.ceil(t * s - 1e-6), a = n(a), t = n(t);
    const e = (a << 17) + (t << 1);
    this._canvasPool[e] || (this._canvasPool[e] = []);
    let o = this._canvasPool[e].pop();
    return o || (o = this._createCanvasAndContext(a, t)), o;
  }
  /**
   * Place a render texture back into the pool.
   * @param canvasAndContext
   */
  returnCanvasAndContext(a) {
    const { width: t, height: s } = a.canvas, e = (t << 17) + (s << 1);
    this._canvasPool[e].push(a);
  }
  clear() {
    this._canvasPool = {};
  }
}
const C = new l();
export {
  C
};
