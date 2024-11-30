
## 飞牛 docker安装photopea 
```
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