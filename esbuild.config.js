const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outfile: "public/lib/mfm.js",
    bundle: true,
    minify: true,
    format: "esm",
    platform: "browser",
    sourcemap: true,
    target: "es2020",
    plugins: [],
    loader: { ".png": "dataurl" },
  })
  .catch(() => process.exit(1));
