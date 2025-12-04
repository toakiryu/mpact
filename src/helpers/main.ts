import { configHelperFunction } from "./config";
import { dirHelperFunction } from "./dir";

/**
 * `mpact`のヘルパー関数群をまとめたオブジェクト
 */
export const helper = {
  dir: dirHelperFunction,
  config: configHelperFunction,
};
