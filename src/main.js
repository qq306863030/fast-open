const path = require('path')
const lodash = require('lodash')
const {
  readConfig,
  writeConfig,
  logGreen,
  openConfig,
  getID,
  printTable,
  logRed,
  execCommand,
  writeDefaultConfig,
  openReadme,
} = require('./tools')

// 获取配置文件
function getConfig() {
  return writeDefaultConfig()
}

// 获取列表数据
function getList(config) {
  return config.userData || []
}
// 获取工具列表
function getToolList(config, filterKeyWords = '') {
  filterKeyWords = filterKeyWords.trim().toLowerCase()
  const userTools = config.userTools || {}
  const tools = Object.keys(userTools)
  const list = []
  for (const toolName of tools) {
    if (filterKeyWords && !toolName.toLowerCase().includes(filterKeyWords)) {
      continue
    }
    list.push({
      name: toolName,
      globalUse: userTools[toolName],
    })
  }
  return list
}

// 获取命令列表
function getCommandList(config, filterKeyWords = '') {
  filterKeyWords = filterKeyWords.trim().toLowerCase()
  const userTools = config.userCommand || []
  const list = userTools.map(item => {
    return {
      name: item.name,
      command: item.command && (Array.isArray(item.command) ? item.command.join(' && ') : item.command),
    }
  }).filter(item => {
    return item.name.toLowerCase().includes(filterKeyWords) || item.command.toLowerCase().includes(filterKeyWords)
  })
  return list
}

// 根据列名排序
function sortList(config, list, columnName) {
  if (!columnName) {
    columnName = config.options.defaultTableSortBy || ''
  }
  return lodash.sortBy(list, [columnName])
}

// 反转列表
function reverseList(list) {
  return lodash.reverse(list)
}

// 根据关键字过滤列表，按名称和描述过滤
function filterList(list, keyword) {
  return list.filter((item) => {
    keyword = keyword.trim().toLowerCase()
    return (
      (item.name && item.name.toLowerCase().includes(keyword)) ||
      (item.description && item.description.toLowerCase().includes(keyword))
    )
  })
}

// 打印列表
function printList(config, list, isAll = false) {
  printTable(list, isAll ? undefined : config.options.defaultTableColumns)
}

// 根据id打开
function openById(config, id) {
  if (!config.userData) {
    logRed('No data in your config.')
    return
  }
  const item = config.userData.find((item) => {
    return String(item.id) === id
  })
  if (!item) {
    logRed(`"id=${id}" is not found in your config.`)
    return
  }
  return _open(config, item)
}
// 根据名称打开
function openByName(config, name) {
  if (!config.userData) {
    logRed('No data in your config.')
    return
  }
  name = name.trim().toLowerCase()
  let item = config.userData.find((item) => {
    return item.name && item.name.toLowerCase() === name 
  })
  if (!item) {
    item = config.userData.find((item) => {
      return item.name && item.name.toLowerCase().includes(name)
    })
  }
  if (!item) {
    logRed(`"name=${name}" is not found in your config.`)
    return
  }
  return _open(config, item)
}
// 根据描述打开
function openByDescription(config, desc) {
  if (!config.userData) {
    logRed('No data in your config.')
    return
  }
  desc = desc.trim().toLowerCase()
  let item = config.userData.find((item) => {
    return item.description && item.description.toLowerCase() === desc
  })
  if (!item) {
    item = config.userData.find((item) => {
      return item.description && item.description.toLowerCase().includes(desc)
    })
  }
  if (!item) {
    logRed(`"description=${desc}" is not found in your config.`)
    return
  }
  return _open(config, item)
}
// 打开命令行
function openCmd(config, input) {
  if (!config.userCommand || !config.userCommand.length) {
    logRed('No data in your config.')
    return
  }
  input = input.trim().toLowerCase()
  let cmdObj = config.userCommand.find(item => {
    return item.name.toLowerCase() === input
  })
  if (!cmdObj) {
    cmdObj = config.userCommand.find(item => {
      return item.name.toLowerCase().includes(input)
    })
  }
  const cmdList = cmdObj && cmdObj.command
  if (cmdList && cmdList instanceof Array) {
    const cmdStr = cmdList.join(' && ')
    execCommand(cmdStr)
    return true
  }
  logRed(`"${input}" is not found in your config.`)
  return false
}
// 根据id/名称/描述打开
function open(config, input) {
  if (!config.userData) {
    logRed('No data in your config.')
    return
  }
  input = input.trim().toLowerCase()
  // 先查找id 再完全匹配名称和描述
  let item = config.userData.find((item) => {
    return (String(item.id) === input) || (item.name && item.name.toLowerCase() === input) || (item.description && item.description.toLowerCase() === input)
  })
  if (item) {
    return _open(config, item)
  } else {
    item = config.userCommand.find(item => {
      return item.name.toLowerCase() === input
    })
    if (item) {
      const cmdList = item.command
      if (cmdList && cmdList instanceof Array) {
        const cmdStr = cmdList.join(' && ')
        execCommand(cmdStr)
        return true
      }
    }
  }
  item = config.userData.find((item) => {
    return (item.name && item.name.toLowerCase().includes(input)) || (item.description && item.description.toLowerCase().includes(input))
  })
  if (item) {
    return _open(config, item)
  } else {
    item = config.userCommand.find(item => {
      return item.name.toLowerCase().includes(input) 
    })
    if (item) {
      const cmdList = item.command
      if (cmdList && cmdList instanceof Array) {
        const cmdStr = cmdList.join(' && ')
        execCommand(cmdStr)
        return true
      }
    }
  }
  logRed(`"${input}" is not found in your config.`)
  return false
}

// 添加指令
// op add 'aaa,,bb,dd'
// op add aaa,cc,bb,dd
// op add
function add(name, dirPath, tool, description) {
  const config = readConfig()
  if (!config.userData) {
    config.userData = []
  }
  if (!dirPath) {
    dirPath = path.resolve('.')
  }
  if (!name) {
    name = path.basename(dirPath)
  }
  const id = getID(config.userData)
  config.userData.push({
    id,
    name,
    dirPath,
    tool: tool,
    description: description || '',
    useCount: 0,
  })
  writeConfig(config)
  logGreen(`"${name}" has been added to your config.`)
}

// 编辑配置文件
function editConfig() {
  openConfig()
}
// 打开说明文档
function openDoc() {
  openReadme()
}

// 删除指令 根据名称或id删除
function del(config, name) {
  if (!config.userData) {
    return
  }
  name = name.trim()
  let isName = false
  const index = config.userData.findIndex((item) => {
    if (String(item.id) === name) {
      isName = false
      return true
    } else if (item.name === name) {
      isName = true
      return true
    }
  })
  if (~index) {
    config.userData.splice(index, 1)
    writeConfig(config)
    logGreen(
      `${isName ? 'name' : 'id'} = ${name} has been deleted from your config.`
    )
  } else {
    logRed(`${name} is not found in your config.`)
  }
}
function delByName(config, name) {
  if (!config.userData) {
    return
  }
  name = name.trim()
  const index = config.userData.findIndex((item) => {
    return item.name === name
  })
  if (~index) {
    config.userData.splice(index, 1)
    writeConfig(config)
    logGreen(`name = ${name} has been deleted from your config.`)
  } else {
    logRed(`name = ${name} not found in your config.`)
  }
}
function delById(config, id) {
  if (!config.userData) {
    return
  }
  id = id.trim()
  const index = config.userData.findIndex((item) => {
    return String(item.id) === id
  })
  if (~index) {
    config.userData.splice(index, 1)
    writeConfig(config)
    logGreen(`id = ${id} has been deleted from your config.`)
  } else {
    logRed(`id = ${id} not found in your config.`)
  }
}
function printCommandList(filterKeyWords = '') {
  const config = readConfig()
  const list = getCommandList(config, filterKeyWords)
  printTable(list)
}


function printToolList(filterKeyWords = '') {
  const config = readConfig()
  const list = getToolList(config, filterKeyWords)
  printTable(list)
}
function addTool(toolName, toolPath) {
  const config = readConfig()
  const userTools = config.userTools || {}
  userTools[toolName] = toolPath || ''
  config.userTools = userTools
  writeConfig(config)
  logGreen(`"${toolName}" has been added to your config.`)
}
function delTool(toolName) {
  const config = readConfig()
  const userTools = config.userTools || {}
  if (userTools[toolName]) {
    delete userTools[toolName]
    config.userTools = userTools
    writeConfig(config)
    logGreen(`"${toolName}" has been deleted from your config.`)
  } else {
    logRed(`"${toolName}" is not found in your config.`)
  }
}
function resetConfig() {
  const config = readConfig(true)
  writeConfig(config)
  logGreen('Your config has been reset.')
}

function openCode() {
  execCommand(`explorer "${path.resolve(__dirname, '../')}"`)
}

function _open(config, item) {
  const userTools = config.userTools || {}
  let tool = config.tempTool || item.tool
  const tempTool = tool
  if (tool) {
    tool = userTools[tool]
    if (!tool) {
      tool = tempTool
      if (tool === 'vscode') {
        tool = 'code'
      }
    }
  } else {
    tool = (config.options && config.options.defaultTool && userTools[config.options.defaultTool]) || 'explorer' 
  }
  if (tool.includes(' ')) {
    tool = `"${tool}"`
  }
  if (item.dirPath.includes(' ')) {
    item.dirPath = `"${item.dirPath}"`
  }
  execCommand(`${tool} ${item.dirPath}`)
  item.useCount++
  writeConfig(config)
  logGreen(`"${item.name},${item.dirPath}" has been opened.`)
  return true
}

module.exports = {
  getConfig,
  getList,
  sortList,
  reverseList,
  filterList,
  printList,
  openById,
  openByName,
  openByDescription,
  openCmd,
  open,
  add,
  editConfig,
  del,
  delByName,
  delById,
  getCommandList,
  getToolList,
  addTool,
  delTool,
  resetConfig,
  openCode,
  openDoc,
  printToolList,
  printCommandList,
}
