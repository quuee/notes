### 导出原路由器配置
导出原先路由器配置  cfg_export_config_file.conf

### linux下，将cfg_export_config_file.conf解压
可以用windows子系统解压该文件，生成etc目录和一系列文件

```
#解压命令
openssl aes-256-cbc -d -pbkdf2 -k $CmDc#RaX30O0M@\!$ -in cfg_export_config_file.conf -out - | tar -zxvf -
```

### 修改配置文件
1. /etc/shadow 将root两个冒号间的密码删除然后保存
2. /etc/config/dropbear 将括号内的文件 ‘0’ 改成‘1’ 然后保存来开启SSH
3. 重新打包 tar -zcvf - etc | openssl aes-256-cbc -pbkdf2 -k $CmDc#RaX30O0M@\!$ -out cfg_export_config_file_new.conf

### ssh 登录路由器
先将固件拷贝到路由器
```
#拷贝命令
scp .\openwrt-23.05.4-mediatek-filogic-cmcc_rax3000m-nand-bl31-uboot.fip root@192.168.10.1:/tmp/
```

### 写入uboot
注意不要混用uboot文件
```
#写入命令
mtd write /tmp/openwrt-23.05.4-mediatek-filogic-cmcc_rax3000m-nand-bl31-uboot.fip FIP
```

### 重启路由器
```
reboot
```

### 下载tftpd64软件
因为openwrt没有web界面，可以ping 192.168.1.1

### 修改文件名

openwrt-mediatek-filogic-cmcc_rax3000m-initramfs-recovery  
去掉版本号，不然tftp传输找不到文件

### 使用tftpd64软件传输
显示传输100%，然后进入192.168.1.1 web界面

### 上传sysupgrade镜像文件更新

