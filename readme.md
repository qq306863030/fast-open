
 # fast-open
 ![QQ](https://img.shields.io/badge/QQ-306863030-green.svg) [![Gitee](https://img.shields.io/badge/Gitee-roman_123-blue.svg)](https://gitee.com/roman_123/fast-open) [![GitHub](https://img.shields.io/badge/GitHub-roman_123-blue.svg)](https://github.com/qq306863030/fast-open) [![NPM](https://img.shields.io/badge/NPM-roman_123-blue.svg)](https://www.npmjs.com/package/fast-open) ![HOME](https://img.shields.io/badge/HOME-fast_open-blue)

> In a Windows environment, you can use commands to quickly open preset directories, and you can also configure them as shortcut commands to execute other operations.
> 在 Windows 环境中，你可以使用命令快速打开预设目录，还能将它们配置为快捷命令来执行其他操作。

[简体中文](https://github.com/qq306863030/fast-open/blob/master/readme.md) | [English](https://github.com/qq306863030/fast-open/blob/master/readme.en.md)

## 安装
```bash
npm install fast-open -g 
```

## 使用
```bash
# 使用op|open|fast-open执行命令
open list|ls|l # [filterKey] 查看列表
open add [name][path][tool][description] # 添加目录
open add d <description> # 添加目录
open del <name|id> # 删除配置
open edit # 编辑配置文件
open <name|id|description> # 快速打开指定名称的目录
open -n <name> # 快速打开指定名称的目录
open -i <id> # 快速打开指定id的目录
tool-list|tl [filterKeyWords] # 查看工具列表
tool-add|ta <toolName> [toolPath] # 添加工具
tool-del|td <toolName> # 删除工具
open reset # 重置配置文件
```

## 示例
```bash
# 添加目录
1. open add # 在控制台直接执行open add命令，会自动添加[目录名称][当前目录路径][explorer][""]在配置文件中
2. open add ,,vscode,描述：使用vscode打开当前目录 # 添加[目录名称][当前目录路径][vscode][描述：使用vscode打开当前目录]在配置文件中，使用vscode打开当前目录的配置
3. open ta empty # 添加空工具
   open add 自定义命令,"explorer C:",empty,描述：打开C盘 # 添加[自定义命令]["explorer C:"][empty][描述：打开C盘]在配置文件中，打开C盘的配置
   open add push,"git pull&&git add .&&git commit -m 更新&&git push",empty,gitpush # 控制台输入open push即可提交代码
# 查看目录
open list|ls|l
# 打开目录
open 名称|配置项目的id|描述
open -n 名称
open -i 配置项目的id
# 添加工具
open ta vscode code
```