import { existsSync, readFileSync } from "fs";
import { join } from "path";
import helper from "../helper";
import { BuildInfo } from "../../types/build-info";

const __helperBuildInfoFuncLoad = async (): Promise<BuildInfo | undefined> => {
  try {
    // `package.json`が存在するディレクトリを取得
    const candidate = helper.dir.selfroot();
    if (!candidate) {
      // 見つからなかった場合はエラーをスロー
      throw new Error("candidate not found");
    }
    // `package.json`の存在を確認して読み込む
    const file = existsSync(join(candidate, "build-info.json"));
    if (file) {
      // ファイルを読み込んでJSONを返す
      const raw = readFileSync(join(candidate, "build-info.json"), "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    // エラー時は例外をスロー
    throw new Error("build-info.json not found");
  }
};

const _helperBuildInfoFunction = {
  load: __helperBuildInfoFuncLoad,
};
export default _helperBuildInfoFunction;
