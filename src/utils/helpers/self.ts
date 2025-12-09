import { existsSync, readFileSync } from "fs";
import { join } from "path";
import _helperDirFunction from "./dir";

const __helperSelfPkgJsonLoad = () => {
  // `package.json`が存在するディレクトリを取得
  const candidate = _helperDirFunction.selfroot();
  if (!candidate) {
    // 見つからなかった場合はエラーをスロー
    throw new Error("package.json not found: candidate directory not found");
  }
  const pkgPath = join(candidate, "package.json");
  if (!existsSync(pkgPath)) {
    throw new Error(`package.json not found at ${pkgPath}`);
  }
  const raw = readFileSync(pkgPath, "utf8");
  return JSON.parse(raw);
};

const _helperSelfFunction = {
  pkg: {
    load: __helperSelfPkgJsonLoad,
  },
};

export default _helperSelfFunction;
