import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const dirHelperFunction = {
  cwd: () => {
    // 実行されたパスを取得
    const cwd = process.cwd();
    return cwd;
  },
  selfroot: () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let dir = path.resolve(__dirname);
    while (true) {
      if (fs.existsSync(path.join(dir, "package.json"))) {
        return dir;
      }
      const parent = path.dirname(dir);
      if (parent === dir) {
        // ルートに到達して見つからなかった
        return null;
      }
      dir = parent;
    }
  },
};
