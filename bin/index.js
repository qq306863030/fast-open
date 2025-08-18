#!/usr/bin/env node
const program = require("commander");
const { getVersion } = require("../src/tools");
const {
  getList,
  add,
  editConfig,
  del,
  delById,
  delByName,
  openByName,
  openById,
  open,
  getToolList,
  addTool,
  delTool,
  resetConfig,
  openCode,
  addByDescription,
} = require("../src/main");

program
  .version(getVersion())
  .name("op|open|fast-open")
  .description(
    "In a Windows environment, you can use commands to quickly open preset directories, and you can also configure them as shortcut commands to execute other operations."
  )
  .usage("[option|command]");



program
  .command("list")
  .option("-a, --all", "查看全部列表")
  .alias("l")
  .alias("ls")
  .argument("[filterKeyWords]")
  .description("查看简单列表")
  .action((filterKeyWords, options) => {
    getList(filterKeyWords, options.all);
  });

const addCommand = program
  .command("add")
  .argument("[name]", "指令名称")
  .argument("[path]", "目录或文件路径")
  .argument("[tool]", "打开工具")
  .argument("[description]", "描述")
  .description("添加指令")
  .action((name, path, tool, description) => {
    add(name, path, tool, description);
  });

addCommand
  .command("d")
  .argument("<description>", "描述")
  .description("添加指令")
  .action((description) => {
    addByDescription(description);
  });

program.command("edit").alias("e").description("编辑配置").action(editConfig);

// 删除指令
program
  .command("delete")
  .alias("del")
  .argument("<name|id>")
  .description("删除指令")
  .action((nameOrId) => {
    del(nameOrId);
  });

program
  .argument("[name|id|description]")
  .option("-i, --id", "根据ID打开")
  .option("-n, --name", "根据名称打开")
  .description("执行指令")
  .action((nameOrId, options) => {
    if (options.Id) {
      openById(nameOrId);
    } else if (options.Name) {
      openByName(nameOrId);
    } else {
      open(nameOrId);
    }
  });

program
  .command("tool-list")
  .alias("tl")
  .argument("[filterKeyWords]")
  .description("查看工具列表")
  .action((filterKeyWords) => {
    getToolList(filterKeyWords);
  });

program
  .command("tool-add")
  .alias("ta")
  .argument("<toolName>")
  .argument("[toolPath]")
  .description("添加工具")
  .action((toolName, toolPath) => {
    addTool(toolName, toolPath);
  });

program
  .command("tool-del")
  .alias("td")
  .argument("<toolName>")
  .description("删除工具")
  .action((toolName) => {
    delTool(toolName);
  });

program
  .command("reset")
  .description("恢复默认配置")
  .action(() => {
    resetConfig();
  });

program
  .command("me")
  .description("打开代码目录")
  .action(() => {
    openCode();
  });

program.parse(process.argv);
