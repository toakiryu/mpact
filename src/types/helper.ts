export interface HelperBaseOpts {
  debug?: boolean;
}

export interface ConfigHelperFunction_hasFileFile {
  path: string;
  fullname: string;
  name: string;
  ext: string;
}

export interface ConfigHelperFunction_hasFileResult {
  has: boolean;
  file?: ConfigHelperFunction_hasFileFile;
}