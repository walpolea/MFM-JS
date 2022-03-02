const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outfile: "lib/mfm.js",
    bundle: true,
    minify: true,
    format: "esm",
    platform: "browser",
    sourcemap: true,
    target: "es2020",
    plugins: [],
  })
  .catch(() => process.exit(1));
