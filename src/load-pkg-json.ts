import fs from "fs";
import path from "path";
import { helper } from "./helpers/main";

export function loadPackageJsonFromDir() {
  try {
    const candidate = helper.dir.selfroot();
    if (!candidate) {
      throw new Error("candidate not found");
    }
    const file = fs.existsSync(path.join(candidate, "package.json"));
    if (file) {
      const raw = fs.readFileSync(path.join(candidate, "package.json"), "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    throw new Error("package.json not found");
  }
}
