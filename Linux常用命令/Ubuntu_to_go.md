## 装备 vitrualbox ventoy

## 使用 ventoy 软件将 U 盘转换成 ventoy U 盘，然后将主分区格式化为 NTFS 格式。

## 虚拟磁盘安装 linux 操作系统
创建固定大小的 vdi  
勾选uefi  (不知是不是这步一开始没勾选，一个小时的事情搞了一天才完成。)  
安装好后下载 vtoyboot 脚本[vtoyboot 脚本下载地址](https://link.zhihu.com/?target=https%3A//github.com/ventoy/vtoyboot/releases)  
下载的是 vtoyboot.xxx.iso 文件，解压得到 vtoyboot.sh 脚本文件，然后以 root 权限执行里面的脚本 sudo bash vtoyboot.sh ，执行成功后关机。（多重启几次）  


## 拷贝文件到 ventoy U 盘
然后将文件的后缀名改为 .vtoy ,例如：ubuntu2004.vtoy 或者 ubuntu2004.vdi.vtoy。
