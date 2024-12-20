## 基础
蓝牙+无线 驱动
显卡 驱动

### win11 切经典右键 管理员权限
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve

### 关闭windows无用功能


## 基础环境
### git
C:\MySoftware\PortableGit\cmd 加入到环境变量

### miniconda
C:\MySoftware\miniconda3\Scripts 加入到环境变量
终端执行 conda init
win+x 启动管理员权限终端  输入  set-executionpolicy remotesigned 输入 Y

### visual studio

### cuda工具包
备份镜像先不装

### java
### node
npm 命令没有权限 
https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4  
```
Get-ExecutionPolicy -List

        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Undefined
 LocalMachine    RemoteSigned  ##只有本地用户有权限

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
TMD,最新版本的node不行,换旧版OK

### maven


## 常用软件
### 油小猴
网盘下载助手
### 比特彗星
### clash
### 7z
### git便携版
### githubdesk
### snipaste
### office 腾讯文档
### sublime_text
### vscode
### watt toolkit(加速器)
### 图吧工具箱
### 火绒
### mpv视频播放器
### musicPlayer2
### photoshop2023
2024版变化大 用不来
### cploar
会员未到期


