
 # fast-open
 ![QQ](https://img.shields.io/badge/QQ-306863030-green.svg) [![Gitee](https://img.shields.io/badge/Gitee-roman_123-blue.svg)](https://gitee.com/roman_123/fast-open) [![GitHub](https://img.shields.io/badge/GitHub-roman_123-blue.svg)](https://github.com/qq306863030/fast-open) [![NPM](https://img.shields.io/badge/NPM-roman_123-blue.svg)](https://www.npmjs.com/package/fast-open) ![HOME](https://img.shields.io/badge/HOME-fast_open-blue)

> In a Windows environment, you can use commands to quickly open preset directories, and you can also configure them as shortcut commands to execute other operations.
> 在 Windows 环境中，你可以使用命令快速打开预设目录，还能将它们配置为快捷命令来执行其他操作。

[简体中文](https://github.com/qq306863030/fast-open/blob/master/readme.md) | [English](https://github.com/qq306863030/fast-open/blob/master/readme.en.md)

## Installation
```bash
npm install fast-open -g 
```

## Quick Start
```bash 
# Add a directory for quick opening
## 1. Navigate to any directory, open the command line, and enter open add
## 2. Exit the directory, enter open ls to view the directory list
## 3. Enter open <id|name> to open the specified directory
## 4. Enter open -t vscode <id|name> to open the specified directory with vscode (vscode needs to be installed)

# Add a command for quick execution
# 1. Enter open edit to open the configuration file
# 2. Add command configurations in the userCommand field of the configuration item. The data structure is an array of { "name": "", "command": [] }
"userCommand": [
    {
      "name": "push",
      "command": [
        "git pull",
        "git add .",
        "git commit -m update",
        "git push"
      ]
    }
  ]
# 3. Save and exit
# 4. Open the command line and enter open push or open -c push to execute the custom command
```

## Command List
```bash
# Commands can be executed using op|open|fast-open

open list|ls|l # View directory list
open ls -a, --all View all columns of the list
open ls -r, --reverse Reverse the list
open ls -s, --sort <colomnName> Sort the list by column name
open ls -f, --filter <filterKeyWords> Filter the list by keywords
open ls -d, --dir View directory list (default)
open ls -t, --tool View tool list
open ls -c, --command View command list
[Example 1]: open ls -a -r -s useCount -f ai # List all columns, sort by the useCount column, reverse the list, and only display items whose name or description contains the character "ai"
[Example 2]: open ls -c -f PUSH # View the command list and filter items with the keyword "PUSH" in their name and command


open [name|id|description|cmd] # Quickly open the directory with the specified name
open -i, --id <id> Open by ID
open -n, --name <name> Open by name
open -d, --description <description> Open by description
open -c, --cmd <cmdName> Execute command line
open -t, --tool <toolName> Set the default opening tool, which needs to be a tool that can be executed directly in the console (such as notepad) or a custom tool in the configuration (refer to the "open tool-add" command), the default is explorer
[Example 1]: open abc # Open the item whose id, name, description, or command list name is abc or contains abc
[Example 2]: open -i 1 # Open the item with id 1
[Example 3]: open -n abc # Open the item whose name is abc or contains abc
[Example 4]: open -d abc # Open the item whose description is abc or contains abc
[Example 5]: open -c push # Execute the command named push in the command line list, which needs to be manually configured in the configuration file, refer to the example of adding command lines


open add [name,path,tool,description] # Add directory
open add -n, --name <name> Add name
open add -p, --path <path> Add path
open add -t, --tool <toolName> Add opening tool, which needs to be a tool that can be executed directly in the console (such as notepad) or a custom tool in the configuration (refer to the "open tool-add" command), the default is explorer
open add -d, --description <description> Add description
[Example 1]: open add # Will automatically add [current directory name][current directory path][""][""] in the configuration file
[Example 2]: open add -n aaa -p c:/1.txt -t vscode -d bbb # Will automatically add [aaa,c:/1.txt,vscode,bbb] in the configuration file [name,path,tool,description]


open del [name|id...] # Delete configuration
open del -i, --id <id...> # Delete by id
open del -n, --name <name...> # Delete by name
[Example 1]: open del aaa,bbb,ccc # Delete configuration items whose name or id is aaa, bbb, ccc
[Example 2]: open del -i 1,2,3 # Delete configuration items with id 1, 2, 3
[Example 3]: open del -n aaa,bbb # Delete configuration items with name aaa, bbb


open command-list|cl # View command list
open cl -f <filterKeyWords> # Filter command list by keywords
[Example 2]: open cl # List all commands


open tool-list|tl # View tool list
open tl -f <filterKeyWords> # Filter tool list by keywords
[Example 1]: open tl # List all tools
[Example 2]: open tl -f vscode # List tools whose name contains vscode


open tool-add|ta <toolName, toolPath> # Add tool
[Example]: open ta typora,D:/soft/Typora/Typora.exe # Add typora tool. To open a directory or file with typora: open -t typora <id|name|description>. Note: If there are spaces in the added directory path, you need to enclose it in double quotes: open ta "typora,D:/soft/Typora/Typora.exe"


open tool-del|td <toolName> # Delete tool
[Example]: open td vscode # Delete the tool named vscode


open edit # Manually edit the configuration file
open reset # Restore the configuration file to default values
open help # View help documentation
open me # Open the source code directory
```

## Configuration File
```bash
# Modify default configurations
# 1. Enter open edit to open the configuration file
# 2. Modify the configuration items
"options": {
    # The columns displayed by default when entering open ls. You can add columns or modify the display order
    "defaultTableColumns": ["id", "name", "tool", "description", "useCount"],
    # The default column name for sorting when entering open ls. Note: If a non-existent column name is entered, no sorting will be performed
    "defaultTableSortBy": "id",
    # If no default opening tool is set, this configuration item will be used
    "defaultTool": "explorer"
  }
# 3. Save and exit
```
