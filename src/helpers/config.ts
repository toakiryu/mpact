import { existsSync } from "fs";
import { helper } from "./main";
import { pkgrc } from "../pkgrc";

/**
 * `mpact`の設定関連のヘルパー関数群
 */
export const configHelperFunction = {
  /**
   * `mpact`の設定ファイルが存在するか確認する
   */
  hasConfigFile: (): {
    has: boolean;
    path: string | null;
  } => {
    try {
      // カレントディレクトリを基準に確認
      const cwd = helper.dir.cwd();
      // 設定ファイル名のリストをループして存在確認
      for (let i = 0; i < pkgrc.configFile.name.length; i++) {
        // フルパスを生成
        const fullPath = `${cwd}/${pkgrc.configFile.name[i]}`;
        // 存在すればパスを返す
        if (existsSync(fullPath)) return { has: true, path: fullPath };
      }
      // 見つからなかった場合
      return { has: false, path: null };
    } catch {
      // エラー時は例外をスロー
      throw new Error("Error checking for config file.");
    }
  },
};
