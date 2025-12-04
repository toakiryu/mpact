import fs from "fs";
import path from "path";
import { helper } from "./helpers/main";

// `package.json`を読み込む関数
export function loadPackageJsonFromDir() {
  try {
    // `package.json`が存在するディレクトリを取得
    const candidate = helper.dir.selfroot();
    if (!candidate) {
      // 見つからなかった場合はエラーをスロー
      throw new Error("candidate not found");
    }
    // `package.json`の存在を確認して読み込む
    const file = fs.existsSync(path.join(candidate, "package.json"));
    if (file) {
      // ファイルを読み込んでJSONを返す
      const raw = fs.readFileSync(path.join(candidate, "package.json"), "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    // エラー時は例外をスロー
    throw new Error("package.json not found");
  }
}
