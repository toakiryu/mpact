import { loadPackageJsonFromDir } from "./load-pkg-json";
import { type Pkgrc } from "./types/pkg";

// `package.json`を読み込む
const pkgJson = loadPackageJsonFromDir();

export const pkgrc: Pkgrc = {
  name: pkgJson.name,
  version: pkgJson.version || "0.0.0",
  configFile: {
    config: {
      lang: "en",
    },
    name: [
      ".mpactrc",
      "mpact.config.ts",
      "mpact.config.js",
      "mpact.config.mjs",
      "mpact.config.cjs",
      "mpact.config.json",
    ],
  },
};
