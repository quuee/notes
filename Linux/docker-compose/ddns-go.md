## ddns-go
可以自定义域名提供商
### 镜像采用
[jeessy/ddns-go](https://github.com/jeessy2/ddns-go)

```yaml


```

```shell
docker run -d --name ddns-go --restart=always --net=host -v /opt/ddns-go:/root jeessy/ddns-go
```

http://主机IP:9876

## 重置密码
```shell
./ddns-go -resetPassword 123456 -c /root/.ddns_go_config.yaml
cat /root/.ddns_go_config.yaml
# 找到生成后的密码并复制
vim /etc/ddns-go/config.yaml
# 将密码覆盖
service ddns-go restart
```