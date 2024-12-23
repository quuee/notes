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