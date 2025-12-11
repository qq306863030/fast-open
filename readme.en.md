
 # fast-open
 ![QQ](https://img.shields.io/badge/QQ-306863030-green.svg) [![Gitee](https://img.shields.io/badge/Gitee-roman_123-blue.svg)](https://gitee.com/roman_123/fast-open) [![GitHub](https://img.shields.io/badge/GitHub-roman_123-blue.svg)](https://github.com/qq306863030/fast-open) [![NPM](https://img.shields.io/badge/NPM-roman_123-blue.svg)](https://www.npmjs.com/package/fast-open) ![HOME](https://img.shields.io/badge/HOME-fast_open-blue)

> In a Windows environment, you can use commands to quickly open preset directories, and you can also configure them as shortcut commands to execute other operations.
> 在 Windows 环境中，你可以使用命令快速打开预设目录，还能将它们配置为快捷命令来执行其他操作。

[简体中文](https://github.com/qq306863030/fast-open/blob/master/readme.md) | [English](https://github.com/qq306863030/fast-open/blob/master/readme.en.md)

## Installation
```bash
npm install fast-open -g 
```

## Usage
```bash
# Use op|open|fast-open to execute commands
open list|ls|l # View directory list
open ls -a, --all View all columns in the list
open ls -r, --reverse Reverse the list
open ls -s, --sort <colomnName> Sort the list by column name
open ls -f, --filter <filterKeyWords> Filter the list by keywords
[Example]: open ls -a -r -s useCount -f ai # List all columns, sort by the useCount column, reverse the list, and only display items whose name or description contains the character "ai"
open [name|id|description|cmd] # Quickly open the specified directory
open -i, --id <id> Open by ID
open -n, --name <name> Open by name
open -d, --description <description> Open by description
open -c, --cmd <cmdName> Execute command line
[Example 1]: open abc # Open items whose id, name, description, or command line list name is "abc" or contains "abc"
[Example 2]: open -i 1 # Open the item with id 1
[Example 3]: open -n abc # Open items whose name is "abc" or contains "abc"
[Example 4]: open -d abc # Open items whose description is "abc" or contains "abc"
[Example 5]: open -c push # Execute the command in the command line list named "push". You need to manually configure the command line in the configuration file. Refer to the example of adding a command line.
open add [name,path,tool,description] # Add directory
open add -n, --name <name> Add name
open add -p, --path <path> Add path
open add -t, --tool <toolName> Add opening tool, needs to be pre-configured, default is explorer
open add -d, --description <description> Add description
[Example 1]: open add # Will automatically add [current directory name][current directory path][""][""] to the configuration file
[Example 2]: open add -n aaa -p c:/1.txt -t vscode -d bbb # Will automatically add [aaa,c:/1.txt,vscode,bbb] to the configuration file in the format [name,path,tool,description]
open del [name|id...] # Delete configuration
open del -i, --id <id...> # Delete by id
open del -n, --name <name...> # Delete by name
[Example 1]: open del aaa,bbb,ccc # Delete configuration items whose name or id is aaa, bbb, ccc
[Example 2]: open del -i 1,2,3 # Delete configuration items with id 1, 2, 3
[Example 3]: open del -n aaa,bbb # Delete configuration items with name aaa, bbb
open tool-list|tl # View tool list
open tl -f <filterKeyWords> # Filter tool list by keywords
[Example 1]: open tl # List all tools
[Example 2]: open tl -f vscode # List tools whose name contains "vscode"
open tool-add|ta <toolName, toolPath> # Add tool
[Example]: open ta vscode,c:/Users/admin/AppData/Local/Programs/Microsoft VS Code/Code.exe # Add vscode tool with path c:/Users/admin/AppData/Local/Programs/Microsoft VS Code/Code.exe
open tool-del|td <toolName> # Delete tool
[Example]: open td vscode # Delete the tool named "vscode"
open edit # Manually edit the configuration file
open reset # Restore the configuration file to default values
open help # View help documentation
open me # Open the source code directory

# Add custom command lines
# 1. Open the configuration file with open edit
# 2. Add the userCommand field in the configuration item, the data structure is an array of { "name": "", "command": [] }
# sample:
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
# 4. Open the command line and enter open push or open -c push to execute the custom command line
```
