## ubuntu静态IP配置

virtualbox网卡选择桥接模式，网卡选择正在使用的（同一个局域网的网卡，使用有线网卡选有线，使用WIFI选WIFI网卡）

```shell
sudo vim /etc/netplan/00-installer-config.yaml
```

修改为以下内容

```shell
network:
  ethernets:
    enp0s3:
      dhcp4: false
      addresses: [192.168.101.29/24]
      optional: true
      routes:
        - to: default
          via: 192.168.101.1
      nameservers:
        addresses: [192.168.101.1]
  version: 2
```

保存
验证 IP 方案正确性  

```shell
sudo netplan try
```

应用 IP 方案

```shell
sudo netplan apply
```

## 修改为EUI64 ipv6
```shell
sudo nmcli con modify "Wired connection 1" ipv6.addr-gen-mode eui64
systemctl restart NetworkManager
```

### /etc/NetworkManager/system-connections/  路径下空的[2]
- 1. 飞牛系统-网络连接-编辑，修改下网络配置，然后就会生成配置文件
- 2. nmcli connection show ## 查看ethernet的名称