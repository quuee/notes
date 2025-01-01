
```yaml
version: '3.8'
services:
  xunlei:
    image: registry.fnnas.com/fnapp/cnk3x_xunlei:latest
    container_name: xunlei
    restart: unless-stopped
    privileged: true
    environment:
      UID: ${TRIM_UID}
      GID: ${TRIM_GID}
      XL_DASHBOARD_USERNAME: ${wizard_username}
      XL_DASHBOARD_PASSWORD: ${wizard_password}    
    volumes:
      - /var/apps/docker-xunlei/target/data:/xunlei/data
      - /var/apps/docker-xunlei/shares/xunlei/downloads:/xunlei/downloads
      - /vol1/1000/Download/thunder_download:/xunlei/downloads2
    ports:
      - "2345:2345"
    networks:
      - trim-default

# 连接外部网络
networks:
  trim-default:
    external: true
```