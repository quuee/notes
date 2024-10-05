## 修改openwrt系统的路由器为主路由的子路由，保持所有设备在同个网络

## 结果导致子路由的usb存储不能访问

## 改回原来的网络配置
https://openwrt.org/zh/docs/guide-user/base-system/basic-networking
```shell
#进入子路由系统
#方法一
service network reload
# 提示radio1 is disable，不行

#方法二
#删除网络配置文件
rm -f /etc/config/network /etc/config/network
#重启路由
reboot
#重新生成一个配置文件

```
network初始配置
```shell
config interface 'loopback'
        option device 'lo'
        option proto 'static'
        option ipaddr '127.0.0.1'
        option netmask '255.0.0.0'

config globals 'globals'
        option ula_prefix 'auto'

config device
        option name 'br-lan'
        option type 'bridge'
        list ports 'lan1'
        list ports 'lan2'
        list ports 'lan3'

config interface 'lan'
        option device 'br-lan'
        option proto 'static'
        option ipaddr '192.168.1.1'
        option netmask '255.255.255.0'
        option ip6assign '60'

config interface 'wan'
        option device 'eth1'
        option proto 'dhcp'

config interface 'wan6'
        option device 'eth1'
        option proto 'dhcpv6'
```