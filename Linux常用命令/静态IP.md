## ubuntu静态IP配置

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
