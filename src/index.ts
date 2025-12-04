import { program } from "commander";
import { pkgrc } from "./pkgrc";
import { helper } from "./helpers/main";

program.name("mpact").description("").version(pkgrc.version);

program
  .configureHelp({ showGlobalOptions: true })
  .option("-d, --debug", "enable debug mode");

program
  .command("dir")
  .description("Display the current working directory or script directory")
  .argument(
    "[cwd|script]",
    "Specify 'cwd' for current working directory or 'script' for script directory",
  )
  .action(async (target: string | undefined) => {
    if (target == "cwd") {
      console.log(helper.dir.cwd());
    } else if (target == "selfroot") {
      console.log(helper.dir.selfroot());
    } else {
      program.error(
        "Please specify either 'cwd' or 'selfroot' as an argument.",
      );
    }
  });

// デフォルト: 引数が無ければヘルプ表示
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(0);
}

await program.parseAsync(process.argv);
