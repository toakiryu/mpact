import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { loadPackageJsonFromDir } from "./load-pkg-json";

const pkgJson = loadPackageJsonFromDir(__dirname);

export interface Pkgrc {
  name: string;
  version: string;
}

export const pkgrc: Pkgrc = {
  name: pkgJson.name,
  version: pkgJson.version || "0.0.0",
};
