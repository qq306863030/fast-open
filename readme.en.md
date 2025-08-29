# rdtool
![QQ](https://img.shields.io/badge/QQ-306863030-green.svg) [![Gitee](https://img.shields.io/badge/Gitee-roman_123-blue.svg)](https://gitee.com/roman_123/fast-open) [![GitHub](https://img.shields.io/badge/GitHub-roman_123-blue.svg)](https://github.com/qq306863030/fast-open) [![NPM](https://img.shields.io/badge/NPM-roman_123-blue.svg)](https://www.npmjs.com/package/fast-open) ![HOME](https://img.shields.io/badge/HOME-auto_remote_deployment_tool-blue)

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
open list|ls|l # [filterKey] View the list
open add [name][path][tool][description] # Add a directory
open add d <description> # Add a directory
open del <name|id> # Delete the configuration
open edit # Edit the configuration file
open <name|id|description> # Quickly open the directory with the specified name
open -n <name> # Quickly open the directory with the specified name
open -i <id> # Quickly open the directory with the specified id
tool-list|tl [filterKeyWords] # View the tool list
tool-add|ta <toolName> [toolPath] # Add a tool
tool-del|td <toolName> # Delete a tool
open reset # Reset the configuration file
```
## Example
```bash
# Add a directory
1. open add # Execute the open add command directly in the console, and it will automatically add [directory name][current directory path][explorer][""] to the configuration file
2. open add ,,vscode,Description: Open the current directory with vscode # Add [directory name][current directory path][vscode][Description: Open the current directory with vscode] to the configuration file, which is the configuration to open the current directory with vscode
3. open ta empty # Add an empty tool
   open add custom command,"explorer C:",empty,Description: Open drive C # Add [custom command]["explorer C:"][empty][Description: Open drive C] to the configuration file, which is the configuration to open drive C
   open add push,"git pull&&git add .&&git commit -m update&&git push",empty,gitpush # Enter open push in the console to submit the code
# View the directory
open list|ls|l
# Open the directory
open name|configuration item id|description
open -n [name]
open -i [configuration item id]
# Add a tool
open ta vscode code
```

