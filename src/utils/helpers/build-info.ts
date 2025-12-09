import { existsSync, readFileSync } from "fs";
import { join } from "path";
import _helperDirFunction from "./dir";
import { BuildInfo } from "../../types/build-info";

const __helperBuildInfoFuncLoad = async (): Promise<BuildInfo> => {
  try {
    // `package.json`が存在するディレクトリを取得
    const candidate = _helperDirFunction.selfroot();
    if (!candidate) {
      // 見つからなかった場合はエラーをスロー
      throw new Error("candidate not found");
    }
    // `package.json`の存在を確認して読み込む
    const buildInfoPath = join(candidate, "build-info.json");
    if (existsSync(buildInfoPath)) {
      // ファイルを読み込んでJSONを返す
      const raw = readFileSync(buildInfoPath, "utf8");
      return JSON.parse(raw);
    } else {
      throw new Error(`build-info.json not found at ${buildInfoPath}`);
    }
  } catch (e) {
    // 既存のエラーメッセージを保持して再スロー
    throw e instanceof Error ? e : new Error(String(e));
  }
};

const _helperBuildInfoFunction = {
  load: __helperBuildInfoFuncLoad,
};
export default _helperBuildInfoFunction;
