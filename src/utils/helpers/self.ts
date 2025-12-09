import { existsSync, readFileSync } from "fs";
import { join } from "path";
import helper from "../helper";

const __helperSelfPkgJsonLoad = () => {
  try {
    // `package.json`が存在するディレクトリを取得
    const candidate = helper.dir.selfroot();
    if (!candidate) {
      // 見つからなかった場合はエラーをスロー
      throw new Error("candidate not found");
    }
    // `package.json`の存在を確認して読み込む
    const file = existsSync(join(candidate, "package.json"));
    if (file) {
      // ファイルを読み込んでJSONを返す
      const raw = readFileSync(join(candidate, "package.json"), "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    // エラー時は例外をスロー
    throw new Error("package.json not found");
  }
};

const _helperSelfFunction = {
  pkg: {
    load: __helperSelfPkgJsonLoad,
  },
};

export default _helperSelfFunction;
