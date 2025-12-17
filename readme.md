
 # fast-open
 ![QQ](https://img.shields.io/badge/QQ-306863030-green.svg) [![Gitee](https://img.shields.io/badge/Gitee-roman_123-blue.svg)](https://gitee.com/roman_123/fast-open) [![GitHub](https://img.shields.io/badge/GitHub-roman_123-blue.svg)](https://github.com/qq306863030/fast-open) [![NPM](https://img.shields.io/badge/NPM-roman_123-blue.svg)](https://www.npmjs.com/package/fast-open) ![HOME](https://img.shields.io/badge/HOME-fast_open-blue)

> In a Windows environment, you can use commands to quickly open preset directories, and you can also configure them as shortcut commands to execute other operations.
> 在 Windows 环境中，你可以使用命令快速打开预设目录，还能将它们配置为快捷命令来执行其他操作。

[简体中文](https://github.com/qq306863030/fast-open/blob/master/readme.md) | [English](https://github.com/qq306863030/fast-open/blob/master/readme.en.md)

## 安装
```bash
npm install fast-open -g 
```

## 快速开始
```bash 
#添加一个快速打开的目录
## 1. 进入任意目录打开命令行，输入open add
## 2. 退出目录，输入open ls查看目录列表
## 3. 输入open <id|name> 打开指定目录
## 4. 输入open -t vscode <id|name> 使用vscode打开指定目录（需要安装vscode）

#添加一个快速打开的命令
# 1. open edit打开配置文件
# 2. 在配置项userCommand字段中添加命令行配置，数据结构为{ "name": "", "command": [] }数组
"userCommand": [
    {
      "name": "push",
      "command": [
        "git pull",
        "git add .",
        "git commit -m 更新",
        "git push"
      ]
    }
  ]
# 3. 保存并退出
# 4. 打开命令行输入open push或open -c push即可执行自定义命令行
```

## 命令列表
```bash
# 可使用op|open|fast-open执行命令

open list|ls|l # 查看目录列表
open ls -a, --all 查看列表全部列
open ls -r, --reverse 列表反转
open ls -s, --sort <colomnName> 按列名排序列表
open ls -f, --filter <filterKeyWords> 按关键字过滤列表
open ls -d, --dir 查看目录列表（默认）
open ls -t, --tool 查看工具列表
open ls -c, --command 查看命令列表
[示例1]: open ls -a -r -s useCount -f ai # 列出全部列，按列useCount排序, 反转列表，仅显示名称或描述中包含ai字符的项目
[示例2]: open ls -c -f PUSH # 查看命令列表, 并从名称和命令中过滤“PUSH”关键字的项目


open [name|id|description|cmd] # 快速打开指定名称的目录
open -i, --id <id> 根据ID打开
open -n, --name <name> 根据名称打开
open -d, --description <description> 根据描述打开
open -c, --cmd <cmdName> 执行命令行
open -t, --tool <toolName> 设置默认打开工具，需要使用控制台能直接执行的工具(如notepad等)或在配置的自定义工具(参考"open tool-add"命令)，默认为explorer
[示例1]: open abc # 打开id、名称、描述、命令行列表名称中为abc或包含abc的项目
[示例2]: open -i 1 # 打开id为1的项目
[示例3]: open -n abc # 打开名称为abc或包含abc的项目
[示例4]: open -d abc # 打开描述为abc或包含abc的项目
[示例5]: open -c push # 执行命令行列表中为push的命令，需要在配置文件中手动配置命令行,参考添加命令行示例


open add [name,path,tool,description] # 添加目录
open add -n, --name <name> 添加名称
open add -p, --path <path> 添加描述
open add -t, --tool <toolName> 添加打开工具，需要使用控制台能直接执行的工具(如notepad等)或在配置的自定义工具(参考"open tool-add"命令)，默认为explorer
open add -d, --description <description> 添加描述
[示例1]: open add # 会自动添加[当前目录名称][当前目录路径][""][""]在配置文件中
[示例2]: open add -n aaa -p c:/1.txt -t vscode -d bbb # 会自动添加[aaa,c:/1.txt,vscode,bbb]在配置文件[name,path,tool,description]中


open del [name|id...] # 删除配置
open del -i, --id <id...> # 根据id删除
open del -n, --name <name...> # 根据名称删除
[示例1]: open del aaa,bbb,ccc # 删除名称或id为aaa、bbb、ccc的配置项
[示例2]: open del -i 1,2,3 # 删除id为1、2、3的配置项
[示例3]: open del -n aaa,bbb # 删除名称为aaa、bbb的配置项

open command-list|cl # 查看命令列表
open cl -f <filterKeyWords> # 按关键字过滤命令列表
[示例2]: open cl # 列出全部命令

open tool-list|tl # 查看工具列表
open tl -f <filterKeyWords> # 按关键字过滤工具列表
[示例1]: open tl # 列出全部工具
[示例2]: open tl -f vscode # 列出名称中包含vscode的工具


open tool-add|ta <toolName, toolPath> # 添加工具
[示例]: open ta typora,D:/soft/Typora/Typora.exe # 添加typora工具,应用路径 使用typora打开目录或文件:open -t typora <id|name|description>，注意：如果添加的目录路径中存在空格，需要使用双引号包裹：open ta "typora,D:/soft/Typora/Typora.exe"


open tool-del|td <toolName> # 删除工具
[示例]: open td vscode # 删除名称为vscode的工具


open edit # 手动编辑配置文件
open reset # 恢复配置文件为默认值
open help # 查看帮助文档
open me # 打开源代码目录
```

## 配置文件
```bash
# 修改默认配置
# 1. open edit打开配置文件
# 2. 修改配置项
"options": {
    # 输入open ls时默认显示的列，可以添加列、修改显示的顺序
    "defaultTableColumns": ["id", "name", "tool", "description", "useCount"],
    # 输入open ls时默认排序的列名，注：如果输入不存在的列名，则不排序
    "defaultTableSortBy": "id",
    # 如果没有设置默认打开工具，则使用此配置项
    "defaultTool": "explorer"
  }
# 3. 保存并退出
```
