import { M as e } from "./main-DGnPO_fL.mjs";
import { U as o } from "./colorToUniform-D500sCgv.mjs";
const t = new Int32Array(e);
for (let r = 0; r < e; r++)
  t[r] = r;
const i = new o({
  uTextures: { value: t, type: "i32", size: e }
}, { isStatic: !0 });
export {
  i as b
};
