
## 飞牛 docker安装photopea 
```yaml
version: '3.8'
services:
  photopea:
    image: kovaszab/photopea:latest
    container_name: photopea
    restart: always
    privileged: true
    environment:
      UID: ${TRIM_UID}
      GID: ${TRIM_GID}
      TZ: Asiz/Shanghai
    ports:
      - "28887:8887"
    networks:
      - trim-default
networks:
  trim-default:
    external: true
```

```yaml
services:
  photopea:
    image: kovaszab/photopea:latest
    container_name: photopea
    restart: unless-stopped
    privileged: true
    environment:
      TZ: Asiz/Shanghai
    ports:
      - "28882:8887"
    network_mode: bridge
```