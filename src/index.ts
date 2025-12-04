import { program } from "commander";
import { pkgrc } from "./pkgrc";

program.name("mpact").description("").version(pkgrc.version);

program.parse();

// デフォルト: 引数が無ければヘルプ表示
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(0);
}

