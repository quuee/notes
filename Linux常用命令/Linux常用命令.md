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
apt list --installed | grep your_program_name
snap list
dpkg-query -l

pip show pandas

## 卸载
sudo apt-get remove package_name
sudo apt-get --purge remove package_name

sudo apt autoremove


## wps缺少字体
下载字体解压放到 /usr/share/fonts/wps-fonts 下
sudo mkfontscale
sudo mkfontdir
sudo fc-cache
启动wps