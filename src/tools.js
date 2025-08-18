const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const shell = require('shelljs');
const dayjs = require("dayjs");

// 读取执行命令目录下的配置文件
function readConfig() {
  const configPath = path.resolve(__dirname, "./config.json")
  if (fs.pathExistsSync(configPath)) {
    return fs.readJsonSync(configPath);
  } else {
    return {
      userData: [],
      userTools: {},
      defaultTool: "explorer"
    }
  }
}

function writeConfig(config) {
  const configPath = path.resolve(__dirname, "./config.json")
  fs.writeJsonSync(configPath, config, { spaces: 2 });
}

// 打开配置文件
function openConfig() {
  const configPath = path.resolve(__dirname, "./config.json")
  // 判断文件是否存在
  if (!fs.pathExistsSync(configPath)) {
    logRed("配置文件不存在，请先创建配置文件或输入open reset命令重置配置文件");
    return;
  }
  logBlue('编辑文件路径：' + configPath)
  const res = isInstalledVSCode()
  if (res) {
    shell.exec(`code -n ${configPath}`)
  } else {
    shell.exec(`notepad ${configPath}`)
  }
}

// 执行一段命令
function execCommand(command) {
  return shell.exec(command).stdout.trim();
}

// 获取版本
function getVersion() {
  const packagePath = path.resolve(__dirname, "../package.json");
  const package = fs.readJsonSync(packagePath);
  return package.version;
}

function printTable(list, columns) {
  if (list.length) {
    columns = columns || Object.keys(list[list.length - 1]);
    console.table(list, columns);
  } else {
    console.log("暂无数据");
  }
}

// 获取唯一的id
function getID(list) {
  // 创建一个递增的id
  let id = 0;
  while (list.some(item => item.id === id)) {
    id++;
  }
  return id;
}

function logBlue(msg) {
  console.log(chalk.hex("#6dd2ea")(`[${getCurrentTime()}]${msg}`));
}

function logGreen(msg) {
  console.log(chalk.hex("#9bed7f")(`[${getCurrentTime()}]${msg}`));
}

function logRed(msg) {
  console.log(chalk.hex("#ed7f7f")(`[${getCurrentTime()}]${msg}`));
}

function getCurrentTime() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
}

// 判断是否安装vscode
function isInstalledVSCode() {
  try {
    const command = "code --version";
    const result = execCommand(command);
    const arr = result.split("\n")
    const version = arr[0].split(".")
    return arr.length === 3 && version.length === 3
  } catch (error) {
    return false
  }
}

module.exports = {
  readConfig,
  writeConfig,
  logBlue,
  logGreen,
  logRed,
  getVersion,
  openConfig,
  getID,
  printTable,
  execCommand
};
