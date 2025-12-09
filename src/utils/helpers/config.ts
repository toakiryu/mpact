import { existsSync, readFileSync } from "fs";
import { extname } from "path";
import { pathToFileURL } from "url";
import deepmerge from "deepmerge";
import { mpactrc } from "../../config";
import _helperDirFunction from "./dir";
import { type DefineConfig, defineConfigSchema } from "../defineConfig";

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

/**
 * `mpact`の設定ファイルが存在するか確認する
 */
const __helperConfigFuncHasFile =
  async (): Promise<ConfigHelperFunction_hasFileResult> => {
    try {
      // カレントディレクトリを基準に確認
      const cwd = _helperDirFunction.cwd();
      // 設定ファイル名のリストをループして存在確認
      for (let i = 0; i < mpactrc.configFile.name.length; i++) {
        const fileName = mpactrc.configFile.name[i];
        // フルパスを生成
        const fullPath = `${cwd}/${fileName}`;
        // 存在すればパスを返す
        if (existsSync(fullPath))
          return {
            has: true,
            file: {
              // フルパスを返す
              path: fullPath,
              // フルネームを返す
              fullname: fileName,
              // 拡張子なしのファイル名を返す
              name: fileName.replace(extname(fileName), ""),
              // 拡張子は小文字で統一
              ext: extname(fullPath).toLowerCase(),
            },
          };
      }
      // 見つからなかった場合
      return { has: false };
    } catch {
      // エラー時は例外をスロー
      throw new Error("Error checking for config file.");
    }
  };

/**
 * 設定ファイルを読み込み、内容を返す
 * @param file - 読み込むファイル情報（省略時は自動検出）
 * @returns 設定ファイルの内容
 */
const __helperConfigFuncLoadFile = async (
  file?: ConfigHelperFunction_hasFileFile,
): Promise<DefineConfig> => {
  let _file = file;
  // ファイルが指定されていない場合は存在確認を行う
  if (!_file) {
    // 設定ファイルの存在を確認
    const result = await _helperConfigFunction.hasFile();
    // 存在しなければ例外をスロー
    if (result.has && result.file) {
      // ファイル情報を上書き
      _file = result.file;
    }
  }

  // 拡張子に応じてパース方法を変更
  let configData: Record<string, any> | undefined = undefined;
  if (_file) {
    try {
      const { path, ext, name } = _file;
      if (name === ".mpactrc") {
        throw new Error(".mpactrc format not supported yet.");
      }
      // JSONファイルの場合
      if (ext === ".json") {
        // ファイルを読み込み、JSONとしてパースして返す
        const row = readFileSync(path, "utf-8");
        const parsed = JSON.parse(row);
        configData = parsed;
      }
      if (ext === ".js" || ext === ".mjs" || ext === ".cjs") {
        const module = await import(pathToFileURL(path).href);
        const cfg = (module && (module.default ?? module)) as Record<
          string,
          any
        >;
        configData = cfg;
      }
      if (ext === ".ts") {
        const module = await import(pathToFileURL(path).href);
        const cfg = (module && (module.default ?? module)) as Record<
          string,
          any
        >;
        configData = cfg;
      }
    } catch (e) {
      throw new Error(`Error loading config file: ${e}`);
    }
  }

  try {
    // デフォルト設定とマージ
    const mergedConfig = deepmerge(
      mpactrc.configFile.config ?? {},
      configData || {},
    );

    // スキーマで検証
    const parsedValue = defineConfigSchema.safeParse(mergedConfig);

    // 検証エラー時は例外をスロー
    if (!parsedValue.success) {
      throw new Error(
        `Config file validation error: ${parsedValue.error.message}`,
      );
    }
    // 検証済みのデータを返す
    return parsedValue.data;
  } catch (e) {
    throw new Error(`Error processing config file: ${e}`);
  }
};

const _helperConfigFunction = {
  hasFile: __helperConfigFuncHasFile,
  loadFile: __helperConfigFuncLoadFile,
};

export default _helperConfigFunction;
