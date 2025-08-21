const path = require("path");
const {
  readConfig,
  writeConfig,
  logGreen,
  openConfig,
  getID,
  printTable,
  logRed,
  execCommand,
} = require("./tools");

// 获取列表
function getList(filterKeyWords = "", isAll) {
  const columns = isAll ? undefined : ["id", "name", "useCount", "description"];
  const config = readConfig();
  let table = [];
  if (!config.userData) {
    printTable(table);
  } else {
    filterKeyWords = filterKeyWords.trim();
    if (!filterKeyWords) {
      table = config.userData;
    } else {
      table = config.userData.filter((item) => {
        return (
          (item.name && item.name.includes(filterKeyWords)) ||
          (item.tool && item.tool.includes(filterKeyWords)) ||
          (item.description && item.description.includes(filterKeyWords))
        );
      });
    }
    // 根据useCount排序
    table.sort((a, b) => b.useCount - a.useCount);
    printTable(table, columns);
  }
}
// 添加指令
// op add 'aaa,,bb,dd'
// op add aaa,cc,bb,dd
// op add
function add(name, dirPath, tool, description) {
  const config = readConfig();
  if (!config.userData) {
    config.userData = [];
  }
  if (name) {
    name = name.trim();
    let arr = [];
    if (name.includes(",") && !dirPath) {
      arr = name.split(",");
    } else if (name.includes(" ") && !dirPath) {
      arr = name.split(" ");
    }
    if (arr.length) {
      name = arr[0];
      dirPath = arr[1];
      tool = arr[2];
      description = arr[3];
    }
  }
  if (!dirPath) {
    dirPath = path.resolve(".");
  }
  if (!name) {
    name = path.basename(dirPath);
  }
  const id = getID(config.userData);
  config.userData.push({
    id,
    name,
    dirPath,
    tool: tool || "explorer",
    description: description || "",
    useCount: 0,
  });
  writeConfig(config);
  logGreen(`"${name}" has been added to your config.`);
}

function addByDescription(description) {
  add("", "", "", description);
}
// 编辑配置文件
function editConfig() {
  openConfig();
}
// 删除指令 根据名称或id删除
function del(name) {
  let arr;
  if (name.includes(",")) {
    arr = name.split(",");
  } else if (name.includes(" ")) {
    arr = name.split(" ");
  }
  if (arr && arr.length) {
    for (const name of arr) {
      del(name);
    }
    return;
  }
  const config = readConfig();
  if (!config.userData) {
    return;
  }
  name = name.trim();
  let isName = false;
  const index = config.userData.findIndex((item) => {
    if (String(item.id) === name) {
      isName = false;
      return true;
    } else if (item.name === name) {
      isName = true;
      return true;
    }
  });
  if (~index) {
    config.userData.splice(index, 1);
    writeConfig(config);
    logGreen(
      `${isName ? "name" : "id"} = ${name} has been deleted from your config.`
    );
  } else {
    logRed(`${name} is not found in your config.`);
  }
}
function delByName(name) {
  const config = readConfig();
  if (!config.userData) {
    return;
  }
  name = name.trim();
  const index = config.userData.findIndex((item) => {
    return item.name === name;
  });
  if (~index) {
    config.userData.splice(index, 1);
    writeConfig(config);
    logGreen(`name = ${name} has been deleted from your config.`);
  } else {
    logRed(`name = ${name} not found in your config.`);
  }
}
function delById(id) {
  let arr;
  if (id.includes(",")) {
    arr = id.split(",");
  } else if (id.includes(" ")) {
    arr = id.split(" ");
  }
  if (arr && arr.length) {
    for (const id of arr) {
      delById(id);
    }
    return;
  }
  const config = readConfig();
  if (!config.userData) {
    return;
  }
  id = id.trim();
  const index = config.userData.findIndex((item) => {
    return String(item.id) === id;
  });
  if (~index) {
    config.userData.splice(index, 1);
    writeConfig(config);
    logGreen(`id = ${id} has been deleted from your config.`);
  } else {
    logRed(`id = ${id} not found in your config.`);
  }
}
// 根据名称或id打开
function open(name) {
  if (!name) {
    execCommand("open -h")
    return
  }
  name = name.trim();
  const config = readConfig();
  if (!config.userData) {
    logRed("No data in your config.");
    return;
  }
  const item = config.userData.find((item) => {
    return (
      String(item.id) === name ||
      item.name.includes(name) ||
      item.description.includes(name)
    );
  });
  if (!item) {
    logRed(`"${name}" is not found in your config.`);
    return;
  }
  _open(config, item);
}
function openByName(name = "") {
  name = name.trim();
  const config = readConfig();
  if (!config.userData) {
    logRed("No data in your config.");
    return;
  }
  const item = config.userData.find((item) => {
    return item.name.includes(name);
  });
  if (!item) {
    logRed(`"${name}" is not found in your config.`);
    return;
  }
  _open(config, item);
}
function openById(id = "") {
  id = id.trim();
  const config = readConfig();
  if (!config.userData) {
    logRed("No data in your config.");
    return;
  }
  const item = config.userData.find((item) => {
    return String(item.id) === id;
  });
  if (!item) {
    logRed(`"${id}" is not found in your config.`);
    return;
  }
  _open(config, item);
}
function openByIndex(index) {
  const config = readConfig();
  if (!config.userData) {
    logRed("No data in your config.");
    return;
  }
  const table = config.userData;
  // 根据useCount排序
  table.sort((a, b) => b.useCount - a.useCount);
  if (typeof index === "string") {
    index = parseInt(index);
  } else {
    logRed("u must input index.");
    return;
  }
  const item = config.userData[index];
  if (!item) {
    logRed(`"${index}" is not found in your config.`);
    return;
  }
  _open(config, item);
}
function getToolList(filterKeyWords = "") {
  const config = readConfig();
  const userTools = config.userTools || {};
  const tools = Object.keys(userTools);
  const list = [];
  for (const toolName of tools) {
    if (filterKeyWords && !toolName.includes(filterKeyWords)) {
      continue;
    }
    list.push({
      name: toolName,
      globalUse: userTools[toolName],
    });
  }
  printTable(list);
}
function addTool(toolName, toolPath) {
  const config = readConfig();
  const userTools = config.userTools || {};
  userTools[toolName] = toolPath || "";
  config.userTools = userTools;
  writeConfig(config);
  logGreen(`"${toolName}" has been added to your config.`);
}
function delTool(toolName) {
  const config = readConfig();
  const userTools = config.userTools || {};
  if (userTools[toolName]) {
    delete userTools[toolName];
    config.userTools = userTools;
    writeConfig(config);
    logGreen(`"${toolName}" has been deleted from your config.`);
  } else {
    logRed(`"${toolName}" is not found in your config.`);
  }
}
function resetConfig() {
  const config = readConfig();
  config.userData = [];
  config.userTools = {};
  writeConfig(config);
  logGreen("Your config has been reset.");
}

function openCode() {
  execCommand(`explorer "${path.resolve(__dirname, "../")}"`);
}

function _open(config, item) {
  const userTools = config.userTools || {};
  const defaultTool = item.tool;
  let tool = userTools[defaultTool];
  if (tool === undefined) {
    tool = "explorer";
  }
  if (tool === "") {
    execCommand(`${item.dirPath}`);
  } else {
    execCommand(`${tool} "${item.dirPath}"`);
  }
  item.useCount++;
  writeConfig(config);
  logGreen(`"${item.name},${item.dirPath}" has been opened.`);
}

module.exports = {
  getList,
  add,
  addByDescription,
  editConfig,
  del,
  delByName,
  delById,
  open,
  openByName,
  openById,
  openByIndex,
  getToolList,
  addTool,
  delTool,
  resetConfig,
  openCode,
};
