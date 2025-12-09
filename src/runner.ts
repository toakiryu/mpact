import { program } from "commander";
import { mpactrc } from "./config";
import helper from "./utils/helper";

// コマンドラインインターフェースの設定
program.name("mpact").description("").version(mpactrc.version);

// グローバルオプションの設定
program
  .configureHelp({ showGlobalOptions: true })
  .option("-d, --debug", "enable debug mode");

program
  .command("build-info")
  .description("Display build information")
  .action(async () => {
    const data = await helper.buildInfo.load();
    if(!data){
      console.log("No build info available.");
      return;
    }
    console.log(`> Build info data
Name: ${data.name}
Version: ${data.version}
Build ID: ${data.buildId}
Commit: ${data.commit}
Branch: ${data.branch}
Timestamp: ${data.timestamp}\n`);
  });

program
  .command("test")
  .description("Display the current working directory or script directory")
  .action(async () => {
    const configData = await helper.config.loadFile();
    console.log("Config file data:", configData);
  });

// 引数がない場合はヘルプを表示
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(0);
}

await program.parseAsync(process.argv);
