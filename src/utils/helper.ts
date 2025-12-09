import _helperDirFunction from "./helpers/dir";
import _helperBuildInfoFunction from "./helpers/build-info";
import _helperSelfFunction from "./helpers/self";
import _helperConfigFunction from "./helpers/config";

/**
 * ヘルパー関数群
 */
const helper = {
  dir: _helperDirFunction,
  buildInfo: _helperBuildInfoFunction,
  self: _helperSelfFunction,
  config: _helperConfigFunction,
};

export default helper;
