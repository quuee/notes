## 查看所有用户

```shell
grep bash /etc/passwd 或者 cat /etc/passwd | cut -f 1 -d:  
```

## 查看磁盘空间

```shell
df -h
```

## 查看所有安装的软件
dpkg --list
apt list --installed
apt list --installed | grep [your_program_name[]
snap list --all
dpkg-query -l

pip show pandas

## 卸载
sudo apt-get remove [package_name]
sudo apt-get --purge remove [package_name]
sudo apt autoremove

```shell
#!/bin/bash
# Removes old revisions of snaps
# CLOSE ALL SNAPS BEFORE RUNNING THIS
set -eu
snap list --all | awk '/disabled/{print $1, $3}' |
    while read snapname revision; do
        snap remove "$snapname" --revision="$revision"
    done
```


## wps缺少字体
下载字体解压放到 /usr/share/fonts/wps-fonts 下
sudo cp * /usr/share/fonts/
sudo mkfontscale
sudo mkfontdir
sudo fc-cache
启动wps

## debian su root密码正确，sudo 密码错误 xx用户不在sudoers里
1 su root  
2 gnome-text-editor /etc/sudoers  
3 xx ALL=(ALL) ALL #xx是用户名，添加  
4 退出后验证ok  
