import fs from "fs";
import path from "path";

export function loadPackageJsonFromDir(startDir: string) {
  let cur = startDir;
  while (true) {
    const candidate = path.join(cur, "package.json");
    try {
      if (fs.existsSync(candidate)) {
        const raw = fs.readFileSync(candidate, "utf8");
        return JSON.parse(raw);
      }
    } catch (e) {
      // ignore and continue
    }
    const parent = path.dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  // fallback to cwd
  try {
    const cwdCandidate = path.join(process.cwd(), "package.json");
    if (fs.existsSync(cwdCandidate)) {
      return JSON.parse(fs.readFileSync(cwdCandidate, "utf8"));
    }
  } catch (e) {
    // ignore
  }
  throw new Error("package.json not found");
}
