import { defineBuildConfig } from "unbuild";

export default defineBuildConfig([
  {
    entries: ["./src/index"],
    outDir: "dist",
    declaration: true,
    clean: true,
  },
  {
    name: "minified",
    entries: ["./src/index"],
    outDir: "dist",
    rollup: {
      esbuild: {
        minify: true,
      },
    },
  },
]);
