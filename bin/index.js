#!/usr/bin/env node
const program = require('commander')
const lodash = require('lodash')
const { getVersion, parseInput } = require('../src/tools')
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
  sortList,
  reverseList,
  filterList,
  printList,
  getConfig,
  openByDescription,
  openCmd,
  openDoc,
} = require('../src/main')

program
  .name('fast-open')
  .version(getVersion())
  .description(
    'In a Windows environment, you can use commands to quickly open preset directories, and you can also configure them as shortcut commands to execute other operations.'
  )
  .usage('[option|command]')
program.addHelpText(
  'after',
  `Example call:
  $ open help 打开说明文档
  $ open edit 手动编辑配置文件
  $ open <name|id|description>
  $ open -n <name>
  $ open -i <id>
  $ open add [name,path,tool,description]
  $ open add -n <name>
  $ open add -d <description>
  $ open ls
  `
)

program
  .command('list')
  .alias('ls')
  .alias('l')
  .option('-a, --all', '查看列表全部列')
  .option('-r, --reverse', '列表反转')
  .option('-s, --sort <colomnName>', '按列名排序列表')
  .option('-f, --filter <filterKeyWords>', '按关键字过滤列表')
  .description('查看列表')
  .action((options) => {
    const config = getConfig()
    let list = getList(config)
    list = sortList(config, list, options.sort)
    options.reverse && reverseList(list)
    options.filter && (list = filterList(list, options.filter))
    printList(config, list, options.all)
  })

program
  .argument('[name|id|description|cmd]')
  .option('-i, --id <id>', '根据ID打开')
  .option('-n, --name <name>', '根据名称打开')
  .option('-d, --description <description>', '根据描述打开')
  .option('-c, --cmd <cmdName>', '执行命令行')
  .option('-t, --tool <toolName>', '设置打开工具(临时)')
  .action((input, options) => {
    const config = getConfig()
    config.tempTool = options.tool || ''
    if (options.id) {
      const isOpened = openById(config, options.id)
      if (isOpened) {
        return
      }
    }
    if (options.name) {
      const isOpened = openByName(config, options.name)
      if (isOpened) {
        return
      }
    }
    if (options.description) {
      const isOpened = openByDescription(config, options.description)
      if (isOpened) {
        return
      }
    }
    if (options.cmd) {
      const isExecuted = openCmd(config, options.cmd)
      if (isExecuted) {
        return
      }
    }
    if (!input && !Object.keys(options).length) {
      program.help()
      return
    }
    if (input) {
      open(config, input)
    }
  })

program
  .command('add')
  .argument(
    '[name,path,tool,description]',
    '指令名称,目录或文件路径,打开工具,描述'
  )
  .option('-n, --name <name>', '添加名称')
  .option('-d, --description <description>', '添加描述')
  .option('-t, --tool <tool>', '添加工具')
  .option('-p, --path <path>', '添加路径')
  .description('添加指令')
  .action((input, opt) => {
    const inputArr = parseInput(input)
    const options = lodash.merge(opt || {}, program.opts()) 
    const name = options.name || inputArr[0] || ''
    const path = options.path || inputArr[1] || ''
    const tool = options.tool || inputArr[2] || ''
    const description = options.description || inputArr[3] || ''
    add(name, path, tool, description)
  })

// 删除指令
program
  .command('delete')
  .alias('del')
  .argument('[name|id]')
  .option('-i, --id <id...>', '根据ID删除')
  .option('-n, --name <name...>', '根据名称删除')
  .description('删除指令')
  .action((input) => {
    const config = getConfig()
    const inputArr = parseInput(input)
    inputArr.forEach((item) => {
      del(config, item)
    })
    const options = program.opts()
    if (options.id) {
      const delIds = parseInput(options.id)
      delIds.forEach((id) => {
        delById(config, id)
      })
    }
    if (options.name) {
      const delNames = parseInput(options.name)
      delNames.forEach((name) => {
        delByName(config, name)
      })
    }
  })

program
  .command('tool-list')
  .alias('tl')
  .option('-f, --filter <filterKeyWords>', '过滤工具列表')
  .description('查看工具列表')
  .action((options) => {
    getToolList(options.filter)
  })

program
  .command('tool-add')
  .alias('ta')
  .argument('<toolName, toolPath>')
  .description('添加工具')
  .action((input) => {
    const inputArr = parseInput(input)
    addTool(inputArr[0], inputArr[1])
  })

program
  .command('tool-del')
  .alias('td')
  .argument('<toolName>')
  .description('删除工具')
  .action((toolName) => {
    delTool(toolName)
  })

program
  .command('reset')
  .description('恢复默认配置')
  .action(() => {
    resetConfig()
  })

program
  .command('me')
  .description('打开代码目录')
  .action(() => {
    openCode()
  })
program.command('edit').alias('e').description('编辑配置').action(editConfig)
program.command('help').description('说明文档').action(openDoc)

program.parse(process.argv)
