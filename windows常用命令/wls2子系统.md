username:qqqqqq
password:123456

1、电脑开启虚拟化
2、windows功能开启 hyper-v linux子系统 虚拟机平台，然后重启
3、wsl --update
4、wsl --install -d Ubuntu --web-download(后面这个命令报错，可选)
5、wsl --list -v    wsl --list -online
6、wsl --set-default other

7、启动 wsl -d Ubunt 退出 exit

8、卸载 wsl --unregister [Ubuntu]

9、备份 wsl --export [Ubuntu]
10、导入 wsl --import [Ubuntu22]