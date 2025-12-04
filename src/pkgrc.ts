import { loadPackageJsonFromDir } from "./load-pkg-json";

// `package.json`を読み込む
const pkgJson = loadPackageJsonFromDir();

export interface Pkgrc {
  // パッケージ名
  name: string;
  // バージョン
  version: string;
  // 設定ファイル情報
  configFile: {
    // 設定ファイル名のリスト
    name: string[];
  };
}

export const pkgrc: Pkgrc = {
  name: pkgJson.name,
  version: pkgJson.version || "0.0.0",
  configFile: {
    name: [
      ".mpactrc",
      "mpact.config.ts",
      "mpact.config.js",
      "mpact.config.mjs",
      "mpact.config.json",
    ],
  },
};
