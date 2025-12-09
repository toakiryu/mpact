import type { Mpactrc } from "./types/self";
import helper from "./utils/helper";

// `package.json`を読み込む
const pkgJson = helper.self.pkg.load();

export const mpactrc: Mpactrc = {
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
