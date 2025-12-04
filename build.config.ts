import { defineBuildConfig } from "unbuild";

/**
 * ビルド設定
 */
export default defineBuildConfig([
  {
    // 通常ビルド設定
    entries: ["./src/index"],
    outDir: "dist",
    declaration: true,
    clean: true,
  },
  {
    // ミニファイドビルド設定
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
