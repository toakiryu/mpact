import { program } from "commander";
import { pkgrc } from "./pkgrc";
import { helper } from "./helpers/main";

// コマンドラインインターフェースの設定
program.name("mpact").description("").version(pkgrc.version);

// グローバルオプションの設定
program
  .configureHelp({ showGlobalOptions: true })
  .option("-d, --debug", "enable debug mode");

program
  .command("test")
  .description("Display the current working directory or script directory")
  .action(async () => {
    console.log(helper.config.hasConfigFile());
  });

// 引数がない場合はヘルプを表示
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(0);
}

// コマンドのパースと実行
await program.parseAsync(process.argv);
