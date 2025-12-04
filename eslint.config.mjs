import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores(["dist/**"]),
  {
    rules: {},
  },
]);

export default eslintConfig;
