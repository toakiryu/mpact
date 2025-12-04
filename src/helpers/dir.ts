import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * `mpact`のディレクトリ関連のヘルパー関数群
 */
export const dirHelperFunction = {
  /**
   * カレントディレクトリを取得する
   */
  cwd: (): string => {
    try {
      // 実行されたパスを取得
      const cwd = process.cwd();
      return cwd;
    } catch {
      // エラー時は例外をスロー
      throw new Error("Error getting current working directory.");
    }
  },
  /**
   * このスクリプトのディレクトリを起点に上位ディレクトリを辿り、`package.json`が存在するディレクトリを探す
   */
  selfroot: () => {
    try {
      // スクリプトのディレクトリを取得
      const __filename = fileURLToPath(import.meta.url);
      // スクリプトのディレクトリ名を取得
      const __dirname = path.dirname(__filename);
      // 上位ディレクトリを辿りながら`package.json`を探す
      let dir = path.resolve(__dirname);
      // 無限ループ防止のための最大深度
      let maxDepth = 10;
      while (maxDepth-- > 0) {
        // `package.json`が存在するか確認
        if (fs.existsSync(path.join(dir, "package.json"))) {
          return dir;
        }
        // ルートに到達したら終了
        const parent = path.dirname(dir);
        if (parent === dir) {
          // ルートに到達して見つからなかった
          return null;
        }
        // 上位ディレクトリへ移動
        dir = parent;
      }
    } catch {
      // エラー時は例外をスロー
      throw new Error("Error getting self root directory.");
    }
  },
};
