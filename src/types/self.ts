import { DefineConfig } from "../utils/defineConfig";

export interface Mpactrc {
  // パッケージ名
  name: string;
  // バージョン
  version: string;
  // 設定ファイル情報
  configFile: {
    // デフォルトの設定オブジェクト
    config?: DefineConfig;
    // 設定ファイル名のリスト
    name: string[];
  };
}
