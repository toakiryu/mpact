import { globSync } from "glob";
import { defineBuildConfig } from "unbuild";

/**
 * ビルド設定
 */
export default defineBuildConfig([
  {
    // ミニファイドビルド設定
    name: "minified",
    entries: ["./src/index"],
    outDir: "dist",
    declaration: "node16",
    clean: true,
    failOnWarn: false,
    rollup: {
      esbuild: {
        minify: true,
      },
    },
  },
  {
    // ミニファイドビルド設定
    name: "minified",
    entries: globSync(["src/interface/*.ts"]),
    outDir: "dist",
    declaration: "node16",
    failOnWarn: false,
    rollup: {
      esbuild: {
        minify: true,
      },
    },
  },
]);
