
```yaml
services:
  siyuan:
    image: b3log/siyuan:v3.1.27
    container_name: siyuan
    restart: unless-stopped
    volumes:
      - /vol1/1000/DockerCompose/siyuan/data:/root/Documents/SiYuan
    command: [--workspace=/root/Documents/SiYuan,--accessAuthCode=privatesiyuan]
    network_mode: bridge
    ports:
      - "28892:6806"
```

```yaml
command: [--resident=true,--workspace=/root/Documents/SiYuan,--ssl=true,--accessAuthCode=授权码,--servePath=绑定域名]
```