import { loadPackageJsonFromDir } from "./load-pkg-json";

const pkgJson = loadPackageJsonFromDir();

export interface Pkgrc {
  name: string;
  version: string;
}

export const pkgrc: Pkgrc = {
  name: pkgJson.name,
  version: pkgJson.version || "0.0.0",
};
