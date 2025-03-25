
## 官方参考
(参考)[https://www.ventoy.net/cn/plugin_vtoyboot.html]

## 步骤
- 准备一个移动硬盘，ubuntu iso镜像文件
- 启动ventoy，将ventoy安装到该硬盘
- 启动virtualbox，创建一个实例（VDI预分配全部空间，勾选启用EFI）
- 在virtualbox安装实例后进入ubuntu系统，从 https://github.com/ventoy/vtoyboot/releases 下载压缩包即可。
- 下载到 Linux 系统中，解压，然后以root权限执行里面的脚本 sudo bash vtoyboot.sh 脚本执行完之后，使用 poweroff 命令关机。
- 将实例的vdi拷贝到硬盘，改后缀名为 .vtoy 
- 重启电脑 F11 进入选择启动项
- 如果系统的大升级之后， 建议再重新执行一次 vtoyboot 脚本，防止下次重启之后vDisk文件无法启动。