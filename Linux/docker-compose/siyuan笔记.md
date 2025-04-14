
```yaml
services:
  siyuan:
    image: b3log/siyuan:v3.1.27
    container_name: siyuan
    restart: unless-stopped
    volumes:
      - /root/SiYuan:/root/Documents/SiYuan
    command: [--resident=true,--workspace=/root/Documents/SiYuan,--ssl=true,--accessAuthCode=授权码,--servePath=绑定域名]
    network_mode: bridge
    ports:
      - "28888:6806"

```